import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/Black Background.png';

const Privacy = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white min-h-screen font-inter">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pl-0 lg:pr-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center pl-0">
              <img src={logo} alt="Trader's Escape Logo" className="w-12 h-12 mr-2 rounded-full" />
              <div className="text-2xl font-bold text-blue-400">The Trader's Escape</div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium">
                Home
              </Link>
              <Link to="/#demat" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium">
                Need a Demat
              </Link>
              <Link to="/#tools" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium">
                Tools
              </Link>
              <Link to="/#learn" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium">
                Learn
              </Link>
              <Link to="/#help" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium">
                Help
              </Link>
             <button
                onClick={() => window.open('/login', '_blank')}
                className="relative bg-transparent border-2 border-cyan-400 text-cyan-400 px-4 py-1 rounded-lg font-bold transition-all duration-300 shadow-lg w-fit overflow-hidden group hover:text-black hover:border-cyan-300 neon-button"
                >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-75 blur-sm animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-white hover:text-blue-400 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden ${isMobileMenuOpen ? '' : 'hidden'} pb-4`}>
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2">
                Home
              </Link>
              <Link to="/#demat" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2">
                Need a Demat
              </Link>
              <Link to="/#tools" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2">
                Tools
              </Link>
              <Link to="/#learn" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2">
                Learn
              </Link>
              <Link to="/#help" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2">
                Help
              </Link>
             <button
                onClick={() => window.open('/login', '_blank')}
                className="relative bg-transparent border-2 border-cyan-400 text-cyan-400 px-4 py-1 rounded-lg font-bold transition-all duration-300 shadow-lg w-fit overflow-hidden group hover:text-black hover:border-cyan-300 neon-button"
                >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-75 blur-sm animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            </button>

            </div>
          </div>
        </div>
      </nav>

      {/* Privacy Policy Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Privacy & Policy
          </h1>
          <div className="text-gray-300 leading-relaxed space-y-6">
            <p><strong>Effective Date:</strong> July 15, 2025</p>
            <p><strong>Last Updated:</strong> July 15, 2025</p>
            <p>
              This Privacy Policy outlines how The Trader’s Escape (“we,” “our,” “us,” or “Platform”) collects, uses, stores, and protects your personal information when you access or use our website and services at{' '}
              <a href="https://www.thetradersescape.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                www.thetradersescape.com
              </a>{' '}
              (“Website”).
            </p>
            <p>By using our Platform, you consent to the practices described in this policy.</p>
            <h2 className="text-2xl font-semibold text-blue-300">1. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <h3 className="text-xl font-medium text-blue-200">a) Personal Information</h3>
            <ul className="list-disc pl-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Location (optional)</li>
              <li>Payment details (if purchasing a course or service)</li>
            </ul>
            <h3 className="text-xl font-medium text-blue-200">b) Usage Data</h3>
            <ul className="list-disc pl-6">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>Referring pages</li>
              <li>Device type</li>
            </ul>
            <h3 className="text-xl font-medium text-blue-200">c) Cookies</h3>
            <p>We use cookies and similar tracking technologies to enhance your browsing experience. You may disable cookies through your browser settings.</p>
            <h2 className="text-2xl font-semibold text-blue-300">2. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-6">
              <li>Deliver and improve our educational services</li>
              <li>Respond to your inquiries or requests</li>
              <li>Send newsletters or updates (only if you opt-in)</li>
              <li>Analyze traffic and user behavior to optimize the platform</li>
              <li>Process payments for paid services</li>
            </ul>
            <p>Note: We do not use your data to offer stock tips, investment advice, or marketing from third-party advisors.</p>
            <h2 className="text-2xl font-semibold text-blue-300">3. Sharing Your Information</h2>
            <p>We do not sell, rent, or trade your personal information with third parties.</p>
            <p>We may share your data:</p>
            <ul className="list-disc pl-6">
              <li>With trusted service providers (e.g., payment gateways, email delivery tools) under strict confidentiality</li>
              <li>If required by law, regulatory authorities, or legal proceedings</li>
            </ul>
            <h2 className="text-2xl font-semibold text-blue-300">4. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data, including:</p>
            <ul className="list-disc pl-6">
              <li>SSL encryption</li>
              <li>Secure payment gateways</li>
              <li>Firewalls and regular security audits</li>
            </ul>
            <p>However, no online transmission is 100% secure. Use the platform at your own risk.</p>
            <h2 className="text-2xl font-semibold text-blue-300">5. User Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6">
              <li>Access your personal information</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p>
              To exercise your rights, contact us at{' '}
              <a href="mailto:support@thetradersescape.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                support@thetradersescape.com
              </a>.
            </p>
            <h2 className="text-2xl font-semibold text-blue-300">6. Children's Privacy</h2>
            <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect data from minors.</p>
            <h2 className="text-2xl font-semibold text-blue-300">7. External Links</h2>
            <p>Our website may contain links to third-party sites (e.g., brokers, educational partners). We are not responsible for their privacy practices. We encourage you to read their privacy policies.</p>
            <h2 className="text-2xl font-semibold text-blue-300">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated “Last Updated” date. Continued use of the site constitutes your agreement to the revised policy.</p>
            <h2 className="text-2xl font-semibold text-blue-300">9. Contact Us</h2>
            <p>If you have any questions, concerns, or complaints regarding this Privacy Policy or data handling practices, contact us at:</p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:support@thetradersescape.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                support@thetradersescape.com
              </a>
            </p>
            <p><strong>Address:</strong> 123 Trading Street, Mumbai, Maharashtra, India</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900/50 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold text-blue-400 mb-4">📈 The Trader's Escape</div>
          <p className="text-gray-400">Empowering traders through education, not speculation.</p>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;