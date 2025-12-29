
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, verifyRateLimit, getRateLimitResponse, RATE_LIMITS } from '@/lib/ratelimit';
import { verifyOTP } from '@/lib/otpStore';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/auth';

const verifySchema = z.object({
    email: z.string().email(),
    code: z.string().length(6),
});

export async function POST(req: NextRequest) {
    // 1. Rate Limiting
    if (!checkRateLimit(req, verifyRateLimit, RATE_LIMITS.verify)) {
        return getRateLimitResponse();
    }

    try {
        const body = await req.json();
        const result = verifySchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const { email, code } = result.data;

        // 2. Verify OTP
        const verification = verifyOTP(email, code);

        if (!verification.valid) {
            return NextResponse.json({ error: verification.reason || 'Invalid code' }, { status: 401 });
        }

        // 3. Create Session
        if (!process.env.SECRET_COOKIE_PASSWORD) {
            // Fallback for dev if not set, though lib/auth might throw.
            // Ideally should be set in .env.local
            console.warn("SECRET_COOKIE_PASSWORD not set!");
        }

        const response = new NextResponse(JSON.stringify({ success: true }));
        const session = await getIronSession<SessionData>(req, response, sessionOptions);

        session.user = {
            email: email,
            isLoggedIn: true,
        };

        await session.save();

        return response;

    } catch (error) {
        console.error('Verify error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
