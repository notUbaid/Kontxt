---
title: Error States
slug: error-states
phase: Phase 1
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Error States (Transactional Safety)

In a standard application, an error is an annoyance. In a production marketplace, an error is a breach of financial trust. 

If a buyer clicks "Purchase," the loading spinner freezes, and an error pops up saying `500 Internal Server Error`, the buyer immediately assumes their credit card was charged for nothing. They will issue a chargeback, and your Stripe account health will plummet. 

Error states in production are not just UI components; they are critical compliance and trust-recovery mechanisms.

---

## The Three Tiers of Marketplace Errors

Your frontend architecture must explicitly design handlers for three tiers of failure:

### 1. The Validation Error (User Fault)
The user submitted invalid data (e.g., trying to set a negative price).
* **Production Rule:** Never use generic toast notifications (e.g., "Form contains errors"). Errors must be rendered inline, directly beneath the offending input, using your Design System's `Destructive` semantic color.

### 2. The Conflict Error (State Fault)
A buyer clicks "Book," but another buyer booked the exact same listing 400 milliseconds earlier. 
* **Production Rule:** This is a race condition. The backend must reject the second transaction, and the frontend must display a highly specific error: *"This listing was just booked by someone else. Your card has not been charged."*

### 3. The Transaction Error (Infrastructure Fault)
The Stripe API times out, or your database goes offline during checkout.
* **Production Rule:** You must engineer **Idempotency**. If the user clicks "Retry Checkout," your backend must recognize it as the *same* transaction attempt and not charge their card twice. The error message must explicitly state the financial status (e.g., *"Connection lost. Your payment was not processed. Please try again."*).

---

## Global Error Boundaries

In React (or any modern framework), an unhandled JavaScript exception will unmount the entire component tree, leaving the user staring at a blank white screen. 

> [!IMPORTANT]
> You must implement a Global Error Boundary (e.g., `error.tsx` in Next.js). If the application crashes, the boundary catches it and renders a branded fallback UI: *"Something went wrong on our end. Our engineering team has been notified."* 

Never allow a user to see a blank screen or a raw stack trace.

---

## Security: Preventing Data Leaks via Errors

In production, error messages are a primary vector for security breaches. 

If a user tries to access a dashboard they do not own, your API should not return:
`Error: User ID 492 does not have permissions for Account ID 881.`

This leaks database IDs to potential attackers (Insecure Direct Object Reference). 
Your API must catch this and return a generic UI message:
`You do not have permission to view this page.`

> [!WARNING]
> Raw database errors (e.g., `PostgresError: duplicate key value violates unique constraint`) must never reach the frontend. Your backend must catch these and translate them into human-readable, secure UI strings.

---

## AI Prompts for Error Architecture

> [!TIP]
> **Prompt 1 — The Checkout Failure Matrix:**

````prompt
I am building a [Your Niche] marketplace. Act as a Senior Payment Engineer. Map out the 5 most common points of failure during a Stripe Connect checkout flow (e.g., insufficient funds, network timeout after auth but before capture, race conditions). For each failure point, write the exact error copy the user should see, explicitly addressing the status of their funds.
````

> [!TIP]
> **Prompt 2 — Global Error Boundary React Component:**

````prompt
Write a production-ready Global Error Boundary component in React/Next.js. It must catch unhandled exceptions, log the error stack trace to an external service (like Sentry or Axiom), and render a highly accessible, branded fallback UI using Tailwind CSS that reassures the user and provides a "Return Home" button.
````

---

## Validating AI Output

- **Audit the Copy:** If AI suggests error copy that says "Oops! Something went wrong," rewrite it. Financial applications do not say "Oops." Use authoritative, clear language.
- **Check for Idempotency logic:** If the AI writes a checkout retry flow without including an `Idempotency-Key` in the Stripe API header, flag it as a critical architectural failure.

---

## Checklist: Error Architecture

## Checklist:
- [ ] Designed inline, per-field validation error states for all forms.
- [ ] Architected a specific "Conflict Error" state for race conditions (e.g., double-booking).
- [ ] Ensured all transaction-related error messages explicitly state the status of the user's funds.
- [ ] Designed and implemented a Global Error Boundary to catch fatal frontend crashes.
- [ ] Audited API responses to ensure raw database stack traces never leak to the client.

---

## What's Next

Next: **Loading States** — Now that we have handled missing data and broken logic, we must design the psychological bridge between states: what the user sees while they wait for the server.
