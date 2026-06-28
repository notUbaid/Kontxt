---
title: Branding
slug: branding
phase: Phase 1
mode: production
projectType: web-app
estimatedTime: 30–45 min
---

# Branding

Branding is not decoration. It is the visual and verbal identity that tells users who you are before they read a word of your product copy.

For a production app, branding decisions made now become constraints on your design system, your marketing site, your email templates, and every UI component you build. Make them deliberately.

---

## What Branding Covers

| Element | What It Defines |
|---|---|
| **Brand personality** | The adjectives that describe your product's character |
| **Logo** | The mark that identifies you across all surfaces |
| **Colour palette** | Primary, secondary, neutral, and semantic colours |
| **Typography** | Typefaces, weights, and scale |
| **Visual tone** | How the product looks and feels at a glance |
| **Voice** | How the product talks to users in UI copy |

All six must be consistent. A product that has a playful personality but uses cold corporate typography sends a confused signal.

---

## Step 1 — Brand Personality

Before making any visual decisions, define your brand in words.

Choose 3–5 adjectives that describe how your product should feel:

```
Example pairs — pick your position on each spectrum:

Minimal ←——→ Rich
Serious ←——→ Playful  
Technical ←——→ Accessible
Bold ←——→ Understated
Warm ←——→ Cool
Modern ←——→ Classic
Opinionated ←——→ Neutral
```

**Your brand personality directly influences every visual decision:**

- Minimal + Technical → tight spacing, monospace accents, muted palette
- Warm + Accessible → rounded corners, soft colours, approachable typography
- Bold + Modern → high contrast, strong typographic hierarchy, saturated accent
- Playful + Accessible → colour-forward, rounded UI, expressive empty states

Write your 3–5 adjectives before touching any colour pickers.

---

## Step 2 — Logo

For a production v1, your logo needs to work at three sizes:

```
Favicon (16×16, 32×32):   Icon only — no wordmark, must read at tiny size
App header (32–40px tall): Icon + wordmark, horizontal lockup
OG image / marketing:      Full lockup with space to breathe
```

**What makes a production-ready logo:**

- Works in single colour (for print, embossing, dark/light mode)
- Reads clearly at 16×16 pixels (favicon — the hardest constraint)
- Has a vector source file (SVG — not PNG, not JPG)
- Has both light and dark mode variants

**For v1, you have three options:**

**Option A — Wordmark only.** Your product name in a distinctive typeface. Fastest. Works well for short, memorable names.

**Option B — Icon + wordmark.** A simple geometric or symbolic mark plus your name. Most versatile — icon alone works as favicon and app icon.

**Option C — Lettermark.** Your initials or first letter, styled. Works when the full name is long.

> [!TIP]
> Avoid complexity. The best product logos are embarrassingly simple. Stripe is a diagonal line. Linear is an abstract L. Vercel is a triangle. Simple marks scale, reproduce, and are remembered.

---

## Step 3 — Colour Palette

A production colour system has five layers:

### Brand Colours

```
Primary:   Your main brand colour — used for primary CTAs, active states, links
Secondary: Accent or complementary — used sparingly for visual interest
```

### Neutral Scale

```
Neutral-50:   Near white — page backgrounds
Neutral-100:  Subtle backgrounds — cards, inputs
Neutral-200:  Borders — subtle dividers
Neutral-400:  Placeholder text, disabled states
Neutral-600:  Secondary text
Neutral-900:  Primary text, headings
```

A 9-step neutral scale gives you enough variation without chaos. If you're using Tailwind, the built-in slate or zinc scales are excellent starting points.

### Semantic Colours

```
Success:  Green — confirmations, positive states
Warning:  Amber — caution, non-blocking issues
Error:    Red — failures, destructive actions, validation errors
Info:     Blue — neutral informational states
```

### Dark Mode Considerations

Production apps increasingly require dark mode support. If you're using CSS custom properties (variables), dark mode is a theme swap — not a rebuild. Define your colour system as variables from day one.

```css
:root {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-text-primary: #0f172a;
  --color-text-secondary: #64748b;
  --color-border: #e2e8f0;
  --color-brand: #6366f1;
}

[data-theme="dark"] {
  --color-bg-primary: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-border: #334155;
  --color-brand: #818cf8;
}
```

### Colour Accessibility

Every colour combination used for text must meet WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text).

Check at: [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker)

> [!WARNING]
> Light grey text on white background is the most common accessibility failure in production apps. If you can't read it comfortably in a bright room, it fails contrast. Fix it in the colour system, not per-component.

---

## Step 4 — Typography

A production type system needs three decisions:

### Typeface Selection

```
Option A — Single typeface, multiple weights
  Use case: Clean, minimal products
  Example: Inter (free, excellent screen rendering)
  
Option B — Display + body pairing
  Use case: Products with editorial or expressive character
  Example: Cal Sans (headings) + Inter (body)
  
Option C — Monospace accent
  Use case: Developer tools, technical products
  Example: Inter (body) + JetBrains Mono (code, numbers)
```

For most production web apps: **Inter** for body text. It's the industry standard for good reason — readable at every size, free, and available on Google Fonts.

### Type Scale

```
text-xs:    12px — captions, badges, helper text
text-sm:    14px — secondary text, table cells, labels
text-base:  16px — body copy, default
text-lg:    18px — lead text, card titles
text-xl:    20px — section headings
text-2xl:   24px — page subheadings
text-3xl:   30px — page headings
text-4xl:   36px — hero headings (marketing)
```

Use Tailwind's default scale or define your own as CSS custom properties. Establish the scale before building any components.

### Weight Usage

```
font-normal (400): Body text, descriptions
font-medium (500): UI labels, navigation, form labels
font-semibold (600): Headings, card titles, important labels
font-bold (700): Strong emphasis, critical callouts only
```

---

## Step 5 — Visual Tone

Visual tone is expressed through:

**Border radius:**
```
Sharp (0–2px):    Technical, precise, minimal
Moderate (4–8px): Professional, balanced
Rounded (12–16px): Friendly, modern, approachable
Pill (9999px):    Playful, soft — use for badges and tags only
```

**Spacing density:**
```
Compact: Information-dense, for power users and data-heavy UIs
Default: Balanced — works for most products
Relaxed: Spacious, for consumer-facing or content-focused products
```

**Shadow system:**
```
No shadow: Flat design — relies on colour and border for separation
Subtle shadow: Slight depth — cards and dropdowns
Pronounced shadow: Modal depth cues and floating elements
```

**Pick one position on each axis and be consistent.** Mixing sharp corners on some components and rounded on others, or using both flat and shadowed cards, creates visual incoherence.

---

## Step 6 — Brand Voice

Your product talks to users constantly: empty states, error messages, tooltips, button labels, onboarding prompts. The voice should match your brand personality.

Define your voice with three to five principles and a do/don't for each:

```
Example: Minimal, direct, technical brand

Principle: Be direct
  Do:   "Delete project" 
  Don't: "Are you sure you want to proceed with deleting this project?"

Principle: Respect the user's intelligence
  Do:   "Invalid email"
  Don't: "Oops! It looks like that email address might not be quite right!"

Principle: Use plain language
  Do:   "Your changes were saved"
  Don't: "Your modifications have been successfully persisted"
```

---

## Prompt: Generate Brand Identity Spec

```
Copy Prompt
```

```
I'm building a production web app and need to define a complete brand identity.

Product: [name + 1–2 sentence description]
Target user: [description]
Brand personality (my 3–5 adjectives): [list]
Competitors' visual style: [describe — e.g. "corporate and blue", "minimal and dark"]
My visual differentiation goal: [e.g. "warmer and more approachable than competitors"]

Generate a complete brand specification:

1. Colour palette
   - Primary brand colour (hex) with rationale
   - Secondary/accent colour (hex)
   - Neutral scale (9 stops from near-white to near-black, hex values)
   - Semantic colours: success, warning, error, info (hex values)
   - Dark mode equivalents for each

2. Typography
   - Recommended typeface(s) — Google Fonts only, free
   - Type scale (xs through 4xl in px)
   - Weight usage rules

3. Visual tone
   - Border radius recommendation
   - Spacing density recommendation
   - Shadow system recommendation

4. Brand voice
   - 3 voice principles with do/don't examples
   - Tone for: error messages, empty states, success confirmations, onboarding

5. CSS custom properties
   - Full set of CSS variables for the colour system (light mode + dark mode)

Be specific — give actual hex values, actual px values, actual CSS.
```

---

## Branding Checklist

- [ ] Brand personality defined as 3–5 adjectives
- [ ] Logo exists in SVG format, works at favicon size and header size
- [ ] Light and dark mode logo variants created
- [ ] Primary and secondary brand colours chosen with contrast ratios verified
- [ ] Neutral scale defined (9 stops)
- [ ] Semantic colours defined (success, warning, error, info)
- [ ] Dark mode colour tokens defined
- [ ] Typeface(s) chosen — Google Fonts or self-hosted
- [ ] Type scale defined in px
- [ ] Border radius, spacing density, and shadow system decided
- [ ] Brand voice principles written with do/don't examples
- [ ] CSS custom properties written for entire colour system
- [ ] All text/background colour combinations pass WCAG AA contrast

---

## What Comes Next

**Design System** — translating your brand decisions into a reusable component library. Colour tokens, typography scale, spacing, and visual tone become the building blocks of every UI component you'll build.

Branding defines the ingredients. The design system defines how they're used.
