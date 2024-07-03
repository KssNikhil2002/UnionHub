'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';
import { House, Settings, User } from 'lucide-react';

export default function RathSideBar() {
    const basePath = `/Rathskeller`;
    const pathname = usePathname();

    const navLinks = [
        { name: 'Dashboard', href: `${basePath}`, icon: House },
        { name: 'EmployeeTracker', href: `${basePath}/EmployeeTracker`, icon: House },
        { name: 'EmployeeOverview', href: `${basePath}/EmployeeOverview`, icon: House },
        { name: 'WastelogOverview', href: `${basePath}/WastelogOverview`, icon: House },
        { name: 'WastelogTracker', href: `${basePath}/WasteLogTracker`, icon: House },
    ];

    const bottomNavLinks = [
        { name: 'Settings', href: `${basePath}/Settings`, icon: Settings },
    ];

    return (
        <div className="h-screen w-64 p-4 bg-white border-r border-gray-300 flex flex-col justify-between">
            <div className="flex-1 overflow-y-auto">
                <div className="mb-6">
                    <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg md:text-xl">
                        Welcome to <span className="font-extrabold text-green-700">RathSkeller</span>
                    </p>
                </div>
                <div className="space-y-6">
                    {navLinks.map(link => (
                        <Link href={link.href} key={link.name}>
                            <div className='py-2'>
                                <div className={cn("flex items-center justify-between p-2 rounded-md", pathname === link.href && "bg-black text-white")}>
                                    {link.icon && <link.icon className="mr-2" size={18} />}
                                    <span className="text-sm font-semibold flex-grow">{link.name}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                <div className="border-t border-gray-200 pt-4">
                    {bottomNavLinks.map(category => (
                        <Link href={category.href} key={category.name}>
                            <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                                {category.icon && <category.icon className="mr-2" size={20} />}
                                <span className="flex-grow font-semibold">{category.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className='p-2 mt-2 flex items-center'>
                    <User className="mr-2" size={20} />
                    <p className='font-semibold'>Frances Daniels</p>
                </div>
            </div>
        </div>
    );
}
