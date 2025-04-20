'use client';

import dynamic from 'next/dynamic';

// ✅ Import dynamically with SSR disabled
const MotionGrid = dynamic(() => import('@/Components/Animation/MotionGrid'), {
  ssr: false,
});

export default function PartnersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sticky Left Column */}
        <div className="md:w-[50%] w-full">
          <div className="sticky top-20">
            <div className="w-full rounded-xl overflow-hidden ">
              <MotionGrid />
            </div>
          </div>
        </div>

        {/* Right Column – Content */}
        <div className="md:w-[50%] w-full flex flex-col pt-26">
          <h1 className="text-4xl font-bold mb-8">Partner with FutureEra</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Empowering youth through research, innovation, and equity — together. We invite schools, organizations,
            mentors, and sponsors to join us in shaping the next generation of changemakers.
          </p>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-1">
            {[
              {
                title: '🔬 University & Research Labs',
                desc: 'Open your lab to bright young minds. Inspire curiosity through hands-on learning.',
              },
              {
                title: '🏫 Schools & Educators',
                desc: 'Bring our programs to your students. Host workshops, start clubs, or refer standout students.',
              },
              {
                title: '👩‍💼 Mentors & Professionals',
                desc: 'Share your journey, offer guidance, or judge a competition. Be the mentor you wish you had.',
              },
              {
                title: '🤝 Sponsors & Donors',
                desc: 'Fuel our mission. From funding to in-kind support, your help creates access and opportunity.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 border rounded-xl shadow-sm bg-white">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <a href="/partners/opportunities" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Explore Opportunities
            </a>
            <a href="/partners/support" className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Support Us
            </a>
            <a href="/partners/contact" className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
