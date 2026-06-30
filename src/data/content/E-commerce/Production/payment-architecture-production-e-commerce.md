---
title: Payment Architecture
slug: payment-architecture
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 35–45 min
---

# Payment Architecture

At a small scale, payments are a "Buy Now" button connected to a Stripe account. At production scale, payment architecture is a complex matrix of international compliance, fraud prevention, alternative payment methods (APMs), and accounting reconciliation.

If your payment architecture is poorly designed, you will suffer from high cart abandonment in international markets, devastating chargeback ratios, and a finance team that cannot reconcile the bank account with the database.

---

## 1. Localized Payment Methods (APMs)

Credit cards are the default in the US. They are *not* the default globally. 

If you are expanding internationally, your payment architecture must dynamically present the correct Alternative Payment Methods (APMs) based on the customer's IP or billing address.

- **Europe:** iDEAL (Netherlands), Bancontact (Belgium), SEPA Direct Debit (Germany).
- **Buy Now, Pay Later (BNPL):** Klarna, Afterpay, Affirm. BNPL can increase AOV (Average Order Value) by 20-30%, but processors charge higher transaction fees (up to 6%).
- **Digital Wallets:** Apple Pay, Google Pay, Shop Pay. These bypass manual data entry and are critical for mobile conversion.

**The Architecture:**
Do not hardcode payment methods. Use a unified integration (like Stripe Payment Element or Adyen Drop-in) that automatically renders the localized APMs based on the `currency` and `country` passed to the PaymentIntent.

---

## 2. Strong Customer Authentication (SCA) & 3D Secure

If you sell into the European Economic Area (EEA) or the UK, you are legally required to comply with **Strong Customer Authentication (SCA)** under PSD2 regulations.

This means customers must authenticate their transaction via a second factor (e.g., a push notification to their banking app).

**The Architectural Impact:**
- Payments are no longer a synchronous "pass/fail".
- The state machine becomes: `requires_payment_method` → `requires_action` (user must verify in banking app) → `processing` → `succeeded`.
- If you build a custom API integration, you must build the UI to handle the `requires_action` redirect securely. Failing to do this means 100% of your European transactions will be declined.

---

## 3. Webhook Idempotency & The Double-Charge Risk

When you charge a customer $1,000, you cannot afford to charge them twice because a server timed out.

**The Golden Rule of Payments:** All payment actions must be idempotent.

When you create a PaymentIntent or a Charge, you must pass an **Idempotency Key** (usually the Order ID or a unique UUID generated at the start of checkout). If the network drops and your server retries the exact same request with the same Idempotency Key, the payment processor will recognize it and *not* charge the customer a second time.

**Webhook Idempotency:**
Stripe guarantees "at least once" delivery of webhooks. This means they might send the `payment_intent.succeeded` event twice.
Your webhook handler must:
1. Verify the signature.
2. Check if `order_id` is already marked as `paid`.
3. If yes, return `200 OK` and do nothing.
4. If no, update the database and trigger fulfillment.

---

## 4. B2B Payments: Net Terms and Invoicing

If you operate a B2B or hybrid B2B/B2C store, credit cards are insufficient. B2B buyers expect **Net 30 / Net 60** terms (pay 30 days after the invoice).

**Architectural Requirements for B2B:**
- **Customer Segmentation:** The commerce engine must recognize the authenticated user as a B2B account.
- **Payment Method Override:** At checkout, the system must bypass the credit card requirement and allow the user to check out using a "Purchase Order (PO)" or "Invoice" method.
- **Credit Limits:** The database must track the customer's available credit limit and reject the PO if they are overextended.
- **Reconciliation:** The ERP or accounting system (NetSuite, QuickBooks) must generate the invoice and track the wire transfer/ACH payment asynchronously 30 days later.

---

## 5. Multi-Currency Architecture

Selling in multiple currencies introduces massive accounting and UI complexity.

**Approach A: Presentational Multi-Currency**
The storefront detects the user's IP and displays prices in Euros, based on a daily API exchange rate. However, at checkout, the user is charged in USD. 
*Result:* High cart abandonment when the user sees a foreign currency at the final step, plus angry customers who get hit with foreign transaction fees by their bank.

**Approach B: Native Multi-Currency (The Production Standard)**
The user sees Euros. The checkout charges Euros. The payment processor settles in Euros (or converts to USD at a locked rate).
*Architectural Requirement:* Your database must decouple the integer `price` from the `currency_code`. 
```json
{ "price": 10000, "currency": "USD" } // vs { "price": 9500, "currency": "EUR" }
```
You must maintain specific Price Books for specific regions rather than relying on live FX conversions, allowing you to set psychologically attractive prices (e.g., €99.00 instead of €97.34).

---

## AI Prompt — Architect Your Payment Infrastructure

```prompt
I am designing the payment architecture for a production e-commerce store.

Business Profile:
- Business Model: [B2C / B2B / Hybrid]
- Average Order Value: [$XXX]
- Primary Markets: [e.g., US, UK, EU, Australia]
- Payment Processor: [e.g., Stripe / Adyen / Braintree]
- Subscription / Recurring Billing: [Yes / No]

Act as a Principal Fintech Architect:
1. Outline the exact payment methods I must enable to maximize conversion in my specific primary markets.
2. Provide the technical architecture for ensuring SCA/3D Secure compliance for my European customers.
3. Write the pseudocode for an ultra-resilient Webhook Handler that guarantees idempotency and prevents double-fulfillment.
4. If I am handling B2B customers, explain the architecture required to support Net 30 invoices and PO numbers at checkout.
5. Detail how my database should store prices and currencies to support Native Multi-Currency seamlessly.
```

---

## Payment Architecture Checklist

- [ ] Localized payment methods (APMs) mapped to target geographic markets
- [ ] 3D Secure / SCA logic implemented to handle `requires_action` states
- [ ] Idempotency keys explicitly passed on all mutation requests to the payment processor
- [ ] Webhook handlers verified for idempotency (safely discarding duplicate events)
- [ ] Native multi-currency strategy defined (Price Books vs. Live FX conversion)
- [ ] B2B payment flows (Net Terms / POs) architected if serving enterprise customers
- [ ] Financial reconciliation data (transaction IDs, exact tax collected, processing fees) stored securely on the Order record
