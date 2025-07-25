import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/Black Background.png';

const RiskDisclosure = () => {
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

      {/* Risk Disclosure Statement Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Risk Disclosure Statement
          </h1>
          <div className="text-gray-300 leading-relaxed space-y-6">
            <p>Trading and investing in the financial markets involves significant risk. The information, education, tools, and resources provided by The Trader’s Escape are intended solely for informational and educational purposes.</p>
            <p>We urge you to read this Risk Disclosure Statement carefully before using any part of our website or acting upon any educational content provided.</p>
            <h2 className="text-2xl font-semibold text-blue-300">1. Market Risk</h2>
            <p>The stock market is inherently volatile. Securities prices can fluctuate significantly due to factors such as:</p>
            <ul className="list-disc pl-6">
              <li>Macroeconomic events</li>
              <li>Global market influences</li>
              <li>Political developments</li>
              <li>Company-specific news</li>
            </ul>
            <p>There is no assurance of profit and a high probability of losses, including potential loss of capital.</p>
            <h2 className="text-2xl font-semibold text-blue-300">2. No Guarantees</h2>
            <p>We do not guarantee the accuracy, completeness, or reliability of any content, tools, or examples shared.</p>
            <p>Past performance — whether simulated or actual — is not indicative of future results.</p>
            <p>The Trader’s Escape does not make any warranties or representations regarding outcomes from using any strategies or tools discussed.</p>
            <h2 className="text-2xl font-semibold text-blue-300">3. No Personalized Advice</h2>
            <p>The Trader’s Escape is not a registered investment advisor and does not provide:</p>
            <ul className="list-disc pl-6">
              <li>Investment recommendations</li>
              <li>Personal portfolio management</li>
              <li>Buy/sell/hold advice for specific securities</li>
            </ul>
            <p>For personal investment decisions, we strongly recommend consulting a SEBI-registered Investment Advisor or Research Analyst.</p>
            <h2 className="text-2xl font-semibold text-blue-300">4. Leverage and Derivatives</h2>
            <p>Trading in futures, options, and other leveraged instruments involves additional risk and is not suitable for all investors. Leverage can work against you as well as for you.</p>
            <p>Users must understand:</p>
            <ul className="list-disc pl-6">
              <li>Margin requirements</li>
              <li>Stop-loss strategies</li>
              <li>Risk-reward ratios</li>
            </ul>
            <p>Before engaging in such instruments, ensure you are financially and emotionally prepared to manage rapid losses.</p>
            <h2 className="text-2xl font-semibold text-blue-300">5. User Accountability</h2>
            <p>Any trades, investments, or financial decisions made based on content from The Trader’s Escape are solely your responsibility. We will not be liable for any losses, legal issues, or liabilities incurred as a result.</p>
            <p>By accessing and using this platform, you confirm that you understand and accept the risks associated with trading and investing.</p>
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

export default RiskDisclosure;