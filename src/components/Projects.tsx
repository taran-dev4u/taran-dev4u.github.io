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
import { trackEvent } from '@/lib/analytics';

type Project = {
  title: string;
  role: string;
  status: 'Completed' | 'Live';
  context: string;
  subject?: string;
  overview: string;
  technologies: string[];
  keyFeatures: string[];
  outcome: string;
  icon: LucideIcon;
  coverImage?: string;
  // Add real project URLs here when they are available. Keep missing GitHub/live links undefined so recruiters do not see dummy buttons.
  githubUrl?: string;
  demoUrl?: string;
};

const defaultProjectCover = 'default%20project%20cover%20photo.png';

const remoteCover = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=82`;

const projectCoverImages = {
  ai: remoteCover('photo-1677442136019-21780ecad995'),
  algorithms: remoteCover('photo-1515879218367-8466d910aaa4'),
  analytics: remoteCover('photo-1551288049-bebda4e38f71'),
  aviation: remoteCover('photo-1436491865332-7a61a109cc05'),
  climate: remoteCover('photo-1446776811953-b23d57bd21aa'),
  database: remoteCover('photo-1558494949-ef010cbdcc31'),
  embedded: remoteCover('photo-1518770660439-4636190af475'),
  finance: remoteCover('photo-1611974789855-9c2a0a7236a3'),
  mobile: remoteCover('photo-1516321318423-f06f85e504b3'),
  security: remoteCover('photo-1555949963-aa79dcee981c'),
  systems: remoteCover('photo-1518779578993-ec3579fee39f'),
  vision: remoteCover('photo-1535378917042-10a22c95931a'),
  web: remoteCover('photo-1461749280684-dccba630e2f6'),
};

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

const resolveProjectImage = (path: string) =>
  /^https?:\/\//.test(path) ? path : publicAsset(path);

const getProjectCoverSrc = (project: Project) => {
  if (project.coverImage) return resolveProjectImage(project.coverImage);

  const haystack = `${project.title} ${project.role} ${project.subject || ''} ${project.context}`.toLowerCase();

  if (haystack.includes('co2') || haystack.includes('climate') || haystack.includes('satellite')) return projectCoverImages.climate;
  if (haystack.includes('inpainting') || haystack.includes('vision') || haystack.includes('face') || haystack.includes('image')) return projectCoverImages.vision;
  if (haystack.includes('aviation')) return projectCoverImages.aviation;
  if (haystack.includes('spark') || haystack.includes('analytics') || haystack.includes('data pipeline') || haystack.includes('statistical') || haystack.includes('lakehouse')) return projectCoverImages.analytics;
  if (haystack.includes('pintos') || haystack.includes('operating systems') || haystack.includes('rate limiter') || haystack.includes('microservices')) return projectCoverImages.systems;
  if (haystack.includes('stock') || haystack.includes('fraud') || haystack.includes('mercedes') || haystack.includes('price')) return projectCoverImages.finance;
  if (haystack.includes('database') || haystack.includes('dbms') || haystack.includes('sql') || haystack.includes('movie')) return projectCoverImages.database;
  if (haystack.includes('password') || haystack.includes('security') || haystack.includes('cryptography') || haystack.includes('elgamal')) return projectCoverImages.security;
  if (haystack.includes('mobile') || haystack.includes('android')) return projectCoverImages.mobile;
  if (haystack.includes('leetcode') || haystack.includes('algorithm') || haystack.includes('competitive')) return projectCoverImages.algorithms;
  if (haystack.includes('raspberry') || haystack.includes('arduino') || haystack.includes('iot') || haystack.includes('embedded')) return projectCoverImages.embedded;
  if (haystack.includes('rag') || haystack.includes('agent') || haystack.includes('mlops') || haystack.includes('pytorch') || haystack.includes('learning')) return projectCoverImages.ai;
  if (haystack.includes('web') || haystack.includes('saas') || haystack.includes('dashboard')) return projectCoverImages.web;

  return publicAsset(defaultProjectCover);
};

const projects: Project[] = [
  {
    title: 'Atmospheric CO2 and LULC Modeling Pipeline',
    role: 'Machine Learning Engineer',
    status: 'Completed',
    context: 'NRSC / ISRO research internship',
    overview:
      'Research-grade geospatial climate-data workflow for atmospheric CO2 analysis across India using satellite observations, climate zones, LULC features, regression modeling, and explainability.',
    technologies: ['Python', 'xarray', 'NetCDF4', 'GeoPandas', 'SHAP', 'PostgreSQL', 'Streamlit'],
    keyFeatures: [
      'Processed multi-year satellite datasets from AIRS, GOSAT, SCIAMACHY, OCO-2, and OCO-3.',
      'Mapped CO2 trends against Koppen-Geiger climate zones and land-use classes.',
      'Used explainability to understand drivers behind regression outputs.',
      'Built reproducible reporting workflows for analysis and review.',
      'Contributed to work later published in the International Journal of Remote Sensing, DOI 10.1080/01431161.2025.2562005.',
    ],
    outcome:
      'Connected climate science, large-scale data processing, modeling, explainability, and publication-ready technical storytelling.',
    icon: RadioTower,
    githubUrl: 'https://github.com/taran-dev4u/satellite-co2-climate-analytics',
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
    githubUrl: 'https://github.com/taran-dev4u/transformer-gan-image-restoration',
  },
  {
    title: 'Aviation Accident Analysis: Trends, Causes, and Safety Measures',
    role: 'Data Engineer',
    status: 'Completed',
    context: 'CSE 587 data-intensive computing project',
    overview:
      'Large-scale aviation accident analysis using crash records from 1948 to 2022, with structured cleaning, exploratory analysis, trend discovery, and safety-focused interpretation.',
    technologies: ['Python', 'Pandas', 'Data Cleaning', 'EDA', 'Visualization', 'Kaggle Dataset'],
    keyFeatures: [
      'Performed 10 distinct data-cleaning steps and 10 exploratory analysis steps on aviation accident records.',
      'Studied accident trends, causes, fatalities, aircraft behavior, geography, and operational safety signals.',
      'Built visual explanations to make historical accident patterns easier to review.',
      'Connected technical analysis with practical aviation safety and risk-reduction questions.',
    ],
    outcome:
      'Improved my ability to turn messy historical datasets into clear, domain-aware findings for decision making.',
    icon: BarChart3,
    githubUrl: 'https://github.com/taran-dev4u/aviation-accident-risk-analytics',
  },
  {
    title: 'Spark Text Processing Word Count',
    role: 'Data Engineer',
    status: 'Completed',
    context: 'GitHub data-engineering lab',
    subject: 'Distributed Text Processing',
    overview:
      'Compact distributed text-processing workflow using Spark-style transformations for word count, normalization, stopword handling, sorted frequency output, and result interpretation.',
    technologies: ['Apache Spark', 'Python', 'RDDs', 'Text Processing', 'Stopword Filtering', 'Frequency Analysis'],
    keyFeatures: [
      'Loaded multiple text files as a corpus and tokenized them into countable terms.',
      'Applied case normalization, punctuation handling, and stopword filtering to reduce noisy output.',
      'Mapped and reduced terms into frequency counts, then sorted results for interpretation.',
      'Documented the core pattern behind larger distributed text pipelines in a concise repo.',
    ],
    outcome:
      'Shows hands-on comfort with distributed data-processing fundamentals before scaling into larger Spark pipelines.',
    icon: Workflow,
    githubUrl: 'https://github.com/taran-dev4u/spark-text-processing-wordcount',
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
    githubUrl: 'https://github.com/taran-dev4u/pintos-kernel-systems-lab',
  },
  {
    title: 'Pintos User Programs and System Calls',
    role: 'Software Developer',
    status: 'Completed',
    context: 'CSE 521 operating systems project',
    overview:
      'User-program support in Pintos covering command-line argument passing, user stack setup, process loading, syscall handling, pointer validation, file descriptors, and parent-child synchronization.',
    technologies: ['C', 'Pintos OS', 'System Calls', 'User Programs', 'GDB', 'Linux'],
    keyFeatures: [
      'Implemented argument parsing and stack setup for user-space process execution.',
      'Built syscall support around read, write, open, close, create, remove, exec, and wait behavior.',
      'Added parent-child loading synchronization and safer user-kernel boundary checks.',
      'Worked inside a constrained OS codebase while preserving starter-kit boundaries.',
    ],
    outcome:
      'Strengthened my systems programming discipline around process control, memory safety, and kernel/user interfaces.',
    icon: Cpu,
    coverImage: 'pintos2.png',
    githubUrl: 'https://github.com/taran-dev4u/pintos-kernel-systems-lab',
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
    githubUrl: 'https://github.com/taran-dev4u/stock-market-transaction-analytics-db',
  },
  {
    title: 'Penguin Classification Pipeline',
    role: 'Machine Learning Engineer',
    status: 'Completed',
    context: 'CSE 574 introduction to machine learning assignment',
    overview:
      'Classification workflow for penguin records covering data cleaning, categorical handling, feature preparation, model training, and evaluation across species and biological measurements.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'EDA', 'Feature Engineering', 'Classification'],
    keyFeatures: [
      'Cleaned missing values, duplicates, mismatched formats, and outliers before modeling.',
      'Prepared species, island, bill measurements, flipper length, body mass, and gender features.',
      'Applied feature selection, normalization, and train-test splitting for reliable evaluation.',
      'Compared model behavior using a structured preprocessing pipeline.',
    ],
    outcome:
      'Built a stronger foundation in supervised learning workflows and careful preprocessing before modeling.',
    icon: BrainCircuit,
    coverImage: 'penguin_project.png',
  },
  {
    title: 'Diamonds Price Prediction',
    role: 'Machine Learning Engineer',
    status: 'Completed',
    context: 'CSE 574 / statistical modeling coursework',
    overview:
      'Regression-focused analysis of diamond pricing using structured feature preparation, scaling, dimensionality reduction, model comparison, and error-based evaluation.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Regression', 'PCA', 'Visualization'],
    keyFeatures: [
      'Prepared structured diamond attributes for regression and dimensionality-reduction experiments.',
      'Analyzed feature distributions, correlations, scaling behavior, and outlier impact.',
      'Compared prediction approaches using practical regression metrics.',
      'Connected statistical preprocessing decisions to model stability and interpretability.',
    ],
    outcome:
      'Improved my regression workflow, feature-analysis habits, and ability to explain model tradeoffs.',
    icon: LineChart,
    coverImage: 'diamonds%20project.png',
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
    githubUrl: 'https://github.com/taran-dev4u/mercedes-benz-test-time-forecasting',
  },
  {
    title: 'R Statistical Mining With PCA and Clustering',
    role: 'Data Engineer',
    status: 'Completed',
    context: 'EAS 507 statistical data mining coursework',
    subject: 'Statistical Mining',
    overview:
      'R-based statistical data mining project covering exploratory visualization, distribution checks, PCA, clustering, anomaly review, and interpretation-focused modeling.',
    technologies: ['R', 'PCA', 'K-Means', 'Clustering', 'Visualization', 'Statistical Learning'],
    keyFeatures: [
      'Inspected datasets with pair plots, histograms, distribution checks, and exploratory summaries.',
      'Applied PCA to reduce dimensionality while explaining variance and component behavior.',
      'Compared clustering outputs after considering scaling, context, and outlier behavior.',
      'Focused on interpreting statistical results instead of only running algorithms.',
    ],
    outcome:
      'Strengthened statistical modeling judgment around scaling, dimensionality reduction, clustering, and anomaly-aware analysis.',
    icon: LineChart,
    githubUrl: 'https://github.com/taran-dev4u/r-statistical-mining-pca-clustering',
  },
  {
    title: 'Treasure Hunt Grid World Reinforcement Learning',
    role: 'Machine Learning Engineer',
    status: 'Completed',
    context: 'CSE 574 reinforcement learning assignment',
    overview:
      'A 5x5 treasure-hunt grid world where an agent learns to collect a key, avoid traps, and reach the goal using reinforcement learning policies.',
    technologies: ['Python', 'NumPy', 'SARSA', 'Double Q-Learning', 'Reinforcement Learning', 'Matplotlib'],
    keyFeatures: [
      'Defined 25 grid states with start, key, trap, and goal positions.',
      'Modeled four movement actions and reward signals for key collection, traps, and goal completion.',
      'Compared learning behavior across SARSA and Double Q-learning style approaches.',
      'Visualized learned policies, rewards, and exploration behavior.',
    ],
    outcome:
      'Strengthened my understanding of RL environments, reward design, policy learning, and exploration tradeoffs.',
    icon: Workflow,
    coverImage: 'qlearning%20project.png',
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
    githubUrl: 'https://github.com/taran-dev4u/computer-vision-geometry-stitching-detection',
  },
  {
    title: 'Online Product Reviews Sentiment Analysis',
    role: 'Machine Learning Engineer',
    status: 'Completed',
    context: 'Undergraduate NLP / ML project',
    overview:
      'Product-review sentiment classifier using web-scraped review data, text preprocessing, vectorization, model comparison, and a Random Forest final model.',
    technologies: ['Python', 'BeautifulSoup', 'NLTK', 'Scikit-learn', 'Random Forest', 'Flask'],
    keyFeatures: [
      'Collected online product reviews through web scraping and prepared text for sentiment modeling.',
      'Compared SVM, Logistic Regression, and Random Forest using accuracy, precision, and recall.',
      'Selected Random Forest after reaching 95.0% accuracy, 0.95 precision, and 0.94 recall in the report.',
      'Connected NLP modeling with a deployable review-classification workflow.',
    ],
    outcome:
      'Built confidence with end-to-end NLP workflows from collection and cleaning to model evaluation and simple deployment.',
    icon: BrainCircuit,
    githubUrl: 'https://github.com/taran-dev4u/ecommerce-review-sentiment-analytics',
  },
  {
    title: 'Bayesian Biomonitoring Early Warning',
    role: 'Machine Learning Engineer',
    status: 'Completed',
    context: 'Undergraduate probabilistic ML project',
    subject: 'Probabilistic Modeling',
    overview:
      'Probabilistic biomonitoring project using Bayesian networks to represent uncertainty, connect monitoring variables, and reason about early warning signals.',
    technologies: ['Python', 'Bayesian Networks', 'pgmpy', 'Probabilistic Modeling', 'Pandas', 'Inference'],
    keyFeatures: [
      'Framed biomonitoring as an uncertainty-aware reasoning problem instead of a simple threshold check.',
      'Defined monitoring variables, dependency structure, and welfare-state interpretation.',
      'Prepared the project for conditional probability tables and inference examples.',
      'Connected biological monitoring concepts with practical probabilistic ML modeling.',
    ],
    outcome:
      'Added depth in uncertainty modeling, graphical models, and explainable reasoning for risk-oriented ML systems.',
    icon: BrainCircuit,
    githubUrl: 'https://github.com/taran-dev4u/bayesian-biomonitoring-early-warning',
  },
  {
    title: 'PyTorch ML/DL Modeling Lab',
    role: 'Machine Learning Engineer',
    status: 'Completed',
    context: 'Deep learning architecture lab',
    subject: 'Deep Learning',
    overview:
      'Consolidated modeling lab covering preprocessing, neural networks, CNNs, RNNs, LSTMs, autoencoders, transformers, and Vision Transformer experiments.',
    technologies: ['PyTorch', 'CNN', 'RNN', 'LSTM', 'Autoencoders', 'Transformers', 'ViT'],
    keyFeatures: [
      'Organized multiple model families into one coherent deep-learning practice repo.',
      'Covered both image and sequence modeling patterns across supervised and representation-learning tasks.',
      'Practiced model setup, training loops, optimization behavior, and architecture comparison.',
      'Connected coursework experiments to reusable ML engineering habits.',
    ],
    outcome:
      'Strengthened architecture-level intuition across modern deep learning workflows beyond one isolated model.',
    icon: BrainCircuit,
    githubUrl: 'https://github.com/taran-dev4u/pytorch-ml-dl-modeling-lab',
  },
  {
    title: 'Movie Reviews Website Database',
    role: 'Full Stack Developer',
    status: 'Completed',
    context: 'VIT DBMS project',
    overview:
      'Movie and series review website backed by a MySQL database, XAMPP local server setup, PHP pages, ratings, reviews, movie details, and feedback handling.',
    technologies: ['PHP', 'MySQL', 'XAMPP', 'HTML', 'CSS', 'SQL', 'Database Design'],
    keyFeatures: [
      'Created movie, review, and feedback tables with relationships for a review website.',
      'Built PHP pages for movies, reviews, movie details, adding reviews, and adding movies.',
      'Supported movie search, details, user ratings, and feedback collection.',
      'Practiced full-stack database-backed development with local server tooling.',
    ],
    outcome:
      'Reinforced relational schema design, CRUD flows, and PHP/MySQL application structure.',
    icon: Database,
    githubUrl: 'https://github.com/taran-dev4u/movie-series-review-dbms',
  },
  {
    title: 'Raspberry Pi Internet Radio Station',
    role: 'Software Developer',
    status: 'Completed',
    context: 'Embedded systems / IoT project',
    subject: 'Embedded / IoT',
    overview:
      'Embedded systems project that configures a Raspberry Pi as an internet radio device with operating-system image setup, Wi-Fi configuration, and streaming audio playback.',
    technologies: ['Raspberry Pi', 'Linux', 'Pi MusicBox', 'Wi-Fi', 'Audio Streaming', 'SD Card Imaging'],
    keyFeatures: [
      'Prepared the Raspberry Pi image and SD-card workflow for the device setup.',
      'Configured networking so the device could connect and access internet radio streams.',
      'Documented hardware, software, and playback workflow for repeatable setup.',
      'Connected embedded configuration, networking, and media playback into one working system.',
    ],
    outcome:
      'Shows practical comfort with hardware-oriented software setup, Linux-style configuration, and networked device workflows.',
    icon: RadioTower,
    githubUrl: 'https://github.com/taran-dev4u/raspberry-pi-internet-radio-station',
  },
  {
    title: 'Arduino LPG Leakage Detector With SMS Alert',
    role: 'Software Developer',
    status: 'Completed',
    context: 'Arduino safety-system project',
    subject: 'Embedded / IoT',
    overview:
      'Safety-focused embedded project using Arduino UNO, an MQ-5 gas sensor, buzzer alarm, and SIM900A GSM module to detect LPG leakage and send alerts.',
    technologies: ['Arduino', 'C++', 'MQ-5 Sensor', 'SIM900A GSM', 'Buzzer', 'Embedded Systems'],
    keyFeatures: [
      'Read gas concentration changes from an MQ-5 sensor and triggered an alarm response.',
      'Used Arduino UNO to coordinate sensor readings, buzzer behavior, and GSM alert flow.',
      'Designed the workflow for LPG leakage detection with audible and SMS-style notification paths.',
      'Documented cost and component choices for a practical low-cost safety device.',
    ],
    outcome:
      'Adds a concrete embedded systems example with sensor integration, hardware control, and safety-oriented alerting.',
    icon: ShieldCheck,
    githubUrl: 'https://github.com/taran-dev4u/Arduino-LPG-detector',
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
      'One of my public-facing analytics projects with a live walkthrough available.',
    icon: BarChart3,
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
    githubUrl: 'https://github.com/taran-dev4u/elgamal-digital-signature-implementation',
  },
  {
    title: 'Algorithm Practice and LeetCode Learning Archive',
    role: 'Software Developer',
    status: 'Completed',
    context: 'GitHub algorithms and interview-prep repository',
    subject: 'Algorithms',
    overview:
      'Structured algorithm-practice archive covering arrays, strings, dynamic programming, graphs, trees, sliding windows, backtracking, matrices, sorting, and daily problem solving.',
    technologies: ['Java', 'Python', 'Jupyter Notebook', 'Data Structures', 'Algorithms', 'Problem Solving'],
    keyFeatures: [
      'Organized solved problems by topic so practice patterns are easier to revisit before interviews.',
      'Covered matrix traversal, searching, sorting, hashing, linked lists, trees, graphs, dynamic programming, and two-pointer patterns.',
      'Included notes and supporting notebook work for computer vision and Python practice.',
      'Built a reusable preparation archive instead of keeping scattered one-off solutions.',
    ],
    outcome:
      'Strengthened interview readiness and core problem-solving habits across data structures and algorithms.',
    icon: Cpu,
    githubUrl: 'https://github.com/taran-dev4u/LeetCode_absolute_Learning',
  },
  {
    title: 'Mobile Application Development Coursework Portfolio',
    role: 'Software Developer',
    status: 'Completed',
    context: 'Undergraduate mobile application development repository',
    subject: 'Mobile Apps',
    overview:
      'Collection of mobile application development labs and mini-project reports documenting app screens, UI behavior, lifecycle concepts, and course-based implementation work.',
    technologies: ['Android Concepts', 'Java', 'Mobile UI', 'Application Lifecycle', 'Course Reports', 'Documentation'],
    keyFeatures: [
      'Collected lab work and mini-project reports from mobile application development coursework.',
      'Documented app-building exercises, interface behavior, and implementation decisions across multiple assignments.',
      'Kept course artifacts organized in a single GitHub repository for future reference.',
      'Shows practical exposure to mobile app workflows alongside web and backend projects.',
    ],
    outcome:
      'Added mobile-development context to my broader software engineering foundation.',
    icon: Layers3,
    githubUrl: 'https://github.com/taran-dev4u/App-Dev-Works',
  },
  {
    title: 'Data Analytics Coursework Portfolio',
    role: 'Data Engineer',
    status: 'Completed',
    context: 'Undergraduate analytics and data-analysis repository',
    subject: 'Analytics',
    overview:
      'Organized analytics coursework repository spanning foundational data analytics, advanced data analytics, exploratory analysis, reporting, and Python-based analysis assignments.',
    technologies: ['Python', 'Data Analytics', 'EDA', 'Visualization', 'Statistics', 'Reporting'],
    keyFeatures: [
      'Grouped foundational, data analytics, and advanced analytics lab work into a maintainable repository.',
      'Captured analysis workflows through reports covering exploratory analysis, visual interpretation, and statistical reasoning.',
      'Practiced translating raw datasets and assignments into structured findings.',
      'Complements the larger aviation, Mercedes-Benz, and statistical mining projects with additional analytics practice.',
    ],
    outcome:
      'Built repetition in data-cleaning, analysis, visualization, and report-writing workflows.',
    icon: BarChart3,
    githubUrl: 'https://github.com/taran-dev4u/Data-analytics',
  },
  {
    title: 'Password Generator Web Application',
    role: 'Full Stack Developer',
    status: 'Completed',
    context: 'GitHub web development project',
    subject: 'Web Security',
    overview:
      'Browser-based password generator project built with HTML, CSS, JavaScript, and jQuery, including multiple pages, styling, feedback flow, and client-side interaction logic.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Responsive UI', 'Client-Side Logic'],
    keyFeatures: [
      'Built a multi-page web interface for generating and presenting password-related utility behavior.',
      'Used JavaScript and jQuery for client-side interaction and page behavior.',
      'Included supporting pages such as home, about, and feedback flows.',
      'Practiced web UI structure, styling, and security-themed utility design.',
    ],
    outcome:
      'Improved frontend implementation practice with a concrete browser-based utility project.',
    icon: ShieldCheck,
    githubUrl: 'https://github.com/taran-dev4u/WebDev-Projects',
  },
  {
    title: 'Competitive Programming Lab Archive',
    role: 'Software Developer',
    status: 'Completed',
    context: 'Undergraduate competitive programming repository',
    subject: 'Algorithms',
    overview:
      'Competitive programming coursework archive collecting lab reports and problem-solving exercises focused on algorithmic thinking, implementation discipline, and contest-style preparation.',
    technologies: ['Algorithms', 'Competitive Programming', 'Problem Solving', 'Complexity Analysis', 'Implementation Practice'],
    keyFeatures: [
      'Collected multiple competitive-programming lab submissions in one repository.',
      'Practiced breaking problems into constraints, logic, implementation, and verification steps.',
      'Supported the same fundamentals used in systems, backend, ML, and data-engineering interviews.',
      'Provides additional evidence of long-term algorithmic practice beyond one project.',
    ],
    outcome:
      'Strengthened algorithmic reasoning and implementation speed through repeated coursework practice.',
    icon: Cpu,
    githubUrl: 'https://github.com/taran-dev4u/CompetitveProgramming',
  },
  {
    title: 'Distributed Rate Limiter & API Gateway',
    role: 'Software Developer',
    status: 'Live',
    context: 'Distributed systems reliability project',
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
    status: 'Live',
    context: 'Event-driven backend architecture project',
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
    status: 'Live',
    context: 'Streaming analytics engineering project',
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
    status: 'Live',
    context: 'Modern lakehouse architecture project',
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
    status: 'Live',
    context: 'Multi-tenant product engineering project',
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
    status: 'Live',
    context: 'Real-time product analytics project',
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
    status: 'Live',
    context: 'Production ML lifecycle project',
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
    status: 'Live',
    context: 'Low-latency risk modeling project',
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
    status: 'Live',
    context: 'Enterprise AI knowledge platform project',
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
    status: 'Live',
    context: 'Agentic AI research workflow project',
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

const getProjectTags = (project: Project) => {
  const title = project.title.toLowerCase();
  const fallbackSubject =
    title.includes('co2') || title.includes('climate') ? 'Climate Data'
      : title.includes('inpainting') ? 'Deep Learning'
        : title.includes('aviation') ? 'Safety Analytics'
          : title.includes('pintos') ? 'Operating Systems'
            : title.includes('stock market') || title.includes('movie reviews') ? 'Database Systems'
              : title.includes('penguin') || title.includes('diamonds') || title.includes('mercedes') ? 'Predictive Modeling'
                : title.includes('treasure') ? 'Reinforcement Learning'
                  : title.includes('computer vision') ? 'Vision Systems'
                    : title.includes('sentiment') ? 'NLP'
                      : title.includes('hotel') ? 'Business Analytics'
                        : title.includes('elgamal') ? 'Cryptography'
                          : title.includes('rate limiter') ? 'Backend Systems'
                            : title.includes('microservices') ? 'Distributed Systems'
                              : title.includes('streaming') ? 'Streaming Data'
                                : title.includes('lakehouse') ? 'Data Platforms'
                                  : title.includes('saas') ? 'Product Engineering'
                                    : title.includes('dashboard') ? 'Analytics Product'
                                      : title.includes('mlops') ? 'ML Systems'
                                        : title.includes('fraud') ? 'Risk Modeling'
                                          : title.includes('rag') ? 'Knowledge Systems'
                                            : title.includes('agent') ? 'AI Agents'
                                              : project.role;

  return [project.role, project.subject || fallbackSubject].filter(Boolean).slice(0, 2) as string[];
};

const priorityProjectTitles = [
  'Atmospheric CO2 and LULC Modeling Pipeline',
  'Real-Time Streaming Data Pipeline',
  'Enterprise RAG Knowledge System',
  'End-to-End MLOps Pipeline',
  'Pintos User Programs and System Calls',
  'Stock Market Database for Real-Time Analysis',
];

const ProjectVisual = ({ project }: { project: Project }) => {
  const [actualLoaded, setActualLoaded] = useState(false);
  const [actualFailed, setActualFailed] = useState(false);
  const defaultSrc = publicAsset(defaultProjectCover);
  const actualSrc = getProjectCoverSrc(project);
  const shouldLoadActual = actualSrc !== defaultSrc && !actualFailed;

  return (
    <div className="project-visual">
      <img
        src={defaultSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      {shouldLoadActual && (
        <img
          src={actualSrc}
          alt={`${project.title} cover`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${actualLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setActualLoaded(true)}
          onError={() => setActualFailed(true)}
        />
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/82 to-transparent p-4">
        <div className="line-clamp-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{project.context}</div>
      </div>
    </div>
  );
};

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedRole, setSelectedRole] = useState('All Projects');
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const orderedProjects = [...projects].sort((a, b) => {
    const aPriority = priorityProjectTitles.indexOf(a.title);
    const bPriority = priorityProjectTitles.indexOf(b.title);

    if (aPriority !== -1 || bPriority !== -1) {
      return (aPriority === -1 ? priorityProjectTitles.length : aPriority)
        - (bPriority === -1 ? priorityProjectTitles.length : bPriority);
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
            Selected work across research data pipelines, backend systems, AI products, MLOps, databases, computer vision, analytics, and security.
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
                    <div className="flex flex-wrap gap-2">
                      {getProjectTags(project).map((tag, tagIndex) => (
                        <Badge
                          key={`${project.title}-${tag}`}
                          className={tagIndex === 0
                            ? 'w-fit bg-primary/10 text-primary border-primary/20 hover:bg-primary/15'
                            : 'w-fit bg-secondary/70 text-muted-foreground border-border/50 hover:bg-secondary/80'
                          }
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {project.status === 'Live' && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgb(52_211_153)]" />
                        Live
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
                    onClick={() => {
                      trackEvent({ action: 'open_project_details', label: project.title });
                      setActiveProject(project);
                    }}
                  >
                    More Details
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                  {project.githubUrl && (
                    <Button asChild variant="outline" size="sm" className="flex-1 min-w-28 hover:border-primary/30 hover:text-primary">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent({ action: 'open_project_code', label: project.title })}
                      >
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button asChild size="sm" className="flex-1 min-w-28 btn-primary">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent({ action: 'open_project_live', label: project.title })}
                      >
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
