---
title: PRD
slug: prd
phase: Phase 1
mode: hackathon
projectType: internal-tool
estimatedTime: 15-20 min
---

# PRD

A Product Requirements Document sounds like corporate overhead — the kind of thing that slows teams down. In a hackathon, it does the opposite: a short, sharp PRD is what keeps a team of 2-4 people building the same tool instead of independently building four different interpretations of "an internal tool for tracking requests."

## The Decision You're Actually Making

Not "what should our PRD contain." It's: **if I handed this document to a teammate who joined an hour from now, could they start building the right thing without asking me a single question?**

That's the actual bar for a hackathon PRD. Not completeness — clarity that eliminates ambiguity fast.

## Why a Hackathon PRD Looks Different From a Production One

| Production PRD | Hackathon PRD |
|---|---|
| Pages of context, stakeholder alignment, success metrics | One page, sometimes less |
| Detailed edge cases and rollout plans | The MVP scope from Phase 0, restated as buildable requirements |
| Written for review across teams | Written for your own 2-4 person team to move fast without re-litigating decisions |

> ** Best Practice:** A hackathon PRD's entire job is to convert the decisions you already made in Phase 0 (problem, workflow, scope) into a shape a developer can build directly from. It's a translation document, not a planning document — most of the thinking already happened; this just makes it buildable.

## The Only Sections a Hackathon Internal Tool PRD Needs

```
1. Problem (1-2 sentences, from Phase 0)
2. Who uses this (the role(s), from your workflow analysis)
3. Core user flow (the exact steps the MVP supports, in order)
4. Data entities (the nouns this tool tracks)
5. Explicitly out of scope (your deferred list from Phase 0)
6. Definition of done (what "the demo works" specifically means)
```

> **️ Warning:** Don't add sections just because a "real" PRD template has them — a competitive analysis section, a go-to-market section, or a detailed success metrics section add length without adding buildability in a hackathon context. Every section should directly help someone start coding sooner, not demonstrate thoroughness.

## Writing the Core User Flow Concretely

This is the section that actually prevents divergent building. Write it as literal, ordered steps a user takes — not a feature list.

```
Weak (feature list): "Users can create requests, view a dashboard, 
and update status."

Strong (user flow): 
1. Employee submits a request via a form (fields: title, category, 
   priority)
2. Request appears in a table view, sorted by priority
3. Manager clicks a request, changes its status via a dropdown
4. Status change is immediately reflected in the table for all viewers
```

> ** Best Practice:** Write the flow as a numbered sequence of actual clicks and screens, not abstract capabilities. A feature list leaves room for interpretation about *how* those features connect; a concrete flow doesn't — anyone reading it can picture the exact screens involved.

## Definition of Done: Make the Finish Line Explicit

Without this, "done" quietly becomes a moving target as the deadline approaches, and different team members disagree about whether you're actually finished.

- Name the exact scenario that must work live, end to end, for the demo
- Specify what data will be visible during that scenario (real or realistic seed data, not empty tables)
- State explicitly that anything beyond this scenario is a bonus, not a requirement

> ** Tip:** Write your definition of done as the literal sentence you'll say during your demo — "I'll show a request being submitted, appearing in the manager's queue, and being marked resolved." If you can't write that sentence yet, your PRD's user flow isn't concrete enough.

## Use AI to Draft the PRD From Your Phase 0 Work

**Prompt — Hackathon PRD Draft**
```
Using this information from earlier planning:
- Problem: [paste your problem statement]
- Workflow bottleneck: [paste from Current Workflow Analysis]
- MVP scope: [paste your MVP scope, including the deferred list]

Draft a one-page hackathon PRD with these sections only: Problem, Who 
Uses This, Core User Flow (as a numbered sequence of concrete actions, 
not a feature list), Data Entities, Explicitly Out of Scope, and 
Definition of Done.

Keep it under one page. Do not add sections like competitive analysis, 
success metrics, or go-to-market — this is for a small team to build 
directly from within hours.
```

> ** Token Efficiency:** Paste your actual Phase 0 outputs directly rather than re-describing the project — this PRD is a translation of decisions you've already made, and reusing that exact language keeps the PRD consistent with everything that came before it.

## Validate Before Moving On

- The PRD fits on one page or one screen — if it's longer, something is over-specified for this context
- The core user flow is a numbered sequence of concrete actions, not a feature list
- "Explicitly out of scope" directly reflects your Phase 0 deferred list, not a new list invented here
- Definition of done is a specific, demoable scenario you could say out loud
- A teammate joining right now could start building from this without asking clarifying questions

## Common Mistakes

- Writing a long, production-style PRD that takes longer to write than it saves in avoided confusion
- Describing features abstractly instead of as a concrete, ordered user flow
- Letting "out of scope" drift from what was actually decided in Phase 0
- No explicit definition of done, leaving the team to individually guess when they're finished
- Treating the PRD as documentation to write after building, instead of a guide to build from

## Quick Reference

| Include | Skip in hackathon mode | Where it comes from |
|---|---|---|
| Problem (1-2 sentences) | Competitive analysis | Phase 0: Problem Definition |
| Core user flow, concrete steps | Detailed edge case handling | Phase 0: Workflow Analysis |
| Data entities | Go-to-market considerations | Phase 0: MVP Scope |
| Explicitly out of scope | Extensive success metrics | Phase 0: deferred feature list |
| Definition of done | Stakeholder sign-off process | Your own demo scenario |

## What's Next

With a shared, concrete plan in place, the next module is User Roles — defining exactly who uses this tool and what each role can see and do, which directly shapes the screens and permissions you'll build next.
