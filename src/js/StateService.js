export default class StateService {
  constructor(storage) {
    this.storage = storage;
  }

  save(state) {
    this.storage.setItem('tickets', JSON.stringify(state));
  }

  load() {
    try {
      return JSON.parse(this.storage.getItem('tickets'));
    } catch (e) {
      throw new Error('Invalid state');
    }
  }
}
