'use client';

import { motion } from 'framer-motion';


export default function Footer() {
  const currentYear = new Date().getFullYear();



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

          {/* Contact */}
          <div>
            <h3 className="font-display text-xl font-bold text-white">Connect</h3>
            <p className="mt-4 text-gray-300">
              Email: <a href="mailto:info@dsmssdstudio.com" className="text-accent">info@dsmssdstudio.com</a>
            </p>
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