import { Disposable, Observable } from "./Observable";

export type Theme = "light" | "dark";

export class ThemeService extends Observable<Theme> implements Disposable {
  private static readonly KEY = "jr-theme";
  constructor() {
    super(ThemeService.read());
  }

  private static read(): Theme {
    try {
      const s = localStorage.getItem(ThemeService.KEY);
      if (s === "light" || s === "dark") return s;
    } catch {
      /* storage unavailable */
    }
    return matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  init(): void {
    this.apply();
  }
  destroy(): void {
    /* nothing to release */
  }
  toggle(): void {
    this.set(this.value === "dark" ? "light" : "dark");
    try {
      localStorage.setItem(ThemeService.KEY, this.value);
    } catch {
      /* ignore */
    }
    this.apply();
  }
  private apply(): void {
    document.documentElement.dataset.theme = this.value;
  }
}
