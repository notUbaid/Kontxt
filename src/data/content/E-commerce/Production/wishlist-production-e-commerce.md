---
title: Wishlist
slug: wishlist
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 15-20 min
---

# Wishlist

This is the lightest module in this phase, on purpose. Wishlist is a genuinely simple feature, and the biggest risk here isn't a tricky bug — it's overbuilding something that should take an afternoon.

---

## What Problem Wishlist Actually Solves

A customer finds something they like but isn't ready to buy. Without a wishlist, they either buy now (rare), or leave and probably never come back (common). Wishlist gives them a reason to come back.

> **Reframe:** Wishlist isn't a feature customers ask for by name — it's a retention mechanism disguised as a convenience. Keep that purpose in mind; it tells you what's actually worth building versus what's decoration.

---

## Decision: Does Wishlist Require an Account?

This connects directly to the Customer Accounts module's guest-checkout philosophy — and the same reasoning largely applies here, with one practical difference.

<table>
<tr><th>Approach</th><th>Tradeoff</th></tr>
<tr><td><strong>Account required</strong></td><td>Simple to build (just a DB table tied to customer_id) — but most visitors browsing aren't logged in, so you lose the wishlist action for guests</td></tr>
<tr><td><strong>Works for guests too (localStorage), syncs to account if logged in</strong></td><td>Captures more usage, slightly more implementation work — mirrors the Cart module's approach</td></tr>
</table>

**Recommendation for Personal Mode:** Mirror the Cart module's pattern — **store wishlist in client-side state for guests, sync to the database for logged-in customers.** You already have the client-side state pattern (Zustand + persist) built for the cart; reuse the same approach here rather than inventing a different one.

> **Why reuse the cart's pattern instead of going straight to a database table:** Consistency reduces complexity. If your cart already proves out client-side persisted state, applying the identical pattern to wishlist means less new code, less new surface area for bugs, and a codebase that's easier to reason about — exactly the kind of context-efficient decision that pays off when you're working with AI tools later, since the pattern only needs to be explained once.

---

## Implementation

```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      productIds: [],

      toggleWishlist: (productId) => {
        const current = get().productIds;
        const exists = current.includes(productId);
        set({
          productIds: exists
            ? current.filter((id) => id !== productId)
            : [...current, productId],
        });
      },

      isWishlisted: (productId) => get().productIds.includes(productId),

      clearWishlist: () => set({ productIds: [] }),
    }),
    { name: 'wishlist-storage' }
  )
);
```

For logged-in customers, optionally sync this to a simple database table:

```sql
CREATE TABLE wishlist_items (
  customer_id UUID REFERENCES customers(id),
  product_id UUID REFERENCES products(id),
  added_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (customer_id, product_id)
);
```

> **Tip:** Notice the composite primary key (`customer_id`, `product_id`) — this naturally prevents duplicate wishlist entries for the same product without needing extra application-level uniqueness checks. Let the database enforce it.

---

## Syncing Guest Wishlist on Login

Same pattern as `linkGuestOrdersToCustomer` from the Customer Accounts module — when a guest with wishlist items logs in or signs up, merge their local wishlist into their account.

```javascript
async function syncWishlistOnLogin(customerId, localProductIds) {
  if (localProductIds.length === 0) return;

  const values = localProductIds.map((id) => `('${customerId}', '${id}')`).join(',');
  await db.query(
    `INSERT INTO wishlist_items (customer_id, product_id) 
     VALUES ${values} 
     ON CONFLICT (customer_id, product_id) DO NOTHING`
  );

  useWishlistStore.getState().clearWishlist(); // local state no longer needed
}
```

> **Why `ON CONFLICT DO NOTHING`:** If a product is already in their account-level wishlist (from a previous session) and also in their current local wishlist, this avoids a duplicate-key error and just skips it — exactly the right behavior without needing extra conditional logic.

---

## Where Wishlist Shows Up in the UI

Keep this minimal — two touchpoints are enough:

1. **A heart/save icon on product cards and product pages** — toggles wishlist state, should reflect current state immediately (optimistic, since it's just local/synced state, no loading needed)
2. **A `/wishlist` page** listing saved products, with quick "Add to Cart" directly from the list

```javascript
function WishlistButton({ productId }) {
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const saved = isWishlisted(productId);

  return (
    <button onClick={() => toggleWishlist(productId)} aria-label="Save to wishlist">
      <HeartIcon filled={saved} />
    </button>
  );
}
```

---

## AI Prompt: Implement Wishlist

```
I'm implementing a wishlist feature for a personal e-commerce store. I already 
have a cart implemented with Zustand + persist middleware, storing only IDs 
client-side and resolving product data at display time.

Requirements:
1. A wishlistStore following the exact same pattern as my cart store — 
   client-side state, persisted to localStorage, storing only productId
2. A toggleWishlist function and isWishlisted check
3. A wishlist_items table (composite primary key on customer_id + product_id, 
   no separate id column needed) for logged-in customer sync
4. A syncWishlistOnLogin function that merges local wishlist into the account 
   on login, using ON CONFLICT DO NOTHING, then clears local state
5. A simple /wishlist page component that resolves product data and shows 
   Add to Cart per item

My existing cart store: [paste your cart store code from the Cart module]
```

> **Token efficiency tip:** Pasting your actual cart store and explicitly asking AI to mirror its pattern produces far more consistent code than describing the pattern from scratch — and takes fewer tokens than re-explaining the whole client-state architecture.

---

## Validating AI-Generated Wishlist Code

- [ ] Does the wishlist store only `productId` — no duplicated product data, consistent with the cart's approach?
- [ ] Does `wishlist_items` use a composite primary key to prevent duplicate entries naturally, rather than a separate uniqueness check in application code?
- [ ] Does `syncWishlistOnLogin` handle the case where a product is already wishlisted on the account (no error, no duplicate)?
- [ ] Is the wishlist button state (filled/unfilled heart) accurate immediately on click, without needing a page refresh or loading state?

> **Common AI mistake:** AI sometimes builds wishlist as a database-only feature requiring login, missing the guest-support requirement entirely if you don't explicitly state it. Always specify the guest behavior up front — it's easy for AI to default to "simplest possible" which usually means account-gated.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Wishlist sharing (sending your wishlist to someone else — gift registry style)
- Price-drop notifications for wishlisted items
- Multiple named wishlists per customer ("Birthday list," "Someday list")
- Wishlist analytics/reporting

These are real features for a mature store. A single, simple saved-items list is the right scope here.

---

## Implementation Checklist

- [ ] Wishlist store implemented mirroring the cart's Zustand + persist pattern
- [ ] `toggleWishlist` and `isWishlisted` working correctly
- [ ] `wishlist_items` table created with composite primary key
- [ ] `syncWishlistOnLogin` implemented and tested with overlapping items
- [ ] Wishlist button/icon added to product cards and product pages
- [ ] `/wishlist` page built, showing saved products with Add to Cart
- [ ] Verified: adding to wishlist as a guest, then logging in, correctly merges into account

---

## What's Next

With customer-facing shopping features complete, it's time to build the tools you'll actually use to run the store day to day — that's **Admin Dashboard**, next in this phase.
