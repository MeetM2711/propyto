'use client'
import React, { useState } from 'react';

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

interface PropertyFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export default function PropertyFilters({ filters, setFilters }: PropertyFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    budget: true,
    bedrooms: true,
    propertyType: true,
    availableFor: true,
    postedBy: true,
    furnishingStatus: true,
    localities: true,
    projectsSocieties: true,
    bathrooms: true,
    amenities: true,
    area: true,
    availableFrom: true,
    propertyAge: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (section: keyof Filters, value: string | number) => {
    setFilters({
      ...filters,
      [section]: Array.isArray(filters[section])
        ? (filters[section] as Array<any>).includes(value)
          ? (filters[section] as Array<any>).filter(item => item !== value)
          : [...(filters[section] as Array<any>), value]
        : filters[section]
    });
  };

  const handleRangeChange = (section: 'budget' | 'area', key: 'min' | 'max', value: number) => {
    setFilters({
      ...filters,
      [section]: {
        ...filters[section],
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Budget Filter */}
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('budget')}
        >
          <h3 className="text-lg font-medium text-gray-900">Budget</h3>
          <span className={`transform transition-transform ${expandedSections.budget ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.budget && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="4000000"
                value={filters.budget.max}
                onChange={(e) => handleRangeChange('budget', 'max', Number(e.target.value))}
                className="w-full accent-[#bc9b54]"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Min Budget"
                value={filters.budget.min}
                onChange={(e) => handleRangeChange('budget', 'min', Number(e.target.value))}
                className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="number"
                placeholder="Max Budget"
                value={filters.budget.max}
                onChange={(e) => handleRangeChange('budget', 'max', Number(e.target.value))}
                className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>
        )}
      </div>

      {/* No. of Bedrooms */}
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('bedrooms')}
        >
          <h3 className="text-lg font-medium text-gray-900">No. of Bedrooms</h3>
          <span className={`transform transition-transform ${expandedSections.bedrooms ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.bedrooms && (
          <div className="mt-4 space-y-2">
            {[1, 2, 3, 4, 5].map((count) => (
              <label key={count} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.bedrooms.includes(count)}
                  onChange={() => handleCheckboxChange('bedrooms', count)}
                  className="form-checkbox text-[#bc9b54]"
                />
                <span className="ml-2">{count} BHK</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Property Type */}
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('propertyType')}
        >
          <h3 className="text-lg font-medium text-gray-900">Type of property</h3>
          <span className={`transform transition-transform ${expandedSections.propertyType ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.propertyType && (
          <div className="mt-4 space-y-2">
            {[
              'Residential Apartment',
              'Independent House/Villa',
              'Independent/Builder Floor',
              '1 RK/ Studio Apartment',
              'Farm House'
            ].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.propertyType.includes(type)}
                  onChange={() => handleCheckboxChange('propertyType', type)}
                  className="form-checkbox text-[#bc9b54]"
                />
                <span className="ml-2">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Available for */}
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('availableFor')}
        >
          <h3 className="text-lg font-medium text-gray-900">Available for</h3>
          <span className={`transform transition-transform ${expandedSections.availableFor ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.availableFor && (
          <div className="mt-4 space-y-2">
            {['Family', 'Single Women', 'Single Men', 'Tenants with Company Lease'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.availableFor.includes(type)}
                  onChange={() => handleCheckboxChange('availableFor', type)}
                  className="form-checkbox text-[#bc9b54]"
                />
                <span className="ml-2">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Posted by */}
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('postedBy')}
        >
          <h3 className="text-lg font-medium text-gray-900">Posted by</h3>
          <span className={`transform transition-transform ${expandedSections.postedBy ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.postedBy && (
          <div className="mt-4 space-y-2">
            {['Owner', 'Builder', 'Dealer', 'Feature Dealer'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.postedBy.includes(type)}
                  onChange={() => handleCheckboxChange('postedBy', type)}
                  className="form-checkbox text-[#bc9b54]"
                />
                <span className="ml-2">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Furnishing status */}
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('furnishingStatus')}
        >
          <h3 className="text-lg font-medium text-gray-900">Furnishing status</h3>
          <span className={`transform transition-transform ${expandedSections.furnishingStatus ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.furnishingStatus && (
          <div className="mt-4 space-y-2">
            {['Semifurnished', 'Furnished', 'Unfurnished'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.furnishingStatus.includes(type)}
                  onChange={() => handleCheckboxChange('furnishingStatus', type)}
                  className="form-checkbox text-[#bc9b54]"
                />
                <span className="ml-2">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Localities */}
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('localities')}
        >
          <h3 className="text-lg font-medium text-gray-900">Localities</h3>
          <span className={`transform transition-transform ${expandedSections.localities ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.localities && (
          <div className="mt-4 space-y-2">
            {[
              { name: 'Vesu', rating: '4.5 ★' },
              { name: 'Palanpur', rating: '4.2 ★' },
              { name: 'PAL', rating: '4.2 ★' },
              { name: 'Adajan', rating: '4.3 ★' },
              { name: 'Jahangirabad', rating: '3.9 ★' }
            ].map((locality) => (
              <label key={locality.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.localities.includes(locality.name)}
                    onChange={() => handleCheckboxChange('localities', locality.name)}
                    className="form-checkbox text-[#bc9b54]"
                  />
                  <span className="ml-2">{locality.name}</span>
                </div>
                <span className="text-sm text-gray-500">{locality.rating}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('projectsSocieties')}
        >
          <h3 className="text-lg font-medium text-gray-900">New Projects / Societies</h3>
          <span className={`transform transition-transform ${expandedSections.projectsSocieties ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.projectsSocieties && (
          <div className="mt-4 space-y-2">
            {[
              'Rajhans Synfonia',
              'Happy Home Nakshatra Nebula',
              'Green City',
              'Happy Nakshatra Galaxia',
              'Sai Milaap Residency and Shoppers'
            ].map((project) => (
              <label key={project} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.projectsSocieties.includes(project)}
                  onChange={() => handleCheckboxChange('projectsSocieties', project)}
                  className="form-checkbox text-[#bc9b54]"
                />
                <span className="ml-2">{project}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Bathrooms */}
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('bathrooms')}
        >
          <h3 className="text-lg font-medium text-gray-900">No. of bathrooms</h3>
          <span className={`transform transition-transform ${expandedSections.bathrooms ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.bathrooms && (
          <div className="mt-4 space-y-2">
            {[1, 2, 3, 4, 5].map((count) => (
              <label key={count} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.bathrooms.includes(count)}
                  onChange={() => handleCheckboxChange('bathrooms', count)}
                  className="form-checkbox text-[#bc9b54]"
                />
                <span className="ml-2">{count}+ Bath</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Amenities */}
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('amenities')}
        >
          <h3 className="text-lg font-medium text-gray-900">Amenities</h3>
          <span className={`transform transition-transform ${expandedSections.amenities ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.amenities && (
          <div className="mt-4 space-y-2">
            {['Parking', 'Power Backup', 'Park', 'Lift', 'Vaastu Compliant'].map((amenity) => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleCheckboxChange('amenities', amenity)}
                  className="form-checkbox text-[#bc9b54]"
                />
                <span className="ml-2">{amenity}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Area */}
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('area')}
        >
          <h3 className="text-lg font-medium text-gray-900">Area</h3>
          <span className={`transform transition-transform ${expandedSections.area ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.area && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="4000"
                value={filters.area.max}
                onChange={(e) => handleRangeChange('area', 'max', Number(e.target.value))}
                className="w-full accent-[#bc9b54]"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Min Area"
                value={filters.area.min}
                onChange={(e) => handleRangeChange('area', 'min', Number(e.target.value))}
                className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="number"
                placeholder="Max Area"
                value={filters.area.max}
                onChange={(e) => handleRangeChange('area', 'max', Number(e.target.value))}
                className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>
        )}
      </div>

      {/* Available from */}
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('availableFrom')}
        >
          <h3 className="text-lg font-medium text-gray-900">Available from</h3>
          <span className={`transform transition-transform ${expandedSections.availableFrom ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.availableFrom && (
          <div className="mt-4 space-y-2">
            {['Any Time', 'Immediately', 'Within 1 Month', 'After 1 Month', 'Within 3 Months'].map((time) => (
              <label key={time} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.availableFrom.includes(time)}
                  onChange={() => handleCheckboxChange('availableFrom', time)}
                  className="form-checkbox text-[#bc9b54]"
                />
                <span className="ml-2">{time}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Age of Property */}
      <div className="border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => toggleSection('propertyAge')}
        >
          <h3 className="text-lg font-medium text-gray-900">Age of Property</h3>
          <span className={`transform transition-transform ${expandedSections.propertyAge ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.propertyAge && (
          <div className="mt-4 space-y-2">
            {[
              '0-1 years old',
              '1-5 years old',
              '5-10 years old',
              '10+ years old',
              '20+ years old'
            ].map((age) => (
              <label key={age} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.propertyAge.includes(age)}
                  onChange={() => handleCheckboxChange('propertyAge', age)}
                  className="form-checkbox text-[#bc9b54]"
                />
                <span className="ml-2">{age}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
