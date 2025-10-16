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
        <Card className={className}>
            <CardHeader>
                <CardTitle>Top Authors by Posts</CardTitle>
                <CardDescription>Most active content creators</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {authors.slice(0, 5).map((author, idx) => (
                        <div
                            key={author.id}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <span className="text-sm font-mono text-muted-foreground w-4">
                                    {idx + 1}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium truncate">
                                        @{author.username}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatLargeNumber(author.followers)}{' '}
                                        followers
                                    </p>
                                </div>
                            </div>
                            <Badge variant="secondary">
                                {author.postsCount} posts
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
