import { ChatEngine } from './ChatEngine';
import { DesignerCursor } from './DesignerCursor';
import { Revealer } from './Revealer';
import { Router } from './Router';
import { SmoothScroller } from './SmoothScroller';
import { ThemeService } from './ThemeService';
import { profile, replies } from '../domain/data';

/** Composition root: one instance of each service for the whole app. */
export const services = {
  theme: new ThemeService(),
  router: new Router(),
  scroller: new SmoothScroller(),
  reveal: new Revealer(),
  cursor: new DesignerCursor(profile.shortName),
  chat: new ChatEngine(profile, replies),
};
