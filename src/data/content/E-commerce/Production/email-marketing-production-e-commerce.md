---
title: Email Marketing
slug: email-marketing
phase: Phase 6 Growth
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Automated Lifecycle Workflows

**Estimated Time:** 60 Minutes

A beginner exports a CSV of 1,000 emails from their database, uploads it to Mailchimp, and sends a single "15% OFF EVERYTHING" blast on Friday morning. 

200 people open it, 5 people buy something, and 100 people click "Unsubscribe" because the email was utterly irrelevant to them. The beginner just burned their list.

In a production environment, email marketing is not about "blasts." It is about **Algorithmic Lifecycle Flows**. You must engineer an **Event-Driven Architecture** that triggers highly personalized emails based on exact mathematical conditions.

---

## 1. The Event-Driven Marketing Bus (Klaviyo)

Your Next.js database should not be sending marketing emails. You must integrate a dedicated E-commerce CRM like **Klaviyo** (or Customer.io). 

**The Production Solution:**
Instead of exporting CSVs, your Next.js API pushes behavioral events in real-time into Klaviyo's API.

```typescript
// components/AddToCartButton.tsx
'use client';
import { klaviyo } from '@/lib/klaviyo'; // Mock client wrapper

export function AddToCartButton({ product, userEmail }) {
  const handleAdd = () => {
    // 1. Fire the mathematical intent event to the CRM
    if (userEmail) {
      klaviyo.track('Added to Cart', {
        $email: userEmail,
        ProductName: product.name,
        ProductID: product.id,
        ItemPrice: product.price,
        ImageURL: product.image
      });
    }
    
    // 2. Add to actual cart state
    addToCart(product);
  };
  return <button onClick={handleAdd}>Add to Cart</button>;
}
```

By pushing these exact variables (`ProductName`, `ImageURL`), Klaviyo can dynamically render an email that looks like: *"Hey John, you left the [Blue Linen Shirt] in your cart. Here is a picture of it. Click here to buy it."*

## 2. The 3 Core Automated Flows

Once the events are wired up, you must configure 3 mathematical workflows inside Klaviyo. These flows run 24/7/365, generating revenue while you sleep.

### Flow A: The Abandoned Cart Recovery (Revenue Rescue)
If a user fires `Added to Cart`, but does not fire `Placed Order` within 4 hours, Klaviyo intercepts the delta.
- **Hour 4:** Email 1 - *"Did you forget something?"* (Standard reminder, no discount).
- **Hour 24:** Email 2 - *"Your cart is expiring. Here is 10% off."* (Incentive).
- **Hour 48:** Email 3 - *"Last chance to use your 10% off code."* (Urgency).

*Note: You never offer a discount in the first email, because 30% of users will return naturally. Giving them a discount immediately destroys your mathematical margin.*

### Flow B: The Post-Purchase Nurture (Buyer Remorse Defense)
When a user fires `Placed Order`, they experience a massive dopamine spike, followed immediately by "Buyer's Remorse" (anxiety that they wasted their money).
- **Day 1:** Email 1 - *"Your order is confirmed. Here is a video of how we handcraft our products."* (Validates their purchase, reducing chargebacks).
- **Day 3:** Email 2 - *"Your package shipped. Here is how to style your new shirt."* (Builds excitement).
- **Day 14:** Email 3 - *"Review your shirt and get $5 off your next order."* (Drives UGC and repeat purchases).

### Flow C: The Win-Back Flow (Churn Prevention)
If a user fires `Placed Order`, but does not fire `Placed Order` again for 90 days, the mathematical algorithm flags them as a "Churn Risk".
- **Day 90:** Email 1 - *"We miss you. Here is 20% off your next order."*
- **Day 95:** Email 2 - *"Your 20% off code expires tomorrow."*

## 3. Deliverability Engineering (DKIM / DMARC)

If you configure all these flows, but your emails go to the Gmail Spam folder, your revenue is $0.

**The Production Solution:**
You must engineer your DNS records to mathematically prove to Google that Klaviyo is legally authorized to send emails on your behalf.

1. **SPF (Sender Policy Framework):** A TXT record listing Klaviyo's IP addresses.
2. **DKIM (DomainKeys Identified Mail):** A cryptographic signature injected into the header of every email.
3. **DMARC (Domain-based Message Authentication, Reporting, and Conformance):** A strict policy telling Google: *"If an email claims to be from @mycompany.com, but lacks the DKIM signature, delete it immediately."*

Without these 3 records, Google's algorithmic filters will instantly flag your marketing emails as Phishing.

---

## ✅ Email Marketing Engineering Checklist

- [ ] Ban manual CSV exports. Engineer real-time API event tracking (`Added to Cart`, `Placed Order`) from Next.js directly into Klaviyo.
- [ ] Configure the 3 Core Automated Flows (Abandoned Cart, Post-Purchase Nurture, Win-Back) to generate mathematical recurring revenue with zero human intervention.
- [ ] Enforce strict margin protection: Never offer a discount in the first Abandoned Cart email.
- [ ] Execute a DNS audit to inject SPF, DKIM, and strict DMARC policies to mathematically guarantee 99% inbox deliverability.
- [ ] Use the AI prompt below to generate the rigorous event architecture.

---

## AI Prompt — Engineer the Klaviyo Integration

Copy this prompt into your AI to have it generate the mathematical tracking layer.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Growth Engineer. We are engineering our Server-Side Klaviyo API integration.

I need you to generate the following strict backend implementations:

**1. The Server-Side Abandoned Cart Trigger:**
Write the Next.js API Route (`/api/cart/add`).
- Assume we add the item to our PostgreSQL database.
- Immediately after, execute a `fetch` request to the `Klaviyo Track API`.
- The payload MUST include the exact schema required for dynamic email injection: `$email`, `ItemNames` (array), `CheckoutURL` (a mocked link to restore their cart), and `$value` (total cart value).

**2. The DNS Deliverability Audit:**
Provide a Markdown checklist detailing the exact DNS TXT records required for SPF, DKIM, and DMARC. Explain mathematically why a DMARC policy of `p=reject` is the ultimate defense against spoofing, but why it must be set to `p=none` during the initial warmup phase to prevent accidental blacklisting.
````

**Next: Loyalty Programs & Retention Engineering →**
