---
title: App Lifecycle
slug: app-lifecycle
phase: Phase 3
mode: personal
projectType: mobile-app
estimatedTime: 20–30 min
---

# App Lifecycle

Unlike a web app, a mobile app doesn't just live in one tab until the user closes it. The OS can background it, suspend it, or kill it entirely without warning — and your app needs to behave correctly across all of those transitions, not just while it's actively open and visible.

---

## Decision 1: Understand the States

> **Decision Card — App Lifecycle States**
- **Foreground/Active** — app is open and visible, the state you've been building and testing in
- **Background** — app isn't visible but hasn't been terminated (user switched apps, didn't close yours)
- **Killed/Terminated** — the OS has fully removed the app from memory (can happen any time it's backgrounded, especially under memory pressure — there's no guaranteed warning)

The exact terminology and triggers differ slightly between iOS and Android, but the core implication is the same: **assume your app can be killed at any moment it's not in the foreground**, and design accordingly.

---

## Decision 2: Going to Background

- [ ] Pause anything expensive or unnecessary while backgrounded — timers, animations, polling intervals, location tracking (unless your app specifically needs background location, which has its own platform restrictions and permission requirements)
- [ ] Save any meaningful in-progress state proactively (not just "on app close," since there's no guaranteed close event) — rely on the persistence patterns from State Management rather than assuming in-memory state survives

> [!WARNING]
> Don't assume you'll get a clean "app is closing" event to save state in. The OS can terminate a backgrounded app without notice. Persist anything important as you go (or at minimum, the moment the app backgrounds), not only at a hypothetical clean shutdown.

---

## Decision 3: Returning to Foreground

>  **Best Practice**
> Refresh data when the app returns to the foreground, especially if it's been backgrounded for more than a few minutes. A user could have been away for hours — showing stale data from before they left is a common, easily-fixed source of "this app feels buggy" complaints.

- [ ] Server data refetches (or at minimum, revalidates) on foreground return
- [ ] Auth session validity is re-checked if enough time has passed that a token could have expired
- [ ] Any relevant permissions (location, notifications) are re-checked if the user could have changed them in OS settings while the app was backgrounded

---

## Decision 4: Cold Start vs. Warm Start

These are genuinely different code paths, and deep linking is the place this most often goes wrong:

| Scenario | What happens |
|---|---|
| Cold start (app wasn't running, opened via deep link) | Your app needs to fully initialize, then navigate to the linked screen once ready — not before |
| Warm start (app was backgrounded, opened/foregrounded via deep link) | Navigation can happen immediately since the app is already initialized |

> [!WARNING]
> A common bug: deep linking works fine when the app is already running (warm start) but silently fails or navigates to the wrong screen on a cold start, because the navigation attempt happens before the app has finished initializing. Test both scenarios explicitly — they are not the same code path, even though it's tempting to assume they are.

---

## Decision 5: Background Tasks — Only If Genuinely Needed

> [!WARNING]
> Background fetch, background location, and similar capabilities are heavily restricted by both platforms (battery impact, user trust, OS-level throttling) and require explicit justification in app store review for some categories. Don't add background processing "just in case" — only implement it if a specific core feature genuinely requires data to update while the app isn't open, and be deliberate about how much battery/data it actually costs the user.

---

## Common Mistakes (Including AI's)

- **Assumes in-memory state survives indefinitely** — doesn't account for the app being killed while backgrounded; always tie meaningful state to your actual persistence layer.
- **Doesn't refresh data on foreground return** — users see stale information after switching back to the app.
- **Treats cold-start and warm-start deep linking as the same code path** — test both separately; this is the most common deep-linking bug in practice.
- **Adds background tasks without a concrete need** — unnecessary battery drain and added complexity for a feature that wasn't actually required.

---

## AI Prompt: Handle Lifecycle Transitions

```
Implement app lifecycle handling for a personal mobile app using [React Native/Expo].

Requirements:
- On backgrounding: pause [list anything expensive — timers, polling, animations] and ensure [specific important state] is already persisted, not relying on a clean shutdown event
- On returning to foreground: refetch/revalidate [list your server data] and re-check auth session validity if more than [X minutes] have passed
- Handle deep linking correctly for BOTH cold start (app not running) and warm start (app backgrounded) — show me both code paths explicitly, since they behave differently
- Do not add any background fetch/background location unless I've explicitly asked for it

Flag anywhere this implementation assumes in-memory state will survive the app being killed while backgrounded.
```

---

## Validate Before You Move On

- [ ] Meaningful state is persisted proactively, not only on an assumed clean shutdown
- [ ] Data refreshes (or revalidates) when the app returns to foreground after being backgrounded for a while
- [ ] Deep links are tested and work correctly on both cold start and warm start
- [ ] No background processing exists unless a specific feature genuinely requires it
- [ ] You've tested by actually backgrounding the app for several minutes (or force-closing it) and reopening, not just assumed it works

> [!TIP]
> Force-quit your app from the OS app switcher and relaunch it via a deep link — this is the single best test for catching cold-start bugs that "it worked when I was testing" would otherwise hide.

---

**Next:** Backend — implement the server-side logic (or BaaS configuration) this app's screens depend on.
