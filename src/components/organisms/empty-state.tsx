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
            <p className="text-4xl text-gray-400">¯\_(ツ)_/¯</p>
            {searchQuery && (
                <p className="font-mono text-sm text-gray-500 mt-4">
                    No results found for your search
                </p>
            )}
        </div>
    );
}
