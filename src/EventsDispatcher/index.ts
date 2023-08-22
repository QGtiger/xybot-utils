export interface BaseEvent {
  type: string;
}

export interface Event extends BaseEvent {
  target?: any;
  [attachment: string]: any;
}

export type EventListener<E, T, U> = (
  event: E & { type: T } & { target: U },
) => void;

export class EventsDispatcher<E extends BaseEvent = Event> {
  _events: Record<E['type'], any>;
  constructor() {
    // @ts-expect-error
    this._events = this._events || {};
  }

  getListenersFromType<T extends E['type']>(type: T) {
    if (!type) return [];
    const events = this._events;
    const listeners: any[] = events[type] || (events[type] = []);
    return listeners;
  }

  addEventListener<T extends E['type']>(
    type: T,
    listener: EventListener<E, T, this>,
  ) {
    if (!listener) return;
    const listeners = this.getListenersFromType(type);
    if (listeners.indexOf(listener) === -1) {
      listeners.push(listener);
    }
    return this;
  }

  removeEventListener<T extends E['type']>(
    type: T,
    listener: EventListener<E, T, this>,
  ) {
    if (!listener) return;
    const listeners = this.getListenersFromType(type);

    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
    return this;
  }

  removeAllEventListener<T extends E['type']>(type?: T) {
    // @ts-expect-error
    if (!type) this._events = {};
    // @ts-expect-error
    this._events[type] = [];
    return this;
  }

  hasEventListener<T extends E['type']>(
    type: T,
    listener: EventListener<E, T, this>,
  ) {
    return this.getListenersFromType(type).indexOf(listener) !== -1;
  }

  dispathcEvent(event: E) {
    const listeners = this.getListenersFromType(event.type);
    // @ts-ignore
    event.target = this;
    const arr = listeners.slice(0);
    arr.forEach((fn) => {
      fn.call(this, event);
    });
    // @ts-ignore
    event.target = null;
  }
}
