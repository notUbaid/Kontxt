import { 
  Target, Database, HardDrive, ArrowRightLeft, Cpu, GitMerge, FileText, 
  Settings, Filter, Shield, AlertCircle, Cloud, Terminal, CheckSquare, 
  Globe, Zap, Key, Rocket, FileJson, Clock, DollarSign,
  Monitor, RefreshCcw, Layers
, Presentation , HelpCircle } from 'lucide-react';
import { type Category, createTopic } from './types';

export const dataPipelineProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — DATA STRATEGY & DISCOVERY',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Pipeline Objective', Target, [{name:'Data Eng Use Cases',url:'https://aws.amazon.com/big-data/datalakes-and-analytics/'}], 'datapipeobjective'),
      createTopic('Source Identification', Database, [{name:'Airbyte Sources',url:'https://airbyte.com/connectors'}], 'datapipe-sources'),
      createTopic('Target Destination', HardDrive, [{name:'Snowflake vs BigQuery',url:'https://www.fivetran.com/blog/snowflake-vs-bigquery'}], 'datapipe-destination'),
      createTopic('Data Freshness & SLA', Clock, [{name:'Streaming vs Batch',url:'https://www.confluent.io/learn/batch-vs-real-time-data-processing/'}], 'datapipe-sla'),
    ]
  },
  {
    id: 'phase-1-architecture',
    name: 'PHASE 1 — PIPELINE ARCHITECTURE',
    topics: [
      createTopic('ETL vs ELT', ArrowRightLeft, [{name:'The Modern Data Stack',url:'https://www.getdbt.com/blog/future-of-the-modern-data-stack'}], 'datapipe-etl-elt'),
      createTopic('Compute & Transformation', Cpu, [{name:'dbt vs Spark',url:'https://www.databricks.com/glossary/dbt'}], 'datapipe-compute'),
      createTopic('Orchestration Selection', GitMerge, [{name:'Airflow vs Dagster',url:'https://dagster.io/blog/dagster-vs-airflow'}], 'datapipe-orchestration'),
      createTopic('Data Modeling', Layers, [{name:'Star Schema Basics',url:'https://www.ibm.com/topics/star-schema'}], 'datapipe-modeling'),
    ]
  },
  {
    id: 'phase-2-ingestion',
    name: 'PHASE 2 — DATA INGESTION (EXTRACT & LOAD)',
    topics: [
      createTopic('API Ingestion', Globe, [{name:'REST API Best Practices',url:'https://restfulapi.net/'}], 'datapipe-api-ingest'),
      createTopic('Web Scraping', FileJson, [{name:'Playwright Docs',url:'https://playwright.dev/'}], 'datapipe-scraping'),
      createTopic('Change Data Capture (CDC)', RefreshCcw, [{name:'Debezium',url:'https://debezium.io/'}], 'datapipe-cdc'),
      createTopic('Data Contracts', Shield, [{name:'Data Contracts Architecture',url:'https://datacontract.com/'}], 'datapipe-contracts'),
    ]
  },
  {
    id: 'phase-3-transformation',
    name: 'PHASE 3 — TRANSFORMATION',
    topics: [
      createTopic('Transformation Fundamentals', Settings, [{name:'dbt Core Documentation',url:'https://docs.getdbt.com/docs/core/what-is-dbt-core'}], 'datapipe-transformation'),
      createTopic('Data Cleaning', Filter, [{name:'Data Quality Checks',url:'https://great-expectations.io/'}], 'datapipe-cleaning'),
      createTopic('Incremental Processing', Zap, [{name:'dbt Incremental Models',url:'https://docs.getdbt.com/docs/build/incremental-models'}], 'datapipe-incremental'),
      createTopic('Testing Data', CheckSquare, [{name:'dbt Tests',url:'https://docs.getdbt.com/docs/build/tests'}], 'datapipe-testing'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('CI/CD for Data', Rocket, [{name:'dbt CI/CD',url:'https://docs.getdbt.com/docs/deploy/continuous-integration'}], 'datapipe-cicd'),
      createTopic('Monitoring & Alerting', Monitor, [{name:'Monte Carlo Data Observability',url:'https://www.montecarlodata.com/'}], 'datapipe-monitoring'),
      createTopic('Error Handling & Retries', AlertCircle, [{name:'Airflow Retries',url:'https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/tasks.html#task-retries'}], 'datapipe-retries'),
      createTopic('Cost Optimization', DollarSign, [{name:'BigQuery Cost Optimization',url:'https://cloud.google.com/bigquery/docs/best-practices-costs'}], 'datapipe-costs'),
      createTopic('Infrastructure as Code', Terminal, [{name:'Terraform for Data',url:'https://developer.hashicorp.com/terraform'}], 'datapipe-iac'),
    ]
  },
  {
    id: 'phase-5-deployment',
    name: 'PHASE 5 — DEPLOYMENT & MAINTENANCE',
    topics: [
      createTopic('Deployment Strategy', Cloud, [{name:'Blue/Green Data Deployments',url:'https://www.getdbt.com/blog/blue-green-deployments-with-dbt'}], 'datapipe-deployment'),
      createTopic('Backfilling Data', HardDrive, [{name:'Airflow Backfilling',url:'https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dag-run.html#backfill'}], 'datapipe-backfilling'),
      createTopic('Data Lineage & Docs', FileText, [{name:'dbt Docs',url:'https://docs.getdbt.com/docs/collaborate/documentation'}], 'datapipe-lineage'),
      createTopic('Governance & Access', Key, [{name:'Row-Level Security',url:'https://docs.snowflake.com/en/user-guide/security-row-intro'}], 'datapipe-governance'),
      createTopic('Presentation Prep', Presentation),
      createTopic('Pitch Deck', Presentation),
      createTopic('Final Presentation', Presentation),
      createTopic('Demo Script', FileText),
      createTopic('Submission Checklist', CheckSquare),
    ]
  }
];

// Helper to filter taxonomy
const filterTaxonomy = (keep: string[], hide: string[]) => {
  return dataPipelineProductionTaxonomy.map(cat => {
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

// Hackathon: Fast data movement
export const dataPipelineHackathonTaxonomy: Category[] = filterTaxonomy(
  [
    'Welcome',
    'Pipeline Objective', 'Source Identification', 'Target Destination',
    'API Ingestion', 'Web Scraping', 'Data Cleaning', 'Deployment Strategy',
    'Presentation Prep', 'Demo Script', 'Submission Checklist',],
  []
);

// Personal: Clean automated ELT with free tiers
export const dataPipelinePersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Change Data Capture (CDC)', 'Infrastructure as Code', 'Governance & Access'
  ]
);

export const dataPipelineCustomTaxonomy = dataPipelineProductionTaxonomy;
