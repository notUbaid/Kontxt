import { 
  FileText, Database, Settings, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Cloud, Activity, Zap, Search, Key, ShieldAlert,
  Target, Users, BarChart, DollarSign, Lock, ListChecks,
  UserCheck, MessageSquare, TrendingUp, AlertCircle, List, Monitor, KeyRound, Share2, Network, Code, FileSignature, LayoutDashboard, DatabaseZap, Workflow, Server, Globe
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const internalToolProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — BUSINESS PROCESS DISCOVERY',
    topics: [
      createTopic('Feature Prioritization', List, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalfeatureprioritization'),
      createTopic('Success Metrics', TrendingUp, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalsuccessmetrics'),
      createTopic('Problem Definition', AlertCircle, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'}], 'internalproblemdefinition'),
      createTopic('Current Workflow Analysis', Activity, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'}], 'internalcurrentworkflowanalysis'),
      createTopic('Existing Pain Points', ShieldAlert, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'}], 'internalexistingpainpoints'),
      createTopic('Stakeholder Mapping', Users, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalstakeholdermapping'),
      createTopic('Requirements Gathering', CheckSquare, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'}], 'internalrequirementsgathering'),
      createTopic('MVP Scope', Target, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalmvpscope'),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalprd'),
      createTopic('User Flows', Layers, [{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tremor (Dashboards)',url:'https://tremor.so/'}], 'internaluserflows'),
      createTopic('Wireframes', Box, [{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tremor (Dashboards)',url:'https://tremor.so/'}], 'internalwireframes'),
      createTopic('Design System', Settings, [{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tremor (Dashboards)',url:'https://tremor.so/'}], 'internaldesignsystem'),
      createTopic('Accessibility', UserCheck, [{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tremor (Dashboards)',url:'https://tremor.so/'}], 'internalaccessibility'),
      createTopic('Error States', AlertCircle, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog Audit Logs',url:'https://docs.datadoghq.com/account_management/audit_trail/'}], 'internalerrorstates'),
      createTopic('Loading States', Zap, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalloadingstates'),
      createTopic('Business Process Mapping', Workflow, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalbusinessprocessmapping'),
      createTopic('User Roles', Key, [{name:'Auth0 RBAC',url:'https://auth0.com/docs/manage-users/access-control/rbac'},{name:'Clerk Organizations',url:'https://clerk.com/docs/organizations/overview'}], 'internaluserroles'),
      createTopic('Dashboard Design', LayoutDashboard, [{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tremor (Dashboards)',url:'https://tremor.so/'}], 'internaldashboarddesign'),
      createTopic('Data Flow Design', Network, [{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tremor (Dashboards)',url:'https://tremor.so/'}], 'internaldataflowdesign'),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — SYSTEM ARCHITECTURE',
    topics: [
      createTopic('Tech Stack Selection', Layers, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internaltechstackselection'),
      createTopic('Authentication', Lock, [{name:'Auth0 RBAC',url:'https://auth0.com/docs/manage-users/access-control/rbac'},{name:'Clerk Organizations',url:'https://clerk.com/docs/organizations/overview'}], 'internalauthentication'),
      createTopic('Database Schema', Database, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'}], 'internaldatabaseschema'),
      createTopic('Cost Estimation', DollarSign, [{name:'AWS Pricing Calculator',url:'https://calculator.aws/'}], 'internalcostestimation'),
      createTopic('Integrations', Share2),
      createTopic('Internal Tool Fundamentals', BookOpen, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalinternaltoolfundamentals'),
      createTopic('Authorization (RBAC)', Shield, [{name:'Auth0 RBAC',url:'https://auth0.com/docs/manage-users/access-control/rbac'},{name:'Clerk Organizations',url:'https://clerk.com/docs/organizations/overview'}], 'internalauthorizationrbac'),
      createTopic('Workflow Engine', Settings, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'}], 'internalworkflowengine'),
      createTopic('Reporting Architecture', BarChart, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog Audit Logs',url:'https://docs.datadoghq.com/account_management/audit_trail/'}], 'internalreportingarchitecture'),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Authentication', Lock, [{name:'Auth0 RBAC',url:'https://auth0.com/docs/manage-users/access-control/rbac'},{name:'Clerk Organizations',url:'https://clerk.com/docs/organizations/overview'}], 'internalauthentication'),
      createTopic('Database', DatabaseZap, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'}], 'internaldatabase'),
      createTopic('Backend', Server, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalbackend'),
      createTopic('Frontend', Code, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalfrontend'),
      createTopic('Notifications', MessageSquare, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalnotifications'),
      createTopic('Search', Search, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalsearch'),
      createTopic('Admin Panel', Settings, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internaladminpanel'),
      createTopic('Testing', CheckSquare, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internaltesting'),
      createTopic('Documentation', BookOpen, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internaldocumentation'),
      createTopic('Authorization', Shield, [{name:'Auth0 RBAC',url:'https://auth0.com/docs/manage-users/access-control/rbac'},{name:'Clerk Organizations',url:'https://clerk.com/docs/organizations/overview'}], 'internalauthorization'),
      createTopic('CRUD Operations', Database, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalcrudoperations'),
      createTopic('Workflow Automation', Activity, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'}], 'internalworkflowautomation'),
      createTopic('Reporting', BarChart, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog Audit Logs',url:'https://docs.datadoghq.com/account_management/audit_trail/'}], 'internalreporting'),
      createTopic('File Uploads', Cloud, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalfileuploads'),
      createTopic('Audit Logs', FileSignature, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog Audit Logs',url:'https://docs.datadoghq.com/account_management/audit_trail/'}], 'internalauditlogs'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name:'Auth0 RBAC',url:'https://auth0.com/docs/manage-users/access-control/rbac'},{name:'Clerk Organizations',url:'https://clerk.com/docs/organizations/overview'}], 'internalsecurity'),
      createTopic('Performance Optimization', Zap, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'}], 'internalperformanceoptimization'),
      createTopic('Monitoring', Monitor, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog Audit Logs',url:'https://docs.datadoghq.com/account_management/audit_trail/'}], 'internalmonitoring'),
      createTopic('Logging', List, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog Audit Logs',url:'https://docs.datadoghq.com/account_management/audit_trail/'}], 'internallogging'),
      createTopic('Error Tracking', AlertCircle, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog Audit Logs',url:'https://docs.datadoghq.com/account_management/audit_trail/'}], 'internalerrortracking'),
      createTopic('Backups', Database, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalbackups'),
      createTopic('CI/CD', Rocket, [{name:'Vercel',url:'https://vercel.com/'},{name:'Railway',url:'https://railway.app/'}], 'internalcicd'),
      createTopic('Infrastructure', Cloud, [{name:'Vercel',url:'https://vercel.com/'},{name:'Railway',url:'https://railway.app/'}], 'internalinfrastructure'),
      createTopic('Scalability', TrendingUp, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalscalability'),
      createTopic('RBAC Validation', KeyRound, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'}], 'internalrbacvalidation'),
      createTopic('Audit Logs', FileText, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog Audit Logs',url:'https://docs.datadoghq.com/account_management/audit_trail/'}], 'internalauditlogs'),
      createTopic('Disaster Recovery', ShieldAlert, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internaldisasterrecovery'),
    ]
  },
  {
    id: 'phase-5-deployment',
    name: 'PHASE 5 — DEPLOYMENT',
    topics: [
      createTopic('Documentation', BookOpen, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internaldocumentation'),
      createTopic('Hosting', Cloud, [{name:'Vercel',url:'https://vercel.com/'},{name:'Railway',url:'https://railway.app/'}], 'internalhosting'),
      createTopic('Domain Setup', Globe, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internaldomainsetup'),
      createTopic('Employee Onboarding', Users, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalemployeeonboarding'),
      createTopic('Training Materials', FileText, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internaltrainingmaterials'),
      createTopic('Beta Rollout', Target, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalbetarollout'),
      createTopic('Launch Checklist', ListChecks, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internallaunchchecklist'),
    ]
  },
  {
    id: 'phase-6-operations',
    name: 'PHASE 6 — OPERATIONS & IMPROVEMENT',
    topics: [
      createTopic('Analytics', BarChart, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalanalytics'),
      createTopic('User Feedback', MessageSquare, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internaluserfeedback'),
      createTopic('Roadmap', TrendingUp, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalroadmap'),
      createTopic('Feature Requests', List, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalfeaturerequests'),
      createTopic('Process Improvements', Activity, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalprocessimprovements'),
      createTopic('Usage Tracking', Target, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internalusagetracking'),
      createTopic('Technical Debt', AlertCircle, [{name:'Retool Docs',url:'https://docs.retool.com/'},{name:'Appsmith',url:'https://docs.appsmith.com/'}], 'internaltechnicaldebt'),
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
