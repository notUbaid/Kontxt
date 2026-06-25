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
      createTopic('Idea Definition', Rocket, [{name:'Why build Desktop Apps?',url:'https://electronjs.org/docs/latest/tutorial/why-electron'}], 'dtideadefinition'),
      createTopic('Problem Statement', AlertCircle, [], 'dtproblemstatement'),
      createTopic('Target Users', UserCheck, [], 'dttargetusers'),
      createTopic('Competitor Analysis', BarChart, [{name:'Electron App Showcase',url:'https://www.electronjs.org/apps'},{name:'Tauri Showcase',url:'https://tauri.app/showcase'}], 'dtcompetitoranalysis'),
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
      createTopic('Platform Strategy', Globe, [{name:'Tauri vs Electron',url:'https://tauri.app/v1/references/architecture/inter-process-communication/'},{name:'React Native for Windows',url:'https://microsoft.github.io/react-native-windows/'}], 'dtplatformstrategy'),
      createTopic('Authentication', Lock, [{name:'OAuth with Custom URI',url:'https://electronjs.org/docs/latest/tutorial/launch-app-from-url-in-another-app'}], 'dtauthentication'),
      createTopic('Cost Estimation', DollarSign, [], 'dtcostestimation'),
      createTopic('Desktop vs Web Decision', HelpCircle, [], 'dtdesktopvswebdecision'),
      createTopic('Desktop Fundamentals', BookOpen, [{name:'Electron IPC Tutorial',url:'https://www.electronjs.org/docs/latest/tutorial/ipc'},{name:'Tauri IPC',url:'https://tauri.app/v1/guides/architecture/inter-process-communication'}], 'dtdesktopfundamentals'),
      createTopic('Framework Selection', Server, [{name:'Tauri Framework',url:'https://tauri.app/'},{name:'Electron',url:'https://www.electronjs.org/'}], 'dtframeworkselection'),
      createTopic('Architecture Design', Layers, [], 'dtarchitecturedesign'),
      createTopic('UI Layer', Layout, [{name:'Frameless Windows (Electron)',url:'https://www.electronjs.org/docs/latest/tutorial/window-customization'},{name:'Mac OS UI Component Library',url:'https://react-mac-os-ui.vercel.app/'}], 'dtuilayer'),
      createTopic('Business Logic', Settings, [], 'dtbusinesslogic'),
      createTopic('Storage Layer', Database, [{name:'Tauri Plugin Store',url:'https://github.com/tauri-apps/plugins-workspace/tree/v1/plugins/store'},{name:'SQLite in Electron',url:'https://www.sqlite.org/index.html'}], 'dtstoragelayer'),
      createTopic('Services', Activity, [], 'dtservices'),
      createTopic('Native Integrations', Cpu, [], 'dtnativeintegrations'),
      createTopic('Local Data Storage', HardDrive, [{name:'App Data Paths (Electron)',url:'https://www.electronjs.org/docs/latest/api/app#appgetpathname'}], 'dtlocaldatastorage'),
      createTopic('Cloud Sync', Cloud, [{name:'PowerSync',url:'https://www.powersync.com/'},{name:'ElectricSQL',url:'https://electric-sql.com/'}], 'dtcloudsync'),
      createTopic('Update Strategy', RefreshCw, [{name:'Electron AutoUpdater',url:'https://www.electron.build/auto-update'},{name:'Tauri Updater',url:'https://tauri.app/v1/guides/distribution/updater'}], 'dtupdatestrategy'),
      createTopic('AI Integration', Zap, [{name:'Ollama (Local LLMs)',url:'https://ollama.com/'},{name:'Transformers.js',url:'https://huggingface.co/docs/transformers.js/index'}], 'dtaiintegration'),
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
      createTopic('UI Development', Layout, [{name:'Tailwind CSS',url:'https://tailwindcss.com/docs'}], 'dtuidevelopment'),
      createTopic('File System Operations', FileText, [], 'dtfilesystemoperations'),
      createTopic('Background Services', Settings, [], 'dtbackgroundservices'),
      createTopic('Native Integrations', Cpu, [], 'dtnativeintegrations'),
      createTopic('Cloud Sync', Cloud, [{name:'PowerSync',url:'https://www.powersync.com/'},{name:'ElectricSQL',url:'https://electric-sql.com/'}], 'dtcloudsync'),
      createTopic('AI Features', Zap, [{name:'Ollama (Local LLMs)',url:'https://ollama.com/'},{name:'Transformers.js',url:'https://huggingface.co/docs/transformers.js/index'}], 'dtaifeatures'),
      createTopic('Settings System', Settings, [], 'dtsettingssystem'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name:'Electron Security Checklist',url:'https://www.electronjs.org/docs/latest/tutorial/security'},{name:'Tauri Security',url:'https://tauri.app/v1/guides/architecture/security'}], 'dtsecurity'),
      createTopic('Performance Optimization', Zap, [], 'dtperformanceoptimization'),
      createTopic('Crash Reporting', AlertCircle, [{name:'Sentry for Electron',url:'https://docs.sentry.io/platforms/javascript/guides/electron/'}], 'dtcrashreporting'),
      createTopic('Monitoring', Activity, [], 'dtmonitoring'),
      createTopic('Logging', FileText, [], 'dtlogging'),
      createTopic('CI/CD', Rocket, [{name:'Electron Builder GitHub Actions',url:'https://www.electron.build/auto-update#github'}], 'dtcicd'),
      createTopic('Scalability', TrendingUp, [], 'dtscalability'),
      createTopic('File System Security', ShieldCheck, [{name:'SQLCipher',url:'https://www.zetetic.net/sqlcipher/'}], 'dtfilesystemsecurity'),
      createTopic('Credential Storage', Key, [{name:'Node Keytar',url:'https://github.com/atom/node-keytar'},{name:'Tauri Stronghold',url:'https://tauri.app/v1/guides/architecture/stronghold/'}], 'dtcredentialstorage'),
      createTopic('Code Signing', Shield, [{name:'macOS Notarization',url:'https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution'},{name:'Windows EV Certificates',url:'https://www.digicert.com/signing/code-signing-certificates'}], 'dtcodesigning'),
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
      createTopic('Windows Packaging', Monitor, [{name:'Windows SmartScreen Info',url:'https://learn.microsoft.com/en-us/windows/security/operating-system-security/virus-and-threat-protection/microsoft-defender-smartscreen/'}], 'dtwindowspackaging'),
      createTopic('macOS Packaging', Laptop, [{name:'Apple Developer ID',url:'https://developer.apple.com/programs/'}], 'dtmacospackaging'),
      createTopic('Linux Packaging', Terminal, [], 'dtlinuxpackaging'),
      createTopic('Code Signing', Shield, [{name:'macOS Notarization',url:'https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution'},{name:'Windows EV Certificates',url:'https://www.digicert.com/signing/code-signing-certificates'}], 'dtcodesigning'),
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
      createTopic('Plugin Ecosystem', Box, [{name:'Figma Plugin Sandboxing',url:'https://www.figma.com/blog/how-we-built-the-figma-plugin-system/'}], 'dtpluginecosystem'),
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
