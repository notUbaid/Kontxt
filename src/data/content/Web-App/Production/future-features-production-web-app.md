---
title: Future Features
slug: future-features
phase: Phase 0
mode: production
projectType: web-app
estimatedTime: 25–35 min
---

# Future Features

You are not building future features now. You are mapping them so that the decisions you make in v1 don't foreclose them.

This is one of the most underrated phases of production planning. An architecture that can't support multi-tenancy without a full rebuild. A schema that can't handle localisation. A billing model that can't accommodate usage-based pricing. These are not failures of implementation — they are failures of planning.

Spend an hour here. Save weeks later.

---

## The Purpose of This Module

**Not:** A roadmap you're committing to.
**Not:** Features you'll build after launch based on feelings.
**Yes:** A structured look at where the product could go, used as a constraint on v1 architecture decisions.

The question at every step is: **does my v1 architecture make this possible without a rewrite?**

If the answer is no, you have two choices: change the v1 architecture now, or explicitly accept the future migration cost.

---

## The Future Features Framework

Map your future features across three horizons:

| Horizon | Timeframe | Purpose |
|---|---|---|
| **Near** | 3–6 months post-launch | Informed by v1 user feedback — high confidence |
| **Mid** | 6–18 months | Strategic bets based on your roadmap thesis |
| **Far** | 18+ months | Directional only — don't over-engineer for these |

Near-horizon features should inform v1 architecture. Mid-horizon features should be possible without a rewrite. Far-horizon features are noted but not designed for.

---

## Common Feature Categories to Map

Work through each category and decide: likely, possible, or not applicable.

### User & Access Model

```
[ ] Team / multi-user accounts
[ ] Organisations with multiple teams
[ ] Role-based access control (admin, editor, viewer)
[ ] Guest / external collaborator access
[ ] SSO / SAML (enterprise requirement)
[ ] API access for users (personal API keys)
```

**Why it matters for v1:** If teams are in your near horizon, your schema needs an `Organisation` or `Team` model from day one — even if v1 only supports individual users. Adding multi-tenancy to a single-user schema is one of the most painful migrations in web development.

---

### Monetization Evolution

```
[ ] Additional pricing tiers
[ ] Usage-based pricing (metering)
[ ] Enterprise / custom contracts
[ ] Marketplace / revenue share
[ ] Add-ons or one-time purchases
[ ] Reseller / white-label
```

**Why it matters for v1:** Your Stripe integration and billing schema must be flexible enough to accommodate tier changes and new products without a full rebuild.

---

### Internationalisation

```
[ ] Multiple languages (i18n)
[ ] Multiple currencies
[ ] Regional data residency (GDPR, data sovereignty)
[ ] Localised date / number / currency formats
[ ] Right-to-left language support
```

**Why it matters for v1:** Adding i18n to an existing codebase that wasn't built for it is a full audit of every user-facing string. If international users are in your near horizon, use an i18n library from the start — even if you only support one language initially.

---

### Platform Expansion

```
[ ] Mobile app (iOS / Android)
[ ] Desktop app (Electron / Tauri)
[ ] Browser extension
[ ] Public API for third-party integrations
[ ] Webhooks for user automation
[ ] Native integrations (Slack, Notion, Zapier, etc.)
```

**Why it matters for v1:** A public API requires versioning, rate limiting, API key management, and documentation — none of which you'll build in v1. But your internal API architecture should be clean enough to expose publicly without a full rewrite. If a mobile app is in your near horizon, your auth strategy (httpOnly cookies vs tokens) matters now.

---

### Data & Intelligence

```
[ ] Analytics dashboard for users (in-product)
[ ] AI-assisted features
[ ] Bulk data import / export
[ ] Reporting and scheduled exports
[ ] Data retention policies
[ ] Audit logs
```

**Why it matters for v1:** AI features require data. If AI is in your mid-horizon, think about what data you need to collect now to make it possible. Audit logs and data retention are enterprise requirements — if enterprise is in your roadmap, design your event model early.

---

### Scale & Reliability

```
[ ] Background job processing at scale
[ ] Real-time features (WebSockets, live updates)
[ ] CDN / edge caching for content
[ ] Multi-region deployment
[ ] SLA commitments / uptime guarantees
[ ] Disaster recovery / backup strategy
```

**Why it matters for v1:** You won't need most of this at launch. But your hosting and infrastructure choices should not actively prevent it.

---

## The Architecture Impact Assessment

For each near-horizon feature you identified, assess the v1 impact:

```
Future Feature: [name]
Horizon: Near / Mid / Far
Likelihood: High / Medium / Low

If not considered in v1:
  Migration cost: Low / Medium / High / Very High
  
What v1 decision would need to change?
  [schema change / auth model change / API redesign / etc.]

What should v1 do now to enable this?
  [ ] Add [field] to schema even if unused
  [ ] Use [pattern] instead of simpler alternative
  [ ] Avoid [specific technical decision]
  [ ] Document [assumption] that would need to change
```

Do this for every near-horizon feature with a Medium or High migration cost.

---

## The Decisions That Are Hard to Reverse

Some v1 decisions are cheap to change later. Others are very expensive. Know which is which.

| Decision | Cost to Change Later | What to Consider Now |
|---|---|---|
| Single-user vs multi-tenant schema | Very High | Add org/team model even if unused in v1 |
| Cookie-based vs token-based auth | High | Decide based on platform targets |
| Monolith vs microservices | High | Start monolith — but design clean module boundaries |
| Relational vs document database | Very High | Choose based on future data model, not current |
| Soft delete vs hard delete | Medium | Add `deletedAt` to all important models |
| Event sourcing vs state-based | Very High | Only choose event sourcing if audit trail is core |
| Hosting region | Medium | Consider data residency requirements now |
| API versioning strategy | Medium | Build `/v1/` prefix in from the start |

---

## Prompt: Stress-Test Your V1 Architecture Against the Future

```
Copy Prompt
```

```
I'm planning a production web app. Before I finalise my v1 architecture, 
I want to stress-test it against my future roadmap.

My v1 product: [2–3 sentence description]
My v1 tech stack (if decided): [stack]
My v1 database schema (rough): [key models and fields]
My v1 auth model: [how authentication works]

My near-horizon features (3–6 months):
[list]

My mid-horizon features (6–18 months):
[list]

For each near-horizon feature:
1. Does my current v1 architecture support it without a major rewrite?
2. If not, what specific v1 decision needs to change?
3. What is the minimum v1 change that would make this possible later?

Then identify:
4. The single most expensive architectural decision I'm making in v1 that 
   could block my roadmap — and the lowest-cost way to future-proof it.

5. Any near-horizon feature I should actually include in v1 because 
   the cost of adding it later is disproportionately high.

Be specific. Reference the actual schema fields and architecture patterns involved.
```

---

## The Future Features Document

Output of this module: a living document, not a commitment.

```
## Future Features — [Product Name]
Last updated: [date]

### Near Horizon (3–6 months)
- [Feature]: [one line description] | Impact on v1: [what we did / what we deferred]

### Mid Horizon (6–18 months)
- [Feature]: [one line description] | Architecture note: [what to keep in mind]

### Far Horizon (18+ months)
- [Feature]: [directional note only]

### V1 Architecture Decisions Made for Future Compatibility
- [Decision]: [rationale referencing future feature]
- [Decision]: [rationale referencing future feature]

### Accepted Technical Debt
- [Thing we didn't build for]: [migration cost if needed] | [rationale for deferring]
```

This document gets reviewed every quarter. Features move between horizons as you learn more.

---

## Future Features Checklist

- [ ] Near, mid, and far horizons mapped across all feature categories
- [ ] Architecture impact assessed for every near-horizon feature with medium+ migration cost
- [ ] V1 schema reviewed for multi-tenancy readiness (even if not yet needed)
- [ ] Auth model validated against platform expansion plans
- [ ] API design accounts for potential public exposure
- [ ] i18n decision made (use library from day one, or accept future audit cost)
- [ ] Accepted technical debt documented with migration cost acknowledged
- [ ] Future features document written and stored with project docs

---

## Phase 0 Complete

You have now completed the Discovery & Planning phase.

You have defined:
- A precise problem and target user
- A competitive landscape and defensible position
- A unique selling proposition
- A scoped MVP with explicit exclusions
- A monetization model with billing architecture
- A future roadmap that constrains your v1 decisions

**Phase 1 — UX & Product Design** begins with the PRD — turning everything in Phase 0 into a formal product requirements document that engineering and design can build from.

The decisions you've made in Phase 0 are the foundation. Phase 1 is where they become specifications.
