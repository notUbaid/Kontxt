---
title: Shipping
slug: shipping
phase: Phase 3
mode: personal
projectType: e-commerce
estimatedTime: 20-25 min
---

# Shipping

Shipping is where a lot of personal stores quietly lose money — not from theft or fraud, but from underpriced shipping that erodes margin on every single order. This module is about pricing and presenting shipping in a way that's honest, simple, and doesn't require integrating a carrier API on day one.

---

## Decision: How Complex Does Your Shipping Logic Need to Be?

<table>
<tr><th>Approach</th><th>How it works</th><th>Fit</th></tr>
<tr><td><strong>Flat rate</strong></td><td>One fixed shipping cost regardless of order size/weight</td><td>Simple catalogs, similar-sized products</td></tr>
<tr><td><strong>Free shipping (built into price)</strong></td><td>No separate shipping charge — cost absorbed into product pricing</td><td>Higher-margin products, simplicity as a selling point</td></tr>
<tr><td><strong>Weight/price-based tiers</strong></td><td>A few fixed bands (e.g., under $30 = $5 shipping, $30-$75 = $8, over $75 = free)</td><td>Varied product sizes/weights, still simple to implement</td></tr>
<tr><td><strong>Real-time carrier rates (USPS/UPS/FedEx API)</strong></td><td>Live rate calculation per address and package</td><td>Higher order volume, varied package sizes — not needed yet</td></tr>
</table>

**Recommendation for Personal Mode:** **Weight/price-based tiers**, with a free-shipping threshold. This gets you accurate-enough pricing without the integration overhead of a live carrier API, and a free-shipping threshold ("free shipping over $50") is a proven, simple lever for increasing average order value.

> **Why not real-time carrier rates yet:** Integrating USPS/UPS/FedEx APIs means handling package dimensions, weight per item, origin/destination rate lookups, and API failures gracefully — real engineering effort for marginal accuracy improvement at low order volume. Tiered rates get you 90% of the pricing accuracy for a fraction of the complexity. Revisit this if you're shipping highly variable package sizes or scaling significantly.

---

## Building Tiered Shipping Logic

This connects directly to the cart total calculation from the Cart module — shipping is just another component of that total.

```javascript
const SHIPPING_TIERS = [
  { maxSubtotal: 30, rate: 5.99 },
  { maxSubtotal: 75, rate: 8.99 },
  { maxSubtotal: Infinity, rate: 0 }, // free shipping over $75
];

function calculateShipping(subtotal) {
  const tier = SHIPPING_TIERS.find((t) => subtotal <= t.maxSubtotal);
  return tier.rate;
}
```

> **Tip:** If your products vary significantly in weight or size (e.g., you sell both stickers and furniture), price-based tiers alone won't be accurate enough — you'd undercharge shipping on heavy items and overcharge on light ones. In that case, add a `shipping_weight` field to your product schema and tier by total cart weight instead of price. Don't add this complexity unless your catalog actually needs it.

---

## Showing Shipping Cost Early, Not at the Last Step

This is a UX decision with real conversion consequences, not just a technical one.

> **Critical concept — surprise shipping costs are the single most common cause of cart abandonment.** If a customer doesn't see shipping cost until the final checkout step, you're asking for a trust hit at the worst possible moment. Show estimated shipping cost in the cart itself, before checkout begins.

```javascript
// In your cart UI, show this alongside subtotal — not just at checkout
function CartSummary({ subtotal }) {
  const shipping = calculateShipping(subtotal);
  const freeShippingThreshold = 75;
  const remaining = freeShippingThreshold - subtotal;

  return (
    <div>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Shipping: {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
      {remaining > 0 && (
        <p className="text-sm text-muted">
          Add ${remaining.toFixed(2)} more for free shipping
        </p>
      )}
    </div>
  );
}
```

> **Best Practice:** The "add $X more for free shipping" nudge is both honest and effective — it tells the customer exactly what's happening and often genuinely increases order value without any dark pattern involved. Worth implementing; it's a small addition with real upside.

---

## Connecting Shipping to the Order Record

Shipping amount needs to be captured in the order at the time of purchase — same snapshot principle as the rest of the Orders module.

```javascript
// When building the Stripe Checkout Session (Checkout module)
const shippingAmount = calculateShipping(subtotal);

const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [
    ...productLineItems,
    shippingAmount > 0 ? {
      price_data: {
        currency: 'usd',
        product_data: { name: 'Shipping' },
        unit_amount: Math.round(shippingAmount * 100),
      },
      quantity: 1,
    } : null,
  ].filter(Boolean),
  // ...
});
```

The `shipping_amount` field already exists in your `orders` table schema from the Orders module — make sure it's populated from this calculation, not left at its default of 0.

---

## Shipping Address Collection

Stripe Checkout can collect shipping addresses natively — use this instead of building a custom address form.

```javascript
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  shipping_address_collection: {
    allowed_countries: ['US'], // restrict to countries you actually ship to
  },
  // ...
});
```

> **Decision point — which countries do you actually ship to?** Be deliberate about `allowed_countries`. Shipping internationally introduces customs forms, longer delivery times, and higher rates — don't accidentally allow checkout from a country you have no real plan to fulfill orders for. Start narrow (your home country, maybe neighboring ones) and expand only when you're ready to handle the fulfillment reality of it.

---

## Marking Orders as Shipped

This connects to the order status lifecycle from the Orders module and the shipping confirmation email from the Notifications module.

```javascript
async function markOrderShipped(orderId, trackingNumber, carrier) {
  await db.query(
    `UPDATE orders SET status = 'shipped', updated_at = now() WHERE id = $1`,
    [orderId]
  );

  await db.query(
    `INSERT INTO order_shipments (order_id, carrier, tracking_number) VALUES ($1, $2, $3)`,
    [orderId, carrier, trackingNumber]
  );

  const order = await getOrderById(orderId);
  await sendShippingConfirmationEmail(order, { carrier, trackingNumber });
}
```

```sql
CREATE TABLE order_shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  carrier TEXT NOT NULL,
  tracking_number TEXT,
  shipped_at TIMESTAMPTZ DEFAULT now()
);
```

> **Tip:** This action happens manually, from your admin dashboard, as you actually pack and ship each order. Don't build automation here yet — at personal-store volume, a simple "mark as shipped + enter tracking number" form is faster to build and use than integrating a carrier API to auto-detect shipment status.

---

## AI Prompt: Implement Shipping Logic

```
I'm implementing shipping for a personal e-commerce store using Next.js 
and Stripe Checkout.

Requirements:
1. A calculateShipping(subtotal) function using tiered pricing: 
   [define your actual tiers — e.g., under $30 = $X, $30-$75 = $Y, over $75 = free]
2. A cart summary component showing subtotal, shipping cost, and a 
   "X more for free shipping" message when applicable
3. Wire shipping cost into the Stripe Checkout Session as a line item, 
   and into the orders table's shipping_amount field
4. Use Stripe's native shipping_address_collection, restricted to 
   [your country/countries]
5. A markOrderShipped function: updates order status to 'shipped', stores 
   carrier + tracking number in an order_shipments table, triggers the 
   shipping confirmation email

My orders schema: [paste schema from Orders module]
```

> **Token efficiency tip:** Decide your actual shipping tiers and allowed countries before prompting — these are business decisions AI can't make for you, and vague instructions here produce generic placeholder logic you'll have to rewrite anyway.

---

## Validating AI-Generated Shipping Code

- [ ] Is shipping cost displayed in the cart, not only revealed at the final checkout step?
- [ ] Does `calculateShipping` handle the free-shipping threshold correctly at the exact boundary (e.g., subtotal exactly equal to $75)?
- [ ] Is `shipping_address_collection` restricted to countries you actually ship to, not left wide open to all countries?
- [ ] Does `shipping_amount` actually get saved on the order record, matching what was charged via Stripe?
- [ ] Does `markOrderShipped` trigger the shipping confirmation email automatically, or does that need to be wired separately?

> **Common AI mistake:** AI sometimes calculates shipping cost on the frontend for display, but uses a slightly different calculation (or forgets it entirely) when building the actual Stripe line items server-side. This causes the displayed shipping cost to not match what's charged. Always confirm both paths call the exact same `calculateShipping` function from a shared location.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Real-time carrier rate APIs (USPS/UPS/FedEx)
- Multiple shipping speed options (standard vs. express) — pick one speed, keep it simple
- International shipping (unless it's core to your business from day one)
- Automated tracking status updates via carrier webhooks
- Print-at-home shipping label generation/integration (ShipStation, Pirate Ship) — handle labels manually at your post office or carrier's site until volume justifies automating this

---

## Implementation Checklist

- [ ] Shipping tiers (or free-shipping threshold) decided and implemented in `calculateShipping`
- [ ] Shipping cost shown in cart UI, before checkout begins
- [ ] "X more for free shipping" messaging implemented
- [ ] Shipping line item correctly added to Stripe Checkout Session
- [ ] `shipping_amount` correctly populated on order creation
- [ ] `shipping_address_collection` restricted to actual countries you ship to
- [ ] `order_shipments` table created
- [ ] `markOrderShipped` function implemented, triggers shipping confirmation email
- [ ] Verified: cart-displayed shipping cost matches what's actually charged at checkout

---

## What's Next

With shipping priced and tracked, it's time to give customers a way to save products they're not ready to buy yet — that's **Wishlist**, next in this phase.
