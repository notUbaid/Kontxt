---
title: State Management
slug: state-management
phase: Phase 2
mode: personal
projectType: mobile-app
estimatedTime: 20–30 min
---

# State Management

Mobile apps have a state management wrinkle web apps don't: the app can be killed and relaunched at any time, and some state needs to survive that — securely. This module covers what goes where, and specifically how to handle anything sensitive (like auth tokens) correctly.

---

## Decision 1: Don't Over-Build This for a Personal App

> [!WARNING]
> A personal mobile app with a handful of screens rarely needs Redux-level ceremony. Resist the urge to set up an elaborate state management architecture before you know if you need it — start with the simplest tool that fits, and add complexity only when a real screen actually demands it.

| Need | Simplest fitting tool |
|---|---|
| A few pieces of app-wide state (current user, theme) | React Context, or a lightweight library like Zustand if Context's re-render behavior becomes a real issue |
| Server data (from your BaaS or API) | Your BaaS client's built-in data fetching/subscriptions, or TanStack Query if you want consistent caching behavior |
| Per-screen local state (form inputs, toggle states) | Plain component state — nothing else needed |

---

## Decision 2: Server State

> [!TIP]
> If you're using a BaaS like Supabase or Firebase (from Tech Stack), their client libraries already handle a lot of what TanStack Query would otherwise solve — fetching, real-time subscriptions, basic caching. For a personal project, it's reasonable to use the BaaS client directly rather than adding another data-fetching library on top, unless you find yourself needing more advanced cache control than it provides.

---

## Decision 3: Persisted Local State — and Where Sensitive Data Goes

This is the part of mobile state management that doesn't have a clean web equivalent.

> **Decision Card — Two Different Storage Mechanisms**
- **AsyncStorage** (or equivalent) — fine for non-sensitive preferences: theme choice, onboarding-seen flag, last-viewed tab
- **SecureStore / Keychain / Keystore** (platform secure storage) — required for anything sensitive: auth tokens, refresh tokens, any credential

> [!WARNING]
> **Never store auth tokens or any credential in AsyncStorage.** It's unencrypted, plain storage — readable by anything with file system access on a compromised or rooted/jailbroken device. Use your platform's secure storage (Expo SecureStore, or the equivalent Keychain/Keystore wrapper) for anything that would be a security problem if exposed.

---

## Decision 4: What Should Survive an App Restart?

Decide deliberately rather than discovering gaps by accident:

- [ ] Auth session — should persist (via secure storage) so the user isn't forced to log in every time they reopen the app
- [ ] User preferences (theme, notification settings) — should persist
- [ ] In-progress form data — usually fine to lose on restart for a personal app, unless a specific flow is long enough that losing it would be genuinely frustrating

---

## Decision 5: Be Aware Your State Might Be Stale

Mobile apps move in and out of network connectivity more than web apps typically do. Even before fully designing your Offline Strategy (a later module), keep this in mind now: don't assume the data in your global/server state is always fresh — design screens to handle a "this might be a few minutes old" reality gracefully rather than assuming constant connectivity.

---

## Common Mistakes (Including AI's)

- **Sets up Redux or another heavy state library** for an app simple enough not to need it — push back and start simpler.
- **Stores auth tokens in AsyncStorage** instead of secure storage — this is a security mistake, not a style preference; always check for it explicitly.
- **Doesn't persist the auth session**, forcing users to log in every single time they open the app — confirm this is handled.
- **Builds a custom data-fetching layer on top of a BaaS client** that already provides equivalent functionality, adding complexity without benefit.

---

## AI Prompt: Set Up State Management

```
Set up state management for a personal mobile app using [React Native/Expo + your BaaS choice].

Requirements:
- Use [React Context / Zustand] for app-wide state: current user, [any other genuinely global state]
- Use [the BaaS client / TanStack Query] for server data — don't add a second data-fetching layer if the BaaS client already covers this
- Auth tokens/session must be stored in SecureStore (or platform Keychain/Keystore), never AsyncStorage
- Non-sensitive preferences (theme, onboarding state) can use AsyncStorage
- Confirm explicitly: the user's auth session persists across an app restart, and where each piece of state is stored

Keep this minimal — this is a personal project, not a large team's app; don't add state management infrastructure I don't have a concrete need for yet.
```

---

## Validate Before You Move On

- [ ] Auth tokens/credentials are in secure storage, never AsyncStorage or plain storage
- [ ] Auth session persists across an app restart (no unnecessary forced re-login)
- [ ] Non-sensitive preferences persist appropriately via AsyncStorage
- [ ] You're using the simplest state management tool that actually fits your app's current complexity
- [ ] You haven't built a custom data-fetching layer duplicating what your BaaS client already provides

> [!TIP]
> If you ever find yourself debugging "why did the user get logged out" or "why did this setting reset," check storage mechanism first — it's the most common root cause in mobile state bugs.

---

**Next:** Database — decide how your app's data is actually structured and stored.
