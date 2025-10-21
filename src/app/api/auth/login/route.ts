import { NextRequest, NextResponse } from 'next/server';
import { loginRateLimiter } from '@/lib/rate-limiter';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wyx.tools';

export async function POST(request: NextRequest): Promise<
    | NextResponse<{
          error: string;
      }>
    | NextResponse<{
          success: boolean;
          message: string;
      }>
> {
    try {
        // Get client identifier (IP address)
        const ip =
            request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';

        // Check rate limit
        const rateLimitResult = loginRateLimiter.check(ip);

        if (!rateLimitResult.allowed) {
            const retryAfter = Math.ceil(
                (rateLimitResult.resetTime - Date.now()) / 1000,
            );
            return NextResponse.json(
                {
                    error: `Too many login attempts. Please try again in ${Math.ceil(retryAfter / 60)} minutes.`,
                },
                {
                    status: 429,
                    headers: {
                        'Retry-After': retryAfter.toString(),
                        'X-RateLimit-Limit': '5',
                        'X-RateLimit-Remaining': '0',
                        'X-RateLimit-Reset':
                            rateLimitResult.resetTime.toString(),
                    },
                },
            );
        }

        const body = (await request.json()) as { apiKey: string };
        const { apiKey } = body;

        if (!apiKey || typeof apiKey !== 'string') {
            return NextResponse.json(
                { error: 'API key is required' },
                { status: 400 },
            );
        }

        // Verify the API key with the backend
        const response = await fetch(`${API_URL}/auth`, {
            method: 'GET',
            headers: {
                'x-api-secret': apiKey,
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Invalid API key' },
                { status: 401 },
            );
        }

        const data = (await response.json()) as { status: string };

        if (data.status !== 'ok') {
            return NextResponse.json(
                { error: 'Invalid API key' },
                { status: 401 },
            );
        }

        // API key is valid, set httpOnly cookie
        const res = NextResponse.json(
            { success: true, message: 'Authenticated successfully' },
            { status: 200 },
        );

        // Set httpOnly cookie with the API key
        res.cookies.set({
            name: 'wyx-auth-token',
            value: apiKey,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
        });

        return res;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
