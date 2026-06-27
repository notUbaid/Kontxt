# Pitch Deck

🕒 **Estimated Time:** 20 Minutes

---

Your pitch deck is not a document.

It is a visual backdrop for a live performance.

Judges are not reading it. They are half-watching it while listening to you talk and watching your demo. Every slide exists to support what you're saying — not replace it.

The best hackathon decks are minimal, fast, and memorable.

---

## What a Pitch Deck Is Not

Before building, unlearn these instincts:

- It is not a report. Judges don't read paragraphs on slides.
- It is not a portfolio. You are not proving effort — you are creating belief.
- It is not documentation. Your README does that job.
- It is not a slide for every feature. You have a demo for that.

One idea per slide. Every word earns its place.

---

## The 7-Slide Structure

This is the minimum viable pitch deck for a hackathon.

Don't add slides. Cut them.

---

### Slide 1 — The Problem

**Goal:** Make the problem undeniable in under 20 seconds.

Use one of:
- A sharp, specific statistic
- A one-sentence story
- A question the audience recognizes

> **Example**
>
> *"47% of invoices sent by small businesses are paid late. The average delay costs $8,400 a year per business. Most are still chasing payments over email."*

**On the slide:** The stat or story. Nothing else.

> **Warning**
>
> Do not write "Problem Statement:" as a heading. It wastes space and signals a student project.
> Let the content speak. Judges know it's a problem slide.

---

### Slide 2 — The Solution

**Goal:** One sentence. What you built. Who it's for. What it does.

> **Example**
>
> *"Kontxt is a SaaS platform that helps freelancers get paid on time — automatically."*

**On the slide:** Product name. One sentence. Maybe a tagline.

Do not list features here. That's what the demo is for.

---

### Slide 3 — Live Demo

**Goal:** Show a working product doing the core thing.

This is not a slide with screenshots. This is where you switch to your app.

If you include a slide for this transition, make it a single full-bleed screenshot of your product at its most impressive moment. One word: **Demo.**

Follow your golden-path flow. Come back to slides after.

---

### Slide 4 — How It Works

**Goal:** Show technical credibility without losing the room.

Two formats that work:

**Option A — Simple architecture diagram**
```
User → Frontend (React) → API (Node/FastAPI) → DB (Postgres)
                                         ↓
                               AI Layer (Claude / GPT-4)
```

**Option B — 3-step flow**
```
1. User connects their tool
2. Our engine processes + classifies
3. Actionable result delivered instantly
```

Keep it visual. Two to three elements maximum. No walls of text.

> **Tip**
>
> Mention one technically impressive decision you made. Judges who are engineers will notice.
> *"We built a custom scoring engine instead of relying on a third-party API — gives us 3x faster response and full control over the logic."*

---

### Slide 5 — Impact

**Goal:** Answer "why does this matter at scale?"

Use numbers where you have them. Extrapolate where you don't — but be honest about it.

| Has traction | No traction yet |
|--------------|----------------|
| X users signed up during the hackathon | 2.3M freelancers in the US face this problem |
| Tested with 3 real users, positive feedback | SMB invoicing market is $14B |
| Demo account used 47 times in 12 hours | If we capture 1% of that — $140M opportunity |

Both are valid. Don't fake traction you don't have.

---

### Slide 6 — The Team

**Goal:** Make judges believe you can execute.

Format:
```
[Name] — [One relevant credential or role]
[Name] — [One relevant credential or role]
[Name] — [One relevant credential or role]
```

> **Example**
>
> *Sarah Chen — Full-stack engineer, 2× hackathon winner*
> *Marcus Rivera — Product designer, shipped 3 mobile apps*
> *Priya Nair — AI/ML, fine-tuned LLMs for production*

No photos unless your design makes them work. No bios. One line each.

---

### Slide 7 — What's Next

**Goal:** Show vision beyond this weekend. End with intent.

Two to three bullet points. Future roadmap. Then your close.

> **Example**
>
> *→ Mobile app — Q1*
> *→ Accounting software integrations — Q2*
> *→ Launching beta waitlist today*

End with a clear statement, not a trail-off.

> *"We built this in 24 hours. We're not stopping here. Thank you."*

---

## Design Rules

These apply regardless of your visual style.

| Rule | Why |
|------|-----|
| One idea per slide | Cognitive load drops, retention goes up |
| 28pt minimum body text | Judges in the back must be able to read it |
| Maximum 3 colors | More looks like a student project |
| No clip art or stock photos of people smiling | Judges have seen it 1,000 times |
| Your product's UI on slides > abstract icons | Real screenshots build credibility |
| Dark or light — commit to one | Mixed backgrounds signal rushed work |
| Consistent font, size, and spacing | Inconsistency signals rushed work |

---

## AI Prompt — Generate Slide Copy

Use this once you know your product, user, and demo flow.

```prompt
You are designing a 7-slide hackathon pitch deck for a SaaS product.

**Product:** [one sentence]
**Target user:** [who and their pain]
**Core feature:** [what the demo shows]
**Stack highlight:** [most impressive technical choice]
**Team:** [names and one-line credentials]
**Any real traction or numbers:** [users, signups, test feedback — or "none yet"]

For each of these 7 slides, write the exact copy that should appear on the slide:
1. Problem
2. Solution
3. Demo (transition slide only — one sentence)
4. How It Works
5. Impact
6. Team
7. What's Next

Rules:
- One idea per slide
- No bullet points longer than 8 words
- No filler words
- Write for a judge who has seen 12 pitches today and is tired
- Sound confident, not corporate

Return slide-by-slide. Label each one clearly.
```


---

## Common Mistakes

**Too many slides**
Every slide you add is another moment the judge's attention drifts from you. Seven is enough. Ten is too many.

**Features list instead of demo**
If you're showing features on slides, you've already lost. That's what the live demo is for. Slides set up the story. The app proves it.

**Inconsistent design**
One slide light background, next slide dark — signals it was assembled in 20 minutes. Pick a template and stick to it.

**Tiny text**
If you have to say "sorry this is small" out loud, the slide failed. Cut content until the font is large enough to read from ten feet away.

**Team slide too early**
Judges don't care who you are until they care about what you built. Team slide goes near the end.

**No clear close**
Trailing off with "...yeah, that's pretty much it" loses the last impression. Write your final sentence and rehearse it exactly.

---

## Tools

| Tool | Best For | Speed |
|------|---------|-------|
| **Figma** | Full design control, pixel-perfect | Slower |
| **Canva** | Fast, looks polished, templates | Fast |
| **Pitch** | Built for startup decks, great defaults | Fast |
| **Google Slides** | Collaboration, always accessible | Fast |
| **PowerPoint** | Fine. Not special. | Medium |

For a hackathon: **Canva or Pitch**. Both have startup templates that look professional out of the box.

> **Tip**
>
> Don't build slides from scratch under time pressure.
> Find a clean template, strip it to 7 slides, and replace every word and color.
> Customizing a template takes 45 minutes. Building from scratch takes 3 hours.

---

## Validation Checklist

Before you lock the deck:

- [ ] 7 slides or fewer
- [ ] Every slide has one idea
- [ ] No paragraph text on any slide
- [ ] Problem slide lands without explanation
- [ ] Solution slide is one sentence
- [ ] Demo slide transitions cleanly to your app
- [ ] How It Works is a diagram or 3-step flow, not prose
- [ ] Impact slide has at least one real number
- [ ] Team slide is one line per person
- [ ] Final slide ends with a clear statement
- [ ] Font size readable from 10 feet
- [ ] Design is consistent slide to slide
- [ ] Tested on the presentation display

---

## Next

**Demo Script** → Map every click of your demo to every word you'll say.
