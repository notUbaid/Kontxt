---
title: Dashboard Strategy
slug: dashboard-strategy
phase: Phase 1
mode: hackathon
projectType: internal-tool
estimatedTime: 15-20 min
---

# Dashboard Strategy

The dashboard is the first thing anyone sees when they open your tool, and for an internal tool specifically, it's the moment that either says "this replaces my spreadsheet" or "this is a form with extra steps." Get this screen's priorities right and the rest of the build has a clear target.

## The Decision You're Actually Making

Not "what should be on the dashboard." It's: **what's the one question a user opens this tool to answer, and does the dashboard answer it in the first three seconds of looking at it?**

Every dashboard element competes for attention. In hackathon time, you can't build ten widgets — you need to correctly identify the one or two that actually matter and build those well.

## Find the Question Your Dashboard Must Answer

This comes directly from your workflow analysis and roles — not a fresh brainstorm.

| Role | The question their dashboard answers |
|---|---|
| Employee/submitter | "What's the status of things I've submitted?" |
| Manager/reviewer | "What needs my attention right now?" |

> ** Best Practice:** A manager's dashboard should default to showing what's unresolved or needs action, not a complete historical list sorted by date created. The question "what needs my attention" is answered by surfacing pending items first — sorting by recency alone often buries the urgent item under older, already-resolved noise.

## Decision: Table View vs Card View vs Summary Stats

| Approach | Best for | Hackathon build time |
|---|---|---|
| Simple table (sortable columns) | Data-dense workflows, comparing multiple items | Low — fastest to build well |
| Card/kanban view | Status-based workflows (pending → in progress → done) | Medium — more visually impressive but slower to build |
| Summary stats + list | When "how many are pending" matters as much as "which ones" | Low-medium |

> ** Tip:** A clean, sortable table is almost always the right default for an internal tool hackathon MVP — it's fast to build, immediately legible, and looks intentional rather than incomplete. Reach for a kanban board only if your workflow is genuinely stage-based and you have real time budget for the drag-and-drop interaction to work reliably.

## What Belongs on the Dashboard vs What Doesn't

- The core entity list (requests, tickets, items) filtered to what's relevant for that role
- The status of each item, visible at a glance (a colored badge, not a paragraph)
- One clear primary action per item (view, update status, assign) — not a menu of five options
- Basic sort or filter by the field that matters most (priority, status, date)

> **️ Warning:** Resist the urge to add charts, graphs, or analytics widgets to an MVP dashboard unless the workflow genuinely requires them for the primary question. A pie chart showing "requests by category" looks impressive but adds build time without helping anyone actually resolve a request — build it only if you finish the core table with time to spare.

## Designing for the Empty State From the Start

Your dashboard will likely be demoed with a small amount of seed data, not thousands of realistic records — plan for what it looks like at that scale.

> ** Best Practice:** Seed enough realistic-looking data (5-10 varied entries, not 1-2) that the dashboard looks like a tool with real usage history, not an empty shell. A dashboard with a single test entry named "asdf" undermines the credibility of an otherwise solid tool in the first three seconds of a demo.

## Keep Role Differences Visible on the Dashboard Specifically

Since the dashboard is the first screen, it's your best opportunity to demonstrate role-awareness without extra explanation.

- Confirm the employee and manager dashboards are visibly, not just technically, different
- Make sure switching roles in a demo produces an obviously different, appropriate view
- Avoid a dashboard that looks identical for both roles except for a small permissions difference buried in a menu

## Use AI to Design the Dashboard Layout

**Prompt — Dashboard Layout for a Specific Role**
```
For a [role] in an internal tool that [describe the workflow/entity], 
design a dashboard layout that answers this specific question: 
[the one question this role opens the tool to answer].

Specify:
1. What's shown first/most prominently
2. What view type fits best (table, cards, stats) given this is a 
   hackathon build with limited time
3. What should explicitly NOT be on this dashboard for the MVP, even 
   if it seems useful
```

> ** Token Efficiency:** Run this once per role, reusing the same conversation, rather than one generic "design a dashboard" prompt — role-specific framing produces a dashboard actually tailored to what that person needs to see first, instead of a generic layout applied twice.

## Validate Before Moving On

- You can name the one question each role's dashboard answers
- The default view surfaces what needs attention, not just a raw chronological list
- Seed data makes the dashboard look like a real, used tool, not an empty shell
- Role differences are visible on this screen specifically, not just present elsewhere in the app
- No analytics/chart widgets were built before the core table/list actually works well

## Common Mistakes

- Building charts and analytics before the core list/table view is solid
- A dashboard that looks the same for every role except for a hidden permission difference
- Sorting by recency when the actual need is surfacing what's urgent or unresolved
- Demoing with too little or unrealistic seed data, making the tool look empty or unused
- Overloading the dashboard with every possible field instead of the ones that answer the core question

## Quick Reference

| Prioritize | Add only with extra time | Avoid in MVP |
|---|---|---|
| One core question per role, answered clearly | A kanban/card view if workflow is stage-based | Charts/analytics widgets |
| Sortable table showing relevant status | Basic filtering by priority/status | Configurable/customizable dashboards |
| Realistic seed data (5-10 entries) | Visual polish once function works | Every possible field crammed onto one view |
| Visibly different views per role | — | Identical dashboards across roles |

## What's Next

With the dashboard experience planned for each role, the project moves into Phase 2: Architecture, starting with Database Schema — turning your entities and roles into the actual data structure the dashboard will query.
