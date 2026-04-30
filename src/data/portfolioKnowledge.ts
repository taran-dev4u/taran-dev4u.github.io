export type PortfolioSection =
  | 'hero'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'
  | 'growth'
  | 'credibility'
  | 'leadership'
  | 'writing'
  | 'contact';

export type PortfolioKnowledgeItem = {
  id: string;
  title: string;
  section: PortfolioSection;
  roleTags: string[];
  skillTags: string[];
  summary: string;
  details: string[];
  href: string;
};

export const portfolioKnowledge: PortfolioKnowledgeItem[] = [
  {
    id: 'profile-overview',
    title: 'Taran Mamidala profile overview',
    section: 'about',
    roleTags: ['Software Engineer', 'Data Engineer', 'Machine Learning Engineer', 'AI Engineer', 'Full Stack Developer'],
    skillTags: ['software engineering', 'data platforms', 'ML systems', 'AI products', 'backend APIs'],
    summary:
      'Taran Mamidala builds software, data platforms, ML systems, and AI products with a practical engineering mindset.',
    details: [
      'His work spans production APIs, geospatial research, deep learning, computer vision, analytics dashboards, and cloud-ready project architecture.',
      'He has a strong foundation in programming logic, data structures, algorithms, computer networks, service integration, databases, data engineering, and software architecture.',
      'He is based in Buffalo, NY and is open to relocation.',
    ],
    href: '#about',
  },
  {
    id: 'open-to-work',
    title: 'Open to work and relocation',
    section: 'hero',
    roleTags: ['Recruiter', 'Hiring Manager'],
    skillTags: ['open to work', 'relocation', 'Buffalo NY'],
    summary: 'Taran is open to work and comfortable with relocation opportunities.',
    details: [
      'The hero section lists Buffalo, NY and says he is open to relocation.',
      'Contact options include email, GitHub, and LinkedIn.',
    ],
    href: '#hero',
  },
  {
    id: 'skills-technical-expertise',
    title: 'Technical expertise',
    section: 'skills',
    roleTags: ['Software Engineer', 'Data Engineer', 'Machine Learning Engineer', 'AI Engineer', 'Full Stack Developer'],
    skillTags: ['Python', 'Java', 'React', 'TypeScript', 'SQL', 'Docker', 'FastAPI', 'PyTorch', 'Scikit-learn', 'PostgreSQL'],
    summary:
      'The skills section balances software development, data engineering, full-stack development, ML, AI engineering, cloud, DevOps, and analytics.',
    details: [
      'Core areas include programming, backend APIs, databases, cloud tooling, machine learning, deep learning, computer vision, data pipelines, and deployment habits.',
      'The UI uses original-color technology icons to make the skill stack easy to scan.',
    ],
    href: '#skills',
  },
  {
    id: 'experience-ivingo',
    title: 'Software Engineer - Web and Data Platforms at iVinGo Solutions',
    section: 'experience',
    roleTags: ['Software Engineer', 'Data Engineer', 'Full Stack Developer'],
    skillTags: ['Python', 'Java', 'PostgreSQL', 'MongoDB', 'Docker', 'GitHub Actions', 'Jenkins', 'REST APIs'],
    summary:
      'At iVinGo Solutions, Taran built backend integrations, application features, and data workflows for production software and reporting use cases.',
    details: [
      'He developed API-backed workflows and database-driven features for product teams.',
      'He worked on data ingestion, cleaning, transformation, validation, and reporting improvements.',
      'He used Python/Java, REST APIs, PostgreSQL, MongoDB, Docker, GitHub Actions, and Jenkins.',
    ],
    href: '#experience',
  },
  {
    id: 'experience-nrsc',
    title: 'Research Intern - Data Science at NRSC / ISRO',
    section: 'experience',
    roleTags: ['Machine Learning Engineer', 'Data Engineer', 'AI Engineer', 'Research'],
    skillTags: ['Python', 'Pandas', 'xarray', 'PostgreSQL', 'Flask', 'Streamlit', 'SHAP', 'satellite data'],
    summary:
      'At NRSC / ISRO, Taran worked on atmospheric CO2 and LULC modeling using satellite datasets, geospatial analysis, regression, and explainability.',
    details: [
      'He processed 2M+ data points from AIRS, GOSAT, and OCO-2 satellite datasets.',
      'He built feature engineering, regression modeling, validation, and statistical reporting workflows.',
      'He applied SHAP Kernel Explainer to identify drivers behind model outputs.',
    ],
    href: '#experience',
  },
  {
    id: 'experience-ltimindtree',
    title: 'Java Developer Training - Ignite Program at LTI Mindtree',
    section: 'experience',
    roleTags: ['Software Engineer', 'Full Stack Developer', 'Backend Engineer'],
    skillTags: ['Java', 'Spring Boot', 'MongoDB', 'Python', 'React', 'TypeScript', 'Angular', 'GitHub'],
    summary:
      'Taran completed a structured 9-week development program across Java, databases, web technologies, Git, TypeScript, and Angular.',
    details: [
      'The training covered Java, DBMS, MongoDB, Python, collections, exception handling, JDBC, Maven, GitHub, TypeScript, and Angular.',
      'He practiced REST API and microservice patterns with database-backed application development.',
    ],
    href: '#experience',
  },
  {
    id: 'education-ub',
    title: 'M.S. in Computer Science and Engineering at University at Buffalo',
    section: 'education',
    roleTags: ['Machine Learning Engineer', 'AI Engineer', 'Data Engineer', 'Software Engineer'],
    skillTags: ['Algorithms', 'Computer Security', 'Machine Learning', 'Data Intensive Computing', 'Operating Systems', 'Deep Learning', 'Computer Vision'],
    summary:
      'Taran is pursuing an M.S. in Computer Science and Engineering at University at Buffalo, SUNY, from Aug 2024 to Dec 2025 with a listed GPA of 3.8/4.0.',
    details: [
      'Graduate coursework includes Algorithms, Computer Security, Intro Machine Learning, Data Intensive Computing, Operating Systems, Databases, Deep Learning, Statistical Data Mining, Web Analytics, and Computer Vision.',
      'This supports roles across AI engineering, ML engineering, data engineering, systems, and backend software.',
    ],
    href: '#education',
  },
  {
    id: 'education-vit',
    title: 'B.Tech. in Computer Science and Engineering at Vellore Institute of Technology',
    section: 'education',
    roleTags: ['Software Engineer', 'Data Engineer', 'Full Stack Developer', 'Machine Learning Engineer'],
    skillTags: ['Java', 'Data Structures', 'DBMS', 'AI', 'Computer Networks', 'Web Technologies', 'Operating Systems', 'NLP'],
    summary:
      'Taran completed a B.Tech. in Computer Science and Engineering from Vellore Institute of Technology from 2019 to 2023 in India.',
    details: [
      'Undergraduate coursework covered Java, DSA, OOP, DBMS, AI, networks, web technologies, software engineering, operating systems, data analytics, ML, NLP, cryptography, and capstone work.',
    ],
    href: '#education',
  },
  {
    id: 'project-rag',
    title: 'Enterprise RAG Knowledge System',
    section: 'projects',
    roleTags: ['AI Engineer', 'Full Stack AI Engineer'],
    skillTags: ['RAG', 'LangChain', 'OpenAI', 'Vector Database', 'FastAPI', 'PostgreSQL', 'citations'],
    summary:
      'A retrieval-augmented generation system for multi-source knowledge search with citations, reranking, conversation memory, and feedback loops.',
    details: [
      'Includes document ingestion, chunking, embeddings, hybrid retrieval, reranking, source-grounded answer generation, and feedback loops.',
      'This project is directly relevant for AI engineering and enterprise knowledge assistant work.',
    ],
    href: '#projects',
  },
  {
    id: 'project-agents',
    title: 'Multi-Agent AI Research System',
    section: 'projects',
    roleTags: ['AI Engineer', 'Machine Learning Engineer', 'Full Stack AI Engineer'],
    skillTags: ['LangGraph', 'OpenAI', 'Tool Calling', 'Vector Search', 'FastAPI', 'agents'],
    summary:
      'A multi-agent research workflow with specialized agents for search, extraction, analysis, validation, and report drafting.',
    details: [
      'It uses agent roles for planning, retrieval, synthesis, and quality checks.',
      'It demonstrates AI orchestration, tool use, validation, and careful automation.',
    ],
    href: '#projects',
  },
  {
    id: 'project-mlops',
    title: 'End-to-End MLOps Pipeline',
    section: 'projects',
    roleTags: ['Machine Learning Engineer', 'MLOps Engineer', 'AI Engineer'],
    skillTags: ['MLflow', 'DVC', 'Airflow', 'FastAPI', 'Docker', 'AWS', 'model registry'],
    summary:
      'A production-style ML pipeline with experiment tracking, data versioning, orchestration, model registry, monitoring, and drift detection.',
    details: [
      'Includes reusable training/evaluation pipelines, experiment tracking, automated retraining design, and monitoring for drift and quality metrics.',
      'This project connects modeling work with production delivery and operations.',
    ],
    href: '#projects',
  },
  {
    id: 'project-fraud',
    title: 'Real-Time Fraud Detection System',
    section: 'projects',
    roleTags: ['Machine Learning Engineer', 'Data Engineer', 'AI Engineer', 'Backend Engineer'],
    skillTags: ['XGBoost', 'Kafka', 'Redis', 'FastAPI', 'SHAP', 'Docker', 'streaming inference'],
    summary:
      'A low-latency fraud detection service with streaming inference, feature engineering, model explanations, alerting, and monitoring.',
    details: [
      'Includes streaming transaction ingestion, feature lookup, model serving behind an API, explainability for flagged transactions, and alerting plans.',
    ],
    href: '#projects',
  },
  {
    id: 'project-streaming',
    title: 'Real-Time Streaming Data Pipeline',
    section: 'projects',
    roleTags: ['Data Engineer', 'Backend Engineer'],
    skillTags: ['Kafka', 'Spark', 'Python', 'Parquet', 'PostgreSQL', 'Docker', 'streaming analytics'],
    summary:
      'A streaming data pipeline for sensor-style events with Kafka topics, Spark Structured Streaming, windowed aggregates, anomaly detection, and lake storage.',
    details: [
      'This project supports data engineering roles by showing streaming, data quality, analytics, and pipeline reliability practice.',
    ],
    href: '#projects',
  },
  {
    id: 'project-lakehouse',
    title: 'Data Lakehouse With Delta Lake',
    section: 'projects',
    roleTags: ['Data Engineer', 'Cloud Data Engineer'],
    skillTags: ['Databricks', 'Delta Lake', 'Spark', 'Python', 'Cloud Storage', 'BI'],
    summary:
      'A lakehouse architecture with bronze, silver, and gold layers, ACID table behavior, schema evolution, and BI-ready curated datasets.',
    details: [
      'It demonstrates medallion architecture, schema evolution, versioned data workflows, data quality checks, and analytics-ready tables.',
    ],
    href: '#projects',
  },
  {
    id: 'project-computer-vision',
    title: 'Computer Vision Pipeline Suite',
    section: 'projects',
    roleTags: ['Computer Vision', 'Machine Learning Engineer', 'AI Engineer'],
    skillTags: ['OpenCV', 'NumPy', 'SciPy', 'RANSAC', 'Scikit-learn', 'camera calibration', 'face clustering'],
    summary:
      'A suite of computer vision pipelines covering calibration, rotation matrices, panorama stitching, background stitching, face detection, embeddings, and clustering.',
    details: [
      'The project connects mathematical vision fundamentals with practical image-processing workflows.',
    ],
    href: '#projects',
  },
  {
    id: 'project-inpainting',
    title: 'Enhanced Image Inpainting With Transformer-GAN',
    section: 'projects',
    roleTags: ['Computer Vision', 'Machine Learning Engineer', 'AI Engineer'],
    skillTags: ['PyTorch', 'Transformers', 'GANs', 'CelebA', 'OpenCV', 'LPIPS', 'CUDA'],
    summary:
      'A hybrid image inpainting model combining transformer attention blocks with GAN training to reconstruct masked facial regions on CelebA images.',
    details: [
      'The project demonstrates vision architecture design, adversarial/perceptual objectives, irregular-mask experiments, and model evaluation beyond accuracy.',
    ],
    href: '#projects',
  },
  {
    id: 'project-co2',
    title: 'Atmospheric CO2 and LULC Modeling Pipeline',
    section: 'projects',
    roleTags: ['Machine Learning Engineer', 'Data Engineer', 'Research'],
    skillTags: ['Python', 'xarray', 'NetCDF4', 'GeoPandas', 'SHAP', 'PostgreSQL', 'Streamlit', 'remote sensing'],
    summary:
      'A geospatial climate-data workflow for atmospheric CO2 analysis across India using satellite observations, climate zones, LULC features, regression modeling, and explainability.',
    details: [
      'This project is tied to Taran’s NRSC / ISRO research internship and strengthens the connection between climate science, data processing, modeling, and technical storytelling.',
    ],
    href: '#projects',
  },
  {
    id: 'growth-ai',
    title: 'Currently exploring AI engineering topics',
    section: 'growth',
    roleTags: ['AI Engineer', 'Machine Learning Engineer'],
    skillTags: ['RAG', 'vector databases', 'AI agents', 'LLMOps', 'evaluation', 'AI security'],
    summary:
      'Taran is currently exploring RAG and vector knowledge systems, AI agents and tool use, and LLMOps, evaluation, and AI security.',
    details: [
      'Growth topics include hybrid retrieval, reranking, citations, vector databases, planning, tool calling, memory, validation loops, prompt/version control, observability, regression tests, cost, latency, privacy, and prompt-injection awareness.',
    ],
    href: '#growth',
  },
  {
    id: 'credibility-awards',
    title: 'Credibility, awards, certification, research, and leadership',
    section: 'credibility',
    roleTags: ['Recruiter', 'Hiring Manager'],
    skillTags: ['hackathons', 'Google Cloud Gen AI', 'research', 'leadership', 'clubs'],
    summary:
      'Taran highlights hackathon success, Google Cloud Gen AI certification, remote sensing research, and student club leadership.',
    details: [
      'He won a Rs. 25,000 cash prize at the GCC x VIT Hackathon for a multi-tenant orchestration platform.',
      'He completed Google Cloud Gen AI certification through Simplilearn.',
      'His research connects atmospheric CO2, satellite datasets, land-use behavior, climate zones, regression modeling, and explainable analysis.',
      'Leadership includes student clubs, technical teams, community initiatives, TA work, class representation, and student vice-representative responsibilities.',
    ],
    href: '#credibility',
  },
  {
    id: 'writing-thinking',
    title: 'Writing and thinking',
    section: 'writing',
    roleTags: ['AI Engineer', 'Machine Learning Engineer', 'Data Engineer'],
    skillTags: ['AI engineering', 'ML systems', 'data products', 'technical storytelling'],
    summary:
      'The writing section frames Taran’s thinking around AI engineering, ML systems, and building products.',
    details: [
      'Sample topics include AI engineering in practice, models to ML systems, and building products with data.',
    ],
    href: '#writing',
  },
  {
    id: 'contact',
    title: 'Contact and opportunity fit',
    section: 'contact',
    roleTags: ['Recruiter', 'Hiring Manager'],
    skillTags: ['contact', 'email', 'GitHub', 'LinkedIn', 'opportunities'],
    summary:
      'The contact section invites recruiters and collaborators to discuss projects, roles, and opportunities.',
    details: [
      'The heading says Let’s Build Something.',
      'The copy says Taran is always open to discussing new opportunities.',
      'Primary contact email is mtaran014@gmail.com.',
    ],
    href: '#contact',
  },
];

export const suggestedPortfolioQuestions = [
  'Why is Taran a strong AI engineer candidate?',
  'Which projects show RAG or MLOps skills?',
  'Summarize his research experience.',
  'Is he open to relocation?',
  'Which project should I review first?',
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tokenize = (value: string) =>
  normalize(value)
    .split(' ')
    .filter((token) => token.length > 1);

export const getKnowledgeText = (item: PortfolioKnowledgeItem) =>
  [
    item.title,
    item.section,
    item.roleTags.join(' '),
    item.skillTags.join(' '),
    item.summary,
    item.details.join(' '),
  ].join(' ');

export const retrievePortfolioKnowledge = (
  query: string,
  options: { mode?: 'general' | 'role_match' | 'project_recommendation'; selectedRole?: string; limit?: number } = {},
) => {
  const queryTokens = tokenize(`${query} ${options.selectedRole || ''}`);
  const querySet = new Set(queryTokens);
  const mode = options.mode || 'general';
  const selectedRole = normalize(options.selectedRole || '');

  return portfolioKnowledge
    .map((item) => {
      const haystack = normalize(getKnowledgeText(item));
      const haystackTokens = new Set(tokenize(haystack));
      let score = 0;

      querySet.forEach((token) => {
        if (haystackTokens.has(token)) score += 3;
        if (haystack.includes(token)) score += 1;
      });

      if (selectedRole && item.roleTags.some((role) => normalize(role).includes(selectedRole))) score += 8;
      if (mode === 'role_match' && item.section !== 'writing') score += item.roleTags.length;
      if (mode === 'project_recommendation' && item.section === 'projects') score += 8;
      if (item.section === 'contact' && /relocat|location|buffalo|contact|email/.test(normalize(query))) score += 12;

      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, options.limit || 7);
};

export const buildLocalPortfolioAnswer = (
  message: string,
  matches: ReturnType<typeof retrievePortfolioKnowledge>,
  options: { selectedRole?: string } = {},
) => {
  if (!message.trim()) {
    return 'Ask me about Taran’s projects, experience, AI engineering fit, relocation, education, or the best project to review first.';
  }

  if (matches.length === 0) {
    return "I don't have enough portfolio evidence to answer that confidently. Try asking about Taran’s AI projects, ML systems, experience, education, research, or relocation.";
  }

  const top = matches.slice(0, 3).map(({ item }) => item);
  const rolePrefix = options.selectedRole ? `For ${options.selectedRole}, ` : '';
  const evidence = top
    .map((item) => `${item.title}: ${item.summary}`)
    .join(' ');

  return `${rolePrefix}${evidence} The strongest next step is to review the cited portfolio sections for the project details, technologies, and outcomes.`;
};
