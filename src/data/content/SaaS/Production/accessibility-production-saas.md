---
title: Accessibility
slug: accessibility
phase: Phase 1
mode: production
projectType: saas
estimatedTime: 20–30 min
---

# Accessibility

Accessibility is not a checklist you run once before launch — it's a set of decisions you bake into your IA, wireframes, and design system now, because retrofitting it into a finished app is far more expensive. This module closes out Phase 1 by making sure everything you've decided so far (navigation, components, color, states) actually holds up for keyboard users, screen reader users, and anyone with low vision or motor impairments.

For production SaaS, this also isn't optional politeness — enterprise customers routinely require WCAG compliance in procurement, and ADA-related lawsuits over inaccessible web apps are common in the US. Treat **WCAG 2.1 Level AA** as your target standard.

---

## Decision 1: The Four Pillars (Quick Mental Model)

> **Decision Card — WCAG's Core Principles**
- **Perceivable** — can users perceive the content (contrast, text alternatives for images, captions)?
- **Operable** — can users operate it with a keyboard alone, with enough time, without seizure-inducing motion?
- **Understandable** — is language clear, are errors explained, is behavior predictable?
- **Robust** — does it work correctly with assistive technology (screen readers, voice control)?

You don't need to memorize WCAG's full spec. You need to check your product against these four questions at every phase.

---

## Decision 2: Keyboard Navigation

> ️ **Warning**
> If a feature can't be fully operated with a keyboard alone — no mouse — it fails accessibility, full stop. This is the single most common failure in AI-generated UIs, because keyboard interaction isn't visually obvious in a screenshot.

Checklist for every interactive screen:

- [ ] Every clickable element is reachable via Tab, in a logical order
- [ ] Every focused element has a **visible** focus indicator (this is why you defined a focus-visible state in your Design System)
- [ ] Modals trap focus inside them and return focus to the trigger element on close
- [ ] Dropdowns and menus are operable with arrow keys and Escape
- [ ] No keyboard trap exists anywhere (a user can always Tab back out)

---

## Decision 3: Screen Reader Support

| Element | What's needed |
|---|---|
| Icon-only buttons | `aria-label` describing the action (e.g., "Delete invoice"), never just an icon with no text alternative |
| Form inputs | Programmatically associated `<label>`, not just placeholder text (placeholders disappear on input and aren't reliably read by all screen readers) |
| Status/error messages | `aria-live` regions so dynamic updates (toast notifications, form errors) are announced without requiring focus to move |
| Data tables | Proper `<th>` headers with scope attributes — critical for SaaS dashboards full of dense tables |
| Images/icons that are purely decorative | `aria-hidden="true"` so screen readers skip them instead of announcing meaningless noise |

---

## Decision 4: Motion & Animation

>  **Best Practice**
> Respect the `prefers-reduced-motion` media query. Vestibular disorders make large animations and parallax effects genuinely harmful, not just distracting. Build your animation system to check this preference and fall back to instant or minimal transitions.

---

## Decision 5: Forms & Errors

Forms are where accessibility failures cause the most real user frustration:

- [ ] Every field has a visible, associated label — not just a placeholder
- [ ] Required fields are marked both visually and programmatically (`aria-required`)
- [ ] Errors are announced via `aria-live`, not just shown as red text near the field
- [ ] Error messages explain *what's wrong and how to fix it* — "Invalid email" is worse than "Enter an email in the format name@example.com"

---

## Common AI Mistakes to Watch For

- **Generates icon-only buttons with no `aria-label`** — always check; this is the single most frequent omission.
- **Uses placeholder text instead of real `<label>` elements** — visually fine, fails screen readers.
- **Skips focus-visible styles or removes the browser default without replacing it** (`outline: none` with nothing in its place) — a very common and very damaging default in AI-generated CSS.
- **Builds custom dropdowns/modals without keyboard handling** — confirm Tab, Escape, and arrow key behavior explicitly; don't assume it's included.
- **Claims WCAG AA compliance without verifying contrast ratios or testing with a screen reader** — never trust an unverified compliance claim, from AI or otherwise.

---

## AI Prompt: Accessibility Review Pass

Run this against components or screens you've already built — it's a review prompt, not a generation prompt.

```
Review the following component/screen for WCAG 2.1 AA accessibility issues. Be specific and cite which guideline each issue violates.

Check explicitly for:
1. Keyboard operability — can every interactive element be reached and activated via keyboard alone?
2. Focus indicators — is there a visible focus state on every focusable element?
3. Screen reader support — are labels, aria-labels, and aria-live regions present where needed?
4. Color contrast — do text and interactive elements meet 4.5:1 (normal text) or 3:1 (large text/icons)?
5. Form accessibility — are labels properly associated, and are errors announced?

For each issue found, state: the WCAG criterion violated, why it matters for a real user, and the minimal fix.

Code/component to review:
[paste component code or screen description]
```

---

## Validate Before You Move On

- [ ] Full critical-path flow (signup → core action) is operable with keyboard only — test this yourself, don't take AI's word for it
- [ ] Every icon-only interactive element has an `aria-label`
- [ ] Every form field has a real associated label
- [ ] Color contrast verified at 4.5:1 minimum for text, 3:1 for large text/icons
- [ ] Focus-visible states exist on every interactive component
- [ ] Reduced-motion preference is respected in any animation
- [ ] You've tested at least the critical path with a screen reader once (VoiceOver on Mac, NVDA on Windows — both free)

> [!TIP]
> Automated tools (axe DevTools, Lighthouse) catch maybe 30–40% of real accessibility issues — contrast, missing labels, structural problems. They cannot catch whether your flow actually makes sense to someone using a screen reader. Run the automated check, then spend ten minutes actually navigating your critical path by keyboard alone.

---

**Phase 1 complete.** Next: System Architecture — translating these product decisions into technical infrastructure.
