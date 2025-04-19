'use client'
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginPopup({ isOpen, onClose, onLoginSuccess }: LoginPopupProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (activeTab === 'login') {
      if (email && password) {
        console.log('Attempting login with:', { email });
        // --- TODO: Replace with actual backend validation --- 

        // Simulate successful login & store mock user data
        const mockUser = { name: name || "Test User", email: email }; // Use entered name if available
        try {
            localStorage.setItem('loggedInUser', JSON.stringify(mockUser));
            console.log('Saved user to Local Storage:', mockUser);
            if (onLoginSuccess) onLoginSuccess();
        } catch (storageError) {
            console.error("Error saving to Local Storage:", storageError);
            setError("Could not save login session. Please try again.");
        }
      } else {
          setError('Please enter both email and password.');
      }
    } else { // Register Tab
      if (email && password && name) {
        console.log('Attempting registration with:', { name, email });
        // --- TODO: Replace with actual backend registration --- 

        // Simulate successful registration & store mock user data
        const newUser = { name: name, email: email };
         try {
            localStorage.setItem('loggedInUser', JSON.stringify(newUser));
            console.log('Saved new user to Local Storage:', newUser);
            if (onLoginSuccess) onLoginSuccess(); // Also trigger login success on register
        } catch (storageError) {
            console.error("Error saving to Local Storage:", storageError);
            setError("Could not save registration session. Please try again.");
        }
      } else {
          setError('Please fill in all registration fields.');
      }
    }
  };

  const handleSocialLogin = (platform: string) => {
    console.log(`Login with ${platform}`);
    // --- TODO: Implement Social Login logic --- 
    // Simulate successful login & store mock user data
    const mockSocialUser = { name: `${platform} User`, email: `${platform.toLowerCase()}@example.com` };
     try {
        localStorage.setItem('loggedInUser', JSON.stringify(mockSocialUser));
        console.log('Saved social user to Local Storage:', mockSocialUser);
        if (onLoginSuccess) onLoginSuccess();
    } catch (storageError) {
        console.error("Error saving to Local Storage:", storageError);
        setError("Could not save login session. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {activeTab === 'login' ? 'Login' : 'Register'}
          </h2>
          <button onClick={onClose} className="text-gray-500">
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <>
            {/* Tabs */}
            <div className="flex border-b mb-6">
              <button
                className={`flex-1 py-3 text-center ${
                  activeTab === 'login'
                    ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                    : 'text-gray-500'
                }`}
                onClick={() => { setActiveTab('login'); setError(''); }}
              >
                Login
              </button>
              <button
                className={`flex-1 py-3 text-center ${
                  activeTab === 'register'
                    ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                    : 'text-gray-500'
                }`}
                onClick={() => { setActiveTab('register'); setError(''); }}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleContinue} className="space-y-4">
              {activeTab === 'login' ? (
                <>
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bc9b54]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bc9b54]"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bc9b54]"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bc9b54]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">Password</label>
                    <input
                      type="password"
                      placeholder="Create a password"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bc9b54]"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {error && <p className="text-xs text-red-600">{error}</p>}

              <button
                type="submit"
                className="w-full bg-[#bc9b54] text-black py-3 rounded-md font-semibold hover:bg-[#c69531] transition-colors mt-4"
              >
                {activeTab === 'login' ? 'Login' : 'Register'}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-300 w-full absolute"></div>
                <div className="bg-white px-4 z-10 text-gray-500 text-sm">or {activeTab === 'login' ? 'login' : 'sign up'} with</div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <button
                  className="flex justify-center items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => handleSocialLogin('Google')}
                >
                  <FcGoogle className="text-2xl" />
                </button>
                <button
                  className="flex justify-center items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => handleSocialLogin('Facebook')}
                >
                  <FaFacebook className="text-2xl text-blue-600" />
                </button>
                <button
                  className="flex justify-center items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => handleSocialLogin('Apple')}
                >
                  <FaApple className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center mt-6">
              By continuing, you agree to our{' '}
              <a href="#" className="text-[#bc9b54] hover:underline">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#bc9b54] hover:underline">
                Privacy Policy
              </a>
            </p>
          </>
        </div>
      </div>
    </div>
  );
} 