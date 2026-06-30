---
title: Testing
slug: testing
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 20–25 min
---

# Testing

## Demo Transactions Was Manual. This Makes It Repeatable.

Demo Transactions had you manually walk the full buyer/seller path once, end to end, in Stripe test mode. That caught integration bugs at a point in time. Testing is about making sure those same checks — and the smaller, sharper checks they revealed — don't silently break as you keep building through Phase 4 and beyond. You're not starting from zero; you're encoding what you already know matters.

---

## What to Actually Test, Given Everything You've Already Built

Not everything deserves equal testing effort. Prioritize based on where this curriculum has repeatedly flagged real risk.

| Priority | What | Why |
|---|---|---|
| Highest | Authorization checks (ownership/party-to-transaction) | Authorization called this the most common real security bug source |
| Highest | Status transition guards (Listing, Transaction) | Backend flagged invalid transitions as a structural risk |
| High | Payment + listing atomic update | Payments Architecture and Demo Transactions both flagged this as a financial-risk failure point |
| High | Search status filtering | Search Architecture and Search both flagged this as a visibility-leak risk |
| Medium | Notification triggers firing correctly | Notifications flagged silent gaps as easy to miss |
| Lower | UI polish, copy, visual details | Real, but lower-stakes than the above |

> 💡 **Tip:** This priority order isn't generic testing advice — it's a direct readout of which earlier modules used the word "common mistake" or "critical" about a specific failure mode. Test what you've already been warned about first.

---

## Three Layers, Not One

| Layer | What It Catches | Effort |
|---|---|---|
| **Unit tests** | Individual functions — fee calculation, status transition validity checks | Low effort, fast to run, write these for anything with real logic (not simple CRUD) |
| **Integration tests** | One domain working correctly against the database (e.g. "creating a listing actually enforces required fields") | Medium effort |
| **End-to-end tests** | The full flows from Demo Transactions, automated instead of manual | Higher effort, but highest confidence |

> ✅ **Best practice for personal mode:** Don't aim for exhaustive coverage across all three layers. Write unit tests for your status-transition guards and fee calculations specifically (cheap, catches real bugs). Automate the core Demo Transactions flow as a single end-to-end test you can re-run before any deploy. Skip extensive integration testing of straightforward CRUD — the value-to-effort ratio is low at this scale.

---

## Automate the Demo Transactions Flow Specifically

This is the highest-value single test you can write, because it's already proven to catch real integration bugs once.

```
Automated test: create listing → approve → search finds it →
message sent → checkout completes → fee split correct →
dispute flagged → resolved → review created
```

> ⚠️ **Common mistake:** Treating Demo Transactions as a one-time pre-launch ritual rather than something worth automating. Every feature you add in Phase 4 (rate limiting, caching, monitoring) risks subtly breaking this core flow. An automated version you can run in seconds, before every deploy, is far cheaper than re-discovering an integration bug manually after it's already live.

---

## Specifically Test the Failure Paths Your Modules Warned About

Pull these directly from the "common mistake" callouts across Phase 2 and 3 — each is a concrete, scriptable test case, not a vague "test edge cases" instruction.

- [ ] Suspended account cannot create a listing or send a message (Authorization, Auth Implementation)
- [ ] Listing cannot skip from Draft directly to Active (Listing System, Backend)
- [ ] Search never returns a Pending Approval or Removed listing (Search Architecture, Search)
- [ ] Review creation fails without a verified completed transaction (Reviews & Ratings)
- [ ] A second identical Stripe webhook event doesn't double-process a transaction (Backend's idempotency requirement)
- [ ] Error responses for "no such user" and "wrong password" are identical (Backend)

---

## AI Prompt: Generating a Test Suite From Your Existing Rules

```
I'm building a personal-scale marketplace using [your stack/testing
framework]. Here's my system: [briefly describe entities — User,
Listing, Transaction, Thread, Review — and key status values].

Generate:
1. Unit tests for status transition validation (Listing and
   Transaction state machines) and the platform fee calculation
2. A single automated end-to-end test covering: create listing →
   approve → appears in search → message sent → checkout completes
   → fee split correct → dispute flagged → resolved → review created
3. Specific tests for these failure paths: suspended account blocked
   from listing/messaging, invalid status transitions rejected,
   search excludes non-Active listings, review blocked without a
   transaction, duplicate webhook events don't double-process

Prioritize authorization and status-transition tests over UI/CRUD
tests — I'm intentionally not aiming for exhaustive coverage.
```

---

## Common Mistake: Testing in Production-Like Isolation From Real Money Flows

> ⚠️ Don't let your test suite run against live Stripe keys, ever, even accidentally. Confirm test mode keys are used in CI/automated runs specifically — a misconfigured test suite that fires real charges is a far worse outcome than a missing test. This is a configuration check worth verifying explicitly, not assuming.

---

## What You Should Walk Away With

1. Unit tests for status transitions and fee calculation logic
2. One automated end-to-end test covering the full Demo Transactions path
3. Explicit tests for every failure path flagged as a "common mistake" across Phases 2-3
4. Confirmed test-mode-only Stripe keys in your automated test environment

Documentation, next, is the last module of Phase 3 — capturing what you've built clearly enough that you (or a future collaborator) can pick this project back up without re-deriving these decisions from scratch.
