'use client';

import React from 'react';
import { EntityInfo } from '@/components/atoms/entity-info';
import { ReasoningChain } from '@/components/atoms/reasoning-chain';
import { PostCard } from '@/components/molecules/post-card';
import { TokenCard } from '@/components/molecules/token-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { TrackingDetailed } from '@/types';

interface TrackingDetailTemplateProps {
    trackingResponse: TrackingDetailed | null;
    isLoading: boolean;
    error: string | null;
    onBack: () => void;
    formatDate: (date: string) => string;
}

export function TrackingDetailTemplate({
    trackingResponse,
    isLoading,
    error,
    onBack,
    formatDate,
}: TrackingDetailTemplateProps): React.JSX.Element {
    if (isLoading) {
        return (
            <div className="container mx-auto p-6 max-w-7xl">
                <Skeleton className="h-10 w-32 mb-6" />
                <div className="space-y-6">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-96 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        );
    }

    if (error || !trackingResponse) {
        return (
            <div className="container mx-auto p-6 max-w-7xl">
                <Button variant="ghost" onClick={onBack} className="mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                </Button>
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error || 'Tracking not found'}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <Button variant="ghost" onClick={onBack} className="mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back
            </Button>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <CardTitle className="text-2xl mb-4">
                                    {trackingResponse.tracking.title}
                                </CardTitle>
                                <EntityInfo
                                    entityType={
                                        trackingResponse.tracking.entityType
                                    }
                                    priority={
                                        trackingResponse.tracking.priority
                                    }
                                    entityId={
                                        trackingResponse.tracking.entityId
                                    }
                                />
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-muted-foreground">
                                    Created
                                </p>
                                <p className="text-sm">
                                    {formatDate(
                                        trackingResponse.tracking.createdAt,
                                    )}
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Reasoning Chain
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ReasoningChain
                            reasons={trackingResponse.tracking.reasoning}
                        />
                    </CardContent>
                </Card>

                {trackingResponse.tokens.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Tokens</h2>
                            <Badge variant="secondary">
                                {trackingResponse.tokens.length} token
                                {trackingResponse.tokens.length !== 1
                                    ? 's'
                                    : ''}
                            </Badge>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                            {trackingResponse.tokens.map(token => (
                                <TokenCard key={token.id} token={token} />
                            ))}
                        </div>
                    </div>
                )}

                {trackingResponse.posts.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Posts</h2>
                            <Badge variant="secondary">
                                {trackingResponse.posts.length} post
                                {trackingResponse.posts.length !== 1 ? 's' : ''}
                            </Badge>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {trackingResponse.posts.map(postWithAuthor => (
                                <PostCard
                                    key={postWithAuthor.post.id}
                                    postWithAuthor={postWithAuthor}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {trackingResponse.posts.length === 0 &&
                    trackingResponse.tokens.length === 0 && (
                        <Card>
                            <CardContent className="py-12">
                                <p className="text-center text-muted-foreground">
                                    No posts or tokens associated with this
                                    tracking item
                                </p>
                            </CardContent>
                        </Card>
                    )}
            </div>
        </div>
    );
}
