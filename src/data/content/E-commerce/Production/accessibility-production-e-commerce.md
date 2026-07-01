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

In mass-production environments, accessibility (a11y) is not an afterthought or a "nice to have" feature pushed to a Phase 2 backlog. It is a strict engineering mandate. 

Failing to comply with WCAG (Web Content Accessibility Guidelines) 2.1 AA standards alienates roughly 15-20% of your potential customer base (users relying on screen readers, keyboard navigation, or high-contrast interfaces). Furthermore, in regions like the US and EU, non-compliance invites massive, expensive ADA (Americans with Disabilities Act) lawsuits against the enterprise.

## 1. Focus Management and Keyboard Navigation

A production storefront must be 100% navigable without a mouse. Users relying on keyboards or sip-and-puff devices must be able to seamlessly add items to their cart and checkout.

- **The Focus Trap:** When a user opens a modal (e.g., a "Quick View" product modal or the slide-out Cart Drawer), keyboard focus MUST be programmatically trapped inside that modal. If the user presses `Tab`, focus should cycle through the modal's buttons, not the hidden webpage underneath. When the modal closes (via `Esc` or the close button), focus must be elegantly returned to the exact button the user clicked to open it.
- **Skip Links:** The very first focusable element in your DOM (visually hidden until focused) must be a "Skip to Main Content" link. This allows keyboard users to bypass the 50-link Mega Menu on every single page load.

> [!WARNING]
> Never use `outline: none` in your CSS unless you are explicitly replacing it with a custom, highly visible `:focus-visible` state. Removing focus outlines renders your site completely unusable for keyboard navigators.

## 2. Dynamic State and ARIA Live Regions

Modern headless e-commerce is highly dynamic (items are added to carts via AJAX, prices update via SWR, inventory counters decrement instantly). A sighted user sees these visual changes, but a blind user relying on a screen reader (VoiceOver, NVDA) is completely unaware unless the DOM explicitly announces the change.

- **`aria-live` Regions:** You must implement visually hidden ARIA live regions. When a user clicks "Add to Cart", the JavaScript must inject text like *"Blue Oxford Shirt added to your cart. You have 3 items total."* into the `aria-live="polite"` region. The screen reader will then announce this crucial state change.
- **Form Error States:** During checkout, if a user submits an invalid credit card, the focus must immediately jump to the error summary, and the specific input must be tagged with `aria-invalid="true"` and linked to the error message ID via `aria-describedby`.

## 3. Automated Enforcement

Do not rely on developers remembering to add `alt` tags. You must programmatically enforce accessibility in your build pipeline.

- **Linting:** Add `eslint-plugin-jsx-a11y` to your repository. It will automatically fail the build if developers write inaccessible code (e.g., using `onClick` on a non-interactive `<div>` without keyboard handlers).
- **Automated CI/CD Testing:** Integrate tools like `cypress-axe` or `@axe-core/playwright`. During the E2E testing phase in GitHub Actions, these tools will scan the rendered DOM of your critical flows (Home, PDP, Checkout) and block the Pull Request if contrast ratios or semantic ARIA rules are violated.

## Checklist:
- [ ] Implement robust Focus Trapping (`focus-trap-react`) for all modals, cart drawers, and mobile navigation menus.
- [ ] Ensure all dynamic cart mutations (add, remove, update) are announced to screen readers via visually hidden `aria-live` regions.
- [ ] Configure `eslint-plugin-jsx-a11y` in the repository to block inaccessible DOM structures at the code-authoring level.
- [ ] Integrate automated Axe-core accessibility audits into the CI/CD pipeline to block PRs that violate WCAG 2.1 AA standards.
