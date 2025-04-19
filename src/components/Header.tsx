"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/images/propyto.jpg";
import Button from "./Button";
import LoginPopup from "./LoginPopup";    
import PostPropertyStartPopup from './PostProperty';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

const navItems = [
  {
    id: "post",
    title: "Post Property",
    subtitle: "Sell/Rent faster with 99acres",
    icon: "🏠",
  },
  {
    id: "whatsapp",
    title: "Post Property via Whatsapp",
    subtitle: "Faster property posting experience",
    icon: "💬",
  },
  {
    id: "search",
    title: "Search Properties",
    subtitle: "Explore residential and commercial properties",
    icon: "🔍",
  },
];

const propertyActivity = [
  { id: "viewed", title: "Viewed", subtitle: "Properties", icon: "👁️" },
  {
    id: "shortlisted",
    title: "Shortlisted",
    subtitle: "Properties",
    icon: "⭐",
  },
  { id: "contacted", title: "Contacted", subtitle: "Properties", icon: "📞" },
];

const propertyManagement = [
  { id: "view-responses", title: "View Responses", icon: "📋" },
  { id: "manage-listings", title: "Manage/Edit your Listings", icon: "🏢" },
  { id: "manage-payments", title: "Manage Payments", icon: "💳" },
  {
    id: "boss-plans",
    title: "BOSS Plans- For dealers",
    icon: "👑",
    badge: "NEW",
  },
];

const researchInsights = [
  {
    id: "price-trends",
    title: "Price Trends",
    subtitle: "Explore locality and society level price growth/ drops",
    icon: "📈",
  },
  {
    id: "locality-insights",
    title: "Locality Insights",
    subtitle: "Locality reviews, ratings, safety, commute, landmarks...",
    icon: "🏘️",
  },
  {
    id: "transaction-prices",
    title: "Transaction Prices",
    subtitle: "Government records of all property transactions",
    icon: "💰",
    badge: "NEW",
  },
  {
    id: "ratings-reviews",
    title: "Ratings and Reviews",
    subtitle: "Read user reviews and ratings on locality and society",
    icon: "⭐",
  },
  {
    id: "articles-news",
    title: "Articles and News",
    subtitle: "Articles, News, Policies, Guides...",
    icon: "📰",
  },
  {
    id: "tools-calculators",
    title: "Tools and Calculators",
    subtitle: "Budget Calculator, EMI Calculator, Area Converter",
    icon: "🧮",
  },
];

const propertyCategories = [
  {
    id: "residential",
    title: "Residential",
    subtitle: "Properties",
    icon: "🏠",
  },
  {
    id: "commercial",
    title: "Commercial",
    subtitle: "Properties",
    icon: "🏢",
  },
];

const additionalLinks = [
  { id: "nri", title: "NRI Homepage", icon: "🌍" },
  { id: "all-india", title: "All India Homepage", icon: "🏛️" },
  { id: "popular-areas", title: "Popular Areas", icon: "📍" },
  { id: "popular-cities", title: "Popular Cities", icon: "🌆" },
  {
    id: "review-locality",
    title: "Review your Society or Locality",
    icon: "✍️",
  },
  { id: "terms", title: "Terms of Use", icon: "📜" },
  { id: "help", title: "Help and Support", icon: "❓" },
  {
    id: "other-links",
    title: "Other links",
    subtitle: "Testimonials, Career with Us",
    icon: "🔗",
  },
  { id: "feedback", title: "Share Feedback", icon: "📝" },
  { id: "app", title: "Download Our App", icon: "📱" },
];

const bottomNavItems = [
  {
    id: "buy",
    title: "Buy",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "rent",
    title: "Rent",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
  },
  {
    id: "new-projects",
    title: "New Projects",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "insights",
    title: "Insights",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: "invest",
    title: "Invest",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "plot-land",
    title: "Plot / Land",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "co-working",
    title: "Co-working Spaces",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: "buy-commercial",
    title: "Buy Commercial",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "lease-commercial",
    title: "Lease Commercial",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    id: "pg",
    title: "PG",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "post-property",
    title: "Post a property",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isPostPropertyStartPopupOpen, setIsPostPropertyStartPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoadingAuth(true);
    try {
      const storedUser = localStorage.getItem('loggedInUser');
      setIsLoggedIn(!!storedUser);
    } catch (error) {
      console.error("Header: Error reading auth status:", error);
      setIsLoggedIn(false);
    }
    setIsLoadingAuth(false);
  }, []);

  const handlePostPropertyStartSuccess = () => {
    // ... (existing logic)
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginPopupOpen(false);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('loggedInUser');
      setIsLoggedIn(false);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error("Logout error:", error);
      toast.error('Logout failed.');
    }
  };

  const handleLoginButtonClick = () => {
    if (isLoadingAuth) return;

    if (isLoggedIn) {
      toast.error("You are already logged in.");
    } else {
      setIsLoginPopupOpen(true);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-black to-[#1a1a1a] shadow-lg z-50">
        {/* Top Bar */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
          {/* Left Section */}
            <div className="flex items-center">
              <button
                className="inline-flex items-center justify-center w-20 h-20 text-[#bc9b54] hover:text-[#c69531] focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              <Link href="/" className="flex-shrink-0 ml-4">
                <Image
                  src={Logo}
                  alt="ProPyto"
                  width={60}
                  height={60}
                  priority
                  className="object-contain"
                />
              </Link>

            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => isLoggedIn ? router.push('/post-property/new') : setIsLoginPopupOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-[#bc9b54] to-[#c69531] text-white rounded-lg font-semibold hover:from-[#c69531] hover:to-[#bc9b54] transition-all duration-300 flex items-center gap-2 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Post Property
              </button>
              {!isLoadingAuth && (
                isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors text-sm"
                  >
                    Logout
                  </button>
                ) : (
                        <button
                    onClick={handleLoginButtonClick}
                    className="px-4 py-2 border border-[#bc9b54] text-[#bc9b54] rounded-md hover:bg-[#bc9b54] hover:text-white transition-colors"
                  >
                    Login
                  </button>
                )
              )}
            </div>
                    </div>
                  </div>

        <div className=" border-t border-[#bc9b54]/20 z-40">
          <div className="container mx-auto overflow-x-auto">
            <div className="flex whitespace-nowrap px-4 py-2 min-w-full">
              {bottomNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/${item.id}`}
                  className="flex flex-col items-center justify-center flex-shrink-0 px-3 text-decoration-none group"
                >
                  <span className="text-[#bc9b54] group-hover:text-[#c69531] transition-colors duration-200">
                    {item.icon}
                  </span>
                  <span className="text-[11px] text-gray-400 mt-1 text-center group-hover:text-[#bc9b54]">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
                        </div>
                    </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <div
            className={`fixed inset-x-0 bottom-0  transform transition-transform duration-300 ease-out ${
              isMobileMenuOpen ? "translate-y-0" : "translate-y-full"
            }`}
            style={{ maxHeight: "100vh", overflowY: "auto" }}
          >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#bc9b54] to-[#c69531] text-white p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Welcome</h4>
                    <p className="text-sm opacity-90 mb-0">
                      Guest Profile • Manage Profile
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
            </div>
              <Button variant="primary" fullWidth className="">
                Login / Register Now
              </Button>
          </div>

            {/* Menu Items */}
            <div className="bg-gray-50 min-h-screen">
              <div className="space-y-4 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/${item.id}`}
                    className="flex justify-between gap-4 p-4 text-decoration-none bg-white rounded-lg shadow-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                  <div>
                      <h5 className="font-normal text-gray-900">{item.title}</h5>
                      <p className="text-sm text-gray-500 mb-0">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="text-3xl">{item.icon}</span>
                  </Link>
                ))}

                {/* Property Search Activity Section */}
                <div className="mt-6">
                  <h6 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 mb-3">
                    YOUR PROPERTY SEARCH ACTIVITY
                  </h6>
                  <div className="grid grid-cols-3 gap-2 bg-white rounded-lg p-4">
                    {propertyActivity.map((item) => (
                      <Link
                        key={item.id}
                        href={`/${item.id}`}
                        className="flex flex-col items-center text-center text-decoration-none"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-2xl mb-1">{item.icon}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {item.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.subtitle}
                        </span>
                      </Link>
                    ))}
                    </div>
                  </div>

                {/* Property Management Section */}
                <div className="mt-6">
                  <h6 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 mb-3">
                    PROPERTY MANAGEMENT - FOR OWNERS/ DEALERS
                  </h6>
                    <div className="space-y-2">
                    {propertyManagement.map((item) => (
                      <Link
                        key={item.id}
                        href={`/${item.id}`}
                        className="flex items-center justify-between p-3 bg-white rounded-lg text-decoration-none text-gray-900"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.icon}</span>
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span className="text-xs px-1.5 py-0.5 bg-orange-500 text-white rounded">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                    </div>
                  </div>

                {/* Research and Insights Section */}
                <div className="mt-6">
                  <h6 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 mb-3">
                    RESEARCH AND INSIGHTS
                  </h6>
                  <div className="space-y-2">
                    {researchInsights.map((item) => (
                      <Link
                        key={item.id}
                        href={`/${item.id}`}
                        className="flex items-start gap-3 p-3 bg-white rounded-lg text-decoration-none"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-xl mt-0.5">{item.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900">{item.title}</span>
                            {item.badge && (
                              <span className="text-xs px-1.5 py-0.5 bg-orange-500 text-white rounded">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 mb-0">
                            {item.subtitle}
                          </p>
                        </div>
                      </Link>
                    ))}
                      </div>
                    </div>

                {/* Explore Properties by Category */}
                <div className="mt-6">
                  <h6 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 mb-3">
                    EXPLORE PROPERTIES BY CATEGORY
                  </h6>
                  <div className="grid grid-cols-2 gap-3">
                    {propertyCategories.map((item) => (
                      <Link
                        key={item.id}
                        href={`/${item.id}`}
                        className="flex flex-col items-center p-4 bg-white rounded-lg text-decoration-none text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-2xl mb-1">{item.icon}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {item.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.subtitle}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Additional Links */}
                <div className="mt-6 space-y-2">
                  {additionalLinks.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${item.id}`}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg text-decoration-none text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <span className="text-sm">{item.title}</span>
                        {item.subtitle && (
                          <p className="text-xs text-gray-500 mb-0">
                            {item.subtitle}
                          </p>
              )}
            </div>
                    </Link>
                  ))}
            </div>

                {/* App Download Section */}
                <div className="mt-6 bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        Search faster with App
                      </span>
                      <div className="flex">
                        {"★★★★☆".split("").map((star, i) => (
                          <span key={i} className="text-yellow-400 text-xs">
                            {star}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">4.5 Rating</span>
                    </div>
                    <button className="bg-[#0061df] text-white px-4 py-1.5 rounded text-sm font-medium">
                      Get App
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isPostPropertyStartPopupOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 text-center">
            <div
              className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
              onClick={() => setIsPostPropertyStartPopupOpen(false)}
            />
            
            <div className="inline-block w-full max-w-7xl my-8 text-left align-middle transition-all transform">
              <button 
                onClick={() => setIsPostPropertyStartPopupOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-[#bc9b54] transition-colors z-10"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <PostPropertyStartPopup />
            </div>
                      </div>
                    </div>
                  )}

      {isLoginPopupOpen && (
        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={() => setIsLoginPopupOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Header;
