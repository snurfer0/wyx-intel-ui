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
        <Card
            className={`border-emerald-500/20 bg-black hover:border-emerald-500/40 transition-colors ${className || ''}`}
        >
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono font-medium text-gray-400 uppercase">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-mono font-bold text-emerald-400">
                    {value}
                </div>
                {subtitle && (
                    <p className="text-xs font-mono text-gray-500 mt-1">
                        {subtitle}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
