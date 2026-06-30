---
title: Notifications Implementation
slug: notifications
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Notifications Implementation

At production scale, notifications are a multi-channel orchestration problem. Customers expect order updates via SMS, push notifications (if you have an app), and occasionally WhatsApp, in addition to email.

If you hardcode these channels into your business logic, your codebase will become an unmaintainable web of API calls. You must abstract notifications into a unified routing layer.

---

## 1. Multi-Channel Routing (The Notification Service)

A user's preference dictates where the message goes. A Gen Z customer might want order updates exclusively via SMS, while a B2B client demands email.

**The Anti-Pattern (Hardcoded Logic):**
```javascript
// DO NOT DO THIS
if (user.wantsSms) {
  await twilio.send(user.phone, "Order shipped!");
}
if (user.wantsEmail) {
  await sendgrid.send(user.email, "Order shipped!");
}
```

**The Production Architecture (Notification Engine):**
Use a dedicated notification routing infrastructure (e.g., **Novu**, **Courier**, or **Knock**).
Your backend sends a single, channel-agnostic event:
```javascript
await novu.trigger('order-shipped', {
  to: { subscriberId: user.id },
  payload: { trackingNumber: "12345" }
});
```
The Notification Engine evaluates the user's preferences, checks for channel availability, and handles the provider APIs (Twilio for SMS, SendGrid for Email, APNs for Push). This decouples your business logic from the delivery mechanism.

---

## 2. SMS Compliance and Opt-Ins (TCPA)

SMS boasts a 98% open rate, making it the most powerful channel in e-commerce. It is also the most heavily regulated.

In the US, violating the Telephone Consumer Protection Act (TCPA) carries fines of $500 to $1,500 *per text message sent*. 

**Implementation Requirements:**
1. **Explicit Opt-In:** You cannot text a customer just because they entered their phone number for shipping purposes. They must actively check a box specifically consenting to SMS updates.
2. **Double Opt-In:** The first message must require them to reply "Y" to confirm.
3. **Mandatory Opt-Out:** Every single marketing message must include "Reply STOP to cancel."
4. **Quiet Hours:** Do not send marketing texts between 9 PM and 8 AM in the recipient's local time zone.

**Architecture:** Use a managed SMS marketing provider like **Klaviyo** or **Attentive**. Do not build SMS compliance lists from scratch in your own database.

---

## 3. Web Push Notifications & In-App Inboxes

If you are building a Progressive Web App (PWA) or a Native App, you have access to Push Notifications.

**The Golden Rule of Push:** Do not abuse the permission prompt.
If you ask for Notification Permissions immediately on page load, 90% of users will click "Block", permanently locking you out of the channel on that device.

**Implementation Strategy:**
- **Contextual Prompting:** Only ask for push permission immediately after a successful checkout. *"Want live updates on when your package arrives? Enable notifications."* The conversion rate for this prompt is astronomically higher.

**The In-App Inbox:**
Push notifications are ephemeral. If the user clears them, they are gone. Implement a Bell Icon / Notification Center (using a tool like Knock or MagicBell) so users can view a history of their alerts (e.g., "Item is back in stock", "Order delivered").

---

## AI Prompt — Architect Your Notification System

```prompt
I am implementing a multi-channel notification system for a production e-commerce store.

Tech Stack:
- Backend: [e.g., Next.js / Node.js]
- Channels Required: [e.g., Email, SMS, In-App Web Push]
- Marketing Tool: [e.g., Klaviyo]

Act as a Principal Communications Architect:
1. Recommend a unified Notification Routing Engine (e.g., Novu, Courier, Knock) and write the backend code (TypeScript) to trigger an 'order_shipped' event abstractly.
2. Provide the strict legal compliance implementation plan for collecting SMS opt-ins during the checkout flow (TCPA compliance).
3. Architect the logic for Contextual Push Notification Prompting. When exactly should the frontend request browser push permissions to maximize opt-in rates?
4. Explain how I should handle the fallback logic if an SMS fails to deliver (e.g., invalid phone number) so the user still receives the critical update via Email.
```

---

## Notifications Implementation Checklist

- [ ] Notification routing decoupled from business logic using an engine like Novu or Courier
- [ ] Explicit SMS opt-in checkboxes implemented in the checkout flow (TCPA compliant)
- [ ] "Quiet Hours" and local timezone logic enforced for all non-critical SMS messages
- [ ] Push notification permission prompts deferred until a high-intent moment (e.g., post-purchase)
- [ ] In-app notification center (inbox) scoped for persistent alert history
- [ ] Fallback logic configured (e.g., if Push fails, send Email) for critical transactional alerts
