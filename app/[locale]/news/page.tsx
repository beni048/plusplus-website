import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Card } from "@/components/ui/card";
import { Calendar, User, Calendar as CalendarIcon } from "lucide-react";
import ScheduleMeetingButton from '@/app/components/ScheduleMeetingButton';
import Script from 'next/script';
import Link from 'next/link';
import { Suspense } from 'react';
import { NewsList } from '@/components/NewsList';
import { NewsLoader } from '@/components/NewsLoader';

export const revalidate = 3600; // Revalidate every hour

export default async function NewsPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations('news');
    const tMain = await getTranslations('mainSections');

    /* SEO: 2-level breadcrumb (Home > News) */
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': locale === 'de' ? 'Startseite' : 'Home',
                'item': `https://plusplus.swiss/${locale}`
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': t('title'),
                'item': `https://plusplus.swiss/${locale}/news`
            }
        ]
    };

    return (
        <main className="min-h-screen bg-neutral-light pt-32">
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema)
                }}
            />

            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16 sm:mb-24">
                        <h1 className="mb-6 sm:mb-12 text-center text-3xl sm:text-5xl lg:text-6xl font-medium text-black px-4">
                            {t('hero.title')}
                        </h1>
                        <p className="text-lg sm:text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4">
                            {t('hero.subtitle')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Articles Section */}
            <section className="bg-neutral-white py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-12">

                        <Suspense fallback={<NewsLoader />}>
                            <NewsList locale={locale} />
                        </Suspense>

                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-neutral-light py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <Card className="p-12 shadow-lg border-primary-teal/20">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black mb-6">
                                {tMain('contact.title')}
                            </h2>
                            <p className="text-lg leading-relaxed text-neutral-dark mb-8 font-secondary">
                                {tMain('contact.paragraph')}
                            </p>
                            <div className="space-y-4">
                                <ScheduleMeetingButton>
                                    <Calendar className="mr-2 h-5 w-5" />
                                    {tMain('contact.button')}
                                </ScheduleMeetingButton>
                                <p className="text-sm text-neutral-dark font-secondary">
                                    {tMain('contact.subtitle')}
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
