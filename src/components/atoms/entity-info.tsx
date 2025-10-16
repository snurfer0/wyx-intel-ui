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
        <div className="flex-1">
            {entityId ? (
                <>
                    <code
                        onClick={(): void => {
                            void handleCopyEntityId();
                        }}
                        className="text-xs font-mono text-emerald-400 bg-transparent border-none p-0 block break-all cursor-pointer hover:text-emerald-300 transition-colors"
                        title="Click to copy"
                    >
                        {entityId}
                    </code>
                    {copied && (
                        <p className="text-xs font-mono text-emerald-400 mt-1">
                            ✓ Copied
                        </p>
                    )}
                </>
            ) : (
                <span className="text-xs font-mono text-gray-600">N/A</span>
            )}
        </div>
    );
}
