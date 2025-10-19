import { useEffect, useState } from 'react';
import { analyticsService } from '@/services/analytics.service';
import type {
    TimeseriesResponse,
    TimeseriesEntity,
    TimeseriesGranularity,
} from '@/types/analytics.types';

interface UseTimeseriesParams {
    entity: TimeseriesEntity;
    granularity: TimeseriesGranularity;
    startDate?: string;
    endDate?: string;
}

interface UseTimeseriesReturn {
    data: TimeseriesResponse | null;
    isLoading: boolean;
    error: string | null;
}

export function useTimeseries({
    entity,
    granularity,
    startDate,
    endDate,
}: UseTimeseriesParams): UseTimeseriesReturn {
    const [data, setData] = useState<TimeseriesResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect((): (() => void) => {
        const fetchTimeseries = async (): Promise<void> => {
            try {
                setIsLoading(true);
                const result = await analyticsService.getTimeseries(
                    entity,
                    granularity,
                    startDate,
                    endDate,
                );
                setData(result);
                setError(null);
            } catch (err) {
                console.error('Error fetching timeseries:', err);
                setError('Failed to load timeseries data');
            } finally {
                setIsLoading(false);
            }
        };

        void fetchTimeseries();

        const interval = setInterval(() => {
            void fetchTimeseries();
        }, 30000);

        return () => clearInterval(interval);
    }, [entity, granularity, startDate, endDate]);

    return { data, isLoading, error };
}
