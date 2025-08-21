'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', icon: <FaInstagram size={20} />, url: 'https://instagram.com' },
    { name: 'Twitter', icon: <FaTwitter size={20} />, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: <FaLinkedin size={20} />, url: 'https://linkedin.com' },
    { name: 'YouTube', icon: <FaYoutube size={20} />, url: 'https://youtube.com' },
  ];

  const footerLinks = [
    { name: 'Services', url: '/services' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: 'About', url: '/about' },
    { name: 'Contact', url: '/contact' },
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' },
  ];

  return (
    <footer className="bg-primary-900 py-16 dark:bg-studio-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div>
            <a href="/landing-v2">
              <img 
                src="/images/logo/logo mark.svg" 
                alt="DSMSSD STUDIO" 
                className="h-14 w-14"
              />
            </a>
            <p className="mt-4 text-gray-300">
              A vibrant studio specializing in production, design, fashion, and web/app development services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl font-bold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-300 transition-colors hover:text-accent"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display text-xl font-bold text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.slice(4).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-300 transition-colors hover:text-accent"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-display text-xl font-bold text-white">Connect</h3>
            <p className="mt-4 text-gray-300">
              Email: <a href="mailto:info@dsmssd.studio" className="text-accent">info@dsmssdstudio.com</a>
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent"
                  whileHover={{ y: -5 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} DSMSSD STUDIO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 