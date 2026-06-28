---
title: Tech Stack Selection
slug: tech-stack-selection
phase: Phase 2
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Tech Stack Selection

This is the first irreversible-feeling decision in System Architecture — and the one most likely to be made for the wrong reasons. Beginners pick a stack because it's trending. Experienced engineers pick a stack because it matches the team, the problem, and the timeline. For a production SaaS, "boring and proven" beats "exciting and unproven" almost every time.

---

## The Principle Before the Decision

> **Decision Card — Choose Boring Technology**
> A production SaaS is judged on reliability and velocity over years, not on how modern its stack looks at launch. Every "exciting" technology choice has a hidden cost: smaller hiring pool, fewer Stack Overflow answers, fewer battle-tested libraries, more time spent debugging the framework itself instead of your product. Spend your innovation budget on your actual product, not your infrastructure choices.

This doesn't mean "use the oldest thing available." It means: prefer technology with a large, mature ecosystem and a track record at the scale you're actually targeting — not the scale you fantasize about.

---

## Decision 1: Frontend Framework

| Option | Best for | Watch out for |
|---|---|---|
| Next.js (React) | Most production SaaS — SSR/SSG, API routes, huge ecosystem | Can get complex with caching/rendering modes; learn the App Router model deliberately |
| Remix / React Router v7 | Teams that want explicit data-loading patterns over Next's conventions | Smaller ecosystem than Next.js |
| SvelteKit | Smaller bundle sizes, simpler reactivity model | Smaller hiring pool and ecosystem than React |

>  **Best Practice**
> Default to **Next.js** unless you have a specific reason not to. It's the most battle-tested choice for production SaaS in the current ecosystem, with the deepest hiring pool and library support.

---

## Decision 2: Backend Approach

> **Decision Card — Monolith First**
> Unless you already know you need independent scaling of specific services, build a **monolith** — one deployable backend. Microservices solve organizational scaling problems (many teams, independent deploys) that an early-stage SaaS doesn't have yet. They add network calls, distributed debugging, and deployment complexity in exchange for a benefit you won't need for a long time, if ever.

| Backend pattern | Use when |
|---|---|
| Full-stack framework (Next.js API routes / Server Actions) | Small team, want one codebase, one deploy |
| Separate backend (Node/Express, Fastify, Django, Rails) | Need a backend independent of frontend deploy cycle, or backend logic is substantial enough to warrant separation |
| Serverless functions | Spiky, unpredictable traffic; willing to accept cold-start tradeoffs and vendor-specific patterns |

---

## Decision 3: Database

>  **Best Practice**
> Default to **PostgreSQL** for a production SaaS unless your data genuinely doesn't fit a relational model. It handles relational data, JSON columns, full-text search, and most workloads a SaaS needs — without the operational overhead of running multiple database technologies.

Only reach for additional specialized stores when you have a concrete reason:

- **Redis** — caching, rate limiting, session storage, queues
- **Dedicated search (Elasticsearch/Meilisearch/Typesense)** — only once Postgres full-text search genuinely isn't enough
- **NoSQL (MongoDB, DynamoDB)** — only if your data is genuinely document-shaped and you've confirmed you don't need relational integrity, joins, or transactions

> [!WARNING]
> Don't add a second database technology "for scale" before you've measured an actual bottleneck. This is one of the most common forms of premature optimization in early-stage SaaS — it adds operational burden (backups, monitoring, expertise) for a problem you don't have yet.

---

## Decision 4: Hosting & Infrastructure

| Option | Best for |
|---|---|
| Vercel | Next.js apps, fastest path to production, generous free tier for MVP stage |
| Railway / Render | Full-stack apps needing a traditional server + managed Postgres, simple ops |
| AWS/GCP/Azure directly | Once you need fine-grained control, compliance requirements, or scale that managed platforms don't fit |

> [!TIP]
> Don't start on raw AWS/GCP unless you already have the DevOps expertise to manage it. A managed platform (Vercel, Railway, Render) gets a solo founder or small team to production faster, and migrating later — once you have real scale and the budget for dedicated infra work — is a known, well-trodden path.

---

## Common Mistakes (Including AI's)

- **Resume-driven stack selection** — choosing a technology to learn it rather than because it fits the product. Fine for a side project; risky for production.
- **Premature microservices or multi-database architectures** — adding complexity for hypothetical scale.
- **AI recommends the newest framework by default** — AI tools are trained on a lot of hype-cycle content and will often suggest the trendiest option rather than the most proven one. Always ask it to justify against your actual team size and timeline.
- **Ignoring hiring/ecosystem reality** — a technically elegant but obscure stack becomes a liability the moment you need to hire or get help debugging.
- **Mixing too many languages/runtimes** without a clear reason — every additional language is an additional thing your team (or AI conversations) needs full context on.

---

## AI Prompt: Get a Justified Stack Recommendation

```
I'm choosing a tech stack for a production SaaS. Recommend a stack and justify every choice against these constraints — don't just list trendy options.

Context:
- Team size: [e.g., solo founder / 2 engineers]
- Timeline to MVP: [e.g., 6 weeks]
- Expected initial scale: [e.g., hundreds of users, not millions]
- Core product: [one-sentence description]
- Team's existing familiarity: [languages/frameworks you already know, if any]

For frontend, backend, database, and hosting, recommend ONE option each (not a list of possibilities) and justify based on: ecosystem maturity, hiring/support availability, and fit for the stated team size and timeline — not on what's newest.

Explicitly flag if any part of my stated scale expectations would justify a different choice than the default boring option, and explain why.
```

---

## Validate Before You Move On

- [ ] Every stack choice is justified against your actual team size and timeline — not novelty
- [ ] You're using a monolith unless you have a concrete, current reason not to
- [ ] Database choice is Postgres unless your data genuinely doesn't fit relational
- [ ] No additional database/service was added "for scale" without a measured bottleneck
- [ ] Hosting matches your team's actual DevOps capacity, not an aspirational one
- [ ] You could explain each choice to another engineer in one sentence, with a reason

> [!TIP]
> Write this stack decision down in one place. You'll reference it directly in System Architecture Diagram, Frontend Architecture, and Backend Architecture instead of re-deciding (or re-explaining to AI) at each step.

---

**Next:** System Architecture Diagram — map how these pieces actually connect.
