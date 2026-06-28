---
title: Accessibility
slug: accessibility
phase: Phase 1
mode: production
projectType: web-app
estimatedTime: 35–50 min
---

# Accessibility

Accessibility is not a feature. It is a quality standard — the same way performance and security are quality standards, not optional additions.

A production app that is inaccessible excludes users with disabilities (15–20% of the global population), fails legal requirements in many jurisdictions, and scores poorly on SEO (search engines read HTML the same way screen readers do).

The good news: 80% of accessibility compliance comes from getting HTML semantics right. If your design system components use the right elements and ARIA attributes from the start, accessibility is largely free.

---

## The Standard

**Target: WCAG 2.1 Level AA.**

This is the legal requirement in most jurisdictions (EU, UK, US federal, Canada, Australia) and the industry baseline for production software.

WCAG 2.1 AA is organised around four principles:

| Principle | What It Means |
|---|---|
| **Perceivable** | Content can be perceived by all users — seen, heard, or felt |
| **Operable** | UI can be operated by keyboard, voice, and assistive technology |
| **Understandable** | Content and UI behaviour are clear and predictable |
| **Robust** | Content works with current and future assistive technologies |

You don't need to memorise the full WCAG specification. You need to build with correct HTML, verify colour contrast, support keyboard navigation, and test with a screen reader.

---

## Semantic HTML — The Foundation

Semantic HTML is the single highest-ROI accessibility investment. Browsers and screen readers understand semantic elements natively — you get accessibility behaviour for free.

```tsx
// BAD — divs for everything, no semantic meaning
<div onClick={handleSubmit} className="btn">Submit</div>
<div className="nav">
  <div onClick={() => navigate('/home')}>Home</div>
</div>

// GOOD — semantic elements with built-in behaviour
<button type="submit" onClick={handleSubmit}>Submit</button>
<nav aria-label="Primary navigation">
  <a href="/home">Home</a>
</nav>
```

**Semantic element reference:**

| Use Case | Correct Element |
|---|---|
| Clickable action | `<button>` |
| Navigation link | `<a href="...">` |
| Page navigation | `<nav>` |
| Page header | `<header>` |
| Main content | `<main>` |
| Page footer | `<footer>` |
| Sidebar / complementary | `<aside>` |
| Section with heading | `<section>` |
| Independent content | `<article>` |
| Form | `<form>` |
| Grouped fields | `<fieldset>` + `<legend>` |
| Data table | `<table>` + `<th scope>` |

> [!WARNING]
> Never use a `<div>` with an `onClick` where a `<button>` or `<a>` belongs. Divs don't receive keyboard focus, don't respond to Enter/Space, and are invisible to screen readers. Every interactive element must be a natively interactive element.

---

## Heading Hierarchy

Screen reader users navigate pages by heading structure. A broken heading hierarchy is like a document with no table of contents.

```tsx
// BAD — headings chosen for visual size, not hierarchy
<h1>Dashboard</h1>
<h3>Recent Projects</h3>  // skipped h2
<h2>Activity</h2>         // h2 after h3

// GOOD — sequential hierarchy, visual size via CSS
<h1>Dashboard</h1>
<h2>Recent Projects</h2>
<h3>Project Alpha</h3>
<h2>Activity</h2>

// Pattern: one h1 per page, sequential nesting, no skipped levels
```

---

## ARIA — Use Sparingly

ARIA (Accessible Rich Internet Applications) adds accessibility metadata that HTML can't express natively. The first rule of ARIA is: don't use ARIA if native HTML covers it.

```tsx
// BAD — ARIA redundant with semantic HTML
<button role="button" aria-label="Submit form">Submit</button>

// GOOD — native HTML, no ARIA needed
<button type="submit">Submit</button>
```

**When ARIA is genuinely needed:**

```tsx
// Dynamic content updates — alert users to changes
<div role="alert" aria-live="polite">
  {statusMessage}
</div>

// Icon-only buttons — label the action
<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>

// Custom widgets — describe their role and state
<div
  role="combobox"
  aria-expanded={isOpen}
  aria-haspopup="listbox"
  aria-controls="dropdown-list"
>

// Decorative images — hide from screen readers
<img src="/decoration.png" alt="" aria-hidden="true" />

// Loading states
<div aria-busy="true" aria-label="Loading projects">
  <Skeleton />
</div>
```

---

## Focus Management

Keyboard users navigate with Tab and Shift+Tab. Every interactive element must be reachable and have a visible focus style.

### Visible Focus Styles

```css
/* Never do this */
*:focus { outline: none; }          /* removes all focus indication */
button:focus { outline: none; }     /* hides keyboard navigation state */

/* Do this instead — custom focus ring that matches your brand */
*:focus-visible {
  outline: 2px solid var(--color-brand-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* :focus-visible only applies during keyboard navigation
   — not on mouse click — so it's visually unobtrusive */
```

### Focus Trapping in Modals

When a modal opens, focus must be trapped inside it. When it closes, focus must return to the trigger.

shadcn/ui's Dialog component handles this automatically via Radix UI. If building custom:

```typescript
// hooks/use-focus-trap.ts
import { useEffect, useRef } from 'react'

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const focusable = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    first?.focus()

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isActive])

  return containerRef
}
```

### Skip Navigation Link

The first interactive element on every page should be a skip link — allowing keyboard users to bypass repeated navigation and jump directly to main content.

```tsx
// app/layout.tsx — first element in body
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 
             focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:rounded 
             focus:shadow-lg focus:text-brand focus:no-underline"
>
  Skip to main content
</a>

// app/page.tsx — target
<main id="main-content" tabIndex={-1}>
  {children}
</main>
```

---

## Forms

Forms are where accessibility failures are most costly — they directly prevent users from completing actions.

```tsx
// BAD — placeholder only, no label, no error association
<input placeholder="Email address" />
<span className="text-red-500">Invalid email</span>

// GOOD — label, description, error — all properly associated
<div>
  <label htmlFor="email" className="block text-sm font-medium">
    Email address
  </label>
  <input
    id="email"
    type="email"
    aria-describedby={error ? "email-error" : "email-hint"}
    aria-invalid={!!error}
    autoComplete="email"
  />
  {!error && (
    <p id="email-hint" className="text-sm text-neutral-500">
      We'll send your receipt here.
    </p>
  )}
  {error && (
    <p id="email-error" role="alert" className="text-sm text-error">
      {error}
    </p>
  )}
</div>
```

**Form accessibility checklist:**
- Every input has a `<label>` with a matching `htmlFor` / `id` pair
- Error messages are associated with their input via `aria-describedby`
- Errors are announced to screen readers via `role="alert"` or `aria-live`
- `aria-invalid="true"` is set on inputs with validation errors
- `autocomplete` attributes are set on common fields (email, name, password)
- Required fields use `required` attribute (not just visual asterisk)

---

## Colour and Contrast

Already covered in Branding, but the requirements apply at the component level too.

**WCAG AA minimums:**
- Normal text (< 18px or < 14px bold): **4.5:1 contrast ratio**
- Large text (≥ 18px or ≥ 14px bold): **3:1 contrast ratio**
- UI components and graphical objects: **3:1 against adjacent colours**

**Never convey information by colour alone:**

```tsx
// BAD — colour is the only status indicator
<span className="text-red-500">{value}</span>

// GOOD — colour + icon + text
<span className="flex items-center gap-1 text-error">
  <AlertCircleIcon className="h-4 w-4" aria-hidden="true" />
  {value}
</span>
```

---

## Images and Media

```tsx
// Informative image — describe the content
<img src="/chart.png" alt="Monthly revenue grew 42% from January to June 2025" />

// Decorative image — hide from screen readers
<img src="/bg-pattern.svg" alt="" role="presentation" />

// Icon with adjacent text — icon is decorative
<>
  <StarIcon aria-hidden="true" />
  <span>Favourite</span>
</>

// Icon-only button — label the action
<button aria-label="Add to favourites">
  <StarIcon aria-hidden="true" />
</button>
```

---

## Motion and Animation

```tsx
// Respect user's reduced motion preference
import { useMediaQuery } from '@/hooks/use-media-query'

function AnimatedComponent() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.3
      }}
    >
      {children}
    </motion.div>
  )
}
```

```css
/* CSS alternative — applies globally */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Testing Accessibility

**Automated testing — catches ~30–40% of issues:**

```bash
npm install --save-dev @axe-core/react
```

```typescript
// Only in development
if (process.env.NODE_ENV === 'development') {
  import('@axe-core/react').then(({ default: axe }) => {
    axe(React, ReactDOM, 1000)
  })
}
```

Also install the axe DevTools browser extension for in-browser auditing.

**Manual keyboard testing — catches interaction issues:**

Unplug your mouse. Navigate your entire app using only:
- `Tab` / `Shift+Tab` — move between interactive elements
- `Enter` / `Space` — activate buttons and links
- `Arrow keys` — navigate within components (dropdowns, tabs, radios)
- `Escape` — close modals, cancel actions

If you get stuck anywhere, that's an accessibility failure.

**Screen reader testing — catches semantic issues:**

- macOS/iOS: VoiceOver (built in — enable with `Cmd+F5`)
- Windows: NVDA (free) or JAWS
- Android: TalkBack

Test your sign-up and core action flows with a screen reader. If a screen reader user can complete the core action, you've covered the most important ground.

---

## Prompt: Accessibility Review

```
Copy Prompt
```

```
Review the following React component for accessibility issues.

[paste your component code]

Check for:
1. Missing or incorrect ARIA attributes
2. Non-semantic HTML (divs used where buttons/links belong)
3. Missing labels on form inputs
4. Missing alt text on images
5. Focus management issues (focus not trapped in modals, focus not visible)
6. Colour contrast issues (flag any colour pairs I should check)
7. Keyboard operability issues (interactions requiring mouse only)
8. Missing live region announcements for dynamic content

For each issue:
- Severity: Critical (blocks access) / Major (significant barrier) / Minor (inconvenience)
- The specific WCAG 2.1 AA criterion it violates
- The corrected code

Then provide the corrected component in full.
```

---

## Accessibility Checklist

**Semantics**
- [ ] One `<h1>` per page, sequential heading hierarchy (no skipped levels)
- [ ] Navigation wrapped in `<nav>` with `aria-label`
- [ ] Main content in `<main>` with `id="main-content"`
- [ ] No interactive `<div>` or `<span>` elements

**Keyboard**
- [ ] Skip navigation link at top of every page
- [ ] All interactive elements reachable by Tab
- [ ] Visible focus style on all interactive elements (`:focus-visible`)
- [ ] Focus trapped in modals and dialogs
- [ ] Focus returns to trigger element when modal closes
- [ ] Escape closes all modals, dropdowns, and drawers

**Forms**
- [ ] Every input has an associated `<label>`
- [ ] Error messages associated via `aria-describedby`
- [ ] `aria-invalid` set on inputs with errors
- [ ] `required` attribute on required fields
- [ ] `autocomplete` attributes on common fields

**Content**
- [ ] All images have meaningful `alt` text or `alt=""` if decorative
- [ ] Information is never conveyed by colour alone
- [ ] All text passes WCAG AA contrast ratio
- [ ] Animations respect `prefers-reduced-motion`

**Dynamic Content**
- [ ] Status updates announced via `aria-live` or `role="alert"`
- [ ] Loading states communicated to screen readers (`aria-busy`)
- [ ] Page title updates on route changes (especially in SPAs)

---

## What Comes Next

**Loading States** — designing the transitional states between empty and populated, between action and result. Loading states that are accessible, informative, and free of layout shift are the final layer of a production-quality UI.
