---
title: Trust & Transparency
slug: trust-and-transparency
phase: Phase 1
mode: hackathon
projectType: ai tool
estimatedTime: 10-15 min
---

# Trust & Transparency

An AI output that just appears, with no indication of how it got there, feels suspicious even when it's correct — to users, and especially to judges who are actively evaluating whether your tool actually works or is faking it. This module is about the small amount of design work that makes your AI's output feel credible rather than magical-and-unverifiable, which matters disproportionately in a judged setting.

---

## The Core Idea: Judges Actively Distrust AI Output They Can't Verify

A judge watching an AI demo isn't just asking "is this impressive?" — they're often also asking, consciously or not, "is this real, or is this faked/cherry-picked?" Anything you do to make the output's basis visible — what it's based on, how confident it is, what it didn't have enough information to do — directly counters that skepticism, and is usually cheap to add.

> [!WARNING]
> An AI tool that just produces a confident-looking final answer with zero indication of its basis is more likely to trigger judge skepticism, not less — paradoxically, more visible "showing of work" often increases perceived credibility even though it adds complexity to the screen. Polish and transparency aren't in tension here; a small amount of transparency is itself a polish detail.

---

## Step 1: Show What the Output Is Based On

If your AI generates a result from some input (a transcript, a document, retrieved context), showing a trace back to that source — even briefly — makes the output feel grounded rather than conjured.

**Best Practice Card — Lightweight Grounding**

```
 Output appears with no connection to source visible: just a
   clean list of "action items," no indication where they came from

 Each action item links back to or briefly quotes the relevant
   part of the input it was extracted from — e.g., a small expandable
   "from: '...we really need to follow up with...'" under each item

This doesn't need to be elaborate. Even a simple "based on your
notes above" framing line does real work here.
```

---

## Step 2: Communicate Confidence or Uncertainty Honestly, Where It's Cheap to Do

You don't need a full confidence-scoring system. You do need to avoid presenting every output with identical, maximum confidence when some parts are clearly more certain than others — this is both more honest and, counterintuitively, more impressive, because it signals the system understands its own limitations.

> [!TIP]
> If your AI feature has any inherently uncertain inference (e.g., inferred urgency, inferred sentiment, inferred categorization not explicitly stated by the user), a small, honest qualifier — "inferred" or a subtle visual distinction from explicitly-stated information — costs very little to add and meaningfully increases perceived trustworthiness. Recall the PRD module's example: "urgency is inferred, not stated explicitly" was written into the spec for exactly this reason.

---

## Step 3: Show, Don't Just Tell, When the AI Doesn't Have Enough Information

Connecting back to the empty/null result state from AI Interaction Flows: when there's genuinely nothing good to extract or generate, say so plainly rather than fabricating a plausible-looking but empty result. A model that visibly says "I didn't find clear action items in this" is more trustworthy than one that always produces *something*, because the latter raises the question of whether it's fabricating output even when there's nothing real to extract.

> [!WARNING]
> Never let your prompt or your UI paper over a genuinely empty or low-confidence result with a fabricated-looking placeholder just to avoid showing "nothing." A judge who notices a result that seems made up — even once — will start doubting everything else your tool showed them.

---

## Using AI to Design the Transparency Layer

AI is useful for suggesting where transparency cues add the most value relative to your specific feature, since not every AI feature needs the same treatment — some genuinely don't need much, and over-adding transparency UI everywhere can clutter a simple flow.

**Prompt: Where Transparency Actually Helps Here**

```
My AI feature: [input/output spec from PRD]
My conversation flow: [from Conversation Design / AI Interaction Flows]

For this specific feature, suggest:
1. Whether showing a trace back to source input would meaningfully
   increase trust here, or whether it'd just add clutter for a task
   this simple — be honest if the answer is "not really needed"
2. Any specific inferred/uncertain element in my output that would
   benefit from an honest "inferred" qualifier
3. The simplest possible way to surface a genuinely empty/low-
   confidence result, without it looking like a broken feature

Keep suggestions minimal — I'm not building a full explainability
system, just enough to feel credible in a brief live demo.
```

> ** Why this prompt works**
> Explicitly allowing "not really needed" as a valid answer prevents the model from suggesting transparency features by default just because the category exists — some genuinely simple features don't need elaborate sourcing UI, and forcing it in adds unnecessary build time. Scoping the request to "minimal" and "brief live demo" keeps the output proportionate to a hackathon timeline rather than describing a comprehensive explainability system you don't have time to build.

**Token efficiency note:** This is a quick, single-pass design decision — get a clear answer on what (if anything) to add, implement it alongside your core feature build in the next phase, and don't revisit it repeatedly. Over-engineering the transparency layer costs time better spent on your core wow moment.

---

## Validating the Trust Layer

- [ ] The output has some visible connection back to its source input, even if minimal
- [ ] Any inferred (not explicitly stated) element is honestly marked as such, where that's cheap to do
- [ ] A genuinely empty or low-confidence result is shown plainly, not papered over with a fabricated-looking placeholder
- [ ] The transparency additions are proportionate to the feature's complexity — not over-built relative to the time you have

---

## What's Next

With Phase 1 complete, move to **Phase 2**, starting with **Model Selection** — choosing the actual model that powers everything you've just designed, matched to your specific task and time constraints.
