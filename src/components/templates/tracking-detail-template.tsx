'use client';

import { Brain } from 'lucide-react';
import React from 'react';
import { ReasoningChain } from '@/components/atoms/reasoning-chain';
import { PostCard } from '@/components/molecules/post-card';
import { TokenCard } from '@/components/molecules/token-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
                <Skeleton className="h-10 w-32 mb-6 bg-zinc-950 border border-emerald-500/20" />
                <div className="space-y-6">
                    <Skeleton className="h-64 w-full bg-zinc-950 border border-emerald-500/20" />
                    <Skeleton className="h-96 w-full bg-zinc-950 border border-emerald-500/20" />
                    <Skeleton className="h-64 w-full bg-zinc-950 border border-emerald-500/20" />
                </div>
            </div>
        );
    }

    if (error || !trackingResponse) {
        return (
            <div className="container mx-auto p-6 max-w-7xl">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="mb-6 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 font-mono"
                >
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
                <Alert
                    variant="destructive"
                    className="border-red-500/20 bg-red-500/5"
                >
                    <AlertTitle className="font-mono text-red-400">
                        Error
                    </AlertTitle>
                    <AlertDescription className="font-mono text-gray-400">
                        {error || 'Tracking not found'}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <Button
                variant="ghost"
                onClick={onBack}
                className="mb-8 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 font-mono -ml-2"
            >
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
                {/* Header Section */}
                <div className="border-l-2 border-emerald-500 pl-4">
                    <h1 className="text-2xl font-mono font-semibold text-white mb-1">
                        {trackingResponse.tracking.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono text-gray-500">
                        <span>
                            Created{' '}
                            {formatDate(trackingResponse.tracking.createdAt)}
                        </span>
                        <span>•</span>
                        <span>{trackingResponse.tracking.entityType}</span>
                        <span>•</span>
                        <span
                            className={
                                trackingResponse.tracking.priority >= 8
                                    ? 'text-red-400'
                                    : trackingResponse.tracking.priority >= 5
                                      ? 'text-yellow-400'
                                      : 'text-blue-400'
                            }
                        >
                            Priority: {trackingResponse.tracking.priority}
                        </span>
                        {trackingResponse.tracking.entityId && (
                            <>
                                <span>•</span>
                                <span className="text-emerald-400">
                                    {trackingResponse.tracking.entityId}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <Card className="border-emerald-500/20 bg-zinc-950">
                    <CardHeader className="border-b border-emerald-500/10">
                        <CardTitle className="text-lg font-mono text-emerald-400 flex items-center gap-2 tracking-wide">
                            <Brain className="w-4 h-4" />
                            Reasoning Chain
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <ReasoningChain
                            reasons={trackingResponse.tracking.reasoning}
                        />
                    </CardContent>
                </Card>

                {trackingResponse.tokens.length > 0 && (
                    <div>
                        <h2 className="text-xl font-mono font-semibold text-white mb-4">
                            Tokens ({trackingResponse.tokens.length})
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                            {trackingResponse.tokens.map(token => (
                                <TokenCard key={token.id} token={token} />
                            ))}
                        </div>
                    </div>
                )}

                {trackingResponse.posts.length > 0 && (
                    <div>
                        <h2 className="text-xl font-mono font-semibold text-white mb-4">
                            Posts ({trackingResponse.posts.length})
                        </h2>
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
                        <Card className="border-emerald-500/20 bg-zinc-950">
                            <CardContent className="py-12">
                                <p className="text-center font-mono text-gray-500">
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
