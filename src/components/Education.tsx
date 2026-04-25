import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, ChevronRight, GraduationCap, MapPin } from 'lucide-react';
import { publicAsset } from '@/lib/assets';

const graduateTerms = [
  {
    term: 'Fall 2024',
    courses: [
      'Algorithms Analysis and Design',
      'Computer Security',
      'Introduction to Machine Learning',
      'Data Intensive Computing',
    ],
  },
  {
    term: 'Spring 2025',
    courses: [
      'Operating Systems',
      'Data Models and Query Languages',
      'Deep Learning',
      'Statistical Data Mining II',
      'Web Analytics for eCommerce',
    ],
  },
  {
    term: 'Fall 2025',
    courses: [
      'Computer Vision and Image Processing',
    ],
  },
];

const undergraduateCourses = [
  'Problem Solving using Java',
  'Data Structures and Algorithms',
  'Object Oriented Programming',
  'Database Management Systems',
  'Artificial Intelligence',
  'Computer Networks',
  'Web Technologies',
  'Computer Organization and Architecture',
  'Software Engineering',
  'Operating Systems',
  'Design and Analysis of Algorithms',
  'Mobile Application Development',
  'Data Analytics',
  'Theory of Computation',
  'Introduction to Machine Learning',
  'Natural Language Processing',
  'Advanced Data Analytics',
  'Foundations for Data Analytics',
  'Business Analytics',
  'Competitive Programming',
  'Introduction to Cryptography',
  'Fundamentals of Blockchain for Engineers',
  'Computer Graphics',
  'Discrete Mathematical Structures',
  'Linear Algebra',
  'Applied Statistics',
  'Software Project Management',
  'Capstone',
  'Internship',
  'Critical Thinking Skills',
  'Fundamentals of Team Building and Leadership',
  'Economics for Engineers',
];

export const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAllUndergrad, setShowAllUndergrad] = useState(false);
  const displayedUndergrad = showAllUndergrad ? undergraduateCourses : undergraduateCourses.slice(0, 16);

  return (
    <section id="education" className="py-24 relative bg-secondary/20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block glass-card px-4 py-2 mb-4">
            <span className="text-sm text-primary font-medium">Education</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Academic <span className="gradient-text">Foundation</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Graduate study in computer science and engineering, supported by a broad undergraduate foundation in software, data, algorithms, and analytics.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="brand-mark h-16 w-16 bg-background/70 p-2" aria-label="University at Buffalo mark">
                <img src={publicAsset('University_at_Buffalo_logo.svg.png')} alt="University at Buffalo logo" className="max-h-full max-w-full object-contain" />
              </div>

              <div className="flex-1">
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  M.S. in Computer Science and Engineering
                </h3>
                <h4 className="text-lg font-semibold text-primary mb-3">
                  University at Buffalo, SUNY
                </h4>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                  <span>Aug 2024 - Dec 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Buffalo, New York</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              GPA: <strong className="text-foreground">3.8/4.0</strong>. Coursework covers algorithms,
              systems, security, databases, ML, deep learning, computer vision, data-intensive computing,
              statistical mining, and web analytics.
            </p>

            <div className="space-y-5">
              {graduateTerms.map((term) => (
                <div key={term.term}>
                  <h5 className="font-semibold mb-3 text-sm uppercase tracking-wide text-foreground flex items-center gap-2">
                    <GraduationCap size={16} className="text-primary" />
                    {term.term}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {term.courses.map((course) => (
                      <span key={course} className="tech-chip">
                        <GraduationCap size={13} />
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="glass-card p-8 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="brand-mark h-16 w-16 bg-background/70 p-2" aria-label="Vellore Institute of Technology mark">
                <img src={publicAsset('VIT%20logo.png')} alt="VIT logo" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  B.Tech. in Computer Science and Engineering
                </h3>
                <h4 className="text-lg font-semibold text-primary mb-3">
                  Vellore Institute of Technology
                </h4>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>2019 - 2023</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>India</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Undergraduate foundation in software engineering, databases, algorithms, analytics, systems,
              and applied computer science.
            </p>

            <div className="flex flex-wrap gap-2">
              {displayedUndergrad.map((course) => (
                <span key={course} className="tech-chip">
                  <GraduationCap size={13} />
                  {course}
                </span>
              ))}
            </div>

            {undergraduateCourses.length > 16 && (
              <button
                onClick={() => setShowAllUndergrad((current) => !current)}
                className="btn-secondary mt-6 inline-flex items-center gap-2"
              >
                {showAllUndergrad ? 'Show Less Coursework' : 'Show More Coursework'}
                <ChevronRight size={18} className={`transition-transform ${showAllUndergrad ? 'rotate-90' : ''}`} />
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
