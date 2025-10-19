'use client';

import React from 'react';
import { TrackingSearchBar } from '@/components/molecules/tracking-search-bar';
import { Separator } from '@/components/ui/separator';
import { useTrackingStore } from '@/stores/tracking.store';

export function TrackingHeader(): React.JSX.Element {
    const totalCount = useTrackingStore(state => state.totalCount);

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-mono font-bold text-emerald-400">
                    TRACKING ({totalCount})
                </h1>
                <TrackingSearchBar />
            </div>

            <Separator className="bg-emerald-500/20" />
        </div>
    );
}
