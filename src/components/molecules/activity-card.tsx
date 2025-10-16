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
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex justify-between items-center"
                    >
                        <span className="text-sm text-muted-foreground">
                            {item.label}
                        </span>
                        <span className="font-semibold">{item.value}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
