---
title: Forms Design
slug: forms-design
phase: Phase 1
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Forms Design

Your wireframes gave every screen a rough shape. Forms — the screens where you actually enter data — deserve a closer look, because they're where most personal internal tools quietly fail: friction here means you stop entering data, and a tool with stale data is a tool you stop trusting.

---

## The Real Cost of a Bad Form

A form isn't just a UI element. It's the toll you pay every single time you want to use the tool for its core purpose. If that toll is too high, you'll skip it "just this once" — and once becomes the habit.

> **Rule of thumb**
> If entering one record takes longer than the manual process it's replacing, you've failed the actual goal of Phase 0, even if the tool looks polished.

---

## Every Field Needs to Justify Itself

Go through your Add Invoice Form (or equivalent) field by field. For each one, trace it back to a requirement or business rule from earlier modules.

| Field | Traces back to |
|---|---|
| Client name | Requirement: identify who owes you |
| Amount | Requirement: track what's owed |
| Due date | Business rule: overdue calculation depends on this |
| ~~Category~~ | *(No traceable requirement — cut)* |

> **Best practice**
> If you can't point to a specific requirement or rule that needs a field, remove it. Every optional field you add is a small tax on every future data-entry session, forever.

---

## Order Fields by How You'd Naturally Think

Field order should follow how the information occurs to you in real life, not alphabetical order or database column order. This is a small detail that meaningfully affects how fast the form feels.

> **Example**
> When you think about a new invoice, you probably think "who" before "how much" before "when." Order the form: Client → Amount → Due Date. If your form asks for due date first, you'll pause every time to reorder your thoughts to match the screen instead of the other way around.

---

## Defaults Save More Time Than Clever Features

For a personal tool, sensible defaults often save more real time than any amount of visual polish. Look at every field and ask if a smart default removes a step.

- Can due date default to "30 days from today," with the option to change it?
- Can any field be pre-filled based on the last entry (e.g., last-used client)?
- Is there a field that's almost always the same value — could it default instead of requiring input every time?

> **Example**
> If most of your invoices use 30-day payment terms, defaulting due date to "today + 30" turns a required decision into an optional override — you only type something different on the exceptions.

---

## Validation Should Match Your Actual Business Rules

Go back to your formalized Business Rules module and check: does every rule that applies to form input actually get enforced here, using the exact boundary conditions you already decided?

**Worked example:**

| Field | Rule from Business Rules module | Validation |
|---|---|---|
| Amount | Must be greater than $0 | Reject 0 or negative values |
| Due date | Can be in the past (retroactive entries allowed) | No restriction on past dates |

> **Watch out for over-validating**
> It's tempting to add strict validation "to be safe" — but for a single-user personal tool, overly strict rules just create friction for yourself with no one else to protect against. Validate only what you actually decided matters in Business Rules; don't invent new restrictions here.

---

## Design the Error State for Each Field, Briefly

You'll cover error states more broadly in a later module, but forms deserve a specific note now: what happens when a required field is left blank, or a value fails validation?

> **Minimum viable error handling**
> "Amount is required" appearing next to the field, in a color that's clearly different from normal text, the moment you try to save. That's enough for a personal tool — you don't need animated error banners or multi-step validation summaries.

---

## Using AI to Review Your Form Design

> **Copy this prompt**
> ```
> Here's my form design for [screen name]:
>
> Fields: [list each field, in order]
> Business rules affecting this form: [paste relevant rules]
>
> Review it:
> 1. Does every field trace back to an actual requirement or rule?
>    Flag any that don't.
> 2. Is the field order aligned with how someone would naturally
>    think through this data, or does it feel arbitrary?
> 3. Where would a sensible default save a step, based on the most
>    common case for this data?
> 4. Does validation match my stated business rules exactly — not
>    stricter, not looser?
> ```

---

## What You Should Have Now

- Every field in your primary form traced to a real requirement or rule
- Fields ordered to match natural thought, not arbitrary structure
- At least one sensible default identified, if applicable
- Validation rules matching your Business Rules module exactly, including boundary conditions
- A minimal error-state note for required or invalid fields

With your core form refined, the next module — Table UX — covers how the data you've just designed entry for should actually be displayed, sorted, and scanned once it exists.
