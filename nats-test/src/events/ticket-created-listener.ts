import { JsMsg } from 'nats';

import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-event';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  stream: string = 'ticketingStream';
  durableName: string = 'me';
  readonly filterSubjects = 'ticket:created';

  onMessage(data: unknown, msg: JsMsg): void {
    console.log(data);
    msg.ack();
  }
}
