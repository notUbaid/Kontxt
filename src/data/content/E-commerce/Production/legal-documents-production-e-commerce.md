---
title: Legal Documents
slug: legal-documents
phase: Phase 5
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Legal Documents

At production scale, operating an e-commerce business without proper corporate structuring is a massive personal liability. If a customer is injured by a defective product you sold, and you are operating as a Sole Proprietorship, they can sue you for your personal assets (your house, your savings).

The foundation of production e-commerce is establishing a corporate veil and securing the necessary compliance documentation before processing a single dollar.

---

## 1. Corporate Structuring (LLC / C-Corp)

You must legally separate yourself from the store.

**The Implementation:**
In the US, this typically means forming a Limited Liability Company (LLC) or a C-Corporation (if you intend to raise venture capital).
- **Stripe Atlas or Clerky:** Use these automated services to file the articles of incorporation in a business-friendly state (like Delaware or Wyoming).
- **Employer Identification Number (EIN):** The IRS issues this tax ID to the corporation. You absolutely need an EIN to open a business bank account, register for wholesale distributor accounts, and pass Stripe's strict KYC (Know Your Customer) identity verification.

---

## 2. Supplier & Manufacturer Agreements

If you are white-labeling products or manufacturing custom goods, a verbal agreement with a factory overseas is incredibly dangerous.

**The Production Standard:**
You must have legally binding contracts with your supply chain.
- **Manufacturing Service Agreement (MSA):** Defines lead times, quality control standards (e.g., maximum defect rate), and payment terms (e.g., Net 30).
- **Non-Disclosure / Non-Compete (NDA/NNN):** Crucial if you are manufacturing custom designs in China. An NNN (Non-Disclosure, Non-Use, Non-Circumvention) contract prevents the factory from legally stealing your CAD designs and selling your exact product directly to consumers on AliExpress.

---

## 3. Product Liability Insurance

A Terms of Service agreement cannot protect you from gross negligence or physical harm caused by a product.

- If you sell a lithium-ion battery that overheats and causes a fire, the resulting lawsuit will bankrupt an uninsured corporation.
- **The Requirement:** You must secure a comprehensive **General Liability and Product Liability Insurance** policy.
- **Retail Constraints:** If you ever want to sell your products wholesale to Target, Walmart, or Sephora, their vendor contracts will explicitly require you to carry a minimum of $1,000,000 to $5,000,000 in product liability coverage.

---

## 4. ADA Compliance (Accessibility Lawsuits)

The Americans with Disabilities Act (ADA) applies to websites. There is a massive industry of "drive-by lawsuits" where law firms write scripts to scan e-commerce sites for accessibility failures and automatically serve the company with a $50,000 lawsuit.

**The Defense:**
You must legally demonstrate an effort to comply with WCAG (Web Content Accessibility Guidelines) 2.1 AA standards.
- **Engineering:** Ensure all Next.js images have `alt` tags, all forms have `<label>` associations, and the checkout is fully navigable via keyboard only.
- **Legal:** Publish an "Accessibility Statement" in your footer, detailing your commitment to ADA compliance and providing a contact email for users who require assistance accessing the site.

---

## AI Prompt — Establish Your Legal Foundation

```prompt
I am establishing the corporate and legal foundation for a production e-commerce store.

Business Context:
- Products: [e.g., Electronics / Cosmetics / Apparel]
- Supply Chain: [e.g., Custom Manufacturing in Asia]
- Corporate Structure: [e.g., Delaware LLC]

Act as a Principal Corporate Attorney:
1. Explain the specific protections a Delaware LLC provides for an e-commerce founder, and why securing an EIN is mandatory before integrating Stripe.
2. Outline the critical clauses that must be included in a Chinese NNN (Non-Disclosure, Non-Use, Non-Circumvention) agreement to prevent a manufacturer from stealing my product designs.
3. Detail the specific Product Liability Insurance coverage required for my product category, highlighting the risks of selling [Electronics/Cosmetics].
4. Provide the exact wording for an "Accessibility Statement" page to help defend the business against ADA compliance lawsuits.
```

---

## Legal Documents Checklist

- [ ] Corporate entity (LLC/C-Corp) officially formed to establish a corporate veil of protection
- [ ] EIN (Employer Identification Number) secured for banking, taxes, and Stripe KYC
- [ ] Manufacturing Agreements (MSA and NNNs) signed with all primary suppliers to protect IP
- [ ] General and Product Liability Insurance policy secured (minimum $1M coverage)
- [ ] Accessibility Statement drafted and linked in the footer to deter ADA compliance lawsuits
- [ ] Website audited for WCAG 2.1 AA compliance (alt tags, keyboard navigation, contrast ratios)
