import { 
  FileText, Database, Settings, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Cloud, Activity, Zap, Search, Key, ShieldAlert,
  Target, Users, BarChart, DollarSign, Lock, ListChecks,
  UserCheck, MessageSquare, TrendingUp, AlertCircle, List, Monitor, KeyRound, Share2, Network, Code, FileSignature, LayoutDashboard, DatabaseZap, Workflow, Server, Globe
, Presentation } from 'lucide-react';
import { type Category, createTopic } from './types';

export const internalToolProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — BUSINESS PROCESS DISCOVERY',
    topics: [
      createTopic('Feature Prioritization', List, [{name: 'RICE Framework', url: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/'}, {name: 'Linear Method', url: 'https://linear.app/method/planning'}], 'internalfeatureprioritization'),
      createTopic('Success Metrics', TrendingUp, [{name: 'Amplitude: North Star', url: 'https://amplitude.com/north-star'}, {name: 'AARRR Metrics', url: 'https://500.co/the-startup-playbook/startup-metrics-for-pirates'}], 'internalsuccessmetrics'),
      createTopic('Problem Definition', AlertCircle, [{name: 'Mom Test', url: 'https://www.momtestbook.com/'}, {name: 'Jobs to be Done', url: 'https://jtbd.info/'}], 'internalproblemdefinition'),
      createTopic('Current Workflow Analysis', Activity, [{name: 'Value Stream Mapping', url: 'https://www.atlassian.com/continuous-delivery/principles/value-stream-mapping'}, {name: 'Lucidchart Process Mapping', url: 'https://www.lucidchart.com/pages/process-mapping/how-to-create-a-process-map'}], 'internalcurrentworkflowanalysis'),
      createTopic('Existing Pain Points', ShieldAlert, [{name: '5 Whys Root Cause', url: 'https://www.mindtools.com/pages/article/newTMC_5W.htm'}, {name: 'Fishbone Diagram', url: 'https://en.wikipedia.org/wiki/Ishikawa_diagram'}], 'internalexistingpainpoints'),
      createTopic('Stakeholder Mapping', Users, [{name: 'RACI Matrix', url: 'https://www.cio.com/article/239308/project-management-how-to-design-a-successful-raci-project-plan.html'}, {name: 'Miro Stakeholder Map', url: 'https://miro.com/templates/stakeholder-map/'}], 'internalstakeholdermapping'),
      createTopic('Requirements Gathering', CheckSquare, [{name: 'Reforge: 1-Pagers', url: 'https://www.reforge.com/brief/the-anatomy-of-a-1-pager'}, {name: 'User Story Mapping', url: 'https://www.jpattonassociates.com/user-story-mapping/'}], 'internalrequirementsgathering'),
      createTopic('MVP Scope', Target, [{name: 'Y Combinator: How to Plan an MVP', url: 'https://www.ycombinator.com/library/4Q-a-guide-to-seed-fundraising'}, {name: 'Spotify MVP Model', url: 'https://blog.crisp.se/2013/01/24/henrikkniberg/agile-product-ownership-in-a-nutshell'}], 'internalmvpscope'),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name: 'Lenny PRD Templates', url: 'https://www.lennysnewsletter.com/p/my-favorite-product-management-templates'}, {name: 'Figma PRD', url: 'https://www.figma.com/templates/prd/'}], 'internalprd'),
      createTopic('User Flows', Layers, [{name: 'Mobbin (B2B UI)', url: 'https://mobbin.com/'}, {name: 'PageFlows', url: 'https://pageflows.com/'}, {name: 'UI Garage', url: 'https://uigarage.net/'}], 'internaluserflows'),
      createTopic('Wireframes', Box, [{name: 'Balsamiq', url: 'https://balsamiq.com/'}, {name: 'Excalidraw', url: 'https://excalidraw.com/'}, {name: 'Figma Auto Layout Guide', url: 'https://help.figma.com/hc/en-us/articles/360040451373-Create-dynamic-designs-with-auto-layout'}], 'internalwireframes'),
      createTopic('Design System', Settings, [{name: 'Radix UI Primitives', url: 'https://www.radix-ui.com/'}, {name: 'Shadcn UI', url: 'https://ui.shadcn.com/'}, {name: 'Tailwind UI', url: 'https://tailwindui.com/'}], 'internaldesignsystem'),
      createTopic('Accessibility', UserCheck, [{name: 'A11y Project', url: 'https://www.a11yproject.com/'}, {name: 'W3C WCAG', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/'}, {name: 'Axe DevTools', url: 'https://www.deque.com/axe/devtools/'}], 'internalaccessibility'),
      createTopic('Error States', AlertCircle, [{name: 'Nielsen Norman: Error Messages', url: 'https://www.nngroup.com/articles/error-message-guidelines/'}, {name: 'Designing Empty States', url: 'https://emptystat.es/'}], 'internalerrorstates'),
      createTopic('Loading States', Zap, [{name: 'Skeleton Screens', url: 'https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a'}, {name: 'Framer Motion Transitions', url: 'https://www.framer.com/motion/transition/'}], 'internalloadingstates'),
      createTopic('Business Process Mapping', Workflow, [{name: 'BPMN Standard', url: 'https://www.bpmn.org/'}, {name: 'Camunda Modeling', url: 'https://camunda.com/bpmn/'}], 'internalbusinessprocessmapping'),
      createTopic('User Roles', Key, [{name: 'Zanzibar (Google ACL)', url: 'https://research.google/pubs/pub48190/'}, {name: 'Oso HQ (RBAC/ABAC)', url: 'https://www.osohq.com/'}], 'internaluserroles'),
      createTopic('Dashboard Design', LayoutDashboard, [{name: 'Refactoring UI: Tables', url: 'https://www.refactoringui.com/'}, {name: 'Tremor Components', url: 'https://tremor.so/'}], 'internaldashboarddesign'),
      createTopic('Data Flow Design', Network, [{name: 'C4 Model', url: 'https://c4model.com/'}, {name: 'Mermaid.js Flowcharts', url: 'https://mermaid.js.org/syntax/flowchart.html'}], 'internaldataflowdesign'),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — SYSTEM ARCHITECTURE',
    topics: [
      createTopic('Tech Stack Selection', Layers, [{name: 'ThoughtWorks Tech Radar', url: 'https://www.thoughtworks.com/radar'}, {name: 'State of JS', url: 'https://stateofjs.com/'}], 'internaltechstackselection'),
      createTopic('Authentication', Lock, [{name: 'Lucia Auth', url: 'https://lucia-auth.com/'}, {name: 'Auth.js (NextAuth)', url: 'https://authjs.dev/'}, {name: 'Clerk B2B SaaS', url: 'https://clerk.com/docs/organizations/overview'}], 'internalauthentication'),
      createTopic('Database Schema', Database, [{name: 'Prisma Schema Design', url: 'https://www.prisma.io/dataguide/postgresql/designing-a-schema'}, {name: 'PlanetScale Branching', url: 'https://planetscale.com/docs/concepts/branching'}], 'internaldatabaseschema'),
      createTopic('Cost Estimation', DollarSign, [{name: 'Infracost', url: 'https://www.infracost.io/'}, {name: 'AWS Pricing Calculator', url: 'https://calculator.aws/'}], 'internalcostestimation'),
      createTopic('Integrations', Share2, [{name: 'Postman API Network', url: 'https://www.postman.com/explore'}, {name: 'Svix Webhooks', url: 'https://www.svix.com/'}], 'internalintegrations'),
      createTopic('Internal Tool Fundamentals', BookOpen, [{name: 'Retool: Internal Tools Guide', url: 'https://retool.com/internal-tools'}, {name: 'Refine (React Framework)', url: 'https://refine.dev/'}], 'internalinternaltoolfundamentals'),
      createTopic('Authorization (RBAC)', Shield, [{name: 'Cerbos (Authz)', url: 'https://cerbos.dev/'}, {name: 'Permit.io', url: 'https://www.permit.io/'}], 'internalauthorizationrbac'),
      createTopic('Workflow Engine', Settings, [{name: 'Temporal.io', url: 'https://temporal.io/'}, {name: 'Inngest', url: 'https://www.inngest.com/'}, {name: 'Trigger.dev', url: 'https://trigger.dev/'}], 'internalworkflowengine'),
      createTopic('Reporting Architecture', BarChart, [{name: 'ClickHouse', url: 'https://clickhouse.com/'}, {name: 'Tinybird', url: 'https://www.tinybird.co/'}, {name: 'Metabase Embedding', url: 'https://www.metabase.com/docs/latest/embedding/introduction'}], 'internalreportingarchitecture'),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Authentication', Lock, [{name: 'Lucia Auth', url: 'https://lucia-auth.com/'}, {name: 'Auth.js (NextAuth)', url: 'https://authjs.dev/'}, {name: 'Clerk B2B SaaS', url: 'https://clerk.com/docs/organizations/overview'}], 'internalauthentication'),
      createTopic('Database', DatabaseZap, [{name: 'Drizzle ORM', url: 'https://orm.drizzle.team/'}, {name: 'Neon Serverless Postgres', url: 'https://neon.tech/'}], 'internaldatabase'),
      createTopic('Backend', Server, [{name: 'Hono.js', url: 'https://hono.dev/'}, {name: 'tRPC', url: 'https://trpc.io/'}, {name: 'NestJS', url: 'https://nestjs.com/'}], 'internalbackend'),
      createTopic('Frontend', Code, [{name: 'React Hook Form', url: 'https://react-hook-form.com/'}, {name: 'Zod Validation', url: 'https://zod.dev/'}, {name: 'TanStack Query', url: 'https://tanstack.com/query/latest'}], 'internalfrontend'),
      createTopic('Notifications', MessageSquare, [{name: 'Novu', url: 'https://novu.co/'}, {name: 'Knock.app', url: 'https://knock.app/'}, {name: 'Resend', url: 'https://resend.com/'}], 'internalnotifications'),
      createTopic('Search', Search, [{name: 'Meilisearch', url: 'https://www.meilisearch.com/'}, {name: 'Typesense', url: 'https://typesense.org/'}, {name: 'Algolia', url: 'https://www.algolia.com/'}], 'internalsearch'),
      createTopic('Admin Panel', Settings, [{name: 'React Admin', url: 'https://marmelab.com/react-admin/'}, {name: 'Motor Admin', url: 'https://www.motoradmin.com/'}], 'internaladminpanel'),
      createTopic('Testing', CheckSquare, [{name: 'Playwright', url: 'https://playwright.dev/'}, {name: 'Vitest', url: 'https://vitest.dev/'}, {name: 'Testing Library', url: 'https://testing-library.com/'}], 'internaltesting'),
      createTopic('Documentation', BookOpen, [{name: 'Mintlify', url: 'https://mintlify.com/'}, {name: 'Docusaurus', url: 'https://docusaurus.io/'}, {name: 'Diátaxis Framework', url: 'https://diataxis.fr/'}], 'internaldocumentation'),
      createTopic('Authorization', Shield, [{name: 'Casbin', url: 'https://casbin.org/'}, {name: 'Auth0 FGA', url: 'https://docs.auth0.com/fine-grained-authorization'}], 'internalauthorization'),
      createTopic('CRUD Operations', Database, [{name: 'TanStack Table v8', url: 'https://tanstack.com/table/latest'}, {name: 'SWR Data Fetching', url: 'https://swr.vercel.app/'}], 'internalcrudoperations'),
      createTopic('Workflow Automation', Activity, [{name: 'N8n.io', url: 'https://n8n.io/'}, {name: 'Windmill.dev', url: 'https://www.windmill.dev/'}], 'internalworkflowautomation'),
      createTopic('Reporting', BarChart, [{name: 'Apache ECharts', url: 'https://echarts.apache.org/en/index.html'}, {name: 'Recharts', url: 'https://recharts.org/en-US/'}], 'internalreporting'),
      createTopic('File Uploads', Cloud, [{name: 'UploadThing', url: 'https://uploadthing.com/'}, {name: 'Uppy', url: 'https://uppy.io/'}, {name: 'AWS S3 Presigned URLs', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html'}], 'internalfileuploads'),
      createTopic('Audit Logs', FileSignature, [{name: 'Stripe Idempotency', url: 'https://stripe.com/docs/api/idempotent_requests'}, {name: 'Bitemporal Data History', url: 'https://martinfowler.com/articles/bitemporal-history.html'}], 'internalauditlogs'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name: 'OWASP Top 10 API', url: 'https://owasp.org/www-project-api-security/'}, {name: 'Snyk Vulnerability Database', url: 'https://security.snyk.io/'}, {name: 'Helmet.js', url: 'https://helmetjs.github.io/'}], 'internalsecurity'),
      createTopic('Performance Optimization', Zap, [{name: 'Postgres EXPLAIN ANALYZE', url: 'https://www.postgresql.org/docs/current/sql-explain.html'}, {name: 'React Profiler', url: 'https://react.dev/reference/react/Profiler'}], 'internalperformanceoptimization'),
      createTopic('Monitoring', Monitor, [{name: 'BetterStack', url: 'https://betterstack.com/'}, {name: 'Datadog APM', url: 'https://www.datadoghq.com/product/apm/'}, {name: 'OpenTelemetry', url: 'https://opentelemetry.io/'}], 'internalmonitoring'),
      createTopic('Logging', List, [{name: 'Pino (Node.js)', url: 'https://getpino.io/'}, {name: 'Axiom', url: 'https://axiom.co/'}, {name: 'Winston Logger', url: 'https://github.com/winstonjs/winston'}], 'internallogging'),
      createTopic('Error Tracking', AlertCircle, [{name: 'Sentry', url: 'https://sentry.io/'}, {name: 'LogRocket', url: 'https://logrocket.com/'}, {name: 'Highlight.io', url: 'https://www.highlight.io/'}], 'internalerrortracking'),
      createTopic('Backups', Database, [{name: 'Supabase PITR', url: 'https://supabase.com/docs/guides/platform/backups#point-in-time-recovery'}, {name: 'AWS RDS Backups', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html'}], 'internalbackups'),
      createTopic('CI/CD', Rocket, [{name: 'GitHub Actions Concurrency', url: 'https://docs.github.com/en/actions/using-jobs/using-concurrency'}, {name: 'CircleCI Orbs', url: 'https://circleci.com/developer/orbs'}], 'internalcicd'),
      createTopic('Infrastructure', Cloud, [{name: 'Railway', url: 'https://railway.app/'}, {name: 'Fly.io', url: 'https://fly.io/'}, {name: 'Pulumi', url: 'https://www.pulumi.com/'}], 'internalinfrastructure'),
      createTopic('Scalability', TrendingUp, [{name: 'Redis Caching Patterns', url: 'https://redis.io/docs/manual/patterns/'}, {name: 'Cloudflare Workers', url: 'https://workers.cloudflare.com/'}], 'internalscalability'),
      createTopic('RBAC Validation', KeyRound, [{name: 'JSON Web Token Decoder', url: 'https://jwt.io/'}, {name: 'OWASP Authorization Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Testing_Automation_Cheat_Sheet.html'}], 'internalrbacvalidation'),
      createTopic('Audit Logs', FileText, [{name: 'Stripe Idempotency', url: 'https://stripe.com/docs/api/idempotent_requests'}, {name: 'Bitemporal Data History', url: 'https://martinfowler.com/articles/bitemporal-history.html'}], 'internalauditlogs'),
      createTopic('Disaster Recovery', ShieldAlert, [{name: 'AWS Disaster Recovery Architecture', url: 'https://aws.amazon.com/disaster-recovery/'}, {name: 'Chaos Engineering (Gremlin)', url: 'https://www.gremlin.com/'}], 'internaldisasterrecovery'),
    ]
  },
  {
    id: 'phase-5-deployment',
    name: 'PHASE 5 — DEPLOYMENT',
    topics: [
      createTopic('Documentation', BookOpen, [{name: 'Mintlify', url: 'https://mintlify.com/'}, {name: 'Docusaurus', url: 'https://docusaurus.io/'}, {name: 'Diátaxis Framework', url: 'https://diataxis.fr/'}], 'internaldocumentation'),
      createTopic('Hosting', Cloud, [{name: 'Render', url: 'https://render.com/'}, {name: 'AWS ECS Fargate', url: 'https://aws.amazon.com/fargate/'}, {name: 'DigitalOcean App Platform', url: 'https://www.digitalocean.com/products/app-platform'}], 'internalhosting'),
      createTopic('Domain Setup', Globe, [{name: 'Cloudflare DNS', url: 'https://www.cloudflare.com/dns/'}, {name: 'Tailscale (Internal VPN)', url: 'https://tailscale.com/'}], 'internaldomainsetup'),
      createTopic('Employee Onboarding', Users, [{name: 'Intro.js', url: 'https://introjs.com/'}, {name: 'Shepherd.js', url: 'https://shepherdjs.dev/'}, {name: 'Appcues', url: 'https://www.appcues.com/'}], 'internalemployeeonboarding'),
      createTopic('Training Materials', FileText, [{name: 'Loom', url: 'https://www.loom.com/'}, {name: 'Scribe', url: 'https://scribehow.com/'}], 'internaltrainingmaterials'),
      createTopic('Beta Rollout', Target, [{name: 'LaunchDarkly', url: 'https://launchdarkly.com/'}, {name: 'PostHog Cohorts', url: 'https://posthog.com/docs/data/cohorts'}], 'internalbetarollout'),
      createTopic('Launch Checklist', ListChecks, [{name: 'GitLab Launch Checklist', url: 'https://about.gitlab.com/handbook/engineering/infrastructure/production/readiness/'}, {name: 'Product Hunt Launch Guide', url: 'https://www.producthunt.com/launch'}], 'internallaunchchecklist'),
    ]
  },
  {
    id: 'phase-6-operations',
    name: 'PHASE 6 — OPERATIONS & IMPROVEMENT',
    topics: [
      createTopic('Analytics', BarChart, [{name: 'PostHog', url: 'https://posthog.com/'}, {name: 'Plausible Analytics', url: 'https://plausible.io/'}, {name: 'June.so', url: 'https://june.so/'}], 'internalanalytics'),
      createTopic('User Feedback', MessageSquare, [{name: 'Sentry User Feedback', url: 'https://docs.sentry.io/product/user-feedback/'}, {name: 'Canny.io', url: 'https://canny.io/'}, {name: 'Formbricks', url: 'https://formbricks.com/'}], 'internaluserfeedback'),
      createTopic('Roadmap', TrendingUp, [{name: 'Linear Roadmaps', url: 'https://linear.app/features/roadmaps'}, {name: 'Now, Next, Later Framework', url: 'https://www.prodpad.com/blog/how-to-build-a-now-next-later-roadmap/'}], 'internalroadmap'),
      createTopic('Feature Requests', List, [{name: 'Productboard', url: 'https://www.productboard.com/'}, {name: 'Feature Upvote', url: 'https://featureupvote.com/'}], 'internalfeaturerequests'),
      createTopic('Process Improvements', Activity, [{name: 'Lean Software Development', url: 'https://en.wikipedia.org/wiki/Lean_software_development'}, {name: 'Theory of Constraints', url: 'https://en.wikipedia.org/wiki/Theory_of_constraints'}], 'internalprocessimprovements'),
      createTopic('Usage Tracking', Target, [{name: 'Metabase', url: 'https://www.metabase.com/'}, {name: 'Mixpanel', url: 'https://mixpanel.com/'}], 'internalusagetracking'),
      createTopic('Technical Debt', AlertCircle, [{name: 'Martin Fowler: Tech Debt Quadrant', url: 'https://martinfowler.com/bliki/TechnicalDebtQuadrant.html'}, {name: 'Renovate Bot', url: 'https://docs.renovatebot.com/'}], 'internaltechnicaldebt'),
      createTopic('Presentation Prep', Presentation),
      createTopic('Pitch Deck', Presentation),
    ]
  }
];

const filterTaxonomy = (keep: string[], hide: string[]) => {
  return internalToolProductionTaxonomy.map(cat => {
    return {
      ...cat,
      topics: cat.topics.filter(t => {
        if (hide.includes(t.name)) return false;
        if (keep.length > 0 && !keep.includes(t.name)) return false;
        return true;
      })
    };
  }).filter(cat => cat.topics.length > 0);
};

export const internalToolHackathonTaxonomy: Category[] = filterTaxonomy(
  [
    'Problem Definition', 'Current Workflow Analysis', 'MVP Scope', 'PRD', 
    'User Roles', 'Database Schema', 'Frontend', 'Backend', 'CRUD Operations', 
    'Dashboard Design', 'Pitch Deck', 'Demo Script', 'Submission Checklist',
    // Aliases mapped from user prompt
    'Demo Data', 'Current Workflow'
  ],
  [
    'Audit Logs', 'Monitoring', 'Disaster Recovery', 'Employee Training', 'Advanced Security', 'Training Materials', 'Security'
  ]
);

export const internalToolPersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Enterprise SSO', 'Advanced Monitoring', 'Large-scale Infrastructure',
    'Infrastructure', 'Scalability', 'Disaster Recovery', 'Domain Setup'
  ]
);

export const internalToolCustomTaxonomy = internalToolProductionTaxonomy;
