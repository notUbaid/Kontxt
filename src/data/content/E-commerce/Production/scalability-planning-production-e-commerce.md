---
title: Scalability Planning
slug: scalability-planning
phase: Phase 4
mode: production
projectType: ecommerce
estimatedTime: 25-30 min
filename: scalability-planning-production-e-commerce.md
---

# Scalability Planning

Everything else in this phase made your store secure, observable, and recoverable. This module asks a different question: what happens when traffic isn't normal anymore — a sale goes viral, a marketing email lands at the same minute for 50,000 people, a single product spikes on social media.

Scalability planning is not about handling more traffic in general. It's about identifying the specific points in an e-commerce system that break first under load, and deciding now what you'll do about each one — before it happens in front of paying customers.

---

## Why E-Commerce Scales Differently

Generic "scale your app" advice undersells how lopsided e-commerce traffic actually is. Three things make this harder than a typical CRUD app:

- **Traffic is bursty, not gradual.** A flash sale or a viral post doesn't ramp up — it's flat, then a cliff. Autoscalers tuned for gradual growth often react too slowly for this shape of spike.
- **Writes are concentrated, not just reads.** Browsing scales easily with caching. Checkout doesn't — every checkout is a write, often touching inventory, payment, and order records in the same transaction.
- **Correctness matters more than speed under load.** A slow page during a spike is annoying. An oversold product, a duplicate charge, or a lost order during a spike is a real financial and trust cost. Scaling decisions here have to protect correctness first, performance second.

> **Reframe:** You're not planning for "more users." You're planning for the specific moment your checkout path receives ten or a hundred times its normal concurrent write volume, and deciding what's allowed to bend and what's not allowed to break.

---

## Decision 1: Where Will You Actually Break First?

Don't scale everything uniformly — that wastes effort and money. Identify your real bottlenecks before deciding on solutions.

| Layer | Typical breaking point | Why |
|---|---|---|
| Application servers | High concurrent requests | Usually the easiest to fix — stateless servers scale horizontally with minimal effort |
| Database (writes) | Order/inventory writes under concurrency | Hardest to fix — most e-commerce outages trace back here |
| Database (reads) | Product catalog, search queries | Solvable with caching and read replicas |
| Payment processing | Third-party API rate limits, timeouts | Partially out of your control — your job is graceful handling, not raw scale |
| Session/cart storage | In-memory sessions tied to one server | Breaks horizontal scaling entirely if not externalized |
| Static assets (images) | Bandwidth and origin load | Solved almost entirely by a CDN, low effort |

> **Best Practice:** Rank these for your specific architecture before reading further. The fix for "application servers under load" and the fix for "database writes under load" are completely different engineering problems — don't apply a generic "add more servers" answer to a database bottleneck.

---

## Application Layer: The Easy Part

If your app servers are stateless — no session data stored in server memory, no local file writes — horizontal scaling here is close to a solved problem: add more instances behind a load balancer, let an autoscaler react to CPU/request metrics.

> **Warning:** The most common blocker isn't the scaling mechanism — it's hidden state. In-memory rate limiting, local caches, or session storage tied to a specific server instance will silently break the moment a user's requests land on a different instance. Audit for this explicitly before assuming your app layer is stateless.

Move anything stateful out to a shared layer:
- Sessions and cart data → Redis or your database, not server memory
- Rate limiting counters → a shared store (Redis), not in-process memory
- File uploads → object storage (S3 or equivalent), never local disk

---

## Database Layer: Where Real Engineering Happens

This is where most scaling effort should actually go, because it's where most real e-commerce outages originate.

### Reads: Solved with Caching and Replicas

Product catalog browsing, search, and category pages are read-heavy and tolerate slight staleness well. This is the easy 80%:
- Cache product listings and individual product pages aggressively (this overlaps with your Caching module — apply it here specifically to catalog data)
- Add read replicas for reporting and search queries so they never compete with checkout writes for database resources
- Use a CDN for fully static or rarely-changing pages

### Writes: The Hard 20%, and the Part That Actually Matters

Checkout, inventory updates, and order creation are write-heavy and **cannot tolerate staleness** — this is the part of your system where correctness under concurrency is non-negotiable.

> **The core problem:** two customers click "buy" on the last unit of a product within the same second. Without explicit handling, both checkouts can succeed, and you've oversold. This single scenario is responsible for more e-commerce engineering pain than almost anything else in this phase.

**Solutions, in order of typical adoption:**

| Approach | How it works | When to use |
|---|---|---|
| Atomic decrement | `UPDATE inventory SET stock = stock - 1 WHERE id = ? AND stock > 0`, check rows affected | Default choice — simple, correct, works at most solo/small-team scale |
| Optimistic locking | Version field on inventory row, reject the write if version changed since read | When you need more context in the conflict-handling logic than a single decrement allows |
| Distributed lock | Lock the inventory row externally (e.g. Redis lock) during the full checkout transaction | Only when checkout spans multiple systems and you can't do it in one atomic database operation |
| Queue-based checkout | Checkouts go through a queue, processed sequentially per product | High-traffic flash sales only — adds real complexity, don't reach for this by default |

> **Best Practice:** Start with atomic decrement at the database level. It's the simplest correct solution and handles the vast majority of real-world concurrency without adding architectural complexity. Only escalate to queue-based checkout if you have evidence (from load testing, below) that it's actually needed.

---

## Decision 2: Vertical vs. Horizontal Scaling

| | Vertical (bigger machine) | Horizontal (more machines) |
|---|---|---|
| Effort | Low — resize and restart | Higher — requires stateless design |
| Ceiling | Hard limit, eventually | Effectively unlimited |
| Cost curve | Gets expensive fast at the high end | More linear |
| Best for | Database (up to a point), early-stage simplicity | Application servers, anything stateless |

> **Tip:** Most solo and small-team production stores never need horizontal database scaling. A well-indexed database on a reasonably sized instance, with read replicas for reporting, handles far more load than people assume. Reach for vertical scaling and read replicas first — horizontal database scaling (sharding) is a last resort with significant complexity cost, not a default.

---

## Payment Processing: Plan for Graceful Degradation, Not Raw Scale

You don't control your payment provider's scale — you control how your system behaves when it's slow or briefly unavailable.

- **Idempotency keys on every payment request.** If a request times out and your system retries, an idempotency key guarantees the customer isn't charged twice. This is non-negotiable, not optional hardening.
- **Queue order finalization separately from payment confirmation.** Confirm the charge, then process order creation, inventory decrement, and email asynchronously. This shrinks the critical path during a spike and limits how much load the payment-adjacent code carries directly.
- **Timeout and retry with backoff**, not an infinite wait, if the payment provider is slow — a hung request holds a connection and a customer indefinitely.

> **Warning:** Missing idempotency on payment requests is one of the highest-cost mistakes possible at this phase. Under load, retries happen — from your own client, from a flaky network, from a customer double-clicking. Without an idempotency key, a retry becomes a duplicate charge.

---

## Load Testing: Replacing Assumptions With Evidence

Everything above is informed guessing until you've actually tested it. Scalability planning without load testing is a plan you haven't verified.

- Simulate your actual worst case: concurrent checkouts on a single low-stock product, not just generic homepage traffic
- Test at 2-3x your realistic peak estimate, not just your average traffic — spikes are the scenario you're planning for, not the average day
- Watch your database connection pool and CPU specifically during the test — this is almost always where the first real limit appears, before application servers show any strain
- Re-run after any fix — a load test that's never repeated only tells you about the version of the system that no longer exists

> **Common Mistake:** Load testing the homepage and calling it done. Homepage load tells you almost nothing about whether your checkout path survives a real spike — test the write-heavy path specifically, because that's where the actual risk lives.

---

## Using AI Effectively Here

Use AI to analyze your specific architecture for concurrency and bottleneck risks — not to generate a generic "scaling checklist" disconnected from what you actually built.

**📋 Copy this prompt:**

```
I'm doing a scalability review of a production e-commerce system before launch.

Stack: [your actual stack, e.g. "Next.js on Vercel, Postgres on Supabase, Redis for sessions, Stripe for payments"]
Current inventory update logic: [describe how stock decrements happen today, e.g. "simple UPDATE in the checkout handler, no locking"]
Current payment flow: [describe, e.g. "Stripe PaymentIntent created on checkout, confirmed client-side, order created on webhook"]
Expected worst case: [your realistic spike scenario, e.g. "200 concurrent checkouts on a single 50-unit product during a sale"]

Review this for:
1. Where overselling could occur under concurrent checkout, and whether my current approach actually prevents it
2. Whether my payment flow is idempotent against retries and duplicate webhook deliveries
3. Any hidden state in my app layer that would break horizontal scaling (in-memory sessions, local caches, in-process rate limiting)
4. The single highest-risk bottleneck in this specific architecture, not a generic list

Be specific about what could actually fail, not generic best practices I haven't asked about.
```

This prompt works because it gives AI your actual implementation details instead of asking for generic advice — generic scaling checklists are widely available and low-value; a review of your specific concurrency handling is not.

---

## Validating the Output

- [ ] Does the inventory update path use an atomic operation or explicit locking — not a read-then-write with no protection against concurrent access?
- [ ] Is every payment-creating request idempotent against retries?
- [ ] Is all session, cart, and rate-limit state externalized from application server memory?
- [ ] Have you load-tested the checkout path specifically, not just general page load?
- [ ] Does the plan distinguish reads (cache/replica-solvable) from writes (concurrency-control-solvable) instead of treating "scaling" as one undifferentiated problem?
- [ ] Is the proposed solution proportionate to your actual expected traffic, not over-engineered for a scale you don't have evidence you'll reach?

> **Tip:** If a scaling recommendation can't tell you which specific layer it addresses and which specific failure it prevents, treat it as unverified. Push back and ask for the mechanism.

---

## Quick Reference: Scalability Checklist Before Launch

- [ ] Application servers are stateless — sessions, cart, rate limits all externalized
- [ ] Inventory decrements are atomic or explicitly locked against concurrent checkout
- [ ] Payment requests carry idempotency keys
- [ ] Read-heavy queries (catalog, search) are cached or served from replicas
- [ ] Static assets and product images are served via CDN
- [ ] Database connection pooling is configured, not left at framework defaults
- [ ] Load test completed against the checkout path at 2-3x expected peak
- [ ] Autoscaling (if used) is tuned for burst traffic, not gradual ramp-up

---

## Before You Continue

- [ ] Identified your specific highest-risk bottleneck, not a generic list
- [ ] Inventory concurrency handling decided and implemented (atomic decrement at minimum)
- [ ] Payment flow confirmed idempotent against retries
- [ ] Load test run against the checkout path, results reviewed, fixes applied where needed
- [ ] No hidden state blocking horizontal scaling of application servers

**Next up — Phase 5, Store Launch:** Privacy Policy — the first of the legal and operational pieces that need to be in place before you open the store to real customers.
