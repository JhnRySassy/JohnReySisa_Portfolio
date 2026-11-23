import { Disposable } from './Observable';

interface Pt { x: number; y: number; t: number; }
interface Box { x: number; y: number; w: number; h: number; }

const SNAP = 'a,button,input,textarea,[data-cursor],.card';
const lerp = (a: number, b: number, k: number): number => a + (b - a) * k;

/**
 * A UI/UX-designer themed cursor, built like Figma's canvas:
 *  1. a pen-tool path with anchor points that trails the pointer,
 *  2. a selection frame (corner handles + "W x H" tag) that snaps onto hovered elements,
 *  3. a collaborator cursor with a name tag that follows with a slight lag.
 */
export class DesignerCursor implements Disposable {
  private root?: HTMLDivElement;
  private frame!: HTMLDivElement;
  private tag!: HTMLSpanElement;
  private ptr!: HTMLDivElement;
  private name!: HTMLSpanElement;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private mouse = { x: -200, y: -200 };
  private lag = { x: -200, y: -200 };
  private box: Box = { x: -200, y: -200, w: 22, h: 22 };
  private pts: Pt[] = [];
  private hovered: Element | null = null;
  private raf = 0;
  private readonly enabled =
    matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor(private readonly label = 'John Rey', private readonly accent = '#00abf1') {}

  init(): void {
    if (!this.enabled || this.root) return;
    this.build();
    document.documentElement.classList.add('dc-on');
    addEventListener('pointermove', this.onMove, { passive: true });
    addEventListener('pointerover', this.onOver, { passive: true });
    addEventListener('pointerdown', this.onDown);
    addEventListener('pointerup', this.onUp);
    addEventListener('resize', this.resize);
    document.documentElement.addEventListener('pointerleave', this.onLeave);
    this.resize();
    this.raf = requestAnimationFrame(this.tick);
  }
  destroy(): void {
    cancelAnimationFrame(this.raf);
    removeEventListener('pointermove', this.onMove);
    removeEventListener('pointerover', this.onOver);
    removeEventListener('pointerdown', this.onDown);
    removeEventListener('pointerup', this.onUp);
    removeEventListener('resize', this.resize);
    document.documentElement.removeEventListener('pointerleave', this.onLeave);
    this.root?.remove();
    this.root = undefined;
    document.documentElement.classList.remove('dc-on');
  }

  private build(): void {
    const root = document.createElement('div');
    root.className = 'dc';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML =
      '<canvas class="dc-path"></canvas>' +
      '<div class="dc-frame"><i></i><i></i><i></i><i></i><span class="dc-size"></span></div>' +
      '<div class="dc-ptr"><svg width="22" viewBox="0 0 24 24"><path d="M3 2l7 19 3-8 8-3z" fill="currentColor" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg></div>' +
      `<span class="dc-name">${this.label}</span>`;
    document.body.appendChild(root);
    this.root = root;
    this.canvas = root.querySelector('canvas')!;
    this.ctx = this.canvas.getContext('2d')!;
    this.frame = root.querySelector('.dc-frame')!;
    this.tag = root.querySelector('.dc-size')!;
    this.ptr = root.querySelector('.dc-ptr')!;
    this.name = root.querySelector('.dc-name')!;
  }

  private onMove = (e: PointerEvent): void => {
    this.mouse.x = e.clientX; this.mouse.y = e.clientY;
    this.pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    this.root?.classList.add('on');
  };
  private onOver = (e: PointerEvent): void => { this.hovered = (e.target as Element).closest(SNAP); };
  private onDown = (): void => this.frame.classList.add('press');
  private onUp = (): void => this.frame.classList.remove('press');
  private onLeave = (): void => this.root?.classList.remove('on');
  private resize = (): void => {
    const d = devicePixelRatio || 1;
    this.canvas.width = innerWidth * d; this.canvas.height = innerHeight * d;
    this.ctx.setTransform(d, 0, 0, d, 0, 0);
  };

  private targetBox(): Box | null {
    if (!this.hovered) return null;
    const r = this.hovered.getBoundingClientRect();
    if (r.width < 8 || r.height < 8 || r.width > innerWidth * 0.9) return null;
    return { x: r.left - 6, y: r.top - 6, w: r.width + 12, h: r.height + 12 };
  }

  private tick = (): void => {
    const snap = this.targetBox();
    const t = snap ?? { x: this.mouse.x - 11, y: this.mouse.y - 11, w: 22, h: 22 };
    const k = snap ? 0.22 : 0.3;
    this.box = { x: lerp(this.box.x, t.x, k), y: lerp(this.box.y, t.y, k), w: lerp(this.box.w, t.w, k), h: lerp(this.box.h, t.h, k) };
    this.frame.style.transform = `translate(${this.box.x}px,${this.box.y}px)`;
    this.frame.style.width = `${this.box.w}px`;
    this.frame.style.height = `${this.box.h}px`;
    this.frame.classList.toggle('snap', !!snap);
    if (snap) this.tag.textContent = `${Math.round(snap.w - 12)} \u00d7 ${Math.round(snap.h - 12)}`;

    this.lag.x = lerp(this.lag.x, this.mouse.x, 0.12);
    this.lag.y = lerp(this.lag.y, this.mouse.y, 0.12);
    this.ptr.style.transform = `translate(${this.mouse.x}px,${this.mouse.y}px)`;
    this.name.style.transform = `translate(${this.lag.x + 16}px,${this.lag.y + 22}px)`;
    this.drawPath();
    this.raf = requestAnimationFrame(this.tick);
  };

  /** Pen-tool trail: smooth bezier through recent points, with square anchor points. */
  private drawPath(): void {
    const now = performance.now();
    this.pts = this.pts.filter((p) => now - p.t < 650);
    const c = this.ctx;
    c.clearRect(0, 0, innerWidth, innerHeight);
    const p = this.pts;
    if (p.length < 3) return;
    c.lineWidth = 2; c.lineCap = 'round'; c.strokeStyle = this.accent;
    c.globalAlpha = 0.55;
    c.beginPath(); c.moveTo(p[0].x, p[0].y);
    for (let i = 1; i < p.length - 1; i++) {
      c.quadraticCurveTo(p[i].x, p[i].y, (p[i].x + p[i + 1].x) / 2, (p[i].y + p[i + 1].y) / 2);
    }
    c.stroke();
    for (let i = 0; i < p.length; i += 9) {
      c.globalAlpha = Math.max(0, 1 - (now - p[i].t) / 650);
      c.fillStyle = '#fff'; c.strokeStyle = this.accent; c.lineWidth = 1.5;
      c.fillRect(p[i].x - 3.5, p[i].y - 3.5, 7, 7); c.strokeRect(p[i].x - 3.5, p[i].y - 3.5, 7, 7);
    }
    c.globalAlpha = 1;
  }
}
