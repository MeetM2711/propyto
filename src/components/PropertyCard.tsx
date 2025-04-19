'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaCamera } from 'react-icons/fa';
import { BiArea } from 'react-icons/bi';
import { IoBedOutline } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { BsPeople } from 'react-icons/bs';
import { MdOutlinePhoneEnabled } from 'react-icons/md';

interface Property {
  id: string;
  title: string;
  price: number | 'on_request';
  area: number;
  areaUnit: string;
  areaSqm: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  description: string;
  builder: string;
  postedTime: string;
  featured: boolean;
  hasRera: boolean;
  carpetArea?: string;
  status?: string;
  contactCount?: number;
  images: string[];
  type?: 'Rent' | 'Sell';
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatCardPrice = (price: number | 'on_request' | undefined) => {
    if (!price || price === 'on_request') {
      return 'Price on Request';
    }
    
    if (typeof price !== 'number') {
      return 'Price on Request';
    }

    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} Lac`;
    return `₹${price.toLocaleString()}`;
  };

  const getPricePerSqft = (price: number | 'on_request', area: number) => {
    if (typeof price === 'number' && area > 0) {
      return `₹${Math.round(price / area).toLocaleString()}/sqft`;
    }
    return '';
  };

  const getPropertyPurpose = (type?: 'Rent' | 'Sell') => {
    if (!type) return '';
    return type === 'Sell' ? 'for sale' : 'for rent';
  };

  return (
    <Link href={`/property/${property.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        {/* Status Badge */}
        <div className="absolute top-2 left-2 z-10 flex gap-2">
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full uppercase">
            {property.status || 'RESALE'}
          </span>
        </div>

        {/* Favorite Button */}
        <div className="absolute top-2 right-2 z-10">
          <button 
            onClick={(e) => { e.preventDefault(); console.log('Heart clicked'); }}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <FaHeart className="text-gray-400 hover:text-[#bc9b54]" />
          </button>
        </div>

        {/* Image Count Badge */}
        <div className="absolute bottom-2 right-2 z-10">
          <span className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <FaCamera />
            {property.images.length}
          </span>
        </div>

        {/* Main Image */}
        <div className="relative h-48">
          <Image
            src={property.images[0] || "/placeholder.jpg"}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="p-4">
        {/* Title and Location */}
        <div className="mb-3">
          <h2 className="text-lg font-semibold mb-1 text-gray-900">{property.title}</h2>
          <p className="text-sm text-gray-600">
            {property.bedrooms} Bedroom {property.propertyType} {getPropertyPurpose(property.type)} in {property.location}
          </p>
        </div>

        {/* Price and Area Details */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#bc9b54]">
              {formatCardPrice(property.price)}
            </h3>
            {typeof property.price === 'number' && (
              <p className="text-sm text-gray-500">
                {getPricePerSqft(property.price, property.area)}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              {property.area} {property.areaUnit}
            </div>
            <p className="text-xs text-gray-500">Plot Area</p>
          </div>
        </div>

        {/* Property Features */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <IoBedOutline className="text-[#bc9b54]" />
            <span className="text-sm">{property.bedrooms} BHK</span>
          </div>
          <div className="flex items-center gap-1">
            <LuBath className="text-[#bc9b54]" />
            <span className="text-sm">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <BiArea className="text-[#bc9b54]" />
            <span className="text-sm">{property.area} {property.areaUnit}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <p className="text-xs text-gray-500">
              Posted {property.postedTime} by {property.builder}
            </p>
            {property.hasRera && (
              <span className="inline-block mt-1 text-[#bc9b54] text-xs font-medium border border-[#bc9b54] px-1.5 py-0.5 rounded">
                ✓ RERA
              </span>
            )}
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); console.log('Contact clicked'); }}
            className="flex items-center gap-1 bg-[#bc9b54] text-white px-3 py-1 rounded hover:bg-[#a88847] transition-colors"
          >
            <MdOutlinePhoneEnabled />
            <span className="text-sm">Contact</span>
          </button>
        </div>
      </div>
    </Link>
  );
}