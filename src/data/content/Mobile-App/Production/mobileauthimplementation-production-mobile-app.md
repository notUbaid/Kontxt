---
title: Auth Implementation
slug: auth-implementation
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 25-30 min
---

# Auth Implementation

Phase 2 chose your auth provider and approach. This module is where that becomes real, working code — and where most of the genuinely dangerous mistakes in mobile apps get made, because auth code looks like it works in a quick test long before its edge cases get exercised.

---

## The Core Mobile-Specific Constraint

> ️ On web, tokens commonly live in memory or an HTTP-only cookie the browser manages. On mobile, **you are responsible for secure token storage yourself** — and the wrong choice here is invisible until someone inspects the device or a security review flags it. This module exists primarily to prevent that class of mistake.

---

## Decision 1 — Token Storage

| Storage | Secure? | Use For |
|---|---|---|
| **Keychain (iOS) / Keystore (Android)**, via a library like `expo-secure-store` or `react-native-keychain` | Yes — hardware-backed encrypted storage | Refresh tokens, anything long-lived |
| **AsyncStorage / plain device storage** | No — unencrypted, readable if device storage is accessed | Never for tokens |
| **In-memory only** | Yes, by virtue of not persisting | Access tokens, if you're comfortable re-authenticating on every cold start (usually not the right tradeoff for UX) |

> ️ **The single most common mobile auth mistake:** storing tokens in AsyncStorage because it's the first thing that shows up when searching "react native store token." AsyncStorage is unencrypted plain storage — acceptable for non-sensitive preferences, never acceptable for auth tokens. Use the platform's secure storage from the start; retrofitting this after tokens have been stored insecurely means forcing a re-auth for your entire user base when you fix it.

```typescript
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('refresh_token', token);
const token = await SecureStore.getItemAsync('refresh_token');
```

---

## Decision 2 — Access Token vs Refresh Token Pattern

Standard production pattern, implement it fully rather than a simplified version:

- **Access token:** short-lived (minutes to low hours), sent with every API request, kept in memory (or secure storage — but minimize how long it needs to live).
- **Refresh token:** long-lived, used only to obtain new access tokens, stored in secure storage, never sent to any endpoint except the token-refresh one.

This connects directly to the Backend Integration module's response interceptor — that's where the actual refresh-on-401 flow executes. This module is about what's being stored and how it's protected; that module is about when it gets used.

>  If your auth provider (Firebase Auth, Auth0, Clerk, Supabase Auth, custom) handles this rotation for you via SDK, use the SDK's built-in session management rather than reimplementing token refresh by hand — most production auth bugs in this area come from teams rebuilding what their provider's SDK already does correctly.

---

## Decision 3 — Biometric Authentication

If your app handles sensitive data (financial, health, private messaging), decide whether biometric re-auth (Face ID / fingerprint) gates app access or specific sensitive actions:

- **App-launch gate:** require biometric confirmation to unlock the app after backgrounding for some duration — appropriate for genuinely sensitive apps (banking, health records).
- **Action-level gate:** require biometric confirmation only for specific sensitive actions (confirming a payment, viewing a specific record) — appropriate for apps where most content is fine to view freely but specific actions warrant extra confirmation.
- **Neither:** appropriate for apps without sensitive data — don't add biometric friction without a reason; it's a real UX cost.

>  Biometric auth is a local device check, not a server-side authorization mechanism — it confirms "this is the device owner," not "this request is authorized." Don't treat a successful biometric check as a substitute for actual backend authorization on sensitive actions; pair it with, not instead of, server-side checks.

---

## Decision 4 — Session Expiry & Logout

- **Define what "logged out" actually clears:** the token from secure storage, any cached server state (React Query cache from the State Management module), and any persisted client state that's user-specific. A logout that clears the token but leaves cached profile data visible momentarily on next launch is a real, noticeable bug.
- **Handle forced logout (token revoked server-side, e.g. password changed elsewhere) explicitly** — your API client's 401 handling should distinguish "needs refresh" from "refresh also failed, user must re-authenticate," and the latter should route cleanly to your auth-gated navigator state, not show a generic error.

```typescript
async function logout() {
  await SecureStore.deleteItemAsync('refresh_token');
  queryClient.clear(); // clear all cached server state
  useUIStore.getState().reset(); // clear user-specific UI state
  // RootNavigator's auth state listener picks this up and switches to AuthStack
}
```

---

## Decision 5 — Social/Third-Party Auth Specifics

If supporting Sign in with Apple, Google, etc.:

- **Sign in with Apple is mandatory** if you offer any other third-party login option and distribute through the App Store — this is an App Store review requirement, not optional, and missing it is a common rejection reason.
- Decide how account linking works if a user signs up with email first, then later tries Google sign-in with the same email — silently creating a duplicate account, versus prompting to link, are very different UX and data-integrity outcomes. Decide explicitly rather than letting it be whatever your auth provider does by default.

---

## Decision 6 — Multi-Device Sessions

Connects directly to your Push Notifications module's device token table:

- Decide whether logging in on a new device logs out other devices (single-session model) or allows concurrent sessions (most consumer apps).
- If concurrent sessions are allowed, make sure logout-from-one-device doesn't accidentally revoke tokens for other devices — this requires per-device (not per-user) refresh token tracking.

---

## AI Prompts

### Prompt 1 — Auth Flow Implementation

```
Implement the authentication flow for a production [React Native] app.

Auth provider: [Firebase Auth / Auth0 / Clerk / Supabase / custom]
Social providers needed: [Apple / Google / etc.]
Biometric gating needed: [yes/no, and what level — app launch or action level]

Implement: secure token storage using expo-secure-store (never AsyncStorage),
the login/logout flow including full cache/state clearing on logout, and
the auth state that feeds the root navigator's auth-gating logic. If using
social auth alongside email, include Sign in with Apple per App Store
requirements.
```

### Prompt 2 — Auth Security Review

```
Review this authentication implementation for security issues:

[paste your auth code]

Check specifically for: tokens stored in AsyncStorage or other unencrypted
storage instead of secure storage, biometric checks used as a substitute
for server-side authorization rather than alongside it, logout that doesn't
fully clear cached server/client state, and missing Sign in with Apple
if other social providers are present.
```

---

## Validating AI Output

- [ ] Tokens are stored via platform secure storage (Keychain/Keystore), never AsyncStorage or plain storage
- [ ] Refresh tokens are never sent to any endpoint except the token-refresh endpoint itself
- [ ] Logout clears the token, the React Query cache, and any user-specific persisted client state — not just the token
- [ ] Biometric checks are paired with, not substituted for, server-side authorization on sensitive actions
- [ ] Sign in with Apple is present if any other third-party social login is offered and the app ships to the App Store
- [ ] Forced logout (revoked token) is distinguished from "needs refresh" and routes cleanly through auth-gated navigation

---

## What's Next

- **Offline Features** (next in this phase) needs to handle what happens to queued offline actions if a session expires before they sync.
- **App Permissions Strategy** covers the biometric permission prompt itself, if you're using device biometrics.
- **Security** (Phase 4) revisits this module's decisions at a system-wide level, alongside broader attack-surface review.
