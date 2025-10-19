import React from 'react';

interface ActivityStatsItem {
    label: string;
    value: string | number;
    color?: 'emerald' | 'blue' | 'purple' | 'gray';
}

interface ActivityStatsCardProps {
    title: string;
    items: ActivityStatsItem[];
}

const colorClasses = {
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    gray: 'text-gray-300',
};

export function ActivityStatsCard({
    title,
    items,
}: ActivityStatsCardProps): React.JSX.Element {
    return (
        <div className="border border-emerald-500/20 bg-zinc-950 p-4">
            <p className="text-xs text-gray-500 mb-3">{title}</p>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.label}</span>
                        <span className={colorClasses[item.color || 'emerald']}>
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
