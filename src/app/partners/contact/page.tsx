export default function ContactPartnersPage() {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Let’s Work Together</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Have an idea? A question? Want to explore partnership possibilities? Whether you're a school, lab, organization,
          or individual, we’d love to hear from you.
        </p>
  
        <ul className="space-y-4 mb-8">
          <li><strong>📬 Email:</strong> <a href="mailto:info@futureera.foundation" className="text-blue-600 underline">info@futureera.foundation</a></li>
          <li><strong>📝 Form:</strong> <a href="/contact#partner-form" className="text-blue-600 underline">Partner Inquiry Form</a></li>
          <li><strong>📍 Location:</strong> Based in Toronto, working across Canada & globally</li>
        </ul>
  
        <h2 className="text-xl font-semibold mb-2">Common Inquiries</h2>
        <ul className="list-disc pl-6 text-muted-foreground">
          <li>“I want to bring your program to our school.”</li>
          <li>“How can my lab mentor a student?”</li>
          <li>“We’d love to sponsor your next event.”</li>
        </ul>
  
        <div className="mt-10">
          <a href="/contact#partner-form" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Submit a Partner Inquiry
          </a>
        </div>
      </div>
    );
  }
  