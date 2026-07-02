import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Code2, Database, Handshake, Network, ShieldCheck } from 'lucide-react';

const strengths = [
  {
    icon: Code2,
    title: 'Software Delivery',
    description: 'Backend APIs, full-stack tools, database-backed features, testing, documentation, and clean implementation habits.',
  },
  {
    icon: Database,
    title: 'Data & Systems Thinking',
    description: 'ETL, validation, SQL, schema design, distributed processing, service integration, and reproducible data workflows.',
  },
  {
    icon: Brain,
    title: 'Research-Grade ML',
    description: 'Machine learning pipelines, remote-sensing analysis, deep learning, computer vision, explainability, and practical evaluation.',
  },
  {
    icon: Network,
    title: 'Architecture Mindset',
    description: 'APIs, backend services, DevOps practices, version control, automated testing, and scalable product structure.',
  },
  {
    icon: Handshake,
    title: 'Collaboration',
    description: 'Remote teamwork, research discussions, stakeholder translation, teaching support, leadership, and cross-domain communication.',
  },
  {
    icon: ShieldCheck,
    title: 'Ownership',
    description: 'A steady focus on reliability, data quality, reproducibility, confidentiality, and work that can be explained clearly in interviews.',
  },
];

const stats = [
  { value: '25mo', label: 'Software Role' },
  { value: '3+', label: 'Years Experience' },
  { value: '2M+', label: 'Research Records' },
  { value: '1', label: 'Peer-Reviewed Paper' },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block glass-card px-4 py-2 mb-4">
            <span className="text-sm text-primary font-medium">About Me</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Building With <span className="gradient-text">Curiosity, Evidence, and Useful Systems</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I like learning that turns into working systems. My path moves through professional software engineering,
            research data pipelines, graduate AI/ML study, and public projects where the goal is not just to try a tool,
            but to understand the problem well enough to build something useful.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8"
          >
            <h3 className="font-display text-2xl font-bold mb-6 text-primary">How I Work</h3>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I call myself an Absolute learner because I care about the full loop: ask better questions, learn the domain,
                build the first version, validate it, explain it clearly, and keep improving until the work is useful.
              </p>
              <p>
                My strongest work sits at the intersection of backend systems, data pipelines, machine learning,
                research workflows, and product-facing interfaces. I care about clarity, reproducibility, and explaining
                technical tradeoffs without hiding behind jargon.
              </p>
              <p>
                That mindset shows up in production web/data work, current software engineering, UB research collaboration,
                and NRSC/ISRO climate-data research that grew into a peer-reviewed publication. I bring curiosity, but I also
                bring the discipline to turn curiosity into shipped, documented, interview-ready work.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border/50">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/40 bg-background/35 p-4 text-center">
                  <div className="font-display text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {strengths.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index + 0.35 }}
                className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h4 className="font-display font-semibold text-lg mb-3">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
