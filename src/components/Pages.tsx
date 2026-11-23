import { useState } from 'react';
import { services } from '../core/services';
import { useObservable } from '../hooks';
import { decisions, profile, reflections, research, wexdata } from '../domain/data';
import { MockWindow, Ph, Tags } from './Shared';

export function AboutPage() {
  return (
    <section style={{ paddingTop: 120 }}><div className="wrap">
      <div className="k">About me</div>
      <h2>Designing clarity for complex work.</h2>
      <div className="abg">
        <span className="mono big">JR</span>
        <div className="ab">
          <p>I&rsquo;m {profile.fullName}, a UX/UI designer from the {profile.location}. I turn complex workflows like logistics platforms, internal tools, and dashboards into products that feel obvious to use.</p>
          <p>I design in Figma and Framer, and I work in HTML, CSS, JavaScript, TypeScript, and React, so what I design is made with development in mind. I hold the Google UX Design Professional Certificate and keep learning through UX conferences.</p>
          <p>I believe design is a process, and collaboration makes it meaningful.</p>
          <div className="fc"><div><b>Based in</b>{profile.location}</div><div><b>Focus</b>UX and UI design</div><div><b>Certified</b>Google UX, 2024</div><div><b>Open to</b>UX/UI design roles</div></div>
          <div className="cta"><a className="btn" href="#works">See my works</a><a className="btn g" href={profile.cvLink}>Request my CV</a></div>
        </div>
      </div>
    </div></section>
  );
}

export function WorksPage() {
  return (
    <section style={{ paddingTop: 120 }}><div className="wrap">
      <div className="k">Works</div>
      <h2>Selected case studies.</h2>
      <div className="wg">
        <article className="card wk" data-rv>
          <div className="stg"><MockWindow /></div>
          <div className="tx"><h3>{wexdata.name}</h3><div className="sb">{wexdata.subtitle}</div><p>{wexdata.summary}</p><Tags project={wexdata} />
            <a className="btn" href={wexdata.href}>Read the full case study</a></div>
        </article>
        <div className="card soon" data-rv>Next case study<br />coming soon</div>
        <div className="card soon" data-rv>Next case study<br />coming soon</div>
      </div>
    </div></section>
  );
}

export function CaseStudyPage() {
  const [i, setI] = useState(0);
  const d = decisions[i];
  return (
    <>
      <section style={{ paddingTop: 116 }}><div className="wrap">
        <a className="btn g sm" href="#works">All works</a>
        <div className="k" style={{ marginTop: 34 }}>Case study</div>
        <h1 className="csh">WExData: bringing order to a logistics network&rsquo;s internal systems</h1>
        <p className="l2">A redesign of the internal platform W Express uses to run its nationwide delivery, warehousing, and customer-service operations, without breaking what already worked.</p>
        <div className="mt">{Object.entries(wexdata.meta).map(([k, v]) => <div key={k}><b>{k}</b>{v}</div>)}</div>
        <nav className="csn" aria-label="Case study sections">{[['cs-ov', 'Overview'], ['cs-dec', 'Decisions'], ['cs-res', 'Research'], ['cs-out', 'Outcome'], ['cs-ref', 'Reflection']].map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}</nav>
        <Ph label="Hero: the redesigned WExData dashboard" />
        <div className="tl3" style={{ marginTop: 18 }}>
          <div className="card"><h3 className="t">The problem</h3><p>As modules piled up, the system became hard to navigate for the teams who use it daily.</p></div>
          <div className="card"><h3 className="t">What I did</h3><p>Led the information-architecture restructuring and built a shared design system across both modules.</p></div>
          <div className="card"><h3 className="t">The result</h3><p>Task-based navigation, clearer hierarchy, consistent patterns, and a structure ready for new modules.</p></div>
        </div>
      </div></section>

      <section id="cs-ov"><div className="wrap">
        <div className="k">Overview</div>
        <h2>A system that already worked, just not for the people using it.</h2>
        <p className="csp">W Express runs delivery, warehousing, and customer-service operations across a nationwide branch network. The internal system behind it, later named WExData, already carried the business&rsquo;s core logic. What it lacked was clarity: as modules were added over time, it became harder to navigate for the teams who relied on it daily.</p>
        <div className="call">My job wasn&rsquo;t to replace it. It was to restructure the experience and keep every business rule intact.</div>
      </div></section>

      <section id="cs-dec"><div className="wrap">
        <div className="k">Problems and decisions</div>
        <h2>Six problems, six decisions.</h2>
        <div className="ctab" role="tablist">{decisions.map((x, n) => (
          <button key={x.id} role="tab" aria-selected={n === i} onClick={() => setI(n)}>{n + 1}. {x.label}</button>
        ))}</div>
        <div className="pd"><div><small>Problem</small><p>{d.problem}</p></div><div><small>Decision</small><p>{d.decision}</p></div></div>
      </div></section>

      <section id="cs-res"><div className="wrap">
        <div className="k">Research and discovery</div>
        <h2>Where the findings came from.</h2>
        <div className="tl3">{research.map((r) => <div key={r.title} className="card" data-rv><h3>{r.title}</h3><ul>{r.items.map((x) => <li key={x}>{x}</li>)}</ul></div>)}</div>
      </div></section>

      <section id="cs-out"><div className="wrap">
        <div className="k">Outcome</div>
        <h2>Two modules, one system.</h2>
        <div className="g2"><Ph label="Operations module" /><Ph label="Customer Service module" /><Ph label="Interactive prototype walkthrough" /></div>
        <div className="mtr"><div className="card"><b>&mdash;%</b><span>reduction in steps to complete a common task</span></div><div className="card"><b>&mdash;</b><span>modules consolidated into clearer categories</span></div></div>
      </div></section>

      <section id="cs-ref"><div className="wrap">
        <div className="k">Reflection</div>
        <h2>What I took away.</h2>
        <div className="ref">{reflections.map(([t, b]) => <div key={t} className="card" data-rv><h3>{t}</h3><p>{b}</p></div>)}</div>
        <div className="cta" style={{ marginTop: 28 }}><a className="btn" href="#works">Back to all works</a><a className="btn g" href={profile.cvLink}>Request my CV</a></div>
      </div></section>
    </>
  );
}

export function ContactCta() {
  const { name } = useObservable(services.chat);
  return (
    <section className="end" id="contact"><div className="wrap">
      <div className="card" data-rv>
        <h2>Let&rsquo;s build something clear together{name ? `, ${name}` : ''}.</h2>
        <div className="cta">
          <a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="btn g" href={profile.cvLink}>Request my CV</a>
          <a className="btn g" href={profile.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
    </div></section>
  );
}
