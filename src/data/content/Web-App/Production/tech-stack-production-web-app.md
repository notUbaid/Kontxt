---
title: Tech Stack
slug: tech-stack
phase: Phase 2
mode: production
projectType: web-app
estimatedTime: 25–35 min
---

# Tech Stack

Every technology decision you make now compounds. A bad choice at the stack level costs you weeks later — in rewrites, workarounds, and limitations you didn't see coming.

This is not about picking the newest or most popular tools. It's about picking the right tools for your constraints: team size, timeline, scale requirements, and what you actually need to ship.

---

## How to Think About Stack Decisions

Every tool you add to your stack has a cost:

- **Learning curve** — time before you're productive
- **Integration surface** — how it interacts with everything else
- **Operational overhead** — what breaks, what needs maintaining
- **Lock-in** — how hard it is to replace

The right stack minimizes total cost across all four. Not just the initial build time.

> **The best stack is the one your team can ship fast, maintain confidently, and debug quickly.**

Boring technology, chosen deliberately, beats exciting technology chosen carelessly.

---

## The Production Web App Stack (2025)

This is a well-validated, modern stack for production web apps. It's opinionated by design — every choice here has a clear reason.

### Frontend

| Layer | Recommended | Why |
|---|---|---|
| Framework | **Next.js 14+** (App Router) | SSR, SSG, API routes, file-based routing, Vercel-native |
| Language | **TypeScript** | Catches entire classes of bugs at compile time. Non-negotiable for production. |
| Styling | **Tailwind CSS** | Utility-first, no naming overhead, consistent design system |
| UI Components | **shadcn/ui** | Copy-paste components, fully owned, Tailwind-native, not a dependency |
| State | **Zustand** (global) + **TanStack Query** (server state) | Minimal boilerplate, clear separation of server vs. client state |
| Forms | **React Hook Form** + **Zod** | Performant, schema-driven validation, TypeScript-first |

**Why Next.js over Vite + React?**

For a production web app: Next.js wins because of SSR/SSG for SEO, built-in API routes, image optimization, middleware, and Vercel deployment being a single command. If you're building an internal tool with no SEO requirements, Vite + React is simpler and faster to start.

---

### Backend

| Layer | Recommended | Why |
|---|---|---|
| API | **Next.js Route Handlers** or **FastAPI** | Route handlers for simple APIs; FastAPI if you need a separate service, heavy compute, or Python ecosystem |
| ORM | **Prisma** (Node) or **SQLAlchemy** (Python) | Type-safe queries, migration management, excellent DX |
| Validation | **Zod** (shared with frontend) | Single schema, shared between client and server |

**Next.js Route Handlers vs. a Separate Backend**

Start with Route Handlers unless you have a specific reason not to. Deploying one service is simpler than two. Extract to a separate backend when you need: Python ML libraries, heavy CPU workloads, or independent scaling.

---

### Database

| Use Case | Recommended | Why |
|---|---|---|
| Primary database | **PostgreSQL** (via Supabase) | Reliable, relational, full SQL, free tier, built-in auth and storage |
| Full-text search | **Postgres FTS** or **Typesense** | Postgres FTS covers most cases; Typesense when you need typo tolerance and faceting |
| Caching | **Redis** (Upstash) | Serverless Redis, pay-per-use, no infrastructure |
| File storage | **Supabase Storage** or **Cloudflare R2** | R2 is cheaper at scale; Supabase Storage is simpler if already using Supabase |

**Why Supabase?**

Supabase gives you PostgreSQL + Auth + Storage + Realtime + REST/GraphQL APIs in one platform. For a production web app with a small team, this eliminates the need to separately configure and maintain each of these. The free tier is genuinely usable. The paid tier is reasonable.

---

### Auth

| Option | When to use |
|---|---|
| **Supabase Auth** | Already using Supabase; covers email, OAuth, magic link, MFA |
| **Auth.js (NextAuth)** | Need full control, custom providers, or not using Supabase |
| **Clerk** | Need the fastest implementation; opinionated UI components; willing to pay |

**Don't build auth yourself.** Auth bugs are security incidents. The edge cases in auth (token rotation, session management, CSRF, OAuth state parameters) are well-known, well-solved, and not worth reinventing.

---

### Infrastructure

| Layer | Recommended | Why |
|---|---|---|
| Hosting | **Vercel** | Zero-config Next.js deployment, preview deployments on every PR, edge network |
| CDN | Vercel Edge (included) | Automatic |
| DNS | **Cloudflare** | Free, fast, DDoS protection, easy SSL |
| Email | **Resend** | Developer-friendly, React Email templates, generous free tier |
| Monitoring | **Sentry** | Error tracking, session replay, performance monitoring |
| Analytics | **PostHog** | Product analytics + session replay + feature flags, open-source option |

---

## Decision: Monorepo or Separate Repos?

For most production web apps: **single repo, not a monorepo.**

A monorepo (Turborepo, Nx) makes sense when you have multiple deployable applications sharing code (e.g., a web app + a mobile app + a shared component library). The tooling overhead is real.

If you have one frontend and one backend: keep them in the same repository. Add the monorepo if you grow into needing it.

---

## Stack Comparison: When to Deviate

| Scenario | Adjustment |
|---|---|
| No SEO requirements (internal tool, dashboard) | Vite + React instead of Next.js |
| Heavy ML / Python-native backend | FastAPI on Cloud Run, separate from Next.js frontend |
| Real-time as a core feature (chat, collaboration) | Add Supabase Realtime or PartyKit |
| Multi-tenant SaaS with complex permissions | Consider PlanetScale or Neon instead of Supabase for database-level tenancy |
| Mobile app planned | Expo (React Native) sharing logic with the web app via a monorepo |

---

## What to Decide Now

Before writing any code, lock in these decisions:

- [ ] **Next.js App Router or Pages Router?** — App Router. Pages Router is legacy.
- [ ] **TypeScript from day one?** — Yes. Adding it later is painful.
- [ ] **Monorepo or single repo?** — Single repo unless you have multiple apps today.
- [ ] **Auth provider?** — Pick one. Don't defer this.
- [ ] **Database platform?** — Supabase unless you have a reason not to.
- [ ] **Deployment target?** — Vercel for Next.js. Confirm your team has access.
- [ ] **Are any AI features planned?** — If yes, decide which provider (OpenAI, Anthropic) and whether the API key lives server-side only (it must).

---

## AI Prompt — Stack Validation

Use this to pressure-test your stack choices before committing:

```
You are a Staff Engineer reviewing the proposed tech stack for a production web application.

My app: [describe in 2–3 sentences]
Team: [size, experience level]
Timeline: [estimated launch date or development duration]
Scale expectations: [e.g. "1,000 users in year 1" or "enterprise B2B with 10 customers"]

Proposed stack:
- Frontend: [your choice]
- Styling: [your choice]
- State management: [your choice]
- Backend: [your choice]
- Database: [your choice]
- Auth: [your choice]
- Hosting: [your choice]

For each layer:
1. Is this choice appropriate for my constraints?
2. What are the top 2 risks with this choice?
3. Is there a meaningfully better alternative given my situation?

Flag any missing layers (monitoring, email, file storage, caching) that I haven't addressed.
Be direct. Challenge assumptions. Don't validate choices that don't make sense.
```

---

## The Constraints That Should Drive Every Choice

| Constraint | Implication |
|---|---|
| Solo developer | Minimize operational surface. Managed services > self-hosted. |
| Small team (2–5) | Shared language across the stack (TypeScript everywhere if possible) |
| Early-stage / pre-revenue | Free tiers matter. Avoid per-seat pricing. |
| Enterprise customers | SOC2, SSO, and audit logs become requirements. Plan for them. |
| High scale expected | Separate stateless API from stateful database early. |
| Strict data residency | Self-hosted or single-region managed services. |

Your stack should reflect your actual constraints — not the stack of a company 10x your size.

---

## The Stack Is a Starting Point, Not a Contract

You will change parts of this stack. That is normal.

What matters is that you can change individual layers without rewriting everything else. Keep your layers loosely coupled. Don't let your database ORM leak into your UI components. Don't let your auth provider's types spread across your entire codebase.

Clean abstractions at layer boundaries make stack evolution possible without full rewrites.
