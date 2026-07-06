---
title: Routing
slug: routing
phase: Phase 2
mode: personal
projectType: api-product
estimatedTime: 10 min
---

# Routing

Routing is how a URL and HTTP method get matched to the code that handles them. It sounds mechanical — and mostly is — but the way you *organize* routes is what determines whether adding endpoint #15 is as easy as endpoint #2, or whether your codebase has become a maze by the time you're implementing Phase 3.

## Organize by Resource, Not by Action

Your routes should mirror your resource model from **API Resources** directly — one file or module per resource, not one file per "type of thing" (like a single giant `routes.js` with everything in it, or files split by HTTP verb).

```
/routes
  subscriptions.js   → all /subscriptions endpoints
  webhooks.js        → all /webhooks endpoints
  forecasts.js       → all /forecasts endpoints
```

This mirrors the mental model a caller already has (they think in resources, per your Phase 1 design) and means when you're implementing or debugging "subscriptions," there's exactly one file to look in.

## Route Definitions Should Be Boring and Uniform

Every route registration should look structurally identical — same middleware chain order, same handler pattern. Boring, predictable routing code is a feature: it means anyone (including AI tools generating code for you) can extend it correctly by following the existing pattern.

```
router.get('/subscriptions', authenticate, rateLimit, listSubscriptions)
router.get('/subscriptions/:id', authenticate, rateLimit, authorize, getSubscription)
router.post('/subscriptions', authenticate, rateLimit, createSubscription)
router.patch('/subscriptions/:id', authenticate, rateLimit, authorize, updateSubscription)
router.delete('/subscriptions/:id', authenticate, rateLimit, authorize, deleteSubscription)
```

Notice which routes include `authorize` (anything touching a specific existing resource by ID) and which don't (list and create, per the audit table you built in **Authorization Architecture**). This consistency is what makes it immediately obvious, just from reading the route file, whether a given endpoint's authorization is correctly configured.

> **Tip:** If a route's middleware chain looks different from its siblings without an obvious reason, that's worth a second look — it's either a deliberate, documented exception or a mistake waiting to be found in testing.

## Path Parameters vs. Query Parameters, Applied Consistently

This connects to **Request Design** — make sure your actual route paths match what you specified there:

- `/subscriptions/{id}` — identifying a specific resource → path parameter
- `/forecasts?city=austin` — filtering a collection → query parameter

Getting this inverted (`/subscriptions?id=123` instead of `/subscriptions/123`) is a common inconsistency that makes an API feel unpolished, even though both technically work.

## Versioning Lives at the Top of Every Route

Per **Versioning Strategy**, every route gets the `/v1/` prefix — apply this once, at the router mount level, not repeated in every individual route definition:

```
app.use('/v1', v1Router)  // one place, not per-route
```

## Personal Mode: Don't Build Dynamic or Config-Driven Routing

Some frameworks and patterns let you generate routes dynamically from a config file or database schema. For a personal API with a fixed, deliberately-designed set of endpoints, this adds indirection without benefit — you know your exact endpoint list from **Endpoint Planning**; just write the routes directly. Dynamic routing solves a problem (many similar routes generated programmatically) you don't have at this scale.

- [ ] Routes are organized one file/module per resource
- [ ] Every route follows the same middleware ordering pattern
- [ ] Versioning prefix is applied once, at the mount point, not per-route

## AI Prompt: Generate Consistent Route Files

```
My endpoint list with access types: "[paste from Endpoint Planning / Authorization Architecture]"
My framework: [from Tech Stack Selection]

Generate route definitions:
1. One file per resource, following [framework]'s conventions
2. Consistent middleware ordering: authenticate, rateLimit, authorize (only where needed per my access-type table), then handler
3. Confirm the /v1/ prefix is applied at the mount point, not duplicated per route
```

## Before You Continue

- [ ] My route files are organized by resource, matching my resource model
- [ ] Every route's middleware chain is consistent with its access type
- [ ] Versioning is applied in exactly one place

When all three are checked, move to **API Keys**.
