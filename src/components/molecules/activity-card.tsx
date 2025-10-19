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
            className={`border-emerald-500/20 bg-zinc-950 hover:bg-zinc-900/50 hover:border-emerald-500/40 transition-all ${className || ''}`}
        >
            <CardHeader className="border-b border-emerald-500/10">
                <CardTitle className="text-base font-mono text-emerald-400 tracking-wide">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex justify-between items-center"
                    >
                        <span className="text-sm font-mono text-gray-500 uppercase text-xs tracking-wider">
                            {item.label}
                        </span>
                        <span className="font-mono font-bold text-white text-lg">
                            {item.value}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
