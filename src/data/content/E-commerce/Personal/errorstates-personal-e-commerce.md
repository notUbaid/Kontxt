---
title: Error States
slug: error-states
phase: Phase 1
mode: personal
projectType: e-commerce
estimatedTime: 15–20 min
---

# Error States

Error states are the moment your store's reliability is most visible. Every other UI element communicates what the store can do. Error states communicate how the store behaves when things go wrong.

Customers do not expect perfection. They expect honesty and a path forward.

A store that handles errors gracefully — with clear messages, specific guidance, and no data loss — earns more trust than one that never surfaces an error but breaks silently when it does.

---

## The Two Categories of Errors

### User Errors
The customer did something the system cannot process: invalid card number, missing field, unsupported postcode. These are expected and recoverable. The UI should make recovery effortless.

### System Errors
Something failed on your end or your provider's end: payment gateway timeout, server error, inventory sync failure, network interruption. These are unexpected and require different handling — honest acknowledgment, no data loss, a retry path.

Design both. Ship both.

---

## Error State Inventory

Every context where an error can occur in an e-commerce store:

| Context | Error Type | Stakes |
|---|---|---|
| Checkout — invalid form field | User | High |
| Checkout — payment declined | User / System | Critical |
| Checkout — payment gateway timeout | System | Critical |
| Checkout — item sold out during checkout | System | Critical |
| Checkout — network failure mid-submission | System | Critical |
| Add to cart — item now out of stock | System | High |
| Product page — variant out of stock | System | Medium |
| Search — service unavailable | System | Medium |
| Page not found (404) | Navigation | Medium |
| Server error (500) | System | High |
| Image failed to load | System | Low |

---

## Checkout — Payment Declined

The highest-stakes error in your store. A customer has committed to buying, entered their card details, and been rejected. This is an emotionally charged moment.

**What not to do:**
- Clear the entire form
- Show a generic "Something went wrong"
- Redirect to the homepage
- Show a technical error code without explanation

**What to do:**

```
┌────────────────────────────────────────────┐
│    Payment unsuccessful                  │
│                                            │
│  Your card was declined. Your order        │
│  has not been placed and you have          │
│  not been charged.                         │
│                                            │
│  Common reasons:                           │
│  · Incorrect card number or expiry         │
│  · Insufficient funds                      │
│  · Card not enabled for online payments    │
│                                            │
│  [ Try a different card ]                  │
│  [ Contact your bank ]                     │
└────────────────────────────────────────────┘
```

Critical rules for payment declined states:
- Explicitly state "you have not been charged" — this is the first thing the customer fears
- Keep all form fields populated — never make them re-enter shipping details
- Provide specific recovery paths, not generic advice
- Never log or display raw payment gateway error codes to the customer

---

## Checkout — Item Sold Out During Checkout

Race condition: the customer added the last unit to cart, began checkout, and by the time payment was submitted another order beat them to it.

```
┌────────────────────────────────────────────┐
│    One item is no longer available       │
│                                            │
│  Cedar & Smoke (200ml) sold out while      │
│  your order was being processed.           │
│  You have not been charged.                │
│                                            │
│  [ Return to Cart ]                        │
│  [ Browse similar products ]               │
└────────────────────────────────────────────┘
```

Rules:
- Name the specific item — never say "one or more items"
- Confirm no charge
- Return them to cart with the sold-out item flagged, not removed — let them decide

---

## Checkout — Network Failure Mid-Submission

The most dangerous error. The customer clicked "Place Order," the request was sent, and the response never arrived. You don't know if the order was created or not.

This is a critical design problem: if the customer clicks again, they might be charged twice.

**Frontend handling:**
```
┌────────────────────────────────────────────┐
│    Connection interrupted                │
│                                            │
│  We couldn't confirm your order.           │
│  Please check your email before trying     │
│  again — your order may have been placed.  │
│                                            │
│  [ Check my email ]                        │
│  [ Contact us ]                            │
└────────────────────────────────────────────┘
```

**Backend requirement:** Your order creation endpoint must be idempotent. If the same payment intent is submitted twice, the second submission should return the existing order rather than creating a duplicate charge. Payment providers like Stripe and Razorpay handle this via idempotency keys — use them.

---

## Form Validation Errors

Inline validation is the correct pattern for checkout forms. Errors appear immediately beneath the relevant field, not in a banner at the top of the page.

```
┌────────────────────────────────────────┐
│  Email address                         │
│  ┌────────────────────────────────┐    │
│  │ ubaid@                         │    │
│  └────────────────────────────────┘    │
│   Please enter a valid email address  │  ← Red, beneath field
│                                        │
│  Phone number                          │
│  ┌────────────────────────────────┐    │
│  │ 98765                          │    │
│  └────────────────────────────────┘    │
│   Enter a 10-digit mobile number      │
└────────────────────────────────────────┘
```

**Rules:**
- Validate on blur (when the user leaves the field), not on keystroke
- Never validate on page load — empty fields are not errors
- Show one error per field maximum
- Be specific: "Enter a 10-digit mobile number" not "Invalid phone"
- On form submit with multiple errors, move focus to the first erroring field
- Associate errors with fields via `aria-describedby` (from Accessibility module)

---

## Add to Cart — Out of Stock

The customer clicks Add to Cart on a variant that just sold out.

```
┌────────────────────────────────────────┐
│  This variant is currently sold out.   │
│  Select a different option or check    │
│  back later.                           │
└────────────────────────────────────────┘
```

Ideally, sold-out variants are visually indicated before the customer selects them (strikethrough, greyed-out swatch, "Sold Out" label). But when it happens at the button level, the message must be inline — not a toast, not a modal.

---

## 404 — Page Not Found

Deleted products, changed URLs, and mistyped paths all hit your 404. Design it.

```
┌─────────────────────────────────────────┐
│                                         │
│   Page not found                        │
│                                         │
│   The page you're looking for has       │
│   moved or doesn't exist.               │
│                                         │
│   [ Go to Homepage ]                    │
│   [ Browse Products ]                   │
│                                         │
└─────────────────────────────────────────┘
```

**Additional requirement:** If you delete or rename a product, set up a 301 redirect from the old URL to the new one or to `/products`. A 404 on a product page loses any SEO value that page had accumulated. Most frameworks handle this in a `redirects` config file.

---

## 500 — Server Error

Something broke on your end. The customer did nothing wrong.

```
┌─────────────────────────────────────────┐
│                                         │
│   Something went wrong on our end       │
│                                         │
│   We're working on it. Please try       │
│   again in a moment, or contact us      │
│   if the problem continues.             │
│                                         │
│   [ Try Again ]                         │
│   [ Contact Us ]                        │
│                                         │
└─────────────────────────────────────────┘
```

Rules:
- Never show a stack trace to the customer
- Log the full error server-side (Phase 4 covers error tracking)
- "Try Again" should retry the same action, not navigate away

---

## The Error Component Pattern

Like empty states, all error messages should share a composable component.

```tsx
interface ErrorStateProps {
  severity: 'warning' | 'error' | 'info'
  title: string
  description?: string
  details?: string[]       // Bullet points for specific guidance
  actions: {
    label: string
    href?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary'
  }[]
}
```

And a separate inline field error component for forms:

```tsx
interface FieldErrorProps {
  id: string              // Matches aria-describedby on input
  message: string
}
```

Two components. Every error state in your store is a configuration of one of them.

---

## Error Message Writing Rules

| Rule | Bad | Good |
|---|---|---|
| Be specific | "Payment failed" | "Your card was declined" |
| No blame | "You entered an invalid email" | "This doesn't look like a valid email" |
| Confirm safety | "Error occurred" | "You have not been charged" |
| Give next step | "Card declined." | "Try a different card or contact your bank" |
| No jargon | "Gateway timeout (ERR_502)" | "Payment couldn't be processed. Try again." |
| No exclamation | "Oops! Something went wrong!" | "Something went wrong on our end" |

---

##  Error States Checklist

- [ ] Payment declined state designed: no charge confirmed, form preserved, specific recovery options
- [ ] Payment gateway timeout state designed: warns about duplicate submission risk
- [ ] Sold-out during checkout state designed: names the item, confirms no charge
- [ ] Network failure mid-checkout state designed: warns before retry
- [ ] Checkout form validation: inline errors beneath fields, validates on blur not keystroke
- [ ] Add to cart — sold-out error handled inline (not modal or toast)
- [ ] 404 page designed with navigation recovery options
- [ ] 500 page designed with retry and contact options
- [ ] No raw error codes or stack traces exposed to customers
- [ ] All error messages follow writing rules above
- [ ] Reusable `<ErrorState>` and `<FieldError>` components planned
- [ ] Payment endpoint uses idempotency keys to prevent double charges

---

## AI Prompt — Generate Error Handling Code

```
I am building a personal e-commerce store using [React / Next.js / other].
My payment provider is [Razorpay / Stripe].

Generate the following error handling implementations:

1. A React `<FieldError>` component for inline form validation errors
   - Props: id (string), message (string)
   - Must include aria-describedby compatibility
   - Styled with: error color from CSS variables

2. A React `<ErrorState>` component for page-level and checkout errors
   - Props: severity, title, description, details (string[]), actions
   - Severity variants: warning (amber), error (red), info (blue)

3. A checkout form submit handler that:
   - Validates all required fields before submission
   - Sets field-level errors on validation failure and moves focus to first error
   - Handles payment declined response from [Razorpay / Stripe] specifically
   - Handles network timeout with the "check your email before retrying" message
   - Uses an idempotency key on the payment request

Include TypeScript types. Do not clear form state on payment failure.
```

---

## What Comes Next

With empty and error states handled, there is one more transitional UI category: loading states. These are the moments between a user action and the system's response — and in checkout, they are the moments of highest anxiety.

**Next: Loading States →**
