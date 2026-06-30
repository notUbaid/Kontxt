---
title: Scalability Planning
slug: scalability-planning
phase: Phase 4
mode: production
projectType: e-commerce
estimatedTime: 40–50 min
---

# Scalability Planning

E-commerce traffic is notoriously spiky. 

A standard SaaS application might see a 10% variance in traffic between night and day. An e-commerce store might sit at 100 concurrent users for 364 days of the year, and then hit 50,000 concurrent users at exactly 9:00 AM on Black Friday.

If your architecture is not designed to scale horizontally and elastically, the servers will crash at the exact moment you stand to make the most money.

---

## 1. Database Connection Pooling (The Bottleneck)

Your Node.js API servers can scale to infinity instantly (especially if using Vercel or AWS Lambda). Your relational database (Postgres) cannot.

Postgres has a hard limit on the number of open connections it can handle (often around 100-200 on standard RDS tiers). If you have 5,000 serverless functions spin up simultaneously to handle a traffic spike, they will all attempt to connect to Postgres. Postgres will reject the connections, and your entire site will go down with a `503 Service Unavailable`.

**The Solution: PgBouncer / Connection Poolers**
You must place a connection pooler between your application and your database.
- Tools like **PgBouncer** or **Supabase Supavisor** maintain a pool of long-lived connections to the database (e.g., 50 connections).
- When your 5,000 serverless functions ask for data, the pooler accepts all 5,000 requests, queues them in memory, and funnels them efficiently through the 50 open database connections.
- The database remains stable under massive load.

---

## 2. Horizontal Scaling & Statelessness

To handle traffic spikes, your application layer must be entirely stateless.

**The Anti-Pattern:** Storing the user's shopping cart in server memory or server-local files. If the load balancer routes the user's next click to Server B, their cart will be empty.

**The Production Rule:**
- The Node.js application must retain zero state.
- All session data, carts, and authentication tokens must live in a centralized, highly-available external store (like **Redis**).
- This allows AWS Auto Scaling Groups (or Kubernetes HPA) to spin up 100 new identical copies of your application server during a traffic spike without breaking the user experience.

---

## 3. Asynchronous Queueing (Backpressure)

During a flash sale, 10,000 people might successfully complete checkout in one minute.

If your backend attempts to send 10,000 "Order Confirmation" emails synchronously while processing the checkouts, the external Email API (e.g., Resend or SendGrid) will rate-limit you. The API requests will hang, causing the checkouts themselves to time out and fail.

**The Implementation:**
Decouple all non-critical path operations using Message Queues (e.g., AWS SQS, BullMQ, or Inngest).
- User pays -> Database updates -> Order created.
- The backend pushes an event `{"type": "order.created", "id": 123}` to a Queue and immediately returns `200 OK` to the user.
- A separate Worker process reads from the Queue at a safe, controlled speed (e.g., 50 emails per second) and sends the emails.
- This creates **Backpressure**, protecting your external APIs from the traffic spike.

---

## 4. Read Replicas (Offloading Analytics)

At scale, the merchandising team running a massive SQL `GROUP BY` query to figure out "Top Selling Products of the Month" will lock the database tables and slow down the checkouts for live customers.

**The Implementation:**
Separate Read and Write workloads.
- The primary Postgres database handles all `INSERT` and `UPDATE` commands (Checkouts, Inventory).
- Configure a **Read Replica** (a secondary database that continuously copies data from the primary).
- Point all Admin Dashboards, analytics queries, and background reporting tools to the Read Replica. Even if an analyst runs a terrible query that pegs the CPU at 100%, live customer traffic is entirely unaffected.

---

## AI Prompt — Audit Your Scalability Plan

```prompt
I am auditing the scalability architecture of a production e-commerce store in preparation for Black Friday traffic spikes.

Tech Stack:
- Infrastructure: [e.g., Vercel / AWS / Kubernetes]
- Database: [e.g., Postgres]
- Queue: [e.g., BullMQ / SQS]

Act as a Principal Systems Architect:
1. Explain exactly how to configure a connection pooler (like PgBouncer or Supavisor) to protect a Postgres database from connection exhaustion when 10,000 serverless functions spin up simultaneously.
2. Outline the exact application logic required to ensure the Node.js API layer remains 100% stateless so it can be horizontally scaled infinitely.
3. Design a Message Queue architecture to handle post-checkout tasks (Emails, 3PL Syncing) asynchronously, ensuring the main checkout thread is never blocked by external API rate limits.
4. Provide the infrastructure strategy for deploying a Postgres Read Replica, and explicitly define which e-commerce operations should query the replica vs. the primary master node.
```

---

## Scalability Checklist

- [ ] Connection pooler (PgBouncer/Supavisor) configured between the API layer and the relational database
- [ ] Application layer audited to guarantee 100% statelessness (all state stored in Redis/DB)
- [ ] Auto-scaling rules defined (Kubernetes HPA or AWS Auto Scaling) based on CPU/Memory thresholds
- [ ] Post-checkout operations (Emails, WMS syncs) decoupled into asynchronous Message Queues to protect the critical path
- [ ] Read Replicas deployed for Admin dashboard queries and heavy analytics workloads
- [ ] Load testing (e.g., using k6) executed against staging to verify the architecture holds under 5x expected traffic
