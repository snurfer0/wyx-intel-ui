'use client';

import React from 'react';
import { TrackingSearchBar } from '@/components/molecules/tracking-search-bar';
import { Badge } from '@/components/ui/badge';

interface TrackingHeaderProps {
    totalCount: number;
    isLoading: boolean;
    onSearch: (query: string) => void;
}

export function TrackingHeader({
    totalCount,
    isLoading,
    onSearch,
}: TrackingHeaderProps): React.JSX.Element {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Tracking</h1>
                <p className="text-muted-foreground mt-2">
                    Monitor crypto signals, tokens, authors, and market
                    narratives
                </p>
            </div>

            <div className="mb-6 flex items-center gap-4">
                <TrackingSearchBar onSearch={onSearch} isLoading={isLoading} />
                <Badge variant="secondary" className="whitespace-nowrap">
                    {totalCount} results
                </Badge>
            </div>
        </div>
    );
}
