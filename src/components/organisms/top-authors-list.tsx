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
        <Card
            className={`border-emerald-500/20 bg-zinc-950 hover:bg-zinc-900/50 transition-all ${className || ''}`}
        >
            <CardHeader className="border-b border-emerald-500/10">
                <CardTitle className="font-mono text-emerald-400 tracking-wide">
                    Top Authors by Posts
                </CardTitle>
                <CardDescription className="font-mono text-gray-500 text-xs">
                    Most active content creators
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    {authors.slice(0, 5).map((author, idx) => (
                        <div
                            key={author.id}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <span className="text-xs font-mono text-emerald-500/60 w-6 text-center bg-emerald-500/5 px-2 py-1">
                                    {idx + 1}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-mono font-medium text-white truncate">
                                        @{author.username}
                                    </p>
                                    <p className="text-xs font-mono text-gray-500 mt-0.5">
                                        {formatLargeNumber(author.followers)}{' '}
                                        followers
                                    </p>
                                </div>
                            </div>
                            <Badge
                                variant="secondary"
                                className="bg-emerald-500/5 text-emerald-400 border-emerald-500/30 font-mono text-xs"
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
