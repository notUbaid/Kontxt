---
title: MVP Scope
slug: mvp-scope
phase: Phase 0
mode: personal
projectType: api-product
estimatedTime: 15 min
---

# MVP Scope

Everything in Phase 0 has been building toward one artifact: a written line between "shipped" and "still designing." Without it, personal API projects don't usually fail loudly — they just never quite reach a version you'd call done, because there's always one more endpoint that seems worth adding first.

This module produces that line. Once it's written, Phase 1 starts designing against it directly.

## MVP Is a Boundary, Not a Compromise

"Minimum" doesn't mean "worse." It means: the smallest version that fully satisfies your #1 use case from **API Use Cases**, built to a standard you'd actually be proud to show someone — not a rough draft you'll "clean up later."

A common trap: treating MVP as permission to build sloppily, then needing a second pass to make it presentable anyway. Skip that. Build less, but build it properly the first time.

## Assembling Your MVP From What You've Already Decided

You don't need to invent this from scratch — every previous module already contributed a piece. This module just assembles them into one scope document.

| From this module... | Pull this into your MVP |
|---|---|
| Problem Definition | The one problem you're solving — nothing adjacent |
| API Purpose | The one sentence describing what the API does |
| Target Developers | Your primary caller profile — design decisions favor them |
| API Use Cases | Use case #1 only, end to end |
| Feature Prioritization | Everything in your **Core** bucket, nothing from Next or Later |
| Monetization Strategy | Your rate limit number and whether usage is tracked |

If something doesn't trace back to one of these, it doesn't belong in your MVP — it's scope creep wearing a good excuse.

## Write the Scope Statement

```
MVP Scope for [API name]:

Solves: [one problem, from Problem Definition]
Primary use case: [use case #1, in one sentence]
Endpoints included: [list from your Core bucket]
Explicitly excluded: [2-3 things you're deliberately not building yet]
Rate limit: [number from Monetization Strategy]
Done when: [your checkable success outcomes from Success Metrics]
```

The "explicitly excluded" line matters as much as what's included — write down the things you'll be tempted to add mid-build, so future-you has something to point at instead of re-litigating the decision every time the temptation shows up.

> **Warning:** If your Core bucket from Feature Prioritization has grown since you wrote it, that's a signal scope is already creeping. Trim it back down before continuing — don't let MVP Scope quietly inherit an already-bloated list.

## Personal Mode: The MVP Is the Whole Project, For Now

You're not scoping an MVP to later expand into a full product roadmap under time pressure. You're scoping the version of this project you will actually finish. Everything in "Later" from Feature Prioritization is genuinely optional — some personal projects are done, permanently, at MVP, and that's a legitimate outcome, not a failure to reach v2.

## AI Prompt: Find What You Missed Cutting

```
Here's my MVP scope:

Solves: [paste]
Primary use case: [paste]
Endpoints included: [paste]
Explicitly excluded: [paste]

Review it:
1. Is there anything in "endpoints included" that isn't strictly required for the primary use case to work end to end?
2. Is there a dependency I'm missing — something in "excluded" that the included endpoints secretly require to function?
3. If I built exactly this and nothing more, could someone complete the primary use case successfully? Walk through it.
```

## Before You Continue

- [ ] Every included endpoint traces back to my #1 use case
- [ ] I've written down what's explicitly excluded, not just what's included
- [ ] I could build everything on this list and call the project genuinely finished

When all three are checked, Phase 0 is complete. Move to **Phase 1 — API Design**, starting with **PRD**.
