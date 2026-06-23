import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  Layers, Server, Activity, Zap, Search, Key, Target, Users, BarChart, 
  DollarSign, PenTool, MessageSquare, Presentation, AlertCircle, Map,
  CreditCard, Bell, Cloud, Monitor, BookOpen, Lock, Link, Calendar, Cpu, LayoutDashboard
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const webProductionTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 — DISCOVERY & PLANNING',
    topics: [
      createTopic('Idea Definition', Rocket),
      createTopic('Problem Statement', AlertCircle),
      createTopic('Solution Statement', CheckSquare),
      createTopic('Elevator Pitch', Presentation),
      createTopic('Users & Audience', Users),
      createTopic('Personas', Users),
      createTopic('User Goals', Target),
      createTopic('User Journey', Globe),
      createTopic('Competitor Analysis', BarChart),
      createTopic('Feature Planning', CheckSquare),
      createTopic('MVP Features', Rocket),
      createTopic('Nice-to-Have Features', Layers),
      createTopic('Future Features', Layers),
      createTopic('Success Metrics', Activity),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — UX & PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText),
      createTopic('User Flows', Globe),
      createTopic('Sitemap', Layers),
      createTopic('Information Architecture', Layers),
      createTopic('Wireframes', Box),
      createTopic('Design System', PenTool),
      createTopic('Branding', Target),
      createTopic('Accessibility', Users),
      createTopic('Empty States', Box),
      createTopic('Loading States', Activity),
      createTopic('Error States', AlertCircle),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — TECHNICAL ARCHITECTURE',
    topics: [
      createTopic('Web Fundamentals', BookOpen),
      createTopic('Tech Stack Selection', Settings),
      createTopic('Frontend Architecture', Monitor),
      createTopic('Backend Architecture', Server),
      createTopic('Database Schema', Database),
      createTopic('API Design', Globe),
      createTopic('Authentication', Key),
      createTopic('Authorization', Lock),
      createTopic('File Storage', Cloud),
      createTopic('Search System', Search),
      createTopic('Third-Party Integrations', Link),
      createTopic('AI Features (Optional)', Cpu),
      createTopic('Cost Estimation', DollarSign),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Frontend', Monitor),
      createTopic('Backend', Server),
      createTopic('Database', Database),
      createTopic('APIs', Globe),
      createTopic('Auth', Key),
      createTopic('Search', Search),
      createTopic('Email Notifications', MessageSquare),
      createTopic('Notifications', Bell),
      createTopic('File Uploads', Cloud),
      createTopic('Integrations', Link),
      createTopic('Admin Panel', LayoutDashboard),
      createTopic('Testing', CheckSquare),
      createTopic('Documentation', FileText),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield),
      createTopic('Monitoring', Activity),
      createTopic('Logging', FileText),
      createTopic('Error Tracking', AlertCircle),
      createTopic('Rate Limiting', Shield),
      createTopic('Caching', Zap),
      createTopic('Backups', Database),
      createTopic('CI/CD', Settings),
      createTopic('Performance Optimization', Zap),
      createTopic('SEO', Search),
      createTopic('Scalability Planning', BarChart),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5 — DEPLOYMENT',
    topics: [
      createTopic('Domain Setup', Globe),
      createTopic('Hosting', Server),
      createTopic('Analytics Setup', BarChart),
      createTopic('Legal Pages', FileText),
      createTopic('Launch Checklist', CheckSquare),
      createTopic('Beta Testing', Users),
      createTopic('User Feedback', MessageSquare),
    ]
  },
  {
    id: 'phase-6',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Analytics', BarChart),
      createTopic('SEO Optimization', Search),
      createTopic('User Retention', Users),
      createTopic('Feature Roadmap', Globe),
      createTopic('Technical Debt', Settings),
      createTopic('Scaling Strategy', BarChart),
    ]
  }
];

export const webHackathonTaxonomy: Category[] = [
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
      createTopic('Tech Stack', Settings),
      createTopic('Database Schema', Database),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3',
    topics: [
      createTopic('Frontend', Monitor),
      createTopic('Backend', Server),
      createTopic('Auth (Optional)', Key),
      createTopic('Demo Data', Database),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5',
    topics: [
      createTopic('Hosting', Server),
      createTopic('Pitch Deck', Presentation),
      createTopic('Demo Script', FileText),
      createTopic('Submission Checklist', CheckSquare),
    ]
  }
];

export const webPersonalTaxonomy: Category[] = [
  {
    id: 'discovery',
    name: 'PHASE 1 — DISCOVERY',
    topics: [
      createTopic('Discovery', Rocket),
      createTopic('PRD', FileText),
      createTopic('Design', PenTool),
    ]
  },
  {
    id: 'architecture',
    name: 'PHASE 2 — ARCHITECTURE',
    topics: [
      createTopic('Tech Stack', Settings),
      createTopic('Database', Database),
      createTopic('APIs', Globe),
      createTopic('Auth', Key),
      createTopic('Search', Search),
    ]
  },
  {
    id: 'production',
    name: 'PHASE 3 — PRODUCTION',
    topics: [
      createTopic('Hosting', Server),
      createTopic('Analytics', BarChart),
      createTopic('Security Basics', Shield),
      createTopic('SEO Basics', Search),
    ]
  },
  {
    id: 'growth',
    name: 'PHASE 4 — GROWTH',
    topics: [
      createTopic('Feedback', MessageSquare),
      createTopic('Roadmap', Globe),
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
          createTopic('Demo Data', Database),
          createTopic('Payments', CreditCard),
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
