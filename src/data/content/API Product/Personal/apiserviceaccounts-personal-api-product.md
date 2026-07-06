---
title: Service Accounts
slug: service-accounts
phase: Phase 2
mode: personal
projectType: api-product
estimatedTime: 10 min
---

# Service Accounts

Every caller you've designed for so far is a person — or at least, an API key tied to one person's account. A service account is different: a non-human identity, used when a *system* needs to call your API on its own behalf, not a specific person's. This module decides whether your MVP needs one, and if so, how it fits into what you've already built.

## The Distinction That Matters

| | Regular API key (what you've built) | Service account |
|---|---|---|
| Represents | A specific caller/person | A system, script, or internal process |
| Typical use | A developer integrating your API into their app | Your own backend calling your own API internally, a CI/CD pipeline, an internal automation |
| Owned by | The individual caller | You, or an internal system — not tied to one external person |

If every caller of your API is an external developer with their own account, you may not need this concept at all yet — it becomes relevant the moment *you* need something automated (not a human clicking a button) to call your own API.

## When This Actually Comes Up for a Personal Project

- **A scheduled job** that needs to call your own API on a timer (e.g., a cron job that checks all subscriptions and triggers webhooks)
- **Your own frontend's backend** calling your API server-to-server, separate from any individual user's credentials
- **A CI/CD pipeline** running integration tests against your API automatically

> **Tip:** If you're building a scheduled background process for **Background Jobs** in Phase 3, that process almost certainly needs a service account rather than borrowing a real caller's API key — using a real caller's key for internal automation conflates "acting as a person" with "acting as a system," which makes auditing and revocation confusing later.

## Architecturally, It's Just Another API Key — With a Flag

You don't need a separate authentication system for this. Reuse everything from **API Keys** and **Authentication Architecture** — a service account is simply an API key not tied to an individual owner's identity in the same way, and typically with a marker distinguishing it:

```
api_keys
  id (PK)
  owner_id (FK, nullable — null or a system-designated ID for service accounts)
  key_hash (indexed)
  is_service_account (boolean)
  label (e.g. "internal-cron-webhook-checker" — human-readable, for your own tracking)
  created_at
  revoked_at
```

The `label` field matters more here than for regular caller keys — when you're debugging which process made a given request months from now, a clear label saves real time over a bare key ID.

## Permissions: Usually Broader, Always Deliberate

A service account often needs broader access than a typical caller's key (e.g., it might need to read across all subscriptions to check them on a schedule, not just one owner's). This is exactly where the role-based check pattern from **Authorization Architecture** — kept structurally separate from ownership checks — becomes useful:

```
assertRole(caller, "service_account")   // bypasses per-owner ownership checks, deliberately
```

Never grant this broad access by accident through a bug in your ownership check — it should be an explicit, intentional permission tied to `is_service_account`, checked deliberately, not a side effect of a missing `owner_id`.

> **Warning:** A service account with unrestricted access is a high-value target if it ever leaks — treat its key with at least as much care as your database credentials, not casually the way you might treat a low-stakes test key.

## Personal Mode: Only Build This If You Actually Need Internal Automation

If your MVP has no scheduled jobs, no CI pipeline calling your API, and no internal system-to-system calls, skip this entirely — a regular API key model is sufficient. Add a service account the moment you build something in **Background Jobs** or **CI/CD** that genuinely needs to call your API without a human behind it.

- [ ] Confirm: does my MVP have any scheduled job, automation, or internal process that needs to call my own API?
- [ ] If yes, plan a labeled, appropriately-scoped service account for it
- [ ] If no, this stays deferred with no action needed now

## AI Prompt: Confirm the Need

```
My MVP's planned background processes and internal automations (if any): "[describe, or state none]"

1. Do any of these genuinely need to call my own API as a non-human caller?
2. If yes, what's the minimum scope of access that specific process needs — not full unrestricted access by default?
```

## Before You Continue

- [ ] I've determined whether my MVP genuinely needs a service account
- [ ] If yes, I know it reuses the API key architecture with a distinguishing flag and label
- [ ] I understand service account permissions must be explicit and deliberate, never a side effect of a missing check

When all three are checked, move to **Billing Architecture**.
