---
title: Design System
slug: design-system
phase: Phase 1 E Commerce Design
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Enterprise Design Systems

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 25 Minutes

For beginners, a "Design System" is usually just a Figma file with a few brand colors and a logo. When they start coding, they write messy, inline CSS or random Tailwind classes everywhere. 

In a production environment, if you do not have a strictly typed, code-based design system, your codebase will turn into spaghetti. If you have 5 different developers (or one AI generating thousands of lines of code) working on the checkout, the product page, and the user dashboard, a true design system guarantees that a button looks and behaves identically across every page.

As an AI-Assisted Architect, you must explicitly forbid your AI from writing custom CSS for every component. 

---

## 1. Tokenization (The Foundation)

You must decouple your core logic from your visual branding. We do this through **Design Tokenization**.

If your brand color is orange, you do not let the AI hardcode `#FF5733` into 50 different React components. If you decide to rebrand to blue next year, you would have to manually find and replace 50 instances.

Instead, instruct your AI to define a semantic hierarchy in your `tailwind.config.js`:
- **Primitive:** `colors: { orange: { 500: '#FF5733' } }`
- **Semantic:** `colors: { brand: { primary: 'var(--color-orange-500)' } }`

Now, your AI only uses `bg-brand-primary`. If you rebrand, you change one variable, and the entire store updates instantly.

## 2. Headless UI Libraries (The Secret Weapon)

Building complex interactive components (Dropdowns, Dialog modals, Comboboxes) from scratch is a massive waste of time and highly prone to accessibility bugs.

> [!WARNING]
> Never let your AI build custom dropdowns or modals using basic `<div>` tags and `onClick` handlers. The AI will inevitably fail to manage focus trapping, keyboard navigation (`Esc` to close), and screen reader logic (`aria-expanded`).

Instead, you will instruct the AI to build your design system using **Headless UI Primitives** (like Radix UI, React Aria, or Shadcn/UI). These libraries handle all the brutal complexities of state management and ADA compliance natively. The AI simply wraps them in your specific Tailwind CSS classes to apply the visual layer.

## 3. Storybook & Component Driven Development

In production, you do not build a button directly inside the checkout page. You build it in isolation.

You must instruct your AI to use **Storybook**. Storybook is a sandbox where you can view every single component (from a `PrimaryButton` to a `ProductCard`) independent of the main app. This allows you to verify that the component is flawless before injecting it into the complex routing of the Next.js app.

---

## ✅ Design System Checklist

- [ ] Stop thinking of a Design System as a Figma file; treat it as a strictly typed NPM package/library.
- [ ] Mandate strict Semantic Tokenization in Tailwind (never hardcode hex colors).
- [ ] Choose a Headless UI library (Radix UI or Shadcn/UI is highly recommended for React/Next.js).
- [ ] Understand that Storybook is the required sandbox for testing components in isolation.
- [ ] Use the AI prompt below to generate the foundation of your coded design system.

---

## AI Prompt — Architect the Headless Design System

Copy this prompt into your AI to have it generate the strict Tailwind tokenization and the first headless components.

````prompt
I am building a production-grade headless e-commerce store with Next.js and Tailwind CSS. I need you to act as my Principal Frontend Architect. We are establishing our strict, code-based Design System.

Do not write messy, inline CSS. We must use strict Tokenization and Headless UI primitives.

**Generate the following architectural files:**

1. **The Tailwind Token Configuration:**
Write the `tailwind.config.js` file. Establish a semantic token hierarchy mapping primitive colors (e.g., specific hex codes) to semantic brand variables (`brand-primary`, `bg-surface`, `text-muted`).

2. **The Headless Modal Component:**
I want to use Radix UI (or Shadcn/UI) for our complex interactive components. Write a reusable `<DialogModal />` component. 
Demonstrate exactly how you wrap the unstyled Radix primitive with our semantic Tailwind tokens. Ensure you explain how Radix natively handles focus trapping and the `Esc` key to close.

3. **The Storybook Setup:**
Write the boilerplate `.storybook/main.ts` and `preview.ts` configuration required to integrate Tailwind CSS into our isolated Storybook environment.
````

**Next: Branding →**
