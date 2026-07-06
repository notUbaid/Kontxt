---
title: API Gateway
slug: api-gateway
phase: Phase 2
mode: personal
projectType: api-product
estimatedTime: 10 min
---

# API Gateway

"API Gateway" often conjures a heavyweight piece of infrastructure — a separate service sitting in front of your API doing routing, auth, and rate limiting at scale. For a personal API product, you don't need a separate gateway service. You need the *concept* a gateway represents: one consistent entry point where cross-cutting concerns happen before a request ever reaches your business logic. This module is about applying that concept correctly, not about standing up new infrastructure.

## What a Gateway Actually Does, Conceptually

| Concern | What it means for your API |
|---|---|
| Single entry point | All requests hit the same base URL and pass through the same initial pipeline |
| Cross-cutting concerns applied consistently | Auth, rate limiting, logging happen identically regardless of which endpoint is being called |
| Routing | Requests get directed to the correct handler based on path and method |

You already designed the pipeline that fulfills this in **API Fundamentals** — auth, rate limit, authorization, validation, business logic, response. "API Gateway," for your purposes, just means: this pipeline runs consistently for every single request, with no endpoint able to skip a step.

## In-Process Middleware Is Your Gateway

For a personal-scale API, your framework's middleware/interceptor system (Express middleware, FastAPI dependencies, etc.) *is* your gateway. You don't need a separate service like Kong, AWS API Gateway, or a managed gateway product — that's infrastructure that earns its cost at a scale and team size you're not at.

```
app.use(rateLimitMiddleware)
app.use(authMiddleware)
// Then routes, each of which uses the authorization check from the previous module
app.get('/subscriptions/:id', authorize, getSubscriptionHandler)
```

The value of framing this as "gateway thinking" even without separate infrastructure: it keeps you from accidentally implementing auth or rate limiting differently across different route files, which is exactly the inconsistency a real gateway exists to prevent.

> **Tip:** If two endpoints in your codebase implement authentication slightly differently, you've lost the benefit of gateway thinking even without ever having built a "gateway." The architecture matters more than the label.

## When You'd Actually Need a Separate Gateway Service

Genuinely not yet, for a personal project — but worth knowing the real signals so you recognize them if this project grows:

- You're running multiple separate backend services and need one consistent entry point across all of them
- You need gateway-level features specific to a cloud platform (like AWS API Gateway integrating directly with Lambda)
- You need to rate-limit or authenticate before requests even reach your application code, at a scale where in-process middleware isn't fast enough

None of these apply to a single-service personal API. Revisit this if your project's scope genuinely changes — don't add gateway infrastructure preemptively.

## Personal Mode: Consistency Over Infrastructure

The entire value of this module is one idea: **every request goes through the same pipeline, in the same order, with no exceptions carved out per-endpoint.** That's free — it costs you nothing but discipline in how you structure your middleware. Don't spend time evaluating gateway *products* for a project that doesn't need one yet.

- [ ] Every route in my API passes through the same auth + rate limit + authorization middleware chain
- [ ] No endpoint has a special-cased or duplicated version of these checks
- [ ] I understand this is a structural pattern, not infrastructure I need to provision

## AI Prompt: Verify Consistent Application

```
Here's my planned route structure and middleware setup: "[paste your route file structure or planned middleware chain]"

1. Confirm every route passes through the same auth, rate limiting, and authorization middleware — flag any route that looks like it might skip a step.
2. Suggest how to structure this in [your framework from Tech Stack Selection] so it's structurally hard to add a new endpoint without the standard middleware chain.
```

## Before You Continue

- [ ] I understand "gateway" here means consistent middleware ordering, not new infrastructure
- [ ] Every endpoint passes through identical auth/rate-limit/authorization steps
- [ ] I know the specific signals that would mean I actually need separate gateway infrastructure later

When all three are checked, move to **Routing**.
