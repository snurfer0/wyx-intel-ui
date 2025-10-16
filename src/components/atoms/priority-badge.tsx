'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { Priority } from '@/types';

interface PriorityBadgeProps {
    priority: Priority;
}

export function PriorityBadge({
    priority,
}: PriorityBadgeProps): React.JSX.Element {
    // Priority is 1-10, where 10 is highest
    const getCustomStyle = (priority: Priority): string => {
        if (priority >= 8) {
            // High priority - Red
            return 'bg-red-500/10 text-red-400 border-red-500/40';
        } else if (priority >= 5) {
            // Medium priority - Yellow/Orange
            return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/40';
        } else {
            // Low priority - Gray
            return 'bg-gray-500/10 text-gray-400 border-gray-500/40';
        }
    };

    return (
        <Badge
            variant="outline"
            className={`font-mono text-xs font-semibold ${getCustomStyle(priority)}`}
        >
            P{priority}
        </Badge>
    );
}
