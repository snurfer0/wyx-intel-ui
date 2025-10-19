'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingGridProps {
    count?: number;
}

export function LoadingGrid({
    count = 12,
}: LoadingGridProps): React.JSX.Element {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <Skeleton
                    key={i}
                    className="h-80 bg-zinc-950 border border-emerald-500/20"
                />
            ))}
        </div>
    );
}
