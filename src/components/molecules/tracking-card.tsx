'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
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
            className="h-full flex flex-col border-emerald-500/20 bg-black hover:border-emerald-500/40 transition-all duration-200 cursor-pointer relative"
            onClick={handleCardClick}
        >
            <CardHeader className="space-y-3 pb-4 relative">
                {/* Title */}
                <CardTitle className="text-lg font-mono leading-snug line-clamp-2 text-emerald-400">
                    {item.title}
                </CardTitle>

                {/* Similarity badge if searching */}
                {showSimilarity && (
                    <div>
                        <Badge
                            variant="outline"
                            className="text-xs font-mono font-medium border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                        >
                            {(item.similarity * 100).toFixed(1)}% match
                        </Badge>
                    </div>
                )}

                {/* Bottom border that doesn't touch edges */}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-emerald-500/20" />
            </CardHeader>

            <CardContent className="flex-1 flex flex-col space-y-4 pt-0 mt-4">
                {item.entityId && (
                    <div>
                        <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            {item.entityType}
                        </h4>
                        <code
                            onClick={(e): void => {
                                void handleCopyEntityId(e);
                            }}
                            className="text-xs bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 px-3 py-2 rounded break-all cursor-pointer hover:bg-emerald-500/10 transition-colors block font-mono"
                            title="Click to copy"
                        >
                            {item.entityId.length > 30
                                ? `${item.entityId.substring(0, 30)}...`
                                : item.entityId}
                        </code>
                    </div>
                )}

                <div className="flex-1">
                    <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Reasoning Chain
                    </h4>
                    <div className="space-y-2">
                        {item.reasoning.slice(0, 2).map((reason, idx) => (
                            <div key={idx} className="flex gap-2">
                                <span className="text-xs font-mono font-medium text-emerald-500 mt-0.5">
                                    {idx + 1}.
                                </span>
                                <p className="text-xs font-mono text-gray-400 line-clamp-2 leading-relaxed">
                                    {reason.text}
                                </p>
                            </div>
                        ))}
                        {item.reasoning.length > 2 && (
                            <p className="text-xs font-mono text-gray-500 italic pl-4">
                                +{item.reasoning.length - 2} more reason
                                {item.reasoning.length - 2 !== 1 ? 's' : ''}
                            </p>
                        )}
                    </div>
                </div>

                {/* Bottom row with priority, stats on left, time on right */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <PriorityBadge priority={item.priority} />
                        <Badge
                            variant="secondary"
                            className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        >
                            {item.postsCount} post
                            {item.postsCount !== 1 ? 's' : ''}
                        </Badge>
                        <Badge
                            variant="secondary"
                            className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        >
                            {item.tokensCount} token
                            {item.tokensCount !== 1 ? 's' : ''}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-xs font-mono text-gray-600">
                            ⏱
                        </span>
                        <RelativeTime
                            date={item.createdAt}
                            className="text-xs font-mono text-gray-500"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
