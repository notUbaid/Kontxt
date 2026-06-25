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
      createTopic('Idea Definition', Rocket, [], 'extideadefinition'),
      createTopic('Problem Statement', AlertCircle, [], 'extproblemstatement'),
      createTopic('Competitor Analysis', BarChart, [], 'extcompetitoranalysis'),
      createTopic('Feature Planning', CheckSquare, [], 'extfeatureplanning'),
      createTopic('MVP Features', Target, [], 'extmvpfeatures'),
      createTopic('Future Features', TrendingUp, [], 'extfuturefeatures'),
      createTopic('Monetization', DollarSign, [], 'extmonetization'),
      createTopic('Success Metrics', BarChart, [], 'extsuccessmetrics'),
      createTopic('User Workflow Analysis', Activity, [], 'extuserworkflowanalysis'),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [], 'extprd'),
      createTopic('User Flows', Layers, [], 'extuserflows'),
      createTopic('Wireframes', Box, [], 'extwireframes'),
      createTopic('Design System', PenTool, [], 'extdesignsystem'),
      createTopic('Accessibility', UserCheck, [], 'extaccessibility'),
      createTopic('Error States', AlertCircle, [], 'exterrorstates'),
      createTopic('Loading States', Zap, [], 'extloadingstates'),
      createTopic('Extension UX', Layout, [], 'extextensionux'),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — EXTENSION ARCHITECTURE',
    topics: [
      createTopic('API Design', Link, [], 'extapidesign'),
      createTopic('Authentication', Lock, [], 'extauthentication'),
      createTopic('Cost Estimation', DollarSign, [], 'extcostestimation'),
      createTopic('Extension Fundamentals', BookOpen, [], 'extextensionfundamentals'),
      createTopic('Platform Selection', Globe, [], 'extplatformselection'),
      createTopic('Architecture Design', Server, [], 'extarchitecturedesign'),
      createTopic('Popup UI', Layout, [], 'extpopupui'),
      createTopic('Side Panel', PanelRight, [], 'extsidepanel'),
      createTopic('Context Menus', MousePointerClick, [], 'extcontextmenus'),
      createTopic('Content Scripts', Code, [], 'extcontentscripts'),
      createTopic('Background Logic', Settings, [], 'extbackgroundlogic'),
      createTopic('Service Workers', Activity, [], 'extserviceworkers'),
      createTopic('Storage Strategy', Database, [], 'extstoragestrategy'),
      createTopic('Messaging System', MessageCircle, [], 'extmessagingsystem'),
      createTopic('Data Storage', Database, [], 'extdatastorage'),
      createTopic('Sync Storage', Cloud, [], 'extsyncstorage'),
      createTopic('OAuth', KeyRound, [], 'extoauth'),
      createTopic('AI Features', Zap, [], 'extaifeatures'),
      createTopic('LLM Integration', Zap, [], 'extllmintegration'),
      createTopic('Context Collection', FileText, [], 'extcontextcollection'),
      createTopic('Page Analysis', Search, [], 'extpageanalysis'),
      createTopic('Summarization', FileText, [], 'extsummarization'),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Auth', Lock, [], 'extauth'),
      createTopic('Backend', Server, [], 'extbackend'),
      createTopic('APIs', Link, [], 'extapis'),
      createTopic('Analytics', BarChart, [], 'extanalytics'),
      createTopic('Testing', CheckSquare, [], 'exttesting'),
      createTopic('Manifest Configuration', Settings, [], 'extmanifestconfiguration'),
      createTopic('Popup UI', Layout, [], 'extpopupui'),
      createTopic('Content Scripts', Code, [], 'extcontentscripts'),
      createTopic('Background Service Worker', Settings, [], 'extbackgroundserviceworker'),
      createTopic('Messaging System', MessageCircle, [], 'extmessagingsystem'),
      createTopic('Storage', Database, [], 'extstorage'),
      createTopic('AI Integration', Zap, [], 'extaiintegration'),
      createTopic('Settings Page', Settings, [], 'extsettingspage'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [], 'extsecurity'),
      createTopic('Performance Optimization', Zap, [], 'extperformanceoptimization'),
      createTopic('Monitoring', Activity, [], 'extmonitoring'),
      createTopic('Error Tracking', AlertCircle, [], 'exterrortracking'),
      createTopic('Rate Limiting', Activity, [], 'extratelimiting'),
      createTopic('Caching', Database, [], 'extcaching'),
      createTopic('CI/CD', Rocket, [], 'extcicd'),
      createTopic('Permission Auditing', ShieldAlert, [], 'extpermissionauditing'),
      createTopic('Privacy Review', ShieldAlert, [], 'extprivacyreview'),
      createTopic('Extension Size Optimization', Layers, [], 'extextensionsizeoptimization'),
    ]
  },
  {
    id: 'phase-5-deployment',
    name: 'PHASE 5 — STORE DEPLOYMENT',
    topics: [
      createTopic('Screenshots', MonitorSmartphone, [], 'extscreenshots'),
      createTopic('Privacy Policy', Shield, [], 'extprivacypolicy'),
      createTopic('Terms of Service', FileText, [], 'exttermsofservice'),
      createTopic('Chrome Web Store Setup', Globe, [], 'extchromewebstoresetup'),
      createTopic('Edge Add-ons Store', Globe, [], 'extedgeaddonsstore'),
      createTopic('Firefox Add-ons', Globe, [], 'extfirefoxaddons'),
      createTopic('Listing Optimization', TrendingUp, [], 'extlistingoptimization'),
      createTopic('Store Submission', Rocket, [], 'extstoresubmission'),
      createTopic('Review Process', Search, [], 'extreviewprocess'),
      createTopic('Launch Checklist', CheckSquare, [], 'extlaunchchecklist'),
    ]
  },
  {
    id: 'phase-6-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Analytics', BarChart, [], 'extanalytics'),
      createTopic('User Feedback', MessageSquare, [], 'extuserfeedback'),
      createTopic('Scaling Strategy', TrendingUp, [], 'extscalingstrategy'),
      createTopic('Store Reviews', Target, [], 'extstorereviews'),
      createTopic('Feature Requests', List, [], 'extfeaturerequests'),
      createTopic('SEO', Search, [], 'extseo'),
      createTopic('Monetization Expansion', DollarSign, [], 'extmonetizationexpansion'),
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
