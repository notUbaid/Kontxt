---
title: Process Mapping
slug: process-mapping
phase: Phase 0
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Process Mapping

You already have a written, step-by-step version of your workflow. This module turns it into a visual map — because branches, loops, and decision points are much easier to spot as a diagram than as a list.

You're not building a formal flowchart for a stakeholder review. You're building a working sketch that will directly shape your database schema and screens in later phases.

---

## Why a List Isn't Enough

A numbered list assumes your process is a straight line: step 1, then step 2, then step 3. Almost no real workflow is actually a straight line. It branches ("if the client is a repeat customer...") and it loops ("check again every few days until paid"). Those branches are exactly the parts that get missed when you go straight from list to code.

> **Rule of thumb**
> If your process map has zero branches, look again. Real workflows almost always have at least one "it depends" moment — you may just not have written it down yet.

---

## The Three Building Blocks

You only need three shapes to map almost any internal-tool workflow:

| Shape | Meaning | Example |
|---|---|---|
| **Rectangle** | An action or step | "Log invoice amount" |
| **Diamond** | A decision point | "Is client a repeat customer?" |
| **Rounded rectangle** | A start or end state | "Invoice sent" / "Payment received" |

You can sketch this on paper, in a notes app, or with a simple text-based diagram like the one below. The tool doesn't matter — the clarity does.

**Worked example — freelance invoice tracking:**

```
[Invoice sent] 
      ↓
Log amount + due date
      ↓
 <Repeat client?> 
   /          \
 Yes           No
  ↓             ↓
Skip deposit   Request deposit
step           ↓
  \            /
   \          /
      ↓
Wait for payment
      ↓
 <Payment received by due date?>
   /              \
 Yes               No
  ↓                 ↓
Mark paid      Send follow-up
  ↓                 ↓
[Done]         (loop back to "wait")
```

Notice the loop at the bottom — "send follow-up" doesn't end the process, it sends you back into a waiting state. Loops like this are easy to miss in a written list and easy to spot in a diagram.

---

## Mark the Points Where the Tool Will Actually Help

Not every step deserves automation. Walk your map and mark each rectangle with one of three labels:

- ** Automate** — this step is repetitive, error-prone, or frequently forgotten
- ** Assist** — the tool can surface information, but a human still decides
- ** Leave alone** — this step is fine as-is; don't build for it

> **Example marking**
- Log amount + due date →  Automate (currently manual entry, error-prone)
- Repeat client? →  Assist (tool can flag it, you still confirm)
- Send follow-up →  Automate (this is the step you currently forget)
- Wait for payment →  Leave alone (nothing to build here — it's just time passing)

This labeling does real work: it stops you from building a screen for every single step, which is the single most common way personal internal tools become bloated and never ship.

---

## Decision Points Deserve Extra Attention

Every diamond in your map represents a business rule your tool will eventually need to encode. Right now, write down the actual rule in plain language — you'll formalize it later in Phase 1 (Business Rules).

> **Best practice**
> For each decision point, write: "Right now, I decide this by ___." If your honest answer is "gut feeling" or "I don't really have a consistent rule," that's valuable information — it means this decision point needs a real rule defined before it can be automated, not just digitized.

---

## Using AI to Stress-Test the Map

> **Copy this prompt**
> ```
> Here is my process map for [problem], described as a sequence of
> steps, decisions, and loops:
>
> [paste your map]
>
> Review it as a systems thinker would:
> 1. Are there any missing branches — edge cases this map doesn't
>    account for? (e.g. what happens if something fails, is cancelled,
>    or needs to be undone?)
> 2. Are there any decision points where the rule I described is
>    actually ambiguous?
> 3. Is there a loop or repeated step I might be under-representing?
>
> Don't suggest features or a tech stack — just pressure-test the
> map itself.
> ```

> **Watch out for premature completeness**
> It's tempting to map every conceivable edge case, including ones you've hit once in two years. Map what actually happens regularly. Rare exceptions can stay manual — that's a legitimate design decision, not a gap.

---

## What You Should Have Now

- A visual (or text-based) map of your workflow, including branches and loops
- Every decision point labeled with its actual current rule — even if that rule is "it depends"
- Every step marked  Automate,  Assist, or  Leave alone

This map — specifically the  and  steps — is what the next module, Existing Pain Points, will rank by impact to decide what your tool should actually tackle first.
