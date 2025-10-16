import { API_URL } from '@/config/constants';
import {
    analyticsStatsSchema,
    type AnalyticsStats,
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
}

export const analyticsService = new AnalyticsService();
