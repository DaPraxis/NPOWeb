'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {FireOutlined, GiftOutlined, MailOutlined} from '@ant-design/icons'

gsap.registerPlugin(ScrollTrigger);

const partnerCards = [
  {
    title: 'University & Research Labs',
    desc: 'Open your lab to bright young minds. Inspire curiosity through hands-on learning.',
    color: 'bg-emerald-300',
    image: '/assets/partners/partner-lab.jpg',
  },
  {
    title: 'Schools & Educators',
    desc: 'Bring our programs to your students. Host workshops, start clubs, or refer standout students.',
    color: 'bg-pink-300',
    image: '/assets/partners/partner-school.jpg',
  },
  {
    title: 'Mentors & Professionals',
    desc: 'Share your journey, offer guidance, or judge a competition. Be the mentor you wish you had.',
    color: 'bg-blue-300',
    image: '/assets/partners/partner-mentor.jpg',
  },
  {
    title: 'Sponsors & Donors',
    desc: 'Fuel our mission. From funding to in-kind support, your help creates access and opportunity.',
    color: 'bg-yellow-300',
    image: '/assets/partners/partner-sponsor.jpg',
  },
];

export default function PartnersPage() {
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinTarget = pinRef.current;
    const wrapper = document.getElementById('partner-wrapper');
    const content = document.getElementById('partner-content');
    const footer = document.getElementById('footer');
  
    if (!pinTarget || !wrapper || !content || !footer) return;
  
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: () => {
          const contentHeight = content.offsetHeight;
          const pinHeight = pinTarget.offsetHeight;
  
          const footerTop = footer.getBoundingClientRect().top + window.scrollY;
          const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
  
          // ✅ Return distance from wrapper top to footer top minus pinHeight
          return `${footerTop - wrapperTop - pinHeight -220}px`;
        },
        pin: pinTarget,
        pinSpacing: false,
        scrub: true,
        invalidateOnRefresh: true,
        // markers: true,
      });
    });
  
    return () => ctx.revert();
  }, []);
  

  return (
    <div className="max-w-7xl mx-auto px-4 pt-36" id="partner-wrapper">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Left: Scrollable Cards */}
        <div className="md:w-[55%] w-full space-y-0" id="partner-content">
          {partnerCards.map((item, idx) => (
            <div
              key={idx}
              className="group grid grid-cols-1 md:grid-cols-2 h-[260px] overflow-hidden"
            >
              {/* Left: Colored Section */}
              <div className={`${item.color} flex flex-col justify-center items-start px-8 py-6 text-black`}>
                <h2 className="text-2xl font-bold mb-1">{item.title}</h2>
                <p className="text-base text-black/70">{item.desc}</p>
              </div>

              {/* Right: Image Section */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right: Scroll-Pinned Heading & Buttons */}
        <div className="md:w-[40%] w-full" ref={pinRef}>
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-8 pt-16">Partner with FutureEra</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Empowering youth through research, innovation, and equity — together. We invite schools, organizations,
              mentors, and sponsors to join us in shaping the next generation of changemakers.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/partners/opportunities"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FireOutlined /> Explore Opportunities
              </a>
              <a
                href="/partners/support"
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                <GiftOutlined /> Support Us
              </a>
              <a
                href="/partners/contact"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                <MailOutlined /> Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
