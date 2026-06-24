import type { Mode } from '../../components/TopNav';

export interface QuickLink {
  name: string;
  url: string;
  icon?: any;
}

export interface CustomLink extends QuickLink {
  id: string;
  scope: 'global' | 'project';
  projectId?: string;
  targetType: 'universal' | 'topic';
  targetTopics?: string[];
}

export interface Topic {
  id: string;
  name: string;
  icon: any;
  modes: Mode[];
  quickLinks: QuickLink[];
}

export interface Category {
  id: string;
  name: string;
  topics: Topic[];
}

export const universalLinks: QuickLink[] = [
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'Analytics', url: 'https://analytics.google.com' },
  { name: 'Vercel', url: 'https://vercel.com' },
];

export const generateId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

export const globalTopicLinks: Record<string, {name: string, url: string}[]> = {
  'welcome': [
    { name: 'Guide: How to build with AI', url: 'https://github.com/notUbaid/Kontxt' },
    { name: 'Tool: Antigravity IDE', url: 'https://deepmind.google/technologies/gemini/' },
    { name: 'Tool: Cursor IDE', url: 'https://cursor.sh/' }
  ],
  'ideadefinition': [
    { name: 'YC: Evaluate Ideas', url: 'https://www.ycombinator.com/library/6e-how-to-evaluate-startup-ideas' },
    { name: 'Tool: Google Trends', url: 'https://trends.google.com/' },
    { name: 'Tool: Exploding Topics', url: 'https://explodingtopics.com/' }
  ],
  'problemstatement': [
    { name: 'Lenny: Validate Idea', url: 'https://www.lennysnewsletter.com/p/validating-your-startup-idea' },
    { name: 'Tool: Typeform (Surveys)', url: 'https://www.typeform.com/' },
    { name: 'Tool: GigaBrain (Reddit Search)', url: 'https://thegigabrain.com/' }
  ],
  'userpainpoints': [
    { name: 'YC: Get Startup Ideas', url: 'https://www.ycombinator.com/library/8g-how-to-get-startup-ideas' },
    { name: 'Tool: G2 (Competitor Reviews)', url: 'https://www.g2.com/' },
    { name: 'Tool: Capterra (Software Reviews)', url: 'https://www.capterra.com/' }
  ],
  'targetusers': [
    { name: 'Superhuman PMF Engine', url: 'https://firstround.com/review/how-superhuman-built-an-engine-to-find-product-market-fit/' },
    { name: 'Tool: Apollo.io (B2B Leads)', url: 'https://www.apollo.io/' },
    { name: 'Tool: LinkedIn Sales Nav', url: 'https://business.linkedin.com/sales-solutions/sales-navigator' }
  ],
  'icpidealcustomerprofile': [
    { name: 'Superhuman PMF Engine', url: 'https://firstround.com/review/how-superhuman-built-an-engine-to-find-product-market-fit/' },
    { name: 'Tool: Apollo.io (B2B Leads)', url: 'https://www.apollo.io/' },
    { name: 'Tool: LinkedIn Sales Nav', url: 'https://business.linkedin.com/sales-solutions/sales-navigator' }
  ],
  'personas': [
    { name: 'Lenny: Jobs to be Done', url: 'https://www.lennysnewsletter.com/p/jobs-to-be-done' },
    { name: 'Tool: ADPList (User Interviews)', url: 'https://adplist.org/' },
    { name: 'Tool: Hubspot Persona Maker', url: 'https://www.hubspot.com/make-my-persona' }
  ],
  'solutionstatement': [
    { name: 'Amazon Working Backwards', url: 'https://www.workingbackwards.com/' },
    { name: 'Template: Coda PR/FAQ', url: 'https://coda.io/@coda/amazon-pr-faq' },
    { name: 'Tool: FigJam (Brainstorming)', url: 'https://www.figma.com/figjam/' }
  ],
  'valueproposition': [
    { name: 'Strategyzer Canvas', url: 'https://www.strategyzer.com/library/the-value-proposition-canvas' },
    { name: 'Tool: Miro Template', url: 'https://miro.com/templates/value-proposition-canvas/' },
    { name: 'First Round: Value Prop', url: 'https://firstround.com/review/this-is-how-you-write-a-value-proposition/' }
  ],
  'elevatorpitch': [
    { name: 'YC: How to Pitch', url: 'https://www.ycombinator.com/library/6p-how-to-pitch-your-startup' },
    { name: 'Video: Michael Seibel', url: 'https://www.youtube.com/watch?v=11h2q_AOSpY' },
    { name: 'Geoffrey Moore Framework', url: 'https://firstround.com/review/the-positioning-framework-that-has-helped-founders-cut-through-the-noise/' }
  ],
  'marketresearch': [
    { name: 'YC: How to Talk to Users', url: 'https://www.youtube.com/watch?v=MT4HgImiXgg' },
    { name: 'Tool: The Mom Test', url: 'https://www.momtestbook.com/' },
    { name: 'Tool: GigaBrain (Reddit)', url: 'https://thegigabrain.com/' }
  ],
  'competitoranalysis': [
    { name: 'Lenny: How to Win', url: 'https://www.lennysnewsletter.com/p/how-to-win' },
    { name: 'Tool: G2 Reviews', url: 'https://www.g2.com/' },
    { name: 'Tool: Similarweb', url: 'https://www.similarweb.com/' }
  ],
  'existingalternatives': [
    { name: 'First Round: Competing with Excel', url: 'https://firstround.com/review/why-excel-is-your-biggest-competitor/' },
    { name: 'Lenny: The Status Quo', url: 'https://www.lennysnewsletter.com/' },
    { name: 'Tool: Zapier (Integrations)', url: 'https://zapier.com/' }
  ],
  'marketpositioning': [
    { name: 'Book: Obviously Awesome', url: 'https://www.aprildunford.com/obviously-awesome' },
    { name: 'First Round: Positioning', url: 'https://firstround.com/review/the-positioning-framework-that-has-helped-founders-cut-through-the-noise/' },
    { name: 'Tool: Figma Brand Boards', url: 'https://www.figma.com/' }
  ],
  'featureplanning': [
    { name: 'Lenny: Writing PRDs', url: 'https://www.lennysnewsletter.com/p/product-requirements-document-prd' },
    { name: 'Tool: Linear (Issue Tracking)', url: 'https://linear.app/' },
    { name: 'Tool: Notion (Roadmaps)', url: 'https://www.notion.so/' }
  ],
  'mvpfeatures': [
    { name: 'YC: How to Plan an MVP', url: 'https://www.ycombinator.com/library/6e-how-to-plan-an-mvp' },
    { name: 'Masters of Scale: Launching', url: 'https://mastersofscale.com/' },
    { name: 'Tool: Vercel (Deployments)', url: 'https://vercel.com/' }
  ],
  'futurefeatures': [
    { name: 'Lenny: Product Roadmaps', url: 'https://www.lennysnewsletter.com/p/product-roadmaps' },
    { name: 'Intercom: Product Strategy', url: 'https://www.intercom.com/blog/product-strategy/' },
    { name: 'Tool: PostHog (Feature Flags)', url: 'https://posthog.com/' }
  ],
  'featureprioritization': [
    { name: 'Intercom: RICE Framework', url: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/' },
    { name: 'Method: Eisenhower Matrix', url: 'https://todoist.com/productivity-methods/eisenhower-matrix' },
    { name: 'Tool: Jira (Backlog)', url: 'https://www.atlassian.com/software/jira' }
  ],
  'businessmodel': [
    { name: 'David Sacks: SaaSGrid Metrics', url: 'https://saasgrid.com/' },
    { name: 'Tomasz Tunguz: The 10 Metrics', url: 'https://tomtunguz.com/the-10-most-important-metrics-in-a-startup/' },
    { name: 'Tool: BurnRate.io', url: 'https://burnrate.io/' }
  ],
  'pricing': [
    { name: 'Kyle Poyar: Growth Unhinged', url: 'https://www.growthunhinged.com/' },
    { name: 'Patrick Campbell: Pricing Anatomy', url: 'https://www.profitwell.com/recur/all/anatomy-of-saas-pricing-strategy' },
    { name: 'OpenView: B2B Pricing Playbook', url: 'https://openviewpartners.com/blog/saas-pricing-playbook/' }
  ],
  'subscriptionmodel': [
    { name: 'BVP: 10 Laws of Cloud Computing', url: 'https://www.bvp.com/atlas/the-10-laws-of-cloud-computing' },
    { name: 'Tool: Baremetrics Open Startups', url: 'https://baremetrics.com/open-startups' },
    { name: 'Elena Verna: B2B Growth', url: 'https://www.elenaverna.com/' }
  ],
  'revenuestreams': [
    { name: 'Sarah Tavel: Hierarchy of Engagement', url: 'https://sarahtavel.medium.com/the-hierarchy-of-engagement-5803bf4e6cfa' },
    { name: 'SaaStr: Rules of Expansion Revenue', url: 'https://www.saastr.com/the-10-rules-of-expansion-revenue/' },
    { name: 'Ben Thompson: Aggregation Theory', url: 'https://stratechery.com/aggregation-theory/' }
  ],
  'successmetrics': [
    { name: 'Sequoia: Matrix for Series A', url: 'https://www.sequoiacap.com/article/framework-for-series-a/' },
    { name: 'Andrew Chen: Power User Curve', url: 'https://andrewchen.com/the-power-user-curve-the-best-way-to-understand-your-most-engaged-users/' },
    { name: 'Amplitude: Retention Playbook', url: 'https://amplitude.com/retention' }
  ],
  'kpis': [
    { name: 'David Sacks: SaaS Metrics That Matter', url: 'https://medium.com/craft-ventures/the-saas-metrics-that-matter-f29729ce7a2b' },
    { name: 'Tool: Visible.vc (Investor Updates)', url: 'https://visible.vc/' },
    { name: 'First Round: Building KPI Trees', url: 'https://firstround.com/review/this-is-the-framework-that-helped-us-align-our-team-and-build-a-kpi-tree/' }
  ],
  'northstarmetric': [
    { name: 'Reforge: NSM Models', url: 'https://www.reforge.com/brief/the-north-star-metric' },
    { name: 'Casey Winters: Don\'t Make Revenue Your NSM', url: 'https://caseyaccidental.com/revenue-not-a-north-star-metric/' },
    { name: 'Amplitude: North Star Playbook', url: 'https://amplitude.com/north-star' }
  ],
  'prd': [
    { name: "Lenny's Best PRD Templates", url: 'https://www.lennysnewsletter.com/p/my-favorite-product-management-templates' },
    { name: "Kevin Yien: Writing PRDs that don't suck", url: 'https://kevinyien.com/prd.html' },
    { name: 'Y Combinator: How to Build a Product', url: 'https://www.ycombinator.com/library/5z-how-to-build-a-product' },
    { name: 'Figma: Product Requirements Document', url: 'https://www.figma.com/templates/product-requirements-document-prd/' }
  ],
  'userflows': [
    { name: 'Reforge: Product Loops vs. Funnels', url: 'https://www.reforge.com/blog/growth-loops' },
    { name: 'Mobbin (Elite UI Patterns)', url: 'https://mobbin.com/' },
    { name: 'PageFlows (SaaS flows)', url: 'https://pageflows.com/' },
    { name: 'Growth.Design: UX Case Studies', url: 'https://growth.design/case-studies' }
  ],
  'informationarchitecture': [
    { name: 'NNGroup: Information Architecture', url: 'https://www.nngroup.com/articles/information-architecture-study-guide/' },
    { name: 'Untools: Mental Models', url: 'https://untools.co/' },
    { name: "O'Reilly: Information Architecture", url: 'https://www.oreilly.com/library/view/information-architecture-4th/9781491911679/' },
    { name: 'Figma: IA Kits & Templates', url: 'https://www.figma.com/community/file/1029193796851214040' }
  ],
  'wireframes': [
    { name: 'Balsamiq: Low-Fidelity Wireframing', url: 'https://balsamiq.com/' },
    { name: 'Excalidraw: Virtual Whiteboard', url: 'https://excalidraw.com/' },
    { name: 'NNGroup: Wireframing 101', url: 'https://www.nngroup.com/articles/wireframes/' }
  ],
  'designsystem': [
    { name: 'shadcn/ui (Accessible Components)', url: 'https://ui.shadcn.com/' },
    { name: 'Tailwind CSS Documentation', url: 'https://tailwindcss.com/' },
    { name: 'Refactoring UI (Book)', url: 'https://www.refactoringui.com/' }
  ],
  'branding': [
    { name: 'Mailchimp Voice and Tone Guide', url: 'https://styleguide.mailchimp.com/voice-and-tone/' },
    { name: 'Fontshare (High-Quality Free Fonts)', url: 'https://www.fontshare.com/' },
    { name: 'Mobbin: SaaS Copywriting Examples', url: 'https://mobbin.com/' }
  ],
  'accessibility': [
    { name: 'WebAIM Contrast Checker', url: 'https://webaim.org/resources/contrastchecker/' },
    { name: 'W3C ARIA Authoring Practices', url: 'https://www.w3.org/WAI/ARIA/apg/' },
    { name: 'eslint-plugin-jsx-a11y', url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y' }
  ],
  'techstackselection': [
    { name: 'Y Combinator: How to Choose a Tech Stack', url: 'https://www.ycombinator.com/library/1M-how-to-choose-a-tech-stack' },
    { name: 'Boring Technology Club', url: 'https://boringtechnology.club/' },
    { name: 'Vercel: Tech Stack Guide', url: 'https://vercel.com/docs/concepts/projects/tech-stacks' }
  ],
  'frontendarchitecture': [
    { name: 'Bulletproof React Architecture', url: 'https://github.com/alan2207/bulletproof-react' },
    { name: 'TanStack Query (React Query) Docs', url: 'https://tanstack.com/query/latest' },
    { name: 'Zustand: Bear Necessities for State', url: 'https://github.com/pmndrs/zustand' }
  ],
  'backendarchitecture': [
    { name: 'Supabase Architecture Guide', url: 'https://supabase.com/docs/guides/architecture' },
    { name: 'Prisma: Data Modeling', url: 'https://www.prisma.io/docs/concepts/components/prisma-schema/data-model' },
    { name: 'Designing Data-Intensive Applications', url: 'https://dataintensive.net/' }
  ],
  'apidesign': [
    { name: 'OpenAPI Specification', url: 'https://swagger.io/specification/' },
    { name: 'tRPC: End-to-end typesafe APIs', url: 'https://trpc.io/' },
    { name: 'REST vs GraphQL vs gRPC', url: 'https://www.youtube.com/watch?v=yIEkwcmk3os' }
  ],
  'authentication': [
    { name: 'Supabase Auth Docs', url: 'https://supabase.com/docs/guides/auth' },
    { name: 'Auth.js (NextAuth)', url: 'https://authjs.dev/' },
    { name: 'Why JWTs Suck as Session Tokens', url: 'https://redis.com/blog/json-web-tokens-jwt-are-dangerous-for-user-sessions/' }
  ],
  'authorizationroles': [
    { name: 'Supabase Row Level Security', url: 'https://supabase.com/docs/guides/auth/row-level-security' },
    { name: 'OSWAP: Insecure Direct Object Reference (IDOR)', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html' },
    { name: 'RBAC vs ABAC', url: 'https://www.osohq.com/academy/rbac-vs-abac' }
  ],
  'databaseschema': [
    { name: 'Prisma Schema Reference', url: 'https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference' },
    { name: 'Database Normalization Explained', url: 'https://www.youtube.com/watch?v=UrYLYV7WSHM' },
    { name: 'Drizzle ORM', url: 'https://orm.drizzle.team/' }
  ],
  'filestorage': [
    { name: 'Supabase Storage Docs', url: 'https://supabase.com/docs/guides/storage' },
    { name: 'AWS S3 Presigned URLs', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html' },
    { name: 'Cloudinary Image Transformations', url: 'https://cloudinary.com/documentation/image_transformations' }
  ],
  'thirdpartyintegrations': [
    { name: 'Stripe API Docs', url: 'https://docs.stripe.com/' },
    { name: 'Resend: Transactional Emails', url: 'https://resend.com/docs/introduction' },
    { name: 'Understanding Webhooks', url: 'https://hookdeck.com/webhooks/guides/what-are-webhooks' }
  ],
  'aiarchitectureoptional': [
    { name: 'Vercel AI SDK', url: 'https://sdk.vercel.ai/docs' },
    { name: 'Prompt Injection Explained', url: 'https://simonwillison.net/2022/Sep/12/prompt-injection/' },
    { name: 'LangChain Documentation', url: 'https://js.langchain.com/docs/get_started/introduction' }
  ],
  'systemarchitecturediagram': [
    { name: 'Mermaid.js Live Editor', url: 'https://mermaid.live/' },
    { name: 'Monolith vs Microservices', url: 'https://aws.amazon.com/microservices/' },
    { name: 'Serverless Architectures', url: 'https://martinfowler.com/articles/serverless.html' }
  ],
  'costestimation': [
    { name: 'AWS Pricing Calculator', url: 'https://calculator.aws/#/' },
    { name: 'Vercel Pricing Explained', url: 'https://vercel.com/docs/pricing' },
    { name: 'Cloudflare (Zero Egress Costs)', url: 'https://www.cloudflare.com/' }
  ],
  'auth': [
    { name: 'Supabase Auth Server-Side', url: 'https://supabase.com/docs/guides/auth/server-side-rendering' },
    { name: 'OWASP Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
    { name: 'Clerk vs Supabase Auth', url: 'https://clerk.com/blog/clerk-vs-supabase' }
  ],
  'database': [
    { name: 'Prisma Seeding Guide', url: 'https://www.prisma.io/docs/guides/migrate/seed-database' },
    { name: 'Faker.js Documentation', url: 'https://fakerjs.dev/guide/' },
    { name: 'Database Migrations Best Practices', url: 'https://planetscale.com/blog/database-migrations-best-practices' }
  ],
  'backend': [
    { name: 'Zod Validation Schema', url: 'https://zod.dev/' },
    { name: 'The N+1 Query Problem', url: 'https://planetscale.com/blog/what-is-n-1-query-problem' },
    { name: 'REST API Best Practices', url: 'https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/' }
  ],
  'frontend': [
    { name: 'shadcn/ui Components', url: 'https://ui.shadcn.com/' },
    { name: 'TanStack Query (Data Fetching)', url: 'https://tanstack.com/query/latest' },
    { name: 'Optimistic UI Updates', url: 'https://tanstack.com/query/latest/docs/react/guides/optimistic-updates' }
  ],
  'payments': [
    { name: 'Stripe API Docs', url: 'https://docs.stripe.com/api' },
    { name: 'Handling Stripe Webhooks', url: 'https://docs.stripe.com/webhooks' },
    { name: 'SCA (Strong Customer Authentication)', url: 'https://stripe.com/en-gb-us/guides/strong-customer-authentication' }
  ],
  'emails': [
    { name: 'Resend Documentation', url: 'https://resend.com/docs' },
    { name: 'React-Email Components', url: 'https://react.email/' },
    { name: 'DKIM and SPF Explained', url: 'https://www.cloudflare.com/learning/dns/dns-records/dns-dkim-record/' }
  ],
  'notifications': [
    { name: 'Sonner (React Toasts)', url: 'https://sonner.emilkowal.ski/' },
    { name: 'Supabase Realtime (WebSockets)', url: 'https://supabase.com/docs/guides/realtime' },
    { name: 'Server-Sent Events vs WebSockets', url: 'https://web.dev/articles/eventsource-basics' }
  ],
  'search': [
    { name: 'PostgreSQL Full-Text Search', url: 'https://www.postgresql.org/docs/current/textsearch.html' },
    { name: 'Prisma Full-Text Search', url: 'https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search' },
    { name: 'usehooks-ts: useDebounce', url: 'https://usehooks-ts.com/react-hook/use-debounce' }
  ],
  'analytics': [
    { name: 'PostHog Documentation', url: 'https://posthog.com/docs' },
    { name: 'Product Analytics vs Marketing Analytics', url: 'https://posthog.com/blog/product-analytics-vs-marketing-analytics' },
    { name: 'Server-Side Event Tracking', url: 'https://posthog.com/docs/getting-started/send-events' }
  ],
  'adminpanel': [
    { name: 'Retool for Internal Tools', url: 'https://retool.com/' },
    { name: 'Supabase Studio', url: 'https://supabase.com/docs/guides/platform/studio' },
    { name: 'Role-Based Access Control (RBAC)', url: 'https://www.permit.io/blog/what-is-rbac' }
  ],
  'integrations': [
    { name: 'Understanding OAuth 2.0', url: 'https://oauth.net/2/' },
    { name: 'Exponential Backoff Strategies', url: 'https://cloud.google.com/iot/docs/how-tos/exponential-backoff' },
    { name: 'Encrypting Data at Rest', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html' }
  ],
  'testing': [
    { name: 'Playwright E2E Testing', url: 'https://playwright.dev/docs/intro' },
    { name: 'Vitest Documentation', url: 'https://vitest.dev/guide/' },
    { name: 'GitHub Actions for CI/CD', url: 'https://docs.github.com/en/actions' }
  ],
  'documentation': [
    { name: 'Mintlify Documentation Sites', url: 'https://mintlify.com/' },
    { name: 'Swagger (OpenAPI)', url: 'https://swagger.io/' },
    { name: 'Google Developer Documentation Style Guide', url: 'https://developers.google.com/style' }
  ],
  'demodata': [
    { name: 'Faker.js Documentation', url: 'https://fakerjs.dev/' },
    { name: 'Mockaroo (CSV Test Data)', url: 'https://www.mockaroo.com/' },
    { name: 'Why Your Demo Data Matters', url: 'https://www.lennysnewsletter.com/' }
  ],
  'presentationprep': [
    { name: 'Y Combinator: How to Pitch', url: 'https://www.ycombinator.com/library/4q-how-to-pitch-your-company' },
    { name: 'Loom (Video Recording)', url: 'https://www.loom.com/' },
    { name: 'Product Hunt Launch Guide', url: 'https://www.producthunt.com/launch' }
  ]
};

export const createTopic = (name: string, icon: any, customLinks: QuickLink[] = []): Topic => {
  const id = generateId(name);
  return {
    id,
    name,
    icon,
    modes: ['Hackathon', 'Personal', 'Production', 'Custom'],
    quickLinks: [...(globalTopicLinks[id] || []), ...customLinks]
  };
};
