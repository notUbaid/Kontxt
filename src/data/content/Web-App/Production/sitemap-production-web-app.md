---
title: Sitemap
slug: sitemap
phase: Phase 1
mode: production
projectType: web-app
estimatedTime: 15–20 min
---

# Sitemap

A sitemap is not an SEO artifact. It is a decision about what your product is.

Every route you define is a commitment. It has to be built, secured, maintained, and kept consistent with the rest of the app. Defining your sitemap before you write a single route forces clarity about scope, access control, and navigation structure — the decisions that are painful to undo later.

---

## What a Sitemap Actually Defines

When you map your routes, you are simultaneously deciding:

- **What pages exist** — and implicitly, what pages don't
- **Who can access each page** — public, authenticated, role-gated
- **What the URL structure communicates** — flat vs. hierarchical, IDs vs. slugs
- **Where navigation lives** — what goes in the sidebar, the header, a dropdown
- **What the MVP actually is** — if it's not on the sitemap, it's not in scope

Do this before building. Changing URL structures after launch breaks links, breaks SEO, and requires redirects.

---

## Route Access Levels

Every route falls into one of these categories. Label them explicitly.

| Access Level | Description | Examples |
|---|---|---|
| **Public** | Anyone can visit, no auth required | Landing page, pricing, blog, login, signup |
| **Authenticated** | Must be signed in | Dashboard, settings, profile |
| **Role-gated** | Must be signed in AND have specific role | Admin panel, billing, team management |
| **Owner-gated** | Must own the specific resource | Edit my project (not someone else's) |

Define these now. Implementing auth guards is mechanical once you know what needs protecting. Discovering a page was left unprotected after launch is a security incident.

---

## URL Structure Principles

### Flat vs. Hierarchical

```
Flat:        /projects     /settings     /billing
Hierarchical: /projects/:id/tasks/:taskId/comments
```

Flat is easier to build and navigate. Hierarchical reflects data relationships but adds routing complexity.

**Use hierarchical routes when:** the child resource only makes sense in the context of the parent (a task belongs to a project, a comment belongs to a task).

**Use flat routes when:** the resource can stand alone or is accessed from multiple contexts.

### IDs vs. Slugs

| `/projects/a1b2c3d4` | `/projects/my-project-name` |
|---|---|
| Stable — survives renames | Human-readable — better for sharing |
| Harder to debug | Requires uniqueness enforcement |
| No DB lookup needed | Requires slug generation + collision handling |

For user-generated content that users share: **slugs**.
For internal resources users navigate within the app: **IDs** are fine.

### Avoid Encoding State in URLs Unless Intentional

```
/dashboard?tab=analytics&filter=last30days
```

If a user bookmarks or shares this URL, they expect to land in that state. If you're managing tab state in component state instead, the URL won't reflect it. Decide early: is this state shareable? If yes, put it in the URL. If no, keep it in component state.

---

## Sitemap Template

Use this structure as a starting point. Delete what doesn't apply. Add what's missing.

```
PUBLIC
├── /                        Landing page
├── /pricing                 Pricing page
├── /login                   Login
├── /signup                  Signup
├── /forgot-password         Password reset request
├── /reset-password          Password reset (token in query param)
└── /[slug]                  Public content (blog, docs, etc.)

AUTHENTICATED
├── /dashboard               Main app entry point
├── /onboarding              First-run setup (redirect new users here)
│
├── /[resource]              Primary resource list (e.g. /projects)
│   └── /[resource]/:id      Resource detail
│       └── /[resource]/:id/edit   Edit view (or modal — decide now)
│
├── /settings                Settings root
│   ├── /settings/profile    Profile settings
│   ├── /settings/account    Account settings (email, password)
│   ├── /settings/billing    Billing & subscription
│   └── /settings/team       Team / members (if applicable)
│
└── /notifications           Notifications center

ROLE-GATED
└── /admin                   Admin panel (if applicable)
    ├── /admin/users         User management
    └── /admin/analytics     Platform analytics

SYSTEM
├── /404                     Not found
├── /500                     Server error
└── /maintenance             Maintenance mode (optional)
```

---

## Common Structural Mistakes

**No onboarding route**
New users land on an empty dashboard with no guidance. Add `/onboarding` and redirect first-time users there automatically.

**Settings buried or missing**
If a user can't find where to change their email or cancel their subscription, they'll contact support or churn. Settings must be one click from anywhere.

**Edit and detail are the same route**
Some apps show edit in a modal, others in a separate `/edit` route. Either is fine — decide once and be consistent. Mixing both is confusing.

**Admin accessible from the main nav**
Admin routes should be completely separate. Don't put admin links in the user-facing sidebar. Gate the entire `/admin` subtree at the layout level.

**No error routes**
A 404 that shows a blank page or a framework default error screen looks broken. Build `/404` and `/500` as real pages in your design system.

---

## Redirect Logic

Define redirect rules before implementing auth:

| Scenario | Redirect to |
|---|---|
| Unauthenticated user visits protected route | `/login?redirect=/original-path` |
| Authenticated user visits `/login` or `/signup` | `/dashboard` |
| New user completes signup | `/onboarding` |
| User completes onboarding | `/dashboard` |
| Any unknown route | `/404` |

The `?redirect=` pattern preserves the user's intent. After login, send them where they were trying to go. This is table stakes for production apps.

---

## Implementation Checklist

- [ ] Every route has a defined access level (public / authenticated / role-gated / owner-gated)
- [ ] URL structure is decided — flat vs. hierarchical, IDs vs. slugs
- [ ] An `/onboarding` route exists for first-time users
- [ ] Settings are reachable in one click from any authenticated page
- [ ] Auth redirect logic is defined (including `?redirect=` preservation)
- [ ] `/404` and `/500` are designed as real pages
- [ ] Admin routes are in a separate subtree, not mixed into the main nav
- [ ] No route exists that hasn't been scoped into the MVP or explicitly deferred

---

## AI Prompt — Sitemap Generation

Use this to generate a first-draft sitemap from your idea:

```prompt
You are a Staff Engineer helping define the URL structure and route map for a new web application.

My app: [describe your app in 2–3 sentences]
Target users: [who uses this]
Core features in MVP: [list 4–6 features]

Generate a sitemap with the following for each route:
- URL path (with dynamic segments using :param notation)
- Page name
- Access level: public / authenticated / role-gated / owner-gated
- One-line description of what the page does
- Whether it's in MVP scope or deferred

Structure it as a hierarchical list grouped by access level.

Flag any routes where the access level is ambiguous or where I may have missed a necessary system route (404, password reset, onboarding, etc.).
```

---

## From Sitemap to Router

Once your sitemap is finalized, your router configuration is mechanical. Each route maps directly to:

1. A layout (public layout vs. app layout vs. admin layout)
2. An auth guard (none / require auth / require role)
3. A page component

Define your layout hierarchy first. Routes inherit their guard from the layout they're nested under. This means you implement auth protection once per layout, not once per route.

The sitemap is the input. The router is the output. Get the sitemap right and the router writes itself.
