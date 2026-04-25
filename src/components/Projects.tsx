import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BrainCircuit,
  ChevronRight,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Image as ImageIcon,
  Layers3,
  LineChart,
  Network,
  RadioTower,
  ScanFace,
  ServerCog,
  ShieldCheck,
  Workflow,
  X,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { publicAsset } from '@/lib/assets';

type Project = {
  title: string;
  role: string;
  status: 'Completed' | 'Current';
  context: string;
  overview: string;
  technologies: string[];
  keyFeatures: string[];
  outcome: string;
  icon: LucideIcon;
  coverImage?: string;
  githubUrl?: string;
  demoUrl?: string;
};

const defaultProjectCover = 'default%20project%20cover%20photo.png';

const roles = [
  'All Projects',
  'Software Developer',
  'Data Engineer',
  'Full Stack Developer',
  'Machine Learning Engineer',
  'AI Engineer',
  'Computer Vision',
  'Security',
];

const projects: Project[] = [
  {
    title: 'Atmospheric CO2 and LULC Modeling Pipeline',
    role: 'Machine Learning Engineer',
    status: 'Completed',
    context: 'NRSC / ISRO research internship',
    overview:
      'Geospatial climate-data workflow for atmospheric CO2 analysis across India using satellite observations, climate zones, LULC features, regression modeling, and explainability.',
    technologies: ['Python', 'xarray', 'NetCDF4', 'GeoPandas', 'SHAP', 'PostgreSQL', 'Streamlit'],
    keyFeatures: [
      'Processed multi-year satellite datasets from AIRS, GOSAT, SCIAMACHY, OCO-2, and OCO-3.',
      'Mapped CO2 trends against Koppen-Geiger climate zones and land-use classes.',
      'Used explainability to understand drivers behind regression outputs.',
      'Built reproducible reporting workflows for analysis and review.',
    ],
    outcome:
      'Strengthened my ability to connect climate science, data processing, modeling, and clear technical storytelling.',
    icon: RadioTower,
  },
  {
    title: 'Enhanced Image Inpainting With Transformer-GAN',
    role: 'Computer Vision',
    status: 'Completed',
    context: 'CSE 676 deep learning final project',
    overview:
      'Hybrid image inpainting model combining transformer attention blocks with GAN training to reconstruct masked facial regions on CelebA images.',
    technologies: ['PyTorch', 'Transformers', 'GANs', 'CelebA', 'OpenCV', 'LPIPS', 'CUDA'],
    keyFeatures: [
      'Used adversarial and perceptual objectives for realistic facial reconstruction.',
      'Designed experiments around irregular masks and large missing regions.',
      'Compared reconstruction quality through image-focused metrics and visual checks.',
      'Organized training data, preprocessing, and model components into a repeatable pipeline.',
    ],
    outcome:
      'Built deeper intuition for modern vision architectures, loss design, and model evaluation beyond accuracy alone.',
    icon: ImageIcon,
  },
  {
    title: 'Pintos Threads and Scheduler',
    role: 'Software Developer',
    status: 'Completed',
    context: 'CSE 521 operating systems project',
    overview:
      'Kernel-level scheduling work in Pintos covering fixed-point arithmetic, recent CPU calculations, load average updates, priority updates, and ready-list ordering.',
    technologies: ['C', 'Pintos OS', 'Kernel Scheduling', 'Synchronization', 'GDB', 'Linux'],
    keyFeatures: [
      'Implemented scheduler math and update logic inside core thread modules.',
      'Worked with low-level debugging, kernel tests, and concurrency behavior.',
      'Contributed to a team submission that passed the PA1 test suite locally and on Autolab.',
      'Practiced reading and extending a real operating-system teaching kernel.',
    ],
    outcome:
      'Improved my systems-level reasoning around scheduling, synchronization, and correctness under constrained APIs.',
    icon: Cpu,
    coverImage: 'pintos.png',
  },
  {
    title: 'Stock Market Database for Real-Time Analysis',
    role: 'Data Engineer',
    status: 'Completed',
    context: 'CSE 560 database systems project',
    overview:
      'SQL-based database design for stock-market analytics and transaction management across prices, company actions, market news, broker forecasts, users, trades, and portfolios.',
    technologies: ['SQL', 'ER Modeling', 'Normalization', 'Transactions', 'Indexing', 'Financial Data'],
    keyFeatures: [
      'Modeled financial entities and relationships for analytical and transactional workloads.',
      'Designed schema structure around integrity, joins, updates, and query flexibility.',
      'Supported user signup, stock trades, corporate actions, and portfolio-style queries.',
      'Replaced spreadsheet-style thinking with normalized relational design.',
    ],
    outcome:
      'Built a stronger foundation in database design, query planning, and data integrity for real-world domains.',
    icon: Database,
    coverImage: 'stock%20price%20prediction%20project.png',
  },
  {
    title: 'Mercedes-Benz Test-Bench Time Prediction',
    role: 'Machine Learning Engineer',
    status: 'Completed',
    context: 'MGS 659 web analytics project',
    overview:
      'Production-time prediction pipeline for Mercedes-Benz vehicle configurations using one-hot encoding, scaling, PCA, cross-validation, model comparison, and a packaged app workflow.',
    technologies: ['Python', 'PCA', 'Scikit-learn', 'XGBoost', 'SHAP', 'Gradio', 'Analytics'],
    keyFeatures: [
      'Compared Linear Regression, Random Forest, and XGBoost with and without PCA.',
      'Used cross-validation and test-set evaluation to choose a practical final model.',
      'Packaged the selected pipeline for local use and stakeholder review.',
      'Considered explainability, planning value, and sustainability impact.',
    ],
    outcome:
      'Selected Linear Regression with PCA, reaching 8.23 RMSE, 5.55 MAE, and 0.565 R2 on unseen data.',
    icon: LineChart,
    coverImage: 'diamonds%20project.png',
  },
  {
    title: 'Computer Vision Pipeline Suite',
    role: 'Computer Vision',
    status: 'Completed',
    context: 'CSE 473/573 computer vision projects',
    overview:
      'A set of vision pipelines covering camera calibration, rotation matrices, panorama stitching, background stitching, face detection, embeddings, and clustering.',
    technologies: ['Python', 'OpenCV', 'NumPy', 'SciPy', 'RANSAC', 'Scikit-learn'],
    keyFeatures: [
      'Implemented calibration and projection-matrix logic for coordinate transformations.',
      'Built stitching workflows using keypoints, feature matching, homography, and RANSAC.',
      'Developed face detection and clustering workflows from image collections.',
      'Practiced both geometry-heavy and model-assisted computer vision techniques.',
    ],
    outcome:
      'Connected mathematical vision fundamentals with practical image-processing workflows and evaluation constraints.',
    icon: ScanFace,
    coverImage: 'face%20attendence%20project.png',
  },
  {
    title: 'Ireland Hotel Pricing and Ratings Analysis',
    role: 'Data Engineer',
    status: 'Completed',
    context: 'Independent analytics project',
    overview:
      'Hotel price and rating analysis for Ireland, focused on cleaning, exploratory analysis, quality signals, review patterns, and visual explanation.',
    technologies: ['Python', 'Pandas', 'Statistics', 'Visualization', 'Netlify'],
    keyFeatures: [
      'Cleaned and shaped hospitality data for analysis.',
      'Explored price, rating, review, and location behavior.',
      'Presented findings through a lightweight public-facing site.',
      'Kept the work readable for both technical and non-technical viewers.',
    ],
    outcome:
      'One of my public projects with both code and a live walkthrough available.',
    icon: BarChart3,
    githubUrl: 'https://github.com/taran-dev4u/ireland-hotel-pricing-ratings-analysis',
    demoUrl: 'https://ireland-hotel-analytics.netlify.app/',
  },
  {
    title: 'ElGamal Digital Signature Scheme',
    role: 'Security',
    status: 'Completed',
    context: 'Undergraduate cryptography project',
    overview:
      'Java implementation of ElGamal digital signature generation and verification using modular arithmetic, hashing, key pairs, and BigInteger operations.',
    technologies: ['Java', 'Cryptography', 'BigInteger', 'Hashing', 'Digital Signatures', 'OOP'],
    keyFeatures: [
      'Implemented key-generation, signing, and verification flows.',
      'Worked with modular arithmetic and secure validation concepts.',
      'Compared classical and modified signature behavior.',
      'Practiced careful implementation of security-sensitive logic.',
    ],
    outcome:
      'Reinforced applied cryptography concepts and precision in algorithmic Java code.',
    icon: ShieldCheck,
  },
  {
    title: 'Distributed Rate Limiter & API Gateway',
    role: 'Software Developer',
    status: 'Current',
    context: 'Current portfolio build',
    overview:
      'High-throughput API gateway with distributed rate limiting using token-bucket and sliding-window algorithms backed by Redis.',
    technologies: ['Go', 'Python', 'Redis', 'Docker', 'Kubernetes', 'gRPC', 'Prometheus'],
    keyFeatures: [
      'Token-bucket and sliding-window rate limiting.',
      'Atomic Redis operations for safe concurrent request control.',
      'Service-level configuration for different traffic policies.',
      'Metrics dashboard for latency, throughput, and rejected requests.',
    ],
    outcome:
      'Strengthening my backend reliability, distributed systems, and performance engineering practice.',
    icon: ServerCog,
  },
  {
    title: 'Microservices E-Commerce Platform',
    role: 'Software Developer',
    status: 'Current',
    context: 'Current portfolio build',
    overview:
      'Event-driven commerce system with separated services for users, products, orders, payments, inventory, notifications, analytics, and search.',
    technologies: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'Docker', 'AWS ECS'],
    keyFeatures: [
      'Event-driven service communication through Kafka.',
      'API gateway, circuit breakers, and distributed transaction patterns.',
      'Separate persistence and service boundaries for core domains.',
      'Deployment structure designed for cloud infrastructure.',
    ],
    outcome:
      'Strengthening my service architecture, integration, and backend system design practice.',
    icon: Network,
  },
  {
    title: 'Real-Time Streaming Data Pipeline',
    role: 'Data Engineer',
    status: 'Current',
    context: 'Current portfolio build',
    overview:
      'Streaming data pipeline for sensor-style events with Kafka topics, Spark Structured Streaming, windowed aggregates, anomaly detection, and lake storage.',
    technologies: ['Kafka', 'Spark', 'Python', 'Parquet', 'PostgreSQL', 'Docker'],
    keyFeatures: [
      'Topic design for multiple sensor streams.',
      'Windowed aggregations for near-real-time metrics.',
      'Anomaly detection layer for unusual events.',
      'Historical storage in analytics-friendly formats.',
    ],
    outcome:
      'Strengthening my streaming, data quality, analytics, and pipeline reliability practice.',
    icon: Workflow,
  },
  {
    title: 'Data Lakehouse With Delta Lake',
    role: 'Data Engineer',
    status: 'Current',
    context: 'Current portfolio build',
    overview:
      'Lakehouse architecture with bronze, silver, and gold layers, ACID table behavior, schema evolution, and BI-ready curated datasets.',
    technologies: ['Databricks', 'Delta Lake', 'Spark', 'Python', 'Cloud Storage', 'BI'],
    keyFeatures: [
      'Medallion architecture for raw, cleaned, and serving layers.',
      'Schema evolution and versioned data workflows.',
      'Data quality checks before promoting datasets.',
      'Analytics-ready tables for dashboards and reporting.',
    ],
    outcome:
      'Strengthening my modern data-platform design and scalable analytics workflow practice.',
    icon: Database,
  },
  {
    title: 'SaaS Project Management Platform',
    role: 'Full Stack Developer',
    status: 'Current',
    context: 'Current portfolio build',
    overview:
      'Multi-tenant project management product with RBAC, collaboration workflows, subscription handling, and real-time notifications.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe'],
    keyFeatures: [
      'Workspace and team management with role-based access.',
      'Task boards, comments, assignments, and notification events.',
      'Subscription-aware product boundaries.',
      'Admin and user-facing flows designed as one cohesive product.',
    ],
    outcome:
      'Strengthening my product thinking, full-stack architecture, and workflow design practice.',
    icon: Layers3,
  },
  {
    title: 'Real-Time Analytics Dashboard Platform',
    role: 'Full Stack Developer',
    status: 'Current',
    context: 'Current portfolio build',
    overview:
      'Custom dashboard builder with live data updates, chart composition, query controls, exports, and alert-style monitoring.',
    technologies: ['React', 'TypeScript', 'WebSockets', 'Node.js', 'Chart.js', 'PostgreSQL'],
    keyFeatures: [
      'Reusable chart cards and dashboard layouts.',
      'Live updates through WebSockets.',
      'Query and filter controls for users.',
      'Export and alert flows for business-facing usage.',
    ],
    outcome:
      'Strengthening my UI engineering, real-time systems, analytics, and product polish practice.',
    icon: BarChart3,
  },
  {
    title: 'End-to-End MLOps Pipeline',
    role: 'Machine Learning Engineer',
    status: 'Current',
    context: 'Current portfolio build',
    overview:
      'Production-style ML pipeline with experiment tracking, data versioning, orchestration, model registry, monitoring, and drift detection.',
    technologies: ['Python', 'MLflow', 'DVC', 'Airflow', 'FastAPI', 'Docker', 'AWS'],
    keyFeatures: [
      'Reusable training and evaluation pipeline.',
      'Experiment tracking and model registry flow.',
      'Automated retraining trigger design.',
      'Monitoring plan for model drift and quality metrics.',
    ],
    outcome:
      'Strengthening my ability to connect modeling work with production delivery and operations.',
    icon: BrainCircuit,
  },
  {
    title: 'Real-Time Fraud Detection System',
    role: 'Machine Learning Engineer',
    status: 'Current',
    context: 'Current portfolio build',
    overview:
      'Low-latency fraud detection service with streaming inference, feature engineering, model explanations, alerting, and monitoring.',
    technologies: ['Python', 'XGBoost', 'Kafka', 'Redis', 'FastAPI', 'SHAP', 'Docker'],
    keyFeatures: [
      'Streaming transaction ingestion and feature lookup.',
      'XGBoost-style model serving behind an API.',
      'Explainability layer for flagged transactions.',
      'Alerting and dashboard plan for operations.',
    ],
    outcome:
      'Strengthening my applied ML, low-latency architecture, and business-risk awareness practice.',
    icon: ShieldCheck,
  },
  {
    title: 'Enterprise RAG Knowledge System',
    role: 'AI Engineer',
    status: 'Current',
    context: 'Current portfolio build',
    overview:
      'Retrieval-augmented generation system for multi-source knowledge search with citations, reranking, conversation memory, and feedback loops.',
    technologies: ['Python', 'LangChain', 'OpenAI', 'Vector Database', 'FastAPI', 'PostgreSQL'],
    keyFeatures: [
      'Document ingestion, chunking, embeddings, and hybrid retrieval.',
      'Reranking and citation-aware answer generation.',
      'Conversation memory with source-grounded responses.',
      'Feedback loop for quality improvement.',
    ],
    outcome:
      'Strengthening my practical AI product architecture and trustworthy answer-generation practice.',
    icon: BrainCircuit,
  },
  {
    title: 'Multi-Agent AI Research System',
    role: 'AI Engineer',
    status: 'Current',
    context: 'Current portfolio build',
    overview:
      'Multi-agent research workflow with specialized agents for search, extraction, analysis, validation, and report drafting.',
    technologies: ['Python', 'LangGraph', 'OpenAI', 'Tool Calling', 'Vector Search', 'FastAPI'],
    keyFeatures: [
      'Agent roles for planning, retrieval, synthesis, and quality checks.',
      'Tool integration for search, data analysis, and document review.',
      'Memory structure for multi-step research tasks.',
      'Validation pass before presenting final findings.',
    ],
    outcome:
      'Strengthening my AI orchestration, tool-use, and careful automation practice.',
    icon: Network,
  },
];

const ProjectVisual = ({ project }: { project: Project }) => (
  <div className="project-visual">
    <img
      src={publicAsset(project.coverImage || defaultProjectCover)}
      alt={`${project.title} cover`}
      className="absolute inset-0 h-full w-full object-cover opacity-75"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/38 to-background/10" />
    <div className="project-visual__icon">
      <project.icon size={32} />
    </div>
    <div className="absolute right-6 top-6 rounded-full border border-primary/20 bg-background/55 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
      {project.role}
    </div>
    <div className="absolute bottom-16 left-6 right-6">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{project.context}</div>
      <div className="mt-2 h-2 w-2/3 rounded-full bg-primary/55 shadow-[0_0_24px_hsl(var(--primary)/0.55)]" />
    </div>
    <div className="project-visual__signal" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  </div>
);

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedRole, setSelectedRole] = useState('All Projects');
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const orderedProjects = [...projects].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === 'Current' ? -1 : 1;
    }
    return 0;
  });

  const filteredProjects = selectedRole === 'All Projects'
    ? orderedProjects
    : orderedProjects.filter(project => project.role === selectedRole);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block glass-card px-4 py-2 mb-4">
            <span className="text-sm text-primary font-medium">Projects</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Selected <span className="gradient-text">Engineering Work</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Current builds first, followed by completed work from systems, data, machine learning, computer vision, analytics, and security.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => {
                setSelectedRole(role);
                setShowAll(false);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedRole === role
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'glass-card hover:border-primary/30 text-muted-foreground hover:text-primary'
              }`}
            >
              {role}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.06 * index }}
            >
              <Card className="glass-card floating-box border-border/50 overflow-hidden h-full group hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
                <ProjectVisual project={project} />

                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <Badge className="w-fit bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                      {project.role}
                    </Badge>
                    {project.status === 'Current' && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgb(52_211_153)]" />
                        Current
                      </span>
                    )}
                  </div>
                  <CardTitle className="font-display text-xl leading-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.overview}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 6).map((tag) => (
                      <span key={tag} className="skill-badge text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-wrap gap-3 pt-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex-1 min-w-32 hover:border-primary/30 hover:text-primary"
                    onClick={() => setActiveProject(project)}
                  >
                    More Details
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                  {project.githubUrl && (
                    <Button asChild variant="outline" size="sm" className="flex-1 min-w-28 hover:border-primary/30 hover:text-primary">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button asChild size="sm" className="flex-1 min-w-28 btn-primary">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary inline-flex items-center gap-2"
            >
              {showAll ? 'Show Less' : `View ${filteredProjects.length - displayedProjects.length} More`}
              <ChevronRight size={18} className={`transition-transform ${showAll ? 'rotate-90' : ''}`} />
            </button>
          </motion.div>
        )}
      </div>

      {activeProject && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-8">
          <button
            type="button"
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
            aria-label="Close project details"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="glass-card relative max-h-[88vh] w-full max-w-4xl overflow-y-auto p-6 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="absolute right-4 top-4 rounded-full border border-border/60 bg-background/60 p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="mb-8 pr-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge className="bg-primary/10 text-primary border-primary/20">{activeProject.role}</Badge>
                <span className="text-sm text-muted-foreground">{activeProject.context}</span>
              </div>
              <h3 id="project-modal-title" className="font-display text-3xl font-bold mb-4">
                {activeProject.title}
              </h3>
            </div>

            <div className="mb-6 rounded-2xl border border-border/40 bg-background/35 p-5">
              <h4 className="font-display text-lg font-semibold mb-3 text-primary">Overview</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{activeProject.overview}</p>
            </div>

            <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-6">
              <div className="rounded-2xl border border-border/40 bg-background/35 p-5">
                <h4 className="font-display text-lg font-semibold mb-4 text-primary">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech) => (
                    <span key={tech} className="skill-badge text-xs">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/40 bg-background/35 p-5">
                <h4 className="font-display text-lg font-semibold mb-4 text-primary">Key Features</h4>
                <ul className="space-y-3">
                  {activeProject.keyFeatures.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border/40 bg-background/35 p-5">
              <h4 className="font-display text-lg font-semibold mb-3 text-primary">Outcome / What I Learned</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{activeProject.outcome}</p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
