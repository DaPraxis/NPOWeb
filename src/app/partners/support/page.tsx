export default function SupportUsPage() {
    return (
      <div className="bg-white text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center h-[300px] md:h-[400px] flex items-center justify-center text-white" style={{ backgroundImage: "url('/your-banner.jpg')" }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <h1 className="z-10 text-4xl md:text-5xl font-bold">Support Us</h1>
        </section>
  
        {/* Impact Philosophy */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold mb-4">Be Part of the Impact</h2>
          <p className="text-muted-foreground text-lg mb-4">
            We believe philanthropy is about more than giving. It's about collaboration, shared values, and long-term relationships that empower youth.
          </p>
          <p className="text-muted-foreground">
            Join us in breaking down barriers and building an equitable future — one opportunity at a time.
          </p>
          <a
            href="/partners/contact"
            className="mt-6 inline-block px-6 py-3 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            Contact us
          </a>
        </section>
  
        {/* Why Support Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h3 className="text-2xl font-bold mb-10 text-center">Why Support FutureEra?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "We offer many ways to support.",
                  desc: "From monetary donations to mentorship and in-kind sponsorships — support comes in many forms.",
                },
                {
                  title: "We prove our impact.",
                  desc: "Our annual reports and stories highlight measurable change in student outcomes and equity access.",
                },
                {
                  title: "We welcome corporate partnerships.",
                  desc: "Collaborate through program sponsorship, mentorship, career exploration, or custom outreach.",
                },
                {
                  title: "We highlight your contributions.",
                  desc: "Sponsors are featured across our website, reports, and events as valued community champions.",
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
  