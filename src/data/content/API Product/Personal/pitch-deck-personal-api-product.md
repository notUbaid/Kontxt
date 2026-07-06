---
title: Pitch Deck
slug: pitch-deck
phase: Phase 6
mode: personal
projectType: api-product
estimatedTime: 15–20 min

---

# Pitch Deck

Most personal API projects don't need a pitch deck — a good README, a working demo, and a launch post cover most contexts fine. Build one only when a specific situation actually calls for it: an accelerator or grant application, a demo day, or a polished companion piece for a portfolio. This module assumes you have one of those triggers. If you don't, skip this and move to Demo Script.

---

## The Decision: Do You Actually Need One?

| Context | Deck Needed? |
|---|---|
| Accelerator or grant application | Yes — usually required |
| Demo day / pitch event | Yes |
| Portfolio companion piece | Optional — a clean project page often works better |
| General public launch (Show HN, Product Hunt) | No — a README and live link are the right format |

> ** Best Practice:** Don't build a deck speculatively "in case it's useful someday." Build it when a specific opportunity requires it — the narrative from Presentation Prep already covers most other contexts without slides.

---

## Slide Structure

Map directly from the narrative you already built. Ten slides, maximum, is a reasonable ceiling for a solo-project deck:

1. **Title** — project name, one-line description, your name
2. **Problem** — what's broken or missing today, stated plainly
3. **What you built** — the API, in one sentence, plus what it does
4. **Standout technical decision** — the one detail from Presentation Prep, with a diagram or screenshot, not just a bullet
5. **How it works** — one simple architecture diagram, enough for a technical audience to trust it's real
6. **Traction** — real numbers if you have them (usage, uptime, beta feedback); omit this slide entirely if you don't have anything real to show yet, rather than padding it
7. **What's next** — pull directly from your public Roadmap
8. **The ask** — what you're asking for, if applicable (funding, mentorship, feedback, users) — omit if this is portfolio-only

---

## Design Principles

- **One idea per slide.** If a slide needs two sentences to explain what it's showing, it's covering too much.
- **Real screenshots, not mockups.** A screenshot of your actual API response or actual dashboard is more credible than a polished illustration of something that doesn't quite exist yet.
- **Minimal text.** You're presenting the deck, not shipping it as a standalone document — dense paragraphs mean the audience reads instead of listens.
- **One consistent visual style.** Same font, same color palette, same spacing rhythm throughout — inconsistency reads as unfinished even when the content is solid.

> ** Tip:** If you're not confident about visual design, keep it deliberately plain and consistent rather than reaching for a busy template. A clean, minimal deck with real content beats a decorated one with generic stock visuals every time — technical audiences especially discount the latter.

---

## What Not to Include

- **Fabricated market-size or TAM slides.** Unless the specific application explicitly requires this (some accelerator applications do), skip market-sizing theater for a personal project — it reads as performative rather than credible at this stage.
- **Every feature you built.** Same discipline as Presentation Prep — this deck tells one story, it isn't a changelog.
- **Overclaimed traction.** If you have 12 beta users, say 12 beta users. A specific honest number is more credible than a vague "growing user base."

---

## AI Prompts

**Prompt: Turn your narrative into a slide outline**

```text
Here's my project narrative: [paste from Presentation Prep].

Turn this into a slide-by-slide outline using this structure: Title, Problem, What You Built, Standout Technical Decision, How It Works, Traction (only if I have real numbers — ask me if unsure), What's Next, The Ask (only if relevant — ask me if unsure).

For each slide, give: a one-line headline and 1-3 bullet points maximum. No slide should need more than 15 words of body text.
```

**Prompt: Critique a drafted deck**

```text
Here's my current deck content, slide by slide: [paste].

Review it as someone seeing this project for the first time. Flag:
- Any slide with too much text to read in 5 seconds
- Any slide that duplicates information from another slide
- Any claim that sounds vague or unverifiable ("growing rapidly," "many users") without a specific number behind it
- Whether the architecture/technical slide would actually build credibility with a technical audience, or is too vague to matter
```

---

## Validation Checklist

- [ ] Deck only exists because a specific context (application, demo day) requires it
- [ ] Ten slides or fewer, one idea per slide
- [ ] Screenshots are real, not mockups or stock illustrations
- [ ] Traction numbers, if included, are specific and real
- [ ] No fabricated market-size or projection slides unless explicitly required by the application

---

## Common Mistakes

> **️ Warning:** Cramming full sentences onto every slide. A deck you read aloud from is a script, not a deck — if the audience is reading dense text while you talk, neither lands.

> **️ Warning:** Skipping the "how it works" slide entirely. A technical audience specifically wants to see one diagram that proves you understand your own system's architecture — leaving this out reads as either not having one or not being confident in it.

> **️ Warning:** Trying to cover every feature instead of following the narrative arc. A deck that lists everything you built loses the story that makes a stranger care in the first place.

---

## Practical Note

If your "how it works" slide includes an architecture diagram, sanitize it before it goes public — real hostnames, internal service names, specific cloud account details, or exact security configuration don't belong in a shared deck, even a labeled diagram box saying "Postgres" or "Auth Service" conveys the architecture just as well without exposing anything real.

---

## Implementation Checklist

- [ ] Confirmed a specific context genuinely requires a deck before building one
- [ ] Slide outline drafted from the existing narrative, ten slides or fewer
- [ ] Real screenshots captured from the live product, not mockups
- [ ] Traction slide included only if backed by real, specific numbers
- [ ] Architecture diagram sanitized of real infrastructure details before sharing

---

## What's Next

Next in Phase 6: **Demo Script** — scripting the live walkthrough that usually accompanies a deck or presentation.
