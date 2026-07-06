---
title: Wireframes
slug: wireframes
phase: Phase 1
mode: production
projectType: marketplace
estimatedTime: 30-40 min
---

# Wireframes (Information Architecture)

Your User Flows mapped the logic. Now, you must map the Information Architecture (IA) onto two-dimensional space. 

In a production environment, wireframes are not just rough sketches; they are structural blueprints that dictate your React component hierarchy and your GraphQL/REST endpoint payloads. If you place a "Seller Rating" module on the homepage wireframe, your backend engineers now have to write a complex SQL join to fetch aggregate ratings on the index page. 

Wireframing is where you lock in the cost of your database queries.

---

## High-Fidelity Logic, Low-Fidelity Visuals

A production wireframe must have zero visual polish but 100% logical accuracy. 

- **Do not use color or typography.** (That is the job of the Design System).
- **Do not use placeholder text (Lorem Ipsum).** Use actual data shapes (e.g., "$1,250/mo", "Verified Identity").
- **Do define states.** Show what the screen looks like when the user has 0 items, 1 item, and 50 items.

> [!IMPORTANT]
> A wireframe with placeholder text allows you to cheat. If you use "Lorem Ipsum," you will not realize that your actual user-generated titles are 60 characters long and will break your CSS grid. Use realistic, worst-case-scenario data in your wireframes.

---

## The Two Distinct Interfaces of a Marketplace

A production marketplace is actually two completely different applications sharing a database. You must wireframe them using different layout paradigms:

### 1. The Demand Side (B2C Discovery)
Buyers need inspiration and trust. 
- **Layout Paradigm:** Highly visual, image-led cards. F-pattern reading layout.
- **Core Screens:** The Search Index (Map + Grid), The Listing Detail (The conversion page), and Checkout (Escrow authorization).
- **IA Priority:** Filters and Search must be hyper-accessible. Trust signals (Reviews, Verification badges) must be placed above the fold on the Listing Detail.

### 2. The Supply Side (B2B SaaS)
Sellers need efficiency and workflow control.
- **Layout Paradigm:** Data-dense, table-led dashboards. Z-pattern or sidebar navigation.
- **Core Screens:** The Analytics Dashboard, The Inventory Manager (Data Tables), and The Order Fulfillment Pipeline.
- **IA Priority:** Bulk actions, pagination, and status indicators. A seller with 100 listings does not want to see giant image cards; they want a compact data table.

---

## Wireframing for Component Reusability

When drawing your wireframes, you are implicitly designing your React components. Do not design 15 different types of buttons or 5 different types of cards. 

Define your primitives on the wireframe level:
- **The Global Header:** Authenticated vs. Unauthenticated states.
- **The Standard Listing Card:** Used in search results, "Related Items," and the seller's dashboard.
- **The Empty State Container:** A standardized layout for when a data fetch returns zero results.

> [!WARNING]
> If a UI element on your wireframe is only used on one screen, rethink it. Production frontend architecture relies on a highly constrained library of reusable components to maintain rendering speed and reduce bundle size.

---

## The Engineering Handoff

When handing wireframes to engineering, each screen must be annotated with its data requirements. 

For example, the **Listing Detail** wireframe should be annotated:
* `Data Requirement: Listing details (Title, Price, Description, Images)`
* `Data Requirement: Seller summary (Name, Avatar, Average Rating)`
* `Action: Create Checkout Session`

This allows the backend team to begin writing the API endpoints concurrently while the design team moves on to high-fidelity styling.

---

## AI Prompts for Structural Wireframing

> [!TIP]
> **Prompt 1 — Generating the Component Spec:**

````prompt
Here is the PRD and User Flow for my marketplace's [Listing Detail Screen]. Act as a Senior Frontend Architect. Break this screen down into a strict component hierarchy. List the specific UI components (e.g., ImageCarousel, PricingStickyBox, ReviewList) that must exist on this wireframe. For each component, define the exact JSON data payload it will require from the backend.
````

> [!TIP]
> **Prompt 2 — Stress-Testing the Layout:**

````prompt
I am wireframing a data-dense dashboard for the Supply Side of my [Your Niche] marketplace. The seller might have anywhere from 1 to 1,000 active listings. Act as a UX Researcher. Outline a structural wireframe layout (using text/markdown) for this dashboard that optimizes for bulk actions and fast status checks, entirely avoiding "B2C-style" large image cards.
````

---

## Validating AI Output

- **Check for realistic data constraints:** If AI suggests a layout that relies on 5 different external data sources (e.g., pulling in live Instagram feeds or external weather APIs), reject it. Keep the IA constrained to your own database to minimize latency.
- **Enforce Low-Fidelity:** If using an AI tool to generate actual images of wireframes, ensure it does not start applying arbitrary branding, colors, or rounded corners. Stick to structural wireframes.

---

## Checklist: Information Architecture

## Checklist:
- [ ] Wireframed the Demand-Side Discovery experience (Search + Detail + Checkout).
- [ ] Wireframed the Supply-Side Dashboard experience (Inventory Management + Data Tables).
- [ ] Replaced all "Lorem Ipsum" with realistic, worst-case data.
- [ ] Annotated all screens with their required data-fetching payloads for the backend team.
- [ ] Ensured UI components (like the Listing Card) are reusable across multiple screens.

---

## What's Next

Next: **Design System** — We take these structural wireframes and wrap them in a cohesive, production-grade visual language using a centralized design system.
