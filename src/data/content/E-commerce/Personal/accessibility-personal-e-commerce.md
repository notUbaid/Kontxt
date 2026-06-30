---
title: Accessibility
slug: accessibility
phase: Phase 1
mode: personal
projectType: e-commerce
estimatedTime: 15–20 min
---

# Accessibility

Accessibility is not a compliance checkbox. It is the practice of building a store that works for every customer — including the 15–20% of people who have a visual, motor, cognitive, or auditory impairment that affects how they use the web.

An inaccessible store loses real customers. A checkout flow that breaks with keyboard navigation, a product image with no alt text, or a button that fails contrast — each is a customer who cannot buy from you.

The good news: accessibility for a personal store is mostly a set of defaults, not a large engineering effort. Get the defaults right and you're 90% of the way there.

---

## The Standard to Target

**WCAG 2.1 Level AA** is the practical target for a personal store. It is the internationally recognized standard, legally required in many markets, and achievable without specialized tooling.

You do not need to target AAA. You need AA.

---

## The Six Non-Negotiables

These are the accessibility failures most likely to directly block purchases.

### 1. Color Contrast

Text must have sufficient contrast against its background.

| Text Type | Minimum Contrast Ratio |
|---|---|
| Body text (< 18px or < 14px bold) | 4.5:1 |
| Large text (≥ 18px or ≥ 14px bold) | 3:1 |
| UI components (buttons, inputs, icons) | 3:1 |

Your Add to Cart button, price text, form labels, and error messages must all pass.

**Tool:** Use the WebAIM Contrast Checker (webaim.org/resources/contrastchecker) or Figma's built-in contrast plugin before finalizing your color tokens.

> ⚠️ **Warning: Light Gray Text**
>
> Light gray on white is the most common contrast failure in e-commerce. Secondary text like variant labels, shipping estimates, and metadata frequently fails. Check every instance of `--color-text-secondary` against its background.

---

### 2. Keyboard Navigation

Every action a mouse user can perform, a keyboard user must also be able to perform.

The critical keyboard flows for e-commerce:
- Browse product listing (Tab through cards, Enter to navigate)
- Open product detail (Enter on card)
- Select variant (Arrow keys within option group)
- Add to cart (Tab to button, Enter to activate)
- Navigate cart, update quantity, remove item
- Complete entire checkout without a mouse

**Test this yourself:** Unplug your mouse. Tab through your entire purchase flow. If you get stuck anywhere, that is a blocker.

**Focus indicators must be visible.** The browser default outline is acceptable but often styled away. If you remove it, you must replace it with something equally visible.

```css
/* Never do this without a replacement */
* { outline: none; }

/* Do this instead */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

### 3. Image Alt Text

Every product image must have descriptive alt text. Screen readers read alt text aloud to visually impaired users.

```html
<!-- ❌ Wrong -->
<img src="candle.jpg" alt="image" />
<img src="candle.jpg" alt="" />  <!-- Only acceptable for purely decorative images -->

<!-- ✅ Correct -->
<img src="candle.jpg" alt="Cedar and Smoke soy candle in a matte black ceramic vessel, 200ml" />
```

**Rules for e-commerce alt text:**
- Include product name, variant (color/material if visible), and relevant visual detail
- Do not start with "image of" or "photo of" — screen readers already announce it's an image
- For variant swatches: `alt="Select color: Slate Blue"`
- For decorative UI icons: `alt=""` (empty, not missing — missing causes the filename to be read aloud)

---

### 4. Form Labels

Every input in your checkout and contact forms must have a visible, associated label.

```html
<!-- ❌ Wrong — placeholder is not a label -->
<input type="email" placeholder="Email address" />

<!-- ✅ Correct -->
<label for="email">Email address</label>
<input type="email" id="email" name="email" placeholder="you@example.com" />
```

Placeholders disappear when the user starts typing. Users with cognitive impairments often lose track of what a field is for mid-entry. Labels prevent this.

**Also required:**
- Error messages must be associated with their specific field (`aria-describedby`)
- Required fields must be indicated (asterisk + legend explaining its meaning)
- Form submission errors must move focus to the error summary

---

### 5. Semantic HTML

Use the right HTML element for the right purpose. Screen readers navigate by element type.

| Element | Use For |
|---|---|
| `<button>` | Actions (Add to Cart, Remove, Submit) |
| `<a href>` | Navigation (links to other pages) |
| `<h1>–<h6>` | Page and section headings (one `<h1>` per page) |
| `<nav>` | Primary and secondary navigation |
| `<main>` | Primary page content |
| `<ul>/<ol>` | Product lists, navigation menus |
| `<img alt="">` | Images with description |

> ⚠️ **The `<div>` Trap**
>
> AI-generated code frequently uses `<div onClick={...}>` for buttons and clickable cards. This is an accessibility failure — div elements are not keyboard-accessible by default and are not announced correctly by screen readers. Always use `<button>` for actions and `<a>` for navigation. If you must use a div, add `role="button"`, `tabIndex={0}`, and keyboard event handlers — but just use a `<button>`.

---

### 6. Cart and Checkout ARIA

The cart and checkout flow require specific ARIA (Accessible Rich Internet Applications) attributes because they involve dynamic content updates.

```html
<!-- Cart item count in nav — announce updates -->
<span aria-label="Cart, 3 items">🛒 3</span>

<!-- "Added to cart" confirmation — announce to screen readers without visual flash -->
<div role="status" aria-live="polite" aria-atomic="true">
  Cedar & Smoke added to cart
</div>

<!-- Checkout step indicator -->
<nav aria-label="Checkout steps">
  <ol>
    <li aria-current="step">Shipping</li>
    <li>Payment</li>
    <li>Review</li>
  </ol>
</nav>

<!-- Loading state during payment processing -->
<button aria-busy="true" disabled>Processing payment…</button>
```

`aria-live="polite"` is the key attribute for e-commerce: it announces dynamic changes (item added, stock updated, error occurred) to screen readers without interrupting what the user is currently doing.

---

## Mobile Accessibility

Mobile introduces additional accessibility requirements.

**Touch target size:** Every tappable element must be at least 44×44px. This includes:
- Add to Cart button ✅ (usually large enough)
- Quantity increment/decrement buttons ⚠️ (frequently too small)
- Remove item from cart ⚠️ (frequently too small)
- Variant swatches ⚠️ (frequently too small)
- Navigation close buttons ⚠️ (frequently too small)

**Zoom:** Never set `user-scalable=no` in your viewport meta tag. Visually impaired users rely on pinch-to-zoom.

```html
<!-- ❌ Wrong -->
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

<!-- ✅ Correct -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## Accessibility Testing Workflow

You do not need to be an accessibility expert. You need a repeatable testing workflow.

**Before launch:**

1. Run your store through the axe DevTools browser extension (free) — it catches ~40% of WCAG failures automatically
2. Tab through the full purchase flow without a mouse
3. Check all color tokens against WCAG AA using a contrast checker
4. Verify all product images have meaningful alt text
5. Test with a screen reader — VoiceOver on Mac (Cmd+F5), NVDA on Windows (free), or TalkBack on Android

**Red flags to watch for:**
- Focus jumps to an unexpected location after a cart update
- Error messages appear visually but aren't announced by screen reader
- Modal dialogs don't trap focus (Tab escapes the modal)
- Dropdowns and custom select components aren't keyboard-accessible

---

## ✅ Accessibility Checklist

- [ ] All text and UI components pass WCAG AA contrast (4.5:1 for body, 3:1 for large/UI)
- [ ] `--color-text-secondary` checked against its specific background color
- [ ] Focus indicator visible and styled (`:focus-visible` rule defined)
- [ ] Full purchase flow navigable by keyboard only
- [ ] All product images have descriptive alt text
- [ ] All form inputs have associated `<label>` elements
- [ ] Checkout error messages associated with their fields via `aria-describedby`
- [ ] `aria-live="polite"` region exists for cart update announcements
- [ ] No `<div onClick>` used where `<button>` or `<a>` is correct
- [ ] One `<h1>` per page, logical heading hierarchy throughout
- [ ] Touch targets ≥ 44×44px for all interactive elements
- [ ] `user-scalable=no` not present in viewport meta tag
- [ ] axe DevTools run with zero critical violations before launch

---

## AI Prompt — Accessibility Audit of a Component

Use this when reviewing AI-generated component code.

```
Review the following React component for accessibility issues.

[Paste component code]

Check for:
1. Missing or incorrect ARIA attributes
2. Keyboard navigation issues (Tab order, Enter/Space activation, arrow key support)
3. Color contrast failures (flag any hardcoded colors)
4. Missing alt text or incorrect alt text usage
5. Semantic HTML issues (divs used instead of buttons/links)
6. Focus management issues
7. Missing form labels or aria-describedby on error states

For each issue found:
- Identify the exact line
- Explain why it's a problem
- Provide the corrected code

Then rate the component: Passes WCAG 2.1 AA / Fails with [N] issues.
```

---

## What Comes Next

With accessibility defaults established, you now know the rules every UI component must follow. The next three modules — Empty States, Error States, and Loading States — apply these rules to the specific UI patterns that most e-commerce stores handle poorly.

**Next: Empty States →**
