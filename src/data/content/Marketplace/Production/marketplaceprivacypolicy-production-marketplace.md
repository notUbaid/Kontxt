---
title: Privacy Policy
slug: privacy-policy
phase: Phase 5
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Privacy Policy & Compliance

## Beyond the Boilerplate

In a personal project, a generic Privacy Policy generator is sufficient. In a production marketplace, privacy is a heavily regulated legal domain. Mishandling data or writing an inaccurate policy exposes you to massive fines under the **GDPR (Europe)** or **CCPA (California)**.

If you claim "We do not sell your data" but use Meta Tracking Pixels to retarget your users on Facebook, you are legally "selling" data under CCPA, and you will be fined.

---

## The Regulatory Triad

To launch a production marketplace, you must comply with three core privacy pillars:

### 1. The Right to be Forgotten (Data Deletion)
Under GDPR and CCPA, users have the absolute right to demand you delete all their personal data within 30 days.
* **The Engineering Requirement:** You cannot just delete the `User` row in Postgres. You must build a script or API endpoint that cascades the deletion to Stripe (Customers), your Email Marketing tool (Mailchimp), and your Analytics provider (Mixpanel).
* **Financial Exception:** You are legally required to retain transaction records (Orders/Invoices) for tax purposes (usually 7 years). You must "anonymize" the user data rather than hard-deleting the financial records.

### 2. Cookie Consent & Tracking
You cannot track users or load analytics scripts before they explicitly consent.
* **The Engineering Requirement:** You must integrate a Consent Management Platform (CMP) like **OneTrust** or **Cookiebot**. If a user clicks "Reject All", your frontend must programmatically block Google Analytics, Meta Pixels, and PostHog from loading.

### 3. Data Processing Agreements (DPAs)
You are the "Data Controller". Stripe, Vercel, and Sentry are your "Data Processors".
* **The Legal Requirement:** You must sign DPAs with every third-party service you use, ensuring they comply with GDPR when handling your users' data. You must list these processors transparently in your Privacy Policy.

---

## What a Production Privacy Policy Must Declare

A production policy cannot use vague language. It must explicitly state:

- **What data is collected:** `Name`, `Email`, `Billing Address`, `IP Address`, `Device Fingerprint`.
- **How it is used:** "To facilitate transactions", "To detect fraud", "To comply with tax laws".
- **Who it is shared with (Sub-processors):** You must explicitly list Stripe (Payments), AWS (Hosting), SendGrid (Emails), etc.
- **Cross-Border Transfers:** If your servers are in the US but you serve EU customers, you must declare reliance on Standard Contractual Clauses (SCCs) or the EU-US Data Privacy Framework.
- **Automated Decision Making:** If you use Stripe Radar or Sift to automatically block fraudulent users, you must disclose that you use "Automated Profiling" and provide a channel for users to appeal.

---

## Do's and Don'ts of Production Privacy

- **DO hire a lawyer.** AI and automated generators are not sufficient for a venture-backed or high-revenue marketplace. You must retain legal counsel to review your policy.
- **DON'T store data you don't need.** Do not log full IP addresses in your database indefinitely. Hash them or truncate them (e.g., `192.168.1.X`) after 30 days.
- **DO verify user identities before deleting data.** If someone emails you saying "Delete John Doe's account", you must verify they actually own that account before executing a GDPR deletion request.
- **DON'T hide the opt-out.** Ensure your marketing emails have a one-click unsubscribe link. Bouncing users through a login wall to unsubscribe violates the CAN-SPAM Act.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Data Deletion Orchestration:**

````prompt
Act as a Backend Architect. Write a Next.js API route that handles a GDPR Data Deletion Request. The function must: 1. Delete the user from the primary Postgres database. 2. Call the Stripe API to delete the Customer object. 3. Call the Mailchimp API to permanently archive the contact. 4. Anonymize (not delete) any related `Orders` to preserve financial integrity. Ensure the entire operation is wrapped in a transaction or provides clear rollback/retry logic if a third-party API fails.
````

> [!TIP]
> **Prompt 2 — Sub-processor Clause:**

````prompt
Act as a Privacy Consultant. Write the "Data Sharing and Sub-processors" section of a Privacy Policy for a marketplace. Explicitly list that we share data with Stripe (for payments), AWS (for infrastructure), and Sentry (for error tracking). Include language that complies with the CCPA's definition of "selling or sharing" data, clarifying that we do not sell data to data brokers.
````

---

## Validating What AI Generates

- **Check for illegal financial deletion:** If AI suggests deleting rows from the `Orders` or `Invoices` table during a GDPR request, reject it immediately. Financial records must be preserved for tax law. The AI must anonymize the records (e.g., changing the name to `Deleted User`), not delete them.
- **Verify CMP integration:** If AI generates Google Analytics code, ensure it checks `window.cookieConsent` before initializing.

---

## Implementation Checklist

- [ ] Drafted a comprehensive Privacy Policy detailing data collection, sub-processors, and automated decision-making.
- [ ] Implemented a compliant Cookie Consent banner (OneTrust/Cookiebot) that actively blocks tracking scripts until consent is given.
- [ ] Built an automated "Right to be Forgotten" endpoint to handle cascading data deletion requests.
- [ ] Ensured financial records are anonymized rather than deleted during GDPR requests to comply with tax laws.
- [ ] Signed Data Processing Agreements (DPAs) with all critical third-party vendors.

---

## What's Next

Next: **Terms of Service** — Privacy covers data; Terms cover liability. We will architect the legal shields required to protect you when a buyer and seller inevitably sue each other over a transaction gone wrong.
