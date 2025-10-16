import { useEffect, useState } from 'react';
import { analyticsService } from '@/services/analytics.service';
import type { AnalyticsStats } from '@/types/analytics.types';

interface UseAnalyticsStatsReturn {
    stats: AnalyticsStats | null;
    isLoading: boolean;
    error: string | null;
}

export function useAnalyticsStats(): UseAnalyticsStatsReturn {
    const [stats, setStats] = useState<AnalyticsStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect((): (() => void) => {
        const fetchStats = async (): Promise<void> => {
            try {
                const data = await analyticsService.getStats();
                setStats(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching stats:', err);
                setError('Failed to load statistics');
            } finally {
                setIsLoading(false);
            }
        };

        void fetchStats();
        const interval = setInterval(() => {
            void fetchStats();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return { stats, isLoading, error };
}
