import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn more about us and our mission." />
      </Head>
      <main className="min-h-screen bg-gray-100">
        <section className="bg-blue-500 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg">We are a team of dedicated professionals committed to delivering exceptional service and value to our customers.</p>
          </div>
        </section>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-700">
                  Our mission is to provide innovative solutions that make a positive impact on our clients' lives and the world around us. We strive for excellence in every project we undertake.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img src="https://imageio.forbes.com/specials-images/imageserve/64e90445ce261a70084af6c1/Business-team-high-fives--aligning-with-their-mission-of-teamwork-/960x0.jpg?format=jpg&width=960" alt="Our Mission" className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-8">Meet the Team</h2>
            <div className="flex flex-wrap -mx-4">
              {/* Team Member 1 */}
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&s" alt="Team Member 1" className="w-32 h-32 mx-auto rounded-full mb-4" />
                  <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                  <p className="text-gray-600">CEO & Founder</p>
                </div>
              </div>
              {/* Team Member 2 */}
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXthVPHczfjeWGZUELmoZ3lkiPOJxSq1580n0L3hVxdq_5R26To-ijTOL0TOT4jn7ZYlM&usqp=CAU" alt="Team Member 2" className="w-32 h-32 mx-auto rounded-full mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
                  <p className="text-gray-600">Lead Developer</p>
                </div>
              </div>
              {/* Team Member 3 */}
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnS1o3mO3S_Nkfw1WAGaRJ6KaOGgODpfoOsA&s" alt="Team Member 3" className="w-32 h-32 mx-auto rounded-full mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Emily Johnson</h3>
                  <p className="text-gray-600">Marketing Director</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
