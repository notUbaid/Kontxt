import { FileText, ShieldAlert, Target, Crosshair, Network, 
  Cpu, Database, Cloud, Key, FileCode, Search, Server, Skull, Activity, Play, Code, Globe
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const cyberRedProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — SCOPE & ROE',
    topics: [
      createTopic('Target Selection', Target, [
      { name: 'CISA Rules of Engagement Guide', url: 'https://www.cisa.gov/news-events/news/cisa-announces-new-vulnerability-scanning-rules-engagement' },
      { name: 'Scope Creep in Red Teaming', url: 'https://www.redteamsec.com/blog/managing-scope-creep-in-red-teaming' }
    ], 'cyberredtargetselection'),
      createTopic('Rules of Engagement', FileText, [
      { name: 'SANS ROE Templates', url: 'https://www.sans.org/white-papers/33273/' },
      { name: 'CFAA and Security Research', url: 'https://www.eff.org/issues/cfaa' }
    ], 'cyberredrulesofengagement'),
      createTopic('Legal Liability', ShieldAlert, [
      { name: 'EFF Coders Rights Project', url: 'https://www.eff.org/issues/coders/vulnerability-reporting-faq' },
      { name: 'Offensive Security Liability Insurance', url: 'https://www.techinsurance.com/cyber-liability-insurance' }
    ], 'cyberredlegalliability'),
      createTopic('Threat Modeling', Skull, [
      { name: 'MITRE ATT&CK Framework', url: 'https://attack.mitre.org/' },
      { name: 'STRIDE for Infrastructure', url: 'https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats' }
    ], 'cyberredthreatmodeling'),
      createTopic('Scope Boundaries', Activity, [
      { name: 'Building a Math-based CIDR Validator', url: 'https://pkg.go.dev/net#ParseCIDR' },
      { name: 'Preventing Out-of-Scope Execution', url: 'https://hackerone.com/ethical-hacker/managing-scope' }
    ], 'cyberredscopeboundaries'),
      createTopic('Success Metrics', Target, [
      { name: 'Measuring Red Team Success', url: 'https://www.optiv.com/insights/blog/how-measure-red-team-success' },
      { name: 'CVSS v4.0 Calculator', url: 'https://www.first.org/cvss/calculator/4.0' }
    ], 'cyberredsuccessmetrics')
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — TOOL ARCHITECTURE',
    topics: [
      createTopic('Execution Flow', Network, [
      { name: 'RabbitMQ for Distributed Scanners', url: 'https://www.rabbitmq.com/tutorials' },
      { name: 'Building Asynchronous Pipelines in Go', url: 'https://go.dev/blog/pipelines' }
    ], 'cyberredexecutionflow'),
      createTopic('Stealth & Evasion', Crosshair, [
      { name: 'AMSI Bypass Techniques', url: 'https://github.com/S3cur3Th1sSh1t/Amsi-Bypass-Powershell' },
      { name: 'Hell\'s Gate: Direct Syscalls', url: 'https://github.com/am0nsec/HellsGate' }
    ], 'cyberredstealthevasion'),
      createTopic('Payload Delivery', Cloud, [
      { name: 'Domain Fronting Explained', url: 'https://www.cloudflare.com/learning/privacy/what-is-domain-fronting/' },
      { name: 'Environment Keying payloads', url: 'https://www.mandiant.com/resources/blog/environment-keying-in-malware' }
    ], 'cyberredpayloaddelivery'),
      createTopic('C2 Architecture', Server, [
      { name: 'Cobalt Strike Malleable C2', url: 'https://hstechdocs.helpsystems.com/manuals/cobaltstrike/current/userguide/content/topics/malleable-c2_main.htm' },
      { name: 'Mythic C2 Framework', url: 'https://github.com/its-a-feature/Mythic' }
    ], 'cyberredc2architecture'),
      createTopic('Language Selection', Code, [
      { name: 'Black Hat Rust', url: 'https://kerkour.com/black-hat-rust' },
      { name: 'Go for Offensive Security', url: 'https://github.com/D00MFist/Go4IT' }
    ], 'cyberredlanguageselection'),
      createTopic('Concurrency Model', Cpu, [
      { name: 'Goroutines for Network Scanning', url: 'https://gobyexample.com/goroutines' },
      { name: 'Throttling Python Requests', url: 'https://pypi.org/project/ratelimit/' }
    ], 'cyberredconcurrencymodel')
    ]
  },
  {
    id: 'phase-2-recon',
    name: 'PHASE 2 — RECONNAISSANCE ENGINE',
    topics: [
      createTopic('OSINT Aggregation', Search, [
      { name: 'Shodan Developer API', url: 'https://developer.shodan.io/' },
      { name: 'Certificate Transparency Logs', url: 'https://certificate.transparency.dev/' }
    ], 'cyberredosintaggregation'),
      createTopic('Port Scanning', Network, [
      { name: 'Nmap Scripting Engine (NSE)', url: 'https://nmap.org/book/nse.html' },
      { name: 'Masscan: The Asynchronous Scanner', url: 'https://github.com/robertdavidgraham/masscan' }
    ], 'cyberredportscanning'),
      createTopic('Service Enumeration', Server, [
      { name: 'Nmap Service Probes', url: 'https://nmap.org/book/vscan-technique-probes.html' },
      { name: 'Impacket for SMB Enumeration', url: 'https://github.com/fortra/impacket' }
    ], 'cyberredserviceenumeration'),
      createTopic('Subdomain Brute-forcing', Database, [
      { name: 'SecLists: The Pentester\'s Dictionary', url: 'https://github.com/danielmiessler/SecLists' },
      { name: 'ffuf - Fast Web Fuzzer', url: 'https://github.com/ffuf/ffuf' }
    ], 'cyberredsubdomainbruteforcing'),
      createTopic('Rate Limiting Evasion', Activity, [
      { name: 'JA3/JA4 TLS Fingerprinting', url: 'https://engineering.salesforce.com/tls-fingerprinting-with-ja3-and-ja3s-247362855967/' },
      { name: 'Bypassing Cloudflare WAF', url: 'https://github.com/hackroulette/cloudflare-bypass' }
    ], 'cyberredratelimitingevasion')
    ]
  },
  {
    id: 'phase-3-exploit',
    name: 'PHASE 3 — EXPLOITATION ENGINE',
    topics: [
      createTopic('Vulnerability Matching', Target, [
      { name: 'Nuclei Template Engine', url: 'https://nuclei.projectdiscovery.io/' },
      { name: 'Exploit Database API', url: 'https://www.exploit-db.com/' }
    ], 'cyberredvulnerabilitymatching'),
      createTopic('Payload Generation', FileCode, [
      { name: 'Msfvenom Payload Generator', url: 'https://www.offensive-security.com/metasploit-unleashed/msfvenom/' },
      { name: 'Polymorphic Shellcode Techniques', url: 'https://www.exploit-db.com/docs/english/13014-writing-polymorphic-shellcode.pdf' }
    ], 'cyberredpayloadgeneration'),
      createTopic('Memory Exploitation', Cpu, [
      { name: 'Corelan: Exploit Writing Tutorials', url: 'https://www.corelan.be/index.php/2009/07/19/exploit-writing-tutorial-part-1-stack-based-overflows/' },
      { name: 'Bypassing DEP and ASLR', url: 'https://fuzzysecurity.com/tutorials/expDev/7.html' }
    ], 'cyberredmemoryexploitation'),
      createTopic('Web Exploitation', Globe, [
      { name: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
      { name: 'OAST with Interactsh', url: 'https://github.com/projectdiscovery/interactsh' }
    ], 'cyberredwebexploitation'),
      createTopic('Authentication Bypass', Key, [
      { name: 'Kerberoasting Explained', url: 'https://www.tarlogic.com/blog/how-to-attack-kerberos/' },
      { name: 'JWT Vulnerabilities', url: 'https://portswigger.net/web-security/jwt' }
    ], 'cyberredauthenticationbypass')
    ]
  },
  {
    id: 'phase-4-post-exploit',
    name: 'PHASE 4 — POST-EXPLOITATION',
    topics: [
      createTopic('Privilege Escalation', ShieldAlert, [
      { name: 'LinPEAS / WinPEAS', url: 'https://github.com/carlospolop/PEASS-ng' },
      { name: 'Windows Token Impersonation', url: 'https://www.ired.team/offensive-security/privilege-escalation/windows-namedpipes-privilege-escalation' }
    ], 'cyberredprivilegeescalation'),
      createTopic('Persistence Mechanisms', Server, [
      { name: 'DLL Search Order Hijacking', url: 'https://attack.mitre.org/techniques/T1574/001/' },
      { name: 'WMI Persistence', url: 'https://www.fireeye.com/blog/threat-research/2017/01/wmi_vs_wmi_monitor.html' }
    ], 'cyberredpersistencemechanisms'),
      createTopic('Lateral Movement', Network, [
      { name: 'Pass-the-Hash with Impacket', url: 'https://www.kali.org/tools/impacket/' },
      { name: 'P2P C2 Routing with SMB Named Pipes', url: 'https://hstechdocs.helpsystems.com/manuals/cobaltstrike/current/userguide/content/topics/smb-beacon_main.htm' }
    ], 'cyberredlateralmovement'),
      createTopic('Data Exfiltration', Cloud, [
      { name: 'DNS Tunneling with Iodine', url: 'https://github.com/yarrick/iodine' },
      { name: 'Exfiltration over Cloud APIs', url: 'https://attack.mitre.org/techniques/T1567/002/' }
    ], 'cyberreddataexfiltration'),
      createTopic('Log Wiping', FileText, [
      { name: 'Windows EVTX Tampering', url: 'https://github.com/3gstudent/EventLogedit-evtx--Clear' },
      { name: 'EDR Blinding via ETW Patching', url: 'https://www.mdsec.co.uk/2020/03/hiding-your-net-etw/' }
    ], 'cyberredlogwiping')
    ]
  },
  {
    id: 'phase-5-release',
    name: 'PHASE 5 — PACKAGING & RELEASE',
    topics: [
      createTopic('Binary Obfuscation', ShieldAlert, [
      { name: 'O-LLVM Obfuscation', url: 'https://github.com/obfuscator-llvm/obfuscator' },
      { name: 'Bypassing SmartScreen via Code Signing', url: 'https://www.trustedsec.com/blog/bypassing-smartscreen-with-code-signing' }
    ], 'cyberredbinaryobfuscation'),
      createTopic('Cross-Compilation', Cpu, [
      { name: 'Cross-Compiling C for Windows', url: 'https://mingw-w64.org/doku.php' },
      { name: 'Go Cross-Compilation Guide', url: 'https://www.digitalocean.com/community/tutorials/how-to-build-go-executables-for-multiple-platforms-on-ubuntu-16-04' }
    ], 'cyberredcrosscompilation'),
      createTopic('Documentation', FileText, [
      { name: 'Writing Red Team Reports', url: 'https://www.redteamsec.com/blog/red-team-reporting' },
      { name: 'Generating IOCs for Blue Teams', url: 'https://www.crowdstrike.com/cybersecurity-101/indicator-of-compromise-ioc/' }
    ], 'cyberreddocumentation'),
      createTopic('Ethical Disclaimers', FileText, [
      { name: 'Writing EULAs for Security Tools', url: 'https://www.termly.io/resources/articles/eula-vs-terms-and-conditions/' },
      { name: 'Export Controls on Cyber Weapons (Wassenaar)', url: 'https://www.wassenaar.org/' }
    ], 'cyberredethicaldisclaimers'),
      createTopic('Release Pipeline', Play, [
      { name: 'Reproducible Builds in Go', url: 'https://reproducible-builds.org/docs/go/' },
      { name: 'Securing GitHub Actions', url: 'https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions' }
    ], 'cyberredreleasepipeline')
    ]
  },
  {
    id: 'phase-6-maintenance',
    name: 'PHASE 6 — THREAT UPDATES',
    topics: [
      createTopic('CVE Integration', Database, [
      { name: 'NVD Developer API', url: 'https://nvd.nist.gov/developers' },
      { name: 'Automated Exploit Generation (AEG)', url: 'https://en.wikipedia.org/wiki/Automatic_exploit_generation' }
    ], 'cyberredcveintegration'),
      createTopic('Signature Updates', FileCode, [
      { name: 'Encrypted Threat Feeds Architecture', url: 'https://www.misp-project.org/' },
      { name: 'Cryptographic Integrity Checks', url: 'https://csrc.nist.gov/glossary/term/cryptographic_integrity_check' }
    ], 'cyberredsignatureupdates'),
      createTopic('Bypass Maintenance', Crosshair, [
      { name: 'Automated EDR Testing Labs', url: 'https://github.com/splunk/attack_data' },
      { name: 'Continuous Integration for Malware', url: 'https://medium.com/@jordan.s.drysdale/ci-cd-for-malware-part-1-b286b5952f4c' }
    ], 'cyberredbypassmaintenance')
    ]
  }
];

const filterTaxonomy = (keep: string[], hide: string[]) => {
  return cyberRedProductionTaxonomy.map(cat => {
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

export const cyberRedHackathonTaxonomy: Category[] = filterTaxonomy(
  [
    'Target Selection', 'Threat Modeling', 'Execution Flow', 'Language Selection',
    'OSINT Aggregation', 'Port Scanning', 'Vulnerability Matching', 'Documentation', 'Ethical Disclaimers'
  ],
  [
    'C2 Architecture', 'Memory Exploitation', 'Privilege Escalation', 'Lateral Movement', 'Log Wiping'
  ]
);

export const cyberRedPersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'C2 Architecture', 'Lateral Movement', 'Data Exfiltration', 'Log Wiping'
  ]
);

export const cyberRedCustomTaxonomy = cyberRedProductionTaxonomy;
