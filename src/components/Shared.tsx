import type { Project } from '../domain/models';

export function MockWindow() {
  const bars = [45, 70, 55, 90, 62, 80, 100];
  return (
    <div className="win" aria-hidden="true">
      <div className="tp"><i /><i /><i /></div>
      <div className="sd">
        <div className="nv"><i /><i /><i /><i /></div>
        <div>
          <div className="stt"><div><b>248</b>Orders</div><div><b>31</b>On route</div><div><b>96%</b>On time</div></div>
          <div className="ch">{bars.map((h, i) => <b key={i} style={{ height: `${h}%` }} />)}</div>
          <div className="rw">Manila hub<em>Delayed</em></div>
          <div className="rw">Cebu hub<span>On time</span></div>
        </div>
      </div>
    </div>
  );
}

export function Ph({ label }: { label: string }) {
  return (
    <div className="ph" data-rv>
      <div>
        <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="9" cy="10" r="1.6" /><path d="M4 18l5-5 4 4 3-3 4 4" /></svg>
        Placeholder<br />{label}
      </div>
    </div>
  );
}

export function Tags({ project }: { project: Project }) {
  return <div className="pl">{project.tags.map((t) => <span key={t}>{t}</span>)}</div>;
}
