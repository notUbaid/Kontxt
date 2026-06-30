---
title: Emails
slug: emails
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# Emails

Transactional emails are the voice of your store after the purchase. A missing order confirmation creates immediate support tickets. A well-crafted shipping notification builds trust. Get these three emails right and you've covered 90% of customer communication needs.

---

## The Three Emails You Must Send

Everything else is optional until these work reliably.

| Email | Trigger | Priority |
|---|---|---|
| **Order Confirmation** | `payment_intent.succeeded` webhook | Critical |
| **Shipping Notification** | Admin marks order as shipped | High |
| **Password Reset** | User requests password reset | High |

Do not build welcome emails, abandoned cart emails, or marketing sequences until these three are sending reliably in production.

---

## Provider Choice

Do not use Gmail SMTP or your hosting provider's mail server for transactional email. Deliverability will be poor and you'll have no visibility into opens, bounces, or failures.

Use a dedicated transactional email provider:

| Provider | Free Tier | Best For |
|---|---|---|
| **Resend** | 3,000 emails/month | Best DX, React Email integration, modern API |
| **Postmark** | 100 emails/month free | Best deliverability, detailed analytics |
| **SendGrid** | 100 emails/day | Established, feature-rich, more complex |
| **Brevo** | 300 emails/day | Good free tier, EU-hosted |

**Recommendation for personal projects: Resend.** It has the simplest API, native React Email support, and a generous free tier that covers most personal store volumes.

```bash
npm install resend react-email @react-email/components
```

---

## Email Architecture

Never send emails synchronously inside a request handler or webhook. Email delivery can be slow or fail. If your webhook handler times out because an email provider is slow, Stripe retries the webhook, and you risk duplicate orders.

**Always queue emails and send asynchronously.**

For a personal project, a simple queue using your database is sufficient:

```
EmailQueue
├── id
├── to (email address)
├── subject
├── template (order_confirmation | shipping_notification | password_reset)
├── data (jsonb — template variables)
├── status (pending | sent | failed)
├── attempts (integer, default 0)
├── sentAt (nullable)
├── error (nullable)
└── createdAt
```

A background worker (cron job or queue processor) picks up `pending` emails and sends them. On failure, increment `attempts` and retry up to 3 times before marking `failed`.

For simplicity in early development, you can send emails directly and add a queue when you need reliability. But plan for the queue from the start.

---

## Setting Up Resend

```ts
// lib/email.ts
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string
  subject: string
  react: React.ReactElement
}) {
  const { error } = await resend.emails.send({
    from: 'Your Store <orders@yourstore.com>',
    to,
    subject,
    react,
  })

  if (error) {
    throw new Error(`Email send failed: ${error.message}`)
  }
}
```

Your `from` address domain must have DNS records (SPF, DKIM, DMARC) configured through your email provider. Resend walks you through this in their dashboard. Without it, emails land in spam.

---

## Email 1: Order Confirmation

The most important email you send. Must arrive within seconds of payment.

```tsx
// emails/OrderConfirmation.tsx
import {
  Body, Container, Head, Heading, Hr, Html,
  Img, Link, Preview, Row, Column, Section, Text
} from '@react-email/components'
import { formatPrice } from '@/lib/utils/price'

interface OrderConfirmationProps {
  orderNumber: string
  customerName: string
  items: Array<{
    name: string
    variantName?: string
    quantity: number
    unitPrice: number
    imageUrl: string
  }>
  subtotal: number
  shippingCost: number
  totalAmount: number
  shippingAddress: {
    fullName: string
    line1: string
    city: string
    state: string
    postalCode: string
  }
}

export function OrderConfirmation({
  orderNumber,
  customerName,
  items,
  subtotal,
  shippingCost,
  totalAmount,
  shippingAddress,
}: OrderConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Order {orderNumber} confirmed — thank you for your purchase.</Preview>
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f9f9f9' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '32px' }}>

          <Heading style={{ fontSize: '24px', fontWeight: '600' }}>
            Order Confirmed
          </Heading>
          <Text>Hi {customerName}, your order has been received and is being prepared.</Text>
          <Text style={{ color: '#666', fontSize: '14px' }}>Order {orderNumber}</Text>

          <Hr />

          {items.map((item, i) => (
            <Row key={i} style={{ marginBottom: '16px' }}>
              <Column style={{ width: '64px' }}>
                <Img src={item.imageUrl} width={56} height={56} style={{ borderRadius: '4px', objectFit: 'cover' }} />
              </Column>
              <Column style={{ paddingLeft: '12px' }}>
                <Text style={{ margin: 0, fontWeight: '500' }}>{item.name}</Text>
                {item.variantName && (
                  <Text style={{ margin: 0, fontSize: '13px', color: '#888' }}>{item.variantName}</Text>
                )}
                <Text style={{ margin: 0, fontSize: '13px', color: '#888' }}>Qty: {item.quantity}</Text>
              </Column>
              <Column style={{ textAlign: 'right' }}>
                <Text style={{ margin: 0 }}>{formatPrice(item.unitPrice * item.quantity)}</Text>
              </Column>
            </Row>
          ))}

          <Hr />

          <Row>
            <Column><Text style={{ color: '#666' }}>Subtotal</Text></Column>
            <Column style={{ textAlign: 'right' }}><Text>{formatPrice(subtotal)}</Text></Column>
          </Row>
          <Row>
            <Column><Text style={{ color: '#666' }}>Shipping</Text></Column>
            <Column style={{ textAlign: 'right' }}>
              <Text>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</Text>
            </Column>
          </Row>
          <Row>
            <Column><Text style={{ fontWeight: '600' }}>Total</Text></Column>
            <Column style={{ textAlign: 'right' }}>
              <Text style={{ fontWeight: '600' }}>{formatPrice(totalAmount)}</Text>
            </Column>
          </Row>

          <Hr />

          <Heading as="h2" style={{ fontSize: '16px' }}>Shipping to</Heading>
          <Text style={{ margin: 0 }}>{shippingAddress.fullName}</Text>
          <Text style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {shippingAddress.line1}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
          </Text>

          <Hr />

          <Link href={`${process.env.NEXT_PUBLIC_URL}/orders/${orderNumber}`}>
            View your order
          </Link>

        </Container>
      </Body>
    </Html>
  )
}
```

---

## Email 2: Shipping Notification

Triggered when an admin adds a tracking number to an order.

```tsx
// emails/ShippingNotification.tsx
import { Html, Head, Body, Container, Heading, Text, Button, Hr, Preview } from '@react-email/components'

interface ShippingNotificationProps {
  orderNumber: string
  customerName: string
  trackingNumber: string
  trackingUrl: string
  estimatedDelivery?: string
}

export function ShippingNotification({
  orderNumber,
  customerName,
  trackingNumber,
  trackingUrl,
  estimatedDelivery,
}: ShippingNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your order {orderNumber} is on its way.</Preview>
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f9f9f9' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '32px' }}>

          <Heading style={{ fontSize: '24px', fontWeight: '600' }}>Your order is on its way</Heading>
          <Text>Hi {customerName}, order {orderNumber} has been shipped.</Text>

          {estimatedDelivery && (
            <Text style={{ color: '#666' }}>Estimated delivery: {estimatedDelivery}</Text>
          )}

          <Text style={{ fontSize: '14px', color: '#888' }}>
            Tracking number: {trackingNumber}
          </Text>

          <Button
            href={trackingUrl}
            style={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              textDecoration: 'none',
              display: 'inline-block',
              marginTop: '8px',
            }}
          >
            Track your order
          </Button>

        </Container>
      </Body>
    </Html>
  )
}
```

---

## Email 3: Password Reset

If you're using Clerk, NextAuth, or Supabase Auth — they send this for you. Only build it if you're managing auth yourself.

```tsx
// emails/PasswordReset.tsx
import { Html, Head, Body, Container, Heading, Text, Button, Hr, Preview } from '@react-email/components'

interface PasswordResetProps {
  resetUrl: string
  expiresInMinutes: number
}

export function PasswordReset({ resetUrl, expiresInMinutes }: PasswordResetProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password — link expires in {expiresInMinutes} minutes.</Preview>
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f9f9f9' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '32px' }}>

          <Heading style={{ fontSize: '24px', fontWeight: '600' }}>Reset your password</Heading>
          <Text>Click the button below to choose a new password. This link expires in {expiresInMinutes} minutes.</Text>

          <Button
            href={resetUrl}
            style={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              display: 'inline-block',
            }}
          >
            Reset password
          </Button>

          <Hr />
          <Text style={{ fontSize: '12px', color: '#aaa' }}>
            If you didn't request this, ignore this email. Your password will not change.
          </Text>

        </Container>
      </Body>
    </Html>
  )
}
```

---

## Sending Emails from the Webhook

```ts
// lib/checkout.ts (addition to createOrderFromPaymentIntent)

import { sendEmail } from '@/lib/email'
import { OrderConfirmation } from '@/emails/OrderConfirmation'

// After transaction commits:
await sendEmail({
  to: customerEmail,
  subject: `Order ${orderNumber} confirmed`,
  react: OrderConfirmation({
    orderNumber,
    customerName,
    items: orderItems,
    subtotal,
    shippingCost,
    totalAmount,
    shippingAddress,
  })
})
```

---

## Sending the Shipping Email from Admin

```ts
// app/api/admin/orders/[id]/route.ts

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await requireAdmin(req)
  const { trackingNumber, carrier } = await req.json()

  const order = await db.order.update({
    where: { id: params.id },
    data: {
      trackingNumber,
      trackingUrl: buildTrackingUrl(carrier, trackingNumber),
      status: 'SHIPPED',
      shippedAt: new Date(),
    },
    include: { user: true, address: true }
  })

  const customerEmail = order.user?.email ?? order.guestEmail
  if (customerEmail) {
    await sendEmail({
      to: customerEmail,
      subject: `Your order ${order.orderNumber} has shipped`,
      react: ShippingNotification({
        orderNumber: order.orderNumber,
        customerName: order.address.fullName,
        trackingNumber,
        trackingUrl: order.trackingUrl!,
      })
    })
  }

  return Response.json(order)
}
```

---

## Preview Emails During Development

React Email includes a preview server. Run it alongside your dev server to design emails in the browser with live reload.

```bash
npx react-email dev --dir emails --port 3001
```

Open `http://localhost:3001` to preview every email template with your actual component props.

---

## DNS Configuration (Required for Deliverability)

Before going live, configure these DNS records for your sending domain:

| Record | Purpose | Configured via |
|---|---|---|
| **SPF** | Authorises Resend to send on your behalf | Resend dashboard → Domains |
| **DKIM** | Cryptographically signs outgoing emails | Resend dashboard → Domains |
| **DMARC** | Policy for handling failed SPF/DKIM | Add TXT record manually |

Without SPF and DKIM, emails from your domain go to spam for most recipients. Resend provides exact DNS record values in their dashboard. Copy them into your domain registrar (Cloudflare, Namecheap, etc.).

Minimum DMARC record:
```
v=DMARC1; p=none; rua=mailto:dmarc@yourstore.com
```

---

## AI Prompt: Email Implementation Review

```
You are a senior full-stack engineer reviewing transactional email implementation for a personal e-commerce project.

EMAIL PROVIDER: [Resend / Postmark / SendGrid]
FRAMEWORK: React Email

EMAILS IMPLEMENTED:
1. Order Confirmation — triggered by: [webhook / direct call]
2. Shipping Notification — triggered by: [admin action]
3. Password Reset — [built custom / handled by auth provider]

SENDING APPROACH:
[synchronous in webhook / queued async]

DNS CONFIGURATION:
[SPF configured: yes/no, DKIM configured: yes/no]

Review for:
1. Reliability risks (sync sending in webhook handler, no retry logic)
2. Missing email content (critical fields that customers will ask about)
3. Deliverability issues (missing DNS records, sender domain problems)
4. Edge cases (guest orders without accounts, missing customer email)
5. Security issues (password reset link expiry, single-use tokens)

Be specific. Flag critical issues first.
```

---

## Validation Checklist

- [ ] Resend (or equivalent) configured with API key in environment variables
- [ ] Sending domain configured — not a Gmail or personal address
- [ ] SPF and DKIM DNS records added and verified in provider dashboard
- [ ] Order confirmation email sends within seconds of webhook processing
- [ ] Order confirmation includes: items, quantities, prices, shipping address, order number, order link
- [ ] Shipping notification sends when admin adds tracking number
- [ ] Shipping notification includes tracking number and direct tracking link
- [ ] Password reset email sends within 60 seconds of request
- [ ] Password reset link expires (15–60 minutes) and is single-use
- [ ] Guest orders use `guestEmail` field — not skipped because `userId` is null
- [ ] Email templates previewed in React Email dev server before production
- [ ] Emails tested end-to-end in test environment before going live

---

## What to Build Next

**Notifications** — beyond email, in-app and push notifications keep customers informed without requiring them to check their inbox. The notifications module covers what's worth building for a personal project and what to defer.

---

> **Filename:** `emails-personal-e-commerce.md`
