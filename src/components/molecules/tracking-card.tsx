'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { EntityTypeBadge } from '@/components/atoms/entity-type-badge';
import { PriorityBadge } from '@/components/atoms/priority-badge';
import { RelativeTime } from '@/components/atoms/relative-time';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TrackingSearchItem } from '@/types';

interface TrackingCardProps {
    item: TrackingSearchItem;
    showSimilarity?: boolean;
}

export function TrackingCard({
    item,
    showSimilarity = false,
}: TrackingCardProps): React.JSX.Element {
    const router = useRouter();

    const handleCopyEntityId = async (e: React.MouseEvent): Promise<void> => {
        e.stopPropagation();
        if (item.entityId) {
            try {
                await navigator.clipboard.writeText(item.entityId);
            } catch (err) {
                console.error('Failed to copy entity ID:', err);
            }
        }
    };

    const handleCardClick = (): void => {
        router.push(`/tracking/${item.id}`);
    };

    return (
        <Card
            className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={handleCardClick}
        >
            <CardHeader className="space-y-3 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <PriorityBadge priority={item.priority} />
                        <EntityTypeBadge entityType={item.entityType} />
                    </div>
                    <RelativeTime
                        date={item.createdAt}
                        className="text-xs text-muted-foreground"
                    />
                </div>

                <CardTitle className="text-lg leading-snug line-clamp-2">
                    {item.title}
                </CardTitle>

                {showSimilarity && (
                    <div>
                        <Badge
                            variant="outline"
                            className="text-xs font-medium"
                        >
                            {(item.similarity * 100).toFixed(1)}% match
                        </Badge>
                    </div>
                )}
            </CardHeader>

            <CardContent className="flex-1 flex flex-col space-y-4 pt-0">
                {item.entityId && (
                    <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                            Entity ID
                        </h4>
                        <code
                            onClick={(e): void => {
                                void handleCopyEntityId(e);
                            }}
                            className="text-xs bg-muted px-3 py-2 rounded break-all cursor-pointer hover:bg-muted/80 transition-colors block font-mono"
                            title="Click to copy"
                        >
                            {item.entityId.length > 30
                                ? `${item.entityId.substring(0, 30)}...`
                                : item.entityId}
                        </code>
                    </div>
                )}

                <div className="flex-1">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Reasoning Chain
                    </h4>
                    <div className="space-y-2">
                        {item.reasoning.slice(0, 2).map((reason, idx) => (
                            <div key={idx} className="flex gap-2">
                                <span className="text-xs font-medium text-primary mt-0.5">
                                    {idx + 1}.
                                </span>
                                <p className="text-xs text-foreground/90 line-clamp-2 leading-relaxed">
                                    {reason.text}
                                </p>
                            </div>
                        ))}
                        {item.reasoning.length > 2 && (
                            <p className="text-xs text-muted-foreground italic pl-4">
                                +{item.reasoning.length - 2} more reason
                                {item.reasoning.length - 2 !== 1 ? 's' : ''}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap pt-2 border-t">
                    <Badge variant="secondary" className="text-xs">
                        {item.postsCount} post
                        {item.postsCount !== 1 ? 's' : ''}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                        {item.tokensCount} token
                        {item.tokensCount !== 1 ? 's' : ''}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}
