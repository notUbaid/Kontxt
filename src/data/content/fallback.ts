export const fallbackContent: Record<string, string> = {
  'mobiletesting': `# Testing Strategy

**Estimated Time:** 3+ Hours

---

## Why this matters
Every time you add a new feature to a mobile app, you risk breaking an old one. Because mobile apps require users to manually download updates from the App Store, pushing a broken update is a catastrophe. Automated testing prevents this.

## Strategic Guidance

### Hackathon Mode
Zero automated tests. Your test is "Does it work when I click it right now?"

### Personal Project
Write a few unit tests for your most complex utility functions (like date formatting or math calculations) using Jest. Don't bother with complex UI testing.

### Production SaaS
You must have a testing pyramid. Write Unit Tests (Jest) for all business logic. Write Component Tests (React Native Testing Library) to ensure buttons render correctly. Crucially, write End-to-End (E2E) tests using Detox or Maestro to physically simulate a user tapping through the core "Happy Path" on a virtual device before every release.

## AI Execution Phase
\`\`\`prompt
Act as a QA Engineer. I am using [Insert Testing Framework]. Write a unit test for a utility function that takes a date string and returns a human-readable format like "2 hours ago". Then, write a basic component test that verifies a 'Submit' button is disabled when the 'isLoading' prop is true.
\`\`\`

## Accountability Check
- [ ] I have automated tests for my most critical business logic.`,
  'mobilepayments': `# Payments & In-App Purchases (IAP)

**Estimated Time:** 3-5 Hours

---

## Why this matters
If you want to charge for digital goods (like premium features) in a mobile app, Apple and Google strictly require you to use their native In-App Purchase systems. If you try to bypass them with a Stripe web link, your app will be rejected. They take a 15-30% cut of all revenue.

## Strategic Guidance

### Hackathon Mode
Fake it. Create a button that says "Buy for $5" and just instantly unlock the feature.

### Personal Project
Skip IAP. It is incredibly tedious to set up sandbox testing accounts for Apple and Google. If you must charge, build a web app instead.

### Production SaaS
Do not write native IAP code yourself. Use RevenueCat or Superwall. They wrap the incredibly complex Apple/Google billing APIs and provide a single backend dashboard to manage subscriptions, handle refunds, and validate receipts securely. You must also build a "Restore Purchases" button, which is a strict App Store requirement.

## The Data We Need From You
**What library will you use to handle In-App Purchases? (e.g., RevenueCat)**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a Mobile Monetization Expert. I am using RevenueCat with [Insert Tech Stack]. Provide the code to fetch the current user's subscription status on app launch, and the code for a function that triggers the native purchase flow when they click 'Upgrade'.
\`\`\`

## Accountability Check
- [ ] I can successfully process a sandbox payment and unlock premium features.`,
  'mobilebackendimplementation': `# Backend Implementation

**Estimated Time:** Variable

---

## Why this matters
The backend handles the heavy lifting that the mobile device cannot (or should not) do. This includes complex data processing, calling third-party APIs (to keep API keys secret), and running scheduled cron jobs.

## Strategic Guidance

### Hackathon Mode
Write serverless Edge Functions (like Supabase Edge Functions) only for the specific parts of your app that require a hidden API key (like calling OpenAI). 

### Personal Project
Keep your backend logic simple. Validate incoming data, run the database query, and return the result.

### Production SaaS
Every backend endpoint must validate incoming data aggressively using a library like Zod. Never trust data sent from a mobile client. Ensure your API responses are lean; if the mobile app only needs 3 fields from a user profile, do not send the entire 50-field user object. This saves bandwidth and speeds up the app significantly.

## The Data We Need From You
**List the 3 most complex backend functions you need to write.**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] My core backend logic is deployed and securely handling requests.`,
  'mobiledatabaseimplementation': `# Database Implementation

**Estimated Time:** Variable

---

## Why this matters
Translating your ER diagram into actual code requires writing migrations, setting up foreign keys, and ensuring indexing is correct. Mistakes here will permanently corrupt your users' data.

## Strategic Guidance

### Hackathon Mode
Use the visual dashboard of Supabase or Firebase to create your tables. Skip writing SQL migrations. Add a few rows of dummy data manually so the frontend has something to fetch.

### Personal Project
Use an ORM like Prisma (if using a separate Node backend) to define your schema and push it to the database. It provides excellent type safety.

### Production SaaS
All schema changes must be version-controlled via migrations. If you are using Supabase directly from the mobile app, you MUST implement rigorous Row Level Security (RLS) policies using raw SQL. Ensure that `user_id` is automatically attached to every inserted row to prevent users from modifying data they do not own.

## AI Execution Phase
\`\`\`prompt
Act as a Database Engineer. I am using [Insert Database/ORM]. Provide the migration code or schema definition for my [Insert Entity] table. Include the necessary indexes for fast querying, and the SQL for a Row Level Security policy that ensures only the creator of the row can read or update it.
\`\`\`

## Accountability Check
- [ ] My database schema is live and secure.`,
  'mobileauth': `# Authentication Implementation

**Estimated Time:** 2-4 Hours

---

## Why this matters
Implementing auth on mobile requires navigating OAuth redirects, securely storing tokens in the device keychain, and handling token expiration. If implemented poorly, users will have to log in every single time they open the app, which is a guaranteed way to lose them.

## Strategic Guidance

### Hackathon Mode
Use a pre-built UI library like Firebase UI or Supabase Auth UI. It gives you a fully functioning login screen in 10 minutes.

### Personal Project
Implement a basic Email/Password flow. Use secure storage to save the session token so the user stays logged in.

### Production SaaS
You must implement Silent Authentication. When the app opens, it should check the secure storage for a token, validate it with the backend in the background, and seamlessly drop the user into the main app. If the token is expired, use a Refresh Token to get a new one without showing the login screen. Only force a re-login if the refresh token is also expired. You must also implement "Sign in with Apple" if using other OAuth providers on iOS.

## The Data We Need From You
**What auth providers are you actively implementing right now?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] Users can log in, close the app, reopen it, and still be logged in.`,
  'referral-programs': `# Referral Programs

**Estimated Time:** Ongoing

Leverage your existing user base to acquire new users organically, dramatically lowering your CAC (Customer Acquisition Cost).

### Program Design
1. **Incentives:** Offer a compelling two-sided reward (e.g., "Give $10, Get $10", or unlock a premium feature for both parties).
2. **Frictionless Sharing:** Use the native Share API (\`Share\` in React Native) to easily send personalized referral links via WhatsApp, SMS, or Twitter.
3. **Deep Linking:** Ensure the referral link opens the app directly to a welcoming screen that automatically applies the promo code via Branch.io or Firebase Dynamic Links.

\`\`\`input
What is the primary incentive for a user to invite a friend, and how does the referred friend benefit?
\`\`\`

\`\`\`prompt
Design a database schema and API flow for tracking a two-sided referral program where both the inviter and invitee receive a premium account credit upon successful signup.
\`\`\``,
  'reviews-ratings': `# Reviews & Ratings

**Estimated Time:** Ongoing

Boost your App Store ranking by strategically prompting happy users for reviews. Organic search ranking is heavily influenced by your average rating and volume.

### The Strategy
1. **Timing is Everything:** Never ask for a review when the app launches or crashes. Ask immediately after a positive moment (e.g., after they complete a task, win a level, or make a purchase).
2. **The Pre-Prompt:** Show a custom popup: "Are you enjoying the app?". If yes -> trigger native OS review prompt. If no -> redirect to an internal feedback form (intercepting negative reviews).
3. **Native APIs:** Use \`StoreReview\` from Expo or \`react-native-store-review\` to show the native rating dialog without leaving the app.

\`\`\`input
Identify the absolute best "positive moment" in your app's user flow to trigger a review request.
\`\`\`

\`\`\`prompt
Write a React Native hook using \`expo-store-review\` that implements a two-step review prompt strategy, ensuring the native review dialog is only shown to satisfied users after a specific action is completed.
\`\`\``,
  'user-feedback': `# User Feedback Loop

**Estimated Time:** Ongoing

Establish channels to actively listen to your users and iterate the product based on their needs.

### Implementation
1. **In-App Feedback:** Integrate a subtle "Send Feedback" button in settings or after key milestones.
2. **Community:** Build a Discord, Subreddit, or Facebook Group for your most passionate power users.
3. **Surveys:** Trigger short, one-question NPS (Net Promoter Score) surveys to active users after 30 days.

\`\`\`input
How will you categorize and prioritize feature requests vs bug reports coming from users?
\`\`\`

\`\`\`prompt
Write a standard operating procedure (SOP) for triaging user feedback received through an in-app support channel, including categorization tags and response SLAs.
\`\`\``,
  'notifications-strategy': `# Notifications Strategy

**Estimated Time:** Ongoing

Optimize push notifications to drive engagement without causing notification fatigue and churn.

### Best Practices
1. **Personalization:** "John liked your photo" performs drastically better than a generic "Someone interacted with your profile."
2. **Timing:** Send notifications in the user's local timezone at a time they are historically active.
3. **Actionability:** Deep link directly to the relevant screen; don't dump them on the home screen where they have to hunt for the context.
4. **Value-Driven:** Ensure every notification provides immediate value to the user, rather than just pulling them back for your own metrics.

\`\`\`input
Describe your transactional vs promotional push notification split. How do you ensure you aren't spamming users?
\`\`\`

\`\`\`prompt
Write a strategy document detailing how to use rich push notifications (with images and action buttons) to increase engagement for a social app, including fallback behavior.
\`\`\``,
  'release-checklist': `# Release Checklist

**Estimated Time:** 2 hours

Ensure every detail is perfect before submitting for final App Store and Play Store review to avoid launch day disasters.

### Pre-Submission Checklist
- [ ] Test the production build (\`Release\` variant) on a physical device, not just a simulator.
- [ ] Verify that new user registration and login work against the production database.
- [ ] Ensure all debug logs and development menus are stripped from the production bundle.
- [ ] Verify that Push Notification production certificates are active.
- [ ] Ensure "Sign in with Apple" works flawlessly (common rejection reason if missing when social auth is present).
- [ ] Provide App Review test account credentials in App Store Connect.

\`\`\`input
What is your target launch date, and who is responsible for the final sign-off before hitting "Submit for Review"?
\`\`\`

\`\`\`prompt
Generate a comprehensive pre-launch QA checklist covering authentication, payments, deep linking, and offline states for a React Native app.
\`\`\``,
  'beta-testing': `# Beta Testing

**Estimated Time:** 1-2 weeks

Conduct a structured beta test with external users to catch edge cases and validate the UX across different devices.

### Beta Strategy
1. **Recruitment:** Invite highly engaged users from your waitlist or community via a public TestFlight link or Google Play Open Testing.
2. **Feedback Loop:** Provide an easy, in-app way to submit feedback (e.g., shaking the device to open a bug reporter, or a simple form).
3. **Analytics:** Monitor crash rates, drop-offs, and session lengths closely during the beta period.

\`\`\`input
How many beta testers are you aiming for, and what specific flows are you asking them to stress-test?
\`\`\`

\`\`\`prompt
Write an invitation email to a waitlisted user asking them to join the TestFlight beta, setting clear expectations for bugs and explaining how to submit feedback.
\`\`\``,
  'test-tracks': `# Test Tracks

**Estimated Time:** 2 hours

Set up staging environments in the app stores to distribute builds to internal testers before public release.

### Workflow
1. **iOS (TestFlight):** Add internal team members to App Store Connect. Internal builds are available immediately. External testers require a brief Beta App Review from Apple.
2. **Android (Play Console):** Use the Internal Testing track for immediate distribution to a whitelist of up to 100 emails without going through Google review.

\`\`\`input
Who is on your initial internal testing roster, and what is your exact process for collecting bug reports from them?
\`\`\`

\`\`\`prompt
Outline the differences between Google Play Internal, Closed, and Open testing tracks, and recommend a strategy for a startup launching their first app.
\`\`\``,
  'content-rating': `# Content Rating

**Estimated Time:** 1 hour

Accurately declare your app's content to receive appropriate age ratings on both stores. This is a common rejection reason if filled out incorrectly.

### Process
1. **Play Store:** Fill out the IARC questionnaire in the Play Console. Answer truthfully regarding violence, profanity, and user-generated content.
2. **App Store:** Complete the Age Rating section in App Store Connect.
3. **User-Generated Content (UGC):** If your app has social features, you MUST have an EULA, a way to block abusive users, and a mechanism to report objectionable content, or Apple will reject your app instantly.

\`\`\`input
Does your app feature User-Generated Content (UGC)? If so, how will you implement the required reporting and blocking features to pass Apple Review?
\`\`\`

\`\`\`prompt
Generate an implementation checklist for User-Generated Content (UGC) compliance to avoid App Store rejection, including EULA requirements and reporting UI.
\`\`\``,
  'store-listing-seo': `# Store Listing SEO (ASO)

**Estimated Time:** 4 hours

App Store Optimization (ASO) is critical for organic discovery. Optimize your title, subtitle, and keyword fields to rank for high-intent search terms.

### Optimization Strategy
1. **Title:** Include your primary keyword in the app title naturally (e.g., "Kontxt - Habit Tracker").
2. **Subtitle (iOS) / Short Description (Android):** Use compelling copy that includes secondary keywords.
3. **Keyword Field (iOS):** Maximize the 100-character limit. Separate words by commas with no spaces. Do not repeat words already used in the Title or Subtitle.
4. **Long Description (Android):** The Play Store algorithm indexes the entire description. Include target keywords organically throughout the text (3-5 times).

\`\`\`input
What are the top 5 high-volume, low-competition keywords you are targeting for organic acquisition?
\`\`\`

\`\`\`prompt
Write an optimized App Store Subtitle (30 chars max) and a comma-separated keyword list (100 chars max) for a new habit tracking app, focusing on high-intent search terms.
\`\`\``,
  'feature-graphics': `# Feature Graphics

**Estimated Time:** 1 hour

Design the primary promotional graphic for the Google Play Store.

### Requirements
- **Dimensions:** \`1024x500\` pixels.
- **Content:** This is displayed at the top of your Play Store listing. It should be visually striking, feature your logo prominently, and avoid putting critical text near the edges where it might be cropped on different devices.
- **Video:** If you have a promo video, the feature graphic will act as the video thumbnail with a play button overlaid.

\`\`\`input
Describe the visual concept for your Feature Graphic. What branding elements will it include to capture attention in the Play Store?
\`\`\`

\`\`\`prompt
Generate a design brief for a graphic designer to create a Google Play Feature Graphic (1024x500), detailing safe zones, required branding, and the visual hierarchy.
\`\`\``,
  'app-icons': `# App Icons

**Estimated Time:** 2 hours

Design and generate perfectly sized app icons for all iOS and Android device resolutions.

### Requirements
1. **iOS:** Requires a flat, opaque \`1024x1024\` PNG. No transparency allowed.
2. **Android:** Requires Adaptive Icons (a foreground layer with transparency and a solid background layer) to support varying OEM shapes (circles, squarcles, teardrops).

### Tools
- Use Figma templates or an automated generator like \`expo-image-cli\` to output the required sizes automatically.

\`\`\`input
Describe the concept for your app icon. How does it stand out on a crowded home screen while maintaining strict brand identity?
\`\`\`

\`\`\`prompt
Write a script or list the exact CLI commands needed to generate all required iOS and Android app icon sizes from a single 1024x1024 source image using Expo's asset generation tools.
\`\`\``,
  'app-store-setup': `# App Store Setup

**Estimated Time:** 4 hours

Configure App Store Connect and the Apple Developer Portal.

### Configuration Checklist
- [ ] Enroll in the Apple Developer Program ($99/year).
- [ ] Create an App ID, configure Capabilities (Push Notifications, Sign In With Apple).
- [ ] Create Provisioning Profiles and Distribution Certificates.
- [ ] Create a new App record in App Store Connect.
- [ ] Upload your first build via Xcode or Expo EAS Submit.
- [ ] Set up TestFlight internal testing groups.

\`\`\`input
Who holds the Account Holder role in the Apple Developer Program, and how will you manage provisioning profiles (Manual vs Automatic)?
\`\`\`

\`\`\`prompt
Outline the complete process for generating an iOS Distribution Certificate, creating a Provisioning Profile, and submitting a build to TestFlight using Expo EAS Submit.
\`\`\``,
  'play-store-setup': `# Play Store Setup

**Estimated Time:** 4 hours

Configure your Google Play Console account and prepare your app for distribution.

### Configuration Checklist
- [ ] Create a Google Play Developer account and pay the $25 lifetime registration fee.
- [ ] Generate an Upload Keystore and configure Play App Signing.
- [ ] Set up the internal testing track and upload your first \`.aab\` file.
- [ ] Complete the Data Safety questionnaire accurately based on the data you collect.
- [ ] Configure pricing and distribution settings (countries/regions).

\`\`\`input
Who is managing the Google Play Developer account, and what is your strict security plan for storing the Android Keystore?
\`\`\`

\`\`\`prompt
Generate a step-by-step checklist for configuring Play App Signing and uploading the first Android App Bundle (.aab) using Expo EAS Build.
\`\`\``,
  'batteryoptimization': `# Battery Optimization

**Estimated Time:** 1-3 hours

---

## Overview
If a user notices their phone is hot and their battery drops 10% after using your app for 5 minutes, they will uninstall it immediately. Mobile apps must be deeply respectful of device resources. The primary culprits for battery drain are excessive network requests, high-accuracy GPS, and complex background tasks.

---

## Think First
**Is your app constantly "phoning home" in the background?**
\`\`\`input
Type your answer here...
\`\`\`
**Does your app keep the screen awake unnecessarily?**
\`\`\`input
Type your answer here...
\`\`\`
**Are you rendering complex animations that push the GPU to 100%?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Batching Network Requests:** Waking up the device's radio antenna uses massive power. Do not send 10 separate API requests to track 10 analytics events. Batch them and send them in one payload every 30 seconds.
- **GPS Accuracy:** Only use Accuracy.Highest (which uses power-hungry GPS hardware) for turn-by-turn navigation. For everything else (weather, finding nearby restaurants), use Accuracy.Balanced or Accuracy.Low (which uses efficient WiFi/Cellular triangulation).
- **Background Tasks:** Avoid running JavaScript in the background unless absolutely necessary. Rely on native OS background fetching mechanisms or Push Notifications to wake the app up only when data changes.

---

## Common Mistakes
- **Memory Leaks:** A useEffect that creates a setInterval but forgets to clearInterval on unmount. The interval continues running forever, draining the CPU silently.
- **Unoptimized Re-renders:** A complex UI component that re-renders 60 times a second due to poor state management, keeping the CPU pegged at 100%.
- **Leaving Sensors On:** Activating the camera or location services and forgetting to turn them off when the user navigates to a different screen.

---

## Examples
- **The Smart Polling:** An app needs to check for new messages. Instead of polling the server every 1 second (killing the battery), it uses WebSockets or Push Notifications so the server pushes data *only* when necessary.

---

## AI Prompt
\`\`\`prompt
I am optimizing a React Native app for battery life. Identify the top 3 causes of battery drain in React Native. Provide a code example of how to properly use a 'useEffect' cleanup function to prevent memory leaks with setIntervals. Explain the difference between location accuracy levels in 'expo-location' regarding battery usage.
\`\`\`

---

## Validation Checklist
- [ ] All useEffect hooks that set intervals or event listeners have strict cleanup functions.
- [ ] Location tracking uses the lowest acceptable accuracy setting.
- [ ] Network requests (like analytics) are batched rather than sent individually.
- [ ] The app uses WebSockets or Push Notifications instead of aggressive HTTP polling.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/hooks/useOptimizedLocation.ts (Example)
**Purpose:** Ensures hardware resources are used efficiently.
**Contents:** Code managing sensors and background tasks to prioritize battery life.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With the app optimized perfectly for a single user, it's time to ensure it can handle millions. Move to **Scalability**.`,
  'appsizeoptimization': `# App Size Optimization

**Estimated Time:** 2-4 hours

---

## Overview
Users will not download your app if it is 300MB. In emerging markets with expensive data plans, or users with full iPhones, a massive app size results in immediate abandonment. Optimizing your bundle size increases your download conversion rate directly.

---

## Think First
**What are the heaviest assets currently bundled inside your app?**
\`\`\`input
Type your answer here...
\`\`\`
**Are you importing entire massive libraries (like lodash or moment.js) when you only need one function?**
\`\`\`input
Type your answer here...
\`\`\`
**Have you actually inspected your JavaScript bundle?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Asset Offloading:** Do not bundle heavy videos, massive 4K background images, or large JSON datasets inside the app binary. Host them on a CDN (like Supabase Storage) and fetch them dynamically when the app loads.
- **Hermes Engine:** Ensure the Hermes JavaScript engine is enabled (it is by default in modern Expo). Hermes pre-compiles JavaScript into bytecode, making the app smaller, start faster, and use less memory.
- **Bundle Analysis:** Use tools like react-native-bundle-visualizer to see exactly which NPM packages are bloating your app. Replace heavy libraries with lightweight alternatives (e.g., date-fns instead of moment).

---

## Common Mistakes
- **Importing Full Libraries:** Doing import _ from 'lodash' includes the entire massive library. Use import debounce from 'lodash/debounce' to only bundle the specific function.
- **Unoptimized Images:** Bundling raw, uncompressed PNGs. Run all static assets through tools like ImageOptim or TinyPNG before adding them to your assets/ folder.
- **Duplicate Fonts:** Bundling the same font file multiple times under different names.

---

## Examples
- **The Diet:** You run the bundle visualizer and notice lottie-react-native is taking up 4MB, but you only use it for one tiny animation. You replace it with a simple CSS animation, instantly shaving 4MB off the app store download.

---

## AI Prompt
\`\`\`prompt
I am optimizing the bundle size of my Expo React Native app. Provide a checklist of techniques to reduce the final .aab and .ipa file sizes. Explain how to use the 'expo-optimize' CLI command for assets, how to ensure Hermes is enabled, and recommend lightweight alternatives for heavy libraries like 'moment.js'.
\`\`\`

---

## Validation Checklist
- [ ] Hermes engine is explicitly enabled in app.json.
- [ ] All bundled images have been compressed (e.g., via TinyPNG or expo-optimize).
- [ ] Massive libraries (moment, lodash) have been removed or tree-shaken.
- [ ] Large media files are fetched remotely from a CDN, not bundled locally.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** app.json & package.json (updated)
**Purpose:** Ensures the leanest possible binary for the App Store.
**Contents:** Hermes configuration and optimized dependency list.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
A small app is good, but it must also respect the user's phone. Time for **Battery Optimization**.`,
  'crashreporting': `# Crash Reporting

**Estimated Time:** 2-3 hours

---

## Overview
No matter how much you test, your app will crash in production. Users have weird devices, spotty networks, and unpredictable behavior. Without Crash Reporting, a crash just results in a 1-star review saying "It's broken." With Crash Reporting, you get the exact line of code that caused the failure.

---

## Think First
**If a user opens the app and it immediately closes, how will you find out?**
\`\`\`input
Type your answer here...
\`\`\`
**Are you logging React rendering errors (JS crashes) or Native module errors (Java/Swift crashes)?**
\`\`\`input
Type your answer here...
\`\`\`
**Does your reporting tool capture the breadcrumbs (the button clicks leading up to the crash)?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **The Tool:** Sentry is currently the industry standard for React Native. Firebase Crashlytics is also excellent and free. Both capture JS errors, Native crashes, and promise rejections.
- **Source Maps:** Minified React Native code is unreadable (e.g., Error at a.b in main.jsbundle). You MUST upload your Source Maps to Sentry during the build process so the dashboard shows the actual file and line number.
- **User Context:** Always attach the user_id to the crash report so you can email the exact user who experienced the crash to apologize and tell them it's fixed.

---

## Common Mistakes
- **Forgetting Source Maps:** Installing Sentry but failing to configure the Webpack/Metro plugin to upload source maps. Your crash reports will be completely useless.
- **Alert Fatigue:** Failing to ignore non-fatal, expected errors (like "Network Request Failed"). Your Slack channel will be spammed, and you will eventually ignore real crashes.

---

## Examples
- **The Silent Killer:** A user on a Samsung S8 with a specific accessibility setting triggers a null pointer exception. Sentry catches it, groups it, and shows you exactly what they tapped right before the app died.

---

## AI Prompt
\`\`\`prompt
I am setting up Sentry in an Expo React Native app. Generate the initialization code for Sentry. Explain the exact EAS Build configuration (app.json / eas.json) required to automatically upload source maps to Sentry so my production stack traces are readable.
\`\`\`

---

## Validation Checklist
- [ ] Sentry or Crashlytics SDK is initialized at the root of the app.
- [ ] Source maps are successfully uploading during the release build process.
- [ ] A forced test crash (throw new Error('Test')) successfully appears in the dashboard.
- [ ] User IDs are securely attached to the crash context.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** App.tsx / sentry.config.js
**Purpose:** Ensures total visibility into fatal errors.
**Contents:** Crash reporter initialization and build-time source map configuration.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
Beyond just crashes, you need proactive **Monitoring** to ensure your APIs and services are healthy.`,
  'errorhandling': `# Error Handling

**Estimated Time:** 2-4 hours

---

## Overview
Mobile apps fail constantly. APIs go down, memory runs out, and edge cases are hit. Good error handling prevents your app from closing abruptly (crashing) and instead guides the user safely back to a working state while reporting the failure to developers.

---

## Think First
**What happens if the server returns a 500 error on the home screen?**
\`\`\`input
Type your answer here...
\`\`\`
**How do you catch errors that happen deep inside a component's render cycle?**
\`\`\`input
Type your answer here...
\`\`\`
**Are you distinguishing between user errors (wrong password) and system errors (database down)?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Global Error Boundaries:** Wrap your entire React Native navigation tree in an Error Boundary. If a component throws an unhandled error, the Boundary catches it and displays a friendly "Oops, something went wrong" screen with a "Reload App" button, instead of a fatal crash.
- **Crash Reporting:** Integrate Sentry. When a user experiences a fatal error in production, Sentry captures the exact stack trace, device model, OS version, and the sequence of API calls that led up to the crash.
- **API Interceptors:** Use Axios interceptors or React Query global callbacks to catch all 401 (Unauthorized) errors and automatically redirect the user to the login screen.

---

## Common Mistakes
- **Naked Try/Catch:** Wrapping an API call in a try/catch but leaving the catch empty. The user taps a button, nothing happens, and they think the app is broken. Always show a UI toast or alert.
- **Exposing Stack Traces:** Showing raw SQL errors or Javascript stack traces to the end user. It looks unprofessional and exposes security vulnerabilities.
- **Ignoring Promise Rejections:** Forgetting to handle .catch() on background promises, leading to silent failures that are impossible to debug.

---

## Examples
- **Graceful Degradation:** An API request to fetch recommended friends fails. Instead of breaking the whole screen, that specific section shows a polite "Unable to load recommendations right now" message while the rest of the app functions normally.

---

## AI Prompt
\`\`\`prompt
I am building a React Native app. Generate a robust React Error Boundary component that catches rendering errors. When an error occurs, it should log the error to Sentry, and display a beautiful fallback UI to the user with a 'Restart App' button (using Expo Updates to reload the JS bundle).
\`\`\`

---

## Validation Checklist
- [ ] An Error Boundary wraps the root application layout.
- [ ] Sentry or an equivalent crash reporter is installed and configured.
- [ ] API errors trigger visible, user-friendly UI alerts (e.g., Toasts).
- [ ] The app handles expired authentication tokens by forcing a logout.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/components/GlobalErrorBoundary.tsx
**Purpose:** Catches fatal React rendering errors and prevents app crashes.
**Contents:** React Error Boundary implementation with reporting and fallback UI.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With errors caught, implement **Testing** to prevent them from happening in the first place.`,
  'analyticsevents': `# Analytics Events

**Estimated Time:** 2-4 hours

---

## Overview
If you don't track user behavior, you are flying blind. You will have no idea why users are uninstalling your app or abandoning their shopping carts. However, mobile analytics must be implemented carefully to respect user privacy and avoid massive data bills.

---

## Think First
**What is your North Star Metric? (What single action defines success? e.g., Completing a purchase).**
\`\`\`input
Type your answer here...
\`\`\`
**What are the 5 critical events that lead up to that metric?**
\`\`\`input
Type your answer here...
\`\`\`
**Are you sending Personally Identifiable Information (PII) to a third party?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **The Tool:** PostHog is currently the gold standard for product analytics (event tracking, session replay). Google Analytics/Firebase is ubiquitous. Sentry or Crashlytics is absolutely mandatory for tracking app crashes.
- **Funnel Tracking:** Don't just track "Checkout Completed". Track "Checkout Started", "Address Entered", and "Payment Failed". This creates a funnel so you can see exactly where users are dropping off.
- **Privacy Compliance:** Under Apple's rules, if you only track what users do *inside* your app to improve your app (First-Party), you usually do not need the dreaded ATT popup.

---

## Common Mistakes
- **Tracking Everything:** Firing an event for every single button press and scroll. You will max out your provider's free tier in a week and your dashboard will be an unreadable mess.
- **Inconsistent Naming:** Having events named User Signed Up, signup, and completed_registration. Stick to a strict naming convention like Noun_Verb (e.g., checkout_started).
- **Sending Passwords/Tokens:** Accidentally attaching secure tokens or plain-text passwords as metadata in an analytics event payload.

---

## Examples
- **The Onboarding Funnel:** Tracking onboarding_started, profile_photo_skipped, and onboarding_completed to discover that 80% of users quit when asked for a profile photo.

---

## AI Prompt
\`\`\`prompt
I am integrating PostHog into my React Native Expo app. Generate a centralized Analytics utility file (analytics.ts) with strict TypeScript types for my events. It should enforce that I can only fire specific events like 'signup_completed' and 'checkout_started', and ensure I capture the user's ID securely without sending plain-text PII.
\`\`\`

---

## Validation Checklist
- [ ] A crash reporting tool (like Sentry) is installed and tested.
- [ ] Core funnel events (Signup, Core Action) are actively tracked.
- [ ] Event names follow a strict, consistent casing and naming convention.
- [ ] Apple Privacy Nutrition Labels accurately reflect your tracking setup.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/utils/analytics.ts
**Purpose:** Centralizes all tracking calls to ensure consistency and type safety.
**Contents:** Wrapper functions for your chosen analytics provider.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
To ensure those analytics aren't just showing crashes, implement robust **Error Handling**.`,
  'offlinefeatures': `# Offline Features

**Estimated Time:** 3-6 hours

---

## Overview
Mobile apps travel. Users open them on subways, airplanes, and areas with spotty 3G. If your app instantly crashes or shows a giant white screen the moment the internet drops, it provides a poor user experience. A solid offline strategy degrades gracefully.

---

## Think First
**What must work offline?**
\`\`\`input
Type your answer here...
\`\`\`
**Does the app *need* to function fully offline (like a Notes app), or does it just need to show a polite "No Internet" screen (like a Banking app)?**
\`\`\`input
Type your answer here...
\`\`\`
**How will you handle data conflicts when the device comes back online?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **The "Cache & Read" Strategy:** The simplest offline strategy. Use React Query to aggressively cache API responses. If the user opens the app offline, show them the data from their last session instead of a blank screen.
- **The "Full Sync" Strategy (Advanced):** If users need to create data offline (like writing an email), you must save it locally (WatermelonDB), queue the mutation, and automatically sync it to the server when the connection is restored. This is extremely complex.
- **Network Detection:** Use @react-native-community/netinfo to globally listen for network changes and show an "Offline Mode" banner at the top of the screen.

---

## Common Mistakes
- **Infinite Loading Spinners:** A spinner that spins forever because an API call failed due to no internet, and the code never caught the network error.
- **Assuming Fast Networks:** Testing your app exclusively on your blazing-fast home WiFi and assuming API calls will always complete in 50ms.
- **Silent Failures:** Letting a user fill out a massive form offline, tapping "Submit", and having the data simply vanish into the void.

---

## Examples
- **Optimistic UI:** A user "Likes" a post while in a tunnel. The heart instantly turns red. The app queues the API request and sends it seamlessly when the subway emerges above ground.

---

## AI Prompt
\`\`\`prompt
I am building a React Native app. Generate a global network listener using '@react-native-community/netinfo' that displays a persistent, animated 'No Internet Connection' banner across the top of the app when the device goes offline. Also, explain how to configure React Query to serve cached data when a network request fails.
\`\`\`

---

## Validation Checklist
- [ ] The app detects offline status and visually informs the user.
- [ ] Existing cached data is displayed when offline, avoiding white screens.
- [ ] Actions that require a network connection are disabled or queued.
- [ ] The app gracefully recovers when the connection is restored.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/components/NetworkBanner.tsx
**Purpose:** Visually communicates network state to the user.
**Contents:** A listener component that mounts at the root level of the app.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With the app functioning in all environments, implement **Analytics Events** to see how users are interacting with it.`,
  'devicepermissions': `# Device Permissions

**Estimated Time:** 1-2 hours

---

## Overview
Modern mobile operating systems are highly restrictive. You cannot access the camera, microphone, contacts, or location without explicit user consent. How and when you ask for these permissions drastically impacts your user retention and App Store review success.

---

## Think First
**Why do you *actually* need this permission?**
\`\`\`input
Type your answer here...
\`\`\`
**Will the user understand why you are asking for it at this exact moment?**
\`\`\`input
Type your answer here...
\`\`\`
**What happens to the UI if the user permanently denies the permission?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Timing is Everything:** Never bombard the user with permission popups the moment they open the app. Wait until they initiate an action. (e.g., Only ask for Camera permission when they tap "Take Photo").
- **Pre-Prompting:** iOS only lets you ask for a permission *once*. If they say no, they must dig through the iOS Settings app to turn it back on. Use a "Soft Prompt" (a custom modal explaining why you need the permission) before triggering the scary OS-level popup.
- **App Tracking Transparency (ATT):** If you use third-party analytics (like Facebook Ads) to track users across apps, you MUST implement the ATT prompt on iOS, or Apple will reject your app.

---

## Common Mistakes
- **Crashing on Denial:** Attempting to access the contacts book immediately after the user taps "Deny", causing a fatal crash.
- **Vague Justifications:** Apple requires you to write a UsageDescription string in your Info.plist (e.g., NSCameraUsageDescription). If you write "App needs camera," Apple will reject it. You must write "Kontxt needs the camera to let you take a profile picture."

---

## Examples
- **The Soft Prompt:** The user taps "Find Friends". A beautiful, custom screen appears: "Find your friends! We need access to your contacts to see who is already here." The user taps "Continue", and *then* the native OS prompt appears.

---

## AI Prompt
\`\`\`prompt
I am building an Expo app. Generate a reusable hook 'useCameraPermission' that checks the current permission status. If denied, it should trigger an alert guiding the user to the device Settings app using 'Linking.openSettings()'. Explain exactly what needs to be added to the app.json to satisfy Apple's review team.
\`\`\`

---

## Validation Checklist
- [ ] Permissions are requested in-context, not at launch.
- [ ] Usage description strings are highly specific and explain the user benefit.
- [ ] The app does not crash if a permission is denied.
- [ ] Links to OS settings are provided if the user previously permanently denied access.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** app.json / Info.plist configurations
**Purpose:** Formally declares the app's intent to access secure hardware.
**Contents:** Accurate, user-facing permission justification strings.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With hardware access secured, build robust **Offline Features** for when the device loses connection.`,
  'mapslocation': `# Maps & Location

**Estimated Time:** 3-5 hours

---

## Overview
Location-awareness bridges the digital and physical worlds. Whether tracking a delivery, finding nearby friends, or tagging a photo, location services require precise handling of device sensors and battery-draining GPS polling.

---

## Think First
**Do you just need a one-time location ping (e.g., tagging a post), or continuous background tracking (e.g., a running app)?**
\`\`\`input
Type your answer here...
\`\`\`
**How precise does the location need to be? High accuracy drains the battery rapidly.**
\`\`\`input
Type your answer here...
\`\`\`
**Are you prepared for the strict app store reviews surrounding location tracking?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Map Library:** react-native-maps is the industry standard for rendering Apple Maps (iOS) and Google Maps (Android) natively.
- **Location Polling:** Use expo-location to securely request permissions and read coordinates. For simple features, use getCurrentPositionAsync. Only use background location tracking if it is absolutely vital to the app's core purpose.
- **Geocoding:** Coordinates (Latitude 40.71, Longitude -74.00) are useless to users. You must use a Geocoding API (like Google Maps or Mapbox) to convert coordinates into human-readable addresses.

---

## Common Mistakes
- **Leaking API Keys:** Hardcoding your Google Maps API key in the frontend. This key must be restricted by Android package name and iOS bundle identifier in the Google Cloud Console to prevent abuse.
- **Ignoring Permission Rejections:** Assuming the user will always grant location access. If they select "Don't Allow", your app must degrade gracefully, perhaps by letting them type in a zip code manually.
- **Battery Drain:** Leaving high-accuracy GPS polling active when the app is in the background.

---

## Examples
- **Store Locator:** Displaying a map with custom markers indicating nearby stores, updating dynamically as the user pans the map.

---

## AI Prompt
\`\`\`prompt
I am building an Expo React Native app. Generate a screen that uses 'expo-location' to request foreground location permissions, fetches the user's current coordinates, and displays them as a marker on a map using 'react-native-maps'. Include fallback UI if the user denies location permissions.
\`\`\`

---

## Validation Checklist
- [ ] Location permissions are requested only when necessary, with clear explanations.
- [ ] The app handles users denying location access gracefully.
- [ ] Map renders correctly on both iOS and Android.
- [ ] API keys are secured and restricted in their respective cloud consoles.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/screens/MapScreen.tsx
**Purpose:** Renders the map and handles coordinate logic.
**Contents:** MapView component with custom markers and permission handling.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
Now ensure your app handles all other **Device Permissions** correctly before launching.`,
  'mediauploads': `# Media Uploads

**Estimated Time:** 3-6 hours

---

## Overview
Allowing users to upload photos and videos drastically increases engagement, but it introduces massive complexity. Media files are huge, mobile networks are unreliable, and device storage is limited. You must handle image compression, background uploading, and secure storage buckets.

---

## Think First
**Do users need to take a live photo, or just pick from their camera roll?**
\`\`\`input
Type your answer here...
\`\`\`
**Are you compressing the images before sending them over the network?**
\`\`\`input
Type your answer here...
\`\`\`
**Who can view this media once it's uploaded?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Image Picker Library:** Use expo-image-picker for robust, native access to the camera and photo library. It handles permissions and basic cropping automatically.
- **Compression:** Uploading a raw 12MB iPhone photo over 3G will fail. Always use a library like expo-image-manipulator to resize and compress JPEGs down to <500kb before the upload begins.
- **Storage Strategy:** Never store base64 strings in your PostgreSQL database. Upload the binary file to a storage bucket (like Supabase Storage or AWS S3), and save the resulting public URL in your database.

---

## Common Mistakes
- **Missing Permissions:** Trying to open the camera without explicitly asking the user for permission first, causing the app to instantly crash.
- **Blocking the UI:** Forcing the user to stare at a spinner while a video uploads. Media should upload asynchronously while the user continues to use the app.
- **Ignoring Image Rotation:** Failing to read EXIF data, resulting in photos uploading sideways or upside down.

---

## Examples
- **Profile Picture:** A user selects a photo, the app crops it to a square, compresses it, uploads it to Supabase Storage, and saves the new avatar URL to their profile.

---

## AI Prompt
\`\`\`prompt
I am building an Expo app. Generate a React Native component that allows a user to pick an image from their gallery using 'expo-image-picker', compresses the image to a maximum width of 1080px using 'expo-image-manipulator', and securely uploads the resulting file to a Supabase Storage bucket. Include error handling and a loading state.
\`\`\`

---

## Validation Checklist
- [ ] Camera and Photo Library permissions are handled gracefully.
- [ ] Images are compressed locally before network transmission.
- [ ] Files upload successfully to a secure storage bucket.
- [ ] The app handles network interruptions during upload.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/utils/mediaUpload.ts
**Purpose:** Standardizes how media is selected, compressed, and uploaded.
**Contents:** Helper functions wrapping the image picker and storage SDKs.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With content generation solved, integrate **Maps & Location** for location-aware features.`,
  'apis': `# APIs & Data Fetching

**Estimated Time:** 3-5 hours

---

## Overview
Your app is only a shell until it connects to data. API implementation involves fetching external data, caching it locally to prevent redundant network requests, handling slow mobile connections, and presenting loading or error states to the user.

---

## Think First
**How will you handle situations when the user loses cell service mid-request?**
\`\`\`input
Type your answer here...
\`\`\`
**How frequently does this data need to be refreshed?**
\`\`\`input
Type your answer here...
\`\`\`
**What happens if the API returns an error?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Fetching Strategy:** Do not use plain useEffect + fetch for data management. Use React Query (TanStack Query). It automatically handles caching, background refetching, retries, and offline mutations.
- **API Client:** Use axios or the native fetch API configured with interceptors to automatically attach the user's Auth JWT token to every outgoing request.
- **Type Safety:** Ensure the data coming from the API is strictly typed. Using tools like OpenAPI generators or Supabase's type generator guarantees your frontend expects the correct data structure.

---

## Common Mistakes
- **Silent Failures:** Wrapping API calls in a try/catch but failing to show a Toast or Error UI to the user when it fails.
- **Spamming the Server:** Re-fetching heavy data every time a screen comes into focus without using a cache.
- **Blocking the UI:** Forcing the user to stare at a full-screen loading spinner for every minor background request. Use skeleton loaders and background refetching.

---

## Examples
- **Data Caching:** React Query fetches a list of articles once. When the user navigates away and back, it instantly shows the cached articles while silently checking the server for updates in the background.
- **Optimistic Updates:** When a user "Likes" a post, instantly turning the heart red in the UI before the API request completes, making the app feel incredibly fast.

---

## AI Prompt
\`\`\`prompt
I am using React Native with React Query and Axios. Generate a custom hook called useFetchProfile that fetches user data from '/api/profile'. Include proper TypeScript typing, an Axios interceptor setup to attach a Bearer token, and show how to handle loading and error states in a component.
\`\`\`

---

## Validation Checklist
- [ ] React Query (or similar caching layer) is configured globally.
- [ ] Auth tokens are securely and automatically attached to requests.
- [ ] Error states and loading skeletons are displayed appropriately.
- [ ] Mutations (POST/PUT/DELETE) correctly invalidate the cache to show fresh data.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/api/client.ts
**Purpose:** Centralizes all network communication.
**Contents:** Configured API client, interceptors, and custom hooks for specific endpoints.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With data flowing securely and the app fully functional, proceed to Phase 4 to focus on **Production Readiness**.`,
  'navigation': `# Navigation

**Estimated Time:** 2-4 hours

---

## Overview
Navigation dictates how users move through your app. Unlike web browsers with native back buttons and URLs, mobile apps require a dedicated navigation library to handle stack pushes, tab bars, modal presentations, and deep linking natively.

---

## Think First
**What is the primary way users switch contexts? (Bottom Tabs are standard).**
\`\`\`input
Type your answer here...
\`\`\`
**Which screens should slide in from the right (Stack) versus slide up from the bottom (Modal)?**
\`\`\`input
Type your answer here...
\`\`\`
**How will you handle authenticated vs. unauthenticated routes?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Navigation Library:** Expo Router (file-based routing, heavily recommended for new Expo apps) or React Navigation (traditional component-based routing).
- **Architecture:** Keep your navigation trees shallow. Deeply nested navigators (a Stack inside a Drawer inside a Tab) cause massive performance issues and memory leaks.
- **Auth Flow Guarding:** Implement a root navigator that checks auth state. If no user is found, render the Auth Stack. If logged in, render the Main App Tabs.

---

## Common Mistakes
- **Passing Huge Objects in Params:** Passing a massive user object via route params. Route params should only contain IDs (e.g., { userId: 123 }), and the screen should fetch the data.
- **Memory Leaks:** Pushing the same screen onto the stack repeatedly instead of using navigate() or goBack().
- **Ignoring Deep Links:** Failing to configure URL schemes, meaning users can't click a link in an email and be taken directly to a specific screen in your app.

---

## Examples
- **Bottom Tab Navigator:** A main interface featuring Home, Search, Notifications, and Profile tabs.
- **Modal Presentation:** A "Create Post" screen that slides up over the current context, allowing the user to easily swipe it away to cancel.

---

## AI Prompt
\`\`\`prompt
I am setting up Expo Router for my React Native app. Generate the file structure and layout code required to create a root layout that handles authentication state, directing unauthenticated users to a '/login' screen, and authenticated users to a bottom tab layout containing 'Home' and 'Settings'.
\`\`\`

---

## Validation Checklist
- [ ] Auth state automatically switches the user between login and main app screens.
- [ ] Android hardware back button behaves as expected (goes back, doesn't close app unexpectedly).
- [ ] Route parameters are strictly typed using TypeScript.
- [ ] Deep links are configured for crucial app screens.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** app/_layout.tsx
**Purpose:** Defines the skeleton and routing rules of the application.
**Contents:** Navigation containers, tab definitions, and route guards.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
Now that screens are connected, integrate **APIs** to fetch and populate real data into these views.`,
  'frontendui': `# Frontend (UI)

**Estimated Time:** 4-8 hours

---

## Overview
The Frontend (UI) is where your application comes to life. In mobile development, UI isn't just about making things look pretty; it's about translating static designs into fluid, responsive, and accessible interactive elements using React Native components.

---

## Think First
**Are you using a component library or building custom components from scratch?**
\`\`\`input
Type your answer here...
\`\`\`
**How will your app adapt to different screen sizes and dark/light modes?**
\`\`\`input
Type your answer here...
\`\`\`
**Are your touch targets large enough for human thumbs?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **UI Library:** Using libraries like Restyle, Tamagui, or React Native Paper dramatically speeds up development by providing accessible, pre-built components (buttons, cards, inputs).
- **Styling Approach:** Choose a consistent styling paradigm. Tailwind (via NativeWind) is popular, or stick to robust StyleSheet definitions. Avoid inline styles for performance.
- **Animations:** Use react-native-reanimated for 60fps animations. Avoid standard React Native Animated for complex transitions, as it can block the JS thread.

---

## Common Mistakes
- **Ignoring Safe Areas:** Placing buttons behind the iOS notch or the Android navigation bar. Always wrap main screens in a SafeAreaView.
- **Keyboard Overlaps:** Failing to use KeyboardAvoidingView, resulting in the on-screen keyboard hiding text inputs so the user can't see what they are typing.
- **Unoptimized Images:** Rendering massive 4K images in lists. Use expo-image for aggressive caching and resizing.

---

## Examples
- **Design System Implementation:** Creating a Button.tsx that accepts variants ('primary', 'secondary', 'danger') and automatically handles disabled states and loading spinners.
- **Responsive Lists:** A FlatList component that renders items efficiently, reusing memory as the user scrolls through thousands of items.

---

## AI Prompt
\`\`\`prompt
I am building a React Native app. Generate a highly reusable, accessible custom Button component using TypeScript and StyleSheet. It should support 'primary', 'secondary', and 'outline' variants, accept a 'loading' boolean to show an ActivityIndicator, and have proper touch feedback using Pressable.
\`\`\`

---

## Validation Checklist
- [ ] UI correctly adapts to both iOS and Android safe areas (notches/bezels).
- [ ] Keyboards do not obscure input fields.
- [ ] Custom components use strict TypeScript interfaces.
- [ ] Dark mode and light mode are supported seamlessly.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/components/ui/Button.tsx
**Purpose:** Establishes the reusable design system blocks.
**Contents:** Fully typed, responsive components ready to be used across screens.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With UI blocks built, implement **Navigation** to connect these screens together logically.`,
  'pushnotifications': `# Push Notifications

**Estimated Time:** 2-4 hours

---

## Overview
Push Notifications are the strongest tool for mobile user retention, allowing you to pull users back into your app. However, they are technically complex, requiring registration with Apple/Google, securing unique device tokens, and managing external delivery services.

---

## Think First
**What events truly warrant interrupting the user's day?**
\`\`\`input
Type your answer here...
\`\`\`
**How will you handle the permission prompt? (Timing is critical).**
\`\`\`input
Type your answer here...
\`\`\`
**Do notifications need to carry deep-links to specific screens?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Infrastructure:** Never build direct connections to Apple Push Notification service (APNs) or Firebase Cloud Messaging (FCM) from scratch. Use Expo Push Notifications for ease of use, or OneSignal for advanced marketing segments.
- **Permission Strategy:** Do not ask for notification permission on the very first screen. Wait until the user performs an action where a notification provides clear value (e.g., after they enable "Remind me daily").
- **Token Management:** You must store the user's unique Push Token in your database, associated with their User ID, to know where to send the messages.

---

## Common Mistakes
- **Notification Fatigue:** Sending generic, daily "We miss you!" messages. This guarantees the user will revoke permissions or uninstall the app.
- **Broken Certificates:** For iOS, failing to configure the correct APNs certificates or keys in your Apple Developer account, causing silent failures in production.
- **Ignoring Background State:** Failing to handle what happens when a user taps a notification while the app is completely closed versus running in the background.

---

## Examples
- **Transactional:** "Your ride is arriving in 3 minutes." (High value, context-aware).
- **Engagement:** "User X just liked your post." (Social proof, drives immediate opening).

---

## AI Prompt
\`\`\`prompt
I am using Expo and React Native. Generate the complete code to request push notification permissions gracefully, retrieve the Expo Push Token, and set up listeners for incoming notifications while the app is foregrounded and backgrounded.
\`\`\`

---

## Validation Checklist
- [ ] APNs and FCM certificates are correctly configured in your provider.
- [ ] The app successfully requests and retrieves a device push token.
- [ ] The push token is securely saved to your backend database.
- [ ] Tapping a test notification successfully opens the app.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/hooks/usePushNotifications.ts
**Purpose:** Manages the entire lifecycle of push permissions and tokens.
**Contents:** Hook that registers for push notifications, saves the token, and handles incoming notification events.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With notifications active, refine your **Frontend (UI)** components to ensure the app looks as good as it functions.`,
  'statemanagement': `# State Management

**Estimated Time:** 1-2 hours

---

## Overview
State Management is how your app remembers data across different screens. When a user updates their profile on the Settings tab, the Home tab needs to instantly reflect those changes. Without a solid state management strategy, your app will suffer from infinite re-renders, sluggish UI, and complex bugs where the screen doesn't update correctly.

---

## Think First
**Does this data need to be available globally, or just on this screen?**
\`\`\`input
Type your answer here...
\`\`\`
**How often does this data change?**
\`\`\`input
Type your answer here...
\`\`\`
**Does it need to be persisted when the app closes?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Local vs Global State:** Use React useState for UI-only state (e.g., is this dropdown open?). Only use global state (Zustand, Redux) for data that multiple screens care about.
- **Persistence:** Choose MMKV or AsyncStorage for saving data across app restarts. MMKV is significantly faster.
- **Server vs Client State:** Use tools like React Query or SWR for server state (data fetched from APIs). Use Zustand/Context for client state (theme, current step in a wizard).

---

## Common Mistakes
- **Overusing Global State:** Putting everything in Redux/Zustand. If only one component uses it, keep it local.
- **Prop Drilling:** Passing state down through 10 layers of components instead of using Context or a state library.
- **Ignoring Re-renders:** Storing complex, rapidly changing objects in Context can cause your entire app to re-render on every keystroke.

---

## Examples
- **User Authentication:** Storing the current logged-in user and their JWT token in a global Zustand store.
- **Shopping Cart:** Keeping track of selected items and total price across the product, cart, and checkout screens.

---

## AI Prompt
\`\`\`prompt
I am building a React Native app. I need a robust state management setup using Zustand for client state and React Query for server state. Please generate the boilerplate for a Zustand store that handles user session (logged in, user data), and explain how to persist this securely using MMKV.
\`\`\`

---

## Validation Checklist
- [ ] Global state is used only when data needs to be shared across screens.
- [ ] Server state (fetching, caching) is separated from client UI state.
- [ ] Sensitive data is securely persisted (not stored in plain text if it's a token).
- [ ] State updates do not cause unnecessary full-app re-renders.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/store/useAppStore.ts
**Purpose:** Centralized state management for global client data.
**Contents:** A configured Zustand store with actions for updating user sessions and app preferences.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With state management in place, proceed to implement the **Auth** flows to populate that state with real user data.`,
  'welcome': `# Welcome to Kontxt

**Estimated Time:** 5 min

---

## Why this matters
You are about to embark on building a new software project. Whether you are hacking together a weekend prototype, learning a new technology, or building a highly scalable enterprise SaaS, the decisions you make in the next few hours will dictate your trajectory for the next few months. Kontxt is designed to act as your Senior Architect, guiding you through those critical decisions.

## Strategic Guidance

### Hackathon Mode
In a hackathon, speed is your only currency. You have 24 to 48 hours to build something that wows the judges. The philosophy here is to cut every corner that does not directly contribute to the visual demo or the core 'Aha!' moment. You will use mock data, ignore scalability, and hardcode values where necessary. Your only goal is to cross the finish line with a working prototype.

### Personal Project
Personal projects are about learning and utility. You have no strict deadline, but you also have no budget. The philosophy here is to optimize for zero-cost maintenance by relying heavily on generous free tiers (like Vercel and Supabase) and exploring modern, elegant architectures. It is okay to over-engineer slightly if it helps you learn a new pattern, but avoid enterprise bloat.

### Production SaaS
Building a Production SaaS means you are building for paying customers. The philosophy here is uncompromising robustness. You cannot cut corners on security, authentication, or basic architecture. You must build a foundation that will not collapse when you get your first 100 paying customers. You need proper testing, staging environments, and database migrations. It will take longer, but it will survive contact with the real world.

## Accountability Check
- [ ] I understand the philosophy of my chosen mode and I am ready to begin.`,
  'ideadefinition': `# Idea Definition

**Estimated Time:** 20 min

---

## Why this matters
A brilliant technical execution of a terrible idea is a waste of your time. Before writing a single line of code, you must be able to clearly articulate what you are building and why it needs to exist. Clarity at this stage prevents endless pivoting later.

## Strategic Guidance

### Hackathon Mode
Hackathon ideas need to be visually impressive, easily understood in under 60 seconds, and slightly unconventional. Do not build another generic to-do list. Build something that leverages a cool new API, integrates hardware, or solves a hyper-niche, amusing problem. If the idea cannot be demonstrated in a 2-minute pitch, simplify it.

### Personal Project
For a personal project, the idea only needs to solve your own problem or scratch your own itch. It does not need a massive total addressable market. Build a tool that automates your own workflow, tracks your own data, or helps you learn a specific framework. The best personal projects are the ones you will actually use every single day.

### Production SaaS
A Production SaaS idea must solve a 'Hair on Fire' problem for a specific group of people who have money to pay for a solution. It should ideally be something you have personal experience with, giving you founder-market fit. You need to validate that the problem is painful enough that people are actively seeking workarounds right now.

## The Data We Need From You
**What is the core idea you want to build? Describe it in 2-3 sentences.**
\`\`\`input
Type your answer here...
\`\`\`

## AI Brainstorming Phase
If you are struggling to refine your idea, run this prompt through your AI assistant to stress-test it.

\`\`\`prompt
Act as a Y Combinator partner. I am pitching the following software idea: [Insert Idea]. Critically evaluate this idea. Point out the two biggest weaknesses or assumptions I am making, and suggest one specific pivot or refinement that would make the idea 10x more compelling.
\`\`\`

## Accountability Check
- [ ] My idea is clearly defined and I am ready to move forward.`,
  'problemstatement': `# Problem Statement

**Estimated Time:** 15 min

---

## Why this matters
If you do not clearly define the problem, you will build a solution looking for a problem. A strong problem statement acts as a filter for every feature you plan to build: if a feature does not directly address the problem statement, it gets cut.

## Strategic Guidance

### Hackathon Mode
The problem statement for a hackathon is the narrative hook for your demo. It needs to be relatable to the judges. Pick a problem that everyone in the room has experienced, or something highly topical and trending. The emotional resonance of the problem is more important than the market size.

### Personal Project
Your problem statement is simply your personal pain point. Why are you annoyed? What manual task is taking up too much of your time? Documenting this helps keep the project scoped tightly around solving that specific annoyance rather than turning into a sprawling, unfinished experiment.

### Production SaaS
The problem statement must highlight an acute, expensive, or highly inefficient pain point experienced by a specific business or demographic. It must quantify the pain (e.g., 'Teams lose 10 hours a week doing X' rather than 'Doing X is hard'). A weak problem statement leads to a 'nice to have' product, which nobody pays for.

## The Data We Need From You
**Describe the specific problem your software will solve.**
\`\`\`input
Type your answer here...
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as a seasoned Product Manager. I have defined the following problem statement for my software: [Insert Problem Statement]. Please rewrite this into three distinct, punchy problem statements using the 'Job to be Done' framework. Make them concise and highly focused on the user's struggle.
\`\`\`

## Accountability Check
- [ ] I have narrowed down a single, clear problem statement.`,
  'userpainpoints': `# User Pain Points

**Estimated Time:** 15 min

---

## Why this matters
A problem statement is high-level; user pain points are the specific, frustrating details. Understanding exactly where and how the user hurts allows you to design features that feel like magic. When you solve specific pain points, users feel deeply understood.

## Strategic Guidance

### Hackathon Mode
Focus on one singular, highly visual pain point. If the pain point is 'filling out long forms is tedious', your hackathon solution should be a magical one-click AI generation button. You do not need to solve every pain point, just the one that makes for the best demo.

### Personal Project
List the specific steps in your current workflow that make you want to pull your hair out. Is it copying data between two apps? Is it formatting a CSV? Those highly specific, localized pain points will directly translate into the core features of your utility app.

### Production SaaS
You must map the entire user journey and identify the highest-friction bottlenecks. Which pain points cost the user the most money, time, or emotional energy? You must prioritize solving the pain points that are acute enough to trigger a purchasing decision. 'Minor inconveniences' do not support a SaaS business model.

## The Data We Need From You
**List the top 3 specific pain points your user experiences.**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Expansion Phase
\`\`\`prompt
Act as a User Researcher. I am building a product to solve these pain points: [Insert Pain Points]. Based on your knowledge of human psychology and software, what are 3 secondary or hidden pain points this user is likely experiencing but might not explicitly state? Help me uncover the deeper frustrations.
\`\`\`

## Accountability Check
- [ ] I have identified and documented the most critical pain points.`,
  'targetusers': `# Target Users

**Estimated Time:** 10 min

---

## Why this matters
'Everyone' is not a target audience. If you build for everyone, you build for no one. Defining your target user dictates your marketing strategy, your UI/UX design, and your tone of voice. A tool for enterprise compliance officers looks and feels fundamentally different than a tool for Gen Z creators.

## Strategic Guidance

### Hackathon Mode
Your target user is the judge panel. Period. Frame your product, your pitch, and your use cases in a way that resonates with the specific people evaluating your project. If the judges are technical, build for developers. If the hackathon is sponsored by a healthcare company, build for clinicians.

### Personal Project
You are the target user. Do not worry about making the UI accessible for non-technical users if you are the only one who will ever use it. Build the interface that makes sense to your brain, using the shortcuts and workflows you personally prefer.

### Production SaaS
You must aggressively niche down. Do not target 'Small Businesses'. Target 'Boutique Coffee Shop Owners with 2-5 locations'. The narrower your initial target user, the easier it is to find them, market to them, and build a product that fits their exact needs perfectly. You can expand later.

## The Data We Need From You
**Who is the primary target user for this application? Be as specific as possible.**
\`\`\`input
Type your answer here...
\`\`\`

## AI Persona Generation
\`\`\`prompt
Act as a Go-to-Market Strategist. My target user is: [Insert Target User]. Give me a detailed breakdown of where these users hang out online (specific subreddits, forums, social platforms), what their primary professional motivations are, and the exact vocabulary or jargon they use to describe their problems.
\`\`\`

## Accountability Check
- [ ] I have defined a highly specific target user demographic.`,
  'icpidealcustomerprofile': `# Ideal Customer Profile (ICP)

**Estimated Time:** 15 min

---

## Why this matters
An ICP is a highly specific description of the *company* or *buyer* that gets the most value out of your product and is easiest to sell to. Without an ICP, your marketing will be too generic, your outbound emails will be ignored, and your product roadmap will be pulled in a dozen conflicting directions.

## Strategic Guidance

### Hackathon Mode
Your ICP is the hackathon sponsor. If Twilio sponsored the hackathon, your ICP is 'A developer who desperately needs to send an SMS notification'. Tailor your entire presentation around why your product makes the sponsor's technology look incredibly valuable.

### Personal Project
Your ICP is you, or a very close friend. If you are building a tool for your personal fitness tracking, do not build features for 'gym owners'. Build features for 'a 20-something software engineer who lifts weights 3x a week'.

### Production SaaS
A Production ICP must be ruthlessly specific. It is not 'Small Businesses'. It is 'B2B SaaS companies in North America with 10-50 employees, using Stripe, who struggle with high churn'. You must define their industry, company size, budget, and the specific technology stack they currently use. If they don't meet these criteria, you disqualify them.

## The Data We Need From You
**Describe your Ideal Customer Profile. Include industry, size, and existing tools they use.**
\`\`\`input
Type your answer here...
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as a B2B SaaS Sales Director. My current ICP is: [Insert ICP]. Please tighten this ICP by suggesting 3 specific 'disqualifiers'—characteristics that would immediately indicate a company is a BAD fit for my product. Then, suggest one specific sub-niche I should target first to get my first 10 customers.
\`\`\`

## Accountability Check
- [ ] I have defined a narrow, highly targeted ICP.`,
  'personas': `# User Personas

**Estimated Time:** 15 min

---

## Why this matters
While an ICP defines the *company* you are targeting, User Personas define the actual *human beings* logging into your software. An Enterprise SaaS might be sold to the CFO (Buyer Persona), but it is used daily by a junior accountant (User Persona). You must understand both to build a successful product.

## Strategic Guidance

### Hackathon Mode
Keep it to a single persona. You do not have time to build different dashboards for 'Admins', 'Managers', and 'Employees'. Build a single, unified view for the 'Primary Actor' and assume they have god-mode permissions. The demo should focus entirely on their happy path.

### Personal Project
You are the primary persona. However, if you plan to share this with others, consider the 'Casual Observer' persona. How does your app look when someone who hasn't read your source code tries to use it? Keep the UX intuitive enough that you don't need a manual.

### Production SaaS
You must clearly separate your Buyer Persona from your User Persona. The Buyer cares about ROI, compliance, and reporting. The User cares about speed, UI, and reducing manual data entry. Your landing page must sell to the Buyer, while your actual product must delight the User.

## The Data We Need From You
**Who is the primary person using this software, and who is the person paying for it? (If B2C, these are the same).**
\`\`\`input
Buyer: 
User: 
\`\`\`

## AI Expansion Phase
\`\`\`prompt
Act as a UX Researcher. My primary user persona is [Insert User Persona] and my buyer persona is [Insert Buyer Persona]. Give me a 3-point breakdown of the psychological motivations for EACH persona. What keeps the Buyer awake at night? What does the User find most tedious about their daily job?
\`\`\`

## Accountability Check
- [ ] I clearly understand the difference between my buyer and my user.`,
  'solutionstatement': `# Solution Statement

**Estimated Time:** 15 min

---

## Why this matters
If your problem statement defines the disease, your solution statement is the cure. It forces you to articulate *how* your software actually fixes the user's pain point without getting bogged down in technical jargon. A clear solution statement keeps the engineering team focused on the outcome, not just building features.

## Strategic Guidance

### Hackathon Mode
Your solution statement should sound like magic. 'We use AI to instantly convert X into Y.' It doesn't matter if there's a human in the loop behind the scenes during the demo. The solution statement is the narrative promise you make to the judges.

### Personal Project
Your solution statement is your personal goal. 'A python script that automatically categorizes my bank transactions so I don't have to do it manually every Sunday.' Keep it pragmatic and focused entirely on the utility it provides you.

### Production SaaS
The solution statement must bridge the gap between the pain point and the ROI. It should explicitly state the mechanism of action. 'We provide an automated CI/CD pipeline that catches security vulnerabilities before they are merged, saving enterprise teams $100k+ in compliance fines.'

## The Data We Need From You
**In one sentence, how does your product solve the user's problem?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Brainstorming Phase
\`\`\`prompt
Act as a Y Combinator partner. My solution statement is: [Insert Solution]. This sounds a bit generic. Please rewrite this into 3 distinct, highly compelling solution statements. Focus one on saving time, one on making money, and one on reducing risk/anxiety.
\`\`\`

## Accountability Check
- [ ] My solution statement is clear, actionable, and free of jargon.`,
  'valueproposition': `# Value Proposition

**Estimated Time:** 15 min

---

## Why this matters
Your value proposition is the number one reason a visitor should buy your product over the competition. It is the big, bold text on your landing page. If your value proposition is weak ('We help you do things better'), users will bounce in under 3 seconds.

## Strategic Guidance

### Hackathon Mode
Your value prop is shock value. 'The world's first AI that does X.' You want the judges to raise their eyebrows. It doesn't need to be a sustainable business model; it just needs to be an undeniable technical feat or a hilarious novelty.

### Personal Project
Your value prop is 'Free, open-source, and exactly what I need.' If you open-source it, your value prop to other developers is that they can self-host it without paying a $30/month subscription to a corporate SaaS.

### Production SaaS
Your value prop must be quantitative. 'Reduce your AWS bill by 30% with zero code changes.' A strong Production value prop makes the decision to buy a no-brainer. If the software costs $100/mo but explicitly saves the user $1,000/mo in labor, it sells itself.

## The Data We Need From You
**What is the primary quantitative or emotional value your product delivers?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as an elite Copywriter. My raw value proposition is: [Insert Value Prop]. Turn this into a high-converting Landing Page Hero Section. Provide 1 main H1 Headline (under 7 words, punchy), 1 subheadline (under 15 words, explanatory), and the text for the primary Call to Action (CTA) button.
\`\`\`

## Accountability Check
- [ ] I have a compelling value proposition ready for my landing page.`,
  'elevatorpitch': `# Elevator Pitch

**Estimated Time:** 10 min

---

## Why this matters
You have 30 seconds to explain what you are building to an investor, a potential co-founder, or a customer. If you stumble, ramble about tech stacks, or use confusing jargon, you lose them. An elevator pitch forces you to distill your entire business into a single, undeniable hook.

## Strategic Guidance

### Hackathon Mode
The elevator pitch is your actual presentation intro. 'Have you ever noticed how annoying X is? What if you could just do Y? Meet [Project Name].' It needs to be punchy, relatable, and instantly transition into the live demo.

### Personal Project
'I got tired of doing X manually, so I built a small script to automate it.' That is your entire pitch. It is humble, clear, and perfectly sets expectations if you share it on Reddit or GitHub.

### Production SaaS
Use the standard 'X for Y' or the 'We help [Target] do [Action] so they can [Result]' framework. Do not mention your tech stack. Do not mention your database. Focus entirely on the massive market opportunity and the unique insight your team has to capture it.

## The Data We Need From You
**Draft your 30-second elevator pitch.**
\`\`\`input
Type your answer here...
\`\`\`

## AI Expansion Phase
\`\`\`prompt
Act as a Startup Coach. My current elevator pitch is: [Insert Pitch]. Please critique this pitch. Then, provide 3 alternative versions: 
1. The 'X for Y' analogy (e.g., The Uber for Dog Walking).
2. The 'Villain' approach (Focus heavily on the pain point).
3. The 'Visionary' approach (Focus on how the world looks in 5 years because of this product).
\`\`\`

## Accountability Check
- [ ] I can clearly pitch my product in under 30 seconds.`,
  'marketresearch': `# Market Research

**Estimated Time:** 30 min

---

## Why this matters
Writing code is the most expensive way to figure out if people want your product. Market research validates that a market actually exists, that people are currently spending money to solve the problem, and that there is room for a new entrant. Skipping this step leads to launching a brilliant product to absolute crickets.

## Strategic Guidance

### Hackathon Mode
Do not do formal market research. You do not have the time. Instead, find one mind-blowing statistic that validates the scale of your problem and put it on your opening slide. 'Every year, $10B is lost to X. We fix X.' That is the only research you need for a hackathon.

### Personal Project
Market research here means 'Has someone already built this for free?' Search GitHub and Product Hunt. If an open-source tool already exists that does exactly what you want, use it! Only build the project if you want to learn, or if the existing tools are too complex/expensive for your specific needs.

### Production SaaS
You must conduct rigorous top-down and bottom-up market sizing (TAM, SAM, SOM). You need to look at industry reports, search volume trends (Google Keyword Planner), and macro tailwinds. If the market is shrinking, or if it is completely dominated by legacy monopolies with unbreachable distribution moats, pick a different market.

## The Data We Need From You
**What is one quantifiable metric that proves this is a real problem? (e.g., Search volume, industry reports, hours wasted)**
\`\`\`input
Type your answer here...
\`\`\`

## AI Research Phase
\`\`\`prompt
Act as a Market Research Analyst. My product idea is [Insert Idea]. Please identify the Top 3 macro trends that are acting as tailwinds for this industry over the next 5 years. Also, provide a rough estimate of the Total Addressable Market (TAM) based on publicly available industry data.
\`\`\`

## Accountability Check
- [ ] I have validated that there is a demand for this solution.`,
  'competitoranalysis': `# Competitor Analysis

**Estimated Time:** 30 min

---

## Why this matters
If you have no competitors, you either have a completely novel, world-changing idea, or (much more likely) there is no money in this market. Competitors validate the market. Analyzing them helps you identify their weak points, their pricing strategies, and their core features so you can differentiate yourself.

## Strategic Guidance

### Hackathon Mode
Find the biggest, most boring legacy competitor in the space and make them your villain. 'Salesforce takes 3 weeks to set up. Our app does it in 3 seconds.' Use competitors purely as a contrasting baseline to make your demo look incredibly fast and innovative.

### Personal Project
Look at the paid competitors and find the exact features they put behind their $50/month paywall. Build those specific features for yourself for free. You don't need to build their entire platform, just the 10% you actually care about.

### Production SaaS
You need a comprehensive feature matrix. Document their pricing, their G2/Capterra reviews, and their onboarding flows. Most importantly, read their 1-star reviews. What do their users hate about them? That 1-star review is the exact wedge you use to enter the market and steal their customers.

## The Data We Need From You
**List your top 3 direct competitors.**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Analysis Phase
\`\`\`prompt
Act as a Competitive Intelligence Expert. I have identified the following competitors for my SaaS: [Insert Competitors]. Please provide a strategic breakdown of each. Specifically, identify their biggest perceived weakness in the market, and suggest one specific 'Wedge Strategy' I can use to steal their most frustrated customers.
\`\`\`

## Accountability Check
- [ ] I have identified my competitors and read their negative reviews.`,
  'existingalternatives': `# Existing Alternatives

**Estimated Time:** 15 min

---

## Why this matters
Competitors are companies that build similar software. *Alternatives* are the workarounds people use right now because your software doesn't exist. Often, your biggest competitor is not another startup; it is a messy Excel spreadsheet, a chaotic Slack channel, or a pen and paper. If the workaround is 'good enough', they will not buy your software.

## Strategic Guidance

### Hackathon Mode
Your pitch should explicitly call out the manual alternative. 'Right now, doctors spend 20 minutes writing these notes by hand. Watch me do it in 2 seconds.' The contrast between the manual alternative and your automated solution is what wins hackathons.

### Personal Project
Your current alternative is probably what motivated you to start this project. Document exactly what you are doing right now (e.g., 'I currently copy-paste this data every morning'). Your project is considered a success the day you stop using the alternative and start using your app.

### Production SaaS
You must calculate the 'Switching Cost'. Even if your software is 10x better than their messy Excel spreadsheet, the effort required to migrate their data and train their team might be too high. You have to ensure that the pain of the alternative is significantly higher than the friction of switching to your app.

## The Data We Need From You
**How are people solving this problem right now without your software?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Strategy Phase
\`\`\`prompt
Act as a Behavioral Economist. My target users are currently solving their problem by doing the following: [Insert Alternative]. My software automates this process. Give me a 3-step strategy to overcome the 'Status Quo Bias' and convince these users that the pain of switching to my software is worth the effort.
\`\`\`

## Accountability Check
- [ ] I understand the current workarounds my users rely on.`,
  'marketpositioning': `# Market Positioning

**Estimated Time:** 20 min

---

## Why this matters
Positioning is how you want your target audience to perceive you in relation to your competitors. Are you the premium, enterprise-grade option? Are you the cheap, bare-bones utility? Are you the AI-powered disruptor? Strong positioning makes marketing easier because you know exactly what to emphasize and what to ignore.

## Strategic Guidance

### Hackathon Mode
Position yourself as the 'Future'. Everything else is the 'Past'. Use words like 'Instant', 'Autonomous', and 'AI-Native'. You do not need nuanced positioning in a hackathon; you need extreme, polarizing contrast against the status quo.

### Personal Project
Positioning doesn't really matter for personal projects unless you are building an open-source library. If you are, position it based on developer ergonomics (e.g., 'The zero-dependency alternative to X' or 'The fastest way to do Y').

### Production SaaS
You must carve out a specific quadrant in the market map. If the market leader is complex and expensive, position yourself as simple and affordable. If the leader is generic, position yourself as hyper-specialized for a specific industry. Do not try to be better at everything; be exceptionally better at one specific dimension that your target user cares about.

## The Data We Need From You
**How are you positioning your product relative to the market leader? (e.g., We are the cheaper, faster, or more specialized alternative)**
\`\`\`input
Type your answer here...
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as a Brand Strategist. The current market leader in my space is [Insert Market Leader] and my product idea is [Insert Idea]. I want to position my product as [Insert Positioning]. Help me write a 2-sentence Positioning Statement using the standard format: 'For [target customer] who [statement of need], our product is a [category] that [key benefit].'
\`\`\`

## Accountability Check
- [ ] I have a clear positioning strategy against my competitors.`,
  'featureplanning': `# Feature Planning

**Estimated Time:** 25 min

---

## Why this matters
Feature bloat kills startups. Feature planning is the discipline of ruthlessly translating your solution statement into actionable software capabilities, and then aggressively cutting 80% of them. If you build every feature you can think of, you will run out of time, money, and motivation before you ever launch.

## Strategic Guidance

### Hackathon Mode
Plan exactly 3 features. 
1. A dead-simple login/auth flow (or skip it entirely).
2. The 'Magic' feature that does the core AI/data processing.
3. A beautiful results dashboard to show the judges.
Anything else is a distraction that will break during the live demo.

### Personal Project
List the features you need to solve your problem. Then, circle the ONE feature that is the actual bottleneck. Build that first as a CLI script or a single-page app. You do not need user profiles, settings pages, or dark mode toggles until the core feature works perfectly.

### Production SaaS
Map features directly to user pain points. If a feature does not alleviate a specific, documented pain point, it goes into the backlog. You must categorize features into 'Table Stakes' (things users expect, like password reset), 'Core Value' (the thing they pay for), and 'Delighters' (nice-to-haves that improve retention).

## The Data We Need From You
**List 5-10 features you believe your product needs to be successful.**
\`\`\`input
1. 
2. 
3. 
4. 
5. 
\`\`\`

## AI Expansion Phase
\`\`\`prompt
Act as a strict Product Manager. I have brainstormed the following features for my software: [Insert Features]. Be ruthless. Tell me which 2 features are likely 'shiny object distractions' that I should cut immediately, and explain why they do not belong in an early-stage product.
\`\`\`

## Accountability Check
- [ ] I have brainstormed features and began cutting the unnecessary ones.`,
  'mvpfeatures': `# MVP Features

**Estimated Time:** 20 min

---

## Why this matters
The Minimum Viable Product (MVP) is the absolute smallest thing you can build that still delivers the core value proposition. Every additional feature you add to your MVP delays your launch, burns your runway, and distracts from validating your core assumption. If your MVP isn't slightly embarrassing, you launched too late.

## Strategic Guidance

### Hackathon Mode
Your MVP is your entire project. If a feature takes more than 2 hours to build, it does not belong in the MVP. Hardcode the login, mock the database responses if the API is slow, and focus 90% of your engineering effort on the one 'wow' feature that you will show the judges.

### Personal Project
Your MVP is a single script or a basic React component. Don't add a database if a local JSON file works. Don't add a UI if a CLI command works. Build the absolute minimum required to solve your problem *today*, and you can add the fancy bells and whistles next weekend.

### Production SaaS
Your MVP must be commercially viable. It still needs to be minimal, but it cannot be broken or insecure. You must include a payment gateway (like Stripe Checkout), secure authentication, and the core utility. Cut all administrative dashboards, advanced reporting, and user role management until users actually ask for them.

## The Data We Need From You
**From your feature list, what are the absolute minimum 2-3 features required to make the product usable?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as an aggressive Startup Advisor. My proposed MVP features are: [Insert MVP Features]. Your goal is to force me to launch faster. Tell me how I can 'fake' or manually handle at least one of these features behind the scenes so I don't have to write code for it yet.
\`\`\`

## Accountability Check
- [ ] I have defined an embarrassingly simple MVP.`,
  'futurefeatures': `# Future Features

**Estimated Time:** 10 min

---

## Why this matters
You will have dozens of brilliant ideas while building your MVP. If you try to build them immediately, you will derail the project. The 'Future Features' backlog is a psychological safety valve: it gives you a place to write down your great ideas so you don't forget them, allowing you to get back to work on the MVP.

## Strategic Guidance

### Hackathon Mode
Future features are what you put on the 'What's Next' slide at the end of your presentation. It shows the judges that you have a vision beyond the 24-hour sprint. List 3 massive, ambitious features (like 'Full AI Autonomy' or 'Enterprise SSO') to show you are thinking big.

### Personal Project
Your future features are just your weekend wishlist. Whenever you get frustrated using your own MVP, add a note here. 'It would be cool if it could automatically send me a Slack message when it finishes.' Keep the list casual and low-pressure.

### Production SaaS
Future features are the foundation of your product roadmap. However, do not promise them to users yet. Write them down internally. When a user requests a feature, tally it against this list. When a feature gets enough tallies, move it from 'Future' to 'Active Development'.

## The Data We Need From You
**What are some 'nice-to-have' features that you are explicitly NOT building right now?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have offloaded my distracting ideas into a future backlog.`,
  'featureprioritization': `# Feature Prioritization

**Estimated Time:** 20 min

---

## Why this matters
Once you have a list of MVP features and Future Features, you need an objective way to decide what gets built first. Intuition is a terrible prioritization framework. If you build the easy things first, you might delay the riskiest, most important feature until it's too late.

## Strategic Guidance

### Hackathon Mode
Prioritize based on 'Demo Impact' versus 'Implementation Time'. If a feature looks incredibly cool on screen and takes 30 minutes to build (e.g., adding a sleek chart library), build it immediately. If it takes 4 hours and happens entirely in the backend with no visual output, cut it or fake it.

### Personal Project
Prioritize based on personal annoyance. Which missing feature is causing you the most friction right now? Build that one. The goal is to maximize your own utility as quickly as possible.

### Production SaaS
Use a formal matrix like the Eisenhower Matrix (Urgent/Important) or RICE (Reach, Impact, Confidence, Effort). You must prioritize the features that either directly drive revenue (e.g., upgrading payment tiers) or directly reduce churn (e.g., fixing a critical bug). Everything else is secondary.

## AI Execution Phase
\`\`\`prompt
Act as a Technical Product Manager. I have the following features I want to build: [Insert Features]. I need to prioritize them. Please place them into an 'Impact vs. Effort' matrix. Format the output as a clean table, categorizing them into: Quick Wins (High Impact, Low Effort), Major Projects (High Impact, High Effort), Fill-ins (Low Impact, Low Effort), and Time Wasters (Low Impact, High Effort).
\`\`\`

## Accountability Check
- [ ] I know exactly which single feature I am building next.`,
  'businessmodel': `# Business Model

**Estimated Time:** 20 min

---

## Why this matters
A product is not a business. A business requires a mechanism to capture value (make money) from the value it creates. If you do not define your business model early, you might build an architecture that cannot support it (e.g., building a single-tenant app when you need a multi-tenant subscription SaaS).

## Strategic Guidance

### Hackathon Mode
Pick a business model that sounds plausible and throw it on a slide. B2B SaaS subscriptions or taking a 2% cut of transactions (Marketplace model) are usually the easiest to defend in a Q&A session. You don't need to actually implement Stripe.

### Personal Project
Your business model is 'Free forever.' You are not trying to monetize this. However, if hosting costs become an issue, you might eventually consider a 'Pay what you want' or GitHub Sponsors model. For now, ignore monetization entirely.

### Production SaaS
You must choose your model carefully. B2B SaaS (recurring subscriptions) is the gold standard for predictable revenue, but requires a high-value product. Usage-based pricing (pay-per-API-call) is great for developer tools but leads to unpredictable revenue. Freemium is a marketing strategy, not a business model, and will bankrupt you if your server costs are high.

## The Data We Need From You
**How exactly will this software make money?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Strategy Phase
\`\`\`prompt
Act as a SaaS Financial Analyst. My proposed business model is: [Insert Business Model]. Critique this model based on industry standards. Then, suggest one alternative business model I might not have considered (e.g., usage-based, tiered subscription, one-time lifetime deal) and explain why it might work better for my specific product.
\`\`\`

## Accountability Check
- [ ] I have a clear plan for how this product captures value.`,
  'pricing': `# Pricing Strategy

**Estimated Time:** 20 min

---

## Why this matters
Pricing is the most neglected growth lever. Most founders guess a number (usually $9/mo) and never change it. Pricing dictates your marketing channels: you cannot afford to run Facebook Ads or hire a sales team if your product only costs $5/month. Pricing determines the survival of your business.

## Strategic Guidance

### Hackathon Mode
Make up three tiers: Free, Pro ($29/mo), and Enterprise (Contact Us). Put a shiny 'Most Popular' badge on the Pro tier. It shows the judges you understand basic SaaS economics. 

### Personal Project
If you ever decide to sell your personal project, sell it as a one-time purchase (e.g., a $50 lifetime license). Managing recurring subscriptions, dealing with failed credit cards, and handling customer support for a $5/mo product is a nightmare for a solo developer doing this for fun.

### Production SaaS
Charge more. Start by identifying the quantifiable value your product provides (e.g., saves 10 hours a month = $500 value). Charge 10-20% of that value ($50-$100/mo). Do not compete on price; compete on value. If you are cheaper than the competition, enterprise customers will assume your product is worse.

## The Data We Need From You
**What are your initial pricing tiers and price points?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Strategy Phase
\`\`\`prompt
Act as a Pricing Strategy Consultant. My SaaS product does [Insert Core Function] and my target audience is [Insert Audience]. My current idea for pricing is [Insert Pricing Idea]. Please analyze this pricing. Suggest a 3-tier pricing structure (Basic, Pro, Business) and explicitly define the 'Value Metric' (e.g., number of seats, amount of storage) that should separate the tiers.
\`\`\`

## Accountability Check
- [ ] I have established my initial pricing tiers.`,
  'subscriptionmodel': `# Subscription Model

**Estimated Time:** 15 min

---

## Why this matters
The subscription model is the holy grail of SaaS because it provides predictable, recurring revenue. However, deciding exactly *what* the user is subscribing to—seats, usage, or features—can make or break your growth. If your subscription model introduces too much friction, users will churn before they form a habit.

## Strategic Guidance

### Hackathon Mode
Don't implement a subscription model. Just assume it exists. If you must show it, hardcode a 'Pro Plan - Active' badge in the UI. Judges want to see the core technology working, not a Stripe integration.

### Personal Project
Again, avoid subscriptions entirely. If you want to accept donations for an open-source project, use GitHub Sponsors or Buy Me a Coffee. Managing subscriptions for a hobby project will burn you out.

### Production SaaS
You must carefully select your 'Value Metric'. If you charge per user (seat-based), you penalize companies for sharing your tool. If you charge by usage (e.g., API calls), your revenue might be volatile. The best model usually combines a base platform fee with a usage-based element (e.g., $99/mo + $0.01 per transaction).

## The Data We Need From You
**What is the core metric you are charging for? (e.g., Per user, per 1,000 emails, per gigabyte)**
\`\`\`input
Type your answer here...
\`\`\`

## AI Strategy Phase
\`\`\`prompt
Act as a SaaS Pricing Expert. I want to charge for my product based on [Insert Metric]. Evaluate this value metric. Is it easily understandable to the user? Does it scale linearly with the value they receive? Suggest one alternative value metric that might align better with the user's success.
\`\`\`

## Accountability Check
- [ ] I have selected a logical value metric for my subscriptions.`,
  'revenuestreams': `# Revenue Streams

**Estimated Time:** 15 min

---

## Why this matters
While your core SaaS subscription will likely be your primary revenue driver, successful companies often layer multiple revenue streams to increase Average Revenue Per User (ARPU). Offering priority support, one-time setup fees, or white-labeling can significantly boost your cash flow in the early days.

## Strategic Guidance

### Hackathon Mode
Ignore this entirely. Your sole focus is the core product. One hypothetical revenue stream is plenty for a 3-minute pitch.

### Personal Project
If you want to monetize a personal project without subscriptions, consider a 'One-Time Payment for Lifetime Access' (like a desktop app) or selling a template/course alongside the free open-source tool.

### Production SaaS
Do not rely on just a $20/month subscription if you are selling B2B. Enterprise companies have budgets for 'Implementation' and 'Training'. Offer a $2,000 'Done-For-You Setup' package. It gives you immediate cash flow and drastically reduces the chance that the enterprise customer will churn in the first month.

## The Data We Need From You
**Aside from the core subscription, what is one additional way you could monetize your users?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Brainstorming Phase
\`\`\`prompt
Act as a Startup Consultant. My core SaaS product does [Insert Core Function]. My primary revenue stream is a monthly subscription. Give me 3 creative, high-margin, secondary revenue streams I could offer to my most engaged users to increase Average Revenue Per User (ARPU) without significantly increasing my engineering workload.
\`\`\`

## Accountability Check
- [ ] I have brainstormed at least one secondary revenue stream.`,
  'successmetrics': `# Success Metrics

**Estimated Time:** 15 min

---

## Why this matters
If you don't know what success looks like, you won't know if your software is actually working. Success metrics help you move away from 'vanity metrics' (like page views or Twitter followers) and focus on the numbers that actually dictate the health of your business.

## Strategic Guidance

### Hackathon Mode
Your success metric is 'Did the demo work without crashing?' and 'Did we get the project submitted on time?' That's it.

### Personal Project
Your success metric is personal utility. 'Does this tool save me 2 hours a week?' or 'Did I successfully learn how to use GraphQL by building this?' If yes, the project is a resounding success.

### Production SaaS
Your success metrics must be actionable. You need to track Activation Rate (what percentage of signups actually use the core feature), Retention Rate (what percentage stick around after 30 days), and Customer Acquisition Cost (CAC). If these numbers are bad, no amount of marketing will save you.

## The Data We Need From You
**What are the 3 most important metrics you need to track to know if your business is healthy?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] I have defined clear success metrics.`,
  'kpis': `# KPIs (Key Performance Indicators)

**Estimated Time:** 20 min

---

## Why this matters
While 'Success Metrics' are broad goals, KPIs are specific, time-bound targets that hold your team accountable. 'Improve retention' is a goal. 'Increase Day-30 retention from 15% to 25% by Q3' is a KPI. KPIs turn vague ambitions into engineering tickets.

## Strategic Guidance

### Hackathon Mode
You don't need KPIs for a 24-hour sprint. Your only KPI is time remaining before the submission deadline.

### Personal Project
Set a KPI for consistency rather than outcome. For example, 'Commit code 3 times a week' or 'Launch V1 by the end of the month'. Do not set user growth KPIs for personal projects; it ruins the fun.

### Production SaaS
You must implement a tight feedback loop. Every feature you build should be explicitly tied to a KPI. If you are building a new email notification system, the KPI is 'Increase Weekly Active Users by 10%'. If you launch the feature and the KPI doesn't move, you must iterate or remove the feature.

## The Data We Need From You
**Write down one specific, time-bound KPI for your product launch.**
\`\`\`input
Type your answer here...
\`\`\`

## AI Strategy Phase
\`\`\`prompt
Act as a Data-Driven CEO. My broad goal for my SaaS is [Insert Broad Goal]. Please break this down into 3 specific, measurable, achievable, relevant, and time-bound (SMART) KPIs. Explain exactly what analytics events I need to track in my codebase to measure these KPIs accurately.
\`\`\`

## Accountability Check
- [ ] I have translated my broad goals into specific KPIs.`,
  'northstarmetric': `# North Star Metric

**Estimated Time:** 10 min

---

## Why this matters
The North Star Metric is the single most important number your entire company aligns around. It is the metric that best captures the core value your product delivers to its customers. When the North Star Metric grows, the business grows. For Airbnb, it's 'Nights Booked'. For WhatsApp, it's 'Messages Sent'.

## Strategic Guidance

### Hackathon Mode
Your North Star Metric is 'Wow factor during the demo'. Everything you build over the weekend must maximize this metric.

### Personal Project
Your North Star Metric is 'Personal usage'. Are you actually using your own tool every day? If that number drops to zero, the project is dead.

### Production SaaS
Do not pick a vanity metric like 'Daily Active Users' (DAU) as your North Star unless you are building a social network. Pick a metric that reflects actual value delivered. If you are building an invoice tool, your North Star is 'Total Dollar Value of Invoices Paid'. If you are building a CI/CD tool, it's 'Number of Successful Builds'.

## The Data We Need From You
**What is the single North Star Metric for your product?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as a Growth Hacker. My product is [Insert Product Description]. I am considering [Insert Metric] as my North Star Metric. Evaluate this metric. Does it accurately reflect the value the user receives? Can it be easily manipulated? Suggest two better alternatives if this one is weak.
\`\`\`

## Accountability Check
- [ ] I have defined a single North Star Metric for my product.`,
  'prd': `# PRD (Product Requirements Document)

**Estimated Time:** 30 min

---

## Why this matters
A Product Requirements Document (PRD) is the single source of truth for what you are building. It translates your abstract ideas, problem statements, and feature lists into a concrete blueprint. If you start coding without a PRD, you will get lost in the weeds, build the wrong things, and lose track of the core user journey.

## Strategic Guidance

### Hackathon Mode
Your PRD is literally a single bulleted list of the 3 features you agreed on in the Idea phase. Do not write a formal document. Write it on a physical whiteboard or a sticky note on your monitor so you don't get distracted by scope creep at 3:00 AM.

### Personal Project
A simple markdown file in your repository named `README.md` or `REQUIREMENTS.md` is sufficient. Document exactly what the MVP must do before you consider it "done". This prevents the project from becoming a never-ending sandbox where you constantly add new libraries but never finish the core utility.

### Production SaaS
A Production PRD must be rigorous. It should include the Problem Statement, Target Personas, User Stories (e.g., 'As a user, I want to X so that Y'), Acceptance Criteria, Out-of-Scope items, and technical constraints. This document is handed to engineers and designers, so ambiguity is your enemy.

## The Data We Need From You
**Write one critical User Story for your MVP. Format: As a [User], I want to [Action], so that [Benefit].**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a Senior Product Manager. Based on my project idea [Insert Idea] and my core features [Insert Features], generate a comprehensive but concise Product Requirements Document (PRD). Include User Stories, Acceptance Criteria for the MVP, and explicitly list 3 things that are OUT OF SCOPE for V1.
\`\`\`

## Accountability Check
- [ ] I have generated a PRD and documented my out-of-scope items.`,
  'userflows': `# User Flows

**Estimated Time:** 45 min

---

## Why this matters
A User Flow is the path a user takes through your app to complete a specific task. If you don't map this out, you will accidentally build "dead ends" where the user gets stuck, or you will create a 10-step process for something that should take 2 steps. Visualizing the flow forces you to simplify the UX before you write code.

## Strategic Guidance

### Hackathon Mode
Map out the "Happy Path"—the exact sequence of clicks you will perform during your live demo. You do not need to map out error states, password resets, or edge cases. Just make sure the demo flow is seamless from start to finish.

### Personal Project
Map the flow for your primary use case. How many clicks does it take from opening the app to getting the result you want? If it takes more than 3 clicks, the flow is too complex for a utility app. Optimize it.

### Production SaaS
You must map every possible state. What happens if a user clicks "Checkout" but their credit card fails? What happens if they invite a team member who already has an account? You need flowchart diagrams (using tools like FigJam, Whimsical, or Mermaid.js) that account for onboarding, core loops, edge cases, and empty states.

## The Data We Need From You
**What are the exact steps a new user takes from Landing Page to their first "Aha!" moment?**
\`\`\`input
1. User lands on homepage.
2. 
3. 
\`\`\`

## AI Brainstorming Phase
\`\`\`prompt
Act as a UX Architect. I am designing a user flow for [Insert Core Task]. The user starts at [Starting Point] and needs to reach [Ending Point]. Provide a step-by-step user flow. Then, identify the step with the highest "friction" and suggest a UX pattern to reduce that friction.
\`\`\`

## Accountability Check
- [ ] I have mapped the critical user flows for my application.`,
  'informationarchitecture': `# Information Architecture

**Estimated Time:** 30 min

---

## Why this matters
Information Architecture (IA) is how you organize and label content in your app. It dictates your navigation menus, your URL structure, and your database hierarchy. If your IA is confusing, users won't be able to find their own data, and engineers will struggle to build a logical routing system.

## Strategic Guidance

### Hackathon Mode
Skip it. Put everything on a single scrolling dashboard. Navigation menus are a waste of time when you only have 24 hours.

### Personal Project
Keep it incredibly flat. You likely only need two routes: `/` (the main tool) and `/settings`. Don't overcomplicate your routing or folder structure for a simple project.

### Production SaaS
You need a formal sitemap. Will you use a left sidebar, a top navigation bar, or a multi-level drill-down menu? You must logically group features (e.g., putting 'Billing', 'Team Members', and 'API Keys' under a unified '/settings' route). The IA must scale so that when you add 50 new features next year, the navigation doesn't break.

## The Data We Need From You
**List the top-level navigation items that will appear in your app's main menu.**
\`\`\`input
1. Dashboard
2. 
3. 
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as a UX/UI Specialist. Here are all the pages and features my app will have: [Insert Features/Pages]. Please organize them into a logical Information Architecture (Sitemap). Group related items together under top-level navigation categories, and suggest intuitive labels for the navigation menu.
\`\`\`

## Accountability Check
- [ ] I have a logical site map and navigation structure.`,
  'wireframes': `# Wireframes

**Estimated Time:** 60 min

---

## Why this matters
Wireframes are low-fidelity, black-and-white sketches of your UI. They allow you to rapidly iterate on layout, content hierarchy, and user flows without getting distracted by colors, fonts, or CSS. It is 100x faster to erase a bad idea on a whiteboard than it is to refactor a React component.

## Strategic Guidance

### Hackathon Mode
Sketch the 3 main screens on a piece of physical paper. Do not use Figma; it is too slow for a 24-hour sprint. The sketches exist solely to give your frontend developer a rough idea of where to place the `<divs>` while the backend developer works on the API.

### Personal Project
Use a digital whiteboarding tool like Excalidraw to block out the layout. You don't need pixel perfection, just a spatial understanding of where the inputs, outputs, and buttons will go.

### Production SaaS
You must create comprehensive wireframes in Figma or Balsamiq for every major screen, including mobile, tablet, and desktop breakpoints. These wireframes must be reviewed against the PRD to ensure no features were missed before any high-fidelity design or coding begins.

## AI Brainstorming Phase
\`\`\`prompt
Act as a UI Designer. I am building a screen for [Insert Screen Purpose, e.g., A Dashboard showing analytics]. Provide a text-based wireframe layout. Describe what should go in the Header, the Left Sidebar, the Main Content Area (top, middle, bottom), and explicitly mention what the primary Call-to-Action (CTA) button should say and where it should be placed.
\`\`\`

## Accountability Check
- [ ] I have sketched the primary screens of my application.`,
  'designsystem': `# Design System

**Estimated Time:** 30 min

---

## Why this matters
A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications. Without it, you will have 15 different shades of blue, buttons with slightly different border radii, and a codebase that is a nightmare to maintain. A good design system speeds up development by 10x.

## Strategic Guidance

### Hackathon Mode
Your design system is Tailwind CSS or a pre-built component library like shadcn/ui or Chakra UI. Do not build custom components. Do not spend time configuring complex color palettes. Pick a single primary color that matches the hackathon theme, apply it globally, and use default components for everything else.

### Personal Project
Pick a component library that you want to learn. If you've never used Radix UI, use this project to learn it. Define a few CSS variables for your primary and background colors in `index.css`, but don't spend days building a Storybook library for a solo project.

### Production SaaS
You must establish a strict foundation before coding. Define your Design Tokens (colors, typography, spacing, shadows). You should strongly consider using an established framework like Tailwind paired with headless UI components (like shadcn/ui), but you must strictly enforce the usage of these components. If an engineer writes custom CSS instead of using the design system, it should fail code review.

## The Data We Need From You
**What component library or styling framework will you use as your foundation?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Generation Phase
\`\`\`prompt
Act as a UI Engineer. I am using Tailwind CSS to build my app. My primary brand color is [Insert Color Hex]. Please generate the `tailwind.config.js` theme configuration that extends the default theme. Include a 50-900 color scale for my primary color, and define standard semantic colors for 'success', 'warning', and 'error' states.
\`\`\`

## Accountability Check
- [ ] I have chosen a styling framework and defined my primary colors.`,
  'branding': `# Branding

**Estimated Time:** 20 min

---

## Why this matters
Branding is more than a logo; it is the emotional response a user has when interacting with your product. A strong brand builds trust, justifies premium pricing, and differentiates you from generic competitors. A poorly branded SaaS looks like a scam or an abandoned student project.

## Strategic Guidance

### Hackathon Mode
Your brand is your project name and a single emoji. That is all you have time for. Do not spend 4 hours designing a logo in Illustrator. Pick a clever name, use a bold font, and get back to coding.

### Personal Project
Keep it minimal. If you want a logo, use a free icon from Lucide or Heroicons and put your project name next to it in a clean sans-serif font like Inter or Roboto. Your brand is "Clean and Functional."

### Production SaaS
You need a cohesive brand identity. This includes a memorable name, a professional logo, a defined tone of voice (e.g., formal vs. playful), and a primary typography scale. Your brand must appeal directly to your Buyer Persona. If you are selling to banks, use deep blues, serif fonts, and a serious tone. If you are selling to Gen-Z creators, use vibrant gradients and casual language.

## The Data We Need From You
**What are the 3 adjectives that describe the "vibe" or tone of your brand?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Brainstorming Phase
\`\`\`prompt
Act as a Brand Agency Director. My SaaS product does [Insert Core Function]. I want the brand to feel [Insert Adjectives]. Please generate 10 creative, available, and short name ideas (under 10 characters if possible). Then, suggest two contrasting Google Fonts (one for headings, one for body) that perfectly capture this vibe.
\`\`\`

## Accountability Check
- [ ] I have established the core visual identity and tone of my product.`,
  'accessibility': `# Accessibility (a11y)

**Estimated Time:** 15 min

---

## Why this matters
Accessibility ensures that users with disabilities (vision, motor, auditory) can actually use your software. Ignoring accessibility is not just bad UX; in many jurisdictions (like the EU or for US Government contracts), it is illegal. Furthermore, accessible HTML (like semantic tags) naturally improves your SEO.

## Strategic Guidance

### Hackathon Mode
Ignore it. You do not have time to worry about ARIA labels or color contrast ratios. If it works for the judge looking at the screen, it ships.

### Personal Project
Practice good habits. Use semantic HTML (`<nav>`, `<main>`, `<button>` instead of `<div onClick>`). It doesn't take extra time to write semantic HTML, and it makes your code cleaner and easier to read.

### Production SaaS
You must meet WCAG 2.1 AA standards. This is non-negotiable if you plan to sell to enterprise or government clients. You must ensure sufficient color contrast, full keyboard navigation (users must be able to use your app without a mouse), screen-reader support (ARIA labels), and focus states for all interactive elements. Build this into your Design System from day one; retrofitting accessibility is a nightmare.

## The Data We Need From You
**Will you be using a headless UI library (like Radix or Headless UI) that handles accessibility out of the box?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have considered accessibility and semantic HTML for my project.`,
  'techstackselection': `# Tech Stack Selection

**Estimated Time:** 20 min

---

## Why this matters
Your tech stack is the foundation of your entire product. Choosing the wrong stack can lead to massive technical debt, slow development speed, or inability to hire engineers later. However, obsessing over the "perfect" stack is a form of procrastination. The best stack is usually the one you already know.

## Strategic Guidance

### Hackathon Mode
Use the stack you are fastest in. If you are a Python wizard, use Flask/FastAPI. If you know React, use Next.js or Vite. Do not learn a new framework at a hackathon unless the specific goal of the hackathon is to learn that framework. Use a Backend-as-a-Service (BaaS) like Supabase or Firebase to skip database configuration.

### Personal Project
This is the perfect time to experiment! If you've always wanted to try SvelteKit, Rust, or Go, use this project as your sandbox. You aren't tied to a deadline, so the learning curve is part of the fun.

### Production SaaS
Boring technology is good technology. Choose a stack with a massive ecosystem, excellent documentation, and a large hiring pool. React/Next.js for the frontend, Node/Python/Go for the backend, and PostgreSQL for the database is the gold standard for a reason. Avoid ultra-bleeding-edge frameworks that might be abandoned next year.

## The Data We Need From You
**What are your primary choices for Frontend, Backend, and Database?**
\`\`\`input
Frontend: 
Backend: 
Database: 
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as a Principal Engineer. My proposed tech stack is: [Insert Stack]. My product is: [Insert Product]. Critique this stack. Tell me 2 potential scaling bottlenecks I might hit with this stack, and suggest 1 alternative tool that might be a better fit for my specific product use case.
\`\`\`

## Accountability Check
- [ ] I have finalized my tech stack and I am ready to stick with it.`,
  'frontendarchitecture': `# Frontend Architecture

**Estimated Time:** 20 min

---

## Why this matters
Frontend code rots faster than backend code. If you do not plan your component hierarchy, state management, and routing strategy, your frontend will become an unmaintainable "spaghetti" of props drilling and conflicting state within a few months.

## Strategic Guidance

### Hackathon Mode
Put all your state in the top-level component and pass it down as props, or just use React Context if it gets too deep. Do not bother setting up Redux, Zustand, or complex server-state caching layers like React Query. Keep it flat, keep it simple.

### Personal Project
Pick an architecture pattern and stick to it. If you want to learn atomic design, structure your folders into `atoms`, `molecules`, and `organisms`. Try out a modern state manager like Zustand or Jotai just to see how it feels.

### Production SaaS
You must separate Server State (data from the database) from Client State (UI toggles, active tabs). Use a tool like React Query, SWR, or Apollo for server state caching and deduplication. Enforce a strict folder structure (e.g., Feature-Sliced Design or Next.js App Router conventions). Decide on your data-fetching strategy (SSR vs. CSR vs. SSG) based on your SEO requirements.

## The Data We Need From You
**How will you manage data fetching and state? (e.g., React Query, Redux, Context API)**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have decided on a folder structure and state management strategy.`,
  'backendarchitecture': `# Backend Architecture

**Estimated Time:** 30 min

---

## Why this matters
The backend is the brain of your application. It handles business logic, security, and data integrity. A monolithic architecture is great for speed, while microservices are great for scaling independent teams. Choosing the right pattern dictates how you deploy, monitor, and debug your application.

## Strategic Guidance

### Hackathon Mode
Use a Backend-as-a-Service (BaaS) like Supabase, Firebase, or Convex. Let them handle the database, authentication, and API endpoints. Write serverless edge functions only for the specific "magic" parts of your app. Do not write a custom Express or Django backend from scratch.

### Personal Project
If you want to learn backend engineering, build a simple Monolith. Put your API, your database connection, and your business logic in a single deployable service. It's cheap to host on Render, Railway, or Heroku, and easy to reason about.

### Production SaaS
Start with a Majestic Monolith. Do not start with Microservices unless you have a team of 10+ engineers. Build a modular monolith where domains (e.g., `Users`, `Billing`, `Products`) are separated by folders, not network requests. Use an ORM (like Prisma or Drizzle) for type safety, and ensure you have a robust dependency injection or service-layer pattern to keep your controllers thin.

## The Data We Need From You
**Are you using a BaaS (like Supabase), Serverless Functions (like Vercel), or a dedicated Server (like Node/Express)?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as a Backend Architect. I am building [Insert App] using [Insert Backend Strategy]. Give me a high-level folder structure for my backend code. Explain where I should put my routing, my business logic, and my database queries so they remain separated and testable.
\`\`\`

## Accountability Check
- [ ] I have determined my backend architecture pattern.`,
  'apidesign': `# API Design

**Estimated Time:** 30 min

---

## Why this matters
Your API is the contract between your frontend and your backend. If the contract is poorly designed, both sides of your stack will break constantly. A well-designed API (whether REST, GraphQL, or tRPC) is predictable, versionable, and secure.

## Strategic Guidance

### Hackathon Mode
Use whatever is fastest. If you are using Next.js, just use Server Actions or basic API routes. Do not worry about strict REST conventions (like returning a `201 Created` vs a `200 OK`). If the data gets to the frontend, the API is successful.

### Personal Project
Try using a modern type-safe API layer like tRPC if you are in a TypeScript monorepo. It will save you from having to write duplicate types for your frontend and backend. It's an incredible developer experience for solo projects.

### Production SaaS
You must adhere to strict standards. If using REST, use proper HTTP verbs (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) and standard status codes. You must implement pagination for list endpoints, rate limiting to prevent abuse, and clear error schemas so the frontend knows exactly why a request failed. Document your API using OpenAPI/Swagger.

## The Data We Need From You
**What API paradigm will you use? (e.g., REST, GraphQL, tRPC, Server Actions)**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as an API Designer. I need an API endpoint to [Insert Core Action, e.g., Create a new User Profile]. Provide the JSON schema for the Request Body, and the JSON schema for a successful Response. Also, list 3 potential HTTP Error Codes this endpoint might return and explain why.
\`\`\`

## Accountability Check
- [ ] I have decided on an API paradigm and understand how data will flow.`,
  'authentication': `# Authentication

**Estimated Time:** 15 min

---

## Why this matters
Authentication verifies *who* the user is. If you mess this up, you leak user data and ruin your reputation instantly.

## Strategic Guidance

### Hackathon Mode
Fake it. 

Hardcode a single user session into your app's state. Don't waste 4 hours trying to get OAuth working when you could be building the core feature. If you absolutely must have auth, use Supabase Auth or Clerk and stick strictly to Email/Password.

### Personal Project
Use this as an opportunity to learn how JWTs (JSON Web Tokens) or session cookies actually work under the hood. Build your own simple auth flow just for the learning experience.

### Production SaaS
Do not build your own auth. 

Use an established provider like Supabase Auth, Auth0, or Clerk. You must support social logins (Google, GitHub) to reduce onboarding friction. You must implement password resets and email verification perfectly.


## Accountability Check
- [ ] I understand my authentication strategy.
`,
  'authorizationroles': `# Authorization & Roles

**Estimated Time:** 20 min

---

## Why this matters
While Authentication verifies *who* you are, Authorization verifies *what you are allowed to do*. If a user can access another user's invoice by simply changing an ID in the URL, your authorization is broken (Insecure Direct Object Reference). Role-Based Access Control (RBAC) prevents this.

## Strategic Guidance

### Hackathon Mode
Hardcode it. If `user.email === 'admin@demo.com'`, show the admin panel. Otherwise, show the normal view. Do not build a complex permissions matrix for a 24-hour project.

### Personal Project
If it's just a tool for yourself, you don't need roles. Just require authentication. If it's a multi-user tool, a simple `isAdmin` boolean column on the user table is usually sufficient.

### Production SaaS
You must implement robust Role-Based Access Control (RBAC) or Attribute-Based Access Control (ABAC). Define roles like `Owner`, `Admin`, `Editor`, and `Viewer`. Enforce authorization at the *backend API level* (e.g., using Row Level Security in Supabase or middleware guards in your API), not just by hiding UI buttons on the frontend.

## The Data We Need From You
**What are the primary user roles in your application?**
\`\`\`input
1. Admin
2. 
3. 
\`\`\`

## AI Strategy Phase
\`\`\`prompt
Act as a Security Architect. My application has the following user roles: [Insert Roles]. Please generate a clear Permissions Matrix (as a markdown table) mapping these roles to the core CRUD actions (Create, Read, Update, Delete) for my main data models. Highlight any security risks where a lower-tier role might have too much power.
\`\`\`

## Accountability Check
- [ ] I have defined the roles and permissions for my application.`,
  'databaseschema': `# Database Schema

**Estimated Time:** 45 min

---

## Why this matters
Your database schema is the skeleton of your application. If you get the schema right, everything else is just writing simple queries. If you get it wrong, you will spend months writing complex, slow, unmaintainable joins and workarounds to fix bad data structures.

## Strategic Guidance

### Hackathon Mode
Keep it flat. Do not worry about Third Normal Form (3NF) or complex relationships. If you need to store a user's address, just put it directly in the `users` table as a JSON column or flat text fields. The goal is to get data in and out as fast as possible for the demo.

### Personal Project
Take the time to model it correctly. Use a tool like Prisma to define your schema, which gives you type safety for free. Avoid NoSQL (like MongoDB) unless your data is genuinely unstructured; a relational database (PostgreSQL) is almost always the better choice for 99% of projects.

### Production SaaS
You must design for scale and data integrity. Use foreign keys, strict constraints, and proper indexes. Never delete data; use soft deletes (`deleted_at` timestamp) for critical records. Map out your entity-relationship (ER) diagram in a tool like dbdiagram.io before creating any tables. Ensure your schema supports multi-tenancy (e.g., every table needs a `tenant_id` or `workspace_id`).

## The Data We Need From You
**What are the 3-5 core tables (entities) your application requires? (e.g., Users, Workspaces, Invoices)**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a Database Architect. I am building [Insert App]. My core entities are [Insert Entities]. Please generate a PostgreSQL schema (or Prisma schema) for these entities. Include primary keys, foreign keys for relationships, indexes on frequently queried columns, and basic timestamp columns (created_at, updated_at).
\`\`\`

## Accountability Check
- [ ] I have defined the core database tables and their relationships.`,
  'filestorage': `# File Storage

**Estimated Time:** 15 min

---

## Why this matters
Storing files (images, PDFs, videos) directly in your database is a terrible idea that will bloat your database, slow down queries, and drastically increase your hosting costs. You must use a dedicated object storage service and save only the file URL in your database.

## Strategic Guidance

### Hackathon Mode
Do not build file uploads if you can avoid it. Just let the user paste an image URL from Google Images. If you absolutely must have uploads, use an external service like UploadThing or Cloudinary that handles the hosting and provides a pre-built React component. Do not try to configure AWS S3 in 24 hours.

### Personal Project
Supabase Storage or Firebase Storage are perfect here. They integrate seamlessly with the database and authentication, allowing you to easily write rules like 'Only the user who uploaded this file can view it'.

### Production SaaS
AWS S3 (or an S3-compatible service like Cloudflare R2) is the industry standard. You must implement secure upload patterns: the frontend should request a 'presigned URL' from your backend, and then upload the file directly to S3. This prevents large files from passing through and crashing your backend servers.

## The Data We Need From You
**What kind of files will users upload, and what storage provider will you use?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have selected an object storage provider and understand the upload flow.`,
  'thirdpartyintegrations': `# Third Party Integrations

**Estimated Time:** 20 min

---

## Why this matters
You do not have time to build a payment processor, an email sender, and a CRM from scratch. Third-party integrations (APIs) allow you to stand on the shoulders of giants. However, every integration introduces a new point of failure, a new security risk, and a new dependency you cannot control.

## Strategic Guidance

### Hackathon Mode
Integrations are the lifeblood of a hackathon. Use as many "wow-factor" APIs as you can (e.g., Twilio for SMS, OpenAI for AI, Stripe for fake checkouts). Do not worry about API rate limits or error handling. If the API goes down during your demo, pivot and explain what *would* have happened.

### Personal Project
Only integrate what is absolutely necessary. Try to use free tiers heavily. If you just need to send a transactional email, use Resend. If you need a database, use Supabase. Avoid complex integrations that require massive OAuth setups unless learning that OAuth flow is the goal of the project.

### Production SaaS
Treat every integration as a liability. Wrap third-party calls in your own internal services so if you ever need to swap them out (e.g., moving from SendGrid to Postmark), you only change code in one place. You must implement robust error handling, exponential backoff for failed requests, and webhook signature verification for incoming events.

## The Data We Need From You
**List the top 3 external APIs or services your app absolutely requires to function.**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] I have identified my critical third-party dependencies.`,
  'aiarchitectureoptional': `# AI Architecture (Optional)

**Estimated Time:** 30 min

---

## Why this matters
Adding "AI" is easy. Building a robust AI architecture is incredibly hard. If you are just making simple API calls to OpenAI, you will quickly hit rate limits, context window limits, and cost overruns. If your product relies heavily on AI, you must architect the pipeline correctly.

## Strategic Guidance

### Hackathon Mode
Just make the direct API call to OpenAI/Anthropic from your backend. Do not worry about streaming responses, vector databases, or complex prompt chains. Hardcode a massive system prompt and just get the "magic" output working for the demo.

### Personal Project
This is a great time to experiment with the Vercel AI SDK or LangChain. Try implementing streaming responses so the UI doesn't freeze while waiting for the LLM. If you want to try RAG (Retrieval-Augmented Generation), use a simple vector store like Pinecone or Supabase pgvector.

### Production SaaS
You must treat AI calls like slow, expensive, unreliable database queries. Implement aggressive caching for identical prompts. Use queues (like Redis/BullMQ) for long-running AI tasks so you don't block the main thread. You must also implement "Guardrails" to prevent prompt injection and ensure the AI doesn't output offensive or wildly hallucinated content to your paying users.

## The Data We Need From You
**If using AI, what is your primary model provider and how will you manage long-running tasks?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as an AI Systems Architect. I am integrating an LLM into my app to do [Insert Task]. My current plan is [Insert Plan]. Please critique this architecture. Specifically, warn me about edge cases regarding context limits, hallucination mitigation, and API rate limiting, and suggest how to handle them.
\`\`\`

## Accountability Check
- [ ] I have a plan for handling the unreliability and latency of AI models.`,
  'systemarchitecturediagram': `# System Architecture Diagram

**Estimated Time:** 30 min

---

## Why this matters
If you cannot draw your architecture on a whiteboard, it is too complicated. A visual diagram forces you to see how all the pieces (Frontend, Backend, Database, Storage, Third-Party APIs) connect. It reveals single points of failure and clarifies the "mental model" of the application.

## Strategic Guidance

### Hackathon Mode
Skip the diagram. You don't have time. If a judge asks about architecture, just list the logos of the tools you used.

### Personal Project
Draw a quick sketch on a piece of paper or use Excalidraw. It doesn't need to follow strict UML standards. Just map out how data flows from the user's browser, through your API, into the database, and back again.

### Production SaaS
You need a formal architecture diagram. Tools like Draw.io, Lucidchart, or cloud-provider specific diagramming tools are essential. You must map out VPCs, load balancers, caching layers (Redis), worker queues, and read-replicas. This diagram will be required for any SOC2 compliance audits or serious investor due diligence.

## AI Generation Phase
\`\`\`prompt
Act as a Cloud Architect. Based on my tech stack [Insert Stack] and my third-party integrations [Insert Integrations], generate Mermaid.js code that visually maps out my system architecture. Include the User Browser, Frontend Server, Backend Server, Database, Cache (if any), and external APIs.
\`\`\`

## Accountability Check
- [ ] I have a clear mental model (or visual diagram) of how my system connects.`,
  'costestimation': `# Cost Estimation

**Estimated Time:** 15 min

---

## Why this matters
Cloud computing makes it incredibly easy to accidentally spend $5,000 over a weekend if you write an infinite loop that calls an external API. Understanding your baseline fixed costs and your variable (usage-based) costs ensures your business model is actually profitable.

## Strategic Guidance

### Hackathon Mode
Zero dollars. Use free tiers exclusively. Vercel, Supabase, Clerk, and GitHub all have incredibly generous free tiers. The only thing you might pay for is a few pennies of OpenAI API usage.

### Personal Project
Also zero dollars, or at most $5/month for a cheap VPS (like DigitalOcean or Hetzner). The goal of a personal project is to cost as close to zero as possible so you can keep it running forever without thinking about the bill.

### Production SaaS
You must calculate your COGS (Cost of Goods Sold). If you charge a user $20/month, but it costs you $15/month in server, database, and API costs to support them, your margins are terrible. Estimate your costs at 100 users, 1,000 users, and 10,000 users. Set up billing alerts in AWS/GCP/Vercel immediately so you get an email before you go bankrupt.

## The Data We Need From You
**What is the most expensive operational cost of running this software? (e.g., Database hosting, LLM API calls, Video processing)**
\`\`\`input
Type your answer here...
\`\`\`

## AI Strategy Phase
\`\`\`prompt
Act as a FinOps (Financial Operations) Engineer. My tech stack is [Insert Stack]. My business model charges [Insert Price]. Please break down the potential hidden costs I might encounter as I scale from 100 to 10,000 users. Highlight the specific service that will likely become my biggest expense.
\`\`\`

## Accountability Check
- [ ] I understand my primary cost drivers and have set up billing alerts.`,
  'auth': `# Authentication

**Estimated Time:** 20 min

---

## Why this matters
Authentication verifies *who* the user is. Rolling your own authentication (hashing passwords, managing session cookies, handling JWT rotation) is the fastest way to introduce a catastrophic security vulnerability into your app. Never write your own crypto.

## Strategic Guidance

### Hackathon Mode
Use a drop-in provider like Clerk, Supabase Auth, or NextAuth (Auth.js) with a simple "Sign in with Google" button. Skip email/password entirely. Magic links are also great for hackathons. It should take you less than 15 minutes to set up.

### Personal Project
Use NextAuth/Auth.js if you are in the React ecosystem, or just use Supabase. Setting up OAuth providers (GitHub, Google) is fun and teaches you how OAuth handshakes work without the security risk of storing passwords.

### Production SaaS
You must use an enterprise-grade Identity Provider (IdP) like Auth0, Clerk, or AWS Cognito. You need to support features like Multi-Factor Authentication (MFA), password resets, account lockouts after failed attempts, and eventually SAML/SSO if you plan to sell to enterprise customers. Do not store passwords in your own database.

## The Data We Need From You
**What Authentication provider will you use? (e.g., Clerk, Supabase, Auth0, Custom)**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have selected a secure third-party authentication provider.`,
  'database': `# Database Development

**Estimated Time:** Variable

---

## Why this matters
The database development phase is where your abstract ER diagrams become actual code. Writing robust migrations and defining clear access patterns ensures that as your data grows, your app doesn't slow down to a crawl.

## Strategic Guidance

### Hackathon Mode
Do not write SQL migrations. Do not set up Prisma. Just use the Supabase Dashboard (or Firebase Console) to visually click and create your tables. Add some dummy data manually. You just need the endpoint to return a JSON array so you can start building the UI.

### Personal Project
Use an ORM like Prisma or Drizzle. It is the best developer experience for a single developer. You get type safety across your entire stack, and the migration system prevents you from accidentally destroying your data when you decide to rename a column at 2 AM.

### Production SaaS
You must treat your database as the most critical component. All schema changes must be version-controlled via migrations. You must set up Row Level Security (RLS) if using Supabase, ensuring that a bug in your backend code cannot accidentally leak user data. Write seed scripts to populate staging environments with anonymized realistic data for testing.

## The Data We Need From You
**What ORM or Database tool are you using to manage your schema?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a Database Engineer. I am using [Insert Tool/ORM] for my database. My primary entities are [Insert Entities]. Please generate the raw schema code (e.g., Prisma Schema or raw SQL CREATE TABLE statements) for V1. Include standard created_at timestamps and ensure foreign keys are correctly linked.
\`\`\`

## Accountability Check
- [ ] My database schema is successfully deployed and I can insert records.`,
  'backend': `# Backend Development

**Estimated Time:** Variable

---

## Why this matters
The backend development phase is where business logic lives. If you put too much logic in the frontend, malicious users can bypass it. A strong backend validates every input, enforces permissions, and talks to the database securely.

## Strategic Guidance

### Hackathon Mode
Keep it "serverless" and "thin." Most of your API routes should simply be `SELECT * FROM table` or `INSERT INTO table`. Skip complex input validation unless it crashes the app. Your backend exists solely to feed the frontend.

### Personal Project
Write clean, modular code. Use a validation library like Zod to ensure incoming data is exactly what you expect. If you are using Next.js Server Actions, make sure you still authenticate the user *inside* the action, not just on the page that calls it.

### Production SaaS
Every single endpoint must follow the pattern: 1. Authenticate user. 2. Authorize action. 3. Validate input (using Zod/Joi). 4. Execute business logic. 5. Return standardized response. You must also write unit tests for your most critical business logic (e.g., calculating pricing or processing refunds).

## The Data We Need From You
**List the 3 most complex backend endpoints/functions you need to write.**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a Senior Backend Developer. I need to write an endpoint/function that does [Insert Complex Function]. My stack is [Insert Stack]. Provide the code for this endpoint. Include robust input validation using Zod, proper error handling (try/catch), and clear comments explaining the logic.
\`\`\`

## Accountability Check
- [ ] My core API endpoints are written and successfully tested via Postman/cURL.`,
  'frontend': `# Frontend Development

**Estimated Time:** Variable

---

## Why this matters
The frontend is what your users actually pay for. If the backend is brilliant but the frontend is clunky, slow, or ugly, users will assume the whole product is garbage. This is where you bring your wireframes to life with real data.

## Strategic Guidance

### Hackathon Mode
Hardcode everything that isn't essential. If a profile dropdown takes 2 hours to build, just put a static image there instead. Focus exclusively on the "Hero Flow"—the one sequence of screens you will show during the demo. Use a UI library (like shadcn/ui) to make it look professional instantly.

### Personal Project
Focus on Developer Experience (DX). Use TypeScript to catch errors early. Build reusable components for your buttons, inputs, and cards so you aren't copying and pasting Tailwind classes 50 times. Make it look nice, but prioritize finishing the functionality.

### Production SaaS
You must build for performance and accessibility. Ensure your forms have proper error states and loading spinners. Implement optimistic UI updates (where the UI updates instantly before the database confirms the change) to make the app feel incredibly fast. Enforce strict linting rules (ESLint/Prettier) so your team writes consistent code.

## The Data We Need From You
**What is the single most complex UI component you need to build? (e.g., A drag-and-drop kanban board, a complex data table)**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as an Expert Frontend Developer. I am building a [Insert Complex Component] using React and Tailwind CSS. Provide the complete code for this component. Ensure it manages its own loading/error states, is fully responsive, and uses accessible HTML tags. If it requires mock data for a preview, include a small mock array.
\`\`\`

## Accountability Check
- [ ] My core frontend components are built and connected to the backend.`,
  'payments': `# Payments Integration

**Estimated Time:** 2-4 Hours

---

## Why this matters
If you cannot process payments, you do not have a business; you have an expensive hobby. Payment integration is notoriously tricky because it involves asynchronous webhooks, strict security regulations (PCI compliance), and edge cases like failed credit cards and prorated upgrades.

## Strategic Guidance

### Hackathon Mode
Fake it. Create a button that says "Pay $10", and when clicked, just show a success toast and update the database to `isPaid: true`. Do not waste hackathon hours setting up Stripe API keys.

### Personal Project
If you want to charge for your app, use Stripe Checkout or Lemon Squeezy. They host the payment page for you, so you don't have to build complex checkout forms. Lemon Squeezy is especially good if you want them to handle global taxes (Merchant of Record).

### Production SaaS
You must implement a robust billing portal (Stripe Customer Portal is excellent for this) so users can manage their own subscriptions, update credit cards, and download invoices. Your webhook handler must be bulletproof: it must verify the Stripe signature, be idempotent (so if Stripe sends the event twice, you don't double-upgrade the user), and gracefully handle `invoice.payment_failed` events by restricting access.

## The Data We Need From You
**What payment provider are you using, and what are you selling? (e.g., Stripe, Lemon Squeezy, Braintree)**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a Stripe Integration Expert. I am implementing a recurring subscription using Node.js/Next.js. Provide the code for a secure Stripe Webhook handler. Specifically, I need it to handle the `checkout.session.completed` event to upgrade the user in my database. Include the webhook signature verification logic.
\`\`\`

## Accountability Check
- [ ] I can successfully process a test payment and update the user's status.`,
  'emails': `# Transactional Emails

**Estimated Time:** 2 Hours

---

## Why this matters
Transactional emails are the automated emails triggered by user actions: password resets, welcome emails, invoice receipts. Without them, users cannot recover accounts, and they won't know if their payments went through. They are critical for trust and security.

## Strategic Guidance

### Hackathon Mode
Skip them. If a user needs to "verify their email" in your demo, you've built a terrible demo. If you must send an email, just `console.log` the "email sent" message in your backend.

### Personal Project
Use Resend or Postmark. They have incredible developer APIs. Build a single `sendEmail` utility function and use it everywhere. You don't need fancy HTML templates; simple text emails often perform better and feel more personal.

### Production SaaS
You must use a dedicated transactional email provider (like Postmark, Resend, or SendGrid) and you MUST authenticate your domain (SPF, DKIM, DMARC) or your emails will go straight to spam. Use a template engine (like React Email) so your transactional emails look professional and are easy to maintain across the team.

## The Data We Need From You
**List the 3 critical transactional emails your app must send.**
\`\`\`input
1. Welcome Email
2. 
3. 
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a Technical Copywriter. I need to write the "Welcome Email" for my SaaS: [Insert SaaS Name]. Our brand tone is [Insert Tone]. Write a short, text-based email that welcomes the user, tells them the ONE immediate action they should take next, and provides a clear link. Do not make it sound like a corporate robot.
\`\`\`

## Accountability Check
- [ ] My app successfully sends transactional emails without hitting the spam folder.`,
  'notifications': `# Notifications

**Estimated Time:** 2-4 Hours

---

## Why this matters
Notifications drive engagement and retention. If a user closes your app, notifications (In-app, Push, or Email) are how you bring them back. However, if you send too many, users will disable them or uninstall your app entirely.

## Strategic Guidance

### Hackathon Mode
If notifications are core to your app (like a messaging app), use a real-time database listener (like Supabase Realtime) to pop up a toast notification. Do not attempt to build Apple/Google Push Notifications in 24 hours.

### Personal Project
Stick to simple in-app notifications. Create a `notifications` table in your database with `user_id`, `message`, and `is_read`. Query this table when the user logs in and show a little red dot on a bell icon.

### Production SaaS
You need a robust notification system. Use a tool like Novu, Knock, or Courier to manage multi-channel notifications (In-App + Email + SMS). You MUST provide a "Notification Preferences" page where users can opt-out of specific types of alerts. Do not build this complex routing logic yourself.

## The Data We Need From You
**What triggers a notification in your app, and what channels will you use? (e.g., In-app bell, SMS, Email)**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] Users receive timely notifications and have the ability to mute them.`,
  'search': `# Search Functionality

**Estimated Time:** 2-4 Hours

---

## Why this matters
As your app grows, users will refuse to paginate through 50 pages of data. They expect a Google-like search bar that returns instant results. A slow or inaccurate search feature frustrates users immediately.

## Strategic Guidance

### Hackathon Mode
Do a simple client-side `.filter()` on an array of data. If you only have 100 records in your demo, loading them all into the frontend and filtering them in React is completely fine and lightning fast.

### Personal Project
Use standard SQL `LIKE` or `ILIKE` queries in your database. E.g., `SELECT * FROM users WHERE name ILIKE '%john%'`. It's easy to set up and perfectly fine for small datasets.

### Production SaaS
You must implement a robust search infrastructure. Standard SQL `LIKE` queries will crash your database when you have millions of rows. Use PostgreSQL Full-Text Search, or integrate a dedicated search engine like Algolia, Meilisearch, or ElasticSearch. Implement debounce on the frontend so you don't hammer your API on every keystroke.

## The Data We Need From You
**What data entities do users need to search for? (e.g., Users, Invoices, Documents)**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a Database Engineer. I need to implement a fast search feature for my [Insert Entity] table using PostgreSQL. Provide the SQL commands to add a Full-Text Search index (GIN index) to the relevant columns, and provide an example query of how to search against it efficiently.
\`\`\`

## Accountability Check
- [ ] Users can quickly and accurately search for records in the app.`,
  'analytics': `# Product Analytics

**Estimated Time:** 1-2 Hours

---

## Why this matters
If you don't track how users are using your app, you are flying blind. You won't know if they are stuck on the onboarding screen, or if no one has ever clicked the "Upgrade" button. Analytics tell you the truth, not what users say they do.

## Strategic Guidance

### Hackathon Mode
Skip it completely. You do not need analytics for a 24-hour project. 

### Personal Project
Add a lightweight, privacy-friendly analytics script like Plausible or Fathom to your `<head>`. It takes 2 minutes and gives you basic pageview data without requiring annoying Cookie Banners.

### Production SaaS
You need robust event tracking. Use a tool like PostHog or Mixpanel. You must track explicit events (e.g., `user_signed_up`, `invoice_created`, `upgrade_clicked`) and attach properties to them. This allows you to build funnels and see exactly where users drop off. Ensure you configure your ad-blocker proxies (like PostHog's reverse proxy) so you don't lose 30% of your data.

## The Data We Need From You
**What are the 3 most important user actions you need to track?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] I have integrated an analytics tool to track user behavior.`,
  'adminpanel': `# Admin Panel

**Estimated Time:** 4 Hours

---

## Why this matters
An admin panel allows you (the founder) to view user data, manage subscriptions, ban abusive users, and impersonate accounts for debugging without writing raw SQL queries. Without an admin panel, customer support is impossible.

## Strategic Guidance

### Hackathon Mode
Your database GUI (like the Supabase dashboard) is your admin panel. Do not build a custom one. 

### Personal Project
Same as Hackathon. Just edit the database directly if you need to fix something.

### Production SaaS
Do not build an admin panel from scratch. It is a massive waste of engineering resources. Use a low-code tool like Retool, Appsmith, or a framework like Refine. Connect it directly to your database or API. Ensure the admin panel is locked behind strict authentication and IP whitelisting. 

## The Data We Need From You
**What tool will you use to manage your internal admin workflows?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as a Customer Support Manager for a SaaS. List the top 5 most common support requests I will likely receive from users (e.g., password reset, refund request). For each request, tell me exactly what capabilities my internal Admin Panel needs to have so I can resolve the issue in under 2 minutes.
\`\`\`

## Accountability Check
- [ ] I have a secure way to manage user data and handle support tickets.`,
  'integrations': `# Building Integrations

**Estimated Time:** Variable

---

## Why this matters
Your SaaS does not live in a vacuum. Users want your app to talk to the tools they already use (Slack, Salesforce, HubSpot). If you don't offer integrations, enterprise teams will refuse to buy your software because it breaks their existing workflows.

## Strategic Guidance

### Hackathon Mode
Build one highly visual "inbound" integration. For example, have your app post a celebratory message to a Slack channel when a task is completed. It looks great in a demo.

### Personal Project
Integrate with your own tools. If you use Notion, use the Notion API to sync data from your app into your personal workspace. It's a great way to learn OAuth flows.

### Production SaaS
Building native integrations is exhausting because third-party APIs constantly change. Consider using an embedded integration platform (like Merge.dev or Paragon) that provides a unified API for hundreds of tools. If you build them natively, ensure you handle token refreshes securely and monitor API rate limits carefully.

## The Data We Need From You
**What is the #1 integration your users will demand?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have a plan for integrating with my users' existing tech stack.`,
  'testing': `# Testing Strategy

**Estimated Time:** Continuous

---

## Why this matters
Untested code is broken code that hasn't crashed yet. Testing gives you the confidence to deploy on a Friday afternoon. Without tests, every new feature you add risks breaking an old feature, leading to a paralyzed engineering team.

## Strategic Guidance

### Hackathon Mode
Do not write tests. Testing is for code that needs to survive longer than the weekend. Manually click through the app before you present.

### Personal Project
Write tests only for the most complex, algorithmic parts of your code. If you have a function that calculates taxes, write a unit test (Vitest/Jest) for it. Don't bother writing UI tests for a solo project.

### Production SaaS
You must adopt a testing pyramid. Write Unit Tests for business logic. Write Integration Tests for your database endpoints. Write End-to-End (E2E) tests using Playwright or Cypress for your critical user flows (Sign Up, Checkout, Core Action). If the E2E tests fail, the deployment to Production must be blocked automatically by your CI/CD pipeline.

## The Data We Need From You
**What testing frameworks will you use? (e.g., Vitest, Playwright)**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a QA Engineer. I am using Playwright for End-to-End testing. My core user flow is: [Insert Core Flow]. Provide the Playwright test script (TypeScript) that automates navigating to the page, filling out the necessary forms, clicking the submit button, and verifying the success state.
\`\`\`

## Accountability Check
- [ ] My critical business logic and user flows are covered by automated tests.`,
  'documentation': `# Documentation

**Estimated Time:** 2 Hours

---

## Why this matters
If your API or app requires documentation, and you don't provide it, your users will overwhelm your support inbox. For developers, poor documentation means they won't adopt your tool. Good documentation is the cheapest form of customer support.

## Strategic Guidance

### Hackathon Mode
Your `README.md` is your documentation. Include a screenshot, a 1-sentence description, and the command to run it locally (`npm run dev`).

### Personal Project
Document the "Gotchas". Write down the weird environment variables you need, or why you chose a specific library. When you return to this project in 6 months, your past self's documentation will save you hours of debugging.

### Production SaaS
If you have a public API, use a tool like Mintlify or ReadMe to generate beautiful API docs from your OpenAPI spec. If it's a consumer app, use a Help Center tool (like Intercom Articles or Notion) to write step-by-step guides with screenshots. Keep documentation updated as part of your "Definition of Done" for new features.

## The Data We Need From You
**Where will your user-facing documentation live? (e.g., Mintlify, Notion, HelpScout)**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have created basic documentation or a Help Center for my users.`,
  'demodata': `# Demo Data

**Estimated Time:** 2 Hours

---

## Why this matters
An empty dashboard looks terrible. If you are demoing your app, or if a user just signed up for a trial, seeing a blank screen with "0 Invoices" does not inspire confidence. You need rich, realistic data to show off what the app looks like when it's being used by a power user.

## Strategic Guidance

### Hackathon Mode
Spend significant time on this. Ask ChatGPT to generate 20 realistic user profiles, 50 transactions, and funny, engaging descriptions. Do not use "Test User 1" and "asdfasdf" for your demo data. The judges are looking at the UI, and the UI is defined by the data inside it.

### Personal Project
Just insert enough data so you can test your pagination and search functions. "Test User 1" is fine here.

### Production SaaS
Build a robust database seeding script. When a new developer joins the team, they should be able to run `npm run seed` and instantly have a local database filled with thousands of rows of realistic (but anonymized) data. Furthermore, when a new user signs up for your app, consider automatically injecting "Template Data" into their workspace so they aren't staring at a blank screen.

## The Data We Need From You
**What specific entities need realistic mock data before you can properly demo the app?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a Data Generator. I need mock data for my [Insert Entity] table. Please provide a JSON array of 10 highly realistic, diverse, and professional records. The fields I need are: [Insert Fields]. Do not use generic names like 'John Doe'.
\`\`\`

## Accountability Check
- [ ] My application is populated with rich, realistic demo data.`,
  'presentationprep': `# Presentation Prep

**Estimated Time:** 2 Hours

---

## Why this matters
A great presentation can save a mediocre hackathon project. A terrible presentation will ruin an incredible project. You have exactly 3 minutes to explain the problem, show the solution, and convince the judges that what you built actually works.

## Strategic Guidance

### Hackathon Mode
Do not code during the last 2 hours. Stop. Close the IDE. You must practice the presentation. Decide exactly who is talking, who is driving the mouse, and what happens if the Wi-Fi drops. 

### Personal Project
Your presentation is the README on GitHub and the Loom video you post on Twitter. Keep it under 2 minutes. Start with the final result immediately.

### Production SaaS
If you are pitching to investors, your presentation is your Pitch Deck. You must nail the narrative: Why now? Why this team? How big is the market? Investors invest in the story and the founders, not the raw codebase.

## The Data We Need From You
**What is the single "Wow" moment of your presentation?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have rehearsed my presentation multiple times.`,
  'security': `# Security

**Estimated Time:** 1-2 Hours

---

## Why this matters
Security is not a feature; it is an existential requirement. A single data breach can destroy your company's reputation overnight. Security is about defense in depth: assuming that an attacker will breach one layer, and ensuring another layer catches them.

## Strategic Guidance

### Hackathon Mode
Do not waste time on complex security. Your app will likely be taken offline after the weekend anyway. Use `.env` files correctly so you don't commit your API keys to GitHub, and that is all the security you need.

### Personal Project
Practice good habits. Set up Row Level Security (RLS) in your database so you can't accidentally fetch another user's data. Don't write raw SQL queries to avoid SQL injection. Use standard CORS headers.

### Production SaaS
You must treat security as your highest priority. Implement Content Security Policies (CSP) to prevent XSS attacks. Use CSRF tokens on all mutating endpoints. Enforce HTTPS everywhere. Regularly audit your npm dependencies for vulnerabilities (`npm audit`). Set up automated secrets scanning in your CI/CD pipeline so keys are never leaked.

## The Data We Need From You
**What is the single biggest security risk your app faces? (e.g., Leaking user emails, storing API keys, processing credit cards)**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as an Application Security Engineer. My tech stack is [Insert Stack]. Provide a checklist of the top 5 most critical security headers I need to implement, and explain how to configure Row Level Security (RLS) or similar database-level protections for my specific framework.
\`\`\`

## Accountability Check
- [ ] My application is secure against common OWASP vulnerabilities.`,
  'performanceoptimization': `# Performance Optimization

**Estimated Time:** 1-2 Hours

---

## Why this matters
Speed is a feature. If your app takes 5 seconds to load, users will leave. Performance impacts everything from SEO rankings to conversion rates. However, premature optimization is the root of all evil; only optimize the parts of your app that are actually slow.

## Strategic Guidance

### Hackathon Mode
Do not optimize. If a query is slow, just put a loading spinner over it. The judges won't care if your TTFB (Time to First Byte) is 800ms.

### Personal Project
Run Lighthouse in Chrome DevTools to check your scores. Optimize your images (use WebP format, implement lazy loading). Don't spend days trying to shave 10ms off a database query unless it's a fun learning exercise.

### Production SaaS
You must measure performance objectively using Core Web Vitals. You need to implement database indexing for your most queried columns. Bundle split your JavaScript so users only download the code they need for the current page. If you are serving global users, ensure your static assets and edge functions are distributed via a CDN.

## The Data We Need From You
**What is the slowest part of your application right now?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have identified and resolved the major performance bottlenecks in my app.`,
  'monitoring': `# System Monitoring

**Estimated Time:** 30 min

---

## Why this matters
If your app goes down at 3 AM, who knows about it? If the answer is "angry users on Twitter," your monitoring is broken. Monitoring provides visibility into the health of your servers, database connections, and API latencies so you can fix issues before users notice them.

## Strategic Guidance

### Hackathon Mode
Skip it. If it crashes during the demo, refresh the page.

### Personal Project
Set up a free UptimeRobot ping that checks your homepage every 5 minutes and sends you an email if it goes down. It takes 2 minutes and gives you peace of mind.

### Production SaaS
You need robust APM (Application Performance Monitoring). Use a tool like Datadog, New Relic, or Sentry Performance. You must set up alerts for high CPU usage, database connection pool exhaustion, and elevated 5xx error rates. These alerts should page the on-call engineer via PagerDuty or an urgent Slack ping.

## The Data We Need From You
**What tool will you use to monitor your application's uptime and health?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have basic uptime monitoring and alerting configured.`,
  'logging': `# Logging

**Estimated Time:** 1 Hour

---

## Why this matters
When a user reports a bug, logs are your only window into what actually happened. Without structured logs, you are guessing. Good logs tell you who did what, when, and exactly what the server was thinking at the time.

## Strategic Guidance

### Hackathon Mode
`console.log()` is all you need.

### Personal Project
Use a basic logging library like Pino or Winston. Write logs to `stdout` so your hosting provider (like Vercel or Render) can capture them in their dashboard.

### Production SaaS
You must use structured JSON logging. This allows you to search your logs efficiently (e.g., `user_id=123 AND level=error`). You must aggregate your logs into a centralized system like Datadog, Logtail, or AWS CloudWatch. Crucially, you must sanitize your logs to ensure you never accidentally log raw passwords, credit cards, or Personally Identifiable Information (PII).

## The Data We Need From You
**Where are your server logs currently being stored?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a DevOps Engineer. I am using [Insert Backend Tech]. Provide a wrapper function for my logger that enforces structured JSON logging and automatically redacts sensitive fields like 'password' or 'token' from the output.
\`\`\`

## Accountability Check
- [ ] My application securely logs important events in a structured format.`,
  'errortracking': `# Error Tracking

**Estimated Time:** 15 min

---

## Why this matters
Users rarely report bugs; they just leave. Error tracking tools catch exceptions in both the frontend and backend, capturing the stack trace, the user's browser details, and the steps leading up to the crash. This allows you to fix bugs you didn't even know existed.

## Strategic Guidance

### Hackathon Mode
Skip it. Just look at the Chrome console if something breaks.

### Personal Project
Install Sentry. It has a great free tier. The first time Sentry catches a bug in production and tells you exactly which line of code caused it, you will never build an app without it again.

### Production SaaS
Sentry (or Bugsnag) is mandatory. You must upload your source maps so you can see the un-minified code in the error trace. You must also tie error tracking to your authentication system so you know exactly *which* user experienced the crash, allowing your customer support team to proactively reach out to them with a fix.

## The Data We Need From You
**What error tracking tool are you integrating? (e.g., Sentry, Bugsnag)**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have an error tracking tool installed and capturing exceptions.`,
  'ratelimiting': `# Rate Limiting

**Estimated Time:** 30 min

---

## Why this matters
If you don't limit how often a user can call your API, a single malicious script (or a poorly written `useEffect` loop) can crash your database or run up a $10,000 bill on third-party APIs. Rate limiting protects your infrastructure and your wallet.

## Strategic Guidance

### Hackathon Mode
Skip it entirely. You won't have enough traffic for it to matter.

### Personal Project
Implement basic rate limiting on your most expensive routes (like AI generation or email sending). A simple Redis-based sliding window or a library like `express-rate-limit` is plenty.

### Production SaaS
You must implement rate limiting globally. Unauthenticated routes (like Login) should have aggressive limits to prevent brute-force attacks. Authenticated routes should be limited based on the user's pricing tier. Use Redis to track request counts across multiple server instances. If a user hits the limit, return a `429 Too Many Requests` status code with a `Retry-After` header.

## The Data We Need From You
**Which specific API route is the most vulnerable to abuse or high costs?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a Backend Security Expert. I am using [Insert Framework]. Provide the code to implement a robust Redis-based rate limiter for my `/api/generate` endpoint. It should limit users to 10 requests per minute and return a proper 429 response when exceeded.
\`\`\`

## Accountability Check
- [ ] My expensive and sensitive API routes are protected by rate limits.`,
  'caching': `# Caching

**Estimated Time:** 1-2 Hours

---

## Why this matters
Caching saves money and dramatically increases speed. Instead of querying your database for the same data 10,000 times a second, you query it once, store the result in memory, and serve the memory. However, "cache invalidation" (knowing when to delete the stale data) is notoriously one of the hardest problems in computer science.

## Strategic Guidance

### Hackathon Mode
Do not build a cache. A cache introduces "stale data" bugs that are impossible to debug during a live demo. If your app is slow, it's fine. The judges only care about functionality.

### Personal Project
Use React Query or SWR on the frontend to cache API responses. It makes your app feel instant when navigating between pages. For the backend, don't bother setting up Redis unless you specifically want to learn it.

### Production SaaS
You must implement multi-layered caching. Use a CDN (like Cloudflare or Vercel Edge Network) to cache static assets and SSG pages. Use an in-memory datastore (like Redis) for expensive database queries and rate-limiting. You must have a strict Cache Invalidation Strategy: when a user updates their profile, the backend must explicitly invalidate the Redis key storing their old profile.

## The Data We Need From You
**What layer of your application will benefit the most from caching?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a Backend Performance Engineer. I am using [Insert Backend/DB]. My most expensive query is [Insert Query]. Provide the code to implement a Redis-based cache "read-through" pattern for this query. Include the logic for how and when to invalidate this cache key when the underlying data changes.
\`\`\`

## Accountability Check
- [ ] I have implemented caching for my most expensive operations.`,
  'backups': `# Database Backups

**Estimated Time:** 30 min

---

## Why this matters
If you accidentally drop a production table, or if a disgruntled employee deletes your database, your company is dead unless you have backups. Backups are your ultimate insurance policy.

## Strategic Guidance

### Hackathon Mode
Skip it. The data is fake anyway.

### Personal Project
If you use a managed database provider like Supabase, PlanetScale, or Vercel Postgres, automated daily backups are usually enabled by default on paid tiers. If you are on a free tier, you might have to export it manually once a month. Don't stress too much.

### Production SaaS
You must have Point-in-Time Recovery (PITR) enabled. This allows you to restore your database to the exact minute before a catastrophic error occurred. You must also implement "Offsite Backups"—if your database is hosted on AWS US-East-1, your backups must be automatically replicated to a different region (like US-West) or a different cloud provider entirely, in case the entire datacenter goes offline.

## The Data We Need From You
**How often does your database automatically back up, and how long is it retained?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have verified that automated backups are enabled and running.`,
  'cicd': `# CI/CD (Continuous Integration & Deployment)

**Estimated Time:** 2 Hours

---

## Why this matters
Manual deployments lead to human error. CI/CD (Continuous Integration / Continuous Deployment) automates the process of testing, building, and deploying your code. Every time you push to the `main` branch, the pipeline ensures the code isn't broken before automatically pushing it to production.

## Strategic Guidance

### Hackathon Mode
Connect your GitHub repository to Vercel or Netlify. They offer zero-configuration automatic deployments. Do not write GitHub Actions or configure Jenkins. If you push code, it should be live in 60 seconds.

### Personal Project
Vercel/Netlify is perfect here too. If you are building a backend API, use Render or Railway, which also auto-deploy on push. You don't need a complex staging environment.

### Production SaaS
You must have a multi-stage CI/CD pipeline. 1. Code is pushed to a PR. 2. GitHub Actions runs a linter, unit tests, and security scans. 3. If they pass, a Preview URL is generated. 4. Code is merged to `main`, deploying to a Staging environment. 5. E2E tests run against Staging. 6. If passed, it is deployed to Production. Never deploy directly to production without tests passing.

## The Data We Need From You
**What hosting provider are you using for automated deployments? (e.g., Vercel, AWS CodePipeline, GitHub Actions)**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a DevOps Engineer. I need a GitHub Actions workflow `.yml` file for my [Insert Tech Stack] project. The workflow should trigger on Push to the `main` branch. It should install dependencies, run `npm run test`, and if successful, deploy the project to [Insert Hosting Provider].
\`\`\`

## Accountability Check
- [ ] My application automatically deploys when I push to the main branch.`,
  'infrastructure': `# Cloud Infrastructure

**Estimated Time:** 1-3 Hours

---

## Why this matters
Your infrastructure is where your code physically runs. In the past, this meant buying servers. Today, it means navigating the complexity of AWS, GCP, or Vercel. Choosing the right infrastructure dictates your deployment speed, scalability, and monthly hosting bill.

## Strategic Guidance

### Hackathon Mode
Use Platform-as-a-Service (PaaS). Vercel for the frontend, Supabase for the backend/database. It requires zero configuration and scales instantly for a demo. Do not open the AWS console.

### Personal Project
Stick to PaaS (Vercel, Render, Railway, Fly.io). The "Developer Experience" is worth infinitely more than the $5 you might save by managing your own Linux VPS on DigitalOcean. You want to spend your weekends coding, not configuring Nginx.

### Production SaaS
You must balance Developer Experience with Cost and Control. Vercel is amazing, but can become incredibly expensive at enterprise scale. If you are handling sensitive healthcare data (HIPAA), you might be forced to build custom infrastructure on AWS using Terraform or AWS CDK. Infrastructure as Code (IaC) ensures your staging environment is an exact replica of your production environment.

## The Data We Need From You
**Where is your primary application hosted?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] My hosting infrastructure is set up and configured securely.`,
  'disasterrecovery': `# Disaster Recovery

**Estimated Time:** 1 Hour

---

## Why this matters
Disaster Recovery (DR) is the plan for when everything goes wrong. What happens if your cloud provider deletes your account? What happens if a massive region-wide outage takes down AWS US-East-1? If you don't have a plan, your business could be offline for days, leading to massive churn and lawsuits.

## Strategic Guidance

### Hackathon Mode
Your disaster recovery plan is "cry, then rewrite the code from memory". Do not spend a single minute on this.

### Personal Project
Your disaster recovery plan is having your code pushed to GitHub. If your hosting provider dies, you just redeploy it somewhere else. Since you don't have paying users, downtime doesn't matter.

### Production SaaS
You need a formal Disaster Recovery Plan (DRP). You must define your RTO (Recovery Time Objective: how fast must we be back online?) and RPO (Recovery Point Objective: how much data are we willing to lose?). You need a documented "Runbook" that tells an engineer exactly what CLI commands to run to spin up the infrastructure in a brand new region if the primary region dies.

## The Data We Need From You
**If your primary hosting provider went completely offline right now, how long would it take you to get the app running somewhere else?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have a basic plan for recovering my application in a worst-case scenario.`,
  'scalabilityplanning': `# Scalability Planning

**Estimated Time:** 1 Hour

---

## Why this matters
Most startups die from a lack of users, not from having too many. However, if your app suddenly goes viral on HackerNews or TikTok, and your server crashes under the load, you miss out on your biggest growth opportunity. Scalability planning ensures you can handle the "Hug of Death."

## Strategic Guidance

### Hackathon Mode
Do not build for scale. Build for the demo. Hardcode things. Use an SQLite database file. If the app can handle 5 concurrent users (the judges), it is perfectly scaled.

### Personal Project
Again, do not over-engineer. An un-optimized Node.js server connected to a Postgres database can easily handle hundreds of requests per second. You will never hit that limit on a personal project. Focus on features, not microservices.

### Production SaaS
You must identify your bottlenecks early. "Vertical scaling" (buying a bigger server) is the easiest first step, but eventually, you must "Horizontally scale" (adding more servers). Ensure your backend is "Stateless" (it doesn't store user sessions in local memory) so any load balancer can route traffic to any server. Implement connection pooling (like PgBouncer) so thousands of incoming requests don't exhaust your database connections.

## AI Refinement Phase
\`\`\`prompt
Act as a Site Reliability Engineer (SRE). My app uses [Insert Tech Stack]. Assuming my code is functional, tell me the absolute first component in this stack that will crash or bottleneck if traffic suddenly spikes by 100x. Provide 2 actionable strategies to prevent that specific bottleneck.
\`\`\`

## Accountability Check
- [ ] I understand how my app will scale and where the first bottleneck will be.`,
  'launchchecklist': `# Launch Checklist

**Estimated Time:** 2 Hours

---

## Why this matters
Launch day is chaotic. If you rely on your memory, you will forget to switch your Stripe API keys from "Test" to "Live", and you will lose out on thousands of dollars in revenue while users get error messages. A checklist prevents catastrophic unforced errors.

## Strategic Guidance

### Hackathon Mode
1. Is the GitHub repo public? 
2. Is the Vercel link working? 
3. Is the demo video recorded? 
If yes, submit the project.

### Personal Project
1. Ensure the database isn't pointing to `localhost`. 
2. Add a `README.md` with a screenshot. 
3. Post it on Reddit/Twitter. 
Don't overthink it. A personal project launch is a rolling release.

### Production SaaS
You must execute a strict, 20-point checklist. Verify production API keys (Stripe, Resend, OpenAI). Ensure your domain DNS has fully propagated. Test the "Forgot Password" flow. Ensure your analytics tracking is firing in production. Verify that the "Upgrade" checkout flow actually charges a credit card and grants premium access. Check your database indexes.

## AI Generation Phase
\`\`\`prompt
Act as a Technical Launch Manager. I am launching a [Insert Tech Stack] SaaS tomorrow. Provide a rigorous, 15-point "Day Before Launch" technical checklist. Include specific checks for database connections, environment variables, authentication flows, and payment gateways.
\`\`\`

## Accountability Check
- [ ] I have completed every item on my pre-flight launch checklist.`,
  'seo': `# SEO (Search Engine Optimization)

**Estimated Time:** 2 Hours

---

## Why this matters
Paid ads are expensive, and social media goes viral for a day. SEO provides free, compounding, long-term traffic. If your landing page is not optimized for the exact keywords your target users are Googling, your competitors will get all the inbound traffic.

## Strategic Guidance

### Hackathon Mode
Ignore SEO entirely. Google won't index your site before the hackathon ends anyway.

### Personal Project
Set up basic meta tags (`<title>` and `<meta name="description">`) so that when you paste the link in a Discord or Slack channel, it unfurls with a nice image and description (OpenGraph tags). That's enough.

### Production SaaS
You must nail Technical SEO. Ensure your site is Server-Side Rendered (SSR) or statically generated (SSG) so Googlebot can read the HTML. Generate a `sitemap.xml` and `robots.txt`. Research "Long-Tail Keywords" (e.g., "Best automated invoice software for freelance designers" rather than just "Invoice software") and ensure those exact phrases appear in your H1, H2, and title tags.

## The Data We Need From You
**What are the top 3 keyword phrases someone would type into Google to find your product?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as an SEO Expert. My target keywords are [Insert Keywords]. Please generate the exact HTML code for the `<title>`, `<meta name="description">`, and OpenGraph (`og:title`, `og:description`) tags for my landing page. Ensure the title is under 60 characters and the description is compelling enough to click.
\`\`\`

## Accountability Check
- [ ] I have implemented technical SEO tags and optimized my landing page copy.`,
  'analyticssetup': `# Analytics Setup

**Estimated Time:** 1 Hour

---

## Why this matters
Writing the code for analytics is one thing; setting it up so the data is actually usable is another. If your analytics dashboard is just a sea of unstructured data, you will never look at it. You need to configure funnels, dashboards, and retention cohorts so the data tells a story.

## Strategic Guidance

### Hackathon Mode
Skip it entirely.

### Personal Project
If you installed Plausible or Fathom, just bookmark the dashboard. You don't need to configure anything else.

### Production SaaS
You must set up a "Core Conversion Funnel" in your analytics tool (e.g., PostHog/Mixpanel). The funnel should track: 1. Landed on Homepage -> 2. Clicked Sign Up -> 3. Completed Registration -> 4. Used Core Feature -> 5. Upgraded to Paid. This funnel will explicitly tell you exactly where users are abandoning your product. You should also set up an "Active Users" dashboard that your team reviews every Monday morning.

## The Data We Need From You
**What are the specific steps in your user's conversion funnel?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a Data Analyst. My SaaS conversion funnel is: [Insert Funnel Steps]. Based on industry benchmarks for B2B SaaS, what conversion rate should I expect at each stage? If the conversion rate between Step 2 and Step 3 is abnormally low, what are 3 UX experiments I can run to improve it?
\`\`\`

## Accountability Check
- [ ] I have configured my analytics dashboards to track core funnels.`,
  'legaldocuments': `# Legal Documents

**Estimated Time:** 1 Hour

---

## Why this matters
Beyond the Terms of Service and Privacy Policy, running a real business requires contracts. If you hire freelancers, partner with agencies, or sell to enterprise clients, you need NDAs, DPAs, and MSAs. Using random templates from Google can leave dangerous loopholes.

## Strategic Guidance

### Hackathon Mode
Absolutely ignore this. You do not need an NDA for a hackathon.

### Personal Project
Ignore this unless you are forming an LLC for liability protection, in which case you need basic incorporation documents. Usually, Stripe Atlas handles all of this automatically.

### Production SaaS
You need a Data Processing Agreement (DPA) if you are processing data for EU citizens. You need a Master Services Agreement (MSA) if you are selling $10k+ enterprise contracts where standard 'click-wrap' Terms of Service are insufficient. You also need solid NDAs and Contractor Agreements for any engineers you hire so they don't walk away with your source code.

## The Data We Need From You
**Are you currently incorporating an entity, or operating as a sole proprietor?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I understand what legal agreements I need beyond the basic website terms.`,
  'cookiepolicy': `# Cookie Policy

**Estimated Time:** 15 min

---

## Why this matters
The EU "Cookie Law" (ePrivacy Directive) requires you to get explicit consent before dropping non-essential cookies (like Facebook Pixels or Google Analytics trackers) into a user's browser. If you don't show a cookie banner to EU users, you are non-compliant.

## Strategic Guidance

### Hackathon Mode
Skip it.

### Personal Project
Just use cookieless analytics (like Plausible) so you never have to show an annoying cookie banner. Everyone hates cookie banners.

### Production SaaS
If you run retargeting ads (Meta/Google Ads), you are dropping tracking cookies. You must implement a compliant cookie banner that blocks these scripts from loading *until* the user clicks "Accept". Use a Consent Management Platform (CMP) like Cookiebot, OneTrust, or Termly to handle this automatically based on the user's geolocation (e.g., only showing the strict banner to EU traffic).

## The Data We Need From You
**Will you be using tracking cookies for advertising or analytics?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have implemented a compliant cookie banner if required.`,
  'customersupport': `# Customer Support

**Estimated Time:** 2 Hours

---

## Why this matters
Customer support is not a cost center; it is a retention engine. When your app breaks (and it will), a fast, empathetic response from the founder can turn an angry user into a lifelong evangelist. Ignoring support emails is the fastest way to get negative reviews on G2 and Twitter.

## Strategic Guidance

### Hackathon Mode
Your customer support is you physically walking over to the judges' table when they have a question.

### Personal Project
Put a "Feedback" button in the corner that opens a `mailto:` link to your personal email, or points them to a GitHub Issues page. It's totally fine to respond to these on weekends.

### Production SaaS
You must have a dedicated support channel (like Intercom, Zendesk, or Crisp). You must commit to an SLA (Service Level Agreement)—for example, responding to all tickets within 24 hours. Set up keyboard shortcuts (snippets) for common answers, but always personalize the first sentence. The founder must do all customer support for the first year to truly understand the product's flaws.

## The Data We Need From You
**What tool will you use to manage customer support tickets?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as a Head of Customer Success. A furious customer just emailed me because my SaaS went offline for 2 hours, and they lost their work. Write a highly empathetic, professional response template that apologizes, explains the situation without making excuses, and offers a specific gesture of goodwill (e.g., a free month) to prevent them from churning.
\`\`\`

## Accountability Check
- [ ] I have a system in place to receive and manage support requests.`,
  'retention': `# Retention Strategy

**Estimated Time:** 1 Hour

---

## Why this matters
Acquiring a new customer is 5x more expensive than keeping an existing one. If your app has high churn (users cancel their subscription after month 1), you have a "leaky bucket." You can pour all the marketing money you want into the top, but the business will eventually die.

## Strategic Guidance

### Hackathon Mode
Skip it. Your app only needs to retain users for exactly the length of the demo.

### Personal Project
Your retention metric is whether *you* are still using it in 3 months. If you stop using it, ask yourself why. Was it too slow? Too annoying to open? That friction is exactly what causes real users to churn.

### Production SaaS
You must measure "Net Revenue Retention" (NRR). If NRR is over 100%, your business is growing even if you add zero new customers, because existing customers are upgrading faster than they are churning. To improve retention, you must build "Sticky Features" (like team collaboration, or storing their core business data) so the Switching Cost becomes painfully high.

## The Data We Need From You
**What is the single "Aha!" moment that makes a user realize the value of your product?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as a Head of Growth. My SaaS does [Insert SaaS Description] and the "Aha!" moment is [Insert Aha Moment]. Give me a 3-step Email Drip Campaign designed specifically to pull new signups back into the app until they experience that "Aha!" moment.
\`\`\`

## Accountability Check
- [ ] I have identified my app's core retention hook.`,
  'userfeedback': `# User Feedback Loop

**Estimated Time:** 1 Hour

---

## Why this matters
You are not your user. The features you think are brilliant might be completely ignored, while a tiny bug might be driving your best customers insane. Building a tight feedback loop ensures you are always building what the market actually wants to buy.

## Strategic Guidance

### Hackathon Mode
Your feedback loop is the Q&A session with the judges. Write down every question they ask. If they ask a question, it means your pitch didn't explain it well enough.

### Personal Project
Show it to 3 friends. Watch them try to use it without you explaining what the buttons do. Their confusion is your feedback.

### Production SaaS
You must actively solicit feedback, but you must also ignore bad feedback. Do not build a feature just because one loud user asked for it. Look for patterns. Implement a formal feature request board (like Canny or Featurebase) so users can upvote ideas. Trigger a short NPS (Net Promoter Score) survey inside the app after a user successfully completes a core action.

## The Data We Need From You
**How will you collect and organize feature requests from your users?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a User Researcher. I want to email my active users to ask for feedback, but I don't want to send a boring "Please take our survey" email. Write a short, highly engaging, plain-text email from the Founder asking for brutal, honest feedback on what we should build next.
\`\`\`

## Accountability Check
- [ ] I have a mechanism to collect, organize, and prioritize user feedback.`,
  'scalingstrategy': `# Scaling Strategy

**Estimated Time:** 1 Hour

---

## Why this matters
"Doing things that don't scale" is great advice for V1. But when you hit 10,000 users, those manual processes will burn you out. You need a strategy for scaling your infrastructure, your team, and your marketing without the entire company collapsing.

## Strategic Guidance

### Hackathon Mode
Your scaling strategy is hoping the Vercel free tier holds up during the 5 minutes the judges test your link.

### Personal Project
Scaling just means writing better code. If your API is taking 3 seconds, maybe you should finally learn how to use database indexes or Redis.

### Production SaaS
You must scale efficiently. Throwing money at AWS is easy; optimizing your queries is hard. You also need to scale your team. This means writing SOPs (Standard Operating Procedures) for onboarding new engineers, implementing strict code reviews, and automating your QA testing so you don't break production every deploy.

## The Data We Need From You
**If your user base 10x'd overnight, what is the very first thing in your company (code, support, infrastructure) that would break?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I know where my system's limits are and how to push past them.`,
  'marketing': `# Marketing & Distribution

**Estimated Time:** Continuous

---

## Why this matters
First-time founders think "If I build it, they will come." They won't. Distribution is more important than the product itself. A mediocre product with incredible marketing will always beat an incredible product with zero marketing.

## Strategic Guidance

### Hackathon Mode
Marketing is your demo presentation. Focus entirely on the storytelling, the energy in the room, and the visual "wow" factor.

### Personal Project
Write a great technical blog post about *how* you built it, the problems you faced, and post it to Hacker News, Dev.to, or r/programming. Developers love reading about other developers' side projects.

### Production SaaS
You must find a scalable, repeatable acquisition channel. "Posting on Twitter" is not a scalable channel. You need to explore SEO (Content Marketing), Paid Ads (Google/LinkedIn), Cold Email Outreach (B2B), or Affiliate Partnerships. Pick exactly ONE channel, dedicate 3 months to it, and master it before trying another one.

## The Data We Need From You
**What is the single primary marketing channel you will focus on for the next 3 months?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Strategy Phase
\`\`\`prompt
Act as a Chief Marketing Officer. My SaaS product is [Insert Product] and my target audience is [Insert Audience]. My primary marketing channel is [Insert Channel]. Give me a 30-day actionable marketing sprint with specific, daily tasks I can execute to get my first 100 paying customers through this channel.
\`\`\`

## Accountability Check
- [ ] I have a dedicated, focused marketing strategy.`,
  'referralsystems': `# Referral Systems

**Estimated Time:** 2 Hours

---

## Why this matters
Organic growth driven by your own users is the cheapest way to acquire customers. If your product is great, users might mention it to a friend. But if you actively incentivize them to invite a friend (e.g., "Give $10, Get $10"), you turn your user base into a massive, decentralized sales team.

## Strategic Guidance

### Hackathon Mode
Ignore this entirely. It's too complex to build and impossible to test in 24 hours.

### Personal Project
Also ignore this. You don't have the budget to pay out referrals anyway.

### Production SaaS
You must implement a Viral Loop. For B2C or "Prosumer" SaaS, offer account credits for every friend they invite. For B2B SaaS, consider an Affiliate Program where industry influencers get a 20% recurring commission for every customer they send you. Use tools like Rewardful or PartnerStack so you don't have to build the payout logic yourself.

## The Data We Need From You
**What incentive can you afford to give away to encourage users to refer their friends?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have considered how to turn my users into advocates.`,
  'featureroadmap': `# Feature Roadmap

**Estimated Time:** 1 Hour

---

## Why this matters
A roadmap communicates your product's future to both your internal team and your paying customers. It proves that the product is alive and actively improving. It also helps you politely say "No" to bad feature requests by showing that your engineers are already booked for the next quarter.

## Strategic Guidance

### Hackathon Mode
This is your final slide in the presentation. List 3 massive, ambitious features that you would build if you had 6 months instead of 24 hours. It shows vision.

### Personal Project
Keep a simple Kanban board in GitHub Projects or Trello. It's just for you, so organize it however your brain works best.

### Production SaaS
You need a public-facing roadmap (using a tool like Linear, Canny, or a public Notion page). Categorize features into "Now", "Next", and "Later". Do not put specific release dates (like "Launching Oct 12th"); you will inevitably miss them and anger your users. Keep the roadmap flexible and driven by your North Star Metric.

## The Data We Need From You
**What are the top 3 major features on your "Next" list?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] I have a roadmap to guide my next 3 months of development.`,
  'technicaldebt': `# Technical Debt

**Estimated Time:** 1 Hour

---

## Why this matters
Technical debt is the code you wrote quickly to meet a deadline, knowing it wasn't the "right" way. Like financial debt, it accrues interest. If you never pay it down, eventually your entire engineering team will spend 100% of their time fixing bugs caused by the debt, and 0% of their time building new features.

## Strategic Guidance

### Hackathon Mode
Your entire project is technical debt. Embrace it. If someone asks you to maintain this code next week, delete the repo.

### Personal Project
Refactor only when it's fun or educational. Don't stress about perfect code in a side project, but do try to keep your files organized.

### Production SaaS
You must allocate time to pay down debt. A common industry standard is dedicating 20% of every sprint to refactoring and debt repayment. Keep a specific "Tech Debt" tag in your Jira/Linear board. When a developer touches a messy file to add a feature, they should follow the "Boy Scout Rule": leave the code cleaner than you found it.

## The Data We Need From You
**What is the single messiest, most fragile file or system in your codebase right now?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have a plan for managing and paying down technical debt.`,
  'pitchdeck': `# Pitch Deck (Review)

**Estimated Time:** 1 Hour

---

## Why this matters
A pitch deck tells the story of your product. It translates your code and features into business value. Even if you aren't raising venture capital, creating a deck forces you to clarify your value proposition.

## Strategic Guidance

### Hackathon Mode
Focus heavily on the "Problem" and "Demo" slides. The judges want to see the working software, not a 10-minute lecture on market sizing.

### Personal Project
Irrelevant.

### Production SaaS
Your deck must be polished. Highlight your traction (revenue, active users). Explain why *now* is the right time for this product, and why *your team* is the right team to execute it. Keep it under 15 slides. Ensure the financial projections are realistic, not just "hockey stick" charts with no basis in reality.

## Accountability Check
- [ ] I have refined my pitch deck to tell a compelling business story.`,
  'demoscript': `# Demo Script (Review)

**Estimated Time:** 30 min

---

## Why this matters
A live demo can make or break a presentation. Relying on improvisation usually leads to rambling, missed features, and awkward silences while waiting for loading screens.

## Strategic Guidance

### Hackathon Mode
Rehearse your 3-minute pitch at least 5 times. Memorize the transitions between team members.

### Personal Project
Irrelevant.

### Production SaaS
Ensure your demo highlights the *benefits* of the features, not just the technical implementation. Instead of saying "This uses WebSockets to update the UI," say "This allows your team to collaborate in real-time without refreshing the page." Have a pre-recorded backup video ready.

## Accountability Check
- [ ] I have rehearsed my demo script and prepared a backup video.`,
  'submissionchecklist': `# Submission Checklist (Review)

**Estimated Time:** 15 min

---

## Why this matters
Missing a minor administrative detail can disqualify you from a competition or delay your App Store launch by weeks.

## Strategic Guidance

### Hackathon Mode
Double-check that your GitHub repo is public and the video link is accessible to anyone.

### Personal Project
Irrelevant.

### Production SaaS
Review your App Store Connect or Google Play Console checklist. Verify the Privacy Policy is linked, the age rating is correct, and the staging API keys have been swapped out for production keys before submitting for review.

## Accountability Check
- [ ] I have double-checked all final submission requirements.`,
  'mobileideadefinition': `# Idea Definition

**Estimated Time:** 30 min

---

## Why this matters
Before writing a single line of Swift, Kotlin, or React Native, you need a crystal clear understanding of what your app actually does. Without a focused idea, you will fall into the trap of building a "Swiss Army Knife" app that does 10 things poorly instead of 1 thing brilliantly.

## Strategic Guidance

### Hackathon Mode
Your idea must be visual, easily explainable in 10 seconds, and technically feasible within 24 hours. Don't build a complex B2B workflow app. Build something that makes the judges smile or say "Wow, that's clever."

### Personal Project
Build something you genuinely want to use on your own phone every day. If you don't use it, you will abandon the project in two weeks. It doesn't matter if 50 similar apps exist on the App Store; build it your way.

### Production SaaS
Your idea must solve a painful, expensive problem for a specific group of people who have the money to pay for it. "An app for everyone" is an app for no one. You must be able to articulate exactly how your app is 10x better, faster, or cheaper than the current status quo (which is often just a messy spreadsheet or a clunky web portal).

## The Data We Need From You
**In one sentence, what does your mobile app do and who is it for?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as a Y Combinator Partner. My mobile app idea is: [Insert Idea]. Tear this idea apart. Give me 3 reasons why this app will fail to get traction, and suggest 1 specific pivot to make it a more viable business.
\`\`\`

## Accountability Check
- [ ] I can explain my app's core value proposition in a single sentence.`,
  'mobileproblemstatement': `# Problem Statement

**Estimated Time:** 30 min

---

## Why this matters
Users don't download apps because they want another icon on their home screen; they download apps to solve a problem. If you cannot clearly define the problem, you cannot design the solution. A strong problem statement acts as a filter for every feature request.

## Strategic Guidance

### Hackathon Mode
The problem should be relatable to the judges. "Finding a parking spot on campus takes 20 minutes" is a great, relatable problem for a university hackathon.

### Personal Project
The problem should be personal. "I keep forgetting which exercises I did last week at the gym" is a perfect personal problem to solve.

### Production SaaS
The problem must be severe enough that people are actively looking for a solution and willing to pay for it. It should be a "Hair on Fire" problem. If a user's hair is on fire, they don't care if your app's UI is a bit clunky; they just want the fire put out.

## The Data We Need From You
**What is the specific, painful problem your target users are currently experiencing?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have identified a real problem that users actually care about.`,
  'mobileusecases': `# Use Cases

**Estimated Time:** 45 min

---

## Why this matters
A use case defines *how* a user will interact with your app in the real world. Mobile apps are used differently than web apps—often with one hand, while walking, or in areas with poor internet connection. Defining use cases ensures you build for the actual environment of the user.

## Strategic Guidance

### Hackathon Mode
Define exactly ONE use case. If your app is a recipe app, the use case is "User searches for a chicken recipe and adds it to favorites." Do not build a "grocery list" use case. You don't have time.

### Personal Project
List 2-3 primary use cases that you will personally use. Keep them simple and focused on utility.

### Production SaaS
You must map out the primary, secondary, and edge use cases. For a mobile field-service app, the primary use case might be "Technician uploads a photo of a broken pipe offline." An edge case might be "Technician's battery dies mid-upload." You must design for the edge cases to prevent data loss and customer churn.

## The Data We Need From You
**What are the top 3 scenarios where a user will pull out their phone and open your app?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as a UX Researcher. My primary mobile app use case is: [Insert Use Case]. Please identify 3 environmental or contextual factors (e.g., poor lighting, bad internet, one-handed use) that could negatively impact this use case, and suggest how I should design the app to mitigate them.
\`\`\`

## Accountability Check
- [ ] I have clearly defined the primary use cases for my app.`,
  'mobileuserjourney': `# User Journey

**Estimated Time:** 1 Hour

---

## Why this matters
The user journey maps the entire lifecycle of a user, from the moment they discover your app in the App Store, to their first "Aha!" moment, to becoming a daily active user. Mapping this journey highlights friction points (like a tedious sign-up form) that cause users to abandon the app.

## Strategic Guidance

### Hackathon Mode
The journey is: 1. Judge opens app. 2. Judge clicks the big shiny button. 3. Judge sees the cool result. Make this path completely frictionless. No logins required.

### Personal Project
Map out the "Happy Path"—the sequence of screens you will tap through to get your task done as fast as possible.

### Production SaaS
You must optimize the "Time to Value" (TTV). If a user downloads your app, how many seconds does it take for them to experience the core value? If they have to verify their email, fill out a 10-field profile, and watch a tutorial before doing anything, they will uninstall it. Map every single tap required in the onboarding flow and mercilessly cut the unnecessary ones.

## The Data We Need From You
**Describe the sequence of steps a new user takes from opening the app for the first time to achieving their first "win".**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have mapped the user journey and identified areas to reduce friction.`,
  'mobiletargetaudience': `# Target Audience

**Estimated Time:** 30 min

---

## Why this matters
If you don't know who you are building for, you won't know where to find them, how to market to them, or what features they actually need. An app for "teenagers" is vastly different in design and monetization than an app for "corporate lawyers."

## Strategic Guidance

### Hackathon Mode
Your target audience is the judging panel. Tailor your pitch to their interests. If the sponsor is a fintech company, ensure your app highlights financial utility.

### Personal Project
You are the target audience. Build it for yourself.

### Production SaaS
You must be hyper-specific. "Fitness enthusiasts" is too broad. "Busy moms who want to do 15-minute home workouts without equipment" is a specific audience you can target with Facebook Ads and specific feature sets. Niche down until it hurts, dominate that niche, and then expand.

## The Data We Need From You
**Who exactly is your ideal customer? Be as specific as possible (Age, occupation, interests, pain points).**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have defined a hyper-specific target audience.`,
  'mobilepersonas': `# Personas

**Estimated Time:** 45 min

---

## Why this matters
Personas turn abstract demographic data into a concrete, fictional character. When deciding whether to add a complex new feature, it is much easier to ask "Would *Marketing Manager Sarah* actually use this?" than to ask "Would our target demographic use this?"

## Strategic Guidance

### Hackathon Mode
Skip it. You don't have time to create fictional characters.

### Personal Project
Skip it. You are the only persona that matters right now.

### Production SaaS
Create 2-3 detailed personas. Give them names, photos, job titles, and specific daily frustrations. Understand their tech literacy. If your persona is a 65-year-old construction manager, your app needs massive buttons, high contrast text, and offline support, not trendy microscopic fonts and complex swipe gestures.

## The Data We Need From You
**List the name and role of your primary user persona.**
\`\`\`input
Type your answer here...
\`\`\`

## AI Generation Phase
\`\`\`prompt
Act as a UX Researcher. My target audience is [Insert Audience]. Please generate a detailed User Persona for my mobile app. Include their Name, Age, Occupation, Tech Literacy Level, Top 3 Daily Frustrations, and exactly what they are looking for in a mobile solution.
\`\`\`

## Accountability Check
- [ ] I have created at least one detailed user persona to guide design decisions.`,
  'mobilesolutionstatement': `# Solution Statement

**Estimated Time:** 30 min

---

## Why this matters
If the Problem Statement defines the fire, the Solution Statement defines the fire extinguisher. It clarifies exactly how your mobile app addresses the core pain point in a way that is distinctly better than existing alternatives.

## Strategic Guidance

### Hackathon Mode
Keep it simple and direct. "Our app uses the phone's camera to instantly translate menus for travelers." Don't over-complicate it with buzzwords.

### Personal Project
Define the solution that works best for *you*. If your solution to tracking workouts is "a simple list of text inputs with no charts," that's perfectly valid for a personal tool.

### Production SaaS
Your solution statement must articulate the "Unique Value Proposition" (UVP). Why should someone download your app instead of using a web browser? Does your solution leverage native mobile capabilities (GPS, Camera, Push Notifications) that competitors lack? The solution must be 10x faster or 10x cheaper to convince users to switch.

## The Data We Need From You
**In one sentence, how does your app solve the problem you defined earlier?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have clearly articulated my solution and its unique value.`,
  'mobileelevatorpitch': `# Elevator Pitch

**Estimated Time:** 15 min

---

## Why this matters
You have 30 seconds to explain your app to an investor, a potential co-founder, or a user before they lose interest. An elevator pitch forces you to distill your entire business model, problem, and solution into a digestible, punchy narrative.

## Strategic Guidance

### Hackathon Mode
Your elevator pitch is the opening 30 seconds of your demo. Make it energetic. "Have you ever hated doing X? We built an app that does it for you in one tap."

### Personal Project
You only need this if you plan to share your project on Reddit or Twitter. A good pitch gets upvotes.

### Production SaaS
Use the classic format: "For [Target Audience] who have [Problem], our product is a [Category] that provides [Solution]. Unlike [Competitor], we [Unique Value]." Memorize this. Every employee you hire should be able to recite it.

## The Data We Need From You
**Draft your 30-second elevator pitch.**
\`\`\`input
Type your answer here...
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as an expert Copywriter. My current elevator pitch is: [Insert Pitch]. Please rewrite it to be punchier, more engaging, and exactly 3 sentences long. Focus heavily on the emotional benefit to the user.
\`\`\`

## Accountability Check
- [ ] I have a memorized, concise elevator pitch.`,
  'mobilecompetitoranalysis': `# Competitor Analysis

**Estimated Time:** 2 Hours

---

## Why this matters
If you think you have no competitors, you either haven't researched enough, or there is no market for your idea. Studying competitors reveals their weaknesses, their pricing models, and the features users actually care about.

## Strategic Guidance

### Hackathon Mode
Find one big competitor, and build a feature they *don't* have. During your pitch, say "Competitor X is great, but they ignore this specific use case. We built for that."

### Personal Project
Look at paid apps on the App Store that do what you want, and build a free clone for yourself. Use their screenshots as UI inspiration.

### Production SaaS
You must conduct a deep dive. Download their apps. Read their 1-star reviews on the App Store—this is a goldmine of features they are failing to deliver. Analyze their onboarding flow, their subscription pricing, and their marketing channels. Build a feature matrix comparing your app to the top 3 competitors.

## The Data We Need From You
**List your top 3 direct competitors.**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] I have analyzed my competitors and found my unique angle.`,
  'mobilesimilarapps': `# Similar Apps

**Estimated Time:** 1 Hour

---

## Why this matters
Looking at similar apps outside of your direct competitors (e.g., if you are building a fitness app, look at a language learning app) can provide massive inspiration for UX patterns, gamification, and onboarding strategies.

## Strategic Guidance

### Hackathon Mode
Find the most beautifully designed app on your phone and steal its color palette and button styles. Good artists copy; great artists steal.

### Personal Project
Browse Mobbin or UI sources to find UI patterns you want to learn how to code (like a cool swipe-to-delete animation).

### Production SaaS
Study the "best in class" apps (like Duolingo, Uber, or Airbnb). How does Duolingo handle daily streaks to drive retention? How does Uber handle map loading states? You aren't competing with them, but you are competing for the same standard of user experience that your users expect from those giants.

## The Data We Need From You
**Name 2 apps outside your industry that have incredible UX you want to emulate.**
\`\`\`input
1. 
2. 
\`\`\`

## Accountability Check
- [ ] I have identified non-competitor apps to study for UX inspiration.`,
  'play-store-research': `# Play Store Research

**Estimated Time:** 20 min

---

## Overview
If you plan to launch on Android, the Google Play Store is your battleground. The Play Store algorithm heavily favors keyword density, localization, and early retention metrics. Researching how your competitors position themselves in the Play Store gives you the blueprint for your own App Store Optimization (ASO) strategy.

---

## Think First
Open the Google Play Store on your Android device (or via the web browser) and search for the core keyword of your app.

**Top 3 Search Results** (What apps appear first? Are they massive companies or indie developers?)
\`\`\`input
Type your answer here...
\`\`\`

**Their Titles & Short Descriptions** (Google Play indexes the Title (30 chars) and Short Description (80 chars) heavily. What exact keywords are they using in these fields?)
\`\`\`input
Type your answer here...
\`\`\`

**The Negative Reviews** (Filter their reviews by 1-star. What is the most common complaint? "Too many ads"? "Crashes on Samsung"? "Requires too many permissions"?)
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Android First vs iOS First:** Android has a larger global market share but typically lower revenue per user. If your monetization strategy relies on sheer volume of users (e.g., ad-supported apps), the Play Store is critical.
- **Android Device Fragmentation:** Because there are thousands of different Android screen sizes, your UI must be exceptionally responsive.

---

## Common Mistakes
- **Ignoring Screenshots:** Android users often make downloading decisions entirely based on the first 3 screenshots. If your screenshots are just plain captures without explanatory text, you will lose downloads.
- **Keyword Stuffing:** Google's algorithm will penalize you if your long description reads like a spammy list of keywords instead of natural language.

---

## AI Prompt
Use AI to extract an actionable ASO strategy for the Play Store.

\`\`\`prompt
Act as a Google Play ASO Expert.
Review my research inputs above.

1. Suggest a 30-character App Title and an 80-character Short Description for my app that optimizes for my core keywords but still sounds natural.
2. Based on the negative reviews of my competitors, what is the #1 feature I should highlight in my first Play Store screenshot to steal their frustrated users?
3. What is a common Android-specific UX expectation that my app must meet to avoid 1-star reviews?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Google Play Console, Supabase, Vercel) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your suggested Title, Short Description, and the key screenshot concept here.

\`\`\`input
Type your answer here...
\`\`\``,
  'appstoreresearch': `# App Store Research

**Estimated Time:** 1 Hour

---

## Why this matters
The Apple App Store is highly lucrative but notoriously strict. Apple users have high design standards, and Apple reviewers will reject your app if it looks like a cheap web wrapper or violates their human interface guidelines.

## Strategic Guidance

### Hackathon Mode
Skip it. Apple's review process takes days; you won't be submitting a hackathon project to the App Store.

### Personal Project
Browse the App Store for UI inspiration. Notice how iOS apps use native components (like Bottom Sheets and Navigation Bars) heavily.

### Production SaaS
ASO on the App Store is driven heavily by the app Title and the invisible 'Keywords' field. Research which keywords have high volume and low competition using tools like SensorTower or AppFigures. Prepare for Apple's strict In-App Purchase (IAP) rules; they will take 15-30% of your revenue if you sell digital goods.

## The Data We Need From You
**What are the top 3 ranking apps for your primary keyword on the Apple App Store?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] I understand the landscape of my category on the App Store.`,
  'mobilefeatureplanning': `# Feature Planning

**Estimated Time:** 1-2 Hours

---

## Why this matters
Without a strict feature plan, you will succumb to "Feature Creep." You will keep adding one more button, one more screen, and one more integration until you run out of time or money, and the app never launches.

## Strategic Guidance

### Hackathon Mode
Plan exactly 3 features: Authentication (maybe), Data Input, and Data Display. That is it. Anything else is a distraction.

### Personal Project
Write down everything you want the app to do eventually, and then violently cross out half of them. Build the core utility first.

### Production SaaS
You must separate features into "Must Haves", "Should Haves", and "Nice to Haves" (MoSCoW method). Focus entirely on the "Must Haves" that directly solve the core problem. If a feature does not directly impact user retention or revenue, push it to the backlog.

## The Data We Need From You
**Brainstorm your master list of features here.**
\`\`\`input
- Feature 1
- Feature 2
\`\`\`

## Accountability Check
- [ ] I have brainstormed and categorized all potential features.`,
  'mobilemvpfeatures': `# MVP Features

**Estimated Time:** 1 Hour

---

## Why this matters
The Minimum Viable Product (MVP) is the absolute bare minimum version of your app that still provides value to the user. Reid Hoffman famously said, "If you are not embarrassed by the first version of your product, you've launched too late."

## Strategic Guidance

### Hackathon Mode
Your entire project is an MVP. Pick the single most impressive feature and build only that. Fake the rest with static UI.

### Personal Project
The MVP is the feature that solves your own personal problem. If you need a habit tracker, the MVP is a button that adds +1 to a database. You don't need charts or social sharing yet.

### Production SaaS
Ruthlessly cut scope. Do you really need an in-app chat system for V1? No. Do you need "Sign in with Apple" for V1? Probably not. The goal of the MVP is to test your riskiest assumption in the market as fast as possible. Build it, launch it, and see if anyone actually cares.

## The Data We Need From You
**List the absolute minimum features required for your app to function.**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] I have defined a lean, testable MVP.`,
  'mobilefuturefeatures': `# Future Features

**Estimated Time:** 30 min

---

## Why this matters
Documenting future features gets them out of your head so you can focus on the MVP. It also provides a roadmap you can share with investors or early users to show them where the product is heading.

## Strategic Guidance

### Hackathon Mode
This is your "What's Next" slide in your presentation. Dream big here to impress the judges.

### Personal Project
Keep a "Someday" list in a notes app. When you get bored on a weekend, pick one to build.

### Production SaaS
Put these in your product backlog. Crucially, do not build them just because they are on the list. Wait until users actually ask for them. Often, the features you thought would be critical turn out to be completely unnecessary once real users start interacting with the app.

## The Data We Need From You
**List 3 ambitious features you want to build 6-12 months from now.**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] I have documented my future ambitions without letting them distract my MVP.`,
  'mobilefeatureprioritization': `# Feature Prioritization

**Estimated Time:** 1 Hour

---

## Why this matters
Not all features are created equal. A feature that takes 2 weeks to build and increases revenue by 10% is infinitely more valuable than a feature that takes 4 weeks to build and only makes the UI look slightly better. Prioritization frameworks ensure you are working on the highest-leverage tasks.

## Strategic Guidance

### Hackathon Mode
Prioritize strictly by "Wow Factor" vs "Time to Build". Build the high-wow, low-time features first.

### Personal Project
Prioritize what sounds fun to build. It's a personal project; keep yourself motivated.

### Production SaaS
Use the ICE framework (Impact, Confidence, Ease) or the RICE framework (Reach, Impact, Confidence, Effort). Score every feature on your backlog from 1-10 on these metrics. Sort the list by the highest score. Build that feature. Do not deviate based on "gut feeling."

## AI Refinement Phase
\`\`\`prompt
Act as a Product Manager. I have these 5 features in my backlog: [Insert Features]. Help me prioritize them using the RICE framework. Ask me specific questions about the expected impact and effort of each one so we can calculate a score.
\`\`\`

## Accountability Check
- [ ] I have systematically prioritized my feature backlog.`,
  'mobilemonetization': `# Monetization Strategy

**Estimated Time:** 1 Hour

---

## Why this matters
If you don't know how you are going to make money, you don't have a business; you have a charity. Mobile app monetization is notoriously difficult because users are conditioned to expect mobile apps to be free.

## Strategic Guidance

### Hackathon Mode
Pick a massive, unrealistic subscription number ($99/month!) just to show the judges there is a B2B business model here. 

### Personal Project
Keep it free forever. The goodwill and portfolio value of having an open-source or free tool is usually worth more than the $15/month you might make from ads.

### Production SaaS
You must pick a lane. Freemium, Subscriptions, Ads, or Paid Upfront. B2B apps should almost always be Subscriptions. Consumer apps often require Freemium or Ads to get enough scale. Remember that Apple/Google take 15-30% of all digital purchases made inside the app, which drastically affects your margins.

## The Data We Need From You
**What is your primary method of generating revenue?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have selected a clear monetization strategy.`,
  'mobilefree': `# Free App Strategy

**Estimated Time:** 15 min

---

## Why this matters
Releasing a completely free app is the fastest way to get users, but it means you must fund the server and database costs out of your own pocket. 

## Strategic Guidance

### Hackathon Mode
Perfect. Everything is free.

### Personal Project
Perfect. Just make sure you are using generous free tiers (Vercel, Supabase, Firebase) so your app doesn't accidentally cost you $500 if it goes viral on Reddit.

### Production SaaS
"Free" is only a valid strategy if you are venture-backed and your only goal is user acquisition, OR if the app is a loss-leader for a more expensive physical product or service. Otherwise, you will go bankrupt. If you offer a free tier, it must be severely restricted (e.g., "Only 5 invoices per month") to force power users to upgrade.

## Accountability Check
- [ ] I understand the costs and strategic implications of offering a free app.`,
  'mobilefreemium': `# Freemium Model

**Estimated Time:** 30 min

---

## Why this matters
Freemium (Free + Premium) is the dominant model for consumer apps (like Spotify or Duolingo). The free version gets millions of users in the door, and the premium version (removing ads, unlocking features) monetizes the top 5% of "power users".

## Strategic Guidance

### Hackathon Mode
Show a "Pro" badge next to a cool feature during the demo, and explain that it's behind a paywall in the business model.

### Personal Project
Don't bother. Building paywalls and payment gateways is tedious.

### Production SaaS
The hardest part of Freemium is deciding where to put the paywall. If you give away too much, no one upgrades. If you give away too little, users uninstall the app immediately. A good rule of thumb: give away the core utility for free, but charge for convenience, speed, cosmetics, or team collaboration.

## The Data We Need From You
**Exactly what features will be restricted to the Premium tier?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have clearly defined the boundary between the free and premium versions.`,
  'mobilesubscription': `# Subscription Model

**Estimated Time:** 30 min

---

## Why this matters
Recurring revenue is the holy grail of software. Subscriptions make your business predictable and highly valued by investors. However, users suffer from "Subscription Fatigue" and will ruthlessly cancel if they don't get consistent value every month.

## Strategic Guidance

### Hackathon Mode
Skip the implementation, but mention it in the pitch.

### Personal Project
Skip it. Building recurring billing (Stripe/RevenueCat) is complex.

### Production SaaS
You must deliver ongoing value. A to-do list app does not deserve $5/month unless it syncs across all devices, uses AI to prioritize tasks, and offers team collaboration. Offer monthly and annual plans. Use a tool like RevenueCat or Superwall to manage the complex logic of iOS/Android receipt validation and paywall A/B testing.

## The Data We Need From You
**What are your monthly and annual price points?**
\`\`\`input
Monthly: $
Annual: $
\`\`\`

## Accountability Check
- [ ] I have set my subscription pricing and justified the recurring value.`,
  'mobileads': `# Ad Monetization

**Estimated Time:** 30 min

---

## Why this matters
If your app has high engagement but users refuse to pay for it (like mobile games or social media), advertising is your only option. However, ads ruin the user experience and require massive scale to generate meaningful revenue.

## Strategic Guidance

### Hackathon Mode
Do not put ads in a hackathon project. It looks spammy.

### Personal Project
Avoid ads. They make your personal project look cheap, and you won't get enough traffic to make more than a few pennies anyway.

### Production SaaS
Only use ads if you expect millions of daily active users. Use Google AdMob or Facebook Audience Network. Be very careful with interstitial (full-screen) ads; if you show them too often, your retention rate will plummet. Always offer an In-App Purchase (IAP) to "Remove Ads for $2.99".

## Accountability Check
- [ ] I understand the scale required to make advertising profitable.`,
  'mobileonetimepurchase': `# One-time Purchase

**Estimated Time:** 15 min

---

## Why this matters
Before subscriptions took over the App Store, you simply bought an app for $4.99 and owned it forever. Users love this model because they hate subscriptions. Developers hate this model because if you have to pay server costs every month, but the user only pays you once, you will eventually run out of money.

## Strategic Guidance

### Hackathon Mode
Skip it.

### Personal Project
Skip it.

### Production SaaS
Only use a One-Time Purchase model if your app works 100% offline and has zero ongoing server costs (e.g., a simple calculator or an offline camera filter app). If your app requires a backend API, database, or LLM calls, you CANNOT offer a one-time lifetime deal unless you price it incredibly high (e.g., $150+).

## Accountability Check
- [ ] I understand why one-time purchases are dangerous for cloud-based apps.`,
  'mobilesuccessmetrics': `# Success Metrics

**Estimated Time:** 30 min

---

## Why this matters
If you don't define what "success" looks like before you launch, you will constantly move the goalposts. Defining metrics (KPIs) ensures you are optimizing for the right things. 10,000 downloads means nothing if 9,900 people uninstall it immediately.

## Strategic Guidance

### Hackathon Mode
Success is winning the hackathon. Your metric is the judges' scores.

### Personal Project
Success is solving your own problem and learning a new framework. The metric is 1 Active User (You).

### Production SaaS
You must define a "North Star Metric". This is the one metric that best captures the core value your product delivers to its customers. For Airbnb, it's "Nights Booked". For a messaging app, it's "Messages Sent". Do not make "Downloads" or "Revenue" your North Star; those are lagging indicators. If you optimize for the North Star, revenue will follow.

## The Data We Need From You
**What is the North Star Metric for your app?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have defined my core success metrics.`,
  'mobileretention': `# Retention Metrics

**Estimated Time:** 30 min

---

## Why this matters
Retention is the percentage of users who come back to your app after their first visit. It is the ultimate measure of product-market fit. A great marketing campaign can trick someone into downloading an app once, but only a great product gets them to open it a second time.

## Strategic Guidance

### Hackathon Mode
Irrelevant.

### Personal Project
Irrelevant.

### Production SaaS
You must obsess over Day 1, Day 7, and Day 30 retention. Average apps see a massive drop-off on Day 1 (70% of users never come back). If your Day 30 retention is below 10%, you have a leaky bucket and should stop spending money on marketing until you fix the core product experience.

## The Data We Need From You
**What action must a user take on Day 1 to make it highly likely they return on Day 7?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I understand that retention is more important than acquisition.`,
  'mobiledau': `# Daily Active Users (DAU)

**Estimated Time:** 15 min

---

## Why this matters
DAU is the number of unique users who open your app in a single day. It is the core metric for apps that require daily habits (like social media, games, or fitness trackers). 

## Strategic Guidance

### Hackathon Mode
Irrelevant.

### Personal Project
Irrelevant.

### Production SaaS
Not all apps need a high DAU. If you are building a tax-filing app, your DAU will be near zero for 11 months of the year, and that's fine. Don't force users to open the app daily with spammy push notifications if the core use case is only weekly or monthly. If you *are* building a daily habit app, your DAU/MAU ratio tells you how sticky the product is.

## Accountability Check
- [ ] I know whether my app is designed for daily or weekly usage.`,
  'mobilemau': `# Monthly Active Users (MAU)

**Estimated Time:** 15 min

---

## Why this matters
MAU is the number of unique users who open your app at least once in a 30-day period. This is a much better metric for B2B tools, utility apps, or e-commerce apps where daily usage isn't required for success.

## Strategic Guidance

### Hackathon Mode
Irrelevant.

### Personal Project
Irrelevant.

### Production SaaS
Investors look closely at MAU growth. However, define "Active" carefully. Is a user "active" just because they opened the app by accident and closed it 2 seconds later? No. Define an "Active User" as someone who actually completes a core action (e.g., "Listened to 1 song" or "Sent 1 invoice").

## Accountability Check
- [ ] I have defined what an 'Active' user actually means for my product.`,
  'mobilesessionduration': `# Session Duration

**Estimated Time:** 15 min

---

## Why this matters
Session duration tracks how long a user spends in your app during a single visit. For TikTok, longer is better. For an Uber driver app, shorter might actually be better (it means they found a ride quickly).

## Strategic Guidance

### Hackathon Mode
Irrelevant.

### Personal Project
Irrelevant.

### Production SaaS
Determine if your app is a "Time Sink" (Netflix, Instagram) or a "Utility" (Google Maps, Calculator). If it's a utility, a decreasing session duration might actually mean your UX is improving and users are getting their tasks done faster. Optimize accordingly.

## Accountability Check
- [ ] I know whether a long session duration is a good or bad signal for my app.`,
  'mobileprd': `# Product Requirements Document (PRD)

**Estimated Time:** 1-2 Hours

---

## Why this matters
A PRD is the single source of truth for what you are building. It takes all the messy ideas from your brain and formalizes them into a contract. Without a PRD, you will waste hours arguing with yourself (or your co-founder) about whether a feature was supposed to be included in V1.

## Strategic Guidance

### Hackathon Mode
Your PRD is a bulleted list on a napkin. Keep it to 5 sentences.

### Personal Project
Write a 1-page Notion document. List the problem, the solution, the MVP features, and the tech stack. It helps ground you when you lose focus.

### Production SaaS
You must write a rigorous PRD. It must include the North Star Metric, User Personas, User Stories (e.g., "As a user, I want to X, so that I can Y"), out-of-scope items (what we are *not* building), and the technical constraints. Share this with your designer and engineer before anyone starts working.

## The Data We Need From You
**Paste your core PRD requirements (or a link to your Google Doc/Notion) here.**
\`\`\`input
Type your answer here...
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as a rigorous Product Manager. Here are the raw requirements for my mobile app: [Insert Notes]. Please generate a formal, structured Product Requirements Document (PRD) from this. Include User Stories and explicit Acceptance Criteria for the core features.
\`\`\`

## Accountability Check
- [ ] I have a written PRD that clearly outlines the scope of the project.`,
  'mobileuserflows': `# User Flows

**Estimated Time:** 1 Hour

---

## Why this matters
A user flow is a flowchart diagram that shows every step a user takes to complete a task. It exposes missing screens (e.g., "Wait, where do they go after they click 'Forgot Password'?") before you waste time designing or coding them.

## Strategic Guidance

### Hackathon Mode
Draw 3 boxes on a whiteboard: Login -> Main Screen -> Result Screen. You're done.

### Personal Project
Use a free tool like Excalidraw or FigJam. Map out the happy path.

### Production SaaS
You must map out every edge case. What happens if the network drops on step 3? What happens if their credit card is declined? What happens if they deny camera permissions? Use standard flowchart shapes (diamonds for decisions, rectangles for screens) so the whole team can read it.

## The Data We Need From You
**What is the most complex flow in your app? (e.g., Checkout, Onboarding, Creating a Post)**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have mapped out the visual flow for my core user actions.`,
  'appnavigation': `# App Navigation

**Estimated Time:** 1 Hour

---

## Why this matters
Navigation is the skeleton of a mobile app. If a user can't figure out how to get back to the home screen, they will uninstall the app. Unlike web apps, mobile apps don't have a built-in browser "Back" button (especially on iOS), so you must design the hierarchy carefully.

## Strategic Guidance

### Hackathon Mode
Use a standard Bottom Tab bar with 3 icons. It's the most common and easily understood pattern.

### Personal Project
Stick to native patterns. If you're building for iOS, use a Bottom Tab bar. Avoid complex "Hamburger" side-menus unless you have dozens of secondary screens.

### Production SaaS
You must define your Root Navigation (e.g., Auth Stack vs Main Stack). If you use a Bottom Tab bar, limit it to 3-5 primary destinations. Ensure you support deep linking so clicking a notification opens a specific screen deep inside the app, rather than just the home screen.

## The Data We Need From You
**What are the 3 to 5 main tabs that will live in your bottom navigation bar?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] I have finalized the core navigation hierarchy of my app.`,
  'mobilewireframes': `# Wireframes

**Estimated Time:** 2 Hours

---

## Why this matters
Wireframes are low-fidelity, black-and-white sketches of your app's screens. They focus entirely on layout and hierarchy, completely ignoring colors, fonts, and images. Skipping wireframes is like trying to build a house without a blueprint.

## Strategic Guidance

### Hackathon Mode
Sketch the 3 main screens on paper with a sharpie. Do not open Figma. Paper wireframes are faster and perfectly fine for a hackathon.

### Personal Project
Use a tool like Balsamiq, or just use simple gray boxes in Figma. Focus on where the buttons go and how much space the data needs.

### Production SaaS
You must create comprehensive digital wireframes for every screen and every edge case (empty states, error states). Link the wireframes together in Figma to create a clickable prototype. Test this prototype with real users to ensure the navigation makes sense before applying high-fidelity branding.

## AI Generation Phase
\`\`\`prompt
Act as a UX Designer. I need to wireframe the "Dashboard" screen for my mobile app: [Insert App Info]. Please provide a text-based layout of this screen from top to bottom. Specify what components (e.g., Header, Search Bar, Card List, Floating Action Button) should be on the screen and their hierarchical importance.
\`\`\`

## Accountability Check
- [ ] I have sketched the core screens of my application.`,
  'mobiledesignsystem': `# Design System

**Estimated Time:** 2 Hours

---

## Why this matters
A design system is a collection of reusable components (buttons, typography, colors) with clear standards. Without a design system, your app will have 14 different shades of blue and 6 different button styles, making it look unprofessional and drastically slowing down development.

## Strategic Guidance

### Hackathon Mode
Do not build a design system. Use a pre-built UI library like React Native Paper or NativeBase. Just use their default buttons and colors.

### Personal Project
Define 3 colors (Primary, Background, Text) and 1 font family. Create a single `Button` component in your codebase and reuse it everywhere.

### Production SaaS
You must establish a rigorous design system in Figma (using auto-layout and components) and mirror it exactly in your codebase. Define your design tokens (e.g., `color-primary-500`, `spacing-md`). This ensures that when the marketing team rebrands the company, you only have to change the color in one place, not 500 places.

## The Data We Need From You
**What UI library (if any) are you using to speed up development? (e.g., NativeWind, React Native Paper, SwiftUI Native)**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have defined my core design tokens (colors, typography, spacing).`,
  'mobilebranding': `# Branding

**Estimated Time:** 1 Hour

---

## Why this matters
Branding is more than just a logo. It is the emotional feeling a user gets when they open your app. A banking app should feel secure and rigid (blues, heavy fonts); a fitness app should feel energetic (neon colors, bold italics).

## Strategic Guidance

### Hackathon Mode
Pick one bright color. Generate a logo using AI or an icon from NounProject. Done.

### Personal Project
Pick a color palette from coolors.co. Don't spend more than 30 minutes on the logo.

### Production SaaS
Your branding must be consistent across your app, your App Store screenshots, your website, and your emails. Establish a Brand Voice (e.g., "We are helpful, but not overly enthusiastic"). Hire a professional designer for the App Icon, because the App Icon is the single most important branding asset for click-through rates on the App Store.

## The Data We Need From You
**What are the primary hex codes for your brand colors?**
\`\`\`input
Primary:
Secondary:
Background:
\`\`\`

## AI Refinement Phase
\`\`\`prompt
Act as a Brand Strategist. My app is a [Insert Category]. The target audience is [Insert Audience]. Please suggest 3 distinct color palettes (with hex codes) and 2 Google Fonts that would evoke the right emotional response for this audience.
\`\`\`

## Accountability Check
- [ ] I have finalized the color palette, typography, and logo for my app.`,
  'mobileaccessibility': `# Accessibility (a11y)

**Estimated Time:** 2 Hours

---

## Why this matters
Over 15% of the global population experiences some form of disability. If your app has low contrast text or buttons that are too small to tap, you are actively preventing millions of people from giving you money. In many jurisdictions, inaccessible apps violate the law (e.g., ADA compliance).

## Strategic Guidance

### Hackathon Mode
Ignore it completely. You don't have time.

### Personal Project
Just make sure your text is legible. Don't use light gray text on a white background.

### Production SaaS
You must adhere to WCAG (Web Content Accessibility Guidelines) standards. Use tools to check color contrast ratios. You must support "Dynamic Type" (so when an elderly user increases their phone's font size in the OS settings, your app's text scales up without breaking the layout). Ensure all images and icons have descriptive `accessibilityLabel` properties for screen readers (like VoiceOver or TalkBack).

## AI Execution Phase
\`\`\`prompt
Act as an Accessibility Expert. I am building a mobile app using [Insert Tech Stack]. Provide a checklist of the 5 most critical accessibility features I need to implement (e.g., Dynamic Type, Screen Reader support, Touch Target Sizes) and how to code them in my specific framework.
\`\`\`

## Accountability Check
- [ ] I have ensured my app is usable by people with visual or motor impairments.`,
  'mobileemptystates': `# Empty States

**Estimated Time:** 1 Hour

---

## Why this matters
The first time a user opens your app, they have no data, no friends, and no history. If you just show them a blank white screen, they will think the app is broken and uninstall it. Empty states are your best opportunity to guide the user to their first action.

## Strategic Guidance

### Hackathon Mode
Write a text element that says "Nothing here yet! Click the + button." 

### Personal Project
Add a nice illustration (from unDraw or similar free sites) and a helpful message. 

### Production SaaS
Treat empty states as a critical part of onboarding. Do not just say "No Invoices Found." Say "You haven't created any invoices yet. Create your first invoice to get paid faster," and include a massive, highly visible "Create Invoice" button right in the middle of the screen. Use empty states to educate and motivate.

## The Data We Need From You
**List 3 screens in your app that will be empty when a new user signs up.**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] I have designed helpful, action-oriented empty states for all core screens.`,
  'mobileerrorstates': `# Error States

**Estimated Time:** 1 Hour

---

## Why this matters
Mobile apps lose network connection constantly (driving through a tunnel, bad Wi-Fi). APIs go down. If your app just crashes or shows a generic "Error 500" alert box, the user will blame your app. Good error states clearly explain what went wrong and how the user can fix it.

## Strategic Guidance

### Hackathon Mode
Don't build error states. Just assume the "Happy Path" will always work during the demo.

### Personal Project
Add a simple `try/catch` block to your API calls and show an alert box that says "Something went wrong. Please try again." 

### Production SaaS
You must gracefully handle all error types. If they are offline, show a banner saying "You are offline. Showing cached data." If a form submission fails, highlight the exact text input that caused the error (e.g., "Password must be 8 characters"). Never show a user a raw JSON error string from your backend. Provide a clear "Retry" button for network failures.

## The Data We Need From You
**What is the most critical failure point in your app (e.g., Payment failed, Upload failed)?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have designed clear, helpful error states that don't blame the user.`,
  'mobileloadingstates': `# Loading States

**Estimated Time:** 1 Hour

---

## Why this matters
If a user clicks a button and nothing happens for 2 seconds, they will click it 5 more times, potentially triggering 5 duplicate API calls and crashing your backend. Loading states communicate to the user that "the app is working, please wait."

## Strategic Guidance

### Hackathon Mode
Use standard circular activity indicators (spinners) everywhere. Don't waste time on custom skeleton loaders.

### Personal Project
Experiment with "Skeleton Loaders" (the gray, shimmering shapes that match the content layout). They make the app feel significantly faster because the layout doesn't "jump" when the data finally loads.

### Production SaaS
You must use Optimistic UI. When a user clicks "Like", the heart icon should turn red *instantly*, before the database confirms it. If the API call fails, silently revert the heart back to gray. This makes your app feel instantly responsive, even on a slow 3G connection. For heavy initial data loads, use custom Lottie animations to keep the user entertained while they wait.

## The Data We Need From You
**Identify the screen in your app that will take the longest to load data.**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have planned visual feedback for all network requests.`,
  'mobileplatformstrategy': `# Platform Strategy

**Estimated Time:** 30 min

---

## Why this matters
Should you build for iOS, Android, or both? The answer dictates your entire engineering process. If you choose "both" using a native language (Swift for iOS, Kotlin for Android), you now have two separate codebases, two separate teams, and double the bugs.

## Strategic Guidance

### Hackathon Mode
Build for the phone that is currently in your pocket. If you have an iPhone, build for iOS. Don't build for a platform you can't easily test on a physical device.

### Personal Project
Use a cross-platform framework (React Native or Flutter) so you can deploy to both stores from one codebase. It is the only sane choice for a solo developer.

### Production SaaS
Almost all startups today choose a cross-platform framework (React Native or Flutter) for V1. You only need to build "True Native" (Swift/Kotlin) if your app relies heavily on intense graphics (like a 3D game) or low-level hardware access (like a complex AR/VR app). Maintaining two separate codebases is a massive financial burden that you should delay as long as possible.

## The Data We Need From You
**Will you launch on iOS, Android, or both initially?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have selected a clear deployment platform strategy.`,
  'mobilefundamentals': `# Mobile Fundamentals

**Estimated Time:** 2 Hours

---

## Why this matters
Mobile apps are not just small websites. You must manage the app lifecycle (what happens when the app goes to the background?), handle memory constraints (phones have less RAM than laptops), and deal with the OS forcefully killing your app to save battery.

## Strategic Guidance

### Hackathon Mode
Ignore this. Your app only needs to survive being open for 3 minutes.

### Personal Project
Learn how to save state when the app goes to the background. If a user is typing a long note, switches to Spotify to change a song, and comes back, that note must not be deleted.

### Production SaaS
You must master the App Lifecycle (Foreground, Background, Suspended). You must handle deep links correctly regardless of whether the app was completely closed or just backgrounded. You must optimize memory usage; if your app loads 500 high-res images into a list without virtualization, the OS will kill the app silently (OOM - Out of Memory crash).

## AI Refinement Phase
\`\`\`prompt
Act as a Senior Mobile Architect. I am building my app in [Insert Tech Stack]. Explain how the OS "App Lifecycle" works in this framework. Specifically, tell me which lifecycle method I should use to save user data before the app is forcefully killed by the OS.
\`\`\`

## Accountability Check
- [ ] I understand the core differences between web and mobile architecture.`,
  'mobiletechstackselection': `# Tech Stack Selection

**Estimated Time:** 30 min

---

## Why this matters
Choosing a mobile tech stack is a decade-long commitment. If you choose an obscure, dying framework, you won't be able to hire engineers, and third-party SDKs (like Stripe or Firebase) won't support your app.

## Strategic Guidance

### Hackathon Mode
Use React Native with Expo. It is infinitely faster to set up than dealing with Android Studio or Xcode configurations during a 24-hour sprint.

### Personal Project
If you know React, use React Native (Expo). If you know Dart or want beautiful animations out-of-the-box, use Flutter. If you only know Apple ecosystem, use SwiftUI.

### Production SaaS
React Native (via Expo) or Flutter are the industry standards for cross-platform SaaS. React Native is generally preferred if you already have a React web team, as they can share business logic and TypeScript types between the web and mobile codebases. Do not use Cordova or Ionic/Capacitor (web wrappers) unless your app is extremely simple; the performance difference is noticeable to users.

## The Data We Need From You
**What mobile framework will you use to build the frontend?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have finalized my mobile tech stack.`,
  'mobilestatemanagement': `# State Management Architecture

**Estimated Time:** 1 Hour

---

## Why this matters
State management dictates how data flows through your app. If a user updates their profile picture on the Settings screen, does it instantly update on the Home screen? If you don't have a solid architecture, you will end up passing data through 10 layers of components ("prop drilling"), making the code unreadable.

## Strategic Guidance

### Hackathon Mode
Keep it simple. Put all your state in the highest possible component and pass it down, or use the basic Context API. Don't waste 3 hours configuring Redux.

### Personal Project
Try a modern, lightweight state manager like Zustand or Jotai (if using React Native) or Riverpod (if using Flutter). They require very little boilerplate and are incredibly powerful.

### Production SaaS
You must separate Server State (data from your API) from Client State (UI toggles). Use a tool like React Query or RTK Query for server state; it handles caching, loading states, and automatic retries for you. Use Zustand/Redux strictly for global client state (like the active theme or the current user's auth token).

## The Data We Need From You
**What libraries will you use to manage Server State and Client State?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have a clear plan for managing global and local state.`,
  'mobileapistrategy': `# API Strategy

**Estimated Time:** 1 Hour

---

## Why this matters
Mobile apps cannot talk directly to a database securely. They must talk to an API. Mobile network connections drop constantly, so your API strategy must account for slow connections, retries, and minimizing payload sizes to save the user's mobile data.

## Strategic Guidance

### Hackathon Mode
Just use `fetch()` or `axios` and hit your endpoints. Don't worry about caching or complex error handling.

### Personal Project
Use a Backend-as-a-Service (BaaS) like Supabase or Firebase. They provide SDKs that handle all the API calls, WebSocket connections, and real-time updates for you automatically.

### Production SaaS
If building a custom backend, use GraphQL or tRPC if you want strict type safety between the mobile app and the server. You must implement robust error handling (e.g., exponential backoff for failed requests). Ensure your API returns paginated data; downloading 10,000 rows of data at once will freeze a mobile device.

## AI Refinement Phase
\`\`\`prompt
Act as a Mobile Architect. I am connecting my app to a REST API using [Insert Tech Stack]. Provide an "Axios Interceptor" (or equivalent middleware) script that automatically catches 401 Unauthorized errors, attempts to refresh the auth token, and retries the original request seamlessly without the user noticing.
\`\`\`

## Accountability Check
- [ ] I have defined how my mobile app will communicate with the backend securely.`,
  'mobilelocalstorage': `# Local Storage Strategy

**Estimated Time:** 1 Hour

---

## Why this matters
Mobile apps need to store small amounts of data locally on the device (like Auth tokens or user preferences) so the user doesn't have to log in every time they open the app. Storing sensitive data insecurely is a massive security risk.

## Strategic Guidance

### Hackathon Mode
Use `AsyncStorage` (React Native) or `SharedPreferences` (Android). Just dump the data in there. It's not encrypted, but it works for a demo.

### Personal Project
Learn to use Secure Storage. If you are storing a JWT token, use `expo-secure-store` or Flutter's `flutter_secure_storage`. This encrypts the data using the device's native Keychain/Keystore.

### Production SaaS
You must use encrypted Secure Storage for any Auth Tokens or PII (Personally Identifiable Information). If you need to store large amounts of structured data locally for offline support, use a local database like SQLite or WatermelonDB. Never store raw passwords locally under any circumstances.

## The Data We Need From You
**What data absolutely needs to be saved on the user's device between sessions?**
\`\`\`input
1. 
2. 
\`\`\`

## Accountability Check
- [ ] I understand the difference between standard storage and secure encrypted storage.`,
  'mobileauthentication': `# Authentication Strategy

**Estimated Time:** 1 Hour

---

## Why this matters
Authentication on mobile requires dealing with biometric logins (FaceID/TouchID), OAuth redirects that bounce out to the browser and back into the app via deep links, and securely storing session tokens. It is significantly more complex than web authentication.

## Strategic Guidance

### Hackathon Mode
Use Firebase Auth or Supabase Auth. Set up simple Email/Password. Don't waste time configuring Apple or Google Sign-In, as the OAuth credential setup takes hours.

### Personal Project
Try implementing "Sign in with Google" or "Sign in with Apple". It provides a vastly superior UX compared to typing out an email and password on a tiny keyboard.

### Production SaaS
If you publish an iOS app that uses *any* third-party login (like Google or Facebook), Apple explicitly requires you to *also* offer "Sign in with Apple", or they will reject your app. You should strongly consider implementing biometric authentication (FaceID) for apps containing sensitive data (banking, health) when the app resumes from the background.

## The Data We Need From You
**What authentication providers will you offer to your users?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have an authentication strategy that complies with App Store guidelines.`,
  'mobiledatabase': `# Database Schema

**Estimated Time:** 1 Hour

---

## Why this matters
The database schema defines the structure of your data. If you model it poorly, your app will have to execute complex, slow queries that will drain the user's battery and consume massive amounts of mobile data.

## Strategic Guidance

### Hackathon Mode
Use a NoSQL database (like Firebase Firestore) because it requires zero schema setup. You can just throw JSON objects at it and it works instantly.

### Personal Project
Use a relational database (PostgreSQL via Supabase). Relational databases force you to think about data structure early on, which prevents messy, orphaned data later.

### Production SaaS
You must design for efficiency. Use an ORM (like Prisma or Drizzle) on your backend. Your database schema must support soft deletes (never actually delete data, just mark `is_deleted = true`). If you have offline requirements, your schema must include an `updated_at` timestamp on *every* table so the mobile app knows which records to sync when it comes back online.

## AI Execution Phase
\`\`\`prompt
Act as a Database Architect. My mobile app does [Insert App Function]. My core entities are [Insert Entities]. Generate a PostgreSQL schema for these entities. Include primary keys, foreign keys, and specific indexes for the columns I will likely filter or search by frequently.
\`\`\`

## Accountability Check
- [ ] I have finalized the data model and schema for my core entities.`,
  'mobilebackend': `# Backend Architecture

**Estimated Time:** 1 Hour

---

## Why this matters
The backend is the authoritative source of truth. Mobile apps are fundamentally untrustworthy (users can decompile your code or alter network requests). All business logic, pricing logic, and security checks must happen on the backend.

## Strategic Guidance

### Hackathon Mode
Use a Backend-as-a-Service (BaaS) like Supabase or Firebase. Write zero backend code. Let the app talk directly to the database using the provided client SDKs.

### Personal Project
If you want to learn backend development, build a simple Monolithic Node.js/Express or Python/FastAPI server. Host it cheaply on Render or Railway.

### Production SaaS
Do not build Microservices unless you have 10+ backend engineers. Stick to a Modular Monolith. You must secure your API endpoints. If you are using a BaaS like Supabase, you MUST implement rigorous Row Level Security (RLS) policies, otherwise anyone with your public API key can download your entire database.

## The Data We Need From You
**Will you build a custom backend (Node/Python/Go) or use a BaaS (Supabase/Firebase)?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have decided on my backend architecture approach.`,
  'mobilepushnotifications': `# Push Notification Strategy

**Estimated Time:** 1 Hour

---

## Why this matters
Push notifications are the single most powerful tool for mobile retention, but they are incredibly difficult to set up. You have to handle APNs (Apple), FCM (Google), request user permissions natively, and manage device tokens that constantly change.

## Strategic Guidance

### Hackathon Mode
Do not build real push notifications. They require Apple Developer account certificates which take hours to configure. Fake it by using an in-app "Toast" alert that pops up after a timer.

### Personal Project
Use Expo Push Notifications or Firebase Cloud Messaging (FCM). They abstract away the nightmare of dealing directly with Apple (APNs).

### Production SaaS
You must ask for notification permissions at the *exact right moment*. If you ask immediately upon app open, 80% of users will click "Deny" and you can never ask again natively. Ask only after the user has experienced value. You must store multiple `push_tokens` per user in your database, as a single user might have your app installed on an iPhone, an iPad, and an Android device.

## The Data We Need From You
**What specific user action will trigger your most important push notification?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have a strategy for requesting notification permissions gracefully.`,
  'mobiledeeplinking': `# Deep Linking

**Estimated Time:** 1 Hour

---

## Why this matters
Deep links allow a user to click a URL in an email or SMS and be taken directly to a specific screen *inside* your app, bypassing the home screen. Without deep linking, sharing content from your app is impossible.

## Strategic Guidance

### Hackathon Mode
Ignore deep linking. It is completely unnecessary for a demo.

### Personal Project
Set up a basic URL scheme (e.g., `myapp://profile`). It's fun to type that into your phone's browser and watch your app magically open.

### Production SaaS
You must implement Universal Links (iOS) and App Links (Android). This means clicking `https://yourwebsite.com/post/123` will open the app directly to that post if it's installed, or fallback to the App Store (or web browser) if it isn't. This is critical for marketing attribution and viral sharing loops.

## AI Refinement Phase
\`\`\`prompt
Act as a Mobile Engineer. I am using [Insert Routing Library, e.g., Expo Router]. Explain the exact steps required to configure Universal Links (iOS) and App Links (Android) for my app. Provide the JSON structure for the `apple-app-site-association` (AASA) file I need to host on my website.
\`\`\`

## Accountability Check
- [ ] I understand how users will link directly to content inside my app.`,
  'mobilefilestorage': `# File Storage

**Estimated Time:** 30 min

---

## Why this matters
Mobile apps frequently need to upload photos (avatars, receipts) or videos. You cannot store these files in a PostgreSQL database; you must store them in a dedicated object storage bucket (like AWS S3) and save the URL in the database.

## Strategic Guidance

### Hackathon Mode
Use Cloudinary or Supabase Storage. They have simple SDKs that let you upload an image directly from the device in 3 lines of code.

### Personal Project
Supabase Storage is the easiest option if you are already using their database. 

### Production SaaS
You must not upload files directly from the mobile app to your backend API, as this will crash your servers when 100 people upload 4K video simultaneously. The mobile app must request a "Presigned URL" from your backend, and then upload the file *directly* from the phone to AWS S3 (or equivalent). Optimize images (compress them) natively on the device *before* uploading to save bandwidth.

## The Data We Need From You
**What types of files will users upload, and what storage provider will you use?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have selected an object storage provider and defined the upload flow.`,
  'mobileofflinestrategy': `# Offline Strategy

**Estimated Time:** 1-2 Hours

---

## Why this matters
Mobile devices lose connection on subways, in elevators, and in rural areas. If your app crashes or shows an endless spinner when the network drops, the UX is broken. A true mobile app works (or degrades gracefully) offline.

## Strategic Guidance

### Hackathon Mode
Assume the user has gigabit fiber internet. Do not build offline support.

### Personal Project
Just show a nice "You are offline" banner if the network request fails. Don't attempt to build an offline-first syncing database.

### Production SaaS
If your app is a utility (like a note-taking app), it MUST be offline-first. Use a local database (WatermelonDB, SQLite) as the source of truth for the UI. When the user writes a note offline, save it locally and queue a background task. When the network returns, sync the queue with the backend API. This requires complex conflict resolution (e.g., "What if the user edited the note on their iPad while their iPhone was offline?").

## The Data We Need From You
**Will your app be strictly "Online Only", "Offline Tolerant" (caches data), or "Offline First" (local database)?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have defined my application's offline capabilities.`,
  'mobileanalyticsstrategy': `# Analytics Strategy

**Estimated Time:** 30 min

---

## Why this matters
Apple and Google provide basic stats (downloads, crashes), but they don't tell you *how* users are using the app. You need an analytics strategy to track custom events (e.g., `user_completed_onboarding`) so you can identify where users get stuck.

## Strategic Guidance

### Hackathon Mode
Skip it.

### Personal Project
Install a simple, privacy-friendly tracker like PostHog. Track exactly two events: `app_opened` and `core_action_completed`.

### Production SaaS
You must implement rigorous event tracking. Use PostHog, Mixpanel, or Amplitude. Map out a "Tracking Plan" spreadsheet before writing code. You must track explicit events across the funnel (e.g., `signup_started`, `signup_completed`, `paywall_viewed`, `subscription_started`). Ensure you comply with Apple's App Tracking Transparency (ATT) framework if you are sharing this data with ad networks.

## The Data We Need From You
**What are the top 3 custom events you need to track to measure success?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] I have chosen an analytics provider and defined my core events.`,
  'mobilecostestimation': `# Cost Estimation

**Estimated Time:** 30 min

---

## Why this matters
Cloud computing makes it incredibly easy to accidentally spend $5,000 over a weekend if you write an infinite loop that hits a database or external API. Understanding your variable (usage-based) costs ensures your business model is actually profitable.

## Strategic Guidance

### Hackathon Mode
Zero dollars. Use free tiers exclusively (Firebase, Supabase, Vercel). The only thing you might pay for is a few pennies of OpenAI API usage.

### Personal Project
Also zero dollars, or at most $5/month for a cheap VPS (like DigitalOcean). The goal of a personal project is to cost as close to zero as possible so you can keep it running forever without thinking about the bill.

### Production SaaS
You must calculate your COGS (Cost of Goods Sold). If you charge a user $5/month, but it costs you $4/month in server, database, and map API costs to support them, your margins are terrible once you factor in the App Store's 30% cut. Estimate your costs at 1,000 users and 10,000 users. Set up billing alerts in AWS/GCP immediately so you get an email before you go bankrupt.

## The Data We Need From You
**What is the most expensive operational cost of running this app? (e.g., Database hosting, Map API calls, Video processing)**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I understand my primary cost drivers and have set up billing alerts.`,
  'scalability': `# Scalability

**Estimated Time:** 3-6 hours

---

## Overview
Going viral is the dream, until your database crashes, your users get 500 errors, and the opportunity is lost forever. Scalability isn't just about handling more traffic; it's about handling it elegantly without your costs exploding. A production-ready app must be architected to scale horizontally.

---

## Think First
**What breaks first if 10,000 users sign up in the next hour? (Usually the database).**
\`\`\`input
Type your answer here...
\`\`\`
**Are you serving static assets directly from your server instead of a CDN?**
\`\`\`input
Type your answer here...
\`\`\`
**Do you have unindexed database queries that will grind to a halt when the table hits 1 million rows?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Database Indexes:** The #1 cause of scaling failure. If you query SELECT * FROM users WHERE email = 'x', and the email column isn't indexed, the database scans every single row. With 10 users, it's instant. With 1 million users, it takes 5 seconds and crashes the server. Always index columns used in WHERE or JOIN clauses.
- **Connection Pooling:** Serverless functions scale infinitely (spinning up 1,000 instances instantly). If all 1,000 instances open a direct connection to your PostgreSQL database, the database will immediately run out of connections and crash. You MUST use a connection pooler (like Supavisor or PgBouncer).
- **Caching:** Never hit the database for data that rarely changes (like a list of supported countries). Cache it at the Edge using Redis or a CDN so the database doesn't even feel the traffic.

---

## Common Mistakes
- **Vertical Scaling Only:** Throwing money at the problem by just upgrading to a bigger database server. Eventually, you run out of bigger servers. You must optimize queries and cache data.
- **N+1 Query Problem:** Fetching a list of 100 posts, then making 100 separate API/Database calls to fetch the author for each post. Always use SQL JOINs to fetch everything in a single query.
- **Storing Large Blobs in DB:** Saving base64 images directly in PostgreSQL. It bloats the database size, kills memory, and ruins backup times. Use S3/Supabase Storage.

---

## Examples
- **The Viral Launch:** A TikTok video goes viral. 50,000 users download the app. Because the backend uses Supabase Edge Functions (auto-scaling) and Supavisor (connection pooling), the database handles the load smoothly, and the developer sleeps through the night.

---

## AI Prompt
\`\`\`prompt
I am preparing my Supabase backend and React Native app for a massive launch. Explain the concept of Database Connection Pooling and why it is critical for Serverless architectures. Provide an SQL snippet to add an index to a frequently queried 'username' column, and explain how to identify the 'N+1 query problem' in my API routes.
\`\`\`

---

## Validation Checklist
- [ ] Indexes are applied to all frequently queried database columns.
- [ ] A Connection Pooler is sitting in front of the PostgreSQL database.
- [ ] Static assets and heavy media are served via a global CDN.
- [ ] Serverless Edge Functions are utilized to handle sudden traffic spikes automatically.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** supabase/migrations/02_add_indexes.sql
**Purpose:** Prepares the database for high concurrency and massive data volume.
**Contents:** SQL commands adding performance indexes to critical tables.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
Your app is fully production-ready, secure, performant, and scalable! You are ready to move to **Phase 5: Store Deployment**.`,
  'playstoresetup': `# Play Store Setup

**Estimated Time:** 2-3 days (Verification)

---

## Overview
Setting up your Google Play Console developer account is the first step to publishing on Android. It costs a one-time fee of $25. Google now requires strict identity verification and, for personal accounts, a rigorous 20-tester closed beta process.

---

## Think First
**Do you have a D-U-N-S number if you are registering as a business?**
\`\`\`input
Type your answer here...
\`\`\`
**Are you aware of Google's new requirement for personal accounts to have 20 testers opt-in for 14 continuous days before you can publish to production?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Personal vs Organization Account:** Organization accounts do not have the 20-tester requirement but require a D-U-N-S number and legal entity documents. Personal accounts only require an ID but have strict testing requirements.
- **App Signing by Google Play:** Let Google manage your app signing key. This is highly recommended and required for Android App Bundles (AABs).

---

## Common Mistakes
- **Losing the Upload Key:** If you lose the keystore used to sign your app before uploading to Google, you cannot update your app. Keep it secure.
- **Mismatched Identity:** Ensuring your developer account name matches your legal ID exactly, otherwise verification will fail and delay your launch.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
I am setting up a Google Play Console account as a [Personal/Organization] developer. Create a step-by-step checklist of the exact documents I need for identity verification, the timeline for approval, and explain the App Signing process so I don't lose my keystore.
\`\`\`

---

## Validation Checklist
- [ ] Pay the $25 one-time registration fee.
- [ ] Complete Identity Verification via Google.
- [ ] Create the App property in the console.
- [ ] Opt-in to App Signing by Google Play.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** play_console_details.txt
**Purpose:** Securely tracking keystore passwords and developer IDs.
**Contents:** Developer Account ID, Keystore alias, and Keystore password (do NOT store the actual key file in plain text, use a secure vault).

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Once your Android account is pending verification, move on to setting up your Apple App Store account.`,
  'appstoresetup': `# App Store Setup

**Estimated Time:** 1-2 weeks (Verification)

---

## Overview
To publish to iOS devices, you must enroll in the Apple Developer Program ($99/year). It provides access to App Store Connect, where you manage your apps, TestFlight, and analytics. Apple's review process is notoriously strict regarding design and functionality.

---

## Think First
**Are you registering as an Individual or a Company? (Companies require a D-U-N-S number).**
\`\`\`input
Type your answer here...
\`\`\`
**Does your app rely heavily on third-party logins? (Apple requires 'Sign in with Apple' if you offer Google/Facebook login).**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **D-U-N-S Number:** If registering as a company, the company name will appear under the app on the App Store. If registering as an individual, your legal first and last name will be public.
- **Certificates & Profiles:** You must decide whether to manually manage Provisioning Profiles and Certificates or let Xcode/EAS automatically manage them (Highly recommended).

---

## Common Mistakes
- **Missing the D-U-N-S Number:** Not realizing that getting a D-U-N-S number from Dun & Bradstreet can take up to 14 days, delaying the entire launch.
- **Using 'Beta' or 'Test' in the App Name:** Apple will reject apps that look like unfinished betas. Never use the word 'beta' in your App Store title or screenshots.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
I am applying for the Apple Developer Program as a [Company/Individual]. Explain the exact process to generate a Certificate Signing Request (CSR), create an App ID, and set up a Provisioning Profile. Also, list the top 3 reasons Apple automatically rejects new app submissions.
\`\`\`

---

## Validation Checklist
- [ ] Enroll in the Apple Developer Program ($99/year).
- [ ] Request a D-U-N-S number (if Company).
- [ ] Set up App Store Connect.
- [ ] Register an App ID (Bundle Identifier, e.g., com.yourcompany.app).

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** app_store_identifiers.txt
**Purpose:** Tracking your Apple specific identifiers.
**Contents:** Team ID, Bundle Identifier, and Apple ID.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
With the accounts created, it's time to design the visual assets, starting with the App Icon.`,
  'appicons': `# App Icons

**Estimated Time:** 2-4 hours

---

## Overview
Your app icon is the first impression users have of your app. Both Apple and Google have strict design guidelines. An icon must look good at 1024x1024 pixels on a retina display, and still be legible at 16x16 pixels in a notification tray.

---

## Think First
**Does your icon rely on text? (Text usually scales terribly on small screens).**
\`\`\`input
Type your answer here...
\`\`\`
**Does your icon stand out against both pure black (dark mode) and pure white backgrounds?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **iOS vs Android:** iOS requires a square image with NO transparency (Apple applies the rounded corners automatically). Android requires an 'Adaptive Icon' (foreground and background layers) to accommodate different manufacturer shapes (circles, squiggles, rounded rectangles).
- **Simplicity vs Detail:** Choosing a minimalist, recognizable glyph over a highly detailed, complex illustration.

---

## Common Mistakes
- **Including Rounded Corners for iOS:** If you upload an icon with pre-rounded corners and transparent edges to App Store Connect, it will render with an ugly black background.
- **Ignoring the Android Safe Zone:** If your logo extends to the very edge of an Android Adaptive Icon, it will be chopped off on devices that use circular icon masks.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
I am designing an app icon for a [describe your app]. Act as a Senior Brand Designer. Suggest 3 distinct conceptual metaphors for the icon. Then, explain the technical requirements for an iOS App Icon (size, alpha channel) and an Android Adaptive Icon (foreground/background sizing).
\`\`\`

---

## Validation Checklist
- [ ] Create a 1024x1024 flat, opaque PNG for iOS.
- [ ] Create a 108x108 dp foreground and background layer for Android Adaptive Icons.
- [ ] Verify the icon is legible at very small sizes.
- [ ] Ensure no transparent pixels exist in the iOS icon.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** app_icon_specs.md
**Purpose:** Defines the exact hex colors and metaphor used for the icon.
**Contents:** Primary Hex colors, Icon metaphor description, and links to the exported PNGs.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Now that you have an icon, you need to show users what the app actually does using Screenshots.`,
  'screenshots': `# Screenshots

**Estimated Time:** 4-6 hours

---

## Overview
App Store and Play Store screenshots aren't just raw screen captures; they are your primary marketing billboard. High-converting apps use 'designed' screenshots—device frames wrapped in branded backgrounds with large, bold text calling out the main value proposition.

---

## Think First
**What are the top 3 'Aha!' moments in your app that you want users to see first?**
\`\`\`input
Type your answer here...
\`\`\`
**Are your text callouts large enough to read on a phone without zooming in?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Raw vs Designed:** Choosing between simply uploading direct device screenshots (raw) or designing marketing graphics that feature a phone frame, a solid background, and a text headline (designed).
- **Order of Screenshots:** The first two screenshots are critical because they appear in search results. The first image must instantly convey the app's primary value.

---

## Common Mistakes
- **Uploading Incorrect Sizes:** Apple is incredibly strict. You MUST provide screenshots for exactly 6.5-inch (iPhone Pro Max) and 5.5-inch (iPhone 8 Plus) displays.
- **Too Much Text:** Writing full paragraphs on the screenshots. Users scroll past in seconds; use 3-5 word punchy headlines.
- **Showing Login Screens First:** Never make your first screenshot a login or signup page. Show the core feature immediately.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
I need to design marketing screenshots for the App Store. My app is a [describe app]. Act as a Conversion Rate Optimization expert. Write the punchy, 3-5 word headlines for my first 5 screenshots that tell a cohesive story of why a user should download the app.
\`\`\`

---

## Validation Checklist
- [ ] Design exactly sized screens for iOS 6.5" (1284x2778).
- [ ] Design exactly sized screens for iOS 5.5" (1242x2208).
- [ ] Ensure the first two screenshots convey the primary value proposition.
- [ ] Use high-contrast text that is legible on small screens.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** screenshot_copy.md
**Purpose:** Outlines the headlines and visual focus for each screenshot.
**Contents:** Screenshot 1: [Headline] -> [Screen to show]. Screenshot 2: [Headline] -> [Screen to show].

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Android requires an additional promotional asset called the Feature Graphic.`,
  'featuregraphics': `# Feature Graphics

**Estimated Time:** 1-2 hours

---

## Overview
The Feature Graphic is an Android-specific promotional banner (1024x500 pixels). It sits at the top of your Google Play Store listing and is often used by Google for featuring apps in the 'Recommended' sections of the Play Store.

---

## Think First
**Does this graphic visually match your app icon and screenshots?**
\`\`\`input
Type your answer here...
\`\`\`
**Will this graphic look good if Google scales it down on a smaller device?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Branding focus vs UI focus:** Deciding whether the feature graphic should just be your logo on a nice background, or if it should show a device frame with your app's best feature.

---

## Common Mistakes
- **Putting text near the edges:** Google often crops the edges of the feature graphic depending on the device. All logos and text must be in the 'safe zone' in the center.
- **Overcrowding the graphic:** Treating it like a billboard. It should be a simple, striking image that conveys the mood of the app.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
I am creating a 1024x500 Feature Graphic for the Google Play Store for my app [describe app]. Suggest 3 different visual concepts for this graphic that will catch a user's eye while browsing the store. Include instructions on where to place the focal point to avoid edge-cropping.
\`\`\`

---

## Validation Checklist
- [ ] Create a 1024px by 500px JPEG or 24-bit PNG.
- [ ] Keep text and logos centered in the safe zone.
- [ ] Ensure it matches the visual identity of the App Icon.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** feature_graphic_concept.md
**Purpose:** A brief for the designer or yourself on what the graphic should portray.
**Contents:** Visual concept description, color palette, and focal point.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Visuals are done. Now you need to optimize your text for search algorithms via App Store SEO.`,
  'storelistingseo': `# Store Listing SEO (ASO)

**Estimated Time:** 2-3 hours

---

## Overview
App Store Optimization (ASO) is how your app gets discovered organically. If you rank #1 for a high-traffic keyword, you get free downloads forever. iOS and Android use completely different algorithms to index your app.

---

## Think First
**What exact phrases are your target users typing into the App Store search bar?**
\`\`\`input
Type your answer here...
\`\`\`
**Are your competitors dominating the obvious keywords, forcing you to target long-tail, niche keywords?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **App Title Strategy:** Your App Name has the highest SEO weight. Decide whether to use just your brand name (e.g., 'Kontxt') or append keywords (e.g., 'Kontxt - Habit Tracker & Goals').
- **iOS Keyword Field:** Apple gives you a hidden 100-character keyword field. You must decide the absolute most critical words to include here, separated by commas, with no spaces.

---

## Common Mistakes
- **Repeating Keywords on iOS:** Apple's algorithm does not stack keywords. If 'Tracker' is in your title, do not waste space putting 'Tracker' in your subtitle or hidden keyword field.
- **Ignoring the Long Description on Android:** Unlike Apple, Google reads your entire long description to find keywords. Failing to naturally weave keywords into the Android description will tank your search ranking.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
I am launching an app that [describe app functionality]. Act as an App Store Optimization (ASO) expert. Generate a list of 10 high-traffic, low-competition keywords. Then, draft a 30-character App Title, a 30-character Subtitle, and the 100-character hidden keyword string for Apple. Make sure NO words are repeated across the Title, Subtitle, and Keyword string.
\`\`\`

---

## Validation Checklist
- [ ] Draft an App Title with a strong keyword (max 30 chars).
- [ ] Draft a Subtitle with secondary keywords (max 30 chars).
- [ ] Generate a 100-character hidden keyword list for iOS (comma separated, no spaces).
- [ ] Write a 4,000-character description for Android with natural keyword density.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** aso_metadata.md
**Purpose:** The final text you will copy-paste into the App Store and Play Store.
**Contents:** Title, Subtitle, Short Description (Android), Long Description, and iOS Keywords.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
You cannot submit an app without a valid Privacy Policy URL.`,
  'privacypolicy': `# Privacy Policy

**Estimated Time:** 30 min

---

## Why this matters
A Privacy Policy is legally required in almost every country if your software collects any personal data (including just an email address for a newsletter). Failing to have one violates the terms of service of Stripe, Google Analytics, and the Apple App Store, and can result in massive GDPR fines.

## Strategic Guidance

### Hackathon Mode
Generate a boilerplate policy online (search "Free Privacy Policy Generator"), copy the text, and put a link in your footer. Do not spend time reading it. Just check the box so you don't get rejected if the hackathon has strict submission rules.

### Personal Project
If your project is open source and hosted on Vercel for free, you still need a basic policy if you have user accounts. Just clearly state "I am one person building a hobby project. I will not sell your data." Keep it plain English.

### Production SaaS
You must have a comprehensive, legally binding Privacy Policy. It must explicitly detail what data you collect, how you store it, who you share it with (e.g., Stripe, AWS), and how users can request their data be deleted (Right to be Forgotten). If you are targeting EU or California customers, you must explicitly comply with GDPR and CCPA. Strongly consider using a paid legal generator like Termly or Iubenda.

## The Data We Need From You
**What third-party services (like Stripe or Google Analytics) will process your users' data?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Generation Phase
\`\`\`prompt
Act as a Privacy Lawyer. I am launching a SaaS product called [Insert Name]. It does [Insert Function]. I collect user emails and passwords via [Auth Provider] and process payments via [Payment Provider]. Please draft a standard, plain-English Privacy Policy covering data collection, third-party sharing, and user deletion rights.
\`\`\`

## Accountability Check
- [ ] I have generated and published a Privacy Policy.`,
  'termsofservice': `# Terms of Service

**Estimated Time:** 30 min

---

## Why this matters
The Terms of Service (ToS) is the contract between you and your users. It protects you from liability if your software crashes and costs a user money, or if a user uploads illegal content to your platform. Without a ToS, you can be personally sued for the actions of your users.

## Strategic Guidance

### Hackathon Mode
Same as the Privacy Policy. Generate a free boilerplate one, link it in the footer, and forget about it.

### Personal Project
Include a "Limitation of Liability" clause. You are providing a free tool; you must legally state that you are not responsible if the tool breaks and deletes someone's files. An "As-Is" open-source license (like MIT) usually covers this, but a dedicated ToS page is safer.

### Production SaaS
You must have a rigorous ToS. It must cover your refund policy, acceptable use (banning spam or illegal content), intellectual property rights (who owns the data generated by the AI?), and a mandatory arbitration clause to prevent class-action lawsuits. You should eventually have a real lawyer review this.

## The Data We Need From You
**Will users be uploading user-generated content (text, images, files) to your platform?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Generation Phase
\`\`\`prompt
Act as a Corporate Lawyer. I am launching a SaaS product called [Insert Name]. Please draft a comprehensive Terms of Service. It must include a strong 'Limitation of Liability' clause stating the software is provided 'as is', and an 'Acceptable Use' policy that allows me to immediately ban users who abuse the system.
\`\`\`

## Accountability Check
- [ ] I have generated and published a Terms of Service agreement.`,
  'betatesting': `# Beta Testing

**Estimated Time:** 1-2 Weeks

---

## Why this matters
If you launch to the public immediately, the massive influx of users will uncover 50 bugs at once, leading to terrible reviews and a blown launch. Beta testing allows you to find those bugs with a small, forgiving group of early adopters before the general public sees your product.

## Strategic Guidance

### Hackathon Mode
Beta testing is handing your laptop to the person sitting next to you 2 hours before the deadline. Watch them try to use it. Fix whatever button they complain about.

### Personal Project
Post your app in a niche Discord or Subreddit with the title "I built a free tool to do X. Looking for feedback!" Personal project beta testers are usually very friendly and will point out obvious UX flaws you missed.

### Production SaaS
You need a structured Private Beta. Invite 10-50 high-intent users from your waitlist. Give them a white-glove onboarding experience over a Zoom call. Do not just ask "Do you like it?" Ask them to complete a specific task while sharing their screen, and watch where they struggle. You must fix critical bugs found in Beta before your public Launch Day.

## The Data We Need From You
**Where will you find your first 10 beta testers?**
\`\`\`input
Type your answer here...
\`\`\`

## AI Strategy Phase
\`\`\`prompt
Act as a User Research Expert. I am launching a private beta for my app [Insert App]. Write a short, highly-personalized email template I can send to 20 people on my waitlist inviting them to the beta. The email must explicitly ask them to jump on a 15-minute onboarding call with me.
\`\`\`

## Accountability Check
- [ ] I have recruited a small group of beta testers and watched them use the app.`,
  'playstoreresearch': `# Play Store Research

**Estimated Time:** 1 Hour

---

## Why this matters
The Google Play Store is a distinct ecosystem from the iOS App Store. Android users often have different expectations, and the Play Store's search algorithm heavily favors keyword density in the app description. 

## Strategic Guidance

### Hackathon Mode
Skip it. You will likely just build a web app or an Expo snack anyway.

### Personal Project
If you plan to release on Android, see what exists. Notice how many apps are free with ads vs paid.

### Production SaaS
You must research App Store Optimization (ASO) for Google Play. Read the reviews of top apps in your category. The Play Store allows you to run A/B tests on your app icon and screenshots natively—plan to utilize this. Notice that Android users are historically less likely to pay for subscriptions than iOS users, which may impact your monetization strategy.

## The Data We Need From You
**What are the top 3 ranking apps for your primary keyword on the Google Play Store?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] I understand the landscape of my category on the Play Store.`,
  'mobilesecurity': `# Security & Privacy

**Estimated Time:** 2 Hours

---

## Why this matters
Mobile devices are frequently stolen, lost, or connected to malicious public Wi-Fi networks. If you store sensitive user data insecurely, it will be compromised. Apple and Google strictly enforce privacy policies during app review.

## Strategic Guidance

### Hackathon Mode
Ignore it. Use dummy data. Don't collect real passwords.

### Personal Project
Ensure all API calls use HTTPS. Do not hardcode API keys (like your Supabase or Firebase keys) in plain text if they grant admin access; only use client-safe public keys.

### Production SaaS
You must encrypt sensitive data (Auth tokens, PII) in the device's Keychain/Keystore. Implement certificate pinning if you are handling financial data to prevent Man-In-The-Middle (MITM) attacks. Obfuscate your compiled code (using ProGuard on Android) so attackers cannot easily reverse-engineer your app. Never log user passwords or credit card numbers to your crash reporting tools.

## The Data We Need From You
**What sensitive data are you storing locally, and how is it encrypted?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have audited my app for secure storage and network vulnerabilities.`,
  'mobileperformanceoptimization': `# Performance Optimization

**Estimated Time:** 3 Hours

---

## Why this matters
A slow app feels broken. If scrolling through a list of items is janky and drops frames, users will associate your brand with low quality. Performance optimization ensures smooth 60fps (or 120fps) rendering.

## Strategic Guidance

### Hackathon Mode
Don't worry about it. Just render the data. The demo will be fast enough on a modern phone.

### Personal Project
Learn to use `FlatList` (or equivalent virtualization) for long lists. Never map over 1,000 array items into standard Views, or the phone will freeze.

### Production SaaS
You must profile your app using native tools (Xcode Instruments, Android Studio Profiler). Identify memory leaks. Optimize your React renders using `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders. Use fast image loading libraries (like `expo-image` or `react-native-fast-image`) to heavily cache network images. Keep your JavaScript bundle size small to improve app startup time (TTI).

## AI Refinement Phase
\`\`\`prompt
Act as a Performance Engineer. I have a screen with a list of 500 items, each containing an image and text. It is scrolling very slowly. Provide a checklist of the 5 most effective ways to optimize list rendering performance in [Insert Framework].
\`\`\`

## Accountability Check
- [ ] My app scrolls smoothly at 60fps even with long lists of data.`,
  'mobilecrashreporting': `# Crash Reporting

**Estimated Time:** 1 Hour

---

## Why this matters
When your app crashes on a user's phone in the real world, you will not know about it unless you have crash reporting installed. Users rarely email you to say "It crashed"; they just leave a 1-star review and uninstall.

## Strategic Guidance

### Hackathon Mode
Skip it entirely.

### Personal Project
Skip it. You can just look at the error logs on your own simulator.

### Production SaaS
You must integrate a crash reporting tool like Sentry or Crashlytics immediately. Configure source maps so that when a crash occurs in production, the tool can point you to the exact line of TypeScript code that failed, rather than showing you useless minified JavaScript. Set up alerts so your engineering team gets a Slack message if the crash rate spikes above 1%.

## The Data We Need From You
**What crash reporting tool will you integrate before launching to the App Store?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have a system in place to automatically capture and alert me of crashes.`,
  'mobilemonitoring': `# Monitoring & Observability

**Estimated Time:** 1 Hour

---

## Why this matters
Crash reporting tells you when the app completely dies. Monitoring tells you when the app is just acting weird. Are API calls taking 5 seconds instead of 200ms? Are 30% of signups failing silently without crashing? You need observability to see this.

## Strategic Guidance

### Hackathon Mode
Skip it.

### Personal Project
Skip it.

### Production SaaS
Implement APM (Application Performance Monitoring) using tools like Datadog, Sentry APM, or New Relic. Track the duration of critical network requests from the mobile client's perspective (not just the server's perspective). Monitor the success rate of key flows (like payments). If the payment success rate drops by 20%, you need an alarm to go off immediately.

## The Data We Need From You
**What are the 2 most critical flows you need to actively monitor for performance degradation?**
\`\`\`input
1. 
2. 
\`\`\`

## Accountability Check
- [ ] I am tracking the performance and success rates of my critical API calls.`,
  'mobilelogging': `# Structured Logging

**Estimated Time:** 30 min

---

## Why this matters
`console.log("here 1")` is not a logging strategy. When trying to debug why a specific user's app is behaving strangely, you need structured logs (JSON format) that you can search and filter in a centralized dashboard.

## Strategic Guidance

### Hackathon Mode
Use `console.log` heavily. It's all you need for a 24-hour sprint.

### Personal Project
Use a lightweight logger that formats your logs nicely in the terminal during development.

### Production SaaS
Do not leave `console.log` statements in your production bundle; they degrade performance. Use a logging library (like `roarr` or a custom wrapper) that strips logs in production or securely sends "Warning" and "Error" level logs to your backend or a service like Datadog. Ensure you NEVER log passwords, auth tokens, or PII.

## Accountability Check
- [ ] I have a logging strategy that aids debugging without leaking sensitive data.`,
  'mobileratelimiting': `# Rate Limiting

**Estimated Time:** 30 min

---

## Why this matters
If a malicious user (or a bug in your own mobile app) spams your backend API with 10,000 requests per second, your server will crash or you will receive a massive cloud billing invoice. Rate limiting protects your infrastructure.

## Strategic Guidance

### Hackathon Mode
Ignore it. Your API won't receive enough traffic to matter.

### Personal Project
Ignore it unless you are exposing a public API URL. If using Supabase/Firebase, they handle basic rate limiting for you.

### Production SaaS
You must implement rate limiting on your backend API, especially on Auth endpoints (Login, Password Reset) to prevent brute-force attacks. Return a `429 Too Many Requests` HTTP status code. Crucially, your mobile app must anticipate this 429 error and show a polite message to the user ("You're doing that too fast, please wait a minute") instead of crashing.

## Accountability Check
- [ ] My backend API is protected from spam and my mobile app handles 429 errors gracefully.`,
  'mobilebackups': `# Database Backups

**Estimated Time:** 30 min

---

## Why this matters
Hardware fails. Databases get corrupted. Most commonly, a tired developer accidentally runs a `DROP TABLE` or an `UPDATE` without a `WHERE` clause in production. If you don't have backups, your startup is dead instantly.

## Strategic Guidance

### Hackathon Mode
No backups needed. The data is disposable.

### Personal Project
If using a managed service like Supabase or Firebase, automated daily backups are usually included in the free or low-tier plans. Turn them on.

### Production SaaS
You must have Point-in-Time Recovery (PITR) enabled on your production database. This allows you to restore the database to any specific minute in the last 7 days. You must also regularly *test* restoring a backup to a staging environment; a backup is useless if the restoration process is broken.

## Accountability Check
- [ ] I have verified that automated backups are running and restorable.`,
  'mobilecicd': `# CI/CD for Mobile

**Estimated Time:** 2-4 Hours

---

## Why this matters
Building a mobile app requires compiling Swift/Kotlin code, managing signing certificates, and uploading massive binary files to the App Store. Doing this manually on your laptop takes 45 minutes and is highly prone to human error. CI/CD automates this entire process.

## Strategic Guidance

### Hackathon Mode
Skip it. Just build locally and use a simulator for the demo.

### Personal Project
Use Expo EAS (Expo Application Services) Build. It handles the nightmare of iOS certificates and Android Keystores for you in the cloud.

### Production SaaS
You must automate your deployments. Set up a CI/CD pipeline (using GitHub Actions, Bitrise, or EAS). When you merge code to the `main` branch, the pipeline should automatically run all tests. If they pass, it should build the iOS (`.ipa`) and Android (`.aab`) binaries and automatically upload them to TestFlight and Google Play Console for beta testing. No developer should ever deploy from their local machine.

## The Data We Need From You
**What CI/CD platform will you use to automate your app builds?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] My build and deployment process is fully automated.`,
  'mobileinfrastructure': `# Infrastructure Architecture

**Estimated Time:** 1 Hour

---

## Why this matters
Your mobile app is only the tip of the iceberg. The infrastructure (servers, databases, CDNs, load balancers) determines how scalable, reliable, and fast your app will be globally.

## Strategic Guidance

### Hackathon Mode
Host everything on Vercel/Render and Supabase/Firebase. You need zero infrastructure management.

### Personal Project
Stick to managed Platform-as-a-Service (PaaS) providers. Do not set up raw AWS EC2 instances; configuring Linux servers is a distraction from building your app.

### Production SaaS
Use Infrastructure as Code (IaC) like Terraform or Pulumi to define your cloud resources. This ensures your staging and production environments are identical. Use a Content Delivery Network (CDN) like Cloudflare or AWS CloudFront to cache images and static assets globally so users in Europe don't have to wait for data to travel from a server in California.

## Accountability Check
- [ ] My backend infrastructure is scalable and globally accessible.`,
  'mobileappsizeoptimization': `# App Size Optimization

**Estimated Time:** 1 Hour

---

## Why this matters
If your app size is over 150MB, iOS will prompt users to wait for Wi-Fi before downloading it over cellular data. Most users will just cancel the download. Large app sizes directly reduce your acquisition conversion rate.

## Strategic Guidance

### Hackathon Mode
Ignore it. A 300MB app is fine for a demo.

### Personal Project
Don't include massive raw video files or uncompressed 4K images in your app bundle.

### Production SaaS
You must relentlessly optimize your bundle size. Compress all local image assets using WebP or SVG format. Remove unused third-party libraries (e.g., don't import the entire `lodash` library if you only need one function). Use Hermes engine (if using React Native) to pre-compile JavaScript and reduce the binary size. Monitor your `.ipa` and `.aab` sizes on every build.

## AI Refinement Phase
\`\`\`prompt
Act as a Mobile Build Engineer. I am using [Insert Tech Stack]. My compiled app binary is currently 150MB, which is too large. Provide a checklist of the top 5 techniques to analyze and drastically reduce the final binary size in this specific framework.
\`\`\`

## Accountability Check
- [ ] I have analyzed my bundle size and removed unnecessary assets.`,
  'mobilebatteryoptimization': `# Battery Optimization

**Estimated Time:** 1 Hour

---

## Why this matters
If a user notices that your app is draining 20% of their battery in an hour, they will force-quit it and likely uninstall it. Battery drain is usually caused by excessive network requests, continuous GPS tracking, or infinite rendering loops.

## Strategic Guidance

### Hackathon Mode
Ignore it.

### Personal Project
Just make sure you aren't leaving timers (`setInterval`) running indefinitely.

### Production SaaS
You must profile battery usage. If you need location tracking, do not request high-accuracy GPS updates every second unless you are building a driving navigation app; use "significant location changes" instead. Batch your network requests. Stop all heavy animations and polling when the app goes into the background state.

## Accountability Check
- [ ] I ensure my app does not unnecessarily drain the user's battery.`,
  'mobilescalability': `# Scalability Strategy

**Estimated Time:** 1 Hour

---

## Why this matters
If your app goes viral and gets 100,000 downloads in a day, will your servers crash? Scalability is the ability of your system to handle massive spikes in traffic without degrading performance.

## Strategic Guidance

### Hackathon Mode
Irrelevant. You have 3 users (the judges).

### Personal Project
Irrelevant. You have 1 user (you).

### Production SaaS
Vertical scaling (buying a bigger server) will only get you so far. You must design for Horizontal scaling (adding more servers). Ensure your backend APIs are stateless so any server can handle any request. Implement database connection pooling (like PgBouncer). Heavily cache read-heavy API endpoints using Redis so the database isn't hit for every single request.

## Accountability Check
- [ ] My backend architecture is capable of horizontal scaling.`,
  'mobileplaystoresetup': `# Play Store Setup

**Estimated Time:** 2 Hours

---

## Why this matters
Setting up the Google Play Console requires verifying your identity, setting up payment profiles, and configuring the app listing. It is a bureaucratic process that can delay your launch by weeks if you make a mistake.

## Strategic Guidance

### Hackathon Mode
Skip it.

### Personal Project
Only do this if you really want to share the app with friends who use Android. It costs a one-time fee of $25 to open a developer account.

### Production SaaS
Create a Google Play Developer account under your *Company* name, not your personal name. You must fill out the Data Safety form accurately, detailing exactly what user data you collect and why. If you lie on this form, Google will suspend your app. Generate the Android App Bundle (`.aab`) and upload it to the Internal Testing track first to verify it installs correctly.

## Accountability Check
- [ ] I have created a Google Play Developer account and completed the Data Safety form.`,
  'mobileappstoresetup': `# App Store Setup

**Estimated Time:** 2 Hours

---

## Why this matters
The Apple App Store Connect portal is complex. You must configure certificates, provisioning profiles, and App ID identifiers before you can even upload a build. Apple's review process is notoriously strict and can reject your app for minor infractions.

## Strategic Guidance

### Hackathon Mode
Skip it entirely.

### Personal Project
It costs $99/year to have an Apple Developer account. If you just want it on your own phone, you don't need a paid account (you can sideload it via Xcode for 7 days at a time).

### Production SaaS
You must enroll in the Apple Developer Program as an Organization (requires a D-U-N-S number, which can take weeks to get). Fill out the App Privacy questionnaire honestly. If your app requires users to create an account, you MUST provide a "Delete Account" button inside the app, or Apple will reject it. Provide a demo account (username/password) in the App Review Information section so the Apple reviewer can actually test the app.

## Accountability Check
- [ ] I have registered my Apple Developer account and prepared my App Store Connect listing.`,
  'mobileappicons': `# App Icons

**Estimated Time:** 1 Hour

---

## Why this matters
The App Icon is the first (and often only) thing a user sees when browsing the App Store. A cheap, generic icon drastically reduces your click-through rate, making your marketing spend much more expensive.

## Strategic Guidance

### Hackathon Mode
Generate one using an AI image generator or find a free icon. It doesn't matter.

### Personal Project
Keep it simple. A solid background color with a white glyph in the center usually looks great.

### Production SaaS
Do not put words in your app icon; it's unreadable on a phone screen. Do not use a transparent background (Apple explicitly forbids it; it will just render as black). Ensure your icon stands out against both Light Mode and Dark Mode wallpapers. You must provide the icon in multiple sizes (1024x1024 for the App Store, and smaller sizes for the device home screen and notifications).

## The Data We Need From You
**What are the primary visual elements of your App Icon?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have designed a high-quality App Icon that follows Apple and Google guidelines.`,
  'mobilescreenshots': `# App Store Screenshots

**Estimated Time:** 2 Hours

---

## Why this matters
Users do not read the text description of your app. They look at the screenshots. If the screenshots don't immediately communicate the value of the app within 3 seconds, they will swipe away.

## Strategic Guidance

### Hackathon Mode
Just take 3 raw screenshots of the simulator running the app and use those in your slide deck.

### Personal Project
Use a free tool like Shots.so or AppMockUp.com to put your raw screenshots inside a nice device frame (like an iPhone 15 frame) with a title above it.

### Production SaaS
Screenshots are marketing banners. The first two screenshots are the most important because they show up in the search results. Put your core Value Proposition in massive text on the first screenshot. Highlight specific UI elements (like a "Save $100" button). You must provide screenshots for both 6.5" (iPhone Pro Max) and 5.5" screens to Apple.

## AI Refinement Phase
\`\`\`prompt
Act as an App Store Optimization (ASO) Expert. I need to create 5 screenshots for my mobile app: [Insert App Description]. Suggest the headline text and the visual focus for each of the 5 screenshots to maximize conversion rate.
\`\`\`

## Accountability Check
- [ ] I have designed high-converting, annotated App Store screenshots.`,
  'mobilefeaturegraphics': `# Feature Graphics

**Estimated Time:** 1 Hour

---

## Why this matters
The Google Play Store requires a 1024x500 "Feature Graphic." This banner sits at the very top of your app listing and is often the first thing Android users see, especially if your app is featured by Google.

## Strategic Guidance

### Hackathon Mode
Skip it.

### Personal Project
Just resize one of your screenshots or use your app's logo on a colored background.

### Production SaaS
Treat the Feature Graphic like a billboard. Do not put critical text near the edges, as the Play Store UI sometimes crops it depending on the device. Make it visually striking and representative of the app's core brand. If you have an explainer video, the Feature Graphic acts as the thumbnail for that video.

## Accountability Check
- [ ] I have created a compelling Feature Graphic for the Google Play Store.`,
  'mobilestorelistingseo': `# Store Listing SEO (ASO)

**Estimated Time:** 2 Hours

---

## Why this matters
App Store Optimization (ASO) is the SEO of the mobile world. If your app is named "Krypton", no one searching for "Habit Tracker" will find it. You must optimize your title, subtitle, and keywords to rank organically.

## Strategic Guidance

### Hackathon Mode
Irrelevant.

### Personal Project
Just name the app exactly what it does (e.g., "Simple Gym Tracker").

### Production SaaS
The App Title carries the most weight for search ranking. Use the format `[Brand Name] - [Core Keyword]` (e.g., "Krypton - Daily Habit Tracker"). In the Apple App Store, the invisible "Keywords" field is critical; use comma-separated keywords without spaces (`habit,tracker,daily,routine`). On Google Play, the keywords must be woven naturally into the long description.

## The Data We Need From You
**What are the top 5 keywords you want your app to rank for?**
\`\`\`input
1. 
2. 
3. 
4. 
5. 
\`\`\`

## AI Execution Phase
\`\`\`prompt
Act as an App Store Optimization Expert. My app is a [Insert Category]. My target keywords are [Insert Keywords]. Generate an optimized App Title (max 30 chars), Subtitle (max 30 chars), and a comma-separated list of backend keywords (max 100 chars total, no spaces after commas) for the Apple App Store.
\`\`\`

## Accountability Check
- [ ] My App Store listing is optimized for search discovery.`,
  'mobileprivacypolicy': `# Privacy Policy

**Estimated Time:** 1 Hour

---

## Why this matters
Both Apple and Google strictly require a Privacy Policy URL to be linked in your app store listing. If you do not have one, your app will be rejected. This document legally explains what data you collect and what you do with it.

## Strategic Guidance

### Hackathon Mode
Skip it.

### Personal Project
Use a free online generator (like Termly or Iubenda). Host the text on a simple free Notion page and paste the link in the App Store.

### Production SaaS
You must take this seriously, especially if you collect emails, locations, or health data (GDPR / CCPA compliance). If you use third-party tools like Google Analytics or RevenueCat, you must disclose that they also process user data. Host the policy on your official company website domain.

## Accountability Check
- [ ] I have generated and hosted a compliant Privacy Policy.`,
  'mobiletermsofservice': `# Terms of Service (EULA)

**Estimated Time:** 1 Hour

---

## Why this matters
The Terms of Service (or End User License Agreement - EULA) protects you legally. It states that users cannot abuse your API, reverse-engineer your app, or sue you if the app crashes and deletes their unsaved work.

## Strategic Guidance

### Hackathon Mode
Skip it.

### Personal Project
Skip it, unless you allow users to post public content (User Generated Content - UGC), in which case Apple requires you to have terms stating you will moderate bad behavior.

### Production SaaS
If your app allows User Generated Content (like a social feed), Apple strictly requires an EULA, a "Report User" button, and a "Block User" feature. If you do not have these three things, your app will be rejected instantly. If you offer subscriptions, your EULA must explicitly state the billing terms.

## Accountability Check
- [ ] I have generated Terms of Service that protect my business liability.`,
  'mobilecontentrating': `# Content Rating

**Estimated Time:** 15 min

---

## Why this matters
You must fill out a questionnaire detailing if your app contains violence, profanity, or gambling. This determines the age rating (e.g., 4+, 12+, 17+) on the App Store.

## Strategic Guidance

### Hackathon Mode
Skip it.

### Personal Project
Just answer the questions honestly in the console.

### Production SaaS
Be completely truthful. If you declare your app is 4+ but it contains unmoderated social feeds where users can post explicit content, Apple will pull your app from the store. If your app offers medical advice or crypto trading, expect heavy scrutiny and long review times.

## Accountability Check
- [ ] I have accurately completed the Content Rating questionnaire.`,
  'mobiletesttracks': `# Test Tracks (Beta Distribution)

**Estimated Time:** 1 Hour

---

## Why this matters
You should never release V1 directly to the public. You need to distribute the app to internal testers and early beta users to catch the crashes that only happen on physical devices, not simulators.

## Strategic Guidance

### Hackathon Mode
Skip it.

### Personal Project
Use Expo Go (if using Expo) to share the app via a QR code with your friends.

### Production SaaS
Use Apple TestFlight for iOS and Google Play Console Internal Testing for Android. You must upload your compiled binary to these platforms. TestFlight requires a brief Apple review before you can invite external users via a public link. This is the safest way to validate that your production API keys, push notifications, and In-App Purchases actually work in a live environment.

## Accountability Check
- [ ] I have successfully distributed a beta build to a physical device.`,
  'mobilebetatesting': `# Beta Testing & QA

**Estimated Time:** Days/Weeks

---

## Why this matters
Developers are blind to their own bugs. You know exactly what buttons to click, so you never encounter the error states. Real users will click things in the wrong order, deny permissions, and lose network connection. Beta testing exposes this.

## Strategic Guidance

### Hackathon Mode
Hand your phone to the person sitting next to you for 60 seconds before the demo.

### Personal Project
Test the app on your own physical phone for 3 days before launching it.

### Production SaaS
Invite 10-50 users to TestFlight. Ask them to complete the core user journey. Do not help them. Watch where they get confused. Monitor your crash reporting dashboard (Sentry/Crashlytics) religiously during this phase. Do not launch to the public App Store until the beta crash rate is zero.

## Accountability Check
- [ ] I have gathered feedback and fixed bugs identified by beta testers.`,
  'mobilereleasechecklist': `# Release Checklist

**Estimated Time:** 1 Hour

---

## Why this matters
Launching an app is stressful. A checklist ensures you don't accidentally ship the app pointing to the `localhost` staging database instead of the production database (which happens more often than you think).

## Strategic Guidance

### Hackathon Mode
Checklist: Does it crash? No? You're good.

### Personal Project
Checklist: Are all API keys set to production? Is the app name correct? Submit for review.

### Production SaaS
Create a rigorous pre-flight checklist. Verify: Environment variables are set to PROD. Billing is pointing to Stripe/RevenueCat Live Mode (not Sandbox). Sentry/Crashlytics is active. Privacy Policy is linked. Support email is functional. Once checked, hit "Submit for Review". Note that Apple review can take 24-48 hours, so do not plan a massive PR launch campaign for the exact day you hit submit.

## AI Execution Phase
\`\`\`prompt
Act as a QA Manager. Create a comprehensive, 10-point Pre-Launch Checklist for a mobile app deployment. Cover Environment Variables, Analytics, Payment Sandboxes, and App Store Metadata.
\`\`\`

## Accountability Check
- [ ] I have completed the final release checklist and submitted the app for review.`,
  'mobilepitchdeck': `# Pitch Deck

**Estimated Time:** 2-4 Hours

---

## Why this matters
A pitch deck is the visual narrative of your business. Whether you are pitching to hackathon judges or Silicon Valley venture capitalists, the structure is largely the same: Hook, Problem, Solution, Traction, Market, Team, Ask.

## Strategic Guidance

### Hackathon Mode
Keep it under 10 slides. Spend the majority of your time on the "Problem" and the "Demo". The judges only care about what you actually built.

### Personal Project
Irrelevant.

### Production SaaS
Your deck must be flawless. Use massive fonts; no one wants to read a wall of text on a slide. Your "Traction" slide is the most important; if you have revenue or high daily active users, put it front and center. Keep the deck under 15 slides. The goal of a pitch deck is not to secure a check; the goal is simply to secure the *next meeting*.

## The Data We Need From You
**What is the single most impressive metric or fact you can put on your "Traction" slide?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have a compelling, highly visual pitch deck.`,
  'mobiledemoscript': `# Demo Script

**Estimated Time:** 1 Hour

---

## Why this matters
Live demos fail. The Wi-Fi drops, the API crashes, or you forget what button to click. A script ensures you hit your talking points and transition smoothly through the "Happy Path."

## Strategic Guidance

### Hackathon Mode
Write down exactly what you will say and exactly what you will click. Time yourself. If the limit is 3 minutes, your script should take 2 minutes and 30 seconds to allow for pauses and nervous stuttering.

### Personal Project
If you are recording a Loom video for Twitter, write a quick outline so you don't ramble.

### Production SaaS
Never do a "live" demo of a risky, complex feature to an investor if you can avoid it. Record a high-quality video of the "Happy Path" and narrate over it. If you must demo live, have a pre-recorded backup video ready to play the second the app crashes.

## Accountability Check
- [ ] I have a timed, rehearsed script for demonstrating my app.`,
  'mobilesubmissionchecklist': `# Submission Checklist

**Estimated Time:** 30 min

---

## Why this matters
In a rush to submit, it is incredibly easy to forget a critical requirement (like linking the GitHub repo or filling out the team member names).

## Strategic Guidance

### Hackathon Mode
Verify: Is the video uploaded? Is the GitHub repo public? Is the description filled out? Are all team members added? Submit it 30 minutes before the deadline; the submission portal *will* crash in the last 5 minutes due to traffic.

### Personal Project
Irrelevant.

### Production SaaS
Irrelevant (Use the App Store Release Checklist instead).

## Accountability Check
- [ ] I have verified all requirements and submitted my project.`,
  'mobileanalytics': `# Analytics Review

**Estimated Time:** Ongoing

---

## Why this matters
Once the app is live, you must look at the data. If 1,000 people download the app but only 10 people create an account, your onboarding flow is broken. Analytics tell you *where* the leak is.

## Strategic Guidance

### Hackathon Mode
Irrelevant.

### Personal Project
Check your dashboard occasionally to see if anyone is actually using it.

### Production SaaS
Review your analytics dashboard daily. Build a "Funnel Report" (e.g., App Open -> Sign Up Clicked -> Sign Up Completed -> Paywall Viewed -> Purchase). Identify the step with the biggest drop-off percentage and dedicate your next engineering sprint entirely to fixing that specific screen.

## The Data We Need From You
**What is the current conversion rate from 'App Download' to 'Core Action Completed'?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I actively review my analytics to identify bottlenecks in the user journey.`,
  'mobilenotificationsstrategy': `# Notifications Strategy

**Estimated Time:** Ongoing

---

## Why this matters
Push notifications are a double-edged sword. Used correctly, they double your DAU. Used incorrectly, users will revoke notification permissions or uninstall the app completely.

## Strategic Guidance

### Hackathon Mode
Irrelevant.

### Personal Project
Only send notifications for things that are highly urgent and directly requested by the user.

### Production SaaS
Notifications must be Timely, Personal, and Actionable. Never send generic "Come back and see what's new!" blasts. Send "Your Uber driver is 2 minutes away." Implement "Quiet Hours" logic on your backend so you don't wake up users in Europe with a notification triggered by an event in California.

## Accountability Check
- [ ] My push notifications provide immediate value without annoying the user.`,
  'mobileuserfeedback': `# User Feedback Loop

**Estimated Time:** Ongoing

---

## Why this matters
Analytics tell you *what* users are doing; feedback tells you *why* they are doing it. If you build features in a vacuum without talking to users, you will build the wrong things.

## Strategic Guidance

### Hackathon Mode
The judges' Q&A session is your feedback loop.

### Personal Project
Put a Twitter link or an email address in the app settings so people can reach you.

### Production SaaS
Implement an easy way to provide feedback directly inside the app (e.g., a "Send Feedback" button that opens a pre-filled email or an in-app form). When users cancel their subscription, you MUST ask them why (Too expensive? Missing feature? Buggy?). Read every single piece of feedback.

## The Data We Need From You
**How can a user inside your app easily contact you right now?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have a frictionless channel for users to report bugs or request features.`,
  'mobilereviewsratings': `# App Store Reviews & Ratings

**Estimated Time:** Ongoing

---

## Why this matters
Apps with a 3-star rating do not get downloaded. The App Store algorithm heavily favors apps with a high volume of 5-star reviews. You must actively engineer ways to get happy users to leave a review.

## Strategic Guidance

### Hackathon Mode
Irrelevant.

### Personal Project
Ask your friends to leave a 5-star review so your app doesn't look dead.

### Production SaaS
Use the native Apple/Google "In-App Review" API. Timing is everything. NEVER ask for a review when the app opens or after an error. ONLY ask for a review immediately after the user experiences a "win" (e.g., they just completed a workout, or successfully booked a flight). Reply to all 1-star reviews publicly and professionally; it shows prospective users that you actually care and fix bugs.

## Accountability Check
- [ ] I automatically prompt users for an App Store review after a positive action.`,
  'mobilereferralprograms': `# Referral Programs

**Estimated Time:** 2-4 Hours

---

## Why this matters
Acquiring a new user via Facebook Ads can cost $5 to $15. Acquiring a new user because their friend invited them costs $0. Referral programs turn your existing users into your marketing team.

## Strategic Guidance

### Hackathon Mode
Skip it.

### Personal Project
Skip it.

### Production SaaS
Offer a two-sided reward: "Invite a friend, and you both get a free month." Use deep links (Universal Links) so that when the friend clicks the link, downloads the app, and opens it, the backend automatically attributes the signup to the referrer without requiring them to type in a 6-digit promo code (which adds friction and ruins the conversion rate).

## The Data We Need From You
**What is the specific incentive you will offer users to invite their friends?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have designed a frictionless referral mechanism.`,
  'mobileroadmap': `# Product Roadmap

**Estimated Time:** 1 Hour

---

## Why this matters
A public roadmap tells your users that the app is alive and actively improving. It builds trust, which reduces churn (cancellations).

## Strategic Guidance

### Hackathon Mode
Your roadmap is the final slide of your presentation: "If we had another 48 hours, here is what we would build."

### Personal Project
Keep a simple Trello or Notion board so you remember what you wanted to build next.

### Production SaaS
Publish a public roadmap using a tool like Canny or a Notion page. Let users vote on upcoming features. Crucially, do not put hard dates (like "Launching Oct 15th") on your public roadmap, because in software development, you will inevitably miss the deadline and disappoint users. Use "Now", "Next", and "Later" columns instead.

## Accountability Check
- [ ] I have a roadmap to communicate future value to my users.`,
  'mobilescalingstrategy': `# Scaling Strategy

**Estimated Time:** 1 Hour

---

## Why this matters
If your app successfully finds product-market fit, it will experience rapid growth. A scaling strategy dictates how you will expand your team, your infrastructure, and your marketing channels to handle this growth without the company collapsing.

## Strategic Guidance

### Hackathon Mode
Irrelevant.

### Personal Project
Irrelevant.

### Production SaaS
Identify the bottlenecks. If you double your user base tomorrow, what breaks? Does customer support get overwhelmed? Does the database slow down? Your scaling strategy should address hiring (e.g., "We need a dedicated QA engineer"), infrastructure (e.g., "Migrating from Supabase to a managed AWS cluster"), and marketing (e.g., "Expanding from Facebook Ads to influencer partnerships").

## Accountability Check
- [ ] I know exactly what systems will break if my app goes viral tomorrow.`,
  'mobilefeedback': `# User Feedback

**Estimated Time:** Ongoing

---

## Why this matters
Feedback is the raw data you use to improve the product. If you ignore it, your competitors will listen to it and steal your users.

## Strategic Guidance

### Hackathon Mode
Listen to the judges' questions. Their questions will reveal what parts of your pitch or app were confusing.

### Personal Project
If you share it online, read the comments.

### Production SaaS
Set up a system to aggregate feedback from the App Store, support emails, and in-app surveys into a single dashboard (like a Notion database). Tag the feedback by feature. If 50 people request "Dark Mode", bump it to the top of the feature prioritization list.

## Accountability Check
- [ ] I have a centralized system for tracking and tagging user feedback.`,
  'mobilestatemanagementimplementation': `# State Management Implementation

**Estimated Time:** Variable

---

## Why this matters
This is where you actually write the code for the architecture you planned. Poor state management implementation leads to "Zombie" UI (buttons that don't respond) and memory leaks that crash the app after 10 minutes of use.

## Strategic Guidance

### Hackathon Mode
Just pass props down. If you need global state, use a simple React Context or a global variable. Don't waste time configuring strict type safety for your state.

### Personal Project
Set up Zustand or Jotai (for React Native) and define your global store. It's incredibly fast to set up and provides a great developer experience.

### Production SaaS
You must strictly type your state store using TypeScript. Ensure that you are not storing massive arrays of data (like a 10,000 item list) in your global state manager, as this will destroy performance. Use memoization (`useMemo`, `useCallback`) to prevent unnecessary re-renders when the state changes. Implement persistent state for things like user preferences so they survive app restarts.

## AI Execution Phase
\`\`\`prompt
Act as a Senior Mobile Developer. I am using [Insert State Library, e.g., Zustand] in my [Insert Framework] app. Please provide the exact code to create a global store for managing the user's "Theme" (light/dark) and "Auth Token". Include the logic to persist this specific state to local device storage.
\`\`\`

## Accountability Check
- [ ] I have successfully implemented and tested my global state manager.`,
  'mobilepushnotificationsimplementation': `# Push Notifications Implementation

**Estimated Time:** 2-4 Hours

---

## Why this matters
Wiring up push notifications requires coordinating the mobile frontend, the device OS (iOS/Android), Apple/Google servers, and your backend database. It is one of the most failure-prone features to build.

## Strategic Guidance

### Hackathon Mode
Fake it. Trigger a local notification (a notification scheduled entirely on the device without a server) after a 5-second timeout to simulate receiving a message.

### Personal Project
Use Expo Push Notifications. They provide a unified API so you don't have to write separate Swift and Kotlin code to handle incoming messages.

### Production SaaS
You must gracefully handle notification permissions. Build a "Pre-permissions" screen that explains *why* the user should allow notifications before triggering the native OS prompt. Your backend must listen for token refresh events and update the database, otherwise you will end up sending notifications to dead devices, which Apple/Google will penalize you for.

## AI Execution Phase
\`\`\`prompt
Act as a Mobile Engineer. I am using [Insert Tech Stack, e.g., Expo]. Provide the frontend code required to request push notification permissions gracefully, retrieve the device token, and send that token to my backend API. Include error handling for if the user denies permission.
\`\`\`

## Accountability Check
- [ ] I can successfully send a push notification from my backend to a physical device.`,
  'mobilefrontendui': `# Frontend (UI) Implementation

**Estimated Time:** Variable

---

## Why this matters
This is where you translate your wireframes into actual code. Mobile UI is unforgiving; if your layout breaks on a smaller screen, the app is unusable. You must handle the "Safe Area" (not drawing underneath the notch or the bottom swipe bar).

## Strategic Guidance

### Hackathon Mode
Hardcode margins and padding. Use a UI library to slap pre-built cards and buttons onto the screen. Focus strictly on the "Happy Path."

### Personal Project
Use Flexbox extensively. Do not use absolute positioning unless absolutely necessary. Build reusable functional components for your Typography and Buttons early on.

### Production SaaS
You must build responsive layouts that adapt to iPhone SEs and iPhone Pro Maxes alike. Use `SafeAreaView` wrappers to avoid OS UI elements. Ensure your components support Dark Mode out of the box by using semantic color variables (e.g., `theme.background`) rather than hardcoded colors (e.g., `white`). Ensure touch targets (buttons) are at least 44x44 points to comply with accessibility standards.

## The Data We Need From You
**What is the most complex UI screen you need to build right now?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] My core UI screens are built, responsive, and respect Safe Areas.`,
  'mobilenavigation': `# Navigation Implementation

**Estimated Time:** 2 Hours

---

## Why this matters
Mobile navigation requires managing a "Stack" of screens. If a user clicks "Profile" -> "Settings" -> "Privacy", the app must remember that path so the "Back" button works correctly. Poorly implemented navigation leads to endless loops and memory leaks.

## Strategic Guidance

### Hackathon Mode
Use whatever router is default for your framework (e.g., Expo Router). Set up a basic Bottom Tab navigator and throw all your screens in there.

### Personal Project
Implement nested navigation. Have a Bottom Tab for the main sections, but use a Stack Navigator inside each tab so users can drill down into details without losing the bottom bar.

### Production SaaS
You must implement a robust routing architecture. Separate your "Unauthenticated Stack" (Login, Signup) from your "Authenticated Stack" (Main App) using conditional rendering based on the auth state. This prevents users from accidentally hitting the "Back" button and returning to the Login screen after they've already logged in. Handle deep link routing explicitly.

## AI Execution Phase
\`\`\`prompt
Act as a Mobile Architect. I am using [Insert Router, e.g., React Navigation v6]. Provide the boilerplate code for a root navigator that conditionally renders an 'AuthStack' (Login/Signup) or an 'AppStack' (Bottom Tabs) based on a boolean `isAuthenticated` variable.
\`\`\`

## Accountability Check
- [ ] Users can navigate deep into the app and return safely using the back button.`,
  'mobileapis': `# API Integration

**Estimated Time:** Variable

---

## Why this matters
Your beautiful UI is useless without data. Integrating APIs involves fetching data, showing loading spinners, handling network errors, and updating the UI when the data arrives.

## Strategic Guidance

### Hackathon Mode
Use simple `fetch` calls inside `useEffect` hooks. If it errors out, just `console.log` it. You don't have time for robust retry logic.

### Personal Project
Use a data-fetching library like React Query or SWR. It automatically handles loading states, error states, and caching, drastically reducing the amount of boilerplate code you have to write.

### Production SaaS
You must use a robust data-fetching layer with strict TypeScript interfaces for the API responses. If the backend changes a field name, your mobile app should throw a TypeScript error at compile time, not crash at runtime. Implement caching, pull-to-refresh functionality, and infinite scrolling (pagination) for any lists longer than 20 items.

## The Data We Need From You
**List 3 critical API endpoints your mobile app needs to consume.**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] My app successfully fetches, displays, and mutates data from the backend.`,
  'mobilemediauploads': `# Media Uploads

**Estimated Time:** 2 Hours

---

## Why this matters
Uploading photos or videos requires requesting camera/gallery permissions, handling large file sizes, and dealing with the app going to the background during a slow upload. A failed upload is incredibly frustrating for users.

## Strategic Guidance

### Hackathon Mode
Use a simple image picker library to get the image URI, and upload it directly to Supabase Storage or Cloudinary. Don't worry about compressing the image.

### Personal Project
Implement basic image compression before uploading. A modern smartphone photo can be 10MB; you do not want to upload that raw file over a cellular network.

### Production SaaS
You must aggressively compress and resize images natively on the device *before* uploading. Use presigned URLs to upload directly to S3. For video or large files, you must implement background uploading so the upload continues even if the user minimizes the app. Show a clear progress bar (0% to 100%) during the upload.

## The Data We Need From You
**What library are you using to access the device's camera roll?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] Users can select, compress, and successfully upload media to the cloud.`,
  'mobilemapslocation': `# Maps & Location Services

**Estimated Time:** 2-4 Hours

---

## Why this matters
Location services are powerful but heavily restricted by the OS for privacy reasons. Rendering interactive maps also consumes massive amounts of memory and battery.

## Strategic Guidance

### Hackathon Mode
Use a simple MapView component (like `react-native-maps`). Don't worry about custom markers or complex polygon rendering.

### Personal Project
Implement basic geolocation to get the user's current coordinates. Be aware that running location services continuously in the background will destroy battery life.

### Production SaaS
You must handle location permissions perfectly. Explain *why* you need the location before triggering the native OS prompt. If the user denies permission, the app must degrade gracefully (e.g., allow them to type in a zip code instead). Optimize map rendering by clustering markers if there are more than 50 points on the screen, otherwise the map will lag heavily.

## The Data We Need From You
**Will you require "While Using" or "Always Allow" (Background) location permissions?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] My app renders maps efficiently and handles location permissions correctly.`,
  'mobiledevicepermissions': `# Device Permissions

**Estimated Time:** 1 Hour

---

## Why this matters
Apple and Google are cracking down on privacy. If your app crashes because it tried to access the camera without permission, Apple will reject it. If you ask for contacts permission without a clear reason, the user will uninstall your app.

## Strategic Guidance

### Hackathon Mode
Just trigger the permission prompt immediately when the app opens. The judges will click "Allow".

### Personal Project
Handle the denied state. If the user denies camera access, show a message saying "Camera access is required. Go to Settings to enable it."

### Production SaaS
You must use the "Double Prompt" strategy. First, show a beautiful, custom UI screen explaining *why* you need the camera and how it benefits the user. Only when they click "Continue" on *your* screen do you trigger the native OS permission prompt. If they deny the native prompt, you cannot trigger it again; you must provide a button that deep-links them directly to your app's page in the OS Settings.

## AI Execution Phase
\`\`\`prompt
Act as a Mobile UX Expert. My app needs access to the user's [Insert Permission, e.g., Contacts]. Write the copy (Headline and short description) for a "Pre-permission" screen that convinces the user why granting this permission is highly beneficial to them, without sounding creepy.
\`\`\`

## Accountability Check
- [ ] I handle all device permissions securely and gracefully.`,
  'mobileofflinefeatures': `# Offline Features Implementation

**Estimated Time:** 4+ Hours

---

## Why this matters
Implementing true offline support (where users can read, edit, and create data without internet) is one of the hardest engineering challenges in mobile development due to complex state synchronization and conflict resolution.

## Strategic Guidance

### Hackathon Mode
Skip it. Assume 100% uptime.

### Personal Project
Implement basic caching. If the network request fails, load the last known good data from `AsyncStorage`. Do not allow offline edits.

### Production SaaS
If your app is offline-first, you must use a robust local database (like WatermelonDB). Changes made offline must be saved locally and pushed to an "Action Queue". When the device regains connection, a background worker must process the queue and sync with the backend. You must handle conflicts (e.g., "Server version is newer than local version"). Provide a clear UI indicator (like a cloud icon with a slash) so the user knows they are working offline.

## The Data We Need From You
**What specific data must be available to the user when they have no internet connection?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] My app behaves predictably when the network connection drops.`,
  'mobileanalyticsevents': `# Analytics Events Implementation

**Estimated Time:** 1 Hour

---

## Why this matters
If you don't track events, you are flying blind. You need to know if users are actually clicking the "Checkout" button or if they are abandoning the cart on the previous screen.

## Strategic Guidance

### Hackathon Mode
Skip it entirely.

### Personal Project
Implement a basic tracker. Fire an event when the app opens, and when the core action is completed. Use `console.log` to verify they are firing.

### Production SaaS
Create a centralized `AnalyticsService` wrapper. Do not scatter third-party tracking code (like `Mixpanel.track()`) directly inside your UI components. Wrap it so you can easily swap analytics providers later. You must track events with rich properties (e.g., `track('purchase_completed', { item_id: 123, price: 9.99 })`). Ensure you handle opt-outs for GDPR/CCPA compliance.

## The Data We Need From You
**List the exact names of the 3 most critical events you will track.**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## Accountability Check
- [ ] Critical user actions are actively tracked and sent to an analytics dashboard.`,
  'mobileerrorhandling': `# Error Handling

**Estimated Time:** 2 Hours

---

## Why this matters
An unhandled exception in a web browser just logs a red error to the console. An unhandled exception in a mobile app crashes the entire app instantly, throwing the user back to their home screen. Robust error handling is the difference between a 4-star app and a 1-star app.

## Strategic Guidance

### Hackathon Mode
Wrap everything in `try/catch` and `console.log` the errors. Don't worry about showing nice UI alerts.

### Personal Project
Implement a global error boundary. If the app is going to crash, show a fallback UI screen that says "Oops, something broke. Please restart the app" instead of just instantly disappearing.

### Production SaaS
You must use Global Error Boundaries (in React Native) to catch rendering errors. For asynchronous errors (API calls), you must catch them and display actionable Toast messages (e.g., "Network error, please try again"). Never show raw server errors (like "SQL Syntax Error") to the user. Log all caught errors to a crash reporting service immediately.

## The Data We Need From You
**What library will you use to show non-intrusive error messages (e.g., Toast, Snackbar)?**
\`\`\`input
Type your answer here...
\`\`\`

## Accountability Check
- [ ] I have implemented a global error boundary to prevent hard crashes.`,
  'mobiledemodata': `# Demo Data

**Estimated Time:** 30 min

---

## Why this matters
A UI looks terrible when it is empty. During a presentation, you need the app to look vibrant and full of activity to convey its intended value.

## Strategic Guidance

### Hackathon Mode
Hardcode the data directly into your frontend components or use a simple JSON file. Do not waste time writing complex seed scripts for a database. Your app just needs to look good for a 3-minute video.

### Personal Project
Add 3-5 realistic items manually so you can design the UI around them.

### Production SaaS
Write a robust database seed script. When a new developer joins your team, they should be able to run `npm run seed` and instantly populate their local database with 50 users, 200 posts, and realistic relationships so they can start coding immediately without manually creating dummy accounts.

## Accountability Check
- [ ] I have realistic demo data populating my app for presentations.`,
  'mobileplaystoremockups': `# Play Store Mockups

**Estimated Time:** 1 Hour

---

## Why this matters
If you want to look like a professional business during a pitch or on a landing page, showing your app inside a realistic 3D phone mockup is infinitely better than showing a flat, rectangular screenshot.

## Strategic Guidance

### Hackathon Mode
Put your screenshots inside an iPhone or Pixel frame. It makes the app look 10x more "real" to the judges.

### Personal Project
Use a free tool to generate a nice mockup for your personal portfolio.

### Production SaaS
Use high-quality mockup templates for your marketing website and investor pitch decks. Do not use outdated phone models (like an iPhone 8 with thick bezels) as it makes your software look dated by association. Use the latest flagship devices.

## Accountability Check
- [ ] I have professional 3D device mockups of my app.`,
  'mobilemultilanguage': `# Multi-language (i18n)

**Estimated Time:** 2-5 Hours

---

## Why this matters
If your app is only in English, you are ignoring massive, highly lucrative markets (like Spanish-speaking countries or the EU). Internationalization (i18n) allows your app to scale globally.

## Strategic Guidance

### Hackathon Mode
Skip it. English only.

### Personal Project
Skip it unless you are trying to learn how i18n libraries work.

### Production SaaS
Do not hardcode strings (e.g., `<Text>Submit</Text>`). Use an i18n library (like `i18next`) and reference translation keys (e.g., `<Text>{t('button.submit')}</Text>`). This makes adding a new language as easy as uploading a new JSON file. Be aware that German and French words are often much longer than English words, which will break your UI layouts if you hardcoded strict widths for your buttons.

## Accountability Check
- [ ] I have abstracted my text strings to support multiple languages.`,
  'mobilesubscriptionbilling': `# Subscription Billing

**Estimated Time:** 3-5 Hours

---

## Why this matters
Handling recurring payments on mobile is vastly more complex than on the web because you must go through Apple and Google's proprietary billing systems. You must handle upgrades, downgrades, cancellations, and expired credit cards.

## Strategic Guidance

### Hackathon Mode
Skip it.

### Personal Project
Skip it.

### Production SaaS
Use a wrapper service like RevenueCat or Superwall. They maintain the source of truth for a user's subscription status. Your app should simply ask RevenueCat: `isUserPro()`. If true, unlock the features. Your backend should listen to webhooks from RevenueCat to update your database when a user cancels so you can trigger a "win-back" email campaign.

## Accountability Check
- [ ] I have integrated a robust subscription management platform.`,
  'mobilewearables': `# Wearables & Widgets

**Estimated Time:** Variable

---

## Why this matters
Apple Watch and Android Wear apps are niche, but Home Screen Widgets are massive drivers of retention. A widget puts your app's core value right on the user's home screen, so they don't even have to open the app to get value.

## Strategic Guidance

### Hackathon Mode
Skip it.

### Personal Project
Building an iOS Widget is a great way to learn Swift and WidgetKit, even if the rest of your app is built in React Native.

### Production SaaS
If your app displays dynamic data (weather, task lists, calorie counts), you MUST build a Home Screen Widget. Users love widgets. Wearable apps (Apple Watch) should only be built if the use-case is strictly "glanceable" or relies on health sensors (like heart rate). Do not try to port a complex UI to a watch.

## Accountability Check
- [ ] I have evaluated if a Home Screen Widget adds significant value to my users.`,
  'mobilewidgets': `# Home Screen Widgets

**Estimated Time:** 3-5 Hours

---

## Why this matters
Widgets drastically reduce the "Time to Value". A user can see their bank balance or their next calendar meeting instantly. It keeps your brand highly visible on their phone all day long.

## Strategic Guidance

### Hackathon Mode
Skip it.

### Personal Project
Skip it unless you specifically want to learn WidgetKit (iOS) or Glance (Android).

### Production SaaS
Widgets must be built in the native language (Swift/Kotlin) even if your main app is React Native/Flutter. The widget cannot run complex logic; it just displays a static snapshot of data. Your main app must write data to a shared storage container that the widget can read from. Optimize for "glanceability".

## Accountability Check
- [ ] I understand the technical requirements for building native widgets.`,
  'mobilebackgroundservices': `# Background Services

**Estimated Time:** 3-5 Hours

---

## Why this matters
By default, when a user minimizes your app, the OS pauses your code to save battery. If your app needs to track GPS during a run or download a 1GB podcast while minimized, you must use Background Services to bypass this suspension.

## Strategic Guidance

### Hackathon Mode
Skip it. It is incredibly difficult to debug background tasks in a 24-hour window.

### Personal Project
Only use it if absolutely necessary for the core utility (like a music player). Be prepared for the OS to kill your background task unpredictably.

### Production SaaS
Apple and Google heavily restrict background execution. You must request special permissions (like "Background Fetch" or "Audio"). If your app drains the battery in the background, users will receive a system warning and will likely uninstall it. Use dedicated libraries (like `expo-task-manager` or `react-native-background-timer`) and test extensively on physical devices, as background behavior on simulators is often fake and unreliable.

## Accountability Check
- [ ] I understand the battery and OS constraints of running code in the background.`,
  'mobilebluetooth': `# Bluetooth (BLE)

**Estimated Time:** Variable

---

## Why this matters
Bluetooth Low Energy (BLE) allows your app to communicate with hardware peripherals (heart rate monitors, smart locks, IoT devices). It bridges the gap between software and the physical world.

## Strategic Guidance

### Hackathon Mode
Hardware integration is the fastest way to win a hackathon, but the fastest way to fail a live demo. Have a pre-recorded video ready.

### Personal Project
Great for learning IoT. Ensure you buy BLE-compatible hardware, not classic Bluetooth.

### Production SaaS
BLE is notoriously flaky. Connections drop, devices sleep, and Android/iOS handle the BLE stack completely differently. You must build a robust reconnection strategy. Always show the user exactly what the app is doing ("Scanning...", "Connecting...", "Failed to Connect - Retry"). Requesting Bluetooth permissions requires a clear explanation to the user, as some malicious apps use BLE beacons for tracking.

## Accountability Check
- [ ] I have planned a robust error-handling strategy for dropped Bluetooth connections.`,
  'mobilenfc': `# NFC (Near Field Communication)

**Estimated Time:** 1-2 Hours

---

## Why this matters
NFC enables "tap to interact" experiences (like Apple Pay, Amiibo, or tapping a smart business card). It provides a magical, frictionless user experience compared to scanning a QR code.

## Strategic Guidance

### Hackathon Mode
Buy a pack of $1 NFC tags from Amazon. Writing to them and reading from them is incredibly easy and looks very impressive in a demo.

### Personal Project
Automate your life. Tape an NFC tag to your nightstand that triggers your app to set your alarm and turn off your lights.

### Production SaaS
iOS heavily restricts NFC. You can easily *read* NDEF-formatted tags, but *writing* to them or using the iPhone as a Host Card Emulation (HCE) device is locked down. Android is much more open. Ensure your UI provides clear instructions (e.g., an animation showing exactly where to tap the phone, as the NFC chip location differs between iPhone and Android models).

## Accountability Check
- [ ] I understand the hardware limitations of NFC on iOS vs Android.`,
  'mobilecamera': `# Camera & Vision

**Estimated Time:** 2-4 Hours

---

## Why this matters
The camera is the most powerful sensor on the phone. Whether it's scanning barcodes, taking profile pictures, or using AR/ML to analyze the real world, camera integration is fundamental to mobile.

## Strategic Guidance

### Hackathon Mode
Use a basic image picker to select a photo from the gallery. Building a custom camera UI with a shutter button is a waste of time.

### Personal Project
Experiment with Vision APIs (like reading text from an image). It's incredibly powerful and easy to integrate.

### Production SaaS
If the camera is central to your app (like Snapchat or a document scanner), you must build a custom Camera View. Handle permissions gracefully. Be aware of memory constraints; if you keep the camera active in the background, the app will crash. If processing images (ML/AI), resize the image significantly before running the model to prevent freezing the UI thread.

## Accountability Check
- [ ] I have integrated the camera and requested permissions gracefully.`,
  'mobilelocationservices': `# Location Services (GPS)

**Estimated Time:** 2-4 Hours

---

## Why this matters
Location context makes apps infinitely more useful (finding nearby restaurants, tracking a run). However, users are highly suspicious of apps requesting location data.

## Strategic Guidance

### Hackathon Mode
Hardcode coordinates for the demo. Getting accurate GPS indoors during a hackathon is notoriously difficult and unreliable.

### Personal Project
Use standard geolocation APIs to get the current lat/long. It's simple and effective.

### Production SaaS
You must clearly justify *why* you need location data. Never ask for "Always Allow" (Background tracking) unless your app fundamentally requires it (like a fitness tracker or navigation app). Background location tracking must show a persistent blue bar at the top of the screen on iOS, so users will definitely notice it. Always degrade gracefully if the user denies permission.

## Accountability Check
- [ ] I handle location data responsibly and only request it when necessary.`,
  'mobileuserresearch': `# User Research

**Estimated Time:** Days

---

## Why this matters
Building features without talking to users is guessing. User research validates that your assumptions about the "Problem Statement" are actually true.

## Strategic Guidance

### Hackathon Mode
Irrelevant. You don't have time.

### Personal Project
Talk to 3 people who have the same problem as you. Ask them how they currently solve it.

### Production SaaS
Do not ask "Would you use this app?" (Everyone will say "Yes" to be polite). Ask "How do you currently solve this problem?" and "How much did you pay for your current solution?" If they haven't spent time or money trying to fix the problem already, it is not a "Hair on Fire" problem, and they will not download your app. Read "The Mom Test" by Rob Fitzpatrick.

## Accountability Check
- [ ] I have spoken to real humans about this problem.`,
  'webideadefinition': `# Idea Definition

**Estimated Time:** 1-2 Hours

---

## Why this matters
The core of any successful web application is a crystal clear definition of what it actually is. If you cannot explain the core concept of your web app in a single, coherent sentence, you are going to end up building a messy, disjointed platform. Clarity here prevents scope creep later.

## Strategic Guidance

### Hackathon Mode
Your idea needs to be incredibly novel or visually striking to stand out in a demo. Don't build a generic "To-Do List" or "CRM" for a hackathon. Build something that utilizes a new, trending API (like the latest LLM reasoning model) or solves a highly specific, quirky problem. Focus the definition on the "Wow" factor.

### Personal Project
Focus your idea entirely on a problem you personally experience. The goal is to build something you will actually use every day. If you don't use it, you will abandon it. The best personal projects are scratch-your-own-itch solutions that happen to be useful to others.

### Production SaaS
Your idea must focus on a "Hair on Fire" problem. The problem must be so painful that a specific group of businesses or consumers are currently paying money or wasting significant hours using hacky workarounds (like giant Excel sheets) to solve it. Your idea is the software that automates that pain away.

## Implementation Steps
\`\`\`prompt
Act as a Product Manager. Help me refine the core idea for my web application. I want to build a [Insert basic idea here]. Ask me 3 targeted questions to help narrow down the exact value proposition and ensure the idea is focused enough to build an MVP.
\`\`\`

## Validation Checklist
- [ ] You can describe the web app in one simple sentence.
- [ ] You have identified the primary value it provides.
- [ ] You are confident the idea is narrow enough to actually execute.
`,
  'webproblemstatement': `# Problem Statement

**Estimated Time:** 2 Hours

---

## Why this matters
Software is simply a tool used to solve a problem. If the problem you are solving isn't real, or isn't painful enough, nobody will use your web app. A clear problem statement ensures you are building a painkiller, not a vitamin. 

## Strategic Guidance

### Hackathon Mode
For a hackathon, the problem statement should highlight a massive inefficiency or a "cool" new capability that was previously impossible without a specific new technology. The pain doesn't have to be enterprise-level, but the narrative needs to be compelling for the judges.

### Personal Project
Your problem statement should be intensely personal. "I am currently wasting 4 hours a week manually copying data from X to Y." The problem must be something that actively annoys you on a regular basis. 

### Production SaaS
In SaaS, the problem statement is the foundation of your pricing model. "Businesses in [Industry] are currently losing $X or wasting Y hours because of [Inefficiency]." If you cannot quantify the pain in terms of lost money, lost time, or lost compliance, it is not a SaaS problem worth solving.

## Define the Problem
\`\`\`input
Write your problem statement here. Who is suffering? What is the pain? Why do the current solutions fail?
\`\`\`

## Validation Checklist
- [ ] The problem is clearly defined without mentioning your specific solution.
- [ ] You can identify exactly who experiences this problem.
- [ ] You know how they are currently trying (and failing) to solve it.
`,
  'webuserjourney': `# User Journey

**Estimated Time:** 2-3 Hours

---

## Why this matters
A web application is a flow of screens and interactions. The User Journey maps out the step-by-step path a user takes from the moment they land on your site to the moment they achieve their goal. Mapping this out prevents you from building orphaned pages or confusing navigation.

## Strategic Guidance

### Hackathon Mode
Keep the journey extremely linear and focused purely on the "Happy Path" that you will showcase during your demo. Assume the user clicks the exact right buttons in the exact right order. Do not waste time designing error states or edge-case flows for a hackathon.

### Personal Project
Focus on getting to the core utility as fast as possible. If it's a tool for yourself, you don't need a complex onboarding flow or a massive landing page. The journey might literally just be: Open App -> View Dashboard -> Click Action -> Done.

### Production SaaS
The User Journey must account for onboarding, activation, and retention. How does a cold lead land on the site, understand the value, sign up, complete their first critical task (Activation), and eventually invite their team? You must map out edge cases, empty states, and error recovery.

## Implementation Steps
\`\`\`prompt
Act as a UX Designer. My web app does [Insert Core Function]. Map out the primary 'Happy Path' user journey from the moment they hit the landing page to the moment they successfully complete the core action. Break it down step-by-step.
\`\`\`

## Validation Checklist
- [ ] The primary goal of the user is clearly defined.
- [ ] You have mapped out the sequence of steps to achieve that goal.
- [ ] There are no dead-ends in the core flow.
`,
  'webpersonas': `# Personas

**Estimated Time:** 1-2 Hours

---

## Why this matters
If you build a web app for "everyone," you build an app for no one. User Personas force you to design specific features for a specific demographic, ensuring the UI language, feature set, and marketing resonate deeply with your target audience.

## Strategic Guidance

### Hackathon Mode
You only need one persona: the person who benefits the most from your demo. Often, this persona is just "You" or a highly exaggerated caricature of a user who desperately needs the specific tech you are showcasing.

### Personal Project
The primary persona is literally you. You might add a secondary persona for "My friends who I'm forcing to use this," but your design decisions should optimize for your own daily workflow and preferences.

### Production SaaS
You need to identify the "End User" and the "Economic Buyer." In B2B SaaS, the person using the app (e.g., a Sales Rep) is rarely the person paying for it (e.g., the VP of Sales). Your personas must map out the pain points of the user *and* the ROI requirements of the buyer.

## Define Your Core Persona
\`\`\`input
Describe your primary persona. Name, role, biggest daily frustration, and what would make them instantly love your app.
\`\`\`

## Validation Checklist
- [ ] You have identified at least one highly specific target user.
- [ ] You understand their technical proficiency (e.g., power user vs. novice).
- [ ] You know exactly why they would seek out your solution.
`,
  'websolutionstatement': `# Solution Statement

**Estimated Time:** 1 Hour

---

## Why this matters
Now that you have defined the problem, you must clearly articulate how your web app solves it. The solution statement acts as the guiding light for all feature development. If a feature does not directly support the solution statement, it gets cut.

## Strategic Guidance

### Hackathon Mode
The solution should be wildly ambitious or highly clever. "We solve X by leveraging a real-time vision model to automate Y." The solution must sound impressive when pitched on stage.

### Personal Project
The solution should be pragmatic and low-maintenance. "A simple dashboard that pulls data from X API so I don't have to check 5 different websites."

### Production SaaS
The solution must directly address the ROI mentioned in the problem statement. "Our platform automates [Process], saving teams [X hours] per week by replacing manual spreadsheets with a synchronized, role-based web app."

## Implementation Steps
\`\`\`prompt
Act as a Product Strategist. I previously defined my problem as: [Insert Problem Statement]. My idea is to build a web app that [Insert brief idea]. Help me write a powerful, 2-sentence Solution Statement that clearly bridges the gap between their pain and my platform.
\`\`\`

## Validation Checklist
- [ ] The solution directly addresses the core problem.
- [ ] It is clear *how* the web app delivers value.
- [ ] It is concise enough to explain to a non-technical person.
`,
  'webelevatorpitch': `# Elevator Pitch

**Estimated Time:** 1 Hour

---

## Why this matters
You need to be able to explain your web app to an investor, a potential user, or a teammate in under 30 seconds. A strong elevator pitch forces you to strip away technical jargon and focus purely on the value proposition. 

## Strategic Guidance

### Hackathon Mode
Focus on the "Wow." Your pitch needs to grab the judges' attention immediately. "We built X for Y, utilizing [cool technology] to do [something that used to be impossible]."

### Personal Project
The pitch is mostly for yourself or to explain to friends what you're working on. Keep it casual. "I'm building a simple app that does X because I was tired of dealing with Y."

### Production SaaS
Use the classic positioning formula: "For [target audience] who [have a specific need], our product is a [product category] that provides [key benefit]. Unlike [competitor], we [key differentiator]."

## Define the Pitch
\`\`\`input
Write your 30-second elevator pitch here. Make it punchy.
\`\`\`

## Validation Checklist
- [ ] You can read it out loud in under 30 seconds.
- [ ] It avoids highly technical jargon (unless pitching to developers).
- [ ] It clearly states what the app is and who it is for.
`,
  'webcompetitoranalysis': `# Competitor Analysis

**Estimated Time:** 2-4 Hours

---

## Why this matters
Unless you are inventing a fundamentally new category of software, you have competitors. You must understand what they do well, where their UI is clunky, and what features users complain about on Reddit or G2. This exposes the gaps in the market that your web app will fill.

## Strategic Guidance

### Hackathon Mode
Find the biggest, most bloated legacy competitor and position your hack as the modern, AI-native, or blazing-fast alternative. "It's like Jira, but it actually works."

### Personal Project
You don't need a massive spreadsheet of competitors. Just look at the tools you are currently using and failing with. Note down exactly why you hate them, and ensure your personal project fixes those specific annoyances.

### Production SaaS
You must conduct a rigorous feature matrix and pricing analysis. Identify your top 3 direct competitors and 2 indirect competitors (e.g., Excel/Google Sheets). Find out what they charge, what features are gated behind enterprise tiers, and where their user experience is lacking. Your go-to-market strategy depends on this.

## Implementation Steps
\`\`\`prompt
Act as a Market Analyst. My web app is a [Insert App Type] for [Insert Target Audience]. List my top 3-5 likely competitors. For each, provide a brief summary of their strengths, their biggest weakness (based on common user complaints), and how a new entrant could position against them.
\`\`\`

## Validation Checklist
- [ ] You have identified at least 3 direct competitors.
- [ ] You know their primary pricing model.
- [ ] You have identified a specific weakness or gap you can exploit.
`,
  'webfeatureplanning': `# Feature Planning

**Estimated Time:** 2-3 Hours

---

## Why this matters
Feature planning is where ideas turn into reality. You need to brain dump every possible feature your web app *could* have, before relentlessly cutting them down to the essentials. This phase creates the master backlog.

## Strategic Guidance

### Hackathon Mode
Brainstorm features that look incredibly impressive on screen. Real-time collaboration cursors, live charts, AI-generated content blocks. Prioritize features that demo well over features that are structurally sound (like deep user settings).

### Personal Project
Plan features based strictly on your own workflow. Don't build a complex user-invite system if you are the only user. Stick to core utilities.

### Production SaaS
You must plan features across the entire lifecycle: Onboarding, Core Utility, Billing, Settings, and Admin Dashboards. You must also plan for compliance features (data export, account deletion) that are legally required.

## Brainstorming Phase
\`\`\`prompt
Act as a Product Manager. Based on my web app idea: [Insert Idea], brainstorm a comprehensive list of features needed for a fully-fledged platform. Categorize them into: Core App Functionality, User Management & Auth, Dashboard/Reporting, and Settings/Admin.
\`\`\`

## Validation Checklist
- [ ] You have a comprehensive master list of potential features.
- [ ] Features are categorized logically.
- [ ] You haven't started filtering them yet (that comes next).
`,
  'webmvpfeatures': `# MVP Features

**Estimated Time:** 2 Hours

---

## Why this matters
An MVP (Minimum Viable Product) is the absolute bare minimum set of features required to deliver your core value proposition. Every feature you add to the MVP delays your launch and increases your chance of failing before anyone sees the app. Cut ruthlessly.

## Strategic Guidance

### Hackathon Mode
Your MVP is the "Demo." Cut everything that you aren't going to click on during your 3-minute presentation. Fake the auth. Hardcode the database seed data. The MVP is just the core interactive element that wows the judges.

### Personal Project
The MVP is the one specific feature you need to stop using your current hacky workaround. If you are building a budget tracker, the MVP is a form to input an expense and a table to view them. Don't build charts or CSV exports until you actually need them.

### Production SaaS
The MVP must be robust enough that a business is willing to put their real data into it, but narrow enough that you can ship it in 6-8 weeks. You need real auth, secure database rules, and a functioning Stripe checkout, but you *don't* need dark mode, localization, or complex reporting dashboards yet.

## The Brutal Cut
\`\`\`input
List the 3 to 5 absolute essential features required for your MVP to function. Be brutal. If a feature can be delayed, do not include it here.
\`\`\`

## Validation Checklist
- [ ] The MVP list contains no "nice-to-have" features.
- [ ] A user can achieve the primary goal using only these features.
- [ ] You have excluded complex "future" features like advanced analytics or integrations.
`,
  'webfuturefeatures': `# Future Features

**Estimated Time:** 1 Hour

---

## Why this matters
When you brutally cut features from your MVP, you need a place to put them so you don't lose the ideas. Documenting future features gives you a roadmap for what to build after you launch, and prevents scope creep from sneaking back into the MVP.

## Strategic Guidance

### Hackathon Mode
Future features are what you put on the final "What's Next?" slide of your presentation to show the judges you have a vision. "In V2, we plan to add enterprise SSO and a mobile companion app." You will probably never build them.

### Personal Project
These are the cool ideas you have that would take too long right now. Jot them down so you can pick them up on a rainy weekend when you feel like tinkering with the project again.

### Production SaaS
This is your actual Product Roadmap. These features (e.g., Slack integration, advanced permissions, API access) are what you will use to upsell users to higher pricing tiers later. Keep them organized in a backlog so your team knows the long-term vision.

## Implementation Steps
\`\`\`prompt
Act as a Product Manager. Review my MVP features: [Insert MVP Features]. Now, suggest 5 highly valuable 'V2' features that I should delay until after launch, but would make the product significantly more powerful for power users or enterprise clients.
\`\`\`

## Validation Checklist
- [ ] All non-essential ideas from the brainstorming phase are logged here.
- [ ] You have mentally committed to NOT building these right now.
- [ ] The roadmap provides a clear path for evolving the product post-launch.
`,
  'websuccessmetrics': `# Success Metrics

**Estimated Time:** 1-2 Hours

---

## Why this matters
If you don't know what success looks like, you won't know if your web app is failing. Defining specific metrics (KPIs) allows you to measure whether your design and engineering decisions are actually moving the needle.

## Strategic Guidance

### Hackathon Mode
Success is winning the hackathon, getting a working demo deployed to Vercel, and learning a new framework. Don't worry about DAU (Daily Active Users) or churn rates.

### Personal Project
Success is measured by your own personal utility. "I use this tool 3 times a week" or "This script saves me 2 hours every Sunday." The only metric that matters is your own retention.

### Production SaaS
You must track hardcore business metrics: MRR (Monthly Recurring Revenue), Churn Rate, CAC (Customer Acquisition Cost), and Activation Rate (the percentage of signups who hit the core 'aha' moment). You will need tools like PostHog or Mixpanel to track these effectively.

## Implementation Steps
\`\`\`prompt
Act as a Data Analyst. My web app does [Insert Core Function]. I am aiming for a Production SaaS model. What are the 4 most critical KPIs (Key Performance Indicators) I should track to ensure the business is healthy and growing? Explain why each metric matters.
\`\`\`

## Validation Checklist
- [ ] You have defined what a "successful" user looks like.
- [ ] You have identified measurable metrics (e.g., signups, daily logins).
- [ ] You have a basic idea of how you will track these metrics.
`,
  'webusersaudience': `# Users & Audience

**Estimated Time:** 1 Hour

---

## Why this matters
Understanding the technical proficiency, devices, and context of your audience dictates your entire architecture. If your audience is construction workers in the field, your web app better be mobile-first and extremely tolerant of terrible network connections.

## Strategic Guidance

### Hackathon Mode
Assume the audience is the judges watching your screen on a massive 4K projector. Build for a desktop browser, specifically Chrome, and don't waste time on complex responsive design unless the hack is specifically mobile-focused.

### Personal Project
You are the audience. If you only use this on your massive ultrawide monitor at home, you literally don't need to write a single media query for mobile. Build it for the exact environment you use.

### Production SaaS
You must deeply analyze the environment. Are they enterprise workers forced to use Internet Explorer? Are they Gen Z users who will only ever open the link via an Instagram webview? You must design for the lowest common denominator in their tech stack.

## Define the Environment
\`\`\`input
Where and how will your users access this web app? (e.g., Desktop in an office, mobile browser on a train, iPad in a retail store).
\`\`\`

## Validation Checklist
- [ ] You know the primary device (Desktop vs Mobile) your users prefer.
- [ ] You understand their typical network conditions.
- [ ] You know their general technical literacy level.
`,
  'webusergoals': `# User Goals

**Estimated Time:** 1 Hour

---

## Why this matters
Users do not care about your features; they care about achieving their goals. A feature is just a mechanism to get a job done. Defining the specific "Jobs to be Done" ensures you build a streamlined UI focused on outcomes, not just a bloated dashboard of buttons.

## Strategic Guidance

### Hackathon Mode
The user's goal is to be amazed by the output of your AI or algorithmic hack within 10 seconds of hitting the page. Design the entire UI around that single magical moment.

### Personal Project
Your goal is usually automation or organization. "I want to see all my server logs in one place without logging into AWS." Build the shortest possible path to that specific outcome.

### Production SaaS
Users hire your software to do a job. In a B2B app, the goal is often "I want to generate a report so my boss stops yelling at me" or "I want to close this ticket faster so I can go home." Design workflows that minimize clicks to achieve these core professional goals.

## Implementation Steps
\`\`\`prompt
Act as a UX Researcher using the 'Jobs to be Done' framework. My web app is [Insert App Idea]. Help me define the top 3 'Jobs' my users are hiring my software to do. Format them as: 'When [Situation], I want to [Motivation], so I can [Expected Outcome].'
\`\`\`

## Validation Checklist
- [ ] Goals are focused on outcomes, not features.
- [ ] The primary reason a user logs in is clearly defined.
- [ ] The UI can be designed to prioritize these specific goals.
`,
  'webnicetohavefeatures': `# Nice-to-Have Features

**Estimated Time:** 30 Minutes

---

## Why this matters
This is the final dump of the brainstorming phase. These are the highly polished, "delightful" features that aren't strictly necessary for V2 or V3, but would make the web app feel incredibly premium. Getting them out of your head and onto paper helps you stay focused on the MVP.

## Strategic Guidance

### Hackathon Mode
Sometimes a "nice-to-have" micro-animation is exactly what wins a hackathon. If you have an extra 2 hours before submission, adding a beautiful Framer Motion transition or a slick dark-mode toggle can dramatically elevate the perceived quality of the hack.

### Personal Project
These are the fun UI tweaks you add when you are procrastinating on doing actual work. "I don't need my habit tracker to have a 3D spinning globe, but I want to learn Three.js."

### Production SaaS
In enterprise SaaS, "nice-to-haves" are often what separates a $10/mo product from a $50/mo product. Things like custom branding, white-labeling, audit logs, and highly granular permission roles are massive value-adds that you can build later to capture enterprise value.

## Implementation Steps
\`\`\`prompt
Act as a Product Designer. Review my core app idea: [Insert Idea]. Suggest 3 'delightful' nice-to-have features—things like micro-interactions, personalization elements, or advanced data exports—that aren't necessary for launch but would make the product feel extremely premium.
\`\`\`

## Validation Checklist
- [ ] You have separated core needs from premium wants.
- [ ] You have explicitly agreed not to build these until the MVP is generating value.
`,
  'webprd': `# Product Requirements Document (PRD)

**Estimated Time:** 2-4 Hours

---

## Why this matters
A Product Requirements Document (PRD) is the single source of truth for your web app. If you skip this, you will constantly change your mind halfway through building a feature, leading to spaghetti code and a bloated UI. A PRD forces you to write down exactly what the app does before you write any code.

## Strategic Guidance

### Hackathon Mode
Your PRD is basically just a feature list and an API integration plan. "We need to hit the OpenAI API, parse the JSON, and display it in a React table." Keep it purely functional and technical.

### Personal Project
Write down exactly what the web app must do to be useful to you. For example, "It must scrape X website every morning and email me a summary." Don't write a 10-page document; just a bulleted list of core functionalities.

### Production SaaS
The PRD must be comprehensive. It needs to cover the core user journey, edge cases, permission levels (Admin vs User), and integration requirements. This document will be used to brief developers, designers, and marketing teams.

## Implementation Steps
\`\`\`prompt
Act as an expert Product Manager. I am building a [Insert App Type]. My core MVP features are: [List MVP Features]. Help me draft a concise PRD. It should include: 1. Core Objective, 2. Target Audience, 3. Key User Flows, 4. Out of Scope (What we are NOT building).
\`\`\`

## Validation Checklist
- [ ] The PRD clearly defines what is "In Scope" and "Out of Scope".
- [ ] You have defined the core functionality in plain English.
- [ ] You have shared this with any collaborators to ensure alignment.
`,
  'webuserflows': `# User Flows

**Estimated Time:** 2 Hours

---

## Why this matters
User flows map out the specific path a user takes to complete a task (e.g., signing up, creating a project, exporting data). If you don't map these out, you will inevitably build dead-end pages or force users to click 7 times to do a simple task.

## Strategic Guidance

### Hackathon Mode
Focus exclusively on the "Demo Flow". What is the exact sequence of clicks you will perform on stage? Optimize that single path to look incredible and feel instantaneous.

### Personal Project
Keep flows extremely short. If you are building an internal dashboard, you shouldn't need a multi-step wizard. Put the core actions right on the home page to save yourself clicks.

### Production SaaS
You must map out complex flows including "Unhappy Paths". What happens if their credit card is declined during onboarding? What happens if they invite a team member who already has an account? You need a visual diagram (like a Mermaid chart or FigJam board) for these flows.

## Implementation Steps
\`\`\`prompt
Act as a UX Designer. My web app allows users to [Insert Core Action]. Map out the primary 'Happy Path' user flow from the moment they click 'Sign Up' to the moment they successfully complete the core action. Provide a step-by-step breakdown.
\`\`\`

## Validation Checklist
- [ ] The core flow has no unnecessary clicks or dead ends.
- [ ] You have considered what happens when a user fails a step (error states).
- [ ] The flow feels intuitive to a brand new user.
`,
  'webinformationarchitecture': `# Information Architecture

**Estimated Time:** 2 Hours

---

## Why this matters
Information Architecture (IA) is how you organize and label content on your web app. If your IA is bad, users will feel lost. Should "Billing" be under "Profile" or under "Workspace Settings"? Good IA prevents users from having to use the search bar for basic navigation.

## Strategic Guidance

### Hackathon Mode
Your IA should just be a single top-level navigation bar with 2 or 3 links. Don't build deep, nested menus for a hackathon. Keep everything accessible from the homepage.

### Personal Project
Organize things based on how often you use them. Put your daily actions front and center, and bury the configuration settings in a simple "Settings" dropdown.

### Production SaaS
You must design a scalable IA. If you plan to add 50 new features over the next 2 years, your sidebar or top-nav needs to accommodate them without breaking. Use standard SaaS conventions (e.g., Avatar top-right for profile/billing, Left sidebar for core app entities).

## Implementation Steps
\`\`\`prompt
Act as an Information Architect. My web app is a [Insert App Type] with these core features: [List Features]. Suggest a scalable navigation structure (e.g., Top Nav vs Left Sidebar) and categorize my features into logical groupings.
\`\`\`

## Validation Checklist
- [ ] Settings and profile configurations are separated from core workflows.
- [ ] The primary navigation is limited to 5-7 core items.
- [ ] The structure can accommodate future features without a complete redesign.
`,
  'webwireframes': `# Wireframes

**Estimated Time:** 3-5 Hours

---

## Why this matters
Wireframing is the process of sketching out the layout of your web app without worrying about colors, fonts, or styling. It forces you to focus entirely on layout, hierarchy, and functionality. Doing this in Figma (or on paper) is 10x faster than trying to design in code.

## Strategic Guidance

### Hackathon Mode
Skip high-fidelity wireframes. Sketch the 3 main screens on a piece of paper or an iPad just to agree on where the main buttons go, then immediately jump into a UI component library (like shadcn/ui) to build it.

### Personal Project
Use a tool like Excalidraw or a notebook. Just map out where the data tables, charts, and input forms will live so you don't have to think about layout while writing React code.

### Production SaaS
You must build mid-fidelity wireframes in Figma or a similar tool. You need to validate the layout with potential users before you build. Test whether users can intuitively find the "Export" button or understand the data hierarchy before you lock in the design.

## Implementation Steps
\`\`\`prompt
Act as a UI Designer. I am building the main dashboard for my web app. The goal of the dashboard is to show [Insert Data/Metrics]. Provide a text-based wireframe layout (Top Nav, Sidebar, Main Content Area) and suggest where the most important elements should be placed for maximum visibility.
\`\`\`

## Validation Checklist
- [ ] You have wireframed the core screens (Dashboard, Settings, Core Action).
- [ ] The layout prioritizes the most important information.
- [ ] You have not wasted time on colors or fonts yet.
`,
  'webdesignsystem': `# Design System

**Estimated Time:** 2-3 Hours

---

## Why this matters
A design system (or style guide) ensures your web app looks cohesive. Without predefined colors, typography, and spacing variables, your app will end up with 15 different shades of blue and inconsistent padding, making it look cheap and unprofessional.

## Strategic Guidance

### Hackathon Mode
Pick a pre-built component library like shadcn/ui or Chakra UI. Pick one primary brand color, a dark mode toggle, and rely entirely on the library's default styling to ensure consistency at high speed.

### Personal Project
Tailwind CSS is your best friend here. Just use the default Tailwind color palette (e.g., Slate for backgrounds, Indigo for primary actions) and Inter for typography. Keep it clean and simple.

### Production SaaS
You need a strict set of design tokens (CSS variables or Tailwind config). You must define exact hex codes for Primary, Secondary, Destructive, Warning, and Success states. You also need a defined typography scale (H1-H6) and consistent border radiuses.

## Implementation Steps
\`\`\`prompt
Act as a UI/UX Designer. I want my web app to feel [Insert Vibe, e.g., Modern, Playful, Enterprise-grade]. Suggest a complete color palette (Primary, Secondary, Background, Text, and Accent colors with Hex codes) and a primary Google Font pairing that matches this vibe.
\`\`\`

## Validation Checklist
- [ ] You have defined a primary brand color and a contrasting accent color.
- [ ] You have selected a readable, modern typeface (e.g., Inter, Roboto, Outfit).
- [ ] You have established a consistent approach for spacing (e.g., using a 4px/8px grid).
`,
  'webbranding': `# Branding

**Estimated Time:** 1-2 Hours

---

## Why this matters
Branding is more than just a logo; it is the personality and tone of your web app. A strong brand builds trust. If your app is an AI medical tool, the branding should be sterile, blue, and trustworthy. If it's a social app, it should be vibrant and energetic.

## Strategic Guidance

### Hackathon Mode
Use an AI image generator or an icon library (like Lucide or Heroicons) to grab a slick, modern logo in 5 minutes. Pick a catchy, one-word domain name (even if you just use a \`.vercel.app\` subdomain).

### Personal Project
Branding doesn't matter here unless you plan to open-source it or show it off on Twitter. Pick an emoji as your favicon and move on.

### Production SaaS
You need a cohesive brand identity. This includes a memorable name, a professional logo (SVG format), a defined tone of voice for all copy (e.g., casual vs formal), and high-quality OpenGraph images for social media sharing. Your landing page must reflect this brand perfectly.

## Define the Vibe
\`\`\`input
What is the core personality of your web app? (e.g., "Professional and secure," "Fast and cutting-edge," "Friendly and accessible").
\`\`\`

## Validation Checklist
- [ ] You have a name for the product.
- [ ] You have a simple, scalable logo or icon.
- [ ] You know the "tone of voice" your UI copy should use.
`,
  'webaccessibility': `# Accessibility (a11y)

**Estimated Time:** 1-2 Hours

---

## Why this matters
Building accessible web apps ensures that users with disabilities (e.g., visual impairments, motor difficulties) can use your product. In many regions, this is also a legal requirement for business software. Good accessibility also improves SEO and overall usability for everyone.

## Strategic Guidance

### Hackathon Mode
Don't worry about ARIA labels or screen readers for a 24-hour hackathon, but DO ensure your primary brand colors have enough contrast so the judges can actually read your text on a projector.

### Personal Project
If you don't have accessibility needs, you can skip deep a11y work. However, using semantic HTML (e.g., \`<button>\` instead of \`<div onClick>\`) is a good habit that takes zero extra effort.

### Production SaaS
You must aim for WCAG AA compliance. This means strict color contrast ratios, keyboard navigation support (users must be able to use your app without a mouse), focus states on all interactive elements, and proper ARIA labels for screen readers.

## Implementation Steps
\`\`\`prompt
Act as a Web Accessibility Expert. What are the top 5 most common accessibility mistakes developers make when building React/Tailwind web apps, and how can I avoid them during the initial build phase?
\`\`\`

## Validation Checklist
- [ ] Text has sufficient color contrast against its background.
- [ ] Interactive elements have distinct hover and focus states.
- [ ] You are using semantic HTML elements correctly.
`,
  'webemptystates': `# Empty States

**Estimated Time:** 1 Hour

---

## Why this matters
An empty state is what a user sees when there is no data to display (e.g., a brand new dashboard, or a search with zero results). If an empty state is just a blank white screen, users will assume the app is broken. Good empty states drive engagement by telling the user exactly what to do next.

## Strategic Guidance

### Hackathon Mode
You will likely seed your database with fake data before the demo, so you rarely hit empty states. If you do, a simple text message like "No data found." is sufficient.

### Personal Project
You know how the app works, so a blank table won't confuse you. Just ensure the UI doesn't crash if an array is empty.

### Production SaaS
Empty states are critical onboarding moments. A new user's dashboard should never be empty. It should have a beautiful illustration, a clear explanation of what goes there, and a massive primary button saying "Create your first X". Treat empty states as a marketing opportunity.

## Implementation Steps
\`\`\`prompt
Act as a UX Writer. My web app is a [Insert App Type]. When a user first logs in, their primary dashboard will have zero data. Write the copy (Heading, Subheading, and Call-to-Action button text) for this empty state to encourage them to take their first action.
\`\`\`

## Validation Checklist
- [ ] Every major data table or list has a designed empty state.
- [ ] Empty states explain *why* it is empty.
- [ ] Empty states provide a clear Call-to-Action (CTA) to create data.
`,
  'weberrorstates': `# Error States

**Estimated Time:** 1-2 Hours

---

## Why this matters
Things will break. APIs will fail, users will lose internet connection, and validation will reject inputs. How you handle these errors determines whether a user tries again or closes the tab forever. A generic "Something went wrong" alert is unacceptable in modern web apps.

## Strategic Guidance

### Hackathon Mode
If your hackathon demo hits an error state, you have failed the demo. Focus on making sure the "Happy Path" is bulletproof rather than designing beautiful 404 pages.

### Personal Project
Console logging the error or showing a simple browser \`alert()\` is often enough when you are the only user. Just make sure you know *why* it failed so you can fix it.

### Production SaaS
You must handle form validation errors (inline, before submission), server errors (toast notifications), and catastrophic crashes (fallback error boundaries). The error copy should never blame the user, and should always offer a path to resolution (e.g., "Please check your connection and try again").

## Implementation Steps
\`\`\`prompt
Act as a Frontend Architect. I am building a React web app. What are the best practices for handling and displaying errors to the user? Specifically, how should I handle 1. Inline form validation errors, and 2. Global API failures?
\`\`\`

## Validation Checklist
- [ ] Forms have clear, inline validation error messages.
- [ ] API failures display user-friendly toast notifications, not raw JSON.
- [ ] You have a custom 404 Not Found page.
`,
  'webloadingstates': `# Loading States

**Estimated Time:** 1 Hour

---

## Why this matters
Web apps pull data from servers, which takes time. If the screen freezes without any visual feedback, users will click buttons multiple times or refresh the page, causing more issues. Loading states manage user expectations and make the app feel faster.

## Strategic Guidance

### Hackathon Mode
A simple, spinning circle (spinner) in the middle of the screen or inside a button is perfectly fine. It shows the judges the app is processing data.

### Personal Project
Spinners are great. You don't need complex skeleton loaders for an internal tool. Just prevent button double-clicks while loading.

### Production SaaS
You should implement Skeleton Loaders for massive data fetching (showing the shape of the content before it loads). For buttons, the text should swap to a spinner and disable the button to prevent duplicate submissions. You must optimize for perceived performance.

## Implementation Steps
\`\`\`prompt
Act as a UI Designer. When should I use a full-page spinner, an inline button spinner, and a skeleton loader in a modern web application? Provide specific examples of when each is appropriate.
\`\`\`

## Validation Checklist
- [ ] Submit buttons have a loading state and disable themselves while processing.
- [ ] Large dashboard widgets have skeleton loaders or spinners.
- [ ] The app never "freezes" without visual feedback.
`,
  'websitemap': `# Sitemap

**Estimated Time:** 1 Hour

---

## Why this matters
A sitemap is a list of all the pages in your web app and how they link together. It acts as the blueprint for your frontend routing (e.g., React Router, Next.js App Router). If you don't list out your routes, you will end up with messy, inconsistent URL structures.

## Strategic Guidance

### Hackathon Mode
You only need 2 or 3 routes. \`/\` for the landing/auth page, and \`/dashboard\` for the main hack. Keep routing as simple as possible.

### Personal Project
Keep the URLs functional. You probably don't need dynamic routing (like \`/users/:id\`) unless the tool specifically requires deep linking.

### Production SaaS
You need a strict, scalable URL schema. Use RESTful conventions (e.g., \`/projects/[projectId]/settings\`). You must also map out public routes (Landing, Pricing, Login) vs protected routes (Dashboard, Settings).

## Implementation Steps
\`\`\`prompt
Act as a Frontend Developer. My web app is a [Insert App Type] with features like [Insert Core Features]. Draft a clean, RESTful URL schema/sitemap for my application. Separate the Public Routes from the Protected (Auth-required) Routes.
\`\`\`

## Validation Checklist
- [ ] You have a clear list of all necessary pages/routes.
- [ ] You have identified which routes require authentication.
- [ ] The URL structure is logical and scalable.
`,
  'webtechstack': `# Tech Stack Selection

**Estimated Time:** 1-2 Hours

---

## Why this matters
Your tech stack determines how fast you can build, how easily you can hire developers later, and how much your server bills will be. Choosing a niche, unproven language might sound fun, but it will lead to countless headaches when you need a specific library and it doesn't exist.

## Strategic Guidance

### Hackathon Mode
Use what you know. This is not the time to learn a new framework. If you know React, use React. If you know Python, use Django/Flask. Pick a stack that allows you to deploy to Vercel or Heroku in exactly 1 click.

### Personal Project
This is the perfect time to learn something new. If you want to learn SvelteKit or Rust, use it! Optimize for developer experience (DX) and free tiers. Next.js + Supabase + Vercel is a killer combo for free, zero-config hosting.

### Production SaaS
Boring is better. Use industry-standard tools with massive ecosystems. React/Next.js for the frontend, Node/Python/Go for the backend, and PostgreSQL for the database. Avoid "hype" frameworks that haven't proven themselves in production over multiple years.

## Implementation Steps
\`\`\`prompt
Act as a Senior Web Architect. I am building a [Insert App Type] with the following core requirements: [List Requirements]. Suggest 3 different tech stacks (Frontend, Backend, Database, Hosting) ranging from 'Easiest to Build' to 'Most Scalable', and recommend the best one for my use case.
\`\`\`

## Validation Checklist
- [ ] You have selected a Frontend framework.
- [ ] You have selected a Backend language/framework.
- [ ] You have selected a Database type (SQL vs NoSQL).
`,
  'webfrontendarchitecture': `# Frontend Architecture

**Estimated Time:** 2-3 Hours

---

## Why this matters
Frontend architecture dictates how your UI code is structured. If you just throw all your React components into a single folder, your codebase will become an unmaintainable nightmare within weeks. You need a structured approach to state management, routing, and component hierarchy.

## Strategic Guidance

### Hackathon Mode
Just put everything in \`src/components\` and use local state (\`useState\`). Don't waste time setting up Redux or complex folder structures. Move fast and break things.

### Personal Project
Keep it simple but organized. Group your files by feature (e.g., \`src/features/auth \`src/features/dashboard\`) rather than by type (\`src/components \`src/hooks\`). Use React Context or Zustand for global state.

### Production SaaS
You must establish strict architectural boundaries. Use a framework like Next.js App Router for built-in conventions. Implement robust server-state management (like React Query or Apollo), enforce a strict component library isolation, and ensure high testability.

## Implementation Steps
\`\`\`prompt
Act as a Lead Frontend Engineer. I am starting a new React web app using [Insert Framework, e.g., Next.js/Vite]. Suggest a scalable folder structure and recommend the best libraries for: 1. Global State Management, 2. Server Data Fetching, and 3. Form Handling.
\`\`\`

## Validation Checklist
- [ ] You have a defined folder structure (e.g., Feature-based routing).
- [ ] You have selected a state management strategy.
- [ ] You have a plan for handling forms and validation.
`,
  'webbackendarchitecture': `# Backend Architecture

**Estimated Time:** 2-4 Hours

---

## Why this matters
Your backend is the brain of your web app. It handles business logic, security, and data processing. A poorly designed backend leads to slow load times, security vulnerabilities, and massive technical debt as you attempt to scale.

## Strategic Guidance

### Hackathon Mode
Use a Backend-as-a-Service (BaaS) like Supabase or Firebase. Don't write your own custom Node.js server unless your hack relies on a very specific custom backend script. BaaS gives you a database, auth, and APIs instantly.

### Personal Project
BaaS is also great here. Alternatively, if you want to write a custom backend, stick to a monolith (e.g., a single Express.js or Django app). Do not build microservices for a personal project.

### Production SaaS
Choose between a robust Monolithic architecture (highly recommended for starting out) or a Serverless approach (e.g., AWS Lambda, Vercel Functions). Avoid microservices until your engineering team is too large to work in a single repository. Ensure you have clear separation between your routing, controllers, and database access layers.

## Implementation Steps
\`\`\`prompt
Act as a Backend Architect. I am building a [Insert App Type]. Should I use a Backend-as-a-Service (like Supabase), a Serverless approach, or a traditional Monolith? Provide the pros and cons of each for my specific use case.
\`\`\`

## Validation Checklist
- [ ] You have decided between BaaS, Serverless, or a Custom Server.
- [ ] If custom, you have chosen a framework (e.g., Express, NestJS, Django).
- [ ] You have a plan for separating business logic from routing.
`,
  'webapidesign': `# API Design

**Estimated Time:** 2-3 Hours

---

## Why this matters
APIs are how your frontend talks to your backend. If your API is poorly designed, your frontend will have to make 10 requests just to load a single dashboard, resulting in a sluggish user experience.

## Strategic Guidance

### Hackathon Mode
Just expose the raw database queries directly to the frontend (e.g., via Supabase client). Don't waste time meticulously designing REST endpoints.

### Personal Project
Build a simple REST API. Follow basic conventions (GET for fetching, POST for creating, PUT/PATCH for updating, DELETE for deleting). Don't overcomplicate it with GraphQL unless you specifically want to learn it.

### Production SaaS
You must design a strict, versioned API (e.g., \`/api/v1/users\`). Choose between REST, GraphQL, or tRPC based on your team's expertise. Document your API using OpenAPI/Swagger, and ensure every endpoint has strict input validation (e.g., using Zod) to prevent malicious payloads.

## Implementation Steps
\`\`\`prompt
Act as an API Designer. My web app requires the frontend to fetch [Insert Core Data] and submit [Insert Form Data]. Design the RESTful API endpoints for these actions. Include the HTTP Method, Endpoint URL, and a sample JSON Request/Response body for each.
\`\`\`

## Validation Checklist
- [ ] You have defined the endpoints for your core user flows.
- [ ] You are using standard HTTP methods correctly.
- [ ] You have a plan for input validation.
`,
  'webauthentication': `# Authentication

**Estimated Time:** 1-2 Hours

---

## Why this matters
Authentication proves *who* a user is. Building secure authentication from scratch (hashing passwords, managing session cookies, handling password resets) is incredibly difficult and risky. If you mess it up, you expose your users to massive security breaches.

## Strategic Guidance

### Hackathon Mode
Use Magic Links or Google OAuth via Supabase/Firebase Auth. It takes 10 minutes to set up and requires zero UI for password resets.

### Personal Project
Stick to managed authentication providers like Clerk, Supabase Auth, or Auth0. They handle all the annoying edge cases for free.

### Production SaaS
Managed Auth is still highly recommended (Clerk, WorkOS). If you must build it yourself, use established libraries (like NextAuth/Auth.js or Passport.js), enforce strong password policies, implement Rate Limiting on login routes, and support Multi-Factor Authentication (MFA).

## Implementation Steps
\`\`\`prompt
Act as a Security Engineer. I am building a web app using [Insert Stack]. Recommend the best Authentication strategy (e.g., JWT vs Session Cookies, Managed Auth vs Custom). What are the critical security risks I need to mitigate during login?
\`\`\`

## Validation Checklist
- [ ] You have chosen an Authentication provider/library.
- [ ] You support secure password resets or passwordless login.
- [ ] You have a secure way to store the session on the frontend (e.g., HttpOnly cookies).
`,
  'webdatabaseschema': `# Database Schema

**Estimated Time:** 3-4 Hours

---

## Why this matters
Your database schema is the foundation of your app. If you structure your tables poorly, you will end up writing agonizingly slow SQL queries or dealing with massive data duplication. It is very hard to migrate a bad schema once users are live.

## Strategic Guidance

### Hackathon Mode
Use a NoSQL database like Firebase Firestore, or a highly flexible SQL setup. Don't worry about perfect normalization. Just create a \`users\` collection and a \`posts\` collection and dump JSON into them.

### Personal Project
Use PostgreSQL. Map out your core tables visually using a tool like dbdiagram.io before you write any code. It saves hours of refactoring.

### Production SaaS
Use a relational database (PostgreSQL is the gold standard). You must heavily normalize your data, define strict Foreign Key constraints, and utilize an ORM (like Prisma or Drizzle) or a query builder to ensure type-safe database access. Plan for multi-tenancy (how data is isolated between different customer accounts) from Day 1.

## Define the Entities
\`\`\`input
What are the core "Nouns" in your application? (e.g., Users, Projects, Tasks, Comments).
\`\`\`

## Implementation Steps
\`\`\`prompt
Act as a Database Administrator. My core entities are: [List Entities]. I am using a relational database. Design a normalized database schema. Provide the SQL table definitions (or Prisma schema) including Primary Keys, Foreign Keys, and essential columns.
\`\`\`

## Validation Checklist
- [ ] You have defined the Primary and Foreign keys for all tables.
- [ ] You understand the relationships (One-to-One, One-to-Many, Many-to-Many).
- [ ] You have accounted for standard timestamps (\`created_at \`updated_at\`).
`,
  'webfilestorage': `# File Storage

**Estimated Time:** 1-2 Hours

---

## Why this matters
If your app allows users to upload avatars, images, or documents, you cannot store those files in your database. You need a dedicated object storage solution. Handling file uploads incorrectly can crash your server or expose you to malware.

## Strategic Guidance

### Hackathon Mode
If you need image uploads, use an API like Cloudinary or Supabase Storage. They provide simple APIs to upload a file directly from the browser and give you a URL back.

### Personal Project
AWS S3 (or an S3-compatible service like Cloudflare R2 or DigitalOcean Spaces) is the industry standard. R2 is particularly great because it has zero egress fees.

### Production SaaS
Never process massive file uploads directly through your core API server—it will block other requests. Generate a "Presigned URL" on your backend, and have the frontend upload the file *directly* to the S3 bucket. Ensure you validate file types and sizes before upload to prevent abuse.

## Implementation Steps
\`\`\`prompt
Act as a Cloud Architect. My web app needs to allow users to upload [Insert File Types, e.g., High-Res Images, PDFs]. How should I architect the file upload flow to ensure my main server doesn't crash? Explain how 'Presigned URLs' work.
\`\`\`

## Validation Checklist
- [ ] You have selected an Object Storage provider (e.g., AWS S3, Cloudflare R2).
- [ ] You restrict the allowed file types (e.g., only \`.jpg \`.png\`).
- [ ] You enforce a maximum file size limit.
`,
  'webcostestimation': `# Cost Estimation

**Estimated Time:** 1 Hour

---

## Why this matters
Cloud providers make it incredibly easy to accidentally rack up a $5,000 bill overnight. Understanding how your tech stack scales financially ensures you don't go bankrupt before your app even launches.

## Strategic Guidance

### Hackathon Mode
Everything must be free. Vercel for frontend, Supabase for backend. Don't put your credit card into AWS during a hackathon.

### Personal Project
Utilize "Generous Free Tiers". Vercel/Netlify for hosting, PlanetScale or Supabase for DB, Resend for emails. Your monthly run rate should be exactly $0.00.

### Production SaaS
You need to estimate your unit economics. How much does it cost to serve 1,000 active users? Factor in Database Compute, Egress (bandwidth), Third-Party API costs (e.g., OpenAI API tokens), and Email providers. Set up strict billing alerts on day one.

## Implementation Steps
\`\`\`prompt
Act as a DevOps Cloud Expert. My stack is [Insert Stack]. I expect to have [Insert Expected User Count] daily active users performing [Insert Core Action]. Estimate my monthly server and API costs. Highlight any "hidden" fees (like bandwidth/egress) I need to watch out for.
\`\`\`

## Validation Checklist
- [ ] You have confirmed that your initial stack fits within free tiers.
- [ ] You have set up billing alerts on your cloud provider.
- [ ] You know which piece of your infrastructure will be the most expensive as you scale.
`,
  'webfundamentals': `# Web Fundamentals

**Estimated Time:** 1 Hour

---

## Why this matters
Modern frameworks (like React and Next.js) abstract away a lot of the underlying browser mechanics. If you don't understand basic web fundamentals—like how the DOM works, what CORS is, and the difference between LocalStorage and Cookies—you will struggle to debug mysterious errors.

## Strategic Guidance

### Hackathon Mode
If you get a CORS error, just install a Chrome extension to bypass it or use a proxy. Don't waste time studying HTTP protocols while the clock is ticking.

### Personal Project
Take the time to understand the errors you hit. Learn the difference between \`let \`const and \`var\`. Understand how asynchronous JavaScript (\`Promises\` and \`async/await\`) actually works.

### Production SaaS
Your engineering team must understand the underlying platform. You need strict rules for SEO (semantic HTML, proper meta tags), Web Vitals (LCP, CLS, FID), and Cross-Origin Resource Sharing (CORS) security policies. You cannot rely purely on framework magic in a production environment.

## Implementation Steps
\`\`\`prompt
Act as a Senior Frontend Developer. Explain the following Web Fundamentals in simple terms: 1. CORS (Cross-Origin Resource Sharing), 2. The DOM (Document Object Model), and 3. The difference between LocalStorage, SessionStorage, and HttpOnly Cookies.
\`\`\`

## Validation Checklist
- [ ] You understand how data persists in the browser.
- [ ] You know how to read the Network tab in Chrome DevTools to debug API calls.
- [ ] You understand basic asynchronous JavaScript.
`,
  'webauthorization': `# Authorization

**Estimated Time:** 2 Hours

---

## Why this matters
Authentication is *who* you are. **Authorization** is *what you are allowed to do*. If you fail to implement proper authorization, any logged-in user might be able to edit another user's profile, view sensitive admin data, or delete the entire database.

## Strategic Guidance

### Hackathon Mode
Hardcode your own user ID as the "Admin". If \`user.id === '123' show the admin dashboard. Ignore complex role-based systems entirely.

### Personal Project
You likely only have one role (User). Ensure that every API endpoint checks that the user requesting the data actually owns the data (e.g., \`SELECT * FROM posts WHERE user_id = current_user\`).

### Production SaaS
You need a robust Role-Based Access Control (RBAC) system. Define distinct roles (e.g., Owner, Admin, Member, Viewer). You must enforce authorization on *both* the frontend (hiding buttons) and the backend (rejecting API calls). Never trust the frontend—always verify permissions on the server.

## Implementation Steps
\`\`\`prompt
Act as a Security Architect. I am building a B2B SaaS application. Help me design a Role-Based Access Control (RBAC) matrix. What roles do I need, and how should I securely enforce these roles on my backend API endpoints?
\`\`\`

## Validation Checklist
- [ ] Backend API endpoints verify that the user *owns* the resource before modifying it.
- [ ] You have defined clear user roles (Admin vs User).
- [ ] Sensitive UI elements are hidden from unauthorized users.
`,
  'websearchsystem': `# Search System

**Estimated Time:** 2-3 Hours

---

## Why this matters
As your app generates data, users need a way to find it. Standard SQL \`LIKE\` queries become incredibly slow and inaccurate as data grows. A good search experience (fast, typo-tolerant) is a hallmark of a premium web app.

## Strategic Guidance

### Hackathon Mode
Just fetch all the data to the frontend and use a simple JavaScript \`.filter()\` array method to search through it instantly.

### Personal Project
Use basic SQL queries with \`ILIKE\` or \`MATCH\`. It's good enough for thousands of rows and requires zero extra infrastructure.

### Production SaaS
If search is a core feature (e.g., an e-commerce catalog), you need a dedicated search engine. Implement Algolia, Meilisearch, or Elasticsearch. These tools provide instant results, typo tolerance, and complex facet filtering out of the box, drastically improving the UX.

## Implementation Steps
\`\`\`prompt
Act as a Database Architect. My web app requires users to search through [Insert Data Type, e.g., 100,000 product listings]. Should I use standard SQL queries, or do I need a dedicated search engine like Algolia/Meilisearch? Compare the implementation effort and performance.
\`\`\`

## Validation Checklist
- [ ] You have chosen a search strategy (Frontend Filter vs SQL vs Dedicated Engine).
- [ ] The search UI includes loading states while querying.
- [ ] You have considered whether search results need pagination.
`,
  'webthirdpartyintegrations': `# Third-Party Integrations

**Estimated Time:** 2-4 Hours

---

## Why this matters
You shouldn't reinvent the wheel. Need to send emails? Need to process credit cards? Need analytics? You will use third-party APIs (Stripe, Resend, Mixpanel). Understanding how to integrate these securely is critical to modern web development.

## Strategic Guidance

### Hackathon Mode
Use Zapier or Make.com if possible. If you must use code, use the official SDKs (e.g., Stripe Node SDK) and don't worry too much about webhooks. Just make the API call and assume it worked.

### Personal Project
Keep integrations to an absolute minimum. Every integration adds complexity and potential points of failure. Start with just Resend for emails and maybe Stripe for payments if necessary.

### Production SaaS
You must build robust webhook handlers. When Stripe charges a user, it sends a webhook to your server. Your server must cryptographically verify the webhook signature, process the event, and handle retries if your server goes down. Store third-party API keys securely in environment variables—never hardcode them.

## Implementation Steps
\`\`\`prompt
Act as a Senior Backend Engineer. I need to integrate [Insert Third-Party Service, e.g., Stripe for payments] into my web app. Walk me through the architecture of securely handling webhooks and keeping my database synchronized with their system.
\`\`\`

## Validation Checklist
- [ ] You have identified which 3rd-party services are absolutely necessary.
- [ ] You know how to securely store API keys using \`.env\` files.
- [ ] You have a plan for handling incoming webhooks securely.
`,
  'webaifeatures': `# AI Features (Optional)

**Estimated Time:** 2-5 Hours

---

## Why this matters
AI is the new default. Adding LLM capabilities (like text generation, summarization, or semantic search) can turn a generic web app into a high-value product. However, integrating AI poorly leads to slow responses, massive API bills, and unpredictable outputs.

## Strategic Guidance

### Hackathon Mode
Just hit the OpenAI API directly from your frontend (or a simple serverless function). Use a pre-built UI library like Vercel AI SDK to get streaming text working in 5 minutes. The "Wow" factor of AI is perfect for hackathons.

### Personal Project
Experiment with different models. You don't have to use GPT-4. Try Anthropic's Claude for better writing, or use an open-source model via an API provider like Groq for blazing-fast, cheap responses.

### Production SaaS
AI features in production require serious architecture. You must stream responses to the frontend so the user isn't waiting 10 seconds staring at a spinner. You must implement strict prompt injection defenses, rate limiting (to prevent users from bankrupting your API quota), and robust error handling when the LLM provider goes down.

## Implementation Steps
\`\`\`prompt
Act as an AI Engineer. I want to add a feature to my web app that takes [Insert User Input] and uses an LLM to generate [Insert Desired Output]. What is the best API to use for this, and how do I format the System Prompt to ensure the AI doesn't hallucinate or output the wrong format?
\`\`\`

## Validation Checklist
- [ ] You have selected an LLM Provider (OpenAI, Anthropic, Google, etc.).
- [ ] You have designed a robust System Prompt.
- [ ] You have a plan to stream the response to the frontend UI.
`,
  'webauthdev': `# Authentication Development

**Estimated Time:** 2-4 Hours

---

## Why this matters
Authentication is the first major roadblock in most web projects. If users can't securely sign up, log in, or reset their passwords, the rest of your app is useless. Implementing this securely from day one is critical.

## Strategic Guidance

### Hackathon Mode
Don't write a custom login page. Use a pre-built UI library like \`@supabase/auth-ui-react\` or Clerk's \`<SignIn />\` component. Drop it on the \`/login\` route and move on.

### Personal Project
Set up Google OAuth. It saves you the headache of building "Forgot Password" flows. If you are using Supabase or Firebase, enabling OAuth takes exactly one click in their dashboard.

### Production SaaS
You must implement a robust auth flow. This includes Email/Password (with strict validation), Social OAuth, Magic Links, and potentially Multi-Factor Authentication (MFA). You also need to build secure protected routes in your frontend framework (e.g., Next.js middleware) that redirect unauthenticated users back to \`/login\`.

## Implementation Steps
\`\`\`prompt
Act as a Full Stack Engineer. I am using [Insert Auth Provider, e.g., Supabase, Clerk] with [Insert Frontend Framework]. Provide the code to: 1. Set up the Auth Provider wrapper/context, 2. Create a generic Login/Signup component, and 3. Protect my '/dashboard' route so only authenticated users can access it.
\`\`\`

## Validation Checklist
- [ ] Users can successfully create an account.
- [ ] Users can log out and their session is securely destroyed.
- [ ] Unauthenticated users are redirected when trying to access protected routes.
`,
  'webdatabasedev': `# Database Development

**Estimated Time:** 3-5 Hours

---

## Why this matters
Your database schema from Phase 2 needs to become real code. Whether you are writing raw SQL migrations or defining an ORM schema, this step dictates how your app reads and writes data. If you skip setting up migrations, you will eventually corrupt your production data.

## Strategic Guidance

### Hackathon Mode
Log into the Supabase or Firebase dashboard and just click "New Table" to manually create your schema. Don't waste time configuring Prisma or running local migrations.

### Personal Project
Using an ORM like Prisma or Drizzle is highly recommended here. It gives you incredible TypeScript autocompletion on the frontend, which speeds up development massively.

### Production SaaS
You must use a strict migration system. Never modify the production database schema manually via a GUI. Define your schema using Prisma, Drizzle, or raw SQL migrations (e.g., Flyway). Set up Row-Level Security (RLS) if you are using Supabase, or strict backend access controls if you are using a custom server.

## Implementation Steps
\`\`\`prompt
Act as a Database Administrator. I have chosen [Insert Database/ORM, e.g., PostgreSQL with Prisma]. My schema needs to include [List 2-3 Core Tables]. Write the exact schema definition code (e.g., schema.prisma or SQL CREATE TABLE statements) including relationships and timestamp columns.
\`\`\`

## Validation Checklist
- [ ] Your local database is running and connected to your app.
- [ ] All core tables have been created with Primary Keys.
- [ ] You have successfully inserted a test row into the database.
`,
  'webbackenddev': `# Backend Development

**Estimated Time:** 4-8 Hours

---

## Why this matters
The backend executes the business logic. It handles the API requests from your frontend, verifies user permissions, talks to the database, and formats the response. A clean, modular backend is the difference between a scalable SaaS and an unmaintainable mess.

## Strategic Guidance

### Hackathon Mode
If you are using Next.js, just write all your logic inside Next.js Server Actions or API routes. If you are using Supabase, write the logic directly in the frontend using the Supabase JS client.

### Personal Project
Keep your API routes simple. Create a dedicated folder for your controllers/handlers. Don't over-engineer abstractions like "Repositories" or "Services" unless the project is massive.

### Production SaaS
You must build a robust, secure API. Ensure every endpoint: 1. Authenticates the user, 2. Authorizes the action (does the user own this resource?), 3. Validates the incoming payload (using Zod or Joi), and 4. Handles errors gracefully without crashing the server.

## Implementation Steps
\`\`\`prompt
Act as a Senior Backend Engineer. I am building a [Insert Framework, e.g., Node/Express, Next.js API] backend. Write a robust API endpoint that handles creating a new [Insert Resource Name]. Include payload validation (using Zod), authentication checks, and standard error handling.
\`\`\`

## Validation Checklist
- [ ] Your backend server starts without errors.
- [ ] You have a standard way of validating incoming API requests.
- [ ] Sensitive business logic is completely hidden from the frontend code.
`,
  'webfrontenddev': `# Frontend Development

**Estimated Time:** 8-15 Hours

---

## Why this matters
The frontend is what the user actually sees and touches. If it is laggy, ugly, or unintuitive, they will close the tab. This phase involves turning your wireframes and design system into actual React/Vue components and wiring them up to the backend.

## Strategic Guidance

### Hackathon Mode
Use a pre-built admin dashboard template or heavily rely on a UI library like shadcn/ui. Build the "Happy Path" first. Hardcode data if the backend isn't ready.

### Personal Project
Build modular components. Start by building the "atoms" (Buttons, Inputs, Cards) and then assemble them into the main pages. Use Tailwind CSS to style things quickly without jumping between CSS files.

### Production SaaS
You must focus on component reusability, accessibility (a11y), and state management. Use Server Components (if using Next.js App Router) for static data to improve SEO and load times, and Client Components strictly for interactive elements. Implement React Query for robust client-side data fetching and caching.

## Implementation Steps
\`\`\`prompt
Act as a Frontend Expert. I need to build a complex UI component for [Insert Feature, e.g., a Data Table with sorting and filtering]. I am using [Insert UI Library like Tailwind/shadcn]. Provide the React code for this component, ensuring it is modular, accessible, and ready to accept data via props.
\`\`\`

## Validation Checklist
- [ ] Core UI components match the design system.
- [ ] The app is responsive on mobile and desktop browsers.
- [ ] You have wired up the frontend to fetch real data from your backend API.
`,
  'webapisdev': `# API Integration

**Estimated Time:** 2-4 Hours

---

## Why this matters
Your frontend needs to talk to your backend. If you don't standardize how your frontend makes HTTP requests, you will end up with messy \`fetch\` calls scattered everywhere, inconsistent error handling, and massive headaches when you need to change a base URL.

## Strategic Guidance

### Hackathon Mode
Just use \`fetch\` or \`axios\` directly inside your \`useEffect\` blocks or button \`onClick\` handlers.

### Personal Project
Create a central \`api.ts\` file that exports configured Axios instances or wrapped \`fetch\` functions. This ensures all requests automatically include the correct authentication headers and base URLs.

### Production SaaS
You must use a robust data-fetching library like React Query (TanStack Query) or SWR. These libraries handle caching, automatic retries, background refetching, and complex loading/error states for you. If you are using Next.js App Router, leverage React Server Components for initial data loads.

## Implementation Steps
\`\`\`prompt
Act as a Frontend Architect. I am building a React app and need to fetch data from my backend API. Provide a robust example of how to fetch a list of [Insert Resource, e.g., Projects] using [Insert Library, e.g., React Query or native fetch]. Include loading and error state handling.
\`\`\`

## Validation Checklist
- [ ] All API calls use a centralized base URL (usually via environment variables).
- [ ] Auth tokens are automatically injected into request headers.
- [ ] Loading and Error states are properly handled in the UI.
`,
  'webnotificationsdev': `# In-App Notifications

**Estimated Time:** 2-4 Hours

---

## Why this matters
Users need to know when something happens in your app (e.g., "Export complete", "New comment on your post", "Error saving data"). Without in-app notifications, users are left guessing whether their actions actually worked.

## Strategic Guidance

### Hackathon Mode
Use a simple Toast library like \`react-hot-toast\` or \`sonner\`. Trigger a green toast when an action succeeds, and a red toast when it fails.

### Personal Project
Toasts are perfect. You likely don't need a persistent "Notification Bell" dropdown unless the app specifically relies on asynchronous collaboration.

### Production SaaS
You need both Ephemeral Notifications (Toasts for success/error messages) and Persistent Notifications (A bell icon dropdown for things like "User X mentioned you"). Persistent notifications require a dedicated database table (\`notifications\`) and real-time updates (e.g., via WebSockets or Supabase Realtime).

## Implementation Steps
\`\`\`prompt
Act as a Frontend Developer. I want to add Toast notifications to my React app using [Insert Library, e.g., sonner or react-toastify]. Provide the code to set up the global Toast provider, and show an example of triggering a Success toast after an API call finishes.
\`\`\`

## Validation Checklist
- [ ] Success/Error toasts appear after critical user actions.
- [ ] Toasts disappear automatically after a few seconds.
- [ ] (Production) A persistent notification system is implemented for important alerts.
`,
  'websearchdev': `# Search Implementation

**Estimated Time:** 2-4 Hours

---

## Why this matters
As your application grows, users will refuse to paginate through 50 pages of data to find what they need. A robust search implementation is often the primary way power users navigate a SaaS application.

## Strategic Guidance

### Hackathon Mode
Just fetch the entire array of data from the database on page load and use a simple JavaScript \`array.filter()\` tied to a text input.

### Personal Project
Implement a basic SQL \`ILIKE\` or full-text search query on your backend. Ensure the search input is "debounced" on the frontend (waiting 300ms after the user stops typing before making the API call) to avoid spamming your database.

### Production SaaS
Integrate a dedicated search engine (Algolia, Meilisearch, or Elasticsearch). You must set up a pipeline to sync your primary database with the search engine whenever a record is created, updated, or deleted. The frontend should query the search engine directly for lightning-fast results.

## Implementation Steps
\`\`\`prompt
Act as a Full Stack Engineer. I need to implement a search bar that queries my [Insert Database/Engine]. Provide the React code for a debounced search input, and the corresponding Backend code to execute the search query efficiently.
\`\`\`

## Validation Checklist
- [ ] The search input is debounced to prevent API spam.
- [ ] The backend efficiently queries the database using indexes or a search engine.
- [ ] The UI displays a clear "No results found" empty state when applicable.
`,
  'webadminpaneldev': `# Admin Panel

**Estimated Time:** 2-4 Hours

---

## Why this matters
When a user emails you saying "My account is stuck, can you fix it?", you need an Admin Panel. If you have to connect directly to the production database via a CLI to manually edit SQL rows, you will eventually make a typo and destroy critical data.

## Strategic Guidance

### Hackathon Mode
Skip this entirely. You are the admin, and you can just edit the database directly via the Supabase/Firebase GUI for the duration of the hackathon.

### Personal Project
You don't need a dedicated admin panel if you are the only user. Just build the core app.

### Production SaaS
You must build a secure admin dashboard. Use a tool like Retool, refine, or build a hidden \`/admin\` route in your Next.js app locked behind a strict \`role === 'SUPERADMIN'\` check. You need the ability to view all users, reset passwords, ban accounts, and monitor system health.

## Implementation Steps
\`\`\`prompt
Act as a Security Engineer. I need to build an internal Admin dashboard at the route \`/admin\`. How do I strictly protect this route in [Insert Framework, e.g., Next.js] so that only users with an 'admin' role in the database can access it, and regular users receive a 404 or 403?
\`\`\`

## Validation Checklist
- [ ] The Admin route is completely inaccessible to normal users.
- [ ] Admin API routes strictly verify the admin role before executing.
- [ ] You have a basic UI to view and manage users.
`,
  'webintegrationsdev': `# Third-Party Integrations

**Estimated Time:** 3-6 Hours

---

## Why this matters
Modern web apps don't exist in a vacuum. You will likely need to integrate Stripe for payments, OpenAI for AI features, or SendGrid for emails. Writing robust code to handle these external APIs ensures your app doesn't crash when a third-party service goes down.

## Strategic Guidance

### Hackathon Mode
Use the quickest, dirtiest integration method possible. Don't worry about handling rate limits or complex webhook retries. If the API fails during the demo, just refresh the page.

### Personal Project
Keep integrations minimal. Use the official SDKs (e.g., \`stripe-node\`) rather than writing raw \`fetch\` requests to third-party APIs. It saves hours of debugging.

### Production SaaS
You must treat third-party APIs as hostile and unreliable. Wrap external API calls in \`try/catch\` blocks. Implement exponential backoff for retries. If you are accepting webhooks (like Stripe payment events), you *must* verify the cryptographic signature of the webhook to prevent malicious actors from faking payments.

## Implementation Steps
\`\`\`prompt
Act as a Backend Engineer. I am integrating [Insert Third-Party Service, e.g., Stripe] into my Node/Next.js backend. Provide the code to securely receive a webhook from this service, verify its cryptographic signature, and handle the event safely.
\`\`\`

## Validation Checklist
- [ ] External API keys are stored securely in environment variables.
- [ ] External API calls are wrapped in error handlers.
- [ ] Webhooks from external services are cryptographically verified.
`,
  'webtestingdev': `# Testing

**Estimated Time:** 2-5 Hours

---

## Why this matters
If you don't write tests, your users become your testers. Every time you push an update, you will have anxiety wondering if you broke the login page or the checkout flow. Automated tests catch regressions before they reach production.

## Strategic Guidance

### Hackathon Mode
Do not write automated tests. It is a waste of time during a 24-hour sprint. Manually click through the "Happy Path" 5 times before the demo.

### Personal Project
Write a few basic End-to-End (E2E) tests for the absolute most critical flows (e.g., Logging in, creating a core entity). Playwright or Cypress are great for this.

### Production SaaS
You need a layered testing strategy. 1. Unit Tests (Vitest/Jest) for critical business logic (e.g., billing calculations). 2. Integration Tests for your API endpoints to ensure they talk to the database correctly. 3. E2E Tests (Playwright) to simulate a real user clicking through the core flows. Block deployments in your CI/CD pipeline if tests fail.

## Implementation Steps
\`\`\`prompt
Act as a QA Engineer. I want to set up End-to-End testing for my web app using Playwright. Provide the setup instructions and a sample test script that navigates to my \`/login\` page, fills out the email and password fields, clicks submit, and verifies that the dashboard loads.
\`\`\`

## Validation Checklist
- [ ] You have a testing framework installed (e.g., Vitest, Playwright).
- [ ] The core "Happy Path" is covered by an automated test.
- [ ] Tests can be run locally via a simple script (e.g., \`npm run test\`).
`,
  'webdocumentationdev': `# Documentation

**Estimated Time:** 1-2 Hours

---

## Why this matters
Code without documentation is legacy code the moment it is written. If you onboard a new developer (or return to your own project after 3 months), you will waste hours trying to figure out how to start the local database or what environment variables are required.

## Strategic Guidance

### Hackathon Mode
Write a 5-line \`README.md\` that lists the tech stack and the commands to run the app (\`npm install && npm run dev\`). That's it.

### Personal Project
Document the environment variables needed in a \`.env.example\` file. Write down any quirky commands you need to run (like database migrations or seeding scripts) in the README.

### Production SaaS
Maintain a comprehensive \`README.md\`. It should include: Architecture overview, local development setup steps, testing commands, and deployment protocols. If you are building a public API, you must generate API documentation (using Swagger/OpenAPI) for your users.

## Implementation Steps
\`\`\`prompt
Act as a Technical Writer. I have built a web app using [Insert Tech Stack]. Write a comprehensive README.md template for my GitHub repository. It should include sections for: Project Overview, Tech Stack, Local Setup Instructions, Environment Variables, and Deployment.
\`\`\`

## Validation Checklist
- [ ] The \`README.md\` explains how to run the project locally.
- [ ] A \`.env.example\` file exists with dummy values for all required keys.
- [ ] Complex business logic in the codebase has inline code comments.
`,
  'webemailnotificationsdev': `# Email Notifications

**Estimated Time:** 2-3 Hours

---

## Why this matters
Transactional emails (Welcome emails, Password Resets, Receipt confirmations) are a core part of the web app experience. Without them, users cannot recover lost accounts or verify their purchases.

## Strategic Guidance

### Hackathon Mode
Skip custom email templates. If you are using Supabase/Firebase auth, just use their default, unstyled plain-text password reset emails.

### Personal Project
Use a developer-friendly API like Resend. Keep the emails entirely text-based or use incredibly simple HTML. Don't waste time designing complex responsive email templates.

### Production SaaS
You must use a robust transactional email provider (Resend, Postmark, AWS SES). You need to design beautiful, branded HTML email templates (using React Email or MJML so they don't break in Outlook). You also need to configure DKIM and SPF DNS records on your domain so your emails don't go to spam.

## Implementation Steps
\`\`\`prompt
Act as a Backend Engineer. I want to send transactional emails from my Node/Next.js app using [Insert Provider, e.g., Resend]. Provide the code to trigger a "Welcome Email" when a new user signs up. Include a basic React Email template for the email body.
\`\`\`

## Validation Checklist
- [ ] You have integrated a transactional email provider.
- [ ] Password reset emails are successfully arriving in your inbox.
- [ ] You have configured your domain's DNS records (DKIM/SPF) to prevent spam filtering.
`,
  'webfileuploadsdev': `# File Uploads

**Estimated Time:** 2-4 Hours

---

## Why this matters
Allowing users to upload files (avatars, PDFs, CSVs) is inherently dangerous and complex. Large files will time out standard HTTP requests, and malicious files can compromise your app.

## Strategic Guidance

### Hackathon Mode
Use a pre-built UI widget like Uploadcare or the Supabase Storage client. They provide out-of-the-box drag-and-drop components that handle the complex upload logic for you.

### Personal Project
Use an S3-compatible service (like Cloudflare R2). You can use a library like \`react-dropzone\` on the frontend and send the file through your backend to the storage bucket.

### Production SaaS
Never pass large files through your primary backend API—it will consume all your server memory. Implement **Presigned URLs**. The frontend asks the backend for a temporary, secure URL, and then the frontend uploads the file directly to AWS S3/R2 using that URL. Ensure the backend strictly validates the file MIME type and size limit before generating the URL.

## Implementation Steps
\`\`\`prompt
Act as a Cloud Architect. I need to allow users to upload large images to an S3 bucket in my React/Node app. Explain the "Presigned URL" upload flow, and provide the backend code to generate a presigned URL, and the frontend code to upload a file directly to it.
\`\`\`

## Validation Checklist
- [ ] The frontend has a drag-and-drop or file selection UI.
- [ ] The backend enforces file size and type limits.
- [ ] Uploaded files are successfully stored in your Cloud Object Storage.
`,
  'webdemodatadev': `# Demo Data Setup

**Estimated Time:** 1-2 Hours

---

## Why this matters
A hackathon demo of an empty dashboard is incredibly boring. You need realistic, compelling data to show off the UI and features you built.

## Strategic Guidance

### Hackathon Mode
Write a simple script to insert 20 realistic rows into your database, or just manually type them into the Supabase/Firebase GUI. Do not use generic "Test User 1" data—use funny, relevant, or impressive dummy data (e.g., generating fake user profiles with AI).

### Personal Project
N/A - This is typically a Hackathon-specific priority.

### Production SaaS
N/A - Production environments should not contain fake demo data. (You would use seed scripts for local development instead).

## Implementation Steps
\`\`\`prompt
Act as a Data Engineer. I need to seed my database with realistic dummy data for a demo. My table schema is [Insert Schema]. Write a Node.js/Python script that uses Faker.js (or similar) to generate 50 rows of highly realistic, engaging data and inserts it into my database.
\`\`\`

## Validation Checklist
- [ ] Your database contains enough data to make the UI look fully populated.
- [ ] The data looks realistic (no "asdasd" strings).
`,
  'webauthoptionaldev': `# Authentication (Optional)

**Estimated Time:** 1 Hour

---

## Why this matters
For a hackathon, auth is often a distraction. If your core "Wow" factor is an AI image generator, nobody cares if they can log in. However, if your app is a social network, auth is required.

## Strategic Guidance

### Hackathon Mode
If you don't strictly need it, skip it. Hardcode a fake "Logged in as User X" state in your frontend. If you *do* need it, use Magic Links via Supabase/Firebase to avoid building password reset UIs.

### Personal Project
N/A

### Production SaaS
N/A

## Implementation Steps
\`\`\`prompt
Act as a Hackathon Expert. My web app does [Insert Core Function]. Do I actually need to implement real user authentication for a 24-hour hackathon, or can I fake it? If I should fake it, how do I mock a global user session in React?
\`\`\`

## Validation Checklist
- [ ] You have decided whether to build real auth or mock it.
- [ ] If mocked, the UI still displays a realistic user profile/avatar.
`,
  'webanalyticsdev': `# Analytics

**Estimated Time:** 1-2 Hours

---

## Why this matters
If you don't have analytics, you have no idea if anyone is actually using your personal tool or SaaS. You won't know which features are popular or where users are dropping off.

## Strategic Guidance

### Hackathon Mode
Skip this. You will be presenting the app yourself, so tracking user clicks is irrelevant.

### Personal Project
Add a lightweight, privacy-friendly analytics tracker like Plausible or Vercel Analytics. It takes 2 minutes to install and gives you a nice dashboard of page views.

### Production SaaS
You need robust product analytics (PostHog, Mixpanel, or Amplitude). You must track custom events (e.g., "User clicked Checkout", "User generated Report"). Do not just track page views; track the core actions that drive value in your app. Ensure you are compliant with GDPR/CCPA cookie laws.

## Implementation Steps
\`\`\`prompt
Act as a Product Manager. I want to integrate PostHog (or Mixpanel) into my React web app. Provide the code to initialize the analytics provider, and show an example of how to track a custom event when a user clicks a specific button.
\`\`\`

## Validation Checklist
- [ ] An analytics script is installed on the frontend.
- [ ] Page views are registering in your analytics dashboard.
- [ ] (Production) Core user actions trigger custom tracking events.
`,
  'webhostingdev': `# Hosting & Deployment

**Estimated Time:** 1-3 Hours

---

## Why this matters
Your app needs to live on the internet. Choosing the right hosting provider determines how fast your app loads globally, how easy it is to deploy updates, and how much you pay for bandwidth.

## Strategic Guidance

### Hackathon Mode
Deploy the frontend to Vercel or Netlify. It connects to your GitHub repo and deploys automatically on every push. It takes 30 seconds and is free.

### Personal Project
Vercel/Netlify for the frontend. If you have a custom backend (Node/Python), deploy it to Render or Railway. They offer Generous free tiers and incredibly simple GitHub integrations.

### Production SaaS
Vercel is great for production Next.js apps, but watch out for bandwidth costs. If you have a heavy custom backend, use a PaaS like Render, Fly.io, or AWS Elastic Beanstalk. You must set up custom domains, SSL certificates, and ensure your database is hosted in the same geographic region as your backend server to minimize latency.

## Implementation Steps
\`\`\`prompt
Act as a DevOps Engineer. I have a [Insert Stack, e.g., Next.js frontend, Node backend, Postgres DB]. Walk me through the absolute easiest way to deploy this entire stack to the internet for free (or very cheap) using modern platforms like Vercel, Render, or Supabase.
\`\`\`

## Validation Checklist
- [ ] Your frontend is accessible via a public URL.
- [ ] Your backend is deployed and connected to the production database.
- [ ] You have successfully deployed an update by pushing to the \`main\` branch.
`,
  'websecuritybasicsdev': `# Security Basics

**Estimated Time:** 1-2 Hours

---

## Why this matters
Personal projects and indie SaaS apps are constantly scanned by automated bots looking for vulnerabilities. A single exposed API key or SQL injection flaw can result in a stolen database or a massive cloud computing bill.

## Strategic Guidance

### Hackathon Mode
Don't put your AWS root keys in your public GitHub repository. Other than that, don't worry about complex security for a 24-hour sprint.

### Personal Project
Ensure you are using environment variables (\`.env\`) for all secrets and that \`.env\` is strictly added to your \`.gitignore\`. Use parameterized queries (or an ORM) to prevent basic SQL injection.

### Production SaaS
You must enforce strict CORS policies on your backend. Implement Rate Limiting to prevent brute-force attacks on your login routes. Ensure secure HttpOnly cookies are used for sessions. Regularly audit your npm dependencies for known vulnerabilities (\`npm audit\`).

## Implementation Steps
\`\`\`prompt
Act as a Security Engineer. I am deploying a Node.js/React web app. Give me a checklist of the top 5 most critical security misconfigurations I must avoid before going live, specifically focusing on environment variables, CORS, and database injection.
\`\`\`

## Validation Checklist
- [ ] \`node_modules\` and \`.env\` files are in your \`.gitignore\`.
- [ ] Secrets (API keys, DB passwords) are stored securely in your hosting provider's settings.
- [ ] The backend validates all incoming payload data.
`,
  'webseobasicsdev': `# SEO Basics

**Estimated Time:** 1-2 Hours

---

## Why this matters
If you are building a public-facing tool, Search Engine Optimization (SEO) is how users find you organically. Bad SEO means Google literally doesn't know your app exists.

## Strategic Guidance

### Hackathon Mode
Skip this entirely.

### Personal Project
Add a proper \`<title>\` and \`<meta name="description">\` to your \`index.html\`. It takes 30 seconds and makes the link look nice if you share it with friends on Discord.

### Production SaaS
You must implement dynamic Meta Tags and OpenGraph images for all public pages. Use Server-Side Rendering (SSR) or Static Site Generation (SSG) for public marketing pages (using Next.js or Astro) because client-rendered React apps (SPAs) are notoriously difficult for web crawlers to index properly. Ensure you have a dynamic \`sitemap.xml\` and \`robots.txt\`.

## Implementation Steps
\`\`\`prompt
Act as an SEO Specialist. I am building a Next.js (or React) web app. What are the absolute bare minimum SEO requirements I need to implement on my landing page to ensure Google indexes it properly and it looks good when shared on Twitter/LinkedIn?
\`\`\`

## Validation Checklist
- [ ] Public pages have descriptive \`<title>\` tags.
- [ ] OpenGraph (\`og:image \`og:title\`) tags are configured.
- [ ] A \`sitemap.xml\` file is generated and submitted to Google Search Console.
`,
  'websecurityreadiness': `# Security Readiness

**Estimated Time:** 2-4 Hours

---

## Why this matters
Before you put a public URL on the internet, you must assume people will try to hack it. If you launch with a hardcoded Admin password or exposed AWS keys, your app will be compromised within hours. A brief security audit prevents catastrophic data loss.

## Strategic Guidance

### Hackathon Mode
N/A - Hackathons skip production readiness and jump to submission.

### Personal Project
N/A - Handled in the Production track.

### Production SaaS
You must perform a security sweep. Enforce HTTPS everywhere (HSTS). Use Helmet.js (if Node) or Next.js headers to set strict Content Security Policies (CSP) to prevent XSS attacks. Double-check your database Row Level Security (RLS) policies to ensure users can't query other users' data. Implement strong CORS policies.

## Implementation Steps
\`\`\`prompt
Act as a Web Security Expert. I am preparing my [Insert Stack] web app for production. Provide a checklist of the top 5 security headers I need to configure (like CSP and HSTS) and explain how to implement them in my framework.
\`\`\`

## Validation Checklist
- [ ] You have verified that users cannot access data belonging to other accounts.
- [ ] Your \`.env\` file containing secrets is NOT committed to Git.
- [ ] You have configured a basic Content Security Policy (CSP).
`,
  'webperformanceoptimization': `# Performance Optimization

**Estimated Time:** 2-5 Hours

---

## Why this matters
Users expect web apps to load instantly. If your app takes 5 seconds to show a dashboard, users will assume it's broken. Performance directly impacts SEO rankings and conversion rates.

## Strategic Guidance

### Hackathon Mode
N/A

### Personal Project
N/A

### Production SaaS
Audit your Web Vitals (LCP, FID, CLS) using Lighthouse. Implement code splitting so the browser only downloads the JavaScript required for the current page. Lazy load heavy assets (like massive images or complex charts). Compress all images to WebP format. Ensure your database queries are indexed properly.

## Implementation Steps
\`\`\`prompt
Act as a Frontend Performance Expert. My React app has a very slow First Contentful Paint (FCP) and a large JavaScript bundle size. Explain how I can implement Code Splitting and Lazy Loading for my routes and heavy UI components to drastically reduce the initial load time.
\`\`\`

## Validation Checklist
- [ ] Your Lighthouse performance score is above 80.
- [ ] Images are optimized (e.g., using \`next/image\` or WebP).
- [ ] You are not shipping massive, unused libraries (like \`moment.js\` when you only need a single date function).
`,
  'webmonitoring': `# System Monitoring

**Estimated Time:** 1-2 Hours

---

## Why this matters
If your server crashes on a Saturday night, you need to know *before* angry customers start tweeting at you. Monitoring gives you a dashboard of your system's health so you can proactively fix issues.

## Strategic Guidance

### Hackathon Mode
N/A

### Personal Project
N/A

### Production SaaS
Set up uptime monitoring (e.g., UptimeRobot) to ping your server every minute. If you are using Vercel or Supabase, review their built-in health metrics. Set up a Slack/Discord webhook that triggers an alert if CPU usage spikes over 90% or if the server goes offline.

## Implementation Steps
\`\`\`prompt
Act as a DevOps Engineer. I need to monitor the uptime of my web app. Walk me through the process of setting up a free uptime monitor (like UptimeRobot or Better Stack) and configuring it to send an alert to my Slack/Discord if the API returns a 500 error.
\`\`\`

## Validation Checklist
- [ ] An automated system pings your server regularly to verify uptime.
- [ ] You receive instant notifications if the app goes down.
- [ ] You have a dashboard to view historical uptime metrics.
`,
  'weblogging': `# Application Logging

**Estimated Time:** 2-3 Hours

---

## Why this matters
When a user says "I clicked save and it just spun forever", you can't debug it unless you have logs. Simple \`console.log()\` statements get lost instantly in production. You need structured, searchable logs.

## Strategic Guidance

### Hackathon Mode
N/A

### Personal Project
N/A

### Production SaaS
Do not use \`console.log()\` for critical business logic. Use a structured logger like \`Winston\` or \`Pino\` (for Node.js) that outputs JSON. Forward these logs to a log aggregation service (like Datadog, Logtail, or AWS CloudWatch) so you can easily search for all logs related to a specific \`userId\`.

## Implementation Steps
\`\`\`prompt
Act as a Backend Architect. I want to replace \`console.log\` with a structured logger in my Node.js app using [Pino or Winston]. Show me how to configure the logger to output JSON in production, but readable text in local development, and how to attach a \`requestId\` to every log.
\`\`\`

## Validation Checklist
- [ ] Critical API endpoints log their start, end, and any errors.
- [ ] Logs are structured (e.g., JSON) so they can be parsed by monitoring tools.
- [ ] You are not logging highly sensitive data (like passwords or full credit card numbers).
`,
  'weberrortracking': `# Error Tracking

**Estimated Time:** 1-2 Hours

---

## Why this matters
Users rarely report bugs; they just churn. If a JavaScript error crashes the frontend, you need to be notified immediately with a stack trace so you can fix it before the next user hits it.

## Strategic Guidance

### Hackathon Mode
N/A

### Personal Project
N/A

### Production SaaS
You must install an error tracking tool like Sentry or LogRocket. Sentry will catch unhandled frontend exceptions and backend crashes, automatically aggregating them so you know if an error happened 1 time or 10,000 times. Upload your source maps to Sentry so you can read the minified stack traces.

## Implementation Steps
\`\`\`prompt
Act as a QA Engineer. Walk me through integrating Sentry into a [Insert Frontend Framework] and [Insert Backend Framework] stack. Show me how to capture an error explicitly in a try/catch block, and how to attach the current \`user.id\` to the Sentry report for debugging.
\`\`\`

## Validation Checklist
- [ ] Sentry (or equivalent) is installed on both the frontend and backend.
- [ ] Errors are successfully captured and show up in your dashboard.
- [ ] Source maps are configured so stack traces are readable.
`,
  'webratelimiting': `# Rate Limiting

**Estimated Time:** 1-2 Hours

---

## Why this matters
If you have a public API endpoint, someone will write a script to hit it 10,000 times a second. Without rate limiting, this will either crash your server (DDoS) or cost you thousands of dollars in cloud bills (especially if the endpoint triggers an LLM or sends an SMS).

## Strategic Guidance

### Hackathon Mode
N/A

### Personal Project
N/A

### Production SaaS
You must implement rate limiting. Use Upstash/Redis, or framework-specific tools (like Next.js Rate Limit via Vercel KV, or \`express-rate-limit\`). Apply strict limits to \`/login\` (to prevent brute force), \`/signup\` (to prevent bot spam), and any endpoint that calls an expensive third-party API.

## Implementation Steps
\`\`\`prompt
Act as a Backend Security Engineer. I need to protect my \`/api/generate\` endpoint from abuse. I am using [Insert Framework]. Provide the code to implement a Rate Limiter (e.g., using Redis/Upstash) that restricts users to 5 requests per minute, based on their IP address or User ID.
\`\`\`

## Validation Checklist
- [ ] Critical endpoints (login, password reset, AI generation) are rate-limited.
- [ ] The API correctly returns an \`HTTP 429 Too Many Requests\` status code when the limit is exceeded.
- [ ] The UI gracefully informs the user that they need to wait.
`,
  'webcaching': `# Caching Strategy

**Estimated Time:** 2-4 Hours

---

## Why this matters
Fetching data from a database is slow and expensive. If 1,000 users load the exact same public landing page, your database shouldn't calculate the data 1,000 times. Caching makes your app feel instantly responsive.

## Strategic Guidance

### Hackathon Mode
N/A

### Personal Project
N/A

### Production SaaS
Implement a multi-layered caching strategy. 1. Use a CDN (Cloudflare or Vercel Edge Network) to cache static assets and public API responses. 2. Use an in-memory datastore (like Redis) on your backend to cache the results of heavy database queries for a few minutes. Always ensure you have a strategy for cache invalidation (e.g., when a user updates their profile, clear the cache for that profile).

## Implementation Steps
\`\`\`prompt
Act as a Systems Architect. My web app executes a very slow database query on the dashboard. I want to cache this query using Redis. Provide a Node.js code example of the "Cache-Aside" pattern: checking Redis first, returning the data if it exists, and if not, querying the database and saving it to Redis with a 5-minute expiration (TTL).
\`\`\`

## Validation Checklist
- [ ] Static assets are served via a CDN.
- [ ] Slow, frequently accessed database queries are cached (e.g., with Redis).
- [ ] You have a robust strategy for cache invalidation.
`,
  'webbackups': `# Database Backups

**Estimated Time:** 1 Hour

---

## Why this matters
Hardware fails. Developers accidentally run \`DELETE FROM users\` without a \`WHERE\` clause. If you don't have automated backups, a single mistake will instantly kill your entire business.

## Strategic Guidance

### Hackathon Mode
N/A

### Personal Project
N/A

### Production SaaS
You must enable automated, daily backups. If you are using a managed database provider (Supabase, AWS RDS, PlanetScale), this is usually a one-click toggle in the dashboard. Enable Point-In-Time Recovery (PITR) so you can restore the database to the exact minute before a disaster happened. *Crucially, test restoring a backup to a staging environment to ensure the backups actually work.*

## Implementation Steps
\`\`\`prompt
Act as a Database Administrator. I am using [Insert Database Provider, e.g., Supabase, AWS RDS]. Explain how I enable automated daily backups and Point-In-Time Recovery (PITR). What is the step-by-step procedure for safely restoring a backup into a staging environment to test it?
\`\`\`

## Validation Checklist
- [ ] Automated daily backups are enabled in your database dashboard.
- [ ] Point-In-Time Recovery (PITR) is activated if available.
- [ ] You have verified that the backups actually contain data.
`,
  'webcicd': `# CI/CD Pipeline

**Estimated Time:** 2-4 Hours

---

## Why this matters
Manual deployments (e.g., running \`npm run build\` locally and dragging files to a server via FTP) are slow and error-prone. Continuous Integration/Continuous Deployment (CI/CD) ensures that every code change is automatically tested and deployed safely.

## Strategic Guidance

### Hackathon Mode
N/A

### Personal Project
N/A

### Production SaaS
Set up GitHub Actions or utilize Vercel's built-in CI/CD. When a developer pushes to a \`staging\` branch, the pipeline should automatically run the linter (\`npm run lint\`), run the test suite (\`npm run test\`), and deploy to a preview URL. Only when PRs pass these checks should they be allowed to merge into \`main\` for production deployment.

## Implementation Steps
\`\`\`prompt
Act as a DevOps Engineer. I want to set up a GitHub Actions workflow for my [Insert Stack] web app. Provide a \`.yml\` file that triggers on Pull Requests to the \`main\` branch. It should install dependencies, run the TypeScript compiler, run ESLint, and execute my test suite. It should fail the PR if any of these steps fail.
\`\`\`

## Validation Checklist
- [ ] A pipeline automatically runs your test suite on every Pull Request.
- [ ] Pushing to the \`main\` branch automatically deploys to production.
- [ ] Failing tests prevent code from being merged.
`,
  'webseoprod': `# Advanced SEO

**Estimated Time:** 2-4 Hours

---

## Why this matters
For a SaaS, organic search traffic is free customer acquisition. If your marketing pages aren't heavily optimized, you will be forced to rely entirely on expensive paid ads.

## Strategic Guidance

### Hackathon Mode
N/A

### Personal Project
N/A

### Production SaaS
Ensure your marketing site is built with a framework that supports Static Site Generation (SSG) or Server-Side Rendering (SSR) (like Next.js, Nuxt, or Astro). Implement dynamic XML sitemaps. Ensure every public page has a unique \`<title> meta description, and optimized \`H1\` tags. Set up canonical URLs to prevent duplicate content penalties. Use Google Search Console to monitor crawl errors.

## Implementation Steps
\`\`\`prompt
Act as an SEO Technical Expert. I am using [Insert Framework, e.g., Next.js App Router]. Provide the code to generate a dynamic \`sitemap.xml\` for my blog posts, and show me how to inject dynamic metadata (Title, Description, OpenGraph Image) into a specific route based on the data fetched from the database.
\`\`\`

## Validation Checklist
- [ ] Google Search Console is set up and verifying your domain.
- [ ] Dynamic pages automatically generate correct OpenGraph and Meta tags.
- [ ] Your site scores 90+ on Lighthouse's SEO metric.
`,
  'webscalabilityplanning': `# Scalability Planning

**Estimated Time:** 2 Hours

---

## Why this matters
What happens if your app gets featured on the front page of Hacker News or Reddit and you get 50,000 concurrent users? If you haven't thought about scalability, your server will crash, and you will lose out on massive growth.

## Strategic Guidance

### Hackathon Mode
N/A

### Personal Project
N/A

### Production SaaS
Identify your bottlenecks. Your frontend (if hosted on Vercel/Netlify CDN) will scale infinitely. Your bottleneck will be the Database. Ensure you have connection pooling set up (e.g., PgBouncer or Prisma Accelerate) so your server doesn't exhaust the database connections. Plan for read-replicas if your app is read-heavy.

## Implementation Steps
\`\`\`prompt
Act as a Cloud Architect. My web app consists of a Node.js backend and a PostgreSQL database. We are expecting a massive surge in traffic next week. Explain how "Database Connection Pooling" works, why it is critical for preventing server crashes under high load, and how I can implement it in my stack.
\`\`\`

## Validation Checklist
- [ ] Database connection pooling is configured.
- [ ] You have identified the most expensive query in your app and optimized/cached it.
- [ ] You know exactly how to scale up your server resources (e.g., upgrading the AWS/Render instance) if CPU hits 100%.
`,
  'webpitchdeck': `# Pitch Deck

**Estimated Time:** 2-3 Hours

---

## Why this matters
At a hackathon, the code rarely wins by itself. The narrative wins. A compelling pitch deck explains the problem, shows why your solution is unique, and makes the judges care before you even show the app.

## Strategic Guidance

### Hackathon Mode
Keep it under 7 slides. 
1. The Hook (The Problem)
2. The Solution (1 sentence)
3. The Demo (Switch to screen share)
4. The Market/Impact
5. The Tech Stack (Judges love this)
6. The Future/Roadmap
7. The Team.
Do not spend 5 minutes talking before showing the app. Show the app as quickly as possible.

### Personal Project
N/A

### Production SaaS
N/A

## Implementation Steps
\`\`\`prompt
Act as an Expert Startup Founder. I am pitching my hackathon project: [Insert App Description]. Help me write the script for a 3-minute pitch. Provide the exact structure for my 5-slide pitch deck, including the headline and key talking points for each slide.
\`\`\`

## Validation Checklist
- [ ] The deck is less than 10 slides.
- [ ] The problem is relatable and clearly defined.
- [ ] The transition to the live demo is seamless.
`,
  'webdemoscript': `# Demo Script

**Estimated Time:** 1-2 Hours

---

## Why this matters
Live demos fail. APIs time out, CSS breaks on the projector, or you forget what to click. A rehearsed demo script ensures you hit the "Wow" moments smoothly and avoid the buggy edges of your hackathon project.

## Strategic Guidance

### Hackathon Mode
Write a script. Never "wing" a live demo. Script exactly where your mouse will click. "First, I'll click here. Notice how it instantly generates X." Have a backup video recording of the demo ready to play if your local server or internet completely dies during the presentation.

### Personal Project
N/A

### Production SaaS
N/A

## Implementation Steps
\`\`\`prompt
Act as a Presentation Coach. My app has the following features: [List Features]. Write a 2-minute live demo script. Tell me exactly what I should say while clicking through the app to maximize the "Wow" factor for the judges.
\`\`\`

## Validation Checklist
- [ ] You have rehearsed the demo end-to-end at least 3 times.
- [ ] You have a fallback video recorded just in case.
- [ ] The demo highlights the core feature within the first 30 seconds.
`,
  'websubmissionchecklist': `# Submission Checklist

**Estimated Time:** 1 Hour

---

## Why this matters
You survived 24 hours of coding, but if you miss the submission deadline by 1 minute, or if your GitHub repo is set to private, you are disqualified.

## Strategic Guidance

### Hackathon Mode
Stop coding 2 hours before the deadline. Spend that time writing the Devpost submission, recording the demo video, and ensuring the repo is public. A polished submission with a working video often beats a technically superior project with a blank Devpost page.

### Personal Project
N/A

### Production SaaS
N/A

## Implementation Steps
\`\`\`prompt
Act as a Hackathon Judge. I am submitting my project to Devpost. Provide a checklist of the exact items I need to ensure are perfect (e.g., Repo permissions, Video length, README details) to maximize my chances of winning.
\`\`\`

## Validation Checklist
- [ ] Your GitHub repository is Public.
- [ ] The README contains a clear description and instructions on how to run the code.
- [ ] You have uploaded a demo video to YouTube/Vimeo.
- [ ] The Devpost (or equivalent) form is fully submitted before the deadline.
`,
  'webhostinghackathon': `# Hackathon Deployment

**Estimated Time:** 1 Hour

---

## Why this matters
Judges love it when they can actually open the app on their own phones during the pitch. A live URL is infinitely more impressive than \`localhost:3000\`.

## Strategic Guidance

### Hackathon Mode
Deploy to Vercel or Netlify. It is the fastest way to get a React/Next/Vue app live. If your backend is too complex to deploy in 30 minutes, fake it—hardcode the API responses and just deploy the static frontend so it looks like it works.

### Personal Project
N/A

### Production SaaS
N/A

## Implementation Steps
\`\`\`prompt
Act as a DevOps Engineer. I need to deploy my Next.js (or React) app immediately for a hackathon. Walk me through the fastest, zero-config way to deploy this repository using Vercel, including how to set up my environment variables in the dashboard.
\`\`\`

## Validation Checklist
- [ ] The app is deployed to a public URL.
- [ ] Environment variables (API keys) are configured in the hosting dashboard.
- [ ] The live URL works and does not crash on load.
`,
  'webfeedback': `# User Feedback

**Estimated Time:** Ongoing

---

## Why this matters
If you build in a vacuum, you will build the wrong thing. Talking to users is the only way to figure out which features actually matter and which ones are a waste of time.

## Strategic Guidance

### Hackathon Mode
N/A

### Personal Project
Share your tool on Reddit, X (Twitter), or Hacker News. Add a simple "Give Feedback" button in the app that opens an email or a Typeform. Listen to the complaints.

### Production SaaS
N/A - Handled in the Growth track.

## Implementation Steps
\`\`\`prompt
Act as a Product Manager. I am launching my personal project to a community on Reddit. Write a compelling launch post that clearly explains the problem I solved, invites them to use the tool for free, and strongly encourages them to provide brutal feedback.
\`\`\`

## Validation Checklist
- [ ] You have a mechanism (Email, Form, Discord) for users to contact you.
- [ ] You have shared the project in at least 3 relevant communities.
`,
  'webroadmap': `# Project Roadmap

**Estimated Time:** 1-2 Hours

---

## Why this matters
A personal project is never really "finished". Creating a roadmap helps you decide if you want to turn this into a business, open-source it, or just keep it as a portfolio piece.

## Strategic Guidance

### Hackathon Mode
N/A

### Personal Project
Decide on the future of the app. If you want to monetize it, map out the "Pro" features. If you want to abandon it, add a disclaimer to the README so users know it is unmaintained.

### Production SaaS
N/A - Handled in the Growth track.

## Implementation Steps
\`\`\`prompt
Act as a Product Strategist. My personal web app currently does [Insert Features]. I want to expand this over the next 6 months. Brainstorm 5 advanced features I could build next to make this tool even more powerful, and suggest which one I should tackle first.
\`\`\`

## Validation Checklist
- [ ] You have decided on the long-term goal for this project.
- [ ] You have listed 2-3 specific features you want to build next.
`,
  'webbetatesting': `# Beta Testing

---

## Why this matters
You cannot catch every bug yourself. Beta testing exposes your web application to real-world usage patterns, different browsers, and unexpected edge cases before you open the floodgates to the public. It validates your core user journey and highlights points of friction.

## Strategic Guidance

### Hackathon Mode
Beta testing in a hackathon? You are the beta tester. Ask the person sitting next to you to click through your core flow. If they can complete the primary action without the app crashing or them asking "what do I do here?", ship it. Do not spend time setting up a formal beta group or tracking analytics.

### Personal Project
Share your app with a small group of friends or colleagues. Give them a specific task to accomplish (e.g., "try to create an account and add a new item"). Watch them do it if possible, or ask for their raw, unfiltered feedback. Fix the glaring issues and ignore the minor visual nitpicks for now. The goal is to ensure the app doesn't break under normal use.

### Production SaaS
A structured beta is critical. You need a closed group of target users (often called design partners or early adopters). You must set clear expectations: the app will have bugs, but their feedback will shape the final product. 
- Use feature flags to slowly roll out access.
- Have a dedicated channel (Slack, Discord, or a simple feedback widget) to capture bugs.
- Track their actual usage using analytics to see where they drop off.

---

## Define Your Beta Strategy

**Who are your ideal beta testers and how many do you need?**
\`\`\`input
Write Here...
\`\`\`

**What is the single most important workflow they MUST test successfully?**
\`\`\`input
Write Here...
\`\`\`

## AI Feedback Engine
\`\`\`prompt
Act as a QA Lead for a web application. Based on my ideal beta testers and the core workflow I provided, generate a 5-step beta testing plan. Include a template email to invite them, and a short survey of 3 questions to ask them after they test the app.
\`\`\`

## Final Review
- [ ] Beta testers identified and invited
- [ ] Core workflow validated by at least 1 external user
- [ ] Critical bugs fixed
`,
  'webuserfeedback': `# User Feedback Systems

---

## Why this matters
Without a structured way to collect feedback, users will either silently abandon your app or blast you on social media. A tight user feedback loop allows you to capture feature requests, bug reports, and general sentiment directly within the app, turning frustrated users into co-creators.

## Strategic Guidance

### Hackathon Mode
Do not build a feedback system. Tell the judges or users to find you on social media or Discord. Speed is all that matters right now. Any time spent building a feedback widget is time lost on the core demo.

### Personal Project
A simple mailto link in the footer or a basic Google Form linked in the header is perfectly sufficient. Keep it frictionless for both you and the user. You do not need a complex ticketing system.

### Production SaaS
You need a frictionless, in-app feedback mechanism. Users should not have to leave the app to report a bug. 
- Integrate a widget (like Canny, Featurebase, or a simple Intercom chat).
- Automatically capture their browser info, user ID, and current page when they submit a bug.
- Acknowledge their feedback quickly to build trust.

---

## Feedback Setup

**Which tool or method will you use to collect feedback? (e.g., Email, Discord, Canny widget)**
\`\`\`input
Write Here...
\`\`\`

## AI Integration Helper
\`\`\`prompt
Act as a Product Manager. I am building a web app and want to use the feedback method I just defined. Give me the absolute fastest way to integrate this into a React frontend. If it requires a 3rd party tool, provide a summary of their free tier limits.
\`\`\`

## Implementation
- [ ] Feedback mechanism is visible and accessible in the app
- [ ] Tested submitting a piece of feedback successfully
`,
  'webdomainsetup': `# Domain Setup

---

## Why this matters
Your domain is your identity. Proper domain setup, including DNS configuration, SSL certificates, and routing, ensures your web app is securely accessible to the world. Messing this up results in terrifying browser security warnings or unreachable apps.

## Strategic Guidance

### Hackathon Mode
Just use the default Vercel, Netlify, or Render URL. Do not waste precious time buying and configuring a custom domain unless you have extra time before the deadline.

### Personal Project
Buy a cheap domain. Connect it to your hosting provider. Let your host (like Vercel or Netlify) handle the automatic SSL provisioning. You do not need an expensive \`.com\` for a personal tool.

### Production SaaS
A professional top-level domain is expected. You must also configure subdomains properly (e.g., app.yourdomain.com for the application, yourdomain.com for the marketing site). 
Ensure your DNS provider (like Cloudflare or AWS Route 53) is robust, and DMARC/DKIM/SPF records are set up so your transactional emails do not go to spam.

---

## Domain Configuration

**What is your primary domain name?**
\`\`\`input
Write Here...
\`\`\`

**Where are you managing your DNS records? (e.g., Cloudflare, Namecheap, Route 53)**
\`\`\`input
Write Here...
\`\`\`

## AI DNS Assistant
\`\`\`prompt
Act as a DevOps Engineer. I am configuring my domain using the DNS provider I specified. Give me step-by-step instructions on how to point my apex domain and the www subdomain to my hosting provider. Explain what A records and CNAME records I need to add.
\`\`\`

## Final Checks
- [ ] Domain is purchased
- [ ] DNS records are pointed to the hosting provider
- [ ] SSL certificate is active
`,
  'webhostingdeploy': `# Hosting and Deployment

---

## Why this matters
Where and how your app lives dictates its speed, reliability, and ease of updates. A solid deployment pipeline means you can push new features in minutes without fear of breaking the live site.

## Strategic Guidance

### Hackathon Mode
Deploy to a Platform-as-a-Service like Vercel or Render. Connect your GitHub repository, click deploy, and never look back. Do not use raw virtual machines or complex Kubernetes clusters.

### Personal Project
Platform-as-a-Service is perfect here as well. They offer generous free tiers and zero-configuration deployments. Set up auto-deployments from your main branch so your live site updates whenever you push code.

### Production SaaS
You need a reliable, scalable infrastructure. While Vercel or Render is often still perfectly fine for the frontend, you must ensure your backend and database are in the same geographical region to minimize latency. 
- Implement preview environments for pull requests.
- Ensure environment variables are securely managed in a vault.
- Set up automated rollback mechanisms in case a deployment fails.

---

## Deployment Strategy

**Which hosting provider are you using for the Frontend?**
\`\`\`input
Write Here...
\`\`\`

**Which hosting provider are you using for the Backend and Database?**
\`\`\`input
Write Here...
\`\`\`

## AI Deployment Engineer
\`\`\`prompt
Act as a Cloud Architect. I am deploying my frontend and backend to the providers I listed above. Provide a checklist of the exact steps required to set up Continuous Deployment from GitHub for these platforms, and highlight any common pitfalls regarding environment variables or CORS.
\`\`\`

## Deployment Checklist
- [ ] Code is pushed to remote repository
- [ ] Hosting platform is connected to repository
- [ ] Production environment variables are set
- [ ] App builds successfully and is accessible via URL
`,
  'webanalyticssetup': `# Analytics Setup

---

## Why this matters
If you are not measuring it, you cannot improve it. Analytics tell you where users are coming from, where they drop off, and which features they actually use. Going blind into a launch is a massive mistake.

## Strategic Guidance

### Hackathon Mode
Skip it. You do not need analytics for a weekend project unless the project itself is an analytics dashboard.

### Personal Project
Add a lightweight, privacy-friendly analytics script like Plausible or Umami, or just stick to basic Google Analytics. You only need to know page views and basic referrers to see if anyone is using your tool.

### Production SaaS
You need actionable product analytics. 
- Implement PostHog, Mixpanel, or Amplitude.
- Track specific events (e.g., user signed up, button clicked, checkout completed).
- Set up a dashboard to monitor your primary conversion funnel.
- Ensure compliance with global privacy laws by adding a cookie consent banner if required.

---

## Metrics Definition

**Which analytics provider will you use?**
\`\`\`input
Write Here...
\`\`\`

**What are the 3 most important custom events you need to track?**
\`\`\`input
1.
2.
3.
\`\`\`

## AI Analytics Expert
\`\`\`prompt
Act as a Growth Hacker and Frontend Developer. I am integrating the analytics provider I chose into a React application. Provide the exact code snippets required to initialize the tracker, and create a helper function to track the 3 custom events I specified.
\`\`\`

## Implementation Check
- [ ] Tracking script added to the document head or initialized in app entry point
- [ ] Custom events are firing correctly in the network tab
- [ ] Data is showing up in the analytics dashboard
`,
  'weblegalpages': `# Legal Pages

---

## Why this matters
Terms of Service and Privacy Policies protect you from liability and comply with global privacy laws. While boring, omitting them from a commercial application can lead to account bans from payment processors or severe legal trouble.

## Strategic Guidance

### Hackathon Mode
Do not write legal pages. Put placeholder links in the footer if the design strictly requires it.

### Personal Project
If you are not collecting sensitive data or charging money, generic templates are fine. Use a free generator online. If you are using Google Analytics, you technically need a basic privacy policy stating that you use cookies.

### Production SaaS
You must have a clear Privacy Policy and Terms of Service. 
- Use services like Termly or Iubenda to generate compliant policies.
- Ensure you accurately disclose what data you collect, where it is stored, and who you share it with.
- If you process European user data, ensure complete GDPR compliance.

---

## Legal Requirements

**Are you collecting payments, sensitive personal data, or using 3rd party AI APIs? If yes, list them.**
\`\`\`input
Write Here...
\`\`\`

## AI Legal Draft Helper
\`\`\`prompt
Act as a Legal Consultant for tech startups. I am building a SaaS app. Based on the integrations and data collection I specified, generate a simple, readable Privacy Policy and Terms of Service template. Provide a robust starting point that I can later review with a real attorney.
\`\`\`

## Legal Checklist
- [ ] Terms of Service generated and linked in footer
- [ ] Privacy Policy generated and linked in footer
- [ ] Cookie consent banner added if applicable
`,
  'weblaunchchecklist': `# Launch Checklist

---

## Why this matters
Launch day is chaotic. A final checklist ensures you do not push to Product Hunt or social media with a broken signup flow, left-over debug statements, or exposed test API keys.

## Strategic Guidance

### Hackathon Mode
Is the demo recording working? Does the primary feature function on the live URL? If yes, submit it. The rest does not matter.

### Personal Project
Click through your app on both your laptop and your phone. Try to break it one last time. If the main functionality works, post it on Reddit or Twitter and celebrate.

### Production SaaS
A botched launch burns your first impression. 
- Do a full staging-to-production database wipe of test data.
- Verify payment webhooks are pointing to production, not test mode.
- Ensure automated emails are firing correctly.
- Test the site on a fresh incognito window.
- Have your social copy, screenshots, and launch assets ready.

---

## Pre-Launch Verification

**What are the critical systems that MUST be in Production Mode before launch? (e.g., Stripe, Sendgrid, Supabase)**
\`\`\`input
Write Here...
\`\`\`

## AI Launch Coordinator
\`\`\`prompt
Act as a Product Manager preparing for launch day. Create a comprehensive, day-of-launch checklist tailored for a web application. Include final code checks, marketing distribution channels, and post-launch monitoring tasks.
\`\`\`

## Final Sign-off
- [ ] Production API keys are active
- [ ] Signup flow tested successfully in Incognito mode
- [ ] Mobile responsiveness verified on a real device
- [ ] Take a deep breath, you are ready
`,
  'webanalytics': `# Post-Launch Analytics

---

## Why this matters
Once your app is live, you need to know if anyone is actually using it. Post-launch analytics transition you from "building blindly" to "iterating based on data." Understanding where users drop off in your funnel is the only way to systematically improve conversion rates and revenue.

## Strategic Guidance

### Hackathon Mode
Check your Vercel or Netlify dashboard to see if you have any traffic. If the numbers are going up, post about it on Twitter. Do not spend time building complex SQL dashboards.

### Personal Project
Log into Google Analytics or Plausible once a week. Look at your top referrers to see where your traffic is coming from. If people are finding your tool useful, consider adding a "Buy me a coffee" link or a newsletter signup.

### Production SaaS
You must establish a weekly routine of reviewing core metrics.
- Track Monthly Recurring Revenue (MRR), Churn Rate, and Customer Acquisition Cost (CAC).
- Set up automated reports to be sent to your team's Slack or email.
- Identify your "Aha! moment" metric (e.g., when a user adds their 3rd teammate, they never churn) and optimize the entire onboarding flow to push users toward that specific action.

---

## Analytics Review

**What is the single most important metric indicating your app is successful right now?**
\`\`\`input
Write Here...
\`\`\`

## AI Data Analyst
\`\`\`prompt
Act as a Data Analyst for a SaaS startup. I want to track the core metric I specified above. Suggest 3 specific events I need to log in my application to accurately measure this metric, and outline a simple weekly reporting structure to present to stakeholders.
\`\`\`

## Final Review
- [ ] Core metric identified
- [ ] Events are actively tracking the core metric
- [ ] Weekly analytics review scheduled
`,
  'webscalingstrategy': `# Scaling Strategy

---

## Why this matters
A successful launch brings traffic, and traffic brings database locks, memory leaks, and server crashes. A scaling strategy ensures your infrastructure can handle the load gracefully without burning through your entire cloud budget or going offline during peak hours.

## Strategic Guidance

### Hackathon Mode
Do absolutely nothing. If your app crashes because it has too much traffic, that is the best possible problem to have at a hackathon. Reboot the server and take a screenshot of the traffic spike.

### Personal Project
Keep an eye on your free tier limits. If you approach the database read/write limits on Firebase or Supabase, aggressively cache your public pages. You do not need Kubernetes or auto-scaling groups.

### Production SaaS
Scaling must be proactive, not reactive. 
- Separate your database read operations from write operations using read replicas.
- Implement aggressive CDN caching for all static assets and public-facing pages.
- Set up auto-scaling for your compute instances based on CPU utilization or queue length.
- Optimize your most expensive database queries by adding proper indexes.

---

## Bottleneck Identification

**What is the most likely technical bottleneck if your traffic suddenly 10x'd tomorrow? (e.g., Database writes, API rate limits, Image processing)**
\`\`\`input
Write Here...
\`\`\`

## AI DevOps Engineer
\`\`\`prompt
Act as a Senior Cloud Architect. My web application might experience a 10x traffic spike, and I believe the bottleneck I specified above will be the first thing to break. Provide a 3-step mitigation plan to resolve or bypass this bottleneck before it crashes my application.
\`\`\`

## Scaling Checklist
- [ ] Database indexes reviewed and optimized
- [ ] CDN caching implemented for static assets
- [ ] Rate limiting applied to heavy API endpoints
`,
  'webseooptimization': `# SEO Optimization

---

## Why this matters
Organic traffic is free traffic. If your web app or its marketing pages cannot be indexed by Google, you are entirely reliant on paid ads or viral marketing to survive. Proper Technical SEO ensures search engines can understand and rank your content.

## Strategic Guidance

### Hackathon Mode
Do not care about SEO. Hackathons are about the demo, not organic search traffic 6 months from now.

### Personal Project
Add basic meta titles and descriptions to your pages. Ensure your \`robots.txt\` and \`sitemap.xml\` are generated. This is usually enough for a personal tool to slowly climb the ranks for niche keywords.

### Production SaaS
SEO is a long-term compounding growth channel. 
- Implement dynamic OpenGraph images for all shareable content.
- Build a programmatic SEO strategy (e.g., generating landing pages for "Alternative to [Competitor]" or "[Tool] for [Industry]").
- Ensure your Core Web Vitals (LCP, FID, CLS) are in the green, as Google penalizes slow React applications.
- Set up a blog structure (using Next.js static generation or a CMS) to capture long-tail keywords.

---

## Keyword Strategy

**What are the top 3 search queries you want your application to rank for?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI SEO Specialist
\`\`\`prompt
Act as a Technical SEO Specialist. Based on the 3 search queries I provided, generate a content strategy to rank for them. Suggest 5 specific landing page titles, the optimal H1/H2 structure for those pages, and tips on how to structure the internal linking within a React application.
\`\`\`

## SEO Checklist
- [ ] Meta titles and descriptions added to all public pages
- [ ] Sitemap generated and submitted to Google Search Console
- [ ] OpenGraph tags implemented for social sharing
`,
  'webuserretention': `# User Retention

---

## Why this matters
Acquiring a new user is 5x more expensive than keeping an existing one. If your web app has a "leaky bucket" (users sign up but never return), all your marketing efforts are wasted. Retention strategies ensure users build habits around your product.

## Strategic Guidance

### Hackathon Mode
N/A. Retention happens over weeks. You have 48 hours.

### Personal Project
Send a simple "Welcome" email when they sign up, and perhaps one follow-up email a week later asking how they like the tool. Keep it entirely manual or use a basic Zapier automation.

### Production SaaS
You must orchestrate a comprehensive lifecycle marketing strategy. 
- Build a drip email campaign to educate users during their first 14 days.
- Use in-app modals or tooltips to highlight features they haven't used yet.
- Implement a "Win-back" campaign for users who haven't logged in for 30 days.
- Talk to churned users. Offer them an Amazon gift card to get on a 10-minute call to understand exactly why they left.

---

## Retention Analysis

**At what specific point do you consider a user "Retained"? (e.g., They complete 3 projects, they log in 4 days in a row)**
\`\`\`input
Write Here...
\`\`\`

## AI Lifecycle Marketer
\`\`\`prompt
Act as a Lifecycle Marketing Manager. Based on my definition of a retained user, write a 3-part automated email sequence (Welcome, Day 3 Education, Day 7 Check-in) designed to guide a brand new signup toward that exact retention milestone.
\`\`\`

## Retention Checklist
- [ ] Automated welcome email activated
- [ ] Aha! moment metric tracked
- [ ] Feedback survey sent to users who cancel their subscription
`,
  'webfeatureroadmap': `# Feature Roadmap

---

## Why this matters
A roadmap aligns your team, manages user expectations, and prevents scope creep. Without a clear prioritization framework, you will end up building obscure features for the loudest customer while ignoring the core value proposition that drives growth.

## Strategic Guidance

### Hackathon Mode
N/A.

### Personal Project
Keep a simple Kanban board (Trello or GitHub Projects) with three columns: To Do, Doing, Done. Add ideas to it when you think of them. Build the ones that sound fun or useful to you.

### Production SaaS
You must ruthless prioritize based on impact and effort. 
- Maintain a public-facing roadmap to show users the product is actively developing.
- Use a prioritization framework like RICE (Reach, Impact, Confidence, Effort) or Kano.
- Group features into Themes or Objectives (e.g., "Q3: Improve Enterprise Security") rather than just a massive list of disparate tickets.
- Always tie feature requests back to the user feedback loop to ensure you are building things people will actually pay for.

---

## Roadmap Planning

**What are the top 3 features your users have requested since launch?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Product Manager
\`\`\`prompt
Act as a Senior Product Manager. I have listed the top 3 features my users requested. Provide a framework to help me decide which one to build first. Outline the potential "Effort" and "Impact" vectors for each, and suggest a minimum viable version (V1) for the most complex feature.
\`\`\`

## Roadmap Checklist
- [ ] Public roadmap created and linked in the app or footer
- [ ] Backlog groomed and prioritized for the next sprint
- [ ] Large features broken down into shippable milestones
`,
  'webtechnicaldebt': `# Technical Debt

---

## Why this matters
Technical debt is the interest you pay on taking shortcuts. Left unchecked, it slows down feature development to a crawl, causes random regressions, and destroys developer morale. You must actively pay it down.

## Strategic Guidance

### Hackathon Mode
Embrace technical debt. Hardcode everything. Duplicate code everywhere. Do whatever it takes to make the demo work.

### Personal Project
Refactor when it annoys you. If a file gets too long and it is hard to navigate, split it up. If you find yourself copy-pasting the same button styles 10 times, extract it to a component. Do not over-engineer.

### Production SaaS
You must allocate dedicated time to pay down debt. 
- Dedicate 10-20% of every sprint exclusively to refactoring, upgrading dependencies, or improving test coverage.
- Track technical debt tickets in your primary backlog alongside product features so they are visible to management.
- Enforce strict linting, TypeScript typing, and CI/CD checks to prevent new debt from entering the codebase easily.
- Rewrite legacy components only when they actively block a new feature or cause frequent bugs.

---

## Debt Assessment

**What is the ugliest, most unmaintainable part of your codebase right now?**
\`\`\`input
Write Here...
\`\`\`

## AI Refactoring Guide
\`\`\`prompt
Act as a Staff Engineer. I need to refactor the unmaintainable part of my codebase I specified above. Suggest a step-by-step strategy to safely refactor this area without breaking existing functionality in production. Explain how I should approach testing the changes before deployment.
\`\`\`

## Debt Checklist
- [ ] Debt tickets added to the backlog
- [ ] Automated linting and formatting enforced
- [ ] Refactoring time allocated in the next sprint
`

};
