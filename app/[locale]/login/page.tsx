
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function LoginPage() {
    const t = useTranslations('Login'); // We need to add translations later
    const router = useRouter();

    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to send OTP');
            }

            toast.success('Code sent! Check your email.');
            setStep('otp');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: otp }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Invalid code');
            }

            toast.success('Login successful!');
            router.push('/dashboard');
            router.refresh(); // Update auth state in components
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-muted px-4 pt-16">
            <Card className="w-full max-w-md bg-white shadow-lg">
                <CardHeader>
                    <CardTitle>{t('title')}</CardTitle>
                    <CardDescription>
                        {step === 'email'
                            ? t('emailStepDescription')
                            : t('otpStepDescription', { email })}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 'email' ? (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">{t('emailLabel')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="bg-white"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-accent-red hover:bg-accent-red/90 text-white" disabled={isLoading}>
                                {isLoading ? t('sendingButton') : t('sendCodeButton')}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp">{t('otpLabel')}</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="123456"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    autoFocus
                                    className="bg-white"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-accent-red hover:bg-accent-red/90 text-white" disabled={isLoading}>
                                {isLoading ? t('verifyingButton') : t('verifyButton')}
                            </Button>
                            <div className="text-center text-sm">
                                <button
                                    type="button"
                                    onClick={() => setStep('email')}
                                    className="text-muted-foreground hover:text-primary underline"
                                >
                                    {t('changeEmail')}
                                </button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
