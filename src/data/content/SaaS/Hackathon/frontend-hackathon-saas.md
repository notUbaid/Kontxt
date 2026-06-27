# Phase 3 · Frontend

🕒 **Estimated Time:** 30 Minutes

---

> **Mode: Hackathon** — Judges spend 3 minutes on your demo. In that window, UI quality is the single biggest signal of competence. A beautiful, responsive, fast-feeling interface with fake data beats an ugly one with real data every time.

This is the phase where hackathons are won or lost.

---

## The Hackathon Frontend Principle

> You are not building a frontend. You are building a first impression. Every second a judge spends confused, waiting, or looking at an empty state is a second they're not being impressed.

Polish beats completeness. A finished-looking half-feature beats a broken full-feature. Ship the happy path flawlessly, then add edge cases if time allows.

---

## Step 1 · Set up your component library immediately

Do not write raw CSS from scratch in a hackathon. Component libraries exist specifically so you don't have to.

### shadcn/ui — the only right answer for Next.js hackathons

shadcn/ui is not a dependency — it's source code you own. Components live in your repo, you can edit them freely, and they look genuinely professional out of the box.

```bash
npx shadcn@latest init
```

During init, pick:
- Style: **Default**
- Base color: **Slate** (neutral, works with any accent color)
- CSS variables: **Yes**

Then add the components you'll actually use:

```bash
npx shadcn@latest add button input label card table badge
npx shadcn@latest add dialog sheet dropdown-menu
npx shadcn@latest add form select textarea
npx shadcn@latest add avatar skeleton toast
```

Add them now, before you need them. Adding during build breaks flow.

---

### The 6 components that build 80% of any SaaS UI

Every dashboard, tool, or platform you've ever used is mostly these six things:

| Component | shadcn name | When you use it |
|---|---|---|
| Button | `Button` | Every action everywhere |
| Data table | `Table` | Lists of anything |
| Modal / dialog | `Dialog` | Confirm, create, edit |
| Side panel | `Sheet` | Detail views, settings |
| Form inputs | `Input`, `Select`, `Textarea` | Any user input |
| Toast / notification | `Toaster` | Feedback on every action |

Everything else is just combinations of these.

---

## Step 2 · Layout — nail this first

Your layout is the container every feature lives inside. Get it wrong and every page looks broken. Get it right and every page looks intentional.

### The SaaS dashboard layout

```tsx
// app/(dashboard)/layout.tsx
import { Sidebar } from '@/components/sidebar'
import { TopNav } from '@/components/top-nav'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

```tsx
// components/sidebar.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, FolderOpen, Settings, Sparkles
} from 'lucide-react'

const links = [
  { href: '/dashboard',          label: 'Overview',  icon: LayoutDashboard },
  { href: '/dashboard/projects', label: 'Projects',  icon: FolderOpen },
  { href: '/dashboard/ai',       label: 'AI',        icon: Sparkles },
  { href: '/dashboard/settings', label: 'Settings',  icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-56 border-r bg-card flex flex-col shrink-0">
      <div className="p-4 border-b">
        <span className="font-semibold text-sm">YourApp</span>
      </div>
      <nav className="flex-1 p-2 space-y-0.5">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
              pathname === href
                ? 'bg-accent text-accent-foreground font-medium'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
```

> Lock the layout before building any pages. Every page you build before the layout is locked will need to be adjusted afterward.

---

### The landing page layout

If you have a public landing page, it needs exactly three things: a headline that explains the product in one sentence, a CTA that goes to sign-up, and something that shows the product working (screenshot, animation, or live demo component).

```tsx
// app/page.tsx
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b px-6 py-4 flex items-center justify-between">
        <span className="font-semibold">YourApp</span>
        <div className="flex gap-3">
          <Button variant="ghost" asChild><Link href="/sign-in">Sign in</Link></Button>
          <Button asChild><Link href="/sign-up">Get started</Link></Button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto">
        <Badge className="mb-4" variant="outline">Now in beta</Badge>
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          One sentence that explains exactly what this does
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-xl">
          Supporting sentence. Who it's for. What problem it solves.
        </p>
        <div className="flex gap-3">
          <Button size="lg" asChild><Link href="/sign-up">Start for free</Link></Button>
          <Button size="lg" variant="outline">See how it works</Button>
        </div>

        {/* Product screenshot / demo component */}
        <div className="mt-16 rounded-xl border bg-card shadow-2xl overflow-hidden w-full">
          <DemoPreview />
        </div>
      </main>
    </div>
  )
}
```

The most common landing page mistake: explaining features instead of outcomes. "Track your projects" is a feature. "Ship faster with less confusion" is an outcome. Write outcomes.

---

## Step 3 · The pages that matter

Build exactly these pages. In this order. Stop when you run out of time.

### Priority 1 — Dashboard overview

The first thing judges see after logging in. This page needs to make the product feel alive.

```tsx
// app/(dashboard)/dashboard/page.tsx
import { StatCard } from '@/components/stat-card'
import { RecentActivity } from '@/components/recent-activity'
import { QuickActions } from '@/components/quick-actions'

export default async function DashboardPage() {
  const stats = await getStats()    // real numbers from your DB
  const recent = await getRecent()  // last 5 records

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Here's what's happening today.
        </p>
      </div>

      {/* Stat cards — judges notice numbers immediately */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total projects" value={stats.total}    delta="+3 this week" />
        <StatCard label="Active"         value={stats.active}   delta="+1 today" />
        <StatCard label="Completed"      value={stats.done}     />
        <StatCard label="AI generations" value={stats.aiCalls}  delta="12 today" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity items={recent} />
        </div>
        <QuickActions />
      </div>
    </div>
  )
}
```

```tsx
// components/stat-card.tsx
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'

export function StatCard({ label, value, delta }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        {delta && (
          <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
            <ArrowUpRight size={12} /> {delta}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
```

---

### Priority 2 — Resource list page

The list of your main entity (projects, customers, tasks, etc.). Needs search, a create button, and empty state.

```tsx
// app/(dashboard)/projects/page.tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProjectCard } from '@/components/project-card'
import { CreateProjectDialog } from '@/components/create-project-dialog'
import { EmptyState } from '@/components/empty-state'
import { Plus, Search } from 'lucide-react'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <CreateProjectDialog>
          <Button>
            <Plus size={16} className="mr-2" />
            New project
          </Button>
        </CreateProjectDialog>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search projects..." className="pl-9" />
      </div>

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Create your first project to get started."
          action={<CreateProjectDialog><Button>Create project</Button></CreateProjectDialog>}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </div>
  )
}
```

---

### Priority 3 — Detail / single record page

Where the real work happens. Show all the data, provide edit and delete, and if you have AI features — put them here.

```tsx
// app/(dashboard)/projects/[id]/page.tsx
export default async function ProjectPage({ params }) {
  const project = await getProject(params.id)
  if (!project) notFound()

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{project.name}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Created {formatDate(project.createdAt)}
          </p>
        </div>
        <div className="flex gap-2">
          <EditProjectDialog project={project}>
            <Button variant="outline" size="sm">Edit</Button>
          </EditProjectDialog>
          <DeleteProjectButton projectId={project.id} />
        </div>
      </div>

      {/* Status badge */}
      <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
        {project.status}
      </Badge>

      {/* Description */}
      {project.description && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm">{project.description}</p>
          </CardContent>
        </Card>
      )}

      {/* AI feature — if applicable */}
      <AISummaryPanel projectId={project.id} />
    </div>
  )
}
```

---

## Step 4 · Forms — the part that has to work perfectly

Forms are where judges interact with your product. A broken form is the fastest way to lose a demo.

### The create/edit dialog pattern

```tsx
// components/create-project-dialog.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const schema = z.object({
  name:        z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional(),
})

export function CreateProjectDialog({ children }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', description: '' },
  })

  async function onSubmit(values) {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      toast.error('Failed to create project')
      return
    }

    toast.success('Project created')
    setOpen(false)
    form.reset()
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input placeholder="My project" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description <span className="text-muted-foreground">(optional)</span></FormLabel>
                  <FormControl><Textarea placeholder="What's this project about?" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                )}
                Create project
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
```

Install the extras this needs:

```bash
npm install react-hook-form @hookform/resolvers zod sonner
npx shadcn@latest add form sonner
```

Add `<Toaster />` to your root layout:

```tsx
// app/layout.tsx
import { Toaster } from 'sonner'

export default function RootLayout({ children }) {
  return (
    <html><body>
      {children}
      <Toaster position="bottom-right" />
    </body></html>
  )
}
```

---

### Delete confirmation pattern

```tsx
// components/delete-project-button.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

export function DeleteProjectButton({ projectId }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Project deleted')
      router.push('/dashboard/projects')
      router.refresh()
    } else {
      toast.error('Failed to delete project')
    }
    setLoading(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The project and all its data will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

---

## Step 5 · Loading and empty states — don't skip these

Nothing screams "unfinished" like a blank white screen while data loads, or a broken layout when a list is empty. These take 10 minutes and judges will definitely see them.

### Skeleton loading

```tsx
// components/project-card-skeleton.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProjectCardSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-3 w-full mb-2" />
        <Skeleton className="h-3 w-4/5" />
      </CardContent>
    </Card>
  )
}

// Use in Suspense fallback
<Suspense fallback={
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <ProjectCardSkeleton key={i} />
    ))}
  </div>
}>
  <ProjectList />
</Suspense>
```

### Empty state

```tsx
// components/empty-state.tsx
import { FolderOpen } from 'lucide-react'

export function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <FolderOpen size={24} className="text-muted-foreground" />
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-xs">{description}</p>
      {action}
    </div>
  )
}
```

---

## Step 6 · Visual polish that judges notice

These are the details that make a project look like a real product instead of a hackathon project. Each takes under 5 minutes.

---

### 1. Consistent date formatting

```ts
// lib/utils.ts
export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatRelative(date: string | Date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60)   return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return formatDate(date)
}
```

---

### 2. Status badges with semantic colors

```tsx
// components/status-badge.tsx
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const styles = {
  active:    'bg-emerald-100 text-emerald-800 border-emerald-200',
  pending:   'bg-amber-100 text-amber-800 border-amber-200',
  archived:  'bg-gray-100 text-gray-600 border-gray-200',
  error:     'bg-red-100 text-red-800 border-red-200',
}

export function StatusBadge({ status }) {
  return (
    <Badge
      variant="outline"
      className={cn('capitalize', styles[status] ?? styles.archived)}
    >
      {status}
    </Badge>
  )
}
```

---

### 3. Avatar with fallback initials

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function UserAvatar({ user }) {
  const initials = user.name
    ?.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <Avatar>
      <AvatarImage src={user.imageUrl} alt={user.name} />
      <AvatarFallback>{initials ?? '?'}</AvatarFallback>
    </Avatar>
  )
}
```

---

### 4. Optimistic UI — instant feedback

Don't wait for the server to respond before updating the UI. It makes your product feel fast.

```tsx
'use client'

import { useOptimistic } from 'react'

export function ProjectList({ initialProjects }) {
  const [projects, addOptimisticProject] = useOptimistic(
    initialProjects,
    (state, newProject) => [newProject, ...state]
  )

  async function handleCreate(data) {
    // Immediately show the new project (fake ID, will be replaced on refresh)
    addOptimisticProject({ id: 'temp', ...data, createdAt: new Date().toISOString() })

    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    router.refresh() // server re-renders with real data
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map(p => <ProjectCard key={p.id} project={p} />)}
    </div>
  )
}
```

---

### 5. Page transitions that feel smooth

```tsx
// components/page-wrapper.tsx — wrap every page content with this
'use client'

import { motion } from 'framer-motion'

export function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
```

```bash
npm install framer-motion
```

One import, one wrapper, every page feels like a real app.

---

### 6. Keyboard shortcut for the primary action

```tsx
// Add this to your main page
useEffect(() => {
  function handleKey(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setCreateDialogOpen(true)
    }
  }
  window.addEventListener('keydown', handleKey)
  return () => window.removeEventListener('keydown', handleKey)
}, [])
```

Judges who are developers will try keyboard shortcuts. This one always gets a reaction.

---

## Step 7 · AI feature UI

If your product has an AI feature, it needs to feel magical — not like a textarea that submits to an API.

### The chat interface

```tsx
// components/ai-chat.tsx
'use client'

import { useChat } from 'ai/react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sparkles, Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRef, useEffect } from 'react'

export function AIChat({ context }) {
  const bottomRef = useRef(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai',
    body: { context },
  })

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-full border rounded-xl overflow-hidden bg-card">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b">
        <div className="rounded-full bg-primary/10 p-1.5">
          <Sparkles size={14} className="text-primary" />
        </div>
        <span className="text-sm font-medium">AI Assistant</span>
        {isLoading && (
          <span className="text-xs text-muted-foreground ml-auto animate-pulse">
            Thinking…
          </span>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-8">
              <Sparkles size={24} className="mx-auto mb-2 opacity-40" />
              Ask anything about your project.
            </div>
          )}
          {messages.map(m => (
            <div
              key={m.id}
              className={cn(
                'flex gap-3',
                m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <Avatar className="w-7 h-7 shrink-0 mt-0.5">
                <AvatarFallback className="text-xs">
                  {m.role === 'user' ? 'U' : 'AI'}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  'rounded-xl px-3.5 py-2.5 text-sm max-w-[85%] leading-relaxed',
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-muted rounded-tl-sm'
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-3 border-t flex gap-2 items-end"
      >
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something…"
          className="min-h-[40px] max-h-[120px] resize-none text-sm"
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          {isLoading
            ? <Loader2 size={16} className="animate-spin" />
            : <Send size={16} />
          }
        </Button>
      </form>
    </div>
  )
}
```

---

### The one-shot generation button

```tsx
// components/generate-button.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function GenerateButton({ projectId, onResult }) {
  const [loading, setLoading] = useState(false)

  async function generate() {
    setLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      })
      const { result } = await res.json()
      onResult(result)
      toast.success('Generated')
    } catch {
      toast.error('Generation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={generate}
      disabled={loading}
      className="gap-2"
    >
      {loading
        ? <Loader2 size={16} className="animate-spin" />
        : <Sparkles size={16} />
      }
      {loading ? 'Generating…' : 'Generate with AI'}
    </Button>
  )
}
```

---

## Step 8 · Data fetching patterns

### Server components (default — use this for initial page data)

```tsx
// Fetch at the page level, pass down as props
// No useEffect, no loading spinner for initial data, no client-side fetch

export default async function ProjectsPage() {
  const projects = await getProjects()   // runs on server
  return <ProjectGrid projects={projects} />
}
```

### Client components (for real-time updates, user interactions)

```tsx
'use client'

import { useEffect, useState } from 'react'

export function LiveProjectStatus({ projectId }) {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const channel = supabase
      .channel('project-status')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'projects',
        filter: `id=eq.${projectId}`,
      }, payload => setStatus(payload.new.status))
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [projectId])

  return <StatusBadge status={status} />
}
```

### `router.refresh()` — the simplest cache invalidation

After any mutation (create, update, delete), call `router.refresh()`. It re-fetches server component data without a full page reload.

```tsx
import { useRouter } from 'next/navigation'

const router = useRouter()

async function handleCreate() {
  await fetch('/api/projects', { method: 'POST', body: ... })
  router.refresh()   // re-runs server data fetching for current page
}
```

---

## Step 9 · AI prompts for frontend

### Component generation prompt

```prompt
Generate a [component name] React component for a Next.js 14 App Router SaaS application.

Tech stack:
- shadcn/ui for components
- Tailwind CSS for styling
- TypeScript
- lucide-react for icons

The component should:
[describe exactly what it does and what data it receives]

Requirements:
- Handle loading state with a skeleton or spinner
- Handle empty state with a helpful message
- Handle error state gracefully
- Use shadcn/ui components (Card, Button, Badge, etc.) not raw HTML
- TypeScript types for all props

Output: single file, full component, no placeholders.
```

---

### Full page generation prompt

```prompt
Generate a complete Next.js 14 App Router page for [page name].

This page shows: [describe what's on the page]
Data comes from: [API route or server action]
User can: [list actions — create, edit, delete, filter, etc.]

Tech stack: Next.js 14, shadcn/ui, Tailwind, TypeScript, lucide-react
Auth: [Clerk / Supabase Auth]

Include:
- The page component (server component by default)
- Any client components needed for interactivity
- Loading skeleton using Suspense
- Empty state component
- All imports

Output each file separately with full path.
```

---

### UI review prompt

```prompt
Review this React component for a hackathon demo:

[paste component]

Check for:
1. Missing loading state — will it show a blank screen while fetching?
2. Missing error state — what happens if the API call fails?
3. Missing empty state — what does the judge see before any data exists?
4. Accessibility issues that would be immediately obvious (missing labels, non-interactive divs)
5. Anything that would visually break on a 1280px laptop screen

Return: numbered list of issues only, ordered by severity.
```

---

## Step 10 · Frontend validation checklist

Complete this before the demo.

- [ ] Layout renders correctly at 1280px (judge's laptop width)
- [ ] Sidebar navigation highlights active route
- [ ] Dashboard overview shows real numbers from the database
- [ ] List page has search input (even if client-side filtering only)
- [ ] Create flow works end-to-end: dialog opens → form submits → list updates
- [ ] Edit flow works end-to-end
- [ ] Delete shows confirmation dialog before deleting
- [ ] Toast notifications appear on create, update, delete success and failure
- [ ] Skeleton loaders show during data fetch (no blank white screens)
- [ ] Empty states exist for all list views
- [ ] AI feature streams responses (no waiting for full generation)
- [ ] No console errors in browser DevTools
- [ ] No layout breaks when text is longer than expected
- [ ] Forms show validation errors inline (not just `alert()`)
- [ ] Primary CTA button is keyboard accessible (Enter submits forms)

---

## The 5 things judges actually look at

Everything else is secondary. Nail these.

**1. The first screen after login.** If the dashboard looks empty and broken, they've already formed an opinion. Seed data and stat cards fix this.

**2. The primary user action.** Create something, or use the main AI feature. It must work on the first try, with instant feedback.

**3. The empty→populated transition.** Does creating a record update the UI immediately? Or does the page feel broken until they refresh?

**4. Mobile at a glance.** They will resize the window. Your layout must not explode. Tailwind responsive prefixes (`md:`, `lg:`) are your friend.

**5. Error handling.** Try to break it. If they accidentally submit an empty form, what happens? If the AI fails, does the whole page crash?

---

## What comes next

**Phase 3 · Demo Data** — your frontend is built. Now make sure the demo tells a story. Seed data that makes every feature look its best, and prepare the exact path you'll walk judges through.
