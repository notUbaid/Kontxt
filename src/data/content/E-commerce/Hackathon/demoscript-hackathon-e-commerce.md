---
title: Demo Script
slug: demo-script
phase: Phase 6
mode: hackathon
projectType: e-commerce
estimatedTime: 15–20 min
---

# Demo Script

The live demo is where hackathons are won and lost.

A great demo isn't improvised — it's rehearsed until it feels improvised. Every word you say while clicking through your store should be intentional. Every transition should be smooth. Every moment of silence should be filled.

This module gives you the framework to script, rehearse, and recover from anything.

---

## The Demo is a Performance

Not a tour. Not a walkthrough. A performance.

You are not saying "and here is the cart page." You are telling a story where the customer is the protagonist, the store is the world, and completing a purchase is the resolution.

The judge should feel what it's like to be your customer — not watch you click buttons.

---

## Demo Script Structure

Your demo narration runs ~90 seconds. Here is the beat-by-beat script framework:

---

### On the Homepage (10 sec)

**What to say:**
> "This is [Store Name]. A store for [target customer]. Everything you see — the products, the copy, the design — is built around one idea: [your core differentiator in one phrase]."

**What to do:**
- Let the homepage sit for 2–3 seconds before clicking
- Don't apologise for load time
- Point out one design detail if it's strong ("notice we kept the layout minimal — that's intentional for our customer")

---

### Browsing the Catalog (15 sec)

**What to say:**
> "From here, the customer can browse the full catalog. We have [X] products across [Y] categories. Let me show you our featured piece — [product name]."

**What to do:**
- Click a featured product — not a random one
- Move with purpose. Don't hover, scroll aimlessly, or hesitate

---

### On the Product Page (20 sec)

**What to say:**
> "The product page gives the customer everything they need to make a decision: clear photography, a specific description, and one obvious action — add to cart."
>
> "Let's do that."

**What to do:**
- Click Add to Cart immediately after that line
- Pause half a second — let the cart badge update visibly
- Continue without commenting on whether it worked (it should)

---

### In the Cart (15 sec)

**What to say:**
> "The cart shows exactly what they're buying, lets them adjust quantities, and gets them to checkout in one click. No friction."

**What to do:**
- Navigate to cart
- Point out the subtotal
- Click "Proceed to Checkout" — don't linger

---

### Checkout (20 sec)

**What to say:**
> "Checkout is intentionally minimal. We only ask for what we actually need. Payment is handled by [Stripe / our secure payment flow]."

**What to do:**
- Form should already be pre-filled (or fill it in under 5 seconds)
- Enter the test card: `4242 4242 4242 4242`, any future expiry, any CVC
- Click Place Order with confidence

---

### Order Confirmation (10 sec)

**What to say:**
> "Order confirmed. The customer gets a unique order ID, a summary of what they bought, and a clear next step. That's the complete purchase flow — from discovery to confirmation."

**What to do:**
- Let the page sit for 2 seconds
- Smile. This is the payoff moment.
- Switch back to slides or hand off to the next speaker

---

## Handling Dead Air

Silence during a demo feels longer than it is. Have filler lines ready for loading moments:

| Situation | What to say |
|---|---|
| Page is loading | "While this loads — the store is deployed on Vercel, so in production this would be instant." |
| Form is being filled | "We pre-fill this in the demo to keep things moving, but the validation is fully wired." |
| Payment processing | "Stripe's processing — in test mode this takes about a second." |
| Anything slow | Say nothing. Keep composure. Dead air is better than apologising. |

> **The cardinal rule:** Never apologise for your product during a demo. Apologising plants doubt. Staying calm signals confidence.

---

## Recovery Lines

Things go wrong. Have these ready:

| Problem | Recovery |
|---|---|
| Page crashes | "Let me switch to our recorded demo." [Play backup video, no break in composure] |
| Wrong page clicked | "And actually — this gives us a good look at [X], let me show you that too." Redirect naturally. |
| Cart is empty | "I'll add a product quickly —" [Add one, move on] |
| Checkout fails | "We're using Stripe test mode — let me use the test card." [Enter 4242 4242...] |
| Blank screen | "One moment." [Pause. Refresh. Continue.] Never say "I don't know why this is happening." |

The judges won't remember the glitch. They'll remember how you handled it.

---

## Rehearsal Protocol

**Minimum:** Run the full demo path twice before presenting.

**Recommended:**

| Session | Goal |
|---|---|
| **Rehearsal 1** | Run it slowly. Identify any clicks that feel uncertain. |
| **Rehearsal 2** | Run it at presentation speed. Time it. |
| **Rehearsal 3** | Run it while narrating out loud. Adjust wording. |
| **Dress rehearsal** | Full pitch + demo in front of at least one person who will give real feedback. |

> **Time your demo.** If it's under 60 seconds, you're rushing or skipping something important. If it's over 2 minutes, you're dwelling somewhere that doesn't need it.

---

## Use AI to Write Your Demo Script

```
I'm presenting an e-commerce hackathon project with a live demo. Here are my store details:

Store name: [name]
Product category: [category]
Target customer: [one sentence]
Key differentiator: [one sentence]
Featured product: [product name and price]
Payment: [Stripe test mode / simulated]
Number of products: [number]

Write a word-for-word demo narration script for a 90-second live demo with these beats:
1. Homepage (10 sec)
2. Catalog browse + click to product (15 sec)
3. Product page + add to cart (20 sec)
4. Cart page (15 sec)
5. Checkout + place order (20 sec)
6. Order confirmation (10 sec)

Write it to be spoken aloud while clicking. Natural, confident, founder voice. No "um", no "basically", no "so yeah". Each beat should end with a natural transition to the next action.

Also provide 3 dead-air filler lines for loading moments.
```

> **After you get the script:**
- [ ] Read it aloud — does it flow naturally?
- [ ] Time it — is it 75–100 seconds?
- [ ] Every line is tied to a specific action on screen
- [ ] No line requires the judge to read something on the screen while you're talking
- [ ] The opening and closing lines are memorised verbatim

---

## Demo Environment Setup

Do this before you present. Not during.

- [ ] Browser is open to your store's homepage
- [ ] Checkout form is pre-filled (or test data is memorised)
- [ ] Test card is ready: `4242 4242 4242 4242` — any future date, any CVC
- [ ] Cart is empty (start fresh)
- [ ] No other tabs visible
- [ ] Browser zoom is appropriate for the room's screen size
- [ ] Backup screen recording is accessible in one click
- [ ] If on localhost: server is running, won't sleep
- [ ] If deployed: tested from the presentation network

---

> **Next module:** Submission Checklist →
>
> The final gate before you submit — everything that needs to be true, working, and ready before you hit send.
