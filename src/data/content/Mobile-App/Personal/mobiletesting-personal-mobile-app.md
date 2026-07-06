---
title: Testing
slug: testing
phase: Phase 3
mode: personal
projectType: mobile-app
estimatedTime: 20–30 min
---

# Testing

A full automated test pyramid is rarely the right time investment for a solo personal project. This module is about testing pragmatically — catching real bugs with the least effort, and specifically testing the scenarios you're most likely to have skipped while building (offline, permissions, lifecycle).

---

## Decision 1: What Level of Testing Actually Fits

> **Decision Card**
> For a personal project, prioritize in this order:
> 1. **Manual testing of the critical path**, on real devices, both platforms
> 2. **Unit tests for pure business logic** (calculations, date handling, anything with real branching logic) — cheap to write, catch real bugs
> 3. **Automated UI/component tests** — lowest priority for a fast-moving solo project; the cost of writing and maintaining them often exceeds the bugs they'd catch at this stage

> [!TIP]
> Don't feel obligated to build a comprehensive automated test suite for a personal project. A disciplined manual testing pass on real devices, combined with a handful of unit tests for your trickiest logic, catches the large majority of real bugs for an app this size.

---

## Decision 2: What's Actually Worth Unit Testing

- [ ] Any function with non-trivial logic or branching (date calculations, data transformations, validation rules)
- [ ] Anything you've already had to debug once — if a bug happened once, it's worth a test to make sure it doesn't silently come back

Skip unit-testing simple UI components or straightforward pass-through functions — the ratio of effort to bug-catching value is poor for a personal project's time budget.

---

## Decision 3: Test the Unhappy Paths Specifically

> [!WARNING]
> The scenarios most likely to be under-tested are exactly the ones covered in earlier modules — because they require deliberate effort to trigger, unlike the happy path you naturally exercise while building. Specifically test:

- [ ] **Offline behavior** — turn on airplane mode mid-use and confirm the app degrades gracefully (Offline Strategy)
- [ ] **Permission denial** — deny camera/location/notifications and confirm the rest of the app still works (App Permissions Strategy)
- [ ] **App lifecycle** — force-quit and relaunch via a deep link; background the app for several minutes and return (App Lifecycle)
- [ ] **Expired/invalid session** — confirm the app handles this cleanly rather than crashing or hanging (Authentication)

---

## Decision 4: End-to-End Testing (Optional, Advanced)

Tools like Maestro or Detox can automate full user flows across both platforms. For a personal project, this is worth adopting only if:

- You're iterating on the same critical flow repeatedly and manual re-testing is becoming a real time cost, or
- You specifically want to learn E2E testing as part of the project

Otherwise, a disciplined manual checklist covers most of the same ground with far less setup investment.

---

## Decision 5: Get a Few Real Users Before "Beta Testing" Officially Starts

> [!TIP]
> Even a quick, informal round with 2-3 friends or family members via TestFlight (iOS) or an internal testing track (Android) — before the formal Beta Testing phase later — tends to surface real usability issues and device-specific bugs faster than any amount of solo testing. People use apps differently than their builder does.

---

## Common Mistakes (Including AI's)

- **Skips testing entirely** because "it's just a personal project," then ships something broken on a device or OS version that wasn't tested.
- **Writes extensive automated tests for simple UI components** instead of focusing limited time on business logic and manual critical-path testing — low return on the time invested.
- **Never deliberately tests the unhappy paths** — offline, permission denial, lifecycle transitions, expired sessions — these don't get exercised naturally during normal development and need deliberate testing.
- **Tests only on the simulator/emulator** and skips real-device testing entirely, missing platform-specific quirks (especially push notifications and permissions).

---

## AI Prompt: Build a Pragmatic Test Plan

```
I'm finishing Phase 3 development of a personal mobile app using [your stack].

Generate a pragmatic test plan, prioritized for a solo developer's limited time:
1. A manual critical-path checklist covering: [list your core user flows]
2. Specifically include test steps for: offline behavior, permission denial, app backgrounding/force-quit + relaunch via deep link, and expired session handling
3. A short list of functions in my codebase that are good candidates for unit tests (non-trivial logic only) — name them if you can infer from [describe your core logic/features]
4. Confirm I should test on real devices for push notifications and permissions, not just simulators

Keep this proportional — don't suggest a comprehensive automated test suite for a personal project moving fast.
```

---

## Validate Before You Move On

- [ ] You've manually walked through the full critical path on a real device for both iOS and Android
- [ ] Offline behavior, permission denial, app lifecycle transitions, and expired sessions have all been deliberately tested, not just assumed to work
- [ ] Unit tests exist for your trickiest business logic, not for simple UI components
- [ ] You've had at least one other person (not you) use the app and report what broke

> [!TIP]
> Keep a running list of bugs you find during this pass, however small. Patterns in that list (e.g., "three bugs all related to the offline state") tell you where to focus more attention before moving to Phase 4.

---

**Phase 3 complete.** Next: Phase 4 — Deployment. Time to get this app ready for real users.
