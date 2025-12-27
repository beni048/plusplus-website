'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
    const t = useTranslations('notFound');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-muted px-4 text-center pt-16">
            <h1 className="text-9xl font-bold font-primary mb-4 text-gray-900">404</h1>
            <h2 className="text-2xl font-medium font-primary mb-6 text-gray-800">{t('title')}</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {t('description')}
            </p>
            <Button asChild size="lg" className="bg-accent-red hover:bg-accent-red/90 text-white">
                <Link href="/">
                    {t('button')}
                </Link>
            </Button>
        </div>
    );
}
