---
title: System Architecture
slug: system-architecture
phase: Phase 2
mode: production
projectType: web-app
estimatedTime: 25–35 min
---

# System Architecture

System architecture is the map of how your software components connect, communicate, and depend on each other.

Getting this wrong early is expensive. The architecture you choose determines what's easy to scale, what's easy to change, and what will silently break under load.

You don't need a complex architecture. You need the right one for your current stage — with clear boundaries that let you evolve it later.

---

## Start With the Request Lifecycle

Before drawing boxes and arrows, understand how a single user request flows through your system end-to-end.

```
User Browser
     │
     ▼
Vercel Edge Network (CDN + routing)
     │
     ├──► Static assets served from edge (no compute)
     │
     └──► Next.js Server (SSR / Route Handlers)
               │
               ├──► Supabase Auth (session validation)
               │
               ├──► PostgreSQL (via Prisma / Supabase)
               │
               ├──► Redis / Upstash (cache layer)
               │
               └──► External APIs (Stripe, Resend, OpenAI, etc.)
```

Every architectural decision either adds a step to this lifecycle or removes one. Every added step is latency and a new failure point.

---

## The Right Architecture for Your Stage

Architecture should match your current scale and team, not your imagined future.

| Stage | Recommended Architecture |
|---|---|
| 0→1 (pre-launch) | Monolith — one Next.js app, one database, one deployment |
| 1→10k users | Monolith + managed services (auth, storage, email) |
| 10k→100k users | Extract bottlenecks into separate services only as needed |
| 100k+ users | Service-oriented, with dedicated teams per service |

> **The mistake:** Building for 100k users on day one. The overhead of microservices — separate deployments, inter-service networking, distributed tracing, eventual consistency — is real and slows down small teams dramatically.

Start as a well-structured monolith. Extract services when you have a measured, specific reason.

---

## Production Monolith Architecture

This is the architecture for a production-quality web app at launch stage.

```
┌─────────────────────────────────────────────────┐
│                  Next.js Application             │
│                                                 │
│  ┌─────────────┐    ┌──────────────────────┐   │
│  │  App Router  │    │   API Route Handlers  │   │
│  │  (UI Pages)  │    │  /api/[feature]/      │   │
│  └──────┬──────┘    └──────────┬───────────┘   │
│         │                      │                │
│  ┌──────▼──────────────────────▼───────────┐   │
│  │           Feature Modules                │   │
│  │   actions.ts │ queries.ts │ services.ts  │   │
│  └──────────────────────┬────────────────────  │
│                          │                      │
│  ┌───────────────────────▼────────────────────┐ │
│  │              lib/ (Clients & Config)        │ │
│  │   db.ts │ auth.ts │ supabase.ts │ redis.ts  │ │
│  └─────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
    PostgreSQL      Supabase         Upstash
    (Prisma)      Auth + Storage      Redis
```

**Key properties of this architecture:**

- One deployable unit — one `vercel deploy` ships everything
- Feature modules are isolated but share infrastructure clients
- Database access is always through Prisma — no raw SQL scattered through components
- External service clients are instantiated once in `lib/`, imported everywhere else

---

## Separation of Concerns

The most important architectural rule for a Next.js app:

**Never put database or secrets logic in client components.**

```
Server-side only:              Client-side only:
─────────────────              ─────────────────
Database queries               UI state
Auth session reading            User interactions
Secret API keys                Browser APIs
Server Actions                  Client-side fetching
Route Handlers                  Optimistic updates
```

In Next.js App Router, components are Server Components by default. The moment you add `'use client'`, the component and everything it imports runs in the browser. A Prisma import in a client component will break. A raw API key in a client component is a security incident.

**The boundary:**
```
Server Component → can call database, read secrets, return data as props
       ↓ (pass data as props)
Client Component → renders UI, handles interactions, calls Server Actions or API routes
```

---

## Data Flow Patterns

### Server Components (preferred for reads)
```tsx
// app/(app)/dashboard/page.tsx — Server Component
import { getProjects } from '@/features/projects/queries'

export default async function DashboardPage() {
  const projects = await getProjects() // Direct DB call, no API needed
  return <ProjectList projects={projects} />
}
```

No API route needed for reads that happen at render time. The server component calls the database directly and passes data as props.

### Server Actions (preferred for mutations)
```tsx
// features/projects/actions.ts
'use server'
import { db } from '@/lib/db'

export async function createProject(input: CreateProjectInput) {
  // Runs on server, can access DB, validates auth
  const project = await db.project.create({ data: input })
  return project
}
```

### API Route Handlers (for external clients or webhooks)
```ts
// app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  // Stripe calls this directly — needs to be an HTTP endpoint
}
```

Use Route Handlers when: an external service calls your API, you need streaming responses, or you're building a public API.

---

## External Services Architecture

Every external service your app depends on is a dependency with failure modes.

| Service | Failure Mode | Mitigation |
|---|---|---|
| Database down | App cannot read or write data | Connection pooling, retry logic, read replicas at scale |
| Auth service down | Users can't log in | Cache sessions, graceful degradation |
| Email provider down | Transactional emails fail | Queue emails, retry with backoff |
| Payment provider down | Users can't subscribe | Show maintenance message, log failed attempts |
| AI API down | AI features fail | Fallback UI, queue requests |

For each external service, decide: **what does the user experience when this fails?**

Design the fallback before you design the happy path.

---

## Caching Strategy

Caching is where architecture meets performance. Define it explicitly.

| Layer | What to cache | Tool |
|---|---|---|
| CDN / Edge | Static pages, public content | Vercel Edge (automatic) |
| Server | Expensive DB queries, aggregations | `unstable_cache` (Next.js) or Redis |
| Client | Server responses between navigations | TanStack Query |
| Database | Query results for repeated reads | Prisma + Redis |

**Cache invalidation** is hard. For most production apps, start with:
- Revalidate on mutation (clear the cache when data changes)
- Short TTLs (60–300 seconds) for dynamic content
- No caching for user-specific sensitive data

---

## Background Jobs

Some work shouldn't happen in the request lifecycle:
- Sending emails after signup
- Processing uploaded files
- Syncing data to external services
- Generating reports

**Options:**

| Option | Best for |
|---|---|
| **Vercel Cron Jobs** | Simple scheduled tasks (daily digest, cleanup jobs) |
| **Inngest** | Event-driven workflows, retries, complex multi-step jobs |
| **Trigger.dev** | Long-running jobs, AI workflows, file processing |
| **Supabase Edge Functions** | Database-triggered events |

Don't add a job queue on day one unless you have a specific use case. Vercel Cron covers most basic needs.

---

## Architecture Decision Checklist

- [ ] Request lifecycle is mapped end-to-end for at least one core user flow
- [ ] Clear boundary between server-only and client-only code
- [ ] No database clients imported in client components
- [ ] No API keys exposed to the browser (`NEXT_PUBLIC_` prefix only for non-sensitive config)
- [ ] External service failure modes are identified for each critical dependency
- [ ] Data flow pattern is chosen for each type of operation (reads, mutations, webhooks)
- [ ] Caching strategy is defined — even if "no caching yet" is a deliberate choice
- [ ] Background job solution identified if async processing is needed

---

## AI Prompt — Architecture Review

Use this before committing to your architecture:

```
You are a Staff Engineer reviewing the system architecture for a production web application.

My app: [describe in 2–3 sentences]
Stack: Next.js 14 App Router, TypeScript, Supabase (PostgreSQL + Auth + Storage), Prisma, Vercel
External services: [list e.g. Stripe, Resend, OpenAI]

Core user flows:
1. [e.g. User signs up → onboarding → creates first project]
2. [e.g. User uploads file → file is processed → results displayed]
3. [e.g. User subscribes → payment processed → features unlocked]

For each flow:
1. Map the request lifecycle step by step
2. Identify which operations should be Server Components, Server Actions, or API Route Handlers
3. Identify any operations that should be async / background jobs
4. Flag any potential security boundary violations (secrets in client, unprotected routes)
5. Identify the highest-risk failure point and recommend a mitigation

Be specific. Flag over-engineering as aggressively as under-engineering.
```

---

## When to Extract a Service

The temptation to break out microservices is real. Resist it until you have a specific, measured reason.

Extract a service when:
- A specific component has **independent scaling requirements** (high-traffic image processing, ML inference)
- A team boundary requires **independent deployment** (separate team, separate release cadence)
- A specific component uses a **different runtime** (Python ML model, Go for performance-critical path)
- You have **data isolation requirements** (compliance, multi-tenancy at the database level)

Not when:
- The codebase feels large
- You read a blog post about microservices
- You want to use a different language for one endpoint

A well-structured monolith with clean feature boundaries can serve millions of users. Extract when the cost of staying together exceeds the cost of splitting.
