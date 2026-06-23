import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Server, Cloud, Activity, Zap, Search, ShieldAlert,
  Target, BarChart, DollarSign, PenTool, Lock,
  UserCheck, MessageSquare, TrendingUp, AlertCircle, List,
  Layout, PanelRight, MessageCircle, Link, KeyRound, MonitorSmartphone, Code, MousePointerClick
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const extensionProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — DISCOVERY & VALIDATION',
    topics: [
      createTopic('Idea Definition', Rocket),
      createTopic('Problem Statement', AlertCircle),
      createTopic('Competitor Analysis', BarChart),
      createTopic('Feature Planning', CheckSquare),
      createTopic('MVP Features', Target),
      createTopic('Future Features', TrendingUp),
      createTopic('Monetization', DollarSign),
      createTopic('Success Metrics', BarChart),
      createTopic('User Workflow Analysis', Activity),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText),
      createTopic('User Flows', Layers),
      createTopic('Wireframes', Box),
      createTopic('Design System', PenTool),
      createTopic('Accessibility', UserCheck),
      createTopic('Error States', AlertCircle),
      createTopic('Loading States', Zap),
      createTopic('Extension UX', Layout),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — EXTENSION ARCHITECTURE',
    topics: [
      createTopic('API Design', Link),
      createTopic('Authentication', Lock),
      createTopic('Cost Estimation', DollarSign),
      createTopic('Extension Fundamentals', BookOpen),
      createTopic('Platform Selection', Globe),
      createTopic('Architecture Design', Server),
      createTopic('Popup UI', Layout),
      createTopic('Side Panel', PanelRight),
      createTopic('Context Menus', MousePointerClick),
      createTopic('Content Scripts', Code),
      createTopic('Background Logic', Settings),
      createTopic('Service Workers', Activity),
      createTopic('Storage Strategy', Database),
      createTopic('Messaging System', MessageCircle),
      createTopic('Data Storage', Database),
      createTopic('Sync Storage', Cloud),
      createTopic('OAuth', KeyRound),
      createTopic('AI Features', Zap),
      createTopic('LLM Integration', Zap),
      createTopic('Context Collection', FileText),
      createTopic('Page Analysis', Search),
      createTopic('Summarization', FileText),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Auth', Lock),
      createTopic('Backend', Server),
      createTopic('APIs', Link),
      createTopic('Analytics', BarChart),
      createTopic('Testing', CheckSquare),
      createTopic('Manifest Configuration', Settings),
      createTopic('Popup UI', Layout),
      createTopic('Content Scripts', Code),
      createTopic('Background Service Worker', Settings),
      createTopic('Messaging System', MessageCircle),
      createTopic('Storage', Database),
      createTopic('AI Integration', Zap),
      createTopic('Settings Page', Settings),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield),
      createTopic('Performance Optimization', Zap),
      createTopic('Monitoring', Activity),
      createTopic('Error Tracking', AlertCircle),
      createTopic('Rate Limiting', Activity),
      createTopic('Caching', Database),
      createTopic('CI/CD', Rocket),
      createTopic('Permission Auditing', ShieldAlert),
      createTopic('Privacy Review', ShieldAlert),
      createTopic('Extension Size Optimization', Layers),
    ]
  },
  {
    id: 'phase-5-deployment',
    name: 'PHASE 5 — STORE DEPLOYMENT',
    topics: [
      createTopic('Screenshots', MonitorSmartphone),
      createTopic('Privacy Policy', Shield),
      createTopic('Terms of Service', FileText),
      createTopic('Chrome Web Store Setup', Globe),
      createTopic('Edge Add-ons Store', Globe),
      createTopic('Firefox Add-ons', Globe),
      createTopic('Listing Optimization', TrendingUp),
      createTopic('Store Submission', Rocket),
      createTopic('Review Process', Search),
      createTopic('Launch Checklist', CheckSquare),
    ]
  },
  {
    id: 'phase-6-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Analytics', BarChart),
      createTopic('User Feedback', MessageSquare),
      createTopic('Scaling Strategy', TrendingUp),
      createTopic('Store Reviews', Target),
      createTopic('Feature Requests', List),
      createTopic('SEO', Search),
      createTopic('Monetization Expansion', DollarSign),
    ]
  }
];

const filterTaxonomy = (keep: string[], hide: string[]) => {
  return extensionProductionTaxonomy.map(cat => {
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

export const extensionHackathonTaxonomy: Category[] = filterTaxonomy(
  [
    'Idea Definition', 'MVP Features', 'PRD', 'User Flows', 'Manifest Configuration', 
    'Popup UI', 'Content Scripts', 'APIs', 'AI Integration', 'Demo Data', 
    'Pitch Deck', 'Demo Script', 'Submission Checklist',
    // Mapping requested terms to taxonomy items where they might not perfectly match
    'Manifest Setup', 'Demo Dataset'
  ],
  [
    'Monitoring', 'CI/CD', 'Privacy Review', 'Store Optimization', 'Analytics', 
    'Advanced Security', 'Listing Optimization', 'Security'
  ]
);

export const extensionPersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Enterprise Monitoring', 'Advanced Security Reviews', 'Cross Browser Complexity',
    'Cross Browser', 'Monitoring', 'CI/CD', 'Scaling Strategy', 'Monetization Expansion'
  ]
);

export const extensionCustomTaxonomy = extensionProductionTaxonomy;
