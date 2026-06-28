---
title: Launch Checklist
slug: launch-checklist
phase: Phase 6
mode: production
projectType: web-app
estimatedTime: 30–45 min
---

# Launch Checklist

Launching is not pressing a deploy button.

It is confirming — with evidence, not confidence — that your application is ready for real users, real traffic, and real failure modes.

This module is your pre-launch gate. Work through it systematically. Do not skip sections because you are reasonably sure something is fine.

---

## How to Use This Checklist

**Do not complete this from memory.**

For every item, open the relevant tool, page, or config file and verify directly.

Items marked ** Critical** are launch blockers. Do not go live with any of these unresolved.

Items marked ** Important** should be resolved before launch if time permits. They are not launch blockers but will cause problems quickly after launch.

Items marked ** Nice to have** can follow in the first week post-launch.

---

## 1. Infrastructure & Hosting

-  Production environment is fully separate from staging and development
-  All environment variables are set in production (not `.env` files committed to the repo)
-  No `localhost` references or hardcoded development URLs in production config
-  Custom domain is configured and propagated
-  HTTPS is enforced on all routes — HTTP redirects to HTTPS automatically
-  `www` and non-`www` resolve consistently to one canonical domain
-  Health check endpoint exists and returns 200 (`/health` or `/api/health`)
-  Auto-scaling or resource limits are configured for your hosting tier
-  CDN is configured for static assets and SSR edge caching

---

## 2. Authentication & Security

-  All sensitive routes require authentication — verify by attempting to access them while logged out
-  Auth tokens and session cookies use secure, httpOnly flags in production
-  Passwords are hashed (never stored plaintext) — verify at the library level, not by assumption
-  API keys, database credentials, and secrets are stored in environment variables — never in source code
-  CORS is locked to your production domain(s) — not `*`
-  Rate limiting is active on auth endpoints (login, signup, password reset)
-  SQL injection is not possible — all database queries use parameterised statements or an ORM
-  File upload endpoints validate file type and enforce size limits
-  Admin routes are protected by both auth and role-based access control
-  Security headers are set (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Content-Security-Policy`)
-  Dependency vulnerabilities audited (`npm audit` or `pnpm audit`)

---

## 3. Database

-  Production database is separate from development and staging databases
-  All migrations have been run on the production database
-  Database connection uses SSL in production
-  Database credentials are not exposed in client-side code or API responses
-  Connection pooling is configured (prevents connection exhaustion under load)
-  Database backups are automated and have been tested (can you actually restore from a backup?)
-  Slow query logging is enabled or a query performance tool is connected
-  Indexes exist on all columns used in frequent WHERE clauses and JOINs

---

## 4. Error Handling & Observability

-  Unhandled errors do not expose stack traces or internal details to users
-  API error responses use consistent structure — never leak raw database errors
-  Error monitoring is active (Sentry, Highlight, or equivalent) and has been tested by triggering a real error
-  Application logging captures errors with enough context to debug (user ID, route, timestamp)
-  Logs are accessible without SSH-ing into a server (use your hosting provider's log viewer or a log service)
-  Critical background jobs have failure alerting
-  Uptime monitoring is configured with alerting (Better Uptime, Checkly, or equivalent)
-  Dashboard or alerting exists for key business metrics (signups, errors, payment failures)

---

## 5. Performance

-  Core Web Vitals are in green range on mobile (LCP < 2.5s, INP < 200ms, CLS < 0.1)
-  First Load JS is under 300KB
-  All images use modern formats (WebP or AVIF) and have explicit dimensions
-  LCP image uses `loading="eager"` and `fetchpriority="high"`
-  No third-party scripts loaded synchronously in `<head>`
-  Web Vitals are being collected from real users and sent to analytics

---

## 6. SEO & Discoverability

-  No `<meta name="robots" content="noindex">` tags left from development on any public page
-  Every public page has a unique `<title>` and `<meta name="description">`
-  `robots.txt` exists and is correctly configured
-  `sitemap.xml` exists and contains only accessible, indexable URLs
-  `<link rel="canonical">` is set on all public pages
-  Open Graph tags are set (`og:title`, `og:description`, `og:image`, `og:url`)
-  Domain is verified in Google Search Console and sitemap is submitted
-  Structured data (JSON-LD) is implemented for relevant page types

---

## 7. Payments & Billing (if applicable)

-  Stripe (or equivalent) is in live mode — not test mode
-  Webhooks are configured to point to your production URL, not localhost
-  Webhook signature verification is implemented
-  Failed payment handling is implemented (subscription paused or downgraded, not silently ignored)
-  Billing portal or subscription management is accessible to users
-  Successful payment sends a confirmation email
-  Invoice or receipt is generated and accessible
-  Refund flow has been tested end-to-end
-  Free trial expiry logic has been tested — what happens when a trial ends?
-  Revenue dashboard or Stripe alert configured for failed charges

---

## 8. Email

-  Transactional emails are sent from a verified sending domain (not `gmail.com` or a generic provider)
-  SPF, DKIM, and DMARC records are set for your sending domain
-  All critical transactional emails work end-to-end: signup confirmation, password reset, payment receipt
-  Emails render correctly on mobile and in dark mode
-  Unsubscribe links work and are present in any marketing emails
-  Email deliverability tested with [mail-tester.com](https://www.mail-tester.com/)

---

## 9. User Experience

-  Core user flows work end-to-end in production — tested manually in an incognito browser
  - Signup
  - Login
  - Core feature use
  - Logout
  - Password reset
-  404 page exists and is branded (not a default host error page)
-  500 / error page exists for server errors
-  Empty states exist for all views that can render with no data
-  Loading states are implemented for async operations
-  Forms provide clear validation errors
-  App is functional on mobile (tested on a real device, not just browser devtools)
-  App is functional across major browsers: Chrome, Firefox, Safari, Edge
-  Keyboard navigation works for core flows
-  Colour contrast meets WCAG AA for text content

---

## 10. Legal & Compliance

-  Privacy Policy exists and is linked in the footer
-  Terms of Service exists and is linked in the footer
-  Cookie consent is implemented if you use tracking cookies (required in EU/UK)
-  GDPR data deletion flow exists if you serve EU users (users can request data deletion)
-  Accessibility statement exists if your app targets regulated industries or government

---

## 11. Operational Readiness

-  You know how to roll back to a previous deployment (test this before launch)
-  You know how to restore the database from a backup (test this before launch)
-  You know how to manually trigger or cancel background jobs
-  Runbook exists for the most likely failure scenarios (database connection failure, payment webhook failure, auth service outage)
-  On-call alerting configured if this is a business-critical application

---

## Pre-Launch Smoke Test

After deploying to production, run this sequence manually in an incognito browser window. Do not use a pre-existing test account.

```
1. Load the homepage — does it render correctly?
2. Click Sign Up — complete the full signup flow
3. Check email — did the confirmation arrive? Does the link work?
4. Log in with the new account
5. Complete the core feature of your app (create, edit, delete something)
6. If paid: complete a payment flow using a test card (Stripe: 4242 4242 4242 4242)
7. Log out
8. Attempt to access a protected route while logged out — are you redirected?
9. Complete password reset flow
10. Log back in — is your data still there?
```

If any step fails, do not launch. Fix and rerun from step 1.

---

## AI Prompt — Launch Readiness Review

Use this to get a second opinion on your launch readiness before going live.

```prompt
You are a senior engineering lead conducting a pre-launch review.

My web app:
- Stack: [e.g. Next.js 14, PostgreSQL, Stripe, Resend, deployed on Vercel]
- Authentication: [e.g. NextAuth with JWT sessions]
- Key features: [list 3–5 core features]
- Target users: [who will use this]
- Expected initial traffic: [rough estimate]

I have completed the following from my launch checklist:
[paste your completed items]

I have NOT yet completed:
[paste your outstanding items]

For the outstanding items:
1. Which are genuine launch blockers vs acceptable post-launch tasks?
2. Are there any critical items I have missed entirely given my stack?
3. What is the single most likely failure mode in my first 24 hours of live traffic?

Be direct. I need to make a go/no-go decision today.
```

> **Review the output carefully.** AI will occasionally flag non-issues as critical or miss stack-specific edge cases. Cross-reference any new findings against your own understanding of your system.

---

## Go / No-Go Decision

After completing this checklist, make an explicit decision.

**Go** if:
- All  Critical items are resolved
- Core user flows pass the smoke test in production
- Error monitoring is active and capturing errors
- You have a rollback plan

**No-Go** if:
- Any  Critical item is unresolved
- The smoke test reveals a broken core flow
- Production environment variables are not fully configured
- You cannot explain what happens when your database goes down

There is no partial launch. Either your core product works reliably for new users or it does not.

---

## After You Launch

The first 30 minutes after launch are the most important.

Keep these open:

- Your error monitoring dashboard (Sentry or equivalent)
- Your hosting provider's live logs
- Your database dashboard
- Google Search Console (indexing may begin within hours)

Watch for:

- Spike in 5xx errors
- Unexpected 404s on routes that should exist
- Failed payment webhooks
- Auth failures on signup or login

Set a 30-minute timer. If nothing breaks, you can step away. Check again at the 2-hour mark and the 24-hour mark.

The second deployment after launch is almost always a bug fix. Expect it.
