import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { formatLargeNumber } from '@/utils/number-formatting';

interface TopChainsListProps {
    chains: Array<[string, number]>;
    totalTokens: number;
    className?: string;
}

export function TopChainsList({
    chains,
    totalTokens,
    className,
}: TopChainsListProps): React.JSX.Element {
    return (
        <Card className={`border-emerald-500/20 bg-black ${className || ''}`}>
            <CardHeader>
                <CardTitle className="font-mono text-emerald-400">
                    Top Chains
                </CardTitle>
                <CardDescription className="font-mono text-gray-500">
                    Token distribution by blockchain
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {chains.map(([chain, count], idx) => (
                        <div
                            key={chain}
                            className="flex items-center justify-between border-b border-emerald-500/10 pb-3 last:border-0"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-mono text-emerald-500 w-4">
                                    {idx + 1}
                                </span>
                                <span className="text-sm font-mono font-medium text-emerald-400 capitalize">
                                    {chain}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-mono text-gray-500">
                                    {((count / totalTokens) * 100).toFixed(1)}%
                                </span>
                                <Badge
                                    variant="outline"
                                    className="border-emerald-500/30 text-emerald-400 font-mono"
                                >
                                    {formatLargeNumber(count)}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
