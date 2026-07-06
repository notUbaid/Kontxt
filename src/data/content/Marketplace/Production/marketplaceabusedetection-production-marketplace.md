---
title: Abuse Detection
slug: abuse-detection
phase: Phase 4
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Abuse Detection (Trust & Safety)

## The Threat Beyond Financial Fraud

Fraud targets your money. Abuse targets your users. Harassment, spam listings, competitor scraping, and ban evasion do not cost you chargeback fees, but they destroy the integrity of the marketplace. If a buyer receives a threatening message from a seller, they will never use your platform again.

In a production marketplace, relying entirely on "Report User" buttons is insufficient. You must implement proactive **Trust & Safety** infrastructure.

---

## NLP Toxicity Scanning (Messages)

If you wait for a user to report a death threat in a message, the damage is already done.

**The Production Defense:**
Integrate an NLP toxicity scanner (e.g., **Google Perspective API** or **OpenAI Moderation Endpoint**) into your messaging pipeline.
1. When a user sends a message, it is evaluated asynchronously for `TOXICITY`, `SEVERE_TOXICITY`, and `THREAT`.
2. If the score exceeds `0.90` (90% confidence), the message is instantly flagged and hidden from the recipient.
3. The Trust & Safety team reviews the flag and decides whether to ban the sender.

---

## Automated Shadowbanning

When you permanently ban a troll or spammer, they instantly know they are banned and will create a new account within 5 minutes to continue the abuse.

**The Production Strategy:**
Implement **Shadowbanning**.
When a user is flagged for severe spam (e.g., posting the same listing 50 times in an hour), do not show them a "You are banned" message. Instead, set `is_shadowbanned = true` on their account.
* They can still log in.
* They can still create listings and send messages.
* **But no one else can see them.** Their listings are stripped from the search index, and their messages silently drop. 

This wastes the abuser's time and delays the creation of their next fake account.

---

## Advanced Ban Evasion Prevention

A shadowbanned user will eventually realize no one is buying their spam listings and will try to create a new account.

**The Production Standard:**
Do not rely on IP blocking. Use **Device Fingerprinting** (covered in Fraud Prevention) and **Identity Graphs**.
If Account B is created from the exact same Device Fingerprint as Shadowbanned Account A, automatically shadowban Account B at the moment of creation. If they use the same phone number, same PayPal payout address, or same browser canvas hash, link the accounts in your database and apply the ban across the entire graph.

---

## Listing Spam and Scraping

**Listing Spam:** Sellers trying to dominate search results by posting 100 identical listings.
* **Defense:** Implement a Hash-based similarity check (`pg_trgm` in Postgres or Algolia rules) on listing creation. If a seller posts a listing that is 95% similar to their last 5 listings, queue it for manual review before publishing.

**Catalog Scraping:** Competitors using bots to download your entire database of listings to bootstrap their own marketplace.
* **Defense:** Rely on Web Application Firewalls (Cloudflare Bot Management) to detect headless browsers (Puppeteer/Selenium) and issue silent CAPTCHA challenges to suspicious traffic scraping the `/api/search` endpoints.

---

## Do's and Don'ts of Production Abuse Detection

- **DO scan all uploaded images for CSAM and NSFW content.** Use AWS Rekognition or Google Cloud Vision. If a user uploads illegal content, you must automatically block it and report it to the National Center for Missing & Exploited Children (NCMEC) immediately. This is a legal requirement.
- **DON'T automate permanent bans based on ML text analysis.** NLP models have biases and fail to understand sarcasm or context. Use them to flag and shadowban temporarily pending human review, never to permanently delete accounts automatically.
- **DO provide block buttons everywhere.** Every message thread and user profile must have a one-click "Block User" button that instantly prevents any further interaction between the two accounts.
- **DON'T expose your moderation rules.** If a user's listing is removed for spam, do not tell them "You posted 5 listings in 10 minutes." Tell them "Violation of Community Guidelines." If you expose the exact rules, spammers will engineer around them (e.g., posting 4 listings in 11 minutes).

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — OpenAI Moderation Endpoint Integration:**

````prompt
Act as a Trust & Safety Engineer. Write a Node.js utility function that takes a chat message string and sends it to the `https://api.openai.com/v1/moderations` endpoint. If the response flags the message for `hate`, `harassment`, or `violence`, the function should return `{ safe: false, categories: [...] }`. Include proper error handling to fail-open (allow the message) if the API times out, to prevent breaking the chat feature during an OpenAI outage.
````

> [!TIP]
> **Prompt 2 — Postgres Similarity Spam Check:**

````prompt
Write a Prisma query or raw Postgres SQL query using the `pg_trgm` extension. The query must find any active listings created by `seller_id = X` in the last 24 hours where the `title` has a similarity score greater than `0.85` compared to a new provided title string. Explain how to create the GiST index required to make this query fast.
````

---

## Validating What AI Generates

- **Check for blocking dependencies:** If AI generates code that calls an external moderation API synchronously *before* saving a message, ensure it has a strict timeout (e.g., 300ms). Slow moderation APIs should not ruin the real-time chat experience for legitimate users. Evaluate asynchronously where possible.
- **Verify fail-open logic:** Moderation tools are secondary to core business functions. If the toxicity scanner goes down, the marketplace must continue to function.

---

## Implementation Checklist

- [ ] Integrated an NLP Toxicity Scanner (Perspective API / OpenAI Moderation) to automatically flag abusive messages and listings.
- [ ] Implemented a Shadowbanning mechanism (`is_shadowbanned = true`) to silently hide abusive users without alerting them.
- [ ] Deployed Image Moderation (AWS Rekognition) to automatically block NSFW or illegal image uploads.
- [ ] Set up similarity checks (`pg_trgm`) to detect and flag sellers posting duplicate spam listings.
- [ ] Ensured all moderation API calls fail-open and execute with strict timeouts to protect core platform performance.

---

## What's Next

Next: **Phase 5 (Launch)** — We have completed the infrastructure and security hardening. It is time to prepare for the public. We will begin with the Legal and Compliance foundation: Privacy Policies, Terms of Service, and GDPR requirements.
