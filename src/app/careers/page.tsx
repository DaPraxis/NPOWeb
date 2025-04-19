export default function CareersLandingPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[350px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/your-careers-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="z-10 text-4xl font-bold">Careers & Volunteer Opportunities</h1>
      </section>

      {/* Intro Section */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Make Your Mark with FutureEra</h2>
        <p className="text-muted-foreground text-lg">
          Whether you're a student, an early-career professional, or an experienced changemaker — there's a place for
          you here. Join us to lead, inspire, and grow the next generation of youth innovators.
        </p>
      </section>

      {/* Opportunities Section */}
      <section className="max-w-5xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-10">
        {/* Instructor Role */}
        <div className="border rounded-xl p-6 bg-white shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">🏫 Instructors</h3>
          <p className="text-muted-foreground mb-4">
            Facilitate workshops, lead research programs, or mentor students as a part of our national instructor team.
          </p>
          <div className="flex flex-col gap-2">
            <a href="/careers/outreach" className="text-blue-600 underline font-medium">Outreach Instructor →</a>
            <a href="/careers/network" className="text-blue-600 underline font-medium">Network Instructor →</a>
          </div>
        </div>

        {/* Volunteer Role */}
        <div className="border rounded-xl p-6 bg-white shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">🙌 Student Volunteers</h3>
          <p className="text-muted-foreground mb-4">
            Support events, mentor peers, conduct research, or help behind the scenes — we welcome all who care.
          </p>
          <a href="/volunteer" className="text-blue-600 underline font-medium">Volunteer Opportunities →</a>
        </div>

        {/* Staff or Research Roles */}
        <div className="border rounded-xl p-6 bg-white shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">🧠 Staff & Research Roles</h3>
          <p className="text-muted-foreground mb-4">
            Join our core team working in project management, evaluation, research, communications, and partnerships.
          </p>
          <a href="/careers/openings" className="text-blue-600 underline font-medium">Current Openings →</a>
        </div>

        {/* General Expression of Interest */}
        <div className="border rounded-xl p-6 bg-white shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📬 Want to Join But Not Sure Where?</h3>
          <p className="text-muted-foreground mb-4">
            We’re always happy to connect with passionate people — even if there’s no posting yet.
          </p>
          <a href="/contact#careers" className="text-blue-600 underline font-medium">Send an Inquiry →</a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-16 px-6 bg-blue-50">
        <h2 className="text-2xl font-bold mb-4">Everyone shines, anywhere.</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          No matter your background or experience, if you're passionate about youth empowerment, education, and equity — we want to work with you.
        </p>
        <a
          href="/contact#careers"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Connect with Our Team
        </a>
      </section>
    </div>
  );
}
