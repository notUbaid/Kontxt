---
title: Privacy Policy
slug: privacy-policy
phase: Phase 5
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# Privacy Policy

In a production e-commerce business, your Privacy Policy is not a boilerplate document you copy-paste from a free generator. It is a legally binding contract that dictates how you manage customer data, and it is actively enforced by regulatory bodies.

If you operate globally, you must comply with strict frameworks like the GDPR (Europe), CCPA/CPRA (California), and LGPD (Brazil). Fines for non-compliance can reach €20 million or 4% of your global revenue.

---

## 1. Data Mapping & Disclosure

You cannot write an accurate Privacy Policy until you know exactly what data your systems are touching.

**The Implementation:**
You must map and explicitly disclose:
- **What you collect:** Names, emails, physical addresses, IP addresses, browsing behavior, and payment tokens.
- **Why you collect it:** Order fulfillment, fraud prevention, marketing, or analytics.
- **Who you share it with:** You must list the categories of third-party processors. (e.g., "We share your data with payment processors like Stripe, logistics partners like FedEx, and marketing platforms like Klaviyo").
- **How long you keep it:** You cannot keep data forever. You must define a retention schedule (e.g., "We retain order histories for 7 years to comply with IRS tax laws, and marketing data for 2 years after last engagement").

---

## 2. Cookie Consent & Data Governance

A Privacy Policy is meaningless if your website violates it the millisecond a user loads the page.

**The Engineering Constraint:**
If your Privacy Policy states that users can opt-out of tracking, your Next.js frontend must actually enforce that.
- You must implement a strict Cookie Consent Manager (e.g., OneTrust, Cookiebot, or Ketch).
- **The Rule:** The Facebook Pixel, Google Analytics, and Klaviyo scripts **cannot** load until the user explicitly clicks "Accept" (if they are in the EU or UK). Loading them by default violates GDPR.

---

## 3. Data Subject Access Requests (DSARs)

Under GDPR and CCPA, customers have the legal right to ask for a copy of all their data, or request that you delete them entirely (The Right to be Forgotten).

**The Operational Implementation:**
Your Privacy Policy must include an explicit contact method (e.g., `privacy@yourstore.com`) for submitting DSARs.
- When a request is received, you legally have 30 to 45 days to comply.
- **Engineering Reality:** Deleting a user is complex in e-commerce. You must delete them from your Postgres DB, Klaviyo, Zendesk, and Algolia. However, you *must not* delete their financial transaction history in Stripe, as financial compliance laws override the Right to be Forgotten.

---

## 4. International Data Transfers

If you are a US company selling to EU citizens, you are transferring their data out of the EU.

- You must state the legal mechanism you use for this transfer (e.g., Standard Contractual Clauses (SCCs) or the EU-US Data Privacy Framework).
- If your database is hosted on AWS in `us-east-1`, your European customers' PII is crossing borders, and your policy must declare this.

---

## AI Prompt — Draft Your Production Privacy Policy

```prompt
I am drafting the Privacy Policy for a production e-commerce store operating internationally.

Business Context:
- Tech Stack: [e.g., Next.js, Postgres, Stripe, Klaviyo, Google Analytics]
- Target Markets: [e.g., US, Canada, EU, UK]

Act as a Principal Privacy Attorney:
1. Generate the foundational structure for a GDPR and CCPA-compliant Privacy Policy tailored to an e-commerce data flow.
2. Draft the specific disclosure clause that explains how we use Stripe for payment processing and why we do not directly store credit card numbers.
3. Write the exact instructions a user must follow to submit a Data Subject Access Request (DSAR) or request deletion of their account.
4. Detail the legal nuance of "The Right to be Forgotten" as it applies to an e-commerce order: explain why we must delete their marketing profile, but are legally required to retain their tax/purchase history for 7 years.
```

---

## Privacy Policy Checklist

- [ ] Complete data mapping conducted to identify all third-party processors (Stripe, 3PLs, Klaviyo)
- [ ] CCPA and GDPR-compliant Privacy Policy drafted and linked in the global footer
- [ ] Cookie Consent Manager (OneTrust/Cookiebot) integrated to block tracking scripts prior to user consent
- [ ] Dedicated privacy email alias (`privacy@`) created to receive DSAR and deletion requests
- [ ] Internal engineering protocol established for safely executing a "Right to be Forgotten" database deletion without breaking financial audit logs
