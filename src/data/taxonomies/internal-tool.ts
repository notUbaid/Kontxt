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
      createTopic('Problem Definition', AlertCircle),
      createTopic('Current Workflow Analysis', Activity),
      createTopic('Existing Pain Points', ShieldAlert),
      createTopic('Stakeholder Mapping', Users),
      createTopic('Success Metrics', TrendingUp),
      createTopic('Requirements Gathering', CheckSquare),
      createTopic('Feature Prioritization', List),
      createTopic('MVP Scope', Target),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('Business Process Mapping', Workflow),
      createTopic('PRD', FileText),
      createTopic('User Roles', Key),
      createTopic('User Flows', Layers),
      createTopic('Dashboard Design', LayoutDashboard),
      createTopic('Data Flow Design', Network),
      createTopic('Wireframes', Box),
      createTopic('Design System', Settings),
      createTopic('Accessibility', UserCheck),
      createTopic('Error States', AlertCircle),
      createTopic('Loading States', Zap),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — SYSTEM ARCHITECTURE',
    topics: [
      createTopic('Internal Tool Fundamentals', BookOpen),
      createTopic('Tech Stack Selection', Layers),
      createTopic('Database Schema', Database),
      createTopic('Authentication', Lock),
      createTopic('Authorization (RBAC)', Shield),
      createTopic('Workflow Engine', Settings),
      createTopic('Integrations', Share2),
      createTopic('Reporting Architecture', BarChart),
      createTopic('Cost Estimation', DollarSign),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Frontend', Code),
      createTopic('Backend', Server),
      createTopic('Database', DatabaseZap),
      createTopic('Authentication', Lock),
      createTopic('Authorization', Shield),
      createTopic('CRUD Operations', Database),
      createTopic('Workflow Automation', Activity),
      createTopic('Notifications', MessageSquare),
      createTopic('Reporting', BarChart),
      createTopic('File Uploads', Cloud),
      createTopic('Search', Search),
      createTopic('Admin Panel', Settings),
      createTopic('Audit Logs', FileSignature),
      createTopic('Testing', CheckSquare),
      createTopic('Documentation', BookOpen),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield),
      createTopic('RBAC Validation', KeyRound),
      createTopic('Audit Logs', FileText),
      createTopic('Monitoring', Monitor),
      createTopic('Logging', List),
      createTopic('Error Tracking', AlertCircle),
      createTopic('Backups', Database),
      createTopic('Disaster Recovery', ShieldAlert),
      createTopic('Performance Optimization', Zap),
      createTopic('CI/CD', Rocket),
      createTopic('Infrastructure', Cloud),
      createTopic('Scalability', TrendingUp),
    ]
  },
  {
    id: 'phase-5-deployment',
    name: 'PHASE 5 — DEPLOYMENT',
    topics: [
      createTopic('Hosting', Cloud),
      createTopic('Domain Setup', Globe),
      createTopic('Employee Onboarding', Users),
      createTopic('Documentation', BookOpen),
      createTopic('Training Materials', FileText),
      createTopic('Beta Rollout', Target),
      createTopic('Launch Checklist', ListChecks),
    ]
  },
  {
    id: 'phase-6-operations',
    name: 'PHASE 6 — OPERATIONS & IMPROVEMENT',
    topics: [
      createTopic('User Feedback', MessageSquare),
      createTopic('Feature Requests', List),
      createTopic('Process Improvements', Activity),
      createTopic('Analytics', BarChart),
      createTopic('Usage Tracking', Target),
      createTopic('Technical Debt', AlertCircle),
      createTopic('Roadmap', TrendingUp),
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
