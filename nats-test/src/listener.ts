import { randomBytes } from 'crypto';
import { connect, ConnectionOptions } from 'nats';

import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const main = async () => {
  const clientId = randomBytes(4).toString('hex');

  const connectionOpts: ConnectionOptions = {
    name: `ticketing listener ${clientId}`,
    servers: 'http://localhost:4222',
  };
  const nc = await connect(connectionOpts);

  const ticketCreatedListener = new TicketCreatedListener(nc);
  await ticketCreatedListener.listen();

  process.on('SIGINT', () => nc.close());
  process.on('SIGTERM', () => nc.close());
};

main();
