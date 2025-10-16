import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityItem {
    label: string;
    value: string | number;
}

interface ActivityCardProps {
    title: string;
    items: ActivityItem[];
    className?: string;
}

export function ActivityCard({
    title,
    items,
    className,
}: ActivityCardProps): React.JSX.Element {
    return (
        <Card
            className={`border-emerald-500/20 bg-black hover:border-emerald-500/40 transition-colors ${className || ''}`}
        >
            <CardHeader>
                <CardTitle className="text-base font-mono text-emerald-400">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex justify-between items-center border-b border-emerald-500/10 pb-2 last:border-0"
                    >
                        <span className="text-sm font-mono text-gray-400">
                            {item.label}
                        </span>
                        <span className="font-mono font-semibold text-emerald-400">
                            {item.value}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
