---
title: Metering & Quotas
slug: metering-quotas
phase: Phase 2
mode: production
projectType: api-product
estimatedTime: 25-30 min
---

# Metering & Quotas

Billing Architecture decided *how revenue flows* from usage. This module decides *how usage itself gets counted and enforced in real time* — the mechanism that has to run on every single request, correctly, under load, without becoming the slowest part of your API.

## The Decision You're Actually Making

Not "how do we stop abuse." It's: **at what exact moment does a request get rejected for exceeding a quota, and how much latency are we willing to add to every request to know that?**

Metering and rate limiting look similar but solve different problems. Confusing them leads to architecture that's wrong for both.

## Metering vs Rate Limiting — Don't Conflate Them

| | Metering | Rate Limiting |
|---|---|---|
| **Question it answers** | How much has this customer used, total? | How fast is this customer making requests, right now? |
| **Timescale** | Billing period (monthly, daily) | Seconds to minutes |
| **Failure mode** | Quota exceeded — blocked until reset or upgrade | Too many requests — blocked briefly, retry shortly |
| **Where it lives** | Often a separate service, can tolerate slight lag | Must be fast, usually at the gateway/edge |

> **⚠️ Warning:** These need separate systems with separate semantics. A customer can be well within their monthly quota but still hit a rate limit from a request burst — and a request that's well within rate limits can still get rejected for exceeding a monthly quota. Returning the same error for both confuses developers debugging your API.

## Decision: Hard Quota vs Soft Quota

| Approach | Behavior at limit | Best for |
|---|---|---|
| Hard cutoff | Requests fail immediately at the limit | Cost-sensitive APIs, free tiers, abuse prevention |
| Soft limit + overage billing | Requests continue, billed at overage rate | Paid tiers where you want usage growth, not friction |
| Grace buffer + warning | Allow a small overshoot, notify before hard cutoff | Reducing support tickets from customers surprised by a sudden cutoff |

> **✅ Best Practice:** Use hard cutoffs on free tiers (protects your costs) and soft limits with overage billing on paid tiers (protects revenue growth and customer experience). A paying customer's request failing because of an unexpected hard quota is a support ticket and a trust hit; let them go over and bill for it instead.

## Where Enforcement Actually Happens

```
Request → API Gateway (rate limit check) → Application (quota check) → Handler → Response
```

| Layer | Checks | Why here |
|---|---|---|
| Gateway / edge | Rate limits (requests per second/minute) | Needs to be fast, rejects before hitting your application servers at all |
| Application middleware | Quota status (monthly usage vs limit) | Needs access to current usage data, which is slower to compute |
| Async (post-response) | Usage event recording | Never blocks the response — happens after the customer already has their data |

> **⚠️ Warning:** Don't query your full usage aggregation on every single request to check quota — that turns every API call into a database read against potentially millions of usage events. Cache current usage counts (e.g. in Redis) and reconcile against the source of truth periodically, not on the hot path of every request.

## Designing the Quota Check Itself

The pattern that scales: maintain a fast-access counter (Redis `INCR` with a TTL aligned to the billing period), and treat your durable usage event log as the source of truth that the counter is periodically reconciled against.

- [ ] Counter increments happen atomically — no read-then-write race condition
- [ ] Counter TTL/reset aligns exactly with the customer's actual billing cycle, not a fixed calendar month for everyone
- [ ] A counter failure (Redis down) has a defined fallback — fail open (allow requests) or fail closed (block requests)?

> **💡 Tip:** For most APIs, fail open on quota-checking infrastructure failures, not fail closed. A few minutes of allowed-but-unbilled usage during an outage costs you a small, bounded amount. Blocking every paying customer's requests because your quota cache is briefly down costs you significantly more in trust and support load.

## Communicating Quota State to Developers

Every response should let a developer know where they stand without a separate API call:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1719820800
X-Quota-Used: 45230
X-Quota-Limit: 50000
```

> **✅ Best Practice:** Put quota and rate limit state in response headers on every request, not just in error responses. This lets well-built client code anticipate a limit before hitting it, instead of discovering it via a failed request — this is the same pattern GitHub and Stripe both use, and SDKs built against your API can surface this proactively to developers.

## Use AI to Find Race Conditions in Your Design

**Prompt — Quota Enforcement Race Condition Review**
```
Review this quota enforcement design for an API:

[describe your counter mechanism, increment logic, and reset behavior]

Focus only on:
1. Race conditions in concurrent requests near the quota boundary 
   (e.g. two simultaneous requests both checking "under limit" before 
   either increments)
2. Clock/timezone edge cases at billing period reset
3. What happens to in-flight requests during a counter reset
4. Failure mode if the fast-access counter store becomes unavailable

Do not suggest pricing or business model changes — architecture only.
```

> **💡 Token Efficiency:** This review works well as a follow-up in the same conversation where you discussed Billing Architecture — quota enforcement directly depends on those decisions, and re-establishing that context from scratch wastes tokens you don't need to spend.

## Validate Before Moving On

- [ ] Rate limiting and quota enforcement are clearly separate systems with separate error responses
- [ ] Quota checks use a fast counter, not a live aggregation query, on the request hot path
- [ ] Counter increments are atomic — tested under concurrent load, not just assumed safe
- [ ] A defined fail-open or fail-closed behavior exists for when the counter store is unavailable
- [ ] Every response includes machine-readable quota/rate-limit headers

## Common Mistakes

- Returning identical error responses for rate limiting and quota exhaustion, confusing developers
- Checking quota via a full database aggregation on every request
- Race condition allowing two near-simultaneous requests to both slip through a limit check
- No documented fallback behavior when the quota-checking infrastructure itself fails
- Quota reset based on a fixed calendar month instead of each customer's actual billing cycle start date

## Quick Reference

| Must-decide now | Can evolve later | Don't over-engineer early |
|---|---|---|
| Hard vs soft quota by tier | Exact quota numbers per tier | Per-endpoint custom quota types |
| Fail open/closed on infra failure | Grace buffer thresholds | Predictive usage alerts |
| Atomic counter mechanism | Notification timing before cutoff | Custom quota analytics dashboard |
| Rate limit vs quota separation | Burst allowance tuning | Multi-region counter synchronization |

## What's Next

With enforcement mechanics defined, the next module covers Monitoring Architecture — how you observe whether this entire system (metering, quotas, billing) is actually working correctly in production, before a customer has to tell you it isn't.
