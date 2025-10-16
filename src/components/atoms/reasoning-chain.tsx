'use client';

import React from 'react';
import type { ReasoningItem } from '@/types';
import { formatTimestamp } from '@/utils/date-formatting';

interface ReasoningChainProps {
    reasons: ReasoningItem[];
}

export function ReasoningChain({
    reasons,
}: ReasoningChainProps): React.JSX.Element {
    return (
        <div className="space-y-4">
            {reasons.map((reason, idx) => (
                <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {idx + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm text-foreground/80">
                            {reason.text}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {formatTimestamp(reason.timestamp)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
