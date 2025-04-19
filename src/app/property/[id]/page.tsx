'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaWhatsapp, FaPhoneAlt, FaParking, FaSwimmingPool } from 'react-icons/fa';
import { IoArrowBack, IoShareSocialOutline, IoHeartOutline, IoLocationOutline } from 'react-icons/io5';
import { BiArea, BiBuildingHouse, BiCalendar } from 'react-icons/bi';
import { MdOutlineVerified, MdSecurity, MdElevator } from 'react-icons/md';
import { getPropertyById } from '@/services/propertyService';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number | 'on_request' | undefined;
  deposit?: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  areaSqm: number;
  images: string[];
  type: string;
  status?: string;
  highlights?: string[];
  floor?: string;
  propertyAge?: string;
  carpetArea?: string;
  ownership?: string;
  postedTime: string;
  builder: string;
  propertyType: string;
  hasRera: boolean;
  contactCount?: number;
  furnishingStatus?: string;
  availableFor?: string[];
  postedBy?: string;
  amenities?: string[];
  locality?: string;
  projectSociety?: string;
  availableFrom?: string;
  propertyFacing?: string;
  flooringType?: string;
  waterAvailability?: string;
  powerBackup?: string;
  totalFloors?: string;
  balconies?: number;
  parkingCount?: {
    covered?: number;
    open?: number;
  };
  additionalRooms?: string[];
  nearbyPlaces?: string[];
}

// ImageGalleryModal component
const ImageGalleryModal = ({ 
  images, 
  currentIndex, 
  onClose, 
  onImageSelect 
}: { 
  images: string[]; 
  currentIndex: number; 
  onClose: () => void; 
  onImageSelect: (index: number) => void;
}) => {
  const handlePrevious = () => {
    onImageSelect(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    onImageSelect(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl mx-auto h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main image container */}
        <div className="flex-1 relative">
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-contain"
          />
          
          {/* Navigation arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Thumbnails */}
        <div className="h-24 mt-4">
          <div className="flex gap-2 justify-center items-center h-full overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => onImageSelect(index)}
                className={`flex-shrink-0 h-20 w-20 border-2 transition-all ${
                  index === currentIndex ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Image counter */}
        <div className="absolute top-4 left-4 text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default function PropertyDetails() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number | 'on_request' | undefined) => {
    if (!price || price === 'on_request') return 'Price on Request';
    if (typeof price !== 'number') return 'Price on Request';
    if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `₹ ${(price / 100000).toFixed(1)} Lac`;
    return `₹ ${price.toLocaleString()}`;
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyData = await getPropertyById(params.id as string);
        setProperty(propertyData);
      } catch (err) {
        setError('Property not found');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bc9b54]"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">{error || 'Property not found'}</p>
      </div>
    );
  }

  const keyStats = [
    { icon: <BiBuildingHouse />, label: `${property.bedrooms} BHK`, value: property.bathrooms ? `${property.bathrooms} Baths` : '' },
    { icon: <BiArea />, label: 'Area', value: `${property.area} ${property.areaUnit}` },
    { icon: <FaParking />, label: 'Parking', value: property.parkingCount ? `${property.parkingCount.covered || 0} Covered` : 'No Parking' },
    { icon: <BiCalendar />, label: 'Available', value: property.availableFrom || 'Ready to Move' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white z-30 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <button onClick={() => window.history.back()} className="p-2 text-gray-700">
            <IoArrowBack className="text-xl" />
          </button>
          <div className="flex-1 mx-4">
            <p className="text-center font-medium truncate">{property.title}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-700">
              <IoHeartOutline className="text-xl" />
            </button>
            <button className="p-2 text-gray-700">
              <IoShareSocialOutline className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex justify-between flex-row gap-4 p-4">
          <div className="relative h-full shadow-2xl">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-2/4 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => {
                setCurrentImageIndex(0);
                setShowGallery(true);
              }}
            />
            {/* {property.images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                +{property.images.length - 1} more
              </div>
            )} */}
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative shadow-2xl">
                <img
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  className="w-40 h-40 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => {
                    setCurrentImageIndex(index + 1);
                    setShowGallery(true);
                  }}
                />
                {index === 3 && property.images.length > 5 && (
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg cursor-pointer hover:bg-opacity-60 transition-opacity"
                    onClick={() => {
                      setCurrentImageIndex(4);
                      setShowGallery(true);
                    }}
                  >
                    <span className="text-white text-lg font-semibold">
                      +{property.images.length - 5} more
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        {/* Price and Basic Info */}
        <div className="bg-white p-4 rounded-lg  mb-4 shadow-2xl inner-shadow">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{formatPrice(property.price)}</h1>
          {property.deposit && (
            <p className="text-sm text-gray-600">Security Deposit: {formatPrice(property.deposit)}</p>
          )}
          <p className="text-sm text-gray-600 mb-3">{property.title} in {property.location}</p>
          <div className="flex items-center text-xs text-gray-500 gap-3 mb-3">
            {property.status && <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{property.status}</span>}
            {property.hasRera && (
              <span className="flex-shrink-0 text-blue-500 text-xs font-medium border border-blue-500 px-1.5 py-0.5 rounded">
                ✓ RERA
              </span>
            )}
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t pt-4">
            {keyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl text-[#bc9b54] mb-1 inline-block">{stat.icon}</div>
                <p className="text-sm font-medium text-gray-800">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location Details */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            <IoLocationOutline className="inline-block mr-2" />
            Location Details
          </h2>
          <div className="space-y-2">
            <p className="text-sm"><span className="text-gray-600">Locality:</span> {property.locality}</p>
            <p className="text-sm"><span className="text-gray-600">Project/Society:</span> {property.projectSociety}</p>
            {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Nearby Places:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {property.nearbyPlaces.map((place, index) => (
                    <li key={index}>{place}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Overview</h2>

          {/* Property Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-gray-600">Property Type:</span><br />
                {property.propertyType}
              </p>
              <p className="text-sm">
                <span className="text-gray-600">Furnishing:</span><br />
                {property.furnishingStatus || 'Unfurnished'}
              </p>
              <p className="text-sm">
                <span className="text-gray-600">Available For:</span><br />
                {property.availableFor?.join(', ') || 'All'}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-gray-600">Floor:</span><br />
                {property.floor} of {property.totalFloors} Floors
              </p>
              <p className="text-sm">
                <span className="text-gray-600">Property Age:</span><br />
                {property.propertyAge}
              </p>
              <p className="text-sm">
                <span className="text-gray-600">Facing:</span><br />
                {property.propertyFacing}
              </p>
            </div>
          </div>

          {/* Area Details */}
          <div className="border-t pt-4 mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Area Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-600">Super Built-up Area:</span><br />
                  {property.area} {property.areaUnit}
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Carpet Area:</span><br />
                  {property.carpetArea}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-600">Balconies:</span><br />
                  {property.balconies || 0}
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Flooring:</span><br />
                  {property.flooringType}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Rooms */}
          {property.additionalRooms && property.additionalRooms.length > 0 && (
            <div className="border-t pt-4 mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Additional Rooms</h3>
              <div className="flex flex-wrap gap-2">
                {property.additionalRooms.map((room, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                    {room}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="border-t pt-4 mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <MdOutlineVerified className="text-green-500" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Features */}
          <div className="border-t pt-4 mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Other Features</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-600">Water Availability:</span><br />
                  {property.waterAvailability || '24x7'}
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Status:</span><br />
                  {property.status}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-600">Power Backup:</span><br />
                  {property.powerBackup || 'No'}
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Ownership:</span><br />
                  {property.ownership}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t pt-4">
            <h3 className="font-medium text-gray-700 mb-2">Description</h3>
            <p className="text-sm text-gray-600 whitespace-pre-line">{property.description}</p>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="container mx-auto flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg">
              <FaWhatsapp className="text-xl" />
              WhatsApp
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg">
              <FaPhoneAlt />
              Call
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {showGallery && (
        <ImageGalleryModal
          images={property.images}
          currentIndex={currentImageIndex}
          onClose={() => setShowGallery(false)}
          onImageSelect={setCurrentImageIndex}
        />
      )}
    </div>
  );
}