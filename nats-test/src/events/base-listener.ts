import {
  StringCodec,
  AckPolicy,
  DeliverPolicy,
  NatsConnection,
  JsMsg,
} from 'nats';
import { TicketingEvent } from './ticket-created-event';

export abstract class Listener<T extends TicketingEvent> {
  abstract stream: string;
  abstract durableName: string;
  abstract filterSubjects: undefined | T['subject'];

  private connection!: NatsConnection;
  private ackWait = 5 * 1000;
  private sc = StringCodec();

  constructor(connection: NatsConnection) {
    this.connection = connection;
  }

  abstract onMessage(data: unknown, msg: JsMsg): void;

  async listen() {
    await this.initConsumer();

    const js = this.connection.jetstream();
    const c = await js.consumers.get(this.stream, this.durableName);
    const sub = await c.consume();

    // async iterator
    (async () => {
      for await (const m of sub) {
        const parsedData: unknown = JSON.parse(this.sc.decode(m.data));
        console.log(
          `[${m.subject}, ${sub.getProcessed()}, ${m.seq}]: ${parsedData}`
        );

        this.onMessage(parsedData, m);

        // m.ack();
      }
      console.log('subscription closed');
    })();
  }

  private async initConsumer() {
    try {
      const jsm = await this.connection.jetstreamManager();

      await jsm.consumers.add(this.stream, {
        durable_name: this.durableName,
        ack_policy: AckPolicy.Explicit,
        deliver_policy: DeliverPolicy.All,
        ack_wait: this.ackWait,
        filter_subject: this.filterSubjects,
      });
    } catch (e) {
      // console.log(e);
    }
  }
}
