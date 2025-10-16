'use client';

import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { analyticsService } from '@/services/analytics.service';
import type { AnalyticsStats } from '@/types/analytics.types';
import { formatLargeNumber } from '@/utils/number-formatting';

export default function StatisticsPage(): React.JSX.Element {
    const [stats, setStats] = useState<AnalyticsStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect((): (() => void) => {
        const fetchStats = async (): Promise<void> => {
            try {
                const data = await analyticsService.getStats();
                setStats(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching stats:', err);
                setError('Failed to load statistics');
            } finally {
                setIsLoading(false);
            }
        };

        void fetchStats();
        const interval = setInterval(() => {
            void fetchStats();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return (
            <div className="container mx-auto p-6 max-w-7xl">
                <h1 className="text-3xl font-bold tracking-tight mb-8">
                    Statistics
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-32" />
                    ))}
                </div>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="container mx-auto p-6 max-w-7xl">
                <h1 className="text-3xl font-bold tracking-tight mb-8">
                    Statistics
                </h1>
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">
                            {error || 'No statistics available'}
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const topChains = Object.entries(stats.tokens.byChain)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    return (
        <div className="container mx-auto p-6 max-w-7xl space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Statistics Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">
                    Real-time analytics and metrics (updates every second)
                </p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Posts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {formatLargeNumber(stats.overview.totalPosts)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            +{formatLargeNumber(stats.overview.postsLast24h)}{' '}
                            last 24h
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Tokens
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {formatLargeNumber(stats.overview.totalTokens)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {stats.tokens.withProfiles} with profiles
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Authors
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {formatLargeNumber(stats.overview.totalAuthors)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {formatLargeNumber(
                                stats.authors.timeBasedStats.last24h,
                            )}{' '}
                            last 24h
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Tracking Items
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {stats.overview.totalTracking}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Avg priority:{' '}
                            {stats.tracking.avgPriority.toFixed(1)}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Activity Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Recent Activity (1h)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                                Posts
                            </span>
                            <span className="font-semibold">
                                {stats.posts.timeBasedStats.last1h}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                                Tokens
                            </span>
                            <span className="font-semibold">
                                {formatLargeNumber(
                                    stats.tokens.timeBasedStats.last1h,
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                                Authors
                            </span>
                            <span className="font-semibold">
                                {stats.authors.timeBasedStats.last1h}
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            24 Hour Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                                Posts
                            </span>
                            <span className="font-semibold">
                                {formatLargeNumber(
                                    stats.posts.timeBasedStats.last24h,
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                                Tokens
                            </span>
                            <span className="font-semibold">
                                {formatLargeNumber(
                                    stats.tokens.timeBasedStats.last24h,
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                                Authors
                            </span>
                            <span className="font-semibold">
                                {formatLargeNumber(
                                    stats.authors.timeBasedStats.last24h,
                                )}
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            7 Day Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                                Posts
                            </span>
                            <span className="font-semibold">
                                {formatLargeNumber(
                                    stats.posts.timeBasedStats.last7d,
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                                Tokens
                            </span>
                            <span className="font-semibold">
                                {formatLargeNumber(
                                    stats.tokens.timeBasedStats.last7d,
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                                Avg/day
                            </span>
                            <span className="font-semibold">
                                {formatLargeNumber(stats.posts.avgPerDay)}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Top Authors and Chains */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Top Authors by Posts</CardTitle>
                        <CardDescription>
                            Most active content creators
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {stats.authors.topByPosts
                                .slice(0, 5)
                                .map((author, idx) => (
                                    <div
                                        key={author.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <span className="text-sm font-mono text-muted-foreground w-4">
                                                {idx + 1}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium truncate">
                                                    @{author.username}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {formatLargeNumber(
                                                        author.followers,
                                                    )}{' '}
                                                    followers
                                                </p>
                                            </div>
                                        </div>
                                        <Badge variant="secondary">
                                            {author.postsCount} posts
                                        </Badge>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Chains</CardTitle>
                        <CardDescription>
                            Token distribution by blockchain
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {topChains.map(([chain, count], idx) => (
                                <div
                                    key={chain}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-mono text-muted-foreground w-4">
                                            {idx + 1}
                                        </span>
                                        <span className="text-sm font-medium capitalize">
                                            {chain}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">
                                            {(
                                                (count / stats.tokens.total) *
                                                100
                                            ).toFixed(1)}
                                            %
                                        </span>
                                        <Badge variant="outline">
                                            {formatLargeNumber(count)}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* System Info */}
            <Card>
                <CardHeader>
                    <CardTitle>System Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Database Size
                            </p>
                            <p className="text-lg font-semibold">
                                {stats.system.databaseSize}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Total Embeddings
                            </p>
                            <p className="text-lg font-semibold">
                                {formatLargeNumber(
                                    stats.system.totalEmbeddings,
                                )}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Token Profile Completion
                            </p>
                            <p className="text-lg font-semibold">
                                {stats.tokenProfiles.completionRate}%
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Tokens with Scraped Data
                            </p>
                            <p className="text-lg font-semibold">
                                {formatLargeNumber(
                                    stats.tokens.withScrapedData,
                                )}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
