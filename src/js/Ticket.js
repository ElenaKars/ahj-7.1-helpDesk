import createRequest from './createRequest';

export default class Ticket {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.status = obj.status;
    this.created = obj.created;
    this.elem = null;
    this.checkbox = null;

    this.changeStatus = this.changeStatus.bind(this);
  }

  static get markup() {
    return `
      <summary class="ticket__summary">
        <div class="ticket__task">
          <input class="ticket__task-check" id="check" type="checkbox" required>
          <label class="ticket__task-label" for="check">
            <p class="ticket__task-text"></p>
          </label>
        </div>

        <time class="ticket__date"></time>

        <div class="ticket__buttons-list">
          <button class="ticket__buttons-item btn-edit">&#9998;</button>
          <button class="ticket__buttons-item btn-delete">&#10006;</button>
        </div>
      </summary>
      <p class="ticket__description"></p>
    `;
  }

  create() {
    const ticket = document.createElement('details');
    ticket.classList.add('tickets__list-item');
    ticket.classList.add('ticket');
    ticket.setAttribute('data-id', this.id);

    const ticketBody = Ticket.markup;
    ticket.insertAdjacentHTML('beforeend', ticketBody);

    const ticketText = ticket.querySelector('.ticket__task-text');
    ticketText.textContent = this.name;

    const ticketDate = ticket.querySelector('.ticket__date');
    ticketDate.textContent = this.created;

    const ticketDescription = ticket.querySelector('.ticket__description');
    ticketDescription.textContent = this.description;

    return ticket;
  }

  render() {
    this.elem = this.create();
    document.querySelector('.tickets__list').appendChild(this.elem);

    this.checkbox = this.elem.querySelector('#check');
    this.checkbox.addEventListener('change', this.changeStatus);

    if (this.status) {
      this.checkbox.setAttribute('checked', 'checked');
    }
  }

  changeStatus() {
    if (this.checkbox.hasAttribute('checked')) {
      this.checkbox.removeAttribute('checked');
      this.status = false;
    } else {
      this.checkbox.setAttribute('checked', 'checked');
      this.status = true;
    }

    createRequest({
      method: 'PATCH',
      data: this,
      action: 'changeTicket',
    });
  }

  edit() {
    this.elem.querySelector('.ticket__task-text').textContent = this.name;
    this.elem.querySelector('.ticket__description').textContent = this.description;
  }
}
