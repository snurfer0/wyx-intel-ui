'use client';

import { JSX } from 'react';
import { AppLayout } from '@/components/templates/app-layout';

export default function TrackingLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return <AppLayout>{children}</AppLayout>;
}
