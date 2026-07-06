---
title: MVP Scope
slug: mvp-scope
phase: Phase 0
mode: hackathon
projectType: internal-tool
estimatedTime: 15-20 min
---

# MVP Scope

You know the problem and the real workflow behind it. Now comes the decision that determines whether you finish a working demo or run out of time with five half-built features: exactly what's in, and — more importantly — what's explicitly out.

## The Decision You're Actually Making

Not "what could this tool eventually do." It's: **what is the smallest slice of the workflow that, fully working, proves this tool solves the bottleneck we identified?**

Everything else is deliberately deferred, named out loud, and left for the "what's next" slide in your pitch — not something you quietly hope to get to.

## Scope Around the Bottleneck, Not the Whole Workflow

Your Current Workflow Analysis identified one step causing the most pain. Your MVP should make that step dramatically better, even if it leaves other steps untouched or manual for now.

```
Full workflow: Request → Log → Assign → Track → Update → Report

If "Track" was your identified bottleneck:
MVP = Log + Track + a basic view, fully working
Deferred = Automated assignment, reporting, notifications
```

> ** Best Practice:** It's completely acceptable — often correct — for your MVP to leave earlier or later workflow steps manual, as long as the bottleneck step itself is solved well. A tool that fixes the one thing that was actually broken, and leaves the rest as-is, is a stronger, more honest hackathon project than one that half-builds the entire workflow.

## The One Sentence Test

If you can't finish this sentence specifically, your scope isn't defined yet:

```
"By the end of the hackathon, a [specific role] can [specific action] 
that currently requires [current painful process], in [rough time], 
using [core feature]."
```

> **️ Warning:** If your answer to that sentence includes the word "and" more than once, your scope is still too broad. "A manager can view live stock status AND get automated reorder suggestions AND export weekly reports" is three MVPs, not one — pick the single most important one.

## Deciding What's In vs Out

| Include in MVP | Defer to "what's next" |
|---|---|
| The core data entities from your workflow analysis | Advanced filtering, search, or reporting on that data |
| Basic create/view/update for the bottleneck step | Bulk operations, exports, integrations |
| One primary user role's view | Every role's fully customized view |
| Manual triggers for actions | Automated notifications, scheduled jobs |
| A working, if plain, UI | Polished animations, extensive theming |

> ** Tip:** A working, unstyled table that correctly shows real data beats a beautifully styled table with fake or broken data, every time, in front of judges evaluating an internal tool. Function first, polish second, in that order of priority when time runs short.

## Writing Down What's Explicitly Deferred

This list isn't wasted effort — it becomes your pitch's roadmap slide and protects you from silently expanding scope mid-build.

- List every feature you're consciously not building for this MVP
- For each, note the one-sentence reason it's deferred (not core to the bottleneck, nice-to-have, time-prohibitive)
- Revisit this list if you finish early — pull from it deliberately, don't improvise new scope

> ** Best Practice:** Keep this deferred list visible (a pinned note, a shared doc) throughout the build. Scope creep in a hackathon rarely arrives as one big decision — it arrives as a dozen small "let's just also add this" moments. A visible deferred list makes each of those moments a deliberate choice instead of an unconscious drift.

## Sizing Your MVP to Your Actual Team and Time

| Team size / time left | Realistic MVP scope |
|---|---|
| Solo, half a day left | One entity, one role, basic CRUD only |
| 2-3 people, full day | One entity with relationships, two roles, basic CRUD plus one meaningful view (dashboard/table) |
| Larger team, full weekend | Core workflow end-to-end for the bottleneck, plus one secondary feature (bulk action, basic search) |

> **️ Warning:** Estimate generously for integration and debugging time, not just feature-building time. Combining a working form, a working table, and a working database into one coherent flow reliably takes longer than building each piece in isolation — leave real buffer for this, especially if using AI-generated code across multiple files that need to connect correctly.

## Use AI to Pressure-Test Your Scope

**Prompt — MVP Scope Reality Check**
```
Here's my planned MVP for an internal tool hackathon project:
[describe the core entities, features, and user role(s) you're planning]

Given a team of [size] and [time remaining], tell me:
1. Is this actually scoped to one demoable "MVP sentence," or is it 
   secretly multiple features bundled together?
2. What's the first thing to cut if we're running behind schedule 
   halfway through?
3. What's missing that would make this feel broken or incomplete in 
   a demo, versus what's missing but acceptable to defer?
```

> ** Token Efficiency:** Give your actual team size and remaining time — this is the input that changes the answer entirely, and a prompt without it just returns generic MVP advice you likely already know.

## Validate Before You Start Building

- You can state your MVP in the one-sentence test format, with no "and" chaining multiple features
- The MVP specifically targets the bottleneck step from your workflow analysis, not the whole workflow
- You have a written, visible list of explicitly deferred features
- The scope realistically matches your team size and remaining time, with buffer for integration
- Everyone on the team would describe the MVP the same way if asked separately

## Common Mistakes

- Scoping to the entire workflow instead of the specific bottleneck step
- An MVP sentence that secretly bundles two or three separate features
- No written deferred list, leading to unconscious scope creep mid-build
- Underestimating integration time between the form, table, and database pieces
- Prioritizing visual polish over core functionality working correctly

## Quick Reference

| In scope | Deferred (write it down) | Sizing signal |
|---|---|---|
| Core entities from workflow analysis | Advanced filtering/search/reporting | Solo → one entity, one role |
| Bottleneck step, fully working | Bulk operations, exports, integrations | Small team → add relationships, two roles |
| One primary role's view | Every role's customized experience | Full team/weekend → end-to-end bottleneck flow |
| Basic, working UI | Polish, animation, theming | Always → buffer time for integration |

## What's Next

With scope locked, the project moves into Phase 1: Product Design, starting with the PRD — turning this scoped MVP into a concrete plan that guides the rest of the build.
