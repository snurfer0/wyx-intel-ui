import { useCallback } from 'react';
import { trackingService } from '@/services/tracking.service';
import { useTrackingStore } from '@/stores/tracking.store';
import type { TrackingSearchItem } from '@/types';

const ITEMS_PER_PAGE = 20;

export function useTracking(): {
    items: TrackingSearchItem[];
    isLoading: boolean;
    isLoadingMore: boolean;
    error: string | null;
    searchQuery: string;
    totalCount: number;
    hasMore: boolean;
    fetchAllItems: () => Promise<void>;
    searchItems: (query: string) => Promise<void>;
    loadMoreItems: () => Promise<void>;
} {
    const {
        items,
        isLoading,
        isLoadingMore,
        error,
        searchQuery,
        totalCount,
        nextCursor,
        hasMore,
        setItems,
        appendItems,
        setLoading,
        setLoadingMore,
        setError,
        setSearchQuery,
        setPagination,
        setHasMore,
    } = useTrackingStore();

    const fetchAllItems = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
        setSearchQuery('');

        try {
            const result = await trackingService.searchTrackingItems({
                query: '',
                limit: ITEMS_PER_PAGE,
                cursor: 0,
            });
            setItems(result.data);
            setPagination(result.nextCursor, result.totalCount);
            setHasMore(
                result.data.length === ITEMS_PER_PAGE &&
                    result.nextCursor < result.totalCount,
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to fetch tracking items',
            );
        } finally {
            setLoading(false);
        }
    }, [
        setItems,
        setLoading,
        setError,
        setSearchQuery,
        setPagination,
        setHasMore,
    ]);

    const searchItems = useCallback(
        async (query: string): Promise<void> => {
            if (!query.trim()) {
                await fetchAllItems();
                return;
            }

            setLoading(true);
            setError(null);
            setSearchQuery(query);

            try {
                const result = await trackingService.searchTrackingItems({
                    query: query.trim(),
                    limit: ITEMS_PER_PAGE,
                    cursor: 0,
                });
                setItems(result.data);
                setPagination(result.nextCursor, result.totalCount);
                setHasMore(
                    result.data.length === ITEMS_PER_PAGE &&
                        result.nextCursor < result.totalCount,
                );
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to search tracking items',
                );
            } finally {
                setLoading(false);
            }
        },
        [
            fetchAllItems,
            setItems,
            setLoading,
            setError,
            setSearchQuery,
            setPagination,
            setHasMore,
        ],
    );

    const loadMoreItems = useCallback(async (): Promise<void> => {
        if (isLoadingMore || !hasMore) {
            return;
        }

        setLoadingMore(true);
        setError(null);

        try {
            const result = await trackingService.searchTrackingItems({
                query: searchQuery,
                limit: ITEMS_PER_PAGE,
                cursor: nextCursor,
            });

            appendItems(result.data);
            setPagination(result.nextCursor, result.totalCount);
            setHasMore(
                result.data.length === ITEMS_PER_PAGE &&
                    result.nextCursor < result.totalCount,
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to load more items',
            );
        } finally {
            setLoadingMore(false);
        }
    }, [
        isLoadingMore,
        hasMore,
        searchQuery,
        nextCursor,
        appendItems,
        setLoadingMore,
        setError,
        setPagination,
        setHasMore,
    ]);

    return {
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
    };
}
