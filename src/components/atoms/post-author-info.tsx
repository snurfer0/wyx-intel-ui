'use client';

import React from 'react';
import type { PostAuthor } from '@/types';
import { formatLargeNumber } from '@/utils/number-formatting';

interface PostAuthorInfoProps {
    author: PostAuthor;
}

export function PostAuthorInfo({
    author,
}: PostAuthorInfoProps): React.JSX.Element {
    return (
        <div className="flex items-center gap-3">
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-mono font-medium text-emerald-400 truncate">
                    @{author.username}
                </span>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                    <span>{author.platform}</span>
                    <span>•</span>
                    <span>{formatLargeNumber(author.followers)} followers</span>
                </div>
            </div>
        </div>
    );
}
