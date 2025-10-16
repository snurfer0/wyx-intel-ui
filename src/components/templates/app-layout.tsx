'use client';

import { Menu } from 'lucide-react';
import React, { useState } from 'react';
import { Sidebar } from '@/components/organisms/sidebar';
import { Button } from '@/components/ui/button';

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps): React.JSX.Element {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-black">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={(): void => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col">
                {/* Mobile header */}
                <header className="lg:hidden border-b border-emerald-500/20 bg-black sticky top-0 z-30">
                    <div className="flex items-center justify-between p-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(): void => setIsSidebarOpen(true)}
                            className="text-emerald-400 hover:bg-emerald-500/10"
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                        <h1 className="text-lg font-mono font-bold text-emerald-400">
                            WYX_INTEL
                        </h1>
                        <div className="w-8" />
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-auto bg-black">
                    {children}
                </main>
            </div>
        </div>
    );
}
