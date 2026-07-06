---
title: Feature Flags
slug: feature-flags
phase: Phase 4
mode: production
projectType: mobile-app
estimatedTime: 15–20 min
filename: feature-flags-production-mobile-app.md
---

On the web, shipping a fix means deploying. On mobile, shipping a fix means a build, a store review (hours to days), and waiting for users to actually update — some never will. Feature flags are how production mobile teams decouple "code is in the build" from "feature is live," turning a multi-day release cycle into a server-side toggle.

## Why This Matters More on Mobile

- A broken feature can't be instantly rolled back the way a web deploy can — you're stuck with it until users update
- App Store/Play Store review adds 1–3 days minimum before any code fix reaches users, longer if rejected
- A meaningful share of your install base lags behind the latest version by weeks or months
- Flags let you ship code dark (merged but inactive) ahead of a release, then activate it server-side once you're confident — no second store submission required

> **Best Practice:** Any feature with real risk — new payment flow, major UI change, anything touching auth — should ship behind a flag, not as part of a binary "all users get it on update" release.

## What Belongs Behind a Flag (and What Doesn't)

| Use a Flag For | Skip the Flag For |
|---|---|
| New, risky, or experimental features | Critical bug fixes (those need to ship to everyone) |
| Gradual rollouts (5% → 25% → 100%) | Tiny copy/UI tweaks with no real risk |
| A/B tests on conversion-critical flows | Security patches (roll out fast, fully) |
| Kill switches for third-party integrations | Internal-only debug tooling (use build configs instead) |

> **Warning:** Don't let flag count grow unbounded. Every flag is a branch in your code and a combination your QA has to consider. Set an expiry or review date on every flag when you create it — remove it once the feature is fully rolled out or fully killed.

## Core Patterns You'll Actually Use

**Kill switch** — the most important pattern for mobile specifically. Wrap any feature with an external dependency (payment provider, third-party SDK, AI API) in a flag you can flip off instantly if that dependency starts failing, without needing a new app release.

**Percentage rollout** — release to 5% of users, watch error rates and key metrics, then ramp to 25%, 50%, 100%. Catches problems while the blast radius is small.

**Kill switch + percentage rollout together** is the standard production pattern: ship new code dark, roll out gradually, and have an instant off switch the whole time.

**User targeting** — enable a feature for specific segments (beta testers, a specific app version, a specific region) without separate builds.

## Build vs. Buy

| Approach | Pros | Cons | Good For |
|---|---|---|---|
| Managed (LaunchDarkly, PostHog, Statsig) | Targeting rules, analytics, gradual rollout UI built in | Cost, another vendor dependency | Most production apps |
| Self-rolled (config table + API) | Free, full control | You build targeting/rollout logic yourself | Simple kill-switch needs, tight budgets |
| Remote Config (Firebase) | Free tier, simple, already in many mobile stacks | Weaker targeting/experimentation than dedicated tools | Apps already on Firebase |

For a solo or small team already in this stack, PostHog (which you're likely already using for analytics) covers feature flags too — avoiding a second vendor for a closely related capability.

## Implementation Shape

A minimal flag system needs three things regardless of which tool you pick:

1. **A source of truth** the client fetches on launch (and periodically refreshes) — not hardcoded at build time
2. **Evaluation logic** that's fast and fails safe — if the flag service is unreachable, default to the safer behavior (usually: feature off)
3. **A way to target** by user ID, app version, or percentage, so you're not limited to all-or-nothing

```
Fetch flags on app launch → cache locally with short TTL →
evaluate per-feature → fail closed if fetch fails →
re-fetch periodically / on foreground
```

> **Tip:** Never let an unreachable flag service crash the app or block startup. Cache the last known flag state locally and use it if the network call fails — fail toward the safer default, not toward a hang.

## Using AI to Implement This

```
Help me implement feature flags for this [feature].

Stack: [React Native / Flutter / native] + [flag provider or self-rolled]
Feature: [what it does, why it carries risk]
Rollout plan: [e.g., "5% → 25% → 100% over 2 weeks, kill switch always available"]

Requirements:
- Fail safe (default off) if the flag service is unreachable
- Cache flag state locally with a short TTL
- Keep the flag check isolated so it's trivial to remove later
- Flag the feature by user ID and app version, not just globally on/off
```

> **Validation:** Check that AI-generated flag code actually fails closed. A common mistake is code that throws or defaults to "on" when the flag fetch fails — exactly backwards for a kill switch.

## Common Mistakes

- Hardcoding flag values at build time, defeating the entire point (no server-side control)
- No fail-safe default — an unreachable flag service crashes the app or enables risky features by accident
- Never cleaning up flags after a feature is fully shipped or fully killed, leaving dead code paths
- Skipping a flag on a payment or auth change because "it's a small change" — these are exactly the changes that need a kill switch
- Treating feature flags as a substitute for testing rather than a safety net alongside it

## Before You Move On

- [ ] Risky or third-party-dependent features have a kill switch
- [ ] Flag state is fetched at runtime, not hardcoded at build time
- [ ] Flag evaluation fails safe (off) if the service is unreachable
- [ ] There's a plan to remove flags once features fully roll out
- [ ] At least one flag-gated feature has been tested with the flag both on and off

Next: **Observability** — knowing what's actually happening in production before your users have to tell you.
