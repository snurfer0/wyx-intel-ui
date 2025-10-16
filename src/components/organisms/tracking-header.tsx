'use client';

import React from 'react';
import { TrackingSearchBar } from '@/components/molecules/tracking-search-bar';

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
            <div className="mb-8 border-b border-emerald-500/20 pb-4">
                <div className="flex items-end justify-between gap-4 mb-2">
                    <div>
                        <h1 className="text-3xl font-mono font-bold text-emerald-400">
                            TRACKING ({totalCount})
                        </h1>
                        <p className="text-gray-400 font-mono text-sm mt-2">
                            &gt; Monitor crypto signals, tokens, authors, and
                            market narratives
                        </p>
                    </div>
                    <TrackingSearchBar
                        onSearch={onSearch}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}
