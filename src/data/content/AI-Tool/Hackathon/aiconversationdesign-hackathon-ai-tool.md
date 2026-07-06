---
title: Conversation Design
slug: conversation-design
phase: Phase 1
mode: hackathon
projectType: ai tool
estimatedTime: 15-20 min
---

# Conversation Design

If your AI tool involves any back-and-forth with the user — chat, multi-step input, clarifying questions — the *shape* of that interaction matters as much as the model's raw capability. A brilliant model behind a confusing or frustrating conversation flow demos poorly. This module is about designing that interaction deliberately, before you write a single prompt.

If your tool is single-shot (one input, one output, no back-and-forth), much of this module still applies to that one exchange — just compressed into a single turn instead of a conversation.

---

## The Core Idea: A Conversation Is a Designed Path, Not an Open Box

The biggest mistake in AI tool conversation design is treating the chat interface as an open-ended box where the user can type anything and the model will figure it out. That approach is genuinely hard to make reliable, and it's especially risky live, where an unexpected user input (including your own, if you fumble the demo) can derail things in front of judges. A designed path — even one disguised as a free-form chat — is far more reliable.

> [!WARNING]
> "Just let them type anything, the model is smart enough" is a real risk in a live hackathon demo specifically. The model being capable in general doesn't mean it'll handle an unexpected input gracefully in the one specific flow you're demoing, under time pressure, with no chance to recover gracefully if it goes sideways.

---

## Step 1: Decide the Conversation Shape

**Decision Card — Conversation Shapes by Use Case**

| Shape | What It Looks Like | Best For |
|---|---|---|
| Single-shot | One input → one output, no back-and-forth | Tasks with a clear, complete input (your PRD's spec'd AI feature is usually this) |
| Guided multi-step | The app asks specific questions in sequence, collecting structured input before generating | Tasks where the ideal input isn't naturally provided all at once |
| Open chat with guardrails | Free-form chat, but the system prompt constrains scope tightly and redirects off-topic input | Tasks that genuinely benefit from open conversation, with a tightly scoped domain |
| Fully open chat | No constraints on what the user can ask | Almost never the right choice for a hackathon — too much surface area for unpredictable failure live |

For most hackathon AI tools, **single-shot or guided multi-step** is the safer, more reliably demoable choice. Open chat feels impressive in concept but is the hardest to make consistently good in the time you have.

---

## Step 2: Script the Happy Path Conversation, Word for Word

Just like your User Flows module mapped screens, map the actual conversation turn by turn — what the system says, what the user is expected to say or do, what happens next. This becomes both your prompt engineering target and your literal demo script.

**Best Practice Card — Scripted Happy Path**

```
Turn 1 (System): "Paste your meeting notes, or record a quick voice
                  memo, and I'll pull out the action items."
Turn 2 (User): [provides input — this is your test input from
                Target Users]
Turn 3 (System): Shows structured output — the wow moment

If your tool has follow-up turns (e.g., "Want me to also draft an
email about this?"), script those too, including the expected user
response that leads into your demo's natural ending point.
```

---

## Step 3: Decide What the System Does With Off-Script Input

Even in a guided flow, plan for the user (or you, mid-demo) saying something unexpected. You don't need comprehensive handling — same hackathon discipline as everywhere else in this curriculum — but you need a deliberate, graceful default rather than an undefined one.

> [!TIP]
> A simple, reliable default: if input doesn't match what the flow expects, have the system respond with a brief clarifying redirect ("I can help with that once I have your notes or a voice memo — could you share those?") rather than attempting to interpret arbitrary off-topic input. This keeps a stray or off-script moment from derailing the whole demo into unpredictable model behavior.

---

## Using AI to Draft and Stress-Test the Conversation Script

AI is useful for drafting the conversation copy itself and for playing the role of an unpredictable user to find where your designed flow breaks — a fast way to pressure-test before you're relying on it live.

**Prompt: Draft the Conversation Script**

```
Building an AI tool for: [problem from Problem Definition]
Target user's input style: [from Target Users module]
Conversation shape: [single-shot / guided multi-step / open chat
  with guardrails — your choice from Step 1]

Draft the exact conversation script for the happy path, turn by
turn, including:
1. What the system says/shows at each step
2. What the user is expected to provide
3. A brief, graceful redirect message for if the user provides
   something off-script

Keep system messages short and natural — this will be read or heard
live, not read silently as documentation.
```

> ** Why this prompt works**
> Specifying that messages will be read or heard live keeps the model from generating verbose, document-style copy that would feel stilted spoken aloud or displayed in a fast-paced demo — a common default for AI-generated UI text. Requesting the off-script redirect in the same pass ensures Step 3's safety net gets built alongside the happy path, rather than as an afterthought once you've already locked in the main flow.

**Token efficiency note:** Draft this once your conversation shape is decided, and treat revisions as quick edits to the existing script rather than full regenerations — once the shape is right, you're mostly tuning wording, which doesn't need a fresh, expensive prompt each time.

---

## Validating the Conversation Design

- [ ] The conversation shape matches your actual use case, not a default toward "open chat" because it sounds more impressive
- [ ] The happy path is scripted turn by turn, matching your planned demo
- [ ] A graceful, deliberate redirect exists for off-script input — tested at least once by deliberately going off-script yourself
- [ ] System messages are short enough to read or hear comfortably in a live demo pace

---

## What's Next

Move to **AI Interaction Flows** — connecting this conversation design to the technical flow of when and how your AI calls actually fire, including timing and state across multi-step interactions.
