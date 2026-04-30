import { motion, useInView } from 'framer-motion';
import {
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  CloudCog,
  Code2,
  Database,
  ExternalLink,
  Globe2,
  LineChart,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { trackEvent } from '@/lib/analytics';

type StrategyProject = {
  rank: number;
  title: string;
  roles: string[];
  problem: string;
  build: string;
  mvp: string[];
  stack: string[];
  metrics: string[];
  demo: string;
  difficulty: string;
  timeline: string;
  score: {
    recruiter: number;
    depth: number;
    feasibility: number;
    fit: number;
    uniqueness: number;
    overall: number;
  };
  icon: typeof BrainCircuit;
  evidence: string[];
};

type SourceLink = {
  label: string;
  url: string;
  group: 'AI agents' | 'Streaming data' | 'Security and fraud' | 'Enterprise data' | 'Datasets';
};

const sources: SourceLink[] = [
  {
    label: 'AWS: Evaluating AI agents',
    url: 'https://aws.amazon.com/blogs/machine-learning/evaluating-ai-agents-real-world-lessons-from-building-agentic-systems-at-amazon/',
    group: 'AI agents',
  },
  {
    label: 'Google Cloud: Agent evaluation quality gates',
    url: 'https://cloud.google.com/blog/topics/developers-practitioners/a-methodical-approach-to-agent-evaluation',
    group: 'AI agents',
  },
  {
    label: 'Microsoft: AI observability',
    url: 'https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/observability',
    group: 'AI agents',
  },
  {
    label: 'Arize: LLM observability',
    url: 'https://arize.com/blog-course/large-language-model-monitoring-observability/',
    group: 'AI agents',
  },
  {
    label: 'Evidently: open-source LLM tracing',
    url: 'https://www.evidentlyai.com/blog/open-source-llm-tracing',
    group: 'AI agents',
  },
  {
    label: 'Confluent: Streaming Agents',
    url: 'https://www.confluent.io/blog/introducing-streaming-agents/',
    group: 'Streaming data',
  },
  {
    label: 'Confluent: Real-Time Context Engine',
    url: 'https://www.confluent.io/blog/introducing-real-time-context-engine-ai/',
    group: 'Streaming data',
  },
  {
    label: 'AWS: Flink stream enrichment',
    url: 'https://aws.amazon.com/blogs/big-data/common-streaming-data-enrichment-patterns-in-amazon-kinesis-data-analytics-for-apache-flink/',
    group: 'Streaming data',
  },
  {
    label: 'AWS: GraphStorm fraud prevention',
    url: 'https://aws.amazon.com/blogs/machine-learning/modernize-fraud-prevention-graphstorm-v0-5-for-real-time-inference/',
    group: 'Security and fraud',
  },
  {
    label: 'NVIDIA: GNN fraud detection',
    url: 'https://developer.nvidia.com/blog/supercharging-fraud-detection-in-financial-services-with-graph-neural-networks/',
    group: 'Security and fraud',
  },
  {
    label: 'Google Cloud: Agentic SOC',
    url: 'https://cloud.google.com/blog/products/identity-security/the-dawn-of-agentic-ai-in-security-operations-at-rsac-2025',
    group: 'Security and fraud',
  },
  {
    label: 'Microsoft: Agentic SOC',
    url: 'https://www.microsoft.com/en-us/security/blog/2026/04/09/the-agentic-soc-rethinking-secops-for-the-next-decade/',
    group: 'Security and fraud',
  },
  {
    label: 'Snowflake: Cortex Agents GA',
    url: 'https://docs.snowflake.com/en/release-notes/2025/other/2025-11-04-cortex-agents',
    group: 'Enterprise data',
  },
  {
    label: 'Snowflake: Enterprise agent platform',
    url: 'https://www.snowflake.com/en/blog/enterprise-ai-agent-platform/',
    group: 'Enterprise data',
  },
  {
    label: 'NVD vulnerability API',
    url: 'https://nvd.nist.gov/developers/vulnerabilities',
    group: 'Datasets',
  },
  {
    label: 'NASA EMIT CO2 data',
    url: 'https://www.earthdata.nasa.gov/data/catalog/lpcloud-emitl2bco2enh-002',
    group: 'Datasets',
  },
  {
    label: 'openFDA updates',
    url: 'https://open.fda.gov/about/updates/',
    group: 'Datasets',
  },
  {
    label: 'SEC EDGAR APIs',
    url: 'https://www.sec.gov/submit-filings/filer-support-resources/how-do-i-guides/understand-edgar-application-programming-interfaces-apis',
    group: 'Datasets',
  },
  {
    label: 'OpenAlex API',
    url: 'https://docs.openalex.org/how-to-use-the-api/api-overview',
    group: 'Datasets',
  },
];

const projects: StrategyProject[] = [
  {
    rank: 1,
    title: 'Production RAG & Agent Evaluation Platform',
    roles: ['AI/ML Engineer', 'MLOps Engineer', 'Full-Stack AI Engineer'],
    problem: 'RAG and agent demos are easy to build, but teams need proof that outputs are grounded, safe, cost-aware, and improving.',
    build: 'A SaaS-style observability layer that ingests traces, scores RAG quality, tracks cost and latency, and exposes CI quality gates.',
    mvp: ['FastAPI trace ingestion', 'RAG eval suite', 'Postgres trace store', 'React dashboard', 'CI regression endpoint'],
    stack: ['FastAPI', 'PostgreSQL', 'pgvector', 'React', 'OpenTelemetry', 'Docker'],
    metrics: ['Groundedness', 'retrieval precision@k', 'tool-call accuracy', 'p95 latency', 'token cost'],
    demo: 'Show passing and failing traces, then block a bad RAG change through a GitHub Action.',
    difficulty: 'Advanced',
    timeline: '5-7 weeks',
    score: { recruiter: 5, depth: 5, feasibility: 4, fit: 5, uniqueness: 5, overall: 96 },
    icon: BrainCircuit,
    evidence: ['AWS: Evaluating AI agents', 'Google Cloud: Agent evaluation quality gates', 'Microsoft: AI observability'],
  },
  {
    rank: 2,
    title: 'Real-Time Fraud Graph Streaming System',
    roles: ['Data Engineer', 'AI/ML Engineer', 'Backend Engineer'],
    problem: 'Modern fraud is relational and fast; batch scoring misses coordinated behavior and creates costly false positives.',
    build: 'A streaming fraud platform with synthetic transactions, graph-derived features, low-latency scoring, explanations, and live alerts.',
    mvp: ['Transaction generator', 'Kafka or Redpanda stream', 'feature store table', 'XGBoost or Isolation Forest scoring', 'fraud dashboard'],
    stack: ['Kafka', 'FastAPI', 'PostgreSQL', 'Redis', 'XGBoost', 'SHAP'],
    metrics: ['PR-AUC', 'false positive rate', 'scoring latency', 'throughput', 'drift score'],
    demo: 'Run a live transaction stream and watch suspicious clusters surface in an operations dashboard.',
    difficulty: 'Advanced',
    timeline: '6-8 weeks',
    score: { recruiter: 5, depth: 5, feasibility: 4, fit: 5, uniqueness: 5, overall: 96 },
    icon: ShieldCheck,
    evidence: ['AWS: GraphStorm fraud prevention', 'NVIDIA: GNN fraud detection', 'Confluent: Streaming Agents'],
  },
  {
    rank: 3,
    title: 'Agentic SOC Triage & Vulnerability Risk Copilot',
    roles: ['Backend Engineer', 'Cloud/MLOps Engineer', 'AI/ML Engineer'],
    problem: 'Security teams need context-aware prioritization because raw CVSS severity does not tell them what matters in their repo.',
    build: 'A defensive copilot that maps CVEs and advisories to dependency manifests, ranks exploit risk, and produces evidence-backed remediation plans.',
    mvp: ['NVD ingestion', 'dependency manifest scanner', 'risk scoring API', 'advisory RAG index', 'prioritized findings dashboard'],
    stack: ['FastAPI', 'PostgreSQL', 'pgvector', 'GitHub API', 'NVD API', 'Docker'],
    metrics: ['triage precision', 'time-to-prioritize', 'false positive rate', 'citation coverage', 'remediation success'],
    demo: 'Scan a demo repo and show the top risks with source evidence and patch guidance.',
    difficulty: 'Advanced',
    timeline: '5-7 weeks',
    score: { recruiter: 5, depth: 5, feasibility: 4, fit: 4, uniqueness: 5, overall: 92 },
    icon: ShieldCheck,
    evidence: ['Google Cloud: Agentic SOC', 'Microsoft: Agentic SOC', 'NVD vulnerability API'],
  },
  {
    rank: 4,
    title: 'Enterprise Data Agent: Text-to-SQL + RAG Analytics',
    roles: ['Data Engineer', 'Backend Engineer', 'Full-Stack AI Engineer'],
    problem: 'Business users need answers across SQL tables and documents, but naive text-to-SQL and RAG systems are unreliable.',
    build: 'A governed analytics agent that routes questions to SQL, vector search, or both, validates SQL, cites sources, and creates charts.',
    mvp: ['sample warehouse', 'document index', 'query router', 'read-only SQL validator', 'answer UI with citations'],
    stack: ['FastAPI', 'PostgreSQL', 'DuckDB', 'pgvector', 'React', 'Plotly'],
    metrics: ['SQL accuracy', 'answer faithfulness', 'citation precision', 'latency', 'query cost'],
    demo: 'Ask a mixed structured/unstructured question and show generated SQL plus cited evidence.',
    difficulty: 'Medium-advanced',
    timeline: '4-6 weeks',
    score: { recruiter: 5, depth: 4, feasibility: 5, fit: 5, uniqueness: 4, overall: 92 },
    icon: Database,
    evidence: ['Snowflake: Cortex Agents GA', 'Snowflake: Enterprise agent platform', 'SEC EDGAR APIs'],
  },
  {
    rank: 5,
    title: 'Streaming AI Context Engine With Kafka/Flink',
    roles: ['Data Engineer', 'Cloud/MLOps Engineer', 'Backend Engineer'],
    problem: 'AI agents often act on stale context because operational data lives in streams, databases, and logs.',
    build: 'A small real-time context engine that transforms events into low-latency, queryable state for downstream agents and APIs.',
    mvp: ['event simulator', 'Kafka topics', 'stream enrichment job', 'materialized context table', 'current-state API'],
    stack: ['Redpanda', 'Flink or Spark', 'FastAPI', 'PostgreSQL', 'Redis', 'Grafana'],
    metrics: ['end-to-end latency', 'consumer lag', 'freshness SLA', 'throughput', 'context lookup p95'],
    demo: 'Stream updates to an entity profile, then answer questions using the freshest context.',
    difficulty: 'Advanced',
    timeline: '5-7 weeks',
    score: { recruiter: 4, depth: 5, feasibility: 4, fit: 5, uniqueness: 5, overall: 92 },
    icon: Workflow,
    evidence: ['Confluent: Real-Time Context Engine', 'Confluent: Streaming Agents', 'AWS: Flink stream enrichment'],
  },
  {
    rank: 6,
    title: 'Geospatial CO2/LULC Climate Risk Monitor',
    roles: ['AI/ML Engineer', 'Data Engineer', 'Sustainability Tech'],
    problem: 'Climate and land-use signals are high-dimensional and difficult to translate into local, explainable risk insights.',
    build: 'A public geospatial dashboard combining satellite CO2, land cover, vegetation, and boundaries to detect anomalies.',
    mvp: ['one-region ETL', 'xarray/raster processing', 'LULC change model', 'CO2 anomaly layer', 'interactive map'],
    stack: ['Python', 'GeoPandas', 'xarray', 'rasterio', 'PostGIS', 'Streamlit'],
    metrics: ['LULC F1/IoU', 'anomaly precision', 'spatial coverage', 'processing time', 'explanation consistency'],
    demo: 'Select a county and inspect LULC change, CO2 anomaly trends, and model explanations.',
    difficulty: 'Advanced',
    timeline: '6-9 weeks',
    score: { recruiter: 4, depth: 5, feasibility: 4, fit: 5, uniqueness: 5, overall: 92 },
    icon: RadioTower,
    evidence: ['NASA EMIT CO2 data'],
  },
  {
    rank: 7,
    title: 'ML Observability & Drift Monitoring Dashboard',
    roles: ['MLOps Engineer', 'AI/ML Engineer', 'Data Engineer'],
    problem: 'Models degrade after deployment because feature distributions, labels, and data quality change.',
    build: 'A model monitoring service with inference logging, drift reports, data-quality checks, alerts, and retraining triggers.',
    mvp: ['FastAPI model endpoint', 'logging middleware', 'scheduled drift job', 'metrics store', 'dashboard'],
    stack: ['FastAPI', 'scikit-learn', 'Evidently', 'MLflow', 'PostgreSQL', 'Docker'],
    metrics: ['drift distance', 'missing rates', 'accuracy/F1', 'alert precision', 'detected issue MTTR'],
    demo: 'Trigger synthetic drift and show the alert, report, and retraining path.',
    difficulty: 'Medium-advanced',
    timeline: '4-6 weeks',
    score: { recruiter: 4, depth: 5, feasibility: 5, fit: 5, uniqueness: 4, overall: 92 },
    icon: LineChart,
    evidence: ['Evidently: open-source LLM tracing', 'Microsoft: AI observability'],
  },
  {
    rank: 8,
    title: 'AI Code Review, CI, and Secret-Leak Risk Agent',
    roles: ['Backend Engineer', 'Cloud/MLOps Engineer', 'Full-Stack AI Engineer'],
    problem: 'AI-generated code increases velocity, but teams need review, security, and policy gates that scale with it.',
    build: 'A GitHub App that reviews PR diffs for risky changes, missing tests, exposed secrets, and migration hazards.',
    mvp: ['GitHub webhook', 'diff parser', 'rules engine', 'secret scanner', 'PR comment bot'],
    stack: ['Node.js', 'GitHub API', 'Semgrep', 'Gitleaks', 'PostgreSQL', 'Docker'],
    metrics: ['finding precision', 'false positive rate', 'review latency', 'secrets caught', 'test suggestion acceptance'],
    demo: 'Open a demo PR with injected issues and show bot comments plus CI status.',
    difficulty: 'Medium-advanced',
    timeline: '4-6 weeks',
    score: { recruiter: 5, depth: 4, feasibility: 5, fit: 4, uniqueness: 4, overall: 88 },
    icon: Code2,
    evidence: ['AWS: Evaluating AI agents'],
  },
  {
    rank: 9,
    title: 'Healthcare Safety Signal Detection Platform',
    roles: ['Data Engineer', 'AI/ML Engineer', 'Backend Engineer'],
    problem: 'Public adverse-event data is large, noisy, and hard for non-experts to explore responsibly.',
    build: 'An analytics platform that detects safety-signal spikes in FDA adverse-event reports and summarizes evidence with caveats.',
    mvp: ['openFDA ETL', 'time-series aggregation', 'anomaly detection', 'search dashboard', 'cited summaries'],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'scikit-learn', 'React', 'Docker'],
    metrics: ['anomaly precision', 'query latency', 'data freshness', 'citation coverage', 'responsible disclaimer coverage'],
    demo: 'Search a drug or device and show event trends, anomaly dates, and source reports.',
    difficulty: 'Medium',
    timeline: '4-6 weeks',
    score: { recruiter: 4, depth: 4, feasibility: 5, fit: 4, uniqueness: 5, overall: 88 },
    icon: BarChart3,
    evidence: ['openFDA updates'],
  },
  {
    rank: 10,
    title: 'Satellite-Based Crop Damage / Insurance Claims System',
    roles: ['AI/ML Engineer', 'Data Engineer', 'Sustainability Tech'],
    problem: 'Crop insurance and disaster claims still rely on slow manual assessment.',
    build: 'A geospatial ML system that compares pre/post-event imagery to estimate crop or flood damage and generate claim-support reports.',
    mvp: ['Sentinel-2 pipeline', 'NDVI change detection', 'flood or crop mask', 'parcel scoring', 'report dashboard'],
    stack: ['Python', 'rasterio', 'xarray', 'GeoPandas', 'PyTorch', 'PostGIS'],
    metrics: ['IoU', 'damage F1', 'processing time', 'tile load time', 'confidence calibration'],
    demo: 'Choose a known flood event and show affected parcels with damage scores.',
    difficulty: 'Advanced',
    timeline: '6-8 weeks',
    score: { recruiter: 4, depth: 5, feasibility: 3, fit: 5, uniqueness: 5, overall: 88 },
    icon: Globe2,
    evidence: ['NASA EMIT CO2 data'],
  },
  {
    rank: 11,
    title: 'SEC Filing Risk Intelligence Agent',
    roles: ['Backend Engineer', 'Data Engineer', 'Full-Stack AI Engineer'],
    problem: 'Analysts need fast detection of risk changes across dense 10-K, 10-Q, and 8-K filings.',
    build: 'A filing intelligence agent that tracks filings, extracts risk-factor changes, and generates cited summaries.',
    mvp: ['filing ingestion', 'section parser', 'embedding index', 'risk diff summarizer', 'watchlist dashboard'],
    stack: ['FastAPI', 'PostgreSQL', 'pgvector', 'SEC EDGAR', 'Celery', 'React'],
    metrics: ['citation accuracy', 'extraction precision', 'summary faithfulness', 'ingestion freshness', 'watchlist latency'],
    demo: 'Show a filing diff for a public company with cited risk-factor changes.',
    difficulty: 'Medium',
    timeline: '4-5 weeks',
    score: { recruiter: 4, depth: 4, feasibility: 5, fit: 4, uniqueness: 4, overall: 84 },
    icon: BarChart3,
    evidence: ['SEC EDGAR APIs', 'Snowflake: Enterprise agent platform'],
  },
  {
    rank: 12,
    title: 'Education Research & Curriculum Evidence Agent',
    roles: ['Full-Stack AI Engineer', 'Backend Engineer', 'AI/ML Engineer'],
    problem: 'Students and educators need evidence-backed learning paths, not generic generated study plans.',
    build: 'A RAG agent over research papers, course catalogs, and skill taxonomies that creates cited learning plans.',
    mvp: ['skill ontology', 'OpenAlex retrieval', 'roadmap generator', 'citation layer', 'progress dashboard'],
    stack: ['FastAPI', 'PostgreSQL', 'pgvector', 'React', 'OpenAlex API', 'Docker'],
    metrics: ['citation relevance', 'roadmap completion', 'prerequisite consistency', 'user satisfaction', 'retrieval precision'],
    demo: 'Generate a 10-week Cloud MLOps roadmap with papers, projects, and checkpoints.',
    difficulty: 'Medium',
    timeline: '3-5 weeks',
    score: { recruiter: 3, depth: 4, feasibility: 5, fit: 4, uniqueness: 4, overall: 80 },
    icon: Sparkles,
    evidence: ['OpenAlex API'],
  },
];

const topByRole = [
  ['AI/ML Engineer', 'RAG & Agent Evaluation', 'Fraud Graph Streaming', 'Geospatial CO2/LULC Monitor'],
  ['Data Engineer', 'Streaming AI Context Engine', 'Fraud Graph Streaming', 'Enterprise Data Agent'],
  ['Backend Software Engineer', 'AI Code Review Agent', 'Enterprise Data Agent', 'Agentic SOC Copilot'],
  ['Cloud/MLOps Engineer', 'ML Observability Dashboard', 'RAG & Agent Evaluation', 'Streaming AI Context Engine'],
  ['Full-Stack AI Engineer', 'Enterprise Data Agent', 'RAG & Agent Evaluation', 'SEC Filing Risk Agent'],
];

const sourceByLabel = new Map(sources.map((source) => [source.label, source]));
const sourceGroups = [...new Set(sources.map((source) => source.group))];

const ScorePill = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-lg border border-border/50 bg-background/40 px-3 py-2">
    <div className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
    <div className="mt-1 font-display text-lg font-semibold text-primary">{value}</div>
  </div>
);

export const PortfolioStrategy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedRank, setSelectedRank] = useState(1);
  const activeProject = projects.find((project) => project.rank === selectedRank) || projects[0];
  const ActiveIcon = activeProject.icon;

  return (
    <section id="strategy" className="py-24 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-14 max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm text-primary font-medium">Production AI Build Strategy</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Portfolio Projects For <span className="gradient-text">Production AI Roles</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A recruiter-readable roadmap for production-grade AI systems: evaluated agents, real-time data infrastructure,
            observability, fraud/security analytics, and geospatial sustainability.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-12 grid gap-5 md:grid-cols-3"
        >
          {projects.slice(0, 3).map((project, index) => {
            const Icon = project.icon;
            return (
              <Card key={project.title} className="glass-card border-primary/20">
                <CardHeader>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="brand-mark h-12 w-12 rounded-xl">
                      <Icon size={22} />
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20">Build {index + 1}</Badge>
                  </div>
                  <CardTitle className="font-display text-xl leading-tight">{project.title}</CardTitle>
                  <CardDescription>{project.demo}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-primary" />
                    <span>{project.timeline} · {project.difficulty}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.4fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card p-5 sm:p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <LineChart size={22} className="text-primary" />
              <h3 className="font-display text-2xl font-semibold">Ranked Project Menu</h3>
            </div>
            <div className="space-y-2">
              {projects.map((project) => (
                <button
                  key={project.rank}
                  type="button"
                  onClick={() => {
                    setSelectedRank(project.rank);
                    trackEvent({ action: 'select_strategy_project', label: project.title });
                  }}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                    selectedRank === project.rank
                      ? 'border-primary/55 bg-primary/10 text-foreground shadow-lg shadow-primary/10'
                      : 'border-border/45 bg-background/35 text-muted-foreground hover:border-primary/30 hover:text-foreground'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/12 text-sm font-semibold text-primary">
                      {project.rank}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold leading-snug">{project.title}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        Overall {project.score.overall} · {project.timeline}
                      </span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="glass-card p-5 sm:p-7"
          >
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="brand-mark h-12 w-12 rounded-xl">
                    <ActiveIcon size={22} />
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">Rank #{activeProject.rank}</Badge>
                </div>
                <h3 className="font-display text-3xl font-bold leading-tight">{activeProject.title}</h3>
              </div>
              <div className="rounded-2xl border border-primary/25 bg-primary/10 px-5 py-4 text-center">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Overall</div>
                <div className="font-display text-4xl font-bold text-primary">{activeProject.score.overall}</div>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {activeProject.roles.map((role) => (
                <span key={role} className="skill-badge text-xs">{role}</span>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-border/45 bg-background/35 p-4">
                <h4 className="mb-2 font-display text-lg font-semibold text-primary">Problem</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{activeProject.problem}</p>
              </div>
              <div className="rounded-xl border border-border/45 bg-background/35 p-4">
                <h4 className="mb-2 font-display text-lg font-semibold text-primary">Build</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{activeProject.build}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              <div className="rounded-xl border border-border/45 bg-background/35 p-4">
                <h4 className="mb-3 font-display text-base font-semibold">MVP Features</h4>
                <ul className="space-y-2">
                  {activeProject.mvp.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border/45 bg-background/35 p-4">
                <h4 className="mb-3 font-display text-base font-semibold">Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.stack.map((tech) => (
                    <span key={tech} className="tech-chip">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border/45 bg-background/35 p-4">
                <h4 className="mb-3 font-display text-base font-semibold">Metrics</h4>
                <ul className="space-y-2">
                  {activeProject.metrics.map((metric) => (
                    <li key={metric} className="text-sm text-muted-foreground">{metric}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-5">
              <ScorePill label="Clarity" value={activeProject.score.recruiter} />
              <ScorePill label="Depth" value={activeProject.score.depth} />
              <ScorePill label="Deploy" value={activeProject.score.feasibility} />
              <ScorePill label="Fit" value={activeProject.score.fit} />
              <ScorePill label="Unique" value={activeProject.score.uniqueness} />
            </div>

            <div className="mt-5 rounded-xl border border-border/45 bg-background/35 p-4">
              <h4 className="mb-3 font-display text-base font-semibold text-primary">Evidence Links</h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.evidence.map((label) => {
                  const source = sourceByLabel.get(label);
                  if (!source) return null;
                  return (
                    <a
                      key={label}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tech-chip hover:border-primary/50 hover:text-primary"
                      onClick={() => trackEvent({ action: 'open_strategy_source', label })}
                    >
                      {label}
                      <ExternalLink size={13} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.15fr]"
        >
          <Card className="glass-card">
            <CardHeader>
              <div className="mb-2 flex items-center gap-3">
                <CloudCog size={22} className="text-primary" />
                <CardTitle className="font-display text-2xl">Best Fit By Engineering Path</CardTitle>
              </div>
              <CardDescription>Quick map from technical strengths to a practical build sequence.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {topByRole.map(([role, first, second, third]) => (
                <div key={role} className="rounded-xl border border-border/45 bg-background/35 p-4">
                  <div className="mb-2 text-sm font-semibold text-primary">{role}</div>
                  <div className="text-sm text-muted-foreground">{first} · {second} · {third}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="mb-2 flex items-center gap-3">
                <ExternalLink size={22} className="text-primary" />
                <CardTitle className="font-display text-2xl">Source Library</CardTitle>
              </div>
              <CardDescription>
                Current market signals and maintained public datasets used to shape the roadmap.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {sourceGroups.map((group) => (
                <div key={group} className="rounded-xl border border-border/45 bg-background/35 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-primary">{group}</h4>
                  <div className="space-y-2">
                    {sources
                      .filter((source) => source.group === group)
                      .map((source) => (
                        <a
                          key={source.url}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start justify-between gap-3 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                          onClick={() => trackEvent({ action: 'open_strategy_source', label: source.label })}
                        >
                          <span>{source.label}</span>
                          <ExternalLink size={14} className="mt-0.5 shrink-0" />
                        </a>
                      ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
