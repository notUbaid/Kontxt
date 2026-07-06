---
title: User Roles
slug: user-roles
phase: Phase 1
mode: hackathon
projectType: internal-tool
estimatedTime: 15-20 min
---

# User Roles

Internal tools almost always serve more than one type of person — the person submitting a request and the person handling it, the employee and the manager. Getting roles right early prevents a common hackathon failure: a tool that technically works but shows everyone the same undifferentiated view, which immediately reads as unfinished to anyone evaluating it.

## The Decision You're Actually Making

Not "what roles could theoretically use this system." It's: **which one or two roles does our MVP actually need to serve, and what's the minimum difference between what each of them sees?**

Full role-based access control with granular permissions is a production concern. In a hackathon, roles exist to make the demo tell a coherent, believable story about how a real team would use this.

## Pull Roles Directly From Your Workflow Analysis

You already identified who does what in Phase 0 — this module formalizes that into concrete access differences, not new discovery work.

```
From workflow analysis: "Employee submits request → Manager reviews 
and assigns → Employee sees updated status"

Roles: Employee, Manager
```

> ** Best Practice:** Don't invent roles that sound comprehensive (Admin, Manager, Employee, Viewer, Guest) if your actual workflow only involves two. Extra roles you don't functionally differentiate in the demo just add unused complexity — build exactly the roles your mapped workflow requires, no more.

## Decision: How Many Roles for Your MVP

| Scenario | Recommended role count |
|---|---|
| Workflow has one clear submitter and one clear reviewer/actor | 2 roles — this covers most internal tools well |
| Workflow has three genuinely distinct behaviors (submit, triage, execute) | 3 roles, only if each has meaningfully different screens/actions |
| You're unsure if a role is truly distinct | Default to fewer — merge it into an existing role for the MVP |

> **️ Warning:** Building more than 2-3 roles in a hackathon usually means building 2-3 times the UI and permission logic for marginal demo value. A judge watching your demo cares whether the core interaction (submit → review → resolve) is clear and working, not whether you've modeled every real-world role with full fidelity.

## What Actually Needs to Differ Between Roles

For a hackathon MVP, role differentiation usually comes down to three things — build these, skip elaborate permission systems.

- **What they see** — a submitter sees their own requests; a reviewer sees all requests
- **What they can do** — a submitter can create; a reviewer can also update status/assign
- **Where they land** — each role's default view reflects what matters to them first

> ** Tip:** The fastest way to make a demo feel like a real, thoughtful tool rather than a generic CRUD app is showing two different logged-in views side by side — "here's what the employee sees, here's what the manager sees" is a simple, visually convincing way to demonstrate role awareness without building a complex permissions engine.

## Implementing Roles Simply

You don't need a full authorization framework for a hackathon. A role field and conditional rendering is enough.

```
User table: id, name, role ("employee" | "manager")

In the UI: 
if (user.role === "manager") show all requests + status controls
else show only user's own requests, read-only status
```

> ** Best Practice:** A single role field with simple conditional logic in your frontend and basic checks in your API routes is sufficient for a hackathon demo. Save role-based access control libraries, granular permission systems, and admin-configurable roles for a production-mode project — they add real setup time here for no visible demo benefit.

## Use AI to Confirm Your Role Split

**Prompt — Role Scoping Check**
```
Here's my workflow from earlier planning:
[paste your Current Workflow Analysis steps]

Based on this specific workflow:
1. What's the minimum number of distinct roles needed to demo this 
   convincingly?
2. For each role, what's the one key difference in what they see and 
   what they can do?
3. Is there any role I might be tempted to add that isn't actually 
   necessary for this specific MVP?
```

> ** Token Efficiency:** Paste your actual workflow steps rather than describing roles abstractly — role decisions should be derived directly from the concrete workflow you already mapped, not designed independently of it.

## Validate Before Moving On

- Role count matches what your actual workflow requires, not a generic assumption
- Each role has a clear, demoable difference in what it sees and can do
- Role logic is implemented simply (a role field + conditionals), not an elaborate permission system
- You can clearly narrate, in your future demo, what changes when you switch between roles

## Common Mistakes

- Building more roles than the actual workflow requires, adding unused complexity
- Roles that look different in name but behave identically in the demo
- Investing hackathon time in a full RBAC system when a simple role field would suffice
- Skipping role differentiation entirely, making the tool look like generic single-user CRUD

## Quick Reference

| Do this | Skip this | Comes from |
|---|---|---|
| 2-3 roles max, derived from real workflow | Elaborate RBAC/permission frameworks | Phase 0: Workflow Analysis |
| Simple role field + conditional rendering | Admin-configurable roles | Current workflow's actual actors |
| Clear "sees X, can do Y" per role | Roles with no functional difference | — |
| A demoable side-by-side role comparison | More roles than you can differentiate well | — |

## What's Next

With roles defined, the next module is Dashboard Strategy — deciding what each role actually sees when they land in the tool, turning these role distinctions into concrete screen layouts.
