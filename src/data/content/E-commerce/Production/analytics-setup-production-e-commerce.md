---
title: Analytics Setup
slug: analytics-setup
phase: Phase 5
mode: production
projectType: e-commerce
estimatedTime: 35–45 min
---

# Analytics Setup

At production scale, analytics is the compass for millions of dollars in marketing spend. If your tracking is off by 20%, the marketing team will allocate ad budgets incorrectly, bleeding cash.

In the modern web, client-side tracking (e.g., placing the Facebook Pixel in your `<head>`) is fundamentally broken. Ad blockers, iOS tracking protections (ITP), and browser privacy rules block up to 30% of client-side events.

---

## 1. Server-Side Tracking (The Production Standard)

To get accurate conversion data, your backend server must send the purchase event directly to the advertising network APIs, bypassing the user's browser entirely.

**The Implementation:**
Implement **Meta Conversions API (CAPI)** and **Google Server-Side Tagging**.
- *Frontend:* The browser still sends initial page views (for UI flow analysis).
- *Backend:* When the `payment_intent.succeeded` webhook fires from Stripe, your Node.js backend pushes the exact order total, cart contents, and hashed customer email directly to Facebook's API.
- Ad blockers cannot block server-to-server HTTP requests. This recovers up to 30% of "lost" attribution data.

---

## 2. The Data Layer (Standardization)

If you hardcode analytics events into your React buttons (`onClick={() => ga('send', 'add_to_cart')}`), your code becomes a messy, unmaintainable spiderweb. 

**The Implementation:**
Use an event bus or a strict **Data Layer**.
- Whenever an e-commerce action occurs, the UI pushes a strict JSON object to `window.dataLayer`.
- Google Tag Manager (GTM) or Segment listens to this Data Layer and routes the event to GA4, Mixpanel, and Klaviyo simultaneously.
- This decoupling allows the marketing team to add new tracking tools without requiring an engineering deployment.

```javascript
// Standardized E-commerce Data Layer Push
window.dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    currency: 'USD',
    value: 49.99,
    items: [{
      item_id: 'SKU_123',
      item_name: 'Vintage Tee',
      price: 49.99,
      quantity: 1
    }]
  }
});
```

---

## 3. Resolving the "Source of Truth" Conflict

**The Problem:** Google Analytics says you made $10,000 yesterday. Stripe says you made $8,500. Which is correct?
**The Answer:** Stripe is always the ultimate source of truth. Analytics tools are inherently lossy (they miss data due to blockers, or they double-count if a user refreshes the "Thank You" page).

**The Architecture:**
- Use GA4/Mixpanel for *behavioral* analysis (e.g., "Where are users dropping off in the funnel?").
- Never use GA4 for *financial* reconciliation. Build a separate internal dashboard powered directly by your primary Postgres/Stripe database for financial reporting.

---

## 4. Privacy Compliance (Consent Mode)

If you track a European user's purchase without their consent, you violate GDPR. 

**The Implementation:**
Integrate **Google Consent Mode v2**.
- Before the user clicks "Accept Cookies", your Data Layer fires events with a `consent_status: 'denied'` flag.
- Google Analytics receives the event but strips all PII (IP address, user identifiers). It records an "anonymous ping" to track aggregate volume without violating privacy laws.
- When the user accepts, Consent Mode updates to `granted`, and full attribution tracking begins.

---

## AI Prompt — Architect Your Analytics Pipeline

```prompt
I am implementing the analytics infrastructure for a production e-commerce store with a heavy focus on accurate marketing attribution.

Tech Stack:
- Frontend: [e.g., Next.js React]
- Backend: [e.g., Node.js]
- Analytics: [e.g., GA4, Meta CAPI, Segment]

Act as a Principal Data Engineer:
1. Provide the exact backend Node.js code required to send a secure, hashed purchase event to the Meta Conversions API (CAPI) when a Stripe webhook fires.
2. Outline the standardized `window.dataLayer` JSON schema I must implement in the frontend for the `view_item`, `add_to_cart`, and `purchase` events to satisfy GA4 e-commerce requirements.
3. Explain how to configure Google Consent Mode v2 in the Next.js `<head>` to ensure no PII is transmitted to Google before the user interacts with the Cookie banner.
4. Detail the architectural split between Behavioral Analytics (GA4) and Financial Source of Truth (Database), and how to explain this discrepancy to the marketing team.
```

---

## Analytics Setup Checklist

- [ ] Server-Side Tracking (Meta CAPI / GA4 Server) implemented to bypass ad-blockers and ITP
- [ ] Centralized Data Layer established to decouple UI code from third-party marketing tags
- [ ] GA4 E-commerce specific events (`view_item`, `add_to_cart`, `purchase`) strictly formatted
- [ ] Google Consent Mode v2 configured to comply with GDPR/CCPA before tracking initializes
- [ ] Hashing protocols (SHA-256) enforced on all user PII sent to advertising APIs
- [ ] Clear organizational boundary set: Analytics tools used for behavior; Database used for financial reconciliation
