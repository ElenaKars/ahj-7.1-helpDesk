import Modal from './Modal';
import createRequest from './createRequest';
import State from './State';
import TicketFull from './TicketFull';

export default class Board {
  constructor(stateService) {
    this.stateService = stateService;
    this.elem = document.querySelector('.board');
    this.addButton = document.querySelector('.btn');
    this.state = new State();
    this.modal = new Modal(this.elem, this.state);

    this.onAddButton = this.onAddButton.bind(this);
    this.onEditButton = this.onEditButton.bind(this);
    this.onDeleteButton = this.onDeleteButton.bind(this);
  }

  init() {
    this.addButton.addEventListener('click', this.onAddButton);
    this.elem.addEventListener('click', this.onEditButton);
    this.elem.addEventListener('click', this.onDeleteButton);

    window.addEventListener('beforeunload', () => {
      this.stateService.save(this.state);
    });

    document.addEventListener('DOMContentLoaded', () => {
      const { tickets } = this.stateService.load();

      if (tickets.length > 0) {
        this.render(tickets);
      }

      createRequest({
        method: 'POST',
        data: this.state.tickets,
        action: 'addTickets',
      });
    });

    this.modal.init();
  }

  onAddButton(e) {
    e.preventDefault();
    this.modal.show();
  }

  onEditButton(e) {
    if (!e.target.classList.contains('btn-edit')) return;
    const ticket = e.target.closest('.ticket');
    const id = ticket.getAttribute('data-id');
    this.modal.show(id);
  }

  onDeleteButton(e) {
    if (!e.target.classList.contains('btn-delete')) return;

    const ticket = e.target.closest('.ticket');
    const id = ticket.getAttribute('data-id');

    createRequest({
      method: 'DELETE',
      data: id,
      action: 'deleteTicket',
    });

    this.state.tickets = this.state.tickets.filter((t) => t.id !== id);
    ticket.remove();
  }

  render(tickets) {
    tickets.forEach((t) => {
      const ticket = new TicketFull(t);
      this.state.tickets.push(ticket);
      ticket.render();
    });
  }
}
