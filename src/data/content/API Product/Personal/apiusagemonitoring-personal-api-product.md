---
title: Usage Monitoring
slug: usage-monitoring
phase: Phase 6
mode: personal
projectType: api-product
estimatedTime: 15–20 min

---

# Usage Monitoring

Analytics (previous module) is a view for you — aggregate, product-level, informing what to build next. Usage monitoring is a view for your customers — per-key, operational, answering "how much of my quota have I used, and when does it reset?" Get this wrong and you get two predictable outcomes: developers surprised by rate limits they had no visibility into, and billing numbers you can't fully trust because of race conditions in how you counted.

---

## The Decision: Dashboard vs API Endpoint

| | Self-Serve Web Dashboard | `GET /v1/usage` Endpoint |
|---|---|---|
| Build effort | High — needs UI, auth, charts | Low — one more endpoint on infrastructure you already have |
| Lets developers build their own tooling | No | Yes |
| Dogfoods your own API design | No | Yes |
| Good starting point for personal scale | Not yet | Yes |

> ** Best Practice:** Start with a `GET /v1/usage` endpoint before building a dashboard. It's cheaper to build, it's consistent with the rest of your API's design, and developers who want a visual view can build one against it — you're not blocking on your own UI work to give customers visibility.

---

## What to Expose

```json
// GET /v1/usage
{
  "data": {
    "period_start": "2026-06-01T00:00:00Z",
    "period_end": "2026-06-30T23:59:59Z",
    "requests_used": 8420,
    "requests_limit": 10000,
    "requests_remaining": 1580,
    "resets_at": "2026-07-01T00:00:00Z"
  }
}
```

This alone answers the two questions that generate the most "why was I rate limited" support messages: how much is left, and when does it reset. Add a per-endpoint breakdown later only if customers actually ask for it — it's not required for the core use case.

---

## Metering Accurately

Your billing architecture (Phase 2) depends on this count being correct even under concurrent requests. A naive read-then-write counter is a race condition waiting to under-count usage:

```ts
//  Race condition — two concurrent requests can both read the same
// starting value before either write completes
const current = await db.get(`usage:${apiKeyId}`);
await db.set(`usage:${apiKeyId}`, current + 1);
```

```ts
//  Atomic increment — no read-then-write gap
await redis.incr(`usage:${apiKeyId}:${billingPeriod}`);

// Or, atomic upsert in Postgres:
await db.query(
  `INSERT INTO usage_counters (api_key_id, period, count)
   VALUES ($1, $2, 1)
   ON CONFLICT (api_key_id, period)
   DO UPDATE SET count = usage_counters.count + 1`,
  [apiKeyId, billingPeriod]
);
```

> **️ Warning:** Read-then-write counters look correct in manual testing because you're the only one hitting the API. Under real concurrent traffic they silently under-count, which means customers get billed for less than they actually used — a bug you won't notice until your revenue numbers don't add up.

---

## Freshness: How Real-Time Does This Need to Be?

- **For billing display** — a few minutes of lag is fine. Customers checking their usage don't need sub-second accuracy.
- **For hard quota enforcement** (blocking requests once a limit is hit) — needs to be close to real-time, or a burst of concurrent requests can blow past the limit before the count catches up. This is why the atomic increment above happens synchronously in the request path, not in a background job.

Keep these separate in your mental model: the number you *show* can lag slightly; the number you *enforce against* can't.

---

## Simple Anomaly Detection

You don't need a machine learning model here — a basic threshold catches almost everything worth catching at personal scale:

```ts
const recentRate = await getRequestRate(apiKeyId, "1h");
const historicalAvg = await getAverageRate(apiKeyId, "7d");

if (recentRate > historicalAvg * 5) {
  await notifyMaintainer(`Unusual spike for key ${apiKeyId}: ${recentRate}/hr vs avg ${historicalAvg}/hr`);
}
```

For a personal-scale API, alert yourself rather than auto-blocking — a false positive that silently cuts off a legitimate customer costs more trust than a few minutes of manual review would.

---

## AI Prompts

**Prompt: Implement atomic usage counting**

```text
I need to track API usage per key for billing, using [Redis / Postgres — specify].

Write the increment logic and the read logic for GET /v1/usage, given:
- Usage resets on a monthly billing cycle starting on the customer's signup anniversary date (not calendar month)
- The increment must be atomic under concurrent requests
- The read endpoint must only return the authenticated key's own usage, never accept a key ID as a parameter

Output the increment function, the read query, and note any edge cases around billing period boundaries.
```

**Prompt: Design a simple anomaly threshold**

```text
Design a simple anomaly detection rule for API usage per key, using only request counts I already track (no ML).

Requirements:
- Compare recent short-window rate (last 1 hour) to a longer historical baseline (last 7 days)
- Flag for manual review, don't auto-block
- Explain the threshold multiplier you'd choose and why, calibrated for a personal-scale API with modest, uneven traffic
```

---

## Validation Checklist

- [ ] Usage counters use atomic increments, not read-then-write
- [ ] `GET /v1/usage` returns only the authenticated key's own data
- [ ] Billing period boundaries are handled correctly, including timezone edge cases
- [ ] Displayed usage numbers may lag slightly; enforced limits do not
- [ ] Anomaly detection alerts a human rather than silently blocking traffic

---

## Common Mistakes

> **️ Warning:** Read-then-write usage counters. This is the single most common billing accuracy bug in solo-built APIs, and it's invisible until real concurrent traffic exposes it.

> **️ Warning:** Resetting usage counters on the 1st of the calendar month regardless of when a customer actually signed up. Align resets to each customer's own billing anniversary, or you'll bill inconsistently across your user base.

> **️ Warning:** Building a full dashboard before a usage endpoint exists. The endpoint is the actual dependency — a dashboard without one just means you built the wrong layer first.

---

## Security Note

The usage endpoint must scope strictly to the authenticated key — never accept a key ID or account ID as a request parameter for this data. This is a common and serious mistake: without strict scoping, one customer could query another customer's usage or billing data simply by guessing or enumerating IDs.

---

## Implementation Checklist

- [ ] Usage counters implemented with atomic increments (Redis `INCR` or Postgres atomic upsert)
- [ ] `GET /v1/usage` endpoint live, scoped strictly to the authenticated key
- [ ] Billing period boundaries tested across timezones and month-length edge cases
- [ ] Simple anomaly alerting in place, notifying you rather than auto-blocking
- [ ] Usage data separated conceptually from analytics data (Phase 6 module) — different audience, different guarantees

---

## What's Next

Next in Phase 6: **Customer Feedback** — building a lightweight system for collecting and acting on feedback beyond the beta phase.
