---
title: Data Migration
slug: data-migration
phase: Phase 5
mode: personal
projectType: internal-tool
estimatedTime: 20-30 min
---

# Data Migration

If this tool is replacing a spreadsheet, a different app, or a manual process, real existing data needs to come across before anyone can actually rely on the new tool. This is a one-time, high-stakes operation — worth more care than the routine imports from Phase 3.

---

## Why This Is Different From the Import Module

You already built import functionality (Phase 3). This module isn't rebuilding that — it's about applying it carefully, once, to real production data with real consequences if it goes wrong. The distinction that matters:

- **Phase 3 import:** ongoing, repeatable, low-stakes if a single row fails — you can just fix and re-import
- **Data migration:** one-time, high-stakes, the source of truth is about to shift — a mistake here can mean silently losing or corrupting the only copy of real data

Treat this with the seriousness of the Backup Strategy module, not the routine feel of everyday import.

---

## The Migration Sequence

```
1. Back up the source data (before touching anything)
2. Map source fields to your new schema, explicitly
3. Do a dry run against a copy, not the live database
4. Review the dry-run results carefully
5. Run the real migration
6. Verify counts and spot-check records
7. Keep the source data accessible for a defined period, don't delete it immediately
```

Skipping step 3 — testing against a copy first — is the most consequential shortcut people take, because it's the step that catches problems before they touch real, live data.

---

## Field Mapping: Do This Explicitly, Don't Let AI Guess

Before writing any migration code, write out the mapping yourself:

| Source field | Target field | Notes |
|---|---|---|
| `Customer Name` (spreadsheet column) | `customers.name` | Trim whitespace |
| `Status` (free text: "done", "Done", "DONE") | `orders.status` (enum) | Needs normalization — inconsistent casing in source |
| `Amount` (text, includes "$" and commas) | `orders.amount_cents` | Needs parsing and unit conversion |

> ️ **Warning:** Source data from spreadsheets or older systems is almost always messier than it looks — inconsistent casing, stray whitespace, mixed date formats, free text where you now have an enum. Writing the mapping yourself, field by field, is how you catch these before they become invisible bad data in your new system.

---

## AI Prompt: Build the Migration Script

Give it your explicit mapping, not just "migrate this data."

```
Write a one-time migration script to move data from [source format/system] into my [target schema].

Field mapping:
[paste your mapping table above]

Requirements:
- Run against a dry-run/copy database first, with a clear flag to switch to the real target
- Log every transformation applied (normalization, parsing, unit conversion) per record, so I can audit what changed
- Handle and clearly report any record that doesn't cleanly map (missing required field, unparseable value, invalid enum value after normalization) — don't silently skip or silently guess
- Produce a summary at the end: total records processed, successfully migrated, failed with reasons
- Don't delete or modify the source data — this script only reads from source and writes to target
```

The "don't delete or modify the source" instruction is a deliberate safety constraint — your source data is your rollback plan if anything about the migration turns out wrong.

---

## The Dry Run: What to Actually Check

Running against a copy isn't enough by itself — you need to actually review the output.

-  **Compare record counts** — does the number of migrated records match the number of source records (accounting for any intentionally skipped/invalid ones)?
-  **Spot-check a sample manually** — pick 10-15 records across different scenarios (typical, edge case, oldest, newest) and compare source to migrated result field by field
-  **Review every normalization the log reports** — confirm "done"/"Done"/"DONE" all correctly became the same enum value, not three different ones
-  **Check failed/skipped records specifically** — for each one, decide: fix the mapping and re-run, or accept it as genuinely bad source data that shouldn't migrate

>  **Tip:** Budget real time for this review step. A migration script that "ran successfully" with no errors isn't the same as a migration that's actually correct — silent misinterpretation (a date parsed in the wrong format, a status normalized incorrectly) won't show up as a script error, only as wrong data you'd only catch by looking.

---

## Running the Real Migration

Once the dry run is verified:

1. Take a fresh backup immediately before running (per the Backup Strategy module)
2. Run the migration against the real target
3. Re-run the same count and spot-check verification you did on the dry run
4. Keep the source data (spreadsheet, old system) accessible and untouched for a defined window — weeks, not days — in case something surfaces later that the spot-check missed

> ️ **Warning:** Don't decommission or delete the source system/spreadsheet immediately after migrating. Real-world usage over the following days or weeks tends to surface edge cases that a thorough-but-finite spot-check can still miss. Keep the source as a safety net until you're genuinely confident.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Running the migration directly against the live database without a dry run | No safety margin if the mapping has a mistake |
| Trusting "no errors" as proof of correctness | Silent misinterpretation doesn't throw errors, it just produces wrong data |
| Letting the migration script silently skip or guess on unmappable records | Real data quietly goes missing or gets misrepresented |
| Deleting the source data immediately after migrating | Removes your only recovery option if a problem surfaces later |
| Skipping manual spot-checks in favor of trusting the record-count match | Matching counts doesn't confirm the values inside each record are correct |

---

## Before You Move On — Checklist

- [ ] Field mapping was written out explicitly before any code was generated
- [ ] The migration was run against a dry-run copy first, and its output was actually reviewed
- [ ] Record counts and manual spot-checks both confirmed correctness, not just one or the other
- [ ] A fresh backup was taken immediately before the real migration ran
- [ ] Source data remains accessible and untouched for a defined period after migration

---

## What's Next

With real data safely in place, the next step is making sure whoever uses this tool — including future-you — actually knows how to use it: user documentation.
