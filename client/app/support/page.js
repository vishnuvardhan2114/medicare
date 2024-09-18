"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Support() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log('Support form submitted:', form);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-red-100 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Support Page</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How can we assist you?</h2>
          <p className="text-gray-700">
            If you have any questions or need help with our pharmacy management system, please reach out to us using the form below. Our support team is here to assist you with any issues or inquiries you may have.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                aria-required="true"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                aria-required="true"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
              aria-required="true"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows="4"
              required
              aria-required="true"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
          <p className="text-gray-700">
            For more information, you can visit our <a href="/faq" className="text-blue-600 hover:underline">FAQ page</a> or check out our <a href="/help-center" className="text-blue-600 hover:underline">Help Center</a>.
          </p>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
