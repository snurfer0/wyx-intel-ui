import React from 'react';

interface StatsMetricProps {
    label: string;
    value: string | number;
    subtitle?: string;
    color?: 'emerald' | 'blue' | 'purple' | 'orange';
}

const colorClasses = {
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400',
};

export function StatsMetric({
    label,
    value,
    subtitle,
    color = 'emerald',
}: StatsMetricProps): React.JSX.Element {
    return (
        <div className="text-center">
            <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                {label}
            </p>
            <p
                className={`text-3xl font-mono font-bold ${colorClasses[color]}`}
            >
                {value}
            </p>
            {subtitle && (
                <p className="text-xs font-mono text-gray-600 mt-1">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
