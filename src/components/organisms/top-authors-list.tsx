import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { formatLargeNumber } from '@/utils/number-formatting';

interface TopAuthor {
    id: string;
    username: string;
    platform: string;
    followers: number;
    postsCount: number;
}

interface TopAuthorsListProps {
    authors: TopAuthor[];
    className?: string;
}

export function TopAuthorsList({
    authors,
    className,
}: TopAuthorsListProps): React.JSX.Element {
    return (
        <Card className={`border-emerald-500/20 bg-black ${className || ''}`}>
            <CardHeader>
                <CardTitle className="font-mono text-emerald-400">
                    Top Authors by Posts
                </CardTitle>
                <CardDescription className="font-mono text-gray-500">
                    Most active content creators
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {authors.slice(0, 5).map((author, idx) => (
                        <div
                            key={author.id}
                            className="flex items-center justify-between border-b border-emerald-500/10 pb-3 last:border-0"
                        >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <span className="text-sm font-mono text-emerald-500 w-4">
                                    {idx + 1}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-mono font-medium text-emerald-400 truncate">
                                        @{author.username}
                                    </p>
                                    <p className="text-xs font-mono text-gray-500">
                                        {formatLargeNumber(author.followers)}{' '}
                                        followers
                                    </p>
                                </div>
                            </div>
                            <Badge
                                variant="secondary"
                                className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono"
                            >
                                {author.postsCount} posts
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
