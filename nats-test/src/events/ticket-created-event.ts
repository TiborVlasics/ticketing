import { Subject } from './subjects';

export interface TicketingEvent {
  subject: Subject;
  data: unknown;
}

export interface TicketCreatedEvent extends TicketingEvent {
  subject: 'ticket:created';
  data: {
    id: string;
    title: string;
    price: number;
  };
}
