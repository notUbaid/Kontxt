import { 
  FileText, Database, Settings, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Cloud, Activity, Zap, Search, Key, ShieldAlert,
  Target, Users, BarChart, DollarSign, Lock, ListChecks,
  UserCheck, MessageSquare, TrendingUp, AlertCircle, List, Monitor, KeyRound, Share2, FileSignature, LayoutDashboard, DatabaseZap, Workflow
, Presentation, HelpCircle, FileDigit, CheckCircle, DownloadCloud, Gauge, RefreshCcw, Handshake, Map } from 'lucide-react';
import { type Category, createTopic } from './types';

export const internalToolProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — BUSINESS PROCESS DISCOVERY',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Problem Definition', AlertCircle, [{name: 'Mom Test', url: 'https://www.momtestbook.com/'}, {name: 'Jobs to be Done', url: 'https://jtbd.info/'}], 'internalproblemdefinition'),
      createTopic('Current Workflow Analysis', Activity, [{name: 'Value Stream Mapping', url: 'https://www.atlassian.com/continuous-delivery/principles/value-stream-mapping'}], 'internalcurrentworkflowanalysis'),
      createTopic('Process Mapping', Workflow, [{name: 'BPMN Standard', url: 'https://www.bpmn.org/'}], 'internalprocessmapping'),
      createTopic('Existing Pain Points', ShieldAlert, [{name: '5 Whys Root Cause', url: 'https://www.mindtools.com/pages/article/newTMC_5W.htm'}], 'internalexistingpainpoints'),
      createTopic('Stakeholder Mapping', Users, [{name: 'RACI Matrix', url: 'https://www.cio.com/article/239308/project-management-how-to-design-a-successful-raci-project-plan.html'}], 'internalstakeholdermapping'),
      createTopic('Requirements Gathering', CheckSquare, [{name: 'User Story Mapping', url: 'https://www.jpattonassociates.com/user-story-mapping/'}], 'internalrequirementsgathering'),
      createTopic('Automation Opportunities', Zap, [{name: 'Lean Software Development', url: 'https://en.wikipedia.org/wiki/Lean_software_development'}], 'internalautomationopportunities'),
      createTopic('Build vs Buy', Handshake, [{name: 'Retool vs Custom', url: 'https://retool.com/'}], 'internalbuildvsbuy'),
      createTopic('Success Metrics', TrendingUp, [{name: 'AARRR Metrics', url: 'https://500.co/the-startup-playbook/startup-metrics-for-pirates'}], 'internalsuccessmetrics'),
      createTopic('Feature Prioritization', List, [{name: 'RICE Framework', url: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/'}], 'internalfeatureprioritization'),
      createTopic('MVP Scope', Target, [{name: 'Spotify MVP Model', url: 'https://blog.crisp.se/2013/01/24/henrikkniberg/agile-product-ownership-in-a-nutshell'}], 'internalmvpscope'),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name: 'Lenny PRD Templates', url: 'https://www.lennysnewsletter.com/'}], 'internalprd'),
      createTopic('User Flows', Layers, [{name: 'PageFlows', url: 'https://pageflows.com/'}], 'internaluserflows'),
      createTopic('Business Process Mapping', Workflow, [{name: 'Camunda Modeling', url: 'https://camunda.com/bpmn/'}], 'internalbusinessprocessmapping'),
      createTopic('Business Rules', FileSignature, [{name: 'Rules Engine Pattern', url: 'https://martinfowler.com/articles/rules-engines.html'}], 'internalbusinessrules'),
      createTopic('User Roles', Key, [{name: 'Zanzibar (Google ACL)', url: 'https://research.google/pubs/pub48190/'}], 'internaluserroles'),
      createTopic('User Types', Users, [{name: 'Persona Mapping', url: 'https://www.nngroup.com/articles/persona-types/'}], 'internalusertypes'),
      createTopic('Dashboard Strategy', LayoutDashboard, [{name: 'Dashboard Design', url: 'https://www.refactoringui.com/'}], 'internaldashboardstrategy'),
      createTopic('Wireframes', Box, [{name: 'Balsamiq', url: 'https://balsamiq.com/'}], 'internalwireframes'),
      createTopic('Forms Design', FileDigit, [{name: 'Form Design Guidelines', url: 'https://www.nngroup.com/articles/form-design-guidelines/'}], 'internalformsdesign'),
      createTopic('Table UX', Database, [{name: 'Data Table Design', url: 'https://uxdesign.cc/designing-better-data-tables-430a30a00d8c'}], 'internaltableux'),
      createTopic('Design System', Settings, [{name: 'Radix UI Primitives', url: 'https://www.radix-ui.com/'}], 'internaldesignsystem'),
      createTopic('Accessibility', UserCheck, [{name: 'A11y Project', url: 'https://www.a11yproject.com/'}], 'internalaccessibility'),
      createTopic('Loading States', Zap, [{name: 'Skeleton Screens', url: 'https://uxdesign.cc/'}], 'internalloadingstates'),
      createTopic('Empty States', Box, [{name: 'Designing Empty States', url: 'https://emptystat.es/'}], 'internalemptystates'),
      createTopic('Error States', AlertCircle, [{name: 'Error Message Guidelines', url: 'https://www.nngroup.com/articles/error-message-guidelines/'}], 'internalerrorstates'),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — ARCHITECTURE',
    topics: [
      createTopic('Internal Tool Fundamentals', BookOpen, [{name: 'Retool: Internal Tools Guide', url: 'https://retool.com/internal-tools'}], 'internalinternaltoolfundamentals'),
      createTopic('Tech Stack', Layers, [{name: 'ThoughtWorks Tech Radar', url: 'https://www.thoughtworks.com/radar'}], 'internaltechstack'),
      createTopic('User Architecture', Users, [{name: 'Clerk B2B SaaS', url: 'https://clerk.com/docs/organizations/overview'}], 'internaluserarchitecture'),
      createTopic('Authentication', Lock, [{name: 'Lucia Auth', url: 'https://lucia-auth.com/'}], 'internalauthentication'),
      createTopic('Authorization (RBAC)', Shield, [{name: 'Cerbos (Authz)', url: 'https://cerbos.dev/'}], 'internalauthorizationrbac'),
      createTopic('Database Schema', Database, [{name: 'Prisma Schema Design', url: 'https://www.prisma.io/'}], 'internaldatabaseschema'),
      createTopic('Data Ownership', KeyRound, [{name: 'Data Governance', url: 'https://en.wikipedia.org/wiki/Data_governance'}], 'internaldataownership'),
      createTopic('Workflow Engine', Settings, [{name: 'Temporal.io', url: 'https://temporal.io/'}, {name: 'Inngest', url: 'https://www.inngest.com/'}], 'internalworkflowengine'),
      createTopic('Approval Workflow', CheckCircle, [{name: 'Approval Processes', url: 'https://www.process.st/'}], 'internalapprovalworkflow'),
      createTopic('Integrations', Share2, [{name: 'Postman API Network', url: 'https://www.postman.com/explore'}], 'internalintegrations'),
      createTopic('Reporting Architecture', BarChart, [{name: 'ClickHouse', url: 'https://clickhouse.com/'}], 'internalreportingarchitecture'),
      createTopic('Audit Strategy', FileSignature, [{name: 'Bitemporal Data History', url: 'https://martinfowler.com/articles/bitemporal-history.html'}], 'internalauditstrategy'),
      createTopic('Cost Estimation', DollarSign, [{name: 'Infracost', url: 'https://www.infracost.io/'}], 'internalcostestimation'),
      createTopic('Fake Business Data', Box, [], 'internaltoolfakedata'),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Database', DatabaseZap, [{name: 'Drizzle ORM', url: 'https://orm.drizzle.team/'}], 'internaldatabase'),
      createTopic('CRUD Operations', Database, [{name: 'TanStack Query', url: 'https://tanstack.com/query/latest'}], 'internalcrudoperations'),
      createTopic('Forms', FileDigit, [{name: 'React Hook Form', url: 'https://react-hook-form.com/'}], 'internalforms'),
      createTopic('Tables', LayoutDashboard, [{name: 'TanStack Table v8', url: 'https://tanstack.com/table/latest'}], 'internaltables'),
      createTopic('Workflow Automation', Activity, [{name: 'N8n.io', url: 'https://n8n.io/'}], 'internalworkflowautomation'),
      createTopic('Notifications', MessageSquare, [{name: 'Novu', url: 'https://novu.co/'}], 'internalnotifications'),
      createTopic('Reports', BarChart, [{name: 'Apache ECharts', url: 'https://echarts.apache.org/'}], 'internalreports'),
      createTopic('Admin Panel', Settings, [{name: 'React Admin', url: 'https://marmelab.com/react-admin/'}], 'internaladminpanel'),
      createTopic('Search', Search, [{name: 'Meilisearch', url: 'https://www.meilisearch.com/'}], 'internalsearch'),
      createTopic('File Uploads', Cloud, [{name: 'UploadThing', url: 'https://uploadthing.com/'}], 'internalfileuploads'),
      createTopic('Import & Export', DownloadCloud, [{name: 'Papaparse CSV', url: 'https://www.papaparse.com/'}], 'internalimportexport'),
      createTopic('Bulk Operations', Layers, [{name: 'Batch Updates Postgres', url: 'https://www.postgresql.org/'}], 'internalbulkoperations'),
      createTopic('Audit Logs', FileSignature, [{name: 'Stripe Idempotency', url: 'https://stripe.com/docs/api/idempotent_requests'}], 'internalauditlogs'),
      createTopic('Data Validation', ShieldAlert, [{name: 'Zod Validation', url: 'https://zod.dev/'}], 'internaldatavalidation'),
      createTopic('Testing', CheckSquare, [{name: 'Playwright', url: 'https://playwright.dev/'}], 'internaltesting'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name: 'OWASP Top 10 API', url: 'https://owasp.org/'}], 'internalsecurity'),
      createTopic('Security & Compliance', ShieldAlert, [{name: 'SOC2 Basics', url: 'https://www.soc2.co/'}], 'internalsecuritycompliance'),
      createTopic('Observability', Monitor, [{name: 'Datadog APM', url: 'https://www.datadoghq.com/'}, {name: 'Sentry', url: 'https://sentry.io/'}], 'internalobservability'),
      createTopic('Performance', Zap, [{name: 'Postgres EXPLAIN ANALYZE', url: 'https://www.postgresql.org/'}], 'internalperformance'),
      createTopic('Backup Strategy', Database, [{name: 'Supabase PITR', url: 'https://supabase.com/'}], 'internalbackupstrategy'),
      createTopic('Change Management', RefreshCcw, [{name: 'LaunchDarkly', url: 'https://launchdarkly.com/'}], 'internalchangemanagement'),
      createTopic('CI/CD', Rocket, [{name: 'GitHub Actions', url: 'https://github.com/features/actions'}], 'internalcicd'),
      createTopic('Infrastructure', Cloud, [{name: 'Railway', url: 'https://railway.app/'}], 'internalinfrastructure'),
      createTopic('Scalability', TrendingUp, [{name: 'Cloudflare Workers', url: 'https://workers.cloudflare.com/'}], 'internalscalability'),
      createTopic('Disaster Recovery', AlertCircle, [{name: 'AWS Disaster Recovery', url: 'https://aws.amazon.com/disaster-recovery/'}], 'internaldisasterrecovery'),
    ]
  },
  {
    id: 'phase-5-deployment',
    name: 'PHASE 5 — DEPLOYMENT',
    topics: [
      createTopic('Hosting', Cloud, [{name: 'Render', url: 'https://render.com/'}], 'internalhosting'),
      createTopic('Data Migration', DatabaseZap, [{name: 'Flyway DB Migration', url: 'https://flywaydb.org/'}], 'internaldatamigration'),
      createTopic('User Documentation', BookOpen, [{name: 'Mintlify', url: 'https://mintlify.com/'}], 'internaluserdocumentation'),
      createTopic('User Adoption', Users, [{name: 'Appcues', url: 'https://www.appcues.com/'}], 'internaluseradoption'),
      createTopic('Training Materials', FileText, [{name: 'Loom', url: 'https://www.loom.com/'}], 'internaltrainingmaterials'),
      createTopic('Permissions Rollout', KeyRound, [{name: 'Zanzibar (Google ACL)', url: 'https://research.google/pubs/pub48190/'}], 'internalpermissionsrollout'),
      createTopic('Beta Rollout', Target, [{name: 'PostHog Cohorts', url: 'https://posthog.com/'}], 'internalbetarollout'),
      createTopic('Launch Checklist', ListChecks, [{name: 'GitLab Launch Checklist', url: 'https://about.gitlab.com/'}], 'internallaunchchecklist'),
    ]
  },
  {
    id: 'phase-6-operations',
    name: 'PHASE 6 — OPERATIONS & IMPROVEMENT',
    topics: [
      createTopic('Analytics', BarChart, [{name: 'PostHog', url: 'https://posthog.com/'}], 'internalanalytics'),
      createTopic('Adoption Metrics', Gauge, [{name: 'Amplitude Retention', url: 'https://amplitude.com/'}], 'internaladoptionmetrics'),
      createTopic('Business Impact', TrendingUp, [{name: 'ROI Calculation', url: 'https://en.wikipedia.org/wiki/Return_on_investment'}], 'internalbusinessimpact'),
      createTopic('Usage Tracking', Target, [{name: 'Metabase', url: 'https://www.metabase.com/'}], 'internalusagetracking'),
      createTopic('User Feedback', MessageSquare, [{name: 'Canny.io', url: 'https://canny.io/'}], 'internaluserfeedback'),
      createTopic('Process Improvements', Activity, [{name: 'Theory of Constraints', url: 'https://en.wikipedia.org/wiki/Theory_of_constraints'}], 'internalprocessimprovements'),
      createTopic('Technical Debt', AlertCircle, [{name: 'Martin Fowler: Tech Debt Quadrant', url: 'https://martinfowler.com/bliki/TechnicalDebtQuadrant.html'}], 'internaltechnicaldebt'),
      createTopic('Feature Requests', List, [{name: 'Productboard', url: 'https://www.productboard.com/'}], 'internalfeaturerequests'),
      createTopic('Roadmap', Map, [{name: 'Linear Roadmaps', url: 'https://linear.app/features/roadmaps'}], 'internalroadmap'),
      createTopic('Presentation Prep', Presentation, [], 'internalpresentationprep'),
      createTopic('Pitch Deck', Presentation, [], 'internalpitchdeck'),
      createTopic('Demo Script', CheckSquare, [], 'internaldemoscript'),
      createTopic('Submission Checklist', CheckSquare, [], 'internalsubmissionchecklist'),
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
    'Welcome', 'Problem Definition', 'Current Workflow Analysis', 'MVP Scope', 'PRD', 
    'User Roles', 'Database Schema', 'Forms', 'Tables', 'CRUD Operations', 
    'Dashboard Strategy', 'Fake Business Data', 'Bulk Operations',
    // Mapped from user requests / presentation
    'Presentation Prep', 'Pitch Deck', 'Demo Script', 'Submission Checklist'
  ],
  []
);

export const internalToolPersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Infrastructure', 'Scalability', 'Disaster Recovery',
    'Security & Compliance', 'Change Management', 'Permissions Rollout',
    'Presentation Prep', 'Pitch Deck', 'Demo Script', 'Submission Checklist',
    'Fake Business Data',
    // Corporate/Enterprise overhead hidden from Personal
    'Stakeholder Mapping', 'Feature Prioritization', 'Success Metrics',
    'User Types', 'User Roles', 'Data Ownership', 'Audit Strategy',
    'Audit Logs', 'Training Materials', 'User Adoption', 'Launch Checklist',
    'Adoption Metrics', 'Business Impact', 'Roadmap', 'Feature Requests'
  ]
);

export const internalToolCustomTaxonomy = internalToolProductionTaxonomy;
