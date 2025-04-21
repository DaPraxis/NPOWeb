export default function PartnerOpportunities() {
    return (
      <div className="max-w-3xl mx-auto px-6 pt-26">
        <h1 className="text-4xl font-bold mb-6">Collaborate on High-Impact Opportunities</h1>
        <p className="text-lg text-muted-foreground mb-10">
          From hosting research projects to mentoring students, there are countless ways to contribute to real-world
          change. FutureEra is powered by passionate people and forward-thinking institutions — and we’d love to have you
          join us.
        </p>
  
        <ul className="space-y-6">
          <li>
            <h2 className="text-xl font-semibold">🎓 Host a Youth Researcher</h2>
            <p className="text-muted-foreground">Provide mentorship or lab experience on your research projects.</p>
          </li>
          <li>
            <h2 className="text-xl font-semibold">💡 Co-Create a Program</h2>
            <p className="text-muted-foreground">Design workshops, fellowships, or competitions with us.</p>
          </li>
          <li>
            <h2 className="text-xl font-semibold">👨‍🏫 Mentor or Judge</h2>
            <p className="text-muted-foreground">Review student work, offer guidance, or mentor program cycles.</p>
          </li>
          <li>
            <h2 className="text-xl font-semibold">🎤 Guest Speak</h2>
            <p className="text-muted-foreground">Inspire students with your academic or career story.</p>
          </li>
        </ul>
  
        <div className="mt-10">
          <a href="/partners/contact" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Contact Us to Collaborate
          </a>
        </div>
      </div>
    );
  }
  