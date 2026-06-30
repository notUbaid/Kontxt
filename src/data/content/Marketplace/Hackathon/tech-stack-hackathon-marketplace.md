---
title: Tech Stack
slug: tech-stack
phase: Phase 2
mode: hackathon
projectType: marketplace
estimatedTime: 15-20 min
filename: tech-stack-hackathon-marketplace.md
---

# Tech Stack

Every other module in this phase made architectural decisions in the abstract. This module makes them concrete — the actual tools you'll open your editor and start using in the next phase. By the end, this should be a short, finalized list your whole team agrees on, not an open question anymore.

---

## The One Rule That Overrides Everything Else

> **Reframe:** In a hackathon, the best tech stack is the one your team already knows well — not the one that's technically superior, trendiest, or most impressive-sounding in your pitch. Every hour spent learning new syntax is an hour not spent on your core loop, and judges evaluate what you built, not what you built it with.

If your team is genuinely split between two stacks they both know equally well, use the tiebreakers later in this module. Otherwise, this decision should take minutes, not hours.

---

## The Stack Components, In Order of Decision Priority

### 1. Frontend Framework

| Familiarity-driven default | Why |
|---|---|
| Whatever your team has shipped something real in before | Syntax fluency matters more than framework reputation under time pressure |
| If genuinely new to everyone: React (most tutorials, most AI training data, most community support) | Lowest friction when you inevitably need to look something up fast |

### 2. Fullstack Framework (Recommended)

Per Architecture Fundamentals, a monolith is the default. Pick a framework that gives you both frontend and backend in one project:

| Framework | Best fit |
|---|---|
| Next.js | Most common default — large ecosystem, strong AI tool support, works well with most hosting |
| Remix / SvelteKit | If your team specifically prefers these and already knows them |
| Rails / Django | If your team is stronger in Ruby/Python than JavaScript — fullstack conventions built in |

### 3. Database

Per Architecture Fundamentals, relational by default for marketplace data:

| Option | Pick when |
|---|---|
| Supabase (Postgres) | Default — free tier, instant setup, built-in auth if you need real auth |
| Neon / Railway Postgres | If you prefer a more minimal Postgres host without Supabase's extra features |
| SQLite | Smallest, simplest concepts with no real deployment scaling need |

### 4. Auth (If Needed)

Per the Authentication module — only relevant if you decided against the role-switcher pattern:

| Option | Pick when |
|---|---|
| Supabase Auth / Clerk | Fastest managed setup, minutes not hours |
| NextAuth/Auth.js | If using Next.js and want more control without building from scratch |

### 5. Hosting

| Option | Pick when |
|---|---|
| Vercel | Default for Next.js and most JS frameworks — fastest deploy, generous free tier |
| Railway / Render | Good for fullstack apps with a separate backend process or non-JS stacks |
| Netlify | Comparable alternative to Vercel for static/JAMstack-style apps |

---

## The Decision Matrix

Use this to settle disagreements quickly rather than debating at length:

| If your team... | Default to |
|---|---|
| Knows React/Next.js well | Next.js + Supabase + Vercel |
| Knows Python/Django well | Django + Postgres + Railway |
| Has never shipped anything together before | Next.js + Supabase + Vercel (most tutorials, most AI assistance available) |
| Wants to skip backend entirely | A no-code/low-code builder (Bolt, Lovable) — valid if your strength is product/design |

> **Best Practice:** If you're still debating after 15 minutes, pick the option with more team members familiar with it and move on. The cost of further debate exceeds the cost of a slightly suboptimal stack choice at this stage.

---

## What to Explicitly Avoid

- **Microservices or separate backend/frontend repos** — covered in Architecture Fundamentals, still applies here at the tool level
- **A new framework or language nobody on the team has used** — the single most common cause of lost hackathon hours
- **Over-engineered state management** (complex global state libraries) for an app this size — local component state and simple data fetching almost always suffice
- **Premature tooling** — don't add a testing framework, a CI pipeline, or a linter configuration beyond defaults; none of it serves a 24-48 hour build

> **Common Mistake:** Choosing a stack based on what would look impressive in the pitch deck's "How It Works" slide rather than what the team can actually execute fast. A working app in a "boring" stack beats a half-working app in an impressive one, every time a judge actually interacts with it.

---

## Locking the Decision

Once chosen, write it down somewhere the whole team can see — a pinned message, a README header, a shared doc. This prevents the costly mid-hackathon moment where one teammate starts building in a different framework than the rest of the team assumed.

- [ ] Frontend/fullstack framework: ___________
- [ ] Database: ___________
- [ ] Auth approach: ___________ (or "role switcher, no real auth")
- [ ] Hosting: ___________
- [ ] Decision shared with full team, no ambiguity remaining

---

## Using AI Effectively Here

Use AI to finalize the stack decision quickly if your team is genuinely undecided, and to scaffold the initial setup the moment it's locked.

**📋 Copy this prompt:**

```
My team is deciding our hackathon marketplace tech stack.

Team familiarity: [list each person's strongest languages/frameworks]
Core loop requirements: [paste from PRD]
Auth decision: [from Authentication module]
Time remaining: [hours]

Recommend a single, specific stack (frontend/fullstack framework, database, hosting) based on maximizing what we can actually ship given our familiarity — not based on what's technically best in the abstract. Justify the choice in one or two sentences, then give me the exact commands to scaffold a new project with this stack so we can start building immediately.
```

---

## Validating the Output

- [ ] Does the chosen stack match what your team already knows, not what's newest or most impressive?
- [ ] Is it a single monolithic setup, with no unnecessary service separation?
- [ ] Has the decision been written down and shared with the whole team, with zero ambiguity?
- [ ] Can you scaffold a working "hello world" in this stack within the next hour?

---

## Before You Continue

- [ ] Stack finalized across all five components (frontend/fullstack, database, auth, hosting) — no open questions remaining
- [ ] Decision based on team familiarity, not novelty or impressiveness
- [ ] Decision documented and visible to the whole team
- [ ] Initial project scaffolded and ready for Phase 3 development to begin

**Next up — Phase 3, Development:** Auth Implementation — turning your Authentication decision into working code.
