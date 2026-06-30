---
title: Admin Dashboard Implementation
slug: admin-dashboard
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 40–50 min
---

# Admin Dashboard Implementation

At a small scale, an admin dashboard is a CRUD interface for adding products. At production scale, the admin dashboard is an Enterprise Resource Planning (ERP) tool.

Your merchandising, fulfillment, and customer support teams will spend 8 hours a day in this dashboard. If it is slow, confusing, or lacks bulk-action capabilities, your operational costs will skyrocket as teams waste time fighting the software.

If you are using Shopify Plus, use their admin. Do not rebuild it. If you are building a custom headless backend (e.g., Medusa or custom Postgres), you must build the Admin UI with extreme care.

---

## 1. Access Control (RBAC & Audit Logs)

In a production environment, not everyone gets full access to the database.

**Role-Based Access Control (RBAC):**
- **Support Agents:** Can view orders, issue partial refunds up to $50, and update shipping addresses. They *cannot* delete products or change prices.
- **Fulfillment Staff:** Can view unfulfilled orders, print packing slips, and input tracking numbers. They *cannot* view financial margins or customer credit card data.
- **Merchandisers:** Can update products, prices, and launch promotions.

**Audit Logs (Mandatory for Compliance):**
When a product's price drops from $100 to $10 accidentally, resulting in thousands of dollars in losses, you must know who did it.
- **Implementation:** Every mutating API call (`POST`, `PUT`, `DELETE`) in the admin panel must write a record to an `audit_logs` table: `[Timestamp] | [User Email] | [Action: UPDATE_PRICE] | [Target: SKU123] | [Old: $100] | [New: $10]`.

---

## 2. Bulk Operations & Concurrency

Merchandising teams do not update one product at a time. They update 5,000 prices at 2 AM before a Black Friday sale.

**The Anti-Pattern (Synchronous Loops):**
If the Admin UI sends an array of 5,000 products to a Next.js API route, and the route uses a `for` loop to update Postgres, the request will time out after 10 seconds, leaving the catalog in a half-updated, corrupted state.

**The Production Pattern (Asynchronous Batches):**
1. The Admin UI submits a CSV upload or a Bulk Action intent.
2. The API route returns a `202 Accepted` and an `import_job_id` immediately.
3. The actual database updates are pushed to a background queue (e.g., Inngest or AWS SQS).
4. The Admin UI polls a status endpoint `GET /api/jobs/status` and displays a progress bar (e.g., "Updated 2,400 / 5,000 products").

---

## 3. Safe Financial Operations (Refunds)

Refunds are the most dangerous action in the admin panel. 

**The Implementation Constraints:**
- **Never allow a refund to exceed the original order amount.** (This sounds obvious, but custom admin panels frequently have a bug that allows support agents to refund $150 on a $100 order).
- **Tax Proration:** If a user returns 1 shirt from a 3-shirt order, you must calculate the exact proportion of tax applied to that specific shirt and refund it. Do not just refund the item cost.
- **Inventory Restock:** The Admin UI must provide a checkbox during the refund process: `[ ] Restock Inventory`. If the item was broken, it should be refunded but *not* added back to the Available to Promise (ATP) inventory.

---

## 4. The UI Architecture (Speed is Everything)

Do not build the Admin UI with heavy, bloated CSS. It needs to feel like a desktop application.

- **Data Grids:** Use an enterprise-grade data grid (e.g., **AG Grid** or **TanStack Table**). Merchandisers need to sort, filter, and pin columns across tables with 10,000+ rows instantly.
- **State Management:** Use `React Query` (or `SWR`) heavily to cache API responses. If a support agent clicks between 5 different orders, the data should cache so the "Back" button is instantaneous.
- **Design System:** Use dense, data-heavy UI components (like **shadcn/ui** or **Mantine**). Do not use consumer-facing UI spacing. Information density is key.

---

## AI Prompt — Architect Your Admin Dashboard

```prompt
I am building the Admin Dashboard for a production custom e-commerce backend.

Tech Stack:
- Frontend: [e.g., React / Next.js Admin]
- Backend: [e.g., Node.js / Postgres]
- Data Grid: [e.g., TanStack Table]

Act as a Principal Full-Stack Engineer:
1. Define the exact Postgres database schema for an `audit_logs` table to track every mutation made by staff, and write a middleware function that intercepts admin API calls to populate it.
2. Design the asynchronous background architecture (Queue + Polling) required to safely execute a bulk price update on 10,000 SKUs without crashing the Node.js API.
3. Write the validation logic for a `POST /api/admin/refund` endpoint, ensuring the refund never exceeds the captured amount and handles tax proration correctly.
4. Detail the strict RBAC (Role-Based Access Control) matrix required for Support Agents vs. Merchandisers, and how to enforce it at the API route level.
```

---

## Admin Dashboard Checklist

- [ ] Role-Based Access Control (RBAC) enforced on all backend API routes
- [ ] Audit logs implemented to track all data mutations (who, what, when, old_value, new_value)
- [ ] Bulk actions (CSV imports, mass price updates) offloaded to asynchronous background queues with progress polling
- [ ] Refund endpoints secured against over-refunding and tied to inventory restock logic
- [ ] Enterprise data grids (e.g., TanStack Table) utilized for high-density, fast sorting of orders and products
- [ ] Tax and shipping proration math validated in the partial refund flows
