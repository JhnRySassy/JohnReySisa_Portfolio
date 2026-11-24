import { useSyncExternalStore } from "react";
import type { Observable } from "./core/Observable";

export function useObservable<T>(o: Observable<T>): T {
  return useSyncExternalStore(o.subscribe, () => o.value);
}
