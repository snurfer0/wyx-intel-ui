import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    className?: string;
}

export function StatCard({
    title,
    value,
    subtitle,
    className,
}: StatCardProps): React.JSX.Element {
    return (
        <Card className={className}>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
                {subtitle && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {subtitle}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
