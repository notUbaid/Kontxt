---
title: Pitch Deck
slug: pitch-deck
phase: Phase 6
mode: personal
projectType: ecommerce
estimatedTime: 20-25 min
filename: pitch-deck-personal-e-commerce.md
---

# Pitch Deck

A pitch deck is a different artifact from the recorded walkthrough or case study you may have built in Presentation Prep. It's not a demo — it's a structured argument, built for a moment when someone needs to evaluate your project without you in the room to fill in gaps verbally.

This module is for building that argument well, and for knowing when you don't actually need one.

---

## Decision 0: Do You Need This At All?

Skip this if your only goal is a portfolio piece or a job application — a recorded walkthrough and written case study (from Presentation Prep) cover that better and with less effort.

Build a deck if you have a specific moment ahead of you:

- A mentor, accelerator, or small panel asking you to "pitch" the project
- A capstone or course presentation with a fixed evaluation format
- A conversation with a potential collaborator or early investor about turning this into something bigger
- A structured demo day or showcase event

> **Reframe:** A deck is built for absence — for someone reading it before or after you speak, or for moments where structure matters more than spontaneity. If you'll always be live and interactive, a deck is often overhead you don't need yet.

---

## Decision 1: Tool

For a solo project, the tool should add zero friction. Don't learn new software for this.

| Tool | Best for | Cost |
|---|---|---|
| Google Slides | Fast, collaborative, easy sharing | Free |
| Canva | Pre-built professional templates, less design effort | Free tier sufficient |
| Figma | Full design control, reusable component system | Free tier sufficient |
| PowerPoint/Keynote | If you already work in it daily | Free–low |

> **Best Practice:** Pick whichever tool you already know. The deck's content quality matters far more than which software made it — don't burn an evening learning Figma for a 10-slide deck.

---

## The Structure

This is the order that works because it mirrors how a skeptical reader actually evaluates a project: problem first, proof last.

| # | Slide | Purpose |
|---|---|---|
| 1 | Title | Project name + one-line description. Nothing else. |
| 2 | Problem | The frustration that justifies this existing. Specific, not generic. |
| 3 | Solution | What you built, in one sentence, plus a screenshot |
| 4 | Product Demo | 2-3 screenshots of the actual product flow (browse → cart → checkout) |
| 5 | How It Works | The 1-2 architectural decisions that mattered — not a tech stack list |
| 6 | Business Model | How the store makes money: pricing, margin assumption, unit economics if known |
| 7 | Growth Mechanics | What you built for retention/acquisition — referrals, email, loyalty (from earlier in this phase) |
| 8 | Traction | Real numbers: orders, test conversion rate, anything measured, however small |
| 9 | What's Next | The realistic next 2-3 features or milestones |
| 10 | Ask / Close | What you actually want from this audience — feedback, a job, a collaborator, nothing |

> **Tip:** Ten slides is a ceiling, not a target. If you can make the same argument in 7, do that. Every extra slide is a chance to lose the reader's attention before your strongest point.

---

## Slide-by-Slide Guidance

### Problem (Slide 2)
State it as a real situation, not an abstraction. "Small local sellers don't have an affordable way to run their own checkout" beats "There's a gap in the e-commerce market." Specificity reads as credible; abstraction reads as filler.

### Product Demo (Slide 4)
Use real screenshots from your actual store, not mockups or placeholder text. A screenshot with real (even modest) data is more convincing than a polished mockup with fake data — fake data is instantly recognizable to anyone who's built something before.

### How It Works (Slide 5)
> **Warning:** This is the slide most people get wrong by listing their stack ("Next.js, Postgres, Stripe, Vercel"). A stack list proves you can follow a tutorial. A tradeoff proves you can think. Replace it with: "I chose [decision] because [reasoning], which meant [tradeoff accepted]." One sentence like that is worth more than the entire stack list.

### Business Model (Slide 6)
Even a personal project should show you understand the economics. If you calculated margin impact when deciding on referral rewards or pricing strategy earlier in this build, that calculation belongs here — it's evidence of business thinking, not just engineering.

### Traction (Slide 8)
> **Common Mistake:** Leaving this slide out entirely because "I don't have real users yet." Don't omit it — replace fabricated metrics with honest ones: "12 end-to-end test orders, 0 payment failures, checkout completes in under 1.2s." A small honest number beats a missing slide or an inflated one.

### Ask (Slide 10)
Be explicit. "I'm looking for feedback on the referral mechanics" or "I'm exploring whether this is worth building into a real business" both work — vague closers ("thanks for watching") waste the slide that's supposed to convert attention into action.

---

## Design Principles (Minimal Set)

You do not need a design system for a 10-slide personal-project deck. You need these four rules followed consistently:

1. **One idea per slide.** If you need two sentences to explain a slide's point, it's two slides.
2. **Screenshots over icons.** Real product screenshots build more trust than generic stock icons or illustrations.
3. **Consistent type scale.** Pick one heading size and one body size. Don't resize text per-slide to fit content — cut content instead.
4. **High contrast, minimal color.** One accent color, used sparingly, beats a multi-color deck that looks like a template demo.

---

## Using AI Effectively Here

Use AI to turn your raw decisions and numbers into tight slide copy — not to invent content you don't actually have.

** Copy this prompt:**

```
I'm building a 10-slide pitch deck for a solo e-commerce project: [one-sentence description].

Here's what I have:
- Problem: [your problem statement]
- Product: [what you built, 1-2 sentences]
- Key technical decision: [the one tradeoff worth highlighting]
- Business model: [pricing/margin basics]
- Growth mechanic built: [referrals/email/loyalty - whichever you implemented]
- Real numbers I have: [whatever you've actually measured, even if small]
- What's next: [your honest near-term roadmap]
- The ask: [what you want from this audience]

Using the 10-slide structure (Title, Problem, Solution, Product Demo, How It Works, Business Model, Growth Mechanics, Traction, What's Next, Ask), write tight slide copy — headline + 1-2 supporting lines per slide, no paragraphs.

Do not invent numbers or features I haven't given you. If a slide is weak because I'm missing real content, tell me that directly instead of padding it.
```

This prompt explicitly forbids fabrication, which matters — AI will otherwise happily generate a plausible-sounding metric or feature you never built, and that's the fastest way to lose credibility if someone asks a follow-up question.

---

## Validating the Output

- [ ] Does every claim on every slide correspond to something you actually built or measured?
- [ ] Is the "How It Works" slide a tradeoff, not a tech-stack list?
- [ ] Does the Traction slide have a real number, even a small one — not omitted, not inflated?
- [ ] Could you defend every sentence if someone asked "how do you know that"?
- [ ] Is the Ask slide specific, not a generic thank-you?
- [ ] Did you cut anything that reads as filler rather than argument?

> **Tip:** Read the deck out loud once, slide to slide, with no explanation added. If it doesn't make sense as a standalone argument without you narrating, the structure needs work — a deck has to survive being read without you in the room.

---

## Before You Continue

- [ ] Confirmed a deck is actually the right artifact for your situation
- [ ] Picked a tool you already know
- [ ] Drafted all 10 slides with real content, no fabricated metrics or features
- [ ] "How It Works" slide states a tradeoff, not a stack list
- [ ] Read the deck standalone, with no verbal narration, and it still holds together

**Next up in Growth:** Demo Script — the spoken walkthrough that pairs with this deck (or with the recorded walkthrough from Presentation Prep) when you're presenting live.
