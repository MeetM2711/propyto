'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FiFilter } from 'react-icons/fi';
import { BiSort } from 'react-icons/bi';

// Use dynamic imports to avoid module not found errors
const PropertyFilters = dynamic(() => import('@/components/PropertyFilters'), { ssr: false });
const PropertyCard = dynamic(() => import('@/components/PropertyCard'), { ssr: false });
const MobileFilters = dynamic(() => import('@/components/MobileFilters'), { ssr: false });
// const BottomNavigation = dynamic(() => import('@/components/BottomNavigation'), { ssr: false });

// Sample property data
const sampleProperties = [
  {
    id: 1,
    title: "Sri Vallabh Shrusti",
    price: 15500,
    deposit: 3,
    area: 1150,
    areaUnit: "sqft",
    areaSqm: 107,
    location: "Adajan, Surat",
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "Apartment",
    furnishingStatus: "Semi-Furnished",
    availableFor: ["Family", "Bachelors"],
    postedBy: "Owner",
    amenities: ["Parking", "Security", "Lift", "Power Backup"],
    locality: "Adajan",
    projectSociety: "Sri Vallabh Shrusti",
    propertyAge: "5-10 years",
    availableFrom: "Immediate",
    highlights: ["East Facing", "Gated Society", "24x7 Security"],
    featured: true,
    hasPhotos: true,
    hasVideos: false,
    verified: true,
    description: "A well-maintained 2 BHK flat in Adajan with modern amenities.",
    builder: "Kohinoor Group",
    postedTime: "2mo ago",
    contactCount: 3,
    hasRera: true,
    carpetArea: "Carpet Area",
    status: "Ready To Move"
  }
];

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

  const [sortBy, setSortBy] = useState('relevance');

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Update handler for quick filters
  const handleQuickFilterChange = (filterName: keyof Pick<Filters, 'owner' | 'verified' | 'furnished' | 'withPhotos' | 'withVideos'>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName]
    }));
  };

  // Filter properties based on current filters
  const filteredProperties = sampleProperties.filter(property => {
    // Budget filter
    if (typeof property.price === 'number' && (property.price < filters.budget.min || property.price > filters.budget.max)) return false;

    // Bedrooms filter
    if (filters.bedrooms.length > 0 && !filters.bedrooms.includes(property.bedrooms)) return false;

    // Property type filter
    if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.propertyType)) return false;

    // Available for filter
    if (filters.availableFor.length > 0 && !property.availableFor.some(type => filters.availableFor.includes(type))) return false;

    // Posted by filter
    if (filters.postedBy.length > 0 && !filters.postedBy.includes(property.postedBy)) return false;

    // Furnishing status filter
    if (filters.furnishingStatus.length > 0 && !filters.furnishingStatus.includes(property.furnishingStatus)) return false;

    // Quick filters (now accessed from filters state)
    if (filters.owner && property.postedBy !== 'Owner') return false;
    if (filters.verified && !property.verified) return false;
    if (filters.furnished && property.furnishingStatus === 'Unfurnished') return false; // Assuming 'Unfurnished' is the opposite
    if (filters.withPhotos && !property.hasPhotos) return false;
    if (filters.withVideos && !property.hasVideos) return false;

    return true;
  });

  // Sort properties based on selected option
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    // Ensure prices are numbers for sorting
    const priceA = typeof a.price === 'number' ? a.price : 0;
    const priceB = typeof b.price === 'number' ? b.price : 0;
    switch (sortBy) {
      case 'price_low_high':
        return priceA - priceB;
      case 'price_high_low':
        return priceB - priceA;
      case 'latest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <div className="pb-16 lg:pb-0">
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
          <button
            className="flex-1 p-3 flex items-center justify-center gap-2"
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            <BiSort />
            Sort
          </button>
        </div>

        {/* Mobile Sort Dropdown */}
        {isSortOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t shadow-lg">
            <button
              className="w-full p-3 text-left hover:bg-gray-50"
              onClick={() => {
                setSortBy('relevance');
                setIsSortOpen(false);
              }}
            >
              Relevance
            </button>
            <button
              className="w-full p-3 text-left hover:bg-gray-50"
              onClick={() => {
                setSortBy('price_low_high');
                setIsSortOpen(false);
              }}
            >
              Price - Low to High
            </button>
            <button
              className="w-full p-3 text-left hover:bg-gray-50"
              onClick={() => {
                setSortBy('price_high_low');
                setIsSortOpen(false);
              }}
            >
              Price - High to Low
            </button>
            <button
              className="w-full p-3 text-left hover:bg-gray-50"
              onClick={() => {
                setSortBy('latest');
                setIsSortOpen(false);
              }}
            >
              Latest First
            </button>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="flex min-h-screen bg-gray-100">
        {/* Desktop Filters */}
        <div className="hidden lg:block w-1/4 p-4">
          <PropertyFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 p-4">
          {/* Quick Filters - Desktop Only */}
          <div className="hidden lg:flex mb-4 flex-wrap gap-2">
            <button
              onClick={() => handleQuickFilterChange('owner')}
              className={`px-3 py-1 rounded-full border ${
                filters.owner ? 'bg-blue-600 text-white' : 'border-gray-300'
              }`}
            >
              Owner
            </button>
            <button
              onClick={() => handleQuickFilterChange('verified')}
              className={`px-3 py-1 rounded-full border ${
                filters.verified ? 'bg-blue-600 text-white' : 'border-gray-300'
              }`}
            >
              Verified
            </button>
            <button
              onClick={() => handleQuickFilterChange('furnished')}
              className={`px-3 py-1 rounded-full border ${
                filters.furnished ? 'bg-blue-600 text-white' : 'border-gray-300'
              }`}
            >
              Furnished
            </button>
            <button
              onClick={() => handleQuickFilterChange('withPhotos')}
              className={`px-3 py-1 rounded-full border ${
                filters.withPhotos ? 'bg-blue-600 text-white' : 'border-gray-300'
              }`}
            >
              With Photos
            </button>
            <button
              onClick={() => handleQuickFilterChange('withVideos')}
              className={`px-3 py-1 rounded-full border ${
                filters.withVideos ? 'bg-blue-600 text-white' : 'border-gray-300'
              }`}
            >
              With Videos
            </button>
          </div>

          {/* Sort Dropdown - Desktop Only */}
          <div className="hidden lg:block mb-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="relevance">Relevance</option>
              <option value="price_low_high">Price - Low to High</option>
              <option value="price_high_low">Price - High to Low</option>
              <option value="latest">Latest First</option>
            </select>
          </div>

          {/* Property Cards Grid */}
          <div className="grid grid-cols-1 gap-4">
            {sortedProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {sortedProperties.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No properties found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <MobileFilters
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      {/* Bottom Navigation */}
      {/* <BottomNavigation /> */}
    </div>
  );
} 