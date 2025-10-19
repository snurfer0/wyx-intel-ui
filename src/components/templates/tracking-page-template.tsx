'use client';

import React from 'react';
import { EmptyState } from '@/components/organisms/empty-state';
import { LoadingGrid } from '@/components/organisms/loading-grid';
import { TrackingGrid } from '@/components/organisms/tracking-grid';
import { TrackingHeader } from '@/components/organisms/tracking-header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { TrackingSearchItem } from '@/types';

interface TrackingPageTemplateProps {
    items: TrackingSearchItem[];
    isLoading: boolean;
    isLoadingMore: boolean;
    error: string | null;
    searchQuery: string;
    hasMore: boolean;
    loadMoreRef: (node?: Element | null) => void;
}

export function TrackingPageTemplate({
    items,
    isLoading,
    isLoadingMore,
    error,
    searchQuery,
    hasMore,
    loadMoreRef,
}: TrackingPageTemplateProps): React.JSX.Element {
    return (
        <div className="container mx-auto p-4 max-w-[1600px] space-y-4">
            <TrackingHeader />

            {error && (
                <Alert
                    variant="destructive"
                    className="border-red-500/20 bg-red-500/5"
                >
                    <AlertTitle className="font-mono text-red-400">
                        Error
                    </AlertTitle>
                    <AlertDescription className="font-mono text-gray-400">
                        {error}
                    </AlertDescription>
                </Alert>
            )}

            {isLoading ? (
                <LoadingGrid count={12} />
            ) : items.length === 0 ? (
                <EmptyState searchQuery={searchQuery} />
            ) : (
                <TrackingGrid
                    items={items}
                    showSimilarity={!!searchQuery}
                    hasMore={hasMore}
                    isLoadingMore={isLoadingMore}
                    loadMoreRef={loadMoreRef}
                />
            )}
        </div>
    );
}
