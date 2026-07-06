---
title: System Architecture
slug: system-architecture
phase: Phase 1
mode: production
projectType: mobile-app
estimatedTime: 30-40 min
---

# System Architecture

A mobile app is not "a frontend that talks to an API." It's a client that goes offline mid-session, gets backgrounded by the OS without warning, ships updates that users delay installing for months, and runs on hardware you don't control. Your architecture has to survive all of that — or your app will feel broken even when your code is correct.

This module locks in the architecture decisions that are expensive to reverse later: how the client is structured, how data flows and syncs, how you ship fixes without waiting on app store review, and how you'll know something broke before your users tell you in a 1-star review.

> This module assumes a **React Native (Expo)** client, the default recommendation for small teams shipping to iOS and Android from one codebase. The architectural principles apply regardless of stack — only implementation details change if you're on native Swift/Kotlin or Flutter.

---

## The Shape of a Production Mobile System

Every production mobile app is built from the same six moving parts. What differs is how much rigor each one gets.

```
┌─────────────────┐
│   Mobile Client   │  React Native (Expo) — UI, local cache, offline queue
└────────┬─────────┘
     │ HTTPS (REST/RPC)
     ▼
┌─────────────────┐
│   API Layer    │  Auth, validation, business rules, rate limiting
└────────┬─────────┘
     │
   ┌──┴───┬──────────┬───────────┐
   ▼    ▼      ▼       ▼
┌────────┐ ┌────────┐ ┌───────────┐ ┌─────────────┐
│Database│ │ Storage │ │Push (FCM) │ │Remote Config│
└────────┘ └────────┘ └───────────┘ └─────────────┘
```

The part beginners skip is the **Remote Config** box. On web, shipping a fix means deploying. On mobile, shipping a fix means an app store review that can take 24 hours to 7 days — and even then, users have to actually update. Your architecture needs an escape hatch that doesn't depend on the store. More on this below.

---

## Decision 1: Backend Strategy

> **Decision Framework**

| Approach | When it wins | Cost of being wrong |
|---|---|---|
| **BaaS (Supabase/Firebase)** | Solo/small team, standard CRUD + auth + realtime needs | Migrating off later is a rewrite, not a refactor |
| **Custom backend (FastAPI/Node)** | Complex business logic, non-standard auth, heavy compute | Slower to build; you own ops, scaling, patching |
| **Hybrid (BaaS + custom API)** | Standard auth/storage via BaaS, custom logic in your own service | More moving parts to monitor and secure |

**Recommendation for most production mobile apps:** Supabase (Postgres + Auth + Storage + Realtime) as the backend of record, with a thin custom API layer (FastAPI on Cloud Run, or Supabase Edge Functions) only for logic that doesn't belong in the client — payment webhooks, third-party API calls that need secret keys, and anything with business rules a client shouldn't be trusted to enforce.

> **️ Common Mistake**
> Putting business logic in the mobile client because "it's faster to build." A client is code you don't control post-release — anyone can decompile it, intercept its requests, or run an old version indefinitely. Anything that decides money, permissions, or data integrity belongs server-side, enforced again even if the client also checks it.

---

## Decision 2: Client Architecture Pattern

Beginners either put everything in components (unmaintainable past 20 screens) or over-engineer Clean Architecture with five layers for a team of one (unmaintainable for a different reason). For a production app built by a small team, use **feature-based folders + a clear state-ownership split** — not a formal architecture pattern.

```
/src
 /features
  /auth
   screens/
   components/
   api.ts        ← all network calls for this feature
   hooks.ts       ← React Query hooks wrapping api.ts
   store.ts       ← Zustand slice, only if needed
  /profile
  /feed
 /shared
  /components     ← truly reusable UI only
  /lib          ← api client, storage wrapper, analytics
```

**State ownership split (this is the actual architectural decision, not the folder names):**

| State type | Owner | Tool |
|---|---|---|
| Server data (posts, profile, orders) | React Query / TanStack Query | Cache + background refetch + offline retry built in |
| Ephemeral UI state (modal open, form input) | Component `useState` | No global store needed |
| Cross-screen client state (theme, draft post) | Zustand | Minimal boilerplate vs Redux |
| Auth session | Secure storage + a thin auth context | Never in Zustand/AsyncStorage unencrypted |

> ** Tip**
> If you're reaching for Redux in 2026, stop. React Query eliminates 80% of the reason Redux existed (server state caching). Zustand covers what's left in a fraction of the code. Redux is defensible at large-team scale; it's overengineering for a production app built by 1-5 people.

---

## Offline-First Data Architecture

This is the single biggest architectural difference between web and mobile, and the one most beginners get wrong by ignoring it entirely.

**The principle:** assume every network request can fail, and design the UI to stay usable when it does.

**Minimum viable offline architecture:**

1. **Read path:** React Query cache serves the last-known-good data instantly, refetches in the background when connectivity returns. The user sees stale-but-real data, not a spinner or a blank screen.
2. **Write path:** Mutations that happen offline get queued locally (React Query's `mutate` + a persisted queue, or a library like `@tanstack/react-query-persist-client`) and replay in order when the connection is restored.
3. **Conflict handling:** decide upfront what happens when a queued write conflicts with server state (e.g., editing a post that was deleted elsewhere). "Last write wins" is fine for most apps — pick it consciously rather than by accident.

> ** Best Practice**
> Design every mutation to be idempotent (safe to retry). A queued "like this post" request that fires twice due to a retry should not create two likes. Use an idempotency key or a toggle-based check, not an increment.

---

## API Design & Versioning

Web apps deploy the client and server together. Mobile apps can't — a user on v1.2 might not update for six months, and your API has to keep serving them without breaking.

**Rules that prevent production incidents:**

- **Never remove or repurpose a field** the client depends on. Add new fields; deprecate old ones only after confirming no supported app version still reads them.
- **Version the API from day one**, even if v1 is the only version — `/api/v1/...`. Retrofitting versioning after your first breaking change is painful and error-prone.
- **Enforce a minimum supported app version.** Have the API return a specific error code when a request comes from a client version you've decided to stop supporting, and have the client show an "update required" screen. This is your only lever against ancient clients calling an API that's moved on.

> **️ Common Mistake**
> Treating the backend as "done" once the client works with it during development. The client you're testing with is always the newest one. Production has a long tail of older versions still in the wild — your API contract has to hold for all of them, not just today's build.

---

## The Remote Config Escape Hatch

Because you can't hotfix a native binary instantly, production mobile architectures need a way to change behavior without an app store release.

| Mechanism | Fixes | Store review needed? |
|---|---|---|
| **Remote config** (a table/flag service, e.g. Supabase table or Firebase Remote Config) | Feature flags, kill switches, copy changes, rollout percentages | No |
| **OTA JS update** (Expo EAS Update) | Bugs in JS/React code, most UI issues | No — ships in minutes |
| **Native app store release** | Native module changes, new permissions, SDK upgrades | Yes — hours to days |

> ** Best Practice**
> Wrap any risky new feature in a remote flag before you ever need it. The five minutes it takes to add a flag check is nothing compared to being unable to disable a broken feature for the six days your app store review takes.

---

## Push Notification Architecture

Use **Firebase Cloud Messaging (FCM)** as the single delivery mechanism for both iOS and Android — it handles the APNs relay for you, so you integrate one SDK instead of two.

**Flow:**

```
Backend event (new message, order shipped)
   → API triggers push send via FCM
     → FCM routes to APNs (iOS) or delivers directly (Android)
       → Device shows notification
         → Tap → deep link opens the relevant screen
```

**Architectural decisions to make now, not later:**
- Store device push tokens per-user, per-device, with a `last_seen` timestamp — tokens rotate and go stale, and a user with 3 old devices shouldn't get 3 duplicate pushes.
- Design deep links (`yourapp://order/123`) alongside the notification schema from the start. Retrofitting deep linking after screens are built means restructuring navigation.
- Never put sensitive content in the notification payload itself (it's visible on lock screens) — send an ID, fetch the content after the app opens.

---

## Security Architecture

> **️ Common Mistake**
> Storing auth tokens in `AsyncStorage`. It's unencrypted on-device storage — readable by anything with filesystem access on a rooted/jailbroken device. Use `expo-secure-store` (iOS Keychain / Android Keystore) for tokens, full stop.

Non-negotiables for a production mobile app:

- **Secure storage** for tokens and any credential-like data (Keychain/Keystore via `expo-secure-store`).
- **Certificate pinning** if the app handles payments or sensitive data, to prevent man-in-the-middle attacks on compromised networks.
- **Server-side validation of everything**, even data the client already validated — the client is not a trust boundary.
- **Obfuscation is not security.** Assume your API keys and endpoints will be extracted from the app binary; design your auth so that extraction alone doesn't grant access (short-lived tokens, server-side authorization checks).

---

## Observability Architecture

You cannot `console.log` your way through a crash that happened on a stranger's phone. Build observability in from the start:

| Layer | Tool | Catches |
|---|---|---|
| Crash reporting | Sentry (React Native SDK) | JS crashes, native crashes, with stack traces mapped to your source |
| Analytics | PostHog or Firebase Analytics | Drop-off points, feature usage, funnel breaks |
| Backend logging | Structured logs (JSON) on your API layer | Failed requests, slow queries, auth failures |
| Uptime/API health | A simple health-check endpoint + external monitor (e.g. UptimeRobot) | Backend outages before users report them |

> ** Tip**
> Set up Sentry before you need it, not after your first production crash report with no stack trace. Retrofitting error tracking after launch means your first real incidents are debugged blind.

---

## CI/CD & Release Architecture

```
git push → EAS Build (compiles native binaries)
        → EAS Submit (uploads to App Store / Play Store)
        → App store review
        → Released to users
```

Separately, for JS-only changes:

```
git push → EAS Update (OTA)
        → Delivered to users on next app open, no review
```

**Decide your release channels now:** `development`, `preview` (internal testing/TestFlight), `production`. Every build should be traceable to a channel and a commit — "which code is actually running for users right now" should never be a guess.

---

## AI Prompts

**1. Architecture review prompt** — use this after you've drafted your own architecture, to catch what you missed:

```
Review this mobile app architecture for a production [app description] app.

Stack: React Native (Expo), Supabase, FCM, Sentry.

Architecture summary:
[paste your diagram/decisions from this module]

Check specifically for:
- Offline/sync gaps that would cause data loss or duplicate writes
- API versioning or backward-compatibility issues
- Anything that requires an app store release to fix, that could
  instead be behind a remote config flag
- Security issues: token storage, unvalidated client trust, exposed
  secrets
- Missing observability for the failure modes most likely in this
  specific app

Be specific and cite which part of the architecture each issue
applies to. Don't suggest generic best practices I didn't ask about.
```

**2. Deep-link + push schema prompt** — use this once you know your core screens:

```
I have these screens in my React Native app: [list screens].

Design a deep link URL scheme for each screen that needs one, and
a push notification payload schema (data-only, no PII) that maps
to opening the correct screen with the correct data loaded.

Output as a table: screen | deep link pattern | required push
payload fields.
```

> ** Tip**
> Don't paste your entire codebase into these prompts. Paste the architecture summary and the specific screens/flows in question. A focused prompt gets a focused, checkable answer — a huge context dump gets a generic one.

---

## Validation Checklist

- [ ] Backend strategy chosen and justified (BaaS / custom / hybrid) — not defaulted to
- [ ] State ownership is explicit: server state, UI state, and auth session each have one clear owner
- [ ] Offline read path (cached data shown instantly) and write path (queued mutations) both designed
- [ ] API is versioned from the first endpoint, even at v1
- [ ] Minimum supported app version check exists on the backend
- [ ] Remote config / feature flag mechanism in place before you need to disable something urgently
- [ ] OTA update channel (EAS Update) configured separately from native store releases
- [ ] Push tokens stored per-device with staleness handling
- [ ] Tokens/credentials in secure storage, never AsyncStorage
- [ ] Crash reporting and structured backend logging live before first production users, not after

---

## What's Next

With the architecture decided, the next module covers **Database Schema Design** — turning these architectural decisions into actual tables, relationships, and constraints in Supabase/Postgres.
