'use client';

import React from 'react';
import { TimeseriesSection } from '@/components/organisms/timeseries-section';
import { TopAuthorsList } from '@/components/organisms/top-authors-list';
import { TopChainsList } from '@/components/organisms/top-chains-list';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnalyticsStats } from '@/hooks/use-analytics-stats';
import { formatLargeNumber } from '@/utils/number-formatting';

export default function StatisticsPage(): React.JSX.Element {
    const { stats, isLoading, error } = useAnalyticsStats();

    if (isLoading) {
        return (
            <div className="container mx-auto p-6 max-w-7xl">
                <h1 className="text-3xl font-mono font-bold text-emerald-400 mb-8">
                    STATISTICS
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            className="h-32 bg-zinc-950 border border-emerald-500/20"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="container mx-auto p-6 max-w-7xl">
                <h1 className="text-3xl font-mono font-bold text-emerald-400 mb-8">
                    STATISTICS
                </h1>
                <div className="border border-emerald-500/20 bg-zinc-950 p-6">
                    <p className="text-center font-mono text-gray-400">
                        {error || 'No statistics available'}
                    </p>
                </div>
            </div>
        );
    }

    const topChains = Object.entries(stats.tokens.byChain)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    return (
        <div className="container mx-auto p-4 max-w-[1600px] space-y-4">
            {/* Compact Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-mono font-bold text-emerald-400">
                    STATISTICS
                </h1>
                <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                    <span className="text-gray-600">
                        DB: {stats.system.databaseSize}
                    </span>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-gray-600">
                        Embeddings:{' '}
                        {formatLargeNumber(stats.system.totalEmbeddings)}
                    </span>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-gray-600">
                        Profile: {stats.tokenProfiles.completionRate}%
                    </span>
                </div>
            </div>

            <Separator className="bg-emerald-500/20" />

            {/* Compact Stats Grid */}
            <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                        Posts
                    </p>
                    <p className="text-3xl font-mono font-bold text-emerald-400">
                        {formatLargeNumber(stats.overview.totalPosts)}
                    </p>
                    <p className="text-xs font-mono text-gray-600 mt-1">
                        +{formatLargeNumber(stats.overview.postsLast24h)} (24h)
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                        Tokens
                    </p>
                    <p className="text-3xl font-mono font-bold text-blue-400">
                        {formatLargeNumber(stats.overview.totalTokens)}
                    </p>
                    <p className="text-xs font-mono text-gray-600 mt-1">
                        {stats.tokens.withProfiles} profiles
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                        Authors
                    </p>
                    <p className="text-3xl font-mono font-bold text-purple-400">
                        {formatLargeNumber(stats.overview.totalAuthors)}
                    </p>
                    <p className="text-xs font-mono text-gray-600 mt-1">
                        {formatLargeNumber(
                            stats.authors.timeBasedStats.last24h,
                        )}{' '}
                        (24h)
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                        Tracking
                    </p>
                    <p className="text-3xl font-mono font-bold text-orange-400">
                        {stats.overview.totalTracking}
                    </p>
                    <p className="text-xs font-mono text-gray-600 mt-1">
                        avg {stats.tracking.avgPriority.toFixed(1)} priority
                    </p>
                </div>
            </div>

            {/* Compact Chart */}
            <TimeseriesSection />

            {/* Tabs for Activity/Authors/Chains */}
            <Tabs defaultValue="activity" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-zinc-900">
                    <TabsTrigger
                        value="activity"
                        className="font-mono text-xs data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400"
                    >
                        Activity
                    </TabsTrigger>
                    <TabsTrigger
                        value="authors"
                        className="font-mono text-xs data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400"
                    >
                        Top Authors
                    </TabsTrigger>
                    <TabsTrigger
                        value="chains"
                        className="font-mono text-xs data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400"
                    >
                        Top Chains
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="activity" className="mt-4">
                    <div className="grid grid-cols-3 gap-4 font-mono">
                        <div className="border border-emerald-500/20 bg-zinc-950 p-4">
                            <p className="text-xs text-gray-500 mb-3">
                                Last 1 Hour
                            </p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Posts</span>
                                    <span className="text-emerald-400">
                                        {stats.posts.timeBasedStats.last1h}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        Tokens
                                    </span>
                                    <span className="text-blue-400">
                                        {formatLargeNumber(
                                            stats.tokens.timeBasedStats.last1h,
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        Authors
                                    </span>
                                    <span className="text-purple-400">
                                        {stats.authors.timeBasedStats.last1h}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="border border-emerald-500/20 bg-zinc-950 p-4">
                            <p className="text-xs text-gray-500 mb-3">
                                Last 24 Hours
                            </p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Posts</span>
                                    <span className="text-emerald-400">
                                        {formatLargeNumber(
                                            stats.posts.timeBasedStats.last24h,
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        Tokens
                                    </span>
                                    <span className="text-blue-400">
                                        {formatLargeNumber(
                                            stats.tokens.timeBasedStats.last24h,
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        Authors
                                    </span>
                                    <span className="text-purple-400">
                                        {formatLargeNumber(
                                            stats.authors.timeBasedStats
                                                .last24h,
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="border border-emerald-500/20 bg-zinc-950 p-4">
                            <p className="text-xs text-gray-500 mb-3">
                                Last 7 Days
                            </p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Posts</span>
                                    <span className="text-emerald-400">
                                        {formatLargeNumber(
                                            stats.posts.timeBasedStats.last7d,
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        Tokens
                                    </span>
                                    <span className="text-blue-400">
                                        {formatLargeNumber(
                                            stats.tokens.timeBasedStats.last7d,
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        Avg/day
                                    </span>
                                    <span className="text-gray-300">
                                        {formatLargeNumber(
                                            stats.posts.avgPerDay,
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="authors" className="mt-4">
                    <TopAuthorsList authors={stats.authors.topByPosts} />
                </TabsContent>

                <TabsContent value="chains" className="mt-4">
                    <TopChainsList
                        chains={topChains}
                        totalTokens={stats.tokens.total}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
