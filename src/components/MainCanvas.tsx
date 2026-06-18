import { Copy, CheckSquare } from 'lucide-react';
import type { Mode } from './TopNav';
import { taxonomy } from '../data/taxonomy';

interface MainCanvasProps {
  activePage: string;
  activeMode: Mode;
}

export const MainCanvas = ({ activePage, activeMode }: MainCanvasProps) => {
  let activeTopicName = activePage;
  for (const cat of taxonomy) {
    const topic = cat.topics.find(t => t.id === activePage);
    if (topic) {
      activeTopicName = topic.name;
      break;
    }
  }

  return (
    <main className="flex-1 ml-64 mr-72 max-w-3xl pt-8 pb-24 px-8 w-full">
      <div className="mb-4 inline-block px-3 py-1 bg-muted rounded-md text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Mode: <span className="text-accent">{activeMode}</span>
      </div>
      
      {activePage === 'prd' && (
        <article className="prose prose-kontxt hover:prose-a:opacity-80 max-w-none">
          <h1 className="text-4xl font-extrabold tracking-tight mb-8">
            Product Requirements Document (PRD)
          </h1>
          
          <p className="leading-relaxed mb-6 text-foreground/90 text-lg">
            The PRD is the absolute ground truth for what is being built. It forces you to define what is <strong className="text-accent">Out-of-Scope</strong> before writing any code, preventing architectural drift and feature creep when working with AI.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-muted pb-2">1. Core Objectives</h2>
          <ul className="space-y-2 mb-6">
            <li>Define the exact user personas and their primary workflows.</li>
            <li>Establish strict non-goals (what we are NOT building).</li>
            <li>Set the success criteria for the initial MVP.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-muted pb-2">2. The "Anti-Hallucination" Constraints</h2>
          <p className="leading-relaxed mb-4 text-foreground/90">
            When prompting an LLM to build features, you must enforce boundaries. Use the following prompt block to lock the AI into your specific requirements:
          </p>

          <div className="not-prose relative group mt-6 mb-8 rounded-lg overflow-hidden border-2 border-primary/20 bg-muted/10">
            <div className="flex items-center justify-between px-4 py-2 bg-primary/10 text-xs font-mono text-primary font-bold border-b-2 border-primary/20">
              <span>prompt_template.md</span>
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="hover:text-accent transition-colors" title="Mark as used">
                  <CheckSquare size={14} />
                </button>
                <button className="hover:text-accent transition-colors" title="Copy to clipboard">
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <pre className="p-4 text-sm font-mono text-foreground overflow-x-auto leading-relaxed">
              <code>
{`You are an expert Staff Engineer acting as the technical lead for this project.

CRITICAL CONSTRAINTS:
1. Do not invent new database tables unless explicitly requested.
2. Adhere strictly to the tech stack defined in TechSpec.md.
3. If a feature contradicts the Non-Goals in the PRD, refuse to build it.`}
              </code>
            </pre>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-muted pb-2">3. Non-Goals (Out of Scope)</h2>
          <p className="leading-relaxed mb-6 text-foreground/90">
            For a <strong className="text-accent">{activeMode}</strong> mode project, the following are strictly out of scope:
          </p>
          <ul className="space-y-2 mb-6">
            {activeMode === 'Hackathon' ? (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">×</span> Custom authentication flows (Use Supabase OAuth instead).
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">×</span> CI/CD pipelines and rigorous E2E testing.
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">✓</span> CI/CD is required for {activeMode} apps.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">✓</span> Comprehensive E2E Testing with Playwright.
                </li>
              </>
            )}
          </ul>
        </article>
      )}

      {activePage === 'schema' && (
        <article className="prose prose-kontxt max-w-none">
          <h1 className="text-4xl font-extrabold tracking-tight mb-8">
            Database Schema
          </h1>
          <p className="leading-relaxed mb-6 text-foreground/90 text-lg">
            Define your tables beforehand. This stops the AI from hallucinating tables mid-build.
          </p>
          <div className="not-prose bg-muted/20 text-foreground rounded-lg p-4 font-mono text-sm border-l-4 border-accent">
            {`model User {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now())
}`}
          </div>
        </article>
      )}

      {activePage === 'techspec' && (
        <article className="prose prose-kontxt max-w-none">
          <h1 className="text-4xl font-extrabold tracking-tight mb-8">
            Technical Specification
          </h1>
          <p className="leading-relaxed mb-6 text-foreground/90 text-lg">
            Hard-codes the exact framework versions so the AI stops suggesting outdated or conflicting React libraries.
          </p>
          <ul className="list-disc pl-5 space-y-2 font-medium">
            <li>Framework: Vite + React 18</li>
            <li>Styling: Tailwind CSS v3</li>
            <li>Icons: Lucide React</li>
          </ul>
        </article>
      )}

      {!['prd', 'schema', 'techspec'].includes(activePage) && (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed border-muted rounded-xl bg-muted/20">
          <CheckSquare size={32} className="mb-4 opacity-50" />
          <h2 className="text-lg font-bold text-foreground">Drafting {activeTopicName}...</h2>
          <p className="text-sm mt-2">Generate content for this playbook section using Kontxt AI.</p>
        </div>
      )}
    </main>
  );
};
