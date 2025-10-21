import { NextResponse } from 'next/server';

export async function POST(): Promise<
    NextResponse<{
        success: boolean;
        message: string;
    }>
> {
    const res = NextResponse.json(
        { success: true, message: 'Logged out successfully' },
        { status: 200 },
    );

    // Clear the httpOnly cookie
    res.cookies.set({
        name: 'wyx-auth-token',
        value: '',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0, // Expire immediately
        path: '/',
    });

    return res;
}
