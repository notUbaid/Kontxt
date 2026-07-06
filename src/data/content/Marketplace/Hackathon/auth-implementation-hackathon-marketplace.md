---
title: Auth Implementation
slug: auth-implementation
phase: Phase 3
mode: hackathon
projectType: marketplace
estimatedTime: 20-25 min
filename: auth-implementation-hackathon-marketplace.md
---

# Auth Implementation

Authentication covered the decision. This module is execution — turning that decision into working code as fast as possible, so you can move on to the parts of your build that actually need the most hours: the core loop itself.

---

## Before You Start: Confirm Your Decision

This module branches based on what you chose in the Authentication module. Don't skip that confirmation step — implementing the wrong path wastes exactly the time this whole phase is trying to save.

| Your decision | Jump to |
|---|---|
| Role switcher, no real auth | Path A |
| Mock login (fake session) | Path B |
| Real auth via managed provider | Path C |

---

## Path A: Role Switcher

This is the fastest path and the right default for most marketplace concepts.

**Implementation pattern:**

```javascript
// Simple client-side state, no backend auth required
const [currentRole, setCurrentRole] = useState('buyer');
const [currentUser, setCurrentUser] = useState(SEEDED_USERS.buyer); // from your seed data

// UI: a visible toggle, always present
<RoleSwitcher
  current={currentRole}
  onSwitch={(role) => {
    setCurrentRole(role);
    setCurrentUser(SEEDED_USERS[role]);
  }}
/>
```

**Steps:**
1. Pick 2-3 seeded identities per role from your Demo Marketplace Data (a named buyer, a named seller) rather than generic "User"
2. Store current role/user in top-level app state (React context, or your framework's equivalent) so any component can read it
3. Build the switcher UI once, place it somewhere persistently visible (header/nav)
4. Gate buyer-only and seller-only screens by checking `currentRole`, not by real route protection

> **Best Practice:** Persist the selected role in `localStorage` or a cookie, not just in-memory state. If your demo involves a page refresh at any point, losing the selected role mid-demo looks like a bug even though it's just unpersisted client state.

---

## Path B: Mock Login

Use this if you want a login screen to appear in your demo (for narrative reasons) without building real backend auth.

**Implementation pattern:**

```javascript
// "Login" just creates a fake session, no real verification
function handleMockLogin(email) {
  const fakeSession = {
    id: generateId(),
    email,
    role: 'buyer', // or determined by which seeded account matches
    createdAt: Date.now()
  };
  setSession(fakeSession);
  // Optionally persist to localStorage so refresh doesn't log out
  localStorage.setItem('session', JSON.stringify(fakeSession));
}
```

**Steps:**
1. Build a login form UI that looks complete (email field, maybe a password field that's never actually checked)
2. On submit, create a fake session object client-side — no password verification, no backend call needed
3. Persist the session to `localStorage` so it survives a refresh
4. Still include a role switcher (Path A's pattern) on top of this, since most marketplace demos need to show both sides regardless of login state

> **Warning:** Don't let a mock login become more elaborate than it needs to be. If you find yourself adding "password strength" validation or "forgot password" links to something that doesn't check passwords at all, you've drifted into building theater nobody asked for. Keep the form simple and move on.

---

## Path C: Real Auth via Managed Provider

Use this only if your concept genuinely needs persistent, verified identity across sessions.

**Recommended: Supabase Auth (pairs naturally with Supabase Postgres from Tech Stack)**

```javascript
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Sign up
await supabase.auth.signUp({ email, password });

// Sign in
await supabase.auth.signInWithPassword({ email, password });

// Get current session
const { data: { session } } = await supabase.auth.getSession();
```

**Steps:**
1. Create a Supabase project (or your chosen provider), grab the API keys
2. Implement sign-up and sign-in using the provider's SDK directly — don't hand-write password handling
3. Store the user's role (buyer/seller, or dual-role flag) in your own `users` table, linked to the provider's user ID — auth providers handle identity, not your app-specific role logic
4. Skip password reset, email verification, and MFA entirely — confirmed out of scope back in the Authentication module

> **Common Mistake:** Spending time customizing the provider's default auth UI to match your brand pixel-perfectly. Function over form here — a slightly generic-looking login screen that works reliably beats a beautifully branded one that introduces bugs under time pressure.

---

## Marketplace-Specific: Connecting Role to Views

Regardless of path, the actual payoff is the same: your app needs to render different UI based on current role.

```javascript
// Pattern used identically across all three paths
function App() {
  const { currentRole } = useAuthContext(); // however you've implemented it

  return currentRole === 'seller'
    ? <SellerDashboard />
    : <BuyerExperience />;
}
```

> **Tip:** Don't build separate route protection (redirects, guards) unless your demo genuinely requires hiding seller screens from buyers for narrative reasons. In most hackathon marketplaces, simply rendering different UI based on role is sufficient — you don't need real authorization logic for a demo only your team controls.

---

## Testing Your Implementation

Run this exact test before considering auth "done," regardless of which path you took:

1. Set role/login to buyer, refresh the page — does it stay buyer, or reset?
2. Switch to seller, refresh — does it stay seller?
3. If using Path C, sign out and sign back in — does your app correctly restore the right role from your database, not just the auth provider's session?

> **Warning:** The single most common live-demo auth failure is a role or session that silently resets on refresh, because state was never persisted. Test this specific scenario explicitly — it's easy to miss during development because you rarely refresh while actively coding.

---

## Using AI Effectively Here

Use AI to implement your specific chosen path quickly and correctly, including the persistence behavior that's easy to overlook.

** Copy this prompt:**

```
I'm implementing auth for a hackathon marketplace.

Decision: [role switcher / mock login / real auth via Supabase or other provider]
Stack: [your actual stack from Tech Stack]
Roles needed: buyer and seller, [single account dual-role / separate accounts — your decision from Authentication]

Implement this, including:
1. The core mechanism for my chosen path
2. Persistence so the selected role/session survives a page refresh
3. A simple way to render different UI/screens based on current role
4. If real auth: store role in my own users table linked to the provider's user ID, not relying on the provider for app-specific role logic

Keep it minimal — no password reset, email verification, or MFA. Flag anything I'm asking for that adds unnecessary complexity for a hackathon demo.
```

---

## Validating the Output

- Does the selected role/session survive a page refresh?
- Can you switch between buyer and seller views cleanly, without errors or flicker?
- If real auth was used, is role/profile data stored in your own table, not assumed from the provider alone?
- Have you confirmed no password reset, email verification, or MFA was built?
- Did this take less time than your core loop implementation? If not, reconsider scope.

---

## Before You Continue

- Chosen auth path implemented and matches the Authentication module's decision exactly
- Role/session persists across a page refresh — explicitly tested
- Buyer and seller views render correctly based on current role
- No unnecessary auth features (password reset, MFA, email verification) built

**Next up:** Database — implementing the schema sketched out in Architecture Fundamentals.
