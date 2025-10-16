'use client';

import React, { useState } from 'react';
import { EntityTypeBadge } from '@/components/atoms/entity-type-badge';
import { PriorityBadge } from '@/components/atoms/priority-badge';
import type { EntityType, Priority } from '@/types';

interface EntityInfoProps {
    entityType: EntityType;
    priority: Priority;
    entityId: string | null;
}

export function EntityInfo({
    entityType,
    priority,
    entityId,
}: EntityInfoProps): React.JSX.Element {
    const [copied, setCopied] = useState(false);

    const handleCopyEntityId = async (): Promise<void> => {
        if (entityId) {
            try {
                await navigator.clipboard.writeText(entityId);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy entity ID:', err);
            }
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <EntityTypeBadge entityType={entityType} />
                <PriorityBadge priority={priority} />
            </div>
            {entityId && (
                <div>
                    <p className="text-xs text-muted-foreground mb-1">
                        Entity ID
                    </p>
                    <code
                        onClick={(): void => {
                            void handleCopyEntityId();
                        }}
                        className="text-xs bg-muted px-3 py-2 rounded block break-all cursor-pointer hover:bg-muted/80 transition-colors"
                        title="Click to copy"
                    >
                        {entityId}
                    </code>
                    {copied && (
                        <p className="text-xs text-green-600 mt-1">Copied!</p>
                    )}
                </div>
            )}
        </div>
    );
}
