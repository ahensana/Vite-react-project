import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css'; // Reuse App.css for consistent styling
import logo from './assets/Black Background.png';
import video from './assets/videoplayback.webm';

const Profile = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAccountOpen(false);
    navigate('/login');
  };

  // Simulated user data (replace with API call in a real app)
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
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
                onClick={(e) => handleSmoothScroll(e, '#demat')}
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
                onClick={(e) => handleSmoothScroll(e, '#demat')}
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

      {/* Profile Section */}
      <section id="profile" className="min-h-screen py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center flex flex-col justify-center h-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-8 font-light">Manage your account details</p>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-blue-300 mb-6">User Information</h2>
            <div className="text-left space-y-4">
              <div>
                <label className="text-gray-300 font-medium">Name</label>
                <p className="text-white">{user.name}</p>
              </div>
              <div>
                <label className="text-gray-300 font-medium">Email</label>
                <p className="text-white">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => alert('Edit profile functionality would be implemented here.')}
              className="mt-6 bg-transparent border border-blue-400 text-blue-400 hover:text-blue-300 hover:border-blue-300 px-6 py-2 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 border-t border-white/20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold text-blue-400 mb-4">📈 The Trader's Escape</div>
          <p className="text-gray-400 mb-8">Empowering traders through education, not speculation.</p>
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

export default Profile;