---
title: Backend
slug: backend
phase: Phase 3
mode: hackathon
projectType: ai tool
estimatedTime: 15-20 min
---

# Backend

You have a working prompt, a structured output guarantee, and (if needed) a retrieval pipeline. This module is about wiring all of it into an actual server-side flow your frontend can call — the plumbing that connects your AI Interaction Flows state map to real, working endpoints.

---

## The Core Idea: Your Backend's Job Is to Make the AI Call Boring and Predictable

Everything interesting and risky already happened in the previous modules — prompt design, output validation, retrieval. Your backend's job now is to be the reliable, unglamorous layer that calls those pieces correctly, handles their known failure modes, and returns a clean result to the frontend. Boring, predictable backend code is exactly what you want here — this isn't where your wow moment lives.

> ** Warning**
> Don't use backend implementation time to "improve" your prompt or retrieval logic on the fly. If you find yourself tweaking the prompt while writing the endpoint, stop — that's Prompt Engineering work bleeding into a different phase, and it usually means you skipped sufficient testing earlier. Go back and test there explicitly rather than patching prompts ad hoc inside endpoint code.

---

## Step 1: Build One Endpoint Per AI Interaction Flow State

Your AI Interaction Flows module already mapped the states (idle, submitting, in-flight, success, empty, failure). Your backend endpoint needs to produce a response that clearly communicates which of these states applies — not just return raw model output and leave the frontend to guess.

**Best Practice Card — State-Aware Response Shape**

```
{
  "status": "success" | "empty" | "error",
  "data": [...] | null,
  "errorMessage": string | null
}

This explicit status field means your frontend never has to guess
whether an empty array means "the model found nothing" versus
"something went wrong" — the backend states it directly, matching
the distinct states from your AI Interaction Flows planning.
```

---

## Step 2: Centralize Your Model Call, Validation, and Retry Logic in One Place

Don't scatter the model call, structured output validation (from Structured Outputs), and retry logic (also from that module) across multiple files or duplicate it if you have more than one AI-powered endpoint. A single, reusable function that handles "call model, validate, retry once, return state-tagged result" keeps your actual endpoint code simple and reduces the chance of inconsistent failure handling across different parts of your app.

> ** Tip**
> Even in a fast hackathon build, this one piece of organization pays for itself almost immediately — if you discover a bug in your retry logic the night before submission, you want to fix it in one place, not hunt through every endpoint that happens to call the model.

---

## Step 3: Log Enough to Debug Live Issues Fast

You don't need comprehensive production logging. You do need enough visibility — console logs are fine — to quickly diagnose a failure if something goes wrong during a rehearsal or, worse, during the actual demo. At minimum, log the raw model response when validation fails, so you're not debugging blind.

**Decision Card — Minimum Useful Logging**

| Log This | Why |
|---|---|
| Raw model response on validation failure | Lets you see exactly what came back without re-running the call |
| Timing of each model call | Confirms whether latency matches what you measured in Model Selection |
| Which fallback path triggered (retry, error state, empty state) | Quickly tells you which failure mode you're actually hitting, without guessing |

---

## Using AI to Build the Endpoint Fast

This continues the same scoped, one-piece-at-a-time discipline from the general Backend Engineering approach, now applied with the AI-specific pieces (model call, validation, retry, state-tagging) as explicit requirements.

**Prompt: AI-Integrated Endpoint**

```
Building [framework] backend. This endpoint needs to:
1. Accept [input shape from PRD]
2. Call my model using [paste your finalized prompt and any RAG
   retrieval step, if applicable]
3. Validate the structured output using [paste validation logic
   from Structured Outputs module]
4. Retry once on validation failure, then return an error state
5. Return a response with an explicit status field: "success",
   "empty", or "error" — matching these states: [paste from AI
   Interaction Flows]

Include console logging of the raw model response specifically when
validation fails, so I can debug without re-running the call.
```

> ** Why this prompt works**
> Requiring the explicit status field directly carries forward the state-aware response shape from Step 1, ensuring the endpoint's actual output matches the planning already done in AI Interaction Flows rather than drifting into a simpler, less informative shape during implementation. Specifying the logging requirement in the same prompt builds in the debugging visibility from Step 3 from the start, rather than as an afterthought added only after a confusing failure during rehearsal.

**Token efficiency note:** Build and verify one AI-integrated endpoint completely — including testing real failure paths — before building a second one, if you have multiple AI features. Confirming the pattern works end-to-end once means every subsequent endpoint can reuse the same centralized model-call logic from Step 2, rather than re-discovering the same issues repeatedly.

---

## Validating the Backend Before Connecting the Frontend

- [ ] The endpoint's response includes an explicit status that maps directly to your AI Interaction Flows states
- [ ] Model call, validation, and retry logic are centralized, not duplicated per endpoint
- [ ] You've deliberately triggered a validation failure once to confirm the retry and fallback path actually work, not just the happy path
- [ ] Raw model response is logged on failure, confirmed by actually triggering a failure and checking the log
- [ ] Response timing roughly matches what you measured during Model Selection — if it's noticeably slower, investigate now, not during rehearsal

---

## What's Next

Move to **Frontend** — building the interface that calls this endpoint and walks the user through the conversation and states you've designed.
