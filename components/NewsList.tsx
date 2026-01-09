import { getNewsPosts } from '@/lib/driveNews';
import { NewsCard } from './NewsCard';
import { getTranslations } from 'next-intl/server';

interface NewsListProps {
    locale: string;
    limit?: number;
}

export async function NewsList({ locale, limit }: NewsListProps) {
    const t = await getTranslations('news');
    const allPosts = await getNewsPosts(locale);

    const posts = limit ? allPosts.slice(0, limit) : allPosts;

    if (posts.length === 0) {
        return (
            <div className="text-center text-neutral-medium py-12">
                <p>{t('no_news_found') || "No news posts found."}</p>
            </div>
        );
    }

    return (
        <>
            {posts.map((post) => (
                <NewsCard key={post.id} post={post} locale={locale} />
            ))}
        </>
    );
}
