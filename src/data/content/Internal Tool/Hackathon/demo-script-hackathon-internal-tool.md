---
title: Demo Script
slug: demo-script
phase: Phase 6
mode: hackathon
projectType: internal-tool
estimatedTime: 15-20 min
---

# Demo Script

The deck set up the pain. Now the live demo has to deliver the payoff — and for an internal tool, that payoff is almost always a moment of visible time-savings: watching something that used to take ten manual steps happen in one or two clicks.

## The Decision You're Actually Making

Not "what do we click through." It's: **what's the exact sequence that makes a judge feel the time saved, not just told about it?**

The single best asset an internal tool demo has is contrast — showing "before" (however briefly) right next to "after" makes the value immediate and undeniable, more than any amount of narration could.

## The Core Demo Structure

1. **Brief before-state reference** — a sentence or a quick glance at the "old way" (spreadsheet screenshot, or just a clear verbal description)
2. **The core workflow action, live** — show your Update/status-change moment working
3. **The bulk operation moment** — your strongest beat, if built
4. **Role switch (brief)** — show the tool looks appropriately different for a second role
5. **Close on the deferred list** — one sentence on what's next

> ** Best Practice:** Keep the before-state reference brief — a single sentence or a 2-second screenshot glance, not an extended walkthrough of the old process. The goal is just enough context that the "after" moment lands, not a full demo of the thing you're replacing.

## Scripting the Bulk Operation Moment Specifically

This deserves its own careful staging, since it's usually your strongest beat.

| Step | Action | Say |
|---|---|---|
| 1 | Point at several pending rows | "These 5 requests all need approval." |
| 2 | Select all 5 via checkboxes | "Normally, that's 5 separate actions." |
| 3 | Click the bulk action button | "Here, it's one." |
| 4 | Pause on the updated table | *(let the visible change sit for a second)* |

> ** Tip:** Narrate the "before" cost explicitly right before triggering the bulk action ("normally that's 5 separate steps") rather than only after — saying it first primes the audience to actually notice and appreciate the contrast when it happens, instead of needing you to explain the significance afterward.

## Pre-Stage Everything

- Seed data includes enough pending/actionable rows to make a bulk action meaningful (not just 1-2)
- You know exactly which rows you'll select, rehearsed, not decided live
- Both role accounts (if demoing role switching) are pre-logged-in, ready to switch instantly
- The demo runs against your actual deployed/running app, tested beforehand, not assumed to work

> **️ Warning:** Don't select rows to bulk-act on live and improvised — decide in advance exactly which rows you'll click, in what order, so the selection itself looks smooth and intentional rather than fumbling through a table looking for the right items during your limited time.

## Keep the Role-Switch Moment Short

If you built distinct role views, showing this proves real thoughtfulness — but it shouldn't consume disproportionate time.

> ** Best Practice:** Budget 10-15 seconds for the role-switch moment — enough to say "and here's what the same tool looks like for [other role]" and briefly show the different view, not a full walkthrough of the second role's entire experience. This is a supporting beat, not the main event.

## Use AI to Time and Tighten the Script

**Prompt — Demo Script Timing Review**
```
Here's my demo script for an internal tool, with rough timing:
[paste your action/dialogue script with time estimates]

Total time budget: [X] seconds. Flag:
1. Any step likely to take longer than estimated (especially the 
   bulk operation selection)
2. Whether the "before" context is brief enough to not eat into the 
   "after" payoff moment
3. Any unscripted/improvised element that should be pre-staged instead
```

> ** Token Efficiency:** Include your actual time budget and estimates directly — a review is only useful against real numbers, not a request to "make this shorter" without a specific target.

## Validate Before You Present

- Seed data has enough actionable rows pre-loaded for the bulk action to look meaningful
- The exact rows you'll select in the bulk operation demo are decided and rehearsed, not improvised
- Full script has been rehearsed at least 3-5 times against the real running app
- Role-switch moment (if included) is timed to stay brief

## Common Mistakes

- Spending too long narrating the "before" state instead of quickly moving to the payoff
- Selecting bulk-action rows live and improvised, risking a fumbled or slow selection
- Not enough seed data to make the bulk action look meaningful (selecting only 1-2 rows)
- Role-switch demo running long and eating time from the core workflow moment
- Never rehearsing against the actual deployed app, only a local dev version

## Quick Reference

| Must-have | Nice-to-have | Avoid |
|---|---|---|
| Pre-decided rows for bulk action | Brief "before" screenshot reference | Improvised row selection live |
| Rehearsed full sequence, 3-5 times | Short role-switch demo (10-15 sec) | Long before-state walkthrough |
| Enough seed data for a meaningful bulk demo | Explicit "normally this is N steps" narration | Untested demo against a stale local build |

## What's Next

With the demo rehearsed, the final module is the Submission Checklist — verifying everything from your repo to your live deployment is ready before judges see it.
