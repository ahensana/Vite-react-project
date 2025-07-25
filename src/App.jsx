import { useState } from 'react'
import './App.css'
import logo from './assets/Black Background.png';
import video from './assets/videoplayback.webm';
import stockImage from './assets/stock.jpg';
import { Link } from 'react-router-dom';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleChatOptions = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleChatbotClick = () => {
    alert('Chatbot functionality would be implemented here. This is a demo version.');
    setIsChatOpen(false);
  };

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white min-h-screen relative font-inter">
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
              <Link to="/#home" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium" onClick={(e) => handleSmoothScroll(e, '#home')}>
                Home
              </Link>
              <Link to="/#demat" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium" onClick={(e) => handleSmoothScroll(e, '#demat')}>
                Need a Demat
              </Link>
              <Link to="/#tools" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium" onClick={(e) => handleSmoothScroll(e, '#tools')}>
                Tools
              </Link>
              <Link to="/#learn" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium" onClick={(e) => handleSmoothScroll(e, '#learn')}>
                Learn
              </Link>
              <Link to="/#help" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium" onClick={(e) => handleSmoothScroll(e, '#help')}>
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
              <Link to="/#home" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2" onClick={(e) => handleSmoothScroll(e, '#home')}>
                Home
              </Link>
              <Link to="/#demat" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2" onClick={(e) => handleSmoothScroll(e, '#demat')}>
                Need a Demat
              </Link>
              <Link to="/#tools" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2" onClick={(e) => handleSmoothScroll(e, '#tools')}>
                Tools
              </Link>
              <Link to="/#learn" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2" onClick={(e) => handleSmoothScroll(e, '#learn')}>
                Learn
              </Link>
              <Link to="/#help" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2" onClick={(e) => handleSmoothScroll(e, '#help')}>
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

      {/* Hero Section */}
      <section id="home" className="min-h-screen py-20 px-4 relative overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={video} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-none"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col justify-center h-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
            The Trader's Escape
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-8 font-light">Your Gateway to Smarter Trading</p>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            At The Trader's Escape, we believe that every successful trader starts with a strong foundation. Whether you're just beginning your journey in the stock market or looking to sharpen your skills, our platform is designed to empower you with clear, structured, and easy-to-follow educational resources.
          </p>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We provide access to a wide range of tools and learning modules that simplify complex trading concepts — helping you understand the market faster and make informed decisions.
          </p>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 px-4 bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${stockImage})` }}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-300">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Beginner-Friendly Learning Paths</h3>
              <p className="text-gray-300 leading-relaxed">
                Learn the basics of stock market investing, trading strategies, technical indicators, and risk management — even if you've never traded before.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Enhanced Tools for Traders</h3>
              <p className="text-gray-300 leading-relaxed">
                From curated resources to smart calculators and cheat sheets — get the edge you need to build confidence in every trade.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-4 text-blue-300">No Tips, No Hype — Just Education</h3>
              <p className="text-gray-300 leading-relaxed">
                We are not a tip provider. We do not give buy/sell calls or market recommendations. Our mission is to equip you with knowledge, not noise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Links Section */}
      <section className="py-8 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link to="/disclaimer" className="legal-link bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 text-blue-400 hover:text-blue-300 font-medium border border-white/20">
              Disclaimer
            </Link>
            <Link to="/terms" className="legal-link bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 text-blue-400 hover:text-blue-300 font-medium border border-white/20">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="legal-link bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 text-blue-400 hover:text-blue-300 font-medium border border-white/20">
              Privacy & Policy
            </Link>
            <Link to="/risk-disclosure" className="legal-link bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 text-blue-400 hover:text-blue-300 font-medium border border-white/20">
              Risk Disclosure Statement
            </Link>
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

      {/* Chat Icon */}
      <button
        onClick={toggleChatOptions}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200 z-50"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Chat Options Dropdown */}
      <div
        className={`fixed bottom-20 right-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg z-50 transition-opacity transform ${isChatOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <button onClick={handleChatbotClick} className="block w-full text-left px-4 py-3 text-blue-400 hover:bg-white/15 hover:text-blue-300 transition-colors duration-200">
          Chatbot
        </button>
        <Link to="/community-chat" className="block w-full text-left px-4 py-3 text-blue-400 hover:bg-white/15 hover:text-blue-300 transition-colors duration-200">
          Community Chat
        </Link>
      </div>
    </div>
  );
};

export default App