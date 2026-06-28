---
title: Pitch Deck
slug: pitch-deck
phase: Phase 3
mode: hackathon
projectType: web app
estimatedTime: 25–40 min
---

# Pitch Deck

A pitch deck for a hackathon is not a startup pitch deck. You are not raising money. You are not proving a market. You are giving judges a visual track to follow while you talk and demo.

That distinction changes everything about what should be on each slide.

---

## The One Rule

> ** Tip**
> Every slide exists to support what you're saying out loud — not to replace it. If a slide can be read and fully understood without you speaking, it has too much text on it.

Slides are a backdrop. Your voice and your live demo carry the actual argument.

---

## Slide-by-Slide Breakdown

### Slide 1 — Title

**Contains:**
- Product name (large, centered, unmissable)
- Tagline (one line, under the name)
- Team name or names (small, bottom of slide)
- Optional: your logo or a single hero visual of the product

**Does not contain:**
- Bullet points
- A description of what you're about to say
- The hackathon name (they know where they are)

> This slide is on screen while you walk up and get settled. It should look like a product, not a PowerPoint default.

---

### Slide 2 — The Problem

This is your most important slide. It needs to make the judge feel something.

**Structure:**
- One sharp sentence that names the specific pain
- One supporting detail: a stat, a quote, a scenario, a visual

**What sharp looks like:**

| Weak | Sharp |
|---|---|
| "Communication is broken in modern workplaces." | "Your team made 12 decisions in Slack last week. None of them are findable today." |
| "Developers waste time on repetitive tasks." | "The average engineer spends 40 minutes a day writing the same boilerplate they wrote yesterday." |
| "Healthcare data is hard to manage." | "Nurses at mid-size hospitals re-enter the same patient data into three different systems per shift." |

Specificity is credibility. Vagueness is forgettable.

---

### Slide 3 — The Solution

**Contains:**
- One sentence: what your product does
- One visual: your app's best screen, or a diagram if the concept is abstract

**Does not contain:**
- A feature list
- Technical details
- Any explanation of how it works internally

This slide should be on screen for about 15 seconds before you say "let me show you" and switch to the live demo.

---

### Slide 4 — [Live Demo — No Slide Needed]

Switch to your actual app here. Do not create a slide for this.

If your demo has a meaningful loading moment or requires navigating between screens, a simple slide that just says **"Live Demo"** can act as a visual anchor while you switch windows — but that's all it needs to be.

---

### Slide 5 — How It Works

This slide is for judges who are technical or curious about what's under the hood. Keep it honest and minimal.

**Options:**

**Option A — Architecture diagram**
A simple boxes-and-arrows diagram. Frontend → Backend → Database → External APIs. Four boxes maximum. Label each with the actual technology.

**Option B — Tech stack list**
```
Frontend    React + Vite + Tailwind
Backend     FastAPI on Cloud Run
Database    Supabase PostgreSQL
AI          Kontxt kontxt-sonnet-4-6 (Anthropic)
Hosting     Vercel + Google Cloud
```

Pick whichever communicates your technical decisions more clearly. Do not include both.

> ** Warning**
> Don't overengineer this slide trying to look impressive. A simple, accurate architecture is more credible than a complex diagram with unnecessary layers. Judges who are engineers will see through padding immediately.

---

### Slide 6 — What We Built in [X Hours]

Optional but high-impact. A brief honest accounting of what was accomplished in the hackathon window.

**Format:**
- 3–5 bullet points, each one a concrete shipped feature
- Keep it factual: "Real-time route calculation with Dijkstra's algorithm" not "Powerful AI-driven routing engine"

This slide exists because judges want to calibrate ambition against time. Showing what you shipped — not what you planned — is always more impressive than a roadmap.

---

### Slide 7 — What's Next

One specific next step. Not a vision. Not a roadmap. One thing.

"The next thing we build is [specific feature] because [specific reason it unlocks value]."

This signals that the team has thought beyond the weekend. It doesn't need to be more than two sentences.

---

### Slide 8 — Team + Close

**Contains:**
- Names (and optionally roles: "Frontend", "Backend", "Design")
- One line about why this team was the right team to build this
- A thank you or open invitation for questions

**Does not contain:**
- LinkedIn URLs nobody will type
- A long biography
- Filler like "We're passionate about solving problems"

---

## Slide Count

Eight slides is enough. Ten is the maximum. If you are above ten slides, you have content that belongs in speaker notes, not on screen.

---

## Design

### The Non-Negotiables

- **One font family.** Display weight for headings, regular weight for body. Don't mix typefaces.
- **One accent color.** Use your product's primary color. Everything else neutral.
- **Consistent slide margins.** Pick a padding and never break it.
- **No slide transitions or animations.** They slow you down and add nothing.
- **No stock photos** of people shaking hands, lightbulbs, or rocket ships.

### The Slide Template

Every slide should have:
- A short title (3–5 words max) at the top
- One primary content element (a visual, a quote, a list, a diagram)
- Breathing room — more whitespace than you think you need

### Typography Scale

| Element | Size | Weight |
|---|---|---|
| Slide title | 36–44pt | Bold |
| Body / bullets | 24–28pt | Regular |
| Supporting detail | 18–20pt | Regular, muted color |
| Labels / captions | 14–16pt | Medium |

Nothing smaller than 18pt on any slide. If it can't fit at 18pt, cut it.

---

## The AI Shortcut for Slide Copy

**Copy Prompt — Problem Slide**

```
I'm pitching a product called [name] at a hackathon.

The problem it solves: [describe in 2–3 sentences]

Write 3 versions of a one-sentence problem statement for a pitch deck slide.

Each version must:
- Name a specific, concrete pain (not a vague category)
- Be under 20 words
- Make someone who has experienced this problem immediately nod
- Avoid: "inefficient", "seamless", "revolutionize", "empower", "leverage"

Return only the 3 options. No explanations.
```

**Copy Prompt — Full Deck Outline**

```
I'm building a hackathon pitch deck for [product name].

Product: [one paragraph description]
Core feature: [the single most impressive thing it does]
Tech stack: [list]
Team size: [N people]
Time built in: [X hours]
Presentation slot: [N minutes]

Generate slide-by-slide copy for an 8-slide hackathon pitch deck.

For each slide provide:
- Slide title (max 5 words)
- Primary content (headline, bullet points, or diagram description)
- Speaker note (one sentence on what to say out loud)

Optimize for a judge who will spend 30 seconds reading each slide while listening to the speaker.
Return only the slide content. No preamble.
```

---

## Pitch Deck Checklist

**Content**
- [ ] Problem statement is specific and visceral — not generic
- [ ] Solution slide has a visual of the actual product
- [ ] Tech stack is accurate and uses real names (not "a powerful AI backend")
- [ ] "What we built" reflects what was actually shipped
- [ ] Next steps is one specific thing, not a five-point roadmap

**Design**
- [ ] Consistent font, size, and color across all slides
- [ ] Every slide is readable from 4 meters away
- [ ] No slide has more than 30 words of text
- [ ] Slide count is 8–10 maximum
- [ ] Product colors match the actual app

**Logistics**
- [ ] Deck is exported to PDF as a backup
- [ ] Deck is accessible on the presentation machine, not only your laptop
- [ ] You have tested how it looks on an external display or projector
- [ ] Presenter mode is off (judges see what you see)

---

## What's Next

Your deck is ready. Pair it with your **Presentation Prep** module run-through and walk in with the full picture: a working product, a clean demo, and a deck that frames both correctly.
