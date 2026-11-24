import type { CSSProperties } from "react";
import { INTRO_STEPS } from "../core/IntroSequence";
import { services } from "../core/services";
import { useObservable } from "../hooks";

/** Loading screen: a wireframe that turns into a finished UI as the design process runs. */
export function Preloader() {
  const s = useObservable(services.intro);
  if (s.phase === "done") return null;
  const p = s.progress;
  const jOff = 100 - Math.min(1, p * 2) * 100;
  const rOff = 100 - Math.max(0, (p - 0.4) / 0.6) * 100;
  return (
    <div
      className={`intro${s.phase === "exiting" ? " out" : ""}`}
      data-stage={s.step}
      role="status"
      aria-label="Loading portfolio"
      style={{ "--p": p } as CSSProperties}
    >
      <div className="ldr">
        <svg className="inf-mark" viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <linearGradient id="ig" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#00abf1" />
              <stop offset="1" stopColor="#6b5cff" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="15" fill="url(#ig)" />
          <g
            fill="none"
            stroke="#fff"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={jOff}
              d="M27 17V37Q27 46 19 46Q14 46 12 42"
            />
            <path
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={rOff}
              d="M37 47V17H44Q52 17 52 25Q52 33 44 33H37M44 33L52 47"
            />
          </g>
        </svg>
        <div className="inf-frame">
          <i />
          <i />
          <i />
          <i />
          <span className="inf-size">1440 &times; 900</span>
          <div className="wf" aria-hidden="true">
            <div className="wf-n">
              <i />
              <b />
              <b />
              <b />
            </div>
            <div className="wf-h">
              <div className="l">
                <b />
                <b />
                <em />
              </div>
              <div className="img" />
            </div>
            <div className="wf-c">
              <div className="c" />
              <div className="c" />
              <div className="c" />
            </div>
          </div>
        </div>
        <div className="inf-meta">
          <span key={s.step} className="inf-step">
            {INTRO_STEPS[s.step]}
          </span>
          <b>{Math.round(p * 100)}%</b>
        </div>
        <div className="inf-bar">
          <i style={{ transform: `scaleX(${p})` }} />
        </div>
      </div>
    </div>
  );
}
