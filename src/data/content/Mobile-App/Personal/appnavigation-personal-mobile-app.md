---
title: App Navigation
slug: app-navigation
phase: Phase 1
mode: personal
projectType: mobile-app
estimatedTime: 20–30 min
---

# App Navigation

Navigation structure for a mobile app is roughly the equivalent of Information Architecture for a web app — except mobile navigation has its own patterns (tabs, stacks, modals) and its own easy-to-miss requirement: deep linking, which you'll likely need even for a simple personal app the moment you add email verification or password reset.

---

## Decision 1: Navigation Library

| Option | Best for |
|---|---|
| Expo Router (React Native + Expo) | File-based routing, simplest mental model, good default for new Expo projects |
| React Navigation | More configuration control, the long-standing standard for React Native |
| go_router (Flutter) | Declarative routing for Flutter, similar philosophy to Expo Router |

> [!TIP]
> For a personal project on Expo, **Expo Router** is the easiest starting point — your file structure directly defines your navigation structure, which means less boilerplate and less to keep in sync manually.

---

## Decision 2: Navigation Pattern

| Pattern | Use when |
|---|---|
| Tab-based (bottom tabs) | App has 3-5 top-level sections users move between frequently — the most common mobile pattern |
| Stack-based only (no tabs) | Simple, linear apps with one main flow and occasional drill-down screens |
| Drawer | Many sections, or secondary/infrequently-used items that don't need to be one tap away |

> **Decision Card**
> Most personal apps fit a **tab bar with 3-5 items, each containing its own stack** (so navigating deeper within a tab doesn't lose your place in the others). This is the pattern users already intuitively understand from nearly every popular app — don't invent a custom navigation paradigm for a personal project; familiarity reduces the work you have to do explaining your own UI.

---

## Decision 3: Nested Navigators

If you're using tabs, each tab typically needs its own stack navigator nested inside it — this lets a user drill into a detail screen within one tab without affecting the other tabs' navigation state.

```
Tab Navigator
 ├─ Home Tab → Stack (Home List → Detail)
 ├─ Settings Tab → Stack (Settings → Profile → Edit Profile)
 └─ ...
```

> [!WARNING]
> Don't over-nest navigators for a simple app. If a tab only ever shows one screen with no drill-down, it doesn't need its own stack navigator — add nesting only where there's an actual need for it (a list-to-detail flow, a multi-step settings drill-down).

---

## Decision 4: Deep Linking

> [!WARNING]
> **You almost certainly need deep linking even for a simple personal app**, the moment you have email verification, password reset, or any flow where a link in an email needs to open a specific screen inside your app. This is easy to forget during initial navigation planning and annoying to retrofit once your navigation structure already exists — decide your URL scheme now.

- [ ] Define a custom URL scheme (e.g., `yourapp://`) or universal/app links if you want links to also work as web fallbacks
- [ ] Map at minimum: email verification confirmation, password reset, and any "share this item" links to specific in-app screens

---

## Decision 5: Back Behavior Consistency

Tie this back to your Platform Guidelines decision: Android's back button/gesture should always navigate backward through your stack predictably. Verify this explicitly once your navigation structure exists — it's one of the few platform behaviors worth checking carefully even in a simple, low-investment app.

---

## Decision 6: Modals vs. Full Screens

Decide a consistent rule rather than choosing ad-hoc per feature:

- **Modal** — short, focused tasks that interrupt the current flow (confirm a destructive action, quick create form) and return to where the user was
- **Full screen navigation** — anything that's part of the user's main flow through the app, not an interruption of it

---

## Common Mistakes (Including AI's)

- **Skips deep linking entirely** until an auth flow breaks because a password reset email has nowhere to send the user — plan this from the start, even minimally.
- **Over-nests navigators** for an app simple enough not to need them — add nesting only where a drill-down flow actually exists.
- **Inconsistent modal-vs-screen decisions** across similar interactions — pick one rule and apply it consistently.
- **Doesn't verify Android back behavior** explicitly — confirm it once real screens exist, don't assume the framework default is automatically correct for your specific navigation structure.

---

## AI Prompt: Set Up Navigation Structure

```
Set up navigation for a personal mobile app using [Expo Router / React Navigation / go_router].

Screens/sections: [list your core sections, e.g., Home, Activity, Settings]
Pattern: bottom tab bar with [N] tabs, each with its own stack for drill-down screens where needed.

Also set up deep linking for:
- Email verification confirmation → [target screen]
- Password reset → [target screen]
- [Any share/invite links, if applicable]

Use a custom URL scheme: [yourapp://]. Confirm Android back button/gesture behavior works correctly within each tab's stack. Don't add nested stack navigators for tabs that don't have any drill-down screens.
```

---

## Validate Before You Move On

- [ ] Navigation pattern matches your app's actual structure (tabs/stack/drawer), not an unnecessarily complex default
- [ ] Nested navigators exist only where a real drill-down flow needs them
- [ ] Deep linking is set up for at minimum email verification and password reset
- [ ] Android back button/gesture behavior has been tested and works predictably
- [ ] Modal vs. full-screen navigation follows one consistent rule across the app

> [!TIP]
> Test your deep links manually before you need them in a real email — most frameworks let you trigger a deep link directly from a terminal command or simulator, which is much faster than sending yourself real password reset emails to verify the flow.

---

**Phase 1 complete.** Next: Phase 2 — Architecture. Time to decide the technical foundation.
