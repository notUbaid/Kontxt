---
title: Branding
slug: branding
phase: Phase 1
mode: production
projectType: saas
estimatedTime: 20–30 min
---

# Branding

Branding here means the minimum set of visual identity decisions your product needs to look intentional and consistent: a color system, typography, logo, and a few voice guidelines. It is not a full brand strategy exercise — that's marketing work, and over-investing in it before you have users is a classic way to burn weeks on something that will likely change after launch feedback.

Your job in this phase: make decisions precise enough that engineering never has to guess, and loose enough that you're not married to them forever.

---

## Decision 1: Color System

Don't pick "a color." Define a system, or every future feature becomes a new ad-hoc color decision.

> **Decision Card — Minimum Color System**
- **Primary** — main brand color, used for primary actions (buttons, links, focus states)
- **Neutral scale** — 5–9 grays for text, borders, backgrounds (this does most of the visual work in a SaaS UI)
- **Semantic colors** — success, warning, error, info (these matter more than people expect in a data-dense app)
- **Dark mode variants** — even if you ship dark mode later, decide now whether your color system needs to support it, because retrofitting a hardcoded light-only palette is expensive

> [!WARNING]
> Contrast isn't optional, it's an accessibility requirement (WCAG AA: 4.5:1 for normal text, 3:1 for large text). Check this *before* finalizing colors, not after a screen fails an audit.

---

## Decision 2: Typography

| Choice | Recommendation |
|---|---|
| Number of font families | One for UI, optionally one for marketing/headlines. Two is the ceiling for a SaaS product — more adds load time and visual noise. |
| Font source | A modern variable font (Inter, Geist, or similar) covers 90% of SaaS needs and is free, fast, and well-supported |
| Sizing scale | Define a fixed type scale (e.g., 12/14/16/20/24/32px) now — this becomes the backbone of your Design System in the next module |

> [!TIP]
> Don't pick a font because it looks distinctive in a hero image. Pick one that stays legible at 12–14px, because that's where most of your SaaS UI text actually lives — table rows, labels, helper text.

---

## Decision 3: Logo & Marks

For an MVP-stage production SaaS, you need exactly three logo assets, not a full brand book:

- [ ] Full logo (wordmark or wordmark + icon) for marketing site and emails
- [ ] Icon-only mark for favicon, app sidebar, and small UI contexts
- [ ] Social preview image (1200×630) for link unfurling

>  **Best Practice**
> If design isn't your strength, a clean wordmark in your chosen typeface is a perfectly legitimate production logo. A generic, professional mark beats an elaborate one that doesn't scale down to a 16px favicon.

---

## Decision 4: Voice & Tone (Briefly)

You don't need a full voice guide, but decide these two things now so AI-generated copy (error messages, emails, empty states) stays consistent instead of swinging between tones across features:

- **Formality**: professional-and-warm vs. casual-and-playful vs. terse-and-technical
- **Error message style**: does it explain *why* something failed, or just *what* failed? (Production-grade SaaS should generally do both — vague errors are a support burden later.)

---

## Common AI Mistakes to Watch For

- **Generates an entire 40-page brand guideline** when you need a one-page reference. Politely decline — that's not useful at MVP stage.
- **Picks colors with poor contrast** — always verify contrast ratios yourself; AI tools frequently get this wrong.
- **Suggests 3+ font families** — push back and consolidate to one or two.
- **Designs a logo that only works at large sizes** — always check it against a 16px favicon mentally before accepting.
- **Invents brand "values" and taglines you didn't ask for** — scope creep into marketing strategy that isn't this phase's job.

---

## AI Prompt: Generate Your Brand Foundation

```
I'm defining the minimum brand foundation for a production SaaS product (not a full brand strategy — just what engineering and design need to build consistently).

Context:
- Product: [one-sentence description]
- Audience: [who uses this — e.g., engineering teams, solo freelancers, enterprise ops]
- Tone: [pick: professional-and-warm / casual-and-playful / terse-and-technical]

Generate:
1. A color system: primary, a 7-step neutral scale, and 4 semantic colors (success/warning/error/info), each with a hex value and WCAG AA contrast check against white and near-black backgrounds.
2. A type scale: one UI font recommendation (must be a real, freely-licensed variable font) and a 6-step size scale in px.
3. Two sentences describing how error messages should read in this tone, with one example.

Do not generate a tagline, mission statement, or marketing copy. Keep output to a single reference sheet.
```

---

## Validate Before You Move On

- [ ] Primary, neutral, and semantic colors all pass WCAG AA contrast against your backgrounds
- [ ] No more than 2 font families chosen
- [ ] Type scale is fixed and documented (not "figure it out per screen")
- [ ] Logo works legibly at favicon size (16–32px)
- [ ] Voice/tone decision is written down somewhere your team (or future AI prompts) can reference
- [ ] You spent hours on this, not days — if you're iterating on logo concepts for a week, you've over-invested at this stage

> [!TIP]
> Save the color hex values and font name as plain text — you'll paste them directly into your Design System prompt next, instead of re-describing your brand from memory.

---

**Next:** Design System — turn these brand decisions into reusable, documented components.
