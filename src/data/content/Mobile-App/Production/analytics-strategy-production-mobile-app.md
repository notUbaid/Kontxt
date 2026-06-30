---
title: Analytics Strategy
slug: analytics-strategy
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 20-30 min
---

# Analytics Strategy

By this point you've designed push notifications, deep links, and file storage. Each of those generates events worth tracking — a notification opened, a link converted, an upload completed. This module decides the system that captures all of it: what you track, where it goes, and how you avoid the two failure modes almost every app falls into — tracking too little to answer real questions, or tracking so much it becomes unusable noise.

---

## Two Categories, Don't Conflate Them

| Category | Answers | Examples | Typical Tools |
|---|---|---|---|
| **Product analytics** | "What are users doing in the app?" | Screen views, button taps, feature usage, funnels | Mixpanel, Amplitude, PostHog |
| **Crash/stability monitoring** | "Is the app breaking?" | Crashes, ANRs, non-fatal errors | Sentry, Crashlytics |

These get bundled into "analytics" casually, but they're architecturally separate concerns with different data models, different retention needs, and often different teams consuming them. Don't pick one tool and force it to do both — product analytics tools handle crash data poorly, and crash tools aren't built for funnel analysis. This module covers product analytics; observability/crash monitoring is its own topic in Phase 4.

---

## Decision 1 — Provider

| Option | Strength | Pricing Shape | Notes |
|---|---|---|---|
| **PostHog** | Open-source, self-hostable, includes session replay + feature flags + analytics in one tool | Generous free tier, then usage-based | Best default if you want one tool instead of three |
| **Amplitude** | Strong cohort/retention analysis, mature enterprise features | Free tier capped on events/month, then steep | Best if deep behavioral analysis is core to your product decisions |
| **Mixpanel** | Strong funnel/event analysis, good mobile SDKs | Similar shape to Amplitude | Comparable to Amplitude; pick based on team familiarity |
| **Firebase Analytics (GA4 for Firebase)** | Free, unlimited, deeply integrated if already on Firebase | Free | Weaker ad-hoc querying; fine as a baseline, often paired with something else for real analysis |

> **Recommendation:** Use **PostHog** as your default for a production mobile app — it consolidates product analytics, session replay, and feature flags (which you'll want eventually anyway) into one SDK and one bill, and self-hosting is a real option if data residency matters. If you're already deep in Firebase for auth/push/storage, Firebase Analytics as a free baseline plus PostHog or Amplitude for deeper analysis is a reasonable combination — just don't rely on Firebase Analytics alone if funnel/retention analysis matters to your product decisions.

---

## Decision 2 — Event Taxonomy

This is the decision that determines whether your analytics are usable a year from now. Get it wrong and you end up with hundreds of inconsistently-named events that nobody trusts.

**Use a consistent naming convention before you write a single tracking call:**

```
object_action format:
  user_signed_up
  product_viewed
  order_completed
  notification_opened
  upload_completed
```

> ⚠️ **Common mistake:** letting event names accumulate organically as features ship — `SignUp`, `user-login`, `ProductView`, `add_to_cart_clicked`. Inconsistent casing and tense makes querying and aggregation painful, and nobody will go back and rename thousands of historical events. Lock the convention in a shared reference doc before Phase 3 implementation starts, and treat it as a contract every contributor (including AI-generated code) must follow.

**Decide your event properties schema alongside the event itself**, not ad hoc per call site:

```
product_viewed: { productId, category, price, source }
order_completed: { orderId, total, itemCount, paymentMethod }
```

Keep a single source-of-truth list of every event name, its properties, and when it fires. This becomes the spec you hand to AI tools instead of letting them invent event names per feature.

---

## Decision 3 — What Actually Gets Tracked

Resist tracking everything. More events isn't more insight — it's more noise to filter through later, and on mobile, excessive event volume has a real battery/bandwidth cost.

Tie tracking to questions you'll actually ask:

| Question You Need Answered | Events to Track |
|---|---|
| Are users completing onboarding? | `onboarding_started`, `onboarding_step_completed` (with step number), `onboarding_completed` |
| Is push notification investment paying off? | `notification_received`, `notification_opened`, then the downstream action it was meant to drive |
| Are users finding core value? | The 1-3 actions that define "activated" for your product specifically — not every button tap |
| Where do users drop off before converting? | Funnel steps for your core conversion flow, explicitly, not inferred from screen views |

> 💡 If you can't articulate what decision an event will inform, don't add it yet. You can always add an event later; you can't retroactively recover data you never captured for events you do end up needing — so the real discipline is being deliberate about the handful that matter, not maximizing coverage.

---

## Decision 4 — Identity & Privacy Architecture

- **Anonymous-to-identified transition:** users generate events before signing up (browsing, onboarding) and after (as an authenticated user). Decide how anonymous session IDs get merged into the identified user record on signup — most providers support an explicit "alias" or "identify" call for this; don't lose pre-signup funnel data by starting tracking only after login.
- **PII discipline:** never put email addresses, names, or free-text content (message bodies, search queries) directly into event properties. Use IDs and let your backend join to PII-containing tables only when needed, behind proper access control. Analytics tools are not built with the same data protection rigor as your primary database, and event data often has weaker deletion guarantees.
- **Respect platform-level tracking consent.** iOS requires App Tracking Transparency (ATT) prompts for any tracking that crosses apps/websites for advertising purposes — first-party product analytics within your own app generally doesn't require ATT, but cross-app attribution (e.g. ad attribution SDKs) does. Know which category each SDK you add falls into.

> ⚠️ A GDPR/CCPA deletion request means deleting the user's data in your analytics provider too, not just your primary database. Confirm your provider supports user-level deletion via API before committing to it — retrofitting this after launch, across millions of events, is painful.

---

## Decision 5 — Where Tracking Calls Live

- **Centralize tracking calls behind a thin wrapper**, not scattered `posthog.capture()` calls inline in every component. This gives you one place to enforce the naming convention, batch events for battery efficiency, and swap providers later without touching every screen.
- **Batch and debounce on-device** before sending — mobile network conditions are unreliable; queue events locally and flush in batches rather than firing a network call per tap.
- **Server-side tracking for anything financially or security sensitive** (purchases, account changes) — client-side events can be dropped, delayed, or spoofed. Critical events should be emitted from your backend when the authoritative action happens, with client-side events as a supplement for UX-level insight, not the source of truth for revenue numbers.

---

## AI Prompts

### Prompt 1 — Event Taxonomy Design

```
I'm designing the analytics event taxonomy for a production mobile app.

Core product flows: [list your 3-5 most important user flows]
Key business questions we need to answer: [list them]

Propose an event taxonomy following object_action naming convention.
For each event, specify: when it fires, its properties, and whether
it should be tracked client-side or server-side. Flag any event that
would require capturing PII, and suggest how to avoid that.
```

### Prompt 2 — Privacy/Identity Architecture Review

```
Review this analytics identity and privacy design:

[describe your anonymous-to-identified user flow and what properties
you're sending to your analytics provider]

Check for: PII leaking into event properties, whether pre-signup
anonymous events get properly merged on identification, and whether
the design supports user-level data deletion for compliance requests.
```

---

## Validating AI Output

- [ ] Event names follow a single consistent convention (`object_action`), not mixed casing/tense
- [ ] No PII (email, name, free-text content) is sent as an event property
- [ ] Financially/security-sensitive events are emitted server-side, not only client-side
- [ ] Anonymous pre-signup events are merged into the identified user on signup, not discarded
- [ ] Tracking calls are centralized behind a wrapper, not scattered inline across components
- [ ] Every proposed event ties back to an actual question you need answered — not added "just in case"

---

## What's Next

- **Cost Estimation** (next in this phase) factors in your analytics provider's pricing tier based on expected event volume.
- **Observability** (Phase 4) covers crash and error monitoring — the separate concern from product analytics established in this module.
- **Analytics Events** (Phase 3) is where this taxonomy becomes actual instrumented tracking calls throughout your codebase.
