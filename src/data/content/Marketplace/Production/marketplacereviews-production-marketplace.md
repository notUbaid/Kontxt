---
title: Reviews
slug: reviews
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Reviews (Reputation System)

## The Currency of Marketplace Trust

In a personal project, reviews are just a text field and a 1-5 star rating. In a production marketplace, the review system determines who gets sales and who gets banned. If your review system is gameable, malicious sellers will farm fake 5-star ratings, scam your buyers, and destroy the platform's reputation.

A production review system must prevent retaliation, enforce verified purchases, and calculate aggregates efficiently without crashing the database.

---

## Double-Blind Reviewing (Preventing Retaliation)

If a buyer receives a broken item and leaves a 1-star review, but the seller sees that review *before* leaving their own feedback for the buyer, the seller will leave a retaliatory 1-star review in revenge. 
This causes buyers to stop leaving honest negative reviews out of fear, completely breaking your trust mechanics.

**The Production Standard (The Airbnb Model):**
Implement a **Double-Blind** review window.
1. When an Order completes, a 14-day review window opens.
2. If Buyer leaves a review, it is marked `status: 'HIDDEN'`. The Seller cannot see it, but they are notified that the Buyer reviewed them.
3. If the Seller then leaves a review (or the 14-day timer expires), BOTH reviews are simultaneously flipped to `status: 'PUBLISHED'` and become visible.
4. Once published, they cannot be edited.

---

## Asynchronous Aggregation

In a prototype, calculating a seller's rating using `SELECT AVG(rating) FROM reviews WHERE seller_id = $1` on every profile page load is fine. 

In production, if a seller has 5,000 reviews and 10,000 people view their profile concurrently, that `AVG()` query will lock up your Postgres CPU.

**The Production Rule:**
You must calculate the average rating asynchronously.
1. When a new review is published, trigger a background worker (e.g., Inngest or BullMQ).
2. The worker calculates the new average and count.
3. The worker writes those values directly onto the `Users` table (e.g., `rating_average: 4.8`, `review_count: 5001`).
4. The profile page simply reads those pre-calculated columns. 

*Alternatively, use a Postgres Materialized View that refreshes every 5 minutes.*

---

## SEO and Structured Data (JSON-LD)

Reviews are one of your most powerful SEO assets. When a user Googles "Buy Vintage Fender Stratocaster," you want your marketplace listing to show the gold star ratings directly in the Google Search results.

**The Production Implementation:**
Your frontend must inject **JSON-LD Structured Data** (`schema.org/Product` and `schema.org/AggregateRating`) into the `<head>` of the listing page. If you skip this, Google will not know your page contains reviews, and you will lose massive amounts of organic traffic.

---

## Do's and Don'ts of Production Reviews

- **DO strictly enforce Verified Purchases.** A user should never be able to review a listing they did not buy. The API must query the `Orders` table to verify `buyer_id`, `listing_id`, and `status = 'COMPLETED'` before accepting the `POST /reviews` payload.
- **DON'T allow sellers to delete reviews.** Sellers must never have `DELETE` access to their own reviews. If a review contains hate speech, the seller must flag it for Admin Moderation.
- **DO block reviews on Disputed orders.** If an order is currently in mediation, block the review flow. Waiting until the dispute is resolved prevents emotional, inaccurate reviews while the platform is still investigating.
- **DON'T display decimal ratings wildly.** Round average ratings to one decimal place (`4.8`). Displaying `4.78923` looks broken and unprofessional.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Double-Blind Logic:**

````prompt
Act as a Senior Backend Engineer. I am using Node.js and Prisma. Write a `submitReview` service function that implements a Double-Blind review system. It must verify the order is completed, check if the other party has already submitted their review, and set the status to either `HIDDEN` or `PUBLISHED` based on whether both parties have now reviewed (or if the 14-day window has expired). Wrap the logic in a database transaction.
````

> [!TIP]
> **Prompt 2 — SEO JSON-LD Generation:**

````prompt
Write a Next.js (App Router) Server Component that generates `schema.org` JSON-LD Structured Data for a Product with an AggregateRating. It must take a `Listing` object (with `title`, `price`, `description`) and a `Rating` object (with `average` and `count`), and format them into the exact JSON-LD script tag required for Google Rich Snippets.
````

---

## Validating What AI Generates

- **Check for unverified review endpoints:** If the AI generates a REST route like `POST /reviews` that only requires a `seller_id` and a `rating` in the body, reject it. It MUST require an `order_id` and cryptographically verify the caller was the buyer of that specific order.
- **Verify Aggregation Logic:** Ensure any AI-generated aggregation code uses database transactions or background queues to prevent race conditions when two users leave a review at the exact same millisecond.

---

## Implementation Checklist

- [ ] Implemented Double-Blind review timing to prevent retaliatory ratings.
- [ ] Built asynchronous background workers (or Materialized Views) to compute and cache aggregate ratings, protecting database performance.
- [ ] Enforced strict Authorization rules to ensure only verified buyers with completed orders can submit reviews.
- [ ] Added JSON-LD Structured Data to the frontend to ensure ratings appear in Google Search snippets.
- [ ] Created the Admin moderation queue for sellers to report abusive or policy-violating reviews.

---

## What's Next

Next: **Moderation Tools** — To protect the marketplace from fraud and abuse, our support team needs specialized capabilities. We will architect the internal Admin moderation tools necessary to ban malicious actors, quarantine suspicious listings, and resolve complex user disputes efficiently.
