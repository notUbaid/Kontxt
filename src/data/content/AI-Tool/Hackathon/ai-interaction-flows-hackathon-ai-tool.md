---
title: AI Interaction Flows
slug: ai-interaction-flows
phase: Phase 1
mode: hackathon
projectType: ai tool
estimatedTime: 15-20 min
---

# AI Interaction Flows

Conversation Design mapped *what* gets said. This module maps *what actually happens technically* when those words trigger a model call — when it fires, what state it depends on, what happens while it's running, and how its result flows back into your app. This is the bridge between your conversation script and the actual backend/frontend work in the next phase.

---

## The Core Idea: Every AI Call Is a State Machine, Even a Simple One

Even a single-shot AI feature has at least three states: idle (waiting for input), in-flight (the call is running), and resolved (success or failure). Treating these as one undifferentiated blob — "the user submits, then stuff happens, then they see a result" — is exactly how teams end up with a janky-feeling demo, because each state needs different UI and different handling, and skipping that planning means discovering the gaps live.

> ** Warning**
> The most common AI interaction bug in a hackathon demo: a user (or judge) double-clicks the submit button because nothing visibly happened in the first half-second, triggering two simultaneous AI calls and a confusing double result. This is a flow design problem, not a model problem — and it's entirely preventable by mapping your states explicitly before building.

---

## Step 1: Map the States Explicitly

**Decision Card — Minimum State Map for Any AI Call**

| State | What's Happening | What the User Sees |
|---|---|---|
| Idle | Waiting for input | The input UI, ready, submit button enabled |
| Submitting | Input sent, call initiated, not yet responded | Submit button disabled/loading, immediate visual feedback (see Streaming UX module) |
| In-flight | Model is processing | Loading state — covered in UI Polish, but the state itself needs to exist here in your flow |
| Success | Model returned a usable result | The actual output, displayed |
| Empty/null result | Model returned validly but found nothing useful (e.g., no action items in the input) | A clear "nothing found" state — not a blank screen, not an error |
| Failure | Model call errored, timed out, or returned something unusable | A clear, specific error — covered in depth in AI Failure States |

The empty/null result row is the one teams most often skip, and it's a real, common outcome — not an edge case. If your AI feature can legitimately return "nothing here," design for it now.

---

## Step 2: Decide What's Allowed to Trigger an AI Call

This directly prevents the double-click problem from the warning above, and any other accidental duplicate-call scenario.

**Best Practice Card — Call-Triggering Discipline**

```
Decide explicitly:
- Submit button is disabled the instant a call starts, re-enabled
  only after resolution (success, empty, or failure)
- No call fires automatically on every keystroke unless that's
  genuinely your design (e.g., live-search-style features) — and
  if it is, add a debounce so you're not firing a call per character
- Only one in-flight call per conversation/session at a time, unless
  your flow specifically requires concurrent calls
```

---

## Step 3: Decide What State Persists Across Multi-Step Interactions

If your conversation has more than one turn, decide what carries forward from one AI call to the next — and make sure it's actually passed in the prompt, not assumed to be remembered by the model on its own (most API calls are stateless by default; context has to be explicitly included each time).

> ** Tip**
> If your flow has a follow-up turn ("want me to also draft an email about this?"), the model needs the previous turn's input and output explicitly included in the next call's context — it doesn't remember automatically just because it's "the same conversation" in your UI. Decide what's carried forward now, so your backend implementation in the next phase has a clear target instead of discovering a broken-memory bug mid-build.

---

## Using AI to Map the Flow Quickly

AI is useful here for converting your conversation script into the full technical state map quickly, and for catching missing states you didn't think to specify.

**Prompt: State Map from Conversation Script**

```
Here's my conversation script: [paste from Conversation Design]

Map this into the full technical interaction flow, including:
1. Every distinct state (idle, submitting, in-flight, success, empty
   result, failure) and what triggers the transition between each
2. What should explicitly disable/prevent duplicate calls
3. For any multi-turn step, what context from earlier turns needs
   to be explicitly passed into the next AI call (the model has no
   memory between calls unless I include it myself)

Keep this to the states and transitions only — don't write
implementation code yet, this is the planning layer before Backend
and AI Integration.
```

> ** Why this prompt works**
> Explicitly reminding the model that there's no memory between calls unless context is passed directly addresses a real, common misconception that trips up multi-turn AI features — useful to have surfaced at the planning stage rather than discovered as a confusing bug later. Restricting the output to states and transitions, not code, keeps this module's output as a planning artifact you'll hand to the next phase, rather than jumping ahead to implementation before the flow itself is settled.

**Token efficiency note:** Generate this state map once, directly after finalizing your conversation script, and treat it as a planning reference for the next two phases rather than something you regenerate repeatedly. The mechanical implementation work that follows (Backend, AI Integration) should reference this map, not redo the planning.

---

## Validating the Flow Before Moving to Implementation

- [ ] Every state in the decision card above has a corresponding plan for what the user sees
- [ ] The empty/null result case is explicitly planned, not assumed away
- [ ] Duplicate-call prevention is decided (disabled button, debounce, or equivalent)
- [ ] For any multi-turn flow, you know exactly what context gets passed into each subsequent call
- [ ] This flow map matches your conversation script from the previous module with no contradictions

---

## What's Next

Move to **Trust & Transparency** — deciding how much your tool should reveal about what the AI is doing and why, which directly affects how credible your output feels to a judge watching it work.
