---
title: Analytics Setup
slug: analytics-setup
phase: Phase 5
mode: personal
projectType: marketplace
estimatedTime: 15 min
---

# Analytics Setup

Monitoring (Phase 4) told you whether your app is *working* — errors, uptime, response times. Analytics tells you whether your marketplace is *succeeding* — are buyers finding what they want, are sellers completing listings, where does the funnel actually leak. These are different questions, and conflating them is why some projects have great uptime and still fail to grow.

You already added lightweight structured event logging back in Monitoring (`logEvent` calls for listing created, order completed, etc.). This module is about turning those events into something you can actually query and learn from — not adding entirely new instrumentation.

---

## Why Marketplaces Need Funnel Thinking, Specifically

> ** Core rule:** a marketplace has two parallel funnels — buyer and seller — that need to both work for the marketplace to function at all. Generic app analytics (signups, daily active users) miss the metric that actually matters most early on: **liquidity** — are listings actually resulting in transactions, not just existing.

This connects directly back to the Marketplace Liquidity concept from Phase 0 — analytics is where that becomes measurable instead of theoretical.

---

## The Funnels That Matter

| Funnel | Steps worth tracking |
|---|---|
| **Seller funnel** | Signup → first listing created → listing published → first message received → first sale |
| **Buyer funnel** | Visit → search/browse → listing viewed → message sent or purchase started → purchase completed → review left |

> ** Validation Checklist**
- [ ] Can you currently answer: what percentage of sellers who sign up actually publish a listing?
- [ ] Can you currently answer: what percentage of buyers who view a listing take any action (message or buy)?
- [ ] Can you currently answer: what percentage of started purchases actually complete?
>
> If the honest answer to any of these is "I don't know," that's the gap this module closes — not a failure, just an unmeasured area.

---

## Decision: Analytics Stack

> ** Decision Card — Analytics Approach**
>
> **Option A: Query your own database directly**
> Your structured events from Monitoring already capture the raw data — for a personal project, simple SQL queries against your own logged events may be entirely sufficient, with zero new infrastructure.
>
> **Option B: A lightweight product analytics tool** (e.g. PostHog, Plausible, Mixpanel free tier)
> Better visualization, funnel analysis built in, event tracking SDKs that handle a lot of the plumbing — worth it once manual querying starts feeling limiting.
>
> **Option C: A full data warehouse + BI tool**
> Appropriate at real scale, significant overkill for a personal project.
>
> **For Personal Mode: start with Option A using your existing logged events**, and move to Option B if you find yourself wanting actual funnel visualizations or cohort analysis that hand-written queries make tedious. Don't reach for Option C.

---

## Turning Existing Logs Into Funnel Queries

This is the direct payoff of the structured logging discipline from Monitoring and Logging — if those events are clean, this is mostly straightforward querying, not new instrumentation work.

```sql
-- Seller funnel: signup → first listing → first sale
SELECT
  COUNT(DISTINCT u.id) AS total_sellers,
  COUNT(DISTINCT l.seller_id) AS sellers_with_listing,
  COUNT(DISTINCT o.seller_id) AS sellers_with_sale
FROM users u
LEFT JOIN listings l ON l.seller_id = u.id
LEFT JOIN orders o ON o.seller_id = u.id AND o.status = 'completed';
```

```sql
-- Buyer funnel: listing views → messages sent → purchases completed
-- (assumes you're logging a 'listing_viewed' event per the Monitoring pattern)
SELECT
  event,
  COUNT(*) AS count
FROM event_logs
WHERE event IN ('listing_viewed', 'thread_started', 'order_completed')
  AND created_at > NOW() - INTERVAL '30 days'
GROUP BY event;
```

> **️ Warning:** If you didn't log a `listing_viewed` event back in Monitoring, you can't answer "what fraction of viewers take action" — only what fraction of *messages* convert to sales. Check now whether your event coverage actually supports the funnel questions you care about, and add the missing event before you need the data, not after.

---

## What NOT to Track

> ** Common Hallucination:** AI-suggested analytics setups often default to tracking everything — every click, every hover, every page view — which produces a flood of data that's expensive to store and genuinely harder to extract insight from, not easier. For a personal marketplace, the handful of funnel events above tell you almost everything that matters.

> ** Validation Checklist — Resist tracking**
- [ ] Granular UI interactions (button hovers, scroll depth) — rarely actionable at personal-project scale
- [ ] Anything that duplicates what your error tracker (Sentry) already captures
- [ ] Personally identifiable details beyond what you need for the funnel question being asked — analytics should answer "what fraction of users do X," not build a detailed profile of each individual

---

## Privacy Connection

Whatever you track here needs to be consistent with what your Privacy Policy already describes — don't add new tracked events without checking that connection.

> ** Validation Checklist**
- [ ] Does your Privacy Policy's description of "data we collect" already cover behavioral/usage analytics, or does adding this require an update to that document?
- [ ] If using a third-party analytics tool (Option B above), is it added to the "who we share data with" list from your Privacy Policy?

---

## AI Prompt: Build Funnel Queries From Existing Events

> ** Copy Prompt**
>
> ```
> Help me build funnel analysis queries for my personal marketplace project, using
> events I'm already logging. Don't suggest a new analytics platform — I want to
> query my existing database/event logs directly.
>
> Events I currently log: [LIST YOUR ACTUAL logEvent CALLS FROM THE MONITORING MODULE
> — e.g. listing_created, order_completed, review_submitted, thread_started]
>
> Funnels I want to measure:
> 1. Seller: signup → first listing published → first message received → first sale
> 2. Buyer: listing viewed → thread started or purchase initiated → purchase completed
>
> Database: [YOUR DATABASE — e.g. PostgreSQL/Prisma]
>
> Write SQL queries (or Prisma aggregate queries) for each funnel step, and flag any
> step I can't currently measure because I'm not logging the relevant event yet.
> ```
>
> **Why this prompt works:** explicitly listing your actual logged events lets AI tell you precisely which funnel steps you can already measure versus which ones need a new `logEvent` call — turning a vague "set up analytics" task into a specific, small instrumentation gap list.

---

## Validating AI Output

> ** Validation Checklist**
- [ ] Do the suggested queries match events you're actually logging, not events AI assumed exist?
- [ ] Are funnel percentages calculated correctly (each stage as a fraction of the *previous* stage, not all as a fraction of total signups, which exaggerates later-stage drop-off)?
- [ ] Did AI flag the specific events you're missing, rather than just working around the gap silently?

---

## Token Efficiency Tip

This module is naturally a short follow-up to Monitoring rather than a fresh undertaking — if you're in the same or a related AI conversation, just reference "the events I set up in Monitoring" instead of re-listing your whole logging setup from scratch.

---

## What You've Decided

By the end of this module you should have:

- Clear visibility into your seller and buyer funnels using your existing logged events
- Identification of any missing events needed to fully measure those funnels
- A deliberately narrow set of tracked metrics, not exhaustive interaction tracking
- Confirmation that your analytics setup is consistent with what your Privacy Policy discloses

**Next:** SEO — making sure your listings and marketplace are actually discoverable.
