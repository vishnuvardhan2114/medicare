"use client"
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    try {
      // Handle form submission, e.g., send form data to an API
      console.log('Form submitted:', form);
      setFormStatus('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Contact us for any inquiries" />
        <meta name="keywords" content="Contact, Inquiry, Support" />
        <meta property="og:title" content="Contact Us" />
        <meta property="og:description" content="Contact us for any inquiries" />
        <meta property="og:image" content="https://yourdomain.com/contact-og-image.jpg" />
        <meta property="og:url" content="https://yourdomain.com/contact" />
        <meta property="og:type" content="website" />
      </Head>
      <main
        className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50"
        style={{
          backgroundImage: 'url("https://www.shutterstock.com/image-illustration/3d-render-human-doctor-cartoon-600nw-1984521056.jpg")',
          backgroundSize: 'cover',
        }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
          {formStatus && (
            <div
              className={`mb-4 p-4 rounded-lg text-center ${formStatus.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
            >
              {formStatus}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          <button
            onClick={() => router.push('/')}
            className="mt-4 w-full px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back to Home
          </button>
        </div>
      </main>
    </>
  );
}
