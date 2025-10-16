'use client';

import '@/globals.css';
import { JSX } from 'react';
import { Toaster } from 'sonner';
import { AuthGuard } from '@/components/organisms/auth-guard';
import Providers from '@/lib/providers';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>
            <body className="antialiased">
                <Providers>
                    <AuthGuard>{children}</AuthGuard>
                </Providers>
                <Toaster />
            </body>
        </html>
    );
}
