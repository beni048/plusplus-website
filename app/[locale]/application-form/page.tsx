import { useTranslations } from 'next-intl';
import JotFormEmbed from './JotFormEmbed';

export default function ApplicationFormPage() {
    // We can use translations if we want, but for a hidden page, hardcoded or generic is fine.
    // If we wanted to be strict, we'd add keys to messages/*.json

    return (
        <main className="flex min-h-screen flex-col bg-neutral-white">
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-8 text-center">
                        {/* We can leave the title empty or generic since the form usually has its own title */}
                    </div>
                    <JotFormEmbed />
                </div>
            </section>
        </main>
    );
}
