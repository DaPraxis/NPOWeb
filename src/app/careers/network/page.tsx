export default function NetworkInstructorPage() {
    return (
      <div className="bg-white text-gray-800">
        {/* Hero Section */}
        <section className="relative h-[350px] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('/your-network-banner.jpg')" }}>
          <div className="absolute inset-0 bg-black/40" />
          <h1 className="z-10 text-4xl font-bold text-center px-4">Become a Network Member Instructor</h1>
        </section>
  
        {/* Intro Section */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-lg text-muted-foreground mb-6">
            Each year, we hire dozens of talented university students and early-career professionals to join our national network of instructors.
          </p>
          <p className="text-muted-foreground mb-8">
            These instructors lead programs on campus, in schools, and in local communities — bringing hands-on learning, research mentoring, and personal growth opportunities to high school youth.
          </p>
  
          <p className="italic font-medium text-gray-700">It’s more than just a job. It’s a chance to lead, grow, and give back.</p>
        </section>
  
        {/* Benefits Section */}
        <section className="bg-gray-50 py-12 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              {
                title: "💬 Career Training",
                desc: "Receive training in communication, inclusive education, and community leadership.",
              },
              {
                title: "🧠 Mentorship & Support",
                desc: "Work with expert mentors in STEM, social science, or education throughout the program.",
              },
              {
                title: "🌎 Community Impact",
                desc: "You’ll make a difference in real schools, real lives, and real futures.",
              },
              {
                title: "📈 Future Ready Skills",
                desc: "Gain experience in team facilitation, event delivery, and project-based learning.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="p-6 border rounded-lg bg-white shadow-sm">
                <h4 className="text-lg font-semibold mb-2">{title}</h4>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>
  
        {/* Call to Action */}
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Ready to apply?</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking for compassionate and committed instructors to join our growing team.
          </p>
          <a
            href="/careers/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Contact Us to Learn More
          </a>
        </section>
      </div>
    );
  }
  