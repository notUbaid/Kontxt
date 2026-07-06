---
title: CRUD Operations
slug: crud-operations
phase: Phase 3
mode: hackathon
projectType: internal-tool
estimatedTime: 20-25 min
---

# CRUD Operations

Create, Read, Update, Delete is the actual engine of almost every internal tool — everything else (dashboards, forms, tables) is a surface built on top of these four operations working correctly. Get this layer solid first; everything downstream depends on it.

## The Decision You're Actually Making

Not "how do we build CRUD." It's: **in what order do we build these four operations so that we always have something demoable, even if we run out of time before finishing all four?**

CRUD isn't equally important across all four letters for a typical internal tool demo — knowing the priority order protects you if time runs short.

## The Priority Order That Protects Your Demo

| Operation | Priority | Why |
|---|---|---|
| **Read** | Highest | Nothing else matters if you can't display data — this is also what makes seed data useful |
| **Create** | High | Needed to show the tool actually accepts new real input, not just pre-seeded data |
| **Update** | Medium-high | Usually the core "workflow" action (change status, assign) — often the most demo-critical of the four |
| **Delete** | Lowest | Rarely central to an internal tool's value story — build last, or stub it |

> ** Best Practice:** If you're running low on time, it's entirely acceptable to ship an MVP with a stubbed or missing Delete operation. Almost no internal tool demo depends on showing deletion working — prioritize Read, Create, and Update, which together tell the actual workflow story your PRD defined.

## Build Read First, Even Before Create

This might feel backwards, but it's the fastest path to a visibly working app.

```
1. Connect to your seeded database
2. Build the query and API route that fetches records
3. Render them in a basic table/list — no styling needed yet
4. Confirm this works BEFORE building the create form
```

> ** Tip:** Building Read first against your seed data gives you a working, visible screen almost immediately — this is motivating for the team and gives you something to demo even in a worst-case scenario where nothing else gets finished. Never let Create be the first thing you build; it's slower to get right and gives you nothing to look at until it works end to end.

## Designing Update Around Your Actual Workflow

For most internal tools, "Update" isn't a generic edit-any-field form — it's usually one specific, meaningful action from your workflow (change status, assign to someone).

- Identify the specific update action(s) your workflow actually requires (not "edit everything")
- Build a targeted control for that action (a status dropdown, an assign button) rather than a full edit form
- Confirm the update is reflected immediately in any list/dashboard view, not requiring a manual refresh

> **️ Warning:** Don't default to building a full "edit this record" form with every field editable if your actual workflow only requires changing status or assignment. A generic edit form takes longer to build and tests worse in a demo than a single, obvious "Mark Resolved" button that does exactly what the workflow needs.

## Validating Input Without Over-Building

Some validation matters even in a hackathon — mainly to prevent an embarrassing crash during a live demo, not to achieve production-grade robustness.

- Required fields are actually enforced (can't submit an empty title)
- Basic type checks exist where a wrong type would crash the app (a number field rejecting text)
- Clear, simple error messages exist for the most likely mistake a demo-time click could trigger

> **️ Warning:** Skipping all validation risks a live crash if you or a judge submits an empty or malformed form during the demo — this is one of the most visible, avoidable hackathon failures. You don't need comprehensive validation, just enough to prevent the specific inputs your demo path might realistically trigger.

## Use AI to Scaffold CRUD Fast, Correctly Ordered

**Prompt — CRUD Implementation in Priority Order**
```
Using this schema: [paste your database schema], build CRUD operations 
for [your core entity] in this priority order:
1. Read — fetch and display all records
2. Create — a form to add a new record, with required field validation
3. Update — specifically for [describe your actual workflow action, 
   e.g. "changing status" or "assigning to a user"], not a full edit form
4. Delete — basic implementation, lowest priority

Use [your stack from earlier]. Include basic validation to prevent 
crashes on empty or malformed input, but skip extensive error handling 
beyond that.
```

> ** Token Efficiency:** Request all four operations in one prompt, in priority order, rather than four separate prompts — this keeps the generated code consistent (same patterns, same file structure) and reduces the back-and-forth needed to make the pieces work together.

## Validate Before Moving On

- Read works reliably against your seeded data, in the actual UI, not just a database query
- Create enforces required fields and doesn't crash on empty submission
- Update targets the specific workflow action your tool needs, not a generic full-record edit
- Changes made via Update or Create are immediately visible without a manual page refresh
- Delete exists in at least a basic form, or is a deliberate, acknowledged gap — not an accidental one

## Common Mistakes

- Building Create before Read, delaying the first moment you have something visible to show
- A generic "edit everything" form when the workflow only needed a targeted status/assignment change
- No input validation at all, risking a live crash during the demo
- Spending equal time on all four operations instead of prioritizing what the demo actually needs
- Changes not reflecting immediately in the UI, making the tool feel broken even when the backend works

## Quick Reference

| Build in this order | Time investment | Common shortcut |
|---|---|---|
| 1. Read | Highest priority, build first | Basic table, no styling yet |
| 2. Create | High priority | Required-field validation only |
| 3. Update | Medium-high, workflow-specific | Targeted action, not full edit form |
| 4. Delete | Lowest priority | Basic implementation or deliberate stub |

## What's Next

With the core data operations working, the next module is Forms — refining the Create and Update interfaces specifically, so the actual input experience feels intentional rather than raw.
