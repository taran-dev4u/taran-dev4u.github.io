import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { IconType } from 'react-icons';
import {
  SiAngular,
  SiApacheairflow,
  SiApachehadoop,
  SiApachekafka,
  SiApachemaven,
  SiApachespark,
  SiC,
  SiCplusplus,
  SiCss,
  SiDatabricks,
  SiDocker,
  SiDvc,
  SiElasticsearch,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglecloud,
  SiGraphql,
  SiHtml5,
  SiHuggingface,
  SiJavascript,
  SiJenkins,
  SiJest,
  SiJsonwebtokens,
  SiJupyter,
  SiKeras,
  SiKubernetes,
  SiLangchain,
  SiLinux,
  SiMlflow,
  SiMongodb,
  SiMocha,
  SiMysql,
  SiNodedotjs,
  SiNumpy,
  SiOllama,
  SiOpencv,
  SiOpenai,
  SiPandas,
  SiPlotly,
  SiPostgresql,
  SiPrometheus,
  SiPytorch,
  SiPython,
  SiReact,
  SiRedis,
  SiScikitlearn,
  SiScipy,
  SiSelenium,
  SiSnowflake,
  SiSpringboot,
  SiSqlite,
  SiStreamlit,
  SiTailwindcss,
  SiTensorflow,
  SiTerraform,
  SiTypescript,
  SiVite,
} from 'react-icons/si';
import { FaAws, FaJava } from 'react-icons/fa';

type Skill = {
  name: string;
  icon: IconType;
  color: string;
};

const skillsByArea: Array<{ title: string; description: string; skills: Skill[] }> = [
  {
    title: 'Programming & Backend',
    description: 'Languages, APIs, service design, and backend fundamentals.',
    skills: [
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Java', icon: FaJava, color: '#E76F00' },
      { name: 'C', icon: SiC, color: '#A8B9CC' },
      { name: 'C++', icon: SiCplusplus, color: '#00599C' },
      { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'Flask', icon: SiFlask, color: '#000000' },
      { name: 'REST APIs', icon: SiJsonwebtokens, color: '#000000' },
    ],
  },
  {
    title: 'Frontend & Product UI',
    description: 'Interfaces, dashboards, client apps, and product workflows.',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', icon: SiCss, color: '#663399' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Angular', icon: SiAngular, color: '#DD0031' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' },
    ],
  },
  {
    title: 'Data Engineering',
    description: 'Pipelines, warehouses, streaming, and analytics-ready storage.',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'SQLite', icon: SiSqlite, color: '#003B57' },
      { name: 'Kafka', icon: SiApachekafka, color: '#231F20' },
      { name: 'Spark', icon: SiApachespark, color: '#E25A1C' },
      { name: 'Airflow', icon: SiApacheairflow, color: '#017CEE' },
      { name: 'Databricks', icon: SiDatabricks, color: '#FF3621' },
      { name: 'Snowflake', icon: SiSnowflake, color: '#29B5E8' },
      { name: 'Hadoop', icon: SiApachehadoop, color: '#66CCFF' },
    ],
  },
  {
    title: 'Machine Learning',
    description: 'Modeling, evaluation, vision, statistics, and experiment workflows.',
    skills: [
      { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
      { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
      { name: 'Keras', icon: SiKeras, color: '#D00000' },
      { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
      { name: 'Pandas', icon: SiPandas, color: '#150458' },
      { name: 'NumPy', icon: SiNumpy, color: '#013243' },
      { name: 'SciPy', icon: SiScipy, color: '#8CAAE6' },
      { name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8' },
      { name: 'MLflow', icon: SiMlflow, color: '#0194E2' },
      { name: 'DVC', icon: SiDvc, color: '#13ADC7' },
    ],
  },
  {
    title: 'AI Engineering',
    description: 'LLM apps, retrieval, agents, tool use, and evaluation loops.',
    skills: [
      { name: 'OpenAI', icon: SiOpenai, color: '#10A37F' },
      { name: 'Hugging Face', icon: SiHuggingface, color: '#FFD21E' },
      { name: 'LangChain', icon: SiLangchain, color: '#1C3C3C' },
      { name: 'Ollama', icon: SiOllama, color: '#000000' },
      { name: 'Vector Search', icon: SiElasticsearch, color: '#005571' },
      { name: 'Streamlit', icon: SiStreamlit, color: '#FF4B4B' },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
      { name: 'Prometheus', icon: SiPrometheus, color: '#E6522C' },
    ],
  },
  {
    title: 'Cloud, DevOps & Quality',
    description: 'Delivery, automation, testing, monitoring, and production habits.',
    skills: [
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
      { name: 'Terraform', icon: SiTerraform, color: '#844FBA' },
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#181717' },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
      { name: 'Jenkins', icon: SiJenkins, color: '#D24939' },
      { name: 'Linux', icon: SiLinux, color: '#FCC624' },
      { name: 'Maven', icon: SiApachemaven, color: '#C71A36' },
      { name: 'Jest', icon: SiJest, color: '#C21325' },
      { name: 'Mocha', icon: SiMocha, color: '#8D6748' },
      { name: 'Selenium', icon: SiSelenium, color: '#43B02A' },
      { name: 'Jupyter', icon: SiJupyter, color: '#F37626' },
      { name: 'Plotly', icon: SiPlotly, color: '#3F4F75' },
      { name: 'Express', icon: SiExpress, color: '#000000' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Redis', icon: SiRedis, color: '#FF4438' },
    ],
  },
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 relative bg-secondary/20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block glass-card px-4 py-2 mb-4">
            <span className="text-sm text-primary font-medium">Technical Expertise</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Technologies That <span className="gradient-text">Build Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Technologies and tools I work with to build solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillsByArea.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * categoryIndex }}
              className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
            >
              <h3 className="font-display text-xl font-bold mb-3 text-primary">{category.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.25, delay: 0.08 * categoryIndex + 0.02 * skillIndex }}
                    className="tech-logo-chip"
                    title={skill.name}
                  >
                    <skill.icon size={24} style={{ color: skill.color }} />
                    <span>{skill.name}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
