import { 
  FileText, Database, Settings, Globe, Box, CheckSquare, Shield, Rocket, 
  Layers, Server, Activity, Zap, Search, Key, Target, Users, BarChart, 
  DollarSign, PenTool, MessageSquare, Presentation, AlertCircle, Map,
  CreditCard, Bell, Cloud, Monitor, BookOpen, Lock, Link, Calendar, Cpu, LayoutDashboard, TrendingUp
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const webProductionTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 — DISCOVERY & PLANNING',
    topics: [
      createTopic('Idea Definition', Rocket, [{ name: 'YC RFS', url: 'https://www.ycombinator.com/rfs' }], 'webideadefinition'),
      createTopic('Problem Statement', AlertCircle, [], 'webproblemstatement'),
      createTopic('User Journey', Globe, [], 'webuserjourney'),
      createTopic('Personas', Users, [], 'webpersonas'),
      createTopic('Solution Statement', CheckSquare, [], 'websolutionstatement'),
      createTopic('Elevator Pitch', Presentation, [], 'webelevatorpitch'),
      createTopic('Competitor Analysis', BarChart, [{ name: 'Similarweb', url: 'https://www.similarweb.com/' }], 'webcompetitoranalysis'),
      createTopic('Feature Planning', CheckSquare, [], 'webfeatureplanning'),
      createTopic('MVP Features', Rocket, [], 'webmvpfeatures'),
      createTopic('Future Features', Layers, [], 'webfuturefeatures'),
      createTopic('Success Metrics', Activity, [], 'websuccessmetrics'),
      createTopic('Users & Audience', Users, [], 'webusersaudience'),
      createTopic('User Goals', Target, [], 'webusergoals'),
      createTopic('Nice-to-Have Features', Layers, [], 'webnicetohavefeatures'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1 — UX & PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [], 'webprd'),
      createTopic('User Flows', Globe, [], 'webuserflows'),
      createTopic('Information Architecture', Layers, [], 'webinformationarchitecture'),
      createTopic('Wireframes', Box, [{ name: 'Figma', url: 'https://www.figma.com/' }, { name: 'Excalidraw', url: 'https://excalidraw.com/' }], 'webwireframes'),
      createTopic('Design System', PenTool, [{ name: 'Shadcn UI', url: 'https://ui.shadcn.com/' }, { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' }], 'webdesignsystem'),
      createTopic('Branding', Target, [], 'webbranding'),
      createTopic('Accessibility', Users, [{ name: 'WCAG Guidelines', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/' }], 'webaccessibility'),
      createTopic('Empty States', Box, [], 'webemptystates'),
      createTopic('Error States', AlertCircle, [], 'weberrorstates'),
      createTopic('Loading States', Activity, [], 'webloadingstates'),
      createTopic('Sitemap', Layers, [], 'websitemap'),
    ]
  },
  {
    id: 'phase-2',
    name: 'PHASE 2 — TECHNICAL ARCHITECTURE',
    topics: [
      createTopic('Tech Stack Selection', Settings, [{ name: 'Next.js', url: 'https://nextjs.org/' }, { name: 'Vite', url: 'https://vitejs.dev/' }], 'webtechstack'),
      createTopic('Frontend Architecture', Monitor, [{ name: 'React', url: 'https://react.dev/' }, { name: 'Zustand', url: 'https://zustand-demo.pmnd.rs/' }], 'webfrontendarchitecture'),
      createTopic('Backend Architecture', Server, [{ name: 'Express', url: 'https://expressjs.com/' }, { name: 'FastAPI', url: 'https://fastapi.tiangolo.com/' }], 'webbackendarchitecture'),
      createTopic('API Design', Globe, [], 'webapidesign'),
      createTopic('Authentication', Key, [{ name: 'Clerk', url: 'https://clerk.com/' }, { name: 'Supabase Auth', url: 'https://supabase.com/auth' }], 'webauthentication'),
      createTopic('Database Schema', Database, [{ name: 'Supabase', url: 'https://supabase.com/' }, { name: 'Prisma', url: 'https://www.prisma.io/' }], 'webdatabaseschema'),
      createTopic('File Storage', Cloud, [{ name: 'AWS S3', url: 'https://aws.amazon.com/s3/' }, { name: 'Cloudinary', url: 'https://cloudinary.com/' }], 'webfilestorage'),
      createTopic('Cost Estimation', DollarSign, [], 'webcostestimation'),
      createTopic('Web Fundamentals', BookOpen, [], 'webfundamentals'),
      createTopic('Authorization', Lock, [], 'webauthorization'),
      createTopic('Search System', Search, [], 'websearchsystem'),
      createTopic('Third-Party Integrations', Link, [], 'webthirdpartyintegrations'),
      createTopic('AI Features (Optional)', Cpu, [{ name: 'OpenAI', url: 'https://platform.openai.com/' }, { name: 'Vercel AI SDK', url: 'https://sdk.vercel.ai/docs' }], 'webaifeatures'),
    ]
  },
  {
    id: 'phase-3',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Auth', Key, [], 'webauthdev'),
      createTopic('Database', Database, [], 'webdatabasedev'),
      createTopic('Backend', Server, [], 'webbackenddev'),
      createTopic('Frontend', Monitor, [], 'webfrontenddev'),
      createTopic('APIs', Globe, [], 'webapisdev'),
      createTopic('Notifications', Bell, [], 'webnotificationsdev'),
      createTopic('Search', Search, [], 'websearchdev'),
      createTopic('Admin Panel', LayoutDashboard, [], 'webadminpaneldev'),
      createTopic('Integrations', Link, [], 'webintegrationsdev'),
      createTopic('Testing', CheckSquare, [], 'webtestingdev'),
      createTopic('Documentation', FileText, [], 'webdocumentationdev'),
      createTopic('Email Notifications', MessageSquare, [], 'webemailnotificationsdev'),
      createTopic('File Uploads', Cloud, [], 'webfileuploadsdev'),
    ]
  },
  {
    id: 'phase-4',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [], 'websecurityreadiness'),
      createTopic('Performance Optimization', Zap, [], 'webperformanceoptimization'),
      createTopic('Monitoring', Activity, [{ name: 'Sentry', url: 'https://sentry.io/' }, { name: 'Datadog', url: 'https://www.datadoghq.com/' }], 'webmonitoring'),
      createTopic('Logging', FileText, [], 'weblogging'),
      createTopic('Error Tracking', AlertCircle, [], 'weberrortracking'),
      createTopic('Rate Limiting', Shield, [], 'webratelimiting'),
      createTopic('Caching', Zap, [], 'webcaching'),
      createTopic('Backups', Database, [], 'webbackups'),
      createTopic('CI/CD', Settings, [{ name: 'GitHub Actions', url: 'https://github.com/features/actions' }], 'webcicd'),
      createTopic('SEO', Search, [{ name: 'Google Search Console', url: 'https://search.google.com/search-console' }], 'webseoprod'),
      createTopic('Scalability Planning', BarChart, [], 'webscalabilityplanning'),
    ]
  },
  {
    id: 'phase-5',
    name: 'PHASE 5 — DEPLOYMENT',
    topics: [
      createTopic('Beta Testing', Users, [], 'webbetatesting'),
      createTopic('User Feedback', MessageSquare, [], 'webuserfeedback'),
      createTopic('Domain Setup', Globe, [{ name: 'Cloudflare', url: 'https://www.cloudflare.com/' }, { name: 'Namecheap', url: 'https://www.namecheap.com/' }], 'webdomainsetup'),
      createTopic('Hosting', Server, [{ name: 'Vercel', url: 'https://vercel.com/' }, { name: 'Render', url: 'https://render.com/' }], 'webhostingdeploy'),
      createTopic('Analytics Setup', BarChart, [{ name: 'PostHog', url: 'https://posthog.com/' }, { name: 'Plausible', url: 'https://plausible.io/' }], 'webanalyticssetup'),
      createTopic('Legal Pages', FileText, [], 'weblegalpages'),
      createTopic('Launch Checklist', CheckSquare, [], 'weblaunchchecklist'),
    ]
  },
  {
    id: 'phase-6',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Analytics', BarChart, [], 'webanalytics'),
      createTopic('Scaling Strategy', TrendingUp, [], 'webscalingstrategy'),
      createTopic('SEO Optimization', Search, [], 'webseooptimization'),
      createTopic('User Retention', Users, [], 'webuserretention'),
      createTopic('Feature Roadmap', Map, [], 'webfeatureroadmap'),
      createTopic('Technical Debt', AlertCircle, [], 'webtechnicaldebt'),
    ]
  }
];

export const webHackathonTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0',
    topics: [
      createTopic('Idea Definition', Rocket, [{ name: 'YC RFS', url: 'https://www.ycombinator.com/rfs' }], 'webideadefinition'),
      createTopic('MVP Features', CheckSquare, [], 'webmvpfeatures'),
    ]
  },
  {
    id: 'phase-1',
    name: 'PHASE 1',
    topics: [
      createTopic('PRD', FileText, [], 'webprd'),
      createTopic('User Flows', Globe, [], 'webuserflows'),
      createTopic('Design System', PenTool, [{ name: 'Shadcn UI', url: 'https://ui.shadcn.com/' }, { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' }], 'webdesignsystem'),
    ]
  },
      {
      id: 'phase-2',
      name: 'PHASE 2 ?" TECHNICAL ARCHITECTURE',
      topics: [
        createTopic('Tech Stack Selection', Settings, [{ name: 'Next.js', url: 'https://nextjs.org/' }, { name: 'Vite', url: 'https://vitejs.dev/' }], 'webtechstack'),
        createTopic('Database Schema', Database, [{ name: 'Supabase', url: 'https://supabase.com/' }, { name: 'Prisma', url: 'https://www.prisma.io/' }], 'webdatabaseschema'),
      ]
    },
      {
      id: 'phase-3',
      name: 'PHASE 3 ?" DEVELOPMENT',
      topics: [
        createTopic('Backend', Server, [], 'webbackenddev'),
        createTopic('Frontend', Monitor, [], 'webfrontenddev'),
        createTopic('Demo Data', Database, [], 'webdemodatadev'),
        createTopic('Auth (Optional)', Key, [], 'webauthoptionaldev'),
      ]
    },
    {
      id: 'phase-4',
      name: 'PHASE 4 — SUBMISSION',
      topics: [
        createTopic('Pitch Deck', Presentation, [], 'webpitchdeck'),
        createTopic('Demo Script', FileText, [], 'webdemoscript'),
        createTopic('Submission Checklist', CheckSquare, [], 'websubmissionchecklist'),
        createTopic('Hosting', Server, [], 'webhostinghackathon'),
      ]
    }
];

export const webPersonalTaxonomy: Category[] = [
  {
    id: 'phase-0',
    name: 'PHASE 0 ?" DISCOVERY & PLANNING',
    topics: [
      createTopic('Idea Definition', Rocket, [{ name: 'YC RFS', url: 'https://www.ycombinator.com/rfs' }], 'webideadefinition'),
      createTopic('MVP Features', CheckSquare, [], 'webmvpfeatures'),
    ]
  },
      {
      id: 'phase-1',
      name: 'PHASE 1 ?" UX & PRODUCT DESIGN',
      topics: [
        createTopic('PRD', FileText, [], 'webprd'),
        createTopic('User Flows', Globe, [], 'webuserflows'),
        createTopic('Design System', PenTool, [{ name: 'Shadcn UI', url: 'https://ui.shadcn.com/' }, { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' }], 'webdesignsystem'),
      ]
    },
      {
      id: 'phase-2',
      name: 'PHASE 2 ?" TECHNICAL ARCHITECTURE',
      topics: [
        createTopic('Tech Stack Selection', Settings, [{ name: 'Next.js', url: 'https://nextjs.org/' }, { name: 'Vite', url: 'https://vitejs.dev/' }], 'webtechstack'),
        createTopic('Authentication', Key, [{ name: 'Clerk', url: 'https://clerk.com/' }, { name: 'Supabase Auth', url: 'https://supabase.com/auth' }], 'webauthentication'),
        createTopic('Database Schema', Database, [{ name: 'Supabase', url: 'https://supabase.com/' }, { name: 'Prisma', url: 'https://www.prisma.io/' }], 'webdatabaseschema'),
        createTopic('API Design', Globe, [], 'webapidesign'),
        createTopic('Search System', Search, [], 'websearchsystem'),
      ]
    },
      {
      id: 'production',
      name: 'PHASE 3 ?" PRODUCTION',
      topics: [
        createTopic('Analytics', BarChart, [], 'webanalyticsdev'),
        createTopic('Hosting', Server, [], 'webhostingdev'),
        createTopic('Security Basics', Shield, [], 'websecuritybasicsdev'),
        createTopic('SEO Basics', Search, [], 'webseobasicsdev'),
      ]
    },
  {
    id: 'growth',
    name: 'PHASE 4 — GROWTH',
    topics: [
      createTopic('Feedback', MessageSquare, [], 'webfeedback'),
      createTopic('Roadmap', Globe, [], 'webroadmap'),
    ]
  }
];

export const webCustomTaxonomy: Category[] = [
  ...webProductionTaxonomy.map(cat => {
    if (cat.id === 'phase-3') {
      return {
        ...cat,
        topics: [
          ...cat.topics,
          createTopic('Payments', CreditCard),
          createTopic('Demo Data', Database),
          createTopic('Multi-language', Globe),
          createTopic('PWA Support', Monitor),
          createTopic('Real-time Features', Zap),
          createTopic('Maps', Map),
          createTopic('Chat', MessageSquare),
          createTopic('Community Features', Users),
          createTopic('API Access', Key),
          createTopic('Blog', FileText),
          createTopic('Roles', Users),
          createTopic('Charts', BarChart),
          createTopic('Calendar', Calendar),
          createTopic('Profiles', Users),
          createTopic('Moderation', Shield),
          createTopic('LLM Architecture', Cpu),
          createTopic('Prompt Engineering', Cpu),
          createTopic('Cost Controls', DollarSign),
          createTopic('Rate Limits', Shield),
          createTopic('RAG', Database),
    ]
      };
    }
    if (cat.id === 'phase-5') {
      return {
        ...cat,
        topics: [
          ...cat.topics,
          createTopic('Pitch Deck', Presentation),
          createTopic('Demo Script', FileText),
          createTopic('Submission Checklist', CheckSquare)
    ]
      };
    }
    return cat;
  })
];
