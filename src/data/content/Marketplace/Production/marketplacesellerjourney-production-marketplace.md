---
title: Seller Journey
slug: seller-journey
phase: Phase 1
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Seller Journey (Supply Onboarding & Management)

In a personal project, you manually onboard sellers. In a production marketplace, Supply Onboarding is a highly automated, self-serve funnel that must balance removing friction with enforcing strict legal compliance.

A seller is not just a user; they are a business partner. They are evaluating your platform based on three factors: API access, liquidity (will they actually sell anything?), and reliable payouts. Your architecture must support them at scale.

---

## The Production Supply Funnel

You must engineer the Seller Journey into four distinct phases, each with specific technical requirements:

| Stage | The Engineering Goal | The Technical Requirement |
|---|---|---|
| **Acquisition** | Low-friction sign up. | OAuth (Google/GitHub/SSO) & minimal profile setup. |
| **Verification (KYC)**| Compliance before payout. | Stripe Identity or similar KYC integration. |
| **Inventory Ingestion**| Scaling Supply quickly. | CSV Bulk Upload or REST API access. |
| **Fulfillment & Payout**| Reliable cash flow. | Stripe Connect (Express/Custom) automated routing. |

> [!CAUTION]
> Do not allow a seller to list items or accept bookings before they pass KYC (Know Your Customer) and AML (Anti-Money Laundering) checks. If you process payments for an unverified entity, your platform is liable for fraud and your payment processor will shut you down.

---

## Architecting Bulk Inventory Ingestion

Professional sellers do not want to fill out a 10-field web form 500 times. If your platform only supports manual listing creation, you will only attract hobbyists.

To attract production-grade supply, you must architect bulk ingestion:
1. **The CSV Importer:** A Drag-and-Drop component that parses CSV files, maps columns to your database schema, and handles batch validation errors cleanly.
2. **The Inventory API:** A rate-limited REST or GraphQL API that allows enterprise sellers to sync their existing inventory management software (e.g., Shopify, Salesforce) directly to your platform.

---

## Stripe Connect and the Payout Architecture

The Seller Journey ends with the payout. This is the most complex backend engineering required for your MVP.

You must design the flow for **Stripe Connect** (or an equivalent routing system):
- **Onboarding:** Sellers are redirected to a Stripe-hosted onboarding flow to submit their tax IDs and bank details.
- **The Webhook:** Stripe fires an `account.updated` webhook. Your backend listens for this and updates the seller's `payouts_enabled` status in your database.
- **The Split:** When a transaction occurs, your backend uses a `Destination Charge` to automatically split the funds: X% to the platform (your Take Rate), and the remainder routed directly to the seller's Connect account.

> [!IMPORTANT]
> Never touch the seller's money directly. If funds hit your corporate bank account before being manually routed to a seller, you become a regulated Money Transmitter, exposing you to catastrophic legal compliance requirements. Always use a compliant Escrow/Routing architecture.

---

## Designing for Multi-Tenancy (RBAC)

Enterprise sellers often have teams. A business owner wants to view analytics, but they want their warehouse staff to manage fulfillment without having access to the bank routing numbers.

Your database and frontend architecture must support **Role-Based Access Control (RBAC)** from day one:
- **Roles:** `Admin`, `Manager`, `Fulfillment`.
- **Permissions:** Your API must check `user.role` on every mutating request (`POST`, `PUT`, `DELETE`).

---

## AI Prompts for Supply Architecture

> [!TIP]
> **Prompt 1 — Stripe Connect Webhook Architecture:**

````prompt
Act as a Senior Backend Architect. Map out the exact webhook architecture required to onboard a seller via Stripe Connect Custom. Provide the sequence of API calls to create the account, generate the account link, and the specific webhook events I must listen to in order to update the seller's `kyc_status` in my Postgres database.
````

> [!TIP]
> **Prompt 2 — Bulk CSV Uploader Logic:**

````prompt
I need to build a Bulk Inventory CSV Importer for sellers. Act as a Data Engineer. Write the pseudo-code for a backend queue worker (using Redis/BullMQ or AWS SQS) that can process a 10,000-row CSV file asynchronously. Include logic for batching database inserts and generating an "Error Report" for rows that fail validation.
````

---

## Validating AI Output

- **Enforce strict compliance logic:** If AI generates an onboarding flow that delays KYC checks until *after* the first transaction, reject it. Enforce compliance before the first transaction to prevent fraud.
- **Verify asynchronous batching:** For bulk uploads, ensure the AI architecture uses background jobs (queues) rather than trying to parse and insert 10,000 rows in a single synchronous API request (which will time out).

---

## Checklist: Seller Journey Architecture

## Checklist:
- [ ] Architected the OAuth and profile creation flow.
- [ ] Integrated KYC/AML compliance checks (e.g., Stripe Identity) before allowing listings.
- [ ] Designed an inventory ingestion method beyond single-forms (e.g., CSV upload or API).
- [ ] Mapped the Stripe Connect onboarding and webhook verification flow.
- [ ] Defined Role-Based Access Control (RBAC) schemas for multi-tenant seller accounts.

---

## What's Next

Next: **Marketplace Policies** — Now that both supply and demand journeys are mapped, we must define the programmatic rules that govern their interactions: refunds, disputes, and acceptable use.
