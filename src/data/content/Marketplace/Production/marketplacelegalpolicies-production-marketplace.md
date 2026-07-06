---
title: Legal Policies
slug: legal-policies
phase: Phase 5
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Legal Policies & Trust Operations

## The Cost of Ambiguity

Your Terms of Service is the legal shield. Your **Legal Policies** are the operational weapons. 

In a production marketplace, if a user uploads a listing for a stolen bicycle, or uses the messaging system to harass another user, you cannot rely on "common sense" to moderate them. If you ban a high-revenue seller without pointing to a specific, written policy violation, they will sue you for lost income.

You must architect a ruthless, black-and-white Trust & Safety (T&S) framework.

---

## The Core Policies You Must Publish

A production marketplace must host a dedicated "Trust Center" containing these specific policies:

### 1. Prohibited Items Policy
Do not say "No illegal items." You must maintain an exhaustive, categorized list of exactly what is banned.
* Weapons and explosives.
* Counterfeit goods (requires a zero-tolerance IP enforcement policy).
* Digital goods (if your platform only supports physical fulfillment).
* Regulated services (medical advice, financial consulting).

### 2. Anti-Circumvention Policy (Fee Evasion)
Sellers will actively try to bypass your platform fees by sending buyers their phone number or a Venmo link in the chat.
* **The Policy:** Explicitly ban the sharing of external contact info or payment links before a transaction is completed.
* **The Enforcement:** Use regex or NLP to automatically flag and redact phone numbers, emails, and URLs in the messaging system. Give the seller one automated warning, then a permanent ban.

### 3. DMCA & Copyright Policy
If users upload copyrighted images, the copyright holder will demand you take them down.
* **The Policy:** You must publish a DMCA (Digital Millennium Copyright Act) Takedown Policy, providing an email address (`copyright@yourdomain.com`) and a required template for submitting takedown notices.
* **The Enforcement:** When you receive a valid notice, you must remove the content within 24 hours to maintain your "Safe Harbor" protection.

---

## Automated Moderation (Scaling T&S)

You cannot manually review 5,000 listings a day. You must automate policy enforcement.

**The Production Standard:**
Integrate Trust & Safety APIs into your listing creation and messaging flows.
1. **Text Moderation:** Pass all listing descriptions and user messages through the **Google Perspective API** or **OpenAI Moderation Endpoint**. If the toxicity score is `> 0.9`, automatically block the message and flag the user.
2. **Image Moderation:** Run all uploaded photos through **AWS Rekognition** or **Google Cloud Vision** to automatically detect and block explicit content, violence, or known counterfeit logos before the image is ever saved to your S3 bucket.

---

## The Escalation Matrix

When an automated system flags a user, or a buyer reports a seller, what happens? You must define an Escalation Matrix.

1. **Strike 1 (Minor Violation - e.g., profanity in a listing):** Automated email warning. Listing is shadowbanned until edited.
2. **Strike 2 (Severe Violation - e.g., fee circumvention attempt):** Account is suspended for 7 days. Payouts are paused.
3. **Strike 3 (Zero Tolerance - e.g., fraud, threats):** Permanent IP and device-fingerprint ban. Funds are locked indefinitely to cover chargebacks.

---

## Do's and Don'ts of Production Legal Policies

- **DO use Device Fingerprinting.** Banning an email address is useless; the fraudster will just create a new one. Use tools like **FingerprintJS** or **Sift** to ban the physical device (hardware ID, browser canvas hash).
- **DON'T negotiate with banned users.** When you ban a user for a zero-tolerance violation, do not explain the exact heuristic that caught them (e.g., "We banned you because you used this IP"). They will use that info to evade your systems next time.
- **DO build an internal Admin Dashboard.** Your customer support team needs a dashboard where they can see a user's entire history (listings, messages, strikes, IP addresses) on one screen to make fast moderation decisions.
- **DON'T rely on community reporting alone.** If you wait for buyers to report bad listings, the damage is already done. Proactive, automated moderation is mandatory.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Prohibited Items Matrix:**

````prompt
Act as a Trust & Safety Director for a P2P electronics marketplace. Draft a comprehensive "Prohibited Items Policy". Structure it with clear categories (e.g., Stolen Goods, Recalled Items, Counterfeit/Replica, Jailbroken Devices). For each category, provide a specific example of a violation. Include a section explaining the exact consequences of violating this policy (The Escalation Matrix).
````

> [!TIP]
> **Prompt 2 — Automated Content Moderation:**

````prompt
Write a Node.js utility function that intercepts a newly created listing. The function must send the listing's description to the OpenAI Moderation API. If the API flags the content as `hate`, `violence`, or `sexual`, the function must throw an error, preventing the database insertion, and log the incident to Sentry with the user's ID for admin review.
````

---

## Validating What AI Generates

- **Check for generic lists:** If AI generates a Prohibited Items policy that just says "No illegal items," reject it. It must be exhaustive and highly specific to your marketplace's niche.
- **Verify Moderation Logic:** If AI writes an automated moderation script that silently deletes user data without logging the reason, fix it. You must always maintain an audit trail of *why* an action was taken in case the user appeals.

---

## Implementation Checklist

- [ ] Published a comprehensive Prohibited Items Policy with zero-tolerance categories explicitly defined.
- [ ] Enforced an Anti-Circumvention policy using automated regex/NLP to redact off-platform contact sharing in messages.
- [ ] Published a compliant DMCA Takedown procedure and registered a designated agent.
- [ ] Integrated automated Image and Text moderation APIs (AWS Rekognition / Perspective API) to block severe violations proactively.
- [ ] Defined a strict, 3-tier Escalation Matrix (Warning -> Suspension -> Ban) to ensure consistent moderation decisions.

---

## What's Next

Next: **Refund Policies** — The rules are set, but disputes over money are inevitable. We will architect a production-grade refund system that handles Escrow, Chargeback defense, and automated dispute resolution without bleeding the platform's capital.
