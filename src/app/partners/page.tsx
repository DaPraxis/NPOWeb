'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ✅ Import dynamically with SSR disabled
const MotionGrid = dynamic(() => import('@/Components/Animation/MotionGrid'), {
  ssr: false,
});

export default function PartnersPage() {
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinTarget = pinRef.current;
    const wrapper = document.getElementById('partner-wrapper');
    const content = document.getElementById('partner-content');

    if (!pinTarget || !wrapper || !content) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        // end: () => `+=${content.scrollHeight}`,
        end: 'bottom bottom', 
        pin: pinTarget,
        pinSpacing: false,
        scrub: true,
        invalidateOnRefresh: true,
        // markers: true, // ✅ Uncomment for visual debugging
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-16" id="partner-wrapper">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Scroll-Pinned MotionGrid on the Left */}
        <div className="md:w-[50%] w-full pt-14" ref={pinRef}>
          <div className="w-full rounded-xl overflow-hidden">
            <MotionGrid />
          </div>
        </div>

        {/* Right Content */}
        <div className="md:w-[50%] w-full flex flex-col pt-26" id="partner-content">
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
            <a
              href="/partners/opportunities"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Explore Opportunities
            </a>
            <a
              href="/partners/support"
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Support Us
            </a>
            <a
              href="/partners/contact"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
