import { useTranslations } from 'next-intl';
import OnboardingForm from '@/components/forms/OnboardingForm';

export default function DataPage() {
    const t = useTranslations('onboardingForm');

    return (
        <main className="min-h-screen bg-neutral-light pt-32 pb-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl sm:text-4xl font-medium text-black mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-neutral-dark font-secondary">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10">
                        <OnboardingForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
