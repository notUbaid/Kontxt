---
title: Cart Architecture
slug: cart-architecture
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Cart Architecture

The shopping cart is the most frequently updated, highly concurrent data structure in an e-commerce store. 

At a small scale, storing a cart in local storage or a Postgres table is fine. At production scale, the cart is a critical performance bottleneck. It must handle rapid mutation, complex promotional logic (BOGO, tier pricing), and cross-device synchronization without slowing down the user experience.

If your cart architecture is slow, your conversion rate dies.

---

## The Three Tiers of Cart Architecture

How you store the cart dictates the speed and capabilities of your store.

### 1. Client-Side Only (Local Storage / Cookies)
The cart state lives entirely in the user's browser until they hit checkout.
- **Pros:** Zero database load. Instant updates.
- **Cons:** You cannot track abandoned carts (because the server doesn't know what's in them). You cannot sync the cart if the user switches from their phone to their laptop.
- **Verdict:** Unacceptable for a production store. Abandoned cart recovery accounts for 10-15% of total revenue in mature e-commerce businesses.

### 2. Relational Database (PostgreSQL / MySQL)
Every add-to-cart inserts a row into a `cart_items` table.
- **Pros:** Persistent, easy to query, highly structured.
- **Cons:** Slow. Database connections become a major bottleneck during high-traffic events (e.g., Black Friday). Calculating complex cart totals with joins across product, variant, and discount tables is computationally expensive.
- **Verdict:** Acceptable for low-to-medium traffic, but creates major scalability ceilings.

### 3. Edge-Cached Key-Value Store (Redis / Upstash)
The cart lives in a highly available, in-memory datastore, keyed by a session ID or User ID.
- **Pros:** Blistering fast (sub-millisecond reads/writes). Absorbs massive concurrency spikes effortlessly. Handles TTL (Time-To-Live) automatically to purge abandoned carts after 30 days.
- **Cons:** Requires managing a separate infrastructure piece.
- **Verdict:** **The standard for headless production commerce.**

---

## The Cart Payload: What to Store

A bloated cart object slows down every page transition. A lean cart object requires too many subsequent database queries. The balance is critical.

**Do NOT store:**
- Full product descriptions
- Deep category taxonomies
- High-res image arrays

**DO store (The Cart Snapshot):**
```json
{
  "cart_id": "cart_12345",
  "user_id": "user_789" // Null if guest
  "items": [
    {
      "variant_id": "var_999",
      "sku": "TSHIRT-RED-M",
      "quantity": 2,
      "price_at_add": 2500, // In cents. Used to detect price changes.
      "metadata": { "engraving": "Happy Bday" }
    }
  ],
  "applied_discounts": ["SUMMER20"],
  "subtotal": 5000,
  "expires_at": "2024-12-31T00:00:00Z"
}
```

---

## The Cross-Device Synchronization Problem

Production stores must gracefully handle the "Guest-to-Authenticated" merge.

**The Scenario:**
1. A user browses on their phone as a Guest and adds a $100 jacket to their cart (Cart A).
2. Later, they open their laptop, log into their account, and add a $50 shirt to their cart (Cart B).
3. They open the app on their phone and log in.

**The Resolution Strategy:**
When a user logs in, the system must intercept their active Guest Session Cart and merge it with their Persistent User Cart.
- *Merge Strategy:* Combine the items. If the same item exists in both, sum the quantities (or respect a max inventory limit). 
- *Orphan Strategy:* The old Guest Cart ID is deleted from Redis to prevent dangling data.

---

## The Promotions Engine (The Hardest Part)

Adding items to a list is easy. Calculating the total is exceptionally hard at scale.

If a cart has a "Buy One Get One 50% Off" rule, a "10% off Orders over $100" rule, and a specific variant is on clearance, calculating the total requires a **Promotions Engine**.

- **Do not calculate discounts on the client.** The client can be manipulated.
- **Do not hardcode discount logic.** Marketing teams need to create promotions via an Admin UI without requiring code deployments.
- **The Engine Pattern:** The cart service sends the raw cart payload to a Rules Engine (e.g., Shopify Scripts, Talon.One, or a custom microservice). The engine applies the rules in a strict priority order and returns the mutated cart with the final line-item prices.

---

## The Abandoned Cart Pipeline

The primary reason server-side carts exist is for recovery marketing.

**The Architecture:**
1. The Cart lives in Redis.
2. When the user enters their email at the first step of checkout, the Cart object is updated with their email address.
3. If the Cart is not converted to an Order within 4 hours, a cron job (or an event stream like Kafka/Inngest) detects the stagnant cart.
4. The system fires a webhook to your marketing automation tool (Klaviyo/Iterable) containing the cart URL and the abandoned items.

---

## AI Prompt — Architect Your Cart System

```prompt
I am architecting the cart system for a highly concurrent production e-commerce store.

Store Profile:
- Tech Stack: [e.g., Next.js / Redis / Postgres]
- Traffic Profile: [e.g., High concurrency flash sales]
- Promotional Complexity: [e.g., Simple percentage discounts / Complex tier-based BOGO logic]
- Target Checkout: [e.g., Stripe Hosted / Custom UI]

Act as a Principal Engineer and design the cart architecture:
1. Recommend the exact data store (Postgres vs Redis vs Platform API) for the cart and justify it based on my traffic profile.
2. Write the JSON schema for the cart object, keeping it optimized for edge delivery.
3. Define the exact logic for merging a Guest Cart with an Authenticated Cart upon user login, including conflict resolution for duplicate SKUs.
4. Explain how the system will safely calculate complex promotions without exposing pricing logic to the client.
5. Outline the event-driven architecture required to pipe abandoned carts to my marketing tool (e.g., Klaviyo) reliably.
```

---

## Cart Architecture Checklist

- [ ] High-performance storage mechanism selected (Redis or native Headless API)
- [ ] Cart payload optimized to prevent network bloat (storing only necessary identifiers and pricing)
- [ ] Guest-to-Authenticated cart merge logic explicitly defined
- [ ] Promotions engine abstraction defined (never trust client-side discount calculations)
- [ ] Cart abandonment event pipeline architected (integrating email capture with marketing tooling)
- [ ] TTL (Time-To-Live) configured to automatically purge stale guest carts and prevent database bloat
