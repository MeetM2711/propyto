import React from 'react';
import Link from 'next/link';

const bottomNavItems = [
  {
    id: 'home',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    label: 'Home'
  },
  {
    id: 'insights',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    label: 'Insights'
  },
  {
    id: 'sell-rent',
    icon: (
      <svg className="w-10 h-10 -mt-6 bg-gradient-to-r from-[#bc9b54] to-[#c69531] rounded-full p-2" viewBox="0 0 24 24" fill="none" stroke="white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    label: 'Sell/Rent'
  },
  {
    id: 'shortlisted',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    label: 'Shortlisted'
  },
  {
    id: 'profile',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    label: 'Profile'
  }
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-black to-[#1a1a1a] border-t border-[#bc9b54]/20 z-50">
      <div className="flex justify-around items-center h-16">
        {bottomNavItems.map((item) => (
          <Link
            key={item.id}
            href={`/${item.id}`}
            className="flex flex-col items-center justify-center flex-1 min-w-0 text-decoration-none group"
          >
            <div className={`text-[#bc9b54] group-hover:text-[#c69531] transition-colors duration-200 
              ${item.id === 'sell-rent' ? '-mt-6' : ''}`}
            >
              {item.icon}
            </div>
            <span className={`text-xs mt-1 text-gray-400 group-hover:text-[#bc9b54] transition-colors duration-200
              ${item.id === 'sell-rent' ? 'mt-1' : ''}`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav; 