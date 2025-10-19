import React from 'react';
import { ActivityStatsCard } from '@/components/molecules/activity-stats-card';
import { StatsGrid } from '@/components/molecules/stats-grid';
import { StatisticsHeader } from '@/components/organisms/statistics-header';
import { TimeseriesSection } from '@/components/organisms/timeseries-section';
import { TopAuthorsList } from '@/components/organisms/top-authors-list';
import { TopChainsList } from '@/components/organisms/top-chains-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SystemMetric {
    label: string;
    value: string | number;
}

interface StatsGridItem {
    label: string;
    value: string | number;
    subtitle?: string;
    color?: 'emerald' | 'blue' | 'purple' | 'orange';
}

interface ActivityStatsItem {
    label: string;
    value: string | number;
    color?: 'emerald' | 'blue' | 'purple' | 'gray';
}

interface ActivityPeriod {
    title: string;
    items: ActivityStatsItem[];
}

interface TopAuthor {
    id: string;
    username: string;
    platform: string;
    followers: number;
    postsCount: number;
}

interface StatisticsPageTemplateProps {
    systemMetrics: SystemMetric[];
    statsGridItems: StatsGridItem[];
    activityPeriods: ActivityPeriod[];
    topAuthors: TopAuthor[];
    topChains: Array<[string, number]>;
    totalTokens: number;
}

export function StatisticsPageTemplate({
    systemMetrics,
    statsGridItems,
    activityPeriods,
    topAuthors,
    topChains,
    totalTokens,
}: StatisticsPageTemplateProps): React.JSX.Element {
    return (
        <div className="container mx-auto p-4 max-w-[1600px] space-y-4">
            <StatisticsHeader systemMetrics={systemMetrics} />

            <StatsGrid items={statsGridItems} />

            <TimeseriesSection />

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
                        {activityPeriods.map((period, index) => (
                            <ActivityStatsCard
                                key={index}
                                title={period.title}
                                items={period.items}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="authors" className="mt-4">
                    <TopAuthorsList authors={topAuthors} />
                </TabsContent>

                <TabsContent value="chains" className="mt-4">
                    <TopChainsList
                        chains={topChains}
                        totalTokens={totalTokens}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
