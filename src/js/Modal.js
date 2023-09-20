/* eslint-disable class-methods-use-this */
import createRequest from './createRequest';
import TicketFull from './TicketFull';

export default class Modal {
  constructor(parent, state) {
    this.state = state;
    this.parentEl = parent;
    this.elem = this.create();
    this.inputName = this.elem.querySelector('.modal__input');
    this.inputDescription = this.elem.querySelector('.modal__textarea');
    this.editTicket = null;

    this.onSaveClick = this.onSaveClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
  }

  static get markup() {
    return `
      <h2 class="modal__title">Добавить тикет</h2>

      <form id="modal__form" enctype="multipart/form-data">
        <label class="modal__description" for="">
          Краткое описание
          <input class="modal__input frame" type="text" name="name">
        </label>

        <label class="modal__description" for="">
          Подробное описание
          <textarea class="modal__textarea frame" rows="3" name="description"></textarea>
        </label>

        <div class="modal__buttons">
          <button class="btn modal__btn modal__btn-cancel">Отмена</button>
          <button class="btn modal__btn modal__btn-save" type="submit" form="modal__form">Ок</button>
        </div>
      </form>
    `;
  }

  init() {
    this.parentEl.appendChild(this.elem);

    const form = this.elem.querySelector('#modal__form');
    const cancelButton = this.elem.querySelector('.modal__btn-cancel');

    form.addEventListener('submit', this.onSaveClick);
    cancelButton.addEventListener('click', this.onCancelClick);
  }

  onSaveClick(e) {
    e.preventDefault();

    if (this.editTicket) {
      this.editTicket.name = this.inputName.value;
      this.editTicket.description = this.inputDescription.value;

      createRequest({
        method: 'PATCH',
        data: this.editTicket,
        action: 'changeTicket',
      });

      this.editTicket.edit();
      this.editTicket = null;
    } else {
      const data = new FormData(e.target);

      createRequest({
        method: 'POST',
        data,
        action: 'createTicket',
        callback: (response) => {
          const ticket = new TicketFull(response);
          ticket.render();
          this.state.tickets.push(ticket);
        },
      });
    }

    this.hide();
  }

  onCancelClick(e) {
    e.preventDefault();
    this.hide();
  }

  create() {
    const modal = document.createElement('dialog');
    modal.classList.add('modal');
    modal.classList.add('frame');

    const modalBody = Modal.markup;
    modal.insertAdjacentHTML('beforeend', modalBody);

    return modal;
  }

  show(id = null) {
    if (id) {
      this.editTicket = this.state.tickets.find((t) => t.id === id);
      this.inputName.value = this.editTicket.name;
      this.inputDescription.value = this.editTicket.description;
    }

    this.elem.showModal();
  }

  hide() {
    this.inputName.value = '';
    this.inputDescription.value = '';
    this.elem.close();
  }
}
