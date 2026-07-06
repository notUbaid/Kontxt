---
title: User Architecture
slug: user-architecture
phase: Phase 2
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# User Architecture (Multi-Tenancy)

## From "User Model" to "Entity Architecture"

In a simple app, a `User` table holds an email, a password, and a profile picture. In a production marketplace, the "User" is the most complex entity in your database. 

A user might be a retail buyer today, a solo seller tomorrow, and an employee of a massive B2B supply agency next week. If you hardcode a `role` column directly onto a single `User` table, your database will collapse under the weight of multi-tenant edge cases.

You must decouple the **Identity** (the person logging in) from the **Entity** (the business or profile conducting the transaction).

---

## The Production Multi-Tenant Schema

To support enterprise supply (agencies, teams, and franchises) alongside retail demand, you must implement a strict Multi-Tenant schema.

| Table | What It Represents | Production Purpose |
|---|---|---|
| **Users** | The Identity (The Human) | Holds Auth ID, Email, MFA Secrets, and global account status. No financial data. |
| **Organizations** | The Entity (The Business) | Holds Stripe Account ID, Tax ID, Public Profile, and aggregate Review Ratings. |
| **Memberships** | The Join (The Permissions) | Links a `User` to an `Organization`. Holds the RBAC role (Admin, Fulfillment, Read-Only). |

**Why this is mandatory:** 
If a B2B Seller Organization is banned, the `Organization` is flagged as banned. The individual `Users` inside that organization can still log in to export their tax documents or act as individual retail buyers on other accounts, but they cannot transact on behalf of the banned entity.

---

## Data Isolation and PII (Personally Identifiable Information)

Marketplaces handle highly sensitive data: Bank routing numbers, Passports (KYC), and physical addresses. 

> [!CAUTION]
> Never store sensitive PII (like Social Security Numbers or unencrypted bank details) in your primary database. If your database is compromised, you will face catastrophic legal liability.

* **KYC Data:** Offload passport and ID verification entirely to `Stripe Identity` or `Persona`. Store only the verification status (`kyc_status: 'verified'`) in your database.
* **Financial Routing:** Store payout bank details directly in `Stripe Connect`. Your `Organization` table should only hold the `stripe_account_id`.
* **Public vs. Private:** Separate public-facing data (e.g., `store_description`, `avatar_url`) from private data (e.g., `legal_business_name`, `support_email`) into strict column groups or separate related tables.

---

## GDPR and the "Right to be Forgotten"

Users will request to delete their accounts. In a standard app, you just run `DELETE FROM users`. In a marketplace, deleting a user breaks the foreign key constraints on every transaction they were ever involved in, destroying your financial ledger.

**The Production Solution: Soft Deletes and Anonymization**
1. Add an `is_archived` boolean and an `archived_at` timestamp to the `User` and `Organization` tables.
2. When a user requests deletion, update `is_archived = true`.
3. **Anonymize PII:** Overwrite their `first_name`, `last_name`, and `email` with cryptographic hashes or generic strings (e.g., `user_deleted_8f9a2`), but leave their `user_id` intact so historical transactions remain mathematically valid.

---

## Do's and Don'ts of User Architecture

- **DO cache aggregate trust signals.** A user's `average_rating` or `response_time` should be calculated asynchronously and cached on the `Organization` table. Do not calculate this dynamically on every profile load.
- **DON'T tie listings to Users.** A `Listing` must belong to an `Organization`, not a `User`. If a user leaves the company, the company keeps the listings.
- **DO track User Timezones.** Marketplaces span geographies. Store the user's explicit timezone on their record so you can send localized emails and calculate correct Escrow expiration windows.
- **DON'T mix Auth state with Business state.** Whether an email is verified belongs to Auth. Whether a seller is approved to list luxury goods belongs to Business Logic. Keep these flags distinct.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Multi-Tenant Schema Generation:**

````prompt
Act as a Senior Database Architect. I am building a multi-tenant B2B2C marketplace using [Postgres/Prisma]. Design the exact schema for `Users`, `Organizations`, and `Memberships`. Ensure that a User can belong to multiple Organizations with different roles (Admin, Member). Include the exact Foreign Key constraints and Indexes required for high-performance querying.
````

> [!TIP]
> **Prompt 2 — GDPR Anonymization Script:**

````prompt
I need to implement a GDPR-compliant "Delete Account" function in my Node.js/Postgres backend. I cannot hard-delete the user because they have attached financial Transactions. Write the SQL or Prisma logic to execute a "Soft Delete" that nullifies or encrypts PII (Name, Email, Phone) while preserving the core UUID and leaving the financial ledger intact.
````

---

## Validating What AI Generates

- **Check for cascading deletes:** If the AI generates a schema with `ON DELETE CASCADE` from the `User` table to the `Transaction` table, reject it immediately. You must never cascade a delete into financial ledgers.
- **Verify relationship mapping:** Ensure `Listings` and `Transactions` are foreign-keyed to the `Organization` (the entity), not the `User` (the identity).

---

## Implementation Checklist

- [ ] Architected the decoupled Multi-Tenant schema (`Users`, `Organizations`, `Memberships`).
- [ ] Mapped PII and Financial Data to secure third-party vaults (e.g., Stripe) rather than the primary database.
- [ ] Designed the GDPR-compliant Soft Delete and Anonymization workflow.
- [ ] Added async-calculated trust signals (ratings, listing count) directly to the `Organization` schema.
- [ ] Documented the specific roles that will exist within the `Memberships` table (e.g., Owner, Admin, Fulfillment).

---

## What's Next

Next: **Authorization** — We have defined the schemas and the roles. Now we must write the strict mathematical rules (Row-Level Security / Middleware) that govern exactly who is allowed to read, write, or delete this data.
