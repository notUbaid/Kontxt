---
title: Browser APIs
slug: browser-apis
phase: Phase 3
mode: production
projectType: web-app
estimatedTime: 20–30 min
---

# Browser APIs

Browser APIs are the most common source of cryptic SSR crashes in Next.js applications.

`window is not defined`. `localStorage is not defined`. `document is not defined`. These errors mean one thing: code that assumes a browser environment ran on a server.

This module teaches you how to use browser APIs correctly in a hybrid server/client rendering environment — and which patterns are worth using at all.

---

## The Core Problem

Next.js renders components on the server before sending them to the browser. Browser APIs (`window`, `document`, `localStorage`, `navigator`, `IntersectionObserver`, etc.) do not exist on the server. Accessing them crashes the render.

```
Server environment:
   Node.js APIs
   File system, env vars, DB
   window, document, localStorage
   navigator, IntersectionObserver
   Any DOM API

Browser environment:
   All of the above
   window, document, localStorage
   navigator, IntersectionObserver
   File system, DB (directly)
```

There are three patterns for handling this safely. Know all three — each fits a different scenario.

---

## Pattern 1: `useEffect` Guard

The simplest. `useEffect` only runs in the browser, after hydration. Safe to access any browser API inside.

```typescript
'use client'

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Safe — runs only in browser
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (stored) setTheme(stored)
  }, [])

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next) // also safe — inside event handler
  }

  return <button onClick={toggleTheme}>{theme}</button>
}
```

**When to use:** Reading browser state on mount. Subscribing to browser events. Initializing third-party libraries that require DOM.

---

## Pattern 2: `typeof window !== 'undefined'` Check

For code that must run outside of a React component — utilities, helpers, module-level code.

```typescript
// lib/storage.ts — safe utility wrapper
export const storage = {
  get: (key: string): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  },
  set: (key: string, value: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, value)
  },
  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  },
}

// Usage — safe anywhere
const token = storage.get('auth-token')
```

**When to use:** Utility functions called from both server and client contexts. Module-level code that might be imported by server components.

---

## Pattern 3: `next/dynamic` with `ssr: false`

For entire components that cannot function without the browser — map renderers, canvas-based UIs, drag-and-drop libraries, WebGL.

```typescript
// components/map.tsx — uses browser-only Leaflet library
'use client'
import { MapContainer, TileLayer } from 'react-leaflet'

export function Map({ center, zoom }: MapProps) {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  )
}

// page.tsx — import dynamically, skip SSR entirely
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/map').then(m => m.Map), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-muted animate-pulse rounded-lg" />,
})
```

**When to use:** Third-party libraries that reference `window` or `document` at import time. Components using Canvas, WebGL, or browser-only APIs that can't be conditionally guarded.

---

## Essential Browser APIs

### Clipboard

```typescript
'use client'

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    if (!navigator.clipboard) return // older browsers

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access denied (non-HTTPS, or user denied permission)
      console.error('Clipboard write failed')
    }
  }

  return (
    <button onClick={copy} aria-label="Copy to clipboard">
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  )
}
```

>  **Warning:** `navigator.clipboard` only works on HTTPS. On localhost it works. On HTTP production it silently fails. Always add a fallback or check.

---

### Intersection Observer

The correct way to implement scroll-triggered effects, lazy loading, and infinite scroll. Never use scroll event listeners for visibility detection — IntersectionObserver is more performant and fires off the main thread.

```typescript
'use client'

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, options)

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, isInView }
}

// Usage
function AnimatedSection({ children }: { children: React.ReactNode }) {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {children}
    </div>
  )
}
```

---

### Media Queries (Responsive Logic in JS)

When CSS media queries aren't enough — conditional rendering, different component behavior by breakpoint.

```typescript
'use client'

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

// Usage
function NavBar() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return isMobile ? <MobileNav /> : <DesktopNav />
}
```

>  **Hydration warning:** The server renders with `matches = false` (the `useState` default). If the client immediately renders something different, you get a hydration mismatch. This flicker is acceptable for most cases. If it's not, use CSS for the responsive behavior instead.

---

### Geolocation

```typescript
'use client'

type GeolocationState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; lat: number; lng: number }
  | { status: 'error'; message: string }

function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({ status: 'idle' })

  function request() {
    if (!navigator.geolocation) {
      setState({ status: 'error', message: 'Geolocation not supported' })
      return
    }

    setState({ status: 'loading' })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          status: 'success',
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        setState({
          status: 'error',
          message: error.code === 1 ? 'Location access denied' : 'Unable to get location',
        })
      },
      { timeout: 10_000, maximumAge: 300_000 }
    )
  }

  return { ...state, request }
}
```

**Always request geolocation on user action.** Never call `getCurrentPosition` on mount — browsers block automatic permission requests, and users will deny them reflexively. Tie the request to a button click with clear intent.

---

### `ResizeObserver`

Watch element dimensions change. More precise than `window.resize` for component-level responsiveness.

```typescript
'use client'

function useElementSize(ref: React.RefObject<HTMLElement>) {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return size
}
```

---

### `document.title` and Meta Updates

For dynamic page titles without a full router navigation:

```typescript
'use client'

function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title
    return () => { document.title = previous }
  }, [title])
}

// In Next.js App Router — prefer metadata API over this for SSR
// app/dashboard/page.tsx
export const metadata = {
  title: 'Dashboard | MyApp',
}

// Only use useDocumentTitle for truly dynamic titles (e.g., unread message count)
function ChatHeader({ unreadCount }: { unreadCount: number }) {
  useDocumentTitle(unreadCount > 0 ? `(${unreadCount}) Chat | MyApp` : 'Chat | MyApp')
  return <header>...</header>
}
```

---

### Page Visibility

Stop expensive operations when the user switches tabs.

```typescript
'use client'

function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handler = () => setIsVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [])

  return isVisible
}

// Pause video, polling, or animations when tab is hidden
function LiveFeed() {
  const isVisible = usePageVisibility()

  const { data } = useQuery({
    queryKey: ['feed'],
    queryFn: fetchFeed,
    refetchInterval: isVisible ? 5000 : false, // pause polling when hidden
  })
}
```

---

## Browser API Safety Checklist

Before using any browser API, answer these:

- [ ] Is this component marked `'use client'`?
- [ ] Is the API accessed inside `useEffect`, an event handler, or guarded by `typeof window !== 'undefined'`?
- [ ] Does the component need a loading/fallback state before the browser API initializes?
- [ ] Is permission required (Clipboard, Geolocation, Notifications)? Is it requested on user action?
- [ ] Is the API available in all target browsers? (check MDN compatibility table)
- [ ] Is the observer / event listener cleaned up in the `useEffect` return?
- [ ] For third-party browser-only libraries: is the component imported with `next/dynamic` + `ssr: false`?

---

## Common Mistakes

**Accessing `localStorage` during render.**
`const theme = localStorage.getItem('theme')` at the top of a component crashes on the server. Move it inside `useEffect`.

**Not cleaning up observers and listeners.**
`IntersectionObserver`, `ResizeObserver`, `addEventListener` — all create references that prevent garbage collection if not cleaned up. Always return a cleanup function from `useEffect`.

**Using `window.innerWidth` for responsive logic.**
Returns `0` on server, causing hydration mismatch. Use `useMediaQuery` with `matchMedia`, initialized in `useEffect`.

**Requesting permissions on mount.**
Geolocation, notifications, camera — always request on explicit user action. Auto-requesting on mount gets blocked by browsers and denied by users.

**Importing browser-only libraries at the top level of a page.**
`import Leaflet from 'leaflet'` in a page component causes SSR to fail because Leaflet accesses `window` at import time. Use `next/dynamic` with `ssr: false`.

---

## Quick Reference

```
Browser API in component?           → useEffect guard
Browser API in utility function?    → typeof window !== 'undefined'
Browser-only third-party library?   → next/dynamic + ssr: false
Scroll-based visibility?            → IntersectionObserver
Element dimension changes?          → ResizeObserver
Responsive logic in JS?             → useMediaQuery + matchMedia
Clipboard write?                    → navigator.clipboard (HTTPS only)
Stop work on tab switch?            → document.visibilityState
Dynamic page title?                 → Next.js metadata API (prefer) or useDocumentTitle
```

---

## What's Next

**Phase 3 complete.** You've covered Core Layouts, Routing, Rendering Strategies, Reusable Components, State Management, Data Fetching, Form Handling, and Browser APIs.

**Phase 4 — Backend Engineering** begins with API Design: how to structure your API layer, choose between REST and tRPC, handle versioning, and design endpoints that your frontend can consume cleanly and safely.
