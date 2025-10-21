import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse<unknown> {
    const { pathname } = request.nextUrl;

    // Allow public routes
    if (
        pathname === '/' ||
        pathname === '/login' ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api/')
    ) {
        return NextResponse.next();
    }

    // Protect /admin routes - server-side enforcement
    if (pathname.startsWith('/admin')) {
        const authCookie = request.cookies.get('wyx-auth-token');

        if (!authCookie?.value) {
            // Not authenticated, redirect to login
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
