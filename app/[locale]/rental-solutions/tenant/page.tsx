'use client';

import { useTranslations } from 'next-intl';

export default function RentalSolutionsTenant() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-3xl sm:text-4xl lg:text-5xl font-medium text-black px-4">
            {t('rentalSolutionsTenant.title')}
          </h1>
          
          {/* Development Notice */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 rounded-r-lg">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-amber-700">
                  <strong>Note:</strong> This page is currently in development. All content shown is placeholder text and subject to change.
                </p>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none text-neutral-dark px-4">
            <p className="text-base sm:text-lg leading-relaxed mb-8 font-secondary">
              {t('rentalSolutionsTenant.subtitle')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('rentalSolutionsTenant.benefits.title')}
            </h2>
            <ul className="text-base sm:text-lg leading-relaxed mb-6 ml-6 list-disc font-secondary">
              <li>{t('rentalSolutionsTenant.benefits.benefit1')}</li>
              <li>{t('rentalSolutionsTenant.benefits.benefit2')}</li>
              <li>{t('rentalSolutionsTenant.benefits.benefit3')}</li>
              <li>{t('rentalSolutionsTenant.benefits.benefit4')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('rentalSolutionsTenant.howItWorks.title')}
            </h2>
            
            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('rentalSolutionsTenant.howItWorks.step1.title')}
            </h3>
            <p className="text-base sm:text-lg leading-relaxed mb-6 font-secondary">
              {t('rentalSolutionsTenant.howItWorks.step1.description')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('rentalSolutionsTenant.howItWorks.step2.title')}
            </h3>
            <p className="text-base sm:text-lg leading-relaxed mb-6 font-secondary">
              {t('rentalSolutionsTenant.howItWorks.step2.description')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('rentalSolutionsTenant.howItWorks.step3.title')}
            </h3>
            <p className="text-base sm:text-lg leading-relaxed mb-6 font-secondary">
              {t('rentalSolutionsTenant.howItWorks.step3.description')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('rentalSolutionsTenant.features.title')}
            </h2>
            <ul className="text-base sm:text-lg leading-relaxed mb-6 ml-6 list-disc font-secondary">
              <li>{t('rentalSolutionsTenant.features.feature1')}</li>
              <li>{t('rentalSolutionsTenant.features.feature2')}</li>
              <li>{t('rentalSolutionsTenant.features.feature3')}</li>
              <li>{t('rentalSolutionsTenant.features.feature4')}</li>
            </ul>

            <div className="text-center mt-12 mb-8">
              <a
                href="https://zinsli.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-orange text-white px-8 py-4 text-lg shadow-lg hover:bg-accent-orange/90 transition-all duration-300 rounded-lg inline-block font-medium"
              >
                {t('rentalSolutionsTenant.cta.button')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
