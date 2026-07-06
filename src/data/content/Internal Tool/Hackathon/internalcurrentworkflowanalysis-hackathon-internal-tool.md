---
title: Current Workflow Analysis
slug: current-workflow-analysis
phase: Phase 0
mode: hackathon
projectType: internal-tool
estimatedTime: 15-20 min
---

# Current Workflow Analysis

You've named the problem. Now map exactly how it's handled today, step by step. This isn't academic process documentation — it's the fastest way to discover what your tool actually needs to do, and just as importantly, what it can skip.

## The Decision You're Actually Making

Not "what features should the tool have." It's: **what are the actual steps someone takes today, in order, and which of those steps does software genuinely need to replace versus which were only necessary because the old process was manual?**

Some steps in a manual workflow exist purely to compensate for the manual process itself — a status meeting to sync everyone on a spreadsheet's current state, for example. Software can eliminate that step entirely rather than replicate it.

## Map the Workflow as a Simple Sequence

Write out the current process as a literal step-by-step sequence, naming who does each step:

```
1. [Role] receives a request via [current method: email, Slack, verbal]
2. [Role] records it in [current tool: spreadsheet, notebook, memory]
3. [Role] checks status by [current method: asking someone, searching a thread]
4. [Role] updates the record when [trigger event] happens
5. [Role] reports the outcome via [current method]
```

> ** Best Practice:** Write this sequence using the actual current tools by name (a specific spreadsheet, a specific Slack channel), not generic placeholders. Naming the real current tool forces you to confront exactly what's breaking — "the shared Google Sheet gets overwritten" is a concrete, buildable insight; "the tracking system has issues" is not.

## Distinguish Two Kinds of Steps

| Step type | What it means | What to do with it |
|---|---|---|
| **Core step** | The actual task that needs to happen regardless of tooling | Your tool must support this |
| **Compensating step** | Exists only to work around the current process being manual/broken | Your tool can eliminate this entirely |

> **️ Warning:** Don't accidentally rebuild a compensating step into your new tool. A status-check meeting exists because a spreadsheet doesn't show live status — if your tool shows live status, the meeting shouldn't exist anymore, and a feature that just moves the meeting into the app is solving the wrong problem.

## Finding the Actual Bottleneck Step

Not every step in the workflow is equally painful. Identify which single step causes the most friction, delay, or error — that's your highest-priority target.

- Which step takes the longest in practice?
- Which step is most often the source of an actual error or miscommunication?
- Which step, if fixed, would make the rest of the process meaningfully faster even if nothing else changed?

> ** Tip:** In hackathon time, you're better off making one bottleneck step dramatically better than making every step marginally better. A tool that turns a 20-minute manual status-check into a 5-second glance at a dashboard is a stronger, more demoable win than a tool that shaves a minute off five different steps.

## What This Tells You About Your Data Model

The workflow steps directly reveal what data your tool needs to track — this analysis feeds straight into Phase 2's Database Schema module.

- Each step that "records" something reveals an entity your database needs (a request, a status, an assignment)
- Each step that "checks status" reveals a field or relationship your schema needs to support querying efficiently
- Each handoff between roles reveals a permission or visibility boundary you'll need in Phase 1's User Roles

> ** Best Practice:** Keep this workflow map open while you design your database schema later — the steps map almost directly onto tables and fields. Skipping this analysis often leads to designing a schema based on guessed features instead of the actual data the real process generates.

## Use AI to Extract the Data Model From Your Workflow

**Prompt — Workflow-to-Data-Model Extraction**
```
Here's the current manual workflow I'm replacing:

[paste your step-by-step sequence, including roles and current tools]

Based only on this workflow:
1. What are the core entities (nouns) this process generates that 
   would need to be database tables?
2. What's the single bottleneck step causing the most friction, and 
   why, based on this description?
3. Which steps are "compensating" for the manual process and should 
   be eliminated entirely rather than replicated in the tool?
```

> ** Token Efficiency:** Paste your actual workflow sequence rather than a general description of the problem — this analysis is only useful when grounded in the specific steps you mapped, not a generic process template.

## Validate Before Moving On

- The workflow is written as a specific, ordered sequence naming real current tools, not generic placeholders
- You've identified at least one compensating step your tool should eliminate, not replicate
- You've named the single biggest bottleneck step to prioritize
- The entities revealed by this workflow are a strong starting point for your data model

## Common Mistakes

- Mapping an idealized version of the workflow instead of what actually happens today, warts included
- Treating every step as equally important instead of identifying the real bottleneck
- Accidentally rebuilding a compensating step (like a status meeting) as a feature in the new tool
- Skipping this analysis and jumping straight to database design based on assumptions
- Using generic placeholders instead of naming the actual current tools and roles involved

## Quick Reference

| Do this | Watch for | Feeds directly into |
|---|---|---|
| Map the real, specific current sequence | Compensating steps to eliminate | Database Schema (Phase 2) |
| Name real tools and roles, not placeholders | The single biggest bottleneck step | User Roles (Phase 1) |
| Distinguish core steps from compensating ones | Steps that only exist due to manual process | Dashboard Strategy (Phase 1) |

## What's Next

With the real workflow mapped and the bottleneck identified, the next module is MVP Scope — deciding exactly which slice of this workflow you'll actually build in the time available.
