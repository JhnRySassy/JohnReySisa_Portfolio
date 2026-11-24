import { Certificate, Decision, Principle, ProcessStep, Profile, Project, SkillGroup, Strength, TimelineEvent } from './models';
import { QuickReply } from '../core/ChatEngine';

export const profile = new Profile('John Rey Sisa', 'UX/UI designer', 'johnreysisa1@gmail.com', 'https://www.facebook.com/jhnrysisa/', 'Philippines');

export const principles = [
  new Principle('purpose', 'Purpose', 'Every element earns its place by serving a clear user need and a business goal.'),
  new Principle('empathy', 'Empathy', 'I start from how people actually work, then design around their context, not my assumptions.'),
  new Principle('simplicity', 'Simplicity', 'Clarity beats cleverness. The best interface is the one nobody has to figure out.'),
];

export const wexdata = new Project('wexdata', 'WExData', 'Logistics data management system',
  'An internal logistics platform that turns complex operational workflows into an organized, intuitive experience, so teams can manage data, monitor operations, and complete daily tasks faster.',
  ['UX design', 'UI design', 'User research', 'Figma'],
  { Client: 'WExpress | Wide Wide World Express', Duration: 'January 2025 to present', Platform: 'Web application', 'My role': 'UI/UX designer', Scope: 'Research, UX, design system, interactive prototype', Tool: 'Figma' });

export const steps = [
  new ProcessStep('1', 'Project overview', 'Who it\u2019s for, what it has to do, and where the scope ends.'),
  new ProcessStep('2', 'Problem and goals', 'The user need and business objective, written down so decisions can be checked against them.'),
  new ProcessStep('3', 'Research and insights', 'Talking to the people who use the tool, then turning what they say into findings the team can act on.'),
  new ProcessStep('4', 'Ideation and prioritization', 'Exploring several directions, choosing one, and recording why.'),
  new ProcessStep('5', 'Wireframes and user flows', 'Structure, navigation, and journeys before any visual polish.'),
  new ProcessStep('6', 'UI and interaction design', 'The final visuals and interactions, with each key decision explained.'),
  new ProcessStep('7', 'Testing and iteration', 'Putting the design in front of users, finding what breaks, and refining.'),
  new ProcessStep('8', 'Results and reflection', 'What changed, what I learned, and what I\u2019d improve next.'),
];

export const skills = [
  new SkillGroup('ui', 'Interface design', ['Figma', 'Framer', 'Sketch'], 'Figma'),
  new SkillGroup('ux', 'UX practice', ['User research', 'User flows', 'Prototyping', 'Design systems']),
  new SkillGroup('ai', 'AI and visuals', ['Claude Design', 'Photoshop', 'Illustrator', 'Animation']),
  new SkillGroup('fe', 'Front end', ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React']),
  new SkillGroup('be', 'Backend and data', ['PostgreSQL', 'Supabase']),
  new SkillGroup('ex', 'Exploring', ['Blender', '3D modeling']),
];

export const certificates = [
  new Certificate('g', 'GOOGLE', 'Google UX Design Professional Certificate', 'Seven courses: research, wireframing, prototyping, testing, portfolio.', '2024', '#00abf1'),
  new Certificate('u1', 'UX+ CONFERENCE', 'UX+ Conference 2025', 'Concept event website for speakers, schedules, and sessions.', '2025', '#6b5cff'),
  new Certificate('u2', 'UX+AI CONFERENCE', 'UX+AI Conference 2026', 'Attended at SMX Convention Center Manila on AI in UX and product design.', '2026', '#10141b'),
];

export const decisions = [
  new Decision('d1', 'Navigation hops', 'Navigation required going through multiple modules to find one function.', 'I reorganized the module structure into clear, task-based categories, cutting the steps between login and the function someone actually needs.'),
  new Decision('d2', 'Scattered functions', 'Related functions weren\u2019t grouped, so their place in the system was unclear.', 'I regrouped functions by workflow rather than by system origin, so the structure matches how operations and customer-service teams think.'),
  new Decision('d3', 'Dense screens', 'Dense screens made it hard to scan for what mattered.', 'I rebuilt hierarchy and spacing so the most important data and actions are identifiable at a glance.'),
  new Decision('d4', 'Inconsistent UI', 'Inconsistent UI patterns across modules slowed people down.', 'I standardized components and interaction patterns into a shared design system that carries across modules.'),
  new Decision('d5', 'Scaling', 'The structure wouldn\u2019t scale as more modules were added.', 'I designed the navigation and layout model to absorb new modules without another restructuring.'),
  new Decision('d6', 'Business rules', 'Business logic had to survive the redesign untouched.', 'Every rule and requirement was mapped before any screen was touched, so the redesign improved the experience without breaking operations.'),
];

export const research = [
  { title: 'Existing system audit', items: ['Mapped the current navigation and module structure', 'Flagged screens with dense or unclear information', 'Catalogued existing interaction patterns'] },
  { title: 'Business requirements', items: ['Documented rules that had to be preserved', 'Traced how modules supported operations vs. customer service', 'Identified constraints for the new structure'] },
  { title: 'Stakeholder feedback', items: ['Design reviews with operations leads', 'Iterated navigation based on real workflow gaps', 'Validated module groupings before build-out'] },
];

export const reflections = [
  ['Enterprise UX is about understanding', 'Working on WExData taught me that enterprise UX is often about making complex systems easier to understand, not just making interfaces look better.'],
  ['Organization shapes navigation', 'When a system has many modules and workflows, how information is organized changes how easily people move through it.'],
  ['Feedback sharpens the work', 'Refining continuously with stakeholder feedback made the solution stronger with every iteration.'],
  ['Consistency builds trust', 'Consistent components, patterns, and behaviors make a large system feel predictable and easier to navigate.'],
];

export const replies = [
  new QuickReply('What do you do?', 'I design interfaces for complex workflows: logistics platforms, internal tools, and dashboards. My goal is simple: the person using it shouldn\u2019t have to stop and think.', { label: 'More about me', href: '#about' }),
  new QuickReply('Show me your best work', 'My featured project is WExData, a logistics data management system. It turns messy operations into one organized, easy-to-scan experience.', { label: 'Read the case study', href: '#wexdata' }),
  new QuickReply('Which tools do you use?', 'Figma first, plus Framer and Sketch. I also work in HTML, CSS, JavaScript, TypeScript, and React, with PostgreSQL and Supabase on the data side, so what I design can actually be built.'),
  new QuickReply('Are you open to work?', 'Yes, I\u2019m open to UX/UI design roles. Ask for my CV and I\u2019ll send it over.', { label: 'Request my CV', href: profile.cvLink }),
  new QuickReply('How can I reach you?', 'Email is best. You can write to me directly at the bottom of this page.', { label: 'Get in touch', href: '#contact' }),
];

/* ---------- About page ---------- */
export const story = [
  'I\u2019m John Rey Sisa, a UX/UI designer from the Philippines. I turn complex workflows like logistics platforms, internal tools, and dashboards into products that feel obvious to use.',
  'I design in Figma and Framer, and I work in HTML, CSS, JavaScript, TypeScript, and React, so what I design is made with development in mind.',
  'I believe design is a process, and collaboration makes it meaningful.',
];
export const timeline = [
  new TimelineEvent('t1', '2024', 'Google UX Design Professional Certificate', 'Completed seven courses covering research, wireframing, prototyping, testing, and portfolio building.'),
  new TimelineEvent('t2', 'January 2025', 'Started on WExData', 'UI/UX designer on the internal logistics platform for WExpress, restructuring navigation and building a shared design system.'),
  new TimelineEvent('t3', '2025', 'UX+ Conference 2025', 'Built a concept event website for speakers, schedules, and sessions.'),
  new TimelineEvent('t4', '2026', 'UX+AI Conference 2026', 'Attended at SMX Convention Center Manila on AI in UX and product design.'),
];
export const strengths = [
  new Strength('s1', 'UX research and flows', 'Audits, stakeholder feedback, and user flows that turn messy requirements into a clear structure.'),
  new Strength('s2', 'UI and design systems', 'Consistent components and patterns that make large products feel predictable.'),
  new Strength('s3', 'Design to code', 'I work in HTML, CSS, JavaScript, TypeScript, and React, so designs are built with development in mind.'),
];
export const workStyle = [
  ['Start with the problem, not the screen', 'I define the user need and the business goal first, so every design decision has something to be checked against.'],
  ['Design with developers in mind', 'I think in components and states, which makes handoff smoother and the result closer to the design.'],
  ['Write decisions down', 'I document why, not just what, so stakeholders can follow the reasoning.'],
  ['Welcome feedback early', 'Rough work in front of real people beats polished work made in a vacuum.'],
];
export const learning = [
  new Strength('l1', 'TypeScript', 'Type-safe front-end code for products built on design systems.'),
  new Strength('l2', 'The MERN stack', 'Express, MongoDB, and React, to understand the full path from interface to data.'),
  new Strength('l3', 'QA automation', 'Playwright with JavaScript, to test the flows I design.'),
];

/* ---------- Aura & Essence case study ---------- */
export const aura = new Project('aura', 'Aura & Essence', 'Fragrance storefront and admin',
  'A branded online storefront and admin dashboard for my own fragrance business, designed around how the shop really operates: no shipping, several bottle sizes per scent, and clear profit tracking.',
  ['UX design', 'UI design', 'E-commerce', 'Admin dashboard'],
  { Type: 'Personal venture', Role: 'Founder and designer', Platform: 'Web storefront and admin', Scope: 'Storefront UX/UI, cart and checkout, admin dashboard', Status: 'Live' });
export const AURA_URL = 'https://aura-essence-website.vercel.app/';
export const auraDecisions = [
  new Decision('a1', 'Mood first', 'A fragrance can\u2019t be smelled online, so the first screen has to carry the feeling of the brand.', 'I replaced the homepage hero with a cinematic one built on the brand\u2019s own product photos, and shortened the page so visitors reach the scents faster.'),
  new Decision('a2', 'App-like checkout', 'A long, form-heavy cart makes people hesitate.', 'I redesigned the cart and checkout to feel like an app: clear steps, fewer distractions, and a faster path to done.'),
  new Decision('a3', 'No shipping noise', 'The shop doesn\u2019t ship orders, yet the cart still showed shipping fees and free-shipping progress.', 'I removed both, so what customers see matches how the business actually works.'),
  new Decision('a4', 'Sizes without re-entry', 'Adding a new bottle size meant re-entering all of a scent\u2019s information.', 'I restructured products so a 20ml size can be added to each scent without duplicating its details, alongside the existing 50ml.'),
  new Decision('a5', 'True profit', 'Revenue alone doesn\u2019t show whether the business is really earning.', 'I added expense tracking for packaging, ads, and shipping, so the admin shows true net profit.'),
  new Decision('a6', 'Trust and polish', 'First-time buyers of a small brand need reassurance.', 'I added trust elements, a better scent popup, a loading screen, a custom 404, and a social preview so the brand holds up wherever it\u2019s shared.'),
];
export const auraReflections = [
  ['Design for the real business', 'The best change was removing things that didn\u2019t match how the shop works, like shipping fees.'],
  ['Admin UX matters too', 'The admin is where the owner spends their time, so it deserves the same care as the storefront.'],
  ['Trust is a design problem', 'Small details like a clean 404, a loading screen, and a good share preview make a small brand feel dependable.'],
];
