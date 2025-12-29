
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod'; // Assuming zod is installed as per package.json
import { checkRateLimit, loginRateLimit, getRateLimitResponse, RATE_LIMITS } from '@/lib/ratelimit';
import { generateOTP, saveOTP } from '@/lib/otpStore';
import { sendOTP } from '@/lib/email';

const loginSchema = z.object({
    email: z.string().email(),
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

        const email = result.data.email;
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
