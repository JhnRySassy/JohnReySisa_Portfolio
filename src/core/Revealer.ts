import { Disposable } from './Observable';

/** Fades elements marked [data-rv] into view as they enter the viewport. */
export class Revealer implements Disposable {
  private io?: IntersectionObserver;
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
  destroy(): void { this.io?.disconnect(); this.io = undefined; }

  /** Call after each render to pick up new elements. */
  scan(): void {
    if (!this.io) return;
    document.querySelectorAll<HTMLElement>('[data-rv]:not(.rv)').forEach((el, i) => {
      el.classList.add('rv');
      el.style.transitionDelay = `${(i % 3) * 80}ms`;
      this.io?.observe(el);
    });
  }
}
