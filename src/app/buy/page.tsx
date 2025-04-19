'use client'
import React, { useState } from 'react';
import { useProperties } from '@/hooks/useProperties';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/services/propertyService';

export default function BuyPage() {
  const [sortBy, setSortBy] = useState<'price' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [propertyType, setPropertyType] = useState<string>('');

  const { properties, loading, error, isEmpty } = useProperties({
    type: 'Sell',
    sortBy,
    sortOrder,
    filterBy: {
      propertyType: propertyType || undefined
    }
  });

  const propertyTypes = [
    'Apartment',
    'House',
    'Villa',
    'Plot',
    'Commercial',
    'Office Space'
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Properties for Sale</h1>

      {/* Filters and Sort Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Property Type Filter */}
          <div className="flex-1 min-w-[200px]">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bc9b54]"
            >
              <option value="">All Property Types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'date')}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bc9b54]"
            >
              <option value="date">Sort by Date</option>
              <option value="price">Sort by Price</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bc9b54]"
            >
              <option value="desc">Highest First</option>
              <option value="asc">Lowest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bc9b54]"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {isEmpty && !loading && !error && (
        <div className="text-center py-8">
          <p className="text-gray-500">No properties found</p>
        </div>
      )}

      {/* Properties Grid */}
      {!loading && !error && properties.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property: Property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
} 