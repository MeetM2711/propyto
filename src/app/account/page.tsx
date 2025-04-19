'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { HiOutlineUser, HiOutlineCog, HiOutlineHeart, HiOutlineClipboardCheck } from 'react-icons/hi';
import { BiBuildings } from 'react-icons/bi';
import { FiLogOut, FiHelpCircle } from 'react-icons/fi';
import { MdOutlineRateReview } from 'react-icons/md';
import { BsFileEarmarkText } from 'react-icons/bs';

// Use dynamic import for components
// const BottomNavigation = dynamic(() => import('@/components/BottomNavigation'), { ssr: false });
const LoginPopup = dynamic(() => import('@/components/LoginPopup'), { ssr: false });

interface User {
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
}

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Check login status on mount
  useEffect(() => {
    setIsLoadingAuth(true);
    try {
      const storedUserString = localStorage.getItem('loggedInUser');
      if (storedUserString) {
        const user: User = JSON.parse(storedUserString);
        setLoggedInUser(user);
        setIsLoggedIn(true);
        console.log('AccountPage: User found', user);
      } else {
        setIsLoggedIn(false);
        setLoggedInUser(null);
      }
    } catch (error) {
      console.error("Error reading user from Local Storage:", error);
      setIsLoggedIn(false);
      setLoggedInUser(null);
    }
    setIsLoadingAuth(false);
  }, []);

  const accountMenuItems = [
    { 
      icon: <HiOutlineHeart className="text-2xl" />, 
      title: 'Shortlisted Properties',
      subtitle: 'View your saved properties',
      requiresLogin: true
    },
    { 
      icon: <HiOutlineClipboardCheck className="text-2xl" />, 
      title: 'My Activity',
      subtitle: 'Track your property search activity',
      requiresLogin: true
    },
    { 
      icon: <BiBuildings className="text-2xl" />, 
      title: 'My Properties',
      subtitle: 'Manage your property listings',
      requiresLogin: true
    },
    { 
      icon: <MdOutlineRateReview className="text-2xl" />, 
      title: 'My Reviews',
      subtitle: 'See the reviews you have posted',
      requiresLogin: true
    },
    { 
      icon: <HiOutlineCog className="text-2xl" />, 
      title: 'Account Settings',
      subtitle: 'Update your profile information',
      requiresLogin: true
    },
    { 
      icon: <BsFileEarmarkText className="text-2xl" />, 
      title: 'Terms & Conditions',
      subtitle: 'Read our terms of service',
      requiresLogin: false
    },
    { 
      icon: <FiHelpCircle className="text-2xl" />, 
      title: 'Help & Support',
      subtitle: 'Get assistance with your queries',
      requiresLogin: false
    }
  ];

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleLoginSuccess = () => {
     try {
      const storedUserString = localStorage.getItem('loggedInUser');
      if (storedUserString) {
        const user: User = JSON.parse(storedUserString);
        setLoggedInUser(user);
        setIsLoggedIn(true);
      } else {
          setIsLoggedIn(false);
          setLoggedInUser(null);
      }
    } catch (error) {
      console.error("Error reading user from Local Storage after login:", error);
      setIsLoggedIn(false);
      setLoggedInUser(null);
    }
    setIsLoginPopupOpen(false);
  };

  const handleLogout = () => {
     try {
        localStorage.removeItem('loggedInUser');
        setIsLoggedIn(false);
        setLoggedInUser(null);
        console.log('User logged out');
     } catch (error) {
         console.error("Error logging out:", error);
     }
  };

  if (isLoadingAuth) {
      return <div className="min-h-screen flex items-center justify-center">Loading Account...</div>; 
  }

  return (
    <div className="pb-16 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 bg-white z-40 border-b p-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold flex-1">My Account</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Profile Section */}
        {isLoggedIn && loggedInUser ? (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                {loggedInUser.avatar && (
                   <Image
                    src={loggedInUser.avatar}
                    alt={loggedInUser.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">{loggedInUser.name}</h3>
                <p className="text-gray-600 text-sm">{loggedInUser.email}</p>
                {loggedInUser.phone && <p className="text-gray-600 text-sm">{loggedInUser.phone}</p>}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <HiOutlineUser className="text-4xl text-gray-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Welcome to ProPyto</h3>
              <p className="text-gray-600 mb-4">Login or Register to access your account</p>
              <div className="flex gap-3 w-full">
                <button 
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
                <button 
                  className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-md font-medium"
                  onClick={handleLoginClick}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {accountMenuItems.map((item, index) => (
            <React.Fragment key={index}>
              <button 
                className="w-full text-left p-4 flex items-center"
                onClick={() => {
                  if (item.requiresLogin && !isLoggedIn) {
                    handleLoginClick();
                  }
                }}
              >
                <div className="text-blue-600 mr-4">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
                </div>
                <div className="text-gray-400">
                  {item.requiresLogin && !isLoggedIn && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">Login Required</span>
                  )}
                </div>
              </button>
              {index < accountMenuItems.length - 1 && (
                <div className="h-px bg-gray-100 mx-4" />
              )}
            </React.Fragment>
          ))}
          
          {isLoggedIn && (
            <>
              <div className="h-px bg-gray-100 mx-4" />
              <button 
                className="w-full text-left p-4 flex items-center text-red-500"
                onClick={handleLogout}
              >
                <div className="mr-4">
                  <FiLogOut className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-medium">Logout</h3>
                </div>
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Login Popup */}
      {isLoginPopupOpen && (
        <LoginPopup 
          isOpen={isLoginPopupOpen}
          onClose={() => setIsLoginPopupOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      {/* Bottom Navigation */}
      {/* <BottomNavigation /> */}
    </div>
  );
} 