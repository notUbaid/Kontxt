---
title: Problem Definition
slug: problem-definition
phase: Phase 0
mode: hackathon
projectType: internal-tool
estimatedTime: 15-20 min
---

# Problem Definition

Every wasted hour in a hackathon internal tool project traces back to one root cause: a problem statement vague enough that three team members are quietly building three different tools. This module forces the specificity that prevents that.

## The Decision You're Actually Making

Not "what should we build." It's: **what specific, repeated, currently-manual task, done by a specific type of person, are we replacing — and can we state it in one sentence everyone on the team would say the same way?**

If you can't write that sentence yet, you don't have a problem definition — you have a topic area, and topic areas don't build well under time pressure.

## The Test for a Good Internal Tool Problem Statement

A strong problem statement names three things explicitly: the person, the current process, and the pain.

```
Weak:  "A tool to help manage inventory."

Strong: "Warehouse staff currently track stock levels in a shared 
spreadsheet that gets overwritten by simultaneous edits, causing 
incorrect counts at least weekly."
```

> ** Best Practice:** If your problem statement doesn't name a specific role (warehouse staff, HR coordinator, support agent) and a specific current tool or process (spreadsheet, email chain, sticky notes), it's too vague to build against efficiently. Rewrite it until it does.

## Where to Find a Real Problem Fast

You don't have time for extensive discovery interviews in a hackathon. Use these faster sources instead:

| Source | Why it's fast and reliable |
|---|---|
| Your own team's actual work friction | You already know it, no research needed |
| A process you've seen done badly at a previous job/internship | Real, specific, and you understand the pain firsthand |
| A common small-business pain point (scheduling, inventory, client tracking) | Universally recognizable to judges without lengthy explanation |
| "What does someone currently track in a spreadsheet that shouldn't be one" | A reliable pattern-finder for internal tool opportunities |

> ** Tip:** "What's currently done in a spreadsheet or shared document that breaks down under multiple simultaneous users" is one of the most reliable internal-tool problem generators — it's specific, relatable, and the value of a real tool over a fragile spreadsheet is immediately obvious to anyone evaluating it.

## Decision: Scope the Process, Not the Department

| Too broad | Right-sized for a hackathon |
|---|---|
| "HR management tool" | "Tracking PTO requests and approvals for a 20-person team" |
| "Customer support platform" | "Triaging and assigning incoming support tickets to the right agent" |
| "Inventory system" | "Tracking stock counts across three warehouse locations with low-stock alerts" |

> **️ Warning:** A problem statement scoped to a whole department ("HR tool," "sales tool") is actually five or six different tools wearing one name. You will not finish any of them well in hackathon time. Narrow to one specific process within that department before moving forward.

## Naming the Pain Specifically, Not Generically

"It's inefficient" describes almost every manual process and tells you nothing about what to build. Get specific about the actual failure mode.

- What specifically goes wrong with the current process? (data gets overwritten, nobody knows the current status, information lives in someone's head)
- How often does this pain actually occur? (daily, weekly, at a specific recurring event)
- What's the visible cost when it fails? (a missed deadline, a duplicate order, a customer complaint)

> ** Best Practice:** A specific failure mode ("simultaneous spreadsheet edits overwrite each other, causing incorrect stock counts") gives you a direct, demoable success criterion: the tool prevents exactly that failure. A vague pain point ("it's inefficient") gives you nothing concrete to build toward or demo against.

## Use AI to Pressure-Test Your Problem Statement

**Prompt — Problem Statement Sharpening**
```
Here's my internal tool problem statement for a hackathon:

[paste your current draft]

Rewrite this to be maximally specific: name the exact role of the 
person affected, the exact current process/tool they use, and the 
exact, concrete failure mode that occurs. Then tell me if this is 
narrow enough to fully build a working demo of within a hackathon 
timeframe, or if it's still actually multiple problems bundled together.
```

> ** Token Efficiency:** Do this once, early, before any architecture or design work begins — a sharp problem statement makes every later prompt in this project more effective, since AI can reason against a specific target instead of a vague topic area.

## Validate Before Moving On

- The problem statement names a specific role, not a department
- It names the specific current process or tool being replaced
- It states a concrete, observable failure mode, not a vague "it's inefficient"
- Every team member can restate the problem in roughly the same words
- You can imagine exactly what a successful demo of the fix would look like

## Common Mistakes

- Scoping to an entire department instead of one specific process
- Vague pain descriptions ("inefficient," "outdated") with no concrete failure mode named
- A problem statement broad enough that team members are quietly building different things
- Choosing a problem because it sounds impressive rather than because it's real and specific
- Skipping this step entirely and jumping straight to features

## Quick Reference

| Must include | Sign it's too broad | Fast sources for real problems |
|---|---|---|
| Specific role affected | Names a whole department | Your own team's actual work friction |
| Specific current process/tool | No named "current tool" being replaced | A spreadsheet used by multiple people |
| Concrete, observable failure mode | Pain described only as "inefficient" | A process you've seen fail before |
| A demoable success criterion | Can't picture what "fixed" looks like | Common small-business pain points |

## What's Next

With a sharp, specific problem statement, the next module is Current Workflow Analysis — mapping out exactly how the process works today, step by step, so you know precisely what your tool needs to replace.
