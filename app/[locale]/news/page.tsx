'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card } from "@/components/ui/card";
import { Calendar, ArrowRight, User, Calendar as CalendarIcon } from "lucide-react";
import ScheduleMeetingButton from '@/app/components/ScheduleMeetingButton';
import Script from 'next/script';
import Image from 'next/image';

export default function NewsPage() {
    const t = useTranslations();
    const locale = useLocale();

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
                'name': t('news.title'),
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
                            {t('news.hero.title')}
                        </h1>
                        <p className="text-lg sm:text-xl font-secondary text-neutral-dark max-w-3xl mx-auto leading-relaxed px-4">
                            {t('news.hero.subtitle')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Articles Section */}
            <section className="bg-neutral-white py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-12">

                        {/* Article 1: Magdalena */}
                        <article className="border-b border-gray-100 pb-12 last:border-0">
                            <div className="flex items-center space-x-4 mb-4 text-sm text-neutral-medium font-secondary">
                                <span className="flex items-center text-accent-red">
                                    <CalendarIcon className="h-4 w-4 mr-1" />
                                    {t('news.articles.magdalena.date')}
                                </span>
                                <span>|</span>
                                <span className="flex items-center">
                                    <User className="h-4 w-4 mr-1" />
                                    Plusplus AG
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-primary font-bold mb-4 hover:text-accent-red transition-colors cursor-pointer">
                                {t('news.articles.magdalena.title')}
                            </h2>
                            <div className="prose max-w-none text-neutral-dark font-secondary leading-relaxed">
                                <p className="text-lg mb-4 font-medium">{t('news.articles.magdalena.excerpt')}</p>
                                <p>{t('news.articles.magdalena.text')}</p>
                            </div>
                        </article>

                        {/* Article 2: Intro */}
                        <article className="border-b border-gray-100 pb-12 last:border-0">
                            <div className="flex items-center space-x-4 mb-4 text-sm text-neutral-medium font-secondary">
                                <span className="flex items-center text-accent-red">
                                    <CalendarIcon className="h-4 w-4 mr-1" />
                                    {t('news.articles.intro.date')}
                                </span>
                                <span>|</span>
                                <span className="flex items-center">
                                    <User className="h-4 w-4 mr-1" />
                                    Plusplus AG
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-primary font-bold mb-4 hover:text-accent-red transition-colors cursor-pointer">
                                {t('news.articles.intro.title')}
                            </h2>
                            <div className="prose max-w-none text-neutral-dark font-secondary leading-relaxed">
                                <p className="text-lg mb-4 font-medium">{t('news.articles.intro.excerpt')}</p>
                                <p>{t('news.articles.intro.text')}</p>
                            </div>
                        </article>

                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-neutral-light py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <Card className="p-12 shadow-lg border-primary-teal/20">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-primary font-medium text-black mb-6">
                                {t('mainSections.contact.title')}
                            </h2>
                            <p className="text-lg leading-relaxed text-neutral-dark mb-8 font-secondary">
                                {t('mainSections.contact.paragraph')}
                            </p>
                            <div className="space-y-4">
                                <ScheduleMeetingButton>
                                    <Calendar className="mr-2 h-5 w-5" />
                                    {t('mainSections.contact.button')}
                                </ScheduleMeetingButton>
                                <p className="text-sm text-neutral-dark font-secondary">
                                    {t('mainSections.contact.subtitle')}
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
