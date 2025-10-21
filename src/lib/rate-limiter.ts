interface RateLimitEntry {
    count: number;
    resetTime: number;
}

class RateLimiter {
    private requests: Map<string, RateLimitEntry> = new Map();
    private readonly maxRequests: number;
    private readonly windowMs: number;

    constructor(maxRequests: number = 5, windowMs: number = 15 * 60 * 1000) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;

        // Clean up old entries every 5 minutes
        setInterval(
            () => {
                const now = Date.now();
                for (const [key, entry] of this.requests.entries()) {
                    if (now > entry.resetTime) {
                        this.requests.delete(key);
                    }
                }
            },
            5 * 60 * 1000,
        );
    }

    check(identifier: string): {
        allowed: boolean;
        remaining: number;
        resetTime: number;
    } {
        const now = Date.now();
        const entry = this.requests.get(identifier);

        if (!entry || now > entry.resetTime) {
            // New window or expired
            const resetTime = now + this.windowMs;
            this.requests.set(identifier, { count: 1, resetTime });
            return {
                allowed: true,
                remaining: this.maxRequests - 1,
                resetTime,
            };
        }

        if (entry.count >= this.maxRequests) {
            // Rate limit exceeded
            return {
                allowed: false,
                remaining: 0,
                resetTime: entry.resetTime,
            };
        }

        // Increment counter
        entry.count++;
        this.requests.set(identifier, entry);

        return {
            allowed: true,
            remaining: this.maxRequests - entry.count,
            resetTime: entry.resetTime,
        };
    }
}

// 5 requests per 15 minutes for login
export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000);
