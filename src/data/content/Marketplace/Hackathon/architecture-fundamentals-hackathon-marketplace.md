---
title: Architecture Fundamentals
slug: architecture-fundamentals
phase: Phase 2
mode: hackathon
projectType: marketplace
estimatedTime: 15-20 min
filename: architecture-fundamentals-hackathon-marketplace.md
---

# Architecture Fundamentals

Auth was one decision. This module is the rest of them — the structural choices that determine whether your team builds smoothly for the next 24-48 hours or fights your own codebase the whole time. Get this right once, early, and you stop thinking about it.

---

## The Hackathon Architecture Mindset

> **Reframe:** Production architecture optimizes for change over years. Hackathon architecture optimizes for one thing: minimizing the number of decisions your team has to make again later, under time pressure, while disagreeing. Simplicity isn't a compromise here — it's the actual optimization target.

Every choice in this module should be evaluated against one question: **does this reduce the number of things that can go wrong in the next 36 hours?**

---

## Decision 1: Monolith, Always

This isn't really a decision — it's a default you should only deviate from with a very specific reason.

> **Best Practice:** One codebase, one deployable unit, full stop. Microservices, separate API and frontend repos, or any kind of service-split architecture adds coordination overhead (deployment, networking, environment config) that has zero payoff for a 3-minute demo and substantial cost in setup time and failure surface.

If you're using a framework with built-in fullstack capability (Next.js, Remix, SvelteKit, Rails, Django), use its built-in API routes/server functions rather than standing up a separate backend service.

---

## Decision 2: Data Layer

| Approach | Setup time | Best for |
|---|---|---|
| Hosted Postgres (Supabase, Neon, Railway) | Minutes | Default choice — relational data fits marketplace listings/users naturally |
| SQLite (local file) | Seconds | Smallest teams, simplest concepts, no real deployment target needed |
| Firebase/Firestore | Minutes | If your team already knows it well — don't learn it now |
| In-memory / hardcoded arrays | None | Only for the earliest prototyping hour, never for your actual submission |

> **Tip:** A marketplace's core data — users, listings, transactions — is inherently relational (a listing belongs to a seller, a transaction connects a buyer and a listing). A relational database matches this shape naturally; don't fight a NoSQL document structure into representing relationships it wasn't designed for, especially under time pressure.

> **Warning:** Never let your submission run on in-memory data that resets on server restart. A demo that loses all its seeded listings because the server redeployed five minutes before judging is an entirely avoidable failure.

---

## Decision 3: Frontend Approach

| Approach | Tradeoff |
|---|---|
| Single fullstack framework (Next.js, Remix, SvelteKit) | Fastest setup, built-in routing and data fetching, default choice |
| Separate frontend + API | Only if your team has a strong reason — usually doesn't pay off in time saved |
| No-code/low-code builder (Bolt, Lovable, etc.) | Valid if your team's strength is product/design over engineering — know this tradeoff going in |

> **Best Practice:** Whatever your team already knows best, use that. A hackathon is the wrong place to learn a new framework — the cost of unfamiliar tooling compounds every hour you're debugging syntax instead of building features.

---

## Decision 4: Hosting and Deployment

Deploy early — not the night before submission.

| Step | When |
|---|---|
| Initial deploy of a "hello world" version | Within the first 2-3 hours |
| Re-deploy after the core loop works | As soon as it works, even roughly |
| Final deploy with seeded demo data | At least 1-2 hours before submission deadline, never minutes before |

> **Common Mistake:** Treating deployment as a final step instead of an early, repeated one. Teams that deploy once at the very end frequently discover environment-variable mismatches, missing dependencies, or build failures with no time left to fix them. Deploy early, deploy often, and always have a working deployed version, even if it's behind your local branch.

---

## Decision 5: What State Lives Where

Marketplaces specifically need to track: current user/role, listings, and transaction state. Decide where each lives before writing code, so your team isn't duplicating or conflicting on state management mid-build.

| State | Lives in | Why |
|---|---|---|
| Current user/role | Client-side app state (or session, if using real auth) | Needs to persist across the role switcher, doesn't need a database round-trip |
| Listings | Database, fetched on load | Source of truth, needs to be consistent between buyer and seller views |
| Transaction/confirmation state | Database, with a client-side optimistic update for instant feedback | Combines correctness (real loop closes) with demo responsiveness (feels instant) |

---

## The Setup Checklist

Run through this in your first hour, in order, before any feature work begins:

- [ ] Repo initialized, team has access
- [ ] Framework and data layer chosen, matching the defaults above unless there's a specific reason not to
- [ ] "Hello world" deployed to a live URL within the first 2-3 hours
- [ ] Database schema sketched for users/roles, listings, transactions — even roughly
- [ ] Auth approach (from the previous module) wired in, however minimal
- [ ] Team agreement on who owns which part of the core loop, to avoid duplicate or conflicting work

---

## Using AI Effectively Here

Use AI to scaffold the initial project setup fast, using your team's actual familiar tools rather than what's trendy.

**📋 Copy this prompt:**

```
I'm setting up the architecture for a hackathon marketplace project.

Team's strongest stack familiarity: [e.g. "Next.js and Postgres, comfortable with TypeScript"]
Core loop: [paste from your PRD]
Time remaining: [hours]

Scaffold:
1. A monolithic project structure using our familiar stack — no separate services
2. A minimal relational schema for users/roles, listings, and transactions, matching our core loop exactly
3. The fastest path to an initial deployment on [hosting platform], so we can deploy a "hello world" version in the first hour

Don't suggest anything outside our stated stack familiarity, even if you think it's technically better — unfamiliar tooling costs us more time than it saves in this context.
```

This prompt works because it explicitly constrains AI to your team's existing knowledge — the instinct to suggest a "better" but unfamiliar tool is exactly the kind of well-intentioned advice that costs hackathon teams hours they don't have.

---

## Validating the Output

- [ ] Is the architecture a single monolithic codebase, with no unnecessary service separation?
- [ ] Does the data layer match your team's actual familiarity, not an unfamiliar "better" option?
- [ ] Is there a plan to deploy within the first few hours, not just at the end?
- [ ] Does the database schema map directly to your core loop's actual data needs — no speculative extra tables?

---

## Before You Continue

- [ ] Monolith architecture confirmed
- [ ] Data layer chosen and matched to team familiarity
- [ ] Initial deployment planned for within the first 2-3 hours, not the final hours
- [ ] Schema sketched for users/roles, listings, and transactions
- [ ] Team has explicit agreement on state ownership to avoid mid-build conflicts

**Next up:** Demo Transactions — deciding exactly how much of your transaction logic is real vs. simulated.
