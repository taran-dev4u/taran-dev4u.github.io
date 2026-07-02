export type PortfolioSection =
  | 'hero'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'resume'
  | 'education'
  | 'growth'
  | 'credibility'
  | 'leadership'
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
    skillTags: ['software engineering', 'data platforms', 'ML systems', 'AI products', 'backend APIs', 'absolute learner'],
    summary:
      'Taran Mamidala builds backend systems, data platforms, ML workflows, and AI products with a practical engineering mindset.',
    details: [
      'His work connects production APIs, research-grade data pipelines, geospatial climate modeling, full-stack tools, and cloud-ready architecture.',
      'He describes himself as an Absolute learner: curious, practical, and focused on turning complex topics into useful systems.',
      'His profile includes 3+ years of experience, a 25-month software role, 2M+ satellite research records, and a peer-reviewed publication.',
      'He is based in Buffalo, NY and is open to relocation and meaningful opportunities.',
    ],
    href: '#about',
  },
  {
    id: 'open-to-work',
    title: 'Open to opportunities and relocation',
    section: 'hero',
    roleTags: ['Recruiter', 'Hiring Manager'],
    skillTags: ['open to opportunities', 'relocation', 'Buffalo NY'],
    summary: 'Taran is open to software, backend, data, ML, AI, and full-stack opportunities.',
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
    skillTags: ['Python', 'Java', 'SQL', 'Bash', 'React', 'TypeScript', 'Docker', 'FastAPI', 'PyTorch', 'GeoPandas', 'xarray', 'PostgreSQL', 'ETL'],
    summary:
      'The skills section balances backend development, data engineering, scientific computing, ML, AI engineering, cloud, DevOps, and quality habits.',
    details: [
      'Core areas include Python, Java, SQL, Bash, backend APIs, databases, ETL/ELT, data validation, schema design, query optimization, cloud tooling, ML, geospatial computing, AI products, testing, and deployment habits.',
      'The UI uses original-color technology icons to make the skill stack easy to scan.',
    ],
    href: '#skills',
  },
  {
    id: 'experience-rebecca-everlene',
    title: 'Software Engineer at Rebecca Everlene Trust Company',
    section: 'experience',
    roleTags: ['Software Engineer', 'Backend Engineer', 'Full Stack Developer', 'Data Engineer'],
    skillTags: ['Python', 'Java', 'PostgreSQL', 'MongoDB', 'Docker', 'REST APIs', 'CI/CD', 'data analytics'],
    summary:
      'At Rebecca Everlene Trust Company, Taran builds full-stack applications, internal tools, backend services, and data-aware workflows for program and operations needs.',
    details: [
      'The portfolio lists this role as Software Engineer from Mar 2026 to Present.',
      'He works with Python, Java, PostgreSQL, MongoDB, Docker, REST APIs, documentation, stakeholder translation, and data analytics/reporting workflows.',
      'This role supports the portfolio story that Taran is currently building professional software, not only coursework projects.',
    ],
    href: '#experience',
  },
  {
    id: 'experience-ub-research',
    title: 'Research Assistant at University at Buffalo',
    section: 'experience',
    roleTags: ['Research Software Engineer', 'Machine Learning Engineer', 'Data Engineer', 'AI Engineer'],
    skillTags: ['Python', 'research workflows', 'ML', 'statistics', 'data analysis', 'reproducibility', 'visualization'],
    summary:
      'At University at Buffalo, Taran built reproducible computational workflows, data analysis tooling, and ML/statistical experiments for academic research.',
    details: [
      'The portfolio lists this role from Jan 2025 to Jan 2026 in Buffalo, New York.',
      'He supported research workflows with Python, data preparation, modeling, visualization, documentation, and version-controlled code.',
      'This role connects his graduate AI/ML study with practical research software and reproducible analysis habits.',
    ],
    href: '#experience',
  },
  {
    id: 'experience-ivingo',
    title: 'Software Engineer - Web and Data Platforms at iVinGo Solutions',
    section: 'experience',
    roleTags: ['Software Engineer', 'Data Engineer', 'Full Stack Developer'],
    skillTags: ['Python', 'Java', 'JavaScript', 'SQL', 'MySQL', 'Oracle', 'PostgreSQL', 'MongoDB', 'Docker', 'GitHub Actions', 'Jenkins', 'REST APIs'],
    summary:
      'At iVinGo Solutions, Taran delivered web platform, backend, database, data workflow, reporting, QA, and client-facing implementation work across production use cases.',
    details: [
      'The portfolio lists this role from Jun 2022 to Jul 2024, a 25-month professional software role.',
      'He worked across education, pharma, real estate, travel, e-commerce, and marketing platform use cases.',
      'He built API-backed workflows, database-driven features, data ingestion, cleaning, validation, SQL reporting, QA, debugging, and documentation workflows.',
      'He used Python, Java, JavaScript, REST APIs, MySQL, Oracle, PostgreSQL, MongoDB, Docker, GitHub Actions, and Jenkins.',
    ],
    href: '#experience',
  },
  {
    id: 'experience-nrsc',
    title: 'Research Intern - Data Science at NRSC / ISRO',
    section: 'experience',
    roleTags: ['Machine Learning Engineer', 'Data Engineer', 'AI Engineer', 'Research'],
    skillTags: ['Python', 'Pandas', 'GeoPandas', 'xarray', 'NetCDF4', 'PostgreSQL', 'Flask', 'Streamlit', 'SHAP', 'satellite data', 'remote sensing'],
    summary:
      'At NRSC / ISRO, Taran worked on atmospheric CO2 and LULC modeling using satellite datasets, geospatial analysis, regression, explainability, and reproducible climate reporting.',
    details: [
      'The portfolio lists this role from Feb 2023 to Sep 2023.',
      'He processed 2M+ satellite records across atmospheric CO2, climate-zone, and land-use/land-cover analysis workflows.',
      'He built feature engineering, regression modeling, validation, temporal aggregation, spatial analysis, and statistical reporting workflows.',
      'He applied SHAP Kernel Explainer to identify drivers behind model outputs.',
      'The work contributed to a 2025 International Journal of Remote Sensing publication with DOI 10.1080/01431161.2025.2562005.',
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
      'Taran completed the IGNITE 2023 enterprise development program across Java, databases, web technologies, Git, TypeScript, and Angular.',
    details: [
      'The visible portfolio uses IGNITE 2023 as the date label because exact dates conflict across analyzed sources.',
      'The training covered Java, DBMS, MongoDB, Python, collections, exception handling, JDBC, Maven, GitHub, TypeScript, and Angular.',
      'He practiced REST API and microservice patterns with database-backed application development.',
    ],
    href: '#experience',
  },
  {
    id: 'resume-readable-snapshot',
    title: 'Read-only resume snapshot',
    section: 'resume',
    roleTags: ['Recruiter', 'Hiring Manager', 'Software Engineer', 'Data Engineer', 'AI Engineer'],
    skillTags: ['resume', 'experience', 'skills', 'projects', 'education', 'read-only'],
    summary:
      'The portfolio includes an embedded read-only resume snapshot so recruiters can review Taran\'s resume content directly on the site without an obvious download link.',
    details: [
      'The resume section summarizes contact details, education, experience, selected skills, selected projects, and the NRSC / ISRO publication proof.',
      'The hero Resume button points to #resume inside the portfolio instead of an external Drive or PDF download URL.',
      'Browser content can still be copied or screenshotted by visitors, but the portfolio does not present a direct resume download action.',
    ],
    href: '#resume',
  },
  {
    id: 'education-ub',
    title: 'M.S. in Computer Science and Engineering at University at Buffalo',
    section: 'education',
    roleTags: ['Machine Learning Engineer', 'AI Engineer', 'Data Engineer', 'Software Engineer'],
    skillTags: ['Algorithms', 'Computer Security', 'Machine Learning', 'Data Intensive Computing', 'Operating Systems', 'Deep Learning', 'Computer Vision'],
    summary:
      'Taran is pursuing an M.S. in Computer Science and Engineering at University at Buffalo, SUNY, from Aug 2024 to Jan 2026.',
    details: [
      'Graduate coursework includes Algorithms, Computer Security, Intro Machine Learning, Data Intensive Computing, Operating Systems, Databases, Deep Learning, Statistical Data Mining, Web Analytics, and Computer Vision.',
      'Current resume evidence lists a 3.8/4.0 GPA.',
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
      'A research-grade geospatial climate-data workflow for atmospheric CO2 analysis across India using satellite observations, climate zones, LULC features, regression modeling, and explainability.',
    details: [
      'This project is tied to Taran\'s NRSC / ISRO research internship and strengthens the connection between climate science, data processing, modeling, and technical storytelling.',
      'It contributed to a 2025 International Journal of Remote Sensing publication with DOI 10.1080/01431161.2025.2562005.',
    ],
    href: '#projects',
  },
  {
    id: 'project-aviation',
    title: 'Aviation Accident Analysis',
    section: 'projects',
    roleTags: ['Data Engineer', 'Analytics Engineer'],
    skillTags: ['Python', 'Pandas', 'EDA', 'data cleaning', 'visualization', 'aviation safety'],
    summary:
      'Aviation accident analysis project using crash records from 1948 to 2022 with data cleaning, EDA, trend analysis, and safety-focused interpretation.',
    details: [
      'The report describes 10 data-cleaning steps and 10 exploratory analysis steps.',
      'The project studies accident trends, causes, fatalities, weather or technical factors, and location patterns.',
    ],
    href: '#projects',
  },
  {
    id: 'project-pintos-user-programs',
    title: 'Pintos User Programs and System Calls',
    section: 'projects',
    roleTags: ['Software Engineer', 'Systems Engineer'],
    skillTags: ['C', 'Pintos OS', 'system calls', 'process management', 'file descriptors', 'GDB'],
    summary:
      'Operating systems project implementing Pintos user-program support, argument passing, syscall handling, pointer validation, process loading, and file descriptor behavior.',
    details: [
      'The design document covers command-line parsing, stack setup, parent-child load synchronization, and syscall support.',
      'The project strengthened systems programming work around kernel/user boundaries and process control.',
    ],
    href: '#projects',
  },
  {
    id: 'project-penguins-diamonds-ml',
    title: 'Penguin Classification and Diamonds Price Prediction',
    section: 'projects',
    roleTags: ['Machine Learning Engineer', 'Data Scientist'],
    skillTags: ['Python', 'Pandas', 'Scikit-learn', 'classification', 'regression', 'feature engineering'],
    summary:
      'Machine learning coursework covering data cleaning, feature preparation, classification on penguin records, and regression-style prediction on structured datasets such as diamonds.',
    details: [
      'The assignments covered missing values, outliers, encoding, feature selection, normalization, and train-test splitting.',
      'The work reinforced practical ML habits before model comparison and evaluation.',
    ],
    href: '#projects',
  },
  {
    id: 'project-treasure-hunt-rl',
    title: 'Treasure Hunt Grid World Reinforcement Learning',
    section: 'projects',
    roleTags: ['Machine Learning Engineer', 'AI Engineer'],
    skillTags: ['Python', 'NumPy', 'SARSA', 'Double Q-learning', 'reinforcement learning', 'policy learning'],
    summary:
      'A 5x5 treasure-hunt grid-world environment where an agent learns to collect a key, avoid traps, and reach a goal through reward-driven policy learning.',
    details: [
      'The report defines 25 states, four movement actions, key/trap/goal rewards, and a clear agent objective.',
      'The project shows reinforcement learning environment design and comparison of learning behavior.',
    ],
    href: '#projects',
  },
  {
    id: 'project-product-review-sentiment',
    title: 'Online Product Reviews Sentiment Analysis',
    section: 'projects',
    roleTags: ['Machine Learning Engineer', 'Full Stack Developer'],
    skillTags: ['Python', 'BeautifulSoup', 'NLP', 'Random Forest', 'SVM', 'Flask', 'Scikit-learn'],
    summary:
      'NLP project for product-review sentiment classification using scraped review data, preprocessing, model comparison, and a Random Forest final model.',
    details: [
      'The report compares SVM, Logistic Regression, and Random Forest using accuracy, precision, and recall.',
      'Random Forest reached 95.0% accuracy in the project report.',
    ],
    href: '#projects',
  },
  {
    id: 'project-movie-reviews-db',
    title: 'Movie Reviews Website Database',
    section: 'projects',
    roleTags: ['Full Stack Developer', 'Software Engineer'],
    skillTags: ['PHP', 'MySQL', 'XAMPP', 'SQL', 'HTML', 'CSS', 'CRUD'],
    summary:
      'Database-backed movie and series review website with movie, review, and feedback tables plus PHP pages for details, ratings, and review submission.',
    details: [
      'The VIT DBMS report describes movies.php, reviews.php, moviedetails.php, addreview.php, and addmovie.php pages.',
      'The project demonstrates relational schema design and CRUD-style full-stack development.',
    ],
    href: '#projects',
  },
  {
    id: 'project-spark-wordcount',
    title: 'Spark Text Processing Word Count',
    section: 'projects',
    roleTags: ['Data Engineer', 'Analytics Engineer'],
    skillTags: ['Apache Spark', 'Python', 'RDDs', 'text processing', 'word count', 'frequency analysis'],
    summary:
      'Distributed text-processing workflow using Spark-style transformations for word count, normalization, stopword handling, and frequency analysis.',
    details: [
      'The project loads text as a corpus, tokenizes terms, normalizes case and punctuation, filters stop words, maps and reduces frequency counts, and sorts output for interpretation.',
      'It is intentionally compact but demonstrates the core data-engineering pattern behind larger distributed text pipelines.',
    ],
    href: '#projects',
  },
  {
    id: 'project-r-statistical-mining',
    title: 'R Statistical Mining With PCA and Clustering',
    section: 'projects',
    roleTags: ['Data Engineer', 'Machine Learning Engineer', 'Data Scientist'],
    skillTags: ['R', 'PCA', 'clustering', 'K-means', 'visualization', 'statistical learning'],
    summary:
      'R-based statistical data mining project covering exploratory visualization, PCA, clustering, anomaly review, and interpretation-focused modeling.',
    details: [
      'The project uses distribution checks, scaling awareness, PCA, clustering outputs, and anomaly review to keep statistical interpretation grounded.',
      'It supports data and ML roles by showing judgment around when methods are meaningful, not just how to run them.',
    ],
    href: '#projects',
  },
  {
    id: 'project-bayesian-biomonitoring',
    title: 'Bayesian Biomonitoring Early Warning',
    section: 'projects',
    roleTags: ['Machine Learning Engineer', 'AI Engineer', 'Research'],
    skillTags: ['Bayesian networks', 'probabilistic modeling', 'pgmpy', 'inference', 'early warning'],
    summary:
      'Probabilistic biomonitoring project using Bayesian networks to represent uncertainty and reason about early warning signals.',
    details: [
      'The project frames biomonitoring as uncertainty-aware reasoning across monitoring variables, dependency structure, and welfare-state interpretation.',
      'It adds evidence of graphical-model thinking and explainable probabilistic ML.',
    ],
    href: '#projects',
  },
  {
    id: 'project-pytorch-modeling-lab',
    title: 'PyTorch ML/DL Modeling Lab',
    section: 'projects',
    roleTags: ['Machine Learning Engineer', 'AI Engineer'],
    skillTags: ['PyTorch', 'CNN', 'RNN', 'LSTM', 'autoencoders', 'transformers', 'Vision Transformer'],
    summary:
      'Consolidated modeling lab covering preprocessing, neural networks, CNNs, RNNs, LSTMs, autoencoders, transformers, and ViT experiments.',
    details: [
      'The lab groups multiple model families into one architecture-practice repository.',
      'It demonstrates training-loop practice, model comparison, optimization behavior, and architecture-level intuition across image and sequence tasks.',
    ],
    href: '#projects',
  },
  {
    id: 'project-raspberry-pi-radio',
    title: 'Raspberry Pi Internet Radio Station',
    section: 'projects',
    roleTags: ['Software Engineer', 'Embedded Systems', 'IoT'],
    skillTags: ['Raspberry Pi', 'Linux', 'Pi MusicBox', 'Wi-Fi', 'audio streaming', 'network setup'],
    summary:
      'Embedded systems project configuring a Raspberry Pi as an internet radio device with image setup, Wi-Fi configuration, and streaming audio playback.',
    details: [
      'The project connects hardware setup, operating-system image preparation, networking, and media playback into a repeatable device workflow.',
      'It shows practical comfort with Linux-style configuration and networked embedded systems.',
    ],
    href: '#projects',
  },
  {
    id: 'project-arduino-lpg-detector',
    title: 'Arduino LPG Leakage Detector With SMS Alert',
    section: 'projects',
    roleTags: ['Software Engineer', 'Embedded Systems', 'IoT'],
    skillTags: ['Arduino', 'C++', 'MQ-5 sensor', 'SIM900A GSM', 'buzzer', 'safety system'],
    summary:
      'Safety-focused embedded project using Arduino UNO, an MQ-5 gas sensor, buzzer alarm, and GSM module to detect LPG leakage and send alerts.',
    details: [
      'The system reads gas concentration changes, triggers an audible alarm, and uses GSM alerting for LPG leakage notification.',
      'It adds a concrete sensor-integration project with hardware control and safety-oriented design.',
    ],
    href: '#projects',
  },
  {
    id: 'project-leetcode-learning-archive',
    title: 'Algorithm Practice and LeetCode Learning Archive',
    section: 'projects',
    roleTags: ['Software Engineer', 'Backend Engineer'],
    skillTags: ['Java', 'Python', 'data structures', 'algorithms', 'LeetCode', 'problem solving'],
    summary:
      'A GitHub algorithms and interview-prep archive organized across arrays, strings, dynamic programming, graphs, trees, matrices, sorting, and daily practice.',
    details: [
      'The repository groups solved problems and notes by topic so patterns are easier to revisit before interviews.',
      'It supports software engineering interviews by showing repeated practice across core data structures and algorithms.',
    ],
    href: '#projects',
  },
  {
    id: 'project-mobile-app-coursework',
    title: 'Mobile Application Development Coursework Portfolio',
    section: 'projects',
    roleTags: ['Software Engineer', 'Full Stack Developer'],
    skillTags: ['mobile app development', 'Android concepts', 'Java', 'mobile UI', 'application lifecycle'],
    summary:
      'A mobile application development repository collecting lab work and mini-project reports around app screens, UI behavior, lifecycle concepts, and implementation decisions.',
    details: [
      'The repository organizes mobile app development coursework and mini-project documentation in one place.',
      'It adds mobile-development context to Taran’s broader software engineering foundation.',
    ],
    href: '#projects',
  },
  {
    id: 'project-data-analytics-coursework',
    title: 'Data Analytics Coursework Portfolio',
    section: 'projects',
    roleTags: ['Data Engineer', 'Analytics Engineer'],
    skillTags: ['Python', 'data analytics', 'EDA', 'visualization', 'statistics', 'reporting'],
    summary:
      'An analytics coursework repository spanning foundational data analytics, advanced data analytics, exploratory analysis, reporting, and Python-based assignments.',
    details: [
      'The repository groups foundational, data analytics, and advanced analytics lab work for repeated data-cleaning and visualization practice.',
      'It complements the larger aviation, Mercedes-Benz, and statistical mining projects with additional analytics evidence.',
    ],
    href: '#projects',
  },
  {
    id: 'project-password-generator-web-app',
    title: 'Password Generator Web Application',
    section: 'projects',
    roleTags: ['Full Stack Developer', 'Software Engineer'],
    skillTags: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'web security', 'client-side logic'],
    summary:
      'A browser-based password generator project built with HTML, CSS, JavaScript, and jQuery, including multiple pages and client-side interaction logic.',
    details: [
      'The project includes home, about, feedback, styling, and utility behavior for a security-themed web application.',
      'It adds a concrete frontend utility project to the portfolio’s software and web development evidence.',
    ],
    href: '#projects',
  },
  {
    id: 'project-competitive-programming-archive',
    title: 'Competitive Programming Lab Archive',
    section: 'projects',
    roleTags: ['Software Engineer', 'Backend Engineer'],
    skillTags: ['algorithms', 'competitive programming', 'problem solving', 'complexity analysis', 'implementation practice'],
    summary:
      'A competitive programming coursework archive collecting lab reports and problem-solving exercises focused on algorithmic thinking and implementation discipline.',
    details: [
      'The archive supports interview readiness by reinforcing constraints, logic, implementation, and verification practice.',
      'It provides additional evidence of long-term algorithmic work beyond one isolated project.',
    ],
    href: '#projects',
  },
  {
    id: 'growth-ai',
    title: 'The Absolute Learning Loop',
    section: 'growth',
    roleTags: ['AI Engineer', 'Machine Learning Engineer'],
    skillTags: ['RAG', 'vector databases', 'AI agents', 'LLMOps', 'evaluation', 'AI security', 'reproducibility'],
    summary:
      'Taran keeps learning by turning questions into prototypes, prototypes into systems, and systems into evidence he can explain.',
    details: [
      'Growth topics include hybrid retrieval, reranking, citations, vector databases, planning, tool calling, memory, validation loops, evaluation harnesses, observability, regression tests, reproducible pipelines, cost, latency, privacy, and prompt-injection awareness.',
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
    id: 'contact',
    title: 'Contact and opportunity fit',
    section: 'contact',
    roleTags: ['Recruiter', 'Hiring Manager'],
    skillTags: ['contact', 'email', 'GitHub', 'LinkedIn', 'opportunities'],
    summary:
      'The contact section invites recruiters and collaborators to discuss software, backend, data, ML, AI, full-stack, research, and product opportunities.',
    details: [
      'The heading says Let\'s Build The Next Useful Thing.',
      'The copy says Taran is open to opportunities where software, data, and AI work together to solve real problems.',
      'Primary contact email is mtaran014@gmail.com.',
    ],
    href: '#contact',
  },
];

export const suggestedPortfolioQuestions = [
  'Why is Taran job-ready for software, data, and AI roles?',
  'Which experience proves backend and data engineering depth?',
  'Where can I read his resume?',
  'Summarize his research experience.',
  'What publication is connected to his NRSC / ISRO work?',
  'Is he open to relocation?',
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
      if (mode === 'role_match' && item.section !== 'contact') score += item.roleTags.length;
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
    return 'Ask me about Taran\'s projects, experience, AI engineering fit, relocation, education, publication, or the best project to review first.';
  }

  if (matches.length === 0) {
    return "I don't have enough portfolio evidence to answer that confidently. Try asking about Taran's AI projects, ML systems, experience, education, research, publication, or relocation.";
  }

  const top = matches.slice(0, 3).map(({ item }) => item);
  const rolePrefix = options.selectedRole ? `For ${options.selectedRole}, ` : '';
  const evidence = top
    .map((item) => `${item.title}: ${item.summary}`)
    .join(' ');

  return `${rolePrefix}${evidence} The strongest next step is to review the cited portfolio sections for the project details, technologies, and outcomes.`;
};
