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
      createTopic('Idea Definition', Rocket, [], 'dtideadefinition'),
      createTopic('Problem Statement', AlertCircle, [], 'dtproblemstatement'),
      createTopic('Target Users', UserCheck, [], 'dttargetusers'),
      createTopic('Competitor Analysis', BarChart, [], 'dtcompetitoranalysis'),
      createTopic('Feature Planning', CheckSquare, [], 'dtfeatureplanning'),
      createTopic('MVP Features', Target, [], 'dtmvpfeatures'),
      createTopic('Future Features', TrendingUp, [], 'dtfuturefeatures'),
      createTopic('Monetization', DollarSign, [], 'dtmonetization'),
      createTopic('Success Metrics', BarChart, [], 'dtsuccessmetrics'),
      createTopic('User Workflow Analysis', Activity, [], 'dtuserworkflowanalysis'),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [], 'dtprd'),
      createTopic('User Flows', Layers, [], 'dtuserflows'),
      createTopic('Information Architecture', Box, [], 'dtinformationarchitecture'),
      createTopic('Wireframes', Layout, [], 'dtwireframes'),
      createTopic('Design System', PenTool, [], 'dtdesignsystem'),
      createTopic('Accessibility', UserCheck, [], 'dtaccessibility'),
      createTopic('Error States', AlertCircle, [], 'dterrorstates'),
      createTopic('Loading States', Zap, [], 'dtloadingstates'),
      createTopic('Desktop UX', Layout, [], 'dtdesktopux'),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — DESKTOP ARCHITECTURE',
    topics: [
      createTopic('Platform Strategy', Globe, [], 'dtplatformstrategy'),
      createTopic('Authentication', Lock, [], 'dtauthentication'),
      createTopic('Cost Estimation', DollarSign, [], 'dtcostestimation'),
      createTopic('Desktop vs Web Decision', HelpCircle, [], 'dtdesktopvswebdecision'),
      createTopic('Desktop Fundamentals', BookOpen, [], 'dtdesktopfundamentals'),
      createTopic('Framework Selection', Server, [], 'dtframeworkselection'),
      createTopic('Architecture Design', Layers, [], 'dtarchitecturedesign'),
      createTopic('UI Layer', Layout, [], 'dtuilayer'),
      createTopic('Business Logic', Settings, [], 'dtbusinesslogic'),
      createTopic('Storage Layer', Database, [], 'dtstoragelayer'),
      createTopic('Services', Activity, [], 'dtservices'),
      createTopic('Native Integrations', Cpu, [], 'dtnativeintegrations'),
      createTopic('Local Data Storage', HardDrive, [], 'dtlocaldatastorage'),
      createTopic('Cloud Sync', Cloud, [], 'dtcloudsync'),
      createTopic('Update Strategy', RefreshCw, [], 'dtupdatestrategy'),
      createTopic('AI Integration', Zap, [], 'dtaiintegration'),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('State Management', Database, [], 'dtstatemanagement'),
      createTopic('Local Storage', HardDrive, [], 'dtlocalstorage'),
      createTopic('Auth', Lock, [], 'dtauth'),
      createTopic('APIs', Link, [], 'dtapis'),
      createTopic('Notifications', MessageSquare, [], 'dtnotifications'),
      createTopic('Testing', CheckSquare, [], 'dttesting'),
      createTopic('Documentation', BookOpen, [], 'dtdocumentation'),
      createTopic('UI Development', Layout, [], 'dtuidevelopment'),
      createTopic('File System Operations', FileText, [], 'dtfilesystemoperations'),
      createTopic('Background Services', Settings, [], 'dtbackgroundservices'),
      createTopic('Native Integrations', Cpu, [], 'dtnativeintegrations'),
      createTopic('Cloud Sync', Cloud, [], 'dtcloudsync'),
      createTopic('AI Features', Zap, [], 'dtaifeatures'),
      createTopic('Settings System', Settings, [], 'dtsettingssystem'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [], 'dtsecurity'),
      createTopic('Performance Optimization', Zap, [], 'dtperformanceoptimization'),
      createTopic('Crash Reporting', AlertCircle, [], 'dtcrashreporting'),
      createTopic('Monitoring', Activity, [], 'dtmonitoring'),
      createTopic('Logging', FileText, [], 'dtlogging'),
      createTopic('CI/CD', Rocket, [], 'dtcicd'),
      createTopic('Scalability', TrendingUp, [], 'dtscalability'),
      createTopic('File System Security', ShieldCheck, [], 'dtfilesystemsecurity'),
      createTopic('Credential Storage', Key, [], 'dtcredentialstorage'),
      createTopic('Code Signing', Shield, [], 'dtcodesigning'),
      createTopic('Memory Optimization', Cpu, [], 'dtmemoryoptimization'),
      createTopic('Auto Updates', RefreshCw, [], 'dtautoupdates'),
      createTopic('Packaging', Box, [], 'dtpackaging'),
    ]
  },
  {
    id: 'phase-5-distribution',
    name: 'PHASE 5 — DISTRIBUTION',
    topics: [
      createTopic('Documentation', BookOpen, [], 'dtdocumentation'),
      createTopic('Beta Testing', Target, [], 'dtbetatesting'),
      createTopic('Installer Creation', Download, [], 'dtinstallercreation'),
      createTopic('Windows Packaging', Monitor, [], 'dtwindowspackaging'),
      createTopic('macOS Packaging', Laptop, [], 'dtmacospackaging'),
      createTopic('Linux Packaging', Terminal, [], 'dtlinuxpackaging'),
      createTopic('Code Signing', Shield, [], 'dtcodesigning'),
      createTopic('Release Strategy', Rocket, [], 'dtreleasestrategy'),
      createTopic('Launch Checklist', CheckSquare, [], 'dtlaunchchecklist'),
    ]
  },
  {
    id: 'phase-6-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Analytics', BarChart, [], 'dtanalytics'),
      createTopic('User Feedback', MessageSquare, [], 'dtuserfeedback'),
      createTopic('Roadmap', TrendingUp, [], 'dtroadmap'),
      createTopic('Feature Requests', List, [], 'dtfeaturerequests'),
      createTopic('Community Building', Users, [], 'dtcommunitybuilding'),
      createTopic('Plugin Ecosystem', Box, [], 'dtpluginecosystem'),
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
