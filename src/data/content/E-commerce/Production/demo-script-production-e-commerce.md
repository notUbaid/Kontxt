---
title: Demo Script
slug: demo-script
phase: Phase 6 Growth
mode: production
projectType: e-commerce
estimatedTime: 30-45 min
---

# Live Execution & Disaster Recovery

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 45 Minutes

A beginner starts their live demo by saying, *"Okay, let me refresh the page... wait, why is it loading so slow? Hang on, let me log in... oh, the password reset is broken. Let me just show you the codebase instead."*

The presentation is instantly dead. The stakeholder has lost all confidence in the engineer.

In a production environment, a Live Demo is a tightly choreographed, mathematically timed execution. You must engineer **Happy Path Choreography**, **Mocked Fallbacks**, and **Data Reset Scripts**.

---

## 1. The Choreographed Happy Path

You never randomly click around your application during a demo. You must script the exact, golden "Happy Path" that highlights your highest-value engineering decisions.

**The Production Choreography:**
1. **The Edge Speed Test:** Start by demonstrating the sub-100ms load time of the Homepage. Explicitly state: *"Notice how fast this loaded. This is because Vercel Edge Middleware is serving cached static HTML, bypassing the PostgreSQL database entirely."*
2. **The Semantic Search:** Search for a complex term like *"Summer beach outfit."* When the correct items appear, state: *"This is not a basic keyword match. This is hitting our Pinecone Vector Database to perform a semantic Cosine Similarity search based on OpenAI embeddings."*
3. **The 3DS Checkout:** Add an item to the cart and process the payment. Point out the Stripe Tokenization: *"Notice the card input. This is an iframe injected directly by Stripe. Our Next.js servers never touch the raw credit card, ensuring total PCI-DSS SAQ-A compliance."*
4. **The Post-Purchase Upsell:** Show the One-Click Upsell firing immediately after payment.

## 2. Hardcoded Fallbacks (The Disconnect Defense)

If the venue Wi-Fi goes down, or the Stripe API has a rare outage during your demo, you cannot freeze. 

**The Production Solution:**
You must have a mocked, hardcoded fallback branch ready to deploy locally. 

If the Stripe API fails, your code should have a `process.env.DEMO_MODE` flag that bypasses the actual `stripe.paymentIntents.create` network request and instantly returns a mock success payload.

```typescript
// app/api/checkout/route.ts
if (process.env.DEMO_MODE === 'true') {
  return NextResponse.json({ 
    clientSecret: 'mock_secret_123',
    status: 'succeeded' 
  });
}

// Actual Stripe Logic follows...
```

You flip the environment variable in your terminal, the demo continues flawlessly, and the stakeholder never knows the Wi-Fi dropped.

## 3. The Data Reset Script (Idempotent Demos)

If you practice your demo 5 times before the meeting, your database will be filled with "Test User", "Test Order 1", and "Test Order 2". When you do the live demo, it looks unprofessional and messy.

**The Production Solution:**
You must engineer a `teardown.ts` script that mathematically wipes your staging database and reseeds it to a pristine state 5 minutes before you walk into the room.

```typescript
// prisma/seed-demo.ts
async function resetDemoState() {
  // 1. Wipe all transactional data, but keep the Product catalog intact
  await prisma.order.deleteMany({});
  await prisma.user.deleteMany({ where: { role: 'CUSTOMER' } });

  // 2. Insert a perfect mock user for the demo login
  await prisma.user.create({
    data: {
      email: 'demo@investor.com',
      name: 'Jane Doe',
      tier: 'GOLD',
      pointsBalance: 500
    }
  });

  console.log("✅ Demo State Pristine. Ready to Present.");
}
```

---

## ✅ Demo Script Engineering Checklist

- [ ] Choreograph a strict 4-step Happy Path that highlights the technical architecture (Edge Caching, Vector Search, PCI Compliance).
- [ ] Implement a `DEMO_MODE` environment variable to mock third-party network requests (Stripe, EasyPost) to survive venue Wi-Fi outages.
- [ ] Write a `seed-demo.ts` script to idempotently wipe and reset the staging database to a pristine, professional state before the presentation.
- [ ] Use the AI prompt below to generate the rigorous demo script.

---

## AI Prompt — Engineer the Live Demo

Copy this prompt into your AI to have it generate the mathematical presentation script.

````prompt
I am preparing to execute a live 5-minute demo of my headless Next.js E-Commerce platform for a panel of Senior Engineers. I need you to act as my Principal Developer Advocate and write the exact spoken script and click-path.

I need you to generate the following strict choreography:

**1. The Spoken Demo Script:**
Write a 4-step script (Search -> Cart -> Checkout -> Post-Purchase Upsell).
- For each step, provide the exact **Action** (e.g., "Type 'warm jacket' into the search bar") and the exact **Spoken Words** (e.g., "Because we use Pinecone Vector Embeddings, the system understands 'warm' semantically and returns wool products, even if the word 'warm' isn't in the title").

**2. The Teardown Script:**
Write the Node.js/Prisma script required to reset the database.
- Show the Prisma syntax to `deleteMany` orders and customers while preserving the core product catalog.
- Explain in Markdown why presenting a UI filled with `test_order_123` destroys credibility, and why automated teardown scripts are mandatory for professional SaaS demos.
````

**Next: The Final Submission Checklist →**
