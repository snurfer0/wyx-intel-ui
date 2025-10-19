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
            className={`border-emerald-500/20 bg-zinc-950 hover:bg-zinc-900/50 hover:border-emerald-500/40 transition-all ${className || ''}`}
        >
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono font-medium text-gray-500 uppercase tracking-wider">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-mono font-bold text-white">
                    {value}
                </div>
                {subtitle && (
                    <p className="text-xs font-mono text-emerald-400/80 mt-2">
                        {subtitle}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
