---
title: Presentation Prep
slug: presentation-prep
phase: Phase 6
mode: hackathon
projectType: internal-tool
estimatedTime: 15-20 min
---

# Presentation Prep

You built a tool that replaces a real, specific manual process. Now you have to make a judge who's never done that manual process feel the pain of it in about 15 seconds — because the entire value of an internal tool is invisible unless the audience first understands what it's replacing.

## The Decision You're Actually Making

Not "what should we say about our tool." It's: **how do we make a judge feel the specific pain of the spreadsheet/email/manual process, fast enough that our fix feels obviously valuable the moment we show it?**

Internal tools have an advantage over more abstract categories here: the "before" state is something everyone has experienced in some form (a messy spreadsheet, a lost email thread). Use that shared experience.

## Lead With the Before, Not the Features

| Weak opening | Strong opening |
|---|---|
| "We built a request tracking tool with CRUD, roles, and bulk actions." | "Right now, if you want to approve 10 requests, you open a shared spreadsheet, find each row, and manually change a cell — one at a time. Here's what that looks like fixed." |

> ** Best Practice:** Open with the specific, concrete current-state pain from your Problem Definition and Workflow Analysis modules — reuse that language directly rather than writing new framing from scratch. You already did the hard work of making the pain concrete; the pitch just needs to say it out loud clearly.

## What to Show, In Order

1. **The current pain** — 15-20 seconds, describe the real manual process concretely
2. **The core fix, live** — show the main workflow action working (the Update/status-change moment from your CRUD work)
3. **The bulk operation moment** — if you built one, this is often your strongest single beat
4. **Role awareness** — briefly show the tool looks different and appropriate for each role
5. **What's next** — one sentence from your deferred features list

> ** Tip:** Your bulk operations feature, if built, is usually the single most convincing moment in an internal tool demo — "select these 5, resolve them all at once" makes the value viscerally obvious in a way a single-record update doesn't. If you built it, don't bury it; make it the centerpiece.

## Use Real Language From Your Own Planning

You've already written a precise problem statement, a workflow map, and a PRD. The pitch shouldn't reinvent language — it should reuse the sharpest phrasing you already have.

> ** Best Practice:** Pull your opening line directly from your Problem Definition module's final, sharpened statement. If you did that work well, it's already concise, specific, and instantly understandable — rewriting it fresh under pitch-prep time pressure risks losing the precision you already achieved.

## Use AI to Sharpen the Pitch From Your Existing Work

**Prompt — Internal Tool Pitch Structure**
```
Here's my project's existing planning docs:
- Problem statement: [paste from Problem Definition]
- Workflow bottleneck: [paste from Current Workflow Analysis]
- What we built: [list core features, especially any bulk operation]
- Deferred features: [paste your "what's next" list]

Structure a 2-3 minute pitch that opens with the concrete current-state 
pain, shows the fix, and closes with what's next. Tell me which 
specific demo moment (from what we built) is likely the most 
convincing to lead with.
```

> ** Token Efficiency:** Paste your actual prior module outputs rather than summarizing from memory — the specific, concrete language you already wrote is exactly what makes this pitch land, and re-describing it from scratch risks losing that precision.

## Validate Before You Present

- The opening describes a real, specific current pain — not a generic "this tool helps teams..."
- Your bulk operation (if built) is positioned as a highlighted moment, not an afterthought
- Role differences are shown briefly, not explained at length
- You can state what's deliberately deferred in one sentence, showing intentional scoping

> **️ Warning:** Don't spend pitch time explaining your tech stack or architecture decisions unless specifically asked. For an internal tool, judges care about workflow fit and real time savings — technical depth belongs in the Q&A, not the core pitch.

## Common Mistakes

- Opening with a feature list instead of the concrete pain being solved
- Burying the bulk operations moment instead of leading with it
- Spending pitch time on tech stack instead of workflow value
- Vague "this helps teams be more efficient" framing instead of the specific pain from your own planning docs

## Quick Reference

| Lead with | Highlight | Save for Q&A |
|---|---|---|
| The specific current-state pain | The bulk operation moment | Tech stack details |
| Language from your own Problem Definition | Role-aware views, briefly | Database schema decisions |
| The core workflow fix, live | One clear "what's next" item | Edge cases and validation logic |

## What's Next

With your story structured around real pain and a real fix, the next module builds the actual deck — the slides that carry this story visually for a judge who's watching, not just listening.
