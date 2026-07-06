---
title: Authorization (RBAC)
slug: authorization-rbac
phase: Phase 2
mode: personal
projectType: internal-tool
estimatedTime: 10–15 min
---

# Authorization (RBAC)

Authentication answered "can you get in." Authorization answers "what can you do once you're in." For most personal internal tools, the honest answer is: everything, because there's only one user and no reason to restrict yourself from your own data. This module exists mainly to confirm that — and to flag the rare cases where it doesn't hold.

---

## Why RBAC Usually Doesn't Apply Here

Role-Based Access Control (RBAC) exists to answer questions like "can this user edit this record, or only view it?" and "should this person see other people's data?" Those questions only make sense when there's more than one user with genuinely different needs or trust levels.

> **Rule of thumb**
> If your User Architecture module confirmed a single user (or one shared trusted user), you almost certainly don't need any authorization logic beyond "logged in = full access." Building roles and permissions for one person is solving a problem that doesn't exist.

---

## Quick Check: Do You Actually Need This Module?

- Does every person who can log in need the exact same access to everything?
- Is there no scenario where one user should see data another user can't?
- Is there no action (like "delete") that only some users should be allowed to take?

If you checked all three, your authorization model is genuinely simple: **authenticated = full access, no exceptions.** Write that down and move to the next module — there's nothing more to design here.

---

## The One Common Exception: Shared Tools With Light Boundaries

If User Architecture flagged a second occasional user (a partner, a family member), you might want one lightweight boundary without building a full permission system.

> **Example**
> A shared household task tracker might want "anyone can view and add tasks" but reserve "delete all data" for you specifically. This is a single, narrow exception — not a role system. You can implement it as one hardcoded check ("is this the primary user?") rather than a general-purpose permissions framework.

> **Decision card**
> Before adding any permission distinction, ask: "Is this solving a real, specific risk I've identified, or am I adding structure because production tools have roles?" Only build what traces back to an actual concern.

---

## If You Genuinely Need Multiple Roles

This becomes relevant only if you've deliberately decided this tool will have meaningfully different user types with different responsibilities — not just different people. If that's your real situation, keep the model as small as possible.

```
Role: [name]
Can do: [specific actions]
Cannot do: [specific actions]
```

> **Best practice**
> Two roles (e.g., "owner" and "viewer") cover the vast majority of small shared-tool needs. Resist designing a flexible, general-purpose role system for a tool that will realistically only ever have two or three real users. That flexibility is complexity you'll pay for in every future feature, for a scenario that may never materialize.

---

## Where This Connects to Your Data Model

Whatever you decide here directly shapes your Database Schema in the next module — if you do need per-user data boundaries, that means adding a reference to "who owns this record" on relevant tables now, rather than retrofitting it later.

- If any authorization boundary exists, does your data model need an "owner" or "created by" field to support it?

---

## Using AI to Confirm You Don't Need This

> **Copy this prompt**
> ```
> Here's my user situation for a personal internal tool:
>
> [paste your User Architecture decision]
>
> Confirm: given this, do I need any authorization/permissions logic
> beyond "logged in = full access"? If there's a narrow, specific
> exception worth handling (like restricting one destructive action
> to a primary user), point it out — but don't propose a general
> role system unless my situation genuinely requires one.
> ```

---

## What You Should Have Now

- A confirmed decision: either "no authorization logic needed" or a specific, narrow exception clearly defined
- If an exception exists, confirmation it's implemented as a single check, not a general role framework
- Any data model implications (owner fields) noted for the next module

With access and permissions settled, the next module — Database Schema — designs the actual structure your data will live in, informed by every business rule and access decision made so far.
