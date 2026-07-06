---
title: Documentation
slug: documentation
phase: Phase 3
mode: personal
projectType: api-product
estimatedTime: 15-25 min
---

# Documentation

This module is not about building your public developer docs site — that's a dedicated focus later, in the **API Documentation** and **OpenAPI Specification** modules of Phase 5, once your endpoints have stabilized. Writing polished public docs against an API that's still changing weekly means rewriting them constantly.

Right now, in Development, the goal is narrower and more urgent: **make sure future-you (and anyone testing this with you) can actually use and maintain what you just built**, without re-reading every file to remember why a decision was made.

---

## What Belongs Here vs Phase 5

| Documented now (Phase 3) | Documented later (Phase 5) |
|---|---|
| README: setup, env vars, how to run locally | Full public API reference site |
| Inline comments explaining *why*, not *what* | OpenAPI specification |
| A running list of endpoints that exist so far | Interactive API playground |
| Notes on non-obvious decisions | Postman collection, SDK usage guides |

> **Decision card**
> If a piece of documentation would embarrass you to delete and rewrite in three weeks, it belongs in Phase 5, not here. If it would take you 20 minutes to reconstruct from memory if you lost it, write it down now.

---

## The README: Your Actual Priority

For a solo project, the README is the single highest-leverage document you'll write. It's what makes the difference between reopening this project in a month and being productive in five minutes, versus an hour of re-discovery.

```markdown
# [API Name]

[One sentence: what this API does and for whom]

## Setup

\`\`\`bash
npm install
cp .env.example .env  # fill in the values below
npm run dev
\`\`\`

## Environment Variables

| Variable | Purpose | Example |
|---|---|---|
| DATABASE_URL | Postgres connection string | postgres://... |
| REDIS_URL | Used for rate limiting and queues | redis://... |
| WEBHOOK_SIGNING_SECRET_DEFAULT | Fallback signing secret for dev | (generate locally) |

## Running Tests

\`\`\`bash
npm test
\`\`\`

## Architecture Notes

- Auth: API keys, hashed with SHA-256 (see \`src/lib/api-keys.ts\`)
- Background jobs: BullMQ + Redis, worker runs as a separate process
  via \`npm run worker\`
- Rate limits: token bucket, keyed by API key or IP (see \`middleware/rate-limit.ts\`)
```

> **Tip — env vars are the #1 thing that blocks future-you**
> Six weeks from now you will not remember which environment variables are required, optional, or what format they expect. An `.env.example` file with every variable your app reads, plus the README table above, eliminates the single most common "why won't this start" moment when you come back to a project.

---

## Inline Comments: Explain *Why*, Not *What*

Code already says what it does. Comments earn their place by saying something the code can't: the reasoning behind a non-obvious choice.

```typescript
// BAD — restates the code, adds nothing
// Loop through orders and check status
for (const order of orders) {
  if (order.status === "pending") { ... }
}

// GOOD — explains a decision that isn't visible in the code itself
// Using 404 instead of 403 here deliberately — see Authorization
// Implementation module. Returning 403 would confirm the resource
// exists to users who don't own it.
if (resource.userId !== req.user.id) {
  return res.status(404).json({ error: "Not found" });
}
```

> **Warning — comments that restate code rot silently**
> A comment that just repeats what the next line does provides zero value and nobody notices when it goes stale after a refactor. A comment explaining *why* is far more likely to get updated, because removing it without addressing the reasoning it describes feels obviously wrong.

---

## A Running Endpoint List (Not a Full Reference Yet)

You don't need OpenAPI yet, but you do need to not lose track of what exists. A single markdown table in the repo is enough for now.

```markdown
## Endpoints (informal — see Phase 5 for full OpenAPI spec)

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | /orders | API key (write) | |
| GET | /orders/:id | API key (read) | Ownership-scoped |
| DELETE | /orders/:id | API key (write) | Ownership-scoped |
| POST | /webhooks | API key | Validates URL against SSRF list |
| POST | /reports | API key | Async — returns 202 + statusUrl |
```

This becomes the input you hand to AI when generating the formal OpenAPI spec in Phase 5 — keeping it current now saves you from reconstructing your entire API surface from source code later.

---

## Documenting Non-Obvious Decisions

Not every decision needs a formal ADR (Architecture Decision Record) at personal-project scale, but decisions that *look wrong at first glance* deserve a sentence explaining why they're actually correct — otherwise future-you (or an AI assistant helping you later) will "fix" them back into a bug.

```markdown
## Decisions

- **API keys use SHA-256, not bcrypt.** Keys are high-entropy random
  strings already, not human passwords — bcrypt's slowness is
  unnecessary overhead here. See API Keys Management module.
- **Worker runs as a separate process from the API server**, even
  though they're deployed to the same host today. Keeps a slow job
  from blocking request handling, and makes splitting them across
  hosts later a config change, not a rewrite.
```

---

## AI Prompt: Generate a README From Your Code

```
Generate a README.md for this API project based on the actual code.

Project structure:
[paste directory tree or key file list]

package.json:
[paste package.json]

Include:
- One-sentence description of what the API does
- Setup instructions (install, env setup, run)
- A table of required environment variables, inferred from
  process.env usages in the codebase — list every one you find
- How to run tests
- A short "Architecture Notes" section summarizing auth strategy,
  background job setup, and rate limiting approach in 1 sentence each

Keep it under 100 lines. This is an internal/solo-dev README, not
public-facing marketing copy.
```

---

## Validating AI Output

- **Cross-check the env var table against actual `process.env` usages in your code**, not just the `.env.example` file — the two can drift, and AI will sometimes only read one source.
- **Confirm architecture notes match what you actually built**, not a generic description of "a typical API" — AI sometimes fills gaps with plausible-sounding defaults rather than admitting uncertainty.
- **Check for stale references** if you regenerate this later — a README describing an in-process job runner after you migrated to BullMQ is actively misleading.

---

## Common Mistakes

- Writing extensive comments explaining *what* code does instead of *why* a decision was made — the former rots, the latter doesn't.
- Letting the endpoint list or env var table drift out of sync with actual code, making it actively misleading rather than just incomplete.
- Investing in a polished public docs site before the API surface has stabilized — you'll rewrite it in Phase 5 anyway.
- No setup instructions at all, forcing future-you to reverse-engineer `npm run dev` requirements from source.

---

## Validation Checklist

- [ ] README has working setup instructions you could follow after months away from the project
- [ ] Every environment variable the code reads is documented, with an example value
- [ ] Comments explain reasoning behind non-obvious decisions, not restate adjacent code
- [ ] A running endpoint list exists somewhere in the repo, even informally
- [ ] Decisions that "look wrong" at a glance have a one-line explanation nearby
- [ ] Nothing here duplicates effort you'll redo in the Phase 5 documentation modules

---

## Phase 3 Complete

You've now built the full development layer: core API implementation, database, authentication, authorization, API keys, rate limiting, background jobs, durable queues, webhooks, an SDK, tests, and working documentation for yourself. The next phase — **Production Readiness** — hardens all of it: security review, performance, caching, monitoring, and CI/CD.
