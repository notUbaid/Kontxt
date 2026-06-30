---
title: Cross-Sells Strategy
slug: cross-sells
phase: Phase 6
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Cross-Sells Strategy

A cross-sell is convincing the user to buy an *additional, complementary* item (e.g., adding a memory card to a camera purchase). 

Like upsells, cross-sells are the primary driver of Average Order Value (AOV). However, the engineering implementation is different because you are appending to an array of cart items, rather than replacing a variant.

---

## 1. Contextual Relevance (The API)

If a user adds a Macbook to their cart, and your cross-sell algorithm recommends a pair of socks, the user will ignore it. Cross-sells must be contextually perfect.

**The Implementation:**
Use a Machine Learning Recommendation API (e.g., AWS Personalize, Algolia, or Rebuy).
- **The Query:** The backend sends the current Cart contents to the API.
- **The Filter:** The API must filter the recommendations to return items categorized as "Accessories" or "Add-ons". It should explicitly exclude items that are already in the cart, and items that are out of stock.

---

## 2. Product Bundling (Database Architecture)

The most effective cross-sell is a pre-configured Bundle (e.g., "The Starter Kit: Camera + Lens + Bag for 10% off").

**The Engineering Problem:**
How does the database track a Bundle? If you create a single SKU called "Starter Kit," your warehouse won't know they need to pick 3 physical items off the shelf. Your inventory tracking will break.

**The Production Solution:**
The database must support **Composite Products**.
- Create a `Bundle` record that acts purely as a virtual wrapper.
- The `Bundle` has a many-to-many relationship with `Variants` (the actual physical items).
- When a user buys the Bundle, the Cart API explodes the Bundle into its component parts, applies the bundled discount proportionally across the items, and decrements the actual physical inventory of the 3 components.

---

## 3. Shipping Threshold Cross-Sells

The most powerful psychological trigger in e-commerce is "Free Shipping."

**The Implementation:**
If your Free Shipping threshold is $100, and the user's cart is $85, you must explicitly cross-sell them an item that costs exactly $15 to $25.
- The Cart UI calculates: `100 - cart_total = 15`.
- The UI queries the Recommendation API: `fetch('/api/recommend?type=cross-sell&min_price=15&max_price=25')`.
- The UI renders a progress bar: "You are $15 away from Free Shipping! Add this premium cleaning kit to unlock it."

---

## 4. The Cart Flyout UI

Do not wait for the user to navigate to the `/cart` page to cross-sell them.

**The Implementation:**
Implement a Cart Flyout (or Cart Drawer) component in React.
- Every time an item is added to the cart, the drawer slides open.
- The drawer displays the current items, the Free Shipping progress bar, and a horizontal scrolling list of 1-click cross-sell items.
- Because this drawer can open on any page of the site, its data fetching logic must be wrapped in a global state manager or a highly cached `useSWR` hook to prevent sluggish rendering.

---

## AI Prompt — Architect Your Cross-Sell Engine

```prompt
I am implementing the Cross-Sell and Bundling architecture for a production e-commerce store.

Tech Stack:
- Database: [e.g., Postgres / Prisma]
- Recommendation API: [e.g., Algolia / Custom]
- Frontend: [e.g., Next.js React]

Act as a Principal Growth Engineer:
1. Provide the Prisma database schema required to support "Composite Products" (Bundles), ensuring that a single Bundle SKU maps to multiple physical inventory SKUs.
2. Write the Cart API backend logic that "explodes" a Bundle into its component parts during checkout, ensuring inventory is decremented correctly across the individual items.
3. Outline the frontend React logic required to calculate the "Delta to Free Shipping" and fetch a dynamic cross-sell recommendation specifically priced to push the user over that threshold.
4. Explain how to configure a Machine Learning recommendation engine to exclude items already in the user's cart from the cross-sell suggestions.
```

---

## Cross-Sells Checklist

- [ ] Machine Learning Recommendation API (Algolia/Personalize) integrated for context-aware cross-sells
- [ ] Database schema updated to support Composite Products (Bundles) linked to physical SKUs
- [ ] Cart API logic engineered to explode bundles into component items for accurate warehouse routing
- [ ] Shipping Threshold math implemented in the Cart UI to dynamically recommend add-ons priced to unlock free shipping
- [ ] Global Cart Drawer (Flyout) component built in React to present cross-sells instantly upon "Add to Cart" interactions
