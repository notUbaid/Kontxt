---
title: Authorization Strategy
slug: authorization-strategy
phase: Phase 1
mode: personal
projectType: api-product
estimatedTime: 15 min
---

# Authorization Strategy

Authentication answered *who is calling*. Authorization answers a different question: *what are they allowed to do, and to whose data?* Conflating the two is one of the most common — and most dangerous — mistakes in API design. A valid API key proves identity. It doesn't automatically prove the caller should see every row in your database.

## The Question Every Endpoint Needs Answered

For every endpoint in your list, ask: **can this caller only access their own data, or is some data genuinely shared/public?**

| Pattern | Example | Design implication |
|---|---|---|
| **Owner-only** | A caller's own subscriptions | Every query filters by the authenticated caller's ID — never trust a path parameter alone |
| **Public read** | A public forecast lookup | No ownership check needed, but still needs auth for rate limiting/tracking |
| **Shared/scoped** | Data visible to a team, not just one caller | Requires an explicit membership or permission check, not just ID matching |

Most personal API products are almost entirely owner-only. That's the simplest and safest default — design for it explicitly rather than assuming your auth layer handles it automatically. It doesn't; you have to write the check.

## The Mistake That Causes Real Breaches

This exact pattern is responsible for a large share of real-world API vulnerabilities (it has a name: **broken object-level authorization**, consistently one of the most common API security issues found in the wild):

```
GET /subscriptions/{id}
```

If your implementation fetches the subscription by `id` alone — without also checking that `id` belongs to the authenticated caller — any caller can read any other caller's data just by guessing or incrementing IDs. The endpoint *looks* correct. It requires a valid API key. It just never checks *whose* data it's returning.

> **Warning:** Authentication succeeding is not authorization succeeding. Every single endpoint that touches caller-specific data needs an explicit ownership check — `WHERE owner_id = authenticated_caller_id`, not just `WHERE id = requested_id`. This is worth writing into your Standards document from the previous module as a non-negotiable rule, not something you'll remember case by case.

## Decide Your Model Now

For an MVP, pick the simplest model that's actually correct — not the most impressive-sounding one.

- [ ] **Single-tenant per key** — each API key belongs to exactly one caller; every resource has an `owner_id`; every query filters by it. Correct default for almost every personal API product.
- [ ] **Role-based** — some callers have elevated permissions (admin vs. regular). Only add this if your use cases actually require different permission levels — don't build it speculatively.
- [ ] **Public + owner-mixed** — some endpoints are fully public (no ownership check needed), others are owner-only. Mark each endpoint from your list explicitly as one or the other.

## Personal Mode: Simple and Correct Beats Flexible and Risky

Skip building a full permissions/roles system unless a specific use case requires it. What you cannot skip, even at the smallest scale: every owner-only endpoint must check ownership, every time, with no exceptions carved out "because it's just me testing right now." The habit you build in a personal project is the habit you'll carry into anything bigger.

## AI Prompt: Audit Endpoints for Missing Checks

```
Here's my endpoint list: "[paste from Endpoint Planning]"

For each endpoint that returns or modifies a specific resource:
1. Should this be owner-only, public, or shared? Justify briefly.
2. If owner-only, confirm the check needs to be "resource belongs to authenticated caller," not just "resource exists."
3. Flag any endpoint where I might be tempted to skip this check because it "seems obviously fine."
```

Run this once your endpoint list is finalized — it's a security review, and it's worth the small extra prompt even on a personal project, because this exact gap is how real APIs leak real data.

## Before You Continue

- [ ] I've marked every endpoint as owner-only, public, or shared
- [ ] I understand ownership checks are separate from authentication and must be explicit
- [ ] I know my authorization model is the simplest one that's still correct for my use cases

When all three are checked, move to **Rate Limiting Strategy**.
