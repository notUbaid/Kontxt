---
title: CRUD Endpoints
slug: crud-endpoints
phase: Phase 3
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# CRUD Endpoints

Your core loop is built and tested. This module is about the rest of your locked route table — the "nice-to-have" endpoints you set aside back in MVP Scope. Before building any of them, the first decision is whether you should.

---

## Check Your Time Budget Before Building Anything Else

> **Decision Card — Is this still the highest-value use of remaining time?**
> Go back to your MVP Scope time budget. If you're behind schedule, the right move is investing remaining time in polish, docs, and demo reliability — not new endpoints nobody asked to see. Nice-to-have endpoints exist precisely so they can be skipped without breaking anything.

> **Warning — Adding scope here is the same mistake MVP Scope warned about, just later in the timeline.**
> "I have an hour left, let me add one more endpoint" feels productive but often isn't — a sixth endpoint that's untested and undocumented is worse for your score than a polished demo of the five you already have working.

---

## If You're Building Them: Reuse, Don't Reinvent

The good news at this stage: your middleware, error handling, and data access patterns are already established and tested. Adding a nice-to-have endpoint should be mostly mechanical — not a new design exercise.

> **Quick Reference — Checklist for each new endpoint**
> - [ ] Matches the locked route table exactly (method, path)
> - [ ] Uses an existing data access function, or a new one following the exact same pattern (parameterized queries, thin, no business logic)
> - [ ] Auth middleware applied if the route is protected
> - [ ] Validation matches the rigor of your core loop endpoints — not a shortcut version
> - [ ] Errors return your exact locked error shape

---

## Don't Let Speed Erode Consistency

> **Warning — Endpoints built quickly under time pressure tend to skip validation "just this once."**
> A `GET /transcripts` list endpoint added in five minutes without checking auth, or without handling an empty result set, introduces an inconsistency a careful judge or technical reviewer will notice immediately — especially if it sits right next to a core loop that handles all of this correctly. Inconsistent quality across endpoints reads worse than having fewer endpoints overall.

---

## Common Nice-to-Have Patterns

These are typically fast if your foundation is solid:

| Endpoint type | Pattern |
|---|---|
| List/collection (`GET /resources`) | Reuse your data access pattern, add a reasonable default limit (from Request Design) |
| Single item fetch (`GET /resources/:id`) | Reuse the same lookup logic your nested core loop endpoint already uses |
| Update (`PATCH /resources/:id`) | Only build if your demo actually shows an edit — otherwise this is pure scope creep |
| Delete (`DELETE /resources/:id`) | Same — only if deletion is part of the story you're telling |

---

## Implement the Remaining Endpoints With AI

> **Copy Prompt — Remaining Endpoint Implementation**
> ```
> My locked route table, remaining nice-to-have endpoints: [paste]
> My existing middleware, error handling, and data access patterns: [paste relevant existing code]
>
> Implement these remaining endpoints following the exact same patterns
> as my existing core loop code — same validation rigor, same error
> shape, same auth handling. Don't introduce new patterns or shortcuts.
> Flag if any of these endpoints aren't actually needed given my core
> loop, so I can consider skipping them.
> ```

> **Tip — Pasting your existing code, not just describing it, is what keeps these endpoints consistent.**
> Describing your patterns in words risks AI reconstructing something close-but-different. Giving it the actual code to match against produces genuinely consistent results.

---

## Validate the Output

- Confirm the new endpoints handle errors and validation with the same rigor as your tested core loop — not a simplified version.
- Run them through the same kind of test matrix you used in the Testing module, even briefly — an untested endpoint is a risk, not a finished feature.
- If AI flagged that an endpoint isn't really needed, take that seriously — it's an invitation to cut scope, not a bug to fix.

---

## Lock Your CRUD Endpoints

- [ ] Time budget checked before building anything beyond the core loop
- [ ] Every new endpoint matches the validation and error-handling rigor of the core loop
- [ ] No endpoint built that doesn't trace back to your original MVP scope
- [ ] Each new endpoint manually tested, not just assumed to work because the pattern is familiar

---

## What's Next

**Error Handling** — do a final pass across every endpoint to make sure failures are handled consistently and predictably, everywhere.
