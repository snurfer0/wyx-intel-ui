import { API_URL } from '@/config/constants';
import {
    analyticsStatsSchema,
    type AnalyticsStats,
    timeseriesResponseSchema,
    type TimeseriesResponse,
    type TimeseriesEntity,
    type TimeseriesGranularity,
} from '@/types/analytics.types';

class AnalyticsService {
    private getApiKey(): string {
        if (typeof window === 'undefined') return '';

        const stored = localStorage.getItem('wyx-auth-storage');
        if (stored) {
            const parsed = JSON.parse(stored) as {
                state?: { apiKey?: string };
            };
            return parsed.state?.apiKey || '';
        }
        return '';
    }

    async getStats(): Promise<AnalyticsStats> {
        const response = await fetch(`${API_URL}/analytics/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-secret': this.getApiKey(),
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

        const response = await fetch(
            `${API_URL}/analytics/timeseries?${params.toString()}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-secret': this.getApiKey(),
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
