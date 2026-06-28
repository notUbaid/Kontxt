---
title: Analytics Setup
slug: analytics-setup
phase: Phase 5
mode: production
projectType: saas
estimatedTime: 20-30 min
---

# Analytics Setup

Traffic numbers tell you that people showed up. They don't tell you whether your product worked.

Most first-time founders install Google Analytics, watch the visitor count, and call it "analytics." Then they launch, get 200 visitors, three signups, and have no idea why the other 197 left — because pageviews don't explain behavior.

This module sets up analytics that answer the only question that matters at launch: **where do users get stuck, and why?**

---

## The Core Idea: Funnels, Not Pageviews

A pageview tells you someone loaded `/signup`. It doesn't tell you if they:

- Saw the form and immediately left
- Filled it out and hit an error
- Submitted successfully but never verified their email
- Verified, then never came back

Without event-level tracking tied to a funnel, every one of those outcomes looks identical in your dashboard: "1 pageview." You need to instrument the *steps*, not just the *page loads*.

> ** Tip**
> If you can only track one thing before launch, track your activation funnel: Signup → Email Verified → First Key Action Completed. This single funnel will tell you more about product health than every other metric combined.

---

## Decision Card: Which Analytics Tool?

| Tool | Best For | Tradeoff |
|---|---|---|
| PostHog | Product/funnel analytics, self-hostable, generous free tier | Slightly more setup than plug-and-play tools |
| Mixpanel | Mature funnel and retention analysis | Free tier limits hit faster at scale |
| Plausible / Fathom | Lightweight, privacy-friendly pageview tracking | Not built for deep event funnels |
| Google Analytics 4 | Free, familiar, good for marketing/SEO traffic | Poor at product event funnels; steep learning curve for the data model |

For a SaaS in production mode, **product event tracking matters more than pageview tracking.** PostHog or Mixpanel should be your primary tool. GA4 can run alongside for marketing-channel attribution if you're paying for ads or tracking SEO.

---

## What to Actually Track

Resist the urge to track everything. Untracked, undifferentiated event floods are as useless as no tracking at all — you can't find the signal in the noise.

### Tier 1 — Track These Before Launch (non-negotiable)

- `user_signed_up`
- `email_verified`
- `subscription_started` (with plan name and price)
- `subscription_cancelled` (with reason, if you collect one)
- Your product's **one core action** — the thing that defines whether someone got value (e.g., `project_created`, `report_generated`, `invoice_sent`)

### Tier 2 — Track These Within the First Week

- `feature_used` (per major feature, with feature name as a property)
- `error_encountered` (frontend-visible errors only — this is different from your error tracker, which is for engineers)
- `support_contacted`

### Tier 3 — Add Later, Not at Launch

- Scroll depth, click heatmaps, micro-interactions

> ** Warning**
> Don't let analytics instrumentation block your launch. Tier 1 events take an afternoon. Tier 2 and 3 can wait until you have real users generating real data to learn from.

---

## Implementation Pattern: Event Naming

Inconsistent event names are the single most common analytics mistake. Six months in, you'll have `signup`, `user_signup`, `Signed Up`, and `SIGNUP_COMPLETE` all referring to the same thing, splitting your funnel data across four buckets.

**Best Practice Card — Naming Convention**

```
Format: object_pastTenseVerb

 user_signed_up
 subscription_cancelled
 invoice_sent

 signup
 SignUp
 track_signup_event
```

Pick this convention once, write it down in a shared doc, and never deviate. Consistency matters more than which convention you pick.

---

## Server-Side vs Client-Side Tracking

This decision affects data accuracy more than most founders realize.

| Tracking Location | Pros | Cons |
|---|---|---|
| Client-side (browser) | Easy to set up, captures UI interactions | Blocked by ad blockers, lost if user closes tab early, can be spoofed |
| Server-side | Accurate, can't be blocked, tied to real database state | Requires backend code for every event |

**Rule of thumb:** Anything tied to money or account state (`subscription_started`, `user_signed_up`) should be tracked **server-side**, fired only after the database write succeeds. Anything purely about UI behavior (`button_clicked`, `modal_opened`) can stay client-side.

This matters because client-side events fire even when the underlying action fails. If you track `user_signed_up` on form submit instead of after the database confirms the user exists, your signup count will be inflated by every failed attempt.

---

## Using AI to Set Up Tracking

AI is fast at generating the boilerplate for event tracking calls — the risk is generating events that don't map to a real funnel because the model doesn't know your product's activation moment.

**Prompt: Define Your Activation Funnel**

```
I'm building a [type of SaaS] where the core value is [describe the
single outcome a user gets from your product].

Help me define a 4-5 step activation funnel from signup to first
real value delivered. For each step, give me:
1. The event name (format: object_pastTenseVerb)
2. Whether it should fire server-side or client-side, and why
3. One property worth attaching to that event

Do not suggest vanity metrics like pageviews or session duration.
```

> ** Why this prompt works**
> It forces the model to reason about *your specific* value delivery moment instead of generic SaaS metrics. The explicit ban on vanity metrics keeps the output focused on funnel events that drive decisions, not dashboard decoration.

**Token efficiency note:** Once you have your funnel defined, you don't need AI for every event you add later — apply the same naming pattern and server/client rule yourself. Save the AI conversation for funnel *design* decisions, not implementation grunt work.

---

## Validating the Setup

Before trusting your dashboard, verify it the way an engineer would — not by checking the integration is "connected," but by checking the data is *correct*.

- [ ] Trigger each Tier 1 event manually and confirm it appears in your analytics dashboard within a few minutes
- [ ] Confirm `user_signed_up` fires exactly once per signup — not zero times on slow connections, not twice on form double-submits
- [ ] Confirm a failed payment does **not** fire `subscription_started`
- [ ] Check that server-side events include a way to tie them back to a specific user (user ID property, not just an anonymous session)

> ** Best Practice**
> Test your funnel by going through your own product as a brand-new user, in an incognito window, and watching the events land in real time in your analytics tool's live view. If you can't reconstruct your own session from the events, you can't reconstruct anyone else's.

---

## What's Next

With activation events flowing correctly, move to **SEO** — turning organic search into a real acquisition channel, now that you can actually measure what happens to the traffic it sends you.
