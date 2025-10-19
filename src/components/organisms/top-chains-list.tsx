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
        <Card
            className={`border-emerald-500/20 bg-zinc-950 hover:bg-zinc-900/50 transition-all ${className || ''}`}
        >
            <CardHeader className="border-b border-emerald-500/10">
                <CardTitle className="font-mono text-emerald-400 tracking-wide">
                    Top Chains
                </CardTitle>
                <CardDescription className="font-mono text-gray-500 text-xs">
                    Token distribution by blockchain
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    {chains.map(([chain, count], idx) => (
                        <div
                            key={chain}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-mono text-emerald-500/60 w-6 text-center bg-emerald-500/5 px-2 py-1">
                                    {idx + 1}
                                </span>
                                <span className="text-sm font-mono font-medium text-white capitalize">
                                    {chain}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-mono text-gray-500 w-12 text-right">
                                    {((count / totalTokens) * 100).toFixed(1)}%
                                </span>
                                <Badge
                                    variant="outline"
                                    className="border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-mono text-xs"
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
