import React, { Suspense, lazy, useState } from 'react';
import { 
  Rocket, User, Building2, FolderOpen, Plus, ArrowRight,
  Cloud, Smartphone, Globe, Brain, Puzzle, Monitor, Server, Wrench,
  Store, ShoppingCart, Gamepad2, AlertTriangle, Skull, Shield, Lock,
  Hexagon, Database, Terminal, Cpu, Code, Wand2
} from 'lucide-react';
import type { Mode } from './TopNav';
import type { Project, AppType } from '../App';
import { getSupabase } from '../lib/supabase';

const AuthModal = lazy(() => import('./AuthModal').then(({ AuthModal }) => ({ default: AuthModal })));

interface OnboardingProps {
  projects: Project[];
  onCreateProject: (name: string, mode: Mode, type: AppType) => void;
  onSelectProject: (id: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}

const TYPE_META: Record<AppType, { icon: React.ElementType; description: string }> = {
  'SaaS': { icon: Cloud, description: 'Subscription-based web platform' },
  'Mobile App': { icon: Smartphone, description: 'iOS, Android, or cross-platform' },
  'Web App': { icon: Globe, description: 'Interactive web application' },
  'AI Tool': { icon: Brain, description: 'LLM-powered product or agent' },
  'Browser Extension': { icon: Puzzle, description: 'Chrome, Firefox, or Edge extension' },
  'Desktop App': { icon: Monitor, description: 'Electron, Tauri, or native app' },
  'API Product': { icon: Server, description: 'Developer-facing API service' },
  'Internal Tool': { icon: Wrench, description: 'Internal dashboard or workflow' },
  'Marketplace': { icon: Store, description: 'Two-sided platform connecting buyers & sellers' },
  'E-commerce': { icon: ShoppingCart, description: 'Online store or D2C brand' },
  'Game': { icon: Gamepad2, description: 'Mobile, PC, or web game' },
  'Cyber Security (Offensive)': { icon: Skull, description: 'Red Team tools, exploit dev, & scanners' },
  'Cyber Security (Defensive)': { icon: Shield, description: 'Blue Team, SIEM, & EDR monitors' },
  'Cyber Security (DevSecOps)': { icon: Lock, description: 'Compliance, CI/CD scanning, & GRC' },
  'Web3 dApp': { icon: Hexagon, description: 'Decentralized application & smart contracts' },
  'Data Pipeline': { icon: Database, description: 'ETL, scrapers, and data warehouses' },
  'CLI': { icon: Terminal, description: 'Command Line Interfaces & Developer Tools' },
  'IoT': { icon: Cpu, description: 'Embedded systems & smart home hardware' },
  'Open Source': { icon: Code, description: 'Libraries, npm packages, & community repos' },
  'Custom': { icon: Wand2, description: 'A fully custom app type and project structure' },
};

// Contextual mode descriptions per type
const MODE_DESCRIPTIONS: Partial<Record<AppType, Record<Mode, string>>> = {
  'SaaS': {
    'Hackathon': 'Ship in 48 hours. BaaS auth, skip CI/CD, demo-ready.',
    'Personal': 'Portfolio-ready. Relational DB, basic auth, clean architecture.',
    'Production': 'The full stack. Multi-tenancy, rate limiting, E2E tests, CI/CD.'
  },
  'Mobile App': {
    'Hackathon': 'Expo + Firebase. Fast prototype, skip native modules.',
    'Personal': 'Clean architecture, offline storage, push notifications.',
    'Production': 'App Store ready. Crash reporting, deep linking, analytics, CI/CD.'
  },
  'Web App': {
    'Hackathon': 'Vercel + Supabase. Ship fast, skip infra.',
    'Personal': 'SEO-ready, responsive, basic auth, clean deployment.',
    'Production': 'SSR/SSG, CDN, monitoring, security headers, load testing.'
  },
  'AI Tool': {
    'Hackathon': 'Single LLM call, basic UI, skip guardrails. Demo-ready.',
    'Personal': 'RAG pipeline, prompt engineering, cost controls.',
    'Production': 'Multi-model, guardrails, eval pipelines, observability, failover.'
  },
  'Browser Extension': {
    'Hackathon': 'Manifest V3 popup, basic content script. Ship in hours.',
    'Personal': 'Side panel UI, storage sync, polished permissions.',
    'Production': 'Cross-browser, auto-updates, analytics, Chrome Web Store listing.'
  },
  'Desktop App': {
    'Hackathon': 'Electron quick-start. Basic window, skip native APIs.',
    'Personal': 'File system access, local storage, auto-updates.',
    'Production': 'Code signing, crash reporting, native integrations, CI/CD.'
  },
  'API Product': {
    'Hackathon': 'Single endpoint, basic auth. Ship a working demo.',
    'Personal': 'RESTful design, API docs, basic rate limiting.',
    'Production': 'Versioning, SDKs, usage-based billing, SLAs, monitoring.'
  },
  'Internal Tool': {
    'Hackathon': 'CRUD dashboard. Admin panel in a weekend.',
    'Personal': 'Role-based access, basic workflows, clean UI.',
    'Production': 'Audit logs, SSO, approval workflows, reporting, compliance.'
  },
  'Marketplace': {
    'Hackathon': 'Basic listing + search. Two-sided MVP in 48 hours.',
    'Personal': 'Buyer/seller flows, reviews, basic payments.',
    'Production': 'Escrow, dispute resolution, trust & safety, analytics, SEO.'
  },
  'E-commerce': {
    'Hackathon': 'Product list + Stripe checkout. Ship a working store fast.',
    'Personal': 'Cart, orders, basic inventory. Clean storefront.',
    'Production': 'PCI compliance, tax engine, shipping integrations, analytics.'
  },
  'Game': {
    'Hackathon': 'Playable demo. Core loop, basic art, skip multiplayer.',
    'Personal': 'Polished game with save system, audio, and store-ready.',
    'Production': 'Live ops, multiplayer, anti-cheat, analytics, seasonal content.',
  },
  'Cyber Security (Offensive)': {
    'Hackathon': 'Wrapper scripts, basic port scanners, polished CLI.',
    'Personal': 'Deep protocol parsers, memory exploitation, custom evasion.',
    'Production': 'C2 architectures, evasion pipelines, exploit delivery networks.'
  },
  'Cyber Security (Defensive)': {
    'Hackathon': 'Basic log parsers, rule-based alerts, dashboard UI.',
    'Personal': 'eBPF sensors, threat hunting, YARA rule integration.',
    'Production': 'SIEM integration, incident response automation, ML anomaly detection.'
  },
  'Cyber Security (DevSecOps)': {
    'Hackathon': 'GitHub Actions hooks, static code linters.',
    'Personal': 'Terraform drift detection, Docker config scanning.',
    'Production': 'SOC2 automation, SBOM generation, zero-trust enforcement.'
  },
  'Web3 dApp': {
    'Hackathon': 'Scaffold-ETH, local testnet, skip audits. Ship a working dApp.',
    'Personal': 'Clean frontend integration, verifiable contracts, basic wallet auth.',
    'Production': 'Audited smart contracts, gas optimization, SIWE auth, robust node providers.'
  },
  'Data Pipeline': {
    'Hackathon': 'Cron jobs, basic scrapers, direct DB writes. Move data fast.',
    'Personal': 'Clean ETL scripts, basic orchestration, error logging.',
    'Production': 'Airflow/Dagster, data validation, scalable warehouses, robust alerting.'
  },
  'CLI': {
    'Hackathon': 'Quick bash/python script, local execution.',
    'Personal': 'Published package, basic CLI args, clean output.',
    'Production': 'Cross-platform binaries, analytics, CI/CD publishing.'
  },
  'IoT': {
    'Hackathon': 'Breadboard prototype, direct Wi-Fi/Bluetooth connections.',
    'Personal': 'Custom PCB, basic OTA updates, stable sensors.',
    'Production': 'Fleet management, secure boot, robust MQTT infrastructure.'
  },
  'Open Source': {
    'Hackathon': 'Public repo, basic README, working prototype.',
    'Personal': 'Comprehensive docs, CI/CD tests, semantic versioning.',
    'Production': 'Community guidelines, monorepo, robust governance model.'
  },
  'Custom': {
    'Hackathon': 'Rapid experimental prototyping tailored to your custom needs.',
    'Personal': 'A custom project structured for individual maintenance.',
    'Production': 'Enterprise-ready custom architecture and deployment.'
  },
};

const HIGH_RISK_WARNINGS: Partial<Record<AppType, { title: string; message: string; icon: React.ElementType }>> = {
  'E-commerce': {
    title: 'Are you sure you need a custom build?',
    message: 'For 80% of online stores, Shopify or WooCommerce is the correct answer. Custom e-commerce requires managing payment gateways, PCI compliance, inventory systems, shipping logic, and tax calculations from scratch. Only proceed if you have a genuine reason that platforms cannot solve.',
    icon: AlertTriangle,
  },
  'Game': {
    title: 'Scope Reality Check',
    message: 'Game development is where scope kills projects. Most indie games fail because the vision exceeds the team\'s capacity. Be brutally honest: can your team (size, skill, budget, timeline) actually ship this? GTA 6 cannot be built by 2 people in 3 months.',
    icon: AlertTriangle,
  },
  'Marketplace': {
    title: 'The Chicken & Egg Problem',
    message: 'Most marketplace failures aren\'t technical — they\'re liquidity failures. How will you get buyers without sellers? How will you get sellers without buyers? Solve the supply/demand bootstrapping problem before writing code, or your marketplace will be a ghost town.',
    icon: AlertTriangle,
  },
  'Cyber Security (Offensive)': {
    title: 'Rules of Engagement & Liability',
    message: 'Building and deploying offensive security tools (Red Team) carries extreme legal risk (e.g. CFAA violations). You MUST have explicit, written authorization (Rules of Engagement) before pointing any scanner, exploiter, or C2 framework at an external target. Ensure your tool has built-in kill switches and scope limitations.',
    icon: Skull,
  },
  'Web3 dApp': {
    title: 'Smart Contract Security Risk',
    message: 'Deploying smart contracts that handle real monetary value (tokens, NFTs, DeFi) carries extreme risk. You MUST have your contracts professionally audited before moving to mainnet. A single vulnerability can lead to a complete, irreversible drain of user funds.',
    icon: AlertTriangle,
  },
};

// App types that are fully disabled (no content ready for any mode)
const COMING_SOON_TYPES: Set<AppType> = new Set([
  'Cyber Security (Defensive)',
  'Cyber Security (DevSecOps)',
  'Cyber Security (Offensive)',
  'Data Pipeline',
  'Game',
  'Web3 dApp',
  'CLI',
  'IoT',
  'Open Source',
  'Custom',
]);

// App types that are clickable but marked as Under Work
const UNDER_WORK_TYPES: Set<AppType> = new Set([
  'Browser Extension',
  'Desktop App',
]);

// Specific modes disabled per app type (partial availability)
const COMING_SOON_MODES: Partial<Record<AppType, Set<Mode>>> = {
  'AI Tool': new Set(['Production']),
  'Internal Tool': new Set(['Production']),
};

export const Onboarding = ({ projects, onCreateProject, onSelectProject, isAuthenticated, setIsAuthenticated }: OnboardingProps) => {
  const [view, setView] = useState<'home' | 'new' | 'mode' | 'confirm'>('home');
  const [projectName, setProjectName] = useState('');
  const [selectedType, setSelectedType] = useState<AppType | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Available types first, coming-soon types grouped at the end. Sorted by popularity.
  const APP_TYPES: AppType[] = [
    'SaaS', 'AI Tool', 'Web App', 'Mobile App', 
    'E-commerce', 'Marketplace', 'Internal Tool', 'API Product',
    // Coming Soon
    'Browser Extension', 'Desktop App', 'Data Pipeline', 'Open Source',
    'CLI', 'Game', 'Web3 dApp', 'IoT',
    'Cyber Security (Offensive)', 'Cyber Security (Defensive)', 'Cyber Security (DevSecOps)', 
    'Custom'
  ];

  const handleTypeSelect = (type: AppType) => {
    if (!projectName.trim()) {
      alert("Please enter a project name first.");
      return;
    }
    setSelectedType(type);

    // Check if this type needs a confirmation warning
    if (HIGH_RISK_WARNINGS[type]) {
      setView('confirm');
    } else {
      setView('mode');
    }
  };

  const handleConfirmProceed = () => {
    setView('mode');
  };

  const handleModeSelect = (mode: Mode) => {

    if (selectedType) {
      onCreateProject(projectName, mode, selectedType);
    }
  };

  // Get contextual mode data
  const getModeData = () => {
    const type = selectedType || 'SaaS';
    const descriptions = MODE_DESCRIPTIONS[type] || MODE_DESCRIPTIONS['SaaS']!;
    
    return [
      {
        id: 'Hackathon' as Mode,
        title: 'Hackathon MVP',
        icon: Rocket,
        desc: descriptions['Hackathon'],
        color: 'border-primary/20 text-primary hover:border-primary hover:bg-primary/5',
      },
      {
        id: 'Personal' as Mode,
        title: 'Personal Project',
        icon: User,
        desc: descriptions['Personal'],
        color: 'border-primary/20 text-primary hover:border-primary hover:bg-primary/5',
      },
      {
        id: 'Production' as Mode,
        title: 'Production App',
        icon: Building2,
        desc: descriptions['Production'],
        color: 'border-primary/20 text-primary hover:border-primary hover:bg-primary/5',
      },
    ];
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 pt-20 relative">
      <div className="absolute top-4 right-4">
        {!isAuthenticated ? (
          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
          >
            Sign In
          </button>
        ) : (
          <button 
            onClick={async () => {
              const supabase = await getSupabase();
              await supabase.auth.signOut();
              setIsAuthenticated(false);
            }}
            className="text-xs font-medium text-muted-foreground/40 hover:text-muted-foreground transition-colors px-4 py-2"
          >
            Log out
          </button>
        )}
      </div>

      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="font-black text-5xl tracking-tighter flex items-center justify-center select-none mb-4">
            <span className="text-accent">Kon</span>
            <span className="text-primary">txt</span>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
            Your Staff Engineer in a Box.
          </p>
          {!isAuthenticated && (
            <p className="text-sm text-muted-foreground/70">
              <button onClick={() => setIsAuthModalOpen(true)} className="underline hover:text-primary transition-colors">Sign in</button> to access and save your past projects.
            </p>
          )}
        </div>

        {/* HOME VIEW */}
        {view === 'home' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Your Projects</h2>
            </div>

            {projects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {projects.map(project => (
                  <button
                    key={project.id}
                    onClick={() => onSelectProject(project.id)}
                    className="p-4 rounded-xl border border-primary/20 text-left hover:border-primary hover:bg-primary/5 transition-all group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-muted rounded-lg text-primary">
                        {project.type && TYPE_META[project.type] ? (
                          (() => { const Icon = TYPE_META[project.type!].icon; return <Icon size={20} />; })()
                        ) : (
                          <FolderOpen size={20} />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {project.mode} Mode {project.type && <span className="opacity-75">• {project.type}</span>}
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                  </button>
                ))}
              </div>
            )}

            <div className="text-center p-12 border-2 border-dashed border-muted rounded-2xl">
              <FolderOpen size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                {projects.length > 0 ? "Start another project" : "No projects yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {projects.length > 0 ? "Create a new project to keep building." : "Create your first project to get started."}
              </p>
              <button 
                onClick={() => setView('new')}
                className="bg-primary text-background px-6 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <Plus size={18} /> Create Project
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: NAME + TYPE */}
        {view === 'new' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Create New Project</h2>
              <button 
                onClick={() => { setView('home'); setProjectName(''); setSelectedType(null); }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>

            <div className="mb-10">
              <label className="block text-sm font-bold text-primary mb-2 uppercase tracking-wider">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Acme SaaS Platform"
                autoFocus
                autoComplete="off"
                className="w-full bg-background border-2 border-primary/20 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-primary transition-colors text-foreground"
              />
            </div>

            <h3 className="block text-sm font-bold text-primary mb-4 uppercase tracking-wider">What are you building?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {APP_TYPES.map((type) => {
                const meta = TYPE_META[type];
                const Icon = meta.icon;
                const isComingSoon = COMING_SOON_TYPES.has(type);
                const isUnderWork = UNDER_WORK_TYPES.has(type);
                return (
                  <button
                    key={type}
                    onClick={() => !isComingSoon && handleTypeSelect(type)}
                    disabled={isComingSoon}
                    className={`p-4 rounded-xl border-2 text-left transition-all bg-background shadow-sm group relative ${
                      isComingSoon
                        ? 'border-muted/40 opacity-50 cursor-not-allowed grayscale'
                        : isUnderWork
                        ? 'border-primary/10 hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.02]'
                        : 'border-primary/10 hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.02]'
                    }`}
                  >
                    {isComingSoon && (
                      <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/70 bg-muted/60 px-1.5 py-0.5 rounded-full">
                        Soon
                      </span>
                    )}
                    {isUnderWork && (
                      <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                        WIP
                      </span>
                    )}
                    <div className={`p-2.5 rounded-lg inline-block mb-3 transition-colors ${
                      isComingSoon
                        ? 'bg-muted/30 text-muted-foreground/50'
                        : 'bg-muted/50 text-primary group-hover:bg-primary/10'
                    }`}>
                      <Icon size={22} />
                    </div>
                    <h4 className={`font-bold text-sm ${isComingSoon ? 'text-muted-foreground/60' : 'text-foreground'}`}>{type}</h4>
                    <p className={`text-xs mt-1 leading-snug ${isComingSoon ? 'text-muted-foreground/40' : 'text-muted-foreground'}`}>{meta.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* CONFIRMATION VIEW for high-risk types */}
        {view === 'confirm' && selectedType && HIGH_RISK_WARNINGS[selectedType] && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
              <button 
                onClick={() => setView('new')}
                className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors bg-muted/50"
              >
                <ArrowRight className="rotate-180" size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{selectedType}</h2>
                <p className="text-muted-foreground">Before you proceed...</p>
              </div>
            </div>

            <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-8 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/20 rounded-full shrink-0">
                  <AlertTriangle size={28} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{HIGH_RISK_WARNINGS[selectedType]!.title}</h3>
                  <p className="text-foreground/80 leading-relaxed text-[15px]">
                    {HIGH_RISK_WARNINGS[selectedType]!.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button 
                onClick={() => setView('new')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
              >
                ← Go Back
              </button>
              <button 
                onClick={handleConfirmProceed}
                className="bg-primary text-background px-6 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                I understand, proceed →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: MODE (contextual to selected type) */}
        {view === 'mode' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8 flex items-center gap-4">
              <button 
                onClick={() => setView('new')}
                className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors bg-muted/50"
              >
                <ArrowRight className="rotate-180" size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Select Project Mode</h2>
                <p className="text-muted-foreground">
                  Building <span className="font-semibold text-foreground">{projectName}</span> as a <span className="font-semibold text-accent">{selectedType}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getModeData().map((mode) => {
                const isModeDisabled = selectedType ? COMING_SOON_MODES[selectedType]?.has(mode.id) ?? false : false;
                return (
                  <button
                    key={mode.id}
                    onClick={() => !isModeDisabled && handleModeSelect(mode.id)}
                    disabled={isModeDisabled}
                    className={`p-6 rounded-2xl border-2 text-left transition-all bg-background group relative ${
                      isModeDisabled
                        ? 'border-muted/30 opacity-45 cursor-not-allowed grayscale'
                        : `${mode.color} hover:scale-[1.02] hover:shadow-md`
                    }`}
                  >
                    {isModeDisabled && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 bg-muted/60 px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-lg bg-background border-2 ${isModeDisabled ? 'border-muted/30' : 'border-inherit'}`}>
                        <mode.icon size={24} />
                      </div>
                      <h2 className={`text-2xl font-bold ${isModeDisabled ? 'text-muted-foreground/50' : ''}`}>{mode.title}</h2>
                    </div>
                    <p className={`font-medium transition-colors ${
                      isModeDisabled ? 'text-muted-foreground/40' : 'text-muted-foreground group-hover:text-foreground'
                    }`}>
                      {mode.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Suspense fallback={null}>
        {isAuthModalOpen && (
          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
            onLogin={() => setIsAuthenticated(true)} 
          />
        )}
      </Suspense>
    </div>
  );
};
