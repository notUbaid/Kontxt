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
      createTopic('Idea Definition', Rocket, [{name:'Apple HIG',url:'https://developer.apple.com/design/human-interface-guidelines/'},{name:'YC RFS',url:'https://www.ycombinator.com/rfs'}], 'mobileideadefinition'),
      createTopic('Problem Statement', AlertCircle, [{name:'Material Design',url:'https://m3.material.io/'},{name:'Mobbin UX',url:'https://mobbin.com/'}], 'mobileproblemstatement'),
      createTopic('Use Cases', Target, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobileusecases'),
      createTopic('User Journey', Globe, [{name:'App Store Guidelines',url:'https://developer.apple.com/app-store/review/guidelines/'},{name:'Play Store Policies',url:'https://support.google.com/googleplay/android-developer/answer/9888053'}], 'mobileuserjourney'),
      createTopic('Target Audience', Users, [{name:'Sensor Tower ASO',url:'https://sensortower.com/blog/app-store-optimization'}], 'mobiletargetaudience'),
      createTopic('Personas', Users, [{name:'HIG: Ergonomics',url:'https://developer.apple.com/design/human-interface-guidelines/layout'}], 'mobilepersonas'),
      createTopic('Solution Statement', CheckSquare, [{name:'Native vs Cross-Platform',url:'https://reactnative.dev/docs/intro'}], 'mobilesolutionstatement'),
      createTopic('Elevator Pitch', Presentation, [{name:'Product Hunt Launch',url:'https://www.producthunt.com/'}], 'mobileelevatorpitch'),
      createTopic('Competitor Analysis', BarChart, [{name:'AppMagic',url:'https://appmagic.rocks/'},{name:'Similarweb',url:'https://www.similarweb.com/'}], 'mobilecompetitoranalysis'),
      createTopic('Similar Apps', Layers, [{name:'Mobbin Patterns',url:'https://mobbin.com/'},{name:'PageFlows',url:'https://pageflows.com/'}], 'mobilesimilarapps'),
      createTopic('Play Store Research', Search),
      createTopic('App Store Research', Search),
      createTopic('Feature Planning', CheckSquare, [{name:'Linear',url:'https://linear.app/'},{name:'PostHog Feature Flags',url:'https://posthog.com/docs/feature-flags'}], 'mobilefeatureplanning'),
      createTopic('MVP Features', Rocket, [{name:'WatermelonDB Sync',url:'https://nozbe.github.io/WatermelonDB/Advanced/Sync.html'}], 'mobilemvpfeatures'),
      createTopic('Future Features', Layers, [{name:'RevenueCat Subscriptions',url:'https://www.revenuecat.com/'}], 'mobilefuturefeatures'),
      createTopic('Feature Prioritization', BarChart, [{name:'RICE Framework',url:'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/'}], 'mobilefeatureprioritization'),
      createTopic('Monetization', DollarSign, [{name:'RevenueCat',url:'https://www.revenuecat.com/'},{name:'Apple IAP Guidelines',url:'https://developer.apple.com/in-app-purchase/'}], 'mobilemonetization'),
      createTopic('Free', DollarSign, [{name:'Expo Application Services (EAS)',url:'https://expo.dev/eas'}], 'mobilefree'),
      createTopic('Freemium', DollarSign, [{name:'Paywall Design',url:'https://superwall.com/'}], 'mobilefreemium'),
      createTopic('Subscription', DollarSign, [{name:'RevenueCat React Native',url:'https://www.revenuecat.com/docs/getting-started/installation/reactnative'}], 'mobilesubscription'),
      createTopic('Ads', DollarSign, [{name:'Google AdMob',url:'https://admob.google.com/'}], 'mobileads'),
      createTopic('One-time Purchase', DollarSign, [{name:'App Store Lifetime Deals',url:'https://developer.apple.com/in-app-purchase/'}], 'mobileonetimepurchase'),
      createTopic('Success Metrics', Activity, [{name:'Amplitude Mobile',url:'https://amplitude.com/'},{name:'PostHog React Native',url:'https://posthog.com/docs/libraries/react-native'}], 'mobilesuccessmetrics'),
      createTopic('Retention', Users, [{name:'OneSignal Push',url:'https://onesignal.com/'}], 'mobileretention'),
      createTopic('DAU', Users, [{name:'Mixpanel',url:'https://mixpanel.com/'}], 'mobiledau'),
      createTopic('MAU', Users, [{name:'Mixpanel',url:'https://mixpanel.com/'}], 'mobilemau'),
      createTopic('Session Duration', Activity, [{name:'PostHog Session Replay',url:'https://posthog.com/docs/session-replay'}], 'mobilesessionduration'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'}], 'mobileprd'),
      createTopic('User Flows', Globe, [{name:'PageFlows Mobile',url:'https://pageflows.com/ios/'}], 'mobileuserflows'),
      createTopic('App Navigation', Smartphone, [{name:'Expo Router',url:'https://docs.expo.dev/router/introduction/'},{name:'React Navigation',url:'https://reactnavigation.org/'}], 'appnavigation'),
      createTopic('Wireframes', Box, [{name:'Figma Mobile Templates',url:'https://www.figma.com/community/tag/mobile'}], 'mobilewireframes'),
      createTopic('Design System', PenTool, [{name:'NativeWind (Tailwind)',url:'https://www.nativewind.dev/'},{name:'UI Kitten',url:'https://akveo.github.io/react-native-ui-kitten/'}], 'mobiledesignsystem'),
      createTopic('Branding', Target, [{name:'Apple App Icons',url:'https://developer.apple.com/design/human-interface-guidelines/app-icons'}], 'mobilebranding'),
      createTopic('Accessibility', Users, [{name:'React Native A11y',url:'https://reactnative.dev/docs/accessibility'}], 'mobileaccessibility'),
      createTopic('Empty States', Box, [{name:'EmptyStates.com',url:'https://emptystat.es/'}], 'mobileemptystates'),
      createTopic('Error States', AlertCircle, [{name:'React Native NetInfo',url:'https://github.com/react-native-netinfo/react-native-netinfo'}], 'mobileerrorstates'),
      createTopic('Loading States', Activity, [{name:'React Native Skeleton Content',url:'https://github.com/marcuz/react-native-skeleton-content'}], 'mobileloadingstates'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — MOBILE ARCHITECTURE',
    topics: [
      createTopic('Platform Strategy', Smartphone, [{name:'React Native vs Swift',url:'https://reactnative.dev/'}], 'mobileplatformstrategy'),
      createTopic('Mobile Fundamentals', BookOpen, [{name:'React Native AppState',url:'https://reactnative.dev/docs/appstate'}], 'mobilefundamentals'),
      createTopic('Tech Stack Selection', Settings, [{name:'Expo CNG',url:'https://docs.expo.dev/workflow/continuous-native-generation/'}], 'mobiletechstackselection'),
      createTopic('State Management Architecture', Layers, [{name:'TanStack Query Persist',url:'https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient'}], 'mobilestatemanagement'),
      createTopic('API Strategy', Globe, [{name:'BFF Pattern',url:'https://samnewman.io/patterns/architectural/bff/'}], 'mobileapistrategy'),
      createTopic('Local Storage Strategy', Database, [{name:'WatermelonDB',url:'https://nozbe.github.io/WatermelonDB/'},{name:'React Native MMKV',url:'https://github.com/mrousavy/react-native-mmkv'}], 'mobilelocalstorage'),
      createTopic('Authentication', Key, [{name:'Expo SecureStore',url:'https://docs.expo.dev/versions/latest/sdk/securestore/'},{name:'Supabase Auth React Native',url:'https://supabase.com/docs/guides/getting-started/tutorials/with-expo'}], 'mobileauthentication'),
      createTopic('Database Schema', Database, [{name:'PostgREST',url:'https://postgrest.org/'}], 'mobiledatabase'),
      createTopic('Backend Architecture', Server, [{name:'PgBouncer',url:'https://www.pgbouncer.org/'}], 'mobilebackend'),
      createTopic('Push Notification Strategy', Bell, [{name:'Expo Push Notifications',url:'https://docs.expo.dev/push-notifications/overview/'}], 'mobilepushnotifications'),
      createTopic('Deep Linking', Globe, [{name:'Universal Links (iOS)',url:'https://developer.apple.com/ios/universal-links/'},{name:'App Links (Android)',url:'https://developer.android.com/training/app-links'}], 'mobiledeeplinking'),
      createTopic('File Storage', Cloud, [{name:'React Native Image Crop Picker',url:'https://github.com/ivpusic/react-native-image-crop-picker'}], 'mobilefilestorage'),
      createTopic('Offline Strategy', Cloud, [{name:'WatermelonDB Sync',url:'https://nozbe.github.io/WatermelonDB/Advanced/Sync.html'}], 'mobileofflinestrategy'),
      createTopic('Analytics Strategy', BarChart, [{name:'Apple ATT Guidelines',url:'https://developer.apple.com/app-store/user-privacy-and-data-use/'}], 'mobileanalyticsstrategy'),
      createTopic('Cost Estimation', DollarSign, [{name:'EAS Build Pricing',url:'https://expo.dev/pricing'}], 'mobilecostestimation'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 – DEVELOPMENT',
    topics: [
      createTopic('State Management', Layers, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'TanStack Query',url:'https://tanstack.com/query/latest'}], 'mobilestatemanagementimplementation'),
      createTopic('Auth', Key, [{name:'Expo Apple Auth',url:'https://docs.expo.dev/versions/latest/sdk/apple-authentication/'}], 'mobileauth'),
      createTopic('Database', Database, [{name:'Supabase React Native',url:'https://supabase.com/docs/reference/javascript/installing'}], 'mobiledatabaseimplementation'),
      createTopic('Backend', Server, [{name:'RevenueCat Webhooks',url:'https://www.revenuecat.com/docs/integrations/webhooks'}], 'mobilebackendimplementation'),
      createTopic('Push Notifications', Bell, [{name:'Expo Push Tutorial',url:'https://docs.expo.dev/push-notifications/push-notifications-setup/'}], 'mobilepushnotificationsimplementation'),
      createTopic('Frontend (UI)', Box, [{name:'FlashList (Shopify)',url:'https://shopify.github.io/flash-list/'}], 'mobilefrontendui'),
      createTopic('Navigation', Smartphone, [{name:'Expo Router Auth Layouts',url:'https://docs.expo.dev/router/reference/authentication/'}], 'mobilenavigation'),
      createTopic('APIs', Globe, [{name:'Axios Interceptors',url:'https://axios-http.com/docs/interceptors'}], 'mobileapis'),
      createTopic('Payments', CreditCard, [{name:'React Native Purchases (RevenueCat)',url:'https://www.revenuecat.com/docs/getting-started/installation/reactnative'}], 'mobilepayments'),
      createTopic('Media Uploads', Cloud, [{name:'Expo Image Manipulator',url:'https://docs.expo.dev/versions/latest/sdk/imagemanipulator/'}], 'mobilemediauploads'),
      createTopic('Maps & Location', Map, [{name:'React Native Maps',url:'https://github.com/react-native-maps/react-native-maps'}], 'mobilemapslocation'),
      createTopic('Device Permissions', Lock, [{name:'Expo Location',url:'https://docs.expo.dev/versions/latest/sdk/location/'}], 'mobiledevicepermissions'),
      createTopic('Offline Features', Cloud, [{name:'WatermelonDB Observable',url:'https://nozbe.github.io/WatermelonDB/Implementation/Observables.html'}], 'mobileofflinefeatures'),
      createTopic('Analytics Events', BarChart, [{name:'PostHog Telemetry',url:'https://posthog.com/docs/libraries/react-native'}], 'mobileanalyticsevents'),
      createTopic('Error Handling', AlertCircle, [{name:'Sentry React Native',url:'https://docs.sentry.io/platforms/react-native/'}], 'mobileerrorhandling'),
      createTopic('Testing', CheckSquare, [{name:'Maestro E2E',url:'https://maestro.mobile.dev/'},{name:'Detox',url:'https://wix.github.io/Detox/'}], 'mobiletesting'),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name:'React Native Certificate Pinning',url:'https://github.com/MaxToyberman/react-native-ssl-pinning'}], 'mobilesecurity'),
      createTopic('Performance Optimization', Zap, [{name:'React Native Reanimated',url:'https://docs.swmansion.com/react-native-reanimated/'}], 'mobileperformanceoptimization'),
      createTopic('Crash Reporting', AlertCircle, [{name:'Sentry Source Maps Expo',url:'https://docs.sentry.io/platforms/react-native/manual-setup/expo/'}], 'mobilecrashreporting'),
      createTopic('Monitoring', Activity, [{name:'Datadog React Native',url:'https://docs.datadoghq.com/real_user_monitoring/reactnative/'}], 'mobilemonitoring'),
      createTopic('Logging', FileText, [{name:'React Native File Logger',url:'https://github.com/BeTomorrow/react-native-file-logger'}], 'mobilelogging'),
      createTopic('Rate Limiting', Shield, [{name:'Upstash Redis',url:'https://upstash.com/'}], 'mobileratelimiting'),
      createTopic('Backups', Database, [{name:'Expo SecureStore',url:'https://docs.expo.dev/versions/latest/sdk/securestore/'}], 'mobilebackups'),
      createTopic('CI/CD', Settings, [{name:'EAS Build GitHub Actions',url:'https://docs.expo.dev/build/building-on-ci/'}], 'mobilecicd'),
      createTopic('Infrastructure', Server, [{name:'Expo Image Caching',url:'https://docs.expo.dev/versions/latest/sdk/image/'}], 'mobileinfrastructure'),
      createTopic('App Size Optimization', Smartphone, [{name:'React Native Bundle Visualizer',url:'https://github.com/IjzerenHein/react-native-bundle-visualizer'}], 'mobileappsizeoptimization'),
      createTopic('Battery Optimization', Battery, [{name:'Expo Background Fetch',url:'https://docs.expo.dev/versions/latest/sdk/background-fetch/'}], 'mobilebatteryoptimization'),
      createTopic('Scalability', BarChart, [{name:'API Versioning',url:'https://stripe.com/docs/api/versioning'}], 'mobilescalability'),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5 — STORE DEPLOYMENT',
    topics: [
      createTopic('Play Store Setup', Smartphone, [{name:'Google Play Data Safety',url:'https://support.google.com/googleplay/android-developer/answer/10787469'}], 'mobileplaystoresetup'),
      createTopic('App Store Setup', Smartphone, [{name:'App Store Privacy Labels',url:'https://developer.apple.com/app-store/app-privacy-details/'}], 'mobileappstoresetup'),
      createTopic('App Icons', Box, [{name:'Expo Icon Generator',url:'https://docs.expo.dev/guides/app-icons/'}], 'mobileappicons'),
      createTopic('Screenshots', Smartphone, [{name:'AppMockUp',url:'https://app-mockup.com/'},{name:'Previewed.app',url:'https://previewed.app/'}], 'mobilescreenshots'),
      createTopic('Feature Graphics', PenTool, [{name:'Play Store Feature Graphic Guide',url:'https://support.google.com/googleplay/android-developer/answer/9866151'}], 'mobilefeaturegraphics'),
      createTopic('Store Listing SEO', Search, [{name:'AppTweak ASO',url:'https://www.apptweak.com/'}], 'mobilestorelistingseo'),
      createTopic('Privacy Policy', FileText, [{name:'Termly Privacy Generator',url:'https://termly.io/'}], 'mobileprivacypolicy'),
      createTopic('Terms of Service', FileText, [{name:'Apple EULA Guidelines',url:'https://developer.apple.com/support/app-store/'}], 'mobiletermsofservice'),
      createTopic('Content Rating', Shield, [{name:'IARC Content Ratings',url:'https://www.globalratings.com/'}], 'mobilecontentrating'),
      createTopic('Test Tracks', Settings, [{name:'Google Play Testing Tracks',url:'https://support.google.com/googleplay/android-developer/answer/9845334'}], 'mobiletesttracks'),
      createTopic('Beta Testing', Users, [{name:'Instabug React Native',url:'https://instabug.com/platforms/react-native'}], 'mobilebetatesting'),
      createTopic('Release Checklist', CheckSquare, [{name:'App Store Phased Release',url:'https://developer.apple.com/help/app-store-connect/update-your-app/release-a-version-update-in-phases'}], 'mobilereleasechecklist'),
    ]
  },
  {
    id: 'phase-6',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Retention', Users, [{name:'OneSignal Push',url:'https://onesignal.com/'}], 'mobileretention'),
      createTopic('Analytics', BarChart, [{name:'Amplitude Cohort Analysis',url:'https://amplitude.com/behavioral-cohorts'}], 'mobileanalytics'),
      createTopic('Notifications Strategy', Bell, [{name:'OneSignal Journeys',url:'https://onesignal.com/journeys'}], 'mobilenotificationsstrategy'),
      createTopic('User Feedback', MessageSquare, [{name:'Expo Store Review',url:'https://docs.expo.dev/versions/latest/sdk/storereview/'}], 'mobileuserfeedback'),
      createTopic('Reviews & Ratings', Target, [{name:'App Store Connect Replies',url:'https://developer.apple.com/app-store-connect/ratings-and-reviews/'}], 'mobilereviewsratings'),
      createTopic('Referral Programs', Users, [{name:'Branch Deep Linking',url:'https://branch.io/'}], 'mobilereferralprograms'),
      createTopic('Roadmap', Globe, [{name:'Apple WWDC Highlights',url:'https://developer.apple.com/wwdc/'}], 'mobileroadmap'),
      createTopic('Scaling Strategy', BarChart, [{name:'Mobile Release Trains',url:'https://blog.pragmaticengineer.com/mobile-release-trains/'}], 'mobilescalingstrategy'),
      createTopic('Presentation Prep', Presentation),
      createTopic('Pitch Deck', Presentation),
    ]
  }
];

export const mobileHackathonTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0',
    topics: [
      createTopic('Idea Definition', Rocket, [{name:'Apple HIG',url:'https://developer.apple.com/design/human-interface-guidelines/'},{name:'YC RFS',url:'https://www.ycombinator.com/rfs'}], 'mobileideadefinition'),
      createTopic('MVP Features', CheckSquare, [{name:'WatermelonDB Sync',url:'https://nozbe.github.io/WatermelonDB/Advanced/Sync.html'}], 'mobilemvpfeatures'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1',
    topics: [
      createTopic('PRD', FileText, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'}], 'mobileprd'),
      createTopic('User Flows', Globe, [{name:'PageFlows Mobile',url:'https://pageflows.com/ios/'}], 'mobileuserflows'),
      createTopic('Design System', PenTool, [{name:'NativeWind (Tailwind)',url:'https://www.nativewind.dev/'},{name:'UI Kitten',url:'https://akveo.github.io/react-native-ui-kitten/'}], 'mobiledesignsystem'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2',
    topics: [
      createTopic('Tech Stack', Settings, [{name:'Expo CNG',url:'https://docs.expo.dev/workflow/continuous-native-generation/'}], 'mobiletechstackselection'),
      createTopic('Database', Database, [{name:'PostgREST',url:'https://postgrest.org/'}], 'mobiledatabase'),
      createTopic('Auth (Optional)', Key, [{name:'Expo Apple Auth',url:'https://docs.expo.dev/versions/latest/sdk/apple-authentication/'}], 'mobileauth'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3',
    topics: [
      createTopic('Backend', Server, [{name:'PgBouncer',url:'https://www.pgbouncer.org/'}], 'mobilebackend'),
      createTopic('Frontend', Box, [{name:'FlashList (Shopify)',url:'https://shopify.github.io/flash-list/'}], 'mobilefrontendui'),
      createTopic('Demo Data', Database, [{name:'Falso (Mock Data)',url:'https://ngneat.github.io/falso/'}], 'mobiledemodata'),
      createTopic('Play Store Mockups', Smartphone, [{name:'Figma Store Templates',url:'https://www.figma.com/community/tag/app-store'}], 'mobileplaystoremockups'),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5',
    topics: [
      createTopic('Pitch Deck', Presentation, [{name:'Sequoia Pitch Deck',url:'https://www.sequoiacap.com/article/writing-a-business-plan-pitch-deck/'}], 'mobilepitchdeck'),
      createTopic('Demo Script', FileText, [{name:'Loom',url:'https://www.loom.com/'}], 'mobiledemoscript'),
      createTopic('Submission Checklist', CheckSquare, [{name:'Devpost Guides',url:'https://devpost.com/'}], 'mobilesubmissionchecklist'),
      createTopic('Presentation Prep', Presentation),
    ]
  }
];

export const mobilePersonalTaxonomy: Category[] = [
  {
    id: 'discovery',
    name: 'PHASE 1 — DISCOVERY',
    topics: [
      createTopic('PRD', FileText, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'}], 'mobileprd'),
      createTopic('User Research', Rocket, [{name:'Whimsical',url:'https://whimsical.com/'},{name:'FigJam',url:'https://www.figma.com/figjam/'},{name:'Mobbin UX Patterns',url:'https://mobbin.com/'}], 'mobileuserresearch'),
      createTopic('Design System', PenTool, [{name:'NativeWind (Tailwind)',url:'https://www.nativewind.dev/'},{name:'UI Kitten',url:'https://akveo.github.io/react-native-ui-kitten/'}], 'mobiledesignsystem'),
    ]
  },
  {
    id: 'architecture',
    name: 'PHASE 2 — ARCHITECTURE',
    topics: [
      createTopic('Tech Stack', Settings, [{name:'Expo CNG',url:'https://docs.expo.dev/workflow/continuous-native-generation/'}], 'mobiletechstackselection'),
      createTopic('Auth', Key, [{name:'Expo Apple Auth',url:'https://docs.expo.dev/versions/latest/sdk/apple-authentication/'}], 'mobileauth'),
      createTopic('Database', Database, [{name:'PostgREST',url:'https://postgrest.org/'}], 'mobiledatabase'),
    ]
  },
  {
    id: 'development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Backend', Server, [{name:'PgBouncer',url:'https://www.pgbouncer.org/'}], 'mobilebackend'),
      createTopic('Push Notifications', Bell, [{name:'Expo Push Tutorial',url:'https://docs.expo.dev/push-notifications/push-notifications-setup/'}], 'mobilepushnotificationsimplementation'),
      createTopic('Analytics', BarChart, [{name:'PostHog Telemetry',url:'https://posthog.com/docs/libraries/react-native'}], 'mobileanalyticsevents'),
    ]
  },
  {
    id: 'production',
    name: 'PHASE 4 — PRODUCTION',
    topics: [
      createTopic('Security', Shield, [{name:'React Native Certificate Pinning',url:'https://github.com/MaxToyberman/react-native-ssl-pinning'}], 'mobilesecurity'),
      createTopic('Performance', Zap, [{name:'React Native Reanimated',url:'https://docs.swmansion.com/react-native-reanimated/'}], 'mobileperformanceoptimization'),
      createTopic('Infrastructure', Cloud, [{name:'Expo Image Caching',url:'https://docs.expo.dev/versions/latest/sdk/image/'}], 'mobileinfrastructure'),
      createTopic('Play Store Setup', Smartphone, [{name:'Google Play Data Safety',url:'https://support.google.com/googleplay/android-developer/answer/10787469'}], 'mobileplaystoresetup'),
      createTopic('Privacy Policy', FileText, [{name:'Termly Privacy Generator',url:'https://termly.io/'}], 'mobileprivacypolicy'),
    ]
  },
  {
    id: 'growth',
    name: 'PHASE 5 — GROWTH',
    topics: [
      createTopic('Feedback', MessageSquare, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilefeedback'),
      createTopic('Roadmap', Globe, [{name:'Apple WWDC Highlights',url:'https://developer.apple.com/wwdc/'}], 'mobileroadmap'),
      createTopic('Presentation Prep', Presentation),
      createTopic('Pitch Deck', Presentation),
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
          createTopic('Ads', DollarSign, [{name:'Google AdMob',url:'https://admob.google.com/'}], 'mobileads'),
          createTopic('Demo Data', Database, [{name:'Falso (Mock Data)',url:'https://ngneat.github.io/falso/'}], 'mobiledemodata'),
          createTopic('Play Store Mockups', Smartphone, [{name:'Figma Store Templates',url:'https://www.figma.com/community/tag/app-store'}], 'mobileplaystoremockups'),
          createTopic('Multi-language', Globe, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilemultilanguage'),
          createTopic('Subscription Billing', DollarSign, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilesubscriptionbilling'),
          createTopic('Referral Programs', Users, [{name:'Branch Deep Linking',url:'https://branch.io/'}], 'mobilereferralprograms'),
          createTopic('Wearables', Watch, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilewearables'),
          createTopic('Widgets', Box, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilewidgets'),
          createTopic('Background Services', Settings, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'mobilebackgroundservices'),
          createTopic('Bluetooth', Bluetooth, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilebluetooth'),
          createTopic('NFC', Smartphone, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilenfc'),
          createTopic('Camera', Smartphone, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilecamera'),
          createTopic('Location Services', Map, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'mobilelocationservices'),
          createTopic('Auth', Key, [{name:'Expo Apple Auth',url:'https://docs.expo.dev/versions/latest/sdk/apple-authentication/'}], 'mobileauth')
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
