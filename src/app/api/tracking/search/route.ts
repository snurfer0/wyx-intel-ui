import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wyx.tools';

export async function GET(
    request: NextRequest,
): Promise<NextResponse<{ error: string } | unknown>> {
    try {
        // Get API key from httpOnly cookie
        const authCookie = request.cookies.get('wyx-auth-token');

        if (!authCookie?.value) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            );
        }

        // Get query params from the request
        const searchParams = request.nextUrl.searchParams;
        const queryString = searchParams.toString();

        // Forward request to backend API with API key
        const response = await fetch(
            `${API_URL}/ui/tracking/search?${queryString}`,
            {
                method: 'GET',
                headers: {
                    'x-api-secret': authCookie.value,
                },
            },
        );

        if (!response.ok) {
            const error = await response.text();
            return NextResponse.json(
                { error: error || 'Backend request failed' },
                { status: response.status },
            );
        }

        const data: unknown = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Tracking search proxy error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
