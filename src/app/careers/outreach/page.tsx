'use client';
import { useState } from 'react';

const faqs = [
  {
    q: 'Who are Outreach Instructors?',
    a: 'They are post-secondary students or recent grads who lead community-based STEM programs in underserved regions.',
  },
  {
    q: 'What do Outreach Instructors do?',
    a: 'They travel to deliver workshops, camps, and programs in communities not yet reached by our network — promoting access, equity, and fun!',
  },
  {
    q: 'Who should apply?',
    a: 'Passionate leaders who care about youth empowerment, diversity, and hands-on learning. No teaching experience needed.',
  },
];

const testimonials = [
  {
    name: 'Morgan',
    pronouns: 'she/her',
    quote: "It was one of the most eye-opening, fulfilling experiences I’ve had. I saw firsthand how much mentorship matters.",
    avatar: '/avatars/avatar1.png',
  },
  {
    name: 'James',
    pronouns: 'he/him',
    quote: "I didn’t just teach — I grew as a leader, learner, and human. I’d recommend it to anyone.",
    avatar: '/avatars/avatar2.png',
  },
  {
    name: 'Emily',
    pronouns: 'she/they',
    quote: "As someone who came from a marginalized background, it felt amazing to give back to similar communities.",
    avatar: '/avatars/avatar3.png',
  },
];

export default function OutreachPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="bg-white text-gray-800">
      {/* Hero */}
      <section className="relative h-[350px] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('/your-outreach-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="z-10 text-4xl font-bold">Become an Outreach Instructor</h1>
      </section>

      {/* Description */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-lg text-muted-foreground mb-6">
          Every year, we hire 15–20 passionate instructors to lead and deliver spring/summer programs in underserved communities.
        </p>
        <p className="text-muted-foreground mb-8">
          You’ll travel, teach, inspire, and make a real difference where it matters most.
        </p>

        <div className="w-full h-[240px] md:h-[320px] rounded-xl overflow-hidden relative">
          <img src="/your-outreach-team.jpg" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button className="px-6 py-2 bg-white text-blue-600 font-medium rounded-full shadow-lg hover:bg-blue-100 transition">Discover the Experience</button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-lg">
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full text-left px-4 py-3 font-medium text-blue-600"
              >
                {faq.q}
              </button>
              {open === idx && <div className="px-4 pb-4 text-muted-foreground">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full mb-4" />
              <p className="italic text-muted-foreground mb-2">“{t.quote}”</p>
              <p className="text-sm font-medium">{t.name} <span className="text-muted-foreground">({t.pronouns})</span></p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
