import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.plusplus.swiss';
    const locales = ['en', 'de', 'fr'];

    // Define all static routes
    const routes = [
        '',
        '/about-us',
        '/corporate-treasury',
        '/contact',
        '/contract-query',

        '/privacy-policy',
        '/terms-and-conditions',
        '/imprint',
        '/help',
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    routes.forEach((route) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
