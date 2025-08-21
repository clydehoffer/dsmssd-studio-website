'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Shop categories
const categories = ['All', 'Apparel', 'Accessories', 'Digital', 'Prints'];

// Sample shop products
const products = [
  {
    id: '1',
    title: 'Studio Logo T-Shirt',
    category: 'Apparel',
    price: 35,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2664&auto=format&fit=crop',
    description: 'Premium cotton t-shirt with embroidered studio logo.',
  },
  {
    id: '2',
    title: 'Canvas Tote Bag',
    category: 'Accessories',
    price: 28,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=2664&auto=format&fit=crop',
    description: 'Minimalist tote bag crafted from heavy-duty canvas.',
  },
  {
    id: '3',
    title: 'Digital Asset Pack',
    category: 'Digital',
    price: 49,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2671&auto=format&fit=crop',
    description: 'Collection of textures, brushes, and templates for creative projects.',
  },
  {
    id: '4',
    title: 'Limited Edition Print',
    category: 'Prints',
    price: 75,
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=2670&auto=format&fit=crop',
    description: 'Signed and numbered art print featuring original artwork.',
  },
  {
    id: '5',
    title: 'Studio Hoodie',
    category: 'Apparel',
    price: 65,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2574&auto=format&fit=crop',
    description: 'Premium hoodie with embroidered studio logo.',
  },
  {
    id: '6',
    title: 'Studio Cap',
    category: 'Accessories',
    price: 32,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2672&auto=format&fit=crop',
    description: 'Adjustable studio cap made from durable cotton twill.',
  },
];

export default function Shop() {
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
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleAddToCart = (productId: string) => {
    alert(`Added product ${productId} to cart!`);
    // In a real app, this would add the product to a cart state or make an API call
  };

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
            Shop
          </motion.h1>
          <motion.p 
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg 3xl:text-xl 4xl:text-2xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our collection of apparel, accessories, and digital products.
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
      
      {/* Shop Grid */}
      <section className="py-8 sm:py-12">
        <div className="responsive-container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg sm:text-xl 3xl:text-2xl font-bold text-gray-900 dark:text-white">
                      {product.title}
                    </h3>
                    <p className="font-mono text-sm sm:text-base 3xl:text-lg font-bold text-accent">
                      ${product.price}
                    </p>
                  </div>
                  <p className="mt-2 text-sm sm:text-base 3xl:text-lg text-gray-600 dark:text-gray-300">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href={`/shop/${product.id}`}
                      className="font-mono text-xs sm:text-sm 3xl:text-base font-bold text-accent transition-colors hover:text-accent/80"
                    >
                      View Details
                    </a>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="rounded-full bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 3xl:text-base font-bold text-gray-800 transition-all hover:bg-accent hover:text-white dark:bg-gray-700 dark:text-gray-200"
                    >
                      Add to Cart
                    </button>
                  </div>
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