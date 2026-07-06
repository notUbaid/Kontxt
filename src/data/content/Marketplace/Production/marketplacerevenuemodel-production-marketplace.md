---
title: Revenue Model
slug: revenue-model
phase: Phase 0
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Revenue Model

You have a plan to reach liquidity. Now you must architect how you will extract value from that liquidity.

In a production environment, you cannot defer monetization under the guise of "growing the user base first." If your marketplace mechanics do not support a profitable revenue model, you do not have a business—you have a subsidized public utility. Your Revenue Model directly dictates your payment infrastructure, your compliance burden, and your product's defense against disintermediation.

---

## The Production Monetization Matrix

Production marketplaces generally employ one of three models, or a hybrid. Your choice dictates your Stripe architecture.

| Model | How it Works | Architectural Requirement | Best For |
|---|---|---|---|
| **Take Rate (Commission)** | You capture a % of GMV (Gross Merchandise Value) per transaction. | Stripe Connect (Express/Custom), Escrow, Split Routing. | High-frequency goods or services where you control the checkout flow. |
| **Lead Generation (Bidding)** | Sellers pay to contact buyers or list items. The transaction happens off-platform. | Simple Stripe Billing (Charges), Token systems. | High-value, complex services (e.g., Thumbtack, Real Estate). |
| **SaaS Subscription** | Sellers (or buyers) pay a monthly fee for access or premium workflow tools. | Stripe Billing (Subscriptions), Role-based Access Control. | B2B Marketplaces, or highly constrained niches where Take Rates fail. |

> [!DECISION]
> You must select a primary Revenue Model now. "We will figure it out later" is an invalid architecture strategy. If you choose Take Rate, you must build Escrow. If you choose Lead Gen, you must build a token/credit ledger. 

---

## The Take Rate and Disintermediation (Leakage)

If you charge a 20% Take Rate, you are charging a 20% tax. In a production marketplace, rational economic actors will immediately attempt to circumvent your tax by taking the transaction off-platform (Disintermediation or "Leakage").

Your product must provide *more than 20% in value* to prevent leakage. You cannot solve leakage by banning users who share phone numbers; you solve it through product architecture:

1. **Workflow Lock-in:** The seller's calendar, CRM, and tax reporting are exclusively on your platform. Moving off-platform is an operational nightmare for them.
2. **Trust & Insurance:** You offer a $1,000,000 guarantee or dispute resolution. Moving off-platform exposes the buyer to unacceptable risk.
3. **Financing:** You offer "Buy Now, Pay Later" to the buyer, or instant payouts to the seller.

> [!WARNING]
> If your product is just a glorified directory of phone numbers and your Take Rate is 15%, your leakage rate will approach 100%. Your infrastructure must lock the transaction into the platform.

---

## Unit Economics: GMV vs. Net Revenue

Do not confuse GMV (Gross Merchandise Value) with your actual Revenue. 

If a buyer pays $100 for a service, and your Take Rate is 20%:
* **GMV:** $100
* **Net Revenue:** $20
* **Payment Processing Fees (Stripe):** ~$3.20 (You pay this out of your Net Revenue, not the GMV).
* **Gross Margin:** $16.80

> [!IMPORTANT]
> Your Customer Acquisition Cost (CAC) must be paid out of your *Gross Margin*, not your GMV. If it costs $20 to acquire that buyer, you are losing $3.20 on the first transaction. You must architect your product to ensure that buyer returns for a second transaction.

---

## The Compliance Burden of "Take Rates"

If you touch the money, you inherit the compliance. Selecting a Take Rate model means you are operating as a platform routing funds between two parties. 

* **KYC (Know Your Customer):** You cannot legally pay a seller without verifying their identity and tax status (1099-K in the US). Your onboarding flow must integrate KYC APIs.
* **Escrow/Delayed Payouts:** You cannot instantly pay a seller for a service happening next week. If the seller doesn't show up, you are liable for the refund. Your architecture must hold funds in a `pending` state and trigger payouts based on fulfillment webhooks.

---

## AI Prompts for Financial Architecture

> [!TIP]
> **Prompt 1 — The Disintermediation Defense:**

````prompt
I am building a marketplace for [Your Niche] using a [Take Rate / Subscription] model. Act as a rational, profit-maximizing user on my platform. Explain exactly how and why you would attempt to bypass my platform to avoid paying my fees (Leakage). Then, act as a Principal Product Manager and suggest 3 highly technical "lock-in" features I must build to make off-platform transactions mathematically irrational for you.
````

> [!TIP]
> **Prompt 2 — Escrow & Payment Routing:**

````prompt
My marketplace charges a [X]% Take Rate on transactions of roughly $[Y]. The service is fulfilled [Immediately / Over Time]. Write a technical specification for the Stripe Connect payment flow. Detail exactly when the card is authorized, when it is captured, where the funds are held (Escrow), and what specific application event triggers the payout to the seller's connected account.
````

---

## Validating AI Output

- **Check the math:** Ensure AI calculations correctly subtract payment gateway fees (e.g., 2.9% + $0.30) from your Net Revenue, not from the overall GMV.
- **Verify Escrow logic:** If AI suggests capturing funds and immediately routing them to the seller before the service is rendered, reject the architecture. That is a massive chargeback liability.

---

## Checklist: Financial Architecture

## Checklist:
- [ ] Selected a definitive Revenue Model (Take Rate, Lead Gen, or SaaS Subscription).
- [ ] Documented your defense against Disintermediation (Leakage).
- [ ] Calculated a rough Unit Economics estimate (GMV -> Net Revenue -> Gross Margin -> CAC).
- [ ] Outlined the technical requirements for Escrow, payout delays, and KYC compliance.

---

## What's Next

Next: **MVP Scope** — We take your structural blueprint, your Go-To-Market strategy, and your Revenue Model, and ruthlessly cut everything that isn't mathematically required to execute your first transaction.
