import { useState } from "react";
import { services } from "../core/services";
import { useObservable } from "../hooks";
import {
  AURA_URL,
  aura,
  auraDecisions,
  auraReflections,
  decisions,
  learning,
  profile,
  reflections,
  research,
  story,
  strengths,
  timeline,
  wexdata,
  workStyle,
} from "../domain/data";
import type { Decision } from "../domain/models";
import { MockWindow, Ph, Tags } from "./Shared";

function DecisionTabs({ items }: { items: Decision[] }) {
  const [i, setI] = useState(0);
  const d = items[i];
  return (
    <>
      <div className="ctab" role="tablist">
        {items.map((x, n) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={n === i}
            onClick={() => setI(n)}
          >
            {n + 1}. {x.label}
          </button>
        ))}
      </div>
      <div className="pd">
        <div>
          <small>Problem</small>
          <p>{d.problem}</p>
        </div>
        <div>
          <small>Decision</small>
          <p>{d.decision}</p>
        </div>
      </div>
    </>
  );
}

function Head({ k, title }: { k: string; title: string }) {
  return (
    <>
      <div className="k" data-rv>
        {k}
      </div>
      <h2 data-rv>{title}</h2>
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <section style={{ paddingTop: 120 }}>
        <div className="wrap">
          <Head k="About me" title="Designing clarity for complex work." />
          <div className="abg">
            <div className="photo">
              <Ph label="Your photo" sq />
            </div>
            <div className="ab" data-rv>
              {story.map((t) => (
                <p key={t}>{t}</p>
              ))}
              <div className="fc">
                <div>
                  <b>Based in</b>
                  {profile.location}
                </div>
                <div>
                  <b>Focus</b>UX and UI design
                </div>
                <div>
                  <b>Certified</b>Google UX, 2024
                </div>
                <div>
                  <b>Open to</b>UX/UI design roles
                </div>
              </div>
              <div className="cta">
                <a className="btn" href="#works">
                  See my works
                </a>
                <a className="btn g" href={profile.cvLink}>
                  Request my CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Head k="Journey" title="A short timeline." />
          <ol className="tlv">
            {timeline.map((t) => (
              <li key={t.id} data-rv>
                <time>{t.when}</time>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Head k="What I do" title="Where I can help." />
          <div className="tl3">
            {strengths.map((s) => (
              <div key={s.id} className="card" data-rv>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Head k="How I work" title="My way of working." />
          <div className="ref">
            {workStyle.map(([t, b]) => (
              <div key={t} className="card" data-rv>
                <h3>{t}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Head k="Learning" title="Currently learning." />
          <div className="tl3">
            {learning.map((s) => (
              <div key={s.id} className="card" data-rv>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Head k="Beyond client work" title="My own brand." />
          <article className="card wk" data-rv>
            <div className="stg">
              <div className="ae">{aura.name}</div>
            </div>
            <div className="tx">
              <h3>{aura.name}</h3>
              <div className="sb">{aura.subtitle}</div>
              <p>{aura.summary}</p>
              <a className="btn" href={aura.href}>
                Read the case study
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export function WorksPage() {
  return (
    <section style={{ paddingTop: 120 }}>
      <div className="wrap">
        <Head k="Works" title="Selected case studies." />
        <div className="wg">
          <article className="card wk" data-rv>
            <div className="stg">
              <MockWindow />
            </div>
            <div className="tx">
              <h3>{wexdata.name}</h3>
              <div className="sb">{wexdata.subtitle}</div>
              <p>{wexdata.summary}</p>
              <Tags project={wexdata} />
              <a className="btn" href={wexdata.href}>
                Read the full case study
              </a>
            </div>
          </article>
          <article className="card wk" data-rv>
            <div className="stg">
              <div className="ae">{aura.name}</div>
            </div>
            <div className="tx">
              <h3>{aura.name}</h3>
              <div className="sb">{aura.subtitle}</div>
              <p>{aura.summary}</p>
              <Tags project={aura} />
              <a className="btn" href={aura.href}>
                Read the full case study
              </a>
            </div>
          </article>
          <div className="card soon" data-rv>
            Next case study
            <br />
            coming soon
          </div>
        </div>
      </div>
    </section>
  );
}

export function CaseStudyPage() {
  return (
    <>
      <section style={{ paddingTop: 116 }}>
        <div className="wrap">
          <a className="btn g sm" href="#works">
            All works
          </a>
          <div className="k" data-rv style={{ marginTop: 34 }}>
            Case study
          </div>
          <h1 className="csh" data-rv>
            WExData: bringing order to a logistics network&rsquo;s internal
            systems
          </h1>
          <p className="l2" data-rv>
            A redesign of the internal platform W Express uses to run its
            nationwide delivery, warehousing, and customer-service operations,
            without breaking what already worked.
          </p>
          <div className="mt" data-rv>
            {Object.entries(wexdata.meta).map(([k, v]) => (
              <div key={k}>
                <b>{k}</b>
                {v}
              </div>
            ))}
          </div>
          <nav className="csn" aria-label="Case study sections">
            {[
              ["cs-ov", "Overview"],
              ["cs-dec", "Decisions"],
              ["cs-res", "Research"],
              ["cs-out", "Outcome"],
              ["cs-ref", "Reflection"],
            ].map(([id, l]) => (
              <a key={id} href={`#${id}`}>
                {l}
              </a>
            ))}
          </nav>
          <Ph label="Hero: the redesigned WExData dashboard" />
          <div className="tl3" style={{ marginTop: 18 }}>
            <div className="card">
              <h3 className="t">The problem</h3>
              <p>
                As modules piled up, the system became hard to navigate for the
                teams who use it daily.
              </p>
            </div>
            <div className="card">
              <h3 className="t">What I did</h3>
              <p>
                Led the information-architecture restructuring and built a
                shared design system across both modules.
              </p>
            </div>
            <div className="card">
              <h3 className="t">The result</h3>
              <p>
                Task-based navigation, clearer hierarchy, consistent patterns,
                and a structure ready for new modules.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="cs-ov">
        <div className="wrap">
          <div className="k" data-rv>
            Overview
          </div>
          <h2 data-rv>
            A system that already worked, just not for the people using it.
          </h2>
          <p className="csp" data-rv>
            W Express runs delivery, warehousing, and customer-service
            operations across a nationwide branch network. The internal system
            behind it, later named WExData, already carried the business&rsquo;s
            core logic. What it lacked was clarity: as modules were added over
            time, it became harder to navigate for the teams who relied on it
            daily.
          </p>
          <div className="call" data-rv>
            My job wasn&rsquo;t to replace it. It was to restructure the
            experience and keep every business rule intact.
          </div>
        </div>
      </section>

      <section id="cs-dec">
        <div className="wrap">
          <div className="k" data-rv>
            Problems and decisions
          </div>
          <h2 data-rv>Six problems, six decisions.</h2>
          <DecisionTabs items={decisions} />
        </div>
      </section>

      <section id="cs-res">
        <div className="wrap">
          <div className="k" data-rv>
            Research and discovery
          </div>
          <h2 data-rv>Where the findings came from.</h2>
          <div className="tl3">
            {research.map((r) => (
              <div key={r.title} className="card" data-rv>
                <h3>{r.title}</h3>
                <ul>
                  {r.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cs-out">
        <div className="wrap">
          <div className="k" data-rv>
            Outcome
          </div>
          <h2 data-rv>Two modules, one system.</h2>
          <div className="g2">
            <Ph label="Operations module" />
            <Ph label="Customer Service module" />
            <Ph label="Interactive prototype walkthrough" />
          </div>
          <div className="mtr">
            <div className="card">
              <b>&mdash;%</b>
              <span>reduction in steps to complete a common task</span>
            </div>
            <div className="card">
              <b>&mdash;</b>
              <span>modules consolidated into clearer categories</span>
            </div>
          </div>
        </div>
      </section>

      <section id="cs-ref">
        <div className="wrap">
          <div className="k" data-rv>
            Reflection
          </div>
          <h2 data-rv>What I took away.</h2>
          <div className="ref">
            {reflections.map(([t, b]) => (
              <div key={t} className="card" data-rv>
                <h3>{t}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
          <div className="cta" style={{ marginTop: 28 }}>
            <a className="btn" href="#works">
              Back to all works
            </a>
            <a className="btn g" href={profile.cvLink}>
              Request my CV
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactCta() {
  const { name } = useObservable(services.chat);
  return (
    <section className="end" id="contact">
      <div className="wrap">
        <div className="card" data-rv>
          <h2 data-rv>
            Let&rsquo;s build something clear together{name ? `, ${name}` : ""}.
          </h2>
          <div className="cta">
            <a className="btn" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="btn g" href={profile.cvLink}>
              Request my CV
            </a>
            <a
              className="btn g"
              href={profile.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AuraCaseStudyPage() {
  return (
    <>
      <section style={{ paddingTop: 116 }}>
        <div className="wrap">
          <a className="btn g sm" href="#works">
            All works
          </a>
          <div className="k" style={{ marginTop: 34 }} data-rv>
            Case study
          </div>
          <h1 className="csh" data-rv>
            Aura &amp; Essence: a fragrance store designed around how the shop
            really works
          </h1>
          <p className="l2" data-rv>
            {aura.summary}
          </p>
          <div className="mt" data-rv>
            {Object.entries(aura.meta).map(([k, v]) => (
              <div key={k}>
                <b>{k}</b>
                {v}
              </div>
            ))}
          </div>
          <div className="cta" style={{ marginBottom: 22 }}>
            <a
              className="btn"
              href={AURA_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the live site
            </a>
          </div>
          <nav className="csn" aria-label="Case study sections">
            {[
              ["as-ov", "Overview"],
              ["as-feat", "What I built"],
              ["as-dec", "Decisions"],
              ["as-scr", "Screens"],
              ["as-ref", "Reflection"],
            ].map(([id, l]) => (
              <a key={id} href={`#${id}`}>
                {l}
              </a>
            ))}
          </nav>
          <Ph label="Hero: the Aura & Essence storefront" />
          <div className="tl3" style={{ marginTop: 18 }}>
            <div className="card">
              <h3 className="t">The challenge</h3>
              <p>
                Sell a product people can&rsquo;t smell online, and run the
                business without spreadsheets.
              </p>
            </div>
            <div className="card">
              <h3 className="t">What I did</h3>
              <p>
                Designed a mood-first storefront, an app-like checkout, and an
                admin that tracks sizes and profit.
              </p>
            </div>
            <div className="card">
              <h3 className="t">Where it stands</h3>
              <p>Live, and has already sold bottles to real customers.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="as-ov">
        <div className="wrap">
          <Head k="Overview" title="A store as considered as the product." />
          <p className="csp" data-rv>
            Aura &amp; Essence is my own fragrance business. I wanted an online
            store that felt as considered as the scents themselves, and an admin
            that answers the owner&rsquo;s real questions: what&rsquo;s selling,
            what it costs, and what I&rsquo;m actually earning.
          </p>
          <div className="call" data-rv>
            Every screen had to match how the business really operates.
          </div>
        </div>
      </section>

      <section id="as-feat">
        <div className="wrap">
          <Head k="What I built" title="Three surfaces, one brand." />
          <div className="tl3">
            <div className="card" data-rv>
              <h3>Storefront</h3>
              <ul>
                <li>Cinematic hero with the brand&rsquo;s own photos</li>
                <li>Shorter homepage that reaches the scents faster</li>
                <li>Scent popup that shows more, faster</li>
              </ul>
            </div>
            <div className="card" data-rv>
              <h3>Cart and checkout</h3>
              <ul>
                <li>App-like flow with clear steps</li>
                <li>No shipping fee or free-shipping bar</li>
                <li>Trust elements at the moment of decision</li>
              </ul>
            </div>
            <div className="card" data-rv>
              <h3>Admin</h3>
              <ul>
                <li>Sizes per scent without re-entering details</li>
                <li>Expense tracking and true net profit</li>
                <li>Notifications that can be trusted</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="as-dec">
        <div className="wrap">
          <Head
            k="Problems and decisions"
            title="Six problems, six decisions."
          />
          <DecisionTabs items={auraDecisions} />
        </div>
      </section>

      <section id="as-scr">
        <div className="wrap">
          <Head k="Screens" title="The brand across every surface." />
          <div className="g2">
            <Ph label="Storefront homepage" />
            <Ph label="Scent popup" />
            <Ph label="Cart and checkout" />
            <Ph label="Admin dashboard" />
          </div>
        </div>
      </section>

      <section id="as-ref">
        <div className="wrap">
          <Head k="Reflection" title="What I took away." />
          <div className="tl3">
            {auraReflections.map(([t, b]) => (
              <div key={t} className="card" data-rv>
                <h3>{t}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
          <div className="cta" style={{ marginTop: 28 }}>
            <a
              className="btn"
              href={AURA_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the live site
            </a>
            <a className="btn g" href="#works">
              Back to all works
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
