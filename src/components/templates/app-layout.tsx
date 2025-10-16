'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/organisms/sidebar';
import { Button } from '@/components/ui/button';

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps): React.JSX.Element {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={(): void => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col">
                {/* Mobile header */}
                <header className="lg:hidden border-b bg-background sticky top-0 z-30">
                    <div className="flex items-center justify-between p-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(): void => setIsSidebarOpen(true)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="4" y1="18" x2="20" y2="18" />
                            </svg>
                        </Button>
                        <h1 className="text-lg font-bold">WYX Intel</h1>
                        <div className="w-8" />
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
