---
title: Frontend
slug: frontend
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 25-30 min
---

# Frontend (The Presentation Layer)

## Beyond "Just Making It Look Good"

In a production marketplace, the frontend is not just HTML and CSS; it is a complex distributed application. It must manage asynchronous state, handle network latency gracefully, enforce ADA accessibility, and render perfectly for SEO crawlers.

If your frontend is a monolithic React SPA (Single Page Application) that ships 5MB of JavaScript to the client and renders a blank white screen for 3 seconds, buyers will bounce before they ever see a listing.

---

## Server-Side Rendering (SSR) and SEO

Marketplaces live and die by organic search traffic (Google). If you use standard Client-Side Rendering (e.g., standard React or Vue without a meta-framework), Googlebot will struggle to index your listings.

**The Production Standard:** You must use a framework that supports Server-Side Rendering (SSR) or Static Site Generation (SSG), such as **Next.js (App Router)** or **Remix**.

| Page Type | Rendering Strategy | Why |
|---|---|---|
| **Listing Pages** | SSR / ISR (Incremental Static Regeneration) | Needs perfect SEO, dynamic pricing, and must load instantly on mobile. |
| **Category/Search** | SSR (with URL Query Params) | Search params (`?category=shoes&sort=price`) must trigger server renders so buyers can share links. |
| **Seller Dashboard** | Client-Side Rendering (CSR) | Behind an Auth wall. SEO does not matter. Highly interactive. |

---

## State Management and Optimistic UI

When a buyer clicks "Save to Favorites" or "Send Message", they expect the UI to react instantly. If they have to wait 800ms for your Postgres database to respond before the heart icon turns red, your app feels sluggish and cheap.

**The Production Workflow:**
1. **Server State (React Query / SWR):** Do not use Redux to store data you fetched from an API. Use tools designed for async cache invalidation.
2. **Optimistic Updates:** When the user clicks the "Favorite" button, immediately turn the icon red in the UI *before* the API request finishes.
3. **Rollback on Error:** If the API request fails (e.g., network drop), automatically revert the icon back to gray and show a toast notification.

> [!IMPORTANT]
> Global Client State (e.g., Zustand or Jotai) should only be used for UI state that does not belong in the database—such as whether the mobile sidebar is open, or which tab the user is viewing.

---

## Error Boundaries and Graceful Degradation

If the Algolia Search API goes down, your entire application should not crash to a white screen with a stack trace.

You must wrap distinct sections of your UI in **Error Boundaries**.
If the `RecommendedListings` component fails to fetch data, it should gracefully fall back to an empty state or a subtle error skeleton, while the rest of the `ListingDetail` page (title, price, checkout button) remains fully functional.

---

## The Design System (Headless UI)

Do not build custom dropdowns, modals, and accessible tabs from scratch. It is a massive waste of engineering time, and you will almost certainly fail to meet WCAG accessibility standards.

**The Production Stack:**
* **Logic/Accessibility:** Use Headless UI libraries (Radix UI, React Aria, or HeadlessUI) that provide unstyled, perfectly accessible components.
* **Styling:** Use TailwindCSS (or similar utility-first CSS) to style the headless components exactly to your brand.
* **Documentation:** (Optional but recommended for teams) Catalog your components in Storybook.

---

## Do's and Don'ts of Production Frontends

- **DO keep your URL as the single source of truth for navigation.** If a user applies a "Price < $50" filter, that filter must be reflected in the URL (`?max_price=50`). If they refresh the page or share the link, the filter must persist.
- **DON'T recreate backend authorization logic on the frontend.** Hiding the "Edit Listing" button is good UX, but do not rely on it as security. The backend is the only true security boundary.
- **DO implement Skeleton Loaders.** Never show a raw loading spinner for primary content. Use Skeleton loaders that mimic the shape of the content that is about to arrive. This reduces perceived latency (Perceived Performance).
- **DON'T ship massive NPM packages.** Analyze your bundle size. Avoid importing the entirety of `lodash` or heavy moment.js libraries if you only need a single function.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Optimistic UI Component:**

````prompt
Act as a Senior React Engineer. I am using Next.js App Router, Tailwind, and React Query. Write a `FavoriteButton` component for a Listing. It must implement an Optimistic UI update using React Query's `onMutate` and `onError` handlers. When clicked, it should instantly toggle state, fire the API mutation, and automatically roll back the UI if the mutation fails.
````

> [!TIP]
> **Prompt 2 — SSR Search Page Scaffold:**

````prompt
Write the Next.js `page.tsx` scaffold for a Marketplace Search page. It must read the `q` (query) and `category` parameters directly from the URL Search Params on the server side, pass them to a server-side fetch function, and render the results for SEO. Include proper TypeScript typings for the Next.js page props.
````

---

## Validating What AI Generates

- **Check for Client-Side SEO failures:** If the AI writes a Listing page using `useEffect` to fetch the core listing data, reject it. Core listing data must be fetched on the server (SSR) so crawlers can read it instantly.
- **Verify Accessibility:** If the AI writes a custom Modal or Dropdown using raw `div` tags and `onClick` handlers, request it to rewrite the component using an accessible primitive like Radix UI or native HTML `<dialog>` tags.

---

## Implementation Checklist

- [ ] Selected an SSR-capable framework (e.g., Next.js, Remix) to ensure SEO indexability.
- [ ] Implemented React Query / SWR for server state management and caching.
- [ ] Built Optimistic UI updates for high-interaction micro-actions (favoriting, status toggling).
- [ ] Wrapped page sections in distinct Error Boundaries to prevent cascading application crashes.
- [ ] Adopted a Headless UI library (Radix, React Aria) combined with Tailwind for accessible, bespoke styling.

---

## What's Next

Next: **Payments** — With the frontend rendering smoothly, we must implement the client-side execution of our Payments Architecture. We will integrate Stripe Elements, handle 3D Secure authentication, and orchestrate the frontend checkout flow securely.
