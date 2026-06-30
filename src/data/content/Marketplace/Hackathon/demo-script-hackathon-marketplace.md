---
title: Demo Script
slug: demo-script
phase: Phase 6
mode: hackathon
projectType: marketplace
estimatedTime: 20-25 min
filename: demo-script-hackathon-marketplace.md
---

# Demo Script

The deck sets up the pitch. The demo proves it. This module turns "we'll just click around and show it" into a word-for-word run of show — the single highest-leverage thing you can do in your last hour, because an unscripted demo is the most common reason a working app scores lower than it should.

A script isn't about sounding robotic. It's about removing every moment where the presenter has to think about what to click or say next, because every one of those moments reads as hesitation to a judge.

---

## Why "We Know the App, We'll Improvise" Fails

You know your app. Judges don't, and they're watching for the first time under time pressure. Improvising means:

- Navigating to find the right listing instead of having it one click away
- Explaining features in a different order each time you practice, so nobody fully nails the timing
- Discovering live that a seed listing you meant to use doesn't actually demonstrate the feature you wanted

A script fixes all three by deciding, in advance, exactly what gets clicked, said, and shown — in an order that's been timed and rehearsed.

---

## Script Format That Works

Write it as two columns: what you say, what you click. Keep each row under 15 seconds of spoken content.

| Time | Say | Click / Show |
|---|---|---|
| 0:00-0:15 | "[One-sentence pitch from Presentation Prep]" | Stay on title slide |
| 0:15-0:30 | One concrete problem story or stat | Problem slide |
| 0:30-0:40 | "Let's see it in action." | Switch to live app, already logged in as demo buyer |
| 0:40-1:10 | Narrate the search/filter, name what's happening | Type search term, click category chip |
| 1:10-1:40 | Open the listing, message the seller | Click listing card, send a pre-typed message |
| 1:40-2:00 | "Now from the seller side." | Switch to demo seller account (pre-logged-in tab) |
| 2:00-2:30 | Create a listing live, mostly pre-filled | Submit form, listing appears in search instantly |
| 2:30-2:45 | Call out the most impressive technical or UX detail | Show that specific screen/interaction |
| 2:45-3:00 | Restate problem → solution, name one next step | Return to closing slide |

> **Decision:** Pre-fill as much of any "live" form submission as reasonably possible without it looking staged. Typing a full description live burns 20+ seconds of dead air for zero demo value — paste most of it, type only the part you want to visibly demonstrate (like the title).

---

## The Two-Tab Trick

Open two browser tabs before you start: one logged in as your demo buyer, one as your demo seller. Switching tabs is instant; logging in and out live is not. This single setup decision removes the most common dead-air moment in marketplace demos.

> **Tip:** Bookmark the exact listing you'll search for and the exact listing detail page you'll open, so you're never scrolling to find something during the actual pitch.

---

## Narrate the "Why," Not Just the "What"

Clicking through screens silently, or narrating only what's visually obvious ("and here's the search bar"), wastes the verbal half of your demo. Narrate the engineering or product decision behind what's happening instead:

**Weak:** "Here's the search results page."

**Stronger:** "Results filter instantly because we indexed category and status together — this stays fast even as listings grow."

The stronger version does double duty: it shows the feature and signals technical depth, without adding time.

---

## Handling the Inevitable Glitch

Something will lag, a click will miss, or a network call will be slow during the real thing — even with a perfect rehearsal. Plan for it instead of hoping it won't happen.

- **Have a backup screen recording** of a clean full run, ready to play in 2 seconds if live demo fails
- **If something visibly breaks, say one sentence and move on** — "Let's jump to the next step" — never apologize at length or try to debug live in front of judges
- **Don't refresh and retry mid-demo** — it signals panic and eats your remaining time; pivot to the backup recording instead

> **Warning:** The worst demo outcome isn't a glitch — it's a glitch followed by 30 seconds of the presenter trying to fix it live while judges watch. Decide your "if this breaks, we do X" plan before you're in the room, not during.

---

## Rehearsal: What Actually Improves Score

Run the full script, with the deck and the live app, at least three times before presenting, with someone timing it. Specifically check for:

- Total time stays under the limit with margin (aim for 2:45 if the cap is 3:00)
- The two-tab switch is smooth, not fumbled
- Every "say" line matches what's actually happening on screen at that moment
- The presenter isn't reading from notes — by the third run, the script should be internalized, not read

> **Best Practice:** Rehearse in front of at least one person who hasn't seen the app. Your team is too close to the build to notice confusing moments; a fresh viewer catches them immediately.

---

## AI Prompts You Can Use

**Prompt 1 — Draft the script from your demo path:**

```
I'm demoing a marketplace hackathon project. Here's the path: [list the
screens/actions in order, e.g. "search for X, open a listing, message
seller, switch to seller account, create a listing"]. Write a two-column
demo script (what to say / what to click) timed to fit 3 minutes total,
each row under 15 seconds of spoken content.
```

**Prompt 2 — Find the dead air:**

```
Here's my demo script: [paste it]. Identify any step that's purely
mechanical (logging in, navigating, waiting on a form) with no narration
value, and suggest how to cut or pre-stage it so it doesn't cost time
in the live demo.
```

---

## Validating What AI Generates

- [ ] **Every "say" line is something you'd actually say out loud** — AI-drafted scripts can sound like marketing copy; rewrite anything that doesn't match how your team naturally talks
- [ ] **Timing adds up to under your actual limit**, not just close to it — leave margin, nerves slow people down
- [ ] **The script assumes pre-staged state** (logged-in tabs, bookmarked pages) rather than scripting around live navigation delays
- [ ] **No step depends on something fragile** (typing a long unique search term from memory, precise mouse positioning) that's likely to go wrong under pressure

---

## Implementation Checklist

- [ ] Two-column script written, every row under 15 seconds
- [ ] Two browser tabs pre-staged: demo buyer and demo seller, both logged in
- [ ] Exact search term and listing bookmarked, no live navigation needed
- [ ] Backup screen recording saved locally, tested that it plays instantly
- [ ] Full script rehearsed three times, timed, with one outside viewer
- [ ] "If it breaks" plan decided and agreed on by the whole team

---

## What's Next

Your script is timed, rehearsed, and backed up. Last step: **Submission Checklist** — making sure the project itself is actually submitted correctly before the deadline closes.
