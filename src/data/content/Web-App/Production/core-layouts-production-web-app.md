---
title: Core Layouts
slug: core-layouts
phase: Phase 3
mode: production
projectType: web-app
estimatedTime: 20–25 min
---

# Core Layouts

Layouts are the structural skeleton of your application. They define what persists across pages — the shell that stays mounted while content changes — and they enforce visual consistency without duplication.

Getting layouts right early means every new page inherits the correct structure for free. Getting them wrong means you're copying nav bars into every component and fixing alignment bugs in 30 places.

---

## The Layout Hierarchy

A production web app typically has three distinct layout contexts:

```
Root Layout (layout.tsx)
  ├── Public Layout          → Landing, pricing, blog, login, signup
  │     └── Minimal chrome: logo, nav links, footer
  │
  ├── App Layout             → Dashboard, settings, all authenticated pages
  │     └── Full chrome: sidebar, header, user menu, notifications
  │
  └── Admin Layout           → /admin/* routes
        └── Admin sidebar, elevated visual treatment
```

Each layout wraps a route group. The user never sees layout switching — they see a coherent shell for each section of the product.

---

## Next.js App Router Layout Implementation

Layouts in Next.js are `layout.tsx` files. They wrap their route segment and all children. They stay mounted across navigations within their segment — components don't remount, state isn't lost.

### Root Layout

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: { default: 'Your App', template: '%s | Your App' },
  description: 'Your app description',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

The root layout is minimal. It sets up fonts, global metadata, and global providers (toast, theme). It renders no navigation — that belongs in the route-group layouts.

---

### Public Layout

```tsx
// app/(public)/layout.tsx
import { PublicNav } from '@/components/layout/PublicNav'
import { Footer } from '@/components/layout/Footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

---

### App Layout (Authenticated Shell)

```tsx
// app/(app)/layout.tsx
import { redirect } from 'next/navigation'
import { requireSession } from '@/lib/auth'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession().catch(() => null)
  if (!session) redirect('/login')

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header user={session.user} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

**Key decisions encoded in this layout:**
- Session check happens here — every child page is protected
- `overflow-hidden` on the outer container + `overflow-y-auto` on main = fixed header + scrollable content area
- Sidebar is always visible; content scrolls independently

---

## The Sidebar Component

The sidebar is the primary navigation in most app-layout products. It must handle:

- Active state (current route highlighted)
- Collapsed state (icon-only on mobile or by user preference)
- Grouped navigation items
- User context (avatar, org switcher) at the bottom

```tsx
// components/layout/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FolderOpen,
  Settings,
  Users
} from 'lucide-react'

const navItems = [
  { href: '/dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/projects',   label: 'Projects',   icon: FolderOpen },
  { href: '/team',       label: 'Team',       icon: Users },
  { href: '/settings',  label: 'Settings',   icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <span className="font-semibold">Your App</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-3">
        {/* UserMenu component — avatar, account, sign out */}
      </div>
    </aside>
  )
}
```

---

## The Header Component

The header sits above the main content area. Keep it lean.

```tsx
// components/layout/Header.tsx
import { UserMenu } from './UserMenu'
import { NotificationsBell } from './NotificationsBell'
import type { User } from '@/types'

interface HeaderProps {
  user: User
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div>
        {/* Page title injected via usePathname or slot — see below */}
      </div>
      <div className="flex items-center gap-3">
        <NotificationsBell />
        <UserMenu user={user} />
      </div>
    </header>
  )
}
```

**Page titles in the header:** Use Next.js parallel slots or pass titles via layout slot patterns if you need dynamic page titles in the header. Avoid prop-drilling from every page — it couples pages to the layout.

---

## Page Shell Pattern

Every content page should feel consistent in its internal structure. Define a `PageShell` component used everywhere:

```tsx
// components/layout/PageShell.tsx
interface PageShellProps {
  title: string
  description?: string
  action?: React.ReactNode  // primary CTA button for the page
  children: React.ReactNode
}

export function PageShell({ title, description, action, children }: PageShellProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  )
}
```

Usage in a page:
```tsx
// app/(app)/projects/page.tsx
export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <PageShell
      title="Projects"
      description="Manage your team's projects"
      action={<CreateProjectButton />}
    >
      <ProjectList projects={projects} />
    </PageShell>
  )
}
```

Every page gets a consistent title, description, and CTA placement — one component to update.

---

## Responsive Layout Strategy

The desktop layout (sidebar + content) needs a mobile equivalent.

```
Desktop (≥1024px):   Sidebar always visible, fixed width
Tablet (768–1023px): Sidebar hidden by default, toggle via hamburger
Mobile (<768px):     Bottom navigation or drawer navigation
```

```tsx
// Sidebar with mobile overlay
'use client'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

export function MobileSidebarTrigger() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent /> {/* Same nav items, extracted to shared component */}
      </SheetContent>
    </Sheet>
  )
}
```

Show `MobileSidebarTrigger` in the header on mobile, hide the desktop sidebar below `lg:`.

---

## Layout Checklist

- [ ] Root layout is minimal — fonts, metadata, global providers only
- [ ] Route groups separate public layout from app layout from admin layout
- [ ] App layout performs session check and redirects unauthenticated users
- [ ] Sidebar uses `usePathname()` for active state — not manual prop passing
- [ ] `PageShell` component defined and used on every content page
- [ ] `overflow-hidden` / `overflow-y-auto` pattern set so header stays fixed while content scrolls
- [ ] Mobile responsive layout handled — sidebar accessible via sheet/drawer on small screens
- [ ] No navigation HTML duplicated across multiple files

---

## AI Prompt — Layout Generation

```
You are a Staff Engineer building the core layout system for a Next.js 14 App Router application.

My app: [describe in 2–3 sentences]
Auth provider: Supabase Auth
Styling: Tailwind CSS + shadcn/ui
Primary navigation items: [list 4–8 routes with labels — e.g. Dashboard, Projects, Team, Settings, Billing]
Has admin section: [yes/no]

Generate:
1. Root layout.tsx — minimal, with Inter font and Toaster
2. (public)/layout.tsx — nav + footer shell
3. (app)/layout.tsx — authenticated shell with session check
4. Sidebar component with active state detection using usePathname
5. Header component with UserMenu placeholder
6. PageShell component for consistent page structure
7. Mobile sidebar using shadcn Sheet component

Use TypeScript throughout. Apply Tailwind classes only — no inline styles.
Make the sidebar collapsible on mobile using the Sheet pattern.
Flag any decisions I need to make about layout structure before you generate.
```
