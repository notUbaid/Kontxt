import { CheckSquare, FileText, Shield, Eye, Activity, Database, Server, Network, 
  Search, AlertTriangle, Play, Settings, Cloud, Cpu, Lock, Crosshair, Map, Skull, RefreshCcw
, Presentation , HelpCircle } from 'lucide-react';
import { type Category, createTopic } from './types';

export const cyberBlueProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — DISCOVERY',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Threat Landscape', Map, [
        { name: 'MITRE D3FEND Matrix', url: 'https://d3fend.mitre.org/' },
        { name: 'SANS Threat Modeling', url: 'https://www.sans.org/white-papers/39985/' }
      ], 'cyberbluethreatlandscape'),
      createTopic('Log Sources', Database, [
        { name: 'Windows Event Forwarding (WEF)', url: 'https://learn.microsoft.com/en-us/windows/security/threat-protection/use-windows-event-forwarding-to-assist-in-intrusion-detection' },
        { name: 'Sysmon Configuration', url: 'https://github.com/SwiftOnSecurity/sysmon-config' }
      ], 'cyberbluelogsources'),
      createTopic('Compliance Requirements', FileText, [
        { name: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework' },
        { name: 'CIS Controls', url: 'https://www.cisecurity.org/controls' }
      ], 'cyberbluecompliance'),
      createTopic('Data Privacy', Lock, [
        { name: 'GDPR Data Minimization', url: 'https://gdpr.eu/data-minimization/' }
      ], 'cyberbluedataprivacy'),
      createTopic('Success Metrics', Activity, [
        { name: 'MTTD and MTTR Metrics', url: 'https://www.splunk.com/en_us/data-insider/what-is-mttd-and-mttr.html' }
      ], 'cyberbluesuccessmetrics')
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — ARCHITECTURE',
    topics: [
      createTopic('Agent vs Agentless', Cpu, [
        { name: 'Wazuh Agent Documentation', url: 'https://documentation.wazuh.com/current/user-manual/agents/index.html' }
      ], 'cyberblueagentvsagentless'),
      createTopic('Data Ingestion', Cloud, [
        { name: 'Elastic Logstash Pipeline', url: 'https://www.elastic.co/guide/en/logstash/current/pipeline.html' },
        { name: 'Vector (by Datadog)', url: 'https://vector.dev/' }
      ], 'cyberbluedataingestion'),
      createTopic('Storage Architecture', Database, [
        { name: 'Hot/Warm/Cold Storage in Elastic', url: 'https://www.elastic.co/blog/implementing-hot-warm-cold-in-elasticsearch-with-index-lifecycle-management' }
      ], 'cyberbluestoragearchitecture'),
      createTopic('Parsing Engine', FileText, [
        { name: 'Grok Patterns', url: 'https://github.com/hpcugent/logstash-patterns/blob/master/files/grok-patterns' }
      ], 'cyberblueparsingengine'),
      createTopic('RBAC & IAM', Lock, [
        { name: 'AWS IAM Best Practices', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html' }
      ], 'cyberbluerbac')
    ]
  },
  {
    id: 'phase-2-monitoring',
    name: 'PHASE 2 — MONITORING ENGINE',
    topics: [
      createTopic('Kernel Visibility (eBPF)', Eye, [
        { name: 'eBPF Documentation', url: 'https://ebpf.io/' },
        { name: 'Tetragon (Cilium)', url: 'https://tetragon.io/' }
      ], 'cyberblueebpf'),
      createTopic('Network Packet Analysis', Network, [
        { name: 'Zeek Network Security Monitor', url: 'https://zeek.org/' },
        { name: 'Suricata IDS', url: 'https://suricata.io/' }
      ], 'cyberbluenetworkpacketanalysis'),
      createTopic('Endpoint Telemetry', Server, [
        { name: 'Velociraptor Digital Forensics', url: 'https://docs.velociraptor.app/' },
        { name: 'Osquery', url: 'https://osquery.io/' }
      ], 'cyberblueendpointtelemetry'),
      createTopic('Cloud Trail Hooks', Cloud, [
        { name: 'AWS CloudTrail', url: 'https://aws.amazon.com/cloudtrail/' },
        { name: 'GCP Audit Logs', url: 'https://cloud.google.com/logging/docs/audit' }
      ], 'cyberbluecloudtrail'),
      createTopic('Anomaly Detection', AlertTriangle, [
        { name: 'Elastic Machine Learning', url: 'https://www.elastic.co/guide/en/machine-learning/current/index.html' }
      ], 'cyberblueanomalydetection')
    ]
  },
  {
    id: 'phase-3-detection',
    name: 'PHASE 3 — DETECTION LOGIC',
    topics: [
      createTopic('YARA Rule Engine', FileText, [
        { name: 'YARA Documentation', url: 'https://yara.readthedocs.io/en/stable/' },
        { name: 'Awesome YARA', url: 'https://github.com/InQuest/awesome-yara' }
      ], 'cyberblueyara'),
      createTopic('Sigma Rules Integration', Shield, [
        { name: 'Sigma HQ', url: 'https://github.com/SigmaHQ/sigma' },
        { name: 'Uncoder.io (Rule Translation)', url: 'https://uncoder.io/' }
      ], 'cyberbluesigma'),
      createTopic('Behavioral Heuristics', Activity, [
        { name: 'MITRE ATT&CK Analytics', url: 'https://mitre-attack.github.io/attack-navigators/' }
      ], 'cyberbluebehavioralheuristics'),
      createTopic('False Positive Tuning', Settings, [
        { name: 'Alert Fatigue (Atlassian)', url: 'https://www.atlassian.com/incident-management/on-call/alert-fatigue' }
      ], 'cyberbluefalsepositives'),
      createTopic('Threat Intelligence Feeds', Crosshair, [
        { name: 'MISP Project', url: 'https://www.misp-project.org/' },
        { name: 'AlienVault OTX', url: 'https://otx.alienvault.com/' }
      ], 'cyberbluethreatintel')
    ]
  },
  {
    id: 'phase-4-response',
    name: 'PHASE 4 — AUTOMATED RESPONSE',
    topics: [
      createTopic('SOAR Playbooks', Play, [
        { name: 'Shuffle SOAR', url: 'https://shuffler.io/' },
        { name: 'TheHive Project', url: 'https://thehive-project.org/' }
      ], 'cyberbluesoar'),
      createTopic('Process Termination', Skull, [
        { name: 'Sysinternals PsKill', url: 'https://learn.microsoft.com/en-us/sysinternals/downloads/pskill' }
      ], 'cyberblueprocesstermination'),
      createTopic('Network Isolation', Network, [
        { name: 'Windows Firewall Isolation', url: 'https://learn.microsoft.com/en-us/windows/security/threat-protection/windows-firewall/windows-firewall-with-advanced-security' }
      ], 'cyberbluenetworkisolation'),
      createTopic('Alert Triage', AlertTriangle, [
        { name: 'SANS Incident Handler Handbook', url: 'https://www.sans.org/white-papers/33901/' }
      ], 'cyberbluealerttriage'),
      createTopic('Forensic Evidence Capture', Search, [
        { name: 'Volatility Memory Forensics', url: 'https://volatilityfoundation.org/' },
        { name: 'KAPE (Kroll Artifact Parser)', url: 'https://www.kroll.com/en/services/cyber-risk/incident-response-litigation-support/kroll-artifact-parser-extractor-kape' }
      ], 'cyberblueforensics')
    ]
  },
  {
    id: 'phase-5-production',
    name: 'PHASE 5 — PRODUCTION READINESS',
    topics: [
      createTopic('Self-Protection (Anti-Tamper)', Shield, [
        { name: 'EDR Evasion and Anti-Tampering', url: 'https://www.crowdstrike.com/blog/how-to-protect-against-edr-tampering/' }
      ], 'cyberblueantitamper'),
      createTopic('Performance Overhead', Cpu, [
        { name: 'Brendan Gregg: Systems Performance', url: 'https://www.brendangregg.com/linuxperf.html' }
      ], 'cyberblueperformance'),
      createTopic('Encryption at Rest', Lock, [
        { name: 'AWS KMS', url: 'https://aws.amazon.com/kms/' }
      ], 'cyberblueencryption'),
      createTopic('Audit Logging', FileText, [
        { name: 'OWASP Logging Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Vocabulary_Cheat_Sheet.html' }
      ], 'cyberblueauditlogging')
    ]
  },
  {
    id: 'phase-6-live',
    name: 'PHASE 6 — LIVE OPERATIONS',
    topics: [
      createTopic('Dashboarding', Activity, [
        { name: 'Grafana Security Dashboards', url: 'https://grafana.com/grafana/dashboards/' },
        { name: 'Kibana Lens', url: 'https://www.elastic.co/kibana/kibana-lens' }
      ], 'cyberbluedashboarding'),
      createTopic('Incident Response', Shield, [
        { name: 'PagerDuty IR Docs', url: 'https://response.pagerduty.com/' }
      ], 'cyberblueincidentresponse'),
      createTopic('Rule Updates', RefreshCcw, [
        { name: 'CI/CD for Detection as Code', url: 'https://www.snowflake.com/blog/detection-as-code/' }
      ], 'cyberblueruleupdates'),
      createTopic('Threat Hunting', Search, [
        { name: 'Threat Hunting Project', url: 'https://github.com/ThreatHuntingProject/ThreatHunting' },
        { name: 'Cymulate Threat Hunting', url: 'https://cymulate.com/threat-hunting/' }
      ], 'cyberbluethreathunting'),
      createTopic('Presentation Prep', Presentation),
      createTopic('Pitch Deck', Presentation),
      createTopic('Final Presentation', Presentation),
      createTopic('Demo Script', FileText),
      createTopic('Submission Checklist', CheckSquare),
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
    'Welcome',
    'Threat Landscape', 'Log Sources', 'Agent vs Agentless', 'Parsing Engine',
    'Network Packet Analysis', 'YARA Rule Engine', 'Dashboarding',
    'Presentation Prep', 'Demo Script', 'Submission Checklist',, 'Pitch Deck'],
  []
);

export const cyberBluePersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  ['Self-Protection (Anti-Tamper)', 'Compliance Requirements', 'SOAR Playbooks']
);
