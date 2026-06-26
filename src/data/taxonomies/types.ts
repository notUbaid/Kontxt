import type { Mode } from '../../components/TopNav';
import type React from 'react';

export interface QuickLink {
  name: string;
  url: string;
  icon?: React.ElementType;
}

export interface CustomLink extends QuickLink {
  id: string;
  scope: 'global' | 'project';
  projectId?: string;
  targetType: 'universal' | 'topic';
  targetTopics?: string[];
}

export interface Topic {
  id: string;
  name: string;
  icon: React.ElementType;
  modes: Mode[];
  quickLinks: QuickLink[];
}

export interface Category {
  id: string;
  name: string;
  topics: Topic[];
}

export const universalLinks: QuickLink[] = [
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'Analytics', url: 'https://analytics.google.com' },
  { name: 'Vercel', url: 'https://vercel.com' },
];

export const generateId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

export const globalTopicLinks: Record<string, {name: string, url: string}[]> = {
  // SaaS Web App Tracks (Injected)
  'welcome': [
    { name: 'SaaS Playbook (MicroConf)', url: 'https://microconf.com/saas-playbook' },
    { name: 'Paul Graham: Startup = Growth', url: 'http://www.paulgraham.com/growth.html' }
  ],
  'ideadefinition': [
    { name: 'YC: How to get Startup Ideas', url: 'https://www.ycombinator.com/library/8g-how-to-get-startup-ideas' },
    { name: 'Garry Tan: Vitamin vs Painkiller', url: 'https://www.youtube.com/watch?v=1xN5-7WJ3-U' }
  ],
  'problemstatement': [
    { name: 'The Mom Test', url: 'https://www.momtestbook.com/' },
    { name: 'Jobs To Be Done (JTBD) Framework', url: 'https://hbr.org/2016/09/know-your-customers-jobs-to-be-done' }
  ],
  'userpainpoints': [
    { name: 'Empathy Mapping Guide (NNG)', url: 'https://www.nngroup.com/articles/empathy-mapping/' },
    { name: 'Lenny\'s Newsletter: Finding Pain', url: 'https://www.lennysnewsletter.com/p/how-to-find-product-market-fit' }
  ],
  'icp': [
    { name: 'TK Kader: Ideal Customer Profile', url: 'https://www.youtube.com/watch?v=F0O5v8eFk6U' },
    { name: 'Clearbit: B2B ICP Data', url: 'https://clearbit.com/resources/guides/ideal-customer-profile' }
  ],
  'valueproposition': [
    { name: 'Julian Shapiro: Landing Page Guide', url: 'https://www.julian.com/guide/startup/landing-pages' },
    { name: 'April Dunford: Obviously Awesome', url: 'https://www.aprildunford.com/obviously-awesome' }
  ],
  'mvpfeatures': [
    { name: 'Wizard of Oz MVP', url: 'https://www.interaction-design.org/literature/article/wizard-of-oz-prototyping' },
    { name: 'Do Things That Don\'t Scale', url: 'http://paulgraham.com/ds.html' }
  ],
  'pricing': [
    { name: 'Patrick Campbell: SaaS Pricing', url: 'https://www.youtube.com/watch?v=9_N1p5B69mI' },
    { name: 'Psychology of Pricing (Stripe)', url: 'https://stripe.com/en-gb-us/resources/more/the-psychology-of-pricing' },
    { name: 'Good-Better-Best Pricing', url: 'https://hbr.org/2018/09/the-good-better-best-approach-to-pricing' }
  ],
  'kpis': [
    { name: 'David Sacks: SaaS Metrics 2.0', url: 'https://sacks.substack.com/p/the-saas-metrics-that-matter' },
    { name: 'ChartMogul SaaS Glossary', url: 'https://chartmogul.com/resources/saas-metrics-glossary/' }
  ],
  'northstarmetric': [
    { name: 'Amplitude: North Star Playbook', url: 'https://amplitude.com/north-star' },
    { name: 'Reforge: Finding your North Star', url: 'https://www.reforge.com/blog/north-star-metric-growth' }
  ],
  'prd': [
    { name: 'Lenny\'s PRD Templates', url: 'https://www.lennysnewsletter.com/p/my-favorite-product-management-templates' },
    { name: 'Figma: Writing PRDs', url: 'https://www.figma.com/resource-library/how-to-write-a-product-requirements-document/' }
  ],
  'designsystem': [
    { name: 'Radix UI / Shadcn', url: 'https://ui.shadcn.com/' },
    { name: 'Refactoring UI (Tailwind Labs)', url: 'https://www.refactoringui.com/' }
  ],
  'frontendarchitecture': [
    { name: 'TanStack Query (React Query)', url: 'https://tanstack.com/query/latest' },
    { name: 'Zustand vs Redux', url: 'https://tkdodo.eu/blog/working-with-zustand' },
    { name: 'Kent C. Dodds: State Colocation', url: 'https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster' }
  ],
  'backendarchitecture': [
    { name: 'Bulletproof Node.js Architecture', url: 'https://softwareontheroad.com/ideal-nodejs-project-structure/' },
    { name: 'Controller-Service-Repository Pattern', url: 'https://blog.logrocket.com/organizing-node-js-project-structure/' }
  ],
  'authorizationroles': [
    { name: 'Supabase RLS Guide', url: 'https://supabase.com/docs/guides/auth/row-level-security' },
    { name: 'Permit.io (RBAC/ABAC)', url: 'https://www.permit.io/' },
    { name: 'OWASP: Access Control', url: 'https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control' }
  ],
  'databaseschema': [
    { name: 'Prisma Schema Design', url: 'https://www.prisma.io/docs/concepts/components/prisma-schema' },
    { name: 'Designing Multi-Tenant DBs', url: 'https://aws.amazon.com/blogs/database/multi-tenant-data-isolation-with-postgresql-row-level-security/' },
    { name: 'PlanetScale: Schema Migrations', url: 'https://planetscale.com/docs/concepts/safe-migrations' }
  ],
  'caching': [
    { name: 'Stale-While-Revalidate (Vercel)', url: 'https://vercel.com/docs/concepts/edge-network/caching#stale-while-revalidate' },
    { name: 'Upstash Redis Caching', url: 'https://upstash.com/blog/caching-in-nextjs' }
  ],
  'thirdpartyintegrations': [
    { name: 'Stripe Webhooks Best Practices', url: 'https://stripe.com/docs/webhooks/best-practices' },
    { name: 'Inngest (Background Jobs)', url: 'https://www.inngest.com/' },
    { name: 'Merge.dev (Unified APIs)', url: 'https://merge.dev/' }
  ],
  'analytics': [
    { name: 'PostHog: Event Tracking', url: 'https://posthog.com/docs/getting-started/send-events' },
    { name: 'Server-Side vs Client-Side Analytics', url: 'https://segment.com/blog/client-side-vs-server-side-tracking/' }
  ],
  'security': [
    { name: 'Helmet.js (Express/Node)', url: 'https://helmetjs.github.io/' },
    { name: 'Next.js Security Headers', url: 'https://nextjs.org/docs/advanced-features/security-headers' },
    { name: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' }
  ],
  'cicd': [
    { name: 'GitHub Actions for Next.js', url: 'https://github.com/actions/setup-node' },
    { name: 'Vercel Deployment Workflow', url: 'https://vercel.com/docs/concepts/deployments/overview' }
  ],
  'seo': [
    { name: 'Programmatic SEO Playbook', url: 'https://www.programmaticseo.com/' },
    { name: 'Next.js SEO Guide', url: 'https://nextjs.org/learn/seo/introduction-to-seo' }
  ],
  'publiclaunch': [
    { name: 'Product Hunt Launch Guide', url: 'https://www.producthunt.com/launch' },
    { name: 'Hacker News Show HN Rules', url: 'https://news.ycombinator.com/showhn.html' }
  ],
  'salesoutreach': [
    { name: 'Apollo.io B2B Data', url: 'https://www.apollo.io/' },
    { name: 'Justin Michael Method (Cold Outbound)', url: 'https://www.amazon.com/Justin-Michael-Method-Sales-2-0/dp/B0B5P2R5B8' }
  ],
  'scalabilityplanning': [
    { name: 'PgBouncer (Connection Pooling)', url: 'https://www.pgbouncer.org/' },
    { name: 'Scaling Serverless Databases', url: 'https://supabase.com/docs/guides/platform/compute-and-disk' }
  ],

  // Mobile App Phase 0
  'mobileideadefinition': [
    { name: 'YC: Evaluate Ideas', url: 'https://www.ycombinator.com/library/6e-how-to-evaluate-startup-ideas' },
    { name: 'Tool: Google Trends', url: 'https://trends.google.com/' },
    { name: 'Tool: Exploding Topics', url: 'https://explodingtopics.com/' }
  ],
  'mobileproblemstatement': [
    { name: 'Lean Canvas Guide', url: 'https://leanstack.com/lean-canvas' },
    { name: 'YC: Get Startup Ideas', url: 'https://www.ycombinator.com/library/8g-how-to-get-startup-ideas' },
    { name: 'The Mom Test', url: 'https://www.momtestbook.com/' }
  ],
  'mobileusecases': [
    { name: 'Jobs to be Done', url: 'https://www.lennysnewsletter.com/p/jobs-to-be-done' },
    { name: 'NNG: Scenario Mapping', url: 'https://www.nngroup.com/articles/scenario-mapping-personas/' }
  ],
  'mobileuserjourney': [
    { name: 'Nielsen Norman: Journey Mapping', url: 'https://www.nngroup.com/articles/journey-mapping-101/' },
    { name: 'Miro Journey Template', url: 'https://miro.com/templates/customer-journey-map/' },
    { name: 'UXPressia (Journey Maps)', url: 'https://uxpressia.com/' }
  ],
  'mobiletargetaudience': [
    { name: 'Superhuman PMF Engine', url: 'https://firstround.com/review/how-superhuman-built-an-engine-to-find-product-market-fit/' },
    { name: 'SparkToro (Audience Research)', url: 'https://sparktoro.com/' }
  ],
  'mobilepersonas': [
    { name: 'Nielsen Norman: User Personas', url: 'https://www.nngroup.com/articles/persona/' },
    { name: 'Hubspot Persona Maker', url: 'https://www.hubspot.com/make-my-persona' },
    { name: 'ADPList (User Interviews)', url: 'https://adplist.org/' }
  ],
  'mobilesolutionstatement': [
    { name: 'Amazon Working Backwards', url: 'https://www.workingbackwards.com/' },
    { name: 'Coda PR/FAQ Template', url: 'https://coda.io/@coda/amazon-pr-faq' }
  ],
  'mobileelevatorpitch': [
    { name: 'YC: How to Pitch', url: 'https://www.ycombinator.com/library/6p-how-to-pitch-your-startup' },
    { name: 'Geoffrey Moore Positioning', url: 'https://firstround.com/review/the-positioning-framework-that-has-helped-founders-cut-through-the-noise/' }
  ],
  'mobilecompetitoranalysis': [
    { name: 'AppTweak (ASO & Competitors)', url: 'https://www.apptweak.com/' },
    { name: 'SensorTower', url: 'https://sensortower.com/' },
    { name: 'Data.ai (App Annie)', url: 'https://www.data.ai/' }
  ],
  'mobilesimilarapps': [
    { name: 'Mobbin (App UI Patterns)', url: 'https://mobbin.com/' },
    { name: 'UXArchive', url: 'https://uxarchive.com/' },
    { name: 'App Store Categories', url: 'https://apps.apple.com/us/genre/ios/id36' }
  ],
  'playstoreresearch': [
    { name: 'Google Play Console Guide', url: 'https://play.google.com/console/about/' },
    { name: 'AppTweak Play Store ASO', url: 'https://www.apptweak.com/en/aso-blog/google-play-store-optimization' },
    { name: 'SensorTower Play Store Top Charts', url: 'https://sensortower.com/android/us/overall/top-free' }
  ],
  'appstoreresearch': [
    { name: 'App Store Optimization Basics', url: 'https://developer.apple.com/app-store/search/' },
    { name: 'SplitMetrics (A/B Testing)', url: 'https://splitmetrics.com/' },
    { name: 'AppTweak App Store ASO', url: 'https://www.apptweak.com/en/aso-blog/app-store-optimization-ios' }
  ],
  'mobilefeatureplanning': [
    { name: 'Lenny: Writing PRDs', url: 'https://www.lennysnewsletter.com/p/product-requirements-document-prd' },
    { name: 'Linear (Issue Tracking)', url: 'https://linear.app/' },
    { name: 'Notion (Roadmaps)', url: 'https://www.notion.so/' }
  ],
  'mobilemvpfeatures': [
    { name: 'YC: Plan an MVP', url: 'https://www.ycombinator.com/library/6e-how-to-plan-an-mvp' },
    { name: 'Minimum Lovable Product', url: 'https://firstround.com/review/dont-serve-burnt-pizza-and-other-lessons-in-building-minimum-lovable-products/' }
  ],
  'mobilefuturefeatures': [
    { name: 'Lenny: Product Roadmaps', url: 'https://www.lennysnewsletter.com/p/product-roadmaps' },
    { name: 'PostHog (Feature Flags)', url: 'https://posthog.com/' }
  ],
  'mobilefeatureprioritization': [
    { name: 'MoSCoW Prioritization', url: 'https://www.productplan.com/glossary/moscow-prioritization/' },
    { name: 'Intercom: RICE Framework', url: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/' },
    { name: 'Kano Model', url: 'https://www.productplan.com/glossary/kano-model/' }
  ],
  'mobilemonetization': [
    { name: 'RevenueCat: State of Subscriptions', url: 'https://www.revenuecat.com/state-of-subscription-apps/' },
    { name: 'Adapty: Monetization Guide', url: 'https://adapty.io/blog/' },
    { name: 'Apple Monetization Guidelines', url: 'https://developer.apple.com/app-store/business-models/' }
  ],
  'mobilefree': [
    { name: 'Monetizing Free Apps', url: 'https://www.businessofapps.com/guide/how-to-monetize-an-app/' },
    { name: 'The Danger of Free Apps', url: 'https://andrewchen.com/the-danger-of-free/' }
  ],
  'mobilefreemium': [
    { name: 'Freemium vs Free Trial', url: 'https://www.revenuecat.com/blog/engineering/freemium-vs-free-trial/' },
    { name: 'Elena Verna: B2B Freemium', url: 'https://www.elenaverna.com/' }
  ],
  'mobilesubscription': [
    { name: 'RevenueCat', url: 'https://www.revenuecat.com/' },
    { name: 'Superwall (Paywalls)', url: 'https://superwall.com/' },
    { name: 'Adapty', url: 'https://adapty.io/' }
  ],
  'mobileads': [
    { name: 'Google AdMob', url: 'https://admob.google.com/home/' },
    { name: 'AppLovin', url: 'https://www.applovin.com/' },
    { name: 'Unity Ads', url: 'https://unity.com/solutions/unity-ads' }
  ],
  'mobileonetimepurchase': [
    { name: 'Apple In-App Purchases', url: 'https://developer.apple.com/in-app-purchase/' },
    { name: 'Google Play Billing', url: 'https://developer.android.com/google/play/billing' }
  ],
  'mobilesuccessmetrics': [
    { name: 'Amplitude: Retention Playbook', url: 'https://amplitude.com/retention' },
    { name: 'Mixpanel: Mobile Analytics', url: 'https://mixpanel.com/mobile-analytics/' }
  ],

  'mobiledau': [
    { name: 'Andrew Chen: DAU/MAU Ratio', url: 'https://andrewchen.com/dau-mau-is-a-popular-metric-but-heres-why-it-fails-you/' },
    { name: 'Mixpanel: DAU Guide', url: 'https://mixpanel.com/blog/daily-active-users/' }
  ],
  'mobilemau': [
    { name: 'Amplitude: Measuring MAU', url: 'https://amplitude.com/blog/mau' },
    { name: 'Sequoia: Active Users', url: 'https://www.sequoiacap.com/article/active-users/' }
  ],
  'mobilesessionduration': [
    { name: 'Adjust: Session Lengths', url: 'https://www.adjust.com/glossary/session-length/' },
    { name: 'Firebase: Session Metrics', url: 'https://firebase.google.com/docs/analytics/session-metrics' }
  ],
  
  // Mobile App Phase 1
  'mobileprd': [
    { name: 'Lenny: Writing PRDs', url: 'https://www.lennysnewsletter.com/p/product-requirements-document-prd' },
    { name: 'Linear (Issue Tracking)', url: 'https://linear.app/' },
    { name: 'Notion (Roadmaps)', url: 'https://www.notion.so/' }
  ],
  'mobileuserflows': [
    { name: 'FigJam User Flows', url: 'https://www.figma.com/figjam/user-flows/' },
    { name: 'Mobbin (App UX Flows)', url: 'https://mobbin.com/' },
    { name: 'NNGroup: User Journeys', url: 'https://www.nngroup.com/articles/journey-mapping-101/' }
  ],
  'appnavigation': [
    { name: 'Apple HIG: Navigation', url: 'https://developer.apple.com/design/human-interface-guidelines/navigation' },
    { name: 'Material Design: Navigation', url: 'https://m3.material.io/components/navigation-bar/overview' },
    { name: 'React Navigation', url: 'https://reactnavigation.org/' }
  ],
  'mobilewireframes': [
    { name: 'Figma for Mobile UI', url: 'https://www.figma.com/' },
    { name: 'Balsamiq Wireframes', url: 'https://balsamiq.com/' },
    { name: 'Apple UI Design Resources', url: 'https://developer.apple.com/design/resources/' }
  ],
  'mobiledesignsystem': [
    { name: 'Material Design 3', url: 'https://m3.material.io/' },
    { name: 'Apple Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/' },
    { name: 'Zeroheight (Design System Docs)', url: 'https://zeroheight.com/' }
  ],
  'mobilebranding': [
    { name: 'Apple HIG: App Icons', url: 'https://developer.apple.com/design/human-interface-guidelines/app-icons' },
    { name: 'Android Adaptive Icons', url: 'https://developer.android.com/develop/ui/views/launch/icon_design_adaptive' },
    { name: 'Midjourney', url: 'https://www.midjourney.com/' }
  ],
  'mobileaccessibility': [
    { name: 'Apple HIG: Accessibility', url: 'https://developer.apple.com/design/human-interface-guidelines/accessibility' },
    { name: 'Android Accessibility Overview', url: 'https://developer.android.com/guide/topics/ui/accessibility' },
    { name: 'WCAG 2.1 Guidelines', url: 'https://www.w3.org/TR/WCAG21/' }
  ],
  'mobileemptystates': [
    { name: 'Material Design: Empty States', url: 'https://m2.material.io/design/communication/empty-states.html' },
    { name: 'unDraw (Free Illustrations)', url: 'https://undraw.co/' },
    { name: 'UX Archive: Empty States', url: 'https://uxarchive.com/tasks/view-empty-states' }
  ],
  'mobileerrorstates': [
    { name: 'NNGroup: Error Messages', url: 'https://www.nngroup.com/articles/error-message-guidelines/' },
    { name: 'Material Design: Snackbars', url: 'https://m3.material.io/components/snackbar/overview' },
    { name: 'Sentry (Error Tracking)', url: 'https://sentry.io/' }
  ],
  'mobileloadingstates': [
    { name: 'Material Design: Progress Indicators', url: 'https://m3.material.io/components/progress-indicators/overview' },
    { name: 'UX Design: Skeleton Screens', url: 'https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a' },
    { name: 'LottieFiles (Loading Animations)', url: 'https://lottiefiles.com/' }
  ],
  // Mobile App Phase 2
  'mobileplatformstrategy': [
    { name: 'React Native Docs', url: 'https://reactnative.dev/' },
    { name: 'Flutter vs React Native', url: 'https://www.freecodecamp.org/news/flutter-vs-react-native/' },
    { name: 'Expo Documentation', url: 'https://docs.expo.dev/' }
  ],
  'mobilefundamentals': [
    { name: 'Mobile App Architecture', url: 'https://www.altexsoft.com/blog/mobile-app-architecture/' },
    { name: 'iOS App Architecture', url: 'https://developer.apple.com/documentation/uikit/app_and_environment/' },
    { name: 'Android Architecture', url: 'https://developer.android.com/topic/architecture' }
  ],
  'mobiletechstackselection': [
    { name: 'Mobile Tech Stacks', url: 'https://www.mindk.com/blog/mobile-app-tech-stack/' },
    { name: 'Choosing a Tech Stack', url: 'https://www.netguru.com/blog/how-to-choose-tech-stack-for-mobile-app' }
  ],
  'mobilestatemanagement': [
    { name: 'Zustand Docs', url: 'https://docs.pmnd.rs/zustand/getting-started/introduction' },
    { name: 'Redux Toolkit', url: 'https://redux-toolkit.js.org/' },
    { name: 'Jotai', url: 'https://jotai.org/' }
  ],
  'mobileapistrategy': [
    { name: 'REST vs GraphQL', url: 'https://www.apollographql.com/blog/graphql/basics/graphql-vs-rest/' },
    { name: 'React Query (TanStack)', url: 'https://tanstack.com/query/latest' },
    { name: 'tRPC for React Native', url: 'https://trpc.io/docs/client/react/setup' }
  ],
  'mobilelocalstorage': [
    { name: 'Expo SecureStore', url: 'https://docs.expo.dev/versions/latest/sdk/securestore/' },
    { name: 'MMKV for React Native', url: 'https://github.com/mrousavy/react-native-mmkv' },
    { name: 'AsyncStorage', url: 'https://react-native-async-storage.github.io/async-storage/' }
  ],
  'mobileauthentication': [
    { name: 'Supabase Auth', url: 'https://supabase.com/docs/guides/auth' },
    { name: 'Clerk React Native', url: 'https://clerk.com/docs/quickstarts/react-native' },
    { name: 'Firebase Auth', url: 'https://firebase.google.com/docs/auth' }
  ],
  'mobiledatabase': [
    { name: 'Supabase Database', url: 'https://supabase.com/docs/guides/database' },
    { name: 'WatermelonDB', url: 'https://nozbe.github.io/WatermelonDB/' },
    { name: 'PowerSync', url: 'https://docs.powersync.com/' }
  ],
  'mobilebackend': [
    { name: 'Supabase Edge Functions', url: 'https://supabase.com/docs/guides/functions' },
    { name: 'Vercel Serverless', url: 'https://vercel.com/docs/functions' },
    { name: 'AWS Amplify Mobile', url: 'https://aws.amazon.com/amplify/mobile/' }
  ],
  'mobilepushnotifications': [
    { name: 'Expo Push Notifications', url: 'https://docs.expo.dev/push-notifications/overview/' },
    { name: 'OneSignal', url: 'https://onesignal.com/' },
    { name: 'Firebase Cloud Messaging', url: 'https://firebase.google.com/docs/cloud-messaging' }
  ],
  'mobiledeeplinking': [
    { name: 'Expo Deep Linking', url: 'https://docs.expo.dev/guides/deep-linking/' },
    { name: 'React Navigation Deep Linking', url: 'https://reactnavigation.org/docs/deep-linking/' },
    { name: 'Branch.io', url: 'https://www.branch.io/' }
  ],
  'mobilefilestorage': [
    { name: 'Supabase Storage', url: 'https://supabase.com/docs/guides/storage' },
    { name: 'AWS S3 Mobile SDK', url: 'https://aws.amazon.com/s3/' },
    { name: 'Cloudinary', url: 'https://cloudinary.com/' }
  ],
  'mobileofflinestrategy': [
    { name: 'Offline First Apps', url: 'https://rxdb.info/offline-first.html' },
    { name: 'React Query Offline', url: 'https://tanstack.com/query/v4/docs/framework/react/guides/network-status' },
    { name: 'WatermelonDB Offline', url: 'https://nozbe.github.io/WatermelonDB/Advanced/Sync.html' }
  ],
  'mobileanalyticsstrategy': [
    { name: 'PostHog React Native', url: 'https://posthog.com/docs/libraries/react-native' },
    { name: 'Amplitude Mobile', url: 'https://amplitude.com/mobile-analytics' },
    { name: 'Mixpanel React Native', url: 'https://mixpanel.com/' }
  ],
  'mobilecostestimation': [
    { name: 'AWS Pricing Calculator', url: 'https://calculator.aws/#/' },
    { name: 'Supabase Pricing', url: 'https://supabase.com/pricing' },
    { name: 'Vercel Pricing', url: 'https://vercel.com/pricing' }
  ],

  // Mobile specific links
  'crashreporting': [
    { name: 'Sentry Crash Reporting', url: 'https://docs.sentry.io/platforms/react-native/' },
    { name: 'Crashlytics for React Native', url: 'https://rnfirebase.io/crashlytics/usage' }
  ],
  'appsizeoptimization': [
    { name: 'React Native Bundle Visualizer', url: 'https://github.com/IjzerenHein/react-native-bundle-visualizer' },
    { name: 'Android App Bundles (AAB)', url: 'https://developer.android.com/guide/app-bundle' }
  ],
  'batteryoptimization': [
    { name: 'React Native Performance Guide', url: 'https://reactnative.dev/docs/performance' },
    { name: 'Identifying Battery Drain', url: 'https://developer.android.com/topic/performance/power' }
  ],
  'scalability': [
    { name: 'Supabase Connection Pooling', url: 'https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler' },
    { name: 'ByteByteGo: System Design', url: 'https://bytebytego.com/' }
  ],
  'playstoresetup': [
    { name: 'Google Play Console', url: 'https://play.google.com/console/about/' },
    { name: 'Play Store Developer Policies', url: 'https://play.google.com/about/developer-content-policy/' }
  ],
  'appstoresetup': [
    { name: 'Apple Developer Program', url: 'https://developer.apple.com/programs/' },
    { name: 'App Store Review Guidelines', url: 'https://developer.apple.com/app-store/review/guidelines/' },
    { name: 'Apple D-U-N-S Number Guide', url: 'https://developer.apple.com/support/D-U-N-S/' }
  ],
  'appicons': [
    { name: 'Apple HIG: App Icons', url: 'https://developer.apple.com/design/human-interface-guidelines/app-icons' },
    { name: 'Android Adaptive Icons', url: 'https://developer.android.com/develop/ui/views/launch/icon_design_adaptive' },
    { name: 'App Icon Generator', url: 'https://appicon.co/' }
  ],
  'screenshots': [
    { name: 'App Store Screenshot Sizes', url: 'https://help.apple.com/app-store-connect/#/devd274dd925' },
    { name: 'Previewed.app (Screenshot Generator)', url: 'https://previewed.app/' },
    { name: 'Mobbin: Best App Screenshots', url: 'https://mobbin.com/' }
  ],
  'featuregraphics': [
    { name: 'Google Play Feature Graphic Guidelines', url: 'https://support.google.com/googleplay/android-developer/answer/9866151?hl=en' },
    { name: 'Figma Feature Graphic Templates', url: 'https://www.figma.com/community' }
  ],
  'storelistingseo': [
    { name: 'AppTweak (ASO Tool)', url: 'https://www.apptweak.com/' },
    { name: 'SensorTower ASO Guide', url: 'https://sensortower.com/blog/app-store-optimization' },
    { name: 'Apple Search Ads Keyword Planner', url: 'https://searchads.apple.com/' }
  ],
  'contentrating': [
    { name: 'IARC Rating System', url: 'https://www.globalratings.com/' },
    { name: 'App Store Age Ratings', url: 'https://developer.apple.com/help/app-store-connect/manage-app-information/assign-an-age-rating' }
  ],
  'testtracks': [
    { name: 'Google Play Internal Testing', url: 'https://support.google.com/googleplay/android-developer/answer/9845334' },
    { name: 'Expo EAS Submit', url: 'https://docs.expo.dev/submit/introduction/' }
  ],
  'releasechecklist': [
    { name: 'Product Hunt Launch Guide', url: 'https://www.producthunt.com/launch' },
    { name: 'App Store Review Process', url: 'https://developer.apple.com/app-store/review/' },
    { name: 'Google Play Rollout Guide', url: 'https://support.google.com/googleplay/android-developer/answer/6369910' }
  ],
  'mediauploads': [
    { name: 'Expo Image Picker', url: 'https://docs.expo.dev/versions/latest/sdk/imagepicker/' },
    { name: 'Supabase Storage', url: 'https://supabase.com/docs/guides/storage' }
  ],
  'mapslocation': [
    { name: 'React Native Maps', url: 'https://github.com/react-native-maps/react-native-maps' },
    { name: 'Expo Location', url: 'https://docs.expo.dev/versions/latest/sdk/location/' }
  ],
  'devicepermissions': [
    { name: 'React Native Permissions', url: 'https://github.com/zoontek/react-native-permissions' },
    { name: 'Expo App Tracking Transparency', url: 'https://docs.expo.dev/versions/latest/sdk/tracking-transparency/' }
  ],
  'offlinefeatures': [
    { name: 'WatermelonDB (Offline-First)', url: 'https://watermelondb.dev/' },
    { name: 'React Native NetInfo', url: 'https://github.com/react-native-netinfo/react-native-netinfo' }
  ],
  'analyticsevents': [
    { name: 'PostHog React Native', url: 'https://posthog.com/docs/libraries/react-native' },
    { name: 'Amplitude', url: 'https://amplitude.com/docs/sdks/analytics/react-native' }
  ],
  'errorhandling': [
    { name: 'Sentry Crash Reporting', url: 'https://docs.sentry.io/platforms/react-native/' },
    { name: 'React Error Boundaries', url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary' }
  ],
  'statemanagement': [
    { name: 'Zustand Documentation', url: 'https://zustand-demo.pmnd.rs/' },
    { name: 'React Native MMKV', url: 'https://github.com/mrousavy/react-native-mmkv' }
  ],
  'pushnotifications': [
    { name: 'Expo Push Notifications', url: 'https://docs.expo.dev/push-notifications/overview/' },
    { name: 'OneSignal React Native', url: 'https://documentation.onesignal.com/docs/react-native-sdk-setup' }
  ],
  'frontendui': [
    { name: 'Restyle', url: 'https://shopify.github.io/restyle/' },
    { name: 'React Native Paper', url: 'https://callstack.github.io/react-native-paper/' }
  ],
  'navigation': [
    { name: 'Expo Router', url: 'https://docs.expo.dev/router/introduction/' },
    { name: 'React Navigation', url: 'https://reactnavigation.org/' }
  ],
  'apis': [
    { name: 'React Query (TanStack)', url: 'https://tanstack.com/query/latest' },
    { name: 'Axios Documentation', url: 'https://axios-http.com/docs/intro' }
  ],
  'targetusers': [
    { name: 'Superhuman PMF Engine', url: 'https://firstround.com/review/how-superhuman-built-an-engine-to-find-product-market-fit/' },
    { name: 'Tool: Apollo.io (B2B Leads)', url: 'https://www.apollo.io/' },
    { name: 'Tool: LinkedIn Sales Nav', url: 'https://business.linkedin.com/sales-solutions/sales-navigator' }
  ],
  'icpidealcustomerprofile': [
    { name: 'Superhuman PMF Engine', url: 'https://firstround.com/review/how-superhuman-built-an-engine-to-find-product-market-fit/' },
    { name: 'Tool: Apollo.io (B2B Leads)', url: 'https://www.apollo.io/' },
    { name: 'Tool: LinkedIn Sales Nav', url: 'https://business.linkedin.com/sales-solutions/sales-navigator' }
  ],
  'personas': [
    { name: 'Lenny: Jobs to be Done', url: 'https://www.lennysnewsletter.com/p/jobs-to-be-done' },
    { name: 'Tool: ADPList (User Interviews)', url: 'https://adplist.org/' },
    { name: 'Tool: Hubspot Persona Maker', url: 'https://www.hubspot.com/make-my-persona' }
  ],
  'solutionstatement': [
    { name: 'Amazon Working Backwards', url: 'https://www.workingbackwards.com/' },
    { name: 'Template: Coda PR/FAQ', url: 'https://coda.io/@coda/amazon-pr-faq' },
    { name: 'Tool: FigJam (Brainstorming)', url: 'https://www.figma.com/figjam/' }
  ],
  'elevatorpitch': [
    { name: 'YC: How to Pitch', url: 'https://www.ycombinator.com/library/6p-how-to-pitch-your-startup' },
    { name: 'Video: Michael Seibel', url: 'https://www.youtube.com/watch?v=11h2q_AOSpY' },
    { name: 'Geoffrey Moore Framework', url: 'https://firstround.com/review/the-positioning-framework-that-has-helped-founders-cut-through-the-noise/' }
  ],
  'marketresearch': [
    { name: 'YC: How to Talk to Users', url: 'https://www.youtube.com/watch?v=MT4HgImiXgg' },
    { name: 'Tool: The Mom Test', url: 'https://www.momtestbook.com/' },
    { name: 'Tool: GigaBrain (Reddit)', url: 'https://thegigabrain.com/' }
  ],
  'competitoranalysis': [
    { name: 'Lenny: How to Win', url: 'https://www.lennysnewsletter.com/p/how-to-win' },
    { name: 'Tool: G2 Reviews', url: 'https://www.g2.com/' },
    { name: 'Tool: Similarweb', url: 'https://www.similarweb.com/' }
  ],
  'existingalternatives': [
    { name: 'First Round: Competing with Excel', url: 'https://firstround.com/review/why-excel-is-your-biggest-competitor/' },
    { name: 'Lenny: The Status Quo', url: 'https://www.lennysnewsletter.com/' },
    { name: 'Tool: Zapier (Integrations)', url: 'https://zapier.com/' }
  ],
  'marketpositioning': [
    { name: 'Book: Obviously Awesome', url: 'https://www.aprildunford.com/obviously-awesome' },
    { name: 'First Round: Positioning', url: 'https://firstround.com/review/the-positioning-framework-that-has-helped-founders-cut-through-the-noise/' },
    { name: 'Tool: Figma Brand Boards', url: 'https://www.figma.com/' }
  ],
  'featureplanning': [
    { name: 'Lenny: Writing PRDs', url: 'https://www.lennysnewsletter.com/p/product-requirements-document-prd' },
    { name: 'Tool: Linear (Issue Tracking)', url: 'https://linear.app/' },
    { name: 'Tool: Notion (Roadmaps)', url: 'https://www.notion.so/' }
  ],
  'futurefeatures': [
    { name: 'Lenny: Product Roadmaps', url: 'https://www.lennysnewsletter.com/p/product-roadmaps' },
    { name: 'Intercom: Product Strategy', url: 'https://www.intercom.com/blog/product-strategy/' },
    { name: 'Tool: PostHog (Feature Flags)', url: 'https://posthog.com/' }
  ],
  'featureprioritization': [
    { name: 'Intercom: RICE Framework', url: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/' },
    { name: 'Method: Eisenhower Matrix', url: 'https://todoist.com/productivity-methods/eisenhower-matrix' },
    { name: 'Tool: Jira (Backlog)', url: 'https://www.atlassian.com/software/jira' }
  ],
  'businessmodel': [
    { name: 'David Sacks: SaaSGrid Metrics', url: 'https://saasgrid.com/' },
    { name: 'Tomasz Tunguz: The 10 Metrics', url: 'https://tomtunguz.com/the-10-most-important-metrics-in-a-startup/' },
    { name: 'Tool: BurnRate.io', url: 'https://burnrate.io/' }
  ],
  'subscriptionmodel': [
    { name: 'BVP: 10 Laws of Cloud Computing', url: 'https://www.bvp.com/atlas/the-10-laws-of-cloud-computing' },
    { name: 'Tool: Baremetrics Open Startups', url: 'https://baremetrics.com/open-startups' },
    { name: 'Elena Verna: B2B Growth', url: 'https://www.elenaverna.com/' }
  ],
  'revenuestreams': [
    { name: 'Sarah Tavel: Hierarchy of Engagement', url: 'https://sarahtavel.medium.com/the-hierarchy-of-engagement-5803bf4e6cfa' },
    { name: 'SaaStr: Rules of Expansion Revenue', url: 'https://www.saastr.com/the-10-rules-of-expansion-revenue/' },
    { name: 'Ben Thompson: Aggregation Theory', url: 'https://stratechery.com/aggregation-theory/' }
  ],
  'successmetrics': [
    { name: 'Sequoia: Matrix for Series A', url: 'https://www.sequoiacap.com/article/framework-for-series-a/' },
    { name: 'Andrew Chen: Power User Curve', url: 'https://andrewchen.com/the-power-user-curve-the-best-way-to-understand-your-most-engaged-users/' },
    { name: 'Amplitude: Retention Playbook', url: 'https://amplitude.com/retention' }
  ],
  'userflows': [
    { name: 'Reforge: Product Loops vs. Funnels', url: 'https://www.reforge.com/blog/growth-loops' },
    { name: 'Mobbin (Elite UI Patterns)', url: 'https://mobbin.com/' },
    { name: 'PageFlows (SaaS flows)', url: 'https://pageflows.com/' },
    { name: 'Growth.Design: UX Case Studies', url: 'https://growth.design/case-studies' }
  ],
  'informationarchitecture': [
    { name: 'NNGroup: Information Architecture', url: 'https://www.nngroup.com/articles/information-architecture-study-guide/' },
    { name: 'Untools: Mental Models', url: 'https://untools.co/' },
    { name: "O'Reilly: Information Architecture", url: 'https://www.oreilly.com/library/view/information-architecture-4th/9781491911679/' },
    { name: 'Figma: IA Kits & Templates', url: 'https://www.figma.com/community/file/1029193796851214040' }
  ],
  'wireframes': [
    { name: 'Balsamiq: Low-Fidelity Wireframing', url: 'https://balsamiq.com/' },
    { name: 'Excalidraw: Virtual Whiteboard', url: 'https://excalidraw.com/' },
    { name: 'NNGroup: Wireframing 101', url: 'https://www.nngroup.com/articles/wireframes/' }
  ],
  'branding': [
    { name: 'Mailchimp Voice and Tone Guide', url: 'https://styleguide.mailchimp.com/voice-and-tone/' },
    { name: 'Fontshare (High-Quality Free Fonts)', url: 'https://www.fontshare.com/' },
    { name: 'Mobbin: SaaS Copywriting Examples', url: 'https://mobbin.com/' }
  ],
  'accessibility': [
    { name: 'WebAIM Contrast Checker', url: 'https://webaim.org/resources/contrastchecker/' },
    { name: 'W3C ARIA Authoring Practices', url: 'https://www.w3.org/WAI/ARIA/apg/' },
    { name: 'eslint-plugin-jsx-a11y', url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y' }
  ],
  'techstackselection': [
    { name: 'Y Combinator: How to Choose a Tech Stack', url: 'https://www.ycombinator.com/library/1M-how-to-choose-a-tech-stack' },
    { name: 'Boring Technology Club', url: 'https://boringtechnology.club/' },
    { name: 'Vercel: Tech Stack Guide', url: 'https://vercel.com/docs/concepts/projects/tech-stacks' }
  ],
  'apidesign': [
    { name: 'OpenAPI Specification', url: 'https://swagger.io/specification/' },
    { name: 'tRPC: End-to-end typesafe APIs', url: 'https://trpc.io/' },
    { name: 'REST vs GraphQL vs gRPC', url: 'https://www.youtube.com/watch?v=yIEkwcmk3os' }
  ],
  'authentication': [
    { name: 'Supabase Auth Docs', url: 'https://supabase.com/docs/guides/auth' },
    { name: 'Auth.js (NextAuth)', url: 'https://authjs.dev/' },
    { name: 'Why JWTs Suck as Session Tokens', url: 'https://redis.com/blog/json-web-tokens-jwt-are-dangerous-for-user-sessions/' }
  ],
  'filestorage': [
    { name: 'Supabase Storage Docs', url: 'https://supabase.com/docs/guides/storage' },
    { name: 'AWS S3 Presigned URLs', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html' },
    { name: 'Cloudinary Image Transformations', url: 'https://cloudinary.com/documentation/image_transformations' }
  ],
  'aiarchitectureoptional': [
    { name: 'Vercel AI SDK', url: 'https://sdk.vercel.ai/docs' },
    { name: 'Prompt Injection Explained', url: 'https://simonwillison.net/2022/Sep/12/prompt-injection/' },
    { name: 'LangChain Documentation', url: 'https://js.langchain.com/docs/get_started/introduction' }
  ],
  'systemarchitecturediagram': [
    { name: 'Mermaid.js Live Editor', url: 'https://mermaid.live/' },
    { name: 'Monolith vs Microservices', url: 'https://aws.amazon.com/microservices/' },
    { name: 'Serverless Architectures', url: 'https://martinfowler.com/articles/serverless.html' }
  ],
  'costestimation': [
    { name: 'AWS Pricing Calculator', url: 'https://calculator.aws/#/' },
    { name: 'Vercel Pricing Explained', url: 'https://vercel.com/docs/pricing' },
    { name: 'Cloudflare (Zero Egress Costs)', url: 'https://www.cloudflare.com/' }
  ],
  'auth': [
    { name: 'Supabase Auth Server-Side', url: 'https://supabase.com/docs/guides/auth/server-side-rendering' },
    { name: 'OWASP Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
    { name: 'Clerk vs Supabase Auth', url: 'https://clerk.com/blog/clerk-vs-supabase' }
  ],
  'database': [
    { name: 'Prisma Seeding Guide', url: 'https://www.prisma.io/docs/guides/migrate/seed-database' },
    { name: 'Faker.js Documentation', url: 'https://fakerjs.dev/guide/' },
    { name: 'Database Migrations Best Practices', url: 'https://planetscale.com/blog/database-migrations-best-practices' }
  ],
  'backend': [
    { name: 'Zod Validation Schema', url: 'https://zod.dev/' },
    { name: 'The N+1 Query Problem', url: 'https://planetscale.com/blog/what-is-n-1-query-problem' },
    { name: 'REST API Best Practices', url: 'https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/' }
  ],
  'frontend': [
    { name: 'shadcn/ui Components', url: 'https://ui.shadcn.com/' },
    { name: 'TanStack Query (Data Fetching)', url: 'https://tanstack.com/query/latest' },
    { name: 'Optimistic UI Updates', url: 'https://tanstack.com/query/latest/docs/react/guides/optimistic-updates' }
  ],
  'payments': [
    { name: 'Stripe API Docs', url: 'https://docs.stripe.com/api' },
    { name: 'Handling Stripe Webhooks', url: 'https://docs.stripe.com/webhooks' },
    { name: 'SCA (Strong Customer Authentication)', url: 'https://stripe.com/en-gb-us/guides/strong-customer-authentication' }
  ],
  'emails': [
    { name: 'Resend Documentation', url: 'https://resend.com/docs' },
    { name: 'React-Email Components', url: 'https://react.email/' },
    { name: 'DKIM and SPF Explained', url: 'https://www.cloudflare.com/learning/dns/dns-records/dns-dkim-record/' }
  ],
  'notifications': [
    { name: 'Sonner (React Toasts)', url: 'https://sonner.emilkowal.ski/' },
    { name: 'Supabase Realtime (WebSockets)', url: 'https://supabase.com/docs/guides/realtime' },
    { name: 'Server-Sent Events vs WebSockets', url: 'https://web.dev/articles/eventsource-basics' }
  ],
  'search': [
    { name: 'PostgreSQL Full-Text Search', url: 'https://www.postgresql.org/docs/current/textsearch.html' },
    { name: 'Prisma Full-Text Search', url: 'https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search' },
    { name: 'usehooks-ts: useDebounce', url: 'https://usehooks-ts.com/react-hook/use-debounce' }
  ],
  'adminpanel': [
    { name: 'Retool for Internal Tools', url: 'https://retool.com/' },
    { name: 'Supabase Studio', url: 'https://supabase.com/docs/guides/platform/studio' },
    { name: 'Role-Based Access Control (RBAC)', url: 'https://www.permit.io/blog/what-is-rbac' }
  ],
  'integrations': [
    { name: 'Understanding OAuth 2.0', url: 'https://oauth.net/2/' },
    { name: 'Exponential Backoff Strategies', url: 'https://cloud.google.com/iot/docs/how-tos/exponential-backoff' },
    { name: 'Encrypting Data at Rest', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html' }
  ],
  'testing': [
    { name: 'Playwright E2E Testing', url: 'https://playwright.dev/docs/intro' },
    { name: 'Vitest Documentation', url: 'https://vitest.dev/guide/' },
    { name: 'GitHub Actions for CI/CD', url: 'https://docs.github.com/en/actions' }
  ],
  'documentation': [
    { name: 'Mintlify Documentation Sites', url: 'https://mintlify.com/' },
    { name: 'Swagger (OpenAPI)', url: 'https://swagger.io/' },
    { name: 'Google Developer Documentation Style Guide', url: 'https://developers.google.com/style' }
  ],
  'demodata': [
    { name: 'Faker.js Documentation', url: 'https://fakerjs.dev/' },
    { name: 'Mockaroo (CSV Test Data)', url: 'https://www.mockaroo.com/' },
    { name: 'Why Your Demo Data Matters', url: 'https://www.lennysnewsletter.com/' }
  ],
  'presentationprep': [
    { name: 'Y Combinator: How to Pitch', url: 'https://www.ycombinator.com/library/4q-how-to-pitch-your-company' },
    { name: 'Loom (Video Recording)', url: 'https://www.loom.com/' },
    { name: 'Product Hunt Launch Guide', url: 'https://www.producthunt.com/launch' }
  ],
  'performanceoptimization': [
    { name: 'web.dev Core Web Vitals', url: 'https://web.dev/vitals/' },
    { name: 'Next.js Image Optimization', url: 'https://nextjs.org/docs/app/building-your-application/optimizing/images' },
    { name: 'Webpack Bundle Analyzer', url: 'https://www.npmjs.com/package/webpack-bundle-analyzer' }
  ],
  'monitoring': [
    { name: 'BetterStack Uptime Monitoring', url: 'https://betterstack.com/uptime' },
    { name: 'Vercel Analytics', url: 'https://vercel.com/docs/analytics' },
    { name: 'What is an SLA?', url: 'https://www.atlassian.com/incident-management/kpis/sla-vs-slo-vs-sli' }
  ],
  'logging': [
    { name: 'Pino Logger', url: 'https://getpino.io/' },
    { name: 'Axiom (Log Aggregation)', url: 'https://axiom.co/' },
    { name: 'Structured Logging Best Practices', url: 'https://www.loggly.com/ultimate-guide/node-logging-basics/' }
  ],
  'errortracking': [
    { name: 'Sentry for Next.js', url: 'https://docs.sentry.io/platforms/javascript/guides/nextjs/' },
    { name: 'Source Maps Explained', url: 'https://web.dev/articles/source-maps' },
    { name: 'LogRocket Session Replay', url: 'https://logrocket.com/' }
  ],
  'ratelimiting': [
    { name: 'Upstash Ratelimit SDK', url: 'https://upstash.com/docs/oss/sdks/ts/ratelimit/overview' },
    { name: 'express-rate-limit', url: 'https://www.npmjs.com/package/express-rate-limit' },
    { name: 'Rate Limiting Algorithms Explained', url: 'https://blog.bytebytego.com/p/rate-limiting-fundamentals' }
  ],
  'backups': [
    { name: 'Supabase Backups', url: 'https://supabase.com/docs/guides/platform/backups' },
    { name: 'pg_dump Documentation', url: 'https://www.postgresql.org/docs/current/app-pgdump.html' },
    { name: 'Disaster Recovery Planning', url: 'https://cloud.google.com/architecture/dr-scenarios-planning-guide' }
  ],
  'infrastructure': [
    { name: 'Vercel vs Render vs Railway', url: 'https://blog.railway.app/' },
    { name: 'DigitalOcean App Platform', url: 'https://www.digitalocean.com/products/app-platform' },
    { name: 'Fly.io Documentation', url: 'https://fly.io/docs/' }
  ],
  'disasterrecovery': [
    { name: 'Instatus (Free Status Pages)', url: 'https://instatus.com/' },
    { name: 'PagerDuty Incident Response', url: 'https://www.pagerduty.com/' },
    { name: 'Google SRE: Incident Response', url: 'https://sre.google/sre-book/managing-incidents/' }
  ],
  'privacypolicy': [
    { name: 'Termly (Privacy Policy Generator)', url: 'https://termly.io/' },
    { name: 'GDPR Checklist', url: 'https://gdpr.eu/checklist/' },
    { name: 'Iubenda', url: 'https://www.iubenda.com/' }
  ],
  'termsofservice': [
    { name: 'Terms of Service Generator', url: 'https://termly.io/products/terms-and-conditions-generator/' },
    { name: 'Limitation of Liability Explained', url: 'https://www.nolo.com/legal-encyclopedia/what-is-a-limitation-of-liability-clause.html' },
    { name: 'Y Combinator Legal Docs', url: 'https://www.ycombinator.com/documents/' }
  ],
  'betatesting': [
    { name: 'The Mom Test Summary', url: 'https://www.momtestbook.com/' },
    { name: 'TestFlight (iOS)', url: 'https://developer.apple.com/testflight/' },
    { name: 'How to Run a Beta Test', url: 'https://www.ycombinator.com/library/5x-how-to-launch-again-and-again' }
  ],
  'launchchecklist': [
    { name: 'Product Hunt Launch Guide', url: 'https://www.producthunt.com/launch' },
    { name: 'Stripe: Testing to Live', url: 'https://docs.stripe.com/testing' },
    { name: 'Supabase Production Checklist', url: 'https://supabase.com/docs/guides/deployment/going-into-prod' }
  ],
  'analyticssetup': [
    { name: 'PostHog (Product Analytics)', url: 'https://posthog.com/' },
    { name: 'Plausible (Privacy-Friendly)', url: 'https://plausible.io/' },
    { name: 'Amplitude: Event Tracking Guide', url: 'https://amplitude.com/behavioral-analytics-guide' }
  ],
  'legaldocuments': [
    { name: 'Stripe Atlas', url: 'https://stripe.com/atlas' },
    { name: 'Mercury (Business Banking)', url: 'https://mercury.com/' },
    { name: 'Termly (Terms Generator)', url: 'https://termly.io/' }
  ],
  'cookiepolicy': [
    { name: 'Cookiebot', url: 'https://www.cookiebot.com/' },
    { name: 'GDPR Rules on Cookies', url: 'https://gdpr.eu/cookies/' },
    { name: 'Fathom Analytics (No Cookies)', url: 'https://usefathom.com/' }
  ],
  'customersupport': [
    { name: 'Crisp (Chat Widget)', url: 'https://crisp.chat/' },
    { name: 'Resend (Transactional Emails)', url: 'https://resend.com/' },
    { name: 'Linear (Issue Tracking)', url: 'https://linear.app/' }
  ],
  'retention': [
    { name: 'ProfitWell (Churn Tracking)', url: 'https://www.profitwell.com/' },
    { name: 'Baremetrics', url: 'https://baremetrics.com/' }
  ],
  'userfeedback': [
    { name: 'Canny (Feedback Boards)', url: 'https://canny.io/' },
    { name: 'Typeform (Surveys)', url: 'https://www.typeform.com/' }
  ],
  'scalingstrategy': [
    { name: 'AWS', url: 'https://aws.amazon.com/' },
    { name: 'DigitalOcean', url: 'https://www.digitalocean.com/' }
  ],
  'marketing': [
    { name: 'HubSpot (Inbound)', url: 'https://www.hubspot.com/' },
    { name: 'Apollo.io (Cold Email)', url: 'https://www.apollo.io/' }
  ],
  'referralsystems': [
    { name: 'Rewardful (Affiliates)', url: 'https://www.rewardful.com/' },
    { name: 'PartnerStack', url: 'https://partnerstack.com/' }
  ],
  'featureroadmap': [
    { name: 'Linear (Roadmaps)', url: 'https://linear.app/' },
    { name: 'Productboard', url: 'https://www.productboard.com/' }
  ],
  'technicaldebt': [
    { name: 'SonarQube (Code Quality)', url: 'https://www.sonarqube.org/' },
    { name: 'Sentry (Error Tracking)', url: 'https://sentry.io/' }
  ],
  'pitchdeck': [
    { name: 'Pitch.com (Presentations)', url: 'https://pitch.com/' },
    { name: 'Canva (Slide Templates)', url: 'https://www.canva.com/' }
  ],
  'demoscript': [
    { name: 'Loom (Screen Recording)', url: 'https://www.loom.com/' },
    { name: 'OBS Studio (Live Demos)', url: 'https://obsproject.com/' }
  ],
  'submissionchecklist': [
    { name: 'Product Hunt Launch Guide', url: 'https://www.producthunt.com/launch' },
    { name: 'Devpost (Hackathons)', url: 'https://devpost.com/' }
  ],
  // Mobile App Phase 3
  'mobilestatemanagementimplementation': [
    { name: 'Zustand Docs', url: 'https://zustand-demo.pmnd.rs/' },
    { name: 'React Query for React Native', url: 'https://tanstack.com/query/latest/docs/react/react-native' }
  ],
  'mobileauth': [
    { name: 'Supabase Auth in Expo', url: 'https://supabase.com/docs/guides/getting-started/tutorials/with-expo' },
    { name: 'Clerk Expo Quickstart', url: 'https://clerk.com/docs/quickstarts/expo' }
  ],
  'mobiledatabaseimplementation': [
    { name: 'WatermelonDB', url: 'https://nozbe.github.io/WatermelonDB/' },
    { name: 'Expo SQLite', url: 'https://docs.expo.dev/versions/latest/sdk/sqlite/' }
  ],
  'mobilebackendimplementation': [
    { name: 'tRPC with Expo', url: 'https://trpc.io/docs/client/react' },
    { name: 'Firebase Functions', url: 'https://firebase.google.com/docs/functions' }
  ],
  'mobilepushnotificationsimplementation': [
    { name: 'Expo Push Notifications', url: 'https://docs.expo.dev/push-notifications/overview/' },
    { name: 'OneSignal React Native', url: 'https://documentation.onesignal.com/docs/react-native-sdk-setup' }
  ],
  'mobilefrontendui': [
    { name: 'NativeWind (Tailwind for RN)', url: 'https://www.nativewind.dev/' },
    { name: 'React Native Paper', url: 'https://callstack.github.io/react-native-paper/' }
  ],
  'mobilenavigation': [
    { name: 'Expo Router Docs', url: 'https://docs.expo.dev/router/introduction/' },
    { name: 'React Navigation', url: 'https://reactnavigation.org/' }
  ],
  'mobileapis': [
    { name: 'React Native Fetch API', url: 'https://reactnative.dev/docs/network' },
    { name: 'Axios Docs', url: 'https://axios-http.com/docs/intro' }
  ],
  'mobilepayments': [
    { name: 'RevenueCat (In-App Purchases)', url: 'https://www.revenuecat.com/' },
    { name: 'Stripe React Native', url: 'https://stripe.com/docs/payments/accept-a-payment?platform=react-native' }
  ],
  'mobilemediauploads': [
    { name: 'Expo ImagePicker', url: 'https://docs.expo.dev/versions/latest/sdk/imagepicker/' },
    { name: 'Supabase Storage in RN', url: 'https://supabase.com/docs/guides/storage' }
  ],
  'mobilemapslocation': [
    { name: 'Expo Location', url: 'https://docs.expo.dev/versions/latest/sdk/location/' },
    { name: 'React Native Maps', url: 'https://github.com/react-native-maps/react-native-maps' }
  ],
  'mobiledevicepermissions': [
    { name: 'Expo Permissions', url: 'https://docs.expo.dev/versions/latest/sdk/permissions/' },
    { name: 'Apple App Tracking Transparency', url: 'https://developer.apple.com/documentation/apptrackingtransparency' }
  ],
  'mobileofflinefeatures': [
    { name: 'React Native NetInfo', url: 'https://github.com/react-native-netinfo/react-native-netinfo' },
    { name: 'PowerSync (Offline First)', url: 'https://www.powersync.com/' }
  ],
  'mobileanalyticsevents': [
    { name: 'PostHog React Native', url: 'https://posthog.com/docs/libraries/react-native' },
    { name: 'Segment React Native', url: 'https://segment.com/docs/connections/sources/catalog/libraries/mobile/react-native/' }
  ],
  'mobileerrorhandling': [
    { name: 'Sentry for React Native', url: 'https://docs.sentry.io/platforms/react-native/' },
    { name: 'React Native Error Boundaries', url: 'https://reactnative.dev/docs/error-boundaries' }
  ],
  'mobiletesting': [
    { name: 'Detox (E2E Testing)', url: 'https://wix.github.io/Detox/' },
    { name: 'React Native Testing Library', url: 'https://callstack.github.io/react-native-testing-library/' }
  ],
  // Mobile App Phase 4
  'mobilesecurity': [
    { name: 'OWASP Mobile Top 10', url: 'https://owasp.org/www-project-mobile-top-10/' },
    { name: 'React Native Security Guide', url: 'https://reactnative.dev/docs/security' }
  ],
  'mobileperformanceoptimization': [
    { name: 'React Native Performance', url: 'https://reactnative.dev/docs/performance' },
    { name: 'FlashList by Shopify', url: 'https://shopify.github.io/flash-list/' }
  ],
  'mobilecrashreporting': [
    { name: 'Sentry for React Native', url: 'https://docs.sentry.io/platforms/react-native/' },
    { name: 'Firebase Crashlytics', url: 'https://rnfirebase.io/crashlytics/usage' }
  ],
  'mobilemonitoring': [
    { name: 'Datadog RUM for Mobile', url: 'https://docs.datadoghq.com/real_user_monitoring/reactnative/' },
    { name: 'New Relic Mobile', url: 'https://newrelic.com/products/mobile-monitoring' }
  ],
  'mobilelogging': [
    { name: 'Winston (Node.js)', url: 'https://github.com/winstonjs/winston' },
    { name: 'Pino Logger', url: 'https://github.com/pinojs/pino' }
  ],
  'mobileratelimiting': [
    { name: 'Express Rate Limit', url: 'https://www.npmjs.com/package/express-rate-limit' },
    { name: 'Upstash Redis Rate Limiting', url: 'https://upstash.com/blog/upstash-ratelimit' }
  ],
  'mobilebackups': [
    { name: 'Supabase Point in Time Recovery', url: 'https://supabase.com/docs/guides/platform/backups' },
    { name: 'Postgres pg_dump', url: 'https://www.postgresql.org/docs/current/app-pgdump.html' }
  ],
  'mobilecicd': [
    { name: 'EAS Build (Expo)', url: 'https://docs.expo.dev/build/introduction/' },
    { name: 'Fastlane', url: 'https://fastlane.tools/' }
  ],
  'mobileinfrastructure': [
    { name: 'Vercel Infrastructure', url: 'https://vercel.com/docs' },
    { name: 'AWS Mobile Infrastructure', url: 'https://aws.amazon.com/mobile/' }
  ],
  'mobileappsizeoptimization': [
    { name: 'Reducing APK Size', url: 'https://developer.android.com/topic/performance/reduce-apk-size' },
    { name: 'Expo App Size Guide', url: 'https://docs.expo.dev/distribution/optimizing-updates/' }
  ],
  'mobilebatteryoptimization': [
    { name: 'Android Battery and Memory', url: 'https://developer.android.com/topic/performance/power' },
    { name: 'iOS Energy Efficiency Guide', url: 'https://developer.apple.com/library/archive/documentation/Performance/Conceptual/EnergyGuide-iOS/index.html' }
  ],
  'mobilescalability': [
    { name: 'Scaling Postgres', url: 'https://supabase.com/docs/guides/database/metrics' },
    { name: 'Serverless Functions Scaling', url: 'https://vercel.com/docs/functions/serverless-functions' }
  ]
,
  // Mobile App Phase 5
  'mobileplaystoresetup': [
    { name: 'Play Console Console Help', url: 'https://support.google.com/googleplay/android-developer/answer/113469' },
    { name: 'Expo Play Store Guide', url: 'https://docs.expo.dev/submit/android/' }
  ],
  'mobileappstoresetup': [
    { name: 'App Store Connect Help', url: 'https://help.apple.com/app-store-connect/' },
    { name: 'Expo App Store Guide', url: 'https://docs.expo.dev/submit/ios/' }
  ],
  'mobileappicons': [
    { name: 'Expo App Icons', url: 'https://docs.expo.dev/guides/app-icons/' },
    { name: 'Iconset (Icon Generator)', url: 'https://iconset.io/' }
  ],
  'mobilescreenshots': [
    { name: 'Previewed.app', url: 'https://previewed.app/' },
    { name: 'App Store Screenshot Guidelines', url: 'https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications' }
  ],
  'mobilefeaturegraphics': [
    { name: 'Google Play Feature Graphic', url: 'https://support.google.com/googleplay/android-developer/answer/9866151' },
    { name: 'Canva Feature Graphic Templates', url: 'https://www.canva.com/' }
  ],
  'mobilestorelistingseo': [
    { name: 'AppTweak (ASO Tool)', url: 'https://www.apptweak.com/' },
    { name: 'SensorTower', url: 'https://sensortower.com/' }
  ],
  'mobileprivacypolicy': [
    { name: 'Termly Privacy Policy Generator', url: 'https://termly.io/' },
    { name: 'Google Play Privacy Policy Requirements', url: 'https://support.google.com/googleplay/android-developer/answer/10144311' }
  ],
  'mobiletermsofservice': [
    { name: 'TermsFeed Generator', url: 'https://www.termsfeed.com/' },
    { name: 'Apple EULA', url: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/' }
  ],
  'mobilecontentrating': [
    { name: 'IARC Rating Guide', url: 'https://www.globalratings.com/' },
    { name: 'Google Play Content Ratings', url: 'https://support.google.com/googleplay/android-developer/answer/188189' }
  ],
  'mobiletesttracks': [
    { name: 'Google Play Testing Tracks', url: 'https://support.google.com/googleplay/android-developer/answer/9845334' },
    { name: 'TestFlight Overview', url: 'https://developer.apple.com/testflight/' }
  ],
  'mobilebetatesting': [
    { name: 'TestFlight Setup', url: 'https://developer.apple.com/help/app-store-connect/test-a-beta-version/overview-of-testflight' },
    { name: 'Expo EAS Submit', url: 'https://docs.expo.dev/submit/introduction/' }
  ],
  'mobilereleasechecklist': [
    { name: 'Apple App Store Review Guidelines', url: 'https://developer.apple.com/app-store/review/guidelines/' },
    { name: 'Google Play Launch Checklist', url: 'https://developer.android.com/distribute/best-practices/launch/launch-checklist' }
  ],
  'mobilepitchdeck': [
    { name: 'Pitch.com (Presentations)', url: 'https://pitch.com/' },
    { name: 'Sequoia Capital Pitch Deck Template', url: 'https://www.sequoiacap.com/article/writing-a-business-plan/' }
  ],
  'mobiledemoscript': [
    { name: 'Loom (Screen Recording)', url: 'https://www.loom.com/' },
    { name: 'OBS Studio (Live Demos)', url: 'https://obsproject.com/' }
  ],
  'mobilesubmissionchecklist': [
    { name: 'Product Hunt Launch Guide', url: 'https://www.producthunt.com/launch' },
    { name: 'Devpost (Hackathons)', url: 'https://devpost.com/' }
  ]
,
  // Mobile App Phase 6
  'mobileretention': [
    { name: 'Mixpanel Mobile Retention Guide', url: 'https://mixpanel.com/topics/mobile-app-retention/' },
    { name: 'Braze Mobile Marketing', url: 'https://www.braze.com/resources/articles' }
  ],
  'mobileanalytics': [
    { name: 'PostHog React Native', url: 'https://posthog.com/docs/libraries/react-native' },
    { name: 'Amplitude Mobile SDKs', url: 'https://www.amplitude.com/mobile-analytics' }
  ],
  'mobilenotificationsstrategy': [
    { name: 'OneSignal Best Practices', url: 'https://onesignal.com/blog/push-notification-best-practices/' },
    { name: 'Firebase In-App Messaging', url: 'https://firebase.google.com/docs/in-app-messaging' }
  ],
  'mobileuserfeedback': [
    { name: 'Instabug (In-App Feedback)', url: 'https://instabug.com/' },
    { name: 'Sentry User Feedback', url: 'https://docs.sentry.io/product/user-feedback/' }
  ],
  'mobilereviewsratings': [
    { name: 'Expo StoreReview API', url: 'https://docs.expo.dev/versions/latest/sdk/storereview/' },
    { name: 'Apple SKStoreReviewController Guide', url: 'https://developer.apple.com/documentation/storekit/requesting_app_store_reviews' }
  ],
  'mobilereferralprograms': [
    { name: 'Branch.io (Deep Linking)', url: 'https://www.branch.io/' },
    { name: 'Firebase Dynamic Links (Deprecated - Use Branch)', url: 'https://firebase.google.com/docs/dynamic-links' }
  ],
  'mobileroadmap': [
    { name: 'Canny (Public Roadmaps)', url: 'https://canny.io/' },
    { name: 'Linear (Product Planning)', url: 'https://linear.app/' }
  ],
  'mobilescalingstrategy': [
    { name: 'Supabase Scaling Postgres', url: 'https://supabase.com/docs/guides/platform/compute-add-ons' },
    { name: 'Vercel Edge Functions', url: 'https://vercel.com/docs/functions/edge-functions' }
  ],
  'mobilefeedback': [
    { name: 'Typeform (Surveys)', url: 'https://www.typeform.com/' },
    { name: 'Google Forms', url: 'https://www.google.com/forms/about/' }
  ]

};

export const createTopic = (name: string, icon: React.ElementType, customLinks: QuickLink[] = [], overrideId?: string): Topic => {
  const id = overrideId || generateId(name);
  return {
    id,
    name,
    icon,
    modes: ['Hackathon', 'Personal', 'Production'],
    quickLinks: [...(globalTopicLinks[id] || []), ...customLinks]
  };
};


