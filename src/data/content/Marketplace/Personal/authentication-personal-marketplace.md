---
title: Authentication
slug: authentication
phase: Phase 2
mode: personal
projectType: marketplace
estimatedTime: 20–25 min
---

# Authentication

## Why Marketplace Auth Isn't Generic Auth

Most auth tutorials cover login and signup. A marketplace needs more than that on day one, because the moment someone logs in, you have to know *which kind of user they are* — a buyer browsing, a seller managing listings, or someone who's both. That distinction touches everything downstream: what they see, what they can do, and what data they can access.

Get the user model wrong here and you'll be retrofitting role logic into every feature you build for the rest of the project. This module gets it right once, early, while the cost of fixing it is still low.

---

## The Core Decision: Single Role or Dual Role?

This is the first real architecture decision of Phase 2, and it shapes your database schema before you write a single table.

| Model | How It Works | Fits When |
|---|---|---|
| **Single account, dual role** | One user account, a flag or relation marking "can sell" | Most peer-to-peer marketplaces — same person often buys and sells |
| **Separate buyer/seller accounts** | Two distinct account types, no overlap | Marketplaces where buyers and sellers are genuinely different populations (e.g. B2B supply vs. retail buyers) |

> ✅ **Best practice for personal mode:** Default to single account, dual role, unless your niche has a clear reason buyers and sellers are different people entirely. It's simpler to build, simpler to reason about, and matches how most peer-to-peer marketplaces actually behave — someone selling today may want to buy tomorrow.

---

## Don't Hand-Roll This

> ⚠️ Building your own password hashing, session management, and token refresh logic is one of the most common ways solo builders introduce a critical security flaw into an otherwise solid project. Auth bugs aren't like UI bugs — they're invisible until someone exploits them. Use a managed auth provider. This isn't a "best practices" suggestion, it's a hard rule for a project without a dedicated security review.

| You Build Custom Auth | You Use Managed Auth |
|---|---|
| You own every security vulnerability in password storage, session handling, token expiry | The provider owns it, and it's their core product |
| Time spent here is time not spent on your actual marketplace features | Setup takes hours, not weeks |
| Mistakes are invisible until exploited | Battle-tested by far more usage than your project will ever get |

---

## What Your User Model Needs From Day One

Regardless of single- or dual-role, your user record needs to support the trust mechanisms you designed in Phase 1. Build these fields now, not as an afterthought.

- [ ] Unique identity (email or phone, verified)
- [ ] Profile completeness fields (the ones your Buyer Journey module identified as minimum credibility signals)
- [ ] A role/permission marker (buyer, seller, or both — per your decision above)
- [ ] Account status (active, suspended, banned — needed for your Trust & Safety enforcement ladder)
- [ ] Created/joined date (you used "join date" as a trust signal in Phase 1 — make sure it's captured)

> 💡 **Tip:** Account status as a first-class field, not an afterthought, is what makes your Trust & Safety enforcement ladder ("warning → listing removal → ban") actually executable. If banning someone means manually deleting their account, you've made enforcement painful enough that you'll avoid doing it.

---

## Social Login: Useful Friction Reducer, Not Required

Social login (Google, etc.) reduces signup friction, which matters for the cold-start problem from your Seller Journey module — every extra step risks losing an early seller you personally recruited.

| Approach | Trade-off |
|---|---|
| Email/password only | Simple to implement, but adds friction at the exact moment you can least afford to lose a sign-up |
| Email/password + one social provider | Slightly more setup, meaningfully lower signup friction |
| Multiple social providers | Diminishing returns at personal-mode scale — pick one well-known provider, not three |

> ✅ Add one social login option if your managed auth provider makes it nearly free to add (most do). Don't treat it as a v2 feature — friction reduction matters most when you have the fewest users to lose.

---

## Email Verification: Required, Not Optional

Given your Trust & Safety module identified email/phone confirmation as baseline hygiene against bots and throwaway accounts, this isn't a nice-to-have — it's the cheapest fraud prevention mechanism available to you. Require verified email before a user can list an item or message another user. Browsing can stay open to unverified accounts; transacting should not.

---

## AI Prompt: Designing Your Auth + User Model

```
I'm building a personal-scale marketplace for [your niche] using
[your chosen managed auth provider] on [your chosen stack].

Role model: [single account dual-role / separate buyer-seller accounts]
Trust signals needed on profile (from earlier planning): [list them]
Account statuses needed for moderation: [active/suspended/banned, etc.]

Generate:
1. A user schema (fields + types) that supports this role model and
   captures the trust signals listed above
2. The minimum auth flow (signup, login, email verification) using
   [your auth provider] — don't include features I haven't asked for
3. A short explanation of where role/permission checks need to happen
   later (which I'll implement fully in the Authorization module)

Keep this scoped to what a solo developer needs to ship, not an
enterprise auth system.
```

---

## Common Mistake: Designing Roles You Don't Need Yet

> ⚠️ It's tempting to add an "admin" role, a "moderator" role, and granular permissions now because "production" marketplaces have them. At personal-mode scale, you are the admin and the moderator — there's no one else to assign that role to. Add a real admin role when you have a second person who needs one, not before. Over-modeling roles now adds complexity to every query you write for the rest of the build.

---

## What You Should Walk Away With

1. A decided role model: single account dual-role, or separate account types
2. A user schema that captures identity, role, trust signals, and account status
3. A managed auth provider chosen and integrated
4. Email verification required before listing or messaging

This user model is now the foundation for Authorization (next module), where you'll define exactly what each role is allowed to do — and for every feature built in Phase 3, which will all check against the fields you've defined here.
