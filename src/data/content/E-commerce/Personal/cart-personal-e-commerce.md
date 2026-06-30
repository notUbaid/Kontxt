---
title: Cart
slug: cart
phase: Phase 3
mode: personal
projectType: e-commerce
estimatedTime: 20-25 min
---

# Cart

The cart is the most-interacted-with piece of UI in your entire store, and the one place where a small bug (wrong total, item that won't remove, quantity that doesn't update) directly costs you a sale. This module covers building a cart that's fast, correct, and doesn't fight the inventory system you just built.

---

## Decision: Where Does the Cart Live?

This is the foundational decision for this module — and it connects directly to the architecture note from your Documentation module.

<table>
<tr><th>Approach</th><th>How it works</th><th>Tradeoff</th></tr>
<tr><td><strong>Client-side state only</strong></td><td>Cart lives in browser state (Zustand/Context), persisted to localStorage</td><td>Fast, zero DB writes for browsing — doesn't sync across devices</td></tr>
<tr><td><strong>Server-persisted cart</strong></td><td>Cart stored in DB, tied to a session or user ID, synced on every change</td><td>Syncs across devices/sessions — more DB writes, more complexity</td></tr>
<tr><td><strong>Hybrid</strong></td><td>Client-side for guests, synced to DB once a user logs in</td><td>Best of both — extra implementation complexity</td></tr>
</table>

**Recommendation for Personal Mode:** **Client-side state, persisted to localStorage.** Most personal stores don't have enough cross-device traffic to justify server-synced carts, and this approach means zero database writes just from someone browsing and adding items — which keeps your Supabase usage low and your app fast.

> **Why this matters:** A server-persisted cart means every "add to cart" click is a network round-trip and a database write — for an action that might get abandoned seconds later. Client-side state makes the cart instant, and you only touch the database once, at checkout, when it actually matters.

---

## Cart State Shape

Keep the cart's source of truth minimal — store IDs and quantities, not full product data, and resolve full product details (current price, current stock, current name) at read time.

```typescript
interface CartItem {
  productId: string;
  variantId?: string; // if the product has variants
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (productId: string, variantId: string | undefined, quantity: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
}
```

> **Critical concept — why not store price/name in the cart itself:** If you store the price at "add to cart" time and the product price changes before checkout, your cart shows stale pricing — a real trust problem when the displayed total doesn't match what gets charged. Always resolve current price, name, and image by looking up the product fresh whenever the cart is displayed. The cart stores *what* and *how many*, never *what it costs* or *what it's called*.

---

## Implementing With Zustand

Zustand is a good fit here: minimal boilerplate, built-in persistence middleware, and no provider wrapping needed.

```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId, variantId, quantity) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.productId === productId && i.variantId === variantId
        );

        if (existing) {
          set({
            items: items.map((i) =>
              i === existing ? { ...i, quantity: i.quantity + quantity } : i
            ),
          });
        } else {
          set({ items: [...items, { productId, variantId, quantity }] });
        }
      },

      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        });
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity }
              : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' } // localStorage key
  )
);
```

> **Tip:** Setting quantity to 0 should remove the item, not leave a zero-quantity row sitting in the cart. The implementation above handles this by routing `updateQuantity(0)` straight to `removeItem` — a small detail that's easy to forget and produces a confusing "0 items, $4.99 shipping" cart state.

---

## Resolving Live Product Data

Since the cart only stores IDs and quantities, your cart UI needs to fetch current product data to display anything useful.

```javascript
function useCartWithProducts() {
  const items = useCartStore((s) => s.items);
  const [products, setProducts] = useState({});

  useEffect(() => {
    if (items.length === 0) return;
    const ids = items.map((i) => i.productId);
    fetchProductsByIds(ids).then((results) => {
      setProducts(Object.fromEntries(results.map((p) => [p.id, p])));
    });
  }, [items]);

  return items.map((item) => ({
    ...item,
    product: products[item.productId],
  })).filter((item) => item.product); // drop items whose product no longer exists
}
```

> **Best Practice card — handling deleted/archived products gracefully:** If a customer added a product to their cart weeks ago and you've since archived it, the cart should silently drop it (as shown above with `.filter`) rather than crashing or showing a broken row. Consider showing a brief "1 item was removed from your cart because it's no longer available" notice instead of failing silently with no explanation.

---

## Calculating Totals

This connects directly to the unit tests you wrote in the Testing module — the cart total calculation should be the exact function you tested.

```javascript
function calculateCartTotal(itemsWithProducts, discount = null) {
  const subtotal = itemsWithProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let discountAmount = 0;
  if (discount) {
    discountAmount = discount.type === 'percent'
      ? subtotal * (discount.value / 100)
      : Math.min(discount.value, subtotal); // never discount below zero
  }

  const total = Math.max(0, subtotal - discountAmount);

  return { subtotal, discountAmount, total };
}
```

> **Reuse, don't duplicate:** This is the same logic you unit-tested in the Testing module. Import it from a shared `lib/cart.ts`, don't reimplement it in your cart UI component. Duplicated pricing logic is exactly how carts and checkouts end up showing different totals for the same order — a bug that's both embarrassing and erodes trust instantly.

---

## Validating Stock Before Checkout

The cart should check current stock before letting someone proceed to checkout — not to decrement it yet (that happens on payment success, per the Inventory module), but to catch the obvious case of someone trying to buy more than exists.

```javascript
function validateCartStock(itemsWithProducts) {
  const issues = [];
  for (const item of itemsWithProducts) {
    const availableStock = item.product.variantId
      ? item.product.variantStock
      : item.product.stock;

    if (item.quantity > availableStock) {
      issues.push({
        productId: item.productId,
        requested: item.quantity,
        available: availableStock,
      });
    }
  }
  return issues;
}
```

If `validateCartStock` returns issues, show them clearly ("Only 2 left of [Product] — your cart has 5") and let the customer adjust before proceeding. This is a UX safeguard, not the actual oversell prevention — that atomic check still happens at payment time, per the Inventory module.

---

## AI Prompt: Implement the Cart

```
I'm implementing the shopping cart for a personal e-commerce store using 
[React/Next.js] and Zustand.

Requirements:
1. Cart store holding only productId, variantId (optional), and quantity — 
   no price or name stored in cart state
2. Persisted to localStorage via Zustand's persist middleware
3. addItem should merge quantities if the same product+variant already exists 
   in the cart, not create a duplicate line
4. updateQuantity(0) should remove the item, not leave a zero-quantity row
5. A hook that resolves current product data (price, name, image, stock) for 
   display, and gracefully drops cart items whose product no longer exists
6. A calculateCartTotal function matching this signature: [paste your tested 
   function signature from the Testing module]
7. A validateCartStock function that flags items where requested quantity 
   exceeds current available stock, for use before allowing checkout

My product schema: [paste schema]
```

> **Token efficiency tip:** Reference the exact `calculateCartTotal` signature you already tested rather than letting AI reinvent the pricing logic — this guarantees your cart, checkout, and tests all agree on how totals are calculated.

---

## Validating AI-Generated Cart Code

- [ ] Does the cart store IDs and quantities only — no price, name, or image baked into cart state?
- [ ] Does adding an already-in-cart item merge quantities, or create a duplicate line item?
- [ ] Does setting quantity to 0 (or below) remove the item cleanly?
- [ ] Is `calculateCartTotal` the same function you unit-tested, imported and reused — not reimplemented inline in a component?
- [ ] Does the cart gracefully handle a product that's been archived/deleted since it was added?
- [ ] Is localStorage persistence wrapped safely (no crash if localStorage is unavailable, e.g., private browsing in some browsers)?

> **Common AI mistake:** AI frequently bakes the product price into the cart item at "add to cart" time, because it's simpler to display without a join/lookup. This creates the stale-pricing bug described earlier. Always push back and require price resolution at display/checkout time, not storage time.

---

## Cart UX Details Worth Getting Right

These are small, but they're the difference between a cart that feels solid and one that feels like a student project:

- **Optimistic UI**: quantity changes and removals should feel instant (client-state means this is free — no loading spinner needed for cart actions)
- **Persistent across page reloads**: localStorage persistence handles this — verify it actually works after a hard refresh
- **Cart icon badge**: show item count in your header/nav at all times, updating immediately on add
- **Empty cart state**: don't show a blank page — link back to browsing, maybe show popular products

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Server-synced carts across devices
- Saved-for-later / wishlist-within-cart functionality (Wishlist is its own module later)
- Cart sharing (sending a cart link to someone else)
- Multi-currency cart totals
- Real-time stock updates while sitting in the cart (re-checking stock is enough at checkout time)

---

## Implementation Checklist

- [ ] Cart store implemented (Zustand or equivalent), storing only productId, variantId, quantity
- [ ] Persisted to localStorage, verified to survive a hard page refresh
- [ ] Adding an existing item merges quantity instead of duplicating
- [ ] Quantity of 0 removes the item
- [ ] Product data (price, name, image, stock) resolved live at display time, not stored in cart
- [ ] Cart gracefully handles archived/deleted products without crashing
- [ ] `calculateCartTotal` reused from shared lib, matching your tested implementation
- [ ] `validateCartStock` implemented and surfaces clear messaging before checkout
- [ ] Cart icon/badge updates immediately on add/remove
- [ ] Empty cart state designed with a path back to browsing

---

## What's Next

With a working, correct cart, it's time to turn cart contents into an actual order — that's **Checkout**, next in this phase.
