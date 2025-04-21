'use client';

import dynamic from 'next/dynamic';
const SimplexBranches = dynamic(() => import('@/Components/Animation/SimpleBranches'), {
  ssr: false,
});

// import SimplexBranches from '@/Components/Animation/SimpleBranches';

export default function ContactStudentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-10">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        {/* Left: MotionGrid (40%) */}
        <div className="md:w-[40%] w-full">
          <SimplexBranches canvasSize={400}/>
        </div>

        {/* Right: Student/Research Inquiry */}
        <div className="md:w-[60%] w-full">
          <h1 className="text-4xl font-bold mb-6">Get Involved with FutureEra</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're a student seeking mentorship, a volunteer looking to contribute, or a researcher hoping to join our team — we want to hear from you.
          </p>

          <ul className="space-y-4 mb-8">
            <li><strong>📬 Email:</strong> <a href="mailto:general@futureera.foundation" className="text-blue-600 underline">general@futureera.foundation</a></li>
            <li><strong>📝 Form:</strong> <a href="/contact#careers" className="text-blue-600 underline">Career & Volunteer Inquiry Form</a></li>
            <li><strong>🌐 Location:</strong> Based in Toronto, supporting youth across Canada & beyond</li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">Common Inquiries</h2>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>“I’d love to volunteer for an upcoming program.”</li>
            <li>“Are there current openings for research roles?”</li>
            <li>“Can I get involved as a student or early-career instructor?”</li>
          </ul>

          <div className="mt-10">
            <a href="/contact#careers" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Submit an Inquiry
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
