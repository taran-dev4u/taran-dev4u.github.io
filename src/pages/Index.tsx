import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { Preloader } from '@/components/Preloader';
import { Growth } from '@/components/Growth';
import { Credibility } from '@/components/Credibility';
import { Writing } from '@/components/Writing';
import { useEffect, useState } from 'react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Taran Mamidala | Machine Learning & Software Engineer';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content',
        'Portfolio of Taran Mamidala - Machine Learning Engineer and Software Engineer based in Buffalo, New York. Focused on ML pipelines, data engineering, backend APIs, cloud deployment, and geospatial research.'
      );
    }

    const minimumLoad = window.setTimeout(() => setIsLoading(false), 1250);
    const finishLoad = () => {
      window.setTimeout(() => setIsLoading(false), 450);
    };

    if (document.readyState === 'complete') {
      finishLoad();
    } else {
      window.addEventListener('load', finishLoad, { once: true });
    }

    return () => {
      window.clearTimeout(minimumLoad);
      window.removeEventListener('load', finishLoad);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <InteractiveBackground />
      {isLoading && <Preloader />}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Growth />
          <Credibility />
          <Writing />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
