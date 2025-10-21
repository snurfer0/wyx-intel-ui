import {
    analyticsStatsSchema,
    type AnalyticsStats,
    timeseriesResponseSchema,
    type TimeseriesResponse,
    type TimeseriesEntity,
    type TimeseriesGranularity,
} from '@/types/analytics.types';

class AnalyticsService {
    async getStats(): Promise<AnalyticsStats> {
        // Use our API proxy route instead of calling backend directly
        const response = await fetch('/api/analytics/stats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch analytics stats: ${response.statusText}`,
            );
        }

        const data: unknown = await response.json();
        return analyticsStatsSchema.parse(data);
    }

    async getTimeseries(
        entity: TimeseriesEntity,
        granularity: TimeseriesGranularity,
        startDate?: string,
        endDate?: string,
    ): Promise<TimeseriesResponse> {
        const params = new URLSearchParams({
            entity,
            granularity,
        });

        if (startDate) {
            params.append('startDate', startDate);
        }
        if (endDate) {
            params.append('endDate', endDate);
        }

        // Use our API proxy route instead of calling backend directly
        const response = await fetch(
            `/api/analytics/timeseries?${params.toString()}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            },
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch timeseries data: ${response.statusText}`,
            );
        }

        const data: unknown = await response.json();
        return timeseriesResponseSchema.parse(data);
    }
}

export const analyticsService = new AnalyticsService();
