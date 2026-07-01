---
title: Launch Checklist
slug: launch-checklist
phase: Phase 5 Store Launch
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# The Mission Control Launch Sequence

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 60 Minutes

A beginner clicks "Deploy" on Vercel, sends a link to their friends, and calls it a launch. 
When actual users arrive, the Stripe keys are in "Test Mode", the emails aren't sending because the DKIM records are broken, and the database crashes because they forgot to upgrade from the free tier. 

In a production environment, launching is a **Mission Control Sequence**. It is a strict, mathematical checklist that verifies every single component of the distributed architecture before live traffic is permitted.

---

## 1. The Pre-Flight Diagnostic (Dry Run)

Before you announce your store to the public, you must execute a full "Dry Run" in the live production environment.

**The Production Solution:**
You must place a real order using a real credit card on the live `yourdomain.com` URL.

If you skip this and rely on `localhost` testing, you will miss catastrophic edge-case failures (e.g., your Vercel Edge functions timing out after 10 seconds, or your Upstash Redis cache rejecting connections due to IP whitelisting).

**The Dry Run Trace:**
1. Did the Cloudflare Turnstile CAPTCHA pass on production?
2. Did Stripe process the real charge without throwing a CORS error?
3. Did the Inngest Event Bus successfully trigger the `order.paid` webhook?
4. Did Resend physically deliver the "Order Confirmation" email, or did it go to Spam?
5. Did the Checkly Synthetic Monitor report a 200 OK across the entire flow?

If the answer to *any* of these is No, you abort the launch.

## 2. Infrastructure Scaling (Pre-Provisioning)

If you expect a massive spike in traffic on Launch Day, you cannot rely entirely on auto-scaling.

**The Production Solution:**
1. **Database Connections:** You must verify your PgBouncer pool size. If you are on the Supabase Free Tier (limited to 60 connections), your database will crash in 30 seconds. You must upgrade to the Pro tier and mathematically allocate 200+ connections.
2. **Vercel Compute:** Ensure your Vercel Edge functions are not artificially constrained by hobby-tier timeout limits.
3. **Redis Caching:** Verify your Upstash Redis instance has enough memory allocated to hold the massive influx of `session` and `cart` data.

## 3. The Production Environment Variable Audit

The #1 cause of Launch Day failures is a misconfigured `.env` variable.

If you accidentally leave `NEXT_PUBLIC_STRIPE_KEY=pk_test_...` in your Vercel dashboard, customers will check out using fake credit cards, and you will give away free products.

**The Production Solution:**
You must execute a strict mathematical audit of your Vercel Environment Variables.
- **Stripe:** Ensure `pk_live` and `sk_live` are set. Ensure the Stripe Webhook Signing Secret is the production secret, not the CLI local secret.
- **NextAuth:** Ensure `NEXTAUTH_URL` is set to `https://yourdomain.com`, not `localhost:3000`, or users will be unable to log in.
- **Sentry/Axiom:** Ensure telemetry tokens are active so you aren't flying blind when the traffic hits.

---

## 🚀 The Ultimate Launch Checklist

This is the final sequence. Execute it with military precision.

- [ ] **The Real Money Test:** Complete a full end-to-end checkout on the live domain using a real credit card. Verify the Stripe dashboard registers the live charge.
- [ ] **Environment Variable Audit:** Mathematically verify that zero `_test_` keys exist in the Vercel Production environment block.
- [ ] **Infrastructure Upgrade:** Upgrade the PostgreSQL database to a paid tier with Point-In-Time Recovery (PITR) and expanded PgBouncer connection limits.
- [ ] **Telemetry Verification:** Cause a deliberate error on the live site (e.g., navigate to a broken route) and verify the error appears in Sentry within 5 seconds.
- [ ] **Email Reputation Check:** Send a test order confirmation email to a Gmail address and mathematically verify it passes DKIM/SPF checks and avoids the Spam folder.
- [ ] **Data Deletion Cascade:** Create a test user, execute the GDPR Account Deletion API, and verify the user is deleted but the Order is anonymized.
- [ ] **Cache Purge:** Execute a global cache purge in Vercel to ensure no stale staging data bleeds into the production launch.

---

## AI Prompt — Engineer the Final Audit

Copy this prompt into your AI to have it generate the final diagnostic script.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Site Reliability Engineer (SRE). We are 24 hours away from our Production Launch.

I need you to generate the following strict diagnostic implementations:

**1. The Health Check Script:**
Write a Node.js script (`scripts/pre-flight-check.ts`) that can be executed via the CLI.
- It must physically ping our `/api/health` endpoint.
- It must verify the PostgreSQL database is reachable.
- It must verify the Redis cache is reachable.
- It must execute a mock request to the Stripe API using the production secret key to verify authentication is valid.

**2. The Webhook Signature Audit:**
Explain in Markdown why using the Stripe CLI Webhook Secret (`whsec_...`) in the Vercel Production environment will catastrophically fail to validate live webhooks. Detail the exact steps required to extract the true Live Webhook Signing Secret from the Stripe Dashboard and inject it into Vercel.
````

**Phase 5 is Complete. Proceed to Phase 6 (Growth) to scale your empire.**
