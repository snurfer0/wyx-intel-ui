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
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs font-mono font-medium text-emerald-400">
                        {idx + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-mono text-gray-300 leading-relaxed">
                            {reason.text}
                        </p>
                        <p className="text-xs font-mono text-gray-500">
                            {formatTimestamp(reason.timestamp)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
