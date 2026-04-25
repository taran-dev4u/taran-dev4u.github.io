import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, BadgeCheck, Clapperboard, Code2, FlaskConical, GraduationCap, Handshake, Lightbulb, RadioTower, Trophy } from 'lucide-react';

const credibilityItems = [
  {
    label: 'Hackathons',
    title: 'GCC x VIT Hackathon Winner',
    description:
      'Won a ₹25,000 cash prize by building a multi-tenant orchestration platform for GCC. Participated in 7+ hackathons and received recognition in 3 major events.',
    icon: Trophy,
  },
  {
    label: 'Certification',
    title: 'Google Cloud Gen AI',
    description:
      'Certified by Simplilearn with hands-on learning across Generative AI concepts, prompts, LLM workflows, and cloud AI fundamentals.',
    icon: BadgeCheck,
  },
  {
    label: 'Research',
    title: 'Remote Sensing and Climate Data',
    description:
      'Research work connects atmospheric CO2, satellite datasets, land-use behavior, climate zones, regression modeling, and explainable analysis.',
    icon: RadioTower,
  },
  {
    label: 'Leadership',
    title: 'Student Club Leadership',
    description:
      'Worked across student clubs and community initiatives, coordinating events, supporting technical teams, and helping students collaborate around creative and technical work.',
    icon: Handshake,
  },
];

const leadershipItems = [
  {
    title: 'Bioscope Club',
    role: 'Technical Lead, VIT-AP',
    description:
      'Worked with the website development crew for a movie-making and screening club that organized film festivals, university projects, and creative events.',
    icon: Clapperboard,
  },
  {
    title: 'Be A Nerd Club',
    role: 'Technical Team Member',
    description:
      'Participated in events focused on curiosity, practical learning, and hands-on discussion beyond the classroom.',
    icon: Lightbulb,
  },
  {
    title: 'Q-hub Club',
    role: 'Technical Team Member',
    description:
      'Supported a knowledge-focused student community and contributed to website work and technical initiatives.',
    icon: Code2,
  },
  {
    title: 'Academic & Industrial Nano Society',
    role: 'Team Member',
    description:
      'Participated in technical tasks, student events, and interdisciplinary science learning activities.',
    icon: FlaskConical,
  },
  {
    title: 'Academic Leadership',
    role: 'TA, Class Representative, Student Vice-Representative',
    description:
      'Built communication, mentoring, coordination, and leadership habits through academic support responsibilities.',
    icon: GraduationCap,
  },
];

export const Credibility = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="credibility" className="py-24 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block glass-card px-4 py-2 mb-4">
            <span className="text-sm text-primary font-medium">Credibility & Awards</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Work Beyond <span className="gradient-text">Coursework</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hackathons, research, certifications, and leadership experiences that shaped how I collaborate and deliver.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
          {credibilityItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="glass-card p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="rounded-2xl border border-primary/25 bg-primary/10 p-3 text-primary">
                  <item.icon size={22} />
                </div>
                <span className="text-xs uppercase tracking-[0.18em] text-primary">{item.label}</span>
              </div>
              <h3 className="font-display text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="glass-card p-8"
        >
          <div className="mb-8 flex items-center gap-3">
            <Award size={26} className="text-primary" />
            <h3 className="font-display text-2xl font-bold">Leadership & Community</h3>
          </div>
          <div className="grid gap-6 lg:grid-cols-5">
            {leadershipItems.map((item) => (
              <div key={item.title} className="relative border-l border-border/50 pl-5 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-6">
                <div className="absolute -left-2 top-1.5 h-4 w-4 rounded-full border-2 border-background bg-primary lg:-top-2 lg:left-0" />
                <div className="mb-4 flex items-center gap-3">
                  <item.icon size={22} className="text-primary" />
                  <h4 className="font-display font-semibold">{item.title}</h4>
                </div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-primary">{item.role}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
