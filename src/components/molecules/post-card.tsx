'use client';

import Link from 'next/link';
import React from 'react';
import { ExternalLinkIcon } from '@/components/atoms/external-link-icon';
import { PostAuthorInfo } from '@/components/atoms/post-author-info';
import { RelativeTime } from '@/components/atoms/relative-time';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { PostWithAuthor } from '@/types';

interface PostCardProps {
    postWithAuthor: PostWithAuthor;
}

export function PostCard({ postWithAuthor }: PostCardProps): React.JSX.Element {
    const { post, author } = postWithAuthor;

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                    <PostAuthorInfo author={author} />
                    <RelativeTime
                        date={post.createdAt}
                        className="text-xs text-muted-foreground whitespace-nowrap"
                    />
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm whitespace-pre-wrap">{post.text}</p>
                <Link
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                >
                    View on {post.platform}
                    <ExternalLinkIcon />
                </Link>
            </CardContent>
        </Card>
    );
}
