---
title: Cart
slug: cart
phase: Phase 3 E Commerce Development
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Cart State Management & Hydration

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 60 Minutes

A beginner builds a shopping cart by storing an array of products in React's `useState`. When the user closes the browser tab and comes back tomorrow, the cart is empty. 

A slightly better beginner stores the cart in `localStorage`. But when they render the React component on the Next.js server, the server doesn't have access to the browser's `localStorage`. This causes a **Hydration Mismatch Error**, crashing the Next.js application immediately.

In Phase 3, you must engineer a highly resilient **Client-Side Cart Store** using Zustand, implement strict **Hydration Protections**, and engineer **Server-Authoritative Validation**.

---

## 1. The Zustand Persist Middleware

Redux is too bloated. React Context requires unnecessary re-renders. 

**The Production Solution:**
You must use **Zustand**. It is a tiny, mathematically sound state management library that integrates flawlessly with React. Furthermore, you must wrap your Zustand store in the `persist` middleware, which automatically syncs the cart state to the browser's `localStorage`.

```typescript
// store/useCartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  // NEVER STORE PRICE HERE (Explained in Section 3)
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => {
        // Prevent duplicate entries; increment quantity instead
        const existing = state.items.find(i => i.variantId === item.variantId);
        if (existing) {
          return {
            items: state.items.map(i => 
              i.variantId === item.variantId ? { ...i, quantity: i.quantity + item.quantity } : i
            )
          };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (variantId) => set((state) => ({
        items: state.items.filter(i => i.variantId !== variantId)
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'ecommerce-cart-storage', // The key used in localStorage
    }
  )
);
```

## 2. Preventing Hydration Crashes

Next.js is a Server-Side Rendering (SSR) framework. When the server renders the `<CartIcon />` component, it assumes the cart has `0` items (because servers don't have `localStorage`). 

When that HTML reaches the browser, React reads `localStorage`, realizes there are `3` items in the cart, and immediately throws a **Hydration Error** because the Server HTML (0) and the Client HTML (3) do not match.

**The Production Solution:**
You must write a custom React hook that prevents the component from rendering the stored data until it can mathematically prove it is running in the browser.

```typescript
// hooks/useStore.ts
import { useState, useEffect } from 'react';

// This hook forces the component to wait for Hydration to complete
export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
```

**Usage in your Header:**
```tsx
'use client';
import { useCartStore } from '@/store/useCartStore';
import { useStore } from '@/hooks/useStore';

export function CartIcon() {
  // If hydration hasn't finished, this returns undefined
  const items = useStore(useCartStore, (state) => state.items);
  
  if (!items) return <span>🛒 (0)</span>; // Server HTML (Matches perfectly)
  
  return <span>🛒 ({items.length})</span>; // Client HTML (Updates safely)
}
```

## 3. Server-Authoritative Math (Security)

Notice how the `CartItem` interface in Section 1 does **not** contain a `price` variable?

If you store `{ price: 100 }` in the Zustand cart, it gets saved to `localStorage`. A hacker can open Chrome Developer Tools, edit `localStorage`, change the price to `{ price: 1 }`, and check out. If your server trusts the client's math, you just lost $99.

**The Production Solution:**
The frontend cart is a dumb terminal. It only knows *what* the user wants (the `variantId`) and *how many* they want (the `quantity`).

When the user opens the Cart Drawer, the Next.js server must intercept those `variantIds`, fetch the real, immutable prices from the database, and execute the math on the server. The server then sends the total back to the frontend to render.

---

## ✅ Cart Engineering Checklist

- [ ] Utilize Zustand with the `persist` middleware to ensure the cart survives page refreshes.
- [ ] Implement a strict Hydration Hook (`useStore`) to prevent Next.js SSR crashes.
- [ ] Ban prices from the client-side state. Enforce Server-Authoritative Math.
- [ ] Use the AI prompt below to generate the complete Cart infrastructure.

---

## AI Prompt — Engineer the Client Cart

Copy this prompt into your AI to have it write the highly secure, hydration-safe Zustand state manager.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Frontend Engineer. We are engineering our Client-Side Cart State Management.

I need you to generate the following strict, production-ready React implementations:

**1. The Secure Zustand Store:**
Write the `store/useCartStore.ts` file using Zustand and the `persist` middleware.
- Define the `CartItem` interface explicitly containing `productId`, `variantId`, and `quantity`. Do NOT include a price property.
- Write the logic for `updateQuantity(variantId, quantity)`. If the user updates the quantity to `0`, the logic must automatically remove the item from the array instead of leaving an orphaned zero-quantity object.

**2. The Hydration Safe Hook:**
Write the custom React hook (e.g., `useHydrationSafeStore.ts`) that uses `useState` and `useEffect` to safely bridge the gap between Next.js SSR and the browser's `localStorage`, preventing React Hydration Mismatch errors.

**3. The Server-Authoritative Calculation:**
Write a Next.js Server Action (`calculateCartTotal.ts`) that accepts an array of `variantIds`. Show how it queries our Prisma database to get the real prices for those variants, multiplies them by the quantities, and returns a mathematically secure `subtotal` and `tax` value back to the frontend.
````

**Next: Checkout Engineering →**
