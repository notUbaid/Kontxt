---
title: Search
slug: search
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Search (Frontend Integration)

## Implementing the Discovery Engine

In Phase 2 (Search Architecture), you made the architectural decision to offload search to a dedicated engine like Algolia or Typesense, syncing data via a background queue. This module covers the frontend implementation: building the complex, faceted UI that allows buyers to instantly slice through thousands of listings.

A production search UI is not just an `<input>` field. It is a highly interactive, URL-driven application within your application.

---

## The UI Stack: InstantSearch

Do not build faceted search logic from scratch. Calculating how many listings belong to "Category A" vs "Category B" based on a dynamic price slider is a distributed systems problem that frontend libraries have already solved.

**The Production Standard:** Use the official `react-instantsearch` (Algolia) or `typesense-instantsearch-adapter`. 

These libraries provide headless hooks (`useSearchBox`, `useRefinementList`, `useRange`) that manage the complex state of your facets automatically, allowing you to wrap them in your own Tailwind/Radix UI components.

---

## URL-Driven State Management

If a buyer searches for `"Vintage Guitars" under $500 in New York`, and they copy the URL to text to a friend, that friend must see the exact same results.

If you store search state locally in a React `useState` hook, sharing links will fail. 

> [!IMPORTANT]
> Your Search UI must be strictly URL-driven. Every keystroke, category toggle, and price slider adjustment must serialize into the URL query parameters (e.g., `?q=guitar&price_max=500&category=vintage`). InstantSearch provides a `routing` configuration object specifically for this. Enable it immediately.

---

## Geospatial Search (Bounding Boxes)

If you are building a service marketplace (e.g., Plumbers) or a local-pickup marketplace, keyword search is secondary to location.

**The Production Geospatial Flow:**
1. The user grants Location permissions or types a ZIP code.
2. You use the Google Maps API (or Mapbox) to convert the ZIP code into Latitude/Longitude coordinates.
3. The frontend passes a `bounding_box` or `aroundLatLng` parameter to the Search Engine.
4. The results return sorted by distance, and the UI plots them on an interactive map.

---

## SSR (Server-Side Rendering) for Search

By default, InstantSearch runs entirely on the client side. This is terrible for SEO. If Googlebot crawls your `/search?category=shoes` page, it will see a blank white screen because it does not execute complex JavaScript API calls.

To rank in Google, you must implement **SSR Search**.
Your Next.js Server Component must read the URL parameters, make the initial query to Algolia/Typesense on the server, and pass the `initialResults` to the client-side `<InstantSearch>` provider. This guarantees the HTML is fully populated when the page loads, while preserving instant interactivity for subsequent clicks.

---

## Do's and Don'ts of Production Search UI

- **DO design the Empty State.** A search with zero results is a high-churn moment. Never show a blank screen. Show a clear "No results found for X," offer a "Clear all filters" button, and display a grid of "Recommended Listings" to keep the buyer in the funnel.
- **DON'T trigger API calls on every keystroke.** If a user types "Macbook", that is 7 keystrokes. If you fire an API call for each one, you will exhaust your Algolia quota instantly. Rely on the InstantSearch library's built-in debouncing, or set it to `500ms`.
- **DO use Skeleton Loaders.** When search filters change, the results grid should not flash blank. Use a skeleton state (gray boxes mimicking the listing cards) to maintain layout stability (Cumulative Layout Shift) while the network request resolves.
- **DON'T leak private data into the search client.** The frontend search client uses a public API key. It can only query what is in the index. Ensure your backend synchronization pipeline never pushed `user_emails` or `draft` status listings to the index in the first place.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — InstantSearch Integration:**

````prompt
Act as a Senior React Engineer. I am using Next.js, Tailwind, and `react-instantsearch` (Algolia). Write a `SearchPage` component that includes a `SearchBox`, a `RefinementList` for Categories, a `RangeSlider` for Price, and a `Hits` grid for the results. You MUST enable the `routing` property so that all facet state synchronizes with the URL query parameters.
````

> [!TIP]
> **Prompt 2 — SSR Search Hydration:**

````prompt
I need to implement Server-Side Rendering (SSR) for my Algolia InstantSearch page in Next.js (App Router). Write the `page.tsx` server component that extracts the `q` and facet parameters from the URL `searchParams`, fetches the initial state securely on the server using `getServerState()`, and passes it to the client-side `InstantSearch` provider for hydration.
````

---

## Validating What AI Generates

- **Check for URL Routing:** If the AI writes a search page using standard `useState` hooks to track the current category, reject it. It must use the library's official routing/URL synchronization.
- **Verify API Keys:** Ensure the AI uses the `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` (which is safe to expose) and NEVER the Admin API key on the frontend. Exposing the Admin key allows anyone to delete your entire search index.

---

## Implementation Checklist

- [ ] Integrated the official `InstantSearch` library (Algolia or Typesense) into the frontend.
- [ ] Configured URL Routing so all search state is perfectly shareable and bookmarkable.
- [ ] Implemented Server-Side Rendering (SSR) so category and search pages are indexable by Google.
- [ ] Built an interactive Empty State that provides clear actions ("Clear Filters") and fallback content.
- [ ] Applied skeleton loaders to maintain UI stability during asynchronous fetches.

---

## What's Next

Next: **Analytics** — With the core user experience complete, you must measure how users are interacting with it. We will architect a GDPR-compliant event tracking system to capture conversion rates, search abandonment, and platform leakage attempts.
