import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { services } from "../core/services";
import { useObservable } from "../hooks";
import {
  certificates,
  principles,
  profile,
  skills,
  steps,
  wexdata,
} from "../domain/data";
import type { Certificate } from "../domain/models";
import { MockWindow } from "./Shared";

const CHIPS: ReadonlyArray<readonly [string, number, number, number]> = [
  ["Shipments", 44, 66, -9],
  ["Fleet", -30, 88, 12],
  ["Routes", -50, 42, -14],
  ["Alerts", 30, -30, 8],
  ["Orders", -22, -52, -6],
  ["Reports", 58, 26, 15],
  ["Search", 36, -84, -12],
  ["Status", -42, -64, 10],
  ["Export", -18, -96, -8],
];

function ClarityDemo() {
  const [t, setT] = useState(0);
  const touched = useRef(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const t0 = performance.now() + 700;
    const f = (n: number) => {
      if (touched.current) return;
      const p = Math.min(Math.max((n - t0) / 2600, 0), 1);
      setT(p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
      if (p < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, []);
  const cap =
    t < 0.34
      ? "Complex workflow"
      : t < 0.99
        ? "Sorting it out"
        : "Obvious to use";
  return (
    <div className="demo" style={{ "--t": t } as CSSProperties}>
      <div className="top">
        <i />
        <i />
        <i />
        <span>Operations dashboard</span>
      </div>
      <div className="stage">
        <div className="chips" aria-hidden="true">
          {CHIPS.map(([name, x, y, r], i) => (
            <div
              key={name}
              className="chip"
              style={
                {
                  "--x": `${x}px`,
                  "--y": `${y}px`,
                  "--r": `${r}deg`,
                } as CSSProperties
              }
            >
              {name}
              <s className={i % 2 === 0 ? "a" : ""} />
            </div>
          ))}
        </div>
      </div>
      <label className="rng" htmlFor="clar">
        Make it obvious <span>{cap}</span>
      </label>
      <input
        id="clar"
        type="range"
        min={0}
        max={100}
        value={Math.round(t * 100)}
        onChange={(e) => {
          touched.current = true;
          setT(Number(e.target.value) / 100);
        }}
        aria-label="Clarity: drag to organize the interface"
      />
    </div>
  );
}

function Hero() {
  return (
    <div className="wrap hero">
      <div className="hg">
        <div>
          <div className="pill">
            <i />
            Open to UX/UI design roles
          </div>
          <h1>
            Interfaces people don&rsquo;t have to <em>think</em> about.
          </h1>
          <p className="lede">
            I&rsquo;m {profile.fullName}, a UX/UI designer from the{" "}
            {profile.location}. I turn complex workflows like logistics
            platforms, internal tools, and dashboards into products that feel
            obvious to use.
          </p>
          <div className="cta">
            <a className="btn" href="#work">
              View case study
            </a>
            <a className="btn g" href={profile.cvLink}>
              Request my CV
            </a>
          </div>
          <div className="facts">
            <span>
              <b>Google</b> UX Design Certified
            </span>
            <span>
              <b>Figma</b> to <b>React</b>
            </span>
            <span>
              <b>{profile.location}</b> based
            </span>
          </div>
        </div>
        <ClarityDemo />
      </div>
    </div>
  );
}

function ChatSection() {
  const chat = services.chat;
  const s = useObservable(chat);
  const [name, setName] = useState("");
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = log.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [s.messages.length, s.typing]);
  return (
    <section id="hello">
      <div className="wrap">
        <div className="k" data-rv>
          Say hi
        </div>
        <h2 data-rv>Skip the scrolling. Just ask me.</h2>
        <div className="cht" data-rv>
          <div className="chh">
            <span className="mono">JR</span>
            <div>
              {profile.shortName}
              <small>Ask me anything about my work</small>
            </div>
          </div>
          <div className="lg" ref={log} data-native-scroll aria-live="polite">
            {s.messages.map((m) => (
              <div key={m.id} className={`bb ${m.from}`}>
                <p>{m.text}</p>
                {m.link && (
                  <a className="btn a" href={m.link.href}>
                    {m.link.label}
                  </a>
                )}
              </div>
            ))}
            {s.typing && (
              <div className="bb me">
                <div className="dt">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
          </div>
          {s.phase === "name" ? (
            <form
              className="nfm"
              onSubmit={(e) => {
                e.preventDefault();
                if (!s.typing) chat.submitName(name);
              }}
            >
              <input
                value={name}
                maxLength={40}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first name (optional)"
                aria-label="Your first name"
                autoComplete="given-name"
              />
              <button type="submit">Say hi</button>
            </form>
          ) : (
            <div className="qk">
              {chat.replies.map((r, i) => (
                <button
                  key={r.label}
                  className={s.used.includes(i) ? "u" : ""}
                  disabled={s.typing}
                  onClick={() => chat.ask(i)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Glyph({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 64 64">
      {id === "purpose" && (
        <>
          <circle cx="32" cy="32" r="26" />
          <circle cx="32" cy="32" r="14" />
          <circle cx="32" cy="32" r="3" fill="var(--ink)" />
        </>
      )}
      {id === "empathy" && (
        <>
          <circle cx="24" cy="32" r="18" />
          <circle cx="40" cy="32" r="18" />
        </>
      )}
      {id === "simplicity" && (
        <>
          <circle cx="32" cy="32" r="26" />
          <path d="M20 32h24" />
        </>
      )}
    </svg>
  );
}

function Principles() {
  return (
    <section>
      <div className="wrap">
        <div className="k" data-rv>
          How I design
        </div>
        <h2 data-rv>Three principles behind every screen.</h2>
        <div className="pr">
          {principles.map((p) => (
            <div key={p.id} className="card" data-rv>
              <Glyph id={p.id} />
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWork() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="k" data-rv>
          Featured case study
        </div>
        <h2 data-rv>Turning operational complexity into a daily tool.</h2>
        <article className="card work" data-rv>
          <div className="stg">
            <MockWindow />
          </div>
          <div className="inf">
            <h3>{wexdata.name}</h3>
            <div className="sb">{wexdata.subtitle}</div>
            <p>{wexdata.summary}</p>
            <div className="meta">
              {["Scope", "Platform", "Tool", "Duration"].map((k) => (
                <div key={k}>
                  <b>{k}</b>
                  {wexdata.meta[k]}
                </div>
              ))}
            </div>
            <a className="btn" href={wexdata.href}>
              Read the full case study
            </a>
          </div>
        </article>
        <div className="vall">
          <a className="btn g" href="#works">
            View all works
          </a>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const ol = ref.current!;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on");
        }),
      { rootMargin: "0px 0px -28% 0px" },
    );
    ol.querySelectorAll("li").forEach((li) => io.observe(li));
    const upd = () => {
      const b = ol.getBoundingClientRect();
      ol.style.setProperty(
        "--pg",
        String(
          Math.max(0, Math.min(1, (innerHeight * 0.6 - b.top) / b.height)),
        ),
      );
    };
    addEventListener("scroll", upd, { passive: true });
    upd();
    return () => {
      io.disconnect();
      removeEventListener("scroll", upd);
    };
  }, []);
  return (
    <section id="process">
      <div className="wrap">
        <div className="k" data-rv>
          Process
        </div>
        <h2 data-rv>From a vague brief to a tested design.</h2>
        <ol className="steps" ref={ref}>
          {steps.map((s) => (
            <li key={s.id} data-n={s.id}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Toolbox() {
  return (
    <section id="toolbox">
      <div className="wrap">
        <div className="k" data-rv>
          Toolbox
        </div>
        <h2 data-rv>Design that can actually be built.</h2>
        <div className="tb">
          {skills.map((g) => (
            <div key={g.id} className="tr" data-rv>
              <h3>{g.title}</h3>
              <div className="pl">
                {g.skills.map((s) => (
                  <span key={s} className={s === g.primary ? "m" : ""}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ c }: { c: Certificate }) {
  return (
    <div className="card cert" data-rv>
      <div className="pp" style={{ "--c": c.color } as CSSProperties}>
        <small>{c.issuer}</small>
        <b>{c.title}</b>
        <s />
        <s />
        <svg className="se" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="21" fill={c.color} />
          <path
            d="M24 12l3.5 7 7.5 1-5.5 5.3 1.4 7.6-6.9-3.7-6.9 3.7 1.4-7.6L13 20l7.5-1z"
            fill="#fff"
          />
        </svg>
      </div>
      <h3>{c.title}</h3>
      <p>
        {c.note} {c.year}
      </p>
    </div>
  );
}

function Credentials() {
  return (
    <section id="certs">
      <div className="wrap">
        <div className="k" data-rv>
          Credentials
        </div>
        <h2 data-rv>Certified and always learning.</h2>
        <div className="certs">
          {certificates.map((c) => (
            <CertCard key={c.id} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <ChatSection />
      <Principles />
      <FeaturedWork />
      <Process />
      <Toolbox />
      <Credentials />
    </>
  );
}
