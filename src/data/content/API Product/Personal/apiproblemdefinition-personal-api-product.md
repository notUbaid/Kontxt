---
title: Problem Definition
slug: problem-definition
phase: Phase 0
mode: personal
projectType: api-product
estimatedTime: 10–15 min
---

# Problem Definition

Every API that gets abandoned by its own creator has the same root cause: it was built around a feature idea, not a problem. "An API for weather data" is a feature. "Indie game devs waste a day wiring three different weather providers just to get a reliable forecast" is a problem. Only one of those tells you what to build first.

This module forces the second kind of thinking before you touch a single endpoint.

## Feature Thinking vs. Problem Thinking

| | Feature thinking | Problem thinking |
|---|---|---|
| Starting question | "What could this API do?" | "What is currently painful?" |
| Where it leads | A long list of endpoints, most unused | A short list of endpoints, all necessary |
| Risk | Building things nobody calls | Building the wrong solution to a real pain |
| How to know you're doing it | You're describing capabilities | You're describing a specific moment someone gets stuck |

You want to be in the right column. If you catch yourself listing what your API *can do* before you've named who's *currently stuck*, stop and come back to this module.

## Naming the Problem Precisely

A usable problem statement has three parts. Vague versions of each part produce vague APIs.

1. **Who** — not "developers." A specific developer, in a specific situation. "A solo mobile dev building their first app" is usable. "Developers" is not.
2. **What they're stuck on** — the actual task that's currently slow, error-prone, or impossible without your API.
3. **What they do today instead** — the workaround. If there's no workaround, ask whether the problem is real or hypothetical.

> **Warning:** If you can't fill in "what they do today instead," you may be solving a problem nobody has. That's fine to explore, but know that's what you're doing — it changes how much validation you need before investing real time.

## Template

Fill this in. It doesn't need to be beautiful — it needs to be specific enough that a stranger could read it and understand exactly who you're building for.

```
[Specific person / role], when trying to [specific task],
currently has to [workaround they use today],
which costs them [time / money / reliability / sanity].

My API removes that by [what it does instead — one sentence].
```

## Personal Mode: How Far to Take This

You are not writing a business plan. You're writing a compass.

- Don't survey real developers unless you already know some. A well-reasoned guess is enough to start.
- Don't research market size. You're not raising money.
- Do write the problem statement down somewhere permanent — you'll reference it in every phase that follows, especially when deciding what to cut from your MVP scope later in this phase.

The goal is a problem statement good enough that when you're deciding "should this be an endpoint?" three weeks from now, you can check it against this sentence instead of guessing.

## AI Prompt: Stress-Test the Problem

Only use this after you've written your own first draft. Don't ask AI to generate the problem statement from scratch — it can't know what you've actually observed or experienced.

```
Here's my problem statement for an API I'm building:

"[paste your filled-in template]"

Challenge it:
1. Is the "who" specific enough to picture one real person, or is it still a category?
2. Is the workaround something people actually do, or something I'm assuming they do?
3. If this problem is real, why doesn't an existing API already solve it well?
4. Rewrite my statement in one tighter sentence, keeping all three parts.

Don't soften your critique to make me feel good about the idea.
```

## Common Mistakes at This Stage

- **Solving your own convenience, not a real gap.** Fine for a learning project — just be honest that "I want to build this" and "this fills a gap" are different claims.
- **Writing the problem statement to justify a solution you already have in mind.** Write it before you decide on endpoints, not after.
- **Making the "who" too broad to disqualify anyone.** A broad audience feels safer but makes every later decision harder, because you're designing for everyone and no one.

## Before You Continue

- [ ] My problem statement names a specific person, not a category
- [ ] I know what they currently do instead of using my API
- [ ] I could explain this problem to someone in one breath, without notes

When all three are checked, move to **API Purpose**.
