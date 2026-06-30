---
title: User Flows
slug: user-flows
phase: Phase 1
mode: personal
projectType: marketplace
estimatedTime: 25-30 min
filename: user-flows-personal-marketplace.md
---

# User Flows

Your PRD describes the core loop in a paragraph. User flows break that paragraph into the actual screen-by-screen path each side takes — every decision point, every place they could get confused or drop off. This is where Phase 1 starts getting concrete enough that Wireframes (next module) has something specific to draw.

Skip this and jump straight to wireframes, and you'll end up designing individual screens without knowing how they connect — a common reason solo-built UIs feel disjointed even when each screen looks fine alone.

---

## Why Flows Come Before Wireframes

A wireframe answers "what does this screen look like." A flow answers "what screen comes next, and why." Getting the second question right first means your wireframes have a clear job each — you're not guessing what a screen needs to contain because you already know what decision it's helping someone make.

> **Decision:** Don't open a design tool yet. Flows are sequences and decision points — a numbered list or simple diagram is enough, and faster to revise than a wireframe.

---

## Map One Flow Per Core Action

From your MVP Scope, you have a small set of core actions. Each gets its own flow. For most marketplace MVPs, that's:

1. **Seller: Create a listing**
2. **Buyer: Discover and view a listing**
3. **Buyer → Seller: Initiate contact / message**
4. **Either: Sign up / log in** (usually shared, referenced by the other flows rather than redrawn each time)

> **Tip:** Don't try to map every possible path (what if they search with zero results, what if they're not logged in yet). Map the happy path first — the flow where everything goes right. Edge cases get handled in the Empty States and Error States modules later in this phase.

---

## Flow Format That's Fast to Write and Easy to Revise

Numbered steps with the screen and the decision being made at each step. No tool required — plain text is enough at this stage.

```markdown
## Flow: Seller Creates a Listing

1. [Screen: Dashboard] Seller clicks "New Listing"
2. [Screen: Listing Form] Seller fills title, description, price,
   category, uploads one image
3. [Decision] Form validates — if invalid, show inline errors,
   stay on form
4. [Screen: Listing Form, submitted] Listing saves, seller redirected
   to listing detail page
5. [Screen: Listing Detail] Seller sees their own listing as buyers
   would see it, with an "Edit" option visible only to them
```

Five steps, plain language, no ambiguity about what happens next. This is detailed enough to wireframe directly from.

---

## What to Capture at Each Step

For every step in a flow, note three things — this is what prevents a flow from being too vague to design from:

- **What screen are they on**
- **What can they do here** (the actions available)
- **What happens next**, including what happens if something goes wrong

> **Decision:** If you can't answer "what happens next" for a step, that's a gap in your thinking, not a detail to leave for later. Resolve it now — it's far cheaper to resolve in a text flow than after you've built the screen.

---

## The Buyer Discovery Flow Deserves Special Attention

This is usually the flow most likely to have unclear branching, because "discover" can mean several different paths (search, browse by category, land on a specific listing from a shared link). Map at least the primary path explicitly, and note the others even briefly.

```markdown
## Flow: Buyer Discovers and Contacts a Seller

1. [Screen: Home/Browse] Buyer sees listing grid, can search or filter by category
2. [Screen: Browse, filtered] Buyer applies a category filter or search term
3. [Screen: Listing Detail] Buyer clicks a listing, sees full details, photos, seller info
4. [Decision] Buyer wants to contact seller → clicks "Message Seller"
5. [Screen: Message Thread] Buyer types and sends first message
6. [Decision] Buyer not logged in yet → redirect to login/signup,
   return to message thread after, message draft preserved
```

> **Warning:** Step 6 is the kind of detail that's easy to skip in a flow and expensive to discover missing during development — what happens to a buyer's typed message if they're not logged in yet? Decide now, not mid-build.

---

## Connecting Flows to Each Other

Flows aren't fully isolated — note where one flow hands off to another, so you can see the whole product as connected, not as separate fragments.

```
Sign Up/Login Flow ──┬──> Seller Creates Listing Flow
                      └──> Buyer Discovery Flow ──> Contact Seller Flow
```

This simple connection map is often more useful at this stage than a polished diagram — it shows you, at a glance, whether your core loop actually connects end to end.

---

## AI Prompts You Can Use

**Prompt 1 — Draft flows from your PRD:**

```
Here's my marketplace PRD: [paste it]. Write detailed user flows for
these core actions: [list from your MVP Scope, e.g. "create listing,"
"discover and contact seller," "sign up/login"]. Use this format: numbered
steps, each with screen, available actions, and what happens next.
Happy path only — don't cover edge cases yet.
```

**Prompt 2 — Find missing decision points:**

```
Here's my user flow: [paste one flow]. Are there any steps where what
happens next is ambiguous or undecided? Flag each one specifically —
don't just tell me to "handle edge cases," point to the exact step
where a decision is missing.
```

---

## Validating What AI Generates

- [ ] **Walk through every flow yourself, step by step, imagining you're the user** — this catches gaps faster than re-reading text, since acting it out exposes "wait, what happens here" moments AI-generated text can gloss over
- [ ] **Confirm flows reference only features in your MVP Scope** — AI sometimes adds steps for features (save for later, share listing, related items) that aren't actually in scope yet
- [ ] **Check that flagged ambiguous steps actually get resolved**, not just listed — a flagged gap with no decision attached is still a gap

---

## Implementation Checklist

- [ ] Flow written for each core action from MVP Scope (typically: create listing, discover/browse, contact seller, sign up/login)
- [ ] Every step specifies screen, available actions, and what happens next
- [ ] At least one "what if they're not logged in" or similar branching case resolved per flow
- [ ] Simple connection map shows how flows link into the full core loop
- [ ] Personally walked through each flow as if you were the user, start to finish

---

## What's Next

Next: **Wireframes** — turning these flows into low-fidelity screen layouts, one wireframe per screen identified in your flows.
