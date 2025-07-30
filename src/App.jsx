import { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/Black Background.png';
import video from './assets/videoplayback.webm';
import { Link } from 'react-router-dom';
import angelOneLogo from './assets/angel_one.png';
import fyersLogo from './assets/fyers.png';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDematPopupOpen, setIsDematPopupOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [formStatus, setFormStatus] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Prevent scrolling when popup is open
  useEffect(() => {
    if (isDematPopupOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isDematPopupOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleChatOptions = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleAccountOptions = () => {
    setIsAccountOpen(!isAccountOpen);
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

  const handleDematClick = (e) => {
    e.preventDefault();
    setIsDematPopupOpen(true);
  };

  const closeDematPopup = () => {
    setIsDematPopupOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAccountOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setEmailError(isValidEmail || value === '' ? '' : 'Please enter a valid email');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!isValidEmail) {
      setEmailError('Please enter a valid email');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setFormStatus('You must be logged in to send a message.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setEmailError('');
        setTimeout(() => setFormStatus(''), 3000);
      } else {
        const errorData = await response.json();
        setFormStatus(errorData.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setFormStatus('Failed to send message. Please try again.');
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white min-h-screen relative font-inter">
      {/* Fixed Video Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={video} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-none"></div>
      </div>

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
              <Link
                to="/#home"
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium"
                onClick={(e) => handleSmoothScroll(e, '#home')}
              >
                Home
              </Link>
              <Link
                to="/#demat"
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium"
                onClick={handleDematClick}
              >
                Need a Demat
              </Link>
              <Link
                to="/#tools"
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium"
                onClick={(e) => handleSmoothScroll(e, '#tools')}
              >
                Tools
              </Link>
              <Link
                to="/#learn"
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium"
                onClick={(e) => handleSmoothScroll(e, '#learn')}
              >
                Learn
              </Link>
              <Link
                to="/#help"
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium"
                onClick={(e) => handleSmoothScroll(e, '#help')}
              >
                Help
              </Link>
              {isLoggedIn ? (
                <div className="relative">
                  <div
                    className="text-white hover:text-blue-400 transition-colors duration-200 font-medium cursor-pointer"
                    onClick={toggleAccountOptions}
                  >
                    Account
                  </div>
                  <div
                    className={`absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg z-50 transition-all duration-300 ease-in-out transform ${
                      isAccountOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                  >
                    <Link
                      to="/profile"
                      className="block w-full text-left px-4 py-3 text-blue-400 hover:bg-white/15 hover:text-blue-300 transition-colors duration-200"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-blue-400 hover:bg-white/15 hover:text-blue-300 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => window.open('/login', '_blank')}
                  className="relative bg-transparent border-2 border-cyan-400 text-cyan-400 px-4 py-1 rounded-lg font-bold transition-all duration-300 shadow-lg w-fit overflow-hidden group hover:text-black hover:border-cyan-300 neon-button"
                >
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-75 blur-sm animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                </button>
              )}
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
              <Link
                to="/#home"
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2"
                onClick={(e) => handleSmoothScroll(e, '#home')}
              >
                Home
              </Link>
              <Link
                to="/#demat"
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2"
                onClick={handleDematClick}
              >
                Need a Demat
              </Link>
              <Link
                to="/#tools"
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2"
                onClick={(e) => handleSmoothScroll(e, '#tools')}
              >
                Tools
              </Link>
              <Link
                to="/#learn"
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2"
                onClick={(e) => handleSmoothScroll(e, '#learn')}
              >
                Learn
              </Link>
              <Link
                to="/#help"
                className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2"
                onClick={(e) => handleSmoothScroll(e, '#help')}
              >
                Help
              </Link>
              {isLoggedIn ? (
                <div className="relative">
                  <div
                    className="text-white hover:text-blue-400 transition-colors duration-200 font-medium py-2 cursor-pointer"
                    onClick={toggleAccountOptions}
                  >
                    Account
                  </div>
                  <div
                    className={`mt-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg transition-all duration-300 ease-in-out transform ${
                      isAccountOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                  >
                    <Link
                      to="/profile"
                      className="block w-full text-left px-4 py-3 text-blue-400 hover:bg-white/15 hover:text-blue-300 transition-colors duration-200"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-blue-400 hover:bg-white/15 hover:text-blue-300 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => window.open('/login', '_blank')}
                  className="relative bg-transparent border-2 border-cyan-400 text-cyan-400 px-4 py-1 rounded-lg font-bold transition-all duration-300 shadow-lg w-fit overflow-hidden group hover:text-black hover:border-cyan-300 neon-button"
                >
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-75 blur-sm animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center flex flex-col justify-center h-full">
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

      {/* Demat Popup */}
      {isDematPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg border border-white/20">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4 sm:mb-6 text-center">
              Choose a Demat Account Provider
            </h2>
            <div className="flex flex-col items-center space-y-4 sm:space-y-6">
              <img
                src={angelOneLogo}
                alt="Angel One"
                onClick={() => {
                  window.open('https://www.angelone.in/', '_blank');
                  closeDematPopup();
                }}
                className="cursor-pointer w-32 sm:w-40 hover:scale-105 transition-transform duration-200"
              />
              <img
                src={fyersLogo}
                alt="Fyers"
                onClick={() => {
                  window.open('https://www.fyers.in/', '_blank');
                  closeDematPopup();
                }}
                className="cursor-pointer w-32 sm:w-40 hover:scale-105 transition-transform duration-200"
              />
              <button
                onClick={closeDematPopup}
                className="bg-transparent border border-blue-400 text-blue-400 hover:text-blue-300 hover:border-blue-300 px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* What We Offer Section */}
      <section id="what-we-offer" className="py-20 px-4 relative z-10">
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
      <section className="py-8 px-4 bg-slate-900/50 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link
              to="/disclaimer"
              className="legal-link bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 text-blue-400 hover:text-blue-300 font-medium border border-white/20"
            >
              Disclaimer
            </Link>
            <Link
              to="/terms"
              className="legal-link bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 text-blue-400 hover:text-blue-300 font-medium border border-white/20"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy"
              className="legal-link bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 text-blue-400 hover:text-blue-300 font-medium border border-white/20"
            >
              Privacy & Policy
            </Link>
            <Link
              to="/risk-disclosure"
              className="legal-link bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 text-blue-400 hover:text-blue-300 font-medium border border-white/20"
            >
              Risk Disclosure Statement
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 border-t border-white/20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold text-blue-400 mb-4">📈 The Trader's Escape</div>
          <p className="text-gray-400 mb-8">Empowering traders through education, not speculation.</p>
          <div className="mt-8">
            <h2 className="text-xl font-bold text-blue-300 mb-6">Contact Us</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 max-w-md mx-auto">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Type your message"
                required
                rows="4"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
              {emailError && (
                <p className="text-sm text-red-400">{emailError}</p>
              )}
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-transparent border border-blue-400 text-blue-400 hover:text-blue-300 hover:border-blue-300 rounded-lg font-medium transition-colors duration-200"
              >
                Submit
              </button>
              {formStatus && (
                <p className={`text-sm ${formStatus.includes('success') ? 'text-blue-300' : 'text-red-400'}`}>
                  {formStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      </footer>

      {/* Chat Icon */}
      <button
        onClick={toggleChatOptions}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200 z-50"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Chat Options Dropdown */}
      <div
        className={`fixed bottom-20 right-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg z-50 transition-all duration-300 ease-in-out transform ${
          isChatOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={handleChatbotClick}
          className="block w-full text-left px-4 py-3 text-blue-400 hover:bg-white/15 hover:text-blue-300 transition-colors duration-200"
        >
          Chatbot
        </button>
        <Link
          to="/community-chat"
          className="block w-full text-left px-4 py-3 text-blue-400 hover:bg-white/15 hover:text-blue-300 transition-colors duration-200"
        >
          Community Chat
        </Link>
      </div>
    </div>
  );
};

export default App;