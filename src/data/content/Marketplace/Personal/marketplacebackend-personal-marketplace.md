---
title: Backend
slug: backend
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 25–30 min
---

# Backend

## The Layer Where Every Earlier Rule Either Holds or Breaks

Your database enforces structure. Your backend enforces *behavior* — every authorization check, status transition rule, and business constraint from Phase 2 lives here, in code that runs on every request. This is the layer where "I designed it correctly" either becomes "I built it correctly," or quietly doesn't.

Treat this module as implementation discipline, not new design — every rule referenced below was already decided in an earlier module. Your job now is making sure none of them got lost in translation from design to code.

---

## Organize by Domain, Not by Technical Layer

Architecture Fundamentals recommended a modular monolith organized by domain. This is where that structure gets built.

```
/users        → auth, profile, account status logic
/listings     → CRUD, approval workflow, status transitions
/transactions → checkout, payment orchestration, status transitions
/messaging    → threads, messages, notifications
/disputes     → flagging, resolution actions
/reviews      → creation (gated on transaction), retrieval
```

>  **Best practice:** Each domain folder should own its own authorization checks, status transition logic, and validation — not share a single global "permissions" file that every domain reaches into inconsistently. This is what makes the ownership/party-to-transaction pattern from Authorization actually maintainable as the app grows.

---

## The Authorization Check Belongs at the Top of Every Handler

This is the single most important pattern in your entire backend. Every endpoint that touches a Listing, Transaction, Thread, or Review should run its authorization check first, before any business logic executes.

```
1. Authenticate (is this a valid, non-banned user?)
2. Authorize (is this user allowed to perform this specific action
   on this specific record?)
3. Validate (is the request data well-formed and within rules?)
4. Execute (perform the actual operation)
```

> ️ **Common mistake:** Writing business logic first and adding authorization checks as an afterthought, scattered wherever they're remembered. This ordering — auth, then authz, then validation, then execution — should be a habit applied identically across every endpoint, not something you reconstruct from memory each time. Inconsistent ordering is exactly how the authorization gaps flagged in the Authorization module get introduced at the code level.

---

## State Transitions Need Guard Logic, Not Just a Field Update

Your status fields (Listing, Transaction) define valid states, but the database doesn't stop you from writing code that sets an invalid transition. That's the backend's job.

| Entity | Guard Example |
|---|---|
| Listing | Reject any attempt to set status directly to "Active" from "Draft" — must pass through "Pending Approval" |
| Transaction | Reject "Completed" status update unless payment confirmation actually succeeded |
| Review | Reject creation unless a Completed transaction between these two specific users exists |

>  **Tip:** Write these guards as a single reusable "valid transitions" map per entity — current status → list of allowed next statuses — rather than scattered if-statements across different endpoints. This makes the state machine from Architecture Fundamentals enforceable in one place, and easy to audit.

---

## Webhooks Need Their Own Discipline

Your Payments Architecture module flagged Stripe webhooks as non-optional. In backend implementation terms, this means:

- A dedicated, unauthenticated (but signature-verified) webhook endpoint, separate from your normal authenticated API routes
- Idempotency handling — the same webhook event arriving twice should not double-process (e.g. don't mark a transaction "Completed" twice, don't send duplicate notifications)
- Webhook signature verification using Stripe's SDK, never trusting payload contents without it

> ️ Webhook endpoints are a common overlooked attack surface — they're necessarily unauthenticated in the normal sense (Stripe is calling you, not a logged-in user), which makes signature verification the entire security boundary. Skipping it means anyone could forge a "payment succeeded" event.

---

## Error Handling: Don't Leak Internal Details

| Bad | Good |
|---|---|
| Raw database error messages returned to the client | Generic, safe error messages; log the real error server-side |
| Stack traces in API responses | Stack traces in your logs only |
| Different error messages for "user doesn't exist" vs "wrong password" | Identical generic message for both — prevents account enumeration |

>  This last row matters more than it looks: distinguishing "no such user" from "wrong password" in your error responses lets an attacker enumerate which emails have accounts on your platform. A single generic "invalid credentials" message closes this off at near-zero cost.

---

## AI Prompt: Reviewing Backend Endpoint Discipline

```
I'm implementing the backend for a personal-scale marketplace using
[your stack]. Here are my endpoints: [list your actual endpoints,
e.g. "POST /listings", "PATCH /listings/:id/approve", "POST
/transactions/:id/checkout", "POST /webhooks/stripe"]

For each endpoint, verify:
1. Authentication and authorization checks happen before any business
   logic, in that order
2. Status transitions are validated against an explicit allowed-
   transitions map, not freely settable
3. Error responses don't leak internal details or allow account
   enumeration
4. The Stripe webhook endpoint specifically verifies signatures and
   handles idempotency

List any endpoint where this discipline appears to be missing or
inconsistent, and be specific about what's missing.
```

---

## Common Mistake: Treating the Backend as "Just CRUD"

> ️ A marketplace backend is not generic CRUD with extra steps. The authorization complexity from the two-sided nature of every transaction (flagged repeatedly since Architecture Fundamentals) means almost no endpoint here is a simple "fetch and return" — nearly all of them need a real authorization decision first. Treating this as routine CRUD work is how authorization gets shortchanged under time pressure.

---

## What You Should Walk Away With

1. A backend organized by domain, each owning its own authorization logic
2. Consistent auth → authz → validate → execute ordering across every endpoint
3. Explicit state-transition guards for Listing, Transaction, and Review creation
4. A properly secured, idempotent Stripe webhook handler
5. Error responses that don't leak internal details or enable enumeration

Frontend, next, is where this API surface gets a real interface — but the backend's job is to be correct and safe regardless of what the frontend does or doesn't enforce, per the hard rule from Authorization.
