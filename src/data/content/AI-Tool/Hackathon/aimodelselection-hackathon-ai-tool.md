---
title: Model Selection
slug: model-selection
phase: Phase 2
mode: hackathon
projectType: ai tool
estimatedTime: 15 min
---

# Model Selection

Which model you call has real consequences for your demo: latency, cost, output quality, and how forgiving it is of imperfect prompts all vary significantly. This module is about picking fast, using a decision process suited to hackathon time pressure — not exhaustively benchmarking every available option.

> [!NOTE]
> Model names, pricing, and capabilities change frequently. The framework below tells you *how* to choose; verify current model options, pricing, and rate limits directly with whichever provider you're considering before committing, since specifics shift faster than any static guide can track.

---

## The Core Idea: Pick Fast, Verify Immediately, Don't Re-Litigate

The cost of spending an hour comparing models is almost always higher than the cost of picking a reasonable default and confirming it works for your specific task in the first ten minutes of actually trying it. Model selection paralysis is a real, avoidable time sink.

> [!WARNING]
> Don't spend your limited hours benchmarking three different providers against your exact task "to be sure." Pick the option your team has used before, or the most commonly recommended current option for your task type, try it against your real test inputs from Target Users immediately, and only switch if it's genuinely failing — not if a different model might theoretically be slightly better.

---

## Step 1: Match Model Capability to Your Actual Task Complexity

**Decision Card — Capability vs. Speed/Cost Tradeoff**

| Your Task | What You Likely Need | Why |
|---|---|---|
| Structured extraction, classification, simple transformation | A faster, lighter/cheaper model in the provider's lineup | These tasks usually don't need the most capable (and slowest) model — verify with your real test inputs |
| Complex reasoning, multi-step inference, nuanced judgment calls | A more capable model, accepting higher latency | Worth the slower response time if your task genuinely needs deeper reasoning |
| Anything requiring up-to-date information beyond the model's training | A model with tool use/web search capability, or your own retrieval layer | Don't rely on a model's static knowledge for anything time-sensitive — see the RAG module if this applies |

> [!TIP]
> If you're unsure which tier your task needs, start with a faster/lighter option and test against your real inputs immediately. If the output quality is genuinely insufficient, escalate to a more capable model — don't default to the most powerful (and slowest) option just because it's the safest-seeming choice. Lower latency directly improves your live demo experience, covered further in Streaming UX.

---

## Step 2: Check Latency Against Your Demo's Tolerance

This matters more in a hackathon than almost anywhere else, because latency is experienced live, in real time, in front of judges. A model that's excellent but takes 8-10 seconds per call needs a very different UX treatment (see Streaming UX) than one that responds in 1-2 seconds.

- [ ] Test your actual prompt and real input against your chosen model, and time the real response
- [ ] If latency is high, decide now whether to optimize the prompt, switch to a faster model, or build UX specifically to make the wait feel intentional — don't discover this need the night before submission

---

## Step 3: Confirm Rate Limits Won't Sink You Mid-Demo

Free-tier or trial API keys often have low rate limits — fine for development, risky if your demo involves multiple calls in quick succession (e.g., a judge asking to try it themselves right after your scripted run). Check your actual tier's limits before relying on it live.

> [!WARNING]
> Hitting a rate limit mid-demo, in front of judges, is one of the most avoidable live-demo failures. Check your actual usage tier's limits, and if there's any risk, either request a higher limit in advance (many providers offer hackathon/developer credits) or build a clear fallback (cached/seeded response) for if a live call gets rate-limited.

---

## Using AI to Help You Decide Fast

Use AI for a quick, decisive recommendation rather than an exhaustive comparison — and verify any specific capability or pricing claim against the provider's actual current documentation before trusting it, since this is exactly the kind of fast-changing detail a model's training data can get wrong (see the product-self-knowledge caution about verifying current product specifics rather than relying on memory).

**Prompt: Fast Model Recommendation**

```
My AI feature: [input/output spec from PRD]
Task complexity: [structured extraction / complex reasoning / etc.]
Latency tolerance: [does this need to feel near-instant, or is a
  few seconds acceptable given my planned UX?]

Recommend one specific model to start with, and explain briefly why
it fits this task's complexity level — not a full comparison of every
option. Flag if my task likely needs real-time/current information
the model's training data wouldn't have, in which case tell me that
directly rather than just recommending a bigger model.
```

> ** Why this prompt works**
> Asking for one recommendation rather than a comparison matches the actual hackathon need — a fast, decisive starting point, not an exhaustive evaluation you don't have time to act on fully. The instruction to flag a genuine knowledge-currency mismatch (rather than just suggesting a "smarter" model) correctly distinguishes a capability problem from a knowledge-recency problem, which require different fixes — escalating model size doesn't solve a problem that actually needs retrieval or tool use.

**Token efficiency note:** Make this decision once, quickly, and move directly into testing it against your real inputs from Target Users. Don't run repeated comparison prompts across multiple models — testing your actual prompt against real input tells you far more than a model's general reputation does for your specific narrow task.

---

## Validating the Model Choice

- [ ] Tested against your actual real (not idealized) test inputs from the Target Users module, not a clean hypothetical example
- [ ] Latency measured directly, not assumed — and a UX plan exists if it's higher than ideal
- [ ] Rate limits for your actual API key/tier checked, with a plan if there's real risk of hitting them live
- [ ] You picked one option and moved on, rather than spending disproportionate time comparing alternatives

---

## What's Next

Move to **Prompt Engineering** — writing the actual prompt that gets your chosen model to reliably produce the output format and quality your PRD specified.
