---
title: Terms of Service
slug: terms-of-service
phase: Phase 5
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# Terms of Service

While the Privacy Policy protects the customer, the Terms of Service (ToS) protects *your business*. 

In production e-commerce, the ToS is your primary shield against fraudulent chargebacks, class-action lawsuits over pricing errors, and liability for supply chain delays. It is the legal contract the user agrees to the moment they click "Complete Purchase."

---

## 1. Limitation of Liability & Pricing Errors

A software bug in your Cart API might accidentally apply a 90% discount to your entire catalog. Without a strict ToS, customers might attempt to legally force you to honor the $5,000 laptops they bought for $500.

**The Implementation:**
Your ToS must include a "Right to Cancel" clause.
- It must explicitly state that an order confirmation email is *not* a legally binding contract to fulfill the order.
- It must state that the business reserves the right to cancel and refund any order at its sole discretion, specifically in the event of software glitches, pricing errors, or inventory shortages.

---

## 2. Chargeback and Dispute Policies

When a customer skips your support team and issues a chargeback with their bank, you lose the product, the money, and you pay a penalty fee.

**The Defense:**
You can submit your Terms of Service to Visa/Mastercard as evidence to win the dispute, *if* the terms are ironclad.
- **The Clause:** State clearly that customers must contact your support team to resolve issues *before* initiating a chargeback.
- **Delivery Liability:** State that once a package is marked as "Delivered" by the carrier (e.g., FedEx), the risk of loss (package theft/porch piracy) transfers to the customer. This helps you win "Item Not Received" chargebacks when the tracking shows it was delivered.

---

## 3. Subscription and Billing Terms (Recurring Revenue)

If you sell subscriptions (e.g., "Subscribe & Save 10%"), you are subject to strict auto-renewal laws, such as California's Automatic Renewal Law (ARL).

**The Implementation:**
- Your ToS must define the billing frequency, the exact cancellation process, and how proration is handled.
- **UI Requirement:** You cannot hide the ToS. In the checkout flow for a subscription product, the user must explicitly check an un-pre-checked box that says "I agree to the Subscription Terms of Service." If you fail to do this, courts will rule the contract invalid.

---

## 4. Dispute Resolution (Arbitration Clause)

E-commerce businesses are frequent targets for class-action lawsuits (e.g., ADA compliance lawsuits, or data breach lawsuits).

**The Defense:**
Include a Binding Arbitration Clause and a Class-Action Waiver.
- This legally mandates that if a customer wants to sue you, they must do so individually through private arbitration, rather than banding together with 10,000 other customers in a devastating class-action lawsuit.
- *Note:* In some jurisdictions (like the EU), mandatory arbitration clauses against consumers are unenforceable, so this must be tailored to your operating region.

---

## AI Prompt — Draft Your Production ToS

```prompt
I am drafting the Terms of Service for a production e-commerce store to protect the business from liability.

Business Context:
- Products: [e.g., Physical Goods / Subscriptions]
- Target Markets: [e.g., United States]

Act as a Principal Corporate Attorney:
1. Draft a strict "Limitation of Liability and Pricing Errors" clause that legally protects the business if a software bug causes products to be sold at the wrong price.
2. Write a "Transfer of Risk" clause that limits our liability for porch piracy once the shipping carrier marks a package as 'Delivered'.
3. Detail a Binding Arbitration Clause and Class-Action Waiver designed to protect the company from frivolous mass litigation.
4. For subscription products, outline the exact legal phrasing required to comply with California's Automatic Renewal Law (ARL).
```

---

## Terms of Service Checklist

- [ ] Limitation of Liability clause drafted to protect against software pricing glitches
- [ ] Transfer of Risk clause defined to protect against package theft / porch piracy claims
- [ ] Class-Action Waiver and Binding Arbitration clause included (if operating in the US)
- [ ] Subscription auto-renewal terms explicitly stated (if applicable)
- [ ] ToS linked prominently in the footer, and enforced via an explicit checkbox during checkout for high-risk purchases
