---
title: Database Architecture
slug: database-architecture
phase: Phase 2
mode: hackathon
projectType: api-product
estimatedTime: 12-18 min
---

# Database Architecture

Your resources (Phase 1) are about to become tables. This module is mostly translation, not new design — the fields you already locked in Request and Response Design tell you most of what your schema needs.

---

## SQL vs. NoSQL: Default to SQL

> **Decision Card — Unless your data is genuinely document-shaped, choose Postgres.**
> Your resources have defined fields, types, and relationships — that's relational data. SQL gives you data integrity (foreign keys, constraints) almost for free, which matters more when you're moving fast and have no time to debug data corruption mid-demo. Reach for NoSQL only if your core resource is naturally a flexible, schema-less document (e.g. arbitrary user-generated JSON blobs).

For most API products in this track — including resource-and-relationship shapes like transcripts and action items — Postgres via a hosted free tier (Supabase, Neon, Railway) is the fastest path to something reliable.

---

## Translate Resources Into Tables

Take your locked resources and request/response fields and map them directly:

> **Example — `transcripts` table**
> ```sql
> CREATE TABLE transcripts (
>   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
>   raw_text TEXT NOT NULL,
>   meeting_title TEXT,
>   status TEXT NOT NULL DEFAULT 'processing',
>   created_at TIMESTAMPTZ NOT NULL DEFAULT now()
> );
> ```

Every field here traces back to a decision you already made: `raw_text` and `meeting_title` from Request Design, `status` from your async pattern in Response Design, `created_at` because you'll need it for sorting and debugging.

---

## Default Fields Every Table Needs

| Field | Why |
|---|---|
| `id` | Primary key — use UUID, not auto-increment integers, to avoid leaking record counts to callers |
| `created_at` | Sorting, debugging, "what happened in what order" during a live demo |
| `updated_at` | Only if the resource is ever modified after creation |

> **Tip — UUIDs over sequential IDs for anything exposed in your API.**
> A sequential ID like `transcripts/14` tells a caller (or a competitor watching your demo) roughly how many records exist. UUIDs leak nothing. The cost — slightly longer IDs — is irrelevant at hackathon scale.

---

## Relationships: Foreign Keys for Nested Resources

If you nested a resource in Phase 1 (like action-items under transcripts), that relationship becomes a foreign key:

```sql
CREATE TABLE action_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transcript_id UUID NOT NULL REFERENCES transcripts(id),
  description TEXT NOT NULL,
  owner TEXT,
  due_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

The `REFERENCES` constraint isn't bureaucracy — it's what prevents an orphaned action-item from existing if something goes wrong during your demo, and it's free correctness you don't have to write code to enforce yourself.

---

## Don't Over-Normalize

> **Warning — Splitting data into more tables than your queries need is a hackathon-specific trap.**
> Textbook normalization might split `status` into its own lookup table with an enum reference. At hackathon scale, a plain text column with an application-level check is faster to build, faster to query, and just as correct for your purposes. Normalize only when duplication would actually cause a problem you'll hit during the demo — not because a database course said to.

---

## Indexes: Add Exactly Two Kinds

You don't need a full indexing strategy. You need these, and nothing else, for hackathon scale:

- **Foreign keys** — index `transcript_id` on `action_items` so the nested lookup (`GET /transcripts/:id/actions`) stays fast.
- **Anything you filter or sort by in a core loop query** — if you query `WHERE status = 'processing'` anywhere, index `status`.

Everything else is premature optimization at the data volumes a hackathon demo will ever see.

---

## Sensitive Data Handling

This connects directly to your Authentication Strategy: if you're storing API keys or any secret value in the database, never store it as plaintext.

> **Warning — Hash stored secrets, even in a hackathon build.**
> If you generate and store API keys for callers, store a hash, not the raw key (shown once at creation, like most real API platforms do). This is a five-minute decision, not a production-only concern — storing plaintext secrets is a real vulnerability regardless of your timeline.

---

## Migrations: Keep It Simple

You don't need a migration framework with rollback history for a hackathon build. One schema file, run once against your database, is enough:

> **Tip — A single `schema.sql` run manually (or via your hosting platform's SQL editor) beats setting up a migration tool you won't use twice.**
> Save migration tooling for Production mode, where schema changes happen repeatedly over a project's life. Here, you're writing the schema once and building on top of it.

---

## Generate Your Schema With AI

> **Copy Prompt — Schema Generation**
> ```
> My locked resources and relationships: [paste from API Resources]
> My locked request/response field types: [paste from Request/Response Design]
> Database: Postgres
>
> Generate the full schema as CREATE TABLE statements:
- UUID primary keys
- foreign keys for any nested resources
- created_at (and updated_at if the resource is ever modified)
- indexes only on foreign keys and any field used in filtering
- flag if any field should be hashed rather than stored as plaintext
>
> Don't over-normalize — keep this to the minimum tables needed.
> ```

> **Tip — This prompt should produce something you can paste and run immediately.**
> If the output needs significant editing to make sense, your locked resource/field inputs were probably incomplete — go back and tighten those rather than fixing the schema by hand repeatedly.

---

## Validate the Output

- Confirm every locked resource field appears in the schema with a matching type — silently dropped fields are easy to miss until your API throws an error mid-build.
- Check foreign keys exist for every nested relationship you defined in Phase 1.
- Confirm no secret-like field (API keys, tokens) is stored without a note about hashing.
- Reject any suggestion to add tables or lookup structures that don't trace back to a locked resource.

---

## Lock Your Schema

- [ ] Every locked resource has a matching table
- [ ] UUID primary keys used throughout
- [ ] Foreign keys in place for nested relationships
- [ ] Indexes added only where actually needed (foreign keys + filtered fields)
- [ ] Any secret values flagged for hashing, not plaintext storage

---

## What's Next

**Routing** — wire your route table (Phase 1) to actual handler functions, using the layered structure from API Fundamentals.
