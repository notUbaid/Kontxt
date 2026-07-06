---
title: Bulk Operations
slug: bulk-operations
phase: Phase 3
mode: hackathon
projectType: internal-tool
estimatedTime: 15-20 min
---

# Bulk Operations

This is often the single feature that makes a judge think "I could actually use this," because it directly targets the pain of doing something one-by-one in a spreadsheet. If you have time for one polish feature beyond core CRUD, this is frequently the highest-leverage choice for an internal tool specifically.

## The Decision You're Actually Making

Not "should we add bulk operations." It's: **is there one repetitive, one-at-a-time action in our workflow that, done in bulk, would visibly demonstrate real time savings in a 10-second demo moment?**

Bulk operations aren't valuable in the abstract — they're valuable because they make a specific, relatable pain (updating 20 rows one at a time) disappear in front of the viewer.

## Find the Bulk Action Worth Building

Look back at your Current Workflow Analysis — the bottleneck step you identified there is often exactly where bulk action has the most impact.

| Workflow situation | Good bulk action candidate |
|---|---|
| Manager approves/rejects requests one at a time | Bulk approve/reject selected rows |
| Status updates happen individually as items complete | Bulk status change on selected rows |
| Items need to be assigned to a specific person one at a time | Bulk assign to a user |
| Old/resolved items need clearing out periodically | Bulk archive/delete |

> ** Best Practice:** Pick exactly one bulk action to build well — the one most directly tied to your identified bottleneck — rather than building generic bulk-edit-everything functionality. A single, well-demoed bulk action ("select 5 requests, mark all resolved in one click") is more convincing than a flexible but shallow bulk-edit system.

## The Minimum Viable Bulk Operation Pattern

```
1. Checkbox on each table row (plus a "select all" in the header)
2. A bulk action bar/button that appears once at least one row is selected
3. One clear action button (e.g. "Mark Selected as Resolved")
4. Confirmation before executing, if the action is destructive
5. Immediate visual update reflecting the change across all selected rows
```

> ** Tip:** The "select all" checkbox in the table header is a small addition that disproportionately improves the demo — "select all 8 pending requests, approve them in one click" is a genuinely satisfying moment to show, and it costs very little extra build time over row-by-row selection alone.

## Decision: Which Actions Deserve Confirmation

| Action type | Confirmation needed? |
|---|---|
| Bulk status change (e.g. mark resolved) | Usually not — easily reversible, low risk |
| Bulk assign | Usually not — easily changed again |
| Bulk delete | Yes — irreversible, confirm before executing |

> **️ Warning:** Don't add a confirmation dialog to every bulk action out of general caution — an unnecessary confirmation step on a low-risk, reversible action (like a status change) just adds friction to the exact moment your demo should feel fast and satisfying. Reserve confirmation dialogs for genuinely irreversible actions.

## Implementing Selection State Simply

You don't need a complex state management library for this — a simple array of selected IDs is enough for a hackathon MVP.

```javascript
const [selectedIds, setSelectedIds] = useState([]);

// Toggle a single row
const toggleSelect = (id) => {
  setSelectedIds(prev => 
    prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
  );
};

// Select all
const selectAll = () => setSelectedIds(allRows.map(r => r.id));
```

> ** Best Practice:** Basic array state and a single API call that accepts an array of IDs (rather than looping through individual update calls) is sufficient here. Don't over-engineer this with a dedicated state management library or a batching queue — a hackathon's data volume doesn't require it, and the simple version is faster to build correctly.

## Making the Bulk Action Visible in Your Demo

- The bulk action bar/button is only visible once something is selected — not always present and disabled
- Selected row count is shown ("3 selected") so the audience can see the scale of the action
- The result is immediately visible across all affected rows — no manual refresh needed

> ** Tip:** Showing the selected count ("3 selected") right before executing the action gives your demo a clear "before" moment — you can say "these three requests are pending" and then show them all update at once, which makes the value of the feature immediately obvious without extra narration.

## Use AI to Build the Bulk Action Fast

**Prompt — Bulk Operation Implementation**
```
Add bulk operation support to this table component: [paste your 
table component or describe it].

Requirements:
1. Checkbox per row plus a "select all" in the header
2. A bulk action bar that appears only when 1+ rows are selected, 
   showing the selected count
3. One action: [specify your chosen bulk action, e.g. "mark selected 
   as resolved"]
4. [Include / skip] a confirmation dialog based on whether this action 
   is destructive
5. A single API call accepting an array of IDs, not a loop of 
   individual calls
6. Immediate UI update across all affected rows on success

Stack: [your stack from earlier modules]
```

> ** Token Efficiency:** Paste your existing table component code directly rather than describing it — bulk selection needs to integrate with your actual row rendering, and generating it against real code produces something that actually fits, instead of a standalone example you'd need to merge in manually.

## Validate Before Moving On

- Exactly one bulk action is built, chosen because it targets your actual workflow bottleneck
- Selection state (checkboxes, select all) works correctly and visibly
- The action executes as a single batched call, not a slow loop of individual requests
- Confirmation is used only where the action is genuinely destructive
- The demo moment (select multiple, act once, see immediate update) has been rehearsed and works reliably

## Common Mistakes

- Building generic bulk-edit-everything instead of one targeted action tied to the real bottleneck
- Adding confirmation dialogs to low-risk, reversible bulk actions, slowing down the demo unnecessarily
- Implementing bulk actions as a loop of individual API calls instead of one batched request
- No visible selected-count feedback, losing the "before" moment that makes the demo land
- Never rehearsing this specific interaction, risking a fumble during the one moment most likely to impress judges

## Quick Reference

| Build this | Skip this | Demo tip |
|---|---|---|
| One targeted bulk action tied to the bottleneck | Generic bulk-edit-everything | Show selected count before acting |
| Checkbox + select-all pattern | Confirmation on reversible actions | Rehearse this exact sequence |
| Single batched API call | Individual API calls in a loop | Narrate the "before" state explicitly |
| Confirmation only for destructive actions | Complex state management libraries | This is often your strongest demo beat |

## What's Next

With core development complete — CRUD, forms, tables, and bulk operations all working — the project moves to Phase 6: Operations & Improvement, starting with Presentation Prep, where you turn this working tool into a compelling story for judges.
