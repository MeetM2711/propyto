'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaCamera, FaStar } from 'react-icons/fa';
import { BiArea } from 'react-icons/bi';

import { BsPeople } from 'react-icons/bs';

interface Property {
  id: number;
  title: string;
  price: number | 'on_request';
  area: number;
  areaUnit: string;
  areaSqm: number;
  location: string;
  bedrooms: number;
  propertyType: string;
  description: string;
  builder: string;
  postedTime: string;
  featured: boolean;
  hasRera: boolean;
  carpetArea?: string;
  status?: string;
  contactCount?: number;
  imageUrl?: string;
  bathrooms?: number;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatCardPrice = (price: number | 'on_request') => {
    if (price === 'on_request') return 'Price on Request';
    if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `₹ ${(price / 100000).toFixed(1)} Lac`;
    return `₹ ${price.toLocaleString()}`;
  };

  return (
    <Link href={`/property/${property.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <div className="absolute top-2 left-2 z-10 flex gap-2">
          {property.featured && (
            <span className="bg-[#1a1a1a] text-white text-xs px-2 py-1 rounded">FEATURED</span>
          )}
        </div>
        <div className="absolute top-2 right-2 z-10">
          <button 
             onClick={(e) => { e.preventDefault(); console.log('Heart clicked'); }}
             className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <FaHeart className="text-gray-400 hover:text-red-500" />
          </button>
        </div>
        <div className="relative h-48">
          <Image
            src={property.imageUrl || "/placeholder.jpg"}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h2 className="text-lg font-semibold mb-1 truncate group-hover:text-[#bc9b54]">{property.title}</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600 truncate">
              {property.bedrooms} BHK {property.propertyType} in {property.location}
            </p>
            {property.hasRera && (
               <span className="flex-shrink-0 text-blue-500 text-xs font-medium border border-blue-500 px-1.5 py-0.5 rounded">
                 ✓ RERA
               </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-base font-semibold">
               {formatCardPrice(property.price)}
            </h3>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 mb-0.5">
              <BiArea className="text-gray-500"/>
              <span className="text-sm font-medium">{property.area} {property.areaUnit}</span>
            </div>
            {property.carpetArea && (
              <p className="text-xs text-gray-500">({property.carpetArea} Carpet)</p>
            )}
          </div>
        </div>

         <div className="flex items-center justify-between mb-3">
             {property.status && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                 {property.status}
                </span>
             )}
         </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <p className="text-sm font-medium truncate">{property.builder}</p>
            <p className="text-xs text-gray-500">Posted {property.postedTime}</p>
          </div>
        </div>

        {property.contactCount && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
            <BsPeople />
            <span>{property.contactCount} people contacted</span>
          </div>
        )}
      </div>
    </Link>
  );
}