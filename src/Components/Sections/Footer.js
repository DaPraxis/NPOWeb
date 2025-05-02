// components/Footer.tsx
"use client"
export default function Footer() {
  return (
    <footer id="footer" className="bg-blue-900 text-white px-6 py-10 mt-10">
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
          <li><a href="/publication/CYJ-AI4Sci-2026" className="hover:underline">CYJ-AI4Sci Call for Papers!</a></li>
            <li><a href="/students" className="hover:underline">Our Programs</a></li>
            <li><a href="/partners" className="hover:underline">Future Partnership</a></li>
            <li><a href="mailto:info@futureera.org" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Join Our Community</h4>
          <p className="text-sm mb-4">Stay in the loop with upcoming opportunities and events.</p>
          <a href="https://discord.gg/6m48TqXE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-white text-blue-900 font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition">
                Join Our Discord
              </button>
            </a>
        </div>
      </div>
      <div className="mt-10 border-t border-white/20 pt-4 text-center text-xs text-white/80">
        © {new Date().getFullYear()} FutureEra Research Institute. All rights reserved.
      </div>
    </footer>
  )
}
