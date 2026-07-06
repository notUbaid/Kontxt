---
title: Billing Architecture
slug: billing-architecture
phase: Phase 2
mode: personal
projectType: api-product
estimatedTime: 10 min
---

# Billing Architecture

Back in **Monetization Strategy**, the recommendation for a personal MVP was "free with rate limits" — no billing. This module doesn't reverse that. It exists to make sure the decision to skip billing infrastructure is architecturally deliberate, and to sketch what you'd actually need if that ever changes, so the path isn't a rewrite.

## Confirm the Decision Still Holds

Before anything else, revisit it honestly:

- [ ] Is my monetization model still "free" or "free with limits," as decided in Phase 0/1?
- [ ] Has anything about my use cases or target caller changed that would push toward needing real billing now?

If both answers point to "still free," you can move through this module quickly — there's genuinely nothing to build here yet. If something has changed, slow down and treat this module as an actual architecture decision, not a formality.

## What "No Billing" Still Requires

Even without payment processing, "free with limits" needs one piece of infrastructure: **usage tracking accurate enough to enforce your rate limits and, later, to inform real pricing if you ever add it.** This connects directly to **Usage Tracking**, later in this phase — billing architecture and usage tracking share the same underlying data.

```
usage_events (or aggregated usage_counters)
  owner_id (FK, indexed)
  endpoint (or category of endpoint)
  timestamp
  -- or, aggregated:
  owner_id, period, request_count
```

Whether you log every request or just increment a counter depends on how much detail you might want later — a personal MVP can reasonably start with aggregated counters and add detailed logging later if needed.

## If You Do Add Paid Tiers Later

This is architecture to *know*, not to build now — useful so today's schema doesn't actively conflict with it later:

| Component | What it needs |
|---|---|
| Payment processor | A third-party service (Stripe is the standard choice) — never build raw card handling yourself |
| Plan/tier model | A `plans` table (name, rate limit, price) and a `subscriptions` field on your caller/owner record pointing to their current plan |
| Webhook handling | Payment processors notify you of events (payment succeeded, subscription canceled) via webhooks you need to handle reliably |
| Grace periods | A failed payment shouldn't instantly cut off access — decide a grace period before hard-limiting a caller |

> **Warning:** Never build your own payment/card-handling system. PCI compliance (the security standard for handling card data) is a significant undertaking that exists specifically so you don't have to store card numbers yourself — always delegate to a processor like Stripe, which handles this for you and gives you a compliant integration path.

## Design Your Owner Model to Not Block This Later

Even while staying free, one small architectural choice now saves real pain later: give your `owner` record a `plan` or `tier` field, defaulting to `"free"`, rather than hardcoding "everyone is on the free tier" throughout your business logic.

```sql
ALTER TABLE owners ADD COLUMN plan VARCHAR DEFAULT 'free';
```

This single field means introducing a paid tier later is "add a new plan value and check it in your rate limiter," not "add a plan concept that didn't exist anywhere in the schema." Cheap insurance, no billing complexity required today.

## Personal Mode: This Module Is Mostly a Confirmation

For nearly every personal API product, the correct output of this module is: usage tracking exists (feeds rate limiting), a `plan` field exists on the owner model defaulting to free, and no payment processor integration happens until there's a real, validated reason to add one — ideally informed by actual usage data from **Analytics** in Phase 6.

## AI Prompt: Sanity-Check the Deferral

```
My current monetization model: free with rate limits (from Monetization Strategy)
My owner/caller data model: "[paste relevant part of your schema]"

1. Confirm I have basic usage tracking sufficient to enforce my rate limits.
2. Suggest the minimal schema addition (like a plan field) that would make adding paid tiers later a small change rather than a rework.
3. Confirm I don't need any payment processor integration for this MVP.
```

## Before You Continue

- [ ] I've confirmed "free with limits" is still the right model for now
- [ ] My owner model has a `plan` field, even if every caller defaults to `"free"`
- [ ] I understand I'd use a processor like Stripe, never build payment handling myself, if this ever changes

When all three are checked, move to **Usage Tracking**.
