---
title: User Flows
slug: user-flows
phase: Phase 1
mode: production
projectType: marketplace
estimatedTime: 25-30 min
---

# User Flows

Your PRD defines *what* the core transaction is. User Flows define *how* it executes.

In a production environment, you are not just mapping screens; you are mapping State Machines. If your user flow does not account for a user abandoning a checkout halfway through, or a seller failing an identity check, your database will fill with orphaned records and your engineering team will be forced to guess the business logic.

---

## Why Production Flows Must Be Exhaustive

A wireframe shows a static screen. A user flow maps the connective tissue between screens, including backend validation steps that have no UI.

> [!WARNING]
> Most marketplace bugs are not UI errors; they are state transition errors. (e.g., A buyer clicks "Book," the card is charged, but the network drops before the database updates). Your flows must map the exact sequence of API calls and state changes, not just "Screen A goes to Screen B."

---

## The Core Production Flows

Your MVP must rigidly define the following workflows. Every step must document the UI state, the backend action, and the failure fallback.

1. **Supply Onboarding & KYC:** Account creation, inventory upload, and Stripe Identity verification.
2. **Demand Discovery:** Search, filter, algorithmic ranking, and listing detail view.
3. **The Transaction (Escrow):** Checkout, Payment Intent authorization, Escrow hold, and Webhook fulfillment.
4. **The Resolution:** Payout routing or dispute initiation.

---

## Defining a State-Machine Flow

Do not write vague descriptions. Write structural logic. Use this format for every core flow before moving to Figma.

```text
## Flow: The Secure Transaction (Buyer to Seller)

1. [Screen: Listing Detail] Buyer clicks "Purchase / Book".
2. [Auth Check] Middleware checks session.
   - If False: Redirect to /login with `?redirect=/listing/123`.
   - If True: Proceed to step 3.
3. [Screen: Checkout] Buyer enters payment details. Clicks "Confirm".
4. [Backend: Stripe] Create PaymentIntent (status: requires_capture).
   - If Card Declined: Return to Screen Checkout with error `insufficient_funds`.
   - If Success: Proceed to step 5.
5. [Backend: Database] Update Listing status to `locked` or `booked`.
6. [Screen: Success] Display confirmation. Trigger email webhook.
```

> [!DECISION]
> If a step in your flow relies on a third-party API (like Stripe or a Background Check API), you must explicitly map the "Pending" and "Failed" states. Asynchronous API calls are the number one cause of broken user experiences.

---

## Handling "The Unhappy Path"

Production applications spend 80% of their code handling the 20% of cases where things go wrong. Your flows must explicitly map the Unhappy Paths:

- **The Stale Inventory Check:** What happens if two buyers click "Book" on the same item at the exact same millisecond? (Database Race Condition).
- **The KYC Failure:** What happens if a seller generates $1,000 in GMV but then fails their tax identity verification? Where does the money go?
- **The Abandoned Cart:** If a buyer locks an item in their cart but doesn't check out, how many minutes before the system releases the lock?

---

## Visualizing Flows (Mermaid.js)

For complex multi-party workflows, text is often insufficient. Use Mermaid.js diagrams to visualize the state transitions between the Buyer, the Platform, and the Seller.

````mermaid
sequenceDiagram
    participant Buyer
    participant Platform
    participant Stripe
    participant Seller

    Buyer->>Platform: Initiates Booking
    Platform->>Stripe: Create PaymentIntent (Auth only)
    Stripe-->>Platform: Auth Success
    Platform->>Seller: Notify: Accept or Decline?
    alt Seller Accepts
        Seller->>Platform: Accept Booking
        Platform->>Stripe: Capture Payment (Escrow)
        Platform->>Buyer: Booking Confirmed
    else Seller Declines or Timeouts
        Platform->>Stripe: Cancel PaymentIntent
        Platform->>Buyer: Booking Failed / Refunded
    end
````

> [!TIP]
> If a flow requires a sequence diagram to understand, it is likely too complex for an MVP. Look at the diagram and ruthlessly ask: "Can we remove a step?"

---

## AI Prompts for User Flow Engineering

> [!TIP]
> **Prompt 1 — Generating the State Machine:**

````prompt
Here is the Core Loop from my PRD: [Paste PRD Core Loop]. 
Translate this paragraph into a strict, step-by-step User Flow state machine. For every step, define the UI Screen, the Backend Action, and the exact fallback route if the backend action fails (The Unhappy Path). Ensure you account for authentication checks and payment authorization states.
````

> [!TIP]
> **Prompt 2 — Race Condition Audit:**

````prompt
Review this user flow: [Paste Flow]. Act as a Senior Backend Engineer. Identify any potential race conditions, asynchronous API timeout risks, or edge cases where the user's UI state might fall out of sync with the database state. Suggest specific architectural fixes for the flow.
````

---

## Validating AI Output

- **Reject "Magic" Steps:** If the AI writes a step like "The system securely processes the payment," reject it. Force it to define exactly *how* (e.g., "Client receives Stripe token, sends to backend, backend creates PaymentIntent").
- **Verify Authentication Persistence:** Ensure the AI maps the exact routing for unauthenticated users, specifically returning them to their intended action after logging in, rather than dumping them onto a generic dashboard.

---

## Checklist: Flow Architecture

## Checklist:
- [ ] Mapped the step-by-step state machine for Supply Onboarding.
- [ ] Mapped the step-by-step state machine for the Core Transaction.
- [ ] Explicitly defined the "Unhappy Path" for every third-party API call (Payments, KYC).
- [ ] Audited the transaction flow for double-booking race conditions.
- [ ] Documented the exact state transitions for Escrow (Auth, Capture, Payout, Refund).

---

## What's Next

Next: **Wireframes** — Now that the exact sequence of screens and decisions is mathematically mapped, we will design the visual interfaces required to execute them.
