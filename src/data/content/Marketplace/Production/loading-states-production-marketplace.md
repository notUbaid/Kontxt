---
title: Loading States
slug: loading-states
phase: Phase 1
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Loading States (Perceived Latency)

A slow marketplace with perfect loading states feels faster than a fast marketplace with a blank white screen. 

In a production environment, latency is inevitable. Database queries, Stripe API calls, and image uploads take time. If your frontend architecture does not explicitly design the "waiting" experience, users will assume the application has frozen. This leads to frustrated reloading, duplicate transactions, and a severe drop in conversion rates.

---

## The Three Tiers of Loading Architecture

Loading states in production are not just "slapping a spinner on the page." They must be architected according to the type of data being fetched:

### 1. Page-Level Loading (Skeletons)
Used when a user navigates to a new page (e.g., The Search Index or a Listing Detail).
* **Production Rule:** Never use a full-page spinner. Use **Skeleton Loaders**. Skeletons must exactly match the height and width of the final loaded content to prevent **Cumulative Layout Shift (CLS)**. If the screen jumps when the data finally loads, you will fail Google's Core Web Vitals, destroying your SEO.

### 2. Action-Level Loading (Spinners & Locks)
Used when a user submits a form (e.g., Creating a listing or Clicking "Checkout").
* **Production Rule:** The button must immediately display a spinner, and **the button must be disabled.** If you do not explicitly `disabled={true}` the checkout button, an impatient user will click it three times, resulting in three Stripe charges and a customer support nightmare.

### 3. Micro-Interaction Loading (Optimistic UI)
Used for low-stakes, high-frequency actions (e.g., Liking a listing, or sending a chat message).
* **Production Rule:** Use **Optimistic UI**. Do not wait for the server to respond. Instantly update the UI to show the "Liked" state or the "Sent" message, and only revert the UI if the background server request fails. This makes the app feel instantly responsive.

---

## Architecting Skeletons in React

In modern React (Next.js App Router, Remix), you do not need to manually toggle `isLoading` state variables for page loads. You should use **React Suspense**.

```tsx
// The architecture of a Skeleton fallback
import { Suspense } from 'react';
import { ListingGridSkeleton } from '@/components/skeletons/listing-grid';

export default function SearchResults() {
  return (
    <Suspense fallback={<ListingGridSkeleton />}>
      <AsyncListingGrid />
    </Suspense>
  );
}
```

By wrapping asynchronous components in a `Suspense` boundary, React automatically renders the Skeleton until the server finishes streaming the data.

---

## Preventing Double-Submission Data Corruption

Marketplace databases get corrupted primarily through impatient users executing the same action twice during a loading phase.

> [!CAUTION]
> Disabling the submit button is step one. Step two is **Debouncing** API calls. If a seller is uploading 5 high-resolution images, the UI must explicitly show the upload progress for *each* image, and the final "Publish" button must remain locked until all 5 promises resolve.

---

## AI Prompts for Loading State Architecture

> [!TIP]
> **Prompt 1 — Skeleton Component Generation:**

````prompt
I am building a Next.js marketplace. Act as a Senior Frontend Developer. Write a React component for a `<ListingCardSkeleton />` using Tailwind CSS `animate-pulse`. It must perfectly match the layout of a standard e-commerce product card (Image, Title, Price, Rating) to prevent Cumulative Layout Shift (CLS) when the real data loads.
````

> [!TIP]
> **Prompt 2 — Optimistic UI Mutation:**

````prompt
Write a React Server Action (or React Query mutation) for "Liking a Listing" in a marketplace. Implement an Optimistic UI update so the heart icon immediately turns red when clicked, without waiting for the server. Include the exact error-handling logic required to revert the UI back to an un-liked state if the API request fails.
````

---

## Validating AI Output

- **Check for CLS risks:** If an AI generates a skeleton component that is just a generic grey box, reject it. The skeleton *must* mimic the specific typography and image dimensions of the final component.
- **Verify strict disabling:** Ensure that any AI-generated form code explicitly ties the `disabled` attribute of the submit button to the `isSubmitting` state.

---

## Checklist: Loading State Architecture

## Checklist:
- [ ] Designed Skeleton screens for all major data-fetching routes (Search Grid, Listing Detail).
- [ ] Implemented React Suspense boundaries to handle page-level loading automatically.
- [ ] Ensured all transactional buttons (Checkout, Publish) disable themselves immediately upon click.
- [ ] Identified low-stakes interactions (Likes, Messages) that should use Optimistic UI.
- [ ] Verified that skeletons match final component dimensions to prevent Cumulative Layout Shift (CLS).

---

## What's Next

Next: **Buyer Journey** — Now that the foundational components, states, and architectural patterns are defined, we will map the complete, end-to-end journey of the Demand side (the Buyer) through this system.
