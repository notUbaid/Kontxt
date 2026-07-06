---
title: Fake Business Data
slug: fake-business-data
phase: Phase 2
mode: hackathon
projectType: internal-tool
estimatedTime: 10-15 min
---

# Fake Business Data

An internal tool demoed with one test record named "asdf" looks broken, no matter how solid the underlying code is. Realistic seed data is one of the highest-leverage, lowest-effort investments you can make before a demo — it's the difference between a judge seeing "a form" and a judge seeing "a tool a real team already uses."

## The Decision You're Actually Making

Not "do we need test data." It's: **does our seed data tell a believable story about how a real team would actually use this tool over time?**

Data that's realistic in volume, variety, and content does real work in a demo — it makes every screen you show look inhabited rather than staged.

## Why This Matters More for Internal Tools Specifically

| Consumer app demo | Internal tool demo |
|---|---|
| Can demo with one clean, ideal user journey | Needs to look like an established team workflow, mid-use |
| Empty states are often fine, even expected | An empty dashboard reads as "this doesn't actually work yet" |
| One example is often enough | Judges expect to see filtering, sorting, and status variety — which requires multiple records |

> **️ Warning:** A dashboard with two or three items all in the same status looks like a demo, not a tool. Judges evaluating internal tools specifically look for signs of real usage patterns — varied statuses, different priorities, records at different ages — because that's what separates "a working feature" from "a tool that fits how a business actually operates."

## What Realistic Seed Data Actually Needs

- Enough volume to make sorting/filtering meaningful (aim for 10-20 records minimum, not 2-3)
- Variety across every status value your workflow defines, not all records in one state
- Realistic-sounding content (real-sounding names, plausible request titles), not "Test 1," "Test 2"
- A spread of timestamps — some recent, some older — so sorting by date actually demonstrates something

> ** Best Practice:** Vary your data's status distribution to match what a real team would actually look like — mostly resolved items with a smaller number currently pending, for example, rather than an even split. This subtle realism is what makes a dashboard feel like it's showing genuine business activity instead of artificially generated test rows.

## Writing Content That Sounds Real

The specific words in your seed data matter more than people expect — generic placeholder text is one of the fastest ways to make a tool look unfinished.

```
Weak:  "Request 1", "Test item", "asdf"

Strong: "Replace broken monitor in Conference Room B", 
        "Approve Q3 marketing budget increase", 
        "Onboard new contractor - IT access needed"
```

> ** Tip:** Specific, plausible content immediately signals to anyone evaluating your tool that you thought through how it would actually be used, not just how it would technically function. This is a five-minute investment with an outsized impact on how professional the demo feels.

## Use AI to Generate a Full, Realistic Dataset Fast

**Prompt — Seed Data Generation**
```
Generate 15-20 realistic seed records for [your core entity, e.g. 
"internal support requests"] at a company. Requirements:
1. Vary status across all values defined in this schema: [list your 
   status values]
2. Realistic-sounding titles/descriptions specific to this domain, 
   not generic placeholders
3. A realistic distribution — most items resolved, a smaller number 
   pending or in progress, mirroring how a real team's backlog looks
4. Varied timestamps spanning the last few weeks, not all identical

Output as [SQL INSERT statements / JSON / your seed script format — 
specify based on your stack].
```

> ** Token Efficiency:** Ask for the output in the exact format your seed script or database needs (SQL, JSON, ORM syntax) directly in the prompt — this avoids a second round-trip converting generic output into something you can actually run.

## Don't Skip Testing Empty and Edge States Entirely

Realistic data is for the demo, but briefly checking what happens with zero records or one record prevents an embarrassing crash if a judge clicks into an unexpected view.

- Confirm the dashboard doesn't crash or look broken with zero records (even if you won't demo this state)
- Confirm long titles or descriptions don't visually break your table/card layout
- Confirm at least one record per status value renders correctly in every view

> **️ Warning:** Judges sometimes click around outside your planned demo path. If clicking into an empty filter view crashes the page or shows a blank white screen, that's a worse impression than if you'd simply not built that filter at all — a quick empty-state check protects against this specific failure.

## Validate Before Your Demo

- At least 10-15 realistic, varied records exist across all core statuses
- Content reads as plausible business activity, not generic test strings
- Timestamps are varied, not identical or default values
- Empty and edge-case views have been briefly checked, even if not part of the planned demo path
- Data looks correct and complete in every role's dashboard view, not just the one you'll demo first

## Common Mistakes

- Only 2-3 test records, insufficient to demonstrate sorting or filtering meaningfully
- Generic placeholder content ("Test 1," "asdf") that undermines the tool's credibility
- All records in the same status, making status-based features invisible in the demo
- Never checking what an empty or edge-case view looks like before a judge stumbles into one
- Identical or missing timestamps, making date-based sorting look non-functional

## Quick Reference

| Do this | Avoid this | Why it matters |
|---|---|---|
| 10-20 realistic, varied records | 2-3 generic test entries | Enables real filtering/sorting demo |
| Plausible business-sounding content | "Test," "asdf," placeholder text | Signals real design thinking |
| Realistic status distribution | Even or all-one-status split | Mirrors an actual team's backlog |
| Varied timestamps | Identical/default timestamps | Makes date sorting demonstrable |
| Quick empty-state check | Assuming judges only follow your path | Prevents an embarrassing crash |

## What's Next

With realistic data behind every screen, the project moves into Phase 3: Development, starting with CRUD Operations — building the actual create, read, update, and delete functionality your dashboard and forms depend on.
