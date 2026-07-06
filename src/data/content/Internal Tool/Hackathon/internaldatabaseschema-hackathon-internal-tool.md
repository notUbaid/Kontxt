---
title: Database Schema
slug: database-schema
phase: Phase 2
mode: hackathon
projectType: internal-tool
estimatedTime: 15-20 min
---

# Database Schema

Everything you've decided so far — the workflow, the roles, the dashboard — has been pointing at a shape. This module is where that shape becomes actual tables and fields. Get this reasonably right now, and every form, table, and query in Phase 3 builds smoothly on top of it. Get it wrong, and you'll be fighting your own database at 2am.

## The Decision You're Actually Making

Not "what's the perfect normalized schema." It's: **what's the smallest set of tables that correctly represents the entities and relationships from our actual workflow, without either under-modeling (cramming everything into one table) or over-modeling (normalizing things we don't need yet)?**

For a hackathon, "good enough and correct" beats "theoretically perfect" every time.

## Derive Your Schema Directly From Earlier Decisions

You've already done the hard thinking. This module is translation, not fresh design.

| Earlier decision | What it becomes in the schema |
|---|---|
| Entities named in Workflow Analysis | Tables |
| Fields mentioned in your PRD's user flow | Columns |
| Roles from the User Roles module | A `role` column on your users table |
| Status changes in the workflow | A `status` column with a defined set of values |

> ** Best Practice:** Before opening a database tool, write your planned tables and columns in plain text first, cross-checked against your PRD's user flow. This five-minute step catches missing fields or forgotten relationships before you've written any code around them — much cheaper to fix in a text list than after building forms and queries against a wrong schema.

## The Minimum Viable Schema Pattern

For most internal tools, this shape covers the vast majority of hackathon needs:

```sql
users
  id, name, email, role

[core_entity]  -- e.g. requests, tickets, items
  id, title, description, status, priority,
  created_by (→ users.id), assigned_to (→ users.id),
  created_at, updated_at
```

> ** Tip:** Include `created_at` and `updated_at` timestamps on every table from the start, even if you don't display them in the MVP UI. They cost nothing to add now, and they're exactly the fields you'll want if you need to sort by "most recent" or show "last updated" during your demo — retrofitting them later means backfilling data you don't have.

## Decision: One Table vs Multiple Related Tables

| Situation | Approach |
|---|---|
| Simple attributes on the core entity (title, status, priority) | Columns on the core entity table — don't over-normalize |
| A genuinely repeating, list-like relationship (comments on a request, multiple attachments) | A separate related table with a foreign key |
| A fixed, small set of categories | A column with a constrained set of values (enum or check constraint), not a separate table |

> **️ Warning:** Don't create a separate table for something that's really just a fixed set of options (like status: pending/in-progress/done). A separate "statuses" table with a foreign key adds a join you don't need for a value that will realistically never change during your hackathon. Use a simple constrained column instead, and only split it out if the list genuinely needs to be dynamic.

## Getting Status Fields Right

Status is almost always the field your dashboard and demo depend on most heavily — get its definition tight.

- Define the exact, finite list of status values (e.g. `pending`, `in_progress`, `resolved`) — not a free-text field
- Confirm this list matches the actual stages in your workflow analysis, not a generic guess
- Decide the default status a new record gets when created

> ** Best Practice:** Use a constrained set of status values (an enum, or at minimum a check constraint) rather than a free-text field. A free-text status column will inevitably accumulate inconsistent values ("Pending", "pending", "PENDING") that break your filtering and dashboard logic — this is a common, avoidable source of hackathon bugs.

## What to Deliberately Skip at This Stage

| Skip for hackathon MVP | Why |
|---|---|
| Soft deletes / audit trails | Adds complexity with no visible demo value |
| Complex indexing strategy | Your data volume in a demo won't need it |
| Full normalization of every attribute | Slows you down for a benefit only relevant at real production scale |
| Migration tooling/versioning | Overkill for a schema that will only be built once |

> **️ Warning:** Don't spend hackathon time setting up a formal migration system for schema changes. At this scale, directly modifying your schema (and re-seeding test data if needed) is faster and entirely appropriate — migration tooling is a production-mode concern, not a hackathon one.

## Use AI to Generate the Schema From Your Workflow

**Prompt — Schema Generation From Requirements**
```
Based on this project context:
- Core entities from workflow: [list them]
- User roles: [list them]
- Status values in the workflow: [list the exact stages]
- Fields mentioned in the PRD's user flow: [list them]

Generate a database schema (SQL or ORM model, specify which) for a 
hackathon internal tool. Use constrained status values, not free text. 
Keep it to the minimum tables needed — do not over-normalize or add 
tables for fixed, small option sets. Include created_at/updated_at 
on all tables.
```

> ** Token Efficiency:** Feed in your actual entities, roles, and status values from earlier modules directly — this produces a schema that matches your specific project immediately, rather than a generic schema you'd need to adapt afterward.

## Validate Before Moving On

- Every table maps to a real entity named in your workflow analysis or PRD
- Status uses a constrained set of values, not free text
- Foreign keys correctly represent the relationships in your workflow (who created it, who it's assigned to)
- `created_at`/`updated_at` exist on every table
- You haven't created separate tables for fixed, small option sets that don't need to be dynamic

## Common Mistakes

- Free-text status fields that accumulate inconsistent values over the course of the build
- Over-normalizing fixed option sets into unnecessary extra tables and joins
- Missing foreign keys for relationships the workflow clearly requires (assignment, ownership)
- No timestamps, making later sorting or "recent activity" features harder to retrofit
- Designing the schema from imagination instead of directly from the workflow and PRD already written

## Quick Reference

| Do this | Skip this | Comes directly from |
|---|---|---|
| Tables mapped to real workflow entities | Soft deletes, audit trails | Workflow Analysis |
| Constrained status column | Separate tables for fixed option sets | Workflow stages |
| Foreign keys for ownership/assignment | Complex indexing | User Roles, PRD user flow |
| created_at/updated_at on every table | Migration tooling/versioning | — |

## What's Next

With a schema that matches the real workflow, the next module is Fake Business Data — generating realistic seed data so your tool looks and demos like something with genuine usage history, not an empty shell.
