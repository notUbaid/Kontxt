export const fallbackContent: Record<string, string> = {
  'mobiletesting': `# Testing

🕒 **Estimated Time:** 4-8 hours

---

## Overview
Testing mobile apps is notoriously difficult because you have to account for touch gestures, varying screen sizes, and native device states. However, automated testing is the only way to guarantee that adding a new feature today doesn't break a critical feature from yesterday.

---

## Think First
**Are you writing tests to catch UI regressions, or testing complex business logic?**
\`\`\`input
Type your answer here...
\`\`\`
**How much time are you willing to dedicate to maintaining End-to-End (E2E) tests?**
\`\`\`input
Type your answer here...
\`\`\`
**Is your core functionality (like Checkout) critical enough that a bug would cost you money?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Unit Testing:** Use Jest to test pure business logic (e.g., a function that calculates tax). These are fast, cheap, and highly reliable.
- **Component Testing:** Use React Native Testing Library to mount components in memory and simulate button presses. Focus on testing *behavior* (e.g., "Does tapping submit call the API?"), not implementation details.
- **E2E Testing (Advanced):** Use Detox or Maestro. These tools install your app on a real emulator, physically tap the screen, and verify that the app behaves correctly. E2E tests are slow and flaky, but they are the only way to truly guarantee the app works.

---

## Common Mistakes
- **Testing Implementation:** Writing a test that asserts a button has backgroundColor: 'red'. When the designer changes it to blue, the test fails, even though the app works perfectly.
- **Mocking Too Much:** Mocking the database, the API, and the navigation until the test is just checking if your mocks talk to each other.
- **Ignoring CI/CD:** Writing tests but not running them automatically on GitHub Actions before every pull request.

---

## Examples
- **Component Test:** Rendering the Login screen, using React Native Testing Library to type "test@example.com" into the email field, pressing "Login", and asserting that the mockLoginFn was called with the correct email.

---

## AI Prompt
\`\`\`prompt
I am using Jest and React Native Testing Library. Generate a component test for a 'LoginForm' component. The test should verify that the submit button is disabled if the email is invalid, and that pressing submit with valid credentials calls the provided 'onSubmit' prop with the correct data.
\`\`\`

---

## Validation Checklist
- [ ] Jest is configured correctly for the React Native environment.
- [ ] Critical utility functions and data transformations have unit tests.
- [ ] Key UI flows (like Authentication or Checkout) have component or E2E tests.
- [ ] Tests run automatically on your CI provider (e.g., GitHub Actions).

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/components/__tests__/LoginForm.test.tsx
**Purpose:** Ensures regressions do not break critical UI workflows.
**Contents:** Automated tests simulating user interactions using Testing Library.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
Congratulations, you have completed Phase 3! Move on to Phase 4 to prepare your app for **Production Readiness**.`,
  'mobilepayments': `# Payments & Subscriptions

🕒 **Estimated Time:** 4-8 hours

---

## Overview
Monetizing a mobile app requires integrating with Apple's App Store and Google Play billing systems. If you try to bypass their 30% cut by exclusively using a third-party gateway (like Stripe) for digital goods, Apple and Google will reject your app during review.

---

## Think First
**Are you selling physical goods/services or digital content?**
\`\`\`input
Type your answer here...
\`\`\`
**Physical Goods (e.g., Uber, food delivery): Use Stripe or Braintree.**
\`\`\`input
Type your answer here...
\`\`\`
**Digital Goods (e.g., Premium features, ad removal): You MUST use Apple/Google In-App Purchases (IAP).**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **IAP Management:** Integrating native IAP from scratch is notoriously difficult. Use a managed service like RevenueCat. It acts as a single source of truth for user subscriptions across both iOS and Android.
- **Backend Verification:** Never trust the mobile client to verify a purchase. Always validate receipts on your secure backend to prevent users from spoofing purchases and stealing premium features.

---

## Common Mistakes
- **Bypassing App Store Rules:** Adding a hidden Stripe link to buy a digital subscription to avoid the 30% fee. Your app will be permanently banned.
- **Ignoring Subscription Lifecycles:** Failing to handle subscription renewals, cancellations, or billing issues (when a user's credit card expires).

---

## Examples
- **Stripe:** A user orders a physical pair of shoes and checks out using Apple Pay via the Stripe React Native SDK.
- **RevenueCat:** A user taps "Upgrade to Pro" to unlock a digital feature. RevenueCat securely handles the App Store transaction and updates the user's entitlement in your database.

---

## AI Prompt
\`\`\`prompt
I am building a React Native app and need to implement In-App Purchases for a 'Pro' subscription. Generate a complete implementation using RevenueCat (react-native-purchases). Include the initialization logic, a function to fetch available offerings, and a function to trigger the purchase flow. Explain how to securely verify the purchase on a Supabase backend.
\`\`\`

---

## Validation Checklist
- [ ] Appropriate payment gateway selected based on digital vs physical goods.
- [ ] Purchases successfully unlock premium features.
- [ ] Purchases are validated server-side.
- [ ] User can restore previous purchases (crucial App Store requirement).

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/services/purchases.ts
**Purpose:** Handles all interactions with the payment gateway (RevenueCat or Stripe).
**Contents:** Functions for initializing the SDK, fetching products, and processing payments.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With monetization active, implement **Media Uploads** to allow users to generate robust content.`,
  'mobilebackendimplementation': `# Backend Implementation

🕒 **Estimated Time:** 3-6 hours

---

## Overview
While BaaS (Backend as a Service) platforms like Supabase or Firebase handle direct data access, a custom backend layer is essential for complex business logic, third-party integrations (like Stripe), and secure operations that cannot be trusted to the mobile client.

---

## Think First
**Are there operations that require keeping API keys secret (e.g., charging credit cards, sending emails)?**
\`\`\`input
Type your answer here...
\`\`\`
**Does the logic require heavy computation that would drain a mobile battery?**
\`\`\`input
Type your answer here...
\`\`\`
**Can this be handled by Edge Functions or Serverless functions, or do you need a dedicated server?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Architecture:** Serverless Edge Functions (via Vercel or Supabase) are ideal for mobile backends because they spin up instantly and scale infinitely without server maintenance.
- **Language Stack:** Using TypeScript (Node.js/Edge) on the backend allows you to share types directly with your React Native frontend, preventing a massive class of bugs.
- **Validation:** Always validate incoming data from the mobile app using a library like Zod before processing it.

---

## Common Mistakes
- **Fat Clients:** Putting complex business logic (like calculating tax rates or processing image metadata) directly in the mobile app. This forces app store updates for simple logic changes.
- **Exposing Secrets:** Hardcoding backend API keys (like Stripe Secret Key) in the mobile app bundle. Mobile apps are easily decompiled.
- **Ignoring Latency:** Mobile connections are often slow. Minimize the number of API calls by aggregating data on the backend before sending it to the client.

---

## Examples
- **Payment Processing:** The mobile app sends a request to an Edge Function, which securely talks to Stripe to create a payment intent, then returns the safe client secret to the app.
- **Push Notification Trigger:** A backend webhook listens for a database insert and triggers an automated push notification to the relevant user via OneSignal.

---

## AI Prompt
\`\`\`prompt
I need a serverless Edge Function written in TypeScript (for Supabase) that handles user checkout. It should receive a product ID and user ID, securely query the database for the price, create a Stripe PaymentIntent, and return the client secret to the mobile app. Include Zod validation for the incoming request.
\`\`\`

---

## Validation Checklist
- [ ] Backend routes are protected and verify the user's authentication token.
- [ ] Secret API keys are stored as environment variables on the server, not in the app.
- [ ] Input data is strictly validated.
- [ ] Responses are structured consistently (e.g., returning { data, error }).

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** supabase/functions/checkout/index.ts (or equivalent backend route)
**Purpose:** Secure execution of business logic.
**Contents:** An endpoint that validates input, processes an external API call, and returns formatted data.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With the backend logic solid, configure **Push Notifications** to start engaging users proactively.`,
  'mobiledatabaseimplementation': `# Database Implementation

🕒 **Estimated Time:** 2-5 hours

---

## Overview
Your database is the foundation of your app's data. In mobile development, you must bridge the gap between the remote cloud database and the local device cache. A robust implementation ensures data is structured efficiently for quick reads and structured securely to prevent unauthorized access.

---

## Think First
**Does this data need to be strictly relational, or is a document model sufficient?**
\`\`\`input
Type your answer here...
\`\`\`
**What are the most common queries the app will run? (Optimize for reads).**
\`\`\`input
Type your answer here...
\`\`\`
**Are there strict privacy requirements? (Row Level Security).**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Cloud Database:** PostgreSQL (via Supabase) offers strict relational schemas and powerful JSONB capabilities. Firebase Firestore is excellent for real-time document sync.
- **Local Database (Optional):** If your app requires heavy offline capabilities, consider WatermelonDB or Realm to sync local data with the remote server.
- **Security:** Use Row Level Security (RLS) policies. Your mobile app acts as an untrusted client; the database must enforce access rules natively.

---

## Common Mistakes
- **Client-Side Filtering:** Downloading 10,000 rows to the mobile device and filtering them in JavaScript. Always filter and paginate on the database/backend.
- **Missing Indexes:** Failing to index frequently queried columns (like user_id), causing queries to slow down drastically as data grows.
- **Trusting the Client:** Allowing the mobile app to blindly update critical fields (like account_balance) without server-side validation.

---

## Examples
- **Relational Data:** A posts table that links to a users table via foreign keys, ensuring data integrity.
- **Real-time Subscriptions:** Listening to a specific chat room row in Supabase so the UI updates instantly when a new message is inserted.

---

## AI Prompt
\`\`\`prompt
I am setting up a PostgreSQL database in Supabase for a social mobile app. I have users, posts, and comments. Generate the SQL schema for these tables including necessary foreign keys, indexes for performance, and Row Level Security (RLS) policies ensuring users can only edit their own posts.
\`\`\`

---

## Validation Checklist
- [ ] Schema is defined with appropriate data types and relations.
- [ ] Row Level Security (RLS) is active to prevent unauthorized reads/writes.
- [ ] Indexes are created for columns frequently used in WHERE clauses.
- [ ] Client application successfully performs CRUD operations.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** supabase/migrations/01_initial_schema.sql
**Purpose:** Defines the foundational database architecture.
**Contents:** SQL commands defining tables, relations, and security policies.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
Now that the database is structured, build the **Backend APIs** to execute complex logic and interface with this data safely.`,
  'mobileauth': `# Authentication

🕒 **Estimated Time:** 2-4 hours

---

## Overview
Authentication is the gatekeeper of your mobile app. It verifies who the user is and manages their session. Unlike web apps where cookies handle much of the heavy lifting, mobile apps require securely storing tokens locally and refreshing them seamlessly to keep users logged in indefinitely.

---

## Think First
**Will users log in with email/password, or social providers (Google, Apple)?**
\`\`\`input
Type your answer here...
\`\`\`
**(iOS Only) Apple strictly requires "Sign in with Apple" if you offer any other social login.**
\`\`\`input
Type your answer here...
\`\`\`
**Do you need OTP (One Time Password) via SMS or email?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Auth Provider:** Supabase or Firebase Auth handle social logins, secure token storage, and password resets out of the box, saving you weeks of backend work.
- **Token Storage:** Never store JWTs in plain AsyncStorage. Use expo-secure-store or a keychain equivalent to encrypt sensitive tokens.
- **Session Restoration:** When the app cold starts, you must immediately check for a stored token and restore the session before rendering the main UI.

---

## Common Mistakes
- **Rolling your own Auth:** Writing custom password hashing and JWT issuance is a security nightmare. Use a managed provider.
- **Forgetting Token Refresh:** If your token expires after an hour and you don't implement a refresh flow, users will be randomly logged out while using the app.
- **Blocking Onboarding:** Forcing users to create an account before they even see what the app does. Allow guest access if possible.

---

## Examples
- **Social Login:** A one-tap "Continue with Google" button that securely redirects back to the app using Deep Links.
- **Magic Links:** Sending an email with a secure link that logs the user in upon clicking, eliminating password fatigue.

---

## AI Prompt
\`\`\`prompt
I am building an Expo React Native app using Supabase for authentication. Generate a complete authentication flow including: a sign-in screen, a sign-up screen, and an AuthProvider context that automatically checks for a session on app start and securely stores the token.
\`\`\`

---

## Validation Checklist
- [ ] User can successfully sign up and log in.
- [ ] The app remembers the user across app restarts (session restoration).
- [ ] "Sign in with Apple" is implemented if other social logins are used (iOS requirement).
- [ ] Tokens are stored securely using SecureStore.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/contexts/AuthContext.tsx
**Purpose:** Manages the authentication state globally.
**Contents:** Context provider that handles login, logout, and session restoration logic.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With users authenticated, move on to connecting the **Database** to store and retrieve their specific data.`,
  'referral-programs': `# Referral Programs

**🕒 Estimated Time:** Ongoing

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

**🕒 Estimated Time:** Ongoing

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

**🕒 Estimated Time:** Ongoing

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

**🕒 Estimated Time:** Ongoing

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

**🕒 Estimated Time:** 2 hours

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

**🕒 Estimated Time:** 1-2 weeks

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

**🕒 Estimated Time:** 2 hours

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

**🕒 Estimated Time:** 1 hour

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

**🕒 Estimated Time:** 4 hours

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

**🕒 Estimated Time:** 1 hour

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

**🕒 Estimated Time:** 2 hours

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

**🕒 Estimated Time:** 4 hours

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

**🕒 Estimated Time:** 4 hours

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

🕒 **Estimated Time:** 1-3 hours

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

🕒 **Estimated Time:** 2-4 hours

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

🕒 **Estimated Time:** 2-3 hours

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

🕒 **Estimated Time:** 2-4 hours

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

🕒 **Estimated Time:** 2-4 hours

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

🕒 **Estimated Time:** 3-6 hours

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

🕒 **Estimated Time:** 1-2 hours

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

🕒 **Estimated Time:** 3-5 hours

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

🕒 **Estimated Time:** 3-6 hours

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

🕒 **Estimated Time:** 3-5 hours

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

🕒 **Estimated Time:** 2-4 hours

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

🕒 **Estimated Time:** 4-8 hours

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

🕒 **Estimated Time:** 2-4 hours

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

🕒 **Estimated Time:** 1-2 hours

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

🕒 **Estimated Time:** 5 min

---

## Why this matters
Before you write a single line of code, you must align on your philosophy. The way you build changes drastically depending on your end goal. Kontxt dynamically adjusts its playbook based on the mode you select.

## Strategic Guidance

### Hackathon Mode
In Hackathon Mode, speed is everything. Your only goal is to build a visually impressive demo before the clock runs out. 

You will ignore scalable architecture, skip rigorous testing, and fake backend data if necessary. Technical debt is not a concern; the only thing that matters is the final presentation to the judges. Stay ruthless with your scope.

### Personal Project
In Personal Project mode, your goal is learning and zero-cost maintenance. 

You are building this to scratch an itch or bolster your resume. You should optimize for using free tiers (Vercel, Supabase, Render) and experimenting with new, exciting tech stacks that you want to master. Don't over-engineer it for scale you don't have.

### Production SaaS
In Production SaaS mode, you are building a real business that will accept credit cards. 

This means you cannot cut corners on security, authentication, or basic architecture. You must build a robust foundation that won't collapse when you get your first 100 paying customers. You need proper testing, staging environments, and database migrations.


## Accountability Check
- [ ] I understand the philosophy of my chosen mode and I am ready to begin.
`,
  'ideadefinition': `# Idea Definition

🕒 **Estimated Time:** 20 min

---

## Why this matters
An idea is just a multiplier of execution. Choosing the right idea dictates how hard the execution will be.

## Strategic Guidance

### Hackathon Mode
Your idea should optimize for "wow factor" and technical complexity. Judges love flashy tech (Generative AI, WebGL, Real-time collaboration). Business viability does not matter; visual impact does. 

If your idea is "a better to-do app," you will lose, no matter how clean the code is. Your idea must have a demo that makes people say "Whoa" within the first 15 seconds.

### Personal Project
Choose an idea that forces you to learn a new stack or tool you want on your resume. If you want to learn WebSockets, build a chat app. If you want to learn AI, build a RAG application.

Keep the scope small enough that you can actually finish it. A finished simple project is worth 100x more than an unfinished complex project.

### Production SaaS
Your idea must solve a highly painful, monetizable problem. Flashy tech does not matter; solving the pain matters. 

If people are currently using a messy spreadsheet and duct-taping it to Zapier, that is a billion-dollar idea. If they are just mildly annoyed but not losing money, discard the idea. If people won't pay for it on Day 1, do not write a single line of code.


## The Core Concept
\`\`\`input
Write Here...
\`\`\`
`,
  'problemstatement': `# Problem Statement

🕒 **Estimated Time:** 20 min

---

## Why this matters
If you don't clearly define the problem, you will build a solution looking for a use case. The best software eliminates a specific, acute pain point.

## Strategic Guidance

### Hackathon Mode
Hackathons are often themed (e.g., "AI for Good", "Future of Finance"). Your problem statement should directly align with the hackathon's core theme to maximize your chances of winning.

Don't worry if the problem is slightly contrived; as long as the judges resonate with it emotionally, it serves its purpose for the pitch.

### Personal Project
For a personal project, the best problem statement is one you personally experience every day.

"I hate having to manually format my resume every time I apply for a job." This is a fantastic problem statement because you are the user. You don't need market research to validate it.

### Production SaaS
In a Production SaaS, the problem must be monetizable. It must be a "Hair on Fire" problem.

If the user's hair is on fire, and you offer them a brick, they will buy it to put the fire out. That is how painful the problem needs to be. If the problem is just "it would be nice if this was 10% faster," it will be incredibly difficult to get people to pay for it.


## Define the Problem
\`\`\`input
Write Here...
\`\`\`
`,
  'userpainpoints': `# User Pain Points

🕒 **Estimated Time:** 15 min

---

## Why this matters
Pain points are the granular symptoms of your Problem Statement. Identifying the exact friction points allows you to design features that directly neutralize them.

## Strategic Guidance

### Hackathon Mode
Focus on visual pain points. What current process looks the ugliest or takes the most manual clicks? 

If you can show a "Before" video of a user struggling with 10 clunky steps, and an "After" video of your app doing it in 1 click, the judges will love it.

### Personal Project
Map out your exact workflow. Where do you sigh in frustration? Where do you resort to using a messy Excel sheet? Those are your pain points.

### Production SaaS
Rank pain points by how much money or time they waste. 

When you talk to users, listen for emotional words: "I hate", "It's so annoying", "I lose hours doing this." If a pain point doesn't evoke a strong emotional response, it's not painful enough to build a SaaS around.


## The Pain Points
\`\`\`input
Write Here...
\`\`\`
`,
  'targetusers': `# Target Users

🕒 **Estimated Time:** 10 min

---

## Why this matters
"Everyone" is not a target audience. If you build for everyone, you build for no one. You need a highly specific niche to gain initial traction.

## Strategic Guidance

### Hackathon Mode
Your target user is the judging panel. 

If the judges are mostly engineers, build a dev-tool. If the judges are business executives, build a dashboard. Tailor the entire experience to the people grading you.

### Personal Project
Your target user is you, and perhaps a small community you are a part of (e.g., a specific Discord server or a niche subreddit).

### Production SaaS
Your target users must be "desperate" and "reachable." 

If your target users are "Small Business Owners," that is too broad. How do you reach them? Instead, target "Independent Dental Practices in the US who struggle with scheduling." Now you know exactly who to cold-email and what their specific needs are.


## Your Specific Audience
\`\`\`input
Write Here...
\`\`\`
`,
  'icpidealcustomerprofile': `# Ideal Customer Profile (ICP)

🕒 **Estimated Time:** 15 min

---

## Why this matters
While a Target User is a *person*, an ICP is the *company* or *entity* that employs them. Knowing your ICP tells you who has the budget to pay for your product.

## Strategic Guidance

### Hackathon Mode
Skip this entirely. You don't need a corporate ICP for a weekend project.

### Personal Project
Skip this. You are building for individuals, not B2B companies.

### Production SaaS
You must define the company size, revenue, and industry. 

For example: "B2B SaaS companies with 50-200 employees, doing $5M-$20M in ARR, struggling with churn." If a company with 5 employees tries to buy your product, they are NOT your ICP, and you should not build custom features for them, even if they complain.


## Define the ICP
\`\`\`input
Write Here...
\`\`\`
`,
  'personas': `# Personas

🕒 **Estimated Time:** 15 min

---

## Why this matters
Personas humanize your target users. They help you design the UI and dictate your copywriting. If you don't know exactly who is sitting on the other side of the screen, you will build generic software that nobody loves.

## Strategic Guidance

### Hackathon Mode
When building for a hackathon, personas are less about deep psychological profiling and more about identifying the "wow factor" for the judges. 

Don't waste time interviewing users. Pick one extreme persona that makes your demo look incredible. For example, if you are building an AI email writer, your persona isn't "a business owner"—it's "a dyslexic teenager trying to write college applications." The extreme persona makes the demo shine.

### Personal Project
For a personal project, the persona is usually you. You are scratching your own itch.

However, it's still worth documenting *why* you are frustrated. What workflow is currently breaking for you? By writing this down, you ensure you don't lose sight of the original problem when you start getting distracted by shiny new frameworks.

### Production SaaS
In a Production SaaS, you must differentiate between the "User" (who clicks the buttons) and the "Buyer" (who signs the check). They often want completely different things.

For example, if you are building HR software, the User (the employee) wants a beautiful, fast UI. The Buyer (the HR Director) wants deep analytics and compliance tracking. If you only build for the User, you will never get paid. If you only build for the Buyer, the Users will hate your software.


## Accountability Check
- [ ] I understand the difference between the user and the buyer.
`,
  'solutionstatement': `# Solution Statement

🕒 **Estimated Time:** 10 min

---

## Why this matters
This is the core mechanic of your product. How exactly does your software eliminate the pain point?

## Strategic Guidance

### Hackathon Mode
Your solution must sound like magic. "We use AI to instantly..." or "A real-time Web3 protocol that..." 

The technical "how" is less important than the impressiveness of the "what."

### Personal Project
The solution should be an elegant, lightweight script or app that automates the boring part of your workflow.

### Production SaaS
The solution must be a scalable software product that integrates into the user's existing habits. 

Don't force users to change their behavior. If they live in Slack, your solution should be a Slack bot. If they live in their inbox, your solution should integrate with Gmail.


## Describe the Solution
\`\`\`input
Write Here...
\`\`\`
`,
  'valueproposition': `# Value Proposition

🕒 **Estimated Time:** 15 min

---

## Why this matters
A value proposition is a concise promise of value to be delivered. It is the #1 reason a prospect should buy from you instead of your competitors. It's the headline of your landing page.

## Strategic Guidance

### Hackathon Mode
Your value proposition is the hook for your presentation. 

"We built Tinder for X" or "We make X 100x faster using LLMs." It needs to be catchy, memorable, and instantly understood by a tired judge at 2 AM.

### Personal Project
Your value proposition is simply the time or mental energy you are saving yourself.

### Production SaaS
Your value proposition must focus on outcomes, not features. 

Bad: "We have an AI-powered dashboard with real-time analytics."
Good: "Cut your customer churn in half without hiring more support agents."
People don't buy dashboards; they buy lower churn.


## The Core Value Prop
\`\`\`input
Write Here...
\`\`\`
`,
  'elevatorpitch': `# Elevator Pitch

🕒 **Estimated Time:** 10 min

---

## Why this matters
You have 30 seconds to explain what you do before the person stops listening. The elevator pitch is your standard answer to "So, what are you working on?"

## Strategic Guidance

### Hackathon Mode
Your pitch must be high-energy and focus on the impressive technology you managed to stitch together in 48 hours.

### Personal Project
Keep it casual. "I got annoyed by X, so I built a little app that does Y."

### Production SaaS
Use the standard format: "For [Target User] who [Problem], our product is a [Category] that provides [Value Proposition]. Unlike [Competitor], we [Key Differentiator]."

Practice this until you can say it smoothly without sounding like a robot.


## Your Pitch
\`\`\`input
Write Here...
\`\`\`
`,
  'marketresearch': `# Market Research

🕒 **Estimated Time:** 20 min

---

## Why this matters
If you build something nobody wants to buy, you are just doing expensive charity work. Market research validates that there is actually money to be made.

## Strategic Guidance

### Hackathon Mode
Market research doesn't matter for a hackathon. Make up a plausible-sounding Total Addressable Market (TAM) statistic for your pitch deck (e.g., "This is a $50 Billion industry"). The judges won't verify it; they just want to see that you understand the format of a pitch.

### Personal Project
You are your own market. Research is unnecessary unless you are trying to learn a specific industry's domain knowledge.

### Production SaaS
Do not write code until you have spoken to at least 5 people in your target market who have explicitly stated they would pay for a solution to their problem. 

You should research exactly where these people hang out online. If you can't find a place where 10,000 of your potential customers congregate (a subreddit, a Facebook group, a LinkedIn niche), your market might be too hard to reach.


## Accountability Check
- [ ] I have validated my market assumptions.
`,
  'competitoranalysis': `# Competitor Analysis

🕒 **Estimated Time:** 15 min

---

## Why this matters
If you have no competitors, you either have a brilliant blue-ocean idea, or (more likely) you are building something useless. Competitors prove the market exists. Analyzing them shows you how to beat them.

## Strategic Guidance

### Hackathon Mode
Find the biggest, slowest, most hated competitor in the space (like Oracle or Jira) and position your hackathon project as the "AI-native, lightning-fast alternative." It makes for a great David vs. Goliath story during the pitch.

### Personal Project
Look at competitors to steal their UI/UX patterns. You don't need to reinvent the wheel for a weekend project.

### Production SaaS
Find 3 direct competitors. Sign up for their free trials. 

Identify their biggest weakness. Do they have terrible customer support? Is their UI from 2010? Are they too expensive for small businesses? Your product must be 10x better on that *one specific axis*. Don't try to beat them on features; they have 100 engineers and you have 1. Beat them on user experience or niche focus.


## List Your Top 3 Competitors
\`\`\`input
Write Here...
\`\`\`
`,
  'existingalternatives': `# Existing Alternatives

🕒 **Estimated Time:** 15 min

---

## Why this matters
Your biggest competitor isn't a startup; it's Microsoft Excel. Or a piece of paper. What are they using right now?

## Strategic Guidance
- **Hackathon Mode:** Skip this. 
- **Personal Project:** Skip this.
- **Production SaaS:** You must convince them to change their current habits. Changing habits is incredibly hard.
- **Custom Mode:** Legacy on-premise systems are usually the existing alternative. Prepare a migration strategy.

## Accountability Check
- [ ] I understand the friction involved in making a user switch from their current solution.
`,
  'marketpositioning': `# Market Positioning

🕒 **Estimated Time:** 20 min

---

## Why this matters
Are you the cheap, fast alternative? Or the expensive, premium, enterprise-grade solution? 

## Strategic Guidance
- **Hackathon Mode:** You are the "cool, AI-powered" alternative.
- **Personal Project:** You are the "free, open-source" alternative.
- **Production SaaS:** Never compete on price. Be the "fastest, best UX" or the "most specialized for [niche]" alternative.
- **Custom Mode:** You are the "most secure, compliant, and scalable" alternative.

## AI Brainstorming Phase
\`\`\`prompt
Act as a Brand Strategist. Based on my competitors, suggest 3 different ways I can position my product in the market to stand out.
\`\`\`

## Accountability Check
- [ ] I know exactly where my product sits in the market landscape.
`,
  'featureplanning': `# Feature Planning

🕒 **Estimated Time:** 20 min

---

## Why this matters
Scope creep is the death of all software. If you don't define what you are building, you will build forever.

## Strategic Guidance
- **Hackathon Mode:** Only build features that look good in a demo video.
- **Personal Project:** Build features that require the specific technology you want to learn.
- **Production SaaS:** Build only what is required to solve the core pain point. Ignore "nice to have" features.
- **Custom Mode:** Map features directly to enterprise compliance and workflow requirements.

## Accountability Check
- [ ] I am ready to ruthlessly cut features.
`,
  'mvpfeatures': `# MVP Features

🕒 **Estimated Time:** 20 min

---

## Why this matters
The Minimum Viable Product (MVP) is the absolute bare minimum you can build to solve the core problem. Every extra feature delays your launch and increases your risk of failure.

## Strategic Guidance

### Hackathon Mode
Your MVP is just whatever you can finish before 8:00 AM on Sunday. 

Focus entirely on the "happy path." If a user clicks the wrong button, let the app crash. You will only be clicking the right buttons during the demo anyway.

### Personal Project
Your MVP should consist of 1 to 3 core features. If it takes you longer than 2 weekends to build your MVP, your scope is too large. Cut features mercilessly.

### Production SaaS
Your MVP must be robust enough to charge money for, but small enough to launch in 4-6 weeks. 

Do not build a "Settings" page with customizable themes. Do not build social login (just use email/password or magic links). Build the one core mechanic that solves the hair-on-fire problem. Everything else is a distraction.


## Define the MVP Features
\`\`\`input
Write Here...
\`\`\`
`,
  'futurefeatures': `# Future Features

🕒 **Estimated Time:** 10 min

---

## Why this matters
Put your great (but unnecessary) ideas here so they don't distract you today.

## Strategic Guidance
- **Hackathon Mode:** Mention these in your pitch to show "future potential".
- **Personal Project:** Ignore these until the MVP is deployed.
- **Production SaaS:** Do not build these until users are explicitly asking for them.
- **Custom Mode:** These form your 18-month enterprise roadmap.

## Accountability Check
- [ ] I will not build these features today.
`,
  'featureprioritization': `# Feature Prioritization

🕒 **Estimated Time:** 15 min

---

## Why this matters
You have limited time and engineering resources.

## Strategic Guidance
- **Hackathon Mode:** Prioritize UI/UX and the core "magic moment".
- **Personal Project:** Prioritize the hardest technical challenge first to get it out of the way.
- **Production SaaS:** Use the ICE framework (Impact, Confidence, Ease). Prioritize high impact, high ease.
- **Custom Mode:** Prioritize features that unblock enterprise procurement (e.g., Security, SAML).

## Accountability Check
- [ ] I know exactly what I am building first.
`,
  'businessmodel': `# Business Model

🕒 **Estimated Time:** 15 min

---

## Why this matters
How are you going to make money? A great product with a broken business model is a charity. A mediocre product with a brilliant business model is a billion-dollar company.

## Strategic Guidance

### Hackathon Mode
Completely ignore this. You are not building a business; you are building a demo.

### Personal Project
Ignore this. Your goal is learning, not revenue.

### Production SaaS
The standard SaaS model is a monthly recurring subscription (MRR). 

However, consider usage-based pricing (like Stripe or OpenAI) if your costs scale directly with user activity. Do not offer a "freemium" tier unless you have millions of dollars in VC funding to subsidize free users. Instead, offer a 14-day free trial requiring a credit card upfront.


## Choose Your Model
\`\`\`input
Write Here...
\`\`\`
`,
  'pricing': `# Pricing Strategy

🕒 **Estimated Time:** 15 min

---

## Why this matters
Pricing is the most under-utilized growth lever.

## Strategic Guidance
- **Hackathon Mode:** Skip.
- **Personal Project:** Free.
- **Production SaaS:** Charge more than you think. If nobody complains about the price, it's too cheap.
- **Custom Mode:** Minimum contract value of $10,000/year to justify sales overhead.

## Accountability Check
- [ ] I will not underprice my product.
`,
  'subscriptionmodel': `# Subscription Model

🕒 **Estimated Time:** 10 min

---

## Why this matters
Monthly Recurring Revenue (MRR) is the holy grail of software.

## Strategic Guidance
- **Hackathon Mode:** Skip.
- **Personal Project:** Skip.
- **Production SaaS:** Offer annual plans at a 20% discount to lock in cash flow.
- **Custom Mode:** Multi-year lock-ins with mandatory implementation fees.

## Accountability Check
- [ ] I understand MRR dynamics.
`,
  'revenuestreams': `# Revenue Streams

🕒 **Estimated Time:** 10 min

---

## Why this matters
Focus on one revenue stream until you hit $1M ARR.

## Strategic Guidance
- **Hackathon Mode:** Skip.
- **Personal Project:** Skip.
- **Production SaaS:** Focus entirely on your core SaaS subscription.
- **Custom Mode:** Software licensing + Professional Services / Training.

## Accountability Check
- [ ] I will not distract myself with multiple revenue streams yet.
`,
  'successmetrics': `# Success Metrics

🕒 **Estimated Time:** 15 min

---

## Why this matters
You cannot improve what you do not measure.

## Strategic Guidance
- **Hackathon Mode:** Did it crash during the demo? No? Success.
- **Personal Project:** Did I learn the framework? Yes? Success.
- **Production SaaS:** Track Activation Rate and Month 1 Retention. If they churn immediately, the product is broken.
- **Custom Mode:** Net Revenue Retention (NRR) must be >110%.

## Accountability Check
- [ ] I know what success looks like.
`,
  'kpis': `# KPIs (Key Performance Indicators)

🕒 **Estimated Time:** 15 min

---

## Why this matters
KPIs tell you if the business is healthy.

## Strategic Guidance
- **Hackathon Mode:** Skip.
- **Personal Project:** Skip.
- **Production SaaS:** Customer Acquisition Cost (CAC) and Lifetime Value (LTV).
- **Custom Mode:** Sales cycle length and Pipeline Velocity.

## Accountability Check
- [ ] I understand my primary KPIs.
`,
  'northstarmetric': `# North Star Metric

🕒 **Estimated Time:** 15 min

---

## Why this matters
The one metric that best captures the core value your product delivers to its customers.

## Strategic Guidance
- **Hackathon Mode:** Skip.
- **Personal Project:** Skip.
- **Production SaaS:** e.g., For Airbnb, it's "Nights Booked". For WhatsApp, it's "Messages Sent".
- **Custom Mode:** Must tie directly to enterprise cost savings or revenue generation.

## Accountability Check
- [ ] I have identified my North Star Metric.
`,
  'prd': `# Product Requirements Document (PRD)

🕒 **Estimated Time:** 30 min

---

## Why this matters
The PRD is the ultimate source of truth for your product. It bridges the gap between "what we want to build" (business) and "how we will build it" (engineering). Without a PRD, scope creep will kill your project.

## Strategic Guidance

### Hackathon Mode
Skip the formal PRD. Your PRD is just a bulleted list of the 3 features you need to build before the presentation. Do not waste time formatting a document that no one will read.

### Personal Project
A lightweight PRD is highly recommended. Write down exactly what you are building and, more importantly, what you are NOT building. When you get distracted by a shiny new feature on Sunday afternoon, look at the PRD to re-focus.

### Production SaaS
The PRD is mandatory. It must define the core user flows, the acceptance criteria for every feature, and the exact metrics for success. If a feature is not in the PRD, it does not get built. The PRD is the contract between the founder and the engineering team.


## PRD Generation
\`\`\`prompt
Act as a Senior Product Manager. Based on my project so far, draft a comprehensive PRD.
\`\`\`
- [ ] I have generated and saved my PRD.
`,
  'userflows': `# User Flows

🕒 **Estimated Time:** 20 min

---

## Why this matters
User flows map out the exact path a user takes to accomplish a goal. If the flow is confusing, the user will abandon your app. It dictates your UI layout.

## Strategic Guidance

### Hackathon Mode
You only need one user flow: The "Happy Path" that you will click through during your demo. Map it out so you know exactly which screens to build. Ignore edge cases and error states.

### Personal Project
Map out the core flow on a piece of paper. You don't need fancy software. Just ensure you know how to get from the landing page to the core value proposition.

### Production SaaS
You must map out onboarding, core usage, and retention flows. Where do users drop off? How many clicks does it take to get to the "Aha!" moment? Your user flow should aggressively minimize friction during onboarding.


## Flow Diagram Generation
\`\`\`prompt
Generate a Mermaid.js user flow diagram for the onboarding process of my app.
\`\`\`
- [ ] I have mapped out my core user flows.
`,
  'informationarchitecture': `# Information Architecture

🕒 **Estimated Time:** 20 min

---

## Why this matters
Information Architecture (IA) is the skeleton of your app. It dictates how pages are organized and how users navigate between them. If your IA is confusing, users will get lost and abandon your app.

## Strategic Guidance

### Hackathon Mode
Keep it flat. You don't have time to build nested navigation or complex routing. Your entire app should ideally be a single dashboard or a 3-step linear flow (Home -> Action -> Result).

### Personal Project
Map out a simple sitemap. A Top Nav for global pages, and a Sidebar for nested settings, is usually sufficient. Stick to standard, recognizable patterns.

### Production SaaS
Your IA must support future scalability. 

If you add 10 new features next year, where will they live in the navigation? You need a robust hierarchy. Differentiate between global navigation (Billing, Settings, Profile) and workspace navigation (Dashboards, Projects, Reports). Use breadcrumbs to keep users oriented.


## IA Generation
\`\`\`prompt
Act as a UX Architect. Based on my PRD, generate a comprehensive sitemap and Information Architecture hierarchy.
\`\`\`
- [ ] I have mapped out my app's navigation structure.
`,
  'wireframes': `# Wireframes

🕒 **Estimated Time:** 45 min

---

## Why this matters
Wireframes are low-fidelity blueprints. They allow you to rapidly iterate on layout and hierarchy without getting bogged down by colors, fonts, or padding. Moving a box in a wireframe takes 2 seconds; rewriting a React component takes 2 hours.

## Strategic Guidance

### Hackathon Mode
Skip traditional wireframes. You don't have time. Draw the 3 main screens on a piece of paper or a whiteboard in 5 minutes, agree on the layout with your team, and start coding immediately.

### Personal Project
Use a tool like Excalidraw or Balsamiq to quickly map out the core screens. Keep it low-fidelity (black and white). Do not spend time perfecting alignment.

### Production SaaS
Wireframes are a critical step before handing off to high-fidelity UI design. 

You must wireframe every major flow, including empty states (what the app looks like before they add data) and error states. Use Figma. Validate these wireframes with potential users to ensure the layout makes logical sense before investing in high-fidelity design.


## Wireframe Generation
\`\`\`prompt
Act as a UX Designer. Describe the layout, components, and visual hierarchy for the 3 main screens of my app.
\`\`\`
- [ ] I have generated wireframes for my core screens.
`,
  'designsystem': `# Design System

🕒 **Estimated Time:** 30 min

---

## Why this matters
A design system ensures visual consistency across your app and radically speeds up development. If you don't define your colors and typography upfront, your CSS will become a chaotic mess of hardcoded hex values.

## Strategic Guidance

### Hackathon Mode
Do not build a design system from scratch. Use an off-the-shelf component library like shadcn/ui, Chakra UI, or Tailwind UI. Pick one primary brand color, one font, and stick to the library's defaults for everything else.

### Personal Project
Use a component library, but take 10 minutes to customize the primary colors and border radiuses to make it feel unique. Don't spend hours tweaking button padding.

### Production SaaS
You need a robust, scalable design system. You must define your color palette (primary, secondary, semantic success/error colors), typography scales, spacing tokens, and dark mode variants. Use Figma variables to sync your design tokens directly with your CSS or Tailwind config.


## Design Token Generation
\`\`\`prompt
Act as a Lead UI/UX Designer. Generate a complete set of Tailwind CSS design tokens (colors, fonts, spacing) for my project.
\`\`\`
- [ ] I have established my design system.
`,
  'branding': `# Branding

🕒 **Estimated Time:** 15 min

---

## Why this matters
Branding is how your product makes the user *feel*. It encompasses your logo, color palette, tone of voice, and overall aesthetic. Good branding builds trust.

## Strategic Guidance

### Hackathon Mode
Your brand is your project name and a single primary color. Go to a free logo generator, pick a modern-looking icon, and move on. Do not spend more than 5 minutes on this.

### Personal Project
Pick a name you like and a color palette that feels right to you. You can use tools like Coolors or Tailwind's default palette to find something aesthetically pleasing quickly.

### Production SaaS
Your branding must evoke trust and professionalism, tailored specifically to your [ICP](#icpidealcustomerprofile). 

If you are selling to banks, use conservative blues and a serious tone. If you are selling to Gen-Z creators, use vibrant gradients and a casual tone. Your branding must be perfectly consistent across your landing page, your app UI, and your transactional emails.


## Brand Identity
\`\`\`prompt
Act as a Brand Strategist. Suggest 3 brand names, a color palette, and a tone of voice for my product.
\`\`\`
- [ ] I have chosen a name and brand identity.
`,
  'accessibility': `# Accessibility (a11y)

🕒 **Estimated Time:** 10 min

---

## Why this matters
Accessibility ensures your software can be used by people with disabilities (visual, auditory, motor, or cognitive). Building inaccessible software is not only unethical, it also drastically shrinks your addressable market.

## Strategic Guidance

### Hackathon Mode
Ignore it. In a 48-hour sprint where you are just trying to get a demo working for able-bodied judges, accessibility is a luxury you cannot afford. Use \`div\` tags for buttons if you have to.

### Personal Project
Try to use semantic HTML (use \`<button>\` instead of \`<div onClick={}>\`). It's a good habit to build and takes zero extra time, but don't obsess over perfect ARIA labels.

### Production SaaS
You must hit baseline accessibility standards. 

Your brand colors must pass the WCAG AA contrast ratio (text must be readable against the background). Your core workflows must be navigable via keyboard (Tab and Enter). If a user relies on a screen reader, they should be able to sign up and pay you.


## Accountability Check
- [ ] I understand the accessibility requirements for my project mode.
`,
  'techstackselection': `# Tech Stack Selection

🕒 **Estimated Time:** 20 min

---

## Why this matters
Your tech stack dictates your hiring pool, your hosting costs, and your development speed. Changing your stack later is painful and expensive.

## Strategic Guidance

### Hackathon Mode
Use whatever you are already fastest at. 

If you know Python, use Python. If you know React, use React. Do not try to learn a brand new framework during a 48-hour hackathon unless learning is your primary goal. Speed is your only metric.

### Personal Project
This is the perfect time to experiment. 

If you've always used Node.js, try Go or Rust. If you always use React, try Svelte or Vue. Use modern, bleeding-edge frameworks (like Next.js 15 or Nuxt) to see what the hype is about. You don't have to worry about legacy support.

### Production SaaS
Boring technology is good technology. 

Use mature, heavily supported frameworks with massive ecosystems (React, Next.js, Node.js, PostgreSQL). When you hit a bug at 2 AM, you want to be able to find a StackOverflow answer from 3 years ago. Avoid bleeding-edge tech that might be abandoned in a year.


## The Decision
\`\`\`input
Write Here...
\`\`\`
`,
  'frontendarchitecture': `# Frontend Architecture

🕒 **Estimated Time:** 15 min

---

## Why this matters
A poorly architected frontend quickly becomes a "big ball of mud." State management gets tangled, components become massive, and every new feature breaks an old one.

## Strategic Guidance

### Hackathon Mode
Put everything in one massive \`App.tsx\` file if you have to. 

Don't waste time meticulously organizing your components into folders. Use global state (or just prop drill) without guilt. The codebase will be abandoned on Monday anyway.

### Personal Project
Practice clean architecture. 

Separate your UI components (dumb components) from your business logic (smart components). Try implementing a modern state management library like Zustand or Jotai just to see how it feels.

### Production SaaS
You must establish a strict folder structure and component hierarchy. 

Use a feature-based architecture (grouping files by feature rather than by type). Enforce strict linting rules. Decide upfront how you will handle data fetching (e.g., TanStack Query) and global state. Your goal is that a new engineer can join the team and know exactly where a specific file lives within 10 minutes.


## Accountability Check
- [ ] I understand my frontend architecture constraints.
`,
  'backendarchitecture': `# Backend Architecture

🕒 **Estimated Time:** 20 min

---

## Why this matters
Your backend is the brain of your application. If it is slow, insecure, or brittle, your entire product fails.

## Strategic Guidance

### Hackathon Mode
Use a Backend-as-a-Service (BaaS) like Supabase or Firebase. 

Do not write your own backend from scratch. You don't have time to configure Express, set up a Postgres connection pool, and handle JWT authentication. Let the BaaS do 90% of the work so you can focus on the UI.

### Personal Project
If you want to learn backend engineering, build a monolithic server in Node, Go, or Python. 

Deploy it on a free tier like Render or Railway. Keep it simple: one server, one database.

### Production SaaS
A majestic monolith or a modular monolith is usually the best choice for a new SaaS. 

Do not build microservices on Day 1; they introduce massive operational complexity (network latency, distributed tracing, complex CI/CD). Build a highly structured monolith that can scale to millions of users on a decent-sized server.


## Accountability Check
- [ ] I understand my backend architecture constraints.
`,
  'apidesign': `# API Design

🕒 **Estimated Time:** 25 min

---

## Why this matters
APIs are how your frontend talks to your backend (and how third parties integrate with your software). A messy API leads to brittle integrations and constant breakages.

## Strategic Guidance

### Hackathon Mode
If you are using a BaaS like Supabase, you don't even need to design an API; just use their auto-generated client SDKs. 

If you must build an API, make it a simple RPC (Remote Procedure Call) style. Don't worry about perfect REST semantics.

### Personal Project
Try building a GraphQL API or a tRPC API to learn the benefits of end-to-end type safety. It's a great skill to add to your toolkit.

### Production SaaS
Design a clean, versioned RESTful API. 

Use standard HTTP verbs (GET, POST, PUT, DELETE) and standard status codes (200, 400, 404, 500). Prefix your routes with \`/api/v1/\`. You *must* implement rate limiting and pagination from the very beginning.


## API Generation
\`\`\`prompt
Act as a Backend Architect. Based on my PRD, design the core REST API endpoints I will need.
\`\`\`
- [ ] I have generated my core API design.
`,
  'authentication': `# Authentication

🕒 **Estimated Time:** 15 min

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

🕒 **Estimated Time:** 20 min

---

## Why this matters
While Authentication is *who* you are, Authorization is *what you are allowed to do*. Without strict authorization, any user can delete any other user's data.

## Strategic Guidance

### Hackathon Mode
Ignore it. Assume the single user you are demoing has admin access to everything.

### Personal Project
Hardcode a simple \`isAdmin\` boolean on your user table. That is usually enough for a small app.

### Production SaaS
You must implement a robust authorization system. 

If using Supabase, use Row Level Security (RLS) to ensure users can only query rows that belong to their tenant/workspace ID. Do not rely solely on frontend authorization (hiding buttons); the backend API must explicitly reject unauthorized requests.


## Authorization Generation
\`\`\`prompt
Act as a Security Architect. Based on my PRD, define the standard user roles and their specific permissions.
\`\`\`
- [ ] I have defined my user roles and permissions.
`,
  'databaseschema': `# Database Schema

🕒 **Estimated Time:** 30 min

---

## Why this matters
The database schema is the foundation of your backend. A bad schema requires complex, slow SQL queries to extract simple data, and migrating a bad schema in production is terrifying.

## Strategic Guidance

### Hackathon Mode
Use a schema-less NoSQL database (like Firebase Firestore) or just throw everything into a single massive Postgres table. 

Data normalization does not matter. If you have duplicate data, who cares? The database will be deleted on Monday.

### Personal Project
Design a clean, normalized relational schema. Practice drawing Entity-Relationship (ER) diagrams and writing clean foreign key relationships.

### Production SaaS
Use a mature relational database like PostgreSQL. 

Your schema must be multi-tenant from Day 1. Almost every table should have a \`workspace_id\` or \`tenant_id\` column. You must plan for indexing on columns you will query frequently. Never use hard deletes; use soft deletes (\`deleted_at\` timestamps) so you can recover data if a user accidentally clicks delete.


## Schema Generation
\`\`\`prompt
Act as a Database Administrator. Based on my PRD, generate a PostgreSQL schema including multi-tenant architecture and foreign keys.
\`\`\`
- [ ] I have finalized my database schema.
`,
  'filestorage': `# File Storage

🕒 **Estimated Time:** 10 min

---

## Why this matters
If your users upload images, PDFs, or videos, you cannot store them in your database. You need a dedicated object storage solution.

## Strategic Guidance

### Hackathon Mode
Don't support file uploads if you can avoid it. If you must, just upload files directly to the public folder of your host or use a free Supabase Storage bucket with public access. Don't worry about resizing or security.

### Personal Project
Use Supabase Storage or AWS S3. It's a great opportunity to learn how to handle multipart form data and signed URLs.

### Production SaaS
You must use secure Object Storage (AWS S3, Cloudflare R2). 

Files should never be completely public unless they are avatars. Generate short-lived Signed URLs for users to download their files. You must implement file size limits and scan uploads for malware to prevent malicious actors from abusing your storage.


## Accountability Check
- [ ] I understand my file storage strategy.
`,
  'thirdpartyintegrations': `# Third Party Integrations

🕒 **Estimated Time:** 15 min

---

## Why this matters
Modern software doesn't live in a vacuum. Integrating with tools your users already use (Slack, Salesforce, Stripe) increases your product's stickiness.

## Strategic Guidance

### Hackathon Mode
Integrations are the easiest way to add "wow factor." 

Integrating a Twilio SMS or a Stripe checkout looks incredibly impressive and only takes 10 lines of code. Use them aggressively to make your app look more feature-rich than it actually is.

### Personal Project
Integrate with 1 or 2 APIs just to learn how to handle Webhooks and OAuth flows.

### Production SaaS
Only build integrations that directly drive revenue or retention. 

A Stripe integration is mandatory. A Slack integration is highly recommended for B2B. Don't build a massive integrations catalog on Day 1. Wait until users explicitly ask for them.


## Accountability Check
- [ ] I have identified necessary third-party integrations.
`,
  'aiarchitectureoptional': `# AI Architecture

🕒 **Estimated Time:** 15 min

---

## Why this matters
If you are building an AI product, the way you architect your LLM calls dictates your speed, cost, and output quality.

## Strategic Guidance

### Hackathon Mode
Just hit the OpenAI API directly from your frontend (but be careful not to leak your key in a public repo). Use the biggest, smartest model available (GPT-4o or Claude 3.5 Sonnet) because cost doesn't matter for a weekend demo.

### Personal Project
Experiment with open-source models using Ollama, or try using cheaper, faster models like GPT-4o-mini to see how much you can optimize performance.

### Production SaaS
You must build a robust AI backend. 

Never call LLMs directly from the frontend; proxy them through your backend to protect your API keys and implement rate limiting. You must handle streaming responses (Server-Sent Events) so the user doesn't stare at a loading spinner for 10 seconds. Implement caching (like Redis) for identical queries to save money.


## Accountability Check
- [ ] I understand my AI architecture constraints.
`,
  'systemarchitecturediagram': `# System Architecture Diagram

🕒 **Estimated Time:** 15 min

---

## Why this matters
A visual diagram of your system explains how all the pieces (Frontend, Backend, Database, Third-Party APIs) fit together. It is the easiest way to onboard a new developer or explain your tech to an investor.

## Strategic Guidance

### Hackathon Mode
Skip it. You don't have time to draw boxes and arrows.

### Personal Project
Draw a quick sketch in Excalidraw. It helps cement your understanding of how the client communicates with the server.

### Production SaaS
You must maintain an up-to-date architecture diagram. 

Use a tool like Mermaid.js (which lives in markdown) or Eraser.io so you can keep the diagram in version control alongside your code. When a service goes down, this diagram is the first thing incident responders look at.


## Diagram Generation
\`\`\`prompt
Act as a Cloud Architect. Generate a Mermaid.js architecture diagram for my tech stack.
\`\`\`
- [ ] I have generated my architecture diagram.
`,
  'costestimation': `# Cost Estimation

🕒 **Estimated Time:** 15 min

---

## Why this matters
Cloud computing is not free. If you don't estimate your costs upfront, you might accidentally build an architecture that costs more to run than your customers pay you.

## Strategic Guidance

### Hackathon Mode
Use only free tiers. Vercel for frontend, Supabase for backend. Do not put a credit card into AWS during a hackathon; you will forget to turn it off and get a $500 bill on Monday.

### Personal Project
Stick strictly to free tiers. Your budget is $0.

### Production SaaS
You must calculate your Unit Economics. 

If you charge a user $10/month, but they consume $8/month of OpenAI API credits and $1/month of database bandwidth, your gross margin is terrible. You must model your costs at 100 users, 1,000 users, and 10,000 users to ensure the business model actually scales.


## Cost Estimation Generation
\`\`\`prompt
Act as a FinOps Specialist. Based on my tech stack, generate a monthly cost estimation model for 1,000 active users.
\`\`\`
- [ ] I have modeled my infrastructure costs.
`,
  'auth': `# Authentication Setup

🕒 **Estimated Time:** 45 min

---

## Why this matters
Authentication is usually the very first code you write. Without it, you have no users. Getting it wrong leads to security vulnerabilities.

## Strategic Guidance

### Hackathon Mode
If you don't actually need user-specific data, skip Auth entirely. 

If you do, use Clerk or Supabase Auth. Do not waste time building custom UI for the login screen. Use the pre-built, drop-in React components (like \`<SignIn />\`) that take 5 minutes to install.

### Personal Project
Use Supabase Auth. It is free, robust, and connects directly to your Postgres database. Build your own custom login UI if you want to practice form handling and state management.

### Production SaaS
Use a managed Auth provider (Supabase Auth, Auth0, Clerk). 

You must configure strict Redirect URLs to prevent Open Redirect vulnerabilities. You must implement robust error handling (e.g., "Email already in use"). You should strongly consider implementing Social Login (Google, GitHub) to drastically increase your signup conversion rate.


## Auth Prompt
\`\`\`prompt
Act as a Security Engineer. Generate the frontend code and backend configuration to integrate Supabase Authentication into my React app.
\`\`\`
- [ ] I have successfully implemented Authentication.
`,
  'database': `# Database Setup

🕒 **Estimated Time:** 60 min

---

## Why this matters
Your database is the heart of your application. You must initialize your schema, set up migrations, and write your first queries.

## Strategic Guidance

### Hackathon Mode
Use the Supabase SQL Editor and execute your schema creation script directly in the browser. 

Do not bother setting up local development databases, Docker containers, or migration files. You don't have time. Just spin up the cloud database and start querying it.

### Personal Project
Set up a local PostgreSQL instance (using Docker or Postgres.app). Write your schema in an \`init.sql\` file. Practice writing raw SQL queries before you abstract them away with an ORM.

### Production SaaS
You must use an ORM (like Prisma, Drizzle, or Supabase clients) and implement database migrations. 

Never change your production database schema directly in a UI. You must create migration files (e.g., \`001_create_users_table.sql\`) and commit them to version control. This ensures your staging database and production database are always perfectly in sync.


## Database Prompt
\`\`\`prompt
Act as a Database Administrator. Generate the SQL migration file to create my initial database schema, including Row Level Security (RLS) policies.
\`\`\`
- [ ] I have set up my database and migrations.
`,
  'backend': `# Backend Development

🕒 **Estimated Time:** 2-4 Hours

---

## Why this matters
The backend handles your business logic, talks to the database, and secures your data. This is where the heavy lifting happens.

## Strategic Guidance

### Hackathon Mode
If you are using Supabase, you can often skip writing a custom backend entirely by querying the database directly from the frontend (using Row Level Security for safety). 

If you need custom logic (like calling the OpenAI API), write a simple Serverless Edge Function. Keep it as lightweight as possible.

### Personal Project
Build a standard Node.js/Express server or use Next.js API routes. Focus on learning how to handle requests, parse JSON bodies, and return proper HTTP status codes.

### Production SaaS
You must implement robust error handling, input validation (using Zod or Joi), and rate limiting. 

Never trust data coming from the frontend. Always re-validate inputs on the backend. Structure your backend into logical layers: Routes (handling HTTP), Controllers (business logic), and Services/Repositories (database interactions). This keeps your code testable and clean.


## Backend Prompt
\`\`\`prompt
Act as a Backend Engineer. Write the server-side code to handle my core application logic, including input validation and error handling.
\`\`\`
- [ ] I have implemented my core backend logic.
`,
  'frontend': `# Frontend Development

🕒 **Estimated Time:** 3-5 Hours

---

## Why this matters
The frontend is what your users actually touch. If it is laggy, ugly, or confusing, they will assume the entire product is broken.

## Strategic Guidance

### Hackathon Mode
Use pre-built component libraries (shadcn/ui, Tailwind UI, MUI). 

Do not spend 20 minutes writing custom CSS for a button hover effect. Copy-paste components. Focus all your energy on the single core user flow that you will demonstrate during the pitch.

### Personal Project
Build components from scratch to understand how React state, props, and hooks work. Focus on clean, readable code rather than rushing to the finish line.

### Production SaaS
You must implement optimistic UI updates, loading skeletons, and robust error boundaries. 

When a user clicks "Save", the button should instantly show a loading spinner, and the UI should optimistically update before the server responds. If the server throws an error, gracefully revert the UI and show a toast notification. Never let the app crash to a white screen.


## Frontend Prompt
\`\`\`prompt
Act as a Senior Frontend Developer. Write the React components for my main dashboard, utilizing Tailwind CSS and optimistic UI updates.
\`\`\`
- [ ] I have built my core frontend views.
`,
  'payments': `# Payments Integration

🕒 **Estimated Time:** 2 Hours

---

## Why this matters
If you can't collect money, you don't have a business. Payment integration is notoriously tricky because you are dealing with real money and webhooks.

## Strategic Guidance

### Hackathon Mode
Do not integrate real payments. 

If you want to show a checkout flow for the demo, just build a fake UI screen that says "Payment Successful." The judges do not care if your Stripe integration actually works.

### Personal Project
Integrate Stripe Checkout in "Test Mode." It's a fantastic learning experience to understand how webhooks confirm payment status.

### Production SaaS
Use Stripe Checkout or Lemon Squeezy (if you need a Merchant of Record to handle global taxes). 

You must rely on Webhooks to provision access, not client-side redirects. When a user pays, Stripe sends a webhook to your server; your server verifies the webhook signature, updates the user's \`subscription_status\` in the database, and only *then* does the user get access.


## Payments Prompt
\`\`\`prompt
Act as a Stripe Integration Expert. Write the backend webhook handler to process subscription lifecycle events (created, updated, canceled).
\`\`\`
- [ ] I have integrated my payment gateway.
`,
  'emails': `# Transactional Emails

🕒 **Estimated Time:** 1 Hour

---

## Why this matters
Users need to receive Welcome emails, Password Resets, and Receipts. If these emails go to spam, your users will get locked out or confused.

## Strategic Guidance

### Hackathon Mode
Skip transactional emails. 

If you need to show an email feature during the demo, just \`console.log\` the email content to the terminal or show a fake "Email Sent!" toast notification.

### Personal Project
Use Resend or SendGrid. They have great developer APIs and free tiers. It's a great skill to learn.

### Production SaaS
You must use a dedicated transactional email provider (Resend, Postmark). 

You must configure your domain's DKIM, SPF, and DMARC records to ensure your emails actually land in the Inbox, not the Spam folder. Use a tool like React Email to build beautiful, responsive HTML templates instead of writing raw HTML strings.


## Email Prompt
\`\`\`prompt
Act as a Communications Architect. Generate a React Email template for my Welcome Email, including my branding colors and a clear Call to Action.
\`\`\`
- [ ] I have configured my transactional emails.
`,
  'notifications': `# Notifications

🕒 **Estimated Time:** 1 Hour

---

## Why this matters
Notifications pull users back into your app. Without them, users forget your app exists.

## Strategic Guidance

### Hackathon Mode
Fake it. 

Show a static bell icon with a red "1" on it. When clicked, show a hardcoded message. Do not spend time implementing WebSockets or Push Notifications.

### Personal Project
Implement a simple polling mechanism or basic WebSockets just to learn how real-time data works.

### Production SaaS
You must build a robust notification center. 

Use a unified API like Novu or Courier. You must support in-app toasts, in-app inbox (the bell icon), and email fallbacks. Crucially, you must allow users to mute specific types of notifications, otherwise they will mark your emails as Spam and destroy your domain reputation.


## Accountability Check
- [ ] I have implemented my notification strategy.
`,
  'search': `# Search

🕒 **Estimated Time:** 1-2 Hours

---

## Why this matters
As your users generate more data, they will expect to find it instantly. A bad search experience is incredibly frustrating.

## Strategic Guidance

### Hackathon Mode
Just use a standard SQL \`ILIKE\` query or a simple Array \`.filter()\` on the frontend if the dataset is small. Do not set up a dedicated search engine.

### Personal Project
Implement basic full-text search directly in Postgres. It's a great feature to learn and requires no extra infrastructure.

### Production SaaS
For a production app, Postgres full-text search is usually sufficient until you hit massive scale. 

You must implement "fuzzy matching" so typos don't return zero results. Implement debouncing on your frontend search input (wait 300ms after the user stops typing before hitting the API) to save database compute costs.


## Accountability Check
- [ ] I have implemented scalable search.
`,
  'analytics': `# Product Analytics

🕒 **Estimated Time:** 45 min

---

## Why this matters
If you aren't measuring user behavior, you are flying blind. You won't know where users drop off in your funnel or which features they actually use.

## Strategic Guidance

### Hackathon Mode
Skip it. Analytics will not help you win the pitch.

### Personal Project
Skip it, unless you specifically want to learn how to implement an analytics SDK.

### Production SaaS
You must implement PostHog, Mixpanel, or Amplitude from Day 1. 

Track the "Aha!" moment. Track where users drop off during onboarding. Track feature usage. Connect your frontend SDK to capture pageviews, and send backend events for critical actions (like \`User Upgraded\` or \`Invoice Paid\`) to ensure the data is perfectly accurate.


## Accountability Check
- [ ] I have integrated product analytics.
`,
  'adminpanel': `# Admin Panel

🕒 **Estimated Time:** 2 Hours

---

## Why this matters
When a user inevitably breaks their account, or requests a refund, you need an interface to fix it. If you have to write raw SQL to fix customer issues, you will hate your life.

## Strategic Guidance

### Hackathon Mode
Skip it. You are the only admin and you can just use the Supabase/Firebase dashboard to manually edit rows if needed.

### Personal Project
Skip it. Just use your database GUI (like DBeaver or TablePlus).

### Production SaaS
Do not build an admin panel from scratch. 

Use a low-code tool like Retool, ForestAdmin, or Appsmith. Connect it directly to your production database. Build simple dashboards to view User details, refund Stripe charges, and ban malicious accounts. This will save you hundreds of hours of customer support time.


## Accountability Check
- [ ] I have set up an internal admin panel.
`,
  'integrations': `# External Integrations

🕒 **Estimated Time:** 3-5 Hours

---

## Why this matters
Users want your product to talk to the tools they already use. 

## Strategic Guidance

### Hackathon Mode
Fake them if they are too hard, or use Zapier to quickly stitch things together for the demo.

### Personal Project
Build 1 integration (like a Discord bot or Slack webhook) to learn how OAuth2 works.

### Production SaaS
Start with native Slack or Discord webhooks for notifications. If you need deep integrations (Salesforce, HubSpot), strongly consider using an embedded integration platform like Paragon or Merge.dev. Building and maintaining 10 different OAuth integrations from scratch will drain all your engineering resources.


## Accountability Check
- [ ] I have built necessary integrations.
`,
  'testing': `# Testing

🕒 **Estimated Time:** Ongoing

---

## Why this matters
Without tests, every time you add a new feature, you will be terrified of breaking an old one.

## Strategic Guidance

### Hackathon Mode
Zero tests. Absolutely none. You are writing throwaway code.

### Personal Project
Write a few unit tests for your most complex business logic functions just to learn Jest or Vitest. Don't aim for 100% coverage.

### Production SaaS
Do not aim for 100% unit test coverage; it is a waste of time. 

Instead, focus on End-to-End (E2E) testing with Playwright or Cypress. Write 5-10 tests that cover your most critical workflows (Signup, Checkout, Core Feature). If those tests pass, you know the app makes money. Let your users find the minor UI bugs.


## Accountability Check
- [ ] I have implemented my core E2E tests.
`,
  'documentation': `# Documentation

🕒 **Estimated Time:** Ongoing

---

## Why this matters
Code is read 10x more than it is written. If you don't document your architecture, you (or your future hires) will be hopelessly lost in 6 months.

## Strategic Guidance

### Hackathon Mode
A single \`README.md\` explaining how to run \`npm install\` and \`npm run dev\` is all you need.

### Personal Project
Write a good README so when you look at the repo in 2 years, you remember what it does.

### Production SaaS
You must maintain two types of documentation: 

1. **Internal:** Architecture decisions (ADRs), onboarding guides for new engineers, and environment variable requirements.
2. **External:** A beautiful, searchable Help Center for your users (using Mintlify or Docusaurus) so they stop emailing customer support with basic questions.


## Accountability Check
- [ ] I have documented my project appropriately.
`,
  'demodata': `# Demo Data

**🕒 Estimated Time:** 45-60 min

---

## Overview
You cannot launch on Product Hunt, record a promotional video, or do a live sales pitch with an empty dashboard. An empty app forces the user to use their imagination. Your application needs to look lived-in, active, and valuable from the very first second. Generating high-quality "Demo Data" is the bridge between a functional codebase and a sellable product.

---

## Think First
Define the "Aha!" moment.

**The Golden Scenario (What is the absolute best-case scenario a user can experience in your app? e.g., A dashboard showing $10k in Monthly Recurring Revenue, or a project board fully populated with completed tasks.)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Industry Context (Who is your target persona? If you are building a tool for lawyers, your demo data must look like legal case files, not generic "lorem ipsum" text.)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Automated Seeding vs. Manual Curation:**
  - *Automated:* Using a script (like Faker.js) to generate 1,000 rows of data so your pagination and analytics charts look impressive.
  - *Manual:* Hand-crafting 3 to 5 highly specific "Hero" items that tell a compelling story when clicked.
  - *Decision:* Do both. Automate the volume, manually curate the Hero items.
- **Wiping vs. Sandboxing:** When a user signs up for a free trial, do you inject demo data directly into their account to help them learn, or do you leave it empty? Injecting 3 realistic "example" items into a new user's workspace drastically improves onboarding conversion.

---

## Common Mistakes
- **Using "Test 123" and "asdfasdf":**
  - *Why it happens:* Developers get lazy when testing forms.
  - *Consequence:* An investor or customer looks at a table full of "Test User" and assumes the product is broken, amateurish, or not ready for production.
  - *Prevention:* Always use contextually relevant, realistic dummy data.
- **Static Timestamps:** Generating 500 rows of data where \`created_at\` is the exact same second. Your analytics charts will show a massive spike on one day and zero activity everywhere else.

---

## Examples
- *Good Implementation:* A CRM demo environment populated with 50 realistic leads (e.g., "Acme Corp", "Globex"). The \`created_at\` dates are mathematically distributed over the last 6 months so the "Revenue over Time" line chart curves upwards beautifully.
- *Bad Implementation:* A completely blank dashboard that says "You have no projects. Click here to create one."

---

## AI Prompt
Use AI to write a hyper-realistic data generation script.

\`\`\`prompt
My SaaS is a [INSERT NICHE, e.g., CRM for Dental Clinics].
My database uses [INSERT ORM, e.g., Prisma].

Act as a Product Marketer and Backend Engineer.
1. Write a TypeScript seeding script using \`@faker-js/faker\`.
2. Generate highly realistic, industry-specific data (Do NOT use generic 'Lorem Ipsum'. Use realistic dental terminology, patient names, and procedure codes).
3. Generate exactly 100 records.
4. Ensure the \`created_at\` timestamps are distributed randomly over the past 90 days so my analytics charts will look active and realistic.
\`\`\`

---

## Validation Checklist
- [ ] Does your application look like a real, active company is currently using it?
- [ ] Are all graphs, charts, and metrics fully populated and showing positive trends?
- [ ] Have you completely eliminated any "test", "asdf", or "lorem ipsum" strings from the UI?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
**File Name:** \`demo_seed.ts\`
**Purpose:** Make the product instantly impressive.
**Contents:** A dedicated script used exclusively for populating presentation environments.`,
  'presentationprep': `# Presentation Prep

**🕒 Estimated Time:** 60-120 min

---

## Overview
Building the software is only 50% of the battle; the other 50% is convincing people to care. Presentation Prep is about translating your technical architecture into a compelling narrative. Whether you are pitching to Y Combinator, launching on Product Hunt, or doing a 1-on-1 sales call, a confused audience will never buy.

---

## Think First
Understand your audience.

**The Audience (Who are you presenting to? Investors care about Market Size and Traction. Users care about "Will this save me time/money?")**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Core Metric (What is the single most impressive number you can share? e.g., "We grew 20% this week" or "Our software saves users 5 hours a week")**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Live Demo vs. Pre-Recorded Video:**
  - *Live Demo:* Highly engaging, but risky. Live demos have a mystical ability to crash due to network errors or edge cases.
  - *Pre-Recorded:* Safe, polished, and allows you to edit out load times.
  - *Decision:* ALWAYS have a pre-recorded Loom video ready. If doing a live pitch, attempt the live demo, but switch to the video the second something goes wrong.
- **The Pitch Structure:** Never start by explaining the tech stack or how you built it. Start with the **Problem** (make it hurt), introduce the **Solution** (your app), and end with **Traction** (why you will win).

---

## Common Mistakes
- **The Feature Dump:**
  - *Why it happens:* You spent 3 weeks building a complex settings page, so you want to show it off.
  - *Consequence:* You spend 2 minutes of a 3-minute pitch clicking through menus, boring the audience to death before showing the actual value.
  - *Prevention:* Only show the "Golden Flow". Ignore the settings, the login screen, and the edge cases.
- **"We have no competitors":** Saying this to an investor instantly proves you haven't researched your market. Excel/Spreadsheets is almost always your biggest competitor.

---

## Examples
- *Good Implementation:* A 90-second Loom video. First 10 seconds: "Lawyers waste 5 hours a week summarizing cases." Next 60 seconds: Showing a document being uploaded and perfectly summarized by AI in 5 seconds. Final 20 seconds: "We have 5 law firms paying us $100/mo."
- *Bad Implementation:* A 10-minute video where the founder talks over a slide deck, spends 3 minutes showing how the login page works, and the demo crashes halfway through.

---

## AI Prompt
Use AI to write a high-converting pitch script.

\`\`\`prompt
My SaaS is: [INSERT ELEVATOR PITCH].
My target audience for this presentation is: [INSERT AUDIENCE, e.g., Seed Investors / Product Hunt Users].

Act as a Y Combinator Pitch Coach.
1. Write a strict 2-minute pitch script for me to read over a demo video.
2. Structure it as: The Problem, The Solution (The Demo), The Business Model, and The Ask.
3. Keep the sentences short, punchy, and jargon-free.
4. Tell me exactly what actions I should be performing on-screen during each sentence of the script.
\`\`\`

---

## Validation Checklist
- [ ] Have you written out a literal script for your presentation rather than winging it?
- [ ] Have you recorded a high-quality backup video (e.g., using Loom) in case the live demo fails?
- [ ] Does your pitch get to the core value proposition (the "Aha!" moment) in the first 30 seconds?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
**File Name:** \`pitch_script.md\`
**Purpose:** Convert viewers into users or investors.
**Contents:** The timed script and the recorded Loom video link.`,
  'security': `# Security

**Estimated Time:** 4-6 hours

---

## Why this matters
Security is not an afterthought; it is the foundation of trust. A single vulnerability can lead to data breaches, reputational damage, and severe financial consequences. Implementing security correctly from day one is exponentially easier than trying to patch a fundamentally insecure architecture later.

## Strategic Guidance

### Hackathon Mode
For a hackathon, speed is everything and the data is fake. You do not need enterprise-grade security. Do not spend hours configuring strict Row Level Security (RLS) policies or complex OAuth flows unless they are the core mechanic of your demonstration. 

Your goal is to show a working prototype. Hardcode demo user credentials if it saves time. If you use a database like Supabase or Firebase, use the most permissive rules possible to ensure you don't get blocked during your demo. The only security that matters is ensuring your API keys are not accidentally pushed to a public GitHub repository where bots can scrape them. Use environment variables for all secrets.

### Personal Project
When building a personal project, you want to demonstrate competence and learn best practices without over-engineering. This is the perfect time to learn how to properly secure an application. 

You should implement basic authentication and authorization. Ensure that users can only access their own data. If using Supabase, write foundational RLS policies (e.g., \`user_id = auth.uid()\`). Secure your API routes so that unauthenticated users are rejected. Store sensitive configuration in environment variables and use a \`.env\` file locally. Do not deploy with default passwords or open databases. This level of security shows future employers that you understand the fundamentals of secure software development.

### Production SaaS
In a production environment, security is paramount. You are responsible for your users' sensitive data, and a breach could end your business. You must implement Defense in Depth. 

Start with strict Authentication and Role-Based Access Control (RBAC). Every endpoint and database query must verify the user's identity and permissions. Implement robust Row Level Security (RLS) on your database. Enforce HTTPS everywhere and ensure secure transmission of data. Use secure, HttpOnly cookies for session management to mitigate XSS attacks. 

Furthermore, you must sanitize all user inputs to prevent SQL injection and XSS. Set up automated security scanning in your CI/CD pipeline to catch vulnerable dependencies. Implement rate limiting to prevent brute-force attacks and abuse. Regularly audit your infrastructure and consider a third-party penetration test before a major public launch.

## Security Audit Prompt
\`\`\`prompt
Act as a Senior Security Engineer. I am building a SaaS application using [Insert your Tech Stack here, e.g., React, Node.js, PostgreSQL]. Provide a comprehensive security checklist covering authentication, database security, API protection, and common vulnerabilities (OWASP Top 10). What specific security measures must I implement before launching to production?
\`\`\`

## Validation Checklist
- [ ] Environment variables are used for all secrets and API keys.
- [ ] Secrets have been verified absent from public repositories.
- [ ] Users can only access their own data (e.g., RLS policies).
- [ ] Inputs are sanitized and validated on the backend.
`,
  'performanceoptimization': `# Performance Optimization

**Estimated Time:** 3-5 hours

---

## Why this matters
Performance is a feature. Users have zero tolerance for slow applications. A fast, snappy interface builds trust and engagement, while a sluggish app leads to high bounce rates and churn. Optimizing performance ensures your application scales efficiently and provides a world-class user experience.

## Strategic Guidance

### Hackathon Mode
Performance does not matter in a hackathon unless the app is so slow that it ruins the live demo. Do not spend time optimizing bundle sizes, implementing complex caching layers, or writing highly optimized database queries.

If the app feels a bit sluggish, ignore it. Focus entirely on feature completeness and the visual wow factor. The judges will not look at your Lighthouse score or your database query execution times. If a query takes 2 seconds to load, just add a loading spinner and move on.

### Personal Project
For a personal project, you want to demonstrate that you understand how to build a responsive web application. You do not need to over-optimize, but you should adhere to basic performance best practices.

Ensure your images are compressed and properly sized. Avoid unnecessary re-renders in your frontend framework by using proper state management. Implement basic pagination for long lists of data to avoid overwhelming the browser. This demonstrates a solid understanding of frontend fundamentals and provides a good experience for anyone reviewing your portfolio.

### Production SaaS
In a production SaaS, performance directly impacts your bottom line. You must treat performance as a critical metric. A fast application reduces server costs and increases user retention.

You need to optimize across the entire stack. On the frontend, implement code splitting, lazy loading, and aggressive asset optimization. Aim for excellent Core Web Vitals scores. On the backend, identify and optimize slow database queries by adding indexes and using explain plans. Implement comprehensive caching strategies using Redis or a CDN for static assets.

Continuously monitor performance using tools like New Relic, Datadog, or Sentry. Set up alerts for degraded performance and treat performance regressions as critical bugs. Users expect a seamless, instant experience, and delivering that requires rigorous, ongoing optimization.

## Performance Optimization Prompt
\`\`\`prompt
Act as a Senior Performance Engineer. I am building a SaaS application using [Insert Tech Stack]. Suggest the top 5 most impactful performance optimizations I should implement on the frontend and backend. Include specific techniques for asset optimization, React rendering improvements, and database query optimization.
\`\`\`

## Validation Checklist
- [ ] Images and assets are compressed and served efficiently.
- [ ] Large lists are paginated or virtualized.
- [ ] Database queries are indexed and optimized.
- [ ] Core Web Vitals meet acceptable thresholds.
`,
  'monitoring': `# Monitoring

**Estimated Time:** 2-4 hours

---

## Why this matters
You cannot fix what you cannot see. Monitoring provides visibility into the health, usage, and performance of your application. Without it, you are flying blind, and your users will be the first to tell you when something breaks—usually by leaving angry reviews or churn.

## Strategic Guidance

### Hackathon Mode
Do not implement monitoring for a hackathon. It is a complete waste of time. You will be sitting next to the computer running the code during the demo. 

If something breaks, you will see it immediately. Do not install Sentry, Datadog, or any other monitoring tool. Spend that time polishing the UI or adding one more killer feature to your demo.

### Personal Project
For a personal project, basic monitoring is a good learning experience but not strictly necessary for survival. You want to know if the app goes down while someone is reviewing your portfolio.

Set up a simple uptime monitor using a free service like UptimeRobot. This will ping your app every few minutes and email you if it goes down. You might also want to set up basic error tracking (like a free Sentry tier) just to see what errors occur, but do not spend hours configuring complex dashboards.

### Production SaaS
Production SaaS requires comprehensive, real-time observability. You need to know there is a problem before your users do. This requires a robust monitoring stack.

Implement Application Performance Monitoring (APM) using tools like Datadog, New Relic, or Sentry. You must track uptime, API response times, error rates, and infrastructure metrics (CPU, memory). Create detailed dashboards that visualize the health of your system at a glance.

Furthermore, set up proactive alerting. Route critical alerts to PagerDuty or a dedicated Slack channel so your engineering team can respond immediately. Establish clear Service Level Objectives (SLOs) and monitor your adherence to them. Monitoring is the pulse of a production system.

## Monitoring Strategy Prompt
\`\`\`prompt
Act as a Senior DevOps Engineer. I need to set up comprehensive monitoring for a production SaaS application built with [Insert Tech Stack]. Recommend a tech stack for observability (APM, error tracking, uptime) and list the 5 most critical metrics I should build alerts for immediately.
\`\`\`

## Validation Checklist
- [ ] An uptime monitor is configured to alert on downtime.
- [ ] Application errors are tracked and aggregated automatically.
- [ ] Key performance metrics (latency, error rate) are visible on a dashboard.
- [ ] Critical alerts are routed to the appropriate team members.
`,
  'logging': `# Logging

**Estimated Time:** 2-4 hours

---

## Why this matters
When things go wrong in production, logs are your only source of truth. They provide the context needed to debug complex issues, trace user journeys, and understand the sequence of events that led to a failure. Good logging is the difference between fixing a bug in 10 minutes and spending 3 days guessing.

## Strategic Guidance

### Hackathon Mode
Do not build a logging infrastructure. \`console.log()\` is your best friend. 

You only need logs to debug issues during the 48-hour development window. Do not integrate external logging services like Logtail or Datadog. Keep your terminal open and read the standard output. Speed is the only priority.

### Personal Project
For a personal project, standard output logging is generally sufficient. You want to ensure your logs are readable and helpful for debugging, but you don't need a centralized logging pipeline.

Use a simple structured logger (like Pino or Winston in Node.js) instead of raw \`console.log()\`. This teaches you the value of structured data. If you deploy to a platform like Vercel, Heroku, or Render, rely on their built-in log viewers. Focus on logging significant events, such as user logins, database errors, and third-party API failures.

### Production SaaS
In a production SaaS, logs must be centralized, searchable, and structured. You will have multiple servers or serverless functions running simultaneously; you cannot SSH into machines to read text files.

Implement structured JSON logging across your entire stack. Every log entry must include contextual metadata: timestamp, log level, user ID, request ID, and service name. Use a centralized logging platform like Datadog, New Relic, or ELK (Elasticsearch, Logstash, Kibana) to aggregate all logs in one place.

Ensure you are not logging Sensitive Personal Information (PII) or passwords. Establish a log retention policy to manage costs and comply with data privacy regulations. Robust logging is essential for diagnosing distributed system failures and responding to customer support tickets efficiently.

## Logging Implementation Prompt
\`\`\`prompt
Act as a Backend Architect. I am building a production backend in [Insert Language/Framework]. Generate a configuration for a structured logger (e.g., Winston or Pino for Node). Explain how to ensure a unique 'request ID' is attached to every log generated during a single HTTP request lifecycle.
\`\`\`

## Validation Checklist
- [ ] Logs are output in a structured format (e.g., JSON).
- [ ] Logs include contextual information (User ID, Request ID).
- [ ] Sensitive data (PII, passwords, tokens) is scrubbed from logs.
- [ ] Logs are aggregated in a centralized, searchable platform.
`,
  'errortracking': `# Error Tracking

**Estimated Time:** 1-3 hours

---

## Why this matters
Users rarely report bugs; they just leave. Error tracking tools automatically catch exceptions, unhandled promises, and crashes in your application, providing you with the stack traces and context needed to fix them before more users are impacted.

## Strategic Guidance

### Hackathon Mode
Skip error tracking completely. You will be presenting the app yourself, so you will control the exact flow. If an error happens, you will see it on the screen. 

Do not waste time setting up Sentry or LogRocket. If a bug occurs during development, look at your browser console or terminal. Keep moving forward.

### Personal Project
Adding basic error tracking to a personal project is a great way to learn production practices. It shows that you care about the resilience of your code.

Integrate a free tier of a tool like Sentry. It takes 5 minutes to install and will automatically capture unhandled exceptions in your frontend and backend. You do not need to configure complex alerting or release tracking. Just having the tool catch errors and show you the stack trace is a massive step up from relying on user reports.

### Production SaaS
Error tracking is non-negotiable for a production SaaS. You must have deep visibility into every crash and exception experienced by your users.

Integrate a robust error tracking platform (like Sentry, Rollbar, or Bugsnag) across your frontend, backend, and mobile apps. Configure the tool to capture source maps so you can read minified stack traces. Attach user context (User ID, email) to errors so you know exactly who was affected.

Set up alerting rules to notify your team when there is a spike in errors or when a new, critical exception is introduced in a recent deployment. Treat unhandled exceptions as high-priority debt that must be paid down immediately to maintain a high-quality user experience.

## Error Tracking Setup Prompt
\`\`\`prompt
Act as a Full Stack Developer. Provide a step-by-step guide on how to integrate Sentry into a [Insert Tech Stack, e.g., React and Express] application. Include how to configure source maps for the frontend and how to globally catch and report unhandled promise rejections on the backend.
\`\`\`

## Validation Checklist
- [ ] An error tracking tool (e.g., Sentry) is integrated into the frontend and backend.
- [ ] Source maps are uploaded to the error tracking tool for readable stack traces.
- [ ] User context (ID, email) is attached to error reports.
- [ ] Alerts are configured for significant spikes in error rates.
`,
  'ratelimiting': `# Rate Limiting

**Estimated Time:** 2-4 hours

---

## Why this matters
Rate limiting protects your application from abuse, brute-force attacks, and accidental Denial of Service (DoS) caused by runaway scripts. It ensures fair usage of your resources and keeps your infrastructure costs predictable by preventing a single user from overwhelming your system.

## Strategic Guidance

### Hackathon Mode
Do not implement rate limiting. Your app will only be used by you and maybe a few judges for a few minutes. 

No one is going to DDOS your hackathon project. Implementing rate limiting will only slow you down and potentially block you during your own demo if you refresh too many times. Ignore it completely.

### Personal Project
For a personal project, basic rate limiting is a good defensive measure, especially if you have public-facing APIs or are paying for third-party API calls (like OpenAI).

Implement a simple, in-memory rate limiter or a basic Redis-backed limiter using standard middleware (like \`express-rate-limit\` for Node.js). Apply it primarily to sensitive routes like login (to prevent brute-force password guessing) and any endpoints that cost you money. This shows a solid understanding of basic security and cost-control principles.

### Production SaaS
In production, rate limiting is a critical infrastructure component. You must protect your database and third-party API quotas from malicious actors and poorly written client integrations.

Implement distributed rate limiting using Redis to ensure limits are enforced consistently across all your backend servers. Create tiered rate limits based on pricing plans (e.g., Free tier gets 100 requests/min, Pro gets 1000 requests/min). 

Apply strict rate limits to authentication routes, password resets, and any resource-intensive endpoints. Return clear \`429 Too Many Requests\` HTTP status codes with \`Retry-After\` headers so clients can handle the limits gracefully. Monitor rate limit hits to identify potential attacks or users who need to upgrade their plans.

## Rate Limiting Prompt
\`\`\`prompt
Act as a Backend Architect. I am building an API with [Insert Tech Stack, e.g., Node.js, Express, Redis]. Provide code examples and a strategy for implementing tiered rate limiting based on a user's subscription plan. Include strict limits for authentication routes to prevent brute-force attacks.
\`\`\`

## Validation Checklist
- [ ] Rate limiting is applied to all authentication and password reset routes.
- [ ] Rate limiting is applied to resource-intensive or costly API endpoints.
- [ ] The API returns a 429 status code and helpful headers when limits are exceeded.
- [ ] Rate limits are enforced consistently across distributed server instances.
`,
  'caching': `# Caching

**Estimated Time:** 2-4 hours

---

## Why this matters
Caching is the ultimate performance cheat code. By storing frequently accessed, computationally expensive data in a fast, in-memory store (like Redis) or at the edge (CDN), you drastically reduce database load, decrease response times, and lower infrastructure costs.

## Strategic Guidance

### Hackathon Mode
Do not implement caching. Period. 

Caching introduces state synchronization problems (cache invalidation) that are notoriously difficult to debug. For a hackathon, your database can handle the 10 requests your app will receive during the demo. Query the database directly every single time. Keep it simple.

### Personal Project
For a personal project, implementing a basic cache is a great way to show you understand system design. 

If you have a dashboard that aggregates data or an endpoint that fetches a long list of static items, add a simple Redis cache. Cache the response for 5 minutes. This demonstrates that you know how to reduce database strain, which is a highly valued skill for junior/mid-level engineering roles. Do not over-engineer cache invalidation; simple Time-To-Live (TTL) expiration is sufficient.

### Production SaaS
In production, a robust caching strategy is mandatory for scalability and cost control. 

Implement caching at multiple layers. Use a CDN (Content Delivery Network) to cache static assets and even static HTML pages (Edge Caching) globally. Use an in-memory datastore like Redis or Memcached for database query caching and session management. 

The hardest part of caching is invalidation. You must have a clear strategy for evicting stale data when the underlying database is updated. Use pattern-matching eviction or write-through caching mechanisms. Monitor your cache hit rates; a low hit rate means your cache is useless and just adding latency.

## Caching Strategy Prompt
\`\`\`prompt
Act as a Senior Backend Engineer. I am building a SaaS app with [Insert Tech Stack]. Provide a strategy for implementing a Redis caching layer for my most expensive database queries. Explain how to handle cache invalidation when the underlying data is updated, and provide code examples for a write-through cache approach.
\`\`\`

## Validation Checklist
- [ ] Static assets are cached at the edge via a CDN.
- [ ] Expensive or frequently accessed database queries are cached in-memory (e.g., Redis).
- [ ] A clear cache invalidation strategy is implemented (TTL or event-driven).
- [ ] Cache hit/miss rates are monitored.
`,
  'backups': `# Backups

**Estimated Time:** 1-2 hours

---

## Why this matters
Hardware fails. Humans make mistakes. Malicious actors delete data. Without reliable backups, a single DROP TABLE command or a corrupted database volume can instantly destroy your entire business and everything your users have built. 

## Strategic Guidance

### Hackathon Mode
You do not need backups. If your database crashes during the 48-hour hackathon, you just re-seed it with your fake data script. 

Do not spend time configuring automated snapshots or point-in-time recovery. If you are extremely paranoid, just export your database to a SQL file manually before you go to sleep.

### Personal Project
For a personal project, basic automated backups are highly recommended, especially if you have real users or data you care about.

Most managed database providers (Supabase, Firebase, Heroku Postgres, PlanetScale) offer automated daily backups by default. Verify that this feature is turned on. You do not need complex multi-region replication, but you should know how to restore your database from a snapshot if you accidentally delete something while tinkering.

### Production SaaS
In production, backups are a critical component of your Disaster Recovery plan. You are legally and ethically obligated to protect your users' data.

Enable Point-in-Time Recovery (PITR) so you can restore your database to any specific second in the past (e.g., right before a developer accidentally dropped a critical table). Ensure you have daily automated snapshots. 

Crucially, you must securely store your backups off-site (in a different physical region or cloud provider) to protect against region-wide outages. Most importantly, you must regularly test your restoration process. A backup that you cannot successfully restore is worthless.

## Backup Strategy Prompt
\`\`\`prompt
Act as a Database Administrator. I am using [Insert Database Provider, e.g., Supabase, AWS RDS, MongoDB Atlas]. Outline the exact steps required to enable Point-in-Time Recovery (PITR) and automated daily snapshots. Furthermore, provide a standard operating procedure (SOP) for testing a database restoration in a staging environment.
\`\`\`

## Validation Checklist
- [ ] Automated daily database backups are enabled.
- [ ] Point-in-Time Recovery (PITR) is active for production databases.
- [ ] Backups are securely stored in a geographically separate location.
- [ ] The database restoration process has been successfully tested.
`,
  'cicd': `# CI/CD (Continuous Integration & Deployment)

**Estimated Time:** 2-4 hours

---

## Why this matters
Manual deployments are error-prone, slow, and stressful. CI/CD (Continuous Integration / Continuous Deployment) automates the process of testing, building, and deploying your code. It ensures that every change is verified before it reaches users, allowing you to ship features faster and with confidence.

## Strategic Guidance

### Hackathon Mode
Skip formal CI/CD pipelines. You do not have time to configure GitHub Actions or debug failing build scripts.

Use platforms like Vercel, Netlify, or Render that offer push-to-deploy out of the box. Connect your GitHub repository, push to the \`main\` branch, and let the platform handle the rest. If it fails, check the logs on the platform, fix the code, and push again. Speed is all that matters.

### Personal Project
Setting up a basic CI/CD pipeline is an excellent resume booster. It shows you understand modern engineering workflows.

Configure a simple GitHub Action to run your linter and unit tests on every pull request. Require these checks to pass before merging into the main branch. Use Vercel, Railway, or Heroku for automated deployments upon merging. This prevents you from accidentally deploying broken code and breaking your portfolio project.

### Production SaaS
A robust CI/CD pipeline is the backbone of a high-performing engineering team. You must automate everything to prevent human error and ensure reliable releases.

Your CI pipeline must run linting, type checking, unit tests, and integration tests on every commit. Enforce strict branch protection rules: no one can merge code without passing tests and peer review. 

Your CD pipeline should automate deployments to multiple environments (Staging, Production). Implement zero-downtime deployments (e.g., blue-green deployments or rolling updates). Run end-to-end (E2E) tests against your staging environment before promoting code to production. If a deployment fails, the system should automatically rollback to the previous stable version.

## CI/CD Pipeline Prompt
\`\`\`prompt
Act as a DevOps Engineer. I have a repository hosted on GitHub with a [Insert Frontend Tech] frontend and a [Insert Backend Tech] backend. Generate a GitHub Actions YAML file that runs npm install, linting, and unit tests on every pull request to the 'main' branch.
\`\`\`

## Validation Checklist
- [ ] Automated tests (unit, integration) run on every Pull Request.
- [ ] Code cannot be merged into the main branch if tests fail.
- [ ] Merging to the main branch automatically triggers a deployment to production.
- [ ] Deployments occur with zero downtime to the end user.
`,
  'infrastructure': `# Infrastructure

**Estimated Time:** 3-6 hours

---

## Why this matters
Infrastructure is the foundation your application runs on. Choosing the right infrastructure dictates your deployment speed, maintenance overhead, and scaling limits. Over-engineering your infrastructure early on will slow you down, while under-engineering it later will cause outages.

## Strategic Guidance

### Hackathon Mode
Serverless and Platform-as-a-Service (PaaS) are your best friends. Do not touch AWS, Docker, or Kubernetes. 

Host your frontend on Vercel or Netlify. Host your backend on Render, Railway, or use Supabase/Firebase Serverless Functions. The goal is to deploy your code in under 5 minutes without writing a single configuration file. You want infrastructure that manages itself so you can focus on writing application code.

### Personal Project
For a personal project, you want low-maintenance, zero-cost infrastructure. 

Stick to the free tiers of PaaS providers like Vercel (Frontend), Render/Railway (Backend), and Supabase/Neon (Database). This setup is robust enough to handle moderate traffic, requires zero server maintenance, and is completely free. Do not waste time managing Linux servers on DigitalOcean or EC2 unless learning DevOps is the explicit goal of the project.

### Production SaaS
In a production SaaS, you need infrastructure that is highly available, scalable, and secure. This is where Infrastructure as Code (IaC) becomes necessary.

Move away from manual click-ops in web dashboards. Define your infrastructure using Terraform or AWS CDK. This ensures your staging and production environments are identical and reproducible. 

Depending on your team's expertise, choose between a managed PaaS (easier maintenance, higher cost) or containerized orchestration like Kubernetes/ECS (complex, but highly scalable and customizable). Ensure your infrastructure spans multiple availability zones to tolerate hardware failures. Use a Virtual Private Cloud (VPC) to isolate your databases and internal services from the public internet.

## Infrastructure as Code Prompt
\`\`\`prompt
Act as a Cloud Architect. I am planning the production infrastructure for a SaaS application using [Insert Tech Stack]. We expect moderate but steady traffic. Compare the pros, cons, and maintenance overhead of using a PaaS (like Heroku/Render) versus containerized orchestration (like AWS ECS or Kubernetes). Which do you recommend for a small team?
\`\`\`

## Validation Checklist
- [ ] Production infrastructure is isolated from staging and development environments.
- [ ] Databases and internal services are not exposed directly to the public internet (e.g., inside a VPC).
- [ ] Infrastructure components span multiple availability zones for fault tolerance.
- [ ] Infrastructure changes are managed through code (IaC) and version control, not manual dashboard clicks.
`,
  'disasterrecovery': `# Disaster Recovery

**Estimated Time:** 2-4 hours

---

## Why this matters
Disasters happen. Cloud providers have regional outages, disgruntled employees delete databases, and ransomware attacks occur. Disaster Recovery (DR) is the process of getting your business back online when the worst-case scenario becomes a reality. 

## Strategic Guidance

### Hackathon Mode
Ignore this completely. If the cloud provider goes down during the hackathon, everyone else using that provider is also down. The judges will understand. Do not spend a single minute worrying about disaster recovery.

### Personal Project
For a personal project, disaster recovery just means having a backup of your code and a backup of your database. 

Your code should be hosted on GitHub, which acts as your DR plan for your source code. If your database provider deletes your account, you should theoretically be able to restore from a recent SQL dump. That is all the DR planning you need.

### Production SaaS
A production SaaS requires a formal, tested Disaster Recovery plan. You need to define your Recovery Time Objective (RTO - how fast you need to be back online) and Recovery Point Objective (RPO - how much data you can afford to lose).

Your infrastructure should be defined as code (Terraform/CDK) so you can spin up a replica of your entire environment in a different cloud region within minutes. Your database backups must be continuously replicated to this secondary region.

You must document the exact, step-by-step Standard Operating Procedure (SOP) for declaring a disaster and executing the failover. Most critically, you must run "fire drills" to test this process. A DR plan that has never been tested is just a theoretical document that will fail when you actually need it.

## Disaster Recovery Plan Prompt
\`\`\`prompt
Act as a Site Reliability Engineer (SRE). I am operating a SaaS application on [Insert Cloud Provider, e.g., AWS, GCP]. Draft a standard operating procedure (SOP) for a Disaster Recovery scenario where our primary region goes completely offline. Include steps for DNS failover, infrastructure recreation via Terraform, and database restoration from a cross-region backup.
\`\`\`

## Validation Checklist
- [ ] Recovery Time Objective (RTO) and Recovery Point Objective (RPO) are defined.
- [ ] Database backups are securely stored in a secondary geographic region.
- [ ] Infrastructure can be rapidly recreated using Infrastructure as Code (IaC).
- [ ] The Disaster Recovery failover process is documented and tested regularly.
`,
  'scalabilityplanning': `# Scalability Planning

**Estimated Time:** 2-4 hours

---

## Why this matters
Scalability is the ability of your system to handle increased load gracefully without catastrophic failure or astronomical costs. Designing for scale too early is a waste of time (premature optimization), but ignoring it entirely will result in your application collapsing just when it starts to get popular.

## Strategic Guidance

### Hackathon Mode
Do not plan for scale. Your goal is to support exactly one user: you, during the demo. 

Write the most inefficient code possible if it saves you time. Run expensive computations on the main thread. Query the database inside a loop. None of it matters if you only have 3 rows in your database. 

### Personal Project
For a personal project, scalability planning is mostly an academic exercise. 

You should understand the *concepts* of scalability—like the difference between vertical scaling (getting a bigger server) and horizontal scaling (adding more servers). Ensure your backend is stateless so that, theoretically, you could run multiple instances of it. However, do not actually configure load balancers or read replicas. 

### Production SaaS
In a production SaaS, scalability must be planned and tested. You need to know your system's breaking points *before* a marketing spike hits them.

Design a stateless backend architecture so you can scale horizontally behind a load balancer. Offload heavy, long-running tasks (like image processing or report generation) to background worker queues (e.g., BullMQ, Celery) to keep your API responsive. 

Plan for database scaling. Start by vertically scaling your primary database, but know when and how you will introduce read replicas to offload read-heavy queries. Implement connection pooling (e.g., PgBouncer) to prevent your application servers from exhausting database connections. Conduct load testing (using tools like k6 or Artillery) to simulate high traffic and identify bottlenecks before they impact real users.

## Scalability Architecture Prompt
\`\`\`prompt
Act as a Software Architect. I am building a backend using [Insert Tech Stack, e.g., Node.js and PostgreSQL]. I expect a sudden surge in traffic due to a major marketing launch. Outline a plan to horizontally scale the backend application servers and implement connection pooling for the database to ensure it doesn't crash under load.
\`\`\`

## Validation Checklist
- [ ] The backend API is stateless, allowing for horizontal scaling.
- [ ] Long-running or resource-intensive tasks are offloaded to background worker queues.
- [ ] Database connection pooling is configured.
- [ ] Load testing has been conducted to identify the system's maximum capacity.
`,
  'launchchecklist': `# Launch Checklist

**Estimated Time:** 2-4 hours

---

## Why this matters
Launch day is chaotic. A checklist ensures you do not forget a critical step (like turning off debug mode or switching API keys from test to live) in the heat of the moment. A botched launch is incredibly difficult to recover from.

## Strategic Guidance

### Hackathon Mode
Your launch checklist is three items: 
1. Is the app deployed?
2. Does the primary flow work?
3. Is the demo script ready? 
If yes, you are done. Go practice your pitch.

### Personal Project
For a personal project, ensure your portfolio links are working, the app doesn't crash on load, and you have a solid README in your GitHub repository. Your "launch" is likely just a post on LinkedIn or X (Twitter). Ensure you have a nice preview image (Open Graph tag) configured.

### Production SaaS
A production launch requires military precision. You are coordinating infrastructure, marketing, and support simultaneously.

You must verify that all environment variables are set to production values (Stripe Live Keys, Production DB URLs). Ensure debug logging is disabled to prevent leaking secrets. Verify that automated backups are running. Check that your marketing site has proper SEO tags and analytics tracking. 

Prepare your customer support channels. Draft your launch announcements for Product Hunt, Hacker News, X, and your email list. Finally, have a rollback plan ready in case the deployment causes a catastrophic failure under load.

## Pre-Flight Check Prompt
\`\`\`prompt
Act as a Release Manager. I am launching a SaaS app built with [Insert Tech Stack] tomorrow. Provide a comprehensive pre-launch checklist covering infrastructure, security (API keys/environment variables), marketing assets, and fallback plans.
\`\`\`

## Validation Checklist
- [ ] All environment variables are using production (live) keys.
- [ ] Automated backups are enabled and verified.
- [ ] Debug mode is disabled; error tracking (e.g., Sentry) is enabled.
- [ ] Open Graph (social sharing) tags and SEO metadata are configured.
`,
  'seo': `# SEO (Search Engine Optimization)

**Estimated Time:** 3-6 hours

---

## Why this matters
SEO is how you acquire users for free. If Google cannot index your site, or if you rank poorly for your target keywords, you will be forced to rely entirely on paid ads or viral marketing. Solid technical SEO ensures your product can be found by people actively searching for the problem you solve.

## Strategic Guidance

### Hackathon Mode
Ignore SEO entirely. Google will not index your site before the hackathon ends. Do not spend time writing meta descriptions or optimizing sitemaps. Focus on the demo.

### Personal Project
For a personal project, basic technical SEO is a great way to show attention to detail. 

Ensure you have a \`<title>\` and \`<meta name="description">\` tag. Add Open Graph tags so your project looks good when you share the link on LinkedIn or Discord. You don't need a blog or a complex keyword strategy, just ensure the site is indexable and looks professional when shared.

### Production SaaS
SEO is a critical, long-term acquisition channel for a production SaaS. You must implement robust technical SEO from day one.

Your marketing pages must be server-side rendered (SSR) or statically generated (SSG) so search engine crawlers can read the content immediately. Ensure a dynamic \`sitemap.xml\` and \`robots.txt\` are generated. Use semantic HTML (proper use of \`<h1>\`, \`<h2>\`, etc.). 

Optimize your Core Web Vitals, as site speed directly impacts rankings. Finally, establish a programmatic SEO strategy or a content marketing blog to target long-tail keywords related to the pain points your SaaS solves.

## Technical SEO Prompt
\`\`\`prompt
Act as an SEO Specialist. I am building a marketing site for my SaaS using [Insert Framework, e.g., Next.js, Nuxt]. Provide a checklist for technical SEO best practices, including metadata, Open Graph tags, canonical URLs, and sitemap generation.
\`\`\`

## Validation Checklist
- [ ] Title and meta description tags are unique and descriptive for every page.
- [ ] Open Graph and Twitter Card tags are configured with a preview image.
- [ ] A \`sitemap.xml\` and \`robots.txt\` are automatically generated.
- [ ] The site is indexable (Server-Side Rendered or Statically Generated).
`,
  'analyticssetup': `# Analytics Setup

**Estimated Time:** 1-3 hours

---

## Why this matters
Without analytics, you are guessing. Analytics tell you where users come from, where they drop off, and which features they actually use. It is the compass that guides your product decisions after launch.

## Strategic Guidance

### Hackathon Mode
Do not install analytics. You do not have users. If you need to track clicks for a specific technical challenge, just \`console.log()\` it. Save your time for building features.

### Personal Project
Adding basic analytics is helpful to see if recruiters or developers are actually visiting your portfolio project.

Install a privacy-friendly, lightweight tracker like Plausible or Fathom. You do not need to track complex custom events; just track page views to see if anyone is looking at your work. Avoid heavy tools like Google Analytics unless you specifically want to learn how to use it.

### Production SaaS
Production SaaS requires deep, event-driven analytics. Page views are not enough; you need to track user behavior.

Integrate a robust product analytics tool like PostHog, Mixpanel, or Amplitude. You must track critical conversion events: \`Signed Up\`, \`Completed Onboarding\`, \`Subscribed\`, and \`Used Core Feature\`. 

Establish a funnel analysis to identify exactly where users abandon the onboarding process. Ensure you are tying events to a specific \`user_id\` so you can track cohorts over time. Always respect user privacy and ensure your analytics setup complies with GDPR (e.g., offering cookie consent if required).

## Analytics Event Strategy Prompt
\`\`\`prompt
Act as a Product Manager. I am launching a SaaS app for [Describe your app's core function]. List the top 5 critical custom events I must track in my analytics tool (e.g., PostHog/Mixpanel) to understand if users are experiencing the core value of the product.
\`\`\`

## Validation Checklist
- [ ] A product analytics tool is installed and tracking page views.
- [ ] Core conversion events (Signup, Upgrade) are actively tracked.
- [ ] Events are tied to unique user IDs for cohort analysis.
- [ ] A funnel has been created to monitor the onboarding drop-off rate.
`,
  'legaldocuments': `# Legal Documents

**Estimated Time:** 1-2 hours

---

## Why this matters
Beyond standard Privacy Policies, businesses often need specific legal structures depending on their industry. Operating without the correct legal documentation exposes the founders to personal liability and can result in the business being shut down by regulators.

## Strategic Guidance

### Hackathon Mode
Completely ignore this. You are building a prototype, not a corporation. Do not waste a single second on legal documents.

### Personal Project
Ignore this. As long as you are not stealing copyrighted material or processing highly sensitive data (like healthcare records), you do not need formal legal documents for a portfolio project.

### Production SaaS
If you are charging money, you are a business. You need a legal entity (like an LLC or C-Corp in the US) to protect your personal assets from business liabilities. 

Use services like Stripe Atlas or Clerky to incorporate quickly and generate standard founder agreements, IP assignments, and bylaws. If you operate in a regulated industry (Healthcare/HIPAA, Finance/Fintech), you *must* consult specialized legal counsel. Do not rely on AI or free templates for industry-specific compliance documents. Ensure you have proper contracts in place if you are hiring contractors or freelancers.

## Incorporation Strategy Prompt
\`\`\`prompt
Act as a Startup Advisor. I am launching a B2B SaaS business and plan to charge customers. Compare the pros and cons of forming an LLC versus a Delaware C-Corp. What are the immediate legal documents (e.g., IP assignment) I need in place between my co-founder and me?
\`\`\`

## Validation Checklist
- [ ] A formal legal entity (LLC, C-Corp, etc.) has been established.
- [ ] Intellectual Property (IP) has been assigned to the company.
- [ ] Any required industry-specific compliance documentation is in progress.
`,
  'cookiepolicy': `# Cookie Policy

**Estimated Time:** 1 hour

---

## Why this matters
Regulations like the ePrivacy Directive (Cookie Law) require websites to get consent from users before storing non-essential cookies on their devices. Failing to do so can result in hefty fines, especially if you have users in Europe.

## Strategic Guidance

### Hackathon Mode
Ignore it. You are not processing EU data for a real business. Skip the cookie banner entirely; it just clutters your demo.

### Personal Project
Ignore it, unless you want to practice implementing a cookie consent banner. If you use local storage for app state (like dark mode), you generally don't need a cookie banner. Only bother if you are integrating heavy third-party trackers, but for a personal project, you shouldn't be.

### Production SaaS
If you have users in Europe, a Cookie Policy and a Consent Banner are legally required. 

You must explicitly ask for consent *before* firing non-essential trackers like Google Analytics, Facebook Pixels, or Mixpanel. (Essential cookies, like session tokens for logging in, do not require consent). 

Use a Consent Management Platform (CMP) like Cookiebot, Termly, or OneTrust to automate this. The banner must allow users to accept all, reject all, or customize their preferences. It is illegal to use "dark patterns" to make rejecting cookies significantly harder than accepting them.

## Cookie Consent Prompt
\`\`\`prompt
Act as a Compliance Expert. I am building a SaaS using [Insert Tech Stack]. We use HttpOnly cookies for authentication, and we use PostHog for product analytics. Explain which of these require user consent under GDPR, and provide a strategy for implementing a compliant cookie banner that blocks PostHog until consent is given.
\`\`\`

## Validation Checklist
- [ ] A cookie consent banner is visible to users (specifically in the EU).
- [ ] Non-essential tracking scripts are blocked until the user explicitly consents.
- [ ] Users have an easy way to reject non-essential cookies.
- [ ] A dedicated Cookie Policy page explains what cookies are used and why.
`,
  'customersupport': `# Customer Support

**Estimated Time:** 2-4 hours

---

## Why this matters
Your first users are taking a risk on a new product. They will encounter bugs and get confused. If they cannot reach you easily, they will churn. Excellent customer support can turn a frustrated user into a lifelong evangelist for your product.

## Strategic Guidance

### Hackathon Mode
There are no customers, only judges. Do not build a contact form or integrate a support widget. If you need a placeholder, put your Twitter handle or a fake \`support@example.com\` email in the footer.

### Personal Project
Include a simple \`mailto:\` link in the footer or a basic contact form so recruiters or other developers can reach out to you if they have questions about your project. No support infrastructure is needed.

### Production SaaS
Customer support is a critical feature of your MVP. Do not launch without a way for users to contact you from inside the application.

Integrate a support widget or shared inbox (like Crisp, Intercom, or HelpScout). When a user submits a ticket, ensure it captures their user ID and metadata so you don't have to ask them for their email. 

Set up a dedicated support email (e.g., \`help@yourdomain.com\`). Consider building a very basic FAQ or Knowledge Base for the top 5 questions you expect to receive. In the early days, the founders should do all customer support; it is the fastest way to learn exactly where your product is failing.

## Customer Support Setup Prompt
\`\`\`prompt
Act as a Head of Customer Success. I am launching a new SaaS product. Recommend a lightweight, cost-effective tech stack for managing customer support tickets and building a basic knowledge base. What are the top 3 best practices for handling bug reports from angry early adopters?
\`\`\`

## Validation Checklist
- [ ] Users can easily contact support from within the application.
- [ ] Support tickets automatically capture the user's context (ID, email).
- [ ] A dedicated support email address is active and monitored.
- [ ] A basic FAQ or Help Center exists for common issues.
`,
  'retention': `# Retention

**Estimated Time:** Ongoing

---

## Why this matters
Acquiring a new user is 5 to 25 times more expensive than retaining an existing one. If your app is a leaky bucket, no amount of marketing will save it. High retention proves that you have built something people actually want and are willing to integrate into their lives or workflows.

## Strategic Guidance

### Hackathon Mode
Ignore this. Your retention period is exactly the 48 hours of the hackathon. Once the demo is over, the product is functionally dead. Do not waste a single second thinking about how to keep users coming back on day 30.

### Personal Project
For a portfolio piece, you do not need to worry about long-term retention. However, you should demonstrate that you understand the *concept* of engagement. 

Implement basic transactional emails (e.g., a welcome email when they sign up). This shows recruiters that you know how to build complete user flows, even if you are not running complex lifecycle marketing campaigns.

### Production SaaS
Retention is the lifeblood of a SaaS business. A 5% increase in customer retention can increase profits by 25% to 95%. You must actively monitor and improve it.

Track your Day 1, Day 7, and Day 30 retention rates in your analytics platform (PostHog/Mixpanel). Identify the 'Aha!' moment—the specific action a user takes that correlates heavily with long-term retention (e.g., for Slack, it was sending 2,000 messages). Optimize your onboarding to get users to that moment as fast as possible. Set up automated lifecycle emails (e.g., an email sent on Day 3 if the user hasn't completed onboarding) to re-engage churning users. Talk to users who churn and ask them exactly why they left.

## Retention Strategy Prompt
\`\`\`prompt
Act as a Growth Hacker. I am running a SaaS product. Outline a 14-day automated lifecycle email sequence designed to onboard new users, get them to the 'Aha!' moment, and prevent Day 7 churn. Include specific triggers for when these emails should be sent based on user behavior.
\`\`\`

## Validation Checklist
- [ ] Day 1, Day 7, and Day 30 retention metrics are being actively tracked.
- [ ] An automated welcome email is sent upon signup.
- [ ] A lifecycle email campaign is configured to re-engage inactive users.
- [ ] Churn reasons are collected when a user deletes their account or cancels their subscription.
`,
  'userfeedback': `# User Feedback

**Estimated Time:** Ongoing

---

## Why this matters
You are not your user. The features you think are brilliant might be completely ignored, and the bugs you think are minor might be driving users insane. Systematically collecting and acting on user feedback is the only way to ensure product-market fit.

## Strategic Guidance

### Hackathon Mode
The judges' feedback is the only feedback that matters. Take notes during their Q&A, but you do not need a systemic feedback collection mechanism inside the app.

### Personal Project
Include a simple "Feedback" or "Contact Me" button in the footer. If a recruiter or another developer finds a bug, give them an easy way to tell you. No need for complex voting boards or survey tools.

### Production SaaS
Feedback must be operationalized. If it takes more than two clicks for a user to report a bug or request a feature, they simply will not do it, and you will lose valuable insights.

Integrate an in-app feedback widget (like Canny, Featurebase, or a simple Intercom chat). Categorize feedback into bugs, UX issues, and feature requests. Do not blindly build every requested feature. Instead, look for the underlying problem the user is trying to solve. Send Net Promoter Score (NPS) surveys to gauge overall satisfaction, but pay closer attention to the written qualitative feedback than the numerical score.

## Feedback Analysis Prompt
\`\`\`prompt
Act as a Product Manager. We have received 50 feature requests this month. Provide a framework (e.g., RICE scoring or Kano model) for evaluating and prioritizing these requests based on engineering effort, potential revenue impact, and strategic alignment.
\`\`\`

## Validation Checklist
- [ ] Users can submit feedback or report bugs directly from within the app.
- [ ] Feedback is actively monitored and categorized (Bug, Feature Request, UX).
- [ ] A system (like NPS or CSAT) is in place to measure overall user satisfaction.
`,
  'scalingstrategy': `# Scaling Strategy

**Estimated Time:** Ongoing

---

## Why this matters
Success can kill you. If your app goes viral or you close a massive enterprise deal, a lack of scaling strategy will cause your servers to crash, resulting in massive downtime and lost revenue. Scaling is about preparing your architecture and your team for the next order of magnitude of growth.

## Strategic Guidance

### Hackathon Mode
Irrelevant. Do not plan for scale.

### Personal Project
Understand the difference between vertical scaling (upgrading to a bigger server) and horizontal scaling (adding more servers). You do not need to implement this for a personal project, but knowing the concepts is essential for interviews.

### Production SaaS
Scaling is a continuous process of identifying bottlenecks. You must monitor your infrastructure to see what breaks first under load—is it CPU, Memory, or Database Connections?

Initially, rely on vertical scaling (paying for a larger database instance) as it is cheap and requires zero architectural changes. As you approach the limits of vertical scaling, implement read replicas to offload database read queries. Move expensive, synchronous operations (like generating PDFs or sending bulk emails) into asynchronous background workers (e.g., Redis + BullMQ). Ensure your API servers are entirely stateless so you can spin up 10 or 100 of them behind a load balancer during traffic spikes.

## Architecture Scaling Prompt
\`\`\`prompt
Act as a Principal Engineer. Our monolithic Node.js and PostgreSQL app is starting to experience database connection limits during peak traffic hours. Outline a technical roadmap for introducing database connection pooling (e.g., PgBouncer) and asynchronous background workers to stabilize the system.
\`\`\`

## Validation Checklist
- [ ] The API is completely stateless (sessions are stored in a DB or Redis, not in memory).
- [ ] Expensive operations are handled asynchronously by background workers.
- [ ] Database connection limits are monitored and managed (e.g., via pooling).
- [ ] A plan exists for scaling the database (vertical scaling -> read replicas).
`,
  'marketing': `# Marketing

**Estimated Time:** Ongoing

---

## Why this matters
If you build it, they will *not* come. Distribution is often more important than the product itself. Marketing is how you get your product in front of the people who desperately need it.

## Strategic Guidance

### Hackathon Mode
Your "marketing" is the 3-minute pitch you give to the judges. Focus on storytelling. Make the judges understand the pain point in the first 30 seconds before you even show the app. 

### Personal Project
Market yourself, not the app. Write a high-quality README on GitHub. Record a 2-minute Loom video walking through the architecture and the hardest technical challenges you overcame. Share the project on LinkedIn, Twitter, or Dev.to to attract recruiters and engineering managers.

### Production SaaS
Marketing must be systematic and measurable. Do not try every channel at once. 

Pick one acquisition channel that aligns with your product (e.g., SEO for evergreen problems, Cold Email for high-ticket B2B, or Social Content for consumer apps) and master it. Track your Customer Acquisition Cost (CAC) rigorously. If it costs you $50 to acquire a user who only pays you $10 before churning, your business is failing regardless of how good the code is. Build a launch plan for Product Hunt and Hacker News, but remember that launches only provide a temporary spike; sustainable growth requires a repeatable acquisition engine.

## GTM Strategy Prompt
\`\`\`prompt
Act as a Chief Marketing Officer. I am launching a B2B SaaS targeting [Insert Target Audience, e.g., HR Managers]. Suggest 3 distinct go-to-market (GTM) channels (e.g., Outbound Sales, Content SEO, Partnerships). For each channel, provide the first 3 actionable steps I need to take this week.
\`\`\`

## Validation Checklist
- [ ] A primary customer acquisition channel has been identified and tested.
- [ ] Customer Acquisition Cost (CAC) is being tracked and measured against Lifetime Value (LTV).
- [ ] A launch plan (e.g., Product Hunt, Hacker News, specific subreddits) is prepared.
`,
  'referralsystems': `# Referral Systems

**Estimated Time:** 2-4 Days

---

## Why this matters
Your best marketers are your happy customers. A well-designed referral system turns your user base into a viral growth engine, significantly lowering your Customer Acquisition Cost (CAC).

## Strategic Guidance

### Hackathon Mode
Skip it completely. There is no time to build double-sided incentive loops.

### Personal Project
Skip it. You do not have an active user base to refer other users.

### Production SaaS
Implement a referral system only *after* you have proven retention. If users are churning, they will not refer their friends.

Design a double-sided incentive: reward both the referrer and the referee (e.g., "Give $10, Get $10"). The reward must be highly desirable to your specific audience (e.g., free credits, extended trials, or actual cash via an affiliate program). Make the referral link extremely easy to find in the app UI. Track the virality coefficient (K-factor) to see if the referral loop is actually driving exponential growth. Consider using third-party tools like Rewardful or PartnerStack if you don't want to build the tracking logic from scratch.

## Viral Loop Prompt
\`\`\`prompt
Act as a Growth Product Manager. I run a SaaS app for [Describe App]. Design a double-sided referral incentive program that aligns with our business model. Should we offer account credits, premium features, or cash payouts? Explain the rationale.
\`\`\`

## Validation Checklist
- [ ] Core retention metrics are stable before launching the referral program.
- [ ] A double-sided incentive is established (both parties benefit).
- [ ] The referral link is easily accessible within the core user dashboard.
- [ ] Referral attribution and payouts/credits are tracked automatically.
`,
  'featureroadmap': `# Feature Roadmap

**Estimated Time:** Ongoing

---

## Why this matters
A roadmap aligns your engineering efforts with your business goals and customer needs. Without a roadmap, you will succumb to "feature factory" syndrome—blindly building things because they sound cool or because one loud customer asked for it, rather than building what moves the needle.

## Strategic Guidance

### Hackathon Mode
Your roadmap is the next 12 hours. Write down the 3 things that absolutely must work for the demo, and cross them off as you finish. Ignore everything else.

### Personal Project
Use a simple Kanban board (Trello or GitHub Projects) to track what you are building. Once you finish the core MVP, your roadmap should consist of features that allow you to learn a new skill (e.g., "Add WebSockets for real-time notifications to learn Socket.io").

### Production SaaS
A production roadmap must balance technical debt, bug fixes, customer requests, and strategic vision.

Do not make your roadmap a rigid list of features with exact release dates; this sets you up for failure. Instead, organize your roadmap by "Now, Next, and Later" or by the specific problems you are trying to solve (e.g., "Q3 Goal: Reduce onboarding drop-off"). Make a public-facing version of your roadmap to build trust with users and show that the product is actively maintained. Always tie feature development back to your core KPIs (Revenue, Retention, Acquisition).

## Roadmap Planning Prompt
\`\`\`prompt
Act as a VP of Product. We have a backlog of 20 feature requests, 5 critical bugs, and a need to refactor our database schema. Provide a framework for how we should allocate our engineering bandwidth across these three categories for the next quarter.
\`\`\`

## Validation Checklist
- [ ] Engineering bandwidth is allocated intentionally between new features, bug fixes, and tech debt.
- [ ] Features are prioritized based on business impact and engineering effort.
- [ ] A high-level public roadmap is available to users (optional but recommended).
`,
  'technicaldebt': `# Technical Debt

**Estimated Time:** Ongoing

---

## Why this matters
Technical debt is the cost of choosing a fast, easy solution now instead of a better, longer-term approach. Like financial debt, it isn't inherently bad—it allows you to ship faster—but if you don't pay it down, the "interest" will eventually paralyze your ability to ship new features.

## Strategic Guidance

### Hackathon Mode
Your entire project is technical debt. Embrace it. Hardcode values, duplicate code, skip tests. The goal is a working demo, not a maintainable codebase. You will likely throw the code away anyway.

### Personal Project
Use personal projects to practice writing clean, maintainable code. Try to avoid technical debt. If you realize you wrote a messy component, take the time to refactor it. This is a safe environment to learn design patterns and clean architecture without the pressure of a production deadline.

### Production SaaS
In production, you must manage technical debt intentionally. 

It is acceptable to take on technical debt to hit a critical launch deadline, but you must document it (e.g., add \`// TODO: Tech Debt - Refactor this O(N^2) loop before we hit 10k users\`). Dedicate a fixed percentage of your engineering capacity (e.g., 20% of every sprint) strictly to paying down debt, upgrading dependencies, and refactoring fragile code. If you ignore technical debt, your developers will become miserable, deployment times will skyrocket, and the system will become dangerously unstable.

## Tech Debt Management Prompt
\`\`\`prompt
Act as a VP of Engineering. My team is struggling to ship new features because the codebase is bogged down by technical debt. Outline a strategy for identifying the most critical areas of technical debt and convincing the CEO that we need to dedicate 20% of our next sprint to refactoring rather than building new features.
\`\`\`

## Validation Checklist
- [ ] Known technical debt is documented in the issue tracker, not just hidden in the code.
- [ ] A consistent portion of engineering time is dedicated to refactoring and paying down debt.
- [ ] Dependencies (NPM packages, Docker images) are regularly audited and updated.
`,
  'pitchdeck': `# Pitch Deck

**🕒 Estimated Time:** 45-60 min

---

## Overview
You have built a phenomenal product. But whether you are pitching to a panel of hackathon judges, a Venture Capitalist, or a massive enterprise client, your code does not speak for itself. You must translate your technical achievement into a compelling business narrative. A Pitch Deck is a visual story that proves you understand the problem deeply, your solution is unique, and you have the ability to execute.

---

## Think First
Distill your narrative.

**What is the single biggest "Villain" (the problem) your pitch is fighting against?**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Why are *you* (or your team) the exact right people to solve this? (The "Why Us?")**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The 10-Slide Rule:** Guy Kawasaki famously created the 10/20/30 rule. A pitch deck should have 10 slides, last no more than 20 minutes, and contain no font smaller than 30 points. For a hackathon or quick pitch, you only have 3 minutes. Less is always more.
- **Problem First, Product Second:** Never start by showing screenshots of your app. Always start by making the audience feel the pain of the problem. If they don't care about the problem, they will immediately tune out your solution.

---

## Common Mistakes
- **The "Wall of Text" Slide:**
  - *Why it happens:* You are nervous you will forget what to say, so you write your entire script on the slide.
  - *Consequence:* The audience reads the slide instead of listening to you. They finish reading before you finish talking, and then they get bored.
  - *Prevention:* Slides should be strictly visual. Use large icons, single metrics (e.g., "40% Time Saved"), and high-contrast imagery. Your voice provides the context.
- **Feature Dumping:** Explaining exactly how your Redis cache architecture works to a non-technical judge. They don't care how it works; they care what it enables.

---

## Examples
- *Good Implementation:* Slide 1: The Problem (A stark, emotional statistic). Slide 2: The Solution (A 1-sentence value proposition). Slide 3: The Demo (A 60-second video). Slide 4: The Market/Traction. Slide 5: The Team.
- *Bad Implementation:* A 25-slide deck where 14 slides are complex UML diagrams of your backend architecture.

---

## AI Prompt
Use AI to outline the narrative arc of your pitch deck based on your product.

\`\`\`prompt
My SaaS product is: [INSERT ELEVATOR PITCH].
My target audience for this pitch is: [Hackathon Judges / Venture Capitalists / Enterprise Clients].
I have [INSERT TIME, e.g., 3 minutes] to present.

Act as an Expert Presentation Coach (like Steve Jobs).
1. Outline a strict, slide-by-slide narrative arc for my pitch deck. Limit it to maximum 7 slides.
2. For each slide, tell me exactly what the core visual should be.
3. For each slide, write the 1-2 sentence "talking point" I must memorize.
\`\`\`

---

## Validation Checklist
- [ ] Is your deck 10 slides or fewer?
- [ ] Is the font size on your slides 30pt or larger?
- [ ] Did you put the problem *before* the solution?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Write out the single most important sentence of your pitch—the "Hook" that will open your presentation.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,
  'demoscript': `# Demo Script

**🕒 Estimated Time:** 30-45 min

---

## Overview
A live demo is a high-wire act. It is the moment your product goes from an abstract idea to a tangible reality. A great demo feels like magic; it shows the user achieving their ultimate goal with zero friction. A bad demo is a confusing series of clicking through settings menus, waiting for loading spinners, and praying the app doesn't crash. You must choreograph every single mouse click.

---

## Think First
Identify the "Aha!" moment.

**What is the single most impressive, "magic" moment in your app? (e.g., The moment the AI generates the final video, the moment the payment clears instantly)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**What is the "Happy Path" you will take to get to that magic moment as quickly as possible?**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Live Demo vs. Recorded Video:**
  - *Live Demo:* Highly authentic, builds massive trust, but carries the risk of a fatal crash or slow Wi-Fi.
  - *Recorded Video:* Zero risk of crashing, allows you to edit out loading times. If you have 3 minutes to pitch on a stage, **always use a pre-recorded video** and talk over it. The risk of the Wi-Fi failing is too high.
- **Story-Driven vs. Feature-Driven:** Do not say "Here is the login page. Now I will click the dropdown. Here is the settings page." Instead, invent a character: "Meet Sarah. Sarah is a stressed founder. Watch how Sarah uses our app to save 5 hours..."

---

## Common Mistakes
- **Showing the "Boring" Stuff:**
  - *Why it happens:* You spent 3 weeks building a robust JWT authentication system and a beautiful settings page, so you want to show it off.
  - *Consequence:* You waste 45 seconds of your 3-minute demo logging in and resetting a password while the judges fall asleep.
  - *Prevention:* Start the demo already logged in. Start directly on the dashboard. Cut straight to the value.
- **Moving the Mouse Too Fast:** When you are nervous, you click quickly. The audience cannot follow your cursor. Move your mouse slowly and deliberately.

---

## Examples
- *Good Implementation:* "Our app turns text into podcasts. Let's start. I paste an article here. I click 'Generate'. While that runs in the background, let me tell you about our market size... And it's done! Let's listen."
- *Bad Implementation:* "Okay, let me type in a dummy email to sign up... oops, password must be 8 characters... let me try again... okay, now I have to check my email for the verification link..."

---

## AI Prompt
Use AI to choreograph the exact timing of your demo.

\`\`\`prompt
My SaaS product is: [INSERT ELEVATOR PITCH].
The "Magic Moment" of my app is: [INSERT MAGIC MOMENT].
I have exactly [INSERT TIME, e.g., 90 seconds] to do a live demo.

Act as a Broadway Director.
Write a strict, second-by-second script for my demo.
Divide the script into two columns:
1. "Action" (Exactly what I should click on screen).
2. "Voiceover" (Exactly what I should say while clicking it).
Ensure the demo skips all boring setup steps and gets to the Magic Moment before the 45-second mark.
\`\`\`

---

## Validation Checklist
- [ ] Have you removed all login/signup steps from the demo?
- [ ] Does the demo focus on a specific user story (e.g., "Sarah") rather than a list of features?
- [ ] Have you practiced the demo while timing yourself with a stopwatch to ensure it fits the time limit?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Define the exact starting state of your app when the demo begins (e.g., "Logged in, empty dashboard, fake data pre-loaded").

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,
  'submissionchecklist': `# Submission Checklist

**🕒 Estimated Time:** 15-20 min

---

## Overview
You did it. You validated the idea, designed the architecture, wrote the code, and crafted the pitch. Now it's time to hit submit. Whether you are submitting to a Hackathon, launching on Product Hunt, or sending your final proposal to an enterprise client, unforced errors at the very end can ruin weeks of hard work. This is the final sanity check.

---

## Think First
Review your critical links.

**What is the public URL where judges/users can test your app right now?**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**What is the link to your demo video (e.g., unlisted YouTube link)?**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Frictionless Access:** Judges and early adopters are lazy. If your app requires them to enter a credit card to try it, they will close the tab. If you are submitting to a hackathon, **provide a dummy login** (e.g., Email: \`judge@test.com\`, Password: \`password123\`) right in the README so they don't even have to sign up.
- **The Fallback Plan:** If your deployed app crashes 5 minutes after submission because of a database spike, the judges will see a blank screen. You must include a high-quality video demo link in your submission. If the app fails, the video proves it worked.

---

## Common Mistakes
- **Private Repositories / Broken Links:**
  - *Why it happens:* You are rushing at the 11th hour to submit.
  - *Consequence:* You submit a link to a private GitHub repo, or an unlisted YouTube video that is actually set to "Private". The judges give you a score of 0 because they can't see your work.
  - *Prevention:* Send your submission links to a friend on Discord/Slack and ask them to open it in an Incognito window to verify access.
- **Forgetting Environment Variables:** You deploy to Vercel, but forget to add your Supabase/Stripe keys in the Vercel dashboard. The app works locally but crashes in production.

---

## Examples
- *Good Implementation:* A submission with a crisp 2-paragraph description, a public GitHub repo containing a beautiful README, a working Vercel link, a set of test credentials, and a 2-minute YouTube demo.
- *Bad Implementation:* Submitting a link to \`localhost:3000\`. (Yes, this happens constantly).

---

## AI Prompt
Use AI to write your final submission description or Product Hunt launch post.

\`\`\`prompt
My SaaS product is: [INSERT ELEVATOR PITCH].
The core features are: [INSERT 3 FEATURES].
The tech stack is: [INSERT TECH STACK].

Act as a top-tier Developer Advocate.
Write a 300-word submission post for my app.
It must include:
1. A hook that explains the problem.
2. How my app solves it.
3. A brief mention of the tech stack (to impress technical judges).
4. Clear instructions on how to use the provided test credentials.
Keep the tone energetic and confident.
\`\`\`

---

## Validation Checklist
- [ ] Is your deployed app accessible via a public URL?
- [ ] Have you tested the public URL in an Incognito window?
- [ ] Have you provided test credentials so users don't have to sign up?
- [ ] Is your GitHub repository set to Public (if required)?
- [ ] Is your demo video accessible (Unlisted or Public, NOT Private)?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Take a deep breath. You built an entire application from scratch. You planned the architecture, wrote the code, and prepared the pitch. You are a builder. Hit submit, celebrate your achievement, and get ready for the next one.
`,
  'mobileideadefinition': `# Idea Definition

**Estimated Time:** 1-2 hours

---

## Why this matters
A mobile app idea is just a multiplier of execution. Choosing the right idea dictates how hard the execution will be and whether a native mobile app is even the correct medium. Mobile apps face a massive friction barrier: users must open an App Store, download a file, and grant permissions before they ever see your UI. If your idea does not justify this friction, it should just be a website.

## Strategic Guidance

### Hackathon Mode
Your idea should optimize for visual "wow factor" and leverage native device capabilities. Judges love flashy tech like the Camera, ARKit/ARCore, Geolocation, or Bluetooth. Business viability does not matter; visual impact and technical novelty do. 

If your idea is "a better to-do app," you will lose. Your idea must have a demo that makes people say "Whoa" within the first 15 seconds. Think "Real-time object detection" or "Location-based scavenger hunt," not "CRUD dashboard for accountants."

### Personal Project
Choose an idea that forces you to learn a specific mobile framework or native API you want on your resume. If you want to learn Push Notifications, build a habit tracker. If you want to learn offline storage, build a travel itinerary app.

Keep the scope incredibly small. A finished, polished mobile app that you can actually deploy via TestFlight or an APK is worth 100x more than a half-finished complex clone of Uber. 

### Production SaaS
Your idea must solve a highly painful, monetizable problem that explicitly requires being a native mobile application. Flashy tech does not matter; solving the pain matters. 

Ask yourself: "Does this need push notifications? Does this need offline support? Does this need camera access?" If the answer to all three is "no," build a web app instead. If people are currently using a messy spreadsheet on their phones and getting frustrated, that is a billion-dollar idea. If they won't pay for it on Day 1, do not write a single line of Swift, Kotlin, or React Native.

## Idea Validation Prompt
\`\`\`prompt
Act as a cynical Mobile Product Manager. I am pitching the following mobile app idea: [Insert Idea Here]. Rip it apart. Tell me why this should just be a responsive web app instead of a native mobile app. Point out the biggest friction points for user acquisition.
\`\`\`

## Validation Checklist
- [ ] The idea explicitly requires at least one native device capability (Camera, GPS, Push, Offline).
- [ ] The core value proposition can be explained in less than 10 seconds.
- [ ] The problem being solved is painful enough to overcome the friction of an App Store download.
`,
  'mobileproblemstatement': `# Problem Statement

**Estimated Time:** 1 hour

---

## Why this matters
If you do not clearly define the problem, you will build a solution that no one wants. A strong problem statement acts as a filter for every feature you plan to build. If a feature does not directly address the core problem, it gets cut.

## Strategic Guidance

### Hackathon Mode
The problem statement is just a storytelling device for your pitch. It does not need to be a real, pervasive global issue. It just needs to be relatable enough that the judges nod their heads during the first 30 seconds of your presentation. Keep it hyper-focused and slightly exaggerated for dramatic effect.

### Personal Project
The problem statement is primarily a way to give your portfolio project a cohesive theme. It helps reviewers understand *why* you built the app, even if the primary goal was just to learn a new technology. Define a simple, everyday annoyance (e.g., "Keeping track of borrowed books is tedious").

### Production SaaS
The problem statement is the foundation of your business. It must be specific, measurable, and tied to a quantifiable pain (e.g., lost time, lost money, emotional distress). 

Do not define a problem based on a lack of your solution (e.g., "The problem is there is no AI app for dog walking"). Define the problem based on the user's current reality (e.g., "Dog walkers spend 2 hours a day manually texting clients with updates and photos, leading to high churn and lost revenue"). If the problem is not a "hair on fire" issue, users will not go through the friction of downloading your app.

## Problem Refinement Prompt
\`\`\`prompt
Act as a UX Researcher. My current problem statement is: [Insert Problem]. Rewrite this into three different problem statements targeting three distinct user personas. Highlight the emotional and financial cost of this problem for each persona.
\`\`\`

## Validation Checklist
- [ ] The problem statement focuses on the user's pain, not the proposed technology.
- [ ] The problem is significant enough that users are actively looking for workarounds.
- [ ] The statement avoids vague marketing jargon.
`,
  'mobileusecases': `# Use Cases

**Estimated Time:** 1-2 hours

---

## Why this matters
Use cases map the abstract "idea" to concrete actions. They define exactly what the user is trying to accomplish within the app. Defining use cases prevents scope creep and ensures the engineering team is building workflows, not just isolated buttons.

## Strategic Guidance

### Hackathon Mode
Limit yourself to exactly two use cases. One primary use case that shows off the "wow" factor of the app (e.g., "User points camera at a plant to identify it"), and one secondary use case to show completeness (e.g., "User views their history of identified plants"). Anything more will ruin your sleep schedule.

### Personal Project
Define 3 to 4 core use cases. This is enough to demonstrate a complete CRUD (Create, Read, Update, Delete) cycle or a complex API integration, which is what hiring managers want to see. Do not add use cases for "Settings" or "Profile Editing" unless they are the entire point of the app.

### Production SaaS
Use cases must be exhaustive for the core flows, but ruthlessly prioritized. 

You must define the "Happy Path" (when everything works perfectly) and the "Unhappy Paths" (when the network drops, the API fails, or the user enters invalid data). Mobile apps are heavily susceptible to Unhappy Paths because users go into tunnels, lose cell service, or deny camera permissions. Your use cases must account for these scenarios. 

## Use Case Generation Prompt
\`\`\`prompt
Act as a Technical Business Analyst. For a mobile app that does [Describe App], list the 3 most critical Use Cases. For each Use Case, define the 'Happy Path' and at least two 'Unhappy Paths' (e.g., network failure, permission denied).
\`\`\`

## Validation Checklist
- [ ] The primary, high-value user action is clearly defined as a use case.
- [ ] Edge cases (offline, permissions denied) are accounted for in the core flows.
- [ ] Use cases are actionable and written from the user's perspective.
`,
  'mobileuserjourney': `# User Journey

**Estimated Time:** 2-3 hours

---

## Why this matters
A user journey visualizes the step-by-step experience a user has with your product, from the moment they discover it in the App Store to the moment they become a daily active user. Mapping this out reveals friction points—especially the onboarding drop-off, which kills 80% of mobile apps on Day 1.

## Strategic Guidance

### Hackathon Mode
Your user journey is the literal path you will click through during your live demo. Plan the exact sequence of screens you will show. Do not build screens that are not on this journey. If a screen isn't clicked during the demo, it doesn't exist.

### Personal Project
Map a simple journey that takes the user from opening the app to achieving the core value proposition. This helps you design your navigation stack (e.g., deciding between a Tab Navigator or a Stack Navigator). Keep the journey linear and avoid complex branching logic.

### Production SaaS
The mobile user journey is fraught with peril. You must map every micro-interaction. 

Consider the discovery phase: App Store screenshots, download times, and the initial splash screen. Crucially, map out exactly *when* you will ask for permissions (Push, Location, Camera). If you ask for all permissions on the very first screen, 50% of users will deny them and delete the app. You must map out "contextual permission requests"—asking for the Camera only when the user explicitly taps the "Take Photo" button. Map out the "Aha!" moment and ensure the journey gets the user there in under 3 minutes.

## Journey Mapping Prompt
\`\`\`prompt
Act as a Mobile UX Designer. Outline a 5-step User Journey for a first-time user downloading my app [Describe App]. Specifically address the onboarding flow and recommend the exact moment we should ask the user for [Insert specific permission, e.g., Push Notifications or Location] to maximize the opt-in rate.
\`\`\`

## Validation Checklist
- [ ] The journey starts at discovery (App Store) and ends at the core value proposition.
- [ ] Permission requests (Camera, Location, Push) are mapped contextually, not upfront.
- [ ] The onboarding flow is minimized to reduce Day 1 churn.
`,
  'mobiletargetaudience': `# Target Audience

**Estimated Time:** 1 hour

---

## Why this matters
"Everyone" is not a target audience. If you build an app for everyone, you build an app for no one. Defining a narrow target audience allows you to tailor your UX, your App Store optimization, and your marketing copy to speak directly to the people who actually need your product.

## Strategic Guidance

### Hackathon Mode
Your target audience is the judging panel. Tailor the problem and solution to things they care about (e.g., developer productivity, local community issues, trending AI topics). If you make the judges feel the pain, you win.

### Personal Project
Your target audience is recruiters, hiring managers, or yourself. If it's for yourself, optimize the UX for your own daily habits. If it's for recruiters, focus on clean architecture and best practices rather than solving a real-world market need.

### Production SaaS
Your initial target audience (your "wedge") must be hyper-specific. 

Do not target "fitness enthusiasts." Target "competitive powerlifters who train 4 days a week and track RPE (Rate of Perceived Exertion)." A hyper-specific audience has hyper-specific jargon, online communities, and pain points. This makes your marketing incredibly cheap because you know exactly which subreddits or Discord servers they hang out in. You can expand to a broader audience later; start with a niche that is desperate for your solution.

## Audience Profiling Prompt
\`\`\`prompt
Act as a Product Marketing Manager. My mobile app does [Describe App]. I want to target a hyper-niche early adopter audience. Give me 3 options for highly specific target audiences. For each, tell me where they congregate online (subreddits, forums) and what specific jargon they use.
\`\`\`

## Validation Checklist
- [ ] The audience is narrow enough to have specific online gathering places.
- [ ] The audience has a demonstrated willingness to pay or download apps for this problem.
- [ ] The audience definition avoids vague demographics (e.g., "Millennials") in favor of behavioral traits.
`,
  'mobilepersonas': `# Personas

**Estimated Time:** 1-2 hours

---

## Why this matters
Personas humanize your target audience. Instead of debating whether "users" will like a dark mode toggle, you debate whether "Sarah, a night-shift nurse," needs a dark mode toggle. Personas act as a tie-breaker for product design decisions.

## Strategic Guidance

### Hackathon Mode
Skip this. You do not have time to invent fictional characters and their backstories. Build the app.

### Personal Project
Create one simple persona to guide your design choices. If your persona is an elderly user, you know to use large typography, high contrast, and simple navigation. If your persona is a power user, you can implement complex gestures and dense data screens.

### Production SaaS
Develop 2 to 3 data-driven personas based on actual conversations with your waitlist or potential users. 

Do not fill personas with useless demographic fluff (e.g., "John likes dogs and long walks"). Focus entirely on their technical proficiency, the devices they use (iOS vs Android, old hardware vs new hardware), the environments they use the app in (e.g., "outdoors with glare," "one-handed while holding a baby"), and their primary motivations. This directly impacts mobile UX design, such as button placement for thumb reachability and offline capabilities for poor network areas.

## Persona Generation Prompt
\`\`\`prompt
Act as a UX Researcher. Generate two actionable user personas for a mobile app that [Describe App]. Do not include fluff. Focus on their mobile device habits (iOS vs Android), their technical literacy, the physical environment in which they will use the app, and their primary pain point.
\`\`\`

## Validation Checklist
- [ ] Personas are based on behavioral traits and mobile habits, not just demographics.
- [ ] The physical environment of the user (e.g., on the go, low battery, bad signal) is considered.
- [ ] Design decisions can be directly tied back to the needs of a specific persona.
`,
  'mobilesolutionstatement': `# Solution Statement

**Estimated Time:** 1 hour

---

## Why this matters
The solution statement bridges the gap between the problem you identified and the app you are building. It clearly articulates *how* your mobile app specifically resolves the user's pain in a way that alternative solutions (like web apps or spreadsheets) cannot.

## Strategic Guidance

### Hackathon Mode
Your solution statement is your headline. It needs to be punchy, buzzword-heavy (if applicable to the theme), and immediately understandable. "We use AI to instantly identify..." or "A real-time mesh network for..." Make it sound impressive.

### Personal Project
Keep it straightforward and technical. "A React Native mobile application that utilizes the device's GPS to track..." This clearly communicates what the project is and what technologies are being demonstrated.

### Production SaaS
Your solution statement must focus on the value delivered, not the technology used. 

Users do not care that you use GraphQL or a cutting-edge cross-platform framework. They care that the app "Saves 5 hours a week" or "Eliminates manual data entry." The statement must explicitly justify why this is a *mobile* solution. For example: "A mobile-first inventory tracker that allows warehouse workers to scan barcodes offline, syncing automatically when they reconnect to Wi-Fi, eliminating clipboard data entry."

## Solution Refinement Prompt
\`\`\`prompt
Act as a Y Combinator Partner. My current solution statement is: [Insert Statement]. Rewrite this to be aggressively focused on the business value and the specific advantage of it being a native mobile application. Remove all technical jargon.
\`\`\`

## Validation Checklist
- [ ] The statement clearly explains how the problem is solved.
- [ ] The statement relies on value metrics (time saved, money earned) rather than technical jargon.
- [ ] It is obvious why this solution requires a mobile application rather than a website.
`,
  'mobileelevatorpitch': `# Elevator Pitch

**Estimated Time:** 1 hour

---

## Why this matters
Attention spans are near zero. Whether you are pitching an investor, a hackathon judge, or trying to convince a user scrolling through the App Store, you have less than 10 seconds to explain what your app is and why they should care. If you stumble here, you lose them forever.

## Strategic Guidance

### Hackathon Mode
Your elevator pitch is the opening hook of your demo. It must immediately establish the stakes and the solution. Memorize it perfectly. A confident, 10-second pitch sets the tone for a winning presentation.

### Personal Project
Use the elevator pitch as the first line of your GitHub README and your LinkedIn post when you share the project. It should concisely explain the app's purpose and the tech stack used, grabbing the attention of recruiters scanning dozens of projects a day.

### Production SaaS
Your elevator pitch is the core of your App Store listing, your marketing website header, and your ads. 

It must clearly define the target audience, the problem, the solution, and the unique differentiator. Use the standard framework: "For [target audience] who have [problem], [App Name] is a [category] that provides [solution]. Unlike [competitor], we [key differentiator]." Refine it until a 10-year-old can understand exactly what your business does.

## Pitch Generation Prompt
\`\`\`prompt
Act as a Startup Founder. My app does [Describe App] for [Target Audience]. Write three variations of an elevator pitch. One formatted for an App Store subtitle (under 30 characters), one formatted for a Twitter/X post, and one using the standard 'For [Audience] who [Problem]...' framework.
\`\`\`

## Validation Checklist
- [ ] The pitch clearly identifies the target audience.
- [ ] The core value proposition is easily understood without technical context.
- [ ] The pitch can be spoken aloud in under 15 seconds.
`,
  'mobilecompetitoranalysis': `# Competitor Analysis

**Estimated Time:** 2-4 hours

---

## Why this matters
Unless you are inventing a fundamentally new technology, you have competitors. Understanding what they do well—and more importantly, what they do terribly—allows you to position your app as the obvious superior choice. It prevents you from making the exact same UX mistakes they did.

## Strategic Guidance

### Hackathon Mode
Skip detailed analysis. Find one major incumbent, identify their biggest flaw (e.g., "It's too slow," "It's not collaborative"), and make that flaw the entire premise of your pitch. "Unlike X, we do Y in real-time."

### Personal Project
Pick one or two popular apps in your chosen category. Download them, analyze their navigation structure, and borrow their best UI patterns. If Spotify uses a bottom tab bar for navigation, you should too. Do not reinvent the wheel for a portfolio project; demonstrate that you can implement industry-standard UX patterns.

### Production SaaS
Competitor analysis is a strategic weapon. You must deeply understand the landscape.

Do not just look at direct competitors; look at indirect competitors (e.g., the competitor to a budgeting app might just be a Google Sheet). Read their 1-star and 2-star reviews on the App Store and Google Play. These reviews are a goldmine of unresolved user pain points. If every review complains about a lack of offline support, offline support becomes your primary differentiator. Analyze their monetization strategy—are they pushing expensive weekly subscriptions, or upfront payments? Find the gaps in the market and attack them.

## Competitor Analysis Prompt
\`\`\`prompt
Act as a Product Strategist. I am building an app to compete with [Insert Competitor Name]. Based on general market knowledge of this competitor, list their 3 biggest strengths and their 3 biggest weaknesses. How can a new, agile startup position themselves against them to steal their most frustrated users?
\`\`\`

## Validation Checklist
- [ ] At least 3 direct or indirect competitors have been identified.
- [ ] 1-star App Store reviews of competitors have been analyzed to find missing features.
- [ ] A clear differentiator (Price, UX, Speed, Niche Feature) has been established.
`,
  'mobilesimilarapps': `# Similar Apps

**Estimated Time:** 1-2 hours

---

## Why this matters
Finding similar apps is not about stealing ideas; it's about establishing baseline expectations. Users have muscle memory. If every other app in your category uses a bottom navigation bar, and you use a hamburger menu, users will feel friction. Similar apps show you the "rules" of your category before you decide which ones to break.

## Strategic Guidance

### Hackathon Mode
Find the closest similar app, take screenshots of their 3 best screens, and put them in a mood board. Do not overthink this. If their app looks good, let their design choices inspire your prototype. 

### Personal Project
Studying similar apps helps you build a professional-looking UI without needing a design background. 

Pick the #1 app in the category you are mimicking (e.g., Duolingo if you are building an educational app). Open it and literally count the taps it takes to perform the core action. Notice the micro-interactions (e.g., how the button pulses, how the screen transitions). Your goal is to replicate that level of polish in your own code.

### Production SaaS
You must conduct a deep forensic analysis of similar apps. 

Download the top 5 similar apps. Pay specifically for their premium tiers and screenshot every step of their onboarding and paywalls. Take note of how they handle edge cases: What happens when you go offline? How aggressively do they ask for push notification permissions? How do they handle account deletion? By studying similar apps, you can fast-track your UX decisions and focus your engineering effort on your unique differentiator.

## UX teardown Prompt
\`\`\`prompt
Act as a Senior UX Researcher. I am building an app in the [Insert Category, e.g., Fitness Tracking] space. Identify the 3 market leaders. Provide a breakdown of the standard UX patterns users expect in this category (e.g., standard navigation structures, common onboarding steps, typical paywall placement).
\`\`\`

## Validation Checklist
- [ ] At least 3 similar apps have been downloaded and tested.
- [ ] Standard UX patterns for the category (e.g., navigation style) have been identified.
- [ ] The onboarding flow of the market leader has been mapped out.
`,
  'play-store-research': `# Play Store Research

**🕒 Estimated Time:** 20 min

---

## Overview
If you plan to launch on Android, the Google Play Store is your battleground. The Play Store algorithm heavily favors keyword density, localization, and early retention metrics. Researching how your competitors position themselves in the Play Store gives you the blueprint for your own App Store Optimization (ASO) strategy.

---

## Think First
Open the Google Play Store on your Android device (or via the web browser) and search for the core keyword of your app.

**Top 3 Search Results** (What apps appear first? Are they massive companies or indie developers?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Their Titles & Short Descriptions** (Google Play indexes the Title (30 chars) and Short Description (80 chars) heavily. What exact keywords are they using in these fields?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Negative Reviews** (Filter their reviews by 1-star. What is the most common complaint? "Too many ads"? "Crashes on Samsung"? "Requires too many permissions"?)
\`\`\`input
✍️ Type your answer here...
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
✍️ Type your answer here...
\`\`\``,
  'appstoreresearch': `# App Store Research

**Estimated Time:** 1-2 hours

---

## Why this matters
The Apple App Store is the most lucrative software marketplace on the planet, but it is heavily curated and strict. iOS users generally have a higher willingness to pay, but they also demand a higher level of design polish (Human Interface Guidelines). Understanding this ecosystem is critical for monetization.

## Strategic Guidance

### Hackathon Mode
Ignore this. You will not pass App Store Review during a 48-hour hackathon. Rely on TestFlight, Expo Go, or just a simulator for your demo.

### Personal Project
Getting an app into the App Store is a fantastic resume booster. 

However, Apple's review process is notoriously strict. You cannot have placeholder text (\`lorem ipsum\`), broken links, or an app that simply wraps a website. Research the App Store Review Guidelines (specifically sections on Minimum Functionality) before you start coding, or you will waste weeks building something Apple immediately rejects.

### Production SaaS
App Store optimization (ASO) on iOS requires a specific strategy. 

Unlike Google, Apple does not index the long description. They rely on the Title, Subtitle, and a hidden 100-character Keyword field. You must research high-volume, low-competition keywords for these fields. Furthermore, iOS users expect aggressive paywalls (often immediately after onboarding) but demand Apple-level polish. Research how top apps in your category use Promotional Text and In-App Events to drive engagement. Prepare for Apple's strict privacy requirements, specifically the App Tracking Transparency (ATT) prompt.

## iOS ASO Prompt
\`\`\`prompt
Act as an iOS App Store Optimization Expert. I am launching an app for [Describe App]. I have 100 characters for the hidden Keyword field. Suggest a strategy for selecting keywords. Also, what are the top 3 reasons Apple rejects apps in this specific category?
\`\`\`

## Validation Checklist
- [ ] The App Store Review Guidelines (especially Minimum Functionality) have been reviewed.
- [ ] A strategy for the Title, Subtitle, and 100-character Keyword field is drafted.
- [ ] The monetization model complies with Apple's In-App Purchase (IAP) rules (no circumventing the 30% fee).
`,
  'mobilefeatureplanning': `# Feature Planning

**Estimated Time:** 2-3 hours

---

## Why this matters
Feature planning transforms your abstract idea into a concrete backlog of work. In mobile development, features are more expensive to build and update than in web development (due to app store review cycles). Therefore, planning *exactly* what goes into the first build is critical to avoid wasting engineering cycles.

## Strategic Guidance

### Hackathon Mode
List every feature you *want* to build. Now cross off 80% of them. The remaining 20% is your feature plan. If a feature takes more than 3 hours to implement, cut it or fake it. 

### Personal Project
Plan features that demonstrate a breadth of skills rather than depth. Instead of building 5 different complex data filters, build one filter, add basic Push Notifications, and implement a clean UI state. This proves to reviewers that you understand the full mobile stack.

### Production SaaS
Feature planning must be driven by your core use cases and user journey, not by what sounds cool to build.

For a mobile app, you must explicitly plan for "invisible" features: offline state handling, token refresh logic, permission request flows, and deep linking. If you only plan user-facing features (like a "Like" button) and ignore the invisible features, your app will feel brittle and crash frequently. Group your planned features into Epics (e.g., "Authentication," "Core Navigation," "Offline Sync").

## Feature Brainstorming Prompt
\`\`\`prompt
Act as a Mobile Technical Lead. I am building a mobile app that [Describe App]. List the top 5 'invisible' mobile-specific features (e.g., offline handling, caching, deep linking) that I must include in my feature plan to ensure the app feels native and robust, rather than just a wrapped website.
\`\`\`

## Validation Checklist
- [ ] All features are directly tied back to a defined Use Case.
- [ ] "Invisible" mobile features (offline states, error handling, permissions) are explicitly planned.
- [ ] Features are grouped into logical Epics for easier estimation.
`,
  'mobilemvpfeatures': `# MVP Features

**Estimated Time:** 1-2 hours

---

## Why this matters
The Minimum Viable Product (MVP) is the smallest possible version of your app that still delivers the core value proposition. Every additional feature you add to the MVP delays your launch, increases your bug surface area, and burns cash/time before you have validated that anyone actually wants the app.

## Strategic Guidance

### Hackathon Mode
Your MVP is the demo. It only needs to work once, on one device, under perfect conditions. Hardcode everything except the specific API or technology you are trying to showcase.

### Personal Project
Your MVP should focus on completing the "Happy Path" perfectly. If you are building a social app, the MVP is: Auth -> Feed -> Post -> Logout. Do not build profile editing, password resets, or comment threads. A flawless, tiny app is much better than a buggy, massive app.

### Production SaaS
Defining the MVP is the hardest part of product management because you have to say "no" to good ideas.

Your MVP must solve the core problem 10x better than the alternative, but it does not need to do anything else. If you are building a diet tracker, the MVP must track calories flawlessly. It does *not* need social sharing, barcode scanning, or Apple Health integration. Cut ruthlessly. If a feature does not directly test your riskiest assumption (e.g., "Will users log their food every day?"), it belongs in Phase 2.

## MVP Scoping Prompt
\`\`\`prompt
Act as a ruthless Product Manager. Here is my list of planned features for my mobile app MVP: [Insert Feature List]. My core value proposition is [Insert Value Prop]. Tell me which 3 features I should cut immediately to launch 4 weeks faster, and explain why they are not essential for Day 1.
\`\`\`

## Validation Checklist
- [ ] The MVP contains only the features required to deliver the core value proposition.
- [ ] "Nice to have" features (e.g., social sharing, dark mode, complex settings) have been cut.
- [ ] The MVP can theoretically be built in less than 4-6 weeks.
`,
  'mobilefuturefeatures': `# Future Features

**Estimated Time:** 1 hour

---

## Why this matters
Documenting future features (the "Icebox" or "Backlog") serves two purposes: it prevents scope creep by giving you a place to put good ideas that don't belong in the MVP, and it helps you design an architecture that won't require a complete rewrite when you eventually add them.

## Strategic Guidance

### Hackathon Mode
Future features are what you put on the final "Next Steps" slide of your pitch deck to show the judges you have a grand vision. 

### Personal Project
List future features in your GitHub README under a "Roadmap" section. This shows employers that you understand the product lifecycle and know how the application *should* evolve, even if you never actually build it.

### Production SaaS
Future features dictate your early architectural decisions.

If you know you will eventually need real-time chat, you should choose a backend (like Supabase or Firebase) that supports WebSockets out of the box, rather than a rigid REST API. If you know you will eventually add internationalization (i18n), you should extract your strings into a localization file on Day 1, rather than hardcoding English throughout the app. Documenting future features ensures you don't paint yourself into a technical corner.

## Architectural Foresight Prompt
\`\`\`prompt
Act as a Principal Mobile Architect. My MVP is [Describe MVP], but my Phase 2 Future Features include [Insert Future Features, e.g., Real-time chat, Offline Sync]. What architectural decisions must I make *today* during the MVP phase to ensure I don't have to rewrite the entire app when I add those features later?
\`\`\`

## Validation Checklist
- [ ] All non-critical ideas have been moved out of the MVP and into a documented Backlog.
- [ ] The current technical stack can support the most complex future features without a total rewrite.
- [ ] Future features align with the long-term product vision.
`,
  'mobilefeatureprioritization': `# Feature Prioritization

**Estimated Time:** 1-2 hours

---

## Why this matters
Once you have a backlog of features, you need a systemic way to decide what to build first. Without a prioritization framework, you will build the easiest features first or the features the loudest customer asked for, rather than the features that actually drive growth.

## Strategic Guidance

### Hackathon Mode
Prioritize based solely on visual impact vs. time to implement. High visual impact + low implementation time = build it immediately. Everything else is ignored.

### Personal Project
Prioritize features based on what you want to learn. If your goal is to learn animations, prioritize building complex UI transitions. If your goal is backend architecture, prioritize complex data fetching.

### Production SaaS
You must use a rigid framework to remove emotion from prioritization.

Use the RICE scoring model: Reach (how many users does this affect?), Impact (how much does this improve the core metric?), Confidence (how sure are we that this will work?), and Effort (how many engineering weeks will this take?). (R * I * C) / E = Score. Build the features with the highest score. For early-stage mobile apps, prioritize features that reduce onboarding friction or improve Day 7 retention over features that only benefit power users.

## RICE Scoring Prompt
\`\`\`prompt
Act as a VP of Product. I have three proposed features for my mobile app: 1) [Feature 1], 2) [Feature 2], 3) [Feature 3]. Walk me through a quick RICE (Reach, Impact, Confidence, Effort) scoring exercise for these three features and tell me which one I should build first to maximize user retention.
\`\`\`

## Validation Checklist
- [ ] A formal prioritization framework (like RICE or Kano) is used to evaluate features.
- [ ] Features are prioritized based on their impact on core business metrics (e.g., Retention, Conversion).
- [ ] High-effort, low-impact features have been explicitly deprioritized.
`,
  'mobilemonetization': `# Monetization Strategy

**Estimated Time:** 1-2 hours

---

## Why this matters
How you make money dictates how you build the app. You cannot just build an app and "figure out monetization later." If you choose subscriptions, you need to build complex entitlement logic and paywalls. If you choose ads, you need to maximize session duration. The monetization strategy must be decided before writing code.

## Strategic Guidance

### Hackathon Mode
Monetization is just a bullet point on your pitch deck. Say you will use a "Freemium B2B SaaS model" because judges like hearing that. Do not actually write any Stripe or RevenueCat code.

### Personal Project
Do not implement real payments. If you want to demonstrate the skill, use Stripe's test mode or RevenueCat's sandbox environment. Implementing real monetization adds massive legal and security overhead that is completely unnecessary for a portfolio project.

### Production SaaS
The mobile App Store ecosystem takes a brutal 15-30% cut of digital goods. You must factor this into your unit economics.

If you are selling digital services (e.g., premium features in a fitness app), you *must* use Apple/Google In-App Purchases (IAP). If you are selling physical goods (e.g., clothes, food delivery), you can use Stripe and bypass the 30% fee. Choose your overarching model (Freemium, Subscription, Ads, etc.) based on your user acquisition cost. If it costs $10 to acquire a user, you cannot rely on an ad-supported model that generates $0.05 per user. 

## Monetization Strategy Prompt
\`\`\`prompt
Act as a Monetization Strategist. I am building a mobile app that [Describe App]. Should I use an ad-supported model, a freemium subscription model, or a one-time upfront purchase model? Explain the unit economics required to make your recommended strategy profitable.
\`\`\`

## Validation Checklist
- [ ] The chosen monetization strategy is compliant with Apple and Google's In-App Purchase rules.
- [ ] The strategy aligns with the expected Customer Acquisition Cost (CAC).
- [ ] The core value proposition is strong enough to support the chosen model.
`,
  'mobilefree': `# Free (100% Free)

**Estimated Time:** 30 minutes

---

## Why this matters
A 100% free app makes zero direct revenue. This model is only viable if the app serves a different strategic purpose (e.g., lead generation, a companion app for a physical product, or a purely philanthropic endeavor).

## Strategic Guidance

### Hackathon Mode
All hackathon projects are 100% free by default. 

### Personal Project
All personal projects should be 100% free. You want zero friction preventing recruiters or other developers from downloading and testing your work.

### Production SaaS
If you are building a business, a 100% free app is highly dangerous. 

Mobile apps incur ongoing costs: database reads, server hosting, Apple Developer fees ($99/yr), and maintenance for new OS updates. If the app is 100% free, it is a cost center. You only do this if the app is a "loss leader" (e.g., the Tesla mobile app is free because you bought a $50k car) or if the app is designed solely to collect user data to sell (which comes with massive privacy liabilities). If you do not have a way to subsidize the server costs, do not launch a 100% free app.

## Free App Viability Prompt
\`\`\`prompt
Act as a Financial Advisor for Startups. I want to release my mobile app 100% for free to maximize user growth, with the plan to 'monetize the data later.' Tell me exactly why this is a terrible idea and outline the hidden ongoing costs of maintaining a mobile app at scale.
\`\`\`

## Validation Checklist
- [ ] There is a clear strategic reason for the app to generate zero direct revenue.
- [ ] A funding source exists to cover ongoing server and developer account costs.
- [ ] If data is being monetized, the Privacy Policy explicitly states this in compliance with GDPR/CCPA.
`,
  'mobilefreemium': `# Freemium Model

**Estimated Time:** 2-4 hours

---

## Why this matters
Freemium is the most popular monetization model on mobile. It dramatically lowers the barrier to entry (acquiring users is easier when the app is free to download), but requires a delicate balance: the free tier must be useful enough to retain users, but restricted enough to force them to eventually pay for the premium tier.

## Strategic Guidance

### Hackathon Mode
Pretend you have a freemium model by showing a "Pro" badge next to certain features in your demo. Do not build actual feature gating logic. 

### Personal Project
Implement UI-level feature gating. For example, if the user tries to create a 4th project, show a beautiful "Upgrade to Pro" modal. You do not need to implement backend entitlement checks or real Stripe/Apple billing. Just the UI flow is enough to demonstrate competency.

### Production SaaS
Freemium requires ruthless metric tracking to find the optimal "paywall trigger."

If your free tier gives away too much, your conversion rate will be 0%. If it gives away too little, users will churn on Day 1 before they experience the core value. You must implement backend entitlement checks (e.g., using RevenueCat) to prevent users from bypassing the UI paywall. A good benchmark for a mobile B2C freemium app is a 2-5% free-to-paid conversion rate. Constantly A/B test your paywall screen (the text, the pricing, the timing) as small tweaks here can double your revenue overnight.

## Freemium Gating Prompt
\`\`\`prompt
Act as a Pricing Strategist. I am building a mobile app that [Describe App]. I want to use a freemium model. Give me 3 options for the "Value Metric" I should gate (e.g., usage limits, premium features, speed). Which option creates the most natural friction to upgrade without destroying the Day 1 onboarding experience?
\`\`\`

## Validation Checklist
- [ ] The free tier provides enough value to demonstrate the "Aha!" moment.
- [ ] The trigger for the paywall is based on a clear value metric (e.g., 3 projects maximum).
- [ ] Backend entitlement checks are planned to prevent unauthorized premium access.
`,
  'mobilesubscription': `# Subscription Model

**Estimated Time:** 1-2 hours

---

## Why this matters
Subscriptions create recurring, predictable revenue, which is why investors love them. However, consumer subscription fatigue is at an all-time high. Users will rigorously evaluate whether your app is worth a recurring monthly charge compared to their Netflix or Spotify subscription.

## Strategic Guidance

### Hackathon Mode
Ignore this. 

### Personal Project
Do not implement real subscriptions. If you want to show off, integrate RevenueCat's sandbox environment to demonstrate that you understand how subscription webhooks and entitlement lifecycles (renewals, cancellations, grace periods) work conceptually.

### Production SaaS
Implementing mobile subscriptions requires using Apple and Google's native In-App Purchases (IAP). 

You cannot link out to Stripe to bypass the 30% fee without risking immediate rejection. Use a service like RevenueCat or Qonversion to handle the incredibly complex logic of cross-platform receipt validation, renewals, and cancellations. You must provide clear cancellation instructions in the app. To fight churn, implement a "win-back" campaign (e.g., offering a 50% discount if they try to cancel). Finally, deeply analyze the difference between your Monthly vs Annual subscription retention rates.

## Subscription Economics Prompt
\`\`\`prompt
Act as a SaaS Financial Modeler. We are launching a mobile subscription app at $9.99/month. Assume Apple takes a 15% cut (Small Business Program). If our blended Customer Acquisition Cost (CAC) is $15, how many months does a user need to remain subscribed for us to achieve a 3x LTV:CAC ratio?
\`\`\`

## Validation Checklist
- [ ] Apple/Google In-App Purchases are used (no external Stripe links for digital goods).
- [ ] A tool like RevenueCat is planned to handle cross-platform receipt validation.
- [ ] A clear, easy-to-find cancellation flow is designed to comply with App Store policies.
`,
  'mobileads': `# Ad-Supported Model

**Estimated Time:** 1-2 hours

---

## Why this matters
Ad-supported models (using AdMob or similar networks) are common for mobile games and utility apps (like calculators or weather apps). However, unless you have millions of Daily Active Users (DAUs) or extremely long session durations, the revenue generated from ads will be pennies.

## Strategic Guidance

### Hackathon Mode
Do not put ads in your hackathon project. It ruins the UX and makes the demo look cheap.

### Personal Project
Do not integrate real ad networks. If you want to demonstrate the skill, put a static banner image that says "Ad Placeholder." Actual ad SDKs bloat your app size and require complex privacy policy configurations.

### Production SaaS
The unit economics of an ad-supported app are brutal. 

You are paid based on eCPM (Effective Cost Per Mille), which is the revenue per 1,000 impressions. For standard banner ads, eCPM might be $0.50 to $2.00. To make $1,000, you need 500,000 to 2,000,000 ad impressions. If your app only has 1,000 users who use it for 1 minute a day, you will make nothing. If you must use ads, prefer "Rewarded Video Ads" (e.g., "Watch this 30s ad to unlock a premium filter"), as they have significantly higher eCPMs and feel less intrusive to the user than random popups.

## Ad Monetization Prompt
\`\`\`prompt
Act as a Mobile Ad Monetization Manager. My app currently has 10,000 Daily Active Users (DAUs) with an average session length of 3 minutes. Calculate my projected monthly revenue if I use standard banner ads with a $1.00 eCPM versus Rewarded Video ads with a $15.00 eCPM. Which format should I prioritize?
\`\`\`

## Validation Checklist
- [ ] The app's projected DAU and session length can realistically support an ad-driven revenue model.
- [ ] Rewarded video or native ads are prioritized over intrusive interstitials.
- [ ] Privacy policies are updated to reflect third-party ad tracking (e.g., AdMob, ATT prompts).
`,
  'mobileonetimepurchase': `# One-Time Purchase

**Estimated Time:** 1 hour

---

## Why this matters
Charging a single upfront fee (or a single lifetime unlock via IAP) is the most honest monetization model, but it is the hardest to build a sustainable business on. You constantly need to acquire new users to survive, and you have no recurring revenue to fund long-term maintenance.

## Strategic Guidance

### Hackathon Mode
Ignore this.

### Personal Project
Ignore this. 

### Production SaaS
A one-time purchase is highly attractive to users suffering from subscription fatigue. 

This model works best for utility apps (e.g., a specific camera filter app, a niche calculator) that do not have ongoing server costs. If your app relies on a heavy backend database, AI API calls, or real-time syncing, a one-time purchase model will eventually bankrupt you because your server costs will scale with usage, but your revenue per user is capped. If you choose this model, your app must function almost entirely offline on the local device.

## Pricing Model Prompt
\`\`\`prompt
Act as a Pricing Strategist. I am building a mobile app for [Describe App]. I want to charge a one-time $49 "Lifetime Unlock" fee to avoid subscription fatigue. What are the long-term financial risks of this model, and what specific technical architecture (e.g., local-first storage) is required to make this profitable over 5 years?
\`\`\`

## Validation Checklist
- [ ] The app has minimal to zero ongoing server or third-party API costs.
- [ ] The architecture relies heavily on local device storage (CoreData/SQLite) rather than cloud databases.
- [ ] The upfront price is high enough to cover Customer Acquisition Cost (CAC) immediately.
`,
  'mobilesuccessmetrics': `# Success Metrics

**Estimated Time:** 1 hour

---

## Why this matters
If you don't define what success looks like *before* you launch, you will move the goalposts to make yourself feel better. Defining explicit metrics forces you to face reality: is the app growing, dying, or stagnating?

## Strategic Guidance

### Hackathon Mode
Success is a working demo that doesn't crash on stage. Metrics do not matter.

### Personal Project
Success is a clean GitHub repository, a well-written README, and a working demo video. If you deploy it to the App Store, getting even 10 organic downloads is a huge success you can mention in interviews.

### Production SaaS
Select exactly ONE primary metric that acts as your "North Star." 

For a social app, this might be Daily Active Users (DAU). For a B2B SaaS, it might be Monthly Recurring Revenue (MRR). For a utility app, it might be the number of tasks completed per week. Every feature you build should be judged against whether it moves the North Star metric. Accompany the North Star with 2-3 supporting metrics (like Churn Rate and Customer Acquisition Cost) to ensure you aren't growing one metric at the fatal expense of another.

## North Star Metric Prompt
\`\`\`prompt
Act as a Data-Driven CEO. My mobile app is a [Insert Category] app that helps users [Insert Core Value]. Suggest 3 potential 'North Star' metrics for this specific app. Which one is the hardest to manipulate through vanity marketing, and why is it the best indicator of true product-market fit?
\`\`\`

## Validation Checklist
- [ ] A single "North Star" metric has been explicitly defined.
- [ ] A tool (e.g., PostHog, Mixpanel, RevenueCat) is selected to track this metric accurately.
- [ ] Supporting metrics (Churn, CAC) are defined to provide business context.
`,
  'mobileretention': `# Retention Tracking

**Estimated Time:** 1-2 hours

---

## Why this matters
Retention is the ultimate arbiter of Product-Market Fit. If 1,000 people download your app on Monday, and only 10 open it on Tuesday (1% Day 1 Retention), your product is fundamentally broken. You cannot fix bad retention with more marketing.

## Strategic Guidance

### Hackathon Mode
Ignore this. 

### Personal Project
Ignore this, you do not have enough users for retention cohorts to be statistically significant.

### Production SaaS
You must track Day 1, Day 7, and Day 30 retention rigorously.

On mobile, Day 1 retention (the percentage of users who open the app the day after downloading) averages around 25%. If yours is below 15%, your onboarding flow is failing or your app is crashing. Create a "Cohort Analysis" chart in your analytics tool (PostHog/Amplitude). Look for the "retention plateau"—the point where the curve flattens out. If your curve never flattens and drops to 0%, you have a leaky bucket. Stop all marketing spend immediately until you fix the core product loop.

## Cohort Analysis Prompt
\`\`\`prompt
Act as a Growth Product Manager. My mobile app's Day 1 retention is 40%, but by Day 7 it drops to 5%. Outline a strategy for using qualitative user interviews and quantitative funnel analysis to identify exactly *why* users are abandoning the app between Day 2 and Day 6.
\`\`\`

## Validation Checklist
- [ ] Analytics are configured to track Day 1, Day 7, and Day 30 retention cohorts.
- [ ] The onboarding funnel is tracked step-by-step to find the highest drop-off points.
- [ ] Marketing spend is tied to retention validation (do not scale marketing on a leaky bucket).
`,
  'mobiledau': `# DAU (Daily Active Users)

**Estimated Time:** 30 minutes

---

## Why this matters
Daily Active Users (DAU) measures how many unique people open your app in a 24-hour period. It is the defining metric for apps that require daily habit formation (e.g., social media, fitness trackers, to-do lists).

## Strategic Guidance

### Hackathon Mode
Ignore this.

### Personal Project
Ignore this.

### Production SaaS
Not every app needs to optimize for DAU. 

If you are building a tax preparation app, optimizing for DAU is stupid—users only need it once a year. If you are building a habit tracker, DAU is your lifeblood. Define what "Active" actually means. Is simply opening the app "active," or must the user actually log a habit? (Hint: strictly define "active" as performing the core action). Calculate your DAU/MAU ratio (stickiness). A ratio above 20% is good; above 50% is world-class.

## DAU Definition Prompt
\`\`\`prompt
Act as a Data Analyst. My app is a [Describe App]. If we track DAU, should the 'Active' event just be 'App Opened', or should it be a specific core action? Define exactly what the 'Active' event should be to prevent us from tracking vanity metrics.
\`\`\`

## Validation Checklist
- [ ] The "Active" event is strictly defined as a core action, not just "App Opened."
- [ ] The DAU metric aligns with the natural usage frequency of the product.
`,
  'mobilemau': `# MAU (Monthly Active Users)

**Estimated Time:** 30 minutes

---

## Why this matters
Monthly Active Users (MAU) measures your broader active user base over a 30-day period. It is a critical metric for B2B tools, utility apps, and reporting overall business scale to investors.

## Strategic Guidance

### Hackathon Mode
Ignore this.

### Personal Project
Ignore this.

### Production SaaS
MAU is a slower-moving metric than DAU, making it better for tracking macro-level growth trends. 

If your MAU is growing but your MRR (Monthly Recurring Revenue) is flat, your monetization funnel is broken. Just like DAU, you must strictly define what an "Active" user is. Investors look heavily at MAU growth month-over-month (MoM). A healthy early-stage SaaS aims for 10-20% MoM MAU growth. Ensure you are removing bots, test accounts, and internal team members from your MAU calculations.

## MAU Growth Prompt
\`\`\`prompt
Act as an Investor Relations Manager. Our MAU is growing at 15% month-over-month, but our Paid Subscribers are only growing at 2% month-over-month. What are the top 3 underlying product or marketing issues that cause this discrepancy, and how should we investigate them?
\`\`\`

## Validation Checklist
- [ ] Internal team members and test accounts are excluded from the MAU metric.
- [ ] MAU growth is actively compared against MRR/Revenue growth to ensure quality acquisition.
`,
  'mobilesessionduration': `# Session Duration

**Estimated Time:** 30 minutes

---

## Why this matters
Session duration measures how long a user spends in your app during a single sitting. For ad-supported or social apps, higher session duration directly correlates with higher revenue. For utility or productivity apps, a high session duration might actually mean your UX is confusing.

## Strategic Guidance

### Hackathon Mode
Ignore this.

### Personal Project
Ignore this.

### Production SaaS
Context is everything for session duration. 

If you are building TikTok, you want a 45-minute session duration. If you are building an app to quickly log expenses, a 5-minute session duration means your UI is terrible and the user is struggling. Determine what a "successful" session duration looks like for your specific use case. If you need to decrease session duration (improve efficiency), track the time-to-completion for the core task. If you need to increase it (for ad revenue), implement infinite scrolls, algorithmically generated feeds, or push notification re-engagement loops.

## Session Duration Strategy Prompt
\`\`\`prompt
Act as a UX Analyst. My app is a [Describe App]. Is our goal to maximize session duration (keep them engaged) or minimize session duration (get them to the result faster)? Based on your answer, suggest 2 UX changes we can implement to achieve that goal.
\`\`\`

## Validation Checklist
- [ ] It is explicitly decided whether the product goal is to maximize or minimize session duration.
- [ ] Analytics (e.g., PostHog/Mixpanel) are configured to accurately track session start and end events.
`,
  'mobileprd': `
# Mobile Product Requirements Document (PRD)

🕒 **Estimated Time:** 1-2 hours

---

## The Strategic Importance of a Mobile PRD
Unlike web apps, mobile apps are constrained by screen real estate, battery life, and strict App Store review guidelines. A Mobile PRD forces you to ruthlessly prioritize what actually needs to be on a user's phone versus what belongs on a desktop dashboard.

---

## Strategic Guidance

### Hackathon Mode
Forget the traditional PRD. You only have a weekend. Your "PRD" is a bulleted list of 3 absolute must-have features that can be built using existing mobile SDKs or templates. Cut any feature that requires complex custom UI or background processing. Focus on the 'wow' factor that you can show on a physical device.

### Personal Project Mode
Use this phase to define the learning outcomes for your project. Are you building this to learn SwiftUI? Flutter? Map out the exact features that will force you to interact with the device's native capabilities (like the Camera, GPS, or Push Notifications), so you actually get the technical experience you desire.

### Production SaaS Mode
Your Mobile PRD must be heavily focused on retention loops and onboarding. Because app uninstalls happen within the first 3 minutes of usage, the PRD must explicitly define the "Aha!" moment and how the user reaches it with minimal friction. Document the core workflows, offline capabilities, and what happens when the network connection drops.

### Custom Mode
For enterprise mobile applications, the PRD becomes a highly rigorous compliance document. You must define data encryption at rest (on the device), Mobile Device Management (MDM) compatibility, offline syncing conflict resolution algorithms, and rigorous SLA requirements for API response times on cellular networks.

---

## The Data We Need From You
To generate your PRD, we need to know what you are actually building and who it is for. This data will be used by the AI to architect your application.

**Describe the core problem your mobile app solves in one sentence:**
\`\`\`input
Write Here...
\`\`\`

**What is the one primary action the user will take most frequently?**
\`\`\`input
Write Here...
\`\`\`

---

## AI Brainstorming Phase
Use this prompt to generate your foundational Mobile PRD. Paste the output directly into your project documentation.

\`\`\`prompt
Act as a Senior Mobile Product Manager. I am building a mobile app that solves this problem: [Paste Core Problem]. The primary action users will take is: [Paste Primary Action]. 

Generate a concise, actionable Mobile PRD including:
1. Target Audience & Core Use Case
2. The "Aha!" Moment (how we get them there in under 3 minutes)
3. In-Scope Features for v1.0
4. Out-of-Scope Features (what we are actively choosing NOT to build)
5. Native Capabilities Required (e.g., Push, Location, Camera)
\`\`\`

## Validation
- [ ] I have generated and saved the Mobile PRD.
- [ ] I have ruthlessly cut at least one feature that isn't strictly necessary for v1.0.
`,
  'mobileuserflows': `
# Mobile User Flows

🕒 **Estimated Time:** 2-3 hours

---

## Why Mobile User Flows Matter
Mobile users are easily distracted. If a flow requires too many taps, or if the "Next" button is hidden under the keyboard, they will abandon the app. User flows map the exact step-by-step journey a user takes to accomplish a task, ensuring the logical progression makes sense before you draw a single screen.

---

## Strategic Guidance

### Hackathon Mode
Don't map every flow. Map the "Happy Path" for your core demo feature. If your app is a photo-sharing tool, map exactly what happens from "Open App" -> "Take Photo" -> "Share". Ignore edge cases, error states, and forgotten passwords for now.

### Personal Project Mode
Mapping user flows is a fantastic exercise in logical thinking. Use a free tool like FigJam or just pen and paper to draw out the screens. Focus on understanding how data moves from one screen to the next. What information needs to be passed forward?

### Production SaaS Mode
You must map both the "Happy Path" and the critical "Unhappy Paths". What happens if the user denies camera permissions? What happens if the network drops during checkout? Your user flows must account for these friction points to prevent catastrophic drops in conversion rates.

### Custom Mode
Enterprise applications require highly complex permission-based user flows. Map out Role-Based Access Control (RBAC) flows. How does the experience differ for an Admin versus a Standard User? How do Single Sign-On (SSO) redirects handle returning to deep-linked screens?

---

## Core Flows to Define
Identify the three most critical journeys in your app.

**What is the onboarding flow? (e.g., Splash -> Phone Auth -> Profile Setup)**
\`\`\`input
Write Here...
\`\`\`

**What is the core engagement flow?**
\`\`\`input
Write Here...
\`\`\`

---

## AI Execution
Use this prompt to have the AI analyze and optimize your user flows for mobile patterns.

\`\`\`prompt
Act as a Principal Mobile UX Architect. I have defined the following core user flows for my app:
Onboarding: [Paste Onboarding Flow]
Engagement: [Paste Engagement Flow]

Please analyze these flows specifically for mobile friction points. 
1. Where are users most likely to drop off?
2. How can we reduce the number of taps by utilizing native mobile paradigms (e.g., biometric auth, bottom sheets instead of new screens)?
3. What critical error states are missing from these paths?
\`\`\`

## Validation
- [ ] The onboarding flow has been mapped.
- [ ] The core engagement flow has been mapped.
- [ ] The flows have been optimized to reduce unnecessary taps.
`,
  'appnavigation': `
# App Navigation Architecture

🕒 **Estimated Time:** 1-2 hours

---

## Why Navigation is Critical
Navigation is the skeleton of your mobile app. Unlike the web, where users can rely on the browser's "Back" button or a massive header menu, mobile apps require highly structured, predictable navigation patterns (like Bottom Tabs, Stacks, or Drawers) to keep the user oriented.

---

## Strategic Guidance

### Hackathon Mode
Stick to the absolute default navigation paradigm provided by your framework (e.g., a simple Bottom Tab Navigator in React Native/Expo). Do not attempt to build custom animated drawer menus or complex nested routers. Keep it flat, simple, and functional.

### Personal Project Mode
Use this opportunity to learn how mobile routing actually works under the hood. Implement a Stack Navigator nested inside a Bottom Tab Navigator. Understand the lifecycle of a mobile screen—what happens when a screen is pushed onto the stack versus popped off?

### Production SaaS Mode
Your navigation hierarchy must be intuitive and follow platform conventions (iOS vs Android). Crucially, you must plan for Deep Linking. How does a user open a push notification or an email link and navigate directly to a deeply nested screen (like a specific invoice)? Your navigation state must be robust enough to handle these external entry points.

### Custom Mode
Enterprise apps often require dynamic navigation based on user roles or feature flags. The navigation architecture must be completely decoupled and data-driven. Furthermore, you must implement strict route guards to ensure unauthenticated or unauthorized users cannot deep-link into sensitive screens.

---

## Choosing Your Primary Navigation
Select the primary way users will move through your app.

**Primary Navigation Pattern:**
\`\`\`input
(E.g., Bottom Tabs, Hamburger Drawer, Top Tabs, Single Screen Stack)
Write Here...
\`\`\`

**List the 3-5 core screens that will be in your primary navigation:**
\`\`\`input
1.
2.
3.
\`\`\`

---

## AI Execution
Use this prompt to generate the technical navigation structure for your app.

\`\`\`prompt
Act as a Senior Mobile Developer. My app will use [Paste Navigation Pattern] for its primary navigation, containing these core screens: [Paste Core Screens].

Please outline the ideal nested navigation architecture. 
1. Which screens should belong to the root Stack Navigator vs the Tab Navigator?
2. Where should Modals (like "Add New Item") live in the hierarchy?
3. What is the recommended strategy for handling deep links for this specific structure?
\`\`\`

## Validation
- [ ] A primary navigation pattern has been selected.
- [ ] The core root screens have been defined.
- [ ] Deep linking entry points have been considered.
`,
  'mobilewireframes': `
# Mobile Wireframes

🕒 **Estimated Time:** 2-4 hours

---

## Why Wireframes Matter
Before committing to high-fidelity colors, typography, and precise padding, you must validate the structural hierarchy of your app. Wireframing is the process of sketching out the skeleton of your application to ensure the user flow actually fits on a mobile screen. 

---

## Strategic Guidance

### Hackathon Mode
Skip digital wireframing entirely. Use a pen and paper. Sketch out the 3 most important screens. Take a photo of them with your phone and use that as your reference. Do not waste precious hours wrestling with Figma when you could be writing code.

### Personal Project Mode
Use a free tool like Figma or Excalidraw. Focus heavily on native mobile patterns. If you are building for iOS, use an iOS UI kit so you don't accidentally design a button that feels like Android. Keep it in greyscale. If you use color in a wireframe, you are doing it wrong.

### Production SaaS Mode
Wireframes at this stage should be interactive. You need to link them together in a prototype (using Figma) to simulate the flow. You must test this prototype on an actual physical device (using the Figma mobile app) to ensure buttons are large enough for thumbs (minimum 44x44 points) and text is legible.

### Custom Mode
Enterprise wireframes must undergo rigorous stakeholder review. You will need to wireframe every single permission state (Admin view vs User view) and edge case. Annotate your wireframes heavily with business logic rules (e.g., "This button is disabled until the user signs the EULA").

---

## The Core Screens
Identify the essential screens you need to wireframe.

**List the 3-5 screens that represent your app's core value proposition:**
\`\`\`input
1.
2.
3.
\`\`\`

---

## AI Execution
Use this prompt to get structural recommendations for your wireframes based on proven mobile UX patterns.

\`\`\`prompt
Act as a Principal Mobile Product Designer. I am wireframing an app with the following core screens: [Paste Core Screens].

For each screen, provide a structural breakdown of the UI hierarchy from top to bottom.
1. What should be in the safe area/header?
2. What is the primary content block?
3. Where should the primary Call to Action (CTA) be positioned for maximum thumb reachability?
4. What native UI components (e.g., Segmented Controls, Bottom Sheets, Floating Action Buttons) should I use?
\`\`\`

## Validation
- [ ] Wireframes have been created (even if just on paper) in strictly greyscale.
- [ ] The primary Call to Action on every screen is easily reachable by a user's thumb holding the device with one hand.
`,
  'mobiledesignsystem': `
# Mobile Design System

🕒 **Estimated Time:** 2-4 hours

---

## Establishing the Visual Foundation
A design system in mobile isn't just about making things look pretty; it's about engineering efficiency. Defining your colors, typography, and spacing tokens upfront means you aren't hardcoding hex values into your components. This makes dark mode support and future rebranding exponentially easier.

---

## Strategic Guidance

### Hackathon Mode
Do not build a custom design system. Pick a highly opinionated UI library like React Native Paper, NativeBase, or Tamagui. Use their default theme. If you must tweak it, only change the primary brand color to match your logo. 

### Personal Project Mode
Create a lightweight foundational theme. Define 3 primary colors, 3 greyscale colors, and a simple typography scale (Heading, Subheading, Body, Caption). Build your own fundamental components (Button, Input, Card) to understand how styling works in your chosen framework (e.g., StyleSheet in React Native vs Modifiers in SwiftUI).

### Production SaaS Mode
Your design system must be robust enough to support Dark Mode from day one. You must use semantic tokens (e.g., \`colors.background.primary\`, \`colors.text.danger\`) instead of absolute values. Ensure your spacing system uses a consistent multiplier (like the 8pt grid system) to maintain visual harmony across varying screen sizes.

### Custom Mode
Enterprise design systems require dedicated governance. Your design system must be documented in a tool like Storybook (for React Native) or zeroheight. It must include strict accessibility guidelines, contrasting ratios for WCAG compliance, and internationalization (i18n) considerations for right-to-left (RTL) languages.

---

## Core Design Decisions

**What is your Primary Brand Color?**
\`\`\`input
(e.g., #FF4B4B)
Write Here...
\`\`\`

**Which typography scale are you using?**
\`\`\`input
(e.g., Inter for UI, Merriweather for long-form reading)
Write Here...
\`\`\`

---

## AI Execution
Use this prompt to generate the code for your foundational design tokens.

\`\`\`prompt
Act as a Senior Mobile Design Engineer. I am building a mobile app. My primary brand color is [Paste Brand Color] and my font family is [Paste Font].

Generate a complete, semantic Design System Token object (in JSON/TypeScript format) that includes:
1. A semantic color palette (Primary, Secondary, Background, Surface, Text, Error, Success) supporting both Light and Dark modes.
2. A typography scale (h1, h2, h3, body, caption) with specific font sizes and line heights optimized for mobile readability.
3. A spacing scale based on the 8pt grid system.
\`\`\`

## Validation
- [ ] A semantic color palette has been defined (not just hardcoded hex values).
- [ ] Dark mode is supported by the color token structure.
- [ ] Spacing relies on a consistent multiplier (e.g., 4, 8, 16, 24).
`,
  'mobilebranding': `
# Mobile Branding & Assets

🕒 **Estimated Time:** 1-2 hours

---

## The First Impression
Your app icon and splash screen are the very first things a user sees. They set the tone for the entire experience. Poorly cropped icons or unstyled splash screens scream "amateur" and dramatically increase immediate uninstall rates.

---

## Strategic Guidance

### Hackathon Mode
Generate an app icon using an AI tool like Midjourney or a free icon generator. Keep it dead simple. For the splash screen, just center your logo on a solid background color that matches your app's primary theme. Don't worry about animated splash screens.

### Personal Project Mode
Take the time to learn how to properly configure your native assets. Generate your App Icon in all required sizes using a tool like IconSet or MakeAppIcon. Ensure your splash screen handles the transition from the native OS loading state to your framework's initialization state smoothly.

### Production SaaS Mode
Your branding must be immaculate. The App Icon must stand out against both light and dark device wallpapers. The splash screen should seamlessly transition into the app's first screen without any jarring flashes of white (the dreaded "white flash"). Consider adding a subtle micro-animation to the splash logo.

### Custom Mode
Enterprise branding often requires strict adherence to corporate brand guidelines. The app icon may need to be dynamic (e.g., changing based on environment: Dev vs Staging vs Prod). Splash screens must account for heavy initial data fetches, requiring sophisticated loading orchestrations.

---

## Asset Generation

**What is the core visual metaphor for your app icon?**
\`\`\`input
Write Here...
\`\`\`

---

## AI Execution
Use this prompt to generate ideas for your app's visual identity.

\`\`\`prompt
Act as a Creative Director specializing in Mobile Apps. My app solves this problem: [Describe App]. 

Please provide 3 distinct, highly professional concepts for the App Icon. For each concept, describe:
1. The central visual element or metaphor.
2. The color palette (background vs foreground).
3. Why this design will stand out on a crowded iOS home screen.
\`\`\`

## Validation
- [ ] An app icon has been generated in all necessary resolutions (1024x1024 master).
- [ ] A splash screen has been configured.
- [ ] The app transitions from the native splash screen to the first view without a white flash.
`,
  'mobileaccessibility': `
# Mobile Accessibility (a11y)

🕒 **Estimated Time:** 1-2 hours

---

## Building for Everyone
Accessibility is not an afterthought; it is a fundamental requirement. Both iOS and Android provide incredibly powerful assistive technologies (like VoiceOver and TalkBack). If your app does not support these native features, you are actively locking out millions of potential users and exposing yourself to compliance risks.

---

## Strategic Guidance

### Hackathon Mode
If you are racing a clock, true accessibility might be out of scope. However, at the bare minimum, ensure your primary text color has a sufficient contrast ratio against its background. Do not use light grey text on a white background.

### Personal Project Mode
Use this project to learn the basics of mobile accessibility. Add \`accessibilityLabel\` (React Native) or \`accessibilityLabel()\` (SwiftUI) to all your icon-only buttons. Test your app with the system font size cranked up to the maximum setting—does your UI completely break, or does it scroll gracefully?

### Production SaaS Mode
You must ensure WCAG 2.1 AA compliance. This means supporting Dynamic Type (text scaling), defining explicit focus orders for screen readers, and ensuring hit areas for buttons are at least 44x44 points. You must manually test your core user flows using VoiceOver (iOS) and TalkBack (Android) with your eyes closed.

### Custom Mode
Enterprise apps face severe legal liability (e.g., ADA lawsuits in the US) if they are inaccessible. Accessibility must be integrated into the CI/CD pipeline using automated auditing tools. Support for reduced motion, high contrast modes, and color blindness filters must be explicitly tested and signed off by QA.

---

## Core Accessibility Checks

**List any highly custom UI components you are building that might confuse a screen reader:**
\`\`\`input
(e.g., Custom swipeable carousels, complex data charts)
Write Here...
\`\`\`

---

## AI Execution
Use this prompt to generate accessibility implementation strategies.

\`\`\`prompt
Act as a Mobile Accessibility Expert. I am building a mobile app that includes these custom components: [Paste Custom Components].

Provide a specific implementation guide to make these components accessible. Include:
1. What ARIA roles or native accessibility traits should be applied?
2. How should the screen reader announce state changes for these components?
3. How can I ensure they remain usable when the user has Dynamic Type (system text size) set to 200%?
\`\`\`

## Validation
- [ ] All icon-only buttons have descriptive accessibility labels.
- [ ] The app has been tested with system text size increased by 150% without breaking layouts.
- [ ] Touch targets are a minimum of 44x44 points (iOS) or 48x48 dp (Android).
`,
  'mobileemptystates': `
# Mobile Empty States

🕒 **Estimated Time:** 1-2 hours

---

## The Opportunity of Nothing
An empty state occurs when a screen has no data to display (e.g., a brand new account, an empty inbox, or a cleared shopping cart). Instead of a blank white screen that makes the user think the app is broken, an empty state is your best opportunity to onboard, educate, and drive engagement.

---

## Strategic Guidance

### Hackathon Mode
Keep it simple. Just put a centered icon and a line of text saying "No data yet." Do not spend time designing custom illustrations or complex onboarding carousels inside your empty states.

### Personal Project Mode
Use empty states to practice your UI layout skills. Center a nice, free illustration (from unDraw or similar), add a clear headline, and most importantly, add a Call to Action (CTA) button that explicitly tells the user how to populate the screen (e.g., "Add your first task").

### Production SaaS Mode
Empty states are critical conversion funnels. If a user lands on the "Analytics" tab and they have no data, the empty state shouldn't just say "No Analytics". It should explain *why* analytics are valuable, and provide a CTA to "Set up Tracking". Empty states must drive the user toward their "Aha!" moment.

### Custom Mode
Enterprise empty states often need to account for permissions. If a user sees an empty state because they lack the necessary Role-Based Access Control (RBAC) permissions to view the data, the empty state must explicitly explain this and provide a workflow to "Request Access" from their administrator.

---

## Identifying Key Empty States

**Which 3 screens in your app are most likely to be empty when a user first signs up?**
\`\`\`input
1.
2.
3.
\`\`\`

---

## AI Execution
Use this prompt to generate UX copy and structural ideas for your empty states.

\`\`\`prompt
Act as a Senior UX Writer. I am designing empty states for these three screens in my mobile app: [Paste Empty Screens].

For each screen, provide:
1. A concise, engaging Headline (e.g., "It's quiet in here...").
2. A short body text explaining what will appear here and why it's useful.
3. The exact text for the primary Call to Action (CTA) button to help them populate the screen.
\`\`\`

## Validation
- [ ] Every primary tab/screen has a designed empty state.
- [ ] Every empty state includes a Call to Action (CTA) button.
`,
  'mobileerrorstates': `
# Mobile Error States

🕒 **Estimated Time:** 1-3 hours

---

## Designing for Failure
In mobile development, network requests will fail. Users will go into tunnels. APIs will timeout. If you do not explicitly design how your app handles these failures, the framework will default to crashing, freezing, or showing an ugly stack trace. Graceful error handling separates amateur apps from professional ones.

---

## Strategic Guidance

### Hackathon Mode
Use generic alert dialogs. If an API call fails, just trigger a default \`Alert.alert("Error", "Something went wrong.")\`. Do not waste time building custom error screens or toast notification systems.

### Personal Project Mode
Implement a global Toast/Snackbar notification system. Learn how to catch promise rejections or API failures globally and display a non-intrusive banner at the top or bottom of the screen. Practice handling the "No Internet Connection" state explicitly.

### Production SaaS Mode
You must implement contextual error states. If a specific component fails to load (like a widget on a dashboard), do not crash the whole screen. Show an inline error state with a "Tap to Retry" button. You must also implement offline-first capabilities or aggressive caching so the app remains partially usable without a connection.

### Custom Mode
Enterprise error handling requires rigorous logging. Every user-facing error must be correlated with a background tracking event sent to a service like Sentry or Datadog. Error states must provide users with tracking IDs so they can easily report the issue to customer support.

---

## Defining Error Handling Strategy

**How will you notify the user of non-blocking errors (e.g., failing to like a post)?**
\`\`\`input
(e.g., Bottom Toast, Top Banner, Subtle Haptic Feedback)
Write Here...
\`\`\`

---

## AI Execution
Use this prompt to generate a comprehensive error handling matrix for your app.

\`\`\`prompt
Act as a Mobile Solutions Architect. I am building a mobile app and need an Error Handling Matrix. 

Please categorize the following failure types and recommend the best UX pattern for handling them (e.g., Full Screen Error, Inline Retry, Global Toast, Silent Failure):
1. Complete Loss of Network Connection.
2. Form Validation Error (e.g., invalid email).
3. Minor Background API Failure (e.g., analytics ping fails).
4. Critical API Failure (e.g., checkout payment fails).
5. App Crash / Fatal Exception.
\`\`\`

## Validation
- [ ] A global "No Internet Connection" state has been designed.
- [ ] Non-blocking errors are handled gracefully (e.g., via Toasts) without interrupting the user.
- [ ] Critical component failures include a "Retry" button.
`,
  'mobileloadingstates': `
# Mobile Loading States

🕒 **Estimated Time:** 1-2 hours

---

## The Perception of Speed
Mobile users hate waiting. However, you can't always make APIs faster. What you *can* do is manipulate the perception of time. A well-designed loading state (like a skeleton loader) makes an app feel significantly faster than a generic spinning circle, even if the actual network request takes the exact same amount of time.

---

## Strategic Guidance

### Hackathon Mode
Use the default \`ActivityIndicator\` or \`CircularProgress\` component provided by your OS or framework. Center it on the screen. Do not spend time building custom skeleton screens or animated Lottie loaders.

### Personal Project Mode
Experiment with Skeleton Loaders. Instead of a spinner, show grey, pulsing boxes where the text and images will eventually appear. This prevents jarring layout shifts when the data finally arrives and makes the app feel highly polished.

### Production SaaS Mode
Loading states must be context-aware. Use Skeleton Loaders for initial page loads. Use inline spinners inside buttons for form submissions (e.g., the "Submit" button turns into a spinner). Never block the entire UI with a full-screen loading overlay unless absolutely necessary (like processing a payment).

### Custom Mode
Enterprise apps dealing with massive datasets must implement optimistic UI updates. When a user likes a post or deletes a row, update the UI instantly *before* the server responds. If the server request ultimately fails, revert the UI and show an error. This creates a zero-latency experience.

---

## Loading State Inventory

**Which screens in your app will require fetching data from the server before rendering?**
\`\`\`input
1.
2.
3.
\`\`\`

---

## AI Execution
Use this prompt to get implementation strategies for your loading states.

\`\`\`prompt
Act as a Mobile Performance Expert. I am building a mobile app that fetches data for these core screens: [Paste Core Screens].

Please provide a loading state strategy that minimizes perceived latency.
1. Where should I use Skeleton Loaders versus traditional spinners?
2. How should I handle pagination loading (e.g., infinite scrolling)?
3. What are the best practices for button loading states during form submissions?
\`\`\`

## Validation
- [ ] Initial data fetches use Skeleton Loaders or non-blocking indicators.
- [ ] Form submission buttons visually indicate a loading state to prevent double-submissions.
- [ ] The app avoids full-screen blocking overlays unless processing payments.
`,
  'mobileplatformstrategy': `# Platform Strategy

**Estimated Time:** 20 minutes

---

## Why this matters
Choosing your mobile platform strategy is the most consequential technical decision you will make for your application. It dictates your hiring strategy, development speed, and ultimately, the boundaries of what your application can technically achieve. If you choose poorly, you may find yourself maintaining two completely separate codebases for iOS and Android, crippling your iteration speed. If you choose well, you can build once and deploy everywhere while maintaining a premium, native feel.

## The Core Approaches
There are three fundamental ways to build a mobile application today:

1. **Native (Swift/Kotlin):** Building directly for the operating system. Maximum performance, full API access, but requires two separate development teams.
2. **Cross-Platform (React Native/Flutter):** Writing code in one language (JavaScript/Dart) that compiles to native UI components. It offers 95% of the performance of native development with half the engineering cost.
3. **Progressive Web App (PWA):** A responsive website wrapped in a mobile shell. Extremely cheap to build, but often feels clunky and lacks native integrations.

## Strategic Guidance

### Hackathon Mode
In a hackathon, your only goal is a functional prototype. You should absolutely choose a cross-platform framework, specifically the one you are most familiar with. React Native with Expo is the golden standard here, allowing you to deploy to your physical device via a QR code in seconds. Do not waste time writing Swift or Kotlin unless the core value proposition of your hackathon project relies on a deeply native API (like ARKit or low-level Bluetooth).

### Personal Project
For personal learning and zero-cost maintenance, cross-platform is still the ideal choice. It allows you to learn a versatile technology (like React) that translates well to web development. If you are specifically building the project to learn iOS or Android native development for career purposes, then choosing Swift or Kotlin is justified. Otherwise, default to Expo and React Native to maximize your output.

### Production SaaS
When building a revenue-generating business, engineering velocity is your competitive advantage. The vast majority of modern startups default to React Native. It allows you to share business logic between your web application and mobile application, and a single developer can push features to both iOS and Android simultaneously. Only pivot to pure Native development if your application is highly graphics-intensive (like a high-fidelity game) or relies on real-time, low-level hardware processing (like advanced video editing).

### Custom Mode
At massive enterprise scale, platform strategy becomes a debate about organizational structure. Giant tech companies often use native development because they have the capital to hire dedicated iOS and Android teams, and they need to squeeze out every millisecond of performance. However, even enterprises like Shopify and Coinbase have fully migrated to React Native. You must evaluate if your organization's hiring pipeline can support finding niche Swift developers versus tapping into the massive global pool of JavaScript and React developers.

## AI Brainstorming Phase
Use this prompt to help evaluate the best platform approach based on your specific feature requirements.

\`\`\`prompt
Act as a Senior Mobile Architect. My application features include [List your most complex features, e.g., real-time location tracking, heavy 3D rendering, basic CRUD operations]. Based on these requirements, recommend whether I should use Native, React Native, or Flutter. Highlight any technical limitations I might hit with your recommendation.
\`\`\`

## The Final Decision
**What platform strategy are you choosing, and why?**
\`\`\`input
Write Here...
\`\`\`
`,
  'mobilefundamentals': `# Mobile Fundamentals

**Estimated Time:** 15 minutes

---

## Why this matters
Building for mobile is fundamentally different from building for the web. Web developers often assume constant connectivity, limitless memory, and a persistent execution state. Mobile devices are inherently constrained. Users walk into subways, batteries die, the operating system aggressively kills background applications, and network latency fluctuates wildly. Understanding these fundamentals separates a brittle, frustrating app from a robust, premium experience.

## The Unique Constraints of Mobile
To build successful mobile architecture, you must design defensively against these core constraints:

1. **The Application Lifecycle:** Your app is never truly "always on." The operating system can background it, suspend it, or outright terminate it without warning to free up memory. You must elegantly save state and resume exactly where the user left off.
2. **Intermittent Connectivity:** Mobile apps are used on elevators, airplanes, and rural roads. A blank white screen during a network drop is unacceptable. You must design offline-first caching strategies.
3. **Hardware Limitations:** Memory leaks that cause a slight slowdown on a desktop browser will cause a hard crash on a five-year-old smartphone.

## Strategic Guidance

### Hackathon Mode
Ignore almost all mobile constraints. Assume the user has a perfect 5G connection and the latest flagship phone. Do not waste time implementing offline caching or complex state restoration. If the app is closed, it is perfectly fine for it to restart from scratch. Focus entirely on the "happy path" and making the core feature visually impressive for the judges.

### Personal Project
This is an excellent opportunity to learn one specific mobile fundamental deeply. Choose one constraint to solve properly—for example, implement robust offline caching for your main data feed, or focus heavily on memory profiling. Do not try to solve every edge case, as it will dramatically inflate the scope of your personal project. 

### Production SaaS
Your users will aggressively uninstall your application if it loses their data when they switch to answer a text message. You must implement rock-solid lifecycle handling. When the app goes into the background, unsaved forms must be persisted to local storage. You must gracefully handle API timeouts and provide cached data fallbacks when the network is unreachable. Error tracking tools like Sentry are mandatory to catch memory-related crashes in the wild.

### Custom Mode
At the enterprise tier, mobile fundamentals dictate architectural rigor. You must profile battery consumption, network bandwidth usage, and CPU utilization. If your application constantly wakes the radio antenna for trivial analytics pings, users will notice the battery drain. Architecture must include structured background task schedulers, sophisticated conflict resolution for offline data sync, and rigorous memory leak detection in the CI/CD pipeline.

## Review and Proceed
- [ ] I understand the core constraints of mobile development and the necessity of lifecycle management.
`,
  'mobiletechstackselection': `# Tech Stack Selection

**Estimated Time:** 20 minutes

---

## Why this matters
Selecting your specific tech stack is about choosing your developer experience and ecosystem. If you chose "Cross-Platform" in your platform strategy, you still have to decide *which* cross-platform stack. For React Native, do you use the bare CLI or Expo? For navigation, do you use React Navigation or Expo Router? Choosing standard, widely-adopted tools means you will find immediate solutions on StackOverflow when you encounter obscure bugs.

## The React Native Standard (Expo)
If you are building with React Native, the industry consensus has overwhelmingly shifted toward **Expo**. In the past, Expo was seen as a prototyping tool with limitations. Today, with the introduction of Custom Dev Clients and Expo Application Services (EAS), it is a fully capable, enterprise-grade framework that removes the nightmare of managing Xcode and Android Studio directly.

## Strategic Guidance

### Hackathon Mode
You must use Expo Go. It allows you to bypass the App Store entirely and test your code on your physical device instantly by scanning a QR code. Use the most standard, out-of-the-box libraries provided by Expo. Avoid any library that requires custom native code linking, as configuring Xcode or Android Studio during a hackathon is a guaranteed way to waste hours of precious time.

### Personal Project
Expo is still the correct choice. It abstracts away the massive complexity of native build tools, allowing you to focus purely on JavaScript and React. It provides incredibly easy-to-use libraries for common device features like the camera, local storage, and haptic feedback. Use React Navigation or Expo Router based on whichever routing paradigm you want to learn.

### Production SaaS
Production apps should utilize Expo with Custom Development Clients. This gives you the incredible developer experience of Expo while allowing you to install any arbitrary native iOS/Android library you need (such as specialized payment SDKs or advanced video players). Expo Application Services (EAS) should be heavily utilized to automate your cloud builds and handle the complex certificate signing required for App Store and Google Play deployment.

### Custom Mode
Enterprise applications must heavily scrutinize dependencies. While Expo is excellent, massive organizations often eject to a bare React Native CLI workflow to maintain absolute, granular control over their native iOS and Android build pipelines. This allows dedicated native engineers to write custom Swift/Kotlin modules seamlessly. Security reviews must be conducted on all third-party npm packages to ensure compliance and prevent supply chain attacks.

## AI Brainstorming Phase
\`\`\`prompt
Act as a Senior Mobile Architect. My application needs to utilize [List hardware features, e.g., Camera, Bluetooth, Push Notifications, In-App Purchases]. Based on these needs, should I use Expo Go, Expo with Custom Dev Clients, or a bare React Native project? Provide the pros and cons.
\`\`\`

## The Final Decision
**Detail your chosen technical stack (Framework, Build Tool, Navigation library).**
\`\`\`input
Write Here...
\`\`\`
`,
  'mobilestatemanagement': `# State Management Architecture

**Estimated Time:** 20 minutes

---

## Why this matters
In a mobile application, the user is constantly navigating between screens, opening modals, and backgrounding the app. If your state management is chaotic, you will experience UI desynchronization—where the profile screen says the user is logged out, but the home screen says they are logged in. Choosing the right state management architecture ensures data flows predictably and prevents catastrophic race conditions in your interface.

## The Modern State Landscape
The days of wrapping your entire application in a massive, boilerplate-heavy Redux store are mostly over. Modern state management is divided into two distinct categories:

1. **Server State (Remote Data):** Data that lives in your database. This should be managed by specialized caching libraries like React Query or SWR, which handle loading states, background fetching, and caching automatically.
2. **Client State (Local UI Data):** Ephemeral data like "is the dark mode toggle checked?" or "which tab is active?" This should be managed by lightweight, atomic libraries like Zustand or Jotai.

## Strategic Guidance

### Hackathon Mode
Do not use Redux. It requires too much setup. Use React's built-in \`useState\` and \`useContext\` for everything. If prop-drilling becomes slightly annoying, that is perfectly fine for a weekend project. If you absolutely need a global store for a complex feature, use Zustand—it requires zero boilerplate and works instantly.

### Personal Project
This is the perfect environment to learn modern standards. Separate your server state from your client state. Use React Query to fetch and cache data from your API. Use Zustand to manage your local UI state. This pattern is currently the industry standard for React and React Native applications, and mastering it will significantly improve your architectural thinking.

### Production SaaS
Predictability and debugging are your primary concerns. You must use robust server-state caching (React Query) to ensure the UI feels instantaneous even on poor mobile networks. For global client state, Zustand is excellent, but you must implement strict conventions. Ensure that your state slices are modularized and that you are not storing deeply nested, complex objects that cause unnecessary re-renders across the entire application tree.

### Custom Mode
Enterprise applications often still rely on Redux Toolkit (RTK). While verbose, RTK provides an incredibly strict, unidirectional data flow that is easy to test and trace. When coordinating dozens of engineers across a massive mobile codebase, the rigid structure of Redux prevents developers from writing unpredictable, spaghetti state updates. You must also implement advanced state persistence strategies to ensure the app boots up exactly as the user left it.

## AI Brainstorming Phase
\`\`\`prompt
Act as a Senior Frontend Architect. I am building a mobile app that handles [Describe your data, e.g., high-frequency real-time stock prices, deeply nested e-commerce carts, simple social media feeds]. Recommend a state management architecture utilizing React Query for server state and a local state library. Explain how I should split my data between them.
\`\`\`

## The Final Decision
**What library will manage your Server State, and what library will manage your Client State?**
\`\`\`input
Write Here...
\`\`\`
`,
  'mobileapistrategy': `# API Strategy

**Estimated Time:** 20 minutes

---

## Why this matters
Mobile networks are hostile environments. Connections drop, bandwidth fluctuates, and latency spikes unpredictably. Your API strategy determines how your mobile application communicates with your backend under these adverse conditions. A poorly designed API strategy will result in endless loading spinners, massive data consumption, and frustrated users abandoning your app.

## The Core Paradigms
1. **REST:** The traditional approach. Reliable and standard, but often suffers from "over-fetching" (downloading too much data) or "under-fetching" (requiring multiple round-trip requests to load a single screen).
2. **GraphQL:** Allows the mobile client to request exactly the data it needs and nothing more. This is incredibly powerful for mobile apps where bandwidth is constrained, but adds complexity to the backend.
3. **tRPC:** If your backend and mobile app are both written in TypeScript, tRPC allows you to share types seamlessly. You get massive productivity boosts and end-to-end type safety without generating GraphQL schemas.

## Strategic Guidance

### Hackathon Mode
Use whatever you already know best, or whatever is easiest to set up. If you are using Firebase or Supabase, simply use their provided client SDKs to query the database directly from the mobile app. Do not waste time building a custom intermediate API layer unless it is strictly necessary to hide a secret API key.

### Personal Project
If you are using a modern Backend-as-a-Service (like Supabase), stick to their client SDKs. If you are building a custom backend (like a Node/Express server), a standard REST API is the best learning path. If you want to experiment with bleeding-edge developer experience, setting up a tRPC router between a Node backend and a React Native frontend is highly educational.

### Production SaaS
Bandwidth optimization and perceived performance are critical. If your application requires aggregating data from many different database tables to render the home screen, strongly consider GraphQL to minimize network round-trips. Regardless of the paradigm, you must implement aggressive API caching on the mobile client. Data should be served immediately from the local cache while a background request silently validates the data against the server.

### Custom Mode
Enterprise APIs require strict versioning. When you deploy a web app, you force all users to the new version instantly. When you deploy a mobile app, users may refuse to update the app for months. Your backend API must be able to gracefully support version 1.0 of the mobile app while simultaneously supporting version 2.5. You must also implement robust rate limiting, payload compression, and strict payload validation to ensure security and stability.

## AI Brainstorming Phase
\`\`\`prompt
Act as a Senior Backend Architect. I am building a mobile application. The frontend is React Native, and the backend will be [Insert Backend, e.g., Node.js, Python Django, Supabase]. Based on this stack and the need for efficient mobile data transfer, should I use REST, GraphQL, tRPC, or direct SDK calls? Provide a brief architectural justification.
\`\`\`

## The Final Decision
**What API paradigm will you use to communicate between your mobile app and backend?**
\`\`\`input
Write Here...
\`\`\`
`,
  'mobilelocalstorage': `# Local Storage Strategy

**Estimated Time:** 15 minutes

---

## Why this matters
Unlike web browsers, which have a standardized \`localStorage\` API, mobile devices offer a fragmented landscape of storage solutions ranging from unencrypted key-value stores to fully encrypted SQLite databases. If you store user session tokens in the wrong type of storage, they can be extracted by malicious actors. If you store massive JSON arrays in synchronous storage, you will freeze the UI thread and crash the app.

## The Storage Hierarchy
You must match your data type to the correct storage mechanism:

1. **Secure Storage (Keychain/Keystore):** Heavily encrypted, hardware-backed storage. Use this EXCLUSIVELY for authentication tokens, API keys, and sensitive PII. It is slow and has tight size limits.
2. **Key-Value Storage (AsyncStorage/MMKV):** Fast, unencrypted storage for simple user preferences (like "dark mode = true") or small JSON blobs. MMKV is the modern standard, offering synchronous C++ performance.
3. **Local Database (SQLite/WatermelonDB):** Structured, relational storage for massive offline datasets (like thousands of chat messages or an entire product catalog).

## Strategic Guidance

### Hackathon Mode
Do not overthink this. If you are using React Native, use \`AsyncStorage\` for everything that isn't highly sensitive. It is the easiest to implement and perfectly fine for prototyping. If you need to store a simple login token for the demo, throwing it in \`AsyncStorage\` is a perfectly acceptable shortcut to save 30 minutes of configuring native Keystore bindings.

### Personal Project
Practice proper security hygiene. Use Expo SecureStore (or React Native Keychain) for any authentication tokens. For general user preferences or small cached payloads, try implementing \`react-native-mmkv\` to experience modern, synchronous, high-performance storage. Do not implement a local SQLite database unless offline-first architecture is the primary learning objective of your project.

### Production SaaS
Security and performance are non-negotiable. All authentication artifacts must be stored in the device's secure enclave (Keychain/Keystore). For general app state and caching, \`MMKV\` is mandatory, as legacy \`AsyncStorage\` is too slow for production rendering cycles and can cause noticeable UI stuttering. If your app requires heavy offline capabilities (like a field-worker app), you must implement a robust local database like WatermelonDB to handle the complex relational queries on the client side.

### Custom Mode
Enterprise applications face extreme security audits. You must implement jailbreak/root detection, and if the device is compromised, you must immediately wipe all local storage. Even non-sensitive data in MMKV should often be encrypted using an encryption key that is securely fetched from the backend upon login. Data retention policies must be strictly enforced, automatically purging cached data after a defined TTL (Time To Live) to comply with GDPR/CCPA.

## AI Brainstorming Phase
\`\`\`prompt
Act as a Senior Mobile Security Engineer. My app needs to store [List data types: e.g., JWT Auth tokens, a 5000-item product catalog, user dark mode preference, temporary image caching]. Recommend the specific React Native libraries and storage mechanisms I should use for each data type.
\`\`\`

## The Final Decision
**Detail your storage strategy (e.g., SecureStore for Auth, MMKV for preferences).**
\`\`\`input
Write Here...
\`\`\`
`,
  'mobileauthentication': `# Authentication Strategy

**Estimated Time:** 20 minutes

---

## Why this matters
Authentication on mobile is fundamentally different from the web. Mobile users expect to log in exactly once when they download the app and never see a login screen again until they explicitly log out. They also expect seamless native integrations, such as "Sign in with Apple" (which is mandatory if you offer social logins on iOS) or biometric authentication (FaceID/TouchID).

## The Core Paradigms
1. **Session-based (Cookies):** Very common on the web, but highly problematic on mobile. Mobile operating systems often do not persist cookies reliably across background states.
2. **Token-based (JWT):** The absolute standard for mobile. The backend issues an Access Token and a Refresh Token. The mobile app stores the Refresh Token securely and uses it to constantly fetch new Access Tokens in the background.
3. **Backend-as-a-Service (BaaS):** Tools like Supabase, Firebase, or Clerk handle the entire nightmare of OAuth, token refreshing, and secure storage for you.

## Strategic Guidance

### Hackathon Mode
Do not build your own authentication system. Use Supabase Auth or Firebase Auth. They provide out-of-the-box SDKs that handle session persistence instantly. If you want to move even faster, skip social logins entirely and just use simple Email/Password or Magic Links. Configuring Apple/Google OAuth callbacks correctly in native code will drain hours of your hackathon time.

### Personal Project
Using a BaaS like Supabase is still the best route, as it teaches you the modern standard of JWT-based authentication. If you want to challenge yourself, implement "Sign in with Google" or "Sign in with Apple" using Expo's native auth modules. This is a highly valuable skill that every mobile developer must eventually learn.

### Production SaaS
You must implement a flawless JWT Refresh Token rotation strategy. If your access token expires while the user is offline, the app must elegantly queue their actions, silently refresh the token when connectivity returns, and execute the queued actions without forcing a redirect to the login screen. Furthermore, Apple strictly mandates that if you offer *any* social login (like Google or Facebook), you **must** also offer "Sign in with Apple", or your app will be rejected during App Store review.

### Custom Mode
Enterprise authentication often requires integration with legacy identity providers (Okta, Auth0, Active Directory) via SAML or OIDC protocols. You must implement robust biometric session locks (requiring FaceID to open the app if it has been backgrounded for more than 5 minutes, like a banking app). Device fingerprinting and strict token revocation endpoints must be implemented to instantly cut off access if a device is reported stolen.

## AI Brainstorming Phase
\`\`\`prompt
Act as a Senior Security Architect. I am building a mobile app that uses [Insert Backend, e.g., Supabase, Custom Node.js]. I need to support [Email/Password, Google OAuth, Apple OAuth]. Provide a step-by-step architecture for securely managing the session lifecycle, including token storage and refresh logic.
\`\`\`

## The Final Decision
**What Authentication provider and strategy are you using?**
\`\`\`input
Write Here...
\`\`\`
`,
  'mobiledatabase': `# Database Architecture

**Estimated Time:** 20 minutes

---

## Why this matters
Your mobile app's database architecture defines the boundary between the client and the server. In a traditional web app, the database lives strictly on the server. In a modern mobile app, the line is blurred. Users expect immediate UI updates regardless of network speed, which often requires maintaining a robust "local replica" of your remote database directly on the device.

## The Architectural Patterns
1. **Thin Client (Server-Heavy):** The mobile app holds no state. Every action triggers an API call to the remote database. Easy to build, but suffers from loading spinners and zero offline capability.
2. **Thick Client (Offline-First):** The mobile app uses a powerful local database (like SQLite or WatermelonDB). Changes are written locally immediately, and a background sync engine handles pushing updates to the remote Postgres/Mongo database.
3. **Real-time Sync (BaaS):** Tools like Supabase or Firebase abstract this entirely, opening a persistent WebSocket connection that instantly streams database changes to the mobile client.

## Strategic Guidance

### Hackathon Mode
Go with a Thin Client or rely entirely on a BaaS like Supabase or Firebase. Let the BaaS handle the real-time syncing via their SDK. Do not attempt to build a custom offline-first synchronization engine in a weekend. Your database schema should be flat, simple, and optimized for whatever looks best in the demo.

### Personal Project
Using Supabase (PostgreSQL) is the ideal learning path. It gives you the power of a relational database with the ease of a BaaS. Practice writing secure Row Level Security (RLS) policies, as this is the industry standard for direct client-to-database architectures. If you want a specific challenge, try implementing WatermelonDB to learn how local SQLite databases function.

### Production SaaS
Production apps usually require a hybrid approach. For critical, rapidly changing data (like a user's bank balance), use a Thin Client approach with aggressive API caching. For large datasets that the user expects to browse smoothly (like a massive list of tasks or contacts), implement an offline-first Thick Client using WatermelonDB. This ensures the app feels instantaneous and 120Hz smooth, while background web workers handle the complex conflict resolution with the remote Postgres database.

### Custom Mode
At enterprise scale, database architecture is dominated by data sovereignty, multi-region replication, and compliance (HIPAA/SOC2). You cannot simply open a direct connection from a mobile client to a database. All database access must be brokered through a highly secure, audited API gateway. Local mobile databases must utilize hardware-level encryption (e.g., SQLCipher) to ensure that if the device is physically compromised, the cached database file remains impenetrable.

## AI Brainstorming Phase
\`\`\`prompt
Act as a Senior Database Administrator. I am building a mobile application where users will [Describe core actions: e.g., read heavy feeds, write complex forms offline, real-time chat]. Recommend the optimal architecture between the local mobile state and the remote database. Include recommendations for specific technologies.
\`\`\`

## The Final Decision
**Detail your Database architecture (e.g., Supabase Postgres with React Query caching).**
\`\`\`input
Write Here...
\`\`\`
`,
  'mobilebackend': `# Backend Architecture

**Estimated Time:** 20 minutes

---

## Why this matters
A mobile app is essentially a highly polished shell; the backend is the engine. However, unlike a web frontend which is served fresh on every page load, a mobile frontend is compiled into a static binary. If your backend makes a breaking API change, it will instantly crash every mobile app installed on users' phones worldwide who haven't updated. Your backend architecture must be designed with extreme backward compatibility and resilience.

## The Architectural Options
1. **Backend-as-a-Service (BaaS):** Platforms like Supabase or Firebase. They automatically generate your APIs based on your database schema. Incredible speed, but requires buying into their ecosystem.
2. **Serverless Functions:** Small, isolated pieces of backend logic hosted on platforms like Vercel or AWS Lambda. Excellent for handling specific tasks (like processing a payment or sending an email) without managing a full server.
3. **Custom Monolith/Microservices:** A dedicated server written in Node, Python, or Go. Required for extremely complex, custom business logic, but carries a massive DevOps burden.

## Strategic Guidance

### Hackathon Mode
BaaS is the only correct answer. Use Supabase. It provides your database, authentication, file storage, and automatically generates the APIs to interact with them. If you need custom logic (like hitting a third-party AI API), use Supabase Edge Functions. Building and deploying a custom Node/Express server during a hackathon is a massive waste of time that should be spent polishing the mobile UI.

### Personal Project
Supabase remains the gold standard for personal projects due to its generous free tier and PostgreSQL foundation. It allows you to focus on learning mobile development rather than fighting with AWS IAM roles or Docker containers. If your goal is explicitly to learn backend engineering, building a simple Node.js REST API hosted on Render or Fly.io is a great educational exercise.

### Production SaaS
A hybrid approach is often best. Use Supabase for the heavy lifting (Auth, Database, Storage) to maintain engineering velocity. However, critical business logic (like processing Stripe payments, heavy data aggregation, or complex push notification routing) should be isolated into Serverless Edge Functions or a small, custom microservice. This ensures that your core business rules are safely hidden on the server, not exposed in the mobile client code.

### Custom Mode
Enterprise backends are heavily decoupled. They utilize API Gateways, load balancers, and containerized microservices (Kubernetes). The most critical constraint for enterprise mobile backends is strict API versioning. The backend must indefinitely support legacy API routes to service users on 3-year-old versions of the mobile app. All endpoints must have rigorous rate limiting, DDoS protection, and extensive logging for audit compliance.

## AI Brainstorming Phase
\`\`\`prompt
Act as a Senior Cloud Architect. My mobile app requires [List heavy backend tasks: e.g., processing video uploads, running machine learning models, syncing real-time data, processing secure payments]. Should I use a BaaS (Supabase), Serverless Functions, or a Custom Monolithic Backend? Provide a detailed justification.
\`\`\`

## The Final Decision
**What is your chosen Backend Architecture?**
\`\`\`input
Write Here...
\`\`\`
`,
  'mobilepushnotifications': `# Push Notification Strategy

**Estimated Time:** 15 minutes

---

## Why this matters
Push notifications are the lifeblood of mobile engagement. They are the only direct mechanism you have to pull a user back into your application once they have closed it. However, they are also the fastest way to get your app uninstalled. If you spam users, or if your notifications are irrelevant, they will permanently revoke your notification permissions. Furthermore, configuring the Apple Push Notification service (APNs) and Firebase Cloud Messaging (FCM) is notoriously complex.

## The Notification Pipeline
Sending a push notification requires a complex dance between several services:
1. **The Mobile Client:** Requests permission from the user, generates a unique "Push Token" for that specific device, and sends it to your backend.
2. **Your Backend:** Stores the Push Token securely in the database, linked to the user's profile.
3. **The Delivery Service:** Your backend uses a service like Expo Push or OneSignal to route the message to Apple (APNs) or Google (FCM).
4. **The OS Level:** Apple or Google physically wake up the device and display the notification payload.

## Strategic Guidance

### Hackathon Mode
Do not attempt to implement push notifications unless it is the absolute core mechanic of your app (like an alarm clock or emergency alert app). Configuring APNs certificates and FCM keys will consume hours of debugging. If you must have them, use Expo Push Notifications—it is the easiest possible implementation, but still requires significant setup.

### Personal Project
Implementing push notifications is a rite of passage for mobile developers. Use Expo's Push Notification service. It abstracts away the horrific complexity of talking to Apple and Google directly. You will learn how to request permissions, store device tokens in your backend, and trigger test notifications. Focus on mastering the basic pipeline.

### Production SaaS
You must treat push notifications as a highly sensitive user resource. Your backend must support granular notification preferences (e.g., allowing the user to turn off "Marketing Updates" but keep "Direct Messages" on). You must handle token expiration gracefully (Apple and Google frequently rotate tokens). For complex routing, analytics, and A/B testing of notification copy, deeply integrate a specialized service like OneSignal or Braze rather than building a custom push engine.

### Custom Mode
Enterprise notification systems are incredibly complex distributed systems. You must handle "Silent Pushes" (waking the app in the background to sync data without alerting the user). You must implement rigorous delivery guarantees, handling massive spikes in volume (e.g., sending a breaking news alert to 5 million users simultaneously without crashing your backend). Analytics must track not just delivery, but open rates, time-to-interaction, and downstream conversion funnels.

## AI Brainstorming Phase
\`\`\`prompt
Act as a Mobile Product Manager. My app is a [Describe your app]. Generate 5 high-value push notification triggers that will re-engage users without feeling like spam. For each trigger, specify the exact event in the backend that should fire it.
\`\`\`

## The Final Decision
**What delivery service will you use (e.g., Expo Push, OneSignal), and what is your primary re-engagement trigger?**
\`\`\`input
Write Here...
\`\`\`
`,
  'mobiledeeplinking': `# Deep Linking

**Estimated Time:** 20 minutes

---

## Why this matters
A mobile app without deep linking is a walled garden. If a user receives a text message with a link to a specific product in your app, clicking that link should open the app directly to that product. If it just opens your homepage, or worse, opens a mobile website instead of the installed app, you severely damage user retention. Deep linking bridges the gap between the open web and your compiled binary.

## The Two Types of Links
1. **Standard Deep Links (Custom URL Schemes):** Links like \`myapp://product/123\`. They are easy to set up, but they fail completely if the user doesn't have the app installed (they just show an error).
2. **Universal Links (iOS) / App Links (Android):** Standard HTTPS links like \`https://myapp.com/product/123\`. If the app is installed, the OS intercepts the link and opens the app. If the app is *not* installed, it falls back to the website or the App Store. This is the modern standard.

## Strategic Guidance

### Hackathon Mode
Ignore Universal Links; they require hosting verification files on a live HTTPS domain and configuring Apple/Google developer dashboards. Use standard Custom URL schemes (e.g., \`yourapp://\`). Expo makes this incredibly easy with \`expo-linking\`. It is more than enough to demonstrate navigating to a specific screen from a push notification or an external app during a demo.

### Personal Project
Try implementing Universal Links/App Links using Expo Router. It is a fantastic learning experience that connects web domain verification with native mobile routing. You will learn how to host the \`apple-app-site-association\` (AASA) file on your web domain and configure your app's \`app.json\` to prove ownership of the domain.

### Production SaaS
Universal Links are mandatory. Marketing emails, password reset links, and user-to-user sharing all rely on them. However, you also need "Deferred Deep Linking". If a user clicks a shared link but *doesn't* have the app installed, they are routed to the App Store. After they install and open the app for the first time, the app must "remember" the original link and route them to that specific product. You must use a specialized service like Branch.io or AppsFlyer to handle this complex deferred routing reliably.

### Custom Mode
Enterprise deep linking is deeply intertwined with attribution tracking and marketing analytics. Marketing teams spend millions of dollars on ad campaigns and need precise data on which specific ad click resulted in an app installation and subsequent purchase. Deep linking architecture must heavily integrate with Mobile Measurement Partners (MMPs) to track this attribution securely, ensuring compliance with Apple's App Tracking Transparency (ATT) framework.

## AI Brainstorming Phase
\`\`\`prompt
Act as a Senior Mobile Architect. I am using [Expo Router / React Navigation]. I need to set up Universal Links so that when a user clicks \`https://myapp.com/profile/user123\`, it opens the app to that specific profile. Provide the necessary configuration for the AASA file, the Android assetlinks.json, and the routing configuration in the app.
\`\`\`

## The Final Decision
**Detail your deep linking strategy (e.g., Custom Schemes for MVP, Branch.io for Production).**
\`\`\`input
Write Here...
\`\`\`
`,
  'mobilefilestorage': `# File Storage Strategy

**Estimated Time:** 15 minutes

---

## Why this matters
Handling files on mobile is significantly more complex than on the web. On the web, users select a file from a clean OS dialogue. On mobile, you have to request camera permissions, access the media library, handle massive 4K video files, compress them before uploading so you don't burn the user's data plan, and upload them reliably even if the user backgrounds the app mid-upload.

## The Core Challenges
1. **Permissions:** You must explicitly request user permission to access their photo library or camera. If you do this aggressively upon app launch, users will deny it. You must ask *in context*.
2. **Compression:** A modern iPhone photo is often 5MB+. Uploading 10 uncompressed photos will take forever on a 3G connection and cost you a fortune in AWS S3 bandwidth. Client-side compression is mandatory.
3. **Background Uploads:** If a user starts a video upload and switches to Instagram, the OS will kill your app. You must utilize native background upload tasks to ensure the file finishes uploading.

## Strategic Guidance

### Hackathon Mode
Use Expo ImagePicker to select photos, and immediately upload them to Supabase Storage or Firebase Storage using their client SDKs. Do not worry about advanced background uploading or handling 4K video. If the upload fails because the user closed the app, that is acceptable for a hackathon. Keep the scope strictly to single-image uploads (like a user avatar).

### Personal Project
Implement client-side compression. Before uploading an image to your storage bucket (like AWS S3 or Supabase), use a library like \`expo-image-manipulator\` to compress the image quality to 0.7 and resize it to a maximum width of 1080px. This teaches you the vital skill of respecting the user's bandwidth and your cloud storage costs.

### Production SaaS
Production apps require a robust, resumable upload pipeline. You should upload files directly from the mobile client to the storage bucket using Pre-Signed URLs, completely bypassing your backend server so it doesn't get choked by massive file streams. For large videos, you must use chunked, resumable uploads (like TUS protocol) so that if the network drops at 99%, it can resume rather than starting over.

### Custom Mode
Enterprise file storage often involves strict compliance. Images may contain PII (Personally Identifiable Information) or medical data. You cannot simply dump them into a public S3 bucket. They must be stored in encrypted, private buckets. The mobile app must request temporary, short-lived signed URLs to view the images. Furthermore, you must implement automated backend pipelines to scan uploaded files for malware or inappropriate content before making them available to other users.

## AI Brainstorming Phase
\`\`\`prompt
Act as a Mobile Storage Architect. My app allows users to upload [Images / Videos / PDFs]. Give me a step-by-step implementation plan for selecting the file, compressing it efficiently on the client side, and uploading it securely to [Supabase / S3] using Pre-Signed URLs.
\`\`\`

## The Final Decision
**What storage provider are you using, and what client-side compression library will you utilize?**
\`\`\`input
Write Here...
\`\`\`
`,
  'mobileofflinestrategy': `# Offline Strategy

**Estimated Time:** 20 minutes

---

## Why this matters
Mobile devices are inherently nomadic. Users will open your app in subway tunnels, on airplanes, and in rural areas with spotty 3G. If your app displays a blank white screen or a hard crash when the network request fails, it feels broken. A premium mobile application must degrade gracefully when offline and sync seamlessly when the connection returns.

## The Levels of Offline Support
1. **Graceful Failure:** The app detects there is no network, stops trying to load, and shows a friendly "You are offline" screen.
2. **Read-Only Offline:** The app caches API responses (e.g., using React Query). When offline, the user can still read previously loaded data, but cannot take actions.
3. **Offline-First (Read/Write):** The holy grail. The app uses a local database. The user can create posts, "like" content, and delete items while entirely offline. The app queues these actions and silently syncs them with the server when connectivity is restored.

## Strategic Guidance

### Hackathon Mode
Aim strictly for Level 1 (Graceful Failure). Do not attempt to build a complex offline caching system in a weekend. Simply check the network state using \`expo-network\`. If the user is offline, show a nice UI state. Spend your time building the core features of the app assuming a perfect connection.

### Personal Project
Aim for Level 2 (Read-Only Offline). If you are using React Query or Apollo GraphQL, configuring offline caching is relatively straightforward. Configure the cache to persist to local storage (like MMKV or AsyncStorage) so that when the app boots up without internet, the user immediately sees the stale data from their last session instead of a loading spinner.

### Production SaaS
Level 2 is the minimum acceptable standard, but Level 3 (Offline-First) is the goal for any app where data entry is critical (like a note-taking app, a field inspection app, or a messaging app). To achieve Level 3 safely, you must implement complex Conflict-Free Replicated Data Types (CRDTs) or rely on a robust synchronization engine like WatermelonDB or PowerSync. You must meticulously handle edge cases: what happens if the user deletes a record offline, but another user updated that same record online?

### Custom Mode
Enterprise offline strategies require massive architectural investment. When syncing a local SQLite database with a central Postgres database across thousands of concurrent users, conflict resolution logic must be incredibly precise. Background sync engines must be ruthlessly optimized to avoid draining the user's battery or consuming their monthly data cap by pulling down the entire database. Sync payloads must be compressed and strictly delta-based (only transferring exactly what changed since the last sync).

## AI Brainstorming Phase
\`\`\`prompt
Act as a Senior Mobile Architect. I am building a [Describe your app]. Based on the core user journey, recommend an offline strategy (Graceful Failure, Read-Only Cache, or Offline-First). If you recommend Offline-First, explain how I should handle conflict resolution when the device comes back online.
\`\`\`

## The Final Decision
**Detail your offline strategy and the libraries you will use to achieve it.**
\`\`\`input
Write Here...
\`\`\`
`,
  'mobileanalyticsstrategy': `# Analytics Strategy

**Estimated Time:** 15 minutes

---

## Why this matters
If you don't track it, you can't improve it. Unlike the web, where you can easily deploy a Hotjar script to watch users interact with your site, mobile analytics require deliberate, hard-coded instrumentation. You need to know where users drop off in your onboarding funnel, which features they actually use, and critically, *why* your app is crashing in production.

## The Triad of Mobile Tracking
A robust mobile analytics strategy consists of three distinct pillars:
1. **Crash Reporting (Mandatory):** Capturing fatal crashes and non-fatal exceptions in the wild. You cannot rely on App Store reviews to tell you your app is crashing.
2. **Product Analytics:** Tracking user behavior (e.g., "User clicked Checkout", "User completed Onboarding").
3. **Attribution (Marketing):** Tracking where users came from (e.g., "This install came from our Facebook Ad campaign").

## Strategic Guidance

### Hackathon Mode
Do not implement Product Analytics or Attribution. It is a waste of time for a prototype. However, you *must* implement basic Crash Reporting if you plan to let judges or friends actually use the app on their devices. Expo's built-in error handling is okay for development, but integrating Sentry (which takes 5 minutes) will give you exact stack traces if the app crashes on a friend's phone.

### Personal Project
Implement Crash Reporting (Sentry) and basic Product Analytics. Use a tool like PostHog or Amplitude to track 3 to 5 core events (e.g., \`app_opened\`, \`account_created\`, \`core_feature_used\`). This will teach you the mechanics of instrumenting events and building basic funnels in an analytics dashboard.

### Production SaaS
All three pillars are mandatory. 
- **Crash Reporting:** Sentry or Crashlytics.
- **Product Analytics:** PostHog, Mixpanel, or Amplitude. You must create a strict Tracking Plan document. Do not just log random events like \`button_clicked\`. Log semantic actions like \`subscription_purchased\`.
- **Attribution:** AppsFlyer or Branch.io to measure your Customer Acquisition Cost (CAC) across ad networks.
Crucially, you must respect user privacy. You must prompt for tracking permission (especially on iOS via App Tracking Transparency) before firing these SDKs.

### Custom Mode
Enterprise analytics involve massive data pipelines. Mobile events are not just sent to a dashboard; they are streamed into a central data warehouse (like Snowflake or BigQuery) using tools like Segment. This allows data scientists to cross-reference mobile behavior with web behavior, CRM data, and billing histories. Strict data governance is enforced to ensure no PII (like passwords or social security numbers) is ever accidentally logged to third-party analytics providers.

## AI Brainstorming Phase
\`\`\`prompt
Act as a Head of Product. My app is a [Describe your app]. Generate a Tracking Plan consisting of the 5 most critical events I should track to measure user retention and feature success. Provide the exact JSON payload structure I should send for each event.
\`\`\`

## The Final Decision
**List the specific tools you will use for Crash Reporting, Product Analytics, and Attribution.**
\`\`\`input
Write Here...
\`\`\`
`,
  'mobilecostestimation': `# Cost Estimation

**Estimated Time:** 15 minutes

---

## Why this matters
Building a mobile app MVP is relatively cheap, but scaling it can bankrupt you if you architect it poorly. Mobile apps often have hidden costs that web apps do not. You must forecast your monthly costs for developer accounts, backend hosting, database scaling, third-party APIs, and push notification services before you launch.

## The Hidden Costs of Mobile
- **Developer Accounts:** Apple charges a recurring $99/year fee just to keep your app on the App Store. Google charges a one-time $25 fee.
- **Push Notifications:** While FCM and APNs are free at the base level, routing massive volumes of pushes through services like OneSignal can quickly become expensive as your user base grows.
- **Bandwidth:** Mobile apps often require serving massive amounts of data (images, videos). If you are serving unoptimized 4K images directly from an S3 bucket to thousands of mobile users, your bandwidth bill will explode.

## Strategic Guidance

### Hackathon Mode
Your cost should be exactly $0. Use the free tiers of Expo, Supabase, Vercel, and GitHub. Do not pay for developer accounts; use Expo Go to demo the app on your physical device. If you need a third-party API (like OpenAI), put a strict $5 hard cap on the API key so a bug doesn't drain your bank account overnight.

### Personal Project
You will likely need to spend the $124 for Apple and Google Developer accounts if you want the satisfaction of seeing your app on the real App Stores. Beyond that, keep everything on free tiers. Supabase's free tier is incredibly generous for personal projects. Do not implement complex video hosting or heavy AI generation unless you are prepared to pay for the API usage.

### Production SaaS
You must model your unit economics. If a user pays you $5/month, but they consume $6/month in OpenAI API calls and AWS bandwidth, your business will fail as it scales. You must set up strict billing alerts on all your infrastructure (AWS, Vercel, Supabase). Implement rate limiting on your API routes so a malicious actor cannot spin up a botnet and rack up a massive server bill by spamming your endpoints.

### Custom Mode
Enterprise cost estimation is about FinOps (Financial Operations). You must implement strict tagging on all cloud resources to track exactly which microservice or mobile feature is driving cloud costs. You will negotiate custom Enterprise contracts with vendors (like Mixpanel or Supabase) for volume discounts. Architecture decisions (like moving from REST to GraphQL) are often driven by the need to reduce payload sizes and slash multi-million dollar AWS bandwidth bills.

## AI Brainstorming Phase
\`\`\`prompt
Act as a Cloud FinOps Architect. Review my tech stack ([List your stack: e.g., React Native, Supabase, OpenAI API]) and my app's core features. 
1. Provide a rough Monthly Cost Estimate for running this app with 1,000 Daily Active Users. 
2. Identify the single biggest financial vulnerability in this architecture.
3. Provide step-by-step instructions on what billing alerts or rate limits I MUST set up.
\`\`\`

## The Final Decision
**What is your estimated monthly cost, and what specific billing alerts have you configured?**
\`\`\`input
Write Here...
\`\`\`
`,
  'scalability': `# Scalability

🕒 **Estimated Time:** 3-6 hours

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

🕒 **Estimated Time:** 2-3 days (Verification)

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

🕒 **Estimated Time:** 1-2 weeks (Verification)

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

🕒 **Estimated Time:** 2-4 hours

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

🕒 **Estimated Time:** 4-6 hours

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

🕒 **Estimated Time:** 1-2 hours

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

🕒 **Estimated Time:** 2-3 hours

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

**Estimated Time:** 1-2 hours

---

## Why this matters
A Privacy Policy is a legally mandated document that explains how you collect, use, and protect user data. Failing to have one violates international laws (like GDPR or CCPA) and will get your app rejected from the Apple App Store, Google Play Store, and third-party API providers like Google OAuth.

## Strategic Guidance

### Hackathon Mode
You technically need a privacy policy if you are using Google OAuth or deploying to an App Store, but you have zero time to write one.

Generate a generic privacy policy using a free online generator (e.g., Termly or Firebase's default generator). Host it on a free Notion page or a simple GitHub Pages site. Paste the URL into whatever submission form is blocking you and move on. No one is going to sue you over a hackathon project.

### Personal Project
For a personal project, a basic privacy policy is required if you are collecting emails or using analytics.

Use a free template. Clearly state that this is a portfolio project, but accurately list the third-party services you use (e.g., "We use Supabase for authentication"). This shows attention to detail and professionalism. Ensure the link is visible in your footer.

### Production SaaS
In a production environment, your Privacy Policy is a serious legal document. Misrepresenting how you handle data can lead to massive fines.

You must explicitly list every piece of Personally Identifiable Information (PII) you collect and every third-party subprocessor you use (Stripe, PostHog, OpenAI, AWS). You must define your data retention periods and provide a mechanism for users to request data deletion (Right to be Forgotten). If you are operating in Europe or California, you must comply with GDPR and CCPA strictly. Consider consulting a lawyer or using a premium compliance service like Termly or Iubenda to ensure your policy is watertight.

## Legal Generation Prompt
\`\`\`prompt
Act as a Tech Lawyer. I am building a SaaS application that collects email addresses for authentication, uses Stripe for payments, and OpenAI for generating text. Draft a comprehensive Privacy Policy that complies with GDPR and CCPA. Include a section explicitly detailing how users can request the deletion of their data.
\`\`\`

## Validation Checklist
- [ ] A Privacy Policy is accessible from the main website footer.
- [ ] All third-party data processors are listed.
- [ ] The policy includes instructions for users to request data deletion.
- [ ] The policy complies with local regulations (GDPR/CCPA) if applicable.
`,

  'termsofservice': `# Terms of Service

**Estimated Time:** 1-2 hours

---

## Why this matters
Your Terms of Service (ToS) is the legal contract between you and your users. It protects your business from liability, outlines acceptable use, and gives you the legal right to terminate abusive accounts or refuse refunds.

## Strategic Guidance

### Hackathon Mode
Skip it completely unless a platform specifically requires a URL to allow you to use their API. If forced, generate a boilerplate template online, host it on a free Notion page, and forget about it. Your focus must remain entirely on shipping the product.

### Personal Project
A basic Terms of Service is good practice if you allow user-generated content (UGC). You need a clause that allows you to delete inappropriate content. Use a free template to establish basic ground rules, but do not spend more than 15 minutes on it. 

### Production SaaS
For a production SaaS, the ToS is your primary defense against lawsuits and abusive users. It must be robust.

You must clearly define your refund policy, limitation of liability, and account termination rights. If users generate content, you need a DMCA takedown policy. If you process payments, outline what happens during chargebacks. Force users to explicitly agree to the ToS during signup (a required checkbox, not just a link in the footer). For a serious business, this document should eventually be reviewed by legal counsel.

## Terms Generation Prompt
\`\`\`prompt
Act as a Corporate Lawyer. Draft a Terms of Service for a SaaS application. The application allows users to upload content, charges a monthly subscription via Stripe, and has a strict no-refund policy after 14 days. Include a robust Limitation of Liability clause and a clause granting us the right to terminate accounts for abusive behavior.
\`\`\`

## Validation Checklist
- [ ] Users must explicitly agree to the Terms of Service during account creation.
- [ ] The refund and cancellation policies are clearly defined.
- [ ] Limitation of Liability and account termination clauses are included.
`,

  'betatesting': `# Beta Testing

**Estimated Time:** 3-7 Days

---

## Why this matters
You have lost objectivity. After staring at your app for weeks, you know exactly where to click, but your users will inevitably click the wrong things. Beta testing exposes critical UX flaws, edge-case bugs, and confusing onboarding flows before a public launch ruins your reputation.

## Strategic Guidance

### Hackathon Mode
There is no time for beta testing. The judges are your beta testers. Your "testing" consists of you running through the demo script exactly three times to ensure it doesn't crash. If it works on your machine, ship it.

### Personal Project
For a personal project, beta testing means sending the link to 3-5 friends or posting it in a developer Discord. 

Ask them to try a specific workflow (e.g., "Try creating an account and posting a comment"). Watch them do it live over a screen share if possible. You will immediately see where they get confused. Fix the glaring issues, but do not get bogged down in minor UI tweaks.

### Production SaaS
A production SaaS launch must be preceded by a structured, closed beta. Launching a broken product to a large audience will permanently burn leads.

Invite a small cohort (10-50 users) of your most engaged waitlist subscribers. Use tools like PostHog or FullStory to record their sessions and see exactly where they drop off. Create a dedicated feedback channel (a private Slack/Discord group or an in-app feedback widget). 

Your goal is to validate the "Aha!" moment. If beta testers don't experience the core value quickly, your onboarding is broken. Do not transition to a public launch until the beta cohort is successfully using the product and reporting no critical blockers.

## Beta Tester Outreach Prompt
\`\`\`prompt
Act as a Product Marketer. Write an email to the top 50 users on our waitlist, inviting them to an exclusive closed beta. The tone should be appreciative and emphasize that their feedback will directly shape the product. Include instructions on how to report bugs or provide feedback.
\`\`\`

## Validation Checklist
- [ ] A small cohort of users has successfully completed the core workflow.
- [ ] Session recording tools are active to observe user behavior.
- [ ] A clear channel exists for beta testers to report bugs and feedback.
- [ ] All critical bugs identified during the beta have been resolved.
`,

  'playstoreresearch': `# Play Store Research

**Estimated Time:** 1-2 hours

---

## Why this matters
The Google Play Store is a fundamentally different ecosystem than the Apple App Store. Android users behave differently, expect different UI paradigms (Material Design), and generally have a lower willingness to pay upfront. Researching the Play Store specifically ensures your Android strategy is viable.

## Strategic Guidance

### Hackathon Mode
Ignore this entirely. Unless your hackathon specifically requires an Android deployment, just build for iOS or web first. If you must deploy to Android, just make sure your Expo/React Native build compiles and ignore store optimization.

### Personal Project
If you plan to publish your app to the Play Store, understand that Google requires new personal developer accounts to have 20 opt-in testers test the app for 14 continuous days before it can be published to the public. Factor this massive delay into your launch timeline.

### Production SaaS
Play Store research is critical for App Store Optimization (ASO). 

Google's search algorithm heavily indexes the app's Long Description, whereas Apple does not. You must optimize your long description with target keywords. Look at the top apps in your category on Android: Do they use freemium models? (Android users strongly prefer freemium/ad-supported over paid-upfront). Analyze the screenshots—Android devices have diverse aspect ratios, so ensure your screenshots look good on long, narrow screens. Read the 1-star reviews to find common device-specific bugs (e.g., "Crashes on Samsung S22") that you must test for.

## Android ASO Prompt
\`\`\`prompt
Act as an App Store Optimization (ASO) Expert. I am launching an Android app for [Describe App]. What are the top 5 ranking factors on the Google Play Store? How should I structure my 'Long Description' to maximize keyword indexing without looking like spam?
\`\`\`

## Validation Checklist
- [ ] The top 5 competitors in the Google Play Store have been analyzed.
- [ ] The monetization strategy aligns with Android user expectations (typically freemium).
- [ ] Relevant keywords have been identified for the Play Store Long Description.
`,
};
