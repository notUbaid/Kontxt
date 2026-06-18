import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  Lock, BookOpen, Layers, Server, Cloud, Cpu, Activity, Zap, Search, Key, ShieldAlert
} from 'lucide-react';
import type { Mode } from '../components/TopNav';

export interface QuickLink {
  name: string;
  url: string;
  icon?: any;
}

export interface Topic {
  id: string;
  name: string;
  icon: any;
  modes: Mode[]; // Which modes this topic appears in
  quickLinks: QuickLink[];
}

export interface Category {
  id: string;
  name: string;
  topics: Topic[];
}

// Universal Quick Links always available in Right Sidebar
export const universalLinks: QuickLink[] = [
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'Analytics', url: 'https://analytics.google.com' },
  { name: 'Vercel', url: 'https://vercel.com' },
];

export const taxonomy: Category[] = [
  {
    id: 'foundation',
    name: 'Phase 1: Foundation Docs',
    topics: [
      { id: 'prd', name: 'PRD.md', icon: FileText, modes: ['Hackathon', 'Personal', 'Production', 'Custom'], quickLinks: [] },
      { id: 'schema', name: 'Schema.md', icon: Database, modes: ['Personal', 'Production', 'Custom'], quickLinks: [{name: 'Prisma Docs', url: 'https://prisma.io'}] },
      { id: 'techspec', name: 'TechSpec.md', icon: Settings, modes: ['Hackathon', 'Personal', 'Production', 'Custom'], quickLinks: [] },
      { id: 'appflow', name: 'AppFlow.md', icon: Globe, modes: ['Personal', 'Production', 'Custom'], quickLinks: [{name: 'Excalidraw', url: 'https://excalidraw.com'}] },
      { id: 'design', name: 'Design.md', icon: Box, modes: ['Personal', 'Production', 'Custom'], quickLinks: [{name: 'Figma', url: 'https://figma.com'}, {name: 'shadcn/ui', url: 'https://ui.shadcn.com'}] },
      { id: 'implementation', name: 'ImplementationPlan.md', icon: CheckSquare, modes: ['Personal', 'Production', 'Custom'], quickLinks: [] },
      { id: 'rules', name: 'Rules.md', icon: Shield, modes: ['Hackathon', 'Personal', 'Production', 'Custom'], quickLinks: [] },
      { id: 'tracker', name: 'Tracker.md', icon: Rocket, modes: ['Hackathon', 'Personal', 'Production', 'Custom'], quickLinks: [] },
    ]
  },
  {
    id: 'execution',
    name: 'Phase 2: Execution & Ops',
    topics: [
      { id: 'frontend', name: 'Frontend & UI', icon: Box, modes: ['Hackathon', 'Personal', 'Production', 'Custom'], quickLinks: [{name: '21st.dev', url: 'https://21st.dev'}, {name: 'shadcn/ui', url: 'https://ui.shadcn.com'}] },
      { id: 'backend', name: 'APIs & Backend Logic', icon: Server, modes: ['Hackathon', 'Personal', 'Production', 'Custom'], quickLinks: [] },
      { id: 'databases', name: 'Databases & Storage', icon: Database, modes: ['Hackathon', 'Personal', 'Production', 'Custom'], quickLinks: [{name: 'Supabase', url: 'https://supabase.com'}] },
      { id: 'auth', name: 'Auth & Permissions', icon: Key, modes: ['Hackathon', 'Personal', 'Production', 'Custom'], quickLinks: [{name: 'Clerk', url: 'https://clerk.com'}] },
      { id: 'hosting', name: 'Hosting & Cloud', icon: Cloud, modes: ['Personal', 'Production', 'Custom'], quickLinks: [] },
      { id: 'cicd', name: 'CI/CD & Version Control', icon: Layers, modes: ['Production', 'Custom'], quickLinks: [{name: 'GitHub Actions', url: 'https://github.com/features/actions'}] },
      { id: 'security', name: 'Security Audits', icon: ShieldAlert, modes: ['Personal', 'Production', 'Custom'], quickLinks: [] },
      { id: 'ratelimiting', name: 'Rate Limiting', icon: Activity, modes: ['Production', 'Custom'], quickLinks: [{name: 'Upstash Redis', url: 'https://upstash.com'}] },
      { id: 'caching', name: 'Caching & CDN', icon: Zap, modes: ['Production', 'Custom'], quickLinks: [] },
      { id: 'seo', name: 'SEO Optimization', icon: Search, modes: ['Personal', 'Production', 'Custom'], quickLinks: [{name: 'Google Search Console', url: 'https://search.google.com/search-console'}, {name: 'Bing Webmaster', url: 'https://www.bing.com/webmasters'}] },
      { id: 'monitoring', name: 'Monitoring & Alerts', icon: Activity, modes: ['Production', 'Custom'], quickLinks: [{name: 'Sentry', url: 'https://sentry.io'}] },
    ]
  },
  {
    id: 'ecosystem',
    name: 'Ecosystem',
    topics: [
      { id: 'promptvault', name: 'Prompt Vault', icon: BookOpen, modes: ['Hackathon', 'Personal', 'Production', 'Custom'], quickLinks: [] },
      { id: 'projectsjournal', name: 'Projects Journal', icon: BookOpen, modes: ['Hackathon', 'Personal', 'Production', 'Custom'], quickLinks: [] },
      { id: 'aimcp', name: 'AI + MCP Strategy', icon: Cpu, modes: ['Hackathon', 'Personal', 'Production', 'Custom'], quickLinks: [] },
    ]
  }
];
