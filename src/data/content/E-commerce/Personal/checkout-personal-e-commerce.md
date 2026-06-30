---
title: Checkout
slug: checkout
phase: Phase 3
mode: personal
projectType: e-commerce
estimatedTime: 25-30 min
---

# Checkout

Checkout is where every other module in this phase converges — cart, inventory, payments, notifications, analytics all meet here. It's also where most of the trust-related bugs in a beginner's store live: false success pages, double charges, orders that vanish. This module is about wiring everything together correctly, using Stripe Checkout to avoid building payment UI from scratch.

---

## Decision: Build Your Own Checkout Form or Use Stripe Checkout?

<table>
<tr><th></th><th>Stripe Checkout (hosted)</th><th>Custom checkout (Stripe Elements)</th></tr>
<tr><td>PCI compliance</td><td>Handled entirely by Stripe</td><td>You're more exposed, more responsibility</td></tr>
<tr><td>Build time</td><td>Hours</td><td>Days</td></tr>
<tr><td>Customization</td><td>Limited (logo, colors, some copy)</td><td>Full control over UI</td></tr>
<tr><td>Trust signals</td><td>Customers recognize Stripe's checkout page</td><td>You need to build trust signals yourself</td></tr>
<tr><td>Personal project fit</td><td><strong>Excellent</strong></td><td>Overkill</td></tr>
</table>

**Recommendation for Personal Mode:** **Stripe Checkout** (hosted, redirect-based). It's faster to implement correctly, Stripe handles all PCI compliance for you, and the conversion difference between hosted and custom checkout is negligible at personal-store scale — the design control isn't worth the added complexity and security responsibility.

> **Why this matters more than it sounds:** Building your own payment form means *you* become responsible for PCI compliance considerations around handling card data, even transiently. Stripe Checkout sidesteps this entirely — card details never touch your server. For a personal project, this isn't a corner being cut; it's the correct engineering decision.

---

## The Checkout Flow, End to End

```
1. Customer clicks "Checkout" from cart
        ↓
2. Frontend sends cart contents to your backend
        ↓
3. Backend validates stock (using validateCartStock from Cart module)
        ↓
4. Backend creates a Stripe Checkout Session
        ↓
5. Customer is redirected to Stripe's hosted checkout page
        ↓
6. Customer enters payment details on Stripe's page (not yours)
        ↓
7. Stripe processes payment
        ↓
8. Stripe redirects customer back to your success/cancel URL
        ↓
9. [IN PARALLEL] Stripe sends a webhook to your backend confirming payment
        ↓
10. Webhook handler creates the order, decrements stock, sends emails, fires analytics
```

> **Critical concept — steps 8 and 9 are separate, and 9 is the one that matters:** The redirect to your success page (step 8) is for the *customer's* experience. The webhook (step 9) is your *source of truth*. Never create the order, decrement stock, or treat the purchase as complete based on the customer reaching your success page — only the webhook confirms payment actually happened. This is the single most important principle in this entire module, and it's been mentioned in nearly every module this phase because it's that consequential.

---

## Creating the Checkout Session

```javascript
// app/api/checkout/route.ts
export async function POST(req: Request) {
  const { items } = await req.json(); // [{ productId, variantId, quantity }]

  // 1. Resolve current product data and validate stock
  const products = await getProductsByIds(items.map(i => i.productId));
  const stockIssues = validateCartStock(items, products);
  
  if (stockIssues.length > 0) {
    return Response.json({ error: 'stock_unavailable', issues: stockIssues }, { status: 409 });
  }

  // 2. Build Stripe line items from CURRENT product data — never trust 
  // prices sent from the client
  const lineItems = items.map((item) => {
    const product = products.find(p => p.id === item.productId);
    return {
      price_data: {
        currency: 'usd',
        product_data: { name: product.name },
        unit_amount: Math.round(product.price * 100), // cents
      },
      quantity: item.quantity,
    };
  });

  // 3. Create the session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    success_url: `${process.env.SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.SITE_URL}/cart`,
    metadata: {
      // Store cart contents so the webhook can reconstruct the order
      cartItems: JSON.stringify(items),
    },
  });

  return Response.json({ url: session.url });
}
```

> **Security-critical detail:** Notice that prices come from `product.price` (looked up server-side from the database), never from the request body. If you build line items using a price the client sends you, a customer could open dev tools, modify the request, and checkout for $0.01. This is one of the most common — and most damaging — beginner mistakes in custom checkout flows. **Always price server-side, from the database, never from client input.**

---

## The Webhook: Where the Real Order Gets Created

This is the function that ties together Inventory, Notifications, and Analytics — all triggered from one place.

```javascript
// app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // IDEMPOTENCY CHECK — critical, covered in Testing module
    const existingOrder = await getOrderByStripeSessionId(session.id);
    if (existingOrder) {
      return Response.json({ received: true }); // already processed, do nothing
    }

    const cartItems = JSON.parse(session.metadata.cartItems);

    // Atomic stock decrement per item (Inventory module pattern)
    const order = await createOrderTransaction({
      stripeSessionId: session.id,
      customerEmail: session.customer_details.email,
      items: cartItems,
      total: session.amount_total / 100,
    });

    if (!order) {
      // Stock check failed at the transaction level — this should be rare 
      // since we validated at session creation, but can still happen under 
      // race conditions. Handle by flagging for manual review + refund.
      await flagOrderForReview(session.id, 'stock_unavailable_post_payment');
      return Response.json({ received: true });
    }

    // Side effects — failures here should log, not throw
    await Promise.allSettled([
      sendOrderConfirmationEmail(order),
      sendOwnerAlertEmail(order),
      trackPurchaseEvent(order),
    ]);
  }

  return Response.json({ received: true });
}
```

> **Why `Promise.allSettled` for the side effects:** If the email API has a momentary outage, you don't want that to somehow undo the order creation or stock decrement that already succeeded. `allSettled` runs all three independently — if one fails, the others still complete, and you log the failure separately rather than throwing an error that could confuse the webhook response. This directly echoes the same "fail silently" guidance from the Notifications module.

---

## Verifying Webhook Signatures

Never skip signature verification, even temporarily during development. An unverified webhook endpoint means anyone who finds the URL could fake a "payment succeeded" event and get free orders created.

```javascript
// This line is not optional:
event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
```

> **Tip:** Use the Stripe CLI (`stripe listen --forward-to localhost:3000/api/webhooks/stripe`) during local development. It forwards real webhook events to your local server with correct signatures, so you're testing the actual verified path, not a shortcut you'll forget to remove before launch.

---

## The Success Page: Display Only, Not Source of Truth

```javascript
// app/checkout/success/page.tsx
export default async function SuccessPage({ searchParams }) {
  const sessionId = searchParams.session_id;
  
  // This fetches the order to DISPLAY it — it does not create anything.
  // The order already exists because the webhook created it.
  const order = await getOrderByStripeSessionId(sessionId);

  if (!order) {
    // Webhook may not have processed yet (rare race condition — webhooks 
    // are typically fast but not instant). Show a generic "processing" 
    // state, not an error.
    return <OrderProcessingMessage />;
  }

  return <OrderConfirmation order={order} />;
}
```

> **Common beginner mistake to explicitly avoid:** Creating the order on this page (when the customer lands here) instead of in the webhook. This breaks the moment a customer closes their browser tab one second after payment but before the redirect completes — the payment succeeded, but no order would ever get created. Always treat this page as read-only.

---

## AI Prompt: Implement Checkout

```
I'm implementing checkout for a personal e-commerce store using Next.js and 
Stripe Checkout (hosted, not custom Elements).

Requirements:
1. POST /api/checkout — validates stock server-side, builds Stripe line items 
   using CURRENT product prices from the database (never trust client-sent 
   prices), creates a Checkout Session, stores cart contents in session metadata
2. POST /api/webhooks/stripe — verifies the webhook signature, handles 
   checkout.session.completed, checks for an existing order by stripeSessionId 
   first (idempotency — do nothing if already processed), then atomically 
   creates the order and decrements stock in a transaction
3. If stock decrement fails inside the webhook (race condition edge case), 
   flag the order for manual review rather than throwing an unhandled error
4. Side effects (confirmation email, owner alert, analytics event) should run 
   with Promise.allSettled so a failure in one doesn't affect the others or 
   roll back the order
5. A success page that fetches and displays the order by session ID — it must 
   NOT create the order itself

My schemas: [paste products, orders, cart validation function]

Walk me through how this prevents: (a) price tampering from the client, 
(b) duplicate orders from retried webhooks, (c) a customer being charged 
but no order ever being created.
```

> **Token efficiency tip:** Asking AI to explicitly walk through those three failure scenarios forces it to verify its own implementation against them, rather than you discovering a gap later in production.

---

## Validating AI-Generated Checkout Code

- [ ] Are line item prices built from a server-side database lookup, or could they come from client-submitted data?
- [ ] Is the webhook signature actually verified using `stripe.webhooks.constructEvent`, not skipped or stubbed?
- [ ] Does the webhook check for an existing order by `stripeSessionId` before creating a new one (idempotency)?
- [ ] Is stock decremented inside the same transaction as order creation, using the atomic pattern from the Inventory module?
- [ ] Does the success page only **read** the order, with zero order-creation logic?
- [ ] Are side effects (email, analytics) isolated so their failure can't undo the order or stock decrement?

> **Common AI mistake:** AI sometimes creates the order in both the webhook AND the success page "for redundancy," reasoning that it provides a fallback if the webhook is delayed. This is exactly backwards — it creates a race condition where both paths can fire and create duplicate orders. There should be exactly one place orders get created: the webhook.

---

## Testing Checkout Before Launch

This connects directly back to the E2E tests from the Testing module — but do these manually at least once too, with real Stripe test cards:

- [ ] Successful payment → order appears correctly, stock decrements once, confirmation + alert emails arrive, analytics event fires
- [ ] Declined card (Stripe test card `4000000000000002`) → clear error shown, no order created, no stock change
- [ ] Close the browser tab immediately after payment, before the redirect completes → confirm the order still gets created via webhook
- [ ] Manually resend the same webhook event from the Stripe dashboard → confirm no duplicate order is created

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Custom-built payment forms (Stripe Elements)
- Multi-step checkout wizards (address → shipping → payment as separate pages) — Stripe Checkout handles this in one flow
- Saved payment methods / one-click checkout
- Guest checkout vs. account checkout branching logic — keep it simple, allow both without forcing account creation
- Multiple payment processors (just Stripe is enough)

---

## Implementation Checklist

- [ ] `/api/checkout` validates stock and builds line items from server-side product data only
- [ ] Stripe Checkout Session created with correct success/cancel URLs
- [ ] Webhook endpoint verifies signature before processing any event
- [ ] Webhook checks for existing order by session ID before creating (idempotency)
- [ ] Order creation + stock decrement wrapped in a single transaction
- [ ] Side effects (email, alert, analytics) run via `Promise.allSettled`, isolated from order creation
- [ ] Success page reads and displays the order — creates nothing
- [ ] Tested: successful payment, declined payment, early tab close, duplicate webhook delivery
- [ ] Stripe CLI used for local webhook testing with real signatures

---

## What's Next

With orders now being created reliably, it's time to give customers (and yourself) a clear view of what happens after a purchase — that's **Orders**, next in this phase.
