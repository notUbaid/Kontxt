---
title: Terms of Service
slug: terms-of-service
phase: Phase 5
mode: personal
projectType: ecommerce
estimatedTime: 15-20 min
---

# Terms of Service

Your privacy policy covers what data you collect. Terms of Service cover everything else: what a customer can expect from your store, what you're not liable for, and the rules governing how your site can be used. Where the privacy policy is about data, this is about the relationship.

As with the previous module, this is not legal advice — it's the practical baseline a personal store needs before accepting real orders.

---

## Where This Fits

Terms of Service references decisions from across your build: your return/refund policy (covered next), your account rules from Phase 3, and your actual order fulfillment process. Like the privacy policy, this is written to match what your store actually does, not a generic template.

---

## Why This Matters for a Store Specifically

Without terms of service, you have no stated boundaries around:

- Order cancellation and modification rights
- What happens if a product is out of stock after an order is placed
- Limitation of liability if a product causes damage or doesn't perform as expected
- Rules around account use, fraud, and abuse — backing up the technical protections from Phase 4

> ** Tip:** Terms of Service is also where you formally state things you've already built protections for — like your right to cancel an order you suspect is fraudulent (from your Fraud Prevention module). The technical capability and the stated right to use it should match.

---

## What You're Building Today

- A terms of service page covering order acceptance, pricing, cancellation, and liability
- Explicit linkage to your return/refund policy (the next module) rather than duplicating it here
- Account usage rules, consistent with what your account system in Phase 3 actually allows
- A clear, accurate statement of your right to refuse or cancel suspicious orders, matching your Fraud Prevention flagging process

You're **not** drafting custom liability clauses for a complex business, handling international consumer protection law variations, or building anything beyond what a reputable generator covers for a personal store.

---

## What Actually Needs to Be Covered

| Section | What It Should Say (for your store) |
|---|---|
| Order acceptance | An order isn't a guaranteed sale until confirmed — covers the rare case of an out-of-stock item slipping through |
| Pricing errors | You reserve the right to cancel and refund an order if a price was clearly listed in error |
| Cancellation | When and how a customer can cancel before fulfillment, and when you can cancel a suspicious order |
| Liability limitation | Your liability is limited to the order value — standard, reasonable for a personal store |
| Account terms | Brief reference to acceptable use, consistent with your account system |
| Intellectual property | Product photos/descriptions are yours — basic protection against scraping |

> **️ Warning:** Don't state a stronger commitment than your store can actually fulfill — for example, promising same-day cancellation processing if your fulfillment process doesn't actually support that. Terms should describe real operational capability, not aspirational service levels.

---

## Choosing Your Approach

| Approach | Accuracy | Effort | Best For |
|---|---|---|---|
| Generic copy-pasted template | Low — often mismatched to actual store operations | None | Not recommended |
| **Generator (Termly, GetTerms, similar), filled in accurately** | High, if filled in correctly | Low | Most personal stores (recommended) |
| Custom-drafted with a lawyer | Highest | High cost | Stores with real legal/financial exposure |

Same logic as the privacy policy: a reputable generator, filled in with your store's actual operational details, is the right scope here.

---

## Implementation

**Copy Prompt:**

```
Help me prepare accurate Terms of Service for a personal e-commerce
store. Here's how my store actually operates:

- Order cancellation window: [describe, e.g. "before order ships,
  customer can cancel via account dashboard"]
- Pricing error handling: [describe, e.g. "we reserve the right to
  cancel and refund if price was listed in error"]
- Fraud/suspicious order handling: [reference your Fraud Prevention
  flagging process — orders are flagged for manual review, not
  auto-rejected]
- Account rules: [reference your account system from Phase 3]

I'm using a Terms of Service generator and need help filling it in
accurately, and confirming I'm not promising anything my actual
operations can't support.
```

> **️ Warning:** Don't let AI generate liability or cancellation language from generic defaults without checking it against your actual fulfillment process. If your terms say "orders ship within 24 hours" but your real process doesn't guarantee that, you've created a commitment your operations can't reliably meet.

---

## Common Mistakes

- Copying terms from a much larger store that reference services or guarantees a personal store doesn't actually provide
- Stating fulfillment timelines or service levels that don't match real operational capability
- Not linking terms of service from checkout — many jurisdictions expect agreement to terms to be presented before purchase, not buried in a footer
- Writing fraud/cancellation rights that don't match what the Fraud Prevention module actually implemented (e.g., claiming auto-rejection when the real process is manual review)
- Treating Terms of Service and Privacy Policy as interchangeable — keep data handling in the privacy policy and operational/legal terms here, link between them rather than duplicating

---

## Validation Checklist

- [ ] Cancellation terms match what the account/order system actually allows a customer to do
- [ ] Fraud/order-refusal language matches the actual Fraud Prevention process (manual review, not auto-block, unless that changed)
- [ ] No fulfillment or service-level promise exceeds actual operational capability
- [ ] Terms are linked from checkout, not just the footer
- [ ] You've read the generated terms once yourself, end to end

---

## AI Review Prompt

```
Review these Terms of Service against how my e-commerce store actually
operates:

[paste your operational details from the prompt above]

Check specifically:
1. Does any clause promise a service level or timeline my actual
   process doesn't support?
2. Does the fraud/order-cancellation language match my real process
   (manual review, not auto-rejection)?
3. Is liability limitation reasonable and not missing for a store that
   sells physical or digital goods?
4. Is anything generic or mismatched to a personal, solo-run store?
```

---

## What Comes Next

With your legal foundation in place, the next modules turn to making products themselves ready to sell. Next: **Product Photography** — presenting your catalog in a way that builds trust without requiring a professional studio.
