---
title: API Fundamentals
slug: api-fundamentals
phase: Phase 2
mode: personal
projectType: api-product
estimatedTime: 15 min
---

# API Fundamentals

Phase 1 designed your API's contract — resources, requests, responses, errors. Phase 2 builds the system that fulfills that contract. Before touching a tech stack or a database, this module makes sure the underlying architectural style is a deliberate choice, not a default you never actually decided on.

## REST Is Still the Right Default

You'll see GraphQL, gRPC, and RPC-style APIs recommended for various use cases. For a personal API product with a contract you already designed in Phase 1 — resource-based, HTTP verb-driven — **REST remains the correct choice**, not because it's trendy, but because it's what your entire Phase 1 design already assumes.

| Style | When it actually wins | Why it's not your default here |
|---|---|---|
| **REST** | Resource-oriented APIs, broad client compatibility, what you already designed | — |
| **GraphQL** | Clients need flexible, varying data shapes per request (e.g. many different frontend views) | Solves a problem — over/under-fetching across many diverse clients — you likely don't have with one or two known callers |
| **gRPC** | High-performance service-to-service calls, strongly-typed internal systems | Poor fit for public-facing APIs meant to be called from browsers/scripts easily |

Don't revisit this choice because a technology is popular. Revisit it only if a real requirement from Phase 1 doesn't fit REST — and if you've followed the previous modules, it does.

## Statelessness Is the Architectural Rule That Matters Most

Every request must carry everything needed to process it — your server shouldn't rely on remembering anything about a previous request from the same caller (no server-side sessions tied to a specific server instance). This single rule is what makes your API able to scale horizontally later without a rewrite.

> **Tip:** If you ever catch yourself thinking "I'll just store this in a variable on the server between requests," stop — that's session state creeping in. Use your database or the request itself, never in-memory server state tied to one instance.

Practically, for your API: every request authenticates via the API key in its header (not a login session), and every piece of context the handler needs comes from the request or the database — never from "what happened last time this caller called."

## The Request Lifecycle You're About to Build

Every request to your API will move through the same pipeline, regardless of endpoint. Naming these layers now makes Phase 3 implementation systematic instead of ad hoc:

```
Request
  → Authentication (valid API key?)
  → Rate limiting (under their quota?)
  → Authorization (allowed to access this specific resource?)
  → Validation (request body/params match spec?)
  → Business logic (the actual work)
  → Response formatting (matches your Response Design envelope)
```

Each layer should be independent and reusable across endpoints — this is what middleware/interceptor patterns exist for, and you'll wire this up concretely in **Tech Stack Selection** and **Authentication Implementation**.

> **Warning:** A common beginner mistake is mixing these layers together — checking auth *inside* a business logic function, or validating input *after* touching the database. Keep them as separate, ordered steps. It makes bugs easier to isolate and means adding a new endpoint doesn't mean re-writing auth logic from scratch.

## Idempotency: Know Which Methods Need It

`GET`, `PUT`, and `DELETE` should be idempotent — calling them multiple times with the same input produces the same end state. `POST` typically is not — calling it twice creates two things. This matters concretely: if a caller's request times out and they retry, a non-idempotent `POST` could double-create a resource. Worth keeping in mind now; you'll handle this practically in Phase 3 if any of your use cases involve retryable creates (like payment-adjacent actions).

## Personal Mode: You Don't Need to Justify REST Beyond This

You're not writing an architecture decision record for a team. This module exists so you understand *why* REST fits, not to produce another document. Internalize statelessness and the layered request lifecycle — those are the two ideas that will save you real debugging time in Phase 3.

## AI Prompt: Confirm REST Fits Your Specific API

```
Here's my API's resource list and use cases: "[paste from API Resources / MVP Scope]"

1. Confirm REST is the right architectural fit here, or flag if any specific use case would genuinely be better served by GraphQL or another style.
2. Walk through the request lifecycle (auth → rate limit → authorization → validation → logic → response) for my primary endpoint, [METHOD] [path], and confirm the ordering makes sense for my specific case.
3. Flag any of my planned endpoints where idempotency matters and I should be careful about duplicate requests.
```

## Before You Continue

- [ ] I understand why REST fits my already-designed contract, not just that it's common
- [ ] I understand statelessness means no server-side session state between requests
- [ ] I can name the six layers a request passes through, in order

When all three are checked, move to **Tech Stack Selection**.
