import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<
    NextResponse<{
        authenticated: boolean;
    }>
> {
    const authCookie = request.cookies.get('wyx-auth-token');

    if (!authCookie?.value) {
        return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({ authenticated: true }, { status: 200 });
}
