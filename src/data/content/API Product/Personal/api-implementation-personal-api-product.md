---
title: API Implementation
slug: api-implementation
phase: Phase 3
mode: personal
projectType: api-product
estimatedTime: 20–30 min
---

# API Implementation

Every module up to this point has been design and architecture. Nothing has been built. This is where that changes — and where the value of everything you've decided pays off directly: you're not implementing from vague intent, you're implementing against a precise, written contract. That's what makes this phase fast instead of full of new decisions made under pressure.

## What You're Actually Building, In Order

Don't build endpoint by endpoint in isolation. Build the pipeline first, then plug endpoints into it — matching the request lifecycle from **API Fundamentals**:

```
1. Project skeleton + framework setup (Tech Stack Selection)
2. Database connection + schema (Database Architecture)
3. Auth middleware (Authentication Architecture) — build and test this alone, first
4. Rate limit middleware (Rate Limiting Strategy)
5. One full endpoint, end to end — including authorization, validation, response shaping
6. Verify that one endpoint completely, then repeat the pattern for the rest
```

Building one endpoint completely — including auth, authorization, error handling, and a correctly-shaped response — before moving to the next is deliberately slower up front and faster overall. It catches integration problems (does your auth middleware actually pass the caller ID through correctly?) on endpoint one, not discovered simultaneously across ten endpoints later.

> **Tip:** Your first fully-working endpoint should be your MVP's most important one — the one behind your #1 use case from Phase 0. Everything else follows the same now-proven pattern.

## Using AI Effectively Here

This is where AI coding tools genuinely accelerate you — but only if you give them the context you've already built, rather than a vague description.

```
I'm implementing an endpoint for my API. Here's the exact spec:

Endpoint: [METHOD] [path]
Request: [paste from Request Design]
Response: [paste from Response Design]
Errors: [paste relevant error cases from Error Design]
Auth: this route requires [authenticate, authorize] middleware, in that order
Access type: [owner-only / public — from Authorization Architecture]

Implement this handler in [your framework], following the middleware pattern
already established in [reference an existing implemented endpoint if you have one].
Don't add fields, validation, or behavior not specified above.
```

That last line matters — AI tools left unconstrained tend to add "helpful" extras (extra fields, extra validation, extra error cases) that weren't in your design. You already made these decisions in Phase 1 and 2; the implementation's job is to match them exactly, not improve on them ad hoc.

## Validate Every AI-Generated Handler Against Your Spec

Before moving to the next endpoint, check the generated code against what you actually designed:

- [ ] Response shape matches your Response Design envelope exactly — no extra or missing fields
- [ ] Every error case from Error Design returns the correct status code and error shape
- [ ] Authorization check is present and correct for this endpoint's access type
- [ ] No hardcoded values that should come from request input or configuration

> **Warning:** AI-generated code that "looks right" and runs without errors isn't the same as code that matches your spec. A handler that returns a slightly different field name, or skips a validation rule you specified, will pass a casual glance and fail the first time a real caller depends on the exact contract you designed.

## Keep Endpoints Consistent With Each Other

As you implement more endpoints, periodically check that patterns established early are still being followed — it's easy for consistency to drift across a longer implementation session, especially across multiple AI conversations:

- [ ] Field naming convention (from API Standards) is consistent across every new endpoint
- [ ] Error responses follow the same shape everywhere, not just on the first endpoint you built
- [ ] Middleware ordering (auth → rate limit → authorization → validation) is identical across all routes

## Personal Mode: Working End-to-End Beats Polished-But-Partial

Get your Core endpoints (from **Feature Prioritization**) fully working, tested against your own spec, before adding any polish. A complete, correctly-behaving MVP with plain but correct responses beats a beautifully structured half-finished API — you can improve code quality once the contract is proven to work.

## AI Prompt: Review a Completed Endpoint Against Spec

```
My endpoint spec: [paste request/response/error spec for one endpoint]
My implemented code: [paste the handler]

Check line by line:
1. Does the response shape exactly match my spec — no extra, missing, or renamed fields?
2. Are all specified error cases handled with correct status codes?
3. Is the authorization check present and correctly scoped for this endpoint's access type?
4. Flag anything the code does that wasn't in my original spec.
```

## Before You Continue

- [ ] My auth and rate limit middleware are built and tested independently, before wiring into endpoints
- [ ] My first fully-implemented endpoint matches its spec exactly, verified field by field
- [ ] Every subsequent endpoint follows the same middleware and response patterns

When all three are checked, move to **Database Setup**.
