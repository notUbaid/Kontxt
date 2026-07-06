---
title: Problem Definition
slug: problem-definition
phase: Phase 0
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Problem Definition

Before you design a single endpoint, answer one question: **is this actually an API problem?**

A huge share of hackathon API teams build something that should've been a web app — and a smaller share build a web app that should've been an API. Get this wrong now and you'll be fighting your own architecture by Phase 2.

---

## The API Litmus Test

> **Decision Card — Ask this before anything else**
> Would a *developer* — not an end user — want to call this from their own code?
>
- **Yes, clearly** → You're building the right kind of product. Continue.
- **Maybe, with a UI wrapped around it** → You might actually be scoping a web app. Reconsider the track.
- **Only if forced** → The problem is too thin. Pick a sharper one.

An API product's customer is code, not a person clicking buttons. If your idea only makes sense with a polished frontend doing the heavy lifting, the API is incidental — and judges in this track are scoring the API itself.

---

## What Makes a Good Hackathon API Problem

- **Narrow enough to finish.** One resource, modeled well, beats five modeled poorly.
- **Demoable through requests.** You can show it working with curl, Postman, or a thin client — no heavy UI required.
- **Clear integration story.** You can name, specifically, who would call this and why.
- **No external blockers.** No waiting on third-party API approval, exclusive datasets, or partnerships you don't already have.

> **Warning — Hidden dependencies kill API projects fastest.**
> "We'll integrate with [Bank API / Healthcare API / Partner API]" often means a multi-day approval process you don't have. If a dependency isn't something you can access in the next 10 minutes, treat it as disqualifying for this scope.

---

## Bad vs. Good Problem Statements

| Bad (too broad / too thin) | Good (sharp and buildable) |
|---|---|
| "An API for managing tasks" | "An API that turns a messy meeting transcript into structured action items with owners and due dates" |
| "A social media API" | "An API that scores how toxic a comment thread is becoming, in real time" |
| "A weather API" | "An API that converts raw weather data into a single 'should I run outside today' decision, with reasoning" |

Notice the pattern: good statements compress **raw input → useful judgment or transformation**. That's what makes an API worth calling instead of building yourself.

---

## Narrow It Down

Answer these three questions in one sentence each:

1. **Who calls this API?** (a specific kind of developer or app, not "everyone")
2. **What's the one pain point it removes?**
3. **What's the simplest version that still proves the value?**

If you can't answer #3 in a sentence, the scope is still too big.

---

## Pressure-Test With AI

Don't validate your own idea in your own head — you're the worst judge of your own blind spots right now. Use AI to argue against you.

> **Copy Prompt — Validate Problem Feasibility**
> ```
> I'm building an API product for a hackathon with [X hours] remaining.
>
> My problem statement: "[your one-sentence problem statement]"
> Target caller: "[who would integrate this]"
>
> Challenge this idea directly:
> 1. Is this genuinely better as an API than as a web app? Why or why not?
> 2. What's the simplest version of this that still feels valuable in a 2-minute demo?
> 3. What external dependency, data source, or approval could block me, and how would I find out fast?
> 4. What's the most likely reason a judge would call this "just a CRUD wrapper"?
>
> Be specific and critical. Don't validate the idea just because I described it.
> ```

> **Tip — One focused prompt beats five vague ones.**
> Run this once, read the pushback honestly, then revise your problem statement before moving on. Re-running the same prompt on a barely-changed idea wastes tokens and doesn't change the outcome.

---

## Validate the AI's Response

AI will sometimes be too agreeable, or invent a risk that doesn't apply to you. Check its feedback against reality:

- Did it flag a dependency that's actually trivial (e.g., a public, keyless API)? Discount that concern.
- Did it suggest a "simpler version" that quietly removes the part that made the idea interesting? Don't accept that trade blindly.
- Did it avoid answering question 4 directly? Push it again — vague feedback isn't useful feedback.

---

## Lock Your Problem Statement

Write the final version down. This carries forward into every later phase — API Purpose, Target Developers, and MVP Scope all build directly on it.

- [ ] One-sentence problem statement, revised after AI pressure-testing
- [ ] Named target caller (specific, not generic)
- [ ] Confirmed: no blocking external dependency
- [ ] Confirmed: simplest version is still demoable in under 2 minutes

---

## What's Next

**API Purpose** — turn this problem statement into a clear, one-line value proposition you'll use in your docs, your pitch, and your README.
