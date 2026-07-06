---
title: Submission Checklist
slug: submission-checklist
phase: Phase 6
mode: hackathon
projectType: internal-tool
estimatedTime: 10-15 min
---

# Submission Checklist

This is the last pass before judges see your work. For an internal tool specifically, the biggest risk isn't a broken feature — it's a demo environment that doesn't reflect the polished, rehearsed version you tested, because internal tools rely heavily on realistic seed data staying intact.

## The Decision You're Actually Making

Not "is the project done." It's: **if a judge opens our repo and deployed link right now, with zero context, does it look and work exactly like what we rehearsed?**

## The Non-Negotiables

- Deployed app URL is live, checked in an incognito window
- Seed data is still present and intact — not accidentally cleared by your own testing
- GitHub repo is public
- README includes the specific problem statement and current-pain framing from your planning docs, not a generic description

> **️ Warning:** The most internal-tool-specific submission risk is realistic seed data getting wiped out during final testing (a stray delete, a database reset) right before submission. Re-verify your seed data is intact and matches what you rehearsed against — this is a fast check that prevents a bad surprise mid-demo.

## Verify the Exact Rehearsed Path Still Works

- The specific rows you planned to select for your bulk operation demo still exist, in the same state
- Both role accounts (if demoing role switching) still log in correctly
- The core workflow action (status change, assignment) still works end to end on the deployed version
- No last-minute code change has silently broken something documented or rehearsed

> ** Best Practice:** Run your entire rehearsed demo script one final time, start to finish, against the actual deployed link, right before submitting or presenting — not from memory of an earlier successful run. Internal tools depend heavily on specific data state, and that state is exactly what's most likely to have shifted since your last full rehearsal.

## README Essentials for This Category

| Section | Why it matters here specifically |
|---|---|
| The specific current-state pain | Judges reading the README before your live pitch need the same context your presentation builds |
| What role(s) the tool serves | Sets up why the tool looks the way it does |
| The core workflow it replaces | More important than a feature list for this category |
| Live demo link | Let judges explore if they have time before/after your pitch |

> ** Best Practice:** Reuse your Problem Definition module's language directly in the README — it's already sharp, specific, and consistent with what you'll say live. A README that describes the tool differently than your pitch creates a confusing double narrative for anyone comparing the two.

## Use AI for a Final Cold Read

**Prompt — Submission Readiness Review**
```
Act as a judge seeing this internal tool project for the first time, 
reading only this README:
[paste your full README]

Tell me:
1. Is the specific business pain clear, or does it read as a generic 
   "productivity tool"?
2. Would I understand what role(s) this serves and what the core 
   workflow is?
3. Anything that looks unfinished or inconsistent with what a live 
   demo would need to show?
```

> ** Token Efficiency:** Run this once, at the very end, against your final README — it's a last gate check, not an ongoing editing tool.

## Validate, For Real, Before Submitting

- Full rehearsed demo path tested against the live deployed link, today
- Seed data confirmed intact and matching what you'll show live
- README uses the same specific pain framing as your pitch, not generic language
- Repo is public and confirmed accessible in an incognito check

## Common Mistakes

- Seed data accidentally cleared or altered during final testing, breaking the rehearsed demo
- README describing the tool generically instead of using the specific pain framing from your own planning
- Repo left private at the deadline
- No final end-to-end test against the actual deployed link, only a memory of an earlier successful run

## Quick Reference

| Verify one final time | Reuse directly | Don't skip |
|---|---|---|
| Seed data intact and matches rehearsal | Problem Definition language, in the README | Full end-to-end test on deployed link |
| Public repo, incognito-checked | Pitch deck framing, in the README | Confirming both role accounts still work |
| Bulk-action rows still in expected state | — | A final cold read of the README |

## You're Done

From a sharply scoped business problem through a working, role-aware tool with a real bulk-action payoff, this project followed the same discipline a strong internal engineering team would apply — solve one specific, real pain completely, rather than many problems shallowly. That's the difference judges notice, and it's the same instinct worth carrying into every future project.
