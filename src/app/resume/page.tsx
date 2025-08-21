'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { skillsLinks } from '@/data/links';

// Resume experience data
const experienceData = [
  {
    id: 'dsmssd',
    title: 'Founder & Creative Director',
    company: 'DSMSSD STUDIO',
    period: '2020 - Present',
    description: 'Founded a multidisciplinary creative studio specializing in design, production, and development. Lead all creative direction, client projects, and development work, delivering innovative solutions across digital and physical mediums.',
    skills: ['Creative Direction', 'Web Development', 'Brand Strategy', 'UI/UX Design'],
  },
  {
    id: 'creative',
    title: 'Creative Technologist',
    company: 'Independent Consultant',
    period: '2018 - 2020',
    description: 'Collaborated with agencies and startups to deliver technology-driven creative solutions. Specialized in bridging the gap between design and development, creating interactive experiences that merge aesthetic vision with technical implementation.',
    skills: ['Frontend Development', 'Interactive Design', 'Creative Coding', 'Digital Installations'],
  },
  {
    id: 'systems',
    title: 'Systems Specialist',
    company: 'Enterprise Solutions Inc.',
    period: '2016 - 2018',
    description: 'Managed and optimized enterprise systems and workflows. Designed and implemented automation solutions to streamline operations, resulting in 30% increased efficiency across departments.',
    skills: ['Systems Design', 'Process Automation', 'Data Management', 'Technical Documentation'],
  },
  {
    id: 'education',
    title: 'BFA in Design & Technology',
    company: 'Design Institute of Technology',
    period: '2012 - 2016',
    description: 'Graduated with honors, specializing in digital media and interactive design. Developed a thesis project exploring the intersection of Y2K aesthetics and modern web technologies.',
    skills: ['Design Theory', 'Interactive Media', 'Creative Technology', 'User Experience'],
  },
];

// Project data
const projectHighlights = [
  {
    id: 'web-redesign',
    title: 'University Facilities Rental Website Redesign',
    description: 'Full redesign of a university rental platform tailored for international clients and film industry professionals ahead of LA28.',
    image: '/images/portfolio/facilities-redesign.jpg',
  },
  {
    id: 'systems-design',
    title: 'Health & Safety Communication Dashboard',
    description: 'Design and deployment of a real-time digital dashboard to improve transparency during asbestos remediation efforts.',
    image: '/images/portfolio/king-hall-health.jpg',
  },
  {
    id: 'marketing-communications',
    title: '“We Are LA” Olympic Initiative',
    description: 'Branded communication campaign to position Cal State LA as a host site for Olympic delegations and international partners.',
    image: '/images/portfolio/we-are-la-olympics-28.jpg',
  },
];

// Certifications
const certifications = [
  { id: 'cert1', name: 'Advanced React Development', issuer: 'Frontend Masters', year: '2022' },
  { id: 'cert2', name: 'UX Design Professional', issuer: 'Design Institute', year: '2021' },
  { id: 'cert3', name: 'Digital Marketing Specialist', issuer: 'Marketing Academy', year: '2020' },
  { id: 'cert4', name: 'Creative Coding with WebGL', issuer: 'Creative Tech Institute', year: '2019' },
];

export default function Resume() {
  const [activeTab, setActiveTab] = useState('experience');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
              Resume & Skills
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
              Multidisciplinary creative specializing in design, development, and digital experiences with a focus on Y2K-inspired aesthetics.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Tabs Navigation */}
      <section className="py-6 border-b border-gray-200 dark:border-gray-800 sticky top-16 bg-white dark:bg-gray-900 z-10">
        <div className="responsive-container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar space-x-6 justify-center">
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-4 py-2 text-sm md:text-base font-bold transition-colors whitespace-nowrap ${
                activeTab === 'experience'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent'
              }`}
            >
              Experience & Education
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2 text-sm md:text-base font-bold transition-colors whitespace-nowrap ${
                activeTab === 'skills'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent'
              }`}
            >
              Skills & Expertise
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 text-sm md:text-base font-bold transition-colors whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent'
              }`}
            >
              Project Highlights
            </button>
          </div>
        </div>
      </section>
      
      {/* Content Sections */}
      <section className="py-12 md:py-16">
        <div className="responsive-container mx-auto px-4">
          {/* Experience & Education */}
          {activeTab === 'experience' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">
                  Experience & Education
                </h2>
                <div className="space-y-8">
                  {experienceData.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex flex-col md:flex-row gap-4 md:gap-8"
                    >
                      <div className="md:w-1/3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-accent font-medium">{item.company}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.period}</p>
                      </div>
                      <div className="md:w-2/3">
                        <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.skills.map(skill => (
                            <span 
                              key={skill} 
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">
                  Certifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700"
                    >
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{cert.name}</h3>
                      <p className="text-accent text-sm">{cert.issuer}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cert.year}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Skills & Expertise */}
          {activeTab === 'skills' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">
                Skills & Expertise
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillsLinks.map((skillSection, index) => (
                  <motion.div
                    key={skillSection.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/30"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {skillSection.title}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {(skillSection.description || '').split(', ').map((skill, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                          <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Technical Proficiency
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { name: 'React/Next.js', level: 95 },
                    { name: 'TypeScript', level: 90 },
                    { name: 'UI/UX Design', level: 95 },
                    { name: 'Tailwind CSS', level: 95 },
                    { name: 'Three.js', level: 85 },
                    { name: 'Framer Motion', level: 90 },
                    { name: 'Brand Strategy', level: 85 },
                    { name: 'Content Creation', level: 90 },
                    { name: 'Systems Design', level: 80 },
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                          className="h-full bg-accent rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Project Highlights */}
          {activeTab === 'projects' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">
                  Project Highlights
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {projectHighlights.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                    >
                      <div className="h-60 relative overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {project.description}
                        </p>
                        <Link
                          href={`/project-highlights/${project.id}`}
                          className="inline-flex items-center text-accent font-medium hover:text-accent-dark transition-colors"
                        >
                          View Details
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <Link
                  href="/portfolio"
                  className="inline-block px-8 py-3 rounded-full bg-accent text-white font-bold hover:bg-accent-dark transition-colors"
                >
                  View Full Portfolio
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800/30">
        <div className="responsive-container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Let's Work Together
            </h2>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8">
              Interested in collaborating on a project? Whether you need design, development, or creative direction, 
              I'm ready to bring your vision to life.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 rounded-full bg-accent text-white font-bold hover:bg-accent-dark transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 