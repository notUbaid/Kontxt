---
title: Checkout Flow
slug: checkout-flow
phase: Phase 1
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Checkout Flow

Checkout is where intent becomes revenue — or doesn't.

The average e-commerce cart abandonment rate is 70%. Most of that abandonment is not price hesitation. It's friction: unexpected costs, too many fields, forced account creation, unclear next steps, or a payment form that feels untrustworthy.

You cannot fix abandonment with discounts. You fix it with design.

---

## The Guiding Principle

Every step in checkout exists to collect information you need to fulfill the order. Nothing else belongs there.

If you're asking for something that doesn't directly enable fulfillment — remove it.

---

## Checkout Stages

```
Cart → Contact → Shipping Address → Shipping Method → Payment → Confirmation
```

This is the standard sequence. Deviating from it without a strong reason increases abandonment because users have learned this pattern across thousands of stores.

**What each stage collects:**

| Stage | Collects | Why |
|---|---|---|
| Cart | Nothing — review only | Confirm intent before asking for data |
| Contact | Email (+ optional phone) | Order confirmation, shipping updates |
| Shipping Address | Full delivery address | Where to send it |
| Shipping Method | Carrier + speed selection | Cost and ETA commitment |
| Payment | Card / PayPal / Apple Pay | Revenue |
| Confirmation | Nothing — confirms only | Closes the loop, reduces anxiety |

---

## Stage 1 — Cart

The cart is not checkout. It's a staging area.

**What it must do:**
- Show every item with image, title, variant, quantity, price
- Allow quantity adjustment and item removal
- Show order subtotal
- Show estimated shipping (or "calculated at next step")
- Show a clear "Proceed to Checkout" CTA

**What it must not do:**
- Surprise users with fees they haven't seen
- Auto-apply coupons that inflate the subtotal then discount it (dark pattern)
- Hide the total behind a "View Order Summary" collapse on mobile

> **Tip:** Show a trust bar at the cart stage — free shipping threshold, return policy, secure checkout badge. Users are deciding whether to proceed. Answer their objections here.

---

## Stage 2 — Contact

**Ask for:**
- Email address
- Optional: phone number (for shipping carrier notifications only — say so)

**Guest checkout:**
This must be the default path. Do not put "Create an Account" above "Continue as Guest." Do not make account creation mandatory.

The right pattern:

```
┌─────────────────────────────────────┐
│  Contact                            │
│                                     │
│  Email ________________________     │
│                                     │
│  [ ] Sign up for updates            │
│                                     │
│  Already have an account? Log in    │
│                                     │
│  [  Continue to Shipping  ]         │
└─────────────────────────────────────┘
```

Account creation comes after the order is placed — not before. Offer it on the confirmation page: "Save your details for next time."

---

## Stage 3 — Shipping Address

**Fields — collect only what you need:**

```
First name          Last name
Address line 1
Address line 2 (optional)
City                State / Province
ZIP / Postal code   Country
```

**Enable address autocomplete.** Google Places Autocomplete or browser-native autocomplete reduces errors and speeds up entry significantly. A shipping address with a typo costs you a failed delivery and a customer service headache.

> **Warning:** Do not ask for a billing address at this stage unless your payment processor requires it separately. Stripe and most modern processors handle billing address verification within the payment form. Asking twice is unnecessary friction.

---

## Stage 4 — Shipping Method

Show the actual options with real prices and estimated delivery dates.

```
┌─────────────────────────────────────────┐
│  Shipping Method                        │
│                                         │
│  ◉ Standard — Free          5–7 days    │
│  ○ Express — $8.99          2–3 days    │
│  ○ Overnight — $19.99       Next day    │
│                                         │
│  [  Continue to Payment  ]              │
└─────────────────────────────────────────┘
```

**Rules:**
- Always show the price and estimated delivery date together
- Pre-select the cheapest option, not the fastest
- If you offer free shipping, make it the obvious default
- Don't show carriers the customer can't influence (they don't care if it's FedEx or USPS — they care about when it arrives and what it costs)

---

## Stage 5 — Payment

This is the highest-anxiety step. Design for trust.

**What to show:**
- Order summary (always visible — never hidden behind a toggle on mobile)
- HTTPS lock + "Secure Checkout" label
- Accepted payment method logos
- The actual payment form

**Payment methods to support:**

| Method | Priority | Why |
|---|---|---|
| Credit / Debit card | Required | Universal |
| Apple Pay / Google Pay | High | One-tap on mobile, massive conversion lift |
| PayPal | Medium | Trust anchor for users who don't trust your store yet |
| Buy Now Pay Later (Klarna, Afterpay) | Optional | Increases AOV on higher-priced items |

> **Tip:** Apple Pay and Google Pay on mobile can increase checkout completion by 20–30% for impulse purchases. If you're using Stripe, enabling them takes one line of config. Do it.

**Card form design:**

```
Card number  [____ ____ ____ ____] [card icon]
Expiry       [MM/YY]
CVC          [___] (?)
Name on card [________________]
```

Use Stripe Elements or Stripe's prebuilt Checkout — don't build a card form from scratch. You will introduce security vulnerabilities, fail PCI compliance, and spend weeks debugging edge cases that Stripe has already solved.

---

## Stage 6 — Confirmation

The confirmation page closes the anxiety loop. A customer who completes payment and sees nothing but a spinner will raise a chargeback.

**What confirmation must show:**
- Order number (prominently)
- Summary of what was ordered
- Delivery address
- Estimated delivery date
- What happens next ("You'll receive a shipping confirmation email when your order dispatches")

**What confirmation enables:**
- "Create an account to track your order" prompt (post-purchase account creation — highest conversion moment)
- Email capture for non-subscribed users
- Upsell or cross-sell (use sparingly — don't undermine the completed purchase feeling)

---

## Progress Indicator

Users need to know where they are and how much is left. Show it at every step.

```
  Cart  →  Contact  →  Shipping  →  Payment  →  Done
                           ↑ (you are here)
```

**Rules:**
- Show completed steps as clickable (let users go back and edit)
- Show future steps as inactive (not clickable forward)
- Never show a step count that changes mid-checkout

---

## Order Summary — Always Visible

On desktop, the order summary lives in a persistent right column throughout checkout. On mobile, it collapses to a header that users can expand.

Never fully hide the order summary. A user who can't see what they're paying for will not pay.

**Order summary contains:**
- Product thumbnail, title, variant, quantity
- Line item prices
- Subtotal
- Shipping cost (once selected)
- Taxes (once address is entered)
- **Total** — bold, prominent

---

## Common Abandonment Causes — And Fixes

| Cause | Fix |
|---|---|
| Unexpected shipping cost at payment | Show shipping estimate in cart, finalize at shipping method step |
| Forced account creation | Guest checkout by default, account offer post-purchase |
| Too many form fields | Remove everything not required for fulfillment |
| Checkout felt untrustworthy | HTTPS, payment logos, no visual bugs, no broken images |
| Payment form errors unclear | Inline validation with specific messages ("Card number must be 16 digits") |
| Couldn't use preferred payment method | Add Apple Pay / Google Pay / PayPal |
| Process felt too long | Combine contact + shipping on one step if catalog is simple |

---

## AI Prompt — Design Your Checkout Flow

<copy-prompt>
I'm designing the checkout flow for my personal e-commerce store.

Store details:
- Products: [what you sell]
- Average order value: [estimated]
- Shipping: [domestic only / international / both]
- Payment processor: [Stripe / other]
- Guest checkout: yes
- User accounts: [yes / no]

Design my complete checkout flow:

1. Recommended steps and what each collects (remove any steps that don't apply to my store type)
2. Form field list for each step — only fields I genuinely need
3. Shipping method display — how to present options for my shipping setup
4. Payment methods I should support given my AOV and customer base
5. Mobile checkout considerations specific to my store
6. The 3 most likely abandonment points for my store type and how to address each
7. Post-purchase confirmation page structure

Flag any complexity I should defer to a later phase.
</copy-prompt>

---

## Validating AI Output

- **Missing guest checkout** — if the AI designs a flow that requires login before purchase, reject it
- **Billing address as a separate step** — only necessary for stores not using Stripe or a modern processor; push back if added unnecessarily
- **No order summary in payment step** — a payment step without a visible order summary is incomplete
- **Vague confirmation page** — "Thank you for your order" alone is not enough; order number and next steps must be explicit
- **No Apple Pay / Google Pay** — for any Stripe-based store, these should be included; absence is an oversight

---

## Checkout Design Checklist

- [ ] Guest checkout is the default — no mandatory account creation
- [ ] Progress indicator visible at every step
- [ ] Order summary visible throughout (right column desktop, collapsible mobile)
- [ ] Shipping cost shown before payment step — no surprises
- [ ] Address autocomplete enabled
- [ ] Stripe Elements used for card form (not custom built)
- [ ] Apple Pay and Google Pay enabled
- [ ] Payment step shows HTTPS + accepted payment logos
- [ ] Inline form validation with specific error messages
- [ ] Confirmation page shows order number, summary, delivery address, next steps
- [ ] Post-purchase account creation offered on confirmation page
