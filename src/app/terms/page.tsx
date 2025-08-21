import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsOfService() {
  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <section className="py-16 md:py-24">
        <div className="responsive-container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            By accessing or using the DSMSSD STUDIO website and services, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>
          <h2 className="font-bold text-xl mt-8 mb-2 text-gray-900 dark:text-white">Use of Services</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>You must be at least 18 years old or have parental consent to use our services</li>
            <li>You agree not to misuse the website or services</li>
            <li>All content is the property of DSMSSD STUDIO and may not be used without permission</li>
          </ul>
          <h2 className="font-bold text-xl mt-8 mb-2 text-gray-900 dark:text-white">Bookings & Purchases</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>All bookings and purchases are subject to availability and confirmation</li>
            <li>Payments are processed securely via third-party providers</li>
            <li>Cancellations and refunds are subject to our policies</li>
          </ul>
          <h2 className="font-bold text-xl mt-8 mb-2 text-gray-900 dark:text-white">Limitation of Liability</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>DSMSSD STUDIO is not liable for any indirect, incidental, or consequential damages</li>
            <li>Services are provided "as is" without warranties of any kind</li>
            <li>We do not guarantee uninterrupted or error-free operation of the website</li>
          </ul>
          <h2 className="font-bold text-xl mt-8 mb-2 text-gray-900 dark:text-white">Governing Law</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>These terms are governed by the laws of the State of California, USA</li>
            <li>Any disputes will be resolved in the appropriate courts of California</li>
          </ul>
          <p className="mt-8 text-gray-500 dark:text-gray-400 text-sm">
            These terms may be updated from time to time. Continued use of the site constitutes acceptance of any changes.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
} 