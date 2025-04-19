'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FiFilter } from 'react-icons/fi';
import { BiSort } from 'react-icons/bi';
import { IoChevronDown, IoInformationCircleOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

// Define interfaces for step data
interface Step {
    id: number;
    title: string;
    subtitle: string;
    completed?: boolean;
    current?: boolean;
}

interface PropertyType {
    id: string;
    label: string;
    icon?: React.ReactNode; // Optional icon
    selected: boolean;
}

// Add new interfaces for file handling
interface FileWithPreview extends File {
    preview?: string;
}

// Add new interfaces for amenities
interface AmenitiesFormData {
    otherRooms: string[];
    furnishing: string;
    coveredParking: number;
    openParking: number;
    amenities: string[];
    propertyFeatures: string[];
    societyFeatures: string[];
    additionalFeatures: string[];
    waterSource: string[];
    overlooking: string[];
    otherFeatures: {
        gatedSociety: boolean;
        cornerProperty: boolean;
        petFriendly: boolean;
        wheelchairFriendly: boolean;
    };
    powerBackup: string;
    propertyFacing: string;
    flooringType: string;
    roadWidth: {
        value: string;
        unit: string;
    };
    locationAdvantages: string[];
}

// Add FormData interface at the top with other interfaces
interface FormData {
    propertyType: string;
    residentialType: string;
    lookingTo: string;
    city: string;
    locality: string;
    houseNo: string;
    projectSociety: string;
    apartmentType: string;
    bedrooms: number | null;
    bathrooms: number | null;
    balconies: number | null;
    carpetArea: string;
    carpetAreaUnit: string;
    builtUpArea: string;
    builtUpAreaUnit: string;
    superBuiltUpArea: string;
    superBuiltUpAreaUnit: string;
    totalFloors: string;
    propertyFloor: string;
    availabilityStatus: string;
    ownership: string;
    expectedPrice: string;
    pricePerSqFt: string;
    priceIncludesAll: boolean;
    priceIncludesTaxGovt: boolean;
    priceNegotiable: boolean;
    propertyDescription: string;
    subLocality: string;
    amenities: AmenitiesFormData;
}

// Add new interface for stored property
interface StoredProperty extends FormData {
    id: string;
    createdAt: string;
    images: string[];
    video?: string;
    status: 'active' | 'inactive';
    userId: string;
}

// Define initial steps
const initialSteps: Step[] = [
    { id: 1, title: 'Basic Details', subtitle: 'Step 1', current: true, completed: false },
    { id: 2, title: 'Location Details', subtitle: 'Step 2', current: false, completed: false },
    { id: 3, title: 'Property Profile', subtitle: 'Step 3', current: false, completed: false },
    { id: 4, title: 'Photos, Videos & Voice-over', subtitle: 'Step 4', current: false, completed: false },
    { id: 5, title: 'Amenities section', subtitle: 'Step 5', current: false, completed: false },
];

const propertyTypes: PropertyType[] = [
    { id: 'residential', label: 'Residential', selected: true },
    { id: 'commercial', label: 'Commercial', selected: false },
];

const residentialTypes = [
    { id: 'flat', label: 'Flat/Apartment' },
    { id: 'house', label: 'Independent House / Villa' },
    { id: 'floor', label: 'Independent / Builder Floor' },
    { id: 'plot', label: 'Plot / Land' },
    { id: 'studio', label: '1 RK/ Studio Apartment' },
    { id: 'serviced', label: 'Serviced Apartment' },
    { id: 'farmhouse', label: 'Farmhouse' },
    { id: 'other', label: 'Other' },
];

// Dummy data for dropdowns
const cities = ['Select City', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai'];
const localities = ['Select Locality', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield'];
const projects = ['Select Project/Society/Building', 'Prestige Shantiniketan', 'Brigade Gateway', 'Sobha Dream Acres'];
const areaUnits = ['sq.ft.', 'sq.m.', 'sq.yards', 'acres', 'hectares'];

// Helper component for button selections
interface SelectionButtonProps {
    options: string[];
    selected: string | number | null;
    onSelect: (value: string | number) => void;
    allowCustom?: boolean;
    label: string;
}

const SelectionButtons: React.FC<SelectionButtonProps> = ({ options, selected, onSelect, allowCustom, label }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    onClick={() => onSelect(option)}
                    className={`px-4 py-2 border rounded-md text-sm transition-colors ${selected === option ? 'bg-blue-100 text-blue-700 border-blue-300 font-medium' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}>
                    {option}
                </button>
            ))}
            {allowCustom && (
                <button type="button" onClick={() => onSelect('custom')} className={`px-4 py-2 border rounded-md text-sm transition-colors ${selected === 'custom' ? 'bg-blue-100 text-blue-700 border-blue-300 font-medium' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>+ Add other</button>
                // Add input field logic here if needed when 'custom' is selected
            )}
        </div>
    </div>
);

const PostPropertyNewPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [steps, setSteps] = useState<Step[]>(initialSteps);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [formData, setFormData] = useState<FormData>({
        // Step 1
        propertyType: 'residential',
        residentialType: '',
        lookingTo: 'Sell',
        // Step 2
        city: 'Surat',
        locality: 'Bhatar Char Rasta',
        houseNo: '',
        projectSociety: '',
        // Step 3
        apartmentType: '', // 1 BHK, 2 BHK...
        bedrooms: null,
        bathrooms: null,
        balconies: null,
        carpetArea: '',
        carpetAreaUnit: areaUnits[0], // Default unit
        builtUpArea: '',
        builtUpAreaUnit: areaUnits[0],
        superBuiltUpArea: '',
        superBuiltUpAreaUnit: areaUnits[0],
        totalFloors: '',
        propertyFloor: '',
        availabilityStatus: 'Ready to move', // Default
        ownership: 'Freehold', // Default
        expectedPrice: '',
        pricePerSqFt: '', // Calculated or input
        priceIncludesAll: false,
        priceIncludesTaxGovt: false,
        priceNegotiable: false,
        propertyDescription: '',
        subLocality: '',
        amenities: {
            otherRooms: [],
            furnishing: '',
            coveredParking: 0,
            openParking: 0,
            amenities: [],
            propertyFeatures: [],
            societyFeatures: [],
            additionalFeatures: [],
            waterSource: [],
            overlooking: [],
            otherFeatures: {
                gatedSociety: false,
                cornerProperty: false,
                petFriendly: false,
                wheelchairFriendly: false,
            },
            powerBackup: '',
            propertyFacing: '',
            flooringType: '',
            roadWidth: {
                value: '',
                unit: 'Feet'
            },
            locationAdvantages: []
        }
    });
    const [propertyScore, setPropertyScore] = useState(0);
    const [selectedPhotos, setSelectedPhotos] = useState<FileWithPreview[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Add file input refs
    const photoInputRef = React.useRef<HTMLInputElement>(null);
    const videoInputRef = React.useRef<HTMLInputElement>(null);

    // Function to handle general input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        // @ts-ignore - Handle checkbox checked property
        const inputValue = isCheckbox ? e.target.checked : value;
        setFormData((prev: FormData) => ({ ...prev, [name]: inputValue }));
    };

    // Function to handle selection buttons (bedrooms, bathrooms, etc.)
    const handleSelection = (field: string, value: string | number) => {
        setFormData((prev: FormData) => ({ ...prev, [field]: value }));
    };

    // Function to calculate score based on filled fields
    const calculateScore = () => {
        let score = 0;
        let filledCount = 0;

        // Step 1 Score (Base)
        if (completedSteps.includes(1) || (formData.propertyType && formData.lookingTo)) {
            score += 20;
        }

        // Step 2 Score
        const step2Fields = [formData.city, formData.locality, formData.houseNo, formData.projectSociety];
        step2Fields.forEach(field => {
            if (field && field !== 'Select City' && field !== 'Select Locality' && field !== 'Select Project/Society/Building') {
                filledCount++;
            }
        });
        if (currentStep > 2 || completedSteps.includes(2)) score += (filledCount * 5);

        // Step 3 Score
        filledCount = 0;
        const step3Fields = [
            formData.bedrooms,
            formData.bathrooms,
            formData.balconies,
            formData.carpetArea,
            formData.totalFloors,
            formData.propertyFloor,
            formData.availabilityStatus,
            formData.ownership,
            formData.expectedPrice,
            formData.propertyDescription
        ];
        step3Fields.forEach(field => {
             // Simple check: counts if field has any value
            if (field !== null && field !== '' && field !== undefined) {
                filledCount++;
            }
        });
         // Award points for filled fields in step 3 (e.g., 3 points each)
         if (currentStep >= 3 || completedSteps.includes(3)) score += (filledCount * 3);

         // Add more logic for Steps 4 & 5

        return Math.min(100, score); // Cap score at 100
    };

    // Update score whenever relevant formData changes or step changes
    useEffect(() => {
        setPropertyScore(calculateScore());
    }, [formData, currentStep, completedSteps]);

    // Function to calculate price per square foot
    const calculatePricePerSqFt = (price: string | number, area: string | number) => {
        const numPrice = Number(price);
        const numArea = Number(area);
        
        if (!isNaN(numPrice) && !isNaN(numArea) && numArea > 0) {
            return (numPrice / numArea).toFixed(2);
        }
        return '';
    };

    // Update the useEffect with proper typing
    useEffect(() => {
        if (formData.expectedPrice && formData.carpetArea) {
            const pricePerSqFt = calculatePricePerSqFt(formData.expectedPrice, formData.carpetArea);
            setFormData((prev: FormData) => ({ ...prev, pricePerSqFt }));
        }
    }, [formData.expectedPrice, formData.carpetArea]);

    // Function to update steps
    const updateSteps = (newCurrentStep: number, newCompletedSteps: number[]) => {
        setSteps(prevSteps =>
            prevSteps.map(step => ({
                ...step,
                current: step.id === newCurrentStep,
                completed: newCompletedSteps.includes(step.id)
            }))
        );
    };

    // Function to go to the next step
    const nextStep = () => {
        if (!isCurrentStepValid()) return;

        const newStep = Math.min(currentStep + 1, steps.length);
        const newCompletedSteps = [...completedSteps];
        
        if (!completedSteps.includes(currentStep)) {
            newCompletedSteps.push(currentStep);
        }

        setCurrentStep(newStep);
        setCompletedSteps(newCompletedSteps);
        updateSteps(newStep, newCompletedSteps);
    };

    // Function to go to a specific step
    const goToStep = (step: number) => {
        if (step < 1 || step > steps.length) return;
        if (step > 1 && !completedSteps.includes(step - 1)) return;

            setCurrentStep(step);
        updateSteps(step, completedSteps);
    };

    // --- Validation Logic --- 
    const isStep1Valid = () => formData.propertyType && formData.lookingTo;
    const isStep2Valid = () => {
        // Basic validation for required fields
        const hasCity = formData.city && formData.city.trim() !== '';
        const hasLocality = formData.locality && formData.locality.trim() !== '';
        
        // Return true if both required fields are present
        return hasCity && hasLocality;
    };
    const isStep3Valid = () => {
        // Add more checks as needed for Step 3
        return formData.bedrooms !== null &&
               formData.bathrooms !== null &&
               formData.balconies !== null &&
               formData.carpetArea &&
               formData.totalFloors &&
               formData.propertyFloor &&
               formData.expectedPrice &&
               formData.propertyDescription.length >= 50; // Example: require min description length
    };

    // Update the validation logic for step 4
    const isStep4Valid = () => {
        // Since photos and videos are optional (marked as "Optional" in UI),
        // we should always return true to allow proceeding
        return true;
    };

    // Update the validation function for step 5
    const isStep5Valid = () => {
        // Since all fields are optional in step 5, we can return true
        // You can add specific validation rules if needed
        return true;
    };

    // Update isCurrentStepValid to include step 5
    const isCurrentStepValid = () => {
         switch (currentStep) {
            case 1: return isStep1Valid();
            case 2: return isStep2Valid();
            case 3: return isStep3Valid();
            case 4: return isStep4Valid();
            case 5: return isStep5Valid();
            default: return false;
        }
    };

    // Handle photo selection
    const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validFiles = files.filter(file => {
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];
            const validSize = file.size <= 10 * 1024 * 1024; // 10MB
            return validTypes.includes(file.type) && validSize;
        });

        const newPhotos = validFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));

        setSelectedPhotos(prev => [...prev, ...newPhotos].slice(0, 50)); // Limit to 50 photos
    };

    // Handle video selection
    const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['video/mp4', 'video/quicktime', 'video/x-h264'];
            const validSize = file.size <= 80 * 1024 * 1024; // 80MB

            if (validTypes.includes(file.type) && validSize) {
                setSelectedVideo(file);
            } else {
                alert('Please select a valid video file (mp4, mov, or H264) under 80MB');
            }
        }
    };

    // Handle drag events
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // Handle drop
    const handleDrop = (e: React.DragEvent, type: 'photo' | 'video') => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files);
        
        if (type === 'photo') {
            const validFiles = files.filter(file => {
                const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];
                const validSize = file.size <= 10 * 1024 * 1024;
                return validTypes.includes(file.type) && validSize;
            });

            const newPhotos = validFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }));

            setSelectedPhotos(prev => [...prev, ...newPhotos].slice(0, 50));
        } else {
            const file = files[0];
            if (file) {
                const validTypes = ['video/mp4', 'video/quicktime', 'video/x-h264'];
                const validSize = file.size <= 80 * 1024 * 1024;

                if (validTypes.includes(file.type) && validSize) {
                    setSelectedVideo(file);
                } else {
                    alert('Please select a valid video file (mp4, mov, or H264) under 80MB');
                }
            }
        }
    };

    // Clean up previews on unmount
    useEffect(() => {
        return () => {
            selectedPhotos.forEach(photo => {
                if (photo.preview) URL.revokeObjectURL(photo.preview);
            });
        };
    }, [selectedPhotos]);

    // Function to convert File to base64
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    // Function to store property in localStorage
    const storeProperty = async () => {
        // Convert selected photos to base64
        const imagePromises = selectedPhotos.map(photo => fileToBase64(photo));
        const images = await Promise.all(imagePromises);

        // Convert video to base64 if exists
        let videoBase64 = null;
        if (selectedVideo) {
            videoBase64 = await fileToBase64(selectedVideo);
        }

        const propertyData = {
            ...formData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            images: images,
            video: videoBase64 || undefined,
            status: 'active',
            userId: 'current-user-id', // Replace with actual user ID when auth is implemented
            title: `${formData.bedrooms} BHK ${formData.residentialType} in ${formData.locality}`,
            price: formData.expectedPrice ? parseInt(formData.expectedPrice, 10) : 'on_request',
            area: parseInt(formData.carpetArea) || 0,
            areaUnit: formData.carpetAreaUnit || 'sqft',
            areaSqm: parseInt(formData.carpetArea) || 0,
            location: `${formData.locality}, ${formData.city}`,
            bedrooms: parseInt(formData.bedrooms) || 0,
            bathrooms: parseInt(formData.bathrooms) || 0,
            propertyType: formData.residentialType || 'Residential',
            type: formData.propertyType || 'residential',
            description: formData.propertyDescription || '',
            builder: 'Owner',
            postedTime: 'Just now',
            featured: false,
            hasRera: false,
            carpetArea: `${formData.carpetArea} ${formData.carpetAreaUnit}`,
            status: 'active',
            contactCount: 0,
            furnishingStatus: formData.furnishingStatus,
            availableFor: formData.availableFor,
            postedBy: 'Owner',
            amenities: formData.amenities,
            locality: formData.locality,
            projectSociety: formData.projectSociety,
            propertyAge: formData.propertyAge,
            availableFrom: formData.availableFrom,
            highlights: formData.highlights,
            hasPhotos: images.length > 0,
            hasVideos: !!videoBase64,
            verified: false,
            lookingTo: formData.lookingTo
        };

        // Save property using the service
        return saveProperty(propertyData);
    };

    // Update handleSubmit function
    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const property = await storeProperty();
            
            // Show success message
            alert('Property posted successfully!');
            
            // Redirect based on property type
            if (formData.lookingTo === 'Rent') {
                router.push('/rent');
            } else {
                router.push('/buy');
            }
        } catch (error) {
            console.error('Error submitting property:', error);
            alert('Failed to post property. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Function to render the content for the current step
    const renderStepContent = () => {
        const renderContinueButton = () => (
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#2B3B57] hover:bg-[#1F2937] text-white font-semibold py-3 px-8 rounded-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isCurrentStepValid()}
                >
                    {currentStep === steps.length ? 'Finish' : 'Post & continue'}
                </button>
            </div>
        );

        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold text-[#2B3B57]">Welcome back MEET MANGUKIYA,</h1>
                            <p className="text-gray-600">Fill out basic details</p>
                        </div>

                        {/* Looking To Section */}
                        <div className="mb-8">
                            <h2 className="text-lg font-medium text-[#2B3B57] mb-4">I'm looking to</h2>
                            <div className="flex flex-wrap gap-4">
                                {['Sell', 'Rent / Lease', 'PG'].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleSelection('lookingTo', option)}
                                        className={`px-6 py-2 rounded-md text-sm font-medium transition-colors
                                            ${formData.lookingTo === option 
                                                ? 'bg-[#5EBEA3]/10 text-[#5EBEA3] border border-[#5EBEA3]/20' 
                                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Property Type Section */}
                        <div className="mb-8">
                            <h2 className="text-lg font-medium text-[#2B3B57] mb-4">What kind of property do you have?</h2>
                            <div className="flex flex-wrap gap-4 mb-6">
                                {propertyTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => handleSelection('propertyType', type.id)}
                                        className={`px-6 py-2 rounded-md text-sm font-medium transition-colors
                                            ${formData.propertyType === type.id 
                                                ? 'bg-[#5EBEA3]/10 text-[#5EBEA3] border border-[#5EBEA3]/20' 
                                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>

                            {/* Residential Types Grid */}
                            {formData.propertyType === 'residential' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {residentialTypes.map((type) => (
                                    <button
                                            key={type.id}
                                            onClick={() => handleSelection('residentialType', type.id)}
                                            className={`p-4 text-left rounded-lg transition-colors
                                                ${formData.residentialType === type.id 
                                                    ? 'bg-[#5EBEA3]/10 text-[#5EBEA3] border border-[#5EBEA3]/20' 
                                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {type.label}
                                    </button>
                                ))}
                            </div>
                            )}
                        </div>

                        {renderContinueButton()}
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center mb-2">
                            <button onClick={() => goToStep(1)} className="text-gray-600 hover:text-gray-800 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back
                            </button>
                        </div>

                        <h3 className="text-2xl font-semibold text-[#2B3B57]">Where is your property located?</h3>
                        <p className="text-gray-600">An accurate location helps you connect with the right buyers</p>

                        {/* City Input */}
                        <div className="relative">
                            <label className="block text-sm text-gray-600 mb-1">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Locality Input */}
                        <div className="relative">
                            <label className="block text-sm text-gray-600 mb-1">Locality</label>
                            <input
                                type="text"
                                name="locality"
                                value={formData.locality}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Sub Locality Input */}
                        <div className="relative">
                            <label className="block text-sm text-gray-600 mb-1">Sub Locality (Optional)</label>
                             <input
                                type="text"
                                name="subLocality"
                                value={formData.subLocality}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="Enter sub locality"
                            />
                        </div>

                        {/* Apartment/Society Input */}
                         <div className="relative">
                            <label className="block text-sm text-gray-600 mb-1">Apartment / Society (Optional)</label>
                             <input
                                type="text"
                                name="projectSociety"
                                value={formData.projectSociety}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="Enter apartment or society name"
                             />
                         </div>

                        {/* Location Info Box */}
                        <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <img src="/location-icon.png" alt="Location" className="w-24 h-24" />
                         </div>
                            <div>
                                <h4 className="font-semibold text-[#2B3B57] mb-2">Why we need an accurate location?</h4>
                                <p className="text-gray-600">
                                    Location is the most important for Buyer's. By capturing a detailed location 
                                    we ensure we get you geniune enquiries.
                                </p>
                            </div>
                        </div>

                        {renderContinueButton()}
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-8">
                        <h3 className="text-xl font-semibold text-gray-900">Tell us about your property</h3>

                        {/* Apartment Type */} 
                        <SelectionButtons
                            label="Your apartment is a"
                            options={['1 BHK', '2 BHK', 'Other']}
                            selected={formData.apartmentType}
                            onSelect={(value) => handleSelection('apartmentType', value)}
                         />

                         {/* Room Details */} 
                        <div className="space-y-4">
                            <h4 className="text-md font-medium text-gray-800">Add Room Details</h4>
                             <SelectionButtons
                                label="No. of Bedrooms"
                                options={['1', '2', '3', '4']}
                                selected={formData.bedrooms}
                                onSelect={(value) => handleSelection('bedrooms', value)}
                                allowCustom
                             />
                             <SelectionButtons
                                label="No. of Bathrooms"
                                options={['1', '2', '3', '4']}
                                selected={formData.bathrooms}
                                onSelect={(value) => handleSelection('bathrooms', value)}
                                allowCustom
                             />
                             <SelectionButtons
                                label="Balconies"
                                options={['0', '1', '2', '3', 'More than 3']}
                                selected={formData.balconies}
                                onSelect={(value) => handleSelection('balconies', value)}
                             />
                        </div>

                        {/* Area Details */} 
                        <div className="space-y-4">
                             <div className="flex items-center gap-2">
                                <h4 className="text-md font-medium text-gray-800">Add Area Details</h4>
                                <IoInformationCircleOutline className="text-gray-400" title="At least one area type is mandatory"/>
                             </div>
                            <p className="text-xs text-gray-500">Atleast one area type is mandatory</p>
                            {/* Carpet Area */} 
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow">
                                    <label htmlFor="carpetArea" className="block text-xs font-medium text-gray-500 absolute -top-2 left-2 bg-white px-1">Carpet Area</label>
                                    <input
                                        type="number"
                                        id="carpetArea"
                                        name="carpetArea"
                                        value={formData.carpetArea}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    />
                                </div>
                                 <div className="relative w-28">
                                      {/* Basic unit display - can be dropdown if needed */}
                                     <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{formData.carpetAreaUnit}</span>
                                     <select 
                                        name="carpetAreaUnit"
                                        value={formData.carpetAreaUnit}
                                        onChange={handleInputChange}
                                        className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 opacity-0 cursor-pointer" // Make transparent but clickable
                                      >
                                         {areaUnits.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                                     </select>
                                     <IoChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                             {/* TODO: Add Built-up Area and Super Built-up Area similarly with links */} 
                             <div className="text-sm">
                                 <button type="button" className="text-blue-600 hover:underline">+ Add Built-up Area</button>
                                 <button type="button" className="text-blue-600 hover:underline ml-4">+ Add Super Built-up Area</button>
                             </div>
                         </div>

                         {/* Floor Details */} 
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label htmlFor="totalFloors" className="block text-xs font-medium text-gray-500 absolute -top-2 left-2 bg-white px-1">Total Floors</label>
                                <input
                                    type="number"
                                    id="totalFloors"
                                    name="totalFloors"
                                    value={formData.totalFloors}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="propertyFloor" className="block text-xs font-medium text-gray-500 absolute -top-2 left-2 bg-white px-1">Property on Floor</label>
                                <input
                                    type="number"
                                    id="propertyFloor"
                                    name="propertyFloor"
                                    value={formData.propertyFloor}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                />
                            </div>
                         </div>

                         {/* Availability Status */} 
                         <SelectionButtons
                             label="Availability Status"
                             options={['Ready to move', 'Under construction']}
                             selected={formData.availabilityStatus}
                             onSelect={(value) => handleSelection('availabilityStatus', value)}
                         />

                         {/* Ownership */} 
                         <SelectionButtons
                             label="Ownership"
                             options={['Freehold', 'Leasehold', 'Co-operative society', 'Power of Attorney']}
                             selected={formData.ownership}
                             onSelect={(value) => handleSelection('ownership', value)}
                          />

                         {/* Price Details */} 
                        <div className="space-y-4 border-t border-gray-200 pt-6">
                             <h4 className="text-md font-medium text-gray-800">Price Details</h4>
                             
                             {/* Price Range Slider (1,000 to 10,00,00,000) */}
                             <div className="space-y-1">
                                 <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
                                     Select Price Range (₹1,000 - ₹10,00,00,000)
                                 </label>
                                 <input
                                     type="range"
                                     id="priceRange"
                                     min="1000"
                                     max="100000000"
                                     step="1000"
                                     value={formData.expectedPrice || 1000}
                                     onChange={(e) => {
                                         const value = e.target.value;
                                         setFormData((prev: FormData) => ({ ...prev, expectedPrice: value }));
                                     }}
                                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5EBEA3]"
                                 />
                                 <div className="flex justify-between text-xs text-gray-500">
                                     <span>₹1,000</span>
                                     <span>₹10,00,00,000</span>
                                 </div>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div className="relative">
                                     <label htmlFor="expectedPrice" className="block text-xs font-medium text-gray-500 absolute -top-2 left-2 bg-white px-1">Expected Price</label>
                                     <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                     <input
                                         type="number"
                                         id="expectedPrice"
                                         name="expectedPrice"
                                         value={formData.expectedPrice}
                                         onChange={handleInputChange}
                                         className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                         min="1000"
                                         max="100000000"
                                     />
                                     {/* Formatted price display */}
                                     {formData.expectedPrice && (
                                         <p className="text-xs text-gray-500 mt-1">
                                             {new Intl.NumberFormat('en-IN', { 
                                                 style: 'currency', 
                                                 currency: 'INR',
                                                 maximumFractionDigits: 0
                                             }).format(Number(formData.expectedPrice))}
                                         </p>
                                     )}
                                 </div>
                                 <div className="relative">
                                     <label htmlFor="pricePerSqFt" className="block text-xs font-medium text-gray-500 absolute -top-2 left-2 bg-white px-1">Price per sq. ft.</label>
                                     <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                     <input
                                         type="text"
                                         id="pricePerSqFt"
                                         name="pricePerSqFt"
                                         value={formData.pricePerSqFt}
                                         className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-50"
                                         readOnly
                                     />
                                     {formData.pricePerSqFt && (
                                         <p className="text-xs text-gray-500 mt-1">
                                             Auto-calculated based on carpet area
                                         </p>
                                     )}
                                 </div>
                             </div>
                             <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm text-gray-700">
                                     <input type="checkbox" name="priceIncludesAll" checked={formData.priceIncludesAll} onChange={handleInputChange} className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500" />
                                     <span>All inclusive price</span>
                                     <IoInformationCircleOutline className="text-gray-400" />
                                 </label>
                                 <label className="flex items-center gap-2 text-sm text-gray-700">
                                     <input type="checkbox" name="priceIncludesTaxGovt" checked={formData.priceIncludesTaxGovt} onChange={handleInputChange} className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500" />
                                     <span>Tax and Govt. charges excluded</span>
                                 </label>
                                 <label className="flex items-center gap-2 text-sm text-gray-700">
                                     <input type="checkbox" name="priceNegotiable" checked={formData.priceNegotiable} onChange={handleInputChange} className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500" />
                                     <span>Price Negotiable</span>
                                 </label>
                            </div>
                            <button type="button" className="text-blue-600 hover:underline text-sm mt-2">+ Add more pricing details</button>
                         </div>

                        {/* Property Description */} 
                         <div className="space-y-2">
                             <h4 className="text-md font-medium text-gray-800">What makes your property unique</h4>
                            <p className="text-xs text-gray-500">Adding description will increase your listing visibility</p>
                            <textarea
                                id="propertyDescription"
                                name="propertyDescription"
                                rows={4}
                                value={formData.propertyDescription}
                                onChange={handleInputChange}
                                placeholder="Share some details about your property like spacious rooms, well maintained facilities..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                maxLength={5000}
                            />
                            <p className="text-xs text-gray-500 text-right">Minimum 50 characters required ({formData.propertyDescription.length}/5000)</p>
                         </div>

                        {renderContinueButton()}
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-8">
                        {/* Video Upload Section */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-gray-900">Add one video of property</h3>
                                <button 
                                    onClick={() => setSelectedVideo(null)} 
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Close ×
                                </button>
                            </div>
                            <p className="text-sm text-gray-600">
                                A video is worth a thousand pictures. Properties with videos get higher page views
                            </p>
                            <p className="text-sm text-gray-600">
                                Make sure it follows the <a href="#" className="text-blue-600 hover:underline">Video Guidelines</a>
                            </p>

                            {/* Hidden Video Input */}
                            <input
                                type="file"
                                ref={videoInputRef}
                                onChange={handleVideoSelect}
                                accept=".mp4,.mov,video/mp4,video/quicktime,video/x-h264"
                                className="hidden"
                            />

                            {/* Video Upload Area */}
                            <div 
                                className={`border-2 border-dashed ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'} rounded-lg p-8`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={(e) => handleDrop(e, 'video')}
                            >
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    {selectedVideo ? (
                                        <div className="text-center">
                                            <p className="text-green-600 font-medium">✓ {selectedVideo.name}</p>
                                            <button 
                                                onClick={() => setSelectedVideo(null)}
                                                className="text-red-600 hover:text-red-700 text-sm mt-2"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="text-center">
                                                <button 
                                                    onClick={() => videoInputRef.current?.click()}
                                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                                >
                                                    <span className="text-blue-600 mr-2">NEW</span> Upload Video
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-500">Drag your videos here or Upload</p>
                                            <p className="text-xs text-gray-500">Upload video of max size 80 MB in format .mov, .mp4, .H264. Video duration should be less than 10 mins.</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Video Help Message */}
                            <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            Don't have a Video! We can help you create one with our Paid Plans, Contact to Upgrade
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Photo Upload Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">Add photos of your property</h3>
                                    <p className="text-sm text-gray-500">(Optional)</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">
                                A picture is worth a thousand words. 87% of buyers look at photos before buying
                            </p>

                            {/* Hidden Photo Input */}
                            <input
                                type="file"
                                ref={photoInputRef}
                                onChange={handlePhotoSelect}
                                accept="image/*"
                                multiple
                                className="hidden"
                            />

                            {/* Photo Upload Area */}
                            <div 
                                className={`border-2 border-dashed ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'} rounded-lg p-8`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={(e) => handleDrop(e, 'photo')}
                            >
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    {selectedPhotos.length > 0 ? (
                                        <div className="w-full">
                                            <div className="grid grid-cols-4 gap-4 mb-4">
                                                {selectedPhotos.map((photo, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={photo.preview}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-full h-24 object-cover rounded"
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                URL.revokeObjectURL(photo.preview!);
                                                                setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
                                                            }}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => photoInputRef.current?.click()}
                                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                            >
                                                Add More Photos
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <img src="/upload-placeholder.png" alt="Upload" className="w-16 h-16 opacity-50" />
                                            <div className="text-center">
                                                <p className="text-blue-600 font-medium">+ Add atleast 5 photos</p>
                                                <p className="text-sm text-gray-500">Drag and drop your photos here</p>
                                                <p className="text-xs text-gray-500">Upto 50 photos • Max. size 10 MB • Formats: png, jpg, jpeg, gif, webp, heic, heif</p>
                                            </div>
                                            <button
                                                onClick={() => photoInputRef.current?.click()}
                                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                            >
                                                Upload Photos Now
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Photo Tips */}
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h4 className="font-medium text-gray-900 mb-2">Make your picture perfect!</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Capture photos in landscape mode.</li>
                                    <li>• Try clicking photos during the day. Avoid using flash.</li>
                                    <li>• Tidy up for better impact.</li>
                                    <li>• Edit with 99acres filters for finish</li>
                                    <li>• To learn more <a href="#" className="text-blue-600 hover:underline">click here</a></li>
                                </ul>
                            </div>

                            {/* Response Rate Message */}
                            <div className="bg-navy-900 text-white p-4 rounded-lg flex items-center space-x-2">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p>Add 4+ property photos & increase responses upto 21%</p>
                            </div>

                            {/* Warning Message */}
                            <div className="flex items-center space-x-2 text-amber-600">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <p>Without photos your ad will be ignored by buyers</p>
                            </div>
                        </div>

                        {renderContinueButton()}
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold text-[#2B3B57]">Add amenities/unique features</h3>
                        <p className="text-gray-600">These fields are used to populate USP & captions</p>
                        <p className="text-gray-600">All fields on this page are optional</p>

                        {/* Other Rooms */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Other rooms <span className="text-gray-500">(Optional)</span></h4>
                            <div className="flex flex-wrap gap-3">
                                {['Pooja Room', 'Study Room', 'Servant Room', 'Store Room'].map(room => (
                                    <button key={room} className="px-4 py-2 rounded-md text-sm bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                                        + {room}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Furnishing */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Furnishing <span className="text-gray-500">(Optional)</span></h4>
                            <div className="flex flex-wrap gap-3">
                                {['Furnished', 'Semi-furnished', 'Un-furnished'].map(type => (
                                    <button key={type} className="px-4 py-2 rounded-md text-sm bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Reserved Parking */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Reserved Parking <span className="text-gray-500">(Optional)</span></h4>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Covered Parking</label>
                                    <div className="flex items-center gap-2">
                                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md">-</button>
                                        <span className="w-12 text-center">0</span>
                                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md">+</button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Open Parking</label>
                                    <div className="flex items-center gap-2">
                                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md">-</button>
                                        <span className="w-12 text-center">0</span>
                                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Property Features */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Property Features</h4>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    'High Ceiling Height',
                                    'False Ceiling Lighting',
                                    'Internet/wi-fi connectivity',
                                    'Centrally Air Conditioned'
                                ].map(feature => (
                                    <button key={feature} className="px-4 py-2 rounded-md text-sm bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                                        + {feature}
                                    </button>
                                ))}
                                <button className="text-blue-600 hover:underline text-sm">7 more</button>
                            </div>
                        </div>

                        {/* Society/Building Features */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Society/Building feature</h4>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    'Fitness Centre / GYM',
                                    'Swimming Pool',
                                    'Club house / Community Center',
                                    'Security Personnel'
                                ].map(feature => (
                                    <button key={feature} className="px-4 py-2 rounded-md text-sm bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                                        + {feature}
                                    </button>
                                ))}
                                <button className="text-blue-600 hover:underline text-sm">1 more</button>
                            </div>
                        </div>

                        {/* Additional Features */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Additional Features</h4>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    'Separate entry for servant room',
                                    'No open drainage around',
                                    'Bank Attached Property',
                                    'Low Density Society'
                                ].map(feature => (
                                    <button key={feature} className="px-4 py-2 rounded-md text-sm bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                                        + {feature}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Water Source */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Water Source</h4>
                            <div className="flex flex-wrap gap-3">
                                {['Municipal corporation', 'Borewell/Tank', '24*7 Water'].map(source => (
                                    <button key={source} className="px-4 py-2 rounded-md text-sm bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                                        + {source}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Overlooking */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Overlooking</h4>
                            <div className="flex flex-wrap gap-3">
                                {['Pool', 'Park/Garden', 'Club', 'Main Road'].map(view => (
                                    <button key={view} className="px-4 py-2 rounded-md text-sm bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                                        + {view}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Other Features */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Other Features</h4>
                            <div className="space-y-3">
                                {[
                                    { key: 'gatedSociety', label: 'In a gated society' },
                                    { key: 'cornerProperty', label: 'Corner Property' },
                                    { key: 'petFriendly', label: 'Pet Friendly' },
                                    { key: 'wheelchairFriendly', label: 'Wheelchair friendly' }
                                ].map(({ key, label }) => (
                                    <label key={key} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-[#5EBEA3] focus:ring-[#5EBEA3]"
                                        />
                                        <span className="text-gray-700">{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Power Backup */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Power Back up</h4>
                            <div className="flex gap-3">
                                {['None', 'Partial', 'Full'].map(type => (
                                    <button key={type} className="px-4 py-2 rounded-md text-sm bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Property Facing */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Property facing</h4>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    'North', 'South', 'East', 'West',
                                    'North-East', 'North-West', 'South-East', 'South-West'
                                ].map(direction => (
                                    <button key={direction} className="px-4 py-2 rounded-md text-sm bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                                        {direction}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Type of Flooring */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Type of flooring</h4>
                            <select className="w-full p-3 border border-gray-300 rounded-md">
                                <option value="">Select</option>
                                <option value="marble">Marble</option>
                                <option value="wooden">Wooden</option>
                                <option value="ceramic">Ceramic</option>
                                <option value="granite">Granite</option>
                                <option value="vitrified">Vitrified</option>
                            </select>
                        </div>

                        {/* Width of Road */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Width of Road</h4>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Enter the width"
                                    className="flex-1 p-3 border border-gray-300 rounded-md"
                                />
                                <select className="w-32 p-3 border border-gray-300 rounded-md">
                                    <option value="Feet">Feet</option>
                                    <option value="Meter">Meter</option>
                                </select>
                            </div>
                        </div>

                        {/* Location Advantages */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Location Advantages</h4>
                            <p className="text-sm text-gray-600">Highlight the nearby landmarks*</p>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    'Close to Metro Station',
                                    'Close to School',
                                    'Close to Hospital',
                                    'Close to Market',
                                    'Close to Railway Station'
                                ].map(advantage => (
                                    <button key={advantage} className="px-4 py-2 rounded-md text-sm bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                                        + {advantage}
                                    </button>
                                ))}
                            </div>
                            <button className="text-blue-600 hover:underline text-sm">Show more</button>
                            <p className="text-xs text-gray-500">*Please provide correct information, otherwise your listing might get blocked</p>
                        </div>

                        {/* Save and Submit Button */}
                        <div className="flex justify-end mt-8">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`bg-[#0066FF] hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors ${
                                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {isSubmitting ? 'Saving...' : 'Save and Submit'}
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    // Function to render step indicator
    const renderStepIndicator = (step: Step, index: number) => {
        return (
            <div 
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            >
                <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => completedSteps.includes(step.id) ? goToStep(step.id) : null}
                >
                    <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${step.current ? 'bg-[#2B3B57] text-white' : 
                          step.completed ? 'bg-[#5EBEA3] text-white' : 
                          'bg-gray-200 text-gray-600'}
                    `}>
                        {step.completed ? '✓' : step.id}
                    </div>
                    <div className="ml-3 hidden md:block">
                        <p className="text-sm font-medium text-[#2B3B57]">{step.title}</p>
                        <p className="text-xs text-gray-500">{step.subtitle}</p>
                    </div>
                </div>
                {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                        step.completed ? 'bg-[#5EBEA3]' : 'bg-gray-200'
                    }`}></div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-4 md:py-8">
            <div className="max-w-3xl mx-auto px-4">
                {/* Progress Steps */}
                <div className="mb-8 overflow-x-auto">
                    <div className="flex items-center min-w-max md:min-w-0">
                        {steps.map((step, index) => renderStepIndicator(step, index))}
                    </div>
                </div>

                {/* Property Score */}
                <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="relative w-16 h-16">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                    className="text-gray-200 stroke-current"
                                    strokeWidth="10"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                ></circle>
                                <circle
                                    className="text-[#5EBEA3] stroke-current transition-all duration-500 ease-in-out"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    strokeDasharray={251.2}
                                    strokeDashoffset={251.2 - (propertyScore / 100) * 251.2}
                                    transform="rotate(-90 50 50)"
                                ></circle>
                                <text
                                    x="50"
                                    y="50"
                                    className="text-lg font-semibold fill-current text-[#2B3B57]"
                                    dominantBaseline="central"
                                    textAnchor="middle"
                                >
                                    {`${Math.round(propertyScore)}%`}
                                </text>
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-sm font-medium text-[#2B3B57]">Property Score</h3>
                            <p className="text-xs text-gray-500">Better your property score, greater your visibility</p>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                    {renderStepContent()}
                </div>

                {/* Help Section */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>Need help?</p>
                    <p>
                        You can email us at <a href="mailto:services@propyto.com" className="text-[#5EBEA3] hover:text-[#4ea892]">services@propyto.com</a>
                        <br />
                        or call us at <a href="tel:1800419099" className="text-[#5EBEA3] hover:text-[#4ea892]">1800 41 99099</a> (IND Toll-Free)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostPropertyNewPage; 