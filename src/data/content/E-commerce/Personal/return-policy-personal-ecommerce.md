---
title: Return Policy
slug: return-policy
phase: Phase 5
mode: personal
projectType: ecommerce
estimatedTime: 10-15 min
---

# Return Policy

Refund Policy answered "do I get my money back, and how." Return Policy answers "how does the actual item get back to you first." For physical goods, this is the operational counterpart that has to work in practice — not just read well on a page.

---

## Where This Fits

This connects directly to your Shipping Setup module — return shipping is, mechanically, just shipping in the other direction, using carrier accounts you've already set up. If you haven't decided who pays for return shipping, that decision belongs here.

---

## Why This Matters for a Store Specifically

A refund policy with no clear return process creates exactly the kind of back-and-forth email exchange a solo store owner has the least capacity to handle well. A defined process — same one, every time — is what keeps returns from eating disproportionate time relative to how rarely they actually happen.

> ** Tip:** Returns are typically a small percentage of total orders for most product categories. The cost of a clear, repeatable process is mostly upfront (writing it once); the cost of *not* having one is paid repeatedly, in ad-hoc time, every single time a return happens.

---

## What You're Building Today

- A clear return eligibility window and condition requirements (unopened, original packaging, etc., if applicable)
- A defined process: how a customer initiates a return, who pays for return shipping, how you confirm receipt
- Handling for non-returnable categories, if you sell anything in that category (perishables, made-to-order, intimate goods, digital products)
- A repeatable internal workflow so you're not improvising each time

You're **not** building automated return-label generation or a self-service returns portal — reasonable additions later, but not necessary at personal-store volume.

---

## The Questions a Return Policy Must Answer

| Question | Why It's Asked |
|---|---|
| What condition must the item be in? | Unworn, unopened, with tags, etc. — sets clear expectations |
| Who pays for return shipping? | Major factor in customer's purchase confidence |
| How does the customer start a return? | Email, account dashboard, specific instructions |
| How do you confirm the item arrived back before refunding? | Protects against refunding before the item is actually returned |
| What's explicitly non-returnable? | Perishables, made-to-order, opened intimate goods, digital downloads |

> **️ Warning:** Don't promise to refund before confirming the returned item has actually arrived back in acceptable condition. Your policy and your actual process (and your code, if return status is tracked in your order system) should require confirmed receipt before the refund is issued.

---

## Who Pays for Return Shipping

| Approach | Customer Trust Impact | Cost to You |
|---|---|---|
| Customer pays return shipping | Lower trust signal, but lowest direct cost | Lowest |
| **You provide a prepaid return label, deducted from refund or absorbed** | Higher trust, standard expectation in many categories | Moderate, predictable |
| Free returns, no deduction | Highest trust signal | Highest cost — usually only sustainable at scale or higher margins |

> ** Best Practice:** For a personal store with tight margins, "customer pays return shipping, or it's deducted from the refund" is a reasonable, common middle ground — it doesn't damage trust the way "no returns accepted" does, while staying sustainable at low volume.

---

## Implementation

**Copy Prompt:**

```
Help me write a return policy for my e-commerce store, matching my
actual operations:

Return window: [your decision, e.g. 30 days]
Item condition requirements: [unworn, original packaging, etc.]
Who pays return shipping: [customer / prepaid label deducted / free]
Non-returnable categories: [list, if any — perishable, made-to-order,
digital, opened intimate goods, etc.]
Carrier/labels available: [from your Shipping Setup module]

Write a clear, step-by-step process a customer can follow: how to
request a return, what to expect, and how/when the refund is issued
once the item is confirmed received.
```

---

## The Internal Workflow You Actually Need

A return shouldn't require re-deciding the process each time:

1. Customer requests a return via [your defined method] within the window
2. You approve and provide instructions (and a prepaid label, if that's your policy)
3. Customer ships the item back
4. You confirm receipt and inspect condition
5. Refund is issued per your Refund Policy, referencing the confirmed return

> ** Tip:** Track return status on the order record itself (requested → approved → received → refunded), even if your admin tooling is simple. A return with no tracked status is the easiest kind of request to lose track of when you're running the store solo.

---

## Common Mistakes

- "No returns accepted" with no exceptions — a strong trust-damaging signal for an unfamiliar new store, and often inconsistent with payment provider or jurisdiction expectations for physical goods
- Refunding immediately upon return request, before confirming the item was actually shipped back or received
- No clear non-returnable category list, leading to disputes over items that reasonably shouldn't be returnable (opened intimate goods, perishables)
- Return process requiring back-and-forth email with no defined steps, consuming disproportionate solo-owner time per return
- Return shipping cost policy left undefined until the first real return forces an improvised, inconsistent decision

---

## Validation Checklist

- [ ] Return window and condition requirements are explicit and visible before purchase
- [ ] Return shipping cost responsibility is clearly stated, not left ambiguous
- [ ] Non-returnable categories are explicitly listed if relevant to your product line
- [ ] Process requires confirmed receipt before refund is issued, matching the Refund Policy
- [ ] You've walked through the full process once, end to end, including generating a return label if that's part of your policy

---

## AI Review Prompt

```
Review this return policy against my actual operations:

Return window: [your value]
Return shipping responsibility: [your decision]
Non-returnable items: [list]
Refund trigger: [confirmed receipt / other]

Check for:
1. Any inconsistency between this Return Policy and the Refund Policy
   already written
2. Whether the process is simple enough to actually execute solo,
   without excessive manual back-and-forth
3. Any product category I sell that should be marked non-returnable
   but isn't
```

---

## What Comes Next

Your legal and policy foundation is complete. Next: **Launch Checklist** — the final pass across every phase before your store goes live to real customers.
