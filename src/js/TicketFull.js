import Ticket from './Ticket';

export default class TicketFull extends Ticket {
  constructor(obj) {
    super(obj);
    this.description = obj.description;
  }
}