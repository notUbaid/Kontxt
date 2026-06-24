const fs = require('fs');

const fallbackPath = 'src/data/content/fallback.ts';
let content = fs.readFileSync(fallbackPath, 'utf8');

const linkGroups = [
  // PHASE 3
  {
    keys: ['apis'],
    links: [
      '- [Axios Documentation](https://axios-http.com/docs/intro)',
      '- [React Query: Network Fetching & Caching](https://tanstack.com/query/latest/docs/react/overview)'
    ]
  },
  {
    keys: ['media-uploads'],
    links: [
      '- [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)',
      '- [AWS S3 Presigned URLs for Mobile](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html)'
    ]
  },
  {
    keys: ['maps-location'],
    links: [
      '- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)',
      '- [React Native Maps](https://github.com/react-native-maps/react-native-maps)'
    ]
  },
  {
    keys: ['device-permissions'],
    links: [
      '- [Apple HIG: Requesting Permissions](https://developer.apple.com/design/human-interface-guidelines/patterns/requesting-permission/)',
      '- [Android App Permissions Best Practices](https://developer.android.com/training/permissions/usage-notes)'
    ]
  },
  {
    keys: ['offline-features'],
    links: [
      '- [WatermelonDB: Offline-First Apps](https://watermelondb.dev/)',
      '- [React Native NetInfo](https://github.com/react-native-netinfo/react-native-netinfo)'
    ]
  },
  {
    keys: ['analytics-events'],
    links: [
      '- [PostHog: Event Tracking](https://posthog.com/docs/integrate/client/react-native)',
      '- [Amplitude Event Taxonomy](https://amplitude.com/blog/data-taxonomy)'
    ]
  },
  {
    keys: ['error-handling'],
    links: [
      '- [Sentry for React Native](https://docs.sentry.io/platforms/react-native/)',
      '- [React Native Error Boundaries](https://reactnative.dev/docs/error-boundaries)'
    ]
  },
  {
    keys: ['push-notifications'],
    links: [
      '- [Expo Push Notifications](https://docs.expo.dev/push-notifications/overview/)',
      '- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)'
    ]
  },
  {
    keys: ['frontend-ui'],
    links: [
      '- [React Native Paper](https://callstack.github.io/react-native-paper/)',
      '- [Tailwind CSS for React Native (NativeWind)](https://www.nativewind.dev/)'
    ]
  },
  {
    keys: ['navigation'],
    links: [
      '- [React Navigation](https://reactnavigation.org/)',
      '- [Expo Router](https://docs.expo.dev/router/introduction/)'
    ]
  },
  {
    keys: ['state-management'],
    links: [
      '- [Zustand for React Native](https://github.com/pmndrs/zustand)',
      '- [Redux Toolkit](https://redux-toolkit.js.org/)'
    ]
  },
  // PHASE 4
  {
    keys: ['app-size-optimization'],
    links: [
      '- [Android App Bundles (AAB)](https://developer.android.com/guide/app-bundle)',
      '- [Reducing React Native App Size](https://reactnative.dev/docs/ram-bundles-inline-requires)'
    ]
  },
  {
    keys: ['crash-reporting'],
    links: [
      '- [Crashlytics for React Native](https://rnfirebase.io/crashlytics/usage)',
      '- [Instabug Crash Reporting](https://instabug.com/crash-reporting)'
    ]
  },
  {
    keys: ['battery-optimization'],
    links: [
      '- [Android Vitals: Battery Usage](https://developer.android.com/topic/performance/vitals/battery)',
      '- [Optimizing React Native Performance](https://reactnative.dev/docs/performance)'
    ]
  },
  // PHASE 5
  {
    keys: ['app-store-setup', 'play-store-setup'],
    links: [
      '- [App Store Connect Guide](https://developer.apple.com/app-store-connect/)',
      '- [Google Play Console Help](https://support.google.com/googleplay/android-developer/answer/9859152)'
    ]
  },
  {
    keys: ['feature-graphics', 'screenshots', 'app-icons'],
    links: [
      '- [Apple HIG: App Icons](https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons/)',
      '- [Google Play Store Assets Guidelines](https://support.google.com/googleplay/android-developer/answer/1078870)'
    ]
  },
  {
    keys: ['store-listing-seo', 'content-rating'],
    links: [
      '- [AppTweak: App Store Optimization (ASO)](https://www.apptweak.com/)',
      '- [IARC Content Ratings](https://www.globalratings.com/)'
    ]
  },
  // PHASE 6
  {
    keys: ['test-tracks', 'beta-testing'],
    links: [
      '- [TestFlight (Apple)](https://developer.apple.com/testflight/)',
      '- [Google Play Testing Tracks](https://support.google.com/googleplay/android-developer/answer/9845334)'
    ]
  },
  {
    keys: ['release-checklist'],
    links: [
      '- [React Native Deployment Checklist](https://reactnative.dev/docs/publishing-to-app-store)',
      '- [Expo Application Services (EAS) Submit](https://docs.expo.dev/submit/introduction/)'
    ]
  },
  {
    keys: ['notifications-strategy', 'user-feedback', 'reviews-ratings', 'referral-programs'],
    links: [
      '- [Expo In-App Reviews](https://docs.expo.dev/versions/latest/sdk/store-review/)',
      '- [RevenueCat: Mobile Growth Strategies](https://www.revenuecat.com/blog/growth/)'
    ]
  }
];

let updatedCount = 0;

linkGroups.forEach(group => {
  const linksMarkdown = `\n\n## 📚 Context Links\n${group.links.join('\\n')}`;
  
  group.keys.forEach(key => {
    const regex = new RegExp(`('${key}': \\\`[\\s\\S]*?)(?=\\\`,)`);
    const match = content.match(regex);
    if (match) {
      if (!match[1].includes('📚 Context Links')) {
        content = content.replace(regex, match[1] + linksMarkdown);
        updatedCount++;
      } else {
        console.log(`Key ${key} already has context links.`);
      }
    } else {
      console.log(`WARNING: Key ${key} not found.`);
    }
  });
});

fs.writeFileSync(fallbackPath, content, 'utf8');
console.log(`Successfully added Context Links to ${updatedCount} Phase 3-6 topics.`);
