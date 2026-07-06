---
title: Checkout
slug: checkout
phase: Phase 3
mode: hackathon
projectType: e-commerce
estimatedTime: 25–35 min
---

# Checkout

Checkout is the climax of your demo. Every prior module — catalog, product page, cart — builds toward this moment.

If a judge completes a purchase and lands on a confirmation page, your store passes the most important test: it works end to end. That feeling is what wins hackathons.

This module wires your cart data to your payment logic and closes the loop with a confirmation page that feels earned.

---

## Checkout Page Architecture

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   [Customer Info Form]    [Order Summary]       │
│   Name                    Item 1 — $45          │
│   Email                   Item 2 — $30          │
│   Address                 ─────────────         │
│                           Subtotal   $75        │
│   [Payment Section]       Shipping   Free       │
│   Card / Stripe           ─────────────         │
│                           Total      $75        │
│   [Place Order Button]                          │
│                                                 │
└─────────────────────────────────────────────────┘
```

Two-column on desktop. Single column stacked on mobile (form on top, summary on bottom).

---

## Form Fields

Keep it minimal. Every extra field increases abandonment and slows your demo.

**Required fields:**

```tsx
// Customer info
<input name="fullName"    placeholder="Full name"         required />
<input name="email"       placeholder="Email address"     type="email" required />

// Shipping address
<input name="address"     placeholder="Street address"    required />
<input name="city"        placeholder="City"              required />
<input name="postalCode"  placeholder="Postal / ZIP code" required />
<select name="country">
  <option value="US">United States</option>
  <option value="IN">India</option>
  {/* Add 3–5 countries relevant to your store */}
</select>
```

**Do not add:**
- Phone number (unnecessary friction)
- Company name
- Address line 2 (only if judge asks)
- State/province dropdown (adds complexity, postal code is enough for a demo)

---

## Full Checkout Component

```tsx
// app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

type FormData = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [form, setForm] = useState<FormData>({
    fullName: '', email: '', address: '', city: '', postalCode: '', country: 'US',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');

  // Redirect if cart is empty
  if (items.length === 0 && status !== 'done') {
    router.push('/cart');
    return null;
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!form.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus('processing');
    // --- Stripe path: trigger payment here ---
    // --- Simulated path: setTimeout below ---
    await new Promise(resolve => setTimeout(resolve, 1500));
    clearCart();
    router.push('/order-confirmation');
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-grid">
        {/* LEFT: Form */}
        <div className="checkout-form">
          <section>
            <h2>Contact</h2>
            <Field label="Full name" name="fullName" form={form} errors={errors} onChange={handleChange} />
            <Field label="Email" name="email" type="email" form={form} errors={errors} onChange={handleChange} />
          </section>

          <section>
            <h2>Shipping address</h2>
            <Field label="Street address" name="address" form={form} errors={errors} onChange={handleChange} />
            <Field label="City" name="city" form={form} errors={errors} onChange={handleChange} />
            <Field label="Postal / ZIP code" name="postalCode" form={form} errors={errors} onChange={handleChange} />
            <div className="field">
              <label>Country</label>
              <select name="country" value={form.country} onChange={handleChange}>
                <option value="US">United States</option>
                <option value="IN">India</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </section>

          <section>
            <h2>Payment</h2>
            {/* Stripe Elements mount here, or simulated card fields */}
            <SimulatedCardFields />
          </section>

          <button
            onClick={handleSubmit}
            disabled={status === 'processing'}
            className="place-order-btn"
          >
            {status === 'processing' ? 'Processing...' : `Pay $${subtotal.toFixed(2)}`}
          </button>

          <p className="secure-note"> Secure checkout — SSL encrypted</p>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          {items.map(item => (
            <div key={item.productId} className="summary-line">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-divider" />
          <div className="summary-line">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-line total">
            <strong>Total</strong>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Simulated Card Fields

If you're not using Stripe Elements, build card fields that look real:

```tsx
function SimulatedCardFields() {
  const [cardNumber, setCardNumber] = useState('');

  const formatCardNumber = (value: string) =>
    value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);

  return (
    <div className="card-fields">
      <div className="field">
        <label>Card number</label>
        <input
          type="text"
          placeholder="4242 4242 4242 4242"
          value={cardNumber}
          onChange={e => setCardNumber(formatCardNumber(e.target.value))}
          maxLength={19}
        />
      </div>
      <div className="field-row">
        <div className="field">
          <label>Expiry</label>
          <input type="text" placeholder="MM / YY" maxLength={7} />
        </div>
        <div className="field">
          <label>CVC</label>
          <input type="text" placeholder="123" maxLength={3} />
        </div>
      </div>
    </div>
  );
}
```

---

## Reusable Field Component

```tsx
function Field({
  label, name, type = 'text', form, errors, onChange
}: {
  label: string;
  name: keyof FormData;
  type?: string;
  form: FormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={onChange}
        className={errors[name] ? 'input-error' : ''}
      />
      {errors[name] && <p className="error-text">{errors[name]}</p>}
    </div>
  );
}
```

> **Why inline validation?** Clearing errors as the user types feels responsive and professional. Showing all errors only on submit feels like a 2010 form. The `handleChange` error-clearing pattern above costs nothing and significantly improves perceived quality.

---

## Order Confirmation Page

This page is the emotional payoff. Don't neglect it.

```tsx
// app/order-confirmation/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrderConfirmationPage() {
  const [orderId] = useState(() =>
    `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  );

  return (
    <div className="confirmation-page">
      <div className="confirmation-icon"></div>
      <h1>Order Confirmed</h1>
      <p className="order-id">Order {orderId}</p>
      <p className="confirmation-message">
        Thank you for your purchase. A confirmation has been sent to your email.
      </p>

      <div className="confirmation-details">
        <p>Estimated delivery: <strong>3–5 business days</strong></p>
      </div>

      <Link href="/products" className="continue-shopping-btn">
        Continue Shopping
      </Link>
    </div>
  );
}
```

> **The random order ID** (`ORD-X7K2M9`) is a small detail that makes the page feel like a real system. Takes 1 minute to add.

> **The animated checkmark** is worth 30 minutes if you have them. A CSS or Framer Motion circle-draw animation on the  icon makes the confirmation moment feel genuinely satisfying.

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| No empty cart redirect | Judge lands on checkout with no items — broken layout | Redirect to `/cart` if `items.length === 0` |
| Validation only on submit | All errors appear at once, jarring UX | Clear field errors on change as shown above |
| Place Order button not disabled during processing | Double submission, duplicate orders | Set `disabled={status === 'processing'}` immediately on click |
| `clearCart()` called before order completes | Cart empty if something fails mid-flow | Only call `clearCart()` after success confirmed |
| Confirmation page accessible without completing checkout | Judge sees it by navigating directly | Add a guard or use a success flag passed via URL param |
| Generic confirmation message | Forgettable | Add order ID, delivery estimate, a brand-appropriate thank you line |

---

## Validate Before You Move On

- [ ] Empty cart redirects to `/cart` instead of showing a broken page
- [ ] All required fields validate before submission
- [ ] Field errors clear as user types
- [ ] Place Order button shows "Processing..." and is disabled on click
- [ ] Order summary matches cart contents and subtotal
- [ ] Cart clears after order completes
- [ ] Confirmation page shows a unique order ID
- [ ] Confirmation page has a "Continue Shopping" link
- [ ] Full flow works end to end: product → cart → checkout → confirmation
- [ ] Mobile layout is functional (form stacks above summary)

---

> **Phase 3 complete. Next phase: Growth →**
>
> Starting with Presentation Prep — how to frame your store for maximum impact in the pitch.
