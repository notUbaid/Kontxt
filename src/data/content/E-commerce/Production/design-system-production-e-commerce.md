---
title: Design System
slug: design-system
phase: Phase 1
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Design System

In a production e-commerce team, developers should never write raw CSS to define the padding on a button. If they do, your UI will fracture. You will end up with 15 different shades of gray and 12 different button sizes, making the site feel cheap and breaking user trust.

A **Design System** is a strict, programmatic collection of reusable components (React) and design tokens (Tailwind/CSS Variables) that guarantees absolute visual consistency across the entire application.

---

## 1. Design Tokens (The Variables)

A Design Token is a named entity that stores a visual design attribute. Instead of hardcoding `#FF0000`, you use the token `var(--color-destructive)`.

**The Implementation (Tailwind CSS):**
You must map your entire brand palette into the `tailwind.config.js`.
- **Colors:** Primary, Secondary, Accent, Destructive, Success, and a precise grayscale scale (100 to 900).
- **Typography:** Map your brand fonts to `font-sans` and `font-serif`. Define strict leading (line-height) and tracking (letter-spacing) rules.
- **Spacing:** E-commerce requires massive amounts of whitespace. Define a strict spacing scale (e.g., `4px`, `8px`, `16px`, `24px`) and never deviate from it.

---

## 2. The Core Component Library

Once the tokens are defined, you must build the core React components.

**The Production Rule (Radix / Shadcn):**
Do not build complex interactive components (like Modals, Accordions, or Dropdowns) from scratch. You will fail to make them accessible (ARIA compliance) and keyboard navigable.
- Use a headless UI library like **Radix UI** or **Headless UI**.
- Wrap these headless primitives in your own custom Tailwind classes (e.g., using a system like `shadcn/ui`).
- This guarantees that your `Accordion` component looks exactly like your brand, but behaves perfectly for screen readers and keyboard users.

---

## 3. The "Product Card" Component

The most critical, heavily reused component in e-commerce is the `ProductCard`. It appears on the homepage, category pages, search results, and cross-sell rails.

**The Engineering Architecture:**
- The `ProductCard` must accept a strict TypeScript interface (e.g., `title`, `price`, `imageSrc`, `inventoryCount`).
- **Performance:** The image inside the card must use Next.js `<Image />` with strict `sizes` attributes for responsive loading.
- **Interactivity:** It must support a quick "Add to Cart" button (often revealed on hover for desktop) that fires a mutation to the Cart API without forcing a full page reload.

---

## 4. Dark Mode (Financial Risk)

Supporting Dark Mode is a massive engineering overhead.

**The Production Reality:**
For e-commerce, Dark Mode often *decreases* conversion rates if poorly implemented, because product photography (which is usually shot on pure white backgrounds) looks jarring against a dark UI.
- **The Recommendation:** For v1.0 of an e-commerce launch, force Light Mode. Focus engineering hours on checkout speed, not maintaining two separate color palettes.

---

## AI Prompt — Architect Your Component Library

```prompt
I am establishing the React Design System for a production e-commerce store using Tailwind CSS.

Tech Stack:
- Framework: [e.g., Next.js React]
- Styling: [e.g., Tailwind CSS + Radix UI]

Act as a Principal UI/UX Engineer:
1. Provide the specific `tailwind.config.js` configuration required to map our primary brand colors and typography into usable Design Tokens.
2. Write the strict TypeScript interface for a highly reusable `ProductCard` component, ensuring it supports necessary data like `compareAtPrice` (for discounts) and `variantOptions` (e.g., color swatches).
3. Explain the architectural benefit of using a Headless UI library (like Radix) instead of building a custom Dropdown or Modal component from scratch in React.
```

---

## Design System Checklist

- [ ] Design Tokens (Colors, Typography, Spacing) strictly mapped into `tailwind.config.js`
- [ ] Headless UI primitives (Radix/HeadlessUI) selected for complex interactive components to ensure ADA compliance
- [ ] Core `ProductCard` component engineered with a strict TypeScript interface and optimized Next.js `<Image />` loading
- [ ] Decision made on Dark Mode support (Recommendation: Force Light Mode for v1.0 to protect photography consistency)
- [ ] Reusable Button variants (Primary, Secondary, Outline, Destructive) built and standardized across the app
