'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

// Sample blog posts from the blog page
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

// Sample blog posts content (in a real app, this would come from an API or CMS)
const blogPostsContent: Record<string, {
  title: string;
  category: string;
  date: string;
  author: string;
  authorRole: string;
  authorImage: string;
  image: string;
  readTime: string;
  content: string;
  tags: string[];
  relatedPosts: string[];
}> = {
  '1': {
    title: 'The Evolution of Digital Design in 2024',
    category: 'Design',
    date: 'May 15, 2024',
    author: 'Alex Johnson',
    authorRole: 'Creative Director',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop',
    readTime: '5 min read',
    content: `
      <p class="mb-4 text-lg">The landscape of digital design is constantly evolving, and 2024 has brought significant shifts in how designers approach their craft. From the rise of AI-assisted design tools to the growing emphasis on accessibility and inclusive design, the field is experiencing a renaissance of sorts.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">AI-Assisted Design: Collaboration, Not Replacement</h2>
      <p class="mb-4">One of the most significant developments in digital design this year has been the maturation of AI-assisted design tools. Rather than replacing designers, these tools have become sophisticated collaborators, handling repetitive tasks and generating starting points that designers can refine and elevate.</p>
      <p class="mb-4">Tools like Midjourney, DALL-E, and various design-specific AI assistants have become commonplace in design workflows. The key to their successful integration has been understanding their strengths and limitations—using them to enhance human creativity rather than substitute for it.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Accessibility as a Fundamental Principle</h2>
      <p class="mb-4">Accessibility has moved from being an afterthought or compliance requirement to a fundamental design principle. Designers are increasingly recognizing that accessible design is simply good design—benefiting all users, not just those with disabilities.</p>
      <p class="mb-4">This shift has been accompanied by better tools for testing and implementing accessible designs, making it easier for designers to create inclusive experiences from the start of a project rather than retrofitting accessibility features later.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">The Return of Maximalism</h2>
      <p class="mb-4">After years of minimalist dominance, we\'re seeing a resurgence of more expressive, maximalist design approaches. This doesn't mean cluttered interfaces, but rather thoughtfully complex designs that embrace color, typography, and visual elements in more adventurous ways.</p>
      <p class="mb-4">This trend reflects a broader cultural shift toward individuality and expression, as well as users' increasing visual literacy and comfort with more sophisticated interfaces.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Immersive Experiences Beyond Screens</h2>
      <p class="mb-4">Digital design is increasingly breaking free from the confines of traditional screens. Augmented reality, spatial computing, and other immersive technologies are creating new canvases for designers to work with.</p>
      <p class="mb-4">These technologies require designers to think beyond the 2D constraints of traditional interfaces and consider how users interact with digital elements in physical space. This has led to new design methodologies and tools specifically tailored to these immersive mediums.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Sustainability in Digital Design</h2>
      <p class="mb-4">As awareness of the environmental impact of digital products grows, designers are increasingly considering the sustainability of their work. This includes optimizing for energy efficiency, reducing data transfer, and designing products with longer lifespans to minimize digital waste.</p>
      <p class="mb-4">Sustainable digital design is still an emerging practice, but it's quickly gaining traction as organizations recognize both the environmental and business benefits of more efficient digital products.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Looking Forward</h2>
      <p class="mb-4">As we move through 2024, these trends will continue to evolve and new ones will emerge. The most successful designers will be those who can adapt to these changes while maintaining a focus on the fundamental principles of good design: usability, accessibility, and meaningful user experiences.</p>
      <p class="mb-4">The future of digital design looks bright, with technology enabling new forms of creativity and expression while also making design more inclusive and sustainable than ever before.</p>
    `,
    tags: ['Design Trends', 'UI/UX', 'Digital Design', 'AI', 'Accessibility'],
    relatedPosts: ['2', '5', '6'],
  },
  '2': {
    title: 'Behind the Scenes: Creating a Fashion Campaign',
    category: 'Production',
    date: 'May 8, 2024',
    author: 'Taylor Kim',
    authorRole: 'Production Director',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2676&auto=format&fit=crop',
    readTime: '8 min read',
    content: `
      <p class="mb-4 text-lg">Creating a successful fashion campaign involves much more than simply photographing models wearing the latest collection. It's a complex, collaborative process that brings together creative vision, technical expertise, and strategic planning.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Conceptualization: Where It All Begins</h2>
      <p class="mb-4">Every great fashion campaign starts with a strong concept. This is where we work closely with the brand to understand their identity, target audience, and the specific story they want to tell with their collection.</p>
      <p class="mb-4">For a recent campaign we produced for a sustainable fashion brand, we developed a concept that highlighted the connection between their garments and the natural environments that inspired them. This involved location scouting in several national parks and creating mood boards that captured the essence of the collection.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Pre-Production: Planning for Success</h2>
      <p class="mb-4">Once the concept is approved, we move into pre-production. This phase includes casting models, selecting locations, assembling the creative team (photographers, stylists, makeup artists, etc.), and creating detailed shot lists and production schedules.</p>
      <p class="mb-4">Pre-production is where potential issues are identified and addressed before they become problems. For example, we might need to secure permits for certain locations, plan for weather contingencies, or ensure we have the right equipment for specific lighting conditions.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Production Day: Where Vision Meets Reality</h2>
      <p class="mb-4">Production days are intense, highly coordinated efforts. Our team arrives early to set up equipment, prepare the location, and brief everyone on the day's objectives. Models go through hair and makeup while the styling team prepares the garments.</p>
      <p class="mb-4">Throughout the shoot, our production team manages the schedule, ensures everyone has what they need, and addresses any unexpected challenges. The photographer and creative director work together to capture images that align with the campaign concept while showcasing the garments effectively.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Post-Production: Refining the Raw Material</h2>
      <p class="mb-4">After the shoot, we enter post-production. This includes selecting the best images, retouching them to ensure they meet the brand's standards, and preparing them for various media channels (print, digital, social media, etc.).</p>
      <p class="mb-4">Post-production is where the campaign really comes together. It's about enhancing what was captured during the shoot while maintaining authenticity and alignment with the brand's aesthetic.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Campaign Launch: Bringing It to the Audience</h2>
      <p class="mb-4">Finally, we coordinate with the brand's marketing team to launch the campaign. This might involve creating assets for different platforms, planning a launch event, or developing a content calendar for releasing images over time.</p>
      <p class="mb-4">We also track the campaign's performance, gathering data on engagement, reach, and conversion to help inform future campaigns.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">The Collaborative Nature of Fashion Campaigns</h2>
      <p class="mb-4">Throughout this entire process, collaboration is key. A successful fashion campaign requires seamless coordination between the brand, the creative team, and the production team. Each person brings their unique expertise to the table, contributing to the final result.</p>
      <p class="mb-4">It's this collaborative spirit that makes producing fashion campaigns so challenging and rewarding. When everything comes together—when the concept, the execution, and the final images all align perfectly—the result is a campaign that not only showcases the collection beautifully but also tells a compelling story that resonates with the audience.</p>
    `,
    tags: ['Fashion', 'Production', 'Photography', 'Behind the Scenes', 'Creative Direction'],
    relatedPosts: ['4', '6', '1'],
  },
};

export default function BlogPost() {
  const params = useParams();
  const postId = params.id as string;
  const post = blogPostsContent[postId];
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

  // Find related posts
  const relatedPostsData = post?.relatedPosts?.map((id: string) => 
    blogPosts.find(post => post.id === id)
  ).filter(Boolean) || [];

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Post not found</h1>
            <p className="mt-4">The blog post you're looking for doesn't exist.</p>
            <a href="/blog" className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-bold text-white">
              Back to Blog
            </a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={post.image} 
            alt={post.title} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="responsive-container mx-auto px-4 pb-12 sm:pb-16 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white mb-4">
                {post.category}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl font-bold text-white max-w-4xl">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center text-sm sm:text-base text-gray-300">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
                <span className="mx-2">•</span>
                <span>By {post.author}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="responsive-container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Tags */}
              <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
                <h3 className="font-display text-xl font-bold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span 
                      key={tag} 
                      className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Author Bio */}
              <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
                <div className="flex items-center">
                  <img 
                    src={post.authorImage} 
                    alt={post.author} 
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-display text-xl font-bold">{post.author}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{post.authorRole}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                {/* Related Posts */}
                <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                  <h3 className="font-display text-xl font-bold mb-4">Related Posts</h3>
                  <div className="space-y-6">
                    {relatedPostsData.map((relatedPost: any) => (
                      <div key={relatedPost.id} className="flex items-start">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-bold line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <div className="flex items-center mt-6">
                            <a 
                              href={`/blog/${relatedPost.id}`}
                              className="inline-block font-mono text-sm font-bold text-accent hover:text-accent-dark transition-colors"
                            >
                              Read Article →
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Newsletter Signup */}
                <div className="mt-8 rounded-lg bg-accent/10 p-6">
                  <h3 className="font-display text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    Get the latest updates and insights delivered directly to your inbox.
                  </p>
                  <form>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full rounded-md px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-accent"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full rounded-md bg-accent px-4 py-2 font-bold text-white transition-colors hover:bg-accent-dark"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* More Articles */}
      <section className="bg-gray-50 py-12 sm:py-16 dark:bg-gray-900">
        <div className="responsive-container mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">More Articles</h2>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post: any) => (
              <div
                key={post.id}
                className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
              >
                <div className="relative h-48 overflow-hidden">
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
                  <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    {post.title}
                  </h3>
                  <div className="flex items-center mt-2 mb-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {post.excerpt}
                  </p>
                  <a
                    href={`/blog/${post.id}`}
                    className="mt-4 inline-block font-mono text-xs sm:text-sm font-bold text-accent transition-colors hover:text-accent/80"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="mt-8 flex justify-between items-center">
        <a
          href="/blog"
          className="inline-block font-mono text-sm font-bold text-accent hover:text-accent-dark transition-colors"
        >
          ← Back to All Articles
        </a>
      </div>
      
      <Footer />
    </main>
  );
} 