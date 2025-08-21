'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Project data (this should be moved to a separate data file in a real application)
const projectDetails = {
  'web-redesign': {
    title: 'University Facilities Rental Website Redesign',
    description: 'Full redesign of a university rental platform tailored for international clients and film industry professionals ahead of LA28.',
    fullDescription: 'A complete redesign of California State University, Los Angeles’ Facilities Rental website, focused on modernizing the user experience and positioning the university as a premier venue partner for global events and productions. The site was rebuilt to support Olympic-related traffic, ADA accessibility, and facility rental for both local and international clients, including film studios.',
    challenge: 'The previous website lacked structure, visual appeal, and functionality. It failed to communicate the scale, accessibility, or rental potential of campus spaces—especially for large-scale international events like LA28.',
    solution: 'Designed and developed a clean, responsive, and bilingual-ready site using Next.js and Tailwind CSS. Prioritized an intuitive booking experience, implemented accessible design standards, and highlighted key facilities with photography, video, and mapped navigation. The site was optimized to support global scouting, commercial rentals, and Olympic delegation inquiries.',
    results: 'Following the redesign, the university saw a $700,000 increase in facilities rental revenue. The site now serves as a critical touchpoint for production companies, event planners, and Olympic organizers scouting locations ahead of LA28.',
    image: '/images/portfolio/facilities-redesign.jpg',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    year: '2025'
  },
  'systems-design': {
    title: 'Health & Safety Communication Dashboard',
    description: 'Design and deployment of a real-time digital dashboard to improve transparency during asbestos remediation efforts.',
    fullDescription: 'In collaboration with the university’s Facilities and Environmental Health & Safety departments, we developed a centralized communication platform for King Hall—a major academic building undergoing asbestos abatement. The dashboard served as a real-time message board and data system to provide updates, ensure accountability, and ease community concerns.',
    challenge: 'The university needed to communicate complex and sensitive health updates to students, faculty, and parents. Existing systems were fragmented and lacked transparency, creating confusion and fear surrounding the remediation process.',
    solution: 'We designed and implemented a digital dashboard with integrated workflows using PowerAutomate, AdobeSign, Excel, and Power BI. Facilities workers were given a webform to submit before-and-after photos of identified “hot zones.” Data was routed in real time, compiled visually, and pushed to a public-facing message board to track updates, actions taken, and campus safety levels.',
    results: 'The initiative became one of the university’s most effective communication campaigns, praised for transparency, reliability, and accessibility. It significantly reduced campus anxiety around the cleanup effort and is now used as a benchmark for other facility remediation projects.',
    image: '/images/portfolio/king-hall-health.jpg',
    technologies: ['PowerAutomate', 'AdobeSign', 'Microsoft Excel', 'Power BI', 'SharePoint'],
    year: '2024',
  },
  'marketing-communications': {
    title: '“We Are LA” Olympic Initiative',
    description: 'Branded communication campaign to position Cal State LA as a host site for Olympic delegations and international partners.',
    fullDescription: 'As part of the university’s Olympic readiness efforts, we launched the “We Are LA” campaign to welcome and attract international delegations to license Cal State LA facilities during the 2028 Olympic Games. The initiative included the development of multilingual brochures, branded swag, a custom video card, and premium welcome boxes tailored to specific countries—all produced in-house.',
    challenge: 'Cal State LA needed a cohesive and compelling campaign to engage Olympic decision-makers and international athletic organizations before larger universities entered the conversation. The messaging had to feel both welcoming and logistically credible.',
    solution: 'We designed and packaged a high-touch experience using country-specific welcome kits. Each box included a custom brochure featuring university housing and athletic facilities, branded promotional items, and a personalized video card. Every asset emphasized Cal State LA’s accessibility, prime location, and campus readiness for hosting international teams.',
    results: 'The campaign successfully positioned Cal State LA as one of the first universities in LA to proactively engage international Olympic delegations. Interest in facility licensing has since spiked, with growing outreach and site visit requests from multiple nations ahead of LA28.',
    image: '/images/portfolio/we-are-la-olympics-28.jpg',
    technologies: ['InDesign', 'Premiere Pro', 'Illustrator', 'Adobe Sign', 'Packaging Design'],
    year: '2025',
  }
};

export default function ProjectHighlight() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projectDetails[projectId as keyof typeof projectDetails];

  if (!project) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="responsive-container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The project you're looking for doesn't exist.</p>
          <Link
            href="/resume"
            className="inline-block px-8 py-3 rounded-full bg-accent text-white font-bold hover:bg-accent-dark transition-colors"
          >
            Back to Resume
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-10 md:pb-16 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/20">
        <div className="responsive-container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-12 md:py-16">
        <div className="responsive-container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
                  Project Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {project.fullDescription}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
                  The Challenge
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {project.challenge}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
                  Our Solution
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {project.solution}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
                  Results
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {project.results}
                </p>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="h-64 relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Year</p>
                    <p className="text-gray-900 dark:text-white">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Technologies</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center"
              >
                <Link
                  href="/resume"
                  className="inline-block px-8 py-3 rounded-full bg-accent text-white font-bold hover:bg-accent-dark transition-colors"
                >
                  Back to Resume
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 