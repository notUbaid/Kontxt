---
title: Cost Estimation
slug: cost-estimation
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 20-25 min
---

# Cost Estimation

This closes out Phase 2. Every architecture decision you've made so far — backend, database, auth, push, deep linking, file storage, analytics — has a cost shape attached to it. This module pulls those together into a single estimate, before you write a line of Phase 3 code, so a pricing surprise doesn't surface after launch when it's expensive to fix.

The goal isn't a precise number. It's catching the decision that looks fine at prototype scale and breaks your unit economics at 10,000 users.

---

## Why This Belongs in Architecture, Not After Launch

> ⚠️ Cost is an architecture property, not an operations afterthought. Two systems that behave identically to users can have wildly different cost curves depending on whether reads hit a cache or your database, whether files are served from origin or a CDN, and whether you send push notifications one-at-a-time or batched. Estimating cost now is how you catch a bad architectural choice while it's still cheap to change.

---

## Build Your Cost Model in Two Layers

**Layer 1 — Fixed costs.** Things you pay regardless of user count: domain, base hosting tier, your time. Usually small and predictable.

**Layer 2 — Variable costs.** Things that scale with usage: database reads/writes, file storage + egress, push notification volume, analytics events, compute for background workers. This is the layer that determines whether your unit economics work, and it's the one worth modeling carefully.

> 💡 The question that matters isn't "what will this cost at launch" — it's "what does this cost **per active user**, and does that number make sense against your monetization model." A free app supported by ads needs a very different cost-per-user ceiling than a $20/month subscription product.

---

## Decision 1 — Map Each Architecture Choice to Its Cost Driver

Go through your earlier Phase 2 decisions and identify the variable that drives cost for each:

| Component | Cost Driver | Where You Decided This |
|---|---|---|
| Backend hosting | Compute time / request volume | Backend module |
| Database | Storage + read/write operations, connection count | Database module |
| Auth provider | Monthly active users (most charge per MAU above a free tier) | Authentication module |
| Push notifications | Send volume (provider) + worker compute (your infra) | Push Notifications module |
| File storage | GB stored + GB egress | File Storage module |
| Analytics | Event volume | Analytics Strategy module |
| Deep linking platform (if using Branch/AppsFlyer) | Monthly active users / link clicks | Deep Linking module |

> ⚠️ **The cost driver that surprises teams most often is egress (data transfer out), not storage.** Storing 100GB of video is cheap on almost every provider. Serving that 100GB to users repeatedly is where the bill grows — which is exactly why the File Storage module steered you toward a provider with low/zero egress fees and a CDN in front of it. If you skipped that reasoning, revisit it now with real numbers.

---

## Decision 2 — Model Three Scale Points

Don't estimate for one number. Estimate for three, so you know where the curve bends:

| Scale Point | Why It Matters |
|---|---|
| **Launch (e.g. 100-1,000 users)** | Confirms you're not overpaying for infrastructure you don't need yet |
| **Traction (e.g. 10,000 users)** | The point where free tiers run out and real costs begin — this is the number that matters most |
| **Scale (e.g. 100,000 users)** | Confirms no component has a cost curve that breaks your business model — catch exponential cost growth here, on paper, not in a billing alert |

For each scale point, estimate: backend compute, database, auth MAU fees, push send volume, storage + egress, analytics events. Most providers publish pricing calculators — use them rather than guessing.

> 💡 Pay special attention to which costs are **linear** (predictable, e.g. $X per 1,000 events) versus which have **step-function cliffs** (a free tier that ends and jumps to a much higher tier). Step-function pricing is what causes "we were fine, then suddenly weren't" billing shocks — know exactly where those cliffs sit for every provider you've chosen.

---

## Decision 3 — Identify Your Single Largest Cost Driver

For most mobile apps, it's one of:

- **File storage/egress**, if the app is media-heavy (photo/video sharing, content apps)
- **Database operations**, if the app is read/write-heavy with complex queries (social feeds, real-time features)
- **Third-party API costs**, if you're calling an LLM, maps API, or other metered external service per-request
- **Push notification infrastructure**, rarely the dominant cost itself, but the queue/worker compute behind it can add up at scale

> 💡 Once you know your dominant cost driver, that's the one component worth the most architectural scrutiny. A 20% efficiency improvement on your dominant cost driver matters more than optimizing every other line item combined.

---

## Decision 4 — Build In Margin, Not Just Coverage

If this app is commercial, your cost estimate needs to inform pricing, not just confirm you can afford to run it.

- Calculate cost-per-active-user at your traction scale point.
- Compare against your monetization model (subscription price, ad revenue per user, transaction take rate) — if cost-per-user approaches or exceeds revenue-per-user, that's an architecture conversation to have now, not a pricing crisis to have at scale.
- Leave headroom for the unpredictable: a viral spike, an abusive user spamming uploads, a bug that causes a retry storm against a paid API. Rate limiting (Phase 4) exists partly to protect your cost model, not just your servers.

---

## Cost Optimization Levers, Ranked by Effort

| Lever | Effort | Impact |
|---|---|---|
| Add a CDN in front of storage/static assets | Low | High, if media-heavy |
| Batch operations (push sends, DB writes) instead of per-item calls | Low-Medium | Medium-High |
| Set appropriate cache TTLs to reduce database/API load | Low | Medium |
| Choose pricing-efficient providers up front (the decisions in this phase) | None — it's a choice, not a fix | Highest — cheapest to do, hardest to retrofit |
| Migrate providers after launch | High | Varies, often not worth the migration cost unless the gap is severe |

This table is in order on purpose: the cheapest possible cost optimization is making the right provider choice during architecture, before any usage data exists to migrate away from. Everything below that line is cleanup.

---

## AI Prompts

### Prompt 1 — Cost Model Build

```
Build a cost estimate for a production mobile app with this architecture:

Backend: [provider/framework]
Database: [provider]
Auth: [provider]
Push notifications: [provider]
File storage: [provider]
Analytics: [provider]

Estimate monthly cost at 1,000 / 10,000 / 100,000 active users.
For each component, identify whether its pricing is linear or has
free-tier cliffs, and call out the single largest cost driver at
the 10,000-user scale point.
```

### Prompt 2 — Cost-vs-Monetization Check

```
Our cost-per-active-user at [scale point] is approximately [$X].
Our monetization model is: [subscription price / ad model / take rate].

Is this cost structure sustainable? Identify the architecture component
contributing most to cost-per-user, and suggest specific changes that
would reduce it without degrading the product experience.
```

---

## Validating AI Output

- [ ] Estimate covers at least three scale points, not just current/launch scale
- [ ] Every Phase 2 architecture decision (backend, DB, auth, push, storage, analytics) is accounted for, not just the obvious ones
- [ ] Free-tier cliffs are explicitly identified, not folded into a single linear estimate
- [ ] The single largest cost driver is named, not buried in a flat list
- [ ] Cost-per-active-user is calculated and compared against your actual monetization model
- [ ] Recommendations focus on architecture-level fixes, not just "upgrade your plan"

---

## Phase 2 Complete

You've now made every major architecture decision for this app: platform strategy, stack, backend, database, auth, API strategy, state management, offline strategy, push notifications, deep linking, file storage, analytics, and cost. These decisions form the spec Phase 3 builds against.

**Before moving to Phase 3 — Development:** revisit any module where you left a decision unresolved or marked "revisit at scale." Phase 3 will move faster and produce better AI-generated code if every architectural question has a clear, written answer behind it rather than being decided ad hoc mid-implementation.
