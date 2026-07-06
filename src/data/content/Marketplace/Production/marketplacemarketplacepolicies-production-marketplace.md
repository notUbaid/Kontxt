---
title: Marketplace Policies
slug: marketplace-policies
phase: Phase 1
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Marketplace Policies (Programmatic Governance)

In a personal project, policies are a page of text you hope people read. In a production marketplace, policies are business logic encoded directly into your database constraints and payment routing.

If your policy states "No refunds after 48 hours," but your payment architecture does not physically lock the escrow funds after 48 hours, your policy is fiction. You will lose chargebacks, and your Stripe account will be penalized. 

Policy is architecture. Decide it now.

---

## The Four Pillars of Production Policy

You must define the exact programmatic rules for the following four areas before you write a single line of backend code:

| Policy Area | The Business Decision | The Engineering Implication |
|---|---|---|
| **Prohibited Inventory** | What exactly is banned? | Requires keyword filtering, automated flags, or ML image moderation. |
| **Seller Approval** | Open signup vs. Vetted supply. | Defines the KYC/AML onboarding flow and `is_verified` database flags. |
| **Cancellation & Refunds**| Who holds the risk on a canceled deal? | Defines the Escrow timeline, Stripe Refund API triggers, and take-rate clawbacks. |
| **Dispute Resolution** | What happens when they disagree? | Requires a built-in messaging/evidence portal and Admin mediation dashboard. |

> [!WARNING]
> Do not copy-paste Airbnb or Uber's policies. They have massive legal and customer support teams to enforce subjective rules. Your policies must be binary and mathematically enforceable by code.

---

## Moving from Manual to Programmatic Moderation

At production scale, you cannot manually review every listing before it goes live. You must architect a **Post-Moderation** or **Algorithmic Moderation** system.

1. **The Automated Filter:** When a seller submits a listing, run the description through a basic blocklist (or a fast LLM API call) to catch prohibited items, off-platform payment links, or PII (Personally Identifiable Information).
2. **The Reputation Threshold:** New sellers (0 reviews) might require manual approval for their first 3 listings. Power sellers (50+ reviews) bypass the queue and go live instantly.
3. **The User-Reporting Engine:** Every listing must have a "Report this" button. If a listing receives 3 reports, the system automatically unpublishes it and flags it for Admin review.

---

## Architecting the Refund Policy

Refunds are the highest-friction point in any marketplace. Your policy must be translated into Escrow timelines.

**Example Production Policy:**
*Buyers have 24 hours after delivery to report a material defect. After 24 hours, funds are released to the seller and all sales are final.*

**The Engineering Implementation:**
1. Transaction authorized. Funds held in Stripe Connect Escrow.
2. Item marked `Delivered`. A CRON job starts a 24-hour countdown timer.
3. If Buyer clicks `Dispute`, pause the timer and alert Admin.
4. If no action, CRON job fires at 24:00:01, capturing the charge and routing the payout to the Seller.

> [!DECISION]
> Do not allow buyers and sellers to indefinitely "work it out" with their money in limbo. Set a strict, hard-coded timeline for when funds settle. 

---

## Liability and "Off-Platform" Leakage

The biggest risk to a marketplace is Disintermediation (Leakage) — buyers and sellers meeting on your platform, then completing the transaction via Venmo to avoid your Take Rate.

Your policy must strictly forbid sharing external contact info before a transaction. More importantly, your architecture must enforce it.
* **The Fix:** Implement regex filters in your messaging system that automatically redact phone numbers, email addresses, and cash-app handles until *after* the Escrow is funded.

---

## AI Prompts for Policy Architecture

> [!TIP]
> **Prompt 1 — Escrow Logic Generation:**

````prompt
I am building a [Goods / Services] marketplace. My refund policy is: [Insert your specific refund policy]. Act as a Senior Backend Architect. Map out the exact sequence of database state changes, CRON jobs, and Stripe API calls required to programmatically enforce this policy without manual Admin intervention.
````

> [!TIP]
> **Prompt 2 — Moderation Filter Rules:**

````prompt
Act as a Trust & Safety Engineer. I need to build a regex-based or lightweight moderation filter for my marketplace messaging system. Give me the specific patterns to detect and redact email addresses, phone numbers, and common external payment terms (e.g., Venmo, Zelle, CashApp) to prevent off-platform leakage.
````

---

## Validating AI Output

- **Check for operational reality:** If the AI suggests a policy that requires "24/7 human moderation," reject it. Force the AI to provide a policy that can be enforced entirely by code or automated thresholds.
- **Verify Payment API constraints:** If the AI suggests holding funds in Escrow for 180 days, verify that your payment processor actually allows holds that long (Stripe PaymentIntents max out at 7 days for uncaptured funds without specialized setups).

---

## Checklist: Policy Architecture

## Checklist:
- [ ] Defined a strict, binary list of prohibited inventory.
- [ ] Designed the automated moderation thresholds (e.g., blocklists, reporting quotas).
- [ ] Mapped the exact Escrow timeline required to enforce your Refund Policy.
- [ ] Architected anti-leakage filters for the messaging system.
- [ ] Documented these policies as requirements for the engineering team.

---

## What's Next

Next: **Trust & Safety Planning** — Policies define the rules. Trust & Safety defines the overarching system architecture required to keep bad actors out, verify identities, and handle the disputes your policies just defined.
