import { Link } from '@/types/chat';

export const chatLinks: Link[] = [
  {
    id: 'welcome',
    title: 'Hi there! Welcome to DSMSSD Studio.',
    description: 'I\'m Isaiah Cotton, a multidisciplinary creative specializing in design, production, and development. What can I help you with today?',
    isUser: false,
  },
  {
    id: 'services',
    title: 'Our Services',
    description: 'Click to explore our design & development services',
    url: '/services',
    isUser: false,
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: 'View our creative work across various mediums',
    url: '/portfolio',
    isUser: false,
  },
  {
    id: 'web-design',
    title: 'Web Design & Development',
    description: 'Custom websites with Y2K aesthetics and modern functionality',
    url: '/services/web-design',
    isUser: false,
  },
  {
    id: 'branding',
    title: 'Branding & Identity',
    description: 'Remarkable branding that captures your unique vision',
    url: '/services/branding',
    isUser: false,
  },
  {
    id: 'photography',
    title: 'Photography',
    description: 'Portrait, artist, and event photography that tells a story',
    url: '/services/photography',
    isUser: false,
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'Engaging visual content for your brand',
    url: '/services/content',
    isUser: false,
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Full-service creative project management',
    url: '/services/management',
    isUser: false,
  },
  {
    id: 'shop',
    title: 'Shop',
    description: 'Purchase digital assets and merchandise',
    url: '/shop',
    isUser: false,
  },
  {
    id: 'contact',
    title: 'Get in Touch',
    description: 'Let\'s work together on your next project',
    url: '/contact',
    isUser: false,
  },
  {
    id: 'resume',
    title: 'Resume & Skills',
    description: 'View my professional experience and technical skills',
    url: '/resume',
    isUser: false,
  },
  {
    id: 'social-instagram',
    title: 'Instagram',
    description: 'Follow my creative journey',
    url: 'https://instagram.com/dsmssdstudio',
    isUser: false,
    newTab: true,
  },
  {
    id: 'social-discord',
    title: 'Discord',
    description: 'Join my community',
    url: 'https://discord.gg/vxCwA39xKj',
    isUser: false,
    newTab: true,
  },
];

// Specific skills based on your updated resume
export const skillsLinks: Link[] = [
  {
    id: 'skills-design',
    title: 'Design Skills',
    description: 'Graphic Design, UI/UX, Web Design, Brand Identity, Y2K Aesthetics',
    isUser: false,
  },
  {
    id: 'skills-development',
    title: 'Development Skills',
    description: 'Next.js, React, Tailwind CSS, TypeScript, Three.js, GSAP, Framer Motion',
    isUser: false,
  },
  {
    id: 'skills-systems',
    title: 'Systems & Platforms',
    description: 'Drupal, Power Automate, PeopleSoft, HRM, Raiser\'s Edge, Blackbaud, DocuWare',
    isUser: false,
  },
  {
    id: 'skills-other',
    title: 'Additional Skills',
    description: 'AI Learning & Training, Basic SQL, Photography, Content Creation, Project Management',
    isUser: false,
  },
]; 