---
title: Design System
slug: design-system
phase: Phase 1
mode: hackathon
projectType: web app
estimatedTime: 10-15 min
---

# Design System

A real design system is a maintained library of components, tokens, and documentation built over months. You have neither the time nor the need for that here. What you need is much smaller and far more achievable: **a handful of locked-in decisions that make every screen your team builds look like it came from the same product.**

This module is about making those decisions once, fast, before parallel building starts — because fixing visual inconsistency after four people have each styled their own screen differently costs far more time than preventing it up front.

---

## The Core Idea: Consistency Reads as Competence

Judges can't evaluate your code quality in a 3-minute demo. They can absolutely see whether your screens feel like one coherent product or four different ones stapled together. A simple design executed consistently beats an ambitious design executed inconsistently, every time, in front of a judge.

> ** Warning**
> The most visible hackathon tell is a login screen built by one person and a results screen built by another, using different fonts, different button styles, and different spacing — because nobody locked in shared decisions before splitting up. This is fixable in 15 minutes at the start. It's expensive to fix after the fact, and judges notice immediately.

---

## Step 1: Lock In the Minimum Viable Tokens

You need exactly four categories of decisions, made once, written down somewhere every team member can see while building.

**Decision Card — The Four Things to Decide Right Now**

| Category | What to Decide | Example |
|---|---|---|
| Color palette | One primary, one accent, neutral grays — 3-4 colors total | Primary: `#4F46E5`, Accent: `#F59E0B`, Neutral: Tailwind's default gray scale |
| Typography | One font for everything (or two: one for headers, one for body) | Inter for both, or a pairing like a bold display font for headers + a clean sans for body |
| Spacing scale | A small fixed set of spacing values, not arbitrary numbers | 4px, 8px, 16px, 24px, 32px — pick from these only |
| Component shapes | Corner radius, button style, card style — pick once | 8px rounded corners everywhere, solid-fill primary buttons, subtle-shadow cards |

Once decided, these four things alone make screens built by different people in parallel look like they belong together, even without a shared component library.

> ** Tip**
> If your stack uses Tailwind CSS (a strong default choice for hackathon speed — see the Tech Stack module), put these decisions directly into your `tailwind.config` as custom theme values. This makes consistency nearly automatic: everyone pulls from the same token set by default instead of having to remember the hex codes.

---

## Step 2: Build 3-4 Shared Components Before Splitting Up

Rather than a full component library, build just the handful of components every screen will actually reuse — a button, an input field, a card, and a loading state. Building these once, together, at the start prevents four people from each building their own slightly-different button.

**Best Practice Card — The Minimum Shared Set**

```
Build once, share everywhere:
1. Button (primary + secondary variant)
2. Input field (text input, matches your form needs)
3. Card/container (the wrapper most content will live in)
4. Loading/processing state (see UI Polish for making this feel
   premium rather than a generic spinner)

Everything else gets built ad hoc per screen — these four are the
only ones worth the upfront shared investment.
```

---

## Step 3: Don't Confuse "Design System" With "Design Exploration"

This is a hackathon trap worth naming directly: spending an hour browsing Dribbble or debating font pairings is design exploration, not design system work. Make these four decisions fast — they don't need to be perfect, they need to be locked and shared.

> ** Note**
> A boring but consistent palette, decided in 10 minutes, beats a beautiful palette debated for an hour. The hour you save goes directly into building and polishing your actual wow moment, which is what's actually being judged.

---

## Using AI to Generate the Starting Tokens Fast

AI is well-suited to generating a coherent starting palette and token set quickly — your job is choosing among reasonable options fast, not generating them from scratch yourself.

**Prompt: Quick Design Token Set**

```
I'm building a [one-sentence description] web app for a hackathon.
I have [hours] left and need to lock design decisions immediately.

Suggest:
1. A 3-4 color palette (primary, accent, 1-2 neutrals) that fits the
   tone of this product — give me hex codes directly, ready to use
2. A single font (or a two-font pairing: header + body) available
   on Google Fonts, easy to set up fast
3. A consistent corner radius and button style recommendation

Keep this decisive — give me one strong recommendation per category,
not multiple options to choose between. I need to move fast, not
deliberate.
```

> ** Why this prompt works**
> Explicitly requesting one decisive recommendation per category, rather than options, matches the actual hackathon need — speed over exhaustive choice. Asking for ready-to-use hex codes and Google Fonts (not generic font names that need licensing checks) keeps the output immediately actionable instead of requiring a second research step you don't have time for.

**Token efficiency note:** This is a single-prompt task. Get your tokens, lock them in, move on — don't iterate through multiple palette options or spend a second conversation refining typography. The cost of indecision here is much higher than the cost of a merely-good-enough palette.

---

## Validating the Design System Before Splitting Up

- [ ] Colors, font(s), spacing scale, and component shapes are written down somewhere every team member can reference while building
- [ ] The 3-4 shared components are built and accessible (in code, not just described) before parallel work begins
- [ ] Every team member has actually looked at the tokens before starting their screen, not just been told they exist
- [ ] The decisions took minutes, not an hour — if your team spent significant time debating this, you spent it on the wrong thing

---

## What's Next

With Phase 1 — Design wrapped up, move to **Phase 2 — Architecture**, starting with **Tech Stack** — choosing the specific tools and frameworks that let you build this flow and design system as fast as possible.
