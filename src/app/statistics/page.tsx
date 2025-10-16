'use client';

import React from 'react';
import { StatCard } from '@/components/atoms/stat-card';
import { ActivityCard } from '@/components/molecules/activity-card';
import { TopAuthorsList } from '@/components/organisms/top-authors-list';
import { TopChainsList } from '@/components/organisms/top-chains-list';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
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
                            className="h-32 bg-emerald-500/5 border border-emerald-500/20"
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
                <Card className="border-emerald-500/20 bg-black">
                    <CardContent className="pt-6">
                        <p className="text-center font-mono text-gray-400">
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
            <div className="border-b border-emerald-500/20 pb-4">
                <h1 className="text-3xl font-mono font-bold text-emerald-400">
                    STATISTICS_DASHBOARD
                </h1>
                <p className="text-gray-400 font-mono text-sm mt-2">
                    &gt; Real-time analytics and metrics (updates every second)
                </p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Posts"
                    value={formatLargeNumber(stats.overview.totalPosts)}
                    subtitle={`+${formatLargeNumber(stats.overview.postsLast24h)} last 24h`}
                />
                <StatCard
                    title="Total Tokens"
                    value={formatLargeNumber(stats.overview.totalTokens)}
                    subtitle={`${stats.tokens.withProfiles} with profiles`}
                />
                <StatCard
                    title="Total Authors"
                    value={formatLargeNumber(stats.overview.totalAuthors)}
                    subtitle={`${formatLargeNumber(stats.authors.timeBasedStats.last24h)} last 24h`}
                />
                <StatCard
                    title="Tracking Items"
                    value={stats.overview.totalTracking}
                    subtitle={`Avg priority: ${stats.tracking.avgPriority.toFixed(1)}`}
                />
            </div>

            {/* Activity Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ActivityCard
                    title="Recent Activity (1h)"
                    items={[
                        {
                            label: 'Posts',
                            value: stats.posts.timeBasedStats.last1h,
                        },
                        {
                            label: 'Tokens',
                            value: formatLargeNumber(
                                stats.tokens.timeBasedStats.last1h,
                            ),
                        },
                        {
                            label: 'Authors',
                            value: stats.authors.timeBasedStats.last1h,
                        },
                    ]}
                />
                <ActivityCard
                    title="24 Hour Activity"
                    items={[
                        {
                            label: 'Posts',
                            value: formatLargeNumber(
                                stats.posts.timeBasedStats.last24h,
                            ),
                        },
                        {
                            label: 'Tokens',
                            value: formatLargeNumber(
                                stats.tokens.timeBasedStats.last24h,
                            ),
                        },
                        {
                            label: 'Authors',
                            value: formatLargeNumber(
                                stats.authors.timeBasedStats.last24h,
                            ),
                        },
                    ]}
                />
                <ActivityCard
                    title="7 Day Activity"
                    items={[
                        {
                            label: 'Posts',
                            value: formatLargeNumber(
                                stats.posts.timeBasedStats.last7d,
                            ),
                        },
                        {
                            label: 'Tokens',
                            value: formatLargeNumber(
                                stats.tokens.timeBasedStats.last7d,
                            ),
                        },
                        {
                            label: 'Avg/day',
                            value: formatLargeNumber(stats.posts.avgPerDay),
                        },
                    ]}
                />
            </div>

            {/* Top Authors and Chains */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopAuthorsList authors={stats.authors.topByPosts} />
                <TopChainsList
                    chains={topChains}
                    totalTokens={stats.tokens.total}
                />
            </div>

            {/* System Info */}
            <Card className="border-emerald-500/20 bg-black">
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <p className="text-xs font-mono text-gray-500 uppercase">
                                Database Size
                            </p>
                            <p className="text-lg font-mono font-semibold text-emerald-400">
                                {stats.system.databaseSize}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-mono text-gray-500 uppercase">
                                Total Embeddings
                            </p>
                            <p className="text-lg font-mono font-semibold text-emerald-400">
                                {formatLargeNumber(
                                    stats.system.totalEmbeddings,
                                )}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-mono text-gray-500 uppercase">
                                Token Profile Completion
                            </p>
                            <p className="text-lg font-mono font-semibold text-emerald-400">
                                {stats.tokenProfiles.completionRate}%
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-mono text-gray-500 uppercase">
                                Tokens with Scraped Data
                            </p>
                            <p className="text-lg font-mono font-semibold text-emerald-400">
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
