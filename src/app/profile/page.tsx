'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface UserData {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/'); // Redirect to home if not logged in
      return;
    }

    try {
      const user = JSON.parse(userStr);
      setUserData(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-[#1a1a1a] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#bc9b54] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#1a1a1a] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#2a2a2a] rounded-lg shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#bc9b54] to-[#c69531] px-6 py-8">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                <Image
                  src={userData.picture || '/default-avatar.png'}
                  alt={userData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
                <p className="text-white/80">{userData.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 space-y-6">
            {/* Property Activity Section */}
            <div>
              <h2 className="text-xl font-semibold text-[#bc9b54] mb-4">Property Activity</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Viewed Properties</span>
                    <span className="text-[#bc9b54] font-semibold">0</span>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Shortlisted</span>
                    <span className="text-[#bc9b54] font-semibold">0</span>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Contacted</span>
                    <span className="text-[#bc9b54] font-semibold">0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div>
              <h2 className="text-xl font-semibold text-[#bc9b54] mb-4">Account Settings</h2>
              <div className="space-y-4">
                <button
                  onClick={handleLogout}
                  className="w-full md:w-auto px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 