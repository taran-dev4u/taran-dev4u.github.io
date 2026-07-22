import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, ChevronDown, MapPin } from 'lucide-react';
import type { IconType } from 'react-icons';
import { publicAsset } from '@/lib/assets';
import {
  SiDocker,
  SiFlask,
  SiGithubactions,
  SiGit,
  SiJavascript,
  SiJenkins,
  SiMongodb,
  SiMysql,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSpringboot,
  SiStreamlit,
  SiTypescript,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

type Tech = {
  name: string;
  icon: IconType;
  color: string;
};

type ExperienceItem = {
  title: string;
  company: string;
  logo?: string;
  mark?: string;
  tag: string;
  location: string;
  period: string;
  description: string;
  keyWork: string[];
  details: string[];
  technologies: Tech[];
};

const experiences: ExperienceItem[] = [
  {
    title: 'Software / Data Analytics Intern',
    company: 'Rebecca Everlene Trust Company',
    mark: 'RET',
    tag: 'Current',
    location: 'United States / Remote',
    period: 'Mar 2026 - Present',
    description:
      'Contributing software, automation, analytics, and reporting support for a mission-driven nonprofit organization.',
    keyWork: [
      'Support internal tools, data workflows, reporting, validation, and process automation.',
      'Translate program needs into documented and maintainable technical improvements.',
    ],
    details: [
      'Apply Python and related tools to structured data, analysis, reporting, and automation tasks.',
      'Support data analytics, reporting, cleaning, validation, structuring, and visualization workflows.',
      'Document workflows and collaborate asynchronously with a distributed team.',
      'Collaborate in a remote, async environment with careful attention to confidentiality and data handling.',
    ],
    technologies: [
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Pandas', icon: SiPandas, color: '#150458' },
      { name: 'Git', icon: SiGit, color: '#F05032' },
    ],
  },
  {
    title: 'Research Assistant',
    company: 'University at Buffalo',
    logo: 'education/University_at_Buffalo_logo.svg.png',
    tag: 'Research',
    location: 'Buffalo, New York',
    period: 'Jan 2025 - Jan 2026',
    description:
      'Built reproducible computational workflows, data analysis tooling, and ML/statistical experiments for academic research and graduate-level collaboration.',
    keyWork: [
      'Developed Python-based research workflows with clear methods, assumptions, and reproducibility notes.',
      'Created analysis tooling and visual explanations for technical and non-technical research audiences.',
    ],
    details: [
      'Supported ML and statistical modeling experiments with careful data preparation and result interpretation.',
      'Maintained version-controlled code and documentation so workflows could be reviewed, repeated, and extended.',
      'Connected graduate coursework with practical research software, analysis, visualization, and communication habits.',
    ],
    technologies: [
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Pandas', icon: SiPandas, color: '#150458' },
      { name: 'NumPy', icon: SiNumpy, color: '#013243' },
      { name: 'Git', icon: SiGit, color: '#F05032' },
    ],
  },
  {
    title: 'Software Engineer - Web & Data Platforms',
    company: 'iVinGo Solutions Pvt. Ltd.',
    logo: 'companies/ivingo.png.jpg',
    tag: 'Full-time',
    location: 'Hyderabad, India / Remote',
    period: 'Jun 2022 - Jul 2024',
    description:
      'Delivered software, web platform, backend, database, data workflow, reporting, QA, and client-facing implementation work across production use cases.',
    keyWork: [
      'Built web applications, REST API patterns, database-backed features, and reporting workflows for client projects.',
      'Worked across data ingestion, cleaning, validation, SQL reporting, QA, debugging, and delivery documentation.',
    ],
    details: [
      'Supported education, pharma, real estate, travel, e-commerce, and marketing platform work across India, the United States, and the Netherlands.',
      'Built and maintained services using Python, Java, JavaScript, REST APIs, SQL databases, and CMS-style web workflows.',
      'Supported MySQL, Oracle, PostgreSQL, MongoDB, schema updates, query development, indexing, and reporting-oriented performance improvements.',
      'Containerized workflows with Docker and supported repeatable releases through GitHub Actions/Jenkins.',
      'Practiced functional, browser, and regression testing while documenting fixes and delivery decisions.',
    ],
    technologies: [
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Java', icon: FaJava, color: '#E76F00' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
      { name: 'Jenkins', icon: SiJenkins, color: '#D24939' },
    ],
  },
  {
    title: 'Research Intern - Data Science',
    company: 'NRSC, Indian Space Research Organisation (ISRO)',
    logo: 'companies/nrsc.png',
    tag: 'Research',
    location: 'Hyderabad, India',
    period: 'Feb 2023 - Sep 2023',
    description:
      'Delivered research-grade data science work across satellite data processing, geospatial modeling, regression analysis, explainability, and reproducible climate reporting.',
    keyWork: [
      'Processed and validated large satellite datasets for climate and land-use analysis.',
      'Built modeling and reporting workflows that connected data science with remote-sensing research and publication support.',
    ],
    details: [
      'Processed 2M+ satellite records across atmospheric CO2, climate-zone, and land-use/land-cover analysis workflows.',
      'Built feature engineering, regression modeling, validation, temporal aggregation, spatial analysis, and statistical reporting workflows.',
      'Applied SHAP Kernel Explainer to identify drivers behind model outputs.',
      'Created Flask/Streamlit dashboards and PostgreSQL-backed reporting workflows for reproducible analysis.',
      'Contributed to research that later became a 2025 International Journal of Remote Sensing publication.',
    ],
    technologies: [
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Pandas', icon: SiPandas, color: '#150458' },
      { name: 'xarray', icon: SiNumpy, color: '#17A2B8' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'Flask', icon: SiFlask, color: '#000000' },
      { name: 'Streamlit', icon: SiStreamlit, color: '#FF4B4B' },
    ],
  },
  {
    title: 'Java Developer Training - Ignite Program',
    company: 'LTI Mindtree',
    logo: 'companies/LTIMindtree%20-Logo.png',
    tag: 'Internship',
    location: 'Remote / India',
    period: 'IGNITE 2023',
    description:
      'Completed intensive enterprise engineering training across Java, databases, web technologies, version control, TypeScript, Angular, and delivery practices.',
    keyWork: [
      'Practiced backend, frontend, database, and version-control fundamentals in a professional training environment.',
      'Built stronger habits around Agile delivery, reviews, and enterprise-style implementation.',
    ],
    details: [
      'Completed modules in Java, DBMS, MongoDB, Python, collections, exception handling, JDBC, Maven, GitHub, TypeScript, and Angular.',
      'Practiced REST API and microservice patterns with database-backed application development.',
      'Worked in sprint-style delivery habits with Git workflows and review checkpoints.',
    ],
    technologies: [
      { name: 'Java', icon: FaJava, color: '#E76F00' },
      { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    ],
  },
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (company: string) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(company)) {
        next.delete(company);
      } else {
        next.add(company);
      }
      return next;
    });
  };

  return (
    <section id="experience" className="py-24 relative bg-secondary/20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block glass-card px-4 py-2 mb-4">
            <span className="text-sm text-primary font-medium">Experience</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Software engineering, data, research, and technical training experience across industry, nonprofit, university, and government research environments.
          </p>
        </motion.div>

        <div className="experience-timeline max-w-5xl mx-auto">
          {experiences.map((experience, index) => {
            const isOpen = openItems.has(experience.company);

            return (
              <motion.article
                key={experience.company}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.12 * index }}
                className="experience-timeline__item glass-card p-6 sm:p-7"
              >
                <span className="experience-timeline__dot" aria-hidden="true" />
                <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-start">
                  <div className="experience-logo-frame flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-background/70 p-3">
                    {experience.logo ? (
                      <img src={publicAsset(experience.logo)} alt={`${experience.company} logo`} className="h-full w-full object-contain" />
                    ) : (
                      <span className="font-display text-3xl font-bold text-primary">{experience.mark || experience.company.slice(0, 2)}</span>
                    )}
                  </div>

                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {experience.tag}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={15} />
                        <span>{experience.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={15} />
                        <span>{experience.location}</span>
                      </div>
                    </div>

                    <h3 className="font-display text-2xl font-bold">{experience.title}</h3>
                    <h4 className="mt-1 text-lg font-semibold text-primary">{experience.company}</h4>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{experience.description}</p>

                    <div className="mt-5">
                      <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">Key Work</h5>
                      <ul className="grid gap-2 md:grid-cols-2">
                        {experience.keyWork.map((item) => (
                          <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleItem(experience.company)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/60 text-primary transition-colors hover:border-primary/50"
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${experience.company} details`}
                  >
                    <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {isOpen && (
                  <div className="mt-6 grid gap-6 border-t border-border/50 pt-6 lg:grid-cols-[1fr_0.85fr]">
                    <div>
                      <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">More Detail</h5>
                      <ul className="space-y-2">
                        {experience.details.map((detail) => (
                          <li key={detail} className="flex gap-3 text-sm text-muted-foreground">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">Skills Used</h5>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span key={tech.name} className="tech-logo-chip">
                            <tech.icon size={23} style={{ color: tech.color }} />
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
