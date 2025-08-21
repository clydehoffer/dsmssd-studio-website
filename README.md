# DSMSSD STUDIO Website

This is the official website for DSMSSD STUDIO, showcasing our services in production, design, and development.

## Features

- **Y2K-Inspired Design**: Bold aesthetics with abstract 3D illustrations and parallax effects
- **Interactive 3D Animations**: Using Three.js and GSAP for engaging user experiences
- **Booking System**: Schedule consultations for various creative services
- **Portfolio Showcase**: Grid/masonry layout for displaying creative work
- **E-Commerce**: Sell digital and physical products
- **Social Media Integration**: OAuth authentication and auto-posting features
- **Contracts & Agreements**: Document generation for service agreements

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Three.js, GSAP, Framer Motion
- **Backend**: Next.js API routes
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **3D Rendering**: Three.js, React Three Fiber
- **Animation**: GSAP, Framer Motion
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dsmssd-studio.git
   cd dsmssd-studio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
dsmssd-studio/
├── public/               # Static assets
│   ├── fonts/            # Custom fonts
│   ├── images/           # Images and icons
│   ├── videos/           # Video content
│   └── models/           # 3D models
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   │   ├── home/         # Home page components
│   │   ├── three/        # Three.js components
│   │   └── ui/           # UI components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utility libraries
│   ├── services/         # API services
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Design Inspiration

The website design is inspired by Y2K aesthetics, featuring:
- Vibrant gradients and neon colors
- Abstract 3D elements
- Interactive animations
- Parallax scrolling effects

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from [abstract-animated-backgrounds.wannathis.one](https://abstract-animated-backgrounds.wannathis.one/)
- Y2K abstract design elements from [y2k-abstract.wannathis.one](https://y2k-abstract.wannathis.one/)

## Video Compatibility Note

The website uses a MOV video file for the hero animation. For better browser compatibility, it's recommended to convert the MOV file to MP4 format using ffmpeg:

```bash
ffmpeg -i "public/videos/dsmssd animation.mov" -vcodec h264 -acodec aac "public/videos/dsmssd animation.mp4"
```

The code includes a fallback to MP4 if the MOV file doesn't play in certain browsers.

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

## Project Structure

- `/public` - Static assets including images, videos, and fonts
- `/src/app` - Next.js app router pages
- `/src/components` - Reusable UI components
- `/src/styles` - Global styles and Tailwind configuration 