import { useEffect } from 'react';
import type { Disposable } from './core/Observable';
import { services } from './core/services';
import { useObservable } from './hooks';
import { Footer, Header } from './components/Chrome';
import { HomePage } from './components/Home';
import { AboutPage, AuraCaseStudyPage, CaseStudyPage, ContactCta, WorksPage } from './components/Pages';

const TITLES = {
  home: 'John Rey Sisa | UX/UI Designer',
  about: 'About | John Rey Sisa',
  works: 'Works | John Rey Sisa',
  wexdata: 'WExData case study | John Rey Sisa',
  aura: 'Aura & Essence case study | John Rey Sisa',
} as const;

export default function App() {
  const route = useObservable(services.router);

  useEffect(() => {
    const all = Object.values(services) as Disposable[];
    all.forEach((s) => s.init());
    return () => all.forEach((s) => s.destroy());
  }, []);

  useEffect(() => {
    document.title = TITLES[route.view];
    services.reveal.scan();
    const id = requestAnimationFrame(() => {
      const el = route.anchor ? document.getElementById(route.anchor) : null;
      if (el) services.scroller.scrollTo(el.getBoundingClientRect().top + scrollY - 84);
      else services.scroller.jump(0);
    });
    return () => cancelAnimationFrame(id);
  }, [route.key]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header />
      <main id="top">
        {route.view === 'home' && <HomePage />}
        {route.view === 'about' && <AboutPage />}
        {route.view === 'works' && <WorksPage />}
        {route.view === 'wexdata' && <CaseStudyPage />}
        {route.view === 'aura' && <AuraCaseStudyPage />}
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
