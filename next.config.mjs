import { withSentryConfig } from '@sentry/nextjs';
import os from 'os';
import path from 'path';

const isCI = !!process.env.CI;
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    productionBrowserSourceMaps: false,
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 2,
    },

    typescript: { ignoreBuildErrors: true },
    eslint: { ignoreDuringBuilds: true },

    compiler: {
        removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
        reactRemoveProperties: isProd,
        styledComponents: true,
    },

    images: {
        formats: ['image/avif', 'image/webp'],
        dangerouslyAllowSVG: false,
        minimumCacheTTL: 60,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.simpleicons.org',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lh4.googleusercontent.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lh5.googleusercontent.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lh6.googleusercontent.com',
                pathname: '/**',
            },
        ],
    },

    experimental: {
        optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
        optimizeServerReact: true,
    },

    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
        resolveAlias: {
            canvas: './empty-module.js',
        },
    },

    webpack: (config, { dev, isServer }) => {
        config.cache = {
            type: 'filesystem',
            version: String(process.env.NODE_ENV),
            buildDependencies: {
                config: [path.resolve(process.cwd(), 'next.config.mjs')],
            },
        };

        config.parallelism = os.cpus().length;

        config.ignoreWarnings = [
            {
                message:
                    /Critical dependency: the request of a dependency is an expression/gi,
            },
        ];

        if (dev) {
            config.plugins = config.plugins.filter(
                p => p.constructor.name !== 'ReactRefreshPlugin',
            );
        }

        if (!dev && !isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        priority: 10,
                        enforce: true,
                    },
                },
            };
        }

        return config;
    },

    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [];
    },
    output: 'standalone',
    poweredByHeader: false,
    compress: true,
};

const required = [
    'NODE_ENV',
];
const missing = required.filter(v => !process.env[v]);
if (missing.length) throw new Error(`Missing env: ${missing.join(', ')}`);

/** @type {import('@sentry/nextjs').SentryBuildOptions} */
const sentryOpts = {
    org: 'elux-ai',
    project: 'elux-web',
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: true,
    tunnelRoute: true,
    disableLogger: true,
    widenClientFileUpload: true,
    automaticVercelMonitors: true,
    release: {
        name: process.env.RELEASE_VERSION,
        create: true,
        finalize: true,
    },
    sourcemaps: {
        assets: [
            '.next/static/chunks/**',
            '.next/server/**',
            '.next/static/css/**',
        ],
        ignore: ['node_modules/**', '.next/cache/**', '**/*.d.ts'],
        deleteAfterUpload: !!isCI,
        filesToDeleteAfterUpload: ['.next/**/*.map'],
    },
    uploadSourceMaps: !!isCI,
    bundleSizeOptimizations: true,
    telemetry: false,
};

export default process.env.NEXT_PUBLIC_SENTRY_DSN
    ? withSentryConfig(nextConfig, sentryOpts)
    : nextConfig;
