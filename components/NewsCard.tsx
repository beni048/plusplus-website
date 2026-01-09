import Link from 'next/link';
import { Calendar, User, Calendar as CalendarIcon } from "lucide-react";
import { NewsPost } from '@/lib/driveNews';

interface NewsCardProps {
    post: NewsPost;
    locale: string;
}

export function NewsCard({ post, locale }: NewsCardProps) {
    return (
        <article className="border-b border-gray-100 pb-12 last:border-0 group">
            <Link href={`/${locale}/news/${post.slug}`} className="flex flex-col md:flex-row gap-10 items-start group">

                {/* Image Section (Left) - Substantial size */}
                {post.image && (
                    <div className="relative w-full md:w-72 md:h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-md">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}
                {!post.image && (
                    <div className="hidden md:block w-72 h-56 flex-shrink-0 bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-400">
                    </div>
                )}

                {/* Content Section (Right) */}
                <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-center space-x-3 mb-4 text-sm text-neutral-medium font-secondary">
                        <span className="flex items-center text-accent-red font-bold tracking-wide">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {new Date(post.date).toLocaleDateString(locale)}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="flex items-center font-medium">
                            <User className="h-4 w-4 mr-2" />
                            {post.author}
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-primary font-bold mb-4 group-hover:text-accent-red transition-colors leading-tight">
                        {post.title}
                    </h2>

                    <p className="text-xl text-neutral-dark font-secondary leading-relaxed mb-6 line-clamp-3">
                        {post.summary}
                    </p>

                    <span className="text-base text-accent-red hover:underline font-bold inline-flex items-center tracking-wide">
                        Read more
                    </span>
                </div>
            </Link>
        </article>
    );
}
