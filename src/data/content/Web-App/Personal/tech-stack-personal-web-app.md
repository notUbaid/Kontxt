---
title: Tech Stack
slug: tech-stack
phase: Phase 2
mode: personal
projectType: web app
estimatedTime: 25–35 min
---

# Tech Stack

The tech stack you choose determines how fast you build, how much you learn, how much it costs to run, and how painful it is to maintain six months from now.

For a personal project, the right stack is not the most powerful one. It's the one you'll actually ship with — and come back to.

---

## The Personal Project Stack Criteria

Every stack decision should pass this filter:

| Criterion | Question to Ask |
|---|---|
| **Familiarity** | Do you know this well enough to be productive, or will you spend a week on setup? |
| **Learning value** | Does using this teach you something worth knowing? |
| **Simplicity** | Does this add complexity you'll have to maintain forever? |
| **Cost** | What does this cost at zero users? At 100? At 1,000? |
| **Ecosystem** | Are there good docs, community answers, and AI training data for this? |

The last point matters more than it used to. AI tools like Kontxt and Cursor are dramatically better at helping you with React, Next.js, Supabase, and Prisma than they are at helping you with niche frameworks with sparse documentation.

---

## The Recommended Personal Project Stack

This is an opinionated recommendation. It's not the only valid choice — but it's the stack that hits the best balance of learning value, productivity, cost, and long-term maintainability for a solo web app.

```
Frontend    React 18 + Vite + TypeScript
Styling     Tailwind CSS
Backend     Node.js (Express or Hono) — or skip entirely with Next.js
Database    Supabase (PostgreSQL + Auth + Storage)
Hosting     Vercel (frontend) + Supabase (backend/db)
```

**Why this stack for personal projects:**

- React + Vite is the fastest local development experience available. No waiting.
- TypeScript catches bugs before runtime. The learning curve pays off within weeks.
- Tailwind keeps styling co-located with components — easier to maintain solo.
- Supabase gives you a real PostgreSQL database, authentication, file storage, and a REST/realtime API — all free up to generous limits — without running your own server.
- Vercel deploys frontend in seconds, has a generous free tier, and handles preview deployments automatically.

**Monthly cost at zero users: ~$0.**

---

## The Alternatives Worth Knowing

Not every project fits the recommended stack. Here's where to deviate and why:

### If you want to ship faster with less code

**Use Next.js instead of React + Vite + separate backend.**

Next.js combines your frontend and API routes in one project. No separate backend service to deploy or maintain. Server components reduce the amount of client-side JavaScript you write.

```
Frontend + Backend   Next.js 14+ (App Router)
Database             Supabase or Prisma + PostgreSQL
Hosting              Vercel
```

Best for: content-heavy apps, apps with many server-rendered pages, solo developers who want one codebase.

---

### If your app is almost entirely frontend

**Skip the backend entirely.**

If your app stores data in the browser (localStorage, IndexedDB), calls third-party APIs directly, or uses Supabase's client SDK with Row Level Security — you may not need a custom backend at all.

```
Frontend    React + Vite
Database    Supabase (client SDK with RLS policies)
Hosting     Vercel or Netlify
```

Best for: note-taking apps, trackers, tools, anything where the user's own data doesn't need server-side processing.

> ** Tip**
> If you're not sure whether you need a backend, ask: "Does my app need to do anything that requires server-side code?" — sending emails, processing payments, calling APIs that require secret keys, running scheduled jobs. If the answer is no, you probably don't need one.

---

### If you're learning Python

**Use FastAPI instead of Node.js for the backend.**

```
Frontend    React + Vite
Backend     FastAPI (Python)
Database    Supabase or SQLite (local) / PostgreSQL (production)
Hosting     Vercel (frontend) + Railway or Render (backend)
```

Best for: developers who know Python better than JavaScript, projects with heavy data processing or ML integrations.

---

### If you want maximum simplicity

**Use a full-stack framework that does everything.**

```
Full-stack  SvelteKit or Remix
Database    Supabase or PlanetScale
Hosting     Vercel or Fly.io
```

Best for: developers who want to minimize context switching and keep the entire stack in one mental model.

---

## What to Avoid for Personal Projects

> ** Anti-Pattern: Microservices**
> You are one person. Microservices are for teams with separate ownership of services. One monolith — whether that's a Next.js app or a React + FastAPI pair — is the right architecture for a solo personal project.

> ** Anti-Pattern: Self-Hosted Database**
> Running your own PostgreSQL server on a VPS is operational overhead you don't need. Use Supabase, PlanetScale, or Railway. Let someone else handle backups, updates, and uptime.

> ** Anti-Pattern: Choosing a Framework You've Never Used**
> A personal project is a good place to learn a new tool — but not three new tools at once. If you're new to TypeScript, don't also pick up Svelte, Prisma, and Drizzle simultaneously. Pick one new thing per project. Use familiar tools for everything else.

> ** Anti-Pattern: Over-engineering the API**
> GraphQL, tRPC, and gRPC are powerful tools with real use cases. For a personal project with one frontend and one backend, a simple REST API with typed responses is easier to build, easier to debug, and easier to understand when you return to it months later.

---

## The Stack Decision Card

Use this to make your final call:

| Question | Answer |
|---|---|
| Do I need server-side rendering or a unified full-stack framework? | Next.js |
| Do I need a backend but want to minimize infrastructure? | React + Vite + Supabase (client SDK) |
| Do I need a custom backend (emails, payments, secret API keys)? | React + Vite + Hono/Express + Supabase |
| Do I prefer Python for the backend? | React + Vite + FastAPI |
| Is this mostly a frontend tool with local or simple data? | React + Vite, no backend |

---

## Using AI to Validate Your Stack Choice

**Copy Prompt**

```
I'm building a personal web app. Here is my PRD: [paste PRD]

I'm considering this tech stack: [list your choices]

Based on my project's requirements, tell me:
1. Is there anything in my PRD that this stack handles poorly?
2. Is there anything I'm overbuilding — technology I don't actually need given my scope?
3. What are the 2 most likely points of friction I'll hit with this stack for this specific project?
4. Is there a simpler stack that would serve my MVP equally well?

Be direct. I want to catch bad decisions before I start building.
```

---

## Tech Stack Checklist

- [ ] Frontend framework chosen with a reason
- [ ] Styling approach decided (Tailwind, CSS Modules, plain CSS)
- [ ] Backend approach decided: custom backend, Next.js API routes, or Supabase client-only
- [ ] Database chosen and free tier confirmed sufficient for MVP
- [ ] Hosting platform chosen for both frontend and backend
- [ ] Monthly cost at zero users is acceptable
- [ ] Stack doesn't introduce more than one genuinely new technology at once
- [ ] AI tools (Kontxt, Cursor) have strong coverage of your chosen stack

---

## What's Next

Move to **Database Architecture** — designing the tables, relationships, and data model that your application runs on.
