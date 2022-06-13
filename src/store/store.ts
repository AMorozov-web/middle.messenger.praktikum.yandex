import {EventBus} from '../core';
import {setValue} from '../utils';
import {STORE_EVENTS} from '../constants';

type InitialState = {
  user: Nullable<User>;
};

class Store<T extends Indexed> extends EventBus {
  private state: T;

  constructor(initialState: T) {
    super();
    this.state = initialState;
  }

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    this.state = setValue(this.state, path, value);
    this.emit(STORE_EVENTS.UPDATED);
  }
}

const initialState: InitialState = {
  user: null,
};

export const store = new Store(initialState);
