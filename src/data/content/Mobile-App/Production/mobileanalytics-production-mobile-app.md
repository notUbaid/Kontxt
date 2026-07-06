---
title: Analytics
slug: analytics
phase: Phase 6
mode: production
projectType: mobile-app
estimatedTime: 20–30 min
filename: analytics-production-mobile-app.md
---

Your app is live. Now the questions change — not "does it work" but "are people actually using it, where do they get stuck, and what should you build next." Analytics is how you replace guessing with evidence, and it's the foundation every other module in this phase depends on.

## Analytics vs. Observability: Different Questions

You already set up crash reporting and performance monitoring in Phase 4 — that's observability, answering "is the app healthy?" Analytics answers a different question: "what are users actually doing, and is the product working for them?"

| | Observability | Analytics |
|---|---|---|
| Question | Is the app broken? | Is the product working? |
| Example data | Crash rate, API latency | Feature usage, funnel completion, retention |
| Audience | Engineering | Product, growth, engineering |

You need both, and they often live in different tools (Sentry for observability, PostHog/Amplitude/Mixpanel for analytics) even though some platforms blend the two.

## What to Actually Track

Tracking everything produces noise nobody acts on. Start with a deliberate, small event taxonomy tied to decisions you'll actually make:

- **Acquisition** — install source, first-open, signup completion
- **Activation** — did the user reach their first meaningful "aha" moment (first core action completed)
- **Engagement** — core feature usage, session frequency, session length
- **Retention** — do users come back on day 1, day 7, day 30
- **Revenue** (if applicable) — trial starts, conversions, churn

> **Best Practice:** Define your activation event explicitly before building dashboards — the single action that best predicts a user will stick around (e.g., "created a project," "completed first workout," "sent first message"). Most of your early growth work centers on getting more users to that one event.

## Mobile-Specific Tracking Considerations

- **Session definition differs from web** — mobile sessions are interrupted by backgrounding, app switching, and notifications constantly; use your analytics tool's mobile-aware session logic rather than a naive "time since last event" calculation
- **Attribution is harder** — install attribution (which channel drove a download) requires deep linking and attribution SDKs (AppsFlyer, Adjust, or platform-native tools), not just a UTM parameter like on web
- **Privacy framework constraints** — iOS's App Tracking Transparency (covered in App Store Setup) significantly limits cross-app attribution data when users decline, which is common; design your analytics strategy assuming a meaningful chunk of attribution data will be unavailable
- **Offline event buffering** — if your app supports offline use, events need to queue locally and sync when connectivity returns, or you'll silently lose data for your most engaged offline-heavy users

## Funnel Analysis

Funnels reveal where users drop off between meaningful steps — this is usually more actionable than aggregate metrics alone.

```
Install → First Open → Signup Started → Signup Completed →
Onboarding Completed → First Core Action → [Activation]
```

- [ ] Map your actual core funnel from install to activation
- [ ] Track completion rate at each step, not just the final conversion number
- [ ] The step with the steepest drop-off is usually your highest-leverage place to investigate and fix, ahead of acquiring more top-of-funnel users

> **Tip:** A common mistake is pouring marketing budget into acquisition while a 40% drop-off in onboarding goes unaddressed. Fixing the leak is almost always cheaper than buying more users to pour into it.

## Retention Curves

Retention is the single best predictor of whether you have a sustainable product, more so than raw download counts.

| Pattern | What It Suggests |
|---|---|
| Steep early drop, then flattens | Normal — find where it flattens, that's your "core" retained user base |
| Continues declining toward zero | Product isn't delivering lasting value, even if early engagement looks fine |
| Flattens quickly at a healthy level | Strong product-market fit signal |

Look at retention by cohort (users who installed in the same week/month) rather than just an aggregate "how many users are active today" number — cohort retention reveals whether your product is getting better or worse at keeping new users over time.

## Choosing a Tool

| Tool | Strengths |
|---|---|
| PostHog | Open-source option, combines analytics + feature flags + session replay, generous self-hosted/free tier |
| Amplitude | Strong cohort/retention analysis, mature mobile SDKs |
| Mixpanel | Strong funnel analysis, widely used, solid mobile support |
| Firebase Analytics | Free, integrates tightly if already on Firebase, less powerful for advanced cohort analysis |

If you're already using PostHog for feature flags (from the Feature Flags module), keeping analytics in the same tool avoids fragmenting user behavior data across multiple platforms that don't talk to each other.

## Privacy-Respecting Analytics

Analytics data is still personal data under most privacy frameworks — this connects directly back to your Privacy Policy and Data Safety/Privacy Label declarations.

- [ ] Don't track PII unnecessarily — most behavioral analysis needs event names and properties, not names/emails attached to every event
- [ ] Honor ATT/tracking consent choices — if a user declines tracking on iOS, respect that for cross-app attribution even if your first-party in-app analytics can still function
- [ ] Anonymize or pseudonymize user identifiers where the analysis doesn't require true identity
- [ ] Make sure analytics SDK data collection is reflected in your privacy policy and store declarations, not just your own first-party tracking

## Using AI Here

```
Help me design an analytics event taxonomy for this app.

App core function: [one sentence]
Key user actions: [list 5-8 things users do in the app]
Suspected activation event: [your best guess at the "aha moment" action]
Business model: [free / subscription / one-time purchase / ad-supported]

Suggest:
- A minimal, decision-oriented event taxonomy (not exhaustive tracking of everything)
- A proposed activation event definition and how to validate it's the right one
- The core funnel from install to activation
- What NOT to track, to avoid noise that won't drive decisions
```

> **Validation:** Validate any suggested activation event against actual retention data once you have it — confirm that users who complete that event really do retain better than users who don't. An untested assumption about what "activation" means can misdirect months of product effort.

## Common Mistakes

- Tracking everything with no clear taxonomy, producing dashboards nobody actually uses
- No defined activation event, making it impossible to focus onboarding improvements
- Looking at aggregate "daily active users" instead of cohort retention, missing whether the product is actually improving
- Ignoring funnel drop-off in favor of only optimizing top-of-funnel acquisition
- Analytics SDK data collection not reflected in privacy policy/store declarations
- Treating ATT decline as "no analytics possible" instead of designing first-party analytics that work regardless

## Before You Move On

- [ ] A minimal, deliberate event taxonomy is implemented, tied to actual product decisions
- [ ] Activation event is explicitly defined and validated against retention data
- [ ] Core funnel from install to activation is tracked with completion rate at each step
- [ ] Retention is analyzed by cohort, not just aggregate daily/monthly active users
- [ ] Analytics data collection is accurately reflected in privacy policy and store declarations

Next: **Retention** — going deeper on the metric that matters most for long-term product health.
