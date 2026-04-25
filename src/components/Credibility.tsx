import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Award,
  BadgeCheck,
  Clapperboard,
  Code2,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Handshake,
  Lightbulb,
  RadioTower,
  Trophy,
} from 'lucide-react';

const credibilityItems = [
  {
    label: 'Hackathons',
    title: 'GCC x VIT Hackathon Winner',
    description:
      'Won a Rs. 25,000 cash prize by building a multi-tenant orchestration platform for GCC. Participated in 7+ hackathons and received recognition in 3 major events.',
    details: [
      'Built around orchestration, tenant separation, platform workflows, and practical product thinking.',
      'Gained experience presenting technical tradeoffs under time pressure.',
      'Strengthened teamwork, rapid prototyping, and judging-room communication.',
    ],
    icon: Trophy,
    linkLabel: 'View event reference',
    href: '#contact',
  },
  {
    label: 'Certification',
    title: 'Google Cloud Gen AI',
    description:
      'Certified by Simplilearn with hands-on learning across Generative AI concepts, prompts, LLM workflows, and cloud AI fundamentals.',
    details: [
      'Practiced prompt design, generative AI foundations, and applied cloud AI workflows.',
      'Connected certification learning with RAG, model evaluation, and AI product architecture.',
      'Used the learning path to sharpen vocabulary around responsible AI delivery.',
    ],
    icon: BadgeCheck,
    linkLabel: 'View certificate',
    href: '#contact',
  },
  {
    label: 'Research',
    title: 'Remote Sensing and Climate Data',
    description:
      'Research work connects atmospheric CO2, satellite datasets, land-use behavior, climate zones, regression modeling, and explainable analysis.',
    details: [
      'Worked with atmospheric CO2 datasets, LULC features, climate-zone context, and geospatial analysis.',
      'Used regression modeling and explainability to make climate-data patterns easier to interpret.',
      'Built a stronger habit of translating technical findings into review-ready research narratives.',
    ],
    icon: RadioTower,
    linkLabel: 'View research notes',
    href: '#contact',
  },
  {
    label: 'Leadership',
    title: 'Student Club Leadership',
    description:
      'Worked across student clubs and community initiatives, coordinating events, supporting technical teams, and helping students collaborate around creative and technical work.',
    details: [
      'Coordinated with students, faculty, and technical teams across planning, communication, and delivery.',
      'Supported club websites, event preparation, logistics, and cross-team execution.',
      'Built leadership habits around ownership, follow-through, and helping people move together.',
    ],
    icon: Handshake,
    linkLabel: 'View leadership notes',
    href: '#contact',
  },
];

const leadershipItems = [
  {
    title: 'Bioscope Club',
    role: 'Technical Lead, VIT-AP',
    description:
      'Supported the technical side of a movie-making and screening club that organized film festivals, student productions, and creative events. My work focused on website support, coordination with the creative team, and making event information easier for students to access.',
    details: [
      'Helped the club present events, screenings, and student work through web and technical support.',
      'Collaborated with creative teams where communication mattered as much as implementation.',
      'Built confidence working across design, content, logistics, and engineering responsibilities.',
    ],
    icon: Clapperboard,
    href: '#contact',
  },
  {
    title: 'Be A Nerd Club',
    role: 'Technical Team Member',
    description:
      'Contributed to a curiosity-driven student community focused on practical learning, technical discussions, and hands-on exploration outside regular coursework.',
    details: [
      'Participated in technical planning and student-focused learning activities.',
      'Helped create an environment where students could ask questions and learn by building.',
      'Practiced explaining technical ideas clearly to peers with different levels of experience.',
    ],
    icon: Lightbulb,
    href: '#contact',
  },
  {
    title: 'Q-hub Club',
    role: 'Technical Team Member',
    description:
      'Worked with a knowledge-sharing student community and supported technical initiatives, website work, and collaborative activities connected to learning and problem solving.',
    details: [
      'Supported web-facing club work and technical coordination.',
      'Collaborated with peers on student events and community initiatives.',
      'Built stronger teamwork habits around planning, follow-up, and shared ownership.',
    ],
    icon: Code2,
    href: '#contact',
  },
  {
    title: 'Academic & Industrial Nano Society',
    role: 'Team Member',
    description:
      'Participated in an interdisciplinary student society that connected engineering, science, and industry-style learning through technical events and student activities.',
    details: [
      'Engaged with interdisciplinary technical topics beyond core computer science.',
      'Supported event participation, peer learning, and student collaboration.',
      'Developed comfort working with mixed technical audiences and broader engineering themes.',
    ],
    icon: FlaskConical,
    href: '#contact',
  },
  {
    title: 'Academic Leadership',
    role: 'TA, Class Representative, Student Vice-Representative',
    description:
      'Took on academic support and representation responsibilities that required communication, mentoring, issue tracking, and coordination between students and faculty.',
    details: [
      'Helped peers navigate coursework, expectations, and classroom communication.',
      'Represented student concerns and supported smoother coordination with faculty.',
      'Practiced accountable leadership through follow-ups, organization, and clear communication.',
    ],
    icon: GraduationCap,
    href: '#contact',
  },
];

export const Credibility = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="credibility" className="py-24 relative" ref={ref}>
      <div className="w-full px-4 sm:px-8 lg:px-12">
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
            Hackathons, certification work, research, and leadership experiences that shaped how I collaborate and deliver.
          </p>
        </motion.div>

        <div className="space-y-5">
          {credibilityItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className="glass-card p-6 sm:p-8"
            >
              <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-start">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                  <item.icon size={28} />
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{item.label}</p>
                  <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p>
                  <ul className="mt-5 grid gap-2 md:grid-cols-3">
                    {item.details.map((detail) => (
                      <li key={detail} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Replace href with the real public certificate, hackathon, research, or leadership proof link when available. */}
                <a href={item.href} className="btn-secondary whitespace-nowrap text-sm">
                  {item.linkLabel}
                  <ExternalLink size={15} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-14"
        >
          <div className="mb-8 flex items-center gap-3">
            <Award size={26} className="text-primary" />
            <h3 className="font-display text-3xl font-bold">Leadership & Community</h3>
          </div>

          <div className="space-y-5">
            {leadershipItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + index * 0.06 }}
                className="glass-card p-6 sm:p-8"
              >
                <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-semibold">{item.title}</h4>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-primary">{item.role}</p>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{item.description}</p>
                    <ul className="mt-5 grid gap-2 md:grid-cols-3">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Replace href with a real club page, event album, Google Drive proof, or LinkedIn post when available. */}
                  <a href={item.href} className="btn-secondary whitespace-nowrap text-sm">
                    Club reference
                    <ExternalLink size={15} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
