'use client';

import React from 'react';
import { TrackingCard } from '@/components/molecules/tracking-card';
import { Spinner } from '@/components/ui/spinner';
import type { TrackingSearchItem } from '@/types';

interface TrackingGridProps {
    items: TrackingSearchItem[];
    showSimilarity?: boolean;
    hasMore: boolean;
    isLoadingMore: boolean;
    loadMoreRef: (node?: Element | null) => void;
}

export function TrackingGrid({
    items,
    showSimilarity = false,
    hasMore,
    isLoadingMore,
    loadMoreRef,
}: TrackingGridProps): React.JSX.Element {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map(item => (
                    <TrackingCard
                        key={item.id}
                        item={item}
                        showSimilarity={showSimilarity}
                    />
                ))}
            </div>

            {hasMore && (
                <div ref={loadMoreRef} className="flex justify-center py-8">
                    {isLoadingMore && <Spinner />}
                </div>
            )}

            {!hasMore && items.length > 0 && (
                <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">
                        End of results
                    </p>
                </div>
            )}
        </>
    );
}
