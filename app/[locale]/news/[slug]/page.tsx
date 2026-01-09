
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

export default async function NewsPostPage(props: { params: Promise<{ locale: string, slug: string }> }) {
    const params = await props.params;

    const {
        locale,
        slug
    } = params;

    const post = await getNewsPostContent(slug, locale);

    if (!post) {
        notFound();
    }

    const t = await getTranslations('news');

    /* SEO: Breadcrumb */
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
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': post.title,
                'item': `https://plusplus.swiss/${locale}/news/${slug}`
            }
        ]
    };

    return (
        <main className="min-h-screen bg-neutral-white pt-32 pb-24">
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema)
                }}
            />

            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <div className="mb-8">
                        <Link href={`/${locale}/news`} className="inline-flex items-center text-neutral-medium hover:text-accent-red transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('back_to_news') || "Back to News"}
                        </Link>
                    </div>

                    {/* Header */}
                    <header className="mb-12">
                        <div className="flex items-center space-x-4 mb-6 text-sm text-neutral-medium font-secondary">
                            <span className="flex items-center text-accent-red">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                {new Date(post.date).toLocaleDateString(locale)}
                            </span>
                            <span>|</span>
                            <span className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {post.author}
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-primary font-bold text-black mb-6">
                            {post.title}
                        </h1>
                        <p className="text-xl sm:text-2xl text-neutral-dark font-secondary leading-relaxed mb-8">
                            {post.summary}
                        </p>

                        {post.image && (
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-100 mt-8 mb-12">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </header>

                    {/* Content */}
                    <article className="prose prose-lg max-w-none prose-headings:font-primary prose-headings:font-bold prose-headings:text-black prose-p:font-secondary prose-p:text-neutral-dark prose-p:leading-relaxed prose-a:text-primary-teal prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </article>
                </div>
            </div>
        </main>
    );
}
