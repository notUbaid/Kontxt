---
title: Search
slug: search
phase: Phase 3
mode: personal
projectType: internal-tool
estimatedTime: 15-25 min
---

# Search

Your tables from earlier have filters and sort — good for narrowing a known set of options. Search is different: it's for when you know roughly what you're looking for but not which field it's in or what exact value to filter by. This module is about matching the search implementation to how small your actual dataset is.

---

## Match the Approach to Your Real Data Volume

This is the single most important decision in this module, and it's the one generated code gets wrong most often — defaulting to infrastructure sized for a SaaS product, not a personal internal tool.

| Data volume | Right approach | Why |
|---|---|---|
| Under ~10,000 rows | Database `LIKE`/`ILIKE` query, or your DB's built-in full-text search | Fast enough, zero added infrastructure |
| Postgres full-text search (`tsvector`) | 10,000+ rows, need relevance ranking | Built into Postgres, no external service needed |
| Dedicated search service (Elasticsearch, Algolia, etc.) | Rarely, for personal-mode tools | Real infrastructure and cost for a scale you likely won't hit |

> ️ **Warning:** Reaching for a dedicated search service for an internal tool with a few thousand rows is the search equivalent of the workflow-engine mistake from earlier — real complexity and often real cost, solving a scale problem you don't have. Postgres (or your database's native search) handles this comfortably at personal-mode volumes.

---

## Decide What "Search" Actually Means for Your Tool

Before implementing, answer:

1. **Which fields should search actually match against?** Not every field — usually 2-4 that people actually recall when searching (a name, a title, a reference number)
2. **Does search need to span multiple entities**, or is it scoped to one table at a time? (Searching "just Orders" is simpler than a global search across Orders, Customers, and Products)
3. **Does partial/fuzzy matching matter**, or is exact/prefix matching enough? Fuzzy matching (handling typos) adds real complexity — only worth it if search will be used heavily enough to justify it

>  **Tip:** For most personal internal tools, "search this table by name/title, partial match, case-insensitive" covers the real need. Resist designing for global cross-entity search until you've actually felt the lack of it.

---

## AI Prompt: Implement Search

```
Implement search for [Entity/table] in my internal tool.

Requirements:
- Search these fields: [list 2-4 actual fields]
- Match type: [partial/contains match — most common for personal tools]
- Case-insensitive
- Use [ILIKE query / Postgres full-text search — pick based on the table above and my data volume: ~X rows]
- Results should respect the same pagination as the table view from the Tables module
- Handle the empty-results case with a clear "no matches" state, not a blank table
- Don't add a dedicated search service or external dependency — this should work entirely within the existing database
```

Stating your actual row count and explicitly ruling out external services keeps the AI from defaulting to heavier infrastructure than you need.

---

## Validating the Generated Search

-  **Test with a deliberately imperfect query** — partial words, wrong case, extra whitespace — and confirm it still finds the expected result
-  **Confirm it's actually querying the database, not fetching everything and filtering in the frontend** — the second approach silently breaks once your data outgrows a single page fetch
-  **Check query performance isn't relying on a full table scan** without an index — if you moved to Postgres full-text search, confirm a `tsvector` index actually exists, not just the query syntax
-  **Test the empty-results state** explicitly, not just the happy path
-  **Confirm special characters in the search input don't break the query** — a quote or percent sign in someone's search term shouldn't cause an error

> ️ **Warning:** Search inputs are user-controlled text reaching your database — this is exactly the kind of input that needs to go through parameterized queries, never string-concatenated directly into SQL. Confirm the generated code uses your ORM's/query builder's parameterization, not manual string building.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Adding a dedicated search service for a few thousand rows | Real infrastructure and cost for a scale problem that doesn't exist yet |
| Fetching all rows and filtering client-side | Works at first, breaks silently as data grows past a single page |
| String-concatenating search input into a raw query | A real SQL injection risk, even in a "just for me" tool |
| Searching every field "to be safe" | Slower, and often returns confusing matches from fields nobody actually searches by |
| No empty-state handling | A blank table on no-results looks like a bug, not a valid outcome |

---

## Before You Move On — Checklist

- [ ] Search approach matches my actual data volume — no unnecessary external service
- [ ] Search is scoped to the 2-4 fields people actually search by, not every field
- [ ] Search input reaches the database through parameterized queries, never string concatenation
- [ ] Empty-results state is handled with a clear message, not a blank table
- [ ] I tested search with imperfect input (case, partial words, whitespace, special characters)

---

## What's Next

With records now findable, the next step is handling the data that doesn't come through a form one record at a time — file uploads.
