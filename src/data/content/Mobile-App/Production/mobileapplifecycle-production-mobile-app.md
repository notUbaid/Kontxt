---
title: App Lifecycle
slug: app-lifecycle
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 20-25 min
---

# App Lifecycle

Mobile apps don't run continuously the way a web app's tab does. The OS backgrounds them, suspends them, and kills them to reclaim memory — often without warning, and often while a user is mid-action. This module decides how your app behaves across those transitions, so "I background the app, come back five minutes later, and it crashed/reset/lost my form" never happens in production.

This is one of the most under-designed areas in apps built primarily with AI tools — lifecycle bugs don't show up in a quick dev session where the app stays foregrounded the whole time. They show up in real usage, and by then they're a support backlog instead of an architecture decision.

---

## The Four States You're Actually Designing For

| State | What It Means | What You Must Decide |
|---|---|---|
| **Active (foreground)** | App is visible and in use | Normal operation |
| **Inactive** | Transitioning (e.g. iOS app switcher, incoming call overlay) | Usually nothing — brief and automatic |
| **Background** | App is not visible but still in memory | What pauses, what keeps running, how long before the OS may suspend it |
| **Killed/Terminated** | OS reclaimed the app's memory entirely | What state must be restored on next cold launch |

> ️ **The mistake that causes the most production bugs here:** treating "backgrounded" and "killed" as the same thing, or not distinguishing them at all. They require different recovery strategies — backgrounded apps can often resume in-memory state instantly; killed apps need to reconstruct state from persisted storage on a full cold start.

---

## Decision 1 — What Happens on Background

Decide explicitly, per concern:

- **In-flight network requests:** do they continue, or should they be cancelled? A long-running upload should likely continue in the background (within OS-granted time limits); a screen-specific data fetch that's no longer needed can be cancelled to save battery/bandwidth.
- **Timers and polling:** anything on an interval (a chat polling loop, a live countdown) should pause on background and resync on foreground — don't let it silently keep firing against a screen the user can't see, burning battery and rate limit budget for nothing.
- **Sensitive content:** if your app shows sensitive data (financial info, private messages), decide whether to blur/hide it in the OS app-switcher preview. This is a real, frequently-missed production requirement — the app-switcher snapshot is taken automatically by the OS and can leak content visually.
- **Background task time limits:** both iOS and Android grant only a short window (seconds, not minutes) for background work after the user leaves the app, before suspending you — don't architect anything that assumes background execution continues indefinitely.

---

## Decision 2 — What Happens on Foreground (Resume)

When the app returns from background, decide what needs refreshing versus what can stay as-is:

| Concern | Typical Decision |
|---|---|
| Auth token | Check expiry; refresh silently if needed before the user notices |
| Stale data | Refetch screens where data could meaningfully have changed (e.g. a feed) — not every screen blindly |
| Push notification permission state | Re-check; the user may have changed it in OS settings while backgrounded |
| Deep link queued during background | Process now if one's pending |

>  Don't refetch everything on every foreground transition reflexively — that's wasteful and can cause visible loading flickers on screens where nothing changed. Tie refresh decisions to actual staleness (e.g. "refetch if more than N minutes since last fetch") rather than refreshing unconditionally on every resume.

---

## Decision 3 — Cold Start State Restoration

This is the hardest case: the OS killed your app, and the user reopens it expecting to land roughly where they left off (or, at minimum, not lose meaningful in-progress work).

**Decide what's worth persisting across termination, explicitly:**

- **Navigation state** (which screen they were on) — usually worth restoring, but auth-gate it: don't restore a deep stack into content the user is no longer authorized to see.
- **In-progress form data** — for anything longer than a quick form (multi-step onboarding, a draft post), persist to local storage as the user types, not just on submit. Losing a half-written post to a backgrounding event is one of the most common user complaints in apps that skip this.
- **Scroll position** — usually not worth the complexity to persist; most users don't expect this preserved across a full kill.

> ️ **Don't persist everything by default.** Indiscriminately dumping full app state to disk on every change has real performance and storage cost, and risks restoring stale/invalid state (e.g. resuming into a checkout flow for a cart that's since changed server-side). Persist deliberately, scoped to what genuinely improves the resume experience, and validate restored state against the server before trusting it for anything transactional.

---

## Decision 4 — Push Notification & Deep Link Interaction with Lifecycle

This connects directly to your Push Notifications and Deep Linking modules:

| App State When Notification Is Tapped | What Happens |
|---|---|
| Killed | Cold start → app boots → pending deep link held until navigator/auth ready → then navigates (per your Deep Linking cold-start design) |
| Background | App resumes from background → process deep link immediately, navigator already mounted |
| Foreground (notification received while app open) | Don't auto-navigate — show an in-app banner/toast instead; auto-navigating away from what the user is actively doing is jarring |

>  This is exactly why your Deep Linking module's "pending deep link holding pattern" matters — it's the mechanism that makes the killed-state row of this table work correctly.

---

## Decision 5 — Crash Recovery

Distinguish from graceful backgrounding — a crash is unplanned termination, and recovery should be conservative:

- On next launch after a crash, don't silently restore the user to the exact state that may have caused the crash — that risks an immediate repeat crash loop.
- Log the crash (this connects to Observability in Phase 4) with enough context to diagnose it, before deciding what state to restore.
- For anything transactional (a payment mid-flight when a crash occurred), always re-verify status with your backend on next launch rather than assuming the last known client-side state is accurate.

---

## AI Prompts

### Prompt 1 — Lifecycle Handler Design

```
Design app lifecycle handling for a production [React Native / Flutter] app.

Screens/features with active network polling or timers: [list them]
Sensitive screens that should hide content in the app switcher: [list them]
Multi-step flows where in-progress data should survive backgrounding: [list them]

Specify: what pauses/resumes on background/foreground transitions, what gets
persisted for cold-start recovery after the app is killed, and how persisted
state gets validated against the server before being trusted (especially for
anything transactional).
```

### Prompt 2 — Lifecycle Review

```
Review this app lifecycle handling code for gaps:

[paste your AppState/lifecycle listener code]

Check for: timers/polling that don't pause on background, missing
sensitive-content protection in the app switcher, blind trust of
restored state without server validation, and whether background
vs killed states are handled distinctly rather than identically.
```

---

## Validating AI Output

- [ ] Timers/polling loops explicitly pause on background and resync on foreground
- [ ] Sensitive screens hide/blur content in the OS app-switcher preview
- [ ] Cold-start state restoration is scoped deliberately (navigation + critical in-progress data), not a blanket full-state dump
- [ ] Restored transactional state (cart, payment, etc.) is re-verified against the backend, not trusted as-is from local storage
- [ ] Notification taps while the app is foregrounded show an in-app prompt instead of forcibly navigating away from the current screen
- [ ] Crash recovery doesn't silently re-enter the exact state that may have caused the crash

---

## What's Next

- **State Management Impl** (next in this phase) implements the actual persistence layer this module relies on for cold-start restoration.
- **Backend Integration** will define how restored transactional state gets re-validated against your API.
- **Testing** (later in this phase) should explicitly include background/foreground/kill simulation — these are exactly the scenarios that don't surface in a normal dev session and need deliberate test coverage.
