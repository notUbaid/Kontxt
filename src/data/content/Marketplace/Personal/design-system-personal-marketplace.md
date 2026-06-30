---
title: Design System
slug: design-system
phase: Phase 1
mode: personal
projectType: marketplace
estimatedTime: 25-35 min
filename: design-system-personal-marketplace.md
---

# Design System

Your wireframes settled layout. Now decide the visual language that gets applied consistently across every screen — colors, type, spacing, and a small set of reusable components. For a solo builder, a design system isn't about looking like a Fortune 500 brand guide. It's about making 50 small visual decisions once instead of fifty separate times, screen by screen, inconsistently.

Inconsistency is the fastest way a solo-built app looks unfinished even when the underlying code is solid. This module is the cheapest fix available for that problem.

---

## Why This Saves Real Time, Not Just Looks Nicer

Without a design system, every new screen requires re-deciding: what blue is "the" blue, how much padding a card gets, what a button looks like. With one, those decisions are made once and reused — both by you and by any AI tool generating UI code for you.

> **Decision:** Define your design system before generating significant UI code with AI tools, not after. An AI tool given consistent design tokens up front produces consistent screens; one given no system improvises differently each time you ask, and you'll spend more time reconciling than you saved.

---

## The Minimum Viable Design System

You don't need a comprehensive design language. You need these five things, decided once:

| Element | What to define | Keep it to |
|---|---|---|
| **Color palette** | 1 primary, 1-2 neutral grays, 1 accent, 1 error/warning | 4-5 colors total |
| **Typography** | 1 font family, 3-4 sizes (heading, subheading, body, small) | One font, few sizes |
| **Spacing scale** | A consistent unit (e.g., 4px or 8px base) used everywhere | One scale, applied consistently |
| **Core components** | Button, input, card — the ones used on nearly every screen | 3-5 components |
| **Border radius / shadows** | One consistent rounding value, one shadow style if used | Pick once, reuse everywhere |

> **Tip:** Constraint is the point. A system with 4 colors and 4 type sizes is *more* professional-looking than one with 12 colors and 8 sizes, because consistency reads as intentional design — variety without a system reads as indecision.

---

## Picking Colors Without a Design Background

You don't need color theory expertise. A reliable, fast approach for a solo project:

1. Pick one primary brand color (this can come from your niche — think about what color fits the feel of your marketplace)
2. Use a neutral gray scale (most design tools or Tailwind's default grays work fine) for text and backgrounds
3. Pick one accent color, ideally a complement to your primary, used sparingly for highlights
4. Use a standard red/orange for errors and a standard green for success — don't get creative here, users expect these conventions

> **Decision:** If you're using Tailwind CSS (common for AI-assisted builds), its default color palette and spacing scale are already a coherent system. For a personal project, picking 2-3 colors from Tailwind's existing palette is faster and more consistent than inventing your own from scratch.

---

## Typography: One Font Is Enough

Pick a single, readable font family (system fonts like Inter, or whatever your framework defaults to, are completely fine) and define 3-4 sizes:

```
Heading:    24-32px, bold
Subheading: 18-20px, semibold
Body:       14-16px, regular
Small:      12-13px, regular (timestamps, metadata)
```

> **Warning:** Resist mixing a "display" font for headings with a different "body" font. It's a common design instinct that adds real visual complexity for marginal benefit — a single, well-chosen font at different weights and sizes does the job for a marketplace MVP.

---

## Marketplace-Specific Component Priorities

Given your wireframes, these components get reused constantly — define them carefully, since you'll see them everywhere:

- **Listing card**: image, title, price — this appears dozens of times per screen on your browse page, so even small inconsistencies compound visibly
- **Primary button**: used for "Message Seller," "Create Listing," "Submit" — one consistent style for the main action across the whole app
- **Input field**: text inputs, used across login, listing forms, search — consistent border, padding, and focus state

> **Decision:** Design the listing card first. It's your highest-repetition component and the one most responsible for whether your browse page looks coherent or chaotic.

---

## Documenting It Somewhere You'll Actually Reference

A design system only helps if you (and your AI tools) actually use it. Write it down once, concretely:

```markdown
## Design Tokens

Primary: #2563EB
Neutral: #F9FAFB (bg), #6B7280 (text-secondary), #111827 (text-primary)
Accent: #F59E0B
Error: #DC2626
Success: #16A34A

Font: Inter
Heading: 28px bold
Body: 15px regular

Spacing unit: 4px (use multiples: 4, 8, 12, 16, 24, 32)
Border radius: 8px
Shadow: 0 1px 3px rgba(0,0,0,0.1)
```

> **Best Practice:** Paste this token list into AI prompts whenever generating new UI components. This is what keeps AI-generated screens visually consistent with each other across separate conversations.

---

## AI Prompts You Can Use

**Prompt 1 — Generate a starter design system from your niche:**

```
I'm building a [your marketplace niche] marketplace. Suggest a minimal
design system: one primary color, neutral grays, one accent color,
error/success colors, one font family, 4 type sizes, a spacing scale,
and border radius/shadow values. Keep it to the smallest set that still
looks intentional — explain briefly why the primary color fits the niche.
```

**Prompt 2 — Generate the core reusable components:**

```
Using this design system [paste your token list], generate a reusable
listing card component, primary button component, and text input
component in [your framework, e.g. React + Tailwind]. Use the exact
tokens I provided — don't introduce new colors or sizes.
```

---

## Validating What AI Generates

- [ ] **Check generated components actually use your defined tokens**, not new ad-hoc values — AI sometimes introduces a slightly different shade of blue or a new spacing value instead of reusing what you specified
- [ ] **Confirm color contrast is readable** — a generated palette can look fine in isolation but fail basic readability (light gray text on white background is a common AI suggestion that looks subtle but is hard to read); this gets formal treatment in the next module, Accessibility, but catch obvious cases now
- [ ] **Verify the component set stays small** — if AI generates 10 component variants when you asked for one button style, consolidate back down; variety here undermines the consistency this module exists to create

---

## Implementation Checklist

- [ ] Color palette defined: 1 primary, 1-2 neutrals, 1 accent, error/success — 4-5 colors total
- [ ] Typography defined: one font family, 3-4 sizes
- [ ] Spacing scale chosen and documented
- [ ] Listing card, primary button, and input field components designed/built using the defined tokens
- [ ] Design tokens documented in one place you'll paste into future AI prompts

---

## What's Next

Next: **Accessibility** — making sure the design system and components you just defined actually work for users with different needs, before it's built into every screen.
