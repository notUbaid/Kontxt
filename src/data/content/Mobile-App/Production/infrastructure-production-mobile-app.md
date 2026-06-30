---
title: Infrastructure
slug: infrastructure
phase: Phase 4
mode: production
projectType: mobile-app
estimatedTime: 20–30 min
filename: infrastructure-production-mobile-app.md
---

Your mobile app is the part users see, but it's a thin client talking to backend infrastructure that does the real work — and unlike the app itself, you can change that infrastructure without waiting on a store release. Getting this right means your app stays fast and reliable as usage grows, without you having to think about servers every day.

## What "Infrastructure" Actually Means Here

For most production mobile apps, infrastructure breaks into four pieces:

| Layer | Responsibility | Common Choices |
|---|---|---|
| Compute | Runs your API/backend logic | Railway, Render, Vercel, AWS (ECS/Lambda) |
| Database | Persists user and app data | Postgres (Supabase, Neon, RDS), Firestore |
| Caching | Reduces load, speeds up repeat reads | Upstash Redis |
| Object storage | Media, uploads, static assets | S3, Cloudflare R2, Supabase Storage |

You don't need all of AWS on day one. You need infrastructure that matches your actual current scale, with a clear path to upgrade pieces independently as specific bottlenecks appear.

## Managed vs. Self-Hosted

For a production mobile backend run by a small team, managed infrastructure is almost always the right default.

> **Best Practice:** Every hour spent managing servers is an hour not spent on the product. Use managed services until you have a specific, measured reason (cost at scale, compliance requirement, unique performance need) to self-host any piece of this.

| Factor | Managed (Railway, Supabase, etc.) | Self-Hosted (raw AWS/GCP VMs) |
|---|---|---|
| Setup time | Hours | Days to weeks |
| Operational burden | Low | High — patching, scaling, backups all manual |
| Cost at small scale | Often cheaper | Often more expensive (you pay for idle capacity) |
| Cost at large scale | Can get expensive | Can be cheaper with dedicated ops effort |
| Control | Less | Full |

## Mobile-Specific Infrastructure Considerations

This differs from a typical web backend in a few important ways:

- **Geographic latency matters more.** Mobile users are everywhere, often on higher-latency networks. Deploy compute and use a CDN with edge presence close to your actual user base, not just your team's location.
- **Push notification infrastructure is its own dependency** (APNs for iOS, FCM for Android) — these are external services you don't control, so design for their occasional downtime or delay rather than assuming instant delivery.
- **Traffic patterns are bursty and unpredictable** — a viral moment or push notification campaign can spike traffic far faster than typical web growth, so auto-scaling (or at minimum, headroom) matters more than for a slow-growing internal tool.
- **Offline-first design shifts load** — if your app syncs in batches when connectivity returns, expect spiky write patterns rather than smooth, even traffic.

## Database Choices for Mobile Backends

| Need | Good Fit |
|---|---|
| Relational data, strong consistency | Postgres (Supabase, Neon, RDS) |
| Flexible schema, real-time sync built in | Firestore, Supabase Realtime |
| High-volume, simple key-value reads | Add Redis caching in front of your primary DB |

> **Tip:** Don't default to a NoSQL document database just because mobile data "feels flexible." Most app data (users, posts, transactions) has real relationships, and relational databases with a few JSONB columns for genuinely flexible fields cover the vast majority of mobile backend needs better than fighting denormalization in a pure NoSQL model.

## Caching Strategy

Caching matters more for mobile than you might expect, because every uncached read is a round trip over a network connection that's often slower and less reliable than what you tested on.

- Cache expensive or frequently-repeated queries (user profile, feed, config) in Redis with a sensible TTL
- Cache feature flags and remote config (see the Feature Flags module) so a flag-service hiccup doesn't block app behavior
- Set cache invalidation explicitly on writes that affect cached data — stale cache bugs are some of the hardest to debug because they look intermittent

## Designing for Scale Without Overbuilding

You don't need to design for millions of users on day one — you need to avoid decisions that make scaling painful later.

- [ ] Stateless API servers (no in-memory session state) so you can horizontally scale by adding instances
- [ ] Database connection pooling configured (a surprisingly common source of "works fine in dev, falls over in production" issues)
- [ ] Auto-scaling or at least clear manual scaling steps documented for your compute layer
- [ ] Read replicas considered only once read load, not write load, becomes the bottleneck — most apps hit other limits first

> **Warning:** Premature infrastructure complexity is as costly as none at all. Multi-region deployment, Kubernetes, or microservices for an app with a few thousand users adds operational overhead that slows you down without a corresponding benefit. Scale infrastructure complexity to actual measured load, not anticipated load.

## Disaster Recovery Basics

This deserves its own deeper module later, but the floor for production infrastructure is:

- Automated daily database backups, with at least one tested restore performed manually
- A documented (even if simple) plan for "primary compute provider is down" — even if that plan is just "we have a status page and a rollback target"

## Using AI Here

```
Help me design backend infrastructure for this mobile app.

Stack: [your backend framework]
Current scale: [users, requests/day — be honest, this changes the right answer a lot]
Growth expectation: [realistic, not aspirational]
Budget constraint: [if relevant]

Recommend:
- Compute provider and why
- Database choice and why
- Where caching genuinely helps vs. adds complexity for no benefit
- What I should explicitly NOT build yet, given current scale

Flag anything in this plan that would be expensive or painful to change later if I get it wrong now.
```

> **Validation:** Be skeptical of AI infrastructure recommendations that default to enterprise-scale patterns (Kubernetes, multi-region, microservices) regardless of your stated scale. Push back and ask explicitly: "Is this justified at my current scale, or are you over-engineering?"

## Common Mistakes

- Over-architecting for scale you don't have yet, burning time on complexity with no current payoff
- Self-hosting infrastructure with no specific reason, taking on operational burden a managed service would absorb
- No database connection pooling, causing production outages that don't reproduce in dev
- Ignoring push notification service downtime as a dependency you need to design around
- No tested backup/restore process — backups that have never been restored are unverified
- Choosing infrastructure based on what's resume-impressive rather than what the project actually needs

## Before You Move On

- [ ] Compute, database, caching, and storage choices are documented with reasoning
- [ ] Infrastructure complexity matches actual current scale, not aspirational scale
- [ ] Connection pooling is configured on the database layer
- [ ] Automated backups exist and have been test-restored at least once
- [ ] There's a documented (even if simple) plan for a compute or database outage

Next: **Scalability** — what specifically changes about this setup as real growth arrives.
