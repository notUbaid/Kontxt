import { CheckSquare, FileText, Shield, CheckCircle, Activity, Database, Server, Network, 
  Search, AlertTriangle, Play, Settings, Cloud, Lock, Crosshair, Code, FileCode
, Presentation , HelpCircle } from 'lucide-react';
import { type Category, createTopic } from './types';

export const cyberDevSecOpsProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — COMPLIANCE SCOPE',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Compliance Framework (SOC2/HIPAA)', FileText, [
        { name: 'SOC2 Trust Services Criteria', url: 'https://www.aicpa-cima.com/resources/article/trust-services-and-information-security' },
        { name: 'HIPAA Security Rule', url: 'https://www.hhs.gov/hipaa/for-professionals/security/index.html' }
      ], 'cyberdevsecopscompliance'),
      createTopic('Data Classification', Lock, [
        { name: 'NIST Data Classification', url: 'https://csrc.nist.gov/publications/detail/fips/199/final' }
      ], 'cyberdevsecopsdataclassification'),
      createTopic('Asset Inventory', Database, [
        { name: 'OWASP Asset Management', url: 'https://owasp.org/www-project-proactive-controls/v3/en/epc10-asset-management' }
      ], 'cyberdevsecopsassetinventory'),
      createTopic('Identity Management (IAM)', Shield, [
        { name: 'AWS IAM Best Practices', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html' }
      ], 'cyberdevsecopsiam'),
      createTopic('Risk Assessment', AlertTriangle, [
        { name: 'FAIR Risk Framework', url: 'https://www.fairinstitute.org/what-is-fair' }
      ], 'cyberdevsecopsriskassessment')
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PIPELINE ARCHITECTURE',
    topics: [
      createTopic('Shift-Left Strategy', Activity, [
        { name: 'DevSecOps Manifesto', url: 'https://www.devsecops.org/' }
      ], 'cyberdevsecopsshiftleft'),
      createTopic('CI/CD Integration Hooks', Settings, [
        { name: 'GitHub Actions Security', url: 'https://docs.github.com/en/actions/security-guides' }
      ], 'cyberdevsecopscicdhooks'),
      createTopic('Secrets Management', Lock, [
        { name: 'HashiCorp Vault', url: 'https://developer.hashicorp.com/vault/docs' },
        { name: 'Gitleaks (Secret Scanner)', url: 'https://github.com/gitleaks/gitleaks' }
      ], 'cyberdevsecopssecrets'),
      createTopic('Zero-Trust Architecture', Shield, [
        { name: 'CISA Zero Trust Model', url: 'https://www.cisa.gov/zero-trust-maturity-model' }
      ], 'cyberdevsecopszerotrust'),
      createTopic('Infrastructure as Code (IaC)', Code, [
        { name: 'Terraform Security Best Practices', url: 'https://www.hashicorp.com/resources/terraform-security-best-practices' }
      ], 'cyberdevsecopsiac')
    ]
  },
  {
    id: 'phase-2-sast-dast',
    name: 'PHASE 2 — CODE SECURITY (SAST/DAST)',
    topics: [
      createTopic('Static Code Analysis (SAST)', FileCode, [
        { name: 'Semgrep', url: 'https://semgrep.dev/' },
        { name: 'SonarQube SAST', url: 'https://www.sonarqube.org/' }
      ], 'cyberdevsecopssast'),
      createTopic('Dynamic Analysis (DAST)', Search, [
        { name: 'OWASP ZAP', url: 'https://www.zaproxy.org/' },
        { name: 'Nuclei Scanner', url: 'https://github.com/projectdiscovery/nuclei' }
      ], 'cyberdevsecopsdast'),
      createTopic('Software Composition (SCA)', Database, [
        { name: 'OWASP Dependency-Check', url: 'https://owasp.org/www-project-dependency-check/' },
        { name: 'Snyk SCA', url: 'https://snyk.io/product/open-source-security-management/' }
      ], 'cyberdevsecopssca'),
      createTopic('SBOM Generation', FileText, [
        { name: 'CycloneDX SBOM', url: 'https://cyclonedx.org/' },
        { name: 'Syft by Anchore', url: 'https://github.com/anchore/syft' }
      ], 'cyberdevsecopssbom'),
      createTopic('Container Vulnerability Scanning', Cloud, [
        { name: 'Trivy Scanner', url: 'https://github.com/aquasecurity/trivy' },
        { name: 'Clair', url: 'https://github.com/quay/clair' }
      ], 'cyberdevsecopscontainerscanning')
    ]
  },
  {
    id: 'phase-3-cloud-sec',
    name: 'PHASE 3 — CLOUD & IAC SECURITY',
    topics: [
      createTopic('Terraform Drift Detection', Code, [
        { name: 'Driftctl', url: 'https://docs.driftctl.com/' }
      ], 'cyberdevsecopsdriftdetection'),
      createTopic('CSPM (Cloud Posture)', Cloud, [
        { name: 'CloudQuery', url: 'https://www.cloudquery.io/' },
        { name: 'Prowler AWS Scanner', url: 'https://github.com/prowler-cloud/prowler' }
      ], 'cyberdevsecopscspm'),
      createTopic('Kubernetes Misconfigurations', Server, [
        { name: 'Kube-Bench', url: 'https://github.com/aquasecurity/kube-bench' },
        { name: 'Checkov IaC Scanner', url: 'https://github.com/bridgecrewio/checkov' }
      ], 'cyberdevsecopsk8smisconfigs'),
      createTopic('Network Policy Scanning', Network, [
        { name: 'Cilium Network Policies', url: 'https://docs.cilium.io/en/stable/security/policy/' }
      ], 'cyberdevsecopsnetworkpolicy'),
      createTopic('IAM Privilege Escalation Checks', Lock, [
        { name: 'AWS IAM Access Analyzer', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html' }
      ], 'cyberdevsecopsiamescalation')
    ]
  },
  {
    id: 'phase-4-remediation',
    name: 'PHASE 4 — AUTOMATED REMEDIATION',
    topics: [
      createTopic('Auto-Fix PR Generation', FileCode, [
        { name: 'Dependabot', url: 'https://docs.github.com/en/code-security/dependabot' },
        { name: 'Renovate Bot', url: 'https://docs.renovatebot.com/' }
      ], 'cyberdevsecopsautofix'),
      createTopic('Pipeline Blocking Policies', Shield, [
        { name: 'Open Policy Agent (OPA)', url: 'https://www.openpolicyagent.org/' }
      ], 'cyberdevsecopspipelineblocking'),
      createTopic('False Positive Handling', Settings, [
        { name: 'SAST False Positive Management', url: 'https://www.csoonline.com/article/570776/managing-sast-false-positives.html' }
      ], 'cyberdevsecopsfalsepositives'),
      createTopic('Developer Notification Workflows', Activity, [
        { name: 'DefectDojo', url: 'https://www.defectdojo.org/' }
      ], 'cyberdevsecopsnotifications')
    ]
  },
  {
    id: 'phase-5-production',
    name: 'PHASE 5 — AUDIT & GRC',
    topics: [
      createTopic('Evidence Collection', FileText, [
        { name: 'Vanta Compliance', url: 'https://www.vanta.com/' }
      ], 'cyberdevsecopsevidence'),
      createTopic('Continuous Compliance Monitoring', CheckCircle, [
        { name: 'AWS Security Hub', url: 'https://aws.amazon.com/security-hub/' }
      ], 'cyberdevsecopscontinuouscompliance'),
      createTopic('Audit Logs Archiving', Database, [
        { name: 'WORM Storage Best Practices', url: 'https://aws.amazon.com/blogs/storage/protecting-data-with-amazon-s3-object-lock/' }
      ], 'cyberdevsecopsauditarchiving'),
      createTopic('Vendor Risk Management', Shield, [
        { name: 'Third-Party Risk (NIST)', url: 'https://www.nist.gov/cyberframework/supply-chain-risk-management' }
      ], 'cyberdevsecopsvendorrisk')
    ]
  },
  {
    id: 'phase-6-live',
    name: 'PHASE 6 — LIVE OPERATIONS',
    topics: [
      createTopic('Vulnerability SLA Tracking', Activity, [
        { name: 'CISA Binding Operational Directive 22-01', url: 'https://www.cisa.gov/binding-operational-directive-22-01' }
      ], 'cyberdevsecopsvulnsla'),
      createTopic('Dashboarding & Reporting', Search, [
        { name: 'Faraday Sec', url: 'https://faradaysec.com/' }
      ], 'cyberdevsecopsdashboarding'),
      createTopic('Incident Response Plans', Play, [
        { name: 'AWS Incident Response Guide', url: 'https://docs.aws.amazon.com/whitepapers/latest/aws-security-incident-response-guide/welcome.html' }
      ], 'cyberdevsecopsincidentresponse'),
      createTopic('Red Team Exercises', Crosshair, [
        { name: 'Atomic Red Team', url: 'https://github.com/redcanaryco/atomic-red-team' }
      ], 'cyberdevsecopsredteam'),
      createTopic('Presentation Prep', Presentation),
      createTopic('Pitch Deck', Presentation),
      createTopic('Final Presentation', Presentation),
      createTopic('Demo Script', FileText),
      createTopic('Submission Checklist', CheckSquare),
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
    'Welcome',
    'Compliance Framework (SOC2/HIPAA)', 'CI/CD Integration Hooks', 'Static Code Analysis (SAST)',
    'Software Composition (SCA)', 'Container Vulnerability Scanning', 'Dashboarding & Reporting',
    'Presentation Prep', 'Demo Script', 'Submission Checklist', 'Pitch Deck'],
  []
);

export const cyberDevSecOpsPersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  ['Continuous Compliance Monitoring', 'Audit Logs Archiving', 'Vendor Risk Management', 'Compliance Framework (SOC2/HIPAA)']
);
