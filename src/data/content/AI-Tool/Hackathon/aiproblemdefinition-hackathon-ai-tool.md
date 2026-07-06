---
title: Problem Definition
slug: problem-definition
phase: Phase 0
mode: hackathon
projectType: ai tool
estimatedTime: 10-15 min
---

# Problem Definition

Before model selection, before prompts, before any code — you need a problem narrow enough that AI is genuinely the right tool for it, and narrow enough to demo reliably in the time you have. This is the AI-tool-specific version of the Idea Definition step: same urgency, with one extra filter that matters more here than in other hackathon categories.

---

## The Core Idea: "We Used AI" Is Not a Problem Statement

A huge fraction of weak AI hackathon submissions start from the tool, not the problem — "let's build something with [model/API]" — and only afterward go looking for a problem to justify it. This produces demos that feel like a tech demo wearing a problem's clothing. Judges notice immediately when AI is decorative rather than load-bearing.

> [!WARNING]
> If you can describe your idea without mentioning AI at all, and it still sounds like a complete, useful product, then AI might not be central to what you're building — which is a real risk in an AI tool category specifically. Make sure the AI is doing something that's actually hard or impossible without it, not just automating something a simple form or lookup could do equally well.

---

## Step 1: Apply the "Why AI, Specifically" Test

For every candidate problem, ask explicitly: what is AI doing here that a deterministic, rule-based system couldn't do just as well? If you can't answer this clearly, the problem isn't actually suited to an AI tool yet — it's suited to a regular app that happens to use AI as a checkbox.

**Decision Card — Good Fit vs. Poor Fit for AI**

| Task | AI Fit | Why |
|---|---|---|
| Summarizing unstructured, varied text input | Strong fit | Genuinely requires language understanding, not just pattern matching on fixed fields |
| Generating a response that needs to adapt to open-ended user phrasing | Strong fit | Rule-based systems can't anticipate every phrasing |
| Looking up a fixed value from a known list | Poor fit | A simple database query does this better, faster, and more reliably than an LLM call |
| Calculating something with a deterministic formula | Poor fit | Don't ask a model to do math a function should do directly |
| Classifying messy, real-world input into flexible categories | Strong fit | Pattern recognition across varied input is exactly where LLMs add value over hardcoded rules |

> [!TIP]
> If your idea uses AI for the part where input is genuinely unpredictable or open-ended, and plain code for everything deterministic, you've found the right split. The best AI-tool hackathon projects are usually a small amount of AI doing something genuinely hard, surrounded by ordinary, reliable code doing everything else.

---

## Step 2: Find a Problem Specific Enough to Demo Reliably

A vague problem ("help people write better") produces inconsistent AI outputs that are hard to demo confidently, because the model has too much latitude to wander into a bad response. A narrow, specific problem ("turn a messy meeting transcript into three action items with owners") gives the model — and your prompt — much less room to go wrong live.

**Best Practice Card — Narrowing the Problem**

```
 Too broad: "An AI assistant that helps with productivity"
   (What input? What output? Too many possible failure modes to
   demo confidently in a few minutes.)

 Narrow enough: "Given a voice memo of a brainstorm, generate a
   structured list of action items, each tagged with urgency"
   (Specific input type, specific output structure, specific and
   demonstrable value — and narrow enough that you can write a
   prompt that reliably produces good results for this one task.)
```

---

## Step 3: Identify Who Actually Has This Problem, Briefly

Same discipline as a regular hackathon idea, applied quickly: name a specific kind of person who has this exact problem, even if briefly. This keeps your prompt design grounded later — knowing your real user's actual input style (a rushed freelancer's voice memo vs. a student's lecture notes) directly shapes what kind of messy, real input you should test your prompts against.

> [!NOTE]
> You don't need formal user research here. You need one sentence: "[specific type of person] who currently does [the painful manual version of this task]." That sentence will keep reappearing — in your PRD, in your prompt design, in your pitch.

---

## Using AI to Pressure-Test the Problem Itself

This is a genuinely good use of AI early — testing whether your candidate problem is actually a good fit for an AI solution, before you've invested any build time.

**Prompt: AI-Fit Pressure Test**

```
Here's my hackathon idea for an AI tool: [describe the problem and
your rough idea of how AI solves it]

1. Identify specifically what part of this requires AI/an LLM versus
   what could be done with plain, deterministic code. Be skeptical —
   don't assume AI is necessary just because I described it that way.
2. Is the problem narrow enough to demo reliably in a few minutes
   live, or is it broad enough that model output could vary widely
   and unpredictably? If too broad, suggest a narrower version of
   the same core idea.
3. Suggest one specific type of person who has this exact problem,
   and what their real input would actually look like (messy, casual,
   specific to their context) — not an idealized clean example.
```

> ** Why this prompt works**
> Explicitly asking the model to be skeptical about whether AI is actually necessary counters the natural pull toward justifying whatever idea you already described — without that instruction, the model tends to validate your framing rather than challenge it. Requesting a *real*, messy example input (not an idealized one) sets up your later prompt-engineering work to be tested against the kind of input you'll actually face live, not a clean best-case scenario.

**Token efficiency note:** Do this pressure test once, early, before any building starts. If the answer reveals your idea isn't actually AI-dependent or is too broad to demo reliably, that's far cheaper to learn now than after you've built around the wrong framing.

---

## Validating Your Problem Before Moving to the PRD

- [ ] You can state clearly what part of your solution genuinely requires AI, versus what's just regular code
- [ ] The problem is narrow enough that you can imagine a consistent, demoable output — not a wide-open creative task with unpredictable results
- [ ] You've named a specific type of person who has this problem, and what their real, messy input looks like
- [ ] If you removed the AI and replaced it with a hardcoded example, the demo would clearly feel broken or empty — confirming AI is load-bearing, not decorative

---

## What's Next

Move to **Target Users** — going one level deeper on who this is actually for, which will directly shape your conversation design and AI interaction flows in the next phase.
