import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyCsrfToken } from '@/lib/csrf';

export function middleware(request: NextRequest): NextResponse<unknown> {
    const { pathname } = request.nextUrl;

    // CSRF Protection for state-changing API routes
    if (
        pathname.startsWith('/api/') &&
        request.method !== 'GET' &&
        request.method !== 'HEAD' &&
        pathname !== '/api/csrf' // Don't check CSRF for the CSRF token endpoint itself
    ) {
        const csrfTokenFromHeader = request.headers.get('x-csrf-token');
        const csrfCookie = request.cookies.get('csrf-token');

        if (!verifyCsrfToken(csrfTokenFromHeader, csrfCookie?.value)) {
            return NextResponse.json(
                { error: 'Invalid CSRF token' },
                { status: 403 },
            );
        }
    }

    // Allow public routes
    if (
        pathname === '/' ||
        pathname === '/login' ||
        pathname.startsWith('/_next')
    ) {
        return NextResponse.next();
    }

    // Protect /admin routes - server-side enforcement
    // Use exact matching: /admin or /admin/anything but not /administrator
    if (pathname === '/admin' || pathname.startsWith('/admin/')) {
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
