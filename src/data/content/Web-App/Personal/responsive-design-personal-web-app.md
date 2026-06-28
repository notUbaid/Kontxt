---
title: Responsive Design
slug: responsive-design
phase: Phase 1
mode: personal
projectType: web app
estimatedTime: 20–30 min
---

# Responsive Design

Responsive design is not about making your app look good on every device. It's about deciding which devices matter for your users and making deliberate layout decisions for each of them.

Done right, it's a one-time investment that prevents a class of problems from ever appearing. Done wrong — or skipped entirely — it produces an app that works on your laptop and looks broken everywhere else.

---

## Start With a Decision, Not a Assumption

Before writing a single media query, answer this honestly:

**Where will your target user primarily use this app?**

| Primary Use Context | Implication |
|---|---|
| Desktop / laptop (work tool, dashboard, productivity) | Build desktop-first, ensure mobile doesn't break |
| Mobile (on the go, quick interactions, daily habits) | Build mobile-first, invest in touch interactions |
| Both equally | True responsive design — more work, worth it if both matter |
| Unknown | Default to mobile-first — more users access the web on mobile than desktop globally |

Your answer shapes every layout decision in this module.

> ** Tip**
> Check your PRD. Your target user's context usually tells you. A "freelance designer reviewing client work" is almost certainly on desktop. A "commuter tracking daily habits" is almost certainly on mobile. If you genuinely don't know, mobile-first is the safer default.

---

## The Three Breakpoints You Actually Need

You don't need breakpoints for every device ever made. You need three:

| Name | Width | Targets |
|---|---|---|
| **Mobile** | `< 640px` | Phones, small screens |
| **Tablet** | `640px – 1024px` | Tablets, large phones landscape |
| **Desktop** | `> 1024px` | Laptops, monitors |

In Tailwind, these are `sm:`, `md:`, and `lg:` prefixes. In CSS:

```css
/* Mobile styles — default, no media query needed */

/* Tablet */
@media (min-width: 640px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

Three breakpoints. Start there. Add more only if a specific layout genuinely needs it.

---

## Mobile-First vs Desktop-First

**Mobile-first** means you write your base styles for mobile and add complexity for larger screens:

```css
/* Base: mobile */
.container { padding: 16px; }

/* Desktop: override */
@media (min-width: 1024px) {
  .container { padding: 48px; max-width: 1200px; margin: 0 auto; }
}
```

**Desktop-first** is the reverse — base styles for desktop, simplify for mobile:

```css
/* Base: desktop */
.sidebar { display: block; width: 280px; }

/* Mobile: hide or stack */
@media (max-width: 640px) {
  .sidebar { display: none; }
}
```

Neither is universally right. Use mobile-first if your primary user is on mobile. Use desktop-first if your app is inherently a desktop tool (dashboards, data tables, editors).

> ** Warning**
> Mixing both approaches in the same codebase creates conflicts that are painful to debug. Pick one and apply it consistently.

---

## Layout Patterns by Screen

These are the four layout patterns that cover almost every personal web app screen:

### Pattern 1 — Single Column (Mobile)
Everything stacks vertically. Full-width sections. Navigation moves to bottom bar or hamburger menu.

```
[ Header / Nav ]
[ Hero / Main Content ]
[ Cards — full width, stacked ]
[ Footer ]
```

### Pattern 2 — Two Column (Tablet)
Content + sidebar, or two-column card grid. Navigation stays at top.

```
[ Header / Nav                    ]
[ Main Content    | Sidebar       ]
[ Card ]  [ Card ]  [ Card ]
[ Footer                          ]
```

### Pattern 3 — Three Column (Desktop)
Full dashboard layout. Left nav, main content, optional right panel.

```
[ Header                                    ]
[ Left Nav | Main Content  | Right Panel   ]
[ Footer                                    ]
```

### Pattern 4 — Centered Content (Any width)
For forms, articles, settings, auth pages. Max-width container, centered.

```css
.content {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 16px;
}
```

This pattern works at any screen size and is the right choice for any page that is primarily text, a form, or a single focused action.

---

## The Practical Checklist: What to Make Responsive

Not everything needs equal responsive attention. Focus here:

**High priority — always responsive:**
- [ ] Navigation (collapses or moves on mobile)
- [ ] Main content area (never overflows horizontally)
- [ ] Forms (inputs are full-width on mobile, manageable width on desktop)
- [ ] Cards and grid layouts (stack on mobile, grid on larger screens)
- [ ] Text — font sizes readable on small screens without zooming

**Medium priority — fix if it breaks:**
- [ ] Tables (scroll horizontally on mobile rather than overflow)
- [ ] Modals and dialogs (full-screen on mobile, centered overlay on desktop)
- [ ] Sidebars (hidden on mobile, accessible via toggle if needed)

**Low priority for MVP:**
- [ ] Complex data visualizations
- [ ] Drag-and-drop interactions
- [ ] Print styles

---

## The Navigation Decision

Navigation is the most device-specific part of any web app. Decide your pattern before building:

| Pattern | Best For |
|---|---|
| **Top bar (always visible)** | Desktop-primary apps, small nav sets (3–5 items) |
| **Bottom tab bar** | Mobile-primary apps, 3–5 main sections |
| **Sidebar (desktop) + hamburger (mobile)** | Dashboard apps, many nav items |
| **Hamburger only** | Content-heavy sites, minimal nav |

> ** Warning**
> Hamburger menus on desktop are a sign the navigation wasn't thought through. If your desktop layout needs a hamburger, you have too many nav items or the wrong layout pattern.

---

## Responsive Typography

Font sizes that work on desktop often feel too large or too small on mobile. A minimal responsive type approach:

```css
/* Mobile defaults */
:root {
  --text-xl: 1.5rem;   /* 24px — page headings */
  --text-lg: 1.125rem; /* 18px — section headings */
  --text-base: 1rem;   /* 16px — body */
}

/* Desktop — slightly larger headings */
@media (min-width: 1024px) {
  :root {
    --text-xl: 2rem;     /* 32px */
    --text-lg: 1.25rem;  /* 20px */
  }
}
```

Body text (`text-base`) rarely needs to change between breakpoints. Headings do.

---

## Using AI to Generate Responsive Layouts

**Copy Prompt**

```
I'm building a personal web app. Here is my PRD: [paste PRD]

I need a responsive layout for [specific screen — e.g., "the main dashboard"].

The screen contains: [list the elements — e.g., "a left sidebar with navigation, a main content area with a card grid, and a header with user avatar and search"]

Requirements:
- Mobile (< 640px): [describe what should happen — e.g., "sidebar hidden, bottom tab bar, cards stack single column"]
- Tablet (640–1024px): [e.g., "sidebar hidden behind toggle, cards in 2-column grid"]
- Desktop (> 1024px): [e.g., "sidebar always visible, 3-column card grid"]

Generate the HTML structure and CSS (or Tailwind classes) for this layout. Use CSS custom properties from my design system for colors and spacing.

Return only the code. No explanations.
```

---

## Validating Responsiveness

Before moving to Architecture, test your layouts at three widths:

- [ ] 375px (iPhone SE — the smallest common phone)
- [ ] 768px (iPad portrait)
- [ ] 1440px (standard laptop/monitor)

In Chrome DevTools: press `Cmd+Shift+M` (Mac) or `Ctrl+Shift+M` (Windows) to enter device toolbar, then type in exact widths.

At each width check:
- [ ] No horizontal scrollbar appears
- [ ] Text is readable without zooming
- [ ] Tap targets (buttons, links) are at least 44×44px on mobile
- [ ] Navigation is accessible
- [ ] No content is clipped or hidden unintentionally

---

## What's Next

Move to **Tech Stack** — choosing the right frontend framework, backend, database, and hosting for a personal project that you'll actually maintain.
