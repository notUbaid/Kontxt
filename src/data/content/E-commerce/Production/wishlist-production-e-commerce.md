---
title: Wishlist Implementation
slug: wishlist
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Wishlist Implementation

A wishlist is not just a secondary cart. In a production environment, the wishlist is a high-signal data asset used for inventory forecasting and personalized marketing automation.

If you implement the wishlist purely in `localStorage`, you lose this data the moment the user clears their cache, and you cannot use it to drive revenue.

---

## 1. The Data Architecture

A production wishlist must be persistent, synchronized across devices, and tied to a user's identity.

**The Database Schema:**
```prisma
model Wishlist {
  id        String   @id @default(uuid())
  userId    String   @unique // 1:1 relation with User
  items     WishlistItem[]
}

model WishlistItem {
  id        String   @id @default(uuid())
  wishlistId String
  variantId String   // Direct link to the sellable SKU
  addedAt   DateTime @default(now())
}
```

**The Guest Problem:**
Like the cart, users often add items to a wishlist before logging in.
- **Implementation:** Store a temporary `guest_wishlist_id` in a secure cookie. When the user logs in, execute a merge operation to combine their guest wishlist items with their persistent database wishlist.

---

## 2. Marketing Automation Hooks (The Revenue Driver)

The primary ROI of a wishlist feature is the ability to send triggered emails.

**Trigger 1: Price Drop Alerts**
If a product goes on sale (e.g., from $100 to $80), your backend must query the `WishlistItem` table to find every user who saved that `variantId`.
- **Implementation:** Push an event to your marketing tool (e.g., Klaviyo) containing the user emails and the product data.
- **Result:** An automated email goes out: *"An item on your wishlist is now 20% off."* This has an incredibly high conversion rate.

**Trigger 2: Back in Stock Alerts**
If a sold-out item is restocked, execute the same query to notify users who wishlisted it.
- **Important Constraint:** If 5,000 people wishlisted an item, but you only received 50 units in the restock, do not email all 5,000 people. You will create 4,950 angry customers. Your backend must chunk the notifications (e.g., email 100 people, wait an hour, check inventory, email 100 more).

---

## 3. Frontend Optimistic UI

The "Heart" icon must feel instantaneous.

**The Anti-Pattern:** A user clicks the heart, a loading spinner appears for 2 seconds while the database updates, and then the heart turns red.

**The Production Pattern: Optimistic UI**
1. The user clicks the heart.
2. The UI *instantly* turns red (optimistically assuming success).
3. The background fetch (`POST /api/wishlist/add`) executes.
4. If the fetch fails (e.g., network error), the UI reverts back to an empty heart and displays a toast notification: "Failed to save item."

```typescript
// React/SWR Optimistic UI example
const toggleWishlist = async () => {
  mutate('/api/wishlist', (currentData) => [...currentData, newVariant], false); // Update UI instantly
  
  try {
    await fetch('/api/wishlist/add', { method: 'POST', body: JSON.stringify({ variantId }) });
    mutate('/api/wishlist'); // Revalidate with server truth
  } catch (error) {
    mutate('/api/wishlist'); // Revert on failure
    toast.error('Failed to add to wishlist');
  }
}
```

---

## 4. Shareable Wishlists (Social Proof)

Users want to share their wishlists for birthdays and holidays.

**Implementation:**
- Add a boolean field `isPublic` to the `Wishlist` model.
- Generate a unique, unguessable slug (e.g., `/wishlist/u_aB8x9Y2z`).
- When a third-party views this URL, the frontend must hide the "Remove" buttons and instead display "Add to My Cart" buttons.

---

## AI Prompt — Architect Your Wishlist System

```prompt
I am implementing a persistent Wishlist feature for a production e-commerce store.

Tech Stack:
- Frontend: [e.g., React / Next.js]
- Database: [e.g., Postgres]
- Marketing Tool: [e.g., Klaviyo]

Act as a Principal Full-Stack Engineer:
1. Write the React component logic (using SWR or React Query) to implement an Optimistic UI for the Wishlist "Heart" button.
2. Provide the database schema and the Node.js API logic required to merge a temporary cookie-based Guest Wishlist with a permanent User Wishlist upon login.
3. Design the background job architecture required to execute a "Price Drop Alert". When a price changes in the DB, how do we efficiently query the wishlist table and push those events to Klaviyo without blocking the main thread?
```

---

## Wishlist Implementation Checklist

- [ ] Wishlist state persisted in the primary database (not just local storage)
- [ ] Guest-to-Authenticated merge logic implemented to preserve pre-login intent
- [ ] Optimistic UI patterns applied to all wishlist interactions for instant visual feedback
- [ ] Backend hooks established to trigger Price Drop and Back in Stock alerts
- [ ] Throttle logic implemented for Back in Stock emails to prevent overselling limited inventory
- [ ] Public sharing URLs securely generated (read-only mode) if social sharing is required
