---
title: Launch Checklist
slug: launch-checklist
phase: Phase 5
mode: personal
projectType: ecommerce
estimatedTime: 20-30 min
---

# Launch Checklist

This is the gate, not a new lesson. Every module from Phase 0 through this point built toward a single moment: a stranger gives your store real money and trusts you to deliver. This checklist is the final pass across all of it before that happens.

Treat the categories below differently — some are **hard blockers** (don't launch without them), others are **strongly recommended** but not launch-blocking on day one.

---

## Where This Fits

Nothing new is built here. This module is verification across everything: Phase 1 design, Phase 2 architecture, Phase 3 implementation, Phase 4 production readiness, and the Phase 5 launch work that came before this checklist.

---

## How to Use This Module

Don't just read the checklist — execute it. For each section, actually perform the test described, on your real, deployed store, not just in local development. A checklist you've mentally agreed with but never physically tested isn't a launch check, it's a hope.

> **️ Warning:** Test on your production deployment, with a real (small, refundable) test transaction if your payment provider supports test mode on production, or a careful real transaction you immediately refund. Local/development environments routinely behave differently from production in ways that matter most at exactly this moment.

---

## Hard Blockers — Do Not Launch Without These

### Core Purchase Flow
- [ ] A full guest checkout completes successfully on production: browse → add to cart → checkout → payment → order confirmation
- [ ] A full account-based checkout completes successfully, including order appearing in account order history
- [ ] Order confirmation email actually arrives (check spam folder too)
- [ ] Stock count decrements correctly after a real purchase

### Payments
- [ ] Live payment keys are active (not test keys) in production
- [ ] A real (or provider test-mode-on-live) transaction completes and the money/test confirmation actually appears in your payment provider dashboard
- [ ] Webhook events are verified working in production, not just locally — confirm in your provider's dashboard that recent webhook deliveries succeeded
- [ ] Server-side price calculation confirmed working, not trusting client-sent totals (from Payment Security module)

### Security
- [ ] All `/account` and order-detail routes confirmed protected server-side, not just hidden in the UI
- [ ] Rate limiting confirmed active on login, checkout, and password reset in production
- [ ] No card data, payment secrets, or API keys appear anywhere in production logs
- [ ] `.env` / secrets confirmed not committed to git history

### Legal
- [ ] Privacy Policy, Terms of Service, Refund Policy, and Return Policy are all live and linked from the footer
- [ ] Cookie consent (if required in your jurisdiction) is functioning, not just present as unenforced text
- [ ] Tax calculation confirmed accurate for at least one real test order

> **️ Warning:** If any item in this "Hard Blockers" section fails, treat that as launch-blocking regardless of how minor it feels. These are specifically the categories where a failure costs real money, real legal exposure, or real customer trust on day one — not just a degraded experience.

---

## Strongly Recommended — Fix Soon, Not Necessarily Before Launch

### Performance & Reliability
- [ ] Caching confirmed working correctly (stock/price not stale, product pages fast)
- [ ] Database backups confirmed enabled and tested restorable
- [ ] CI/CD pipeline blocks broken builds from reaching production

### Discoverability
- [ ] Sitemap submitted and pages confirmed indexing in Search Console
- [ ] Product structured data validated with Google's Rich Results Test
- [ ] Page titles and meta descriptions are unique, not framework defaults

### Operations
- [ ] Real shipping rates verified against actual carrier costs (from Shipping Setup)
- [ ] At least one full fulfillment workflow walked through, start to finish
- [ ] Fraud detection confirmed enabled with your payment provider

### Monitoring
- [ ] Error tracking is active and you've confirmed it actually captures a deliberately triggered test error
- [ ] You have a way to be notified of new orders in near-real-time, not just by checking the admin manually

---

## The Full End-to-End Smoke Test

Run this exact sequence on production before announcing launch:

```
1. Visit store as a fresh, logged-out visitor (use incognito/private mode)
2. Browse to a product, confirm images and description load correctly
3. Add to cart, confirm cart total (including any tax/shipping preview) is correct
4. Proceed through checkout as a guest
5. Complete a real or test-mode payment
6. Confirm order confirmation page and email both arrive
7. Log in as that customer (or create account), confirm order appears in history
8. As the store owner, confirm the order appears in your admin
9. Process the order through your real fulfillment workflow, including
   generating a shipping label
10. Mark the order shipped, confirm the customer-facing status and any
    notification update correctly
```

> ** Best Practice:** Do this entire sequence yourself, in one sitting, on the actual live store — not split across team members or spread across days where context gets lost. One person, one focused pass, catches integration gaps that piecemeal testing misses.

---

## AI Review Prompt

This is the highest-value prompt in this module — run it last, after working through the checklist above.

```
I'm about to launch a personal e-commerce store. Here's a summary of
what I've verified: [paste your completed checklist, noting anything
unchecked or uncertain]

Review this for launch readiness. Specifically:

1. Are any of the "Hard Blocker" items I've left unchecked actually
   safe to launch without, or genuinely blocking?
2. Based on what I've described, is there anything in my payment,
   security, or legal setup that sounds incomplete or risky, even if
   I marked it as done?
3. What's the single highest-risk gap in what I've described?

Be direct about what would stop you from launching this store yourself.
```

---

## Common Mistakes at This Stage

- Testing thoroughly in development, then launching without re-running the same tests against the actual production deployment
- Treating "it built successfully" (CI passing) as equivalent to "the checkout flow actually works" — they test different things
- Launching with test payment keys still active, meaning no real transactions can complete at all
- Skipping the full end-to-end smoke test because individual pieces were each tested separately during their own modules
- Announcing launch before confirming order notification/fulfillment actually works — the first real order is a bad time to discover a gap

---

## Final Validation

- [ ] Every "Hard Blocker" item above is checked, tested on production, not assumed
- [ ] The full end-to-end smoke test has been run successfully, start to finish, in one sitting
- [ ] The AI Review Prompt above has been run with an honest, complete summary of your actual state
- [ ] You have a plan for what you'll personally do in the first hour after a real order comes in

---

## What Comes Next

Your store is live. Phase 5 — Store Launch — is complete. Next: **Phase 6 — Growth**, starting with **Retention** — turning a first-time buyer into a repeat customer, which costs far less than acquiring a new one.
