'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { EntityType } from '@/types';

interface EntityTypeBadgeProps {
    entityType: EntityType;
}

export function EntityTypeBadge({
    entityType,
}: EntityTypeBadgeProps): React.JSX.Element {
    const getCustomStyle = (type: EntityType): string => {
        switch (type) {
            case 'token':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40';
            case 'author':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/40';
            case 'narrative':
                return 'bg-purple-500/10 text-purple-400 border-purple-500/40';
            case 'post':
                return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40';
        }
    };

    return (
        <Badge
            variant="outline"
            className={`font-mono text-xs font-semibold uppercase ${getCustomStyle(entityType)}`}
        >
            {entityType}
        </Badge>
    );
}
