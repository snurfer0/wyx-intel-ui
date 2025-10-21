'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface AuthGuardProps {
    children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element {
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check auth status on mount and pathname changes
    useEffect(() => {
        const checkAuth = async (): Promise<void> => {
            // Skip auth check for public pages
            if (pathname === '/' || pathname === '/login') {
                setIsChecking(false);
                setIsAuthenticated(false);
                return;
            }

            // For protected routes, check auth status via API
            if (pathname.startsWith('/admin')) {
                try {
                    const response = await fetch('/api/auth/status');
                    const data = (await response.json()) as {
                        authenticated: boolean;
                    };

                    if (data.authenticated) {
                        setIsAuthenticated(true);
                    } else {
                        router.push('/login');
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                    router.push('/login');
                }
            }

            setIsChecking(false);
        };

        void checkAuth();
    }, [pathname, router]);

    // Show loading while checking auth
    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">
                    Loading...
                </div>
            </div>
        );
    }

    // If on public pages, always show them
    if (pathname === '/' || pathname === '/login') {
        return <>{children}</>;
    }

    // For /admin routes, only render if authenticated
    if (pathname.startsWith('/admin') && !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">
                    Redirecting...
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
