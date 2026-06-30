import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Server, Cloud, Activity, Zap, HelpCircle, Link, Users,
  Target, BarChart, DollarSign, PenTool, Lock,
  UserCheck, MessageSquare, TrendingUp, AlertCircle, List,
  Layout, Monitor, Terminal, Laptop, Cpu, HardDrive, RefreshCw, Key, ShieldCheck, Download
, Presentation } from 'lucide-react';
import { type Category, createTopic } from './types';

export const desktopProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — DISCOVERY & VALIDATION',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Idea Definition', Rocket, [{name:'Why build Desktop Apps?',url:'https://electronjs.org/docs/latest/tutorial/why-electron'}], 'dtideadefinition'),
      createTopic('Problem Statement', AlertCircle, [{name:'Electron Architecture',url:'https://www.electronjs.org/docs/latest/tutorial/application-architecture'}, {name:'Tauri Motivation',url:'https://tauri.app/v1/about/intro'}], 'dtproblemstatement'),
      createTopic('Target Users', UserCheck, [{name:'Windows Market Share',url:'https://gs.statcounter.com/os-market-share/desktop/worldwide'}, {name:'Apple Silicon Transition',url:'https://developer.apple.com/documentation/apple-silicon'}], 'dttargetusers'),
      createTopic('Competitor Analysis', BarChart, [{name:'Electron App Showcase',url:'https://www.electronjs.org/apps'},{name:'Tauri Showcase',url:'https://tauri.app/showcase'}], 'dtcompetitoranalysis'),
      createTopic('Feature Planning', CheckSquare, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'dtfeatureplanning'),
      createTopic('MVP Features', Target, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'dtmvpfeatures'),
      createTopic('Future Features', TrendingUp, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'dtfuturefeatures'),
      createTopic('Monetization', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'},{name:'RevenueCat (Mobile)',url:'https://www.revenuecat.com/'}], 'dtmonetization'),
      createTopic('Success Metrics', BarChart, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'dtsuccessmetrics'),
      createTopic('User Workflow Analysis', Activity, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'dtuserworkflowanalysis'),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name:'macOS Sandbox Entitlements',url:'https://developer.apple.com/documentation/security/app_sandbox'},{name:'Windows App Capabilities',url:'https://learn.microsoft.com/en-us/windows/uwp/packaging/app-capability-declarations'}], 'dtprd'),
      createTopic('User Flows', Layers, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'dtuserflows'),
      createTopic('Information Architecture', Box, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'},{name:'Excalidraw',url:'https://excalidraw.com/'}], 'dtinformationarchitecture'),
      createTopic('Wireframes', Layout, [{name:'Figma',url:'https://www.figma.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Radix UI Accessibility',url:'https://www.radix-ui.com/'}], 'dtwireframes'),
      createTopic('Design System', PenTool, [{name:'React macOS UI',url:'https://react-mac-os-ui.vercel.app/'},{name:'Fluent UI (Windows)',url:'https://react.fluentui.dev/'}], 'dtdesignsystem'),
      createTopic('Accessibility', UserCheck, [{name:'Figma',url:'https://www.figma.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Radix UI Accessibility',url:'https://www.radix-ui.com/'}], 'dtaccessibility'),
      createTopic('Error States', AlertCircle, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'dterrorstates'),
      createTopic('Loading States', Zap, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'dtloadingstates'),
      createTopic('Desktop UX', Layout, [{name:'macOS Human Interface Guidelines',url:'https://developer.apple.com/design/human-interface-guidelines/macos/overview/themes/'},{name:'Windows 11 Design',url:'https://learn.microsoft.com/en-us/windows/apps/design/'}], 'dtdesktopux'),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — DESKTOP ARCHITECTURE',
    topics: [
      createTopic('Platform Strategy', Globe, [{name:'Tauri vs Electron comparison',url:'https://gist.github.com/lucasfernog/3cebd4b9e2cde152862c93b76256f103'},{name:'Wails Framework',url:'https://wails.io/'}], 'dtplatformstrategy'),
      createTopic('Authentication', Lock, [{name:'OAuth with Custom URI',url:'https://electronjs.org/docs/latest/tutorial/launch-app-from-url-in-another-app'}], 'dtauthentication'),
      createTopic('Cost Estimation', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'},{name:'RevenueCat (Mobile)',url:'https://www.revenuecat.com/'}], 'dtcostestimation'),
      createTopic('Desktop vs Web Decision', HelpCircle, [{name:'Vercel',url:'https://vercel.com/'},{name:'GitHub Actions',url:'https://github.com/features/actions'},{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'dtdesktopvswebdecision'),
      createTopic('Desktop Fundamentals', BookOpen, [{name:'Electron IPC Tutorial',url:'https://www.electronjs.org/docs/latest/tutorial/ipc'},{name:'Tauri IPC',url:'https://tauri.app/v1/guides/architecture/inter-process-communication'}], 'dtdesktopfundamentals'),
      createTopic('Framework Selection', Server, [{name:'Tauri Framework',url:'https://tauri.app/'},{name:'Electron',url:'https://www.electronjs.org/'}], 'dtframeworkselection'),
      createTopic('Architecture Design', Layers, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'},{name:'Excalidraw',url:'https://excalidraw.com/'}], 'dtarchitecturedesign'),
      createTopic('UI Layer', Layout, [{name:'Frameless Windows (Electron)',url:'https://www.electronjs.org/docs/latest/tutorial/window-customization'},{name:'Mac OS UI Component Library',url:'https://react-mac-os-ui.vercel.app/'}], 'dtuilayer'),
      createTopic('Business Logic', Settings, [{name:'Offloading to Web Workers',url:'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers'},{name:'Node.js Child Processes',url:'https://nodejs.org/api/child_process.html'}], 'dtbusinesslogic'),
      createTopic('Storage Layer', Database, [{name:'better-sqlite3',url:'https://github.com/WiseLibs/better-sqlite3'},{name:'Prisma with SQLite',url:'https://www.prisma.io/docs/concepts/database-connectors/sqlite'}], 'dtstoragelayer'),
      createTopic('Services', Activity, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'dtservices'),
      createTopic('Native Integrations', Cpu, [{name:'Tauri Guide',url:'https://tauri.app/v1/guides/'},{name:'Electron Docs',url:'https://www.electronjs.org/docs/latest'}], 'dtnativeintegrations'),
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
      createTopic('State Management', Database, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'dtstatemanagement'),
      createTopic('Local Storage', HardDrive, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'},{name:'Drizzle ORM',url:'https://orm.drizzle.team/'},{name:'SQLite',url:'https://www.sqlite.org/'}], 'dtlocalstorage'),
      createTopic('Auth', Lock, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'dtauth'),
      createTopic('APIs', Link, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'dtapis'),
      createTopic('Notifications', MessageSquare, [{name:'Tauri Guide',url:'https://tauri.app/v1/guides/'},{name:'Electron Docs',url:'https://www.electronjs.org/docs/latest'}], 'dtnotifications'),
      createTopic('Testing', CheckSquare, [{name:'Playwright',url:'https://playwright.dev/'},{name:'Jest',url:'https://jestjs.io/'},{name:'TestFlight',url:'https://developer.apple.com/testflight/'}], 'dttesting'),
      createTopic('Documentation', BookOpen, [{name:'macOS App Sandbox',url:'https://developer.apple.com/documentation/security/app_sandbox'},{name:'Windows Firewall rules',url:'https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/windows-defender-firewall/windows-firewall-with-advanced-security'}], 'dtdocumentation'),
      createTopic('UI Development', Layout, [{name:'Tailwind CSS',url:'https://tailwindcss.com/docs'}], 'dtuidevelopment'),
      createTopic('File System Operations', FileText, [{name:'Tauri Guide',url:'https://tauri.app/v1/guides/'},{name:'Electron Docs',url:'https://www.electronjs.org/docs/latest'}], 'dtfilesystemoperations'),
      createTopic('Background Services', Settings, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'dtbackgroundservices'),
      createTopic('Native Features', Cpu, [{name:'Tauri Guide',url:'https://tauri.app/v1/guides/'},{name:'Electron Docs',url:'https://www.electronjs.org/docs/latest'}], 'dtnativefeatures'),
      createTopic('Cloud Sync Logic', Cloud, [{name:'PowerSync',url:'https://www.powersync.com/'},{name:'ElectricSQL',url:'https://electric-sql.com/'}], 'dtcloudsynclogic'),
      createTopic('AI Features', Zap, [{name:'Ollama (Local LLMs)',url:'https://ollama.com/'},{name:'Transformers.js',url:'https://huggingface.co/docs/transformers.js/index'}], 'dtaifeatures'),
      createTopic('Settings System', Settings, [{name:'Tauri Guide',url:'https://tauri.app/v1/guides/'},{name:'Electron Docs',url:'https://www.electronjs.org/docs/latest'}], 'dtsettingssystem'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name:'Electron Security Checklist',url:'https://www.electronjs.org/docs/latest/tutorial/security'},{name:'Tauri Security Architecture',url:'https://tauri.app/v1/guides/architecture/security'}], 'dtsecurity'),
      createTopic('Performance Optimization', Zap, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'},{name:'Drizzle ORM',url:'https://orm.drizzle.team/'},{name:'SQLite',url:'https://www.sqlite.org/'}], 'dtperformanceoptimization'),
      createTopic('Crash Reporting', AlertCircle, [{name:'Sentry for Electron',url:'https://docs.sentry.io/platforms/javascript/guides/electron/'}], 'dtcrashreporting'),
      createTopic('Monitoring', Activity, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'dtmonitoring'),
      createTopic('Logging', FileText, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'dtlogging'),
      createTopic('CI/CD', Rocket, [{name:'Electron Builder GitHub Actions',url:'https://www.electron.build/auto-update#github'}], 'dtcicd'),
      createTopic('Scalability', TrendingUp, [{name:'Tauri Guide',url:'https://tauri.app/v1/guides/'},{name:'Electron Docs',url:'https://www.electronjs.org/docs/latest'}], 'dtscalability'),
      createTopic('File System Security', ShieldCheck, [{name:'SQLCipher',url:'https://www.zetetic.net/sqlcipher/'},{name:'Tauri Stronghold',url:'https://tauri.app/v1/guides/architecture/stronghold/'}], 'dtfilesystemsecurity'),
      createTopic('Credential Storage', Key, [{name:'Node Keytar',url:'https://github.com/atom/node-keytar'},{name:'Electron safeStorage',url:'https://www.electronjs.org/docs/latest/api/safe-storage'}], 'dtcredentialstorage'),
      createTopic('Code Signing', Shield, [{name:'macOS Notarization',url:'https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution'},{name:'Windows EV Certificates',url:'https://www.digicert.com/signing/code-signing-certificates'}], 'dtcodesigning'),
      createTopic('Memory Optimization', Cpu, [{name:'Tauri Guide',url:'https://tauri.app/v1/guides/'},{name:'Electron Docs',url:'https://www.electronjs.org/docs/latest'}], 'dtmemoryoptimization'),
      createTopic('Auto Updates', RefreshCw, [{name:'electron-updater',url:'https://www.electron.build/auto-update'},{name:'Tauri Updater',url:'https://tauri.app/v1/guides/distribution/updater'}], 'dtautoupdates'),
      createTopic('Packaging', Box, [{name:'electron-builder',url:'https://www.electron.build/'},{name:'NSIS vs WiX',url:'https://github.com/electron-userland/electron-builder/issues/4819'}], 'dtpackaging'),
    ]
  },
  {
    id: 'phase-5-distribution',
    name: 'PHASE 5 — DISTRIBUTION',
    topics: [
      createTopic('User Documentation', BookOpen, [{name:'macOS App Sandbox',url:'https://developer.apple.com/documentation/security/app_sandbox'},{name:'Windows Firewall rules',url:'https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/windows-defender-firewall/windows-firewall-with-advanced-security'}], 'dtuserdocumentation'),
      createTopic('Beta Testing', Target, [{name:'Playwright',url:'https://playwright.dev/'},{name:'Jest',url:'https://jestjs.io/'},{name:'TestFlight',url:'https://developer.apple.com/testflight/'}], 'dtbetatesting'),
      createTopic('Installer Creation', Download, [{name:'Tauri Guide',url:'https://tauri.app/v1/guides/'},{name:'Electron Docs',url:'https://www.electronjs.org/docs/latest'}], 'dtinstallercreation'),
      createTopic('Windows Packaging', Monitor, [{name:'Windows SmartScreen Info',url:'https://learn.microsoft.com/en-us/windows/security/operating-system-security/virus-and-threat-protection/microsoft-defender-smartscreen/'}], 'dtwindowspackaging'),
      createTopic('macOS Packaging', Laptop, [{name:'Apple Developer ID',url:'https://developer.apple.com/programs/'}], 'dtmacospackaging'),
      createTopic('Linux Packaging', Terminal, [{name:'Figma',url:'https://www.figma.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Radix UI Accessibility',url:'https://www.radix-ui.com/'}], 'dtlinuxpackaging'),
      createTopic('Code Signing Process', Shield, [{name:'macOS Notarization',url:'https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution'},{name:'Windows EV Certificates',url:'https://www.digicert.com/signing/code-signing-certificates'}], 'dtcodesigningprocess'),
      createTopic('Release Strategy', Rocket, [{name:'Vercel',url:'https://vercel.com/'},{name:'GitHub Actions',url:'https://github.com/features/actions'},{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'dtreleasestrategy'),
      createTopic('Launch Checklist', CheckSquare, [{name:'Vercel',url:'https://vercel.com/'},{name:'GitHub Actions',url:'https://github.com/features/actions'},{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'dtlaunchchecklist'),
    ]
  },
  {
    id: 'phase-6-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Analytics', BarChart, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'dtanalytics'),
      createTopic('User Feedback', MessageSquare, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'dtuserfeedback'),
      createTopic('Roadmap', TrendingUp, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'dtroadmap'),
      createTopic('Feature Requests', List, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'dtfeaturerequests'),
      createTopic('Community Building', Users, [{name:'Figma',url:'https://www.figma.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Radix UI Accessibility',url:'https://www.radix-ui.com/'}], 'dtcommunitybuilding'),
      createTopic('Plugin Ecosystem', Box, [{name:'Figma Plugin Sandboxing',url:'https://www.figma.com/blog/how-we-built-the-figma-plugin-system/'}], 'dtpluginecosystem'),
      createTopic('Presentation Prep', Presentation),
      createTopic('Pitch Deck', Presentation),
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
    'Welcome',
    'Idea Definition', 'MVP Features', 'PRD', 'User Flows', 'Framework Selection', 
    'Local Storage', 'UI Development', 'Core Features', 'Packaging', 
    'Demo Script', 'Pitch Deck', 'Submission Checklist'
  ],
  [
    'Code Signing', 'Code Signing Process', 'Auto Updates', 'Monitoring', 'Crash Reporting', 'Analytics', 'Scalability'
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
