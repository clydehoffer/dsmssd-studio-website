import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <section className="py-16 md:py-24">
        <div className="responsive-container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            DSMSSD STUDIO is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <h2 className="font-bold text-xl mt-8 mb-2 text-gray-900 dark:text-white">Information We Collect</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>Personal information you provide (such as name, email, and contact details)</li>
            <li>Booking and purchase information</li>
            <li>Usage data and analytics (e.g., cookies, IP address, browser type)</li>
          </ul>
          <h2 className="font-bold text-xl mt-8 mb-2 text-gray-900 dark:text-white">How We Use Your Information</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>To provide and improve our services</li>
            <li>To process bookings, purchases, and payments</li>
            <li>To communicate with you about your account or inquiries</li>
            <li>To comply with legal obligations</li>
          </ul>
          <h2 className="font-bold text-xl mt-8 mb-2 text-gray-900 dark:text-white">How We Share Your Information</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>With trusted service providers (e.g., payment processors, hosting providers)</li>
            <li>When required by law or to protect our rights</li>
            <li>Never sold or rented to third parties for marketing</li>
          </ul>
          <h2 className="font-bold text-xl mt-8 mb-2 text-gray-900 dark:text-white">Your Rights & Choices</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>You may request access, correction, or deletion of your personal data</li>
            <li>You may opt out of marketing communications at any time</li>
            <li>For questions, contact us at <a href="mailto:info@dsmssd.studio" className="text-accent">info@dsmssd.studio</a></li>
          </ul>
          <p className="mt-8 text-gray-500 dark:text-gray-400 text-sm">
            This policy may be updated from time to time. Please review it periodically for changes.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
} 