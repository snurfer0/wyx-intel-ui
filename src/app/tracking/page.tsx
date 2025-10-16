'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { TrackingPageTemplate } from '@/components/templates/tracking-page-template';
import { useTracking } from '@/hooks/use.tracking';

export default function TrackingPage(): React.JSX.Element {
    const {
        items,
        isLoading,
        isLoadingMore,
        error,
        searchQuery,
        totalCount,
        hasMore,
        fetchAllItems,
        searchItems,
        loadMoreItems,
    } = useTracking();

    const { ref: loadMoreRef, inView } = useInView({
        threshold: 0,
        triggerOnce: false,
    });

    useEffect(() => {
        void fetchAllItems();
    }, [fetchAllItems]);

    useEffect(() => {
        if (inView && hasMore && !isLoadingMore) {
            void loadMoreItems();
        }
    }, [inView, hasMore, isLoadingMore, loadMoreItems]);

    return (
        <TrackingPageTemplate
            items={items}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            error={error}
            searchQuery={searchQuery}
            totalCount={totalCount}
            hasMore={hasMore}
            onSearch={(query): void => {
                void searchItems(query);
            }}
            loadMoreRef={loadMoreRef}
        />
    );
}
