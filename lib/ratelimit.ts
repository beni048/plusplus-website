
import { LRUCache } from 'lru-cache'
import { NextRequest, NextResponse } from 'next/server'

// Create separate caches for different endpoints/actions
const loginRateLimit = new LRUCache<string, number>({
    max: 500,
    ttl: 60 * 1000 * 15, // 15 minutes window
})

const verifyRateLimit = new LRUCache<string, number>({
    max: 500,
    ttl: 60 * 1000 * 15, // 15 minutes window
})

interface RateLimitConfig {
    limit: number
    windowMs: number
}

// Helper to check rate limit
export function checkRateLimit(
    req: NextRequest,
    cache: LRUCache<string, number>,
    limit: number
): boolean {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown-ip'
    const tokenCount = cache.get(ip) || 0

    if (tokenCount === 0) {
        cache.set(ip, 1)
    } else {
        cache.set(ip, tokenCount + 1)
    }

    const currentUsage = cache.get(ip) as number

    return currentUsage <= limit
}

export const RATE_LIMITS = {
    login: 5, // 5 attempts per 15 min
    verify: 5, // 5 attempts per 15 min
}

export function getRateLimitResponse() {
    return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
    )
}

export { loginRateLimit, verifyRateLimit }
