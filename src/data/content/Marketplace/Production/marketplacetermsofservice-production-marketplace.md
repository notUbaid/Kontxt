---
title: Terms of Service
slug: terms-of-service
phase: Phase 5
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Terms of Service

## Architecting the Legal Shield

In a marketplace, you are connecting strangers and facilitating financial transactions. Eventually, a seller will scam a buyer, a buyer will destroy a rented item, or a user will upload copyrighted material. 

When this happens, the aggrieved party will attempt to sue *you* (the platform), because you have more money than the random user who wronged them. Your **Terms of Service (ToS)** is the legal shield that prevents those lawsuits from destroying your company.

---

## The Platform Intermediary Defense

The most critical clause in a marketplace ToS is the assertion that you are an **Intermediary**, not a party to the transaction.

* **Section 230 (US) / DSA (Europe):** You must explicitly state that you are a neutral platform hosting third-party content. You do not own, inspect, or guarantee the quality of the items sold. 
* If a buyer purchases a defective bicycle from a seller, the ToS must legally bind them to resolve the dispute with the seller, explicitly releasing your platform from all liability.

---

## Mandatory Arbitration and Class Action Waivers

If 10,000 sellers decide they don't like a new fee you introduced, you do not want to face a Class Action Lawsuit in a jury trial.

**The Production Standard:**
Your ToS must include:
1. **Mandatory Binding Arbitration:** Users agree that any dispute with your platform must be resolved by a private arbitrator (e.g., the AAA), not in a public court of law.
2. **Class Action Waiver:** Users waive their right to join together in a class action lawsuit against you. They must arbitrate their claims individually.

*(Note: Some jurisdictions, like the EU, heavily restrict these clauses for consumers, which is why you need a lawyer.)*

---

## User-Generated Content (UGC) and DMCA

When a seller uploads photos of their product, who owns those photos?
* **The Rule:** The seller retains copyright, but your ToS must require them to grant you a **worldwide, royalty-free, perpetual license** to display, modify, and distribute that content. Without this, you legally cannot display their listing on your homepage.

**DMCA Safe Harbor:**
If a seller uploads a copyrighted image they stole from another website, the copyright holder will send you a Cease and Desist.
* To protect yourself from liability, you must register a DMCA Agent with the US Copyright Office and publish a clear DMCA Takedown Policy in your ToS, explaining how copyright holders can request removals.

---

## Suspension, Fees, and Funds Holds

You must give yourself absolute, unquestionable authority over the platform's economics and access.

* **Right to Terminate:** You reserve the right to suspend or ban any user at any time, for any reason, without prior notice.
* **Funds Holds:** You reserve the right to freeze a seller's payout balance for up to 180 days if you suspect fraud, high chargeback risks, or Terms violations (mirroring Stripe's own terms).
* **Fee Changes:** You reserve the right to change the marketplace commission fees at any time with 30 days notice.

---

## Do's and Don'ts of Production ToS

- **DO require an active "Click-to-Accept".** A link to the ToS at the bottom of the footer ("Browsewrap") is legally unenforceable. You must force the user to click a checkbox saying "I agree to the Terms of Service" during signup ("Clickwrap").
- **DON'T copy-paste a competitor's ToS.** Copying Airbnb's ToS is copyright infringement, and it will include clauses that have nothing to do with your specific business model.
- **DO include a Severability clause.** This states that if a judge finds one specific line of your ToS illegal, the rest of the document remains entirely valid and enforceable.
- **DON'T bury the arbitration clause.** Courts require mandatory arbitration clauses to be conspicuous. Put it in bold, all-caps text near the very top of the document.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Intermediary Release Clause:**

````prompt
Act as a Corporate Attorney specializing in Marketplaces. Draft the "Release of Liability" and "Platform Role" sections for a marketplace Terms of Service. It must explicitly state that the platform is a third-party intermediary, does not guarantee the quality or safety of listed items, and that the user entirely releases the platform from any claims or damages arising from disputes with other users.
````

> [!TIP]
> **Prompt 2 — Clickwrap Implementation:**

````prompt
Act as a Frontend Developer. Write the React/Next.js code for a Signup Form that implements a legally enforceable "Clickwrap" agreement. It must include a mandatory checkbox for the Terms of Service, and the submit button must remain disabled until the checkbox is checked. Explain how to log the exact timestamp and IP address of this acceptance in the database for legal auditing.
````

---

## Validating What AI Generates

- **Check for absolute guarantees:** If AI drafts a clause saying "We guarantee a safe environment for all users," delete it immediately. You cannot guarantee safety, and saying so creates massive legal liability.
- **Verify Intellectual Property rights:** Ensure the AI includes a license grant for User-Generated Content. If it says "The platform owns all content," it is legally incorrect (users retain copyright) and will anger your sellers.

---

## Implementation Checklist

- [ ] Drafted a comprehensive Terms of Service tailored to a marketplace (Platform Intermediary, Liability Limitation).
- [ ] Included Mandatory Arbitration and Class Action Waivers (consult local laws).
- [ ] Registered a DMCA Agent and included a clear Copyright Takedown policy.
- [ ] Secured a perpetual license to display and distribute User-Generated Content.
- [ ] Enforced an explicit "Clickwrap" agreement (checkbox) during the user registration flow, logging the timestamp of acceptance.

---

## What's Next

Next: **Beta Testing** — The legal shields are up. It is time to let real humans touch the platform. We will architect a structured Beta Testing program using feature flags, synthetic load testing, and A/B analytics to safely validate the product before a public launch.
