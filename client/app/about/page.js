"use client"
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn more about us and our mission." />
        <meta name="keywords" content="About Us, Mission, Team, Company" />
        <meta property="og:title" content="About Us" />
        <meta property="og:description" content="Learn more about us and our mission." />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        <meta property="og:url" content="https://yourdomain.com/about" />
        <meta property="og:type" content="website" />
      </Head>
      <main className="min-h-screen bg-gray-100">
        <section className="bg-blue-500 text-white py-8 md:py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Us</h1>
            <p className="text-base md:text-lg">
              We are a team of dedicated professionals committed to delivering exceptional service and value to our customers.
            </p>
          </div>
        </section>
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Mission</h2>
                <p className="text-base md:text-lg text-gray-700">
                  Our mission is to provide innovative solutions that make a positive impact on our clients' lives and the world around us. We strive for excellence in every project we undertake.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="https://imageio.forbes.com/specials-images/imageserve/64e90445ce261a70084af6c1/Business-team-high-fives--aligning-with-their-mission-of-teamwork-/960x0.jpg?format=jpg&width=960"
                  alt="Team collaborating towards a mission"
                  className="w-full max-w-sm md:max-w-md rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Meet the Team</h2>
            <div className="flex flex-wrap -mx-4">
              {/* Team Member 1 */}
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&s"
                    alt="John Doe"
                    className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-lg md:text-xl font-semibold mb-2">John Doe</h3>
                  <p className="text-gray-600">CEO & Founder</p>
                </div>
              </div>
              {/* Team Member 2 */}
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXthVPHczfjeWGZUELmoZ3lkiPOJxSq1580n0L3hVxdq_5R26To-ijTOL0TOT4jn7ZYlM&usqp=CAU"
                    alt="Jane Smith"
                    className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Jane Smith</h3>
                  <p className="text-gray-600">Lead Developer</p>
                </div>
              </div>
              {/* Team Member 3 */}
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnS1o3mO3S_Nkfw1WAGaRJ6KaOGgODpfoOsA&s"
                    alt="Emily Johnson"
                    className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Emily Johnson</h3>
                  <p className="text-gray-600">Marketing Director</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center py-4">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back to Home
          </button>
        </div>
      </main>
    </>
  );
}
