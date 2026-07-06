---
title: Database Setup
slug: database-setup
phase: Phase 3
mode: hackathon
projectType: api-product
estimatedTime: 12-18 min
---

# Database Setup

Your schema (Phase 2) exists on paper. This module makes it real: provision the database, apply the schema, and replace the fake data your core logic was tested against with actual persistence.

---

## Provision and Apply Your Schema

1. Create a database on your chosen hosted provider (Supabase, Neon, or Railway — whichever you picked alongside your stack).
2. Run your locked `schema.sql` against it — most providers offer a SQL editor in their dashboard for exactly this.
3. Confirm the tables exist by running one query manually before writing any application code against them.

> **Tip — Verify before you build on top of it.**
> A typo in your schema (a misspelled column, a missing constraint) is far cheaper to catch with one manual `SELECT` now than to discover through a confusing application error later.

---

## Connection Strings Are Secrets

> **Warning — Never hardcode your database connection string.**
> It contains your database password. Store it in an environment variable (`.env`, excluded from git via `.gitignore`) and reference it from your application code. This is the same discipline as your API key handling from Authentication Strategy — secrets live in environment variables, never in committed files.

---

## Connection Handling Depends on Your Stack

| Stack type | What to watch for |
|---|---|
| **Traditional server (Express, FastAPI on Railway/Render)** | Use a connection pool, opened once at startup, reused across requests |
| **Serverless functions (Vercel, Cloudflare Workers)** | Each invocation can open a new connection — use a serverless-aware driver or pooler (e.g. Supabase's pooled connection string) to avoid exhausting your database's connection limit |

> **Warning — Connection exhaustion is a real hackathon failure mode, especially on serverless.**
> If every function invocation opens a fresh database connection without pooling, a burst of requests during your live demo can hit your database's connection limit and start failing — exactly when you need it most reliable. Confirm you're using your provider's recommended pooled connection string if you're on serverless.

---

## Write the Data Access Layer

This is the third layer from API Fundamentals — isolated functions that are the only code allowed to talk to the database directly.

> **Example — Data access function**
> ```js
> async function createTranscript({ rawText, meetingTitle }) {
>   const result = await db.query(
>     `INSERT INTO transcripts (raw_text, meeting_title, status)
>      VALUES ($1, $2, 'processing') RETURNING *`,
>     [rawText, meetingTitle]
>   );
>   return result.rows[0];
> }
> ```

Notice the query uses `$1`, `$2` placeholders instead of inserting values directly into the string.

> **Warning — String-concatenated SQL is a SQL injection vulnerability, not a style choice.**
> `` `INSERT INTO transcripts (raw_text) VALUES ('${rawText}')` `` lets a malicious caller send SQL as part of their input and have it executed. Parameterized queries (`$1`, `$2`, or your ORM's equivalent) aren't an optional best practice — they're the baseline defense, and they cost no extra time to write correctly from the start.

---

## Replace Fake Data With Real Calls

Go back to the core logic you built and verified in API Implementation. It was tested against fake/in-memory data — now wire it to your real data access functions.

> **Tip — Keep the data access layer thin.**
> It should only read/write data, not contain business logic. If you find yourself putting transformation logic inside a data access function, move it back to your logic layer — keeping these separate is what makes each one easy to test and debug independently.

---

## Generate the Data Access Layer With AI

> **Copy Prompt — Data Access Layer**
> ```
> My locked schema: [paste CREATE TABLE statements]
> My stack: [from Tech Stack Selection]
> Functions needed, based on my core logic: [list the operations —
> e.g. createTranscript, getTranscriptById, createActionItems]
>
> Implement these as isolated data access functions:
- parameterized queries only, no string concatenation
- appropriate connection handling for [serverless / traditional server]
- each function does one operation, no business logic mixed in
- throw clear errors on failure rather than silently returning null
> ```

> **Tip — List the exact functions you need rather than asking for "a database layer."**
> A specific function list produces exactly what your logic layer calls, instead of a generic CRUD set you'll have to trim or extend by hand afterward.

---

## Validate the Output

- Check every query uses parameterized placeholders, not string interpolation — this is non-negotiable, not a style preference.
- Confirm connection handling matches your actual stack (pooled correctly for serverless, reused correctly for a traditional server).
- Test each function manually against your real database before wiring it into a route — a function that looks correct can still fail on a constraint you forgot (like a `NOT NULL` field).
- Confirm failures throw clear errors rather than returning `undefined` or `null` silently — your centralized error handler (Routing module) depends on errors actually being thrown.

---

## Lock Your Database Setup

- [ ] Database provisioned, schema applied and manually verified
- [ ] Connection string stored as an environment variable, never committed
- [ ] Connection handling appropriate for your stack (pooled if serverless)
- [ ] All queries parameterized — zero string-concatenated SQL
- [ ] Core logic now reading/writing real data, not fake data

---

## What's Next

**Authentication Implementation** — turn your locked auth strategy into actual middleware that protects your real endpoints.
