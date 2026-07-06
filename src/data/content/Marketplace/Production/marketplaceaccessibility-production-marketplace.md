---
title: Accessibility (a11y)
slug: accessibility
phase: Phase 1
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Accessibility (a11y)

In a personal project, accessibility is a nice-to-have. In a production marketplace, it is a legal and financial mandate. 

If your marketplace successfully scales, an inaccessible frontend exposes your company to ADA (Americans with Disabilities Act) compliance lawsuits. Furthermore, you are artificially restricting your Total Addressable Market (TAM) by excluding users who rely on screen readers or keyboard navigation. 

Accessibility cannot be bolted onto an application in Phase 6. It must be architected into your React components in Phase 1.

---

## The True Cost of Inaccessibility

Production marketplaces fail accessibility audits in three predictable areas. Fixing these after the fact requires auditing every single component in your codebase.

1. **The Modal Trap:** A user opens a "Checkout" modal. If they press the `Tab` key, their focus should loop inside the modal (A Focus Trap). If it escapes the modal and navigates the page behind it, a keyboard-only user can accidentally execute hidden actions.
2. **The Missing Label:** Using a `placeholder` attribute instead of a semantic `<label>` tag. Screen readers often ignore placeholders, making your checkout form impossible to complete for visually impaired users.
3. **The Invisible Focus State:** Hiding the blue outline (`outline: none`) because it "looks ugly," without replacing it with a custom `:focus-visible` ring. This makes keyboard navigation impossible.

> [!WARNING]
> If a user cannot check out using only their keyboard, your marketplace is broken. Period.

---

## WCAG AA: The Production Standard

Your production architecture should target WCAG 2.1 AA compliance. 

### 1. Contrast Ratios
Text must have a contrast ratio of at least `4.5:1` against its background (or `3:1` for large text). 
*Architectural Fix:* Use a contrast checker before defining your Design System tokens. Do not trust your monitor.

### 2. Semantic HTML
Never use a `<div>` with an `onClick` handler when you mean a `<button>`. 
*Architectural Fix:* A `<button>` natively supports the `Space` and `Enter` keys and communicates its role to screen readers. A `<div>` does none of this without extensive custom ARIA attributes.

### 3. Image Alt Text
In a marketplace, images are inventory. A screen reader user needs to know what they are buying.
*Architectural Fix:* Your database schema for `Listings` must require an `alt_text` field for every uploaded image. Do not rely on generic "Listing Image 1" fallback text.

---

## Outsource the Hard Work: Headless UI

Building fully accessible complex components (like Comboboxes, Modals, and Date Pickers) from scratch is incredibly difficult. You must handle focus management, `aria-expanded` toggles, `aria-activedescendant` logic, and `Escape` key listeners.

> [!DECISION]
> Do not write complex interactive components from scratch. Base your frontend architecture on a headless, accessibility-first library like **Radix UI**, **Headless UI**, or **React Aria**. These libraries provide unstyled, perfectly accessible components that you wrap in your Design System tokens.

---

## Testing Accessibility in the CI/CD Pipeline

Accessibility testing must be automated. You cannot rely on manual QA to catch contrast errors on new pull requests.

1. **Linter:** Install `eslint-plugin-jsx-a11y` in your frontend repository. It will break the build if an engineer forgets an `alt` tag on an `<img>` or uses a non-semantic `onClick` handler.
2. **Automated Audits:** Integrate `axe-core` into your Playwright or Cypress End-to-End tests. This ensures that a passing test also passes basic accessibility checks.

---

## AI Prompts for Accessibility Audits

> [!TIP]
> **Prompt 1 — Component Audit:**

````prompt
I am building a complex React component for my marketplace: [Describe component, e.g., A multi-select dropdown for filtering search results]. Generate the code using standard HTML/CSS. Then, act as a strict Accessibility Expert. Audit the generated code, point out exactly where it fails WCAG AA standards for keyboard navigation and screen readers, and rewrite it using proper ARIA attributes.
````

> [!TIP]
> **Prompt 2 — CI/CD Pipeline Integration:**

````prompt
Write the configuration files required to add `eslint-plugin-jsx-a11y` to my Next.js project. Also, provide a short example of how to integrate `axe-core` into a Playwright test script to automatically check my marketplace's "Checkout" page for accessibility violations during my CI/CD build process.
````

---

## Validating AI Output

- **Reject "div-button" solutions:** If AI generates an interactive element using `<div onClick={...}>` and tries to fix it by adding `tabIndex={0}` and `role="button"`, reject it. Tell it to use a native `<button>` element.
- **Verify Headless usage:** Ensure that if you instruct the AI to use Radix UI, it actually uses the Radix primitives (`<Dialog.Root>`, `<Dialog.Trigger>`) rather than inventing its own modal logic.

---

## Checklist: Accessibility Architecture

## Checklist:
- [ ] Confirmed that all Design System colors pass WCAG AA contrast ratios (4.5:1).
- [ ] Mandated the use of semantic HTML (native `<button>` and `<label>` tags) across the codebase.
- [ ] Updated the database schema to require `alt_text` for all user-uploaded listing images.
- [ ] Selected a headless UI library (like Radix UI) to handle complex component accessibility.
- [ ] Integrated `eslint-plugin-jsx-a11y` into your frontend repository.

---

## What's Next

Next: **Empty States** — An accessible UI is only useful if there is data to display. We will now design the fallback screens for when queries return exactly zero results.
