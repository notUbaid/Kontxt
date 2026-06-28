---
title: Authentication
slug: authentication
phase: Phase 2
mode: personal
projectType: mobile-app
estimatedTime: 20–30 min
---

# Authentication

If you chose a BaaS (Supabase or Firebase) in Tech Stack, you already have a built-in auth system — use it. There's no good reason to add a separate auth provider or build your own for a personal project when auth is already included with the backend you're paying nothing extra for.

---

## Decision 1: Use Your BaaS's Built-In Auth

>  **Best Practice**
> Use Supabase Auth or Firebase Auth directly rather than adding Clerk, Auth0, or a custom auth system on top. It's already integrated with your database's access rules (RLS/security rules from the Database module), already handles password hashing and session tokens correctly, and adding a separate provider just creates two systems to keep in sync for no real personal-project benefit.

---

## Decision 2: Auth Methods

| Method | Note |
|---|---|
| Email/password | Simplest, works everywhere, no extra platform requirement |
| Magic link | No password to remember; works well for low-friction personal apps |
| Google / social login | Convenient, but adds a platform requirement — see below |

> [!WARNING]
> **If you offer any third-party social login (Google, Facebook, etc.) on iOS, Apple requires you to also offer "Sign in with Apple."** This is an App Store review requirement, not optional — apps have been rejected for offering Google sign-in without an Apple equivalent. Decide this now so you're not surprised during App Store Setup later.

> [!TIP]
> For a personal project, starting with just **email/password or magic link** avoids this requirement entirely while you validate the idea. Add social login later if it's worth the extra setup (including Sign in with Apple).

---

## Decision 3: Session Storage

Already decided in State Management: auth session/tokens go in **SecureStore** (or platform Keychain/Keystore), never AsyncStorage. Most BaaS client SDKs for React Native have an option to plug in secure storage for session persistence — configure this explicitly, don't rely on the default if the default isn't secure storage.

---

## Decision 4: Email Verification & Password Reset — Deep Linking

> [!WARNING]
> Email verification and password reset links need to open your **app**, not just a webpage, for a good mobile UX (and to actually function if your app has no corresponding web version). This means the deep linking setup from App Navigation isn't optional once you add these flows — confirm your BaaS's email templates link to your app's custom URL scheme or universal link, and that your app correctly handles landing on the right screen when opened via that link.

- [ ] Email verification link opens the app and confirms verification, not just a generic webpage
- [ ] Password reset link opens the app to a reset-password screen with the necessary token

---

## Decision 5: Biometric Auth (Optional, Nice-to-Have)

For a personal app, adding Face ID/Touch ID (or Android's biometric equivalent) as a convenience layer on top of your BaaS session is a relatively small addition that meaningfully improves the day-to-day experience — unlocking the app without retyping a password every time.

> [!TIP]
> This is a "nice to have once the core app works" item, not a launch blocker. Most cross-platform frameworks have a straightforward biometric library (e.g., Expo's `local-authentication`) — add it after your core auth flow is solid, not before.

---

## Common Mistakes (Including AI's)

- **Adds a separate auth provider** instead of using the BaaS's built-in auth — push back unless there's a specific reason the built-in option doesn't fit.
- **Offers Google/Facebook login without Sign in with Apple** on iOS — flag this explicitly if social login is in scope; it's an App Store rejection risk, not a style choice.
- **Doesn't configure secure storage for session persistence** — verify the BaaS client is explicitly set up to use SecureStore/Keychain, not its default storage.
- **Sends verification/reset links that open a webpage instead of the app** — confirm deep linking is actually wired into the email templates and app navigation.

---

## AI Prompt: Implement Auth Flows

```
Implement authentication for a personal mobile app using [Supabase Auth / Firebase Auth] with [React Native/Expo].

Requirements:
- Auth methods: [email/password / magic link / + Google if you want it]
- If including Google or another social login on iOS, also implement Sign in with Apple — this is an App Store requirement, not optional
- Configure the client to persist sessions using SecureStore (or platform Keychain), not the SDK's default storage
- Set up email verification and password reset to deep link back into the app at [verification screen / reset password screen] using my app's URL scheme: [yourapp://]

Confirm explicitly that session tokens are stored securely and that both deep link flows actually open the app correctly, not a generic webpage.
```

---

## Validate Before You Move On

- [ ] Auth uses your BaaS's built-in system, not a redundant separate provider
- [ ] If any third-party social login is offered on iOS, Sign in with Apple is also implemented
- [ ] Session/token storage is explicitly configured to use secure storage, not the SDK default if that default isn't secure
- [ ] Email verification and password reset links open the app via deep link, not a bare webpage
- [ ] You've tested the full signup → verify → login flow at least once end-to-end on a real device

> [!TIP]
> Test the password reset deep link specifically — it's the flow most likely to silently break if your URL scheme or navigation mapping has a small mistake, and you won't notice until a real user (possibly you, locked out) hits it.

---

**Next:** Offline Strategy — decide how this app behaves without a reliable connection.
