
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getNewsPostContent, getNewsPosts } from '@/lib/driveNews';
import { Calendar, User, ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import Script from 'next/script';
import Link from 'next/link';

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(props: { params: Promise<{ locale: string, slug: string }> }) {
    const params = await props.params;

    const {
        slug,
        locale
    } = params;

    const posts = await getNewsPosts(locale);
    const post = posts.find(p => p.slug === slug);

    if (!post) {
        return {
            title: 'News Post Not Found'
        };
    }

    return {
        title: `${post.title} - Plusplus AG`,
        description: post.summary
    };
}

export async function generateStaticParams({ params }: { params: { locale: string } }) {
    const { locale } = params;
    const posts = await getNewsPosts(locale);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

import { Suspense } from 'react';
import { NewsLoader } from '@/components/NewsLoader';
import { NewsPostArticle } from '@/components/NewsPostArticle';

// ... (keep exports)

export default async function NewsPostPage(props: { params: Promise<{ locale: string, slug: string }> }) {
    const params = await props.params;

    const {
        locale,
        slug
    } = params;

    const t = await getTranslations({ locale, namespace: 'news' });

    // Note: Breadcrumb schema calculation now requires fetching post again or moving it to client/child
    // Since metadata is separate, we can just do a basic Breadcrumb here or move it slightly
    // For now, allow Breadcrumb to wait or be static
    // Actually, to make the *Page* instant, we can't await post here.
    // So breadcrumb name needs to come from child or be generic for now.
    // Let's use 'Article' for the breadcrumb name if we don't await post, or await it here?
    // IF WE AWAIT HERE, WE BLOCK.
    // To unblock, we must NOT await data here.

    // Compromise: We fetch post here for Breadcrumb/Structure BUT the rendering is deferred?
    // No, if we await here, we block the whole page including the loader.
    // So we must REMOVE await getNewsPostContent from here.

    /* Breadcrumb Schema (Simplified or moved to child? Schema usually in head) */
    // We can leave Schema generation as server-side blocking or move it. 
    // Metadata API handles head tags. 'Script' is in body.

    return (
        <main className="min-h-screen bg-neutral-white pt-32 pb-24">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Back Link - Renders Instantly */}
                    <Link href={`/${locale}/news`} className="inline-flex items-center text-accent-red hover:underline mb-8 font-medium transition-colors group">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        {t('back_to_news')}
                    </Link>

                    {/* Suspended Content - Shows custom loader with correct translation */}
                    <Suspense fallback={<NewsLoader text={t('loading_article')} />}>
                        <NewsPostArticle slug={slug} locale={locale} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
