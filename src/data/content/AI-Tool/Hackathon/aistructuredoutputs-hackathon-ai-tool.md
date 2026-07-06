---
title: Structured Outputs
slug: structured-outputs
phase: Phase 2
mode: hackathon
projectType: ai tool
estimatedTime: 15-20 min
---

# Structured Outputs

Your prompt asks for a specific format. This module is about actually guaranteeing you get it — moving from "I asked nicely in the prompt" to "my code can reliably parse what comes back," which is a meaningfully stronger and more demo-safe guarantee.

---

## The Core Idea: Asking for JSON in Plain Text Is Not the Same as Getting Valid JSON

A prompt that says "respond in JSON" usually gets you something that looks like JSON most of the time — until it doesn't, and your frontend crashes trying to parse a response that has a stray sentence before the actual JSON, or a trailing comma, or a field name that drifted slightly from your spec. This is exactly the kind of bug that passes every rehearsal and then fails live on the one run that matters.

> [!WARNING]
> "It worked every time I tested it" is not the same claim as "it's guaranteed to work." Plain-text-requested JSON has a real, non-zero failure rate even with a good prompt. If your demo depends on parsing the model's output into a UI, that failure rate needs to be addressed structurally, not just hoped away by a well-worded prompt.

---

## Step 1: Use Your Provider's Native Structured Output Feature, If Available

Most current major model providers offer some form of native structured output enforcement — a way to specify a schema that the API guarantees (or strongly constrains) the response to match, rather than relying purely on prompt instructions. This is meaningfully more reliable than prompt-only formatting requests.

> [!NOTE]
> Specific feature names, capabilities, and exact guarantees vary by provider and change over time — check your chosen provider's current API documentation directly for how they support structured/schema-constrained output (sometimes called "JSON mode," "structured outputs," "function calling," or "tool use" depending on the provider and how you're using it). Don't rely on memory for this; verify against current docs before building against an assumed behavior.

**Decision Card — Reliability Tiers**

| Approach | Reliability | Effort |
|---|---|---|
| Native schema-constrained output (provider-specific feature) | Highest | Low once you know your provider's current syntax — check docs |
| Prompt-only JSON request + manual parsing with validation | Medium | Low, but needs a validation/retry layer to be safe |
| Prompt-only JSON request, parsed directly with no validation | Low | Lowest effort, highest live-demo risk — avoid this for anything demo-critical |

---

## Step 2: Validate the Parsed Output Before Using It

Even with the most reliable approach available, add a validation step in your code: check that the parsed result actually has the expected fields and types before passing it to your UI. This catches the rare structural miss before it becomes a visible crash.

**Best Practice Card — Minimum Validation**

```
After parsing the model's response:
1. Confirm it's valid JSON at all (catch parse errors explicitly,
   don't let an unhandled exception crash the request)
2. Confirm required fields exist and have the expected type
   (e.g., "urgency" is one of your three allowed string values,
   not an unexpected value the model invented)
3. If validation fails, trigger your planned fallback behavior
   from the PRD — don't let invalid data reach the UI unfiltered
```

This validation layer is also exactly where the AI Failure States module's planning connects directly to working code — a validation failure is one of the specific failure types that module's fallback behavior needs to handle.

---

## Step 3: Decide on a Retry Strategy, But Keep It Simple

If validation fails, a single retry (re-sending the same request, sometimes with a slightly adjusted prompt noting the previous attempt's issue) often resolves a one-off formatting miss. Don't build an elaborate, multi-attempt retry system for a hackathon — one retry, then fall back to your planned failure state, is enough.

> [!TIP]
> A simple rule that covers most cases: try once, validate, retry once if invalid, then show your planned fallback/error state if it fails twice. This is enough resilience for a live demo without over-engineering a retry system you don't have time to build or test thoroughly.

---

## Using AI to Implement the Structured Output Layer

This is a mechanical, well-documented implementation task — a strong fit for AI-assisted code generation, with the caveat that provider-specific syntax needs to be verified against current documentation rather than assumed from training data.

**Prompt: Structured Output Implementation**

```
Using [provider]'s API with [your language/framework]. My desired
output schema: [paste your exact field structure from the PRD spec]

1. Show me how to use [provider]'s current native structured/schema-
   constrained output feature for this schema, if available — check
   against current docs rather than assuming based on general
   knowledge, since this changes between providers and versions.
2. Add validation code that checks the parsed response has the
   required fields and correct types before it's used elsewhere
   in my app.
3. Add a single retry on validation failure, then a clear fallback
   if the retry also fails — don't build more than one retry attempt.
```

> ** Why this prompt works**
> Explicitly instructing the model to check current docs rather than rely on general knowledge addresses a real risk: provider-specific structured output syntax changes over time, and a model's training data may reflect an outdated version of the feature. Capping retries at one, stated directly in the prompt, prevents the model from defaulting to a more elaborate retry/backoff system that would cost more build time than a hackathon timeline can absorb.

**Token efficiency note:** Implement this once your prompt from the previous module is already producing good results most of the time — this layer is about reliability and safety net, not about fixing a prompt that's fundamentally producing wrong content. Don't reach for structured-output tooling to paper over a prompt problem; fix the prompt first, then harden the format guarantee.

---

## Validating the Structured Output Layer

- [ ] Verified your provider's current structured output feature against their actual documentation, not assumed syntax
- [ ] Validation code checks both presence and type of required fields, not just that parsing succeeded
- [ ] A single retry is implemented and tested by deliberately triggering a validation failure once
- [ ] The final fallback (after retry also fails) connects to your planned AI Failure States behavior, not a generic crash or blank screen

---

## What's Next

Move to **RAG** — if your tool needs to ground its output in specific documents or external knowledge beyond the model's own training, this is where that retrieval layer gets designed.
