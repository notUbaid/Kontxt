---
title: Streaming UX
slug: streaming-ux
phase: Phase 3
mode: hackathon
projectType: ai tool
estimatedTime: 15-20 min
---

# Streaming UX

You measured your full integrated latency in the previous module. This one is about what the user actually experiences during that wait — and specifically, whether streaming the model's response token-by-token (rather than waiting for the complete result) is worth building for your demo.

---

## The Core Idea: Perceived Speed Matters More Than Actual Speed

A response that takes 6 seconds but shows visible progress the entire time often feels faster than a response that takes 3 seconds but shows nothing until it's done. Streaming isn't just a technical capability — it's a direct lever on how your wait time is experienced, which matters enormously in a live demo where every second of silence feels longer to a nervous presenter and a watching judge alike.

> ** Warning**
> A blank or static loading screen during a multi-second wait reads as "is this broken?" far faster than the same wait with visible, incremental progress. If your measured full-path latency from AI Integration is more than a couple seconds, a generic spinner is actively working against you, not just being merely unimpressive.

---

## Step 1: Decide Whether Streaming Is Actually Worth Building

**Decision Card — When Streaming Earns Its Build Time**

| Your Situation | Build Streaming? | Reasoning |
|---|---|---|
| Full-path latency under ~2 seconds | Usually no | A quick, well-designed loading state (see UI Polish) is enough; streaming adds complexity for a wait that's already short |
| Full-path latency several seconds or more | Yes, if your provider/SDK supports it easily | This is exactly the situation streaming exists to improve |
| Output is generated as flowing text the user reads progressively (chat-style response) | Yes | Streaming text matches the natural reading experience and feels native |
| Output is structured data that only makes sense once complete (e.g., a JSON object with interdependent fields) | Often no, or partial | Streaming a half-formed JSON object isn't meaningfully useful to display — consider a progress indicator instead of literal token streaming |

If your output is structured data (per the Structured Outputs module) rather than flowing prose, full token-streaming may not even be the right tool — see Step 3 for an alternative that fits this case better.

---

## Step 2: If You're Streaming Text, Use Your Provider's Native Streaming Support

Most current model provider SDKs support streaming responses directly — check your provider's current documentation for the specific implementation pattern, since exact syntax varies and changes over time. The core experience to build is: text appears progressively as it's generated, rather than all at once after a complete wait.

> ** Tip**
> Streaming text in a chat-style interface is one of the lowest-effort, highest-perceived-impact pieces of polish available for an AI tool — judges are used to seeing this pattern from familiar AI products, and its absence (a long wait, then a sudden complete block of text) can make your tool feel comparatively dated even if the underlying output quality is just as good.

---

## Step 3: If Streaming Doesn't Fit Your Output Format, Build a Staged Progress Indicator Instead

For structured output that doesn't make sense to stream token-by-token, a staged progress indicator — showing distinct, named steps as they complete — captures much of the same perceived-speed benefit without needing literal text streaming.

**Best Practice Card — Staged Progress for Structured Output**

```
Instead of: a generic spinner for the entire multi-second wait

Try: "Analyzing input..." → "Extracting key points..." →
     "Formatting results..." — even if these stages are somewhat
     approximate relative to what's actually happening internally,
     showing distinct, named progress feels meaningfully more
     reassuring than an undifferentiated wait, and is far cheaper
     to build than true partial-result streaming for structured data.
```

> ** Note**
> These staged messages don't need to map with perfect technical precision to your actual internal processing steps — what matters for the demo experience is that the user sees forward motion and specific, legible context for the wait, rotating naturally as time passes, rather than one static message the whole time.

---

## Using AI to Implement Streaming or Staged Progress

This is a mechanical implementation task once you've decided which approach fits your output — AI can implement either pattern quickly, with the usual caveat about verifying provider-specific streaming syntax against current docs.

**Prompt: Streaming or Staged Progress Implementation**

```
My AI feature's output is: [flowing text / structured data — specify]
My measured full-path latency: [from AI Integration module]
Provider: [your model provider]

If my output is flowing text: show me how to implement streaming
using [provider]'s current SDK streaming support, with the frontend
displaying tokens as they arrive — check current docs for exact
syntax rather than assuming based on general knowledge.

If my output is structured data: instead, build a staged progress
indicator with 2-3 named stages that rotate during the wait,
matching roughly the actual processing steps in my pipeline:
[describe your actual steps, e.g., "retrieval, generation, validation"]
```

> ** Why this prompt works**
> Branching the request based on output type prevents the model from defaulting to literal token-streaming even when your output is structured data that doesn't suit it — a mismatch that would cost build time on an approach that doesn't actually fit your case well. Requesting current-docs verification for the streaming syntax specifically addresses the same provider-drift risk flagged in the Structured Outputs and RAG modules — streaming API patterns are exactly the kind of detail that shifts between SDK versions.

**Token efficiency note:** Build this once you've already confirmed your full-path latency in AI Integration — building streaming or staged progress before you know your actual wait time risks solving a problem you don't have, or under-building for a wait that's longer than you assumed.

---

## Validating the Streaming/Progress Experience

- [ ] You made a deliberate choice between streaming and staged progress based on your actual output format, not a default assumption
- [ ] If streaming, text visibly appears progressively in a real test run, not all at once after a complete wait
- [ ] If staged progress, the stages rotate naturally and roughly track real processing time, not stuck on one message or finishing instantly while the actual call is still running
- [ ] The chosen approach has been tested against your actual measured full-path latency, not an idealized fast-case assumption

---

## What's Next

Move to **AI Failure States** — the dedicated module for handling what happens when the model call doesn't succeed cleanly, building directly on the error state your frontend and backend already support.
