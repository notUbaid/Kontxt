---
title: Error Tracking
slug: error-tracking
phase: Phase 4
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Error Tracking (Closing the Loop)

## Beyond Basic Capture

In Phase 4, your application is monitored and logging correctly. However, logs are reactive (you search them when you know what you are looking for). **Error Tracking** (e.g., Sentry, Bugsnag) is proactive. It catches unhandled exceptions, groups them, and alerts your team before a user complains.

But if you just drop the Sentry SDK into a production marketplace without configuring it, you will experience immediate Alert Fatigue. Your dashboard will be flooded with 10,000 noise errors (e.g., ad-blocker script failures), and you will miss the critical database crash.

---

## Source Maps and Release Tracking

When you compile a Next.js or React application for production, the code is minified. If an error occurs in the browser, the stack trace will look like:
`TypeError: Cannot read properties of undefined (reading 'x') at a.b.c (main-12345.js:1:254)`

This is entirely useless for debugging.

**The Production Setup:**
You must configure your CI/CD pipeline to upload **Source Maps** to your error tracker during the build step, and associate them with a **Release Version** (usually the Git SHA). 
When an error occurs, the tracker uses the Source Map to un-minify the code and show you the exact line in your original TypeScript file.

---

## Grouping and Alert Fatigue

By default, error trackers group errors by the stack trace. If the stack trace is slightly different (e.g., because of dynamic IDs in the URL), the tracker might create 50 separate issues for the exact same bug, triggering 50 separate emails.

**The Defense Strategy:**
1. **Sanitize Data Before Capture:** Strip random IDs, UUIDs, and timestamps from error messages before throwing them so they group perfectly. `throw new Error("Failed to load listing")` groups better than `throw new Error("Failed to load listing 12345")`. (Put the ID in the *Context*, not the *Message*).
2. **Ignore Expected Noise:** Configure the SDK to explicitly ignore known, non-actionable client errors (e.g., `ResizeObserver loop limit exceeded`, `NetworkError when attempting to fetch`).

---

## Adding Context: The "Who" and "What"

A stack trace tells you *where* the code broke. It does not tell you *who* experienced the bug, or *what* they were trying to buy.

In a marketplace, every captured exception must have contextual data attached:
* **User Context:** `id`, `role` (Buyer/Seller). Never attach PII like emails or names.
* **Tag Context:** `transaction_id`, `listing_id`. 
* **Breadcrumbs:** The tracker should record the last 10 API requests, Redux state changes, or UI clicks the user made before the crash occurred.

---

## Do's and Don'ts of Production Error Tracking

- **DO differentiate Expected vs. Unexpected Errors.** A user submitting a form with a missing email is an expected validation error. Return a `400 Bad Request`. **DO NOT** send this to Sentry. Only send unexpected `500 Internal Server Errors`.
- **DON'T send alerts to a general Slack channel.** Create a dedicated `#alerts-sentry` channel. If an error is critical (e.g., Stripe Webhook failing), route it directly to PagerDuty.
- **DO use environment tags.** Ensure errors are tagged with `environment: production` or `environment: staging`. Filter out `development` errors completely so they don't count against your quota.
- **DON'T mark errors as "Resolved" manually without a fix.** If you click "Resolve" to clear the dashboard, the error will just come back. Use your tracker's GitHub integration to resolve the error automatically when the PR fixing it is merged.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Sentry Next.js Configuration:**

````prompt
Act as a Frontend Infrastructure Engineer. Write the Next.js `sentry.client.config.ts` and `sentry.server.config.ts` setup. Configure it to ignore common React/Browser noise errors (like `ResizeObserver`), set the environment dynamically based on `process.env.NEXT_PUBLIC_VERCEL_ENV`, and implement a `beforeSend` hook that strips any credit card numbers that might accidentally end up in the error payload before sending it to the Sentry servers.
````

> [!TIP]
> **Prompt 2 — CI/CD Source Map Upload:**

````prompt
Provide the exact GitHub Actions YAML step required to inject the `SENTRY_AUTH_TOKEN` during a Next.js production build (`next build`). Explain how the `@sentry/nextjs` Webpack plugin uses this token to automatically upload sourcemaps and associate them with the current Git commit SHA as the release version, and how it safely deletes the sourcemaps from the public `.next` folder afterward.
````

---

## Validating What AI Generates

- **Check for swallowed errors:** If AI generates a `try/catch` block that does `console.error(err)` but forgets to call `Sentry.captureException(err)`, you have a silent failure. Reject it and demand proper error propagation.
- **Verify Breadcrumb limits:** If AI suggests attaching the entire Redux state tree as context to an error, correct it. Error payloads have strict size limits (e.g., 200KB). Context must be serialized and limited to essential IDs.

---

## Implementation Checklist

- [ ] Integrated the Sentry/Bugsnag SDK into both the Frontend (React) and Backend (Node.js).
- [ ] Configured CI/CD to upload Source Maps automatically, ensuring stack traces are readable.
- [ ] Added `beforeSend` hooks to filter out known browser noise (e.g., Adblocker script failures) to prevent Alert Fatigue.
- [ ] Attached User IDs and Listing IDs to the error context, ensuring strict PII redaction.
- [ ] Linked the Error Tracker to GitHub so issues are automatically marked resolved when the fixing PR is merged.

---

## What's Next

Next: **Rate Limiting** — If your error tracker is silent, your application is working. But if a malicious bot starts scraping your listings at 1,000 requests per second, your database will still crash. We will implement strict Rate Limiting and Circuit Breakers to defend the API.
