'use client';

import React, { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import type {
    TimeseriesDataPoint,
    TimeseriesGranularity,
} from '@/types/analytics.types';
import { formatTimeseriesDate } from '@/utils/date-formatting';

interface TimeseriesChartProps {
    data: TimeseriesDataPoint[];
    entityLabel: string;
    granularity: TimeseriesGranularity;
    color?: string;
}

export function TimeseriesChart({
    data,
    entityLabel,
    granularity,
    color = 'hsl(var(--chart-1))',
}: TimeseriesChartProps): React.JSX.Element {
    const chartConfig = {
        count: {
            label: entityLabel,
            color,
        },
    } satisfies ChartConfig;

    const formattedData = useMemo(
        () =>
            data.map(point => ({
                ...point,
                formattedTimestamp: formatTimeseriesDate(
                    point.timestamp,
                    granularity,
                ),
            })),
        [data, granularity],
    );

    return (
        <ChartContainer config={chartConfig} className="h-[180px] w-full">
            <AreaChart data={formattedData}>
                <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                />
                <XAxis
                    dataKey="formattedTimestamp"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-xs"
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-xs"
                />
                <ChartTooltip
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                    type="monotone"
                    dataKey="count"
                    stroke={color}
                    strokeWidth={2}
                    fill="url(#colorCount)"
                />
            </AreaChart>
        </ChartContainer>
    );
}
