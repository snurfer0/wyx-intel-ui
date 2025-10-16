'use client';

import React from 'react';

interface EmptyStateProps {
    searchQuery?: string;
}

export function EmptyState({
    searchQuery,
}: EmptyStateProps): React.JSX.Element {
    return (
        <div className="text-center py-12">
            <p className="font-mono text-gray-400">
                {searchQuery
                    ? '> No results found. Try a different search query.'
                    : '> No tracking items found'}
            </p>
        </div>
    );
}
