---
title: Welcome
slug: welcome
phase: Phase 0
mode: hackathon
projectType: internal-tool
estimatedTime: 10-15 min
---

# Welcome

You're building an internal tool — software that exists to make a specific business process faster, not to impress the general public. That distinction changes almost every decision ahead of you, and it's worth understanding now, before you write a single line of code.

## What Makes an Internal Tool Different

An internal tool has one audience: the people inside a business who will actually use it to do their job. It doesn't need marketing polish, broad appeal, or defense against the general public — it needs to solve one workflow problem clearly, for a known, specific group of users.

| Consumer/public app | Internal tool |
|---|---|
| Unknown users, need broad appeal | Known users, need workflow fit |
| Judged on visual polish and marketing | Judged on whether it saves real time |
| Needs to handle malicious public traffic | Needs to handle a small, trusted user base |
| Growth and acquisition matter | Adoption by people who already have to use it matters |

> ** Best Practice:** The best internal tool hackathon projects pick one narrow, painful, currently-manual process and fix it completely, rather than building a broad platform that does many things shallowly. Judges and evaluators of internal tools respond to "this replaces a spreadsheet three people update by hand every day" far more than "this could theoretically handle five different workflows."

## What Judges Actually Look For in This Category

Internal tools get evaluated differently than consumer apps or APIs. The bar isn't "would the public download this" — it's "would a real team actually adopt this instead of their current process."

- Does it solve a real, specific, currently-painful workflow?
- Is the data model sensible for actual business use (not just a generic CRUD demo)?
- Can someone unfamiliar with it understand what it does within a minute of seeing it?
- Does it look and feel like something a team would actually trust with their daily work?

> **️ Warning:** Don't build an internal tool that's technically impressive but solves an invented problem nobody actually has. Judges evaluating this category can tell the difference between a real workflow (built around specific roles, realistic data, sensible bulk actions) and a generic to-do-list-shaped demo dressed up as a "tool."

## The Path Through This Project

This project moves through a compressed but complete arc: understanding the actual business process (Phase 0), designing around real user roles (Phase 1), building sensible data architecture (Phase 2), and implementing the core CRUD/forms/tables workflow (Phase 3) — all under hackathon time pressure, before presenting the result (Phase 6).

> ** Tip:** Internal tools are one of the more forgiving hackathon categories for scope, precisely because the value is obvious once shown — a working dashboard that replaces a manual spreadsheet process is immediately legible, even to someone with zero context, in a way a novel consumer app idea often isn't.

## Setting Up for Fast, Focused Building

Because this is hackathon mode, every module ahead prioritizes speed and a working demo over architectural completeness. You'll make fast, defensible decisions rather than exhaustive ones — and that's the correct approach here, not a shortcut you should feel bad about.

> ** Best Practice:** Keep a running note of every shortcut you deliberately take (skipped validation, hardcoded values, missing edge cases) as you build. This isn't extra work — it's the raw material for your pitch's "what we'd build with more time" slide, and it shows judges you made deliberate tradeoffs rather than simply running out of time.

## Use AI to Sharpen Your Problem Before You Start Building

**Prompt — Internal Tool Problem Validation**
```
I'm building an internal tool for a hackathon that addresses this 
business process: [describe the manual/current process you're 
targeting].

Help me stress-test this before I start building:
1. Is this specific enough to build well in limited hackathon time, 
   or is it actually several different problems bundled together?
2. What's the single most important user role this needs to serve first?
3. What would make this feel like "a real tool a team would trust" 
   versus "a generic CRUD demo"?
```

> ** Token Efficiency:** Run this once, before Phase 0's deeper discovery work, to catch a poorly-scoped problem early — fixing scope now costs a few minutes; discovering the problem is too broad partway through Phase 3 costs hours you don't have.

## What's Next

The next module is Problem Definition — narrowing your target business process into something specific enough to build, demo, and explain convincingly within your hackathon time budget.
