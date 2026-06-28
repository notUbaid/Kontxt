---
title: Performance Optimization
slug: performance-optimization
phase: Phase 4
mode: personal
projectType: mobile-app
estimatedTime: 20–30 min
---

# Performance Optimization

The device you've been developing on is almost certainly faster than the average device your real users will have. This module is a pragmatic pass to catch the performance issues that are invisible on your dev setup but obvious on a mid-tier phone — before real users find them for you.

---

## Decision 1: Test on a Real, Non-Flagship Device

> [!WARNING]
> **Simulators and your personal development phone are not representative of your average user's hardware.** A simulator runs on your powerful host computer's resources, and your own phone is likely newer/faster than typical. If at all possible, test on an actual older or budget-tier device before launch — this single step catches more real performance problems than any amount of simulator profiling.

---

## Decision 2: App Startup Time

- [ ] Measure cold start time — how long from tap to usable screen
- [ ] Defer non-essential initialization (analytics setup, non-critical data prefetching) until after the first screen is interactive, rather than blocking startup on it
- [ ] Confirm any synchronous storage reads on startup are actually necessary — unnecessary blocking reads at launch are a common, fixable source of slow startup

---

## Decision 3: Bundle Size

> [!TIP]
> Check your app's actual bundle/binary size and look for the obvious culprits: unused dependencies still imported somewhere, large unoptimized images bundled as assets rather than loaded remotely, and (for React Native) confirm the Hermes JavaScript engine is enabled — it meaningfully improves startup time and reduces memory usage compared to the default engine, and is usually a straightforward configuration change if not already on.

---

## Decision 4: List & Scroll Performance

Revisit the virtualized list decision from Frontend — confirm it's actually working as intended:

- [ ] Scrolling through your longest realistic list feels smooth on the real device you tested in Decision 1, not just in the simulator
- [ ] List item components are kept lightweight — avoid expensive computation or large images directly inline in a frequently-rendered list item without memoization

---

## Decision 5: Memory Leaks

> [!WARNING]
> **Uncleaned listeners and subscriptions are the most common source of memory leaks** in React-based mobile apps — a `useEffect` that sets up a listener, subscription, or timer but doesn't return a cleanup function leaves it running even after the component unmounts. Over time (especially on a long session navigating in and out of the same screen repeatedly), this degrades performance and can eventually crash the app. Review every effect that subscribes to something and confirm it's cleaned up.

---

## Decision 6: Network Efficiency

- [ ] Avoid redundant requests — confirm your caching layer (from State Management) is actually preventing duplicate fetches for data you already have
- [ ] Images are sized appropriately for their actual display size on the device, not downloaded at full original resolution (echoing Frontend's image guidance, worth re-checking here)

---

## Decision 7: Battery Usage

Revisit any background work decisions from App Lifecycle: confirm you're not polling, tracking location, or running timers more aggressively than the feature actually requires. Unnecessary battery drain is a common reason users uninstall an otherwise-fine app.

---

## Decision 8: Use Built-In Profiling Tools

Use your framework's profiler (React Native's Performance Monitor, Flipper, or Flutter DevTools) to spot obvious red flags — excessive re-renders, slow frame rates during specific interactions — rather than guessing where the problem is.

---

## Common Mistakes (Including AI's)

- **Never tests on a real, non-flagship device** — relies entirely on simulator performance, which can hide real-world issues.
- **Leaves listeners/subscriptions uncleaned** in effects — review every `useEffect` (or equivalent) that subscribes to something for a matching cleanup.
- **Ships large, unoptimized images** bundled directly into the app — re-check this specifically before launch, not just during initial development.
- **Doesn't defer non-essential startup work** — analytics initialization, prefetching, and similar work block the first interactive screen unnecessarily.
- **Doesn't profile at all**, relying on subjective "it feels fine to me" judgment instead of using available profiling tools.

---

## AI Prompt: Run a Performance Review Pass

```
I'm preparing to launch a personal mobile app using [your stack]. Run a performance review pass on my codebase.

Check for:
1. Any useEffect (or equivalent) that sets up a listener, subscription, or timer without a corresponding cleanup function
2. Any synchronous or blocking work happening during app startup that could be deferred until after the first screen renders
3. Whether Hermes is enabled (if React Native) and any obvious bundle size red flags (large unused dependencies, unoptimized bundled images)
4. List components rendering expensive computation or large images inline without memoization

For each issue found, explain the real-world impact (e.g., "this will cause a memory leak after repeated navigation to this screen") and suggest the fix.
```

---

## Validate Before You Move On

- [ ] You've tested the app on a real, non-flagship device, not just a simulator or your own newer phone
- [ ] Cold start time is reasonable, with non-essential work deferred past the first interactive screen
- [ ] No uncleaned listeners/subscriptions remain in your effects
- [ ] Hermes is enabled (React Native) and bundle size has been checked for obvious bloat
- [ ] Your longest realistic list scrolls smoothly on the real device tested
- [ ] Background work (if any) is proportional to actual feature needs, not draining battery unnecessarily

> [!TIP]
> If you only have time for one performance check before launch, make it the real-device test — it surfaces more real issues per minute spent than any other single step in this module.

---

**Next:** Play Store Setup — prepare your app for Android's review and release process.
