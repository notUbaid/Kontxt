---
title: Forms
slug: forms
phase: Phase 3
mode: personal
projectType: internal-tool
estimatedTime: 20-30 min
---

# Forms

Forms are where your CRUD layer meets an actual human. For internal tools, forms are also where most of the daily time-cost lives — if data entry is slow or error-prone, that friction repeats every single day someone uses the tool.

This module is about building forms that are fast to fill, hard to mess up, and don't duplicate validation logic you already wrote.

---

## Reuse Your Validation, Don't Rewrite It

You already defined valid shape for each entity in the CRUD module (Zod schema or equivalent). That same schema should drive your form — not a second, hand-written set of rules that can quietly drift out of sync with the first.

**The pattern:**

```
Zod schema (already exists) → Form validation → API/CRUD layer validation
```

Same schema, used twice. If a field's rules change, you change them once.

> ️ **Warning:** The most common form bug in AI-generated code is a form that validates differently than the backend — a form that "passes" client-side but gets rejected by the CRUD layer with a confusing error, or worse, a form that's stricter than the backend and blocks valid input. Shared schemas prevent this by construction.

---

## Choosing Field Types Deliberately

Every field on your form is a decision, not a default. For each field, ask:

| Question | Why it matters |
|---|---|
| Does this need a dropdown/select, or free text? | Enums in your schema should be selects, not text inputs — prevents invalid values before they're submitted |
| Does this field have a natural default? | Pre-filling reduces daily data-entry time — the single biggest UX win for internal tools |
| Is this field actually required? | Required-by-default is common in generated forms; check against your schema's actual NOT NULL constraints |
| Does order matter? | Group related fields together; put the fields used most often first |

>  **Tip:** For an internal tool you'll use daily, shaving 3 seconds off a form by pre-filling a sensible default (today's date, your own user ID, the most common status) adds up fast. Optimize this more aggressively than you would for a public-facing product.

---

## AI Prompt: Generate the Form

Give the AI your existing schema, not a fresh description — this is what keeps validation in sync.

```
Build a form for creating/editing a [Entity] record.

Here's the validation schema already in use for this entity:
[paste your Zod/validation schema]

Requirements:
- Reuse this exact schema for form validation, don't redefine rules
- Use [select/dropdown] for these enum fields: [list them]
- Pre-fill these fields with sensible defaults: [list field + default, e.g. "status: draft", "created_by: current user"]
- Show inline validation errors per field, not just on submit
- Disable the submit button while the request is in flight, and show a clear loading state
- On success, [describe what should happen — redirect, show a toast, clear the form]
- On failure, show the actual validation error, not a generic "something went wrong"
```

---

## Validating the Generated Form

-  **Confirm it imports and uses your actual schema**, not a redefined inline version — check the AI didn't paraphrase your validation rules into slightly different ones
-  **Test the failure path, not just the happy path** — submit invalid data and confirm the error message is specific and useful
-  **Check for a double-submit bug** — click submit twice quickly and confirm it doesn't create two records
-  **Confirm loading and error states are visually distinct** — a form that looks "stuck" with no feedback is a common generated-code gap
-  **Check pre-filled defaults are actually correct**, not placeholder text mistaken for a real default value

> ️ **Warning:** Double-submission is the single most common internal-tool bug that produces duplicate records. It's caused by a missing "disable while submitting" state, and it's easy to miss because it only shows up when someone clicks fast — which, for a tool used daily, will eventually happen.

---

## Edit Forms Are Not the Same as Create Forms

It's tempting to reuse one form component for both create and edit. That's fine — but two things need explicit handling:

1. **The form needs to load existing data** into its initial state — confirm this happens before the user sees the form, not as a flash of empty fields that then populate.
2. **Some fields should be locked on edit** that were editable on create (e.g., an ID, a "created by" field) — decide this per field, don't assume the AI got it right by default.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Redefining validation rules in the form instead of reusing the schema | Rules drift apart over time; a fix in one place doesn't fix the other |
| No disabled state during submission | Leads to duplicate records from double-clicks |
| Generic error messages ("Something went wrong") | Makes debugging your own data-entry mistakes slower every single day |
| Free-text fields for enum values | Invalid values slip through and break filters/reports later |
| Not pre-filling obvious defaults | Adds friction to a form you'll fill out repeatedly |

---

## Before You Move On — Checklist

- [ ] The form uses the same validation schema as the CRUD/backend layer
- [ ] Enum fields are selects/dropdowns, not free text
- [ ] Sensible fields are pre-filled with defaults
- [ ] Submit button disables during the request — tested by double-clicking
- [ ] Validation errors are specific and shown inline, not just generic on-submit messages
- [ ] Edit forms correctly load and display existing data before the user interacts with them

---

## What's Next

With reliable create/edit forms in place, the next step is displaying and interacting with your data at scale — tables.
