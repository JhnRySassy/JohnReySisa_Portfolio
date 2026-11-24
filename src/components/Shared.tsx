import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Decision, Project } from '../domain/models';

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

export function Ph({ label, sq }: { label: string; sq?: boolean }) {
  return (
    <div className={`ph${sq ? ' sq' : ''}`} data-rv>
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

export function Head({ k, title }: { k: string; title: string }) {
  return <><div className="k" data-rv>{k}</div><h2 data-rv>{title}</h2></>;
}

export function DecisionTabs({ items }: { items: Decision[] }) {
  const [i, setI] = useState(0);
  const d = items[i];
  return (
    <>
      <div className="ctab" role="tablist">{items.map((x, n) => (
        <button key={x.id} role="tab" aria-selected={n === i} onClick={() => setI(n)}>{n + 1}. {x.label}</button>
      ))}</div>
      <div className="pd"><div><small>Problem</small><p>{d.problem}</p></div><div><small>Decision</small><p>{d.decision}</p></div></div>
    </>
  );
}

export function Note({ title, children }: { title: string; children: ReactNode }) {
  return <aside className="note2" data-rv><b>{title}</b><p>{children}</p></aside>;
}

export function PhonePh({ label }: { label: string }) {
  return (
    <div className="phone" data-rv>
      <div>
        <svg viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="3" /><path d="M11 18.5h2" /></svg>
        Placeholder<br />{label}
      </div>
    </div>
  );
}

/** Full-screen viewer for wide diagrams: scroll to pan, Esc or click outside to close. */
export function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    addEventListener('keydown', key);
    document.documentElement.classList.add('lb-open');
    return () => { removeEventListener('keydown', key); document.documentElement.classList.remove('lb-open'); };
  }, [onClose]);
  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={alt} data-native-scroll onClick={onClose}>
      <button className="lb-x" aria-label="Close" onClick={onClose}>&times;</button>
      <div className="lb-s" onClick={(e) => e.stopPropagation()}><img src={src} alt={alt} /></div>
    </div>
  );
}
