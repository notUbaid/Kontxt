---
title: Messaging
slug: messaging
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Messaging (Communication Layer)

## Preventing Platform Leakage and Ensuring Safety

In a personal project, messaging is just a table in a database and a `setInterval` fetching updates every 5 seconds. In a production marketplace, messaging is the frontline of Trust & Safety.

If your messaging system is unmoderated, users will send their phone numbers to bypass your platform fee (Platform Leakage). If it is unencrypted or unprotected, bad actors will harass your sellers. If it relies on HTTP polling, your database will collapse under the load.

---

## Infrastructure: Real-Time at Scale

Do not build a WebSocket infrastructure from scratch (using raw `ws` or `Socket.io`) unless you have a dedicated backend team to manage connection drops, heartbeat ping/pongs, and horizontal scaling across multiple Node.js instances via Redis Pub/Sub.

**The Production Standard:** Use a managed Chat-as-a-Service provider.
* **Sendbird** or **Stream Chat:** These platforms handle the WebSockets, offline push notifications, typing indicators, and read receipts out of the box.
* **Firebase Realtime Database:** A viable alternative if you are already heavily invested in the GCP ecosystem.

Your backend's only job is to generate a secure session token for the buyer and seller, and pass it to the frontend SDK to establish the direct WebSocket connection.

---

## Trust & Safety: Platform Leakage Prevention

Marketplaces die when users take transactions off-platform to avoid the 10% fee. You must actively police the messaging layer.

**The Production Rule:**
Implement an automated moderation layer (either via your chat provider's webhooks or a custom middleware) that scans every message payload *before* it is delivered.

1. **Regex Filters:** Block or redact standard email formats (`test@gmail.com`), phone numbers (`555-0199`), and external URLs (`venmo.com/user`).
2. **Warning System:** If a message triggers the filter, redact the sensitive data and send an automated system message into the thread: *"Friendly reminder: Transacting outside the platform violates our Terms of Service and voids your fraud protection."*
3. **Admin Escalation:** Flag the thread in your Admin Panel for manual review.

---

## Offline Fallbacks (Email & Push)

Real-time chat only works if both users are looking at the screen. In a marketplace, the seller might check their phone 4 hours later.

You must build a robust **Offline Fallback Pipeline**:
1. User A sends a message.
2. The Chat service registers that User B is disconnected (no active WebSocket session).
3. The Chat service triggers a Webhook to your backend.
4. Your backend dispatches an email (via SendGrid/Resend) or a Push Notification (via APNs/FCM) saying: *"You have a new message regarding [Listing Title]."*

If you miss this step, your marketplace liquidity will freeze because buyers will assume sellers are ignoring them.

---

## E2E Encryption vs. Moderation

You cannot have both.
If you implement End-to-End Encryption (E2EE) like WhatsApp, your Trust & Safety team cannot read the messages to resolve disputes, and you cannot run automated regex filters to prevent platform leakage.

**The Production Decision:**
Marketplace messaging should **never** be E2EE. It must be encrypted in transit (TLS) and at rest (AES-256), but your application backend (and your Support Admins) MUST have the ability to read the plaintext messages to mediate disputes and enforce policies.

---

## Do's and Don'ts of Production Messaging

- **DO scope threads to the Listing.** A Thread should not just be `BuyerID + SellerID`. It must be `BuyerID + SellerID + ListingID`. If they negotiate over a Laptop today and a Guitar next year, those must be separate threads to keep dispute mediation clear.
- **DON'T allow sending images without moderation.** If you allow image uploads in chat, you must run them through a Content Moderation API (e.g., AWS Rekognition) to detect NSFW or illegal content before rendering them to the other user.
- **DO implement Rate Limiting.** Prevent spam bots from sending 1,000 messages a minute to every seller on the platform.
- **DON'T trust the client for the Sender ID.** When a message is sent to your backend or chat provider, the `sender_id` must be derived from the secure JWT on the server, never from a frontend JSON payload.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Platform Leakage Regex Middleware:**

````prompt
Act as a Trust & Safety Engineer. Write a Node.js middleware function that scans an incoming chat message string. It must use aggressive Regex patterns to detect phone numbers (accounting for dashes, spaces, and international formats), email addresses, and payment links (Venmo, CashApp, PayPal). If detected, it should redact the string with `[REDACTED]` and return a boolean flag `requires_admin_review: true`.
````

> [!TIP]
> **Prompt 2 — Offline Fallback Webhook:**

````prompt
I am using a managed chat provider (like Stream or Sendbird). Write the Next.js API route that receives the `message.new` webhook. The route must check if the recipient's `unread_count` is > 0 and their `online_status` is false. If so, it should trigger the background queue (e.g., BullMQ/Inngest) to send an "Unread Message" email notification, ensuring it respects a 15-minute debounce so the user isn't spammed with 10 emails.
````

---

## Validating What AI Generates

- **Check for E2EE Implementations:** If the AI attempts to write RSA public/private key encryption logic for the chat messages, reject it. Marketplace chat must remain accessible to the platform for moderation and dispute resolution.
- **Verify Thread Uniqueness:** Ensure the database schema generated by the AI includes a composite unique constraint on `[listing_id, buyer_id, seller_id]` so duplicate threads are blocked at the database level.

---

## Implementation Checklist

- [ ] Selected a Managed Chat Provider (Stream, Sendbird) to handle WebSockets and real-time infrastructure.
- [ ] Implemented automated Regex filters to redact phone numbers, emails, and payment links.
- [ ] Built the offline fallback pipeline (Webhooks -> Queue -> Email/Push) to ensure message delivery.
- [ ] Defined the composite unique constraint (`Listing + Buyer + Seller`) to keep threads organized for disputes.
- [ ] Added Chat Rate Limiting to prevent automated spam attacks.

---

## What's Next

Next: **Reviews** — Once the transaction is complete, trust must be codified. We will architect the rating system, enforce verified-purchase constraints, and implement double-blind review timing to prevent retaliatory feedback.
