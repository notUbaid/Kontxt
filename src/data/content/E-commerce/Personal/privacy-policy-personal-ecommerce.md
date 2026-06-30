---
title: Privacy Policy
slug: privacy-policy
phase: Phase 5
mode: personal
projectType: ecommerce
estimatedTime: 15-20 min
---

# Privacy Policy

Phase 4 made your store fast, protected, and reliable. Phase 5 makes it legally launchable. A privacy policy is the first piece, because every other launch step — analytics, email marketing, even checkout itself — depends on having one in place first.

This module is not legal advice, and nothing here substitutes for a lawyer if your store grows into something with real legal exposure. The goal is getting a real, accurate, store-specific policy live before you accept your first order — not a perfect one.

---

## Where This Fits

This connects directly to decisions you've already made throughout the build: what data you collect at signup, what you store for orders and addresses, which third parties you send data to (payment provider, email service, analytics). A privacy policy describes what your store *actually does* — it has to be written after the architecture, not before.

---

## Why This Matters for a Store Specifically

A store collects more personal data than most personal projects: names, emails, shipping addresses, order history, and indirectly, payment information (even if you never touch the card number yourself, your payment provider does, on your behalf). Most jurisdictions require disclosure of this regardless of store size — there is generally no "too small to need a privacy policy" exemption.

> **⚠️ Warning:** Payment providers themselves often require a privacy policy and terms of service to be live on your site before they'll let you go from test mode to live transactions. This isn't optional groundwork — it can be a literal blocker to accepting real payments.

---

## What You're Building Today

- A privacy policy page, accurate to what your store actually collects and does
- A clear list of every third party that receives customer data (payment provider, email service, hosting/analytics)
- Plain-language explanation of what data is collected, why, and how long it's kept
- A way for customers to request account/data deletion, consistent with the account deletion you already built in Phase 3

You're **not** writing a custom legal document from scratch, and you're **not** trying to cover every possible jurisdiction's specific requirements. A solid generator-based policy, accurately filled in, is the right scope here.

---

## What Actually Needs to Be Disclosed

Walk through your own store and list every place customer data goes:

| Data | Collected Where | Sent To |
|---|---|---|
| Name, email | Signup, checkout | Your database, auth provider |
| Shipping/billing address | Checkout, address book | Your database, shipping carrier (at fulfillment) |
| Payment details | Checkout | Payment provider only — never your own server |
| Order history | Every purchase | Your database |
| Browsing/analytics data | Site visits | Analytics provider, if used |
| Marketing email opt-in | Checkout or account | Email service provider, if used |

> **💡 Tip:** This table *is* most of the content your privacy policy needs to cover. Fill it in accurately for your actual stack before writing anything — a generic privacy policy that doesn't match what your store actually does is arguably worse than none, since it's inaccurate.

---

## Choosing Your Approach

| Approach | Accuracy | Effort | Best For |
|---|---|---|---|
| Generic copy-pasted template | Low — likely wrong for your specific stack | None | Not recommended |
| **Privacy policy generator (Termly, GetTerms, similar) filled in accurately** | High, if filled in correctly | Low | Most personal stores (recommended) |
| Custom-drafted with a lawyer | Highest | High cost | Stores with real legal/financial exposure |

For a personal store, a reputable generator filled in with your actual data table above gives you an accurate, reasonably compliant policy without overbuilding.

---

## Implementation

**Copy Prompt:**

```
Help me prepare an accurate privacy policy for a personal e-commerce
store. Here's exactly what my store collects and where it goes:

[paste your filled-in data table from above]

I'm using a privacy policy generator and need to fill it in correctly.
Walk me through:
1. Which sections of a standard e-commerce privacy policy apply to
   my specific setup, based on the table above
2. What to write for data retention (how long I keep order/account
   data) given I [describe your actual retention plan, or ask for a
   reasonable default for a personal store]
3. How to describe the account deletion process I already built, in
   plain language a customer would understand
4. Whether anything in my setup (e.g., specific analytics or email
   tools) requires a specific disclosure I might not know about
```

> **⚠️ Warning:** Don't let AI invent your data retention period, third-party list, or deletion process from assumptions — feed it the actual table of what your store does. A privacy policy describing data handling that doesn't match reality is a liability, not a protection.

---

## Common Mistakes

- Copy-pasting a competitor's or template's privacy policy without changing it to match your actual data collection
- Listing third parties generically ("we may share data with partners") instead of naming the actual services used (specific payment provider, specific email service)
- Promising a data deletion process in the policy that doesn't actually exist in the product yet
- Forgetting to mention the payment provider at all, since payment data feels like it "isn't really collected" by you — it still needs disclosure, since the customer is still trusting your checkout flow
- Publishing the policy but never linking to it from checkout, signup, or the site footer, where it's actually required to be visible

---

## Validation Checklist

- [ ] Every third party from your data table is named specifically in the policy
- [ ] The account deletion section matches what your account deletion feature actually does (no over-promising)
- [ ] Data retention period stated matches your actual backup/database retention from the Backups module
- [ ] Policy is linked from the site footer, checkout page, and signup form — not just published on an unlinked URL
- [ ] You've read the full generated policy once yourself — not just generated and published unread

---

## AI Review Prompt

```
Review this privacy policy against what my e-commerce store actually
does, based on this data table:

[paste your filled-in data table]

Check specifically:
1. Does the policy mention every third party in the table, by name?
2. Does it promise any capability (deletion, data export, opt-out)
   that the product doesn't actually have yet?
3. Is the data retention statement consistent with the actual backup
   retention from my Backups setup?
4. Is anything vague or generic in a way that doesn't reflect my
   specific stack?
```

---

## What Comes Next

With your privacy policy accurate and live, next: **Terms of Service** — the agreement that governs what customers can expect from your store, returns, and acceptable use.
