import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Server, Cloud, Cpu, Activity, Zap, Search, Key, ShieldAlert,
  Target, Users, Briefcase, BarChart, DollarSign, PenTool, Lock,
  Bell, HelpCircle, UserCheck, MessageSquare, TrendingUp, Presentation, Play, AlertCircle, Mail, List
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const saasProductionTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 — DISCOVERY & VALIDATION',
    topics: [
      createTopic('Idea Definition', Rocket),
      createTopic('Problem Statement', AlertCircle),
      createTopic('Solution Statement', CheckSquare),
      createTopic('Value Proposition', Target),
      createTopic('Elevator Pitch', Presentation),
      createTopic('Target Users', Users),
      createTopic('ICP (Ideal Customer Profile)', UserCheck),
      createTopic('Personas', Users),
      createTopic('User Pain Points', AlertCircle),
      createTopic('Market Research', Globe),
      createTopic('Competitor Analysis', BarChart),
      createTopic('Existing Alternatives', Layers),
      createTopic('Market Positioning', Target),
      createTopic('Feature Planning', CheckSquare),
      createTopic('MVP Features', Rocket),
      createTopic('Future Features', Play),
      createTopic('Feature Prioritization', List),
      createTopic('Business Model', Briefcase),
      createTopic('Pricing', DollarSign),
      createTopic('Subscription Model', DollarSign),
      createTopic('Revenue Streams', DollarSign),
      createTopic('Success Metrics', Activity),
      createTopic('KPIs', BarChart),
      createTopic('North Star Metric', Target),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText),
      createTopic('User Flows', Globe),
      createTopic('Information Architecture', Layers),
      createTopic('Wireframes', Box),
      createTopic('Design System', PenTool),
      createTopic('Branding', Target),
      createTopic('Accessibility', UserCheck),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — SYSTEM ARCHITECTURE',
    topics: [
      createTopic('Tech Stack Selection', Settings),
      createTopic('Frontend Architecture', Box),
      createTopic('Backend Architecture', Server),
      createTopic('Database Schema', Database),
      createTopic('API Design', Globe),
      createTopic('Authentication', Key),
      createTopic('Authorization & Roles', Shield),
      createTopic('File Storage', Cloud),
      createTopic('Third Party Integrations', Layers),
      createTopic('AI Architecture (optional)', Cpu),
      createTopic('System Architecture Diagram', Globe),
      createTopic('Cost Estimation', DollarSign),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Frontend', Box),
      createTopic('Backend', Server),
      createTopic('Database', Database),
      createTopic('Auth', Key),
      createTopic('Payments', DollarSign),
      createTopic('Emails', Mail),
      createTopic('Notifications', Bell),
      createTopic('Search', Search),
      createTopic('Analytics', BarChart),
      createTopic('Admin Panel', Shield),
      createTopic('Integrations', Layers),
      createTopic('Testing', CheckSquare),
      createTopic('Documentation', BookOpen),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', ShieldAlert),
      createTopic('Monitoring', Activity),
      createTopic('Logging', FileText),
      createTopic('Error Tracking', AlertCircle),
      createTopic('Rate Limiting', Activity),
      createTopic('Caching', Zap),
      createTopic('Backups', Database),
      createTopic('Disaster Recovery', ShieldAlert),
      createTopic('CI/CD', Layers),
      createTopic('Infrastructure', Server),
      createTopic('Performance Optimization', Zap),
      createTopic('Scalability Planning', TrendingUp),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5 — LAUNCH',
    topics: [
      createTopic('Beta Testing', CheckSquare),
      createTopic('Launch Checklist', CheckSquare),
      createTopic('SEO', Search),
      createTopic('Analytics Setup', BarChart),
      createTopic('Legal Documents', FileText),
      createTopic('Terms of Service', FileText),
      createTopic('Privacy Policy', Lock),
      createTopic('Cookie Policy', FileText),
      createTopic('Customer Support', HelpCircle),
    ]
  },
  {
    id: 'phase-6',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('User Feedback', MessageSquare),
      createTopic('Retention', Users),
      createTopic('Marketing', Globe),
      createTopic('Referral Systems', Users),
      createTopic('Feature Roadmap', Globe),
      createTopic('Technical Debt', AlertCircle),
      createTopic('Scaling Strategy', TrendingUp),
    ]
  }
];

export const saasHackathonTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0',
    topics: [
      createTopic('Idea Definition', Rocket),
      createTopic('MVP Features', CheckSquare),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1',
    topics: [
      createTopic('PRD', FileText),
      createTopic('User Flows', Globe),
      createTopic('Design System', PenTool),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2',
    topics: [
      createTopic('Tech Stack Selection', Settings),
      createTopic('Database Schema', Database),
      createTopic('Auth (Optional)', Key),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3',
    topics: [
      createTopic('Frontend', Box),
      createTopic('Backend', Server),
      createTopic('Database', Database),
      createTopic('Demo Data', Database),
      createTopic('Presentation Prep', Presentation),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5',
    topics: [
      createTopic('Pitch Deck', Presentation),
      createTopic('Demo Script', FileText),
      createTopic('Submission Checklist', CheckSquare),
    ]
  }
];

export const saasPersonalTaxonomy: Category[] = [
  {
    id: 'discovery',
    name: 'PHASE 1 — DISCOVERY',
    topics: [
      createTopic('Idea', Rocket),
      createTopic('Features', CheckSquare),
      createTopic('Personas', Users),
    ]
  },
  {
    id: 'product',
    name: 'PHASE 2 — PRODUCT',
    topics: [
      createTopic('PRD', FileText),
      createTopic('Design', PenTool),
      createTopic('Flows', Globe),
    ]
  },
  {
    id: 'architecture',
    name: 'PHASE 3 — ARCHITECTURE',
    topics: [
      createTopic('Tech Stack', Settings),
      createTopic('Database', Database),
      createTopic('Auth', Key),
      createTopic('APIs', Globe),
      createTopic('Storage', Cloud),
    ]
  },
  {
    id: 'development',
    name: 'PHASE 4 — DEVELOPMENT',
    topics: [
      createTopic('Frontend', Box),
      createTopic('Backend', Server),
      createTopic('Database', Database),
      createTopic('Emails', Mail),
      createTopic('Analytics', BarChart),
    ]
  },
  {
    id: 'production-lite',
    name: 'PHASE 5 — PRODUCTION LITE',
    topics: [
      createTopic('Security Basics', Shield),
      createTopic('Backups', Database),
      createTopic('Performance', Zap),
      createTopic('Deployment', Cloud),
    ]
  },
  {
    id: 'growth-lite',
    name: 'PHASE 6 — GROWTH LITE',
    topics: [
      createTopic('SEO', Search),
      createTopic('Feedback', MessageSquare),
      createTopic('Roadmap', Globe),
    ]
  }
];

export const saasCustomTaxonomy: Category[] = [
  ...saasProductionTaxonomy.map(cat => {
    if (cat.id === 'phase-3') {
      return {
        ...cat,
        topics: [
          ...cat.topics,
          createTopic('Demo Data', Database),
          createTopic('Presentation Prep', Presentation)
        ]
      };
    }
    if (cat.id === 'phase-6') {
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
