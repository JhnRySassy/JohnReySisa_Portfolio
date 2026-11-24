import { services } from '../core/services';
import { useObservable } from '../hooks';
import { aura, learning, profile, story, strengths, timeline, wexdata, workStyle } from '../domain/data';
import { Head, MockWindow, Ph, Tags } from './Shared';

export function AboutPage() {
  return (
    <>
      <section style={{ paddingTop: 120 }}><div className="wrap">
        <Head k="About me" title="Designing clarity for complex work." />
        <div className="abg">
          <div className="photo"><Ph label="Your photo" sq /></div>
          <div className="ab" data-rv>
            {story.map((t) => <p key={t}>{t}</p>)}
            <div className="fc"><div><b>Based in</b>{profile.location}</div><div><b>Focus</b>UX and UI design</div><div><b>Certified</b>Google UX, 2024</div><div><b>Open to</b>UX/UI design roles</div></div>
            <div className="cta"><a className="btn" href="#works">See my works</a><a className="btn g" href={profile.cvLink}>Request my CV</a></div>
          </div>
        </div>
      </div></section>

      <section><div className="wrap">
        <Head k="Journey" title="A short timeline." />
        <ol className="tlv">{timeline.map((t) => <li key={t.id} data-rv><time>{t.when}</time><h3>{t.title}</h3><p>{t.body}</p></li>)}</ol>
      </div></section>

      <section><div className="wrap">
        <Head k="What I do" title="Where I can help." />
        <div className="tl3">{strengths.map((s) => <div key={s.id} className="card" data-rv><h3>{s.title}</h3><p>{s.body}</p></div>)}</div>
      </div></section>

      <section><div className="wrap">
        <Head k="How I work" title="My way of working." />
        <div className="ref">{workStyle.map(([t, b]) => <div key={t} className="card" data-rv><h3>{t}</h3><p>{b}</p></div>)}</div>
      </div></section>

      <section><div className="wrap">
        <Head k="Learning" title="Currently learning." />
        <div className="tl3">{learning.map((s) => <div key={s.id} className="card" data-rv><h3>{s.title}</h3><p>{s.body}</p></div>)}</div>
      </div></section>

      <section><div className="wrap">
        <Head k="Beyond client work" title="My own brand." />
        <article className="card wk" data-rv>
          <div className="stg"><div className="ae">{aura.name}</div></div>
          <div className="tx"><h3>{aura.name}</h3><div className="sb">{aura.subtitle}</div><p>{aura.summary}</p>
            <a className="btn" href={aura.href}>Read the case study</a></div>
        </article>
      </div></section>
    </>
  );
}

export function WorksPage() {
  return (
    <section style={{ paddingTop: 120 }}><div className="wrap">
      <Head k="Works" title="Selected case studies." />
      <div className="wg">
        <article className="card wk" data-rv>
          <div className="stg"><MockWindow /></div>
          <div className="tx"><h3>{wexdata.name}</h3><div className="sb">{wexdata.subtitle}</div><p>{wexdata.summary}</p><Tags project={wexdata} />
            <a className="btn" href={wexdata.href}>Read the full case study</a></div>
        </article>
        <article className="card wk" data-rv>
          <div className="stg"><div className="ae">{aura.name}</div></div>
          <div className="tx"><h3>{aura.name}</h3><div className="sb">{aura.subtitle}</div><p>{aura.summary}</p><Tags project={aura} />
            <a className="btn" href={aura.href}>Read the full case study</a></div>
        </article>
        <div className="card soon" data-rv>Next case study<br />coming soon</div>
      </div>
    </div></section>
  );
}

export function ContactCta() {
  const { name } = useObservable(services.chat);
  return (
    <section className="end" id="contact"><div className="wrap">
      <div className="card" data-rv>
        <h2 data-rv>Let&rsquo;s build something clear together{name ? `, ${name}` : ''}.</h2>
        <div className="cta">
          <a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="btn g" href={profile.cvLink}>Request my CV</a>
          <a className="btn g" href={profile.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
    </div></section>
  );
}

