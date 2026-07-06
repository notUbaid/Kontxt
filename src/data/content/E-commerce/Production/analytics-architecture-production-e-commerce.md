---
title: Analytics Architecture
slug: analytics-architecture
phase: Phase 2 E Commerce Development
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Server-Side Analytics & Attribution

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 25 Minutes

A beginner installs Google Analytics by asking their AI to inject a `<script>` tag into the `<head>` of their HTML document.

In a modern production environment, client-side tracking scripts are blocked by over 40% of users who have AdBlockers or strict privacy browsers (Brave, Safari ITP). If you rely on client-side pixels, your Facebook Ads dashboard will claim you made $0, while your bank account says you made $5,000. Your advertising algorithms will break because they cannot attribute the conversions.

As an AI-Assisted Architect, you must completely rethink tracking. You must instruct your AI to build **Server-Side Event Tracking**.

---

## 1. The Server-Side Tracking Mandate (CAPI)

When a user completes a purchase, do not rely on their browser to send the "Purchase Complete" event to Facebook.

**The Production Solution:**
You must command your AI to implement **Server-Side APIs** (like Facebook Conversions API (CAPI) or Google Analytics Measurement Protocol).
- When the payment clears securely on your Next.js server, your *server* executes a background `fetch` request directly to Facebook's servers to report the purchase. 
- Because this request originates from your Vercel IP address, it cannot be blocked by browser AdBlockers. 
- You achieve near 100% data accuracy, feeding the advertising algorithms the data they need to optimize your campaigns.

## 2. Privacy Compliance (GDPR/CCPA)

If your server silently tracks users and sends their data to Facebook, you are violating international privacy laws if you do not have their consent.

**The Production Solution:**
You must instruct your AI to build a strict **Consent Management Platform (CMP)** integration.
The server-side tracking code must check a global `hasConsented` cookie before firing. 
- If the user clicked "Reject All" on the cookie banner, the Next.js server MUST intercept the tracking event and drop it into the void. 
- Never let your AI hardcode tracking events without wrapping them in a strict boolean consent check.

## 3. The Universal Data Layer

If you have Facebook, Google, TikTok, and Klaviyo, your AI might write 4 different tracking functions inside your "Add to Cart" button. This bloats your React component and creates spaghetti code.

**The Production Solution:**
You must enforce a **Universal Data Layer**. 
Instruct your AI to build a single, abstract analytics utility function (`trackEvent('ADD_TO_CART', product)`). The React component only calls this one function. The utility function then handles distributing the event to the various server-side endpoints asynchronously, keeping your UI components perfectly clean.

---

##  Analytics Architecture Checklist

- [ ] Acknowledge that client-side pixels are dead; AdBlockers will destroy your attribution data.
- [ ] Enforce Server-Side Tracking (Conversions API) for all critical revenue events (Purchases, Add to Cart).
- [ ] Mandate strict GDPR/CCPA consent checks *before* any server-side event is fired.
- [ ] Abstract all tracking logic into a Universal Data Layer utility to keep React components clean.

---

## AI Prompt — Architect Server-Side Analytics

Copy this prompt into your AI to have it generate the highly accurate, privacy-compliant tracking infrastructure.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Data/Analytics Architect. We must engineer our tracking infrastructure to bypass AdBlockers while strictly adhering to GDPR/CCPA privacy laws.

Do not use simple client-side `<script>` tags for critical conversion events.

I need you to generate the following architectural implementations:

**1. The Server-Side Purchase Event (Facebook CAPI):**
Write a Next.js server utility function (`trackServerPurchase`) that executes AFTER a payment clears successfully.
- Show how to construct the payload for the Facebook Conversions API (CAPI).
- It MUST securely pass the hashed user data (SHA-256) and the exact order value.
- Crucially, wrap this entire function in a strict condition that checks for a `user_consent=true` cookie/header, immediately returning void if consent is missing.

**2. The Universal Data Layer Utility:**
Write a frontend TypeScript utility file (`analytics.ts`). Define a single `trackEvent` function that accepts strict string literals for event names (e.g., `'ADD_TO_CART'`, `'VIEW_ITEM'`). Show how a React component calls this clean function, and how the utility handles routing the data to both Google Analytics (via `gtag`) and our own Next.js API routes for server-side processing, keeping our UI components perfectly decoupled from third-party SDKs.
````

**Next: Phase 3 (Pre-Launch) →**
