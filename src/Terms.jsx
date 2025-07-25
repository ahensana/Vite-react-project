import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/Black Background.png';

const Terms = () => {
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

      {/* Terms and Conditions Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <div className="text-gray-300 leading-relaxed space-y-6">
            <p><strong>Effective Date:</strong> July 15, 2025</p>
            <p><strong>Last Updated:</strong> July 15, 2025</p>
            <p>
              Welcome to The Trader’s Escape (“Website,” “Platform,” “we,” “us,” or “our”). Please read these Terms and Conditions (“Terms”) carefully before using our website, services, tools, or content.
            </p>
            <p>
              By accessing or using <a href="https://www.thetradersescape.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                www.thetradersescape.com
              </a>, you agree to be legally bound by these Terms. If you do not agree with any part of these Terms, please do not access or use the Platform.
            </p>
            <h2 className="text-2xl font-semibold text-blue-300">1. Educational Purpose Only</h2>
            <p>All content, materials, courses, videos, tools, and resources provided on this platform are strictly for educational and informational purposes only.</p>
            <p>We do not provide:</p>
            <ul className="list-disc pl-6">
              <li>Stock tips</li>
              <li>Buy/sell recommendations</li>
              <li>Personalized financial advice</li>
              <li>Investment calls or portfolio management</li>
            </ul>
            <p>We are not SEBI-registered investment advisors or research analysts.</p>
            <h2 className="text-2xl font-semibold text-blue-300">2. User Responsibilities</h2>
            <p>By using this website, you agree:</p>
            <ul className="list-disc pl-6">
              <li>To use the content for personal, non-commercial, and educational purposes only.</li>
              <li>That you are solely responsible for any financial decisions made based on the content.</li>
              <li>To not hold The Trader’s Escape, its team, or any contributors liable for your trading/investment outcomes.</li>
            </ul>
            <h2 className="text-2xl font-semibold text-blue-300">3. No Liability</h2>
            <p>Trading and investing in the stock market involve financial risk. You may lose part or all of your capital. Past performance is not indicative of future results.</p>
            <p>We shall not be held responsible for any:</p>
            <ul className="list-disc pl-6">
              <li>Financial loss or gain</li>
              <li>Emotional, legal, or financial consequences arising from the use of our content or tools</li>
            </ul>
            <h2 className="text-2xl font-semibold text-blue-300">4. Intellectual Property</h2>
            <p>All content, including but not limited to:</p>
            <ul className="list-disc pl-6">
              <li>Videos, articles, graphics, logos, icons, tools, and software</li>
            </ul>
            <p>is the intellectual property of The Trader’s Escape and is protected under applicable copyright and trademark laws.</p>
            <p>You may not copy, modify, distribute, reproduce, or republish any part of the platform without written permission.</p>
            <h2 className="text-2xl font-semibold text-blue-300">5. Paid Services & Refunds</h2>
            <p>Some content may be available for a fee (e.g., premium courses, downloadable tools, webinars). All payments made are non-refundable unless specifically stated.</p>
            <p>You agree not to share paid materials with others without our consent.</p>
            <h2 className="text-2xl font-semibold text-blue-300">6. Third-Party Links & Affiliates</h2>
            <p>This website may contain links to third-party websites (e.g., brokers, tools, platforms). These are provided for convenience and informational purposes only.</p>
            <p>We may receive compensation through affiliate programs. However, this does not affect our content integrity. We are not responsible for the services or practices of third-party sites.</p>
            <h2 className="text-2xl font-semibold text-blue-300">7. User Conduct</h2>
            <p>You agree to not:</p>
            <ul className="list-disc pl-6">
              <li>Post or share misleading information</li>
              <li>Promote tips, paid groups, or unauthorized advisory services</li>
              <li>Harass, spam, or disrupt the community or other users</li>
            </ul>
            <p>We reserve the right to terminate access for users violating these terms.</p>
            <h2 className="text-2xl font-semibold text-blue-300">8. Privacy Policy</h2>
            <p>
              By using the site, you agree to our <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Privacy Policy</Link> which outlines how we collect, use, and protect your data.
            </p>
            <h2 className="text-2xl font-semibold text-blue-300">9. Changes to Terms</h2>
            <p>We may update these Terms at any time without prior notice. Continued use of the website after such updates will mean you accept the revised Terms.</p>
            <h2 className="text-2xl font-semibold text-blue-300">10. Governing Law</h2>
            <p>These Terms shall be governed and interpreted in accordance with the laws of India. Any disputes arising out of these Terms shall fall under the jurisdiction of the courts in Mumbai, Maharashtra.</p>
            <h2 className="text-2xl font-semibold text-blue-300">11. Contact Us</h2>
            <p>If you have any questions or concerns about these Terms, you may contact us at:</p>
            <p><strong>Email:</strong> support@thetradersescape.com</p>
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

export default Terms;