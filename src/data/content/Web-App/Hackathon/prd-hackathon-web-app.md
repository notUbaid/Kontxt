---
title: PRD
slug: prd
phase: Phase 1
mode: hackathon
projectType: web app
estimatedTime: 10-15 min
---

# PRD

A real PRD takes pages, multiple review cycles, and stakeholder sign-off. None of that applies here. In a hackathon, a PRD's only job is making sure your team builds the *same* product — not a slightly different version each person pictured when you agreed on the idea verbally.

If your MVP feature list from the last module is the *what*, this is the shared reference that keeps everyone aligned on it while you're moving fast and splitting work.

---

## The Core Idea: This Document Exists to Prevent Drift, Not to Impress Anyone

Nobody is judging your PRD. It's pure internal infrastructure — a single page your team can glance at mid-build to settle a "wait, I thought we were doing it this way" disagreement before it costs you an hour of rework.

> [!WARNING]
> Skipping this step entirely is the second most common hackathon failure after bad scoping. Teams agree on an idea verbally, split up to build in parallel, and discover four hours later that two people built incompatible assumptions about how a core flow works — because nothing was written down precisely enough to catch the mismatch earlier.

---

## What a Hackathon PRD Actually Needs

**Decision Card — Include vs. Skip**

| Section | Include? | Why |
|---|---|---|
| One-sentence idea | Yes | Carried directly from Idea Definition — the anchor for every decision below it |
| Must-Have feature list as user actions | Yes | Carried directly from MVP Features — this is the actual spec |
| User flow (even rough) | Yes | Prevents two people building different assumptions about screen order |
| Data model sketch | Yes, brief | Just enough that backend and frontend builders agree on shape before both start coding against it |
| Success metrics | No | There are no real users to measure — skip entirely |
| Competitive analysis | No | Not relevant to a 24-48 hour build |
| Long-term vision / roadmap | No | You're not building a company today |
| Detailed acceptance criteria per feature | No | Overkill for a team of a few people who can just ask each other |

The hackathon PRD is roughly one page. If it's growing past that, you're writing a production PRD by habit, and that habit is now costing you build time.

---

## Step 1: Write the User Flow as a Numbered List

This is the highest-value section, and it doesn't need a diagram tool or a polished artifact — a numbered list in your shared doc is enough.

**Best Practice Card — Minimum Viable User Flow**

```
1. User lands on [page] → sees [what]
2. User clicks/does [action] → triggers [what happens]
3. App shows [result] → user can [next action]
4. [Continue through the full demo path]

Branch only where it matters for the demo:
- If [error case relevant to demo] → show [specific fallback]
```

Notice this matches the demo-path action list from MVP Features almost exactly — that's intentional. The PRD's user flow section is that same list, just slightly more detailed so two different builders working on different ends of the flow agree on the handoff points between their work.

---

## Step 2: Sketch the Data Model Just Enough to Unblock Parallel Work

You don't need a full schema diagram. You need enough agreement that your frontend developer and backend developer aren't building against two different mental models of what a "project" or "user" object looks like.

> [!TIP]
> A few lines of pseudo-JSON often beats a formal schema diagram for speed: `{ user: { id, email, name }, project: { id, ownerId, title, status } }`. This is fast to write, fast to read, and forces the same clarity a diagram would — without the time cost of actually drawing one.

---

## Using AI to Draft the PRD Fast

This is a genuinely good use of AI under time pressure — converting your team's verbal agreement and earlier module outputs into a clean, shared document in minutes instead of the 30+ minutes it'd take to type and format by hand.

**Prompt: One-Page Hackathon PRD**

```prompt
Generate a one-page hackathon PRD from the following:

One-sentence idea: [from Idea Definition]
Must-Have features (as user actions): [from MVP Features]
Rough user flow notes: [whatever your team has agreed on, even messy]
Rough data entities involved: [list, e.g., "users, projects, exports"]

Structure it as: idea, user flow (numbered steps), data model (brief
pseudo-JSON, not a full schema), and explicit out-of-scope list (so
nobody builds a Nice-to-Have or Cut item by accident).

Keep total length under one page. Do not add sections like success
metrics, market analysis, or long-term roadmap — none of that applies
here.
```

> ** Why this prompt works**
> Explicitly listing the sections to exclude prevents the model from defaulting to a standard production PRD template, which is what most training data associates with the word "PRD" — without that constraint, you'd likely get sections back that waste your limited review time. The explicit out-of-scope list is the most practically useful addition: it directly prevents the parallel-work drift problem this whole module exists to solve.

**Token efficiency note:** Generate this once your idea and feature list are settled, not before. Running this prompt while your team is still debating scope just produces a clean-looking document describing an idea you're about to change — wasted output. Lock scope first, document second.

---

## Validating the PRD Before Splitting Up to Build

- [ ] Every team member has actually read it — not just the person who wrote it
- [ ] The user flow matches the demo-path sequence from MVP Features, with no contradictions
- [ ] The data model sketch is something both frontend and backend builders agree to build against
- [ ] The out-of-scope list explicitly includes anything that was discussed and cut earlier, so it doesn't quietly resurface mid-build
- [ ] It fits on one page or one screen — if it doesn't, something non-essential crept back in

> [!NOTE]
> The real test of a hackathon PRD isn't whether it's well-written. It's whether, four hours into building, someone can glance at it and immediately resolve a disagreement without a meeting. If it can't do that, it didn't capture the decisions that actually mattered.

---

## What's Next

Move to **User Flows** — taking the rough numbered sequence from this PRD and developing it into the actual screen-by-screen path your app will follow.
