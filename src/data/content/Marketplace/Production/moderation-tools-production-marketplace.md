---
title: Moderation Tools
slug: moderation-tools
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Moderation Tools

## Defending the Platform at Scale

In a personal project, a single "Report Listing" button and a daily check of the database is sufficient. In a production marketplace, if a scammer posts 500 fraudulent listings overnight and starts messaging buyers, manual review will fail. By the time you wake up, buyers will have been defrauded, and Stripe will hit you with devastating chargeback fees.

A production marketplace must combine **Automated AI Moderation** to catch obvious abuse instantly, with highly efficient **Queue-Based Tooling** for human Trust & Safety (T&S) teams.

---

## Automated Content Moderation

You cannot afford to manually review every image and chat message uploaded to your platform. 

**The Production Standard:**
1. **Images (AWS Rekognition / Google Cloud Vision):** When a user uploads a listing image, send it to a managed ML service. If it flags the image for Nudity, Violence, or known scam watermarks, immediately set the listing `status: 'REJECTED'` and flag the user account.
2. **Text (OpenAPI Moderation API / Custom NLP):** Scan listing descriptions and chat messages for hate speech, severe harassment, or off-platform payment links. 
3. **Risk Scoring:** Assign a `trust_score` to every user. A brand new user posting a $5,000 laptop has a high risk score. A 5-year veteran with 500 positive reviews posting a $20 book has a low risk score. Route only high-risk actions to the manual review queue.

---

## Shadowbanning (Hellbanning)

When you ban a sophisticated scammer by showing them a red "Your account is banned" screen, they will immediately clear their cookies, change their IP, and create a new account.

**The Production Tactic:** 
Implement **Shadowbanning**.
If a user is flagged as a high-confidence malicious actor:
1. Do not tell them they are banned.
2. Let them continue to "publish" listings and "send" messages.
3. On the backend, ensure their listings are silently filtered out of the Elasticsearch/Algolia index. 
4. Ensure their messages are written to the database but never delivered to the recipient's inbox.

The scammer wastes their time thinking their attack is working, delaying their attempt to create a new, undetected account.

---

## The T&S Queue Workflow

When your automated systems flag something as "suspicious but not definitive," it must go to a human. Your T&S team needs a hyper-efficient queue, not just a standard CRUD table.

**Required Queue Features:**
- **Context Aggregation:** The review screen must show the flagged listing, the user's past 5 listings, their current IP address, their Stripe risk score, and any active message threads on a single screen. (Every click a moderator has to make costs you money).
- **Macro Actions:** Moderators should not type manual reasons. They should click one button: "Confirm Scam," which automatically (1) Soft-deletes the listing, (2) Suspends the user, (3) Freezes their Escrow payouts, and (4) Emails the user a templated policy violation notice.
- **Audit Logging:** Every moderator action must be logged immutably, as defined in the Admin Panel module.

---

## Escrow Freezing

If a seller is reported for fraud *after* a buyer has checked out, but *before* the funds have been paid out from Escrow, you must intervene immediately.

Your moderation tooling must include a **Freeze Funds** action.
This pauses the Stripe Connect transfer and updates the Transaction status to `FUNDS_FROZEN`. This prevents the scammer from cashing out while your team investigates the dispute.

---

## Do's and Don'ts of Production Moderation

- **DO use IP and Device Fingerprinting.** Scammers use VPNs, but device fingerprinting (e.g., FingerprintJS) can link a new account directly to a previously banned account.
- **DON'T build ML models from scratch.** Do not train your own neural net to detect inappropriate images. AWS Rekognition costs fractions of a cent per image and is maintained by Amazon.
- **DO provide an Appeals Process.** False positives happen. When a legitimate user is caught by an automated filter, they must have a clear UI path to appeal the decision to a human moderator.
- **DON'T ignore reporting volume.** If a listing receives 3 separate reports from 3 different buyers within 1 hour, your system should automatically pause the listing pending manual review, even if the AI filter missed it.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Automated Image Moderation:**

````prompt
Act as a Senior Backend Engineer. I am using Node.js. Write a service function that takes an S3 image URL, sends it to the AWS Rekognition `DetectModerationLabels` API, and evaluates the response. If the image contains Explicit Nudity or Violence, the function should return a flag to immediately reject the listing and log a high-severity security event to the database.
````

> [!TIP]
> **Prompt 2 — Shadowban Middleware:**

````prompt
Write an Express/Next.js middleware function that checks if the authenticated `req.user` has a `status: 'SHADOWBANNED'`. If they are shadowbanned and attempt to `POST /api/messages`, the backend should simulate a successful `201 Created` response to the client, but silently drop the database write (or write it to an isolated `shadow_messages` table) so the recipient never sees it.
````

---

## Validating What AI Generates

- **Check for synchronous blocking:** If the AI writes automated image moderation logic that runs synchronously during the `POST /listings` request (making the user wait 4 seconds for AWS to respond), reject it. Image moderation should happen asynchronously via a background queue, temporarily setting the listing status to `PENDING_REVIEW` until complete.
- **Verify comprehensive action:** When AI generates a "Ban User" function, ensure it also handles the cascading effects: canceling active listings, freezing pending payouts, and invalidating active session tokens.

---

## Implementation Checklist

- [ ] Integrated automated content moderation (AWS Rekognition / OpenAI) for images and text.
- [ ] Built an efficient, context-rich manual review queue for the Trust & Safety team.
- [ ] Implemented Shadowbanning to silently neutralize sophisticated malicious actors.
- [ ] Added Escrow Freezing capabilities to halt payouts during fraud investigations.
- [ ] Established an appeals workflow for users caught by false-positive automated filters.

---

## What's Next

Congratulations. You have completed Phase 3. 

The core marketplace engine is fully architected and developed. You have built high-performance listings, secure messaging, robust payment orchestration, and enterprise-grade internal tooling. 

You are now ready to move to **Phase 4: Production Readiness**, where we will harden the infrastructure against DDoS attacks, configure CI/CD pipelines, establish monitoring and alerting, and prepare the platform for public launch.
