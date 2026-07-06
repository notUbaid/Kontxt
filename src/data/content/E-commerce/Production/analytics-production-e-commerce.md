---
title: Analytics
slug: analytics
phase: Phase 3 E Commerce Development
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Enterprise Telemetry & Analytics

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 60 Minutes

In Phase 2, you architected the theory of Server-Side Tracking to bypass AdBlockers. Now, in Phase 3, we write the code.

If you let a beginner write your analytics code, they will hardcode `window.fbq('track', 'Purchase')` directly into the checkout button. 
If the user's browser is running uBlock Origin, that function `fbq` is blocked. The JavaScript throws an undefined error, the checkout button crashes, and you lose the sale entirely. 

In this module, you will engineer a **Fault-Tolerant Universal Data Layer**, implement **Server-Side Facebook CAPI (Conversions API)**, and build a strict **GDPR Consent Middleware**.

---

## 1. The Universal Data Layer

You must never let your UI components talk directly to a third-party tracking pixel.

**The Production Solution:**
You must build an abstraction layer (`lib/analytics.ts`). Your React components only send events to this utility. The utility catches any AdBlocker errors and safely routes the data to both the client-side pixels (if allowed) and your secure Next.js backend.

```typescript
// lib/analytics.ts
type EventName = 'VIEW_ITEM' | 'ADD_TO_CART' | 'PURCHASE';

interface TrackingPayload {
  eventName: EventName;
  value?: number;
  currency?: string;
  items?: Array<{ id: string; price: number }>;
}

export const trackEvent = async (payload: TrackingPayload) => {
  // 1. Check Consent BEFORE tracking anything
  if (typeof window !== 'undefined' && !window.localStorage.getItem('user_consent')) {
    return; // Drop the event. Privacy first.
  }

  // 2. Client-Side Attempt (Wrapped in Try/Catch to prevent AdBlocker crashes)
  try {
    if (window.gtag) {
      window.gtag('event', payload.eventName, payload);
    }
  } catch (err) {
    console.warn("Client-side tracking blocked by browser.");
  }

  // 3. Server-Side Execution (Bypasses AdBlockers)
  // We send the event to our own Next.js API, which then securely forwards it to Facebook/Google.
  if (payload.eventName === 'PURCHASE') {
    fetch('/api/analytics/server-track', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).catch(() => {
      // Silently fail if our own API drops, so the UI never crashes
    });
  }
};
```

By abstracting this, your React button simply looks like this:
`<button onClick={() => trackEvent({ eventName: 'ADD_TO_CART' })}>Add to Cart</button>`

## 2. Server-Side CAPI (Facebook Conversions API)

When the `/api/analytics/server-track` endpoint receives the payload, it must securely forward it to Facebook. Because this request comes from your Vercel Edge Server IP address, it cannot be blocked by the user's browser.

**The Production Solution:**
You must implement the CAPI protocol. Facebook requires you to hash user data (like emails) using SHA-256 before sending it to them, to comply with privacy laws.

```typescript
// app/api/analytics/server-track/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Helper function to securely hash PII (Personally Identifiable Information)
const hashData = (data: string) => crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');

export async function POST(req: Request) {
  const body = await req.json();

  if (body.eventName === 'PURCHASE') {
    const fbPayload = {
      data: [
        {
          event_name: 'Purchase',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          user_data: {
            // NEVER send raw emails. Always SHA-256 hash them.
            em: body.userEmail ? [hashData(body.userEmail)] : [],
            client_ip_address: req.headers.get('x-forwarded-for'),
            client_user_agent: req.headers.get('user-agent'),
          },
          custom_data: {
            value: body.value,
            currency: 'USD',
          },
        }
      ]
    };

    // Send the hashed data securely to Facebook's servers
    await fetch(`https://graph.facebook.com/v18.0/${process.env.FB_PIXEL_ID}/events?access_token=${process.env.FB_CAPI_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fbPayload),
    });
  }

  return NextResponse.json({ success: true });
}
```

## 3. The Consent Middleware (GDPR/CCPA)

If you use the Server-Side CAPI tracking *without* the user's explicit consent, you can be fined millions of dollars under the GDPR.

**The Production Solution:**
You must implement a strict Cookie Banner. If the user clicks "Accept", you drop a `user_consent=true` cookie.
In your Next.js Edge Middleware (`middleware.ts`), you can mathematically intercept all requests to your `/api/analytics` routes. If the `user_consent` cookie is missing, the Middleware blocks the request at the Edge before it even reaches your tracking code.

---

##  Analytics Engineering Checklist

- [ ] Wrap all client-side pixel scripts (Google/Meta) in a `try/catch` block to prevent AdBlocker crashes.
- [ ] Implement the Universal Data Layer (`lib/analytics.ts`) to decouple React components from tracking SDKs.
- [ ] Build the Server-Side CAPI route to guarantee 100% conversion attribution.
- [ ] ALWAYS SHA-256 hash Personally Identifiable Information (PII) before sending it to Facebook.
- [ ] Use the AI prompt below to generate the exact analytics infrastructure.

---

## AI Prompt — Engineer the Telemetry Layer

Copy this prompt into your AI to have it write the highly secure, privacy-compliant tracking architecture.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Data Architect. We are engineering our Universal Data Layer and Server-Side Analytics.

I need you to generate the following strict, privacy-compliant implementations:

**1. The Abstracted Data Layer (`lib/analytics.ts`):**
Write the TypeScript utility function `trackEvent`. 
- Show how it first checks for a `user_consent` value in `localStorage`.
- Show how it wraps a Google Analytics (`window.gtag`) call in a safe `try/catch` block.
- Show how it async `fetches` our Next.js backend for high-value events (like Purchase).

**2. The Facebook Conversions API (CAPI) Route:**
Write the Next.js API Route handler (`/api/analytics/server-track`).
- Show the exact `crypto` logic required to SHA-256 hash the user's email and phone number to comply with Facebook's strict PII requirements.
- Show the `fetch` request to the `graph.facebook.com/events` endpoint, passing the hashed data and the exact `action_source: 'website'`.

**3. The Next.js Edge Consent Middleware:**
Write the `middleware.ts` file for Next.js. Show how to intercept any request made to `/api/analytics/*`. If the request does not contain a valid `consent_granted=true` cookie in the headers, use `NextResponse.json` to immediately reject the request with a `451 Unavailable For Legal Reasons` status code, guaranteeing GDPR compliance at the Edge.
````

**Next: Testing Engineering →**
