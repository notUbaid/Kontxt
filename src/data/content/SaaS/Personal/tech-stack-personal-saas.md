# Tech Stack

 **Estimated Time:** 15 Minutes

---

The best tech stack for your personal SaaS is the one you'll actually ship with.

Not the most scalable. Not the most impressive. Not the one used by the company you want to work at. The one that lets you move fast, stay unblocked, and build the product your persona needs.

Tech stack decisions feel high-stakes because they're hard to reverse. That's true — but the risk is smaller than it feels. Most personal SaaS products don't fail because of the wrong framework. They fail because they never ship.

Optimize for shipping first. Optimize for scale when you have users.

---

## The Decision Framework

Every layer of your stack has a right question.

| Layer | Right question |
|-------|---------------|
| **Frontend** | What lets me build UI fast without fighting the framework? |
| **Backend** | Do I actually need a separate backend? |
| **Database** | What's the simplest option that handles my data model? |
| **Auth** | Can I avoid building this myself? |
| **Hosting** | What deploys in one command and costs nothing until I have users? |
| **Email** | What sends transactional email reliably with minimal setup? |

Answer each question honestly for your specific product. Resist the pull toward whatever is trending.

---

## Frontend

For a personal SaaS with a web UI, the realistic options are:

| Option | Best when | Watch out for |
|--------|-----------|--------------|
| **React + Vite** | You know React, want full control | More decisions to make upfront |
| **Next.js** | You want routing, SSR, and API routes in one | Opinionated — fights you if you go against its grain |
| **SvelteKit** | You want simplicity and performance, willing to leave React | Smaller ecosystem, fewer AI training examples |
| **Remix** | Data loading patterns matter, web fundamentals first | Steeper learning curve for beginners |

For most solo personal SaaS projects: **Next.js**.

It handles routing, API routes, server-side rendering, and static generation. You get one framework instead of assembling multiple tools. The ecosystem is mature. AI knows it well — prompts produce accurate, usable output.

> **Tip**
>
> The framework that produces the best AI-assisted code is the one with the most training examples. React and Next.js have by far the most. If you're building primarily with AI assistance, this matters.

---

## Backend

Ask this question first: **do you need a separate backend?**

For many personal SaaS products — you don't.

| Scenario | Recommendation |
|----------|---------------|
| CRUD operations, standard auth, simple business logic | Next.js API routes or a BaaS (Supabase, Firebase) |
| Complex business logic, background jobs, third-party webhooks | Dedicated backend (Express, Fastify, Hono) |
| Heavy computation, ML inference, data pipelines | Separate service, consider Python |
| Real-time features (chat, live updates) | Supabase Realtime, Ably, or Pusher — not DIY |

Starting with a BaaS or API routes and extracting a backend later is almost always better than building a full backend you don't need yet.

> **Warning**
>
> Building a microservices architecture for a product with zero users is one of the most reliable ways to never ship.
>
> Start with the simplest backend that could possibly work. Extract complexity only when you have a concrete reason — not in anticipation of scale you may never need.

---

## Database

The right database for a personal SaaS is almost always a relational one.

Your data has relationships. Users own things. Things belong to categories. Events belong to users. A relational database handles this correctly and predictably.

| Option | Best when | Hosted options |
|--------|-----------|---------------|
| **PostgreSQL** | Almost always — full-featured, reliable, standard | Supabase, Neon, Railway |
| **SQLite** | Single-user tools, desktop-adjacent, truly tiny scale | Turso (edge SQLite) |
| **MySQL** | You have a specific reason | PlanetScale |
| **MongoDB** | Schema is genuinely unknown at build time | MongoDB Atlas |

Default to PostgreSQL unless you have a concrete reason not to.

Pair it with an ORM:

| ORM | Best for |
|-----|---------|
| **Prisma** | Type safety, schema-first, excellent DX, great AI support |
| **Drizzle** | Lighter, SQL-closer, faster queries, newer |
| **Kysely** | SQL-first, maximum control |

For a personal project: **Prisma**. The schema file is readable, migrations are handled, and AI produces accurate Prisma code reliably.

---

## Auth

Do not build auth yourself.

This is not about skill. It's about surface area. Auth is where security vulnerabilities live — session handling, token rotation, password hashing, OAuth flows, email verification. Every piece you build yourself is a piece you have to get right and keep right.

| Option | Best when | Cost |
|--------|-----------|------|
| **Clerk** | Fastest integration, best DX, pre-built UI | Free to ~10k MAU, then paid |
| **Auth.js (NextAuth)** | Full control, self-managed, Next.js native | Free, you own the data |
| **Supabase Auth** | Already using Supabase | Free tier generous |
| **Lucia** | Lightweight, framework-agnostic, full control | Free, more setup |

For most personal SaaS projects: **Clerk** if you want it done in an hour, **Auth.js** if you want zero vendor dependency.

> **Warning**
>
> "I'll add auth later" is how you build a product with no user data isolation.
>
> Auth shapes your data model. Every table that belongs to a user needs a user ID. Every query needs to filter by that user ID. Add auth at the start — not after you've built the data layer.

---

## Hosting

For a personal project, hosting has one job: be free until you have users, then be cheap.

| Option | Best for | Free tier |
|--------|---------|-----------|
| **Vercel** | Next.js — native deployment, zero config | Generous, hobby projects free |
| **Railway** | Full-stack apps, databases, background jobs | $5/mo after trial |
| **Render** | Simple deploys, good free tier, slower cold starts | Free with limits |
| **Fly.io** | Container-based, global deployment, fast | Generous free tier |
| **Supabase** | Postgres + Auth + Storage + Realtime in one | Free tier sufficient for early projects |

For Next.js: **Vercel**. Zero configuration. Deploys on push. Preview URLs for every branch. The default choice exists because it's genuinely the best option for this stack.

For your database: **Supabase** or **Neon** if you want a hosted Postgres that won't cost you anything until you have real traffic.

---

## Email

Transactional email — password resets, invoice notifications, welcome emails — needs a real email provider. Do not use your personal Gmail SMTP.

| Option | Best for | Free tier |
|--------|---------|-----------|
| **Resend** | Developer-first, excellent DX, React Email compatible | 3,000 emails/month free |
| **Postmark** | Deliverability-focused, well-established | 100 emails/month free |
| **SendGrid** | High volume, marketing + transactional | 100 emails/day free |

For a personal project: **Resend**. It pairs with React Email for component-based email templates. Setup takes 20 minutes. Free tier covers you until you have real users.

---

## The Recommended Stack for Most Personal SaaS

If you don't have a strong reason to deviate:

```
Frontend:   Next.js (App Router)
Styling:    Tailwind CSS + Shadcn/ui
Database:   PostgreSQL via Supabase or Neon
ORM:        Prisma
Auth:       Clerk or Auth.js
Hosting:    Vercel (frontend) + Supabase/Neon (database)
Email:      Resend + React Email
```

This stack:
- Has excellent AI code generation support
- Is free until you have users
- Deploys in one command
- Covers auth, database, email, and hosting without stitching together obscure tools
- Is used by enough real products that you'll find answers to every problem you hit

---

## When to Deviate

Deviate from the recommended stack when:

- You know another stack significantly better (use what you know)
- Your product has a specific technical requirement this stack can't meet
- You have a strong reason to avoid a specific vendor

Do not deviate because:
- It's more interesting to build with
- You want to learn a new technology while shipping a product
- You read that X is faster / more modern / what big companies use

Learning a new technology and shipping a product are two different goals. If the goal is shipping — use what you know.

---

## AI Prompt — Validate Your Stack Decision

```prompt
I'm building a personal SaaS product and I've chosen a tech stack. Help me validate it.

**Product:** [one sentence]
**Core features:** [paste Core features]
**My chosen stack:**
- Frontend: [your choice]
- Backend: [your choice or "none — using API routes"]
- Database: [your choice]
- ORM: [your choice]
- Auth: [your choice]
- Hosting: [your choice]
- Email: [your choice]

Do the following:
1. Identify any mismatches between my stack choices and my product requirements
2. Flag any choices that will create unnecessary complexity for a solo developer
3. Identify any missing layers I haven't accounted for
4. Tell me if any choice will cause problems at the scale of 0–1,000 users
5. Suggest one thing I could simplify without sacrificing what I need

Be direct. I want to catch stack mistakes before I start building.
```


---

## Tech Stack Checklist

- [ ] Frontend framework chosen — and it's one you can move fast in
- [ ] Backend decision made — separate service or API routes/BaaS
- [ ] Database chosen — defaulted to PostgreSQL unless a concrete reason not to
- [ ] ORM chosen — Prisma unless you have a reason to go lower level
- [ ] Auth provider chosen — not building it yourself
- [ ] Hosting decided — free tier covers early development
- [ ] Email provider chosen — not using personal SMTP
- [ ] Stack validated against product requirements
- [ ] No choices made because they're interesting — only because they're right

---

## Next

**Auth →** Your stack is decided. Now implement the most security-critical layer of your product correctly from the start.
