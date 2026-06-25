import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  Layers, Server, Activity, Zap, Search, Key, Target, Users, BarChart, 
  DollarSign, PenTool, MessageSquare, Presentation, AlertCircle, Map,
  CreditCard, Bell, Cloud, Monitor, BookOpen, Lock, Link, Calendar, Cpu, LayoutDashboard, TrendingUp
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const webProductionTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 — DISCOVERY & PLANNING',
    topics: [
      createTopic('Idea Definition', Rocket, [{ name: 'YC RFS', url: 'https://www.ycombinator.com/rfs' }], 'webideadefinition'),
      createTopic('Problem Statement', AlertCircle, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'}], 'webproblemstatement'),
      createTopic('User Journey', Globe, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'webuserjourney'),
      createTopic('Personas', Users, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'webpersonas'),
      createTopic('Solution Statement', CheckSquare, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'},{name:'YC RFS',url:'https://www.ycombinator.com/rfs'}], 'websolutionstatement'),
      createTopic('Elevator Pitch', Presentation, [{name:'Y Combinator Pitch Advice',url:'https://www.ycombinator.com/library/4O-how-to-pitch-your-company'}], 'webelevatorpitch'),
      createTopic('Competitor Analysis', BarChart, [{ name: 'Similarweb', url: 'https://www.similarweb.com/' }], 'webcompetitoranalysis'),
      createTopic('Feature Planning', CheckSquare, [{name:'Linear',url:'https://linear.app/'}], 'webfeatureplanning'),
      createTopic('MVP Features', Rocket, [{name:'How to build an MVP',url:'https://www.ycombinator.com/library/4Q-a-guide-to-seed-fundraising'}], 'webmvpfeatures'),
      createTopic('Future Features', Layers, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'webfuturefeatures'),
      createTopic('Success Metrics', Activity, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'websuccessmetrics'),
      createTopic('Users & Audience', Users, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'webusersaudience'),
      createTopic('User Goals', Target, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'webusergoals'),
      createTopic('Nice-to-Have Features', Layers, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'webnicetohavefeatures'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — UX & PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name:'Notion PRD Templates',url:'https://www.notion.so/templates/prd'}], 'webprd'),
      createTopic('User Flows', Globe, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'}], 'webuserflows'),
      createTopic('Information Architecture', Layers, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'},{name:'Excalidraw',url:'https://excalidraw.com/'}], 'webinformationarchitecture'),
      createTopic('Wireframes', Box, [{name:'Figma',url:'https://www.figma.com/'},{name:'Balsamiq',url:'https://balsamiq.com/'}], 'webwireframes'),
      createTopic('Design System', PenTool, [{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'}], 'webdesignsystem'),
      createTopic('Branding', Target, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webbranding'),
      createTopic('Accessibility', Users, [{ name: 'WCAG Guidelines', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/' }], 'webaccessibility'),
      createTopic('Empty States', Box, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'webemptystates'),
      createTopic('Error States', AlertCircle, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'weberrorstates'),
      createTopic('Loading States', Activity, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'webloadingstates'),
      createTopic('Sitemap', Layers, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'websitemap'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — TECHNICAL ARCHITECTURE',
    topics: [
      createTopic('Tech Stack Selection', Settings, [{ name: 'Next.js', url: 'https://nextjs.org/' }, { name: 'Vite', url: 'https://vitejs.dev/' }], 'webtechstack'),
      createTopic('Frontend Architecture', Monitor, [{ name: 'React', url: 'https://react.dev/' }, { name: 'Zustand', url: 'https://zustand-demo.pmnd.rs/' }], 'webfrontendarchitecture'),
      createTopic('Backend Architecture', Server, [{ name: 'Express', url: 'https://expressjs.com/' }, { name: 'FastAPI', url: 'https://fastapi.tiangolo.com/' }], 'webbackendarchitecture'),
      createTopic('API Design', Globe, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'webapidesign'),
      createTopic('Authentication', Key, [{ name: 'Clerk', url: 'https://clerk.com/' }, { name: 'Supabase Auth', url: 'https://supabase.com/auth' }], 'webauthentication'),
      createTopic('Database Schema', Database, [{ name: 'Supabase', url: 'https://supabase.com/' }, { name: 'Prisma', url: 'https://www.prisma.io/' }], 'webdatabaseschema'),
      createTopic('File Storage', Cloud, [{ name: 'AWS S3', url: 'https://aws.amazon.com/s3/' }, { name: 'Cloudinary', url: 'https://cloudinary.com/' }], 'webfilestorage'),
      createTopic('Cost Estimation', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'},{name:'RevenueCat (Mobile)',url:'https://www.revenuecat.com/'}], 'webcostestimation'),
      createTopic('Web Fundamentals', BookOpen, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webfundamentals'),
      createTopic('Authorization', Lock, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'webauthorization'),
      createTopic('Search System', Search, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'websearchsystem'),
      createTopic('Third-Party Integrations', Link, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webthirdpartyintegrations'),
      createTopic('AI Features (Optional)', Cpu, [{ name: 'OpenAI', url: 'https://platform.openai.com/' }, { name: 'Vercel AI SDK', url: 'https://sdk.vercel.ai/docs' }], 'webaifeatures'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Auth', Key, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'webauthdev'),
      createTopic('Database', Database, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'webdatabasedev'),
      createTopic('Backend', Server, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'webbackenddev'),
      createTopic('Frontend', Monitor, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webfrontenddev'),
      createTopic('APIs', Globe, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'webapisdev'),
      createTopic('Notifications', Bell, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webnotificationsdev'),
      createTopic('Search', Search, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'websearchdev'),
      createTopic('Admin Panel', LayoutDashboard, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webadminpaneldev'),
      createTopic('Integrations', Link, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webintegrationsdev'),
      createTopic('Testing', CheckSquare, [{name:'Playwright',url:'https://playwright.dev/'},{name:'Jest',url:'https://jestjs.io/'},{name:'TestFlight',url:'https://developer.apple.com/testflight/'}], 'webtestingdev'),
      createTopic('Documentation', FileText, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webdocumentationdev'),
      createTopic('Email Notifications', MessageSquare, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webemailnotificationsdev'),
      createTopic('File Uploads', Cloud, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webfileuploadsdev'),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'websecurityreadiness'),
      createTopic('Performance Optimization', Zap, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'},{name:'Drizzle ORM',url:'https://orm.drizzle.team/'},{name:'SQLite',url:'https://www.sqlite.org/'}], 'webperformanceoptimization'),
      createTopic('Monitoring', Activity, [{ name: 'Sentry', url: 'https://sentry.io/' }, { name: 'Datadog', url: 'https://www.datadoghq.com/' }], 'webmonitoring'),
      createTopic('Logging', FileText, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'weblogging'),
      createTopic('Error Tracking', AlertCircle, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'weberrortracking'),
      createTopic('Rate Limiting', Shield, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webratelimiting'),
      createTopic('Caching', Zap, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webcaching'),
      createTopic('Backups', Database, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webbackups'),
      createTopic('CI/CD', Settings, [{name:'GitHub Actions',url:'https://github.com/features/actions'}], 'webcicd'),
      createTopic('SEO', Search, [{ name: 'Google Search Console', url: 'https://search.google.com/search-console' }], 'webseoprod'),
      createTopic('Scalability Planning', BarChart, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'webscalabilityplanning'),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5 — DEPLOYMENT',
    topics: [
      createTopic('Beta Testing', Users, [{name:'Playwright',url:'https://playwright.dev/'},{name:'Jest',url:'https://jestjs.io/'},{name:'TestFlight',url:'https://developer.apple.com/testflight/'}], 'webbetatesting'),
      createTopic('User Feedback', MessageSquare, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'webuserfeedback'),
      createTopic('Domain Setup', Globe, [{ name: 'Cloudflare', url: 'https://www.cloudflare.com/' }, { name: 'Namecheap', url: 'https://www.namecheap.com/' }], 'webdomainsetup'),
      createTopic('Hosting', Server, [{ name: 'Vercel', url: 'https://vercel.com/' }, { name: 'Render', url: 'https://render.com/' }], 'webhostingdeploy'),
      createTopic('Analytics Setup', BarChart, [{ name: 'PostHog', url: 'https://posthog.com/' }, { name: 'Plausible', url: 'https://plausible.io/' }], 'webanalyticssetup'),
      createTopic('Legal Pages', FileText, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'weblegalpages'),
      createTopic('Launch Checklist', CheckSquare, [{name:'Vercel',url:'https://vercel.com/'},{name:'GitHub Actions',url:'https://github.com/features/actions'},{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'weblaunchchecklist'),
    ]
  },
  {
    id: 'phase-6',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Analytics', BarChart, [{name:'PostHog',url:'https://posthog.com/'},{name:'Plausible',url:'https://plausible.io/'}], 'webanalytics'),
      createTopic('Scaling Strategy', TrendingUp, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webscalingstrategy'),
      createTopic('SEO Optimization', Search, [{name:'Ahrefs SEO',url:'https://ahrefs.com/'},{name:'Discord Community',url:'https://discord.com/developers'}], 'webseooptimization'),
      createTopic('User Retention', Users, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'webuserretention'),
      createTopic('Feature Roadmap', Map, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'webfeatureroadmap'),
      createTopic('Technical Debt', AlertCircle, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webtechnicaldebt'),
    ]
  }
];

export const webHackathonTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0',
    topics: [
      createTopic('Idea Definition', Rocket, [{ name: 'YC RFS', url: 'https://www.ycombinator.com/rfs' }], 'webideadefinition'),
      createTopic('MVP Features', CheckSquare, [{name:'How to build an MVP',url:'https://www.ycombinator.com/library/4Q-a-guide-to-seed-fundraising'}], 'webmvpfeatures'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1',
    topics: [
      createTopic('PRD', FileText, [{name:'Notion PRD Templates',url:'https://www.notion.so/templates/prd'}], 'webprd'),
      createTopic('User Flows', Globe, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'}], 'webuserflows'),
      createTopic('Design System', PenTool, [{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'}], 'webdesignsystem'),
    ]
  },
      {
      id: 'phase-2',
      name: 'PHASE 2 ?" TECHNICAL ARCHITECTURE',
      topics: [
        createTopic('Tech Stack Selection', Settings, [{ name: 'Next.js', url: 'https://nextjs.org/' }, { name: 'Vite', url: 'https://vitejs.dev/' }], 'webtechstack'),
        createTopic('Database Schema', Database, [{ name: 'Supabase', url: 'https://supabase.com/' }, { name: 'Prisma', url: 'https://www.prisma.io/' }], 'webdatabaseschema'),
      ]
    },
      {
      id: 'phase-3',
      name: 'PHASE 3 ?" DEVELOPMENT',
      topics: [
        createTopic('Backend', Server, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'webbackenddev'),
        createTopic('Frontend', Monitor, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webfrontenddev'),
        createTopic('Demo Data', Database, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'webdemodatadev'),
        createTopic('Auth (Optional)', Key, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'webauthoptionaldev'),
      ]
    },
    {
      id: 'phase-4',
      name: 'PHASE 4 — SUBMISSION',
      topics: [
        createTopic('Pitch Deck', Presentation, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webpitchdeck'),
        createTopic('Demo Script', FileText, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webdemoscript'),
        createTopic('Submission Checklist', CheckSquare, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'websubmissionchecklist'),
        createTopic('Hosting', Server, [{name:'Vercel',url:'https://vercel.com/'},{name:'GitHub Actions',url:'https://github.com/features/actions'},{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'webhostinghackathon'),
      ]
    }
];

export const webPersonalTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 ?" DISCOVERY & PLANNING',
    topics: [
      createTopic('Idea Definition', Rocket, [{ name: 'YC RFS', url: 'https://www.ycombinator.com/rfs' }], 'webideadefinition'),
      createTopic('MVP Features', CheckSquare, [{name:'How to build an MVP',url:'https://www.ycombinator.com/library/4Q-a-guide-to-seed-fundraising'}], 'webmvpfeatures'),
    ]
  },
      {
      id: 'phase-1',
      name: 'PHASE 1 ?" UX & PRODUCT DESIGN',
      topics: [
        createTopic('PRD', FileText, [{name:'Notion PRD Templates',url:'https://www.notion.so/templates/prd'}], 'webprd'),
        createTopic('User Flows', Globe, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'}], 'webuserflows'),
        createTopic('Design System', PenTool, [{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'}], 'webdesignsystem'),
      ]
    },
      {
      id: 'phase-2',
      name: 'PHASE 2 ?" TECHNICAL ARCHITECTURE',
      topics: [
        createTopic('Tech Stack Selection', Settings, [{ name: 'Next.js', url: 'https://nextjs.org/' }, { name: 'Vite', url: 'https://vitejs.dev/' }], 'webtechstack'),
        createTopic('Authentication', Key, [{ name: 'Clerk', url: 'https://clerk.com/' }, { name: 'Supabase Auth', url: 'https://supabase.com/auth' }], 'webauthentication'),
        createTopic('Database Schema', Database, [{ name: 'Supabase', url: 'https://supabase.com/' }, { name: 'Prisma', url: 'https://www.prisma.io/' }], 'webdatabaseschema'),
        createTopic('API Design', Globe, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'webapidesign'),
        createTopic('Search System', Search, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'websearchsystem'),
      ]
    },
      {
      id: 'production',
      name: 'PHASE 3 ?" PRODUCTION',
      topics: [
        createTopic('Analytics', BarChart, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'webanalyticsdev'),
        createTopic('Hosting', Server, [{name:'Vercel',url:'https://vercel.com/'},{name:'GitHub Actions',url:'https://github.com/features/actions'},{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'webhostingdev'),
        createTopic('Security Basics', Shield, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'websecuritybasicsdev'),
        createTopic('SEO Basics', Search, [{name:'Ahrefs SEO',url:'https://ahrefs.com/'},{name:'Discord Community',url:'https://discord.com/developers'}], 'webseobasicsdev'),
      ]
    },
  {
    id: 'growth',
    name: 'PHASE 4 — GROWTH',
    topics: [
      createTopic('Feedback', MessageSquare, [{name:'Next.js App Router',url:'https://nextjs.org/docs'},{name:'Vercel Deployment',url:'https://vercel.com/docs'}], 'webfeedback'),
      createTopic('Roadmap', Globe, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'webroadmap'),
    ]
  }
];

export const webCustomTaxonomy: Category[] = [
  ...webProductionTaxonomy.map(cat => {
    if (cat.id === 'phase-3') {
      return {
        ...cat,
        topics: [
          ...cat.topics,
          createTopic('Payments', CreditCard),
          createTopic('Demo Data', Database),
          createTopic('Multi-language', Globe),
          createTopic('PWA Support', Monitor),
          createTopic('Real-time Features', Zap),
          createTopic('Maps', Map),
          createTopic('Chat', MessageSquare),
          createTopic('Community Features', Users),
          createTopic('API Access', Key),
          createTopic('Blog', FileText),
          createTopic('Roles', Users),
          createTopic('Charts', BarChart),
          createTopic('Calendar', Calendar),
          createTopic('Profiles', Users),
          createTopic('Moderation', Shield),
          createTopic('LLM Architecture', Cpu),
          createTopic('Prompt Engineering', Cpu),
          createTopic('Cost Controls', DollarSign),
          createTopic('Rate Limits', Shield),
          createTopic('RAG', Database),
    ]
      };
    }
    if (cat.id === 'phase-5') {
      return {
        ...cat,
        topics: [
          ...cat.topics,
          createTopic('Pitch Deck', Presentation),
          createTopic('Demo Script', FileText),
          createTopic('Submission Checklist', CheckSquare)
    ]
      };
    }
    return cat;
  })
];
