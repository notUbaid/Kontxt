---
title: Cart
slug: cart
phase: Phase 3
mode: hackathon
projectType: e-commerce
estimatedTime: 20–30 min
---

# Cart

The cart is the connective tissue of your store. It receives data from the product page, displays it in the cart view, and passes it to checkout.

If cart state breaks — items disappear, quantities don't update, totals miscalculate — the demo falls apart at the most critical moment.

Build it once, build it correctly, and every other page becomes straightforward.

---

## The Core Decision: How to Manage Cart State

| Approach | Complexity | Persists on refresh | Recommended if... |
|---|---|---|---|
| **React Context + useState** | Low |  No | Fast to build, sufficient for most hackathons |
| **React Context + localStorage** | Low-medium |  Yes | Judges might refresh — adds 15 minutes of work |
| **Zustand** | Low | Optional | You're already using it or prefer a store library |
| **Redux** | High | Optional | Never for a hackathon |

> **Hackathon recommendation:** React Context + localStorage. The extra 15 minutes is worth it — judges sometimes refresh the page mid-demo, and an empty cart kills the flow.

---

## Cart Item Type

```typescript
// types/cart.ts
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
```

> Keep cart items lean. Store only what the cart needs to display and calculate. Don't store the full Product object — IDs and display fields only.

---

## Cart Context Implementation

```typescript
// context/CartContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '@/types/cart';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setItems(JSON.parse(stored));
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === newItem.productId);
      if (existing) {
        return prev.map(i =>
          i.productId === newItem.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return removeItem(productId);
    setItems(prev =>
      prev.map(i => i.productId === productId ? { ...i, quantity } : i)
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
```

**Wrap your app:**

```tsx
// app/layout.tsx
import { CartProvider } from '@/context/CartContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
```

---

## Add to Cart on the Product Page

```tsx
// Inside your ProductDetailView component
const { addItem } = useCart();

const handleAddToCart = () => {
  addItem({
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
  });
  setButtonState('added'); // drives UI feedback
  setTimeout(() => setButtonState('idle'), 2000);
};
```

```tsx
// Button states
const buttonLabels = {
  idle: 'Add to Cart',
  adding: 'Adding...',
  added: 'Added ',
};

<button
  onClick={handleAddToCart}
  disabled={buttonState === 'adding'}
  className={`add-to-cart-btn ${buttonState}`}
>
  {buttonLabels[buttonState]}
</button>
```

---

## Cart Page

```tsx
// app/cart/page.tsx
'use client';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <p>Your cart is empty.</p>
        <Link href="/products">Start Shopping →</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart ({itemCount} items)</h1>

      <div className="cart-items">
        {items.map(item => (
          <div key={item.productId} className="cart-item">
            <Image src={item.image} alt={item.name} width={80} height={80} className="object-cover" />

            <div className="cart-item-details">
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>

            <div className="cart-item-quantity">
              <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
            </div>

            <p className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>

            <button onClick={() => removeItem(item.productId)} className="remove-btn">Remove</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p className="subtotal">Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
        <p className="shipping-note">Shipping calculated at checkout</p>
        <Link href="/checkout" className="checkout-btn">Proceed to Checkout →</Link>
      </div>
    </div>
  );
}
```

---

## Cart Icon in Navigation

The cart icon with a live item count is one of the most visible signals that your store works.

```tsx
// components/CartIcon.tsx
'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" className="cart-icon-wrapper">
      <svg>/* shopping bag icon */</svg>
      {itemCount > 0 && (
        <span className="cart-badge">{itemCount}</span>
      )}
    </Link>
  );
}
```

> Style `.cart-badge` as a small filled circle with a contrasting color — red, accent color, or black. It should be visible at a glance. This is one of the first things judges notice.

---

## Passing Cart to Checkout

When the judge reaches checkout, pass the cart total to your payment logic:

```tsx
// app/checkout/page.tsx
'use client';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  // For Stripe: amount in cents
  const amountInCents = Math.round(subtotal * 100);

  const handleOrderComplete = () => {
    clearCart();
    router.push('/order-confirmation');
  };

  return (
    <CheckoutForm
      items={items}
      subtotal={subtotal}
      amountInCents={amountInCents}
      onComplete={handleOrderComplete}
    />
  );
}
```

> Call `clearCart()` only after payment succeeds or the simulated order completes. Never clear it before confirmation — if payment fails, the judge loses their cart.

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| Not persisting to localStorage | Cart empties on refresh | Add the `useEffect` localStorage sync shown above |
| `updateQuantity` allows 0 or negative | Cart shows items with qty 0 | Guard: `if (quantity < 1) return removeItem(productId)` |
| Clearing cart before order confirms | Judge sees empty cart after a failed payment | Only call `clearCart()` in `onComplete` |
| Cart badge not updating in real time | Count stays at 0 after adding items | Ensure `CartProvider` wraps the nav component |
| `subtotal` computed with integers | Rounding errors: $45.999999 | Always use `.toFixed(2)` for display, `Math.round(x * 100)` for Stripe |

---

## Validate Before You Move On

- [ ] Adding a product from the detail page updates the cart icon count immediately
- [ ] Adding the same product twice increments quantity, not adds a duplicate line
- [ ] Quantity +/− buttons work; going below 1 removes the item
- [ ] Remove button removes the item
- [ ] Subtotal updates correctly when quantity or items change
- [ ] Cart persists after page refresh
- [ ] Empty cart shows a friendly empty state with a link back to products
- [ ] Checkout button on cart page navigates to `/checkout`
- [ ] Cart clears after a completed order
- [ ] Cart badge in navigation is visible and accurate

---

> **Next module:** Checkout →
>
> You'll wire the checkout form to your cart data and payment logic, and build the order confirmation that closes the purchase loop.
