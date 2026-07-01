---
title: Security
slug: security
phase: Phase 4 Production Readiness
mode: production
projectType: e-commerce
estimatedTime: 45-60 min
---

# Enterprise Security & Vulnerability Defense

**Estimated Time:** 60 Minutes

A beginner launches an e-commerce store assuming that because they are using Stripe and Shopify, they are immune to hackers. 

This is false. A hacker does not need to break into Stripe to steal money from you. If your Next.js application is vulnerable to Cross-Site Scripting (XSS), a hacker can inject malicious JavaScript into a product review. When another customer views that product, the script executes, steals their session token, and drains their account. 

In Phase 4, we transition from building features to defending them. You must engineer **Content Security Policies (CSP)**, eliminate **Injection Vectors**, and harden your **CORS (Cross-Origin Resource Sharing)** architecture.

---

## 1. Content Security Policy (CSP)

A CSP is a mathematical whitelist enforced by the browser. If a hacker successfully injects a malicious script tag (`<script src="http://hacker.com/steal.js"></script>`) into your HTML, the browser will look at your CSP. If `hacker.com` is not on your whitelist, the browser will refuse to execute the script.

**The Production Solution:**
You must configure a strict CSP in your Next.js `next.config.js` file.

```javascript
// next.config.js
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://cdn.shopify.com https://images.unsplash.com;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  frame-src https://js.stripe.com;
  upgrade-insecure-requests;
`;

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
          {
            // Prevents Clickjacking attacks
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ]
  },
}
```

Notice `frame-ancestors 'none'`. This prevents a malicious website from putting your e-commerce store inside a hidden `<iframe>` on their site, tricking users into clicking your "Buy" button (Clickjacking).

## 2. Cross-Origin Resource Sharing (CORS)

If you have a separate backend API server (e.g., `api.yourstore.com`), you must protect it from forged requests.

By default, web browsers prevent Website A from reading data from Website B using `fetch()`. However, if your Next.js API routes are misconfigured to allow `Access-Control-Allow-Origin: *`, anyone on the internet can query your database directly from their own website.

**The Production Solution:**
If you write custom API routes that expect to be called from the browser, you must mathematically restrict the origin.

```typescript
// app/api/user/profile/route.ts
import { NextResponse } from 'next/server';

const ALLOWED_ORIGINS = ['https://yourstore.com', 'https://admin.yourstore.com'];

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return new NextResponse(null, { status: 403, statusText: "Forbidden" });
  }

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```

## 3. Zod Payload Validation (Preventing NoSQL/SQL Injection)

If your Next.js API accepts a `productId` from the URL or the POST body, and you pass that raw string directly into a Prisma query, you are vulnerable. 

A hacker might pass a complex JSON object like `{"$ne": null}` (NoSQL injection) or a raw SQL string to bypass your logic and dump your entire database.

**The Production Solution:**
You must force ALL incoming data through a Zod schema before it touches your database.

```typescript
// ❌ DANGEROUS: Trusting user input
const { id } = await req.json(); 
const user = await prisma.user.findUnique({ where: { id } }); 

// ✅ SECURE: Mathematical validation
import { z } from 'zod';
const Schema = z.object({ id: z.string().uuid() }); // GUARANTEES it is a UUID string, not an object or SQL statement

const json = await req.json();
const validated = Schema.parse(json); // Throws an error if malicious
const user = await prisma.user.findUnique({ where: { id: validated.id } });
```

---

## ✅ Security Engineering Checklist

- [ ] Implement a strict Content Security Policy (CSP) in `next.config.js` to mathematically prevent XSS and Clickjacking.
- [ ] Lock down CORS headers on all public API routes, denying access to unauthorized origins.
- [ ] Enforce Zod validation on 100% of incoming API payloads before they interact with Prisma.
- [ ] Use the AI prompt below to generate the security audit.

---

## AI Prompt — Engineer the Security Layer

Copy this prompt into your AI to have it harden your Next.js infrastructure.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Security Engineer. We are hardening the application before production launch.

I need you to generate the following strict security implementations:

**1. The Next.js Security Headers:**
Write the complete `headers()` export for `next.config.js`. 
- It must include a strict `Content-Security-Policy` (CSP). Ensure it allows Stripe iFrames and Google Analytics, but blocks everything else.
- It must include `X-Frame-Options: DENY` (Clickjacking defense).
- It must include `Strict-Transport-Security` (HSTS) to force HTTPS.

**2. The Zod Injection Defense:**
Write a mock Next.js Route Handler (`/api/reviews`). 
- Demonstrate how to extract URL Search Params (e.g., `?productId=123`).
- Write the Zod schema required to validate that `productId` is strictly an alphanumeric string of exactly 20 characters (to prevent NoSQL injection payloads from slipping through).
- Show the `try/catch` block that traps the Zod error and returns a generic `400 Bad Request` without leaking database error details to the attacker.
````

**Next: Performance Optimization →**
