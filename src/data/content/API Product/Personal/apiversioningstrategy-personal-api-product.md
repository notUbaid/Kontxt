---
title: Versioning Strategy
slug: versioning-strategy
phase: Phase 1
mode: personal
projectType: api-product
estimatedTime: 10 min
---

# Versioning Strategy

The moment someone besides you calls your API, you've made an implicit promise: the shape they built against won't change under them without warning. Versioning is how you keep that promise while still being able to improve the API. Decide the mechanism now — retrofitting versioning onto an API that already has callers means every existing integration is at risk the moment you need to make a real change.

## Pick a Mechanism, Once

| Approach | Looks like | Tradeoff |
|---|---|---|
| **URL path** | `/v1/subscriptions` | Most explicit, easiest for callers to understand at a glance — the industry default for good reason |
| **Header-based** | `Api-Version: 2026-07-01` | Cleaner URLs, but invisible unless a caller reads docs closely |
| **Query parameter** | `/subscriptions?version=1` | Rarely used; easy to forget, easy to omit accidentally |

For a personal project, **URL path versioning** is almost always the right default. It's what most callers expect, it's impossible to accidentally omit, and it makes your version immediately visible in every log line and every bug report.

> **Tip:** Start at `/v1/` even though there's no `/v0/` you're migrating from. It costs nothing now and means you'll never have to do an awkward migration later just to introduce versioning that should've existed from day one.

## What Actually Requires a New Version

Not every change is breaking. Knowing the difference prevents both unnecessary version bumps and, worse, breaking changes shipped without one.

| Change | Breaking? | Needs new version? |
|---|---|---|
| Adding a new optional field to a response | No | No |
| Adding a new endpoint | No | No |
| Removing a field from a response | Yes | Yes |
| Renaming a field | Yes | Yes |
| Changing a field's type (string → number) | Yes | Yes |
| Making a previously optional request field required | Yes | Yes |
| Changing what an existing endpoint returns for the same input | Yes | Yes |

> **Warning:** "I'll just add a field, that's not breaking" is true right up until a caller's JSON parser is strict about unexpected fields, or their code assumes response size correlates with something. Additive changes are usually safe, but "usually" is why this table exists — check before assuming.

## Personal Mode: You Likely Never Leave v1

For most personal API projects, you'll design carefully enough in this phase that you never actually need to ship a `/v2/`. That's the goal, not a failure to plan ahead — good API and error design up front (Request Design, Response Design, Error Design) is what prevents breaking changes from being necessary at all.

Still commit to the `/v1/` prefix now. It's free insurance: if you do eventually need a breaking change, existing callers keep working on `/v1/` indefinitely while `/v2/` rolls out separately, instead of you choosing between breaking everyone or never improving the API again.

## What to Do When You Do Need a Breaking Change

- [ ] Ship the new behavior under `/v2/`, don't modify `/v1/` in place
- [ ] Keep `/v1/` running unless you have an explicit reason and a real deprecation notice period to remove it
- [ ] Document what changed and why in your **Changelog** (Phase 5) — don't make callers diff the responses themselves to find out

## AI Prompt: Classify a Change

```
I'm considering this change to my API: "[describe the change]"

Current response/request shape: [paste relevant part of your spec]

1. Is this a breaking change for existing callers, or safely additive?
2. If breaking, what's the minimum version bump needed — can I add this to a new version without changing anything else?
3. If not breaking, confirm there's no edge case (strict parsers, size assumptions) that would make it risky anyway.
```

## Before You Continue

- [ ] I've committed to URL path versioning starting at `/v1/`
- [ ] I know which categories of change are breaking vs. safe to add without a version bump
- [ ] I understand old versions stay live rather than being modified in place when a breaking change ships

When all three are checked, move to **Authentication Strategy**.
