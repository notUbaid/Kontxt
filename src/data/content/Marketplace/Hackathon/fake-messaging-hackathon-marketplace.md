---
title: Fake Messaging
slug: fake-messaging
phase: Phase 2
mode: hackathon
projectType: marketplace
estimatedTime: 15-20 min
filename: fake-messaging-hackathon-marketplace.md
---

# Fake Messaging

Almost every real marketplace needs buyer-seller communication. Almost no hackathon team should build a real messaging system. This module is about that gap, and how to close it convincingly.

---

## Why Real Messaging Is Rarely Worth Building

Real-time messaging means websockets or polling, message persistence, read receipts, notification logic, and conversation threading — genuine infrastructure that takes real engineering time regardless of how simple your UI looks.

> **Reframe:** Messaging in your demo needs to prove one thing: that buyers and sellers can communicate. It does not need to actually transmit real-time data between two live sessions. A judge watching a 3-minute demo cannot tell the difference between real-time infrastructure and a well-built simulation — but they can absolutely tell the difference between a working feature and a broken one. Spend your time on the latter distinction, not the former.

This decision follows directly from your MVP Scope work — messaging belongs on your **Fake It** list for almost every marketplace concept, not Must Build (Real).

---

## Decision 1: How Much to Fake

| Level | What it looks like | Effort |
|---|---|---|
| Static conversation view | A pre-populated, realistic-looking conversation thread, not interactive | Lowest |
| Send-only simulation | Buyer can type and "send" a message, it appears in the thread, but no real backend round-trip or reply logic | Low |
| Scripted exchange | Sending a message triggers a pre-written, contextually plausible reply after a short delay | Medium |
| Real persistence, no real-time | Messages actually save to your database and reload correctly, but no live push/websocket | Medium-High — only if genuinely justified |

> **Best Practice:** A scripted exchange is usually the sweet spot. It feels alive — a judge can type something and see what looks like a real response — without requiring any real-time infrastructure. The "reply" is just a pre-written message your app displays after a short delay, not a separate user actually typing back.

---

## Building a Convincing Scripted Exchange

The craft here mirrors Demo Marketplace Data: specificity beats genericness.

**Weak scripted reply:** *"Thanks for your message! I'll get back to you soon."*

**Strong scripted reply:** *"Hey! Yeah it's still available — I can meet near the library Thursday afternoon if that works for you?"*

The strong version responds as if it actually read the buyer's message and addresses the specific listing context — even though it's pre-written. This is the same principle as a chatbot script: it doesn't need to be intelligent, it needs to feel responsive to what's happening in the moment.

> **Tip:** Write 2-3 different scripted replies per "seller" persona, and trigger one based on simple keyword matching in the buyer's message (e.g. if the message contains "available" or "still have," reply with availability confirmation) if your time budget allows. Even this lightweight matching makes the exchange feel meaningfully more responsive than a single canned reply every time.

---

## What This Should Look Like in the UI

Build the conversation UI to the same visual standard as a real messaging app — this is where polish matters more than backend complexity:

- [ ] Message bubbles styled distinctly for buyer vs. seller
- [ ] Timestamps on messages (can be simulated/relative)
- [ ] A "typing..." indicator before the scripted reply appears — this single detail does enormous work in selling the illusion of a live exchange
- [ ] The conversation tied to a specific listing, not a generic chat screen — reinforces that this is marketplace-specific communication, not a bolted-on feature

> **Warning:** Don't let the messaging UI feel disconnected from the rest of your marketplace. If it doesn't reference the specific listing being discussed, it reads as a generic chat demo rather than something genuinely built for this product.

---

## Where to Trigger This

Connect fake messaging to your buyer journey naturally — typically from the listing detail page, as a "Message Seller" or "Ask a Question" action. This reinforces the connection between discovery and communication that real marketplaces have.

---

## What NOT to Build

- Real-time delivery (websockets, polling)
- Push notifications for new messages
- Multi-conversation inbox management with read/unread state
- File/image attachments in messages
- Message search or history beyond the current demo conversation

> **Common Mistake:** Building a full inbox UI with multiple conversation threads, unread badges, and search — when your demo will only ever show one conversation, once, live. Match your build effort to what you'll actually demonstrate, not to what a complete messaging product would include.

---

## Using AI Effectively Here

Use AI to write the scripted replies with the specificity this module emphasizes, and to scaffold the lightweight UI.

**📋 Copy this prompt:**

```
I need a fake messaging feature for a hackathon marketplace demo.

My marketplace: [one-sentence definition from MVP Scope]
Example listing context: [paste a real listing from your seed data]

Write 3 scripted seller replies for this specific listing context that:
1. Sound like a real person responding, with specific references to the listing (not generic "thanks for reaching out" copy)
2. Cover common buyer questions naturally: availability, price flexibility, meetup/delivery logistics
3. Vary in tone slightly between the 3 replies, as if from a real specific person, not interchangeable templates

Also help me scaffold a simple UI: message bubbles (buyer vs seller styled differently), a typing indicator with a short delay before the reply appears, and the conversation tied to this specific listing — not a generic chat screen.
```

---

## Validating the Output

- [ ] Do the scripted replies reference the specific listing, not generic placeholder language?
- [ ] Is there a "typing..." delay before replies appear, rather than an instant response that breaks the illusion?
- [ ] Is the conversation UI visually tied to a specific listing, not a standalone generic chat screen?
- [ ] Have you avoided building inbox management, real-time delivery, or attachments that won't appear in your demo?
- [ ] Does the messaging entry point connect naturally from the listing detail page (your buyer journey)?

> **Tip:** Test this exactly as you'll demo it — type a real, slightly unexpected message and see if the scripted reply still feels plausible. If your keyword matching is too rigid, an off-script question during a live demo could trigger an obviously mismatched reply.

---

## Before You Continue

- [ ] Messaging level decided (scripted exchange is the default recommendation) — not left as static or under-built
- [ ] At least 2-3 scripted replies written with specific, contextual language
- [ ] Typing indicator and delay implemented for realism
- [ ] Messaging UI tied to specific listings, not a generic chat screen
- [ ] No real-time infrastructure, inbox management, or attachments built

**Next up:** Marketplace UI Polish — the visual layer that ties everything from this phase together into something that looks intentionally designed.
