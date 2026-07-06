---
title: AI Suitability
slug: ai-suitability
phase: Phase 1
mode: personal
projectType: ai tool
estimatedTime: 10-15 min
---

# AI Suitability

You ran the basic "why AI" test in Problem Definition. This module goes deeper, because there's a real difference between "AI could help here" and "AI is actually the right tool for this specific job, given its real characteristics." For a personal project, getting this wrong costs you something specific: time spent fighting a model to do something it's structurally bad at, when a simpler approach would have just worked.

---

## The Core Idea: AI Is Good at Some Things and Genuinely Bad at Others — Know Which Your Task Is

Language models are excellent at tasks involving understanding varied, unstructured input and producing flexible, context-appropriate output. They're genuinely unreliable at precise computation, perfect recall of specific facts not in their context, and tasks requiring guaranteed consistency every single time. Matching your task honestly to these strengths and weaknesses saves you from building around a fundamental mismatch.

> [!WARNING]
> A common personal-project trap: asking a model to do something requiring perfect, guaranteed accuracy (exact financial calculations, precise date math, retrieving a specific fact you need to be 100% certain about) when a model's actual reliability for that specific operation is good-but-not-guaranteed. If precision matters and you can compute or look it up directly, do that — reserve the model for the parts that genuinely benefit from its flexibility.

---

## Step 1: Sort Your Task Into Strength or Weakness Territory

**Decision Card — AI Strengths vs. Weaknesses, Concretely**

| Capability | AI Strength? | Example |
|---|---|---|
| Understanding varied phrasing/unstructured text | Strong | Parsing your own messy notes, varied receipt formats, free-form voice memos |
| Generating flexible, context-appropriate text | Strong | Drafting a summary, rephrasing something in your own voice, generating varied examples |
| Classifying ambiguous input into categories | Strong | Sorting expenses into categories from messy receipt text |
| Exact arithmetic, especially with many digits or steps | Weak | Don't have the model sum your monthly totals — compute that with code, even if the model extracted the individual numbers |
| Perfect recall of specific facts not provided in context | Weak | The model doesn't reliably "remember" things from outside what you give it in the prompt — don't rely on its general knowledge for facts specific to your situation |
| Guaranteed identical output every single time for the same input | Weak | Some variance is normal even with deterministic-leaning settings — don't build logic that assumes byte-identical repeatability |

---

## Step 2: Split Your Feature Into the AI Part and the Code Part

Most well-designed AI tools aren't "AI does everything" — they're a small amount of AI handling the genuinely hard, language-flexible part, surrounded by ordinary code handling everything precise and deterministic.

**Best Practice Card — The Right Split**

```
Example: Receipt tracker

AI's job: Read messy, varied receipt text (from OCR or a photo) and
          extract structured fields — store name, items, categories,
          amounts as text.

Code's job: Take those extracted amounts (as numbers, once extracted)
          and do the actual summing, monthly totals, category
          aggregation — exact arithmetic, done in code, not asked
          of the model.

The model handles "read this messy real-world text and figure out
the structure." Code handles "now do exact math with that structure."
```

> [!TIP]
> If you find yourself asking the model to both extract information *and* perform a precise calculation in the same step, split it into two steps: extraction (AI), then calculation (code). This single split resolves a large fraction of "the AI got the math wrong" frustrations in personal AI tools.

---

## Step 3: Decide How Much Accuracy Your Use Case Actually Needs

Not every personal use case needs the same reliability bar. A tool that drafts a casual summary for your own reading has a different acceptable error rate than one that tracks something you'll rely on for an actual decision (e.g., tax-relevant expense categorization).

> [!NOTE]
> Be honest with yourself about which category your project falls into. If the output matters enough that a wrong answer could cause a real problem (financial, medical, or otherwise consequential), build in a verification step where you personally review AI output before trusting it — don't let a personal project quietly become something you rely on uncritically just because it's convenient.

---

## Using AI to Evaluate Your Own Task's Fit

A genuinely useful exercise: describe your planned feature and have an AI assistant honestly flag where it's likely to be unreliable, before you've built around an assumption that doesn't hold.

**Prompt: Honest Suitability Check**

```
Here's my planned AI feature: [describe input, what you want the
AI to do, and what output you expect]

1. Identify which parts of this task are a strong fit for an LLM
   (language understanding, flexible generation, classification)
   versus which parts are a weaker fit (precise calculation, exact
   recall, guaranteed consistency).
2. If there's a weak-fit part, suggest how to split the task so that
   part is handled by regular code instead, with the AI handling
   only the strong-fit portion.
3. Be honest, not reassuring — if my whole idea has a fundamental
   reliability mismatch with what LLMs are actually good at, tell
   me directly rather than suggesting workarounds that paper over
   a real limitation.
```

> ** Why this prompt works**
> Explicitly requesting honesty over reassurance counters a real tendency for AI assistants to find an encouraging angle on whatever you've proposed — useful to override directly when you specifically need a candid assessment rather than validation. Asking for a concrete task split, not just a diagnosis, turns the suitability check into something immediately actionable for your next build step, rather than leaving you with a vague "well, it depends" answer.

**Token efficiency note:** This is a one-time check per feature, done before you start building it — not something to revisit repeatedly. If the split from Step 2 is clear, move forward and build; you don't need exhaustive back-and-forth confirming the same conclusion multiple times.

---

## Validating AI Suitability Before Moving to Design

- [ ] You've explicitly identified which part of your feature is the AI's job and which part is regular code's job
- [ ] Any precise calculation or exact-recall requirement has been moved out of the AI's responsibility and into deterministic code
- [ ] You've honestly assessed how much accuracy your use case actually needs, and whether a personal verification step is warranted for higher-stakes outputs
- [ ] If a fundamental mismatch was flagged, you've adjusted the approach rather than building around it and hoping it works out

---

## What's Next

Move to **Conversation Design** — shaping how you'll actually interact with this tool day to day, now that you know which parts are AI-driven and which are plain logic.
