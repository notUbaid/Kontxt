---
title: Legal Documents
slug: legal-documents
phase: Phase 5
mode: production
projectType: ecommerce
estimatedTime: 15-20 min
---

# Legal Documents

Privacy Policy and Terms of Service cover the two foundational documents. This module rounds out the remaining store-specific disclosures — smaller, but each closes a real gap if missing. Refund Policy and Return Policy get their own dedicated modules next, so they're intentionally not covered here.

As with the previous legal modules, this isn't a substitute for jurisdiction-specific legal advice — it's the practical checklist for what a personal store typically still needs after the two big documents are done.

---

## Where This Fits

This is a coverage check across decisions you've already made: cookies/analytics (Phase 5 Analytics Setup), accessibility work (Phase 1), and basic business identity. The goal is making sure nothing required is silently missing.

---

## The Documents Worth Checking

| Document | Needed If... | Why |
|---|---|---|
| **Cookie Policy / Banner** | You use analytics or marketing cookies (you do, from the Analytics Setup module) | Many jurisdictions require disclosure and, in some cases, consent before non-essential cookies load |
| **Accessibility Statement** | Always worth including for a public store | States your commitment and a contact path for accessibility issues — backs up the work from Phase 1 |
| **Shipping Policy** (customer-facing) | You ship physical goods | Distinct from your Terms — this is the specific, detailed page customers check before buying: timelines, carriers, what happens with delays |
| **Business Disclosure / Imprint** | Required in some jurisdictions (notably much of the EU) | Basic legal identity of who operates the store — business name, contact, registration info if applicable |
| **Intellectual Property / DMCA Notice** | You have original content (photos, descriptions) others could copy, or want a path to report copied content | Protects your content and gives you a formal process if someone copies your store |

> **💡 Tip:** Not every store needs every document on this list — a Business Disclosure/Imprint is far more commonly required in the EU than in the US, for example. Check this list against your specific operating location rather than implementing all of it by default.

---

## What You're Building Today

- A cookie banner/notice consistent with what your Analytics Setup actually collects
- A short, honest Accessibility Statement
- A customer-facing Shipping Policy page, distinct from the operational shipping work already done
- Confirmation of whether a Business Disclosure is required where you operate
- A basic process for handling content-copying complaints, if relevant

You're **not** building a full legal compliance department's worth of documentation. This is the realistic, complete-enough baseline for a personal store.

---

## Cookie Policy / Banner

This connects directly to the Analytics Setup module — if you added GA4, Plausible, or another tracking tool, this is the disclosure layer for it.

**Copy Prompt:**

```
I use [your analytics tool, e.g. GA4] on my e-commerce store, which
[does / does not] set cookies for tracking. My business operates in
[your location] and sells to customers [primarily in / worldwide,
including the EU, etc.].

Help me determine:
1. Whether I need a cookie consent banner (not just a policy page) in
   my situation, and what the difference means practically
2. What a cookie policy page should disclose, matching my actual
   tracking setup
3. How to implement consent so tracking doesn't fire before consent
   is given, if that's required for my situation
```

> **⚠️ Warning:** If consent is required in your jurisdiction, the cookie banner needs to actually block tracking scripts until consent is given — a banner that's purely cosmetic while analytics fires regardless doesn't meet the requirement it's meant to satisfy.

---

## Accessibility Statement

A short, honest statement referencing the real accessibility work from Phase 1 — not a generic legal boilerplate disconnected from what you actually built.

**Copy Prompt:**

```
Write a brief Accessibility Statement for my e-commerce store. It
should state our commitment to accessibility, reference that the site
follows [WCAG 2.1 AA / whatever standard you targeted in Phase 1], and
give a contact method for reporting accessibility issues.

Keep it honest and specific — don't claim full compliance if Phase 1
work was partial; state it as an ongoing commitment instead.
```

---

## Shipping Policy (Customer-Facing)

Different from the operational shipping setup — this is the public page customers check before buying, answering: how long will this take, what carriers do you use, what happens if something's delayed or lost.

**Copy Prompt:**

```
Write a customer-facing Shipping Policy page based on my actual
fulfillment setup:

Carrier(s): [from your Shipping Setup module]
Typical processing time: [your real timeline]
Shipping zones/regions served: [list]
What happens with lost/delayed packages: [your actual process, even
if informal]

Keep it specific and honest about timelines — don't promise faster
shipping than your actual process supports.
```

---

## Common Mistakes

- Adding analytics tracking without a corresponding cookie disclosure, leaving a gap between Privacy Policy claims and actual tracking behavior
- Publishing an Accessibility Statement claiming full compliance when Phase 1 work was partial — overclaiming here creates its own liability
- A Shipping Policy with timelines that don't match real fulfillment capability from the Shipping Setup module
- Skipping a Business Disclosure/Imprint when operating in a jurisdiction (notably the EU) where it's commonly required
- Treating all five documents as universally required regardless of actual jurisdiction and business setup

---

## Validation Checklist

- [ ] Cookie banner/policy matches the actual analytics tools in use, and blocks tracking pre-consent if required
- [ ] Accessibility Statement accurately reflects real Phase 1 work, not an inflated compliance claim
- [ ] Shipping Policy timelines match what the Shipping Setup module actually established as realistic
- [ ] Confirmed whether a Business Disclosure/Imprint is required for your specific operating location
- [ ] All new documents are linked from the site footer, alongside Privacy Policy and Terms of Service

---

## AI Review Prompt

```
Review these legal documents for my e-commerce store against my actual
setup:

Analytics in use: [list]
Phase 1 accessibility work: [describe]
Real shipping timelines/carriers: [describe]
Operating location: [location]

Check for:
1. Any disclosure that overclaims relative to what's actually
   implemented
2. Any required document for my specific jurisdiction that's missing
   from this set
3. Inconsistencies between this set and my existing Privacy Policy or
   Terms of Service
```

---

## What Comes Next

Legal groundwork is nearly complete. Next: **Refund Policy** — the specific terms customers see before deciding whether buying from a new, unfamiliar store is a safe bet.
