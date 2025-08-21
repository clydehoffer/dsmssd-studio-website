'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

// Sample shop products data (in a real app, this would come from a database or API)
const products = [
  {
    id: '1',
    title: 'DSMSSD Logo T-Shirt',
    category: 'Apparel',
    price: 45,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Gray'],
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2664&auto=format&fit=crop',
    description: 'Premium cotton t-shirt with embroidered logo.',
    fullDescription: 'Our premium cotton t-shirt features an embroidered DSMSSD logo on the chest. Made from 100% organic cotton, this shirt offers both comfort and style. The minimalist design makes it versatile for any casual occasion.',
    features: [
      '100% organic cotton',
      'Embroidered logo',
      'Ribbed collar',
      'Relaxed fit',
      'Machine washable',
    ],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2664&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2674&auto=format&fit=crop',
    ],
  },
  {
    id: '2',
    title: 'Minimalist Tote Bag',
    category: 'Accessories',
    price: 35,
    sizes: ['One Size'],
    colors: ['Black', 'Natural', 'Navy'],
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=2664&auto=format&fit=crop',
    description: 'Canvas tote bag with subtle logo print.',
    fullDescription: 'Our minimalist tote bag is crafted from heavy-duty canvas with a subtle DSMSSD logo print. Perfect for everyday use, this spacious bag features internal pockets and a sturdy construction that will last for years.',
    features: [
      'Heavy-duty canvas',
      'Subtle logo print',
      'Internal pockets',
      'Reinforced handles',
      'Machine washable',
    ],
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=2664&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591273082871-39933a35eb7a?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2667&auto=format&fit=crop',
    ],
  },
  {
    id: '3',
    title: 'Digital Asset Pack',
    category: 'Digital',
    price: 25,
    sizes: ['N/A'],
    colors: ['N/A'],
    image: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2680&auto=format&fit=crop',
    description: 'Collection of digital assets and templates.',
    fullDescription: 'Our Digital Asset Pack includes a comprehensive collection of templates, mockups, and design elements for your creative projects. Perfect for designers, content creators, and brands looking to maintain a consistent visual identity.',
    features: [
      'Social media templates',
      'Mockup files',
      'Icon set',
      'Font recommendations',
      'Color palette guide',
    ],
    images: [
      'https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2680&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2664&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop',
    ],
  },
  {
    id: '4',
    title: 'Limited Edition Print',
    category: 'Prints',
    price: 75,
    sizes: ['11x14"', '16x20"', '24x36"'],
    colors: ['N/A'],
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=2670&auto=format&fit=crop',
    description: 'Signed limited edition art print.',
    fullDescription: 'This limited edition art print features original artwork by our studio artists. Each print is numbered and signed, with only 100 copies available worldwide. Printed on museum-quality archival paper with lightfast inks.',
    features: [
      'Limited edition of 100',
      'Signed and numbered',
      'Museum-quality archival paper',
      'Lightfast inks',
      'Certificate of authenticity',
    ],
    images: [
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581337204873-1a1b6bc70a7c?q=80&w=2670&auto=format&fit=crop',
    ],
  },
  {
    id: '5',
    title: 'Logo Hoodie',
    category: 'Apparel',
    price: 65,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy'],
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2574&auto=format&fit=crop',
    description: 'Comfortable hoodie with embroidered logo.',
    fullDescription: 'Stay warm and stylish with our premium hoodie featuring an embroidered DSMSSD logo. Made from a soft cotton-polyester blend with a brushed interior for extra comfort. Features a kangaroo pocket and adjustable drawstring hood.',
    features: [
      'Cotton-polyester blend',
      'Embroidered logo',
      'Brushed interior',
      'Kangaroo pocket',
      'Adjustable drawstring hood',
    ],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565693413579-8a73fcc8efcd?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?q=80&w=2574&auto=format&fit=crop',
    ],
  },
  {
    id: '6',
    title: 'Studio Cap',
    category: 'Accessories',
    price: 30,
    sizes: ['One Size'],
    colors: ['Black', 'White', 'Khaki'],
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2672&auto=format&fit=crop',
    description: 'Adjustable cap with embroidered studio logo.',
    fullDescription: 'Our adjustable studio cap features an embroidered DSMSSD logo on the front. Made from durable cotton twill with a curved brim and adjustable strap for the perfect fit. A classic accessory for any outfit.',
    features: [
      'Cotton twill construction',
      'Embroidered logo',
      'Curved brim',
      'Adjustable strap',
      'One size fits most',
    ],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2672&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=2668&auto=format&fit=crop',
    ],
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = products.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]);
      setSelectedColor(foundProduct.colors[0]);
    }
    
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    // In a real app, this would add the product to a cart
    alert(`Added to cart: ${product.title} - Size: ${selectedSize}, Color: ${selectedColor}, Quantity: ${quantity}`);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-accent border-t-transparent"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Product Not Found</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">The product you're looking for doesn't exist or has been removed.</p>
          <a href="/shop" className="mt-8 rounded-full bg-accent px-6 py-3 font-bold text-white transition-all hover:bg-accent/80">
            Back to Shop
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Product Detail */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Product Images */}
            <div>
              <div className="mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <img 
                  src={product.images[activeImage]} 
                  alt={product.title} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`overflow-hidden rounded-lg border-2 ${
                      activeImage === index ? 'border-accent' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} - Image ${index + 1}`} 
                      className="h-24 w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <motion.h1 
                className="font-display text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {product.title}
              </motion.h1>
              
              <motion.div
                className="mt-4 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="font-mono text-2xl font-bold text-accent">${product.price}</span>
                <span className="ml-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {product.category}
                </span>
              </motion.div>
              
              <motion.p 
                className="mt-6 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {product.fullDescription}
              </motion.p>
              
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Features</h3>
                <ul className="mt-4 space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="mr-2 h-5 w-5 text-accent"
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
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Size Selection */}
              {product.sizes[0] !== 'N/A' && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Size</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-full px-4 py-2 font-bold transition-all ${
                          selectedSize === size
                            ? 'bg-accent text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Color Selection */}
              {product.colors[0] !== 'N/A' && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Color</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {product.colors.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-full px-4 py-2 font-bold transition-all ${
                          selectedColor === color
                            ? 'bg-accent text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Quantity */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Quantity</h3>
                <div className="mt-4 flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="mx-4 w-8 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </motion.div>
              
              {/* Add to Cart */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <button
                  onClick={handleAddToCart}
                  className="w-full rounded-full bg-accent py-3 font-bold text-white transition-all hover:bg-accent/80"
                >
                  Add to Cart - ${product.price * quantity}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Products */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-display text-3xl font-bold text-gray-900 dark:text-white mb-12">You May Also Like</h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products
              .filter(p => p.id !== id && p.category === product.category)
              .slice(0, 3)
              .map(relatedProduct => (
                <motion.div
                  key={relatedProduct.id}
                  className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold">
                        {relatedProduct.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                        {relatedProduct.title}
                      </h3>
                      <span className="font-mono text-lg font-bold text-accent">
                        ${relatedProduct.price}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {relatedProduct.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <a
                        href={`/shop/${relatedProduct.id}`}
                        className="font-mono text-sm font-bold text-accent transition-colors hover:text-accent/80"
                      >
                        View Details
                      </a>
                      <button
                        onClick={() => alert(`Added ${relatedProduct.title} to cart!`)}
                        className="rounded-full bg-accent px-4 py-2 font-bold text-white transition-colors hover:bg-accent/80"
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