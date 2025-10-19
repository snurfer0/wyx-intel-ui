'use client';

import { BarChart3, Activity, LogOut, X, Terminal } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth.store';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({
    isOpen = true,
    onClose,
}: SidebarProps): React.JSX.Element {
    const pathname = usePathname();
    const router = useRouter();
    const { clearAuth } = useAuthStore();

    const handleLogout = (): void => {
        clearAuth();
        router.push('/auth');
    };

    const navItems = [
        {
            href: '/tracking',
            label: 'Tracking',
            icon: Activity,
        },
        {
            href: '/statistics',
            label: 'Statistics',
            icon: BarChart3,
        },
    ];

    const isActive = (href: string): boolean => {
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 lg:hidden cursor-pointer"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 z-50 h-screen
                    w-64 bg-black border-r border-emerald-500/20
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-emerald-500/20">
                        <div className="flex items-center gap-3">
                            <Terminal className="w-6 h-6 text-emerald-400" />
                            <div>
                                <h1 className="text-lg font-mono font-bold text-emerald-400">
                                    WYX_INTEL
                                </h1>
                                <p className="text-xs font-mono text-emerald-600">
                                    v1.0.0
                                </p>
                            </div>
                        </div>
                        {onClose && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClose}
                                className="lg:hidden hover:bg-emerald-500/10 text-emerald-500"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4">
                        <ul className="space-y-2">
                            {navItems.map(item => {
                                const Icon = item.icon;
                                const active = isActive(item.href);
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={onClose}
                                            className={`
                                                group relative flex items-center gap-3 px-4 py-3 rounded
                                                transition-all duration-200 font-mono cursor-pointer
                                                ${
                                                    active
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                                        : 'text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5'
                                                }
                                            `}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="text-sm">
                                                {item.label}
                                            </span>
                                            {active && (
                                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-400" />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-emerald-500/20">
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="w-full justify-start gap-3 font-mono text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="text-sm">logout</span>
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}
