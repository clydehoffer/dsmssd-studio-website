import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Syne, Space_Mono } from 'next/font/google';

// Font definitions
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

// Use Syne for display text - a more modern, stylish font
const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'DSMSSD STUDIO | Design • Production • Development',
  description: 'DSMSSD STUDIO offers premium production, design, digital content creation, and web/app development services with a distinctive Y2K-inspired aesthetic.',
  keywords: 'design studio, production, web development, app development, branding, photography, Y2K design, 3D animation, interactive experience, webflow, content creation, project management',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover',
  creator: 'Isaiah Cotton',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.dsmssdstudio.com',
    siteName: 'DSMSSD STUDIO',
    title: 'DSMSSD STUDIO | Premium Creative Services',
    description: 'Remarkable branding & luxurious designs with Y2K-inspired aesthetics',
    images: [
      {
        url: 'https://www.dsmssdstudio.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DSMSSD STUDIO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSMSSD STUDIO | Premium Creative Services',
    description: 'Remarkable branding & luxurious designs with Y2K-inspired aesthetics',
    images: ['https://www.dsmssdstudio.com/images/twitter-image.jpg'],
  },
  authors: [{ name: 'Isaiah Cotton', url: 'https://www.dsmssdstudio.com' }],
  category: 'Design & Creative Services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable} ${syne.variable}`}>
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
} 