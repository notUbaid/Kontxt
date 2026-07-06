---
title: Fraud Prevention
slug: fraud-prevention
phase: Phase 4
mode: personal
projectType: marketplace
estimatedTime: 20 min
---

# Fraud Prevention

Security protects your app from being broken into. Fraud prevention protects your marketplace from being used *correctly, but dishonestly* — fake listings, payment abuse, scam transactions between real users with valid accounts. These attacks don't exploit bugs; they exploit trust, which makes them a business-logic problem as much as a technical one.

This is the last line of defense before real money and real reputation are on the line.

---

## Fraud Is Different From the Security You've Already Built

> ** Core distinction:** Security (your earlier module) stops someone from accessing data they shouldn't. Fraud prevention stops someone from *legitimately* using features exactly as designed, for a dishonest purpose. A scammer creating a real account, posting a real listing for a fake product, isn't bypassing any authorization check — they're using your marketplace correctly.

| Attack | Security gap? | Fraud pattern |
|---|---|---|
| Editing someone else's listing via ID manipulation |  Yes — IDOR | No |
| Listing a product that doesn't exist to collect payment and never ship | No |  Yes |
| Buyer claims "item not received" after receiving it, to get a refund | No |  Yes |
| Account takeover via stolen credentials |  Yes | Sometimes overlaps |
| Fake reviews to inflate seller reputation | Partially (already blocked structurally in Reviews) |  Yes |

---

## Common Marketplace Fraud Patterns

| Pattern | How it works | Primary defense |
|---|---|---|
| **Non-delivery scam** | Seller takes payment, never ships/delivers | Escrow-style payment release (covered in Payments), order confirmation flow |
| **Friendly fraud** | Buyer receives item, falsely disputes/chargebacks anyway | Delivery confirmation, photo evidence on disputes, payment processor's dispute tools |
| **Fake/duplicate accounts** | One person creates many accounts to manipulate reviews or bypass bans | Email verification, basic device/IP pattern detection |
| **Listing fraud** | Fake or misleading listings to lure payment | Reuse the input validation from Listings, add reporting tools |
| **Review manipulation** | Coordinated fake positive reviews, or retaliatory negative ones | Already structurally blocked — review requires a completed order (Reviews module) |

---

## Decision: How Much Fraud Tooling to Build

> ** Decision Card — Fraud Prevention Investment**
>
> **Option A: Rely on your payment processor's built-in fraud tools**
> Stripe, PayPal, and similar processors already run sophisticated fraud detection (Stripe Radar, for example) on every transaction — meaningful protection with zero custom code.
>
> **Option B: Build custom fraud scoring/detection**
> Real businesses eventually need this, but it requires data volume and ML expertise that doesn't make sense for a personal project's transaction volume.
>
> **Option C: Manual review + reporting tools**
> Let users report suspicious listings/users, and review reports yourself. Low-tech, but effective at personal-project scale where you can plausibly review every report.
>
> **For Personal Mode: combine A and C.** Lean entirely on your payment processor for transaction-level fraud detection — don't try to rebuild what Stripe Radar already does well. Add lightweight reporting tools so users can flag suspicious behavior, and review those manually yourself.

---

## Order Confirmation: Closing the Non-Delivery Gap

The single highest-leverage fraud defense for a marketplace is a confirmation step between payment and final fund release — this directly extends the order lifecycle you'll formalize in Payments.

```
Payment captured → Order: "pending_delivery"
                         ↓
Buyer confirms receipt → Order: "completed" → Seller payout released
                         ↓
No confirmation within N days → Order auto-completes (with buyer notification first)
```

> ** Why this matters:** without a confirmation step, payment capture and fund release happen at the same moment — meaning a non-delivering seller has already been paid before the buyer even knows something's wrong. A confirmation step (even a simple one) gives buyers a structural way to flag non-delivery before money is fully released.

```js
async function autoCompleteStaleOrders() {
  const staleOrders = await db.order.findMany({
    where: {
      status: "pending_delivery",
      createdAt: { lt: daysAgo(14) }, // adjust to your marketplace's typical delivery window
    },
  });

  for (const order of staleOrders) {
    // Notify buyer before auto-completing, giving a final window to dispute
    await notifyBuyer(order, "Your order will auto-complete in 48 hours unless you report an issue.");
  }
}
```

---

## Reporting Tools: Cheap, High-Leverage

> ** Validation Checklist**
- [ ] Can a user report a listing as suspicious/fraudulent, with a short reason field?
- [ ] Can a user report another user (not tied to a specific listing — e.g. suspicious messages)?
- [ ] Does a report notify you (the admin) somewhere you'll actually see it — not just write silently to a database table you forget to check?
- [ ] Is there a simple way to act on a report — suspend a listing or user — without needing direct database access?

```prisma
model Report {
  id          String   @id @default(cuid())
  reporterId  String
  targetType  String   // "listing" | "user" | "message"
  targetId    String
  reason      String
  status      String   @default("open") // open | reviewed | actioned
  createdAt   DateTime @default(now())
}
```

This connects to the Admin Panel you'll build later — reports need a place to actually be reviewed and acted on, not just stored.

---

## Signals Worth Tracking (Without Overbuilding)

You don't need a fraud-scoring model. A few simple signals, reviewed manually, catch most personal-project-scale fraud:

> ** Validation Checklist**
- [ ] New account + immediately listing high-value items → worth a second look, not an automatic block
- [ ] Multiple accounts from the same email pattern or rapid signup bursts from one IP → possible fake account farming
- [ ] A seller with many `non-delivery` reports across different buyers → pattern, not coincidence
- [ ] Price significantly below market for the category → classic scam-listing signal, but also sometimes a genuinely great deal — flag for review, don't auto-remove

> **️ Warning:** Resist the urge to auto-block based on these signals at personal-project scale. False positives (banning a legitimate user) cost you more in trust than letting one borderline case through to manual review. Flag, don't punish automatically, until you have enough data to be confident.

---

## AI Prompt: Build Reporting and Order Confirmation

> ** Copy Prompt**
>
> ```
> Add fraud prevention tooling to my marketplace project. This is a personal project —
> rely on my payment processor's built-in fraud detection, don't build custom scoring.
> Stack: [YOUR STACK].
>
> Requirements:
> 1. A Report model and endpoint: users can report a listing, user, or message with a reason
> 2. An order status flow: pending_delivery → completed, with buyer confirmation required,
>    auto-completing after [N] days with a notification sent before auto-completion
> 3. A simple admin notification (email or log) when a new report is submitted
> 4. Reuse my existing requireAuth middleware — reports require authentication
>
> Existing Order and Listing schemas:
> [PASTE YOUR SCHEMAS]
> ```
>
> **Why this prompt works:** explicitly stating "rely on my payment processor's fraud detection, don't build custom scoring" prevents AI from generating an overengineered fraud-scoring system that's inappropriate for a personal project's data volume and genuinely hard to get right without real transaction history to tune against.

---

## Validating AI Output Here

> ** Common Hallucination:** AI sometimes suggests automatically suspending accounts or listings based on report count thresholds (e.g. "auto-ban after 3 reports"). At low volume, this is trivially abusable — a small group of bad-faith users can coordinate reports to take down a legitimate competitor's listings. Reports should queue for human review, not trigger automatic punitive action, until you have enough volume and pattern data to trust automation.

---

## Token Efficiency Tip

Fraud prevention overlaps heavily with Payments (order status) and Admin Panel (acting on reports) — build this module's pieces in the same conversation as whichever of those you tackle next, rather than treating it as fully isolated. The order status flow especially should be designed once, not redesigned separately in each module that touches it.

---

## What You've Decided

By the end of this module you should have:

- A clear separation in your own thinking between security gaps and fraud patterns
- An order confirmation step that prevents instant fund release on payment alone
- Lightweight reporting tools for listings, users, and messages
- A short list of fraud signals worth a manual second look, without automatic punitive action
- Reliance on your payment processor's fraud detection instead of custom scoring

**Next:** Scalability Planning — thinking ahead about what breaks as your marketplace grows, without over-building for scale you don't have yet.
