---
title: Beta Testing
slug: beta-testing
phase: Phase 5
mode: production
projectType: mobile-app
estimatedTime: 20–25 min
filename: beta-testing-production-mobile-app.md
---

Your own testing — and even your QA team's — happens on a small set of devices, on a fast connection, by people who already know how the app works. Real users on real devices, real networks, and real unfamiliarity find a completely different category of bugs. Beta testing is your last checkpoint before mistakes become public, store-reviewed, and hard to walk back.

## Why This Matters More Than It Feels Like It Should

- Both stores' formal review processes test functionality, not usability — they won't catch confusing onboarding, unclear value proposition, or a feature nobody understands how to use
- A bug found in beta costs a build iteration; a bug found after full launch costs a public 1-star review wave and a slower fix cycle through store review again
- Beta testers using genuinely diverse devices and OS versions surface device-specific and network-condition bugs your dev team's flagship phones never will

> **Best Practice:** Treat beta testing as a real, scoped phase with goals — not just "let some friends try it" before submitting. What you're validating should be deliberate: functional bugs, usability friction, and performance under real-world conditions.

## TestFlight (iOS) vs. Internal/Closed Testing (Android)

| | iOS (TestFlight) | Android (Play Console tracks) |
|---|---|---|
| Internal tier | Up to 100 testers, your team, instant | Internal testing track, instant, up to 100 |
| External tier | Up to 10,000 testers, lightweight Apple review (~24-48h) | Closed testing (invited groups) or Open testing (public opt-in) |
| Build expiry | 90 days | No expiry |
| Feedback mechanism | Built-in screenshot + comment | Play Console feedback, or your own channel |

Run internal testing with your team first to catch obvious breakage, then move to external/closed testing with real outside users before considering a production submission.

## Recruiting the Right Beta Testers

Random friends-and-family testing under-represents the real diversity of your eventual user base. Aim for a mix:

- [ ] A range of device types — not everyone on the latest flagship; include a mid-tier and older device if possible
- [ ] A range of OS versions, especially your minimum supported version, not just the latest
- [ ] At least some testers genuinely unfamiliar with the product, to catch onboarding and usability friction your team is too close to notice
- [ ] If relevant, testers across different network conditions (not everyone on fast home Wi-Fi)

> **Tip:** Your own team and close contacts already understand the mental model of the app. The most valuable bug reports often come from testers who've never seen it before and get confused by something you assumed was obvious.

## What to Actually Test For

Beta isn't just "does it crash" — structure it around specific categories:

| Category | What to Watch For |
|---|---|
| Functional bugs | Crashes, broken flows, incorrect data |
| Usability friction | Where testers get confused, stuck, or give up |
| Performance | Slow screens, janky scrolling, battery drain — especially on older devices |
| Edge cases | Offline behavior, permission denials, backgrounding (callbacks to the Testing module's mobile-specific scenarios) |
| Onboarding clarity | Whether new users understand the core value within the first session |

## Structuring Feedback Collection

Unstructured feedback ("let me know what you think!") produces noisy, hard-to-act-on responses. Give testers a light structure:

- A short, specific list of flows to try ("create an account," "complete the core action," "try it with airplane mode on")
- A simple way to report bugs with enough context (device, OS version, steps to reproduce) — TestFlight's built-in screenshot annotation helps here on iOS
- A lightweight survey at the end covering clarity, friction points, and overall impression — keep it short enough that people actually complete it

## Triage and Iteration

Not every piece of beta feedback warrants a code change before launch — triage deliberately:

- **Fix before launch**: Crashes, broken core flows, data loss bugs, anything affecting the primary value proposition
- **Fix soon after launch**: Minor UX friction, edge-case bugs in secondary features, polish issues
- **Backlog**: Feature requests, nice-to-haves, opinions on design choices that don't indicate an actual problem

> **Warning:** Don't let beta feedback turn into endless scope creep. The goal is validating what you built works well, not redesigning the app based on every tester's personal preference. Distinguish "this is broken/confusing" from "I would have built it differently."

## How Long to Run Beta

There's no universal answer, but a useful floor: long enough to capture at least one full realistic usage cycle (e.g., if your app has weekly habits, run beta at least a week or two) and enough device/OS diversity in your tester pool to feel confident, rather than a fixed arbitrary number of days.

## Using AI Here

```
Help me design a beta testing plan for this app before production launch.

App core function: [one sentence]
Key flows to validate: [list 3-5 critical flows]
Known risk areas: [e.g., new payment flow, offline sync, first release on this platform]
Available tester pool: [team only / team + friends / can recruit externally]

Suggest:
- A structured list of test scenarios covering functional, usability, and edge-case testing
- A simple feedback collection format testers will actually complete
- Criteria for what should block launch vs. what can ship as a fast-follow fix
```

> **Validation:** Use AI to help structure the testing plan and triage framework, but the actual bug reports and usability signal have to come from real human testers — there's no substitute for genuine outside users interacting with the app.

## Common Mistakes

- Skipping external beta testing entirely and going straight from internal QA to production
- Recruiting only close friends/team who already understand the product, missing real onboarding friction
- Unstructured feedback collection that produces noise instead of actionable bug reports
- Treating every piece of feedback as launch-blocking, causing scope creep and delay
- Testing only on flagship devices and fast networks, missing real-world conditions
- Running beta too briefly to surface issues that only appear after repeated/extended use

## Before You Move On

- [ ] Internal testing completed and obvious issues fixed before moving to external testers
- [ ] External beta pool includes device, OS version, and familiarity diversity — not just close contacts
- [ ] Feedback collection is structured enough to produce actionable reports
- [ ] Critical bugs and broken core flows are triaged and fixed before considering production submission
- [ ] Beta ran long enough to cover at least one realistic full usage cycle

Next: **Release Checklist** — the final verification pass before you actually submit to both stores.
