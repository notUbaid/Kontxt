---
title: Notifications
slug: notifications
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Notifications

## The System That Makes Every Other System Actually Get Noticed

You've built status updates, payment confirmations, dispute flags, and new messages — but a status change nobody sees is a status change that didn't help anyone. Notifications is the layer that closes that loop. This module consolidates the email triggers you already specified individually (Messaging System, Dispute Resolution, Payments) into one coherent notification system, rather than scattered one-off email calls.

---

## Consolidate What You've Already Decided to Send

Each of these was already specified in an earlier module. This is the checklist confirming all of them are actually wired up, not a new design exercise.

| Event | Recipient | Source Module |
|---|---|---|
| New message in a thread | The recipient (not sender) | Messaging System |
| Listing approved/rejected | The seller | Marketplace Policies / Listing System |
| Purchase completed | Both buyer and seller | Payments Architecture |
| Funds released to seller | The seller | Payments |
| Dispute flagged | You (founder) + the other party | Dispute Resolution |
| Dispute resolved | Both parties | Dispute Resolution |

> ⚠️ **Common mistake:** Implementing notifications feature-by-feature as you build each one, resulting in inconsistent formatting, inconsistent tone, and — easiest to miss — some events that quietly never got a notification trigger wired up at all. Use this table as your audit checklist against actual code, not memory.

---

## Email Only — And Why That's the Right Scope, Not a Shortcut

Messaging System already established this principle for message notifications; it applies system-wide. Push notifications require a mobile app you don't have. In-app-only notifications require a user to be actively checking, which your Seller Journey module already flagged as an unreliable assumption for new sellers.

| Channel | Personal-Mode Verdict |
|---|---|
| Email | Yes — sufficient, reliable, zero new infrastructure |
| Push notifications | No — requires a mobile app, out of scope |
| SMS | No — added cost and complexity disproportionate to early value |
| In-app only | No, not as the sole channel — pairs fine with email, but shouldn't replace it |

---

## One Notification Service, Not Scattered Send Calls

> ✅ **Best practice:** Build a single, central notification function (or small service) that every domain calls — `notify(event_type, recipient, context)` — rather than each domain (messaging, payments, disputes) independently calling your email provider's SDK. This mirrors the domain-organized backend principle from the Backend module, but for cross-cutting concerns: one place to manage templates, one place to add a delivery channel later, one place to debug a missing email.

---

## Templates: Honest and Specific, Not Generic

Every notification should tell the recipient exactly what happened and, where relevant, what's expected of them next — directly extending the "reflect status honestly" principle from Frontend.

| Notification | Should Include |
|---|---|
| New message | Sender name, listing context, link to the thread |
| Listing rejected | The specific reason, if recorded (per Listing System) |
| Dispute flagged | What was flagged, a link to the relevant thread, the 48-hour expectation from Marketplace Policies |
| Funds released | The net amount, matching what was shown in the pre-listing fee preview from Payments |

> 💡 **Tip:** A generic "Something happened on YourMarketplace" email forces the recipient to log in just to find out what — adding exactly the friction your Seller Journey module spent effort removing elsewhere. Specificity in the notification itself is what makes email a sufficient channel without needing push notifications.

---

## Don't Over-Notify

> ⚠️ Every notification sent that the recipient doesn't actually need trains them to ignore your emails — including the ones that matter, like a dispute flag. Only send notifications for the events in the table above; resist adding "nice to know" notifications (e.g. "someone viewed your listing") that add noise without adding the kind of trust or urgency your Phase 1 planning was built around.

---

## AI Prompt: Building the Notification Service

```
I'm building a personal-scale marketplace using [your stack] and
[your email provider/service]. I need to send these notifications:
new message, listing approved/rejected, purchase completed (both
parties), funds released, dispute flagged, dispute resolved.

Build a single central notification function/service that:
1. Takes an event type, recipient, and context, and sends the
   appropriate templated email
2. Is called from each domain (messaging, listings, payments,
   disputes) rather than each domain calling the email provider
   directly
3. Includes specific, honest content per the table above — not
   generic "something happened" messages
4. Has templates for each of the six event types listed

Then audit my existing code [paste relevant snippets if available]
and tell me which of these six events aren't actually triggering a
notification yet.
```

---

## Common Mistake: Treating This as Low-Priority Polish

> ⚠️ Notifications often get pushed to "later" because the core feature (messaging, payments) technically works without them — you can always go check manually. But manual-checking-as-the-default is exactly what your Seller Journey module identified as a churn risk for early sellers. This module isn't polish; it's the difference between a system that works and a system people actually use.

---

## What You Should Walk Away With

1. A single, central notification service used by every domain
2. All six core event types confirmed actually wired up, audited against the table above
3. Specific, honest templates — not generic placeholders
4. Confirmed email-only scope, with push/SMS correctly deferred

Search, next, returns to a Phase 2-specified feature (Search Architecture) for its actual implementation — building the keyword, category, and price-range search experience against your finalized Listing schema.
