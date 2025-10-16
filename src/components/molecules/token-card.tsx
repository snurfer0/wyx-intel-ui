'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Token } from '@/types';

interface TokenCardProps {
    token: Token;
}

export function TokenCard({ token }: TokenCardProps): React.JSX.Element {
    const [copied, setCopied] = useState(false);

    const shortenAddress = (address: string): string => {
        if (address.length <= 10) return address;
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const handleCopyTokenId = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(token.id);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy token ID:', err);
        }
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">
                            {token.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {token.symbol}
                        </p>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                        {token.chain.toUpperCase()}
                    </Badge>
                </div>
                <div>
                    <code
                        onClick={(): void => {
                            void handleCopyTokenId();
                        }}
                        className="text-xs bg-muted px-2 py-1 rounded block cursor-pointer hover:bg-muted/80 transition-colors font-mono"
                        title="Click to copy full address"
                    >
                        {shortenAddress(token.id)}
                    </code>
                    {copied && (
                        <p className="text-xs text-green-600 mt-1">Copied!</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
