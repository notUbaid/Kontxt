---
title: User Documentation
slug: user-documentation
phase: Phase 4
mode: personal
projectType: ai-tool
estimatedTime: 15–20 min
---

# User Documentation

Documentation for a personal AI tool is not a manual. Nobody reads manuals.

It is the difference between a user who opens your tool, gets confused in 30 seconds, and never comes back — and one who immediately understands what it does, tries it, and finds value.

For a personal project, the bar is low but specific: users should be able to start using your tool without asking you anything. If they have to message you to understand what to type, your documentation has failed. If they try it once and never return because they didn't know what it could do, your documentation has failed.

---

## The Documentation That Actually Gets Read

People don't read documentation linearly. They scan, try, get stuck, scan again.

Design for how people actually behave — not how you wish they would.

```
What users actually read:
   The headline / tagline (first 5 seconds)
   Example prompts (what do I actually type?)
   Inline tooltips when they're confused
   Error messages when something breaks
   A short onboarding flow the first time

What users skip:
   Long "Getting Started" pages
   Feature lists
   FAQs they don't have yet
   Anything that requires scrolling before they've tried the tool
```

---

## The Tagline — One Sentence That Does the Work

Before a user reads anything else, they need to know: what is this, and is it for me?

```
Bad taglines:
  "An AI-powered productivity assistant"
  → Says nothing specific. Could be anything.

  "Leveraging cutting-edge LLMs to enhance your workflow"
  → Jargon. Tells the user nothing actionable.

Good taglines:
  "Turns your meeting notes into a structured action list in 10 seconds"
  → Specific input, specific output, specific time.

  "Ask questions about any PDF — get answers with exact page references"
  → Clear use case. User knows immediately if this is for them.

  "Your personal code reviewer. Paste any function, get feedback in plain English."
  → Specific, personal, actionable.
```

Your tagline should describe what the user can DO with the tool, not what the tool IS.

---

## Example Prompts — The Most Important Documentation

The #1 question every new user has is: "What do I type?"

They will not experiment freely until they've seen at least one example that works. Example prompts remove the blank-page anxiety and immediately demonstrate value.

### In the Input Placeholder

```tsx
// The placeholder text IS documentation
<textarea
  placeholder="e.g. Summarise this meeting transcript and list the action items with owners"
  rows={3}
/>

// Rotate examples to show breadth
const PLACEHOLDERS = [
  "e.g. What are the key risks in this contract?",
  "e.g. Turn these bullet points into a professional email",
  "e.g. What does this error mean and how do I fix it?",
]
```

### Example Prompt Cards

```tsx
const EXAMPLE_PROMPTS = [
  {
    label: "Summarise",
    prompt: "Summarise this in 3 bullet points, focusing on decisions made",
    icon: ""
  },
  {
    label: "Explain",
    prompt: "Explain this to me like I'm unfamiliar with the topic",
    icon: ""
  },
  {
    label: "Action items",
    prompt: "What are the next steps and who is responsible for each?",
    icon: ""
  }
]

function ExamplePrompts({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="example-prompts">
      <p className="label">Try an example:</p>
      <div className="prompt-cards">
        {EXAMPLE_PROMPTS.map(ex => (
          <button
            key={ex.label}
            onClick={() => onSelect(ex.prompt)}
            className="prompt-card"
          >
            <span>{ex.icon}</span>
            <span>{ex.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
```

Clicking an example populates the input. The user sees the result immediately. This is more effective than any written explanation of what the tool does.

---

## Onboarding — The First Session

First-time users need slightly more guidance than returning users. Show it once, then get out of the way.

```tsx
function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    if (typeof window === "undefined") return false
    return !localStorage.getItem("hasVisited")
  })

  const markVisited = useCallback(() => {
    localStorage.setItem("hasVisited", "true")
    setIsFirstVisit(false)
  }, [])

  return { isFirstVisit, markVisited }
}

function WelcomeOverlay({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="welcome-overlay" role="dialog" aria-label="Welcome">
      <div className="welcome-card">
        <h2>Welcome to [Your Tool Name]</h2>
        <p>[Your one-sentence description of what it does]</p>

        <div className="quick-tips">
          <div className="tip">
            <span>1.</span>
            <span>[First thing to do — specific action]</span>
          </div>
          <div className="tip">
            <span>2.</span>
            <span>[Second thing — what to expect]</span>
          </div>
          <div className="tip">
            <span>3.</span>
            <span>[Optional tip — a power feature they might miss]</span>
          </div>
        </div>

        <button onClick={onDismiss} className="primary">
          Get started
        </button>
      </div>
    </div>
  )
}
```

Keep the welcome screen to three points maximum. Longer than that and users click "Get started" without reading.

---

## Inline Contextual Help

Help placed exactly where confusion happens is more effective than a help page.

```tsx
// Tooltip on an unclear UI element
function TooltipIcon({ text }: { text: string }) {
  return (
    <div className="tooltip-wrapper" title={text}>
      <InfoIcon size={14} aria-label={text} />
    </div>
  )
}

// Usage — next to a setting or feature the user might not understand
<label>
  Context window
  <TooltipIcon text="How many previous messages the AI remembers. Higher = better context but slower and more expensive." />
</label>
```

```tsx
// Empty state as documentation
function EmptyConversation() {
  return (
    <div className="empty-state">
      <YourToolIcon />
      <h3>What can I help you with?</h3>
      <p>[One sentence describing the primary use case]</p>
      <ExamplePrompts onSelect={setInput} />
    </div>
  )
}
```

The empty state is prime real estate. Every new conversation starts there. Use it to guide the user's first action, not to display a logo.

---

## Capability Boundaries — What It Can't Do

Users will try things your tool isn't designed for. A clear, helpful response when they hit a boundary prevents frustration.

```typescript
// System prompt — teach the model to redirect gracefully
const systemPrompt = `
You are a [DESCRIPTION OF YOUR TOOL].

You are specifically designed to help with [PRIMARY USE CASE].

If the user asks about something outside this scope, respond warmly:
"I'm designed specifically for [USE CASE]. For [WHAT THEY ASKED],
you might get better results from [ALTERNATIVE].
Is there anything related to [USE CASE] I can help with?"

Never refuse abruptly. Always offer an alternative or redirect.
`
```

This is documentation embedded in the model's behaviour — the user learns the tool's scope through natural interaction, not by reading a limitations page they'll never open.

---

## Keyboard Shortcuts

Power users discover these through tooltips or a simple reference, not through documentation pages.

```tsx
// Show shortcut hints in the UI
<button
  onClick={handleSubmit}
  title="Send message ( + Enter)"
>
  Send
</button>

<textarea
  onKeyDown={(e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleSubmit()
    }
  }}
/>

// Keyboard shortcut reference — discoverable via ? key
function ShortcutReference() {
  return (
    <div className="shortcuts">
      <h3>Keyboard shortcuts</h3>
      <dl>
        <dt> + Enter</dt><dd>Send message</dd>
        <dt> + K</dt><dd>New conversation</dd>
        <dt> + /</dt><dd>Show shortcuts</dd>
      </dl>
    </div>
  )
}
```

---

## The README — For Technical Users

If you share the repo or your tool with developers, a README serves as the technical documentation layer.

```
# [Tool Name]

[One sentence: what it does and who it's for]

## What it does

[2–3 sentences on the core use case. Be specific.]

## Getting started

\`\`\`bash
git clone [repo]
cd [project]
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
\`\`\`

Open http://localhost:3000

## Environment variables

| Variable | Required | Description |
|---|---|---|
| ANTHROPIC_API_KEY | Yes | Get from console.anthropic.com |
| DATABASE_URL | If using DB | PostgreSQL connection string |
| NEXTAUTH_SECRET | If using auth | Generate: openssl rand -base64 32 |

## How to use it

[2–3 example prompts that demonstrate the tool's value]

## Built with

- [Framework]
- [AI Provider + Model]
- [Database if any]
- [Deployed on]
```

The README is not for end users — it's for anyone who clones the repo. Keep it short. The goal is "set up in under 10 minutes."

---

## What Not to Write

Documentation scope creep is real. These are signs you're writing documentation for yourself, not your users.

```
Skip these:
   Architectural overviews
   How the AI model works internally
   Changelogs (nobody reads these on personal projects)
   Roadmaps (things that don't exist yet)
   "About" pages longer than two sentences
   FAQs for questions nobody has asked yet

The rule: only document what a user needs to know
          to do something useful in the next 5 minutes.
```

---

## AI Prompt — Documentation Review

<copy-prompt>
You are a UX writer reviewing the documentation and onboarding for a personal AI tool.

My tool:
- What it does: [DESCRIBE YOUR TOOL IN 1–2 SENTENCES]
- Primary use case: [THE MAIN THING USERS DO WITH IT]
- Target users: [WHO WILL USE IT]
- Current onboarding: [DESCRIBE WHAT A NEW USER SEES AND READS]

Review my documentation and tell me:
1. Does my tagline clearly communicate what the tool does and who it's for?
2. What would a first-time user be confused about?
3. What example prompts would best demonstrate the tool's value?
4. What is the most important thing to show in the empty state?
5. Where should I add inline contextual help?
6. What capability boundaries should I communicate proactively?
7. What am I documenting that users don't actually need?

Be specific. Suggest actual copy where possible.
</copy-prompt>

---

## User Documentation Checklist

- [ ] Tagline describes what users can DO — not what the tool IS
- [ ] Tagline is specific enough to self-select the right users
- [ ] Input placeholder shows a concrete example prompt
- [ ] Empty state guides the user's first action (not just a logo)
- [ ] 3–5 example prompt cards available and clickable
- [ ] Clicking an example populates the input automatically
- [ ] First-visit welcome explains the tool in under 30 seconds
- [ ] Welcome screen has 3 or fewer steps
- [ ] Welcome screen is not shown again after first visit
- [ ] Tooltips on any UI element that isn't self-explanatory
- [ ] Model gracefully redirects when asked outside its scope
- [ ] +Enter keyboard shortcut works and is discoverable
- [ ] README covers setup in under 10 minutes (if sharing the repo)
- [ ] .env.example committed with all required variables documented
- [ ] Error messages are plain language (no raw API errors shown)
- [ ] Tool tested with someone who hasn't seen it before — watched where they got stuck

---

## Common Mistakes

> **Mistake: Writing documentation instead of designing for clarity**
> If the UI requires a paragraph of explanation, the UI needs to change. Documentation is a patch on top of a confusing experience. Fix the experience first.

> **Mistake: Example prompts that are too generic**
> "Ask me anything!" is not an example. "Summarise this meeting transcript and list the action items with owners" shows the user exactly what to do and what to expect. Specificity is what makes examples useful.

> **Mistake: Showing the welcome screen every visit**
> Returning users know how your tool works. Re-showing onboarding every session is friction. Show it once using localStorage, then trust the user.

> **Mistake: Writing a README for users who aren't developers**
> A README is technical documentation for people who will clone and run the code. If you're sharing the tool via a URL, the README is irrelevant to end users. Write for your actual audience.

> **Mistake: Documenting hypothetical questions**
> FAQs written before launch answer questions you imagine users will have. They're almost always wrong about which questions matter. Write documentation in response to real confusion — after real users use the tool.

---

## Completing Phase 4

User Documentation is the final topic in Phase 4 — Deployment.

You have now covered:

```
 Security
 Cost Controls
 Hosting
 User Documentation
```

Your AI tool is built, secured, deployed, cost-controlled, and documented. **Phase 5 — Growth** is next, starting with **Analytics** — understanding how people actually use what you've built.
