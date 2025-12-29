import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY || 'placeholder',
    apiSecret: process.env.MAILJET_API_SECRET || 'placeholder'
});

export async function sendOTP(email: string, otp: string) {
    if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_API_SECRET) {
        console.warn('Mailjet API keys not set. Logging OTP instead.');
        console.log(`[DEV OPT] OTP for ${email}: ${otp}`);
        return;
    }

    try {
        const request = mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: process.env.MAILJET_SENDER_EMAIL || 'no-reply@plusplus.swiss',
                        Name: process.env.MAILJET_SENDER_NAME || 'Plusplus Security',
                    },
                    To: [
                        {
                            Email: email,
                        },
                    ],
                    Subject: 'Your Plusplus Login Code',
                    TextPart: `Your login code is: ${otp}. It expires in 5 minutes.`,
                    HTMLPart: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2>Login Verification</h2>
              <p>Your login code is:</p>
              <h1 style="font-size: 32px; letter-spacing: 5px; color: #E60000;">${otp}</h1>
              <p>This code expires in 5 minutes.</p>
              <p>If you didn't request this code, please ignore this email.</p>
            </div>
          `,
                },
            ],
        });

        await request;
        console.log(`OTP email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email via Mailjet:', error);
        // In dev, we might still want to see the OTP if email fails
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[FALLBACK] OTP for ${email}: ${otp}`);
        }
        throw error;
    }
}
