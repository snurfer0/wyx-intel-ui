import axios from 'axios';
import {
    PaginatedResponse,
    TrackingSearchItem,
    TrackingSearchParams,
    TrackingDetailed,
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class TrackingService {
    private getHeaders(apiKey?: string): Record<string, string> {
        // Try to get API key from auth store if not provided
        if (!apiKey && typeof window !== 'undefined') {
            const stored = localStorage.getItem('wyx-auth-storage');
            if (stored) {
                const parsed = JSON.parse(stored) as {
                    state?: { apiKey?: string };
                };
                apiKey = parsed.state?.apiKey;
            }
        }

        return {
            'x-api-secret': apiKey || '',
        };
    }

    async searchTrackingItems(
        params: TrackingSearchParams,
        apiKey?: string,
    ): Promise<PaginatedResponse<TrackingSearchItem>> {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('q', params.query);

            if (params.cursor !== undefined) {
                queryParams.append('cursor', params.cursor.toString());
            }
            if (params.limit !== undefined) {
                queryParams.append('limit', params.limit.toString());
            }
            if (params.threshold !== undefined) {
                queryParams.append('threshold', params.threshold.toString());
            }

            const response = await axios.get<
                PaginatedResponse<TrackingSearchItem>
            >(`${API_URL}/ui/tracking/search?${queryParams.toString()}`, {
                headers: this.getHeaders(apiKey),
            });

            return response.data;
        } catch (error) {
            console.error('Error searching tracking items:', error);
            throw error;
        }
    }

    async getTrackingById(
        id: string,
        apiKey?: string,
    ): Promise<TrackingDetailed> {
        try {
            const response = await axios.get<TrackingDetailed>(
                `${API_URL}/ui/tracking/${id}`,
                {
                    headers: this.getHeaders(apiKey),
                },
            );

            return response.data;
        } catch (error) {
            console.error('Error fetching tracking detail:', error);
            throw error;
        }
    }
}

export const trackingService = new TrackingService();
