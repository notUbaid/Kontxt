---
title: Tech Stack Selection
slug: tech-stack-selection
phase: Phase 2
mode: personal
projectType: api-product
estimatedTime: 15 min
---

# Tech Stack Selection

Every stack choice here is a tradeoff, not a "best" answer — the right stack is the one that lets you finish this specific project, not the one with the most stars on GitHub. This module gives you a framework for choosing quickly and moving on, because time spent debating frameworks is time not spent implementing the contract you already designed.

## Decision Criteria, In Priority Order

For a personal project, evaluate every option against these, in this order:

1. **You already know it, or it's genuinely easy to learn fast** — the biggest time cost in a personal project is usually the learning curve, not the framework's raw capability.
2. **It has first-class support for what you actually need** — request validation, structured errors, middleware/interceptors for your request lifecycle from the previous module.
3. **It deploys easily** — a stack that's a nightmare to deploy will quietly kill a personal project's momentum right before launch.
4. **It has strong AI tool support** — since you'll be building much of this with AI assistance, popular, well-documented frameworks produce far more reliable AI-generated code than obscure ones.

Notice "it's the fastest at scale" and "it's what production companies use" aren't on this list. Those matter for different projects, not this one.

## Common Choices for a Personal API Product

| Stack | Good fit when | Watch out for |
|---|---|---|
| **Node.js + Express/Fastify** | You want fast iteration, huge ecosystem, and strong AI tool familiarity | Type safety requires deliberate setup (TypeScript) — don't skip it for an API contract this precise |
| **Python + FastAPI** | You want built-in request validation and auto-generated OpenAPI docs almost for free | Slightly more ceremony around async if you're new to it, but well worth it here |
| **Node.js/Python + serverless functions** | You want to avoid managing a server at all for a small personal project | Cold starts and stateless-function constraints can complicate anything needing persistent connections |

> **Tip:** FastAPI is worth serious consideration specifically for an API product — it validates requests against your schema automatically and generates an OpenAPI spec from your code, which directly feeds into **OpenAPI Specification** in Phase 5 with almost no extra work.

## Database: Match It to Your Resource Model

You sketched resource relationships in **API Resources**. That sketch tells you what you need here:

| If your resources are... | Consider |
|---|---|
| Clearly structured, relational (subscriptions belong to users, webhooks belong to subscriptions) | PostgreSQL — mature, reliable, and the safe default for most API products |
| Loosely structured, schema varies by record | A document store (MongoDB) — but only if you have a real reason, not by default |
| Very simple, low volume, personal-scale | SQLite is a genuinely reasonable choice for a personal project — don't over-provision infrastructure you don't need |

For most personal API products with clear resources and relationships, **PostgreSQL** is the right default. It's what you'll use with an ORM like Prisma to move quickly while keeping real schema guarantees.

## What NOT to Add Yet

- **A caching layer (Redis)** — add this in **Caching** (Phase 4) if you actually have a performance problem, not preemptively.
- **A message queue** — only needed if you have genuine background/async work (**Background Jobs**, Phase 3). Don't add infrastructure for a job you haven't identified yet.
- **Microservices** — a personal API product is a single service. Splitting it into multiple services adds real operational overhead for zero benefit at this scale.

> **Warning:** The most common mistake at this stage isn't picking the "wrong" framework — frameworks are all viable. It's over-provisioning infrastructure (queues, caches, multiple services) for a system that will see a fraction of the traffic that would justify it. Every piece of infrastructure you add is something you have to run, monitor, and debug.

## Personal Mode: Optimize for Finishing

The stack that gets your MVP actually deployed and working beats the stack that's theoretically more scalable but takes you three extra weeks to learn. You can always migrate later if this project outgrows its stack — that's a good problem, and a rare one for a personal project to actually reach.

## AI Prompt: Validate Your Choice Against Your Actual Requirements

```
My API's resource model: "[paste from API Resources]"
My request lifecycle needs: auth, rate limiting, validation, structured errors (from API Fundamentals)
My familiarity: [languages/frameworks you already know]

1. Given what I already know, recommend one backend framework and justify it against my actual requirements, not general popularity.
2. Recommend a database choice based on my resource relationships specifically.
3. Confirm I don't need a cache, queue, or multiple services for this MVP — or flag if something in my design genuinely requires one.
```

## Before You Continue

- [ ] I've picked a backend framework based on familiarity and fit, not hype
- [ ] I've picked a database that matches my actual resource relationships
- [ ] I've confirmed I'm not adding caching, queues, or multiple services prematurely

When all three are checked, move to **Database Architecture**.
