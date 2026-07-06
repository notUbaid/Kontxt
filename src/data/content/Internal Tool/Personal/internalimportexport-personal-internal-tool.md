---
title: Import & Export
slug: import-export
phase: Phase 3
mode: personal
projectType: internal-tool
estimatedTime: 20-30 min
---

# Import & Export

Internal tools rarely exist in isolation — data needs to come from somewhere (a spreadsheet you're migrating off of) and sometimes needs to leave again (a report to share with someone who doesn't use the tool). This module covers both directions without overbuilding either.

---

## Export: The Easier, Higher-Value Direction

Start here — export is simpler to build and you'll use it sooner (sharing data with someone outside the tool, backing up before a risky change).

**Minimum viable export:** a button that turns the current table view (respecting whatever filters are active) into a CSV.

```
Current filtered/sorted table data → CSV generation → Download
```

>  **Tip:** Export the *currently filtered view*, not always the full table. If someone filtered to "Orders from this month," the export button should respect that — re-fetching everything unfiltered is a common generated-code default worth explicitly overriding in your prompt.

For personal-mode tools, CSV covers nearly every real need. Only add Excel (`.xlsx`) export specifically if you need multiple sheets, formatting, or formulas that CSV can't represent — otherwise it's an added dependency for a format users can already open CSV files in anyway.

---

## Import: Where the Real Complexity Lives

Import is riskier than export because bad input can corrupt your data, and the failure modes are more varied — malformed files, wrong column mappings, duplicate records, invalid values that would fail your schema's validation.

**The pattern that keeps import safe:**

```
1. Upload file
2. Parse and preview — show what will be imported before committing anything
3. Validate every row against your existing schema/validation rules
4. Show validation errors per row, before import
5. Only commit rows that pass validation (or block the whole import — decide which)
6. Show a summary: X succeeded, Y failed, with reasons
```

**Step 2 is the one beginners skip most often** — importing directly without a preview means the first time you see a problem is after bad data is already in your database.

> ️ **Warning:** Never import directly into your live tables without a preview/validation step. A malformed CSV (wrong delimiter, shifted columns, encoding issues) can silently create dozens of corrupted records before you notice — and undoing a bad import is far more work than previewing would have been.

---

## Deciding Your Failure Mode: All-or-Nothing vs. Partial

Before building, decide explicitly: if 3 out of 50 rows fail validation, does the whole import fail, or do the 47 good rows get imported while the 3 bad ones are flagged?

| Approach | When it's right |
|---|---|
| All-or-nothing | Data integrity matters more than convenience — e.g., financial records where a partial import could cause reconciliation issues |
| Partial import with a failure report | Convenience matters more, and failed rows are easy to fix and re-import individually |

There's no universally correct answer — but pick deliberately, because it changes how you build the validation step.

---

## AI Prompt: Build Import & Export

```
Build CSV export and import for [Entity].

Schema and existing validation rules:
[paste your schema/Zod validation from the CRUD/Forms modules]

Export requirements:
- Export respects the currently active filters/sort on the table, not always the full dataset
- Include these columns: [list them, or "all fields"]

Import requirements:
- Parse the uploaded CSV and show a preview before committing anything
- Validate every row against the existing schema, reusing the same validation rules used elsewhere in the app
- Failure mode: [all-or-nothing / partial import with a report — pick one]
- Show a clear summary after import: rows succeeded, rows failed, and the specific reason for each failure
- Handle common CSV issues gracefully: extra whitespace, different casing in headers, empty rows
```

Reusing existing validation rules (rather than writing new ones for import specifically) is the same principle from the Forms module — one source of truth for "valid," used everywhere.

---

## Validating the Generated Implementation

-  **Test export with an active filter applied** — confirm the downloaded file actually reflects the filter, not the whole table
-  **Test import with a deliberately broken file** — wrong column order, a missing required field, an invalid enum value — confirm it's caught in preview, not after commit
-  **Test import with a genuinely large file** (hundreds of rows) to confirm there's no timeout or memory issue, even if your real usage is smaller — this catches obviously unscalable implementations early
-  **Confirm the failure mode matches what you decided** — if you chose all-or-nothing, verify a single bad row actually blocks the whole import rather than silently partial-committing
-  **Check duplicate handling** — does importing the same file twice create duplicate records, or does the implementation account for that? Decide if that matters for your use case.

>  **Tip:** Test import with a file exported from your own export feature. This is the fastest way to catch schema mismatches between the two — if your own export can't be re-imported cleanly, something's inconsistent.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Importing directly with no preview step | Bad data enters the database before you notice a problem |
| Writing separate validation rules for import vs. forms | The two drift out of sync — data can pass one and fail the other |
| Export ignoring active filters | Users get more (or different) data than the view they were looking at |
| No summary after import | Users can't tell what actually happened, especially with partial imports |
| Not testing with a deliberately broken file | The failure path — where most real-world import problems live — goes untested |

---

## Before You Move On — Checklist

- [ ] Export respects the currently active table filters/sort
- [ ] Import shows a preview and validates before committing any data
- [ ] Import reuses the same validation rules as forms/CRUD, not a separate definition
- [ ] Failure mode (all-or-nothing vs. partial) was a deliberate choice, and tested
- [ ] Import shows a clear success/failure summary with specific reasons
- [ ] I tested import with a deliberately malformed file, not just a clean one

---

## What's Next

With data able to move in and out one file at a time, the next step is handling actions across many existing records at once — bulk operations.
