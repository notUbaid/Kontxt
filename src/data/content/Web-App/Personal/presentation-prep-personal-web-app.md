---
title: Presentation Prep
slug: presentation-prep
phase: Phase 5
mode: personal
projectType: web-app
estimatedTime: 25–35 min
---

# Presentation Prep

Showing your project to someone — a recruiter, a friend, a potential collaborator, a room full of people — is a different skill from building it. Most developers undersell their work not because it's weak, but because they present it like engineers instead of storytellers.

This module helps you present your project with the same care you put into building it.

---

## The Core Mistake

Developers lead with features. Audiences care about problems.

```
 "It's a full-stack Next.js app with Prisma, 
    TanStack Query, and deployed on Vercel."

 "I built this because I kept losing track of [problem]. 
    Now I use it every day."
```

The tech stack is not the story. The problem you solved is the story. Tech is evidence that you can solve it.

---

## Your Presentation Structure

Every compelling project presentation follows the same arc — regardless of whether it's a 2-minute demo or a 20-minute talk.

**1. The Problem (30 seconds)**

Make the audience feel the pain before you show the solution. Be specific.

```
"Every time I [specific situation], I had to [frustrating workaround]. 
I did this [X times a week / for X months]. 
There wasn't a good tool for this, so I built one."
```

**2. The Solution (1 minute)**

Show it. Don't describe it. Open the app, do the core action, let them see it work.

```
"Here's what I built. [opens app]
You [do the action] — it takes about 10 seconds.
[the result appears]
That's it."
```

**3. The Engineering (2–3 minutes — if the audience is technical)**

Pick the two or three most interesting decisions. Not everything. The decisions that had real trade-offs.

```
"The interesting engineering problem here was [specific challenge].
I decided to [approach] because [reason].
The alternative was [other approach] but that would have [trade-off]."
```

**4. What You Learned (1 minute)**

This is what makes a personal project presentation memorable. Honesty about what was hard.

```
"The hardest part was [specific challenge].
I initially tried [approach], which didn't work because [reason].
What actually worked was [solution]."
```

**5. What's Next (30 seconds)**

Show you're still thinking about it.

---

## Preparing the Demo

A demo that breaks live is painful for everyone. Prepare it.

**Before the presentation:**

- [ ] Test the full flow on the exact device and network you'll use
- [ ] Have a backup plan (screen recording or screenshots) if live demo fails
- [ ] Clear browser history and autofill so nothing embarrassing appears
- [ ] Zoom the browser to 125–150% — people in the back can't read normal text
- [ ] Close all other tabs and notifications
- [ ] Pre-load the app so it's not starting cold when you present
- [ ] Have realistic-looking data — empty states look unfinished; fake-looking data looks amateur

**Seed realistic demo data:**

```typescript
// scripts/seed-demo.ts
// Run this before a presentation to populate the app with realistic content
import { db } from '../src/lib/db'

async function seedDemoData() {
  const user = await db.user.upsert({
    where: { email: 'demo@yourapp.com' },
    update: {},
    create: {
      email: 'demo@yourapp.com',
      name: 'Demo User',
    }
  })

  // Create realistic-looking content
  await db.post.createMany({
    data: [
      { title: 'A realistic post title', content: '...', authorId: user.id },
      // more entries that look like a real user's data
    ],
    skipDuplicates: true,
  })

  console.log('Demo data seeded')
}

seedDemoData()
```

---

## What to Say About the Tech Stack

Most non-technical audiences don't need the stack. Most technical audiences already know the tools.

What they want to know is: **why did you pick this, and would you pick it again?**

```
 "I used Next.js, TypeScript, Prisma, PostgreSQL, 
    TanStack Query, Zod, NextAuth, and Vercel."

 "I used Next.js because the full-stack model meant I could ship 
    faster without managing a separate API. The biggest trade-off 
    was that serverless functions have cold starts, which I had to 
    work around for the database connection."
```

One trade-off you consciously navigated tells the audience more about your engineering judgement than a list of every library you installed.

---

## Talking About What Didn't Work

This is the part most developers skip. It's also the part that makes you memorable.

Audiences — especially technical ones — trust people who talk honestly about failure. It signals that you understand the problem deeply, not just the happy path.

```
"My first approach was [X]. It didn't work because [specific reason]. 
I wasted about [time] on it before I realised [insight]. 
Once I understood that, [Y] was the obvious solution."
```

> [!TIP]
> Prepare one specific story of something that went wrong and how you fixed it. It's the most common interview follow-up question for portfolio projects, and having a real answer ready is the difference between a good interview and a great one.

---

## Answering Hard Questions

**"Why didn't you just use [existing tool]?"**

```
"I looked at [existing tool]. For my use case, [specific limitation] 
was a dealbreaker. Building my own meant [specific advantage]."
```

If the honest answer is "I didn't know it existed" — say so. Then explain what you'd do differently now.

**"Does it scale?"**

```
"For the current scale — [X users / Y requests] — the architecture 
handles it fine. If it grew to [Z], I'd need to [specific change]. 
I made this trade-off consciously because [reason]."
```

**"Why [technology choice]?"**

Always have a real answer. "I wanted to learn it" is a legitimate answer for a personal project. Own it.

**"What would you build differently?"**

This is an invitation. Have an honest answer ready. It shows growth.

---

## For a Technical Interview Context

If you're presenting this project in an interview, the frame shifts slightly.

They're evaluating: can you make good engineering decisions and explain your reasoning?

**Lead with the problem, not the solution.** Interviewers have seen every tech stack. They haven't seen your specific problem and constraints.

**Pick your most interesting technical decision.** What was genuinely hard? What did you consider and reject? What would you change?

**Know your code.** If you used AI to generate significant portions, know what those portions do. You will be asked to explain the code you wrote (or approved). "The AI wrote that part" without further understanding is a red flag.

**Prepare for the "tell me about a bug" question.** Have a specific story: what broke, how you diagnosed it, what the fix was, what you learned.

---

## Presentation Prep Checklist

**Content**
- [ ] One-sentence explanation of what the app does
- [ ] One-sentence explanation of why you built it
- [ ] Two to three engineering decisions you can speak to with trade-offs
- [ ] One story of something that went wrong and how you fixed it
- [ ] What you'd do differently if starting again

**Demo**
- [ ] Full flow tested on presentation device and network
- [ ] Realistic demo data seeded
- [ ] Browser zoomed to 125–150%
- [ ] Notifications and other tabs closed
- [ ] Backup screenshot or recording ready

**Anticipate**
- [ ] "Why didn't you use X?" → have an answer
- [ ] "Does it scale?" → have an honest answer
- [ ] "What's next?" → have something real to say

---

## What Comes Next

One module remains:

**Pitch Deck** — if your personal project is becoming something more. How to turn what you've built into a compelling case for why it should exist at scale.

If you're not pitching, you're done. You planned, designed, architected, built, secured, deployed, and shipped a web app. That's the full arc.
