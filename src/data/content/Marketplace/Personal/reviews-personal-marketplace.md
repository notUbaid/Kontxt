---
title: Reviews
slug: reviews
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Reviews

Reviews are how trust scales in a marketplace without you manually vetting every seller. They're also one of the easiest features to get wrong in a way that quietly destroys the thing they're supposed to build: trust.

You already made the core authorization decision for this back in Authorization Rules — only buyers with a completed order can review. This module is about everything around that: the data model, aggregation, and the abuse patterns to design against from day one.

---

## The Data Shape

> ** Core rule:** A review belongs to an **order**, not just a user pair. This is what makes "one review per completed transaction" enforceable at the database level instead of relying on application logic you might forget to check somewhere.

```prisma
model Review {
  id         String   @id @default(cuid())
  orderId    String   @unique // one review per order — enforced here
  reviewerId String
  sellerId   String
  rating     Int      // 1-5
  comment    String?
  createdAt  DateTime @default(now())

  order      Order    @relation(fields: [orderId], references: [id])

  @@index([sellerId])
}
```

The `@unique` on `orderId` is doing the real enforcement. Without it, "one review per order" is just a rule you hope your application code remembers everywhere — and it won't, eventually.

---

## Decision: Aggregate Rating — Computed or Stored?

> ** Decision Card — Seller Rating**
>
> **Option A: Compute on read** (`AVG(rating) WHERE sellerId = ?` every time a profile loads)
> Always accurate, simple, no extra writes. Slight cost: a query + aggregation on every profile view.
>
> **Option B: Store and update a cached `averageRating` field on the User model**
> Faster reads, but now you have a value that can drift out of sync if an update path is missed.
>
> **For Personal Mode: use Option A.** At personal-project scale, computing the average on read is not a performance problem, and you completely eliminate an entire category of "stale rating" bugs. Revisit caching only if you have real traffic data showing it's needed.

```js
const result = await db.review.aggregate({
  where: { sellerId },
  _avg: { rating: true },
  _count: true,
});
// result._avg.rating, result._count
```

---

## Designing Against Review Abuse

This is the part beginners skip and regret. A review system with no abuse protection becomes useless within weeks of real users.

> ** Validation Checklist**
> - [ ] Can a seller review themself? (Block: `reviewerId !== sellerId`, redundant with the completed-order check but worth asserting explicitly)
> - [ ] Can a buyer leave multiple reviews for one order? (Blocked by the `@unique` constraint on `orderId`)
> - [ ] Can a review be left before the order is marked `completed`? (Must check order status, not just existence)
> - [ ] Is there an edit window, or are reviews permanent? (Recommend: editable for 48 hours, then locked — prevents both regret-deletion of legitimate negative reviews and indefinite tampering)
> - [ ] Can a seller respond to a review? (Worth adding — gives sellers recourse without enabling them to delete/hide criticism)

> **️ Warning:** Never let sellers delete reviews on their own listings, even negative ones. This is the fastest way to make your review system meaningless — and meaningless reviews are worse than no reviews, because they create false trust.

---

## Review Submission Flow

Building on the `requireCompletedOrder` middleware from Authorization Rules:

```js
router.post(
  "/orders/:orderId/review",
  requireAuth,
  requireCompletedOrder,
  async (req, res) => {
    const { rating, comment } = req.body;

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be an integer 1-5" });
    }

    const review = await db.review.create({
      data: {
        orderId: req.order.id,
        reviewerId: req.user.id,
        sellerId: req.order.sellerId,
        rating,
        comment: comment?.slice(0, 1000), // hard cap, defense in depth
      },
    });

    res.status(201).json(review);
  }
);
```

Note this reuses `requireCompletedOrder` from the prior module rather than rewriting the check — this is the payoff of building authorization as reusable middleware instead of inline conditionals.

---

## AI Prompt: Generate the Review System

> ** Copy Prompt**
>
> ```
> Build a review system for a personal marketplace project.
> Stack: [YOUR STACK — e.g. Node.js/Express, Prisma, PostgreSQL/SQLite].
>
> Schema:
> [PASTE YOUR REVIEW SCHEMA HERE]
>
> Requirements:
> - POST /orders/:orderId/review — reuse my existing requireCompletedOrder middleware, don't recreate the check
> - One review per order, enforced at the database level via a unique constraint on orderId
> - Rating must be an integer 1-5, comment capped at 1000 characters
> - GET /sellers/:id/rating — compute average rating and count on read (no cached/stored average field)
> - Reviews are editable by the original reviewer for 48 hours after creation, then locked
> - Sellers cannot delete reviews on their own listings under any circumstance
> - Add a sellerResponse field sellers can set once, so they can publicly respond without hiding the review
> ```
>
> **Why this prompt works:** it explicitly forbids a behavior (sellers deleting reviews) instead of just listing what to build. AI defaults toward giving resource owners full CRUD control unless told otherwise — naming the restriction prevents that default from leaking into a feature where it would undermine the entire point of reviews.

---

## Validating AI Output Here

> ** Common Hallucination:** AI will often add a `DELETE /reviews/:id` route accessible to the listing/seller owner by default, mirroring the CRUD pattern used elsewhere in your app (like listings). Reviews are the one resource in your marketplace where the "owner can delete" pattern should NOT apply to the seller — only to the original reviewer (within the edit window) or an admin (for moderation). Check this specifically; it's an easy miss in review.

---

## Token Efficiency Tip

This module builds directly on `requireCompletedOrder` from Authorization Rules and the `Order` model from your database design. Reference both by name in your prompt rather than re-pasting their full implementations — the AI conversation already has that context if you're continuing the same thread, and a fresh conversation only needs the function signature, not the body.

---

## What You've Decided

By the end of this module you should have:

- A review model tied to a specific order, with a database-level one-review-per-order constraint
- An on-read average rating calculation instead of a cached field
- An edit window instead of permanent or freely-deletable reviews
- A seller response mechanism that doesn't allow review deletion
- Reused authorization middleware instead of duplicated logic

**Next:** Moderation Tools — giving admins the ability to act on listings, users, and disputes.
