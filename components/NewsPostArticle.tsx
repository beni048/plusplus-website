import { notFound } from 'next/navigation';
import { getNewsPostContent } from '@/lib/driveNews';
import { Calendar as CalendarIcon, User } from "lucide-react";

interface NewsPostArticleProps {
    slug: string;
    locale: string;
}

export async function NewsPostArticle({ slug, locale }: NewsPostArticleProps) {
    const post = await getNewsPostContent(slug, locale);

    if (!post) {
        notFound();
    }

    return (
        <>
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
        </>
    );
}
