# Demo Data

🕒 **Estimated Time:** 15 Minutes

---

Demo data is not a last-minute task.

It is a product decision.

Judges spend 3–5 minutes with your app. If they land on an empty state, you've already lost points. If they see realistic, cohesive data that tells a story — they feel the product working.

Your demo data *is* your demo.

---

## The Core Problem

Most hackathon teams seed data too late, too randomly, or not at all.

The result:
- Empty dashboards that feel broken
- Numbers like `$0.00`, `0 users`, `N/A`
- Features that look unfinished even when they aren't
- Judges who can't imagine real usage

Demo data solves this by staging the narrative your pitch tells.

---

> **Principle**
>
> Your demo data should answer the question a judge is silently asking:
> *"Does this product actually do something useful for a real person?"*

---

## Two Types of Demo Data

| Type | Purpose | When to Use |
|------|---------|-------------|
| **Seed data** | Baked into the DB on startup | Always |
| **Live-generated data** | Created during the demo itself | If your product benefits from showing real-time updates |

For most SaaS hackathon projects: **seed data is enough**. Don't over-engineer this.

---

## What Good Demo Data Looks Like

Judges need to see:
- Realistic user names, emails, companies — not `user1@test.com`
- Numbers that tell a story — not `1`, `2`, `3`
- Timestamps that span weeks — not all created `2 seconds ago`
- Enough records to show your UI handles non-trivial data

### Bad Seed Data
```
User: test@test.com, John Doe
Revenue: $100
Items: 3
```

### Good Seed Data
```
User: sarah.chen@acmecorp.com, Sarah Chen — VP of Operations
Revenue: $48,320 (trending up over 6 weeks)
Items: 47 active, 12 archived, 3 pending review
```

The difference is **narrative density**. Every field tells the story of a working product.

---

## Design Your Demo Storyline First

Before writing a single seed script, write 2–3 sentences that describe who uses your app and what they've accomplished.

> **Example**
>
> *Acme Corp has been using the platform for 6 weeks. Their team of 4 manages 47 active campaigns. Their best-performing campaign brought in $12,400 last month.*

Now every piece of data you seed either supports this story or it doesn't.

---

## The Anatomy of a Strong Seed Script

A good seed script does 5 things:

- [ ] Creates 1–2 realistic organizations or accounts
- [ ] Creates 3–5 realistic users with real-sounding names and roles
- [ ] Populates core feature tables with 20–50 records
- [ ] Uses varied, realistic values — not sequential integers
- [ ] Spreads timestamps across 4–8 weeks to show "history"

---

## AI Prompt — Generate Your Seed Script

Use this after your schema is finalized.

```prompt
You are seeding a demo database for a SaaS hackathon project.

**Product:** [one sentence description]
**Core tables:** [list your main tables and their columns]
**Stack:** [e.g., PostgreSQL + Prisma / Supabase / SQLite]

Generate a complete seed script that:
- Creates 2 realistic organizations
- Creates 5 realistic users with distinct roles
- Populates [your key feature tables] with 30–50 records
- Uses realistic names, values, and amounts relevant to the domain
- Spreads created_at timestamps over the past 6 weeks
- Ensures all foreign keys are consistent

The data should tell the story of a team that has been actively using the product for 6 weeks and is seeing real results.

Return only the seed script. No explanations.
```


---

## Timestamp Strategy

This is the detail most teams miss.

If all your records have the same `created_at`, your analytics charts look like a spike — not a trend. Your "history" looks fake.

Use jittered timestamps:

```js
// Generate a random timestamp within the past N days
function randomPastDate(daysBack) {
  const now = Date.now();
  const range = daysBack * 24 * 60 * 60 * 1000;
  return new Date(now - Math.random() * range);
}

// Example: spread 40 records across the past 6 weeks
records.map((r, i) => ({
  ...r,
  created_at: randomPastDate(42 - i), // slight trend toward recent
}));
```

This makes your usage charts look like a real product with real growth.

---

## The "Golden Path" Demo Account

Create one account your judges will log into during the pitch.

This account should have:
- A recognizable name (e.g., *Sarah Chen, Acme Corp*)
- Pre-filled onboarding — nothing half-complete
- Your best features already in use
- Numbers that look impressive for the use case

> **Warning**
>
> Don't let judges log in as `admin@test.com`. It destroys the illusion immediately.
> Name your demo user something real. It signals that you thought about users.

---

## Domain-Specific Realism

Generic data feels fake. Domain-specific data feels like a real product.

| If your SaaS is... | Don't use | Use instead |
|--------------------|-----------|-------------|
| Project management | Task 1, Task 2 | "Q4 roadmap review", "Fix auth bug in prod" |
| Analytics | metric_value: 100 | 4,218 sessions, 34.2% bounce rate |
| CRM | Contact 1 | Marcus Rivera, Ops Lead at Brightline |
| Finance | Amount: 50 | $2,840.00 — Invoice #INV-0047 |
| HR | Employee A | Priya Nair, Senior Engineer, Remote — Austin |

The more your data sounds like the industry you're solving for, the more credible your product feels.

---

## When to Seed — Run Order

```
1. Run migrations
2. Run seed script
3. Verify data in DB or via API
4. Test your golden-path demo flow end-to-end
5. Lock the seed — don't change it 2 hours before demo
```

> **Tip**
>
> Add a `npm run seed` or `python seed.py` command to your README.
> Judges sometimes ask to run your project locally. A one-command seed is a green flag.

---

## Validation Checklist

Before your demo, walk through the app as a judge would:

- [ ] Landing / dashboard has visible, meaningful data on load
- [ ] No empty states on your core feature screens
- [ ] Numbers look plausible for the domain
- [ ] Charts and graphs show a trend, not a spike or flat line
- [ ] User profile / account page has real-looking info
- [ ] No `test`, `dummy`, `foo`, `bar`, `lorem` visible in the UI
- [ ] Timestamps don't all say "just now" or "2 seconds ago"
- [ ] Your golden-path account can complete a full demo flow without hitting an error

---

> **Last Check**
>
> Screenshot your app with demo data loaded. Show it to someone who hasn't seen the project.
> Ask: *"Does this look like a real product someone pays for?"*
>
> If the answer is hesitation — fix the data.

---

## Next

**Presentation Prep** → You have the product. Now build the story that wins.
