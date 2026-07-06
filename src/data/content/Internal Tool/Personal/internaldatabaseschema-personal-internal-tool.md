---
title: Database Schema
slug: database-schema
phase: Phase 2
mode: personal
projectType: internal-tool
estimatedTime: 25–30 min
---

# Database Schema

Every decision so far — your business rules, your forms, your data-driven UI — has been describing a data model without naming it as one. This module makes that model explicit: the actual tables, fields, and relationships your tool will store and query.

Get this right now, and Phase 3 (Development) becomes mostly mechanical. Get it wrong, and you'll be restructuring data mid-build.

---

## Your Schema Is Already Mostly Written

You're not starting from a blank page. Pull directly from earlier modules:

- **Business Rules** told you what fields exist and what constraints apply
- **Forms Design** told you what data gets entered and in what shape
- **Table UX** told you what gets displayed, sorted, and filtered
- **Authorization (RBAC)** told you whether you need an "owner" field

This module's job is assembly and precision, not invention.

---

## Start With Entities, Not Columns

An entity is a "thing" your tool tracks — usually one per major noun in your PRD. Don't think about column types yet; just list what the tool needs to remember.

**Worked example — invoice tracker:**

```
Entities:
- Invoice (client, amount, due date, status)
```

Notice this tool likely needs only *one* entity. Don't invent additional tables (like a separate "Client" table) unless your requirements actually call for it — see the section below on when to split entities.

---

## Define Each Field With Real Precision

For every entity, specify each field's name, type, and constraints — the kind of detail that removes ambiguity for whoever (or whatever) builds this next.

| Field | Type | Constraints |
|---|---|---|
| id | unique identifier | auto-generated, primary key |
| client_name | text | required |
| amount | decimal/number | required, must be > 0 (from Business Rules) |
| due_date | date | required, can be in the past (from Business Rules) |
| status | text/enum | one of: "unpaid", "paid" — required, defaults to "unpaid" |
| created_at | timestamp | auto-generated |

> **Rule of thumb**
> Every constraint listed here should trace back to a rule you already wrote in the Business Rules module. If you're inventing a new constraint here for the first time, pause — that's a decision that should have been made explicitly earlier, not discovered while designing the schema.

---

## When to Split One Entity Into Two

A common beginner mistake is either cramming everything into one table, or splitting into far more tables than the data actually needs. Use this test:

> **Split into a separate table when:** the same piece of information would otherwise be repeated across many rows, and that repetition creates a real risk of inconsistency.

> **Example**
> If you invoice the same handful of clients repeatedly, storing `client_name` as plain text on every invoice risks typos ("Acme Co." vs "Acme Corp.") splitting what should be one client into two. Splitting into a separate `Client` table (referenced by ID from `Invoice`) fixes that — but only add this if you've actually noticed repeat clients matter to you, not preemptively.

For a true MVP, it's often correct to start with the simpler, single-table version and split later, once you feel the actual pain of duplication — this mirrors the same "don't build for a problem you don't have yet" principle from earlier modules.

---

## Relationships: Keep Them as Simple as the Real Data

If you do have multiple entities, define how they connect using the simplest relationship type that's actually true.

| Relationship type | Example | 
|---|---|
| One-to-many | One Client has many Invoices |
| Many-to-many | (Rare in simple personal tools — e.g., many Invoices could span many Projects) |

> **Watch out for premature many-to-many**
> Many-to-many relationships add real complexity (junction tables, more complex queries). Confirm the relationship is genuinely many-to-many, not actually one-to-many described loosely. Most personal tool relationships turn out to be one-to-many once examined carefully.

---

## Encode Boundary Conditions as Real Constraints, Not Just Documentation

Your Business Rules module resolved boundary conditions in plain language ("amount must be greater than $0"). Where your database technology supports it, encode these as actual constraints — not just something you remember to check in application code.

> **Why this matters**
> A constraint enforced at the database level protects your data even if a future code change accidentally skips a validation check. It's a small amount of upfront work that prevents an entire category of "how did this bad data get in here" debugging later.

---

## Write the Final Schema

Consolidate everything into one reference document — this is what you'll hand directly to AI tools during Phase 3.

```
## [Entity Name]
| Field | Type | Constraints |
|---|---|---|
| ... | ... | ... |

Relationships: [describe, if more than one entity]
```

---

## Using AI to Review Your Schema

> **Copy this prompt**
> ```
> Here's my proposed database schema for a personal internal tool:
>
> [paste your schema]
>
> Here are my formalized business rules, for cross-reference:
>
> [paste business rules]
>
> Review it:
> 1. Does every constraint in my business rules have a corresponding
>    field constraint in the schema? Flag any gaps.
> 2. Is there any unnecessary table splitting, given this is a
>    single-user personal tool with modest data volume?
> 3. Is there any missing table split where duplication risk is real
>    (e.g., repeated client names) and I haven't addressed it?
> 4. Are relationships correctly typed (one-to-many vs many-to-many)?
> ```

> **Validation warning**
> AI sometimes defaults to adding tables "for good practice" — audit logs, history tables, soft-delete flags — that may not be justified for your actual scale. Cross-check every suggested addition against a real requirement before accepting it.

---

## What You Should Have Now

- A complete entity list, each with fully specified fields, types, and constraints
- Every constraint traceable back to a rule from the Business Rules module
- Table splits justified by real duplication risk, not assumed "best practice"
- Relationships correctly typed and no more complex than the real data requires

With your data structure defined, the next module — Workflow Engine — covers whether (and how) your tool needs to manage multi-step processes beyond simple CRUD operations on this schema.
