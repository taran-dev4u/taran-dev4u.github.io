import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Bot, Cloud, DatabaseZap, Workflow } from 'lucide-react';

const topics = [
  {
    title: 'RAG and Vector Knowledge Systems',
    description: 'Hybrid retrieval, reranking, citations, vector databases, and grounded answers for practical AI products.',
    icon: DatabaseZap,
  },
  {
    title: 'AI Agents and Tool Use',
    description: 'Planning, tool calling, memory, validation loops, MCP-style workflows, and human review boundaries.',
    icon: Bot,
  },
  {
    title: 'LLMOps, Evaluation, and AI Security',
    description: 'Prompt/version control, evaluation harnesses, observability, regression tests, cost, latency, privacy, and prompt-injection awareness.',
    icon: Workflow,
  },
];

export const Growth = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="growth" className="py-24 relative bg-secondary/20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block glass-card px-4 py-2 mb-4">
            <span className="text-sm text-primary font-medium">Growth</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Currently <span className="gradient-text">Exploring</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Deep diving into practical AI engineering topics that matter for building reliable products.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card floating-box p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="rounded-2xl border border-primary/25 bg-primary/10 p-3 text-primary">
                  <topic.icon size={22} />
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Exploring
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold mb-3">{topic.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{topic.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="glass-card mt-10 p-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold mb-2">Continuous Learning</h3>
              <p className="max-w-3xl text-muted-foreground leading-relaxed">
                I'm constantly exploring new technologies and platforms to stay current with industry trends
                and expand my technical capabilities across different domains.
              </p>
            </div>
            <div className="brand-mark">
              <Cloud size={22} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
