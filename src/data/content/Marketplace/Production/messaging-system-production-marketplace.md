---
title: Messaging System
slug: messaging-system
phase: Phase 2
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Messaging System (Communication Infrastructure)

## Why Messaging Is a Trust & Safety Surface

In a standard application, chat is just a feature for user engagement. In a production marketplace, the messaging system is the primary vector for **Disintermediation** (Platform Leakage).

Buyers and sellers will constantly attempt to exchange phone numbers or email addresses to take the transaction off-platform and avoid your Take Rate. If you build a messaging system without automated moderation, you will lose a significant percentage of your revenue.

---

## The Production Messaging Architecture

A production chat system requires more than just inserting rows into a database. It requires real-time delivery, push notifications, and inline moderation.

| Layer | The Production Reality |
|---|---|
| **Data Schema** | `Threads` (linked to a `Listing`) and `Messages`. Do not build a flat message table. You must be able to query "All conversations regarding Listing X". |
| **Real-Time Delivery** | Buyers expect instant chat. Polling the database every 5 seconds is unacceptable at scale. You must use WebSockets (e.g., Pusher, Ably, or Socket.io). |
| **Push Notifications** | If the app is closed, you must fire a transactional email (SendGrid) or an Apple/Android Push Notification (FCM/APNs) to pull the user back into the funnel. |
| **Media Attachments** | Users need to send photos of defects or custom requirements. You must support secure, virus-scanned uploads via S3 Presigned URLs. |

---

## Automated Moderation (Leakage Defense)

You defined your leakage policy in Phase 1. This is where you engineer it.

Every message sent through the platform must pass through an asynchronous NLP (Natural Language Processing) or Regex filter before being delivered.

**The Filter Pipeline:**
1. User clicks send. Message is saved to the database as `status: 'processing'`.
2. A background worker scans the text for phone numbers, emails, or trigger words ("Venmo", "CashApp", "outside the app").
3. If flagged, the message is redacted (e.g., "Hit me up at [REDACTED]") and the sender's Trust Score is docked.
4. The redacted message is pushed via WebSockets to the recipient.

> [!CAUTION]
> Do not run moderation blocking synchronously on the main thread. If the moderation API takes 2 seconds to respond, the chat will feel broken and unresponsive to the user. Always save the message optimistically and redact asynchronously.

---

## Do's and Don'ts of Production Messaging

- **DO tie every thread to a specific transaction or listing.** Context is critical for Dispute Resolution. When an admin reviews a dispute, they need to read the specific thread related to that order, not a generic, endless chat history between the two users.
- **DON'T store media attachments directly in the database.** Base64 encoded images will destroy your database performance. Always upload to S3/Cloudinary and store the URL in the `Message` table.
- **DO implement Read Receipts.** In a transactional environment, knowing that a seller *read* a message but didn't respond is a critical data point for customer support and dispute mediation.
- **DON'T build your own chat backend if you lack the engineering bandwidth.** Using a managed chat API like Sendbird or Stream Chat can save months of engineering time, as they handle WebSockets, offline sync, and push notifications out-of-the-box.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — WebSocket Architecture:**

````prompt
I am building a Next.js / Node marketplace. I need to implement real-time chat using [Pusher / Socket.io]. Act as a Senior Backend Engineer. Provide the exact backend code to emit a new message event securely (ensuring only the recipient receives the socket payload), and the React frontend code to subscribe to that channel and update the UI optimistically.
````

> [!TIP]
> **Prompt 2 — Leakage Redaction Worker:**

````prompt
Act as a Trust & Safety Engineer. Write a Node.js background worker function that takes a raw chat message string, runs it through a series of strict Regular Expressions to find and redact emails, phone numbers, and common off-platform payment methods (Zelle, Venmo). It should return the sanitized string and a boolean flag indicating if a violation was found.
````

---

## Validating What AI Generates

- **Check for Socket Security:** If the AI suggests broadcasting messages to a public WebSocket channel (e.g., `io.emit('new_message')`), reject it immediately. Sockets must be authenticated, and payloads must be scoped to private, user-specific channels.
- **Verify Attachment Handling:** If the AI provides code for uploading images directly through your Next.js API routes, ask it to rewrite the code using S3 Presigned URLs so the file uploads directly from the client to the bucket, bypassing your server's bandwidth limits.

---

## Implementation Checklist

- [ ] Architected the relational schema for `Threads` and `Messages`.
- [ ] Decided between building custom WebSockets (Socket.io) or using a managed Chat API (Sendbird/Stream).
- [ ] Integrated the Regex/NLP moderation pipeline to redact platform leakage.
- [ ] Set up transactional email fallbacks for offline users.
- [ ] Configured secure S3 Presigned URLs for media attachments.

---

## What's Next

Next: **Dispute Resolution** — When communication fails, transactions break down. We will architect the administrative systems and database states required to handle disputes, refunds, and chargebacks programmatically.
