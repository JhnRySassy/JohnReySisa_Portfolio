import { Certificate, Decision, Principle, ProcessStep, Profile, Project, SkillGroup } from './models';
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
