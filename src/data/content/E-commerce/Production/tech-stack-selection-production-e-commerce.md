---
title: Tech Stack Selection
slug: tech-stack-selection
phase: Phase 2 E Commerce Development
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Enforcing the Production Tech Stack

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 25 Minutes

Beginners often let their AI choose the tech stack. If you ask an AI to "build an e-commerce site," it might randomly choose Vue.js, Firebase, and a messy REST API simply because that is what it saw in a 2019 tutorial.

In a mass-production environment, tech stack selection is about **Ecosystem Gravity and Developer Velocity**. You must choose a stack that has massive community support, flawless documentation, and native edge-computing capabilities.

As an AI-Assisted Architect, you must explicitly lock in the Tech Stack and forbid the AI from deviating or importing random NPM packages that bloat the bundle size.

---

## 1. The Core Stack Mandate

You must enforce the following strict technologies. This specific combination is the absolute gold standard for modern headless commerce, providing the highest performance and the lowest server costs.

| Layer | The Technology | Why We Enforce It |
|---|---|---|
| **Framework** | Next.js (App Router) | Native Server Components (RSC) drastically reduce JavaScript payload sizes sent to the browser. Native edge-caching via ISR. |
| **Styling** | Tailwind CSS | Utility-first CSS completely eliminates dead code. The CSS file will never grow larger than ~10kb, regardless of how massive the store gets. |
| **Type Safety** | Strict TypeScript | Mathematical proof that your code works before you deploy it. If the AI writes a bug, the compiler catches it. |
| **Database/Backend** | Shopify / Swell | (As decided in the previous module). |

## 2. Global State Management (Zustand)

Next.js is fantastic for server-side routing, but an e-commerce store has highly complex client-side state: the Cart Drawer, the active Search Filters, and the User Session.

If you let the AI use Redux, you will drown in thousands of lines of boilerplate code. If you let the AI use simple React Context, the entire app will re-render every time the cart updates, causing massive performance lag.

**The Production Solution:**
You must mandate the use of **Zustand**. It is a tiny, atomic state manager that allows components to subscribe to specific pieces of state without triggering global re-renders. It also supports `persist` middleware, automatically saving the cart to `localStorage` so it survives page refreshes.

## 3. The NPM Bloat Prohibition

AI assistants love to import heavy NPM packages to solve simple problems (e.g., importing `moment.js` just to format a date, which adds 300kb of bloat to the browser).

**The Production Solution:**
You must establish a strict **Zero-Bloat Rule**. 
- The AI must use native browser APIs (like `Intl.DateTimeFormat`) instead of heavy libraries.
- The AI must use Headless UI primitives (Radix) instead of bloated component libraries (like Material UI) which inject massive amounts of unnecessary CSS.

---

##  Tech Stack Checklist

- [ ] Lock in Next.js (App Router) as the non-negotiable frontend framework.
- [ ] Enforce strict TypeScript; ban the AI from using `any` types.
- [ ] Mandate Zustand for atomic, performant global state management.
- [ ] Enforce the "Zero-Bloat Rule" to protect the Core Web Vitals.
- [ ] Use the AI prompt below to generate the foundational repository configuration.

---

## AI Prompt — Architect the Strict Tech Stack

Copy this prompt into your AI to lock in the technology choices and generate the foundational configuration files.

````prompt
I am building a production-grade headless e-commerce store. I need you to act as my Principal Architect. We are locking in our Tech Stack and establishing the repository rules.

**The Mandated Tech Stack:**
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Language: Strict TypeScript (No `any` types allowed)
- State Management: Zustand

I need you to generate the following foundational configurations and code:

**1. The Strict `tsconfig.json`:**
Provide a highly strict TypeScript configuration file. Ensure `strictNullChecks` and `noImplicitAny` are enabled to force maximum safety.

**2. The Zustand Cart Store:**
Write the boilerplate Zustand store (`useCartStore.ts`). 
- Include state for `items` (array) and `isOpen` (boolean). 
- Include actions for `addItem`, `removeItem`, and `toggleCart`.
- You MUST utilize the Zustand `persist` middleware to automatically sync the cart state to browser `localStorage`.

**3. The Zero-Bloat Mandate:**
Write a strict 3-point rule document that I will save in the repository as `CONTRIBUTING.md`. This document must explicitly forbid the use of heavy legacy libraries (like `moment.js` or `lodash`) and mandate the use of native JavaScript APIs (like `Intl`) to protect our Core Web Vitals.
````

**Next: Cost Estimation →**
