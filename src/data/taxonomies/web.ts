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
      createTopic('Welcome', HelpCircle, [], 'welcome-production-web-app'),
      createTopic('Idea Definition', Rocket, [{ name: 'YC RFS', url: 'https://www.ycombinator.com/rfs' }], 'idea-definition-production-web-app'),
      createTopic('Target Audience', Users, [{ name: 'SparkToro', url: 'https://sparktoro.com/' }], 'target-audience-production-web-app'),
      createTopic('Competitor Analysis', BarChart, [{ name: 'Similarweb', url: 'https://www.similarweb.com/' }], 'competitor-analysis-production-web-app'),
      createTopic('Unique Selling Proposition', Target, [{ name: 'Lenny: Positioning', url: 'https://www.lennysnewsletter.com/p/positioning' }], 'unique-selling-proposition-production-web-app'),
      createTopic('MVP Features', CheckSquare, [{ name: 'How to Build an MVP', url: 'https://www.ycombinator.com/library/4Q-a-guide-to-seed-fundraising' }], 'mvp-features-production-web-app'),
      createTopic('Monetization', DollarSign, [{ name: 'Stripe Billing', url: 'https://stripe.com/billing' }], 'monetization-production-web-app'),
      createTopic('Future Features', Layers, [], 'future-features-production-web-app'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — UX & PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{ name: 'Notion PRD Templates', url: 'https://www.notion.so/templates/prd' }], 'prd-production-web-app'),
      createTopic('User Flows', Globe, [{ name: 'Whimsical', url: 'https://whimsical.com/' }], 'user-flows-production-web-app'),
      createTopic('Information Architecture', Layers, [{ name: 'NNG: IA', url: 'https://www.nngroup.com/topic/information-architecture/' }], 'information-architecture-production-web-app'),
      createTopic('Wireframes', Box, [{ name: 'Figma Community', url: 'https://www.figma.com/community' }], 'wireframes-production-web-app'),
      createTopic('Branding', Target, [{ name: 'Realtime Colors', url: 'https://www.realtimecolors.com/' }], 'branding-production-web-app'),
      createTopic('Design System', PenTool, [{ name: 'Shadcn UI', url: 'https://ui.shadcn.com/' }, { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' }], 'design-system-production-web-app'),
      createTopic('Responsive Design', LayoutDashboard, [], 'responsive-design-production-web-app'),
      createTopic('Accessibility', Users, [{ name: 'Axe Core', url: 'https://www.deque.com/axe/' }], 'accessibility-production-web-app'),
      createTopic('Loading States', Activity, [{ name: 'CSS Skeletons', url: 'https://css-tricks.com/building-skeleton-screens-css-custom-properties/' }], 'loading-states-production-web-app'),
      createTopic('Empty States', Box, [{ name: 'EmptyStat.es', url: 'https://emptystat.es/' }], 'empty-states-production-web-app'),
      createTopic('Error States', AlertCircle, [{ name: 'React Error Boundaries', url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary' }], 'error-states-production-web-app'),
      createTopic('Sitemap', Layers, [{ name: 'Next.js Sitemap', url: 'https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap' }], 'sitemap-production-web-app'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — CORE INFRASTRUCTURE',
    topics: [
      createTopic('Tech Stack', Settings, [{ name: 'Next.js', url: 'https://nextjs.org/' }, { name: 'Vite', url: 'https://vitejs.dev/' }], 'tech-stack-production-web-app'),
      createTopic('Repository Structure', Box, [{ name: 'Turborepo', url: 'https://turbo.build/' }], 'repository-structure-production-web-app'),
      createTopic('System Architecture', Globe, [], 'system-architecture-production-web-app'),
      createTopic('Database Architecture', Database, [{ name: 'Supabase', url: 'https://supabase.com/' }, { name: 'Prisma', url: 'https://www.prisma.io/' }], 'database-architecture-production-web-app'),
      createTopic('Authentication', Key, [{ name: 'Clerk', url: 'https://clerk.com/' }, { name: 'NextAuth.js', url: 'https://next-auth.js.org/' }], 'authentication-production-web-app'),
      createTopic('Authorization', Shield, [], 'authorization-production-web-app'),
      createTopic('API Architecture', Globe, [{ name: 'RESTful API Guidelines', url: 'https://restfulapi.net/' }], 'api-architecture-production-web-app'),
      createTopic('Hosting', Server, [{ name: 'Vercel', url: 'https://vercel.com/' }, { name: 'AWS ECS', url: 'https://aws.amazon.com/ecs/' }], 'hosting-production-web-app'),
      createTopic('CI/CD', Settings, [{ name: 'GitHub Actions', url: 'https://github.com/features/actions' }], 'ci-cd-production-web-app'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — FRONTEND ENGINEERING',
    topics: [
      createTopic('Core Layouts', LayoutDashboard, [{ name: 'CSS Grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' }], 'core-layouts-production-web-app'),
      createTopic('Routing', Globe, [{ name: 'React Router', url: 'https://reactrouter.com/' }], 'routing-production-web-app'),
      createTopic('Rendering Strategies', Server, [], 'rendering-strategies-production-web-app'),
      createTopic('Reusable Components', Box, [{ name: 'Storybook', url: 'https://storybook.js.org/' }], 'reusable-components-production-web-app'),
      createTopic('State Management', Database, [{ name: 'Zustand', url: 'https://docs.pmnd.rs/zustand/' }], 'state-management-production-web-app'),
      createTopic('Data Fetching', Cloud, [{ name: 'TanStack Query', url: 'https://tanstack.com/query/latest' }], 'data-fetching-production-web-app'),
      createTopic('Form Handling', FileText, [{ name: 'React Hook Form', url: 'https://react-hook-form.com/' }, { name: 'Zod', url: 'https://zod.dev/' }], 'form-handling-production-web-app'),
      createTopic('Browser APIs', Globe, [], 'browser-apis-production-web-app'),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — BACKEND ENGINEERING',
    topics: [
      createTopic('API Design', Server, [{ name: 'tRPC', url: 'https://trpc.io/' }, { name: 'GraphQL', url: 'https://graphql.org/' }], 'api-design-production-web-app'),
      createTopic('Database ORM', Database, [{ name: 'Drizzle ORM', url: 'https://orm.drizzle.team/' }], 'database-orm-production-web-app'),
      createTopic('Validation', Shield, [], 'validation-production-web-app'),
      createTopic('Error Handling', AlertCircle, [{ name: 'Node Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices' }], 'error-handling-production-web-app'),
      createTopic('Background Jobs', Zap, [{ name: 'Inngest', url: 'https://www.inngest.com/' }, { name: 'Trigger.dev', url: 'https://trigger.dev/' }], 'background-jobs-production-web-app'),
      createTopic('Caching', Cloud, [{ name: 'Upstash Redis', url: 'https://upstash.com/' }], 'caching-production-web-app'),
      createTopic('Security', Shield, [{ name: 'Helmet.js', url: 'https://helmetjs.github.io/' }, { name: 'OWASP Top 10', url: 'https://owasp.org/' }], 'security-production-web-app'),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5 — QUALITY ASSURANCE',
    topics: [
      createTopic('Code Quality', PenTool, [{ name: 'Prettier', url: 'https://prettier.io/' }, { name: 'ESLint', url: 'https://eslint.org/' }], 'code-quality-production-web-app'),
      createTopic('Testing', CheckSquare, [{ name: 'Vitest', url: 'https://vitest.dev/' }, { name: 'Playwright', url: 'https://playwright.dev/' }], 'testing-production-web-app'),
      createTopic('Observability', Activity, [{ name: 'Sentry', url: 'https://sentry.io/' }], 'observability-production-web-app'),
    ]
  },
  {
    id: 'phase-6',
    name: 'PHASE 6 — LAUNCH & GROWTH',
    topics: [
      createTopic('Analytics', BarChart, [{ name: 'PostHog', url: 'https://posthog.com/' }], 'analytics-production-web-app'),
      createTopic('SEO', Search, [{ name: 'Google Search Console', url: 'https://search.google.com/search-console' }], 'seo-production-web-app'),
      createTopic('Performance', Zap, [{ name: 'Core Web Vitals', url: 'https://web.dev/vitals/' }], 'performance-production-web-app'),
      createTopic('Launch Checklist', CheckCircle, [{ name: 'Product Hunt', url: 'https://www.producthunt.com/' }], 'launch-checklist-production-web-app'),
      createTopic('Post-launch Monitoring', Activity, [], 'post-launch-monitoring-production-web-app'),
      createTopic('Roadmap', Globe, [], 'roadmap-production-web-app'),
    ]
  }
];

export const webPersonalTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 — DISCOVERY',
    topics: [
      createTopic('Welcome', HelpCircle, [], 'welcome-personal-web-app'),
      createTopic('Idea Definition', Rocket, [{ name: 'YC RFS', url: 'https://www.ycombinator.com/rfs' }], 'idea-definition-personal-web-app'),
      createTopic('MVP Features', CheckSquare, [{ name: 'How to Build an MVP', url: 'https://www.ycombinator.com/library/4Q-a-guide-to-seed-fundraising' }], 'mvp-features-personal-web-app'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — DESIGN',
    topics: [
      createTopic('PRD', FileText, [], 'prd-personal-web-app'),
      createTopic('User Flows', Globe, [{ name: 'Whimsical', url: 'https://whimsical.com/' }], 'user-flows-personal-web-app'),
      createTopic('Design System', PenTool, [{ name: 'Shadcn UI', url: 'https://ui.shadcn.com/' }], 'design-system-personal-web-app'),
      createTopic('Responsive Design', LayoutDashboard, [], 'responsive-design-personal-web-app'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — ARCHITECTURE',
    topics: [
      createTopic('Tech Stack', Settings, [{ name: 'Next.js', url: 'https://nextjs.org/' }], 'tech-stack-personal-web-app'),
      createTopic('Database Architecture', Database, [{ name: 'Supabase', url: 'https://supabase.com/' }], 'database-architecture-personal-web-app'),
      createTopic('Authentication', Key, [{ name: 'Clerk', url: 'https://clerk.com/' }], 'authentication-personal-web-app'),
      createTopic('Hosting & Deployment', Server, [{ name: 'Vercel', url: 'https://vercel.com/' }], 'hosting-and-deployment-personal-web-app'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Frontend Engineering', Box, [], 'frontend-engineering-personal-web-app'),
      createTopic('Backend Engineering', Server, [], 'backend-engineering-personal-web-app'),
      createTopic('Database ORMs', Database, [{ name: 'Prisma', url: 'https://www.prisma.io/' }], 'database-orms-personal-web-app'),
      createTopic('Data Fetching', Cloud, [{ name: 'TanStack Query', url: 'https://tanstack.com/query/latest' }], 'data-fetching-personal-web-app'),
      createTopic('Browser APIs', Globe, [], 'browser-apis-personal-web-app'),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — PRODUCTION LITE',
    topics: [
      createTopic('Performance', Zap, [], 'performance-personal-web-app'),
      createTopic('Deployment', Server, [], 'deployment-personal-web-app'),
      createTopic('Security Basics', Shield, [], 'security-basics-personal-web-app'),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5 — GROWTH LITE',
    topics: [
      createTopic('Analytics', BarChart, [{ name: 'PostHog', url: 'https://posthog.com/' }], 'analytics-personal-web-app'),
      createTopic('Launch Checklist', CheckCircle, [], 'launch-checklist-personal-web-app'),
      createTopic('Presentation Prep', Presentation, [], 'presentation-prep-personal-web-app'),
      createTopic('Pitch Deck', Presentation, [], 'pitch-deck-personal-web-app'),
      createTopic('Demo Script', FileText, [], 'demo-script-personal-web-app'),
      createTopic('Submission Checklist', CheckSquare, [], 'submission-checklist-personal-web-app'),
    ]
  }
];

export const webHackathonTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 — PLANNING',
    topics: [
      createTopic('Welcome', HelpCircle, [], 'welcome-hackathon-web-app'),
      createTopic('Idea Definition', Rocket, [], 'idea-definition-hackathon-web-app'),
      createTopic('MVP Features', CheckSquare, [], 'mvp-features-hackathon-web-app'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — DESIGN',
    topics: [
      createTopic('PRD', FileText, [], 'prd-hackathon-web-app'),
      createTopic('User Flows', Globe, [], 'user-flows-hackathon-web-app'),
      createTopic('Design System', PenTool, [{ name: 'Shadcn UI', url: 'https://ui.shadcn.com/' }], 'design-system-hackathon-web-app'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — ARCHITECTURE',
    topics: [
      createTopic('Tech Stack', Settings, [], 'tech-stack-hackathon-web-app'),
      createTopic('Database Architecture', Database, [], 'database-architecture-hackathon-web-app'),
      createTopic('Authentication', Key, [], 'authentication-hackathon-web-app'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — SPEED BUILDING',
    topics: [
      createTopic('Backend Engineering', Server, [], 'backend-engineering-hackathon-web-app'),
      createTopic('Frontend Engineering', Box, [], 'frontend-engineering-hackathon-web-app'),
      createTopic('UI Polish', Sparkles, [], 'ui-polish-hackathon-web-app'),
      createTopic('Hosting', Server, [{ name: 'Vercel', url: 'https://vercel.com/' }], 'hosting-hackathon-web-app'),
      createTopic('Demo Data', Database, [], 'demo-data-hackathon-web-app'),
      createTopic('Presentation Prep', Presentation, [], 'demo-prep-hackathon-web-app'),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — SUBMISSION',
    topics: [
      createTopic('Pitch Deck', Presentation, [], 'pitch-deck-hackathon-web-app'),
      createTopic('Demo Script', FileText, [], 'demo-script-hackathon-web-app'),
      createTopic('Submission Checklist', CheckSquare, [], 'submission-hackathon-web-app'),
    ]
  }
];

export const webCustomTaxonomy: Category[] = [
  ...webProductionTaxonomy
];
