import { FileText, Shield, CheckCircle, Activity, Database, Server, Network, 
  Search, AlertTriangle, Play, Settings, Cloud, Lock, Crosshair, Code, FileCode
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const cyberDevSecOpsProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — COMPLIANCE SCOPE',
    topics: [
      createTopic('Compliance Framework (SOC2/HIPAA)', FileText),
      createTopic('Data Classification', Lock),
      createTopic('Asset Inventory', Database),
      createTopic('Identity Management (IAM)', Shield),
      createTopic('Risk Assessment', AlertTriangle)
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PIPELINE ARCHITECTURE',
    topics: [
      createTopic('Shift-Left Strategy', Activity),
      createTopic('CI/CD Integration Hooks', Settings),
      createTopic('Secrets Management', Lock),
      createTopic('Zero-Trust Architecture', Shield),
      createTopic('Infrastructure as Code (IaC)', Code)
    ]
  },
  {
    id: 'phase-2-sast-dast',
    name: 'PHASE 2 — CODE SECURITY (SAST/DAST)',
    topics: [
      createTopic('Static Code Analysis (SAST)', FileCode),
      createTopic('Dynamic Analysis (DAST)', Search),
      createTopic('Software Composition (SCA)', Database),
      createTopic('SBOM Generation', FileText),
      createTopic('Container Vulnerability Scanning', Cloud)
    ]
  },
  {
    id: 'phase-3-cloud-sec',
    name: 'PHASE 3 — CLOUD & IAC SECURITY',
    topics: [
      createTopic('Terraform Drift Detection', Code),
      createTopic('CSPM (Cloud Posture)', Cloud),
      createTopic('Kubernetes Misconfigurations', Server),
      createTopic('Network Policy Scanning', Network),
      createTopic('IAM Privilege Escalation Checks', Lock)
    ]
  },
  {
    id: 'phase-4-remediation',
    name: 'PHASE 4 — AUTOMATED REMEDIATION',
    topics: [
      createTopic('Auto-Fix PR Generation', FileCode),
      createTopic('Pipeline Blocking Policies', Shield),
      createTopic('False Positive Handling', Settings),
      createTopic('Developer Notification Workflows', Activity)
    ]
  },
  {
    id: 'phase-5-production',
    name: 'PHASE 5 — AUDIT & GRC',
    topics: [
      createTopic('Evidence Collection', FileText),
      createTopic('Continuous Compliance Monitoring', CheckCircle),
      createTopic('Audit Logs Archiving', Database),
      createTopic('Vendor Risk Management', Shield)
    ]
  },
  {
    id: 'phase-6-live',
    name: 'PHASE 6 — LIVE OPERATIONS',
    topics: [
      createTopic('Vulnerability SLA Tracking', Activity),
      createTopic('Dashboarding & Reporting', Search),
      createTopic('Incident Response Plans', Play),
      createTopic('Red Team Exercises', Crosshair)
    ]
  }
];

const filterTaxonomy = (keep: string[], hide: string[]) => {
  return cyberDevSecOpsProductionTaxonomy.map(cat => {
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

export const cyberDevSecOpsHackathonTaxonomy: Category[] = filterTaxonomy(
  [
    'Compliance Framework (SOC2/HIPAA)', 'CI/CD Integration Hooks', 'Static Code Analysis (SAST)',
    'Software Composition (SCA)', 'Container Vulnerability Scanning', 'Dashboarding & Reporting'
  ],
  [
    'Zero-Trust Architecture', 'Terraform Drift Detection', 'Kubernetes Misconfigurations', 'Evidence Collection'
  ]
);

export const cyberDevSecOpsPersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Zero-Trust Architecture', 'Continuous Compliance Monitoring', 'Vendor Risk Management', 'Evidence Collection'
  ]
);

export const cyberDevSecOpsCustomTaxonomy = cyberDevSecOpsProductionTaxonomy;
