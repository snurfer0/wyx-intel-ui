import { randomBytes } from 'crypto';

/**
 * Generate a random CSRF token
 */
export function generateCsrfToken(): string {
    return randomBytes(32).toString('hex');
}

/**
 * Verify CSRF token from request matches the cookie
 */
export function verifyCsrfToken(
    tokenFromRequest: string | null | undefined,
    tokenFromCookie: string | null | undefined,
): boolean {
    if (!tokenFromRequest || !tokenFromCookie) {
        return false;
    }

    // Constant-time comparison to prevent timing attacks
    if (tokenFromRequest.length !== tokenFromCookie.length) {
        return false;
    }

    let result = 0;
    for (let i = 0; i < tokenFromRequest.length; i++) {
        result |=
            tokenFromRequest.charCodeAt(i) ^ tokenFromCookie.charCodeAt(i);
    }

    return result === 0;
}
