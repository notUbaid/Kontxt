---
title: Admin Panel
slug: admin-panel
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Admin Panel (Internal Tooling)

## The Backbone of Marketplace Operations

In a personal project, an admin panel is a secret URL where the founder can manually approve a listing. In a production marketplace, the admin panel is a fully-fledged internal product used by Trust & Safety, Customer Support, and Finance teams.

If you under-invest in internal tooling, your operational costs will scale linearly with your user base. You will spend 40 hours a week running manual database queries to resolve customer complaints.

---

## The Build vs. Buy Decision

Do not build a bespoke React admin panel from scratch if you can avoid it. Internal tools do not need pixel-perfect branding or micro-animations; they need to display complex relational data securely and quickly.

| Tooling Approach | The Production Use Case |
|---|---|
| **Retool / Forest Admin** | The gold standard. Connect directly to your Postgres database and Stripe API. Drag and drop UI components. Saves hundreds of engineering hours. |
| **Refine / React Admin** | Excellent if you want the panel integrated into your codebase (Next.js/React) but want pre-built data grids and IAM logic. |
| **Custom Next.js App** | Required only if your admin workflows are so bespoke (e.g., complex multi-party dispute arbitration) that Retool cannot handle them. |

> [!DECISION]
> Default to **Retool** for your Phase 3 admin panel. Your engineering time is better spent on the buyer-facing product, not aligning CSS tables for your support team.

---

## Identity and Access Management (IAM)

You cannot have a single "Admin" boolean. When you hire your first Customer Support (L1) representative, you do not want them to have the ability to issue $10,000 refunds or view raw Stripe routing numbers.

**The Production Admin Roles:**
* **Super Admin (Founder):** Can mutate system settings, edit fee structures, and view all data.
* **Finance Admin:** Can issue refunds and view Escrow balances, but cannot modify User Trust Scores.
* **L1 Support (Moderator):** Can review and approve/reject listings, ban users, and view message threads. Cannot issue refunds above $50.

---

## Audit Logs (Who Did What?)

If a seller's account is mistakenly banned, or a large refund is issued, you must know exactly which admin triggered the action and when.

**The Production Rule:**
Every mutating action in the admin panel (`Approve_Listing`, `Issue_Refund`, `Ban_User`) must write an immutable row to an `audit_logs` table:
* `admin_id`
* `action_type`
* `target_entity_id`
* `previous_state`
* `new_state`
* `timestamp`

If you are audited for financial compliance, this table is the first thing regulators will ask for.

---

## User Impersonation

When a seller emails support saying "My dashboard is broken," you cannot ask them for their password.

Your backend must support an **Impersonation Flow**. 
A Super Admin clicks "Impersonate User" in the Admin Panel. The backend generates a temporary, highly restricted JWT with the target user's ID, and the Admin is logged into the frontend as that user.

> [!CAUTION]
> Impersonation sessions MUST be explicitly flagged in the JWT (e.g., `impersonator_id: "admin_99"`). Your backend must actively reject any requests to execute financial transactions (like withdrawing funds or purchasing items) if the token contains an impersonator flag.

---

## Do's and Don'ts of Production Admin Panels

- **DO surface Dispute context immediately.** When an admin opens a Dispute, the UI must fetch the Transaction details, the Stripe Escrow status, and the exact Message Thread between the buyer and seller on a single screen.
- **DON'T delete data from the admin panel.** Admin panels should never execute raw `DELETE` SQL commands on transactional data. They should only execute Soft Deletes (updating `status` to `ARCHIVED`).
- **DO require a "Reason" for every punitive action.** If an admin rejects a listing or bans a user, the UI must force them to select a reason from a dropdown. This data is critical for Analytics (e.g., "Why are 40% of listings failing approval?").
- **DON'T expose the Admin Panel to the public internet without strict MFA.** Admin panels are massive targets for credential stuffing. Force SSO (Google Workspace/Okta) and mandatory hardware MFA (YubiKey or Authenticator App) for all internal accounts.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Audit Log Middleware:**

````prompt
Act as a Senior Backend Engineer. I am using Node.js and Prisma. Write an Express/Next.js middleware function that intercepts any `POST/PUT/DELETE` request made by an Admin. It must capture the `admin_id` from the JWT, the route being accessed, the request payload, and the response status, and securely write this data to an `audit_logs` table asynchronously so it doesn't block the request.
````

> [!TIP]
> **Prompt 2 — Secure Impersonation Logic:**

````prompt
I need to implement a User Impersonation feature for my Customer Support team. Write the backend API route that takes a `target_user_id`, verifies the requester has the `SuperAdmin` role, and generates a short-lived JWT. The JWT must contain the `target_user_id` as the subject, but explicitly include an `is_impersonation: true` claim so the backend can block financial mutations during the session.
````

---

## Validating What AI Generates

- **Check for destructive actions:** If the AI writes a React admin dashboard that includes a "Hard Delete User" button, reject it and demand a "Suspend User" (Soft Delete) implementation instead.
- **Verify IAM enforcement:** Ensure that any admin API route generated by the AI explicitly checks the admin's specific Role (e.g., `Finance`, `Support`) before executing the logic, rather than just checking `isAdmin === true`.

---

## Implementation Checklist

- [ ] Decided between building a custom panel or using a managed internal tool (e.g., Retool).
- [ ] Defined strict Identity and Access Management (IAM) roles for internal staff (Support vs. Finance).
- [ ] Implemented immutable Audit Logging for all administrative mutations.
- [ ] Built the Dispute Mediation view (aggregating Transactions, Messages, and Escrow status).
- [ ] Architected a secure, restricted User Impersonation flow for debugging.

---

## What's Next

Next: **Testing** — With our production code written, we must ensure it does not break. We will architect a testing strategy covering unit tests for financial logic, integration tests for critical user flows, and load testing for the search infrastructure.
