---
title: Browser APIs
slug: browser-apis
phase: Phase 3
mode: personal
projectType: web-app
estimatedTime: 25–35 min
---

# Browser APIs

The browser ships with powerful capabilities that most developers underuse. Local storage, clipboard access, notifications, file handling, geolocation — these are available without any npm package, any API key, or any backend.

Used well, they make your app feel native. Used carelessly, they create bugs that only appear in production on devices you don't own.

---

## The Landscape

Not all browser APIs are equal. Some are universally supported. Some require permissions. Some only work in secure contexts (HTTPS). Some are unavailable in SSR environments like Next.js.

| API | Support | Permission Required | SSR Safe |
|---|---|---|---|
| localStorage | Universal | No |  |
| sessionStorage | Universal | No |  |
| Clipboard | Modern browsers | Yes (write) |  |
| Notifications | Modern browsers | Yes |  |
| Geolocation | Universal | Yes |  |
| File System Access | Chrome/Edge only | Yes |  |
| IntersectionObserver | Universal | No |  |
| Web Share | Mobile + some desktop | No |  |

> [!WARNING]
> Every browser API will crash your Next.js app if called during server-side rendering. The window, document, and navigator objects don't exist on the server. Always guard browser API calls.

---

## The SSR Guard Pattern

Use this before every browser API call in a Next.js (or any SSR) app.

```typescript
// lib/browser.ts

export const isBrowser = typeof window !== 'undefined'

// Safe wrapper — returns undefined on the server
export function safeLocalStorage() {
  if (!isBrowser) return null
  return window.localStorage
}
```

```typescript
// In a component or hook
'use client'  // Required in Next.js App Router for any browser API usage

import { isBrowser } from '@/lib/browser'

useEffect(() => {
  if (!isBrowser) return
  // safe to use browser APIs here
}, [])
```

Or more simply — any browser API inside `useEffect` is safe because effects only run client-side.

---

## localStorage

The most-used browser API. Persists data across sessions. Perfect for preferences, drafts, and UI state that doesn't need to live in your database.

**The right abstraction:**

```typescript
// lib/storage.ts
export function getItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : fallback
  } catch {
    return fallback
  }
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    // Storage quota exceeded or private browsing
    console.warn('localStorage write failed:', e)
  }
}

export function removeItem(key: string): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(key)
}
```

**As a typed React hook:**

```typescript
// hooks/use-local-storage.ts
'use client'
import { useState, useEffect } from 'react'
import { getItem, setItem } from '@/lib/storage'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    setValue(getItem(key, initialValue))
  }, [key])

  const set = (newValue: T) => {
    setValue(newValue)
    setItem(key, newValue)
  }

  return [value, set] as const
}
```

```typescript
// Usage — persists theme preference across sessions
const [theme, setTheme] = useLocalStorage('theme', 'light')
```

> [!WARNING]
> localStorage is synchronous and blocks the main thread on large reads/writes. Never store more than a few KB. For larger data, use IndexedDB or your database.

**What belongs in localStorage:**
- UI preferences (theme, sidebar state, density)
- Draft content (form state the user hasn't submitted yet)
- Recently viewed items
- Feature flag overrides (dev only)

**What does not belong in localStorage:**
- Auth tokens (use httpOnly cookies instead — localStorage is accessible to any JS on the page, making it vulnerable to XSS)
- Sensitive user data
- Large datasets

---

## Clipboard API

Copying to clipboard is expected functionality. The old `document.execCommand('copy')` is deprecated. Use the modern Clipboard API.

```typescript
// hooks/use-clipboard.ts
'use client'
import { useState } from 'react'

export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = async (text: string) => {
    if (!navigator.clipboard) {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), timeout)
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), timeout)
    } catch {
      console.error('Clipboard write failed')
    }
  }

  return { copy, copied }
}
```

```typescript
// Usage
function CopyButton({ text }: { text: string }) {
  const { copy, copied } = useClipboard()

  return (
    <button onClick={() => copy(text)}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}
```

---

## IntersectionObserver

Detects when an element enters or leaves the viewport. Useful for lazy loading, infinite scroll, and scroll-triggered animations — without any scroll event listeners.

```typescript
// hooks/use-intersection.ts
'use client'
import { useEffect, useRef, useState } from 'react'

export function useIntersection(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isIntersecting }
}
```

```typescript
// Infinite scroll trigger
function PostFeed() {
  const { ref, isIntersecting } = useIntersection({ threshold: 0.1 })
  const { fetchNextPage, hasNextPage } = useInfinitePostsQuery()

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  }, [isIntersecting])

  return (
    <div>
      {/* posts */}
      <div ref={ref} className="h-4" />  {/* invisible trigger element */}
    </div>
  )
}
```

This is the correct pattern for infinite scroll. Not a scroll event listener.

---

## Web Share API

On mobile, this opens the native share sheet. On desktop, it falls back gracefully (or you can hide it).

```typescript
// hooks/use-share.ts
'use client'

export function useShare() {
  const canShare = typeof navigator !== 'undefined' && !!navigator.share

  const share = async (data: ShareData) => {
    if (!canShare) {
      // Fallback: copy URL to clipboard
      await navigator.clipboard.writeText(data.url ?? window.location.href)
      return
    }

    try {
      await navigator.share(data)
    } catch (e) {
      // User cancelled — not an error
      if ((e as Error).name !== 'AbortError') {
        console.error('Share failed:', e)
      }
    }
  }

  return { share, canShare }
}
```

```typescript
// Usage
const { share } = useShare()

<button onClick={() => share({
  title: post.title,
  text: post.excerpt,
  url: `https://yourapp.com/posts/${post.slug}`
})}>
  Share
</button>
```

---

## Geolocation

Ask for the user's location. Always explain why before requesting permission — browsers that are denied permissions once rarely ask again.

```typescript
// hooks/use-geolocation.ts
'use client'
import { useState } from 'react'

type GeolocationState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; lat: number; lng: number }
  | { status: 'error'; message: string }

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({ status: 'idle' })

  const request = () => {
    if (!navigator.geolocation) {
      setState({ status: 'error', message: 'Geolocation not supported' })
      return
    }

    setState({ status: 'loading' })

    navigator.geolocation.getCurrentPosition(
      (pos) => setState({
        status: 'success',
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }),
      (err) => setState({ status: 'error', message: err.message }),
      { timeout: 10000, maximumAge: 300000 }  // 5 min cache
    )
  }

  return { ...state, request }
}
```

> [!TIP]
> Set `maximumAge` to cache the position for a few minutes. Requesting GPS repeatedly drains battery and annoys users.

---

## Prompt: Generate a Browser API Hook

```
Copy Prompt
```

```
I'm building a Next.js App Router app with TypeScript.

Generate a custom React hook for [browser API / feature description].

Requirements:
- Mark the file with 'use client' at the top
- Guard against SSR (typeof window checks or useEffect)
- Handle the case where the API is not supported in the current browser
- Use TypeScript with explicit return types
- Handle permission denial gracefully
- Clean up any event listeners or observers in the useEffect return function
- Export a single named hook

The hook should return an object (not an array) with clearly named properties.

Do not generate:
- Component code
- Test files
- Documentation comments

Only the hook file.
```

---

## Validation Checklist

Before shipping any browser API integration:

- [ ] All browser API calls are inside `useEffect` or guarded with `typeof window !== 'undefined'`
- [ ] The component or file is marked `'use client'` in Next.js App Router
- [ ] API availability is checked before use (`navigator.clipboard`, `navigator.geolocation`, etc.)
- [ ] Event listeners and observers are cleaned up in the `useEffect` return function
- [ ] Permission denial is handled gracefully — the app doesn't crash or freeze
- [ ] localStorage is not used to store auth tokens or sensitive data
- [ ] Error states are surfaced to the user, not silently swallowed

---

## What Comes Next

Phase 3 is complete. You have a frontend, a backend, an ORM talking to your database, clean data fetching, and browser APIs wired in where they add value.

**Phase 4 — Production Lite** picks up here:

- **Performance** — finding and fixing slow spots before users do
- **Deployment** — getting your app running on a real URL
- **Security Basics** — the minimum security posture every shipped app needs

You've built something. Now make it shippable.
