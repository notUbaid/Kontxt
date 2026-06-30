---
title: Tech Stack Selection
slug: tech-stack-selection
phase: Phase 2
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Tech Stack Selection

This decision has one rule that overrides every other consideration: **pick what you already know.** A hackathon is the worst possible time to learn a new framework — every hour spent fighting unfamiliar syntax is an hour not spent on your core loop.

---

## The Only Three Criteria That Matter Here

> **Decision Matrix — Rank candidates on these, in this order**
> 1. **Familiarity** — have you shipped anything with this before?
> 2. **AI tool support** — does Claude Code / Cursor / your tool of choice generate strong code in this stack? (Mainstream stacks get dramatically better AI output than niche ones.)
> 3. **Deployment friction** — can you go from code to a live, callable URL in minutes, not hours?

Notice "best practice" and "what scales" aren't on this list. Those matter in Production mode. Right now, the stack that gets you to a working demo fastest is the correct stack — full stop.

---

## Common Hackathon-Ready Options

| Stack | Setup speed | AI tool support | Deployment |
|---|---|---|---|
| **Node.js + Express/Hono** | Fast | Excellent — most-trained-on backend pattern | Vercel, Railway, Render — minutes |
| **Python + FastAPI** | Fast | Excellent, plus auto-generated OpenAPI docs for free | Railway, Render — minutes |
| **Serverless (Cloudflare Workers / Vercel Functions)** | Fast for simple routes | Good | Instant — no server to manage at all |

> **Tip — FastAPI gives you Phase 1 documentation work for free.**
> If you chose Python and FastAPI, your locked request/response schemas (Phase 1) map directly to FastAPI's type system, which auto-generates an interactive docs page. That can directly reduce the work in your later Documentation Strategy follow-through.

---

## Database Pairing (Preview)

You'll lock the actual schema in the next module, but your stack choice does narrow the options:

- **Node/Python + traditional server** → Postgres (via a hosted free tier like Supabase or Neon) is almost always the right default.
- **Serverless functions** → a serverless-native database (Cloudflare D1, Supabase, Turso) avoids cold-start connection issues that traditional Postgres drivers can hit in serverless environments.

Don't lock your database engine independently of this — they need to be compatible with how your functions actually run.

---

## What Not to Do

> **Warning — Don't introduce a new language, framework, or architecture pattern mid-hackathon "because it's better."**
> Microservices, GraphQL instead of REST when your design is already REST, a database you've never queried before — all of these are real engineering improvements in the wrong context. Production mode rewards this kind of rigor. Hackathon mode punishes it, because the clock doesn't care how elegant your unfinished architecture is.

> **Warning — Avoid stacks with non-trivial deployment setup.**
> If "getting it live" requires manual server provisioning, Docker orchestration, or infrastructure you've never configured, you've added hours of risk for no demo-visible benefit. A judge cannot tell whether your API is hosted on a hand-configured VPS or a one-click platform — they can only tell whether it's *up* when they test it.

---

## Choose Your Stack

Answer these directly:

1. **What have you actually shipped something with before?** (Not "studied" — shipped.)
2. **Does your AI coding tool produce reliable code in that stack?** (If you're unsure, this is worth a 2-minute test before committing.)
3. **Can you deploy it to a public URL in under 10 minutes?**

If the honest answer to all three points the same direction, that's your stack. Don't keep shopping for a "better" option once you have one that clears all three.

---

## Confirm Your Choice With AI

> **Copy Prompt — Stack Validation**
> ```
> I'm choosing a backend stack for a hackathon API with [X hours] remaining.
> I'm most familiar with: [language/framework you already know]
> My core loop needs: [mention async processing if relevant, from API Fundamentals]
> My target deployment: [Vercel / Railway / Render / Cloudflare / other]
>
> Confirm this is a reasonable choice for shipping fast, or tell me
> directly if there's a specific reason to reconsider — not a "best
> practice" reason, only a reason that would actually block me from
> finishing in time. Give me the exact setup commands to scaffold
> this project from zero.
> ```

> **Tip — Ask for blocking reasons only, not general alternatives.**
> Without that constraint, AI will often suggest a "better" framework you don't know — which is exactly the trap this module is warning against. Be explicit that you want validation, not options.

---

## Validate the Output

- If AI suggests switching frameworks without naming a concrete reason your chosen stack would fail, ignore the suggestion — familiarity wins.
- Check the setup commands are current — package managers and scaffolding tools change command syntax over time; if anything looks unfamiliar, verify it works before relying on it.
- Confirm the suggested deployment target actually supports your stack's runtime requirements (e.g. some serverless platforms have execution time limits that matter if you have async processing).

---

## Lock Your Stack

- [ ] Language and framework chosen, based on familiarity first
- [ ] Confirmed your AI coding tool handles this stack well
- [ ] Deployment platform chosen, reachable in under 10 minutes from a fresh project
- [ ] Database engine compatible with your runtime (serverless vs. traditional server)
- [ ] No new technology introduced "to learn" during this build

---

## What's Next

**Database Architecture** — design the schema that backs your locked resources, sized correctly for a hackathon timeline.
