---
title: Error Tracking
slug: error-tracking
phase: Phase 4 Production Readiness
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Global Error Tracking & Diagnostics

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 60 Minutes

A beginner pushes their code to Vercel and assumes that if the build succeeds, the website is perfect. 

Then, a customer on an outdated Android phone tries to checkout. The JavaScript engine on their specific phone doesn't support the `Array.prototype.at()` function. The checkout screen goes completely blank. The customer leaves. The beginner checks their Next.js server logs, but sees nothing, because the error happened *in the user's browser*, not on the server.

In a production environment, you must engineer a **Global Error Boundary** and implement **Session Replay Diagnostics** to catch silent client-side failures.

---

## 1. Client-Side Error Tracking (Sentry)

You must capture every single JavaScript exception that occurs on your customers' devices.

**The Production Solution:**
You will use **Sentry**. When an error occurs in the browser, Sentry catches it, packages the stack trace, and sends it to your dashboard. It even tells you exactly what browser and OS the user was on.

```tsx
// app/global-error.tsx
'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

// This is Next.js's ultimate fallback error boundary
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 1. Send the silent client-side error to Sentry immediately
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2>Something went catastrophically wrong!</h2>
          <p>Our engineering team has been notified.</p>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  );
}
```

By placing this in `global-error.tsx`, you guarantee that if a React component crashes violently, the user sees a graceful fallback UI instead of a terrifying blank white screen.

## 2. Session Replay (LogRocket / Sentry)

Sometimes an error isn't a crash. Sometimes the UI just looks broken. A user emails you: *"I clicked the button and nothing happened."*

If you check Sentry, there is no error. The button was just misaligned by CSS, and the user clicked the empty space next to it. How do you debug something you can't see?

**The Production Solution:**
You must implement **Session Replay** (via LogRocket or Sentry Replay). 

Session Replay mathematically records the DOM mutations (HTML/CSS changes) of the user's browser session. When the user emails support, you can look up their session and physically watch a video of their screen, tracing their exact mouse movements.

```typescript
// Sentry Initialization (sentry.client.config.ts)
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Enable Session Replay
  integrations: [
    Sentry.replayIntegration({
      // 1. Mathematically scrub all passwords, credit cards, and PII from the video
      maskAllText: true, 
      blockAllMedia: true,
    }),
  ],

  // 2. Only record 1% of normal sessions (to save money)
  replaysSessionSampleRate: 0.01,
  
  // 3. Record 100% of sessions that encountered an error
  replaysOnErrorSampleRate: 1.0,
});
```

**Privacy Mandate:** You MUST configure `maskAllText: true`. If a user types their password, Session Replay will record the keystrokes. By enabling masking, Sentry transforms the HTML text into `***` before it ever leaves the user's browser, preventing a massive GDPR privacy violation.

## 3. Source Map Obfuscation

When you compile your Next.js application, Webpack generates "Source Maps." These map the minified, unreadable production code back to your original, highly readable TypeScript code.

Sentry needs these Source Maps to tell you exactly which line of code failed (`checkout.tsx:42`). However, if you accidentally upload your Source Maps to the public internet, a hacker can download your entire original source code, exposing your proprietary algorithms.

**The Production Solution:**
You must instruct your AI to configure Webpack to generate Source Maps, upload them securely to Sentry via an auth token during the GitHub Action build step, and then *delete them* before the code is deployed to Vercel.

---

## ✅ Error Tracking Engineering Checklist

- [ ] Implement a Next.js `global-error.tsx` boundary to catch fatal React crashes and present a graceful fallback UI.
- [ ] Configure Sentry to capture client-side and edge-side exceptions, reporting the user's OS and Browser natively.
- [ ] Implement Session Replay to physically watch the user's DOM interactions during silent UI failures.
- [ ] Strictly mandate text-masking in Session Replay to prevent GDPR violations regarding PII.
- [ ] Use the AI prompt below to generate the exact Sentry integration.

---

## AI Prompt — Engineer Error Tracking

Copy this prompt into your AI to have it generate the comprehensive error boundary architecture.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Reliability Engineer. We are engineering our Global Error Tracking and Session Replay architecture using Sentry.

I need you to generate the following strict diagnostic implementations:

**1. The Sentry Client Configuration:**
Write the `sentry.client.config.ts` file. 
- Initialize the SDK.
- Configure the `replayIntegration`. You MUST explicitly set the privacy rules to mask all text and block all media.
- Explain the financial and diagnostic difference between `replaysSessionSampleRate` and `replaysOnErrorSampleRate`.

**2. The Next.js Global Error Boundary:**
Write the `app/global-error.tsx` file. 
- Show how it uses the `use client` directive.
- Show how it intercepts the fatal error and passes it directly to `Sentry.captureException(error)`.
- Write a highly polished Tailwind CSS fallback UI that allows the user to click a "Reload" button via the `reset()` function.

**3. The Webpack Source Map Hider:**
Write the exact Next.js configuration code (inside `next.config.js` using `@sentry/nextjs`) required to generate source maps, upload them to Sentry securely during the CI build process, and ensure they are NOT served publicly to the browser.
````

**Next: Rate Limiting Engineering →**
