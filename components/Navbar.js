'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Radio, Settings, Activity } from 'lucide-react';

const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'IoT Simulator', href: '/iot', icon: Radio },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
            <div className="max-w-7xl mx-auto pointer-events-auto">
                <div className="card flex items-center justify-between py-3 px-6 !rounded-2xl !border-opacity-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="p-2 bg-[#4F46E5]/10 rounded-lg group-hover:bg-[#4F46E5]/20 transition-colors">
                                <Activity className="h-6 w-6 text-[#4F46E5]" />
                            </div>
                            <span className="text-xl font-semibold text-[#F8FAFC] tracking-tight">
                                CityPulse
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-center space-x-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                                ? 'bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/20'
                                                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]'
                                            }`}
                                    >
                                        <Icon className="h-4 w-4 mr-2" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
