'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Team members data
const teamMembers = [
  {
    id: 1,
    name: 'Isaiah Cotton',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop',
    bio: 'Isaiah leads our creative vision with over 10 years of experience in design and art direction across multiple industries.',
  },
  {
    id: 2,
    name: 'Sam Rivera',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2522&auto=format&fit=crop',
    bio: 'Sam specializes in front-end development and interactive experiences, bringing technical expertise to our digital projects.',
  },
  {
    id: 3,
    name: 'Jordan Lee',
    role: 'Production Manager',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop',
    bio: 'Jordan oversees all production processes, ensuring projects are delivered on time and to the highest standards.',
  },
  {
    id: 4,
    name: 'Taylor Kim',
    role: 'Fashion Designer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop',
    bio: 'Taylor brings a unique perspective to our fashion projects with experience from top design houses in Paris and New York.',
  },
];

export default function About() {
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    // Set window width for responsive adjustments
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-primary-900 py-16 sm:py-20 md:py-24 dark:bg-studio-dark">
        <div className="responsive-container mx-auto px-4 text-center">
          <motion.h1 
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl 4xl:text-8xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Us
          </motion.h1>
          <motion.p 
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg 3xl:text-xl 4xl:text-2xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A multidisciplinary creative studio focused on design, production, and development.
          </motion.p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-10 sm:py-16 md:py-20">
        <div className="responsive-container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl sm:text-3xl 3xl:text-4xl font-bold text-gray-900 dark:text-white">Our Story</h2>
              <div className="mt-4 space-y-4 text-gray-600 dark:text-gray-300 text-base sm:text-lg 3xl:text-xl">
                <p>
                  Founded in 2018, DSMSSD STUDIO began as a small design collective with a passion for creating bold, innovative work that pushes boundaries.
                </p>
                <p>
                  Over the years, we've evolved into a full-service studio, bringing together experts across design, production, development, and fashion to deliver comprehensive creative solutions for our clients.
                </p>
                <p>
                  Today, we work with brands and individuals who share our vision for distinctive, forward-thinking creative work that makes an impact.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=2670&auto=format&fit=crop" 
                alt="Our studio space" 
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-10 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="responsive-container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="font-display text-2xl sm:text-3xl 3xl:text-4xl font-bold text-gray-900 dark:text-white">Our Values</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg 3xl:text-xl text-gray-600 dark:text-gray-300">
              The principles that guide our work and culture.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
            >
              <h3 className="font-display text-xl 3xl:text-2xl font-bold text-gray-900 dark:text-white">Innovation</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-base 3xl:text-lg">
                We embrace new technologies and approaches, constantly pushing the boundaries of what's possible.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
            >
              <h3 className="font-display text-xl 3xl:text-2xl font-bold text-gray-900 dark:text-white">Collaboration</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-base 3xl:text-lg">
                We believe the best work happens when diverse perspectives and disciplines come together.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
            >
              <h3 className="font-display text-xl 3xl:text-2xl font-bold text-gray-900 dark:text-white">Quality</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-base 3xl:text-lg">
                We're committed to excellence in every detail, from concept to execution.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
            >
              <h3 className="font-display text-xl 3xl:text-2xl font-bold text-gray-900 dark:text-white">Sustainability</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-base 3xl:text-lg">
                We consider the environmental and social impact of our work and strive to make responsible choices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      {false && (
      <section className="py-10 sm:py-16 md:py-20">
        <div className="responsive-container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="font-display text-2xl sm:text-3xl 3xl:text-4xl font-bold text-gray-900 dark:text-white">Meet Our Team</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg 3xl:text-xl text-gray-600 dark:text-gray-300">
              The talented individuals behind our creative work.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl 3xl:text-2xl font-bold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-mono text-sm 3xl:text-base text-accent">
                    {member.role}
                  </p>
                  <p className="mt-4 text-gray-600 dark:text-gray-300 text-base 3xl:text-lg">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}
      
      <Footer />
    </main>
  );
} 