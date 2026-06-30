import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  Layers, Server, Activity, Zap, Search, Key, Target, Users, BarChart, 
  DollarSign, PenTool, MessageSquare, Presentation, AlertCircle, Map, Bluetooth,
  CreditCard, Bell, Cloud, Smartphone, Watch, Lock, BookOpen,
  MonitorSmartphone, Navigation, RefreshCw, HelpCircle
} from 'lucide-react';
import { type Category, createTopic } from './types';

const filterTaxonomy = (baseTaxonomy: Category[], keep: string[], hide: string[]) => {
  return baseTaxonomy.map(cat => {
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



export const mobileProductionTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 — DISCOVERY & VALIDATION',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Idea Definition', Rocket, [{name:'Apple HIG',url:'https://developer.apple.com/design/human-interface-guidelines/'},{name:'YC RFS',url:'https://www.ycombinator.com/rfs'}], 'mobileideadefinition'),
      createTopic('Problem Statement', AlertCircle, [{name:'Material Design',url:'https://m3.material.io/'},{name:'Mobbin UX',url:'https://mobbin.com/'}], 'mobileproblemstatement'),
      createTopic('Target Audience', Users, [{name:'Sensor Tower ASO',url:'https://sensortower.com/blog/app-store-optimization'}], 'mobiletargetaudience'),
      createTopic('Personas', Users, [{name:'HIG: Ergonomics',url:'https://developer.apple.com/design/human-interface-guidelines/layout'}], 'mobilepersonas'),
      createTopic('User Journey', Globe, [{name:'App Store Guidelines',url:'https://developer.apple.com/app-store/review/guidelines/'},{name:'Play Store Policies',url:'https://support.google.com/googleplay/android-developer/answer/9888053'}], 'mobileuserjourney'),
      createTopic('Competitor Analysis', BarChart, [{name:'AppMagic',url:'https://appmagic.rocks/'},{name:'Similarweb',url:'https://www.similarweb.com/'}], 'mobilecompetitoranalysis'),
      createTopic('Similar Apps', Layers, [{name:'Mobbin Patterns',url:'https://mobbin.com/'},{name:'PageFlows',url:'https://pageflows.com/'}], 'mobilesimilarapps'),
      createTopic('Store Research', Search, [], 'mobilestoreresearch'),
      createTopic('Feature Brainstorm', Zap, [], 'mobilefeaturebrainstorm'),
      createTopic('Feature Prioritization', BarChart, [{name:'RICE Framework',url:'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/'}], 'mobilefeatureprioritization'),
      createTopic('MVP', Rocket, [{name:'WatermelonDB Sync',url:'https://nozbe.github.io/WatermelonDB/Advanced/Sync.html'}], 'mobilemvp'),
      createTopic('Future Features', Layers, [{name:'RevenueCat Subscriptions',url:'https://www.revenuecat.com/'}], 'mobilefuturefeatures'),
      createTopic('Monetization Strategy', DollarSign, [{name:'RevenueCat',url:'https://www.revenuecat.com/'},{name:'Apple IAP Guidelines',url:'https://developer.apple.com/in-app-purchase/'}], 'mobilemonetizationstrategy'),
      createTopic('Product Metrics', Activity, [{name:'Amplitude Mobile',url:'https://amplitude.com/'},{name:'PostHog React Native',url:'https://posthog.com/docs/libraries/react-native'}], 'mobileproductmetrics'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name:'System Design Primer',url:'https://github.com/donnemartin/system-design-primer'}], 'mobileprd'),
      createTopic('User Flows', Globe, [{name:'PageFlows Mobile',url:'https://pageflows.com/ios/'}], 'mobileuserflows'),
      createTopic('App Navigation', Navigation, [{name:'Expo Router',url:'https://docs.expo.dev/router/introduction/'},{name:'React Navigation',url:'https://reactnavigation.org/'}], 'appnavigation'),
      createTopic('Wireframes', Box, [{name:'Figma Mobile Templates',url:'https://www.figma.com/community/tag/mobile'}], 'mobilewireframes'),
      createTopic('Branding', Target, [{name:'Apple App Icons',url:'https://developer.apple.com/design/human-interface-guidelines/app-icons'}], 'mobilebranding'),
      createTopic('Design System', PenTool, [{name:'NativeWind (Tailwind)',url:'https://www.nativewind.dev/'},{name:'UI Kitten',url:'https://akveo.github.io/react-native-ui-kitten/'}], 'mobiledesignsystem'),
      createTopic('Responsive Layouts', MonitorSmartphone, [], 'mobileresponsivelayouts'),
      createTopic('Platform Guidelines', Smartphone, [{name:'Apple HIG',url:'https://developer.apple.com/design/human-interface-guidelines/'},{name:'Material Design',url:'https://m3.material.io/'}], 'mobileplatformguidelines'),
      createTopic('Accessibility', Users, [{name:'React Native A11y',url:'https://reactnative.dev/docs/accessibility'}], 'mobileaccessibility'),
      createTopic('Loading States', Activity, [{name:'React Native Skeleton Content',url:'https://github.com/marcuz/react-native-skeleton-content'}], 'mobileloadingstates'),
      createTopic('Empty States', Box, [{name:'EmptyStates.com',url:'https://emptystat.es/'}], 'mobileemptystates'),
      createTopic('Error States', AlertCircle, [{name:'React Native NetInfo',url:'https://github.com/react-native-netinfo/react-native-netinfo'}], 'mobileerrorstates'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — ARCHITECTURE',
    topics: [
      createTopic('Platform Strategy', Smartphone, [{name:'React Native vs Swift',url:'https://reactnative.dev/'}], 'mobileplatformstrategy'),
      createTopic('Mobile Fundamentals', BookOpen, [{name:'React Native AppState',url:'https://reactnative.dev/docs/appstate'}], 'mobilefundamentals'),
      createTopic('Tech Stack', Settings, [{name:'Expo CNG',url:'https://docs.expo.dev/workflow/continuous-native-generation/'}], 'mobiletechstack'),
      createTopic('System Architecture', Layers, [], 'mobilesystemarchitecture'),
      createTopic('Environment Configuration', Settings, [], 'mobileenvironmentconfiguration'),
      createTopic('Backend', Server, [{name:'PgBouncer',url:'https://www.pgbouncer.org/'}], 'mobilebackend'),
      createTopic('Database', Database, [{name:'PostgREST',url:'https://postgrest.org/'}], 'mobiledatabase'),
      createTopic('Authentication', Key, [{name:'Expo SecureStore',url:'https://docs.expo.dev/versions/latest/sdk/securestore/'},{name:'Supabase Auth React Native',url:'https://supabase.com/docs/guides/getting-started/tutorials/with-expo'}], 'mobileauthentication'),
      createTopic('API Strategy', Globe, [{name:'BFF Pattern',url:'https://samnewman.io/patterns/architectural/bff/'}], 'mobileapistrategy'),
      createTopic('State Management', Layers, [{name:'TanStack Query Persist',url:'https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient'}], 'mobilestatemanagement'),
      createTopic('Local Storage', Database, [{name:'WatermelonDB',url:'https://nozbe.github.io/WatermelonDB/'},{name:'React Native MMKV',url:'https://github.com/mrousavy/react-native-mmkv'}], 'mobilelocalstorage'),
      createTopic('Offline Strategy', Cloud, [{name:'WatermelonDB Sync',url:'https://nozbe.github.io/WatermelonDB/Advanced/Sync.html'}], 'mobileofflinestrategy'),
      createTopic('Push Notifications', Bell, [{name:'Expo Push Notifications',url:'https://docs.expo.dev/push-notifications/overview/'}], 'mobilepushnotifications'),
      createTopic('Deep Linking', Globe, [{name:'Universal Links (iOS)',url:'https://developer.apple.com/ios/universal-links/'},{name:'App Links (Android)',url:'https://developer.android.com/training/app-links'}], 'mobiledeeplinking'),
      createTopic('File Storage', Cloud, [{name:'React Native Image Crop Picker',url:'https://github.com/ivpusic/react-native-image-crop-picker'}], 'mobilefilestorage'),
      createTopic('Analytics Strategy', BarChart, [{name:'Apple ATT Guidelines',url:'https://developer.apple.com/app-store/user-privacy-and-data-use/'}], 'mobileanalyticsstrategy'),
      createTopic('Cost Estimation', DollarSign, [{name:'EAS Build Pricing',url:'https://expo.dev/pricing'}], 'mobilecostestimation'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Frontend', Box, [{name:'FlashList (Shopify)',url:'https://shopify.github.io/flash-list/'}], 'mobilefrontend'),
      createTopic('Navigation', Smartphone, [{name:'Expo Router Auth Layouts',url:'https://docs.expo.dev/router/reference/authentication/'}], 'mobilenavigation'),
      createTopic('App Lifecycle', RefreshCw, [], 'mobileapplifecycle'),
      createTopic('State Management Impl', Layers, [{name:'Zustand',url:'https://docs.pmnd.rs/zustand/getting-started/introduction'},{name:'TanStack Query',url:'https://tanstack.com/query/latest'}], 'mobilestatemanagementimplementation'),
      createTopic('Backend Integration', Server, [{name:'RevenueCat Webhooks',url:'https://www.revenuecat.com/docs/integrations/webhooks'}], 'mobilebackendimplementation'),
      createTopic('APIs', Globe, [{name:'Axios Interceptors',url:'https://axios-http.com/docs/interceptors'}], 'mobileapis'),
      createTopic('Database Setup', Database, [{name:'Supabase React Native',url:'https://supabase.com/docs/reference/javascript/installing'}], 'mobiledatabaseimplementation'),
      createTopic('Auth Implementation', Key, [{name:'Expo Apple Auth',url:'https://docs.expo.dev/versions/latest/sdk/apple-authentication/'}], 'mobileauthimplementation'),
      createTopic('Offline Features', Cloud, [{name:'WatermelonDB Observable',url:'https://nozbe.github.io/WatermelonDB/Implementation/Observables.html'}], 'mobileofflinefeatures'),
      createTopic('Push Notifications Impl', Bell, [{name:'Expo Push Tutorial',url:'https://docs.expo.dev/push-notifications/push-notifications-setup/'}], 'mobilepushnotificationsimplementation'),
      createTopic('Payments', CreditCard, [{name:'React Native Purchases (RevenueCat)',url:'https://www.revenuecat.com/docs/getting-started/installation/reactnative'}], 'mobilepayments'),
      createTopic('Maps & Location', Map, [{name:'React Native Maps',url:'https://github.com/react-native-maps/react-native-maps'}], 'mobilemapslocation'),
      createTopic('Media Uploads', Cloud, [{name:'Expo Image Manipulator',url:'https://docs.expo.dev/versions/latest/sdk/imagemanipulator/'}], 'mobilemediauploads'),
      createTopic('App Permissions Strategy', Lock, [{name:'Expo Location',url:'https://docs.expo.dev/versions/latest/sdk/location/'}], 'mobileapppermissionsstrategy'),
      createTopic('App Settings', Settings, [], 'mobileappsettings'),
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
      createTopic('Rate Limiting', Shield, [{name:'Upstash Redis',url:'https://upstash.com/'}], 'mobileratelimiting'),
      createTopic('Feature Flags', Zap, [], 'mobilefeatureflags'),
      createTopic('Observability', Activity, [{name:'Sentry Source Maps Expo',url:'https://docs.sentry.io/platforms/react-native/manual-setup/expo/'}], 'mobileobservability'),
      createTopic('Performance Optimization', Zap, [{name:'React Native Reanimated',url:'https://docs.swmansion.com/react-native-reanimated/'}], 'mobileperformanceoptimization'),
      createTopic('CI/CD', Settings, [{name:'EAS Build GitHub Actions',url:'https://docs.expo.dev/build/building-on-ci/'}], 'mobilecicd'),
      createTopic('Infrastructure', Server, [{name:'Expo Image Caching',url:'https://docs.expo.dev/versions/latest/sdk/image/'}], 'mobileinfrastructure'),
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
      createTopic('App Store Optimization', Search, [{name:'AppTweak ASO',url:'https://www.apptweak.com/'}], 'mobileappstoreoptimization'),
      createTopic('Privacy Policy', FileText, [{name:'Termly Privacy Generator',url:'https://termly.io/'}], 'mobileprivacypolicy'),
      createTopic('Terms of Service', FileText, [{name:'Apple EULA Guidelines',url:'https://developer.apple.com/support/app-store/'}], 'mobiletermsofservice'),
      createTopic('Content Rating', Shield, [{name:'IARC Content Ratings',url:'https://www.globalratings.com/'}], 'mobilecontentrating'),
      createTopic('Beta Testing', Users, [{name:'Instabug React Native',url:'https://instabug.com/platforms/react-native'}], 'mobilebetatesting'),
      createTopic('Release Checklist', CheckSquare, [{name:'App Store Phased Release',url:'https://developer.apple.com/help/app-store-connect/update-your-app/release-a-version-update-in-phases'}], 'mobilereleasechecklist'),
    ]
  },
  {
    id: 'phase-6',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Analytics', BarChart, [{name:'Amplitude Cohort Analysis',url:'https://amplitude.com/behavioral-cohorts'}], 'mobileanalytics'),
      createTopic('Retention', Users, [{name:'OneSignal Push',url:'https://onesignal.com/'}], 'mobileretention'),
      createTopic('Notification Strategy', Bell, [{name:'OneSignal Journeys',url:'https://onesignal.com/journeys'}], 'mobilenotificationsstrategy'),
      createTopic('Reviews & Ratings', Target, [{name:'App Store Connect Replies',url:'https://developer.apple.com/app-store-connect/ratings-and-reviews/'}], 'mobilereviewsratings'),
      createTopic('User Feedback', MessageSquare, [{name:'Expo Store Review',url:'https://docs.expo.dev/versions/latest/sdk/storereview/'}], 'mobileuserfeedback'),
      createTopic('Referral Programs', Users, [{name:'Branch Deep Linking',url:'https://branch.io/'}], 'mobilereferralprograms'),
      createTopic('Roadmap', Globe, [{name:'Apple WWDC Highlights',url:'https://developer.apple.com/wwdc/'}], 'mobileroadmap'),
      createTopic('Scaling Strategy', BarChart, [{name:'Mobile Release Trains',url:'https://blog.pragmaticengineer.com/mobile-release-trains/'}], 'mobilescalingstrategy'),
    ]
  }
];


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
          createTopic('Wearables', Watch, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilewearables'),
          createTopic('Widgets', Box, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilewidgets'),
          createTopic('Background Services', Settings, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'mobilebackgroundservices'),
          createTopic('Bluetooth', Bluetooth, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilebluetooth'),
          createTopic('NFC', Smartphone, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilenfc'),
          createTopic('Camera', Smartphone, [{name:'Expo Docs',url:'https://docs.expo.dev/'},{name:'React Native Directory',url:'https://reactnative.directory/'}], 'mobilecamera'),
          createTopic('Location Services', Map, [{name:'tRPC',url:'https://trpc.io/'},{name:'GraphQL',url:'https://graphql.org/'},{name:'Postman',url:'https://www.postman.com/'}], 'mobilelocationservices'),
          createTopic('UI Polish', PenTool, [], 'mobileuipolish'),
          createTopic('Animations', Zap, [], 'mobileanimations'),
          createTopic('Microinteractions', Activity, [], 'mobilemicrointeractions'),
          createTopic('Native Device Features', Smartphone, [], 'mobilenativedevicefeatures')
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
          createTopic('Submission Checklist', CheckSquare),
          createTopic('Presentation Prep', Presentation)
        ]
      };
    }
    return cat;
  })
];

export const mobileHackathonTaxonomy: Category[] = filterTaxonomy(mobileCustomTaxonomy, ['Welcome', 'Idea Definition', 'MVP', 'PRD', 'Design System', 'UI Polish', 'Animations', 'Loading States', 'Microinteractions', 'Tech Stack', 'Database Setup', 'Auth Implementation', 'Backend Integration', 'Frontend', 'Native Device Features', 'App Permissions Strategy', 'Demo Data', 'Play Store Mockups', 'Pitch Deck', 'Demo Script', 'Submission Checklist', 'Presentation Prep'], []);

export const mobilePersonalTaxonomy: Category[] = filterTaxonomy(mobileCustomTaxonomy, ['Welcome', 'Idea Definition', 'PRD', 'Platform Guidelines', 'Design System', 'Responsive Layouts', 'App Navigation', 'Tech Stack', 'State Management Impl', 'Database', 'Authentication', 'Offline Strategy', 'Frontend', 'App Lifecycle', 'Backend', 'App Permissions Strategy', 'Push Notifications', 'Testing', 'Security', 'Performance Optimization', 'Play Store Setup', 'App Store Setup', 'Privacy Policy', 'Analytics', 'User Feedback', 'Roadmap', 'Presentation Prep', 'Pitch Deck', 'Demo Script', 'Submission Checklist'], []);
