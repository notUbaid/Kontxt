import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  Layers, Server, Activity, Zap, Search, Key, Target, Users, BarChart, 
  DollarSign, PenTool, MessageSquare, Presentation, AlertCircle, Map, Bluetooth,
  CreditCard, Bell, Cloud, Smartphone, Battery, Watch, Lock, BookOpen
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const mobileProductionTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 — DISCOVERY & VALIDATION',
    topics: [
      createTopic('Idea Definition', Rocket, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'},{name:'YC RFS',url:'https://www.ycombinator.com/rfs'}], 'mobileideadefinition'),
      createTopic('Problem Statement', AlertCircle, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'},{name:'YC RFS',url:'https://www.ycombinator.com/rfs'}], 'mobileproblemstatement'),
      createTopic('Use Cases', Target, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileusecases'),
      createTopic('User Journey', Globe, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'mobileuserjourney'),
      createTopic('Target Audience', Users, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'mobiletargetaudience'),
      createTopic('Personas', Users, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'mobilepersonas'),
      createTopic('Solution Statement', CheckSquare, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'},{name:'YC RFS',url:'https://www.ycombinator.com/rfs'}], 'mobilesolutionstatement'),
      createTopic('Elevator Pitch', Presentation, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileelevatorpitch'),
      createTopic('Competitor Analysis', BarChart, [{name:'Similarweb',url:'https://www.similarweb.com/'},{name:'G2 Software Reviews',url:'https://www.g2.com/'}], 'mobilecompetitoranalysis'),
      createTopic('Similar Apps', Layers, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilesimilarapps'),
      createTopic('Play Store Research', Search),
      createTopic('App Store Research', Search),
      createTopic('Feature Planning', CheckSquare, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'mobilefeatureplanning'),
      createTopic('MVP Features', Rocket, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'mobilemvpfeatures'),
      createTopic('Future Features', Layers, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'mobilefuturefeatures'),
      createTopic('Feature Prioritization', BarChart, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'mobilefeatureprioritization'),
      createTopic('Monetization', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'},{name:'RevenueCat (Mobile)',url:'https://www.revenuecat.com/'}], 'mobilemonetization'),
      createTopic('Free', DollarSign, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilefree'),
      createTopic('Freemium', DollarSign, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilefreemium'),
      createTopic('Subscription', DollarSign, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilesubscription'),
      createTopic('Ads', DollarSign, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileads'),
      createTopic('One-time Purchase', DollarSign, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileonetimepurchase'),
      createTopic('Success Metrics', Activity, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'mobilesuccessmetrics'),
      createTopic('Retention', Users, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileretention'),
      createTopic('DAU', Users, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobiledau'),
      createTopic('MAU', Users, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilemau'),
      createTopic('Session Duration', Activity, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilesessionduration'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'},{name:'Excalidraw',url:'https://excalidraw.com/'}], 'mobileprd'),
      createTopic('User Flows', Globe, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'mobileuserflows'),
      createTopic('App Navigation', Smartphone, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'appnavigation'),
      createTopic('Wireframes', Box, [{name:'Figma',url:'https://www.figma.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Radix UI Accessibility',url:'https://www.radix-ui.com/'}], 'mobilewireframes'),
      createTopic('Design System', PenTool, [{name:'Figma',url:'https://www.figma.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Radix UI Accessibility',url:'https://www.radix-ui.com/'}], 'mobiledesignsystem'),
      createTopic('Branding', Target, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilebranding'),
      createTopic('Accessibility', Users, [{name:'Figma',url:'https://www.figma.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Radix UI Accessibility',url:'https://www.radix-ui.com/'}], 'mobileaccessibility'),
      createTopic('Empty States', Box, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'mobileemptystates'),
      createTopic('Error States', AlertCircle, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'mobileerrorstates'),
      createTopic('Loading States', Activity, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'mobileloadingstates'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — MOBILE ARCHITECTURE',
    topics: [
      createTopic('Platform Strategy', Smartphone, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'},{name:'Drizzle ORM',url:'https://orm.drizzle.team/'},{name:'SQLite',url:'https://www.sqlite.org/'}], 'mobileplatformstrategy'),
      createTopic('Mobile Fundamentals', BookOpen, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilefundamentals'),
      createTopic('Tech Stack Selection', Settings, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobiletechstackselection'),
      createTopic('State Management Architecture', Layers, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'},{name:'Excalidraw',url:'https://excalidraw.com/'}], 'mobilestatemanagement'),
      createTopic('API Strategy', Globe, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'mobileapistrategy'),
      createTopic('Local Storage Strategy', Database, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'},{name:'Drizzle ORM',url:'https://orm.drizzle.team/'},{name:'SQLite',url:'https://www.sqlite.org/'}], 'mobilelocalstorage'),
      createTopic('Authentication', Key, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'mobileauthentication'),
      createTopic('Database Schema', Database, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'mobiledatabase'),
      createTopic('Backend Architecture', Server, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'},{name:'Excalidraw',url:'https://excalidraw.com/'}], 'mobilebackend'),
      createTopic('Push Notification Strategy', Bell, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilepushnotifications'),
      createTopic('Deep Linking', Globe, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobiledeeplinking'),
      createTopic('File Storage', Cloud, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'},{name:'Drizzle ORM',url:'https://orm.drizzle.team/'},{name:'SQLite',url:'https://www.sqlite.org/'}], 'mobilefilestorage'),
      createTopic('Offline Strategy', Cloud, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileofflinestrategy'),
      createTopic('Analytics Strategy', BarChart, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'mobileanalyticsstrategy'),
      createTopic('Cost Estimation', DollarSign, [{name:'Stripe Billing',url:'https://stripe.com/billing'},{name:'RevenueCat (Mobile)',url:'https://www.revenuecat.com/'}], 'mobilecostestimation'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 – DEVELOPMENT',
    topics: [
      createTopic('State Management', Layers, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'mobilestatemanagementimplementation'),
      createTopic('Auth', Key, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'mobileauth'),
      createTopic('Database', Database, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'mobiledatabaseimplementation'),
      createTopic('Backend', Server, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'mobilebackendimplementation'),
      createTopic('Push Notifications', Bell, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilepushnotificationsimplementation'),
      createTopic('Frontend (UI)', Box, [{name:'Figma',url:'https://www.figma.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Radix UI Accessibility',url:'https://www.radix-ui.com/'}], 'mobilefrontendui'),
      createTopic('Navigation', Smartphone, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilenavigation'),
      createTopic('APIs', Globe, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'mobileapis'),
      createTopic('Payments', CreditCard, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilepayments'),
      createTopic('Media Uploads', Cloud, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilemediauploads'),
      createTopic('Maps & Location', Map, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilemapslocation'),
      createTopic('Device Permissions', Lock, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'mobiledevicepermissions'),
      createTopic('Offline Features', Cloud, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'mobileofflinefeatures'),
      createTopic('Analytics Events', BarChart, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'mobileanalyticsevents'),
      createTopic('Error Handling', AlertCircle, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'mobileerrorhandling'),
      createTopic('Testing', CheckSquare, [{name:'Playwright',url:'https://playwright.dev/'},{name:'Jest',url:'https://jestjs.io/'},{name:'TestFlight',url:'https://developer.apple.com/testflight/'}], 'mobiletesting'),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'mobilesecurity'),
      createTopic('Performance Optimization', Zap, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'},{name:'Drizzle ORM',url:'https://orm.drizzle.team/'},{name:'SQLite',url:'https://www.sqlite.org/'}], 'mobileperformanceoptimization'),
      createTopic('Crash Reporting', AlertCircle, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'mobilecrashreporting'),
      createTopic('Monitoring', Activity, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'mobilemonitoring'),
      createTopic('Logging', FileText, [{name:'Sentry',url:'https://sentry.io/'},{name:'Datadog',url:'https://www.datadoghq.com/'}], 'mobilelogging'),
      createTopic('Rate Limiting', Shield, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileratelimiting'),
      createTopic('Backups', Database, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilebackups'),
      createTopic('CI/CD', Settings, [{name:'Vercel',url:'https://vercel.com/'},{name:'GitHub Actions',url:'https://github.com/features/actions'},{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'mobilecicd'),
      createTopic('Infrastructure', Server, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileinfrastructure'),
      createTopic('App Size Optimization', Smartphone, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileappsizeoptimization'),
      createTopic('Battery Optimization', Battery, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilebatteryoptimization'),
      createTopic('Scalability', BarChart, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilescalability'),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5 — STORE DEPLOYMENT',
    topics: [
      createTopic('Play Store Setup', Smartphone, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'mobileplaystoresetup'),
      createTopic('App Store Setup', Smartphone, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'mobileappstoresetup'),
      createTopic('App Icons', Box, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileappicons'),
      createTopic('Screenshots', Smartphone, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilescreenshots'),
      createTopic('Feature Graphics', PenTool, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'mobilefeaturegraphics'),
      createTopic('Store Listing SEO', Search, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'mobilestorelistingseo'),
      createTopic('Privacy Policy', FileText, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileprivacypolicy'),
      createTopic('Terms of Service', FileText, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'mobiletermsofservice'),
      createTopic('Content Rating', Shield, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilecontentrating'),
      createTopic('Test Tracks', Settings, [{name:'Playwright',url:'https://playwright.dev/'},{name:'Jest',url:'https://jestjs.io/'},{name:'TestFlight',url:'https://developer.apple.com/testflight/'}], 'mobiletesttracks'),
      createTopic('Beta Testing', Users, [{name:'Playwright',url:'https://playwright.dev/'},{name:'Jest',url:'https://jestjs.io/'},{name:'TestFlight',url:'https://developer.apple.com/testflight/'}], 'mobilebetatesting'),
      createTopic('Release Checklist', CheckSquare, [{name:'Vercel',url:'https://vercel.com/'},{name:'GitHub Actions',url:'https://github.com/features/actions'},{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'mobilereleasechecklist'),
    ]
  },
  {
    id: 'phase-6',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Retention', Users, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileretention'),
      createTopic('Analytics', BarChart, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'mobileanalytics'),
      createTopic('Notifications Strategy', Bell, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilenotificationsstrategy'),
      createTopic('User Feedback', MessageSquare, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'mobileuserfeedback'),
      createTopic('Reviews & Ratings', Target, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilereviewsratings'),
      createTopic('Referral Programs', Users, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilereferralprograms'),
      createTopic('Roadmap', Globe, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'mobileroadmap'),
      createTopic('Scaling Strategy', BarChart, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilescalingstrategy'),
    ]
  }
];

export const mobileHackathonTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0',
    topics: [
      createTopic('Idea Definition', Rocket, [{name:'Mom Test Guide',url:'https://www.momtestbook.com/'},{name:'YC RFS',url:'https://www.ycombinator.com/rfs'}], 'mobileideadefinition'),
      createTopic('MVP Features', CheckSquare, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'mobilemvpfeatures'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1',
    topics: [
      createTopic('PRD', FileText, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'},{name:'Excalidraw',url:'https://excalidraw.com/'}], 'mobileprd'),
      createTopic('User Flows', Globe, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'mobileuserflows'),
      createTopic('Design System', PenTool, [{name:'Figma',url:'https://www.figma.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Radix UI Accessibility',url:'https://www.radix-ui.com/'}], 'mobiledesignsystem'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2',
    topics: [
      createTopic('Tech Stack', Settings, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobiletechstackselection'),
      createTopic('Database', Database, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'mobiledatabase'),
      createTopic('Auth (Optional)', Key, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'mobileauth'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3',
    topics: [
      createTopic('Backend', Server, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'mobilebackend'),
      createTopic('Frontend', Box, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilefrontendui'),
      createTopic('Demo Data', Database, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'mobiledemodata'),
      createTopic('Play Store Mockups', Smartphone, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'mobileplaystoremockups'),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5',
    topics: [
      createTopic('Pitch Deck', Presentation, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilepitchdeck'),
      createTopic('Demo Script', FileText, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobiledemoscript'),
      createTopic('Submission Checklist', CheckSquare, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilesubmissionchecklist'),
    ]
  }
];

export const mobilePersonalTaxonomy: Category[] = [
  {
    id: 'discovery',
    name: 'PHASE 1 — DISCOVERY',
    topics: [
      createTopic('PRD', FileText, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'},{name:'Excalidraw',url:'https://excalidraw.com/'}], 'mobileprd'),
      createTopic('User Research', Rocket, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'mobileuserresearch'),
      createTopic('Design System', PenTool, [{name:'Figma',url:'https://www.figma.com/'},{name:'Shadcn UI',url:'https://ui.shadcn.com/'},{name:'Tailwind CSS',url:'https://tailwindcss.com/'},{name:'Radix UI Accessibility',url:'https://www.radix-ui.com/'}], 'mobiledesignsystem'),
    ]
  },
  {
    id: 'architecture',
    name: 'PHASE 2 — ARCHITECTURE',
    topics: [
      createTopic('Tech Stack', Settings, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobiletechstackselection'),
      createTopic('Auth', Key, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'mobileauth'),
      createTopic('Database', Database, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'mobiledatabase'),
    ]
  },
  {
    id: 'development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Backend', Server, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'mobilebackend'),
      createTopic('Push Notifications', Bell, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilepushnotificationsimplementation'),
      createTopic('Analytics', BarChart, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'mobileanalyticsevents'),
    ]
  },
  {
    id: 'production',
    name: 'PHASE 4 — PRODUCTION',
    topics: [
      createTopic('Security', Shield, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'mobilesecurity'),
      createTopic('Performance', Zap, [{name:'Supabase',url:'https://supabase.com/'},{name:'Prisma ORM',url:'https://www.prisma.io/'},{name:'Drizzle ORM',url:'https://orm.drizzle.team/'},{name:'SQLite',url:'https://www.sqlite.org/'}], 'mobileperformanceoptimization'),
      createTopic('Infrastructure', Cloud, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileinfrastructure'),
      createTopic('Play Store Setup', Smartphone, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'mobileplaystoresetup'),
      createTopic('Privacy Policy', FileText, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileprivacypolicy'),
    ]
  },
  {
    id: 'growth',
    name: 'PHASE 5 — GROWTH',
    topics: [
      createTopic('Feedback', MessageSquare, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilefeedback'),
      createTopic('Roadmap', Globe, [{name:'Linear',url:'https://linear.app/'},{name:'Notion Templates',url:'https://www.notion.so/templates'}], 'mobileroadmap'),
    ]
  }
];

// Combine all possible topics for custom mode
export const mobileCustomTaxonomy: Category[] = [
  ...mobileProductionTaxonomy.map(cat => {
    if (cat.id === 'phase-3') {
      return {
        ...cat,
        topics: [
          ...cat.topics,
          createTopic('Ads', DollarSign, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileads'),
          createTopic('Demo Data', Database, [{name:'PostHog',url:'https://posthog.com/'},{name:'Mixpanel',url:'https://mixpanel.com/'}], 'mobiledemodata'),
          createTopic('Play Store Mockups', Smartphone, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'React Query',url:'https://tanstack.com/query/latest'}], 'mobileplaystoremockups'),
          createTopic('Multi-language', Globe, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilemultilanguage'),
          createTopic('Subscription Billing', DollarSign, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilesubscriptionbilling'),
          createTopic('Referral Programs', Users, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilereferralprograms'),
          createTopic('Wearables', Watch, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilewearables'),
          createTopic('Widgets', Box, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilewidgets'),
          createTopic('Background Services', Settings, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'mobilebackgroundservices'),
          createTopic('Bluetooth', Bluetooth, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilebluetooth'),
          createTopic('NFC', Smartphone, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilenfc'),
          createTopic('Camera', Smartphone, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilecamera'),
          createTopic('Location Services', Map, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'mobilelocationservices'),
          createTopic('Auth', Key, [{name:'Clerk Auth',url:'https://clerk.com/'},{name:'Supabase Auth',url:'https://supabase.com/auth'},{name:'OWASP Top 10',url:'https://owasp.org/www-project-top-ten/'}], 'mobileauth')
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

// Helper BookOpen since it's missing from import, oh wait I didn't import BookOpen
// Let's ensure BookOpen is in the lucide-react import above!
