---
title: Database
slug: database
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 25-30 min
---

# Database (Schema & Migrations)

## The Immutable Foundation

In Phase 2, you made critical architectural decisions regarding multi-tenancy, soft deletes, and financial ledgers. This module is where those decisions become raw SQL (or Prisma/Drizzle schemas).

If you make a mistake in your frontend, you deploy a hotfix in 10 minutes. If you make a mistake in your database schema (e.g., dropping a column, using the wrong data type for money), fixing it in production without downtime or data loss is incredibly difficult. 

---

## Why You Must Use Postgres (ACID Compliance)

For a production marketplace, you must use a relational database with strict ACID compliance (Atomicity, Consistency, Isolation, Durability). **Postgres is the undisputed enterprise standard.**

> [!CAUTION]
> Never use NoSQL (MongoDB, Firebase Firestore) for a marketplace's core transactional ledger. If an order fails halfway through processing, NoSQL databases do not guarantee atomic rollbacks across multiple documents. You will end up with orphaned payments and corrupted ledgers.

---

## The Consolidated Enterprise Schema

Your database must reflect the multi-tenant reality defined in Phase 2.

| Entity | Core Responsibility | Production Schema Rule |
|---|---|---|
| **Users** | Authentication | Never stores Stripe data. Linked to Auth0/Supabase Auth ID. |
| **Organizations** | B2B/B2C Entities | Holds `stripe_account_id`. Is the parent for all Listings. |
| **Memberships** | RBAC Join Table | Links `Users` to `Organizations` with a specific `role`. |
| **Categories** | Taxonomy | Must be a strict table. Never use free-text strings for categories. |
| **Listings** | Core Inventory | Uses `status` Enum (Draft, Active, Archived). |
| **ListingVariants** | SKUs | Handles sizes, colors, and `inventory_count`. |
| **Transactions** | Financial Ledger | The nexus point. Links Buyer (User), Seller (Organization), and Listing. |
| **EscrowLedger** | Payment State | Tracks `capture_method`, Escrow release dates, and dispute flags. |

---

## Enforcing Constraints at the Database Level

Application-level validation (e.g., Zod) is great, but it is not a substitute for Database Constraints. If a developer accidentally bypasses the API and writes to the database directly, the database must reject invalid data.

* **Foreign Keys:** Every relational link must be an enforced Foreign Key.
* **No Cascading Deletes:** NEVER use `ON DELETE CASCADE` on `Listings`, `Transactions`, or `Organizations`. If an organization is deleted, the database must `RESTRICT` the deletion to protect the historical financial ledger.
* **Check Constraints:** Ensure `price >= 0` and `inventory_count >= 0` directly in the database definition.

---

## Migrations and CI/CD

In production, you never alter the database schema manually via a GUI (like pgAdmin). You must use a migration engine (Prisma Migrate, Drizzle Kit, Flyway, or Liquibase).

1. Every schema change generates a `.sql` file (a migration).
2. The migration is committed to Git.
3. During deployment, your CI/CD pipeline (GitHub Actions) runs the migration against the production database automatically.
4. **Zero Downtime:** Migrations must be non-blocking. Instead of locking a table for 20 minutes to add an index, use `CREATE INDEX CONCURRENTLY`.

---

## Do's and Don'ts of Production Databases

- **DO implement Row-Level Security (RLS).** If using Supabase or direct Postgres, write RLS policies so that `SELECT * FROM transactions` only returns rows where the `requester_id` matches the `buyer_id` or `seller_org_id`.
- **DON'T store prices as Floats or Decimals.** Store all financial amounts as `INTEGER` representing the smallest currency unit (e.g., cents in USD). Floating-point math will cause rounding errors that break your Stripe integration.
- **DO use Soft Deletes.** Add `is_archived` (Boolean) and `archived_at` (Timestamp) to your core tables. Filter them out in your API queries, but keep the data for analytics and compliance.
- **DON'T rely solely on UUIDv4.** While UUIDs are great for obfuscation, they are terrible for database index fragmentation. Consider ULIDs (Universally Unique Lexicographically Sortable Identifiers) or UUIDv7 for better insert performance at scale.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Multi-Tenant Prisma Schema:**

````prompt
Act as a Principal Database Architect. Write a production-ready Prisma schema (`schema.prisma`) for a B2B2C marketplace. It must include `Users`, `Organizations`, `Memberships`, `Listings`, `ListingVariants`, and `Transactions`. Enforce strict Foreign Keys, map all prices to `Int` (cents), define Enums for all status fields, and ensure `Transactions` link the Buyer (User) to the Seller (Organization). Do not use `ON DELETE CASCADE` for financial records.
````

> [!TIP]
> **Prompt 2 — Zero-Downtime Migration SQL:**

````prompt
I am using Postgres. I need to add a new `search_vector` column to my `Listings` table and populate it with existing data, then add a GIN index. Write the exact raw SQL migration to do this with Zero Downtime (`CONCURRENTLY`), ensuring it does not lock the table and take down my production marketplace while it runs.
````

---

## Validating What AI Generates

- **Check for Cascade Deletes:** If the AI generates a schema with `onDelete: Cascade` connecting Users to Transactions, reject it entirely. This violates financial compliance.
- **Verify Indexing:** Ensure the AI adds indexes to Foreign Keys and highly queried fields (like `status` and `created_at`). A schema without indexes will crash under production load.

---

## Implementation Checklist

- [ ] Provisioned a production-grade Postgres database (e.g., Supabase, AWS RDS, Neon).
- [ ] Mapped the entire Multi-Tenant entity relationship diagram into a formal ORM schema (Prisma/Drizzle).
- [ ] Converted all boolean flags into strict Database Enums (e.g., `status: 'ACTIVE' | 'ARCHIVED'`).
- [ ] Enforced `ON DELETE RESTRICT` (Soft Deletes) across all transactional tables.
- [ ] Set up an automated Migration pipeline in your CI/CD workflow.

---

## What's Next

Next: **Backend** — With our database schema locked and our auth system verified, we must build the API layer. We will architect the secure, performant REST or GraphQL endpoints that interact with this data and enforce our authorization rules.
