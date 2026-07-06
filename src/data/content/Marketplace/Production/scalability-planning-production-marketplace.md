---
title: Scalability Planning
slug: scalability-planning
phase: Phase 4
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Scalability Planning

## Designing for 100x Growth

In a personal project, you scale by upgrading the server from $5/month to $20/month (Vertical Scaling). In a production marketplace, Vertical Scaling eventually hits a hard limit. You cannot buy a server large enough to handle Amazon's traffic. 

You must architect the marketplace for **Horizontal Scalability**, ensuring that when a massive traffic spike hits (e.g., a viral TikTok about your platform), the infrastructure automatically spins up new instances to handle the load without manual intervention.

---

## Stateless Architecture

The golden rule of horizontal scaling is that your API must be **100% Stateless**.
If a buyer starts a checkout on Server A, and their next HTTP request is routed by the Load Balancer to Server B, Server B must be able to process it flawlessly.

**The Production Rule:**
Never store user sessions, shopping carts, or temporary data in local server memory (`new Map()`) or local disk. 
* Sessions must be encrypted in HttpOnly cookies (or stored in Redis).
* Uploaded files must stream directly to S3, never saving to `/tmp` on the API server.

When your API is stateless, your orchestrator (Kubernetes, AWS ECS, or Vercel) can instantly spin up 50 new instances to absorb a traffic spike.

---

## Event-Driven Architecture (Queues)

If a user clicks "Buy", and your API synchronously charges their card, sends 3 emails, updates an Algolia index, and generates an invoice PDF, the request will take 8 seconds. Under load, 8-second requests will lock up all available workers and crash your API.

**The Production Defense:** Decouple the work using **Asynchronous Queues** (e.g., Inngest, AWS SQS, or BullMQ).
1. The API charges the card and instantly returns `200 OK` (150ms).
2. It publishes an event: `order.completed`.
3. Background workers consume the event and handle the emails, PDFs, and search indexing asynchronously.

If traffic spikes, the queue just backs up. The UI remains blazing fast, and the emails arrive a few minutes late, but the platform stays online.

---

## Database Scaling (Read Replicas)

Your Node.js API can scale horizontally to infinity, but eventually, your Postgres Database will become the single point of failure (the bottleneck).

**The Production Database Strategy:**
Marketplaces are heavily read-biased (100 searches for every 1 purchase). 
1. **Primary Node:** Handles all `INSERT`, `UPDATE`, and `DELETE` queries (checkouts, listing creation).
2. **Read Replicas:** You spin up 3 Read Replicas. Your ORM (e.g., Prisma) is configured to route all `GET` requests (searches, profile views) to the replicas. 

This instantly quadruples your database capacity and ensures complex analytics queries don't slow down the checkout flow.

---

## Graceful Degradation

If the Algolia Search API goes down, what happens to your marketplace? If the whole site crashes, you have a fragile architecture.

**The Production Standard:** Implement **Graceful Degradation**.
* If Algolia is down, catch the error and fallback to a basic Postgres `ILIKE` search. It will be slower and less relevant, but buyers can still find items.
* If the Recommendation ML engine goes offline, fallback to a simple chronological "Newest Listings" feed.
Never let a non-critical microservice take down the core transaction engine.

---

## Do's and Don'ts of Production Scalability

- **DO use Auto-Scaling Groups.** Configure your cloud provider to automatically add servers when CPU > 70%, and remove them when CPU < 30%. Don't pay for idle servers at 3:00 AM.
- **DON'T optimize before profiling.** Do not spend 3 weeks building a Redis caching layer because you "think" something might be slow. Use Datadog APM traces to prove exactly which function is the bottleneck before optimizing it.
- **DO implement Connection Pooling.** As you add more horizontal API servers, they will exhaust Postgres connections. A pooler (PgBouncer) is mandatory when scaling horizontally.
- **DON'T share databases across domains.** As you grow, split your databases. The analytics/reporting system should run on a Snowflake/BigQuery data warehouse, never on the production transactional Postgres database.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Event-Driven Queue Implementation:**

````prompt
Act as a Backend Architect. I am moving my synchronous checkout flow to an Event-Driven Architecture. Write a Node.js Inngest (or BullMQ) function that listens for the `marketplace/order.created` event. It must handle sending the confirmation email, updating the search index, and notifying the seller. Implement it with idempotency and automatic retries so that if the email provider times out, it doesn't accidentally charge the user again.
````

> [!TIP]
> **Prompt 2 — Prisma Read Replica Routing:**

````prompt
Write a database client configuration using Prisma Client Extensions (or standard Prisma features) that automatically routes all `findMany` and `findUnique` queries to a Read Replica database URL, while routing `create`, `update`, and `delete` mutations strictly to the Primary database URL.
````

---

## Validating What AI Generates

- **Check for idempotency in queues:** If AI generates a background job that sends an email, but doesn't implement an idempotency key or a state check, reject it. Background queues guarantee "At-Least-Once" delivery, meaning the job might run twice. The code must be safe to execute multiple times.
- **Verify state storage:** If AI generates code for a "scalable" shopping cart but stores the data in `req.session` using a local memory store, correct it immediately. It must use a distributed store (Redis) or database.

---

## Implementation Checklist

- [ ] Audited the API to ensure 100% Stateless architecture (no local memory caching or file storage).
- [ ] Decoupled heavy, non-critical post-transaction tasks into Asynchronous Queues (Event-Driven Architecture).
- [ ] Prepared the Database layer for Read Replicas by separating Write and Read operations in the ORM.
- [ ] Designed Graceful Degradation fallbacks for all third-party services (Search, Recommendations).
- [ ] Configured auto-scaling triggers based on CPU and memory utilization.

---

## What's Next

Next: **Abuse Detection** — Scale brings legitimate users, but it also brings coordinated fraud rings. We will build advanced abuse detection mechanisms to catch fake reviews, listing spam, and orchestrated marketplace manipulation at scale.
