
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod'; // Assuming zod is installed as per package.json
import { checkRateLimit, loginRateLimit, getRateLimitResponse, RATE_LIMITS } from '@/lib/ratelimit';
import { generateOTP, saveOTP } from '@/lib/otpStore';
import { sendOTP } from '@/lib/email';

const loginSchema = z.object({
    email: z.string().email(),
    token: z.string().optional(), // Make optional temporarily to avoid breaking existing tests if any, but logic will enforce it
});

export async function POST(req: NextRequest) {
    // 1. Rate Limiting
    if (!checkRateLimit(req, loginRateLimit, RATE_LIMITS.login)) {
        return getRateLimitResponse();
    }

    try {
        const body = await req.json();
        const result = loginSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        const { email, token } = result.data;

        // Verify Turnstile Token
        if (!token) {
            return NextResponse.json({ error: 'CAPTCHA missing' }, { status: 400 });
        }

        const secretKey = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';
        const formData = new FormData();
        formData.append('secret', secretKey);
        formData.append('response', token);
        const ip = (req as any).ip || req.headers.get('x-forwarded-for') || '127.0.0.1';
        if (ip) formData.append('remoteip', ip);

        const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body: formData,
        });

        const turnstileData = await turnstileRes.json();
        if (!turnstileData.success) {
            console.error('Turnstile verification failed:', turnstileData);
            return NextResponse.json({ error: 'Invalid CAPTCHA' }, { status: 400 });
        }

        const otp = generateOTP();

        // 2. Store OTP
        saveOTP(email, otp);

        // 3. Send Email
        await sendOTP(email, otp);

        return NextResponse.json({ success: true, message: 'OTP sent' });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
