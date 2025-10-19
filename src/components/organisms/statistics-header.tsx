import React from 'react';
import { Separator } from '@/components/ui/separator';

interface SystemMetric {
    label: string;
    value: string | number;
}

interface StatisticsHeaderProps {
    systemMetrics: SystemMetric[];
}

export function StatisticsHeader({
    systemMetrics,
}: StatisticsHeaderProps): React.JSX.Element {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-mono font-bold text-emerald-400">
                    STATISTICS
                </h1>
                <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                    {systemMetrics.map((metric, index) => (
                        <React.Fragment key={index}>
                            <span className="text-gray-600">
                                {metric.label}: {metric.value}
                            </span>
                            {index < systemMetrics.length - 1 && (
                                <Separator
                                    orientation="vertical"
                                    className="h-4"
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <Separator className="bg-emerald-500/20" />
        </>
    );
}
