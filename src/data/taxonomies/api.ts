import { 
  FileText, Database, Settings, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Cloud, Activity, Zap, Search, Key, ShieldAlert,
  Target, Users, BarChart, DollarSign, Lock,
  UserCheck, MessageSquare, TrendingUp, AlertCircle, List, Play, Monitor, Headphones, Terminal, KeyRound, Share2, Network, Code, RefreshCcw
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const apiProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — DISCOVERY & VALIDATION',
    topics: [
      createTopic('Problem Definition', AlertCircle),
      createTopic('API Use Case', Target),
      createTopic('Target Developers', Users),
      createTopic('ICP (Ideal Customer Profile)', UserCheck),
      createTopic('Competitor Analysis', BarChart),
      createTopic('Feature Planning', CheckSquare),
      createTopic('Monetization Model', DollarSign),
      createTopic('Success Metrics', TrendingUp),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — API DESIGN',
    topics: [
      createTopic('PRD', FileText),
      createTopic('Use Cases', CheckSquare),
      createTopic('API Resources', Database),
      createTopic('Endpoint Planning', Network),
      createTopic('Request Design', Share2),
      createTopic('Response Design', Share2),
      createTopic('Error Design', AlertCircle),
      createTopic('API Standards', BookOpen),
      createTopic('Versioning Strategy', Layers),
      createTopic('Rate Limiting Strategy', Activity),
      createTopic('Authentication Strategy', Lock),
      createTopic('Authorization Strategy', Shield),
      createTopic('SDK Strategy', Code),
      createTopic('API Documentation Strategy', FileText),
    ]
  },
  {
    id: 'developer-experience',
    name: 'DEVELOPER EXPERIENCE (DX)',
    topics: [
      createTopic('Discovery', Search),
      createTopic('Integration', Code),
      createTopic('Debugging', Terminal),
      createTopic('Upgrading', RefreshCcw),
      createTopic('Issue Reporting', AlertCircle),
      createTopic('Support', Headphones),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — SYSTEM ARCHITECTURE',
    topics: [
      createTopic('API Fundamentals', BookOpen),
      createTopic('Tech Stack Selection', Layers),
      createTopic('Database Architecture', Database),
      createTopic('API Gateway', Network),
      createTopic('Routing', Share2),
      createTopic('Authentication', Lock),
      createTopic('Rate Limits', Activity),
      createTopic('API Keys', KeyRound),
      createTopic('OAuth', Key),
      createTopic('JWT', Shield),
      createTopic('Service Accounts', Users),
      createTopic('Billing Architecture', DollarSign),
      createTopic('Usage Tracking', BarChart),
      createTopic('Metering', Activity),
      createTopic('Quotas', ShieldAlert),
      createTopic('Subscriptions', DollarSign),
      createTopic('Monitoring Architecture', Monitor),
      createTopic('Logs', FileText),
      createTopic('Metrics', BarChart),
      createTopic('Tracing', Search),
      createTopic('Cost Estimation', DollarSign),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('API Implementation', Code),
      createTopic('Database', Database),
      createTopic('Authentication', Lock),
      createTopic('Authorization', Shield),
      createTopic('API Keys', KeyRound),
      createTopic('Rate Limiting', Activity),
      createTopic('Billing', DollarSign),
      createTopic('Webhooks', Share2),
      createTopic('Background Jobs', Settings),
      createTopic('Queues', Layers),
      createTopic('SDK Development', Code),
      createTopic('Documentation', BookOpen),
      createTopic('Testing', CheckSquare),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield),
      createTopic('Rate Limiting', Activity),
      createTopic('Abuse Prevention', ShieldAlert),
      createTopic('DDoS Protection', Shield),
      createTopic('Monitoring', Monitor),
      createTopic('Logging', FileText),
      createTopic('Error Tracking', AlertCircle),
      createTopic('Caching', Database),
      createTopic('Performance Optimization', Zap),
      createTopic('Load Testing', Activity),
      createTopic('Backup Strategy', Cloud),
      createTopic('Disaster Recovery', ShieldAlert),
      createTopic('CI/CD', Rocket),
      createTopic('Scalability Planning', TrendingUp),
    ]
  },
  {
    id: 'phase-5-dx-assets',
    name: 'PHASE 5 — DEVELOPER EXPERIENCE ASSETS',
    topics: [
      createTopic('API Documentation', BookOpen),
      createTopic('SDKs', Code),
      createTopic('Postman Collection', Box),
      createTopic('OpenAPI Spec', FileText),
      createTopic('Interactive Playground', Play),
      createTopic('Example Requests', Share2),
      createTopic('Example Responses', Share2),
      createTopic('Quick Start Guide', Rocket),
      createTopic('Changelog', List),
      createTopic('Status Page', Activity),
    ]
  },
  {
    id: 'phase-6-launch',
    name: 'PHASE 6 — LAUNCH & GROWTH',
    topics: [
      createTopic('Beta Program', Target),
      createTopic('Analytics', BarChart),
      createTopic('Usage Monitoring', Activity),
      createTopic('Customer Feedback', MessageSquare),
      createTopic('Pricing Evolution', DollarSign),
      createTopic('Feature Requests', List),
      createTopic('Roadmap', TrendingUp),
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
    'Problem Definition', 'MVP Features', 'Endpoint Planning', 'Auth', 
    'Database', 'API Implementation', 'Documentation', 'Demo App', 
    'Pitch Deck', 'Demo Script', 'Submission Checklist',
    // Aliases mapped from user prompt
    'Authentication', 'API Documentation'
  ],
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
