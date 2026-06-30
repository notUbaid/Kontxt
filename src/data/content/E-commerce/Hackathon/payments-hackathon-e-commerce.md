---
title: Payments
slug: payments
phase: Phase 3
mode: hackathon
projectType: e-commerce
estimatedTime: 25–35 min
---

# Payments

Payments is the most technically loaded decision in your build. Get it wrong and your demo breaks at the worst possible moment — right when a judge tries to complete a purchase.

Get it right and your store feels real in a way no amount of design polish can replicate.

This module tells you exactly what to implement, how to implement it, and what to avoid.

---

## Your Options, Ranked

You decided your payment approach in the PRD. This module tells you how to execute it.

| Approach | Build time | Demo quality | Recommended if... |
|---|---|---|---|
| **Stripe test mode** | 2–4 hrs | Excellent | You have the time and want full marks |
| **Simulated checkout** | 30–60 min | Good | You're short on time or your hackathon doesn't require real payments |
| **No payment flow** | 0 hrs | Poor | Never. Always have something. |

> If you're undecided: choose Stripe test mode if you have more than 8 hours left. Choose simulated if you have less. A convincing simulation beats a broken Stripe integration every time.

---

## Path A: Stripe Test Mode

### Why Stripe

Stripe is the industry standard. Judges from technical backgrounds will recognise it immediately. It signals engineering maturity.

More importantly: Stripe's test mode is genuinely easy to set up and completely free. There is no reason to use a different payment provider for a hackathon.

### What You're Building

```
Checkout form (your UI)
  ↓
Stripe Elements (card input — embedded in your form)
  ↓
Your backend creates a PaymentIntent
  ↓
Stripe confirms payment (test mode — no real money)
  ↓
Your frontend shows Order Confirmation
```

### Setup Steps

**1. Create a Stripe account**
Go to [stripe.com](https://stripe.com) → sign up → no business verification needed for test mode.

**2. Get your test keys**
Dashboard → Developers → API Keys
- `pk_test_...` → your publishable key (safe for frontend)
- `sk_test_...` → your secret key (backend only, never expose this)

**3. Install Stripe**

```bash
# Frontend
npm install @stripe/stripe-js @stripe/react-stripe-js

# Backend (Node.js)
npm install stripe
```

**4. Backend: Create a PaymentIntent endpoint**

```javascript
// POST /api/create-payment-intent
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { amount } = await req.json(); // amount in cents

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
  });

  return Response.json({ clientSecret: paymentIntent.client_secret });
}
```

**5. Frontend: Embed Stripe Elements**

```jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/order-confirmation` },
    });
    if (error) console.error(error.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe}>Pay Now</button>
    </form>
  );
}

export default function Checkout({ amount }) {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })
      .then(r => r.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [amount]);

  return clientSecret ? (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  ) : <p>Loading...</p>;
}
```

**6. Test card numbers**

| Card number | Result |
|---|---|
| `4242 4242 4242 4242` | Payment succeeds |
| `4000 0000 0000 9995` | Payment declined |
| `4000 0025 0000 3155` | Requires authentication (3D Secure) |

Use any future expiry, any 3-digit CVC, any 5-digit zip.

---

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

> **Never commit your secret key.** Add `.env.local` to `.gitignore`. This is a non-negotiable security rule even in a hackathon.

---

## Path B: Simulated Checkout

Build a real-looking checkout form that completes without a payment processor.

### What to Build

```
Checkout form (name, email, address, fake card fields)
  ↓
"Place Order" button click
  ↓
500ms loading state (setTimeout — feels real)
  ↓
Redirect to Order Confirmation page
```

### Implementation

```jsx
const [loading, setLoading] = useState(false);

const handlePlaceOrder = async () => {
  setLoading(true);
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  router.push('/order-confirmation');
};
```

### Make the Card Fields Look Real

Don't use a plain text input for the card number. Style it to look like a payment form:

```jsx
<div className="payment-field">
  <label>Card Number</label>
  <input
    type="text"
    placeholder="4242 4242 4242 4242"
    maxLength={19}
    // Auto-format with spaces
    onChange={(e) => {
      const v = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      e.target.value = v;
    }}
  />
</div>
<div className="payment-field-row">
  <input type="text" placeholder="MM / YY" maxLength={7} />
  <input type="text" placeholder="CVC" maxLength={3} />
</div>
```

> Add a small lock icon and "Secured by SSL" text below the form. It takes 5 minutes and significantly improves the perception of legitimacy.

---

## Common Mistakes to Avoid

| Mistake | Consequence | Fix |
|---|---|---|
| Exposing `sk_test_` key in frontend code | Security failure — instant disqualification at real companies | Move all secret key usage to backend only |
| Amount in dollars instead of cents | Stripe charges $0.01 instead of $10.00 | Always multiply by 100: `price * 100` |
| No loading state on payment button | Judge clicks twice, duplicate order | Disable button immediately on first click |
| Redirect before payment confirms | Confirmation page shows before payment processes | Only redirect inside Stripe's `return_url` or after `confirmPayment` resolves |
| No error handling | Silent failure — judge sees nothing happen | Always handle `error` from `confirmPayment` |

---

## Use AI to Debug Payment Issues

If your Stripe integration breaks, use this prompt:

```
I'm integrating Stripe into a [Next.js / React + Express] e-commerce app for a hackathon.

Here is my current error:
[paste exact error message]

Here is the relevant code:
[paste the component or function that's failing]

Diagnose the issue and give me a precise fix. Tell me:
1. What is causing this error
2. The corrected code
3. Whether this would cause problems in production (briefly)

Do not rewrite the entire component — only fix the failing part.
```

---

## Validate Before You Move On

**If using Stripe:**
- [ ] Test card `4242 4242 4242 4242` completes successfully
- [ ] Declined card `4000 0000 0000 9995` shows an error message, not a blank screen
- [ ] Secret key is in `.env` only — not in any frontend file
- [ ] Amount is calculated in cents
- [ ] Order Confirmation page loads after successful payment
- [ ] Button is disabled during payment processing

**If using simulated checkout:**
- [ ] Form has all expected fields: name, email, address, card details
- [ ] Card number field auto-formats with spaces
- [ ] Loading state appears on submit (minimum 1 second)
- [ ] Redirects to Order Confirmation, not a blank page
- [ ] Lock icon or "Secured" text is visible near the form

---

> **Next module:** Products →
>
> You'll implement your product catalog — how data is structured, stored, and rendered across every page that needs it.
