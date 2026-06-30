---
title: Scalability
slug: scalability
phase: Phase 4
mode: production
projectType: mobile-app
estimatedTime: 20–30 min
filename: scalability-production-mobile-app.md
---

Scalability isn't a single upgrade you do once — it's a series of specific bottlenecks that appear in a fairly predictable order as your user base grows. The skill isn't building for infinite scale upfront; it's recognizing which bottleneck you're actually approaching and fixing that one, without prematurely solving problems you don't have yet.

## The Order Bottlenecks Usually Appear

Most production mobile apps hit pressure in roughly this sequence. Knowing the order helps you stop guessing what to fix next.

1. **Database read load** — slow queries, missing indexes, no caching
2. **Database write load** — connection exhaustion, lock contention on hot rows
3. **Compute/API capacity** — single instance maxed out, no horizontal scaling
4. **Background job throughput** — queues backing up (notifications, emails, async processing)
5. **Storage and bandwidth costs** — media-heavy apps especially feel this early
6. **Geographic latency** — global user base outgrowing a single-region deployment

> **Best Practice:** Scale the layer that's actually failing under real measured load — not the layer that sounds most impressive to redesign. Check your observability dashboards (from the Observability module) before assuming where the bottleneck is.

## Database Scaling

This is almost always the first real bottleneck, and the cheapest to delay if you build correctly from the start.

| Problem | Fix |
|---|---|
| Slow queries on growing tables | Add indexes on frequently filtered/sorted columns |
| Repeated identical reads | Cache in Redis with appropriate TTL |
| Read-heavy load on primary | Read replicas, once reads — not writes — are the bottleneck |
| Connection exhaustion under load | Connection pooling (PgBouncer or your provider's built-in pooler) |
| Large tables slowing everything | Partitioning or archiving old data, once tables genuinely justify it |

> **Warning:** Adding read replicas before you have a measured read-load problem adds replication lag complexity and operational cost for no current benefit. Confirm with actual metrics that reads, not writes, are your bottleneck before reaching for this.

## API / Compute Scaling

- **Vertical scaling first** (bigger instance) — simplest, works until it doesn't, and buys time to plan the next step properly
- **Horizontal scaling next** (more instances behind a load balancer) — requires stateless API design, which is why session state should never live in server memory (see the Infrastructure module)
- **Auto-scaling** based on CPU/request metrics once traffic is variable enough to justify the added complexity over fixed capacity

Most managed platforms (Railway, Render, Vercel) handle horizontal scaling and load balancing for you — confirm this is configured, not just assumed, before you actually need it under pressure.

## Background Jobs and Queues

Push notifications, email sending, image processing, and analytics ingestion shouldn't block the request that triggered them. As volume grows, a synchronous "do it inline" approach becomes your bottleneck even if the API itself scales fine.

- Move anything that doesn't need to complete before responding to the user into a background queue
- Monitor queue depth, not just whether jobs eventually complete — a growing backlog is an early warning sign before it becomes a user-visible delay
- Set retry policies with backoff for jobs that depend on flaky external services (push notification providers, third-party APIs)

## Caching as a Scaling Strategy

Caching is usually the highest-leverage scaling investment available — it reduces load on every downstream layer simultaneously, not just one.

- Cache expensive computed results (feeds, aggregations) not just raw database reads
- Cache at the edge/CDN for anything that's the same across users (public content, static config)
- Set explicit invalidation on writes — a cache that serves stale data after an update is a correctness bug, not just a performance shortcut

## Mobile-Specific Scaling Considerations

- **Push notification fan-out** at scale needs batching — sending 100,000 individual push calls synchronously will fall over; batch through your provider's bulk send API
- **Media-heavy apps** (photo/video sharing) hit storage and bandwidth costs early — use a CDN with on-the-fly resizing rather than storing and serving every resolution variant yourself
- **Sync-on-reconnect patterns** (common in offline-first apps) create bursty write load when many users reconnect simultaneously (e.g., after a regional outage) — design for this burst, not just steady-state load

## Cost Scaling Alongside User Scaling

Scalability isn't only "does it stay up" — it's also "does the cost stay sane as usage grows."

- [ ] Understand your cost-per-user at current scale and project it forward, not just current total spend
- [ ] Set billing alerts on every managed service before you need them, not after a surprise invoice
- [ ] Identify which costs scale linearly with users (acceptable) vs. which scale faster than linearly (a sign of an inefficient design that needs fixing before it gets expensive)

## What NOT to Do Yet

Premature scaling work is a real cost, not just wasted effort — it adds complexity that slows down every future change.

| Skip Until You Have the Problem | Because |
|---|---|
| Microservices | Adds massive operational overhead; a monolith scales further than people assume |
| Multi-region deployment | Most apps don't have global enough traffic to justify the complexity yet |
| Custom-built caching/queueing infra | Managed Redis/queue services handle this until you're at genuine enterprise scale |
| Database sharding | An extreme, hard-to-reverse step — exhaust indexing, caching, and read replicas first |

## Using AI Here

```
Help me identify the next scaling bottleneck for this mobile backend.

Current scale: [users, requests/day, growth rate]
Stack: [compute, database, caching as currently set up]
Observed symptoms: [slow queries / high latency / queue backlog / rising costs — be specific]
Relevant metrics: [paste any dashboard numbers you have]

Based on the typical bottleneck order (DB reads → DB writes → compute → background jobs → storage → geography),
identify which layer is most likely the actual constraint right now, and recommend the smallest change that
would relieve it — not a full re-architecture.
```

> **Validation:** Push back on any AI recommendation that jumps straight to a major re-architecture (microservices, sharding, multi-region) without first confirming simpler fixes (indexing, caching, connection pooling) have been tried. The smallest effective fix is almost always earlier in the bottleneck order than it feels.

## Common Mistakes

- Solving scaling problems you don't have yet (microservices, multi-region) while ignoring the actual current bottleneck
- Adding read replicas or sharding before confirming reads/writes are genuinely the constraint
- Sending push notifications synchronously and one-by-one instead of batched
- No billing alerts, discovering a cost scaling problem only after an expensive surprise
- Treating caching as optional rather than the highest-leverage scaling tool available
- Scaling compute vertically forever instead of moving to stateless horizontal scaling when it's actually needed

## Before You Move On

- [ ] Current bottleneck (if any) has been identified from actual metrics, not guessed
- [ ] Database has appropriate indexing and connection pooling before reaching for replicas
- [ ] API servers are stateless, enabling horizontal scaling when needed
- [ ] Background jobs handle anything non-blocking, with monitored queue depth
- [ ] Billing alerts are configured on all managed infrastructure services

Next: **Phase 5 — Store Deployment** begins with **Play Store Setup** — getting everything you've built in front of real users.
