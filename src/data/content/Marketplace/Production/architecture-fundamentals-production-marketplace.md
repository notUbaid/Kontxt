---
title: Architecture Fundamentals
slug: architecture-fundamentals
phase: Phase 2
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Architecture Fundamentals

## Beyond Simple CRUD

A personal project is a simple CRUD (Create, Read, Update, Delete) app. A production marketplace is a complex state machine dealing with asynchronous events, financial liability, and distributed data.

If you architect a marketplace like a basic blog, you will encounter race conditions (e.g., two buyers purchasing the same inventory at the exact same millisecond), webhook failures that leave money in limbo, and search queries that crash your primary database. You must architect for failure, concurrency, and scale from day one.

---

## The Four Pillars of Production Architecture

### 1. The Modular Monolith (Do Not Start with Microservices)
> [!IMPORTANT]
> The single fastest way to kill a production marketplace before it launches is by prematurely splitting it into microservices.

You do not need separate services for Users, Listings, and Payments on day one. The network latency and deployment complexity will cripple your engineering velocity. Instead, build a **Modular Monolith**: a single deployable codebase strictly organized by domain (`/users`, `/listings`, `/transactions`). Ensure these domains only communicate via internal interfaces, making them easy to split into microservices *later* when traffic demands it.

### 2. Strict State Machines
A transaction is not a boolean (`is_paid = true`). A transaction is a mathematical state machine that moves in one direction.
* **The States:** `PENDING_AUTH` -> `AUTHORIZED` -> `ESCROW_LOCKED` -> `FULFILLED` -> `PAYOUT_INITIATED` -> `SETTLED`.
* **The Rule:** You must use Enums in your database schema, and your backend code must reject any invalid state transitions (e.g., jumping from `PENDING_AUTH` to `SETTLED` without passing through `ESCROW_LOCKED`).

### 3. Event-Driven Architecture
When a buyer purchases an item, five things must happen: charge the card, decrement inventory, email the buyer, notify the seller, and update analytics. 
* **The Bad Way:** Doing all five in a single synchronous API request. If the email provider times out, the whole request fails, and the buyer's card isn't charged.
* **The Production Way:** The API request does two things: charges the card and updates the database. It then publishes an event (`TRANSACTION_SUCCESS`) to a message broker (Redis/Kafka/SQS), which asynchronously handles the emails and notifications in the background.

### 4. CQRS (Command Query Responsibility Segregation)
In a marketplace, reads (searches) outnumber writes (purchases) by 10,000 to 1. If you run complex full-text search queries on your primary Postgres write database, it will eventually lock up and prevent buyers from checking out.
* **The Architecture:** Separate your reads and writes. Use Postgres (the Command) as the source of truth for transactions. Sync listing data asynchronously to a dedicated search index like Algolia or ElasticSearch (the Query) to handle the read-heavy traffic.

---

## Do's and Don'ts of Production Architecture

- **DO implement API Versioning on Day 1.** Prefix your routes (e.g., `/api/v1/listings`). When you inevitably change your schema in a year, you can release `v2` without breaking the old mobile app versions still installed on users' phones.
- **DON'T rely on client-side timestamps.** Never trust `Date.now()` from a buyer's browser to determine if a promotional discount has expired. Always use the server's clock.
- **DO use Idempotency Keys.** When processing payments, always pass an Idempotency Key (usually the unique Transaction ID) to Stripe. If the network drops and the client retries the request, Stripe will recognize the key and prevent double-charging the buyer.
- **DON'T soft-delete financial records.** Never delete a transaction or a listing that has attached transactions. Use an `is_archived` flag. You need the historical data for taxes, chargebacks, and compliance.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — State Machine Generation:**

````prompt
I am building a [Goods/Services] marketplace. Act as a Senior Backend Architect. Map out the exact State Machine (using XState conventions or standard Enums) for a Transaction lifecycle. Include every state from "Checkout Initiated" to "Funds Settled", including unhappy paths like "Chargeback Opened" and "Refunded". Provide the strict transition rules (what states can move to what states).
````

> [!TIP]
> **Prompt 2 — Event-Driven Architecture:**

````prompt
I need to implement an Event-Driven Architecture for my Next.js / Node backend. When a `BOOKING_CONFIRMED` event occurs, I need to send a confirmation email, update a search index, and notify the seller. Provide the architectural pattern and pseudo-code using a lightweight message queue (like BullMQ/Redis or Inngest) to handle these background jobs reliably without blocking the main API response.
````

---

## Validating What AI Generates

- **Check for synchronous anti-patterns:** If the AI writes an API endpoint that sequentially awaits a database write, a Stripe call, a SendGrid email, and an Algolia update in one massive `try/catch` block, reject it. Force it to decouple the non-critical paths into background jobs.
- **Verify database locks:** If AI generates SQL to decrement inventory (e.g., `UPDATE inventory SET count = count - 1`), verify that it includes row-level locking or optimistic concurrency control to prevent race conditions during high traffic.

---

## Implementation Checklist

- [ ] Adopted a Modular Monolith architecture, organizing the codebase by domain.
- [ ] Mapped the strict State Machine Enums for Listings, Transactions, and Users.
- [ ] Decoupled heavy read queries from the primary write database (CQRS).
- [ ] Implemented API versioning (`/v1/`) for all external-facing endpoints.
- [ ] Set up a background job queue (Event-Driven) for non-critical tasks like emails.

---

## What's Next

Next: **User Architecture** — With the structural foundation set, we will design the specific database schemas for your users, implementing robust Multi-Tenant structures to handle organizations, roles, and permissions at scale.
