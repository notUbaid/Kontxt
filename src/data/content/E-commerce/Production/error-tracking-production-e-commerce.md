---
title: Error Tracking
slug: error-tracking
phase: Phase 4
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Error Tracking

In a production e-commerce store, silent errors are the most expensive bugs. 

If a user tries to add an item to their cart and a JavaScript exception crashes the UI silently, they will leave. They will not email support. You simply lose the revenue, and you have no idea why.

Error tracking ensures that the exact stack trace, the user's browser details, and the API payload are captured and alerted on immediately.

---

## 1. Frontend Exception Tracking

When React code crashes on a user's mobile browser, you cannot access their DevTools console.

**The Implementation:**
Integrate a frontend error tracker like **Sentry**, **Bugsnag**, or **Datadog RUM**.
- Configure React Error Boundaries to catch UI crashes and prevent the entire page from going white (the "White Screen of Death").
- The Error Boundary renders a graceful fallback (e.g., "Something went wrong, please refresh") and sends the stack trace to Sentry.

**Session Replay (The Silver Bullet):**
For e-commerce, stack traces are often not enough to understand *why* a user failed to checkout. Tools like **LogRocket** or Sentry Session Replay record a video-like reproduction of the user's screen. If a customer complains "I can't check out," you can watch the exact session replay, see where they clicked, and watch the exact API failure happen in real-time.

---

## 2. Backend Exception Tracking

Backend errors dictate your store's reliability.

**The Implementation:**
Wrap all API routes and background queue handlers in an error-tracking SDK (e.g., Sentry for Node.js).
- Ensure the SDK captures the exact HTTP Request payload (minus PII/credit cards).
- **Tagging (Critical):** Always tag the error with the `user_id` and the `order_id` (if they exist in the context). When an error fires, you need to know exactly which customer was affected so your support team can proactively email them.

```javascript
try {
  await capturePayment(orderId);
} catch (error) {
  Sentry.withScope((scope) => {
    scope.setTag("order_id", orderId);
    scope.setTag("user_id", user.id);
    Sentry.captureException(error);
  });
  throw error; // Re-throw to ensure the HTTP response is a 500
}
```

---

## 3. Alert Fatigue (Signal vs Noise)

If your error tracker emails your engineering team 500 times a day for benign 404 errors (like a bot searching for `wp-admin`), the team will stop reading the emails. When the checkout actually breaks, nobody will notice.

**The Production Rule:** Tune out the noise.
- **Ignore Expected Errors:** Do not send alerts for standard `400 Bad Request` errors (e.g., a user enters an invalid zip code). These are user errors, not system failures.
- **Set Velocity Alerts:** If a specific `TypeError` fires once, log it. If it fires 100 times in 5 minutes, page the on-call engineer via PagerDuty.
- **Alert on Unhandled Exceptions:** Any 500 Internal Server Error in the checkout flow must be treated as a Severity 1 incident.

---

## 4. Third-Party API Degradation

E-commerce relies on APIs (TaxJar, Stripe, Shippo) that you do not control.

When Stripe goes down, Sentry will suddenly flood with `StripeConnectionError`. You must separate internal bugs (your fault) from external API outages (their fault).

**Implementation:**
Create distinct error classes in your code (`StripeError`, `TaxApiError`, `InternalDatabaseError`). Group your Sentry alerts based on these classes. If a `StripeError` spikes, your team knows to check the Stripe Status page rather than debugging your own codebase.

---

## AI Prompt — Architect Your Error Tracking Strategy

```prompt
I am implementing error tracking for a production e-commerce store.

Tech Stack:
- Frontend: [e.g., Next.js React]
- Backend: [e.g., Node.js / Serverless]
- Error Tooling: [e.g., Sentry / LogRocket]

Act as a Principal Software Engineer:
1. Provide the React Error Boundary implementation required to gracefully handle a UI crash on the Product Detail Page and send the stack trace to Sentry.
2. Write the backend Node.js configuration to automatically capture all 500 errors, ensuring that PII (like email addresses) is redacted before the error leaves the server.
3. Outline the Alerting Rules (Velocity vs Volume) I should configure in Sentry to ensure my on-call engineers are paged for critical checkout failures, but not annoyed by 404 bot traffic.
4. Explain how to implement Session Replay safely (e.g., via LogRocket) without accidentally recording user credit card keystrokes on the checkout page.
```

---

## Error Tracking Checklist

- [ ] Frontend Error Boundaries implemented to catch React crashes and prevent white screens
- [ ] Backend error SDK (Sentry/Bugsnag) installed and capturing all unhandled 500 exceptions
- [ ] Session Replay tooling (LogRocket/Sentry) configured with strict redaction rules on password and credit card inputs
- [ ] Context tagging (`user_id`, `order_id`) applied to backend errors for proactive customer support
- [ ] Alerting thresholds tuned to filter out expected 400 errors and bot traffic (preventing alert fatigue)
- [ ] Escalation policies defined (e.g., PagerDuty) for velocity spikes on critical path errors
