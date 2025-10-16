'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';

interface AuthGuardProps {
    children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element {
    const { isAuthenticated, apiKey } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isHydrated, setIsHydrated] = useState(false);

    // Wait for zustand to hydrate from localStorage
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        // Skip auth check until hydrated
        if (!isHydrated) {
            return;
        }

        // Skip auth check for auth page
        if (pathname === '/auth') {
            return;
        }

        // Redirect to auth if not authenticated
        if (!isAuthenticated || !apiKey) {
            router.push('/auth');
        }
    }, [isHydrated, isAuthenticated, apiKey, pathname, router]);

    // Show loading until hydrated
    if (!isHydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">
                    Loading...
                </div>
            </div>
        );
    }

    // If on auth page, always show it
    if (pathname === '/auth') {
        return <>{children}</>;
    }

    // Only render children if authenticated
    if (!isAuthenticated || !apiKey) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">
                    Loading...
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
