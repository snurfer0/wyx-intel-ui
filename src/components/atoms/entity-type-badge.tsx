'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { EntityType } from '@/types';
import { getEntityTypeVariant } from '@/utils/badge-variants';

interface EntityTypeBadgeProps {
    entityType: EntityType;
}

export function EntityTypeBadge({
    entityType,
}: EntityTypeBadgeProps): React.JSX.Element {
    return (
        <Badge variant={getEntityTypeVariant(entityType)}>{entityType}</Badge>
    );
}
