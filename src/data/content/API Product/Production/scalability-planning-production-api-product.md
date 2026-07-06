---
title: Scalability Planning
slug: scalability-planning
phase: Phase 4
mode: production
projectType: api-product
estimatedTime: 25-30 min
---

# Scalability Planning

Disaster Recovery prepared you for failure. This module prepares you for the opposite problem — success arriving faster than your architecture can absorb it. A traffic spike from a customer's product going viral has taken down more APIs than most actual attacks, because nobody planned for it being a problem at all.

## The Decision You're Actually Making

Not "how do we make this infinitely scalable." It's: **where is this system's first real bottleneck going to appear, and is the cost of fixing it now worth it compared to fixing it when it actually happens?**

Premature scalability work is real waste — solving for 10 million requests/day when you have 10,000 spends engineering time you don't have on a problem you don't have yet. The skill is identifying which bottlenecks are cheap to prevent now versus which are fine to defer.

## The Bottleneck That Almost Always Hits First

For the overwhelming majority of API products, the database is the first real scaling constraint — not your application servers, which are usually trivial to horizontally scale behind a load balancer.

| Component | How easily it scales | Typical first bottleneck |
|---|---|---|
| Application servers | Easy — add more instances behind a load balancer | Rarely the first problem |
| Database (writes) | Hard — requires architectural decisions, not just more hardware | Usually the actual first bottleneck |
| Database (reads) | Medium — read replicas help significantly | Second bottleneck, after writes |
| Cache layer | Easy to add, hard to retrofit cleanly later | Often missing until it's urgently needed |

> **️ Warning:** Don't spend early scaling effort on application server architecture (microservices, complex orchestration) when your actual constraint will be the database. This is one of the most common premature-optimization patterns in API products — solving the easy-to-scale part elaborately while ignoring the part that will actually break first.

## Decision: Scale Up vs Scale Out, and When Each Applies

| Strategy | What it means | When it's the right call |
|---|---|---|
| Vertical (scale up) | Bigger database/server instance | Fast, simple, buys real time — almost always the right first move |
| Horizontal (scale out) | More instances, read replicas, sharding | Needed once vertical scaling hits a ceiling or cost curve |

> ** Best Practice:** Scale vertically first, every time, until it genuinely stops working or becomes cost-prohibitive. A bigger database instance is a five-minute change with no architectural risk. Horizontal scaling (read replicas, sharding) introduces real complexity — consistency concerns, routing logic, operational overhead — that you should only take on once vertical scaling is actually insufficient, not preemptively.

## Designing Now for Cheap Insurance Later

Some scalability decisions are nearly free if made early and expensive if retrofitted later. These are worth doing now, before you need them:

- [ ] Database queries use indexes appropriately — verified, not assumed, via actual query plans
- [ ] No N+1 query patterns in core endpoints (one query per item in a list, instead of one batched query)
- [ ] A caching layer (Redis or similar) exists in the architecture, even if lightly used today
- [ ] Stateless application servers — no in-memory session state that prevents horizontal scaling later
- [ ] Database connections are pooled, not opened fresh per request

> ** Tip:** Stateless application servers cost nothing extra to design correctly from the start, but retrofitting a stateful application to be horizontally scalable later often requires a significant rewrite. This is the cheapest insurance policy in this entire module — get it right now regardless of current scale.

## What to Deliberately Defer

| Premature at most stages | Defer until you have evidence you need it |
|---|---|
| Database sharding | Until a single, well-indexed, vertically-scaled database genuinely can't keep up |
| Multi-region active-active | Until customer base or compliance genuinely requires regional presence |
| Microservices decomposition | Until a monolith's deploy/team-coordination pain is real, not hypothetical |
| Custom-built caching infrastructure | Until off-the-shelf Redis/Memcached patterns are proven insufficient |

> **️ Warning:** Sharding a database before you need to is one of the most expensive mistakes in API engineering — it adds permanent complexity (cross-shard queries, rebalancing, routing logic) to every future feature, for a scale problem you may never actually reach. Don't shard until vertical scaling and read replicas are both demonstrably insufficient.

## Identifying Your Actual Bottleneck Before It Hits

Don't guess where scaling problems will appear — load testing (covered in the prior module) and production monitoring (covered earlier in this phase) tell you directly.

> ** Best Practice:** Treat your load testing results as the actual scalability plan input, not a separate exercise. If load testing shows your database connection pool exhausting at a specific concurrency level, that's not a hypothetical future bottleneck — it's a known, measured one, and it tells you exactly what to fix first.

## Designing for Graceful Degradation, Not Just Capacity

Scalability planning isn't only "handle more load" — it's also "fail in a controlled way when load exceeds what you planned for."

- [ ] Define what gets shed first under extreme load (non-critical features, lower-priority endpoints) versus what must stay up (core write/read paths)
- [ ] Circuit breakers exist on calls to third-party dependencies, so their slowness doesn't cascade into your own outage
- [ ] Queue-based processing for non-time-critical operations, so a traffic spike queues work instead of dropping or timing it out

> ** Tip:** A system that gracefully returns "temporarily degraded, core features still work" under extreme load is far better than one that returns 500s for everything once any single component is overwhelmed. Decide your degradation priority list before a spike forces an improvised decision.

## Use AI to Find Your Likely First Bottleneck

**Prompt — Scalability Bottleneck Analysis**
```
Here's my current architecture: [describe stack, database, caching, 
and current/expected traffic levels].

Based on this, identify:
1. The single most likely first bottleneck as traffic grows, and 
   roughly what scale it would appear at
2. Any "cheap now, expensive later" architectural decision I should 
   make today, even at current scale
3. Anything in this architecture I should explicitly NOT optimize yet, 
   because it's premature for this scale

Be specific about reasoning, not just a generic scalability checklist.
```

> ** Token Efficiency:** Include actual or projected traffic numbers in the prompt. Without real numbers, the response defaults to generic "add caching, add replicas" advice that doesn't tell you what's actually worth doing now versus later for your specific situation.

## Validate Before Moving On

- [ ] You can name your application's most likely first bottleneck, with reasoning, not a guess
- [ ] Application servers are confirmed stateless and can scale horizontally without code changes
- [ ] Database queries have been checked for missing indexes and N+1 patterns on core endpoints
- [ ] A graceful degradation plan exists for what happens under load beyond current capacity
- [ ] You've explicitly listed what you're deliberately NOT building yet, and why

## Common Mistakes

- Building microservices or sharding before a monolith and single database have actually proven insufficient
- Stateful application servers that block horizontal scaling, discovered only when scaling is urgently needed
- No caching layer until a crisis forces a rushed implementation under pressure
- Treating all load failures the same way (full outage) instead of designing graceful degradation
- Scaling decisions made on guesses instead of actual load testing and monitoring data

## Quick Reference

| Do now, cheap | Defer until proven necessary | Avoid by default |
|---|---|---|
| Stateless app servers | Read replicas | Database sharding |
| Connection pooling | Horizontal app server scaling | Multi-region active-active |
| Index verification, N+1 fixes | Dedicated caching infrastructure scale-up | Microservices decomposition |
| Basic circuit breakers | Queue-based async processing at scale | Custom-built scaling orchestration |

## What's Next

Production readiness is complete — the API is secure, observable, recoverable, and prepared to scale deliberately rather than accidentally. The next phase shifts to Developer Experience: building the documentation, SDKs, and tools that determine whether developers can actually discover and use everything you've built.
