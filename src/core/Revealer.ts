import { Disposable } from './Observable';

/** Fades elements marked [data-rv] into view as they enter the viewport. */
export class Revealer implements Disposable {
  private io?: IntersectionObserver;
  private seen = new WeakSet<Element>();
  private readonly reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  init(): void {
    if (this.reduced) return;
    this.io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        this.io?.unobserve(e.target);
      });
    }, { threshold: 0.1 });
  }
  destroy(): void { this.io?.disconnect(); this.io = undefined; this.seen = new WeakSet(); }

  /**
   * Call after each render. With observe=false elements are only hidden (ready to animate),
   * which lets the intro overlay finish before anything starts moving.
   */
  scan(observe = true): void {
    const io = this.io;
    if (!io) return;
    document.querySelectorAll<HTMLElement>('[data-rv]').forEach((el) => {
      if (!el.classList.contains('rv')) {
        const sibs = Array.from(el.parentElement?.children ?? []).filter((c) => c.hasAttribute('data-rv'));
        el.classList.add('rv');
        el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 5) * 70}ms`;
      }
      if (observe && !el.classList.contains('in') && !this.seen.has(el)) { this.seen.add(el); io.observe(el); }
    });
  }
}
