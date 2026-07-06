---
title: Scalability Planning
slug: scalability-planning
phase: Phase 4
mode: personal
projectType: marketplace
estimatedTime: 15 min
---

# Scalability Planning

Every module so far has told you, repeatedly, to defer scale-related infrastructure — no Redis, no read replicas, no caching layers — until you actually need them. This module is where that deferral gets formalized: not "ignore scale forever," but "know exactly what breaks first, and what you'll do about it, before it happens."

The goal isn't to build for scale now. It's to remove the panic from the moment scale actually arrives.

---

## The Honest Starting Point

> ** Core rule:** for a personal project, premature scaling work is a worse use of your time than the scaling problems it claims to prevent. Almost no personal marketplace project fails because it couldn't handle traffic. Many fail because the developer spent their limited time on infrastructure instead of features users actually wanted.

This module is deliberately about *planning*, not *building*. You're identifying your bottlenecks in advance so that when one shows up, you recognize it immediately and have a known next step — not scrambling to diagnose a brand-new problem under live pressure.

---

## What Breaks First, In Order

Marketplaces have a fairly predictable scaling order. Knowing this sequence tells you what to actually watch for, instead of guessing.

| Stage | What breaks | Why |
|---|---|---|
| 1. Database query performance | Search/browse pages slow down | Missing indexes, N+1 queries — covered in Performance Optimization |
| 2. Database connection limits | Intermittent connection errors under load | Most managed databases cap concurrent connections; a single server can exhaust this faster than you'd expect |
| 3. Single-server CPU/memory | Slow response times across the board | One process handling everything — auth, search, image processing — competing for resources |
| 4. Image/asset storage and delivery | Slow page loads, bandwidth costs | Already addressed via CDN in Performance Optimization, but cost scales with usage |
| 5. Database write contention | Order/payment race conditions under concurrent load | Two buyers trying to purchase the same listing simultaneously |

> ** Why order matters:** you'll hit #1 and #2 long before #3, #4, or #5 become relevant at personal-project scale. Spend your attention proportionally — don't solve problem 5 while problem 1 is still unaddressed.

---

## Decision: When to Actually Act

> ** Decision Card — Scaling Triggers**
>
> Don't scale on a feeling. Scale on a measured signal. Define your own thresholds now, while you're calm, so you recognize them later:
>
- **Database CPU consistently above 70-80%** → time to look at query optimization or upgrading your database tier, not before
- **API response times (p95) creeping past ~1 second** on core flows (search, checkout) → investigate before users start to feel it
- **Connection pool exhaustion errors appearing in your error tracker** → immediate action needed, not a "someday" item
- **Hosting bill growing faster than user/transaction growth** → re-evaluate architecture, not just throw more resources at it
>
> Until you hit one of these, building ahead of the signal is speculative work, not preparation.

---

## The Concurrency Problem Worth Solving Now

Most scaling concerns can wait. One can't: **two buyers purchasing the same listing at the same moment.** This isn't a high-traffic problem — it can happen with just two users, on day one, and it's a correctness bug, not a performance one.

```js
//  Race condition: both requests can pass this check before either updates status
const listing = await db.listing.findUnique({ where: { id: listingId } });
if (listing.status !== "active") throw new Error("No longer available");
await db.order.create({ data: { listingId, buyerId } });
await db.listing.update({ where: { id: listingId }, data: { status: "sold" } });

//  Atomic conditional update prevents both from succeeding
const result = await db.listing.updateMany({
  where: { id: listingId, status: "active" }, // only matches if still active
  data: { status: "sold" },
});

if (result.count === 0) {
  throw new Error("This listing is no longer available");
}
// Only the request that actually flipped the status proceeds to create the order
await db.order.create({ data: { listingId, buyerId } });
```

> **️ Warning:** this is the one item on this page that isn't optional or deferrable by scale. Unlike caching or read replicas, this bug doesn't require traffic to manifest — it requires two people clicking "buy" within milliseconds of each other, which can happen on a project with ten total users. Fix this regardless of your current scale.

---

## A Scaling Plan You Don't Have to Build Yet

This is the actual deliverable of this module: not code, but a short reference you can return to when a trigger above fires.

> ** Validation Checklist — Your scaling playbook**
- [ ] Database slow → check for missing indexes and N+1 queries first (cheapest fix, usually the actual cause)
- [ ] Connection errors → check your connection pool size/limits before assuming you need a bigger database tier
- [ ] Server CPU maxed → before adding servers, confirm it's not one inefficient endpoint dragging everything down
- [ ] Costs growing faster than usage → audit what's actually consuming resources before architectural changes
- [ ] Only after the above are ruled out → consider horizontal scaling (multiple server instances), Redis-backed caching/rate limiting, or a managed database tier upgrade

The order here matters: it's the same principle from Performance Optimization — cheap, targeted fixes before infrastructure investment.

---

## AI Prompt: Audit for Scale-Sensitive Bugs

> ** Copy Prompt**
>
> ```
> Review my marketplace code for correctness bugs that would surface under concurrent
> access, even at low traffic — not general performance issues, specifically race
> conditions and contention bugs.
>
> Specifically check for:
> 1. Any "check then write" pattern that isn't atomic (e.g. checking listing status,
>    then separately updating it — vulnerable to two simultaneous requests both passing
>    the check)
> 2. Any operation that should use a database-level unique constraint or conditional
>    update instead of application-level logic
> 3. Any place where two users could plausibly act on the same resource simultaneously
>    (purchasing a listing, submitting a review, starting a duplicate thread)
>
> Code and schema:
> [PASTE YOUR ORDER CREATION / CHECKOUT CODE AND SCHEMA]
>
> For each issue: explain the exact sequence of two concurrent requests that would
> trigger it, then show the atomic fix.
> ```
>
> **Why this prompt works:** it explicitly distinguishes concurrency correctness bugs from general performance optimization, which keeps AI from defaulting to caching/scaling suggestions (already covered elsewhere) and instead focused on the specific class of bug that matters regardless of your traffic level.

---

## Validating AI Output

> ** Common Hallucination:** AI sometimes suggests fixing race conditions by simply "adding a check before the write" — which is exactly the pattern that's already broken (see the warning above). A real fix uses an atomic database operation (conditional update, unique constraint, or transaction with proper isolation), not an earlier check in application code. If the suggested fix is still two separate steps, it hasn't actually solved the problem.

---

## Token Efficiency Tip

This module's prompt is worth running once, specifically against your checkout/purchase flow — it's the highest-value place to catch concurrency bugs early. You don't need to run a full scalability audit across your entire codebase; focus the review on the few endpoints where simultaneous action on the same resource is actually possible (purchases, status changes), not read-only endpoints.

---

## What You've Decided

By the end of this module you should have:

- A known order of what breaks first as your marketplace grows
- Defined, measurable triggers for when to actually act on scale — not vague intuition
- An atomic, race-condition-safe purchase flow, regardless of current traffic
- A short reference playbook for diagnosing the cheap causes before reaching for infrastructure
- Confidence that you're not over-building for scale you don't have yet

**Next:** Abuse Detection — identifying and responding to bad-actor behavior patterns across the platform.
