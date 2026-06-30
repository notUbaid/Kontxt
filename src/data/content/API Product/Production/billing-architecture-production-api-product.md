---
title: Billing Architecture
slug: billing-architecture
phase: Phase 2
mode: production
projectType: api-product
estimatedTime: 25-30 min
---

# Billing Architecture

Billing bugs are the only bugs that show up on a customer's credit card statement. Get pagination wrong and a user sees a confusing list. Get billing wrong and they see a charge they didn't expect — and that's the fastest way to lose a customer's trust permanently, even if you refund it.

## The Decision You're Actually Making

Not "how do we charge people." It's: **what is the source of truth for usage, and how far can it drift from reality before it costs you money or trust?**

Every billing architecture decision traces back to one tension: metering accurately costs performance and complexity; metering loosely risks under-billing (you lose money) or over-billing (you lose customers). You need to decide, deliberately, where on that spectrum your API lives.

## Pick Your Billing Model Before Anything Else

| Model | How it works | Best for |
|---|---|---|
| Flat subscription tiers | Fixed price for a usage bracket (e.g. 10k calls/month) | Predictable revenue, simple customer mental model |
| Pure usage-based | Pay per call/unit, no fixed fee | Usage-heavy APIs (AI inference, data processing) |
| Hybrid (base + overage) | Subscription includes a quota, overages billed per-unit | Most production APIs — predictable floor, scales with usage |
| Seat-based | Priced per user/team member, not API usage | APIs that are a feature of a larger product, not the product itself |

> **✅ Best Practice:** Default to hybrid (base + overage) unless you have a specific reason not to. It gives customers predictable budgeting (the thing finance teams actually need to approve a purchase) while still letting revenue scale with the value heavy users get from your API.

## The Core Architectural Components

```
Request → Usage Event → Metering Pipeline → Aggregation → Billing Engine → Invoice
```

| Component | Responsibility | Common mistake |
|---|---|---|
| Usage Event | Records one billable action with metadata | Logging usage in the same transaction as the API response, slowing every request |
| Metering Pipeline | Validates and queues usage events | Synchronous metering that blocks the request path |
| Aggregation | Rolls up events into billing periods | Recomputing totals from raw events on every dashboard load |
| Billing Engine | Applies pricing rules, generates invoices | Hardcoding pricing logic instead of treating it as configurable data |

> **⚠️ Warning:** Never meter usage synchronously inside the request/response cycle. If your billing system is slow or briefly down, it should never be able to slow down or fail the actual API call a customer is paying for. Decouple metering from serving — usage events should be fire-and-forget, queued for async processing.

## Decision: Where Does Usage Get Recorded?

| Approach | Accuracy | Performance impact | Complexity |
|---|---|---|---|
| Log in application code, async queue | High | Minimal | Medium |
| Derive from infrastructure logs (gateway/proxy) | Medium — depends on log fidelity | None on app | Low |
| Third-party metering/billing platform (Stripe Billing, Orb, Metronome) | High | Minimal | Low — but adds a dependency |

> **💡 Tip:** For a new API product, a third-party metering platform is usually the right call. Building accurate, race-condition-free usage aggregation from scratch is a genuinely hard distributed systems problem — and it's not the part of your product that creates differentiated value. Buy this, build your actual API.

## Idempotency Is Not Optional Here

If a usage event gets recorded twice — due to a retry, a queue redelivery, a network blip — a customer gets billed twice for one request. This is the single most damaging class of billing bug, because customers notice immediately and trust erodes fast.

> **⚠️ Warning:** Every usage event must carry an idempotency key (e.g. the request ID) and your metering pipeline must deduplicate on it. Without this, *any* retry logic anywhere in your stack — yours or your infrastructure provider's — becomes a double-billing risk.

## Designing for the Disputes You Will Get

- [ ] Can you reconstruct, for any single invoice line item, the exact list of requests that produced it?
- [ ] Is there a clear, queryable audit trail from "this charge" back to "these specific API calls"?
- [ ] Can a customer (or your support team) see real-time usage against their quota, not just at billing-cycle end?
- [ ] Is there a defined grace period or soft-limit behavior before hard cutoffs, or does usage just stop working at the quota line?

> **✅ Best Practice:** Expose usage-to-date via your own API (e.g. `GET /v1/usage`). Customers who can self-serve "how much have I used this month" generate far fewer support tickets than customers who have to guess or email you — and it's the same pattern Stripe and Twilio both expose publicly for this exact reason.

## Use AI to Stress-Test Your Billing Design

**Prompt — Billing Architecture Review**
```
Review this billing architecture for an API product:

[describe your usage event flow, metering approach, and pricing model]

Focus only on:
1. Race conditions that could cause double-billing or missed billing
2. Points where metering could block or slow the actual API request path
3. Missing idempotency in the usage recording flow
4. Edge cases at billing period boundaries (usage right at midnight UTC, 
   mid-cycle plan changes)

Do not suggest pricing strategy changes — only architectural correctness.
```

> **💡 Token Efficiency:** Describe the flow in prose and a diagram rather than pasting full implementation code at this stage — architecture review needs the shape of the system, not every line, and costs far fewer tokens to iterate on.

## Validate Before Moving On

- [ ] Every usage event has an idempotency key and a dedup strategy
- [ ] Metering is fully decoupled from the request/response path — verified, not assumed
- [ ] You can answer "what specific calls produced this invoice line" for any customer
- [ ] Billing period boundary behavior (timezone, mid-cycle changes) is explicitly defined, not left to "whatever the code happens to do"
- [ ] You've chosen build-vs-buy for metering deliberately, with a stated reason

## Common Mistakes

- Synchronous metering inside the API request path, creating a latency or availability dependency
- No idempotency key on usage events — retries become silent double-charges
- Pricing logic hardcoded in application code instead of stored as configurable data
- No customer-facing usage visibility, generating support load that self-service would prevent
- Undefined behavior at billing period boundaries, discovered only when a customer disputes a charge

## Quick Reference

| Must-decide now | Can evolve later | Don't build from scratch early |
|---|---|---|
| Billing model (flat/usage/hybrid) | Specific price points per tier | Custom invoicing/dunning system |
| Async metering architecture | Additional pricing tiers | In-house payment processing |
| Idempotency key strategy | Promotional pricing/discounts | Custom tax calculation engine |
| Build-vs-buy for metering platform | Annual billing options | Multi-currency support |

## What's Next

With usage and revenue flow defined, the next module covers Usage Tracking — the technical mechanics of actually capturing, storing, and querying the events this billing architecture depends on.
