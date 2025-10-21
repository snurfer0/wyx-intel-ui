'use client';

import React from 'react';
import { StatisticsPageTemplate } from '@/components/templates/statistics-page-template';
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

    const systemMetrics = [
        { label: 'DB', value: stats.system.databaseSize },
        {
            label: 'Embeddings',
            value: formatLargeNumber(stats.system.totalEmbeddings),
        },
        { label: 'Profile', value: `${stats.tokenProfiles.completionRate}%` },
    ];

    const statsGridItems = [
        {
            label: 'Posts',
            value: formatLargeNumber(stats.overview.totalPosts),
            subtitle: `+${formatLargeNumber(stats.overview.postsLast24h)} (24h)`,
            color: 'emerald' as const,
        },
        {
            label: 'Tokens',
            value: formatLargeNumber(stats.overview.totalTokens),
            subtitle: `${stats.tokens.withProfiles} profiles`,
            color: 'blue' as const,
        },
        {
            label: 'Authors',
            value: formatLargeNumber(stats.overview.totalAuthors),
            subtitle: `${formatLargeNumber(stats.authors.timeBasedStats.last24h)} (24h)`,
            color: 'purple' as const,
        },
        {
            label: 'Tracking',
            value: stats.overview.totalTracking,
            subtitle: `avg ${stats.tracking.avgPriority.toFixed(1)} priority`,
            color: 'orange' as const,
        },
    ];

    const activityPeriods = [
        {
            title: 'Last 1 Hour',
            items: [
                {
                    label: 'Posts',
                    value: stats.posts.timeBasedStats.last1h,
                    color: 'emerald' as const,
                },
                {
                    label: 'Tokens',
                    value: formatLargeNumber(
                        stats.tokens.timeBasedStats.last1h,
                    ),
                    color: 'blue' as const,
                },
                {
                    label: 'Authors',
                    value: stats.authors.timeBasedStats.last1h,
                    color: 'purple' as const,
                },
            ],
        },
        {
            title: 'Last 24 Hours',
            items: [
                {
                    label: 'Posts',
                    value: formatLargeNumber(
                        stats.posts.timeBasedStats.last24h,
                    ),
                    color: 'emerald' as const,
                },
                {
                    label: 'Tokens',
                    value: formatLargeNumber(
                        stats.tokens.timeBasedStats.last24h,
                    ),
                    color: 'blue' as const,
                },
                {
                    label: 'Authors',
                    value: formatLargeNumber(
                        stats.authors.timeBasedStats.last24h,
                    ),
                    color: 'purple' as const,
                },
            ],
        },
        {
            title: 'Last 7 Days',
            items: [
                {
                    label: 'Posts',
                    value: formatLargeNumber(stats.posts.timeBasedStats.last7d),
                    color: 'emerald' as const,
                },
                {
                    label: 'Tokens',
                    value: formatLargeNumber(
                        stats.tokens.timeBasedStats.last7d,
                    ),
                    color: 'blue' as const,
                },
                {
                    label: 'Avg/day',
                    value: formatLargeNumber(stats.posts.avgPerDay),
                    color: 'gray' as const,
                },
            ],
        },
    ];

    return (
        <StatisticsPageTemplate
            systemMetrics={systemMetrics}
            statsGridItems={statsGridItems}
            activityPeriods={activityPeriods}
            topAuthors={stats.authors.topByPosts}
            topChains={topChains}
            totalTokens={stats.tokens.total}
        />
    );
}
