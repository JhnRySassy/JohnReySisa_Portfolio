import { Disposable, Observable } from "./Observable";

export type IntroPhase = "loading" | "exiting" | "done";
export interface IntroState {
  phase: IntroPhase;
  progress: number;
  step: number;
}

/** The UI/UX design process, as loading copy: one step per quarter of progress. */
export const INTRO_STEPS = [
  "Sketching wireframes",
  "Placing components",
  "Choosing colors",
  "Polishing pixels",
] as const;

/**
 * Drives the opening sequence: progress 0 to 1 (waits for fonts + window load),
 * then an exit phase that lifts the overlay and lets the page animate in.
 */
export class IntroSequence
  extends Observable<IntroState>
  implements Disposable
{
  private raf = 0;
  private t0 = 0;
  private ready = false;
  private timers: number[] = [];
  private queue: Array<() => void> = [];
  private readonly root = document.documentElement;

  constructor(private readonly minMs = 2000) {
    super({
      phase: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "done"
        : "loading",
      progress: 0,
      step: 0,
    });
  }

  init(): void {
    if (this.value.phase !== "loading" || this.raf) return;
    this.t0 = 0;
    this.root.classList.add("has-intro", "intro-lock");
    const fonts: Promise<unknown> = document.fonts
      ? document.fonts.ready
      : Promise.resolve();
    const loaded = new Promise<void>((r) => {
      if (document.readyState === "complete") r();
      else addEventListener("load", () => r(), { once: true });
    });
    Promise.all([fonts, loaded]).then(() => {
      this.ready = true;
    });
    this.timers.push(
      window.setTimeout(() => {
        this.ready = true;
      }, this.minMs + 2500),
    ); // safety net
    this.raf = requestAnimationFrame(this.tick);
  }
  destroy(): void {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.root.classList.remove("intro-lock");
  }

  /** Run something once the page starts revealing (or right away if it already has). */
  whenEntered(cb: () => void): void {
    if (this.value.phase === "loading") this.queue.push(cb);
    else cb();
  }

  private tick = (now: number): void => {
    if (!this.t0) this.t0 = now;
    const raw = Math.min((now - this.t0) / this.minMs, 1);
    const eased = 1 - Math.pow(1 - raw, 2);
    const p = this.ready ? eased : Math.min(eased, 0.92);
    this.set({
      ...this.value,
      progress: p,
      step: Math.min(3, Math.floor(p * 4)),
    });
    if (p >= 1) {
      this.timers.push(window.setTimeout(this.exit, 450));
      return;
    }
    this.raf = requestAnimationFrame(this.tick);
  };

  private exit = (): void => {
    this.root.classList.add("entered");
    this.set({ ...this.value, phase: "exiting" });
    this.timers.push(
      window.setTimeout(() => {
        const q = this.queue;
        this.queue = [];
        q.forEach((f) => f());
      }, 350),
    );
    this.timers.push(
      window.setTimeout(() => {
        this.root.classList.remove("intro-lock");
        this.set({ ...this.value, phase: "done" });
      }, 1100),
    );
  };
}
