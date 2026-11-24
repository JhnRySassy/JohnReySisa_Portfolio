import { Disposable } from "./Observable";

/** Lerp-based smooth scrolling for mouse wheels. Touch and keyboard stay native. */
export class SmoothScroller implements Disposable {
  private target = 0;
  private current = 0;
  private raf = 0;
  private running = false;
  private readonly enabled: boolean;

  constructor(private readonly ease = 0.085) {
    this.enabled =
      !matchMedia("(prefers-reduced-motion: reduce)").matches &&
      matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  init(): void {
    this.current = this.target = scrollY;
    if (!this.enabled) return;
    addEventListener("wheel", this.onWheel, { passive: false });
    addEventListener("scroll", this.onScroll, { passive: true });
  }
  destroy(): void {
    removeEventListener("wheel", this.onWheel);
    removeEventListener("scroll", this.onScroll);
    cancelAnimationFrame(this.raf);
    this.running = false;
  }

  /** Animated scroll to an absolute Y. */
  scrollTo(y: number): void {
    this.target = this.clamp(y);
    if (this.enabled) this.start();
    else scrollTo({ top: this.target, behavior: "smooth" });
  }
  /** Instant jump (used on page changes). */
  jump(y: number): void {
    cancelAnimationFrame(this.raf);
    this.running = false;
    this.current = this.target = this.clamp(y);
    scrollTo(0, this.target);
  }

  private get max(): number {
    return Math.max(0, document.documentElement.scrollHeight - innerHeight);
  }
  private clamp(y: number): number {
    return Math.min(Math.max(y, 0), this.max);
  }
  private start(): void {
    if (this.running) return;
    this.running = true;
    this.raf = requestAnimationFrame(this.tick);
  }
  private onWheel = (e: WheelEvent): void => {
    if (document.documentElement.classList.contains("intro-lock")) {
      e.preventDefault();
      return;
    }
    if (e.ctrlKey || (e.target as Element).closest("[data-native-scroll]"))
      return;
    e.preventDefault();
    const unit = e.deltaMode === 1 ? 32 : 1;
    this.target = this.clamp(this.target + e.deltaY * unit);
    this.start();
  };
  /** Keep in sync when the user drags the scrollbar or uses the keyboard. */
  private onScroll = (): void => {
    if (!this.running) this.current = this.target = scrollY;
  };
  private tick = (): void => {
    this.current += (this.target - this.current) * this.ease;
    if (Math.abs(this.target - this.current) < 0.5) {
      this.current = this.target;
      this.running = false;
    }
    scrollTo(0, this.current);
    if (this.running) this.raf = requestAnimationFrame(this.tick);
  };
}
