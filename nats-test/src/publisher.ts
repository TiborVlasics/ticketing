import { connect, ConnectionOptions, StringCodec, JSONCodec, Nuid } from 'nats';

console.clear();

const connectionOpts: ConnectionOptions = {
  name: 'ticketing publisher',
  servers: 'http://localhost:4222',
};

const jc = JSONCodec();

const streamName = 'ticketingStream';

const TICKET_CREATED = 'ticket:created';

const data = JSON.stringify({
  id: '123',
  title: 'concert',
  price: 20,
});

const main = async () => {
  try {
    const nc = await connect(connectionOpts);
    console.log(`publisher connected to ${nc.getServer()}`);

    const jsm = await nc.jetstreamManager();
    await jsm.streams.add({ name: streamName, subjects: [TICKET_CREATED] });

    const js = nc.jetstream();
    await js.publish(TICKET_CREATED, jc.encode(data));
    // await js.publish(TICKET_CREATED, jc.encode(data));

    // list all the streams, the `next()` function
    // retrieves a paged result.
    const streams = await jsm.streams.list().next();
    streams.forEach((si) => {
      // console.log(si);
    });

    // nc.publish('ticket:created', jc.encode(data));
  } catch (error) {
    console.log(error);
  }
};

main();
