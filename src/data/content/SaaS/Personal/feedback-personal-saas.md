---
title: Feedback
slug: feedback
phase: Phase 5
mode: personal
projectType: saas
estimatedTime: 15–20 min
---

# Feedback

Your assumptions about what users want are wrong.

Not partially wrong. Systematically wrong — in ways you cannot discover by thinking harder. The only way to find out what users actually need is to talk to them and watch what they do.

Feedback is not a support channel. It is your primary product input.

---

## Two Types of Feedback

|
 Type 
|
 What it tells you 
|
 How to get it 
|
|
---
|
---
|
---
|
|
**
Qualitative
**
|
 Why users do things, what they actually need 
|
 Interviews, open-ended surveys, support conversations 
|
|
**
Quantitative
**
|
 What users do, how often, where they drop off 
|
 Analytics, NPS, rating prompts 
|

You need both. Quantitative tells you *what* is happening. Qualitative tells you *why*.

A high drop-off rate at step 3 of onboarding is quantitative. "I didn't understand what this step was asking me to do" is qualitative. You need both to fix it.

---

## In-App Feedback

The lowest-friction feedback is collected where users already are — inside your product.

### Feedback Widget

A persistent, lightweight way for users to send feedback at any moment.

**What to build:**

```tsx
// components/shared/FeedbackWidget.tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/Textarea"

export function FeedbackWidget() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit() {
    await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        message,
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    })
    setSubmitted(true)
  }

  if (submitted) return (
    
      Thanks — feedback received.
    
  )

  return (
    
      {open ? (
        
          Share feedback
          <Textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="What's on your mind?"
            className="mb-3"
            rows={3}
          />
          
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel
            Send
          
        
      ) : (
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          Feedback
        
      )}
    
  )
}
```

Add to your dashboard layout so it's available on every authenticated page.

**Store feedback in your database:**

```prisma
model Feedback {
  id        String   @id @default(cuid())
  userId    String?
  message   String
  url       String?
  createdAt DateTime @default(now())

  user User? @relation(fields: [userId], references: [id])
}
```

---

### NPS (Net Promoter Score)

One question. Shown at the right moment.

> "How likely are you to recommend [YourApp] to a friend or colleague?"
> Scale: 0–10

**When to show it:**
- After the user has had 7+ days in the product
- After they complete a meaningful action (not immediately on signup)
- No more than once every 90 days

**How to interpret scores:**
- 9–10: Promoters — your advocates
- 7–8: Passives — satisfied but not enthusiastic
- 0–6: Detractors — at risk of churning

NPS = % Promoters − % Detractors

A score above 50 is excellent. Most early-stage SaaS products sit between 20–40.

> Always follow an NPS prompt with an open text field: "What's the main reason for your score?" The number tells you where you stand. The text tells you why.

---

### Feature Requests

Make it easy for users to request features — and easy for you to see patterns.

**Lightweight approach:** A dedicated `/feedback` page with a simple form. Tag submissions by category manually at first.

**When you have 10+ users:** Consider Canny or a simple upvoting board. Premature tooling is a distraction before you have enough signal volume to need it.

---

## User Interviews

Feedback widgets collect what users choose to tell you. Interviews reveal what they don't know to articulate.

**When to start:** After your first 5 active users.

**How to recruit:**

```
Email template — Copy and adapt:

Subject: 15 minutes? I'd love your input on [YourApp]

Hi [name],

You've been using [YourApp] for [X days] and I wanted to personally reach out.

I'm building this product and your perspective would be incredibly valuable. Would you be open to a 15-minute call this week? I'm looking to understand your experience — what's working, what's not, and what you actually need.

No agenda, no sales pitch. Just a conversation.

[Your calendar link]

[Your name]
```

**What to ask:**

```
1. Walk me through how you use [YourApp] in a typical week.
2. What were you trying to do when you first signed up?
3. Was there anything that confused you early on?
4. Is there anything you expected to find that wasn't there?
5. If you could change one thing, what would it be?
6. What would make you tell a friend about this?
```

**What not to do:**
- Don't ask "would you use feature X?" — people say yes to everything hypothetical
- Don't defend your decisions — listen
- Don't pitch — extract

> The most valuable moment in a user interview is when the user hesitates. That pause is where the real problem lives. Don't fill the silence.

---

## Where Feedback Goes

Feedback with no destination is noise.

```
Feedback received
      ↓
Categorize: Bug / UX / Missing feature / Positive
      ↓
Add to roadmap backlog with source + frequency
      ↓
Identify patterns (3+ users mention same thing = signal)
      ↓
Prioritize in next roadmap review
```

A simple Notion table or GitHub Issues is enough to start. The tool doesn't matter — the habit does.

---

## Churn Feedback

When a user cancels their subscription, ask why.

**Cancellation survey — show before confirming cancellation:**

```
Why are you cancelling?

○ Too expensive
○ Missing a feature I need
○ Switching to a competitor
○ No longer need this type of tool
○ Had technical issues
○ Other: ___________
```

Cancellation feedback is your most honest feedback. Users who leave have nothing to soften — they tell you exactly what didn't work.

Store every cancellation reason. After 10 cancellations, the pattern is obvious.

---

## Feedback Anti-Patterns

|
 Anti-pattern 
|
 Why it fails 
|
|
---
|
---
|
|
 Building every feature requested 
|
 Requested ≠ valuable. Users ask for solutions, not outcomes. 
|
|
 Only collecting feedback from power users 
|
 They're not your average user 
|
|
 Asking leading questions 
|
 "Don't you think X would be useful?" always gets yes 
|
|
 Collecting feedback and never acting on it 
|
 Users stop giving it 
|
|
 Waiting until launch to start collecting 
|
 You miss the most valuable early signal 
|

---

## Feedback Prompt

```
Copy Prompt
```

> You are a product manager helping me design a feedback system for my early-stage SaaS.
>
> My SaaS: [what your app does]
> Current users: [approximately how many active users]
> Core user action: [the main thing users do in the product]
>
> Please help me:
> 1. Write 5 user interview questions specific to my product and user journey
> 2. Write the copy for an NPS prompt and follow-up text field
> 3. Write a cancellation survey with 5–7 options specific to my product's likely churn reasons
> 4. Suggest the 3 most important in-product moments to prompt for feedback
> 5. Recommend how I should categorize and store feedback given my stage

---

## Implementation Checklist

- [ ] Feedback widget built and added to dashboard layout
- [ ] `/api/feedback` route created and storing to DB
- [ ] NPS prompt designed (not necessarily built yet — plan it)
- [ ] Cancellation survey designed
- [ ] User interview question list written
- [ ] First 5 users emailed for interview requests
- [ ] Feedback categorization system set up (Notion / GitHub Issues / simple spreadsheet)
- [ ] Commitment: review all feedback weekly

---

## What to Build Next

Feedback system live. You're collecting signal from real users and have a process to act on it.

Next: **Roadmap** — turning feedback, analytics, and your product vision into a prioritized plan for what to build next.