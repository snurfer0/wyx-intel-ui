'use client';

import React, { useState } from 'react';
import { EntitySelector } from '@/components/atoms/entity-selector';
import { GranularitySelector } from '@/components/atoms/granularity-selector';
import { TimeseriesChart } from '@/components/atoms/timeseries-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTimeseries } from '@/hooks/use-timeseries';
import type {
    TimeseriesEntity,
    TimeseriesGranularity,
} from '@/types/analytics.types';

interface TimeseriesTabConfig {
    value: TimeseriesEntity;
    label: string;
    color: string;
}

const TABS: TimeseriesTabConfig[] = [
    { value: 'posts', label: 'Posts', color: 'hsl(142, 76%, 36%)' },
    { value: 'authors', label: 'Authors', color: 'hsl(217, 91%, 60%)' },
    { value: 'tokens', label: 'Tokens', color: 'hsl(280, 67%, 55%)' },
];

const GRANULARITIES: Array<{
    value: TimeseriesGranularity;
    label: string;
}> = [
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
    { value: 'monthly', label: 'Monthly' },
];

interface TimeseriesSectionProps {
    className?: string;
}

export function TimeseriesSection({
    className,
}: TimeseriesSectionProps): React.JSX.Element {
    const [selectedEntity, setSelectedEntity] =
        useState<TimeseriesEntity>('posts');
    const [selectedGranularity, setSelectedGranularity] =
        useState<TimeseriesGranularity>('daily');

    const { data, isLoading, error } = useTimeseries({
        entity: selectedEntity,
        granularity: selectedGranularity,
    });

    const selectedTab = TABS.find(tab => tab.value === selectedEntity);

    return (
        <Card
            className={`border-emerald-500/20 bg-zinc-950 ${className || ''}`}
        >
            <CardHeader className="border-b border-emerald-500/10 py-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="font-mono text-sm text-emerald-400 tracking-wide">
                        Activity Trends
                    </CardTitle>
                    <div className="flex gap-4">
                        <EntitySelector
                            options={TABS}
                            selected={selectedEntity}
                            onSelect={setSelectedEntity}
                        />
                        <div className="border-l border-emerald-500/20 pl-4">
                            <GranularitySelector
                                options={GRANULARITIES}
                                selected={selectedGranularity}
                                onSelect={setSelectedGranularity}
                            />
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="py-3">
                {isLoading && (
                    <div className="flex items-center justify-center h-[180px]">
                        <div className="text-xs font-mono text-gray-500">
                            Loading chart data...
                        </div>
                    </div>
                )}
                {error && (
                    <div className="flex items-center justify-center h-[180px]">
                        <div className="text-xs font-mono text-red-400">
                            {error}
                        </div>
                    </div>
                )}
                {data && !isLoading && !error && (
                    <div>
                        <TimeseriesChart
                            data={data.data}
                            entityLabel={selectedTab?.label || selectedEntity}
                            granularity={data.granularity}
                            color={selectedTab?.color}
                        />
                        <div className="mt-2 flex items-center justify-between text-xs font-mono text-gray-600 px-2">
                            <div>
                                Total: {data.total.toLocaleString()}{' '}
                                {selectedTab?.label.toLowerCase()}
                            </div>
                            <div>{data.data.length} points</div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
