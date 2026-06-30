import { 
  FileText, Database, Settings, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Cloud, Activity, Zap, Search, Key, ShieldAlert,
  Target, Users, BarChart, DollarSign, Lock,
  UserCheck, MessageSquare, TrendingUp, AlertCircle, List, Play, Monitor, Headphones, Terminal, KeyRound, Share2, Network, Code, RefreshCcw
, Presentation , HelpCircle } from 'lucide-react';
import { type Category, createTopic } from './types';

export const apiProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — DISCOVERY & VALIDATION',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('ICP (Ideal Customer Profile)', UserCheck, [{name: 'Lenny: Defining ICP', url: 'https://www.lennysnewsletter.com/p/finding-your-ideal-customer-profile'}, {name: 'Stripe Press: Developer Audience', url: 'https://press.stripe.com/'}], 'apiicpidealcustomerprofile'),
      createTopic('Competitor Analysis', BarChart, [{name: 'API Tracker', url: 'https://www.apitracker.io/'}, {name: 'Twilio API Design', url: 'https://www.twilio.com/docs/api'}], 'apicompetitoranalysis'),
      createTopic('Feature Planning', CheckSquare, [{name: 'API First Design', url: 'https://swagger.io/resources/articles/adopting-an-api-first-approach/'}, {name: 'Narrow API Strategy', url: 'https://blog.jimmybogard.com/2016/01/21/vertical-slice-test-architecture/'}], 'apifeatureplanning'),
      createTopic('Success Metrics', TrendingUp, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apisuccessmetrics'),
      createTopic('Problem Definition', AlertCircle, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'},{name:'YC RFS',url:'https://www.ycombinator.com/rfs'}], 'apiproblemdefinition'),
      createTopic('API Use Case', Target, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiapiusecase'),
      createTopic('Target Developers', Users, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apitargetdevelopers'),
      createTopic('Monetization Model', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'}], 'apimonetizationmodel'),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — API DESIGN',
    topics: [
      createTopic('Use Cases', CheckSquare, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiusecases'),
      createTopic('PRD', FileText, [{name: 'Reforge: API Product Management', url: 'https://www.reforge.com/'}, {name: 'Postman: API First PRD', url: 'https://blog.postman.com/api-first/'}], 'apiprd'),
      createTopic('API Resources', Database, [{name: 'RESTful API Naming', url: 'https://restfulapi.net/resource-naming/'}, {name: 'Microsoft REST Guidelines', url: 'https://github.com/microsoft/api-guidelines'}], 'apiapiresources'),
      createTopic('Endpoint Planning', Network, [{name: 'Stripe Pagination Pattern', url: 'https://stripe.com/docs/api/pagination'}, {name: 'Slack Cursor Pagination', url: 'https://api.slack.com/docs/pagination'}], 'apiendpointplanning'),
      createTopic('Request Design', Share2, [], 'apirequestdesign'),
      createTopic('Response Design', Share2, [], 'apiresponsedesign'),
      createTopic('Error Design', AlertCircle, [{name: 'RFC 7807 (Problem Details)', url: 'https://datatracker.ietf.org/doc/html/rfc7807'}, {name: 'Twilio Error Dictionary', url: 'https://www.twilio.com/docs/api/errors'}], 'apierrordesign'),
      createTopic('API Standards', BookOpen, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiapistandards'),
      createTopic('Versioning Strategy', Layers, [{name:'Upstash Ratelimit',url:'https://upstash.com/docs/redis/features/ratelimit'}], 'apiversioningstrategy'),
      createTopic('Rate Limiting Strategy', Activity, [{name: 'Redis Token Bucket', url: 'https://redis.com/glossary/rate-limiting/'}, {name: 'Cloudflare Rate Limiting', url: 'https://developers.cloudflare.com/waf/rate-limiting-rules/'}], 'apiratelimitingstrategy'),
      createTopic('Authentication Strategy', Lock, [{name: 'GitHub Secret Scanning', url: 'https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning'}, {name: 'API Key Best Practices', url: 'https://cloud.google.com/docs/authentication/api-keys'}], 'apiauthenticationstrategy'),
      createTopic('Authorization Strategy', Shield, [{name:'OAuth 2.0 Docs',url:'https://oauth.net/2/'},{name:'Clerk Auth',url:'https://clerk.com/'}], 'apiauthorizationstrategy'),
      createTopic('SDK Strategy', Code, [{name: 'Speakeasy (SDK Gen)', url: 'https://www.speakeasyapi.dev/'}, {name: 'Fern (API to SDK)', url: 'https://buildwithfern.com/'}], 'apisdkstrategy'),
      createTopic('API Documentation Strategy', FileText, [{name:'Upstash Ratelimit',url:'https://upstash.com/docs/redis/features/ratelimit'}], 'apiapidocumentationstrategy'),
    ]
  },
  {
    id: 'developer-experience',
    name: 'DEVELOPER EXPERIENCE (DX)',
    topics: [
      createTopic('Discovery', Search, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apidiscovery'),
      createTopic('Integration', Code, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiintegration'),
      createTopic('Debugging', Terminal, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'apidebugging'),
      createTopic('Upgrading', RefreshCcw, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiupgrading'),
      createTopic('Issue Reporting', AlertCircle, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiissuereporting'),
      createTopic('Support', Headphones, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apisupport'),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — SYSTEM ARCHITECTURE',
    topics: [
      createTopic('Tech Stack Selection', Layers, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apitechstackselection'),
      createTopic('Authentication', Lock, [{name:'OAuth 2.0 Docs',url:'https://oauth.net/2/'},{name:'Clerk Auth',url:'https://clerk.com/'}], 'apiauthentication'),
      createTopic('Cost Estimation', DollarSign, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apicostestimation'),
      createTopic('API Fundamentals', BookOpen, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiapifundamentals'),
      createTopic('Database Architecture', Database, [{name: 'PgBouncer (Connection Pooling)', url: 'https://www.pgbouncer.org/'}, {name: 'Read Replica Patterns', url: 'https://aws.amazon.com/rds/features/read-replicas/'}], 'apidatabasearchitecture'),
      createTopic('API Gateway', Network, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiapigateway'),
      createTopic('Routing', Share2, [], 'apirouting'),
      createTopic('Rate Limits', Activity, [{name:'Upstash Ratelimit',url:'https://upstash.com/docs/redis/features/ratelimit'}], 'apiratelimits'),
      createTopic('API Keys', KeyRound, [{name:'OAuth 2.0 Docs',url:'https://oauth.net/2/'},{name:'Clerk Auth',url:'https://clerk.com/'}], 'apiapikeys'),
      createTopic('OAuth', Key, [{name:'OAuth 2.0 Docs',url:'https://oauth.net/2/'},{name:'Clerk Auth',url:'https://clerk.com/'}], 'apioauth'),
      createTopic('JWT', Shield, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apijwt'),
      createTopic('Service Accounts', Users, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiserviceaccounts'),
      createTopic('Billing Architecture', DollarSign, [{name: 'Stripe Metered Billing', url: 'https://stripe.com/docs/billing/subscriptions/metered-billing'}, {name: 'Lago (Open Source Billing)', url: 'https://www.getlago.com/'}], 'apibillingarchitecture'),
      createTopic('Usage Tracking', BarChart, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiusagetracking'),
      createTopic('Metering', Activity, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apimetering'),
      createTopic('Quotas', ShieldAlert, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiquotas'),
      createTopic('Subscriptions', DollarSign, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apisubscriptions'),
      createTopic('Monitoring Architecture', Monitor, [{name: 'Datadog APM', url: 'https://www.datadoghq.com/product/apm/'}, {name: 'OpenTelemetry', url: 'https://opentelemetry.io/'}], 'apimonitoringarchitecture'),
      createTopic('Logs', FileText, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'apilogs'),
      createTopic('Metrics', BarChart, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apimetrics'),
      createTopic('Tracing', Search, [{name:'Vercel',url:'https://vercel.com/'},{name:'AWS API Gateway',url:'https://aws.amazon.com/api-gateway/'}], 'apitracing'),
        createTopic('MVP Features', Zap, [], 'apimvpfeatures'),
        createTopic('Auth', Zap, [], 'apiauth'),
        createTopic('Demo App', Box, [], 'apidemoapp'),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Auth Implementation', Lock, [{name:'OAuth 2.0 Docs',url:'https://oauth.net/2/'},{name:'Clerk Auth',url:'https://clerk.com/'}], 'apiauthimplementation'),
      createTopic('Database', Database, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'}], 'apidatabase'),
      createTopic('Testing', CheckSquare, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apitesting'),
      createTopic('Documentation', BookOpen, [{name:'Mintlify',url:'https://mintlify.com/'},{name:'ReadMe',url:'https://readme.com/'}], 'apidocumentation'),
      createTopic('Rate Limiting', Activity, [{name:'Upstash Ratelimit',url:'https://upstash.com/docs/redis/features/ratelimit'}], 'apiratelimitingstrategy'),
      createTopic('API Implementation', Code, [{name: 'Hexagonal Architecture', url: 'https://alistair.cockburn.us/hexagonal-architecture/'}, {name: 'Domain Driven Design API', url: 'https://martinfowler.com/tags/domain%20driven%20design.html'}], 'apiapiimplementation'),
      createTopic('Authorization', Shield, [{name:'OAuth 2.0 Docs',url:'https://oauth.net/2/'},{name:'Clerk Auth',url:'https://clerk.com/'}], 'apiauthorization'),
      createTopic('API Keys Management', KeyRound, [{name:'OAuth 2.0 Docs',url:'https://oauth.net/2/'},{name:'Clerk Auth',url:'https://clerk.com/'}], 'apiapikeysmanagement'),
      createTopic('Billing', DollarSign, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apibilling'),
      createTopic('Webhooks', Share2, [{name: 'Svix (Webhook as a Service)', url: 'https://www.svix.com/'}, {name: 'Stripe Webhook Signatures', url: 'https://stripe.com/docs/webhooks/signatures'}], 'apiwebhooks'),
      createTopic('Background Jobs', Settings, [{name: 'Temporal.io', url: 'https://temporal.io/'}, {name: 'BullMQ', url: 'https://docs.bullmq.io/'}], 'apibackgroundjobs'),
      createTopic('Queues', Layers, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiqueues'),
      createTopic('SDK Development', Code, [{name:'Speakeasy (SDK Gen)',url:'https://www.speakeasyapi.dev/'}], 'apisdkdevelopment'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name: 'OWASP API Top 10', url: 'https://owasp.org/www-project-api-security/'}, {name: 'Snyk API Security Scanner', url: 'https://snyk.io/'}], 'apisecurity'),
      createTopic('Performance Optimization', Zap, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'}], 'apiperformanceoptimization'),
      createTopic('Monitoring', Monitor, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'apimonitoring'),
      createTopic('Logging', FileText, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'apilogging'),
      createTopic('Error Tracking', AlertCircle, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'apierrortracking'),
      createTopic('Rate Limiting Implementation', Activity, [{name:'Upstash Ratelimit',url:'https://upstash.com/docs/redis/features/ratelimit'}], 'apiratelimiting'),
      createTopic('Caching', Database, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apicaching'),
      createTopic('CI/CD', Rocket, [{name: 'Zero Downtime Deploys (Blue/Green)', url: 'https://martinfowler.com/bliki/BlueGreenDeployment.html'}, {name: 'Graceful Shutdown Node.js', url: 'https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html'}], 'apicicd'),
      createTopic('Abuse Prevention', ShieldAlert, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiabuseprevention'),
      createTopic('DDoS Protection', Shield, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiddosprotection'),
      createTopic('Load Testing', Activity, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiloadtesting'),
      createTopic('Backup Strategy', Cloud, [{name:'Upstash Ratelimit',url:'https://upstash.com/docs/redis/features/ratelimit'}], 'apibackupstrategy'),
      createTopic('Disaster Recovery', ShieldAlert, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apidisasterrecovery'),
      createTopic('Scalability Planning', TrendingUp, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiscalabilityplanning'),
    ]
  },
  {
    id: 'phase-5-dx-assets',
    name: 'PHASE 5 — DEVELOPER EXPERIENCE ASSETS',
    topics: [
      createTopic('API Documentation', BookOpen, [{name: 'Mintlify', url: 'https://mintlify.com/'}, {name: 'ReadMe', url: 'https://readme.com/'}], 'apiapidocumentation'),
      createTopic('SDKs', Code, [{name:'Speakeasy (SDK Gen)',url:'https://www.speakeasyapi.dev/'}], 'apisdks'),
      createTopic('Postman Collection', Box, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apipostmancollection'),
      createTopic('OpenAPI Spec', FileText, [{name: 'Spectral (OpenAPI Linter)', url: 'https://stoplight.io/open-source/spectral'}, {name: 'Swagger Editor', url: 'https://editor.swagger.io/'}], 'apiopenapispec'),
      createTopic('Interactive Playground', Play, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiinteractiveplayground'),
      createTopic('Example Requests', Share2, [], 'apiexamplerequests'),
      createTopic('Example Responses', Share2, [], 'apiexampleresponses'),
      createTopic('Quick Start Guide', Rocket, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiquickstartguide'),
      createTopic('Changelog', List, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'apichangelog'),
      createTopic('Status Page', Activity, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apistatuspage'),
    ]
  },
  {
    id: 'phase-6-launch',
    name: 'PHASE 6 — LAUNCH & GROWTH',
    topics: [
      createTopic('Analytics', BarChart, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apianalytics'),
      createTopic('Roadmap', TrendingUp, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apiroadmap'),
      createTopic('Beta Program', Target, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apibetaprogram'),
      createTopic('Usage Monitoring', Activity, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'apiusagemonitoring'),
      createTopic('Customer Feedback', MessageSquare, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apicustomerfeedback'),
      createTopic('Pricing Evolution', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'}], 'apipricingevolution'),
      createTopic('Feature Requests', List, [{name:'OpenAPI Spec',url:'https://swagger.io/specification/'},{name:'Postman Docs',url:'https://learning.postman.com/docs/getting-started/introduction/'}], 'apifeaturerequests'),
      createTopic('Presentation Prep', Presentation),
      createTopic('Pitch Deck', Presentation),
        createTopic('Demo Script', CheckSquare, [], 'apidemoscript'),
        createTopic('Submission Checklist', CheckSquare, [], 'apisubmissionchecklist'),
    ]
  }
];

const filterTaxonomy = (keep: string[], hide: string[]) => {
  return apiProductionTaxonomy.map(cat => {
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
    'Welcome',
    'Problem Definition', 'MVP Features', 'Endpoint Planning', 'Auth', 
    'Database', 'API Implementation', 'Documentation', 'Demo App', 
    'Pitch Deck', 'Demo Script', 'Submission Checklist',
    // Aliases mapped from user prompt
    'Authentication', 'Auth Implementation', 'API Documentation'
  , 'Presentation Prep'],
  [
    'Billing', 'SDKs', 'Load Testing', 'Disaster Recovery', 'Monitoring Architecture',
    'Logs', 'Metrics', 'Tracing', 'Monitoring'
  ]
);

export const apiPersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Enterprise Scalability', 'Multi-region', 'Advanced Abuse Prevention',
    'Scalability Planning', 'DDoS Protection', 'Disaster Recovery', 'Abuse Prevention'
  ]
);

export const apiCustomTaxonomy = apiProductionTaxonomy;
