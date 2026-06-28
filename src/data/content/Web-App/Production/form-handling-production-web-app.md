---
title: Form Handling
slug: form-handling
phase: Phase 3
mode: production
projectType: web-app
estimatedTime: 25–35 min
---

# Form Handling

Forms are where most frontend applications expose their worst engineering.

Uncontrolled validation timing. Error messages that appear before the user finishes typing. Submissions that fire twice. Loading states that never clear. Data that reaches the server malformed.

Production form handling is a solved problem. This module shows you the solution.

---

## The Stack

Don't build form logic from scratch. The ecosystem has mature, composable tools for each layer.

```
┌─────────────────────────────────────────┐
│           React Hook Form               │  ← Form state, validation trigger, errors
├─────────────────────────────────────────┤
│                  Zod                    │  ← Schema definition, type inference
├─────────────────────────────────────────┤
│           TanStack Query                │  ← Submission via useMutation
├─────────────────────────────────────────┤
│        shadcn/ui Form Components        │  ← Accessible, connected to RHF
└─────────────────────────────────────────┘
```

```bash
npm install react-hook-form zod @hookform/resolvers
```

These three libraries are the industry standard. React Hook Form has ~10M weekly downloads for a reason — it avoids re-renders on every keystroke by using uncontrolled inputs, and its API is designed for exactly this stack.

---

## Schema-First Form Design

Define your schema before your UI. The schema is the source of truth for both validation and TypeScript types.

```typescript
// schemas/auth.ts
import { z } from 'zod'

export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),

  confirmPassword: z.string(),

  role: z.enum(['member', 'admin'], {
    errorMap: () => ({ message: 'Select a valid role' }),
  }),
})
// Cross-field validation
.refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// Infer the type — no duplication
export type SignUpInput = z.infer<typeof signUpSchema>
```

This schema validates on the client. You will also validate on the server with the same schema. One schema, two enforcement points.

---

## Complete Form Implementation

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { signUpSchema, type SignUpInput } from '@/schemas/auth'

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: 'member',
    },
  })

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: (data: SignUpInput) =>
      fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(async r => {
        if (!r.ok) {
          const error = await r.json()
          throw error
        }
        return r.json()
      }),

    onSuccess: () => {
      reset()
      // redirect or show success state
    },

    onError: (error: { field?: keyof SignUpInput; message: string }) => {
      if (error.field) {
        // Server returned a field-specific error (e.g., "email already in use")
        setError(error.field, { message: error.message })
      } else {
        // Generic server error
        setError('root', { message: error.message ?? 'Something went wrong' })
      }
    },
  })

  return (
    <form onSubmit={handleSubmit(data => signUp(data))} noValidate>
      {/* Root-level error (server errors not tied to a field) */}
      {errors.root && (
        <div role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {errors.root.message}
        </div>
      )}

      <div className="space-y-4">
        <FormField label="Email" id="email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="input"
            {...register('email')}
          />
        </FormField>

        <FormField label="Password" id="password" error={errors.password?.message}>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            className="input"
            {...register('password')}
          />
        </FormField>

        <FormField label="Confirm Password" id="confirmPassword" error={errors.confirmPassword?.message}>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            className="input"
            {...register('confirmPassword')}
          />
        </FormField>

        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="btn-primary w-full"
        >
          {isPending ? 'Creating account…' : 'Create account'}
        </button>
      </div>
    </form>
  )
}
```

---

## Validation Timing

When errors appear matters as much as what they say.

```typescript
// Default: validate on submit only
useForm({ resolver: zodResolver(schema) })

// Validate on change after first submission attempt (recommended)
useForm({
  resolver: zodResolver(schema),
  mode: 'onTouched',  // validate after field loses focus
})

// Options
// 'onSubmit'  — validate only on submit (default)
// 'onBlur'    — validate when field loses focus
// 'onTouched' — validate on blur, then on change after first blur
// 'onChange'  — validate on every keystroke (avoid — noisy)
// 'all'       — validate everywhere
```

**Recommended:** `onTouched`. Validates after the user has finished interacting with a field. Doesn't fire while they're still typing. Fires immediately on re-entry once they've already seen an error.

---

## Server-Side Validation

Client validation is UX. Server validation is security. Always do both.

```typescript
// app/api/auth/signup/route.ts
import { signUpSchema } from '@/schemas/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  // Same schema, server-side enforcement
  const result = signUpSchema.safeParse(body)

  if (!result.success) {
    // Return structured validation errors
    return NextResponse.json(
      {
        message: 'Validation failed',
        errors: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    )
  }

  const { email, password, role } = result.data

  // Check business logic constraints
  const existingUser = await db.user.findUnique({ where: { email } })
  if (existingUser) {
    return NextResponse.json(
      { field: 'email', message: 'An account with this email already exists' },
      { status: 409 }
    )
  }

  // Proceed with creation...
}
```

>  **Warning:** Never trust client-side validation alone. A user can disable JavaScript, modify requests in DevTools, or call your API directly. Server validation is non-negotiable.

---

## Complex Form Patterns

### Dynamic Fields (Field Arrays)

```typescript
import { useFieldArray } from 'react-hook-form'

const teamSchema = z.object({
  name: z.string().min(1),
  members: z.array(
    z.object({
      email: z.string().email(),
      role: z.enum(['viewer', 'editor', 'admin']),
    })
  ).min(1, 'Add at least one member'),
})

function TeamForm() {
  const { control, register, formState: { errors } } = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: { name: '', members: [{ email: '', role: 'viewer' }] },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  })

  return (
    <form>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <input {...register(`members.${index}.email`)} placeholder="Email" />
          <select {...register(`members.${index}.role`)}>
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
          <button type="button" onClick={() => remove(index)}>Remove</button>
          {errors.members?.[index]?.email && (
            <p>{errors.members[index].email.message}</p>
          )}
        </div>
      ))}
      <button type="button" onClick={() => append({ email: '', role: 'viewer' })}>
        Add member
      </button>
    </form>
  )
}
```

### Multi-Step Forms

```typescript
const stepSchemas = [
  z.object({ email: z.string().email(), password: z.string().min(8) }),
  z.object({ firstName: z.string().min(1), lastName: z.string().min(1) }),
  z.object({ plan: z.enum(['free', 'pro', 'team']) }),
]

function MultiStepForm() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})

  const form = useForm({
    resolver: zodResolver(stepSchemas[step]),
  })

  const onNext = form.handleSubmit((data) => {
    setFormData(prev => ({ ...prev, ...data }))
    if (step < stepSchemas.length - 1) {
      setStep(s => s + 1)
    } else {
      // Final submit with all accumulated data
      submitAllData({ ...formData, ...data })
    }
  })

  return (
    <form onSubmit={onNext}>
      <StepIndicator current={step} total={stepSchemas.length} />
      {step === 0 && <AccountStep form={form} />}
      {step === 1 && <ProfileStep form={form} />}
      {step === 2 && <PlanStep form={form} />}
      <div className="flex gap-2">
        {step > 0 && (
          <button type="button" onClick={() => setStep(s => s - 1)}>Back</button>
        )}
        <button type="submit">{step === stepSchemas.length - 1 ? 'Complete' : 'Next'}</button>
      </div>
    </form>
  )
}
```

---

## File Uploads

```typescript
const uploadSchema = z.object({
  title: z.string().min(1),
  file: z
    .instanceof(FileList)
    .refine(files => files.length > 0, 'File is required')
    .refine(files => files[0]?.size <= 5_000_000, 'File must be under 5MB')
    .refine(
      files => ['image/jpeg', 'image/png', 'image/webp'].includes(files[0]?.type),
      'Only JPEG, PNG, and WebP are allowed'
    ),
})

// Submission — use FormData, not JSON
const onSubmit = handleSubmit(async (data) => {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('file', data.file[0])

  await fetch('/api/upload', { method: 'POST', body: formData })
  // Do NOT set Content-Type — browser sets it with boundary automatically
})

// Input registration
<input
  type="file"
  accept="image/jpeg,image/png,image/webp"
  {...register('file')}
/>
```

---

## Form UX Rules

These are not preferences. These are the baseline for production forms.

| Rule | Reason |
|---|---|
| Always use `noValidate` on `<form>` | Browser native validation is inconsistent and unstyled |
| Use `autocomplete` attributes | Saves users time, required for password managers to work |
| Show errors below the specific field | Users read top-to-bottom; errors should follow the label |
| Disable submit during `isPending` | Prevent double submission |
| Never clear fields on server error | Users shouldn't re-type everything after a failed submit |
| Label every input explicitly with `htmlFor` | Screen readers and click targets |
| Use `type="email"`, `type="password"` | Mobile keyboard optimization |
| Show character counts on limited fields | Users shouldn't hit limits by surprise |

---

## shadcn/ui Form Integration

If using shadcn/ui, use its Form components — they wire up React Hook Form context automatically.

```typescript
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'

function ProfileForm() {
  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage /> {/* auto-renders error from RHF */}
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
```

---

## AI Prompt: Form Schema and Validation Design

```prompt
You are a senior frontend engineer helping design form validation for a production Next.js app using React Hook Form, Zod, and TanStack Query.

Form purpose: [describe what this form does]

Fields needed:
[list each field, its type, and any constraints — e.g., "email: must be valid email", "age: integer 18-120", "bio: optional, max 280 chars"]

Cross-field constraints:
[describe any relationships between fields — e.g., "end date must be after start date", "confirm password must match password"]

Server constraints (things only the server can validate):
[e.g., "email must not already exist", "username must be unique"]

Generate:
1. A complete Zod schema with clear error messages for each field
2. The inferred TypeScript type
3. A React Hook Form setup with the correct mode and defaultValues
4. The onError handler that maps server field errors back to form fields
5. Flag any UX issues in my field list (e.g., fields that should be split, constraints that are too strict)
```

---

## Implementation Checklist

- [ ] Zod schema defined before form UI — schema is the source of truth
- [ ] `zodResolver` connected to `useForm`
- [ ] Form mode set to `onTouched` for appropriate validation timing
- [ ] `defaultValues` provided for all fields (avoids uncontrolled → controlled warnings)
- [ ] Submit wired through `useMutation` — not manual `fetch` in `handleSubmit`
- [ ] Server errors mapped back to fields via `setError`
- [ ] Root-level error displayed for non-field server errors
- [ ] Submit button disabled during `isPending`
- [ ] `noValidate` on `<form>` element
- [ ] `autocomplete` attributes on all inputs
- [ ] `aria-invalid` set based on field error state
- [ ] Same Zod schema used for server-side validation in API route
- [ ] File uploads use `FormData`, not JSON

---

## Common Mistakes

**Validating in `onChange` from the start.**
Every keystroke triggers validation. Error messages flash while the user is still typing. Use `onTouched` — validate when they leave the field, not while they're in it.

**Only validating on the client.**
A user with curl or Postman bypasses your entire form. Server validation with the same Zod schema is not optional.

**Not mapping server errors to fields.**
The server says "email already in use" and you show a toast. The user doesn't know which field to fix. Use `setError('email', { message: '...' })` to put the error exactly where it belongs.

**Using `useState` for form field values.**
Every keystroke causes a re-render of the entire form. React Hook Form uses uncontrolled inputs and only re-renders affected fields. Don't fight the library.

**Clearing all fields on failed submission.**
One of the worst UX patterns possible. Users lose all their work because of a server error they couldn't prevent. Never call `reset()` on error.

---

## Quick Reference

```
Form library?                    → React Hook Form
Schema / validation?             → Zod + zodResolver
Submission?                      → useMutation
When to validate?                → onTouched mode
Server field errors?             → setError(fieldName, { message })
Generic server errors?           → setError('root', { message })
File upload encoding?            → FormData (not JSON)
Multi-step state?                → accumulate with useState between steps
```

---

## What's Next

**Browser APIs** — the final module of Phase 3 covers how to safely access browser-specific APIs (clipboard, geolocation, storage, intersections, media queries) in a Next.js App Router environment where components can run on both server and client.
