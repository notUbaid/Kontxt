---
title: Dispute Resolution
slug: dispute-resolution
phase: Phase 2
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Dispute Resolution

## The System That Makes Your Policy Real

Marketplace Policies defined the rule: buyer and seller resolve directly, then contact you for mediation after 48 hours. Payments Architecture built the financial mechanism (held release) that makes refunds possible. This module connects them — the actual flow a disagreement follows from "something's wrong" to "resolved."

Without this, your policy is a sentence on a page no system actually enforces, and your held funds have no defined process for being released or returned.

---

## Disputes Don't Need New Infrastructure — They Need a Status

A dispute isn't a separate entity bolted onto your app. It's a state your existing Transaction entity moves into, building directly on the state machine from Architecture Fundamentals.

```
Initiated → Payment Held → Completed
                ↓
            Disputed → Resolved (Refunded / Released / Partial)
```

| Status | What It Means | Who Can Trigger It |
|---|---|---|
| Disputed | Buyer or seller has flagged a problem | Either party, within a defined window |
| Resolved – Refunded | You (or auto-rule) decided buyer gets money back | You, after mediation |
| Resolved – Released | You decided seller keeps the funds | You, after mediation |
| Resolved – Partial | Split outcome | You, manually, via Stripe's partial refund capability |

>  **Best practice for personal mode:** A dispute is just a Transaction with status = "Disputed" plus a linked reason/note field. Don't build a separate dispute-ticket system — extend what you already have.

---

## The Flow, Matched to Your Policy

This is the literal implementation of the 48-hour rule from Marketplace Policies:

1. Buyer or seller flags an issue → Transaction status becomes "Disputed," a reason is recorded
2. Both parties are encouraged to resolve directly via the Messaging System thread already tied to this transaction
3. If unresolved after 48 hours (or either party explicitly escalates), it surfaces to you
4. You review the message thread, transaction details, and listing — then make a call
5. You execute the outcome: refund via Stripe, release held funds, or a partial split

>  **Tip:** Because Threads are already linked to transactions through the Listing relationship, you don't need new tooling to "see the conversation" during mediation — your existing Messaging System data is the dispute evidence. This is exactly why building these modules in dependency order pays off.

---

## What Surfaces a Dispute to You

At personal-mode scale, this can be genuinely simple — you don't need an automated escalation engine.

| Mechanism | Effort |
|---|---|
| A "Report a problem" action on a transaction, emailing you directly | Low — reuses the reporting pattern from Trust & Safety Planning |
| A scheduled check for transactions stuck in "Disputed" past 48 hours | Low-medium — a simple query you can run manually or on a basic schedule |
| Manual review during a daily check-in | Zero build cost, viable while volume is genuinely low |

> ️ **Common mistake:** Building automated dispute resolution rules (e.g. "auto-refund if X") before you've personally mediated even a handful of real disputes. You don't yet know what your actual dispute patterns look like. Mediate manually first — the patterns you observe should inform any automation later, not the reverse.

---

## Recording the Outcome — Don't Just Resolve and Forget

Every dispute resolution should leave a record: what happened, what you decided, why. This isn't bureaucracy — it's what lets you spot patterns (a specific seller with repeat disputes, a specific listing type that causes confusion) that should feed back into your Trust & Safety enforcement ladder or your Listing System's required fields.

- Reason for the dispute, recorded at flag time
- Resolution outcome and your reasoning, recorded at close time
- A link from this record back to the User's account status, in case a pattern justifies a Trust & Safety action (suspension)

---

## AI Prompt: Implementing the Dispute Flow

```
I'm building a personal-scale marketplace for [your niche] using
[your stack]. I already have a Transaction entity with statuses
(Initiated, Payment Held, Completed), and a Messaging System with
Threads linked to transactions.

Implement:
1. A "Disputed" transaction status, with a reason field
2. A "flag dispute" action either party can trigger, which notifies
   me and links to the relevant message thread
3. Resolution actions I can take: refund (full), release (full), or
   partial split — each updating transaction status to a clear
   resolved sub-state and recording my reasoning
4. A way to see transactions stuck in "Disputed" past 48 hours,
   even if it's just a simple query I run manually for now

Don't build automated resolution rules — every dispute should route
to me for manual review at this stage.
```

---

## Common Mistake: No Defined Timeframe, Just "We'll Handle It"

> ️ A dispute process without a stated response commitment frustrates both buyer and seller more than the original problem does. Even a simple, honestly-achievable commitment ("flagged disputes reviewed within 48 hours") sets expectations you can actually meet solo — silence is what erodes trust fastest, not slowness itself.

---

## What You Should Walk Away With

1. Disputed/Resolved states added to your existing Transaction state machine
2. A flagging mechanism that notifies you and links to the relevant message thread
3. Resolution actions (refund, release, partial) that update status and record reasoning
4. A stated, achievable response-time commitment

This closes out the core trust-and-money mechanics of Phase 2. Next: Demo Transactions, where you'll build a small set of seeded, realistic transactions to test this entire flow — listing, messaging, payment, and dispute — end to end before writing any more production features.
