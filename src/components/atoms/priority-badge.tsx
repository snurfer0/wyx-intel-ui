'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { Priority } from '@/types';
import { getPriorityVariant } from '@/utils/badge-variants';

interface PriorityBadgeProps {
    priority: Priority;
}

export function PriorityBadge({
    priority,
}: PriorityBadgeProps): React.JSX.Element {
    return (
        <Badge variant={getPriorityVariant(priority)} className="font-mono">
            P{priority}
        </Badge>
    );
}
