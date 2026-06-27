---
title: Analytics
slug: analytics
phase: Phase 3
mode: production
projectType: saas
estimatedTime: 20–35 min
---

# Analytics

Analytics is not about dashboards. It's about making decisions with evidence instead of intuition.

Most early SaaS products track too much and measure too little. They instrument every click, generate reports nobody reads, and still can't answer the question that actually matters: *why are users churning?*

This module covers two distinct analytics concerns you need to solve for:

1. **Product analytics** — understanding how users behave inside your product
2. **Business analytics** — understanding revenue, retention, and growth

They are different problems. They often require different tools.

---

## Before You Instrument Anything

Define the three questions you most need answered right now.

> Examples:
> - Where do users drop off in the onboarding flow?
> - Which features drive users to upgrade?
> - What does the week-1 retention curve look like?

If you can't answer "what decision would this data help me make?" — don't track it. Every event you add is maintenance burden. Every dashboard nobody reads is noise.

---

## The Analytics Stack Decision

| Layer | What it solves | Options |
|---|---|---|
| **Event collection** | Capture user actions | Posthog, Mixpanel, Segment, Amplitude |
| **Business metrics** | Revenue, MRR, churn | Stripe dashboard, Baremetrics, Chartmogul |
| **Infrastructure metrics** | CPU, memory, latency, errors | Datadog, Grafana, Fly metrics |
| **Custom dashboards** | Internal reports | Metabase, Redash (query your own DB) |

**For most early SaaS products, the answer is:**

- **PostHog** for product analytics (self-hostable, generous free tier, session replay, feature flags, funnels — one tool for most of what you need)
- **Stripe Dashboard + Baremetrics** for revenue metrics (Stripe gives you the raw data; Baremetrics surfaces MRR, churn rate, LTV automatically)
- **Your DB** for anything custom (Metabase pointed at Postgres is remarkably powerful for internal reporting)

Segment is a good choice when you need to route the same events to multiple downstream tools. It's abstraction cost you don't need until you're running several tools simultaneously.

---

## Product Analytics: What to Track

### The Minimal Viable Event Plan

Track events at the action level, not the page view level. Page views tell you where users went. Events tell you what they did.

```
Core events to instrument on day one:

Acquisition
  user_signed_up         { method: "google" | "email", source: utm_source }
  user_invited           { invitee_email, role }

Activation
  onboarding_step_completed  { step: "profile" | "invite_team" | "first_action" }
  first_[core_action]        { e.g. first_document_created, first_project_created }

Engagement
  [core_action]_completed    { ... relevant properties }
  feature_used               { feature_name }

Retention
  session_started            { days_since_signup }

Monetisation
  upgrade_clicked            { from_plan, to_plan, trigger_location }
  plan_upgraded              { from_plan, to_plan, amount }
  plan_cancelled             { plan, reason }
```

**Name events as `noun_verb` in past tense.** `document_created`, not `create_document` or `documentCreate`. This is the industry convention and makes queries consistent.

### Property Hygiene

Every event should carry:

```typescript
// Auto-attach these to every event via middleware
{
  user_id: string,
  organization_id: string,
  plan: "free" | "pro" | "enterprise",
  environment: "production",
  timestamp: ISO8601,
}
```

Never send PII (emails, names) as event properties if you can avoid it. Use IDs. You can always join on IDs later. You can't un-send an email address to a third-party analytics vendor.

---

## Implementing PostHog

### Installation

```bash
npm install posthog-js          # frontend
npm install posthog-node        # backend (server-side events)
```

### Frontend Setup

```typescript
// lib/analytics.ts
import posthog from 'posthog-js';

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  if (process.env.NODE_ENV !== 'production') return; // don't pollute dev data

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
    capture_pageview: false,      // control this manually
    capture_pageleave: true,
    autocapture: false,           // avoid noisy auto-events; be intentional
    persistence: 'localStorage+cookie',
  });
}

export function identify(userId: string, traits: Record<string, unknown>) {
  posthog.identify(userId, traits);
}

export function track(event: string, properties?: Record<string, unknown>) {
  posthog.capture(event, properties);
}

export function group(organizationId: string, traits: Record<string, unknown>) {
  posthog.group('organization', organizationId, traits);
}
```

### Backend Events (Server-Side)

Track sensitive or revenue events server-side. Never trust the client for billing events.

```typescript
// lib/analytics-server.ts
import { PostHog } from 'posthog-node';

const posthog = new PostHog(process.env.POSTHOG_KEY!, {
  host: process.env.POSTHOG_HOST,
  flushAt: 20,
  flushInterval: 10000,
});

export function trackServer(
  userId: string,
  event: string,
  properties?: Record<string, unknown>
) {
  posthog.capture({
    distinctId: userId,
    event,
    properties,
  });
}

// Always shut down cleanly in serverless environments
export async function flushAnalytics() {
  await posthog.shutdownAsync();
}
```

```typescript
// Usage: in your Stripe webhook handler
case 'customer.subscription.created':
  trackServer(userId, 'plan_upgraded', {
    from_plan: 'free',
    to_plan: subscription.items.data[0].price.nickname,
    amount: subscription.items.data[0].price.unit_amount,
    currency: subscription.currency,
  });
```

### Identifying Users and Organizations

PostHog supports both user-level and group-level (organization) analytics. Set this up from day one — retrofitting it later means losing historical cohort data.

```typescript
// On login / session start
identify(user.id, {
  email: user.email,      // PostHog encrypts this; acceptable
  plan: user.organization.plan,
  created_at: user.createdAt,
});

group(user.organizationId, {
  name: user.organization.name,
  plan: user.organization.plan,
  seat_count: user.organization.memberCount,
});
```

---

## Business Metrics: What Actually Matters

These are the metrics you review weekly as a founder/PM. They live in Stripe + Baremetrics, not PostHog.

| Metric | Definition | Why it matters |
|---|---|---|
| **MRR** | Monthly Recurring Revenue | Baseline health |
| **MRR Growth Rate** | (This month − Last month) / Last month | Trajectory |
| **Churn Rate** | Cancelled MRR / Total MRR | Retention signal |
| **Net Revenue Retention** | MRR from existing customers including expansion | >100% = growth without new customers |
| **CAC** | Cost to acquire a customer | Paid channel efficiency |
| **LTV** | Average revenue per customer over lifetime | CAC < LTV/3 is a baseline rule of thumb |
| **Activation Rate** | % of signups who complete first core action | Product-market fit signal |
| **Week-1 Retention** | % of users active 7 days after signup | Most predictive metric for long-term retention |

**Don't build these yourself.** Baremetrics or Chartmogul pull from Stripe and give you all of these automatically. The cost ($50–100/mo) is less than the engineering time to build even one of these calculations correctly.

---

## Custom Internal Analytics

There will be questions your external tools can't answer — internal operational metrics, customer health scores, usage reports for your own team. For these, point Metabase at your Postgres database.

```bash
# Run Metabase locally or on a $6/month VPS
docker run -d -p 3000:3000 \
  -e MB_DB_TYPE=postgres \
  -e MB_DB_DBNAME=metabase \
  -e MB_DB_PORT=5432 \
  -e MB_DB_USER=metabase \
  -e MB_DB_PASS=password \
  -e MB_DB_HOST=your-db-host \
  --name metabase metabase/metabase
```

Questions Metabase answers immediately:
- "Show me all organizations that created >10 documents this month but haven't upgraded"
- "Which features have zero usage across our pro tier?"
- "What's the distribution of team sizes across our customer base?"

Give your support and success teams read-only Metabase access. It reduces engineering interruptions for data requests.

---

## AI Prompt — Analytics Plan Review

Use this to validate your instrumentation plan before you start adding tracking calls.

```
You are a senior product engineer reviewing an analytics instrumentation plan for a SaaS product.

Product context:
[Describe your product — what it does, who it's for]

Core user journey (the thing users must do to get value):
[Step 1 → Step 2 → Step 3]

My planned events to track:
[List your events and properties]

Tools I plan to use:
[e.g. PostHog for product analytics, Baremetrics for revenue]

Please review this plan and:
1. Identify any gaps in the user journey that won't be measurable
2. Flag any events I'm tracking that won't drive decisions
3. Point out any PII or privacy risks in my event properties
4. Suggest the 3 most important metrics I should be reviewing weekly
5. Tell me one thing I'm probably over-instrumenting

Be direct. If the plan is solid, say so.
```

---

## Privacy and Compliance

Analytics is a privacy surface. Handle it correctly from day one.

**What you must do:**
- Disclose analytics in your Privacy Policy
- Respect Do Not Track signals if you've committed to it
- Never send health, financial, or sensitive PII as event properties
- If you operate in the EU: GDPR requires consent before client-side tracking (cookie banner)
- If you operate in California: CCPA requires a "Do Not Sell" mechanism

**PostHog self-hosted** avoids most third-party data transfer concerns — data stays in your infrastructure. This is a meaningful selling point for enterprise customers.

**Anonymize where possible:**
```typescript
// Instead of tracking email in events
track('document_created', { user_id: user.id }); // ✓
track('document_created', { email: user.email }); // ✗
```

---

## Implementation Checklist

### Setup

- [ ] PostHog (or chosen tool) installed on frontend and backend
- [ ] Analytics disabled in development/staging environments
- [ ] User identification set up (user ID + organization ID)
- [ ] Group analytics configured for organization-level metrics

### Event Instrumentation

- [ ] Signed up event tracked with acquisition source
- [ ] Onboarding steps tracked individually
- [ ] First core action tracked
- [ ] Upgrade/downgrade/cancel events tracked server-side
- [ ] All events use `noun_verb` past-tense naming
- [ ] No PII in event properties (emails, names, addresses)

### Business Metrics

- [ ] Baremetrics or Chartmogul connected to Stripe
- [ ] MRR, churn rate, NRR visible in one place
- [ ] Weekly metrics review scheduled (even if it's just you)

### Internal Analytics

- [ ] Metabase (or equivalent) pointed at Postgres
- [ ] Team has access for ad-hoc queries

### Privacy

- [ ] Analytics disclosed in Privacy Policy
- [ ] Consent mechanism in place if serving EU users
- [ ] No sensitive data in event properties

---

## Common Mistakes

> **⚠️ Tracking everything from day one**
> Autocapture and blanket page view tracking floods you with data that doesn't answer questions. Start with 10 intentional events. Add more only when you have a specific question.

> **⚠️ Revenue events client-side**
> A user can block JavaScript. A refunded charge can still show as an upgrade. Track all revenue events from your Stripe webhook handler, server-side.

> **⚠️ No baseline before launch**
> Instrument before you have real users. You can't retroactively add tracking data. Your first week of real users is your most valuable data.

> **⚠️ Building your own business metrics**
> Calculating MRR correctly (accounting for proration, trials, upgrades, refunds) is genuinely hard. Use Baremetrics. It's cheaper than the engineering time.

> **⚠️ Ignoring Week-1 retention**
> This is the single most predictive metric for long-term product health. If users aren't coming back in week one, no amount of acquisition fixes the problem.

---

## What's Next

Analytics is instrumented. Before moving on, confirm:

- At least one test event is flowing through to PostHog in production
- Revenue events are firing from your Stripe webhook
- You have a written list of the three questions you're tracking to answer

Next up: **Admin Panel**
