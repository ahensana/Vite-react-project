import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/Black Background.png';
import loginImage from './assets/login.jpg';

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const { firstName, lastName, email, phone, password, confirmPassword, termsAgreed } = formData;

    // Phone number validation
    if (phone && !validatePhone(phone)) {
      setError('Phone number must be exactly 10 digits');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Password validation
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (!termsAgreed) {
      setError('Please agree to the Terms & Conditions and Privacy Policy.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      // Check if email exists
      const checkEmailResponse = await fetch('http://localhost:5000/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!checkEmailResponse.ok) {
        const text = await checkEmailResponse.text();
        console.error('Check email response:', text);
        throw new Error(`Failed to check email: ${checkEmailResponse.status} ${checkEmailResponse.statusText}`);
      }

      const emailCheckData = await checkEmailResponse.json();

      if (emailCheckData.exists) {
        setError('Email already exists!');
        setTimeout(() => setError(''), 3000);
        return;
      }

      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
          termsAgreed,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Register response:', text);
        throw new Error(`Registration failed: ${response.status} ${response.statusText}`);
      }

      await response.json(); // Parse response but don't assign to unused variable

      setSuccess('Registration successful! You can now sign in.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        termsAgreed: false,
      });

      setTimeout(() => {
        setSuccess('');
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Fetch error:', err.message);
      setError(err.message.includes('Failed to fetch') ? 'Unable to connect to the server. Please ensure the server is running.' : err.message || 'An error occurred during registration');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login would be implemented here. This is a demo version.`);
  };

  return (
    <div className="min-h-screen lg:h-screen font-inter flex bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
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

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="space-y-3">
            <div className="text-center mb-2">
              <Link to="/" className="inline-flex items-center mb-4">
                <img src={logo} alt="Trader's Escape Logo" className="w-12 h-12 mr-2 rounded-full" />
                <div className="text-2xl font-bold text-blue-400">The Trader's Escape</div>
              </Link>
              <h2 className="text-2xl font-bold text-white mb-1">Create Account</h2>
              <p className="text-gray-400 text-sm">Start your trading education journey</p>
            </div>

            <form className="space-y-3" onSubmit={handleRegister}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    id="registerPassword"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="termsAgreed"
                  id="termsAgreement"
                  required
                  checked={formData.termsAgreed}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="termsAgreement" className="text-xs text-gray-300 leading-normal">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline legal-link">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline legal-link">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-lg"
              >
                Create Account
              </button>

              {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
              {success && <p className="text-green-500 text-sm text-center mt-2">{success}</p>}
            </form>

            <div className="text-center mt-3">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium legal-link"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-slate-800 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full inline-flex justify-center py-3 px-4 border border-slate-600 rounded-lg bg-slate-800/50 text-sm font-medium text-gray-300 hover:bg-slate-700/50 transition-colors duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.20-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button
                onClick={() => handleSocialLogin('facebook')}
                className="w-full inline-flex justify-center py-3 px-4 border border-slate-600 rounded-lg bg-slate-800/50 text-sm font-medium text-gray-300 hover:bg-slate-700/50 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;