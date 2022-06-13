import {EventBus} from '../core';
import {setValue} from '../utils';
import {STORE_EVENTS} from '../constants';

export type RootState = {
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

const initialState: RootState = {
  user: null,
};

export const store = new Store(initialState);
