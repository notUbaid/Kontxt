---
title: API Purpose
slug: api-purpose
phase: Phase 0
mode: personal
projectType: api-product
estimatedTime: 10 min
---

# API Purpose

Your problem statement tells you who's stuck. API Purpose tells you what your API actually *does* — in a form specific enough to shape endpoint design, not just marketing copy.

This is the difference between "an API for weather data" and "an API that returns a single reliable forecast by merging three weather providers, so a developer never has to handle provider downtime themselves." The second sentence already implies endpoints, error handling, and a caching strategy. The first implies nothing.

## The Purpose Statement

One sentence, following this shape:

```
This API lets [who] [do what specific thing],
by [how it does it, one clause],
so they don't have to [what they'd otherwise build themselves].
```

That last clause is the part most people skip — and it's the most useful one. It's the line between "a wrapper around existing data" and "something worth paying for or integrating." If you can't finish that clause, your API might not be saving anyone meaningful effort yet.

> **Tip:** Every strong API purpose statement describes work the *caller* no longer has to do. Not features you built — work you removed from someone else's plate.

## Purpose Drives Design, Immediately

This isn't a warm-up exercise. Your purpose statement directly constrains decisions you'll make in Phase 1.

| Your purpose says... | It implies... |
|---|---|
| "...merging three providers into one response" | You need an internal normalization layer — expose one clean shape regardless of upstream differences |
| "...so they don't have to handle retries themselves" | Your API should retry internally and return clean errors, not leak upstream failures |
| "...a single reliable forecast" | Consistency matters more than raw speed — cache aggressively |
| "...without needing to parse inconsistent formats" | Your response schema is doing real work — invest time in it, don't default to passing through raw upstream JSON |

If your purpose statement doesn't produce implications like these, it's still too vague. Tighten it before moving on.

## Scope Boundary: What Your API Is Not

Just as useful as defining purpose is naming what's explicitly out of scope. Write one or two exclusions now — they'll save you from silently expanding scope later when a "small addition" seems easy to bolt on.

- [ ] **In scope:** the one thing your API reliably does
- [ ] **Explicitly out of scope:** one adjacent thing you're deliberately not building (e.g. "no historical data, only current-state queries")

A personal project with a tight, honestly-scoped purpose ships. One with an ever-expanding purpose becomes a permanent side project.

## AI Prompt: Sharpen the Purpose Statement

```
My API's problem statement: "[paste from Problem Definition]"
My draft purpose statement: "[paste your draft]"

Do the following:
1. Point out any part of my purpose statement that's still a feature description rather than a removed-effort description.
2. Suggest one thing this API should explicitly NOT do, based on the purpose — something adjacent that would be tempting to add but dilutes the core value.
3. Rewrite my purpose statement as tightly as possible while keeping all three clauses (what, how, why-it-matters).
```

Use this once. If the rewrite doesn't feel obviously better, your original was probably already fine — don't iterate for its own sake.

## Before You Continue

- [ ] My purpose statement names specific work the caller no longer has to do
- [ ] I can name one thing this API deliberately does NOT do
- [ ] Someone reading only this sentence could guess roughly what my endpoints will look like

When all three are checked, move to **Target Developers**.
