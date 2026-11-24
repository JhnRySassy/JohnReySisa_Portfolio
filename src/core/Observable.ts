export type Listener = () => void;

/** Anything that owns listeners, timers or DOM must be disposable. */
export interface Disposable {
  init(): void;
  destroy(): void;
}

/** Base class for stateful services. React reads it via useSyncExternalStore. */
export abstract class Observable<T> {
  private listeners = new Set<Listener>();
  constructor(protected state: T) {}
  get value(): T {
    return this.state;
  }
  subscribe = (l: Listener): (() => void) => {
    this.listeners.add(l);
    return () => {
      this.listeners.delete(l);
    };
  };
  protected set(next: T): void {
    this.state = next;
    this.listeners.forEach((l) => l());
  }
}
