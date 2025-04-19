'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiHomeAlt, BiSearch, BiBuildings, BiStar, BiPlus } from 'react-icons/bi';
import { HiOutlineHome } from 'react-icons/hi';
import { FaRegBuilding } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { MdInsights, MdOutlineAccountCircle } from 'react-icons/md';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      id: 'home',
      name: 'Home',
      href: '/',
      icon: <HiOutlineHome className="text-2xl" />
    },
    {
      id: 'buy',
      name: 'Buy',
      href: '/buy',
      icon: <BiBuildings className="text-2xl" />
    },
    {
      id: 'rent',
      name: 'Rent',
      href: '/rent',
      icon: <FaRegBuilding className="text-2xl" />
    },
    {
      id: 'insights',
      name: 'Insights',
      href: '/insights',
      icon: <MdInsights className="text-2xl" />
    },
    {
      id: 'account',
      name: 'Account',
      href: '/account',
      icon: <MdOutlineAccountCircle className="text-2xl" />
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t z-50 lg:hidden">
      <div className="flex justify-between px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 ${
                isActive ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 