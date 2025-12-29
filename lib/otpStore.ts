
// Simple in-memory OTP store
// In production, use Redis or a database

interface OTPData {
    code: string;
    expiresAt: number;
    attempts: number;
}

const otpStore = new Map<string, OTPData>();

export const OTP_TTL = 5 * 60 * 1000; // 5 minutes
export const MAX_ATTEMPTS = 3;

export function generateOTP(): string {
    // Generate secure 6-digit code
    // Using crypto for better randomness than Math.random()
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const otp = (array[0] % 900000 + 100000).toString();
    return otp;
}

export function saveOTP(email: string, code: string) {
    otpStore.set(email, {
        code,
        expiresAt: Date.now() + OTP_TTL,
        attempts: 0,
    });
}

export function verifyOTP(email: string, code: string): { valid: boolean; reason?: string } {
    const data = otpStore.get(email);

    if (!data) {
        return { valid: false, reason: 'INVALID_OR_EXPIRED' };
    }

    if (Date.now() > data.expiresAt) {
        otpStore.delete(email); // Cleanup
        return { valid: false, reason: 'EXPIRED' };
    }

    if (data.attempts >= MAX_ATTEMPTS) {
        otpStore.delete(email); // Cleanup
        return { valid: false, reason: 'TOO_MANY_ATTEMPTS' };
    }

    if (data.code !== code) {
        data.attempts++;
        otpStore.set(email, data);
        return { valid: false, reason: 'INVALID_CODE' };
    }

    // Success - consume the OTP so it can't be reused
    otpStore.delete(email);
    return { valid: true };
}
