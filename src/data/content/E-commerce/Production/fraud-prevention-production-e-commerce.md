---
title: Fraud Prevention
slug: fraud-prevention
phase: Phase 4
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Fraud Prevention

In e-commerce, fraud is a constant, ambient tax on your business. 

If a fraudster uses a stolen credit card to buy a $1,000 laptop from your store, the real cardholder will eventually notice and issue a chargeback. You lose the $1,000 laptop, you lose the $1,000 cash, you pay a $15 chargeback fee, and your merchant reputation drops. If your chargeback rate exceeds 1%, payment networks (Visa/Mastercard) will terminate your account, effectively killing your business.

Fraud prevention in production requires automated scoring, manual review gates, and device fingerprinting.

---

## 1. Automated Fraud Scoring (The Gateway)

You cannot manually review every order. You must rely on machine learning models built into the payment gateway.

**The Implementation:**
Use tools like **Stripe Radar**, **Signifyd**, or **Sift**.
- These tools analyze millions of data points across their network (e.g., has this specific IP address committed fraud on *another* Shopify store recently?).
- They assign a Risk Score (0 to 100) to every transaction in milliseconds.
- **Rules Configuration:**
  - `Block` if risk score > 75 (Payment is instantly declined).
  - `Manual Review` if risk score is between 65 and 75 (Payment is authorized, but funds are held until a human approves).
  - `Allow` if risk score < 65.

---

## 2. Velocity Checks (Behavioral Fraud)

Fraudsters do not steal one card at a time; they steal batches. If they find that your store is an easy target, they will try to push through 50 orders in 10 minutes.

**The Implementation:**
You must configure velocity rules within your fraud engine.
- Block the payment if the same IP address attempts more than 3 distinct credit cards in 1 hour.
- Block the payment if the same Customer Account attempts to place more than 5 high-value orders in a 24-hour window.
- Block the payment if the same physical shipping address is used across 5 different billing names.

---

## 3. Device Fingerprinting

A sophisticated fraudster will use a VPN to mask their IP address. To defeat this, you must track the physical device.

**The Implementation:**
- Embed a device fingerprinting script (provided by your fraud tool, like Stripe.js) on your checkout page.
- This script analyzes the browser's user agent, screen resolution, installed fonts, and hardware concurrency to generate a unique hash for that specific laptop or phone.
- If a fraudster switches their IP address from New York to London using a VPN, the device fingerprint remains exactly the same, allowing the fraud engine to instantly flag the transaction.

---

## 4. The Manual Review Workflow

When an order falls into the "Manual Review" bucket, your fulfillment flow must pause.

**The Architecture:**
1. Stripe flags the `PaymentIntent` for manual review.
2. The Stripe Webhook fires. Your backend sets the Order Status to `HOLD_FOR_FRAUD`.
3. The inventory is decremented, but the order is **not** pushed to the warehouse 3PL API.
4. A customer support agent logs into the admin dashboard, views the order, and checks for red flags:
   - Does the shipping address (New York) match the IP address location (Nigeria)?
   - Is the billing zip code completely different from the shipping zip code?
5. The agent clicks "Approve". Your backend captures the funds, updates the status to `UNFULFILLED`, and pushes the order to the warehouse.
6. If the agent clicks "Reject", your backend cancels the order, voids the authorization, and restores the inventory.

---

## AI Prompt — Architect Your Fraud Defenses

```prompt
I am implementing the fraud prevention architecture for a production e-commerce store to keep my chargeback rate near zero.

Tech Stack:
- Payment Gateway: [e.g., Stripe]
- Fraud Engine: [e.g., Stripe Radar / Signifyd]
- Backend: [e.g., Postgres / Node.js]

Act as a Principal Risk Engineering Manager:
1. Outline the specific Stripe Radar custom rules I should configure to automatically block high-risk velocity attacks (e.g., multiple card attempts from a single IP).
2. Explain how to implement Device Fingerprinting on the React checkout page to ensure the fraud engine receives accurate hardware signatures.
3. Write the exact backend database state machine transition logic required to place an order on `HOLD_FOR_FRAUD` pending manual review, explicitly preventing it from being routed to the warehouse API.
4. Define the 3 primary data points a customer support agent should look for when manually reviewing a flagged order.
```

---

## Fraud Prevention Checklist

- [ ] Automated Machine Learning fraud scoring (e.g., Stripe Radar) enabled on all transactions
- [ ] Strict threshold rules configured to instantly block high-risk scores
- [ ] Velocity checks implemented to block multiple card attempts from single IPs or accounts
- [ ] Device Fingerprinting scripts embedded in the checkout flow to track hardware signatures beyond IP addresses
- [ ] Manual Review workflow integrated into the Order State Machine to pause fulfillment on suspicious orders
- [ ] Alerting configured to notify the Risk Team when an order enters the manual review queue
