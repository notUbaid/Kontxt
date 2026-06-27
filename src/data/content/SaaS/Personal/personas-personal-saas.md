# Personas

 **Estimated Time:** 15 Minutes

---

Most solo builders skip this.

They have a vague sense of who their user is — "small business owners" or "developers" or "people like me" — and start building. Six months later they have a product that kind of works for everyone and really works for no one.

A persona is not a UX deliverable. It is a decision-making tool.

Every time you face a feature decision, a copy decision, an architecture decision — a concrete persona gives you a way to answer it. Without one, you're guessing. With one, you're deciding.

---

## What a Persona Actually Is

Not this:

> *Name: Sarah*
> *Age: 34*
> *Occupation: Marketing Manager*
> *Hobbies: Yoga, travel, cooking*

That's a fiction. It doesn't help you build anything.

A useful persona captures three things:

**1. The situation** — What is happening in their life or work that makes them need this?

**2. The friction** — What are they doing right now that's painful, slow, or broken?

**3. The bar** — What does "good enough" look like for them to switch?

Everything else is decoration.

---

## How Many Personas

For a personal SaaS project: **one primary persona**.

You can have a secondary — but only if they use the product in a meaningfully different way. If they have the same problem and use the product the same way, they're the same persona with different job titles.

> [!WARNING]
>
> Building for two equally weighted personas at the same time is one of the most common reasons solo products never ship.
>
> The features that serve persona A often conflict with the features that serve persona B. You make compromises. Both experiences suffer.
>
> Pick one. Serve them completely. Expand later.

---

## The Persona You Know vs. The Persona You Assume

There are two kinds of personas.

| Type | Source | Reliability |
|------|--------|-------------|
| **Known** | You are this person. You have this problem. | High — you can validate instantly |
| **Assumed** | You've observed or interviewed this person | Medium — requires validation |
| **Imagined** | You think this person exists | Low — dangerous to build on |

For a personal project, the strongest starting position is **building for yourself**.

You know the problem intimately. You can validate features by using them. You don't need to recruit users to know if something works.

If you're not the user — that's fine. But be honest about which type of persona you're working with.

---

## The Persona That Ships Products

Answer these seven questions. Be specific. Resist the urge to write "it depends."

**1. Who are they?**
One sentence. Role, context, situation. Not demographics — *circumstance*.

> *"A freelance designer who manages 5–15 clients at a time and has no dedicated project management tool."*

**2. What are they doing today instead of using your product?**
The workaround is your real competitor.

> *"They're using a combination of Notion, a shared Google Sheet, and a WhatsApp group."*

**3. What's the specific moment of pain?**
Not general frustration — a specific situation where the current solution breaks.

> *"They lose track of which clients have approved final files and which are still waiting. Invoices go out late because they can't remember what's been delivered."*

**4. What have they already tried?**
This tells you why existing solutions don't work. That gap is your product.

> *"They tried Trello but it was too project-focused. They tried HoneyBook but it was too expensive and complex for their volume."*

**5. What does success look like for them?**
Not your feature. Their outcome.

> *"Everything in one place. Know at a glance what's waiting on them vs. waiting on the client. Invoice automatically when a milestone is reached."*

**6. How do they make buying decisions?**
This shapes your pricing, your onboarding, your marketing.

> *"They ask in designer communities. They try free tiers. They won't pay monthly for something they use occasionally."*

**7. What's the bar to switch?**
The cost of changing tools is real. What would make them do it?

> *"If setup takes more than 30 minutes, they won't finish. If it doesn't replace at least two of their existing tools, it's not worth adding another."*

---

## AI Prompt — Stress-Test Your Persona

Use this after you've drafted your answers above.

```prompt
I'm building a personal SaaS project and I've drafted a primary user persona.
Help me stress-test it.

**My persona:**
[paste your answers to the 7 questions]

**My product idea (one sentence):**
[describe what you're building]

Do the following:
1. Identify any assumptions I'm making that I haven't validated
2. Point out where my persona is too vague to make product decisions
3. Ask me 3 questions that would sharpen the persona if I answered them
4. Tell me if there's a more specific sub-segment of this persona I should focus on first
5. Flag any signs that I might be building for an imagined user rather than a real one

Be direct. I'd rather fix the persona now than build the wrong product.
```


---

## The "Am I The User" Test

If you are building for yourself, run this check:

- [ ] I have this problem right now, not hypothetically
- [ ] I have tried to solve it with existing tools and failed
- [ ] I would use my own product if it existed today
- [ ] I can describe a specific moment in the last 30 days where I felt this pain
- [ ] I know at least 3 other people who have complained about the same thing

If you checked all five — you have a real persona. Build with confidence.

If you checked fewer than three — you have an assumption. Treat it carefully.

---

## From Persona to Product

A sharp persona makes the next three modules faster and cleaner.

When you write your **Idea** module, the persona tells you which angle of the problem to solve first.

When you define **Features**, the persona tells you what's core versus what's nice-to-have.

When you write your **PRD**, the persona becomes the voice that every user story is written in.

Don't move on with a vague persona. A vague persona produces vague features, which produce a vague product that helps no one.

---

## Persona Checklist

- [ ] One primary persona defined
- [ ] Situation, friction, and bar all captured
- [ ] All 7 questions answered with specifics — no "it depends"
- [ ] Current workaround identified (that's your real competition)
- [ ] Success defined in terms of their outcome, not your features
- [ ] "Am I the user" test run (or noted that persona is assumed)
- [ ] AI stress-test run and gaps addressed

---

## Next

**Idea →** You know who you're building for. Now sharpen exactly what you're building — and why it's the right solution for this persona at this moment.
