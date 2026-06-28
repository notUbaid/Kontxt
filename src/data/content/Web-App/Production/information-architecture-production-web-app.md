---
title: Information Architecture
slug: information-architecture
phase: Phase 1
mode: production
projectType: web-app
estimatedTime: 35–45 min
---

# Information Architecture

Information architecture (IA) is the structural design of your product — how content is organised, labelled, and navigated. It answers the question users ask constantly but never voice: *where do I find what I need?*

Bad IA produces user confusion that no amount of good visual design can fix. When users can't find something, they don't think "I need to look harder." They think "this product is broken."

---

## What IA Defines

| Element | Question It Answers |
|---|---|
| **Content inventory** | What exists in the product? |
| **Hierarchy** | How is it grouped and nested? |
| **Navigation model** | How do users move between sections? |
| **Labelling** | What are things called? |
| **URL structure** | How is the hierarchy expressed in routes? |
| **Access model** | Who can see what? |

All six must be consistent with each other and with your user flows.

---

## Step 1 — Content Inventory

List every distinct screen, section, or content type in your product. Don't design them yet — just name them.

```
Example for a project management tool:

Content types:
- Projects (list, detail)
- Tasks (list, detail, subtasks)
- Comments
- Attachments
- Team members
- Notifications
- User profile
- Organisation settings
- Billing
- Integrations
- Activity log
```

Group related items. Notice what naturally clusters. These clusters become your navigation sections.

---

## Step 2 — Establish the Hierarchy

Organise your content inventory into a tree. Every item has one parent. Depth beyond three levels is a warning sign.

```
Good (max 3 levels):
Dashboard
├── Projects
│   ├── Project Detail
│   │   ├── Tasks
│   │   └── Files
│   └── New Project
├── Team
└── Settings
    ├── Profile
    ├── Notifications
    └── Billing

Bad (too deep):
Settings → Account → Security → Two-Factor → Recovery Codes
```

If you find yourself going four levels deep, the content at that level is probably a detail view, a modal, or a section within a page — not a distinct navigation destination.

> [!WARNING]
> Every level of navigation depth adds cognitive load and reduces discoverability. If a user has to click four times to find a core feature, your IA has a problem.

---

## Step 3 — Choose a Navigation Model

The right navigation pattern depends on your content volume, usage patterns, and primary device.

| Pattern | Best For | Example |
|---|---|---|
| **Sidebar** | Many sections, frequent switching, desktop-first | Linear, Notion, Figma |
| **Top nav** | Few sections, content-focused, marketing-adjacent | GitHub, Stripe Dashboard |
| **Bottom tab bar** | Mobile-first, 3–5 primary destinations | Mobile apps |
| **Hybrid** | Sidebar for app, top nav for marketing/settings | Vercel, Supabase |
| **Breadcrumb only** | Deep hierarchies with clear parent paths | Docs, e-commerce |

**For a production web app with a meaningful feature set:** A persistent sidebar for primary navigation combined with in-page secondary navigation is the most maintainable and user-friendly pattern.

Decide your model before wireframing. Changing navigation patterns mid-design is a full redesign.

---

## Step 4 — Define Your URL Structure

URLs are part of your IA. They must:
- Reflect the content hierarchy
- Be human-readable and memorable
- Be stable — changing URLs breaks bookmarks, backlinks, and user muscle memory
- Follow consistent conventions

```
Pattern: /[primary section]/[identifier]/[subsection]

Examples for a project management app:

/dashboard                          → home
/projects                           → projects list
/projects/[slug]                    → project detail
/projects/[slug]/tasks              → task list within project
/projects/[slug]/tasks/[id]         → task detail
/projects/new                       → create project
/settings                           → settings root
/settings/profile                   → profile settings
/settings/billing                   → billing settings
/settings/team                      → team management
```

**URL conventions to establish now:**

```
IDs vs slugs:
/posts/abc123def       → ID (opaque, stable)
/posts/my-post-title   → slug (readable, can change if title changes)

Recommendation: Use slugs for user-facing content,
IDs for internal/admin references.

Nesting limit: max 3 path segments for navigable routes
/projects/[id]/tasks/[id]     (2 IDs, readable)
/org/[id]/project/[id]/task/[id]/comment/[id]     (too deep)
```

---

## Step 5 — Labelling

Labels are the words you use for navigation items, section headings, buttons, and entity names. Inconsistent labelling is a silent UX killer.

**Establish your terminology now and use it everywhere:**

```
Entity glossary for [your product]:

Primary entity: [what you call the main thing users create]
  → In nav: [label]
  → In URLs: /[slug]/
  → In empty state: "No [entities] yet"
  → In CTA: "New [entity]" / "Create [entity]"

Action vocabulary:
  Create: "New [entity]" or "Create [entity]" — pick one, use it everywhere
  Edit: "Edit" — not "Modify", not "Update", not "Change"
  Delete: "Delete" — not "Remove" (for permanent) / "Remove" for associations
  Save: "Save" for explicit save / "Saved automatically" for autosave

Status labels:
  [Status A]: [label]
  [Status B]: [label]
```

> [!TIP]
> Use the exact language your target users use — from your user interviews, their support tickets, how they describe their own work. If your users call them "projects" and your product calls them "workspaces," there is a labelling mismatch that creates friction at every touchpoint.

---

## Step 6 — Access Model

Define which parts of the IA are visible to which users. This has direct database and routing implications.

```
| Route / Section | Unauthenticated | Free User | Pro User | Admin |
|---|---|---|---|---|
| Landing page |  |  |  |  |
| Dashboard | Redirect to /login |  |  |  |
| [Core feature] | Redirect to /login |  |  |  |
| [Pro feature] | Redirect to /login | Upgrade prompt |  |  |
| Settings/Billing | Redirect to /login |  |  |  |
| Admin panel |  |  |  |  |
```

Every row in this table is a middleware rule and a UI decision. Map it completely so your routing and auth middleware can be implemented without guesswork.

---

## The IA Document

Output of this module: a structured IA specification.

```
## Information Architecture — [Product Name]

### Navigation Model
[Chosen pattern and rationale]

### Content Hierarchy
[Full tree — every navigable destination]

### URL Structure
[Complete route map with patterns]

### Entity Glossary
[Every entity name, action verb, and status label]

### Access Model
[Route × role access table]

### Navigation Items
Primary nav (always visible):
- [Label] → /[route] — [access: authenticated / all]

Secondary nav (contextual):
- [Label] → /[route] — [when shown]

User nav (account menu):
- [Label] → /[route]
- Sign out
```

---

## Prompt: Generate Your IA

```
Copy Prompt
```

```
I'm building a production web app. Generate a complete information architecture 
based on the following:

Product: [1–2 sentence description]
Primary user: [description]
Core features (from PRD): [list]
Monetization: [free / pro tiers, what's gated]
User roles: [e.g. individual user only / user + admin / multi-tenant with roles]

Generate:

1. Content inventory — every distinct screen and content type
2. Content hierarchy — a full tree with max 3 levels of depth
3. URL structure — complete route map following /section/[id]/subsection pattern
4. Navigation model recommendation with rationale
5. Primary navigation items (max 6) with labels and routes
6. Entity glossary — what the primary entities are called and what 
   action verbs apply to them
7. Access model table — routes × roles showing who can access what

Flag any IA decision that has a direct implication for the database schema 
or routing middleware.
```

---

## Validating Your IA

Run these tests before moving to wireframes.

**The 3-click test:** Can a user reach any Core feature in 3 clicks or fewer from the dashboard? If not, restructure the hierarchy.

**The labelling test:** Show your navigation labels to someone unfamiliar with the product. Can they predict what they'll find under each label? Unpredictable labels mean the labelling is wrong, not the user.

**The new user test:** Where does a brand-new user land after sign-up? Is the path to the core value moment clear from there, with no dead ends?

**The power user test:** Can a frequent user navigate using keyboard shortcuts or direct URLs? Does your URL structure make direct navigation possible?

**The mobile test:** Does your navigation model work on a 375px screen? If you chose a sidebar, is there a collapsed mobile equivalent?

---

## IA Checklist

- [ ] Content inventory lists every screen and content type in v1
- [ ] Hierarchy has max 3 levels — no navigation destination requires more than 3 clicks
- [ ] URL structure defined with consistent patterns — IDs vs slugs decision made
- [ ] Navigation model chosen with device targets considered
- [ ] Primary nav has ≤ 6 items (more than 6 signals unclear prioritisation)
- [ ] Entity glossary established — all labels are consistent
- [ ] User-facing language matches what users actually say (from research)
- [ ] Access model table complete — every route × role combination defined
- [ ] 3-click test passed for all Core features
- [ ] Mobile navigation behaviour defined

---

## What Comes Next

**Wireframes** — translating your IA and user flows into low-fidelity screen layouts. With your hierarchy, navigation model, URL structure, and labelling established, wireframes become a filling-in exercise rather than a design-from-scratch challenge.

The IA is the skeleton. Wireframes add the shape.
