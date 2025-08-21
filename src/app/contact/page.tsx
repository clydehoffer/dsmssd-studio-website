'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  
  // Check if there's a subject in the URL query
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get('subject');
    
    if (subjectParam) {
      setFormData(prev => ({
        ...prev,
        subject: subjectParam
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Subject: ${formData.subject}\n\n${formData.message}`,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Contact Us
          </motion.h1>
          <motion.p 
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg 3xl:text-xl 4xl:text-2xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get in touch with our team to discuss your project or inquire about our services.
          </motion.p>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-10 sm:py-16 md:py-20">
        <div className="responsive-container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-lg bg-white p-6 sm:p-8 shadow-lg dark:bg-gray-800"
            >
              <h2 className="font-display text-2xl sm:text-3xl 3xl:text-4xl font-bold text-gray-900 dark:text-white">Send Us a Message</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-base sm:text-lg 3xl:text-xl">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              {isSubmitted ? (
                <div className="mt-6 rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <p className="font-bold">Thank you for your message!</p>
                  <p className="mt-1">We've received your inquiry and will respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-mono text-sm font-bold text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block font-mono text-sm font-bold text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block font-mono text-sm font-bold text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Project Inquiry">Project Inquiry</option>
                      <option value="Design Inquiry">Design Inquiry</option>
                      <option value="Production Inquiry">Production Inquiry</option>
                      <option value="Development Inquiry">Development Inquiry</option>
                      <option value="Fashion Inquiry">Fashion Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block font-mono text-sm font-bold text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-accent px-6 py-3 font-bold text-white transition-all hover:bg-accent/80 disabled:opacity-70"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-between"
            >
              <div>
                <h2 className="font-display text-2xl sm:text-3xl 3xl:text-4xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-base sm:text-lg 3xl:text-xl">
                  Reach out to us directly or visit our studio.
                </p>
                
                <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-900 dark:text-white">Our Location</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        Arts District<br />
                        Los Angeles, CA 90012
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-900 dark:text-white">Email Us</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        info@dsmssdstudio.com<br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-8 sm:mt-10 h-64 sm:h-80 overflow-hidden rounded-lg">
              <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.5391004029634!2d-118.25091928478776!3d34.04071308060811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7b708c4c4fb%3A0x18b95630db67bbf7!2sDowntown%20Los%20Angeles%2C%20Los%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1718045678901!5m2!1sen!2sus"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="DSMSSD STUDIO Location"
/>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 