---
title: Pitch Deck
slug: pitch-deck
phase: Phase 6
mode: hackathon
projectType: marketplace
estimatedTime: 25-35 min
filename: pitch-deck-hackathon-marketplace.md
---

# Pitch Deck

You have a scripted demo and polished seed data. The deck is what frames everything before judges see a single screen — it's the difference between "here's an app" and "here's why this app should exist." A weak deck makes judges evaluate your build with low expectations; a sharp one makes them lean in before you've clicked anything.

Most hackathon decks fail the same way: too many slides, too much text, and a problem statement that's generic enough to apply to any marketplace. This module fixes all three in about 8-10 slides.

---

## The Slide Count That Actually Works

| Slide count | What happens |
|---|---|
| 15+ slides | You will not get through them in 3 minutes; judges check out by slide 6 |
| 8-10 slides | Right size for a 3-minute pitch with live demo |
| 3-4 slides | Fine only if your demo is the entire pitch and deck is just backup |

> **Decision:** Build for 8-10 slides, roughly 15-20 seconds each. If a slide needs more than 20 seconds to explain, it's two slides or it's not essential.

---

## The Slide Sequence

1. **Title** — name, one-line tagline, team name
2. **Problem** — the specific pain, ideally with a number or concrete story
3. **Solution** — your one-sentence pitch from the Presentation Prep module
4. **Demo** — a single slide that says "live demo" (this is where you switch to the app)
5. **How it works** — 3-4 icons/steps, not paragraphs
6. **What makes this different** — your specific angle, not generic marketplace features
7. **Tech stack** — brief, shows competence without being the focus
8. **What's next** — one or two realistic next steps, not a five-year roadmap
9. **Team** — names, photos if you have them, one line of relevant background each
10. **Thank you / Q&A** — contact info, repo link, deployed URL

> **Tip:** Slide 4 should be nearly empty — just enough to signal "we're switching to a live demo now." Don't put screenshots of your app on a slide right before showing the actual app; it wastes the moment.

---

## The Problem Slide Is Where Decks Win or Lose

Judges have seen dozens of pitches that open with "marketplaces are a $X billion industry." That's not a problem statement, it's market sizing — save it for slide 6 if you use it at all.

A strong problem slide is specific and visual:

- A real number tied to your exact niche (not the broader industry)
- A short, concrete scenario a judge can picture in 5 seconds
- Ideally one striking visual — a photo, a screenshot of the painful current alternative (a messy Facebook group, a cluttered Craigslist category), or a simple stat callout

> **Decision:** If your problem statement could apply to any marketplace by swapping one word, it's too generic. Rewrite it until it's obviously about your specific niche.

---

## Text Density: Less Than You Think

| Slide type | Max text |
|---|---|
| Title, Demo, Thank you | A few words |
| Problem, Solution | One sentence + one supporting stat or visual |
| How it works | 3-4 short labels, icon-driven |
| Tech stack | Logo row, minimal text |
| Team | Names + one line each |

If a slide has a paragraph on it, judges read instead of listening to you — you lose control of the room's attention. Every slide should be readable in under 3 seconds at a glance, with the presenter providing the actual explanation out loud.

---

## Tech Stack Slide: Signal Competence, Don't Recite a List

A wall of technology logos says less than three well-chosen technical decisions explained in one line each. Pick the choices that show judgment, not just tools used.

**Weak:** "We used React, Next.js, Tailwind, Prisma, Postgres, Vercel, and Uploadthing."

**Stronger:** "Postgres with indexed search for instant filtering, server-side ownership checks on every listing mutation, and Uploadthing for image hosting so we could focus our time on the marketplace logic instead of file infrastructure."

The second version demonstrates engineering decisions were made deliberately — which is exactly what a technically-minded judge is screening for.

---

## Visual Design: What Actually Matters

You don't need a designer. You need consistency.

- **One font family**, two sizes max (headline, body) — mixing fonts is the single fastest way to look unpolished
- **One accent color** beyond black/white/gray — pull it from your app's actual UI so the deck and product feel like one brand
- **Consistent alignment** — left-align everything by default, don't center text blocks
- **Real screenshots from your actual app**, not mockups or stock photos — a judge can tell the difference, and a real screenshot is more credible anyway

> **Best Practice:** Build the deck in whatever tool your team is fastest in (Google Slides, Canva, Figma, even Keynote) — the tool doesn't matter, speed does. Don't burn time learning a new design tool for this.

---

## AI Prompts You Can Use

**Prompt 1 — Draft the problem and solution slides:**

```
I'm pitching [your marketplace, one paragraph description] at a hackathon.
Write the text for a Problem slide (one specific pain point with a
concrete scenario, no generic market-sizing) and a Solution slide (one
sentence, no buzzwords). Keep both under 25 words of on-slide text each
— I'll explain the rest verbally.
```

**Prompt 2 — Tighten the tech stack slide:**

```
Here's what we built: [list your actual stack and 2-3 specific technical
decisions you made and why]. Write a tech stack slide that highlights
the decisions, not just the tool list — one line per decision, written
for judges with mixed technical backgrounds.
```

---

## Validating What AI Generates

- **The problem statement is specific to your niche**, not a generic version AI defaults to — check it passes the "could this apply to any marketplace" test
- **No invented statistics** — if AI suggests a market-size number, verify it or cut it; an unsourced stat that gets questioned in Q&A is worse than no stat at all
- **Slide text is actually as short as you asked for** — AI tends to drift back toward full sentences; trim anything over ~20 words per slide
- **The "what's next" slide is realistic**, not a feature list that implicitly admits the current build is incomplete

---

## Common Mistakes to Avoid

- **Putting your full demo script as bullet points on a slide** — redundant with the live demo, wastes a slide
- **A roadmap slide promising features that make the current build look thin by comparison** — keep "what's next" to one or two believable items
- **Screenshots so small judges can't read them** — full-bleed a screenshot if you use one, don't shrink it into a corner
- **Reading slides verbatim** — slides are a visual aid, not a teleprompter; if you're reading word-for-word, cut the text further

---

## Implementation Checklist

- [ ] Deck is 8-10 slides, each readable in under 3 seconds
- [ ] Problem slide is specific to your niche, not generic market framing
- [ ] One consistent font, one accent color, left-aligned throughout
- [ ] Real app screenshots used, not mockups
- [ ] Tech stack slide highlights decisions, not just a logo list
- [ ] Full deck timed alongside the demo — total pitch under 3 minutes

---

## What's Next

Deck and demo are both ready. Next: **Demo Script** — the word-for-word run of show that ties the deck and the live app together without dead air.
