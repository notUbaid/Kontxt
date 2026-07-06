---
title: Offline Strategy
slug: offline-strategy
phase: Phase 2
mode: personal
projectType: mobile-app
estimatedTime: 20–30 min
---

# Offline Strategy

"Offline support" can mean anything from "don't crash when there's no signal" to "fully functional with a local database and background sync." These are wildly different amounts of engineering work. Most personal apps need the first, not the second — this module helps you decide which one your app actually needs.

---

## Decision 1: How Much Offline Support Do You Actually Need?

> **Decision Card**
> | Level | What it means | Effort |
> |---|---|---|
> | Graceful degradation | Show cached/last-known data when offline, clear "you're offline" indicator, block new writes with a clear message | Low — a few hours of deliberate handling |
> | Full offline-first | Local database is the source of truth; writes happen locally instantly and sync to the server later, with conflict resolution | High — a genuine architectural undertaking |

>  **Best Practice**
> Default to **graceful degradation** unless your app's core value proposition specifically requires working fully offline (a journaling app, a note-taking app used on flights/in the field). Full offline-first with sync and conflict resolution is a substantial engineering project on its own — don't take it on for a personal app unless the use case genuinely demands it.

---

## Decision 2: Detect Network State

Use your framework's network info library (e.g., `@react-native-community/netinfo`) to know when the device is offline, rather than only discovering it when a request fails. This lets you show a deliberate offline indicator instead of a request just hanging or erroring unexpectedly.

- [ ] App detects connectivity changes and reflects them in the UI (a small banner or indicator is enough)
- [ ] Screens don't show an indefinite loading spinner when there's simply no connection — show a clear "you're offline" state instead

---

## Decision 3: Caching Reads

> [!TIP]
> Even without building full offline-first architecture, your data-fetching layer (TanStack Query, or your BaaS client's cache) likely already keeps the last successfully fetched data in memory. Make sure your screens show that cached data when offline instead of a blank/error screen — this alone covers a large share of what users actually expect from "offline support" for most apps.

---

## Decision 4: Handling Writes While Offline

> **Decision Card**
- **Block writes with clear messaging** ("You're offline — this will be available once you're back online") — the simpler, recommended default for most personal apps
- **Queue writes and sync later** — only take this on if your core use case specifically requires it (e.g., users frequently use the app with no connectivity and need to keep working)

> [!WARNING]
> Queuing writes for later sync introduces real complexity: what happens if the same record was edited elsewhere in the meantime (conflict resolution), what happens if a queued write eventually fails validation, how do you show the user their write is "pending" vs "confirmed." Don't take this on as an afterthought — it's a deliberate architectural decision, not a small feature.

---

## Decision 5: If Your App Genuinely Needs Offline-First

If your core use case truly requires full offline functionality, plan for it deliberately rather than retrofitting:

- **Local-first libraries** (WatermelonDB, op-sqlite, PowerSync) provide a local SQLite database as your source of truth with built-in sync to your backend — this is the right category of tool if you're going this route, rather than building a custom sync engine yourself
- Decide your conflict resolution strategy upfront (e.g., last-write-wins is simplest and often good enough for a personal app)

---

## Decision 6: Never Let a Write Silently Fail

> [!WARNING]
> Whatever level of offline support you choose, never let a user submit something and have it silently disappear because the device was offline. At minimum, detect the offline state before attempting the write and tell the user clearly — silent failure is worse than no offline handling at all, because it erodes trust in the app.

---

## Common Mistakes (Including AI's)

- **Builds a full sync engine** for an app that doesn't actually need offline writes — confirm your app's real use case before taking this on.
- **No offline indicator at all** — users left guessing why something isn't loading or submitting.
- **Assumes network is always available**, leading to indefinite spinners or unhandled errors when it isn't — always handle the "no connection" case explicitly, not just slow/failed requests.
- **Silently drops a write attempted while offline** with no feedback to the user.

---

## AI Prompt: Implement Offline Handling

```
Implement offline handling for a personal mobile app using [React Native/Expo + your BaaS choice].

Scope: graceful degradation, not full offline-first (state explicitly if your app needs full offline-first instead, and why).

Requirements:
- Detect connectivity changes using NetInfo (or equivalent) and show a clear offline indicator in the UI
- Screens show last-cached data when offline instead of a blank or indefinitely-loading state
- Attempting to submit/write while offline shows a clear message and does not silently fail or appear to succeed
- [If full offline-first is genuinely needed]: recommend a local-first library (e.g., WatermelonDB, PowerSync) and a simple last-write-wins conflict resolution strategy

Keep this proportional to a personal project — don't build a custom sync engine unless I've confirmed that's actually needed.
```

---

## Validate Before You Move On

- [ ] You've deliberately chosen graceful degradation or full offline-first — not defaulted into complexity you don't need, or simplicity that doesn't fit your actual use case
- [ ] The app detects and displays connectivity state, rather than just failing unexpectedly
- [ ] Cached data displays when offline instead of a blank screen
- [ ] Writes attempted while offline never silently fail — the user always gets clear feedback
- [ ] If you chose full offline-first, you've picked a real local-first tool rather than building a custom sync engine from scratch

> [!TIP]
> Turn on airplane mode and actually use your app for five minutes before considering this done. It's the fastest way to discover every spot where you assumed connectivity without realizing it.

---

**Phase 2 complete.** Next: Phase 3 — Development. Time to build the app.
