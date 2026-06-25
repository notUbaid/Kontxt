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
      createTopic('Idea Definition', Rocket, [], 'webideadefinition'),
      createTopic('Problem Statement', AlertCircle, [], 'webproblemstatement'),
      createTopic('User Journey', Globe, [], 'webuserjourney'),
      createTopic('Personas', Users, [], 'webpersonas'),
      createTopic('Solution Statement', CheckSquare, [], 'websolutionstatement'),
      createTopic('Elevator Pitch', Presentation, [], 'webelevatorpitch'),
      createTopic('Competitor Analysis', BarChart, [], 'webcompetitoranalysis'),
      createTopic('Feature Planning', CheckSquare, [], 'webfeatureplanning'),
      createTopic('MVP Features', Rocket, [], 'webmvpfeatures'),
      createTopic('Future Features', Layers, [], 'webfuturefeatures'),
      createTopic('Success Metrics', Activity, [], 'websuccessmetrics'),
      createTopic('Users & Audience', Users, [], 'webusersaudience'),
      createTopic('User Goals', Target, [], 'webusergoals'),
      createTopic('Nice-to-Have Features', Layers, [], 'webnicetohavefeatures'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — UX & PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [], 'webprd'),
      createTopic('User Flows', Globe, [], 'webuserflows'),
      createTopic('Information Architecture', Layers, [], 'webinformationarchitecture'),
      createTopic('Wireframes', Box, [], 'webwireframes'),
      createTopic('Design System', PenTool, [], 'webdesignsystem'),
      createTopic('Branding', Target, [], 'webbranding'),
      createTopic('Accessibility', Users, [], 'webaccessibility'),
      createTopic('Empty States', Box, [], 'webemptystates'),
      createTopic('Error States', AlertCircle, [], 'weberrorstates'),
      createTopic('Loading States', Activity, [], 'webloadingstates'),
      createTopic('Sitemap', Layers, [], 'websitemap'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — TECHNICAL ARCHITECTURE',
    topics: [
      createTopic('Tech Stack Selection', Settings, [], 'webtechstack'),
      createTopic('Frontend Architecture', Monitor, [], 'webfrontendarchitecture'),
      createTopic('Backend Architecture', Server, [], 'webbackendarchitecture'),
      createTopic('API Design', Globe, [], 'webapidesign'),
      createTopic('Authentication', Key, [], 'webauthentication'),
      createTopic('Database Schema', Database, [], 'webdatabaseschema'),
      createTopic('File Storage', Cloud, [], 'webfilestorage'),
      createTopic('Cost Estimation', DollarSign, [], 'webcostestimation'),
      createTopic('Web Fundamentals', BookOpen, [], 'webfundamentals'),
      createTopic('Authorization', Lock, [], 'webauthorization'),
      createTopic('Search System', Search, [], 'websearchsystem'),
      createTopic('Third-Party Integrations', Link, [], 'webthirdpartyintegrations'),
      createTopic('AI Features (Optional)', Cpu, [], 'webaifeatures'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Auth', Key),
      createTopic('Database', Database),
      createTopic('Backend', Server),
      createTopic('Frontend', Monitor),
      createTopic('APIs', Globe),
      createTopic('Notifications', Bell),
      createTopic('Search', Search),
      createTopic('Admin Panel', LayoutDashboard),
      createTopic('Integrations', Link),
      createTopic('Testing', CheckSquare),
      createTopic('Documentation', FileText),
      createTopic('Email Notifications', MessageSquare),
      createTopic('File Uploads', Cloud),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield),
      createTopic('Performance Optimization', Zap),
      createTopic('Monitoring', Activity),
      createTopic('Logging', FileText),
      createTopic('Error Tracking', AlertCircle),
      createTopic('Rate Limiting', Shield),
      createTopic('Caching', Zap),
      createTopic('Backups', Database),
      createTopic('CI/CD', Settings),
      createTopic('SEO', Search),
      createTopic('Scalability Planning', BarChart),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5 — DEPLOYMENT',
    topics: [
      createTopic('Beta Testing', Users),
      createTopic('User Feedback', MessageSquare),
      createTopic('Domain Setup', Globe),
      createTopic('Hosting', Server),
      createTopic('Analytics Setup', BarChart),
      createTopic('Legal Pages', FileText),
      createTopic('Launch Checklist', CheckSquare),
    ]
  },
  {
    id: 'phase-6',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Analytics', BarChart),
      createTopic('Scaling Strategy', BarChart),
      createTopic('SEO Optimization', Search),
      createTopic('User Retention', Users),
      createTopic('Feature Roadmap', Globe),
      createTopic('Technical Debt', Settings),
    ]
  }
];

export const webHackathonTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0',
    topics: [
      createTopic('Idea Definition', Rocket, [], 'webideadefinition'),
      createTopic('MVP Features', CheckSquare, [], 'webmvpfeatures'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1',
    topics: [
      createTopic('PRD', FileText, [], 'webprd'),
      createTopic('User Flows', Globe, [], 'webuserflows'),
      createTopic('Design System', PenTool, [], 'webdesignsystem'),
    ]
  },
      {
      id: 'phase-2',
      name: 'PHASE 2 ?" TECHNICAL ARCHITECTURE',
      topics: [
        createTopic('Tech Stack Selection', Settings, [], 'webtechstack'),
        createTopic('Database Schema', Database, [], 'webdatabaseschema'),
      ]
    },
  {
    id: 'phase-3',
    name: 'PHASE 3',
    topics: [
      createTopic('Backend', Server),
      createTopic('Frontend', Monitor),
      createTopic('Demo Data', Database),
      createTopic('Auth (Optional)', Key),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5',
    topics: [
      createTopic('Pitch Deck', Presentation),
      createTopic('Demo Script', FileText),
      createTopic('Submission Checklist', CheckSquare),
      createTopic('Hosting', Server),
    ]
  }
];

export const webPersonalTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 ?" DISCOVERY & PLANNING',
    topics: [
      createTopic('Idea Definition', Rocket, [], 'webideadefinition'),
      createTopic('MVP Features', CheckSquare, [], 'webmvpfeatures'),
    ]
  },
      {
      id: 'phase-1',
      name: 'PHASE 1 ?" UX & PRODUCT DESIGN',
      topics: [
        createTopic('PRD', FileText, [], 'webprd'),
        createTopic('User Flows', Globe, [], 'webuserflows'),
        createTopic('Design System', PenTool, [], 'webdesignsystem'),
      ]
    },
      {
      id: 'phase-2',
      name: 'PHASE 2 ?" TECHNICAL ARCHITECTURE',
      topics: [
        createTopic('Tech Stack Selection', Settings, [], 'webtechstack'),
        createTopic('Authentication', Key, [], 'webauthentication'),
        createTopic('Database Schema', Database, [], 'webdatabaseschema'),
        createTopic('API Design', Globe, [], 'webapidesign'),
        createTopic('Search System', Search, [], 'websearchsystem'),
      ]
    },
  {
    id: 'production',
    name: 'PHASE 3 — PRODUCTION',
    topics: [
      createTopic('Analytics', BarChart),
      createTopic('Hosting', Server),
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
