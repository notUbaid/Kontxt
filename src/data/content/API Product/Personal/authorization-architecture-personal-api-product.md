---
title: Authorization Architecture
slug: authorization-architecture
phase: Phase 2
mode: personal
projectType: api-product
estimatedTime: 15 min
---

# Authorization Architecture

**Authorization Strategy** in Phase 1 established the rule: authentication proves identity, authorization proves permission, and every owner-only endpoint needs an explicit check. This module turns that rule into an actual architectural pattern — one that's structurally hard to forget, rather than something you have to remember to add to every new endpoint by hand.

## Build a Reusable Check, Not a Habit

The failure mode from Phase 1 — "broken object-level authorization" — happens because a developer forgets to add a check on one specific endpoint. The architectural fix isn't "remember better." It's making the check impossible to skip accidentally.

```
Generic ownership check (reusable across every owner-scoped resource):

async function assertOwnership(resourceTable, resourceId, callerId) {
  const resource = await db[resourceTable].findUnique({ where: { id: resourceId } });
  if (!resource) throw new NotFoundError();
  if (resource.owner_id !== callerId) throw new NotFoundError(); // see note below
  return resource;
}
```

> **Tip:** Notice both the "doesn't exist" and "exists but isn't yours" cases return the same `404`, not a `404` vs `403` split. This is deliberate — returning `403` for someone else's resource confirms to a caller that a given ID exists, which is a minor information leak. Treating "not yours" identically to "doesn't exist" avoids that leak entirely.

## Where This Check Lives in Your Request Lifecycle

Referencing the layered pipeline from **API Fundamentals**: this check belongs in the authorization layer, after authentication (you know who's calling) and before business logic (before you do anything with the data). Wire it as middleware or a guard function that every owner-scoped route handler calls with the same pattern — not logic copy-pasted into each handler individually.

```
Request → Auth (who?) → Rate limit → Authorization (assertOwnership) → Validation → Business logic → Response
```

## A Simple Audit Table for Your Endpoint List

Go through your full endpoint list from **Endpoint Planning** and mark each one. This table is your architectural checklist — every row needs a concrete answer before Phase 3 implementation begins.

| Endpoint | Access type | Check needed |
|---|---|---|
| `GET /subscriptions/{id}` | Owner-only | `assertOwnership` before returning |
| `GET /forecasts/{city}` | Public | None — but still authenticated for rate limiting |
| `DELETE /subscriptions/{id}` | Owner-only | `assertOwnership` before deleting |
| `POST /subscriptions` | Creates for caller | `owner_id` set from authenticated caller, never from request body |

That last row matters as much as the read/delete cases: on creation, never trust an `owner_id` field if a caller happened to include one in the request body — always set it server-side from the authenticated caller's identity established during authentication.

> **Warning:** A caller-supplied `owner_id` in a create request is a direct path to creating resources on someone else's behalf, or later querying/attaching them to another account. Ownership is always assigned by the server, never accepted as input.

## If You Have Any Role-Based Logic

Most personal API products don't need this — confirmed in Phase 1's Authorization Strategy — but if a specific use case genuinely requires it (e.g., an "admin" caller who can view all subscriptions), keep it structurally separate from ownership checks rather than tangled into the same function:

```
assertOwnership(resource, callerId)       // "is this yours?"
assertRole(caller, "admin")               // "are you allowed to bypass ownership?"
```

Keeping these as distinct, composable checks means you can reason about each independently, and adding role logic later doesn't require rewriting your ownership logic.

## Personal Mode: The Pattern Matters More Than the Framework

You don't need a full policy engine or permissions library for a personal API product with simple owner-only access. What you do need is the *habit* of routing every owner-scoped endpoint through the same reusable check — that discipline is what actually prevents the vulnerability class this module exists to address.

## AI Prompt: Audit Your Implementation Plan

```
My full endpoint list with access types marked: "[paste your completed audit table]"

1. Confirm every owner-only endpoint routes through a single reusable ownership-check function, not duplicated inline logic.
2. Check my create endpoints specifically — confirm owner_id is always set server-side, never accepted from the request body.
3. Flag any endpoint where "not found" vs "not yours" might leak information about whether a resource exists.
```

## Before You Continue

- [ ] I have one reusable ownership-check function used by every owner-scoped endpoint
- [ ] Every create endpoint sets `owner_id` server-side, never from request input
- [ ] "Not found" and "not yours" return identical responses to avoid leaking existence

When all three are checked, move to **API Gateway**.
