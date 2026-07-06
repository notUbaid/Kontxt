---
title: Welcome
slug: welcome
phase: Phase 0
mode: personal
projectType: api-product
estimatedTime: 5–10 min
---

# Welcome

You're building an API product — not a UI, not an app. A contract that other developers will write code against.

That changes the job. Every decision you make here becomes something someone else depends on. Renaming a field, changing a status code, adding a required parameter — these aren't refactors, they're breaking changes for people you'll never meet.

This phase exists to stop you from shipping something you'll regret versioning around in three months.

## What "Personal Mode" Means Here

You're building solo, to learn, and to ship something you're proud of — not to run a business on day one.

That means:

- **Skip:** multi-region infrastructure, enterprise SSO, SLA guarantees, complex billing tiers.
- **Keep:** clean API design, real authentication, sane error handling, documentation good enough that a stranger could use it without asking you questions.

The bar isn't "production SaaS." The bar is "an API a competent engineer would respect if they read the code."

> **Tip:** The skills that make a good API — consistent naming, predictable errors, versioning discipline — don't scale with team size. Learning them on a personal project is exactly as valuable as learning them at a company.

## What's Ahead in Phase 0

Discovery is cheap. Rebuilding after skipping it isn't.

| Topic | Why it exists |
|---|---|
| Problem Definition | Forces you to name who's in pain and why, before you name endpoints |
| API Purpose | One sentence: what does calling this API let someone do that they couldn't before |
| Target Developers | Their skill level decides your auth complexity, docs depth, SDK need |
| API Use Cases | The concrete calls people will actually make — this drives your resource design |
| Competitor Analysis | What existing APIs get right or wrong, so you don't repeat their mistakes |
| Feature Prioritization | What ships in v1 vs. what's a v2 daydream |
| Monetization Strategy | Even "free forever" is a decision — it affects rate limits and auth from day one |
| Success Metrics | How you'll know if this was worth building |
| MVP Scope | The line between "shipped" and "still designing" |

You'll leave Phase 0 with a written definition of what you're building and why. Phase 1 starts using it immediately to design endpoints.

## Capture Your Starting Point

Two answers, written down now, will save you from re-deciding this every module:

- [ ] **API name:** what you'll call it, even as a placeholder
- [ ] **One-sentence idea:** "An API that lets [who] do [what] without [current pain]"

Don't overthink either. Both are allowed to change — the point is having a fixed reference point, not a perfect one.

## AI Prompt: Pressure-Test Your Idea

Use this once you've written your one-sentence idea. It's built to challenge it, not validate it.

```
I'm building a personal API product. Here's my one-sentence idea:

"[paste your sentence]"

Do the following:
1. Identify the vaguest word or phrase in that sentence and ask me to define it precisely.
2. Give me one existing API that already solves this problem, even partially.
3. Tell me the single most likely reason a developer would NOT integrate this API.

Be direct. I'm trying to find weaknesses now, not after I've built it.
```

Keep this conversation short — one exchange, maybe two. This is a gut-check, not a planning session. Long AI conversations at this stage produce false confidence, not clarity.

> **Warning:** Don't let AI write your problem definition for you. It can stress-test an idea; it can't tell you if a problem is actually worth solving to you. That judgment call is yours.

## Before You Continue

- [ ] I can state what my API does in one sentence
- [ ] I've named at least one real developer (even a future version of myself) who'd use it
- [ ] I understand this is Personal mode: I'm optimizing for learning and shipping, not enterprise scale

When all three are checked, move to **Problem Definition**.
