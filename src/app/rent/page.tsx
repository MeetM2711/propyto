'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FiFilter } from 'react-icons/fi';
import { BiSort } from 'react-icons/bi';
import { useProperties } from '@/hooks/useProperties';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/utils/propertyUtils';

// Use dynamic imports to avoid module not found errors
const PropertyFilters = dynamic(() => import('@/components/PropertyFilters'), { ssr: false });
const MobileFilters = dynamic(() => import('@/components/MobileFilters'), { ssr: false });

interface Filters {
  budget: { min: number; max: number };
  bedrooms: number[];
  propertyType: string[];
  availableFor: string[];
  postedBy: string[];
  furnishingStatus: string[];
  localities: string[];
  projectsSocieties: string[];
  bathrooms: number[];
  amenities: string[];
  area: { min: number; max: number };
  availableFrom: string[];
  propertyAge: string[];
  owner: boolean;
  verified: boolean;
  furnished: boolean;
  withPhotos: boolean;
  withVideos: boolean;
}

export default function RentPage() {
  const [sortBy, setSortBy] = useState<'price' | 'date'>('date');
  const [filterBy, setFilterBy] = useState<string>('all');
  const { properties, loading, error } = useProperties('Rent');

  const [filters, setFilters] = useState<Filters>({
    budget: { min: 0, max: 100000 },
    bedrooms: [],
    propertyType: [],
    availableFor: [],
    postedBy: [],
    furnishingStatus: [],
    localities: [],
    projectsSocieties: [],
    bathrooms: [],
    amenities: [],
    area: { min: 0, max: 10000 },
    availableFrom: [],
    propertyAge: [],
    owner: false,
    verified: false,
    furnished: false,
    withPhotos: false,
    withVideos: false
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const sortProperties = (props: Property[]) => {
    return [...props].sort((a, b) => {
      if (sortBy === 'price') {
        const priceA = typeof a.price === 'number' ? a.price : 0;
        const priceB = typeof b.price === 'number' ? b.price : 0;
        return priceB - priceA;
      }
      return new Date(b.postedTime).getTime() - new Date(a.postedTime).getTime();
    });
  };

  const filterProperties = (props: Property[]) => {
    let filtered = props;

    // Apply property type filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(prop => prop.propertyType === filterBy);
    }

    // Apply budget filter
    if (filters.budget.min > 0 || filters.budget.max < 100000) {
      filtered = filtered.filter(prop => {
        const price = typeof prop.price === 'number' ? prop.price : 0;
        return price >= filters.budget.min && price <= filters.budget.max;
      });
    }

    // Apply bedroom filter
    if (filters.bedrooms.length > 0) {
      filtered = filtered.filter(prop => filters.bedrooms.includes(prop.bedrooms));
    }

    // Apply property type filter
    if (filters.propertyType.length > 0) {
      filtered = filtered.filter(prop => filters.propertyType.includes(prop.propertyType));
    }

    // Apply furnishing status filter
    if (filters.furnishingStatus.length > 0) {
      filtered = filtered.filter(prop => 
        prop.furnishingStatus && filters.furnishingStatus.includes(prop.furnishingStatus)
      );
    }

    // Apply quick filters
    if (filters.owner) {
      filtered = filtered.filter(prop => prop.postedBy === 'Owner');
    }
    if (filters.verified) {
      filtered = filtered.filter(prop => prop.verified);
    }
    if (filters.furnished) {
      filtered = filtered.filter(prop => prop.furnishingStatus === 'Fully Furnished');
    }
    if (filters.withPhotos) {
      filtered = filtered.filter(prop => prop.hasPhotos);
    }
    if (filters.withVideos) {
      filtered = filtered.filter(prop => prop.hasVideos);
    }

    return filtered;
  };

  const displayProperties = sortProperties(filterProperties(properties));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Properties for Rent</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price' | 'date')}
            className="p-2 border rounded-md"
          >
            <option value="date">Sort by Date</option>
            <option value="price">Sort by Price</option>
          </select>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="all">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
          </select>
        </div>
      </div>

      {displayProperties.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No properties found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center p-4">
          <button onClick={() => window.history.back()} className="mr-4">
            ←
          </button>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search City/Locality/Project"
              className="w-full p-2 bg-gray-50 rounded-md"
            />
          </div>
          <button className="ml-4">
            ♡
          </button>
        </div>
        
        {/* Mobile Filter/Sort Buttons */}
        <div className="flex border-t">
          <button
            className="flex-1 p-3 flex items-center justify-center gap-2 border-r"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <FiFilter />
            Filters
          </button>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <MobileFilters
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
} 