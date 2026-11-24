import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  AURA_URL, WEX, aura, auraDecisions, auraNext, auraReflections, brandColors, brandFonts,
  chapters, decisions, flows, profile, reflections, research, shots, wexNext, wexdata,
} from '../domain/data';
import { DecisionTabs, Head, Lightbox, Note, Ph, PhonePh } from './Shared';

/* ---------------------------------------------------------------- shared template */
interface ShellProps {
  prefix: string;
  title: string;
  summary: string;
  meta: Record<string, string>;
  hero: ReactNode;
  glance: ReadonlyArray<readonly [string, string]>;
  overview: { title: string; paragraphs: string[]; quote: string };
  nav: ReadonlyArray<readonly [string, string]>;
  reflections: ReadonlyArray<ReadonlyArray<string>>;
  next: string[];
  note?: ReactNode;
  following: { href: string; title: string; blurb: string };
  children: ReactNode;
}

/** Every case study uses this template: same order, same sections, same footer. */
function CaseStudyShell(p: ShellProps) {
  const root = useRef<HTMLDivElement>(null);
  const [mins, setMins] = useState(0);
  useEffect(() => {
    const words = (root.current?.innerText ?? '').trim().split(/\s+/).length;
    setMins(Math.max(1, Math.round(words / 200)));
  }, []);
  const nav: ReadonlyArray<readonly [string, string]> = [[`${p.prefix}-ov`, 'Overview'], ...p.nav, [`${p.prefix}-ref`, 'Reflection'], [`${p.prefix}-next`, 'Next steps']];
  return (
    <div ref={root}>
      <section style={{ paddingTop: 116 }}><div className="wrap">
        <a className="btn g sm" href="#works">All works</a>
        <div className="k" style={{ marginTop: 34 }} data-rv>Case study{mins > 0 && <span className="rt">{mins} min read</span>}</div>
        <h1 className="csh" data-rv>{p.title}</h1>
        <p className="l2" data-rv>{p.summary}</p>
        <div className="mt" data-rv>{Object.entries(p.meta).map(([k, v]) => <div key={k}><b>{k}</b>{v}</div>)}</div>
        <nav className="csn" aria-label="Case study sections">{nav.map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}</nav>
        {p.hero}
        <div className="tl3" style={{ marginTop: 18 }}>{p.glance.map(([t, b]) => <div key={t} className="card"><h3 className="t">{t}</h3><p>{b}</p></div>)}</div>
      </div></section>

      <section id={`${p.prefix}-ov`}><div className="wrap">
        <Head k="Overview" title={p.overview.title} />
        {p.overview.paragraphs.map((t) => <p key={t} className="csp" data-rv>{t}</p>)}
        <div className="call" data-rv>{p.overview.quote}</div>
      </div></section>

      {p.children}

      <section id={`${p.prefix}-ref`}><div className="wrap">
        <Head k="Reflection" title="What I took away." />
        <div className={p.reflections.length === 4 ? 'ref' : 'tl3'}>{p.reflections.map(([t, b]) => <div key={t} className="card" data-rv><h3>{t}</h3><p>{b}</p></div>)}</div>
      </div></section>

      <section id={`${p.prefix}-next`}><div className="wrap">
        <Head k="Looking ahead" title="What I’d do next." />
        <ul className="nx">{p.next.map((t) => <li key={t} data-rv>{t}</li>)}</ul>
        {p.note}
        <a className="card nxt" href={p.following.href} data-rv>
          <small>Next case study</small><h3>{p.following.title}</h3><p>{p.following.blurb}</p><span className="btn">Read it</span>
        </a>
        <div className="cta" style={{ marginTop: 24 }}><a className="btn g" href="#works">Back to all works</a><a className="btn g" href={profile.cvLink}>Request my CV</a></div>
      </div></section>
    </div>
  );
}

/* ---------------------------------------------------------------- WExData pieces */
function PrototypeVideo() {
  const v = useRef<HTMLVideoElement>(null);
  const [t, setT] = useState(0);
  const active = chapters.reduce((a, c, i) => (c.at <= t ? i : a), 0);
  const seek = (at: number) => { const el = v.current; if (!el) return; el.currentTime = at; void el.play(); };
  return (
    <div className="pv" data-rv>
      <video ref={v} controls playsInline preload="metadata" poster={`${WEX}prototype-poster.webp`} onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}>
        <source src={`${WEX}prototype-tour.mp4`} type="video/mp4" />
      </video>
      <div className="pv-c" role="tablist" aria-label="Video chapters">
        {chapters.map((c, i) => <button key={c.id} role="tab" aria-selected={i === active} onClick={() => seek(c.at)}>{c.label}</button>)}
      </div>
    </div>
  );
}

function FlowGallery() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const f = flows[i];
  return (
    <>
      <div className="ctab" role="tablist" aria-label="User flows">{flows.map((x, n) => (
        <button key={x.id} role="tab" aria-selected={n === i} onClick={() => setI(n)}>{x.title}</button>
      ))}</div>
      <div className="card fl" data-rv>
        <div className="fl-t">
          <div><div className="fl-s"><b>{f.stat}</b><span>{f.statLabel}</span></div><p>{f.summary}</p></div>
          <ul>{f.points.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <button className="fl-i" onClick={() => setOpen(true)} aria-label={`Enlarge the ${f.title} flow`}>
          <img src={f.src} alt={f.alt} loading="lazy" /><span>Click to enlarge</span>
        </button>
      </div>
      {open && <Lightbox src={f.src} alt={f.alt} onClose={() => setOpen(false)} />}
    </>
  );
}

function ScreenGallery() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div className="sh">{shots.map((s, n) => (
        <figure key={s.id} data-rv>
          <button onClick={() => setOpen(n)} aria-label={`Enlarge ${s.title}`}><img src={s.src} alt={`${s.title} screen`} loading="lazy" /></button>
          <figcaption><b>{s.title}.</b> {s.note}</figcaption>
        </figure>
      ))}</div>
      {open !== null && <Lightbox src={shots[open].src} alt={`${shots[open].title} screen`} onClose={() => setOpen(null)} />}
    </>
  );
}

export function CaseStudyPage() {
  return (
    <CaseStudyShell
      prefix="cs"
      title="WExData: bringing order to a logistics network’s internal systems"
      summary="A redesign of the internal platform W Express uses to run its nationwide delivery, warehousing, and customer-service operations, without breaking what already worked."
      meta={wexdata.meta}
      hero={<PrototypeVideo />}
      glance={[
        ['The problem', 'As modules piled up, the system became hard to navigate for the teams who use it daily.'],
        ['What I did', 'I restructured the information architecture and built one shared design system across Operations and Customer Service.'],
        ['The result', 'Three modules and 11 pages now sit behind task-based navigation, and every Manage page follows one pattern.'],
      ]}
      overview={{
        title: 'A system that already worked, just not for the people using it.',
        paragraphs: [
          'W Express runs delivery, warehousing, and customer-service operations across a nationwide branch network. The internal system behind it, later named WExData, already carried the business’s core logic. What it lacked was clarity: as modules were added over time, it became harder to navigate for the teams who relied on it daily.',
          'I led the information-architecture restructuring: auditing the existing module structure, presenting reorganized navigation concepts to stakeholders, and translating their operational feedback into a design system used across both modules.',
        ],
        quote: 'My job wasn’t to replace it. It was to restructure the experience and keep every business rule intact.',
      }}
      nav={[['cs-dec', 'Decisions'], ['cs-flows', 'User flows'], ['cs-res', 'Research'], ['cs-screens', 'Screens'], ['cs-out', 'Outcome']]}
      reflections={reflections}
      next={wexNext}
      note={<Note title="A note on confidentiality">WExData is an internal WExpress system, so this case study shows structure, flows, and sample data rather than real operations. <a href={`mailto:${profile.email}?subject=WExData%20case%20study%20details`}>Ask for more details</a>.</Note>}
      following={{ href: aura.href, title: aura.name, blurb: aura.subtitle }}
    >
      <section id="cs-dec"><div className="wrap">
        <Head k="Problems and decisions" title="Six problems, six decisions." />
        <DecisionTabs items={decisions} />
      </div></section>

      <section id="cs-flows"><div className="wrap">
        <Head k="User flows" title="Four flows, one system." />
        <p className="csp" data-rv>Before drawing screens, I mapped how people move through the system. These four flows became the structure the rest of the design hangs on.</p>
        <FlowGallery />
      </div></section>

      <section id="cs-res"><div className="wrap">
        <Head k="Research and discovery" title="Where the findings came from." />
        <div className="tl3">{research.map((r) => <div key={r.title} className="card" data-rv><h3>{r.title}</h3><ul>{r.items.map((x) => <li key={x}>{x}</li>)}</ul></div>)}</div>
      </div></section>

      <section id="cs-screens"><div className="wrap">
        <Head k="Screens" title="The design, up close." />
        <ScreenGallery />
      </div></section>

      <section id="cs-out"><div className="wrap">
        <Head k="Outcome" title="What changed for the teams using it." />
        <div className="ref">
          <div className="card" data-rv><h3>Fewer steps</h3><p>Task-based categories shorten the path from login to the function someone needs.</p></div>
          <div className="card" data-rv><h3>Clearer screens</h3><p>Hierarchy and spacing surface the important data and actions at a glance.</p></div>
          <div className="card" data-rv><h3>One consistent system</h3><p>Shared components and patterns carry across Operations and Customer Service.</p></div>
          <div className="card" data-rv><h3>Ready to grow</h3><p>New modules can be added without another restructuring.</p></div>
        </div>
        <div className="mtr"><div className="card"><b>&mdash;%</b><span>reduction in steps to complete a common task</span></div><div className="card"><b>&mdash;</b><span>modules consolidated into clearer categories</span></div></div>
      </div></section>
    </CaseStudyShell>
  );
}

/* ---------------------------------------------------------------- Aura & Essence pieces */
function BrandBoard() {
  const labels = ['Primary', 'Secondary', 'Accent', 'Neutral'];
  return (
    <div className="brd">
      <Ph label="Logo and wordmark" />
      <div className="card" data-rv>
        <h3>Colors</h3>
        <div className="swg">
          {brandColors.length > 0
            ? brandColors.map((c) => <div key={c.id} className="sw-i"><i style={{ background: c.hex }} /><div><b>{c.name}</b>{c.hex} &middot; {c.role}</div></div>)
            : labels.map((l) => <div key={l} className="sw-i e"><i /><div><b>{l}</b>#&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;</div></div>)}
        </div>
      </div>
      <div className="card" data-rv>
        <h3>Typography</h3>
        {(brandFonts.length > 0 ? brandFonts.map((f) => [f.role, f.family] as const) : [['Display typeface', 'Add the display font'], ['Body typeface', 'Add the body font']] as const)
          .map(([role, family]) => <div key={role} className="ty-i"><b style={{ fontFamily: brandFonts.length > 0 ? family : undefined }}>Aa</b><span>{role}<br />{family}</span></div>)}
      </div>
      <div className="card why" data-rv>
        <h3>Why these choices</h3>
        <p>The look is premium and calm. Product photography leads, and the interface stays quiet around it so the scents can set the mood.</p>
      </div>
    </div>
  );
}

/** Admin mock built in code. Every figure is sample data, so no real business numbers are shown. */
function AdminMock() {
  const rows: ReadonlyArray<readonly [string, string, number]> = [['Packaging', '₱6,000', 28], ['Ads', '₱11,500', 53], ['Shipping', '₱4,000', 19]];
  return (
    <div className="am">
      <div className="card" data-rv>
        <h3>Profit overview<span className="tag">Sample data</span></h3>
        <div className="am-s"><div>Revenue<b>₱48,000</b></div><div>Expenses<b>₱21,500</b></div><div className="g">Net profit<b>₱26,500</b></div></div>
        <div className="eb">{rows.map(([n, v, w]) => <div key={n}><span>{n}</span><i style={{ '--w': `${w}%` } as React.CSSProperties} /><span>{v}</span></div>)}</div>
      </div>
      <div className="card" data-rv>
        <h3>Sizes per scent<span className="tag">Sample data</span></h3>
        <p className="csp" style={{ margin: '8px 0 0' }}>Scent details are entered once. Each size is just a variant.</p>
        <div className="vr"><div><span>50ml</span><b>12 in stock</b></div><div><span>20ml</span><b>8 in stock</b></div><div className="add">+ Add a size</div></div>
      </div>
    </div>
  );
}

export function AuraCaseStudyPage() {
  return (
    <CaseStudyShell
      prefix="as"
      title="Aura & Essence: a fragrance store designed around how the shop really works"
      summary={aura.summary}
      meta={aura.meta}
      hero={<><div className="cta" style={{ marginBottom: 22 }}><a className="btn" href={AURA_URL} target="_blank" rel="noopener noreferrer">Visit the live site</a></div><Ph label="Hero: the Aura & Essence storefront" /></>}
      glance={[
        ['The challenge', 'Sell a product people can’t smell online, and run the business without spreadsheets.'],
        ['What I did', 'I designed a mood-first storefront, an app-like checkout, and an admin that tracks sizes and profit.'],
        ['Where it stands', 'Live, and has already sold bottles to real customers.'],
      ]}
      overview={{
        title: 'A store as considered as the product.',
        paragraphs: ['Aura & Essence is my own fragrance business. I wanted an online store that felt as considered as the scents themselves, and an admin that answers the owner’s real questions: what’s selling, what it costs, and what I’m actually earning.'],
        quote: 'Every screen had to match how the business really operates.',
      }}
      nav={[['as-feat', 'What I built'], ['as-dec', 'Decisions'], ['as-brand', 'Brand'], ['as-mobile', 'Mobile'], ['as-admin', 'Admin'], ['as-scr', 'Desktop']]}
      reflections={auraReflections}
      next={auraNext}
      following={{ href: wexdata.href, title: wexdata.name, blurb: wexdata.subtitle }}
    >
      <section id="as-feat"><div className="wrap">
        <Head k="What I built" title="Three surfaces, one brand." />
        <div className="tl3">
          <div className="card" data-rv><h3>Storefront</h3><ul><li>Cinematic hero with the brand’s own photos</li><li>Shorter homepage that reaches the scents faster</li><li>Scent popup that shows more, faster</li></ul></div>
          <div className="card" data-rv><h3>Cart and checkout</h3><ul><li>App-like flow with clear steps</li><li>No shipping fee or free-shipping bar</li><li>Trust elements at the moment of decision</li></ul></div>
          <div className="card" data-rv><h3>Admin</h3><ul><li>Sizes per scent without re-entering details</li><li>Expense tracking and true net profit</li><li>Notifications that can be trusted</li></ul></div>
        </div>
      </div></section>

      <section id="as-dec"><div className="wrap">
        <Head k="Problems and decisions" title="Seven decisions, and why." />
        <DecisionTabs items={auraDecisions} />
      </div></section>

      <section id="as-brand"><div className="wrap">
        <Head k="Brand" title="A look that lets the scents lead." />
        <BrandBoard />
      </div></section>

      <section id="as-mobile"><div className="wrap">
        <Head k="Mobile first" title="Designed for the phone, then scaled up." />
        <p className="csp" data-rv>I started every screen at phone size. If it worked there, scaling up to desktop was the easy part.</p>
        <div className="phones"><PhonePh label="Storefront home" /><PhonePh label="Scent popup" /><PhonePh label="Cart and checkout" /></div>
      </div></section>

      <section id="as-admin"><div className="wrap">
        <Head k="Admin" title="An admin that answers the owner’s questions." />
        <p className="csp" data-rv>What’s selling, what it costs, and what’s left over. The admin shows all three at a glance. Figures below are sample data.</p>
        <AdminMock />
      </div></section>

      <section id="as-scr"><div className="wrap">
        <Head k="Desktop" title="The same brand on a larger screen." />
        <div className="g2"><Ph label="Storefront homepage" /><Ph label="Cart and checkout" /></div>
      </div></section>
    </CaseStudyShell>
  );
}
