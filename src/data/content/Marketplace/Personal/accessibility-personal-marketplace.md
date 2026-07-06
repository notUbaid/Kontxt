---
title: Accessibility
slug: accessibility
phase: Phase 1
mode: personal
projectType: marketplace
estimatedTime: 20-25 min
filename: accessibility-personal-marketplace.md
---

# Accessibility

Your design system defined colors, type, and components. Before those get built into every screen, check that they actually work for everyone — not as a compliance checkbox, but because a meaningful share of any real user base has some access need, and fixing this after the fact means touching every screen twice instead of once.

For a personal project, this module isn't about achieving formal compliance certification. It's about a focused set of practices that cost almost nothing to apply now and are expensive to retrofit later.

---

## Why This Belongs in Phase 1, Not "Later"

Accessibility decisions are cheapest exactly here — at the design system and component level — because fixing color contrast or focus states in one design token affects every screen at once. Discovering an accessibility problem after dozens of screens are built means fixing the same issue dozens of times instead of one.

> **Decision:** This module exists between Design System and Empty/Error/Loading States deliberately. Apply these checks to your design tokens and core components now, before they're stamped across every screen in the modules that follow.

---

## The Short List That Covers Most of the Risk

Full accessibility is a deep topic. For a personal marketplace MVP, these five practices cover the large majority of real-world impact for the effort required:

1. **Color contrast** — text readable against its background
2. **Keyboard navigation** — every interactive element reachable and usable without a mouse
3. **Alt text on images** — listing photos described for screen readers
4. **Form labels** — every input has a real, associated label, not just a placeholder
5. **Focus indicators** — visibly clear which element is focused when tabbing through

> **Tip:** These five cover keyboard users, screen reader users, and low-vision users — the largest practical access needs for a typical marketplace audience. Deeper accessibility work (full WCAG compliance, extensive screen reader testing) can wait until you have evidence it's needed.

---

## Color Contrast: The Cheapest Fix With the Most Impact

Revisit your Design System's token list specifically for this. Text needs sufficient contrast against its background to be readable — common failure: light gray text on white background, which looks "subtle and modern" but is genuinely hard to read for many users, not just those with low vision.

> **Decision:** Run your primary text color against your background color through a contrast checker (many free online tools exist) before finalizing your design tokens. If it fails, darken the text color slightly — this is a five-minute fix now versus relabeling it as a "known issue" forever later.

---

## Forms: Where Marketplaces Most Often Get This Wrong

Your listing creation form and login form are the highest-risk areas. A common but problematic pattern: using placeholder text instead of a real label.

**Problem:** `<input placeholder="Email">` — the label disappears the moment someone starts typing, and many screen readers don't reliably announce placeholder text as a label.

**Fix:** A visible `<label>` element associated with the input, even if styled to look minimal.

```html
<label for="email">Email</label>
<input id="email" type="email" placeholder="you@example.com" />
```

> **Warning:** This is an easy pattern for AI-generated forms to get wrong, because placeholder-only inputs look fine visually and are common in casual examples. Specifically check every generated form for real, associated labels — don't assume a clean-looking form is an accessible one.

---

## Images: Listing Photos Need Alt Text

Every listing photo should have alt text — for a marketplace, ideally pulled from the listing title or a short description, not a generic "image" placeholder.

```html
<img src="listing.jpg" alt="Vintage leather jacket, brown, size medium" />
```

> **Decision:** Make alt text a structural part of your listing data model, not an afterthought added per-image. If your Listing schema (from the Database module, later in this track) includes a title field, default alt text to that title unless a seller provides something more specific.

---

## Keyboard Navigation: A Quick Manual Test

You don't need specialized tools to catch the most common problems. Unplug your mouse (or just don't use it) and try to complete your core flows — create a listing, search, message a seller — using only Tab, Enter, and arrow keys.

What to check:
- Can you reach every button and link by tabbing?
- Is it visually clear which element is currently focused?
- Does pressing Enter on a focused button actually activate it?

> **Tip:** This manual test takes ten minutes and catches the majority of keyboard accessibility problems a typical marketplace MVP will have. Do it once your core screens are built, not as a final pre-launch afterthought.

---

## What's Genuinely Out of Scope for MVP

Not everything in full accessibility guidance needs to happen now. Defer these without guilt:

- Full screen reader testing across multiple tools (NVDA, JAWS, VoiceOver)
- WCAG AAA-level compliance (AA-level contrast is a reasonable target; AAA is a much higher bar)
- Comprehensive ARIA labeling beyond standard semantic HTML

> **Decision:** Standard, semantic HTML elements (real `<button>`, `<label>`, `<input>` elements, not styled `<div>`s pretending to be interactive) get you most of the way to reasonable accessibility for free, before you need to think about ARIA attributes at all. Prioritize using real elements correctly over adding accessibility attributes to fix elements that shouldn't have needed them.

---

## AI Prompts You Can Use

**Prompt 1 — Audit your design tokens for contrast issues:**

```
Here are my design tokens: [paste your color palette from Design
System]. Check each text/background color combination for WCAG AA
contrast compliance. Flag any combination that fails and suggest a
minimally adjusted color that passes.
```

**Prompt 2 — Audit a component for accessibility issues:**

```
Here's my [listing form / login form] component code: [paste it]. Check
for: missing or placeholder-only labels, missing alt text on images,
non-semantic elements used for interactive controls (divs as buttons),
and missing visible focus states. List specific fixes, not general advice.
```

---

## Validating What AI Generates

- **Actually test suggested contrast fixes visually**, not just trust the pass/fail report — a technically passing color can still look wrong against your specific design; eyeball it after adjusting
- **Confirm suggested label fixes are visually acceptable to you** — AI may suggest a fully visible label when you wanted something more minimal (like a floating label pattern); ask for alternatives if the first suggestion doesn't fit your design system
- **Manually keyboard-test after any AI-suggested fix**, don't just trust that the code change worked — confirm it yourself with the Tab-key test described above

---

## Implementation Checklist

- [ ] Design system colors checked for WCAG AA contrast, adjustments made where needed
- [ ] All form inputs have real, associated labels — not placeholder-only
- [ ] Listing images have meaningful alt text wired into the data model
- [ ] Core flows (create listing, search, message) manually tested with keyboard-only navigation
- [ ] Interactive elements use real semantic HTML (`button`, `a`, `input`) rather than styled divs

---

## What's Next

Next: **Empty States** — designing what each screen looks like before any data exists, the first of three "states beyond the happy path" modules in this phase.
