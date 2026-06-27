---
title: Legal Documents
slug: legal-documents
phase: Phase 5
mode: production
projectType: saas
estimatedTime: 15-20 min
---

# Legal Documents

You've already built the three documents that cover almost every SaaS: Privacy Policy, Terms of Service, Cookie Policy. This module is about what's left over — the documents that only apply depending on *your specific* business, and that founders frequently discover they needed only after a customer, investor, or partner asks for one.

> **️ Important boundary**
> Kontxt is not a lawyer. This module helps you recognize which additional documents your specific business might need so you can ask the right questions to a professional — it does not tell you definitively which laws apply to you, and AI-drafted versions of any of these should be reviewed before use, especially the ones involving liability or compliance certifications.

---

## The Core Idea: Most of These Are Triggered by Specific Business Facts

Unlike Privacy Policy and ToS, which every SaaS needs, this category is conditional. Each document below exists because of a specific fact about your business. Match your situation against the table — don't draft documents you don't need yet.

**Decision Card — Which Documents Apply to You**

| Document | You Need This If... |
|---|---|
| Data Processing Agreement (DPA) | You sell to other businesses (B2B) and process their customers' personal data on their behalf |
| Service Level Agreement (SLA) | You sell to enterprise customers who require uptime guarantees in their contract |
| Acceptable Use Policy (AUP) | Your ToS doesn't already cover this in enough depth, or you want a standalone reference doc to point bad actors to |
| Subprocessor List | You have a DPA — customers under GDPR need to know which third parties touch their data |
| Refund Policy (standalone) | Your refund terms are complex enough that burying them in ToS makes them hard to find/enforce |
| Security/Compliance Page (SOC 2, etc.) | Enterprise prospects are asking about your security posture before they'll sign |
| Accessibility Statement | You want to publicly commit to an accessibility standard (often expected by enterprise/government customers) |

> ** Tip**
> Most early-stage SaaS companies need zero of these at launch. They become necessary the first time an enterprise prospect's procurement or legal team sends you a vendor security questionnaire — which is usually your actual trigger, not a calendar date.

---

## The One Most Founders Underestimate: The DPA

If you sell B2B and your customer's business data includes their end users' personal information, your customer is the "data controller" and you are the "data processor" under GDPR. They are legally required to have a DPA with you before sending you that data — this isn't optional once the relationship exists.

**What a DPA actually commits you to:**

- Processing data only as instructed by your customer (not for your own purposes)
- Implementing appropriate security measures
- Notifying the customer of a data breach within a specific timeframe
- Listing your subprocessors (your own third-party tools — hosting, email, analytics) so the customer's compliance team can review them

> **️ Warning**
> Your DPA's subprocessor list has to actually match your infrastructure. If you list AWS but you actually use a different host, or you add a new analytics tool six months later without updating the list, you're in breach of the agreement you signed — this is a living document, not a one-time draft.

---

## Drafting These With AI

Each of these documents is more specialized than Privacy Policy or ToS, and the stakes are often higher because they're contractual commitments to specific business customers, not general-purpose terms for the public.

**Prompt: Identify What You Actually Need**

```
I run a B2B SaaS product. Here are the relevant facts about my business:

- Customer type: [B2B / B2C / both]
- Do I process my customers' end-user personal data on their behalf?: [yes/no, describe]
- Do any customers require uptime guarantees in their contracts?: [yes/no]
- Have any prospects sent security questionnaires or asked about SOC 2/compliance?: [yes/no]
- Current third-party subprocessors (hosting, email, analytics, etc.): [list]

Based only on these facts, tell me which of the following documents
I actually need right now versus which I can defer: Data Processing
Agreement, SLA, standalone Acceptable Use Policy, Subprocessor List,
Security/Compliance page.

For each one I need, explain the specific business fact that triggers
the requirement.
```

> ** Why this prompt works**
> It asks the model to reason from your specific facts to a conclusion, rather than generating a generic stack of documents "because SaaS companies usually have these." Requiring the model to cite the specific triggering fact for each recommendation makes the output checkable — if you can't see why a fact you listed maps to a document, that's a sign to question the recommendation rather than accept it.

**Token efficiency note:** Run this identification prompt before drafting anything. It's far cheaper, in both tokens and your time, to confirm you need zero of these documents than to draft an SLA and a DPA you'll never use because no enterprise customer has asked for either yet.

---

## Validating the Output

- [ ] Every document you publish corresponds to an actual, current business fact — not a hypothetical future state
- [ ] Subprocessor lists are checked against your real infrastructure, not assumed defaults
- [ ] SLA uptime commitments match what your infrastructure can actually deliver (see the Launch Checklist module's performance and monitoring sections — don't promise what you haven't engineered)
- [ ] A qualified professional has reviewed any document that will be attached to a signed contract with a paying customer, since these carry direct contractual liability in a way your public-facing ToS may not

> ** Note**
> A DPA or SLA isn't just a published page like a Privacy Policy — it's typically a signed exhibit to a customer contract. Treat the review bar accordingly: higher stakes than a footer link, lower volume than your core legal documents.

---

## Quick Reference: Deferred Is Fine

It's correct, not lazy, to launch with only Privacy Policy, Terms of Service, and Cookie Policy if you're early-stage B2C or pre-enterprise B2B. Build the rest reactively, triggered by real customer requirements, rather than proactively drafting documents for a sales motion you haven't started yet.

---

## What's Next

With your legal foundation either complete or correctly deferred, move to **Customer Support** — setting up the operational systems that handle the questions and issues your launch will generate, regardless of how well-prepared everything above is.
