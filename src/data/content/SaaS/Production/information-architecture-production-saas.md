---
title: Information Architecture
slug: information-architecture
phase: Phase 1
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Information Architecture

Information Architecture (IA) is how you structure your product's navigation, routes, and data boundaries so both users and your codebase can find anything without guessing. For a production SaaS, three decisions made here will be expensive to reverse later: your **navigation model**, your **multi-tenant routing structure**, and your **permission boundaries**. Get these wrong and you'll be rewriting routes, breaking bookmarks, and patching authorization holes six months from now.

This module is not about visual design. Wireframes (next module) handle layout. IA handles *structure*.

---

## Decision 1: Navigation Model

> **Decision Card**
> **Choose one navigation pattern and use it everywhere.** Mixing patterns per-feature is the #1 reason SaaS apps feel inconsistent by month six.

| Pattern | Best for | Tradeoff |
|---|---|---|
| Persistent sidebar | Apps with 5+ top-level sections (most B2B SaaS) | Takes horizontal space; needs a collapse state for mobile |
| Top nav only | Simple apps with ≤4 sections | Doesn't scale past a handful of items without a dropdown mess |
| Sidebar + command palette (K) | Power-user tools, dense data apps | Extra implementation cost; high payoff for retention |

**Recommendation for production SaaS:** persistent collapsible sidebar for core navigation, top bar reserved for workspace switching, search, and account menu. This pattern (used by Linear, Notion, Stripe's dashboard) scales cleanly as you add features — new items become new sidebar entries, not new top-level redesigns.

> [!WARNING]
> If you find yourself redesigning navigation every time you ship a feature, your IA is reactive, not architected. Define the sidebar's top-level categories *before* you build, based on your MVP feature list — not after.

---

## Decision 2: Multi-Tenant Routing Structure

This is the decision most beginners skip — and the one that's hardest to change after launch.

| Approach | Example | SEO | Complexity | When to use |
|---|---|---|---|---|
| Subdomain-based | `acme.yourapp.com` | Good, distinct per-tenant | Needs wildcard SSL + DNS config | Enterprise feel, white-labeling later |
| Path-based | `yourapp.com/acme/dashboard` | Good | Low — works on any host | Most SaaS, fastest to ship |
| Session/header-based | `yourapp.com/dashboard` (tenant from session) | N/A — single domain | Lowest | Single-workspace-per-user apps only |

>  **Best Practice**
> Default to **path-based tenancy** unless you already know you need custom domains for enterprise customers. It's the cheapest to build, deploy, and test locally, and migrating to subdomains later is a routing change, not a rearchitecture — as long as you never hardcode tenant context anywhere outside your routing layer.

>  **Security Warning**
> Whatever structure you choose, **never use sequential integer IDs in tenant or resource URLs** (`/acme/invoices/204`). They invite enumeration attacks. Use UUIDs or ULIDs. And remember: URL structure is not an authorization boundary. `/acme/...` in the path does not stop a user from requesting `/beta/...` — your backend must verify tenant membership on every request regardless of what the URL implies.

---

## Decision 3: Resource Hierarchy

Map your IA to your actual data model, not your imagined feature list. A typical SaaS hierarchy:

```
Workspace
 └─ Project / Team (optional layer)
     └─ Core Resource (the thing your product is actually about)
         └─ Resource Detail
```

Keep this **three levels deep or fewer** in the nav. If you need a fourth level to reach a common action, that action probably deserves its own top-level shortcut.

---

## Decision 4: Settings Architecture

Beginners routinely collapse this into one "Settings" page. Production SaaS needs three separate scopes:

| Scope | Examples | Who can access |
|---|---|---|
| Account settings | Name, password, notification prefs | The individual user only |
| Workspace settings | Members, roles, integrations | Workspace admins |
| Billing settings | Plan, invoices, payment method | Workspace owner/billing role — never general members |

> [!WARNING]
> Billing access is a common privilege-escalation bug. If billing lives inside general "workspace settings," it's easy to accidentally grant it to every admin instead of just owners. Treat it as its own permission, not a sub-tab of admin settings.

---

## Decision 5: Admin & Internal Tooling

Keep your role-based admin panel in its **own isolated route namespace** (`/admin/*`), with its own layout and a single middleware gate — not interwoven into the customer-facing IA. This keeps the blast radius small if a permission check is ever missed, and makes a security audit a matter of reviewing one route tree instead of hunting through the whole app.

---

## Common AI Mistakes to Watch For

When you hand this to an AI tool, check the output against these failure patterns:

- **Ignores tenancy entirely** — proposes flat routes like `/dashboard`, `/projects` with no workspace scoping.
- **Misplaces billing** — nests it under general workspace settings instead of an owner-gated route.
- **Invents sequential IDs** in example routes (`/users/1`, `/users/2`) — flag and replace with UUIDs.
- **Scope creep into layout** — describing button placement or colors. That's not IA; redirect it.
- **Overengineering** — suggesting micro-frontends, federated routing, or multi-domain architecture for an MVP that doesn't need it yet.

---

## AI Prompt: Generate Your Route Map

Copy this once you've made the decisions above — don't paste your whole PRD, just the decisions and your MVP feature list.

```
I'm designing the information architecture for a production SaaS app.

Context:
- MVP features: [paste your MVP feature list]
- Tenancy model: [path-based / subdomain-based — state your choice]
- Navigation model: [sidebar / top-nav / hybrid — state your choice]

Generate a route map as a table with columns:
Route | Layout (customer / admin) | Auth requirement | Tenant-scoped (yes/no) | Permission needed

Rules:
- Do not invent features beyond the MVP list above.
- Use placeholder UUIDs in example routes, never sequential integers.
- Separate account settings, workspace settings, and billing into distinct routes with distinct permission requirements.
- Flag any route that requires more than 2 permission checks — I want to review those manually.
- Keep nav depth to 3 levels or fewer.
```

---

## Validate Before You Move On

- [ ] Every route maps to a real entity in your planned data model
- [ ] Tenancy is explicit in the routing structure, not assumed
- [ ] No sequential/guessable IDs anywhere in example routes
- [ ] Account, workspace, and billing settings are separate routes with separate permissions
- [ ] Admin routes live in an isolated namespace with one gate, not scattered checks
- [ ] No nav path is more than 3 clicks from the dashboard

> [!TIP]
> Save this route map as-is. You'll reuse it directly as context for **Backend Architecture**, **API Design**, and **Authorization & Roles** — no need to re-explain your structure to AI in those sessions.

---

**Next:** Wireframes — turn this structure into actual screens.
