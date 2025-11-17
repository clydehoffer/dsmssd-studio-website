'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ImageWithFallback from '../../../components/ui/ImageWithFallback';
import ImageSlider from '../../../components/portfolio/ImageSlider';
import ImageModal from '../../../components/ui/ImageModal';
import VideoPlayerButton from '../../../components/ui/VideoPlayerButton';
import { galleryData } from '../../../data/galleryData';

// Sample portfolio projects data (in a real app, this would come from a database or API)
const projects = [
  {
    id: '1',
    title:  'Brand Identity & Launch Strategy',
    category: 'Fashion / Brand',
    client: 'COW WEAR',
    year: '2024',
    image: '/images/portfolio/1/main.jpg',
    description: 'Comprehensive brand identity design including logo, visual guidelines, and brand strategy.',
    fullDescription: `We partnered with COW WEAR, a fashion brand founded by Nick Santoianni and developed by Isaiah Cotton, to create a visual identity and strategy rooted in the brand's ethos: Creepy. Old. Weird. We shaped the creative direction, visual tone, typography, and logo system to match its playful yet refined spirit. Our goal was to build a brand experience that feels both nostalgic and forward-thinking.`,
    challenge: `The biggest challenge was translating COW WEARs offbeat, rebellious attitude into a design language that still felt polished enough to scale. The brand needed to balance weirdness with warmth, boldness with authenticity.`,
    solution: `We leaned into organic shapes, playful typography, and bold but earthy tones to develop a design system that felt vintage-inspired but modern. We created a full brand guideline kit including a primary and secondary logo, color palette, typographic system, and presentation materials.`,
    results: `The result was a clear and confident brand identity that COW WEAR could carry into pre-order campaigns, investor outreach, and future drops. Their initial pre-launch campaign saw strong engagement and brand retention, helping them move toward their 100 pre-order goal.`,
  },
  {
    id: '2',
    title: 'Fashion Lookbook',
    category: 'Fashion',
    client: 'Solivagant',
    year: '2023',
    image: '/images/portfolio/2/main.jpg',
    description: 'Fashion photography and lookbook design showcasing seasonal collections and styling.',
    fullDescription: `For the release of their new hat line, Solivagant collaborated with us to produce a striking fashion lookbook that honored the brand's proud Hispanic roots. Drawing inspiration from street fashion and tabloid aesthetics, we crafted a bold, paparazzi-style photo series that emphasized the vibrant blue tones of the collection and the confidence of the wearers.`,
    challenge: `The primary challenge was fusing heritage-driven design with a fast-paced, editorial style that would resonate both in physical lookbooks and across digital platforms. The brand needed a visual identity that celebrated culture without feeling forced or overly polished.`,
    solution: `We leaned into an unfiltered, urban-inspired photo style using flash-heavy, close-up shots and candid motion to evoke the energy of a real paparazzi moment. The creative direction embraced imperfections—reflections, grain, blur—to help emphasize the story behind the hats and the people who wear them.`,
    results: `The campaign served as a defining moment in Solivagant's growth, helping expand their audience into lifestyle and fashion crossover markets. The lookbook was featured across social channels and saw a significant uptick in online hat sales within the first two weeks of launch.`,
  },
  {
    id: '3',
    title: 'Brand Activation & Event Production',
    category: 'Photography',
    client: 'Mielle Organics',
    year: '2024',
    image: '/images/portfolio/3/main.jpg',
    description: 'Full-service event production, brand activations, and experiential marketing campaigns.',
    fullDescription: `As part of the Essence Fest 2023 weekend in New Orleans, we collaborated with Northern Decor to help bring Mielle Organics' brand activation to life. The project involved capturing event photography and assisting with the physical design and on-site production of the activation. From booth layout to decor logistics, we played a hands-on role in helping the brand stand out in a highly competitive and visually saturated environment.`,
    challenge: `With dozens of beauty and wellness brands present at Essence Fest, the main challenge was to create an experience that authentically represented Mielle Organics while capturing attention in a crowded space. The design needed to be bold, inviting, and on-brand, while the photography had to reflect the scale, energy, and cultural impact of the event.`,
    solution: `Working alongside Northern Decor, we contributed to the activation\'s layout and physical build, focusing on materials and visuals that emphasized Mielle\'s signature pink aesthetic and commitment to natural beauty. During the event, we captured dynamic photo coverage of the brand space, audience interaction, and celebrity drop-ins—building a library of assets that Mielle could use for post-event marketing and social engagement.`,
    results: `The Mielle Organics activation was considered one of the standout installations of the festival, garnering press and social coverage throughout the weekend. Our photography was used across the brand's digital channels and internal decks, while the design execution helped reinforce Mielle's presence in the beauty and wellness space.`,
  },
  {
    id: '4',
    title: 'Music Video Production – "Without You" by Mees!',
    category: 'Video Production',
    client: 'Mees!',
    year: '2024',
    image: '/images/portfolio/4/main.jpg',
    description: 'Creative direction, cinematography, and post-production for music video projects.',
    fullDescription: `We directed, shot, and edited the official music video for Mees!'s breakout track "Without You" in creative collaboration with cinematographer Nashbrowin. This vibrant, emotion-packed visual brings to life the song's fusion of hip-hop, pop, and futuristic soul through explosive color, stylized camera work, and rhythm-driven pacing.`,
    challenge: `The creative direction needed to match Mees!'s energetic performance and genre-blending sound while delivering high visual quality within a tight production window. With limited shoot days and multiple location setups, every shot had to deliver impact.`,
    solution: `We leaned into bold lighting, expressive motion, and intuitive handheld tracking to create a dynamic visual world. By pairing natural scenery with stylized effects and color treatments, the final product evokes both cinematic clarity and street-level energy. The use of vibrant lighting transitions and fluid edits amplified the track's emotional momentum from start to finish.`,
    results: `The video premiered on YouTube and instantly added to Mees!'s growing traction as an emerging artist. "Without You" has helped solidify his visual brand and received strong fan and industry response—marking another successful collaboration between our team and Nashbrowin.`,
    videoUrl: '/videos/mees-without-you-music-video.mp4',
    videoEmbed: 'https://www.youtube.com/embed/4zQwC9YK-Zk',
  },
  {
    id: '5',
    title: 'Mobile App Design & Development – FleetFlow',
    category: 'Design',
    client: 'FleetFlow',
    year: '2024',
    image: '/images/portfolio/5/main.jpg',
    description: 'User interface and user experience design for mobile applications and digital platforms.',
    fullDescription: `FleetFlow is a delivery logistics platform focused on empowering small box truck operators by connecting them with local businesses that need efficient, on-demand deliveries. As competitors like Uber Freight and Lyft often overlook smaller, regional freight operations, FleetFlow aims to fill that gap with a nimble, tech-forward solution tailored to underserved operators and vendors.`,
    challenge: `The key challenge was creating a platform robust enough to manage the complexities of delivery logistics (scheduling, route optimization, driver onboarding) while remaining user-friendly for small business owners and independent drivers unfamiliar with enterprise-level tools.`,
    solution: `We developed the complete frontend and backend architecture, including user dashboards, real-time delivery tracking, and payment integration. The UI was designed for simplicity—prioritizing clarity and accessibility—while the backend supports fleet management, load tracking, and vendor-driver communication. The design system uses bold UI elements to emphasize speed and functionality without compromising ease of use.`,
    results: `Currently in testing and onboarding, FleetFlow is scheduled to roll out later this year. Early feedback has been overwhelmingly positive, with small businesses praising the app's simplicity and drivers highlighting its user-first design. The app is positioned to become a key disruptor in local delivery logistics.`,
  },
  {
    id: '6',
    title: 'Real Estate & Location Photography',
    category: 'Photography',
    client: 'California State University, Los Angeles',
    year: '2025',
    image: '/images/portfolio/6/main.jpg',
    description: 'Professional real estate photography, architectural documentation, and location shoots.',
    fullDescription: `We partnered with California State University, Los Angeles to photograph a range of campus facilities for promotional use across their event services and location rental programs. These assets serve multiple purposes—from film and commercial production scouting to ADA-compliant event planning—forming a core part of the university's outreach leading up to LA28.`,
    challenge: `The challenge was to capture a diverse set of campus environments in a way that balanced aesthetic value, practical utility, and regulatory considerations. The content needed to feel cinematic yet clear enough for use in logistical planning, website listings, and pitch decks.`,
    solution: `We executed a multi-day shoot across key campus zones including lecture halls, open fields, walkways, and modern facilities. Special attention was paid to natural lighting, architectural symmetry, and ADA accessibility cues. The final images were formatted for web and print, and integrated seamlessly into Cal State LA's updated digital platforms.`,
    results: `This project laid the visual foundation for Cal State LA's ongoing efforts to attract film productions, commercial clients, and high-profile events. It also sparked the development of a formalized media asset library and helped position the campus as a premium location partner for LA28 and beyond.`,
  },
  {
    id: '7',
    title: 'Find Peace. Keep Peace. Publication Launch',
    category: 'Photography',
    client: 'Lorenzo T.', 
    year: '2025',
    image: '/images/portfolio/7/main.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=2576&auto=format&fit=crop',
    description: 'Photography capturing the launch event for the “Find Peace. Keep Peace.” publication.',
    fullDescription: `We partnered with the creators of “Find Peace. Keep Peace.” to photograph the official launch of the publication. The coverage focused on highlighting the community, conversations, and reflective moments that shaped the event, emphasizing the message of personal growth and collective healing at the heart of the book.`,
    challenge: `The challenge was to capture the emotional essence of the launch while working within an intimate setting where lighting, movement, and crowd flow were constantly shifting. The visuals needed to feel warm, authentic, and aligned with the publication’s peaceful and introspective themes.`,
    solution: `We approached the event with a documentary-inspired style, using natural light, close-up details, and candid interactions to convey the tone of the gathering. Emphasis was placed on capturing speakers, attendee engagement, and subtle moments that reflected the publication’s core message. Careful composition and attentive timing ensured a cohesive and expressive image collection.`,
    results: `The final photographs provided meaningful visual assets for ongoing promotion of the publication across social media, websites, and press materials. The imagery reinforced the book’s narrative, supported community outreach efforts, and offered a heartfelt record of an important milestone in the project's journey.`,
  },
  {
    id: '8',
    title: 'Academy Group: 2 Year Anniversary Celebration',
    category: 'Photography',
    client: 'Academy Group',
    year: '2025',
    image: '/images/portfolio/8/main.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=2576&auto=format&fit=crop',
    description: 'Event photography capturing the Academy Group’s 2-year anniversary celebration.',
    fullDescription: `We partnered with the Academy Group to photograph their 2-year anniversary celebration, documenting the energy, community, and mission-driven spirit of the event. From candid interactions to key program moments, the collection captures the people and purpose at the heart of the organization.`,
    challenge: `The challenge was to authentically represent the Academy Group’s culture within a fast-paced event setting. With limited control over lighting, movement, and timing, the photography needed to balance spontaneity with clarity while showcasing the significance of the milestone.`,
    solution: `We focused on a documentary-style approach, blending unobtrusive coverage with intentional framing to highlight speakers, attendees, and key experiences. Strategic use of available light, dynamic compositions, and moment-driven shooting ensured a cohesive visual narrative that aligned with the organization’s identity.`,
    results: `The final image set provided the Academy Group with versatile assets for marketing, donor engagement, and internal communication. The photos elevated the visibility of the anniversary event, strengthened brand storytelling, and offered a lasting record of a meaningful milestone in the organization’s journey.`,
  },
  {
    id: '9',
    title: 'California State University, Los Angeles: LA28 Olympic Marketing Reel',
    category: 'Video Production',
    client: 'California State University, Los Angeles',
    year: '2025',
    image: '/images/portfolio/9/main.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=2576&auto=format&fit=crop',
    description: 'Creative direction, filming, and post-production for CSULA\'s LA28 Olympic marketing reel.',
    fullDescription: `We partnered with California State University, Los Angeles to produce a high-energy marketing reel in anticipation of the LA28 Olympic Games. The video was designed to highlight CSULA's campus spirit, athletic culture, and community readiness as Los Angeles prepares to host the Olympics, merging storytelling with dynamic visuals.`,
    challenge: `The challenge centered on creating a compelling narrative that authentically represented CSULA's diverse community while aligning with the broader excitement surrounding LA28. Limited shoot windows and the need to film across multiple campus locations required efficient planning and unified creative direction.`,
    solution: `We developed a visual concept rooted in movement, pride, and momentum—capturing student life, athletics, campus landmarks, and candid moments that speak to the university's Olympic-era identity. A combination of stabilized motion shots, energetic editing, and bold graphics reinforced the LA28 aesthetic. Post-production focused on pacing, color grading, and integrating branded elements for a polished final cut.`,
    results: `The final marketing reel delivered a spirited, visually striking showcase of CSULA's role in the lead-up to LA28. The piece strengthened campus-wide promotional efforts, increased engagement across social platforms, and provided versatile content for use in university marketing, events, and Olympic-related outreach.`,
    videoUrl: '/videos/csula-la28-marketing-reel.mp4',
  },
  {
    id: '10',
    title: 'Leigh: Hideaway - Music Video Production',
    category: 'Video Production',
    client: 'Leigh',
    image: '/images/portfolio/10/main.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=2576&auto=format&fit=crop',
    description: 'Creative development, visual production, and post-editing for music video projects.',
    fullDescription: `We collaborated with artist Leigh to create the music video for “Hideaway,” crafting a visual world that reflects the emotion, mood, and narrative of the track. From concept development to final color grade, the production focused on delivering a cinematic experience that elevates the song’s atmosphere.`,
    challenge: `The primary challenge was translating the intimate, introspective tone of “Hideaway” into visuals that felt both expressive and cohesive. With limited locations and a tight production schedule, every shot needed to carry emotional weight while maintaining a strong visual identity.`,
    solution: `We developed a focused creative direction built around movement, natural textures, and selective lighting to mirror the song’s themes. A nimble production approach allowed us to capture both planned scenes and spontaneous moments. In post-production, careful pacing, color grading, and atmospheric overlays brought the narrative and performance elements together.`,
    results: `The final video delivered a polished, story-driven visual that resonated with Leigh's audience and strengthened her artistic brand. It provided versatile promotional content for social media, streaming platforms, and press coverage—helping expand the reach of the single and establishing a strong foundation for future creative collaborations.`,
    videoUrl: '/videos/leigh-hideaway-music-video.mp4',
  },
];

export default function ProjectDetail() {
  const params = useParams();
  const [windowWidth, setWindowWidth] = useState(0);
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const projectId = params.id as string;
  
  useEffect(() => {
    // Set window width for responsive adjustments
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const project = projects.find(p => p.id === projectId);
  
  // Get images for this project from gallery data
  const projectImages = galleryData[projectId]?.map(item => item.original) || [];
  
  // Get related projects (excluding current project)
  const relatedProjects = projects
    .filter(p => p.category === project?.category && p.id !== projectId)
    .slice(0, 3);
  
  if (!project) {
    return (
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Project Not Found</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">The project you're looking for doesn't exist or has been removed.</p>
          <a href="/portfolio" className="mt-8 rounded-full bg-accent px-5 sm:px-6 py-2.5 sm:py-3 font-bold text-white transition-all hover:bg-accent/80">
            Back to Portfolio
          </a>
        </div>      
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      
            {/* Hero Section */}
      <section 
        className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full overflow-hidden group cursor-pointer"
        onClick={() => setIsHeroModalOpen(true)}
      >
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>
        <ImageWithFallback
          src={project.image}
          fallbackSrc="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?q=80&w=2574&auto=format&fit=crop"
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Click to expand overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="responsive-container mx-auto px-4 text-center">
            <motion.h1 
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {project.title}
            </motion.h1>
            <motion.p 
              className="mx-auto mt-4 max-w-2xl text-base sm:text-lg 3xl:text-xl text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {project.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Video Player - Only show for video production projects */}
      {project.category === 'Video Production' && (project as any).videoUrl && (
        <section className="py-16 sm:py-20 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="responsive-container mx-auto px-4">
            <div className="text-center">
              <motion.h2 
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Watch the Video
              </motion.h2>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Experience the full production in high quality
              </motion.p>
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <VideoPlayerButton
                  videoUrl={(project as any).videoUrl}
                  title={project.title}
                  description="Click to watch the full marketing reel"
                  thumbnailUrl={project.image}
                  className="w-full max-w-2xl h-80 sm:h-96"
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}
      
      {/* Project Info */}
      <section className="py-10 sm:py-16">
        <div className="responsive-container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="font-display text-2xl sm:text-3xl 3xl:text-4xl font-bold text-gray-900 dark:text-white">Overview</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-base sm:text-lg 3xl:text-xl">
                {project.fullDescription}
              </p>
              
              <div className="mt-10">
                <h3 className="font-display text-xl sm:text-2xl 3xl:text-3xl font-bold text-gray-900 dark:text-white">The Challenge</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-base sm:text-lg 3xl:text-xl">
                  {project.challenge}
                </p>
              </div>
              
              <div className="mt-10">
                <h3 className="font-display text-xl sm:text-2xl 3xl:text-3xl font-bold text-gray-900 dark:text-white">Our Solution</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-base sm:text-lg 3xl:text-xl">
                  {project.solution}
                </p>
              </div>
              
              <div className="mt-10">
                <h3 className="font-display text-xl sm:text-2xl 3xl:text-3xl font-bold text-gray-900 dark:text-white">Results</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-base sm:text-lg 3xl:text-xl">
                  {project.results}
                </p>
              </div>

            </div>
            
            <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">Project Details</h3>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="font-mono text-sm font-bold uppercase text-gray-500 dark:text-gray-400">Client</h4>
                  <p className="mt-1 text-gray-900 dark:text-white">{project.client}</p>
                </div>
                
                <div>
                  <h4 className="font-mono text-sm font-bold uppercase text-gray-500 dark:text-gray-400">Year</h4>
                  <p className="mt-1 text-gray-900 dark:text-white">{project.year}</p>
                </div>
                
                <div>
                  <h4 className="font-mono text-sm font-bold uppercase text-gray-500 dark:text-gray-400">Category</h4>
                  <p className="mt-1 text-gray-900 dark:text-white">{project.category}</p>
                </div>
                
                <div className="pt-4">
                  <a 
                    href="/contact?subject=Project Inquiry" 
                    className="inline-block w-full rounded-full bg-accent px-6 py-3 text-center font-bold text-white transition-all hover:bg-accent/80"
                  >
                    Start a Similar Project
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
            {/* Project Gallery */}
      <section className="py-10 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="responsive-container mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl 3xl:text-4xl font-bold text-gray-900 dark:text-white">Project Gallery</h2>
          
          <div className="mt-8 max-w-4xl mx-auto">
            <ImageSlider 
              images={projectImages} 
              title={project.title} 
              className="w-full"
            />
          </div>
        </div>
      </section>
      
      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-10 sm:py-16">
          <div className="responsive-container mx-auto px-4">
            <h2 className="font-display text-2xl sm:text-3xl 3xl:text-4xl font-bold text-gray-900 dark:text-white">Related Projects</h2>
            
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((relatedProject) => (
                <div
                  key={relatedProject.id}
                  className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
                >
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <ImageWithFallback
                      src={relatedProject.image}
                      fallbackSrc="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?q=80&w=2574&auto=format&fit=crop"
                      alt={relatedProject.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      {relatedProject.title}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {relatedProject.description}
                    </p>
                    <a
                      href={`/portfolio/${relatedProject.id}`}
                      className="mt-4 inline-block font-mono text-sm font-bold text-accent transition-colors hover:text-accent/80"
                    >
                      View Project →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </main>
  );
} 