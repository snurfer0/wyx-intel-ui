'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { TrackingDetailTemplate } from '@/components/templates/tracking-detail-template';
import { trackingService } from '@/services/tracking.service';
import type { TrackingDetailed } from '@/types';

export default function TrackingDetailPage(): React.JSX.Element {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [trackingResponse, setTrackingResponse] =
        useState<TrackingDetailed | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTracking = async (): Promise<void> => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await trackingService.getTrackingById(id);
                setTrackingResponse(data);
            } catch (err) {
                console.error('Error fetching tracking detail:', err);
                setError('Failed to load tracking details. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        void fetchTracking();
    }, [id]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <TrackingDetailTemplate
            trackingResponse={trackingResponse}
            isLoading={isLoading}
            error={error}
            onBack={(): void => router.back()}
            formatDate={formatDate}
        />
    );
}
