import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Code2, Database, Handshake, Network, ShieldCheck } from 'lucide-react';

const strengths = [
  {
    icon: Code2,
    title: 'Software Foundations',
    description: 'Programming logic, data structures, algorithms, computer networks, testing, and clean implementation habits.',
  },
  {
    icon: Database,
    title: 'Data & Systems Thinking',
    description: 'Relational and non-relational databases, distributed systems, service integration, and data engineering principles.',
  },
  {
    icon: Brain,
    title: 'ML & AI Delivery',
    description: 'Machine learning pipelines, deep learning, computer vision, explainability, and practical model evaluation.',
  },
  {
    icon: Network,
    title: 'Architecture Mindset',
    description: 'APIs, backend services, DevOps practices, version control, automated testing, and scalable product structure.',
  },
  {
    icon: Handshake,
    title: 'Collaboration',
    description: 'Proactivity, organization, communication, leadership, and comfort working across teams and technical domains.',
  },
  {
    icon: ShieldCheck,
    title: 'Ownership',
    description: 'A steady focus on reliability, documentation, reproducibility, and work that can be explained clearly in interviews.',
  },
];

const stats = [
  { value: '12+', label: 'Projects Deployed' },
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Models Trained' },
  { value: '∞', label: 'Papers Read' },
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
            Building Across <span className="gradient-text">Software, Data, and AI</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I have extensive expertise in software development, with a solid background in programming logic,
            data structures, algorithms, and computer networks. I learn complex technologies quickly, including
            distributed systems, service integration, relational and non-relational databases, data engineering,
            and software architecture.
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
                I like work that has a clear path from problem definition to something people can actually use:
                clean APIs, reliable data, readable dashboards, measured models, and deployment habits that make
                the next iteration easier.
              </p>
              <p>
                My strongest work sits at the intersection of backend systems, data pipelines, machine learning,
                and product-facing interfaces. I care about clarity, reproducibility, and explaining technical
                tradeoffs without hiding behind jargon.
              </p>
              <p>
                I have also built leadership habits through teaching support, class representation, club work,
                hackathons, and research collaboration. That experience helps me communicate early, organize work
                well, and stay steady when a project becomes messy.
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
