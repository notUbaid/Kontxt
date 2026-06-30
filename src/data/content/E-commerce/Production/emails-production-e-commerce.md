---
title: Emails Implementation
slug: emails
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Emails Implementation

At production scale, emails are not just polite notifications; they are binding legal receipts and the primary driver of repeat revenue.

If your transactional emails (Order Confirmations) fail to deliver, your customer support queue will overflow immediately. If your marketing emails land in spam, your retention metrics will flatline.

This module covers the enterprise architecture for transactional and lifecycle emails.

---

## 1. Transactional vs. Marketing Separation

You must strictly separate your email infrastructure.

**Transactional Emails:**
- *What they are:* Order Confirmations, Shipping Updates, Password Resets.
- *Legal Status:* Customers cannot opt out of these. They are required for the transaction.
- *Infrastructure:* Sent via a high-deliverability transactional API (e.g., Resend, Postmark, SendGrid API).
- *Sender Domain:* `orders@yourdomain.com` or `receipts@yourdomain.com`.

**Marketing Emails:**
- *What they are:* Newsletters, Abandoned Cart flows, VIP Sales.
- *Legal Status:* Strict opt-in required (GDPR, CAN-SPAM). Users must be able to unsubscribe instantly.
- *Infrastructure:* Sent via a dedicated marketing automation platform (e.g., Klaviyo, Iterable).
- *Sender Domain:* `hello@yourdomain.com` or a subdomain like `mail.yourdomain.com` to protect your primary domain's reputation.

**Never send marketing blasts from your transactional IP.** If a marketing blast gets marked as spam by Gmail, and your Order Confirmations use the same IP, your receipts will go to spam.

---

## 2. Event-Driven Email Triggers

Do not send emails synchronously in your API routes. If the SendGrid API has a 2-second delay, your checkout endpoint will time out.

**The Production Architecture:**
1. Your backend executes the transaction (e.g., processes the webhook, updates the database).
2. Your backend pushes an event to a Message Queue (AWS SQS, Inngest, BullMQ) or an Event Bus (Amazon EventBridge).
   - Event: `order.confirmed`, Payload: `{ orderId: "123" }`
3. A background worker picks up the event, fetches the rich order data from the database, renders the HTML template, and calls the Transactional Email API (Resend/Postmark).
4. **Retry Logic:** If the Email API is down, the queue automatically retries with exponential backoff. The customer gets their receipt 5 minutes late instead of the checkout crashing entirely.

---

## 3. Rendering Robust Email Templates

HTML for email is notoriously archaic. It requires 1990s table-based layouts to render correctly across Gmail, Outlook, and Apple Mail.

**Do not write raw HTML for emails.**

**The Implementation:**
Use a modern React-based email framework (e.g., **React Email** or **Mailing**).
- You write modern React components with Tailwind CSS.
- The framework compiles them into the necessary bulletproof `<table>` structures.
- You inject the compiled HTML into your API call payload.

```tsx
// Example using React Email
import { Html, Text, Tailwind } from '@react-email/components';

export default function OrderConfirmation({ orderNumber }) {
  return (
    <Html>
      <Tailwind>
        <Text className="text-lg font-bold">Thank you for order #{orderNumber}</Text>
        {/* Order details rendered here */}
      </Tailwind>
    </Html>
  );
}
```

---

## 4. The Abandoned Cart Pipeline

Abandoned cart emails generate up to 10% of total revenue for mature e-commerce brands. 

**The Architecture:**
1. Do not build this logic yourself. You do not want to manage unsubscribe lists, GDPR compliance, or A/B testing delays in your codebase.
2. Your backend pushes an `added_to_cart` or `checkout_started` event directly to Klaviyo/Iterable via their server-side API.
3. If the user completes the purchase, you push an `order_placed` event.
4. The Marketing Platform's visual flow builder handles the logic: *"If 'checkout_started' but not 'order_placed' within 4 hours, send Email 1."*

---

## AI Prompt — Architect Your Email Infrastructure

```prompt
I am implementing the email infrastructure for a production e-commerce store.

Tech Stack:
- Backend: [e.g., Next.js / Node.js]
- Transactional Provider: [e.g., Resend / Postmark]
- Marketing Provider: [e.g., Klaviyo]
- Queueing System: [e.g., Inngest / AWS SQS / BullMQ]

Act as a Principal Communications Architect:
1. Provide the exact Event-Driven architecture (Node.js/TypeScript) for handling an `order.confirmed` event and sending the receipt via a background queue. Ensure it includes retry logic.
2. Write a React Email template component for the Order Confirmation receipt, ensuring it maps over an array of line items and displays a formatted total.
3. Explain the exact API payloads I must send to my Marketing Provider (e.g., Klaviyo) to trigger a robust Abandoned Cart flow, and where in the checkout funnel those events must fire.
4. Outline the DNS records (DKIM, DMARC, SPF) I must configure to guarantee my transactional emails land in the inbox, not the spam folder.
```

---

## Emails Implementation Checklist

- [ ] Transactional emails and Marketing emails separated by provider and domain/IP
- [ ] DMARC, DKIM, and SPF records configured for the sending domains
- [ ] Email sending logic removed from synchronous API routes and moved to background queues
- [ ] React Email (or similar framework) implemented for reliable cross-client HTML rendering
- [ ] Order Confirmation template built and tested (including line items and tax breakdown)
- [ ] Server-side events (`checkout_started`, `order_placed`) mapped to the Marketing Automation platform for Abandoned Cart recovery
