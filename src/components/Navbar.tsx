'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Resume', path: '/resume' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 shadow-lg backdrop-blur-md dark:bg-studio-dark/90'
          : 'bg-black/20 backdrop-blur-sm'
      }`}
    >
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="responsive-container mx-auto flex items-center justify-between px-4 py-4 3xl:py-5 4xl:py-6">
          {/* Logo */}
          <Link href="/landing-v2" className="z-10">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 3xl:h-14 3xl:w-14">
              <img 
                src="/images/logo/logo mark.svg" 
                alt="DSMSSD STUDIO" 
                className="h-full w-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-6 lg:space-x-8 3xl:space-x-12">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className={`font-mono text-sm font-bold uppercase tracking-wider transition-colors lg:text-base 3xl:text-lg ${
                      pathname === link.path
                        ? 'text-accent'
                        : 'text-white hover:text-accent'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative h-6 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 transform bg-current transition-all duration-300 ${
                  isMobileMenuOpen
                    ? 'top-2.5 rotate-45 bg-white'
                    : 'bg-white'
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 h-0.5 w-6 transform bg-current transition-all duration-300 ${
                  isMobileMenuOpen
                    ? 'opacity-0'
                    : 'bg-white'
                }`}
              />
              <span
                className={`absolute left-0 top-5 h-0.5 w-6 transform bg-current transition-all duration-300 ${
                  isMobileMenuOpen
                    ? 'top-2.5 -rotate-45 bg-white'
                    : 'bg-white'
                }`}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-10 flex flex-col bg-primary-900 dark:bg-studio-dark"
          >
            <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 py-20">
              <div className="mb-10">
                <img 
                  src="/images/logo/logo mark.svg" 
                  alt="DSMSSD STUDIO" 
                  className="h-16 w-16"
                />
              </div>
              <ul className="flex flex-col items-center space-y-6">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link
                      href={link.path}
                      className={`font-mono text-lg font-bold uppercase tracking-wider text-white transition-colors hover:text-accent ${
                        pathname === link.path ? 'text-accent' : ''
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 