---
title: Analytics
slug: analytics
phase: Phase 6
mode: personal
projectType: api-product
estimatedTime: 15–20 min

---

# Analytics

Monitoring (Phase 4) answers "is my API up?" Analytics answers a completely different question: "is my API being used, by whom, and is that usage healthy?" You can have perfect uptime and still be building something nobody activates past their first API call. This module is about seeing that before it's a problem, using the smallest amount of instrumentation that actually informs a decision.

This is distinct from the next module, **Usage Monitoring** — that one covers per-customer quota tracking and billing metering. This module is about aggregate, founder-facing product analytics: growth, activation, and churn signals.

---

## The Decision: What to Actually Track

Resist the urge to instrument everything on day one. Start with the handful of metrics that map directly to a decision you'd actually make differently based on the answer.

| Metric | What It Tells You |
|---|---|
| Requests per endpoint (daily/weekly) | Which parts of your API people actually use — informs what to improve next |
| Unique active API keys (daily/weekly/monthly) | Real adoption, not just signups |
| Time-to-first-call from key creation | Whether your Quick Start is actually working |
| Keys created but never used | Onboarding failure — activation problem |
| Keys used once, then abandoned within 7 days | Integration or value problem — the API worked, but didn't stick |
| Error rate by consumer | Whether specific integrations are silently broken |

> ** Best Practice:** Every metric you track should answer a specific question you plan to act on. If you can't name the decision a metric would change, don't build the dashboard for it yet.

---

## Where to Capture It

You already control the request pipeline through your API gateway/auth middleware — that's the natural place to log a minimal usage event, not a separate analytics SDK bolted on later.

```ts
// middleware/usage-tracking.ts
async function trackUsage(req: AuthenticatedRequest) {
  await db.insert("usage_events", {
    api_key_id: req.apiKeyId,
    endpoint: req.route.path,
    method: req.method,
    status_code: req.res?.statusCode,
    timestamp: new Date(),
  });
}
```

For a personal-scale API, a simple `usage_events` table you can aggregate with SQL is enough — no need for a dedicated analytics platform until you outgrow it. If you later want cohort analysis, funnels, or dashboards without writing your own queries, PostHog has a usable free tier and can ingest server-side events with minimal setup — treat it as an upgrade path, not a day-one requirement.

> **️ Warning:** Don't log full request or response bodies into your usage events table by default. It's tempting for debugging, but it turns an analytics table into a privacy liability and a storage cost that grows unbounded.

---

## The Activation Funnel

Track this funnel specifically — it's where personal API products lose the most potential users, usually silently:

```
Signup → API Key Created → First Successful Call → Repeat Usage (7 days) → Upgrade/Paid
```

The biggest drop-off for most solo-built APIs happens between "key created" and "first successful call." If that number is low, the problem usually isn't your API's capability — it's your Quick Start Guide, your example requests, or your error messages. Fix activation before you optimize anything downstream in the funnel.

> ** Tip:** A key created with zero calls after 48 hours is a much stronger signal than a survey response. It tells you exactly where someone gave up, even if they never told you why.

---

## Segmenting Health, Not Just Volume

Raw request counts hide more than they reveal. Segment active keys into three buckets:

- **Never activated** — key exists, zero successful calls. Onboarding failure.
- **Tried once, abandoned** — one or a few calls, then nothing for 7+ days. Value or integration friction.
- **Steady usage** — recurring calls over multiple weeks. This is your real, retained usage — the number that should actually drive your growth and pricing decisions, not total signups.

---

## AI Prompts

**Prompt: Design the usage event schema**

```text
I'm building a usage_events table for an API product to track: which endpoint was called, by which API key, when, and the response status code.

Design a minimal Postgres schema for this table, plus one SQL query for each of these:
1. Unique active API keys in the last 7 days
2. Keys created more than 48 hours ago with zero successful calls
3. Requests per endpoint, last 7 days, sorted descending

Keep the schema minimal — no fields beyond what's needed for these three queries.
```

**Prompt: Find patterns in raw usage data**

```text
Here's a summary of my API usage data: [paste aggregated numbers — requests per endpoint, active keys over time, activation rate].

Identify:
1. Any endpoint that's unusually underused relative to how central it is to the API's purpose
2. Whether activation rate (key created → first call) suggests an onboarding problem
3. One concrete next step this data supports, with reasoning

Don't speculate beyond what the numbers actually show.
```

---

## Validation Checklist

- [ ] Every tracked metric maps to a specific decision you'd act on
- [ ] Usage events are logged without capturing full request/response bodies
- [ ] Activation funnel (key created → first call → repeat usage) is visible, not just total request volume
- [ ] "Never activated" and "abandoned after one call" keys are identifiable, not buried in aggregate stats
- [ ] Analytics data storage has a retention/cleanup plan, not unbounded growth

---

## Common Mistakes

> **️ Warning:** Building a full analytics platform before there's meaningful usage to analyze. A SQL query against a simple events table answers your real questions at personal-project scale — a dashboard tool is worth adopting once the questions get more complex, not before.

> **️ Warning:** Tracking total requests as your headline metric. Total requests can rise while actual retained usage falls — a handful of keys hammering one endpoint looks identical to broad healthy adoption unless you segment by unique active keys.

> **️ Warning:** Confusing this with uptime monitoring. A perfectly "up" API with a 10% activation rate has a product problem, not an infrastructure problem — different data, different fix.

---

## Security Note

Usage events should store enough to answer product questions, never enough to reconstruct what a specific customer's data looked like. Log endpoint, method, status, and timing — not payload contents. If you ever need deeper debugging detail, use your error tracking tool from Phase 4, which should already have appropriate access controls, rather than widening what your analytics table stores.

---

## Implementation Checklist

- [ ] `usage_events` table (or equivalent) logging endpoint, key, status, and timestamp
- [ ] Activation funnel queryable: signup → key created → first call → repeat usage
- [ ] "Never activated" and "abandoned" key segments identifiable via query
- [ ] No request/response bodies stored in usage analytics
- [ ] Clear owner decision for each metric: what would change if this number moved

---

## What's Next

Next in Phase 6: **Usage Monitoring** — giving individual customers visibility into their own usage against quotas and rate limits.
