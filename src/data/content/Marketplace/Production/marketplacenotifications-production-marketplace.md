---
title: Notifications
slug: notifications
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Notifications (Multi-Channel Delivery)

## The Engine Behind Retention

In a personal project, you call `sendEmail()` inside an API route. In a production marketplace, notifications are the primary lever for user retention and liquidity optimization. If a seller misses a notification that a buyer asked a question, that transaction dies.

You must architect a scalable, asynchronous notification engine capable of multi-channel routing (Email, SMS, Push) and strict compliance with global spam laws (CAN-SPAM, GDPR).

---

## Multi-Channel Routing Architecture

You cannot hardcode email sending logic into your `checkout` or `messaging` endpoints. You must decouple the trigger from the delivery.

**The Production Notification Engine:**
1. A domain event occurs (e.g., `Order_Created`).
2. The domain service publishes an event to an asynchronous queue (e.g., BullMQ, Inngest, AWS SQS).
3. The Notification Engine worker picks up the event.
4. The worker checks the User's `NotificationPreferences` in the database.
5. Based on preferences and urgency, the worker routes the message to the correct third-party API (SendGrid for Email, Twilio for SMS, FCM for Push).

> [!CAUTION]
> Never send a notification synchronously in the main thread of an API request. If SendGrid takes 3 seconds to respond, your checkout API takes 3 seconds to complete. If SendGrid is down, your checkout fails entirely. Always dispatch notifications asynchronously.

---

## Transactional vs. Marketing Email

Your marketplace must strictly separate Transactional emails from Marketing emails. 

* **Transactional (Requires no opt-in):** Receipts, Password Resets, Dispute Alerts, Message Notifications. (Use a dedicated subdomain like `alerts.yourmarketplace.com`).
* **Marketing (Requires explicit opt-in):** "Check out these new listings!", "Here is a 10% off coupon." (Use a separate subdomain like `news.yourmarketplace.com`).

If you mix these on the same domain and IP address, users marking your marketing emails as spam will destroy your domain reputation, and your critical password reset emails will start going to the spam folder.

---

## Compliance and User Preferences

Enterprise users demand control over their inboxes.

- **Granular Preferences:** Your `Users` table must link to a `NotificationPreferences` table. Sellers must be able to turn off "New Message" SMS alerts while keeping "Item Sold" SMS alerts on.
- **One-Click Unsubscribe:** Every email (even transactional ones like "New Message") must include an unsubscribe or preferences link at the bottom.
- **Bounces and Complaints:** You must listen to Webhooks from your email provider (e.g., SendGrid `bounced` events). If an email bounces, update the user's record so you stop attempting to email them, protecting your deliverability score.

---

## Do's and Don'ts of Production Notifications

- **DO use templates hosted by the provider.** Do not hardcode HTML strings in your backend code. Create templates in Resend, Postmark, or SendGrid, and pass the variable data (e.g., `{ "buyer_name": "Alice", "amount": "$50" }`) via the API.
- **DON'T use SMS for low-urgency events.** SMS costs money (~$0.01 per text) and is highly intrusive. Reserve SMS strictly for high-urgency alerts (e.g., "Your Escrow payout was released" or "A Dispute has been opened").
- **DO implement idempotency on notifications.** If your background worker crashes and restarts, it must not send the same "Order Confirmed" email twice.
- **DON'T send raw URLs.** Always format links beautifully. Instead of `Click here: https://app.com/orders/123`, use a clear Call to Action button: `[ View Order Details ]`.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Asynchronous Notification Worker:**

````prompt
Act as a Principal Backend Engineer. I am using Node.js and a background queue (like BullMQ or Inngest). Write the worker function for a `NotificationEngine`. It should receive an `event_type` and a `user_id`. It must query the database for the user's `NotificationPreferences`, determine whether they have opted into Email or SMS for this specific event, and then call the mock Resend (Email) or Twilio (SMS) API functions securely.
````

> [!TIP]
> **Prompt 2 — Email Bounce Webhook Handler:**

````prompt
Write a webhook handler in Next.js/Express to receive delivery status events from SendGrid/Resend. It must verify the webhook signature, parse the payload for `bounced` or `spam_complaint` events, and update the corresponding User's database record to `email_deliverable: false` so the system stops sending to them.
````

---

## Validating What AI Generates

- **Check for blocking calls:** If the AI writes an API route that calls `await sendEmail()` before returning a `200 OK` to the client, reject the code and demand an asynchronous background queue implementation.
- **Verify Database Checks:** Ensure the AI's notification logic queries the user's explicit opt-in/opt-out preferences before triggering the third-party API.

---

## Implementation Checklist

- [ ] Architected the asynchronous queue (BullMQ/Inngest) for notification dispatch.
- [ ] Created the `NotificationPreferences` database schema for granular opt-ins.
- [ ] Set up dedicated and authenticated (SPF, DKIM, DMARC) subdomains for Transactional vs. Marketing emails.
- [ ] Migrated hardcoded HTML emails into hosted templates (Resend/SendGrid/Postmark).
- [ ] Built the webhook listener to handle email bounces and spam complaints automatically.

---

## What's Next

Next: **Search** — With notifications keeping our users engaged, we must return to discovery. We will implement the frontend and backend integration for our dedicated search engine (Algolia/Typesense) to ensure sub-50ms query response times.
