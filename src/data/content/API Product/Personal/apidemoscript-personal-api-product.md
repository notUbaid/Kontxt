---
title: Demo Script
slug: demo-script
phase: Phase 6
mode: personal
projectType: api-product
estimatedTime: 15–20 min

---

# Demo Script

API demos are harder to make compelling than UI demos — a terminal running a curl command and printing JSON isn't inherently visual, and it's easy to lose an audience watching it happen in real time with no narration guiding them through why it matters. A script fixes this. Not a word-for-word memorized speech, but a clear beat-by-beat plan for what happens, in what order, and what you say while it happens.

---

## The Decision: Live vs Recorded

| | Live Demo | Scripted Recording |
|---|---|---|
| Impact | Higher — real, in the moment | Lower — audience knows it's polished/edited |
| Risk | Real — network issues, live bugs, typos | None — it's already been captured and works |
| Best for | Small audience, technical crowd who values "it's real" | Larger audience, or as a backup |

> ** Best Practice:** Do a live demo with a recorded backup ready to cut to immediately if something breaks. This gets the credibility of "it's actually live" with the safety net you already built in Presentation Prep.

---

## Demo Beats

```
Hook → Show the pain point → First call, live → Standout moment → Result → Close
```

1. **Hook (10-15 seconds)** — state the problem in one line. Don't build up to it, lead with it.
2. **Show the pain point** — what this looks like without your API, if there's a clear before/after. Skip this beat if there isn't a clean contrast.
3. **First call, live** — the same safe, read-only call from your Quick Start Guide. Fast, guaranteed to succeed, immediately shows real data coming back.
4. **The standout moment** — the technical decision you picked in Presentation Prep, shown in action, not just described. If it's SDK autocomplete, show it typing in an editor — visual and immediate. If it's the atomic usage counter, show two rapid concurrent calls and the correct count.
5. **Result** — let the response sit on screen for a beat. Don't rush past the thing you just demonstrated.
6. **Close** — one line on what's next, pointing to the roadmap or where to try it themselves.

---

## Timing

For a personal-project demo (not a full stage pitch), aim for **2-3 minutes total**. API demos move fast by nature — a terminal response returns instantly, so pacing comes from your narration, not from the tool taking time to "do something" the way a UI demo naturally does.

> ** Tip:** Supplement raw terminal output with an editor showing SDK autocomplete if you have it. Typed-out autocomplete is far more visually convincing of good developer experience than a curl command and a JSON blob — it shows the DX, not just the response.

---

## Rehearsal and Failure Handling

- **Pre-stage your commands.** Live-typing during a real demo is where typos happen under pressure. Have commands ready in a text file or shell history to run with one keystroke, not typed live character by character.
- **Increase your terminal font size** before you start — readable on a shared screen is not the same as readable on your own monitor.
- **Decide your failure cutover in advance.** If a live call fails, don't debug on screen — cut immediately to the recorded backup and keep going. Debugging live in front of an audience burns far more time and credibility than a smooth cut to a backup clip.

> **️ Warning:** Never attempt to fix a bug live during a demo. Cut to backup, keep narrating, move on — the audience remembers a smooth recovery, not a stalled debugging session.

---

## Narrate the Why, Not Just the What

Describing what's visually obvious wastes your narration budget. Use it instead to explain why what's happening matters:

- Weak: "Now I'm calling the endpoint, and here's the response."
- Strong: "This completes in under 100ms because usage is tracked with an atomic Redis increment, not a database round trip — that matters once you're handling concurrent requests at scale."

The second version teaches the audience something and reinforces the standout technical decision you're trying to land.

---

## AI Prompts

**Prompt: Draft the demo script with timing**

```text
Here's my project narrative and standout technical decision: [paste from Presentation Prep].
Here's the specific API call sequence I'll demo: [describe the actual endpoints/commands].

Write a demo script with these beats: Hook, Pain Point (skip if not applicable), First Call, Standout Moment, Result, Close.

For each beat, give: approximate seconds, what happens on screen, and exact narration lines. Total runtime under 3 minutes. Narration should explain why each moment matters, not just describe what's visible.
```

**Prompt: Tighten a script that's running long**

```text
Here's my current demo script with rough timing: [paste].

It's running [X] seconds over a 3-minute target. Identify:
- Any beat that describes something visually self-explanatory and could be cut or shortened
- Any beat that could be combined with another
- The single least essential beat if one has to be cut entirely

Keep the Hook and the Standout Moment beats intact — trim elsewhere first.
```

---

## Validation Checklist

- [ ] Script has clear beats with approximate timing, total under 3 minutes
- [ ] Commands are pre-staged, not live-typed from scratch
- [ ] A failure cutover point is decided in advance, with the recorded backup ready
- [ ] Narration explains why each moment matters, not just what's on screen
- [ ] The full script has been rehearsed at least once end-to-end, out loud

---

## Common Mistakes

> **️ Warning:** Live-typing commands during the actual demo. Pressure causes typos even on commands you know well — pre-staged commands remove this risk entirely.

> **️ Warning:** Narrating only what's visually obvious. If the audience can already see it, use your narration time for the "why" instead — that's the part they can't get from the screen alone.

> **️ Warning:** No decided fallback if something breaks live. Deciding in the moment whether to debug or cut to backup wastes precious seconds and usually ends in debugging live, which is the worst outcome.

---

## Practical Note

Use a seeded demo account with fabricated but realistic data, as established in Presentation Prep — and if the demo used a real API key on screen, rotate it afterward. A key shown live, even briefly, should be treated as exposed.

---

## Implementation Checklist

- [ ] Demo script written with beats, timing, and exact narration lines
- [ ] Commands pre-staged for one-keystroke execution, not live-typed
- [ ] Terminal/editor font size confirmed readable on a shared screen
- [ ] Recorded backup ready and the cutover decision made in advance
- [ ] Full script rehearsed out loud at least once before presenting

---

## What's Next

Next in Phase 6: **Submission Checklist** — the final pass before this project goes public.
