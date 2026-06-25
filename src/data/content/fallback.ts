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
Congratulations, you have completed Phase 3! Move on to Phase 4 to prepare your app for **Production Readiness**.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
With monetization active, implement **Media Uploads** to allow users to generate robust content.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
With the backend logic solid, configure **Push Notifications** to start engaging users proactively.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
Now that the database is structured, build the **Backend APIs** to execute complex logic and interface with this data safely.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
With users authenticated, move on to connecting the **Database** to store and retrieve their specific data.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`\`\`\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`\`\`\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`\`\`\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`\`\`\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`\`\`\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`\`\`\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`\`\`\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`\`\`\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`\`\`\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`\`\`\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`\`\`\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`\`\`\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`\`\`\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
With the app optimized perfectly for a single user, it's time to ensure it can handle millions. Move to **Scalability**.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
A small app is good, but it must also respect the user's phone. Time for **Battery Optimization**.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
Beyond just crashes, you need proactive **Monitoring** to ensure your APIs and services are healthy.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
With errors caught, implement **Testing** to prevent them from happening in the first place.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
To ensure those analytics aren't just showing crashes, implement robust **Error Handling**.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
With the app functioning in all environments, implement **Analytics Events** to see how users are interacting with it.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
With hardware access secured, build robust **Offline Features** for when the device loses connection.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
Now ensure your app handles all other **Device Permissions** correctly before launching.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
With content generation solved, integrate **Maps & Location** for location-aware features.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
With data flowing securely and the app fully functional, proceed to Phase 4 to focus on **Production Readiness**.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
Now that screens are connected, integrate **APIs** to fetch and populate real data into these views.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
With UI blocks built, implement **Navigation** to connect these screens together logically.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
With notifications active, refine your **Frontend (UI)** components to ensure the app looks as good as it functions.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
With state management in place, proceed to implement the **Auth** flows to populate that state with real user data.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
**Contents:** A dedicated script used exclusively for populating presentation environments.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
**Contents:** The timed script and the recorded Loom video link.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`\`\`\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileretention': `# Retention

**Estimated Time:** Ongoing

---

## Why this matters
Acquiring a new user costs 5 to 25 times more than retaining an existing one. In the mobile app world, Day 1 (D1) retention averages around 25%, meaning 75% of users who download your app today will never open it again. If you do not have a deliberate retention strategy, your app is a leaky bucket, and any money spent on marketing is entirely wasted.

## Strategic Guidance

### Hackathon Mode
Retention doesn't matter for a weekend project. Focus purely on the acquisition story for the pitch deck.

### Personal Project
Focus on the "Aha! Moment." This is the exact moment a user understands the core value of your app. For Facebook, it was "7 friends in 10 days." For a habit tracker, it might be "Logging 3 days in a row." Ensure your onboarding process gets the user to that specific Aha! Moment as fast as humanly possible, removing all unnecessary friction (like forcing them to verify their email before using the app).

### Production SaaS
You must rigorously track D1, D7, and D30 retention cohorts using tools like Mixpanel or Amplitude. Implement lifecycle marketing to combat churn. If a user drops off at Day 3, send a targeted push notification or email sequence educating them on a feature they haven't tried yet. Do not just send "We miss you!" messages; send value-driven nudges like, "Did you know you can automate your weekly reports?"

### Production SaaS
Enterprise retention is tied directly to B2B contract renewals (Net Revenue Retention - NRR). You must build specialized dashboards for Customer Success Managers (CSMs) to monitor the "Health Score" of enterprise accounts. If an entire client organization shows a 20% drop in Daily Active Users (DAU), the CSM must be alerted automatically to intervene before the annual contract renewal date.

## Implementation Steps
\`\`\`prompt
Act as a Product Growth Expert. My mobile app is a [Insert App Type]. Define what my "Aha! Moment" likely is. Then, outline a 7-day lifecycle push notification sequence designed to increase my D7 retention rate by guiding new users toward that specific Aha! Moment.
\`\`\`

## Validation Checklist
- [ ] The "Aha! Moment" has been clearly defined.
- [ ] Onboarding friction preventing users from reaching the Aha! Moment has been minimized.
- [ ] D1, D7, and D30 retention cohorts are actively being tracked in an analytics tool.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
At the enterprise tier, mobile fundamentals dictate architectural rigor. You must profile battery consumption, network bandwidth usage, and CPU utilization. If your application constantly wakes the radio antenna for trivial analytics pings, users will notice the battery drain. Architecture must include structured background task schedulers, sophisticated conflict resolution for offline data sync, and rigorous memory leak detection in the CI/CD pipeline.

## Review and Proceed
- [ ] I understand the core constraints of mobile development and the necessity of lifecycle management.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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

### Production SaaS
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
Your app is fully production-ready, secure, performant, and scalable! You are ready to move to **Phase 5: Store Deployment**.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
Once your Android account is pending verification, move on to setting up your Apple App Store account.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
With the accounts created, it's time to design the visual assets, starting with the App Icon.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
Now that you have an icon, you need to show users what the app actually does using Screenshots.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
Android requires an additional promotional asset called the Feature Graphic.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
Visuals are done. Now you need to optimize your text for search algorithms via App Store SEO.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
You cannot submit an app without a valid Privacy Policy URL.\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilesecurity': `# Security Implementation

**Estimated Time:** 3-5 hours

---

## Why this matters
Mobile apps are fundamentally untrusted environments. Anyone can download your APK or IPA, unpack it, and read every single string inside it. If you hardcode a Stripe Secret Key or AWS Admin credentials into your React Native app, your infrastructure will be compromised within hours of publishing.

## Strategic Guidance

### Hackathon Mode
Don't worry about SSL pinning, code obfuscation, or jailbreak detection. The only critical rule is: DO NOT HARDCODE SECRETS. Use an \`.env\` file to store your API keys. If your app connects to Firebase or Supabase, use Row Level Security (RLS) to ensure users can only read their own data, even if they extract the public anon key.

### Personal Project
Focus on Secure Storage. Never save JWTs or user passwords in plain \`AsyncStorage\` (which is just an unencrypted XML file on Android). Use \`expo-secure-store\` or \`react-native-keychain\` to leverage the device's hardware-backed Secure Enclave. This ensures that even if the physical device is stolen and rooted, the tokens cannot be extracted.

### Production SaaS
You must implement strict API authorization boundaries. The mobile app should only ever hold short-lived access tokens (expiring in 15 minutes) and long-lived refresh tokens (stored securely). You must implement "App Attestation" (using Google Play Integrity API and Apple DeviceCheck) to ensure your backend API only accepts requests from the official, unmodified version of your app downloaded from the store, blocking automated emulator bots from scraping your API.

### Production SaaS
Enterprise security requires extreme measures. You must implement SSL/TLS Pinning so the app refuses to connect if a Man-In-The-Middle (MITM) proxies the traffic on public Wi-Fi. You must implement Jailbreak/Root detection to instantly lock the app if the user's OS is compromised. Finally, sensitive data (like financial PII) must be encrypted *at rest* within the local SQLite database using SQLCipher, and the app must enforce a biometric unlock (FaceID) if backgrounded for more than 2 minutes.

## Implementation Steps
\`\`\`prompt
Act as a Mobile Security Expert. I am building a React Native app. Provide a checklist and code snippets for:
1. Securely storing a JWT using \`expo-secure-store\`.
2. Setting up a global Axios interceptor to append this token to requests.
3. A basic check to prevent the app from running on rooted/jailbroken devices using a standard community library.
\`\`\`

## Validation Checklist
- [ ] No private API keys or database admin credentials exist in the client source code.
- [ ] Session tokens are stored in the device's Secure Enclave.
- [ ] Backend APIs explicitly validate the authorization header for every request.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileperformanceoptimization': `# Performance Optimization

**Estimated Time:** 4-6 hours

---

## Why this matters
A web page that drops a frame during a scroll is annoying. A mobile app that drops a frame during a screen transition feels broken, cheap, and immediately loses user trust. React Native runs JavaScript on a single thread; if you block that thread, the entire app freezes.

## Strategic Guidance

### Hackathon Mode
If it feels slow, it's probably because you are running it in "Development Mode" with the Chrome Debugger attached. Run a proper release build (\`npx expo run:ios --configuration Release\`) on a physical device before panicking. For hackathons, a Release build is almost always fast enough without any manual optimization.

### Personal Project
Focus on list rendering. The standard React Native \`FlatList\` is notoriously inefficient. If you are rendering a feed of 500 images, your app will consume all available RAM and crash. Learn how to implement \`FlashList\` by Shopify. It recycles views identically to native RecyclerViews, boosting performance by 5x with almost no code changes.

### Production SaaS
You must aggressively eliminate unnecessary re-renders. Use \`React.memo\` for heavy components (like video players or complex charts). Profile your React tree using the React DevTools Profiler to find components that re-render 10 times per second when a user types into an input field. Move heavy computations (like parsing a massive JSON payload) off the main JS thread using tools like \`react-native-reanimated\` (for animations) or executing them on the backend before sending the data.

### Production SaaS
Enterprise performance requires C++ level optimization. You must migrate away from the old React Native Bridge to the New Architecture (JSI / Fabric), which allows JavaScript to synchronously invoke native C++ functions without serializing data to JSON. You must strictly monitor the JS bundle size; every megabyte of JavaScript adds roughly 100ms to the app's "Time to Interactive" (TTI) during a cold boot on older Android devices.

## Implementation Steps
\`\`\`prompt
Act as a React Native Performance Architect. I have a \`FlatList\` rendering 1,000 complex items (images and text), and it stutters significantly when scrolling on Android. Provide the exact code to migrate this to Shopify's \`FlashList\`, including the critical \`estimatedItemSize\` property and a \`React.memo\` wrapper for the list item component.
\`\`\`

## Validation Checklist
- [ ] Release builds maintain a solid 60 FPS (or 120 FPS on ProMotion devices) during navigation transitions.
- [ ] Large lists are rendered using \`FlashList\` or heavily optimized \`FlatList\` configurations.
- [ ] Heavy animations are offloaded to the UI thread using Reanimated.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilecrashreporting': `# Crash Reporting

**Estimated Time:** 1-2 hours

---

## Why this matters
If your app crashes in development, you see a massive red screen with a stack trace. If it crashes in production, it instantly closes to the home screen without a single error message. If you do not have crash reporting installed, you will only find out your app is broken when angry users leave 1-star reviews saying "Crashes on launch."

## Strategic Guidance

### Hackathon Mode
Don't bother. If it crashes during the demo, make a joke about live demos, restart the app, and keep going. Setting up native crash reporting takes too long for a 48-hour event.

### Personal Project
Set up Sentry for React Native (or Expo). It captures unhandled JavaScript exceptions and native OS crashes. More importantly, it groups identical crashes together. So if 50 users experience the same bug, your dashboard shows 1 issue with 50 events, rather than spamming you with 50 separate emails.

### Production SaaS
Crash reporting is mandatory. You must configure your CI/CD pipeline to automatically upload "Source Maps" to Sentry every time you build a release APK/IPA. Without source maps, Sentry will report that the crash happened in \`main.js line 1 column 40293\` (the minified bundle), making debugging completely impossible. You must also implement "Breadcrumbs"?"logging user actions like "Tapped Checkout Button", "Navigated to Cart"?"so when a crash happens, Sentry shows you the exact sequence of clicks the user made leading up to the failure.

### Production SaaS
Enterprise crash reporting involves strict Service Level Agreements (SLAs). If the "Crash-Free Users" metric drops below 99.9%, automated alerts page the on-call engineering team and immediately halt any phased rollouts on the Google Play Console. You must also scrub PII (Personally Identifiable Information). If an API request fails, ensure the crash reporter does not log the user's password or credit card number that was embedded in the failed request payload.

## Implementation Steps
\`\`\`prompt
Act as a DevOps Engineer for Mobile. I am using Expo. Provide the step-by-step instructions and code configuration to initialize \`sentry-expo\`. The code must include a global error boundary that catches React rendering errors and automatically sends the component stack trace to Sentry.
\`\`\`

## Validation Checklist
- [ ] Sentry (or Crashlytics) is initialized correctly in the app entry file.
- [ ] Source maps are configured to upload automatically on production builds.
- [ ] A test crash (\`throw new Error('Test Crash')\`) successfully appears in the reporting dashboard.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilemonitoring': `# Monitoring & Telemetry

**Estimated Time:** 2-3 hours

---

## Why this matters
Crash reporting tells you when the app completely dies. Monitoring tells you when the app is surviving, but suffering. If a backend API suddenly takes 4 seconds to respond, the app won't crash, but users will stare at a spinner and abandon the cart. You need telemetry to detect silent performance degradation.

## Strategic Guidance

### Hackathon Mode
Skip this entirely. Your monitoring is visually looking at the app during the hackathon.

### Personal Project
Use basic analytics (like PostHog or Firebase) to track screen load times. If you have a critical API call (like fetching a user's feed), wrap it in a simple timer (\`console.time\`) during development to ensure it isn't taking unusually long.

### Production SaaS
Implement Real User Monitoring (RUM) using tools like Datadog, Sentry Performance, or Firebase Performance Monitoring. You must track "Cold Start Time" (how many milliseconds from tapping the app icon to the first meaningful paint). Apple and Google actively penalize apps in search rankings if their cold start times exceed 2 seconds. You must also monitor "Network Request Success Rates" broken down by geographic region; your app might work perfectly in the US but consistently timeout for users in India due to CDN misconfigurations.

### Production SaaS
Enterprise monitoring requires distributed tracing. When a user clicks "Buy" in the mobile app, a unique Trace ID is generated. This ID is passed in the HTTP header to your API gateway, which passes it to your microservices, which passes it to your database. If the purchase takes 5 seconds, you can look at the Datadog dashboard and see exactly how many milliseconds were spent on the mobile device, in transit, and inside the specific database query.

## Implementation Steps
\`\`\`prompt
Act as a Mobile Observability Expert. I am using Sentry Performance for React Native. Provide the configuration required to enable automatic tracing for React Navigation (tracking how long each screen takes to load) and Axios (tracking how long HTTP requests take).
\`\`\`

## Validation Checklist
- [ ] App Cold Start times are being tracked in a dashboard.
- [ ] HTTP request durations and success/failure rates are monitored.
- [ ] Custom traces are implemented for critical, complex business flows (e.g., Video Processing).
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilelogging': `# Logging

**Estimated Time:** 1-2 hours

---

## Why this matters
\`console.log()\` is a development tool, not a production logging strategy. In production React Native apps, \`console.log\` statements are completely stripped out by the bundler (or worse, they aren't, and they silently drain CPU cycles). When a user reports a weird bug, you need a structured log of what the app was doing to reconstruct the scenario.

## Strategic Guidance

### Hackathon Mode
Leave your \`console.log\` statements in. You will likely be running the app in development mode anyway.

### Personal Project
Create a simple utility wrapper for logging (e.g., \`logger.ts\`). Instead of calling \`console.log\`, call \`logger.info("User logged in")\`. In development, this just prints to the console. In production, this can do nothing, saving CPU cycles. This single layer of abstraction will save you hours of refactoring later.

### Production SaaS
Implement a remote logging infrastructure. When non-fatal errors occur (e.g., "Image failed to upload after 3 retries"), use \`logger.warn()\` to send a structured JSON payload to a service like Datadog or Loggly. Do not log everything! If you remote-log every single button click, you will consume massive amounts of the user's cellular data and your logging bill will exceed your database bill. Log only significant state changes and non-fatal errors.

### Production SaaS
Enterprise logging requires strict compliance. You must implement log rotation (if logging to the local device file system) to ensure the logs don't consume gigabytes of storage. More importantly, you must implement a "Redaction Engine" that actively intercepts log payloads and masks sensitive data (e.g., replacing credit card numbers with \`**** **** **** 1234\` or redacting email addresses) before they ever leave the physical device to ensure GDPR/HIPAA compliance.

## Implementation Steps
\`\`\`prompt
Act as a Senior Mobile Developer. Provide a TypeScript \`logger.ts\` utility. It should have \`debug\`, \`info\`, \`warn\`, and \`error\` methods. In \`__DEV__\`, it should use \`console.log\` with color formatting. In production, \`info\` and \`debug\` should be silent, but \`warn\` and \`error\` should push payloads to an array. Include a method to "Dump Logs" that returns this array so users can optionally attach it to support tickets.
\`\`\`

## Validation Checklist
- [ ] \`console.log\` is replaced by a centralized logging abstraction.
- [ ] Production logs do not leak PII (Personally Identifiable Information).
- [ ] Non-fatal errors are logged remotely for triage.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileratelimiting': `# Rate Limiting

**Estimated Time:** 2-4 hours

---

## Why this matters
A mobile app in the hands of a frustrated user is a DDoS weapon. If a screen fails to load, a user might furiously tap the "Refresh" button 20 times in 3 seconds. If your app obediently sends 20 heavy API requests to your backend, it will choke your server and spike your cloud bill.

## Strategic Guidance

### Hackathon Mode
Just disable the button while the request is loading. \`disabled={isLoading}\` is the easiest "rate limit" you can implement on the client side.

### Personal Project
Implement "Debouncing" or "Throttling" on your UI inputs. If you have a search bar that fetches results as the user types, do not fire an API request for every single keystroke. Use a debounce hook (e.g., \`useDebounce\`) to wait 300ms after the user stops typing before firing the request. This dramatically reduces unnecessary backend load.

### Production SaaS
Rate limiting must be enforced at three levels:
1. **UI Layer:** Disable buttons and debounce inputs.
2. **Client API Layer:** Use tools like React Query, which have built-in de-duplication. If 5 components simultaneously request the same user profile, React Query only fires 1 actual network request and shares the result.
3. **Backend API Gateway:** The mobile app is untrusted. Your backend must enforce IP-based or User-ID-based rate limits (e.g., 100 requests per minute per user) using Redis, returning HTTP \`429 Too Many Requests\`. The mobile app must gracefully catch \`429\` errors and display a message like "Please slow down."

### Production SaaS
Enterprise rate limiting involves dynamic quotas and circuit breakers. If your backend detects a massive spike in traffic (e.g., a push notification just went out to 5 million users), it might dynamically drop the rate limit threshold. The mobile app must implement a "Circuit Breaker" pattern: if it receives 5 consecutive \`500 Server Error\` or \`429\` responses, it stops sending *any* requests for 60 seconds, allowing your backend infrastructure time to auto-scale and recover without being hammered by retries.

## Implementation Steps
\`\`\`prompt
Act as a Mobile Architecture Expert. I have a 'Like' button on a post. Users might spam it. Provide a custom React hook using \`lodash/debounce\` or similar logic that visually updates the UI instantly (optimistic update), but only fires the actual backend API request once per second, regardless of how many times the user tapped it.
\`\`\`

## Validation Checklist
- [ ] Search inputs use debouncing to prevent excessive API calls.
- [ ] Submit buttons are disabled while \`isLoading\` is true.
- [ ] The app handles HTTP \`429 Too Many Requests\` elegantly without crashing.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilebackups': `# Backups & Data Integrity

**Estimated Time:** 1-2 hours

---

## Why this matters
On mobile, data exists in two places: your cloud server and the physical device. If a user spends 3 hours offline crafting a massive note in your app, and then accidentally uninstalls the app or drops their phone in a river, that data is permanently destroyed unless you have a robust backup strategy.

## Strategic Guidance

### Hackathon Mode
Don't build backups. If the data gets wiped, apologize during the pitch and blame the Wi-Fi. Focus your time on the actual features.

### Personal Project
Focus on Cloud Syncing. Make sure that any critical data saved locally (using MMKV or AsyncStorage) is pushed to your backend (like Supabase or Firebase) the moment the device regains internet connectivity. If your backend is Supabase, rely on their automated daily backups for your Postgres database.

### Production SaaS
You must implement Point-in-Time Recovery (PITR) on your backend database. If a rogue API update corrupts all user profiles at 2:14 PM, you need to be able to restore the database to the exact state it was at 2:13 PM. On the mobile side, you must actively integrate with native cloud backups (iCloud Backup for iOS, Google Drive Backup for Android). You must configure your \`AndroidManifest.xml\` and \`Info.plist\` to explicitly define which local SQLite files should be synced to the user's personal cloud, allowing them to buy a new phone, reinstall the app, and instantly resume their session.

### Production SaaS
Enterprise backup strategies require strict "Data Sovereignty" rules. You cannot backup European user data to an American server. You must implement geo-redundant database replication (e.g., AWS Aurora Global Database). Furthermore, local mobile backups must be encrypted with a key derived from the user's biometric hardware, meaning even if someone extracts the SQLite backup file from their Google Drive, it is cryptographically impossible to read without the original user's fingerprint.

## Implementation Steps
\`\`\`prompt
Act as a Mobile Infrastructure Expert. I am building a React Native app. Provide the exact XML configuration required in my \`AndroidManifest.xml\` to enable Android Auto-Backup for my app's specific local SQLite database file, while explicitly excluding temporary cache directories to save the user's Google Drive quota.
\`\`\`

## Validation Checklist
- [ ] Backend database has automated daily backups enabled.
- [ ] Mobile app correctly opts in/out of OS-level cloud backups (iCloud/Google Drive).
- [ ] A disaster recovery runbook exists outlining the exact steps to restore the database.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilecicd': `# CI/CD Pipeline

**Estimated Time:** 4-8 hours

---

## Why this matters
Building a mobile app for production takes 15 minutes on a high-end MacBook. If you rely on your personal laptop to build and upload the APK/IPA to the app stores, you will eventually make a mistake: you'll build with the wrong API keys, you'll forget to increment the version number, or you'll spill coffee on your laptop and be physically unable to deploy a critical bug fix.

## Strategic Guidance

### Hackathon Mode
Build it locally. Use \`npx expo build\` or compile it directly from Xcode/Android Studio. Setting up a remote CI/CD pipeline for a weekend project will consume 30% of your total hacking time.

### Personal Project
Use Expo Application Services (EAS) Build. It completely abstracts away the nightmare of managing Xcode provisioning profiles and Android Keystores. When you run \`eas build\`, your code is shipped to Expo's massive server farm, compiled, and handed back to you as a clean binary. This is the best way to learn the concept of remote compilation without fighting the underlying OS.

### Production SaaS
You must implement a fully automated CI/CD pipeline. Every time you merge a Pull Request into the \`main\` branch, GitHub Actions (or Bitrise) should automatically trigger an EAS Build. Once the build succeeds, the pipeline should automatically submit the binaries directly to Apple TestFlight and the Google Play Beta track using \`eas submit\` or Fastlane. Zero human intervention should be required between clicking "Merge" and the app appearing on beta testers' phones.

### Production SaaS
Enterprise CI/CD involves extreme quality gates. The pipeline must run unit tests, end-to-end (E2E) tests on AWS Device Farm, and static code analysis (SonarQube) to block the build if code coverage drops below 80%. You must implement Over-The-Air (OTA) updates for JavaScript bundles so you can deploy critical UI hotfixes to millions of users in seconds, completely bypassing the grueling 24-hour Apple App Store review process.

## Implementation Steps
\`\`\`prompt
Act as a Mobile DevOps Engineer. I am using Expo and GitHub Actions. Provide a complete \`.github/workflows/build.yml\` file that:
1. Triggers whenever code is merged into the \`main\` branch.
2. Installs dependencies and runs \`npm test\`.
3. If tests pass, runs \`eas build --platform all --profile production\`.
4. Automatically submits the successful builds to TestFlight and Google Play.
\`\`\`

## Validation Checklist
- [ ] The app compiles remotely on a CI server, independent of your personal machine.
- [ ] Secrets and Keystores are securely managed via CI environment variables, not committed to Git.
- [ ] Submissions to TestFlight/Play Console are automated.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileinfrastructure': `# Infrastructure Setup

**Estimated Time:** 2-4 hours

---

## Why this matters
Mobile apps don't exist in a vacuum; they depend entirely on backend infrastructure. If your Node.js server is running on a single $5/month DigitalOcean droplet in New York, users in Tokyo will experience 500ms of latency on every single tap, making the app feel incredibly sluggish and unresponsive.

## Strategic Guidance

### Hackathon Mode
Use Vercel for your backend APIs and Supabase/Firebase for your database. They require zero configuration, scale instantly for the demo, and abstract away all server management. 

### Personal Project
Learn to use edge infrastructure. If you are using Vercel or Cloudflare Workers, deploy your API routes to the "Edge." This means your API code is replicated to hundreds of servers worldwide. A user in London hits a server in London, reducing latency to 20ms. This dramatically improves the "snappiness" of your mobile app without requiring you to write better code.

### Production SaaS
You must implement Infrastructure as Code (IaC) using Terraform or Pulumi. You should never manually click through the AWS console to spin up a Postgres database; it is unrepeatable and error-prone. Your mobile app requires a robust CDN (Content Delivery Network) like CloudFront or Cloudflare to serve images and static assets. If your mobile app tries to download 5MB images directly from a single Node.js server, the server will collapse under the bandwidth load.

### Production SaaS
Enterprise infrastructure requires multi-region redundancy. If the \`us-east-1\` AWS region completely goes down (which happens), your API Gateway must automatically route mobile traffic to the \`us-west-2\` region. You must implement an API Gateway layer (like Kong or AWS API Gateway) to handle rate limiting, SSL termination, and JWT validation before the traffic even reaches your microservices, shielding your core backend from DDoS attacks launched via compromised mobile clients.

## Implementation Steps
\`\`\`prompt
Act as a Cloud Infrastructure Architect. I am using Vercel for my API and Supabase for my database. My mobile app is incredibly slow for users in Europe because my database is in US-East. Explain how I can implement Redis caching (using Upstash) at the Edge to serve Read-Heavy requests (like feed data) to European users with sub-50ms latency.
\`\`\`

## Validation Checklist
- [ ] API routes are deployed to a scalable, serverless environment.
- [ ] Large static assets (images, videos) are served via a global CDN.
- [ ] Database regions are selected strategically based on the target user demographic.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileappsizeoptimization': `# App Size Optimization

**Estimated Time:** 2-3 hours

---

## Why this matters
The size of your app directly correlates to your conversion rate. If a user clicks your ad on Facebook but sees your app is 250MB, they will likely cancel the download to save data or because their phone is full. Reducing your app size by 50% can increase your install rate by 15%.

## Strategic Guidance

### Hackathon Mode
Ignore this. A basic React Native app is around 40-60MB. That is perfectly fine for a demo or a TestFlight distribution.

### Personal Project
Focus on media assets. You probably dropped a 5MB \`.png\` background image into your \`assets/\` folder. Use tools like TinyPNG or ImageOptim to compress all static images in your app before building. If possible, replace heavy image assets with SVG vectors, which look infinitely sharp and consume kilobytes instead of megabytes.

### Production SaaS
You must aggressively audit your JavaScript dependencies. Use \`react-native-bundle-visualizer\` to see exactly which NPM packages are bloating your app. Did you import the entire \`lodash\` library just to use \`_.debounce\`? That single mistake adds 1MB of JavaScript to your bundle. You must also implement Android App Bundles (.aab) instead of APKs. App Bundles allow Google Play to generate highly optimized, device-specific binaries, reducing download sizes by up to 30% by stripping out unneeded screen densities and language files.

### Production SaaS
Enterprise app size optimization requires ruthless native code pruning. If you include an SDK for scanning credit cards, you must strip out the compiled C++ architectures (like \`x86\`) that are only used for simulators, ensuring only \`arm64\` libraries ship to physical devices. You may need to implement "On-Demand Resources" (iOS) or "Play Feature Delivery" (Android), where the core app is only 20MB, and heavy features (like an AR camera filter) are downloaded in the background only when the user explicitly requests them.

## Implementation Steps
\`\`\`prompt
Act as a React Native Build Expert. I need to reduce my Android App size. Provide the exact \`android/app/build.gradle\` configuration required to enable ProGuard/R8 (for dead code stripping) and enable separate APK builds per architecture (ABI splitting) to ensure I am not shipping x86 simulator binaries to physical ARM devices.
\`\`\`

## Validation Checklist
- [ ] All static images are compressed or replaced with SVGs.
- [ ] The app is distributed as an Android App Bundle (.aab) on Google Play.
- [ ] Unused or massive NPM dependencies have been identified and removed.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilebatteryoptimization': `# Battery Optimization

**Estimated Time:** 2-4 hours

---

## Why this matters
If your app drains 15% of a user's battery in 10 minutes, they will uninstall it immediately. Both iOS and Android have deep OS-level monitoring that will actively alert the user if your app is consuming excessive power in the background, forcing them to restrict your app's capabilities.

## Strategic Guidance

### Hackathon Mode
Don't worry about it. If the app murders the battery, just make sure your phone is plugged in during the live demo.

### Personal Project
Focus on location services and network polling. If you need the user's location, ask for it exactly once when the component mounts. Do not accidentally leave a \`setInterval\` running that pings your backend every 5 seconds while the user is on the home screen; this keeps the cellular radio active and shreds battery life.

### Production SaaS
You must meticulously manage background tasks. When the user swipes your app into the background, all active WebSockets should be gracefully disconnected, and all high-frequency animations must be paused. If you need to run background syncs, use native Background Fetch APIs. These APIs hand off the scheduling to the OS, which brilliantly groups your app's network requests with other apps' requests, waking the cellular radio only once to save power.

### Production SaaS
Enterprise battery optimization requires hardware-level profiling using Android Studio Energy Profiler and Xcode Instruments. You must optimize your UI rendering loops. If your app renders a custom graph, and the JS thread is desperately recalculating layout coordinates 60 times a second, the CPU will run at 100% and generate physical heat. You must offload heavy calculations to native C++ threads or rewrite the rendering logic using highly efficient native graphics APIs (like Skia).

## Implementation Steps
\`\`\`prompt
Act as a Mobile Performance Expert. I am building a React Native app that uses a WebSocket for real-time chat. Provide a robust hook (\`useAppState.ts\`) that listens to the native OS App State (Foreground/Background). The hook must explicitly disconnect the WebSocket when the app enters the background to save battery, and automatically reconnect when it enters the foreground.
\`\`\`

## Validation Checklist
- [ ] WebSockets and heavy polling are terminated when the app is backgrounded.
- [ ] Location services use the lowest necessary accuracy (e.g., 'City' vs 'Exact GPS').
- [ ] The app does not cause the physical device to noticeably heat up during normal use.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilescalability': `# Scalability & Load Testing

**Estimated Time:** 3-5 hours

---

## Why this matters
If your app goes viral on TikTok, thousands of users will download it and hit your API simultaneously. If your backend is not scalable, the app will crash, the users will leave 1-star reviews, and the viral momentum will be permanently destroyed. Scalability is about preparing for success.

## Strategic Guidance

### Hackathon Mode
Don't scale. Hackathons are about building prototypes for 5 judges, not 50,000 users. Your Vercel hobby tier is more than enough.

### Personal Project
Focus on Database Indexes. If you have a query that searches for a user by email (\`SELECT * FROM users WHERE email = 'test@test.com'\`), and you do not have an index on the \`email\` column, your database has to scan every single row. If you get 10,000 users, this query will take seconds instead of milliseconds, crashing your app. Add basic indexes to all columns you frequently search or filter by.

### Production SaaS
You must load test your infrastructure. Use a tool like k6 or Artillery to simulate 1,000 concurrent mobile users logging in and fetching their feed. This will expose bottlenecks instantly. You will likely discover that your Postgres connection pool is exhausted. You must implement a connection pooler (like PgBouncer or Supabase Supavisor) so your database can handle 10,000 incoming mobile connections without crashing.

### Production SaaS
Enterprise scalability requires extreme caching and asynchronous processing. If a user uploads a video, your backend should not process it synchronously while holding the HTTP connection open. It must instantly return a \`202 Accepted\` and drop the video into a message queue (like AWS SQS or Kafka). Worker nodes then process the queue independently. You must also implement aggressive CDN caching for API GET requests; if a viral post is viewed 1 million times, 999,999 of those requests should hit the Cloudflare Edge cache, never even touching your origin database.

## Implementation Steps
\`\`\`prompt
Act as a Backend Scalability Expert. I expect a massive spike in mobile traffic. My app makes a heavy API request to \`GET /api/feed\`. Provide a k6 load-testing script that simulates 500 Virtual Users (VUs) constantly hitting this endpoint for 3 minutes, so I can identify if my database connection pool is sufficient.
\`\`\`

## Validation Checklist
- [ ] Database tables are properly indexed for high-frequency queries.
- [ ] Connection pooling is configured to prevent database exhaustion.
- [ ] Heavy, long-running tasks are offloaded to asynchronous background queues.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileplaystoresetup': `# Google Play Store Setup

**Estimated Time:** 1-2 hours

---

## Why this matters
The Google Play Store is the primary distribution channel for 70% of the world's mobile devices. Setting up your developer account correctly is the critical first step. Unlike the web, where you can deploy a URL instantly, publishing to the Play Store involves strict identity verification, tax agreements, and a mandated testing period for new developers.

## Strategic Guidance

### Hackathon Mode
Skip this entirely. Do not attempt to create a Google Play Developer account during a hackathon. Use Expo Go or distribute the raw APK via a Google Drive link for the judges. Verification takes days.

### Personal Project
You must pay a one-time $25 fee to register as a Google Play Developer. Be warned: Google recently enacted a policy requiring all *new* personal developer accounts to have 20 independent users opt-in to a closed test of your app for 14 continuous days before you are allowed to publish to production. You must factor this massive two-week delay into your launch timeline.

### Production SaaS
Register as an Organization, not an individual. This requires a D-U-N-S number (which can take a week to acquire) but completely bypasses the 20-tester/14-day requirement. It also displays your official company name under the app title, which significantly boosts user trust. You must also configure your Google Play App Signing key correctly; if you lose the original upload keystore, Google Play App Signing allows you to reset it. Without it, losing your keystore means permanently losing the ability to update your app.

### Production SaaS
Enterprise setup requires strict IAM (Identity and Access Management) within the Google Play Console. You must never share the root Owner credentials. Engineers should only be granted the "Release Manager" role for specific apps, while the marketing team gets "Store Presence" access, and the finance team gets "Financial Data" access to view in-app purchase revenue.

## Implementation Steps
\`\`\`prompt
Act as a Google Play Console Expert. Provide a step-by-step checklist on how to configure 'Google Play App Signing' for a new React Native Android app. Explain the difference between the 'Upload Key' and the 'App Signing Key', and outline the exact CLI commands to generate a secure Keystore file.
\`\`\`

## Validation Checklist
- [ ] A Google Play Developer account has been created and identity verification is complete.
- [ ] For individuals, a strategy is in place to recruit 20 testers for the 14-day mandatory period.
- [ ] Google Play App Signing is enabled and the Upload Keystore is securely backed up.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileappstoresetup': `# Apple App Store Setup

**Estimated Time:** 2-3 hours

---

## Why this matters
Apple's ecosystem is highly lucrative but notoriously strict. Before a single line of code can run on a physical iPhone outside of development, you must navigate Apple's complex web of Certificates, Identifiers, and Profiles. App Store Connect is where your app's digital identity is born.

## Strategic Guidance

### Hackathon Mode
Do not attempt this. The Apple Developer Program costs $99/year and enrollment can take days to process. Use Expo Go or a simulator for your pitch.

### Personal Project
You must enroll in the Apple Developer Program as an Individual. You will need to generate a Certificate Signing Request (CSR) from your Mac, create a Distribution Certificate, and register an explicit App ID (e.g., \`com.yourname.app\`). Be extremely careful with your certificates; if you delete them from your Keychain, you cannot build updates for your app.

### Production SaaS
Enroll as a Company/Organization. Like Google, this requires a D-U-N-S number. This ensures your company name (e.g., "Acme Corp") appears as the seller, not your personal name ("John Doe"). You must configure your App Store Connect API keys. Never use personal Apple IDs for CI/CD authentication; generate an App Store Connect API Key (p8 file) with the "App Manager" role to allow automated tools like Fastlane or EAS Build to upload binaries directly to TestFlight without triggering 2FA prompts.

### Production SaaS
Enterprise setups often require the Apple Developer Enterprise Program ($299/year), which allows you to distribute proprietary apps directly to your employees without ever going through App Store review. However, Apple strictly audits this. For public-facing apps, you must configure strict Role-Based Access Control (RBAC) in App Store Connect, separating the "Developer" roles (who can upload builds) from the "App Manager" roles (who can push the 'Submit for Review' button).

## Implementation Steps
\`\`\`prompt
Act as an iOS DevOps Expert. I am using Expo EAS. Provide the exact steps and CLI commands to generate an App Store Connect API Key, download the \`.p8\` file, and securely configure it within the \`eas.json\` and my GitHub Actions pipeline so I can achieve fully automated TestFlight uploads.
\`\`\`

## Validation Checklist
- [ ] Apple Developer Program enrollment is active.
- [ ] An explicit App ID (Bundle Identifier) has been registered.
- [ ] App Store Connect API Keys have been generated for automated CI/CD deployments.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileappicons': `# App Icons

**Estimated Time:** 1-2 hours

---

## Why this matters
Your app icon is the first visual interaction a user has with your product. A blurry, poorly cropped icon screams "amateur" and destroys trust before the app is even opened. Both iOS and Android have incredibly specific, and constantly changing, requirements for icon sizes, safe zones, and background layers.

## Strategic Guidance

### Hackathon Mode
Use a free generator like \`icon.kitchen\` or \`appicon.co\`. Pick a solid color background, drop a white SVG icon in the center, download the zip file, and move on.

### Personal Project
Ensure you do not include transparent backgrounds for iOS. Apple strictly forbids transparency in app icons; any transparent pixels will be filled with a harsh, solid black background, ruining your design. Keep the design simple and recognizable at a 50x50 pixel scale.

### Production SaaS
You must implement Adaptive Icons for Android. Android OEMs (Samsung, Pixel, OnePlus) apply custom masks to icons (circles, squircles, teardrops). If you provide a single flat square image, it will be awkwardly cropped or placed inside an ugly white circle. You must provide a foreground SVG and a background color/image, allowing the OS to render the icon natively and apply smooth parallax animations when the user swipes home.

### Production SaaS
Enterprise apps should utilize dynamic app icons. If you run a dark-mode focused brand, or have a premium subscription tier, you can allow users to change the app icon directly within the app settings. Apple and Google provide native APIs for this. Furthermore, you must provide explicitly scaled \`.png\` assets for every possible device density (mdpi to xxxhdpi) to ensure perfect pixel alignment without relying on the OS to downscale a massive 1024x1024 image.

## Implementation Steps
\`\`\`prompt
Act as a Mobile UI/UX Designer. I am building a React Native app with Expo. Provide the required dimensions, formats, and \`app.json\` configuration needed to support Android Adaptive Icons. Explain the concept of the 'Safe Zone' and how large my foreground logo should be to avoid getting clipped by circular OEM masks.
\`\`\`

## Validation Checklist
- [ ] The iOS icon has exactly zero transparent pixels.
- [ ] Android Adaptive Icons (Foreground and Background) are correctly configured.
- [ ] The core logo remains legible and un-clipped inside the standard circular safe zone.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilescreenshots': `# Screenshots

**Estimated Time:** 2-4 hours

---

## Why this matters
Screenshots are not just pictures of your app; they are your primary marketing billboard. 60% of users will not read a single word of your description. They will scroll through your first three screenshots and instantly decide whether to download. Raw, unedited screenshots with a generic status bar showing low battery will fail to convert.

## Strategic Guidance

### Hackathon Mode
Take raw screenshots on a simulator and upload them. Don't waste time wrapping them in device frames or adding marketing copy.

### Personal Project
Use a tool like Previewed.app or AppMockUp. Put your raw screenshots inside an iPhone/Pixel device frame, add a solid background color, and place large, bold, highly readable text at the top explaining the core value proposition of that specific screen. Always sanitize the status bar: ensure the time is 9:41 (Apple standard), the battery is full, and there are no distracting notification icons.

### Production SaaS
You must treat screenshots as A/B testing assets. Do not just list features; highlight benefits. The first screenshot is the most critical?it must summarize the entire app. For Android, you must upload specific screenshots for 7-inch and 10-inch tablets. If you simply stretch phone screenshots, Google Play will penalize your search ranking for tablet users. Apple requires strict resolutions: you must provide exact 6.5-inch (Pro Max) and 5.5-inch (Plus) dimensions. 

### Production SaaS
Enterprise store optimization requires deep localization. If your app is available in Japan, your screenshots must feature Japanese UI text, Japanese marketing copy, and culturally relevant device frames/backgrounds. You must continually A/B test your screenshots using the Google Play Store Listing Experiments tool to scientifically determine which design yields the lowest Cost Per Install (CPI).

## Implementation Steps
\`\`\`prompt
Act as an App Store Optimization (ASO) Expert. What are the top 5 psychological principles for designing high-converting App Store screenshots? Provide a structured layout plan for the first 3 screenshots of a [Insert App Type] app, including the marketing copy to place above the device frames.
\`\`\`

## Validation Checklist
- [ ] Status bars in screenshots are sanitized (Full battery, standard time, no notifications).
- [ ] Screenshots are framed with marketing copy explaining the value, not just the feature.
- [ ] Correct resolutions are generated for iOS (6.5") and Android (Phone + 7" Tablet).
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilefeaturegraphics': `# Feature Graphics

**Estimated Time:** 1-2 hours

---

## Why this matters
The Google Play Store requires a "Feature Graphic" (1024x500). Without it, you physically cannot publish your app. Apple does not require this, but Google uses this massive banner image everywhere: at the top of your store listing, in search ads, and across the "Recommended for You" carousels throughout the Play Store.

## Strategic Guidance

### Hackathon Mode
Open Canva, create a 1024x500 canvas, slap your logo in the middle of a gradient background, download it as a JPEG, and upload it.

### Personal Project
Keep it simple but professional. Do not put critical text near the edges; Google routinely crops the edges of the feature graphic depending on the device layout (tablets vs. phones). Do not pack it with text. Use it to establish brand identity: a clean background, your logo, and maybe a subtle, blurred hint of your app's UI in the background.

### Production SaaS
The Feature Graphic often serves as the cover image for your promotional video. Therefore, you must ensure you do not place critical visual elements or your logo dead-center, as the massive Play Store "Play Video" button will cover it completely. Update this graphic seasonally. If you run a massive Black Friday sale or release a major V2.0 update, update the feature graphic to reflect this; it signals to users that the app is actively maintained.

### Production SaaS
Enterprise graphics must be strictly localized. If the graphic contains any text, that text must be translated for every single language your store listing supports. Furthermore, ensure the aesthetic aligns with Google's Material Design guidelines. A/B test the feature graphic vigorously, as it is the single largest visual element driving organic search conversions on Android.

## Implementation Steps
\`\`\`prompt
Act as a Graphic Designer. I need to create a Google Play Feature Graphic (1024x500). Give me 3 distinct, high-converting design concepts for a [Insert App Type] app. Explicitly outline the 'Safe Zones' and explain where I should avoid placing text to prevent it from being obscured by the Play Store UI overlay.
\`\`\`

## Validation Checklist
- [ ] A 1024x500 PNG/JPEG graphic has been created.
- [ ] No critical text or logos are placed in the dead-center (to avoid the play button) or the extreme edges.
- [ ] The design communicates the core brand without looking cluttered.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilestorelistingseo': `# Store Listing SEO (ASO)

**Estimated Time:** 2-4 hours

---

## Why this matters
App Store Optimization (ASO) is the SEO of the mobile world. 65% of all app downloads come directly from organic searches within the App Store and Google Play. If your app is named "Taskify" and your description just says "A cool task app," you will never appear when a user searches for "daily planner and habit tracker."

## Strategic Guidance

### Hackathon Mode
Don't waste time on ASO. Just write a 2-sentence description so the store lets you publish it.

### Personal Project
Focus on your Title and Subtitle. The App Title is the single heaviest ranking factor on both iOS and Android. Do not just use your brand name. If your brand is unknown, append a keyword: "Taskify - Daily Planner". On iOS, you are given a 100-character invisible Keyword Field. Fill it entirely with comma-separated keywords (no spaces after commas) and never repeat words that are already in your title.

### Production SaaS
You must understand the algorithmic differences between Apple and Google. Apple completely ignores your Long Description for search rankings; they only index your Title, Subtitle, and Keyword Field. Google, however, indexes your entire Long Description like a webpage. For Google Play, you must write a robust, keyword-dense (but natural-sounding) description, strategically repeating your target keyword 3-5 times. For Apple, focus all your energy on optimizing the exact 30 characters in your Subtitle and the 100-character keyword bank.

### Production SaaS
Enterprise ASO requires continuous iteration. You must use tools like SensorTower or AppTweak to analyze competitors' keyword rankings, search volume, and difficulty scores. If you try to rank for "Fitness App," you will fail against Nike and Peloton. You must identify "Long-Tail Keywords" (e.g., "Kettlebell workout tracker for men") and dominate those niches first. Additionally, localize your keywords. Translating English keywords directly to Spanish often fails; you must research the actual colloquial terms native users type into the search bar.

## Implementation Steps
\`\`\`prompt
Act as an App Store Optimization (ASO) Specialist. My app is called [App Name] and it does [Core Function]. Generate a highly optimized iOS Title (max 30 chars), iOS Subtitle (max 30 chars), and an iOS Keyword Bank (exactly 100 characters, comma-separated, no spaces, excluding words already in the title). Then, generate a Google Play Short Description (max 80 chars) that includes my top keywords.
\`\`\`

## Validation Checklist
- [ ] The App Title includes the brand name AND a primary descriptive keyword.
- [ ] The iOS 100-character keyword field is fully utilized with no wasted spaces.
- [ ] The Google Play Long Description naturally incorporates target keywords 3-5 times.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileprivacypolicy': `# Privacy Policy

**Estimated Time:** 1-2 hours

---

## Why this matters
Both Apple and Google strictly require a Privacy Policy URL before they will let you publish an app, even if your app doesn't explicitly ask the user for data. If you use Firebase, Crashlytics, or Supabase Auth, you are collecting data (IP addresses, device identifiers, email addresses). Failing to disclose this violates international laws (GDPR/CCPA) and will result in an immediate App Store rejection.

## Strategic Guidance

### Hackathon Mode
Generate a free privacy policy using Termly or TermsFeed. Host it on a free Notion page or GitHub Pages, copy the public link, and paste it into the App Store submission form. It doesn't need to be perfect; it just needs to exist.

### Personal Project
You must explicitly state what third-party SDKs you use. If you use Expo, state that you use Expo. If you use PostHog for analytics, state that you collect anonymized usage data. Google Play now has a mandatory "Data Safety" form that you must fill out in the Console. Your answers on that form must match what your Privacy Policy says. If your Data Safety form says "We do not collect any data" but your app includes the Facebook SDK, Google will suspend your app.

### Production SaaS
Your Privacy Policy must be a legally binding document hosted on a dedicated route (e.g., \`yourdomain.com/privacy\`). It must clearly outline your Data Retention policy: how long you keep data, and how a user can request account deletion. Apple recently mandated that any app offering account creation *must* offer in-app account deletion. If your privacy policy does not explain the deletion process, Apple will reject the update.

### Production SaaS
Enterprise compliance (SOC2, HIPAA, GDPR) requires a meticulously drafted Privacy Policy by a specialized legal team. You must explicitly cover cross-border data transfers, the exact encryption standards used at rest and in transit, and the contact information for your designated Data Protection Officer (DPO). You must also implement a mandatory consent flow within the app UI (e.g., a Cookie/Tracking banner) before initializing any analytics SDKs.

## Implementation Steps
\`\`\`prompt
Act as a Legal Tech Expert. I am building a mobile app that uses Supabase for authentication, PostHog for analytics, and RevenueCat for in-app purchases. Generate a comprehensive Privacy Policy in Markdown format that complies with GDPR and CCPA requirements. Include a specific section on "Data Deletion Requests".
\`\`\`

## Validation Checklist
- [ ] A Privacy Policy document is generated and hosted on a publicly accessible URL.
- [ ] The policy explicitly names all third-party SDKs used in the app.
- [ ] The policy includes instructions for users to request data deletion.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobiletermsofservice': `# Terms of Service

**Estimated Time:** 1-2 hours

---

## Why this matters
The Terms of Service (ToS) or End User License Agreement (EULA) is your legal shield. It outlines the rules users must follow to use your app and limits your liability if things go wrong. While Apple provides a standard EULA by default, having your own custom terms is critical if your app involves user-generated content, subscriptions, or physical services.

## Strategic Guidance

### Hackathon Mode
Skip this. Apple's default EULA covers you enough for a weekend hackathon. Do not waste time drafting legal documents when you should be writing code.

### Personal Project
If your app allows users to post content (forums, comments, image uploads), you must have a ToS that strictly prohibits Objectionable Content (hate speech, nudity, illegal acts). Apple requires all User Generated Content (UGC) apps to have a reporting mechanism and a strict ToS. Without these, your app will be rejected under Guideline 1.2.

### Production SaaS
If you offer auto-renewing subscriptions, Apple and Google have highly specific requirements for your ToS. You must explicitly state the length of the subscription, the price, the auto-renewal terms, and instructions on how the user can cancel the subscription via their OS settings. Failure to clearly state auto-renewal terms in your ToS (and on the paywall UI itself) will result in an immediate rejection.

### Production SaaS
Enterprise applications require a bespoke Master Services Agreement (MSA) or highly specific ToS that covers Service Level Agreements (SLAs), indemnification, and binding arbitration clauses. If your app handles financial transactions or medical advice, your ToS must include massive, explicitly styled disclaimers (ALL CAPS) stating that the service does not constitute professional advice and that liability is capped at the amount paid by the user.

## Implementation Steps
\`\`\`prompt
Act as a Tech Lawyer. Generate a Terms of Service for a mobile SaaS app that includes User Generated Content and auto-renewing subscriptions. Ensure it contains the mandatory Apple App Store clauses regarding Objectionable Content, user reporting, and auto-renewal cancellation instructions.
\`\`\`

## Validation Checklist
- [ ] The Terms of Service is hosted on a publicly accessible URL.
- [ ] A clause prohibiting objectionable content is included (if applicable).
- [ ] Auto-renewing subscription terms are clearly defined (if applicable).
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilecontentrating': `# Content Rating

**Estimated Time:** 30 minutes

---

## Why this matters
Both Google Play and the App Store require you to complete a Content Rating questionnaire before publishing. This determines the age restriction of your app (e.g., 4+, 12+, 17+). Answering this questionnaire incorrectly is a violation of store policies and can lead to your app being pulled from the store for "misleading metadata."

## Strategic Guidance

### Hackathon Mode
You still have to fill this out. Just answer "No" to all questions (assuming your app doesn't have violence, gambling, or explicit content) to get an "Everyone" rating.

### Personal Project
Be honest. If your app is a social network or forum, you must declare that it contains "User Generated Content." This will generally elevate your age rating to 12+ or 17+ automatically, because you cannot control what users post. If you try to claim a 4+ rating for an app with a global chat room, Apple will reject it.

### Production SaaS
If your app deals with medical information, alcohol, dating, or real-money gambling, you must pay extreme attention to the content rating. Certain categories are completely banned in specific countries. For example, apps dealing with cryptocurrency or VPNs face massive regional restrictions. You must ensure your declared rating exactly matches the core functionality of your app to avoid retroactive bans.

### Production SaaS
Enterprise apps often fall under the "Productivity" or "Business" category and easily achieve an "Everyone" rating. However, if your enterprise app involves unfiltered web access (like a custom browser) or handles highly regulated content (like cannabis delivery logistics), you must provide explicit documentation and legal licenses to the app review teams to justify your presence on the store, regardless of the age rating.

## Implementation Steps
\`\`\`prompt
Act as an App Store Reviewer. My app is a [Describe App] that allows users to [Describe Features]. What age rating should I expect on iOS and Android? Are there any specific Content Rating questions I need to be careful with regarding User Generated Content or unfiltered web access?
\`\`\`

## Validation Checklist
- [ ] The IARC Content Rating questionnaire is completed in the Google Play Console.
- [ ] The Apple App Store age rating questionnaire is completed.
- [ ] Apps with User Generated Content (UGC) have correctly declared this, accepting the higher age rating.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobiletesttracks': `# Test Tracks

**Estimated Time:** 1-2 hours

---

## Why this matters
You should never deploy a build straight to Production. Both Google and Apple provide dedicated "Test Tracks" (Internal, Closed Beta, Open Beta, TestFlight) that allow you to distribute the app to real devices for QA testing before public release.

## Strategic Guidance

### Hackathon Mode
Skip Test Tracks entirely. Use Expo Go or sideload the app directly. Setting up TestFlight or Google Play Internal Testing takes too long for a 48-hour event.

### Personal Project
For iOS, use TestFlight. You can add up to 100 internal testers just by entering their Apple IDs. For Android, use the "Internal Testing" track. You simply add the Gmail addresses of your friends. This allows them to download the app directly from the Google Play Store app as if it were published, but it remains completely hidden from the public.

### Production SaaS
You must implement a strict multi-track deployment pipeline. Your CI/CD (like EAS Build) should push every successful merge on the \`main\` branch directly to the Google Play Internal Track and iOS TestFlight. Once QA approves the internal build, you promote that exact same binary to the "Closed Beta" track. Never rebuild the app between testing and production; always promote the identical, tested binary artifact.

### Production SaaS
Enterprise deployment often bypasses public test tracks entirely. You will use Mobile Device Management (MDM) solutions or Apple Business Manager to distribute the app directly to employee devices. If using public stores, you must utilize "Staged Rollouts" (Phased Releases). You release the app to 1% of users, monitor Crashlytics for 24 hours, then expand to 10%, 50%, and 100%. If a critical memory leak occurs, you halt the rollout immediately.

## Implementation Steps
\`\`\`prompt
Act as a Mobile Release Manager. Outline a strict promotion strategy using Google Play Console and App Store Connect. Explain the difference between 'Internal Testing', 'Closed Testing', and 'Open Testing' on Android, and how to use 'Phased Releases' on iOS to minimize the impact of critical bugs.
\`\`\`

## Validation Checklist
- [ ] The initial binary has been uploaded to the Internal Testing track / TestFlight.
- [ ] Test accounts have been added to the internal testers list.
- [ ] The build installs and launches successfully on a physical test device.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilebetatesting': `# Beta Testing

**Estimated Time:** 1-2 weeks (Active Testing)

---

## Why this matters
Beta testing is the crucible where your app proves it can survive the real world. Simulators do not replicate terrible cellular connections, older hardware, aggressive background task killers, or real user behavior. 

## Strategic Guidance

### Hackathon Mode
You don't have time for beta testing. The judges are your beta testers. Make sure the "Happy Path" works flawlessly.

### Personal Project
Distribute a public TestFlight link and a Google Play Closed Beta invite link on Reddit, Twitter, or Discord. Your goal here is to find the weird edge cases: Does the UI break on a tiny iPhone SE? Does the app crash on an older Android 10 device? Focus heavily on fixing crashes before the public launch.

### Production SaaS
Beta testing must be systematic. Use tools like Instabug or Sentry's user feedback widget to allow beta testers to shake their phone and submit a bug report with logs attached. You must track your "Crash-Free Users" percentage in Crashlytics. Do not promote a beta to production unless you have a 99.5% crash-free session rate over a 7-day period.

### Production SaaS
Enterprise beta testing involves UAT (User Acceptance Testing) with strict sign-offs from stakeholders. You must provide testers with explicit test scripts ("Log in, navigate to inventory, scan barcode, verify sync"). You must monitor the backend metrics during the beta: Did the mobile app cause a massive spike in database reads? Did the connection pool hold up? Beta is not just for UI bugs; it's a stress test for the entire infrastructure.

## Implementation Steps
\`\`\`prompt
Act as a QA Lead. Create a structured 5-step User Acceptance Testing (UAT) script for my beta testers. The app is a [Insert App Type]. The script should cover Authentication, the Core User Flow, Offline Behavior (Airplane Mode), and Edge Cases.
\`\`\`

## Validation Checklist
- [ ] The app has been distributed to at least 10 external beta testers.
- [ ] Crashlytics (or similar) is actively monitoring beta sessions.
- [ ] The crash-free session rate is above 99%.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilereleasechecklist': `# Release Checklist

**Estimated Time:** 1-2 hours

---

## Why this matters
Deploying a mobile app is not like deploying a website. You cannot just push a hotfix if you break production. App review takes 24-48 hours. If you push a critical bug, your users are stuck with a broken app for two days while you wait for Apple/Google to approve your patch. The release checklist is your last line of defense.

## Strategic Guidance

### Hackathon Mode
- [ ] Does it compile?
- [ ] Does the core feature work?
- [ ] Ship it.

### Personal Project
Ensure you have removed all debug code. Did you leave a \`console.log\` printing user passwords? Did you forget to switch your API keys from the Stripe Test Environment to the Live Environment? Do a full walkthrough of the app on a physical device, not a simulator.

### Production SaaS
Your release checklist must be institutionalized. 
1. Database migrations run successfully on Production.
2. All environment variables in EAS/Fastlane point to Production.
3. The app version and build number have been incremented correctly.
4. "What's New" release notes are written and translated.
5. The binary has been tested on both iOS and Android physical devices using cellular data (not just Wi-Fi).

### Production SaaS
Enterprise releases require a formal "Go/No-Go" meeting. You must verify that the Customer Support team is trained on the new features and equipped with troubleshooting documentation. You must verify that the infrastructure team has scaled the backend to handle the influx of users downloading the update. The rollout must be staged (1%, 10%, 100%) and monitored by SREs (Site Reliability Engineers) watching Datadog dashboards for latency spikes.

## Implementation Steps
\`\`\`prompt
Act as a Mobile Release Manager. Provide an exhaustive, 20-point pre-flight release checklist for pushing a React Native app to production. Include checks for environment variables, API endpoints, performance profiling, and store metadata.
\`\`\`

## Validation Checklist
- [ ] All API keys and endpoints point to Production.
- [ ] App version and build number are incremented.
- [ ] The binary has been tested on a physical device over a cellular network.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilepitchdeck': `# Pitch Deck

**Estimated Time:** 2-3 hours

---

## Why this matters
In a hackathon, the best code rarely wins. The best *story* wins. Your pitch deck is the vehicle for that story. It must quickly establish the problem, explain why existing solutions fail, and demonstrate how your mobile app uniquely solves it. A clunky app with a brilliant pitch will consistently beat a flawless app with a confusing pitch.

## Strategic Guidance

### Hackathon Mode
Keep it under 10 slides. You will likely only have 3 to 5 minutes to present. Use a template from Pitch.com or Canva. Do not fill slides with bullet points; use massive font sizes and focus entirely on visuals. The slides should support what you are saying, not replace it.

### Personal Project
If you are building this for your portfolio, treat the Pitch Deck as a "Case Study" presentation. Recruiters don't want to see a 5-minute sales pitch; they want to see your design thinking, the architectural challenges you faced, and how you solved them. Include slides on your tech stack choices and database schema.

### Production SaaS
If you are raising venture capital, your deck must follow the classic Sequoia Capital structure. The most critical slides are the "Problem", "Solution", "Market Size", and "Traction". Investors do not care about your code; they care about distribution. How are you going to acquire the first 10,000 users? Your deck must answer that question immediately.

### Production SaaS
Enterprise pitches (B2B sales) are entirely different from VC pitches. A B2B sales deck must focus intensely on ROI (Return on Investment). You must demonstrate how your mobile app will save the client money, reduce their liability, or increase their throughput. Include case studies, security compliance certifications (SOC2), and integration timelines.

## Implementation Steps
\`\`\`prompt
Act as a Y-Combinator Partner. I am building a [Insert App Type] mobile app. Generate a 10-slide pitch deck outline. For each slide, provide the main headline, the talking points I should memorize, and the visual elements I should put on the screen to keep the audience engaged.
\`\`\`

## Validation Checklist
- [ ] The deck is strictly under 10 slides.
- [ ] There are no paragraphs of text; only short, readable bullet points.
- [ ] The deck explicitly identifies the target user and the core problem being solved.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobiledemoscript': `# Demo Script

**Estimated Time:** 1-2 hours

---

## Why this matters
Live demos are terrifying. Wi-Fi drops, APIs timeout, and simulators crash. A Demo Script ensures you know exactly where to click, what to say, and what to avoid clicking. A well-rehearsed script masks technical flaws and highlights the "Magic Moment" of your application.

## Strategic Guidance

### Hackathon Mode
Never do a live demo if you can avoid it. Record your screen using Loom or QuickTime beforehand. Talk over the pre-recorded video during your presentation. This guarantees zero loading screens, zero crashes, and perfect pacing within the strict 3-minute time limit.

### Personal Project
Write a script for a 60-second YouTube or Twitter demo. Start with the "Hook" in the first 3 seconds to stop the user from scrolling. Do not start by showing the login screen. Start by showing the absolute most valuable feature of the app, then work backward if necessary.

### Production SaaS
Your demo script is your primary sales tool. It should be highly interactive. Do not just talk *at* the user; ask them questions. "How much time do you currently spend doing X?" Then, show them how your app does it in one click. Tailor the script to the specific buyer persona (e.g., show the reporting dashboard to the CEO, but show the quick-entry form to the field worker).

### Production SaaS
Enterprise demos often involve integrating with the client's actual data. Your script must include a sandbox environment pre-loaded with highly realistic, industry-specific dummy data. Showing an enterprise client a demo filled with "Test User 1" and "Foo Bar" destroys credibility. Script exactly how you will demonstrate complex security features, like SSO login or offline-sync conflict resolution.

## Implementation Steps
\`\`\`prompt
Act as a Master Presenter. I need a 3-minute demo script for my mobile app. The "Magic Moment" of my app is [Describe the best feature]. Generate a second-by-second script detailing exactly what I should be clicking on the screen, and exactly what words I should be saying to the audience while I click it.
\`\`\`

## Validation Checklist
- [ ] A screen recording of the "Happy Path" has been captured as a backup.
- [ ] The script skips the login/signup flow and jumps straight to the core value.
- [ ] The entire demo can be completed in under 3 minutes.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilesubmissionchecklist': `# Submission Checklist

**Estimated Time:** 1 hour

---

## Why this matters
Hackathons end with a hard deadline. If you miss the Devpost submission cutoff by 10 seconds, your entire weekend of work is disqualified. The submission process involves gathering links, writing descriptions, rendering videos, and adding team members. It always takes longer than you think.

## Strategic Guidance

### Hackathon Mode
Stop coding 2 hours before the deadline. Seriously. Use those 2 hours to render the demo video, upload it to YouTube, write the Devpost description, take nice screenshots, and ensure all team members are officially added to the project page.

### Personal Project
Treat your GitHub README as your submission page. Ensure you have high-quality GIFs of the app running, a clear explanation of the tech stack, instructions on how to run it locally, and a link to the live App Store / Play Store page if available.

### Production SaaS
Your submission is your Product Hunt launch. You must prepare a "Maker Comment" explaining why you built it. You must have animated GIFs for your gallery, a catchy tagline, and a coordinated strategy to reply to comments immediately as they come in. Launching is a 24-hour full-time job.

### Production SaaS
Enterprise deployment is not a "submission" to a public board; it's a handoff. Your checklist must include transferring ownership of all AWS/GCP accounts, rotating all production API keys, providing the final signed MSA (Master Services Agreement), and delivering the complete API documentation to the client's internal IT team.

## Implementation Steps
\`\`\`prompt
Act as a Hackathon Veteran. My team is submitting our mobile app to Devpost in 2 hours. Provide a rapid-fire, prioritized checklist of exactly what we need to write, record, and upload to ensure our project page looks incredibly professional to the judges.
\`\`\`

## Validation Checklist
- [ ] The Demo Video is uploaded to YouTube/Vimeo and is publicly accessible.
- [ ] All team members are officially added to the submission platform.
- [ ] The GitHub repository is set to Public and contains a proper README.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileanalytics': `# Analytics

**Estimated Time:** 2-4 hours

---

## Why this matters
Without analytics, you are flying blind. You might think users love your new "Social Feed" feature, but analytics might reveal that 90% of users click the tab, scroll for 2 seconds, and immediately close the app. Analytics turn subjective assumptions into objective facts, allowing you to iterate on what actually drives revenue and retention.

## Strategic Guidance

### Hackathon Mode
Don't implement analytics. It takes too much time to set up properly and provides zero value during a 3-minute demo.

### Personal Project
Implement a lightweight solution like PostHog. You don't need to track every single button click. Focus on the core funnel: App Opened -> Account Created -> Core Action Performed -> Purchase Completed. If you track nothing else, track those 4 events so you can see exactly where users are abandoning your app.

### Production SaaS
You must implement a strict Tracking Plan. Do not allow developers to randomly name events (\`clicked_button\` vs \`Button Clicked\`). Use a unified nomenclature like \`Object_Action\` (e.g., \`Subscription_Purchased\`, \`Profile_Updated\`). Furthermore, you must separate your tracking environments. Never send development analytics to your production Mixpanel/Amplitude project; it will permanently corrupt your data.

### Production SaaS
Enterprise analytics requires strict data governance and privacy compliance (GDPR/CCPA/HIPAA). You often cannot use third-party cloud analytics. You must implement self-hosted solutions (like self-hosted PostHog or Snowplow) or stream raw event data directly into your own secure data warehouse (e.g., Google BigQuery or Snowflake). You must also ensure that absolutely zero Personally Identifiable Information (PII), such as email addresses or plain-text names, is passed in the analytics payload.

## Implementation Steps
\`\`\`prompt
Act as a Data Architect. Create a structured 'Tracking Plan' for a [Insert App Type] mobile app. Define the top 10 most critical custom events I should track, including the exact nomenclature format (e.g., Noun_Verb), and list the specific metadata properties that should be attached to each event.
\`\`\`

## Validation Checklist
- [ ] Analytics SDK is installed and successfully capturing events.
- [ ] Development data is strictly separated from Production data.
- [ ] The core conversion funnel (Signup -> Activation -> Purchase) is fully instrumented.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilenotificationsstrategy': `# Notifications Strategy

**Estimated Time:** 2-3 hours

---

## Why this matters
Push notifications are the most powerful tool in mobile software. When used correctly, they double user retention. When abused, they cause immediate app deletions. A generic "Check out what's new!" blast to your entire user base is spam. You need a strategy that delivers the right message, to the right user, at the exact right time.

## Strategic Guidance

### Hackathon Mode
You only need local notifications to prove the concept works. Trigger a hardcoded notification 5 seconds after the user taps a button during the demo.

### Personal Project
Focus on Transactional notifications, not Promotional ones. If your app is a task manager, send a notification when a deadline is 1 hour away. Do not send notifications asking them to upgrade to Premium. You must also nail the permission request: never ask for push notification permissions immediately on app launch. Wait until the user performs an action where notifications provide obvious value (e.g., after they create their first task, ask: "Want us to remind you when this is due?").

### Production SaaS
You must implement Behavioral Segmentation using tools like OneSignal or Braze. Stop blasting everyone. Create segments: "Active users who haven't logged a meal in 48 hours" or "Users who abandoned the checkout screen." Furthermore, you must respect time zones. If you schedule a global blast at 9:00 AM EST, your users in Tokyo will receive a promotional ping at 10:00 PM, resulting in massive opt-outs.

### Production SaaS
Enterprise notifications must support deep integrations and complex routing. If a server goes down, an alert must trigger a push notification, an SMS, and an email simultaneously to the on-call engineer via PagerDuty integration. You must also implement strict rate-limiting. A bug in your backend loop should never result in a user receiving 500 identical push notifications in a single minute.

## Implementation Steps
\`\`\`prompt
Act as a Mobile CRM Expert. I am building a [Insert App Type]. Design a Push Notification strategy. First, write the exact UI copy I should use to ask for notification permissions at the perfect 'Magic Moment'. Second, outline 3 automated, behavior-triggered push notification campaigns to re-engage churning users.
\`\`\`

## Validation Checklist
- [ ] The app requests notification permissions only after demonstrating value, never on initial launch.
- [ ] Automated campaigns are triggered by user behavior, not just scheduled blasts.
- [ ] Push notifications respect user time zones to avoid late-night disturbances.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileuserfeedback': `# User Feedback

**Estimated Time:** 1-2 hours

---

## Why this matters
If you don't provide users with an easy way to complain *inside* the app, they will complain *outside* the app?"on the App Store, where the review becomes permanent. Capturing frustration early allows you to fix bugs before they destroy your average rating, and capturing praise allows you to build exactly what your power users want.

## Strategic Guidance

### Hackathon Mode
Don't build a feedback system. If judges have feedback, they will tell you to your face.

### Personal Project
Add a simple "Send Feedback" button in your settings menu that opens the user's native email client (using \`mailto:\`) pre-filled with your support email address. Include the device model and OS version in the email body automatically. This takes 5 minutes to implement and provides immense value.

### Production SaaS
You must proactively intercept feedback. Implement a tool like Instabug. If the app crashes, or if the user physically shakes their phone in frustration, prompt them with a feedback form. Furthermore, you must categorize feedback rigorously (Bug vs Feature Request). Do not let feedback rot in a generic inbox; pipe it directly into a dedicated Slack channel or a tool like Linear so the engineering team sees the pain points in real-time.

### Production SaaS
Enterprise feedback loops are highly structured. You must implement NPS (Net Promoter Score) or CSAT (Customer Satisfaction) micro-surveys directly within the app workflow. However, these surveys must be heavily throttled (e.g., never show an NPS survey to a user who has experienced a crash in the last 7 days, and never survey the same user more than once every 90 days). Feedback must be tied directly to the user's CRM profile (Salesforce) so Account Executives are aware of client sentiment before renewal calls.

## Implementation Steps
\`\`\`prompt
Act as a Customer Success Manager. I am adding an in-app feedback form to my mobile app. Write 3 distinct, highly effective micro-survey questions designed to figure out why users are dropping off during the onboarding flow. Keep the questions under 10 words each to maximize response rates.
\`\`\`

## Validation Checklist
- [ ] A frictionless method exists for users to submit feedback directly within the app.
- [ ] Device metadata (OS version, app version, device model) is automatically attached to bug reports.
- [ ] Feedback is routed directly to a location where the development team actively monitors it.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilereviewsratings': `# Reviews & Ratings

**Estimated Time:** 1-2 hours

---

## Why this matters
App Store ratings are the ultimate social proof. An app with a 4.8-star rating will organically acquire significantly more users at a lower Cost Per Install (CPI) than an identical app with a 3.2-star rating. You must actively engineer your app to farm 5-star reviews while suppressing negative ones.

## Strategic Guidance

### Hackathon Mode
Completely irrelevant. Do not implement ratings prompts.

### Personal Project
You must implement the native \`SKStoreReviewController\` (iOS) and Google Play In-App Review API. Never use custom popups that force the user out of the app to the store; the native APIs allow the user to tap 5 stars without ever leaving the screen. The golden rule: Only ask for a review immediately after the user experiences a "Win" (e.g., they just completed a level, finished a workout, or successfully exported a file).

### Production SaaS
You must implement the "Rating Intercept" strategy. Ask the user a qualifying question first: "Are you enjoying [App Name]?" 
- If they tap "No", route them to your internal User Feedback form to capture the complaint privately. 
- If they tap "Yes", immediately trigger the native 5-star review prompt. 
This guarantees that only happy users are sent to the App Store, artificially inflating your rating to 4.8+.

### Production SaaS
Enterprise applications distributed privately via MDM (Mobile Device Management) do not use App Store ratings. However, if it is a public-facing enterprise app (like a banking app), ratings are a matter of public relations. You must integrate API listeners that alert the PR and Customer Support teams in real-time if a 1-star review mentioning "security" or "breach" is posted. Apple and Google provide APIs to respond to reviews programmatically; you must have an SLA (Service Level Agreement) to respond to all 1-star and 2-star reviews within 24 hours.

## Implementation Steps
\`\`\`prompt
Act as a Mobile Growth Hacker. I want to implement the 'Rating Intercept' strategy in my React Native app using Expo's \`StoreReview\` API. Provide the specific logic flow and UI copy to ensure I only ask for App Store reviews when the user is highly satisfied, while routing angry users to a private feedback form.
\`\`\`

## Validation Checklist
- [ ] The app uses native in-app review APIs (not external links to the App Store).
- [ ] Review prompts are only triggered after a specific "Win State" or positive action.
- [ ] A 'Rating Intercept' pattern is used to route negative sentiment to internal support instead of the public store.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilereferralprograms': `# Referral Programs

**Estimated Time:** 1-2 weeks

---

## Why this matters
Organic growth is the holy grail of mobile apps. If every user invites 1.1 new users, your app will grow exponentially without spending a single dollar on marketing (a Viral Coefficient > 1). However, users will not invite their friends simply because your app is "cool." You must engineer a referral mechanism that offers a mutually beneficial, high-value reward.

## Strategic Guidance

### Hackathon Mode
Skip this. Building a referral system requires deep linking, authentication state management, and database tracking. It is far too complex for a weekend project.

### Personal Project
Focus on simple, non-incentivized sharing. Implement the native Share API (\`Share.share()\` in React Native). Pre-populate the share message with a catchy hook and a direct link to your App Store page. For example: "I just beat my high score on [App Name]! Can you beat it? [Link]". This takes 10 minutes to build and leverages the user's existing social networks.

### Production SaaS
You must build a double-sided incentive loop. "Give $10, Get $10" is the industry standard for a reason. You must use Deep Linking tools like Branch.io to track the entire lifecycle: User A sends a link -> User B clicks the link -> User B is routed to the App Store -> User B installs the app -> User B opens the app -> Branch passes the referral ID to your backend -> Both users are credited. This must work flawlessly, even if the user didn't have the app installed when they clicked the link (Deferred Deep Linking).

### Production SaaS
Enterprise referral programs are often called "Affiliate Programs" or "Partner Networks." You are not offering in-app credits; you are offering cold hard cash. You must integrate with an affiliate tracking system like PartnerStack or Rewardful. You must handle tax implications (e.g., collecting W-9 forms if an affiliate earns more than $600/year). The referral logic must handle complex B2B attribution windows (e.g., the affiliate gets 20% of the referred client's revenue for the first 12 months).

## Implementation Steps
\`\`\`prompt
Act as a Mobile Architect. I want to build a 'Give $10, Get $10' referral loop in my React Native app using Branch.io for deferred deep linking and Supabase for the backend. Outline the exact database schema required to track 'Invites' and 'Rewards', and provide the React Native code snippet to extract the referring user's ID on initial app launch.
\`\`\`

## Validation Checklist
- [ ] A deep linking provider (like Branch.io) is integrated to handle Deferred Deep Links.
- [ ] A double-sided incentive is clearly communicated in the UI.
- [ ] The backend successfully attributes the installation to the referring user and distributes the reward.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileroadmap': `# Roadmap

**Estimated Time:** 2-4 hours

---

## Why this matters
A public roadmap turns your users into stakeholders. When users see that you are actively building the features they requested, their tolerance for bugs increases, and their churn rate decreases. It proves your app is a living, breathing product, not a stagnant piece of software abandoned by its creator.

## Strategic Guidance

### Hackathon Mode
Skip this. Your project only exists for the weekend.

### Personal Project
Create a simple Notion page or a public GitHub Kanban board. Link to it directly from the app's settings menu. Keep it simple: "Working On", "Up Next", and "Completed." When you finish a feature, leave it in the "Completed" column for a few months so new users can see your recent velocity.

### Production SaaS
You must use a dedicated roadmap tool like Canny or Productboard that allows users to upvote features. Do not build features just because you think they are cool; build the features that have 500 upvotes. This allows you to crowdsource your product management. When you finally release a feature, these tools will automatically email every single user who upvoted it, driving an immediate spike in re-engagement.

### Production SaaS
Enterprise roadmaps are highly political and strictly confidential. You never publish a public roadmap because your competitors will copy your strategy, and your sales team will make promises you cannot keep. Instead, use tools like Linear or Jira internally. You must categorize feature requests by Revenue Impact (e.g., "Feature X is blocking a $500k contract renewal"). The roadmap is presented directly to key stakeholders during Quarterly Business Reviews (QBRs), not posted on the internet.

## Implementation Steps
\`\`\`prompt
Act as a Senior Product Manager. I am setting up a public roadmap for my mobile app using Canny.io. Suggest 5 specific 'Feature Categories' I should create to keep the feedback organized. Then, draft a short, welcoming message I can pin to the top of the board explaining how users should submit and upvote ideas.
\`\`\`

## Validation Checklist
- [ ] A public roadmap is hosted and accessible via a link inside the app.
- [ ] Users have a mechanism to submit new ideas and upvote existing ones.
- [ ] The roadmap is actively categorized into 'Planned', 'In Progress', and 'Completed'.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilescalingstrategy': `# Scaling Strategy

**Estimated Time:** Ongoing

---

## Why this matters
Most apps fail because nobody uses them. The second most common reason apps fail is because *everybody* uses them, all at once. If a massive influencer posts a TikTok about your app and you get 50,000 downloads in an hour, your database connection pool will exhaust, your server will crash, and all 50,000 users will be greeted with a blank white screen. You must architect for virality.

## Strategic Guidance

### Hackathon Mode
Don't worry about scaling. The free tier of Supabase or Firebase can handle a hackathon demo easily. 

### Personal Project
Focus on database indexing and connection pooling. If your app queries a massive \`users\` table by email, ensure the \`email\` column has a unique index. If you are using a relational database (Postgres), ensure you are using a connection pooler (like Supavisor or PgBouncer). Serverless functions (like Vercel or AWS Lambda) can spin up thousands of instances instantly, and if each instance opens a direct connection to your database, your DB will crash in seconds.

### Production SaaS
You must implement heavy caching. Your mobile app should not hit your primary database for static or semi-static data. Put a CDN (Cloudflare) in front of your API. Implement Redis to cache the results of expensive queries. If a user loads the global leaderboard, that query should be calculated once every 5 minutes and served from Redis to the next 10,000 users. On the mobile client side, implement aggressive local caching (React Query / Apollo) so the app feels instantly fast even on poor cellular connections.

### Production SaaS
Enterprise scaling requires geographical distribution, read-replicas, and High Availability (HA). If your app serves users in Europe and Asia, you cannot route all API traffic to a single database in Virginia. You must deploy edge functions and read-replicas closer to the user to reduce latency. You must conduct massive, simulated Load Testing using tools like k6 or JMeter to prove to enterprise clients that your infrastructure can handle 10,000 requests per second with 99.99% uptime.

## Implementation Steps
\`\`\`prompt
Act as a Senior Cloud Architect. My React Native app uses Supabase (Postgres) and serverless Edge Functions. I expect a spike of 10,000 concurrent users. Provide a strict checklist on how to configure PgBouncer/Supavisor for connection pooling, and how to implement Redis caching to protect my primary database from read-heavy API requests.
\`\`\`

## Validation Checklist
- [ ] Database connection pooling is configured to prevent connection exhaustion.
- [ ] Expensive, read-heavy queries are cached via Redis or a CDN.
- [ ] The mobile client utilizes aggressive local caching (e.g., React Query) to reduce unnecessary API calls.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilefeedback': `# Feedback

**Estimated Time:** 1-2 hours

---

## Why this matters
When you launch a Personal Project, your friends and early adopters will inevitably find bugs or desire new features. If you don't provide a frictionless way for them to tell you, they simply won't. Capturing this feedback is the only way to know what to build next.

## Strategic Guidance

### Personal Project
Keep it incredibly simple. Do not integrate complex enterprise tools. Add a "Send Feedback" button in your app's settings menu.
- **Option A:** Use the \`mailto:\` protocol to open their email app, pre-filling the subject line and automatically appending their device OS and app version in the body.
- **Option B:** Link directly to a free Google Form or Typeform.

The goal is zero friction. When you receive an email saying "the app crashed when I did X," reply personally within 24 hours. Early users who receive a personal email from the developer turn into lifelong advocates for the app.

## Implementation Steps
\`\`\`prompt
Act as a React Native Developer. Provide the exact code snippet to implement a 'Send Feedback' button that uses the native \`Linking.openURL('mailto:...')\` API. The code must dynamically grab the user's OS (iOS/Android) and the current App Version, and inject them into the body of the email so I have debugging context.
\`\`\`

## Validation Checklist
- [ ] A 'Feedback' button is clearly visible in the settings or profile menu.
- [ ] The feedback mechanism requires less than 3 taps to open.
- [ ] Device context (OS, Version) is automatically included to aid debugging.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilestatemanagementimplementation': `# State Management

**Estimated Time:** 3-5 hours

---

## Why this matters
Mobile apps are fundamentally state machines. At any given moment, the app needs to know: Is the user logged in? Is the data loading? Is the device offline? If you pass state down manually through 15 layers of UI components (prop-drilling), your app will become an unmaintainable nightmare. A global state management system is mandatory for any serious application.

## Strategic Guidance

### Hackathon Mode
Don't use Redux. It takes 3 hours just to write the boilerplate. Use Zustand (for React Native) or standard Context APIs. You just need a place to store the current user's ID and maybe a global array of items.

### Personal Project
Zustand is currently the gold standard for React Native. It has zero boilerplate, does not require wrapping your entire app in a Provider, and handles re-renders intelligently. If you are building with Flutter, use Provider or Riverpod.

### Production SaaS
State management in production must be split into two distinct categories: **Server State** and **Client State**.
1. **Server State**: Use React Query (TanStack Query) or Apollo GraphQL. This handles fetching, caching, synchronizing, and updating server data. Do not reinvent the wheel by storing API responses in Redux.
2. **Client State**: Use Zustand or Redux Toolkit for pure UI state (e.g., "Is the dark mode toggle checked?").

### Production SaaS
Enterprise applications often have massive localized datasets (e.g., a field technician needing access to 10,000 offline equipment manuals). You must implement an offline-first state synchronization engine like WatermelonDB or Realm. State management must handle complex conflict resolution algorithms when the device comes back online and tries to sync changes with the master database.

## Implementation Steps
\`\`\`prompt
Act as a Senior React Native Engineer. Provide the code to set up a global Zustand store for a [Insert App Type]. The store needs to hold the authenticated user's profile and a boolean flag for 'isOfflineMode'. Also, provide an example of how to read and write to this store from a deep child component without causing unnecessary re-renders.
\`\`\`

## Validation Checklist
- [ ] A dedicated global state management library (Zustand, Riverpod, etc.) is configured.
- [ ] Server state (API responses) is managed separately from Client state (UI toggles).
- [ ] Prop-drilling has been eliminated for globally required variables like user sessions.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilepushnotificationsimplementation': `# Push Notifications

**Estimated Time:** 4-6 hours

---

## Why this matters
Push notifications require a complex dance between Apple's APNs (Apple Push Notification service), Google's FCM (Firebase Cloud Messaging), and your backend server. A single misconfigured certificate or a missing permission check will result in silent failures.

## Strategic Guidance

### Hackathon Mode
Use Expo Push Notifications if you are building with React Native. It completely abstracts away the difference between APNs and FCM, allowing you to trigger notifications with a simple REST API call. Do not attempt to configure raw APNs certificates during a 48-hour event.

### Personal Project
Firebase Cloud Messaging (FCM) is the industry standard and completely free. You can use it for both Android and iOS. Focus on getting a simple device token, storing it in your database (e.g., Supabase) tied to the user's \`user_id\`, and triggering a test notification from your backend.

### Production SaaS
You must implement a dedicated CRM tool like OneSignal or Braze. These tools handle complex logic like timezone routing, A/B testing notification copy, and badge-count management. Furthermore, you must handle token invalidation. When a user uninstalls the app or rotates their device, their FCM token becomes invalid. Your backend must listen for these error responses and aggressively prune dead tokens from the database to avoid sending thousands of ghost requests.

### Production SaaS
Enterprise applications often require HIPAA or SOC2 compliance. You cannot send sensitive information (e.g., "Your HIV test results are ready") in the payload of a push notification, because push notifications are delivered in plain text over Apple/Google servers. Instead, send a "Data-Only" silent notification that wakes up the app in the background, forces the app to establish a secure SSL connection to your proprietary server to download the sensitive data, and then triggers a local notification securely.

## Implementation Steps
\`\`\`prompt
Act as a Mobile Architecture Expert. I need to implement Push Notifications using Expo and Firebase Cloud Messaging (FCM). Provide a step-by-step checklist of the exact certificates and keys I need to generate in the Apple Developer Portal and Google Cloud Console. Then, provide the backend Node.js code to send a push notification to a specific user using their stored FCM device token.
\`\`\`

## Validation Checklist
- [ ] Push notification permissions are requested gracefully at the appropriate time.
- [ ] Device tokens are securely stored in the database and tied to the correct user.
- [ ] The backend is configured to prune invalid or expired device tokens automatically.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilefrontendui': `# Frontend (UI)

**Estimated Time:** 1-2 weeks

---

## Why this matters
The UI is the product. A fast backend with a clunky, janky interface will be perceived as a slow, broken app. Mobile UI development is notoriously difficult because you must account for thousands of different screen sizes, safe area insets (notches/dynamic islands), and platform-specific interaction paradigms (iOS swipe-to-go-back vs Android hardware back button).

## Strategic Guidance

### Hackathon Mode
Use a pre-built component library. NativeBase or Tamagui for React Native, or Cupertino/Material for Flutter. Do not waste 6 hours trying to perfectly center a custom button shadow. 

### Personal Project
Focus intensely on responsive design and safe areas. Your app might look perfect on an iPhone 15 Pro simulator, but it will overlap with the camera notch on an iPhone 13 Mini, and stretch horribly on an iPad. Use \`SafeAreaView\` heavily, and rely on Flexbox rather than hardcoded pixel heights.

### Production SaaS
You must implement a strict Design System. Define your typography, color palettes, and spacing tokens in a central file. Never hardcode a color like \`#FF0000\` in a component; use \`theme.colors.danger\`. Furthermore, you must respect the system-level accessibility settings. If a user has "Larger Text" enabled in their iOS settings, your UI must scale gracefully without breaking the layout or truncating critical buttons.

### Production SaaS
Enterprise UIs must be highly accessible (WCAG compliance). Every interactive element must have proper accessibility labels for VoiceOver and TalkBack screen readers. The UI must support complex data-density toggles (e.g., allowing field workers to switch between a visual "Card" layout and an information-dense "Table" layout depending on their environment).

## Implementation Steps
\`\`\`prompt
Act as a Principal Frontend Engineer. I am building the UI for a [Insert App Type] using React Native. Provide a boilerplate \`theme.ts\` file that defines a robust color palette (supporting Light and Dark modes), spacing tokens, and typography sizes. Then, provide an example of a custom \`Button\` component that uses these theme tokens.
\`\`\`

## Validation Checklist
- [ ] The UI renders correctly across multiple screen sizes (small phones, large phones, tablets).
- [ ] Safe Area Insets (notches, home indicators) are respected on all screens.
- [ ] A centralized Design System (tokens for colors, spacing, typography) is actively used.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilenavigation': `# Navigation

**Estimated Time:** 2-3 hours

---

## Why this matters
Web navigation is linear (URLs). Mobile navigation is a stack of cards. If you configure your navigation incorrectly, users will press the "Back" button and accidentally exit the app, or they will navigate in circles until the app runs out of memory and crashes. 

## Strategic Guidance

### Hackathon Mode
Use the simplest possible router. In React Native, use Expo Router (file-based routing). It requires zero boilerplate. Just create a file named \`profile.tsx\` and it automatically becomes a screen.

### Personal Project
React Navigation is the industry standard. You must understand the difference between a \`Stack Navigator\` (pushing screens on top of each other) and a \`Tab Navigator\` (switching between parallel histories). A common architecture is a root Stack Navigator containing a Tab Navigator for the main app, and a separate Stack Navigator for the authentication flow.

### Production SaaS
You must handle Deep Linking. If a user clicks a link in their email (e.g., \`myapp://reset-password?token=123\`), the app must intercept that URL, parse the token, and automatically push the correct screen onto the navigation stack, regardless of whether the app was running in the background or completely closed.

### Production SaaS
Enterprise navigation requires strict Role-Based Access Control (RBAC) at the router level. If an employee's permissions are revoked mid-session, the router must immediately eject them from the administrative screens and route them back to a safe zone. You must also implement complex "State Restoration" so if the OS kills the app while the worker is in the background, they are returned to the exact nested screen they were on when they reopen it.

## Implementation Steps
\`\`\`prompt
Act as a React Native Navigation Expert. Provide the code for a robust navigation architecture using React Navigation v6. The structure must include an 'AuthStack' (Login, Signup) and a 'MainTabNavigator' (Home, Settings). Include the logic to automatically switch between these two stacks based on a global \`isAuthenticated\` boolean.
\`\`\`

## Validation Checklist
- [ ] Navigation flows correctly utilize Stacks (for drill-down) and Tabs (for parallel sections).
- [ ] Deep linking is configured to allow direct routing via external URLs.
- [ ] The Android hardware back button behaves as expected (going back a screen, not exiting the app unexpectedly).
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileapis': `# APIs & Networking

**Estimated Time:** 1-2 days

---

## Why this matters
Mobile devices have terrible internet connections. They transition from 5G to 3G to complete dead zones when the user walks into an elevator. If your app assumes a perfect broadband connection and fails silently when a network request drops, your users will assume your app is broken.

## Strategic Guidance

### Hackathon Mode
Use the native \`fetch\` API or standard Axios. Don't worry about retry logic or offline states. Just get the data on the screen for the demo.

### Personal Project
Implement a robust data-fetching library like React Query or SWR. These libraries automatically handle loading states, error states, and automatic retries. If the user opens the app, it will instantly show the cached data from their last session while quietly fetching the fresh data in the background.

### Production SaaS
You must implement aggressive timeouts and global error handling. If your backend is struggling and takes 30 seconds to respond, your mobile app should abort the request after 10 seconds and show a friendly "Connection Timeout" message. Furthermore, you must handle token refreshing (JWTs) seamlessly. If an API request fails with a 401 Unauthorized, your networking layer (Axios Interceptors) should automatically pause all requests, fetch a new access token using a refresh token, and then replay the queued requests without the user ever noticing.

### Production SaaS
Enterprise APIs require strict security protocols like Certificate Pinning. This ensures the app will ONLY communicate with your specific server, protecting against Man-in-the-Middle (MITM) attacks on compromised corporate WiFi networks. Furthermore, enterprise apps must support WebSocket connections for real-time telemetry, gracefully handling abrupt disconnects and applying exponential backoff strategies for reconnections.

## Implementation Steps
\`\`\`prompt
Act as a Senior Network Engineer. I am using Axios in React Native. Provide the code for an Axios Interceptor that handles JWT token expiration. If an API request returns a 401, the interceptor must pause the request, hit the \`/refresh-token\` endpoint, update the global auth state, and seamlessly retry the original request.
\`\`\`

## Validation Checklist
- [ ] A dedicated data-fetching library (e.g., React Query) is used to handle caching and loading states.
- [ ] JWT refresh logic is handled seamlessly via network interceptors.
- [ ] API requests fail gracefully with user-friendly error messages when the device is offline.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilemediauploads': `# Media Uploads

**Estimated Time:** 1-2 days

---

## Why this matters
Handling media (images, videos, audio) on mobile is incredibly error-prone. Modern iPhones shoot 4K HDR video that can easily exceed 2GB per minute. If you attempt to upload a raw 2GB video file directly to your Node.js backend over a flaky cellular connection, the app will crash from OOM (Out of Memory) errors, the user's data cap will be destroyed, and the server will timeout.

## Strategic Guidance

### Hackathon Mode
Don't build media uploads. Rely on text inputs or hardcode dummy images for the demo. If you absolutely must have an avatar upload, use Firebase Storage, compress the image heavily, and do it strictly over WiFi.

### Personal Project
You must implement local, on-device compression before the upload ever starts. Use libraries like \`react-native-image-crop-picker\` to resize user avatars down to 500x500 pixels. Use Supabase Storage or AWS S3 for the actual hosting.

### Production SaaS
Never upload media directly to your own backend API. Always use "Pre-signed URLs" (or Direct Uploads). 
1. The mobile app requests a secure, temporary URL from your backend.
2. The backend generates a signed AWS S3 URL and returns it to the app.
3. The app uploads the compressed file *directly* to S3, bypassing your backend entirely. 
This saves massive amounts of server bandwidth. Furthermore, you must implement background uploading. If the user minimizes the app while a 50MB video is uploading, the upload should continue in the background OS process, not instantly terminate.

### Production SaaS
Enterprise media handling often requires real-time streaming and intense security. If a medical worker is uploading a photo of a patient's chart, that photo must never be saved to the device's public camera roll. It must be captured directly into the app's encrypted sandbox, compressed, and uploaded via secure TLS to a HIPAA-compliant S3 bucket, leaving zero trace on the physical device.

## Implementation Steps
\`\`\`prompt
Act as a Mobile Storage Expert. I am building a React Native app that allows users to upload profile pictures to an AWS S3 bucket. Provide the code to compress an image locally to under 1MB using \`react-native-image-crop-picker\`, request a pre-signed URL from a Node.js backend, and execute a direct \`PUT\` request to S3 using Axios.
\`\`\`

## Validation Checklist
- [ ] Images/Videos are compressed locally on the device before transmission.
- [ ] Media is uploaded directly to a storage bucket (S3, Cloud Storage) via signed URLs, not passed through the primary backend API.
- [ ] Sensitive media is not accidentally saved to the user's public camera roll.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilemapslocation': `# Maps & Location

**Estimated Time:** 3-5 hours

---

## Why this matters
Location services drain the battery faster than almost any other hardware component. Furthermore, they are the number one reason users deny permissions. If you build a maps feature poorly, the OS will flag your app for excessive background battery usage, and users will uninstall it out of frustration.

## Strategic Guidance

### Hackathon Mode
Use the standard Google Maps SDK or Apple Maps (via \`react-native-maps\`). Hardcode the coordinates for your demo location. Do not attempt to calculate complex routing or distance matrixes during a weekend.

### Personal Project
Focus on "One-Time" location requests. Do not ask for "Always On" background location unless absolutely necessary. When the user opens the map, fetch their coordinates once, pan the camera, and stop tracking. Use Mapbox if you want highly customizable, beautiful map styles; otherwise, stick to the default OS maps to save on bundle size.

### Production SaaS
You must handle edge cases gracefully. What happens if the user denies location permissions? The app must not crash; it should fall back to asking them to manually type in their zip code. What happens if the GPS signal is weak (e.g., inside a parking garage)? The UI must indicate that the location is an approximation (show a large blue radius circle instead of a precise dot). 

### Production SaaS
Enterprise applications (like fleet tracking or delivery logistics) require "Always On" background tracking. You must write native Swift/Kotlin code or use robust libraries like \`react-native-background-geolocation\`. You must implement intelligent throttling: track the user every 10 meters when they are driving on a highway, but only track them once every 5 minutes if their accelerometer detects they are sitting completely still in a warehouse, thereby saving battery.

## Implementation Steps
\`\`\`prompt
Act as a GIS (Geographic Information System) Developer. I am implementing a Map view in React Native using \`react-native-maps\`. Provide the code to prompt the user for 'When In Use' location permissions, fetch their current coordinates precisely, and render a custom Map Marker at that location with a fallback UI if they deny the permission.
\`\`\`

## Validation Checklist
- [ ] The app requests 'When In Use' permission rather than 'Always On' (unless strictly required).
- [ ] The app degrades gracefully if the user explicitly denies location tracking.
- [ ] Complex maps features are optimized to prevent massive battery drain.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobiledevicepermissions': `# Device Permissions

**Estimated Time:** 1-2 hours

---

## Why this matters
Apple and Google are cracking down on privacy. If your app crashes because you tried to access the camera without asking for permission first, you will fail the App Store review. Worse, if you ask for 5 different permissions immediately when the app launches, 80% of users will deny them all and instantly delete the app.

## Strategic Guidance

### Hackathon Mode
Don't worry about elegant permission flows. Just trigger the OS prompts whenever needed so the demo works.

### Personal Project
Implement "Just-in-Time" permissions. Never ask for Camera access on the home screen. Only ask for it the exact millisecond the user taps the "Take Photo" button. This provides obvious context to the user, massively increasing the approval rate. Use a library like \`react-native-permissions\` to normalize the API across iOS and Android.

### Production SaaS
You must implement a "Pre-Permission" screen (also known as a soft prompt). Because you can only trigger the native OS permission dialog *once*, you should show a custom UI modal first: "We need access to your camera to scan this barcode. [Allow] [Not Now]". 
- If they tap "Not Now", you dismiss your modal and save the native prompt for later.
- If they tap "Allow", *then* you trigger the native OS prompt. 
If they previously denied the native prompt, you must detect the \`blocked\` state and provide a custom UI button that deep-links them directly to the iOS/Android Settings app to manually toggle it back on.

### Production SaaS
Enterprise apps distributed via MDM (Mobile Device Management) can often bypass permission dialogs because the corporation owns the device and pre-approves the permissions via configuration profiles. However, your code must still gracefully handle the theoretical possibility of a permission denial to prevent fatal crashes during edge cases or audits.

## Implementation Steps
\`\`\`prompt
Act as a Mobile Privacy Architect. Provide the React Native code to implement a 'Soft Prompt' strategy for Camera permissions. The code must check the current permission status, show a custom UI modal explaining *why* the camera is needed, trigger the native OS prompt if approved, and handle the \`blocked\` state by linking the user to their device settings.
\`\`\`

## Validation Checklist
- [ ] Permissions are asked for 'Just-in-Time', tied to specific user actions.
- [ ] A 'Soft Prompt' strategy is used to prevent burning the one-time native OS dialog.
- [ ] The app successfully deep-links users to the OS Settings app if permissions are permanently blocked.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileofflinefeatures': `# Offline Features

**Estimated Time:** 2-3 weeks

---

## Why this matters
Mobile apps are not web browsers. If a user opens a mobile app on the subway and sees a blank white screen with a spinning loader that never finishes, the app feels broken. A premium mobile app should render instantly from local cache, allowing the user to interact with the UI even with zero internet connection.

## Strategic Guidance

### Hackathon Mode
Ignore offline support entirely. You are building this for a demo on stable WiFi. 

### Personal Project
Implement optimistic UI updates and simple caching. Use React Query or Apollo to cache the last known state of your API requests to \`AsyncStorage\`. When the app opens, hydrate the cache immediately so the user sees data. If they "Like" a post while offline, immediately toggle the heart to red in the UI, queue the request, and send it when the connection is restored.

### Production SaaS
You must implement a robust background sync engine. Use WatermelonDB or Realm as your primary data source. The React UI should *only* ever read from the local SQLite database. A background worker process handles pulling changes from your cloud database and pushing local mutations to the cloud. This architectural pattern (Offline-First) guarantees the app is always 60FPS and never blocked by network latency.

### Production SaaS
Enterprise offline features (e.g., an app for oil rig inspectors) require complex Conflict Resolution. If Inspector A edits a safety report offline, and Inspector B edits the same report online, what happens when Inspector A reconnects? You must implement CRDTs (Conflict-free Replicated Data Types) or strict server-side timestamps to merge changes deterministically without destroying data or prompting the user with confusing "Merge Conflict" modals.

## Implementation Steps
\`\`\`prompt
Act as an Offline-First Architect. I am building a React Native app that needs to work entirely without internet. Explain the architectural difference between 'Caching API responses' vs a true 'Offline-First Database' like WatermelonDB. Then, provide the database schema required to track \`sync_status\` (e.g., pending, synced, error) for local mutations before they are pushed to the backend.
\`\`\`

## Validation Checklist
- [ ] The app renders meaningful data (from cache) immediately upon opening without an internet connection.
- [ ] Actions taken while offline (e.g., liking a post, creating a draft) are queued and executed when the connection returns.
- [ ] The UI clearly communicates the current sync status (e.g., "Offline - Changes saved locally") to the user.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileanalyticsevents': `# Analytics Events

**Estimated Time:** 1-2 days

---

## Why this matters
If you simply install an analytics SDK and let it "auto-track" everything, you will end up with a garbage dump of useless data (e.g., \`button_click_492\`). Good analytics require a deliberate, structured Tracking Plan. You need to track the exact moments of value creation and the exact moments of user friction.

## Strategic Guidance

### Hackathon Mode
Skip analytics entirely. They provide zero value during a weekend sprint.

### Personal Project
Focus on the core funnel. Track exactly three things:
1. **Activation**: Did they finish onboarding? (e.g., \`Account_Created\`)
2. **Core Action**: Did they use the main feature? (e.g., \`Workout_Logged\`)
3. **Monetization**: Did they hit the paywall? (e.g., \`Paywall_Viewed\`)
Do not track arbitrary tab switches or scroll depths. 

### Production SaaS
You must implement a strict Noun-Verb nomenclature (e.g., \`Profile_Updated\`, \`Subscription_Purchased\`). Every event must have attached metadata (properties). Tracking \`Subscription_Purchased\` is useless if you don't know *which* tier they bought. The properties should include \`tier: "premium"\`, \`price: 9.99\`, and \`currency: "USD"\`. Furthermore, you must wrap your analytics calls in a centralized service class. Never call \`mixpanel.track()\` directly from 50 different UI components; call \`AnalyticsService.trackPurchase()\`.

### Production SaaS
Enterprise analytics require strict privacy controls. You must implement a kill-switch to disable all tracking if the user opts out (GDPR/CCPA compliance). You must also ensure that zero PII (Personally Identifiable Information) like emails or social security numbers are accidentally sent in the event properties. Data must often be routed through a Customer Data Platform (CDP) like Segment, which can filter PII before forwarding the data to downstream marketing tools.

## Implementation Steps
\`\`\`prompt
Act as a Lead Data Analyst. I am launching a [Insert App Type]. Create a tabular Tracking Plan mapping out the 7 most critical events I should track. For each event, define the strict Event Name (Noun_Verb format), the Trigger Condition (exactly when it fires in the code), and the JSON payload of Metadata Properties I need to attach to it.
\`\`\`

## Validation Checklist
- [ ] A central Tracking Plan document exists and dictates all event nomenclature.
- [ ] Analytics calls are abstracted into a central service, not scattered throughout UI components.
- [ ] Strict auditing ensures no PII (Personally Identifiable Information) is sent to third-party analytics providers.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileerrorhandling': `# Error Handling & Crash Reporting

**Estimated Time:** 3-5 hours

---

## Why this matters
Mobile apps run on thousands of different devices with varying RAM constraints, custom OS flavors (like Samsung's One UI), and unpredictable network conditions. Crashes are inevitable. If you don't use a crash reporting tool, you will be completely blind when your app starts crashing for 10% of your users immediately after launch.

## Strategic Guidance

### Hackathon Mode
Just wrap your API calls in basic \`try/catch\` blocks and \`console.log\` the errors. Don't waste time integrating Sentry for a 48-hour event.

### Personal Project
Integrate a free crash reporting tool like Firebase Crashlytics or Sentry. You don't need complex sourcemaps immediately, but you must know *if* the app is crashing. More importantly, implement a global Error Boundary in React Native to catch fatal UI errors and display a friendly "Oops, something went wrong" screen instead of freezing the app indefinitely.

### Production SaaS
You must upload Sourcemaps to Sentry/Crashlytics as part of your CI/CD pipeline. Without sourcemaps, a crash report will just tell you the error happened in \`main.min.js:1:4092\`, which is entirely useless for debugging. You must also track Non-Fatal errors. If an API request fails, don't just show a toast notification; actively log that handled error to Sentry so you can detect if a third-party API is experiencing an outage.

### Production SaaS
Enterprise error handling requires SLA (Service Level Agreement) alerting. If the crash-free session rate drops below 99.9%, Sentry must automatically page the on-call engineer via PagerDuty. Furthermore, you must implement breadcrumbs (a log of the last 10 things the user clicked before the crash) and attach the user's encrypted UUID to the crash report so Customer Support can proactively email the affected enterprise client apologizing for the outage.

## Implementation Steps
\`\`\`prompt
Act as a DevOps Engineer. I am using Sentry in my React Native application. Provide the code to set up a global React Native Error Boundary that displays a fallback UI when the render tree crashes. Then, explain the exact bash commands I need to add to my CI/CD pipeline (GitHub Actions) to automatically upload the JavaScript sourcemaps to Sentry during the build process.
\`\`\`

## Validation Checklist
- [ ] Sentry, Crashlytics, or an equivalent crash reporting SDK is installed and active.
- [ ] A Global Error Boundary is implemented to prevent the app from white-screening.
- [ ] Sourcemaps are properly uploaded so crash reports point to actual lines of code, not minified bundles.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobiledemodata': `# Demo Data

**Estimated Time:** 2-3 hours

---

## Why this matters
An app with an empty feed, zero friends, and no history looks broken. If you hand your phone to a Hackathon judge or an Enterprise client and they see a blank screen that says "No Data Found", you have lost their attention. The app must look fully alive and actively used the exact second they open it.

## Strategic Guidance

### Hackathon Mode
Hardcode everything. Do not fetch demo data from an API. Create a \`constants/mockData.ts\` file filled with 20 incredibly realistic JSON objects (e.g., real names, high-quality Unsplash profile pictures, realistic text). Your UI components should map directly over this hardcoded array.

### Production SaaS
Enterprise demos require "Sandboxes." You cannot show Client A the actual production data of Client B. You must write a robust backend seeding script (e.g., \`npm run seed:demo\`) that dynamically populates a dedicated Sandbox database with thousands of rows of industry-specific, anonymized data. If you are pitching to a hospital, the demo data must look exactly like real patient records, not "Test User 1."

## Implementation Steps
\`\`\`prompt
Act as a QA Data Engineer. I am building a [Insert App Type]. Generate a robust TypeScript file containing a mock JSON array of 15 highly realistic objects to populate my main feed. Do not use 'lorem ipsum'; write actual contextual sentences. Provide realistic image URLs from Unsplash.
\`\`\`

## Validation Checklist
- [ ] The app never displays an "Empty State" during a demo.
- [ ] Demo data is contextually accurate (not generic lorem ipsum).
- [ ] (Custom Mode) A repeatable script exists to nuke and re-seed the sandbox database instantly.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileplaystoremockups': `# Play Store Mockups

**Estimated Time:** 1-2 hours

---

## Why this matters
Users do not read descriptions; they look at the first three screenshots. If your App Store screenshots are just raw, unedited captures of your app from a simulator, you look like an amateur. High-converting screenshots are actually marketing posters: they feature the UI inside a sleek 3D device frame, with a massive, bold headline above it explaining the value proposition.

## Strategic Guidance

### Hackathon Mode
If your hackathon requires a Devpost submission, take 3 screenshots of your app, throw them into Canva, and add a bold title above them. It takes 10 minutes and makes your submission look 10x more professional than the teams who just uploaded raw simulator captures.

### Production SaaS
Enterprise apps distributed via Private App Stores or Apple Business Manager still require screenshots, but the focus shifts entirely from "Marketing" to "Utility and Security." Do not use flashy 3D renders. Show clear, annotated screenshots of the dashboard, the security login flow, and the reporting tools.

## Implementation Steps
\`\`\`prompt
Act as an App Store Optimization (ASO) Expert. I am building a [Insert App Type]. Write the marketing copy for my 5 App Store screenshots. For each screenshot, provide the 'H1 Headline' (under 5 words) that should sit above the device frame, and describe exactly which screen of the app should be featured inside the frame.
\`\`\`

## Validation Checklist
- [ ] Screenshots are wrapped in aesthetic device frames (not raw simulator captures).
- [ ] Each screenshot features a bold, readable headline explaining the value.
- [ ] The first screenshot clearly demonstrates the core "Aha! Moment."
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilemultilanguage': `# Multi-language (i18n)

**Estimated Time:** 3-5 days

---

## Why this matters
The majority of the world does not speak English. If your app is locked to English, you are cutting off massive markets in Latin America, Europe, and Asia. Internationalization (i18n) is not just translating words; it's handling Right-to-Left (RTL) layouts for Arabic, formatting dates correctly (DD/MM/YYYY vs MM/DD/YYYY), and handling currency conversions.

## Strategic Guidance

### Production SaaS
Enterprise applications often require strict localization. Do not attempt to use Google Translate for enterprise software; the terminology is too specific and a bad translation can cause legal liability (e.g., misinterpreting a medical compliance toggle). Use a professional localization platform like Lokalise or Phrase. Furthermore, you must abstract *every single string* in your app into a JSON file. Never hardcode \`<Text>Submit</Text>\`. Always use \`<Text>{t('auth.submit')}</Text>\`.

## Implementation Steps
\`\`\`prompt
Act as a Senior React Native Architect. Provide the code to set up \`react-i18next\`. Demonstrate how to detect the user's native device language automatically, load the correct JSON translation file, and provide a fallback to English if their language is not supported. Also, explain how to handle Right-to-Left (RTL) layout switching using \`I18nManager\`.
\`\`\`

## Validation Checklist
- [ ] Zero hardcoded text exists in the UI components.
- [ ] The app automatically detects and defaults to the user's OS language.
- [ ] Right-to-Left (RTL) text and layout mirroring are explicitly handled.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilesubscriptionbilling': `# Subscription Billing

**Estimated Time:** 1-2 weeks

---

## Why this matters
Apple and Google take a 15-30% cut of all digital subscriptions, and their APIs for implementing In-App Purchases (IAP) are notoriously complex. If you configure it incorrectly, users will be charged but won't receive premium access, or they will cancel their subscription and still retain premium access forever.

## Strategic Guidance

### Production SaaS
Enterprise apps almost never use Apple/Google In-App Purchases. B2B contracts are negotiated externally (e.g., a $50k/year Master Services Agreement) and paid via ACH or wire transfer. The mobile app itself is simply a free "Client" that employees log into. If you try to charge a $50k enterprise contract through the iOS App Store, Apple will take $15,000. You must implement a "Bypass" architecture: The app is free to download, but requires a pre-existing enterprise account to log in.

## Implementation Steps
\`\`\`prompt
Act as a Mobile Monetization Expert. Explain the architecture of bypassing Apple's 30% cut for a B2B Enterprise SaaS app. Specifically, provide the exact wording I must use (and avoid using) on the mobile login screen to ensure Apple App Store reviewers do not reject the app for violating the "Digital Goods" IAP policy.
\`\`\`

## Validation Checklist
- [ ] The app does not attempt to sell B2B enterprise seats via native iOS/Android In-App Purchases.
- [ ] The App Store review team is provided with a valid test account in the review notes to bypass the enterprise login screen.
- [ ] The UI clearly explains how a user can obtain an enterprise account without providing a direct link to a web checkout page (which violates Apple's guidelines).
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilewearables': `# Wearables

**Estimated Time:** 2-4 weeks

---

## Why this matters
Apple Watch and WearOS devices represent a completely different computing paradigm. Users do not "browse" a watch; they glance at it for 2 seconds. Porting your entire mobile app to a watch is a guaranteed failure. You must distill your app down to a single, hyper-specific action (e.g., starting a timer, approving a 2FA prompt, glancing at a glucose level).

## Strategic Guidance

### Production SaaS
Enterprise wearable apps are highly specialized. A warehouse worker might use a ruggedized Android smartwatch paired to a Bluetooth barcode scanner to keep their hands free. You must build standalone native apps using Swift (WatchKit) or Kotlin (WearOS). React Native is generally not suitable for building robust wearable applications. You must handle extreme battery constraints and aggressive background-execution limits imposed by the OS.

## Implementation Steps
\`\`\`prompt
Act as a Wearables Product Manager. I am building a companion Apple Watch app for an enterprise inventory management system. Define the single "Micro-Interaction" that should exist on the watch. Then, explain how to establish a secure \`WCSession\` (Watch Connectivity) to sync the JWT auth token from the main iOS app to the Apple Watch so the user doesn't have to log in on a 2-inch screen.
\`\`\`

## Validation Checklist
- [ ] The wearable app focuses on a single, 2-second micro-interaction.
- [ ] Authentication is securely synced from the host phone, not typed manually on the watch.
- [ ] The app is built using native frameworks (Swift/Kotlin) for maximum performance and battery efficiency.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilewidgets': `# Widgets

**Estimated Time:** 1-2 weeks

---

## Why this matters
iOS Home Screen Widgets and Android App Widgets keep your app alive in the user's peripheral vision. A well-designed widget drastically increases Daily Active Users (DAU) because the user doesn't have to consciously remember to open your app; the app pushes value directly to their home screen.

## Strategic Guidance

### Production SaaS
Enterprise widgets must prioritize data privacy. If an executive puts a "Sales Dashboard" widget on their lock screen, that highly confidential data is visible to anyone who glances at their phone while it's sitting on a table. You must implement native iOS/Android privacy flags to blur or hide the widget data when the device is locked (using \`privacySensitive()\` modifiers in SwiftUI).

## Implementation Steps
\`\`\`prompt
Act as an iOS WidgetKit Expert. I need to build a Home Screen widget for my React Native app. Explain the architectural divide between React Native and WidgetKit (SwiftUI). Provide the code to write a shared JSON payload from React Native into the iOS \`App Group\` UserDefaults, and the Swift code required for the Widget to read that data and render it.
\`\`\`

## Validation Checklist
- [ ] Widgets are built natively (SwiftUI/XML) as React Native cannot render widgets directly.
- [ ] Data is securely shared between the main app and the widget via App Groups or SharedPreferences.
- [ ] Confidential enterprise data is hidden when the device is locked.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilebackgroundservices': `# Background Services

**Estimated Time:** 2-4 weeks

---

## Why this matters
Mobile operating systems aggressively kill apps running in the background to preserve battery life. If your app relies on a standard \`setInterval\` to fetch data while minimized, the OS will silently terminate it within 3 minutes. Implementing true background execution requires navigating some of the strictest OS-level APIs on both iOS and Android.

## Strategic Guidance

### Production SaaS
Enterprise applications often require persistent background execution (e.g., a delivery driver app that must upload GPS coordinates every 60 seconds even if the phone is locked in their pocket). You must use highly specialized background APIs.
- **iOS**: You must register for \`UIBackgroundModes\` (e.g., location, audio, or fetch). If you abuse this and the OS detects your app burning battery, Apple will outright ban your app.
- **Android**: You must implement a "Foreground Service." This requires displaying a persistent, un-dismissible notification in the user's status bar explicitly stating that the app is running in the background.

## Implementation Steps
\`\`\`prompt
Act as a Native Mobile Architect. I am building a React Native app for delivery drivers. I need to track their location in the background indefinitely. Explain how to configure an Android Foreground Service and iOS Background Location updates. Provide the specific \`AndroidManifest.xml\` permissions and the \`Info.plist\` keys required, along with the UI text I should use to justify this to the App Review teams.
\`\`\`

## Validation Checklist
- [ ] iOS Background Modes are explicitly declared and justified in the App Store review notes.
- [ ] Android implementations utilize Foreground Services with a mandatory persistent notification.
- [ ] Background tasks are aggressively throttled to prevent massive battery drain.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilebluetooth': `# Bluetooth (BLE)

**Estimated Time:** 3-5 weeks

---

## Why this matters
Bluetooth Low Energy (BLE) is notoriously unstable. Devices disconnect randomly, interference from microwaves or other WiFi networks corrupts packets, and the APIs to manage connections are highly complex state machines. If you do not handle edge cases perfectly, your app will freeze while trying to pair with external hardware.

## Strategic Guidance

### Production SaaS
Enterprise IoT (Internet of Things) applications heavily rely on BLE (e.g., syncing a mobile app with a medical heart monitor or an industrial weight scale). You must use a robust library like \`react-native-ble-plx\`. Do not write raw Bluetooth code unless absolutely necessary. You must handle the "Bluetooth is turned off" state gracefully by prompting the user to enable it via the OS settings. Furthermore, pairing flows must have strict timeouts; if a device doesn't respond within 10 seconds, the app must abort the connection attempt rather than hanging indefinitely.

## Implementation Steps
\`\`\`prompt
Act as an IoT Software Engineer. I am using \`react-native-ble-plx\` to connect to a custom Bluetooth device. Provide a robust state-machine diagram (or pseudocode) demonstrating how to scan for a specific UUID, connect to it, handle unexpected disconnects with an exponential backoff retry strategy, and gracefully handle the scenario where the user's Bluetooth is turned off.
\`\`\`

## Validation Checklist
- [ ] The app handles unexpected disconnects and automatically attempts reconnection.
- [ ] Timeout logic is implemented for all scanning and pairing attempts to prevent infinite loading spinners.
- [ ] The app prompts the user natively if their Bluetooth or Location services are disabled (BLE scanning requires Location permissions on Android).
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilenfc': `# NFC (Near Field Communication)

**Estimated Time:** 1-2 weeks

---

## Why this matters
NFC is the technology behind Apple Pay and tap-to-pay credit cards. It is fast, secure, and requires zero pairing. However, reading and writing NFC tags requires specific hardware capabilities and strict OS-level entitlements.

## Strategic Guidance

### Production SaaS
Enterprise applications use NFC for inventory management, security badge scanning, or anti-counterfeiting verification. On iOS, you can only read/write NFC NDEF (NFC Data Exchange Format) tags. You cannot emulate a credit card (Host Card Emulation) without highly restricted, special entitlements from Apple. Use a library like \`react-native-nfc-manager\`. Ensure your UI clearly instructs the user *where* the NFC antenna is located on their specific device (top edge for iPhones, middle back for most Androids).

## Implementation Steps
\`\`\`prompt
Act as an NFC Systems Integrator. I need to read NDEF tags in a React Native app using \`react-native-nfc-manager\`. Provide the exact \`Info.plist\` entitlements required for iOS to enable NFC reading. Then, provide the code to initiate an NFC scan session, read the text payload from the tag, and cleanly terminate the session.
\`\`\`

## Validation Checklist
- [ ] NFC Entitlements are properly configured in both iOS and Android project files.
- [ ] The UI provides visual guidance on where to tap the NFC tag against the phone.
- [ ] The NFC scanning session is properly closed/terminated after a tag is read to prevent locking the hardware.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilecamera': `# Custom Camera

**Estimated Time:** 2-3 weeks

---

## Why this matters
If you just need a user to take a profile picture, you should use the native OS camera via an image picker library. But if you are building Snapchat, a barcode scanner, or an AR app, you must build a *Custom Camera*. This involves tapping directly into the device's hardware streams, managing focus, exposure, and processing raw frames at 60 FPS without overheating the phone.

## Strategic Guidance

### Production SaaS
Enterprise apps often require custom cameras for Optical Character Recognition (OCR), barcode scanning, or capturing high-resolution document scans. Use a high-performance library like \`react-native-vision-camera\`. You must handle the camera lifecycle perfectly: if the user minimizes the app, you *must* pause the camera stream. If you leave the camera active in the background, the OS will terminate your app instantly for privacy violations, and the phone will physically overheat.

## Implementation Steps
\`\`\`prompt
Act as a Native Hardware Engineer. I am using \`react-native-vision-camera\` to build a custom barcode scanner. Provide the code to initialize the camera, handle the scenario where the user denies camera permissions, and implement a Frame Processor that runs a barcode scanning algorithm at 30 frames per second without blocking the JavaScript UI thread.
\`\`\`

## Validation Checklist
- [ ] The camera stream is paused immediately when the app goes into the background.
- [ ] Frame processors (if used) run asynchronously to avoid dropping UI frames (jank).
- [ ] The app handles permission denials with a clear fallback UI explaining why the camera is required.
\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobilelocationservices': `# Advanced Location Services

**Estimated Time:** 2-4 weeks

---

## Why this matters
Standard GPS drains the battery in a few hours. Advanced location services require a blend of WiFi triangulation, cellular tower data, and GPS hardware. If you are building a ride-sharing app or a fitness tracker, you need absolute precision. If you are building a weather app, you only need approximate location. Using the wrong precision level destroys the user experience.

## Strategic Guidance

### Production SaaS
Enterprise applications like logistics or fleet tracking require complex geofencing. You should not wake up the app every 10 seconds to check if a truck has entered a warehouse. Instead, you register a "Geofence" (a radius around a coordinate) with the OS. The OS will monitor this hardware-efficiently in the background and only wake up your app when the device crosses the boundary. This saves massive amounts of battery and ensures reliable trigger execution.

## Implementation Steps
\`\`\`prompt
Act as a GIS Architect. I am building a fleet management app. Explain the difference between 'High Accuracy' GPS polling vs OS-level 'Geofencing'. Provide the conceptual architecture for registering a 500-meter Geofence around a warehouse coordinate, and outline how the OS will notify the app when the device enters or exits that radius.
\`\`\`

## Validation Checklist
- [ ] The app utilizes Geofencing for location-based triggers rather than continuous background polling.
- [ ] The requested accuracy level (e.g., nearest kilometer vs nearest meter) matches the actual business requirement to preserve battery.
- [ ] The app degrades gracefully if the device loses GPS signal (e.g., inside a tunnel).
\`,\`,\`,\`,\`,\`,\`,\`,\`,`,
  'mobileuserresearch': `# User Research

**Estimated Time:** 1-2 days

---

## Why this matters
Building a mobile app takes months of dedicated effort. If you spend 3 months building a complex AI nutrition tracker, only to find out your target users are completely happy using a $2 paper notebook, you have wasted your time. You must validate the problem before you write a single line of code.

## Strategic Guidance

### Personal Project
You don't need a massive budget for user research. Go to Reddit (e.g., r/nutrition, r/fitness). Sort by 'Top -> This Month'. Look for people complaining about existing apps. Reach out to 5 of them via DM and ask them to jump on a 10-minute Discord call. If you can't find 5 people willing to talk about the problem, the problem isn't painful enough to warrant building a custom app.

## Implementation Steps
\`\`\`prompt
Act as a UX Researcher. I am building a [Insert App Type] for [Insert Target Audience]. Write an outreach script I can use to DM people on Reddit or Twitter to ask for a 10-minute user interview. Then, provide the 5 core open-ended questions I should ask them during the call to validate if my app idea actually solves a painful problem for them.
\`\`\`

## Validation Checklist
- [ ] You have spoken to at least 3 people in your target audience directly.
- [ ] You have confirmed they are currently experiencing the problem.
- [ ] You have identified how they are currently solving the problem without your app.
\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,`,
  'webfrontendarchitecture': `# Frontend Architecture

**Estimated Time:** 2-3 Hours

---

## Why this matters
Frontend architecture dictates how your UI code is structured. If you just throw all your React components into a single folder, your codebase will become an unmaintainable nightmare within weeks. You need a structured approach to state management, routing, and component hierarchy.

## Strategic Guidance

### Hackathon Mode
Just put everything in \`src/components\` and use local state (\`useState\`). Don't waste time setting up Redux or complex folder structures. Move fast and break things.

### Personal Project
Keep it simple but organized. Group your files by feature (e.g., \`src/features/auth\`, \`src/features/dashboard\`) rather than by type (\`src/components\`, \`src/hooks\`). Use React Context or Zustand for global state.

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
\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,`,
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
- [ ] You have accounted for standard timestamps (\`created_at\`, \`updated_at\`).
\`,\`,\`,\`,\`,`,
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
- [ ] You restrict the allowed file types (e.g., only \`.jpg\`, \`.png\`).
- [ ] You enforce a maximum file size limit.
\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,`,
  'webfundamentals': `# Web Fundamentals

**Estimated Time:** 1 Hour

---

## Why this matters
Modern frameworks (like React and Next.js) abstract away a lot of the underlying browser mechanics. If you don't understand basic web fundamentals—like how the DOM works, what CORS is, and the difference between LocalStorage and Cookies—you will struggle to debug mysterious errors.

## Strategic Guidance

### Hackathon Mode
If you get a CORS error, just install a Chrome extension to bypass it or use a proxy. Don't waste time studying HTTP protocols while the clock is ticking.

### Personal Project
Take the time to understand the errors you hit. Learn the difference between \`let\`, \`const\`, and \`var\`. Understand how asynchronous JavaScript (\`Promises\` and \`async/await\`) actually works.

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
\`,\`,\`,\`,\`,`,
  'webauthorization': `# Authorization

**Estimated Time:** 2 Hours

---

## Why this matters
Authentication is *who* you are. **Authorization** is *what you are allowed to do*. If you fail to implement proper authorization, any logged-in user might be able to edit another user's profile, view sensitive admin data, or delete the entire database.

## Strategic Guidance

### Hackathon Mode
Hardcode your own user ID as the "Admin". If \`user.id === '123'\`, show the admin dashboard. Ignore complex role-based systems entirely.

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
\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
\`,\`,\`,\`,`,
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
- [ ] OpenGraph (\`og:image\`, \`og:title\`) tags are configured.
- [ ] A \`sitemap.xml\` file is generated and submitted to Google Search Console.
\`,\`,\`,`,
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
\`,\`,\`,`,
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
\`,\`,\`,`,
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
\`,\`,\`,`,
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
\`,\`,\`,`,
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
\`,\`,\`,`,
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
\`,\`,\`,`,
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
\`,\`,\`,`,
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
\`,\`,\`,`,
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
\`,\`,\`,`,
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
Ensure your marketing site is built with a framework that supports Static Site Generation (SSG) or Server-Side Rendering (SSR) (like Next.js, Nuxt, or Astro). Implement dynamic XML sitemaps. Ensure every public page has a unique \`<title>\`, meta description, and optimized \`H1\` tags. Set up canonical URLs to prevent duplicate content penalties. Use Google Search Console to monitor crawl errors.

## Implementation Steps
\`\`\`prompt
Act as an SEO Technical Expert. I am using [Insert Framework, e.g., Next.js App Router]. Provide the code to generate a dynamic \`sitemap.xml\` for my blog posts, and show me how to inject dynamic metadata (Title, Description, OpenGraph Image) into a specific route based on the data fetched from the database.
\`\`\`

## Validation Checklist
- [ ] Google Search Console is set up and verifying your domain.
- [ ] Dynamic pages automatically generate correct OpenGraph and Meta tags.
- [ ] Your site scores 90+ on Lighthouse's SEO metric.
\`,\`,\`,`,
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
\`,\`,\`,`,
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
\`,\`,\`,`,
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
\`,\`,\`,`,
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
\`,\`,\`,`,
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
\`,\`,\`,`,
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
\`,\`,\`,`,
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
\`,\`,`,
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
\`,`,
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
\`,`,
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
\`,`,
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
\`,`,
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
\`,`,
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
\`,`,
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
\`,`,
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
\`,`,
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
\`,`,
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
\`,`,
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
\`,`,
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
\`,`,
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
\`,`

};
