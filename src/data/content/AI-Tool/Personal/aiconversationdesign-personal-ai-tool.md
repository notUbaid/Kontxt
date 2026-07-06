---
title: Conversation Design
slug: conversation-design
phase: Phase 1
mode: personal
projectType: ai tool
estimatedTime: 15-20 min
---

# Conversation Design

You know which part of your tool is AI-driven and which is plain code. This module is about designing how the interaction actually feels — whether that's a real back-and-forth conversation, a simple single-shot exchange, or something in between. For a personal tool, the goal is the interaction style that fits how *you* actually want to use this day to day, not a generic chatbot pattern adopted by default.

---

## The Core Idea: Pick the Shape That Matches How You'll Actually Use It

The default instinct for many AI tools is "make it a chat interface" — but that's not always the best fit. If your real use case is "take a photo of a receipt and get a categorized expense entry," a chat interface adds friction compared to a simple upload-and-result flow. Design the interaction around your actual real-world usage moment, not around what AI products typically look like.

> [!TIP]
> Picture the actual moment you'll use this tool — are you standing in a kitchen with a receipt, talking out loud while walking, sitting at a desk reviewing something carefully? That real moment should drive your interaction design more than any general assumption about what an "AI tool" interface should look like.

---

## Step 1: Choose the Conversation Shape for Your Actual Use Case

**Decision Card — Conversation Shapes by Real Usage Moment**

| Your Real Usage Moment | Best Shape | Why |
|---|---|---|
| Quick, single action (snap a photo, get a result) | Single-shot | No back-and-forth needed; minimize friction for a fast, repeated action |
| Reviewing/refining something together (drafting, iterating on a summary) | Guided multi-step or light chat | Genuine value in iterating, asking for adjustments |
| Asking varied questions about your own knowledge base | Open chat with guardrails | The genuinely open-ended nature of questions benefits from real conversational flexibility, scoped to your data |
| A recurring, structured task (logging something the same way each time) | Guided multi-step with a consistent template | Predictability and speed matter more than open flexibility for a repeated routine |

---

## Step 2: Design for Repeated Use, Not Just a Good First Impression

Unlike a hackathon demo (built for one great showing), a personal tool needs to feel good on the 50th use, not just the first. This shifts what's worth optimizing: speed and low friction for repeated actions matter more than an impressive but slower flow you'll only appreciate once before it becomes tedious.

**Best Practice Card — Optimizing for Repetition**

```
Ask yourself: will I do this exact action dozens of times?

If yes: minimize steps, minimize typing, default to the fastest
        path even if it's slightly less "impressive" — e.g., a
        single upload button beats a multi-turn chat asking you
        to describe what you're uploading, if you're always
        uploading the same kind of thing.

If no, this is more occasional/exploratory: a bit more conversational
        flexibility is fine, since you're not optimizing for raw speed.
```

---

## Step 3: Decide What Happens When Your Input Doesn't Fit the Expected Pattern

Even in a personal tool with a forgiving, low-stakes context, decide deliberately what happens with unexpected input — not because a judge is watching, but because *you* will hit this eventually, and a confusing or silently-wrong response erodes your own trust in a tool you built to make your life easier.

> [!NOTE]
> If your tool expects a receipt photo and you accidentally upload something else, a clear "that doesn't look like a receipt — try again?" response is far better than either a confusing fabricated result or a silent crash. Design this now, even briefly — it's cheap to add and meaningfully improves the tool's day-to-day trustworthiness.

---

## Using AI to Draft the Interaction Flow

Useful for converting your chosen shape and real usage moment into an actual interaction script quickly — the same value proposition as in any hackathon or production context, just applied at a personal project's pace.

**Prompt: Interaction Flow for Real Usage**

```
My personal AI tool: [problem from Problem Definition]
Real usage moment: [describe — when/where/how you'll actually use this]
Chosen conversation shape: [single-shot / guided multi-step / open
  chat with guardrails — your pick from Step 1]
Is this a repeated, routine action or an occasional/exploratory one?: [specify]

Draft the actual interaction flow, turn by turn if applicable, that
fits this real usage moment. Optimize for [speed and minimal friction
/ a bit more conversational flexibility — pick based on repeated vs.
occasional from above]. Include a brief, clear response for if my
input doesn't match what the flow expects.
```

> ** Why this prompt works**
> Anchoring the request in your real usage moment, rather than a generic "design a chat interface" request, keeps the output grounded in how you'll actually use the tool day to day — the same discipline that separates a personal tool you'll keep using from one that feels like unnecessary overhead each time. Explicitly choosing between speed-optimization and conversational flexibility, based on repeated-vs-occasional framing, prevents a one-size-fits-all chat interface from being applied to a use case that would be better served by something faster and simpler.

**Token efficiency note:** This is a single planning conversation — get the flow drafted, try it mentally against a few real scenarios you can imagine, and move forward. You'll naturally refine the actual wording once you're using the built tool for real, which is a better feedback source than extended hypothetical iteration now.

---

## Validating the Conversation Design

- [ ] The chosen shape matches your real usage moment, not a default assumption about what an AI tool interface should look like
- [ ] The design accounts for whether this is a repeated routine action or an occasional one, and optimizes accordingly
- [ ] A clear, deliberate response exists for input that doesn't match what's expected
- [ ] You can picture using this flow for the 50th time, not just the first, and it still feels reasonable

---

## What's Next

Move to **Trust & Transparency** — deciding how much insight to build into the tool about what the AI is doing, which matters even in a personal project if you'll be relying on its output for real decisions.
