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
        <Card className="border-emerald-500/20 bg-black hover:border-emerald-500/40 transition-all duration-200">
            <CardContent className="pt-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <p className="font-mono font-medium text-sm text-emerald-400 truncate">
                            {token.name}
                        </p>
                        <p className="text-xs font-mono text-gray-500">
                            {token.symbol}
                        </p>
                    </div>
                    <Badge
                        variant="outline"
                        className="text-xs font-mono shrink-0 border-emerald-500/30 text-emerald-400"
                    >
                        {token.chain.toUpperCase()}
                    </Badge>
                </div>
                <div>
                    <code
                        onClick={(): void => {
                            void handleCopyTokenId();
                        }}
                        className="text-xs font-mono bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded block cursor-pointer hover:bg-emerald-500/10 transition-colors"
                        title="Click to copy full address"
                    >
                        {shortenAddress(token.id)}
                    </code>
                    {copied && (
                        <p className="text-xs font-mono text-emerald-400 mt-1">
                            Copied!
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
