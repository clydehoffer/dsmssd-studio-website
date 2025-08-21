'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Sample upcoming livestreams
const upcomingStreams = [
  {
    id: '1',
    title: 'Design Workshop: Creating Effective Brand Guidelines',
    date: 'June 5, 2024',
    time: '2:00 PM EST',
    host: 'Alex Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop',
    description: 'Join our creative director for a hands-on workshop on developing comprehensive brand guidelines that maintain consistency across all touchpoints.',
    duration: '90 min',
    platform: 'YouTube',
  },
  {
    id: '2',
    title: 'Photography Masterclass: Studio Lighting Techniques',
    date: 'June 12, 2024',
    time: '3:00 PM EST',
    host: 'Jordan Lee',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2638&auto=format&fit=crop',
    description: 'Learn professional studio lighting setups and techniques to elevate your photography from our production director.',
    duration: '120 min',
    platform: 'Instagram',
  },
  {
    id: '3',
    title: 'Web Development Q&A: Performance Optimization',
    date: 'June 19, 2024',
    time: '1:00 PM EST',
    host: 'Sam Rivera',
    thumbnail: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop',
    description: 'Bring your questions about web performance optimization and get expert advice from our lead developer.',
    duration: '60 min',
    platform: 'Twitch',
  },
];

// Sample past livestreams
const pastStreams = [
  {
    id: '4',
    title: 'Fashion Industry Trends for 2024',
    date: 'May 22, 2024',
    host: 'Taylor Kim',
    thumbnail: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2787&auto=format&fit=crop',
    description: 'A discussion of emerging trends in the fashion industry and how they\'re influencing design and production.',
    views: '2.4K',
    duration: '75 min',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '5',
    title: 'Creative Collaboration: Working with Clients',
    date: 'May 15, 2024',
    host: 'Alex Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop',
    description: 'Strategies for effective client communication and collaboration throughout the creative process.',
    views: '1.8K',
    duration: '65 min',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '6',
    title: 'Digital Art Creation: From Concept to Completion',
    date: 'May 8, 2024',
    host: 'Jordan Lee',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    description: 'A step-by-step walkthrough of creating digital artwork from initial concept to final execution.',
    views: '3.2K',
    duration: '90 min',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '7',
    title: 'Mobile App Design Principles',
    date: 'May 1, 2024',
    host: 'Sam Rivera',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2674&auto=format&fit=crop',
    description: 'Essential principles and best practices for designing intuitive, user-friendly mobile applications.',
    views: '1.5K',
    duration: '70 min',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '8',
    title: 'Product Photography on a Budget',
    date: 'April 24, 2024',
    host: 'Taylor Kim',
    thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2670&auto=format&fit=crop',
    description: 'How to achieve professional-quality product photography with minimal equipment and budget.',
    views: '4.7K',
    duration: '60 min',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '9',
    title: 'Responsive Web Design Workshop',
    date: 'April 17, 2024',
    host: 'Sam Rivera',
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop',
    description: 'A hands-on workshop on creating responsive websites that work seamlessly across all devices.',
    views: '2.1K',
    duration: '85 min',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
];

export default function Livestream() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [activeStream, setActiveStream] = useState(pastStreams[0]);
  
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
      
      {/* Page Header */}
      <section className="bg-primary-900 py-16 sm:py-20 md:py-24 dark:bg-studio-dark">
        <div className="responsive-container mx-auto px-4 text-center">
          <motion.h1 
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl 4xl:text-8xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Livestreams
          </motion.h1>
          <motion.p 
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg 3xl:text-xl 4xl:text-2xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join our live sessions for insights, tutorials, and Q&As with our creative team
          </motion.p>
        </div>
      </section>
      
      {/* Upcoming Livestreams */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="responsive-container mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">Upcoming Livestreams</h2>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {upcomingStreams.map((stream) => (
              <motion.div
                key={stream.id}
                className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <div className="flex items-center space-x-2">
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                      <span className="font-mono text-sm font-bold">UPCOMING</span>
                    </div>
                    <div className="mt-1 flex items-center space-x-2">
                      <span>{stream.date}</span>
                      <span>•</span>
                      <span>{stream.time}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="font-display text-lg sm:text-xl 3xl:text-2xl font-bold text-gray-900 dark:text-white">
                    {stream.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Hosted by {stream.host} • {stream.duration}
                  </p>
                  <p className="mt-3 text-sm sm:text-base 3xl:text-lg text-gray-600 dark:text-gray-300">
                    {stream.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                      {stream.platform}
                    </span>
                    <button className="rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-accent-dark">
                      Set Reminder
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Livestream */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20 dark:bg-gray-900">
        <div className="responsive-container mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">Featured Replay</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Featured Livestream"
                  className="absolute inset-0 h-full w-full"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl sm:text-2xl 3xl:text-3xl font-bold text-gray-900 dark:text-white">
                  {activeStream.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {activeStream.date} • Hosted by {activeStream.host} • {activeStream.views} views
                </p>
                <p className="mt-4 text-base sm:text-lg 3xl:text-xl text-gray-700 dark:text-gray-300">
                  {activeStream.description}
                </p>
              </div>
              <div className="mt-6 space-y-4">
                <h4 className="font-display text-lg font-bold">More Replays</h4>
                <div className="space-y-3">
                  {pastStreams.slice(1, 4).map((stream) => (
                    <div 
                      key={stream.id}
                      className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                        activeStream.id === stream.id 
                          ? 'bg-accent/10' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setActiveStream(stream)}
                    >
                      <div className="h-12 w-20 flex-shrink-0 overflow-hidden rounded">
                        <img 
                          src={stream.thumbnail} 
                          alt={stream.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="truncate font-bold text-sm">
                          {stream.title}
                        </h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {stream.views} views • {stream.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <a 
                  href="#past-streams" 
                  className="inline-block font-mono text-sm font-bold text-accent hover:text-accent-dark transition-colors"
                >
                  View All Replays →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Past Livestreams */}
      <section id="past-streams" className="py-12 sm:py-16 md:py-20">
        <div className="responsive-container mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">Past Livestreams</h2>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pastStreams.map((stream) => (
              <div
                key={stream.id}
                className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                      <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 text-xs text-white rounded">
                    {stream.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                    {stream.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {stream.date} • {stream.views} views
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {stream.description}
                  </p>
                  <a
                    href={stream.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block font-mono text-xs font-bold text-accent transition-colors hover:text-accent/80"
                  >
                    Watch Replay →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="bg-accent/5 py-12 sm:py-16 dark:bg-gray-900/50">
        <div className="responsive-container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Never Miss a Stream</h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg 3xl:text-xl text-gray-600 dark:text-gray-300 mb-8">
            Subscribe to our newsletter to receive notifications about upcoming livestreams and exclusive content.
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