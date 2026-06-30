---
title: Tech Stack Selection
slug: tech-stack-selection
phase: Phase 2
mode: personal
projectType: marketplace
estimatedTime: 20–25 min
---

# Tech Stack Selection

## This Decision Is Permanent Longer Than You Think

You can change your mind about a button color in five minutes. You cannot change your mind about your database or your backend framework after you've built three phases on top of it without a costly rewrite. This is the highest-leverage decision in the entire architecture phase, and it's also the one solo builders most often get wrong — usually by choosing based on hype rather than fit.

Your job here isn't to pick the "best" stack. It's to pick the stack that matches a two-sided marketplace, a solo builder, and a personal-mode budget — specifically.

---

## What a Marketplace Actually Demands From a Stack

Marketplaces aren't generic CRUD apps. Before picking technologies, understand what you're actually building toward, because it constrains your choices more than most tutorials admit.

| Requirement | Why It Matters Here |
|---|---|
| Relational data with real constraints | Users, listings, transactions, reviews are deeply relational — foreign keys and joins aren't optional |
| Transactional integrity | A payment + listing status update must succeed or fail together, never half-complete |
| Real-time-ish messaging | Buyer-seller messaging needs to feel responsive, even if not full real-time |
| Search that's actually usable | Listing discovery is core to the product, not a nice-to-have |
| File/image storage | Listings need photos; this is unavoidable infrastructure |

If a stack can't comfortably do all five without exotic workarounds, it's the wrong stack for a marketplace — regardless of how popular it is for other app types.

---

## Personal-Mode Stack Philosophy

> ✅ **The rule for Phase 2 in personal mode:** choose boring, well-documented technology you can actually debug alone, over trendy technology with a smaller community. You are your own support team. When something breaks at 11pm, Stack Overflow answer count matters more than how impressive the tech sounds on a resume.

| Optimize For | Don't Optimize For |
|---|---|
| Generous free tiers | Maximum performance at scale you don't have |
| One-person debuggability | Microservices, distributed systems |
| Fast iteration speed | Theoretical "best practice" architecture |
| Strong AI-tool familiarity (more training data = better AI help) | Niche frameworks with thin documentation |

> 💡 **Tip:** When you ask Claude, ChatGPT, or Cursor for help, the quality of that help is directly proportional to how much of that framework exists in the training data. Choosing a mainstream stack isn't just safer for you — it makes your AI tools meaningfully more useful for the rest of this build.

---

## Recommended Stack Shape for a Personal Marketplace

This is a default, not a mandate — but deviating from it should be a deliberate decision, not an accident.

| Layer | Recommendation | Why |
|---|---|---|
| Frontend | React (Next.js) | Huge ecosystem, excellent AI tool support, handles both marketing pages and app in one project |
| Backend | Next.js API routes or a lightweight Node/Express API | Avoids running two separate deployments for a solo project |
| Database | PostgreSQL (via a managed provider) | Relational integrity for transactions/listings; not optional for marketplace data |
| Auth | A managed auth provider (not hand-rolled) | Auth bugs are expensive; don't build this yourself at personal-mode stage |
| Payments | Stripe Connect | Purpose-built for marketplace-style split payments — this is covered in depth in the Payments Architecture module |
| Image/file storage | A managed object storage service (S3-compatible) | Don't store images in your database or your own server |
| Search | Postgres full-text search initially | A dedicated search service is overkill until your listing volume actually requires it |
| Hosting | A managed platform (Vercel, Railway, Render, etc.) | Removes server management entirely — your time goes into product, not DevOps |

> ⚠️ **Common mistake:** Reaching for a dedicated search engine (Elasticsearch, Algolia) or a microservices split before you have enough listings for either to matter. Postgres full-text search comfortably handles thousands of listings. Don't pre-optimize for scale you don't have — see Search Architecture for exactly where that threshold sits.

---

## Decision Matrix: Common Stack Trade-offs

| Choice | Pick This If | Avoid If |
|---|---|---|
| Next.js (full-stack) vs. separate frontend/backend | You're solo and want one deployment | You already have a team split by frontend/backend |
| Managed Postgres vs. self-hosted DB | Always, at personal-mode scale | Never self-host a database solo unless you specifically want the ops learning |
| Managed auth vs. custom auth | Always — auth has security stakes too high to hand-roll | Only build custom auth if you have a specific unmet requirement |
| Serverless hosting vs. traditional server | You want zero ops overhead | You have specific long-running-process needs (rare for a v1 marketplace) |

---

## What You're Explicitly Deferring

Naming what you're *not* building yet is as important as naming the stack itself — it stops scope creep before it starts.

- Dedicated search infrastructure — deferred until listing volume demands it
- Multi-region deployment — deferred indefinitely at personal scale
- Microservices — deferred indefinitely; a monolith is correct here
- Custom real-time infrastructure (WebSockets at scale) — deferred until messaging volume requires it beyond polling/managed solutions

---

## AI Prompt: Validating Your Stack Choice

```
I'm building a personal-scale, solo-developer marketplace for [your niche].
Expected scale at launch: [rough number of users/listings you expect]
My current technical experience: [your honest skill level]

I'm considering this stack:
- Frontend: [your choice]
- Backend: [your choice]
- Database: [your choice]
- Hosting: [your choice]

Critique this stack specifically for a SOLO builder shipping a
two-sided marketplace, not a team. Flag:
1. Anything here that would require operational expertise I likely
   don't have (server management, scaling, infra debugging)
2. Anywhere this stack would make Stripe Connect payments, image
   storage, or relational transaction integrity harder than they
   need to be
3. Whether this stack has strong AI coding tool support, since I'll
   be building most of this with AI assistance

Recommend changes only where they meaningfully reduce my risk of
getting stuck — not changes that are merely "more modern."
```

---

## Common Mistake: Stack Shopping as Procrastination

> ⚠️ Researching tech stacks feels productive and is genuinely fun — it's also the easiest way to spend three weeks not building anything. If the recommended stack above fits your situation, that research is already done. Deviate only for a specific, named reason, write that reason down, and move to Authentication.

---

## What You Should Walk Away With

1. A finalized stack: frontend, backend, database, auth, payments, storage, hosting
2. A written list of what you're explicitly deferring and why
3. One paragraph justifying any deviation from the personal-mode default above

This decision is now load-bearing for every module in the rest of Phase 2 and all of Phase 3. Authentication, the next module, assumes you've picked a managed auth approach — revisit that now if you haven't.
