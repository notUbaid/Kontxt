---
title: Wireframes
slug: wireframes
phase: Phase 1
mode: production
projectType: web-app
estimatedTime: 45–60 min
---

# Wireframes

A wireframe is a low-fidelity layout that answers one question per screen: **what exists here and where does it live?**

Not colour. Not typography. Not final copy. Not interactions. Just structure.

Wireframes exist to validate layout decisions cheaply — before design work, before engineering, before any investment that makes changes expensive. A wireframe change costs minutes. The same change after a component library is built costs days.

---

## What Wireframes Are Not

**Not a mockup.** Mockups have visual design — colour, type, spacing. Wireframes are intentionally unstyled. Styling at the wireframe stage wastes time on decisions that belong in the design system.

**Not a prototype.** Prototypes simulate interaction. Wireframes communicate structure. Clickable wireframes are useful for user testing but are not required before engineering begins.

**Not pixel-perfect.** Wireframes are schematic. Boxes represent components. Lines represent text. The purpose is layout and hierarchy, not precision.

---

## What to Wireframe

Wireframe every distinct screen in your IA. Priority order:

**Must wireframe before building:**
- Dashboard / home (the first screen authenticated users see)
- Every Core feature's primary view
- Onboarding flow (every step)
- Empty states for every Core feature
- Settings pages that affect feature behaviour

**Wireframe before shipping:**
- Error states for Core features
- Mobile views for every Core screen
- Any screen with complex conditional logic

**Can defer:**
- Admin-only screens
- Edge case screens that handle rare user paths
- Non-core feature screens

---

## The Wireframe Standard for Production

Production wireframes are more detailed than hackathon sketches. They must communicate:

**Layout:** Where is each element on the page? What takes primary space?

**Hierarchy:** What is most prominent? What is secondary? What is tertiary?

**Content regions:** Where does dynamic content appear? What are the size constraints?

**Interaction affordances:** What is clickable? What is a form? What expands?

**States:** What does this screen look like when loading? When empty? When errored?

You don't need a design tool for this. A text-based wireframe notation is sufficient for communicating structure to an AI code generator or a collaborator.

---

## Text-Based Wireframe Notation

When working with AI tools, text wireframes produce better output than vague descriptions.

```
## Screen: Dashboard

LAYOUT: Sidebar (240px) + Main content area

SIDEBAR:
  [Logo]
  ---
  Nav: Dashboard (active)
  Nav: Projects
  Nav: Team
  Nav: Settings
  ---
  [User avatar + name]
  [Plan badge: Pro]

MAIN CONTENT:
  Header:
    H1: "Good morning, [Name]"
    [Button: "New Project" — primary, right-aligned]
  
  Section: Recent Projects (if projects exist)
    [Project card grid — 3 columns]
    [Project card]:
      [Project name — bold]
      [Last updated — secondary text]
      [Task count badge]
      [3-dot menu — top right]
    [Link: "View all projects →"]
  
  Section: Recent Activity
    [Activity feed — list]
    [Activity item]:
      [Avatar] [Name] [action] [entity] · [timestamp]

EMPTY STATE (no projects):
  [Illustration placeholder]
  H2: "Create your first project"
  Body: "Projects help you organise your work and collaborate with your team."
  [Button: "New Project" — primary]

MOBILE (< 768px):
  Top bar: [Hamburger] [Logo] [New Project button]
  Bottom tab bar: Home | Projects | Team | Settings
```

---

## Screen Templates

### List View

```
SCREEN: [Entity] List

HEADER:
  H1: "[Entities]"
  [Search input — left] [Filter dropdown] [New [Entity] button — right]

TOOLBAR (conditional — appears when items selected):
  [X selected] [Bulk action: Delete] [Bulk action: Archive]

CONTENT:
  IF items exist:
    [Table / Card grid]
    [Pagination or infinite scroll trigger]
  
  IF empty (no items created yet):
    [Empty state component]
  
  IF empty (search returned nothing):
    "No results for '[query]'" + [Clear search]
  
  IF loading:
    [Skeleton rows × 5]

MOBILE:
  [Cards stacked full-width instead of table]
  [Floating action button: + New [Entity]]
```

---

### Detail View

```
SCREEN: [Entity] Detail

HEADER:
  [Breadcrumb: [Parent] / [Entity name]]
  H1: [Entity name — editable inline]
  [Status badge]
  [Action menu: Edit | Duplicate | Delete]

CONTENT AREA (2-column on desktop, stacked on mobile):
  LEFT COLUMN (66%):
    [Primary content — main editable area]
    
    Section: [Related entity list]
      [Add [related entity] input]
      [Related entity items]
  
  RIGHT COLUMN (33%):
    [Metadata panel]
      Created: [date]
      Updated: [date]
      Owner: [user avatar + name]
    
    [Action panel]
      [Primary action button]
      [Secondary actions]

MOBILE:
  [Stacked single column]
  [Sticky bottom bar: primary action]
```

---

### Settings Page

```
SCREEN: Settings / [Section]

LAYOUT: Settings sidebar (200px) + Form area

SETTINGS SIDEBAR:
  Section: Account
    Profile (active)
    Password & Security
    Notifications
  Section: Billing
    Plan & Billing
    Invoices
  Section: Team (if applicable)
    Members
    Roles

FORM AREA:
  H2: [Section name]
  [Descriptive text — one sentence]
  
  [Form fields — grouped by logical category]
  
  [Danger Zone — bottom, red border]
    H3: "Danger Zone"
    [Delete account] — requires confirmation
  
  [Save button — sticky bottom on mobile / fixed bottom of form on desktop]
```

---

## Core Interaction Patterns to Wireframe

These interaction patterns appear in nearly every production app. Decide how they work in your product now.

**Confirmation dialogs:**
```
MODAL: Confirm Delete

"Delete [Entity name]?"
"This action cannot be undone. All associated [related data] will be permanently deleted."

[Cancel button — secondary] [Delete button — destructive/red]
```

**Feature gate / upgrade prompt:**
```
UPGRADE PROMPT (inline or modal):

[Lock icon]
H3: "[Feature name] is a Pro feature"
Body: "Upgrade to Pro to [specific benefit]."
[Upgrade to Pro — primary button]
[Maybe later — text link]
```

**Toast notifications:**
```
TOAST (bottom-right, auto-dismiss 4s):
  Success: ✓ "[Entity] saved"
  Error: ✗ "Failed to save. [Retry link]"
  Info: ℹ "[Action] is in progress"
```

---

## Prompt: Generate Wireframe Layouts

```
Copy Prompt
```

```
I'm building a production web app and need detailed wireframe specifications 
for the following screen.

Product: [1–2 sentence description]
Navigation model: [sidebar / top nav / etc.]
Primary user: [description]

Screen to wireframe: [screen name]
Purpose: [what this screen is for]
User story: [from PRD]
Key actions available on this screen: [list]
Data displayed: [list the entities and fields shown]
States required: [loaded / loading / empty / error]

Generate a detailed text wireframe specification that includes:

1. Overall layout structure (columns, panels, widths)
2. Every UI region labelled with its content
3. Component-level detail (what each card, row, form field contains)
4. All states: default loaded, loading skeleton, empty state, error state
5. Mobile layout (how it adapts below 768px)
6. Interaction notes (what's clickable, what opens a modal, what's inline editable)

Format as structured text notation — not prose, not code.
This will be used as the specification for component implementation.
```

---

## Reviewing Wireframes

Before moving to branding and design system, validate your wireframes.

**The content test:** Does every region of every screen show real representative content — not Lorem Ipsum? Fake content masks layout problems. Use real entity names, real field lengths, real data volumes.

**The hierarchy test:** On every screen, close your eyes and open them. What do you see first? Is that the right thing? Hierarchy should match user priority, not aesthetic preference.

**The flow test:** Walk through your user flows using only the wireframes. Can you complete every Core flow without ambiguity about what to click next?

**The mobile test:** Does every screen work at 375px? Check especially: navigation, forms, tables (which often collapse to cards on mobile), and modals.

**The edge case test:** For every list view, what does it look like with 1 item? 100 items? 0 items? For every form, what does it look like with a validation error on every field?

---

## Wireframes Checklist

- [ ] Every Core feature has a wireframe for its primary view
- [ ] Dashboard / home screen wireframed
- [ ] Onboarding flow wireframed (every step)
- [ ] Empty states wireframed for every Core feature
- [ ] Loading states specified (skeleton structure defined)
- [ ] Error states wireframed for Core features
- [ ] Settings pages wireframed
- [ ] Mobile layouts defined for every Core screen
- [ ] Core interaction patterns documented (modals, toasts, confirmations, upgrade prompts)
- [ ] User flows walkable through wireframes without ambiguity
- [ ] Real representative content used (not Lorem Ipsum)

---

## What Comes Next

**Branding** — establishing the visual identity that will be applied to these wireframe structures. Logo, colour palette, typography, and visual tone.

With your wireframes complete, branding is applied to structure that already works. This is the correct order. Branding applied to undefined structure produces beautiful products that confuse users.
