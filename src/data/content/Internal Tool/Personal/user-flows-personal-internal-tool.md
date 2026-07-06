---
title: User Flows
slug: user-flows
phase: Phase 1
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# User Flows

Your PRD has a Core User Flow paragraph. This module breaks that paragraph into an actual screen-by-screen path — the specific sequence of views and taps that gets you from opening the tool to solving your pain point.

This is the bridge between "I know what the tool should do" and "I know what to actually design and build."

---

## Why a Paragraph Isn't Enough Anymore

Your PRD flow reads naturally as prose: "I open the tool, see a list, tap an invoice, mark it paid." That's the right level of detail for a PRD. It's the wrong level of detail for design — prose hides the actual number of screens, states, and clicks involved.

> **Rule of thumb**
> If you can't count the exact number of taps between "open the tool" and "task complete," you don't have a user flow yet — you have a summary of one.

---

## Break the Flow Into Discrete Screens

Take your Core User Flow paragraph and convert every distinct "view" into a labeled screen. Number them in sequence.

**Worked example — from the invoice tracker PRD:**

```
1. [Invoice List] — opens by default, overdue items visually flagged
      ↓ (tap an invoice)
2. [Invoice Detail] — shows client, amount, due date, status
      ↓ (tap "Mark Paid")
3. [Invoice List] — same screen, item now shows as paid
```

Notice this flow only needs two unique screens. That's a good sign for an MVP — the fewer screens required to complete the core task, the less there is to design, build, and maintain.

---

## Map the "Add New" Path Separately

Almost every internal tool has (at least) two core flows: one for *reviewing* existing data, and one for *adding* new data. Map both — they often reveal different screens or steps than the primary flow suggests.

**Worked example:**

```
1. [Invoice List]
      ↓ (tap "+ Add Invoice")
2. [Add Invoice Form] — client name, amount, due date
      ↓ (tap "Save")
3. [Invoice List] — new item now appears, sorted correctly
```

> **Tip callout**
> If your "add new" flow requires more than 3-4 fields or multiple screens, revisit your requirements — a personal tool's entry flow should be fast enough that you'll actually use it in the moment, not put it off until later.

---

## Identify Decision Points Within the Flow

Just like your Phase 0 process map had branches, your user flow will too — places where what happens next depends on a condition. Mark these explicitly; they'll become real logic in Phase 3.

**Worked example:**

```
2. [Invoice Detail]
      ↓
   <Is invoice overdue by 7+ days?>
      /                    \
    Yes                     No
     ↓                       ↓
Show red "Overdue"      Show normal
badge                   status
```

Every diamond here is a rule your interface needs to visually or functionally express — not just a backend calculation hidden from view.

---

## Don't Forget the Empty and Error Paths (Just Note Them)

You don't need to fully design these yet — that's Phase 1's Empty States and Error States modules — but flag where they exist in your flow now, so nothing gets forgotten later.

- What does the Invoice List look like with zero invoices?
- What happens if someone tries to save an invoice with no due date?
- What does the flow look like the very first time the tool is opened?

> **Example note to leave for later**
> "Invoice List — needs an empty state for zero invoices. Revisit in Empty States module."

---

## Keep the Flow as Linear as Your Problem Allows

Personal internal tools benefit enormously from flows that avoid unnecessary branching. Every extra path is extra code, extra testing, and extra maintenance for a tool only you will use.

> **Best practice**
> Before adding a branch to your flow, ask: "Does this branch exist because the problem genuinely requires it, or because it would be 'nice to handle'?" If it's the latter, defer it — the same MVP discipline from Phase 0 applies here.

---

## Using AI to Turn Your PRD Flow Into a Screen Map

> **Copy this prompt**
> ```
> Here's the Core User Flow from my PRD:
>
> [paste the paragraph]
>
> Break this into:
> 1. A numbered list of distinct screens, in sequence
> 2. Any decision points within the flow, and what determines each
>    branch
> 3. Any obvious "add new" or secondary flow implied by this that
>    I haven't mapped yet
> 4. A flag for any empty, first-use, or error states this flow will
>    need — just note them, don't design them yet
>
> Keep the number of screens as small as possible while still fully
> covering my PRD's in-scope requirements.
> ```

---

## What You Should Have Now

- A numbered, screen-by-screen map of your primary flow (viewing/using data)
- A separate mapped flow for adding new data
- Decision points within the flow marked explicitly
- A short list of empty/error/first-use states flagged for later modules

These screens are exactly what the next module, Business Process Mapping, will connect back to your underlying process — making sure the interface you're designing actually matches how the work really happens.
