---
title: Trust & Safety Planning
slug: trust-safety-planning
phase: Phase 1
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Trust & Safety Planning (Risk Architecture)

In a personal project, Trust & Safety means you manually deleting a spam listing once a week. In a production marketplace, Trust & Safety (T&S) is an automated defense grid. 

Marketplaces are highly targeted by organized fraud rings because they facilitate the movement of money between strangers. If you do not architect strict Trust & Safety mechanisms, bad actors will use your platform for money laundering, chargeback fraud, or scamming your buyers. When that happens, your payment processor (Stripe, Adyen) will terminate your account, and your business is dead.

---

## The Production Risk Matrix

Before architecting your T&S stack, you must quantify your exact risk profile.

| Risk Factor | Low Risk (e.g., Digital Downloads) | High Risk (e.g., Luxury Watches, In-Home Services) |
|---|---|---|
| **Transaction Value** | < $50 | > $500 |
| **Fulfillment Reversibility** | High (Revoke API key or download link) | Low (Item shipped or service rendered) |
| **Physical Safety Risk** | Zero (Remote transactions) | Extreme (Strangers meeting in person) |

> [!WARNING]
> Do not over-engineer or under-engineer. If you require a passport upload (KYC) to sell a $5 digital sticker, no one will use your platform. If you *do not* require a passport upload for a babysitter entering a user's home, you are exposing yourself to catastrophic liability.

---

## The Trust & Safety Architecture Stack

For a production marketplace, you must layer automated defenses. Build this stack from the bottom up based on your Risk Matrix.

### 1. Identity Verification (KYC / KYB)
You must legally verify who is receiving payouts.
* **Architecture:** Integrate `Stripe Identity`, `Persona`, or `Plaid`. Force sellers to scan a Government ID and take a selfie *before* their first listing goes live. For B2B marketplaces, verify their Employer Identification Number (KYB).

### 2. Chargeback Defense Engine
When a buyer issues a chargeback via their bank, you have 72 hours to submit evidence, or you lose the money and pay a $15 penalty.
* **Architecture:** Your database must log an un-deletable audit trail for every transaction: Timestamp of purchase, IP address of the buyer, proof of delivery (e.g., tracking number or digital access log), and all in-app chat logs. This data must be easily exportable for Stripe Dispute submission.

### 3. Algorithmic Content Moderation
You cannot manually read every message to ensure buyers and sellers aren't sharing phone numbers to bypass your take rate.
* **Architecture:** Pipe all listing descriptions and chat messages through a fast NLP (Natural Language Processing) API or Regex filter. Auto-redact emails, phone numbers, and phrases like "pay me on Venmo."

### 4. The Reputation and Reporting Loop
Users are your best moderation team.
* **Architecture:** Every listing and user profile must have a "Report" button. If a user receives 3 reports within 24 hours, the system should automatically suspend their account and freeze their pending payouts until an Admin reviews the case.

---

## Escrow as the Ultimate Defense

The single most effective Trust & Safety mechanism is holding the money. 

If a scammer knows they will not receive the funds until the buyer confirms the item was delivered as described, they will not target your platform. They will target a platform that pays out instantly.

> [!DECISION]
> Structure your payment routing so that funds sit in a locked Escrow state until fulfillment is mathematically verified (e.g., FedEx API confirms delivery) or manually confirmed by the buyer. Delaying payouts is your strongest shield against fraud.

---

## AI Prompts for Trust & Safety Architecture

> [!TIP]
> **Prompt 1 — The Automated Moderation Regex:**

````prompt
Act as a Trust & Safety Engineer. Write a comprehensive set of JavaScript/TypeScript Regular Expressions (Regex) designed to catch and redact off-platform leakage in marketplace chat messages. It must catch standard email formats, obscured emails (e.g., "name at gmail dot com"), phone numbers in various formats, and mentions of external payment apps (Venmo, CashApp, Zelle).
````

> [!TIP]
> **Prompt 2 — Dispute Resolution Flow:**

````prompt
I am building a [Goods/Services] marketplace. I need to design the UI and database architecture for a "Dispute Resolution Center." Act as a Senior Product Manager. Map out the exact step-by-step flow a buyer goes through to open a dispute, the evidence they must submit, how the seller responds, and the specific database states the `Transaction` record transitions through during this process.
````

---

## Validating AI Output

- **Verify legal boundaries:** If the AI suggests building your own system to securely store passport photos or Social Security Numbers, reject it immediately. You must use a compliant third-party vendor (like Stripe Identity) for PII (Personally Identifiable Information) to avoid toxic data liability.
- **Check for operational realism:** If AI suggests "routing every message to a human moderator for review," reject it. A production platform must rely on automated heuristics (Regex/NLP) to flag messages, relying on humans only for escalated reviews.

---

## Checklist: Trust & Safety Architecture

## Checklist:
- [ ] Mapped your marketplace onto the Risk Matrix to determine the required level of KYC/KYB.
- [ ] Integrated a third-party Identity Verification provider.
- [ ] Architected a database audit log to automatically capture chargeback defense evidence.
- [ ] Implemented algorithmic redaction in the messaging system to prevent platform leakage.
- [ ] Tied the Trust & Safety reporting loop to automated Account Suspension thresholds.

---

## What's Next

Phase 1 is now complete. You have a PRD, rigorous User Flows, structural Wireframes, a Design System, and a robust Trust & Safety architecture.

Next: **Phase 2: Marketplace Architecture** — We will translate these product decisions into hard engineering reality: Database Schemas, Authentication paradigms, and global state management.
