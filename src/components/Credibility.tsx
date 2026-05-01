import { motion, useInView } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
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
import { publicAsset } from '@/lib/assets';

type CredentialItem = {
  category: string;
  title: string;
  issuer_or_event: string;
  date: string;
  description: string;
  image?: string;
  link?: string;
  tags: string[];
  priority: number;
};

const fallbackCredentialItems: CredentialItem[] = [
  {
    category: 'Hackathons',
    title: 'GCC x VIT Hackathon Winner',
    issuer_or_event: 'GCC x VIT',
    date: '',
    description:
      'Won a Rs. 25,000 cash prize by building a multi-tenant orchestration platform for GCC. Participated in 7+ hackathons and received recognition in 3 major events.',
    image: '',
    link: '#contact',
    tags: ['Hackathon', 'Platform'],
    priority: 1,
  },
  {
    category: 'Certification',
    title: 'Google Cloud Gen AI',
    issuer_or_event: 'Simplilearn',
    date: '',
    description:
      'Certified by Simplilearn with hands-on learning across Generative AI concepts, prompts, LLM workflows, and cloud AI fundamentals.',
    image: '',
    link: '#contact',
    tags: ['Certification', 'Gen AI'],
    priority: 2,
  },
  {
    category: 'Research',
    title: 'Remote Sensing and Climate Data',
    issuer_or_event: 'NRSC / ISRO research work',
    date: '',
    description:
      'Research work connects atmospheric CO2, satellite datasets, land-use behavior, climate zones, regression modeling, and explainable analysis.',
    image: '',
    link: '#contact',
    tags: ['Research', 'Climate Data'],
    priority: 3,
  },
];

const credentialIcons = {
  Hackathons: Trophy,
  Certification: BadgeCheck,
  Certifications: BadgeCheck,
  Research: RadioTower,
};

const leadershipItems = [
  {
    title: 'Bioscope Club',
    role: 'Technical Lead, VIT-AP',
    logo: 'vit_ap_bioscope_club_logo.jpg',
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
    logo: '',
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
    logo: 'vit_qhub_club.jpg',
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
    logo: '',
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
    logo: '',
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

const splitCsvLine = (line: string) => {
  const values: string[] = [];
  let current = '';
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"' && nextChar === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
};

const parseCredentialsCsv = (csv: string): CredentialItem[] => {
  const lines = csv.split(/\r?\n/).filter((line) => line.trim());
  const headers = splitCsvLine(lines[0] || '');
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    const row = Object.fromEntries(headers.map((header, index) => [header, values[index] || '']));

    return {
      category: row.category || 'Certification',
      title: row.title || 'Untitled credential',
      issuer_or_event: row.issuer_or_event || '',
      date: row.date || '',
      description: row.description || '',
      image: row.image || '',
      link: row.link || '#contact',
      tags: (row.tags || '').split('|').map((tag) => tag.trim()).filter(Boolean),
      priority: Number(row.priority || 999),
    };
  }).filter((item) => item.title && item.description);
};

const CredentialImage = ({ item }: { item: CredentialItem }) => {
  const Icon = credentialIcons[item.category as keyof typeof credentialIcons] || Award;

  if (item.image) {
    return (
      <div className="credential-image-frame">
        <img src={publicAsset(item.image)} alt={`${item.title} visual`} className="h-full w-full object-contain" />
      </div>
    );
  }

  return (
    <div className="credential-image-frame credential-image-frame--fallback">
      <Icon size={42} />
      <span>{item.category}</span>
      <small>{item.issuer_or_event || item.title}</small>
    </div>
  );
};

export const Credibility = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [credentials, setCredentials] = useState<CredentialItem[]>(fallbackCredentialItems);

  useEffect(() => {
    let cancelled = false;

    fetch(publicAsset('data/credentials.csv'))
      .then((response) => response.ok ? response.text() : Promise.reject())
      .then((csv) => {
        if (cancelled) return;
        const parsed = parseCredentialsCsv(csv);
        setCredentials(parsed.length ? parsed.sort((a, b) => a.priority - b.priority) : fallbackCredentialItems);
      })
      .catch(() => {
        if (!cancelled) setCredentials(fallbackCredentialItems);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const sortedCredentials = useMemo(
    () => [...credentials].sort((a, b) => a.priority - b.priority),
    [credentials],
  );

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
            Hackathons, certification work, research, and leadership experiences that shaped how I collaborate and deliver.
          </p>
        </motion.div>

        <div className="space-y-5">
          {sortedCredentials.map((item, index) => {
            const Icon = credentialIcons[item.category as keyof typeof credentialIcons] || Award;

            return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className="glass-card credential-card p-6 sm:p-8"
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-stretch">
                <div>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                      <Icon size={28} />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{item.category}</p>
                      <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary/80">{item.issuer_or_event}</p>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={`${item.title}-${tag}`} className="skill-badge text-xs">{tag}</span>
                    ))}
                  </div>
                  <a href={item.link || '#contact'} className="btn-secondary mt-6 w-fit whitespace-nowrap text-sm">
                    {item.category === 'Research' ? 'View research' : item.category.includes('Hackathon') ? 'View event' : 'View certificate'}
                    <ExternalLink size={15} />
                  </a>
                </div>
                <CredentialImage item={item} />
              </div>
            </motion.article>
            );
          })}
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
                <div className="grid gap-5 lg:grid-cols-[auto_1fr] lg:items-start">
                  <div className="club-logo-frame">
                    {item.logo ? (
                      <img src={publicAsset(item.logo)} alt={`${item.title} logo`} className="h-full w-full object-contain" />
                    ) : (
                      <item.icon size={30} />
                    )}
                  </div>
                  <div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <h4 className="font-display text-2xl font-semibold">{item.title}</h4>
                      {/* Replace href with a real club page, event album, Google Drive proof, or LinkedIn post when available. */}
                      <a href={item.href} className="btn-secondary w-fit whitespace-nowrap text-sm">
                        Club reference
                        <ExternalLink size={15} />
                      </a>
                    </div>
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
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
