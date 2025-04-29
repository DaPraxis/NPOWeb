export default function VolunteerPage() {
    return (
      <div className="bg-white text-gray-800">
        {/* Hero Section */}
        <section
          className="relative h-[350px] bg-cover bg-center flex items-center justify-center text-white"
          style={{ backgroundImage: "url('/your-volunteer-hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <h1 className="z-10 text-4xl font-bold">Volunteer With Us</h1>
        </section>
  
        {/* Intro Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold mb-4">Everyone Shines, Anywhere</h2>
          <p className="text-muted-foreground text-lg">
            Whether you're looking to give back, gain experience, or grow your network — volunteering with FutureEra means contributing to something bigger than yourself.
          </p>
        </section>
  
        {/* Why Volunteer Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            {[
              {
                title: "💡 Learn by Doing",
                desc: "From event planning to community research, you’ll get hands-on experience with real impact.",
              },
              {
                title: "🤝 Build Connections",
                desc: "Meet mentors, researchers, and youth leaders who care about social good and tech for change.",
              },
              {
                title: "🌍 Make an Impact",
                desc: "Help underrepresented youth access research, tools, and support they otherwise wouldn’t have.",
              },
              {
                title: "📄 Boost Your Portfolio",
                desc: "All volunteers receive mentorship, a certificate of service, and personalized reference letters.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="p-6 bg-white border rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>
  
        {/* Volunteer Roles */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">What Can You Do?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                role: "📢 Outreach & Events",
                desc: "Help plan, promote, and run FutureEra events, competitions, and community workshops.",
              },
              {
                role: "📊 Research Assistant",
                desc: "Support youth-led projects with data collection, analysis, and research communication.",
              },
              {
                role: "🧠 Peer Mentor",
                desc: "Offer guidance to younger high school students or help onboard new volunteers.",
              },
              {
                role: "🛠 Tech Support",
                desc: "Assist with web, design, or platform work during project showcases or training sessions.",
              },
            ].map(({ role, desc }) => (
              <div key={role} className="p-6 border rounded-lg bg-white shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{role}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>
  
        {/* Testimonials */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-8">What Our Volunteers Say</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Arjun',
                  pronouns: 'he/him',
                  quote: 'Volunteering here gave me the confidence to lead for the first time. It completely changed my path.',
                  avatar: '/avatars/avatar4.png',
                },
                {
                  name: 'Mei',
                  pronouns: 'she/her',
                  quote: 'I joined just to help — but I stayed for the community. Everyone here is so supportive and inspiring.',
                  avatar: '/avatars/avatar5.png',
                },
                {
                  name: 'Zara',
                  pronouns: 'they/them',
                  quote: 'I learned how to run events, speak publicly, and even helped publish a project. It was amazing!',
                  avatar: '/avatars/avatar6.png',
                },
              ].map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full mx-auto mb-4" />
                  <p className="italic text-muted-foreground mb-2">“{t.quote}”</p>
                  <p className="text-sm font-medium">{t.name} <span className="text-muted-foreground">({t.pronouns})</span></p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Call to Action */}
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Join the Movement</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Applications are open year-round. No experience required — just a passion to help and grow.
          </p>
          <a
            href="/careers/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Apply to Volunteer
          </a>
        </section>
      </div>
    );
  }
  