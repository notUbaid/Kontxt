---
title: Performance
slug: performance
phase: Phase 4
mode: personal
projectType: internal-tool
estimatedTime: 15-25 min
---

# Performance

Several earlier modules already flagged specific performance traps as they came up — N+1 queries in CRUD, missing indexes in the Database module, unbounded table queries. This module isn't introducing new concepts; it's the pass where you actually go verify those things, with real usage data instead of assumptions.

---

## Measure Before You Optimize

The single most important rule here: **don't guess where it's slow, check.**

For a personal internal tool, premature optimization is a bigger risk than under-optimization — you'll spend real time speeding up something that was never actually slow, while the genuinely slow thing goes unnoticed because you didn't measure.

**How to actually check, at this scale:**
- Open your browser's network tab while using the tool normally — look for requests that take noticeably longer than the rest
- Check your hosting platform's built-in request timing (most show this for free)
- If you set up error tracking in the last module, some providers also surface slow transaction data

>  **Tip:** "Noticeably slow" for a personal internal tool means something you'd actually complain about — over a second for an interactive action, several seconds for a page load. Don't chase millisecond improvements that no human using this tool would ever perceive.

---

## The Short List of Real Culprits

At personal-mode scale, performance problems almost always come from one of these — not from needing more infrastructure.

| Culprit | Where it was flagged earlier | Fix |
|---|---|---|
| N+1 queries | CRUD module | Fetch related data in one query (JOIN or batched), not per-row |
| Missing indexes on filtered/sorted columns | Database module | Add an index; foreign keys especially |
| Unbounded queries (no pagination) | Tables module | Confirm pagination limits are actually applied at the query level, not just the UI |
| Client-side filtering of a large unfiltered fetch | Tables/Search modules | Move filtering to the database query once data volume grows |
| Large, unoptimized images | File Uploads module | Resize/compress on upload, don't serve originals directly |

Go through this list against your actual tool before looking for anything more exotic — the exotic causes are rare at this scale.

---

## AI Prompt: Performance Audit

```
Review this codebase for performance issues, specifically:

1. Any list/query function that fetches related data in a loop (N+1 pattern) instead of a single query
2. Any query filtering on a column that doesn't have a database index
3. Any "list" or "get all" query without pagination limits actually enforced at the query level
4. Any place fetching an entire dataset and filtering/sorting it in application code instead of the database

For each issue, tell me:
- The specific file and function
- Why it's a problem, and at what approximate data volume it would start to matter
- The minimal fix

Don't suggest caching layers, CDNs, or infrastructure changes unless the underlying query problem is actually fixed first.
```

The last line matters — it's common for AI to suggest adding caching on top of an inefficient query instead of fixing the query itself. Caching a slow N+1 query hides the symptom without fixing the cause, and adds its own complexity (cache invalidation) that a personal tool rarely needs.

---

## Validating the Findings

-  **Confirm each flagged issue with a real measurement**, not just by reading the code — time the actual request before and after a fix
-  **Check the fix doesn't change behavior**, only speed — a JOIN replacing a loop should return identical data, verify it does
-  **Re-check "at what data volume it matters"** against your real, current data size — a flagged N+1 query on a table with 20 rows might genuinely not be worth fixing yet
-  **Don't apply fixes for problems you don't have** — if the audit suggests an index on a column you never actually filter by, skip it; unnecessary indexes have their own small cost (slower writes)

---

## When Not to Optimize

Explicitly deprioritize performance work when:
- The tool already feels fast in normal daily use
- The flagged issue only matters at a data volume you're realistically years from reaching
- The fix would add meaningful complexity (caching, denormalization) for a barely-perceptible speed gain

> ️ **Warning:** The riskiest performance "fix" for a personal-mode tool is denormalizing data or adding a caching layer before you've confirmed you actually need it. Both add real complexity — keeping duplicated/cached data in sync becomes a new source of bugs. Reach for these only after confirming the simpler fixes (indexes, avoiding N+1, pagination) aren't enough.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Optimizing based on assumption instead of measurement | Wastes time on code that was never actually slow |
| Adding caching before fixing the underlying query | Hides the real problem and adds new complexity (invalidation) |
| Over-indexing "just in case" | Slightly slows down every write for indexes that are never actually used in a query |
| Chasing millisecond gains no user would ever notice | Time better spent on features or the genuinely slow parts |
| Ignoring N+1 patterns because "it works fine right now" | Works fine at low data volume, degrades sharply as it grows — worth fixing while it's still cheap to fix |

---

## Before You Move On — Checklist

- [ ] I measured actual request/page timing before making any performance changes
- [ ] N+1 query patterns from earlier modules were specifically re-checked and confirmed fixed
- [ ] Foreign keys and frequently-filtered columns have indexes
- [ ] Pagination limits are enforced at the query level, not only the UI
- [ ] I did not add caching or denormalization without first confirming simpler fixes were insufficient

---

## What's Next

With the tool performing well under real use, the next step is making sure you can actually recover if something goes wrong with your data — backup strategy.
