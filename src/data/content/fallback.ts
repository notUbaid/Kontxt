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
\`\`\`

## 📚 Context Links
- [Branch.io Deep Linking & Referrals](https://branch.io/)
- [React Native Share API](https://reactnative.dev/docs/share)`,
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
\`\`\`

## 📚 Context Links
- [Expo Store Review](https://docs.expo.dev/versions/latest/sdk/store-review/)
- [App Store Ratings Guide](https://developer.apple.com/app-store/ratings-and-reviews/)`,
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
\`\`\`

## 📚 Context Links
- [Canny (Feature Voting)](https://canny.io/)
- [Delighted (NPS Surveys)](https://delighted.com/)`,
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
\`\`\`

## 📚 Context Links
- [Airship Good Push Guide](https://www.airship.com/resources/guide/the-good-push-index/)
- [OneSignal Notification Strategies](https://onesignal.com/blog/push-notification-best-practices/)`,
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
\`\`\`

## 📚 Context Links
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Launch Checklist](https://developer.android.com/distribute/best-practices/launch/launch-checklist)`,
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
\`\`\`

## 📚 Context Links
- [Managing Beta Testers in TestFlight](https://developer.apple.com/help/app-store-connect/test-a-beta-version/manage-beta-testers-and-builds)
- [Instabug (In-App Bug Reporting)](https://instabug.com/)`,
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
\`\`\`

## 📚 Context Links
- [TestFlight Setup](https://developer.apple.com/testflight/)
- [Google Play Testing Tracks](https://support.google.com/googleplay/android-developer/answer/9845334)`,
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
\`\`\`

## 📚 Context Links
- [Apple App Store Review Guidelines (UGC)](https://developer.apple.com/app-store/review/guidelines/#user-generated-content)
- [IARC Content Ratings](https://www.globalratings.com/)`,
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
\`\`\`

## 📚 Context Links
- [App Store Optimization Basics](https://developer.apple.com/app-store/search/)
- [Google Play SEO Guide](https://play.google.com/console/about/store-listing/)
- [AppTweak ASO Tools](https://www.apptweak.com/)`,
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
\`\`\`

## 📚 Context Links
- [Play Store Feature Graphic Guidelines](https://support.google.com/googleplay/android-developer/answer/9866151#feature_graphic)`,
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
\`\`\`

## 📚 Context Links
- [Expo App Icon Guide](https://docs.expo.dev/guides/app-icons/)
- [Apple HIG - App Icons](https://developer.apple.com/design/human-interface-guidelines/app-icons)
- [Android Adaptive Icons](https://developer.android.com/develop/ui/views/launch/icon_design_adaptive)`,
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
\`\`\`

## 📚 Context Links
- [Apple Developer Program](https://developer.apple.com/programs/)
- [App Store Connect Guide](https://developer.apple.com/app-store-connect/)
- [Expo EAS Submit for iOS](https://docs.expo.dev/submit/ios/)`,
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
\`\`\`

## 📚 Context Links
- [Google Play Console Setup](https://play.google.com/console/about/)
- [Expo EAS Build for Android](https://docs.expo.dev/build/setup/)
- [Play Console Data Safety Form](https://support.google.com/googleplay/android-developer/answer/10787469)`,
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

### Custom Mode
Custom Mode is for enterprise-grade, massive scale applications. 

Before you write code, you must pass rigorous compliance checks (SOC2, HIPAA). You need to define your buying committee, design highly resilient microservices (or modular monoliths), and plan for strict Service Level Agreements (SLAs). Every decision must be vetted.

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

### Custom Mode
Every aspect of this idea must be validated through rigorous enterprise-grade market analysis. 

If the Total Addressable Market (TAM) cannot support a $100M+ valuation, it is not worth your time. You must validate the idea with at least 10 enterprise buyers before writing code. Your idea must eventually become a "platform," not just a "tool."

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

### Custom Mode
In enterprise, the problem statement must be tied directly to a massive financial metric: either it makes the company millions of dollars, or it saves the company millions of dollars.

Furthermore, the problem must be felt by someone with budget authority. If you solve a problem for junior developers, but the CTO doesn't care about it, you will never pass procurement.

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

### Custom Mode
Enterprise pain points usually revolve around compliance, siloed data, and lack of visibility. 

The VP of Sales doesn't care that the UI requires 3 clicks instead of 2. They care that the CRM data isn't syncing with the ERP, causing a 5% loss in revenue attribution. Focus on systemic, organizational pain points.

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

### Custom Mode
Your target users are massive corporations in highly regulated industries (Finance, Healthcare, Government). 

These users have extremely high expectations for security, audit logs, and uptime. You are not selling to a person; you are selling to a procurement department.

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

### Custom Mode
Your ICP is the Fortune 500. 

You must define the exact technographic profile of the company. Do they use Salesforce? Do they use AWS or Azure? You need to know exactly what existing infrastructure they have so you can build enterprise integrations that fit seamlessly into their stack.

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

### Custom Mode
In an enterprise environment, the End User is rarely the person who signs the check. You must map out the entire buying committee. A standard B2B enterprise deal involves at least 4 personas:

1. **The Champion**: The person who loves your product and fights for it internally.
2. **The Economic Buyer**: The VP who controls the budget and signs the contract.
3. **The Security Assessor**: The IT admin who will block the deal entirely if you aren't SOC2 compliant.
4. **The End User**: The employee forced to use your tool every day.

You must design features and marketing materials tailored to *every single one* of these personas.

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

### Custom Mode
The solution must be an extensible platform. 

Enterprises don't buy point solutions; they buy platforms that can replace 3 other tools. Your solution must include robust APIs, webhooks, and single sign-on (SSO) to integrate with their massive IT ecosystems.

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

### Custom Mode
Your value proposition must align with boardroom-level strategic initiatives. 

"Ensure global GDPR compliance and prevent multi-million dollar data breaches." You are selling risk mitigation and massive operational efficiency at a global scale.

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

### Custom Mode
Your pitch must immediately establish authority and scale. "We provide the infrastructure for Fortune 500 companies to securely manage X." Drop names if you have them.

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

### Custom Mode
Enterprise market research is about identifying macroeconomic trends and regulatory shifts. 

Are new data privacy laws passing in Europe that force companies to adopt new compliance tools? Is a legacy competitor being acquired, leaving their customers angry and looking for alternatives? You need a "Why Now?" slide in your pitch deck that proves the market is ripe for disruption *today*.

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

### Custom Mode
Enterprise competitors are entrenched. Ripping out a legacy system takes 6-12 months of change management. 

Your analysis must focus on switching costs. How hard is it for a Fortune 500 company to export their data from Competitor A and import it into your system? Your product must have an automated migration tool built-in on Day 1, or nobody will switch.

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

### Custom Mode
In enterprise software, the "Minimum" part of MVP is much larger. 

You cannot sell a barebones prototype to a bank. Your MVP *must* include Single Sign-On (SAML/SSO), Role-Based Access Control (RBAC), and Audit Logs. Without these features, the security team will not allow the purchase.

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

### Custom Mode
Enterprise business models are driven by Annual Contract Value (ACV). 

You will not have a self-serve checkout page. You will have a "Book a Demo" button. Contracts will be negotiated annually or multi-yearly, starting at $50k+ per year. You must factor in the cost of a dedicated sales team and customer success managers.

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

### Custom Mode
In enterprise, the PRD is a massive legal and technical document. It must include security requirements, SLA definitions, data retention policies, and compliance checklists. Every single stakeholder (Legal, Security, Engineering, Product) must sign off on the PRD before a single line of code is written.

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

### Custom Mode
You must map out complex, multi-role workflows. How does an Employee request a tool, a Manager approve it, and an Admin provision it? You need to document the state machine for every complex interaction, including all edge cases and error handling.

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

### Custom Mode
In enterprise software, IA is heavily dependent on Role-Based Access Control (RBAC). 

An Admin sees a completely different sitemap than a standard Employee. Your IA documentation must map out the navigation tree *per user role*, ensuring that restricted pages are completely hidden from unauthorized users' navigation menus.

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

### Custom Mode
Wireframes must be annotated with specific technical and business logic requirements. 

For example, if a table is wireframed, the annotation must specify if the table requires server-side pagination, sorting, or complex filtering. The wireframe acts as a visual contract for the engineering team.

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

### Custom Mode
Enterprise design systems require rigorous accessibility standards (WCAG 2.1 AA compliance). Your color contrast ratios must be perfect. You must support internationalization (RTL text), high-contrast modes, and extensive keyboard navigation. The design system is a standalone product maintained by a dedicated team.

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

### Custom Mode
Enterprise branding requires a comprehensive Brand Guidelines document. 

This dictates exactly how the logo can be used, the minimum clear space around it, the exact Pantone colors for print vs digital, and the strict tone of voice for all external communications. It ensures that 50 different employees all represent the company identically.

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

### Custom Mode
Accessibility is a strict legal requirement. 

Enterprise and Government contracts explicitly require full WCAG 2.1 AA (and sometimes AAA) compliance. You must build extensive ARIA attributes, support high-contrast modes, provide transcripts for media, and undergo regular third-party accessibility audits. If you fail an audit, you lose the contract.

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

### Custom Mode
Enterprise tech stacks are often dictated by existing infrastructure and compliance. 

If the client is a Microsoft shop, you are building in C#/.NET and deploying to Azure. If they are an AWS shop, you are using Java or Go. Your stack must be perfectly aligned with their internal security protocols and CI/CD pipelines.

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

### Custom Mode
Enterprise frontends are often Micro-Frontends. 

You might have 5 different engineering teams working on 5 different sections of the app simultaneously. The architecture must allow these teams to deploy their specific sections independently without breaking the global application shell.

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

### Custom Mode
Enterprise backends are heavily distributed, highly available microservices. 

You must design for fault tolerance. If the payment microservice goes down, the rest of the application must stay up. You will use Kafka or RabbitMQ for asynchronous event-driven communication between services. Every service will have its own database.

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

### Custom Mode
Your API is a standalone product. 

It must be documented with an OpenAPI (Swagger) specification before a single line of code is written. It must support complex filtering, webhooks, and granular API keys (e.g., an API key that only has read access to a specific table). Breaking changes are strictly forbidden without a 1-year deprecation notice.

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

### Custom Mode
Enterprise authentication is entirely about SAML and SSO. 

Enterprise users do not want to create a new password for your app. They want to log in using their Okta or Microsoft Entra ID. If you do not support SAML/SSO, you cannot sell to the Fortune 500. Period.

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

### Custom Mode
Enterprise requires extremely granular Role-Based Access Control (RBAC). 

You cannot just have "Admin" and "User." You need custom roles where a client can specify that "Role A can view Reports, edit Users, but cannot delete Projects." You must build a UI that allows Enterprise IT admins to configure these custom roles themselves.

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

### Custom Mode
Enterprise schemas must be designed for extreme scale and auditability. 

You might need to physically separate tenant data into different databases or schemas (Database-per-tenant) to satisfy strict data isolation compliance laws. Every single mutation must be logged in an immutable audit trail table.

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

### Custom Mode
Enterprise storage requires compliance and redundancy. 

You must guarantee that data is replicated across multiple geographic regions (Multi-Region S3). You must support Data Loss Prevention (DLP) to ensure employees aren't uploading files containing Social Security Numbers.

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

### Custom Mode
Enterprise software must integrate with massive legacy systems. 

You will need to support Salesforce, Workday, or SAP. These integrations are notoriously difficult and often require custom professional services work. You might need to use an embedded integration platform (like Merge.dev or Paragon) to handle the complexity.

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

### Custom Mode
Enterprises will not allow you to send their proprietary data to OpenAI's public endpoints. 

You must use provisioned, private models (like Azure OpenAI) where data is explicitly NOT used for training. You may need to self-host open-source models (Llama 3) entirely within their Virtual Private Cloud (VPC) to meet strict privacy laws.

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

### Custom Mode
Enterprise architecture diagrams are incredibly complex and follow strict UML or C4 Model standards. 

They must document network boundaries, VPCs, subnets, load balancers, and firewall rules. A security auditor will require this diagram to verify that sensitive databases are not exposed to the public internet.

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

### Custom Mode
Enterprise cost estimation is about Reserved Instances and bulk discounts. 

You will spend hundreds of thousands of dollars on AWS. You need a dedicated FinOps team to negotiate enterprise discounts, purchase compute commitments, and ensure idle resources are aggressively terminated.

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

### Custom Mode
Enterprise Auth requires SSO/SAML integration. 

You must integrate with an enterprise identity provider like Okta or Microsoft Entra ID. Your auth flow must support Just-In-Time (JIT) provisioning so when an employee clicks the app in their Okta dashboard, an account is automatically created for them without requiring a signup form.

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

### Custom Mode
Enterprise databases require strict Row Level Security (RLS) and Audit Logging. 

Every single table must have policies dictating exactly which roles can read, insert, update, or delete rows. You must configure connection pooling (PgBouncer) to ensure the database doesn't crash when 5,000 employees log in at 9:00 AM.

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

### Custom Mode
Enterprise backends must be observable. 

You must implement structured logging (JSON logs), distributed tracing (OpenTelemetry), and health check endpoints. Your APIs must be versioned (\`/api/v1/\`) so you don't break existing enterprise clients when you update the code.

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

### Custom Mode
Enterprise frontends require massive data tables and complex forms. 

You must implement server-side pagination, virtualization for rendering thousands of rows (e.g., TanStack Virtual), and highly complex form validation schemas. You must ensure the UI is fully accessible (WCAG 2.1 AA) and supports internationalization (i18n) if the enterprise has global offices.

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

### Custom Mode
Enterprise payments are rarely self-serve via credit card. 

You will need to support custom invoicing (Net-30, Net-60 terms), ACH transfers, and Wire Transfers. You will use Stripe Billing to generate invoices, but the actual payment might happen via a bank transfer 45 days later. Your system must handle "Pending" and "Overdue" account states gracefully.

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

### Custom Mode
Enterprise emails often require strict compliance. 

You must ensure that PII (Personally Identifiable Information) is never transmitted in plain text via email. You must provide a highly granular "Notification Preferences" center so enterprise users can opt-out of specific email categories to comply with strict internal corporate policies.

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

### Custom Mode
Enterprise notifications require strict auditability and delivery guarantees. 

If a critical alert is triggered, you must guarantee delivery via SMS, Email, and PagerDuty. You must implement robust retry logic and Dead Letter Queues (DLQs) in case the notification provider goes down.

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

### Custom Mode
At enterprise scale, Postgres full-text search will buckle. 

You must implement a dedicated search index like Elasticsearch, Algolia, or Meilisearch. Your search results must respect Role-Based Access Control (RBAC)—a user should never see search results for documents they do not have permission to view.

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

### Custom Mode
Enterprises will not allow you to use third-party tracking scripts (like Google Analytics) due to strict privacy laws (GDPR, CCPA). 

You must implement a self-hosted analytics solution, or ensure your vendor is strictly HIPAA/SOC2 compliant and acts only as a Data Processor. You must respect "Do Not Track" headers and provide robust Cookie Consent banners.

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

### Custom Mode
An enterprise admin panel must have strict access controls. 

A Level 1 Support Agent should be able to reset a password, but they should NOT be able to view sensitive user data or grant admin rights. Every action taken in the admin panel must be logged in an immutable audit trail for compliance purposes.

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

### Custom Mode
Enterprises will demand highly specific, custom integrations with their on-premise legacy systems. 

You must expose a robust, rate-limited, and perfectly documented REST or GraphQL API so the enterprise's internal IT team can build the integration themselves. Provide SDKs in Java, Python, and C# to accelerate their work.

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

### Custom Mode
Enterprise code requires rigorous testing. 

You must have high Unit Test coverage, comprehensive Integration Tests, and full E2E coverage. Furthermore, you must run automated Security Scans (SAST/DAST) and Dependency Audits on every PR. If the tests fail, the deployment is blocked.

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

### Custom Mode
Enterprise documentation must be exhaustive. 

You must provide comprehensive API documentation (Swagger/OpenAPI), deployment runbooks, disaster recovery procedures, and security compliance whitepapers. The enterprise IT team will review this documentation before they approve the purchase.

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

🕒 **Estimated Time:** 4-6 hours

---

## Overview
Mobile security is unique because the client (the phone) is in the hands of the attacker. You cannot trust anything coming from the mobile app. A compromised app can be reverse-engineered, its API keys extracted, and its network traffic intercepted. Security must be enforced on the server, not just hidden in the client.

---

## Think First
**Are you storing sensitive data (passwords, JWTs, PII) in plain text on the device?**
\`\`\`input
Type your answer here...
\`\`\`
**Is your API verifying the identity of the user on *every* request?**
\`\`\`input
Type your answer here...
\`\`\`
**Have you restricted your API keys to prevent quota theft?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Token Storage:** Never use AsyncStorage for session tokens. Always use expo-secure-store or the native Keychain/Keystore.
- **Row Level Security (RLS):** If using Supabase or Firebase, your database *must* have RLS policies active. The mobile app connects directly to the database; without RLS, any user can download your entire user table.
- **Certificate Pinning (Advanced):** For highly sensitive apps (banking), use SSL pinning to ensure the app only communicates with your specific server, preventing Man-in-the-Middle (MITM) attacks on public WiFi.

---

## Common Mistakes
- **Hardcoded Secrets:** Putting AWS Secret Keys or Stripe Secret Keys in your React Native .env file. These are bundled into the JavaScript and can be extracted in 5 seconds.
- **Client-Side Validation Only:** Validating an email address format in the app, but failing to validate it on the backend.
- **Over-Permissioning:** Requesting access to the user's Camera when the app only needs to upload screenshots from the gallery.

---

## Examples
- **Secure Architecture:** The mobile app stores the JWT in the Secure Enclave. When calling the backend to DELETE /user/123, the backend ignores the 123 in the URL and instead reads the user_id securely from the JWT.

---

## AI Prompt
\`\`\`prompt
I am preparing my React Native app for production. Generate a comprehensive security checklist covering token storage (SecureStore vs AsyncStorage), API key restrictions (Google Maps, Firebase), and how to prevent reverse engineering of my JavaScript bundle. Explain the concept of Row Level Security (RLS) assuming I am using Supabase.
\`\`\`

---

## Validation Checklist
- [ ] No secret API keys (Stripe Secret, AWS Secret) are present in the frontend codebase.
- [ ] Session tokens are stored using expo-secure-store.
- [ ] Database queries are protected by Row Level Security.
- [ ] Public API keys (Google Maps, Sentry) are restricted by bundle identifier/package name.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** security_audit.md
**Purpose:** Documents that all major attack vectors have been mitigated.
**Contents:** A signed-off checklist confirming token security and key restrictions.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With the app secured against attackers, move on to **Performance Optimization** to ensure it runs smoothly for users.`,
  'performanceoptimization': `# Performance Optimization

🕒 **Estimated Time:** 4-8 hours

---

## Overview
Users will tolerate a web page taking 3 seconds to load, but a mobile app that stutters or hangs feels instantly broken. Performance optimization in React Native revolves around keeping the JavaScript thread clear so the UI thread can maintain a buttery-smooth 60 frames per second (fps).

---

## Think First
**Does your app freeze when scrolling through a long list?**
\`\`\`input
Type your answer here...
\`\`\`
**Are images taking forever to load or consuming massive amounts of memory?**
\`\`\`input
Type your answer here...
\`\`\`
**Does the entire app re-render when a single switch is toggled?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **List Rendering:** Never use ScrollView for long lists. Use FlatList, or better yet, Shopify's @shopify/flash-list. FlashList recycles components natively, completely eliminating scroll stutter on complex feeds.
- **Image Caching:** Do not use the default <Image> component for remote images. Use expo-image. It leverages native caching so images load instantly the second time they are seen.
- **Animation Execution:** Use react-native-reanimated. Standard animations run on the JS thread, meaning if you fetch data, the animation stutters. Reanimated runs entirely on the native UI thread.

---

## Common Mistakes
- **Inline Functions:** Writing onPress={() => doSomething()} inside a list item. This creates a new function reference every time the list scrolls, forcing React to re-render every item continuously.
- **Over-fetching Data:** Downloading a 5MB JSON payload to display a 10-item list. Always paginate API responses.
- **Console.log in Production:** Leaving heavy console.log() statements in the code. In React Native, console logging across the JS bridge significantly degrades performance.

---

## Examples
- **The FlashList Upgrade:** Converting a laggy Instagram-style feed from FlatList to FlashList, instantly moving the frame rate from 25fps back up to 60fps.

---

## AI Prompt
\`\`\`prompt
I am optimizing a React Native app. Generate a code snippet demonstrating how to replace a standard React Native FlatList with Shopify's FlashList. Include an 'estimatedItemSize', an optimized renderItem function using 'React.memo', and explain why 'expo-image' is necessary inside the list items.
\`\`\`

---

## Validation Checklist
- [ ] Long lists use FlashList or highly optimized FlatList components.
- [ ] Remote images use expo-image for aggressive caching.
- [ ] The app maintains 60fps during rapid scrolling and navigation.
- [ ] Console logs are stripped out of the production build.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/components/OptimizedFeed.tsx
**Purpose:** Demonstrates high-performance rendering techniques.
**Contents:** A list component utilizing FlashList and memoization.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
To know if the app fails in the wild, implement **Crash Reporting**.`,
  'monitoring': `# Monitoring

🕒 **Estimated Time:** 3-5 hours

---

## Overview
Crash reporting tells you when the app dies. Monitoring tells you when the app is suffering. If your API suddenly takes 4 seconds to respond instead of 200ms, the app won't crash, but users will leave. Monitoring provides a heartbeat for your entire architecture.

---

## Think First
**How do you know if your backend API goes down at 3 AM?**
\`\`\`input
Type your answer here...
\`\`\`
**Are you tracking the latency of your most critical endpoints (e.g., Checkout)?**
\`\`\`input
Type your answer here...
\`\`\`
**Do you have alerts set up to wake you up if the database CPU hits 100%?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Uptime Monitoring:** Use a simple service like UptimeRobot or BetterStack to ping your critical backend endpoints every minute. If they fail, it texts you immediately.
- **Application Performance Monitoring (APM):** Use tools like Datadog, New Relic, or Sentry Performance to trace requests from the mobile app, through the network, into the database.
- **Real User Monitoring (RUM):** Track how long the app takes to start up (Cold Start Time) and how long critical screens take to render on actual user devices.

---

## Common Mistakes
- **No Alerts:** Setting up beautiful Grafana dashboards but failing to configure Slack/SMS alerts. Dashboards are useless if no one is looking at them.
- **Alert Fatigue:** Setting alerts too aggressively (e.g., alerting every time a single user has a slow connection). Only alert on system-wide degradation.
- **Ignoring Database Metrics:** Focusing entirely on API latency but failing to monitor Supabase/PostgreSQL connection limits or storage space.

---

## Examples
- **The Slow Query:** Sentry Performance shows that POST /checkout usually takes 300ms, but suddenly spiked to 5 seconds. You trace it down to a missing database index on the orders table.

---

## AI Prompt
\`\`\`prompt
I am preparing a mobile app and Node.js backend for production. Generate a Monitoring and Alerting strategy. Recommend free or low-cost tools for Uptime Monitoring (pinging the API), and explain what 3 specific metrics I should set SMS alerts for to ensure I am not caught off-guard by an outage.
\`\`\`

---

## Validation Checklist
- [ ] Critical backend APIs are monitored by an external ping service.
- [ ] Slack or SMS alerts are configured for downtime or severe latency spikes.
- [ ] Database health metrics (CPU, Memory, Connections) are visible.
- [ ] App startup time is tracked via Sentry Performance or equivalent.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** monitoring_plan.md
**Purpose:** Defines how the system is observed in production.
**Contents:** Links to uptime dashboards and the exact thresholds for triggering alerts.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
When an alert fires, you need **Logging** to dig in and find out exactly what happened.`,
  'logging': `# Logging

🕒 **Estimated Time:** 2-4 hours

---

## Overview
When a bug occurs in production that doesn't trigger a hard crash, logs are your only breadcrumbs. Proper logging allows you to reconstruct the exact sequence of events that a user took, both on their device and on your servers.

---

## Think First
**Are your logs easily searchable in a central dashboard?**
\`\`\`input
Type your answer here...
\`\`\`
**Are you accidentally logging Personally Identifiable Information (PII) like passwords or credit card numbers?**
\`\`\`input
Type your answer here...
\`\`\`
**Are you logging too much (wasting money) or too little (flying blind)?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Structured Logging:** Never use console.log("User logged in"). Use structured JSON logging: logger.info({ event: "user_login", userId: 123, status: "success" }). This allows you to filter and query logs in tools like Datadog or AWS CloudWatch.
- **Log Levels:** Use strict levels. ERROR (wakes someone up), WARN (needs investigation tomorrow), INFO (normal business events), DEBUG (only active in development).
- **Backend vs Frontend:** Mobile apps should generally *not* send raw logs to a server (it drains battery and data). Rely on Analytics for user behavior, Crashlytics for errors, and reserve heavy logging for your Backend APIs.

---

## Common Mistakes
- **Logging PII:** The single biggest mistake. Accidentally writing logger.info({ requestBody: req.body }) on a login route, resulting in plaintext user passwords being stored in your logging provider forever.
- **Silent Swallows:** Catching an error and logging it, but failing to alert anyone. try { doSomething() } catch(e) { console.error(e) }.

---

## Examples
- **The Audit Trail:** A user claims their account was deleted maliciously. Because you implemented structured backend logging, you query userId: 456 AND action: "delete_account" and see exactly which IP address initiated the request at what time.

---

## AI Prompt
\`\`\`prompt
I am building a Node.js Edge Function backend for my mobile app. Generate a robust, structured logging utility using Pino. Show how to log an incoming API request, how to redact sensitive fields (like 'password' and 'token'), and how to differentiate between INFO, WARN, and ERROR levels.
\`\`\`

---

## Validation Checklist
- [ ] Backend uses structured JSON logging (e.g., Pino or Winston).
- [ ] PII, passwords, and API keys are strictly redacted from all log outputs.
- [ ] Logs are centralized in a searchable platform (CloudWatch, Datadog, Supabase Logs).
- [ ] Production environments only log INFO level and above (no DEBUG spam).

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** src/utils/logger.ts
**Purpose:** Standardizes how the application records events.
**Contents:** A structured logging wrapper with built-in redaction for sensitive data.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
To protect your freshly monitored APIs from abuse, implement **Rate Limiting**.`,
  'errortracking': `# Error Tracking

**🕒 Estimated Time:** 30 min

---

## Overview
Errors will happen in production. The question is: will you know about them before your users complain, or after? Error Tracking tools like **Sentry** automatically capture every unhandled exception, group duplicates, attach the full stack trace, and alert you on Slack. They are the single most impactful DevOps tool you can add to a SaaS in under 15 minutes.

---

## Think First
Classify your error severity.

**The Critical Errors (What errors would you classify as "drop everything and fix"? e.g., Payment processing failure, Auth system crash, Database connection lost)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Ignorable Errors (What errors are expected and can be safely suppressed? e.g., 404 Not Found for a missing page, cancelled network requests)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Sentry vs. LogRocket vs. BugSnag:** Sentry is the industry standard for error tracking. It's free for small teams, integrates with every framework, and provides source-mapped stack traces. LogRocket adds session replay (watching the user's screen when the error happened), which is extremely powerful but more expensive.
- **Source Maps:** In production, your JavaScript is minified and unreadable. Without uploading Source Maps to Sentry, your stack traces will say \`Error at chunk-abc123.js:1:45678\` — completely useless. With Source Maps, it says \`Error at Dashboard.tsx:42\`.

---

## Common Mistakes
- **Not Filtering Noise:**
  - *Why it happens:* Connecting Sentry and immediately getting 500 alerts for benign errors like \`ResizeObserver loop limit exceeded\`.
  - *Consequence:* You mute Sentry notifications entirely, and when a real critical error happens, nobody sees it.
  - *Prevention:* Configure \`ignoreErrors\` in Sentry's initialization to suppress known, harmless browser errors.
- **Missing User Context:** Sentry captures the error, but doesn't know *who* experienced it. You can't contact the affected user.

---

## Examples
- *Good Implementation:* Sentry is initialized in the app entry point. \`Sentry.setUser({ id: user.id, email: user.email })\` is called after login. Source Maps are uploaded during the CI/CD build step. Alerts are sent to a dedicated #errors Slack channel only for new, unresolved issues.
- *Bad Implementation:* \`try { ... } catch(e) { /* TODO: handle this later */ }\` — swallowing the error entirely so nobody ever knows it happened.

---

## AI Prompt
Use AI to set up comprehensive error tracking.

\`\`\`prompt
My SaaS is built with [INSERT FRAMEWORK, e.g., Next.js].
I want to use [INSERT TOOL, e.g., Sentry] for error tracking.

Act as a Site Reliability Engineer.
1. Write the exact initialization code required to set up this error tracking tool in both the client-side and server-side of my application.
2. Show how to attach user context (userId, email) after login so errors are linked to specific users.
3. Provide the exact CI/CD step (e.g., GitHub Actions) required to upload Source Maps during the build process.
4. List 5 common browser errors I should add to the ignoreErrors configuration to reduce noise.
\`\`\`

---

## Validation Checklist
- [ ] Is Sentry (or equivalent) initialized on both the client and server?
- [ ] Are Source Maps uploaded to Sentry during the build step so stack traces show original file names and line numbers?
- [ ] Is user context (userId, email) attached to error reports after login?
- [ ] Are common noise errors (like ResizeObserver) filtered out?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
**File Name:** \`sentry.config.ts\` and CI/CD source map upload step
**Purpose:** Detect, diagnose, and resolve production errors before users report them.
**Contents:** The Sentry initialization, the user context attachment, and the CI/CD integration.`,
  'ratelimiting': `# Rate Limiting

🕒 **Estimated Time:** 2-3 hours

---

## Overview
If your API is on the internet, someone will try to abuse it. Rate limiting is your shield against brute-force password attacks, malicious scraping, and accidental Denial of Service (DoS) caused by a bug in your own mobile app stuck in an infinite retry loop.

---

## Think First
**What endpoints are the most expensive to run or most vulnerable to attack? (e.g., /login, /send-sms, /checkout).**
\`\`\`input
Type your answer here...
\`\`\`
**How many requests per minute is reasonable for a normal human user?**
\`\`\`input
Type your answer here...
\`\`\`
**What should the mobile app display when the rate limit is hit?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **The Infrastructure:** Implement rate limiting at the Edge (Cloudflare, Vercel Edge, Upstash Redis). Do not let malicious requests reach your main database.
- **Tiered Limits:** Apply different limits to different routes. A user might fetch their feed 50 times a minute, but they should only be allowed to request an SMS OTP 3 times an hour.
- **Client Handling:** When the server returns a 429 Too Many Requests status code, the mobile app must catch it gracefully and show a friendly message ("You're doing that too fast, please wait a minute"), rather than crashing or showing a blank screen.

---

## Common Mistakes
- **IP-Based Limiting on Mobile:** Mobile devices frequently change IP addresses (moving from WiFi to 5G), and many users on a corporate network share the same IP. Rate limit based on user_id or an API token whenever possible, falling back to IP only for unauthenticated routes.
- **Missing Auth Limits:** Failing to strictly rate-limit the /login or /reset-password routes, allowing attackers to brute-force passwords indefinitely.

---

## Examples
- **The Infinite Loop Bug:** You accidentally ship a useEffect missing a dependency array. The app starts calling GET /profile 100 times a second. Because you have Upstash Rate Limiting configured to 60 req/min, your database survives the onslaught.

---

## AI Prompt
\`\`\`prompt
I am using Next.js/Vercel (or Supabase Edge Functions) as the backend for my mobile app. Generate a rate limiting middleware using Upstash Redis. It should limit the '/send-sms' route to 3 requests per hour per IP address, and return a clean 429 JSON response. Also, provide the React Query code for the mobile app to handle this 429 gracefully.
\`\`\`

---

## Validation Checklist
- [ ] Authentication and OTP routes are strictly rate-limited to prevent brute-forcing.
- [ ] Global rate limiting protects the database from runaway client loops.
- [ ] Mobile app intercepts HTTP 429 errors and displays a user-friendly message.
- [ ] Rate limit headers (X-RateLimit-Remaining) are returned to the client.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** supabase/functions/_shared/rateLimiter.ts
**Purpose:** Protects backend infrastructure from abuse and bugs.
**Contents:** Edge middleware utilizing Redis to track and block excessive requests.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With the infrastructure protected, secure your data against catastrophic loss via **Backups**.`,
  'caching': `# Caching

**🕒 Estimated Time:** 30-45 min

---

## Overview
Caching is the art of not doing the same work twice. If 1,000 users visit your landing page in a minute, your server should NOT render that page 1,000 times. It should render it once, cache the result, and serve the cached version 999 times. Proper caching can reduce your server load by 90%, your database costs by 80%, and your page load times from 3 seconds to 50 milliseconds.

---

## Think First
Identify what can be cached.

**The Static Content (What content on your app rarely changes? e.g., Landing page, Blog posts, Pricing page, Public API responses)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Dynamic Content (What content is unique per user and must NEVER be cached publicly? e.g., Dashboard data, user settings, billing info)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **CDN Edge Caching vs. Application Caching:**
  - *CDN (Cloudflare, Vercel Edge):* Caches the HTTP response at edge servers worldwide. The fastest possible caching. Best for static pages and public API responses.
  - *Application (Redis, in-memory):* Caches the result of expensive computations inside your application code. Best for authenticated, personalized data.
- **Cache Invalidation:** The hardest problem in computer science. When you update a blog post, how do you tell Cloudflare's 300 edge servers to stop serving the old version? Use time-based expiration, manual purging, or "stale-while-revalidate" strategies.

---

## Common Mistakes
- **Caching Authenticated Data on the CDN:**
  - *Why it happens:* Setting \`Cache-Control: public, max-age=3600\` on an API endpoint that returns user-specific billing data.
  - *Consequence:* User A's billing page gets cached. User B visits the same URL and sees User A's invoices. Catastrophic privacy breach.
  - *Prevention:* NEVER set \`Cache-Control: public\` on any endpoint that returns personalized data.
- **Never Invalidating the Cache:** Updating a product's price in the database, but the CDN serves the old price for 24 hours.

---

## Examples
- *Good Implementation:* The landing page uses ISR (Incremental Static Regeneration) with a 60-second revalidation window. Static assets are served with \`Cache-Control: public, max-age=31536000, immutable\`. Dashboard API routes use \`Cache-Control: private, no-store\`.
- *Bad Implementation:* Setting \`Cache-Control: no-cache\` on every single response, forcing your server to re-render everything on every request.

---

## AI Prompt
\`\`\`prompt
My SaaS is deployed on [INSERT PLATFORM, e.g., Vercel] and uses [INSERT DB, e.g., Supabase].

Act as a Performance & Caching Expert.
1. Write the exact Cache-Control headers I should set for: Static assets, Public pages, and Authenticated API responses.
2. Explain how to implement ISR or stale-while-revalidate for my landing page.
3. Should I introduce Redis for application-level caching? If yes, write the code for a simple cache wrapper.
4. How do I manually invalidate the cache when I update content?
\`\`\`

---

## Validation Checklist
- [ ] Are static assets (JS, CSS, fonts) served with long-lived, immutable \`Cache-Control\` headers?
- [ ] Are authenticated API responses explicitly set to \`Cache-Control: private, no-store\`?
- [ ] Is the landing page cached at the CDN edge?
- [ ] Do you have a cache invalidation strategy for when content is updated?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
**File Name:** \`cache_strategy.md\`
**Purpose:** Document what is cached, where, and for how long.
**Contents:** A table mapping each route/asset type to its caching strategy and TTL.`,
  'backups': `# Backups

🕒 **Estimated Time:** 1-2 hours

---

## Overview
There are two types of developers: those who have accidentally dropped a production database, and those who will. If a rogue script deletes all your users, or a cloud provider region goes offline, your backup strategy is the only thing standing between a minor inconvenience and the death of your company.

---

## Think First
**If your database is destroyed right now, how much data are you willing to lose? (1 hour? 24 hours?)**
\`\`\`input
Type your answer here...
\`\`\`
**Do you know *how* to restore the backup, or have you just assumed the automated system works?**
\`\`\`input
Type your answer here...
\`\`\`
**Are your backups stored in the same region/provider as your primary database?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Point-in-Time Recovery (PITR):** Modern databases (Supabase, AWS RDS) offer PITR. This is essential. It allows you to restore the database to the exact millisecond before a catastrophic deletion occurred, rather than relying on a 24-hour old snapshot.
- **Geographic Redundancy:** Storing your database in AWS us-east-1, and your backups in AWS us-east-1, is a bad idea. Replicate or copy backups to a different geographic region.
- **Routine Testing:** A backup doesn't exist until you have successfully restored it. You must practice restoring the database to a staging environment to prove the backups are valid.

---

## Common Mistakes
- **Relying Solely on Snapshots:** Daily snapshots mean if the database dies at 11:59 PM, you lose an entire day's worth of user data and transactions. Use continuous archiving (PITR).
- **Forgetting File Storage:** Backing up the PostgreSQL database but forgetting to back up the S3/Supabase Storage buckets containing user profile pictures and uploaded documents.
- **Hardcoding IDs:** Writing code that relies on a specific row having id: 1. When you restore a backup, sequence IDs might shift, breaking your app.

---

## Examples
- **The "Oops" Moment:** An engineer runs DELETE FROM users instead of DELETE FROM users WHERE test = true. Because PITR is enabled, you simply rewind the database 5 minutes and the company is saved.

---

## AI Prompt
\`\`\`prompt
I am launching a production app using Supabase. Generate a disaster recovery checklist. Explain exactly how to enable Point-in-Time Recovery (PITR), how to routinely test a restore operation without impacting the production database, and how to ensure my Supabase Storage buckets are also backed up.
\`\`\`

---

## Validation Checklist
- [ ] Point-in-Time Recovery (PITR) is enabled on the primary database.
- [ ] Daily or weekly snapshots are configured and retained for at least 30 days.
- [ ] Media/File storage buckets are included in the backup strategy.
- [ ] A test restoration has been successfully performed.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** disaster_recovery.md
**Purpose:** A playbook for worst-case scenarios.
**Contents:** Step-by-step instructions on how to restore the database from a backup during an emergency.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With data secured, automate your deployment pipelines using **CI/CD**.`,
  'cicd': `# CI/CD

🕒 **Estimated Time:** 4-8 hours

---

## Overview
Continuous Integration and Continuous Deployment (CI/CD) automates the boring, error-prone tasks of mobile development. Instead of manually building an APK/IPA on your laptop and uploading it to the stores, you push code to GitHub, and the robots take over—running tests, building the app in the cloud, and submitting it to TestFlight or the Play Store.

---

## Think First
**Are you currently wasting hours staring at Xcode while your app builds?**
\`\`\`input
Type your answer here...
\`\`\`
**How do you guarantee that broken code doesn't accidentally get merged into the main branch?**
\`\`\`input
Type your answer here...
\`\`\`
**Do you need to manage different environments (Development, Staging, Production)?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **The Build Platform:** Expo Application Services (EAS) is the undisputed king for React Native CI/CD. It handles the nightmare of iOS certificates and Android Keystores automatically. Do not try to build iOS apps on GitHub Actions manually; use EAS Build.
- **Over-The-Air (OTA) Updates:** Use Expo Updates to push JavaScript changes directly to users' phones instantly, completely bypassing the grueling 2-day App Store review process for minor bug fixes.
- **Pull Request Checks:** Configure GitHub Actions to automatically run Prettier, ESLint, and Jest on every Pull Request. Block merging unless all tests pass.

---

## Common Mistakes
- **Building Locally for Prod:** Building the production release on a developer's laptop. It guarantees that "it works on my machine" bugs will make it to production. Always build in a pristine cloud environment.
- **Losing the Keystore:** For Android, if you lose the .jks Keystore file and its password, you can *never* update your app on the Play Store again. Let EAS manage your credentials securely.

---

## Examples
- **The Automated Pipeline:** You push to main. GitHub Actions runs tests. It triggers EAS Build. EAS provisions a Mac, builds the iOS .ipa, signs it with Apple, and automatically submits it to TestFlight. You do nothing but write code.

---

## AI Prompt
\`\`\`prompt
I am setting up CI/CD for my Expo React Native app. Generate an eas.json configuration file with three profiles: 'development', 'preview', and 'production'. Also, generate a GitHub Actions workflow (.github/workflows/build.yml) that runs type-checking and tests on every PR, and triggers an EAS Build when code is merged to main.
\`\`\`

---

## Validation Checklist
- [ ] Code is formatted and linted automatically via Git Hooks (Husky) or CI.
- [ ] Automated tests run and must pass before code can be merged to main.
- [ ] Production builds are executed on cloud infrastructure (EAS), not local laptops.
- [ ] Over-The-Air (OTA) updates are configured for rapid hotfixes.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** eas.json & .github/workflows/main.yml
**Purpose:** Automates testing and deployment.
**Contents:** Configuration files for Expo Application Services and GitHub Actions.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
Review your backend **Infrastructure** to ensure it's ready for the public.`,
  'infrastructure': `# Infrastructure

🕒 **Estimated Time:** 2-4 hours

---

## Overview
Infrastructure is the invisible plumbing that powers your app. Choosing the right infrastructure determines whether your app can handle going viral, how much it costs to run, and how much time you spend doing DevOps instead of building features.

---

## Think First
**Are you going to manage servers (EC2/DigitalOcean), or use Serverless platforms (Vercel/Supabase)?**
\`\`\`input
Type your answer here...
\`\`\`
**Where are your users geographically located? (Latency matters).**
\`\`\`input
Type your answer here...
\`\`\`
**Do you have separate environments for Staging and Production?**
\`\`\`input
Type your answer here...
\`\`\`
---

## Key Decisions
- **Serverless First:** Unless you have a massive, sustained workload or strict compliance requirements, use Serverless architectures (Supabase Edge Functions, Vercel, AWS Lambda). You pay zero when traffic is zero, and it scales infinitely when you go viral. No Linux patching required.
- **Environment Isolation:** Never use your production database for testing. You MUST have separate Supabase projects for Development (local), Staging (testing with stakeholders), and Production (real users).
- **Infrastructure as Code (IaC):** While not strictly required for an MVP, defining your infrastructure in code (e.g., Supabase Migrations, Terraform) ensures that your Staging environment is an exact replica of Production.

---

## Common Mistakes
- **Single Point of Failure:** Hosting your database, backend, and file storage on a single $5/month DigitalOcean droplet. When that droplet restarts, the entire business goes offline.
- **Cross-Region Latency:** Putting your database in Frankfurt and your Edge Functions in Virginia. The mobile app will feel incredibly slow as data travels across the Atlantic on every API call. Keep compute and databases in the same region.
- **Missing Staging Environment:** Pushing code directly to Production because "it worked on my localhost," only to realize the production database has a different schema.

---

## Examples
- **The Modern Stack:** The React Native app talks to Supabase Edge Functions (deployed globally via Deno). The functions query a PostgreSQL database hosted securely in AWS us-east-1. Media is stored in S3-compatible Supabase Storage.

---

## AI Prompt
\`\`\`prompt
I am launching a mobile app using React Native and Supabase. Generate an infrastructure overview outlining how to structure my environments (Local, Staging, Production). Explain how to use Supabase CLI migrations to ensure schema changes made in Local are safely promoted to Staging and Production without manual clicking in the dashboard.
\`\`\`

---

## Validation Checklist
- [ ] Staging and Production environments are completely isolated (different databases, different API keys).
- [ ] Compute (Backend) and Storage (Database) are located in the same geographic region to minimize latency.
- [ ] Database schemas are managed via code/migrations, not manual UI clicks.
- [ ] Serverless architectures are utilized to minimize DevOps overhead.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** supabase/migrations/
**Purpose:** Defines your infrastructure and schema as version-controlled code.
**Contents:** SQL files representing the exact state of the production database.


\`\`\`input
Paste your deliverable here...
\`\`\`
---

## Next Step
With the backend solid, focus on the mobile client by performing **App Size Optimization**.`,
  'disasterrecovery': `# Disaster Recovery

**🕒 Estimated Time:** 45 min

---

## Overview
Disaster Recovery (DR) is the plan you execute when everything has already gone catastrophically wrong. Your database is corrupted. Your hosting provider has a regional outage. A developer force-pushed to \`main\` and wiped out 2 weeks of work. DR is not about preventing disasters — that's what Backups, Monitoring, and Security are for. DR is about how fast and how completely you can restore normal operations after the worst has already happened.

---

## Think First
Define the worst-case scenarios.

**The Nightmare Scenario (What is the single worst thing that could happen to your application right now? e.g., Complete database deletion, Hosting provider goes offline for 24 hours)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Communication Plan (When your app goes down, how do you notify your paying customers? Do you have a status page? A support email? A Twitter account?)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Active-Passive vs. Active-Active:**
  - *Active-Passive:* You have a primary server. If it dies, you manually switch to a standby server. Simpler, cheaper, slower recovery.
  - *Active-Active:* Traffic is load-balanced across multiple servers simultaneously. If one dies, the others absorb the load automatically. Complex, expensive, instant recovery.
  - *Decision:* For an MVP, Active-Passive (or relying on your managed platform's built-in redundancy) is perfectly sufficient.
- **Runbook vs. Improvisation:** When your database goes down at 2 AM and your heart is racing, you will not think clearly. A **Runbook** is a step-by-step checklist written in advance that tells you exactly what to do, in what order, with the exact commands to run. Never improvise disaster recovery.

---

## Common Mistakes
- **No Written Runbook:**
  - *Why it happens:* "I'll remember what to do." No you won't. Not at 2 AM. Not when your biggest customer is threatening to churn.
  - *Consequence:* You panic, make the situation worse by running the wrong restore command, and turn a 1-hour outage into a 12-hour data loss event.
  - *Prevention:* Write the Runbook now, while you are calm and thinking clearly. Include exact commands, not vague instructions.
- **Single Points of Failure:** Your entire business runs on one Supabase project with no backup database, no redundant hosting, and no way to migrate if Supabase has a multi-hour outage.

---

## Examples
- *Good Implementation:* A documented Runbook stored in the team's Notion that covers 3 scenarios: (1) Database corruption -> Restore from latest PITR backup, (2) Vercel outage -> Deploy to Render using the Docker backup, (3) Compromised API keys -> Rotate all secrets via the emergency rotation script. Each scenario has exact commands and an estimated recovery time.
- *Bad Implementation:* The founder is the only person who knows the database password, which is stored in a Slack DM from 6 months ago.

---

## AI Prompt
\`\`\`prompt
My SaaS runs on [INSERT STACK, e.g., Vercel + Supabase].
My backups are [INSERT BACKUP STRATEGY, e.g., Daily Supabase snapshots + 6-hourly pg_dump to S3].

Act as a Disaster Recovery Specialist.
1. Identify the top 3 disaster scenarios most likely to affect this specific stack.
2. For each scenario, write a step-by-step Runbook with the exact terminal commands required to restore service.
3. For each scenario, estimate the Recovery Time Objective (RTO) and Recovery Point Objective (RPO).
4. Recommend a free status page tool I can use to communicate outages to my users.
\`\`\`

---

## Validation Checklist
- [ ] Do you have a written, step-by-step Runbook for at least 3 disaster scenarios?
- [ ] Does your Runbook include the exact terminal commands (not vague instructions)?
- [ ] Is there a public Status Page where customers can check if your service is down?
- [ ] Does more than one person on your team know how to execute the recovery plan?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
**File Name:** \`disaster_recovery_runbook.md\`
**Purpose:** Survive the worst day of your business.
**Contents:** Step-by-step recovery procedures for database corruption, hosting outages, and security breaches, with exact commands and estimated recovery times.`,
  'scalabilityplanning': `# Scalability Planning

**🕒 Estimated Time:** 30-45 min

---

## Overview
Scalability Planning is the art of building for today while anticipating tomorrow. It is NOT about handling 10 million users on day one. It IS about identifying the 2-3 architectural bottlenecks that will break first as you grow, and having a documented plan for when to address them. The best time to think about scaling is before you need it — but the best time to implement scaling is the moment you actually need it, and not a second earlier.

---

## Think First
Identify where you will break.

**The First Bottleneck (Based on your architecture, what will break first when you go from 100 to 10,000 users? The database? The API? The AI token budget?)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Scale Trigger (At what specific metric will you know it's time to scale? e.g., "Database CPU consistently above 70%", "API P95 latency exceeds 2 seconds")**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Vertical Scaling vs. Horizontal Scaling:**
  - *Vertical (Scale Up):* Give your existing server more RAM and CPU. Simple but has a hard ceiling.
  - *Horizontal (Scale Out):* Add more servers and distribute traffic between them using a load balancer. Complex but theoretically unlimited.
  - *Decision:* Always start with Vertical scaling. It requires zero code changes. Switch to Horizontal only when you physically max out the biggest available server.
- **Database Scaling:** The database is almost always the first bottleneck. Before doing anything complex, try these in order: (1) Add indexes, (2) Optimize slow queries, (3) Add read replicas, (4) Implement connection pooling. Only after exhausting all of these should you consider sharding or switching databases.

---

## Common Mistakes
- **Premature Scaling:**
  - *Why it happens:* Fear of success. "What if we go viral tomorrow?"
  - *Consequence:* You spend $500/month on a Kubernetes cluster, a Redis cache, and 3 read replicas for an app with 12 users. Your runway burns 10x faster.
  - *Prevention:* Scale reactively based on metrics, not proactively based on anxiety. Set up monitoring alerts, and only scale when they fire.
- **Ignoring the Database:** Adding 5 more API servers while the single PostgreSQL instance is at 95% CPU. The API servers just send more traffic to the already-dying database.

---

## Examples
- *Good Implementation:* A documented "Scale Plan" that says: "At 1,000 users, upgrade Supabase to Pro for connection pooling. At 5,000 users, add a read replica. At 10,000 users, implement Redis caching for the dashboard. At 50,000 users, evaluate horizontal API scaling."
- *Bad Implementation:* Deploying a Kubernetes cluster with auto-scaling policies for an app that currently has 3 beta testers.

---

## AI Prompt
\`\`\`prompt
My SaaS architecture is:
- Frontend: [INSERT, e.g., Next.js on Vercel]
- Backend: [INSERT, e.g., Next.js API Routes]
- Database: [INSERT, e.g., Supabase Postgres]

Act as a Principal Systems Architect planning for growth.
1. Based on this architecture, what will be the FIRST component to fail as I scale from 100 to 10,000 users?
2. Create a "Scale Plan" document with specific milestones: What should I do at 1,000 users? 5,000? 10,000? 50,000?
3. For each milestone, estimate the monthly infrastructure cost increase.
4. What are the 3 cheapest optimizations I can make RIGHT NOW that will delay the need for complex scaling the longest?
\`\`\`

---

## Validation Checklist
- [ ] Have you identified the single component most likely to become the bottleneck first?
- [ ] Do you have a written "Scale Plan" with specific user-count milestones and corresponding actions?
- [ ] Are you monitoring the metrics (DB CPU, API latency, memory) that will tell you when it's time to scale?
- [ ] Have you exhausted simple optimizations (indexes, caching, query optimization) before considering complex infrastructure changes?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
**File Name:** \`scale_plan.md\`
**Purpose:** Grow without breaking.
**Contents:** A milestone-based plan mapping user counts to specific infrastructure upgrades, with estimated costs and the metrics that trigger each upgrade.`,
  'launchchecklist': `# Launch Checklist

**🕒 Estimated Time:** 60-120 min

---

## Overview
Launch day is chaotic. If you rely on your memory to switch API keys from "Test" to "Live", you will forget something, and your launch will fail. A Launch Checklist is an uncompromising, step-by-step pre-flight manual. It ensures you don't accidentally leave Stripe in test mode, leave a rogue \`console.log(process.env)\` in the code, or point the production frontend to the staging database.

---

## Think First
Identify the catastrophic failure points.

**The Financial Check (Are your payment gateways 100% in Live mode, pointing to Live products/prices?)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Environmental Check (Are all 15 of your Vercel/Render Environment Variables verified to be production keys, not development keys?)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Soft Launch vs. Hard Launch:**
  - *Soft Launch:* You silently deploy to production and invite 50 people from your waitlist. You monitor the logs for crashes.
  - *Hard Launch:* You post on Product Hunt, Hacker News, and Twitter simultaneously.
  - *Decision:* ALWAYS Soft Launch first. Give it 48 hours to bake in reality before you invite the stampede.
- **Feature Freezes:** 48 hours before launch, you must implement a strict Feature Freeze. No new code is merged. If you try to sneak in "one quick UI tweak" the night before, you will inevitably break something else.

---

## Common Mistakes
- **The Stripe Test Mode Disaster:**
  - *Why it happens:* You built the app using Stripe \`pk_test_...\` keys and forgot to swap them in Vercel.
  - *Consequence:* You launch on Product Hunt. 500 people sign up and "buy" your Pro plan using the fake \`4242\` test credit card. You make zero dollars.
  - *Prevention:* Double, triple, and quadruple check your environment variables.
- **Missing Database Indexes:** Your app worked fine with 10 rows of test data. On launch day, 10,000 rows are added, and because you forgot a database index on the \`user_id\` column, the dashboard takes 15 seconds to load and crashes.

---

## Examples
- *Good Implementation:* A physical checklist on your desk. You verify Vercel ENV vars. You do one final real-money purchase using your own personal credit card on the production URL. You verify the webhook updates the database. You clear the test data. You launch.
- *Bad Implementation:* Pushing a massive refactor to \`main\` at 11:45 PM and immediately posting to Product Hunt at midnight.

---

## AI Prompt
Use AI to build an exhaustive pre-flight checklist.

\`\`\`prompt
My SaaS uses [INSERT STACK, e.g., Next.js, Supabase, Stripe, Resend].

Act as a strict Release Manager.
1. Create an exhaustive, step-by-step Launch Checklist categorized by: Environment Variables, Payments, Database, Performance, and Security.
2. Specifically highlight the most common mistakes developers make with Stripe and Supabase when moving from staging to production.
3. Give me a strategy for doing a "Soft Launch" validation using my own credit card before the public announcement.
\`\`\`

---

## Validation Checklist
- [ ] Are Stripe/Payment ENV vars set to LIVE keys?
- [ ] Have you successfully completed a real-money transaction using your own credit card on the production URL?
- [ ] Are all database tables protected by RLS (Row Level Security)?
- [ ] Did you clear out all the dummy/test data from the production database?
- [ ] Is your error tracking (Sentry) receiving events from the production URL?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
**File Name:** \`LAUNCH_DAY_CHECKLIST.md\`
**Purpose:** Prevent unforced errors on your biggest day.
**Contents:** A rigorous, unskippable list of checks.`,
  'seo': `# SEO (Search Engine Optimization)

**🕒 Estimated Time:** 30-45 min

---

## Overview
SEO is how you acquire customers for free over the long term. While paying for ads works immediately, SEO compounds. For a SaaS, there are two types of SEO: **Technical SEO** (ensuring Google can read your site, your meta tags look good on Twitter, and your sitemaps are submitted) and **Programmatic/Content SEO** (generating hundreds of landing pages targeting specific long-tail keywords your [ICP](#icpidealcustomerprofile) is searching for).

---

## Think First
Define your entry points.

**The Primary Keyword (If someone types exactly this into Google, your app should be the #1 result. e.g., "AI invoice generator for freelancers")**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The "Versus" Pages (Who are your top 3 competitors? People often search "Alternative to X" or "X vs Y")**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Blog vs. Programmatic SEO:** Writing a weekly blog post takes massive effort. Programmatic SEO uses code to generate hundreds of pages based on a template and a database (e.g., "Plumbers in [City]", "Accountants in [City]"). Programmatic SEO is vastly superior for developers building SaaS.
- **Subdomain vs. Subdirectory:** Should your blog live at \`blog.yoursite.com\` or \`yoursite.com/blog\`? **Always use a subdirectory (\`/blog\`).** Google treats subdomains as entirely different websites, meaning your blog's SEO juice won't pass to your main marketing site.

---

## Common Mistakes
- **Ignoring OpenGraph Tags:**
  - *Why it happens:* You focus only on Google Search Console.
  - *Consequence:* When a user shares your link in a Slack channel, iMessage, or Twitter, it shows up as a blank gray square with no title. Nobody clicks it.
  - *Prevention:* Always generate \`og:image\`, \`og:title\`, and \`twitter:card\` meta tags.
- **Single Page Applications (SPAs):** If your entire app is a React SPA (Create React App/Vite) without Server-Side Rendering (SSR), Google's crawlers will struggle to index your dynamic pages. Use Next.js, Remix, or Astro for marketing pages.

---

## Examples
- *Good Implementation:* Your marketing site is built with Next.js App Router. You use the \`generateMetadata\` function to dynamically create titles and OpenGraph images for every single generated page. You submit your \`sitemap.xml\` to Google Search Console on launch day.
- *Bad Implementation:* No \`robots.txt\`, no \`sitemap.xml\`, and the title of your website is just "React App" because you forgot to change the default \`index.html\`.

---

## AI Prompt
Use this prompt to generate your technical SEO configuration.

\`\`\`prompt
My SaaS product is: [INSERT ELEVATOR PITCH].
My primary framework is: [INSERT FRAMEWORK, e.g., Next.js 14].

Act as a Technical SEO Expert.
1. Provide the exact code required to set up dynamic \`robots.txt\` and \`sitemap.xml\` in my framework.
2. Provide the code for a reusable \`<SEO />\` component (or metadata layout) that injects the required Title, Description, \`og:image\`, \`og:url\`, and Twitter Card tags.
3. List 5 programmatic SEO page templates I should generate based on my niche (e.g., "Alternative to X").
\`\`\`

---

## Validation Checklist
- [ ] Have you set up Google Search Console and submitted your \`sitemap.xml\`?
- [ ] Have you verified your OpenGraph tags using a tool like MetaTags.io?
- [ ] Are your marketing pages server-side rendered (SSR) or statically generated (SSG) for fast crawler access?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
**File Name:** \`sitemap.xml\` & Metadata config
**Purpose:** Ensure humans and robots can discover your app.
**Contents:** Code ensuring your link looks beautiful when shared, and structured data for Google.
`,
  'analyticssetup': `# Analytics Setup

**🕒 Estimated Time:** 20-30 min

---

## Overview
Launching without analytics is like driving with your eyes closed. You might get 1,000 visitors on launch day, but if you don't track them, you won't know if they dropped off at the pricing page, the signup form, or immediately after logging in. Proper analytics setup allows you to measure your [KPIs](#kpis) and [North Star Metric](#northstarmetric) mathematically.

---

## Think First
Identify the 3 critical events you must track on Day 1.

**Event 1: The "Aha!" Moment (What action proves the user got value? e.g., "Generated first report")**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Event 2: The Conversion (e.g., "Viewed Pricing Page", "Clicked Upgrade")**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Privacy-Friendly vs. Heavy Analytics:**
  - *Google Analytics (GA4):* Standard, free, but heavily blocks by ad-blockers and requires massive, ugly GDPR cookie banners.
  - *PostHog / Mixpanel:* Product analytics. Better for tracking specific user actions (e.g., "User clicked button X").
  - *Plausible / Fathom:* Privacy-friendly, lightweight, bypasses ad-blockers, no cookie banner required. Great for simple traffic counting.
- **Client-Side vs. Server-Side Tracking:** Client-side tracking (putting a script in your HTML) is easy but blocked by ad-blockers. Server-side tracking (triggering the event from your Node/Python backend) is 100% accurate because the user cannot block it. Track critical events (like "Payment Success") on the server.

---

## Common Mistakes
- **Tracking Everything (Event Bloat):**
  - *Why it happens:* You use auto-capture tools and track every single mouse movement.
  - *Consequence:* Your dashboard is filled with 10,000 useless events. You can't find the signal in the noise.
  - *Prevention:* Explicitly manually track only 3-5 core events (Signup, Upgrade, Core Action).
- **Not Tracking Errors:** Analytics isn't just for marketing. If your frontend crashes, you need an error tracking tool (like Sentry) to log it, or you'll never know your users are experiencing blank white screens.

---

## Examples
- *Good Implementation:* Using Plausible for simple marketing site traffic. Using PostHog to track the specific event: \`posthog.capture('user_generated_invoice', { invoiceValue: 500 })\`. Tracking Stripe webhooks on the server.
- *Bad Implementation:* Installing 5 different tracking pixels (Facebook, Google, TikTok, Hotjar, Mixpanel) causing your app to take 8 seconds to load.

---

## AI Prompt
Use this prompt to generate your analytics tracking plan.

\`\`\`prompt
My SaaS product is: [INSERT ELEVATOR PITCH].
My chosen analytics tool is: [INSERT TOOL, e.g., PostHog or Plausible].

Act as a Head of Data.
1. Define the 5 exact custom events I need to track to monitor my funnel from Visitor -> Free User -> Paid User.
2. For each event, provide the exact JavaScript/TypeScript snippet to trigger it using my chosen tool's SDK.
3. Identify which of these events MUST be tracked server-side to prevent ad-blocker data loss.
\`\`\`

---

## Validation Checklist
- [ ] Do you have a tool installed to track basic marketing site traffic?
- [ ] Are you tracking your "Aha!" moment core action?
- [ ] Are you tracking conversion events (Signup, Upgrade)?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
**File Name:** \`analytics.ts\`
**Purpose:** To mathematically prove if your product is growing or dying.
**Contents:** Wrapper functions for tracking events (e.g., \`trackEvent('signup')\`) that can be called anywhere in your app.
`,
  'legaldocuments': `# Legal Documents & Structure

**🕒 Estimated Time:** 45-60 min

---

## Overview
A SaaS business is a real business. If a user uploads illegal content to your platform, or your software has a bug that costs a B2B client $10,000, you can be sued. The purpose of legal structure is to build a "firewall" between the business's liabilities and your personal assets (your house, your savings).

---

## Think First
Assess your risk profile.

**What is the absolute worst-case scenario if your software fails or is hacked? (e.g., "Users lose their photos", "Users lose their medical data")**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Will you be taking outside investment (Venture Capital)? (Yes/No)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **LLC vs. C-Corp (US Context):**
  - *LLC (Limited Liability Company):* Cheap, easy to run, pass-through taxation. Perfect for bootstrapped founders and solo developers. (Use Stripe Atlas to set this up in a few days).
  - *C-Corp:* Complex, double taxation. Mandatory if you plan to raise Venture Capital and issue stock options to employees.
- **Personal vs. Business Bank Accounts:** The absolute biggest mistake you can make is "Piercing the Corporate Veil." If you buy groceries using your business bank account, or accept Stripe payouts into your personal checking account, a judge can rule that your LLC is fake, and you will be held personally liable in a lawsuit.

---

## Common Mistakes
- **Launching as a Sole Proprietorship:**
  - *Why it happens:* You think your app is just a "side project."
  - *Consequence:* You have zero legal protection. If you get sued, they can take your personal assets.
  - *Prevention:* Incorporate an LLC before accepting a single dollar from a customer.
- **Copying Another Company's Documents:** Copying Apple's Terms of Service for your 2-person SaaS. Apple's TOS is designed for hardware returns and media licenses. It provides zero protection for your specific software use case.

---

## Examples
- *Good Implementation:* You use Stripe Atlas to form a Delaware LLC. You open a Mercury business bank account. You use a platform like Termly.io or a startup lawyer to generate a Terms of Service explicitly stating you offer no warranties for software downtime.
- *Bad Implementation:* Charging users via your personal PayPal account and operating without a Terms of Service.

---

## AI Prompt
Use this prompt to identify your specific legal blind spots.

\`\`\`prompt
My SaaS product is: [INSERT ELEVATOR PITCH].
My users will be uploading/processing this type of data: [INSERT DATA TYPE, e.g., basic text, financial records, PII].

Act as a SaaS Startup Lawyer.
1. What are the 3 biggest legal liabilities specific to my business model?
2. What specific clauses MUST I include in my Terms of Service to protect myself from these liabilities?
3. Do I need any special compliance certifications (e.g., HIPAA, SOC2, GDPR) to operate this legally?
\`\`\`

---

## Validation Checklist
- [ ] Have you incorporated a legal entity (e.g., LLC) to protect your personal assets?
- [ ] Do you have a dedicated Business Bank Account completely separate from your personal finances?
- [ ] Are your Stripe payouts flowing directly into the business bank account?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Identify your incorporation strategy and your banking setup below.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,
  'cookiepolicy': `# Cookie Policy (GDPR / CCPA)

**🕒 Estimated Time:** 15-20 min

---

## Overview
The internet is heavily regulated. If your SaaS operates globally, you are subject to the European Union's GDPR and California's CCPA laws. These laws require you to inform users if you are tracking them, and in many cases, force you to get explicit consent *before* you place a tracking cookie on their browser. Fines for non-compliance can be devastating.

---

## Think First
Understand what you are actually tracking.

**Are you using any third-party marketing trackers? (e.g., Facebook Pixel, Google Analytics, TikTok Pixel)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Are you setting cookies required for the app to function? (e.g., Session tokens, CSRF tokens)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Essential vs. Non-Essential Cookies:**
  - *Essential:* Cookies used strictly for authentication (keeping the user logged in) or security. **You do NOT need consent for these.**
  - *Non-Essential:* Analytics, advertising pixels, cross-site trackers. **You MUST get explicit consent before firing these in the EU.**
- **To Banner or Not to Banner:** The easiest way to avoid writing a complex cookie banner is to simply *not use non-essential cookies*. If you use a privacy-friendly analytics tool (like Plausible) and don't run retargeting ads, you can completely skip the annoying cookie banner.

---

## Common Mistakes
- **The "Fake" Cookie Banner:**
  - *Why it happens:* You download a UI component that says "We use cookies! [Accept]", but Google Analytics fires in the background before the user even clicks the button.
  - *Consequence:* This is entirely illegal under GDPR. Consent must be *prior* to tracking.
  - *Prevention:* Your code must physically block the execution of tracking scripts until the \`has_consented\` state is true.
- **Dark Patterns:** Making the "Accept All" button massive and green, while hiding the "Decline" button under 3 layers of menus. EU regulators are actively fining companies for this.

---

## Examples
- *Good Implementation:* Using a dedicated Consent Management Platform (CMP) like Cookiebot or Termly that automatically scans your site and blocks third-party scripts until consent is given.
- *Bad Implementation:* A custom React state \`<CookieBanner />\` that just hides the UI but doesn't actually stop Stripe or Google from setting cookies.

---

## AI Prompt
Use this prompt to figure out exactly what your compliance burden is.

\`\`\`prompt
My SaaS product uses the following tools: [INSERT TOOLS, e.g., Next.js, Supabase Auth, Stripe, Google Analytics].

Act as a GDPR Compliance Officer.
1. Categorize these tools into "Essential" and "Non-Essential" cookies.
2. Based on this list, do I legally require a Cookie Consent Banner for EU users?
3. If yes, explain exactly how I must conditionally render my scripts in my \`&lt;head&gt;\` tag to ensure I do not violate the "prior consent" rule.
\`\`\`

---

## Validation Checklist
- [ ] Have you categorized all your cookies as Essential or Non-Essential?
- [ ] If using Non-Essential cookies, does your banner actually block scripts from loading prior to consent?
- [ ] Do you have a dedicated \`/cookie-policy\` page explaining what data you collect?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Write your Cookie Strategy below. Will you use a CMP, or will you use privacy-first tools to avoid the banner entirely?

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,
  'customersupport': `# Customer Support

**🕒 Estimated Time:** 15-20 min

---

## Overview
When you launch, things will break. Users will be confused. Payments will fail. How you handle these first few support tickets determines whether those early adopters become your biggest evangelists or your loudest haters. In the early days, "doing things that don't scale" (like jumping on a 15-minute Zoom call to fix a bug for a $10/mo user) is your ultimate competitive advantage against massive, slow corporations.

---

## Think First
Establish your support channels.

**Where will users go when they are angry or confused? (e.g., A chat widget, a support email, a Discord server?)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**What is your SLA (Service Level Agreement) for yourself? (e.g., I will reply to all bugs within 4 hours)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Email vs. Live Chat vs. Community:**
  - *Email (\`support@yoursite.com\`):* Standard, asynchronous. You control the pace.
  - *Live Chat (Intercom, Crisp):* Extremely high conversion rate for sales, but users expect a reply in 30 seconds. If you are a solo dev, a chat widget will ruin your life.
  - *Community (Discord/Slack):* Great for technical products where users can help each other. Terrible for B2B enterprise products where privacy matters.
- **Self-Serve vs. Manual:** The best support ticket is the one that is never submitted. Spend time building robust [Documentation](#documentation) and an FAQ page so users can unblock themselves.

---

## Common Mistakes
- **The "Black Hole" Support Form:**
  - *Why it happens:* You build a simple HTML form that sends an email to your personal inbox, but you forget to set up an auto-responder.
  - *Consequence:* The user submits a bug and has no idea if you received it. They get angry and churn.
  - *Prevention:* Always use a tool (like Zendesk, HelpScout, or simple Resend logic) to send an immediate automated reply: "We received this, we will reply in X hours."
- **Arguing with the User:** If a user says your UX is confusing, it is confusing. Do not tell them they are clicking the wrong button. Fix the button.

---

## Examples
- *Good Implementation:* A clear "Help" button in the app that opens a modal. The modal searches the Docs first. If they still need help, it creates a ticket in Linear/HelpScout, and the user gets an email receipt.
- *Bad Implementation:* Hiding your support email at the bottom of the Terms of Service page so nobody can contact you.

---

## AI Prompt
Use AI to draft your macro templates to save you hours of typing.

\`\`\`prompt
My SaaS product is: [INSERT ELEVATOR PITCH].

Act as a Head of Customer Experience.
Write 3 reusable email templates for me to use in my support desk:
1. "The Angry User" (They experienced a critical bug that deleted their data).
2. "The Feature Request" (They asked for a feature I have zero intention of ever building).
3. "The Refund Request" (They forgot to cancel their trial and want their money back).
Keep the tone empathetic, professional, and concise.
\`\`\`

---

## Validation Checklist
- [ ] Is there a highly visible "Support" or "Help" link inside the logged-in dashboard?
- [ ] Do users receive an immediate automated confirmation when they submit a ticket?
- [ ] Have you set up an actual \`support@domain.com\` email address?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Define your primary support channel and your commitment to reply times below.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,
  'retention': `# Retention

**🕒 Estimated Time:** 30-45 min

---

## Overview
Acquisition gets users in the door; retention determines if you actually have a business. If it costs you $50 to acquire a user, but they churn after paying you $10, your SaaS will bleed to death. High retention proves you have achieved Product-Market Fit. Your goal is to maximize the lifetime value (LTV) of every user by keeping them engaged, successful, and continually paying.

---

## Think First
Diagnose your current leaks.

**Where is the biggest drop-off in your funnel? (e.g., "50% of users sign up but never complete onboarding", or "Users churn after month 3")**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**What is the core reason users cancel? (e.g., Too expensive, too hard to use, they finished the project they needed it for)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Onboarding vs. Ongoing Value:** The highest ROI you can get on retention is fixing your Day 1 Onboarding. If a user doesn't experience the "Aha!" moment in the first 5 minutes, they will never log in again.
- **Re-engagement Loops:** SaaS apps naturally fade into the background. You must build systems to pull users back in. This could be a weekly email summary ("Your team saved 4 hours this week!"), push notifications, or Slack bot alerts.

---

## Common Mistakes
- **Hiding the Cancel Button:**
  - *Why it happens:* You think making it hard to cancel will save revenue.
  - *Consequence:* Angry users issue credit card chargebacks. Your Stripe account gets banned for high fraud rates, instantly killing your entire business.
  - *Prevention:* Make cancellation 1-click. Use the cancellation flow to ask a multiple-choice question on *why* they are leaving.
- **Ignoring Churned Users:** A user who churned is a goldmine of data. They liked your pitch enough to sign up, but the product failed them. Reach out to them personally.

---

## Examples
- *Good Implementation:* An automated email triggers 3 days after signup if the user hasn't completed their profile, offering a 1-on-1 setup call. When users click cancel, they are offered a 1-month pause or a 50% discount to stay.
- *Bad Implementation:* Sending a generic "We miss you!" email 6 months after someone churns, with zero context.

---

## AI Prompt
Use AI to design a re-engagement loop for your specific product.

\`\`\`prompt
My SaaS product is: [INSERT ELEVATOR PITCH].
The core action I want users to take weekly is: [INSERT ACTION].

Act as a Head of Growth.
1. Design a weekly "Summary Email" that provides immense value to the user and psychologically pulls them back into the app.
2. Outline the specific data points I should include in this email.
3. Write the exact subject line and body copy for this email.
\`\`\`

---

## Validation Checklist
- [ ] Is your Day 1 onboarding flow removing all friction to the "Aha!" moment?
- [ ] Do you have an automated re-engagement system (like weekly emails) running?
- [ ] Is your cancellation process easy, but actively capturing the *reason* for churn?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Define the single biggest bottleneck in your retention funnel right now, and one experiment you will run this week to fix it.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,
  'userfeedback': `# User Feedback

**🕒 Estimated Time:** 20-30 min

---

## Overview
You are not your user. The features you think are brilliant might be completely ignored, while a tiny bug you deemed "low priority" might be infuriating your paying customers. Establishing a tight feedback loop ensures you are building the right product, not just a cool piece of software.

---

## Think First
Identify who you are listening to.

**Who are your "Power Users"? (Identify 3 specific users who use your app the most)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**What is the single most common complaint you hear in support tickets?**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Qualitative vs. Quantitative:**
  - *Quantitative (Data):* Analytics tools tell you *what* users are doing (e.g., "50% of users drop off on page 2").
  - *Qualitative (Feedback):* Interviews and surveys tell you *why* they are doing it (e.g., "I dropped off because the credit card form looked sketchy"). You need both.
- **Public Roadmaps vs. Direct Interviews:** Public voting boards (like Canny) are great for volume, but often lead to the "Homer Simpson Car"—a bloated mess of requested features. Direct 1-on-1 Zoom interviews are 10x more valuable for finding the root cause of a problem.

---

## Common Mistakes
- **Building Exactly What They Ask For:**
  - *Why it happens:* A user says "I need an export to Excel button."
  - *Consequence:* You build the button. But what they actually wanted was a way to share data with their boss, which would have been better solved with a "Share View" link.
  - *Prevention:* When a user asks for a feature, ask "Why?" 3 times until you uncover the actual underlying problem.
- **Listening to Free Users Over Paid Users:** Free users will demand massive features and then never upgrade. Heavily weight feedback from users who actually have a credit card on file.

---

## Examples
- *Good Implementation:* Sending a simple Net Promoter Score (NPS) survey inside the app after a user successfully completes a core task. Reaching out to anyone who scores a 6 or lower for a 10-minute feedback call.
- *Bad Implementation:* Sending a 40-question Google Form to your entire email list and offering no incentive for completing it.

---

## AI Prompt
Use AI to analyze a massive dump of raw user feedback and find the signal in the noise.

\`\`\`prompt
Here is a dump of raw feedback from my users: [PASTE RECENT SUPPORT TICKETS / SURVEY RESULTS].

Act as a Senior Product Manager.
1. Categorize this feedback into 3 buckets: UX Friction, Bug Reports, and Feature Requests.
2. Identify the single underlying "Root Problem" that is driving the majority of these complaints.
3. Propose a lightweight, high-ROI solution that addresses the root problem without over-engineering.
\`\`\`

---

## Validation Checklist
- [ ] Do you have a system in place to capture qualitative feedback (e.g., an in-app widget or automated emails)?
- [ ] Are you prioritizing feedback from paying users over free users?
- [ ] Are you digging into the *root cause* of feature requests, rather than blindly building what users ask for?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Write down the single most impactful piece of feedback you've received recently, and the root problem it represents.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,
  'scalingstrategy': `# Scaling Strategy

**🕒 Estimated Time:** 30-45 min

---

## Overview
Scaling is a fantastic problem to have—it means your app is growing! But growth breaks things. The systems, database queries, and manual customer support processes that worked for 100 users will violently collapse when you hit 10,000 users. A scaling strategy is about identifying your exact bottlenecks *before* they take your app offline, and methodically upgrading your architecture to handle the next order of magnitude.

---

## Think First
Identify your current breaking points.

**What is the slowest part of your application right now? (e.g., A specific database query, image rendering, third-party API latency)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**What manual process takes up the most of your time? (e.g., Onboarding new clients, replying to password resets)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Vertical vs. Horizontal Scaling:**
  - *Vertical (Scaling Up):* Buying a bigger server with more RAM and CPU. It's the easiest and fastest way to fix performance problems in the early days. Don't over-engineer; just pay $40/mo for a bigger Postgres instance.
  - *Horizontal (Scaling Out):* Adding more servers behind a load balancer, or using read-replicas. This is complex and should be delayed until vertical scaling is no longer economically viable.
- **Automating the Human Bottlenecks:** Scaling isn't just about servers. If you spend 2 hours a day answering the same support ticket, you are the bottleneck. Build an FAQ, write a script, or automate the flow.

---

## Common Mistakes
- **Premature Optimization:**
  - *Why it happens:* You read an article about how Netflix uses Kubernetes and microservices, so you try to rebuild your MVP with a massive distributed architecture.
  - *Consequence:* Your feature velocity drops to zero. You spend 3 weeks configuring Docker instead of building features.
  - *Prevention:* Stick to a majestic monolith (e.g., Next.js + Postgres) until you physically cannot scale it anymore. 99% of startups never reach the scale where microservices are required.
- **Ignoring Database Indexes:** 90% of scaling issues in early SaaS are caused by missing database indexes. A table scan that takes 2ms on 100 rows will take 5 seconds on 1,000,000 rows.

---

## Examples
- *Good Implementation:* Your dashboard is slow. You look at the slow query logs, realize you are missing an index on \`user_id\`, add it, and the query drops from 2000ms to 5ms.
- *Bad Implementation:* Your dashboard is slow. You decide to rewrite the entire backend in Rust and migrate from Postgres to MongoDB to "handle web scale."

---

## AI Prompt
Use AI to diagnose and optimize a specific performance bottleneck.

\`\`\`prompt
My SaaS stack is: [INSERT STACK, e.g., Next.js App Router, Prisma, PostgreSQL].
I am experiencing a severe bottleneck when users perform this action: [DESCRIBE ACTION, e.g., Loading the main analytics dashboard].
Here is the code/query involved: [PASTE SLOW CODE OR QUERY].

Act as a Principal Infrastructure Engineer.
1. Identify the likely cause of the bottleneck in this specific code/query.
2. Propose 3 solutions ranked from easiest (e.g., adding an index, basic caching) to hardest (e.g., architectural rewrite).
3. Provide the exact code or SQL required to implement the easiest solution.
\`\`\`

---

## Validation Checklist
- [ ] Have you audited your database for missing indexes on heavily queried columns?
- [ ] Have you implemented basic caching (Redis or CDN) for heavily accessed, rarely changing data?
- [ ] Are you intentionally delaying complex architectures (Kubernetes/Microservices) until absolutely necessary?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Define the single biggest technical or human bottleneck in your app right now, and the simplest possible fix for it.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,
  'marketing': `# Marketing

**🕒 Estimated Time:** 30-45 min

---

## Overview
"If you build it, they will come" is the biggest lie in software. If you build it, absolutely no one will care unless you put it directly in front of them. Marketing is the engine of acquisition. It is about deeply understanding where your [ICP](#icpidealcustomerprofile) hangs out, and crafting a message that compels them to click, read, and sign up.

---

## Think First
Identify your channels.

**Where does your specific ICP spend their time online? (e.g., LinkedIn, specific Subreddits, HackerNews, TikTok)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**What is the "Hook"? (A 1-sentence provocative statement that makes your ICP stop scrolling)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Inbound vs. Outbound:**
  - *Inbound (Content/SEO/Social):* Creating valuable content that draws people to you. High effort upfront, but compounds massively over time. (Great for low-cost SaaS).
  - *Outbound (Cold Email/Cold DMs):* Reaching out directly to prospects. Uncomfortable, but generates immediate feedback and revenue. (Mandatory for high-ticket B2B SaaS).
- **The "One Channel" Rule:** The fastest way to fail at marketing is to try doing Twitter, LinkedIn, SEO, TikTok, and Cold Email all at the same time. Pick exactly **one channel** where your audience lives, and master it before moving to the next.

---

## Common Mistakes
- **Selling Features, Not Outcomes:**
  - *Why it happens:* You are a developer, so you are proud of your React Server Components and your Redis caching layer.
  - *Consequence:* You write a landing page that says "Built with Edge Compute." The customer doesn't care. They leave.
  - *Prevention:* The customer only cares about what the software does for *them*. Instead of "AI Powered", say "Write your weekly newsletter in 3 minutes."
- **Giving Up Too Early:** Posting on Twitter twice, getting zero likes, and deciding "Social media marketing doesn't work for my app." Marketing requires relentless consistency over months.

---

## Examples
- *Good Implementation:* Your app helps real estate agents format listings. You use a scraping tool to find the emails of 1,000 real estate agents, and you send a highly personalized cold email offering to format their next listing for free.
- *Bad Implementation:* Running $500 of generic Facebook ads pointing to your homepage with no specific call to action.

---

## AI Prompt
Use AI to generate a highly targeted Outbound Marketing sequence.

\`\`\`prompt
My SaaS product is: [INSERT ELEVATOR PITCH].
My Ideal Customer Profile is: [INSERT ICP].
I want to acquire them using [INSERT CHANNEL, e.g., Cold Email or LinkedIn DMs].

Act as a world-class Copywriter and Growth Hacker.
1. Write a 3-step cold outreach sequence.
2. Step 1 should be a short, punchy hook that offers immediate value (no generic "Hope you are doing well" intros).
3. Step 2 should be a follow-up sharing a micro-case study.
4. Step 3 should be a final "breakup" message.
Ensure the tone is human, casual, and completely devoid of corporate buzzwords.
\`\`\`

---

## Validation Checklist
- [ ] Have you chosen exactly ONE primary marketing channel to focus on for the next 30 days?
- [ ] Is your messaging focused entirely on the outcome/benefit to the user, rather than the technical features?
- [ ] Do you have a quantifiable daily goal? (e.g., "Send 20 cold DMs every day" or "Publish 2 blog posts per week").

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Define your single marketing channel and the daily action you will take to drive traffic.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,
  'referralsystems': `# Referral Systems

**🕒 Estimated Time:** 20-30 min

---

## Overview
The holy grail of SaaS growth is "Viral loops." If every user who signs up brings in 1.2 new users, your app will grow exponentially with zero marketing spend. Referral systems incentivize your existing, happy users to do your marketing for you. However, a referral system only works if the core product is already phenomenal—you cannot incentivize people to share a bad product.

---

## Think First
Identify the incentive.

**What can you give the Referrer to make them want to share? (e.g., $10 credit, 1 month free, premium features unlocked)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**What can you give the Invited User to make them want to sign up? (e.g., 20% off their first month)**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **One-Sided vs. Double-Sided Rewards:**
  - *One-Sided:* Only the person referring gets a reward. (Often feels spammy, like an MLM).
  - *Double-Sided:* "Give $10, Get $10." The referrer gets a reward, AND the person they invite gets a discount. This is the gold standard because it makes the referrer look generous, removing the social friction of sharing a link.
- **Financial vs. Utility Rewards:** You don't always have to give away money. Dropbox famously gave away *storage space* (utility) for referrals. If your app has usage limits (e.g., "5 AI generations per day"), offer "50 extra generations" for every successful referral. Utility rewards are often cheaper for you and more valuable to the user.

---

## Common Mistakes
- **Hiding the Referral Program:**
  - *Why it happens:* You build a great referral system but bury it in the settings menu under "Billing."
  - *Consequence:* Nobody uses it because nobody knows it exists.
  - *Prevention:* Trigger a popup offering the referral program *immediately* after the user experiences the "Aha!" moment (e.g., right after they successfully export their first video).
- **Over-complicating the Payouts:** Forcing users to hit a $50 minimum threshold before they can withdraw affiliate cash. Just apply it automatically as account credit to their next invoice.

---

## Examples
- *Good Implementation:* An AI writing tool limits free users to 10,000 words. After hitting the limit, a modal appears: "Want 10,000 more words for free? Share this link with a friend. You both get 10,000 words when they sign up."
- *Bad Implementation:* Asking users to share a link to their Twitter feed for a 5% discount on a $10/mo plan. The reward is not worth the social cost of spamming their friends.

---

## AI Prompt
Use AI to design a mathematically sound, double-sided referral loop.

\`\`\`prompt
My SaaS product is: [INSERT ELEVATOR PITCH].
My pricing model is: [INSERT PRICING].
My app has the following usage limits/features: [INSERT LIMITS, e.g., 5 projects max on the free tier].

Act as a Head of Growth.
1. Design a "Double-Sided" referral program that leverages Utility Rewards (not just cash/discounts) based on my app's specific features.
2. Outline the exact user journey: When and where in the UI should I prompt the user to share their link for maximum conversion?
3. Draft the short, punchy UI copy for the referral modal.
\`\`\`

---

## Validation Checklist
- [ ] Does your referral program offer a "Double-Sided" reward?
- [ ] Is the reward highly desirable to your specific ICP?
- [ ] Are you prompting users to refer others at the exact moment they experience joy/success in the app?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Define your exact Double-Sided reward structure below.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,
  'featureroadmap': `# Feature Roadmap

**🕒 Estimated Time:** 15-20 min

---

## Overview
A roadmap is how you communicate the future of your product to your users, your team, and yourself. It prevents you from waking up and randomly coding whatever feels fun that day. A well-maintained roadmap builds trust with your enterprise clients (showing them you are actively investing in the platform) and keeps your development efforts fiercely aligned with your [North Star Metric](#northstarmetric).

---

## Think First
Categorize your upcoming work.

**What is the biggest feature you are committing to for the next 30 days? (The "Now")**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**What is a massive, structural feature you want to build in the next 3-6 months? (The "Later")**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Timeline vs. Theme Based:**
  - *Timeline (Q1, Q2, Q3):* Traditional, but dangerous. If you promise a feature in Q1 and miss the deadline, users get angry.
  - *Theme/Status Based (Now, Next, Later):* The modern SaaS standard. It shows users what you are working on currently ("Now"), what is up next ("Next"), and what is on the horizon ("Later"), without committing to rigid, stressful deadlines.
- **Public vs. Private:** A public roadmap (using a tool like Linear or Canny) allows users to upvote features, giving you free market research. However, if you are in a highly competitive, easily-cloned market, keep it private to prevent competitors from front-running your ideas.

---

## Common Mistakes
- **The "Yes" Trap:**
  - *Why it happens:* A big potential client says, "We will sign the contract if you add this one highly specific integration to the roadmap."
  - *Consequence:* You put it on the roadmap. Then another client asks for something else. Soon, your roadmap is a chaotic list of custom agency work, and the core product suffers.
  - *Prevention:* Only put features on the roadmap that benefit the *majority* of your ICP, using the [RICE Framework](#featureprioritization).
- **Never Updating It:** A public roadmap that hasn't been updated in 8 months is worse than no roadmap at all. It signals to users that the product is dead.

---

## Examples
- *Good Implementation:* A simple Kanban board embedded in your app. "Now: Stripe Integration, Dark Mode. Next: Team Workspaces. Later: AI Autocomplete."
- *Bad Implementation:* A highly detailed Gantt chart predicting exactly what you will be coding on November 14th of next year.

---

## AI Prompt
Use AI to organize your chaotic backlog into a clean Now/Next/Later roadmap.

\`\`\`prompt
Here is my messy list of features I want to build: [PASTE BACKLOG].
My core business goal right now is: [INSERT GOAL, e.g., improving retention].

Act as a Lead Product Manager.
1. Organize these features into a strict "Now, Next, Later" format.
2. Ensure the "Now" column only contains features that directly contribute to my current core business goal.
3. Move any highly complex, low-impact features into a "Won't Do" or "Parking Lot" section and explain why they were cut.
\`\`\`

---

## Validation Checklist
- [ ] Is your roadmap organized by Status (Now/Next/Later) rather than rigid dates?
- [ ] Does every item in the "Now" column directly impact your KPIs or North Star Metric?
- [ ] Do you have a scheduled cadence (e.g., every 1st of the month) to update the roadmap?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Write down the 1-3 features that are strictly in your "Now" column.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,
  'technicaldebt': `# Technical Debt

**🕒 Estimated Time:** 15-20 min

---

## Overview
Technical debt is the cost of choosing an easy, fast solution now instead of a better, slower approach. **Tech debt is not inherently bad.** In Phase 1, you *should* take on tech debt to launch your MVP quickly. But in Phase 6, accumulated tech debt acts like high-interest credit card debt: eventually, the "interest payments" (bugs, slow deployment times, confusing spaghetti code) become so high that feature velocity grinds to an absolute halt.

---

## Think First
Identify the interest payments.

**What part of your codebase are you genuinely afraid to touch because it breaks easily?**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**What manual workaround are you doing repeatedly because "the code isn't ready yet"?**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The 20% Rule:** You cannot pause product development for 3 months to "rewrite the app." Your competitors will crush you. Instead, dedicate a strict 20% of every sprint (or 1 day a week) exclusively to paying down technical debt, upgrading packages, and writing tests.
- **Refactor vs. Rewrite:**
  - *Refactor:* Improving the internal structure of the code without changing its external behavior. (Do this constantly).
  - *Rewrite:* Throwing the code away and starting over in a new framework. (Avoid this at all costs. It is almost always a trap that kills startups).

---

## Common Mistakes
- **Ignoring the Boy Scout Rule:**
  - *Why it happens:* You are in a rush to ship a feature, so you add messy code to an already messy file.
  - *Consequence:* The file becomes a 3,000-line unmaintainable monster.
  - *Prevention:* The Boy Scout Rule: "Always leave the campground cleaner than you found it." If you are adding a feature to a file, take 10 extra minutes to clean up the function you are touching.
- **Zero Automated Tests:** If you don't have basic Unit or E2E tests, you cannot refactor code confidently, because you won't know if you broke something until a user complains.

---

## Examples
- *Good Implementation:* You realize your payment webhook logic is scattered across 5 different files. During a quiet week, you extract it all into a single, heavily-tested \`billingService.ts\` file.
- *Bad Implementation:* Pausing all feature work for 6 months to rewrite your perfectly functional React app into Svelte because you saw a cool YouTube video about it.

---

## AI Prompt
Use AI to safely plan a refactor for a terrifying piece of legacy code.

\`\`\`prompt
I have a piece of "spaghetti code" in my app that handles [INSERT FUNCTIONALITY, e.g., User Permissions]. It works, but it is deeply fragile.
Here is the code: [PASTE CODE].

Act as a Principal Software Engineer.
1. Analyze the code and identify the biggest "code smells" and risks.
2. Outline a step-by-step plan to refactor this code into a clean, modular structure *without* breaking its current functionality.
3. Write 3 specific unit tests I should implement *before* I begin the refactor to ensure I don't introduce regressions.
\`\`\`

---

## Validation Checklist
- [ ] Have you implemented the 20% rule (dedicating a fraction of all dev time to tech debt)?
- [ ] Are you actively following the Boy Scout Rule when touching old files?
- [ ] Have you sworn a blood oath to avoid a complete "from scratch" rewrite unless absolutely necessary for survival?

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Identify the single piece of technical debt that is slowing you down the most right now, and schedule exactly when you will fix it.

\`\`\`input
✍️ Type your answer here...
\`\`\`
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

**🕒 Estimated Time:** 15-20 min

---

## Overview
Welcome to Phase 0 of your Mobile App journey. Before writing any code in React Native or opening Xcode, we must clearly define what you are building. The mobile app market is brutal—users will delete an app within 10 seconds if it doesn't immediately solve a problem or provide entertainment. This document serves as the foundational anchor for your project. A blurry idea leads to a deleted app.

---

## Think First
Before you ask AI to evaluate your idea, answer these questions honestly. Type your answers right here:

**Core Value Proposition** (If the user opens your app for exactly 5 seconds, what value do they get?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Target Audience** (Who exactly needs this on their phone right now?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Existing Solution** (What app do they use today, or how do they solve it without an app?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Why a Native App?** (Why does this need to be an app installed from the App Store, and not just a mobile website?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Does it need to be an app?** If your idea doesn't require push notifications, offline access, camera, GPS, or deep OS integration, it should probably be a responsive web app.
- **Platform Focus:** Will you target iOS first, Android first, or both simultaneously using React Native/Expo? (Hint: Use React Native/Expo to target both).

---

## Common Mistakes
- **Building a Website Wrapped in an App:** Apple will reject your app if it just feels like a website loaded in a web view. It must have native mobile interactions.
- **Overestimating the Unfair Advantage:** Thinking "better UI" is an unfair advantage. It's not. Distribution and retention are unfair advantages.

---

## AI Prompt
Use this prompt to stress-test your mobile app idea. It will automatically read the answers you typed above.

\`\`\`prompt
Act as a brutally honest Senior Mobile Product Manager and App Store Editor.
Read my Idea Definition above.

Challenge my assumptions. Do not validate my idea automatically.
1. What is the biggest, most fatal flaw in this idea for a mobile environment?
2. Does this actually need to be an App Store app, or is it better as a mobile website? Why?
3. What 3 difficult questions do I need to answer before writing any React Native code?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Apple Developer Program, Google Play Console, or Supabase) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
At the bottom of this page, write a definitive 3-sentence summary of your idea. This will be referenced by Kontxt AI for all future phases.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Y Combinator: How to Evaluate Startup Ideas](https://www.ycombinator.com/library/8g-how-to-get-startup-ideas)\n- [The Lean Canvas Guide](https://leanstack.com/lean-canvas)`,
  'mobileproblemstatement': `# Problem Statement

**🕒 Estimated Time:** 15 min

---

## Overview
A mobile app is essentially a tool that lives in someone's pocket. If that tool doesn't solve a highly specific, painful problem, the user will uninstall it to save storage space. The Problem Statement defines the exact friction your user experiences in the real world before they discover your app.

---

## Think First
Analyze the problem you are solving in the context of a mobile user:

**The Trigger** (In what exact real-world scenario does the user pull out their phone and say, "I need to solve this right now"?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Pain Point** (What makes the current way of doing things frustrating, slow, or expensive?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Consequence** (What happens if they don't solve this problem? Do they lose money? Time? Social status?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Urgency:** Is this a "hair on fire" problem that requires an immediate mobile solution (e.g., calling an Uber), or a casual problem (e.g., tracking water intake)?
- **Frequency:** Do users face this problem daily, weekly, or once a year? (High frequency = high mobile retention).

---

## Common Mistakes
- **Inventing a problem:** Assuming people care about something just because the technology to build it is cool.
- **Being too vague:** "People want to be healthier" is not a problem statement. "People forget to take their daily medication and feel anxious about it" is a problem statement.

---

## AI Prompt
Use AI to sharpen your problem statement and ensure it justifies a mobile application.

\`\`\`prompt
Act as a strict Mobile App Investor.
Review my Problem Statement answers above.

1. Rewrite my problem into a single, punchy paragraph that highlights the real-world friction.
2. Tell me if this problem is urgent and frequent enough to justify installing a dedicated mobile app, or if users would rather just Google a solution when they need it.
3. What is the emotional core of this problem? (e.g., Anxiety? Boredom? Greed?)
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste the AI-refined, punchy Problem Statement here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Y Combinator: How to Evaluate Startup Ideas](https://www.ycombinator.com/library/8g-how-to-get-startup-ideas)\n- [The Lean Canvas Guide](https://leanstack.com/lean-canvas)`,
  'mobileusecases': `# Use Cases

**🕒 Estimated Time:** 20 min

---

## Overview
Use Cases define exactly *how* and *when* someone will interact with your mobile app. Unlike a desktop website where a user might sit down for an hour to work, mobile use cases are often characterized by short, distracted bursts of activity (micro-sessions). Understanding the context in which your app is used dictates your entire UI/UX strategy.

---

## Think First
Imagine the user in the real world:

**The "On-the-Go" Scenario** (Describe a situation where the user has only 15 seconds to use your app while walking or commuting.)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The "Deep Dive" Scenario** (Describe a situation where the user is sitting on their couch using your app for 5+ minutes.)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Offline Constraints** (What happens if they try to use this specific feature while on a subway with zero internet connection?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Primary vs Secondary Use Cases:** What is the ONE thing the user opens the app to do 90% of the time? That feature must be accessible with a single tap from the home screen.
- **Offline Capabilities:** Will your app cache data locally (using SQLite or AsyncStorage) so it remains functional without Wi-Fi?

---

## Common Mistakes
- **Designing for perfect conditions:** Assuming the user has two free hands, 100% battery, and perfect 5G connection.
- **Burying the core action:** Making the user tap through 3 menus just to reach the primary use case.

---

## AI Prompt
Let AI help you generate and stress-test your mobile use cases based on real-world constraints.

\`\`\`prompt
Act as a Mobile UX Researcher.
Read my Use Case scenarios above and the core concept of my app.

1. Generate a list of 3-5 hyper-specific Mobile Use Cases. Format them as: "When [Context], the user wants to [Action] so they can [Outcome]."
2. For the Primary Use Case, how can I reduce the friction to less than 3 taps?
3. What edge cases (e.g., poor network, low battery, distracted user) could break these use cases?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your finalized list of 3-5 Mobile Use Cases here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Y Combinator: How to Evaluate Startup Ideas](https://www.ycombinator.com/library/8g-how-to-get-startup-ideas)\n- [The Lean Canvas Guide](https://leanstack.com/lean-canvas)`,
  'mobileuserjourney': `# User Journey

**🕒 Estimated Time:** 25 min

---

## Overview
A Mobile User Journey maps the entire lifecycle of your user, from the moment they discover your app in the App Store, through the onboarding process, to the moment they become a daily active user. In mobile, the onboarding journey is the deadliest phase—if it's too long or asks for too many permissions upfront, you will lose 80% of your users immediately.

---

## Think First
Map out the high-level steps of your user's experience:

**Discovery & Installation** (How do they find your app, and what makes them click "Download"?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The First 60 Seconds (Onboarding)** (What do they see immediately after opening the app? Do you force them to create an account immediately, or let them explore first?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The "Aha!" Moment** (At what exact moment do they realize your app is incredibly valuable to them?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Deferred Registration:** Can you delay asking for an email/password until the user actually needs to save data or make a purchase? (Highly recommended for mobile).
- **Permission Requests:** Never ask for Push Notifications, Location, or Camera access on the very first screen. Wait until the user performs an action that requires that permission (e.g., tapping a "Find Near Me" button).

---

## Common Mistakes
- **The "Tutorial Carousel":** Forcing users to swipe through 5 screens of text explaining how the app works before they can use it. Nobody reads them.
- **Immediate Login Walls:** Showing a blank login screen the millisecond the app launches without explaining the value first.

---

## AI Prompt
Use AI to design a high-conversion mobile user journey.

\`\`\`prompt
Act as a Mobile Growth Hacker and UX Expert.
Based on my app concept and the answers above, design a detailed 4-stage User Journey map:
1. Discovery
2. First-Time Onboarding (Focus on maximizing completion rate and getting to the "Aha!" moment as fast as possible)
3. Core Habit Formation (How do we get them to open the app on Day 2 and Day 7?)
4. The Trigger for monetization or sharing.

Please explicitly state *when* I should ask for push notification/location permissions to avoid being denied.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste the finalized 4-stage User Journey Map here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Y Combinator: How to Evaluate Startup Ideas](https://www.ycombinator.com/library/8g-how-to-get-startup-ideas)\n- [The Lean Canvas Guide](https://leanstack.com/lean-canvas)`,
  'mobiletargetaudience': `# Target Audience

**🕒 Estimated Time:** 15 min

---

## Overview
Your Target Audience defines the specific group of people who are most likely to download and use your mobile app. In the App Store, trying to appeal to "everyone" means you will appeal to no one, and your app will be buried under millions of others. A hyper-niche audience allows you to optimize your App Store Optimization (ASO) and marketing spend.

---

## Think First
Narrow down exactly who you are building for:

**Demographics** (Age, location, profession, income level)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Psychographics** (What are their interests, values, and daily habits?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Mobile Behavior** (Are they power users who live on their phones, or older users who prefer larger text and simple interfaces?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Niche Down:** Instead of targeting "Fitness Enthusiasts", target "Busy single parents who only have 15 minutes to work out at home".
- **Early Adopters:** Who are the first 100 people who will forgive the bugs in your V1 because they need the solution so badly?

---

## Common Mistakes
- **Broad Targeting:** Thinking your audience is "anyone with a smartphone."
- **Ignoring the Device:** Designing an app for teenagers but ignoring the fact that they heavily skew towards iOS (in the US) and expect heavily animated, TikTok-style vertical scrolling.

---

## AI Prompt
Let AI refine and define your core audience.

\`\`\`prompt
Act as a Mobile Marketing Director.
Analyze my target audience inputs above.

1. Refine my audience into a highly specific, niche "Beachhead Market" (the first group of users I should target to get my first 1,000 downloads).
2. What specific App Store search terms (keywords) is this audience likely typing into the search bar right now?
3. Where does this audience hang out online (e.g., specific Reddit communities, TikTok hashtags, Facebook groups)?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste the refined Beachhead Market and the list of keywords here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Nielsen Norman Group: User Personas](https://www.nngroup.com/articles/persona/)\n- [HubSpot: How to Create Detailed Buyer Personas](https://blog.hubspot.com/marketing/buyer-persona-research)`,
  'mobilepersonas': `# Personas

**🕒 Estimated Time:** 15 min

---

## Overview
While a Target Audience is a broad demographic, a Persona is a fictional character representing your ideal user. Giving your user a name, face, and specific set of frustrations helps you make empathetic design decisions. When deciding whether to add a complex new feature, you won't ask "Would users like this?", you will ask "Would Sarah have time to figure this out during her morning commute?"

---

## Think First
Create the profile of your most desperate user:

**Name & Basic Info** (e.g., "Commuter Craig", 34, takes the train 1 hour each way)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Their Main Goal in Your App** (What constitutes a "win" for them?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Their Biggest Frustration with Mobile Apps** (e.g., hates typing long paragraphs on a phone keyboard, hates apps that drain battery)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Primary Persona:** Focus 90% of your MVP design on pleasing this single persona.
- **Anti-Persona:** Define who you are explicitly *not* building for, so you can comfortably say "no" to feature requests that don't fit.

---

## Common Mistakes
- **Too many personas:** Trying to design an MVP for 5 different personas at once. Stick to ONE for V1.
- **Superficial details:** Writing that your persona "likes the color blue" instead of focusing on their software behavior (e.g., "never turns on push notifications").

---

## AI Prompt
Use AI to flesh out a deep, behavioral persona.

\`\`\`prompt
Act as a UX Researcher.
Using my inputs above, generate a comprehensive "Primary User Persona" for my mobile app.

Include:
- Name and brief background
- Behavioral Traits (How do they use their phone? Are they a scroller, a searcher, a multitasker?)
- Key Motivations (Why do they open the app?)
- Key Friction Points (What will make them instantly uninstall the app?)
- "The 10-Second Test" (What must this persona see in the first 10 seconds to stick around?)
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your comprehensive Primary Persona here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Nielsen Norman Group: User Personas](https://www.nngroup.com/articles/persona/)\n- [HubSpot: How to Create Detailed Buyer Personas](https://blog.hubspot.com/marketing/buyer-persona-research)`,
  'mobilesolutionstatement': `# Solution Statement

**🕒 Estimated Time:** 15 min

---

## Overview
You've defined the problem and the audience. The Solution Statement clearly articulates exactly *how* your mobile app bridges the gap. It translates the abstract idea into concrete mobile features. This is the foundation of your App Store description.

---

## Think First
Describe your mechanical solution:

**The Core Mechanism** (How does the app actually solve the problem? Does it connect two people? Does it use the camera to scan something? Does it organize data?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The "Magic" Moment** (What is the specific action where the user feels relief or joy? e.g., "The moment the background is instantly removed from their photo")
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Native Advantage:** Ensure your solution leverages the fact that it is a mobile app. If your solution is just "a database of articles", it might not be a compelling app. If your solution is "a database of articles that sends you one push notification summary per day", that's an app.

---

## Common Mistakes
- **Focusing on tech instead of outcomes:** "It uses a React Native bridging module to communicate with a vector database" (Tech) vs. "It instantly finds the exact song you are humming" (Outcome).
- **Overcomplicating the solution:** Your solution statement should not require a flowchart to understand.

---

## AI Prompt
Let AI refine your mechanical description into a compelling Solution Statement.

\`\`\`prompt
Act as an elite Product Marketer.
Read my inputs above.

1. Write a 2-paragraph Solution Statement that clearly explains exactly what my mobile app does and how it solves the user's problem.
2. Highlight the "Native Advantage" (Why this solution works perfectly on a mobile phone compared to a desktop computer).
3. Provide a 1-sentence "Hook" that I can use as the subtitle in the App Store.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your 2-paragraph Solution Statement and 1-sentence Hook here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Y Combinator: How to Evaluate Startup Ideas](https://www.ycombinator.com/library/8g-how-to-get-startup-ideas)\n- [The Lean Canvas Guide](https://leanstack.com/lean-canvas)`,
  'mobileelevatorpitch': `# Elevator Pitch

**🕒 Estimated Time:** 10 min

---

## Overview
You have 30 seconds to explain your app to an investor, a potential co-founder, or a user at a coffee shop. If they don't understand it immediately, you've lost them. The Elevator Pitch distills the Problem, the Audience, and the Solution into a single, punchy formula.

---

## Think First
Fill in the blanks for the standard pitch formula:

**"My app is a [Category/Type of App]..."** (e.g., social network, utility tool, fitness tracker)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**"...that helps [Target Audience]..."**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**"...solve [Specific Problem]..."**
\`\`\`input
✍️ Type your answer here...
\`\`\`

**"...by [The Core Mechanism/Secret Sauce]."**
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The Analogy (The "X for Y"):** Is your app the "Tinder for Dog Owners"? Or the "Uber for Lawn Care"? Using a known framework helps people grasp the UX immediately, but use it cautiously—don't force a bad analogy.

---

## Common Mistakes
- **Jargon:** Using words like "synergistic paradigm shift" or "blockchain-enabled." Speak like a normal human.
- **Rambling:** A true elevator pitch is 1 to 2 sentences. Max.

---

## AI Prompt
Use AI to polish your pitch and make it memorable.

\`\`\`prompt
Act as an Angel Investor and Y Combinator Partner.
Take my pitch components above and generate 3 variations of an Elevator Pitch:

1. The "X for Y" Pitch (e.g., "We are the Uber for X")
2. The Problem/Solution Pitch (Focus heavily on the pain point)
3. The Visionary Pitch (Focus on how this changes the user's life)

Keep each variation under 2 sentences. Tell me which one you think is the strongest and why.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your favorite of the 3 Elevator Pitches here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Y Combinator: How to Evaluate Startup Ideas](https://www.ycombinator.com/library/8g-how-to-get-startup-ideas)\n- [The Lean Canvas Guide](https://leanstack.com/lean-canvas)`,
  'mobilecompetitoranalysis': `# Competitor Analysis

**🕒 Estimated Time:** 20 min

---

## Overview
Unless you are inventing a fundamentally new category of technology, you have competitors. Even if there is no app that does exactly what yours does, your user is currently solving their problem *somehow* (even if it's just using a spreadsheet or the Notes app). Understanding the competitive landscape in the App Store is crucial for positioning.

---

## Think First
Identify the giants and the alternatives:

**Direct Competitors** (Name 2-3 apps that do exactly what you want to do. If you say "there are none", look harder.)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Indirect Competitors** (How are people solving this problem without a dedicated app? e.g., WhatsApp groups, Excel, paper notebooks)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Their Weakness** (Read the 1-star and 2-star reviews of your direct competitors on the App Store. What are users constantly complaining about?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Your Differentiator:** You cannot beat a massive incumbent by building a clone. You must be significantly better at ONE specific thing (e.g., 10x faster, cheaper, vastly superior design, or hyper-niche).

---

## Common Mistakes
- **Ignoring "Non-App" Competitors:** Forgetting that "doing nothing" or "using Google Sheets" is often your biggest competitor.
- **Copying their bloated features:** Established apps have years of feature bloat. Your V1 should only copy their core value, not their 50 settings menus.

---

## AI Prompt
Let AI synthesize your competitive landscape and identify your opening.

\`\`\`prompt
Act as a Product Strategist.
Review my direct and indirect competitors, and their weaknesses, listed above.

1. Create a positioning strategy: How can my app stand out in the crowded App Store against these specific competitors?
2. Based on the weaknesses I identified, what is the ONE feature I must absolutely nail in my MVP to win over their frustrated users?
3. What is a strategic trap I should avoid when competing with these specific entities?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Positioning Strategy and your Key MVP Feature here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [AppTweak: App Store Optimization (ASO)](https://www.apptweak.com/)\n- [SensorTower: App Market Intelligence](https://sensortower.com/)`,
  'mobilesimilarapps': `# Similar Apps (UI/UX Inspiration)

**🕒 Estimated Time:** 15-20 min

---

## Overview
Good artists copy, great artists steal. When designing a mobile app, you should not reinvent the wheel for standard interactions (like navigation bars, settings screens, or login flows). Users have established mental models based on the apps they already use daily (Instagram, Uber, Spotify). Identifying "Similar Apps" helps you borrow proven UI/UX patterns so your app feels instantly familiar.

---

## Think First
Look outside your direct competitors for inspiration:

**Best-in-Class UI** (Which app in a COMPLETELY DIFFERENT industry has a design or "vibe" you want to emulate?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Specific Interactions** (Are there specific animations or gestures you love? e.g., "The swipe-to-archive in Gmail", "The pull-down search in iOS")
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Onboarding Inspiration** (Which app had an onboarding experience that you actually enjoyed instead of skipping?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Platform Conventions:** If you are building for iOS, study Apple's Human Interface Guidelines. If Android, study Material Design. Do not force an Android-style bottom sheet navigation on iOS users if it feels alien.
- **The "Familiarity" Baseline:** Borrow 80% of your UX from standard apps so you can spend your innovation budget on the 20% that makes your app unique.

---

## Common Mistakes
- **Reinventing Navigation:** Creating a weird hidden gesture menu just to be "different." Stick to standard bottom tab bars or hamburger menus unless you have a genius reason not to.
- **Copying bad design:** Just because a big app does it, doesn't mean it's good UX. Make sure the pattern actually serves your use case.

---

## AI Prompt
Use AI to extract actionable design patterns from the apps you admire.

\`\`\`prompt
Act as a Lead UI/UX Mobile Designer.
I want to borrow UX patterns from the following apps: [Insert the apps you listed above].

1. Break down the core navigation structure of these apps (e.g., Bottom Tab Bar, Floating Action Button, Swipeable Pages). Which structure is best for my app concept?
2. What specific micro-interactions or standard mobile conventions should I "steal" from these apps to make my UI feel premium and familiar?
3. Are there any UX dark patterns or frustrating elements in these apps that I should avoid?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe, or Google Search Console) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste the recommended Navigation Structure and the list of UI patterns you plan to borrow here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [AppTweak: App Store Optimization (ASO)](https://www.apptweak.com/)\n- [SensorTower: App Market Intelligence](https://sensortower.com/)`,
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
\`\`\`


## 📚 Context Links
- [AppTweak: App Store Optimization (ASO)](https://www.apptweak.com/)\n- [SensorTower: App Market Intelligence](https://sensortower.com/)`,
  'appstoreresearch': `# App Store Research

**🕒 Estimated Time:** 20 min

---

## Overview
If you are launching on iOS, Apple's App Store is a totally different ecosystem than Google Play. Apple prioritizes high-quality design, strict privacy compliance, and human curation. App Store Optimization (ASO) on iOS relies on a hidden 100-character keyword field rather than scraping your long description. Understanding how apps succeed here is vital for your iOS launch.

---

## Think First
Open the Apple App Store and search for your app's core concept.

**The Top Performers** (Who ranks #1 for your main search term? Are they running Apple Search Ads?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Visual Identity** (Look at their icons and screenshots. What color palettes and typography do the top iOS apps in your category use?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Subtitles** (Apple gives you a 30-character subtitle. What are your competitors using it for? Explaining the app, or listing keywords?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Privacy Nutrition Labels:** Apple forces you to declare exactly what data you collect. If you collect location, contacts, and browsing history for a simple calculator app, users won't download it. Can you build your app while collecting the absolute minimum data?
- **Sign in with Apple:** If you offer Google or Facebook login, Apple *requires* you to offer "Sign in with Apple." You must plan for this in your authentication architecture.

---

## Common Mistakes
- **Treating the App Store like the Play Store:** Writing a 4,000-character SEO description for Apple. Apple's algorithm doesn't index the long description for search rankings; it only indexes your Title, Subtitle, and the hidden Keyword field.
- **Ignoring App Review Guidelines:** Apple's human reviewers will reject your app for minor UX infractions, like not providing a "Delete Account" button or hiding features behind a forced login without letting users browse first.

---

## AI Prompt
Use AI to navigate Apple's strict ecosystem and optimize your iOS listing.

\`\`\`prompt
Act as an Apple App Store ASO Specialist and App Review Consultant.
Review my App Store research inputs above.

1. Provide an optimized 30-character App Title and 30-character Subtitle.
2. Provide a comma-separated list of keywords exactly totaling 100 characters for the hidden iOS keyword field. Do not repeat words used in the Title or Subtitle.
3. What is the most likely reason Apple's human reviewers would reject my app concept, and how can I design around it to ensure approval?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like App Store Connect, Supabase, Vercel) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Title, Subtitle, 100-character keyword list, and the key App Review warning here.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,
  'mobilefeatureplanning': `# Feature Planning

**🕒 Estimated Time:** 20 min

---

## Overview
Feature Planning is where your abstract solution statement turns into a concrete list of screens and buttons. In mobile development, less is more. Every new feature increases your app bundle size, introduces potential crashes, and creates more cognitive load for a user staring at a 6-inch screen.

---

## Think First
Brainstorm all the features you *want* to build. Don't filter yourself yet.

**Core Mobile Features** (What features require native mobile capabilities? e.g., Camera scanner, Push Notifications, GPS tracking, Biometric Login)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Standard Features** (What basic features do users expect? e.g., User Profile, Settings, Search, Payment processing)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**"Nice to Have" Features** (What features would be really cool, but aren't strictly necessary for the app to function? e.g., Dark Mode, Social Sharing, AI Chatbot)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Native vs Web-views:** Will every screen be built with native components (React Native), or will you use a WebView to load a web page for things like the Privacy Policy or Help Center? (Using WebViews for non-core pages saves immense development time).
- **The "One Thing":** If a user can only do ONE thing in your app, what is it? Everything else is secondary.

---

## Common Mistakes
- **Building a Swiss Army Knife:** Trying to make a social network, a fitness tracker, and a diet planner all in one app. The user will be overwhelmed and delete it.
- **Underestimating "Boring" Features:** Forgetting that building a robust password reset flow, a profile editing screen, and an onboarding flow will take 40% of your development time.

---

## AI Prompt
Use AI to organize your raw brainstorm into a structured list of mobile epics.

\`\`\`prompt
Act as a strict Mobile Product Manager.
Review my brainstormed list of features above.

1. Group these features into 3-5 high-level "Epics" (e.g., Authentication, Core Workflow, Social, Settings).
2. Flag any feature that relies heavily on native device capabilities (Camera, GPS, Bluetooth) and warn me about the complexity it will add to my React Native/Expo codebase.
3. Identify at least 3 features in my list that I should completely delete or move to a web-view to save time.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your organized list of Feature Epics and the list of features you are deleting/delaying here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [MoSCoW Prioritization Method](https://www.productplan.com/glossary/moscow-prioritization/)\n- [Y Combinator: How to Plan an MVP](https://www.ycombinator.com/library/4Q-a-guide-to-seed-fundraising)`,
  'mobilemvpfeatures': `# MVP Features

**🕒 Estimated Time:** 15 min

---

## Overview
MVP stands for Minimum Viable Product. In mobile, getting your app into the hands of real users as fast as possible is critical. The App Store approval process can take days, and debugging React Native builds can be painful. Your MVP must be the absolute bare minimum set of features required to prove your core value proposition. If you aren't embarrassed by your V1, you launched too late.

---

## Think First
Be brutal. Cut the fat.

**The "Must-Haves"** (If you remove this feature, the app literally does not work and the user cannot achieve their goal).
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The "Friction Reducers"** (Features that make the MVP usable. e.g., "Apple/Google Sign In" because nobody wants to type a long password on a mobile keyboard).
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Cutting Corners Safely:** Can you manually do things behind the scenes instead of building a feature? (e.g., Instead of building an automated in-app reporting dashboard for vendors, can you just email them a PDF once a week?)
- **Hardcoded Data:** Do you really need a fully dynamic backend for the settings menu, or can you just hardcode the options for V1?

---

## Common Mistakes
- **The "Just One More Feature" Trap:** Delaying your App Store launch by a month because you decided you *really* needed a dark mode toggle.
- **Ignoring Onboarding in the MVP:** Thinking onboarding is a "V2" feature. Onboarding is the only way a user understands your MVP. It is a Must-Have.

---

## AI Prompt
Use AI to mercilessly trim your feature list down to a true MVP.

\`\`\`prompt
Act as a ruthless Startup Advisor.
I need to launch my mobile app in the App Store in 4 weeks.
Review my "Must-Haves" list above.

1. Challenge my list: Which of these "Must-Haves" is actually a "Nice-to-Have" in disguise? Tell me exactly why I should cut it from V1.
2. Define the absolute minimum user flow from App Launch -> "Aha Moment" -> Goal Achieved.
3. What manual workaround can I use to avoid building a complex backend feature for V1?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your finalized, trimmed-down list of MVP Features here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [MoSCoW Prioritization Method](https://www.productplan.com/glossary/moscow-prioritization/)\n- [Y Combinator: How to Plan an MVP](https://www.ycombinator.com/library/4Q-a-guide-to-seed-fundraising)`,
  'mobilefuturefeatures': `# Future Features

**🕒 Estimated Time:** 10 min

---

## Overview
It hurts to cut features from your MVP. The "Future Features" list is your mental parking lot. Writing these ideas down allows you to stay focused on the MVP without feeling like you are abandoning your grand vision. Plus, keeping a roadmap helps you write a scalable database schema in Phase 2.

---

## Think First
Dump all the grand ideas you just cut from the MVP here:

**V2 Features** (Features you will build immediately after launching the MVP and fixing the initial bugs. e.g., Push Notifications, Social Sharing)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The "Dream" Features** (Features that require massive scale, AI, or tons of money. e.g., "An AI that automatically books your flights")
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Schema Preparation:** Even if you aren't building "Teams" or "Workspaces" for V1, you might want to design your database schema to support them later so you don't have to do a massive data migration in 6 months.

---

## Common Mistakes
- **Promising them too early:** Putting "Coming Soon" buttons all over your MVP. It makes the app look unfinished. Just leave the buttons out completely.
- **Building architecture for the dream:** Spending 3 weeks setting up a Kubernetes cluster because your "Dream Feature" requires it, even though your MVP only needs a simple Supabase instance.

---

## AI Prompt
Use AI to ensure your future vision doesn't accidentally ruin your MVP architecture.

\`\`\`prompt
Act as a Lead Mobile Architect.
Review my Future Features list above.

1. Which of these future features will require the most significant architectural change to my database or backend if I don't plan for them now?
2. Provide 1 piece of advice on how I should structure my initial database schema to make adding these features easier later.
3. Which of these "Dream" features is actually a distraction that I should completely forget about for the next 12 months?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Future Features list and the architectural advice here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [MoSCoW Prioritization Method](https://www.productplan.com/glossary/moscow-prioritization/)\n- [Y Combinator: How to Plan an MVP](https://www.ycombinator.com/library/4Q-a-guide-to-seed-fundraising)`,
  'mobilefeatureprioritization': `# Feature Prioritization

**🕒 Estimated Time:** 15 min

---

## Overview
You have a list of MVP features. Now you need to decide the exact order in which you will build them. If you build the easy UI stuff first, you might hit a massive technical roadblock on the core feature 3 weeks into development and have to abandon the project. In mobile, you must tackle the highest-risk features first.

---

## Think First
Evaluate your MVP list based on risk and value:

**High Risk / High Value** (Which feature is absolutely critical, but you have no idea how to code it yet? e.g., "Real-time location tracking")
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Low Risk / High Value** (Which feature is easy to build but provides massive value to the user? e.g., "A clean, native Apple Sign-In flow")
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Low Risk / Low Value** (What are the easiest things to build that don't really matter right now? e.g., "An 'About Us' screen")
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The "Spike":** A "spike" is a small, throwaway prototype you build just to prove you can do the hard part. Always do a spike on your High Risk features before building the rest of the app.
- **The Build Order:** Build the High Risk/High Value core first. Build the Auth and Onboarding last. (You can test the core app without Auth during development).

---

## Common Mistakes
- **Building the Login Screen First:** It feels productive, but you spend a week tweaking the UI of a login screen while ignoring the fact that you don't know how to build the actual app yet.
- **Building chronologically:** Just because a user sees the Welcome screen first doesn't mean you should build it first.

---

## AI Prompt
Use AI to generate a ruthlessly efficient sprint plan.

\`\`\`prompt
Act as a Technical Project Manager.
Review my risk/value feature inputs above.

1. Generate a step-by-step Build Order for my mobile app MVP.
2. Explicitly tell me what to build in Week 1 to eliminate the most technical risk.
3. Tell me which features I should push to the very end of the development cycle.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel, Stripe) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your step-by-step Build Order here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [MoSCoW Prioritization Method](https://www.productplan.com/glossary/moscow-prioritization/)\n- [Y Combinator: How to Plan an MVP](https://www.ycombinator.com/library/4Q-a-guide-to-seed-fundraising)`,
  'mobilemonetization': `# Monetization Strategy

**🕒 Estimated Time:** 15 min

---

## Overview
How will your app make money? On mobile, this is a much harder question than on desktop. App Store users are notorious for refusing to pay 'mobilemonetization': \`# Monetization Strategy

**🕒 Estimated Time:** 15 min

---

## Overview
How will your app make money? On mobile, this is a much harder question than on desktop. App Store users are notorious for refusing to pay $1.99 for an app, while simultaneously spending $5.00 on a coffee every morning. Additionally, Apple and Google take a 15-30% cut of all digital transactions processed through their stores. You must choose a model that fits your audience's psychology.

---

## Think First
Evaluate your app's core value:

**The Value Equation** (Is your app a "painkiller" that solves an urgent problem, or a "vitamin" that is nice to have?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Frequency of Use** (Will they open this once a year, or 5 times a day?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Competition's Model** (How do your competitors make money? Are they all free with ads, or are they all $9.99/month subscriptions?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The "Apple Tax":** If you sell a digital good or service (like a premium subscription or virtual coins), you MUST use Apple/Google's In-App Purchases (IAP) and give them 30%. If you sell physical goods (like ordering a pizza) or services rendered outside the app (like an Uber ride), you can use Stripe and avoid the 30% cut.
- **The Initial Hook:** Will you force users to pay before they can even see the main screen, or let them fall in love with the app first?

---

## Common Mistakes
- **Assuming Ads are Easy:** To make a living wage purely from banner ads, you need hundreds of thousands of daily active users.
- **Underpricing:** Selling a highly specialized B2B mobile tool for $0.99 because you are afraid to ask for $19.99/month.

---

## AI Prompt
Use AI to match your app with the most profitable, user-friendly model.

\`\`\`prompt
Act as a Mobile App Monetization Expert.
Review my app concept and the answers above.

1. Which monetization model (Free, Freemium, Subscription, Ads, One-time) is statistically the most successful for my specific app category?
2. If I use this model, how do I structure the "Paywall" so users don't instantly uninstall the app when they see it?
3. Does my app concept require me to pay the 30% App Store fee, or can I use Stripe?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like RevenueCat, Stripe, App Store Connect) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your chosen monetization model and paywall strategy here.

\`\`\`input
✍️ Type your answer here...
\`\`\`
.99 for an app, while simultaneously spending $5.00 on a coffee every morning. Additionally, Apple and Google take a 15-30% cut of all digital transactions processed through their stores. You must choose a model that fits your audience's psychology.

---

## Think First
Evaluate your app's core value:

**The Value Equation** (Is your app a "painkiller" that solves an urgent problem, or a "vitamin" that is nice to have?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Frequency of Use** (Will they open this once a year, or 5 times a day?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Competition's Model** (How do your competitors make money? Are they all free with ads, or are they all $9.99/month subscriptions?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The "Apple Tax":** If you sell a digital good or service (like a premium subscription or virtual coins), you MUST use Apple/Google's In-App Purchases (IAP) and give them 30%. If you sell physical goods (like ordering a pizza) or services rendered outside the app (like an Uber ride), you can use Stripe and avoid the 30% cut.
- **The Initial Hook:** Will you force users to pay before they can even see the main screen, or let them fall in love with the app first?

---

## Common Mistakes
- **Assuming Ads are Easy:** To make a living wage purely from banner ads, you need hundreds of thousands of daily active users.
- **Underpricing:** Selling a highly specialized B2B mobile tool for $0.99 because you are afraid to ask for 'mobilemonetization': \`# Monetization Strategy

**🕒 Estimated Time:** 15 min

---

## Overview
How will your app make money? On mobile, this is a much harder question than on desktop. App Store users are notorious for refusing to pay $1.99 for an app, while simultaneously spending $5.00 on a coffee every morning. Additionally, Apple and Google take a 15-30% cut of all digital transactions processed through their stores. You must choose a model that fits your audience's psychology.

---

## Think First
Evaluate your app's core value:

**The Value Equation** (Is your app a "painkiller" that solves an urgent problem, or a "vitamin" that is nice to have?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Frequency of Use** (Will they open this once a year, or 5 times a day?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Competition's Model** (How do your competitors make money? Are they all free with ads, or are they all $9.99/month subscriptions?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The "Apple Tax":** If you sell a digital good or service (like a premium subscription or virtual coins), you MUST use Apple/Google's In-App Purchases (IAP) and give them 30%. If you sell physical goods (like ordering a pizza) or services rendered outside the app (like an Uber ride), you can use Stripe and avoid the 30% cut.
- **The Initial Hook:** Will you force users to pay before they can even see the main screen, or let them fall in love with the app first?

---

## Common Mistakes
- **Assuming Ads are Easy:** To make a living wage purely from banner ads, you need hundreds of thousands of daily active users.
- **Underpricing:** Selling a highly specialized B2B mobile tool for $0.99 because you are afraid to ask for $19.99/month.

---

## AI Prompt
Use AI to match your app with the most profitable, user-friendly model.

\`\`\`prompt
Act as a Mobile App Monetization Expert.
Review my app concept and the answers above.

1. Which monetization model (Free, Freemium, Subscription, Ads, One-time) is statistically the most successful for my specific app category?
2. If I use this model, how do I structure the "Paywall" so users don't instantly uninstall the app when they see it?
3. Does my app concept require me to pay the 30% App Store fee, or can I use Stripe?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like RevenueCat, Stripe, App Store Connect) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your chosen monetization model and paywall strategy here.

\`\`\`input
✍️ Type your answer here...
\`\`\`
9.99/month.

---

## AI Prompt
Use AI to match your app with the most profitable, user-friendly model.

\`\`\`prompt
Act as a Mobile App Monetization Expert.
Review my app concept and the answers above.

1. Which monetization model (Free, Freemium, Subscription, Ads, One-time) is statistically the most successful for my specific app category?
2. If I use this model, how do I structure the "Paywall" so users don't instantly uninstall the app when they see it?
3. Does my app concept require me to pay the 30% App Store fee, or can I use Stripe?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like RevenueCat, Stripe, App Store Connect) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your chosen monetization model and paywall strategy here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [RevenueCat: State of Subscription Apps](https://www.revenuecat.com/state-of-subscription-apps/)\n- [Apple App Store: Monetization Guidelines](https://developer.apple.com/app-store/business-models/)`,
  'mobilefree': `# Completely Free

**🕒 Estimated Time:** 10 min

---

## Overview
A completely free app has no paywalls, no ads, and no premium tiers. This model is incredibly rare for indie developers because server costs (like Supabase, Firebase, or OpenAI API calls) add up quickly. However, it is the absolute best way to maximize growth, acquire users rapidly, and establish a dominant market position before introducing monetization later.

---

## Think First
Can you afford to be free?

**The Core Cost** (What is the most expensive API or server action in your app? E.g., uploading 4K video, hitting the GPT-4 API).
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Long Game** (How do you eventually plan to survive? E.g., selling the company, introducing a premium tier in V2, selling aggregated data?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Hard Limits:** Even if the app is free, you must hardcode limits. If a malicious user decides to upload 10,000 photos an hour, they will bankrupt your AWS/Supabase account.
- **The "Trojan Horse":** Is this free app just a lead-generation tool for your main, expensive desktop SaaS?

---

## Common Mistakes
- **Accidental Bankrupcy:** Not setting up billing alerts on your backend (Vercel/Supabase). If your free app goes viral on TikTok, your server bill could be $5,000 the next morning.
- **Being Afraid to Pivot:** Being so terrified of "betraying" your early free users that you never introduce a way to keep the servers running, causing the app to shut down.

---

## AI Prompt
Use AI to calculate your risk and set up defensive limits.

\`\`\`prompt
Act as a strict Cloud Infrastructure Architect.
I am launching a completely free mobile app.

1. Based on my app's core features, what is my biggest financial vulnerability if I suddenly get 10,000 users overnight?
2. What specific hard-coded limits should I implement in my React Native code and backend to protect myself?
3. Write a polite, transparent sentence I can put in the app to explain these limits to my users.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Supabase, Vercel) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your specific usage limits and financial safety strategy here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [RevenueCat: State of Subscription Apps](https://www.revenuecat.com/state-of-subscription-apps/)\n- [Apple App Store: Monetization Guidelines](https://developer.apple.com/app-store/business-models/)`,
  'mobilefreemium': `# Freemium

**🕒 Estimated Time:** 15 min

---

## Overview
Freemium is the dominant model in the App Store. The app is free to download and use, but "Premium" features or capacities are locked behind a paywall. The goal is to cast a wide net with the free version, letting users build a habit around your app, and then converting a small percentage (usually 2-5%) of them to paid users.

---

## Think First
Where do you draw the line?

**The Free Hook** (What core feature is so good that users will download it and use it daily, without paying?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Premium Pain Point** (At what exact moment will the user hit the limit and feel the urge to pull out their credit card?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Feature vs Capacity Limits:** Will you lock entire features (e.g., "Export to PDF is premium") or capacities (e.g., "Save 10 notes for free, unlimited notes is premium")? Capacity limits often convert better because the user has already proven they love the core feature.
- **RevenueCat:** You should absolutely use a tool like RevenueCat or Glassfy to handle the complex nightmare of Apple/Google in-app purchase receipts, rather than building it yourself.

---

## Common Mistakes
- **The Useless Free Version:** Making the free tier so restricted that users can't actually accomplish anything, leading to immediate uninstalls.
- **The Generous Free Version:** Giving away so much value for free that literally nobody feels the need to upgrade.

---

## AI Prompt
Use AI to find the perfect balance between free value and paid friction.

\`\`\`prompt
Act as a Mobile App Monetization Specialist.
Review my app concept.

1. Suggest a "Capacity Limit" Freemium structure (what do they get for free, and when do they hit the limit?).
2. Suggest a "Feature Limit" Freemium structure (which specific feature should be locked?).
3. Between those two options, which will convert better for my specific target audience, and why?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like RevenueCat) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your chosen Free/Premium dividing line here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [RevenueCat: State of Subscription Apps](https://www.revenuecat.com/state-of-subscription-apps/)\n- [Apple App Store: Monetization Guidelines](https://developer.apple.com/app-store/business-models/)`,
  'mobilesubscription': `# Subscription

**🕒 Estimated Time:** 15 min

---

## Overview
Subscriptions ($X per month/year) are the holy grail of mobile development. Apple heavily incentivizes developers to use this model because it generates recurring revenue. However, users are experiencing massive "subscription fatigue." To convince a user to pay you every single month, your app must provide continuous, renewing value, not just a static tool.

---

## Think First
Justify the recurring cost:

**The Continuous Value** (Why does this app deserve $5/month? Are you adding new content weekly? Does it use expensive AI processing? Does it save them money every month?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Trial Strategy** (Will you offer a 7-day free trial? A 3-day trial? No trial?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Annual vs Monthly:** Always offer an Annual plan at a massive discount compared to the Monthly plan. Users who subscribe annually are significantly more likely to forget to cancel, and you get the cash upfront to reinvest in marketing.
- **The Onboarding Paywall:** Many top grossing apps show the subscription paywall *immediately* during the onboarding flow, before the user even sees the home screen. It feels aggressive, but it mathematically converts higher.

---

## Common Mistakes
- **Charging a subscription for a static utility:** If your app is just a nice calculator, users will be furious if you ask for $4.99/month. That is a one-time purchase app.
- **Hiding the cancel button:** Apple will reject your app if the user cannot easily manage or cancel their subscription from within the app settings.

---

## AI Prompt
Use AI to design a high-converting, ethical subscription strategy.

\`\`\`prompt
Act as an iOS Subscription Revenue Optimizer.
Review my app concept.

1. Provide a compelling argument for *why* a user would pay for my app every single month. If my app doesn't fit a subscription model, tell me directly.
2. Suggest 3 pricing tiers (Monthly, Annual, and a "Lifetime" decoy price).
3. Draft the exact copy (headline and bullet points) for my Paywall screen to maximize conversion during the onboarding flow.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like RevenueCat) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Pricing Tiers and Paywall copy here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [RevenueCat: State of Subscription Apps](https://www.revenuecat.com/state-of-subscription-apps/)\n- [Apple App Store: Monetization Guidelines](https://developer.apple.com/app-store/business-models/)`,
  'mobileads': `# Ad-Supported

**🕒 Estimated Time:** 15 min

---

## Overview
The ad-supported model (using AdMob, AppLovin, or Unity Ads) allows your app to remain completely free while generating revenue from banner, interstitial, or rewarded video ads. While this sounds like a great compromise, the reality is that ad revenue requires massive scale. You are trading user experience for pennies per view.

---

## Think First
Evaluate your volume and user tolerance:

**The Session Length** (How long does a user stare at the screen per session? Long sessions = more ad impressions).
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Ad Format** (Will you use annoying pop-up Interstitials, subtle bottom Banners, or "Watch this video to unlock" Rewarded Ads?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Rewarded Video vs Forced Ads:** "Rewarded Ads" (where the user voluntarily watches a 30-second ad in exchange for an extra life or premium feature) have the highest payout rates and the highest user satisfaction. Forced pop-up ads have terrible payout rates and cause 1-star reviews.
- **The "Remove Ads" IAP:** Always offer a $2.99 or $4.99 In-App Purchase to remove all ads.

---

## Common Mistakes
- **Destroying the UX:** Placing banner ads right next to critical navigation buttons so users accidentally click them. Apple will reject your app for deceptive ad placement.
- **Expecting to get rich on 1,000 users:** Mobile ad CPMs (cost per 1,000 impressions) can be as low as $0.50. You need hundreds of thousands of sessions to make a full-time income.

---

## AI Prompt
Use AI to place ads ethically while maximizing revenue.

\`\`\`prompt
Act as a Mobile Ad Monetization Strategist.
Review my app concept.

1. Recommend the exact ad format (Banner, Interstitial, or Rewarded Video) that fits my app without destroying the user experience.
2. Where is the absolute best screen/moment in my app to show a "Rewarded Video" ad?
3. How much should I charge for the "Remove Ads" in-app purchase based on current App Store averages?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like Google AdMob) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Ad Format strategy and "Remove Ads" pricing here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [RevenueCat: State of Subscription Apps](https://www.revenuecat.com/state-of-subscription-apps/)\n- [Apple App Store: Monetization Guidelines](https://developer.apple.com/app-store/business-models/)`,
  'mobileonetimepurchase': `# One-time Purchase (Paid App)

**🕒 Estimated Time:** 10 min

---

## Overview
The classic software model: The user pays $4.99 upfront, downloads the app, and owns it forever. In today's App Store, this model is almost dead. Users are incredibly hesitant to pay for an app before they can try it. However, for certain niches (like indie games, specialized professional tools, or privacy-focused utilities), a one-time purchase is highly respected by users tired of subscriptions.

---

## Think First
Are you building a utility or an ongoing service?

**The "Done" State** (Is your app a complete, finished tool that won't require massive server costs or daily updates to function?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Upfront Promise** (Why would someone risk $5 on your app without trying it first? Do you have an amazing promotional video or massive social proof?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Paid Upfront vs "Freemium Unlock":** Instead of charging $4.99 upfront, it is almost always better to make the app free to download, let them poke around, and charge a $4.99 "Pro Lifetime Unlock" In-App Purchase. It achieves the exact same revenue model but drastically lowers the barrier to entry.

---

## Common Mistakes
- **High Server Costs:** Selling the app for 'mobileonetimepurchase': \`# One-time Purchase (Paid App)

**🕒 Estimated Time:** 10 min

---

## Overview
The classic software model: The user pays $4.99 upfront, downloads the app, and owns it forever. In today's App Store, this model is almost dead. Users are incredibly hesitant to pay for an app before they can try it. However, for certain niches (like indie games, specialized professional tools, or privacy-focused utilities), a one-time purchase is highly respected by users tired of subscriptions.

---

## Think First
Are you building a utility or an ongoing service?

**The "Done" State** (Is your app a complete, finished tool that won't require massive server costs or daily updates to function?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Upfront Promise** (Why would someone risk $5 on your app without trying it first? Do you have an amazing promotional video or massive social proof?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Paid Upfront vs "Freemium Unlock":** Instead of charging $4.99 upfront, it is almost always better to make the app free to download, let them poke around, and charge a $4.99 "Pro Lifetime Unlock" In-App Purchase. It achieves the exact same revenue model but drastically lowers the barrier to entry.

---

## Common Mistakes
- **High Server Costs:** Selling the app for $1.99 upfront, but the app relies on the OpenAI API. If a user uses the app heavily for 2 years, they will cost you $50 in API fees, bankrupting you. One-time purchase apps must rely entirely on the device's local processing (offline) to be profitable long-term.
- **No Refund Policy:** Users who buy a paid app and don't like it will instantly leave a 1-star review to warn others.

---

## AI Prompt
Use AI to decide if the upfront model will destroy your download metrics.

\`\`\`prompt
Act as an App Store Analytics Expert.
My app concept is a one-time purchase.

1. Tell me bluntly if this app concept will survive as a "Paid Upfront" app, or if I should switch to a "Free Download with a Lifetime Unlock IAP." Explain why.
2. If my app requires a server or API, calculate the financial risk of charging a one-time fee.
3. Suggest the optimal price point ($0.99, $4.99, $9.99, $19.99) for this specific type of utility.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like App Store Connect) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your final Pricing strategy (Paid Upfront vs Lifetime IAP) and Price Point here.

\`\`\`input
✍️ Type your answer here...
\`\`\`
.99 upfront, but the app relies on the OpenAI API. If a user uses the app heavily for 2 years, they will cost you $50 in API fees, bankrupting you. One-time purchase apps must rely entirely on the device's local processing (offline) to be profitable long-term.
- **No Refund Policy:** Users who buy a paid app and don't like it will instantly leave a 1-star review to warn others.

---

## AI Prompt
Use AI to decide if the upfront model will destroy your download metrics.

\`\`\`prompt
Act as an App Store Analytics Expert.
My app concept is a one-time purchase.

1. Tell me bluntly if this app concept will survive as a "Paid Upfront" app, or if I should switch to a "Free Download with a Lifetime Unlock IAP." Explain why.
2. If my app requires a server or API, calculate the financial risk of charging a one-time fee.
3. Suggest the optimal price point ($0.99, $4.99, $9.99, 'mobileonetimepurchase': \`# One-time Purchase (Paid App)

**🕒 Estimated Time:** 10 min

---

## Overview
The classic software model: The user pays $4.99 upfront, downloads the app, and owns it forever. In today's App Store, this model is almost dead. Users are incredibly hesitant to pay for an app before they can try it. However, for certain niches (like indie games, specialized professional tools, or privacy-focused utilities), a one-time purchase is highly respected by users tired of subscriptions.

---

## Think First
Are you building a utility or an ongoing service?

**The "Done" State** (Is your app a complete, finished tool that won't require massive server costs or daily updates to function?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Upfront Promise** (Why would someone risk $5 on your app without trying it first? Do you have an amazing promotional video or massive social proof?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Paid Upfront vs "Freemium Unlock":** Instead of charging $4.99 upfront, it is almost always better to make the app free to download, let them poke around, and charge a $4.99 "Pro Lifetime Unlock" In-App Purchase. It achieves the exact same revenue model but drastically lowers the barrier to entry.

---

## Common Mistakes
- **High Server Costs:** Selling the app for $1.99 upfront, but the app relies on the OpenAI API. If a user uses the app heavily for 2 years, they will cost you $50 in API fees, bankrupting you. One-time purchase apps must rely entirely on the device's local processing (offline) to be profitable long-term.
- **No Refund Policy:** Users who buy a paid app and don't like it will instantly leave a 1-star review to warn others.

---

## AI Prompt
Use AI to decide if the upfront model will destroy your download metrics.

\`\`\`prompt
Act as an App Store Analytics Expert.
My app concept is a one-time purchase.

1. Tell me bluntly if this app concept will survive as a "Paid Upfront" app, or if I should switch to a "Free Download with a Lifetime Unlock IAP." Explain why.
2. If my app requires a server or API, calculate the financial risk of charging a one-time fee.
3. Suggest the optimal price point ($0.99, $4.99, $9.99, $19.99) for this specific type of utility.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like App Store Connect) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your final Pricing strategy (Paid Upfront vs Lifetime IAP) and Price Point here.

\`\`\`input
✍️ Type your answer here...
\`\`\`
9.99) for this specific type of utility.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like App Store Connect) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your final Pricing strategy (Paid Upfront vs Lifetime IAP) and Price Point here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [RevenueCat: State of Subscription Apps](https://www.revenuecat.com/state-of-subscription-apps/)\n- [Apple App Store: Monetization Guidelines](https://developer.apple.com/app-store/business-models/)`,
  'mobilesuccessmetrics': `# Success Metrics

**🕒 Estimated Time:** 15 min

---

## Overview
How do you know if your MVP is actually good? In mobile, "Downloads" is a vanity metric. You can buy 10,000 downloads with ads, but if 9,900 people delete the app within 5 minutes, your app is a failure. Success metrics define the exact numbers you need to hit to prove your app has Product-Market Fit.

---

## Think First
Define what a "Win" looks like.

**The Primary Action** (What is the ONE action a user takes that proves they got value? E.g., Completing a workout, sending a message, saving a photo).
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Aha Timeline** (How fast should a user achieve that Primary Action after opening the app for the first time? 30 seconds? 5 minutes?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Analytics Provider:** You cannot track these metrics by guessing. You must integrate an analytics SDK. For mobile MVPs, **PostHog**, **Amplitude**, or **Firebase Analytics** are the industry standards.
- **Privacy Tradeoffs:** If you use strict privacy policies (e.g., Apple's App Tracking Transparency), many users will opt out of tracking, meaning your metrics will be partially blind.

---

## Common Mistakes
- **Tracking Everything:** Firing an analytics event every time the user scrolls or clicks a minor button. Your dashboard will be a chaotic mess. Only track the 3-5 actions that actually matter.
- **Ignoring the Funnel:** Knowing that 100 people downloaded the app and 10 created an account is useless unless you know *exactly which screen* the other 90 people closed the app on.

---

## AI Prompt
Use AI to set realistic, actionable goals for your launch.

\`\`\`prompt
Act as a Mobile Data Scientist.
Review my app concept and the Primary Action defined above.

1. Define the 3 most critical custom analytics "Events" I need to track in my React Native code (e.g., 'signup_completed', 'photo_uploaded').
2. Set a realistic benchmark for my "Onboarding Completion Rate" (What percentage of downloads should successfully finish the initial setup?).
3. What is the most dangerous "Vanity Metric" I should ignore?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like PostHog, Firebase) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your 3 Critical Analytics Events and your Onboarding Benchmark here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Mixpanel: Guide to Product Metrics](https://mixpanel.com/topics/product-metrics/)\n- [Amplitude: The Retention Playbook](https://amplitude.com/retention-playbook)`,
  'mobileretention': `# Retention

**🕒 Estimated Time:** 15 min

---

## Overview
Retention is the ultimate arbiter of truth in the App Store. Retention measures the percentage of users who return to your app on Day 1, Day 7, and Day 30 after installing it. If your Day 30 retention is near 0%, your app is a leaky bucket—spending money on marketing is entirely pointless until you fix the core experience.

---

## Think First
Why would they come back?

**The Core Loop** (What triggers the user to open the app again tomorrow? Is it a notification? A daily habit? A social obligation?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The D1 Drop-off** (If a user opens your app today, but deletes it tomorrow, what is the most likely reason why?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Push Notification Strategy:** Push notifications are the strongest tool for retention, but abusing them causes users to instantly uninstall. You must design notifications that are *valuable*, not just promotional.
- **Gamification vs Utility:** Will you use streaks, badges, or daily rewards to force retention, or will the raw utility of the app naturally bring them back?

---

## Common Mistakes
- **Focusing on Acquisition over Retention:** Spending thousands on ads while your Day 1 retention is 10%. You are literally burning money.
- **"We miss you" notifications:** Sending generic, desperate push notifications that say "Come back to the app!" Provide actual value (e.g., "Your daily report is ready").

---

## AI Prompt
Use AI to design a retention loop that keeps users hooked.

\`\`\`prompt
Act as a Mobile Growth & Retention Specialist.
Review my app concept.

1. Design a "Core Loop" that naturally brings the user back on Day 2 and Day 7.
2. Suggest 2 high-value Push Notifications I can send that the user will actually appreciate, rather than find annoying.
3. What is a realistic Day 1 and Day 30 retention benchmark for my specific category of app?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms (like OneSignal or Supabase Edge Functions) that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Core Loop strategy and Push Notification concepts here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Mixpanel: Guide to Product Metrics](https://mixpanel.com/topics/product-metrics/)\n- [Amplitude: The Retention Playbook](https://amplitude.com/retention-playbook)`,
  'mobiledau': `# DAU (Daily Active Users)

**🕒 Estimated Time:** 10 min

---

## Overview
DAU (Daily Active Users) measures the exact number of unique people who open your app on any given day. This is the heartbeat of highly interactive apps (like social media, games, or daily planners). However, not every app is meant to be used daily.

---

## Think First
Does your app demand daily attention?

**Daily Expectation** (Honestly, does your user *need* to use this app every single day? Why?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Is DAU the right metric?** If you are building an app to help people file their quarterly taxes, a low DAU is totally fine. Do not force daily mechanics (like arbitrary daily streaks) into an app that is fundamentally a weekly or monthly utility.

---

## Common Mistakes
- **Confusing DAU with Sessions:** If one person opens the app 50 times in one day, that is 50 Sessions, but only 1 DAU. DAU measures *people*, not clicks.

---

## AI Prompt
Use AI to evaluate if Daily Active Users is a metric you should obsess over.

\`\`\`prompt
Act as a Mobile Data Analyst.
Review my app concept.

1. Should DAU be my primary health metric, or is my app better measured by Weekly or Monthly activity? Explain why.
2. If DAU is important for my app, what specific feature can I add to the MVP to encourage a daily check-in habit?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your decision on whether DAU is your primary metric here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Mixpanel: Guide to Product Metrics](https://mixpanel.com/topics/product-metrics/)\n- [Amplitude: The Retention Playbook](https://amplitude.com/retention-playbook)`,
  'mobilemau': `# MAU (Monthly Active Users)

**🕒 Estimated Time:** 10 min

---

## Overview
MAU (Monthly Active Users) measures the number of unique people who open your app at least once in a 30-day period. Investors and App Store algorithms love MAU because it demonstrates the true, long-term footprint of your app. For many utilities (like travel booking, budgeting, or smart home management), MAU is the ultimate health indicator.

---

## Think First
How do you survive a 30-day gap?

**The Monthly Trigger** (What event happens in your user's life once a month that forces them to remember your app exists?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The DAU/MAU Ratio:** Dividing your DAU by your MAU gives you a percentage representing user "stickiness." (e.g., If DAU is 1,000 and MAU is 10,000, your stickiness is 10%). A ratio over 20% is considered excellent.

---

## Common Mistakes
- **Focusing only on downloads:** Bragging about "100,000 downloads" while your MAU is 500. This means your app is heavily marketed but fundamentally broken.

---

## AI Prompt
Use AI to design long-term engagement strategies.

\`\`\`prompt
Act as a Mobile Growth Hacker.
Review my app concept.

1. How can I increase my MAU by creating a monthly "trigger" or summary report (like Spotify Wrapped or a Monthly Budget Summary) that brings users back?
2. What is a healthy DAU/MAU ratio for my specific app category?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Monthly Trigger strategy and target DAU/MAU ratio here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Mixpanel: Guide to Product Metrics](https://mixpanel.com/topics/product-metrics/)\n- [Amplitude: The Retention Playbook](https://amplitude.com/retention-playbook)`,
  'mobilesessionduration': `# Session Duration

**🕒 Estimated Time:** 10 min

---

## Overview
Session Duration measures how long a user stares at your app from the moment they open it to the moment they background it. In the mobile world, longer is NOT always better. For a game or a social feed (TikTok), you want 30-minute sessions. For a utility app (Uber, Weather), a 30-minute session means your UI is incredibly confusing and broken.

---

## Think First
What is your ideal session length?

**The Quick Task** (If your app is a utility, how quickly should a power user be able to get in, accomplish their goal, and get out?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The Friction Goal:** If you are building a utility app, your goal is to *decrease* session duration in every update by removing clicks and speeding up API calls.

---

## Common Mistakes
- **Optimizing for the wrong metric:** Adding a mandatory 5-second intro animation to a calculator app just to keep users on the screen longer. You will be uninstalled immediately.

---

## AI Prompt
Use AI to optimize your app's intended session flow.

\`\`\`prompt
Act as a UX Performance Analyst.
Review my app concept.

1. What is the ideal Session Duration for my specific app? (e.g., 30 seconds? 5 minutes?)
2. If my sessions are currently running twice as long as the ideal, what are the top 3 UI bottlenecks I should investigate?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Ideal Session Duration and UX philosophy here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Mixpanel: Guide to Product Metrics](https://mixpanel.com/topics/product-metrics/)\n- [Amplitude: The Retention Playbook](https://amplitude.com/retention-playbook)`,
  'mobileprd': `# Product Requirements Document (PRD)

**🕒 Estimated Time:** 30 min

---

## Overview
A PRD (Product Requirements Document) is the master blueprint for your mobile app. Without a PRD, you will start coding in React Native, get lost in UI details, and realize 3 weeks later that you forgot to build a password reset flow. In the mobile world, the PRD also dictates which native device features (Camera, GPS, Push Notifications) you absolutely need.

---

## Think First
Consolidate everything from Phase 0:

**The One-Sentence Summary** (What is this app, who is it for, and why do they care?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Native Requirements** (List every hardware feature this app requires: e.g., Camera, Microphone, GPS, Push Notifications, Local Storage, Biometrics).
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The "Out of Scope" List** (What are 3 things you explicitly promise NOT to build in V1 to ensure you launch on time?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Offline First vs Cloud First:** Does the app need to function if the user is on an airplane without WiFi? If yes, your PRD must explicitly state that "Local Data Caching" is a core requirement, which drastically changes your architecture.
- **Cross-Platform Parity:** Will iOS and Android have the exact same features at launch? (Using React Native/Expo usually guarantees this, but native module bridging can sometimes cause discrepancies).

---

## Common Mistakes
- **Writing a 50-page essay:** A good MVP PRD is 2 pages long. It should be bullet points, not paragraphs.
- **Ignoring Edge Cases:** Failing to specify what happens when the user denies the camera permission prompt.

---

## AI Prompt
Use AI to generate a highly structured, technical PRD.

\`\`\`prompt
Act as a Senior Mobile Product Manager.
Review my inputs above and the decisions I made in Phase 0.

Generate a concise, bulleted Mobile MVP PRD containing:
1. Executive Summary
2. Core User Flows (Step-by-step from App Launch to Goal Achieved)
3. Native Device Requirements & Required Permissions
4. Non-Functional Requirements (e.g., Target load times, offline behavior)
5. Out of Scope (V2) Features
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms that AI cannot configure for you, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your finalized Mobile MVP PRD here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Y Combinator: How to Evaluate Startup Ideas](https://www.ycombinator.com/library/8g-how-to-get-startup-ideas)\n- [The Lean Canvas Guide](https://leanstack.com/lean-canvas)`,
  'mobileuserflows': `# User Flows

**🕒 Estimated Time:** 30 min

---

## Overview
A User Flow maps out the exact sequence of screens a user taps through to accomplish a goal. On a desktop website, users tolerate clicking through multiple pages. On mobile, every single tap causes a micro-drop in conversion. If it takes 7 taps to send a message, users will uninstall. You must map the shortest possible path to the "Aha!" moment.

---

## Think First
Map the journey tap-by-tap:

**The Onboarding Flow** (From tapping the app icon on the home screen -> Splash Screen -> Welcome -> Permissions -> Main Feed. How many screens is that?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Core Action Flow** (From the Main Feed -> Tapping the '+' button -> Filling out a form -> Success Screen. Map every single tap).
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Login Walls:** Will you force the user to create an account immediately upon opening the app (High Friction), or let them explore the app as a "Guest" and only ask for an account when they try to save data (Low Friction)?
- **Permission Timing:** Map exactly *when* the OS dialogue box for "Allow Notifications?" appears. It should never be on the first screen.

---

## Common Mistakes
- **The Dead End:** Designing a flow where a user completes a task (e.g., "Payment Successful") but there is no button to return to the home screen.
- **The Infinite Form:** Putting 15 text input fields on a single mobile screen. Split long forms into multiple "Wizard" steps (e.g., Step 1 of 3).

---

## AI Prompt
Use AI to ruthlessly optimize your screen sequences.

\`\`\`prompt
Act as a Lead Mobile UX Architect.
Review my User Flows above.

1. Rewrite my Core Action flow to reduce the number of required taps by at least 20%. Where can I use defaults, swipes, or auto-advancing to speed it up?
2. Design a "Deferred Registration" onboarding flow for my app. Tell me exactly what the user can do *before* being forced to create an account.
3. Identify the most likely "Drop-off Point" in these flows where a user might get frustrated and close the app.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your optimized User Flows here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Mobbin: Mobile UI/UX Patterns](https://mobbin.com/)\n- [Apple HIG: Navigation Interfaces](https://developer.apple.com/design/human-interface-guidelines/navigation)`,
  'appnavigation': `# App Navigation

**🕒 Estimated Time:** 20 min

---

## Overview
App Navigation is the skeleton of your mobile app. Unlike web browsers, mobile apps do not have a universal "Back" button or a URL bar. The navigation hierarchy you choose (Tabs, Drawers, Stacks) defines the mental model of the entire application. Getting this wrong makes the app feel like a maze.

---

## Think First
How will users move around?

**The Primary Destinations** (What are the 3 to 5 main areas of your app? e.g., Home, Search, Messages, Profile).
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Core Action** (Is there one action the user does constantly? e.g., posting a photo on Instagram, requesting a ride on Uber).
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Bottom Tab Bar vs Hamburger Menu:** The Bottom Tab Bar is the undisputed king of mobile navigation because it is reachable by the user's thumb. Hamburger Menus (side drawers) hide features and should only be used for secondary settings (like "Privacy Policy" or "Log Out").
- **The Floating Action Button (FAB):** If your app has one primary action (like composing a tweet), placing a giant button hovering over the bottom right of the screen is highly effective.

---

## Common Mistakes
- **Too Many Tabs:** Having 6 or 7 icons crammed into a bottom tab bar. Apple's HIG (Human Interface Guidelines) recommends a maximum of 5.
- **Deep Nesting:** Forcing the user to tap into a category, then a sub-category, then a sub-sub-category. By the time they get there, they have forgotten how to get back to the home screen.

---

## AI Prompt
Use AI to select the optimal React Navigation structure.

\`\`\`prompt
Act as a Mobile UX Architect specializing in React Navigation.
Review my Primary Destinations and Core Action above.

1. Recommend the optimal Navigation Structure for my app (e.g., A Bottom Tab Navigator containing 4 tabs, with a Stack Navigator inside each tab).
2. What should the exact 4 or 5 icons in my Bottom Tab Bar be?
3. Should I use a Floating Action Button (FAB) or a prominent central tab for my Core Action?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your exact Navigation Hierarchy (Tabs, Stacks, Modals) here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Mobbin: Mobile UI/UX Patterns](https://mobbin.com/)\n- [Apple HIG: Navigation Interfaces](https://developer.apple.com/design/human-interface-guidelines/navigation)`,
  'mobilewireframes': `# Wireframes

**🕒 Estimated Time:** 45 min

---

## Overview
Wireframes are the raw blueprints of your screens. They strip away colors, logos, and fonts, forcing you to focus entirely on layout, button placement, and hierarchy. On a mobile screen, real estate is extremely limited. If you jump straight into designing a beautiful UI without wireframing, you will likely create something pretty but unusable.

---

## Think First
Visualize the skeleton of your most important screens:

**The "Home/Feed" Screen** (What is at the very top? What is in the middle? Where is the main call to action?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The "Detail/Action" Screen** (When they tap an item on the home screen, what does the detail view look like? Where is the "Back" button? Where is the "Submit/Buy" button?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The Thumb Zone:** 75% of mobile users rely entirely on their thumb to navigate. Critical actions (like "Buy" or "Next") must be placed in the bottom half of the screen. The top left corner is the hardest place to reach.
- **Scroll vs Pagination:** Will your lists scroll infinitely vertically (like TikTok/Twitter), or require swiping horizontally through a carousel?

---

## Common Mistakes
- **Tiny Tap Targets:** Designing buttons that look great on a 27-inch monitor but are impossible to tap with a thumb on a physical phone. Apple recommends a minimum tap target of 44x44 points.
- **Ignoring the Keyboard:** Forgetting that when a user taps a text input, the native keyboard pops up and covers the bottom 50% of the screen. You must ensure the "Submit" button isn't hidden behind the keyboard.

---

## AI Prompt
Use AI to generate text-based layout structures for your core screens.

\`\`\`prompt
Act as a Lead Mobile UI Designer.
Review my screen concepts above.

For my 3 most critical screens (Home, Detail, and Core Action Form), provide a "Text Wireframe."
Format it strictly top-to-bottom as the user sees it on a phone screen.
Example:
[Header: Title + Settings Icon]
[Horizontal Scroll Carousel: Featured Items]
[List View: Recent Activity]
[Sticky Bottom Button: "Create New"]

Ensure all critical actions are placed in the ergonomic "Thumb Zone."
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your 3 Text Wireframes here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Nielsen Norman: Empty States in UI Design](https://www.nngroup.com/articles/empty-states/)\n- [Material Design: Communication & Error States](https://m3.material.io/components)`,
  'mobiledesignsystem': `# Design System

**🕒 Estimated Time:** 30 min

---

## Overview
A Design System is a collection of reusable components (buttons, text inputs, cards) and rules (colors, spacing, typography). In mobile development (React Native), a design system is what separates a premium app from a cheap prototype. If you hardcode a different shade of blue on every screen, your app will feel chaotic.

---

## Think First
Establish your rules:

**The Primary Action Color** (What is the exact hex code of your main "Submit/Buy/Next" buttons? It should stand out from everything else).
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Typography Strategy** (Are you using the system default fonts—San Francisco for iOS, Roboto for Android—or a custom Google font like Inter or Poppins?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Corner Radius** (Are your buttons and cards sharp and serious (0px radius), slightly rounded and modern (8px radius), or fully pill-shaped and playful (99px radius)?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Dark Mode Support:** Mobile users *expect* dark mode. Your design system must define a "Light" semantic palette and a "Dark" semantic palette from Day 1. If you try to hack dark mode in later, it will take weeks.
- **UI Frameworks:** Will you build all components from scratch using React Native \`StyleSheet\

## 📚 Context Links
- [Material 3 Design System](https://m3.material.io/)\n- [Apple HIG: Accessibility Guide](https://developer.apple.com/design/human-interface-guidelines/accessibility)\`, or use a pre-built component library like NativeWind (Tailwind for RN), Tamagui, or React Native Paper? (NativeWind is highly recommended for speed).

---

## Common Mistakes
- **Too Many Font Sizes:** Using 15 different font sizes across the app. You only need 5: H1, H2, H3, Body, and Caption.
- **Low Contrast:** Using light gray text on a white background. Users will literally not be able to read it if they are outside in the sun.

---

## AI Prompt
Use AI to generate a complete React Native design token system.

\`\`\`prompt
Act as a Design Systems Engineer for a React Native app.
Review my style preferences above.

1. Generate a standardized Color Palette including Primary, Secondary, Background (Light/Dark), Surface (Light/Dark), Error, and Text colors. Provide exact Hex codes.
2. Define a standard spacing/padding scale (e.g., xs: 4px, sm: 8px, md: 16px, lg: 24px).
3. Recommend a UI Component Library (e.g., NativeWind, Tamagui, Gluestack) that best fits a fast MVP workflow, and explain why.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Color Palette, Spacing Scale, and UI Framework decision here.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,
  'mobilebranding': `# Branding

**🕒 Estimated Time:** 20 min

---

## Overview
In the App Store, branding is everything. You have roughly 3 seconds to convince a user scrolling past your app icon to stop and click. Your app's name, icon, and tone of voice must instantly communicate trust and purpose. A poorly designed app icon is the #1 reason for low download conversion rates.

---

## Think First
Define your identity:

**The App Name** (Is it literal like "Sleep Tracker", or abstract like "Aura"? Literal names rank better for ASO, abstract names build stronger long-term brands).
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The App Icon Concept** (What is the single, central glyph or symbol on your app icon? Keep it incredibly simple. Don't put text in the icon).
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Tone of Voice** (How does the app speak to the user in popups and alerts? Formal and secure? Playful and encouraging? Snarky?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **App Icon Contrast:** Your app icon will sit on user's home screens against thousands of different wallpapers. It must have high contrast and stand out against both light and dark backgrounds.
- **The "Splash Screen":** When the app launches, it takes 1-2 seconds to load. The Splash screen should feature your brand logo seamlessly transitioning into the main app UI.

---

## Common Mistakes
- **Words in the App Icon:** Putting your app's name inside the 1024x1024 app icon. When scaled down to a 40x40 pixel square on a phone screen, text becomes illegible smudge.
- **Inconsistent Voice:** Having playful, fun marketing copy on the App Store, but robotic, technical error messages ("Error 404: Null pointer exception") inside the app.

---

## AI Prompt
Use AI to refine your brand identity and App Store presence.

\`\`\`prompt
Act as a Mobile Brand Strategist.
Review my App Name, Icon Concept, and Tone of Voice above.

1. Evaluate my App Name for App Store Optimization (ASO). Does it need a subtitle modifier? (e.g., "Aura: Sleep Tracker").
2. Give me 3 highly visual, simple concepts for my App Icon that will stand out against a dark wallpaper.
3. Write an example of a "Welcome" push notification using my app's specific Tone of Voice.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your finalized App Name, Icon Concept, and Tone of Voice example here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Material 3 Design System](https://m3.material.io/)\n- [Apple HIG: Accessibility Guide](https://developer.apple.com/design/human-interface-guidelines/accessibility)`,
  'mobileaccessibility': `# Accessibility

**🕒 Estimated Time:** 15 min

---

## Overview
Accessibility (a11y) ensures your mobile app is usable by everyone, including people with visual, motor, or auditory impairments. Beyond being an ethical obligation (and in many countries, a legal one), iOS and Android have powerful built-in accessibility features like VoiceOver and TalkBack. If your app doesn't support them, a massive segment of users cannot use your product.

---

## Think First
Evaluate your UI for common barriers:

**Color Reliance** (Are there places where color is the *only* way information is conveyed? e.g., A red outline on an invalid text box without an error message below it).
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Dynamic Type** (If a user has their phone's system font size set to "Huge" because of poor vision, will your app's UI completely break and overlap?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Touch Targets:** Are all interactive buttons at least 44x44 points (iOS) or 48x48 dp (Android)? Small buttons are impossible for users with motor tremors to tap.
- **Contrast Ratios:** Do your text and background colors meet the WCAG AA standard of 4.5:1 contrast?

---

## Common Mistakes
- **Ignoring Screen Readers:** Using a custom-built, animated "Checkbox" component in React Native but forgetting to add \`accessible={true}\` and an \`accessibilityLabel\`. VoiceOver will just read it as "Button," leaving blind users completely lost.
- **Disabling System Scaling:** Hardcoding font sizes with \`allowFontScaling={false}\` in React Native because you want to "preserve your design." This infuriates users who need larger text.

---

## AI Prompt
Use AI to audit your app for critical accessibility failures.

\`\`\`prompt
Act as a Mobile Accessibility (a11y) Expert.
I am building a React Native mobile app.

1. Provide a checklist of the 5 absolute most important accessibility props I must include on my React Native components (e.g., TextInput, TouchableOpacity, Image).
2. Explain how I should handle "Dynamic Type" (user-enlarged font sizes) so my layout doesn't break, without hard-locking the font size.
3. How do I test VoiceOver/TalkBack on my physical device during development?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your React Native Accessibility Checklist here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Material 3 Design System](https://m3.material.io/)\n- [Apple HIG: Accessibility Guide](https://developer.apple.com/design/human-interface-guidelines/accessibility)`,
  'mobileemptystates': `# Empty States

**🕒 Estimated Time:** 15 min

---

## Overview
An Empty State occurs when a screen has no data to display. This happens to every single user on Day 1 (e.g., zero messages, zero saved items, zero completed workouts). If your app just shows a blank white screen, users will assume the app is broken or frozen. Empty States are your most powerful opportunity to drive user action.

---

## Think First
Identify the dead zones in your app:

**The Primary Feed/Dashboard** (What does the main screen look like the very first time they log in?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Search/Filter Results** (What happens when they search for something that doesn't exist?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The Call to Action (CTA):** Every single empty state MUST have a button telling the user exactly what to do next. An empty "Saved Items" screen shouldn't just say "No items saved." It should say "No items saved" with a large button that says "Browse Items."
- **Educational Illustrations:** Mobile empty states are the perfect place for a beautiful, simple illustration that explains the feature's value.

---

## Common Mistakes
- **The "No Data Found" text:** Showing a raw database response string like \`[]\` or a tiny, unstyled "No Data Found" in the top left corner.
- **Dead Ends:** Showing a nice illustration, but providing no button or link to actually generate data. The user is stuck.

---

## AI Prompt
Use AI to design high-converting empty states.

\`\`\`prompt
Act as a Mobile Product Designer.
Review my Primary Feed and Search functions.

1. Write the Headline, Body Copy, and Call-to-Action (CTA) button text for the "Day 1 Empty State" of my main feed. It should be highly encouraging and tell them exactly how to get started.
2. Write the copy for my "Zero Search Results" empty state. How can I help them recover from a bad search instead of just saying "Not found"?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Empty State copy and CTA strategies here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Nielsen Norman: Empty States in UI Design](https://www.nngroup.com/articles/empty-states/)\n- [Material Design: Communication & Error States](https://m3.material.io/components)`,
  'mobileerrorstates': `# Error States

**🕒 Estimated Time:** 15 min

---

## Overview
Mobile devices lose internet connection constantly. They switch from WiFi to 5G, they go through tunnels, and their batteries die. If your app doesn't handle these network failures gracefully, the app will crash, and the user will delete it. Error states must be designed as carefully as your "happy path."

---

## Think First
Plan for disaster:

**The Offline Scenario** (What happens if the user opens your app while on Airplane mode?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The API Timeout** (What happens if your backend database is slow and takes 15 seconds to respond? Does the app freeze?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Form Error** (What happens if they type an invalid email address and hit submit?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Toast Notifications vs Modals:** Will you show non-critical errors as a temporary pop-up at the bottom of the screen (a Toast), or a blocking alert box (a Modal) that forces them to tap "OK"? (Toasts are far superior for minor network glitches).
- **Graceful Degradation:** Can you show cached data from their last session instead of a giant "No Internet" screen?

---

## Common Mistakes
- **Raw API Errors:** Showing the user an alert box that says \`[AxiosError: Network Error 500]\`. Users don't know what Axios is. Say "We couldn't connect to our servers. Please try again."
- **Blaming the User:** Writing aggressive copy like "You entered the wrong password." Use passive, helpful copy like "That password didn't match our records."

---

## AI Prompt
Use AI to design resilient error handling for mobile environments.

\`\`\`prompt
Act as a Senior React Native Engineer.
I am designing my app's error states.

1. Write the exact user-facing copy for a "No Internet Connection" error state. Include a CTA button.
2. Explain the difference between a "Toast", a "Modal Alert", and an "Inline Error". Give me a strict rule on when to use each in my mobile app.
3. How should I handle an API timeout so the app doesn't appear frozen?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Error State copy and UI rules (Toasts vs Modals) here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Nielsen Norman: Empty States in UI Design](https://www.nngroup.com/articles/empty-states/)\n- [Material Design: Communication & Error States](https://m3.material.io/components)`,
  'mobileloadingstates': `# Loading States

**🕒 Estimated Time:** 15 min

---

## Overview
Nobody likes waiting. On mobile, if a screen is blank for more than 2 seconds, the user assumes the app has crashed and will force-quit it. Loading states (spinners, progress bars, skeletons) are psychological tools used to make the app *feel* faster than it actually is by providing immediate visual feedback.

---

## Think First
Identify your slowest actions:

**The Initial App Load** (What does the user see during the 1-3 seconds it takes for React Native to boot up and fetch the initial database payload?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Action Load** (When they hit "Submit" on a heavy API call like uploading an image, what visual feedback do they get so they don't hit the button 5 times in a row?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Skeleton Screens vs Spinners:** A "Skeleton" (gray blocks flashing where text and images *will* be) is the modern standard for loading entire screens. A spinner (activity indicator) should only be used for small, localized actions like submitting a button.
- **Optimistic UI:** Can you fake the speed? (e.g., When a user "Likes" a post, instantly turn the heart red on the UI, and do the actual database update silently in the background).

---

## Common Mistakes
- **Blocking the UI:** Using a giant, full-screen transparent gray overlay with a spinner every time an API call happens, preventing the user from scrolling or doing anything else.
- **Button Double-Taps:** Failing to disable a "Submit" button while it is loading, causing the user to accidentally create 4 identical accounts because they tapped the button 4 times.

---

## AI Prompt
Use AI to design psychological speed optimizations.

\`\`\`prompt
Act as a Mobile UX Performance Specialist.
Review my loading scenarios.

1. Explain exactly how I should design a "Skeleton Loader" for my main feed to make the app feel 2x faster.
2. What is "Optimistic UI Updates" in React Native? Give me one example of how I can use it in my app to completely hide a loading state from the user.
3. How should I handle the loading state on my primary "Submit" button to prevent double-submissions?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Loading State strategies (Skeletons, Optimistic UI, Button states) here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Nielsen Norman: Empty States in UI Design](https://www.nngroup.com/articles/empty-states/)\n- [Material Design: Communication & Error States](https://m3.material.io/components)`,
  'mobileplatformstrategy': `# Platform Strategy

**🕒 Estimated Time:** 15 min

---

## Overview
Before you choose a coding language, you must decide *where* your app will live. Building for iOS vs Android vs Web involves entirely different ecosystems, review processes, and revenue splits. A bad platform strategy means you spend 6 months building an app only to realize Apple won't approve it, or your target audience doesn't use iPhones.

---

## Think First
Where are your users?

**The Target OS** (Is your target demographic primarily using high-end iPhones in the US, or budget Android devices globally?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Web Fallback** (Does this app *have* to be downloaded from an App Store to provide value, or would a mobile-friendly website work just as well?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **iOS First vs Cross-Platform:** Historically, startups built for iOS first because iPhone users spend significantly more money. Today, cross-platform tools (like React Native) allow you to deploy to both iOS and Android from a single codebase, making "iOS First" largely obsolete for most apps.
- **The App Store Review:** Apple's review process is notoriously strict. If your app relies on highly controversial content, real-money gambling, or scraping third-party APIs without permission, Apple will reject it. You might need to pivot to a Progressive Web App (PWA).

---

## Common Mistakes
- **Building Native Swift/Kotlin for an MVP:** Hiring two separate teams (one for iOS Swift, one for Android Kotlin) to build a basic MVP. This doubles your cost and doubles your time to market.
- **Ignoring the Web:** Refusing to build a landing page because "it's a mobile app." You still need a web presence for marketing and SEO.

---

## AI Prompt
Use AI to sanity-check your platform assumptions.

\`\`\`prompt
Act as a Mobile Platform Strategist.
Review my app concept: [Insert App Concept]

1. Based on my concept, are there any obvious App Store Guidelines (Apple or Google) that might get my app rejected?
2. What is the demographic split of iOS vs Android users for my specific target audience?
3. Would a Progressive Web App (PWA) be a smarter MVP than a native App Store app for this concept?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Platform Strategy (e.g., Cross-platform React Native, iOS only) here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Expo Documentation](https://docs.expo.dev/)\n- [React Native vs Flutter Comparison](https://www.appcues.com/blog/react-native-vs-flutter)`,
  'mobilefundamentals': `# Mobile Fundamentals

**🕒 Estimated Time:** 20 min

---

## Overview
If you are coming from Web Development (React, HTML, CSS), mobile development will shock you. Mobile apps do not have URLs you can just refresh. They run in sandboxed environments, they have to be compiled into binary files (.ipa or .apk), and they are subject to the OS killing them if they use too much RAM. You must understand these fundamental constraints.

---

## Think First
Adjust your mental model:

**The Update Cycle** (On the web, you push code and users see it instantly. On mobile, you submit an update, wait 24 hours for Apple to approve it, and then hope the user actually downloads the update. How does this change how you handle bugs?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **App Lifecycle:** You must handle what happens when your app goes into the "Background" (the user minimizes it) and comes back to the "Foreground." If you were playing audio or maintaining an active socket connection, the OS will likely kill it.
- **Permissions:** Unlike the web where you can just ask for location in the browser, mobile requires explicit, legally binding permission prompts for Camera, Location, Push Notifications, and Photo Library access. If the user hits "Deny", you must handle that gracefully.

---

## Common Mistakes
- **Assuming Instant Updates:** Pushing a breaking API change to your backend, forgetting that 40% of your users are still running a 3-month-old version of your mobile app. Their apps will instantly crash.
- **Memory Leaks:** Rendering 10,000 images in a list without recycling components. On a desktop browser, it might just stutter. On a mobile phone, the OS will terminate your app for using too much memory.

---

## AI Prompt
Use AI to learn how to defend against mobile constraints.

\`\`\`prompt
Act as a Senior Mobile Systems Architect.
I am coming from a Web Development background.

1. Explain the "App Lifecycle" (Foreground, Background, Inactive, Terminated) and how it affects background tasks like downloading a large file.
2. How do I force users to update my app if I deploy a critical security fix?
3. What is "Over-the-Air" (OTA) updating in React Native, and how does it bypass the App Store review process?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your notes on App Lifecycle and OTA updating here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Expo Documentation](https://docs.expo.dev/)\n- [React Native vs Flutter Comparison](https://www.appcues.com/blog/react-native-vs-flutter)`,
  'mobiletechstackselection': `# Tech Stack Selection

**🕒 Estimated Time:** 20 min

---

## Overview
Your Tech Stack is the foundation of your app. For modern mobile MVPs, there are really only three viable options: React Native (via Expo), Flutter, or Swift/Kotlin (Native). Making the wrong choice here means entirely rewriting your app in 6 months. For 95% of builders, React Native with Expo is the undisputed winner because it allows web developers to build iOS and Android apps using JavaScript/TypeScript.

---

## Think First
What are your team's skills?

**Your Current Knowledge** (Do you already know React/JavaScript? Do you know Dart? Do you know Swift?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Hardware Limit** (Does your app require extremely low-level hardware access, like custom Bluetooth drivers or ARKit?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Expo vs Bare React Native:** You should almost certainly use **Expo**. Historically, Expo was limiting because it didn't support custom native code. Today, with Expo Prebuild (Continuous Native Generation), Expo supports literally everything Bare React Native does, but handles all the painful Xcode/Android Studio configuration for you.
- **Flutter vs React Native:** Flutter (by Google) uses Dart and has incredible UI performance. React Native (by Meta) uses JavaScript and has the largest ecosystem of third-party libraries in the world. Choose React Native unless you specifically want to learn Dart.

---

## Common Mistakes
- **Ejecting from Expo:** Hitting a minor native module issue and instantly "ejecting" from Expo to Bare React Native. Once you eject, you are responsible for maintaining complex iOS/Android build configurations forever. Use Expo Development Builds instead.
- **Choosing Native for a CRUD App:** Building a simple "To-Do List" app using Swift and Kotlin natively. You are wasting massive amounts of time for zero performance gain.

---

## AI Prompt
Use AI to finalize your stack and justify the decision.

\`\`\`prompt
Act as a Mobile Tech Lead.
Review my app concept.

1. Confirm if React Native with Expo is sufficient for my app's specific hardware requirements. Are there any known limitations?
2. What are the specific trade-offs if I chose Flutter instead of React Native for this project?
3. If I use React Native, should I use TypeScript or stick to plain JavaScript for an MVP? Why?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your finalized Tech Stack (e.g., React Native + Expo + TypeScript) here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Expo Documentation](https://docs.expo.dev/)\n- [React Native vs Flutter Comparison](https://www.appcues.com/blog/react-native-vs-flutter)`,
  'mobilestatemanagement': `# State Management

**🕒 Estimated Time:** 20 min

---

## Overview
State Management is how your app remembers things. When a user logs in on the Profile tab, the Home tab needs to instantly "know" they are logged in and show their username. If your state management is messy, your app will suffer from infinite re-renders, sluggish UI, and phantom bugs where the screen doesn't update when data changes.

---

## Think First
Analyze the data flow:

**Global vs Local** (What data needs to be accessed globally by every screen? e.g., The User Object, The Shopping Cart. What data only matters to one screen? e.g., The text typed in a search bar).
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The Server State:** Data fetched from your backend (e.g., a list of posts) should NOT be stored in a global Redux store. It should be managed by a data-fetching library like **React Query** or **SWR**, which handles caching, loading states, and automatic refetching for you.
- **The Client State:** For lightweight global state (e.g., is dark mode on? is the user logged in?), use a modern, boilerplate-free library like **Zustand**. Avoid Redux unless you are building a massive enterprise application.
- **Local State:** Use standard \`useState\` and \`useReducer\` for things that don't need to leave the current component.

---

## Common Mistakes
- **The React Context Trap:** Using React Context for everything. React Context forces every component that consumes it to re-render whenever *anything* in the context changes. This destroys mobile performance.
- **Prop Drilling:** Passing a user ID down through 6 layers of nested components instead of just pulling it from global state when needed.

---

## AI Prompt
Use AI to select your specific state libraries.

\`\`\`prompt
Act as a Senior React Native Architect.
I need to choose a state management stack.

1. Compare Zustand vs Redux Toolkit for managing "Client State" in a mobile MVP. Which do you recommend and why?
2. Explain why "Server State" (like fetching data from an API) should be separated from Client State, and recommend a library for handling Server State.
3. Write a small code example showing how I would structure a Zustand store to hold the user's authentication status.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your chosen State Management stack (e.g., Zustand + React Query) here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [React Query: Data Fetching in React](https://tanstack.com/query/latest)\n- [Supabase: Open Source Firebase Alternative](https://supabase.com/docs)\n- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)`,
  'mobileapistrategy': `# API Strategy

**🕒 Estimated Time:** 15 min

---

## Overview
Your mobile app is essentially a highly interactive display for your API. How your app talks to your backend dictates its perceived speed and reliability. Mobile networks drop constantly, so your API strategy must account for retries, caching, and minimizing payload sizes to save the user's cellular data.

---

## Think First
How chatty is your app?

**The Data Volume** (Are you fetching a 5KB JSON object with a user's name, or a 50MB array of high-res images?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Real-time vs Static** (Does a messaging screen need to update instantly via WebSockets, or is it okay if the user pulls-to-refresh to see new data?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **REST vs GraphQL:** REST is the industry standard and easier to cache. GraphQL is incredibly powerful for mobile because it prevents "over-fetching"—you ask the server for exactly the fields you need, saving precious mobile bandwidth.
- **Backend-as-a-Service (BaaS):** If you use Supabase or Firebase, you don't even need to build a traditional API. You can query the database directly from your React Native code using their SDKs, which handle WebSockets and real-time updates automatically.

---

## Common Mistakes
- **Waterfall Requests:** Fetching the User Object, waiting for it to finish, then using the User ID to fetch their Posts, waiting for it to finish, then fetching the Post Comments. The screen will be loading for 5 seconds. Use \`Promise.all\` to fetch parallel requests simultaneously.
- **Ignoring Pagination:** Fetching all 10,000 items in a database table at once instead of fetching the first 20 and using an "Infinite Scroll" list.

---

## AI Prompt
Use AI to design an efficient data fetching architecture.

\`\`\`prompt
Act as a Backend-to-Mobile Integration Expert.
Review my app concept.

1. For my MVP, should I build a traditional REST API, use GraphQL, or use a BaaS SDK like Supabase/Firebase? Explain the specific bandwidth and speed advantages for mobile.
2. How do I implement "Infinite Scrolling" (pagination) for my main feed to avoid crashing the app with massive payloads?
3. Give me an example of how to use React Query to cache my API responses so the app feels instant on the second open.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your API and Data Fetching Strategy here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [React Query: Data Fetching in React](https://tanstack.com/query/latest)\n- [Supabase: Open Source Firebase Alternative](https://supabase.com/docs)\n- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)`,
  'mobilelocalstorage': `# Local Storage

**🕒 Estimated Time:** 15 min

---

## Overview
Unlike a web browser that relies entirely on the cloud, a mobile phone has gigabytes of highly secure, blazing-fast local storage. You must use local storage to save user preferences, authentication tokens, and cached data so the app can boot up instantly even when the phone is in airplane mode.

---

## Think First
What needs to survive an app restart?

**Security Requirements** (Are you saving a simple "Dark Mode = True" preference, or a highly sensitive JWT Authentication token?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **AsyncStorage vs SecureStore:**
  - For non-sensitive data (like theme preferences or cached JSON), use \`AsyncStorage\` (or faster alternatives like \`MMKV\`).
  - For sensitive data (like passwords, auth tokens, or API keys), you MUST use \`expo-secure-store\

## 📚 Context Links
- [React Query: Data Fetching in React](https://tanstack.com/query/latest)\n- [Supabase: Open Source Firebase Alternative](https://supabase.com/docs)\n- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)\`, which encrypts the data using the device's native Keychain (iOS) or Keystore (Android).
- **High-Performance Storage:** If you are building a data-heavy app that needs to search through thousands of records offline, AsyncStorage is too slow. You will need a local SQLite database or a high-performance key-value store like MMKV.

---

## Common Mistakes
- **Storing Auth Tokens in AsyncStorage:** This is a massive security vulnerability. If the phone is compromised, hackers can extract the raw text token. Always use SecureStore for auth.
- **Hitting Storage on Every Render:** Local storage is fast, but it is still asynchronous. If you read from AsyncStorage inside a React component's render cycle without caching it in memory (state), your app will stutter violently.

---

## AI Prompt
Use AI to select the right storage mechanisms for your specific data.

\`\`\`prompt
Act as a React Native Security and Performance Expert.

1. I need to store the following items locally: A user's JWT auth token, their theme preference (dark/light), and a cached list of their 50 most recent messages.
2. Recommend the exact React Native/Expo libraries I should use for each of those 3 items (e.g., SecureStore, MMKV, SQLite).
3. Write a code snippet showing the correct way to read from SecureStore when the app boots up, without blocking the UI.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your chosen Local Storage libraries and strategy here.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,
  'mobileauthentication': `# Authentication

**🕒 Estimated Time:** 20 min

---

## Overview
Authentication on mobile is uniquely frustrating. Users hate typing passwords on tiny keyboards. Furthermore, Apple has a strict rule: If your app offers third-party logins (like Google or Facebook), you MUST also offer "Sign in with Apple." If you don't, Apple will reject your app during the review process.

---

## Think First
Reduce friction at the front door:

**The Login Methods** (Will you support Email/Password, Magic Links, Google, Apple, or Phone Number/SMS?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Social Auth (OAuth):** Adding "Sign in with Google" and "Sign in with Apple" dramatically increases your signup conversion rate because it's a one-tap process. However, configuring the OAuth certificates in Xcode and Android Studio is notoriously difficult.
- **Authentication Provider:** Do not build your own authentication system (hashing passwords, managing sessions, sending password reset emails). Use an Auth Provider like **Supabase Auth**, **Firebase Auth**, or **Clerk**. They handle all the heavy lifting and security compliance for you.
- **Biometrics:** You can use Expo's \`LocalAuthentication\` module to let users unlock the app using FaceID or Fingerprint instead of typing a PIN.

---

## Common Mistakes
- **Forgetting "Sign in with Apple":** The #1 reason for app rejection. If you have Google login, you must have Apple login.
- **Forcing Login Too Early:** Showing the login screen before the user has any idea what the app does. Let them see a preview or onboarding carousel first.

---

## AI Prompt
Use AI to design a compliant, high-converting Auth flow.

\`\`\`prompt
Act as a Mobile Authentication Architect.
I am using Expo and [Insert Auth Provider, e.g., Supabase].

1. I want to offer Email/Password and Google OAuth. Explain Apple's mandatory "Sign in with Apple" rule and how it applies to me.
2. Walk me through the high-level flow of how a JWT token is received from the Auth Provider and securely stored on the device using expo-secure-store.
3. How do I design a React Navigation flow that automatically redirects the user to the Login screen if their token expires?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your chosen Auth Provider and Login Methods here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [React Query: Data Fetching in React](https://tanstack.com/query/latest)\n- [Supabase: Open Source Firebase Alternative](https://supabase.com/docs)\n- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)`,
  'mobiledatabase': `# Database

**🕒 Estimated Time:** 20 min

---

## Overview
Your database is the brain of your backend. Mobile apps generate massive amounts of unstructured data, relational data, and binary data (images). Selecting the right database architecture ensures your app can scale from 10 users to 100,000 without crashing or costing you a fortune.

---

## Think First
What is the shape of your data?

**Data Relationships** (Do you have highly connected data, like Users who have Posts, and Posts that have Comments, and Comments that have Likes? This is relational data).
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Offline Sync** (Do you need the database to automatically sync local offline changes to the cloud when the phone reconnects to WiFi?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **SQL (PostgreSQL) vs NoSQL (Firebase/MongoDB):**
  - **PostgreSQL (via Supabase):** The absolute best choice for 90% of apps. It is highly structured, prevents bad data from being saved, and scales infinitely.
  - **NoSQL (via Firebase Firestore):** Great for rapid prototyping and apps that require massive real-time syncing (like a live chat app), but NoSQL data can quickly become a disorganized mess if you aren't careful.
- **Row Level Security (RLS):** If you use Supabase, your mobile app talks directly to the database. You MUST write strict RLS policies to ensure User A cannot delete User B's data.

---

## Common Mistakes
- **Storing Images in the Database:** Never save a massive Base64 image string inside a database column. Save the image to a Storage Bucket (like AWS S3 or Supabase Storage), and save the *URL string* to the database.
- **Ignoring Indexes:** Querying a table of 100,000 users by their email address without indexing the email column. The database will search every row one by one, destroying your API response times.

---

## AI Prompt
Use AI to select the right database engine and design the schema.

\`\`\`prompt
Act as a Lead Database Architect.
Review my app concept and data relationships.

1. Recommend either PostgreSQL (Supabase) or NoSQL (Firebase) for my specific MVP. Explain why based on my data structure.
2. Draft the initial Database Schema. List the 3-5 core tables (or collections) I will need, and the exact columns/fields for each.
3. Identify the primary "Foreign Key" relationships between these tables.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your chosen Database Engine and Schema Draft here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [React Query: Data Fetching in React](https://tanstack.com/query/latest)\n- [Supabase: Open Source Firebase Alternative](https://supabase.com/docs)\n- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)`,
  'mobilebackend': `# Backend

**🕒 Estimated Time:** 15 min

---

## Overview
The Backend is the server that runs your business logic. If your mobile app needs to process a Stripe payment, generate an AI image using OpenAI, or send an email, it CANNOT do this directly from the phone. The phone must ask the Backend to do it securely. If you put your Stripe Secret Key inside your React Native code, hackers will extract it in 5 minutes.

---

## Think First
What must be hidden from the user?

**The Secrets** (What API keys or sensitive algorithms must be executed securely away from the user's phone?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Heavy Compute** (Are there tasks that take too long or require too much processing power to run on a mobile device?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **BaaS vs Custom Server:**
  - **BaaS (Supabase/Firebase):** For MVPs, using a Backend-as-a-Service is highly recommended. They provide "Edge Functions" (Supabase) or "Cloud Functions" (Firebase)—tiny snippets of server code you can write without having to maintain a massive Node.js server.
  - **Custom Server (Node/Express, Python):** Necessary if you have incredibly complex background jobs, websockets, or video processing that requires dedicated hardware.

---

## Common Mistakes
- **Client-Side Secrets:** Storing an API key (like an OpenAI key) inside your React Native \`.env\` file and calling the API directly from the phone. Anyone can decompile your \`.apk\` and steal your key.
- **Over-engineering:** Building a massive microservices architecture on AWS Kubernetes for an MVP that currently has 0 users.

---

## AI Prompt
Use AI to define your server strategy.

\`\`\`prompt
Act as a Cloud Infrastructure Architect.
Review my app concept.

1. Based on my concept, do I need to build a custom Node.js/Express server on Render/Heroku, or can I survive purely on Supabase Edge Functions?
2. List exactly which actions in my app MUST be executed on the backend for security reasons (e.g., Payment processing).
3. How do I securely pass an authentication token from my mobile app to the backend to verify the user's identity?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Backend Strategy (BaaS vs Custom Server) and list of required server functions here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [React Query: Data Fetching in React](https://tanstack.com/query/latest)\n- [Supabase: Open Source Firebase Alternative](https://supabase.com/docs)\n- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)`,
  'mobilepushnotifications': `# Push Notifications

**🕒 Estimated Time:** 20 min

---

## Overview
Push Notifications are the most powerful tool for mobile retention. They are also incredibly complex to implement. You cannot just send a notification to a phone. You must ask Apple/Google for a unique "Device Token", save that token to your database, and then use a third-party service to ping Apple/Google's servers to actually deliver the message.

---

## Think First
Define your notification strategy:

**The Trigger** (When exactly should a user receive a notification? e.g., When someone likes their post, or a daily reminder at 9 AM).
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The Infrastructure:** Do not attempt to build a direct connection to Apple Push Notification Service (APNs) or Firebase Cloud Messaging (FCM) yourself. Use a wrapper service like **Expo Push Notifications** (easiest for Expo apps) or **OneSignal** (best for advanced marketing campaigns). They abstract away the nightmare of Apple/Google certificates.
- **The Permission Prompt:** If you ask for Push Notification permission the second the app opens, 80% of users will hit "Deny", and you can NEVER ask them again (they must manually go into iOS Settings to fix it). You must "Warm Up" the user by explaining *why* they need notifications before triggering the native OS prompt.

---

## Common Mistakes
- **Spamming:** Sending generic "Come back to the app!" notifications. Users will instantly revoke your notification privileges.
- **Ignoring Badge Counts:** Failing to clear the little red number on your app icon after the user opens the app.

---

## AI Prompt
Use AI to design a robust notification architecture.

\`\`\`prompt
Act as a Mobile Notification Architect.
I am using React Native with Expo.

1. Walk me through the exact database schema I need to store user "Device Push Tokens". Remember that one user might have multiple devices (an iPhone and an iPad).
2. Write a "Warm Up" screen copy that convinces the user to click "Allow" when the native OS permission prompt appears.
3. Should I use Expo's built-in Push Notification service or integrate OneSignal? Compare the two for an MVP.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Notification Provider choice and your "Warm Up" strategy here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Expo Push Notifications](https://docs.expo.dev/push-notifications/overview/)\n- [Branch.io: Deep Linking for Mobile](https://branch.io/)`,
  'mobiledeeplinking': `# Deep Linking

**🕒 Estimated Time:** 15 min

---

## Overview
Deep Linking allows you to click a URL (like \`myapp://profile/123\` or \`https://myapp.com/profile/123\`) in an email or SMS, and have it instantly open your mobile app directly to that specific screen, instead of opening a web browser. Without deep links, sharing content from your app is impossible.

---

## Think First
What needs to be shareable?

**The Core Entities** (What specific screens will users want to share with their friends? e.g., A specific recipe, a user profile, a product page).
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Custom Schemes vs Universal Links:**
  - **Custom Schemes (\`myapp://...\`):** Easy to set up, but if the user doesn't have the app installed, clicking the link does nothing (or shows an error).
  - **Universal Links (iOS) / App Links (Android):** Uses a standard web URL (\`https://myapp.com/...\`). If the app is installed, it opens the app. If not, it opens the website or redirects to the App Store. This is much harder to set up (requires hosting specific verification files on your web domain) but provides a vastly superior user experience.

---

## Common Mistakes
- **Ignoring React Navigation Integration:** Setting up the deep link in the OS, but failing to configure React Navigation to actually parse the URL and route the user to the correct screen.
- **Blank Screens:** Clicking a deep link, the app opens, but because the user isn't logged in, the app crashes or shows a blank screen instead of routing them to the Login screen first.

---

## AI Prompt
Use AI to configure your deep linking strategy.

\`\`\`prompt
Act as a React Navigation Expert.
I need to implement Deep Linking for my app.

1. Explain the difference between a Custom URL Scheme and a Universal Link. Which should I prioritize for my MVP?
2. Write the React Navigation \`linking\` configuration object required to map a URL like \`myapp://post/123\` to my \`PostDetails\` screen, passing the \`123\` ID as a parameter.
3. How do I handle a deep link if the user is currently logged out?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Deep Linking strategy and React Navigation config structure here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [Expo Push Notifications](https://docs.expo.dev/push-notifications/overview/)\n- [Branch.io: Deep Linking for Mobile](https://branch.io/)`,
  'mobilefilestorage': `# File Storage

**🕒 Estimated Time:** 15 min

---

## Overview
If your app allows users to upload profile pictures, record audio, or upload documents, you need a File Storage strategy. You cannot store large binary files in a standard SQL database. You must upload the file to a "Storage Bucket" and then save the resulting URL string to your database.

---

## Think First
What are users uploading?

**File Types & Sizes** (Are they uploading 1MB JPEGs, or 500MB 4K Videos?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The Storage Provider:** AWS S3 is the industry standard, but it is notoriously complex to configure. If you are using **Supabase** or **Firebase**, use their built-in Storage solutions. They integrate seamlessly with your database and handle permissions automatically.
- **Image Compression:** You MUST compress images locally on the phone *before* uploading them. Uploading a raw 12MB photo from an iPhone camera will consume massive amounts of cellular data, take forever, and cost you a fortune in cloud storage fees.

---

## Common Mistakes
- **Direct to Database:** Attempting to convert an image to a Base64 string and saving it in a PostgreSQL text column. This will destroy your database performance.
- **Public Buckets:** Leaving your storage bucket entirely public, allowing anyone on the internet to upload files and bankrupt your AWS account. You must implement Row Level Security (RLS) on your storage buckets.

---

## AI Prompt
Use AI to design a secure, efficient upload pipeline.

\`\`\`prompt
Act as a Cloud Storage Architect.
My app requires users to upload Profile Pictures and Short Videos.

1. I am using [Insert Backend, e.g., Supabase]. Explain the exact architecture of how I get an image from the user's phone, to my Storage Bucket, and save the URL in my database.
2. Recommend a React Native library for selecting images from the camera roll and compressing them *before* upload.
3. How do I write a security rule so that a user can only delete their own profile picture, but everyone can view it?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Storage Provider choice and Image Compression library here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [WatermelonDB: Offline-first React Native Database](https://watermelondb.dev/)\n- [React Native NetInfo](https://github.com/react-native-netinfo/react-native-netinfo)`,
  'mobileofflinestrategy': `# Offline Strategy

**🕒 Estimated Time:** 20 min

---

## Overview
Mobile apps are fundamentally different from websites because they travel. Users open them on subways, airplanes, and areas with spotty 3G. If your app instantly crashes or shows a giant white screen the moment the internet drops, it is a bad mobile app. A solid offline strategy degrades gracefully.

---

## Think First
What must work offline?

**The Offline Requirement** (Does the app *need* to function fully offline like a Notes app, or does it just need to show a polite "No Internet" screen like a Banking app?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Caching:** The simplest offline strategy is caching API responses. If a user opens the app offline, show them the data from their last session instead of a blank screen.
- **Offline Mutations (Advanced):** If you want users to be able to create data (like writing a Tweet) while offline, you must save it to local storage, queue it, and automatically sync it to the server when the connection is restored. This is extremely complex and should generally be avoided for an MVP unless it is the core value proposition of the app.

---

## Common Mistakes
- **Infinite Loading:** A spinner that spins forever because the API call failed due to no internet, and the code never caught the error.
- **Assuming Fast Networks:** Testing your app on your blazing-fast home WiFi and assuming it will load that fast for a user on a crowded 3G network.

---

## AI Prompt
Use AI to design an achievable offline strategy for your MVP.

\`\`\`prompt
Act as a Mobile Reliability Engineer.
Review my app concept.

1. Based on my concept, should I build a "Fully Offline" architecture (complex sync), or a "Cache & Error" architecture (show cached data, disable buttons)?
2. How can I use React Query or AsyncStorage to easily cache my main feed so it loads instantly even in airplane mode?
3. Provide a React Native code snippet using \`@react-native-community/netinfo\` to detect when the internet drops and show a "You are offline" banner.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your chosen Offline Architecture (Caching vs Full Sync) here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [WatermelonDB: Offline-first React Native Database](https://watermelondb.dev/)\n- [React Native NetInfo](https://github.com/react-native-netinfo/react-native-netinfo)`,
  'mobileanalyticsstrategy': `# Analytics Strategy

**🕒 Estimated Time:** 15 min

---

## Overview
If you don't track user behavior, you are flying blind. You will have no idea why users are uninstalling your app. However, mobile analytics are highly regulated. Apple requires you to explicitly declare what you are tracking (Privacy Nutrition Labels) and, under App Tracking Transparency (ATT), you must ask permission to track users across other companies' apps and websites.

---

## Think First
What metrics actually matter?

**The North Star Metric** (What is the single action that defines success? e.g., Completing a purchase, creating a post).
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **The Tool:** **PostHog** is currently the gold standard for mobile product analytics (event tracking, session replay). **Google Analytics / Firebase** is free and ubiquitous but can be complex to query. **Sentry** or **Crashlytics** is absolutely mandatory for tracking app crashes.
- **First-Party vs Third-Party:** If you only track what users do *inside* your app to improve your app (First-Party), you usually do not need the dreaded Apple ATT popup. If you send data to Facebook Ads to track conversions across the web (Third-Party), you MUST trigger the ATT popup.

---

## Common Mistakes
- **Tracking Everything:** Firing an event for every single button press. You will max out your analytics provider's free tier in a week and your dashboard will be unreadable.
- **Ignoring Crash Reporting:** Releasing an app without Sentry or Crashlytics. When a user leaves a 1-star review saying "It crashes on startup," you will have absolutely no idea what line of code caused it.

---

## AI Prompt
Use AI to set up a compliant, focused analytics plan.

\`\`\`prompt
Act as a Mobile Product Data Scientist.

1. Recommend an Analytics stack for my React Native MVP that includes Event Tracking and Crash Reporting. Is PostHog + Sentry a good choice?
2. Define the exact 5 Custom Events I should track in my app to understand the user journey (e.g., 'signup_completed', 'checkout_started').
3. Explain Apple's App Tracking Transparency (ATT). Do I need to show the popup if I am only using PostHog to track internal button clicks?
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Analytics Tooling (e.g., PostHog + Sentry) and the 5 Custom Events you will track here.

\`\`\`input
✍️ Type your answer here...
\`\`\`


## 📚 Context Links
- [PostHog: Open Source Product Analytics](https://posthog.com/)\n- [AWS Pricing Calculator](https://calculator.aws/)`,
  'mobilecostestimation': `# Cost Estimation

**🕒 Estimated Time:** 15 min

---

## Overview
Building an MVP is relatively cheap. *Scaling* an app can bankrupt you if you architect it poorly. You must forecast your monthly costs for hosting, databases, APIs, and developer accounts before you write a line of code.

---

## Think First
Where are your financial vulnerabilities?

**The Expensive Feature** (Does your app rely on the OpenAI API, video hosting, or complex map routing? These cost money per usage).
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- **Developer Accounts:** Apple charges $99/year just to have the privilege of publishing on the App Store. Google charges a one-time $25 fee.
- **Server & Database:** Supabase and Firebase both offer incredibly generous free tiers that will easily support your MVP up to your first few thousand users.
- **Third-Party APIs:** If you use OpenAI, Google Maps, or Twilio (for SMS auth), these are pay-as-you-go. A malicious user spamming your SMS login screen can cost you hundreds of dollars in hours.

---

## Common Mistakes
- **No Billing Limits:** Failing to set hard spending limits or alerts on your AWS/Vercel/Supabase accounts. If your app goes viral, you could wake up to a $5,000 bill.
- **Expensive Auth:** Using SMS text messages for authentication. SMS is notoriously expensive and prone to toll-fraud. Use Email/Password or OAuth (Google/Apple) instead; they are free.

---

## AI Prompt
Use AI to forecast your runway and set up financial defenses.

\`\`\`prompt
Act as a Cloud FinOps Architect.
Review my tech stack (e.g., React Native, Expo, Supabase) and my app's core features.

1. Provide a rough Monthly Cost Estimate for running this app with 1,000 Daily Active Users. Break down the costs (Developer Accounts, Database, Auth, Third-Party APIs).
2. What is the single biggest financial vulnerability in my architecture?
3. Give me step-by-step instructions on what billing alerts or rate limits I MUST set up to prevent accidental bankruptcy.
\`\`\`

---

## How to Use AI's Output
1. Review the generated response.
2. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

## Deliverable
Paste your Monthly Cost Estimate and your critical Billing Alerts strategy here.

\`\`\`input
✍️ Type your answer here...
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

🕒 **Estimated Time:** 1-2 hours

---

## Overview
Both Apple and Google strictly require a publicly accessible Privacy Policy URL. If you collect emails, use analytics (like PostHog), or serve ads, you are legally required to disclose exactly what data you collect and how you use it.

---

## Think First
**What 3rd party SDKs are running in your app? (Supabase, Sentry, PostHog, RevenueCat all collect data).**
\`\`\`input
Type your answer here...
\`\`\`
**Are you storing user data on servers, and if so, how can a user request their data to be deleted? (Apple strictly requires an account deletion feature).**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Hosting Location:** Decide where the policy will live. You can host it on your landing page (e.g., \`yourapp.com/privacy\`), or use a free hosting tool like Termly, Iubenda, or a Notion public page.
- **Generators vs Lawyers:** For a simple indie app, an online generator is usually sufficient. If you are handling medical data (HIPAA) or financial data, you need a lawyer.

---

## Common Mistakes
- **Failing Apple's Account Deletion Rule:** Apple will reject your app if you require users to email you to delete their account. The deletion must be initiated inside the app UI.
- **Not Disclosing SDKs:** Failing to mention that you use tools like Google Analytics or Sentry, which can result in App Store rejection during review.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
I am building a mobile app using React Native, Supabase (Auth and Database), RevenueCat (Payments), and Sentry (Crash Reporting). Act as a legal expert and generate a standard, compliant Privacy Policy. Ensure you explicitly mention the third-party services I just listed, how data is handled, and outline a user's right to delete their account.
\`\`\`

---

## Validation Checklist
- [ ] Generate a Privacy Policy outlining all data collected.
- [ ] Explicitly list all third-party SDKs (Analytics, Crash Reporting).
- [ ] Host the Privacy Policy on a public URL.
- [ ] Ensure the app has a working 'Delete Account' button.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** privacy_policy.md
**Purpose:** The legal text to host on your website.
**Contents:** Full Privacy Policy text.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Generate the Terms of Service to protect your intellectual property.`,

  'termsofservice': `# Terms of Service

🕒 **Estimated Time:** 1 hour

---

## Overview
The Terms of Service (ToS) or End User License Agreement (EULA) is a contract between you and the user. It dictates the rules of using your app and protects you from liability if your app crashes or causes a user to lose data.

---

## Think First
**Are users generating content? (If so, you need terms allowing you to ban abusive users).**
\`\`\`input
Type your answer here...
\`\`\`
**Is your app a paid subscription? (You must outline refund policies).**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Apple's Standard EULA vs Custom ToS:** Apple allows you to fall back on their standard EULA by default. However, having a custom ToS on your website is recommended for stronger liability protection.

---

## Common Mistakes
- **No User Generated Content (UGC) Policy:** If your app allows users to post content (like a social network), Apple requires a strict ToS that states there is zero tolerance for objectionable content, AND you must have a way for users to flag/block bad actors.
- **Copy-Pasting Blindly:** Using a competitor's ToS without replacing their company name or adjusting it to fit your specific feature set.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
Generate a standard Terms of Service (EULA) for my mobile app. The app allows users to create accounts and post text content. Include a strict 'User Generated Content' policy stating that abusive users will be banned, a 'Limitation of Liability' clause, and state that subscriptions are handled by the respective App Stores.
\`\`\`

---

## Validation Checklist
- [ ] Generate the Terms of Service.
- [ ] Include a Limitation of Liability clause.
- [ ] Include a User Generated Content (UGC) moderation clause (if applicable).
- [ ] Host the ToS on a public URL.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** terms_of_service.md
**Purpose:** Protects you legally from misuse of your app.
**Contents:** Full Terms of Service text.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Fill out the content rating questionnaires to get your age rating.`,

  'contentrating': `# Content Rating

🕒 **Estimated Time:** 30 minutes

---

## Overview
Both Google and Apple require you to fill out a questionnaire to assign an age rating to your app (e.g., 4+, 12+, 17+). This ensures parents can restrict apps that contain violence, profanity, or gambling.

---

## Think First
**Does your app have unrestricted internet access (like a web browser)?**
\`\`\`input
Type your answer here...
\`\`\`
**Does your app facilitate dating, or meeting people in real life?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Honesty is Key:** You must accurately declare if your app contains simulated gambling, frequent intense profanity, or medical advice. Attempting to hide this to get a '4+' rating will result in an immediate rejection and potential account ban.

---

## Common Mistakes
- **Medical Advice:** If you claim your app provides medical advice, Apple requires you to be a recognized institution (hospital/insurance). Always state your app is for 'informational/fitness purposes only' if you are an indie dev.
- **Unmoderated UGC:** If you have user-generated content, you must check 'Yes' to 'Does the app allow users to interact?'. If you lack a blocking/reporting feature, you will be rejected.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
I am preparing to fill out the App Store and Google Play Content Rating questionnaires. My app is a [describe app]. Are there any specific features in my app that might trigger a 17+ rating or cause a rejection regarding medical claims, dating, or user interactions?
\`\`\`

---

## Validation Checklist
- [ ] Complete the IARC questionnaire in Google Play Console.
- [ ] Complete the Age Rating questionnaire in App Store Connect.
- [ ] Ensure your UGC blocking/reporting UI is functional before submitting.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** content_rating_notes.txt
**Purpose:** A record of potential flags for the reviewers.
**Contents:** List of 'Yes' answers you plan to provide on the rating questionnaire.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Upload your binary to the Test Tracks to ensure it installs correctly.`,

  'testtracks': `# Test Tracks

🕒 **Estimated Time:** 1-2 hours

---

## Overview
Before pushing to Production, you should upload your app binary (.aab or .ipa) to an Internal Test Track. This allows you and your team to download the app directly from the real App Store/Play Store to verify push notifications and in-app purchases work in a production environment.

---

## Think First
**Have you tested your app on a physical device, not just an emulator?**
\`\`\`input
Type your answer here...
\`\`\`
**Are your environment variables pointing to the Production database, not the Local/Staging database?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Internal vs Closed Beta:** Internal tracks are for your immediate team (instant updates, no review required). Closed Beta is for external testers (requires a basic store review before testers can see it).

---

## Common Mistakes
- **Testing with Staging APIs:** Uploading an app to TestFlight that is hardcoded to talk to \`localhost:3000\` or a Staging database, causing it to instantly crash for real users.
- **Forgetting Sandbox Accounts:** When testing In-App Purchases on TestFlight, you must use an Apple Sandbox Account, otherwise your real credit card will be charged.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
I am about to upload my React Native Expo app to TestFlight and Google Play Internal Testing. Provide a checklist of environment variables and configuration files (like app.json) that I MUST verify are set to 'production' before I trigger the EAS Build.
\`\`\`

---

## Validation Checklist
- [ ] Verify all API endpoints point to Production.
- [ ] Build the \`.aab\` (Android) and \`.ipa\` (iOS) binaries.
- [ ] Upload to App Store Connect and Google Play Console.
- [ ] Add your email to the Internal Testers list and download the app.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** test_track_strategy.md
**Purpose:** Defines how builds move from staging to production.
**Contents:** List of internal testers, and the environment variable checklist.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Expand your testing pool to real users via Beta Testing.`,

  'betatesting': `# Beta Testing

🕒 **Estimated Time:** 14+ days

---

## Overview
Beta testing gets your app into the hands of real users before the official launch. This uncovers edge-case bugs and UI confusion. For new Google Play Personal Accounts, a 14-day Closed Beta with 20 testers is legally required before you can launch.

---

## Think First
**How will testers report bugs? (Email, Discord, in-app feedback button?)**
\`\`\`input
Type your answer here...
\`\`\`
**If you are on Android, how will you recruit 20 people to keep your app installed for 14 days?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Public Link vs Email Invites:** TestFlight allows you to generate a public link to share on Twitter/Reddit to quickly get testers. Email invites are better for a highly controlled, private group.
- **In-App Analytics:** You must rely heavily on tools like Sentry and PostHog during the beta, as users rarely report bugs manually. Let the crash reports guide you.

---

## Common Mistakes
- **Launching the Beta with Critical Blockers:** If the sign-up screen is broken, all 20 of your testers will churn on Day 1, wasting the entire beta period.
- **Ignoring Tester Feedback:** If 5 testers tell you a button is confusing, don't argue with them. Fix the button.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
I need to recruit 20 beta testers for my Android app to satisfy Google's 14-day requirement. Generate a polite, engaging message I can post on Reddit and Discord to ask for testers. Include instructions on how they should report bugs.
\`\`\`

---

## Validation Checklist
- [ ] Submit the app for Beta Review (required for external TestFlight).
- [ ] Generate a public beta link.
- [ ] Distribute the link to your community/waitlist.
- [ ] Monitor Sentry for crashes daily.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** beta_recruitment_post.txt
**Purpose:** The copy you will use to acquire beta testers.
**Contents:** The Reddit/Discord recruitment post.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Complete the final Release Checklist to go live.`,

  'releasechecklist': `# Release Checklist

🕒 **Estimated Time:** 1 hour

---

## Overview
You are ready to hit the 'Submit for Review' button. Apple and Google will take anywhere from 24 hours to 7 days to manually review your app. Once approved, your app will be live and searchable by millions of users.

---

## Think First
**Do you have a demo account ready? (Apple requires you to provide a test username and password so they can log into your app).**
\`\`\`input
Type your answer here...
\`\`\`
**Do you want to release manually or automatically?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Manual Release vs Automatic:** ALWAYS choose 'Manually release this version'. If you choose automatic, Apple might approve your app at 3 AM on a Sunday, ruining your coordinated Product Hunt launch.
- **Phased Release:** For updates, choose a 7-day Phased Release. This sends the update to 1% of users, then 10%, etc. If a critical bug is found, you can halt the rollout before it impacts everyone.

---

## Common Mistakes
- **Missing Demo Credentials:** Forgetting to provide a working test username/password in the App Store Connect 'Review Notes'. Apple will instantly reject the app.
- **No Content:** Submitting an app that is entirely blank because your production database has no seed data. The reviewer must see a functioning app.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
Act as an App Store Reviewer. Review my app's functionality: [Describe what your app does]. What are the top 3 obscure App Store Guidelines that I might be violating without realizing it, which could cause my submission to be rejected?
\`\`\`

---

## Validation Checklist
- [ ] Provide working Demo Credentials for the App Store reviewer.
- [ ] Ensure 'Manually release this version' is checked.
- [ ] Verify all Screenshots and Metadata are perfect.
- [ ] Click 'Submit for Review'.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** launch_plan.md
**Purpose:** Coordinates your exact steps once the app is approved.
**Contents:** Marketing steps, Product Hunt link, Social media announcements.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Congratulations! Your app is in review. Once live, proceed to Phase 6 to focus on Growth and Analytics.`,

  'mobile-retention': `# Retention

🕒 **Estimated Time:** Ongoing

---

## Overview
Acquiring users is easy; keeping them is hard. Retention measures how many users return to your app on Day 1, Day 7, and Day 30. A poor Day 1 retention means your onboarding is confusing. A poor Day 30 retention means your app lacks long-term value.

---

## Think First
**What is the single core action a user must take in their first 5 minutes to experience the 'Aha!' moment?**
\`\`\`input
Type your answer here...
\`\`\`
**Why would a user open your app next Tuesday? What is the trigger?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Hook vs Habit:** You must design a 'hook' to get users to return initially (e.g., a push notification), but eventually, the app must become an internal habit.
- **Active vs Passive Retention:** Passive retention relies on external triggers (emails). Active retention relies on intrinsic motivation (the user wants to check their stats).

---

## Common Mistakes
- **Focusing Only on Acquisition:** Spending money on ads when your Day 7 retention is 2%. You are pouring water into a leaky bucket.
- **Overwhelming Onboarding:** Asking users to create an account, verify their email, and allow 3 permissions before they even see what the app does.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
My app is a [describe app]. Act as a Growth Product Manager. Design a 7-day onboarding sequence (including push notifications and emails) designed specifically to increase Day 7 retention. Identify the exact 'Aha!' moment my users need to reach, and tell me how to get them there faster.
\`\`\`

---

## Validation Checklist
- [ ] Define your 'Aha!' moment.
- [ ] Track Day 1, Day 7, and Day 30 retention in your analytics tool.
- [ ] Implement an email or push sequence for the first 7 days.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** retention_strategy.md
**Purpose:** A blueprint for bringing users back.
**Contents:** The 7-day email/push sequence and defined 'Aha!' moment.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
To measure retention, you need proper Analytics tracking.`,

  'mobile-analytics': `# Analytics

🕒 **Estimated Time:** 2-3 hours

---

## Overview
You cannot improve what you do not measure. Product analytics tools (like PostHog or Amplitude) allow you to track specific user events, build conversion funnels, and perform cohort analysis to understand exactly where users are dropping off.

---

## Think First
**What are the 5 most important buttons in your app that indicate a user is engaged?**
\`\`\`input
Type your answer here...
\`\`\`
**Are you tracking 'activation' (e.g., user created their first project) instead of just 'signups'?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Event Tracking vs Page Views:** Page views are a vanity metric. You must track specific user actions (e.g., 'Clicked Upgrade Button', 'Completed Workout').
- **Server-Side vs Client-Side Tracking:** Client-side tracking can be blocked by ad-blockers. Critical events (like payments) should always be tracked server-side.

---

## Common Mistakes
- **Tracking Everything:** Logging every single click and scroll. Your analytics dashboard will become useless noise. Only track events tied to your core KPIs.
- **Vague Event Naming:** Naming an event \`Button_Click_2\`. Always use a clear Object-Action framework, like \`Project_Created\` or \`Subscription_Upgraded\`.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
I am integrating product analytics (like PostHog) into my [describe app] app. Act as a Data Scientist. Provide me with a strict 'Tracking Plan' containing the top 10 most critical events I should track. Use an 'Object_Action' naming convention and define what properties (metadata) I should send with each event.
\`\`\`

---

## Validation Checklist
- [ ] Install a product analytics SDK (PostHog, Amplitude).
- [ ] Create a standardized Tracking Plan spreadsheet.
- [ ] Implement tracking for your core 'Activation' event.
- [ ] Build a funnel dashboard (Signup -> Activation -> Retention).

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** tracking_plan.csv
**Purpose:** Maintains consistency in your analytics data.
**Contents:** List of Event Names, Descriptions, and Properties.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Use the data from your analytics to trigger your Notifications Strategy.`,

  'mobile-notificationsstrategy': `# Notifications Strategy

🕒 **Estimated Time:** 1-2 hours

---

## Overview
Push notifications are a powerful tool to re-engage users, but they are a double-edged sword. If used incorrectly, they are the fastest way to get your app uninstalled. A good strategy balances transactional, educational, and promotional notifications.

---

## Think First
**Are your notifications providing immediate value to the user, or just asking them to open the app?**
\`\`\`input
Type your answer here...
\`\`\`
**Do users have granular control over what types of notifications they receive?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Push vs Email vs In-App:** Use Push for urgent/time-sensitive alerts. Use Email for long-form summaries or re-engaging inactive users. Use In-App messages for feature announcements while they are actively using the app.

---

## Common Mistakes
- **The 'We Miss You' Push:** Sending generic, guilt-tripping notifications ('It has been a while, come back!'). Provide value instead ('Here is your weekly summary!').
- **Asking for Permission Immediately:** Prompting the iOS 'Allow Notifications' dialog on the very first screen. Users will click 'Deny'. Ask for permission only after explaining *why* they need it.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
My app is a [describe app]. Act as a CRM Marketing Expert. Draft a notification strategy that includes 2 Push Notifications, 2 Transactional Emails, and 1 In-App message. For the Push Notifications, explain the exact 'trigger' (when it sends) and write the 50-character copy. Ensure the copy focuses on user value, not app usage.
\`\`\`

---

## Validation Checklist
- [ ] Implement a pre-permission 'soft prompt' before triggering the OS permission dialog.
- [ ] Build a settings screen allowing users to toggle specific notification categories.
- [ ] Draft copy for 3 high-value push notifications.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** notification_matrix.md
**Purpose:** Maps out exactly what notifications send and when.
**Contents:** Triggers, Channels (Push/Email), and Copy.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Now that you are communicating with users, you need a way to receive User Feedback.`,

  'mobile-userfeedback': `# User Feedback

🕒 **Estimated Time:** 1-2 hours

---

## Overview
Silent users are churning users. Providing a frictionless way for users to report bugs, suggest features, or rate their experience is crucial for product growth. Do not rely entirely on App Store reviews for your feedback loop.

---

## Think First
**If a user encounters a bug right now, how many clicks does it take for them to tell you about it?**
\`\`\`input
Type your answer here...
\`\`\`
**Are you actively surveying users who churn (cancel their subscription)?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **In-App vs External:** An in-app widget (like Crisp or Intercom) gets 10x more feedback than a 'Contact Us' button that opens their email client.
- **Passive vs Active:** Passive feedback is a 'Report Bug' button. Active feedback is triggering an NPS (Net Promoter Score) survey after they successfully complete a core task.

---

## Common Mistakes
- **Ignoring the Silent Majority:** Only listening to the 1% of extremely vocal, angry users. You must proactively survey the quiet, happy users to understand what is actually working.
- **Long Surveys:** Sending a 20-question Typeform. Keep it to 1-2 questions maximum if you want a decent response rate.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
I want to implement a 'Churn Survey' that triggers when a user cancels their subscription to my [describe app] app. Act as a User Researcher. Draft a short, multi-choice survey with 4 options and 1 optional text field. Ensure the questions help me identify if the issue is pricing, missing features, or bugs.
\`\`\`

---

## Validation Checklist
- [ ] Add an easily accessible 'Provide Feedback' button in the app settings.
- [ ] Implement a short churn survey for cancelled subscriptions.
- [ ] Set up an NPS (Net Promoter Score) survey to trigger after a positive app experience.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** feedback_loops.md
**Purpose:** Defines how you listen to your users.
**Contents:** Survey questions and feedback widget placement strategy.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Leverage happy users by asking for App Store Reviews & Ratings.`,

  'mobile-reviewsratings': `# Reviews & Ratings

🕒 **Estimated Time:** 2-3 hours

---

## Overview
App Store algorithms heavily favor apps with high ratings and recent reviews. Getting a 4.5+ star average is non-negotiable for organic growth. The secret is knowing exactly *when* to ask the user for a review.

---

## Think First
**What is the moment of highest joy or relief in your app? (e.g., beating a level, finishing a task).**
\`\`\`input
Type your answer here...
\`\`\`
**How many times has the user opened the app before you ask them for a review?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Native Prompts vs Custom:** Both Apple and Google provide a native API (\`StoreReview\`) that allows users to rate the app without leaving it. You should always use this API, as it converts significantly higher than linking them to the App Store.
- **The Pre-Prompt Strategy:** A common tactic is to ask an internal question first: 'Are you enjoying the app?'. If Yes -> Trigger Native Review API. If No -> Trigger internal feedback form. (Note: Apple strictly forbids incentivizing reviews).

---

## Common Mistakes
- **Asking on Launch:** Triggering the review prompt the second the app opens. The user hasn't done anything yet; they will dismiss it.
- **Spamming the API:** Apple restricts the native review prompt to showing a maximum of 3 times per 365 days. If you waste it, you can't ask again for months.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
My app is a [describe app]. Act as a Growth Engineer. Identify the exact 'moment of highest joy' in my user journey where I should trigger the native iOS/Android App Store Review prompt. Write the logic rules for this trigger (e.g., 'User has opened app 3 times AND completed X action').
\`\`\`

---

## Validation Checklist
- [ ] Implement the native \`StoreReview\` API using React Native or Expo.
- [ ] Write conditional logic to ensure the prompt only fires after a 'win'.
- [ ] Ensure the prompt does not fire in the middle of a critical task.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** review_prompt_logic.js
**Purpose:** The code logic determining when to ask for a rating.
**Contents:** Conditional statements for triggering the StoreReview API.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Turn your highly-rated app into a viral loop with Referral Programs.`,

  'mobile-referralprograms': `# Referral Programs

🕒 **Estimated Time:** 1-2 days

---

## Overview
A referral program incentivizes your current users to invite their friends, lowering your Customer Acquisition Cost (CAC). The most successful programs offer a 'double-sided reward' where both the inviter and the invitee get something of value.

---

## Think First
**What can you give away for free that has high perceived value to the user but low marginal cost to you?**
\`\`\`input
Type your answer here...
\`\`\`
**Are you using Deep Links to ensure the invited user is seamlessly credited to the inviter upon app install?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Financial vs Feature Rewards:** Giving away $5 account credit (Financial) vs giving away a 'Pro feature' or 'Premium Avatar' (Feature). Feature rewards are often cheaper and build deeper product engagement.
- **Single vs Double-Sided:** Double-sided ('Give $10, Get $10') vastly outperforms single-sided because the inviter feels like they are giving a gift rather than spamming their friends.

---

## Common Mistakes
- **Friction in the Invite Process:** Forcing the user to copy-paste a complex code instead of just sharing a direct, dynamic deep-link.
- **Lack of Fraud Prevention:** Users will try to refer themselves using multiple emails to get free credits. You must tie referrals to unique device IDs or require the new user to complete an action (like making a purchase) before the reward is granted.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
I want to build a referral program for my [describe app] app. Act as a Viral Growth Expert. Design a 'Double-Sided Reward' system. Detail exactly what the reward should be, what action the new user must take to unlock the reward to prevent fraud, and write the 1-sentence marketing copy explaining the offer.
\`\`\`

---

## Validation Checklist
- [ ] Decide on a high-value, low-cost double-sided reward.
- [ ] Implement dynamic deep-linking (e.g., via Firebase Dynamic Links or Branch.io).
- [ ] Add fraud prevention (e.g., reward only unlocks after the invitee completes a specific action).
- [ ] Design a beautiful 'Invite Friends' screen in the app.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** referral_mechanics.md
**Purpose:** Outlines the viral loop and fraud prevention.
**Contents:** Reward structure, tracking mechanism, and marketing copy.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Share your future plans with your community via a Public Roadmap.`,

  'mobile-roadmap': `# Roadmap

🕒 **Estimated Time:** 2-3 hours

---

## Overview
A product roadmap outlines what you are building next. For indie developers and startups, maintaining a 'Public Roadmap' builds immense trust with early adopters. It shows the app is actively maintained and gives users a voice in the product's direction.

---

## Think First
**Will your roadmap be timeline-based (Q1, Q2) or status-based (Now, Next, Later)?**
\`\`\`input
Type your answer here...
\`\`\`
**Do you want users to be able to upvote features on the public roadmap?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Internal vs Public:** Internal roadmaps are strict and tied to business goals. Public roadmaps are marketing tools; they build hype and community engagement.
- **Timeline vs Now/Next/Later:** Timeline roadmaps are dangerous because software is notoriously hard to estimate. Missing a public deadline frustrates users. 'Now, Next, Later' provides direction without strict commitments.

---

## Common Mistakes
- **Promising Features You Can't Deliver:** Putting 'AI Integration' on the roadmap to generate hype, without knowing how much it will cost or if it's technically feasible.
- **Letting Users Dictate the Product:** If you blindly build whatever gets the most upvotes on a public board, you will end up with a bloated, confused 'Frankenstein' app. You must curate the roadmap.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
I am creating a public-facing 'Now, Next, Later' roadmap for my [describe app] app. Act as a Lead Product Manager. Given that my app is in its early growth stage, suggest 2 features for 'Now' (quick wins/retention), 2 features for 'Next' (growth/referrals), and 1 ambitious feature for 'Later'. Briefly explain why this prioritization makes strategic sense.
\`\`\`

---

## Validation Checklist
- [ ] Choose a roadmap tool (Notion, Canny, Linear, or GitHub Projects).
- [ ] Populate the board using the 'Now, Next, Later' framework.
- [ ] Add a link to the public roadmap in your app's settings or footer.
- [ ] Regularly move completed items to a 'Shipped' column to show momentum.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** product_roadmap.md
**Purpose:** A structured plan for the next 6 months of development.
**Contents:** Categorized list of features (Now, Next, Later) with brief justifications.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
As your user base grows, you must finalize your Scaling Strategy to ensure the servers don't melt.`,

  'mobile-scalingstrategy': `# Scaling Strategy

🕒 **Estimated Time:** Ongoing

---

## Overview
Growth is great until your app goes viral on TikTok and your database crashes, resulting in 10,000 angry 1-star reviews. A scaling strategy ensures your architecture can handle a 10x or 100x sudden spike in traffic without breaking a sweat.

---

## Think First
**What is the single biggest bottleneck in your current architecture? (Hint: It is almost always the database connection limit).**
\`\`\`input
Type your answer here...
\`\`\`
**Do you have monitoring alerts set up if CPU usage hits 90%?**
\`\`\`input
Type your answer here...
\`\`\`

---

## Key Decisions
- **Vertical vs Horizontal Scaling:** Vertical scaling means upgrading to a bigger, more expensive server (easy, but has a limit). Horizontal scaling means adding more servers to distribute the load (harder, but scales infinitely).
- **Edge Caching vs Database Queries:** The cheapest and most scalable query is the one that never hits your database. Utilize Redis or Vercel Edge Cache for data that is read frequently but updated rarely.

---

## Common Mistakes
- **Ignoring Connection Pooling:** If you use Serverless functions (which scale instantly) hitting a traditional PostgreSQL database without a connection pooler (like Supavisor or PgBouncer), the database will immediately run out of connections and crash.
- **Premature Optimization:** Spending 3 months building a complex Kubernetes microservices architecture for an app with 50 users. Start with a majestic monolith or serverless functions, and scale only when the metrics demand it.

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
My app's backend uses [Node.js/Supabase/Vercel]. We are expecting a massive traffic spike tomorrow due to a marketing push. Act as a Site Reliability Engineer (SRE). Provide a 5-point emergency checklist to ensure our infrastructure doesn't crash, specifically addressing database connection limits, caching strategies, and CDN configuration.
\`\`\`

---

## Validation Checklist
- [ ] Ensure a Connection Pooler is active for your SQL database.
- [ ] Cache heavily accessed, static data at the Edge/CDN.
- [ ] Add database indexes to your most frequent queries.
- [ ] Set up an automated billing alert in AWS/Vercel to prevent a massive surprise bill.

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** scaling_playbook.md
**Purpose:** Emergency protocols and architectural improvements for handling scale.
**Contents:** List of bottlenecks, caching strategies, and connection pooling configurations.

\`\`\`input
Paste your deliverable here...
\`\`\`

---

## Next Step
Congratulations! You have completed Phase 6. Your app is now an optimized, growing, and scalable product. Continue iterating on feedback and executing your roadmap!`,
};
