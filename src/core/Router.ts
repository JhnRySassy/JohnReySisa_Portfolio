import { Disposable, Observable } from './Observable';

export type View = 'home' | 'about' | 'works' | 'wexdata' | 'aura';
export interface RouteState { view: View; anchor: string | null; key: number; }

const VIEWS: readonly string[] = ['home', 'about', 'works', 'wexdata', 'aura'];
const HOME_ANCHORS: readonly string[] = ['hello', 'work', 'process', 'toolbox', 'certs'];

/** Hash router: #about, #works, #wexdata are pages; other hashes are in-page anchors. */
export class Router extends Observable<RouteState> implements Disposable {
  constructor() { super({ view: 'home', anchor: null, key: 0 }); }
  init(): void { addEventListener('hashchange', this.sync); this.sync(); }
  destroy(): void { removeEventListener('hashchange', this.sync); }

  private sync = (): void => {
    const h = decodeURIComponent(location.hash.slice(1));
    let view = this.value.view;
    let anchor: string | null = null;
    if (VIEWS.includes(h)) view = h as View;
    else if (HOME_ANCHORS.includes(h)) { view = 'home'; anchor = h; }
    else if (h.startsWith('cs-')) { view = 'wexdata'; anchor = h; }
    else if (h.startsWith('as-')) { view = 'aura'; anchor = h; }
    else if (h === 'contact' || h === 'top') anchor = h;
    else if (!h) view = 'home';
    this.set({ view, anchor, key: this.value.key + 1 });
  };
}
