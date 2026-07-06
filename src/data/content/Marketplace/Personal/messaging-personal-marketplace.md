---
title: Messaging
slug: messaging
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 20–25 min
---

# Messaging

Messaging is what turns a listing into a transaction. It's also one of the most commonly under-engineered parts of a personal marketplace project — built as an afterthought, then full of privacy and authorization holes.

The core challenge: messaging in a marketplace isn't a generic chat feature. It's always scoped to a **listing** and a **pair of participants**. Get that scoping wrong and strangers can read each other's conversations.

---

## The Data Shape

Two common mistakes happen here: storing messages without a thread concept (impossible to group conversations), or building a fully generic chat system (overkill for a marketplace).

> ** Core rule:** A thread is always tied to exactly one listing and exactly two participants (buyer + seller). This constraint simplifies almost everything downstream.

```prisma
model Thread {
  id         String    @id @default(cuid())
  listingId  String
  buyerId    String
  sellerId   String
  createdAt  DateTime  @default(now())

  listing    Listing   @relation(fields: [listingId], references: [id])
  messages   Message[]

  @@unique([listingId, buyerId, sellerId]) // one thread per buyer/listing pair
}

model Message {
  id         String   @id @default(cuid())
  threadId   String
  senderId   String
  body       String
  readAt     DateTime?
  createdAt  DateTime @default(now())

  thread     Thread   @relation(fields: [threadId], references: [id])

  @@index([threadId, createdAt])
}
```

The `@@unique([listingId, buyerId, sellerId])` constraint does real work: it prevents duplicate threads from being created every time a buyer clicks "Message Seller" again on the same listing, which is a common bug when this isn't enforced at the database level.

---

## Decision: Real-Time or Polling?

> ** Decision Card — Message Delivery**
>
> **Option A: Polling** (`GET /threads/:id/messages` every few seconds)
> Trivial to build, works everywhere, slightly delayed delivery.
>
> **Option B: WebSockets / Server-Sent Events**
> Instant delivery, noticeably more complex — connection management, reconnection logic, scaling considerations.
>
> **Option C: Managed real-time service** (e.g. Pusher, Ably, Supabase Realtime)
> Instant delivery without building infrastructure yourself, small ongoing cost or free tier.
>
> **For Personal Mode: start with Option A.** Polling every 3-5 seconds is invisible to users for a messaging feature and lets you ship a working product fast. Upgrade to Option C only if responsiveness becomes a real complaint — don't build real-time infrastructure speculatively.

---

## Authorization: The Part That Actually Matters

This is where messaging features most often leak data. Every single endpoint must verify the requester is a participant in the thread — not just authenticated.

```js
async function requireThreadParticipant(req, res, next) {
  const thread = await db.thread.findUnique({ where: { id: req.params.threadId } });

  if (!thread) return res.status(404).json({ error: "Thread not found" });
  if (thread.buyerId !== req.user.id && thread.sellerId !== req.user.id) {
    return res.status(403).json({ error: "Not a participant in this thread" });
  }

  req.thread = thread;
  next();
}
```

> ** Common Hallucination:** AI frequently writes message-fetching logic that checks `if (req.user)` (any logged-in user) instead of checking thread participation. This is the messaging equivalent of the authorization mistake covered earlier — and it's just as common when AI generates this feature in isolation, without being shown your existing participant-check pattern.

---

## Starting a Thread from a Listing

The entry point matters more than it seems. "Message Seller" should never let a buyer message themselves, and should reuse an existing thread instead of creating duplicates.

> ** Validation Checklist**
- [ ] Does starting a thread check `listing.sellerId !== req.user.id`? (sellers shouldn't message their own listings)
- [ ] Does it check for an existing thread first, using the unique constraint, before creating a new one?
- [ ] Is the listing status checked — can buyers start new threads on `sold` or `removed` listings? (Usually: no for new threads, yes to view existing ones)
- [ ] Are message bodies length-limited and stripped of any HTML/script content before storage?

```js
router.post("/listings/:listingId/message", requireAuth, async (req, res) => {
  const listing = await db.listing.findUnique({ where: { id: req.params.listingId } });
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  if (listing.sellerId === req.user.id) {
    return res.status(400).json({ error: "Cannot message your own listing" });
  }

  const thread = await db.thread.upsert({
    where: {
      listingId_buyerId_sellerId: {
        listingId: listing.id,
        buyerId: req.user.id,
        sellerId: listing.sellerId,
      },
    },
    update: {},
    create: {
      listingId: listing.id,
      buyerId: req.user.id,
      sellerId: listing.sellerId,
    },
  });

  res.json(thread);
});
```

---

## AI Prompt: Generate the Messaging Layer

> ** Copy Prompt**
>
> ```
> Build a marketplace messaging system for a personal project.
> Stack: [YOUR STACK — e.g. Node.js/Express, Prisma, PostgreSQL/SQLite].
>
> Schema:
> [PASTE YOUR THREAD AND MESSAGE SCHEMA HERE]
>
> Requirements:
- A thread is always tied to one listing + one buyer + one seller (unique constraint already enforces this)
- POST /listings/:id/message — starts or reuses a thread, blocks sellers messaging their own listing
- GET /threads — list threads for the current user (as buyer or seller)
- GET /threads/:id/messages — fetch messages, MUST verify requester is buyer or seller on that thread
- POST /threads/:id/messages — send a message, same participant check
- Use polling-friendly design: GET /threads/:id/messages should support a `since` timestamp param for incremental fetching
- Reuse my existing requireAuth middleware — don't recreate it
- Sanitize message body input (strip HTML/script tags) before storage
> ```
>
> **Why this prompt works:** it specifies the `since` parameter upfront, which prevents AI from generating a naive polling implementation that re-fetches the entire message history every few seconds — a real performance problem once threads grow long.

---

## Token Efficiency Tip

Messaging touches both your listing schema and your auth middleware. Rather than re-explaining both in full, reference them by name and paste only the relevant function signatures. If you're in the same AI conversation where you built listings, just say "using the Listing and Thread schemas above" — re-pasting the full Listing schema again wastes tokens on context the AI already has.

---

## What You've Decided

By the end of this module you should have:

- A thread model scoped to exactly one listing and two participants
- A database-level constraint preventing duplicate threads
- Participant-based authorization on every message endpoint, not just authentication
- A polling-based delivery approach appropriate for a personal project's scale
- Input sanitization on message content

**Next:** Reviews — letting buyers rate sellers after a completed transaction.
