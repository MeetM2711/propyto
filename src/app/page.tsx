'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { BiSearch, BiFilter, BiBuildings, BiHomeAlt } from 'react-icons/bi';
import { FaRegBuilding } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';

// Import HeroSection
import HeroSection from '@/components/HeroSection';

// Use dynamic import for bottom navigation
// const BottomNavigation = dynamic(() => import('@/components/BottomNavigation'), { ssr: false });

export default function HomePage() {
  // Sample featured properties
  const featuredProperties = [
    {
      id: 1,
      title: "Acacia",
      location: "Dumas, Surat",
      price: "On Request",
      bedrooms: 3,
      area: "1,201 sqft",
      type: "Residential",
      imageUrl: "/placeholder.jpg",
      featuredTag: "FEATURED",
      reraApproved: true
    },
    {
      id: 2,
      title: "Surya Signature",
      location: "Vesu, Surat",
      price: "₹3.7 Cr",
      bedrooms: 5,
      area: "5,225 sqft",
      type: "Residential",
      imageUrl: "/placeholder.jpg",
      featuredTag: "FEATURED",
      reraApproved: true
    }
  ];

  return (
    <div className="pb-16 lg:pb-0">
      {/* Render HeroSection first */}
      <HeroSection />

      {/* Header (Sticky header might need adjustment if HeroSection is tall) */}
      <div className="sticky top-0 bg-white z-40 border-b p-4">
        <div className="flex items-center mb-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold">ProPyto</h1>
          </div>
          <button className="ml-2 p-2">
            <BiFilter className="text-xl" />
          </button>
          <button className="ml-2 p-2">
            ♡
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search City/Locality/Project"
            className="w-full p-3 pl-10 bg-gray-50 rounded-md border"
          />
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>

        {/* Location Selector */}
        <div className="flex items-center mb-2">
          <HiOutlineLocationMarker className="text-blue-600 mr-2" />
          <span className="font-medium">Surat</span>
          <button className="ml-1 text-blue-600 text-sm">Change</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Property Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">What are you looking for?</h2>
          <div className="grid grid-cols-3 gap-4">
            <Link href="/buy" className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <BiBuildings className="text-3xl text-blue-600 mb-2" />
              <span className="text-sm">Buy</span>
            </Link>
            <Link href="/rent" className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <FaRegBuilding className="text-3xl text-blue-600 mb-2" />
              <span className="text-sm">Rent</span>
            </Link>
            <Link href="/sell" className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <BiHomeAlt className="text-3xl text-blue-600 mb-2" />
              <span className="text-sm">Sell</span>
            </Link>
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Featured Properties</h2>
            <Link href="/featured" className="text-blue-600 text-sm">See All</Link>
          </div>
          
          <div className="space-y-4">
            {featuredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image 
                    src={property.imageUrl} 
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-black text-white text-xs px-2 py-1 rounded">
                      {property.featuredTag}
                    </span>
                  </div>
                  <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
                    ♡
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{property.title}</h3>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-600">
                          {property.bedrooms} BHK in {property.location}
                        </p>
                        {property.reraApproved && (
                          <span className="ml-2 text-blue-600 text-sm">RERA</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{property.price}</p>
                      <p className="text-sm text-gray-600">{property.area}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end gap-2">
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded">
                      View Number
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Searches */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Recent Searches</h2>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-medium">2 BHK in Adajan</h3>
                <p className="text-sm text-gray-600">Surat, Gujarat</p>
              </div>
              <BiSearch className="text-gray-400 text-xl" />
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-medium">3 BHK in Vesu</h3>
                <p className="text-sm text-gray-600">Surat, Gujarat</p>
              </div>
              <BiSearch className="text-gray-400 text-xl" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      {/* <BottomNavigation /> */}
    </div>
  );
}
