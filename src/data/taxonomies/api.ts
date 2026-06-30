import { 
  FileText, Database, Settings, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Cloud, Activity, Zap, Search, Key, ShieldAlert,
  Target, Users, BarChart, DollarSign, Lock,
  MessageSquare, TrendingUp, AlertCircle, List, Play, Monitor, 
  KeyRound, Share2, Network, Code, 
  Presentation, HelpCircle
} from 'lucide-react';
import { type Category, createTopic } from './types';

const apiMasterTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — DISCOVERY & VALIDATION',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Problem Definition', AlertCircle, [{name: 'Mom Test Guide', url: 'https://www.momtestbook.com/'}], 'apiproblemdefinition'),
      createTopic('API Purpose', Target, [], 'apiapipurpose'),
      createTopic('Target Developers', Users, [{name: 'Stripe Press: Developer Audience', url: 'https://press.stripe.com/'}], 'apitargetdevelopers'),
      createTopic('API Use Cases', Search, [], 'apiapiusecases'),
      createTopic('Competitor Analysis', BarChart, [{name: 'API Tracker', url: 'https://www.apitracker.io/'}], 'apicompetitoranalysis'),
      createTopic('Feature Prioritization', List, [], 'apifeatureprioritization'),
      createTopic('Monetization Strategy', DollarSign, [{name: 'Stripe Billing', url: 'https://stripe.com/billing'}], 'apimonetizationstrategy'),
      createTopic('Success Metrics', TrendingUp, [], 'apisuccessmetrics'),
      createTopic('MVP Scope', Target, [], 'apimvpscope'),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — API DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name: 'Postman: API First PRD', url: 'https://blog.postman.com/api-first/'}], 'apiprd'),
      createTopic('API Resources', Database, [{name: 'RESTful API Naming', url: 'https://restfulapi.net/resource-naming/'}], 'apiapiresources'),
      createTopic('Endpoint Planning', Network, [{name: 'Stripe Pagination Pattern', url: 'https://stripe.com/docs/api/pagination'}], 'apiendpointplanning'),
      createTopic('Request Design', Share2, [], 'apirequestdesign'),
      createTopic('Response Design', Share2, [], 'apiresponsedesign'),
      createTopic('Error Design', AlertCircle, [{name: 'RFC 7807 (Problem Details)', url: 'https://datatracker.ietf.org/doc/html/rfc7807'}], 'apierrordesign'),
      createTopic('API Standards', BookOpen, [{name: 'Microsoft REST Guidelines', url: 'https://github.com/microsoft/api-guidelines'}], 'apiapistandards'),
      createTopic('Versioning Strategy', Layers, [], 'apiversioningstrategy'),
      createTopic('Authentication Strategy', Lock, [{name: 'API Key Best Practices', url: 'https://cloud.google.com/docs/authentication/api-keys'}], 'apiauthenticationstrategy'),
      createTopic('Authorization Strategy', Shield, [{name: 'OAuth 2.0 Docs', url: 'https://oauth.net/2/'}], 'apiauthorizationstrategy'),
      createTopic('Rate Limiting Strategy', Activity, [{name: 'Redis Token Bucket', url: 'https://redis.com/glossary/rate-limiting/'}], 'apiratelimitingstrategy'),
      createTopic('SDK Strategy', Code, [{name: 'Speakeasy (SDK Gen)', url: 'https://www.speakeasyapi.dev/'}], 'apisdkstrategy'),
      createTopic('API Documentation Strategy', FileText, [], 'apiapidocumentationstrategy'),
      createTopic('Developer Experience Strategy', Users, [], 'apideveloperexperiencestrategy'),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — SYSTEM ARCHITECTURE',
    topics: [
      createTopic('API Fundamentals', BookOpen, [], 'apiapifundamentals'),
      createTopic('Tech Stack Selection', Layers, [], 'apitechstackselection'),
      createTopic('Database Architecture', Database, [{name: 'Read Replica Patterns', url: 'https://aws.amazon.com/rds/features/read-replicas/'}], 'apidatabasearchitecture'),
      createTopic('Authentication Architecture', Lock, [], 'apiauthenticationarchitecture'),
      createTopic('Authorization Architecture', Shield, [], 'apiauthorizationarchitecture'),
      createTopic('API Gateway', Network, [], 'apiapigateway'),
      createTopic('Routing', Share2, [], 'apirouting'),
      createTopic('API Keys', KeyRound, [], 'apiapikeys'),
      createTopic('OAuth', Key, [{name: 'OAuth 2.0 Docs', url: 'https://oauth.net/2/'}], 'apioauth'),
      createTopic('JWT', Shield, [], 'apijwt'),
      createTopic('Service Accounts', Users, [], 'apiserviceaccounts'),
      createTopic('Billing Architecture', DollarSign, [{name: 'Stripe Metered Billing', url: 'https://stripe.com/docs/billing/subscriptions/metered-billing'}], 'apibillingarchitecture'),
      createTopic('Usage Tracking', BarChart, [], 'apiusagetracking'),
      createTopic('Metering & Quotas', ShieldAlert, [], 'apimeteringquotas'),
      createTopic('Monitoring Architecture', Monitor, [{name: 'Datadog APM', url: 'https://www.datadoghq.com/product/apm/'}], 'apimonitoringarchitecture'),
      createTopic('Cost Estimation', DollarSign, [], 'apicostestimation'),
      createTopic('Demo App', Box, [], 'apidemoapp'),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('API Implementation', Code, [{name: 'Domain Driven Design API', url: 'https://martinfowler.com/tags/domain%20driven%20design.html'}], 'apiapiimplementation'),
      createTopic('Database Setup', Database, [{name: 'Prisma ORM', url: 'https://www.prisma.io/'}], 'apidatabasesetup'),
      createTopic('Authentication Implementation', Lock, [{name: 'Clerk Auth', url: 'https://clerk.com/'}], 'apiauthenticationimplementation'),
      createTopic('Authorization Implementation', Shield, [], 'apiauthorizationimplementation'),
      createTopic('API Keys Management', KeyRound, [], 'apiapikeysmanagement'),
      createTopic('Rate Limiting', Activity, [{name: 'Upstash Ratelimit', url: 'https://upstash.com/docs/redis/features/ratelimit'}], 'apiratelimiting'),
      createTopic('Background Jobs', Settings, [{name: 'BullMQ', url: 'https://docs.bullmq.io/'}], 'apibackgroundjobs'),
      createTopic('Queues', Layers, [], 'apiqueues'),
      createTopic('Webhooks', Share2, [{name: 'Svix (Webhook as a Service)', url: 'https://www.svix.com/'}], 'apiwebhooks'),
      createTopic('SDK Development', Code, [{name: 'Speakeasy (SDK Gen)', url: 'https://www.speakeasyapi.dev/'}], 'apisdkdevelopment'),
      createTopic('Testing', CheckSquare, [], 'apitesting'),
      createTopic('CRUD Endpoints', Database, [], 'apicrudendpoints'),
      createTopic('Error Handling', AlertCircle, [], 'apierrorhandling'),
      createTopic('Documentation', BookOpen, [{name: 'Mintlify', url: 'https://mintlify.com/'}], 'apidocumentation'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name: 'OWASP API Top 10', url: 'https://owasp.org/www-project-api-security/'}], 'apisecurity'),
      createTopic('Performance Optimization', Zap, [], 'apiperformanceoptimization'),
      createTopic('Caching', Database, [], 'apicaching'),
      createTopic('Monitoring & Logging', Monitor, [{name: 'Datadog', url: 'https://www.datadoghq.com/'}], 'apimonitoringlogging'),
      createTopic('Error Tracking', AlertCircle, [{name: 'Sentry', url: 'https://sentry.io/'}], 'apierrortracking'),
      createTopic('Abuse Prevention', ShieldAlert, [], 'apiabuseprevention'),
      createTopic('DDoS Protection', Shield, [], 'apiddosprotection'),
      createTopic('Load Testing', Activity, [], 'apiloadtesting'),
      createTopic('CI/CD', Rocket, [{name: 'Zero Downtime Deploys (Blue/Green)', url: 'https://martinfowler.com/bliki/BlueGreenDeployment.html'}], 'apicicd'),
      createTopic('Backup Strategy', Cloud, [], 'apibackupstrategy'),
      createTopic('Disaster Recovery', ShieldAlert, [], 'apidisasterrecovery'),
      createTopic('Scalability Planning', TrendingUp, [], 'apiscalabilityplanning'),
      createTopic('API Testing', CheckSquare, [], 'apiapitesting'),
      createTopic('Deployment Checklist', CheckSquare, [], 'apideploymentchecklist'),
    ]
  },
  {
    id: 'phase-5-developer-experience',
    name: 'PHASE 5 — DEVELOPER EXPERIENCE',
    topics: [
      createTopic('API Documentation', BookOpen, [{name: 'ReadMe', url: 'https://readme.com/'}], 'apiapidocumentation'),
      createTopic('OpenAPI Specification', FileText, [{name: 'Swagger Editor', url: 'https://editor.swagger.io/'}], 'apiopenapispecification'),
      createTopic('Postman Collection', Box, [{name: 'Postman Docs', url: 'https://learning.postman.com/docs/getting-started/introduction/'}], 'apipostmancollection'),
      createTopic('Interactive Playground', Play, [], 'apiinteractiveplayground'),
      createTopic('SDKs', Code, [], 'apisdks'),
      createTopic('Example Requests', Share2, [], 'apiexamplerequests'),
      createTopic('Example Responses', Share2, [], 'apiexampleresponses'),
      createTopic('Quick Start Guide', Rocket, [], 'apiquickstartguide'),
      createTopic('Changelog', List, [], 'apichangelog'),
      createTopic('Status Page', Activity, [], 'apistatuspage'),
    ]
  },
  {
    id: 'phase-6-launch',
    name: 'PHASE 6 — LAUNCH & GROWTH',
    topics: [
      createTopic('Beta Program', Target, [], 'apibetaprogram'),
      createTopic('Analytics', BarChart, [], 'apianalytics'),
      createTopic('Usage Monitoring', Monitor, [], 'apiusagemonitoring'),
      createTopic('Customer Feedback', MessageSquare, [], 'apicustomerfeedback'),
      createTopic('Pricing Evolution', DollarSign, [], 'apipricingevolution'),
      createTopic('Feature Requests', List, [], 'apifeaturerequests'),
      createTopic('Roadmap', TrendingUp, [], 'apiroadmap'),
      createTopic('Presentation Prep', Presentation, [], 'apipresentationprep'),
      createTopic('Pitch Deck', Presentation, [], 'apipitchdeck'),
      createTopic('Demo Script', CheckSquare, [], 'apidemoscript'),
      createTopic('Submission Checklist', CheckSquare, [], 'apisubmissionchecklist'),
    ]
  }
];

const filterTaxonomy = (keep: string[], hide: string[]) => {
  return apiMasterTaxonomy.map(cat => {
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

export const apiHackathonTaxonomy: Category[] = filterTaxonomy(
  [
    'Welcome', 'Problem Definition', 'API Purpose', 'Target Developers', 'MVP Scope',
    'API Resources', 'Endpoint Planning', 'Request Design', 'Response Design', 'Authentication Strategy', 'API Documentation Strategy',
    'Tech Stack Selection', 'Database Architecture', 'API Fundamentals', 'Routing', 'Demo App',
    'API Implementation', 'Authentication Implementation', 'Database Setup', 'CRUD Endpoints', 'Testing', 'Error Handling',
    'Security', 'Performance Optimization', 'Rate Limiting', 'API Testing', 'Deployment Checklist',
    'Quick Start Guide', 'Postman Collection', 'Example Requests', 'Example Responses',
    'Presentation Prep', 'Pitch Deck', 'Demo Script', 'Submission Checklist'
  ],
  []
);

export const apiPersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Developer Experience Strategy', 'Metering & Quotas', 'Abuse Prevention', 'DDoS Protection', 
    'Disaster Recovery', 'Scalability Planning', 'Demo App', 'CRUD Endpoints', 'Error Handling',
    'API Testing', 'Deployment Checklist'
  ]
);

export const apiProductionTaxonomy: Category[] = filterTaxonomy(
  [],
  ['Demo App', 'CRUD Endpoints', 'Error Handling', 'API Testing', 'Deployment Checklist']
);

export const apiCustomTaxonomy = apiProductionTaxonomy;
