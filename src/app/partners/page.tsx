export default function PartnersPage() {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Partner with FutureEra</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Empowering youth through research, innovation, and equity — together. We invite schools, organizations,
          mentors, and sponsors to join us in shaping the next generation of changemakers.
        </p>
  
        <div className="grid gap-8 md:grid-cols-2">
          <div className="p-6 border rounded-xl shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-2">🔬 University & Research Labs</h2>
            <p className="text-muted-foreground">
              Open your lab to bright young minds. Inspire curiosity through hands-on learning.
            </p>
          </div>
          <div className="p-6 border rounded-xl shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-2">🏫 Schools & Educators</h2>
            <p className="text-muted-foreground">
              Bring our programs to your students. Host workshops, start clubs, or refer standout students.
            </p>
          </div>
          <div className="p-6 border rounded-xl shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-2">👩‍💼 Mentors & Professionals</h2>
            <p className="text-muted-foreground">
              Share your journey, offer guidance, or judge a competition. Be the mentor you wish you had.
            </p>
          </div>
          <div className="p-6 border rounded-xl shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-2">🤝 Sponsors & Donors</h2>
            <p className="text-muted-foreground">
              Fuel our mission. From funding to in-kind support, your help creates access and opportunity.
            </p>
          </div>
        </div>
  
        <div className="mt-12 flex flex-wrap gap-4">
          <a href="/partners/opportunities" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Explore Opportunities</a>
          <a href="/partners/support" className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Support Us</a>
          <a href="/partners/contact" className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100">Get in Touch</a>
        </div>
      </div>
    );
  }
  