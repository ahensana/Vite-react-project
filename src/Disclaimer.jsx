import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/Black Background.png';

const Disclaimer = () => {
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

      {/* Disclaimer Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Disclaimer
          </h1>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <p className="text-gray-300 leading-relaxed mb-6">
              The information provided on The Trader’s Escape (
              <a href="http://www.thetradersescape.com" className="text-blue-400 hover:text-blue-300">
                www.thetradersescape.com
              </a>
              ) is strictly for educational and informational purposes only.
            </p>
            <h2 className="text-xl font-semibold text-blue-300 mb-4">What We Do Not Provide</h2>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-6">
              <li>Stock tips or buy/sell recommendations</li>
              <li>Portfolio management services</li>
              <li>Personalized investment advice</li>
              <li>Intraday or positional trading calls</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mb-6">
              All content — including courses, videos, tools, strategies, and articles — is intended to help users understand stock market concepts, not to serve as financial advice.
            </p>
            <h2 className="text-xl font-semibold text-blue-300 mb-4">No SEBI Registration</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              The Trader’s Escape, its founders, and contributors are not SEBI-registered investment advisors or research analysts unless specifically stated.
            </p>
            <h2 className="text-xl font-semibold text-blue-300 mb-4">No Guarantees or Assured Returns</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Trading and investing in the stock market involve risk, including the loss of capital. Past performance is not indicative of future results. Any strategies or tools discussed are for academic understanding and may not suit all individuals or situations.
            </p>
            <h2 className="text-xl font-semibold text-blue-300 mb-4">User Responsibility</h2>
            <p className="text-gray-300 leading-relaxed mb-6">Users are solely responsible for:</p>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-6">
              <li>Evaluating the information provided</li>
              <li>Making independent financial decisions</li>
              <li>Consulting with a SEBI-registered financial advisor before taking market positions</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mb-6">
              By using this website, you agree that The Trader’s Escape and its team shall not be held liable for any direct or indirect losses incurred from the use of our content or services.
            </p>
            <h2 className="text-xl font-semibold text-blue-300 mb-4">Affiliate Disclosure</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Some links on our platform may be affiliate links. This means we may earn a small commission at no extra cost to you if you sign up or purchase through these links. These affiliations do not influence our educational content.
            </p>
            <h2 className="text-xl font-semibold text-blue-300 mb-4">Community Conduct</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              We do not allow users to post or promote unauthorized advisory services, tips, or calls in any of our learning communities (e.g., Telegram, Discord, Forums, or Comments). Violators will be removed and blocked.
            </p>
            <p className="text-gray-300 leading-relaxed font-semibold">
              By continuing to access this platform, you acknowledge and agree to all parts of this disclaimer.
            </p>
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

export default Disclaimer;