---
title: Refund Policy
slug: refund-policy
phase: Phase 5
mode: personal
projectType: ecommerce
estimatedTime: 10-15 min
---

# Refund Policy

This is one of the first things a hesitant customer checks before buying from a store they've never heard of. A clear, fair refund policy is a trust signal as much as a legal document — and for a new store with no reviews yet, trust signals matter more than usual.

Refund Policy and Return Policy are closely related but answer different questions: Refund Policy covers *getting money back*; Return Policy (next module) covers *the physical process of sending an item back*. Many stores combine them into one page — that's fine, as long as both questions are clearly answered.

---

## Where This Fits

This connects to your actual payment processing setup (Phase 4) and order management (Phase 3). The policy needs to describe a refund process your code can actually execute — not an aspirational one.

---

## Why This Matters for a Store Specifically

> ** Tip:** A visible, fair refund policy measurably reduces purchase hesitation, especially for first-time customers on an unfamiliar store. Customers assume the *absence* of a clear policy means refunds will be difficult, even if that's not true — silence reads as risk.

Beyond trust, most payment providers and many jurisdictions expect refund terms to be disclosed before purchase, not improvised after a complaint.

---

## What You're Building Today

- A clear, specific refund policy: what qualifies, what timeframe, how it's processed
- A refund policy that matches what your actual payment/order system can do
- Clarity on partial vs full refunds, and shipping cost handling
- A policy that's visible *before* purchase, not just discoverable after a complaint

You're **not** writing custom legal language for complex dispute scenarios — a clear, reasonable, generator-assisted policy is the right scope for a personal store.

---

## The Questions a Refund Policy Must Answer

| Question | Why It's Asked |
|---|---|
| What qualifies for a refund? | Defective item, wrong item, simple change of mind — each may have different terms |
| What's the time window? | Customers check this before buying, not just after a problem |
| Full or partial refund? | Does shipping cost get refunded too? |
| How is the refund issued? | Original payment method, store credit, or both? |
| How long does processing take? | Sets expectations and reduces "where's my refund" follow-ups |

> **️ Warning:** Don't promise a refund timeframe your payment provider can't actually support. Card refunds typically take several business days to appear on a customer's statement after you issue them — your policy should reflect that processing reality, not an idealized instant turnaround.

---

## Choosing Your Approach

| Policy Style | Customer Trust Impact | Operational Cost | Best For |
|---|---|---|---|
| No stated policy / case-by-case only | Lowest trust, highest hesitation | Unpredictable | Not recommended |
| **Clear, moderately generous policy (e.g., 30-day, full refund minus original shipping)** | High trust, predictable | Low, predictable | Most personal stores (recommended) |
| Strict, narrow policy | Lower trust, more disputes | Lower direct cost, higher dispute/chargeback risk | Higher-risk or custom/made-to-order goods only |

> ** Best Practice:** A more generous, clearly stated policy often costs less in practice than a strict one — strict policies tend to push frustrated customers toward payment disputes/chargebacks instead, which usually cost more (in fees and account risk) than the refund would have.

---

## Implementation

**Copy Prompt:**

```
Help me write a refund policy for my e-commerce store, matching how my
actual systems work:

Payment provider: [Stripe / etc.]
Order/refund processing: [describe how refunds are actually issued in
your admin — manual, automated, etc.]
Product type: [physical goods, made-to-order, digital, etc. — affects
what's reasonable]

Write a clear policy covering:
1. What qualifies for a refund and the time window
2. Whether shipping costs are refunded
3. How and when the refund is issued, accurate to real payment
   processing timelines (several business days for card refunds, not
   instant)
4. Any reasonable exceptions (e.g., final sale items, if applicable)

Keep it specific and customer-readable, not legal boilerplate.
```

> **️ Common Mistake:** Don't let AI default to a generic "30 days, no questions asked" policy without checking it against what's actually reasonable for your specific products — made-to-order or perishable goods, for instance, often warrant different terms than standard retail items, and the policy should say so explicitly rather than overpromising.

---

## Common Mistakes

- No refund policy at all, leaving customers to assume the worst and hesitate at checkout
- Promising instant refunds when card processing realistically takes several business days
- Refund policy that doesn't match what the actual order/payment system supports — e.g., promising partial refunds the admin dashboard has no way to issue
- Burying the policy somewhere customers won't find it before purchase, rather than linking it from product or checkout pages
- A policy so strict it pushes customers toward payment disputes instead of direct refund requests — often the costlier outcome

---

## Validation Checklist

- [ ] Refund policy is linked from checkout and/or product pages, not just buried in the footer
- [ ] Stated refund timeframe matches real payment provider processing time
- [ ] Policy matches what your admin/order system can actually execute (full vs partial refunds, shipping cost handling)
- [ ] Any product-specific exceptions (made-to-order, final sale) are explicitly stated, not assumed
- [ ] You've personally walked through issuing a test refund in your admin to confirm the process matches what the policy describes

---

## AI Review Prompt

```
Review this refund policy against my actual store setup:

Payment provider: [provider]
Refund processing capability: [describe]
Product types: [describe]

Check for:
1. Any promised timeframe that doesn't match realistic payment
   processing speed
2. Any capability promised (partial refunds, specific refund methods)
   that my actual system might not support
3. Whether the policy is reasonable enough to reduce chargeback risk,
   or strict enough to encourage disputes instead
```

---

## What Comes Next

Refunds are about money. Next: **Return Policy** — the physical process of how an item actually gets back to you before that refund is issued.
