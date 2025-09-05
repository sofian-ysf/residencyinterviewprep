import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">MyERAS Reviewer</h3>
            <p className="text-sm text-gray-600">Expert ERAS application review and optimization services.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4 text-sm">Services</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/services/personal-statement" className="hover:text-gray-900 transition-colors">Personal Statement</Link></li>
              <li><Link href="/services/experiences" className="hover:text-gray-900 transition-colors">Experience Descriptions</Link></li>
              <li><Link href="/services/letters" className="hover:text-gray-900 transition-colors">Letters of Recommendation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4 text-sm">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link></li>
              <li><Link href="/guides" className="hover:text-gray-900 transition-colors">Application Guides</Link></li>
              <li><Link href="/timeline" className="hover:text-gray-900 transition-colors">ERAS Timeline</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-gray-900 transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-600 text-center">
            © 2025 MyERAS Reviewer. All rights reserved. HIPAA Compliant.
          </p>
        </div>
      </div>
    </footer>
  );
}