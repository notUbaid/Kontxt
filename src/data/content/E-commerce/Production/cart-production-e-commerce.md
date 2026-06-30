---
title: Cart Implementation
slug: cart
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 35–45 min
---

# Cart Implementation

The shopping cart is the most frequently mutated state in an e-commerce application. 
If the cart is slow, users abandon it. If the cart math is wrong, you lose money or face legal liabilities regarding tax and pricing laws.

At production scale, the cart must be heavily optimized for speed (Edge caching) while maintaining absolute mathematical precision via a secure backend API.

---

## 1. Edge-Cached Storage (Redis)

Storing the cart in a relational database (Postgres) creates a massive bottleneck. A user might add, remove, and adjust quantities 10 times in a single session. Hitting Postgres 10 times just to update a quantity integer is an architectural flaw.

**The Implementation:**
Store the active cart in a fast, in-memory store like **Redis** (e.g., Upstash).
1. Generate a UUID for the `cart_id` on the client. Store it in an HTTP-only, secure cookie.
2. The Cart data lives in Redis: `SET cart:12345 '{ "items": [...] }' EX 2592000`
3. Notice the `EX 2592000` (30 days in seconds). Carts must have a TTL (Time To Live). If you do not expire abandoned carts, your Redis instance will run out of memory and crash.

---

## 2. Server-Side Math Verification

**Never trust client-side math.**
If your React frontend calculates `itemPrice * quantity` and sends `total: $50` to the checkout API, a malicious user can open Chrome DevTools, change the total to `$1`, and steal your products.

**The Implementation:**
The frontend only sends *Intents* to the cart API.
- Client sends: `POST /api/cart/add { variantId: '123', qty: 1 }`
- Backend Action: 
  1. Fetch the Cart from Redis.
  2. Query the Product Database to get the *current, real price* of Variant 123.
  3. Calculate the new subtotal on the server.
  4. Save the updated cart to Redis.
  5. Return the calculated cart to the frontend.

---

## 3. The Guest-to-Authenticated Merge

Users browse on their phones (Guest), log in on their laptops (Auth), and expect their cart to follow them seamlessly.

**The Merge Implementation:**
When a user successfully logs in via your Identity Provider (e.g., Auth0 or NextAuth):
1. Intercept the login success callback.
2. Check if the device has a Guest `cart_id` cookie.
3. Check if the User has a saved `user_cart_id` in the database.
4. If both exist, merge the arrays. (Decide your business logic: Do you sum the quantities of duplicate items, or take the highest quantity?)
5. Overwrite the Redis cart with the merged data, assign it to the User ID, and delete the orphaned Guest cart to save memory.

---

## 4. The Promotions Engine (Discounts)

Applying a 10% discount is easy. Applying "Buy One Get One 50% Off, but only on Clearance items, maximum 3 uses per customer" requires a specialized Promotions Engine.

**The Implementation:**
Do not hardcode discount logic. 
- Use a Rules Engine (like Shopify Scripts, Talon.One, or a custom microservice).
- The Cart API passes the raw items to the Rules Engine.
- The Engine evaluates active marketing campaigns, applies the discounts, and returns the modified cart.
- **Visuals:** The API must return *both* the original price and the discounted price so the frontend can render the psychological "strike-through" pricing (e.g., ~~$50.00~~ $45.00).

---

## AI Prompt — Architect Your Cart API

```prompt
I am implementing the Cart API for a production e-commerce store.

Tech Stack:
- Frontend: [e.g., Next.js App Router]
- Database: [e.g., Postgres]
- Cache: [e.g., Redis]

Act as a Principal Backend Engineer:
1. Write the exact Node.js/TypeScript endpoint for `POST /api/cart/add`. Demonstrate how to fetch the secure price from Postgres, update the cart payload in Redis, and return the safe calculated total.
2. Provide the implementation logic for the "Guest-to-Authenticated Merge" when a user logs in, including handling duplicate SKUs in both carts.
3. Define the JSON schema for the Cart object stored in Redis. How do we structure it to support line-item level discounts (e.g., BOGO) vs order-level discounts (e.g., 10% off total)?
4. Explain how to configure the Redis TTL to automatically purge abandoned carts, and how to pipe those abandoned carts to a marketing tool like Klaviyo before they are deleted.
```

---

## Cart Implementation Checklist

- [ ] Cart state stored in an edge-cached datastore (Redis) for sub-millisecond updates
- [ ] Cart API enforces server-side math; client-side price submissions strictly ignored
- [ ] TTL (Time-To-Live) configured on all carts to prevent infinite memory bloat
- [ ] Guest-to-Authenticated merge logic implemented securely upon user login
- [ ] Cart API payload structured to support strike-through pricing and line-item discounts
