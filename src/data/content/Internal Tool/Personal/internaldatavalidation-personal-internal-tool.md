---
title: Data Validation
slug: data-validation
phase: Phase 3
mode: personal
projectType: internal-tool
estimatedTime: 15-25 min
---

# Data Validation

Validation has already appeared in nearly every module so far — CRUD, forms, import. This module isn't introducing something new; it's making sure the validation scattered across your tool is actually one consistent system instead of several slightly different ones that happen to look similar.

---

## The Problem This Module Solves

By this point in Phase 3, you likely have validation logic in at least three places: your CRUD write functions, your forms, and your import flow. If each was written independently, they've probably already started to drift — a field that's required in the form but not enforced in CRUD, an email format check that exists on import but not on manual entry.

**The fix is structural, not more validation code:** one schema per entity, referenced everywhere that entity's data is written.

```
              ┌─────────────┐
              │  Entity     │
              │  Schema     │  ← single source of truth
              └──────┬──────┘
        ┌────────────┼────────────┐
        ▼            ▼            ▼
     Forms        CRUD layer    Import
```

If you followed the earlier modules' prompts (which explicitly said "reuse this schema"), you're likely close to this already — this module is your chance to verify it, not rebuild it.

---

## Audit Pass: Find the Drift

Before adding anything, check what you already have.

**For each entity, ask:**
1. Is there exactly one schema definition, or did any module accidentally create a second one?
2. Do forms, CRUD, and import all import and use that same schema — or does any of them redefine rules inline?
3. Are there any validation rules that exist in your head but never made it into the schema at all? (A common one: "this field should never be empty string, only null" — a distinction basic required-field checks often miss)

> ️ **Warning:** The most common outcome of building CRUD, Forms, and Import across separate sessions is quiet schema duplication — each module's AI-generated code redefines validation slightly differently because it wasn't shown the existing schema. This audit is how you catch it before it causes a real bug (data that's valid in one entry path and invalid in another).

---

## What Belongs in Schema Validation vs. Business Logic

Not everything that constrains your data belongs in the same layer. Splitting these correctly keeps your schema reusable and your business rules in one clear place.

| Type | Example | Where it lives |
|---|---|---|
| Shape/format validation | Email is a valid email, price is a positive number | Schema (Zod, etc.) — reusable everywhere |
| Business rule | An order can't be marked "shipped" before "paid" | Application logic in your CRUD/workflow layer, not the schema |
| Cross-field validation | End date must be after start date | Schema, if your validation library supports it — otherwise application logic |
| Database-level constraint | Foreign key must reference an existing row | Database constraint (from the Database module), as a final safety net |

Business rules that depend on the current state of a record (not just the shape of one field) generally don't belong in a generic schema — they belong in the specific function that performs that transition.

---

## AI Prompt: Audit and Consolidate Validation

```
Review validation across my internal tool for [Entity].

Here's the schema I intend to be the single source of truth:
[paste your primary schema]

Here are the places this entity's data gets written:
[list: create form, edit form, CRUD create/update functions, import flow, any bulk operations]

For each of these, check:
- Does it import and use the schema above, or does it redefine validation rules inline?
- Are there any rules present in one location but missing in another?
- Are there any business rules (not shape validation) incorrectly placed inside the schema instead of application logic?

Report the drift you find. Don't fix anything yet — just report it.
```

Asking it to report before fixing matters: consolidating validation logic across multiple files is exactly the kind of change worth reviewing yourself before applying, since a mistake here affects every entry point at once.

---

## Validating the Consolidation

-  **After consolidating, re-test each entry point** (form, CRUD, import) with the same invalid input and confirm they all reject it the same way — this is the actual proof the drift is fixed, not just that the code looks cleaner
-  **Check that business rules didn't get incorrectly folded into the schema** during consolidation — a schema that only validates shape should stay that way
-  **Confirm error messages are still clear per context** — a schema-level error message shown in a form should still make sense to a human filling it out, not just be technically accurate
-  **Re-run your seed/edge-case data** (nulls, boundary values, long strings) through each entry point post-consolidation to confirm nothing that used to pass now incorrectly fails, or vice versa

>  **Tip:** This audit is worth repeating periodically as your tool grows — not just once. Every new form or feature added later is a new opportunity for validation drift if the schema isn't consistently reused.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Each module (forms, CRUD, import) built independently with its own validation | Same field enforced differently depending on the entry point |
| Business rules embedded in the schema instead of application logic | Makes the schema harder to reuse and business logic harder to find |
| Fixing drift by picking one location as "correct" without checking the others agree | Half-fixes the problem — the remaining locations still disagree |
| Treating this as a one-time task | New features later reintroduce the same drift if not built with schema reuse in mind |
| Relying only on frontend validation and skipping the audit of backend/import paths | The most damaging invalid data usually enters through the paths that aren't reviewed |

---

## Before You Move On — Checklist

- [ ] Each entity has exactly one validation schema, not several redefinitions
- [ ] Forms, CRUD, and import all reference that same schema
- [ ] Business rules (state-dependent logic) live in application code, not the schema
- [ ] I tested the same invalid input across every entry point and got consistent rejection
- [ ] I have a plan to re-run this audit as new features get added, not just once now

---

## What's Next

With validation consistent across every entry point, the last step in Phase 3 is making sure all of this actually works as intended — testing.
