---
title: Privacy Policy
slug: privacy-policy
phase: Phase 5 Store Launch
mode: production
projectType: e-commerce
estimatedTime: 30-45 min
---

# Legal Compliance: GDPR & CCPA (Privacy Policy)

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 45 Minutes

A beginner copies and pastes a free Privacy Policy template they found on Google, changes the company name, and thinks they are protected. 

Then, a customer from California emails them asking to delete their data under the CCPA (California Consumer Privacy Act). The beginner ignores the email because they don't know what it means. Thirty days later, they receive a lawsuit for $2,500 per violation. 

In a production environment, your Privacy Policy is not just text on a page. It is a **legal contract** that binds your Next.js application architecture. You must mathematically enforce Data Deletion (Right to be Forgotten) and Cookie Consent.

---

## 1. The Right to be Forgotten (Data Deletion API)

If a user requests account deletion, you cannot simply delete their row from the `User` table.

If you delete the `User` row, but leave their `Order` rows intact, Prisma might throw a Foreign Key Constraint error and crash. Worse, if you keep their email address in a third-party tool like Klaviyo or Stripe, you are violating the law because you did not delete *all* their data.

**The Production Solution:**
You must engineer a catastrophic `User Deletion Cascade`.

```typescript
// app/api/user/delete/route.ts
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function DELETE(req: Request) {
  const session = await getServerSession();
  const userId = session.user.id;

  // 1. Delete from Third-Party Vendors first (Stripe, Klaviyo, Intercom)
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user.stripeCustomerId) {
    await stripe.customers.del(user.stripeCustomerId);
  }

  // 2. Anonymize the Orders (Do NOT delete orders! You need them for tax records)
  await prisma.order.updateMany({
    where: { userId },
    data: {
      userId: null,
      email: "redacted@deleted.com",
      shippingAddress: "REDACTED",
    }
  });

  // 3. Delete the User Record
  await prisma.user.delete({ where: { id: userId } });

  return NextResponse.json({ success: true });
}
```

Notice the crucial difference: **You do not delete financial orders.** IRS and tax laws supersede GDPR. You are legally required to keep financial records for 7 years. You must mathematically **Anonymize** the order by stripping the PII (Personally Identifiable Information), while keeping the $ amounts intact for your accounting.

## 2. Cookie Consent & Telemetry Blocking

Your Next.js app likely uses Google Analytics, Meta Pixel, or TikTok Pixel. 

Under GDPR (Europe) and CCPA (California), you cannot track a user with these tools *before* they click "Accept" on your cookie banner. If a user visits your site and the Meta Pixel fires instantly, you are breaking the law.

**The Production Solution:**
You must conditionally load your telemetry scripts based on the user's consent state stored in `localStorage`.

```tsx
// components/AnalyticsLoader.tsx
'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/store/useCookieConsent';

export function AnalyticsLoader() {
  const { hasConsented } = useCookieConsent();

  // If the user clicked 'Reject' or hasn't clicked anything yet, return null.
  // The Google Analytics script is mathematically blocked from entering the DOM.
  if (!hasConsented) return null;

  return (
    <>
      <Script 
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX" 
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXX');
        `}
      </Script>
    </>
  );
}
```

## 3. The Privacy Policy Document

Now that your architecture actually supports the law, you can write the document.

You should use a tool like **Termly** or **Shopify Legal Generator**. Your policy must explicitly state:
1. **What data you collect:** (IP Addresses, Email, Physical Address, Cookie IDs).
2. **Who you share it with:** (Stripe for payments, EasyPost for shipping, Vercel for hosting).
3. **How users can exercise their rights:** Provide a clear `privacy@yourstore.com` email address or a "Delete My Data" button in the account dashboard.

---

##  Privacy Policy Engineering Checklist

- [ ] Write a Next.js `/api/user/delete` route that anonymizes order data and deletes third-party records to comply with the Right to be Forgotten.
- [ ] Ensure financial records (Orders) are anonymized rather than deleted to comply with IRS 7-year retention laws.
- [ ] Build a React Cookie Consent state that mathematically blocks Google Analytics and Meta Pixels from injecting into the DOM until the user clicks "Accept".
- [ ] Use the AI prompt below to generate the rigorous privacy implementations.

---

## AI Prompt — Engineer Privacy Compliance

Copy this prompt into your AI to have it generate the mathematical privacy architecture.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Compliance Engineer. We are engineering our GDPR/CCPA Privacy Architecture.

I need you to generate the following strict compliance implementations:

**1. The Data Deletion (Anonymization) Route:**
Write a Next.js API Route (`/api/account/delete`).
- Use a Prisma Transaction (`prisma.$transaction`).
- Step 1: Update all `Order` records associated with the user, setting `email`, `firstName`, `lastName`, and `phone` to `"[REDACTED]"`.
- Step 2: Delete the `User` record.
- Explain in Markdown why deleting financial records outright violates IRS tax laws, making anonymization the only legal path for GDPR compliance.

**2. The Strict Cookie Consent Guard:**
Write a React Client Component (`<CookieConsentGuard />`).
- It should read a `marketing_consent` boolean from `localStorage`.
- Show how it wraps a `<GoogleAnalytics />` and `<MetaPixel />` component, strictly returning `null` if the user has not granted consent, physically preventing the third-party trackers from executing.
````

**Next: Terms of Service Engineering →**
