---
title: Reusable Components
slug: reusable-components
phase: Phase 3
mode: production
projectType: web-app
estimatedTime: 30–40 min
---

# Reusable Components

The difference between a codebase that scales and one that collapses under its own weight is almost always component design.

Bad components couple UI, logic, and data together. Good components separate concerns, accept props cleanly, and compose into larger systems without fighting you.

This module teaches you how experienced engineers design component systems — not just how to write React.

---

## The Core Principle

> **A component should do one thing and accept what it needs as props.**

If you can't describe a component in one sentence without using "and," it's doing too much.

```
❌ "UserCard fetches user data, formats the date, shows an avatar, and handles the follow button click"
✅ "UserCard displays a user's profile summary"
✅ "FollowButton handles the follow/unfollow action for a given userId"
```

Split on responsibility. Not on size.

---

## Component Anatomy

Every component in production belongs to one of three layers:

```
┌─────────────────────────────────────┐
│          Feature Components         │  ← Business logic lives here
│  (UserProfile, CheckoutFlow, Feed)  │
├─────────────────────────────────────┤
│            UI Components            │  ← Pure display, no business logic
│   (Card, Button, Avatar, Badge)     │
├─────────────────────────────────────┤
│          Primitive / Base           │  ← Unstyled or minimally styled
│    (shadcn/ui, Radix, headless)     │
└─────────────────────────────────────┘
```

**Rule:** UI components must never fetch data or call APIs. Feature components orchestrate. UI components render.

---

## Props Design

Props are the API of your component. Design them deliberately.

### Be specific with types

```typescript
// ❌ Vague
interface ButtonProps {
  type?: string
  size?: string
  onClick?: any
}

// ✅ Precise
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  isLoading?: boolean
  disabled?: boolean
  children: React.ReactNode
}
```

### Prefer composition over configuration

```tsx
// ❌ Configuration hell — one component trying to be everything
<Modal
  title="Delete Account"
  body="This action cannot be undone."
  primaryButtonText="Delete"
  primaryButtonVariant="destructive"
  secondaryButtonText="Cancel"
  showCloseButton
  onPrimary={handleDelete}
  onSecondary={handleCancel}
/>

// ✅ Composable — caller decides structure
<Modal>
  <ModalHeader>Delete Account</ModalHeader>
  <ModalBody>This action cannot be undone.</ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
  </ModalFooter>
</Modal>
```

Composable components survive requirements changes. Configuration-based components get new props every sprint until they collapse.

---

## The Variant Pattern

The cleanest way to handle visual states without prop explosion.

```typescript
import { cva, type VariantProps } from 'class-variance-authority'

const button = cva(
  // base styles always applied
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  isLoading?: boolean
  children: React.ReactNode
}

export function Button({ variant, size, isLoading, children, className, ...props }: ButtonProps) {
  return (
    <button className={button({ variant, size, className })} disabled={isLoading} {...props}>
      {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}
```

This pattern scales. Adding a new variant is one addition to the object — not a new prop, new conditional, new class string.

---

## The `asChild` Pattern

Lets consumers change what HTML element a component renders as, without losing styling.

```tsx
// Without asChild — forces <button> wrapper around your Link
<Button>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
// Renders: <button><a href="/dashboard">Go to Dashboard</a></button> ❌ nested interactive elements

// With asChild — Button styles, Link semantics
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
// Renders: <a href="/dashboard" class="...button styles...">Go to Dashboard</a> ✅
```

Radix UI and shadcn/ui use this pattern throughout. Learn to recognize when you need it.

---

## Forwarding Refs

Required when a parent needs direct DOM access to your component — focus management, animations, third-party integrations.

```typescript
// Without forwardRef — parent can't ref this
export function Input({ ...props }) {
  return <input {...props} />
}

// ✅ With forwardRef
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn('...base styles...', className)}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'
```

**Rule:** Any component that renders a native DOM element (`input`, `button`, `div`, `textarea`) should forward its ref. Do this from the start. Retrofitting it later breaks consumers.

---

## Server vs Client Components

In Next.js App Router, every component is a server component by default. This is a good thing — server components have zero JS bundle cost.

**Keep components server-side unless they need:**
- `useState` / `useReducer`
- `useEffect`
- Browser APIs (`window`, `document`, `localStorage`)
- Event listeners
- Third-party libraries that use any of the above

```typescript
// ✅ Server component — no 'use client', fetches data directly
export async function UserProfile({ userId }: { userId: string }) {
  const user = await db.user.findUnique({ where: { id: userId } })
  return <ProfileCard user={user} />
}

// ✅ Client component — needs interactivity
'use client'
export function FollowButton({ targetUserId }: { targetUserId: string }) {
  const [isFollowing, setIsFollowing] = useState(false)
  // ...
}
```

**Critical:** `'use client'` is a boundary, not a label. It marks where the server-to-client transition happens. Everything imported into a client component becomes client-side too.

```
// ❌ Contamination — HeavyChart pulls all its dependencies into the client bundle
'use client'
import { HeavyChart } from './HeavyChart' // now client-side

// ✅ Isolation — lazy load client components
const HeavyChart = dynamic(() => import('./HeavyChart'), { ssr: false })
```

---

## Component Folder Structure

```
src/components/
├── ui/                    # Pure UI components (shadcn/ui + custom)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── modal/
│       ├── modal.tsx
│       ├── modal-header.tsx
│       ├── modal-body.tsx
│       └── modal-footer.tsx
├── features/              # Feature-specific components
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── oauth-buttons.tsx
│   ├── dashboard/
│   │   ├── stats-grid.tsx
│   │   └── activity-feed.tsx
│   └── billing/
│       └── plan-selector.tsx
└── layouts/               # Page-level structural components
    ├── app-shell.tsx
    ├── sidebar.tsx
    └── top-nav.tsx
```

**Colocate tests and stories next to components**, not in a separate `/tests` directory. `button.test.tsx` lives beside `button.tsx`.

---

## The cn() Utility

Essential for merging Tailwind classes correctly. Without it, duplicate utilities produce unpredictable results.

```typescript
// utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage
<div className={cn('p-4 bg-white', isActive && 'bg-blue-50', className)} />
```

Install both: `npm install clsx tailwind-merge`

---

## Loading & Error States

Every component that fetches data needs three states. Design all three before coding any of them.

```tsx
// ✅ Component designed for all three states
export function UserCard({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useUser(userId)

  if (isLoading) return <UserCardSkeleton />
  if (error) return <UserCardError message={error.message} onRetry={() => refetch()} />
  if (!user) return null

  return <UserCardContent user={user} />
}

// Skeleton matches the actual layout
function UserCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-32 rounded bg-muted animate-pulse" />
        <div className="h-3 w-24 rounded bg-muted animate-pulse" />
      </div>
    </div>
  )
}
```

> ⚠️ **Warning:** Skeletons should match the shape of the real content. A generic spinner where a card will appear causes layout shift. Users notice.

---

## Accessibility Defaults

Bake these in at component creation time. Retrofitting accessibility is expensive.

```tsx
// ✅ Accessible button
export function IconButton({ icon, label, ...props }: IconButtonProps) {
  return (
    <button aria-label={label} {...props}>
      {icon}
    </button>
  )
}

// ✅ Accessible form field (label always connected to input)
export function FormField({ label, id, error, ...props }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
```

---

## AI Prompt: Component Design Review

Use after sketching a component or writing a first draft.

```
You are a senior React engineer reviewing component design for a production Next.js 14 app using TypeScript, Tailwind CSS, and shadcn/ui.

Here is the component I've designed:
[paste your component code]

Context:
- Where it's used: [describe usage]
- What data it needs: [describe data dependencies]
- Variants or states it needs to handle: [list them]

Review and:
1. Identify prop design issues (too broad, missing types, unclear naming)
2. Flag server/client boundary mistakes
3. Identify missing states (loading, error, empty)
4. Point out any accessibility gaps
5. Suggest if this component should be split into smaller pieces
6. Flag any performance concerns (unnecessary re-renders, missing memoization)

Output a corrected version with comments explaining each change.
```

---

## Implementation Checklist

- [ ] UI components have no data fetching — props only
- [ ] All props are typed precisely (no `any`, no generic `string` where a union is appropriate)
- [ ] Components that render native DOM elements forward their ref
- [ ] `'use client'` only used where genuinely needed
- [ ] Heavy client components use `next/dynamic` with `ssr: false`
- [ ] All data-fetching components handle loading, error, and empty states
- [ ] Skeletons match the shape of real content
- [ ] `cn()` utility used for all conditional class merging
- [ ] Interactive elements have accessible labels (`aria-label`, `htmlFor`)
- [ ] Component folder structure separates ui / features / layouts

---

## Common Mistakes

**Putting data fetching in UI components.**
The moment a UI component calls an API, it becomes impossible to reuse, test, or render in isolation. Fetch in feature components. Pass data as props to UI components.

**One giant component file.**
A 400-line component file is a code smell. If you can't see the entire component on one screen, it probably does too much. Split it.

**Skipping `forwardRef` on input/button components.**
You'll need it the moment someone adds focus management, a form library, or an animation library. Add it upfront.

**Putting `'use client'` at the top of every component "just in case."**
You're opting out of server components everywhere. Bundle size grows. Performance degrades. Only mark what actually needs it.

---

## Quick Reference

```
UI component needs data?          → Move data fetching up, pass as props
Component renders DOM element?    → Add forwardRef
Conditional Tailwind classes?     → Use cn()
Component > 200 lines?            → Split it
Needs useState/useEffect?         → Add 'use client'
Heavy library in client component? → Use next/dynamic
```

---

## What's Next

**State Management** — now that you have clean component boundaries, the next question is where state lives and how it flows between components. The component structure you build now determines how complex your state management needs to be.
