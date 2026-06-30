---
title: Refund Policy
slug: refund-policy
phase: Phase 5
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# Refund Policy

In e-commerce, the Refund Policy is not a customer service guideline—it is a financial and operational contract. 

If your backend engineers, support staff, and legal terms do not share the exact same understanding of your Refund Policy, the business will bleed money through algorithmic errors (e.g., refunding shipping costs when they are non-refundable) or customer chargebacks.

---

## 1. Financial Engineering (The Proration Problem)

If a user buys 3 shirts for $30 each and uses a "20% off total order" discount code, they paid $72.00 total.
If they return 1 shirt, how much do you refund them?

**The Anti-Pattern:** A naive codebase sees the item price is $30 and executes a $30.00 refund via Stripe. The business just lost $6.00 in margin because the discount wasn't factored into the partial refund.

**The Production Rule:**
Your Refund Policy must strictly define how discounts and taxes are prorated.
- Your backend API must algorithmically calculate the *exact weighted value* of the returned SKU relative to the discounted order total.
- Your API must also query the Tax Engine (e.g., Stripe Tax) to calculate the exact fractional amount of sales tax to refund for that specific line item.

---

## 2. Shipping Cost Liability

Shipping is a hard cost to the business. If FedEx charges you $10 to ship a box, and you refund the customer the $10 shipping fee when they return the item, you have lost $10 cash on a canceled sale.

**The Implementation:**
Your Refund Policy must explicitly state whether original shipping fees are refundable.
- **Standard Practice:** "Original shipping charges are non-refundable."
- Your backend API must explicitly separate `item_total` from `shipping_total`.
- The UI in your Admin Dashboard must have a toggle: `[ ] Refund Shipping Cost`. By default, this must be unchecked to protect business margins.

---

## 3. The Stripe Refund Flow (Idempotency)

When a customer service agent clicks "Refund" in the dashboard, the backend makes a `POST /v1/refunds` call to Stripe.

**The Danger:** If the internet connection drops and the agent clicks "Refund" again, your server might send a second API call. You just refunded the customer twice for the same item.

**The Engineering Fix:**
Refunds must be Idempotent.
- Generate a unique `UUID` for every refund attempt.
- Send this as the `Idempotency-Key` header in the Stripe API request.
- Stripe will recognize the duplicate key and block the second refund, ensuring absolute financial safety regardless of how many times the UI button is mashed.

---

## 4. Policy Visibility (Defeating Chargebacks)

If a customer is angry that you didn't refund their shipping fee, they will initiate a chargeback with their credit card company.

Visa/Mastercard will ask you for proof that the customer agreed to the policy. If the Refund Policy was hidden in tiny text at the bottom of the homepage, Visa will rule in favor of the customer.

**The Implementation:**
- The Refund Policy MUST be linked directly inside the checkout flow, right next to the "Submit Order" button.
- For high-risk items (e.g., "Final Sale - No Refunds"), you must implement a hard UI block: a required checkbox stating "I understand this item is final sale and cannot be refunded" before the payment intent can be generated.

---

## AI Prompt — Architect Your Refund Operations

```prompt
I am defining the Refund Policy and backend architecture for a production e-commerce store.

Tech Stack:
- Backend: [e.g., Node.js]
- Payment Gateway: [e.g., Stripe]
- Tax Engine: [e.g., TaxJar]

Act as a Principal Financial Engineer:
1. Write the backend algorithm (TypeScript) to correctly calculate the prorated refund amount for a single returned item when a 15% order-level discount code was applied to the original purchase.
2. Outline the exact Stripe API request required to issue a partial refund, demonstrating the strict usage of an `Idempotency-Key` to prevent double-refunding.
3. Draft the legal text for the public-facing Refund Policy regarding "Original Shipping Costs" and "Final Sale Items" to ensure we win any related chargeback disputes.
4. Explain how the frontend React checkout should force active consent (checkboxes) for Final Sale items to satisfy Visa/Mastercard dispute evidence requirements.
```

---

## Refund Policy Checklist

- [ ] Financial algorithms implemented to accurately prorate order-level discounts during partial refunds
- [ ] Tax calculation engines integrated to calculate the exact fractional tax to refund per line item
- [ ] Idempotency Keys enforced on all payment gateway refund requests to prevent double-refunds
- [ ] Original shipping cost refund logic explicitly disabled by default in the Admin dashboard UI
- [ ] Legal Refund Policy drafted and prominently linked inside the checkout flow
- [ ] Mandatory "Active Consent" checkboxes implemented in UI for high-risk "Final Sale" items
