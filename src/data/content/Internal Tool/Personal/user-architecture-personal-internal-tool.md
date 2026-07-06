---
title: User Architecture
slug: user-architecture
phase: Phase 2
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# User Architecture

"User architecture" sounds like it implies multiple users. For a personal internal tool, it often means the opposite decision: confirming there's exactly one user, and designing accordingly — rather than accidentally building infrastructure for a scenario that doesn't exist.

---

## The First Question: Is There Really Only One User?

Before anything else, answer this honestly, because it determines nearly everything else in this module.

- Will only you ever use this tool?
- Might a partner, family member, or one other person occasionally use it too?
- Is there any realistic chance this becomes a small shared tool later?

> **Rule of thumb**
> Design for the user situation you actually have today, not the one you might have someday. If "maybe someone else will use this eventually" is genuinely likely, note it now — but don't build multi-user infrastructure speculatively. That's exactly the kind of imported complexity Internal Tool Fundamentals warned against.

---

## Single-User Architecture Is Legitimately Simpler

If you confirmed there's exactly one user, you can skip an entire category of architecture that consumer and team tools can't avoid:

- No user table, roles, or permissions system needed
- No login/signup flow required — a simple password or device-level access may be entirely sufficient
- No need to design for "what if two people edit the same record at once"
- No need to separate "my data" from "someone else's data" anywhere in your schema

This isn't a shortcut — it's the architecturally correct choice for the actual problem you're solving. Building a permissions system for a tool only you will ever open is effort spent on a user who doesn't exist.

---

## What "Access Control" Means When You're the Only User

Even without a full authentication system, you likely want *some* barrier between your data and the open internet — especially if your hosting choice makes the tool reachable by URL.

| Approach | When it's enough |
|---|---|
| Simple password gate | Tool is hosted publicly, but casual protection is sufficient |
| Device-only / local network | Tool never leaves your own devices or network |
| Full authentication (email + password, or SSO) | You want to practice this specifically, or genuinely need account-level security |

> **Decision card**
> Match this to your actual data sensitivity. Financial data (like invoice amounts) probably deserves at least a simple password gate if it's reachable by URL — even for a personal tool. A low-stakes personal task list might not need even that.

---

## If a Second Person Might Use It: The Lightweight Middle Ground

If you genuinely expect occasional shared use (a partner checking the same invoice tracker, for example), you don't need full multi-tenant architecture — a much lighter approach usually covers it.

> **Example**
> A single shared password, with all data visible to whoever has it, is often entirely sufficient for two trusted people sharing one personal tool. This avoids the real complexity of user accounts, permissions, and per-user data isolation, while still providing a basic access boundary.

Only escalate to real multi-user architecture (separate accounts, per-user data, roles) if you have a specific reason — different people needing to see different data, for example. Note that reason explicitly if it applies.

---

## Document the Decision

This is a short module because the decision itself should be short. Write it down clearly — it directly determines your Authentication and Authorization modules next.

```
User model: [single user / shared password / full multi-user]
Reasoning: [why this fits my actual situation]
Data sensitivity: [does this need even lightweight protection?]
```

---

## Using AI to Confirm You're Not Overbuilding

> **Copy this prompt**
> ```
> I'm building a personal internal tool. Here's who will use it and
> what kind of data it holds:
>
> Users: [describe — just me / me + one other person / etc.]
> Data sensitivity: [e.g. financial amounts, personal task list, etc.]
>
> Help me decide:
> 1. Given this, is any access control needed beyond a simple
>    password, or is none needed at all?
> 2. Am I at risk of overbuilding user/auth architecture for a
>    situation that doesn't actually require it?
> 3. If a second person might occasionally use this, what's the
>    lightest-weight approach that still makes sense?
>
> Bias toward the simplest option that matches my actual situation.
> ```

---

## What You Should Have Now

- A clear, honest answer on how many people will actually use this tool
- A decision on the minimum access control appropriate to your data's sensitivity
- Confirmation you're not building multi-user infrastructure for a single-user reality
- A short written record of this decision and its reasoning

With your user model settled, the next module — Authentication — turns this decision into the actual mechanism for how access is granted (or confirms that none is needed).
