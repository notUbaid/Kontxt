---
title: Design System
slug: design-system
phase: Phase 1
mode: personal
projectType: web app
estimatedTime: 30–45 min
---

# Design System

A design system for a personal project is not Airbnb's design language or Google's Material Design. It's a small set of decisions — colors, type, spacing, components — made once, written down, and applied consistently everywhere.

The payoff: your app looks intentional instead of assembled. Every screen feels like it belongs to the same product. And you stop making the same micro-decisions over and over while building.

---

## Why This Comes Before Building

Most solo developers skip this step and design in the browser — picking colors, font sizes, and spacing on the fly as they build components.

The result is an app where every screen looks slightly different. The button on the login page is a different shade of blue than the button on the dashboard. Headings are inconsistently sized. Spacing is arbitrary.

> ** Warning**
> Inconsistency is the thing users notice most, even when they can't name it. It makes an app feel unfinished regardless of how much work went into it. A consistent visual system costs less than an hour to define and pays off on every screen you build after it.

---

## The Four Decisions

A personal project design system has four parts. Nothing more.

### 1. Color

You need five colors. That's it.

| Role | Purpose |
|---|---|
| **Primary** | Buttons, links, active states, key highlights |
| **Background** | Page background |
| **Surface** | Cards, panels, inputs — anything raised above background |
| **Text** | Primary body text |
| **Muted** | Secondary text, placeholders, labels, disabled states |

Optional sixth: a **Danger** color for errors, destructive actions, and warnings. Use red. Don't invent something unusual.

**How to pick your Primary color:**

Pick something that reflects the tone of your product. A productivity tool feels different from a creative tool. A finance app feels different from a social app.

If you're genuinely unsure, these are safe, professional starting points:

| Tone | Color | Hex |
|---|---|---|
| Trustworthy / neutral | Blue | `#2563EB` |
| Growth / health | Green | `#16A34A` |
| Creative / bold | Violet | `#7C3AED` |
| Warm / approachable | Orange | `#EA580C` |
| Minimal / technical | Slate | `#475569` |

Pick one. Apply it as your Primary. Everything else follows from it.

> ** Tip**
> For light mode apps, use `#FFFFFF` or a very light neutral (`#F8FAFC`) as Background, `#FFFFFF` as Surface, `#0F172A` as Text, and `#64748B` as Muted. These work with almost any Primary color without fighting it.

---

### 2. Typography

You need two things: a font and a type scale.

**Font:**
One font family is enough. Inter is the modern standard for web apps — readable at every size, free, and available on Google Fonts. It reads as professional without being distinctive.

If you want personality, pick one display or heading font and use Inter for body text:

| Personality | Heading Font | Body Font |
|---|---|---|
| Technical / developer | JetBrains Mono | Inter |
| Warm / editorial | Lora | Inter |
| Modern / clean | Sora | Inter |
| Bold / confident | Outfit | Inter |

```html
<!-- In your index.html -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Type Scale:**
Five sizes. Use them for everything. Don't invent intermediate sizes.

| Name | Size | Weight | Use |
|---|---|---|---|
| `text-xs` | 12px | 400 | Captions, badges, timestamps |
| `text-sm` | 14px | 400–500 | Labels, secondary content, table data |
| `text-base` | 16px | 400 | Body text, default |
| `text-lg` | 20px | 600 | Card headings, section titles |
| `text-xl` | 28–32px | 700 | Page headings, hero text |

If you're using Tailwind, these map directly to its default scale. Use the scale, don't deviate from it.

---

### 3. Spacing

Pick a base unit of **8px** and use only multiples of it: 4, 8, 16, 24, 32, 48, 64.

That's the entire system. Everything — padding, margin, gap, border-radius — should be one of these values.

```css
/* Good */
padding: 16px 24px;
gap: 8px;
margin-bottom: 32px;
border-radius: 8px;

/* Bad */
padding: 13px 19px;
gap: 11px;
margin-bottom: 27px;
```

In Tailwind: `p-2`, `p-4`, `p-6`, `p-8`, `p-12`, `p-16` — these map to the 8px scale. Use only these. Avoid arbitrary values like `p-[13px]`.

---

### 4. Core Components

Define the visual style of four components before you build your first screen. These appear everywhere.

**Button (Primary)**
```css
background: [Primary color]
color: white
padding: 10px 20px (or p-2.5 px-5 in Tailwind)
border-radius: 8px
font-weight: 600
font-size: 14px
hover: [Primary color, 10% darker]
transition: 150ms ease
```

**Input**
```css
border: 1px solid [Muted color, lighter]
border-radius: 8px
padding: 10px 14px
font-size: 14px
focus: border-color [Primary], outline: 2px [Primary at 30% opacity]
background: [Surface color]
```

**Card**
```css
background: [Surface color]
border: 1px solid [border color — slightly darker than surface]
border-radius: 12px
padding: 24px
```

**Badge / Tag**
```css
background: [Primary at 10% opacity]
color: [Primary]
border-radius: 9999px (fully rounded)
padding: 2px 10px
font-size: 12px
font-weight: 500
```

---

## Putting It Together: Your Design Token File

Write your design system as CSS custom properties in a single file. Every component references these variables — nothing has hardcoded color or spacing values.

```css
/* src/styles/tokens.css */

:root {
  /* Colors */
  --color-primary:     #2563EB;
  --color-primary-hover: #1d4ed8;
  --color-bg:          #F8FAFC;
  --color-surface:     #FFFFFF;
  --color-text:        #0F172A;
  --color-muted:       #64748B;
  --color-border:      #E2E8F0;
  --color-danger:      #DC2626;

  /* Typography */
  --font-sans:         'Inter', system-ui, sans-serif;
  --text-xs:           0.75rem;
  --text-sm:           0.875rem;
  --text-base:         1rem;
  --text-lg:           1.25rem;
  --text-xl:           1.75rem;

  /* Spacing */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  16px;
  --space-4:  24px;
  --space-5:  32px;
  --space-6:  48px;
  --space-7:  64px;

  /* Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-full: 9999px;
}
```

If you're using Tailwind, configure these in `tailwind.config.js` under `theme.extend` instead.

---

## Using AI to Generate Your Design System

**Copy Prompt**

```
I'm building a personal web app. Here's my PRD: [paste PRD]

Based on the product's purpose and target user, suggest a design system with:

1. A primary color with hex value and the reasoning for the choice
2. Background, surface, text, muted, and border color hex values that work with it
3. A font pairing (heading + body) from Google Fonts, with the reasoning
4. The four core component styles: button, input, card, badge

Format it as a CSS custom properties block I can paste directly into my project.

Prioritize: readability, professionalism, and a visual tone appropriate for [describe your product's emotional register — e.g., "calm and focused", "energetic and social", "minimal and technical"].
```

---

## Validation Checklist

Before you start building any UI:

- [ ] Five core colors are defined with hex values
- [ ] Color contrast between Text and Background passes readability (4.5:1 ratio minimum)
- [ ] One font family is chosen and loaded
- [ ] Type scale has five named sizes used consistently
- [ ] Spacing follows the 8px grid — no arbitrary values
- [ ] Button, input, card, and badge styles are defined
- [ ] All values are written as CSS variables or Tailwind config — nothing hardcoded inline

---

## What's Next

Move to **Responsive Design** — deciding how your app adapts to different screen sizes, and what that means for your layout and component decisions.
