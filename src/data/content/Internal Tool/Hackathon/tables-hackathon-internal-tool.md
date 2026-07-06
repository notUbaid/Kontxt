---
title: Tables
slug: tables
phase: Phase 3
mode: hackathon
projectType: internal-tool
estimatedTime: 15-20 min
---

# Tables

If the dashboard is the first impression, the table is where most of the actual work happens — scanning, comparing, sorting, deciding what needs attention. For an internal tool, a well-built table often does more to convince someone this is real software than any other single screen.

## The Decision You're Actually Making

Not "how do we display a list of records." It's: **can someone scan this table and immediately understand what needs attention, without reading every row individually?**

A table that just dumps every field in every column forces the viewer to do the work your tool should be doing for them.

## Choosing Columns Deliberately, Not Comprehensively

Not every schema field belongs in the table view — the table should show what someone needs to scan quickly, with details available on click-through if needed.

| Include as a column | Leave for detail view only |
|---|---|
| Title/name (the identifying field) | Full description text |
| Status (as a visual badge) | Internal IDs |
| Priority, if relevant to scanning | Every timestamp variant |
| Assigned to / owner | Rarely-referenced metadata |

> ** Best Practice:** Limit your table to 4-6 columns that someone would actually scan to make a decision. A table with twelve columns forces horizontal scrolling and defeats the purpose of a table — which is fast visual comparison, not complete data display. Anything more belongs behind a click into detail view.

## Status as a Visual Badge, Not Plain Text

This is one of the highest-impact, lowest-effort improvements you can make to a table's usability.

```
Weak: A "status" column showing the words "pending", "in_progress", 
"resolved" as plain text.

Strong: The same values shown as colored badges — e.g., yellow for 
pending, blue for in progress, green for resolved.
```

> ** Tip:** Colored status badges let someone scan an entire table and understand the overall state of the workload in about two seconds — plain text status requires reading each row individually. This is a small styling change with an outsized impact on how "real" the tool feels.

## Sorting: Default Order Matters as Much as Sortability

- Choose a sensible default sort (usually: most urgent/oldest-pending first, not just creation date descending)
- Make the most useful columns clickable to sort (status, priority, date) — not necessarily every column
- Confirm sorting actually re-orders the visible rows, not just a cosmetic arrow icon with no real effect

> **️ Warning:** A "sortable" column header that doesn't actually re-sort the data when clicked is worse than no sort indicator at all — it actively misleads whoever's using it, and if a judge clicks it during a demo expecting it to work, the gap becomes visible immediately.

## Row-Level Actions: Keep Them Obvious and Minimal

- One primary action per row is immediately visible (view, resolve, assign) — not hidden in a dropdown menu for an MVP
- Destructive actions (delete) are visually distinct from primary actions, if included at all
- Clicking a row (or its primary action) leads somewhere useful, not a dead click

> ** Best Practice:** For a hackathon MVP, prefer a single, visible button per row over a "..." overflow menu hiding multiple actions. A visible "Mark Resolved" button demos better than a menu a judge has to click open first to discover what's possible — obviousness beats compactness in a live demo context.

## Handling Longer Content Without Breaking Layout

- Long titles or descriptions truncate with ellipsis rather than breaking the row height or pushing columns around
- Truncated content is viewable in full via a click-through or hover, not simply lost

> **️ Warning:** Test your table with at least one deliberately long title in your seed data. A single unexpectedly long value that breaks your table's layout during a live demo is a small bug with an outsized visual impact — catch this before it catches you in front of judges.

## Use AI to Build a Scannable Table Fast

**Prompt — Table Component Generation**
```
Build a table component for [entity] with these columns only: 
[list 4-6 columns, prioritizing what someone scans to decide what 
needs attention].

Requirements:
1. Status shown as a colored badge, not plain text — map each status 
   value to a color
2. Default sort: [specify, e.g. "priority descending, then oldest 
   pending first"]
3. Clickable column headers for sorting on [specify 2-3 key columns]
4. One visible primary action button per row: [specify the action]
5. Long text truncates with ellipsis, doesn't break row layout

Stack: [your stack from earlier modules]
```

> ** Token Efficiency:** Specify your exact default sort logic and which columns need sorting rather than asking for "a sortable table" generically — this avoids a follow-up round of adjusting sort behavior after generation.

## Validate Before Moving On

- Table shows 4-6 deliberately chosen columns, not every schema field
- Status displays as a colored badge, scannable at a glance
- Default sort order surfaces what actually needs attention first
- Clicking a sortable column header actually re-sorts the visible data
- At least one long-content test case has been checked and doesn't break the layout

## Common Mistakes

- Cramming every schema field into the table instead of the 4-6 that matter for scanning
- Status shown as plain text instead of a scannable colored badge
- Sortable-looking column headers that don't actually re-sort anything
- Row actions hidden in a dropdown menu instead of one visible primary button
- Never testing a long title/description, risking a layout break during the live demo

## Quick Reference

| Do this | Avoid this | Why it matters for a demo |
|---|---|---|
| 4-6 scannable columns | Every schema field as a column | Fast visual comparison, no horizontal scroll |
| Colored status badges | Plain text status | Two-second overall state comprehension |
| Sensible default sort (urgency-based) | Default creation-date-only sort | Surfaces what actually needs attention |
| One visible primary action per row | Actions hidden in overflow menus | Obvious, demoable interactions |
| Truncated long text | Untested long content | Prevents a live layout break |

## What's Next

With a clean, scannable table in place, the next module is Bulk Operations — adding the ability to act on multiple records at once, which is often the single feature that most convincingly signals "this replaces manual, one-by-one spreadsheet work."
