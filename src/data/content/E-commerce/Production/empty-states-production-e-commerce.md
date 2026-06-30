---
title: Empty States
slug: empty-states
phase: Phase 1
mode: production
projectType: e-commerce
estimatedTime: 15–25 min
---

# Empty States

In e-commerce, a dead end is a lost sale. An "Empty State" occurs when the system has no data to display to the user (e.g., an empty cart, a search with zero results, or a new user's order history). 

If you design an empty state that simply says "No Results Found," you are actively telling the customer to leave your website. Production empty states are engineered to be conversion funnels.

---

## 1. The Empty Cart (The Discovery Engine)

The Cart Flyout is the highest-intent real estate on your website. When a user first opens it, it will be empty.

**The Anti-Pattern:** "Your cart is currently empty. [Continue Shopping]"

**The Production Standard:**
Transform the empty cart into a personalized discovery engine.
- If the user is logged in, query the Recommendation API (e.g., Algolia) for "Recently Viewed Items" or "Buy It Again" products based on their past orders.
- If the user is a guest, query the API for the top 3 "Global Best Sellers" or "Trending Today" SKUs.
- **The UX:** Render these products directly inside the empty cart with 1-click "Add to Cart" buttons. You are skipping the category page entirely and pushing them straight into the checkout funnel.

---

## 2. The Zero-Result Search (The Algolia Fallback)

If a user searches for "Red Jacket" and you are out of stock, returning a blank page is a catastrophic UX failure.

**The Implementation:**
Your Search API must be configured with fallback logic.
1. **Typo Tolerance Check:** Ensure it wasn't a typo (e.g., "Rd Jaket").
2. **The Soft Match:** If there are truly 0 results for "Red Jacket", the API must fallback to a broader match: "We couldn't find 'Red Jacket', but here are our best-selling 'Jackets'."
3. **The Contact Hook:** If it is a high-intent B2B search, provide an immediate fallback action: "Looking for a custom order? Chat with our sales team now."

---

## 3. The Empty Wishlist & Account State

When a new user creates an account, their Order History and Wishlist are empty. This is a missed opportunity for onboarding.

**The Implementation:**
- **Order History:** Instead of "No orders yet," display a high-quality lifestyle graphic with a CTA: "Ready for your first order? Use code WELCOME10 for 10% off."
- **Wishlist:** Instead of "Your wishlist is empty," display a brief tutorial on how the wishlist works: "Tap the Heart icon on any product to save it for later. Start browsing our New Arrivals."

---

## AI Prompt — Engineer Your Empty States

```prompt
I am designing the fallback architectures and Empty States for a production e-commerce store to prevent user drop-off.

Business Context:
- Tech Stack: [e.g., Next.js React, Algolia Search]
- Target Views: [Empty Cart, Zero-Result Search, New User Dashboard]

Act as a Principal UX Engineer:
1. Provide the specific React component logic required to transform an "Empty Cart Drawer" into a dynamic "Trending Products" recommendations feed, detailing the API fetch strategy.
2. Draft the fallback logic for an Algolia Search integration: What happens specifically when a query returns 0 results? How do we dynamically render alternative categories to keep the user engaged?
3. Design the onboarding Empty State for a newly registered user's "Order History" page, explicitly turning the blank space into a conversion driver (e.g., rendering a First-Time Buyer promo code).
```

---

## Empty States Checklist

- [ ] Empty Cart Drawer engineered to fetch and display "Trending" or "Recently Viewed" products with 1-click add buttons
- [ ] Zero-Result Search fallback logic implemented (soft-matching broader categories instead of returning a blank page)
- [ ] New User Account pages (Order History/Wishlist) designed as onboarding tutorials and conversion drivers (promo codes)
- [ ] All empty states audited to ensure there are zero "dead ends" where a user has no clear Next Action
