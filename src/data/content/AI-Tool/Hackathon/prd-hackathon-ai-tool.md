---
title: PRD
slug: prd
phase: Phase 1
mode: hackathon
projectType: ai tool
estimatedTime: 10-15 min
---

# PRD

Same purpose as any hackathon PRD: a fast, shared reference that keeps your team building the same thing, written in minutes rather than hours. For an AI tool specifically, this document needs one section a regular web app PRD doesn't — a clear spec for what the AI is actually supposed to do, since "the AI handles it" is not specific enough for two people to build against consistently.

---

## The Core Idea: The AI's Job Needs to Be Specified as Precisely as Any Other Feature

If you wrote "user uploads a file" as a feature, you'd specify what file types, what happens to it, and what comes out the other end. An AI feature deserves the same precision: what goes into the model, what's expected to come out, and what "good" looks like — even briefly. Without this, your prompt engineer and your frontend builder will quietly build against two different assumptions about what the AI returns.

> ** Warning**
> "AI generates a summary" is not a spec. Does it return plain text or structured JSON? A fixed length or variable? Does it always succeed, or can it return "I don't have enough information"? Two people building against an unspecified AI feature will build incompatible pieces — discovered, as usual, at the worst possible time.

---

## What an AI-Tool Hackathon PRD Needs

**Decision Card — Sections, Adapted for an AI Tool**

| Section | Include? | AI-Tool-Specific Note |
|---|---|---|
| One-sentence problem + user | Yes | Carried from Problem Definition and Target Users |
| User flow | Yes | Include where the AI call happens explicitly as a flow step, not hidden inside "processing" |
| Input/output spec for the AI feature | Yes — new for this project type | What goes into the model, what format comes out, expected variability |
| Data model | Yes, brief | Same as any hackathon PRD |
| Fallback behavior | Yes — new for this project type | What happens if the AI call fails or returns something unusable — decided now, built later in AI Failure States |
| Success metrics, market analysis, roadmap | No | Same exclusions as any hackathon PRD — not relevant here |

---

## Step 1: Specify the AI Feature With Input/Output Precision

This is the one genuinely new piece of work relative to a non-AI hackathon PRD, and it pays for itself almost immediately once you start prompt engineering in the next phase.

**Best Practice Card — AI Feature Spec**

```
Feature: Voice memo → structured action items

Input: Transcribed text from a voice memo (expect: rambling,
       informal, may include irrelevant tangents — per Target Users)

Output format: JSON array of objects:
  { "action": string, "urgency": "low" | "medium" | "high" }

Expected behavior: Extract only genuine action items, ignore
  tangents. If no clear action items exist, return an empty array
  — not a fabricated one.

Known limitation: Urgency is inferred, not stated explicitly by the
  user — accuracy here is a "best effort," not guaranteed precise.
```

Writing this down — especially the output format and the "what if there's nothing to extract" behavior — gives your prompt engineering work in the next phase a clear target instead of a vague aspiration.

---

## Step 2: Decide Fallback Behavior Now, Not During a Crisis

Decide, in the PRD itself, what the user (and the demo) sees if the AI call fails, times out, or returns something clearly wrong. This doesn't need to be built yet — that happens in the AI Failure States module — but deciding the *intended* behavior now means your frontend and backend builders aren't guessing independently later.

> ** Tip**
> A simple default that works for most AI tools: "show a clear, specific error message, never a silent failure or a fabricated-looking fallback result." Write this decision into the PRD explicitly so nobody has to make the call mid-build under time pressure.

---

## Using AI to Draft the AI-Tool PRD Fast

Same value proposition as a regular hackathon PRD — fast conversion of your team's decisions into a clean shared document — with the AI feature spec as the one section that needs slightly more deliberate prompting to get right.

**Prompt: AI-Tool Hackathon PRD**

```prompt
Generate a one-page hackathon PRD for an AI tool, from the following:

Problem + user: [from Problem Definition and Target Users]
User flow: [rough steps, including where the AI call happens explicitly]
AI feature spec: input type, expected output format, and what
  "no good output exists" should look like: [your answers from Step 1]
Fallback behavior if the AI call fails: [your decision from Step 2]
Data entities involved: [list]

Structure as: problem/user, user flow (numbered, with the AI call
step explicit), AI feature input/output spec, fallback behavior,
data model (brief), and explicit out-of-scope list.

Keep it to one page. No success metrics, market analysis, or roadmap
sections.
```

> ** Why this prompt works**
> Requiring the AI call to appear as an explicit step in the numbered flow (not buried inside a vague "processing" step) keeps the document honest about where the riskiest, highest-variance part of your build actually happens — exactly the section every team member needs to see clearly. The dedicated input/output spec section forces the same precision discussed in Step 1 to actually land in the shared document, rather than staying as an unwritten assumption in one person's head.

**Token efficiency note:** Generate this once your problem, users, and AI feature spec are settled — same discipline as any hackathon PRD. Don't draft this before you've actually decided the input/output format; a PRD written around a vague AI feature description just produces a vague document.

---

## Validating the PRD Before Splitting Up to Build

- [ ] The AI call appears as an explicit, visible step in the user flow — not hidden inside a generic "processing" step
- [ ] Input and output format for the AI feature are specified precisely enough that two different builders would build compatible pieces independently
- [ ] The "what if there's nothing good to extract/generate" case is addressed, not left implicit
- [ ] Fallback behavior for AI failure is decided and written down
- [ ] The out-of-scope list explicitly includes anything cut earlier, so it doesn't quietly resurface

---

## What's Next

Move to **Conversation Design** — shaping how the interaction with your AI tool actually feels from the user's side, building directly on the input/output spec you just defined.
