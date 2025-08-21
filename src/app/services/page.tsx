'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const pageRef = useRef(null);
  const isInView = useInView(pageRef, { once: true, amount: 0.1 });

  const services = [
    {
      id: 'production',
      title: 'Production',
      description: 'Full-service production for photo, video, and events with a creative edge.',
      features: [
        'Photo & Video Production',
        'Event Production',
        'Creative Direction',
        'Location Scouting',
        'Talent Casting',
        'Post-Production',
      ],
      color: 'from-neon-pink to-neon-purple',
    },
    {
      id: 'design',
      title: 'Design',
      description: 'Cutting-edge graphic design, branding, and visual identity development.',
      features: [
        'Brand Identity',
        'Logo Design',
        'UI/UX Design',
        'Print Design',
        'Packaging Design',
        'Motion Graphics',
      ],
      color: 'from-neon-blue to-neon-green',
    },
    {
      id: 'fashion',
      title: 'Fashion',
      description: 'Fashion design, styling, and creative direction for editorial and commercial projects.',
      features: [
        'Fashion Design',
        'Styling',
        'Editorial Direction',
        'Lookbook Production',
        'Fashion Photography',
        'Trend Forecasting',
      ],
      color: 'from-neon-yellow to-neon-green',
    },
    {
      id: 'development',
      title: 'Development',
      description: 'Web and app development with a focus on interactive experiences and e-commerce.',
      features: [
        'Web Development',
        'App Development',
        'E-Commerce Solutions',
        'CMS Implementation',
        'Interactive Experiences',
        'API Integration',
      ],
      color: 'from-neon-purple to-neon-blue',
    },
  ];

  return (
    <main className="min-h-screen bg-studio-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(157,0,255,0.1)_0%,rgba(0,0,0,0)_70%)]" />
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl font-bold text-white md:text-6xl lg:text-7xl"
          >
            Our <span className="text-gradient">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-300"
          >
            From concept to execution, we offer a full range of creative services to bring your vision to life.
          </motion.p>
        </div>
      </section>
      
      {/* Services List */}
      <section ref={pageRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-2xl bg-black p-8 shadow-xl"
              >
                <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${service.color} opacity-20 blur-3xl`} />
                
                <div className="relative z-10">
                  <h2 className="mb-4 font-display text-3xl font-bold text-white">{service.title}</h2>
                  <p className="mb-6 text-gray-300">{service.description}</p>
                  
                  <ul className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg
                          className="mr-2 h-5 w-5 text-neon-pink"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <a 
              href="/contact?subject=Consultation Inquiry" 
              className="inline-block rounded-full bg-white px-8 py-4 font-bold text-studio-dark transition-all hover:bg-neon-pink hover:text-white shadow-lg"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 