import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Server, Cloud, Activity, Zap, Search, ShieldAlert,
  Target, BarChart, DollarSign, PenTool, Lock,
  UserCheck, MessageSquare, TrendingUp, AlertCircle, List,
  Layout, PanelRight, MessageCircle, Link, KeyRound, MonitorSmartphone, Code, MousePointerClick
, Presentation , HelpCircle } from 'lucide-react';
import { type Category, createTopic } from './types';

export const extensionProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — DISCOVERY & VALIDATION',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Idea Definition', Rocket, [{name:'Chrome Extensions Docs',url:'https://developer.chrome.com/docs/extensions'},{name:'Manifest V3 Overview',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'}], 'extideadefinition'),
      createTopic('Problem Statement', AlertCircle, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'},{name:'YC RFS',url:'https://www.ycombinator.com/rfs'}], 'extproblemstatement'),
      createTopic('Competitor Analysis', BarChart, [{name:'Chrome Web Store',url:'https://chromewebstore.google.com/'}], 'extcompetitoranalysis'),
      createTopic('Feature Planning', CheckSquare, [{name:'Extension UI Architecture',url:'https://developer.chrome.com/docs/extensions/develop/ui'}], 'extfeatureplanning'),
      createTopic('MVP Features', Target, [{name:'Manifest V3 Architecture',url:'https://developer.chrome.com/docs/extensions/mv3/architecture-overview/'}], 'extmvpfeatures'),
      createTopic('Future Features', TrendingUp, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'extfuturefeatures'),
      createTopic('Monetization', DollarSign, [{name:'ExtensionPay',url:'https://extensionpay.com/'},{name:'Stripe Checkout',url:'https://stripe.com/docs/payments/checkout'}], 'extmonetization'),
      createTopic('Success Metrics', BarChart, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'extsuccessmetrics'),
      createTopic('User Workflow Analysis', Activity, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'extuserworkflowanalysis'),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name:'Declare Permissions',url:'https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions'}], 'extprd'),
      createTopic('User Flows', Layers, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'extuserflows'),
      createTopic('Wireframes', Box, [{name:'Popup Size Limits',url:'https://developer.chrome.com/docs/extensions/reference/api/browserAction#popup'}], 'extwireframes'),
      createTopic('Design System', PenTool, [{name:'Shadow DOM',url:'https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM'},{name:'Tw-ind (Tailwind in Shadow DOM)',url:'https://github.com/tw-in-js/twind'}], 'extdesignsystem'),
      createTopic('Accessibility', UserCheck, [{name:'Figma',url:'https://www.figma.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Radix UI Accessibility',url:'https://www.radix-ui.com/'}], 'extaccessibility'),
      createTopic('Error States', AlertCircle, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'exterrorstates'),
      createTopic('Loading States', Zap, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'extloadingstates'),
      createTopic('Extension UX', Layout, [{name:'Side Panel API',url:'https://developer.chrome.com/docs/extensions/reference/api/sidePanel'}], 'extextensionux'),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — EXTENSION ARCHITECTURE',
    topics: [
      createTopic('API Design', Link, [{name:'Cross-Origin Network Requests',url:'https://developer.chrome.com/docs/extensions/develop/concepts/network-requests'}], 'extapidesign'),
      createTopic('Authentication', Lock, [{name:'chrome.identity API',url:'https://developer.chrome.com/docs/extensions/reference/api/identity'},{name:'Supabase Auth in Extensions',url:'https://supabase.com/docs/guides/auth/auth-helpers/browser-extension'}], 'extauthentication'),
      createTopic('Cost Estimation', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'},{name:'RevenueCat (Mobile)',url:'https://www.revenuecat.com/'}], 'extcostestimation'),
      createTopic('Extension Fundamentals', BookOpen, [{name:'Migrating to Manifest V3',url:'https://developer.chrome.com/docs/extensions/develop/migrate'}], 'extextensionfundamentals'),
      createTopic('Platform Selection', Globe, [{name:'CRXJS Vite Plugin',url:'https://crxjs.dev/vite-plugin'},{name:'Plasmo Framework',url:'https://docs.plasmo.com/'}], 'extplatformselection'),
      createTopic('Architecture Design', Server, [{name:'webext-bridge',url:'https://github.com/serverless-dns/webext-bridge'},{name:'Extension Architecture Overview',url:'https://developer.chrome.com/docs/extensions/mv3/architecture-overview/'}], 'extarchitecturedesign'),
      createTopic('Popup UI', Layout, [{name:'Extension UI Architecture',url:'https://developer.chrome.com/docs/extensions/develop/ui'}], 'extpopupui'),
      createTopic('Side Panel', PanelRight, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extsidepanel'),
      createTopic('Context Menus', MousePointerClick, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extcontextmenus'),
      createTopic('Content Scripts', Code, [{name:'Content Scripts',url:'https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts'},{name:'MutationObserver',url:'https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver'}], 'extcontentscripts'),
      createTopic('Background Logic', Settings, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'extbackgroundlogic'),
      createTopic('Service Workers', Activity, [{name:'Service Worker Lifecycle',url:'https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle'},{name:'Offscreen API',url:'https://developer.chrome.com/docs/extensions/reference/api/offscreen'}], 'extserviceworkers'),
      createTopic('Storage Strategy', Database, [{name:'chrome.storage API',url:'https://developer.chrome.com/docs/extensions/reference/api/storage'}], 'extstoragestrategy'),
      createTopic('Messaging System', MessageCircle, [{name:'Message Passing',url:'https://developer.chrome.com/docs/extensions/develop/concepts/messaging'}], 'extmessagingsystem'),
      createTopic('Data Storage', Database, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'extdatastorage'),
      createTopic('Sync Storage', Cloud, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'},{name:'Drizzle ORM',url:'https://orm.drizzle.team/'},{name:'SQLite',url:'https://www.sqlite.org/'}], 'extsyncstorage'),
      createTopic('OAuth', KeyRound, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'extoauth'),
      createTopic('AI Features', Zap, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'extaifeatures'),
      createTopic('LLM Integration', Zap, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extllmintegration'),
      createTopic('Context Collection', FileText, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extcontextcollection'),
      createTopic('Page Analysis', Search, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extpageanalysis'),
      createTopic('Summarization', FileText, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extsummarization'),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Auth', Lock, [{name:'chrome.identity API',url:'https://developer.chrome.com/docs/extensions/reference/api/identity'},{name:'Supabase Auth in Extensions',url:'https://supabase.com/docs/guides/auth/auth-helpers/browser-extension'}], 'extauth'),
      createTopic('Backend', Server, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'extbackend'),
      createTopic('APIs', Link, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'extapis'),
      createTopic('Analytics', BarChart, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'extanalytics'),
      createTopic('Testing', CheckSquare, [{name:'Playwright',url:'https://playwright.dev/'},{name:'Jest',url:'https://jestjs.io/'},{name:'TestFlight',url:'https://developer.apple.com/testflight/'}], 'exttesting'),
      createTopic('Manifest Configuration', Settings, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extmanifestconfiguration'),
      createTopic('Popup UI Design', Layout, [{name:'Extension UI Architecture',url:'https://developer.chrome.com/docs/extensions/develop/ui'}], 'extpopupuidesign'),
      createTopic('Content Scripts Logic', Code, [{name:'Content Scripts Overview',url:'https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts'}], 'extcontentscriptslogic'),
      createTopic('Background Service Worker', Settings, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'extbackgroundserviceworker'),
      createTopic('Messaging Architecture', MessageCircle, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extmessagingarchitecture'),
      createTopic('Storage', Database, [{name:'chrome.storage API',url:'https://developer.chrome.com/docs/extensions/reference/api/storage'},{name:'Dexie.js (IndexedDB)',url:'https://dexie.org/'}], 'extstorage'),
      createTopic('AI Integration', Zap, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extaiintegration'),
      createTopic('Settings Page', Settings, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extsettingspage'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name:'Content Security Policy (CSP)',url:'https://developer.chrome.com/docs/extensions/develop/concepts/content-security-policy'}], 'extsecurity'),
      createTopic('Performance Optimization', Zap, [{name:'chrome.scripting (Dynamic Injection)',url:'https://developer.chrome.com/docs/extensions/reference/api/scripting'}], 'extperformanceoptimization'),
      createTopic('Monitoring', Activity, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'extmonitoring'),
      createTopic('Error Tracking', AlertCircle, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'exterrortracking'),
      createTopic('Rate Limiting', Activity, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extratelimiting'),
      createTopic('Caching', Database, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extcaching'),
      createTopic('CI/CD', Rocket, [{name:'chrome-webstore-upload-cli',url:'https://github.com/DrewML/chrome-webstore-upload-cli'}], 'extcicd'),
      createTopic('Permission Auditing', ShieldAlert, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extpermissionauditing'),
      createTopic('Privacy Review', ShieldAlert, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extprivacyreview'),
      createTopic('Extension Size Optimization', Layers, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extextensionsizeoptimization'),
    ]
  },
  {
    id: 'phase-5-deployment',
    name: 'PHASE 5 — STORE DEPLOYMENT',
    topics: [
      createTopic('Screenshots', MonitorSmartphone, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extscreenshots'),
      createTopic('Privacy Policy', Shield, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extprivacypolicy'),
      createTopic('Terms of Service', FileText, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'exttermsofservice'),
      createTopic('Chrome Web Store Setup', Globe, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'extchromewebstoresetup'),
      createTopic('Edge Add-ons Store', Globe, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'extedgeaddonsstore'),
      createTopic('Firefox Add-ons', Globe, [{name:'webextension-polyfill',url:'https://github.com/mozilla/webextension-polyfill'},{name:'Firefox MV3 Differences',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension'}], 'extfirefoxaddons'),
      createTopic('Listing Optimization', TrendingUp, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extlistingoptimization'),
      createTopic('Store Submission', Rocket, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'extstoresubmission'),
      createTopic('Review Process', Search, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extreviewprocess'),
      createTopic('Launch Checklist', CheckSquare, [{name:'Vercel',url:'https://vercel.com/'},{name:'GitHub Actions',url:'https://github.com/features/actions'},{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'extlaunchchecklist'),
    ]
  },
  {
    id: 'phase-6-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Extension Analytics', BarChart, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'extextensionanalytics'),
      createTopic('User Feedback', MessageSquare, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'extuserfeedback'),
      createTopic('Scaling Strategy', TrendingUp, [{name:'Chrome Ext MV3',url:'https://developer.chrome.com/docs/extensions/mv3/intro/'},{name:'MDN WebExtensions',url:'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions'}], 'extscalingstrategy'),
      createTopic('Store Reviews', Target, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'extstorereviews'),
      createTopic('Feature Requests', List, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'extfeaturerequests'),
      createTopic('SEO', Search, [{name:'Ahrefs SEO',url:'https://ahrefs.com/'},{name:'Discord Community',url:'https://discord.com/developers'}], 'extseo'),
      createTopic('Monetization Expansion', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'},{name:'RevenueCat (Mobile)',url:'https://www.revenuecat.com/'}], 'extmonetizationexpansion'),
      createTopic('Presentation Prep', Presentation),
      createTopic('Pitch Deck', Presentation),
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
    'Welcome',
    'Idea Definition', 'MVP Features', 'PRD', 'User Flows', 'Manifest Configuration', 
    'Popup UI', 'Popup UI Design', 'Content Scripts', 'Content Scripts Logic', 'APIs', 'AI Integration', 'Demo Data', 
    'Pitch Deck', 'Demo Script', 'Submission Checklist',
    // Mapping requested terms to taxonomy items where they might not perfectly match
    'Manifest Setup', 'Demo Dataset'
  , 'Presentation Prep'],
  [
    'Monitoring', 'CI/CD', 'Privacy Review', 'Store Optimization', 'Analytics', 'Extension Analytics', 
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
