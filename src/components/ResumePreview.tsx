import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BriefcaseBusiness, Code2, Database, GraduationCap, Mail, MapPin, Phone, ScrollText, Sparkles } from 'lucide-react';

const contactItems = [
  'Buffalo, New York',
  'mtaran014@gmail.com',
  '+1 (716) 784-7027',
  'linkedin.com/in/taranmamidala',
  'github.com/taran-dev4u',
];

const experience = [
  {
    role: 'Software Engineer',
    company: 'Rebecca Everlene Trust Company',
    period: 'Mar 2026 - Present',
    points: [
      'Build full-stack applications, internal tools, REST APIs, and database-backed workflows for program and operations needs.',
      'Work with Python, Java, PostgreSQL, MongoDB, Docker, CI/CD practices, documentation, and stakeholder-driven delivery.',
      'Support analytics, reporting, data cleaning, validation, structuring, and visualization workflows.',
    ],
  },
  {
    role: 'Research Assistant',
    company: 'University at Buffalo',
    period: 'Jan 2025 - Jan 2026',
    points: [
      'Build reproducible Python workflows, analysis tooling, and ML/statistical experiments for academic research.',
      'Document methods, assumptions, and results so research workflows can be reviewed, repeated, and extended.',
      'Create visual explanations and maintain version-controlled code for technical and non-technical audiences.',
    ],
  },
  {
    role: 'Software Engineer - Web & Data Platforms',
    company: 'iVinGo Solutions Pvt. Ltd.',
    period: 'Jun 2022 - Jul 2024',
    points: [
      'Delivered web platforms, backend API patterns, database-backed features, reporting workflows, QA, debugging, and documentation.',
      'Worked across Python, Java, JavaScript, SQL, MySQL, Oracle, PostgreSQL, MongoDB, Docker, GitHub Actions, and Jenkins.',
      'Supported client projects across education, pharma, real estate, travel, e-commerce, and marketing workflows.',
    ],
  },
  {
    role: 'Research Intern - Data Science',
    company: 'NRSC, Indian Space Research Organisation (ISRO)',
    period: 'Feb 2023 - Sep 2023',
    points: [
      'Processed 2M+ satellite records for atmospheric CO2, land-use/land-cover, and climate-zone analysis.',
      'Built geospatial data workflows, regression modeling, validation, explainability, and reproducible reporting pipelines.',
      'Contributed to research later published in the International Journal of Remote Sensing, DOI 10.1080/01431161.2025.2562005.',
    ],
  },
  {
    role: 'Java Developer Training - IGNITE Program',
    company: 'LTI Mindtree',
    period: 'IGNITE 2023',
    points: [
      'Completed enterprise development training across Java, DBMS, MongoDB, Python, JDBC, Maven, GitHub, TypeScript, Angular, and REST concepts.',
      'Practiced backend, frontend, database, and version-control fundamentals in a structured engineering environment.',
    ],
  },
];

const skills = [
  'Python',
  'Java',
  'SQL',
  'Bash',
  'JavaScript',
  'TypeScript',
  'React',
  'FastAPI',
  'Flask',
  'Spring Boot',
  'PostgreSQL',
  'MySQL',
  'Oracle',
  'MongoDB',
  'ETL/ELT',
  'Kafka',
  'Spark',
  'Pandas',
  'GeoPandas',
  'xarray',
  'NetCDF4',
  'PyTorch',
  'TensorFlow',
  'Scikit-learn',
  'SHAP',
  'Docker',
  'AWS',
  'Terraform',
  'GitHub Actions',
  'Pytest',
];

const projects = [
  'Atmospheric CO2 and LULC Modeling Pipeline - NRSC/ISRO research workflow using satellite data, geospatial modeling, SHAP, PostgreSQL, Flask, and Streamlit.',
  'Real-Time Streaming Data Pipeline - Kafka, Spark Structured Streaming, Python, Parquet, PostgreSQL, FastAPI, and Docker.',
  'Enterprise RAG Knowledge System - LangChain, OpenAI, vector search, citations, reranking, FastAPI, and PostgreSQL.',
  'Pintos Kernel Systems Lab - C, operating systems, scheduling, system calls, process control, synchronization, and GDB.',
  'Transformer-GAN Image Restoration - PyTorch, transformers, GANs, CelebA, OpenCV, perceptual objectives, and model evaluation.',
];

export const ResumePreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="resume" className="py-24 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="inline-block glass-card px-4 py-2 mb-4">
            <span className="text-sm text-primary font-medium">Resume</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Read-Only <span className="gradient-text">Resume Snapshot</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A recruiter-friendly version of my resume embedded directly in the portfolio for quick reading.
          </p>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass-card mx-auto max-w-6xl p-6 sm:p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-7">
                <div className="mb-3 flex items-center gap-3 text-primary">
                  <ScrollText size={24} />
                  <span className="text-sm font-semibold uppercase tracking-wide">Taran Mamidala</span>
                </div>
                <h3 className="font-display text-3xl font-bold leading-tight">
                  Software, Data, ML, and AI Engineer
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Absolute learner building backend systems, data platforms, ML workflows, and AI products with a practical engineering mindset.
                  Experienced across production software, research data pipelines, geospatial climate modeling, full-stack tools, and cloud-ready architecture.
                </p>
              </div>

              <div className="mb-8 grid gap-3 text-sm text-muted-foreground">
                {contactItems.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    {item.includes('@') ? <Mail size={16} className="text-primary" /> : item.includes('716') ? <Phone size={16} className="text-primary" /> : <MapPin size={16} className="text-primary" />}
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border/40 bg-background/35 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <GraduationCap size={20} className="text-primary" />
                  <h4 className="font-display text-lg font-semibold">Education</h4>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">M.S. Computer Science and Engineering, AI/ML</span>
                    <br />
                    University at Buffalo, SUNY - Aug 2024 to Jan 2026 - GPA 3.8/4.0
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">B.Tech. Computer Science and Engineering</span>
                    <br />
                    Vellore Institute of Technology - Jun 2019 to May 2023
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-7">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <BriefcaseBusiness size={20} className="text-primary" />
                  <h4 className="font-display text-xl font-semibold">Experience</h4>
                </div>
                <div className="space-y-5">
                  {experience.map((item) => (
                    <div key={`${item.company}-${item.role}`} className="border-l border-primary/35 pl-5">
                      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                        <h5 className="font-semibold text-foreground">{item.role}</h5>
                        <span className="text-xs text-primary">{item.period}</span>
                      </div>
                      <p className="mb-3 text-sm font-medium text-primary">{item.company}</p>
                      <ul className="space-y-2">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-border/40 bg-background/35 p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <Code2 size={19} className="text-primary" />
                    <h4 className="font-display text-lg font-semibold">Selected Skills</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="skill-badge text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border/40 bg-background/35 p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <Database size={19} className="text-primary" />
                    <h4 className="font-display text-lg font-semibold">Selected Projects</h4>
                  </div>
                  <ul className="space-y-3">
                    {projects.map((project) => (
                      <li key={project} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <Sparkles size={14} className="mt-1 shrink-0 text-primary" />
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
};
