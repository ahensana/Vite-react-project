import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/Black Background.png';
import loginImage from './assets/login.jpg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Clear error or success message after 3 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset request');
      }

      setSuccess('Password reset link sent to your email!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 min-h-screen font-inter flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${loginImage})` }}
        >
          <div className="absolute inset-0 bg-opacity-50"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center ml-20 p-12 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">The Trader's Escape</h1>
          <p className="text-xl mb-6 opacity-90">Your Gateway to Smarter Trading</p>
          <p className="text-lg opacity-80 max-w-md leading-relaxed mb-8">
            Join thousands of traders who are mastering the markets through our comprehensive educational platform. Start your journey to financial literacy today.
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm opacity-90">Educational Content Only</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm opacity-90">No Tips or Recommendations</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm opacity-90">Learn at Your Own Pace</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center mb-4">
                <img src={logo} alt="Trader's Escape Logo" className="w-12 h-12 mr-2 rounded-full" />
                <div className="text-2xl font-bold text-blue-400">The Trader's Escape</div>
              </Link>
              <h2 className="text-3xl font-bold text-white mb-2">Reset Your Password</h2>
              <p className="text-gray-400">Enter your email to receive a password reset link</p>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm text-center">{success}</p>}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg"
              >
                Send Reset Link
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-400">
                Back to{' '}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;