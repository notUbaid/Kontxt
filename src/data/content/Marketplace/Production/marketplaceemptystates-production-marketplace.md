---
title: Empty States
slug: empty-states
phase: Phase 1
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Empty States (The Cold Start UI)

Every wireframe you just drew assumed your database was full of data. But in a production marketplace, the most critical moments of a user's lifecycle happen when the database is empty. 

An un-designed Empty State is a leak in your conversion funnel. If a user executes a search and sees a blank white screen, they will assume the application crashed. If a seller opens their dashboard and sees an empty table with no instructions, they will abandon the onboarding flow. 

You must engineer Empty States to actively drive Liquidity.

---

## The Two Distinct Types of Empty States

In a marketplace, "empty" means two completely different things. Your frontend architecture must route between them intelligently:

1. **The "Cold Start" Empty State:** Data does not exist yet. (e.g., A seller just created an account and has 0 listings). This state must act as an onboarding ramp.
2. **The "Query Mismatch" Empty State:** Data exists, but the user's filters excluded it. (e.g., A buyer searched for "Red Shoes" in "Austin, TX"). This state must act as a recovery mechanism to prevent churn.

---

## Engineering the "Query Mismatch" Recovery

When a buyer hits a zero-result search, you are at risk of permanently losing them. Your UI must immediately try to recover the session:

- **Broaden the Node:** If they searched within a 5-mile radius, the Empty State should offer a 1-click button to "Expand search to 25 miles."
- **Remove Constraints:** Automatically suggest removing the most restrictive filter (e.g., "We couldn't find 'Red Vintage Shoes', but we found 42 'Vintage Shoes'.").
- **The "Demand Capture" Wedge:** If they searched for something that truly does not exist on your platform, offer a "Notify me when this becomes available" button. This captures their email and allows you to prove to sellers that unfulfilled demand exists.

> [!IMPORTANT]
> Never show a generic "No results found" message on a search page. Always offer an automated escape hatch to a broader dataset.

---

## Engineering the "Cold Start" Onboarding

When a seller opens their inventory dashboard for the first time, it is empty. Do not show them an empty data table. 

An effective Cold Start Empty State includes three elements:
1. **The Context:** Explain what this space is for.
2. **The Value Proposition:** Remind them *why* they should do the work (e.g., "Sellers who add 5 items get 3x more views").
3. **The Primary CTA:** A massive, high-contrast "Create First Listing" button.

> [!TIP]
> If your onboarding strategy relies on a "White-Glove" or API-sync approach (from Phase 0), the Empty State CTA should be "Connect your Shopify Store" rather than "Create a Listing Manually."

---

## The Architecture of a Fallback Component

Do not hard-code empty states into every single page. Build a centralized `<EmptyState />` component in your Design System that accepts props.

```tsx
// Conceptual Component Architecture
<EmptyState 
  icon={<SearchIcon />}
  title="No exact matches found"
  description="Try broadening your search radius or removing a filter."
  primaryAction={<Button onClick={clearFilters}>Clear All Filters</Button>}
  secondaryAction={<Button onClick={createAlert}>Notify Me</Button>}
/>
```

This guarantees that every empty state across your platform looks identical, maintaining professional consistency.

---

## AI Prompts for Empty State Architecture

> [!TIP]
> **Prompt 1 — Empty State Edge Case Audit:**

````prompt
I am building a [Take Rate / Subscription] marketplace for [Your Niche]. Act as a Senior UX Researcher. Map out the 5 most critical "Empty States" a user will encounter in their first 10 minutes on the platform (both Supply and Demand sides). For each state, write the specific headline copy and define the exact Call-to-Action (CTA) required to prevent them from abandoning the app.
````

> [!TIP]
> **Prompt 2 — The React Component:**

````prompt
Using React and Tailwind CSS (and my Design System tokens), build a highly reusable, accessible `<EmptyState />` component. It must accept props for a Title, Description, Icon, Primary Action, and Secondary Action. Ensure the layout works flawlessly on both mobile and desktop views, centering the content and providing sufficient padding.
````

---

## Validating AI Output

- **Reject generic apologies:** If AI writes copy like "Oops! We're sorry, we couldn't find anything," rewrite it. Production apps do not say "Oops." Use clear, professional, instructional copy.
- **Verify Component Flexibility:** Ensure the generated `<EmptyState />` component does not hard-code specific business logic. It must be generic enough to use on a Dashboard, a Search Page, and an Inbox.

---

## Checklist: Empty State Architecture

## Checklist:
- [ ] Mapped the Empty States for a seller's first login (The Cold Start).
- [ ] Mapped the Empty States for a buyer's zero-result search (Query Mismatch).
- [ ] Defined the "Demand Capture" wedge (e.g., "Notify me") for unfulfilled searches.
- [ ] Designed a unified, reusable `<EmptyState />` component for the frontend architecture.
- [ ] Ensured every Empty State has at least one highly visible Call-to-Action.

---

## What's Next

Next: **Error States** — If an Empty State happens when data is missing, an Error State happens when logic breaks. We will now architect how to fail gracefully without losing the user's trust.
