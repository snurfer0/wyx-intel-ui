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
    totalCount: number;
    hasMore: boolean;
    onSearch: (query: string) => void;
    loadMoreRef: (node?: Element | null) => void;
}

export function TrackingPageTemplate({
    items,
    isLoading,
    isLoadingMore,
    error,
    searchQuery,
    totalCount,
    hasMore,
    onSearch,
    loadMoreRef,
}: TrackingPageTemplateProps): React.JSX.Element {
    return (
        <div className="container mx-auto p-6">
            <TrackingHeader
                totalCount={totalCount}
                isLoading={isLoading}
                onSearch={onSearch}
            />

            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
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
