import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  Layers, Server, Activity, Zap, Search, Key, Target, Users, BarChart, 
  DollarSign, PenTool, AlertCircle,
  Cloud, LayoutDashboard, CheckCircle, HelpCircle,
  Presentation, Sparkles } from 'lucide-react';
import { type Category, createTopic } from './types';

// The Flagship Web App Taxonomy

export const webProductionTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 — DISCOVERY & PLANNING',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Idea Definition', Rocket, [{ name: 'YC RFS', url: 'https://www.ycombinator.com/rfs' }], 'webideadefinition'),
      createTopic('Target Audience', Users, [{ name: 'SparkToro', url: 'https://sparktoro.com/' }], 'webtargetaudience'),
      createTopic('Competitor Analysis', BarChart, [{ name: 'Similarweb', url: 'https://www.similarweb.com/' }], 'webcompetitoranalysis'),
      createTopic('Unique Selling Proposition', Target, [{ name: 'Lenny: Positioning', url: 'https://www.lennysnewsletter.com/p/positioning' }], 'webusp'),
      createTopic('MVP Features', CheckSquare, [{ name: 'How to Build an MVP', url: 'https://www.ycombinator.com/library/4Q-a-guide-to-seed-fundraising' }], 'webmvpfeatures'),
      createTopic('Monetization', DollarSign, [{ name: 'Stripe Billing', url: 'https://stripe.com/billing' }], 'webmonetization'),
      createTopic('Future Features', Layers, [], 'webnicetohavefeatures'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — UX & PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{ name: 'Notion PRD Templates', url: 'https://www.notion.so/templates/prd' }], 'webprd'),
      createTopic('User Flows', Globe, [{ name: 'Whimsical', url: 'https://whimsical.com/' }], 'webuserflows'),
      createTopic('Information Architecture', Layers, [{ name: 'NNG: IA', url: 'https://www.nngroup.com/topic/information-architecture/' }], 'webinformationarchitecture'),
      createTopic('Wireframes', Box, [{ name: 'Figma Community', url: 'https://www.figma.com/community' }], 'webwireframes'),
      createTopic('Branding', Target, [{ name: 'Realtime Colors', url: 'https://www.realtimecolors.com/' }], 'webbranding'),
      createTopic('Design System', PenTool, [{ name: 'Shadcn UI', url: 'https://ui.shadcn.com/' }, { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' }], 'webdesignsystem'),
      createTopic('Responsive Design', LayoutDashboard),
      createTopic('Accessibility', Users, [{ name: 'Axe Core', url: 'https://www.deque.com/axe/' }], 'webaccessibility'),
      createTopic('Loading States', Activity, [{ name: 'CSS Skeletons', url: 'https://css-tricks.com/building-skeleton-screens-css-custom-properties/' }], 'webloadingstates'),
      createTopic('Empty States', Box, [{ name: 'EmptyStat.es', url: 'https://emptystat.es/' }], 'webemptystates'),
      createTopic('Error States', AlertCircle, [{ name: 'React Error Boundaries', url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary' }], 'weberrorstates'),
      createTopic('Sitemap', Layers, [{ name: 'Next.js Sitemap', url: 'https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap' }], 'websitemap'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — CORE INFRASTRUCTURE',
    topics: [
      createTopic('Tech Stack', Settings, [{ name: 'Next.js', url: 'https://nextjs.org/' }, { name: 'Vite', url: 'https://vitejs.dev/' }], 'webtechstack'),
      createTopic('Repository Structure', Box, [{ name: 'Turborepo', url: 'https://turbo.build/' }], 'webrepositorystructure'),
      createTopic('System Architecture', Globe),
      createTopic('Database Architecture', Database, [{ name: 'Supabase', url: 'https://supabase.com/' }, { name: 'Prisma', url: 'https://www.prisma.io/' }], 'webdatabase'),
      createTopic('Authentication', Key, [{ name: 'Clerk', url: 'https://clerk.com/' }, { name: 'NextAuth.js', url: 'https://next-auth.js.org/' }], 'webauthentication'),
      createTopic('Authorization', Shield),
      createTopic('API Architecture', Globe, [{ name: 'RESTful API Guidelines', url: 'https://restfulapi.net/' }], 'webapidesign'),
      createTopic('Hosting', Server, [{ name: 'Vercel', url: 'https://vercel.com/' }, { name: 'AWS ECS', url: 'https://aws.amazon.com/ecs/' }], 'webhosting'),
      createTopic('CI/CD', Settings, [{ name: 'GitHub Actions', url: 'https://github.com/features/actions' }], 'webcicd'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — FRONTEND ENGINEERING',
    topics: [
      createTopic('Core Layouts', LayoutDashboard, [{ name: 'CSS Grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' }], 'weblayouts'),
      createTopic('Routing', Globe, [{ name: 'React Router', url: 'https://reactrouter.com/' }], 'webrouting'),
      createTopic('Rendering Strategies', Server),
      createTopic('Reusable Components', Box, [{ name: 'Storybook', url: 'https://storybook.js.org/' }], 'webcomponents'),
      createTopic('State Management', Database, [{ name: 'Zustand', url: 'https://docs.pmnd.rs/zustand/' }], 'webstatemanagement'),
      createTopic('Data Fetching', Cloud, [{ name: 'TanStack Query', url: 'https://tanstack.com/query/latest' }], 'webapifetching'),
      createTopic('Form Handling', FileText, [{ name: 'React Hook Form', url: 'https://react-hook-form.com/' }, { name: 'Zod', url: 'https://zod.dev/' }], 'webformhandling'),
      createTopic('Browser APIs', Globe),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — BACKEND ENGINEERING',
    topics: [
      createTopic('API Design', Server, [{ name: 'tRPC', url: 'https://trpc.io/' }, { name: 'GraphQL', url: 'https://graphql.org/' }], 'webrestgraphql'),
      createTopic('Database ORM', Database, [{ name: 'Drizzle ORM', url: 'https://orm.drizzle.team/' }], 'webdatabaseorm'),
      createTopic('Validation', Shield),
      createTopic('Error Handling', AlertCircle, [{ name: 'Node Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices' }], 'weberrorhandling'),
      createTopic('Background Jobs', Zap, [{ name: 'Inngest', url: 'https://www.inngest.com/' }, { name: 'Trigger.dev', url: 'https://trigger.dev/' }], 'webbackgroundjobs'),
      createTopic('Caching', Cloud, [{ name: 'Upstash Redis', url: 'https://upstash.com/' }], 'webcaching'),
      createTopic('Security', Shield, [{ name: 'Helmet.js', url: 'https://helmetjs.github.io/' }, { name: 'OWASP Top 10', url: 'https://owasp.org/' }], 'websecurity'),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5 — QUALITY ASSURANCE',
    topics: [
      createTopic('Code Quality', PenTool, [{ name: 'Prettier', url: 'https://prettier.io/' }, { name: 'ESLint', url: 'https://eslint.org/' }], 'weblintingformatting'),
      createTopic('Testing', CheckSquare, [{ name: 'Vitest', url: 'https://vitest.dev/' }, { name: 'Playwright', url: 'https://playwright.dev/' }], 'webunittesting'),
      createTopic('Observability', Activity, [{ name: 'Sentry', url: 'https://sentry.io/' }], 'weberrorlogging'),
    ]
  },
  {
    id: 'phase-6',
    name: 'PHASE 6 — LAUNCH & GROWTH',
    topics: [
      createTopic('Analytics', BarChart, [{ name: 'PostHog', url: 'https://posthog.com/' }], 'webanalytics'),
      createTopic('SEO', Search, [{ name: 'Google Search Console', url: 'https://search.google.com/search-console' }], 'webseo'),
      createTopic('Performance', Zap, [{ name: 'Core Web Vitals', url: 'https://web.dev/vitals/' }], 'webperformancemonitoring'),
      createTopic('Launch Checklist', CheckCircle, [{ name: 'Product Hunt', url: 'https://www.producthunt.com/' }], 'weblaunchchecklist'),
      createTopic('Post-launch Monitoring', Activity),
      createTopic('Roadmap', Globe),
    ]
  }
];

export const webPersonalTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 — DISCOVERY',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Idea Definition', Rocket, [{ name: 'YC RFS', url: 'https://www.ycombinator.com/rfs' }], 'webideadefinition'),
      createTopic('MVP Features', CheckSquare, [{ name: 'How to Build an MVP', url: 'https://www.ycombinator.com/library/4Q-a-guide-to-seed-fundraising' }], 'webmvpfeatures'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — DESIGN',
    topics: [
      createTopic('PRD', FileText, [], 'webprd'),
      createTopic('User Flows', Globe, [{ name: 'Whimsical', url: 'https://whimsical.com/' }], 'webuserflows'),
      createTopic('Design System', PenTool, [{ name: 'Shadcn UI', url: 'https://ui.shadcn.com/' }], 'webdesignsystem'),
      createTopic('Responsive Design', LayoutDashboard),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — ARCHITECTURE',
    topics: [
      createTopic('Tech Stack', Settings, [{ name: 'Next.js', url: 'https://nextjs.org/' }], 'webtechstack'),
      createTopic('Database Architecture', Database, [{ name: 'Supabase', url: 'https://supabase.com/' }], 'webdatabase'),
      createTopic('Authentication', Key, [{ name: 'Clerk', url: 'https://clerk.com/' }], 'webauthentication'),
      createTopic('Hosting & Deployment', Server, [{ name: 'Vercel', url: 'https://vercel.com/' }], 'webhosting'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Frontend Engineering', Box, [], 'webfrontend'),
      createTopic('Backend Engineering', Server, [], 'webbackend'),
      createTopic('Database ORMs', Database, [{ name: 'Prisma', url: 'https://www.prisma.io/' }], 'webdatabaseorm'),
      createTopic('Data Fetching', Cloud, [{ name: 'TanStack Query', url: 'https://tanstack.com/query/latest' }], 'webapifetching'),
      createTopic('Browser APIs', Globe),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — PRODUCTION LITE',
    topics: [
      createTopic('Performance', Zap, [], 'webperformancemonitoring'),
      createTopic('Deployment', Server, [], 'webhosting'),
      createTopic('Security Basics', Shield, [], 'websecurity'),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5 — GROWTH LITE',
    topics: [
      createTopic('Analytics', BarChart, [{ name: 'PostHog', url: 'https://posthog.com/' }], 'webanalytics'),
      createTopic('Launch Checklist', CheckCircle, [], 'weblaunchchecklist'),
      createTopic('Presentation Prep', Presentation),
      createTopic('Pitch Deck', Presentation),
    ]
  }
];

export const webHackathonTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 — PLANNING',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Idea Definition', Rocket, [], 'webideadefinition'),
      createTopic('MVP Features', CheckSquare, [], 'webmvpfeatures'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — DESIGN',
    topics: [
      createTopic('PRD', FileText, [], 'webprd'),
      createTopic('User Flows', Globe, [], 'webuserflows'),
      createTopic('Design System', PenTool, [{ name: 'Shadcn UI', url: 'https://ui.shadcn.com/' }], 'webdesignsystem'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — ARCHITECTURE',
    topics: [
      createTopic('Tech Stack', Settings, [], 'webtechstack'),
      createTopic('Database Architecture', Database, [], 'webdatabase'),
      createTopic('Authentication', Key, [], 'webauthentication'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — SPEED BUILDING',
    topics: [
      createTopic('Backend Engineering', Server, [], 'webbackend'),
      createTopic('Frontend Engineering', Box, [], 'webfrontend'),
      createTopic('UI Polish', Sparkles),
      createTopic('Hosting', Server, [{ name: 'Vercel', url: 'https://vercel.com/' }], 'webhosting'),
      createTopic('Demo Data', Database),
      createTopic('Presentation Prep', Presentation),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — SUBMISSION',
    topics: [
      createTopic('Pitch Deck', Presentation),
      createTopic('Demo Script', FileText),
      createTopic('Submission Checklist', CheckSquare),
    ]
  }
];

export const webCustomTaxonomy: Category[] = [
  ...webProductionTaxonomy
];
