'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoChevronForward, IoInformationCircleOutline, IoPhonePortraitOutline } from 'react-icons/io5';

interface Subscription {
    productName: string;
    quantity: number;
    quantityLeft: number;
    expiresIn: number;
}

const MyPropytoPage = () => {
    const user = {
        name: 'MEET MANGUKIYA',
        type: 'Master User',
        lastVisited: '04:02 PM | 18 Apr, 2025'
    };

    const subscriptions: Subscription[] = [
        {
            productName: 'Plain Listings',
            quantity: 2.0,
            quantityLeft: 2,
            expiresIn: 4640
        }
    ];

    const managementSections = [
        {
            title: 'MANAGE LISTINGS',
            items: [
                'All Products',
                'E-Mailers',
                'Banners',
                'All Listings',
                'Plain Listings',
                'Basic Listings',
                'Platinum Listings',
                'Premium Listings'
            ]
        },
        {
            title: 'MANAGE RESPONSES',
            items: [
                'All Products',
                'E-Mailers',
                'All Listings',
                'Basic Listings',
                'Plain Listings',
                'Platinum Listings',
                'Premium Listings',
                'All Leads'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header Navigation */}
            <nav className="bg-white border-b border-gray-200 px-4 py-2">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex space-x-8">
                        <Link href="/lead-search" className="text-gray-600 hover:text-gray-900">LEAD SEARCH</Link>
                        <Link href="/services" className="text-gray-600 hover:text-gray-900">BUY OUR SERVICES</Link>
                        <Link href="/post-property" className="text-gray-600 hover:text-gray-900">POST A PROPERTY</Link>
                        <Link href="/customer-service" className="text-gray-600 hover:text-gray-900">CUSTOMER SERVICE</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-4 gap-6">
                    {/* Left Sidebar */}
                    <div className="col-span-1">
                        {/* User Profile */}
                        <div className="bg-[#2B3B57] text-white p-4 rounded-t-lg">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-[#5EBEA3] rounded-full flex items-center justify-center">
                                    <span className="text-2xl">👤</span>
                                </div>
                                <div>
                                    <h2 className="font-semibold">{user.name}</h2>
                                    <p className="text-sm text-gray-300">{user.type}</p>
                                </div>
                            </div>
                            <button className="mt-2 text-[#5EBEA3] text-sm hover:underline">Modify</button>
                        </div>

                        {/* Navigation Menu */}
                        <div className="bg-[#1F1F1F] text-gray-300 py-2">
                            <div className="px-4 py-2 text-[#5EBEA3]">My99acres</div>
                            {managementSections.map((section, index) => (
                                <div key={index} className="mb-4">
                                    <div className="px-4 py-2 text-sm text-gray-400">{section.title}</div>
                                    <ul>
                                        {section.items.map((item, itemIndex) => (
                                            <li key={itemIndex}>
                                                <Link 
                                                    href="#" 
                                                    className="px-4 py-2 text-sm hover:bg-gray-800 block"
                                                >
                                                    {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-3 space-y-6">
                        {/* Welcome Section */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h1 className="text-xl text-gray-700 mb-4">
                                Maximize your business with Propyto.com <span className="font-semibold">Utilize our offerings</span>
                            </h1>
                            
                            <div className="grid grid-cols-2 gap-6">
                                {/* Quick Actions */}
                                <div>
                                    <p className="text-gray-600 mb-2">
                                        Check responses anytime anywhere! Download our award winning app.
                                    </p>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                        Responses on the go
                                    </button>
                                </div>
                                <div>
                                    <p className="text-gray-600 mb-2">
                                        Having trouble in using any features. Click here for FAQ section.
                                    </p>
                                    <button className="bg-[#5EBEA3] text-white px-4 py-2 rounded hover:bg-[#4ea892]">
                                        FAQ Section
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Subscriptions */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium">Subscriptions</h2>
                                <span className="text-gray-500">0 Listings Live</span>
                            </div>
                            
                            <div className="border rounded-lg">
                                <div className="px-4 py-2 bg-gray-50 border-b">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Active Subscriptions 1</span>
                                    </div>
                                </div>
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-sm text-gray-600">
                                            <th className="px-4 py-2">Product Name</th>
                                            <th className="px-4 py-2">Quantity</th>
                                            <th className="px-4 py-2">Quantity Left</th>
                                            <th className="px-4 py-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subscriptions.map((sub, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="px-4 py-2">{sub.productName}</td>
                                                <td className="px-4 py-2">{sub.quantity}</td>
                                                <td className="px-4 py-2">{sub.quantityLeft}</td>
                                                <td className="px-4 py-2 text-gray-500">
                                                    {sub.quantityLeft} expires in {sub.expiresIn} days
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile App and FAQ Sections */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-medium mb-2">See responses on the go</h3>
                                <p className="text-gray-600 mb-4">On Propyto mobile app</p>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Get mobile app
                                </button>
                                <div className="mt-4">
                                    <Image 
                                        src="/mobile-app-preview.png" 
                                        alt="Mobile App Preview" 
                                        width={200} 
                                        height={400}
                                        className="mx-auto"
                                    />
                                </div>
                            </div>

                            <div className="bg-[#FFF9E6] p-6 rounded-lg shadow">
                                <h3 className="text-lg font-medium mb-2">Need help with any feature?</h3>
                                <p className="text-gray-600 mb-4">Get help from FAQ section</p>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    See FAQ section
                                </button>
                                <div className="mt-4">
                                    <Image 
                                        src="/faq-illustration.png" 
                                        alt="FAQ Illustration" 
                                        width={200} 
                                        height={200}
                                        className="mx-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPropytoPage; 