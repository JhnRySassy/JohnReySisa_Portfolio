import { useEffect, useState } from 'react';
import { services } from '../core/services';
import { profile } from '../domain/data';
import { useObservable } from '../hooks';

const NAV: ReadonlyArray<readonly [string, string]> = [['home', 'Home'], ['about', 'About'], ['works', 'Works'], ['contact', 'Contact']];

export function Header() {
  const route = useObservable(services.router);
  useObservable(services.theme);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const active = route.view === 'wexdata' || route.view === 'aura' ? 'works' : route.view;
  const [first, ...rest] = profile.fullName.split(' ');
  const last = rest.pop();

  useEffect(() => { setOpen(false); }, [route.key]);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      setProgress(h > 0 ? scrollY / h : 0);
      setScrolled(scrollY > 8);
    };
    f();
    addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="wrap hd">
        <a className="logo" href="#home"><b>{[first, ...rest].join(' ')}</b> {last}</a>
        <nav className="pillnav" aria-label="Main">
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>)}
        </nav>
        <div className="hr">
          <a className="btn s" href={profile.cvLink}>Request CV
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9" /></svg>
          </a>
          <button className="ic mb" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
            <svg viewBox="0 0 24 24"><line className="l1" x1="4" y1="8" x2="20" y2="8" /><line className="l2" x1="4" y1="16" x2="20" y2="16" /></svg>
          </button>
          <button className="ic" aria-label="Switch between light and dark mode" onClick={() => services.theme.toggle()}>
            <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
            <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          </button>
        </div>
      </div>
      <div className="bar" style={{ transform: `scaleX(${progress})` }} />
      {open && (
        <div className="mn">
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>)}
          <a className="cv" href={profile.cvLink}>Request my CV</a>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const f = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Manila' });
    const t = () => setTime(f.format(new Date()));
    t();
    const id = setInterval(t, 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <div className="d" style={{ fontSize: '1.6rem' }}>{profile.fullName}</div>
            <p>{profile.role} from the {profile.location}. I design with purpose, empathy, and simplicity. Design is a process, and collaboration makes it meaningful.</p>
            <div className="ftm">Manila time <b>{time}</b></div>
          </div>
          <div><h4>Navigate</h4>{NAV.map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}</div>
          <div><h4>Connect</h4><a href={`mailto:${profile.email}`}>Email</a><a href={profile.cvLink}>Request my CV</a><a href={profile.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></div>
        </div>
        <div className="fw" aria-hidden="true">{profile.fullName}</div>
        <div className="fb"><span>&copy; 2026 {profile.fullName}. All rights reserved.</span><a href="#top">Back to top</a></div>
      </div>
    </footer>
  );
}
