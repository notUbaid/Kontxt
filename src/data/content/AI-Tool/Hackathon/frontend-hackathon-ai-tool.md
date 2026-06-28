---
title: Frontend
slug: frontend
phase: Phase 3
mode: hackathon
projectType: ai tool
estimatedTime: 15-20 min
---

# Frontend

Your backend returns a clean, state-tagged response. This module is about building the interface that calls it and visibly represents every state from your AI Interaction Flows planning — the part a judge actually watches for the entire demo. The general frontend discipline (component libraries, demo-order building, testing on your actual device) still applies here exactly as it would for any hackathon web app; this module focuses on what's specifically different when the data you're displaying comes from an AI call.

---

## The Core Idea: Render Every State Your Backend Can Return, Not Just the Happy Path

Your backend's response includes an explicit status: success, empty, or error. If your frontend only has UI for "success," the other two states will look broken the moment they occur — and given real model variance, they will occur, possibly during your live demo.

> ** Warning**
> A frontend built only against the happy-path response is a frontend that's untested against roughly a third of its own backend's possible outcomes. Build and visually verify all three states before considering the screen done — not just the one you expect to see during your rehearsed run.

---

## Step 1: Build Distinct UI for Each Response Status

**Best Practice Card — Status-to-UI Mapping**

```
status: "success" → Show the actual result, your wow moment's
                     visual treatment (see UI Polish for general
                     guidance, applied here to your AI output
                     specifically)

status: "empty"   → A clear, friendly "nothing found" message —
                     never a blank space that looks like the app
                     froze. Frame it constructively if possible
                     (e.g., "No clear action items found — try
                     adding more detail").

status: "error"   → A clear, specific error message, distinct from
                     the empty state visually. The user should
                     immediately understand "something went wrong"
                     vs. "nothing was there to find" — these are
                     different situations and should look different.
```

> ** Note**
> Visually distinguishing "empty" from "error" matters more than it might seem. A judge (or real user) who sees the same generic gray box for both will assume the app is broken even when it actually worked correctly and just had nothing to report.

---

## Step 2: Wire Up the In-Flight State With Real Feedback

This connects directly to UI Polish's loading-state guidance, with an AI-specific addition: if your model call has any meaningful latency (per your Model Selection testing), the in-flight state needs more than a generic spinner — see the Streaming UX module for the deeper treatment of this, but at minimum, ensure something visible happens the instant the user submits, so there's no dead air where the app appears unresponsive.

---

## Step 3: Disable Re-Submission During In-Flight, Exactly as Planned

Carry forward the call-triggering discipline from AI Interaction Flows directly into the actual component: the submit control should be disabled (not just visually different, but functionally unable to trigger a second call) for the entire duration of the in-flight state, re-enabling only once success, empty, or error resolves.

> ** Warning**
> A disabled-looking button that can still be clicked (a common bug when only the visual style changes but the click handler isn't actually gated) doesn't prevent the duplicate-call problem — it just hides it slightly better. Verify the actual click handler checks the in-flight state, not just that the button looks disabled.

---

## Using AI to Build the Status-Aware Screen

Same general approach as any hackathon frontend screen generation, with the three-state requirement made explicit so it isn't accidentally dropped in favor of just the happy path.

**Prompt: Status-Aware Screen Implementation**

```
Building [framework] frontend with [component library], calling
this backend endpoint: [paste shape from Backend module, including
the status field]

Build this screen with three distinct, visually different states:
1. success — show: [describe your wow moment's display]
2. empty — show: [your friendly "nothing found" message]
3. error — show: [your specific error message]

Plus the in-flight state: submit control is functionally disabled
(not just styled differently) for the full duration of the call,
re-enabled only on resolution.

Use my design tokens: [from Design System module]. Don't default to
a generic spinner for in-flight if my actual call latency is more
than a couple seconds — flag if you think it needs the richer
treatment from a dedicated loading/streaming approach instead.
```

> ** Why this prompt works**
> Explicitly requiring three visually distinct states, named individually, prevents the model from defaulting to a single generic "result" component that only really handles the happy path — a natural default without this constraint. Asking it to flag latency-appropriate loading treatment connects this screen directly to the Streaming UX module's deeper guidance, rather than silently shipping a plain spinner that doesn't match your actual measured response time.

**Token efficiency note:** Build and visually verify this screen's three states one at a time — trigger success, then deliberately trigger empty (e.g., with an input you know produces no results), then deliberately trigger error (e.g., temporarily breaking the API key) — rather than assuming all three work because the happy path rendered correctly.

---

## Validating the Frontend Before Demo Rehearsal

- [ ] All three response states (success, empty, error) have been triggered deliberately and visually confirmed, not just assumed to work
- [ ] The in-flight state visibly begins the instant the user submits — no dead air
- [ ] The submit control is functionally disabled during in-flight, verified by attempting to click it again mid-call
- [ ] Empty and error states are visually distinguishable from each other at a glance
- [ ] Design tokens from your Design System module are applied consistently across all states, not just the success state

---

## What's Next

Move to **AI Integration** — confirming the full connected pipeline (frontend, backend, model, and retrieval if applicable) works end-to-end as one coherent system, not just as individually-verified pieces.
