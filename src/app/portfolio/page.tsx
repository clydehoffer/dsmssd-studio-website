'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ImageWithFallback from '../../components/ui/ImageWithFallback';

// Portfolio categories
const categories = ['All', 'Design', 'Production', 'Experiential', 'Fashion'];

// Portfolio projects - Updated to use local images from Google Drive with fallbacks
const projects = [
  {
    id: '1',
    title: 'Brand Identity Design',
    category: 'Design',
    image: '/images/portfolio/1/main.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?q=80&w=2574&auto=format&fit=crop',
    description: 'Comprehensive brand identity design including logo, visual guidelines, and brand strategy.',
  },
  {
    id: '2',
    title: 'Fashion Lookbook',
    category: 'Fashion',
    image: '/images/portfolio/2/main.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2574&auto=format&fit=crop',
    description: 'Fashion photography and lookbook design showcasing seasonal collections and styling.',
  },
  {
    id: '3',
    title: 'Brand Activation & Event Production',
    category: 'Experiential',
    image: '/images/portfolio/3/main.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop',
    description: 'Full-service event production, brand activations, and experiential marketing campaigns.',
  },
  {
    id: '4',
    title: 'Music Video Production',
    category: 'Production',
    image: '/images/portfolio/4/main.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2670&auto=format&fit=crop',
    description: 'Creative direction, cinematography, and post-production for music video projects.',
  },
  {
    id: '5',
    title: 'Mobile App UI/UX',
    category: 'Design',
    image: '/images/portfolio/5/main.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2670&auto=format&fit=crop',
    description: 'User interface and user experience design for mobile applications and digital platforms.',
  },
  {
    id: '6',
    title: 'Real Estate & Location Photography',
    category: 'Production',
    image: '/images/portfolio/6/main.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=2576&auto=format&fit=crop',
    description: 'Professional real estate photography, architectural documentation, and location shoots.',
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
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
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Page Header */}
      <section className="bg-primary-900 py-16 sm:py-20 md:py-24 dark:bg-studio-dark">
        <div className="responsive-container mx-auto px-4 text-center">
          <motion.h1 
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl 4xl:text-8xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Portfolio
          </motion.h1>
          <motion.p 
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg 3xl:text-xl 4xl:text-2xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our latest projects across design, production, development, and fashion.
          </motion.p>
        </div>
      </section>
      
      {/* Category Filter */}
      <section className="py-6 sm:py-8">
        <div className="responsive-container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 sm:px-6 py-1.5 sm:py-2 font-mono text-xs sm:text-sm 3xl:text-base font-bold transition-all ${
                  activeCategory === category
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Portfolio Grid */}
      <section className="py-8 sm:py-12">
        <div className="responsive-container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    fallbackSrc={project.fallbackImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="font-display text-lg sm:text-xl 3xl:text-2xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base 3xl:text-lg text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>
                  <a
                    href={`/portfolio/${project.id}`}
                    className="mt-4 inline-block font-mono text-xs sm:text-sm 3xl:text-base font-bold text-accent transition-colors hover:text-accent/80"
                  >
                    View Project →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 