---
title: Roadmap
slug: roadmap
phase: Phase 6 Growth
mode: production
projectType: e-commerce
estimatedTime: 30-45 min
---

# Feature Flags & Velocity Engineering (Roadmap)

**Estimated Time:** 45 Minutes

A beginner looks at their Mixpanel funnel, realizes the checkout is broken on Safari, and immediately starts writing code in their `main` branch. They push the code to Vercel, cross their fingers, and hope it works.

If you do this in a production environment with a team of 3 developers, you will constantly overwrite each other's code. You will deploy half-finished features to the public. The application architecture will become a chaotic, unmanageable mess.

In Phase 6, you must engineer a mathematical **Velocity Pipeline**. You must integrate an Issue Tracker (Linear), enforce **Trunk-Based Development**, and utilize **Feature Flags (LaunchDarkly/Vercel Edge Config)**.

---

## 1. Feature Flags (Decoupling Deployment from Release)

A beginner thinks that "Deploying code" and "Releasing a feature" are the same thing. They are not.

If you are building a massive new "Subscription Portal" that takes 4 weeks to build, you should not keep that code in a hidden branch for 4 weeks. (This causes "Merge Hell" when you finally try to merge it). 

**The Production Solution:**
You merge incomplete code into `main` every single day, but you wrap it in a **Feature Flag**.

```tsx
// app/account/page.tsx
import { getFeatureFlag } from '@/lib/flags';
import { OldAccountPortal } from '@/components/OldAccountPortal';
import { NewSubscriptionPortal } from '@/components/NewSubscriptionPortal';

export default async function AccountPage() {
  const session = await getServerSession();
  
  // 1. Fetch the flag mathematically from Vercel Edge Config / LaunchDarkly
  const isNewPortalEnabled = await getFeatureFlag('enable_new_sub_portal', session.user.id);

  return (
    <main>
      {/* 2. The code is safely hidden in production, even though it is fully deployed */}
      {isNewPortalEnabled ? <NewSubscriptionPortal /> : <OldAccountPortal />}
    </main>
  );
}
```

The code is physically deployed on Vercel, but no customer can see it because the boolean is `false`. 
You can log into LaunchDarkly, set the flag to `true` *only for your Admin email address*, and test the feature live in production. Once you verify it works, you click a button to roll it out to 10% of users, then 100%.

## 2. Trunk-Based Development

Because Feature Flags protect the live site, your engineering team must adopt **Trunk-Based Development**.

1. Create a branch (`feature/sub-portal`).
2. Write 50 lines of code.
3. Open a Pull Request (PR) on GitHub.
4. Review and merge into `main` **the exact same day**.

You mathematically prevent Merge Conflicts because branches never diverge from `main` for more than 24 hours.

## 3. Issue Tracking & Prioritization (Linear)

You cannot manage a production roadmap in a random Apple Note or Google Doc.

**The Production Solution:**
You must use a strict issue tracker like **Linear** or **Jira**.

Every feature on your roadmap must be mathematically prioritized using the **ICE Score** (Impact, Confidence, Ease).
- **Impact (1-10):** Will this feature increase conversion rate by 10% or 0.1%?
- **Confidence (1-10):** How sure are we that customers actually want this?
- **Ease (1-10):** Will this take 1 day to code, or 1 month to code?

If a feature has an Impact of 9, Confidence of 8, and Ease of 2 (hard), the score is `9 * 8 * 2 = 144`.
If a feature has an Impact of 5, Confidence of 9, and Ease of 8 (easy), the score is `5 * 9 * 8 = 360`.

You mathematically build the 360 feature first, even if the 144 feature sounds "cooler."

---

## ✅ Roadmap Engineering Checklist

- [ ] Integrate an Issue Tracker (Linear) and enforce strict ICE scoring to mathematically prioritize engineering resources.
- [ ] Enforce Trunk-Based Development. All branches must be merged into `main` within 48 hours to prevent catastrophic merge conflicts.
- [ ] Decouple Deployments from Releases by integrating Feature Flags (LaunchDarkly or Vercel Edge Config) to safely hide incomplete code in production.
- [ ] Use the AI prompt below to generate the rigorous Feature Flag architecture.

---

## AI Prompt — Engineer Feature Flags

Copy this prompt into your AI to have it generate the mathematical rollout architecture.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal DevOps Engineer. We are engineering our Feature Flag architecture using Vercel Edge Config (or LaunchDarkly).

I need you to generate the following strict architectural implementations:

**1. The Edge Feature Flag Utility:**
Write a TypeScript utility function (`lib/flags.ts`).
- Show how to import `@vercel/edge-config` and read a boolean flag.
- Ensure this function executes in exactly ~1ms by reading from the Vercel Edge cache, so checking feature flags does not slow down our Server Components.

**2. The Safe React Rollout Component:**
Write a Server Component (`<CheckoutLayout />`).
- Call the feature flag utility to check the `enable_stripe_elements` flag.
- If true, render the new `<NewStripeCheckout />` component.
- If false, render the `<LegacyCheckout />` component.
- Explain in a Markdown comment why Trunk-Based Development relies on these ternary operators to safely merge incomplete code into the `main` branch multiple times a day without breaking the live store.
````

**Next: Conversion Rate Optimization (CRO) Engineering →**
