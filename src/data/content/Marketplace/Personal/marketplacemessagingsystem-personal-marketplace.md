---
title: Messaging System
slug: messaging-system
phase: Phase 2
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Messaging System

## Why Buyers and Sellers Need to Talk Before You Build Chat

Messaging exists to answer the questions a listing can't — exactly the gap your Listing System module told you to leave open rather than over-fielding. Before you build this, recognize what it actually is architecturally: a constrained communication channel between exactly two parties, tied to context (usually a listing), not a general chat app.

Treat it as that constrained thing. Most of the complexity in "real" chat apps — group conversations, typing indicators, read receipts, rich media — is unnecessary here at personal-mode scale.

---

## What Messaging Actually Needs to Do

| Requirement | Why |
|---|---|
| Two-party threads, tied to a listing | Matches the Authorization rule: only the two participants can view/send |
| Persisted history | Buyers and sellers reference past conversations, especially around disputes |
| Notification on new message | Sellers need to know promptly — slow replies kill the Seller Journey's "worth my time" calculation |
| Basic text only | Rich media, attachments, etc. are scope you don't need yet |

>  **Best practice for personal mode:** Don't build real-time WebSocket infrastructure for this. Polling (checking for new messages every few seconds while a thread is open) or even simple page-refresh-based delivery is sufficient at your scale, and dramatically simpler to build and debug solo. Real WebSocket infrastructure is exactly the kind of premature scaling Architecture Fundamentals warned about.

---

## Schema: Threads, Not Just Messages

A common beginner mistake is modeling messages as flat rows with no grouping concept. You need a Thread (or Conversation) entity that messages belong to — it's what makes "show me all my conversations" a simple query instead of a complex aggregation.

| Entity | Key Fields |
|---|---|
| Thread | Listing ID (optional but recommended), buyer ID, seller ID, created_at, last_message_at |
| Message | Thread ID, sender ID, content, sent_at, read status |

>  **Tip:** Linking a Thread to a Listing isn't optional polish — it's what lets a seller with multiple active listings tell which conversation is about which item without reading every message. It also directly supports the authorization check from the previous module: "is the current user one of the two parties to this thread."

---

## Authorization for Messaging: Apply What You Already Decided

This is the ownership/party-to-transaction pattern from Authorization, applied directly:

- A user can only view a Thread if they are the buyer_id or seller_id on it
- A user can only send a Message into a Thread they're a party to
- Account status gates this too — a suspended or banned user cannot send new messages, per the table in Authorization

> ️ Don't build messaging-specific authorization logic separately from the rest of your app. Reuse the exact same check. Divergent authorization logic across features is how gaps get introduced — one feature gets the security review attention, another quietly doesn't.

---

## Notifications: Email Is Enough at This Scale

| Approach | Personal-Mode Fit |
|---|---|
| Email notification on new message | Sufficient — most users check email reliably enough |
| Push notifications | Overkill unless you have a mobile app, which is out of scope here |
| In-app notification badge only (no external alert) | Risky — sellers won't open the app proactively just to check, especially early when usage habits aren't formed yet |

>  Email notification on new message is cheap to build, doesn't require new infrastructure, and directly supports the response-time expectation buyers form during their Decision stage in the Buyer Journey. A seller who doesn't see a message for three days because there was no notification is a churned seller, by the logic from your Seller Journey module.

---

## What to Explicitly Defer

| Feature | Defer Until |
|---|---|
| Read receipts | Not essential — adds complexity with limited trust payoff at this scale |
| Typing indicators | Pure polish, zero functional value at low message volume |
| File/image attachments in messages | Adds storage and moderation surface area disproportionate to early need |
| Message search | Only relevant once thread volume per user is high enough to need it |

---

## AI Prompt: Implementing the Messaging Schema and Flow

```
I'm building a personal-scale marketplace for [your niche] using
[your stack]. I have Listing, User, and Authorization patterns
already defined (ownership/party-to-transaction check).

Implement:
1. A Thread entity linked to a Listing, buyer, and seller
2. A Message entity belonging to a Thread, with sender, content,
   sent_at, and read status
3. Authorization reusing my existing party-to-transaction check —
   only the buyer and seller on a thread can view or send
4. An email notification triggered on new message, sent to the
   recipient (not the sender)

Use polling or simple refresh-based delivery, not WebSockets — I'm
intentionally avoiding real-time infrastructure at this stage.
Flag anything in this design that wouldn't hold up once I do need
real-time later, so I know what I'm trading off.
```

---

## Common Mistake: Building Messaging Before Listings Are Stable

> ️ Since Threads link to Listings, building messaging against a Listing schema that's still changing means redoing the relationship later. Confirm Listing System is genuinely finalized before starting this module — if you're still adjusting listing fields, that instability will ripple into your Thread schema too.

---

## What You Should Walk Away With

1. A Thread + Message schema, not flat unstructured messages
2. Authorization reusing the existing ownership/party-to-transaction pattern
3. Email notifications on new messages, sent to the recipient
4. A confirmed decision to skip WebSockets, read receipts, and attachments for now

Next: Dispute Resolution, which builds directly on this messaging system — disputes typically start as a conversation in exactly this Thread structure before escalating to you for mediation.
