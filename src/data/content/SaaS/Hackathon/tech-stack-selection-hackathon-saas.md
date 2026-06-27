# Phase 2 · Tech Stack Selection

> **Mode: Hackathon** — Optimize for demo quality and time to working screen, not perfection.

In a hackathon, the best stack isn't the most powerful — it's the one that lets you ship a polished demo in 24–48 hours. Every decision here compounds.

---

## The Hackathon Stack Principle

> Judges evaluate what they *see*, not what's underneath. Optimize for demo quality, speed to first working screen, and zero configuration pain on the day.

---

## Step 1 · What kind of SaaS are you building?

Pick the shape that matches your idea. Each type has different stack priorities.

### AI-powered tool
Bias toward FastAPI (Python) if your AI logic is complex. Next.js API routes work for simple Claude/OpenAI calls. Add Supabase for storing conversation history — judges love persistent state.

### CRUD / dashboard
This is where Next.js + Supabase shines. You'll have a working data table and form in under 2 hours. Add shadcn/ui for polished components with zero custom CSS.

### Marketplace / two-sided
Two user types = two auth roles. Supabase Row Level Security handles this cleanly. Stripe is the demo-safe payment layer — use test mode, judges expect it.

### Real-time / collaborative
Use Supabase Realtime or Ably for presence/sync. Avoid building your own WebSocket server — it will consume your entire time budget and break during the demo.

---

## Step 2 · Build your stack layer by layer

Select one option per layer. Recommended picks are marked with ★.

---

### Frontend framework

| Option | Notes |
|---|---|
| ★ **Next.js (App Router)** | Best AI tooling support, Vercel deploy is 1 click |
| Next.js (Pages Router) | Familiar, slightly faster to scaffold |
| SvelteKit | Fast DX, smaller ecosystem |
| Vite + React | Best for Python backends |
| Remix | Strong for forms, slower setup |

> Next.js wins on ecosystem and AI code generation quality.

---

### Backend / API layer

| Option | Notes |
|---|---|
| ★ **Next.js API routes** | Zero extra deployment, colocated with frontend |
| ⚡ FastAPI (Python) | Best for AI/ML-heavy apps, needs separate host |
| Express.js | Familiar, more setup than Next.js routes |
| Hono (edge-ready) | Tiny and fast, less documentation |
| ⚠ tRPC | Type-safe joy, steep learning curve under pressure |

> Next.js API routes eliminate a separate server. Use FastAPI only if your team knows Python.

---

### Database

| Option | Notes |
|---|---|
| ★ **Supabase** | Postgres + auth + storage + realtime in one dashboard |
| PlanetScale (MySQL) | Serverless MySQL, great DX |
| Firebase Firestore | Good if you know it, NoSQL can complicate queries |
| Neon (serverless Postgres) | Cheap, fast, minimal UI |
| ⚠ Local SQLite | Great locally, painful to share in demos |

> Supabase gives you Postgres + Auth + Storage + realtime — all free tier, no credit card.

---

### Authentication

| Option | Notes |
|---|---|
| ★ **Clerk** | Pre-built UI, hooks, social login — 15 min setup |
| Supabase Auth | Free, good if already using Supabase |
| NextAuth.js (Auth.js) | Open source, some config required |
| Lucia | Lightweight, more manual work |
| ⚠ Roll your own | Do not do this in a hackathon |

> Skip rolling your own. Clerk is the fastest to a working auth UI — literally 15 minutes.

---

### AI / LLM integration

| Option | Notes |
|---|---|
| ★ **Vercel AI SDK + Claude** | Best streaming DX, multi-provider support |
| OpenAI SDK directly | Familiar, slightly more boilerplate for streaming |
| Anthropic SDK directly | Direct control, manual streaming setup |
| ⚠ LangChain.js | Powerful, heavily abstracted, debugging is harder |
| No AI integration | Skip this layer if not applicable |

> Vercel AI SDK abstracts streaming for any provider. Use it.

---

### Deployment

| Option | Notes |
|---|---|
| ★ **Vercel** | Zero config for Next.js, generous free tier, instant previews |
| Railway | Great for full-stack + DB co-location |
| Render | Solid free tier, slight cold starts |
| Fly.io | Docker-based, more setup time |
| Netlify | Good for static + functions, less flexible |

> Vercel for Next.js is a one-command deploy. Don't set up infrastructure during a hackathon.

---

## Step 3 · Common full-stack combos compared

| Combo | Setup time | Demo quality ceiling | AI integration | Best for |
|---|---|---|---|---|
| **Next.js + Supabase + Vercel** | ~20 min ✅ | High ✅ | Easy ✅ | Most SaaS types |
| Next.js + PlanetScale + Railway | ~45 min | High ✅ | Easy ✅ | MySQL shops |
| Remix + SQLite + Fly.io | ~60 min ⚠ | Medium | Manual ⚠ | Full control fans |
| SvelteKit + Firebase + Vercel | ~25 min | Medium | Manual ⚠ | Firebase familiarity |
| **Vite + FastAPI + Supabase** | ~40 min | High ✅ | Best ✅ | AI-first apps |

> **Don't mix unfamiliar layers.** Using two technologies you've never deployed together in a hackathon is a finishing risk. If you're new to one layer, make sure the others are rock solid.

---

## Step 4 · AI prompts for this phase

### Architecture review prompt

Copy this into Claude, fill in your stack, and run it before writing any feature code.

```
I'm building a [describe your SaaS in 1 sentence] for a hackathon. My planned stack is:
- Frontend: [framework]
- Backend: [API layer or BFF]
- Database: [DB + host]
- Auth: [provider]
- Deployment: [host]

Review this for a 48-hour hackathon context. Flag any integration that will cost me more than 30 minutes to set up. Suggest one swap if there's a faster path to the same result. Don't add complexity I haven't asked for.
```

---

### Scaffold generation prompt

Use this *after* your stack is locked. Do not run it before.

```
Generate the minimal project scaffold for:
- Framework: [framework]
- Auth: [provider + package]
- Database client: [ORM or query builder]
- One sample protected route: /dashboard
- One sample public route: /

Include: folder structure, package.json dependencies, env variable names (no values), and the 3 files I need to edit first.

Do not include: testing setup, CI/CD, Docker, or anything beyond running locally.
```

---

## Step 5 · Pre-flight validation checklist

> **Common ways stacks fail at demo time:** CORS misconfiguration, env vars not set in production, free tier cold starts, and auth redirects pointing to localhost. Check these before your first line of feature code.

- [ ] "Hello world" deploys successfully to your chosen host
- [ ] Database connection works from the deployed environment (not just local)
- [ ] Auth redirect URLs are configured for production domain
- [ ] All required env vars are set in production config
- [ ] Free tier limits checked — won't hit rate limits during the demo
- [ ] At least one end-to-end request works: browser → API → DB → response
- [ ] CORS headers are correct if frontend and backend are on different origins
- [ ] AI API key is funded and rate limits are confirmed

---

## Your stack summary template

Fill this in once decisions are made. Paste it at the top of your first AI coding session.

```
## Project stack

- Frontend: 
- Backend: 
- Database: 
- Auth: 
- AI integration: 
- Deployment: 
- Styling: 
```

---

## What comes next

**Phase 2 · Database Schema** — define your tables before writing a single query. AI generates significantly better schema when it has your PRD and user flows as context.
