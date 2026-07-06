---
title: Design System
slug: design-system
phase: Phase 1
mode: hackathon
projectType: mobile-app
estimatedTime: 20–30 min
---

# Design System

In a hackathon, visual polish is a competitive advantage.

Judges are human. A beautiful app signals craft, confidence, and attention to detail — even when the engineering underneath is held together with duct tape. An ugly app signals the opposite, regardless of how clever the idea is.

You do not have time to design everything from scratch. A minimal design system — decided once, up front — means every screen your team builds looks like it belongs to the same product.

This module takes 30 minutes. It saves hours of inconsistency and rework.

---

## What You Actually Need

A hackathon design system is not Figma components, a token library, or a multi-theme architecture.

It is five decisions, made once, written down, and followed by everyone:

```
1. Color      — 3–4 values that cover every UI case
2. Typography — 2 font choices and a scale of 4–5 sizes
3. Spacing    — A base unit your whole team uses
4. Radius     — One border-radius value for consistency
5. Components — 4–5 reusable pieces that cover 80% of your UI
```

Decide these now. Do not revisit them during the build.

---

## 1. Color

You need four roles. Not four colors — four roles. Some roles can share a color.

| Role | Purpose | Example |
|---|---|---|
| **Primary** | CTAs, active states, key UI elements | Your brand color |
| **Background** | Screen backgrounds | Near-white or near-black |
| **Surface** | Cards, modals, input fields | Slightly offset from background |
| **Text** | Body, labels, headings | High contrast against background |

### Choosing your palette

**Start with your primary color.** This is the one color judges associate with your brand. Make it intentional — not the default blue.

**Then derive the rest.** Background and surface should be near-neutral. Let the primary do the work.

**Dark mode is impressive but costs time.** If your team has a strong UI engineer and time to spare, dark mode looks stunning in demos. Otherwise, pick one and polish it.

>  **Warning:** More than 4–5 colors in a hackathon app is a signal of inconsistency, not richness. Every additional color you introduce is a decision every team member has to make correctly on every screen. Fewer colors, applied consistently, always looks more professional.

### Palette archetypes to avoid

These combinations appear in AI-generated apps constantly. Judges have seen them hundreds of times:

- Warm cream `#F4F1EA` background + terracotta accent
- Near-black background + acid green or neon accent
- Generic blue `#3B82F6` primary on white

If your palette looks like a default Tailwind theme, it will feel like one.

---

## 2. Typography

Two font decisions. That is all.

**Display / Heading font** — Used for large text, titles, and the wow moment. Can have personality.

**Body font** — Used for everything else. Must be highly legible at small sizes on mobile.

### Fast pairing choices

These pairs are professional, distinctive, and available free via Google Fonts:

| Display | Body | Personality |
|---|---|---|
| Syne | Inter | Modern, geometric, techy |
| Playfair Display | DM Sans | Editorial, premium |
| Space Grotesk | Manrope | Clean, startup, forward |
| Cabinet Grotesk | Satoshi | Bold, confident, fresh |
| Fraunces | General Sans | Warm, crafted, human |

Avoid: Roboto/Lato/Open Sans (invisible personality), system font stacks (look like a prototype).

### Type scale — mobile

Define these five sizes and use only these:

```
xs:   11–12px  — Captions, metadata, timestamps
sm:   13–14px  — Secondary labels, supporting text
base: 15–16px  — Body text, input fields, descriptions
lg:   18–20px  — Card titles, section headers
xl:   24–32px  — Screen titles, hero numbers
```

Constrain your team to this scale. Arbitrary font sizes are one of the fastest ways a UI looks unpolished.

---

## 3. Spacing

Pick a base unit. Use multiples of it everywhere.

**Recommended base: 4px**

```
4px   — Tight gaps between related elements (icon + label)
8px   — Internal component padding
12px  — Between list items
16px  — Standard content padding, card internal spacing
24px  — Between sections
32px  — Screen-level top padding, major section gaps
```

The rule: **every margin, padding, and gap value in your codebase must be a multiple of 4.**

This single constraint eliminates the "why does this feel slightly off" problem that plagues quickly built UIs.

---

## 4. Border Radius

One value. Applied consistently.

| Radius | Personality |
|---|---|
| `4px` | Sharp, serious, enterprise |
| `8px` | Balanced, neutral, modern |
| `12px` | Friendly, approachable |
| `16px` | Soft, consumer, playful |
| `9999px` | Pill-shaped — bold, distinctive |

Pick one. Apply it to all cards, buttons, inputs, and modals.

The only exception: use `rounded-full` for avatar images and icon badges regardless of your chosen radius.

---

## 5. Core Components

Define five components before your team starts building screens. These cover the majority of mobile UI patterns.

**Button (Primary)**
- Background: primary color
- Text: white, semibold
- Padding: 16px vertical, 24px horizontal
- Radius: your chosen radius
- Full width on mobile by default

**Button (Secondary / Ghost)**
- Border: 1px primary color
- Text: primary color
- Same padding and radius as primary

**Card**
- Background: surface color
- Radius: your chosen radius
- Padding: 16px
- Optional: 1px border or subtle shadow

**Input Field**
- Background: surface color
- Border: 1px, neutral gray, 2px primary on focus
- Radius: your chosen radius
- Padding: 12–14px
- Label above the input, not as a placeholder

**Bottom Navigation (if applicable)**
- 3–5 items max
- Icon + label below
- Active state: primary color
- Inactive: muted gray

Define each component once in your codebase. Every team member imports it — no one rebuilds it per-screen.

---

## AI Prompt — Design Token Generation

Use this to generate your complete design system as code, ready to drop into your project.

```prompt
Generate a complete design system for a mobile app.

App context:
- App name: [name]
- One-sentence description: [pitch]
- Personality / vibe: [e.g. "focused and minimal", "energetic and bold", "calm and trustworthy"]
- Target user: [who uses this]
- Primary use context: [e.g. "used daily during commute", "used in high-focus work sessions"]

Tech stack: [e.g. React Native with NativeWind, or Expo with StyleSheet]

Generate:
1. A color palette with 4 named roles (primary, background, surface, text) as hex values.
   Avoid generic defaults — make the primary color distinctive and intentional.

2. Typography: recommend a Google Fonts pairing (display + body).
   Provide a 5-step type scale (xs → xl) with px values for mobile.

3. Spacing scale: multiples of 4px from 4 to 32.

4. Border radius: one value with reasoning.

5. Ready-to-use constants file for [my stack] containing all tokens above.

6. A reusable Button component (primary and ghost variants) using these tokens.

7. A reusable Card component using these tokens.

Do not use generic blues or default Tailwind colors.
Make visual choices that feel intentional for this specific app.
```

> **Review the output:** Check that the primary color genuinely reflects your app's personality. AI defaults to safe, competent-but-forgettable palettes. If it feels generic, ask it to make the primary more distinctive and explain why the change serves this specific app.

---

## The Consistency Rule

Define your design system once. Then enforce it.

When a team member builds a new screen, they should be asking:
> "Which existing components do I compose to build this?"

Not:
> "What color should this button be?"
> "What font size should this label use?"
> "How much padding does this card need?"

Every time someone answers those questions from scratch instead of using the system, your app looks slightly less coherent. After twenty screens, it looks like four different apps.

Assign one person on your team as the design system owner. Their job is to say "use the Card component" or "that spacing should be 16px, not 20px" whenever they spot a deviation.

---

## Design System Checklist

- [ ] Color palette defined: 4 roles with hex values
- [ ] Primary color is intentional and not a generic default
- [ ] Font pairing chosen: display + body
- [ ] Type scale defined: 5 sizes (xs → xl) for mobile
- [ ] Spacing base unit set (4px recommended)
- [ ] Border radius chosen: one value applied everywhere
- [ ] Button (primary) component built and imported in the project
- [ ] Button (secondary/ghost) component built and imported
- [ ] Card component built and imported
- [ ] Input field component built and imported
- [ ] All tokens live in one constants or theme file — no hardcoded values in screens
- [ ] Every team member knows where to find the component library

---

## What Comes Next

Design system is locked. Now you choose the foundation you will build on.

Next module: **Tech Stack** — the fastest professional mobile stack for your team's skills, your app's needs, and the time you have left.
