---
title: Submission Checklist
slug: submission-checklist
phase: Phase 6
mode: hackathon
projectType: e-commerce
estimatedTime: 30–45 min
---

# Submission Checklist

This is the final gate.

Everything you've built across Phase 0 through Phase 6 comes down to what you submit. A brilliant store that submits broken assets, a dead link, or missing required fields gets disqualified or penalised — sometimes before a judge ever sees it.

Work through every section below. Check nothing off until it is verified, not assumed.

---

## The Submission Package

Most hackathons require some combination of:

| Asset | Notes |
|---|---|
| **Live store URL** | Must be publicly accessible, not localhost |
| **GitHub repository** | Clean, with a README |
| **Pitch deck** | PDF preferred — not a Google Slides link that requires access |
| **Demo video** | Often 2–3 min max, MP4 preferred |
| **Project description** | Short-form write-up in the submission form |

> Read your hackathon's submission requirements now if you haven't already. Requirements vary. Assume nothing.

---

## Section 1: Deployment

Your store must be live at a public URL before you submit.

**Recommended platforms:**

| Platform | Best for | Deploy time |
|---|---|---|
| **Vercel** | Next.js (zero config) | < 5 min |
| **Netlify** | React, static sites | < 5 min |
| **Railway** | Full-stack with backend | 10–20 min |
| **Render** | Node.js backends | 10–20 min |

**Vercel deployment (fastest path for Next.js):**

```bash
npm i -g vercel
vercel
# Follow the prompts — it detects Next.js automatically
```

> Add environment variables in Vercel's dashboard under Project → Settings → Environment Variables. Your `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` must be added here — they are not in your repository.

**Post-deployment verification:**

- [ ] URL opens without errors on a fresh browser (not your dev machine)
- [ ] URL opens on mobile
- [ ] All product images load (remote image domains configured in `next.config.js`)
- [ ] Add to Cart works
- [ ] Checkout completes end to end
- [ ] No environment variable errors in the console (open DevTools → Console)

---

## Section 2: GitHub Repository

Judges and technical reviewers often look at your repository. It signals engineering discipline.

**Repository checklist:**

- [ ] Repository is public
- [ ] `.env` and `.env.local` are in `.gitignore` — secret keys are never committed
- [ ] No hardcoded API keys anywhere in the codebase (`git grep "sk_test_"` to check)
- [ ] `node_modules` is in `.gitignore`
- [ ] Final working code is on the `main` branch

**README.md — minimum required sections:**

```markdown
# [Store Name]

[One-paragraph description of the store and what it does]

## Live Demo
[URL]

## Tech Stack
- Frontend: Next.js, Tailwind CSS
- Payments: Stripe (test mode)
- Deployment: Vercel

## Getting Started

git clone [repo URL]
cd [repo name]
npm install
cp .env.example .env.local
# Add your Stripe keys to .env.local
npm run dev

## Environment Variables
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

## Team
- [Name] — [Role]
- [Name] — [Role]
```

> A README that works takes 20 minutes to write and is the difference between a professional submission and a lazy one. Judges notice.

---

## Section 3: Demo Video

If a demo video is required (or optional but recommended), build it strategically.

**Video requirements:**
- Length: 2–3 minutes (check your hackathon's limit)
- Format: MP4, 1080p minimum
- Audio: clear narration, no background noise

**What to show:**
1. Store homepage (5 sec)
2. Catalog browse (10 sec)
3. Product detail page + add to cart (15 sec)
4. Cart page (10 sec)
5. Checkout form completion (15 sec)
6. Order confirmation (10 sec)
7. Optional: brief code walkthrough if technical depth is scored

**Recording tools:**

| Tool | Platform | Notes |
|---|---|---|
| **Loom** | Web | Fast, free, shareable link |
| **OBS Studio** | Desktop | Full control, more setup |
| **QuickTime** | Mac | Built-in, no install |
| **Xbox Game Bar** | Windows | Built-in (`Win + G`) |

> Record the demo path you rehearsed. Use the same pre-filled checkout, the same featured product, the same flow. Consistency means no surprises.

**Video checklist:**
- [ ] All pages visible and functional in the recording
- [ ] Audio is clear — narration matches what's happening on screen
- [ ] No personally identifiable information visible (email addresses, real card numbers)
- [ ] Video is under the time limit
- [ ] Uploaded to a stable host (YouTube unlisted, Loom, Google Drive with public access)
- [ ] Link tested from an incognito browser

---

## Section 4: Pitch Deck

- [ ] Exported as PDF (not just a slides link)
- [ ] PDF opens correctly — no missing fonts, no broken images
- [ ] File size under 10MB (compress images if needed)
- [ ] Filename is clean: `[store-name]-pitch-deck.pdf`
- [ ] All screenshots show the live, deployed store — not localhost

---

## Section 5: Project Description

Most submission forms ask for a short project description. Write this before the deadline, not in the final 5 minutes.

**Template:**

> [Store Name] is an e-commerce store for [target customer] who want [outcome]. We sell [product category] with a focus on [differentiator].
>
> Built in [X hours] using [tech stack], the store features a full purchase flow: product catalog, detail pages, cart management, and [Stripe test mode payments / simulated checkout]. [One sentence about something technically interesting or unique in your build.]
>
> [Optional: one sentence about what you'd build next.]

**Word count:** Most forms cap at 200–500 words. Write to 150 words, then expand only if the form has space and you have something genuinely worth adding.

---

## Section 6: Final Store Quality Pass

Do this on the deployed URL, not localhost.

### Functionality
- [ ] Homepage loads and CTA button works
- [ ] All products in the catalog are clickable
- [ ] Product detail pages load for every product
- [ ] Add to Cart updates the cart badge
- [ ] Cart shows correct items, quantities, and subtotal
- [ ] Checkout form validates correctly (try submitting empty)
- [ ] Payment completes (test card: `4242 4242 4242 4242`)
- [ ] Order confirmation shows order ID
- [ ] Cart clears after order confirmation
- [ ] 404 page exists (navigate to `/this-does-not-exist`)

### Visual Quality
- [ ] No broken images on any page
- [ ] No placeholder text ("Lorem ipsum", "Product description here", "Coming soon")
- [ ] No visible console errors (DevTools → Console)
- [ ] Typography is consistent across all pages
- [ ] Colors and spacing are consistent
- [ ] Store looks credible on mobile (test at 375px width)

### Content
- [ ] Every product has a real name, real price, and real description
- [ ] All prices are formatted correctly (`$45.00`, not `45` or `$45.0`)
- [ ] Navigation links all work — no dead links
- [ ] Store name appears consistently (same capitalisation everywhere)

---

## Submission Timing

| Time before deadline | What to do |
|---|---|
| **2 hours out** | Deployment verified, all checklist items complete |
| **1 hour out** | Demo video uploaded and link tested, PDF exported |
| **30 min out** | Submission form filled out, all assets attached |
| **15 min out** | Submit. Do not make code changes after submitting. |
| **At deadline** | Stop. Whatever is submitted is what's judged. |

> **Never push code changes in the final 30 minutes.** Deployments can fail. A broken deployment at submission time is worse than a slightly imperfect store that works.

---

## Final Submission Checklist

- [ ] Live URL is public and working
- [ ] Full purchase flow tested on the live URL from a fresh browser
- [ ] GitHub repository is public with a complete README
- [ ] No secret keys committed to the repository
- [ ] Demo video recorded, uploaded, and link is publicly accessible
- [ ] Pitch deck exported as PDF
- [ ] Project description written and ready to paste
- [ ] Submission form filled out completely
- [ ] All required assets attached or linked
- [ ] Submitted at least 15 minutes before the deadline

---

## You're Done.

Every module in this curriculum was designed to get you here — with a store that works, a pitch that lands, and a submission that represents your best work.

Go present it.

---

> **Track complete: E-Commerce Hackathon**
>
> You've completed all modules across Phase 0, Phase 1, Phase 3, and Phase 6. Good luck.
