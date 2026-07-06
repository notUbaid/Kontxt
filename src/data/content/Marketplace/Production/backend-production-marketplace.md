---
title: Backend
slug: backend
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 25-30 min
---

# Backend (API & Business Logic)

## The Layer Where Architecture Survives or Dies

Your database schema enforces structure. Your backend enforces *behavior*. Every authorization check, state transition, and idempotency requirement you defined in Phase 2 must be written here. 

In a production environment, you cannot treat your backend as "just a CRUD wrapper around the database." It is a fortress. If an endpoint is missing a rate limit, you will be DDoS'd. If an endpoint is missing an authorization check, you will leak data. If an endpoint lacks idempotency, you will double-charge credit cards.

---

## Enterprise API Architecture (The 3-Tier Pattern)

Whether you are using Next.js Server Actions, tRPC, Express, or NestJS, a production backend must separate concerns. 

Do not write your database queries directly inside your HTTP route handlers.

```
1. Controllers (Routes): Extract HTTP params, validate input, handle Auth.
2. Services (Business Logic): "Should this user be allowed to refund?"
3. Repositories (Data Access): Prisma/SQL queries.
```

**Why this is mandatory:** 
If your Stripe Webhook (Controller) and your "Cancel Order" UI button (Controller) both need to cancel an order, they should both call `OrderService.cancelOrder()`. If the logic lives in the Controller, you will write it twice, and they will eventually drift out of sync.

---

## The Request Lifecycle (Strict Ordering)

Every secure endpoint in a marketplace must follow this exact sequence:

1. **Rate Limiting:** (Edge/Gateway) Drop requests from IPs hitting the API too fast.
2. **Authentication:** Parse the `HttpOnly` JWT. Is the token valid and unexpired?
3. **Input Validation:** Use `Zod` to ensure the payload perfectly matches the schema. Reject unknown fields.
4. **Authorization:** (Service Layer) Does the `User` from step 2 have the specific Organization Role to mutate the `Resource` from step 3?
5. **Idempotency Check:** Has this exact `idempotency_key` been processed before?
6. **Execution & State Transition:** Run the database transaction.

> [!CAUTION]
> Reversing Authz and Validation is a severe security vulnerability. If you validate a payload *before* authorizing the user, a malicious actor can send massive, computationally expensive payloads to overwhelm your Zod validators and crash your server, bypassing Auth entirely.

---

## Input AND Output Validation

Most tutorials teach Input Validation. Production requires **Output Validation**.

If a developer accidentally adds `password_hash` to the `SELECT * FROM users` query in the Repository layer, your API will serialize it to JSON and send it to the frontend.

You must define Zod schemas for your API Responses and run `.parse()` on your outgoing data to mathematically guarantee you are stripping sensitive fields before the data leaves your server.

---

## Webhooks and Idempotency

Your backend does not just respond to frontend clicks. It responds to external asynchronous events (Stripe, Sendbird, Algolia).

- **Signature Verification:** Every webhook must cryptographically verify the signature header.
- **Idempotency Locks:** Webhooks can fire twice. Your code must check: `SELECT 1 FROM processed_webhooks WHERE event_id = $1`. If it exists, return `200 OK` and skip execution.

---

## Do's and Don'ts of Production Backends

- **DO use Database Transactions for multi-step mutations.** If a buyer purchases an item, you must (1) Create an Order, (2) Decrement Inventory, and (3) Create a Notification. These must be wrapped in a single SQL Transaction (`BEGIN` ... `COMMIT`). If step 3 fails, the inventory must roll back.
- **DON'T leak internal error details.** Never send stack traces or database schema errors to the client. A Postgres duplicate key error should be caught and transformed into a generic `409 Conflict: Resource already exists`.
- **DO implement pagination on all list endpoints.** Never allow a `GET /api/listings` without a `limit` and `cursor`. A malicious user will request all 50,000 listings and crash your database's memory.
- **DON'T assume the frontend disables buttons.** Just because the React UI hides the "Refund" button does not mean the user can't send a `POST /refund` via Postman. The backend must independently verify the State Machine (e.g., "Is this order actually refundable?").

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — 3-Tier Architecture Scaffold:**

````prompt
Act as a Principal Backend Engineer. I am using [Next.js Server Actions / Express] and Prisma. Write a complete 3-Tier implementation (Controller, Service, Repository) for a `Cancel Order` endpoint. It must include Zod validation for the input, verify the user's authorization (are they the buyer or seller?), execute the database updates inside a Prisma Transaction, and return a Zod-validated output payload.
````

> [!TIP]
> **Prompt 2 — Secure Webhook Handler with Idempotency:**

````prompt
Write a production-ready Stripe Webhook handler in Node.js. It must parse the raw body, verify the `Stripe-Signature`, and process the `payment_intent.succeeded` event. Implement an Idempotency check against the database using the Stripe `event.id` before executing the business logic to ensure duplicate events do not double-process.
````

---

## Validating What AI Generates

- **Check for proper Transactions:** If the AI writes sequential `await db.table.update()` calls without wrapping them in a transaction array (`prisma.$transaction`), reject it. Partial failures will corrupt your marketplace.
- **Verify Error Masking:** Ensure the AI's error handling block does not return `res.status(500).json({ error: error.message })`. It must sanitize the error before sending it to the client.

---

## Implementation Checklist

- [ ] Enforced the 3-Tier Architecture (Controllers, Services, Repositories) across all endpoints.
- [ ] Implemented Zod validation for both incoming requests and outgoing responses.
- [ ] Applied the strict Request Lifecycle ordering (Rate Limit -> Auth -> Validate -> Authz -> Execute).
- [ ] Wrapped all multi-table mutations in strict Database Transactions.
- [ ] Secured all webhook endpoints with Signature Verification and Idempotency locks.

---

## What's Next

Next: **Frontend** — With an unbreakable, secure backend API in place, we can finally build the client that consumes it. We will architect a performant, accessible React application that handles state management, SSR (Server-Side Rendering), and optimistic UI updates safely.
