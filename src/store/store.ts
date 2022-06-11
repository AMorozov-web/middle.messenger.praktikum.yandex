import {EventBus} from '../core';
import {setValue} from '../utils';
import {STORE_EVENTS} from '../constants';

class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    this.state = setValue(this.state, path, value);
    this.emit(STORE_EVENTS.UPDATED);
  }
}

export const store = new Store();
