---
title: Legal Documents
slug: legal-documents
phase: Phase 5
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Legal Documents & Corporate Structure

## Beyond the PDF

In a personal project, a "legal document" is a PDF you upload to a `/terms` route. In a production marketplace, legal documents are the output of a corporate structure designed to shield your personal assets from catastrophic liability.

If you are facilitating transactions between strangers, someone will eventually get hurt, scammed, or sued. If you are operating as a Sole Proprietorship (without a corporate shield), the aggrieved party can sue you personally and take your house. 

---

## Corporate Structuring (The Liability Shield)

Before you launch a production marketplace, you must incorporate.

### LLC vs. C-Corp
* **LLC (Limited Liability Company):** Best if you are bootstrapping. It is cheap to maintain, passes profits directly to your personal tax return, and provides the essential "corporate veil" that shields your personal assets from business lawsuits.
* **C-Corp (Delaware C-Corporation):** Mandatory if you plan to raise Venture Capital (VC). Investors will not invest in an LLC. A C-Corp allows you to issue equity (stock options) to early employees.

**The Production Shortcut:**
Use **Stripe Atlas** or **Clerky**. For a flat fee, they will form a Delaware C-Corp, issue your founder shares, register your EIN with the IRS, and open a corporate bank account (Mercury/Brex) in days. 

---

## The Core Documents

Once incorporated, you must execute the following documents before allowing a single transaction.

### 1. Independent Contractor Agreements (1099)
If you hire a freelance developer or designer to help build the marketplace, you must sign a **Proprietary Information and Inventions Assignment Agreement (PIIAA)**. 
* **Why it matters:** If they write code for you without signing this, *they legally own the copyright to the code*, not your company. When you try to sell the company later, the acquisition will fail during Due Diligence.

### 2. Trademark Registration (USPTO)
Before you spend $50,000 on marketing, ensure you actually own your marketplace's name.
* **The Risk:** If you launch "GearSwap" and it turns out someone else already trademarked it, they will send a Cease & Desist, forcing you to rebrand, change all your URLs (destroying your SEO), and lose your brand equity.
* **The Action:** File a standard Word Mark with the USPTO or your local trademark office early.

### 3. Mutual Non-Disclosure Agreements (NDAs)
If you are partnering with large enterprise sellers (e.g., onboarding a major car dealership to your auto marketplace), they will require an NDA before sharing their inventory API or pricing data. Use standard templates like the **Y Combinator NDA**.

---

## Do's and Don'ts of Production Legal Structuring

- **DO keep your personal and business money strictly separated.** If you pay for the company's AWS bill with your personal credit card, a judge can "pierce the corporate veil" and rule that your LLC is a sham, exposing your personal assets to lawsuits.
- **DON'T try to play lawyer.** Use standardized, battle-tested legal templates from Clerky or Cooley GO for standard corporate actions. Hire a real lawyer for anything custom.
- **DO secure business insurance.** An LLC shields your personal assets, but **General Liability** and **Cyber Liability Insurance** protect the company's assets from being wiped out by a single data breach or lawsuit.
- **DON'T ignore state nexus taxes.** If you have sellers in California, you may be required to collect and remit California Sales Tax, even if your company is in Delaware. Use tools like Stripe Tax or Avalara to automate this.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Legal Requirements Checklist:**

````prompt
Act as a Startup Corporate Attorney. I am launching a two-sided marketplace connecting freelance photographers with event planners in the US. Provide a checklist of the exact corporate structuring steps, tax registrations, and baseline legal documents required to operate legally and shield my personal assets. Specify the difference between state-level registration and federal requirements.
````

> [!TIP]
> **Prompt 2 — Evaluating SaaS Legal Tools:**

````prompt
Compare Stripe Atlas, Clerky, and LegalZoom for incorporating a Delaware C-Corp for a venture-backed marketplace. Output a Markdown table comparing: Upfront Costs, Ongoing Maintenance Fees, Post-Incorporation Setup (Bank accounts, EIN), and suitability for issuing Employee Stock Options.
````

---

## Validating What AI Generates

- **Check for localized legal advice:** AI models are heavily biased toward US law (Delaware C-Corps). If you are operating in the UK or EU, explicitly instruct the AI to use local corporate law (e.g., UK Limited Companies, Companies House).
- **Verify tax claims:** Never trust AI to calculate specific sales tax thresholds (Economic Nexus). These laws change monthly. Always rely on a specialized tax API (Avalara/Stripe Tax) for production math.

---

## Implementation Checklist

- [ ] Incorporated the marketplace as an LLC or C-Corp to establish a corporate liability shield.
- [ ] Opened a dedicated Business Bank Account; strictly separated personal and corporate finances.
- [ ] Executed Proprietary Information (PIIAA) agreements with all contractors and developers.
- [ ] Initiated Trademark searches/registration for the marketplace name and logo.
- [ ] Integrated a Sales Tax automation tool (Stripe Tax/Avalara) to handle multi-state/multi-country tax remittance.

---

## What's Next

Next: **Legal Policies** — The corporate structure is secure. Now we must define the operational rules. We will architect strict Trust & Safety policies, DMCA takedown procedures, and automated moderation to keep the platform clean.
