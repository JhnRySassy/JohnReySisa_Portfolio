import { BrandColor, BrandFont, Certificate, Chapter, Decision, Flow, Principle, ProcessStep, Profile, Project, Shot, SkillGroup, Strength, TimelineEvent } from './models';
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
  { Type: 'Personal venture', Role: 'Founder and designer', Platform: 'Web storefront and admin', Scope: 'Storefront UX/UI, cart and checkout, admin dashboard', Stack: 'HTML, CSS, JavaScript, Supabase', Status: 'Live' });
export const AURA_URL = 'https://aura-essence-website.vercel.app/';
export const auraDecisions = [
  new Decision('a1', 'Mood first', 'A fragrance can\u2019t be smelled online, so the first screen has to carry the feeling of the brand.', 'I built the hero around the brand\u2019s own product photography on a dark, gold-accented page, with the name set large in Cormorant Garamond, so the mood lands before anyone reads a word.'),
  new Decision('a2', 'Three-step checkout', 'A long, form-heavy cart makes people hesitate.', 'I turned checkout into a three-step bag sheet (Bag, Details, Review) with a running order summary, so people always know where they are and what they\u2019ll pay.'),
  new Decision('a3', 'No shipping noise', 'Orders are handed over by delivery or meetup, yet a courier-style cart would show shipping fees and free-shipping progress.', 'I left both out and asked for a \u201cDelivery / Meetup location\u201d instead, with cash on delivery, meetup, or GCash, so the bag matches how the business really sells.'),
  new Decision('a4', 'Sizes without re-entry', 'Adding a new bottle size meant re-entering all of a scent\u2019s information.', 'I restructured products so a 20ml bottle is its own row linked to its 50ml scent. Photo, notes, and description sync automatically, and only price, stock, and cost belong to each size.'),
  new Decision('a5', 'True profit', 'Revenue alone doesn\u2019t show whether the business is really earning.', 'I added expense tracking (packaging, ads, shipping, other), so the admin reports net profit as sales minus the cost of bottles sold minus expenses.'),
  new Decision('a6', 'Trust where buyers hesitate', 'First-time buyers of a small brand need reassurance.', 'I added reviews in customers\u2019 own words, an FAQ, a welcome offer, and order tracking with an Order ID issued instantly, so the brand feels dependable.'),
  new Decision('a7', 'Help people choose', 'Choosing a perfume you can\u2019t smell is the hardest part of buying one.', 'I added a scent finder and filters by scent profile and weather, so shoppers can narrow down by how they want to feel.'),
  new Decision('a8', 'Phone first', 'A small brand is mostly discovered and shopped on a phone.', 'I designed the phone screens first, then scaled the layout up to desktop, so the small screen is never an afterthought.'),
];
export const auraReflections = [
  ['Design for the real business', 'The best change was removing things that didn\u2019t match how the shop works, like shipping fees.'],
  ['Admin UX matters too', 'The admin is where the owner spends their time, so it deserves the same care as the storefront.'],
  ['Trust is a design problem', 'Small details like a clean 404, a loading screen, and a good share preview make a small brand feel dependable.'],
];

/* ---------- WExData: flows, walkthrough video, screens ---------- */
export const WEX = `${import.meta.env.BASE_URL}case-studies/wexdata/`; // follows the Vite `base`, so it also works on GitHub Pages
export const flows = [
  new Flow('f1', 'Sign-in', '2 checks', 'captcha and email OTP before the dashboard',
    'From opening the app to the dashboard, with the captcha and OTP checks.',
    ['Errors stay inline: field errors and a captcha-failed modal send people back to the form.', 'A wrong code shows an error banner, with resend available after 30 seconds.'],
    WEX + 'flow-1-sign-in.webp', 'User flow: sign-in with captcha and email OTP'),
  new Flow('f2', 'Navigation', '3 modules', '11 pages, plus a reserved Billing slot',
    'How people move around: sidebar modules, top bar tools, and the account menu.',
    ['The sidebar holds Admin, Operations, and Customer Service, with search, favorites, and collapse.', 'The top bar keeps Quick Track, notifications, and the account menu one click away.', 'Billing is marked out of scope and shows a Coming Soon page.'],
    WEX + 'flow-2-navigation.webp', 'User flow: navigation through the sidebar, top bar, and account menu'),
  new Flow('f3', 'Record management', '1 pattern', 'shared by every Manage page',
    'One shared pattern for listing, adding, editing, deleting, and locking records.',
    ['Required fields are checked on save, with red fields and a count of items to fix.', 'Leaving a form with unsaved changes asks first.', 'Locked rows disable edit and delete while staying Active.'],
    WEX + 'flow-3-record-management.webp', 'User flow: record management pattern used on every Manage page'),
  new Flow('f4', 'Shipment journey', '12 checkpoints', 'from booking to delivery',
    'A booking moving through each checkpoint until delivery. Dashed steps are awaiting approval.',
    ['Exceptions have their own paths: a Wrong Drop Alert, and SI tagging with a manual override approved by PIN.', 'Dashed steps are pending approval (ODMS revisions).'],
    WEX + 'flow-4-shipment-journey.webp', 'User flow: shipment journey for Operations and Customer Service'),
];
export const chapters = [
  new Chapter('c1', 'Login', 0), new Chapter('c2', 'Verify OTP', 6.5), new Chapter('c3', 'Operations Dashboard', 10),
  new Chapter('c4', 'Inbound / Outbound Scan', 20), new Chapter('c5', 'Manage City', 33), new Chapter('c6', 'City Form', 39.5),
  new Chapter('c7', 'HWB Preparation', 46), new Chapter('c8', 'Booking', 52), new Chapter('c9', 'Rate Calculator', 58), new Chapter('c10', 'Quick Track', 62.5),
];
export const shots = [
  new Shot('login', 'Login', 'Sign-in card with username, password, and captcha.', WEX + 'screen-login.webp'),
  new Shot('dash', 'Operations dashboard', 'Route match rates, the no-scan list, and a match-rate guide.', WEX + 'screen-operations-dashboard.webp'),
  new Shot('scan', 'Inbound / outbound scan', 'Scan an HWB, attach a checkpoint scan image, and review the scanning records.', WEX + 'screen-inbound-outbound-scan.webp'),
  new Shot('city', 'Manage City', 'The shared Manage pattern: search, filters, and row actions.', WEX + 'screen-manage-city.webp'),
  new Shot('hwb', 'HWB preparation', 'A long form split into clear sections, with the primary actions pinned at the bottom.', WEX + 'screen-hwb-preparation.webp'),
  new Shot('track', 'Quick Track', 'HWB status and a timeline from the top bar, without leaving the page.', WEX + 'screen-quick-track.webp'),
];
export const wexNext = [
  'Design the Billing module. It\u2019s marked out of scope and shows a Coming Soon page today.',
  'Validate the shipment-journey steps still marked for approval once the revisions are signed off.',
  'Run usability sessions with operations and customer-service staff on the new navigation, and record steps and time per task.',
  'Document the shared Manage pattern as a component library developers can build from.',
];
/* ---------- Aura & Essence: brand + next steps. Fill brandColors / brandFonts with the real values. ---------- */
export const brandColors = [
  new BrandColor('c1', 'Ink', '#0e0d0c', 'Page background, dark theme'),
  new BrandColor('c2', 'Parchment', '#ede7da', 'Text, dark theme'),
  new BrandColor('c3', 'Brass', '#b08d4f', 'Gold lines'),
  new BrandColor('c4', 'Bright brass', '#d4b26a', 'Gold text and buttons'),
  new BrandColor('c5', 'Cream', '#f6f1e8', 'Page background, light theme'),
  new BrandColor('c6', 'Deep brass', '#8a682a', 'Gold text, light theme'),
];
export const brandFonts = [
  new BrandFont('f1', 'Display', 'Cormorant Garamond'),
  new BrandFont('f2', 'Body', 'Jost'),
];
export const auraNext = [
  'Automate GCash payment confirmation. Today customers send a screenshot on Messenger and it\u2019s confirmed by hand.',
  'Add courier shipping and card payments if the business grows beyond meetups and cash on delivery.',
  'Track which scents get opened versus bought, then use it to improve the scent popup.',
  'Run a mobile performance pass on the hero image and film.',
];
/* ---------- Aura & Essence: real screens from the site ---------- */
export const AURA_ASSETS = `${import.meta.env.BASE_URL}case-studies/aura/`;
export const AURA_LOGOS = { gold: AURA_ASSETS + 'ae-logo-gold.svg', black: AURA_ASSETS + 'ae-logo-black.svg' };
export const auraHero = new Shot('ah', 'Storefront', 'The homepage: photography first, with the brand name set large.', AURA_ASSETS + 'storefront-hero.webp');
export const auraShots = [
  new Shot('as1', 'Two lines, one house', 'The black cap line for him and the gold cap line for her.', AURA_ASSETS + 'collection.webp'),
  new Shot('as2', 'Shop a line', 'Search, scent-profile and weather filters, and favorites.', AURA_ASSETS + 'product-grid.webp'),
  new Shot('as3', 'Scent popup', 'Notes, longevity, projection and strength at a glance, and add to bag.', AURA_ASSETS + 'scent-popup.webp'),
  new Shot('as4', 'The bag', 'Bag, Details, Review, with a running order summary and picks you may also like.', AURA_ASSETS + 'bag.webp'),
  new Shot('as5', 'Light theme', 'The same brand on cream, switched from the header.', AURA_ASSETS + 'light-theme.webp'),
];
export const auraPhones = [
  new Shot('ap1', 'Home', 'The hero at phone size.', AURA_ASSETS + 'phone-home.webp'),
  new Shot('ap2', 'Scent popup', 'Details without leaving the page.', AURA_ASSETS + 'phone-popup.webp'),
  new Shot('ap3', 'Bag', 'The three-step bag on a small screen.', AURA_ASSETS + 'phone-bag.webp'),
];
