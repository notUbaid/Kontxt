---
title: Pitch Deck
slug: pitch-deck
phase: Phase 6
mode: production
projectType: saas
estimatedTime: 25-30 min
---

# Pitch Deck

The previous module got your narrative right — the argument, the evidence, the audience-specific framing. This module is about the artifact itself: the actual slides. A pitch deck fails for one of two reasons, and they're independent of each other. Either the *story* is weak (covered in Presentation Prep), or the *story is good but the slides obscure it* — which is what this module prevents.

A common, expensive mistake: spending all your prep time on the narrative, then building slides in the last hour, dense with text, that bury the argument you just spent so much care constructing.

---

## The Core Idea: One Slide, One Idea

The single rule that fixes most bad decks: **every slide should make exactly one point, statable in a sentence, with everything on the slide supporting that one point.**

If you can't summarize a slide's purpose in one sentence, it's actually two slides trying to share space, and the audience will leave with neither point landing clearly.

> ** Warning**
> The most common deck failure isn't bad design — it's slides that try to communicate three ideas at once because cutting content feels like losing information. It isn't. It's making the one idea that matters actually visible instead of competing with two others for attention.

---

## Structure: Map Your Narrative Skeleton to Slides

If you completed the Presentation Prep module, you already have the five-part skeleton (Problem, Why Now, Solution, Evidence, What's Next). Each section typically becomes 1-3 slides, not one slide each — evidence in particular usually needs more than one slide to land properly.

**Decision Card — Typical Slide Allocation (10-12 slide investor deck)**

| Section | Slides | Purpose |
|---|---|---|
| Title | 1 | Company name, one-line description, nothing else |
| Problem | 1 | The concrete pain, stated specifically, ideally with a number |
| Why Now | 1 | What changed that makes this solvable today |
| Solution | 1-2 | What you built, shown rather than described where possible |
| Evidence/Traction | 2-3 | Retention, growth, or usage data — your strongest, most defensible numbers |
| Market | 1 | Sized specifically to your actual segment, not an inflated top-down number |
| Business model | 1 | How you make money, simply stated |
| Roadmap/Ask | 1 | What's next, and what you're asking for from this specific audience |

A customer-facing deck or internal team deck reshapes this allocation — more evidence and security/reliability slides for an enterprise buyer, more roadmap and tradeoff transparency for an internal team. Match the allocation to the audience-driven content table from the Presentation Prep module.

---

## Step 1: One Idea Per Slide, Stated as a Sentence

Before designing anything visually, write the takeaway sentence for every slide first — literally type it out as a working title.

**Best Practice Card — Sentence-First Slide Drafting**

```
 Slide titled: "Traction"
   (Vague — what about traction? Growth? Retention? Revenue?)

 Slide titled: "Retention has flattened at 35% — evidence of
   product-market fit in our core segment"
   (Specific, makes the actual claim, the chart that follows exists
   only to support this one sentence)
```

This single discipline — writing the claim before the visual — is what separates a deck that argues something from a deck that just displays data and hopes the audience draws the right conclusion themselves.

---

## Step 2: Design for the Room, Not for Reading

Pitch decks are usually *presented*, with you talking, not handed out as a document to be read silently. This changes what good slide design looks like.

- **Minimize text.** If your slide has enough text to read silently and understand without you speaking, your slides are doing the talking instead of you — and the audience will read ahead instead of listening.
- **One strong visual per slide** — a chart, a product screenshot, a simple diagram. Text-only slides are the least memorable format available to you.
- **Large numbers for key stats.** A retention or growth number that matters should be the most visually dominant element on its slide, not buried in a sentence.
- **Consistent visual language throughout** — same fonts, same color logic, same chart style. Inconsistency reads as rushed even when the content is strong.

> ** Tip**
> If you're sending the deck to be read *without* you presenting (common for investor decks reviewed asynchronously), you need slightly more on-slide text than a deck you'll present live — but the one-idea-per-slide discipline still applies. Add a few extra body sentences for clarity, not extra ideas competing for the same slide.

---

## Step 3: Make the Evidence Slides Actually Defensible

This is where Presentation Prep's honesty discipline becomes visually concrete. Every chart needs a clear, statable definition behind its axes and labels.

- [ ] Every chart's metric is defined precisely enough that a skeptical viewer could ask "what exactly counts as X?" and you'd have a one-sentence answer ready
- [ ] No chart implies a trend from too small a sample (see the Product Analytics module's caution on small-n noise) — if you must show early data, label it as early and say so
- [ ] Comparisons (to competitors, to benchmarks) are sourced, not asserted
- [ ] You are not showing a vanity metric dressed up as a meaningful one — total signups without activation context, page views without conversion context

---

## Using AI to Build and Tighten the Deck

AI is effective at converting your narrative skeleton into slide-by-slide content, and at ruthlessly cutting text down to the one-idea-per-slide standard. It's not effective at knowing what looks good visually in your specific brand, or at verifying your numbers — those stay yours to check.

**Prompt: Convert Narrative to Slide-by-Slide Content**

```
Here is my presentation narrative from the Presentation Prep stage:

Problem: [your stated problem]
Why now: [your stated timing argument]
Solution: [brief description]
Evidence: [your actual metrics/data]
What's next: [your roadmap framing]
Audience: [investor / customer / internal team / etc.]

Break this into a slide-by-slide outline. For each slide:
1. State the one-sentence takeaway (this becomes the working title)
2. Suggest what should be on the slide (chart, stat callout, diagram,
   short text) to support that one sentence — nothing more
3. Flag if any of my source material is trying to make more than one
   point, and suggest how to split it across slides

Do not write full paragraphs of slide body text. Keep every slide's
content sparse enough to be said aloud, not read silently.
```

> ** Why this prompt works**
> Requiring a one-sentence takeaway per slide directly enforces the Step 1 discipline at the outline stage, before any visual design happens — catching multi-idea slides while they're still cheap to split. The instruction against full paragraphs keeps the model from defaulting to dense, document-style slide text, which is the most common way AI-assisted deck drafts end up overloaded.

**Token efficiency note:** Do this conversion once, from your completed Presentation Prep narrative, rather than iterating slide-by-slide in separate prompts. Like the narrative stress test in the previous module, the value here comes from seeing the whole outline at once — checking pacing and idea-density across the full deck, not optimizing individual slides in isolation.

---

## Validating the Final Deck

- [ ] Every slide's one-sentence takeaway is written down somewhere (even just your own notes) and the slide visually supports that sentence and nothing else
- [ ] You could present the entire deck without reading any slide's text aloud verbatim — the slides support your talking, they don't replace it
- [ ] Every number on every slide is one you could defend if asked where it came from
- [ ] The deck is allocated toward your strongest, most defensible section (usually evidence/traction), not evenly spread across all sections regardless of strength

> ** Best Practice**
> Present the deck out loud to one honest person before the real audience sees it — not to get design feedback, but to find the slide where you stumble or over-explain. That's almost always the slide trying to carry two ideas at once.

---

## Quick Reference: Pitch Deck Discipline

1. Write the one-sentence takeaway for every slide before designing it
2. Allocate slide count toward your strongest evidence, not evenly
3. Minimize on-slide text — let the visual and your voice carry the point
4. Verify every number is defensible, not just visually impressive
5. Test the deck out loud before the real presentation, watching for slides carrying more than one idea

---

## Closing Note

This completes the Phase 6 — Growth curriculum. You've moved from raw event data, through retention and feedback, into scaling, marketing, and roadmap discipline, and finally into communicating all of it clearly. The same core habit threads through every module in this phase: ground every decision in real evidence, label hypotheses as hypotheses, and use AI to analyze and draft — never to replace your own judgment about what's actually true.
