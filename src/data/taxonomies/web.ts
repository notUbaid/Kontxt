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
      createTopic('Idea Definition', Rocket, [{ name: 'YC RFS', url: 'https://www.ycombinator.com/rfs' }, { name: 'Paul Graham: Startup Ideas', url: 'http://www.paulgraham.com/startupideas.html' }], 'webideadefinition'),
      createTopic('Problem Statement', AlertCircle, [{ name: 'The Mom Test', url: 'https://www.momtestbook.com/' }, { name: 'Lenny: Validating Ideas', url: 'https://www.lennysnewsletter.com/p/validating-your-startup-idea' }], 'webproblemstatement'),
      createTopic('User Journey', Globe, [{ name: 'Growth Design Case Studies', url: 'https://growth.design/case-studies' }, { name: 'Mobbin UX Patterns', url: 'https://mobbin.com/' }], 'webuserjourney'),
      createTopic('Personas', Users, [{ name: 'Nielsen Norman: Personas', url: 'https://www.nngroup.com/articles/persona-types/' }, { name: 'UX Pressia', url: 'https://uxpressia.com/' }], 'webpersonas'),
      createTopic('Solution Statement', CheckSquare, [{ name: 'Superhuman PMF Engine', url: 'https://firstround.com/review/how-superhuman-built-an-engine-to-find-product-market-fit/' }], 'websolutionstatement'),
      createTopic('Elevator Pitch', Presentation, [{ name: 'YC: How to Pitch', url: 'https://www.ycombinator.com/library/4O-how-to-pitch-your-company' }, { name: 'TechCrunch: Pitch Deck Examples', url: 'https://techcrunch.com/tag/pitch-deck/' }], 'webelevatorpitch'),
      createTopic('Competitor Analysis', BarChart, [{ name: 'Similarweb', url: 'https://www.similarweb.com/' }, { name: 'G2 Crowd', url: 'https://www.g2.com/' }], 'webcompetitoranalysis'),
      createTopic('Feature Planning', CheckSquare, [{ name: 'Linear Method', url: 'https://linear.app/method' }, { name: 'Intercom: Product Strategy', url: 'https://www.intercom.com/resources/books/intercom-on-product-management' }], 'webfeatureplanning'),
      createTopic('MVP Features', Rocket, [{ name: 'YC: How to Build an MVP', url: 'https://www.ycombinator.com/library/4Q-a-guide-to-seed-fundraising' }], 'webmvpfeatures'),
      createTopic('Future Features', Layers, [{ name: 'Notion Product Roadmap', url: 'https://www.notion.so/templates/product-roadmap' }], 'webfuturefeatures'),
      createTopic('Success Metrics', Activity, [{ name: 'PostHog: Product Metrics', url: 'https://posthog.com/product-metrics' }, { name: 'Mixpanel: Retention', url: 'https://mixpanel.com/topics/user-retention/' }], 'websuccessmetrics'),
      createTopic('Users & Audience', Users, [{ name: 'GigaBrain (Reddit Search)', url: 'https://thegigabrain.com/' }, { name: 'SparkToro', url: 'https://sparktoro.com/' }], 'webusersaudience'),
      createTopic('User Goals', Target, [{ name: 'JTBD Framework', url: 'https://jtbd.info/' }, { name: 'Intercom: Jobs to be Done', url: 'https://www.intercom.com/resources/books/intercom-on-jobs-to-be-done' }], 'webusergoals'),
      createTopic('Nice-to-Have Features', Layers, [{ name: 'Basecamp: Shape Up', url: 'https://basecamp.com/shapeup' }], 'webnicetohavefeatures'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — UX & PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{ name: 'Lenny: PRD Templates', url: 'https://www.lennysnewsletter.com/p/product-requirements-document-prd' }], 'webprd'),
      createTopic('User Flows', Globe, [{ name: 'PageFlows', url: 'https://pageflows.com/' }, { name: 'Whimsical', url: 'https://whimsical.com/' }], 'webuserflows'),
      createTopic('Information Architecture', Layers, [{ name: 'Nielsen Norman: IA', url: 'https://www.nngroup.com/topic/information-architecture/' }], 'webinformationarchitecture'),
      createTopic('Wireframes', Box, [{ name: 'Balsamiq UI Guidelines', url: 'https://balsamiq.com/learn/ui-control-guidelines/' }, { name: 'Figma Community', url: 'https://www.figma.com/community' }], 'webwireframes'),
      createTopic('Design System', PenTool, [{ name: 'Shadcn UI', url: 'https://ui.shadcn.com/' }, { name: 'Radix Primitives', url: 'https://www.radix-ui.com/primitives' }, { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' }], 'webdesignsystem'),
      createTopic('Branding', Target, [{ name: 'Realtime Colors', url: 'https://www.realtimecolors.com/' }, { name: 'Google Fonts', url: 'https://fonts.google.com/' }], 'webbranding'),
      createTopic('Accessibility', Users, [{ name: 'Axe Accessibility Checker', url: 'https://www.deque.com/axe/' }, { name: 'WCAG Guidelines', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/' }], 'webaccessibility'),
      createTopic('Empty States', Box, [{ name: 'EmptyStat.es', url: 'https://emptystat.es/' }, { name: 'Undraw (Illustrations)', url: 'https://undraw.co/' }], 'webemptystates'),
      createTopic('Error States', AlertCircle, [{ name: 'React Error Boundaries', url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary' }], 'weberrorstates'),
      createTopic('Loading States', Activity, [{ name: 'UI Skeletons (CSS Tricks)', url: 'https://css-tricks.com/building-skeleton-screens-css-custom-properties/' }], 'webloadingstates'),
      createTopic('Sitemap', Layers, [{ name: 'Next.js Sitemap Generation', url: 'https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap' }], 'websitemap'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — TECHNICAL ARCHITECTURE',
    topics: [
      createTopic('Tech Stack Selection', Settings, [{ name: 'Next.js App Router', url: 'https://nextjs.org/docs' }, { name: 'Vite', url: 'https://vitejs.dev/' }], 'webtechstack'),
      createTopic('Frontend Architecture', Monitor, [{ name: 'TanStack Query', url: 'https://tanstack.com/query/latest' }, { name: 'Zustand', url: 'https://docs.pmnd.rs/zustand/' }], 'webfrontendarchitecture'),
      createTopic('Backend Architecture', Server, [{ name: 'Node Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices' }, { name: 'Martin Fowler: MVC', url: 'https://martinfowler.com/eaaCatalog/modelViewController.html' }], 'webbackendarchitecture'),
      createTopic('API Design', Globe, [{ name: 'Stripe API Design', url: 'https://stripe.com/docs/api' }, { name: 'RESTful API Guidelines', url: 'https://restfulapi.net/' }], 'webapidesign'),
      createTopic('Authentication', Key, [{ name: 'Clerk', url: 'https://clerk.com/' }, { name: 'Lucia Auth', url: 'https://lucia-auth.com/' }, { name: 'NextAuth.js', url: 'https://next-auth.js.org/' }], 'webauthentication'),
      createTopic('Database Schema', Database, [{ name: 'Prisma Schema Reference', url: 'https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference' }, { name: 'Drizzle ORM', url: 'https://orm.drizzle.team/' }], 'webdatabaseschema'),
      createTopic('File Storage', Cloud, [{ name: 'AWS S3 Presigned URLs', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html' }, { name: 'UploadThing', url: 'https://uploadthing.com/' }], 'webfilestorage'),
      createTopic('Cost Estimation', DollarSign, [{ name: 'Serverless Cost Calculator', url: 'https://serverlesscalc.com/' }, { name: 'Vercel Pricing', url: 'https://vercel.com/pricing' }], 'webcostestimation'),
      createTopic('Web Fundamentals', BookOpen, [{ name: 'MDN: HTTP Caching', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching' }, { name: 'MDN: CORS', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS' }], 'webfundamentals'),
      createTopic('Authorization', Lock, [{ name: 'Cerbos (Open Source Authorization)', url: 'https://cerbos.dev/' }, { name: 'Permit.io', url: 'https://www.permit.io/' }], 'webauthorization'),
      createTopic('Search System', Search, [{ name: 'Postgres Full Text Search', url: 'https://www.postgresql.org/docs/current/textsearch.html' }, { name: 'Meilisearch', url: 'https://www.meilisearch.com/' }], 'websearchsystem'),
      createTopic('Third-Party Integrations', Link, [{ name: 'Merge.dev (Unified API)', url: 'https://merge.dev/' }, { name: 'Inngest (Background Jobs)', url: 'https://www.inngest.com/' }], 'webthirdpartyintegrations'),
      createTopic('AI Features (Optional)', Cpu, [{ name: 'Vercel AI SDK', url: 'https://sdk.vercel.ai/docs' }, { name: 'OpenAI API Reference', url: 'https://platform.openai.com/docs/api-reference' }], 'webaifeatures'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Auth', Key, [{ name: 'OWASP Session Management', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html' }], 'webauthdev'),
      createTopic('Database', Database, [{ name: 'Prisma Migrations', url: 'https://www.prisma.io/docs/concepts/components/prisma-migrate' }, { name: 'Faker.js (Seeding)', url: 'https://fakerjs.dev/' }], 'webdatabasedev'),
      createTopic('Backend', Server, [{ name: 'Zod Validation', url: 'https://zod.dev/' }, { name: 'Express Error Handling', url: 'https://expressjs.com/en/guide/error-handling.html' }], 'webbackenddev'),
      createTopic('Frontend', Monitor, [{ name: 'Optimistic UI (TanStack Query)', url: 'https://tanstack.com/query/v5/docs/react/guides/optimistic-updates' }], 'webfrontenddev'),
      createTopic('APIs', Globe, [{ name: 'tRPC', url: 'https://trpc.io/' }, { name: 'JSON API Spec', url: 'https://jsonapi.org/' }], 'webapisdev'),
      createTopic('Notifications', Bell, [{ name: 'Supabase Realtime', url: 'https://supabase.com/docs/guides/realtime' }, { name: 'Sonner (React Toasts)', url: 'https://sonner.emilkowal.ski/' }], 'webnotificationsdev'),
      createTopic('Search', Search, [{ name: 'useHooks: useDebounce', url: 'https://usehooks.com/useDebounce/' }], 'websearchdev'),
      createTopic('Admin Panel', LayoutDashboard, [{ name: 'Retool', url: 'https://retool.com/' }, { name: 'Supabase Studio', url: 'https://supabase.com/docs/guides/platform/manage-your-usage/studio' }], 'webadminpaneldev'),
      createTopic('Integrations', Link, [{ name: 'Node Crypto Module', url: 'https://nodejs.org/api/crypto.html' }, { name: 'Stripe Webhooks', url: 'https://stripe.com/docs/webhooks' }], 'webintegrationsdev'),
      createTopic('Testing', CheckSquare, [{ name: 'Playwright', url: 'https://playwright.dev/' }, { name: 'Testing Library', url: 'https://testing-library.com/' }], 'webtestingdev'),
      createTopic('Documentation', FileText, [{ name: 'Mintlify', url: 'https://mintlify.com/' }, { name: 'Swagger UI', url: 'https://swagger.io/tools/swagger-ui/' }], 'webdocumentationdev'),
      createTopic('Email Notifications', MessageSquare, [{ name: 'React Email', url: 'https://react.email/' }, { name: 'Resend', url: 'https://resend.com/' }], 'webemailnotificationsdev'),
      createTopic('File Uploads', Cloud, [{ name: 'File-Type (Magic Bytes)', url: 'https://github.com/sindresorhus/file-type' }, { name: 'Sharp (Image Processing)', url: 'https://sharp.pixelplumbing.com/' }], 'webfileuploadsdev'),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{ name: 'Helmet.js', url: 'https://helmetjs.github.io/' }, { name: 'DOMPurify', url: 'https://github.com/cure53/DOMPurify' }], 'websecurityreadiness'),
      createTopic('Performance Optimization', Zap, [{ name: 'Core Web Vitals', url: 'https://web.dev/vitals/' }, { name: 'React.lazy (Code Splitting)', url: 'https://react.dev/reference/react/lazy' }], 'webperformanceoptimization'),
      createTopic('Monitoring', Activity, [{ name: 'Checkly', url: 'https://www.checklyhq.com/' }, { name: 'BetterStack', url: 'https://betterstack.com/' }], 'webmonitoring'),
      createTopic('Logging', FileText, [{ name: 'Pino (Node.js Logger)', url: 'https://getpino.io/' }, { name: 'Axiom', url: 'https://axiom.co/' }], 'weblogging'),
      createTopic('Error Tracking', AlertCircle, [{ name: 'Sentry Source Maps', url: 'https://docs.sentry.io/platforms/javascript/sourcemaps/' }], 'weberrortracking'),
      createTopic('Rate Limiting', Shield, [{ name: 'Upstash Ratelimit', url: 'https://upstash.com/docs/redis/sdks/ratelimit-ts/overview' }], 'webratelimiting'),
      createTopic('Caching', Zap, [{ name: 'SWR (Stale-While-Revalidate)', url: 'https://swr.vercel.app/' }, { name: 'Upstash Redis', url: 'https://upstash.com/' }], 'webcaching'),
      createTopic('Backups', Database, [{ name: 'Postgres pg_dump', url: 'https://www.postgresql.org/docs/current/app-pgdump.html' }], 'webbackups'),
      createTopic('CI/CD', Settings, [{ name: 'GitHub Actions for Node.js', url: 'https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs' }], 'webcicd'),
      createTopic('SEO', Search, [{ name: 'Google Search Console', url: 'https://search.google.com/search-console' }, { name: 'Schema.org JSON-LD', url: 'https://schema.org/' }], 'webseoprod'),
      createTopic('Scalability Planning', BarChart, [{ name: 'PgBouncer', url: 'https://www.pgbouncer.org/' }, { name: 'Supabase Supavisor', url: 'https://supabase.com/blog/supavisor-1-million' }], 'webscalabilityplanning'),
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
