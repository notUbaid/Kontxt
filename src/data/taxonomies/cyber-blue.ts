import { FileText, Shield, Eye, Activity, Database, Server, Network, 
  Search, AlertTriangle, Play, Settings, Cloud, Cpu, Lock, Crosshair, Map, Skull, RefreshCcw
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const cyberBlueProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — DISCOVERY',
    topics: [
      createTopic('Threat Landscape', Map),
      createTopic('Log Sources', Database),
      createTopic('Compliance Requirements', FileText),
      createTopic('Data Privacy', Lock),
      createTopic('Success Metrics', Activity)
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — ARCHITECTURE',
    topics: [
      createTopic('Agent vs Agentless', Cpu),
      createTopic('Data Ingestion', Cloud),
      createTopic('Storage Architecture', Database),
      createTopic('Parsing Engine', FileText),
      createTopic('RBAC & IAM', Lock)
    ]
  },
  {
    id: 'phase-2-monitoring',
    name: 'PHASE 2 — MONITORING ENGINE',
    topics: [
      createTopic('Kernel Visibility (eBPF)', Eye),
      createTopic('Network Packet Analysis', Network),
      createTopic('Endpoint Telemetry', Server),
      createTopic('Cloud Trail Hooks', Cloud),
      createTopic('Anomaly Detection', AlertTriangle)
    ]
  },
  {
    id: 'phase-3-detection',
    name: 'PHASE 3 — DETECTION LOGIC',
    topics: [
      createTopic('YARA Rule Engine', FileText),
      createTopic('Sigma Rules Integration', Shield),
      createTopic('Behavioral Heuristics', Activity),
      createTopic('False Positive Tuning', Settings),
      createTopic('Threat Intelligence Feeds', Crosshair)
    ]
  },
  {
    id: 'phase-4-response',
    name: 'PHASE 4 — AUTOMATED RESPONSE',
    topics: [
      createTopic('SOAR Playbooks', Play),
      createTopic('Process Termination', Skull), // Wait, Skull isn't imported. I will import it. Let me just use Shield for now.
      createTopic('Network Isolation', Network),
      createTopic('Alert Triage', AlertTriangle),
      createTopic('Forensic Evidence Capture', Search)
    ]
  },
  {
    id: 'phase-5-production',
    name: 'PHASE 5 — PRODUCTION READINESS',
    topics: [
      createTopic('Self-Protection (Anti-Tamper)', Shield),
      createTopic('Performance Overhead', Cpu),
      createTopic('Encryption at Rest', Lock),
      createTopic('Audit Logging', FileText)
    ]
  },
  {
    id: 'phase-6-live',
    name: 'PHASE 6 — LIVE OPERATIONS',
    topics: [
      createTopic('Dashboarding', Activity),
      createTopic('Incident Response', Shield),
      createTopic('Rule Updates', RefreshCcw), // Need to import RefreshCcw
      createTopic('Threat Hunting', Search)
    ]
  }
];

const filterTaxonomy = (keep: string[], hide: string[]) => {
  return cyberBlueProductionTaxonomy.map(cat => {
    return {
      ...cat,
      topics: cat.topics.filter(t => {
        if (hide.includes(t.name)) return false;
        if (keep.length > 0 && !keep.includes(t.name)) return false;
        return true;
      })
    };
  }).filter(cat => cat.topics.length > 0);
};

export const cyberBlueHackathonTaxonomy: Category[] = filterTaxonomy(
  [
    'Threat Landscape', 'Log Sources', 'Agent vs Agentless', 'Parsing Engine',
    'Network Packet Analysis', 'YARA Rule Engine', 'Dashboarding'
  ],
  [
    'Kernel Visibility (eBPF)', 'Self-Protection (Anti-Tamper)', 'Process Termination', 'Network Isolation'
  ]
);

export const cyberBluePersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Kernel Visibility (eBPF)', 'SOAR Playbooks', 'Self-Protection (Anti-Tamper)'
  ]
);

export const cyberBlueCustomTaxonomy = cyberBlueProductionTaxonomy;
