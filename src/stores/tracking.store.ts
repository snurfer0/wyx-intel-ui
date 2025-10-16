import { create } from 'zustand';
import { TrackingSearchItem } from '@/types';

interface TrackingStore {
    // State
    items: TrackingSearchItem[];
    isLoading: boolean;
    isLoadingMore: boolean;
    error: string | null;
    searchQuery: string;
    totalCount: number;
    nextCursor: number;
    hasMore: boolean;

    // Actions
    setItems: (items: TrackingSearchItem[]) => void;
    appendItems: (items: TrackingSearchItem[]) => void;
    setLoading: (loading: boolean) => void;
    setLoadingMore: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSearchQuery: (query: string) => void;
    setPagination: (nextCursor: number, totalCount: number) => void;
    setHasMore: (hasMore: boolean) => void;
}

const initialState = {
    items: [],
    isLoading: false,
    isLoadingMore: false,
    error: null,
    searchQuery: '',
    totalCount: 0,
    nextCursor: 0,
    hasMore: true,
};

export const useTrackingStore = create<TrackingStore>(set => ({
    ...initialState,

    setItems: (items: TrackingSearchItem[]): void => set({ items }),
    appendItems: (newItems: TrackingSearchItem[]): void =>
        set(state => ({ items: [...state.items, ...newItems] })),
    setLoading: (isLoading: boolean): void => set({ isLoading }),
    setLoadingMore: (isLoadingMore: boolean): void => set({ isLoadingMore }),
    setError: (error: string | null): void => set({ error }),
    setSearchQuery: (searchQuery: string): void => set({ searchQuery }),
    setPagination: (nextCursor: number, totalCount: number): void =>
        set({ nextCursor, totalCount }),
    setHasMore: (hasMore: boolean): void => set({ hasMore }),
}));
