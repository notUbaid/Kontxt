---
title: Taxes Setup
slug: taxes-setup
phase: Phase 5
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Taxes Setup

In e-commerce, tax compliance is a strict liability. If you undercharge for sales tax, the government does not care about your API bug; they will audit you and force you to pay the difference out of your own profit margins.

At scale, you cannot manage tax rates using static spreadsheets. There are over 11,000 distinct tax jurisdictions in the United States alone. Tax rates change monthly, and taxability depends entirely on *what* you are selling and *where* it is going.

---

## 1. Nexus and Registration Tracking

You are only required to collect sales tax in states/countries where you have "Nexus" (a significant business presence).

**Types of Nexus:**
1. **Physical Nexus:** You have an office, a warehouse, or an employee in that state.
2. **Economic Nexus:** You exceed a certain sales threshold (e.g., $100,000 in revenue or 200 transactions) in a specific state.

**The Implementation:**
You must integrate a tax engine (e.g., **TaxJar**, **Stripe Tax**, or **Avalara**). These tools actively monitor your transaction volume across all states. When you cross the $100,000 threshold in Texas, the software automatically alerts your finance team that you must legally register for a Texas Sales Tax Permit before you can begin collecting tax there.

---

## 2. Product Taxability Codes (The Catalog Burden)

Not all products are taxed equally.
- In New York, clothing under $110 is entirely exempt from state sales tax.
- In Texas, digital downloads are taxed at 80% of the normal rate.
- In the UK, children's clothing is subject to 0% VAT, while adult clothing is 20%.

**The Implementation:**
If you pass a generic `taxable: true` boolean to the Tax API, you will illegally overcharge New York residents for a $50 t-shirt.
1. Every product in your database must be assigned an official **Tax Code** (e.g., `20010` for general clothing).
2. During checkout, your backend must pass the Line Item Tax Code + the Destination Address + your Nexus status to the Tax API. The API resolves the complex state laws and returns the exact cent value to charge.

---

## 3. Shipping Taxability

Is shipping taxable? The answer is: It depends entirely on the state.

If you charge $10 for shipping, some states require you to apply the 8% sales tax to the item *and* the shipping cost. Other states only tax the item.

**The Checkout Architecture:**
Your checkout state machine must be strictly ordered:
1. Validate Address.
2. Calculate Shipping.
3. **Pass BOTH Item Cost AND Shipping Cost to the Tax API.**
If your frontend calculates tax before the user selects expedited shipping, your final total is legally invalid.

---

## 4. Exemption Certificates (B2B E-Commerce)

If you sell B2B (Wholesale), your buyers will likely purchase goods for resale. Resellers do not pay sales tax.

**The Implementation:**
You cannot simply let users check a box saying "I am tax exempt." You are legally required to collect and verify their official state Exemption Certificate.
- Use a tool like Avalara CertCapture.
- The user uploads a PDF of their certificate in their account portal.
- Once the document is verified, your database flags their `User` record as `tax_exempt = true`.
- Your backend passes this flag to the Tax API during checkout, which legally zeroes out the tax obligation for that specific transaction.

---

## AI Prompt — Architect Your Tax Infrastructure

```prompt
I am implementing the automated tax infrastructure for a production e-commerce store operating globally.

Tech Stack:
- Backend: [e.g., Node.js / Serverless]
- Database: [e.g., Postgres]
- Tax Engine: [e.g., Stripe Tax / TaxJar]

Act as a Principal Financial Engineer:
1. Explain how to architect the database schema to assign specific Taxability Codes to product variants, ensuring compliance with state-specific exemptions (e.g., NY clothing laws).
2. Write the exact Node.js checkout flow required to pass the Item Total, the Shipping Cost, and the Origin/Destination addresses to the Tax API.
3. Detail the technical workflow for managing B2B Tax Exemptions, including how to store verified certificates and bypass the tax calculation at checkout for authenticated wholesale buyers.
4. Explain how Economic Nexus monitoring works programmatically: how does the system know when we cross a $100K threshold in a new state?
```

---

## Taxes Setup Checklist

- [ ] Automated Tax Engine (Stripe Tax/TaxJar/Avalara) integrated at the checkout step
- [ ] Product Taxability Codes assigned to all SKUs in the database to handle item-specific exemptions
- [ ] Checkout state machine strictly ordered to calculate Shipping costs *before* calculating Tax
- [ ] Economic Nexus monitoring enabled to alert the finance team when thresholds are breached in new jurisdictions
- [ ] Exemption Certificate management workflow implemented for B2B/Wholesale accounts
- [ ] API timeouts and graceful degradation fallbacks configured for the Tax API to prevent checkout blockages
