---
title: Store Architecture
slug: store-architecture
phase: Phase 1 E Commerce Design
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Enterprise Store Architecture Topology

**Estimated Time:** 25 Minutes

Store Architecture is the blueprint of how your decoupled systems communicate. A mass-production headless storefront is not a single codebase; it is an orchestration of distinct microservices, edge computing nodes, and asynchronous event pipelines. 

If you design a linear, synchronous architecture (where the user clicks a button, the server queries a database, waits for a response, and then paints the screen), your storefront will buckle under Black Friday loads. You must architect for **asynchronous resilience and edge locality.**

## 1. The Edge Computing Topology

In modern e-commerce, the physical distance between your user and your server dictates latency. You cannot rely on a centralized server farm in `us-east-1` to serve global traffic.

### The Next.js / Vercel Edge Pattern
- **The CDN Cache (Tier 1):** 90% of your traffic (anonymous users browsing PLPs and PDPs) should never hit an execution environment. They are served pre-compiled HTML and JSON directly from the nearest CDN PoP (Point of Presence).
- **Edge Middleware (Tier 2):** When dynamic logic is required (e.g., reading a session cookie, injecting regional pricing, evaluating feature flags), Edge Middleware intercepts the request in sub-10ms. It executes lightweight V8 isolates geographically close to the user, modifying the request before it hits the origin.
- **Serverless Functions (Tier 3):** Only heavy mutation logic (Add to Cart, Login, Checkout, webhook processing) hits origin Serverless or Edge functions. 

> [!IMPORTANT]
> The architectural golden rule: **Never mutate state on the Edge; never fetch static data from the Origin.** Read operations must be globally distributed and cached; write operations (inventory decrements, payments) must be strictly atomic and centralized.

## 2. The Asynchronous Event Bus

In a monolithic system, when an order is placed, the PHP server synchronously updates the database, sends a receipt email, and pings the shipping provider. If the email API times out, the entire checkout crashes.

In a production headless architecture, you must implement an **Event-Driven Architecture (EDA)**.

1. **The Core Mutation:** The user clicks "Pay". The Commerce API captures the payment and decrements inventory atomically. It instantly returns a `200 OK` to the frontend. The user sees the success screen.
2. **The Event Bus (Inngest / Kafka / SQS):** The Commerce API fires an `order.created` webhook to your Event Bus.
3. **Asynchronous Workers:** Independent micro-workers listen to the event bus and process side-effects safely in the background:
   - Worker A sends the SendGrid receipt email.
   - Worker B routes the payload to the 3PL (ShipBob) API.
   - Worker C syncs the LTV data to the Data Warehouse (BigQuery).

If SendGrid goes down, Worker A simply retries automatically via exponential backoff. The user is unaffected, and the transaction is secure.

## 3. Client-Side Global State Management

Because the backend is heavily distributed, the frontend (React/Next.js) must act as the primary state orchestrator for the active user session.

You cannot rely on React Context for everything, as it triggers unnecessary re-renders across the entire DOM tree. You must utilize atomic, subscription-based global state managers like **Zustand** or **Jotai**.

### The Cart State Matrix
The Cart is the most volatile piece of state. It must survive page reloads, cross-tab synchronizations, and sudden network drops.
- **Zustand Persist:** The cart state (items, quantities) must be persisted instantly to `localStorage`.
- **SWR / React Query:** In the background, the UI silently pings the Commerce API to validate the local cart against the database (checking if an item sold out or a price changed while the user was away), resolving any conflicts seamlessly.

## Checklist:
- [ ] Map out the Edge Topology: Define exactly which routes are served from the CDN, which use Edge Middleware, and which require Origin Serverless functions.
- [ ] Architect the Asynchronous Event Bus to handle post-checkout side-effects (Emails, ERP syncing, 3PL routing) safely outside the critical user path.
- [ ] Define the global state management strategy (e.g., Zustand + SWR) to ensure cart data survives page reloads and cross-tab synchronization.
- [ ] Enforce the "No Synchronous Side-Effects" rule for the main checkout mutation API.
