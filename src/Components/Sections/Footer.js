// components/Footer.tsx
"use client"
export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white px-6 py-10 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-xl font-semibold mb-4">About FutureEra</h4>
          <p className="text-sm leading-relaxed">
            We’re a youth-led nonprofit helping high school students launch research and innovation projects with real-world impact. 
            From lab mentorship to startup support — your journey starts here.
          </p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#why-wrapper" className="hover:underline">Our Programs</a></li>
            <li><a href="#cards-start" className="hover:underline">Featured Projects</a></li>
            <li><a href="#contact" className="hover:underline">Get Involved</a></li>
            <li><a href="mailto:info@futureera.org" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Join Our Community</h4>
          <p className="text-sm mb-4">Stay in the loop with upcoming opportunities and events.</p>
          <button className="bg-white text-blue-900 font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition">
            Join Our Discord
          </button>
        </div>
      </div>
      <div className="mt-10 border-t border-white/20 pt-4 text-center text-xs text-white/80">
        © {new Date().getFullYear()} FutureEra Research Institute. All rights reserved.
      </div>
    </footer>
  )
}
