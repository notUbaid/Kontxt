---
title: Forms
slug: forms
phase: Phase 3
mode: hackathon
projectType: internal-tool
estimatedTime: 15-20 min
---

# Forms

Forms are where a user actually puts information into your tool — and for an internal tool specifically, a clunky form is where real employees start quietly going back to their spreadsheet. This module is about making the Create and Update interfaces from the previous module feel intentional, not just functional.

## The Decision You're Actually Making

Not "how do we build a form." It's: **does this form ask for exactly what the workflow needs, in an order that matches how a real person would naturally fill it in — nothing more, nothing less?**

Every extra field in a form is friction. Every missing field is a workflow gap. Both cost you in a demo.

## Match the Form Fields to Your Actual Workflow, Not Your Schema

Your database schema may have more columns than a human should ever type into a form directly (IDs, timestamps, foreign keys set automatically).

| Schema column | Should it be a form field? |
|---|---|
| `title`, `description` | Yes — user-entered |
| `status` | Usually no on Create — default to a starting value; yes on Update, as a dedicated control |
| `created_by` | No — set automatically from the logged-in user |
| `created_at` | No — set automatically by the database |
| `assigned_to` | Maybe — depends on whether assignment happens at creation or later |

> **️ Warning:** Don't expose every database column as a form field just because it exists in the schema. Fields like `created_by` or `created_at` should never require manual input — auto-populate them server-side. A form that asks a user to fill in something the system already knows looks unfinished and invites bad data.

## Ordering Fields the Way a Person Actually Thinks

- Most important/identifying field first (title, name) — not alphabetical or schema order
- Required fields before optional ones
- Group related fields together (all the "what" fields, then all the "who/when" fields)

> ** Tip:** Field order in a form is a small detail that disproportionately affects how polished a tool feels. Putting `title` first and burying less important fields lower mirrors how someone naturally thinks about filling out the form — schema-order or alphabetical fields feel arbitrary and slightly off, even if users can't articulate why.

## Decision: Modal vs Dedicated Page for Forms

| Approach | Best for | Hackathon build time |
|---|---|---|
| Modal/dialog overlay | Quick create/edit actions that shouldn't interrupt the main view | Slightly more setup, but feels more polished |
| Dedicated page/route | Longer forms, or when you want a clean URL to link to | Simpler to build, sometimes feels heavier |

> ** Best Practice:** For a short create form (3-5 fields), a modal keeps the user in context and demos well — clicking "New Request," filling a short form, and seeing it appear in the list behind it is a satisfying, easy-to-follow sequence for a judge to watch. Reach for a dedicated page only if your form genuinely has many fields or sections.

## Validation That Actually Matters for a Demo

You don't need comprehensive validation — you need to prevent the specific failures likely to happen live.

- Required fields block submission with a clear, visible message (not a silent failure)
- Obvious type mismatches are caught (submitting text where a number is expected)
- The submit button gives feedback while submitting (disabled state, loading indicator) — prevents double-submission

> **️ Warning:** A form that silently does nothing when required fields are missing is one of the most confusing live-demo failures — you or a judge clicks submit, nothing visibly happens, and now you're debugging live instead of demoing. A simple, visible "Title is required" message costs almost no build time and prevents this specific failure mode.

## Making the Form Feel Connected to the Rest of the Tool

- After successful submission, the new/updated record appears immediately in the relevant table or dashboard
- The form clears or closes after success, giving clear confirmation the action worked
- Errors keep the user's already-entered data intact — don't clear the form on a failed submission

> ** Best Practice:** Confirm the loop closes visibly: submit the form, watch the new item appear in the list without a manual refresh. This single interaction — create something, immediately see it exist — is often the moment that makes a demo feel like a real, working tool rather than disconnected pieces.

## Use AI to Build a Focused Form Fast

**Prompt — Workflow-Matched Form Generation**
```
Build a [create/update] form for [entity] with these fields only: 
[list exactly the fields a human should type, excluding auto-populated 
ones like id/created_by/timestamps].

Requirements:
1. Field order: most important/identifying field first, required 
   before optional
2. Use a [modal/dedicated page] pattern
3. Required field validation with visible error messages, not silent 
   failures
4. Loading/disabled state on submit to prevent double-submission
5. On success, the new/updated record should appear immediately in 
   the existing list view without a manual refresh

Stack: [your stack from earlier modules]
```

> ** Token Efficiency:** Explicitly list which schema fields to exclude from the form (auto-populated ones) — without this, generated forms often naively expose every database column, and you'll spend a follow-up prompt removing fields that should never have been there.

## Validate Before Moving On

- Form fields match what a human should actually type, not every schema column
- Field order follows natural priority, not schema or alphabetical order
- Required field validation is visible and clear, not silent
- Submission gives clear feedback and prevents double-submission
- Successful submission is immediately visible in the connected table/dashboard

## Common Mistakes

- Exposing auto-populated fields (IDs, timestamps, created_by) as manual form inputs
- Field order that follows schema/alphabetical order instead of natural priority
- Silent validation failures that make the form look broken during a demo
- No loading state, allowing accidental double-submission
- Successful submissions that don't appear in connected views without a manual refresh

## Quick Reference

| Include as form fields | Exclude, auto-populate instead | Build for demo safety |
|---|---|---|
| Title, description, category | created_by, created_at, id | Visible required-field errors |
| Priority (if user-selectable) | updated_at | Disabled/loading submit state |
| Assignment (if set at creation) | Any system-derived value | Immediate list update on success |

## What's Next

With input handled well, the next module is Tables — building the display side that shows off all this data clearly, with sorting and readability that make the tool's core list view genuinely usable.
