import { 
  Users, BarChart, Settings, Activity, Link, Layers, Lock,
  Shield, AlertTriangle, AlertCircle, Cloud, Terminal, CheckSquare, Database,
  Globe, Zap, FileText, Box, HardDrive, Hexagon, Code, Key, Network, Rocket
} from 'lucide-react';
import { type Category, createTopic } from './types';

export const web3ProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — PROTOCOL DISCOVERY',
    topics: [
      createTopic('Target Audience', Users, [{name:'DeFi User Personas',url:'https://medium.com/'}], 'web3targetaudience'),
      createTopic('Competitor Analysis', BarChart, [{name:'DefiLlama',url:'https://defillama.com/'}], 'web3competitoranalysis'),
      createTopic('Tokenomics Design', Settings, [{name:'Tokenomics Fundamentals',url:'https://cobie.substack.com/p/token-design-101'}], 'web3tokenomics'),
      createTopic('Protocol Mechanics', Activity, [{name:'Mechanism Design',url:'https://en.wikipedia.org/wiki/Mechanism_design'}], 'web3protocolmechanics'),
      createTopic('Chain Selection', Network, [{name:'L2Beat',url:'https://l2beat.com/'}], 'web3chainselection'),
    ]
  },
  {
    id: 'phase-1-contract-design',
    name: 'PHASE 1 — SMART CONTRACT DESIGN',
    topics: [
      createTopic('Contract Architecture', Layers, [{name:'Smart Contract Best Practices',url:'https://consensys.github.io/smart-contract-best-practices/'}], 'web3contractarchitecture'),
      createTopic('Token Standards', Hexagon, [{name:'OpenZeppelin Contracts',url:'https://docs.openzeppelin.com/contracts/4.x/'}], 'web3tokenstandards'),
      createTopic('Access Control', Key, [{name:'OpenZeppelin Access Control',url:'https://docs.openzeppelin.com/contracts/4.x/access-control'}], 'web3accesscontrol'),
      createTopic('Upgradeability', Cloud, [{name:'Proxy Upgrade Pattern',url:'https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies'}], 'web3upgradeability'),
      createTopic('Oracle Integration', Link, [{name:'Chainlink Price Feeds',url:'https://docs.chain.link/data-feeds'}], 'web3oracleintegration'),
    ]
  },
  {
    id: 'phase-2-frontend-design',
    name: 'PHASE 2 — FRONTEND & UX DESIGN',
    topics: [
      createTopic('Web3 UX Patterns', Box, [{name:'Web3 Design Principles',url:'https://web3design.io/'}], 'web3uxpatterns'),
      createTopic('Wallet Connection Flows', Link, [{name:'RainbowKit',url:'https://www.rainbowkit.com/'}], 'web3walletflows'),
      createTopic('Transaction States', Activity, [{name:'Designing Transaction States',url:'https://uxdesign.cc/'}], 'web3transactionstates'),
      createTopic('Error Handling', AlertCircle, [{name:'Web3 Error Handling',url:'https://consensys.net/blog/developers/'}], 'web3errorhandling'),
    ]
  },
  {
    id: 'phase-3-contract-development',
    name: 'PHASE 3 — SMART CONTRACT DEVELOPMENT',
    topics: [
      createTopic('Development Environment', Terminal, [{name:'Foundry Book',url:'https://book.getfoundry.sh/'},{name:'Hardhat',url:'https://hardhat.org/'}], 'web3devenvironment'),
      createTopic('Writing Contracts', Code, [{name:'Solidity by Example',url:'https://solidity-by-example.org/'}], 'web3writingcontracts'),
      createTopic('Gas Optimization', Zap, [{name:'Gas Optimization Techniques',url:'https://github.com/harendra-sharma/Gas-Optimization-in-Solidity'}], 'web3gasoptimization'),
      createTopic('Unit Testing', CheckSquare, [{name:'Foundry Testing',url:'https://book.getfoundry.sh/forge/tests'}], 'web3unittesting'),
      createTopic('Local Testnet Deployment', Database, [{name:'Anvil',url:'https://book.getfoundry.sh/anvil/'}], 'web3localdeployment'),
    ]
  },
  {
    id: 'phase-4-frontend-integration',
    name: 'PHASE 4 — FRONTEND INTEGRATION',
    topics: [
      createTopic('Provider Setup', Globe, [{name:'Wagmi',url:'https://wagmi.sh/'},{name:'Viem',url:'https://viem.sh/'}], 'web3providersetup'),
      createTopic('Reading Contract State', FileText, [{name:'Wagmi useReadContract',url:'https://wagmi.sh/react/hooks/useReadContract'}], 'web3readingstate'),
      createTopic('Writing Transactions', HardDrive, [{name:'Wagmi useWriteContract',url:'https://wagmi.sh/react/hooks/useWriteContract'}], 'web3writingtransactions'),
      createTopic('Event Indexing', Database, [{name:'The Graph',url:'https://thegraph.com/'},{name:'Envio',url:'https://envio.dev/'}], 'web3eventindexing'),
    ]
  },
  {
    id: 'phase-5-security',
    name: 'PHASE 5 — SECURITY & AUDITING',
    topics: [
      createTopic('Common Vulnerabilities', AlertTriangle, [{name:'SWC Registry',url:'https://swcregistry.io/'},{name:'Rekt Database',url:'https://rekt.news/'}], 'web3vulnerabilities'),
      createTopic('Static Analysis', Shield, [{name:'Slither',url:'https://github.com/crytic/slither'}], 'web3staticanalysis'),
      createTopic('Testnet Deployment', Cloud, [{name:'Alchemy Faucets',url:'https://www.alchemy.com/faucets'}], 'web3testnetdeployment'),
      createTopic('Professional Audits', Shield, [{name:'Trail of Bits',url:'https://www.trailofbits.com/'},{name:'Spearbit',url:'https://spearbit.com/'}], 'web3professionalaudits'),
      createTopic('Bug Bounties', Lock, [{name:'Immunefi',url:'https://immunefi.com/'}], 'web3bugbounties'),
    ]
  },
  {
    id: 'phase-6-mainnet',
    name: 'PHASE 6 — MAINNET LAUNCH & OPERATIONS',
    topics: [
      createTopic('Mainnet Deployment', Rocket, [{name:'Etherscan Contract Verification',url:'https://etherscan.io/verifyContract'}], 'web3mainnetdeployment'),
      createTopic('Analytics & Monitoring', BarChart, [{name:'Tenderly',url:'https://tenderly.co/'},{name:'Dune Analytics',url:'https://dune.com/'}], 'web3monitoring'),
      createTopic('Governance Setup', Users, [{name:'Snapshot',url:'https://snapshot.org/'},{name:'Tally',url:'https://www.tally.xyz/'}], 'web3governance'),
      createTopic('Incident Response', AlertTriangle, [{name:'Smart Contract Incident Response',url:'https://github.com/nascentxyz/simple-security-toolkit'}], 'web3incidentresponse'),
    ]
  }
];

// Helper to filter taxonomy
const filterTaxonomy = (keep: string[], hide: string[]) => {
  return web3ProductionTaxonomy.map(cat => {
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

// Hackathon: Ship a working demo fast.
export const web3HackathonTaxonomy: Category[] = filterTaxonomy(
  [
    'Target Audience', 'Chain Selection', 'Wallet Connection Flows', 
    'Development Environment', 'Writing Contracts', 'Local Testnet Deployment', 
    'Provider Setup', 'Reading Contract State', 'Writing Transactions',
    'Testnet Deployment'
  ],
  []
);

// Personal: Portfolio-ready application without excessive costs.
export const web3PersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Access Control', 'Professional Audits', 'Bug Bounties', 'Governance Setup', 'Incident Response'
  ]
);

export const web3CustomTaxonomy = web3ProductionTaxonomy;
