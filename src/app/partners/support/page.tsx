'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import ZeffyDonation from './Donation';
import ScrollReveal from '@/blocks/TextAnimations/ScrollReveal/ScrollReveal'

const GenerativeLandscape = dynamic(() => import('@/Components/Animation/GenerativeLandscape'), {
  ssr: false,
  loading: () => null,
});

export default function SupportUsPage() {
  const [canvasVisible, setCanvasVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setCanvasVisible(true), 100); // Start fade early
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative min-h-screen md:h-[450px] flex items-center justify-center overflow-hidden text-white">
        {/* Static fallback image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero-static.png"
            alt="Generative Landscape Fallback"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Animated canvas fading in on top */}
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-[10000ms] ease-out ${
            canvasVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <GenerativeLandscape/>
        </div>

        {/* Overlay tint for contrast */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />

        {/* Title */}
        <h1 className="relative z-20 text-4xl md:text-5xl font-bold tracking-tight text-center px-4">
          Support Youth Innovation & Equity
        </h1>
      </section>

      {/* Mission Section */}
      <section className="py-50 px-6 text-center max-w-4xl mx-auto sm:text-left">
        <ScrollReveal 
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName=""
          textClassName=""
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
            Your Support Powers Bold Futures
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-left">
            At <strong>FutureEra Research Institute</strong>, we’re building more than just programs —
            we’re building access, equity, and opportunity. From youth-led tech projects to mentorship
            in research labs, our mission is to ensure that every student — regardless of identity,
            income, or background — has the tools, support, and voice to lead.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mt-4 text-left">
            With your help, we’re creating a generation of changemakers who are not only part of the
            future — they’re shaping it.
          </p>
        </ScrollReveal>
      </section>

      {/* Impact Strip */}
      <section className="bg-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-xl sm:text-2xl font-extrabold text-yellow-400 uppercase mb-8 tracking-wide">
            A Few Ways to Help Out:
          </h3>
          <ul className="space-y-5 text-lg sm:text-xl">
            {[
              { amount: '$25', desc: 'Covers materials for a student-led coding workshop' },
              { amount: '$50', desc: 'Supports 1 hour of one-on-one mentorship' },
              { amount: '$100', desc: 'Funds a research starter kit for 3 students' },
              { amount: '$250', desc: 'Sponsors a full community project cycle' },
              { amount: '$500', desc: 'Empowers a full-term youth research mentorship' },
            ].map(({ amount, desc }) => (
              <li key={amount}>
                <span className="font-bold text-white">{amount}</span>{' '}
                <span className="text-white">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Zeffy Donation */}
      <section id="donate" className="max-w-4xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-center mb-8">Donate Online Securely</h3>
        <div className="rounded-xl shadow-md overflow-hidden border border-gray-200">
          <ZeffyDonation />
        </div>
      </section>

      {/* Why Support Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-10 text-center">Why Support FutureEra?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Accessible programs for all youth',
                desc: 'We focus on marginalized students, including newcomers, 2SLGBTQ+ youth, and low-income communities.',
              },
              {
                title: 'Led by youth, for youth',
                desc: 'Our programs are built with young leaders and student voices at the core.',
              },
              {
                title: 'Transparent impact',
                desc: 'We share our results through data reports, student stories, and community showcases.',
              },
              {
                title: 'Flexible support options',
                desc: 'We welcome individual, monthly, and in-kind support — whatever works for you.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="p-6 border rounded-xl shadow-sm bg-white">
                <h4 className="font-semibold text-lg mb-2">{title}</h4>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
