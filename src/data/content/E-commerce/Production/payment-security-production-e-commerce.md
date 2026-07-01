---
title: Payment Security
slug: payment-security
phase: Phase 4 Production Readiness
mode: production
projectType: e-commerce
estimatedTime: 30-45 min
---

# Advanced Payment Security & Compliance

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 45 Minutes

A beginner builds a checkout form by adding an HTML `<input>` for the user's credit card number, saving it to a React state variable, and sending it to their Next.js backend to process the charge.

If you do this, you are in direct violation of PCI-DSS (Payment Card Industry Data Security Standard). If your database is hacked, you are personally liable for millions of dollars in damages, and Visa/Mastercard will permanently ban you from accepting payments.

In Phase 4, you must engineer strict **PCI Compliance (Tokenization)**, implement **3D Secure (3DS) Authentication**, and mandate **TLS 1.3 Transport Encryption**.

---

## 1. PCI Compliance via Tokenization (iFrames)

Your Next.js servers and your React code must **never, ever** touch raw credit card numbers. 

**The Production Solution:**
You must use **Stripe Elements** (or an equivalent provider). Stripe Elements injects a secure `<iframe>` directly from Stripe's servers into your React component.

```mermaid
graph TD
    User((Customer)) -->|Types Card 4111...| IFrame[Stripe iFrame (Hosted by Stripe)]
    IFrame -->|Card Data| Stripe[Stripe Servers]
    Stripe -->|Returns Token (tok_123)| IFrame
    IFrame -->|Passes Token| React[Your React Component]
    React -->|Sends Token| NextJS[Your Next.js Backend]
    NextJS -->|Charge Token| Stripe
```

Because the user is typing into an iFrame hosted by Stripe, the raw card data mathematically bypasses your Next.js application entirely. If a hacker injects malicious JavaScript into your site to steal inputs, they cannot read inside the cross-origin iFrame. You achieve SAQ-A PCI compliance automatically.

## 2. 3D Secure (3DS) Authentication

If a fraudster uses a stolen credit card on your site, the true owner will issue a "Chargeback" with their bank. You lose the product, you lose the money, and Stripe charges you a $15 penalty fee.

**The Production Solution:**
You must implement **3D Secure (3DS)**. This is the protocol where the bank sends the user an SMS text message with a code to verify their identity before the charge goes through.

If a charge passes 3DS, the liability for fraud shifts from *you* to the *bank*. If the card turns out to be stolen, the bank absorbs the cost, and you keep your money.

```typescript
// app/api/checkout/route.ts
const paymentIntent = await stripe.paymentIntents.create({
  amount: 10000,
  currency: 'usd',
  payment_method: 'pm_123',
  confirmation_method: 'manual',
  confirm: true,
  // 1. Force 3D Secure if the bank supports it
  payment_method_options: {
    card: {
      request_three_d_secure: 'automatic' 
    }
  }
});
```

If the bank requests 3DS, Stripe will return a `requires_action` status. Your React frontend must catch this status and execute `stripe.handleCardAction()`, which pops up the bank's SMS verification modal on the user's screen.

## 3. Strict TLS 1.3 & HSTS

If a user is shopping on public airport Wi-Fi, a hacker can use a "Packet Sniffer" to intercept their traffic. If your site is served over HTTP, the hacker can read the user's session cookie and hijack their account.

**The Production Solution:**
You must mandate **TLS 1.3** and **Strict-Transport-Security (HSTS)**.

HSTS is a mathematical directive you send in your HTTP headers. It tells the user's browser: *"Never, ever allow an unencrypted connection to this domain, even if the user manually types `http://`."*

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  }
];
```
This mathematically guarantees that Man-in-the-Middle (MitM) downgrade attacks will fail at the browser level.

---

## ✅ Payment Security Checklist

- [ ] Mathematically guarantee you never touch raw PAN (Primary Account Number) data. Use Stripe Elements iFrames exclusively.
- [ ] Enforce 3D Secure (3DS) in your PaymentIntent logic to shift chargeback liability to the issuing banks.
- [ ] Configure HSTS headers in `next.config.js` to mathematically block HTTP downgrade attacks on public Wi-Fi.
- [ ] Use the AI prompt below to generate the rigorous payment security logic.

---

## AI Prompt — Engineer Payment Compliance

Copy this prompt into your AI to have it generate the strict compliance architecture.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Payment Security Engineer. We are engineering our PCI Compliance and 3DS architecture.

I need you to generate the following strict security implementations:

**1. The 3D Secure Action Handler:**
Write a React Client Component showing exactly how to handle a `requires_action` response from our Next.js backend. 
- You MUST show the `stripe.handleCardAction(clientSecret)` call.
- Explain the visual UX (how the Stripe modal appears over our UI to ask for the SMS code) and show the exact `fetch` request required to tell our backend the authentication was successful.

**2. The PCI-DSS Tokenization Blueprint:**
Write a Markdown explanation proving to a PCI Auditor how our Next.js application achieves SAQ-A compliance. Explicitly define what an iFrame is, why Cross-Origin Resource Sharing (CORS) prevents our React DOM from reading the card input, and why our database only stores safe `tok_123` tokens.

**3. The HSTS Header Configuration:**
Write the exact `headers()` array for `next.config.js` to inject `Strict-Transport-Security`. Explain the `preload` directive and why it is critical for protecting users on compromised public Wi-Fi networks.
````

**Next: Fraud Prevention →**
