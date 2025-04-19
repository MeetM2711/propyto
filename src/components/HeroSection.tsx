"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Kiran from '../assets/images/kiran-concord-9.jpg'
import PropertyCard from './PropertyCard';
import { useProperties } from '@/hooks/useProperties';

const recentSearches = [
  'Buy Commerical in VIP Road Vesu, Surat',
  'All Recent Searches'
];

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use the useProperties hook to fetch featured properties
  const { properties, loading, error } = useProperties({
    sortBy: 'date',
    sortOrder: 'desc'
  });

  // Take only the first 4 properties for the recommended section
  const recommendedProperties = properties.slice(0, 4);

  return (
    <section className="relative">
      {/* Background Image */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <Image
          src={Kiran}
          alt="Hero Background"
          fill
          className="object-cover brightness-50"
          priority
        />
        
        {/* Search Section */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          {/* Search Bar */}
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 'Sector 150 Noida'"
                className="w-full px-12 py-4 text-gray-800 placeholder-gray-500 border-none focus:ring-2 focus:ring-[#bc9b54] outline-none"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-[#bc9b54]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-4H3m15 0h3M12 3v4m0-4h14m-7 4v4m0-4h7m-7 4h7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Recent Searches */}
          <div className="mt-4 flex items-center gap-2 text-white">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex gap-4 text-sm">
              {recentSearches.map((search, index) => (
                <React.Fragment key={search}>
                  <Link href="#" className="hover:text-[#bc9b54] transition-colors">
                    {search}
                  </Link>
                  {index < recentSearches.length - 1 && (
                    <span className="text-gray-400">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Property Cards Section */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Recommended Properties
              <span className="block text-sm font-normal text-gray-500">Curated especially for you</span>
            </h2>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bc9b54]"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Property Cards Carousel */}
          {!loading && !error && recommendedProperties.length > 0 && (
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
              {recommendedProperties.map((property) => (
                <div key={property.id} className="flex-none w-72">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && recommendedProperties.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No properties available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 