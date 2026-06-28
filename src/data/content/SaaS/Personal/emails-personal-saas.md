# Emails

**Estimated Time:** 20–30 min

---

Email is infrastructure, not a feature.

When a user resets their password, gets invited to a workspace, or receives a billing receipt — they expect that email to arrive instantly, look professional, and work on every email client. None of that is easy by default.

This module covers how to set up transactional email correctly from the start.

---

## Transactional vs Marketing Email

Two completely different problems. Don't mix them.

| Type | What it is | Examples |
|---|---|---|
| **Transactional** | Triggered by user actions, one-to-one | Password reset, invite, receipt, welcome |
| **Marketing** | Bulk campaigns, one-to-many | Newsletters, announcements, re-engagement |

This module covers transactional only. Marketing email needs separate tooling (Loops, Mailchimp, ConvertKit) and separate sending infrastructure — mixing them risks your transactional deliverability when a bulk campaign gets flagged.

>  Never send transactional emails from the same domain/IP as marketing emails. A spam complaint on a newsletter shouldn't delay your password reset emails.

---

## Provider Choice

| Provider | Free tier | Best for |
|---|---|---|
| **Resend** | 3,000 emails/month | Modern DX, React Email native, best for new projects |
| **Postmark** | 100 emails/month free | Excellent deliverability, strong reputation |
| **SendGrid** | 100 emails/day | Established, good docs, more complex setup |
| **AWS SES** | 62,000/month (if sending from EC2) | Cheapest at scale, complex setup |

> **Recommendation: Resend.** Built for developers, first-class React Email support, excellent deliverability out of the box, simple API. The free tier covers any personal SaaS in early stages.

---

## React Email

React Email lets you write email templates as React components. No inline styles by hand, no wrestling with Outlook quirks — just components.

```bash
npm install react-email @react-email/components resend
```

Email templates live in a dedicated folder:

```
emails/
  welcome.tsx
  workspace-invite.tsx
  password-reset.tsx
  subscription-receipt.tsx
components/
  email/
    EmailLayout.tsx     ← shared wrapper (logo, footer, unsubscribe)
    EmailButton.tsx
    EmailDivider.tsx
```

Preview emails locally with:

```bash
npx react-email dev
```

Opens a browser with live preview of every template. Test across dark mode, mobile, and simulated clients before sending a single real email.

---

## Email Template Structure

Every template needs the same shell. Build it once.

```tsx
// components/email/EmailLayout.tsx
import { Html, Head, Body, Container, Img, Hr, Text, Link } from "@react-email/components"

export function EmailLayout({ children, previewText }: {
  children: React.ReactNode
  previewText: string
}) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f9fafb", fontFamily: "sans-serif" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 20px" }}>
          <Img src="https://yourdomain.com/logo.png" alt="Your App" height={32} />
          <Hr style={{ margin: "24px 0", borderColor: "#e5e7eb" }} />
          {children}
          <Hr style={{ margin: "24px 0", borderColor: "#e5e7eb" }} />
          <Text style={{ fontSize: "12px", color: "#9ca3af" }}>
            You received this email because you have an account at YourApp.
            {" "}<Link href="{{unsubscribeUrl}}">Unsubscribe</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

---

## The Emails Your SaaS Needs

Plan every transactional email before you build. Map each one to the trigger that sends it.

| Email | Trigger | Required? |
|---|---|---|
| **Welcome** | User signs up | Yes |
| **Email verification** | Signup (if not using magic link) | Depends on auth provider |
| **Password reset** | User requests reset | Yes (if using passwords) |
| **Workspace invitation** | User invites a member | If workspace feature exists |
| **Invitation accepted** | Invitee accepts | Optional but polite |
| **Subscription started** | Payment succeeds | Yes |
| **Subscription cancelled** | User cancels | Yes |
| **Payment failed** | Card declined | Yes |
| **Upcoming renewal** | 7 days before renewal | Recommended |

> If your auth provider is Clerk or Supabase Auth, they handle verification and password reset emails automatically. Check before building these yourself.

---

## Sending Email

```typescript
// lib/email.ts
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string
  subject: string
  react: React.ReactElement
}) {
  const { data, error } = await resend.emails.send({
    from: "YourApp <hello@yourdomain.com>",
    to,
    subject,
    react,
  })

  if (error) {
    console.error("Email send failed:", error)
    throw new Error("Failed to send email")
  }

  return data
}
```

```typescript
// Usage in a service or route handler
import { WelcomeEmail } from "@/emails/welcome"
import { sendEmail } from "@/lib/email"

await sendEmail({
  to: user.email,
  subject: "Welcome to YourApp",
  react: <WelcomeEmail userName={user.name} />,
})
```

---

## Example: Welcome Email

```tsx
// emails/welcome.tsx
import { Button, Heading, Text, Section } from "@react-email/components"
import { EmailLayout } from "@/components/email/EmailLayout"

interface WelcomeEmailProps {
  userName: string
  dashboardUrl: string
}

export function WelcomeEmail({ userName, dashboardUrl }: WelcomeEmailProps) {
  return (
    <EmailLayout previewText={`Welcome to YourApp, ${userName}`}>
      <Heading style={{ fontSize: "24px", fontWeight: "600", color: "#111827" }}>
        Welcome, {userName}
      </Heading>
      <Text style={{ color: "#374151", lineHeight: "1.6" }}>
        Your account is ready. Here's what you can do next.
      </Text>
      <Section style={{ marginTop: "24px" }}>
        <Button
          href={dashboardUrl}
          style={{
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "6px",
            fontWeight: "500",
          }}
        >
          Go to dashboard
        </Button>
      </Section>
    </EmailLayout>
  )
}
```

---

## Domain Setup

Emails sent from `hello@yourdomain.com` require DNS records for deliverability. Without them, your emails go to spam.

**Records you need to add:**

| Record | Purpose |
|---|---|
| **SPF** | Proves your email provider is allowed to send from your domain |
| **DKIM** | Cryptographic signature proving the email wasn't altered |
| **DMARC** | Policy for handling emails that fail SPF/DKIM |

Resend provides the exact DNS records to add in their dashboard. Add them through your domain registrar (Cloudflare, Namecheap, etc.).

>  Do not skip DNS setup. Emails sent without SPF/DKIM reliably end up in spam or get rejected entirely. This is not optional for production.

Verify your domain is configured correctly at [mail-tester.com](https://www.mail-tester.com) before going live.

---

## Email Triggers in Your Codebase

Email sends should happen in your **service layer**, not in route handlers.

```typescript
// services/workspace.service.ts
export async function inviteMember(workspaceId: string, invitedEmail: string, invitedBy: User) {
  // 1. Create invite record in DB
  const invite = await db.workspaceInvite.create({
    data: {
      workspaceId,
      email: invitedEmail,
      token: generateToken(),
      expiresAt: addDays(new Date(), 7),
    }
  })

  // 2. Send email
  await sendEmail({
    to: invitedEmail,
    subject: `${invitedBy.name} invited you to ${workspace.name}`,
    react: <WorkspaceInviteEmail
      inviterName={invitedBy.name}
      workspaceName={workspace.name}
      inviteUrl={`${env.APP_URL}/invite/${invite.token}`}
    />,
  })

  return invite
}
```

Keep email logic here, not scattered across route handlers. If you need to resend or debug, there's one place to look.

---

## Handling Failures

Email send failures should not crash your user's request.

```typescript
// For non-critical emails (welcome, notifications)
try {
  await sendEmail({ ... })
} catch (error) {
  // Log but don't throw — user experience shouldn't depend on email delivery
  console.error("Welcome email failed to send:", error)
}

// For critical emails (password reset, invite tokens)
// Throw and surface to user — they need that email
await sendEmail({ ... })  // let it throw, handle in route
```

Classify each email: is it **critical** (user can't proceed without it) or **non-critical** (nice to have)?

---

## Email Prompt

```prompt
You are a senior engineer helping me write React Email templates for my SaaS.
My SaaS: [what your app does]
Email provider: Resend
Brand: [describe your brand style — minimal, friendly, professional, etc.]
Primary color: [hex code]
Email I need: [which email — welcome, invite, receipt, etc.]
Data available to the template:
[list the variables — userName, workspaceName, inviteUrl, amount, etc.]
Please generate:
1. Full React Email template using @react-email/components
2. Preview text (shows in inbox before opening)
3. Subject line options (3 variants)
4. Plain text fallback content
5. Any personalization opportunities I'm missing
```

---

## Validating AI Email Output

Before using AI-generated templates:

- [ ] Preview text defined (shows in inbox preview)
- [ ] All dynamic values are props — no hardcoded names or URLs
- [ ] Unsubscribe link present (required for CAN-SPAM compliance)
- [ ] Button links use absolute URLs — not relative paths
- [ ] Images use absolute URLs with HTTPS
- [ ] Fallback text for when images don't load (`alt` attributes)
- [ ] Tested in React Email dev preview
- [ ] Mobile layout looks correct (single column, tap targets ≥ 44px)
- [ ] Plain text version provided or auto-generated

Common AI mistakes:
- Relative URLs in links (`/dashboard` instead of `https://yourdomain.com/dashboard`)
- Missing preview text
- Hardcoded user data in the template
- No unsubscribe mechanism
- Inline styles missing (required for Outlook compatibility)

---

## Compliance Basics

Three rules that apply to every transactional email:

**CAN-SPAM (US):** Physical mailing address in footer. Unsubscribe mechanism. Honor opt-outs within 10 days.

**GDPR (EU):** Only send transactional email to users who have an account relationship with you. Transactional is generally permitted without separate consent — marketing is not.

**CASL (Canada):** Similar to GDPR. Explicit consent required for marketing. Transactional permitted for active business relationships.

> For transactional email in a personal SaaS: add your address to the footer, include an unsubscribe link, and you're covered for most jurisdictions.

---

## Implementation Checklist

Before moving to analytics:

- [ ] Email provider account created (Resend recommended)
- [ ] `react-email` and `@react-email/components` installed
- [ ] `emails/` directory created with all planned templates
- [ ] Shared `EmailLayout` component built
- [ ] `sendEmail` helper in `lib/email.ts`
- [ ] DNS records added (SPF, DKIM, DMARC)
- [ ] Domain verified in Resend dashboard
- [ ] Every template previewed in React Email dev
- [ ] Each email mapped to its service trigger
- [ ] Critical vs non-critical emails classified (error handling differs)
- [ ] Footer includes physical address and unsubscribe link

---

## What to Build Next

Emails are live. Your SaaS now communicates with users automatically at every key moment.

Next: **Analytics** — understanding what users actually do inside your product, so you can make decisions based on behavior rather than assumptions.
