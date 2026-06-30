---
title: Cart Architecture
slug: cart-architecture
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Cart Architecture

The cart is the most technically interesting part of an e-commerce store. It bridges anonymous browsing and authenticated purchasing. It has to work offline, survive page refreshes, handle stock changes in real-time, and eventually convert into an order worth real money.

Get this wrong and you either lose sales (cart disappears on refresh) or create fraud surface (price manipulation). Neither is acceptable.

---

## The Core Problem

A cart exists in a strange state: it belongs to a user who might not exist yet.

This means you need to answer three questions before writing a single line of code:

> **Where does the cart live?**
> **Who does it belong to?**
> **How long does it survive?**

Every cart decision flows from these three answers.

---

## Where the Cart Lives

There are three real options:

| Storage | Pros | Cons | Use When |
|---|---|---|---|
| **Client only** (localStorage) | Zero backend cost, instant | Lost on device switch, no cross-device sync | Prototypes only |
| **Server only** (database) | Persistent, cross-device, trustworthy | Requires auth or guest session, DB reads on every page | Production standard |
| **Hybrid** (client + server sync) | Fast UX, reliable persistence | Complex sync logic, conflict resolution | Mature stores |

**For a personal project: start server-only with a guest session system.**

Client-only carts lose sales the moment a user switches devices. Hybrid carts introduce sync conflicts that are genuinely difficult to resolve correctly. Server-only is the industry default and the right default for you.

---

## Guest Sessions

Most visitors never create accounts. If your cart requires authentication, most users will never add a single item.

The solution is a **guest session**: a temporary identity that allows anyone to have a cart without registering.

```
User visits store
  → No auth token? Create guest session (UUID)
  → Store session ID in cookie (httpOnly, 7-day expiry)
  → Link cart to session ID
  → On checkout: optionally convert guest → account
```

> **Important:** Guest sessions must be stored in **httpOnly cookies**, not localStorage. This prevents XSS attacks from stealing cart data and prevents client-side JavaScript from tampering with session identity.

---

## Cart Data Model

Design this before touching your database. The shape of your cart determines everything downstream.

**Recommended schema:**

```
Cart
├── id (uuid)
├── sessionId or userId (foreign key)
├── status (active | merged | abandoned | converted)
├── currency (ISO 4217, e.g. "INR")
├── createdAt
└── updatedAt

CartItem
├── id (uuid)
├── cartId (foreign key)
├── productId (foreign key)
├── variantId (foreign key, nullable)
├── quantity (integer, min 1)
├── priceAtAdd (decimal — snapshot of price when added)
├── createdAt
└── updatedAt
```

### Why `priceAtAdd` matters

Always snapshot the price when a user adds to cart. If you change a product price after someone added it, they should see the price they committed to — not the new price.

This also closes a common attack vector: price manipulation via direct API calls. Your checkout must always verify price server-side against the current product price, but `priceAtAdd` gives you an audit trail.

---

## The Quantity Problem

Stock can run out between add-to-cart and checkout. You have to decide how aggressively to validate stock.

| Strategy | Behaviour | Tradeoff |
|---|---|---|
| **Validate at checkout only** | Show cart freely, reject at payment | Simple, but frustrating UX |
| **Validate on add** | Check stock when item is added | Can miss concurrent adds |
| **Soft reserve** | Hold stock for 15–30 min, release if no purchase | Best UX, requires a reservation table and background job |
| **Real-time sync** | Websocket pushes stock changes | Complex, overkill for personal project |

**For a personal project: validate at checkout + show "low stock" warnings on the cart page.**

Soft reservation is worth implementing if your products have genuinely limited inventory and real traffic. Otherwise it's overengineering.

---

## Cart Merge: The Authentication Problem

What happens when a guest adds items, then logs in?

You have two carts: the guest cart and the (possibly non-empty) account cart.

**Recommended merge strategy:**

```
User logs in
  → Find guest cart by session ID
  → Find account cart by user ID
  → If guest cart is empty: use account cart, delete guest cart
  → If account cart is empty: transfer guest cart to account
  → If both have items: merge, summing quantities for shared products,
    then take the lower of quantity vs. available stock
  → Delete the old guest cart
  → Associate session with authenticated user
```

> **Do not silently overwrite.** If both carts have different items, merging gives the user what they added. Overwriting is a guaranteed support ticket.

---

## API Endpoints

Keep your cart API surface minimal and intentional.

```
GET    /api/cart               → fetch current cart (guest or authed)
POST   /api/cart/items         → add item to cart
PATCH  /api/cart/items/:id     → update quantity
DELETE /api/cart/items/:id     → remove item
DELETE /api/cart               → clear entire cart
POST   /api/cart/merge         → merge guest cart on login
```

### What each endpoint must do server-side

- **All routes:** resolve identity from session cookie or auth token
- **GET:** join cart + items + products (name, image, current price, stock)
- **POST add:** validate product exists, is active, has stock; apply quantity limits
- **PATCH:** re-validate stock for new quantity
- **DELETE item:** verify item belongs to caller's cart (IDOR protection)

---

## IDOR: The Silent Vulnerability

**Insecure Direct Object Reference** is the most common cart security flaw.

If your DELETE endpoint looks like:

```
DELETE /api/cart/items/42
```

And your handler does:

```js
// Vulnerable
await db.cartItems.delete({ where: { id: 42 } })
```

Any logged-in user can delete any cart item on your entire platform by guessing item IDs.

The fix:

```js
// Secure
await db.cartItems.delete({
  where: {
    id: 42,
    cart: { userId: session.userId }  // always scope to caller
  }
})
```

Every cart operation must verify ownership. Always.

---

## Abandoned Cart Strategy

A cart with `status: active` and no activity for 24+ hours is abandoned. You have two options:

- **Keep indefinitely:** Simple. Never delete active carts. Storage cost is negligible.
- **Clean up:** Run a nightly job that marks carts `abandoned` after 7 days and deletes them after 30.

For a personal project: keep them indefinitely and only add cleanup if your DB storage becomes a concern. Premature cleanup loses the ability to analyse abandonment patterns.

---

## AI Prompt: Cart Architecture Review

Use this after you've drafted your schema and API routes.

```
You are a senior backend engineer reviewing a cart architecture for a personal e-commerce project.

Here is my current design:

SCHEMA:
[paste your Cart and CartItem table definitions]

API ROUTES:
[paste your endpoint list with descriptions]

GUEST SESSION STRATEGY:
[describe how you're handling guest sessions]

Review for:
1. Security vulnerabilities (especially IDOR, price manipulation, session theft)
2. Missing edge cases (concurrent adds, stock validation, cart merge)
3. Schema problems (missing fields, wrong data types, normalisation issues)
4. Unnecessary complexity for a personal project
5. Anything a solo developer would commonly forget

Be specific and direct. Flag critical issues first.
```

---

## Validation Checklist

Before building, confirm you've made every decision:

- [ ] Guest sessions stored in httpOnly cookies (not localStorage)
- [ ] Price snapshotted at add-to-cart (`priceAtAdd`)
- [ ] Checkout validates current price server-side regardless of `priceAtAdd`
- [ ] All cart mutations verify item ownership before acting
- [ ] Cart merge strategy is defined for guest → authenticated flow
- [ ] Stock validation strategy is chosen (validate at checkout is fine)
- [ ] `status` field distinguishes active, abandoned, and converted carts
- [ ] Currency stored on the cart, not inferred per request

---

## What to Build Next

Once your architecture decisions are made and reviewed, the natural sequence is:

**Checkout Architecture** — cart converts to order here. Payment intent is created, stock is reserved or verified, and the cart is marked `converted`. The checkout step depends entirely on the cart decisions you just made.

---

> **Filename:** `cart-architecture-personal-e-commerce.md`
