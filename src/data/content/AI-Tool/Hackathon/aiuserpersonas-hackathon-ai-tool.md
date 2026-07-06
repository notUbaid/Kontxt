---
title: Target Users
slug: target-users
phase: Phase 0
mode: hackathon
projectType: ai tool
estimatedTime: 10 min
---

# Target Users

You named a specific type of person briefly in the last module. This module goes one level deeper — not into formal persona-building, but into the specific details about your user that will directly shape how you design prompts, conversation flow, and failure handling later. For an AI tool, knowing your user's real input style matters more than it does for most other hackathon categories, because the model's output quality depends heavily on what it's actually fed.

---

## The Core Idea: For an AI Tool, "Who's the User" Really Means "What Does Their Real Input Look Like"

In a typical web app, knowing your user mostly shapes UI decisions. In an AI tool, it shapes something more fundamental: what kind of text, voice, or data your model will actually receive, and how messy, ambiguous, or context-dependent that input will realistically be. Get this wrong, and your prompt — tuned against a clean example you imagined — breaks the moment it meets real input shaped differently than you expected.

> ** Warning**
> A common AI-tool hackathon mistake: designing and testing your prompt against tidy, well-formed example input that doesn't resemble what your actual target user would realistically provide. A rushed freelancer's voice memo has false starts, filler words, and tangents. A student's lecture notes have abbreviations and incomplete sentences. If you only test against clean input, your live demo is at risk the moment a judge's real, messier input (or even your own nervous, off-script demo input) doesn't match what you tuned for.

---

## Step 1: Describe Your User's Real Input, Concretely

Skip generic persona attributes (age, job title, goals) unless they directly affect input style. Focus specifically on: what does this person's actual raw input look like, in their own words, with their own habits?

**Best Practice Card — Concrete Input Description**

```
 Generic persona: "Sarah, 28, busy marketing manager, wants to
   save time"

 Input-focused description: "A freelancer recording a voice memo
   while walking, thinking out loud, restarting sentences, mentioning
   3 unrelated tasks in one breath, expecting the app to figure out
   which parts matter"

The second version tells you something directly useful: your prompt
needs to handle disfluent speech, tangents, and implicit prioritization
— not just clean, complete sentences.
```

---

## Step 2: Identify the Range, Not Just the Average Case

Your live demo will likely use one carefully chosen input. But your prompt needs to be at least reasonably robust to the range of inputs a real target user would provide — otherwise the first time someone other than you tries it (a judge asking to test it themselves, which happens more often in AI tool categories than others) it may visibly fail.

**Decision Card — Input Range to Consider**

| Input Variation | Why It Matters |
|---|---|
| Short vs. long input | Does your prompt assume a certain length? Test both. |
| Clear vs. ambiguous phrasing | Real users are often vague — does your system ask for clarification or guess silently? |
| On-topic vs. slightly off-topic tangents | Real speech/text wanders — does your prompt extract the relevant parts or get derailed? |
| Different tones (formal vs. casual) | If your tool serves a broad user base, test more than one register |

You don't need exhaustive coverage — you need to have tried at least one input at each extreme so you're not surprised live.

---

## Step 3: Connect This Directly to Your Demo Script Choice

The example input you choose for your actual live demo should be representative of your real target user, not a cherry-picked best case that happens to make your AI look unrealistically polished. A demo that's too clean can backfire if a judge then tries their own input and sees a meaningfully worse result — the gap itself damages credibility more than a moderately good result would have.

> ** Tip**
> Pick a demo input that's good but believably real — the kind of input your actual target user would plausibly provide on a normal day, not their best possible day. This protects you if a judge wants to try it themselves with their own input, since the gap between your demo and their attempt will be smaller.

---

## Using AI to Generate Realistic Test Input

AI is genuinely useful here for a specific, narrow task: generating varied, realistic-sounding sample inputs that match your target user's described style, so you can stress-test your prompt against more than just the one example you'd naturally think of.

**Prompt: Generate Realistic Test Inputs**

```
My target user: [your concrete input-focused description from Step 1]

Generate 5 example inputs this person might realistically provide,
varying in:
- Length (short and long)
- Clarity (one clearly stated, one more ambiguous/rambling)
- Whether it includes an irrelevant tangent mixed in

Make these sound like real, slightly messy human input — not clean,
well-structured example text. Include realistic verbal habits (false
starts, filler words) if the input is meant to be spoken/transcribed.
```

> ** Why this prompt works**
> Explicitly requesting messy, realistic input rather than clean examples directly counters AI's tendency to generate tidy, well-formed sample text by default — without this instruction, you'd likely get examples that don't actually stress-test your prompt the way real input will. Varying length, clarity, and tangents in the same batch gives you a quick, broad sense of your prompt's robustness across the input range from Step 2, in a single generation.

**Token efficiency note:** Generate this batch once, early, and reuse the same set of test inputs throughout your prompt engineering work in the next phase — rather than regenerating new test cases every time you tweak your prompt. Consistent test inputs let you compare prompt versions against each other fairly.

---

## Validating Your Target User Definition

- [ ] You can describe your user's realistic input concretely, not just generic persona traits
- [ ] You've generated or imagined at least a few varied example inputs spanning the realistic range, not just one clean ideal case
- [ ] Your planned demo input is representative of a real, normal-day input — not an unrealistically polished best case
- [ ] The input style described here will directly inform your prompt design and conversation flow in the next phase, not sit unused

---

## What's Next

With Phase 0 complete, move to **Phase 1**, starting with the **PRD** — turning your problem definition and target user understanding into a concrete spec for what you're building.
