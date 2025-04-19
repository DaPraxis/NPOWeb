export default function CareersPage() {
    return (
      <div className="bg-white text-gray-800">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Teach. Inspire. Grow.</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            FutureEra instructors and volunteers empower youth through meaningful, equitable programs across Canada.
          </p>
        </section>
  
        {/* Two Instructor Paths */}
        <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-2">🌍 Outreach Instructors</h2>
            <p className="text-muted-foreground mb-4">
              Lead seasonal programs in communities underrepresented in STEM. Engage with youth in hands-on and high-impact settings.
            </p>
            <a href="/careers/outreach" className="text-blue-600 underline">Learn more</a>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">🏫 Network Member Instructors</h2>
            <p className="text-muted-foreground mb-4">
              Join our national network and lead programming in schools and labs. Inspire the next generation through research and mentorship.
            </p>
            <a href="/careers/network" className="text-blue-600 underline">Learn more</a>
          </div>
        </section>
  
        {/* Core Values */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h3 className="text-2xl font-bold mb-10 text-center">Our Core Values</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Equity", desc: "We prioritize access and remove systemic barriers across all programs." },
                { title: "Community", desc: "We uplift local voices and build together, not for." },
                { title: "Confidence", desc: "We help youth grow through mentorship, safety, and support." },
                { title: "Curiosity", desc: "We value questioning, learning, and dreaming beyond limits." },
              ].map(({ title, desc }) => (
                <div key={title} className="p-6 border rounded-xl bg-white shadow-sm">
                  <h4 className="text-lg font-semibold mb-2">{title}</h4>
                  <p className="text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Open Positions */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-6">Open Positions</h2>
  
          <div className="border-l-4 border-blue-600 pl-4 mb-8">
            <h3 className="text-xl font-semibold">Evaluation and Research Coordinator</h3>
            <p className="text-muted-foreground text-sm">Location: Toronto | Contract: Full-time</p>
            <p className="mt-2 text-muted-foreground">
              Help drive program evaluation and outcomes reporting for youth impact across Canada.
              <a href="#" className="text-blue-600 underline ml-1">Learn more</a>
            </p>
            <a
              href="#"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply now
            </a>
          </div>
        </section>
      </div>
    );
  }
  