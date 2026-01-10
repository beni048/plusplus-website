
import { google } from 'googleapis';
import sanitizeHtml from 'sanitize-html';
import he from 'he';
import fs from 'fs';
import path from 'path';

const NEWS_FOLDER_ID = process.env.GOOGLE_DRIVE_NEWS_FOLDER_ID;

// Initialize Google Drive API
const getDriveParams = () => {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    return google.drive({ version: 'v3', auth });
};

export interface NewsPost {
    id: string;
    title: string;
    subtitle: string;
    slug: string;
    summary: string;
    date: string;
    author: string;
    category: string;
    image?: string; // URL or path to cover image
    content?: string;
}

export interface NewsPostContent extends NewsPost {
    content: string;
}

// Helper to remove HTML tags for clean text extraction
function stripHtml(html: string): string {
    return html.replace(/<[^>]*>?/gm, '').trim();
}

// Helper to slugify text
function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-');     // Replace multiple - with single -
}

// Helper to clean text
function cleanText(text: string): string {
    if (!text) return '';
    return he.decode(text).trim();
}

// Helper to parse the raw Google Doc HTML
function parseNewsContent(html: string): { metadata: Partial<NewsPost>, bodyHtml: string } {
    const metadata: any = {};
    const bodyParts: string[] = [];

    // Split by paragraph END tags to process line by line roughly
    // Regex matches <p ...> ... </p>
    const paragraphRegex = /<p[^>]*>(.*?)<\/p>/gi;
    const matches = html.match(paragraphRegex);

    if (!matches) return { metadata: {}, bodyHtml: '' };

    // Localization Mapping
    // Maps various localized strings to our internal metadata keys
    const paramMap: Record<string, string> = {
        'author': 'author', 'auteur': 'author', 'autor': 'author',
        'title': 'title', 'titre': 'title', 'titel': 'title',
        'subtitle': 'subtitle', 'sous-titre': 'subtitle', 'untertitel': 'subtitle',
        'date': 'date', 'datum': 'date',
        'category': 'category', 'catégorie': 'category', 'kategorie': 'category',
        'image': 'image', 'bild': 'image',
        'slug': 'slug'
    };

    for (const fullP of matches) {
        // fullP is "<p style='...'><span...>Text</span>...</p>"

        // 1. Get plain text for key detection (strip HTML + decode)
        let textContent = stripHtml(fullP).replace(/&nbsp;/g, ' ').trim();
        textContent = cleanText(textContent);

        // Check for Metadata Keys
        let isMeta = false;

        // Iterate over known localized keys to find a match at the start
        // We match "Key:" pattern
        const firstColonIndex = textContent.indexOf(':');
        if (firstColonIndex > -1) {
            const potentialKey = textContent.substring(0, firstColonIndex).trim().toLowerCase();
            const mappedKey = paramMap[potentialKey];

            if (mappedKey) {
                const value = textContent.substring(firstColonIndex + 1).trim();
                metadata[mappedKey] = value;
                isMeta = true;
            }
        }

        if (isMeta) continue;

        // Check for Content Keys (Heading 2, Quote...)
        // We can also support localized versions if needed, but usually these are structural
        // For now sticking to English markers or strict structure might be needed?
        // Let's support localized markers too for consistency
        const lowerText = textContent.toLowerCase();

        if (lowerText.startsWith('heading 2:') || lowerText.startsWith('titre 2:') || lowerText.startsWith('überschrift 2:')) {
            const separator = textContent.indexOf(':');
            const value = textContent.substring(separator + 1).trim();
            // Standard Editorial Subhead (text-2xl/3xl)
            bodyParts.push(`<h2 class="text-2xl sm:text-3xl font-bold mt-12 mb-6 text-black font-primary leading-tight">${value}</h2>`);

        } else if (lowerText.startsWith('quote:') || lowerText.startsWith('citation:') || lowerText.startsWith('zitat:')) {
            const separator = textContent.indexOf(':');
            const value = textContent.substring(separator + 1).trim();
            // Same size as body (text-base), indented (pl-8), italic
            bodyParts.push(`<blockquote class="border-l-4 border-accent-red pl-8 py-2 my-8 text-base font-medium italic text-neutral-dark font-secondary leading-relaxed">${value}</blockquote>`);

        } else if (lowerText.startsWith('body paragraph:') || lowerText.startsWith('paragraphe:') || lowerText.startsWith('absatz:')) {
            const separator = textContent.indexOf(':');
            const value = textContent.substring(separator + 1).trim();
            // Body paragraphs use secondary font (Mulish) per request
            bodyParts.push(`<p class="mb-4 leading-relaxed text-neutral-dark font-secondary">${value}</p>`);

        } else {
            // Unknown paragraph. If not empty, add it.
            if (textContent.length > 0) {
                // Clean up the original HTML to remove Google's messy styles but keep basic formatting (bold, italics)
                const cleanP = sanitizeHtml(fullP, {
                    allowedTags: ['b', 'i', 'em', 'strong', 'u', 'a'], // ONLY inline formatting allowed
                    allowedAttributes: { 'a': ['href', 'target'] } // NO style attributes allowed!
                });

                // If there's anything left after cleaning
                if (cleanP.trim().length > 0) {
                    // Wrap in our standard paragraph with secondary font
                    bodyParts.push(`<p class="mb-4 leading-relaxed text-neutral-dark font-secondary">${cleanP}</p>`);
                }
            }
        }
    }

    return {
        metadata: metadata,
        bodyHtml: bodyParts.join('\n')
    };
}

export async function getNewsPosts(locale: string = 'en'): Promise<NewsPost[]> {
    if (!NEWS_FOLDER_ID) {
        console.warn('GOOGLE_DRIVE_NEWS_FOLDER_ID is not set');
        return [];
    }

    try {
        const drive = getDriveParams();
        const res = await drive.files.list({
            q: `'${NEWS_FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.document' and trashed = false`,
            fields: 'files(id, name, createdTime)',
            orderBy: 'createdTime desc',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });

        const files = res.data.files || [];
        const currentLocale = locale.toLowerCase();
        const filenameRegex = /^([^_]+)_([a-z]{2})_(.+)$/i;

        // Filter files first (lighter operation)
        const relevantFiles = files.filter(file => {
            const match = (file.name || '').match(filenameRegex);
            return match && match[2].toLowerCase() === currentLocale;
        });

        // Now fetch content for ALL relevant files to parse metadata
        const postsWithInternalId = await Promise.all(relevantFiles.map(async (file) => {
            const match = (file.name || '').match(filenameRegex)!;
            const [, id] = match;

            try {
                // Export content
                const exportRes = await drive.files.export({
                    fileId: file.id!,
                    mimeType: 'text/html',
                });

                const { metadata, bodyHtml } = parseNewsContent(exportRes.data as string);

                // Helper to parse DD.MM.YYYY
                let date = file.createdTime!;
                if (metadata.date) {
                    const parts = metadata.date.split('.');
                    if (parts.length === 3) {
                        // DD.MM.YYYY -> YYYY-MM-DD
                        const day = parts[0].trim();
                        const month = parts[1].trim();
                        const year = parts[2].trim();
                        date = new Date(`${year}-${month}-${day}`).toISOString();
                    }
                }

                // Determine image
                let image = metadata.image;
                if (!image) {
                    // Normalize ID: If it starts with NEW, use it as is. If not, prepend NEW.
                    const cleanId = id.replace(/^NEW/i, '');
                    const candidatePath = `/images/news/NEW${cleanId}.png`;
                    const absolutePath = path.join(process.cwd(), 'public', candidatePath);

                    if (fs.existsSync(absolutePath)) {
                        image = candidatePath;
                    } else {
                        image = '/images/news/news-placeholder.png';
                    }
                }

                // Determine Title
                // Fallback to filename part if no title in metadata
                const title = cleanText(metadata.title || match[3].replace(/-/g, ' '));

                // Determine Slug
                // 1. Metadata Slug
                // 2. Fallback to ID (if Slug is missing)
                let slug = id;
                if (metadata.slug) {
                    slug = cleanText(metadata.slug);
                }

                return {
                    id: file.id!,
                    slug: slug,
                    internalId: id, // Keep track of filename ID for collision resolution
                    title: title,
                    subtitle: cleanText(metadata.subtitle || ''),
                    summary: cleanText(metadata.subtitle || ''),
                    date: date,
                    author: cleanText(metadata.author || 'Plusplus AG'),
                    category: cleanText(metadata.category || 'News'),
                    image: cleanText(image),
                    content: bodyHtml
                };
            } catch (e) {
                console.error(`Failed to parse file ${file.name}`, e);
                return null;
            }
        }));

        const validPosts = postsWithInternalId.filter(p => p !== null) as (NewsPost & { internalId: string })[];

        // Collision Handling: "First Come, First Served" strategy
        // We process posts from Oldest to Newest. If a slug is taken by an older post,
        // the newer post must yield (append its internal ID) to preserve the old link.

        // validPosts is currently sorted by CreatedTime Descending (Newest First).
        // We reverse it to process Oldest First.
        const reversedPosts = [...validPosts].reverse();
        const seenSlugs = new Set<string>();

        reversedPosts.forEach(post => {
            if (seenSlugs.has(post.slug)) {
                // Collision detected: Newer post trying to use an existing slug.
                // Resolution: Append "-{internalId}" (e.g. "my-slug-2026002") to make it unique.
                post.slug = `${post.slug}-${post.internalId}`;
                // Note: We don't add the *suffixed* slug to seenSlugs because we only care about
                // protecting the *original* intended base slug. Or strictly, we should?
                // Actually, if "my-slug-2026002" ALSO exists, we have a bigger problem. 
                // But internalID is unique per file, so this suffix guarantees uniqueness.
            } else {
                seenSlugs.add(post.slug);
            }
        });

        // Return the posts (in their original Newest-First order) without the internalId helper
        return validPosts.map(({ internalId, ...post }) => post);

    } catch (error) {
        console.error('Error fetching news posts from Drive:', error);
        return [];
    }
}

export async function getNewsPostContent(slug: string, locale: string): Promise<NewsPostContent | null> {
    const posts = await getNewsPosts(locale);
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        return null;
    }

    return {
        ...post,
        content: post.content || ''
    };
}
