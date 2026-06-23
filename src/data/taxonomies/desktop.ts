import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Server, Cloud, Activity, Zap, HelpCircle, Link, Users,
  Target, BarChart, DollarSign, PenTool, Lock,
  UserCheck, MessageSquare, TrendingUp, AlertCircle, List,
  Layout, Monitor, Terminal, Laptop, Cpu, HardDrive, RefreshCw, Key, ShieldCheck, Download
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const desktopProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — DISCOVERY & VALIDATION',
    topics: [
      createTopic('Idea Definition', Rocket),
      createTopic('Problem Statement', AlertCircle),
      createTopic('Target Users', UserCheck),
      createTopic('User Workflow Analysis', Activity),
      createTopic('Competitor Analysis', BarChart),
      createTopic('Feature Planning', CheckSquare),
      createTopic('MVP Features', Target),
      createTopic('Future Features', TrendingUp),
      createTopic('Monetization', DollarSign),
      createTopic('Success Metrics', BarChart),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText),
      createTopic('User Flows', Layers),
      createTopic('Desktop UX', Layout),
      createTopic('Information Architecture', Box),
      createTopic('Wireframes', Layout),
      createTopic('Design System', PenTool),
      createTopic('Accessibility', UserCheck),
      createTopic('Error States', AlertCircle),
      createTopic('Loading States', Zap),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — DESKTOP ARCHITECTURE',
    topics: [
      createTopic('Desktop vs Web Decision', HelpCircle),
      createTopic('Desktop Fundamentals', BookOpen),
      createTopic('Framework Selection', Server),
      createTopic('Platform Strategy', Globe),
      createTopic('Architecture Design', Layers),
      createTopic('UI Layer', Layout),
      createTopic('Business Logic', Settings),
      createTopic('Storage Layer', Database),
      createTopic('Services', Activity),
      createTopic('Native Integrations', Cpu),
      createTopic('Local Data Storage', HardDrive),
      createTopic('Cloud Sync', Cloud),
      createTopic('Authentication', Lock),
      createTopic('Update Strategy', RefreshCw),
      createTopic('AI Integration', Zap),
      createTopic('Cost Estimation', DollarSign),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('UI Development', Layout),
      createTopic('State Management', Database),
      createTopic('Local Storage', HardDrive),
      createTopic('File System Operations', FileText),
      createTopic('Background Services', Settings),
      createTopic('Native Integrations', Cpu),
      createTopic('APIs', Link),
      createTopic('Auth', Lock),
      createTopic('Cloud Sync', Cloud),
      createTopic('Notifications', MessageSquare),
      createTopic('AI Features', Zap),
      createTopic('Settings System', Settings),
      createTopic('Testing', CheckSquare),
      createTopic('Documentation', BookOpen),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield),
      createTopic('File System Security', ShieldCheck),
      createTopic('Credential Storage', Key),
      createTopic('Code Signing', Shield),
      createTopic('Crash Reporting', AlertCircle),
      createTopic('Monitoring', Activity),
      createTopic('Logging', FileText),
      createTopic('Performance Optimization', Zap),
      createTopic('Memory Optimization', Cpu),
      createTopic('Auto Updates', RefreshCw),
      createTopic('CI/CD', Rocket),
      createTopic('Packaging', Box),
      createTopic('Scalability', TrendingUp),
    ]
  },
  {
    id: 'phase-5-distribution',
    name: 'PHASE 5 — DISTRIBUTION',
    topics: [
      createTopic('Installer Creation', Download),
      createTopic('Windows Packaging', Monitor),
      createTopic('macOS Packaging', Laptop),
      createTopic('Linux Packaging', Terminal),
      createTopic('Code Signing', Shield),
      createTopic('Release Strategy', Rocket),
      createTopic('Documentation', BookOpen),
      createTopic('Launch Checklist', CheckSquare),
      createTopic('Beta Testing', Target),
    ]
  },
  {
    id: 'phase-6-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('User Feedback', MessageSquare),
      createTopic('Analytics', BarChart),
      createTopic('Feature Requests', List),
      createTopic('Community Building', Users),
      createTopic('Plugin Ecosystem', Box),
      createTopic('Roadmap', TrendingUp),
    ]
  }
];

const filterTaxonomy = (keep: string[], hide: string[]) => {
  return desktopProductionTaxonomy.map(cat => {
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

export const desktopHackathonTaxonomy: Category[] = filterTaxonomy(
  [
    'Idea Definition', 'MVP Features', 'PRD', 'User Flows', 'Framework Selection', 
    'Local Storage', 'UI Development', 'Core Features', 'Packaging', 
    'Demo Script', 'Pitch Deck', 'Submission Checklist'
  ],
  [
    'Code Signing', 'Auto Updates', 'Monitoring', 'Crash Reporting', 'Analytics', 'Scalability'
  ]
);

export const desktopPersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Enterprise Security', 'Advanced Monitoring', 'Multi-platform Complexity',
    'Monitoring', 'Crash Reporting', 'Scalability', 'Linux Packaging', 'CI/CD'
  ]
);

export const desktopCustomTaxonomy = desktopProductionTaxonomy;
