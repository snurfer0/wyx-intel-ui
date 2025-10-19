import React from 'react';
import { StatsMetric } from '@/components/atoms/stats-metric';

interface StatsGridItem {
    label: string;
    value: string | number;
    subtitle?: string;
    color?: 'emerald' | 'blue' | 'purple' | 'orange';
}

interface StatsGridProps {
    items: StatsGridItem[];
}

export function StatsGrid({ items }: StatsGridProps): React.JSX.Element {
    return (
        <div className="grid grid-cols-4 gap-6">
            {items.map((item, index) => (
                <StatsMetric
                    key={index}
                    label={item.label}
                    value={item.value}
                    subtitle={item.subtitle}
                    color={item.color}
                />
            ))}
        </div>
    );
}
