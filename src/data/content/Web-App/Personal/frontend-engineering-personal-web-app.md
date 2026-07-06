---
title: Frontend Engineering
slug: frontend-engineering
phase: Phase 3
mode: personal
projectType: web app
estimatedTime: 35–50 min
---

# Frontend Engineering

This is where most of the actual building happens. Your design system is defined, your user flows are mapped, your backend is planned — now you translate all of that into working React components.

This module isn't a React tutorial. It's an opinionated guide to structuring, building, and maintaining a frontend that doesn't become a mess six weeks in.

---

## Project Structure

How you organize your files determines how easy it is to find things, extend things, and not break things. Start with this structure and grow it only when you have a reason to.

```
src/
├── components/        # Reusable UI components (Button, Card, Input)
│   └── ui/            # Design system primitives
├── pages/             # One file per route (Dashboard, Login, Settings)
├── features/          # Feature-specific components and logic
│   └── habits/        # e.g., HabitCard, HabitForm, useHabits
├── hooks/             # Shared custom hooks (useAuth, useDebounce)
├── lib/               # Third-party client setup (supabase.ts, api.ts)
├── types/             # TypeScript types and interfaces
├── utils/             # Pure utility functions
└── styles/            # Global CSS, tokens
```

> [!TIP]
> When a file in `components/` grows to include business logic or starts importing from `lib/`, it belongs in `features/`. The cleaner the separation between generic UI components and feature-specific logic, the easier the codebase is to navigate solo.

---

## Component Design Principles

### One responsibility per component

A component does one thing. A `HabitCard` displays a habit. It does not also fetch habits, manage auth state, or handle navigation. Those concerns belong elsewhere.

If a component is doing too much, split it:
- Data fetching → custom hook (`useHabits`)
- Display → presentational component (`HabitCard`)
- Business logic → utility or service function

### Props over internal state where possible

Components that receive data via props are easier to test, easier to reuse, and easier for AI tools to reason about.

```tsx
// Harder to reuse — fetches its own data
function HabitCard({ habitId }: { habitId: string }) {
  const [habit, setHabit] = useState(null)
  useEffect(() => { fetchHabit(habitId).then(setHabit) }, [habitId])
  return <div>{habit?.name}</div>
}

// Easier to reuse — receives data via props
function HabitCard({ habit }: { habit: Habit }) {
  return <div>{habit.name}</div>
}
```

### TypeScript interfaces for everything

Define the shape of your data once, in `src/types/`, and import it everywhere. This makes AI-generated code far more accurate and catches entire categories of bugs at compile time.

```ts
// src/types/index.ts
export interface User {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
  createdAt: string
}

export interface Habit {
  id: string
  userId: string
  name: string
  description: string | null
  frequency: 'daily' | 'weekly'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface HabitLog {
  id: string
  habitId: string
  loggedDate: string
  note: string | null
  createdAt: string
}
```

---

## Building Your Component Library

Before building any page, build the four core components from your design system. These become the foundation everything else is assembled from.

**Copy Prompt — Core Components**

```
I'm building a React + TypeScript + Tailwind web app.

Here is my design system: [paste your CSS token file or describe your colors, fonts, spacing]

Generate these four components:
1. Button — variants: primary, secondary, ghost, danger. Props: variant, size (sm/md/lg), loading state, disabled state, onClick, children
2. Input — Props: label, placeholder, value, onChange, error message, disabled
3. Card — Props: children, className (for extension), optional padding override
4. Badge — Props: children, variant (default/success/warning/danger)

Requirements:
- TypeScript with proper prop types
- Tailwind classes only (no inline styles)
- Accessible: proper labels, focus states, ARIA where needed
- Export each as a named export

Return clean, minimal components. No unnecessary abstractions.
```

---

## Page Structure Pattern

Every page follows the same pattern: load data, handle loading and error states, render UI.

```tsx
// src/pages/Dashboard.tsx
import { useHabits } from '@/features/habits/useHabits'
import { HabitCard } from '@/features/habits/HabitCard'
import { EmptyState } from '@/components/EmptyState'
import { Spinner } from '@/components/Spinner'

export function Dashboard() {
  const { habits, isLoading, error } = useHabits()

  if (isLoading) return <Spinner />
  if (error) return <ErrorMessage message={error.message} />
  if (!habits.length) return (
    <EmptyState
      title="No habits yet"
      description="Add your first habit to get started."
      action={{ label: 'Add Habit', onClick: () => {} }}
    />
  )

  return (
    <div className="grid gap-4">
      {habits.map(habit => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  )
}
```

Three states, always: loading, error, data. Never assume data exists. Never skip the empty state — it's the first thing a new user sees.

---

## Custom Hooks for Data

Every data concern lives in a custom hook. Pages and components never call Supabase directly.

```ts
// src/features/habits/useHabits.ts
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Habit } from '@/types'

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchHabits() {
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) setError(new Error(error.message))
      else setHabits(data ?? [])
      setIsLoading(false)
    }

    fetchHabits()
  }, [])

  return { habits, isLoading, error }
}
```

> [!TIP]
> This pattern scales well with React Query if you add it later. The hook interface stays identical — you just swap the internals. Starting with `useState` + `useEffect` keeps things simple until you actually need caching and invalidation.

---

## Forms

Forms are where most frontend complexity lives. Keep them simple.

For personal projects, uncontrolled forms with the native `FormData` API or lightweight controlled inputs are enough. Reach for a form library (React Hook Form) only when you have complex validation logic or dynamic fields.

```tsx
// A minimal controlled form
function AddHabitForm({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setError('Habit name is required')
      return
    }
    onSubmit(name.trim())
    setName('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Habit name"
        value={name}
        onChange={e => setName(e.target.value)}
        error={error}
        placeholder="e.g. Read for 20 minutes"
      />
      <Button type="submit">Add Habit</Button>
    </form>
  )
}
```

---

## State Management

For personal projects, start with React's built-in state tools. Add a library only when you hit a specific problem they solve.

| Situation | Solution |
|---|---|
| Component-local state | `useState` |
| Shared state between nearby components | Lift state up to common parent |
| Auth state needed across the whole app | React Context (`AuthContext`) |
| Server data (fetching, caching, mutations) | React Query (add when `useEffect` data fetching gets repetitive) |
| Complex global UI state | Zustand (add only if Context becomes unwieldy) |

> [!WARNING]
> Adding Redux, MobX, or Jotai to a personal project before you've hit a real state management problem is over-engineering. `useState` and Context handle the vast majority of personal project needs. Add complexity only when you feel the specific pain it solves.

---

## Using AI to Build Features

AI is most effective when you give it a complete picture of one specific feature. Not the whole app.

**Copy Prompt — Feature Implementation**

```
I'm building a feature for my personal web app.

Here is my PRD: [paste PRD]
Here are the relevant types: [paste from src/types/index.ts]
Here is the user flow for this feature: [paste the relevant flow from USER_FLOWS.md]

Build the following:
1. A custom hook: [hook name] — fetches [data], exposes [what it returns]
2. A component: [component name] — displays [what], handles [interactions]
3. Any helper functions needed

Requirements:
- TypeScript throughout
- Tailwind for styling, using these design tokens: [paste tokens]
- Handle loading, error, and empty states
- Keep each file focused — no mixing of data fetching and display logic
- No external libraries beyond what's already in the stack

Return each file separately with its full path. No explanations.
```

---

## Validating AI-Generated Components

Before accepting AI-generated frontend code:

- [ ] Does every prop have a TypeScript type?
- [ ] Are loading, error, and empty states all handled?
- [ ] Are there any hardcoded values that should come from design tokens?
- [ ] Does the component do more than one thing? If so, split it.
- [ ] Are there `any` types hiding a real type that should be defined?
- [ ] Does it use `console.log` statements that weren't in the prompt? (Remove them.)
- [ ] Are there `useEffect` calls with missing dependency arrays?
- [ ] Does the form prevent submission of invalid data?

---

## Frontend Engineering Checklist

**Structure**
- [ ] Project follows the `components / pages / features / hooks / lib / types` structure
- [ ] TypeScript interfaces defined for every database entity
- [ ] Supabase client in `src/lib/supabase.ts` — not imported directly in components

**Components**
- [ ] Core components built: Button, Input, Card, Badge
- [ ] Every page handles loading, error, and empty states
- [ ] Forms validate before submission and show inline errors

**Patterns**
- [ ] Data fetching lives in custom hooks, not inside components
- [ ] Pages are composed of feature components — not monolithic files
- [ ] No `any` types in component props or hook return values

---

## What's Next

Move to **Backend Engineering** — building the API layer that handles business logic, data mutations, and anything that can't safely run in the browser.
