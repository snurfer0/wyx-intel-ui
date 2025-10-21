import { NextResponse } from 'next/server';
import { generateCsrfToken } from '@/lib/csrf';

export async function GET(): Promise<NextResponse<{ csrfToken: string }>> {
    const csrfToken = generateCsrfToken();

    const response = NextResponse.json({ csrfToken }, { status: 200 });

    // Set CSRF token in httpOnly cookie
    response.cookies.set({
        name: 'csrf-token',
        value: csrfToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hour
        path: '/',
    });

    return response;
}
