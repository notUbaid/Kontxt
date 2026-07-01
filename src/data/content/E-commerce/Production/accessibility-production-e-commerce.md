---
title: Accessibility
slug: accessibility
phase: Phase 1 E Commerce Design
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Accessibility (WCAG 2.1 AA) as a Mandate

**Estimated Time:** 25 Minutes

Beginners often treat Accessibility (a11y) as an afterthought—something to fix in "Phase 2" if someone complains. 

In a mass-production environment, failing to comply with WCAG (Web Content Accessibility Guidelines) 2.1 AA standards is a fatal error. 
1. You instantly alienate 15-20% of your customer base (users relying on screen readers or keyboard navigation).
2. In regions like the US and EU, non-compliance invites massive, expensive ADA (Americans with Disabilities Act) lawsuits against the enterprise.

As an AI-Assisted Architect, you must instruct your AI that accessibility is a strict engineering mandate. If the AI writes inaccessible code, the build must fail.

---

## 1. Focus Management and Keyboard Navigation

A production storefront must be 100% navigable without a mouse. Users relying on keyboards must be able to add items to their cart and checkout seamlessly.

- **The Focus Trap:** When a user opens a modal (e.g., the slide-out Cart Drawer), keyboard focus MUST be programmatically trapped inside that drawer. If the user presses `Tab`, focus should cycle through the checkout buttons, not the hidden webpage underneath. When the drawer closes, focus must be returned exactly to the button they clicked to open it.
- **Skip Links:** The very first focusable element in your DOM (visually hidden until focused) must be a "Skip to Main Content" link, allowing keyboard users to bypass your massive Mega Menu on every single page load.

> [!WARNING]
> Never let your AI use `outline: none` in CSS unless it is explicitly replacing the outline with a custom, highly visible `:focus-visible` state. Removing focus outlines renders your site completely unusable for keyboard navigators.

## 2. Dynamic State and ARIA Live Regions

Modern headless e-commerce is highly dynamic. Items are added to carts instantly, and prices update in the background. A sighted user sees these changes, but a blind user relying on a screen reader (VoiceOver, NVDA) is completely unaware unless the DOM tells them.

**The Production Solution:** 
You must instruct your AI to implement visually hidden **ARIA Live Regions** (`aria-live="polite"`). When a user clicks "Add to Cart", the JavaScript must inject text like *"Blue Oxford Shirt added to your cart"* into the live region so the screen reader announces it immediately.

## 3. Automated Enforcement

Do not rely on yourself to remember to ask the AI for `alt` tags. You must force the AI to set up **Automated Linting**.

You will instruct the AI to add `eslint-plugin-jsx-a11y` to your repository. If the AI later tries to write inaccessible code (e.g., an `onClick` on a `<div>`), the linter will throw a fatal error, and the code will refuse to compile.

---

## ✅ Accessibility Checklist

- [ ] Accept that WCAG 2.1 AA Compliance is a legal and ethical mandate, not a "nice-to-have."
- [ ] Ensure all modals and cart drawers utilize Focus Trapping so keyboard users do not get lost in the DOM.
- [ ] Understand the necessity of ARIA Live regions for announcing headless cart mutations.
- [ ] Use the AI prompt below to generate the automated enforcement linting rules.

---

## AI Prompt — Enforce WCAG 2.1 AA Compliance

Copy this prompt into your AI to have it set up the strict accessibility guardrails for your repository.

````prompt
I am setting up a production-grade Next.js e-commerce repository. I need you to act as a Principal Frontend Architect. Accessibility (WCAG 2.1 AA) is a strict legal and architectural mandate for this project.

I need you to generate the following implementations to programmatically enforce accessibility:

**1. ESLint Accessibility Guardrails:**
Provide the exact `.eslintrc.json` configuration utilizing `eslint-plugin-jsx-a11y`. Ensure that any missing `alt` tags, improper ARIA roles, or invalid keyboard interactions throw FATAL errors (not just warnings) to block the build.

**2. The ARIA Live Region Announcer:**
Headless cart mutations are invisible to screen readers. Write a reusable React component (e.g., `<A11yAnnouncer />`) that uses `aria-live="polite"`. Explain how our global Zustand cart store will push string messages (e.g., "Item added to cart") to this component so screen readers announce dynamic state changes instantly.

**3. The Skip-to-Content Link:**
Write the Tailwind CSS code for a "Skip to Main Content" link that is visually hidden by default but becomes visible when a keyboard user presses the Tab key. Explain exactly where this must be placed in the Next.js `app/layout.tsx`.
````

**Next: Empty States →**
