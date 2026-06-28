---
title: Prompt Engineering
slug: prompt-engineering
phase: Phase 2
mode: hackathon
projectType: ai tool
estimatedTime: 20-25 min
---

# Prompt Engineering

This is the actual core engineering work of your AI tool. Everything before this — problem definition, conversation design, model selection — exists to set up a prompt that reliably produces the output your PRD specified, against the real, messy input your target user would actually provide. This module is about writing that prompt fast and testing it rigorously enough to trust it live.

---

## The Core Idea: A Prompt That Works Once Isn't a Prompt That Works

The single most common AI-tool hackathon mistake at this stage: writing a prompt, trying it once with a clean example, seeing a good result, and moving on. A prompt needs to work *reliably* across the range of real inputs from your Target Users module — one good result tells you almost nothing about that.

> ** Warning**
> Your demo will use one specific input, but a judge might ask to try their own, and even your own rehearsed demo input might come out slightly differently each time (most models have some non-determinism by default). A prompt tested once against one clean example is a prompt you don't actually know works — test it multiple times, against the varied inputs you generated in the Target Users module.

---

## Step 1: Write the First Version With Explicit Structure

A clear, structured prompt outperforms a vague, conversational one for almost any task you're likely building in a hackathon. Borrow directly from your PRD's input/output spec.

**Best Practice Card — Structured First-Draft Prompt**

```prompt
You are [role/purpose, briefly].

Given the following input: [describe expected input type]

Extract/generate/transform it into: [exact output format from your
PRD spec — e.g., a JSON array with specific fields]

Rules:
- [Any genuine constraint — e.g., "only include items explicitly
  implied by the input, don't invent ones that aren't there"]
- [What to do if there's nothing valid to extract/generate —
  pulled directly from your PRD's "empty result" handling]

Input:
{{input}}
```

This structure — role, task, exact output format, explicit rules, the actual input — gives the model far less room to wander than an open, conversational instruction would.

---

## Step 2: Request Structured Output Explicitly, Don't Assume It

If your PRD specifies JSON or another structured format, say so explicitly and show the exact shape you want — don't just describe it in prose and hope the model infers the right structure. (The Structured Outputs module covers this in more technical depth; this is the prompt-level foundation for it.)

> ** Tip**
> Including a literal example of the desired output shape in your prompt — even a short one — meaningfully increases format consistency compared to describing the shape only in words. Show, don't just tell, when it comes to structured output.

---

## Step 3: Test Against Your Real Input Range, Repeatedly

Run your prompt against every test input you generated in the Target Users module — not just the one clean example. Run your planned demo input multiple times specifically, since model output can vary run to run even with identical input.

**Decision Card — What to Check Each Test Run**

| Check | Why |
|---|---|
| Does the output match the exact format every time? | Format drift is the most common structured-output failure |
| Does it correctly handle the "nothing to extract" case? | This is a real outcome, not an edge case — verify it explicitly |
| Does it stay on-task with the rambling/tangent test inputs? | Real input has tangents; confirm the model filters them as intended |
| Is the output quality consistent across multiple runs of the same input? | Non-determinism means one good run doesn't guarantee the next one |

---

## Step 4: Iterate by Adding Constraints, Not by Making the Prompt Longer for Its Own Sake

When a test reveals a failure, add a specific rule addressing that exact failure — don't just pad the prompt with generic instructions hoping something sticks. A focused, evidence-driven prompt outperforms a long, unfocused one.

> ** Note**
> If the model invents action items not actually present in the input, add a specific rule: "Only include items explicitly stated or clearly implied — do not infer items the input doesn't support." This kind of targeted fix, added in response to an observed failure, is far more reliable than a vague "be accurate" instruction added preemptively.

---

## Using AI to Iterate on Your Own Prompt

This is a slightly unusual but genuinely effective workflow: use a capable AI assistant to help you debug and improve the prompt you're writing for your *own* tool's AI feature — essentially using one model to red-team another model's prompt.

**Prompt: Prompt Debugging and Improvement**

```
Here's my current prompt: [paste it]

Here's a test input I tried: [paste]
Here's the actual output I got: [paste]
Here's what I expected/wanted instead: [describe]

1. Identify why the prompt likely produced this specific gap between
   expected and actual output.
2. Suggest a specific, minimal addition or change to the prompt that
   would address this exact failure — not a full rewrite, unless the
   structure itself is the problem.
3. Flag if this fix risks breaking a different case I tested earlier
   — i.e., is this a targeted fix or could it have side effects on
   other inputs?
```

> ** Why this prompt works**
> Providing the actual input, actual output, and expected output together gives the model concrete evidence to diagnose against, rather than asking it to guess at problems from the prompt text alone — a much stronger basis for an accurate fix. Asking explicitly about side effects on previously-tested cases directly enforces the regression-testing discipline this module requires — a fix for one failure mode shouldn't quietly break a case that was already working.

**Token efficiency note:** Keep this debugging conversation in one continuous thread as you iterate — each fix should build on the model's growing understanding of your prompt's specific failure patterns, rather than starting fresh and re-explaining context every time you find a new issue.

---

## Validating the Final Prompt Before Moving to Backend Integration

- [ ] Tested against every input from your Target Users test set, not just one clean example
- [ ] Your specific planned demo input has been run multiple times, confirming consistent quality
- [ ] The "nothing to extract/generate" case produces the intended empty/honest result, not a fabricated one
- [ ] Every fix made during iteration was tested against previously-passing cases to confirm no regression
- [ ] The output format matches your PRD's exact spec, verified by checking actual output structure, not just visual inspection of the text

---

## What's Next

Move to **Structured Outputs** — going deeper on reliably getting your model to return exactly the data shape your application code needs, building directly on the prompt you've just hardened.
