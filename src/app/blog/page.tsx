'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Sample blog posts
const blogPosts = [
  {
    id: '1',
    title: 'The Evolution of Digital Design in 2024',
    category: 'Design',
    date: 'May 15, 2024',
    author: 'Alex Johnson',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop',
    excerpt: 'Exploring the latest trends and innovations in digital design that are shaping the creative landscape this year.',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'Behind the Scenes: Creating a Fashion Campaign',
    category: 'Production',
    date: 'May 8, 2024',
    author: 'Taylor Kim',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2676&auto=format&fit=crop',
    excerpt: 'A detailed look at our process for conceptualizing and executing a successful fashion campaign from start to finish.',
    readTime: '8 min read',
  },
  {
    id: '3',
    title: 'Web Performance Optimization Techniques',
    category: 'Development',
    date: 'April 30, 2024',
    author: 'Sam Rivera',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2669&auto=format&fit=crop',
    excerpt: 'Essential strategies and tools for improving website performance and user experience in modern web applications.',
    readTime: '7 min read',
  },
  {
    id: '4',
    title: 'Sustainable Practices in Fashion Photography',
    category: 'Fashion',
    date: 'April 22, 2024',
    author: 'Jordan Lee',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop',
    excerpt: 'How we\'re implementing eco-friendly approaches to fashion photography while maintaining creative excellence.',
    readTime: '6 min read',
  },
  {
    id: '5',
    title: 'The Impact of AI on Creative Industries',
    category: 'Technology',
    date: 'April 15, 2024',
    author: 'Alex Johnson',
    image: 'https://images.unsplash.com/photo-1677442135136-760c813a743d?q=80&w=2532&auto=format&fit=crop',
    excerpt: 'Examining how artificial intelligence is transforming design, production, and content creation across creative fields.',
    readTime: '9 min read',
  },
  {
    id: '6',
    title: 'Client Communication: Best Practices for Creatives',
    category: 'Business',
    date: 'April 8, 2024',
    author: 'Taylor Kim',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop',
    excerpt: 'Effective strategies for managing client relationships and expectations throughout creative projects.',
    readTime: '5 min read',
  },
];

// Blog categories
const categories = ['All', 'Design', 'Production', 'Development', 'Fashion', 'Technology', 'Business'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [windowWidth, setWindowWidth] = useState(0);
  const [featuredPost, ...remainingPosts] = blogPosts;
  
  useEffect(() => {
    // Set window width for responsive adjustments
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const filteredPosts = activeCategory === 'All' 
    ? remainingPosts 
    : remainingPosts.filter(post => post.category === activeCategory);

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
            Blog & Insights
          </motion.h1>
          <motion.p 
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg 3xl:text-xl 4xl:text-2xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Thoughts, stories, and ideas from our creative studio
          </motion.p>
        </div>
      </section>
      
      {/* Featured Post */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="responsive-container mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">Featured Post</h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
            <div className="lg:col-span-3 overflow-hidden rounded-lg">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="lg:col-span-2 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 rounded-full bg-accent text-white text-xs font-semibold mb-4">
                {featuredPost.category}
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl 3xl:text-4xl font-bold">
                {featuredPost.title}
              </h3>
              <div className="flex items-center mt-3 mb-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <span>{featuredPost.date}</span>
                <span className="mx-2">•</span>
                <span>{featuredPost.readTime}</span>
                <span className="mx-2">•</span>
                <span>By {featuredPost.author}</span>
              </div>
              <p className="text-base sm:text-lg 3xl:text-xl text-gray-700 dark:text-gray-300 mb-6">
                {featuredPost.excerpt}
              </p>
              <a 
                href={`/blog/${featuredPost.id}`}
                className="inline-block font-mono text-sm sm:text-base 3xl:text-lg font-bold text-accent hover:text-accent-dark transition-colors"
              >
                Read Full Article →
              </a>
            </div>
          </div>
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
      
      {/* Blog Posts Grid */}
      <section className="py-8 sm:py-12 pb-16 sm:pb-20">
        <div className="responsive-container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-5">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="font-display text-lg sm:text-xl 3xl:text-2xl font-bold text-gray-900 dark:text-white">
                    {post.title}
                  </h3>
                  <div className="flex items-center mt-2 mb-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <p className="mt-2 text-sm sm:text-base 3xl:text-lg text-gray-600 dark:text-gray-300">
                    {post.excerpt}
                  </p>
                  <a
                    href={`/blog/${post.id}`}
                    className="mt-4 inline-block font-mono text-xs sm:text-sm 3xl:text-base font-bold text-accent transition-colors hover:text-accent/80"
                  >
                    Read More →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="bg-gray-100 py-12 sm:py-16 dark:bg-gray-900">
        <div className="responsive-container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg 3xl:text-xl text-gray-600 dark:text-gray-300 mb-8">
            Subscribe to our newsletter to receive the latest updates, articles, and insights from our studio.
          </p>
          <form className="mx-auto max-w-md">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow rounded-full px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <button
                type="submit"
                className="rounded-full bg-accent px-6 py-3 font-bold text-white transition-colors hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 