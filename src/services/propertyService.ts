// Property data interface
export interface Property {
  id: string;
  title: string;
  price: number | 'on_request' | undefined;
  deposit?: number;
  area: number;
  areaUnit: string;
  areaSqm: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  type: string;
  description: string;
  builder: string;
  postedTime: string;
  featured: boolean;
  hasRera: boolean;
  carpetArea?: string;
  status?: string;
  contactCount?: number;
  images: string[];
  furnishingStatus?: string;
  availableFor?: string[];
  postedBy?: string;
  amenities?: string[];
  locality?: string;
  projectSociety?: string;
  propertyAge?: string;
  availableFrom?: string;
  highlights?: string[];
  hasPhotos?: boolean;
  hasVideos?: boolean;
  verified?: boolean;
  lookingTo?: 'Rent' | 'Sell';
}

// All properties data
let properties: Property[] = [
  // Buy properties
  {
    id: "1",
    title: "Luxurious Villa with Pool",
    price: 35000000,
    area: 4500,
    areaUnit: "sqft",
    areaSqm: 418,
    location: "Vesu, Surat",
    bedrooms: 5,
    bathrooms: 5,
    propertyType: "Independent House/Villa",
    type: "villa",
    description: "Stunning 5 BHK Villa in Vesu with private pool and garden.",
    builder: "Renowned Builders",
    postedTime: "1mo ago",
    featured: true,
    hasRera: true,
    carpetArea: "3800 sqft",
    status: "Ready To Move",
    contactCount: 5,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
    ]
  },
  {
    id: "2",
    title: "Modern City Apartment",
    price: 8500000,
    area: 1800,
    areaUnit: "sqft",
    areaSqm: 167,
    location: "Adajan, Surat",
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Residential Apartment",
    type: "apartment",
    description: "Spacious 3 BHK apartment in a prime Adajan location.",
    builder: "City Developers",
    postedTime: "3w ago",
    featured: false,
    hasRera: true,
    carpetArea: "1500 sqft",
    status: "Ready To Move",
    contactCount: 12,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
    ]
  },
  // Rent properties
  {
    id: "3",
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
    type: "apartment",
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
    carpetArea: "1000 sqft",
    status: "Ready To Move",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
    ]
  },
  {
    id: "4",
    title: "Luxury Apartment in Vesu",
    price: 25000,
    deposit: 5,
    area: 1500,
    areaUnit: "sqft",
    areaSqm: 139,
    location: "Vesu, Surat",
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Apartment",
    type: "apartment",
    furnishingStatus: "Fully Furnished",
    availableFor: ["Family"],
    postedBy: "Owner",
    amenities: ["Swimming Pool", "Gym", "Club House", "24x7 Security"],
    locality: "Vesu",
    projectSociety: "Luxury Heights",
    propertyAge: "0-5 years",
    availableFrom: "Immediate",
    highlights: ["South Facing", "Premium Location", "Modern Amenities"],
    featured: true,
    hasPhotos: true,
    hasVideos: true,
    verified: true,
    description: "Luxurious 3 BHK apartment in prime Vesu location with premium amenities.",
    builder: "Elite Builders",
    postedTime: "1mo ago",
    contactCount: 8,
    hasRera: true,
    carpetArea: "1300 sqft",
    status: "Ready To Move",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
    ]
  }
];

// Function to format form data into property data
export const formatPropertyData = (data: any): Property => {
  return {
    id: data.id || Date.now().toString(),
    title: data.title || '',
    price: data.price || 'on_request',
    deposit: data.deposit,
    area: data.area || 0,
    areaUnit: data.areaUnit || 'sqft',
    areaSqm: data.areaSqm || 0,
    location: data.location || '',
    bedrooms: data.bedrooms || 0,
    bathrooms: data.bathrooms || 0,
    propertyType: data.propertyType || '',
    type: data.type || '',
    description: data.description || '',
    builder: data.builder || '',
    postedTime: data.postedTime || new Date().toISOString(),
    featured: data.featured || false,
    hasRera: data.hasRera || false,
    carpetArea: data.carpetArea,
    status: data.status || 'active',
    contactCount: data.contactCount || 0,
    images: data.images || [],
    furnishingStatus: data.furnishingStatus,
    availableFor: data.availableFor,
    postedBy: data.postedBy,
    amenities: data.amenities,
    locality: data.locality,
    projectSociety: data.projectSociety,
    propertyAge: data.propertyAge,
    availableFrom: data.availableFrom,
    highlights: data.highlights,
    hasPhotos: data.hasPhotos || false,
    hasVideos: data.hasVideos || false,
    verified: data.verified || false,
    lookingTo: data.lookingTo || 'Sell'
  };
};

// Function to save property to localStorage
export const saveProperty = (propertyData: any) => {
  const formattedProperty = formatPropertyData(propertyData);
  const existingProperties = JSON.parse(localStorage.getItem('properties') || '[]');
  existingProperties.unshift(formattedProperty); // Add to beginning of array
  localStorage.setItem('properties', JSON.stringify(existingProperties));
  return formattedProperty;
};

// Function to get all properties
export const getAllProperties = (): Property[] => {
  if (typeof window === 'undefined') return [];
  const properties = localStorage.getItem('properties');
  return properties ? JSON.parse(properties) : [];
};

// Function to get properties by type
export const getPropertiesByType = (type: 'Rent' | 'Sell'): Property[] => {
  const properties = getAllProperties();
  return properties.filter(property => 
    property.lookingTo === type && property.status === 'active'
  );
};

// Function to get property by ID
export const getPropertyById = (id: string): Property | null => {
  const properties = getAllProperties();
  return properties.find(property => property.id === id) || null;
};

// Function to add a new property
export const addProperty = async (property: Omit<Property, 'id'>) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newProperty = {
    ...property,
    id: (properties.length + 1).toString()
  };
  
  properties.push(newProperty);
  return newProperty;
};

// Function to get properties for buy page
export const getBuyProperties = async () => {
  return getPropertiesByType('Sell');
};

// Function to get properties for rent page
export const getRentProperties = async () => {
  return getPropertiesByType('Rent');
};

// Function to get featured properties for hero section
export const getFeaturedProperties = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return properties.filter(p => p.featured).slice(0, 4);
}; 