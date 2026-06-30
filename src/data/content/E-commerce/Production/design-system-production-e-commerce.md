---
title: Design System
slug: design-system
phase: Phase 1
mode: production
projectType: e-commerce
estimatedTime: 25–30 min
---

# Design System

A design system is not a Figma file with color swatches. It is a set of decisions — encoded as tokens and components — that make your store look intentional instead of assembled.

Without a design system, every page you build makes micro-decisions independently. The result is a store that feels slightly off everywhere: inconsistent spacing, mismatched type sizes, buttons that are almost-but-not-quite the same across pages.

With one, every page looks like it belongs to the same store.

---

## What a Personal Store Design System Needs

You do not need a 200-token Figma library. You need six categories of decisions, made once, written down, and applied consistently.

```
1. Color
2. Typography
3. Spacing
4. Border radius and shadows
5. Motion
6. Core components
```

Everything else derives from these.

---

## 1. Color

Define your palette as named tokens, not raw hex values. When you reference a color in code, you reference the token — never the hex directly. This lets you change the entire store's appearance by updating one file.

### Minimum Token Set

```css
/* Brand */
--color-primary:        #______  /* Main CTA, links, active states */
--color-primary-hover:  #______  /* Darkened primary for hover */
--color-secondary:      #______  /* Accent, badges, highlights */

/* Neutral */
--color-background:     #______  /* Page background */
--color-surface:        #______  /* Cards, inputs, panels */
--color-border:         #______  /* Dividers, input borders */
--color-text-primary:   #______  /* Body text, headings */
--color-text-secondary: #______  /* Captions, labels, metadata */
--color-text-disabled:  #______  /* Disabled states */

/* Semantic */
--color-success:        #______  /* Order confirmed, in stock */
--color-warning:        #______  /* Low stock, pending */
--color-error:          #______  /* Payment failed, out of stock */
--color-info:           #______  /* Informational callouts */
```

### Color Decisions for E-Commerce

| Token | E-Commerce Consideration |
|---|---|
| `--color-primary` | This is your Add to Cart button. It must pass 4.5:1 contrast on your background. |
| `--color-error` | Payment failures and out-of-stock states. Red is convention — only change if your brand explicitly requires it. |
| `--color-success` | Order confirmation. Green is convention. Don't be clever here. |
| `--color-text-secondary` | Price metadata, shipping estimates, variant labels. Must be readable but clearly subordinate. |

> ⚠️ **Warning: Brand Color as Primary CTA**
>
> If your brand color is light, pastel, or low-contrast, do not use it as your primary button color. CTA buttons must be instantly identifiable and pass accessibility contrast. Use a darker shade or a separate action color.

---

## 2. Typography

A personal store needs three type roles. Not more.

| Role | Used For | Recommendation |
|---|---|---|
| **Display** | Hero headlines, page titles | A characterful face with personality |
| **Body** | Product descriptions, page content | Highly readable at small sizes |
| **UI** | Buttons, labels, navigation, form fields | Clean, system-safe, neutral |

### Type Scale

Define sizes as a named scale. Don't use arbitrary pixel values per element.

```
--text-xs:   12px  /* Captions, legal, metadata */
--text-sm:   14px  /* Secondary labels, helper text */
--text-base: 16px  /* Body text baseline */
--text-lg:   18px  /* Large body, card descriptions */
--text-xl:   20px  /* Section subheadings */
--text-2xl:  24px  /* Page headings, product names */
--text-3xl:  30px  /* Section titles */
--text-4xl:  36px  /* Hero headings (mobile) */
--text-5xl:  48px  /* Hero headings (desktop) */
```

### Line Height and Letter Spacing

```
/* Body text */
line-height: 1.6   /* Comfortable reading */

/* Headings */
line-height: 1.2   /* Tighter for large display text */

/* UI elements (buttons, labels) */
line-height: 1.0   /* Precise vertical centering */
letter-spacing: 0.02em  /* Slight tracking on uppercase labels */
```

> 💡 **Font Loading Performance**
>
> Every font weight is a separate network request. At launch, load a maximum of two weights per typeface — typically Regular (400) and Medium or Semibold (500/600). Add Bold (700) only if your design explicitly requires it. Use `font-display: swap` to prevent invisible text during load.

---

## 3. Spacing

Use a base-8 spacing scale. Every spacing value in your store should be a multiple of 4 or 8.

```
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
--space-20:  80px
--space-24:  96px
```

Consistent spacing is what makes a store feel designed rather than assembled. Arbitrary spacing (17px here, 23px there) is what makes a store feel like a theme demo.

---

## 4. Border Radius and Shadows

### Border Radius

Pick one radius scale and apply it consistently to card types.

```
--radius-sm:   4px   /* Badges, tags, chips */
--radius-md:   8px   /* Buttons, inputs, small cards */
--radius-lg:   12px  /* Product cards, panels */
--radius-xl:   16px  /* Modal dialogs, drawers */
--radius-full: 9999px /* Pills, avatar circles */
```

> 💡 **Tip: Radius Communicates Personality**
>
> Sharp corners (0–4px) feel editorial, minimal, premium. Rounded corners (8–16px) feel approachable, consumer, friendly. Ultra-rounded (16px+) feels playful or modern. Choose based on your Brand Vision adjectives from Phase 0.

### Shadows

Three shadows cover every e-commerce UI need:

```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);             /* Subtle card lift */
--shadow-md: 0 4px 12px rgba(0,0,0,0.08);            /* Hover states, dropdowns */
--shadow-lg: 0 8px 24px rgba(0,0,0,0.12);            /* Modals, drawers */
```

---

## 5. Motion

Define motion once. Apply everywhere.

```css
--duration-fast:   100ms   /* Micro-interactions: checkbox, toggle */
--duration-base:   200ms   /* Most transitions: hover, focus */
--duration-slow:   350ms   /* Page elements: drawer open, modal */

--ease-default:    cubic-bezier(0.4, 0, 0.2, 1)  /* Standard easing */
--ease-out:        cubic-bezier(0, 0, 0.2, 1)    /* Elements entering */
--ease-in:         cubic-bezier(0.4, 0, 1, 1)    /* Elements leaving */
```

Always respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 6. Core Components

Define the visual spec for these components before building any page. They appear on every page.

### Button

```
Primary:    bg=primary, text=white, hover=primary-hover
Secondary:  bg=transparent, border=primary, text=primary
Ghost:      bg=transparent, text=primary, no border
Danger:     bg=error, text=white
Disabled:   opacity=0.4, cursor=not-allowed

Sizes:
  sm:  height=32px, px=12px, text-sm
  md:  height=40px, px=16px, text-base   ← default
  lg:  height=48px, px=24px, text-lg
  xl:  height=56px, px=32px, text-xl     ← Add to Cart
```

### Input

```
Default:  border=border, bg=surface, text=text-primary
Focus:    border=primary, ring=primary/20
Error:    border=error, bg=error/5
Disabled: opacity=0.5, bg=surface

Height: 40px (md), 48px (lg — checkout forms)
Border radius: --radius-md
```

### Product Card

```
Container: bg=surface, radius=radius-lg, overflow=hidden
Image:     aspect-ratio=1:1 (or 3:4 if portrait), object-fit=cover
Body:      p=space-4
Name:      text-base, font-medium, text-primary, 2 lines max (truncate)
Price:     text-lg, font-semibold, text-primary
Compare:   text-sm, text-secondary, line-through, ml=space-2
Hover:     shadow-md, image scale=1.03, transition=base
```

### Badge / Tag

```
In Stock:    bg=success/10, text=success, text-xs
Low Stock:   bg=warning/10, text=warning, text-xs
Sold Out:    bg=surface, text=text-secondary, text-xs, border=border
Sale:        bg=error, text=white, text-xs
New:         bg=primary, text=white, text-xs
```

---

## Design Token File

Write your tokens in one place. For a Tailwind project, this goes in `tailwind.config.js`. For a vanilla CSS project, this goes in `:root` in a `tokens.css` file.

```css
/* tokens.css */
:root {
  /* Colors */
  --color-primary: #1a1a1a;
  /* ... */

  /* Typography */
  --font-display: 'Your Display Font', serif;
  --font-body: 'Your Body Font', sans-serif;
  --font-ui: 'Inter', system-ui, sans-serif;
  /* ... */

  /* Spacing */
  --space-1: 4px;
  /* ... */
}
```

Every component imports from this file. Nothing hardcodes a value.

---

## ✅ Design System Checklist

- [ ] Color palette defined as named tokens (minimum 14 tokens)
- [ ] Primary CTA color passes 4.5:1 contrast ratio on page background
- [ ] Typography: display, body, and UI roles assigned to specific typefaces
- [ ] Maximum 2 font weights loaded per typeface
- [ ] Type scale defined (8–9 named sizes)
- [ ] Spacing scale defined (base-8 system)
- [ ] Border radius scale defined and matched to brand personality
- [ ] 3 shadow levels defined
- [ ] Motion tokens defined with `prefers-reduced-motion` handled
- [ ] Button variants (primary, secondary, ghost, danger, disabled) fully specified
- [ ] Input states (default, focus, error, disabled) fully specified
- [ ] Product card visual spec defined including hover state
- [ ] Badge/tag variants defined for all inventory states
- [ ] All tokens written to a single source-of-truth file

---

## AI Prompt — Generate Your Design Token File

```
I am building a personal e-commerce store with the following brand:

- Brand personality: [3 adjectives from Brand Vision module]
- Visual direction: [your paragraph from Brand Vision module]
- Primary brand color (if decided): [hex or description]
- Font preferences (if any): [names or style e.g. "geometric sans-serif body, editorial serif display"]

Generate a complete CSS design token file (:root variables) for my store including:
1. Full color palette (brand, neutral, semantic) with hex values that match my visual direction
2. Typography tokens (font families + complete type scale)
3. Spacing scale (base-8)
4. Border radius scale
5. Shadow definitions
6. Motion/transition tokens

Then verify: does the primary CTA color pass WCAG AA contrast (4.5:1) against the background? If not, suggest an adjustment.

Output the full :root block, ready to paste into tokens.css.
```

---

## What Comes Next

With your design system defined, every page you design in the remaining Phase 1 modules has a visual language to draw from. Design decisions stop being taste decisions and start being system decisions.

**Next: Branding →**
