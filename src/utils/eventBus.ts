type Handler<T extends any[] = any[]> = (...args: T) => void;

type EventBusListeners = {
  [key: string]: Handler[];
};

export class EventBus {
  listeners: EventBusListeners;

  constructor() {
    this.listeners = {};
  }

  on(eventName: string, eventHandler: Handler) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(eventHandler);
  }

  off(eventName: string, eventHandler: Handler) {
    if (!this.listeners[eventName]) {
      return;
    }

    this.listeners[eventName] = this.listeners[eventName].filter((event) => event !== eventHandler);
  }

  emit(eventName: string, ...args: any[]) {
    if (!this.listeners[eventName]) {
      throw new Error(`${eventName} not exist`);
    }

    this.listeners[eventName].forEach((event) => event(...args));
  }
}
