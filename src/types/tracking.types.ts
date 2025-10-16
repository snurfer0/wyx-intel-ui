import { z } from 'zod';

export type EntityType = 'token' | 'author' | 'narrative' | 'post';
export type Priority = number;
export type Platform = 'twitter';

export const reasoningItemSchema = z.object({
    text: z.string(),
    timestamp: z.string(),
});

export const trackingItemSchema = z.object({
    id: z.string(),
    title: z.string(),
    entityId: z.string().nullable(),
    entityType: z.enum(['token', 'author', 'narrative', 'post']),
    reasoning: z.array(reasoningItemSchema),
    priority: z.number().int().min(1).max(10),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const trackingSearchItemSchema = trackingItemSchema.extend({
    similarity: z.number(),
    postsCount: z.number(),
    tokensCount: z.number(),
});

export const postAuthorSchema = z.object({
    id: z.string(),
    platform: z.enum(['twitter']),
    username: z.string(),
    followers: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const postSchema = z.object({
    id: z.string(),
    platform: z.enum(['twitter']),
    text: z.string(),
    authorId: z.string(),
    url: z.string(),
    createdAt: z.string(),
    insertedAt: z.string(),
});

export const postWithAuthorSchema = z.object({
    post: postSchema,
    author: postAuthorSchema,
});

export const tokenSchema = z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
    chain: z.string(),
    metadataUri: z.string().nullable(),
    metadata: z.unknown().nullable(),
    migratedAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const trackingDetailedSchema = z.object({
    tracking: trackingItemSchema,
    posts: z.array(postWithAuthorSchema),
    tokens: z.array(tokenSchema),
});

export type ReasoningItem = z.infer<typeof reasoningItemSchema>;
export type TrackingItem = z.infer<typeof trackingItemSchema>;
export type TrackingSearchItem = z.infer<typeof trackingSearchItemSchema>;
export type PostAuthor = z.infer<typeof postAuthorSchema>;
export type Post = z.infer<typeof postSchema>;
export type PostWithAuthor = z.infer<typeof postWithAuthorSchema>;
export type Token = z.infer<typeof tokenSchema>;
export type TrackingDetailed = z.infer<typeof trackingDetailedSchema>;

export interface PaginatedResponse<T> {
    data: T[];
    cursor: number;
    nextCursor: number;
    totalCount: number;
}

export interface TrackingSearchParams {
    query: string;
    cursor?: number;
    limit?: number;
    threshold?: number;
}
