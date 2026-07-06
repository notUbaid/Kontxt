---
title: API Resources
slug: api-resources
phase: Phase 1
mode: personal
projectType: api-product
estimatedTime: 15–20 min
---

# API Resources

A resource is the noun your API is organized around — `Forecast`, `Subscription`, `Webhook`. Get your resources right and endpoints, routes, and even your database schema almost design themselves. Get them wrong — too many, too few, or the wrong boundaries — and every module after this one fights against the mistake.

You already have raw material for this from **API Use Cases**: the nouns you pulled out then are your resource candidates now. This module turns candidates into a real, deliberate resource model.

## What Makes Something a Resource

A resource is something a caller would want to fetch, create, update, or delete on its own — something with an identity that persists across requests. Test each candidate:

- **Does it have its own identity?** (an ID, a URL you could bookmark) → likely a resource
- **Would a caller ever want just this, without its parent?** → likely its own resource
- **Is it just a property of something else?** (a status, a flag, a count) → not a resource, it's a field

Example: in a weather API, `Forecast` is a resource — it has an identity, callers fetch it directly. `Temperature` is not a resource — it's a field on `Forecast`. Getting this distinction right early prevents an API where everything, including simple properties, awkwardly has its own endpoint.

## Naming Resources Well

Resource names are the first thing a caller judges your API by, before they've made a single request. Industry convention, used by APIs like Stripe and GitHub, exists for a reason — deviating from it costs you nothing in flexibility and costs callers real confusion.

| Convention | Do | Avoid |
|---|---|---|
| Plural nouns | `/forecasts`, `/subscriptions` | `/forecast`, `/getSubscriptions` |
| Nouns, not verbs | `/subscriptions` | `/createSubscription` |
| Consistent casing | `snake_case` or `camelCase` — pick one | Mixing both across resources |
| Nesting reflects real ownership | `/subscriptions/{id}/webhooks` if webhooks belong to a subscription | Nesting things that don't actually belong to each other |

> **Tip:** If you're unsure how to name or structure something, check how Stripe does it. Their API is widely considered a gold standard for resource design specifically because these decisions are so consistent throughout.

## Mapping Resources to Relationships

Once you have your resource list, sketch how they relate — this determines your nesting and, later, your database foreign keys.

```
Resource Map:

[Resource A] ──1:many──> [Resource B]
[Resource B] ──1:1─────> [Resource C]
```

Example: a `Subscription` (1) has many `Webhook Events` (many). A `Forecast` (1) belongs to one `Location` (1). Draw this now, even roughly — it surfaces relationship questions (ownership, cascading deletes, access control) before they become bugs in Phase 3.

## Personal Mode: Resist Over-Modeling

It's tempting to model every conceivable entity now — `User`, `Team`, `Organization`, `Plan` — because "real" APIs have them. Check each one against your MVP scope from Phase 0. If a resource only matters for a use case you explicitly excluded, leave it out. Adding an unused resource now means unused database tables, unused endpoints, and unused auth logic later — pure cost, no benefit, for a personal project.

- [ ] Every resource on my list is required by a Core use case from MVP Scope
- [ ] I have 2–5 resources, not 10+
- [ ] Names follow one consistent convention throughout

## AI Prompt: Validate the Resource Model

```
My API's core use cases: "[paste from MVP Scope / PRD]"

My draft resource list and relationships:
[paste your resource map]

Review this:
1. Is every resource here actually required by one of my use cases, or is anything speculative?
2. Am I missing a resource that's implied by these use cases but I haven't named yet?
3. Are my naming conventions (plural nouns, casing) consistent across the whole list?
4. Does my nesting reflect genuine ownership, or am I nesting things that should be independent?
```

## Before You Continue

- [ ] I have a final resource list, each one justified by a real use case
- [ ] I've sketched relationships between resources (1:1, 1:many)
- [ ] Naming is consistent — plural nouns, one casing convention

When all three are checked, move to **Endpoint Planning**.
