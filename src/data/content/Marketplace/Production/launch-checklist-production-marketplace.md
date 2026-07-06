---
title: Launch Checklist
slug: launch-checklist
phase: Phase 5
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Launch Checklist

## The Point of No Return

Everything built up to this moment has been in a sandbox. Once you open the doors to a production marketplace, the stakes become permanent. You are handling real credit cards, processing real payouts, and routing real user data.

A production launch is not a single click of a "Deploy" button. It is a strictly orchestrated sequence of infrastructure checks, compliance audits, and staged rollouts. If you miss a step, the resulting failure will be public and expensive.

---

## 1. Infrastructure & Scaling Readiness

If your marketing works, you will get a traffic spike. If your infrastructure fails during that spike, you have wasted your entire launch budget.

- **Database Connection Pooling:** Ensure you are using PgBouncer or Supabase's built-in connection pooling. A sudden influx of 500 concurrent users will exhaust Postgres connections and crash the database if unpooled.
- **Edge Caching:** Verify that all static assets and public listing pages are heavily cached at the Edge via a CDN (Cloudflare/Vercel). The database should only be hit for authenticated or dynamic queries.
- **Load Testing Verification:** Review the results of the Artillery/K6 synthetic load tests (from the Beta Testing module). Confirm the p95 response time remains under 500ms at peak load.
- **Rate Limiting Active:** Confirm your Redis-backed rate limiting is actively blocking abusive traffic patterns on authentication and search endpoints.

---

## 2. Security & Compliance Audit

A data breach on day one will permanently destroy the marketplace's reputation.

- **Environment Variables:** Verify that all production API keys (Stripe Live Secret Key, SendGrid, etc.) are correctly set in the production environment, and that no `NEXT_PUBLIC_` variables accidentally expose private keys.
- **Row Level Security (RLS):** If using Supabase/Firebase, manually attempt to query another user's messages and payout data via the public API to guarantee RLS policies are airtight.
- **Stripe Live Mode:** Switch Stripe from `Test Mode` to `Live Mode`. Verify that your webhooks are pointing to the production URL, not a local `ngrok` tunnel.
- **Cookie Consent:** Ensure the OneTrust/Cookiebot banner is actively blocking analytics scripts until the user clicks "Accept" (GDPR compliance).

---

## 3. The "Golden Path" Verification

Before announcing the launch, you must execute a live, end-to-end transaction using real money.

- **Live Supply Creation:** Create a real seller account. Complete Stripe Identity KYC. Publish a real listing.
- **Live Demand Checkout:** Create a separate buyer account (on a different device/network). Complete the checkout using a real credit card.
- **Webhook Validation:** Verify the database successfully updated the order status via the Stripe Webhook, not client-side logic.
- **Payout Verification:** Fast-track the order to `Delivered` and confirm the funds successfully arrived in the seller's actual bank account. (Refund the transaction afterward to test the refund flow).

---

## 4. Operational Readiness

Your software works, but is your *company* ready to handle the users?

- **Monitoring & Alerting:** Confirm Sentry is capturing production errors. Ensure PagerDuty (or a Slack webhook) is configured to wake you up if the database CPU exceeds 80% or if Stripe webhooks start failing.
- **Trust & Safety Dashboard:** Ensure your admin dashboard is live and you can successfully ban a user or remove a listing with one click.
- **Support Channels:** Verify your support email (`help@yourdomain.com`) is actively routing to a ticketing system (Zendesk/Intercom) or your primary inbox.
- **Empty States:** Ensure the marketplace does not look dead. Pre-populate the homepage with high-quality "Seed Supply" (the first 100 listings you manually curated during the Closed Beta).

---

## The Staged Rollout Strategy

Do not launch to the entire world at once. Use a staged approach to control the blast radius of any undiscovered bugs.

1. **T-Minus 48 Hours:** Soft Launch. The production site is live, but unlisted. You invite the final batch of Beta Testers to do a dry run on the live infrastructure.
2. **T-Minus 24 Hours:** Supply-Side Only. Open the doors to Sellers. Let them populate the marketplace catalog.
3. **Launch Day (Zero Hour):** Open the doors to Buyers. Send the marketing emails. Post on Product Hunt / Hacker News.
4. **Post-Launch (T+4 Hours):** Watch the logs. Do not write new features. Your only job is triage, monitoring Sentry, and answering support tickets.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Security Audit Script:**

````prompt
Act as a DevSecOps Engineer. Write a bash script that can be run in a CI/CD pipeline (GitHub Actions) before deployment. The script should use `grep` and AST parsing to scan the entire `/src` directory for hardcoded secrets, ensure no `NEXT_PUBLIC_` variables contain the words `SECRET` or `PRIVATE`, and verify that the `npm audit` shows zero critical vulnerabilities.
````

> [!TIP]
> **Prompt 2 — Incident Response Plan:**

````prompt
Generate a step-by-step "Severity 1 Incident Response Plan" for a marketplace launch day. Define the exact steps to take if the primary Postgres database goes down, including how to communicate with users, how to safely queue pending Stripe webhooks, and the commands required to failover to a read-replica or restore from a Point-in-Time-Recovery (PITR) backup.
````

---

## Validating What AI Generates

- **Check for realistic failovers:** If AI suggests "just restart the server" for a database outage, it is incompetent. A production incident response plan must include data integrity checks and webhook reconciliation strategies.
- **Verify webhook endpoints:** Ensure any AI-generated launch checklists explicitly remind you to update Stripe/SendGrid webhook URLs from your staging environment to your production domain. This is the #1 cause of launch day failures.

---

## Final Sign-Off

- Infrastructure scaled and Edge Caching verified.
- Security audit complete; no exposed secrets or RLS leaks.
- Stripe Live Mode active; end-to-end real money transaction verified.
- Monitoring and PagerDuty alerts configured.
- Seed supply populated; marketplace is ready for demand.

---

## What's Next

**You are launched.** 

The engineering phase is largely complete. The survival of your marketplace now depends entirely on your ability to balance Supply and Demand, track your Liquidity metrics, and relentlessly optimize the funnels we built. Welcome to Production.
