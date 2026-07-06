---
title: Authorization
slug: authorization
phase: Phase 2
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Authorization (Access Control)

## Authentication vs. Authorization

Authentication asks, "Who are you?" (Are you really user #4521?). 
Authorization asks, "What are you allowed to do?" (Are you allowed to refund Transaction #892?).

In a production marketplace, authorization is the most complex logic in your backend. In a standard SaaS app, a user just owns their own data. In a marketplace, multiple parties (Buyer, Seller, Platform Admin) must interact with the exact same row in the database (a Transaction), but they are allowed to perform completely different actions on it.

---

## The Enterprise Authorization Matrix

You must architect a multi-layered authorization system. Do not rely on a single `if (user.isAdmin)` check.

| Strategy | Where It Operates | The Production Use Case |
|---|---|---|
| **Middleware (Edge)** | Network Layer (Next.js Middleware) | Rejects unauthenticated users from accessing `/dashboard/*` routes before hitting your server. |
| **RBAC (Role-Based)** | API/Service Layer | "Can a user with the `Org_Manager` role issue a refund?" |
| **ABAC (Attribute-Based)** | API/Service Layer | "Can this specific buyer leave a review? Yes, *only if* the Transaction status is `DELIVERED`." |
| **Row-Level Security (RLS)** | Database Layer (Postgres) | Mathematical database policies that physically prevent a user from querying data they don't own, even if the API layer has a bug. |

> [!WARNING]
> Never rely exclusively on Frontend UI hiding (e.g., hiding the "Delete" button) as your authorization. Malicious actors will simply bypass your UI and hit your API endpoints directly. Authorization must be enforced at the Backend and Database layers.

---

## Multi-Tenant B2B Permissions (RBAC)

Because you built a multi-tenant User Architecture (`Users` linked to `Organizations`), your authorization logic must understand Organization-level roles.

**Example B2B Seller Organization Roles:**
- **Owner:** Can change payout bank accounts and add new team members.
- **Manager:** Can edit listings and issue refunds, but cannot view payout bank details.
- **Fulfillment:** Can only view Orders and mark them as `SHIPPED`. Cannot edit listings or issue refunds.

When an API request hits `/api/listings/update`, your backend must check:
1. Which Organization owns this listing?
2. Is the requester a member of that Organization?
3. Does their Membership Role grant `update:listings` permissions?

---

## Row-Level Security (RLS): The Ultimate Failsafe

In a production Postgres database (especially if using Supabase), you should enable Row-Level Security. RLS acts as a firewall directly on the database tables.

If an API bug accidentally runs `SELECT * FROM messages`, an RLS policy ensures the database *only* returns messages where the requester's `user_id` matches the `sender_id` or `recipient_id`. Even a catastrophic backend flaw cannot leak another user's data if RLS is configured correctly.

---

## Do's and Don'ts of Production Authorization

- **DO centralize your permission logic.** Do not write `if (user.id === listing.owner_id)` randomly across 50 different files. Use a dedicated authorization library (like CASL, Permit.io, or explicit helper functions) so you have a single source of truth for who can do what.
- **DON'T trust client-side claims for critical actions.** A JWT might say the user is an `Admin`, but if you are processing a $5,000 refund, re-verify their status against the database before executing the charge.
- **DO verify "Party to Transaction" logic.** Most marketplace actions require checking if the user is a specific party to the transaction. A seller can update a listing, but a buyer cannot. Both can read the transaction, but only the seller can mark it shipped.
- **DON'T mix authentication state with authorization state.** Just because someone is logged in (Authentication) does not mean their account is in good standing. Always check the `account_status` (e.g., `BANNED`, `SUSPENDED`) before authorizing an action.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Row-Level Security (RLS) Generation:**

````prompt
I am using Postgres/Supabase for my marketplace. I need to write Row-Level Security (RLS) policies for my `Transactions` table. Act as a Database Security Expert. Write the exact SQL policies required to ensure: 
1. A Buyer can only SELECT transactions where `buyer_id = auth.uid()`.
2. A Seller Organization member can SELECT transactions where `seller_org_id = their_org_id`.
3. Only the backend service role (not standard users) can UPDATE the `status` field.
````

> [!TIP]
> **Prompt 2 — RBAC Middleware Logic:**

````prompt
I am building a Next.js backend. Provide a reusable TypeScript utility function or Middleware that takes a `user_id`, a `resource_type` (e.g., 'listing'), a `resource_id`, and an `action` (e.g., 'update'). The function must query my Prisma database to verify if the user's Organization Role permits this specific action on this specific resource.
````

---

## Validating What AI Generates

- **Check for Hardcoded ID bypasses:** If AI writes an authorization check that bypasses security for a hardcoded admin ID (e.g., `if (user.id === '123') allow()`), reject it immediately. Admin status must be a database role, not a hardcoded string.
- **Verify frontend vs. backend logic:** Ensure the AI is writing authorization logic in your Server Actions or API routes, not just generating React components that hide buttons based on state.

---

## Implementation Checklist

- [ ] Defined the RBAC (Role-Based Access Control) matrix for Seller Organizations (Owner, Manager, Fulfillment).
- [ ] Centralized all permission logic into reusable functions or a dedicated library.
- [ ] Enforced database-level protection using Row-Level Security (RLS) or strict ORM scoping.
- [ ] Verified that every mutating API route (`POST`, `PUT`, `DELETE`) includes a strict authorization check before touching the database.
- [ ] Added `account_status` checks to block suspended or banned users from transacting.

---

## What's Next

Next: **Listing System** — With authorization securing our data, we can finally build the core inventory model. We will architect how sellers create, categorize, and manage their listings at scale.
