---
title: Backend Engineering
slug: backend-engineering
phase: Phase 3
mode: hackathon
projectType: web app
estimatedTime: 15-20 min
---

# Backend Engineering

You have a schema, auth, and a flow. Now you're writing the actual logic that makes your wow moment happen — the API endpoints, the AI integration calls, the data processing. This module is about building that logic fast, while still avoiding the handful of mistakes that take down a live demo.

---

## The Core Idea: Build for the Demo Path, Verify the Demo Path, Ignore Everything Else

Every endpoint you write should map directly to a step in your screen-by-screen flow. If you're writing backend logic that doesn't correspond to a screen a judge will see, stop and ask whether it's actually Must-Have — this is the same discipline from MVP Features, now applied at the code level.

> ** Warning**
> Backend work is where hackathon scope creep hides best, because it doesn't show up visually — you can spend three hours building a "proper" API layer with clean abstractions and nobody will ever see that effort in the demo. Time spent here is invisible to judges; spend exactly as much as the demo path requires, no more.

---

## Step 1: Build Endpoints in Demo Order, Not Logical Order

Build and test the exact sequence a judge will see, in that sequence — not whatever feels architecturally cleanest to build first. This means your first working endpoint should be whatever Screen 1 in your flow actually calls, even if it feels less interesting than jumping straight to the wow-moment logic.

**Best Practice Card — Build-and-Verify Order**

```
1. Build Screen 1's endpoint → verify it works → move on
2. Build Screen 2's endpoint → verify it works, using real output
   from Screen 1, not fabricated test data → move on
3. Continue through every screen in order

Why this matters: building out of order means you test each piece
in isolation with fake inputs, then discover at the end that two
pieces don't actually connect correctly — exactly when you have
the least time left to fix it.
```

---

## Step 2: Handle Errors Only Where the Demo Could Actually Hit Them

This mirrors the User Flows module's guidance on error handling, applied to backend code specifically. A try/catch around your wow-moment's AI API call, with a sensible fallback, is worth building. Comprehensive input validation across every endpoint for inputs your demo will never send is not.

**Decision Card — Where to Spend Error-Handling Time**

| Code Path | Handle Errors? | Reasoning |
|---|---|---|
| The AI/API call your wow moment depends on | Yes — wrap it, have a fallback | This is the single highest-risk live-demo failure point |
| The exact input your demo will actually send | Yes, briefly | Worth a quick check so a typo during a live demo doesn't crash the app |
| Every possible malformed input a real user might someday send | No | Not relevant to a scripted demo; skip entirely |
| Database write failures on your core flow | Briefly — log it, show a generic "something went wrong, try again" | A silent failure (nothing happens, no feedback) is worse for a live demo than an ugly-but-visible error message |

> ** Tip**
> A visible, even slightly ugly error message ("Something went wrong — try again") is far better in a live demo than a silent failure where the app just does nothing and you have to explain to judges that it's "supposed to do something here." If something breaks live, you want immediate, visible feedback so you can react and recover quickly — not silence that makes you look confused on stage.

---

## Step 3: Test With Real Data, Not Toy Data, As Early As Possible

Backend code that works perfectly with `{"test": "test"}` often breaks the moment it gets the actual, messier shape of data your real demo input produces. Test with realistic inputs from the first integration, not at the end.

> ** Warning**
> If your wow moment involves an AI API call, test it with the actual type of input you'll demo with — a real document, a real image, a real voice clip — as early as possible. AI APIs can behave differently with realistic, messy real-world input than with a clean three-word test string, and discovering that difference the night before submission leaves no time to adjust your prompt or processing logic.

---

## Using AI to Write Backend Logic Fast

This is core, high-leverage AI usage in a hackathon — AI-generated backend code, reviewed quickly against your actual flow, is one of the biggest time savers available to you. The risk is trusting generated code without verifying it against your real data and real demo path.

**Prompt: Endpoint Implementation Against Your Flow**

```
Building [framework/platform] backend for a hackathon. Here's the
relevant step from my user flow:

Step: [e.g., "User uploads a document, app extracts key data and
       returns a summary"]
Input shape: [describe or paste a sample]
Expected output shape: [describe or paste a sample]
Relevant schema: [paste relevant table/field definitions]

Write the endpoint for this step only. Include error handling only
for the one most likely failure (e.g., the AI call timing out or
returning malformed output) — skip comprehensive input validation,
this is for a hackathon demo, not production.
```

> ** Why this prompt works**
> Scoping the request to "this step only" with the relevant schema and real sample shapes keeps the model grounded in your actual flow instead of generating a generic, more elaborate endpoint than you need. Explicitly limiting error handling to the most likely single failure mirrors the Step 2 discipline directly in the prompt, preventing the model from defaulting to comprehensive validation that costs you review time without demo benefit.

**Token efficiency note:** Generate and verify one endpoint at a time, in your actual demo order from Step 1, rather than asking for your entire backend in one massive prompt. A focused prompt per endpoint, tested immediately with real data, catches integration problems while they're still cheap to fix — a single giant generation makes it much harder to isolate which part broke when something doesn't work.

---

## Validating Generated Backend Code

- **Run it immediately with real demo-shaped data**, not just to confirm it compiles — confirm the actual output matches what your frontend expects.
- **Check that the one wrapped error path actually triggers correctly** — deliberately break the input once to confirm your fallback shows up instead of a raw crash.
- **Watch for AI defaulting to comprehensive validation or abstraction you didn't ask for** — if the generated code includes elaborate input sanitization or a generic service-layer pattern you didn't request, simplify it back down; that complexity costs you debugging time without demo benefit.
- **Confirm any AI API call's actual latency** with your real input — if it takes 8 seconds and your demo script assumes instant results, that's a problem to solve now (see UI Polish for making a wait feel intentional), not during the live run.

---

## Quick Reference: Backend Discipline for a Hackathon

1. Build and verify in demo order, not logical order
2. Handle errors only where the demo could realistically hit them
3. Test with real, messy demo data from the first integration onward
4. Verify every AI-generated endpoint immediately against real data, don't trust on sight

---

## What's Next

Move to **Frontend Engineering** — building the actual interface that calls these endpoints and walks a judge through your flow.
