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
        <Card className={className}>
            <CardHeader>
                <CardTitle>Top Chains</CardTitle>
                <CardDescription>
                    Token distribution by blockchain
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {chains.map(([chain, count], idx) => (
                        <div
                            key={chain}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-mono text-muted-foreground w-4">
                                    {idx + 1}
                                </span>
                                <span className="text-sm font-medium capitalize">
                                    {chain}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    {((count / totalTokens) * 100).toFixed(1)}%
                                </span>
                                <Badge variant="outline">
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
