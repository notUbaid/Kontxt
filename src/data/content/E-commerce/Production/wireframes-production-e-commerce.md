---
title: Wireframes
slug: wireframes
phase: Phase 1 E Commerce Design
mode: production
projectType: e-commerce
estimatedTime: 15-20 min
---

# Wireframing for Component Architecture

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 20 Minutes

Beginners wireframe to decide what a website *looks* like. They draw boxes on a piece of paper or in Figma to arrange the logo, the buttons, and the images.

In a headless production environment, wireframing has almost nothing to do with aesthetics. Wireframing is the process of **defining your React Component Hierarchy and Data Boundaries**. If you hand a visual wireframe to an AI without defining the data boundaries, the AI will build a monolithic, un-reusable mess of code.

As an AI-Assisted Architect, you must translate visual boxes into strict `Parent -> Child` React components, explicitly defining which component fetches data and which component is "dumb."

---

## 1. The Container vs. Presentational Pattern

When looking at a wireframe of a Product Listing Page (PLP), you will see a grid of 12 products. 

A beginner's AI will write one massive component that fetches the 12 products from Algolia and renders all 12 images and titles in the exact same file. This makes the code impossible to test or reuse.

**The Production Solution:**
You must enforce the **Container vs. Presentational (Smart vs. Dumb) Pattern**.
- **The Container (`<ProductGridContainer />`):** This is the "Smart" box in your wireframe. It has zero CSS. Its only job is to communicate with the Algolia API, handle the loading state, and manage the error boundary.
- **The Presentational (`<ProductCard />`):** This is the "Dumb" box. It has no idea what Algolia is. It simply receives data via React `props` (title, price, image) and applies Tailwind CSS to make it look beautiful. 

By wireframing the *boundaries* of these components, you can reuse the exact same `<ProductCard />` in the checkout cart, the search results, and the homepage.

## 2. Wireframing State Boundaries

If your wireframe includes a "Filter Sidebar" (Size, Color, Price) on the left, and a "Product Grid" on the right, you must define where the state lives.

If you let the AI guess, it might put the active filters inside the Sidebar component. But if the filters live in the Sidebar, how does the Product Grid know which products to show?

**The Production Solution:**
You must instruct the AI to hoist the state to the nearest common parent (the URL URL Parameters). 
Your wireframe notes must explicitly state: *"The Sidebar is a Dumb component. When a user clicks 'Size Large', the Sidebar pushes `?size=L` to the URL. The Product Grid Container listens to the URL and fetches the new data."* 

This ensures the user can copy/paste the URL and send it to a friend, and the friend will see the exact same filtered results.

## 3. Server Components vs. Client Components (RSC)

In Next.js App Router, you must wireframe which boxes are rendered on the server, and which require JavaScript on the client.

- **Static Content (Server Components):** The Header, the Footer, the Product Description. These ship as pure HTML for maximum speed.
- **Interactive Content (Client Components):** The "Add to Cart" button, the Image Carousel. These require `onClick` handlers.

You must wireframe these boundaries to force the AI to keep Client Components as small as possible, minimizing the JavaScript bundle size.

---

##  Component Wireframing Checklist

- [ ] Stop wireframing for aesthetics; wireframe to define React component boundaries.
- [ ] Enforce the "Smart Container vs. Dumb Presentational" pattern for all complex UIs.
- [ ] Mandate that all filtering state must be stored in the URL (`useSearchParams`), never in local component state.
- [ ] Use the AI prompt below to generate the strict component hierarchy.

---

## AI Prompt — Architect the Component Hierarchy

Copy this prompt into your AI to have it translate a generic layout into a strict, production-grade React Component architecture.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Frontend Architect. We are defining our Component Wireframes for the Category Page (PLP).

Do not write the CSS layout yet. I need you to define the strict React architecture, separating logic from presentation.

**Generate the Component Hierarchy Map for the Category Page:**

1. **Server vs. Client Boundaries:** Explicitly define which components will be Server Components (`layout.tsx`, `page.tsx`) and which must be Client Components (e.g., `"use client"` for the filter checkboxes).
2. **Container/Presentational Split:** Detail the exact prop contract between the smart `<CategoryAlgoliaContainer />` and the dumb `<ProductCard />`. 
3. **URL State Management:** Write the strict rule explaining how the `<SidebarFilters />` component will mutate the URL parameters (using Next.js `useRouter` or `nuqs`), and how the `<CategoryAlgoliaContainer />` will consume those parameters to trigger a new NoSQL fetch.

Output this as a structured architectural blueprint.
````

**Next: Mobile Responsiveness →**
