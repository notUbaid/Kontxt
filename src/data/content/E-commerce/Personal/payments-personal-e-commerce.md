---
title: Payments
slug: payments
phase: Phase 3
mode: personal
projectType: e-commerce
estimatedTime: 30–40 min
---

# Payments

Payment Architecture told you what to build. This module shows you how to build it — the exact Stripe.js integration, 3DS handling, webhook processing, and the UI states your checkout needs to handle every outcome correctly.

This is implementation, not theory. Work through it sequentially.

---

## Setup

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

```ts
// lib/stripe.ts — server-side Stripe client
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})
```

```ts
// lib/stripe-client.ts — browser-side Stripe loader
import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
```

Never import `lib/stripe.ts` in a Client Component. The secret key must never reach the browser. The server file and client file are intentionally separate.

---

## Step 1: Create the Payment Intent (Server)

This runs when the customer reaches the payment step of checkout.

```ts
// app/api/checkout/payment-intent/route.ts

import { stripe } from '@/lib/stripe'
import { requireAuth } from '@/lib/auth'
import { db } from '@/lib/db'
import { computeOrderTotal } from '@/lib/checkout'

export async function POST(req: Request) {
  try {
    const session = await requireAuth(req)   // or resolve guest session
    const { addressId, shippingRateId } = await req.json()

    // Always fetch cart and recompute server-side
    const cart = await db.cart.findFirst({
      where: { userId: session.userId },
      include: { items: { include: { product: true, variant: true } } }
    })

    if (!cart || cart.items.length === 0) {
      return Response.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const { subtotal, shippingCost, taxAmount, total } =
      await computeOrderTotal(cart, shippingRateId)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,              // integer — paise
      currency: 'inr',
      automatic_payment_methods: { enabled: true },
      metadata: {
        cartId: cart.id,
        userId: session.userId,
        addressId,
        shippingRateId,
      }
    })

    return Response.json({ clientSecret: paymentIntent.client_secret })

  } catch (e) {
    console.error(e)
    return Response.json({ error: 'Failed to create payment intent' }, { status: 500 })
  }
}
```

The `metadata` object is how you pass context to your webhook handler. Stripe stores it alongside the PaymentIntent and returns it in all webhook events.

---

## Step 2: The Checkout Payment Form (Client)

Wrap your payment step in Stripe's `<Elements>` provider, then use their pre-built `<PaymentElement>` for card collection.

```tsx
// components/checkout/CheckoutPayment.tsx
'use client'

import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '@/lib/stripe-client'
import { PaymentForm } from './PaymentForm'

interface Props {
  clientSecret: string
}

export function CheckoutPayment({ clientSecret }: Props) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#000000',   // match your brand
            borderRadius: '6px',
          }
        }
      }}
    >
      <PaymentForm />
    </Elements>
  )
}
```

```tsx
// components/checkout/PaymentForm.tsx
'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'

export function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)
    setError(null)

    // Submit the Elements form first (validates card details)
    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message ?? 'Payment failed')
      setIsProcessing(false)
      return
    }

    // Confirm payment — handles 3DS automatically
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/processing`,
      },
      redirect: 'if_required',   // ← avoid redirect when possible
    })

    if (confirmError) {
      setError(getReadableError(confirmError))
      setIsProcessing(false)
      return
    }

    // Payment succeeded without redirect (most cards)
    router.push('/checkout/processing')
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      {error && (
        <div className="mt-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="mt-6 w-full ..."
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  )
}

function getReadableError(error: { code?: string; message?: string }): string {
  const messages: Record<string, string> = {
    card_declined: 'Your card was declined. Please try a different card.',
    insufficient_funds: 'Insufficient funds. Please try a different card.',
    expired_card: 'Your card has expired. Please try a different card.',
    incorrect_cvc: 'Incorrect CVC. Please check and try again.',
    processing_error: 'A processing error occurred. Please try again.',
  }
  return messages[error.code ?? ''] ?? error.message ?? 'Payment failed. Please try again.'
}
```

`redirect: 'if_required'` prevents an unnecessary page redirect for cards that don't need 3DS. When 3DS is required, Stripe handles the modal automatically before calling your `return_url`.

---

## Step 3: The Processing Page

When Stripe redirects back (after 3DS), the URL contains `payment_intent` and `payment_intent_client_secret` as query params. Your processing page polls for the final status.

```tsx
// app/(store)/checkout/processing/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'

export default function ProcessingPage() {
  const params = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing')

  useEffect(() => {
    const clientSecret = params.get('payment_intent_client_secret')
    if (!clientSecret) {
      // No redirect params — came here from non-redirect flow
      // Poll your own API for order status by cart/session
      pollForOrder()
      return
    }

    async function checkStripeStatus() {
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      const { paymentIntent } = await stripe!.retrievePaymentIntent(clientSecret!)

      if (paymentIntent?.status === 'succeeded') {
        pollForOrder()
      } else {
        setStatus('failed')
      }
    }

    checkStripeStatus()
  }, [])

  async function pollForOrder() {
    // Webhook may not have fired yet — poll your API
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 1000))
      const res = await fetch('/api/orders/latest')
      if (res.ok) {
        const order = await res.json()
        if (order?.id) {
          router.replace(`/orders/${order.id}`)
          return
        }
      }
    }
    setStatus('failed')
  }

  if (status === 'failed') {
    return (
      <div>
        <h1>Payment failed</h1>
        <p>Your card was not charged. Please try again.</p>
        <a href="/checkout">Return to checkout</a>
      </div>
    )
  }

  return (
    <div>
      <LoadingSpinner />
      <p>Confirming your order...</p>
    </div>
  )
}
```

Polling is necessary because webhooks are asynchronous. The order may take 1–3 seconds to appear after payment succeeds. Ten polls at one-second intervals covers this comfortably.

---

## Step 4: The Webhook Handler

This is where orders are actually created. Refer to Payment Architecture for the full pattern — here is the complete implementation.

```ts
// app/api/webhooks/stripe/route.ts

import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { createOrderFromPaymentIntent } from '@/lib/checkout'

export async function POST(req: Request) {
  const body = await req.text()   // must be raw text for signature verification
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (e) {
    console.error('Webhook signature verification failed', e)
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Log every event before processing
  await db.webhookEvent.upsert({
    where: { id: event.id },
    update: {},
    create: {
      id: event.id,
      type: event.type,
      payload: event as any,
    }
  })

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent

        // Idempotency check
        const existing = await db.order.findFirst({
          where: { paymentIntentId: pi.id }
        })
        if (existing) break

        await createOrderFromPaymentIntent(pi)
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        if (charge.payment_intent) {
          await db.order.update({
            where: { paymentIntentId: charge.payment_intent as string },
            data: {
              refundedAmount: charge.amount_refunded,
              status: charge.refunded ? 'REFUNDED' : 'PARTIAL_REFUND'
            }
          })
        }
        break
      }

      case 'payment_intent.payment_failed': {
        // Log for analytics — no order action needed
        const pi = event.data.object as Stripe.PaymentIntent
        console.warn('Payment failed:', pi.id, pi.last_payment_error?.message)
        break
      }
    }

    // Mark event as processed
    await db.webhookEvent.update({
      where: { id: event.id },
      data: { processedAt: new Date() }
    })

  } catch (e) {
    await db.webhookEvent.update({
      where: { id: event.id },
      data: { error: String(e) }
    })
    // Return 500 so Stripe retries
    return Response.json({ error: 'Processing failed' }, { status: 500 })
  }

  return Response.json({ received: true })
}

// Stripe requires raw body — disable Next.js body parsing
export const config = { api: { bodyParser: false } }
```

Returning 500 from a webhook causes Stripe to retry. This is intentional — use it for transient errors. Return 200 for events you deliberately skip (e.g. already processed).

---

## Step 5: Order Creation Logic

Extracted into a shared function, called only from the webhook handler.

```ts
// lib/checkout.ts

export async function createOrderFromPaymentIntent(pi: Stripe.PaymentIntent) {
  const { cartId, userId, addressId, shippingRateId } = pi.metadata

  const cart = await db.cart.findUnique({
    where: { id: cartId },
    include: { items: { include: { product: true, variant: true } } }
  })

  if (!cart) throw new Error(`Cart not found: ${cartId}`)

  const shippingRate = shippingRateId
    ? await db.shippingRate.findUnique({ where: { id: shippingRateId } })
    : null

  const orderNumber = await generateOrderNumber()

  await db.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        orderNumber,
        userId: userId || null,
        addressId,
        shippingRateId: shippingRateId || null,
        paymentIntentId: pi.id,
        status: 'PAID',
        currency: pi.currency.toUpperCase(),
        subtotal: cart.items.reduce((sum, i) => sum + i.priceAtAdd * i.quantity, 0),
        shippingCost: shippingRate?.price ?? 0,
        taxAmount: 0,
        totalAmount: pi.amount,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            productName: item.product.name,
            variantName: item.variant?.name,
            quantity: item.quantity,
            unitPrice: item.priceAtAdd,
            totalPrice: item.priceAtAdd * item.quantity,
          }))
        }
      }
    })

    // Decrement stock
    for (const item of cart.items) {
      await tx.inventoryItem.update({
        where: { productId: item.productId },
        data: { stock: { decrement: item.quantity } }
      })
    }

    // Convert cart
    await tx.cart.update({
      where: { id: cartId },
      data: { status: 'CONVERTED' }
    })

    return order
  })

  // Queue confirmation email — after transaction commits
  await sendOrderConfirmationEmail(orderNumber, userId)
}

async function generateOrderNumber(): Promise<string> {
  const count = await db.order.count()
  return `ORD-${String(1000 + count + 1)}`
}
```

---

## Testing the Full Flow

```bash
# Start Stripe webhook forwarding in a separate terminal
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Run your dev server
npm run dev
```

Test each scenario in order:

- [ ] `4242 4242 4242 4242` — successful payment, order created
- [ ] `4000 0027 6000 3184` — 3DS required, complete auth, order created
- [ ] `4000 0082 6000 3178` — 3DS required, fail auth, no order created
- [ ] `4000 0000 0000 0002` — card declined, error displayed, cart preserved
- [ ] `4000 0000 0000 9995` — insufficient funds, correct error message shown
- [ ] Simulate webhook retry: stop your server mid-process, restart, verify no duplicate order

---

## Validation Checklist

- [ ] `STRIPE_SECRET_KEY` only imported in server files
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` used client-side via `loadStripe`
- [ ] PaymentIntent amount computed server-side — never passed from client
- [ ] `<PaymentElement>` used — no custom card input built
- [ ] `redirect: 'if_required'` set on `confirmPayment`
- [ ] 3DS handled automatically via `confirmPayment` (no manual implementation needed)
- [ ] Processing page polls for order after payment — does not rely on redirect alone
- [ ] Webhook signature verified before any processing
- [ ] Every webhook event logged to `WebhookEvent` table before processing
- [ ] Idempotency check on `paymentIntentId` before order creation
- [ ] Order creation wrapped in `db.$transaction`
- [ ] Stock decremented inside same transaction as order creation
- [ ] Confirmation email queued after transaction — not inside it
- [ ] All five test card scenarios verified and passing

---

## What to Build Next

**Emails** — order confirmation, shipping notification, and password reset are the three emails every store must send. The emails module covers transactional email setup, template design, and delivery reliability.

---

> **Filename:** `payments-personal-e-commerce.md`
