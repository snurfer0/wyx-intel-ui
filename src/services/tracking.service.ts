import axios from 'axios';
import {
    PaginatedResponse,
    TrackingSearchItem,
    TrackingSearchParams,
    TrackingDetailed,
} from '@/types';

class TrackingService {
    async searchTrackingItems(
        params: TrackingSearchParams,
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

            // Use our API proxy route instead of calling backend directly
            const response = await axios.get<
                PaginatedResponse<TrackingSearchItem>
            >(`/api/tracking/search?${queryParams.toString()}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error searching tracking items:', error);
            throw error;
        }
    }

    async getTrackingById(id: string): Promise<TrackingDetailed> {
        try {
            // Use our API proxy route instead of calling backend directly
            const response = await axios.get<TrackingDetailed>(
                `/api/tracking/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
