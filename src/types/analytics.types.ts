import { z } from 'zod';

const timeBasedStatsSchema = z.object({
    last1h: z.number(),
    last6h: z.number(),
    last12h: z.number(),
    last24h: z.number(),
    last7d: z.number(),
    last30d: z.number(),
});

const topAuthorSchema = z.object({
    id: z.string(),
    username: z.string(),
    platform: z.string(),
    followers: z.number(),
    postsCount: z.number(),
});

const hourlyActivitySchema = z.object({
    hour: z.string(),
    count: z.number(),
});

const dailyActivitySchema = z.object({
    date: z.string(),
    count: z.number(),
});

const entityTypeCountSchema = z.object({
    entityType: z.string(),
    count: z.number(),
});

const priorityCountSchema = z.object({
    priority: z.number(),
    count: z.number(),
});

export const analyticsStatsSchema = z.object({
    overview: z.object({
        totalAuthors: z.number(),
        totalPosts: z.number(),
        totalTokens: z.number(),
        totalTracking: z.number(),
        postsLast24h: z.number(),
        trackingItemsLast24h: z.number(),
    }),
    authors: z.object({
        total: z.number(),
        telegram: z.number(),
        twitter: z.number(),
        timeBasedStats: timeBasedStatsSchema,
        topByPosts: z.array(topAuthorSchema),
        topByFollowers: z.array(topAuthorSchema),
    }),
    posts: z.object({
        total: z.number(),
        telegram: z.number(),
        twitter: z.number(),
        timeBasedStats: timeBasedStatsSchema,
        avgPerDay: z.number(),
        withEmbeddings: z.number(),
    }),
    tokens: z.object({
        total: z.number(),
        byChain: z.record(z.number()),
        migrated: z.number(),
        unmigrated: z.number(),
        timeBasedStats: timeBasedStatsSchema,
        withProfiles: z.number(),
        withScrapedData: z.number(),
    }),
    tokenProfiles: z.object({
        total: z.number(),
        withIcon: z.number(),
        withDescription: z.number(),
        withWebsite: z.number(),
        withTwitter: z.number(),
        timeBasedStats: timeBasedStatsSchema,
        completionRate: z.number(),
    }),
    tracking: z.object({
        total: z.number(),
        byEntityType: z.array(entityTypeCountSchema),
        byPriority: z.array(priorityCountSchema),
        avgPriority: z.number(),
        timeBasedStats: timeBasedStatsSchema,
        withPosts: z.number(),
        withTokens: z.number(),
    }),
    activity: z.object({
        postsPerHour: z.array(hourlyActivitySchema),
        trackingPerDay: z.array(dailyActivitySchema),
        tokensPerDay: z.array(dailyActivitySchema),
    }),
    system: z.object({
        totalEmbeddings: z.number(),
        databaseSize: z.string(),
        oldestPost: z.string(),
        newestPost: z.string(),
        dataRetention: z.object({
            postsOlderThan30d: z.number(),
            postsOlderThan90d: z.number(),
        }),
    }),
});

export type AnalyticsStats = z.infer<typeof analyticsStatsSchema>;

const timeseriesDataPointSchema = z.object({
    timestamp: z.string(),
    count: z.number(),
});

export const timeseriesEntitySchema = z.enum(['authors', 'posts', 'tokens']);
export const timeseriesGranularitySchema = z.enum([
    'hourly',
    'daily',
    'monthly',
]);

export const timeseriesResponseSchema = z.object({
    entityType: timeseriesEntitySchema,
    granularity: timeseriesGranularitySchema,
    data: z.array(timeseriesDataPointSchema),
    total: z.number(),
    startDate: z.string(),
    endDate: z.string(),
});

export type TimeseriesEntity = z.infer<typeof timeseriesEntitySchema>;
export type TimeseriesGranularity = z.infer<typeof timeseriesGranularitySchema>;
export type TimeseriesDataPoint = z.infer<typeof timeseriesDataPointSchema>;
export type TimeseriesResponse = z.infer<typeof timeseriesResponseSchema>;
