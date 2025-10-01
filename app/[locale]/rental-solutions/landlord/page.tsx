'use client';

import { useTranslations } from 'next-intl';

export default function RentalSolutionsLandlord() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-12 text-center text-4xl font-medium text-black">
            {t('rentalSolutionsLandlord.title')}
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
          
          <div className="prose prose-lg max-w-none text-neutral-dark">
            <p className="text-lg leading-relaxed mb-8">
              {t('rentalSolutionsLandlord.subtitle')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('rentalSolutionsLandlord.benefits.title')}
            </h2>
            <ul className="text-lg leading-relaxed mb-6 ml-6 list-disc">
              <li>{t('rentalSolutionsLandlord.benefits.benefit1')}</li>
              <li>{t('rentalSolutionsLandlord.benefits.benefit2')}</li>
              <li>{t('rentalSolutionsLandlord.benefits.benefit3')}</li>
              <li>{t('rentalSolutionsLandlord.benefits.benefit4')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('rentalSolutionsLandlord.services.title')}
            </h2>
            
            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('rentalSolutionsLandlord.services.screening.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('rentalSolutionsLandlord.services.screening.description')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('rentalSolutionsLandlord.services.guarantee.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('rentalSolutionsLandlord.services.guarantee.description')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('rentalSolutionsLandlord.services.management.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('rentalSolutionsLandlord.services.management.description')}
            </p>

            <h2 className="text-2xl font-semibold text-black mb-4 mt-8">
              {t('rentalSolutionsLandlord.howItWorks.title')}
            </h2>
            
            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('rentalSolutionsLandlord.howItWorks.step1.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('rentalSolutionsLandlord.howItWorks.step1.description')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('rentalSolutionsLandlord.howItWorks.step2.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('rentalSolutionsLandlord.howItWorks.step2.description')}
            </p>

            <h3 className="text-xl font-medium text-black mb-3 mt-6">
              {t('rentalSolutionsLandlord.howItWorks.step3.title')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('rentalSolutionsLandlord.howItWorks.step3.description')}
            </p>

            <div className="text-center mt-12 mb-8">
              <a
                href="https://zinsli.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-orange text-white px-8 py-4 text-lg shadow-lg hover:bg-accent-orange/90 transition-all duration-300 rounded-lg inline-block font-medium"
              >
                {t('rentalSolutionsLandlord.cta.button')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
