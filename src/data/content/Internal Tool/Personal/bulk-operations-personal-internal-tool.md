---
title: Bulk Operations
slug: bulk-operations
phase: Phase 3
mode: personal
projectType: internal-tool
estimatedTime: 15-25 min
---

# Bulk Operations

Import handles bringing many records in at once. Bulk operations handle acting on many *existing* records at once — selecting 30 rows in your table and updating, deleting, or exporting them together. This is a small module, but it protects against one of the more damaging mistakes an internal tool can make.

---

## Start From Real Repetition, Not Hypothetical Convenience

Bulk operations are only worth building for actions you've actually found yourself repeating one-by-one. If you've never sat there updating the same field on 15 records individually, you don't need this yet — a good table view (from the Tables module) may be enough.

**Common real candidates for a personal internal tool:**
- Bulk status update (mark 20 selected items as "done")
- Bulk delete (clean up a batch of test/stale records)
- Bulk export of just the selected rows (narrower than the filtered export from the previous module)

---

## The Core Pattern

```
1. User selects multiple rows (checkboxes in the table)
2. User picks a bulk action
3. Show a confirmation with exactly what will happen and to how many records
4. Execute the action
5. Show a result summary: how many succeeded, how many failed and why
```

Step 3 is not optional for anything destructive. A bulk delete with no confirmation is the single most common way an internal tool causes real, hard-to-recover damage.

> ️ **Warning:** Bulk actions multiply the blast radius of a mistake. A misclick on a single-record delete costs you one record. A misclick on a bulk delete with 40 rows selected costs you 40 — and if there's no confirmation step, there was nothing between the click and the damage.

---

## Deciding Confirmation Friction by Reversibility

| Action type | Confirmation needed |
|---|---|
| Reversible (status update, tagging) | Light confirmation — a simple "Update 12 records?" is enough |
| Destructive but recoverable (soft delete) | Standard confirmation, clearly stating the count |
| Destructive and permanent (hard delete) | Higher friction — require typing a confirmation word, or show exactly which records by name before committing |

If you built soft deletes in your CRUD module, route bulk "delete" through that same soft-delete path — don't create a separate hard-delete bulk action unless you have a specific reason to.

---

## AI Prompt: Implement a Bulk Action

```
Implement a bulk [action — e.g., "status update" / "delete"] for [Entity] in my table view.

Requirements:
- Row selection via checkboxes, with a "select all on this page" option
- Show a confirmation before executing, stating exactly what will happen and how many records are affected
- [If destructive] Use [soft delete / require typed confirmation] given this action is [reversible/permanent]
- Execute the action, and handle partial failure — if 2 of 15 records fail (e.g., a validation error), don't silently skip them
- Show a result summary after: succeeded count, failed count, and the specific reason for any failures
- Respect any active table filters — bulk actions should only apply to selected rows, never accidentally to the full unfiltered table
```

The last requirement matters specifically: a bug where "select all" silently means "all records in the database" instead of "all visible/selected rows" is a realistic and damaging mistake in generated code.

---

## Validating the Generated Implementation

-  **Test "select all" carefully** — confirm it selects only what's visible/intended (the current page, or an explicit "select all matching filter" if you built that), not silently the entire table
-  **Confirm the confirmation step shows an accurate count** — select 5, and verify the confirmation says 5, not a stale or miscounted number
-  **Test partial failure explicitly** — construct a selection where at least one record will fail the action, and confirm it's reported clearly rather than silently skipped or crashing the whole batch
-  **For destructive actions, confirm the friction matches the reversibility** — a permanent delete should not be a single click away from selection
-  **Check that bulk actions on a filtered view stay scoped to that filter**, not the full table

>  **Tip:** Before trusting a bulk action on real data, test it on your seeded sample data first, deliberately including edge cases — a record that will fail validation, a record already in a state the action doesn't expect. This is where bulk operations most often reveal bugs that single-record testing misses.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| No confirmation step before a destructive bulk action | Turns a misclick into large, sometimes unrecoverable damage |
| "Select all" silently selecting the whole table instead of the visible/filtered set | Executes an action on far more records than intended |
| Silent partial failures | You believe an action fully succeeded when some records were actually skipped |
| Same confirmation friction for reversible and permanent actions | Under-protects the actions that actually need more caution |
| Building bulk actions for things you've never actually repeated manually | Effort spent on convenience you don't need yet |

---

## Before You Move On — Checklist

- [ ] Every destructive bulk action requires a confirmation showing the exact affected count
- [ ] "Select all" behavior is scoped correctly — verified it doesn't silently mean the entire table
- [ ] Partial failures are reported clearly, not silently skipped
- [ ] Confirmation friction matches the reversibility of the action (permanent actions require more)
- [ ] Bulk delete reuses the soft-delete path if one exists, rather than a separate hard-delete flow
- [ ] I tested the action against a selection that includes at least one record expected to fail

---

## What's Next

With the ability to act on many records safely, the next step is making sure the data going into your system — one record or many — is actually correct: data validation.
