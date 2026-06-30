---
title: API Fundamentals
slug: api-fundamentals
phase: Phase 2
mode: hackathon
projectType: api-product
estimatedTime: 12-18 min
---

# API Fundamentals

Phase 1 designed your API's contract — what callers send, what they get back. This module covers the structural concepts that contract depends on, before you pick a stack or write a route. Skip these and your AI tool will generate code that *runs*, but that you won't be able to debug live when something breaks mid-demo.

---

## The Request Lifecycle

Every request your API handles passes through the same stages, regardless of stack:

> **Quick Reference — Request Lifecycle**
> 1. **Routing** — match the URL + method to a handler
> 2. **Middleware** — auth check, body parsing, logging (runs before your logic)
> 3. **Handler** — reads the request, calls business logic
> 4. **Business logic** — the actual work (transform data, call the database)
> 5. **Response** — formatted per your locked Response Design

Knowing this sequence matters because when a demo breaks, you need to know *which stage* failed — a 401 means middleware rejected you before your logic ever ran; a 500 means your logic ran and threw an error. That distinction is the difference between a 10-second fix and a confused five minutes on stage.

---

## Statelessness: Why Your API Doesn't Remember Anything

A stateless API means every request must carry everything needed to process it — your server holds no memory of previous requests from that caller.

> **Tip — This is why your API key auth (Phase 1) works without sessions.**
> The caller sends their key on *every* request. The server never needs to "remember" that a caller logged in five minutes ago. This is simpler to build, simpler to debug, and is exactly why API key auth was the right call for your scope.

---

## Idempotency: Why POST and PATCH Behave Differently

An idempotent operation produces the same result no matter how many times you run it. This matters directly for live demos — if you accidentally hit a button twice or re-run a curl command, you need to know what happens.

| Method | Idempotent? | What that means for your demo |
|---|---|---|
| `GET` | Yes | Safe to refresh or re-run endlessly |
| `PATCH` | Should be | Re-running with the same body shouldn't change the outcome again |
| `POST` | No, by design | Re-running creates a *new* resource — expected, not a bug |

> **Warning — Don't panic if a re-run `POST` creates a duplicate during testing.**
> That's correct behavior, not broken code. If your demo script accidentally re-submits the same transcript twice, you'll get two transcript records — plan your demo script to avoid this, rather than trying to make `POST` idempotent (which solves a problem you don't have).

---

## Middleware: Don't Repeat Yourself Across Routes

Middleware is logic that runs before your route handlers, shared across multiple (or all) routes — auth checks, request body parsing, and error formatting are the three you'll actually need.

> **Decision Card — What belongs in middleware vs. in your handler**
> - **Middleware:** auth key validation, JSON body parsing, catching unhandled errors and formatting them per your locked error shape
> - **Handler:** the logic specific to *this* endpoint — reading the validated request, calling business logic, returning the response

Putting auth checks in every individual handler instead of one shared middleware is a common beginner pattern — it works at 3 endpoints and becomes a maintenance problem at 6, exactly when you have the least time to deal with it.

---

## A Minimal Layered Structure (Hackathon-Appropriate)

You don't need a large enterprise architecture. You need just enough separation that one broken piece doesn't take down your ability to debug everything else:

> **Quick Reference — Three layers, not ten**
> 1. **Routes** — just wiring: `POST /transcripts` → call `createTranscript()`
> 2. **Logic** — the actual transformation/business rule (`createTranscript()` does the real work)
> 3. **Data access** — the actual database read/write, isolated from the logic above it

> **Warning — One giant file works until it doesn't.**
> Writing all routing, logic, and database calls directly inside one file is genuinely fine for a 2-endpoint demo. By endpoint 4 or 5, it becomes hard to find what broke, and AI coding tools generating into an undifferentiated file produce worse, more tangled output. Three thin layers cost almost nothing extra to set up and pay for themselves the first time something breaks.

---

## Sync vs. Async: You Already Decided This

If your core loop has a processing-time endpoint, you already designed the polling pattern in Response Design (Phase 1) — `202 Accepted` immediately, status checked via `GET`. The architectural implication here: that means your handler returns *before* the actual processing finishes, which usually means the processing logic runs in the background (a queued job, a background task, or an async function you don't block on).

> **Tip — For hackathon scope, "background" can be as simple as not awaiting a promise before responding.**
> You don't need a job queue infrastructure (like a message broker) for a hackathon demo with one or two concurrent users. Save that complexity for when you actually have the scale problem it solves.

---

## Lock Your Architecture Approach

- [ ] You can name which lifecycle stage handles auth, and which handles your actual logic
- [ ] Auth validation lives in middleware, not duplicated per-route
- [ ] You've committed to at least a thin route / logic / data-access split
- [ ] If your core loop has async processing, you know where that logic will live
- [ ] You understand why a repeated `POST` creating a duplicate is expected, not a bug

---

## What's Next

**Tech Stack Selection** — choose the specific languages, frameworks, and tools that implement everything decided so far, optimized for what you can ship fastest without sacrificing credibility.
