---
title: Reviews & Ratings
slug: reviews-ratings
phase: Phase 2
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Reviews & Ratings (Trust Architecture)

## Why Reviews Are Financial Infrastructure

In a production marketplace, reviews are not just a UI element. They are the algorithmic currency that determines who gets paid. A seller's rating dictates their search ranking, their conversion rate, and ultimately their revenue.

Because reviews dictate revenue, bad actors will spend money to manipulate them. If your review architecture allows unverified or easily manipulated ratings, sellers will buy fake reviews to outrank honest competitors, destroying buyer trust and collapsing your marketplace.

---

## The Core Rule: Verified Ledger Transactions Only

> [!CAUTION]
> Never allow a user to leave a review unless it is hard-linked to a mathematically verified, completed financial transaction in your database. Open review systems (like Yelp) are fundamentally flawed for transactional marketplaces.

Every `Review` record in your database must have a strict, non-nullable Foreign Key constraint linking it to a `Transaction` ID. If the transaction was canceled, refunded, or never occurred, the database must reject the review insert.

---

## Architecting the Double-Blind Review System

If you allow two-way reviews (buyers review sellers, and sellers review buyers), you face a massive game-theory problem: **Retaliation**.

If a seller provides a terrible service, the buyer might be afraid to leave a 1-star review because they know the seller will immediately retaliate with a 1-star review against the buyer, ruining the buyer's reputation.

**The Production Solution: Double-Blind Unlocking**
1. Transaction completes. Both parties have 14 days to leave a review.
2. When Party A submits a review, the database marks it `is_published: false`.
3. Party B is notified: "Party A left a review! Submit yours to see what they said."
4. **The Trigger:** The reviews are only published (`is_published: true`) when *both* parties have submitted their reviews, OR when the 14-day timer expires. 

This completely eliminates the threat of retaliation and guarantees honest feedback.

---

## The Bayesian Average (Ranking Math)

A listing with one 5-star review has a 5.0 average. A listing with one hundred 5-star reviews and two 4-star reviews has a 4.98 average. If you sort search results by raw average, the untested new listing will outrank the proven veteran.

At production scale, you must use a **Bayesian Average** formula in your database queries.
* This mathematical formula artificially pulls low-volume ratings toward the platform's global average.
* As a listing accumulates more reviews, the "gravity" of the global average weakens, allowing the listing's true rating to determine its rank.

---

## Do's and Don'ts of Production Reviews

- **DO allow review updates for a limited window.** If a buyer leaves a 1-star review, but the seller bends over backward to fix the issue, the buyer should have 48 hours to edit their review to a 5-star. This incentivizes excellent customer service.
- **DON'T build comment threads.** Do not allow sellers to publicly argue with buyers in a nested comment thread under a review. It looks unprofessional. If a review violates your TOS, they should report it to Admin.
- **DO track the IP and Device Fingerprint.** If 10 separate buyer accounts leave 5-star reviews on a specific seller's profile, but all 10 buyers share the exact same IP address, your system must flag it as review fraud.
- **DON'T calculate averages on the fly.** Running `AVG(rating)` across a million rows on every page load will crash your database. Compute the average asynchronously when a new review is submitted and cache it directly on the `Listing` or `Seller` table.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Double-Blind Logic:**

````prompt
I am building a two-way marketplace. I need to implement a Double-Blind review system where reviews are hidden until both parties submit, or 14 days pass. Act as a Senior Backend Engineer. Write the exact database schema (Prisma/SQL) and the serverless CRON job logic required to enforce this locking and unlocking mechanism.
````

> [!TIP]
> **Prompt 2 — Bayesian Ranking Query:**

````prompt
I have a Postgres database for my marketplace. My listings are currently sorting by raw average rating, which allows 1-review listings to outrank 500-review listings. Provide the exact SQL query using a Bayesian Average calculation that will correctly rank my listings, pulling low-volume listings toward a global mean of 4.0.
````

---

## Validating What AI Generates

- **Check the locking mechanism:** If the AI suggests resolving the Double-Blind lock via client-side hiding (e.g., `if (!bothSubmitted) return "Hidden"`), reject it. The data must be hidden at the database query level, or users can inspect the network tab to see the review.
- **Verify cache invalidation:** If the AI provides code to update the cached average rating, ensure it wraps the update in an ACID transaction so the review insertion and the average update cannot get out of sync.

---

## Implementation Checklist

- [ ] Tied all Review creations directly to verified Transaction IDs via database constraints.
- [ ] Decided on One-Way (Buyer to Seller) or Two-Way (Double-Blind) review architecture.
- [ ] Architected the backend to calculate and cache aggregate averages, avoiding heavy read-time calculations.
- [ ] Outlined the Bayesian Average logic for the Search ranking algorithm.
- [ ] Defined the operational policy for removing fraudulent or abusive reviews.

---

## What's Next

Next: **Architecture Fundamentals** — We will step back and define the overarching structural design patterns (Monorepos vs Polyrepos, Client-Side Rendering vs Server-Side Rendering) that govern the entire codebase.
