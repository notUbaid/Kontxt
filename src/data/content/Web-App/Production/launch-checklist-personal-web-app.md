---
title: Launch Checklist
slug: launch-checklist
phase: Phase 5
mode: personal
projectType: web-app
estimatedTime: 20–30 min
---

# Launch Checklist

Most personal projects never launch. They get indefinitely polished, feature-added, and quietly abandoned. This checklist exists to prevent that.

Launch doesn't mean perfect. It means ready enough for real people to use it without being embarrassed by what they find.

Work through this once. Fix what's broken. Ship.

---

## The Standard

For each item, ask one question: **would this break the experience for a real user?**

If yes — fix it before launch.
If no — it can wait.

---

## Product

- [ ] The core user action works end-to-end (create, view, edit, delete)
- [ ] Sign up flow completes without errors
- [ ] Sign in flow completes without errors
- [ ] Sign out works correctly and clears the session
- [ ] Password reset works (if applicable)
- [ ] Empty states exist — no blank screens where content should be
- [ ] Error states exist — no white screens of death on failures
- [ ] Loading states exist — no layout shift or frozen UI during data fetches
- [ ] The app is usable on a mobile viewport (375px minimum)
- [ ] The app works in Safari (it's not Chrome — test it specifically)
- [ ] No broken links in navigation or footer
- [ ] 404 page exists and is helpful

---

## Performance

- [ ] Lighthouse performance score ≥ 70 on mobile (measure on production, not localhost)
- [ ] Largest Contentful Paint < 3s on a simulated slow connection
- [ ] No images without explicit width and height (causes layout shift)
- [ ] Above-the-fold images use `priority` prop
- [ ] Page does not load more than ~500KB of JavaScript on first load

```bash
# Quick bundle size check
npm run build
# Look for the First Load JS column in the output
# Flag anything over 150KB for a single route
```

---

## Security

- [ ] No secrets in Git history
- [ ] All environment variables set in production (not localhost values)
- [ ] Authentication required on all private routes
- [ ] Every API route checks auth before touching data
- [ ] Rate limiting on sign-in and sign-up routes
- [ ] Input validation on all API routes
- [ ] HTTPS active on your domain

---

## SEO & Discoverability

- [ ] Every page has a unique `<title>`
- [ ] Every page has a `meta description`
- [ ] Open Graph tags set (controls how links look when shared)
- [ ] Favicon exists
- [ ] `robots.txt` exists
- [ ] `sitemap.xml` exists (Next.js can generate this automatically)

```typescript
// app/layout.tsx — base metadata
export const metadata: Metadata = {
  title: {
    default: 'Your App Name',
    template: '%s | Your App Name',
  },
  description: 'One sentence that explains what your app does.',
  openGraph: {
    title: 'Your App Name',
    description: 'One sentence that explains what your app does.',
    url: 'https://yourdomain.com',
    siteName: 'Your App Name',
    images: [{ url: 'https://yourdomain.com/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your App Name',
    description: 'One sentence that explains what your app does.',
    images: ['https://yourdomain.com/og-image.png'],
  },
}
```

```typescript
// app/sitemap.ts — auto-generated sitemap
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://yourdomain.com', lastModified: new Date(), priority: 1 },
    { url: 'https://yourdomain.com/about', lastModified: new Date(), priority: 0.8 },
  ]
}
```

---

## Legal & Trust

- [ ] Privacy policy exists (required if you collect any user data)
- [ ] Terms of service exists (protects you, sets user expectations)
- [ ] Cookie consent banner if using cookie-based analytics (GDPR)
- [ ] Contact method exists — email, form, or social link

> [!TIP]
> Use [Termly](https://termly.io) or [Iubenda](https://iubenda.com) to generate a privacy policy and terms of service in minutes. Don't ship a user-facing app that collects email addresses without a privacy policy.

---

## Infrastructure

- [ ] Custom domain connected (not `*.vercel.app`)
- [ ] SSL certificate active
- [ ] Production database is hosted and backed up
- [ ] Environment variables set for Production scope in Vercel
- [ ] Analytics active and confirmed receiving data
- [ ] You have a way to see errors in production (Vercel function logs at minimum)

---

## Content

- [ ] Landing page explains what the app does in one sentence
- [ ] Value is clear within 5 seconds of arriving
- [ ] Call to action is obvious (sign up, try it, get started)
- [ ] No placeholder text (`Lorem ipsum`, `TODO`, `Coming soon` on core features)
- [ ] No broken images or missing assets
- [ ] Copy has been proofread — typos in product copy erode trust fast

---

## Pre-Launch Smoke Test

Do this manually, on your production URL, from an incognito window, on your phone.

```
1. Visit the landing page — does it load and make sense?
2. Click sign up — does the full flow complete?
3. Do the core action (create / post / upload / whatever your app does)
4. View what you just created
5. Edit it
6. Delete it
7. Sign out
8. Sign back in — is your data still there?
9. Try something that should fail (bad input, wrong URL) — does it handle it gracefully?
10. Check your analytics dashboard — did the events fire?
```

If every step passes: you're ready to launch.

---

## The Launch Decision

> [!WARNING]
> Waiting for perfect is the most common reason personal projects never ship. Perfect is not the bar. This checklist is the bar.

If every critical item above is checked, launch. Not tomorrow. Today.

The feedback you get from real users in the first 48 hours is worth more than another week of solo development.

---

## What Comes Next

Two modules remain in Phase 5:

- **Presentation Prep** — how to show your project to people effectively
- **Pitch Deck** — if you're taking this further than a personal project

You built something. Ship it.
