import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropertyImage from '@/assets/images/welldesigned.png';
import LoginPopup from './LoginPopup';

const residentialPropertyTypes = [
  { id: 'flat', label: 'Flat/Apartment' },
  { id: 'villa', label: 'Independent House / Villa' },
  { id: 'floor', label: 'Independent / Builder Floor' },
  { id: 'plot', label: 'Plot / Land' },
  { id: 'studio', label: '1 RK/ Studio Apartment' },
  { id: 'serviced', label: 'Serviced Apartment' },
  { id: 'farmhouse', label: 'Farmhouse' },
  { id: 'other', label: 'Other' }
];

const commercialPropertyTypes = [
  { id: 'office', label: 'Office' },
  { id: 'retail', label: 'Retail' },
  { id: 'plot', label: 'Plot / Land' },
  { id: 'storage', label: 'Storage' },
  { id: 'industry', label: 'Industry' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'other', label: 'Other' }
];

const pgPropertyTypes = [
  { id: 'single', label: 'Single Room' },
  { id: 'shared', label: 'Shared Room' },
  { id: 'hostel', label: 'Hostel' },
  { id: 'one-rk', label: '1 RK' },
  { id: 'apartment', label: 'Full Apartment' },
  { id: 'other', label: 'Other' }
];

const PostProperty = () => {
  const router = useRouter();
  const [propertyFor, setPropertyFor] = useState('Sell');
  const [propertyType, setPropertyType] = useState('Residential');
  const [selectedSubType, setSelectedSubType] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPG, setIsPG] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const features = [
    'Advertise for FREE',
    'Get unlimited enquiries',
    'Get shortlisted buyers and tenants*',
    'Assistance in co-ordinating site visits*'
  ];

  const getPropertyTypes = () => {
    if (propertyType === 'Commercial') return commercialPropertyTypes;
    if (isPG) return pgPropertyTypes;
    return residentialPropertyTypes;
  };

  const currentPropertyTypes = getPropertyTypes();

  useEffect(() => {
      try {
          const storedUser = localStorage.getItem('loggedInUser');
          if (storedUser) {
              setIsLoggedIn(true);
              console.log('User found in Local Storage', JSON.parse(storedUser));
          } else {
              setIsLoggedIn(false);
          }
      } catch (error) {
          console.error("Error reading from Local Storage:", error);
          setIsLoggedIn(false);
      }
      setIsLoadingAuth(false);
  }, []);

  const handlePropertyForChange = (type: string) => {
    setPropertyFor(type);
    setSelectedSubType(null);
    setErrorMessage(null);
    if (type === 'PG') {
      setIsPG(true);
      setPropertyType('Residential');
    } else {
      setIsPG(false);
    }
  };

  const handlePropertyTypeChange = (type: string) => {
    setPropertyType(type);
    setSelectedSubType(null);
    setErrorMessage(null);
  };

  const handleSubTypeClick = (typeId: string) => {
    setSelectedSubType(typeId);
    setErrorMessage(null);
  };

  const handleStartNowClick = () => {
    setErrorMessage(null);

    if (!isLoggedIn) {
        setErrorMessage('Please login first to post your property.');
        setIsLoginPopupOpen(true);
        return;
    }

    if (!selectedSubType) {
      setErrorMessage('Please select the type of property you wish to advertise');
      return; 
    }

    if (!phoneNumber || phoneNumber.trim().length === 0) {
        setErrorMessage('Please enter your contact phone number.');
        return;
    }

    if (phoneNumber.trim().length !== 10) {
        setErrorMessage('Please enter a valid 10-digit phone number.');
        return;
    }

    console.log('Validation passed! Proceeding to multi-step form...');
    console.log('Data:', { propertyFor, propertyType, selectedSubType, phoneNumber });
    router.push('/post-property/new');
  };

  const handleLoginSuccess = () => {
      try {
          const storedUser = localStorage.getItem('loggedInUser');
          if (storedUser) {
              setIsLoggedIn(true);
              console.log('Login successful, user:', JSON.parse(storedUser));
          } else {
              setIsLoggedIn(false); 
              console.error("Login success handler called, but no user found in local storage.");
          }
      } catch (error) {
          console.error("Error reading from Local Storage after login:", error);
          setIsLoggedIn(false);
      }
      setIsLoginPopupOpen(false);
      setErrorMessage(null);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('loggedInUser');
      setIsLoggedIn(false);
      console.log('User logged out and removed from Local Storage');
    } catch (error) {
       console.error("Error removing from Local Storage:", error);
    }
  };

  if (isLoadingAuth) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>; 
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#1a1a1a] py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {isPG ? 'List your PG/Hostel' : 'Sell or Rent your Property'}
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6">
              <span className="text-[#bc9b54]">online faster</span> with Propyto
            </h2>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#bc9b54]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="relative w-full max-w-xl">
              <Image
                src={PropertyImage}
                alt="Post Property"
                width={500}
                height={400}
                className="w-full"
              />
            </div>

            <p className="text-sm text-gray-400 mt-4">
              * Available with Owner Assist Plans
            </p>
          </div>

          {/* Right Section - Form */}
          <div className="w-full lg:w-1/2 max-w-md">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Start posting your property, it's free
              </h3>

              {/* Basic Details */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">You're looking to ...</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {propertyType === 'Residential' 
                      ? ['Sell', 'Rent / Lease', 'PG'].map((type) => (
                          <button
                            key={type}
                            onClick={() => handlePropertyForChange(type)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                              ${(propertyFor === type || (type === 'PG' && isPG))
                                ? 'bg-gradient-to-r from-[#bc9b54] to-[#c69531] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                          >
                            {type}
                          </button>
                        ))
                      : ['Sell', 'Rent / Lease'].map((type) => (
                          <button
                            key={type}
                            onClick={() => handlePropertyForChange(type)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                              ${propertyFor === type
                                ? 'bg-gradient-to-r from-[#bc9b54] to-[#c69531] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                          >
                            {type}
                          </button>
                        ))
                    }
                  </div>
                </div>

                {!isPG && (
                  <div>
                    <label className="text-sm text-gray-600">And it's a ...</label>
                    <div className="flex gap-2 mt-1">
                      {['Residential', 'Commercial'].map((type) => (
                        <button
                          key={type}
                          onClick={() => handlePropertyTypeChange(type)}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                            ${propertyType === type
                              ? 'bg-gradient-to-r from-[#bc9b54] to-[#c69531] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm text-gray-600">What kind of property do you have?</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {currentPropertyTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleSubTypeClick(type.id)}
                        className={`px-4 py-2 rounded-md text-sm transition-colors text-left
                          ${selectedSubType === type.id
                            ? 'bg-gradient-to-r from-[#bc9b54] to-[#c69531] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-4">
                    {errorMessage && (
                        <p className="text-xs text-red-600 mt-1">{errorMessage}</p>
                    )}
                </div>

                <div>
                  <label className="text-sm text-gray-600">
                    Your contact details for the {isPG ? 'tenant' : 'buyer'} to reach you
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    disabled={!isLoggedIn}
                    className={`mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bc9b54] focus:border-transparent ${!isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                  {!isLoggedIn && (
                     <p className="text-xs text-red-600 mt-1">
                         Please{' '}
                         <button
                             type="button"
                             onClick={() => setIsLoginPopupOpen(true)}
                             className="font-medium text-[#bc9b54] hover:text-[#c69531] underline"
                         >
                             login
                         </button>{' '}
                         to add your phone number.
                     </p>
                  )}
                </div>

                <button 
                  onClick={handleStartNowClick}
                  className="w-full py-3 bg-gradient-to-r from-[#bc9b54] to-[#c69531] text-white rounded-md font-medium hover:from-[#c69531] hover:to-[#bc9b54] transition-all duration-300">
                  Start now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoggedIn && (
          <button onClick={handleLogout} className="text-red-500 text-sm mt-4">
              Logout (Test)
          </button>
      )}
      {isLoginPopupOpen && (
        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={() => setIsLoginPopupOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default PostProperty; 