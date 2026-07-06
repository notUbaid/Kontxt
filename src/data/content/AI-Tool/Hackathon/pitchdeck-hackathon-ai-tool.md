---
title: Pitch Deck
slug: pitch-deck
phase: Phase 5
mode: hackathon
projectType: ai tool
estimatedTime: 15-20 min
---

# Pitch Deck

Your tool works, fails gracefully, and feels intentional to use. Now you need a deck that gets a judge from "I don't know what this is" to "I understand exactly what this does and why it's good" in well under a minute of slides, before your live demo even starts. For an AI tool specifically, the deck has one extra job beyond a regular hackathon pitch: establishing, fast, that the AI is load-bearing — not decorative.

---

## The Core Idea: The Deck's Job Is to Set Up the Demo, Not Replace It

A hackathon pitch deck is short — often 3-5 slides — because the live demo is the actual proof. The deck's only real job is making sure the judge understands the problem and the approach clearly enough that the demo lands with full context, not blind. Don't try to convey everything in the deck; save the impressive part for the live moment you've spent the whole build hardening.

> ** Warning**
> Don't put your AI output's actual result on a slide as a screenshot and call that your demo. Judges have seen this pattern enough times to be skeptical of it — a screenshot can be cherry-picked or staged in a way a live run can't be. Show the result live, in the demo; use the deck to set up why that live moment matters.

---

## Step 1: Minimal Slide Structure for an AI Tool

**Decision Card — Slide Allocation (4-5 slides, typical hackathon time slot)**

| Slide | Purpose | AI-Tool-Specific Note |
|---|---|---|
| Title | Name, one-line description | Same as any hackathon deck |
| Problem | The specific pain, stated concretely | Connect directly to your Problem Definition's "why AI specifically" reasoning — briefly state what's hard about this without AI |
| Approach | What you built, briefly | Name the model/technique only if it's genuinely relevant context (e.g., "uses retrieval over your own documents") — don't pad this with technical detail a judge doesn't need yet |
| [Transition to live demo] | — | This is where your deck ends and your actual product takes over |
| Tech/what's next (often combined into one slide, after the demo) | Brief technical credibility + roadmap | Mention your failure-handling and reliability work briefly here — it's a real differentiator most teams skip, worth a single line |

---

## Step 2: Use the Problem Slide to Pre-Empt the "Why AI?" Skepticism

Judges evaluating AI tools specifically are primed to ask "could this just be a regular app?" Address this proactively, briefly, on your problem slide — not defensively, just clearly, using the same reasoning from your Problem Definition module's "why AI, specifically" test.

**Best Practice Card — Pre-Empting Skepticism**

```
 Problem slide says only: "Meeting notes are messy and hard to
   organize" (doesn't address why AI is the right tool)

 Problem slide adds one line: "...because the structure varies
   too much for fixed templates or simple rules to handle reliably"
   (directly answers "why not just a form" before anyone asks)
```

---

## Step 3: Keep Technical Detail Minimal and Save It for Questions

Most judges care more about the result and the experience than your specific model choice or prompt engineering approach — that detail matters far more in Q&A, where you can go as deep as asked, than on a slide everyone has to read in a few seconds. Resist the urge to show your architecture diagram or prompt structure on a slide; have it ready to discuss if asked.

> ** Tip**
> If you do mention your tech stack or model choice, one line is enough: "built on [model], with retrieval over [your data source]" — a single line of credibility, not a slide of architecture. Save deeper technical discussion (your failure handling, your prompt iteration process, your structured output validation) for genuine follow-up questions, where it'll actually be appreciated rather than skimmed past.

---

## Using AI to Tighten the Deck Fast

Same core approach as the general Pitch Deck module from other curricula — converting your narrative into slide-by-slide content quickly — with the AI-specific framing requirement made explicit.

**Prompt: AI Tool Pitch Deck Outline**

```
My AI tool: [problem from Problem Definition, approach from PRD]
Why AI specifically (not just a regular app): [your reasoning from
  the "why AI" test in Problem Definition]
What's genuinely differentiated about my build (e.g., failure
  handling, retrieval grounding, etc.): [brief list]

Generate a 4-5 slide outline for a hackathon pitch deck. Slide 2
(Problem) should briefly and naturally address why this needs AI,
not a regular app, without sounding defensive about it. Keep technical
detail minimal — one line maximum about the model/approach, saving
deeper detail for anticipated Q&A rather than the slides themselves.

Don't include a slide showing a screenshot of the AI's output — that
should be shown live in the demo, not on a slide.
```

> ** Why this prompt works**
> Explicitly requesting the "why AI" framing be naturally embedded rather than defensive keeps the deck from reading as if it's apologizing for using AI — a tone judges respond to less well than a confident, brief statement of why the approach fits the problem. The explicit exclusion of an output screenshot slide reinforces Step 1's warning directly in the generation step, preventing a common shortcut that undermines the live demo's credibility.

**Token efficiency note:** Generate this once your AI Failure States and full build are confirmed working — the deck should describe a tool that's actually finished and tested, not one you're still hoping will work. Drafting pitch content before the build is solid risks describing claims you haven't yet verified.

---

## Validating the Deck Before Your Slot

- [ ] The problem slide addresses "why AI" briefly and naturally, without sounding defensive
- [ ] No slide shows a screenshot of the AI's actual output — that's reserved for the live demo
- [ ] Technical detail is minimal on slides, with deeper detail ready (in your head, not necessarily on a slide) for Q&A
- [ ] The deck transitions cleanly into your live demo, rather than trying to explain everything before you even get there

---

## What's Next

Move to **Demo Script** — the literal, word-by-word plan for what you'll say and do during the live portion, building directly on the conversation script and failure-state rehearsal you've already completed.
