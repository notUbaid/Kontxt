---
title: CRUD Operations
slug: crud-operations
phase: Phase 3
mode: personal
projectType: internal-tool
estimatedTime: 25-35 min
---

# CRUD Operations

Your database exists. Now you need the code that actually talks to it — Create, Read, Update, Delete. This is the layer every feature in your internal tool will sit on top of, so getting the pattern right here saves you from rewriting it four times later.

---

## The Shape of a Good CRUD Layer

For a solo internal tool, you don't need repositories, service layers, and dependency injection. You need **one consistent pattern, applied everywhere**, that's easy to extend as the tool grows.

The minimum useful structure:

```
/db
  /queries
    users.ts       ← all User CRUD lives here
    orders.ts      ← all Order CRUD lives here
```

One file per entity. Each file exports functions like `getUser`, `createUser`, `updateUser`, `deleteUser`. Nothing calls the database directly outside these files.

>  **Tip:** This single rule — "nothing touches the database except the query files" — is worth more than any advanced pattern. It means when something's wrong with how Users are fetched, there's exactly one place to look.

---

## Read Operations: Get This Right First

Reads are where internal tools live or die on performance and usability, because they run far more often than writes.

**Decide these three things per entity before writing code:**

1. **What's the default list view?** Paginated, all-at-once, or infinite scroll?
2. **What filters/sorts does this entity actually need?** Don't build a generic filter system — build the 2-3 filters people will actually use.
3. **What related data does the list view need?** (e.g., showing an Order list usually needs the Customer name, not just a customer ID)

> ️ **Warning:** The most common beginner mistake here is the **N+1 query** — fetching a list of records, then fetching related data separately for *each* record in a loop. It works fine with 10 rows and grinds to a halt at 500. Fetch related data in the same query (a JOIN) or in one batched follow-up query, never in a per-row loop.

---

## Write Operations: Validate Before You Trust

Every Create and Update should pass through validation before it touches the database — regardless of how "trusted" the source is, because even a solo internal tool's future self will make typos.

**The pattern:**

```
Input → Validate → Transform → Write to DB → Return result
```

Use a schema validation library (Zod is the standard pairing with TypeScript stacks) rather than hand-rolled if-checks. It gives you one definition of "valid" that can be reused for forms later, instead of duplicating rules.

---

## AI Prompt: Generate the CRUD Layer

This works best entity-by-entity, not all at once — a single prompt covering your whole schema produces shallow, generic code for each entity.

```
Generate the CRUD query layer for the [EntityName] table.

Schema for this table:
[paste the relevant table definition]

Requirements:
- Functions: get[Entity]ById, list[Entity]s (with pagination), create[Entity], update[Entity], delete[Entity]
- Use [Zod/your validation library] to validate input on create and update
- list[Entity]s should support the filters: [list the 2-3 real filters you need]
- Include the related data this entity typically needs when listed: [e.g., "include customer name, not just customer_id"]
- Use [your ORM/query builder] conventions
- Flag any operation where a soft delete (is_deleted flag) would be safer than a hard delete, given this data
```

**Why ask about soft deletes explicitly:** internal tools regularly need to "undelete" something after a user error — a hard `DELETE` makes that impossible. Not every table needs this, but it's worth a deliberate decision per entity, not an accident.

---

## Validating the Generated Code

-  **Check for the N+1 pattern** in any list function — look for a loop that calls the database inside it
-  **Confirm validation actually runs before the write**, not after, and that failures return a clear error instead of a generic 500
-  **Check pagination defaults** — an unbounded `list()` query is fine at 20 rows and a real problem at 20,000
-  **Look at what happens on delete** — cascades, orphaned records, or a clean soft-delete, and confirm it matches your intent
-  **Confirm error handling doesn't leak raw database errors** to wherever this function is called from — a constraint violation shouldn't surface as raw SQL text in your UI later

>  **Tip:** Run one write operation manually (through a script or REPL, not the UI) before wiring it into any form. It's much faster to debug a CRUD function in isolation than through a broken form on top of it.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Calling the database from multiple places instead of centralized query functions | Same bug fixed in one spot, still broken in three others |
| Skipping validation because "it's just for me" | Solo internal tools still get fat-fingered input; validation catches it early instead of as a corrupted row |
| No pagination on list queries | Fine on day one, a slow page load once real data accumulates |
| Hard-deleting records with no soft-delete option | An accidental delete becomes unrecoverable |
| N+1 queries in list views | Invisible at low data volume, a real slowdown as the tool gets used |

---

## Before You Move On — Checklist

- [ ] All database access for each entity goes through one query file, nowhere else
- [ ] Every list operation is paginated, not unbounded
- [ ] Create/update operations validate input before writing
- [ ] List views fetch related data without N+1 queries
- [ ] I made a deliberate choice about soft vs. hard delete per entity
- [ ] I tested at least one write operation manually before connecting it to a form

---

## What's Next

With reliable CRUD functions in place, you're ready to build the forms and tables that let a human actually interact with this data.
